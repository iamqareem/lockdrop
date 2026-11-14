# Knowledge base expansion plan

> Planning document. The knowledge base itself lives in `kb/`.

**Goal:** turn the 29 new PDFs in `datapad/docs/` into a second wave of
refined, publishable drops, organised so the library reads as a set of
learning paths rather than a pile of files.

---

## 1. The corpus

29 PDFs, **1,988,302 words**, ~7,900 pages, 94 MB. Plus the two sources already
processed (the FreeBSD Handbook and the LPI *Learning Material* 010-160) and
three curated notes.

| Source | Words | Notes |
| --- | ---: | --- |
| BIND 9 Administrator Reference | 330,117 | 994 pp reference manual |
| LPI Learning Material 101-500 | 143,668 | LPIC-1, new objectives |
| LPI Learning Material 102-500 | 142,627 | LPIC-1, new objectives |
| Eloquent JavaScript | 134,284 | |
| LPI Learning Material 701-200 | 131,810 | LPIC-1 |
| Linux From Scratch 12.2 | 99,183 | |
| The Book of PF, 3rd ed. | 92,767 | |
| LPI Learning Material 020-100 | 90,186 | LPIC-2 |
| LPI Learning Material 030-100 | 89,489 | LPIC-3 |
| LPI Learning Material 050-100 | 87,959 | LPIC-5, security |
| Arch Linux Handbook | 79,182 | |
| Beej's Guide to Python | 77,603 | |
| Beej's Guide to Network Programming | 67,549 | |
| Beej's Git Guide | 68,501 | |
| FreeBSD Developers' Handbook | 63,590 | |
| FreeBSD Mastery: Jails | 52,848 | |
| UNIX Programming FAQ | 49,819 | |
| NGINX Cookbook (2019) | 37,483 | |
| Pragmatic systemd | 37,243 | |
| Mastering JavaScript | 31,951 | |
| nginx — A Practical Guide (Corona) | 21,973 | |
| Introduction to Bash Scripting | 11,566 | |
| The Design and Implementation of 4.4BSD | 12,134 | |
| Lua (OSDC 2023) | 10,121 | |
| Compiling Code (OSDC 2023) | 8,732 | |
| Virtualization (OSDC 2023) | 7,944 | |
| SQLite Tutorial | 3,949 | |
| lec-19 — *SQLite and sqlite3*, Shawn Santo | 2,685 | Stanford lecture |
| Ubuntu Server CLI Cheat Sheet 2024 | 1,339 | 3 pp |

> `lec-19.pdf` is a Stanford *Statistical Computing & Programming* lecture on
> SQLite. It overlaps `sqlite_tutorial.pdf`; both land in the same track.

---

## 2. Target

| | Pieces |
| --- | ---: |
| Already built (LPI 010-160, FreeBSD Handbook, notes) | 48 |
| New, from the 29 PDFs | ~155 |
| **Total** | **~200** |

**Piece size: 12,000–18,000 words** — roughly 25–30 printed pages, about one
chapter of a technical book. That is a substantial, sellable unit of knowledge
and roughly one chapter for most of these books.

The 100-drop minimum is cleared with room to spare, but the count is a
*consequence* of the split rule, not a target to hit. Quality is the
constraint.

---

## 3. Phase A — Catalogue (read-only, no content written)

Build `kb/catalog.json` — one entry per source document:

```json
{
  "id": "lfs-12-2",
  "file": "LFS-12.2-SYSV-BOOK.pdf",
  "title": "Linux From Scratch 12.2",
  "author": "Gerard E. Lindsey",
  "pages": 384,
  "words": 99183,
  "sha256": "…",
  "attribution": "Free to redistribute with attribution.",
  "headingTree": [
    { "level": 1, "title": "Chapter 2. Preparing the Host System", "words": 6120, "children": [] }
  ],
  "plan": [ { "piece": "lfs-12-2-03", "sections": ["Chapter 3"], "words": 14980 } ]
}
```

This is the artifact to review **before** any prose is written. It shows
exactly where every cut lands, how many pieces each book yields, and where
the attribution comes from. If a book splits badly, the rule changes there and
now, not after 200 pieces exist.

Deliverable: `kb/catalog.json` + a human-readable `kb/catalog.md` summary
table.

---

## 4. Phase B — Extraction and splitting engine

`scripts/build-kb.mjs` — one deterministic pass per source:

