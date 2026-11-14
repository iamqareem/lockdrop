/**
 * Keeps `functions/_lib/contract-source.ts` in sync with
 * `contracts/PolygonEscrow.sol`.
 *
 *   npx tsx scripts/sync-contract-source.ts          # rewrite the mirror
 *   npx tsx scripts/sync-contract-source.ts --check  # fail if it has drifted
 *
 * The mirror exists because Cloudflare Pages Functions cannot import
 * arbitrary file types. The `--check` mode runs in `npm run check` so the two
 * copies can never silently diverge.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const contractPath = join(root, "contracts", "PolygonEscrow.sol");
const mirrorPath = join(root, "functions", "_lib", "contract-source.ts");

const HEADER = `/**
 * The canonical PolygonEscrow.sol source.
 *
 * Pages Functions cannot import arbitrary file types (the Pages Wrangler
 * configuration does not support module rules), so the contract is mirrored
 * here as a string. \`scripts/sync-contract-source.ts\` regenerates this file
 * from \`contracts/PolygonEscrow.sol\`, and \`npm run check\` fails if the two
 * have drifted apart.
 *
 * DO NOT EDIT BY HAND — run \`npm run sync:contract\` instead.
 */
export const POLYGON_ESCROW_SOURCE = \``;

const FOOTER = "\`;\n";

function buildMirror(source: string): string {
  if (source.includes("`") || source.includes("${")) {
    throw new Error(
      "The contract contains a backtick or a template placeholder, which cannot be mirrored safely."
    );
  }
  return `${HEADER}${source.replace(/\n$/, "")}\n${FOOTER}`;
}

const source = readFileSync(contractPath, "utf8");
const expected = buildMirror(source);

if (process.argv.includes("--check")) {
  const actual = readFileSync(mirrorPath, "utf8");
  if (actual !== expected) {
    console.error("FAIL  contract-source.ts is out of date.");
    console.error("      Run: npm run sync:contract");
    process.exit(1);
  }
  console.log("ok    contract-source.ts matches contracts/PolygonEscrow.sol");
} else {
  writeFileSync(mirrorPath, expected, "utf8");
  console.log(`wrote ${mirrorPath}`);
}
