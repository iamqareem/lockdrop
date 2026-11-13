# LockDrop

**Peer-to-peer escrow for selling file and link access on Polygon PoS.**

LockDrop lets a seller lock a private destination link (Telegram invite, OneDrive/Drive
share, Dropbox, Notion page, ZIP/APK download, YouTube/media URL) behind a Polygon smart
contract payment. A buyer pays in POL/USDT/USDC; the escrow splits the payment between the
seller and the platform treasury. The link itself is stored encrypted and only revealed
after payment (or a rewarded-ad task) is confirmed.

---

## Table of Contents

- [How it works](#how-it-works)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project layout](#project-layout)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [The escrow contract](#the-escrow-contract)
- [Unlock modes](#unlock-modes)
- [Link safety judging](#link-safety-judging)
- [Routes](#routes)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## How it works

1. **Create** — The seller picks a resource category (validated against the link host),
   pastes the destination URL, and chooses a price + token on Polygon PoS.
2. **Judge** — The URL is screened for phishing/malware patterns (AI via OpenRouter, with
   a local heuristic fallback). Blocked links cannot be published.
3. **Encrypt & store** — The URL is encrypted with AES-GCM and persisted to Turso (libSQL),
   falling back to `localStorage` when no database is configured.
4. **Publish** — The seller receives a shareable `#/drop/:id` link.
5. **Unlock** — The buyer pays through `PolygonEscrow.sol`, or completes a rewarded ad.
   A receipt is verified against the on-chain `Paid` event before the URL is decrypted
   and shown.

---

## Architecture

```
┌──────────────────────────── Browser (SPA) ────────────────────────────┐
│  #/            Create wizard (3 steps: category → link → price)       │
│  #/drops       Platform drop feed                                     │
│  #/drop/:id    Checkout + unlock view                                 │
│  #/admin       Admin panel (ad drops, delete, contract specs)         │
│  #/contract    PolygonEscrow.sol source (gated)                       │
│                                                                       │
│  src/lib/polygon.js      ethers v6 → wallet, pay, receipt verification │
│  src/lib/turso.js        @libsql/client/web → schema, CRUD, AES-GCM   │
│  src/lib/openrouter.js   AI link safety judgement (free tier)         │
│  src/lib/ads.js          Adsgram / Monetag rewarded ad providers      │
└───────────┬───────────────────────┬───────────────────────┬────────────┘
            │ HTTPS (libsql)        │ JSON (openrouter.ai)  │ JSON-RPC (Polygon)
            ▼                       ▼                       ▼
     ┌─────────────┐        ┌──────────────┐        ┌──────────────────┐
     │    Turso    │        │  OpenRouter  │        │ Polygon PoS (137)│
     │   SQLite    │        │  (optional)  │        │ PolygonEscrow.sol│
     └─────────────┘        └──────────────┘        └──────────────────┘
```

**Key derivation.** The AES-GCM key is `SHA-256("lockdrop:polygon:{dropId}:{sellerWallet}")`.
The IV is 12 random bytes stored alongside the ciphertext. See
[Known limitations](#known-limitations) for the security implications.

**Payment flow (ERC-20).** The client reads the current allowance, resets it to `0` if a
stale non-zero allowance exists, approves exactly the payment amount, then calls
`payToken(dropId, token, amount, seller)`. Native POL uses `payNative` instead.

**Verification.** After the transaction mines, the receipt is fetched over the public
Polygon RPC and every log is scanned for a `Paid` event matching the drop id, seller,
token, and an amount ≥ the price. Only then is the URL decrypted.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | Vanilla JS (DOM `innerHTML` rendering), Tailwind CSS v4 |
| Icons | Inline monochrome SVGs |
| Blockchain | `ethers` v6, Polygon PoS (chain id 137) |
| Database | Turso (libSQL) via `@libsql/client/web`, `localStorage` fallback |
| AI | OpenRouter free-tier chat completions for link safety |
| Ads | Adsgram (Telegram Mini App rewarded video), Monetag direct links |
| Contracts | Solidity `^0.8.20`, OpenZeppelin `ReentrancyGuard` + `SafeERC20` |

---

## Project layout

```
lockdrop/
├── contracts/
│   └── PolygonEscrow.sol      # 3% fee-splitting escrow contract
├── src/
│   ├── main.js                # App shell, hash router, all views
│   ├── index.css              # Tailwind v4 theme + fonts
│   └── lib/
│       ├── polygon.js         # Wallet, payment, receipt verification
│       ├── turso.js           # DB schema, CRUD, AES-GCM seal/unseal
│       ├── openrouter.js      # AI + heuristic link judgement
│       └── ads.js             # Adsgram / Monetag providers
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting started

**Prerequisites:** Node.js 18+ (the repo ships a `bun.lock`; npm works fine too).

```bash
# 1. Install dependencies
npm install

# 2. Configure the environment
cp .env.example .env.local
# then fill in the values (see below)

# 3. Run the dev server on :3000
npm run dev
```

Other scripts:

```bash
npm run build     # production bundle → dist/
npm run preview   # preview the production build
npm run lint      # tsc --noEmit
npm run clean     # remove dist/
```

Without any `.env.local` the app still runs fully — Turso falls back to `localStorage`
and the safety judge falls back to local heuristics. Wallet payments still require a
deployed escrow address (enter it in the UI, or set the env var).

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_TURSO_DATABASE_URL` | optional | `libsql://<db>.turso.io` — drops database |
| `VITE_TURSO_AUTH_TOKEN` | optional | Turso auth token for the database |
| `VITE_POLYGON_ESCROW_ADDRESS` | for payments | Deployed `PolygonEscrow.sol` address |
| `VITE_OPENROUTER_API_KEY` | optional | Enables AI link judgement |
| `VITE_OPENROUTER_MODEL` | optional | Defaults to `openrouter/free` |
| `VITE_ADSGRAM_BLOCK_ID` | optional | Adsgram rewarded-video block for Telegram |
| `VITE_MONETAG_DIRECT_LINK` | optional | Monetag smartlink for web ad unlocks |

> **Note:** `VITE_*` variables are inlined into the client bundle. Never put a *secret* key
> in them. See [Known limitations](#known-limitations).

---

## The escrow contract

`contracts/PolygonEscrow.sol` is a minimal, non-custodial payment splitter:

- `payNative(bytes32 dropId, address seller)` — splits the incoming POL value.
- `payToken(bytes32 dropId, address token, uint256 amount, address seller)` — pulls an
  ERC-20 with `safeTransferFrom` and splits the **actually received** balance (fee-on-
  transfer safe).
- `FEE_BPS = 300` — 3% to `platformWallet`, the remainder to the seller.
- `nonReentrant` on both entry points.
- Emits `Paid(dropId, buyer, seller, token, amount)` for off-chain verification.

Deploy with your treasury wallet as `platformWallet`. The contract source is also served
in-app at `#/contract` (admin-gated) with a copy button.

---

## Unlock modes

| Mode | Fee | Description |
| --- | --- | --- |
| `paid_ad` | 3% | Buyer pays on Polygon, or watches a sponsored ad/task to unlock free |
| `paid_pure` | 5% | Buyer pays on Polygon, no ad path (ad-free) |
| `free_ad` | 0% | Free unlock via rewarded ad only |

Admin-published drops (`isAdminAd`) are always free and flagged as platform-sponsored in
the feed.

---

## Link safety judging

`judgeLink(title, url)` in `src/lib/openrouter.js`:

- **With an OpenRouter key** — a compact JSON prompt asks for
  `{"safe":bool,"verdict":"Trusted"|"Caution"|"Blocked","reason":"..."}` on a free model.
  The verdict is normalised, and the reason is truncated to 140 characters.
- **Without a key (or on API failure)** — a local heuristic blocks raw-IP hosts,
  executable payloads (`.exe/.scr/.bat/.cmd/.msi/.ps1/.apk`), and wallet-phishing
  patterns (`seed-phrase`, `mnemonic`, `wallet-verify`, `airdrop-claim`, `metamask-sync`).
  Plain HTTP and high-risk TLDs get a `Caution` verdict.

The verdict and reason are stored on the drop and shown to buyers before they pay.

---

## Routes

| Route | View |
| --- | --- |
| `#/` | Create wizard — 1. Name & category, 2. Link URL, 3. Payment tier |
| `#/drops` | Platform drop feed (latest 50 drops) |
| `#/drop/:id` | Checkout / unlock view for a single drop |
| `#/admin` | Admin dashboard (gated) — publish ad drops, delete drops |
| `#/contract` | Escrow contract source (admin-gated) |

The app is also usable as a **Telegram Mini App** — it loads `telegram-web-app.js`,
expands on boot, and uses Adsgram rewarded video when running inside Telegram.

---

## Known limitations

These are real gaps in the current implementation, listed honestly so they can be planned
for rather than discovered later:

1. **Client-side "escrow" is not access control.** The decryption key is derived from
   public values (`dropId` + `sellerWallet`) that are stored in the same row as the
   ciphertext. Anyone who can read the `drops` table can derive the key and decrypt every
   URL. A real fix means moving decryption server-side and releasing the key only after
   on-chain payment verification — a backend/relayer or a key-escrow service.
2. **The Turso token ships in the browser bundle.** With `VITE_TURSO_AUTH_TOKEN` inlined,
   anyone can extract it and read/write the database directly. Use a read-only token for
   the client, or proxy all DB access through a server.
3. **The OpenRouter key is also client-exposed**, which lets anyone spend the free tier or
   read the key.
4. **The admin PIN is hardcoded** (`7777` / `1337` / `admin`) in client-side code, so the
   admin panel is effectively public — anyone can read the source and delete drops.
   Admin auth needs to move to a server-side check.
5. **The 5% ad-free tier is not implemented on-chain.** `PolygonEscrow.sol` hardcodes
   `FEE_BPS = 300`, so `paid_pure` drops are actually split 97/3, not 95/5. The contract
   needs a per-drop fee (or a fee-tier parameter).
6. **No contract deployment tooling.** The Solidity file imports OpenZeppelin but the repo
   has no Hardhat/Foundry config, no dependency manifest, and no deploy scripts. The
   contract has to be compiled and deployed manually.
7. **Unused dependencies.** `react`, `react-dom`, `lucide-react`, `motion`, `express`,
   `dotenv`, and `@google/genai` are declared but unused — the UI is vanilla JS.
8. **Ads are advisory.** The rewarded-ad path is a client-side countdown; without Adsgram
   verification there is no cryptographic proof a task was completed.

---

## Roadmap

- [ ] Move unlock/decryption behind a server that verifies the Polygon receipt and releases
      the key
- [ ] Per-drop fee tiers in `PolygonEscrow.sol` (3% / 5%) with a redeploy or upgrade path
- [ ] Hardhat or Foundry project for the contract, with deploy + verification scripts
- [ ] Move admin auth and the OpenRouter call server-side; use read-only Turso tokens in
      the browser
- [ ] Strip unused dependencies (`react`, `express`, `@google/genai`, …)
- [ ] Pagination and filtering on the drop feed
- [ ] Dispute/refund window and seller payout tracking
