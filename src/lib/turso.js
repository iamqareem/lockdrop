import { createClient } from "@libsql/client/web";

const TURSO_URL = (import.meta.env.VITE_TURSO_DATABASE_URL || "").trim();
const TURSO_TOKEN = (import.meta.env.VITE_TURSO_AUTH_TOKEN || "").trim();
const LOCAL_KEY = "lockdrop_polygon_drops_v1";

export const isTursoConfigured = Boolean(
  TURSO_URL && !TURSO_URL.includes("your-db-name")
);

let client = null;
let schemaReady = false;

function getClient() {
  if (!client) {
    client = createClient({
      url: TURSO_URL,
      authToken: TURSO_TOKEN || undefined,
    });
  }
  return client;
}

async function ensureSchema() {
  if (schemaReady || !isTursoConfigured) return;
  const db = getClient();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS drops (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      encrypted_url TEXT NOT NULL,
      iv TEXT NOT NULL,
      seller_wallet TEXT NOT NULL,
      token_address TEXT NOT NULL,
      token_symbol TEXT NOT NULL,
      token_decimals INTEGER NOT NULL,
      price TEXT NOT NULL,
      unlock_mode TEXT NOT NULL DEFAULT 'paid',
      category TEXT NOT NULL DEFAULT 'General',
      ai_verdict TEXT NOT NULL DEFAULT 'Checked',
      ai_reason TEXT NOT NULL DEFAULT '',
      is_admin_ad INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);
  await db.execute(`ALTER TABLE drops ADD COLUMN unlock_mode TEXT NOT NULL DEFAULT 'paid'`).catch(() => {});
  await db.execute(`ALTER TABLE drops ADD COLUMN category TEXT NOT NULL DEFAULT 'General'`).catch(() => {});
  await db.execute(`ALTER TABLE drops ADD COLUMN ai_verdict TEXT NOT NULL DEFAULT 'Checked'`).catch(() => {});
  await db.execute(`ALTER TABLE drops ADD COLUMN ai_reason TEXT NOT NULL DEFAULT ''`).catch(() => {});
  await db.execute(`ALTER TABLE drops ADD COLUMN is_admin_ad INTEGER NOT NULL DEFAULT 0`).catch(() => {});
  schemaReady = true;
}

async function deriveDropKey(dropId, sellerWallet) {
  const seed = new TextEncoder().encode(
    `lockdrop:polygon:${dropId}:${sellerWallet.toLowerCase()}`
  );
  const hash = await crypto.subtle.digest("SHA-256", seed);
  return crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function sealUrl(plainUrl, dropId, sellerWallet) {
  const key = await deriveDropKey(dropId, sellerWallet);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plainUrl)
  );
  return {
    encryptedUrl: toHex(new Uint8Array(encrypted)),
    iv: toHex(iv),
  };
}

export async function unsealUrl(drop) {
  const key = await deriveDropKey(drop.id, drop.sellerWallet);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromHex(drop.iv) },
    key,
    fromHex(drop.encryptedUrl)
  );
  return new TextDecoder().decode(decrypted);
}

export async function createDrop(drop) {
  if (isTursoConfigured) {
    await ensureSchema();
    const db = getClient();
    await db.execute({
      sql: `INSERT INTO drops (id, title, encrypted_url, iv, seller_wallet, token_address, token_symbol, token_decimals, price, unlock_mode, category, ai_verdict, ai_reason, is_admin_ad, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        drop.id,
        drop.title,
        drop.encryptedUrl,
        drop.iv,
        drop.sellerWallet,
        drop.tokenAddress,
        drop.tokenSymbol,
        drop.tokenDecimals,
        drop.price,
        drop.unlockMode || "paid",
        drop.category || "General",
        drop.aiVerdict || "Checked",
        drop.aiReason || "",
        drop.isAdminAd ? 1 : 0,
        drop.createdAt,
      ],
    });
    return;
  }

  const all = readLocal();
  all.unshift(drop);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
}

export async function getDrop(id) {
  if (isTursoConfigured) {
    await ensureSchema();
    const db = getClient();
    const res = await db.execute({
      sql: `SELECT id, title, encrypted_url, iv, seller_wallet, token_address, token_symbol, token_decimals, price, unlock_mode, category, ai_verdict, ai_reason, is_admin_ad, created_at
            FROM drops WHERE id = ? LIMIT 1`,
      args: [id],
    });
    const row = res.rows[0];
    return row ? mapRow(row) : null;
  }

  return readLocal().find((d) => d.id === id) || null;
}

export async function listDrops() {
  if (isTursoConfigured) {
    await ensureSchema();
    const db = getClient();
    const res = await db.execute(
      `SELECT id, title, encrypted_url, iv, seller_wallet, token_address, token_symbol, token_decimals, price, unlock_mode, category, ai_verdict, ai_reason, is_admin_ad, created_at
       FROM drops ORDER BY created_at DESC LIMIT 50`
    );
    return res.rows.map(mapRow);
  }

  return readLocal();
}

export async function removeDrop(id) {
  if (isTursoConfigured) {
    await ensureSchema();
    const db = getClient();
    await db.execute({ sql: `DELETE FROM drops WHERE id = ?`, args: [id] });
    return;
  }

  const next = readLocal().filter((d) => d.id !== id);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
}

function mapRow(row) {
  return {
    id: String(row.id),
    title: String(row.title),
    encryptedUrl: String(row.encrypted_url),
    iv: String(row.iv),
    sellerWallet: String(row.seller_wallet),
    tokenAddress: String(row.token_address),
    tokenSymbol: String(row.token_symbol),
    tokenDecimals: Number(row.token_decimals),
    price: String(row.price),
    unlockMode: String(row.unlock_mode || "paid"),
    category: String(row.category || "General"),
    aiVerdict: String(row.ai_verdict || "Checked"),
    aiReason: String(row.ai_reason || ""),
    isAdminAd: Boolean(Number(row.is_admin_ad || 0)),
    createdAt: String(row.created_at),
  };
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex) {
  const clean = hex.replace(/^0x/, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}
