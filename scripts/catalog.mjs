#!/usr/bin/env node
/**
 * Phase A — the knowledge base catalogue.
 *
 * For every source document this reads the text, rebuilds its heading tree,
 * counts the words under each heading, and proposes where the pieces should
 * be cut. Nothing is written to `kb/` — the output is `kb/catalog.json` and
 * `kb/catalog.md`, which are reviewed before any prose is produced.
 *
 *   node scripts/catalog.mjs [--source <id>] [--out kb/catalog.json]
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const DOCS = join(root, "..", "datapad", "docs");

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const only = flag("source", null);
const outJson = join(root, flag("out", "catalog/catalog.json"));

/* ------------------------------------------------------------------ rules */

/**
 * How each source's headings are written.
 * `level` is the depth of the pattern; lower is higher in the tree.
 */
/**
 * How each source's headings are written.
 *
 * `title` is built from the capture groups; `ok` validates the TEXT part of
 * the heading, so that a table cell like "14. MB" or a sentence that happens
 * to start "Chapter 2." never passes as a heading.
 */
const isText = (text) => {
  const t = text.trim();
  if (!t) return false;
  if (!/^[A-Z0-9]/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length >= 2) return true;
  return t.replace(/[^A-Za-z]/g, "").length >= 4;
};

const isShortTitle = (text) => {
  const t = text.trim();
  if (!t || !/^[A-Z]/.test(t)) return false;
  if (t.length > 60) return false;
  if (t.split(/\s+/).length > 8) return false;
  if (/[.!?]$/.test(t)) return false;
  return true;
};

