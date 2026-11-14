/**
 * Scoring: turns a pile of findings into one number, one verdict and one
 * short sentence that fits on a drop card.
 */
import type { Finding, Severity, Verdict } from "./types";
import { SEVERITY_WEIGHT } from "./types";

export const BLOCKED_THRESHOLD = 70;
export const CAUTION_THRESHOLD = 25;

export function scoreFindings(findings: Finding[]): number {
  let score = 0;
  for (const finding of findings) {
    score += SEVERITY_WEIGHT[finding.severity] ?? 0;
  }
  return Math.min(100, score);
}

export function verdictFromScore(score: number): Verdict {
  if (score >= BLOCKED_THRESHOLD) return "Blocked";
  if (score >= CAUTION_THRESHOLD) return "Caution";
  return "Trusted";
}

/**
 * The verdict takes both the accumulated score and the single worst finding
 * into account. A purely additive score is too forgiving: one medium finding
 * (12 points) would otherwise still read as "Trusted", and a single critical
 * finding should always block regardless of what else was found.
 */
export function verdictFromFindings(findings: Finding[], score: number): Verdict {
  const has = (severity: Severity) => findings.some((f) => f.severity === severity);

  if (has("critical")) return "Blocked";
  if (score >= BLOCKED_THRESHOLD) return "Blocked";

  if (has("high")) return "Caution";
  if (has("medium")) return "Caution";
  if (has("low")) return verdictFromScore(score);

  return verdictFromScore(score);
}

/** The most important finding, used as the headline of the verdict. */
export function primaryFinding(findings: Finding[]): Finding | null {
  const order: Severity[] = ["critical", "high", "medium", "low", "info"];
  for (const severity of order) {
    const match = findings.find((f) => f.severity === severity);
    if (match) return match;
  }
  return null;
}

/** A single short sentence explaining the verdict. */
export function summarise(findings: Finding[], verdict: Verdict, host: string): string {
  const primary = primaryFinding(findings);
  if (primary) {
    const detail = primary.detail ? ` ${primary.detail}` : "";
    return `${primary.message}${detail}`.slice(0, 200);
  }
  if (verdict === "Trusted") {
    return `HTTPS link on ${host} passed structural and category checks.`;
  }
  return `Link on ${host} needs manual review.`;
}
