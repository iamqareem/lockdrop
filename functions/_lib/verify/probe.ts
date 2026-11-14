/**
 * Live probe: fetches the destination URL and inspects what is actually
 * served there.
 *
 * Runs server-side for three reasons: browsers block cross-origin reads, the
 * edge avoids CORS entirely, and the result cannot be tampered with by the
 * client before it reaches the buyer.
 *
 * SSRF guard: every hop in the redirect chain is re-validated, and literal or
 * internal addresses are refused outright.
 */
import { parseIpv4 } from "./structure";
import { analyseContent } from "./host";
import type { Finding } from "./types";

const MAX_REDIRECTS = 3;
const MAX_BYTES = 64 * 1024;
const TIMEOUT_MS = 6000;

const LOCAL_SUFFIXES = [".local", ".localhost", ".internal", ".intranet", ".lan", ".home.arpa"];
const LOCAL_HOSTNAMES = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata.goog",
  "instance-data",
  "instance-data.ec2.internal",
]);

export interface ProbeResult {
  ok: boolean;
  finalUrl?: string;
  status?: number;
  contentType?: string;
  title?: string;
  redirectChain: string[];
  error?: string;
  /** Text findings derived from the fetched page. */
  findings: Finding[];
  /** True when the destination required a sign-in. */
  requiresAuth: boolean;
}

/** Refuses URLs that point at infrastructure rather than a public host. */
export function assertFetchable(rawUrl: string): { ok: boolean; reason?: string } {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { ok: false, reason: "Malformed URL." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "Only http and https links can be probed." };
  }

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (LOCAL_HOSTNAMES.has(host) || LOCAL_SUFFIXES.some((s) => host.endsWith(s))) {
    return { ok: false, reason: "Refusing to probe an internal host." };
  }
  if (parseIpv4(host) || host.includes(":")) {
    return { ok: false, reason: "Refusing to probe a raw IP address." };
  }
  return { ok: true };
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i);
  if (!match) return undefined;
  const title = match[1].replace(/\s+/g, " ").trim();
  return title ? title.slice(0, 160) : undefined;
}

function isBinary(contentType: string): boolean {
  return /^(application\/(octet-stream|zip|x-|pdf|vnd\.)|video\/|audio\/|image\/)/i.test(
    contentType
  );
}

async function readCapped(res: Response, maxBytes: number): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (total < maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      chunks.push(value);
      total += value.byteLength;
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      /* the body may already be closed */
    }
  }
  const merged = new Uint8Array(Math.min(total, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    if (offset >= merged.length) break;
    const slice = chunk.subarray(0, merged.length - offset);
    merged.set(slice, offset);
    offset += slice.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(merged);
}

/**
 * Fetches the URL and reports what it found.
 * Never throws — failures are reported as `ok: false` with an error string.
 */
export async function probeUrl(startUrl: string): Promise<ProbeResult> {
  const findings: Finding[] = [];
  const redirectChain: string[] = [];
  let current = startUrl;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const guard = assertFetchable(current);
    if (!guard.ok) {
      return { ok: false, redirectChain, error: guard.reason, findings, requiresAuth: false };
    }

    let res: Response;
    try {
      res = await fetch(current, {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          "user-agent": "LockDrop-Link-Checker/1.0 (+https://lockdrop.app)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en",
        },
      });
    } catch (err) {
      return {
        ok: false,
        redirectChain,
        error: err instanceof Error ? err.message : "Network error",
        findings,
        requiresAuth: false,
      };
    }

    redirectChain.push(current);

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get("location");
      if (!location) {
        return {
          ok: false,
          finalUrl: current,
          status: res.status,
          redirectChain,
          error: "Redirect without a target.",
          findings,
          requiresAuth: false,
        };
      }
      try {
        current = new URL(location, current).href;
      } catch {
        return {
          ok: false,
          finalUrl: current,
          status: res.status,
          redirectChain,
          error: "Malformed redirect target.",
          findings,
          requiresAuth: false,
        };
      }
      continue;
    }

    const contentType = (res.headers.get("content-type") || "").split(";")[0].trim();
    const title = contentType.includes("html") ? undefined : undefined;
    let body = "";
    if (!isBinary(contentType)) {
      body = await readCapped(res, MAX_BYTES);
    } else {
      try {
        await res.body?.cancel();
      } catch {
        /* ignore */
      }
    }

    const pageTitle = title ?? (body ? extractTitle(body) : undefined);
    const requiresAuth = /\/login|\/signin|\/account\/signin/i.test(
      (res.headers.get("location") || "") + (pageTitle || "")
    );

    if (res.status >= 400) {
      findings.push({
        code: "probe.http_error",
        severity: res.status === 404 ? "medium" : "low",
        message: `Destination returned HTTP ${res.status}.`,
      });
    }

    if (body) findings.push(...analyseContent(body));

    return {
      ok: true,
      finalUrl: current,
      status: res.status,
      contentType,
      title: pageTitle,
      redirectChain,
      findings,
      requiresAuth,
    };
  }

  return {
    ok: false,
    redirectChain,
    error: `Too many redirects (more than ${MAX_REDIRECTS}).`,
    findings,
    requiresAuth: false,
  };
}
