---
id: note-pkg-managers
title: "Package Manager Comparison Across Linux, BSD and Windows"
slug: note-pkg-managers
source: "Curated notes"
sourceSection: "00-pkg-managers.md"
topic: "package management"
tags: [packaging, dnf, yum, rpm, apt, dpkg, pkg, windows]
summary: "Which package manager each platform ships, what the low-level tool underneath is, and the one-line version of each answer."
---
# Package Management Comparison

Quick recall:
- RHEL/CentOS/Fedora: `yum`, `dnf`, `rpm` (DNF is the default now)
- Debian/Ubuntu: `apt`, `dpkg`
- FreeBSD: `pkg`
- Windows: none (Chocolatey / PowerShell)

## Comparison Table

| Platform | Front-end command | Low-level tool | Notes |
| --- | --- | --- | --- |
| RHEL / CentOS / Fedora | `dnf` (default now), `yum` | `rpm` | DNF is the default on Fedora and RHEL 8+; `yum` is kept as a compatibility alias for `dnf`. `rpm` installs and verifies the `.rpm` files and maintains the RPM database. |
| Debian / Ubuntu | `apt`, `apt-get` | `dpkg` | `apt` for interactive use, `apt-get` for scripts. `dpkg` handles the underlying `.deb` database and local installs. |
| FreeBSD | `pkg` | — | Binary packages from the pkg repository; the Ports Collection is the build-from-source alternative. No `rpm`/`dpkg` base. |
| Windows | none built in | — | No native package manager; use `choco` (Chocolatey) or PowerShell (`Get-Package`, `Install-Package`). |

## Reading the Table
- **Front-end** = the command you type; it resolves dependencies and calls the low-level tool.
- **Low-level** = the tool that actually unpacks and installs the package files.
- On Linux there are two layers (`dnf`/`yum` over `rpm`, `apt` over `dpkg`); on FreeBSD there is one (`pkg`); on Windows there is none natively.
