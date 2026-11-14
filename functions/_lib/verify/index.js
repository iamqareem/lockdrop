import { query, execute } from "../turso.js";
import { urlHash } from "../crypto.js";
import { judgeWithAi } from "../ai.js";
import { normalise } from "./normalize.js";
import { analyseHost, analysePort, analyseQuery } from "./structure.js";
import { analyseHostReputation } from "./host.js";
import {
  CATEGORY_BY_ID,
  CATEGORY_RULES,
  detectCategories,
  evaluateCategory,
  matchesHost
} from "./categories.js";
import { probeUrl, assertFetchable } from "./probe.js";
import { scoreFindings, verdictFromFindings, summarise } from "./rules.js";
function categoryLabel(categoryId) {
  return CATEGORY_BY_ID.get(categoryId)?.label ?? "Resource";
}
function categoryFindings(categoryId, host, pathname, detected) {
  const rule = CATEGORY_BY_ID.get(categoryId);
  if (!rule) {
    return [
      {
        code: "category.unknown",
        severity: "medium",
        message: `Unknown category "${categoryId}".`
      }
    ];
  }
  const { matched, findings } = evaluateCategory(rule, host, pathname);
  if (matched) return findings;
  if (rule.specific) {
    const otherBrand = detected.find((id) => {
      const candidate = CATEGORY_BY_ID.get(id);
      return candidate?.specific && candidate.id !== rule.id && matchesHost(candidate, host);
    });
    if (otherBrand) {
      findings.push({
        code: "category.brand_mismatch",
        severity: "critical",
        message: `Link is a ${CATEGORY_BY_ID.get(otherBrand)?.label} link, not ${rule.label}.`,
        detail: "Listing a link under a different brand is a common bait pattern."
      });
      return findings;
    }
  }
  return findings;
}
async function runAi(env, input, host, heuristic) {
  if (input.skipAi) return null;
  return judgeWithAi(
    env,
    {
      title: input.title || "Untitled resource",
      url: input.url,
      category: categoryLabel(input.categoryId),
      host
    },
    heuristic
  );
}
async function verifyLink(env, input) {
  const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
  const normalised = normalise(input.url);
  if (!normalised) {
    return {
      url: input.url,
      normalizedUrl: input.url,
      host: "",
      categoryId: input.categoryId,
      categoryLabel: categoryLabel(input.categoryId),
      categoryMatched: false,
      detectedCategories: [],
      score: 100,
      verdict: "Blocked",
      reason: "The link could not be parsed as a valid URL.",
      source: "heuristic",
      findings: [
        {
          code: "normalize.invalid",
          severity: "critical",
          message: "The link could not be parsed as a valid URL."
        }
      ],
      checkedAt
    };
  }
  const findings = [...normalised.findings];
  findings.push(...analyseHost(normalised.hostname));
  findings.push(...analysePort(normalised.url));
  findings.push(...analyseQuery(normalised.meaningfulParams));
  findings.push(...analyseHostReputation(normalised.hostname, normalised.pathname));
  const detected = detectCategories(normalised.hostname, normalised.pathname);
  const categoryResult = categoryFindings(
    input.categoryId,
    normalised.hostname,
    normalised.pathname,
    detected
  );
  findings.push(...categoryResult);
  let probeResult;
  if (!input.skipProbe && assertFetchable(normalised.url.href).ok) {
    try {
      const probe = await probeUrl(normalised.url.href);
      probeResult = {
        ok: probe.ok,
        finalUrl: probe.finalUrl,
        status: probe.status,
        contentType: probe.contentType,
        title: probe.title,
        redirectChain: probe.redirectChain,
        error: probe.error
      };
      findings.push(...probe.findings);
      if (probe.redirectChain.length > 1) {
        const first = new URL(probe.redirectChain[0]);
        const last = new URL(probe.redirectChain[probe.redirectChain.length - 1]);
        if (first.hostname !== last.hostname) {
          findings.push({
            code: "probe.domain_change",
            severity: "medium",
            message: `Link redirects to a different domain (${last.hostname}).`
          });
        }
      }
    } catch (err) {
      probeResult = {
        ok: false,
        redirectChain: [],
        error: err instanceof Error ? err.message : "Probe failed"
      };
    }
  }
  let score = scoreFindings(findings);
  let verdict = verdictFromFindings(findings, score);
  let source = "heuristic";
  let reason = summarise(findings, verdict, normalised.hostname);
  const ai = await runAi(env, input, normalised.hostname, verdict);
  if (ai) {
    source = "ai";
    if (ai.risk === "high" && verdict !== "Blocked") {
      score = Math.max(score, 70);
      verdict = "Blocked";
      reason = ai.reason;
    } else if (ai.risk === "medium" && verdict === "Trusted") {
      score = Math.max(score, 25);
      verdict = "Caution";
      reason = ai.reason;
    } else if (ai.risk === "low" && verdict !== "Blocked") {
      reason = ai.reason;
    }
  }
  const matched = !findings.some(
    (f) => f.code.startsWith("category.") && (f.severity === "high" || f.severity === "critical")
  );
  return {
    url: input.url,
    normalizedUrl: normalised.canonical,
    host: normalised.hostname,
    categoryId: input.categoryId,
    categoryLabel: categoryLabel(input.categoryId),
    categoryMatched: matched,
    detectedCategories: detected,
    score,
    verdict,
    reason: reason.slice(0, 200),
    source,
    findings,
    probe: probeResult,
    checkedAt
  };
}
async function verifyWithCache(env, input, maxAgeMs = 1e3 * 60 * 60 * 24) {
  const hash = await urlHash(input.url.trim());
  try {
    const rows = await query(
      env,
      "SELECT verdict, reason, score, source, report, created_at FROM verdict_cache WHERE url_hash = ?",
      [hash]
    );
    const row = rows[0];
    if (row) {
      const age = Date.now() - new Date(row.created_at).getTime();
      if (age < maxAgeMs) {
        const cached = safeParse(row.report);
        if (cached) {
          return { ...cached, source: "cached", verdict: row.verdict, reason: row.reason };
        }
      }
    }
  } catch {
  }
  const report = await verifyLink(env, input);
  try {
    await execute(
      env,
      `INSERT INTO verdict_cache (url_hash, verdict, reason, score, source, report, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(url_hash) DO UPDATE SET
         verdict = excluded.verdict,
         reason = excluded.reason,
         score = excluded.score,
         source = excluded.source,
         report = excluded.report,
         created_at = excluded.created_at`,
      [
        hash,
        report.verdict,
        report.reason,
        report.score,
        report.source,
        JSON.stringify(report),
        report.checkedAt
      ]
    );
  } catch {
  }
  return report;
}
function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
export {
  CATEGORY_RULES,
  verifyLink,
  verifyWithCache
};
