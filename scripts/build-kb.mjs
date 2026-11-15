#!/usr/bin/env node
/**
 * Phase B — write the knowledge base pieces.
 *
 * Reads the cut plan from `catalog/catalog.json`, slices each source's
 * cleaned text at the planned boundaries, applies the house typography, and
 * writes one markdown file per piece under `kb/books/<source>/`.
 *
 *   node scripts/build-kb.mjs [--source <id>] [--dry-run]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildDocument } from "./catalog.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const DOCS = join(root, "..", "datapad", "docs");

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const only = flag("source", null);
const dryRun = args.includes("--dry-run");

const catalogue = JSON.parse(readFileSync(join(root, "catalog", "catalog.json"), "utf8"));
const sources = JSON.parse(readFileSync(join(root, "kb", "sources.json"), "utf8")).sources;
const sourceMeta = new Map(sources.map((s) => [s.id, s]));

/* ------------------------------------------------------------ typography */

/** Infers a language for a code fence from what is inside it. */
function guessLanguage(body) {
  const text = body.join("\n");
  if (/^\s*(#!|\$ |root@|#\s)/m.test(text) && !/^\s*(select|create|insert)\b/im.test(text)) {
    return "sh";
  }
  if (/\b(SELECT|INSERT INTO|CREATE TABLE|UPDATE |DELETE FROM)\b/i.test(text)) return "sql";
  if (/<\/?[a-z][\w-]*>/i.test(text)) return "html";
  if (/^\s*(def |class |import |from .* import|print\()/m.test(text)) return "python";
  if (/\bfunction\s+\w+\s*\(/.test(text)) return "js";
  if (/^\s*[A-Z_]+\s*=/m.test(text)) return "ini";
  if (/^\s*\{|^\s*"/m.test(text) && /:/.test(text)) return "json";
  return "text";
}

/**
 * Applies the house typography.
 *
 * - one H1, the piece title
 * - the source's top-level sections become H2, their children H3
 * - code fences are closed and tagged
 * - list markers are normalised
 * - no more than one blank line in a row, no trailing whitespace
 */
function typeset(lines, title, headingAt, profile) {
  const out = [];
  let inFence = false;
  let fenceLines = [];
  let fenceLang = null;

  const flushFence = () => {
    if (!inFence) return;
    const lang = fenceLang || guessLanguage(fenceLines);
    out.push("```" + lang);
    out.push(...fenceLines);
    out.push("```");
    fenceLines = [];
    fenceLang = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].replace(/\s+$/, "");
    const trimmed = line.trim();

    // A heading in the source text becomes a markdown heading. The piece's
    // own title is the only H1, so the source's top level becomes H2.
    const node = headingAt.get(i);
    if (node && !inFence) {
      // A markdown source already uses the right depths; a plain-text source
      // starts one level down because the piece title is the only H1.
      const isMarkdown = profile?.headingRules === "markdown";
      const depth = isMarkdown ? node.level : node.level + 1;
      if (depth <= 1) continue;
      out.push(`${"#".repeat(Math.min(depth, 5))} ${node.title}`);
      continue;
    }

    // Fence handling
    if (/^\s*(```|~~~)/.test(line)) {
      if (!inFence) {
        inFence = true;
        const lang = trimmed.replace(/^(```|~~~)/, "").trim();
        fenceLang = lang && /^[a-z0-9+#]+$/i.test(lang) ? lang : null;
        continue;
      }
      flushFence();
      inFence = false;
      continue;
    }
    if (inFence) {
      fenceLines.push(line);
      continue;
    }

    // Heading levels: the piece's own title is the only H1.
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const depth = heading[1].length;
      const text = heading[2].trim();
      if (depth === 1) continue; // replaced by the piece title
      out.push(`${"#".repeat(Math.min(depth, 5))} ${text}`);
      continue;
    }

    // An indented block is code. The profile decides whether that is true
    // here — some sources use indentation for prose, not code.
    if (profile?.codeStyle === "indented" && /^(?:    |\t)\S/.test(line)) {
      flushFence();
      const body = [];
      while (i + 1 < lines.length) {
        const candidate = lines[i + 1];
        if (candidate.trim() === "") {
          const after = lines[i + 2];
          if (!after || !/^(?:    |\t)/.test(after)) break;
          body.push("");
          i += 1;
          continue;
        }
        if (!/^(?:    |\t)\S/.test(candidate)) break;
        body.push(candidate.replace(/^(?:    |\t)/, ""));
        i += 1;
      }
      out.push("```" + guessLanguage(body));
      out.push(...body);
      out.push("```");
      continue;
    }

    // List markers
    if (/^\s*([•●▪◦‣*])\s+/.test(line)) {
      out.push(line.replace(/^(\s*)[•●▪◦‣*]\s+/, "$1- "));
      continue;
    }
    if (/^\s*(\d+)\.\s{2,}/.test(line)) {
      out.push(line.replace(/^(\s*)\d+\.\s{2,}/, "$1- "));
      continue;
    }

    out.push(line);
  }
  flushFence();

  // Collapse runs of blank lines, trim the ends.
  const cleaned = [];
  for (const line of out) {
    if (line === "" && cleaned.length && cleaned[cleaned.length - 1] === "") continue;
    cleaned.push(line);
  }
  while (cleaned.length && cleaned[0] === "") cleaned.shift();
  while (cleaned.length && cleaned[cleaned.length - 1] === "") cleaned.pop();

  return [`# ${title}`, "", ...cleaned, ""].join("\n");
}

/* --------------------------------------------------------------- titles */

/**
 * Makes a value safe to put on one line of YAML front matter: no newlines,
 * no control characters, no stray quotes, and a length cap.
 */
function cleanText(value, max = 180) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/["\u201c\u201d]/g, "'")
    .trim()
    .slice(0, max)
    .trim();
}

/** "Chapter 2. Preparing the Host System" -> "Preparing the Host System" */
function condenseHeading(text) {
  return text
    .replace(/^chapter\s+[0-9]+\.\s*/i, "")
    .replace(/^topic\s+[0-9]+:\s*/i, "")
    .replace(/^[0-9]+(\.[0-9]+)*\.?\s+/, "")
    .replace(/^[A-Z]\.\s+/, "")
    .trim();
}

/** Builds a title from the source prefix and the piece's sections. */
function buildTitle(meta, sections) {
  const names = sections.map(condenseHeading).filter(Boolean);
  if (!names.length) return meta.title;

  let joined;
  if (names.length === 1) joined = names[0];
  else if (names.length === 2) joined = `${names[0]} & ${names[1]}`;
  else joined = `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;

  if (joined.length > 68) {
    const cut = joined.slice(0, 66);
    const lastSpace = cut.lastIndexOf(" ");
    joined = `${(lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[,&\s]+$/, "")}…`;
  }

  const prefix = meta.titlePrefix ?? meta.title;
  return `${prefix} — ${joined}`;
}

/** A summary from the first real sentence of the piece. */
function buildSummary(sections, bodyLines) {
  const names = sections.map(condenseHeading).filter(Boolean);
  const first = bodyLines.find(
    (line) =>
      line.trim().length > 60 &&
      /^[A-Z]/.test(line.trim()) &&
      !line.trim().startsWith("|") &&
      !line.trim().startsWith("```")
  );
  // The first one or two sentences, ending on a real full stop rather than
  // a decimal point or an abbreviation.
  const sentence = first
    ? (first.trim().match(/^.*?[.!?](?=\s+[A-Z(])/s) ?? [first.trim()])[0]
    : "";
  const trimmed = sentence.length > 190 ? `${sentence.slice(0, 187).trimEnd()}…` : sentence;
  const covers =
    names.length > 1
      ? ` Covers ${names.length} sections: ${names.slice(0, 3).join(", ").slice(0, 120)}.`
      : names.length === 1
        ? ` Covers ${names[0].slice(0, 120)}.`
        : "";
  const composed = `${trimmed}${covers}`.trim().slice(0, 240);
  // Never publish a piece with no summary — the feed card shows it.
  if (composed.length >= 40) return composed;
  return `${names.join(", ") || "This piece"}. ${covers}`.trim().slice(0, 240);
}

/* ------------------------------------------------------------------ main */

let written = 0;
let words = 0;

for (const source of catalogue.sources) {
  if (source.existing) continue;
  if (only && source.id !== only) continue;

  const meta = sourceMeta.get(source.id);
  const pdfPath = join(DOCS, meta.file);
  if (!existsSync(pdfPath)) {
    console.error(`missing source file: ${meta.file}`);
    continue;
  }

  const doc = buildDocument(pdfPath, meta);
  const dir = join(root, "kb", "books", meta.id);

  // The plan's pieces are groups of top-level headings; find where each group
  // starts and ends in the cleaned text.
  const byTitle = new Map(doc.roots.map((node) => [node.title, node]));
  const groups = source.plan.map((piece) => ({
    piece,
    starts: piece.sections
      .map((title) => byTitle.get(title))
      .filter(Boolean)
      .map((node) => node.at)
      .filter((at) => at !== undefined),
  }));

  process.stdout.write(`  ${meta.id.padEnd(20)}`);

  groups.forEach((group, index) => {
    if (!group.starts.length) return;
    const from = Math.min(...group.starts);
    const nextGroup = groups[index + 1];
    const to = nextGroup?.starts.length
      ? Math.min(...nextGroup.starts)
      : doc.lines.length;

    const bodyLines = doc.lines.slice(from, to);
    const headingAt = new Map(
      doc.flat
        .filter((node) => node.at >= from && node.at < to)
        .map((node) => [node.at - from, node])
    );
    const title = buildTitle(meta, group.piece.sections);
    const summary = buildSummary(group.piece.sections, bodyLines);
    const slug = `${group.piece.piece.replace(/^.*?-/, "")}`;
    const fileName = `${group.piece.piece.split("-").pop()}-${slugify(title)}.md`;

    const frontMatter = [
      "---",
      `id: ${group.piece.piece}`,
      `title: ${JSON.stringify(cleanText(title, 120))},`,
      `slug: ${group.piece.piece}-${slugify(title)}`,
      `source: ${JSON.stringify(cleanText(meta.title, 120))},`,
      `sourceSection: ${JSON.stringify(
        cleanText(group.piece.sections.join(", "), 300)
      )}`,
      `track: ${cleanText(meta.track, 40)},`,
      `tier: ${meta.tier}`,
      `tags: [${meta.tags.join(", ")}]`,
      `summary: ${JSON.stringify(cleanText(summary, 300))},`,
      "---",
      "",
    ].join("\n");

    const body = typeset(bodyLines, cleanText(title, 120), headingAt, doc.profile);
    const target = join(dir, fileName);
    if (!dryRun) {
      mkdirSync(dir, { recursive: true });
      writeFileSync(target, frontMatter + body, "utf8");
    }
    written += 1;
    words += group.piece.words;
  });

  console.log(`${groups.length} pieces`);
}

console.log(
  `\n${dryRun ? "Would write" : "Wrote"} ${written} piece(s), ~${words.toLocaleString()} words.`
);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
