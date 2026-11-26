/**
 * The escrow gateway.
 *
 * These are the two operations that cannot happen in the browser: sealing a
 * URL (which needs the master key) and releasing it (which needs a verified
 * on-chain payment). They run as Cloudflare Pages Functions — part of the
 * Cloudflare Pages project, not a separate server.
 *
 * Everything the frontend *reads* goes straight to Turso instead; see
 * `drops.js` and `turso.js`.
 */

const BASE = "/api";

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const init = { method, headers: { ...headers } };
  if (body !== undefined) {
    init.headers["content-type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, init);
  } catch (err) {
    throw new ApiError(
      err instanceof Error && err.name === "AbortError"
        ? "The request timed out."
        : "The escrow service could not be reached.",
      0,
      null
    );
  }

  const text = await res.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }

  if (!res.ok) {
    const message =
      (payload && (payload.error || payload.message)) ||
      `Request failed with status ${res.status}.`;
    throw new ApiError(message, res.status, payload);
  }

  return payload;
}

export const api = {
  config: () => request("/config"),

  contract: () => request("/contract"),

  verify: (body) => request("/verify", { method: "POST", body }),

  unlock: (body) => request("/unlock", { method: "POST", body }),

  adminCreateDrop: (body, token) =>
    request("/admin/drops", {
      method: "POST",
      body,
      headers: { "x-admin-token": token },
    }),

  adminDeleteDrop: (id, token) =>
    request(`/drops/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    }),
};
