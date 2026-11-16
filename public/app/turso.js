/**
 * The browser's Turso client.
 *
 * The frontend reads the drop feed straight from Turso — no Functions in the
 * path — using a read-only token scoped to the `drops` table. The sealed URLs
 * live in a separate `drop_secrets` table that this token cannot reach.
 *
 * The token is public by design: it can only SELECT from `drops`, and every
 * column in that table is public metadata. Rotating it is one CLI command
 * and one commit.
 */

const DEFAULT_CONFIG_URL = "/turso.json";

let client = null;
let config = null;
let loading = null;

function encodeArg(value) {
  if (value === undefined || value === null) return { type: "null", value: null };
  if (typeof value === "boolean") {
    return { type: "integer", value: value ? "1" : "0" };
  }
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { type: "integer", value: String(value) }
      : { type: "float", value: String(value) };
  }
  return { type: "text", value: String(value) };
}

function decodeCell(cell) {
  if (cell.value === null || cell.value === undefined) return null;
  if (cell.type === "integer" || cell.type === "float") return Number(cell.value);
  return String(cell.value);
}

/**
 * Loads the public Turso read configuration.
 *
 * It lives in a static file rather than in /api/config so the feed keeps
 * working even when the Pages Functions are unreachable.
 */
export async function loadTursoConfig(force = false) {
  if (config && !force) return config;
  if (loading && !force) return loading;

  loading = fetch(DEFAULT_CONFIG_URL, { cache: "no-cache" })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      config = data && data.url && data.readToken ? data : null;
      loading = null;
      return config;
    })
    .catch(() => {
      loading = null;
      config = null;
      return null;
    });

  return loading;
}

export function getTursoConfig() {
  return config;
}

/** True when a direct read from Turso is possible. */
export function isTursoConfigured() {
  return Boolean(config && config.url && config.readToken);
}

/**
 * Runs a SELECT against Turso and returns plain row objects.
 * Read-only by construction: the token cannot write.
 *
 * `signal` aborts the request. The browser uses it to cancel a search that
 * has already been superseded by a newer one, so a slow response never
 * lands on top of a fresher one.
 */
export async function query(sql, args = [], { signal } = {}) {
  if (!isTursoConfigured()) {
    throw new Error("The Turso read configuration is missing.");
  }

  const res = await fetch(`${config.url.replace(/\/+$/, "")}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.readToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: { sql, args: args.map(encodeArg) },
        },
        { type: "close" },
      ],
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Turso read failed with status ${res.status}.`);
  }

  const payload = await res.json();
  const results = payload.results ?? [];

  for (const result of results) {
    if (result.type === "error") {
      throw new Error(result.error?.message ?? "Turso read failed.");
    }
  }

  const rows = [];
  for (const result of results) {
    const table = result.response?.result;
    if (!table) continue;
    const names = table.cols.map((c) => c.name);
    for (const row of table.rows) {
      const obj = {};
      row.forEach((cell, index) => {
        obj[names[index]] = decodeCell(cell);
      });
      rows.push(obj);
    }
  }
  return rows;
}

/** True when the direct read path is usable. */
export async function probeTurso() {
  try {
    await query("SELECT count(*) AS c FROM drops");
    return true;
  } catch {
    return false;
  }
}
