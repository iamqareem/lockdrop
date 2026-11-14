---
id: note-freebsd-basics
title: "FreeBSD Basics and How It Differs from Linux"
slug: note-freebsd-basics
source: "Curated notes"
sourceSection: "00-freebsd-basics.md"
topic: "freebsd fundamentals"
tags: [freebsd, unix, pkg, ports, pf, networking]
summary: "What FreeBSD is, how it differs from Linux, how to install software with pkg and ports, and which firewall it actually ships."
---
# FreeBSD Basics — Curated Ground Truth

> Short, verified notes. This file is RAG-prioritized (`00-` prefix). Keep facts concise for fast retrieval.

## What is FreeBSD?
- **FreeBSD** is a free and open-source Unix-like OS descended from **Berkeley Software Distribution (BSD)**, first released **1993**. Not created by Richard Stallman, not part of GNU.
- Family: BSD family (FreeBSD, OpenBSD, NetBSD) — distinct from Linux.
- Use: servers, networking appliances, desktops, embedded. Known for `ZFS`, `jails`, `pf` firewall, Ports collection.

## FreeBSD vs Linux — Don't Confuse
- FreeBSD uses `pkg` / ports, not `apt`/`apt-get`/`yum`.
- Init/rc: `/etc/rc.conf` and `service <name> start`, not `systemd`.
- Base system is a cohesive whole (kernel + userland), not a kernel + distro.

## Installing Software on FreeBSD
### pkg (binary packages) — preferred daily
```sh
pkg update
pkg search nginx
pkg install nginx
pkg info          # list installed
pkg delete nginx
```
### Ports (build from source)
```sh
cd /usr/ports/www/nginx && make install clean
# or: portsnap fetch extract (older), now: git in /usr/ports
```
- Never `apt-get`, `dpkg -l`, or `apt-cache search` on FreeBSD.

## Main Network Utilities on FreeBSD
- `ifconfig` — interfaces
- `netstat` / `sockstat` — sockets, routing
- `ping` / `traceroute` / `tcpdump` — diagnostics
- `host` / `dig` / `drill` — DNS
- `ssh` / `scp` — secure remote login/copy (OpenSSH)
- Avoid: `rsh`/`telnet` (insecure, deprecated), `sshd`/`rshd` are daemons not user utils.

## Firewall / Packet Filter
- **PF (Packet Filter)** was created for **OpenBSD** and ported to FreeBSD. **OpenBSD ships PF by default**; FreeBSD includes it as a selectable firewall.
- FreeBSD offers 3 firewalls: **`pf` (`/etc/pf.conf`, `pfctl`)**, **`ipfw`**, **`ipfilter`**.
- **Main today is `pf`** for most deployments.
```sh
# pf basics
pfctl -e              # enable
pfctl -f /etc/pf.conf # load rules
pfctl -sr             # show rules
```
- Not `ipchains` (Linux 2.2), not `iptables`/`nft` (Linux), not `PAM/interfaces`, not `ijqwf-firewall`. `ipchains`/`iptables` never ship on FreeBSD base.

## Common Correction
Q: What OS ships with Packet Filter? A: **OpenBSD** (origin). FreeBSD also ships PF as an option.

Q: Main firewall on FreeBSD? A: **pf** (and `ipfw` as alternative). Answer `ipchains` is always wrong on FreeBSD.
