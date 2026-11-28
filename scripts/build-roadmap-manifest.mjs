#!/usr/bin/env node
/**
 * Build the static roadmap manifest from the staged markdown library.
 *
 * There is no bundler in this project. This script is run by hand, like
 * `stamp.mjs`, and writes a plain JSON file that the browser fetches. It
 * turns the ordered tables in each staged roadmap's README.md or
 * roadmap.md — plus each chapter's front matter — into the data the
 * roadmap service needs to place every piece at its proper step.
 *
 *   node scripts/build-roadmap-manifest.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(root, "stage-md", "roadmaps");
const outFile = join(root, "public", "data", "roadmaps.json");

/** Parse the YAML-ish front matter block at the top of a markdown file. */
function frontMatter(text) {
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 4);
  if (end === -1) return {};
  const out = {};
  for (const line of text.slice(4, end).split("\n")) {
    const m = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    else if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((s) => s.trim());
    }
    out[m[1]] = value;
  }
  return out;
}

/** Extract ordered rows from a markdown table: `| 01 | [Title](slug) | … |`. */
function orderedRows(text) {
  const rows = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^\|\s*(\d{1,3})\s*\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|/);
    if (!m) continue;
    rows.push({ n: Number(m[1]), title: m[2], link: m[3] });
  }
  return rows;
}

/** Stage ranges like `**Stage 1 — Foundation (01–06).**`. */
function stageRanges(text) {
  const stages = [];
  for (const line of text.split("\n")) {
    const m = line.match(
      /\*\*Stage\s+(\d+)\s+[—-]\s+([^(*]+?)\s*\((\d{1,3})\s*[–-]\s*(\d{1,3})\)\s*\.\*\*/
    );
    if (m) {
      stages.push({
        index: Number(m[1]),
        name: m[2].trim(),
        from: Number(m[3]),
        to: Number(m[4]),
      });
    }
  }
  return stages;
}

if (!existsSync(sourceDir)) {
  console.error(`Source directory missing: ${sourceDir}`);
  process.exit(1);
}

const roadmaps = [];

for (const dir of readdirSync(sourceDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const dirPath = join(sourceDir, dir.name);

  // Prefer the explicit roadmap.md, then the README.md, as the ordered index.
  const indexFile = ["roadmap.md", "README.md"]
    .map((name) => join(dirPath, name))
    .find((p) => existsSync(p));
  if (!indexFile) continue;

  const indexText = readFileSync(indexFile, "utf8");
  const meta = frontMatter(indexText);
  const rows = orderedRows(indexText);
  if (!rows.length) continue;

  // Map chapter slug -> file front matter so each step carries its id/tier.
  const chapters = new Map();
  for (const name of readdirSync(dirPath)) {
    if (!name.endsWith(".md") || name === "README.md" || name === "roadmap.md") continue;
    const text = readFileSync(join(dirPath, name), "utf8");
    const fm = frontMatter(text);
    if (fm.slug) chapters.set(String(fm.slug), fm);
  }

  const stages = stageRanges(indexText);
  const steps = rows.map((row) => {
    const slug = row.link.replace(/\.md$/, "");
    const chapter = chapters.get(slug) ?? {};
    const stage = stages.find((s) => row.n >= s.from && row.n <= s.to);
    return {
      n: row.n,
      slug,
      id: String(chapter.id ?? ""),
      title: String(chapter.title ?? row.title),
      summary: String(chapter.summary ?? ""),
      tier: String(chapter.tier ?? "free"),
      stage: stage?.name ?? "",
    };
  });

  roadmaps.push({
    id: String(meta.id ?? dir.name),
    slug: String(meta.slug ?? dir.name),
    title: String(meta.title ?? dir.name),
    track: String(meta.track ?? ""),
    summary: String(meta.summary ?? ""),
    stages,
    steps,
  });
}

roadmaps.sort((a, b) => a.slug.localeCompare(b.slug));

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ roadmaps }, null, 2));

const stepCount = roadmaps.reduce((n, r) => n + r.steps.length, 0);
console.log(`wrote ${outFile}`);
console.log(`${roadmaps.length} roadmaps, ${stepCount} ordered steps`);
