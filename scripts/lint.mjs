#!/usr/bin/env node
/**
 * A syntax check for every JavaScript file in the project.
 *
 * The project is plain JavaScript with no build step and no transpiler, so
 * there is no type checker to run. This is the lightest useful substitute:
 * it parses every file with Node's own parser, which catches syntax errors,
 * stray TypeScript syntax that survived a migration, and broken imports.
 *
 *   node scripts/lint.mjs
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { execFileSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const ROOTS = ["functions", "public", "scripts", "tests", "test"];
const SKIP = new Set(["node_modules", ".git", ".hardhat", "dist", "public/assets"]);

const files = [];
for (const dir of ROOTS) {
  collect(join(root, dir));
}

let failures = 0;

for (const file of files) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (err) {
    failures += 1;
    console.error(`FAIL  ${relative(root, file)}`);
    console.error(
      String(err.stderr || err.message)
        .split("\n")
        .slice(0, 4)
        .map((line) => `      ${line}`)
        .join("\n")
    );
  }
}

console.log(`\nchecked ${files.length} file(s), ${failures} failure(s)`);

if (failures > 0) process.exit(1);

function collect(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      collect(path);
    } else if (name.endsWith(".js") || name.endsWith(".mjs")) {
      files.push(path);
    }
  }
}
