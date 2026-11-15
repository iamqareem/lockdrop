#!/usr/bin/env node
/**
 * Rebuilds `kb/manifest.json` from the pieces on disk, and keeps
 * `kb/drive-links.json` in step with them.
 *
 * The manifest is the machine-readable index the publish script and the
 * checks read. The Drive links are the one thing a human fills in: upload the
 * `kb/` directory to Google Drive, then paste the link for each piece. Any
 * link already there is preserved.
 *
 *   node scripts/sync-manifest.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const kb = join(root, "kb");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (name.endsWith(".md")) out.push(path);
  }
  return out;
}

/**
 * Splits a piece into its YAML front matter and its body.
 *
 * The closing delimiter is a line containing exactly "---", which is the YAML
 * convention — searching for the string anywhere in the text would trip over
 * a "---" inside a title or a table separator.
 */
function splitPiece(text) {
  const lines = text.split("\n");
  if (lines[0].trim() !== "---") return { block: "", body: text };
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      return { block: lines.slice(1, i).join("\n"), body: lines.slice(i + 1).join("\n") };
    }
  }
  return { block: lines.slice(1).join("\n"), body: "" };
}

/** Reads the YAML front matter off a piece. */
function frontMatter(block) {
  const data = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    let value = raw.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
      continue;
    }
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    data[key] = value;
  }
  return data;
}

const files = walk(kb).filter(
  (f) => !f.endsWith("README.md") && relative(kb, f) !== "README.md"
);

const parts = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const { block, body } = splitPiece(text);
  const data = frontMatter(block);
  if (!data || !data.id) {
    console.error(`skipping (no front matter): ${relative(kb, file)}`);
    continue;
  }
  parts.push({
    id: data.id,
    file: relative(kb, file).split("\\").join("/"),
    title: data.title ?? data.id,
    summary: data.summary ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    track: data.track ?? "unassigned",
    tier: data.tier ?? "free",
    category: "gdrive",
    words: body.split(/\s+/).filter(Boolean).length,
  });
}

parts.sort((a, b) => a.file.localeCompare(b.file));

writeFileSync(
  join(kb, "manifest.json"),
  `${JSON.stringify({ generated: new Date().toISOString(), parts }, null, 2)}\n`,
  "utf8"
);
console.log(`manifest: ${parts.length} pieces`);

/* Keep the Drive links in step, preserving anything already filled in. */
const linksPath = join(kb, "drive-links.json");
const existing = existsSync(linksPath)
  ? JSON.parse(readFileSync(linksPath, "utf8"))
  : {};
const comment = existing._comment;

const links = {};
if (comment) links._comment = comment;
for (const part of parts) {
  links[part.id] = existing[part.id] ?? "";
}
for (const key of Object.keys(existing)) {
  if (key.startsWith("_")) continue;
  if (!parts.some((p) => p.id === key)) links[key] = existing[key];
}
writeFileSync(linksPath, `${JSON.stringify(links, null, 2)}\n`, "utf8");
console.log(`drive-links: ${parts.length} slots (${Object.values(links).filter((v) => v && !String(v).startsWith("[")).length} filled)`);
