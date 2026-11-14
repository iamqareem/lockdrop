#!/usr/bin/env node
/**
 * Proves that the deployed contract, the browser's ABI encoder and the
 * server's payment verifier all agree.
 *
 * These three live in different runtimes and are written by hand, so a change
 * to the contract could silently break the other two. This check derives the
 * selectors and the event topic from the compiled ABI and compares them with
 * the constants the app actually uses.
 *
 *   node scripts/check-contract.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ethers } from "ethers";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

let failures = 0;
const fail = (message) => {
  console.error(`FAIL  ${message}`);
  failures += 1;
};
const ok = (message) => console.log(`ok    ${message}`);

/* --------------------------------------------------- the compiled contract */

const artifactPath = join(root, "contracts", "artifacts", "PolygonEscrow.json");
const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
const source = readFileSync(join(root, "contracts", "PolygonEscrow.sol"), "utf8");

if (artifact.source !== source) {
  fail(
    "contracts/artifacts/PolygonEscrow.json is stale — run: npm run contract:build"
  );
} else {
  ok("contract artifact matches contracts/PolygonEscrow.sol");
}

/** Builds a canonical signature for an ABI entry. */
function signatureOf(entry) {
  const types = entry.inputs.map((input) => input.type).join(",");
  return `${entry.name}(${types})`;
}

const functions = new Map(
  artifact.abi.filter((e) => e.type === "function").map((e) => [signatureOf(e), e])
);
const events = new Map(
  artifact.abi.filter((e) => e.type === "event").map((e) => [signatureOf(e), e])
);

/* ------------------------------------------------------- the browser client */

const walletSource = readFileSync(join(root, "public", "app", "wallet.js"), "utf8");

function selectorInClient(name) {
  const match = walletSource.match(
    new RegExp(`${name}:\\s*"(0x[0-9a-f]{8})"`, "i")
  );
  return match ? match[1].toLowerCase() : null;
}

const EXPECTED_FUNCTIONS = [
  "payNative(bytes32,address,uint8)",
  "payToken(bytes32,address,uint256,address,uint8)",
];

for (const signature of EXPECTED_FUNCTIONS) {
  const entry = functions.get(signature);
  if (!entry) {
    fail(`the contract has no function ${signature}`);
    continue;
  }
  const expected = ethers.id(signature).slice(0, 10);
  const actual = selectorInClient(entry.name);
  if (actual !== expected) {
    fail(
      `${signature}: contract selector ${expected} but public/app/wallet.js uses ${actual}`
    );
  } else {
    ok(`${signature} -> ${actual} (matches wallet.js)`);
  }
}

/* ----------------------------------------------------------- the server side */

const polygonSource = readFileSync(
  join(root, "functions", "_lib", "polygon.ts"),
  "utf8"
);
const eventSignature = "Paid(bytes32,address,address,address,uint256,uint16)";
if (!events.has(eventSignature)) {
  fail(`the contract has no event ${eventSignature}`);
} else {
  const expected = ethers.id(eventSignature);
  const match = polygonSource.match(
    /PAID_EVENT_TOPIC0\s*=\s*"(0x[0-9a-f]{64})"/i
  );
  const actual = match ? match[1].toLowerCase() : null;
  if (actual !== expected) {
    fail(
      `Paid event topic: contract ${expected} but functions/_lib/polygon.ts uses ${actual}`
    );
  } else {
    ok(`Paid event topic matches functions/_lib/polygon.ts`);
  }
}

/* ------------------------------------------------------------- the fee tiers */

const tiersSource = readFileSync(join(root, "functions", "_lib", "tiers.ts"), "utf8");
const contractStandard = Number(
  source.match(/FEE_BPS_STANDARD\s*=\s*(\d+)/)?.[1]
);
const contractPremium = Number(source.match(/FEE_BPS_PREMIUM\s*=\s*(\d+)/)?.[1]);
const serverStandard = Number(
  tiersSource.match(/FEE_BPS_STANDARD\s*=\s*(\d+)/)?.[1]
);
const serverPremium = Number(tiersSource.match(/FEE_BPS_PREMIUM\s*=\s*(\d+)/)?.[1]);

if (!contractStandard || !contractPremium) {
  fail("could not read the fee constants from contracts/PolygonEscrow.sol");
} else if (contractStandard !== serverStandard || contractPremium !== serverPremium) {
  fail(
    `fee mismatch — contract ${contractStandard}/${contractPremium}, server ${serverStandard}/${serverPremium}`
  );
} else {
  ok(`fee tiers match: standard ${contractStandard} bps, premium ${contractPremium} bps`);
}

/* ------------------------------------------------- the tier enum in the ABI */

const payNative = functions.get("payNative(bytes32,address,uint8)");
const tierInput = payNative?.inputs?.[2];
if (!tierInput || tierInput.type !== "uint8") {
  fail("payNative should take a uint8 tier argument");
} else {
  ok("payNative takes a uint8 tier argument");
}

const payToken = functions.get("payToken(bytes32,address,uint256,address,uint8)");
const tokenTier = payToken?.inputs?.[4];
if (!tokenTier || tokenTier.type !== "uint8") {
  fail("payToken should take a uint8 tier argument");
} else {
  ok("payToken takes a uint8 tier argument");
}

/* ------------------------------------------------------------------ result */

if (failures > 0) {
  console.error(`\n${failures} contract check(s) failed.`);
  process.exit(1);
}
console.log("\nAll contract checks passed.");
