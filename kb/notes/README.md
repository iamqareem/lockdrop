---
id: readme-notes
title: "Curated Notes"
slug: readme-notes
source: "Knowledge base index"
sourceSection: "kb/notes"
topic: "reference"
tags: [notes, reference, cheatsheet, index]
summary: "Three short, high-density reference notes covering permissions and licensing, FreeBSD fundamentals and package managers."
---
# The Curated Notes

Three short notes, written to be retrieved rather than read end to end. Each
one is deliberately dense: every sentence is a fact that is easy to get wrong,
and the wording is exact so that a retrieval pipeline can quote it.

| Note | Covers |
| --- | --- |
| [core-basics.md](core-basics.md) | `chmod` in both numeric and symbolic form, the BSD-versus-GPL licence split with worked examples, what `chmod` can and cannot do without root, and a one-sentence anchor for cloud computing. |
| [freebsd-basics.md](freebsd-basics.md) | What FreeBSD is and where it came from, how it differs from Linux, installing software with `pkg` and ports, the network utilities worth knowing, and which firewall FreeBSD actually ships. |
| [pkg-managers.md](pkg-managers.md) | A side-by-side comparison of the package manager each platform ships — `dnf`/`yum` over `rpm`, `apt` over `dpkg`, `pkg`, and nothing on Windows — with the low-level tool under each front-end. |

## How these differ from the other paths

The [Linux path](../linux/README.md) and the [FreeBSD path](../freebsd/README.md)
are textbook material: long, complete and ordered. The notes are the opposite.
They are short, they are hand-checked, and they exist to answer the questions
that the textbook answers slowly or ambiguously — *which OS ships Packet
Filter?*, *can I `chmod` a file I do not own?*, *is BSD copyleft?*

Each note starts with a short blockquote saying how it should be used. Keep
that in mind when quoting it: these are written for retrieval, and the
corrections they contain are the point.

## Where the notes came from

The notes carry the same front matter as the rest of the knowledge base:

```yaml
source: "Curated notes"
sourceSection: "00-core-basics.md"
topic: "permissions and licensing"
```

`sourceSection` names the file the note was distilled from, so a note can
always be traced back to the material it summarises.
