import { SEVERITY_WEIGHT } from "./types.js";
const BLOCKED_THRESHOLD = 70;
const CAUTION_THRESHOLD = 25;
function scoreFindings(findings) {
  let score = 0;
  for (const finding of findings) {
    score += SEVERITY_WEIGHT[finding.severity] ?? 0;
  }
  return Math.min(100, score);
}
function verdictFromScore(score) {
  if (score >= BLOCKED_THRESHOLD) return "Blocked";
  if (score >= CAUTION_THRESHOLD) return "Caution";
  return "Trusted";
}
function verdictFromFindings(findings, score) {
  const has = (severity) => findings.some((f) => f.severity === severity);
  if (has("critical")) return "Blocked";
  if (score >= BLOCKED_THRESHOLD) return "Blocked";
  if (has("high")) return "Caution";
  if (has("medium")) return "Caution";
  if (has("low")) return verdictFromScore(score);
  return verdictFromScore(score);
}
function primaryFinding(findings) {
  const order = ["critical", "high", "medium", "low", "info"];
  for (const severity of order) {
    const match = findings.find((f) => f.severity === severity);
    if (match) return match;
  }
  return null;
}
function summarise(findings, verdict, host) {
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
export {
  BLOCKED_THRESHOLD,
  CAUTION_THRESHOLD,
  primaryFinding,
  scoreFindings,
  summarise,
  verdictFromFindings,
  verdictFromScore
};
