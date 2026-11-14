import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { sha256Hex } from "../functions/_lib/crypto.js";
import { matchPaidEvent, PAID_EVENT_TOPIC0, toUnits } from "../functions/_lib/polygon.js";
import { expectedFeeBps, feeTierFor } from "../functions/_lib/tiers.js";
const ESCROW = "0x1111111111111111111111111111111111111111";
const SELLER = "0x2222222222222222222222222222222222222222";
const BUYER = "0x3333333333333333333333333333333333333333";
const ZERO = "0x0000000000000000000000000000000000000000";
const DROP_ID = "abc12345";
const PRICE = "10";
async function paidLog({
  dropId = DROP_ID,
  seller = SELLER,
  buyer = BUYER,
  token = ZERO,
  amount = "10",
  feeBps = 300,
  escrow = ESCROW
} = {}) {
  const dropTopic = (await sha256Hex(dropId)).slice(2);
  const word = (value) => value.replace(/^0x/, "").toLowerCase().padStart(64, "0");
  const data = "0x" + word(token) + toUnits(amount, 18).toString(16).padStart(64, "0") + BigInt(feeBps).toString(16).padStart(64, "0");
  return {
    address: escrow,
    topics: [
      PAID_EVENT_TOPIC0,
      "0x" + dropTopic,
      "0x" + word(buyer),
      "0x" + word(seller)
    ],
    data
  };
}
function check(feeBps, price = PRICE) {
  return {
    escrowAddress: ESCROW,
    dropId: DROP_ID,
    sellerWallet: SELLER,
    tokenAddress: ZERO,
    amountUnits: toUnits(price, 18),
    expectedFeeBps: feeBps
  };
}
describe("escrow payment verification", () => {
  test("accepts a standard-tier payment on a standard drop", async () => {
    const logs = [await paidLog({ feeBps: 300 })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, true);
    assert.equal(result.feeBps, 300);
  });
  test("accepts a premium-tier payment on a premium drop", async () => {
    const logs = [await paidLog({ feeBps: 500 })];
    const result = matchPaidEvent(logs, {
      ...check(500),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, true);
    assert.equal(result.feeBps, 500);
  });
  test("refuses a standard-tier payment on a premium drop", async () => {
    const logs = [await paidLog({ feeBps: 300 })];
    const result = matchPaidEvent(logs, {
      ...check(500),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
    assert.match(result.reason, /sold at 5%/);
  });
  test("refuses a premium-tier payment on a standard drop", async () => {
    const logs = [await paidLog({ feeBps: 500 })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
    assert.match(result.reason, /sold at 3%/);
  });
  test("refuses an unknown fee tier", async () => {
    const logs = [await paidLog({ feeBps: 0 })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
  });
  test("refuses a payment for a different drop", async () => {
    const logs = [await paidLog({ dropId: "someone-else" })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
    assert.match(result.reason, /No matching/);
  });
  test("refuses a payment to a different seller", async () => {
    const logs = [await paidLog({ seller: "0x9999999999999999999999999999999999999999" })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
  });
  test("refuses a payment for a different token", async () => {
    const logs = [
      await paidLog({ token: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" })
    ];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
  });
  test("refuses a payment from a different contract", async () => {
    const logs = [await paidLog({ escrow: "0x9999999999999999999999999999999999999999" })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
  });
  test("refuses an underpayment", async () => {
    const logs = [await paidLog({ amount: "9" })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, false);
    assert.match(result.reason, /lower than the drop price/);
  });
  test("accepts an overpayment", async () => {
    const logs = [await paidLog({ amount: "25" })];
    const result = matchPaidEvent(logs, {
      ...check(300),
      expectedDrop: (await sha256Hex(DROP_ID)).slice(2)
    });
    assert.equal(result.ok, true);
  });
});
describe("fee tiers", () => {
  test("map unlock modes to contract tiers", () => {
    assert.equal(feeTierFor("paid_ad")?.bps, 300);
    assert.equal(feeTierFor("paid_ad")?.tier, 0);
    assert.equal(feeTierFor("paid_pure")?.bps, 500);
    assert.equal(feeTierFor("paid_pure")?.tier, 1);
    assert.equal(feeTierFor("free_ad"), null);
    assert.equal(expectedFeeBps("free_ad"), null);
  });
  test("toUnits converts decimal token amounts", () => {
    assert.equal(toUnits("1", 18), 10n ** 18n);
    assert.equal(toUnits("0.5", 18), 5n * 10n ** 17n);
    assert.equal(toUnits("2.75", 6), 2750000n);
    assert.throws(() => toUnits("abc", 18));
  });
});
