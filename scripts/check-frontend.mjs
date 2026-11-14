#!/usr/bin/env node
/**
 * Verifies the no-build frontend.
 *
 * There is no bundler, so a broken import path is only discovered at runtime
 * in the browser. This walks the module graph from `app/main.js` and proves
 * that:
 *
 *   1. every relative import resolves to a file that exists
 *   2. every file under public/ is reachable from the entry point
 *   3. the HTML references real files
 *   4. nothing imports a TypeScript file
 *
 *   node scripts/check-frontend.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve, dirname as dirOf } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const publicDir = join(root, "public");

let failures = 0;
const fail = (m) => {
  console.error(`FAIL  ${m}`);
  failures += 1;
};
const ok = (m) => console.log(`ok    ${m}`);

const IMPORT_RE = /(?:^|\n)\s*(?:import|export)\s+(?:[^'"]*?\sfrom\s+)?["']([^"']+)["']/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const jsFiles = walk(publicDir).filter((f) => f.endsWith(".js"));
const entry = join(publicDir, "app", "main.js");

if (!existsSync(entry)) {
  console.error("public/app/main.js is missing.");
  process.exit(1);
}

/* 1 & 4. Every import resolves, and nothing points at TypeScript. */
const reached = new Set();
const queue = [entry];
let importCount = 0;

while (queue.length) {
  const file = queue.pop();
  if (reached.has(file)) continue;
  reached.add(file);

  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(IMPORT_RE)) {
    const spec = match[1];
    importCount += 1;

    if (spec.endsWith(".ts")) {
      fail(`${relative(root, file)} imports a TypeScript file: ${spec}`);
      continue;
    }
    if (!spec.startsWith(".")) continue; // a bare specifier would need a bundler

    const target = resolve(dirOf(file), spec);
    if (!existsSync(target)) {
      fail(`${relative(root, file)} imports ${spec} — no such file`);
      continue;
    }
    if (!target.startsWith(publicDir)) {
      fail(
        `${relative(root, file)} imports ${spec} — outside public/, the browser cannot load it`
      );
      continue;
    }
    queue.push(target);
  }
}

ok(`resolved ${importCount} import(s) from the entry point`);

/* 2. No orphans. */
const orphans = jsFiles.filter((f) => !reached.has(f));
if (orphans.length) {
  for (const file of orphans) {
    fail(`${relative(root, file)} is never imported — dead code`);
  }
} else {
  ok(`all ${jsFiles.length} frontend module(s) are reachable from main.js`);
}

/* 3. The HTML references real files. */
const html = readFileSync(join(publicDir, "index.html"), "utf8");
const refs = [...html.matchAll(/(?:src|href)="(\/[^"]+)"/g)].map((m) => m[1]);
for (const ref of refs) {
  if (ref.startsWith("//") || ref.startsWith("http")) continue;
  const target = join(publicDir, ref);
  if (!existsSync(target)) {
    fail(`index.html references ${ref} — no such file`);
  }
}
ok(`index.html references ${refs.length} local path(s), all present`);

/* The Turso read config must exist, or the feed has no data source. */
if (!existsSync(join(publicDir, "turso.json"))) {
  fail("public/turso.json is missing — the feed has no data source");
} else {
  const config = JSON.parse(readFileSync(join(publicDir, "turso.json"), "utf8"));
  if (!config.url || !config.readToken || config.readToken.includes("REPLACE_WITH")) {
    fail("public/turso.json has no read token configured");
  } else {
    ok("public/turso.json is configured");
  }
}

if (failures > 0) {
  console.error(`\n${failures} frontend check(s) failed.`);
  process.exit(1);
}
console.log("\nAll frontend checks passed.");
