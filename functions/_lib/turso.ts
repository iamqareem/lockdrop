/**
 * Turso client built on the HTTP v2 pipeline API.
 *
 * Deliberately dependency-free: the Pages Functions bundle never imports an
 * npm package, so the project deploys with or without a build step and there
 * is no node_modules to ship.
 *
 * Wire format (verified against api.turso.tech):
 *   POST {base}/v2/pipeline
 *   { "requests": [ { "type": "execute", "stmt": { "sql": "...", "args": [...] } }, ... ] }
 *   -> { "results": [ { "type": "ok", "response": { "type": "execute",
 *           "result": { "cols": [{name}], "rows": [[{type, value}]] } } } ] }
 */
import type { Env } from "./types";

interface TursoCell {
  type: string;
  value: string | number | null;
}

interface TursoValue {
  type: "text" | "integer" | "float" | "null" | "blob";
  value: string | null;
}

interface TursoResult {
  type: "ok" | "error";
  response?: {
    type: "execute";
    result: {
      cols: Array<{ name: string }>;
      rows: TursoCell[][];
      affected_row_count: number;
    };
  };
  error?: { message: string; code?: string };
}

function baseUrl(env: Env): string {
  const raw = (env.TURSO_DATABASE_URL || "").trim();
  if (!raw) throw new Error("TURSO_DATABASE_URL is not configured");
  if (raw.startsWith("libsql://")) return `https://${raw.slice("libsql://".length)}`;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/+$/, "");
  throw new Error("TURSO_DATABASE_URL must be a libsql:// or https:// URL");
}

/**
 * Encodes a bind parameter for the Turso HTTP API.
 *
 * The pipeline API expects a tagged Value enum where the payload is ALWAYS a
 * string — sending a bare number or a raw string is rejected with
 * "invalid type: integer 41, expected internally tagged enum Value".
 */
function encodeArg(value: unknown): TursoValue {
  if (value === undefined || value === null) {
    return { type: "null", value: null };
  }
  if (typeof value === "boolean") {
    return { type: "integer", value: value ? "1" : "0" };
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return { type: "null", value: null };
    return Number.isInteger(value)
      ? { type: "integer", value: String(value) }
      : { type: "float", value: String(value) };
  }
  if (typeof value === "bigint") {
    return { type: "integer", value: value.toString() };
  }
  if (value instanceof Uint8Array) {
    return { type: "blob", value: toBase64(value) };
  }
  return { type: "text", value: String(value) };
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decodeCell(cell: TursoCell): string | number | null {
  if (cell.value === null || cell.value === undefined) return null;
  if (cell.type === "integer" || cell.type === "float") return Number(cell.value);
  return String(cell.value);
}

/** Runs one or more statements in a single round trip. */
async function pipeline<T>(
  env: Env,
  statements: Array<{ sql: string; args?: unknown[] }>
): Promise<T[]> {
  const requests = statements.map((stmt) => ({
    type: "execute",
    stmt: { sql: stmt.sql, args: (stmt.args ?? []).map(encodeArg) },
  }));
  // Terminate the stream so the server does not keep a baton open.
  requests.push({ type: "close" } as (typeof requests)[number]);

  const res = await fetch(`${baseUrl(env)}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.TURSO_AUTH_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ requests }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Turso HTTP ${res.status}: ${body.slice(0, 300)}`);
  }

  const payload = (await res.json()) as { results?: TursoResult[] };
  const results = payload.results ?? [];

  for (const result of results) {
    if (result.type === "error") {
      throw new Error(`Turso error: ${result.error?.message ?? "unknown"}`);
    }
  }

  const out: T[] = [];
  for (const result of results) {
    const table = result.response?.result;
    if (!table) continue;
    const names = table.cols.map((c) => c.name);
    for (const row of table.rows) {
      const obj: Record<string, string | number | null> = {};
      row.forEach((cell, i) => {
        obj[names[i]] = decodeCell(cell);
      });
      out.push(obj as T);
    }
  }
  return out;
}

/** SELECT-style helper. Returns decoded row objects. */
export function query<T>(env: Env, sql: string, args: unknown[] = []): Promise<T[]> {
  return pipeline<T>(env, [{ sql, args }]);
}

/** INSERT/UPDATE/DELETE helper. Returns the number of rows written. */
export async function execute(
  env: Env,
  sql: string,
  args: unknown[] = []
): Promise<number> {
  const res = await fetch(`${baseUrl(env)}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.TURSO_AUTH_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      requests: [{ type: "execute", stmt: { sql, args: args.map(encodeArg) } }],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Turso HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const payload = (await res.json()) as { results?: TursoResult[] };
  const first = payload.results?.[0];
  if (first?.type === "error") {
    throw new Error(`Turso error: ${first.error?.message ?? "unknown"}`);
  }
  return first?.response?.result?.affected_row_count ?? 0;
}

/** True when the database is reachable and the expected tables exist. */
export async function health(env: Env): Promise<{ ok: boolean; detail: string }> {
  try {
    const rows = await query<{ c: number }>(
      env,
      "SELECT count(*) AS c FROM drops"
    );
    return { ok: true, detail: `${rows[0]?.c ?? 0} drops` };
  } catch (err) {
    return {
      ok: false,
      detail: err instanceof Error ? err.message : "unknown error",
    };
  }
}
