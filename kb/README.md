---
id: readme-kb
title: "LockDrop Knowledge Base"
slug: readme-kb
source: "Knowledge base index"
sourceSection: "kb"
topic: "index"
tags: [knowledge-base, index, publishing, rag]
summary: "What this knowledge base is, how it is laid out, the front-matter schema every piece uses and how each piece is published as a drop."
---
# The LockDrop Knowledge Base

This directory holds the source material for the knowledge base that the
LockDrop drops point at. Everything here is plain markdown with YAML front
matter, so the same files can be read by a human, fed to an AI index or a RAG
pipeline, or uploaded as-is.

Three paths, three different jobs:

| Path | What it is | Pieces |
| --- | --- | --- |
| [linux/](linux/README.md) | The LPI *Learning Material* for LPIC-1 (exam 010-160), split by exam objective. | 10 |
| [freebsd/](freebsd/README.md) | The *FreeBSD Handbook*, split by chapter. | 35 |
| [notes/](notes/README.md) | Short curated reference notes. | 3 |

`manifest.json` is the machine-readable index of the 48 publishable pieces —
the per-path index READMEs are not in it, because they are indexes rather than
drops. `drive-links.json` holds the Google Drive link for each piece; it is
committed as an empty scaffold and filled in by hand after the upload.
`kb/README.md`, this file, is the top-level index of the whole knowledge base
and is not itself a piece.

## Source material and licences

| Path | Source | Terms |
| --- | --- | --- |
| `linux/` | Linux Professional Institute, *Learning Material for Linux Professional Institute Certification — Level 1 (Exam 010-160)* | Published by the LPI for free use and redistribution. Attribution to the LPI is required — check the current terms at lpi.org before republishing this material. |
| `freebsd/` | The FreeBSD Project, *FreeBSD Handbook* | Published under the FreeBSD documentation licence. Free to redistribute with the copyright notice intact. |
| `notes/` | Written for this repository | Same licence as the rest of LockDrop (MIT). |

The pieces are conversions: the text is the source material, re-flowed into
markdown, with the headings, lists and code blocks reconstructed. Nothing has
been rewritten or summarised away.

---

## Directory layout

```
kb/
├── README.md                 this file
├── manifest.json             index of every piece, used by the publish script
├── drive-links.json          piece id -> Google Drive link (filled in by hand)
├── linux/                    the LPIC-1 path
│   ├── README.md             study order and what each piece covers
│   └── 01-…10-*.md           ten pieces
├── freebsd/                  the FreeBSD Handbook path
│   ├── README.md             study order, part map, and what was excluded
│   └── 01-…35-*.md           thirty-five pieces
└── notes/                    the curated notes
    ├── README.md             one-line index of the three notes
    ├── core-basics.md
    ├── freebsd-basics.md
    └── pkg-managers.md
```

Files are named `NN-<slug>.md`, where `NN` is a zero-padded sequence that runs
from `01` to the end of the path, and `<slug>` is a short kebab-case name.

## Front matter

Every markdown file in the knowledge base opens with the same YAML front
matter. This is the schema the rest of the pipeline expects:

```yaml
---
id: freebsd-07
title: "Network"
slug: freebsd-07-network
source: "FreeBSD Handbook"
sourceSection: "Chapter 7 — Network"
topic: "I"
tags: [freebsd, unix, networking, dns, wireless]
summary: "Basic wired and wireless networking on FreeBSD: hostnames, DNS, DHCP, IPv6 and how to troubleshoot a connection."
---
```

| Field | Meaning |
| --- | --- |
| `id` | Stable identifier for the piece. `linux-01`, `freebsd-07`, `note-core-basics`. Also the key used in `drive-links.json`. |
| `title` | Human title. This is the title the published drop gets. |
| `slug` | URL-safe name for the piece. |
| `source` | The work the piece was taken from. |
| `sourceSection` | The section of that work — exam objectives for the Linux path, a chapter number for the FreeBSD path, the originating filename for the notes. |
| `topic` | The grouping the piece belongs to: an exam topic number, a part of the handbook, or a subject. |
| `tags` | Free-form keywords for retrieval. |
| `summary` | One or two sentences, under 180 characters. Used as the drop's teaser. |

The body follows the front matter, starting at the first heading. The Linux
pieces use `#` for the top-level section and `##` for the objectives; the
FreeBSD pieces use `#` for the chapter and go one level deeper for each
section below it.

## How a piece maps back to its source

- **Linux pieces** come from the LPI *Learning Material* for LPIC-1. The
  `sourceSection` field lists the exam objectives the piece covers and
  `topic` lists the exam topic numbers, so a piece can be lined up against the
  objectives syllabus.
- **FreeBSD pieces** come from the *FreeBSD Handbook*. One piece per numbered
  chapter, named after the chapter, with `sourceSection` giving the chapter
  number and title and `topic` giving the roman numeral of the part. The
  book's own front matter — preface, edition history, organisation of the
  book, conventions and acknowledgments — is not part of any piece and is
  described in [freebsd/README.md](freebsd/README.md).
- **Notes** are distilled by hand. `sourceSection` names the file each note
  came from so it can be traced back.

## Publishing

Publishing is a two-step job: put the file somewhere readable, then point a
drop at it.

1. **Upload one Google Drive folder per piece.** Create a folder for the
   piece, upload the markdown file into it, and make the folder linkable.
   Record the folder link in `kb/drive-links.json`, keyed by the piece id:

   ```json
   {
     "linux-01": "https://drive.google.com/drive/folders/1AbCdEf...",
     "freebsd-07": "https://drive.google.com/drive/folders/1XyZ...",
     "note-core-basics": "https://drive.google.com/drive/folders/1QwErT..."
   }
   ```

2. **Publish one LockDrop drop per piece.** The publish script reads
   `manifest.json` for the titles and summaries, reads `drive-links.json` for
   the destinations, and creates a drop for every piece that has a link:

   ```bash
   node scripts/publish-kb.mjs --api https://lock.ugaplex.com --mode free_ad
   node scripts/publish-kb.mjs --mode paid_ad --price 1.5
   node scripts/publish-kb.mjs --only linux-01 --dry-run
   ```

   Any piece without a link in `drive-links.json` is skipped, so it is safe to
   publish a subset at a time — dry-run first, then fill in the links as the
   Drive folders go up.

Every piece is a `document` in the manifest, which is the category the drop
verification engine expects for a markdown file behind a Drive link. The three
per-path index READMEs are listed in the manifest too, so the manifest stays
a complete index of the content paths; add a Drive link for one of them only
if you want it published as a drop in its own right.
