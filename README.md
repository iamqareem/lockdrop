# LockDrop

**Peer-to-peer escrow for selling file and link access on Polygon PoS.**

LockDrop lets a seller lock a private destination link (Telegram invite, OneDrive /
Google Drive / Dropbox / Nextcloud / Quark Cloud share, Notion page, ZIP/APK download,
YouTube or media URL) behind a Polygon smart-contract payment. A buyer pays in
POL/USDT/USDC; the escrow splits the payment between the seller and the platform
treasury. The link is encrypted at rest and released only after the **server** has
independently confirmed the payment on-chain.

Every link is screened before it can be published. A blocked link never reaches the
database.

---

## Table of contents

- [Architecture](#architecture)
- [How a link is judged](#how-a-link-is-judged)
- [Why everything stays free](#why-everything-stays-free)
- [Security model](#security-model)
- [Tech stack](#tech-stack)
- [Project layout](#project-layout)
- [Getting started](#getting-started)
- [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
- [Environment](#environment)
- [The escrow contract](#the-escrow-contract)
- [Categories](#categories)
- [Routes](#routes)
- [Commands](#commands)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)

---

## Architecture

```
┌─────────────────────── Browser (public/) ────────────────────────┐
│  #/            Create wizard: category → link → verify → price   │
│  #/drops       Pinterest-style drop feed                         │
│  #/drop/:id    Checkout + unlock view                             │
│  #/admin       Admin dashboard (token-gated)                     │
│  #/contract    PolygonEscrow.sol source                          │
│                                                                   │
│  app/api.js       every call goes to /api — never to Turso       │
│  app/wallet.js    dependency-free EIP-1193 client + ABI encoding │
│  app/categories.js client mirror of the server's category rules   │
└───────────────────────────────┬───────────────────────────────────┘
                                │  HTTPS, same origin
┌─────────────────── Cloudflare Pages Functions ───────────────────┐
│  functions/api/                                                   │
│    config.ts    public runtime config (no secrets)               │
│    drops.ts     GET feed · POST create (verifies first)           │
│    drops/[id]   GET one · DELETE (admin)                         │
│    verify.ts    POST → link verification report                   │
│    unlock.ts    POST → releases the URL after payment proof      │
│    contract.ts  GET → PolygonEscrow.sol                          │
│    admin/drops  POST → publish a platform drop (admin)           │
│                                                                   │
│  functions/_lib/                                                  │
│    turso.ts     HTTP v2 pipeline client (zero dependencies)       │
│    crypto.ts    HKDF → per-drop AES-GCM key, seal / unseal        │
│    polygon.ts   receipt + Paid-event verification                │
│    ai.ts        Workers AI judge with a daily neuron budget       │
│    verify/      normalise · structure · host · category · probe  │
└──────────────┬───────────────────────────────┬───────────────────┘
               │ libSQL HTTP v2 pipeline       │ Workers AI binding
               ▼                               ▼
        ┌─────────────┐                 ┌──────────────────┐
        │    Turso    │                 │  Cloudflare      │
        │   SQLite    │                 │  Workers AI      │
        └─────────────┘                 └──────────────────┘
```

**There is no build step.** The frontend is plain HTML, CSS and native ES modules in
`public/`; the backend is TypeScript in `functions/` that wrangler bundles with
**zero npm runtime dependencies**. Push to GitHub and the site updates.

### Request flow

1. The seller picks a category and pastes a link.
2. The browser does a fast local check and calls `POST /api/verify`.
3. The server normalises the URL, analyses its structure, reputation and category fit,
   then fetches the destination and inspects what is actually served there.
4. Heuristics produce a verdict. Workers AI may **escalate** it — never relax it.
5. The verdict is cached by URL hash and stored on the drop.
6. `POST /api/drops` verifies again (cache hit), refuses blocked links, encrypts the
   URL with AES-GCM and stores it.
7. The buyer pays. The browser sends the transaction hash to `POST /api/unlock`.
8. The server re-reads the receipt from Polygon, checks the `Paid` event against the
   escrow contract, and only then decrypts and returns the URL.

---

## How a link is judged

The verification engine lives in `functions/_lib/verify/` and runs as a chain of
independent modules.

| Module | What it looks at |
| --- | --- |
| `normalize.ts` | Scheme, embedded credentials, tracking parameters, canonical form |
| `structure.ts` | Raw IPs (dotted, decimal, hex), loopback and private ranges, odd ports, sensitive query parameters |
| `host.ts` | High-abuse TLDs, typosquats, brand embedding, punycode, mixed-script homographs, phishing vocabulary, page content |
| `categories.ts` | Does the URL actually belong to the chosen category? |
| `probe.ts` | Live fetch: redirect chain, status, content type, page title, credential prompts |
| `rules.ts` | Severity weights → risk score → verdict |

### Scoring

Each finding carries a severity. The verdict takes **both** the accumulated score and
the worst single finding into account, because an additive score alone is too
forgiving.

| Severity | Weight | Example |
| --- | --- | --- |
| `info` | 0 | cosmetic observation |
| `low` | 4 | unusual subdomain depth |
| `medium` | 12 | plain HTTP, high-abuse TLD, redirect to another domain |
| `high` | 30 | path shape does not fit the category |
| `critical` | 70 | raw IP, embedded credentials, brand mismatch, phishing wording |

- any `critical` → **Blocked**
- any `high` or `medium` → at least **Caution**
- score ≥ 70 → **Blocked**, score ≥ 25 → **Caution**, otherwise **Trusted**

### Category mismatch is a hard block

Listing a Dropbox link under *Notion*, or a Telegram invite under *Google Drive*, is
treated as a deception signal rather than a mistake — it is a `critical` finding.

### The AI can only make things stricter

`functions/_lib/ai.ts` asks the model for `{"risk":"low|medium|high","reason":"…"}`.
A `high` risk escalates the verdict to Blocked; a `medium` risk escalates it to
Caution. A `low` risk only improves the wording. **A heuristic Blocked is never
rescinded.** Every AI failure degrades silently to the heuristic verdict.

---

## Why everything stays free

The brief was "everything free". Here is the full running cost.

| Component | Cost |
| --- | --- |
| Cloudflare Pages static hosting | Free |
| Cloudflare Pages Functions | Free — 100,000 invocations/day |
| **Cloudflare Workers AI** | Free — **10,000 neurons/day**, no card required |
| Turso SQLite | Free tier |
| Polygon PoS | L2 gas, negligible |
| OpenRouter (optional fallback) | Free tier, 50 req/day (or 1,000 after a one-off $10) |

**Workers AI is the answer to the OpenRouter exhaustion worry.** One Cloudflare
account gets 10,000 neurons every day, resetting at 00:00 UTC. A compact verdict
prompt with a small model costs roughly **3–4 neurons**, so the daily allowance
covers **thousands** of judgements — versus OpenRouter's 50 requests/day on the
free tier.

Three guard rails keep it that way:

- **Verdict cache.** Verdicts are cached by URL hash in Turso. Re-publishing the same
  link costs nothing — no probe, no AI call.
- **Daily neuron budget.** `ai_usage` tracks consumption; the engine stops calling AI
  at 8,000 of the free 10,000 neurons and falls back to heuristics. It is structurally
  impossible to exceed the free allowance.
- **Judge once, at publish time.** The verdict is stored on the drop and rendered on
  the card. Viewing the feed never calls the AI.

OpenRouter remains available as an optional secondary judge, capped at 40 requests a
day. It is a fallback, not the primary.

---

## Security model

**What changed from the previous build:**

| Before | Now |
| --- | --- |
| AES-GCM key derived from `SHA-256(dropId + sellerWallet)` — both public, stored beside the ciphertext | Key derived server-side via HKDF from `LOCKDROP_MASTER_KEY`; the ciphertext never leaves the server until payment is proven |
| Turso token shipped in the browser bundle | Turso token is a Cloudflare secret; the browser only ever talks to `/api` |
| OpenRouter key inlined in the client | Moved to the server, optional |
| Admin PIN hard-coded in client JS (`7777` / `1337` / `admin`) | Admin token compared server-side in constant time |
| Any visitor could decrypt any link | The URL is released only after an on-chain `Paid` event is verified by the server |

**Key hierarchy**

```
LOCKDROP_MASTER_KEY  (32 bytes, Cloudflare secret)
  └─ HKDF-SHA256(info = "lockdrop:v1:<dropId>")
       └─ AES-GCM-256, 12-byte random IV
            └─ ciphertext stored in drops.ciphertext / drops.iv
```

The public feed endpoint returns drop metadata only — never `ciphertext`, never `iv`.

**Unlocking.** `POST /api/unlock` with a transaction hash:

1. Fetches the receipt from the Polygon JSON-RPC.
2. Requires `status == 0x1`.
3. Scans the logs for `Paid(bytes32,address,address,address,uint256)` emitted by the
   configured escrow contract.
4. Requires the indexed drop id (SHA-256 of the drop id), seller and token to match,
   and the amount to be at least the price.
5. Only then decrypts and returns the URL.

The browser only *proposes* a hash. It is never trusted.

**Sponsored-task unlocks** (free drops) use a server-issued task with an earliest
completion time, so the release is server-controlled. This is a soft gate — see
[Known limitations](#known-limitations).

---

## Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | Vanilla ES modules | No framework, no bundler, no runtime CDN |
| Styling | Hand-written CSS | Monochrome design system, CSS custom properties, dark mode |
| Icons | Simple Icons (CC0) + custom filled marks | Ten real brand marks, monochrome |
| Backend | Cloudflare Pages Functions | TypeScript, zero npm runtime dependencies |
| Database | Turso (libSQL) | HTTP v2 pipeline API, no driver needed |
| AI | Cloudflare Workers AI | Free tier, with OpenRouter as optional fallback |
| Chain | Polygon PoS (137) | `ethers` used only as a dev-time assertion tool |
| Contract | Solidity `^0.8.20` | OpenZeppelin `ReentrancyGuard` + `SafeERC20` |

The browser ships **no** `ethers` bundle: the three contract calls LockDrop needs use
fixed function selectors and static ABI encoding, so `app/wallet.js` encodes them
directly. `npm run check` asserts the selectors and the encoders against `ethers`
output, so a typo cannot ship silently.

---

## Project layout

```
lockdrop/
├── functions/                 Cloudflare Pages Functions
│   ├── api/                   HTTP routes
│   └── _lib/                  Shared server code
│       ├── verify/            Link verification engine
│       ├── turso.ts           Turso HTTP client
│       ├── crypto.ts          HKDF + AES-GCM
│       ├── polygon.ts         Receipt verification
│       └── ai.ts              Workers AI judge + budget guard
├── public/                    Static frontend (no build step)
│   ├── index.html
│   ├── assets/styles.css      Design system
│   └── app/
│       ├── main.js            Shell + hash router
│       ├── wallet.js          EIP-1193 client, zero-dependency ABI encoding
│       ├── categories.js      Client mirror of the category rules
│       ├── icons.js           Brand marks + UI icons
│       └── views/             create · feed · drop · admin · contract
├── contracts/PolygonEscrow.sol
├── scripts/                   check-abi · check-categories · sync-contract-source
├── tests/verify.test.ts       26 unit tests for the verification engine
├── schema.sql                 Turso schema
├── wrangler.toml              Cloudflare Pages configuration
└── .env.example               Every environment value, split by trust level
```

---

## Getting started

**Prerequisites:** Node.js 20+, the [Turso CLI](https://turso.tech/),
and (for deployment) a Cloudflare account.

```bash
# 1. Install dev dependencies
npm install

# 2. Start a local database
turso dev -f lockdrop.db -p 8099

# 3. Apply the schema to it
turso db shell lockdrop < schema.sql     # remote database
# …or, for the local server, POST schema.sql to http://127.0.0.1:8099/v2/pipeline

# 4. Configure local secrets
cp .env.example .dev.vars
#   TURSO_DATABASE_URL="http://127.0.0.1:8099"
#   LOCKDROP_MASTER_KEY="$(openssl rand -hex 32)"

# 5. Run the app
npm run dev        # http://localhost:8788
```

`npm run dev` runs `wrangler pages dev`. The static site and the API are served from
the same origin, exactly as in production.

> **Note on the AI binding.** Workers AI is a *remote* binding, so `wrangler pages dev`
> needs `CLOUDFLARE_API_TOKEN` (or an interactive `wrangler login`) to reach it.
> Without it the app still runs — verification falls back to the heuristics, and the
> footer reads "Locally verified" instead of "AI verified".

---

## Deploying to Cloudflare Pages

The GitHub repository is the only thing Cloudflare needs.

1. **Create the project.** Cloudflare dashboard → *Workers & Pages* → *Create* →
   *Pages* → *Connect to Git*. Pick `iamqareem/lockdrop`.
2. **Build settings.**
   - Build command: *(leave empty)*
   - Build output directory: `public`
3. **Add the secrets.** *Settings* → *Environment variables* → *Add* for each of:

   | Name | Type | Value |
   | --- | --- | --- |
   | `TURSO_DATABASE_URL` | Secret | `libsql://lockdrop-xxxx.turso.io` |
   | `TURSO_AUTH_TOKEN` | Secret | Turso bearer token |
   | `LOCKDROP_MASTER_KEY` | Secret | `openssl rand -hex 32` |
   | `ADMIN_TOKEN` | Secret | a long random string |
   | `ESCROW_ADDRESS` | Plain | deployed `PolygonEscrow.sol` address |
   | `ADSGRAM_BLOCK_ID` | Plain | Adsgram block id |
   | `MONETAG_DIRECT_LINK` | Plain | Monetag smartlink |

4. **Add the Workers AI binding.** *Settings* → *Bindings* → *Add* → *Workers AI*,
   variable name `AI`. This is what powers the AI judge.
5. **Push.** Every push to `main` triggers a fresh deploy.

`wrangler.toml` is the source of truth for the Pages configuration and carries the
`[ai]` binding, the public variables and the build output directory.

---

## Environment

There are two tiers and they never mix.

**Cloudflare secrets** — read by the Functions, never sent to a browser:
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `LOCKDROP_MASTER_KEY`, `ADMIN_TOKEN`, and
optionally `OPENROUTER_API_KEY`.

**Public values** — read by the browser through `GET /api/config`: `ESCROW_ADDRESS`,
`ADSGRAM_BLOCK_ID`, `MONETAG_DIRECT_LINK`.

There is no `VITE_` prefix any more. There is no bundler to inline anything, and
nothing secret is ever in the client.

---

## The escrow contract

`contracts/PolygonEscrow.sol` is a minimal, non-custodial payment splitter:

- `payNative(bytes32 dropId, address seller)` — splits the incoming POL value.
- `payToken(bytes32 dropId, address token, uint256 amount, address seller)` — pulls an
  ERC-20 with `safeTransferFrom` and splits the **actually received** balance, so
  fee-on-transfer tokens are handled correctly.
- `FEE_BPS = 300` — 3% to `platformWallet`, the remainder to the seller.
- `nonReentrant` on both entry points.
- Emits `Paid(dropId, buyer, seller, token, amount)` for off-chain verification.

Deploy it on Polygon PoS with your treasury wallet as `platformWallet`. The source is
served in-app at `#/contract`.

> The contract source is mirrored into `functions/_lib/contract-source.ts` because
> Pages Functions cannot import arbitrary file types. `npm run check` fails if the
> two ever drift; `npm run sync:contract` regenerates the mirror.

---

## Categories

Ten categories, each with a real brand mark rendered as a monochrome silhouette.

| Category | Hosts | Type |
| --- | --- | --- |
| Telegram | `t.me`, `telegram.me` | specific brand |
| OneDrive | `1drv.ms`, `onedrive.live.com`, `sharepoint.com` | specific brand |
| Google Drive | `drive.google.com`, `docs.google.com` | specific brand |
| Dropbox | `dropbox.com`, `db.tt` | specific brand |
| Nextcloud | self-hosted; recognised by path shape | specific brand |
| Quark Cloud | `pan.quark.cn`, `drive.quark.cn` | specific brand |
| Notion | `notion.so`, `notion.site` | specific brand |
| Live Download | file extensions + known file hosts | generic type |
| Live Document | document extensions | generic type |
| Live Media | video hosts + media extensions | generic type |

The server's rules are authoritative; the browser mirrors them for instant feedback.
`npm run check` asserts the two stay identical.

---

## Routes

| Route | View |
| --- | --- |
| `#/` | Create wizard — category → link → **verification** → mode, token and price |
| `#/drops` | Pinterest-style drop feed with category filters |
| `#/drop/:id` | Checkout and unlock view |
| `#/admin` | Admin dashboard (token-gated) — publish and delete drops |
| `#/contract` | Escrow contract source |

**Navigation.** The Lock and Drops buttons live in the **bottom** navigation on
phones, tablets and anything below 1024px. The top navigation appears only on
desktop. The feed is a CSS multi-column masonry: 1 column on phones, 2 on tablets,
3 on desktop and 4 on wide screens.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server (static + Functions) on :8788 |
| `npm test` | 26 unit tests for the verification engine |
| `npm run check` | ABI selectors, category sync, contract mirror — all asserted |
| `npm run lint` | `tsc --noEmit` |
| `npm run deploy` | `wrangler pages deploy public` |
| `npm run sync:contract` | Regenerate the contract mirror |
| `npm run schema` | Apply `schema.sql` to the remote database |

---

## Known limitations

Honest list, in priority order.

1. **The sponsored-task gate is soft.** Without Adsgram's server-side verification,
   the ad unlock is a timed server-side release, not proof that an ad was watched. The
   paid path is unaffected — it is cryptographically verified.
2. **The contract charges a flat 3%.** There is no per-drop fee tier, so a
   fee-differentiated product would need a contract upgrade and redeployment.
3. **No contract deployment tooling.** The repository has no Hardhat or Foundry
   project; the contract is compiled and deployed by hand.
4. **The rate limiter is per-isolate.** It is a speed bump against casual abuse, not
   a distributed limit. The real boundary is the on-chain payment check.
5. **The AI is advisory.** It can escalate a verdict but never relax one, and its
   "reason" text is shown to buyers — a hallucinated reason could mislead. The
   heuristics always run first and dominate.
6. **A buyer cannot dispute.** There is no refund or dispute window yet.
7. **No pagination in the UI.** The API supports a cursor; the feed loads 40 at a
   time with a "Load more" button.
8. **Domain-age and reputation checks are not implemented.** The engine judges URL
   shape, brand imitation and live page content — not how old a domain is.

---

## Roadmap

- [ ] Hardhat or Foundry project for the contract, with deploy + verify scripts
- [ ] Per-drop fee tiers in `PolygonEscrow.sol` (3% / 5%) with an upgrade path
- [ ] Seller payout tracking and a dispute / refund window
- [ ] Domain age and registrar checks via the RDAP/WHOIS endpoints
- [ ] Feed search and sorting, and infinite scroll
- [ ] Rate limiting backed by Cloudflare KV instead of isolate memory
- [ ] Optional buyer identity (Telegram id) attached to an unlock
- [ ] Self-service deploy from GitHub Actions with a Cloudflare API token

---

## Licence

MIT — see [LICENSE](LICENSE).
