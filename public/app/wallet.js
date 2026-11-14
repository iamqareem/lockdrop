/**
 * Minimal EIP-1193 wallet client.
 *
 * No ethers, no build step, no CDN: the three contract calls LockDrop needs
 * (approve, payNative, payToken) use fixed function selectors and static
 * ABI encoding, so a hand-rolled encoder is both smaller and safer than
 * shipping a library. The selectors below were generated from the contract
 * signatures and are asserted by `scripts/check-abi.mjs`.
 */

export const POLYGON_CHAIN_ID = 137;
export const POLYGON_HEX_CHAIN_ID = "0x89";
export const POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/** keccak256 of the function signature, first 4 bytes. */
export const SELECTORS = {
  payNative: "0x088af277", // payNative(bytes32,address,uint8)
  payToken: "0x8bf27d62", // payToken(bytes32,address,uint256,address,uint8)
  approve: "0x095ea7b3", // approve(address,uint256)
  allowance: "0xdd62ed3e", // allowance(address,address)
  balanceOf: "0x70a08231", // balanceOf(address)
};

/**
 * The escrow's fee tiers, matching the `Tier` enum in PolygonEscrow.sol.
 * `scripts/check-contract.mjs` asserts these against the compiled ABI.
 */
export const TIERS = {
  STANDARD: 0, // 3%
  PREMIUM: 1, // 5%
};

export class WalletError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "WalletError";
    this.code = code;
  }
}

function provider() {
  const injected = window.ethereum;
  if (!injected) {
    throw new WalletError(
      "No browser wallet detected. Install MetaMask, Rabby or Trust Wallet.",
      "NO_WALLET"
    );
  }
  return injected;
}

async function rpcRequest(method, params) {
  const injected = provider();
  return injected.request({ method, params });
}

/** SHA-256 of a UTF-8 string as a 0x-prefixed 32-byte hex string. */
export async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  let hex = "0x";
  for (const byte of bytes) hex += byte.toString(16).padStart(2, "0");
  return hex;
}

/** Converts a decimal token amount into base units. */
export function toUnits(amount, decimals) {
  const clean = String(amount).trim();
  if (!/^\d+(\.\d+)?$/.test(clean)) throw new WalletError(`Invalid amount: ${amount}`);
  const [whole, fraction = ""] = clean.split(".");
  const padded = (fraction + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || "0");
}

function wordUint(value) {
  const big = BigInt(value);
  if (big < 0n) throw new WalletError("Negative value in ABI encoding.");
  return big.toString(16).padStart(64, "0");
}

function wordAddress(address) {
  const clean = String(address).trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]{40}$/.test(clean)) {
    throw new WalletError(`Invalid address: ${address}`);
  }
  return clean.padStart(64, "0");
}

function wordBytes32(hex) {
  const clean = String(hex).replace(/^0x/, "").toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(clean)) throw new WalletError("Invalid bytes32 value.");
  return clean;
}

/** ABI-encodes payNative(bytes32,address,uint8). */
export function encodePayNative(dropIdBytes32, seller, tier) {
  return (
    SELECTORS.payNative +
    wordBytes32(dropIdBytes32) +
    wordAddress(seller) +
    wordUint(tier)
  );
}

/** ABI-encodes payToken(bytes32,address,uint256,address,uint8). */
export function encodePayToken(dropIdBytes32, token, amount, seller, tier) {
  return (
    SELECTORS.payToken +
    wordBytes32(dropIdBytes32) +
    wordAddress(token) +
    wordUint(amount) +
    wordAddress(seller) +
    wordUint(tier)
  );
}

/** ABI-encodes approve(address,uint256). */
export function encodeApprove(spender, amount) {
  return SELECTORS.approve + wordAddress(spender) + wordUint(amount);
}

/** ABI-encodes allowance(address,address) for an eth_call. */
export function encodeAllowance(owner, spender) {
  return SELECTORS.allowance + wordAddress(owner) + wordAddress(spender);
}

/** Requests accounts without prompting, for session restore. */
export async function restoreAccount() {
  try {
    const accounts = await rpcRequest("eth_accounts", []);
    return accounts?.[0] ?? "";
  } catch {
    return "";
  }
}

/** Prompts the wallet for an account and switches to Polygon PoS. */
export async function connectWallet() {
  const accounts = await rpcRequest("eth_requestAccounts", []);
  if (!accounts?.length) throw new WalletError("Wallet connection rejected.", "REJECTED");
  await switchToPolygon();
  return accounts[0];
}

export async function currentChainId() {
  try {
    return await rpcRequest("eth_chainId", []);
  } catch {
    return "";
  }
}

