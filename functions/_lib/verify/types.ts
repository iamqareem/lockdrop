/** Shared types for the link verification engine. */

export type Severity = "info" | "low" | "medium" | "high" | "critical";

export interface Finding {
  /** Stable machine-readable identifier, e.g. "host.ip_literal". */
  code: string;
  severity: Severity;
  /** Short, human readable explanation shown on the drop card. */
  message: string;
  /** Optional supporting detail. */
  detail?: string;
}

export type Verdict = "Trusted" | "Caution" | "Blocked";

export interface VerifyReport {
  url: string;
  normalizedUrl: string;
  host: string;
  categoryId: string;
  categoryLabel: string;
  /** True when the URL is consistent with the chosen category. */
  categoryMatched: boolean;
  /** Categories the URL actually looks like. */
  detectedCategories: string[];
  /** 0 = clean, 100 = certainly hostile. */
  score: number;
  verdict: Verdict;
  reason: string;
  source: "heuristic" | "ai" | "cached";
  findings: Finding[];
  /** Live probe results, when the probe ran. */
  probe?: {
    ok: boolean;
    finalUrl?: string;
    status?: number;
    contentType?: string;
    title?: string;
    redirectChain: string[];
    error?: string;
  };
  checkedAt: string;
}

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  info: 0,
  low: 4,
  medium: 12,
  high: 30,
  critical: 70,
};

export function worstSeverity(findings: Finding[]): Severity {
  const order: Severity[] = ["info", "low", "medium", "high", "critical"];
  let worst: Severity = "info";
  for (const finding of findings) {
    if (order.indexOf(finding.severity) > order.indexOf(worst)) worst = finding.severity;
  }
  return worst;
}
