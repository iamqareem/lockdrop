#!/usr/bin/env node
/**
 * Verifies the browser's direct-to-Turso read path.
 *
 * The frontend fetches the feed straight from Turso with a read-only token
 * instead of going through the Pages Functions. This check proves that path
 * actually works from a browser:
 *
 *   1. the CORS preflight Turso answers for a cross-origin POST
 *   2. the feed query returns the expected rows
 *   3. the public token CANNOT read the sealed-URL table
 *   4. the public token CANNOT write
 *
 *   node scripts/check-turso-read.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

let failures = 0;
const fail = (m) => {
  console.error(`FAIL  ${m}`);
  failures += 1;
};
const ok = (m) => console.log(`ok    ${m}`);

const config = JSON.parse(readFileSync(join(root, "public", "turso.json"), "utf8"));
const { url, readToken } = config;

if (!url || !readToken || readToken.includes("REPLACE_WITH")) {
  console.error("public/turso.json has no read token configured.");
  process.exit(1);
}

/* 1. CORS preflight — a browser will not send the request without this. */
const preflight = await fetch(`${url.replace(/\/+$/, "")}/v2/pipeline`, {
  method: "OPTIONS",
  headers: {
    Origin: "https://example.com",
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "authorization,content-type",
  },
});
const allowOrigin = preflight.headers.get("access-control-allow-origin");
if (!preflight.ok || !allowOrigin) {
  fail(`CORS preflight failed (status ${preflight.status}, allow-origin ${allowOrigin})`);
} else {
  ok(`CORS preflight allows the browser (${allowOrigin})`);
}

/* A helper that mirrors public/app/turso.js exactly. */
async function query(sql, args = [], token = readToken) {
  const encodeArg = (value) => {
    if (value === undefined || value === null) return { type: "null", value: null };
    if (typeof value === "boolean") return { type: "integer", value: value ? "1" : "0" };
    if (typeof value === "number") {
      return Number.isInteger(value)
        ? { type: "integer", value: String(value) }
        : { type: "float", value: String(value) };
    }
    return { type: "text", value: String(value) };
  };

  const res = await fetch(`${url.replace(/\/+$/, "")}/v2/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        { type: "execute", stmt: { sql, args: args.map(encodeArg) } },
        { type: "close" },
      ],
    }),
  });

  const payload = await res.json();
  const results = payload.results ?? [];
  for (const result of results) {
    if (result.type === "error") throw new Error(result.error?.message ?? "Turso error");
  }
  const rows = [];
  for (const result of results) {
    const table = result.response?.result;
    if (!table) continue;
    const names = table.cols.map((c) => c.name);
    for (const row of table.rows) {
      const obj = {};
      row.forEach((cell, i) => {
        obj[names[i]] =
          cell.type === "integer" || cell.type === "float"
            ? Number(cell.value)
            : cell.value;
      });
      rows.push(obj);
    }
  }
  return rows;
}

/* 2. The feed query works with the public token. */
try {
  const rows = await query(
    "SELECT id, title, category_id, category, price, unlock_mode, verdict FROM drops WHERE status = 'active' ORDER BY created_at DESC LIMIT 5"
  );
  ok(`feed query returned ${rows.length} row(s)`);
} catch (err) {
  fail(`feed query failed: ${err.message}`);
}

/* The browser's real column list must be valid SQL. */
const { PUBLIC_DROP_COLUMNS } = await import("../public/app/shared/drop.js");
try {
  await query(`SELECT ${PUBLIC_DROP_COLUMNS.join(", ")} FROM drops LIMIT 1`);
  ok("the browser's column list is a valid SELECT");
} catch (err) {
  fail(`the browser's column list is invalid: ${err.message}`);
}

/* 3. The public token cannot read the sealed URLs. */
try {
  await query("SELECT * FROM drop_secrets LIMIT 1");
  fail("the public token can read drop_secrets — it must not be able to");
} catch (err) {
  if (/not authorized|prohibited/i.test(err.message)) {
    ok("the public token is denied access to drop_secrets");
  } else {
    fail(`unexpected error reading drop_secrets: ${err.message}`);
  }
}

/* 4. The public token cannot write. */
try {
  await query(
    "INSERT INTO drops (id, title, category_id, category, seller_wallet, token_address, token_symbol, token_decimals, price, unlock_mode, created_at) VALUES ('__check__', 'x', 'telegram', 'Telegram', '0x0', '0x0', 'POL', 18, '0', 'free_ad', '2026-01-01')"
  );
  fail("the public token can INSERT — it must be read-only");
} catch (err) {
  if (/not authorized|prohibited/i.test(err.message)) {
    ok("the public token is read-only");
  } else {
    fail(`unexpected error writing: ${err.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} Turso read check(s) failed.`);
  process.exit(1);
}
console.log("\nAll Turso read checks passed.");
