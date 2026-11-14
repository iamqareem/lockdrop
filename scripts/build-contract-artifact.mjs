#!/usr/bin/env node
/**
 * Builds `contracts/artifacts/PolygonEscrow.json` from the compiled contract.
 *
 * The artifact is committed so that:
 *   - the Pages Function can serve the contract source and ABI without a
 *     build step,
 *   - `npm run check` can prove the browser encoder, the server verifier and
 *     the deployed contract all agree on the same ABI.
 *
 *   node scripts/build-contract-artifact.mjs
 *
 * Run `hardhat compile --profile production` first (see `npm run contract:build`).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const HARDHAT_ARTIFACT = join(
  root,
  ".hardhat",
  "artifacts",
  "contracts",
  "PolygonEscrow.sol",
  "PolygonEscrow.json"
);
const SOURCE_PATH = join(root, "contracts", "PolygonEscrow.sol");
const OUT_DIR = join(root, "contracts", "artifacts");
const OUT_PATH = join(OUT_DIR, "PolygonEscrow.json");

if (!existsSync(HARDHAT_ARTIFACT)) {
  console.error(
    "No compiled artifact found. Run:  npx hardhat compile --profile production"
  );
  process.exit(1);
}

const compiled = JSON.parse(readFileSync(HARDHAT_ARTIFACT, "utf8"));
const source = readFileSync(SOURCE_PATH, "utf8");

const artifact = {
  contractName: compiled.contractName,
  sourceName: compiled.sourceName,
  compiler: "solc 0.8.28",
  optimizer: { enabled: true, runs: 200 },
  abi: compiled.abi,
  bytecode: compiled.bytecode,
  deployedBytecode: compiled.deployedBytecode,
  source,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");

console.log(`wrote ${OUT_PATH}`);
console.log(`  ${artifact.abi.length} ABI entries, ${artifact.bytecode.length / 2 - 1} bytes of bytecode`);