const RULES = [
  {
    id: "chapter",
    level: 1,
    re: /^chapter\s+([0-9]+)[.:]?\s*(.+)$/i,
    title: (m) => `Chapter ${m[1]}. ${m[2]}`,
    ok: (m) => isShortTitle(m[2]),
  },
  {
    id: "part",
    level: 1,
    re: /^(?:part\s+)?([IVXLC]+)[:.]\s+([A-Z].*)$/,
    title: (m) => `${m[1]}. ${m[2]}`,
    ok: (m) => isShortTitle(m[2]),
  },
  {
    id: "appendix",
    level: 1,
    re: /^(appendix\s+[A-Z])\b[:.]?\s*(.*)$/i,
    title: (m) => (m[2] ? `${m[1]}: ${m[2]}` : m[1]),
    ok: (m) => isText(m[2] || m[1]),
  },
  {
    id: "topic",
    level: 1,
    re: /^topic\s+([0-9]+)[:.]\s*(.+)$/i,
    title: (m) => `Topic ${m[1]}: ${m[2]}`,
    ok: (m) => isShortTitle(m[2]),
  },
  {
    id: "dotted3",
    level: 3,
    re: /^([0-9]+)\.([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/,
    title: (m) => `${m[1]}.${m[2]}.${m[3]} ${m[4]}`,
    ok: (m) => isText(m[4]),
  },
  {
    id: "dotted2",
    level: 2,
    re: /^([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/,
    title: (m) => `${m[1]}.${m[2]} ${m[3]}`,
    ok: (m) => isText(m[3]),
  },
  {
    id: "dotted1",
    level: 1,
    re: /^([0-9]+)\.?\s+([A-Z]\S.*)$/,
    title: (m) => `${m[1]}. ${m[2]}`,
    ok: (m) => isText(m[2]),
  },
  {
    id: "lettered",
    level: 2,
    re: /^([A-Z])\.\s+([A-Z]\S.*)$/,
    title: (m) => `${m[1]}. ${m[2]}`,
    ok: (m) => isText(m[2]),
  },
  {
    id: "markdown",
    level: 1,
    re: /^#{1,6}\s+(.+)$/,
    title: (m) => m[1],
    ok: (m) => isText(m[1]),
  },
];

/**
 * Which structural heading convention a document uses.
 * The first pattern that matches enough lines wins.
 */
const CONVENTIONS = [
  { id: "chapter", re: /^chapter\s+[0-9]+[.:]/i, min: 3 },
  { id: "topic", re: /^topic\s+[0-9]+[:.]/i, min: 3 },
  { id: "part", re: /^(?:part\s+)?[IVXLC]+[:.]\s+[A-Z]/, min: 3 },
  { id: "dotted", re: /^[0-9]+\.[0-9]+\.?(\s|$)/, min: 8 },
  { id: "dotted1", re: /^[0-9]+\.\s+[A-Z]/, min: 6 },
];

/* ------------------------------------------------------------- extraction */

function isPdf(path) {
  return path.toLowerCase().endsWith(".pdf");
}

function extractText(path) {
  if (!isPdf(path)) {
    return readFileSync(path, "utf8");
  }
  return execFileSync("pdftotext", [path, "-"], {
    maxBuffer: 1024 * 1024 * 256,
    encoding: "utf8",
  });
}

function pdfPages(pdfPath) {
  if (!isPdf(pdfPath)) return 0;
  try {
    const out = execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" });
    return Number(out.match(/^Pages:\s*(\d+)/m)?.[1] ?? 0);
  } catch {
    return 0;
  }
}

/**
 * True when the text is hard-wrapped — most lines run to the margin with no
 * blank line between them. Plain-text exports are not wrapped, and rejoining
 * them would corrupt the prose.
 */
export function isHardWrapped(lines) {
  const sample = lines.filter((l) => l.trim()).slice(0, 600);
  if (sample.length < 40) return false;
  const median = sample.map((l) => l.trim().length).sort((a, b) => a - b)[
    Math.floor(sample.length / 2)
  ];
  return median > 95;
}

/**
 * Removes the repeated running header/footer and the page numbers.
 *
 * The page numbers form an unbroken 1..N run, so a standalone integer is
 * only a page number when it equals the page we expect next. That keeps
 * table cells and list items intact.
 */
export function stripFurniture(lines) {
  const counts = new Map();
  for (const line of lines) {
    const key = line.trim();
    if (!key || key.length > 90) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const repeated = new Set(
    [...counts.entries()].filter(([, n]) => n >= 4).map(([k]) => k)
  );

  let expectedPage = 1;
  const out = [];
  for (const line of lines) {
    const trimmed = line.trim();

    if (/^[0-9]{1,4}$/.test(trimmed) && Number(trimmed) === expectedPage) {
      expectedPage += 1;
      continue;
    }
    if (repeated.has(trimmed)) continue;
    // Table-of-contents entries: a long run of dot leaders.
    if (/\.{6,}/.test(trimmed)) continue;
    out.push(line);
  }
  return out;
}

/**
 * Rejoins hard-wrapped prose.
 *
 * These PDFs wrap at a fixed column with no blank line between the wrapped
 * lines. The signal for a paragraph boundary is that the PREVIOUS line was
 * short — a wrapped line always runs to the margin, so a short line is the
 * last line of its paragraph. A line that is short and does not end in
 * punctuation is treated as a heading and is never merged into the paragraph
 * above it.
 */
export function rejoin(lines) {
  const out = [];
  let buffer = [];

  const flush = () => {
    if (buffer.length) {
      out.push(buffer.join(" ").replace(/\s+/g, " ").trim());
      buffer = [];
    }
  };

  const looksLikeHeading = (text) =>
    text.length > 0 &&
    text.length < 95 &&
    !/[.!?:;,]$/.test(text) &&
    !/^\s{4,}/.test(text);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flush();
      out.push("");
      continue;
    }
    // Code, tables and block quotes keep their own lines.
    if (/^(```|\||>|\s{4,}\S)/.test(line)) {
      flush();
      out.push(trimmed);
      continue;
    }

    if (buffer.length) {
      const previous = buffer[buffer.length - 1];
      const previousEndedParagraph = previous.length < 95;
      if (previousEndedParagraph || looksLikeHeading(trimmed)) flush();
    }
    buffer.push(trimmed);
  }
  flush();
  return out;
}

/* ------------------------------------------------------------- headings */

export function detectConvention(lines) {
  const sample = lines.slice(0, 4000);
  let best = { id: "structural", re: null, score: 0 };
  for (const conv of CONVENTIONS) {
    const score = sample.filter((l) => conv.re.test(l.trim())).length;
    if (score >= conv.min && score > best.score) {
      best = { id: conv.id, re: conv.re, score };
    }
  }
  // Nothing numbered was found — fall back to detecting headings structurally
  // (a short line on its own, between blank lines).
  return best;
}

export function headingOf(line, allowMarkdown = false) {
  const trimmed = line.trim();
  for (const rule of RULES) {
    if (!rule.re) continue;
    // The markdown rule would otherwise match every shell `# comment` in a
    // code block, so it is only used for actual markdown sources.
    if (rule.id === "markdown" && !allowMarkdown) continue;
    const m = trimmed.match(rule.re);
    if (!m) continue;
    if (rule.ok && !rule.ok(m)) continue;
    const title = rule.title(m).trim();
    if (title.length > 120) continue;
    if (!/[A-Za-z]/.test(title)) continue;
    if (/[.!?]\s*$/.test(title) && title.split(/\s+/).length > 12) continue;
    return { level: rule.level, title, rule: rule.id };
  }
  return null;
}

/**
 * True when the line is an item in a numbered list rather than a heading.
 *
 * A numbered list runs 1., 2., 3. with each item on its own line. A heading
 * is followed by prose, not by the next number in the sequence.
 */
function isListItem(lines, index) {
  const line = lines[index].trim();
  const m = line.match(/^([0-9]+)(?:\.([0-9]+))?\.?\s+/);
  if (!m) return false;
  const current = Number(m[1]);
  const depth = m[2] ? 2 : 1;

  for (let i = index + 1; i < Math.min(lines.length, index + 4); i += 1) {
    const next = lines[i].trim();
    if (!next) continue;
    const n = next.match(/^([0-9]+)(?:\.([0-9]+))?\.?\s+/);
    if (!n) return false;
    const nextDepth = n[2] ? 2 : 1;
    if (nextDepth !== depth) return false;
    return Number(n[1]) === current + 1;
  }
  return false;
}

/**
 * Fallback heading detection: a short line that stands alone between blank
 * lines, or a short line that opens a block of short lines (the title and
 * subtitle of a slide). Slide decks have no numbering at all, so this is the
 * only way to see their structure.
 */
function structuralHeading(lines, index) {
  const line = lines[index];
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 90 || trimmed.length < 3) return null;
  if (/[.,;:!?]$/.test(trimmed)) return null;
  if (!/[A-Za-z]/.test(trimmed)) return null;
  if (trimmed.split(/\s+/).length > 12) return null;

  const previous = index > 0 ? lines[index - 1].trim() : "";
  if (previous !== "") return null;

  const next = lines[index + 1];
  if (next === undefined) return null;

  if (next.trim() === "") return { level: 1, title: trimmed, rule: "structural" };

  // A title followed by a subtitle: the next line is short too.
  const following = next.trim();
  if (following.length <= 90 && following.split(/\s+/).length <= 12) {
    return { level: 1, title: trimmed, rule: "structural" };
  }
  return null;
}

/* --------------------------------------------------------------- build */

export function buildTree(path, ruleOverride = null) {
  const allowMarkdown = !isPdf(path);
  const raw = extractText(path).split("\n");
  const cleaned = stripFurniture(raw);
  const rejoined = isHardWrapped(cleaned) ? rejoin(cleaned) : cleaned;
  const detected = detectConvention(rejoined);
  const convention = ruleOverride ?? detected.id;

  const tree = [];
  let current = null;

  for (let i = 0; i < rejoined.length; i += 1) {
    const line = rejoined[i];
    const tokens = line.trim() ? line.trim().split(/\s+/).length : 0;

    let heading = headingOf(line, allowMarkdown);

    // A numbered heading has to stand on its own: a blank line before it.
    // Without that, a code comment or a table cell reads as a section.
    if (
      heading &&
      heading.rule !== "chapter" &&
      heading.rule !== "topic" &&
      heading.rule !== "markdown"
    ) {
      const previous = i > 0 ? rejoined[i - 1].trim() : "";
      if (previous !== "") heading = null;
    }

    if (!heading && convention === "structural") {
      heading = structuralHeading(rejoined, i);
    }

    // A numbered line that is followed by the next number in the sequence is
    // a list item, not a heading.
    if (heading && heading.rule !== "chapter" && heading.rule !== "topic" &&
        heading.rule !== "markdown" && isListItem(rejoined, i)) {
      heading = null;
    }

    if (heading) {
      current = { ...heading, words: 0, children: [] };
      tree.push(current);
      continue;
    }
    if (current) current.words += tokens;
  }

  // Assemble the flat list into a tree: a heading nests under the nearest
  // preceding heading of a higher level.
  const roots = [];
  const open = [];
  for (const node of tree) {
    while (open.length && open[open.length - 1].level >= node.level) open.pop();
    if (open.length) open[open.length - 1].children.push(node);
    else roots.push(node);
    open.push(node);
  }

  const total = tree.reduce((sum, n) => sum + n.words, 0);
  return { roots, convention, total };
}

/** Proposes pieces: take the largest units that fit the word band. */
function proposePieces(roots, { min, max }) {
  const pieces = [];
  let buffer = [];
  let words = 0;

  const flush = () => {
    if (!buffer.length) return;
    pieces.push({ sections: buffer.map((b) => b.title), words });
    buffer = [];
    words = 0;
  };

  const walk = (nodes, depth) => {
    for (const node of nodes) {
      const size = node.words + node.children.reduce((s, c) => s + c.words, 0);
      if (size > max && node.children.length && depth < 3) {
        flush();
        walk(node.children, depth + 1);
        continue;
      }
      if (words + size > max && buffer.length) flush();
      buffer.push(node);
      words += size;
      if (words >= min) flush();
    }
  };

  walk(roots, 0);
  flush();
  return pieces;
}

/* ------------------------------------------------------------------ main */

const SOURCES = JSON.parse(
  readFileSync(join(root, "kb", "sources.json"), "utf8")
).sources;

const catalogue = { generated: new Date().toISOString(), sources: [] };

for (const source of SOURCES) {
  const pdfPath = join(DOCS, source.file);
  if (!existsSync(pdfPath)) {
    console.error(`missing: ${source.file}`);
    continue;
  }
  if (only && source.id !== only) continue;

  process.stdout.write(`  ${source.id.padEnd(18)}`);
  const { roots, convention, total } = buildTree(pdfPath, source.headingRule ?? null);
  const chapters = source.existing
    ? []
    : proposePieces(roots, { min: 12000, max: 18000 });

  console.log(
    `${String(roots.length).padStart(4)} headings  ${String(convention).padEnd(10)} ` +
      `${String(total).padStart(7)} words  -> ${String(chapters.length).padStart(3)} chapter pieces` +
      `${source.existing ? "  (already built)" : ""}`
  );

  catalogue.sources.push({
    id: source.id,
    file: source.file,
    title: source.title,
    track: source.track,
    tier: source.tier,
    existing: Boolean(source.existing),
    pages: pdfPages(pdfPath),
    words: total,
    convention,
    attribution: source.attribution ?? null,
    headings: roots.map((r) => ({
      level: r.level,
      title: r.title,
      words: r.words,
      children: r.children.map((c) => ({
        level: c.level,
        title: c.title,
        words: c.words,
        children: c.children.map((g) => ({ level: g.level, title: g.title, words: g.words })),
      })),
    })),
    plan: chapters.map((c, i) => ({
      piece: `${source.id}-${String(i + 1).padStart(2, "0")}`,
      sections: c.sections,
      words: c.words,
    })),
  });
}

mkdirSync(dirname(outJson), { recursive: true });
writeFileSync(outJson, `${JSON.stringify(catalogue, null, 2)}\n`, "utf8");

/* A review table — this is the artifact that gets read before any prose is
   written, so it has to show the cuts, the tier and the price. */
const md = [];
md.push("# Knowledge base catalogue");
md.push("");
md.push("> Generated by `npm run kb:catalog`. Review this before any prose is written.");
md.push("");
md.push(
  "| Source | Track | Tier | Pages | Words | Headings | Pieces |"
);
md.push("| --- | --- | --- | ---: | ---: | ---: | ---: |");
for (const s of catalogue.sources) {
  md.push(
    `| [${s.title}](${s.id}/) | ${s.track} | ${s.tier} | ${s.pages} | ` +
      `${s.words.toLocaleString()} | ${s.headings.length} | ` +
      `${s.existing ? "built" : s.plan.length} |`
  );
}
const totalWords = catalogue.sources.reduce((a, s) => a + s.words, 0);
const totalPieces = catalogue.sources.reduce((a, s) => a + s.plan.length, 0);
md.push("");
md.push(
  `**${catalogue.sources.length} sources · ${totalWords.toLocaleString()} words · ` +
    `${totalPieces} proposed chapter pieces**, before the short drills are added.`
);
md.push("");
md.push("## Cuts");
md.push("");
for (const s of catalogue.sources) {
  if (s.existing || !s.plan.length) continue;
  md.push(`### ${s.title} \u2014 \u2014${s.id}\u2014\u2014`);
  md.push("");
  for (const p of s.plan) {
    md.push(`- **${p.piece}** — ${p.sections.join(" / ")} (${p.words.toLocaleString()} words)`);
  }
  md.push("");
}
mkdirSync(join(root, "catalog"), { recursive: true });
writeFileSync(join(root, "catalog", "catalog.md"), md.join("\n"), "utf8");

const chapters = catalogue.sources.reduce((s, x) => s + x.plan.length, 0);
const words = catalogue.sources.reduce((s, x) => s + x.words, 0);
console.log(
  `\n${catalogue.sources.length} sources, ${words} words, ${chapters} proposed chapter pieces`
);
console.log(`wrote ${outJson}`);
