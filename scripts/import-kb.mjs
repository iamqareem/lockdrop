#!/usr/bin/env node
/**
 * Import a roadmap from the Google Drive LockDrop Knowledge Base.
 *
 * Manual, like `stamp.mjs` — no bundler. Uses the `gdrive` CLI for file
 * listing, content and links, and the Master Technical Index for the
 * canonical track/stage name. Writes `public/data/roadmaps.json` and prints
 * the steps so the seeding step can publish each one as a drop.
 *
 *   node scripts/import-kb.mjs "Linux Essentials"
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROADMAPS_PARENT = "11CxwnFRCy_D6kCvnHlU_R9-usIbxf350";
const MASTER_INDEX = "1Scs_CWWphjaWg3AikoXBLCqJpFqOsaumRHdLRoUMLcM";
const OUT = join(root, "public", "data", "roadmaps.json");
const SUMMARIES = join(root, "scripts", "kb-summaries.json");

const target = process.argv[2] || "Linux Essentials";

/** Curated, benefit-led summaries beat the generic overview line. */
const overrides = existsSync(SUMMARIES)
  ? JSON.parse(readFileSync(SUMMARIES, "utf8"))
  : {};

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function gdrive(args) {
  let last;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return execFileSync("gdrive", args, {
        encoding: "utf8",
        timeout: 90_000,
        maxBuffer: 12 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (err) {
      last = err;
      if (attempt < 4) sleepSync(1200 * attempt);
    }
  }
  throw last;
}

/** Parse a `gdrive files list` table into rows. */
function list(parent) {
  const text = gdrive([
    "files", "list", "--parent", parent, "--max", "200",
    "--skip-header", "--full-name", "--field-separator", "|",
  ]);
  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [id, name, type, size, created] = line.split("|");
      return { id: id.trim(), name: name.trim(), type: type?.trim(), size: size?.trim(), created: created?.trim() };
    });
}

/** Parse the YAML-ish front matter of a Drive markdown file. */
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
    else if (value.startsWith("[") && value.endsWith("]")) value = value.slice(1, -1).split(",").map((s) => s.trim());
    out[m[1]] = value;
  }
  return out;
}

/**
 * One roadmap is imported at a time. Roads use different indexing contexts —
 * some number by a front-matter id suffix, some by filename prefix, some by
 * an explicit order table — so keep the source of the order alongside n.
 */
function stepNumber(file, fm, position) {
  const fromId = String(fm.id ?? "").match(/(\d+)$/);
  if (fromId) return { n: Number(fromId[1]), indexContext: `id:${fm.id}` };
  const fromName = file.name.match(/^(\d{1,3})[\s.-]/);
  if (fromName) return { n: Number(fromName[1]), indexContext: "filename" };
  const fromSlug = String(fm.slug ?? "").match(/^(\d{1,3})[\s.-]/);
  if (fromSlug) return { n: Number(fromSlug[1]), indexContext: "slug" };
  return { n: position + 1, indexContext: "listing-order" };
}

/** The blockquote line after the first heading is the one-line overview. */
function overview(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    const m = line.match(/^>\s*\*\*(.+?):\*\*\s*(.+)$/);
    if (m) return m[2].trim().replace(/\*/g, "").slice(0, 250);
  }
  for (const line of lines) {
    if (line.startsWith("> ") && !line.startsWith("> **")) return line.slice(2).trim().slice(0, 250);
  }
  return "";
}

/**
 * Some front-matter titles are distorted sentence fragments. The H1 is the
 * reliable human title in those roads, so prefer it when the front-matter
 * one looks broken.
 */
function pickTitle(fm, markdown, fileName) {
  const h1 = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  const fromHeading = h1
    .replace(/^[^\x00-\x7F]+\s*/, "")
    .replace(/^Module\s*\d+\s*:\s*/i, "")
    .trim();
  const fmTitle = String(fm.title ?? "");
  const broken = !fmTitle || fmTitle.endsWith("…") || fmTitle.length > 90;
  return broken && fromHeading ? fromHeading : fmTitle || fromHeading || fileName.replace(/\.md$/, "");
}

/** Stage name from the Master Technical Index, e.g. the LPIC-1 section. */
function stageFromIndex(indexText, track, source) {
  const lines = indexText.split("\n").map((line) => line.trim());
  if (/network/i.test(track)) {
    const section = lines.find((line) => /^\d+\.\s+Networking/i.test(line));
    return source || section?.replace(/^\d+\.\s+/, "") || "Networking";
  }
  if (/linux/i.test(track)) {
    return lines.find((line) => /^LPIC-1:/i.test(line))?.replace(/:$/, "") || "Linux Engineer Track";
  }
  return source || lines.find((line) => /^\d+\.\s+/.test(line))?.replace(/^\d+\.\s+/, "") || track || "The path";
}

console.log(`Importing "${target}" from Google Drive…`);

const folders = list(ROADMAPS_PARENT);
const folder = folders.find((f) => f.type === "folder" && f.name === target);
if (!folder) {
  console.error(`No roadmap folder named "${target}". Available: ${folders.map((f) => f.name).join(", ")}`);
  process.exit(1);
}

const temp = mkdtempSync(join(tmpdir(), "lockdrop-kb-"));
let indexText = "";
try {
  gdrive(["files", "export", MASTER_INDEX, join(temp, "index.txt"), "--overwrite"]);
  indexText = readFileSync(join(temp, "index.txt"), "utf8").replace(/^\uFEFF/, "");
} catch {
  // The index is a label only; the import still works without it.
} finally {
  rmSync(temp, { recursive: true, force: true });
}

const files = list(folder.id).filter((f) => f.name.endsWith(".md"));
if (!files.length) {
  console.error("No markdown files found in the roadmap folder.");
  process.exit(1);
}

const steps = files.map((file, position) => {
  const markdown = gdrive(["files", "download", file.id, "--stdout"]);
  const fm = frontMatter(markdown);
  const info = gdrive(["files", "info", file.id]);
  const viewUrl = info.match(/^ViewUrl:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const { n, indexContext } = stepNumber(file, fm, position);
  return {
    n,
    indexContext,
    id: String(fm.id ?? ""),
    slug: String(fm.slug ?? ""),
    title: pickTitle(fm, markdown, file.name),
    summary: overrides[String(fm.slug ?? "")] || String(fm.summary ?? "") || overview(markdown),
    source: String(fm.source ?? ""),
    track: String(fm.track ?? ""),
    viewUrl,
    driveId: file.id,
  };
}).sort((a, b) => a.n - b.n);

const track = steps[0]?.track ?? "";
const stage = stageFromIndex(indexText, track, steps[0]?.source ?? "");
const roadmap = {
  id: String(folder.id),
  slug: target.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: target,
  track,
  summary: `The ${target} path, from the LockDrop Knowledge Base.`,
  stages: [{ index: 1, name: stage, from: 1, to: steps.length }],
  steps,
};

/*
 * One roadmap at a time: merge into the manifest rather than replace it, so
 * importing Beej Networking does not erase the Linux path already seeded.
 */
const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { roadmaps: [] };
const others = (existing.roadmaps ?? []).filter((r) => r.slug !== roadmap.slug);
const all = [...others, roadmap].sort((a, b) => a.slug.localeCompare(b.slug));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ roadmaps: all }, null, 2));
console.log(`wrote ${OUT}`);
console.log(`${steps.length} steps, order ${steps.map((s) => s.n).join(",")}`);
console.log("SEED_JSON=" + JSON.stringify(steps.map((s) => ({
  stepSlug: s.slug,
  title: s.title,
  url: s.viewUrl,
  summary: s.summary,
}))));
