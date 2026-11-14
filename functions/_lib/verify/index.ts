/**
 * Link verification orchestrator.
 *
 * Runs the whole chain in order and produces a single report:
 *   normalise -> structure -> host reputation -> category fit -> live probe
 *   -> score -> verdict -> AI escalation
 *
 * The AI is only allowed to make the verdict stricter, never more lenient.
 */
import type { Env } from "../types";
import { query, execute } from "../turso";
import { urlHash } from "../crypto";
import { judgeWithAi } from "../ai";
import { normalise } from "./normalize";
import { analyseHost, analysePort, analyseQuery } from "./structure";
import { analyseHostReputation } from "./host";
import {
  CATEGORY_BY_ID,
  CATEGORY_RULES,
  detectCategories,
  evaluateCategory,
  matchesHost,
} from "./categories";
import { probeUrl, assertFetchable } from "./probe";
import { scoreFindings, verdictFromFindings, summarise } from "./rules";
import type { Finding, Verdict, VerifyReport } from "./types";

export interface VerifyInput {
  url: string;
  categoryId: string;
  title: string;
  /** Skip the live network probe (used for cheap re-checks). */
  skipProbe?: boolean;
  /** Skip the AI judgement (used when only the cache is being refreshed). */
  skipAi?: boolean;
}

function categoryLabel(categoryId: string): string {
  return CATEGORY_BY_ID.get(categoryId)?.label ?? "Resource";
}

/**
 * Compares the chosen category with what the URL actually is.
 * Picking "Notion" for a Dropbox link is a strong deception signal, so it is
 * treated as critical.
 */
function categoryFindings(
  categoryId: string,
  host: string,
  pathname: string,
  detected: string[]
): Finding[] {
  const rule = CATEGORY_BY_ID.get(categoryId);
  if (!rule) {
    return [
      {
        code: "category.unknown",
        severity: "medium",
        message: `Unknown category "${categoryId}".`,
      },
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
        detail: "Listing a link under a different brand is a common bait pattern.",
      });
      return findings;
    }
  }

  return findings;
}

async function runAi(
  env: Env,
  input: VerifyInput,
  host: string,
  heuristic: Verdict
) {
  if (input.skipAi) return null;
  return judgeWithAi(
    env,
    {
      title: input.title || "Untitled resource",
      url: input.url,
      category: categoryLabel(input.categoryId),
      host,
    },
    heuristic
  );
}

/** Full verification. Performs network and AI work. */
export async function verifyLink(env: Env, input: VerifyInput): Promise<VerifyReport> {
  const checkedAt = new Date().toISOString();
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
          message: "The link could not be parsed as a valid URL.",
        },
      ],
      checkedAt,
    };
  }

  const findings: Finding[] = [...normalised.findings];
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

  let probeResult:
    | {
        ok: boolean;
        finalUrl?: string;
        status?: number;
        contentType?: string;
        title?: string;
        redirectChain: string[];
        error?: string;
      }
    | undefined;

  if (!input.skipProbe && assertFetchable(normalised.url.href).ok) {
    // The probe must never be able to fail the whole request: a flaky DNS
    // lookup or an unreachable host is a "we could not check", not an error.
    try {
      const probe = await probeUrl(normalised.url.href);
      probeResult = {
        ok: probe.ok,
        finalUrl: probe.finalUrl,
        status: probe.status,
        contentType: probe.contentType,
        title: probe.title,
        redirectChain: probe.redirectChain,
        error: probe.error,
      };
      findings.push(...probe.findings);

      if (probe.redirectChain.length > 1) {
        const first = new URL(probe.redirectChain[0]);
        const last = new URL(probe.redirectChain[probe.redirectChain.length - 1]);
        if (first.hostname !== last.hostname) {
          findings.push({
            code: "probe.domain_change",
            severity: "medium",
            message: `Link redirects to a different domain (${last.hostname}).`,
          });
        }
      }
    } catch (err) {
      probeResult = {
        ok: false,
        redirectChain: [],
        error: err instanceof Error ? err.message : "Probe failed",
      };
    }
  }

  let score = scoreFindings(findings);
  let verdict = verdictFromFindings(findings, score);
  let source: VerifyReport["source"] = "heuristic";
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

  const matched = !findings.some((f) =>
    f.code.startsWith("category.") &&
    (f.severity === "high" || f.severity === "critical")
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
    checkedAt,
  };
}

/**
 * Cached verification. The cache key is the canonical URL, so re-publishing
 * the same link never spends AI neurons or bandwidth again.
 */
export async function verifyWithCache(
  env: Env,
  input: VerifyInput,
  maxAgeMs = 1000 * 60 * 60 * 24
): Promise<VerifyReport> {
  const hash = await urlHash(input.url.trim());

  try {
    const rows = await query<{
      verdict: Verdict;
      reason: string;
      score: number;
      source: string;
      report: string;
      created_at: string;
    }>(
      env,
      "SELECT verdict, reason, score, source, report, created_at FROM verdict_cache WHERE url_hash = ?",
      [hash]
    );
    const row = rows[0];
    if (row) {
      const age = Date.now() - new Date(row.created_at).getTime();
      if (age < maxAgeMs) {
        const cached = safeParse(row.report) as VerifyReport | null;
        if (cached) {
          return { ...cached, source: "cached", verdict: row.verdict, reason: row.reason };
        }
      }
    }
  } catch {
    // A cache miss is fine; the database may not have the table yet.
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
        report.checkedAt,
      ]
    );
  } catch {
    // Caching is best effort.
  }

  return report;
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export { CATEGORY_RULES };
