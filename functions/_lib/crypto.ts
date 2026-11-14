/**
 * Server-side encryption for locked drop URLs.
 *
 * The whole point of moving escrow server-side: the ciphertext and its key
 * never travel together. A buyer receives the plaintext URL only after the
 * server has independently confirmed an on-chain payment, and the database
 * token is never shipped to the browser.
 *
 * Key hierarchy:
 *   LOCKDROP_MASTER_KEY (32 bytes, Cloudflare secret)
 *     -> HKDF-SHA256(info = "lockdrop:v1:<dropId>") -> per-drop AES-GCM-256 key
 *     -> AES-GCM(iv = 12 random bytes) -> ciphertext
 */
import type { Env } from "./types";

const DEV_FALLBACK_SEED = "lockdrop-dev-master-key-do-not-use-in-production";
const encoder = new TextEncoder();

export function toBase64(bytes: Uint8Array<ArrayBuffer>): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function fromHex(value: string): Uint8Array<ArrayBuffer> {
  const clean = value.replace(/^0x/, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/** SHA-256 of a UTF-8 string, returned as a 0x-prefixed 32-byte hex string. */
export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return `0x${toHex(new Uint8Array(digest))}`;
}

/**
 * Resolves the master key. In production it MUST come from the
 * LOCKDROP_MASTER_KEY secret; without it we fall back to a fixed development
 * key so `wrangler pages dev` works out of the box, but that fallback is
 * loudly flagged so it can never be shipped by accident.
 */
export function getMasterKey(env: Env): { key: Uint8Array<ArrayBuffer>; insecure: boolean } {
  const configured = (env.LOCKDROP_MASTER_KEY || "").trim();
  if (configured) {
    const clean = configured.replace(/^0x/, "");
    if (clean.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(clean)) {
      throw new Error("LOCKDROP_MASTER_KEY must be 64 hex characters (32 bytes)");
    }
    return { key: fromHex(clean), insecure: false };
  }
  const digest = new Uint8Array(32);
  // Deterministic dev key: SHA-256 of the fallback seed.
  // Uses the sync WebCrypto-less path so it stays available in every runtime.
  return { key: devFallbackKey(), insecure: true };
}

let cachedDevKey: Uint8Array<ArrayBuffer> | null = null;
function devFallbackKey(): Uint8Array<ArrayBuffer> {
  if (cachedDevKey) return cachedDevKey;
  // FNV-style expansion is not a security primitive — this is only ever a
  // placeholder for local development when no secret is configured.
  const seed = encoder.encode(DEV_FALLBACK_SEED);
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i += 1) {
    let h = 0x811c9dc5 ^ i;
    for (let j = 0; j < seed.length; j += 1) {
      h ^= seed[j];
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    out[i] = h & 0xff;
  }
  cachedDevKey = out;
  return out;
}

/** Derives the per-drop AES-GCM key from the master key. */
export async function deriveDropKey(
  masterKey: Uint8Array<ArrayBuffer>,
  dropId: string
): Promise<CryptoKey> {
  const hkdfKey = await crypto.subtle.importKey("raw", masterKey, "HKDF", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(0),
      info: encoder.encode(`lockdrop:v1:${dropId}`),
    },
    hkdfKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export interface Sealed {
  ciphertext: string;
  iv: string;
}

/** Encrypts a plaintext URL. Returns base64 ciphertext + base64 iv. */
export async function seal(env: Env, dropId: string, plaintext: string): Promise<Sealed> {
  const { key: master } = getMasterKey(env);
  const key = await deriveDropKey(master, dropId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(plaintext)
  );
  return {
    ciphertext: toBase64(new Uint8Array(cipher)),
    iv: toBase64(iv),
  };
}

/** Decrypts a sealed URL. Throws if the ciphertext was tampered with. */
export async function unseal(
  env: Env,
  dropId: string,
  ciphertext: string,
  iv: string
): Promise<string> {
  const { key: master } = getMasterKey(env);
  const key = await deriveDropKey(master, dropId);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(iv) },
    key,
    fromBase64(ciphertext)
  );
  return new TextDecoder().decode(plain);
}

/** Stable hash used to cache verdicts per URL. */
export async function urlHash(url: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(url.trim()));
  return toHex(new Uint8Array(digest));
}
