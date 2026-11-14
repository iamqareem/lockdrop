-- LockDrop schema (Turso / libSQL).
--
-- Apply with:
--   turso db shell lockdrop < schema.sql
--
-- `drops.ciphertext` holds the AES-GCM sealed destination link. The key that
-- opens it is derived on the server from LOCKDROP_MASTER_KEY, so this table
-- is useless on its own to anyone who obtains it.

CREATE TABLE IF NOT EXISTS drops (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL DEFAULT 'document',
  category TEXT NOT NULL DEFAULT 'Document',
  ciphertext TEXT NOT NULL,
  iv TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  token_decimals INTEGER NOT NULL DEFAULT 18,
  price TEXT NOT NULL DEFAULT '0',
  unlock_mode TEXT NOT NULL DEFAULT 'paid_ad',
  verdict TEXT NOT NULL DEFAULT 'Checked',
  verdict_reason TEXT NOT NULL DEFAULT '',
  verdict_score INTEGER NOT NULL DEFAULT 0,
  verdict_source TEXT NOT NULL DEFAULT 'heuristic',
  verdict_report TEXT NOT NULL DEFAULT '{}',
  is_admin_ad INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_drops_created ON drops(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_drops_category ON drops(category_id);
CREATE INDEX IF NOT EXISTS idx_drops_verdict ON drops(verdict);

-- Verdicts are cached per URL so re-publishing the same link costs nothing.
CREATE TABLE IF NOT EXISTS verdict_cache (
  url_hash TEXT PRIMARY KEY NOT NULL,
  verdict TEXT NOT NULL,
  reason TEXT NOT NULL,
  score INTEGER NOT NULL,
  source TEXT NOT NULL,
  report TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

-- Every successful unlock is recorded.
CREATE TABLE IF NOT EXISTS unlocks (
  id TEXT PRIMARY KEY NOT NULL,
  drop_id TEXT NOT NULL,
  buyer TEXT NOT NULL DEFAULT '',
  tx_hash TEXT NOT NULL DEFAULT '',
  method TEXT NOT NULL DEFAULT 'chain',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_unlocks_drop ON unlocks(drop_id);

-- Sponsored-task gates for free drops.
CREATE TABLE IF NOT EXISTS ad_tasks (
  id TEXT PRIMARY KEY NOT NULL,
  drop_id TEXT NOT NULL,
  earliest_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ad_tasks_drop ON ad_tasks(drop_id);

-- Daily AI consumption, used to stay inside the free Workers AI allowance.
CREATE TABLE IF NOT EXISTS ai_usage (
  day TEXT NOT NULL,
  provider TEXT NOT NULL,
  calls INTEGER NOT NULL DEFAULT 0,
  neurons INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (day, provider)
);
