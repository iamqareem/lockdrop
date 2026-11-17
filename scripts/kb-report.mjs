#!/usr/bin/env node
/**
 * Prints the curation progress of the knowledge base.
 *
 *   node scripts/kb-report.mjs
 *
 * Reads `kb/curation.json` (the triage and refinement state) against
 * `kb/manifest.json` (the pieces themselves). Refinement is meant to move
 * pieces from raw to refined to shipped, one roadmap at a time.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const manifest = JSON.parse(readFileSync(join(root, "kb", "manifest.json"), "utf8"));
const curation = JSON.parse(readFileSync(join(root, "kb", "curation.json"), "utf8"));

const bar = (done, total, width = 24) => {
  const filled = total === 0 ? width : Math.round((done / total) * width);
  return `${"█".repeat(filled)}${"·".repeat(width - filled)}`;
};

const byState = { raw: 0, refined: 0, shipped: 0 };
const byForm = { "roadmap-part": 0, single: 0, reference: 0 };
const roadmapProgress = new Map();

for (const part of manifest.parts) {
  const cur = curation.pieces[part.id];
  if (!cur) continue;
  byState[cur.state] = (byState[cur.state] ?? 0) + 1;
  byForm[cur.form] = (byForm[cur.form] ?? 0) + 1;
  if (cur.roadmap) {
    const r = roadmapProgress.get(cur.roadmap) ?? { refined: 0, total: 0 };
    r.total += 1;
    if (cur.state !== "raw") r.refined += 1;
    roadmapProgress.set(cur.roadmap, r);
  }
}

const total = manifest.parts.length;
const words = Object.fromEntries(
  manifest.parts.map((p) => [p.id, p.words ?? 0])
);
const wordsLeft = manifest.parts
  .filter((p) => curation.pieces[p.id]?.state === "raw")
  .reduce((s, p) => s + (p.words ?? 0), 0);

console.log(`Knowledge base — ${total} pieces\n`);
console.log(
  `  state    ${bar(byState.refined + byState.shipped, total)}  ${
    byState.refined + byState.shipped
  }/${total} refined (${byState.shipped} shipped)`
);
console.log(
  `  bloat    ~${Math.round(wordsLeft / 1000)}k words still awaiting the knife\n`
);
console.log("  form     " + Object.entries(byForm).map(([k, v]) => `${k} ${v}`).join(" · "));

console.log("\nRoadmaps\n");
for (const [slug, r] of [...roadmapProgress].sort(
  (a, b) => b[1].refined / b[1].total - a[1].refined / a[1].total
)) {
  const meta = curation.roadmaps[slug] ?? {};
  console.log(
    `  ${bar(r.refined, r.total, 16)}  ${String(r.refined).padStart(2)}/${String(
      r.total
    ).padStart(2)}  ${meta.title ?? slug}`
  );
}

const singles = manifest.parts.filter((p) => curation.pieces[p.id]?.form === "single");
const singlesDone = singles.filter((p) => curation.pieces[p.id]?.state !== "raw");
console.log(
  `\nSingles  ${bar(singlesDone.length, singles.length, 16)}  ${singlesDone.length}/${singles.length} refined`
);
