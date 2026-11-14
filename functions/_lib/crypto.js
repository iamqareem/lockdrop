const DEV_FALLBACK_SEED = "lockdrop-dev-master-key-do-not-use-in-production";
const encoder = new TextEncoder();
function toBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function fromBase64(value) {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}
function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function fromHex(value) {
  const clean = value.replace(/^0x/, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}
async function sha256Hex(text) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return `0x${toHex(new Uint8Array(digest))}`;
}
function getMasterKey(env) {
  const configured = (env.LOCKDROP_MASTER_KEY || "").trim();
  if (configured) {
    const clean = configured.replace(/^0x/, "");
    if (clean.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(clean)) {
      throw new Error("LOCKDROP_MASTER_KEY must be 64 hex characters (32 bytes)");
    }
    return { key: fromHex(clean), insecure: false };
  }
  const digest = new Uint8Array(32);
  return { key: devFallbackKey(), insecure: true };
}
let cachedDevKey = null;
function devFallbackKey() {
  if (cachedDevKey) return cachedDevKey;
  const seed = encoder.encode(DEV_FALLBACK_SEED);
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i += 1) {
    let h = 2166136261 ^ i;
    for (let j = 0; j < seed.length; j += 1) {
      h ^= seed[j];
      h = Math.imul(h, 16777619) >>> 0;
    }
    out[i] = h & 255;
  }
  cachedDevKey = out;
  return out;
}
async function deriveDropKey(masterKey, dropId) {
  const hkdfKey = await crypto.subtle.importKey("raw", masterKey, "HKDF", false, [
    "deriveKey"
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(0),
      info: encoder.encode(`lockdrop:v1:${dropId}`)
    },
    hkdfKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function seal(env, dropId, plaintext) {
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
    iv: toBase64(iv)
  };
}
async function unseal(env, dropId, ciphertext, iv) {
  const { key: master } = getMasterKey(env);
  const key = await deriveDropKey(master, dropId);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(iv) },
    key,
    fromBase64(ciphertext)
  );
  return new TextDecoder().decode(plain);
}
async function urlHash(url) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(url.trim()));
  return toHex(new Uint8Array(digest));
}
export {
  deriveDropKey,
  fromBase64,
  fromHex,
  getMasterKey,
  seal,
  sha256Hex,
  toBase64,
  toHex,
  unseal,
  urlHash
};
