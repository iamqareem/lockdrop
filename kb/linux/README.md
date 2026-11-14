---
id: readme-linux
title: "Linux Path — LPIC-1 Study Guide"
slug: readme-linux
source: "Knowledge base index"
sourceSection: "kb/linux"
topic: "study order"
tags: [linux, lpic-1, study-guide, index]
summary: "How to work through the ten Linux pieces in order, what each one covers and where it came from."
---
# The Linux Path

Ten pieces, cut from the **LPI Learning Material for LPIC-1** (exam 010-160),
the official Linux Essentials study material published by the Linux Professional
Institute. Each piece keeps the exam objectives it came from in its
`sourceSection` field, so you can line the pieces up against the objectives
syllabus as you revise.

The material is derived from the LPI *Learning Material* for LPIC-1 — it is
not the Linux kernel documentation and it is not a substitute for the exam
objectives themselves.

## Study order

Work through the pieces in numeric order. They follow the exam objectives
top-to-bottom, so each one only assumes what the previous pieces introduced.
Topics 1 and 2 are background; topics 3 to 5 are the hands-on core that the
practical questions are drawn from.

| # | Piece | Exam objectives | What you should be able to do afterwards |
| --- | --- | --- | --- |
| 01 | [Linux Origins and the Open Source Application Landscape](01-linux-origins-and-open-source.md) | 1.1, 1.2 | Place Linux in the wider operating-system landscape: how it came about, which distributions exist, and what runs on it. |
| 02 | [Open Source Licensing, ICT Skills and Working in Linux](02-open-source-licensing-and-ict-skills.md) | 1.3, 1.4 | Tell free from open source, name the licences that govern reuse, and describe the skills an open source professional needs on the job. |
| 03 | [Command Line Basics and Getting Help](03-command-line-basics-and-help.md) | 2.1, 2.2 | Read a shell command, use variables and quoting, and find help for any command you meet. |
| 04 | [Directories, Listing Files and Creating, Moving and Deleting Files](04-directories-listing-and-file-manipulation.md) | 2.3, 2.4 | Move around the filesystem with `ls` and `cd`, then create, rename, move, copy and delete files and directories. |
| 05 | [Archiving Files and Searching and Extracting Data](05-archiving-and-searching-data.md) | 3.1, 3.2 | Compress and archive data, redirect and pipe command output, and search with `grep` and regular expressions. |
| 06 | [Turning Commands into Scripts and Choosing an Operating System](06-scripts-and-choosing-an-operating-system.md) | 3.3, 4.1 | Turn a command line into an executable script with arguments and exit codes, and weigh the operating system choices open to you. |
| 07 | [Understanding Computer Hardware and Where Data Is Stored](07-hardware-and-where-data-is-stored.md) | 4.2, 4.3 | Describe power supplies, boards, memory, processors and storage, and explain the kernel, device files, processes and system logging. |
| 08 | [Your Computer on the Network and Basic Security](08-networking-and-basic-security.md) | 4.4, 5.1 | Follow IPv4, IPv6 and DNS across the wire, then explain the account types and privilege model that keep a system safe. |
| 09 | [Creating Users and Groups, and Managing Permissions and Ownership](09-users-groups-and-file-permissions.md) | 5.2, 5.3 | Create accounts and groups with the `passwd` family of tools, and control access with symbolic and numeric permission modes. |
| 10 | [Special Directories and Files](10-special-directories-and-files.md) | 5.4 | Handle temporary directories, hidden files, hard links and symbolic links — the special places a filesystem uses to keep itself tidy. |

## Where the pieces came from

Every piece carries the same front matter as the rest of the knowledge base:

```yaml
source: "LPI Learning Material 010-160"
sourceSection: "1.1, 1.2"
topic: "1"
```

`sourceSection` lists the exam objectives the piece covers, and `topic` lists
the exam topic numbers it belongs to. Together they tell you exactly which
syllabus line each piece answers.

## Related paths

- [The FreeBSD path](../freebsd/README.md) — the FreeBSD Handbook, split by chapter.
- [The curated notes](../notes/README.md) — short, dense reference notes.
