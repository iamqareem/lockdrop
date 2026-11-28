#!/usr/bin/env node
/**
 * Publish step: stamps a version onto the app's module URLs.
 *
 * Cloudflare Pages gives JavaScript assets a four-hour browser TTL that the
 * `_headers` file cannot override. That is fine for hashed filenames, but
 * this project has no build step, so the filenames are not hashed — a deploy
 * would leave returning visitors running the old JavaScript for hours.
 *
 * So each publish appends `?v=<hash>` to every intra-app import and to the
 * entry script. The hash is taken from the sources with any existing stamp
 * stripped, so it only changes when the code actually changes. A new URL means
 * a new cache entry, and the browser fetches it immediately.
 *
 * The output goes to `.pages/`, which is what gets deployed. `public/` is left
 * untouched, so the working tree stays clean.
 *
 *   node scripts/stamp.mjs
 */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
  rmSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const SOURCE = join(root, "public");
const OUT = join(root, ".pages");

/** Removes any previous stamp, so the hash only reflects the real source. */
function stripStamp(text) {
  return text.replace(/\?v=[0-9a-f]+/g, "");
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

/* 1. Copy the site. */

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const file of walk(SOURCE)) {
  const target = join(OUT, relative(SOURCE, file));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(file, target);
}

/* 2. Hash the app sources. */

const appDir = join(OUT, "app");
const appFiles = walk(appDir).filter((f) => f.endsWith(".js")).sort();

/*
 * The stylesheet is an asset, not a module, but it has the same problem:
 * nothing hashes its filename, so a browser would keep the old one for the
 * whole seven-day asset TTL. It has to take part in the version, otherwise a
 * change to the CSS alone would not change the version and the stale sheet
 * would survive.
 */
const cssPath = join(OUT, "assets", "styles.css");
const cssSource = existsSync(cssPath)
  ? stripStamp(readFileSync(cssPath, "utf8"))
  : "";

const hash = createHash("sha256");
for (const file of appFiles) {
  hash.update(stripStamp(readFileSync(file, "utf8")));
}
hash.update(stripStamp(readFileSync(join(OUT, "index.html"), "utf8")));
hash.update(cssSource);
const version = hash.digest("hex").slice(0, 10);

/* 3. Stamp every intra-app import and the entry script. */

const IMPORT_RE = /(\bfrom\s*|\bimport\s*)(["'])(\.{1,2}\/[^"']+?)\2/g;

let stamped = 0;
for (const file of appFiles) {
  const original = readFileSync(file, "utf8");
  const updated = original.replace(IMPORT_RE, (match, prefix, quote, spec) => {
    if (spec.includes("?v=")) return match;
    return `${prefix}${quote}${spec}?v=${version}${quote}`;
  });
  if (updated !== original) {
    writeFileSync(file, updated, "utf8");
    stamped += 1;
  }
}

const indexPath = join(OUT, "index.html");
const index = readFileSync(indexPath, "utf8");

/*
 * Every local asset the page pulls in gets the version too. The stylesheet is
 * the important one — it is cached for a week, and without a stamp a deploy
 * would leave people looking at the previous design.
 */
const ASSET_RE =
  /((?:href|src)=)(["'])(\/(?!api\/)[^"'?#]+\.(?:css|js|svg|png|jpg|jpeg|webp|ico|woff2?))(\?v=[0-9a-f]+)?\2/g;

let assetCount = 0;
const stampedIndex = index.replace(
  ASSET_RE,
  (match, prefix, quote, path, existing) => {
    assetCount += 1;
    if (existing) return match;
    return `${prefix}${quote}${path}?v=${version}${quote}`;
  }
);

writeFileSync(indexPath, stampedIndex, "utf8");

const swPath = join(OUT, "sw.js");
if (existsSync(swPath)) {
  const swOriginal = readFileSync(swPath, "utf8");
  const swUpdated = swOriginal.replace(
    /const CACHE_VERSION = "[^"]+";/,
    `const CACHE_VERSION = "${version}";`
  );
  if (swUpdated !== swOriginal) {
    writeFileSync(swPath, swUpdated, "utf8");
  }
}

console.log(`stamped ${stamped} module(s) and ${assetCount} asset(s) with version ${version}`);
console.log(`publish to ${relative(root, OUT)}/`);
