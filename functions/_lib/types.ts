/**
 * Shared environment typing for LockDrop Cloudflare Pages Functions.
 *
 * Everything under `_*` here is a SECRET and must never be exposed to the
 * browser bundle. Only `VITE_*` values (see `public/app/config.js`) are
 * public. The split is deliberate: the Turso token, the master encryption key
 * and the admin token all live on Cloudflare's secret store.
 */
export interface Env {
  /** libsql:// or https:// URL of the Turso database. */
  TURSO_DATABASE_URL: string;
  /** Bearer token for Turso. Server-only. */
  TURSO_AUTH_TOKEN: string;
  /** 64-char hex string, 32 bytes. Master key for drop URL encryption. */
  LOCKDROP_MASTER_KEY?: string;
  /** Bearer token for the admin API. Server-only. */
  ADMIN_TOKEN?: string;
  /** JSON-RPC endpoint for Polygon PoS. */
  POLYGON_RPC_URL?: string;
  /** Optional OpenRouter fallback judge. Server-only. */
  OPENROUTER_API_KEY?: string;
  OPENROUTER_MODEL?: string;
  /** Workers AI binding. */
  AI?: Ai;
  /** Override the Workers AI model used for link judging. */
  AI_MODEL?: string;
  /** Daily neuron budget for Workers AI. Defaults to 8000 of the free 10000. */
  AI_DAILY_BUDGET?: string;
  /**
   * Deployed PolygonEscrow.sol address. Public (it is on-chain) but kept
   * server-side so the server is the single source of truth for payment
   * verification — a browser cannot point the escrow somewhere else.
   */
  ESCROW_ADDRESS?: string;
  /** Adsgram rewarded-video block id for Telegram Mini Apps. */
  ADSGRAM_BLOCK_ID?: string;
  /** Monetag smartlink used for sponsored-task unlocks on the web. */
  MONETAG_DIRECT_LINK?: string;
}

export interface Ai {
  run(model: string, input: unknown): Promise<unknown>;
}

export type Verdict = "Trusted" | "Caution" | "Blocked";

export interface DropRow {
  id: string;
  title: string;
  summary: string;
  category_id: string;
  category: string;
  ciphertext: string;
  iv: string;
  seller_wallet: string;
  token_address: string;
  token_symbol: string;
  token_decimals: number;
  price: string;
  unlock_mode: string;
  verdict: Verdict;
  verdict_reason: string;
  verdict_score: number;
  verdict_source: string;
  verdict_report: string;
  is_admin_ad: number;
  status: string;
  created_at: string;
}

/** The public projection of a drop. Never contains ciphertext or iv. */
export interface PublicDrop {
  id: string;
  title: string;
  summary: string;
  categoryId: string;
  category: string;
  sellerWallet: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  price: string;
  unlockMode: string;
  verdict: Verdict;
  verdictReason: string;
  verdictScore: number;
  verdictSource: string;
  isAdminAd: boolean;
  createdAt: string;
}
