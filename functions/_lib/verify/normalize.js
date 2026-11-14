const TRACKING_PARAMS = /* @__PURE__ */ new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_name",
  "utm_reader",
  "utm_social",
  "utm_brand",
  "fbclid",
  "gclid",
  "dclid",
  "msclkid",
  "twclid",
  "igshid",
  "mc_cid",
  "mc_eid",
  "igsh",
  "si",
  "feature",
  "ref",
  "ref_src",
  "referrer",
  "source",
  "_hsenc",
  "_hsmi",
  "yclid",
  "s_kwcid"
]);
function looksLikeUrl(raw) {
  const value = raw.trim();
  if (!value) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return true;
  if (/^www\.[^\s]+\.[a-z]{2,}(\/|$)/i.test(value)) return true;
  return /^[^\s]+\.[a-z]{2,}(\/|$)/i.test(value) && !/\s/.test(value);
}
function ensureScheme(raw) {
  const value = raw.trim();
  if (!value) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return `https://${value}`;
}
function normalise(raw) {
  const findings = [];
  const candidate = ensureScheme(raw);
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    findings.push({
      code: "structure.scheme",
      severity: "critical",
      message: `Only http and https links can be locked (got ${url.protocol.replace(":", "")}).`
    });
  } else if (url.protocol === "http:") {
    findings.push({
      code: "structure.insecure_scheme",
      severity: "medium",
      message: "Link uses plain HTTP, so nothing about it is encrypted in transit."
    });
  }
  const hostname = url.hostname.toLowerCase();
  const host = url.host.toLowerCase();
  if (url.username || url.password) {
    findings.push({
      code: "structure.credentials",
      severity: "critical",
      message: "Link embeds a username or password.",
      detail: "Credentials in a URL are a classic phishing pattern."
    });
  }
  if (url.href.length > 2e3) {
    findings.push({
      code: "structure.length",
      severity: "low",
      message: "Unusually long link."
    });
  }
  const meaningfulParams = [];
  for (const [key, value] of url.searchParams.entries()) {
    if (!TRACKING_PARAMS.has(key.toLowerCase())) meaningfulParams.push([key, value]);
  }
  const canonicalUrl = new URL(url.href);
  canonicalUrl.hash = "";
  for (const key of TRACKING_PARAMS) canonicalUrl.searchParams.delete(key);
  canonicalUrl.username = "";
  canonicalUrl.password = "";
  return {
    url,
    canonical: canonicalUrl.href,
    host,
    hostname,
    pathname: url.pathname || "/",
    meaningfulParams,
    findings
  };
}
export {
  ensureScheme,
  looksLikeUrl,
  normalise
};
