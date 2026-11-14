#!/usr/bin/env node
/**
 * Publishes the knowledge base as LockDrop drops.
 *
 * The workflow:
 *
 *   1. Upload each piece to Google Drive. Put the resulting link in
 *      `kb/drive-links.json`, keyed by the piece id:
 *
 *        {
 *          "linux-01": "https://drive.google.com/drive/folders/XXXXXX",
 *          "linux-02": "https://drive.google.com/file/d/YYYYYY/view"
 *        }
 *
 *   2. Run this script. It reads `kb/manifest.json` for the titles and
 *      summaries, and creates one drop per piece.
 *
 * Usage:
 *   node scripts/publish-kb.mjs --api https://lock.ugaplex.com \
 *        --mode free_ad
 *   node scripts/publish-kb.mjs --mode paid_ad --price 1.5
 *   node scripts/publish-kb.mjs --only linux-01 --dry-run
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

/* ------------------------------------------------------------------ args */

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  const next = args[index + 1];
  return next && !next.startsWith("--") ? next : true;
};

const API = String(flag("api", "https://lockdrop-e0z.pages.dev")).replace(/\/+$/, "");
const MODE = String(flag("mode", "free_ad"));
const PRICE = String(flag("price", "0"));
const ONLY = flag("only", null);
const DRY_RUN = args.includes("--dry-run");
const CATEGORY = String(flag("category", "document"));
const SELLER = String(
  flag("seller", "0x1111111111111111111111111111111111111111")
);

const POL = "0x0000000000000000000000000000000000000000";

/* ----------------------------------------------------------------- input */

const manifestPath = join(root, "kb", "manifest.json");
if (!existsSync(manifestPath)) {
  console.error("kb/manifest.json is missing. Build the knowledge base first.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const linksPath = join(root, "kb", "drive-links.json");
const links = existsSync(linksPath)
  ? JSON.parse(readFileSync(linksPath, "utf8"))
  : {};

const parts = manifest.parts.filter((part) => !ONLY || part.id === ONLY);

/* ---------------------------------------------------------------- publish */

let created = 0;
let skipped = 0;

for (const part of parts) {
  const url = links[part.id];

  if (!url) {
    console.log(`skip    ${part.id}  (no Drive link in kb/drive-links.json)`);
    skipped += 1;
    continue;
  }

  const body = {
    title: part.title,
    categoryId: part.category || CATEGORY,
    url,
    sellerWallet: SELLER,
    tokenAddress: POL,
    tokenSymbol: "POL",
    tokenDecimals: 18,
    price: MODE === "free_ad" ? "0" : PRICE,
    unlockMode: MODE,
  };

  if (DRY_RUN) {
    console.log(`dry     ${part.id}  ${part.title}`);
    console.log(`        ${url}`);
    continue;
  }

  const res = await fetch(`${API}/api/drops`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    console.error(`FAIL    ${part.id}  ${payload?.error || res.status}`);
    continue;
  }

  created += 1;
  console.log(
    `ok      ${part.id}  ${payload.drop.id}  ${payload.drop.verdict}  ${part.title}`
  );
}

console.log(
  `\n${DRY_RUN ? "Would create" : "Created"} ${created} drop(s), skipped ${skipped}.`
);
if (created > 0 && !DRY_RUN) {
  console.log(`Feed: ${API}/#/drops`);
}
