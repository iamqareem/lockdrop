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
- [Publishing the knowledge base](#publishing-the-knowledge-base)
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
│  app/turso.js       reads Turso DIRECTLY (no backend in the path) │
│  app/drops.js       the feed queries                              │
│  app/api.js         the escrow gateway calls                     │
│  app/wallet.js      dependency-free EIP-1193 client + ABI encoding│
│  app/shared/drop.js the public drop shape + fee tiers (shared)    │
│  app/categories.js  client mirror of the server's category rules  │
└───────────┬───────────────────────────────┬───────────────────────┘
            │                               │
   READS    │ HTTPS + read-only token       │ HTTPS (same origin)
            │ (public/turso.json)           │
            ▼                               ▼
    ┌─────────────┐            ┌────────────────────────────┐
    │    Turso    │◄───────────│  Cloudflare Pages Functions│
    │   SQLite    │  read/write│  (the escrow gateway)      │
    └─────────────┘   token   └────────────────────────────┘
```

**There is no build step.** The frontend is plain HTML, CSS and native ES modules in
`public/`; the backend is JavaScript in `functions/` that wrangler bundles with
**zero npm runtime dependencies**. Push to GitHub and the site updates.

### Two data paths

| Path | Goes through | Used for |
| --- | --- | --- |
| **Reads** | straight to **Turso** | the feed, a single drop, the admin list |
| **Escrow** | **Cloudflare Pages Functions** → Turso | verifying a link, sealing a URL, unlocking a URL, admin writes |

The browser reads the feed directly from Turso with a token that is **public by
design**: it is scoped to `data_read` on the `drops` table alone. Turso enforces that
server-side — the token cannot write, and it cannot read any other table.

The sealed URLs live in a **separate table**, `drop_secrets`, which that token cannot
reach even accidentally. Only the server, which holds `LOCKDROP_MASTER_KEY`, can open
them.

**Why the escrow still needs a gateway.** Two operations cannot happen in a browser:
sealing a URL (the master key must never leave the server) and releasing one (the
server has to confirm the on-chain payment before it hands over the key). Putting the
key in the browser would make every locked link readable by anyone who opens
devtools. Cloudflare Pages Functions are part of the Cloudflare Pages project — not a
separate server to run, and not a separate bill.

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
   escrow contract — including the **fee tier** the drop was sold at — and only then
   decrypts and returns the URL.

The feed never touches the server at all: the browser queries Turso itself.

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
| The Turso read/write token was reachable from the browser | The browser holds a **read-only, `drops`-scoped** token; the write token stays in the Pages secret store |
| The sealed URL sat in the same row as the public metadata | It lives in `drop_secrets`, a table the browser's token cannot read |
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
| Backend | Cloudflare Pages Functions | Plain JavaScript, zero npm runtime dependencies |
| Database | Turso (libSQL) | HTTP v2 pipeline API, no driver needed |
| AI | Cloudflare Workers AI | Free tier, with OpenRouter as optional fallback |
| Chain | Polygon PoS (137) | `ethers` used only as a dev-time assertion tool |
| Contract | Solidity `^0.8.20` | OpenZeppelin `ReentrancyGuard` + `SafeERC20` |
| Contract toolchain | Hardhat 3 | Compiles, tests and deploys; never ships to Pages |

The browser ships **no** `ethers` bundle: the three contract calls LockDrop needs use
fixed function selectors and static ABI encoding, so `app/wallet.js` encodes them
directly. `npm run check` asserts the selectors and the encoders against `ethers`
output, so a typo cannot ship silently.

---

## Project layout

```
lockdrop/
├── functions/                 Cloudflare Pages Functions (JavaScript)
│   ├── api/                   HTTP routes
│   └── _lib/                  Shared server code
│       ├── verify/            Link verification engine
│       ├── turso.js           Turso HTTP client
│       ├── crypto.js          HKDF + AES-GCM
│       ├── polygon.js         Receipt verification
│       ├── tiers.js           Fee tiers (re-exported from the shared module)
│       └── ai.js              Workers AI judge + budget guard
├── public/                    Static frontend (no build step)
│   ├── index.html
│   ├── turso.json             Public read config: the browser's Turso token
│   ├── assets/styles.css      Design system
│   └── app/
│       ├── main.js            Shell + hash router
│       ├── turso.js           Direct Turso client for the browser
│       ├── drops.js           The feed queries
│       ├── api.js             Escrow gateway calls
│       ├── wallet.js          EIP-1193 client, zero-dependency ABI encoding
│       ├── categories.js      Client mirror of the category rules
│       ├── icons.js           Brand marks + UI icons
│       ├── shared/drop.js     The public drop shape — imported by BOTH sides
│       └── views/             create · feed · drop · admin · contract
├── contracts/
│   ├── PolygonEscrow.sol      The escrow
│   ├── artifacts/             Commiled ABI + bytecode (the Pages artifact)
│   └── mocks/                 ERC-20 mocks used only by the tests
├── test/PolygonEscrow.test.js Contract tests on a local EVM
├── tests/                     Unit tests for the verification and payment code
├── scripts/                   check-abi · check-contract · check-categories
│                              check-frontend · check-turso-read
│                              build-contract-artifact · deploy-contract · lint
├── kb/                        The knowledge base — source of the published drops
├── schema.sql                 Turso schema
├── hardhat.config.js          Contract toolchain
├── wrangler.toml              Cloudflare Pages configuration
└── .env.example               Every environment value, split by trust level
```
---

## Getting started

**Prerequisites:** Node.js 22.13+ (Hardhat 3 requires it), the
[Turso CLI](https://turso.tech/), and (for deployment) a Cloudflare account.

```bash
# 1. Install dev dependencies
npm install

# 2. Point the browser at Turso and mint the read token
#    (the browser reads the feed directly — see "Two data paths")
turso db tokens create lockdrop -p drops:data_read -e never
# then put the token in public/turso.json

# 3. Apply the schema
turso db shell lockdrop < schema.sql

# 4. Configure the local secrets
cp .env.example .dev.vars
#   TURSO_DATABASE_URL="libsql://lockdrop-xxxx.turso.io"
#   TURSO_AUTH_TOKEN="<a scoped read/write token>"
#   LOCKDROP_MASTER_KEY="$(openssl rand -hex 32)"

# 5. Run the app
npm run dev        # http://localhost:8788
```

`npm run dev` runs `wrangler pages dev`. The static site and the API are served from
the same origin, exactly as in production.

> **Note on the AI binding.** Workers AI is a *remote* binding, so it is configured in
> the Cloudflare dashboard rather than in `wrangler.toml` — which keeps local
> development free of a Cloudflare login. Without the binding the app still runs:
> verification falls back to the heuristics, and the footer reads "Locally verified"
> instead of "AI verified".

---

## Deploying to Cloudflare Pages

The GitHub repository is the only thing Cloudflare needs.

### Already done

The project `lockdrop` exists, is deployed, and is serving:

- **Live:** `https://lockdrop-e0z.pages.dev/`
- **Custom domain:** `drops.ugaplex.com` — added, waiting on the DNS record
- **Account:** the `ugaplex.com` zone is in the same Cloudflare account, so
  Pages will attach the CNAME once it exists

### Build settings

- Build command: *(leave empty — there is no build step)*
- Build output directory: `public`
- Root directory: `/`

### Secrets

Set with `wrangler pages secret put <NAME> --project-name lockdrop`, or in the
dashboard under *Settings → Environment variables*.

> **Secrets apply to the NEXT deployment, not the running one.** After changing
> a secret, redeploy before testing it:
>
> ```bash
> npm run deploy
> ```

| Name | Type | Value |
| --- | --- | --- |
| `TURSO_DATABASE_URL` | Secret | `libsql://lockdrop-xxxx.turso.io` |
| `TURSO_AUTH_TOKEN` | Secret | scoped read/write Turso token |
| `LOCKDROP_MASTER_KEY` | Secret | `openssl rand -hex 32` |
| `ADMIN_TOKEN` | Secret | a long random string |
| `ESCROW_ADDRESS` | Secret | deployed `PolygonEscrow.sol` address |

### Public values

These live in `wrangler.toml` under `[vars]` and are read by the browser
through `GET /api/config`: `ESCROW_ADDRESS`, `ADSGRAM_BLOCK_ID`,
`MONETAG_DIRECT_LINK`, `POLYGON_RPC_URL`, `AI_MODEL`, `AI_DAILY_BUDGET`.

### The Workers AI binding

Declared in `wrangler.toml`:

```toml
[ai]
binding = "AI"
```

A deploy applies it. The free tier allows 10,000 neurons per day and a verdict
call costs about 1.3 — thousands of judgements, free.

### The custom domain

Pages will not attach a domain until the CNAME exists, so add it first:

**Cloudflare dashboard → ugaplex.com → DNS → Records → Add record**

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| `CNAME` | `drops` | `lockdrop-e0z.pages.dev` | Proxied |

Then watch it attach:

```bash
npx wrangler pages project list
```

The certificate is issued automatically. DNS propagation usually takes a minute
or two; Pages then flips the domain to `active` on its own.

> A CNAME pointed at a Pages site *without* adding the domain in the Pages
> dashboard first will not resolve — that is the `522` case.

### Deploying by hand

```bash
npm run deploy
```

The Git integration rebuilds on every push to `main`, so a manual deploy is only
needed when you want to ship without pushing.

---

## Publishing the knowledge base

`kb/` holds the knowledge base: the LPI *Learning Material* for LPIC-1, the
FreeBSD Handbook, and a set of curated notes — all split into pieces, cleaned
into markdown, and given YAML front matter so they can be ingested by an AI
index or a RAG pipeline.

| Path | Source | Pieces |
| --- | --- | --- |
| `kb/linux/` | LPI *Learning Material* for LPIC-1 (exam 010-160) | 10 |
| `kb/freebsd/` | The *FreeBSD Handbook*, split by chapter | 35 |
| `kb/notes/` | Curated reference notes | 3 |

**48 pieces, 331,000 words.** Every piece has YAML front matter, the exercise
answers are kept, and the source text is preserved — the conversion re-flows
the prose into markdown, it does not summarise it. `npm run check` validates
the front matter, the manifest and the absence of table-of-contents furniture.

The ten Linux pieces follow the exam structure, two objectives each:

| Piece | Title | Objectives |
| --- | --- | --- |
| `linux-01` | Linux Origins and the Open Source Application Landscape | 1.1, 1.2 |
| `linux-02` | Open Source Licensing, ICT Skills and Working in Linux | 1.3, 1.4 |
| `linux-03` | Command Line Basics and Getting Help | 2.1, 2.2 |
| `linux-04` | Directories, Listing Files and Creating, Moving and Deleting Files | 2.3, 2.4 |
| `linux-05` | Archiving Files and Searching and Extracting Data | 3.1, 3.2 |
| `linux-06` | Turning Commands into Scripts and Choosing an Operating System | 3.3, 4.1 |
| `linux-07` | Understanding Computer Hardware and Where Data Is Stored | 4.2, 4.3 |
| `linux-08` | Your Computer on the Network and Basic Security | 4.4, 5.1 |
| `linux-09` | Creating Users and Groups, and Managing Permissions and Ownership | 5.2, 5.3 |
| `linux-10` | Special Directories and Files | 5.4 |

### Publishing

1. **Upload to Drive.** Put each piece somewhere readable on Google Drive.
2. **Record the links.** Paste them into `kb/drive-links.json`, keyed by the
   piece id:

   ```json
   {
     "linux-01": "https://drive.google.com/drive/folders/1AbCdEf...",
     "linux-02": "https://drive.google.com/file/d/1XyZ.../view"
   }
   ```

3. **Publish.**

   ```bash
   node scripts/publish-kb.mjs --api https://drops.ugaplex.com --mode free_ad
   node scripts/publish-kb.mjs --mode paid_ad --price 1.5
   node scripts/publish-kb.mjs --only linux-01 --dry-run
   ```

Every link goes through the same verification engine as a user-created drop,
so a Drive link that needs a sign-in is reported as a Caution rather than
published silently.

---

## Environment

There are two tiers and they never mix.

**Cloudflare secrets** — read by the Functions, never sent to a browser:
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `LOCKDROP_MASTER_KEY`, `ADMIN_TOKEN`, and
optionally `OPENROUTER_API_KEY`.

**Public values** — read by the browser through `GET /api/config`: `ESCROW_ADDRESS`,
`ADSGRAM_BLOCK_ID`, `MONETAG_DIRECT_LINK`.

**The Turso read token** — a third kind, and the only credential that is intentionally
public. It lives in `public/turso.json` and is scoped by Turso to `data_read` on the
`drops` table alone:

```bash
turso db tokens create lockdrop -p drops:data_read -e never
```

It cannot write, and it cannot read `drop_secrets` where the sealed URLs are. Rotate
it with `turso db tokens invalidate lockdrop`, then update the file and push.

There is no `VITE_` prefix any more. There is no bundler to inline anything, and
nothing secret is ever in the client except that read-only token.

---

## The escrow contract

`contracts/PolygonEscrow.sol` is a minimal, non-custodial payment splitter with **two
fee tiers**:

| Tier | Fee | Seller receives |
| --- | --- | --- |
| `Standard` | 3% | 97% |
| `Premium` | 5% | 95% |

The tier is an **enum**, never a basis-point number, so a caller can only pick one of
the two tiers the platform offers — it can never choose an arbitrary fee.

- `payNative(bytes32 dropId, address seller, Tier tier)` — splits the incoming POL.
- `payToken(bytes32 dropId, address token, uint256 amount, address seller, Tier tier)`
  — pulls an ERC-20 with `safeTransferFrom` and splits the **actually received**
  balance, so fee-on-transfer tokens cannot drain the escrow.
- The seller share is computed by subtraction, so no wei is ever stranded.
- `nonReentrant` on both entry points.
- Emits `Paid(dropId, buyer, seller, token, amount, feeBps)` for off-chain verification.

### Which tier a drop is sold at

The unlock mode decides:

| Unlock mode | Tier | Fee | Why |
| --- | --- | --- | --- |
| `paid_ad` | Standard | 3% | the buyer may unlock with a sponsored task instead of paying |
| `paid_pure` | Premium | 5% | no sponsored task is offered, so the buyer pays more |
| `free_ad` | — | — | no payment at all |

The **server** verifies that the `Paid` event reports exactly the tier the drop was
sold at. A standard-tier payment on a premium drop is refused, so a tampered client
cannot buy an ad-free drop at the cheaper rate.

### Toolchain

The contract is compiled, tested and deployed with [Hardhat 3](https://hardhat.org).
It is a development-time toolchain only — it never reaches the Pages build.

```bash
npm run contract:build    # compile + refresh contracts/artifacts/PolygonEscrow.json
npm run contract:test     # 10 contract tests on a local EVM
npm run contract:deploy:amoy     # deploy to Polygon Amoy
npm run contract:deploy:polygon  # deploy to Polygon PoS
```

Deployment needs:

```bash
export AMOY_RPC_URL=https://rpc-amoy.polygon.technology
export AMOY_DEPLOYER_PRIVATE_KEY=0x…
export PLATFORM_WALLET=0x…       # receives the platform fee
export POLYGONSCAN_API_KEY=…     # optional, for source verification
```

The script deploys, reads the fee tiers back from the deployed bytecode to prove
they are what you expect, and submits the source for verification on the explorer.

> **The contract changed.** The old `payNative(bytes32,address)` /
> `payToken(bytes32,address,uint256,address)` signatures are gone. A previously
> deployed escrow **cannot** be used with this app — redeploy, then set
> `ESCROW_ADDRESS` to the new address.

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
| `npm test` | 39 unit tests — the verification engine and the payment verifier |
| `npm run contract:test` | 10 contract tests on a local EVM |
| `npm run check` | ABI, contract artifact, categories, frontend graph, Turso read path |
| `npm run lint` | Parses every JavaScript file with Node's own parser |
| `npm run contract:build` | Compile the contract and refresh the artifact |
| `npm run contract:deploy:amoy` | Deploy to Polygon Amoy |
| `npm run contract:deploy:polygon` | Deploy to Polygon PoS |
| `npm run deploy` | `wrangler pages deploy public` |
| `npm run schema` | Apply `schema.sql` to the remote database |
| `npm run kb:publish` | Publish the knowledge base as drops |

### How the three layers stay in sync

The contract, the browser's ABI encoder and the server's payment verifier are written
by hand in three different runtimes. `npm run check` derives the selectors and the
event topic from the **compiled ABI** and compares them against the constants the app
actually uses, so a contract change cannot silently break the other two:

```
ok    contract artifact matches contracts/PolygonEscrow.sol
ok    payNative(bytes32,address,uint8) -> 0x088af277 (matches wallet.js)
ok    payToken(bytes32,address,uint256,address,uint8) -> 0x8bf27d62 (matches wallet.js)
ok    Paid event topic matches functions/_lib/polygon.ts
ok    fee tiers match: standard 300 bps, premium 500 bps
```

---

## Known limitations

Honest list, in priority order.

1. **The sponsored-task gate is soft.** Without Adsgram's server-side verification,
   the ad unlock is a timed server-side release, not proof that an ad was watched. The
   paid path is unaffected — it is cryptographically verified.
2. **A buyer cannot dispute.** There is no refund or dispute window yet.
3. **No pagination in the UI.** The API supports a cursor; the feed loads 40 at a
   time with a "Load more" button.
4. **Domain-age and reputation checks are not implemented.** The engine judges URL
   shape, brand imitation and live page content — not how old a domain is.
5. **The rate limiter is per-isolate.** It is a speed bump against casual abuse, not
   a distributed limit. The real boundary is the on-chain payment check.
6. **The AI is advisory.** It can escalate a verdict but never relax one, and its
   "reason" text is shown to buyers — a hallucinated reason could mislead. The
   heuristics always run first and dominate.
7. **The fee tiers are fixed at two.** The contract's `Tier` enum would need a
   redeployment to add more.
8. **The escrow is not upgradeable.** It is deliberately minimal and non-custodial;
   there is no owner, no pause switch and no admin function. Changing anything means
   a new deployment and a new `ESCROW_ADDRESS`.
9. **The read token is public.** It is scoped to `data_read` on one table and the
   data in it is public drop metadata, but it does mean anyone can read the whole
   feed at full speed. If that matters, put the feed behind a Cloudflare cache or a
   rate-limited route and keep the token server-side.
10. **There is no type checker.** The project is plain JavaScript by design, so
   `npm run lint` parses the files rather than type-checking them. The drift that a
   type checker would catch is covered by `npm run check` instead, which asserts the
   contract, the browser encoder and the server verifier all agree.

---

## Roadmap

- [ ] Seller payout tracking and a dispute / refund window
- [ ] Domain age and registrar checks via the RDAP/WHOIS endpoints
- [ ] Feed search and sorting, and infinite scroll
- [ ] Rate limiting backed by Cloudflare KV instead of isolate memory
- [ ] Optional buyer identity (Telegram id) attached to an unlock
- [ ] Self-service deploy from GitHub Actions with a Cloudflare API token
- [ ] A second fee tier between standard and premium, if the market wants one

---

## Licence

MIT — see [LICENSE](LICENSE).
