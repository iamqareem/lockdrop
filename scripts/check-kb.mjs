#!/usr/bin/env node
/**
 * Validates the knowledge base.
 *
 *   node scripts/check-kb.mjs
 *
 * Checks that every piece has usable front matter, that the manifest matches
 * the files on disk, and that no table-of-contents furniture survived the
 * conversion.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const kb = join(root, "kb");

let failures = 0;
const fail = (m) => {
  console.error(`FAIL  ${m}`);
  failures += 1;
};
const ok = (m) => console.log(`ok    ${m}`);

if (!existsSync(kb)) {
  console.error("kb/ does not exist.");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const all = walk(kb);
const markdown = all.filter((f) => f.endsWith(".md"));
const readmes = markdown.filter((f) => f.endsWith("README.md"));
const pieces = markdown.filter((f) => !f.endsWith("README.md"));

/* 1. Every piece has front matter with the required fields. */
const missing = [];
const ids = new Set();
for (const file of pieces) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("---")) {
    missing.push(`${relative(kb, file)}: no front matter`);
    continue;
  }
  const front = text.split("---", 2)[1] ?? "";
  for (const key of ["id:", "title:", "summary:", "source:", "tags:"]) {
    if (!front.includes(key)) {
      missing.push(`${relative(kb, file)}: missing ${key}`);
      break;
    }
  }
  const id = front.match(/^id:\s*(\S+)/m)?.[1];
  if (id) {
    if (ids.has(id)) missing.push(`${relative(kb, file)}: duplicate id ${id}`);
    ids.add(id);
  }
}
if (missing.length) {
  for (const m of missing.slice(0, 10)) fail(m);
} else {
  ok(`${pieces.length} piece(s) carry valid front matter`);
}

/* 2. No table-of-contents furniture survived. */
const leaders = [];
for (const file of markdown) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    // A TOC entry ends with a run of dots followed by a page number.
    if (/\.{4,}\s*\d+\s*$/.test(line)) {
      leaders.push(`${relative(kb, file)}:${index + 1}`);
    }
  });
}
if (leaders.length) {
  fail(`TOC dot leaders survive in ${leaders.length} place(s): ${leaders.slice(0, 5)}`);
} else {
  ok("no table-of-contents dot leaders remain");
}

/* 3. The manifest matches the files on disk. */
const manifestPath = join(kb, "manifest.json");
if (!existsSync(manifestPath)) {
  fail("kb/manifest.json is missing");
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const parts = manifest.parts ?? [];

  const listed = new Set(parts.map((p) => p.file));
  const onDisk = new Set(pieces.map((f) => relative(kb, f).split("\\").join("/")));

  const missingFiles = [...listed].filter((f) => !onDisk.has(f));
  const unlisted = [...onDisk].filter((f) => !listed.has(f));

  if (missingFiles.length) fail(`manifest lists missing files: ${missingFiles.slice(0, 3)}`);
  else ok(`every one of the ${parts.length} manifest parts exists on disk`);

  if (unlisted.length) fail(`files missing from the manifest: ${unlisted.slice(0, 3)}`);
  else ok("every content piece is in the manifest");

  const readmeInManifest = parts.filter((p) => p.file.endsWith("README.md"));
  if (readmeInManifest.length) {
    fail(`the manifest includes ${readmeInManifest.length} README(s) — they are indexes, not drops`);
  } else {
    ok("the manifest holds publishable pieces only");
  }

  const badCategory = parts.filter(
    (p) =>
      ![
        "document", "download", "notion", "telegram", "gdrive",
        "onedrive", "dropbox", "nextcloud", "quark", "media",
      ].includes(p.category)
  );
  if (badCategory.length) {
    fail(`unknown category on ${badCategory.length} part(s)`);
  } else {
    ok("every part uses a known category");
  }

  const badWords = parts.filter(
    (p) => typeof p.words !== "number" || p.words <= 0
  );
  if (badWords.length) fail(`${badWords.length} part(s) have no word count`);
  else ok("every part records a word count");
}

/* 4. The Drive link scaffold is present. */
const linksPath = join(kb, "drive-links.json");
if (!existsSync(linksPath)) {
  fail("kb/drive-links.json is missing");
} else {
  const links = JSON.parse(readFileSync(linksPath, "utf8"));
  const ids_ = Object.keys(links).filter((k) => !k.startsWith("_"));
  const missingIds = pieces
    .map((f) => readFileSync(f, "utf8").match(/^id:\s*(\S+)/m)?.[1])
    .filter((id) => id && !ids_.includes(id));
  if (missingIds.length) {
    fail(`${missingIds.length} piece(s) have no slot in drive-links.json`);
  } else {
    ok(`drive-links.json has a slot for all ${ids_.length} piece(s)`);
  }
}

console.log(
  `\n${pieces.length} pieces, ${readmes.length} indexes, ${all.filter((f) => f.endsWith(".json")).length} manifest file(s).`
);

if (failures > 0) {
  console.error(`\n${failures} knowledge-base check(s) failed.`);
  process.exit(1);
}
console.log("All knowledge-base checks passed.");
