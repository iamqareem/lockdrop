const SEVERITY_WEIGHT = {
  info: 0,
  low: 4,
  medium: 12,
  high: 30,
  critical: 70
};
function worstSeverity(findings) {
  const order = ["info", "low", "medium", "high", "critical"];
  let worst = "info";
  for (const finding of findings) {
    if (order.indexOf(finding.severity) > order.indexOf(worst)) worst = finding.severity;
  }
  return worst;
}
export {
  SEVERITY_WEIGHT,
  worstSeverity
};
