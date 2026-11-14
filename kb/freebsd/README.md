---
id: readme-freebsd
title: "FreeBSD Path — The Handbook, Chapter by Chapter"
slug: readme-freebsd
source: "Knowledge base index"
sourceSection: "kb/freebsd"
topic: "study order"
tags: [freebsd, unix, handbook, index]
summary: "How the FreeBSD Handbook is split into thirty-five pieces, which part of the book each one covers and what was left out."
---
# The FreeBSD Path

Thirty-five pieces cut from the **FreeBSD Handbook** — the reference book for
FreeBSD 14.2-RELEASE and 13.4-RELEASE that ships with the documentation
project. The book is organised into five parts and thirty-four numbered
chapters; each chapter became one piece, and the appendices and back matter
became the thirty-fifth.

The source is a plain-text export of the rendered handbook, so the conversion
had to undo a fair amount of layout damage: the table of contents was a block
of dot-leader lines, the body was hard-wrapped at about 110 columns with no
blank lines between paragraphs, page numbers and figure glyphs were interleaved
with the prose, and HTML tables had been flattened to one cell per line. All of
that was cleaned up here; the prose itself was left alone.

## Study order

Read the pieces in numeric order. The book is written to be read front to back
in Part I, and out of order afterwards, so the table below follows the book's
own structure.

### Part I — Getting Started

| # | Piece | Covers |
| --- | --- | --- |
| 01 | [Introduction](01-introduction.md) | What FreeBSD is, the history and goals of the project, and its open source development model. |
| 02 | [Installing FreeBSD](02-installing-freebsd.md) | The whole `bsdinstall` run: media, disk layout, firmware, networking, users, time zone and hardening. |
| 03 | [FreeBSD Basics](03-freebsd-basics.md) | Consoles, users and groups, permissions, the directory tree, disk organisation, processes, daemons and shells. |
| 04 | [Installing Applications: Packages and Ports](04-packages-and-ports.md) | Binary packages with `pkg` and building from the Ports Collection. |
| 05 | [The X Window System](05-the-x-window-system.md) | Installing and configuring X11/Xorg, including syncing, `startx` and a first desktop. |
| 06 | [Wayland on FreeBSD](06-wayland-on-freebsd.md) | Running Wayland with the Wayfire, Hikari and Sway compositors. |
| 07 | [Network](07-network.md) | Hostnames, DNS, DHCP, IPv6, wired and wireless adapters, and troubleshooting a connection. |

### Part II — Common Tasks

| # | Piece | Covers |
| --- | --- | --- |
| 08 | [Desktop Environments](08-desktop-environments.md) | KDE Plasma, GNOME, Xfce, MATE, Cinnamon and LXQt, plus the usual desktop applications. |
| 09 | [Multimedia](09-multimedia.md) | Sound cards and mixers, audio and video players, conferencing, and image scanners. |
| 10 | [Configuring the FreeBSD Kernel](10-configuring-the-freebsd-kernel.md) | When to build a custom kernel, what the configuration file controls, and tuning the running kernel. |
| 11 | [Printing](11-printing.md) | The print spool, the printcap database, filters and accounting. |
| 12 | [Linux Binary Compatibility](12-linux-binary-compatibility.md) | Running Linux binaries on FreeBSD through the Linux compatibility layer. |
| 13 | [WINE](13-wine.md) | Running Windows applications on FreeBSD, installing WINE and driving it with `winecfg`. |

### Part III — System Administration