1. **Extract** with `pdftotext`, page ranges preserved.
2. **Strip page furniture** — running headers ("Linux From Scratch - Version
   12.2" repeats on every page), footers, and page numbers. The page-number
   pass exploits the fact that they form an unbroken 1..N run, so no table
   cell is swallowed.
3. **Rejoin hard-wrapped prose.** These PDFs wrap at ~110 columns with no
   blank line between wrapped lines. A short line followed by a long one means
   the paragraph ended — that is the signal. Paragraphs broken by a page break
   are rejoined too.
4. **Rebuild the heading tree.** Each book has its own convention
   (`Chapter N.` for LFS and the FreeBSD books, `TOPIC n:` for the LPI
   material, `1.1`/`1.1.1` for BIND and the UNIX FAQ, and a dozen more). The
   rules are detected empirically in Phase A and stored in `kb/sources.json`,
   so the split is explicit and reviewable rather than guessed at runtime.
5. **Cut.** Walk the heading tree and take the largest unit that lands the
   piece inside the 12k–18k band. Never cut mid-section; if a section is
   larger than the band on its own, that section becomes its own piece.
6. **Emit** each piece as clean markdown with the same YAML front matter the
   existing pieces use.

Rejoining is the part that decides whether the output is readable, and it is
the part the FreeBSD conversion already proved is fiddly — page-break
paragraph splits are the common failure.

---

## 5. Phase C — Refinement

This is where "refined and perfect" is actually earned. Every piece gets:

- **A title that sells it in a feed card.** Not "Chapter 3" — something like
  *"Linux From Scratch 12.2 — Ch 3: Building a Partitioned System From
  Scratch"*. The source is named so it reads as the real thing it is, and the
  section is named so it is findable.
- **A summary under 180 characters** that says what the buyer gets. The feed
  card clamps it to three lines, so it has to land in the first sentence.
- **Tags** for search, drawn from the material's own vocabulary.
- **Category** — `gdrive` for every piece, because that is where it is
  hosted.
- **Attribution** carried in the front matter and surfaced in the piece.

Per-book rules for titles and summaries are written once and applied to every
piece in that book, so a reader who unlocks two BIND drops recognises them as
the same series.

---

## 6. Phase D — Organisation

The library is organised two ways at once, because buyers want both.

**By source** — mirrors the Drive structure, one folder per document:

```
kb/
  books/
    lfs-12-2/                 01-…08-….md
    lpi-101-500/              01-…11-….md
    bind9/                    01-…25-….md
    …
  notes/                      the three curated notes
  tracks/                     curated learning paths
  catalog.json                Phase A output
  manifest.json               every publishable piece
  drive-links.json            piece id → Google Drive link
```

**By track** — curated paths that cross sources. These are what a feed
reader follows, and what an ad or a Telegram post should point at:

| Track | Pulls from |
| --- | --- |
| Linux Engineer | LFS, LPI 101/102/701/020/030, Arch, Bash, systemd |
| Systems & the Kernel | 4.4BSD design, UNIX Programming, Compiling Code, Virtualization |
| BSD Internals | FreeBSD Handbook, Developers' Handbook, Jails |
| Networking & DNS | BIND 9, Beej's Network Programming, The Book of PF |
| Web Performance | NGINX Cookbook, nginx — A Practical Guide |
| JavaScript | Eloquent JavaScript, Mastering JavaScript |
| Data & Scripting | SQLite Tutorial, lec-19, Beej's Python, Lua |
| Git & Ops | Beej's Git Guide, Ubuntu Server CLI Cheat Sheet |

Each track is a markdown file listing its pieces in order with a one-line
"what you will be able to do by the end" — a drop per track becomes a
bundle offer later.

`kb/README.md` is rebuilt as a double index: by track and by source.

---

## 7. Phase E — Publish

1. `kb/drive-links.json` is regenerated with a slot for every piece.
2. You upload the `kb/` tree to Drive — the directory structure mirrors it,
   so the upload is a straight drag-and-drop of one folder.
3. `npm run kb:publish` creates the drops: title, summary, category `gdrive`,
   unlock mode and price per the decision below.

Each drop is verified by the same engine as a user-created drop. Drive
**folder** links did not match the Google Drive path rules and would have been
flagged `Caution` — that is fixed, so folder links now verify as `Trusted`.

---

## 8. Decisions needed before Phase B

1. **Pricing.** Free (`free_ad`) for all of them to build traffic, paid, or a
   mix — free for the LPI and handbook material, paid for the premium tracks
   (NGINX performance, BIND, Eloquent JavaScript)? The feed card shows the
   price, so it is a visible positioning decision.
2. **Do you want all 29 sources?** All of them is ~200 drops; a curated ~120
   is easier to keep refined. The three overlapping LPI LPIC-1 documents
   (010-160, 101-500, 102-500, 701-200) cover the same exam at different
   revisions — worth keeping all four as a series, or trimming to the
   current objectives?
3. **Drive layout** — mirror `kb/books/<slug>/` exactly (one folder per
   source document), or one folder per piece?
4. **Naming.** The plan keeps `LockDrop` as the product and `lock.ugaplex.com`
   as the domain.

---

## 9. What is already done

- The 48 existing pieces are built, checked and committed.
- `scripts/check-kb.mjs` validates front matter, the manifest, TOC furniture
  and the Drive scaffold, and runs as part of `npm run check`.
- `scripts/publish-kb.mjs` turns `drive-links.json` into drops and already
  dry-runs cleanly against the current manifest.
- The Google Drive folder-link gap in the category rules is fixed and tested.
