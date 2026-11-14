const PRIVATE_V4 = [
  /^0\./,
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./
];
const LOCAL_SUFFIXES = [".local", ".localhost", ".internal", ".intranet", ".lan", ".home.arpa"];
const LOCAL_HOSTNAMES = /* @__PURE__ */ new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
  "metadata.goog",
  "instance-data",
  "instance-data.ec2.internal"
]);
function parseIpv4(host) {
  const direct = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (direct) {
    const octets = direct.slice(1, 5).map(Number);
    return octets.every((n) => n >= 0 && n <= 255) ? octets : null;
  }
  if (/^\d{8,10}$/.test(host)) {
    const value = Number(host);
    if (value <= 4294967295) {
      return [value >>> 24 & 255, value >>> 16 & 255, value >>> 8 & 255, value & 255];
    }
  }
  if (/^0x[0-9a-f]{1,8}$/i.test(host)) {
    const value = parseInt(host.slice(2), 16);
    if (value <= 4294967295) {
      return [value >>> 24 & 255, value >>> 16 & 255, value >>> 8 & 255, value & 255];
    }
  }
  return null;
}
function isIpv6(host) {
  return host.includes(":") && /^[0-9a-f:]+$/i.test(host.replace(/^\[|\]$/g, ""));
}
function analyseHost(hostname) {
  const findings = [];
  const host = hostname.replace(/^\[|\]$/g, "");
  if (LOCAL_HOSTNAMES.has(host) || LOCAL_SUFFIXES.some((s) => host.endsWith(s))) {
    findings.push({
      code: "structure.local_host",
      severity: "critical",
      message: "Link points at a local or internal host."
    });
    return findings;
  }
  const octets = parseIpv4(host);
  if (octets) {
    const text = octets.join(".");
    findings.push({
      code: "host.ip_literal",
      severity: "critical",
      message: "Link uses a raw IP address instead of a domain.",
      detail: `${text} \u2014 legitimate file shares always use a named host.`
    });
    if (PRIVATE_V4.some((p) => p.test(text))) {
      findings.push({
        code: "host.private_range",
        severity: "critical",
        message: "Link resolves to a private network address."
      });
    }
    return findings;
  }
  if (isIpv6(host)) {
    findings.push({
      code: "host.ip_literal",
      severity: "critical",
      message: "Link uses a raw IPv6 address instead of a domain."
    });
  }
  return findings;
}
function analysePort(url) {
  if (!url.port) return [];
  const port = Number(url.port);
  const common = [80, 443, 8080, 8443];
  if (common.includes(port)) return [];
  return [
    {
      code: "structure.port",
      severity: "low",
      message: `Link uses an unusual port (${port}).`
    }
  ];
}
function analyseQuery(params) {
  const findings = [];
  const risky = /(pass|secret|token|otp|code|session|auth|credential|pin|seed|mnemonic|key)/i;
  for (const [key, value] of params) {
    if (!risky.test(key)) continue;
    findings.push({
      code: "structure.sensitive_query",
      severity: "medium",
      message: `Link carries a sensitive-looking parameter (${key}).`,
      detail: "Links that embed passwords or tokens are often phishing lures."
    });
    if (value.length > 24) break;
  }
  return findings;
}
export {
  analyseHost,
  analysePort,
  analyseQuery,
  isIpv6,
  parseIpv4
};
