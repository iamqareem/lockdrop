/**
 * API client.
 *
 * Every read and write goes through the LockDrop backend, which is the only
 * component that talks to Turso. The browser never sees the database URL or
 * its token.
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
        : "Could not reach the LockDrop API.",
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

function query(params = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const text = search.toString();
  return text ? `?${text}` : "";
}

export const api = {
  config: () => request("/config"),

  contract: () => request("/contract"),

  listDrops: (params) => request(`/drops${query(params)}`),

  getDrop: (id) => request(`/drops/${encodeURIComponent(id)}`),

  createDrop: (body) => request("/drops", { method: "POST", body }),

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
