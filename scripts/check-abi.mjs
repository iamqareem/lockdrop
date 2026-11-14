#!/usr/bin/env node
/**
 * Asserts that the hard-coded function selectors in the browser wallet client
 * match the real ones computed from the contract signatures.
 *
 * The client ships no ABI library, so this check is what stops a typo in a
 * selector from silently producing transactions that revert on-chain.
 *
 *   node scripts/check-abi.mjs
 */
import { ethers } from "ethers";
import { SELECTORS, encodePayNative, encodePayToken, encodeApprove } from "../public/app/wallet.js";

const EXPECTED = {
  payNative: "payNative(bytes32,address,uint8)",
  payToken: "payToken(bytes32,address,uint256,address,uint8)",
  approve: "approve(address,uint256)",
  allowance: "allowance(address,address)",
  balanceOf: "balanceOf(address)",
};

let failures = 0;

for (const [key, signature] of Object.entries(EXPECTED)) {
  const expected = ethers.id(signature).slice(0, 10);
  const actual = SELECTORS[key];
  if (expected !== actual) {
    console.error(`FAIL  ${key}: expected ${expected}, found ${actual} (${signature})`);
    failures += 1;
  } else {
    console.log(`ok    ${key}  ${actual}  ${signature}`);
  }
}

/* The encoders must produce the same calldata ethers would. */

const dropId = ethers.sha256(ethers.toUtf8Bytes("demo12345"));
const seller = "0x1111111111111111111111111111111111111111";
const token = "0x2222222222222222222222222222222222222222";
const amount = ethers.parseUnits("5", 18);
const TIER_STANDARD = 0;
const TIER_PREMIUM = 1;

const ifaceNative = new ethers.Interface([
  "function payNative(bytes32 dropId, address seller, uint8 tier) payable",
]);
const ifaceToken = new ethers.Interface([
  "function payToken(bytes32 dropId, address token, uint256 amount, address seller, uint8 tier)",
]);
const ifaceApprove = new ethers.Interface(["function approve(address spender, uint256 amount)"]);

const checks = [
  [
    "payNative",
    encodePayNative(dropId, seller, TIER_STANDARD),
    ifaceNative.encodeFunctionData("payNative", [dropId, seller, TIER_STANDARD]),
  ],
  [
    "payNative premium",
    encodePayNative(dropId, seller, TIER_PREMIUM),
    ifaceNative.encodeFunctionData("payNative", [dropId, seller, TIER_PREMIUM]),
  ],
  [
    "payToken",
    encodePayToken(dropId, token, amount, seller, TIER_STANDARD),
    ifaceToken.encodeFunctionData("payToken", [dropId, token, amount, seller, TIER_STANDARD]),
  ],
  [
    "payToken premium",
    encodePayToken(dropId, token, amount, seller, TIER_PREMIUM),
    ifaceToken.encodeFunctionData("payToken", [dropId, token, amount, seller, TIER_PREMIUM]),
  ],
  [
    "approve",
    encodeApprove(seller, amount),
    ifaceApprove.encodeFunctionData("approve", [seller, amount]),
  ],
];

for (const [name, ours, theirs] of checks) {
  if (ours.toLowerCase() !== theirs.toLowerCase()) {
    console.error(`FAIL  ${name} encoding mismatch`);
    console.error(`  ours:   ${ours}`);
    console.error(`  ethers: ${theirs}`);
    failures += 1;
  } else {
    console.log(`ok    ${name} encoding matches ethers`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} ABI check(s) failed.`);
  process.exit(1);
}
console.log("\nAll ABI checks passed.");
