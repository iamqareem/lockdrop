function baseUrl(env) {
  const raw = (env.TURSO_DATABASE_URL || "").trim();
  if (!raw) throw new Error("TURSO_DATABASE_URL is not configured");
  if (raw.startsWith("libsql://")) return `https://${raw.slice("libsql://".length)}`;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw.replace(/\/+$/, "");
  throw new Error("TURSO_DATABASE_URL must be a libsql:// or https:// URL");
}
function encodeArg(value) {
  if (value === void 0 || value === null) {
    return { type: "null", value: null };
  }
  if (typeof value === "boolean") {
    return { type: "integer", value: value ? "1" : "0" };
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return { type: "null", value: null };
    return Number.isInteger(value) ? { type: "integer", value: String(value) } : { type: "float", value: String(value) };
  }
  if (typeof value === "bigint") {
    return { type: "integer", value: value.toString() };
  }
  if (value instanceof Uint8Array) {
    return { type: "blob", value: toBase64(value) };
  }
  return { type: "text", value: String(value) };
}
function toBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function decodeCell(cell) {
  if (cell.value === null || cell.value === void 0) return null;
  if (cell.type === "integer" || cell.type === "float") return Number(cell.value);
  return String(cell.value);
}
async function pipeline(env, statements) {
  const requests = statements.map((stmt) => ({
    type: "execute",
    stmt: { sql: stmt.sql, args: (stmt.args ?? []).map(encodeArg) }
  }));
  requests.push({ type: "close" });
  const res = await fetch(`${baseUrl(env)}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.TURSO_AUTH_TOKEN}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ requests })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Turso HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const payload = await res.json();
  const results = payload.results ?? [];
  for (const result of results) {
    if (result.type === "error") {
      throw new Error(`Turso error: ${result.error?.message ?? "unknown"}`);
    }
  }
  const out = [];
  for (const result of results) {
    const table = result.response?.result;
    if (!table) continue;
    const names = table.cols.map((c) => c.name);
    for (const row of table.rows) {
      const obj = {};
      row.forEach((cell, i) => {
        obj[names[i]] = decodeCell(cell);
      });
      out.push(obj);
    }
  }
  return out;
}
function query(env, sql, args = []) {
  return pipeline(env, [{ sql, args }]);
}
async function execute(env, sql, args = []) {
  const res = await fetch(`${baseUrl(env)}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.TURSO_AUTH_TOKEN}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      requests: [{ type: "execute", stmt: { sql, args: args.map(encodeArg) } }]
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Turso HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const payload = await res.json();
  const first = payload.results?.[0];
  if (first?.type === "error") {
    throw new Error(`Turso error: ${first.error?.message ?? "unknown"}`);
  }
  return first?.response?.result?.affected_row_count ?? 0;
}
async function health(env) {
  try {
    const rows = await query(
      env,
      "SELECT count(*) AS c FROM drops"
    );
    return { ok: true, detail: `${rows[0]?.c ?? 0} drops` };
  } catch (err) {
    return {
      ok: false,
      detail: err instanceof Error ? err.message : "unknown error"
    };
  }
}
export {
  execute,
  health,
  query
};