| # | Piece | Covers |
| --- | --- | --- |
| 14 | [Configuration, Services, Logging and Power Management](14-configuration-services-and-power.md) | Configuration files, `rc.conf`, services, cron and periodic, syslog, swap and power management. |
| 15 | [The FreeBSD Booting Process](15-the-freebsd-booting-process.md) | The loader, the kernel and `init`, the boot menu, and taking control of the process. |
| 16 | [Security](16-security.md) | Accounts and password hashes, `sudo`/`doas`, OpenSSH and OpenSSL, IDS, secure levels, file flags and Capsicum. |
| 17 | [Jails and Containers](17-jails-and-containers.md) | Thick, thin, VNET and Linux jails, networking, jail configuration files and jail managers. |
| 18 | [Mandatory Access Control](18-mandatory-access-control.md) | The MAC framework, the available policies and how labels protect sensitive data. |
| 19 | [Security Event Auditing](19-security-event-auditing.md) | Installing and configuring the audit trail, and reviewing the results. |
| 20 | [Storage](20-storage.md) | Disks, RAID, optical and tape media, memory-backed disks, network filesystems and backups. |
| 21 | [GEOM: Modular Disk Transformation Framework](21-geom-disk-transformation-framework.md) | Providers, consumers, labels and the software RAID levels GEOM can build. |
| 22 | [The Z File System (ZFS)](22-the-z-file-system-zfs.md) | Pools, datasets, snapshots, quotas, scrubs, boot environments and the command reference. |
| 23 | [Other File Systems](23-other-file-systems.md) | ext2/ext3/ext4, FAT, NTFS, CD9660, FUSE and how to mount them. |
| 24 | [Virtualization](24-virtualization.md) | bhyve, QEMU and Xen, and the bhyve management tools. |
| 25 | [Localization: i18n and L10n Usage and Setup](25-localization-i18n-l10n.md) | Locale classes, UTF-8, fonts, input methods and translated messages. |
| 26 | [Updating and Upgrading FreeBSD](26-updating-and-upgrading-freebsd.md) | FreeBSD-STABLE vs FreeBSD-CURRENT, `freebsd-update`, and source and binary upgrades. |
| 27 | [DTrace](27-dtrace.md) | Enabling dynamic tracing, writing scripts, and using DTrace to find performance problems. |
| 28 | [USB Device Mode and USB OTG](28-usb-device-mode-and-otg.md) | Turning a system into a USB device, and USB On-The-Go. |

### Part IV — Network Communication

| # | Piece | Covers |
| --- | --- | --- |
| 29 | [Serial Communications](29-serial-communications.md) | The `uart` driver, configuration files, modems and troubleshooting. |
| 30 | [PPP](30-ppp.md) | Connecting to remote systems over PPP, with dial-up and point-to-point links. |
| 31 | [Electronic Mail](31-electronic-mail.md) | The components of an MTA, Postfix and Sendmail, and how the pieces fit together. |
| 32 | [Network Servers](32-network-servers.md) | Apache, ftpd, Samba, NFS, DNS, NIS and time servers. |
| 33 | [Firewalls](33-firewalls.md) | pf, IPFW and IPFilter: rulesets, NAT, tables, logging and the verification engine. |
| 34 | [Advanced Networking](34-advanced-networking.md) | Routing, wireless, Bluetooth, ATM, IPv6, VLANs, carrier-grade NAT and tunnelling. |

### Part V — Appendices

| # | Piece | Covers |
| --- | --- | --- |
| 35 | [Appendices and Back Matter](35-appendices-and-back-matter.md) | Where to get FreeBSD, the bibliography, community resources, the officers' OpenPGP keys, the glossary and the colophon. |

## What is *not* in these pieces

The book's own front matter is deliberately left out of the numbered pieces,
because it is about the book rather than about FreeBSD. It is not lost — it
simply does not belong to any single chapter:

- **Preface** — intended audience, and the change log for the fourth, third,
  second and first editions.
- **Organization of This Book** — how the handbook is divided into parts, and
  a one-line description of every chapter.
- **Conventions used in this book** — typographic conventions, how user input
  is shown, and the meaning of the `C:\>`, `#` and `%` example prompts.
- **Acknowledgments** — the credits for the hundreds of people who wrote and
  revised the text.

The table of contents was also excluded, along with the page numbers, running
headers and figure placeholders that the plain-text export interleaved with
the body text.

## Where the pieces came from

Every piece carries the same front matter as the rest of the knowledge base:

```yaml
source: "FreeBSD Handbook"
sourceSection: "Chapter 7 — Network"
topic: "I"
```

`sourceSection` names the chapter the piece was cut from, and `topic` holds the
roman numeral of the part that chapter belongs to — `I` Getting Started,
`II` Common Tasks, `III` System Administration, `IV` Network Communication,
`V` Appendices.

## Related paths

- [The Linux path](../linux/README.md) — LPIC-1 study material, split by objective.
- [The curated notes](../notes/README.md) — short, dense reference notes.
