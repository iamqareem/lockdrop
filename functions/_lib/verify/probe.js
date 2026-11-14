import { parseIpv4 } from "./structure.js";
import { analyseContent } from "./host.js";
const MAX_REDIRECTS = 3;
const MAX_BYTES = 64 * 1024;
const TIMEOUT_MS = 6e3;
const LOCAL_SUFFIXES = [".local", ".localhost", ".internal", ".intranet", ".lan", ".home.arpa"];
const LOCAL_HOSTNAMES = /* @__PURE__ */ new Set([
  "localhost",
  "metadata.google.internal",
  "metadata.goog",
  "instance-data",
  "instance-data.ec2.internal"
]);
function assertFetchable(rawUrl) {
  let url;
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
function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i);
  if (!match) return void 0;
  const title = match[1].replace(/\s+/g, " ").trim();
  return title ? title.slice(0, 160) : void 0;
}
function isBinary(contentType) {
  return /^(application\/(octet-stream|zip|x-|pdf|vnd\.)|video\/|audio\/|image\/)/i.test(
    contentType
  );
}
async function readCapped(res, maxBytes) {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks = [];
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
async function probeUrl(startUrl) {
  const findings = [];
  const redirectChain = [];
  let current = startUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const guard = assertFetchable(current);
    if (!guard.ok) {
      return { ok: false, redirectChain, error: guard.reason, findings, requiresAuth: false };
    }
    let res;
    try {
      res = await fetch(current, {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          "user-agent": "LockDrop-Link-Checker/1.0 (+https://lockdrop.app)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en"
        }
      });
    } catch (err) {
      return {
        ok: false,
        redirectChain,
        error: err instanceof Error ? err.message : "Network error",
        findings,
        requiresAuth: false
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
          requiresAuth: false
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
          requiresAuth: false
        };
      }
      continue;
    }
    const contentType = (res.headers.get("content-type") || "").split(";")[0].trim();
    const title = contentType.includes("html") ? void 0 : void 0;
    let body = "";
    if (!isBinary(contentType)) {
      body = await readCapped(res, MAX_BYTES);
    } else {
      try {
        await res.body?.cancel();
      } catch {
      }
    }
    const pageTitle = title ?? (body ? extractTitle(body) : void 0);
    const requiresAuth = /\/login|\/signin|\/account\/signin/i.test(
      (res.headers.get("location") || "") + (pageTitle || "")
    );
    if (res.status >= 400) {
      findings.push({
        code: "probe.http_error",
        severity: res.status === 404 ? "medium" : "low",
        message: `Destination returned HTTP ${res.status}.`
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
      requiresAuth
    };
  }
  return {
    ok: false,
    redirectChain,
    error: `Too many redirects (more than ${MAX_REDIRECTS}).`,
    findings,
    requiresAuth: false
  };
}
export {
  assertFetchable,
  probeUrl
};
