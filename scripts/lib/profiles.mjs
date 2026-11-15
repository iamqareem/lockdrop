/**
 * Per-source sanitising profiles.
 *
 * One set of rules does not fit every book. A chapter-based manual, a numbered
 * exam guide, a slide deck and a markdown note all need different treatment,
 * and a single global rule ends up fighting itself: "a heading must follow a
 * blank line" breaks subsections that follow their parent, and a rule that
 * treats every `#` as a heading matches every shell comment.
 *
 * So each source declares the profile it wants. The profile drives both the
 * heading detection and the typesetting.
 */

/** The heading rule families. */
export const HEADING_RULES = {
  /** "Chapter 3. Title" — the manual convention. */
  chapter: [
    { id: "chapter", level: 1, re: /^chapter\s+([0-9]+)[.:]?\s*(.+)$/i, title: (m) => `Chapter ${m[1]}. ${m[2]}` },
    { id: "dotted3", level: 3, re: /^([0-9]+)\.([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]}.${m[3]} ${m[4]}` },
    { id: "dotted2", level: 2, re: /^([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]} ${m[3]}` },
    { id: "dotted1", level: 1, re: /^([0-9]+)\.?\s+([A-Z]\S.*)$/, title: (m) => `${m[1]}. ${m[2]}` },
  ],

  /** "TOPIC 101: Title" — the LPI exam convention. */
  topic: [
    { id: "topic", level: 1, re: /^topic\s+([0-9]+)[:.]\s*(.+)$/i, title: (m) => `Topic ${m[1]}: ${m[2]}` },
    { id: "dotted3", level: 3, re: /^([0-9]+)\.([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]}.${m[3]} ${m[4]}` },
    { id: "dotted2", level: 2, re: /^([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]} ${m[3]}` },
    { id: "dotted1", level: 1, re: /^([0-9]+)\.?\s+([A-Z]\S.*)$/, title: (m) => `${m[1]}. ${m[2]}` },
  ],

  /** "2. Title" — the plain numbered convention. */
  numbered: [
    { id: "dotted3", level: 3, re: /^([0-9]+)\.([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]}.${m[3]} ${m[4]}` },
    { id: "dotted2", level: 2, re: /^([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]} ${m[3]}` },
    { id: "dotted1", level: 1, re: /^([0-9]+)\.?\s+([A-Z]\S.*)$/, title: (m) => `${m[1]}. ${m[2]}` },
    { id: "part", level: 1, re: /^(?:part\s+)?([IVXLC]+)[:.]\s+([A-Z].*)$/, title: (m) => `${m[1]}. ${m[2]}` },
    { id: "appendix", level: 1, re: /^(appendix\s+[A-Z])\b[:.]?\s*(.*)$/i, title: (m) => (m[2] ? `${m[1]}: ${m[2]}` : m[1]) },
  ],

  /** No numbering at all — a slide deck or a prose manual. */
  structural: [],

  /** Already markdown. */
  markdown: [
    { id: "markdown", level: 1, re: /^#{1,6}\s+(.+)$/, title: (m) => m[1] },
    { id: "dotted2", level: 2, re: /^([0-9]+)\.([0-9]+)\.?\s+(\S.*)$/, title: (m) => `${m[1]}.${m[2]} ${m[3]}` },
  ],
};

/**
 * The profiles. Each one says how headings are found and how the text is
 * cleaned.
 */
export const PROFILES = {
  /** A manual with "Chapter N." headings and indented code. */
  manual: {
    headingRules: "chapter",
    blankBefore: "heading-or-blank",
    detectLists: true,
    codeStyle: "indented",
    joinWrapped: true,
  },

  /** An exam guide with "TOPIC n:" headings. */
  exam: {
    headingRules: "topic",
    blankBefore: "heading-or-blank",
    detectLists: true,
    codeStyle: "indented",
    joinWrapped: false,
  },

  /** A plain numbered manual. */
  numbered: {
    headingRules: "numbered",
    blankBefore: "heading-or-blank",
    detectLists: true,
    codeStyle: "indented",
    joinWrapped: true,
  },

  /** A slide deck: no numbering, short blocks, code with prompts. */
  slides: {
    headingRules: "structural",
    blankBefore: "any",
    detectLists: false,
    codeStyle: "none",
    joinWrapped: false,
  },

  /** Prose with titled blocks. */
  prose: {
    headingRules: "structural",
    blankBefore: "any",
    detectLists: false,
    codeStyle: "none",
    joinWrapped: false,
  },

  /** Already markdown. */
  markdown: {
    headingRules: "markdown",
    blankBefore: "any",
    detectLists: false,
    codeStyle: "fenced",
    joinWrapped: false,
  },
};

/** The profile for a source, with the defaults. */
export function profileFor(meta) {
  const name = meta?.profile ?? "numbered";
  return { name, ...(PROFILES[name] ?? PROFILES.numbered) };
}

/**
 * Validates a heading's text so a table cell or a measurement never passes.
 */
export function validHeadingText(text) {
  const t = String(text).trim();
  if (!t) return false;
  if (!/^[A-Z0-9]/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length >= 2) return true;
  return t.replace(/[^A-Za-z]/g, "").length >= 4;
}

/** Validates a short title, as used for chapters and topics. */
export function validShortTitle(text) {
  const t = String(text).trim();
  if (!t || !/^[A-Z]/.test(t)) return false;
  if (t.length > 60) return false;
  if (t.split(/\s+/).length > 8) return false;
  if (/[.!?]$/.test(t)) return false;
  return true;
}

/** The rule that must be satisfied by the heading's text, per rule id. */
export function textValidator(ruleId) {
  switch (ruleId) {
    case "chapter":
    case "topic":
    case "part":
      return validShortTitle;
    default:
      return validHeadingText;
  }
}
