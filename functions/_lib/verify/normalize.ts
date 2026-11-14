/**
 * URL normalisation: turns whatever the user pasted into a canonical,
 * comparable URL and surfaces structural problems along the way.
 */
import type { Finding } from "./types";

export interface NormalisedUrl {
  /** The URL as parsed, with a scheme guaranteed. */
  url: URL;
  /** Canonical form used for hashing and comparison. */
  canonical: string;
  host: string;
  hostname: string;
  pathname: string;
  /** Query parameters worth keeping (tracking noise removed). */
  meaningfulParams: Array<[string, string]>;
  findings: Finding[];
}

const TRACKING_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "utm_id", "utm_name", "utm_reader", "utm_social", "utm_brand",
  "fbclid", "gclid", "dclid", "msclkid", "twclid", "igshid", "mc_cid", "mc_eid",
  "igsh", "si", "feature", "ref", "ref_src", "referrer", "source",
  "_hsenc", "_hsmi", "yclid", "s_kwcid",
]);

export function looksLikeUrl(raw: string): boolean {
  const value = raw.trim();
  if (!value) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return true;
  if (/^www\.[^\s]+\.[a-z]{2,}(\/|$)/i.test(value)) return true;
  return /^[^\s]+\.[a-z]{2,}(\/|$)/i.test(value) && !/\s/.test(value);
}

/** Adds a scheme when the user pasted a bare host. */
export function ensureScheme(raw: string): string {
  const value = raw.trim();
  if (!value) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return `https://${value}`;
}

/**
 * Parses and normalises a user-supplied link.
 * Never throws — problems are returned as findings.
 */
export function normalise(raw: string): NormalisedUrl | null {
  const findings: Finding[] = [];
  const candidate = ensureScheme(raw);

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    findings.push({
      code: "structure.scheme",
      severity: "critical",
      message: `Only http and https links can be locked (got ${url.protocol.replace(":", "")}).`,
    });
  } else if (url.protocol === "http:") {
    findings.push({
      code: "structure.insecure_scheme",
      severity: "medium",
      message: "Link uses plain HTTP, so nothing about it is encrypted in transit.",
    });
  }

  const hostname = url.hostname.toLowerCase();
  const host = url.host.toLowerCase();

  if (url.username || url.password) {
    findings.push({
      code: "structure.credentials",
      severity: "critical",
      message: "Link embeds a username or password.",
      detail: "Credentials in a URL are a classic phishing pattern.",
    });
  }

  if (url.href.length > 2000) {
    findings.push({
      code: "structure.length",
      severity: "low",
      message: "Unusually long link.",
    });
  }

  const meaningfulParams: Array<[string, string]> = [];
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
    findings,
  };
}