/** Switches the wallet to Polygon PoS, adding the chain if needed. */
export async function switchToPolygon() {
  try {
    await rpcRequest("wallet_switchEthereumChain", [
      { chainId: POLYGON_HEX_CHAIN_ID },
    ]);
    return true;
  } catch (err) {
    if (err && err.code === 4902) {
      await rpcRequest("wallet_addEthereumChain", [
        {
          chainId: POLYGON_HEX_CHAIN_ID,
          chainName: "Polygon PoS",
          nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
          rpcUrls: [POLYGON_RPC],
          blockExplorerUrls: ["https://polygonscan.com"],
        },
      ]);
      return true;
    }
    throw new WalletError(
      err?.message || "Could not switch the wallet to Polygon PoS.",
      err?.code
    );
  }
}

async function ethCall(to, data) {
  return rpcRequest("eth_call", [{ to, data }, "latest"]);
}

/** Reads the ERC-20 allowance for (owner -> spender). */
export async function readAllowance(token, owner, spender) {
  const raw = await ethCall(token, encodeAllowance(owner, spender));
  if (!raw || raw === "0x") return 0n;
  return BigInt(raw);
}

async function sendTransaction({ from, to, data, value }) {
  const params = { from, to, data };
  if (value !== undefined) params.value = value;
  return rpcRequest("eth_sendTransaction", [params]);
}

/** Polls the public Polygon RPC until the receipt appears. */
export async function waitForReceipt(txHash, { rpcUrl = POLYGON_RPC, timeoutMs = 180000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(rpcUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getTransactionReceipt",
          params: [txHash],
        }),
      });
      if (res.ok) {
        const payload = await res.json();
        if (payload.result) return payload.result;
      }
    } catch {
      /* retry */
    }
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
  throw new WalletError("Timed out waiting for the Polygon receipt.", "TIMEOUT");
}

/**
 * Sends an escrow payment and waits for it to be mined.
 * Returns the transaction hash; the SERVER verifies it against the chain.
 */
export async function sendEscrowPayment({
  escrowAddress,
  dropId,
  sellerWallet,
  tokenAddress,
  tokenDecimals,
  price,
  tier,
  onStatus,
}) {
  if (!/^0x[0-9a-fA-F]{40}$/.test(escrowAddress || "")) {
    throw new WalletError(
      "The escrow contract is not configured on this deployment.",
      "NO_ESCROW"
    );
  }
  if (tier !== TIERS.STANDARD && tier !== TIERS.PREMIUM) {
    throw new WalletError("This drop has no valid fee tier.", "NO_TIER");
  }

  const status = onStatus || (() => {});
  status("Switching wallet to Polygon PoS…");
  await switchToPolygon();

  const accounts = await rpcRequest("eth_accounts", []);
  const from = accounts?.[0];
  if (!from) throw new WalletError("No wallet account is connected.", "REJECTED");

  const dropIdBytes32 = await sha256Hex(dropId);
  const amount = toUnits(price, tokenDecimals);
  const isNative = !tokenAddress || tokenAddress.toLowerCase() === ZERO_ADDRESS;

  let txHash;

  if (isNative) {
    status(`Confirm the ${price} POL payment in your wallet…`);
    const data = encodePayNative(dropIdBytes32, sellerWallet, tier);
    txHash = await sendTransaction({
      from,
      to: escrowAddress,
      data,
      value: "0x" + amount.toString(16),
    });
  } else {
    status("Checking token allowance…");
    const allowance = await readAllowance(tokenAddress, from, escrowAddress);
    if (allowance < amount) {
      if (allowance > 0n) {
        status("Resetting the existing allowance…");
        const resetHash = await sendTransaction({
          from,
          to: tokenAddress,
          data: encodeApprove(escrowAddress, 0n),
        });
        await waitForReceipt(resetHash);
      }
      status("Step 1/2 — approve the token spend in your wallet…");
      const approveHash = await sendTransaction({
        from,
        to: tokenAddress,
        data: encodeApprove(escrowAddress, amount),
      });
      await waitForReceipt(approveHash);
    }
    status("Step 2/2 — confirm the escrow split in your wallet…");
    const data = encodePayToken(
      dropIdBytes32,
      tokenAddress,
      amount,
      sellerWallet,
      tier
    );
    txHash = await sendTransaction({ from, to: escrowAddress, data });
  }

  status("Confirming on Polygon PoS…");
  const receipt = await waitForReceipt(txHash);
  if (receipt && receipt.status && receipt.status !== "0x1") {
    throw new WalletError("The transaction reverted on Polygon PoS.", "REVERTED");
  }
  return txHash;
}
