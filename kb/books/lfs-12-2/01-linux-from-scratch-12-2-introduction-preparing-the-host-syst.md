---
id: lfs-12-2-01
title: "Linux From Scratch 12.2 — Introduction, Preparing the Host System, Packages and Patches…"
slug: lfs-12-2-01-linux-from-scratch-12-2-introduction-preparing-the-host-syst
source: "Linux From Scratch 12.2"
sourceSection: "Chapter 1. Introduction, Chapter 2. Preparing the Host System, Chapter 3. Packages and Patches, Chapter 4. Final Preparations, 3. For each package:, Chapter 5. Compiling a Cross-Toolchain, Chapter 6. Cross Compiling Temporary Tools, Chapter 7. Entering Chroot and Building Additional"
track: linux-engineer
tier: free
tags: [linux, lfs, from-scratch, compilation, sysadmin]
summary: "The LFS system will be built by using an already installed Linux distribution (such as Debian, OpenMandriva, Fedora, Covers 8 sections: Introduction, Preparing the Host System, Packages and Patches."
---
# Linux From Scratch 12.2 — Introduction, Preparing the Host System, Packages and Patches…

## Chapter 1. Introduction
### 1.1 How to Build an LFS System
The LFS system will be built by using an already installed Linux distribution (such as Debian, OpenMandriva, Fedora,
or openSUSE). This existing Linux system (the host) will be used as a starting point to provide necessary programs,
including a compiler, linker, and shell, to build the new system. Select the “development” option during the distribution
installation to include these tools.

There are many ways to install a Linux distribution and the defaults are usually not optimal for building an
LFS system. For suggestions on setting up a commercial distribution see: https://www.linuxfromscratch.org/
hints/downloads/files/partitioning-for-lfs.txt.
As an alternative to installing a separate distribution on your machine, you may wish to use a LiveCD from a commercial
distribution.
Chapter 2 of this book describes how to create a new Linux native partition and file system, where the new LFS
system will be compiled and installed. Chapter 3 explains which packages and patches must be downloaded to build
an LFS system, and how to store them on the new file system. Chapter 4 discusses the setup of an appropriate working
environment. Please read Chapter 4 carefully as it explains several important issues you should be aware of before you
begin to work your way through Chapter 5 and beyond.
Chapter 5 explains the installation of the initial tool chain, (binutils, gcc, and glibc) using cross-compilation techniques
to isolate the new tools from the host system.
Chapter 6 shows you how to cross-compile basic utilities using the just built cross-toolchain.
Chapter 7 then enters a "chroot" environment, where we use the new tools to build all the rest of the tools needed to
create the LFS system.
This effort to isolate the new system from the host distribution may seem excessive. A full technical explanation as to
why this is done is provided in Toolchain Technical Notes.
In Chapter 8 the full-blown LFS system is built. Another advantage provided by the chroot environment is that it allows
you to continue using the host system while LFS is being built. While waiting for package compilations to complete,
you can continue using your computer as usual.
To finish the installation, the basic system configuration is set up in Chapter 9, and the kernel and boot loader are
created in Chapter 10. Chapter 11 contains information on continuing the LFS experience beyond this book. After the
steps in this chapter have been implemented, the computer is ready to boot into the new LFS system.
This is the process in a nutshell. Detailed information on each step is presented in the following chapters. Items that
seem complicated now will be clarified, and everything will fall into place as you commence your LFS adventure.

### 1.2 What's new since the last release
Here is a list of the packages updated since the previous release of LFS.
Upgraded to:

•
2

- Automake-1.17
- Bash-5.2.32
- Bc-6.7.6
- Binutils-2.43.1
- Coreutils-9.5
- E2fsprogs-1.47.1
- Expat-2.6.2
- Findutils-4.10.0
- GCC-14.2.0
- GDBM-1.24
- Gettext-0.22.5
- Glibc-2.40
- Iana-Etc-20240806
- IPRoute2-6.10.0
- Jinja2-3.1.4
- Kmod-33
- Less-661
- Libcap-2.70
- Libelf from Elfutils-0.191
- Libffi-3.4.6
- Linux-6.10.5
- Lz4-1.10.0
- Man-DB-2.12.1
- Man-pages-6.9.1
- Meson-1.5.1
- Ncurses-6.5
- Ninja-1.12.1
- OpenSSL-3.3.1
- Perl-5.40.0
- Pkgconf-2.3.0
- Psmisc-23.7
- Python-3.12.5
- Readline-8.2.13
- Setuptools-72.2.0
- Shadow-4.16.0
- Sysklogd-2.6.1
- Systemd-256.4
3

- SysVinit-3.10
- Tcl-8.6.14
- Udev from Systemd-256.4
- Util-linux-2.40.2
- Vim-9.1.0660
- Wheel-0.44.0
- Xz-5.6.2
- Zstd-1.5.6
Added:

- Lz4-1.10.0
Removed:

- bash-5.2.21-upstream_fixes-1.patch
- readline-8.2-upstream_fixes-3.patch

### 1.3 Changelog
This is version 12.2 of the Linux From Scratch book, dated September 1st, 2024. If this book is more than six months
old, a newer and better version is probably already available. To find out, please check one of the mirrors via https://
www.linuxfromscratch.org/mirrors.html.
Below is a list of changes made since the previous release of the book.
Changelog Entries:

- 2024-09-01
- [bdubbs] - LFS-12.2 released.
- 2024-08-23
- [xry111] - Update to lfs-bootscripts-20240825. Only trivial non-functional changes.
- 2024-08-23
- [xry111] - Update to lfs-bootscripts-20240823, to fix an issue causing VT 2-6 not affected by the FONT=
setting in /etc/sysconfig/console.
- 2024-08-17
- [bdubbs] - Update to setuptools-72.2.0. Fixes #5542.
- [bdubbs] - Update to kmod-33. Fixes #5540.
- [bdubbs] - Update to binutils-2.43.1. Fixes #5543.
- [bdubbs] - Update to linux-6.10.5. Fixes #5541.
- 2024-08-15
- [bdubbs] - Update to iana-etc-20240806. Addresses #5006.
- [bdubbs] - Update to pkgconf-2.3.0. Fixes #5537.
- [bdubbs] - Update to python3-3.12.5. Fixes #5538.
- [bdubbs] - Update to linux-6.10.4. Fixes #5539.
4

- 2024-08-05
- [bdubbs] - Update to bash-5.2.32. Fixes #5532.
- [bdubbs] - Update to iana-etc-20240801. Addresses #5006.
- [bdubbs] - Update to vim-9.1.0660. Addresses #4500.
- [bdubbs] - Update to binutils-2.43. Fixes #5535.
- [bdubbs] - Update to linux-6.10.3. Fixes #5534.
- [bdubbs] - Update to readline-8.2.13. Fixes #5533.
- [bdubbs] - Update to wheel-0.44.0. Fixes #5536.
- 2024-08-01
- [bdubbs] - Update to gcc-14.2.0. Fixes #5530.
- [bdubbs] - Update to iana-etc-20240723. Addresses #5006.
- [bdubbs] - Update to glibc-2.40. Fixes #5529.
- [bdubbs] - Update to iproute2-6.10.0. Fixes #5523.
- [bdubbs] - Update to linux-6.10.2. Fixes #5521.
- [bdubbs] - Update to lz4-1.10.0. Fixes #5526.
- [bdubbs] - Update to meson-1.5.1. Fixes #5527.
- [bdubbs] - Update to setuptools-72.1.0. Fixes #5531.
- [bdubbs] - Update to sysklogd-2.6.1. Fixes #5522.
- [bdubbs] - Update to systemd-256.4. Fixes #5518.
- [bdubbs] - Update to sysvinit-3.10. Fixes #5528.
- 2024-07-15
- [bdubbs] - Update to iana-etc-20240701. Addresses #5006.
- [bdubbs] - Update to vim-9.1.0580. Addresses #4500.
- [bdubbs] - Update to automake-1.17. Fixes #5520.
- [bdubbs] - Update to gdbm-1.24. Fixes #5515.
- [bdubbs] - Update to linux-6.9.9. Fixes #5517.
- [bdubbs] - Update to less-661. Fixes #5513.
- [bdubbs] - Update to meson-1.5.0. Fixes #5519.
- [bdubbs] - Update to setuptools-70.3.0. Fixes #5514.
- [bdubbs] - Update to util-linux-2.40.2. Fixes #5516.
- 2024-07-01
- [bdubbs] - Update lfs-bootscripts to only output escape sequences to a terminal.
- 2024-07-01
- [bdubbs] - Update to iana-etc-20240612. Addresses #5006.
- [bdubbs] - Update to bc-6.7.6. Fixes #5506.
- [bdubbs] - Update to man-pages-6.9.1. Fixes #5507.

5

- [bdubbs] - Update to linux-6.9.7. Fixes #5508.
- [bdubbs] - Update to sysklogd-2.5.2. Fixes #5509.
- [bdubbs] - Update to shadow-4.16.0. Fixes #5510.
- [bdubbs] - Update to systemd-256.1. Fixes #5511.
- [bdubbs] - Update to setuptools-70.1.1. Fixes #5512.
- 2024-06-15
- [bdubbs] - Update to vim-9.1.0478. Addresses #4500.
- [bdubbs] - Update to iana-etc-20240607. Addresses #5006.
- [bdubbs] - Update to systemd-256. Fixes #5504.
- [bdubbs] - Update to python3-3.12.4. Fixes #5502.
- [bdubbs] - Update to perl-5.40.0. Fixes #5503.
- [bdubbs] - Update to openssl-3.3.1 (Security fix). Fixes #5500.
- [bdubbs] - Update to linux-6.9.4. Fixes #5505.
- [bdubbs] - Update to findutils-4.10.0. Fixes #5499.
- 2024-05-31
- [bdubbs] - Update to meson-1.4.1. Fixes #5498.
- [bdubbs] - Update to xz-5.6.2. Fixes #5471.
- [bdubbs] - Add linux-6.9.x compatibility instructions to udev. Fixes #5496.
- [bdubbs] - Update to setuptools-70.0.0 (python module). Fixes #5491.
- [bdubbs] - Update to ninja-1.12.1. Fixes #5489.
- [bdubbs] - Update to man-pages-6.8. Fixes #5494.
- [bdubbs] - Update to linux-6.9.3. Fixes #5491.
- [bdubbs] - Update to libcap-2.70. Fixes #5493.
- [bdubbs] - Update to iproute2-6.9.0. Fixes #5492.
- [bdubbs] - Update to e2fsprogs-1.47.1. Fixes #5495.
- 2024-05-13
- [xry111] - Synchronize coreutils i18n patch from Fedora to fix a build failure on 32-bit x86 and an alarming
compiler warning on both 32-bit x86 and x86_64 with GCC 14.1 or later.
- 2024-05-11
- [bdubbs] - Update to vim-9.1.0405. Addresses #4500.
- [bdubbs] - Update to util-linux-2.40.1. Fixes #5482.
- [bdubbs] - Update to linux-6.8.9. Fixes #5484.
- [bdubbs] - Update to jinja2-3.1.4 (Python module). Fixes #5485.
- [bdubbs] - Update to iana-etc-20240502. Addresses #5006.
- [bdubbs] - Update to gcc-14.1.0. Fixes #5486.
- 2024-05-01

6

- [bdubbs] - Add security fix to glibc. Fixes #5481.
- [bdubbs] - Update to linux-6.8.8. Fixes #5480.
- [bdubbs] - Update to ncurses-6.5. Fixes #5483.
- 2024-04-16
- [bdubbs] - Make minor change to ifup script output text.
- 2024-04-15
- [bdubbs] - Update to setuptools-69.5.1. Fixes #5478.
- [bdubbs] - Update to python3-3.12.3. Fixes #5476.
- [bdubbs] - Update to openssl-3.3.0. Fixes #5475.
- [bdubbs] - Update to ninja-1.12.0. Fixes #5477.
- [bdubbs] - Update to man-db-2.12.1. Fixes #5474.
- [bdubbs] - Update to linux-6.8.6. Fixes #5472.
- [bdubbs] - Update to iana-etc-20240412. Addresses #5006.
- [bdubbs] - Update to vim-9.1.0330. Addresses #4500.
- 2024-03-31
- [bdubbs] - Update to iana-etc-20240318. Addresses #5006.
- [bdubbs] - Update to zstd-1.5.6. Fixes #5468.
- [bdubbs] - Update to util-linux-2.40. Fixes #5430.
- [bdubbs] - Update to shadow-4.15.1. Fixes #5465.
- [bdubbs] - Update to pkgconf-2.2.0. Fixes #5469.
- [bdubbs] - Update to linux-6.8.2. Fixes #5467.
- [bdubbs] - Update to coreutils-9.5. Fixes #5470.
- 2024-03-29
- [bdubbs] - Revert to xz-5.4.6 due to upstream compromise.
- 2024-03-25
- [timtas] - Update to sysvinit-3.09. Fixes #5466.
- 2024-03-19
- [renodr] - Update to iproute2-6.8.0. Fixes #5458.
- [renodr] - Update to man-pages-6.7. Fixes #5464.
- [renodr] - Update to Linux-6.8.1. Fixes #5453.
- [renodr] - Added LZ4 to the book. Fixes #5463.
- 2024-03-15
- [bdubbs] - Update to wheel-0.43.0. Fixes #5459.
- [bdubbs] - Update to setuptools-69.2.0 (Python module). Fixes #5462.
- [bdubbs] - Update to meson-1.4.0. Fixes #5460.
- [bdubbs] - Update to expat-2.6.2 (Security fix). Fixes #5461.

7

- [bdubbs] - Update to iana-etc-20240305. Addresses #5006.
- [bdubbs] - Update to vim-9.1.0161. Addresses #4500.
- [bdubbs] - Update to xz-5.6.1. Fixes #5457.
- [bdubbs] - Update to shadow-4.15.0. Fixes #5456.
- [bdubbs] - Update to psmisc-23.7. Fixes #5454.
- [bdubbs] - Update to kmod-32. Fixes #5455.
- [bdubbs] - Update to elfutils-0.191. Fixes #5451.
- 2024-03-02
- [bdubbs] - Update to iana-etc-20240222. Addresses #5006.
- [bdubbs] - Update to vim-9.1.0145. Addresses #4500.
- [bdubbs] - Update to xz-5.6.0. Fixes #5447.
- [bdubbs] - Update to tcl-8.6.14. Fixes #5448.
- [bdubbs] - Update to shadow-4.14.6. Fixes #5450.
- [bdubbs] - Update to setuptools-69.1.1. Fixes #5446.
- [bdubbs] - Update to linux-6.7.7. Fixes #5444.
- [bdubbs] - Update to libffi-3.4.6. Fixes #5443.
- [bdubbs] - Update to gettext-0.22.5. Fixes #5445.
- [bdubbs] - Update to expat-2.6.1. Fixes #5449.
- 2024-03-01
- [bdubbs] - LFS-12.1 released.

### 1.4 Resources
1.4.1. FAQ
If during the building of the LFS system you encounter any errors, have any questions, or think there is a typo in the
book, please start by consulting the list of Frequently Asked Questions (FAQ), located at https://www.linuxfromscratch.
org/faq/.

#### 1.4.2 Mailing Lists
The linuxfromscratch.org server hosts a number of mailing lists used for the development of the LFS project. These
lists include the main development and support lists, among others. If you cannot find an answer to your problem on
the FAQ page, the next step would be to search the mailing lists at https://www.linuxfromscratch.org/search.html.
For information on the different lists, how to subscribe, archive locations, and additional information, visit https://www.
linuxfromscratch.org/mail.html.

1.4.3. IRC
Several members of the LFS community offer assistance via Internet Relay Chat (IRC). Before using this support,
please make sure your question is not already answered in the LFS FAQ or the mailing list archives. You can find the
IRC network at irc.libera.chat. The support channel is named #lfs-support.

8

#### 1.4.4 Mirror Sites
The LFS project has a number of world-wide mirrors to make accessing the website and downloading the required
packages more convenient. Please visit the LFS website at https://www.linuxfromscratch.org/mirrors.html for a list of
current mirrors.

#### 1.4.5 Contact Information
Please direct all your questions and comments to one of the LFS mailing lists (see above).

### 1.5 Help
In case you've hit an issue building one package with the LFS instruction, we strongly discourage posting
the issue directly onto the upstream support channel before discussing via a LFS support channel listed in
Section 1.4, “Resources.” Doing so is often quite inefficient because the upstream maintainers are rarely
familiar with LFS building procedure. Even if you've really hit an upstream issue, the LFS community can
still help to isolate the information wanted by the upstream maintainers and make a proper report.
If you must ask a question directly via an upstream support channel, you shall at least note that many upstream
projects have the support channels separated from the bug tracker. The “bug” reports for asking questions are
considered invalid and may annoy upstream developers for these projects.
If an issue or a question is encountered while working through this book, please check the FAQ page at https://www.
linuxfromscratch.org/faq/#generalfaq. Questions are often already answered there. If your question is not answered on
that page, try to find the source of the problem. The following hint will give you some guidance for troubleshooting:
https://www.linuxfromscratch.org/hints/downloads/files/errors.txt.
If you cannot find your problem listed in the FAQ, search the mailing lists at https://www.linuxfromscratch.org/search.
html.
We also have a wonderful LFS community that is willing to offer assistance through the mailing lists and IRC (see
the Section 1.4, “Resources” section of this book). However, we get several support questions every day, and many of
them could have been easily answered by going to the FAQ or by searching the mailing lists first. So, for us to offer the
best assistance possible, you should first do some research on your own. That allows us to focus on the more unusual
support needs. If your searches do not produce a solution, please include all the relevant information (mentioned below)
in your request for help.

#### 1.5.1 Things to Mention
Apart from a brief explanation of the problem being experienced, any request for help should include these essential
things:
- The version of the book being used (in this case 12.2)
- The host distribution and version being used to create LFS
- The output from the Host System Requirements script
- The package or section the problem was encountered in
- The exact error message, or a clear description of the problem
9

- Note whether you have deviated from the book at all

Deviating from this book does not mean that we will not help you. After all, LFS is about personal preference.
Being up-front about any changes to the established procedure helps us evaluate and determine possible causes
of your problem.

#### 1.5.2 Configure Script Problems
If something goes wrong while running the configure script, review the config.log file. This file may contain errors
encountered during configure which were not printed to the screen. Include the relevant lines if you need to ask for help.

#### 1.5.3 Compilation Problems
Both the screen output and the contents of various files are useful in determining the cause of compilation problems.
The screen output from the configure script and the make run can be helpful. It is not necessary to include the entire
output, but do include all of the relevant information. Here is an example of the type of information to include from
the make screen output.
gcc -D ALIASPATH=\"/mnt/lfs/usr/share/locale:.\"
-D LOCALEDIR=\"/mnt/lfs/usr/share/locale\"
-D LIBDIR=\"/mnt/lfs/usr/lib\"
-D INCLUDEDIR=\"/mnt/lfs/usr/include\" -D HAVE_CONFIG_H -I. -I.
-g -O2 -c getopt1.c
gcc -g -O2 -static -o make ar.o arscan.o commands.o dir.o
expand.o file.o function.o getopt.o implicit.o job.o main.o
misc.o read.o remake.o rule.o signame.o variable.o vpath.o
default.o remote-stub.o version.o opt1.o
-lutil job.o: In function `load_too_high':
/lfs/tmp/make-3.79.1/job.c:1565: undefined reference
to `getloadavg'
collect2: ld returned 1 exit status
make[2]: *** [make] Error 1
make[2]: Leaving directory `/lfs/tmp/make-3.79.1'
make[1]: *** [all-recursive] Error 1
make[1]: Leaving directory `/lfs/tmp/make-3.79.1'
make: *** [all-recursive-am] Error 2

In this case, many people would just include the bottom section:
make [2]: *** [make] Error 1

This is not enough information to diagnose the problem, because it only notes that something went wrong, not what
went wrong. The entire section, as in the example above, is what should be saved because it includes the command that
was executed and all the associated error messages.
An excellent article about asking for help on the Internet is available online at http://catb.org/~esr/faqs/smart-questions.
html. Read this document, and follow the hints. Doing so will increase the likelihood of getting the help you need.

10

Part II. Preparing for the Build

## Chapter 2. Preparing the Host System
### 2.1 Introduction
In this chapter, the host tools needed for building LFS are checked and, if necessary, installed. Then a partition which
will host the LFS system is prepared. We will create the partition itself, create a file system on it, and mount it.

### 2.2 Host System Requirements
#### 2.2.1 Hardware
The LFS editors recommend that the system CPU have at least four cores and that the system have at least 8 GB of
memory. Older systems that do not meet these requirements will still work, but the time to build packages will be
significantly longer than documented.

#### 2.2.2 Software
Your host system should have the following software with the minimum versions indicated. This should not be an
issue for most modern Linux distributions. Also note that many distributions will place software headers into separate
packages, often in the form of <package-name>-devel or <package-name>-dev. Be sure to install those if your distribution
provides them.
Earlier versions of the listed software packages may work, but have not been tested.
- Bash-3.2 (/bin/sh should be a symbolic or hard link to bash)
- Binutils-2.13.1 (Versions greater than 2.43.1 are not recommended as they have not been tested)
- Bison-2.7 (/usr/bin/yacc should be a link to bison or a small script that executes bison)
- Coreutils-8.1
- Diffutils-2.8.1
- Findutils-4.2.31
- Gawk-4.0.1 (/usr/bin/awk should be a link to gawk)
- GCC-5.2 including the C++ compiler, g++ (Versions greater than 14.2.0 are not recommended as they have not
been tested). C and C++ standard libraries (with headers) must also be present so the C++ compiler can build
hosted programs
- Grep-2.5.1a
- Gzip-1.3.12
- Linux Kernel-4.19
The reason for the kernel version requirement is that we specify that version when building glibc in Chapter 5
and Chapter 8, so the workarounds for older kernels are not enabled and the compiled glibc is slightly faster and
smaller. As at Feb 2024, 4.19 is the oldest kernel release still supported by the kernel developers. Some kernel
releases older than 4.19 may be still supported by third-party teams, but they are not considered official upstream
kernel releases; read https://kernel.org/category/releases.html for the details.
If the host kernel is earlier than 4.19 you will need to replace the kernel with a more up-to-date version. There
are two ways you can go about this. First, see if your Linux vendor provides a 4.19 or later kernel package. If so,
you may wish to install it. If your vendor doesn't offer an acceptable kernel package, or you would prefer not to
install it, you can compile a kernel yourself. Instructions for compiling the kernel and configuring the boot loader
(assuming the host uses GRUB) are located in Chapter 10.
12

We require the host kernel to support UNIX 98 pseudo terminal (PTY). It should be enabled on all desktop or
server distros shipping Linux 4.19 or a newer kernel. If you are building a custom host kernel, ensure CONFIG_
UNIX98_PTYS is set to y in the kernel configuration.
- M4-1.4.10
- Make-4.0
- Patch-2.5.4
- Perl-5.8.8
- Python-3.4
- Sed-4.1.5
- Tar-1.22
- Texinfo-5.0
- Xz-5.0.0

Note that the symlinks mentioned above are required to build an LFS system using the instructions contained
within this book. Symlinks that point to other software (such as dash, mawk, etc.) may work, but are not
tested or supported by the LFS development team, and may require either deviation from the instructions or
additional patches to some packages.
To see whether your host system has all the appropriate versions, and the ability to compile programs, run the following
commands:
cat > version-check.sh << "EOF"
LC_ALL=C
PATH=/usr/bin:/bin
bail() { echo "FATAL: $1"; exit 1; }
grep --version > /dev/null 2> /dev/null || bail "grep does not work"
sed '' /dev/null || bail "sed does not work"
sort
/dev/null || bail "sort does not work"
ver_check()
if ! type -p $2 &>/dev/null
echo "ERROR: Cannot find $2 ($1)"; return 1;
v=$($2 --version 2>&1 | grep -E -o '[0-9]+\.[0-9\.]+[a-z]*' | head -n1)
if printf '%s\n' $3 $v | sort --version-sort --check &>/dev/null
printf "OK:
%-9s %-6s >= $3\n" "$1" "$v"; return 0;
printf "ERROR: %-9s is TOO OLD ($3 or later required)\n" "$1";
return 1;
ver_kernel()

13

kver=$(uname -r | grep -E -o '^[0-9\.]+')
if printf '%s\n' $1 $kver | sort --version-sort --check &>/dev/null
printf "OK:
Linux Kernel $kver >= $1\n"; return 0;
printf "ERROR: Linux Kernel ($kver) is TOO OLD ($1 or later required)\n" "$kver";
return 1;
ver_check Coreutils
sort
8.1 || bail "Coreutils too old, stop"
ver_check Bash
bash
3.2
ver_check Binutils
ld
2.13.1
ver_check Bison
bison
2.7
ver_check Diffutils
diff
2.8.1
ver_check Findutils
find
4.2.31
ver_check Gawk
gawk
4.0.1
ver_check GCC
gcc
5.2
ver_check "GCC (C++)"
g++
5.2
ver_check Grep
grep
2.5.1a
ver_check Gzip
gzip
1.3.12
ver_check M4
m4
1.4.10
ver_check Make
4.0
ver_check Patch
patch
2.5.4
ver_check Perl
perl
5.8.8
ver_check Python
python3 3.4
ver_check Sed
sed
4.1.5
ver_check Tar
tar
1.22
ver_check Texinfo
texi2any 5.0
ver_check Xz
xz
5.0.0
ver_kernel 4.19
if mount | grep -q 'devpts on /dev/pts' && [ -e /dev/ptmx ]
then echo "OK:
Linux Kernel supports UNIX 98 PTY";
else echo "ERROR: Linux Kernel does NOT support UNIX 98 PTY"; fi
alias_check() {
if $1 --version 2>&1 | grep -qi $2
then printf "OK:
%-4s is $2\n" "$1";
else printf "ERROR: %-4s is NOT $2\n" "$1"; fi
echo "Aliases:"
alias_check awk GNU
alias_check yacc Bison
alias_check sh Bash
echo "Compiler check:"
if printf "int main(){}" | g++ -x c++ then echo "OK:
g++ works";
else echo "ERROR: g++ does NOT work"; fi
rm -f a.out
if [ "$(nproc)" = "" ]; then
echo "ERROR: nproc is not available or it produces empty output"
echo "OK: nproc reports $(nproc) logical cores are available"
bash version-check.sh

14

### 2.3 Building LFS in Stages
LFS is designed to be built in one session. That is, the instructions assume that the system will not be shut down during
the process. This does not mean that the system has to be built in one sitting. The issue is that certain procedures must
be repeated after a reboot when resuming LFS at different points.

#### 2.3.1 Chapters 1–4
These chapters run commands on the host system. When restarting, be certain of one thing:
- Procedures performed as the root user after Section 2.4 must have the LFS environment variable set FOR THE
ROOT USER.

#### 2.3.2 Chapters 5–6
- The /mnt/lfs partition must be mounted.
- These two chapters must be done as user lfs. A su - lfs command must be issued before performing any task in
these chapters. If you don't do that, you are at risk of installing packages to the host, and potentially rendering it
unusable.
- The procedures in General Compilation Instructions are critical. If there is any doubt a package has been installed
correctly, ensure the previously expanded tarball has been removed, then re-extract the package, and complete all
the instructions in that section.

#### 2.3.3 Chapters 7–10
- The /mnt/lfs partition must be mounted.
- A few operations, from “Changing Ownership” to “Entering the Chroot Environment,” must be done as the root
user, with the LFS environment variable set for the root user.
- When entering chroot, the LFS environment variable must be set for root. The LFS variable is not used after the
chroot environment has been entered.
- The virtual file systems must be mounted. This can be done before or after entering chroot by changing to a
host virtual terminal and, as root, running the commands in Section 7.3.1, “Mounting and Populating /dev” and
Section 7.3.2, “Mounting Virtual Kernel File Systems.”

### 2.4 Creating a New Partition
Like most other operating systems, LFS is usually installed on a dedicated partition. The recommended approach to
building an LFS system is to use an available empty partition or, if you have enough unpartitioned space, to create one.
A minimal system requires a partition of around 10 gigabytes (GB). This is enough to store all the source tarballs and
compile the packages. However, if the LFS system is intended to be the primary Linux system, additional software will
probably be installed which will require additional space. A 30 GB partition is a reasonable size to provide for growth.
The LFS system itself will not take up this much room. A large portion of this requirement is to provide sufficient free
temporary storage as well as for adding additional capabilities after LFS is complete. Additionally, compiling packages
can require a lot of disk space which will be reclaimed after the package is installed.
Because there is not always enough Random Access Memory (RAM) available for compilation processes, it is a good
idea to use a small disk partition as swap space. This is used by the kernel to store seldom-used data and leave more
memory available for active processes. The swap partition for an LFS system can be the same as the one used by the
host system, in which case it is not necessary to create another one.
15

Start a disk partitioning program such as cfdisk or fdisk with a command line option naming the hard disk on which
the new partition will be created—for example /dev/sda for the primary disk drive. Create a Linux native partition and
a swap partition, if needed. Please refer to cfdisk(8) or fdisk(8) if you do not yet know how to use the programs.

For experienced users, other partitioning schemes are possible. The new LFS system can be on a software
RAID array or an LVM logical volume. However, some of these options require an initramfs, which is an
advanced topic. These partitioning methodologies are not recommended for first time LFS users.
Remember the designation of the new partition (e.g., sda5). This book will refer to this as the LFS partition. Also
remember the designation of the swap partition. These names will be needed later for the /etc/fstab file.

#### 2.4.1 Other Partition Issues
Requests for advice on system partitioning are often posted on the LFS mailing lists. This is a highly subjective topic.
The default for most distributions is to use the entire drive with the exception of one small swap partition. This is not
optimal for LFS for several reasons. It reduces flexibility, makes sharing of data across multiple distributions or LFS
builds more difficult, makes backups more time consuming, and can waste disk space through inefficient allocation
of file system structures.

2.4.1.1. The Root Partition
A root LFS partition (not to be confused with the /root directory) of twenty gigabytes is a good compromise for most
systems. It provides enough space to build LFS and most of BLFS, but is small enough so that multiple partitions can
be easily created for experimentation.

2.4.1.2. The Swap Partition
Most distributions automatically create a swap partition. Generally the recommended size of the swap partition is about
twice the amount of physical RAM, however this is rarely needed. If disk space is limited, hold the swap partition to
two gigabytes and monitor the amount of disk swapping.
If you want to use the hibernation feature (suspend-to-disk) of Linux, it writes out the contents of RAM to the swap
partition before turning off the machine. In this case the size of the swap partition should be at least as large as the
system's installed RAM.
Swapping is never good. For mechanical hard drives you can generally tell if a system is swapping by just listening to
disk activity and observing how the system reacts to commands. With an SSD you will not be able to hear swapping,
but you can tell how much swap space is being used by running the top or free programs. Use of an SSD for a swap
partition should be avoided if possible. The first reaction to swapping should be to check for an unreasonable command
such as trying to edit a five gigabyte file. If swapping becomes a normal occurrence, the best solution is to purchase
more RAM for your system.

2.4.1.3. The Grub Bios Partition
If the boot disk has been partitioned with a GUID Partition Table (GPT), then a small, typically 1 MB, partition must
be created if it does not already exist. This partition is not formatted, but must be available for GRUB to use during
installation of the boot loader. This partition will normally be labeled 'BIOS Boot' if using fdisk or have a code of
EF02 if using the gdisk command.
16

The Grub Bios partition must be on the drive that the BIOS uses to boot the system. This is not necessarily
the drive that holds the LFS root partition. The disks on a system may use different partition table types. The
necessity of the Grub Bios partition depends only on the partition table type of the boot disk.

2.4.1.4. Convenience Partitions
There are several other partitions that are not required, but should be considered when designing a disk layout. The
following list is not comprehensive, but is meant as a guide.
- /boot – Highly recommended. Use this partition to store kernels and other booting information. To minimize
potential boot problems with larger disks, make this the first physical partition on your first disk drive. A partition
size of 200 megabytes is adequate.
- /boot/efi – The EFI System Partition, which is needed for booting the system with UEFI. Read the BLFS page for
details.
- /home – Highly recommended. Share your home directory and user customization across multiple distributions or
LFS builds. The size is generally fairly large and depends on available disk space.
- /usr – In LFS, /bin, /lib, and /sbin are symlinks to their counterparts in /usr. So /usr contains all the binaries
needed for the system to run. For LFS a separate partition for /usr is normally not needed. If you create it anyway,
you should make a partition large enough to fit all the programs and libraries in the system. The root partition
can be very small (maybe just one gigabyte) in this configuration, so it's suitable for a thin client or diskless
workstation (where /usr is mounted from a remote server). However, you should be aware that an initramfs (not
covered by LFS) will be needed to boot a system with a separate /usr partition.
- /opt – This directory is most useful for BLFS, where multiple large packages like KDE or Texlive can be installed
without embedding the files in the /usr hierarchy. If used, 5 to 10 gigabytes is generally adequate.
- /tmp – A separate /tmp partition is rare, but useful if configuring a thin client. This partition, if used, will usually
not need to exceed a couple of gigabytes. If you have enough RAM, you can mount a tmpfs on /tmp to make
access to temporary files faster.
- /usr/src – This partition is very useful for providing a location to store BLFS source files and share them across
LFS builds. It can also be used as a location for building BLFS packages. A reasonably large partition of 30-50
gigabytes provides plenty of room.
Any separate partition that you want automatically mounted when the system starts must be specified in the /etc/fstab
file. Details about how to specify partitions will be discussed in Section 10.2, “Creating the /etc/fstab File”.

### 2.5 Creating a File System on the Partition
A partition is just a range of sectors on a disk drive, delimited by boundaries set in a partition table. Before the operating
system can use a partition to store any files, the partition must be formatted to contain a file system, typically consisting
of a label, directory blocks, data blocks, and an indexing scheme to locate a particular file on demand. The file system
also helps the OS keep track of free space on the partition, reserve the needed sectors when a new file is created or an
existing file is extended, and recycle the free data segments created when files are deleted. It may also provide support
for data redundancy, and for error recovery.
LFS can use any file system recognized by the Linux kernel, but the most common types are ext3 and ext4. The choice
of the right file system can be complex; it depends on the characteristics of the files and the size of the partition. For
example:
17

ext2
is suitable for small partitions that are updated infrequently such as /boot.
ext3
is an upgrade to ext2 that includes a journal to help recover the partition's status in the case of an unclean shutdown.
It is commonly used as a general purpose file system.
ext4
is the latest version of the ext family of file systems. It provides several new capabilities including nano-second
timestamps, creation and use of very large files (up to 16 TB), and speed improvements.
Other file systems, including FAT32, NTFS, JFS, and XFS are useful for specialized purposes. More information about
these file systems, and many others, can be found at https://en.wikipedia.org/wiki/Comparison_of_file_systems.
LFS assumes that the root file system (/) is of type ext4. To create an ext4 file system on the LFS partition, issue the
following command:
mkfs -v -t ext4 /dev/<xxx>

Replace <xxx> with the name of the LFS partition.
If you are using an existing swap partition, there is no need to format it. If a new
need to be initialized with this command:

swap partition was created, it will

mkswap /dev/<yyy>

Replace <yyy> with the name of the swap partition.

### 2.6 Setting The $LFS Variable
Throughout this book, the environment variable LFS will be used several times. You should ensure that this variable
is always defined throughout the LFS build process. It should be set to the name of the directory where you will be
building your LFS system - we will use /mnt/lfs as an example, but you may choose any directory name you want. If
you are building LFS on a separate partition, this directory will be the mount point for the partition. Choose a directory
location and set the variable with the following command:
export LFS=/mnt/lfs

Having this variable set is beneficial in that commands such as mkdir -v $LFS/tools can be typed literally. The shell
will automatically replace “$LFS” with “/mnt/lfs” (or whatever value the variable was set to) when it processes the
command line.

Do not forget to check that LFS is set whenever you leave and reenter the current working environment (such
as when doing a su to root or another user). Check that the LFS variable is set up properly with:
echo $LFS

Make sure the output shows the path to your LFS system's build location, which is /mnt/lfs if the provided
example was followed. If the output is incorrect, use the command given earlier on this page to set $LFS to
the correct directory name.
18

One way to ensure that the LFS variable is always set is to edit the .bash_profile file in both your personal
home directory and in /root/.bash_profile and enter the export command above. In addition, the shell
specified in the /etc/passwd file for all users that need the LFS variable must be bash to ensure that the /root/
.bash_profile file is incorporated as a part of the login process.
Another consideration is the method that is used to log into the host system. If logging in through a graphical
display manager, the user's .bash_profile is not normally used when a virtual terminal is started. In this case,
add the export command to the .bashrc file for the user and root. In addition, some distributions use an "if"
test, and do not run the remaining .bashrc instructions for a non-interactive bash invocation. Be sure to place
the export command ahead of the test for non-interactive use.

### 2.7 Mounting the New Partition
Now that a file system has been created, the partition must be mounted so the host system can access it. This book
assumes that the file system is mounted at the directory specified by the LFS environment variable described in the
previous section.
Strictly speaking, one cannot “mount a partition.” One mounts the file system embedded in that partition. But since
a single partition can't contain more than one file system, people often speak of the partition and the associated file
system as if they were one and the same.
Create the mount point and mount the LFS file system with these commands:
mkdir -pv $LFS
mount -v -t ext4 /dev/<xxx> $LFS

Replace <xxx> with the name of the LFS partition.
If you are using multiple partitions for LFS (e.g., one for / and another for /home), mount them like this:
mkdir -pv $LFS
mount -v -t ext4 /dev/<xxx> $LFS
mkdir -v $LFS/home
mount -v -t ext4 /dev/<yyy> $LFS/home

Replace <xxx> and <yyy> with the appropriate partition names.
Ensure that this new partition is not mounted with permissions that are too restrictive (such as the nosuid or nodev
options). Run the mount command without any parameters to see what options are set for the mounted LFS partition.
If nosuid and/or nodev are set, the partition must be remounted.

The above instructions assume that you will not restart your computer throughout the LFS process. If you shut
down your system, you will either need to remount the LFS partition each time you restart the build process,
or modify the host system's /etc/fstab file to automatically remount it when you reboot. For example, you
might add this line to your /etc/fstab file:
/dev/<xxx>

/mnt/lfs ext4

defaults

If you use additional optional partitions, be sure to add them also.
19

If you are using a swap partition, ensure that it is enabled using the swapon command:
/sbin/swapon -v /dev/<zzz>

Replace <zzz> with the name of the swap partition.
Now that the new LFS partition is open for business, it's time to download the packages.

20

## Chapter 3. Packages and Patches
### 3.1 Introduction
This chapter includes a list of packages that need to be downloaded in order to build a basic Linux system. The listed
version numbers correspond to versions of the software that are known to work, and this book is based on their use. We
highly recommend against using different versions, because the build commands for one version may not work with a
different version, unless the different version is specified by an LFS erratum or security advisory. The newest package
versions may also have problems that require work-arounds. These work-arounds will be developed and stabilized in
the development version of the book.
For some packages, the release tarball and the (Git or SVN) repository snapshot tarball for that release may be
published with similar file names. A release tarball contains generated files (for example, a configure script generated
by autoconf), in addition to the contents of the corresponding repository snapshot. The book uses release tarballs
whenever possible. Using a repository snapshot instead of a release tarball specified by the book will cause problems.
Download locations may not always be accessible. If a download location has changed since this book was published,
Google (https://www.google.com/) provides a useful search engine for most packages. If this search is unsuccessful,
try one of the alternative means of downloading at https://www.linuxfromscratch.org/lfs/mirrors.html#files.
Downloaded packages and patches will need to be stored somewhere that is conveniently available throughout the
entire build. A working directory is also required to unpack the sources and build them. $LFS/sources can be used both
as the place to store the tarballs and patches and as a working directory. By using this directory, the required elements
will be located on the LFS partition and will be available during all stages of the building process.
To create this directory, execute the following command, as user root, before starting the download session:
mkdir -v $LFS/sources

Make this directory writable and sticky. “Sticky” means that even if multiple users have write permission on a directory,
only the owner of a file can delete the file within a sticky directory. The following command will enable the write
and sticky modes:
chmod -v a+wt $LFS/sources

There are several ways to obtain all the necessary packages and patches to build LFS:
- The files can be downloaded individually as described in the next two sections.
- For stable versions of the book, a tarball of all the needed files can be downloaded from one of the mirror sites
listed at https://www.linuxfromscratch.org/mirrors.html#files.
- The files can be downloaded using wget and a wget-list as described below.
To download all of the packages and patches by using wget-list-sysv as an input to the wget command, use:
wget --input-file=wget-list-sysv --continue --directory-prefix=$LFS/sources

Additionally, starting with LFS-7.0, there is a separate file, md5sums, which can be used to verify that all the correct
packages are available before proceeding. Place that file in $LFS/sources and run:
pushd $LFS/sources
md5sum -c md5sums

This check can be used after retrieving the needed files with any of the methods listed above.
21

If the packages and patches are downloaded as a non-root user, these files will be owned by the user. The file system
records the owner by its UID, and the UID of a normal user in the host distro is not assigned in LFS. So the files will
be left owned by an unnamed UID in the final LFS system. If you won't assign the same UID for your user in the LFS
system, change the owners of these files to root now to avoid this issue:
chown root:root $LFS/sources/*

### 3.2 All Packages
Read the security advisories before downloading packages to figure out if a newer version of any package
should be used to avoid security vulnerabilities.
The upstream sources may remove old releases, especially when those releases contain a security
vulnerability. If one URL below is not reachable, you should read the security advisories first to figure out if
a newer version (with the vulnerability fixed) should be used. If not, try to download the removed package
from a mirror. Although it's possible to download an old release from a mirror even if this release has been
removed because of a vulnerability, it's not a good idea to use a release known to be vulnerable when building
your system.
Download or otherwise obtain the following packages:
- Acl (2.3.2) - 363 KB:
Home page: https://savannah.nongnu.org/projects/acl
Download: https://download.savannah.gnu.org/releases/acl/acl-2.3.2.tar.xz
MD5 sum: 590765dee95907dbc3c856f7255bd669
- Attr (2.5.2) - 484 KB:
Home page: https://savannah.nongnu.org/projects/attr
Download: https://download.savannah.gnu.org/releases/attr/attr-2.5.2.tar.gz
MD5 sum: 227043ec2f6ca03c0948df5517f9c927
- Autoconf (2.72) - 1,360 KB:
Home page: https://www.gnu.org/software/autoconf/
Download: https://ftp.gnu.org/gnu/autoconf/autoconf-2.72.tar.xz
MD5 sum: 1be79f7106ab6767f18391c5e22be701
- Automake (1.17) - 1,614 KB:
Home page: https://www.gnu.org/software/automake/
Download: https://ftp.gnu.org/gnu/automake/automake-1.17.tar.xz
MD5 sum: 7ab3a02318fee6f5bd42adfc369abf10
- Bash (5.2.32) - 10,697 KB:
Home page: https://www.gnu.org/software/bash/
Download: https://ftp.gnu.org/gnu/bash/bash-5.2.32.tar.gz
MD5 sum: f204835b2e06c06e37b5ad776ff907f4
- Bc (6.7.6) - 463 KB:
Home page: https://git.gavinhoward.com/gavin/bc
Download: https://github.com/gavinhoward/bc/releases/download/6.7.6/bc-6.7.6.tar.xz
MD5 sum: a47aa5e4e7395fbcd159a9228613b97b
22

- Binutils (2.43.1) - 27,514 KB:
Home page: https://www.gnu.org/software/binutils/
Download: https://sourceware.org/pub/binutils/releases/binutils-2.43.1.tar.xz
MD5 sum: 9202d02925c30969d1917e4bad5a2320
- Bison (3.8.2) - 2,752 KB:
Home page: https://www.gnu.org/software/bison/
Download: https://ftp.gnu.org/gnu/bison/bison-3.8.2.tar.xz
MD5 sum: c28f119f405a2304ff0a7ccdcc629713
- Bzip2 (1.0.8) - 792 KB:
Download: https://www.sourceware.org/pub/bzip2/bzip2-1.0.8.tar.gz
MD5 sum: 67e051268d0c475ea773822f7500d0e5
- Check (0.15.2) - 760 KB:
Home page: https://libcheck.github.io/check
Download: https://github.com/libcheck/check/releases/download/0.15.2/check-0.15.2.tar.gz
MD5 sum: 50fcafcecde5a380415b12e9c574e0b2
- Coreutils (9.5) - 5,867 KB:
Home page: https://www.gnu.org/software/coreutils/
Download: https://ftp.gnu.org/gnu/coreutils/coreutils-9.5.tar.xz
MD5 sum: e99adfa059a63db3503cc71f3d151e31
- DejaGNU (1.6.3) - 608 KB:
Home page: https://www.gnu.org/software/dejagnu/
Download: https://ftp.gnu.org/gnu/dejagnu/dejagnu-1.6.3.tar.gz
MD5 sum: 68c5208c58236eba447d7d6d1326b821
- Diffutils (3.10) - 1,587 KB:
Home page: https://www.gnu.org/software/diffutils/
Download: https://ftp.gnu.org/gnu/diffutils/diffutils-3.10.tar.xz
MD5 sum: 2745c50f6f4e395e7b7d52f902d075bf
- E2fsprogs (1.47.1) - 9,720 KB:
Home page: https://e2fsprogs.sourceforge.net/
Download: https://downloads.sourceforge.net/project/e2fsprogs/e2fsprogs/v1.47.1/e2fsprogs-1.47.1.tar.gz
MD5 sum: 75e6d1353cbe6d5728a98fb0267206cb
- Elfutils (0.191) - 9,092 KB:
Home page: https://sourceware.org/elfutils/
Download: https://sourceware.org/ftp/elfutils/0.191/elfutils-0.191.tar.bz2
MD5 sum: 636547248fb3fae58ec48030298d3ef7
- Expat (2.6.2) - 474 KB:
Home page: https://libexpat.github.io/
Download: https://prdownloads.sourceforge.net/expat/expat-2.6.2.tar.xz
MD5 sum: 0cb75c8feb842c0794ba89666b762a2d
- Expect (5.45.4) - 618 KB:
Home page: https://core.tcl.tk/expect/
Download: https://prdownloads.sourceforge.net/expect/expect5.45.4.tar.gz
MD5 sum: 00fce8de158422f5ccd2666512329bd2
23

- File (5.45) - 1,218 KB:
Home page: https://www.darwinsys.com/file/
Download: https://astron.com/pub/file/file-5.45.tar.gz
MD5 sum: 26b2a96d4e3a8938827a1e572afd527a
- Findutils (4.10.0) - 2,189 KB:
Home page: https://www.gnu.org/software/findutils/
Download: https://ftp.gnu.org/gnu/findutils/findutils-4.10.0.tar.xz
MD5 sum: 870cfd71c07d37ebe56f9f4aaf4ad872
- Flex (2.6.4) - 1,386 KB:
Home page: https://github.com/westes/flex
Download: https://github.com/westes/flex/releases/download/v2.6.4/flex-2.6.4.tar.gz
MD5 sum: 2882e3179748cc9f9c23ec593d6adc8d
- Flit-core (3.9.0) - 41 KB:
Home page: https://pypi.org/project/flit-core/
Download: https://pypi.org/packages/source/f/flit-core/flit_core-3.9.0.tar.gz
MD5 sum: 3bc52f1952b9a78361114147da63c35b
- Gawk (5.3.0) - 3,356 KB:
Home page: https://www.gnu.org/software/gawk/
Download: https://ftp.gnu.org/gnu/gawk/gawk-5.3.0.tar.xz
MD5 sum: 97c5a7d83f91a7e1b2035ebbe6ac7abd
- GCC (14.2.0) - 90,144 KB:
Home page: https://gcc.gnu.org/
Download: https://ftp.gnu.org/gnu/gcc/gcc-14.2.0/gcc-14.2.0.tar.xz
MD5 sum: 2268420ba02dc01821960e274711bde0
- GDBM (1.24) - 1,168 KB:
Home page: https://www.gnu.org/software/gdbm/
Download: https://ftp.gnu.org/gnu/gdbm/gdbm-1.24.tar.gz
MD5 sum: c780815649e52317be48331c1773e987
- Gettext (0.22.5) - 10,031 KB:
Home page: https://www.gnu.org/software/gettext/
Download: https://ftp.gnu.org/gnu/gettext/gettext-0.22.5.tar.xz
MD5 sum: 3ae5580599d84be93e6213930facb2db
- Glibc (2.40) - 18,313 KB:
Home page: https://www.gnu.org/software/libc/
Download: https://ftp.gnu.org/gnu/glibc/glibc-2.40.tar.xz
MD5 sum: b390feef233022114950317f10c4fa97

The Glibc developers maintain a Git branch containing patches considered worthy for Glibc-2.40 but
unfortunately developed after Glibc-2.40 release. The LFS editors will issue a security advisory if any
security fix is added into the branch, but no actions will be taken for other newly added patches. You may
review the patches yourself and incorporate some patches if you consider them important.
24

- GMP (6.3.0) - 2,046 KB:
Home page: https://www.gnu.org/software/gmp/
Download: https://ftp.gnu.org/gnu/gmp/gmp-6.3.0.tar.xz
MD5 sum: 956dc04e864001a9c22429f761f2c283
- Gperf (3.1) - 1,188 KB:
Home page: https://www.gnu.org/software/gperf/
Download: https://ftp.gnu.org/gnu/gperf/gperf-3.1.tar.gz
MD5 sum: 9e251c0a618ad0824b51117d5d9db87e
- Grep (3.11) - 1,664 KB:
Home page: https://www.gnu.org/software/grep/
Download: https://ftp.gnu.org/gnu/grep/grep-3.11.tar.xz
MD5 sum: 7c9bbd74492131245f7cdb291fa142c0
- Groff (1.23.0) - 7,259 KB:
Home page: https://www.gnu.org/software/groff/
Download: https://ftp.gnu.org/gnu/groff/groff-1.23.0.tar.gz
MD5 sum: 5e4f40315a22bb8a158748e7d5094c7d
- GRUB (2.12) - 6,524 KB:
Home page: https://www.gnu.org/software/grub/
Download: https://ftp.gnu.org/gnu/grub/grub-2.12.tar.xz
MD5 sum: 60c564b1bdc39d8e43b3aab4bc0fb140
- Gzip (1.13) - 819 KB:
Home page: https://www.gnu.org/software/gzip/
Download: https://ftp.gnu.org/gnu/gzip/gzip-1.13.tar.xz
MD5 sum: d5c9fc9441288817a4a0be2da0249e29
- Iana-Etc (20240806) - 590 KB:
Home page: https://www.iana.org/protocols
Download: https://github.com/Mic92/iana-etc/releases/download/20240806/iana-etc-20240806.tar.gz
MD5 sum: ea3c37c00d22f1159fc3b7d988de8476
- Inetutils (2.5) - 1,632 KB:
Home page: https://www.gnu.org/software/inetutils/
Download: https://ftp.gnu.org/gnu/inetutils/inetutils-2.5.tar.xz
MD5 sum: 9e5a6dfd2d794dc056a770e8ad4a9263
- Intltool (0.51.0) - 159 KB:
Home page: https://freedesktop.org/wiki/Software/intltool
Download: https://launchpad.net/intltool/trunk/0.51.0/+download/intltool-0.51.0.tar.gz
MD5 sum: 12e517cac2b57a0121cda351570f1e63
- IPRoute2 (6.10.0) - 900 KB:
Home page: https://www.kernel.org/pub/linux/utils/net/iproute2/
Download: https://www.kernel.org/pub/linux/utils/net/iproute2/iproute2-6.10.0.tar.xz
MD5 sum: 6282e47de9c5b230e83537fba7181c9c
25

- Jinja2 (3.1.4) - 235 KB:
Home page: https://jinja.palletsprojects.com/en/3.1.x/
Download: https://pypi.org/packages/source/J/Jinja2/jinja2-3.1.4.tar.gz
MD5 sum: 02ca9a6364c92e83d14b037bef4732bc
- Kbd (2.6.4) - 1,470 KB:
Home page: https://kbd-project.org/
Download: https://www.kernel.org/pub/linux/utils/kbd/kbd-2.6.4.tar.xz
MD5 sum: e2fd7adccf6b1e98eb1ae8d5a1ce5762
- Kmod (33) - 503 KB:
Home page: https://github.com/kmod-project/kmod
Download: https://www.kernel.org/pub/linux/utils/kernel/kmod/kmod-33.tar.xz
MD5 sum: c451c4aa61521adbe8af147f498046f8
- Less (661) - 634 KB:
Home page: https://www.greenwoodsoftware.com/less/
Download: https://www.greenwoodsoftware.com/less/less-661.tar.gz
MD5 sum: 44f54b6313c5d71fa1ac224d8d84766a
- LFS-Bootscripts (20240825) - 34 KB:
Download: https://www.linuxfromscratch.org/lfs/downloads/12.2/lfs-bootscripts-20240825.tar.xz
MD5 sum: 4dd8a52530eec8f8a544f833e2a82eaf
- Libcap (2.70) - 187 KB:
Home page: https://sites.google.com/site/fullycapable/
Download: https://www.kernel.org/pub/linux/libs/security/linux-privs/libcap2/libcap-2.70.tar.xz
MD5 sum: df0e20c6eeca849347b87d5d6a8870c0
- Libffi (3.4.6) - 1,360 KB:
Home page: https://sourceware.org/libffi/
Download: https://github.com/libffi/libffi/releases/download/v3.4.6/libffi-3.4.6.tar.gz
MD5 sum: b9cac6c5997dca2b3787a59ede34e0eb
- Libpipeline (1.5.7) - 956 KB:
Home page: https://libpipeline.nongnu.org/
Download: https://download.savannah.gnu.org/releases/libpipeline/libpipeline-1.5.7.tar.gz
MD5 sum: 1a48b5771b9f6c790fb4efdb1ac71342
- Libtool (2.4.7) - 996 KB:
Home page: https://www.gnu.org/software/libtool/
Download: https://ftp.gnu.org/gnu/libtool/libtool-2.4.7.tar.xz
MD5 sum: 2fc0b6ddcd66a89ed6e45db28fa44232
- Libxcrypt (4.4.36) - 610 KB:
Home page: https://github.com/besser82/libxcrypt/
Download: https://github.com/besser82/libxcrypt/releases/download/v4.4.36/libxcrypt-4.4.36.tar.xz
MD5 sum: b84cd4104e08c975063ec6c4d0372446
26

- Linux (6.10.5) - 141,739 KB:
Home page: https://www.kernel.org/
Download: https://www.kernel.org/pub/linux/kernel/v6.x/linux-6.10.5.tar.xz
MD5 sum: 276ef1f11ed3713ec5d6f506ff55ac12

The Linux kernel is updated quite frequently, many times due to discoveries of security vulnerabilities. The
latest available stable kernel version may be used, unless the errata page says otherwise.
For users with limited speed or expensive bandwidth who wish to update the Linux kernel, a baseline
version of the package and patches can be downloaded separately. This may save some time or cost for a
subsequent patch level upgrade within a minor release.
- Lz4 (1.10.0) - 379 KB:
Home page: https://lz4.org/
Download: https://github.com/lz4/lz4/releases/download/v1.10.0/lz4-1.10.0.tar.gz
MD5 sum: dead9f5f1966d9ae56e1e32761e4e675
- M4 (1.4.19) - 1,617 KB:
Home page: https://www.gnu.org/software/m4/
Download: https://ftp.gnu.org/gnu/m4/m4-1.4.19.tar.xz
MD5 sum: 0d90823e1426f1da2fd872df0311298d
- Make (4.4.1) - 2,300 KB:
Home page: https://www.gnu.org/software/make/
Download: https://ftp.gnu.org/gnu/make/make-4.4.1.tar.gz
MD5 sum: c8469a3713cbbe04d955d4ae4be23eeb
- Man-DB (2.12.1) - 1,994 KB:
Home page: https://www.nongnu.org/man-db/
Download: https://download.savannah.gnu.org/releases/man-db/man-db-2.12.1.tar.xz
MD5 sum: 7b044e5020aab89db41ac7ee59d6d84a
- Man-pages (6.9.1) - 1,821 KB:
Home page: https://www.kernel.org/doc/man-pages/
Download: https://www.kernel.org/pub/linux/docs/man-pages/man-pages-6.9.1.tar.xz
MD5 sum: 4d56775b6cce4edf1e496249e7c01c1a
- MarkupSafe (2.1.5) - 19 KB:
Home page: https://palletsprojects.com/p/markupsafe/
Download: https://pypi.org/packages/source/M/MarkupSafe/MarkupSafe-2.1.5.tar.gz
MD5 sum: 8fe7227653f2fb9b1ffe7f9f2058998a
- Meson (1.5.1) - 2,205 KB:
Home page: https://mesonbuild.com
Download: https://github.com/mesonbuild/meson/releases/download/1.5.1/meson-1.5.1.tar.gz
MD5 sum: c4f2b3e5ea632685f61ba1b833c4905c
- MPC (1.3.1) - 756 KB:
Home page: https://www.multiprecision.org/
Download: https://ftp.gnu.org/gnu/mpc/mpc-1.3.1.tar.gz
MD5 sum: 5c9bc658c9fd0f940e8e3e0f09530c62
27

- MPFR (4.2.1) - 1,459 KB:
Home page: https://www.mpfr.org/
Download: https://ftp.gnu.org/gnu/mpfr/mpfr-4.2.1.tar.xz
MD5 sum: 523c50c6318dde6f9dc523bc0244690a
- Ncurses (6.5) - 2,156 KB:
Home page: https://www.gnu.org/software/ncurses/
Download: https://invisible-mirror.net/archives/ncurses/ncurses-6.5.tar.gz
MD5 sum: ac2d2629296f04c8537ca706b6977687
- Ninja (1.12.1) - 235 KB:
Home page: https://ninja-build.org/
Download: https://github.com/ninja-build/ninja/archive/v1.12.1/ninja-1.12.1.tar.gz
MD5 sum: 6288992b05e593a391599692e2f7e490
- OpenSSL (3.3.1) - 17,633 KB:
Home page: https://www.openssl.org/
Download: https://www.openssl.org/source/openssl-3.3.1.tar.gz
MD5 sum: 8a4342b399c18f870ca6186299195984
- Patch (2.7.6) - 766 KB:
Home page: https://savannah.gnu.org/projects/patch/
Download: https://ftp.gnu.org/gnu/patch/patch-2.7.6.tar.xz
MD5 sum: 78ad9937e4caadcba1526ef1853730d5
- Perl (5.40.0) - 13,481 KB:
Home page: https://www.perl.org/
Download: https://www.cpan.org/src/5.0/perl-5.40.0.tar.xz
MD5 sum: cfe14ef0709b9687f9c514042e8e1e82
- Pkgconf (2.3.0) - 309 KB:
Home page: https://github.com/pkgconf/pkgconf
Download: https://distfiles.ariadne.space/pkgconf/pkgconf-2.3.0.tar.xz
MD5 sum: 833363e77b5bed0131c7bc4cc6f7747b
- Procps (4.0.4) - 1,369 KB:
Home page: https://gitlab.com/procps-ng/procps/
Download: https://sourceforge.net/projects/procps-ng/files/Production/procps-ng-4.0.4.tar.xz
MD5 sum: 2f747fc7df8ccf402d03e375c565cf96
- Psmisc (23.7) - 423 KB:
Home page: https://gitlab.com/psmisc/psmisc
Download: https://sourceforge.net/projects/psmisc/files/psmisc/psmisc-23.7.tar.xz
MD5 sum: 53eae841735189a896d614cba440eb10
- Python (3.12.5) - 19,944 KB:
Home page: https://www.python.org/
Download: https://www.python.org/ftp/python/3.12.5/Python-3.12.5.tar.xz
MD5 sum: 02c7d269e077f4034963bba6befdc715
- Python Documentation (3.12.5) - 8,188 KB:
Download: https://www.python.org/ftp/python/doc/3.12.5/python-3.12.5-docs-html.tar.bz2
MD5 sum: 52274d813236ca4a972fb6988480dc56
28

- Readline (8.2.13) - 2,974 KB:
Home page: https://tiswww.case.edu/php/chet/readline/rltop.html
Download: https://ftp.gnu.org/gnu/readline/readline-8.2.13.tar.gz
MD5 sum: 05080bf3801e6874bb115cd6700b708f
- Sed (4.9) - 1,365 KB:
Home page: https://www.gnu.org/software/sed/
Download: https://ftp.gnu.org/gnu/sed/sed-4.9.tar.xz
MD5 sum: 6aac9b2dbafcd5b7a67a8a9bcb8036c3
- Setuptools (72.2.0) - 2,363 KB:
Home page: https://pypi.org/project/setuptools/
Download: https://pypi.org/packages/source/s/setuptools/setuptools-72.2.0.tar.gz
MD5 sum: 2e0ffd0f6fc632a11442b79d9b1c68bd
- Shadow (4.16.0) - 2,154 KB:
Home page: https://github.com/shadow-maint/shadow/
Download: https://github.com/shadow-maint/shadow/releases/download/4.16.0/shadow-4.16.0.tar.xz
MD5 sum: eb70bad3316d08f0d3bb3d4bbeccb3b4
- Sysklogd (2.6.1) - 452 KB:
Home page: https://www.infodrom.org/projects/sysklogd/
Download: https://github.com/troglobit/sysklogd/releases/download/v2.6.1/sysklogd-2.6.1.tar.gz
MD5 sum: dcf0836a0fcc6568efaad230850d9c86
- Systemd (256.4) - 15,291 KB:
Home page: https://www.freedesktop.org/wiki/Software/systemd/
Download: https://github.com/systemd/systemd/archive/v256.4/systemd-256.4.tar.gz
MD5 sum: 03bd1ff158ec0bc55428c77a8f8495bd
- Systemd Man Pages (256.4) - 676 KB:
Home page: https://www.freedesktop.org/wiki/Software/systemd/
Download: https://anduin.linuxfromscratch.org/LFS/systemd-man-pages-256.4.tar.xz
MD5 sum: 8dbcf0ff0d8e5e9d3565f9d2fc153310

The Linux From Scratch team generates its own tarball of the man pages using the systemd source. This is
done in order to avoid unnecessary dependencies.
- SysVinit (3.10) - 235 KB:
Home page: https://savannah.nongnu.org/projects/sysvinit
Download: https://github.com/slicer69/sysvinit/releases/download/3.10/sysvinit-3.10.tar.xz
MD5 sum: b8fbe11062cf16d3b6a3709b7f6978d2
- Tar (1.35) - 2,263 KB:
Home page: https://www.gnu.org/software/tar/
Download: https://ftp.gnu.org/gnu/tar/tar-1.35.tar.xz
MD5 sum: a2d8042658cfd8ea939e6d911eaf4152
29

- Tcl (8.6.14) - 11,355 KB:
Home page: https://tcl.sourceforge.net/
Download: https://downloads.sourceforge.net/tcl/tcl8.6.14-src.tar.gz
MD5 sum: c30b57c6051be28fa928d09aca82841e
- Tcl Documentation (8.6.14) - 1,167 KB:
Download: https://downloads.sourceforge.net/tcl/tcl8.6.14-html.tar.gz
MD5 sum: 5467198f8d57c54835bf80b98ffb0170
- Texinfo (7.1) - 5,416 KB:
Home page: https://www.gnu.org/software/texinfo/
Download: https://ftp.gnu.org/gnu/texinfo/texinfo-7.1.tar.xz
MD5 sum: edd9928b4a3f82674bcc3551616eef3b
- Time Zone Data (2024a) - 444 KB:
Home page: https://www.iana.org/time-zones
Download: https://www.iana.org/time-zones/repository/releases/tzdata2024a.tar.gz
MD5 sum: 2349edd8335245525cc082f2755d5bf4
- Udev-lfs Tarball (udev-lfs-20230818) - 10 KB:
Download: https://anduin.linuxfromscratch.org/LFS/udev-lfs-20230818.tar.xz
MD5 sum: acd4360d8a5c3ef320b9db88d275dae6
- Util-linux (2.40.2) - 8,648 KB:
Home page: https://git.kernel.org/pub/scm/utils/util-linux/util-linux.git/
Download: https://www.kernel.org/pub/linux/utils/util-linux/v2.40/util-linux-2.40.2.tar.xz
MD5 sum: 88faefc8fefced097e58142077a3d14e
- Vim (9.1.0660) - 17,629 KB:
Home page: https://www.vim.org
Download: https://github.com/vim/vim/archive/v9.1.0660/vim-9.1.0660.tar.gz
MD5 sum: c512a99b3704f193be1a181cc644b2b2

The version of vim changes daily. To get the latest version, go to https://github.com/vim/vim/tags.
- Wheel (0.44.0) - 99 KB:
Home page: https://pypi.org/project/wheel/
Download: https://pypi.org/packages/source/w/wheel/wheel-0.44.0.tar.gz
MD5 sum: 440ff4fe51579b7ed16f02af8f8d9494
- XML::Parser (2.47) - 276 KB:
Home page: https://github.com/chorny/XML-Parser
Download: https://cpan.metacpan.org/authors/id/T/TO/TODDR/XML-Parser-2.47.tar.gz
MD5 sum: 89a8e82cfd2ad948b349c0a69c494463
- Xz Utils (5.6.2) - 1,277 KB:
Home page: https://tukaani.org/xz
Download: https://github.com//tukaani-project/xz/releases/download/v5.6.2/xz-5.6.2.tar.xz
MD5 sum: bbf73fb28425cebb854328599f85c4cf
30

- Zlib (1.3.1) - 1,478 KB:
Home page: https://zlib.net/
Download: https://zlib.net/fossils/zlib-1.3.1.tar.gz
MD5 sum: 9855b6d802d7fe5b7bd5b196a2271655
- Zstd (1.5.6) - 2,351 KB:
Home page: https://facebook.github.io/zstd/
Download: https://github.com/facebook/zstd/releases/download/v1.5.6/zstd-1.5.6.tar.gz
MD5 sum: 5a473726b3445d0e5d6296afd1ab6854
Total size of these packages: about 517 MB

### 3.3 Needed Patches
In addition to the packages, several patches are also required. These patches correct any mistakes in the packages that
should be fixed by the maintainer. The patches also make small modifications to make the packages easier to work
with. The following patches will be needed to build an LFS system:
- Bzip2 Documentation Patch - 1.6 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/bzip2-1.0.8-install_docs-1.patch
MD5 sum: 6a5ac7e89b791aae556de0f745916f7f
- Coreutils Internationalization Fixes Patch - 164 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/coreutils-9.5-i18n-2.patch
MD5 sum: 58961caf5bbdb02462591fa506c73b6d
- Expect GCC14 Patch - 7.8 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/expect-5.45.4-gcc14-1.patch
MD5 sum: 0b8b5ac411d011263ad40b0664c669f0
- Glibc FHS Patch - 2.8 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/glibc-2.40-fhs-1.patch
MD5 sum: 9a5997c3452909b1769918c759eff8a2
- Kbd Backspace/Delete Fix Patch - 12 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/kbd-2.6.4-backspace-1.patch
MD5 sum: f75cca16a38da6caa7d52151f7136895
- SysVinit Consolidated Patch - 2.5 KB:
Download: https://www.linuxfromscratch.org/patches/lfs/12.2/sysvinit-3.10-consolidated-1.patch
MD5 sum: 17ffccbb8e18c39e8cedc32046f3a475
Total size of these patches: about 190.7 KB
In addition to the above required patches, there exist a number of optional patches created by the LFS community. These
optional patches solve minor problems or enable functionality that is not enabled by default. Feel free to peruse the
patches database located at https://www.linuxfromscratch.org/patches/downloads/ and acquire any additional patches
to suit your system needs.

31

## Chapter 4. Final Preparations
### 4.1 Introduction
In this chapter, we will perform a few additional tasks to prepare for building the temporary system. We will create a set
of directories in $LFS (in which we will install the temporary tools), add an unprivileged user, and create an appropriate
build environment for that user. We will also explain the units of time (“SBUs”) we use to measure how long it takes
to build LFS packages, and provide some information about package test suites.

### 4.2 Creating a Limited Directory Layout in the LFS Filesystem
In this section, we begin populating the LFS filesystem with the pieces that will constitute the final Linux system.
The first step is to create a limited directory hierarchy, so that the programs compiled in Chapter 6 (as well as glibc
and libstdc++ in Chapter 5) can be installed in their final location. We do this so those temporary programs will be
overwritten when the final versions are built in Chapter 8.
Create the required directory layout by issuing the following commands as root:
mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}
for i in bin lib sbin; do
ln -sv usr/$i $LFS/$i
x86_64) mkdir -pv $LFS/lib64 ;;

Programs in Chapter 6 will be compiled with a cross-compiler (more details can be found in section Toolchain Technical
Notes). This cross-compiler will be installed in a special directory, to separate it from the other programs. Still acting
as root, create that directory with this command:
mkdir -pv $LFS/tools

The LFS editors have deliberately decided not to use a /usr/lib64 directory. Several steps are taken to be
sure the toolchain will not use it. If for any reason this directory appears (either because you made an error
in following the instructions, or because you installed a binary package that created it after finishing LFS), it
may break your system. You should always be sure this directory does not exist.

### 4.3 Adding the LFS User
When logged in as user root, making a single mistake can damage or destroy a system. Therefore, the packages in the
next two chapters are built as an unprivileged user. You could use your own user name, but to make it easier to set up
a clean working environment, we will create a new user called lfs as a member of a new group (also named lfs) and
run commands as lfs during the installation process. As root, issue the following commands to add the new user:
groupadd lfs
useradd -s /bin/bash -g lfs -m -k /dev/null lfs

This is what the command line options mean:
-s /bin/bash

This makes bash the default shell for user lfs.
32

-g lfs

This option adds user lfs to group lfs.
-m

This creates a home directory for lfs.
-k /dev/null

This parameter prevents possible copying of files from a skeleton directory (the default is /etc/skel) by changing
the input location to the special null device.

This is the name of the new user.
If you want to log in as lfs or switch to lfs from a non-root user (as opposed to switching to user lfs when logged in
as root, which does not require the lfs user to have a password), you need to set a password for lfs. Issue the following
command as the root user to set the password:
passwd lfs

Grant lfs full access to all the directories under $LFS by making lfs the owner:
chown -v lfs $LFS/{usr{,/*},lib,var,etc,bin,sbin,tools}
x86_64) chown -v lfs $LFS/lib64 ;;

In some host systems, the following su command does not complete properly and suspends the login for the
lfs user to the background. If the prompt "lfs:~$" does not appear immediately, entering the fg command
will fix the issue.
Next, start a shell running as user lfs. This can be done by logging in as lfs on a virtual console, or with the following
substitute/switch user command:
su - lfs

The “-” instructs su to start a login shell as opposed to a non-login shell. The difference between these two types of
shells is described in detail in bash(1) and info bash.

### 4.4 Setting Up the Environment
Set up a good working environment by creating two new startup files for the bash shell. While logged in as user lfs,
issue the following command to create a new .bash_profile:
cat > ~/.bash_profile << "EOF"
exec env -i HOME=$HOME TERM=$TERM PS1='\u:\w\$ ' /bin/bash

When logged on as user lfs, or when switched to the lfs user using an su command with the “-” option, the initial shell
is a login shell which reads the /etc/profile of the host (probably containing some settings and environment variables)
and then .bash_profile. The exec env -i.../bin/bash command in the .bash_profile file replaces the running shell with
a new one with a completely empty environment, except for the HOME, TERM, and PS1 variables. This ensures that no
unwanted and potentially hazardous environment variables from the host system leak into the build environment.
33

The new instance of the shell is a non-login shell, which does not read, and execute, the contents of the /etc/profile
or .bash_profile files, but rather reads, and executes, the .bashrc file instead. Create the .bashrc file now:
cat > ~/.bashrc << "EOF"
set +h
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LFS/tools/bin:$PATH
CONFIG_SITE=$LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE

The meaning of the settings in .bashrc
set +h

The set +h command turns off bash's hash function. Hashing is ordinarily a useful feature—bash uses a hash
table to remember the full path to executable files to avoid searching the PATH time and again to find the same
executable. However, the new tools should be used as soon as they are installed. Switching off the hash function
forces the shell to search the PATH whenever a program is to be run. As such, the shell will find the newly compiled
tools in $LFS/tools/bin as soon as they are available without remembering a previous version of the same program
provided by the host distro, in /usr/bin or /bin.
umask 022

Setting the user file-creation mask (umask) to 022 ensures that newly created files and directories are only writable
by their owner, but are readable and executable by anyone (assuming default modes are used by the open(2) system
call, new files will end up with permission mode 644 and directories with mode 755).
LFS=/mnt/lfs

The LFS variable should be set to the chosen mount point.
LC_ALL=POSIX

The LC_ALL variable controls the localization of certain programs, making their messages follow the conventions
of a specified country. Setting LC_ALL to “POSIX” or “C” (the two are equivalent) ensures that everything will
work as expected in the cross-compilation environment.
LFS_TGT=$(uname -m)-lfs-linux-gnu

The LFS_TGT variable sets a non-default, but compatible machine description for use when building our crosscompiler and linker and when cross-compiling our temporary toolchain. More information is provided by
Toolchain Technical Notes.
PATH=/usr/bin

Many modern Linux distributions have merged /bin and /usr/bin. When this is the case, the standard PATH variable
should be set to /usr/bin/ for the Chapter 6 environment. When this is not the case, the following line adds /
bin to the path.
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi

If /bin is not a symbolic link, it must be added to the PATH variable.
PATH=$LFS/tools/bin:$PATH

By putting $LFS/tools/bin ahead of the standard PATH, the cross-compiler installed at the beginning of Chapter 5
is picked up by the shell immediately after its installation. This, combined with turning off hashing, limits the risk
that the compiler from the host is used instead of the cross-compiler.
34

CONFIG_SITE=$LFS/usr/share/config.site

In Chapter 5 and Chapter 6, if this variable is not set, configure scripts may attempt to load configuration items
specific to some distributions from /usr/share/config.site on the host system. Override it to prevent potential
contamination from the host.
export ...

While the preceding commands have set some variables, in order to make them visible within any sub-shells, we
export them.

Several commercial distributions add an undocumented instantiation of /etc/bash.bashrc to the initialization
of bash. This file has the potential to modify the lfs user's environment in ways that can affect the building
of critical LFS packages. To make sure the lfs user's environment is clean, check for the presence of /etc/
bash.bashrc and, if present, move it out of the way. As the root user, run:
[ ! -e /etc/bash.bashrc ] || mv -v /etc/bash.bashrc /etc/bash.bashrc.NOUSE

When the lfs user is no longer needed (at the beginning of Chapter 7), you may safely restore /etc/bash.
bashrc (if desired).
Note that the LFS Bash package we will build in Section 8.36, “Bash-5.2.32” is not configured to load or
execute /etc/bash.bashrc, so this file is useless on a completed LFS system.
For many modern systems with multiple processors (or cores) the compilation time for a package can be reduced by
performing a "parallel make" by telling the make program how many processors are available via a command line
option or an environment variable. For instance, an Intel Core i9-13900K processor has 8 P (performance) cores and 16
E (efficiency) cores, and a P core can simultaneously run two threads so each P core are modeled as two logical cores
by the Linux kernel. As the result there are 32 logical cores in total. One obvious way to use all these logical cores is
allowing make to spawn up to 32 build jobs. This can be done by passing the -j32 option to make:
make -j32

Or set the MAKEFLAGS environment variable and its content will be automatically used by make as command line options:
export MAKEFLAGS=-j32

Never pass a -j option without a number to make or set such an option in MAKEFLAGS. Doing so will allow
make to spawn infinite build jobs and cause system stability problems.
To use all logical cores available for building packages in Chapter 5 and Chapter 6, set MAKEFLAGS now in .bashrc:
cat >> ~/.bashrc << "EOF"
export MAKEFLAGS=-j$(nproc)

Replace $(nproc) with the number of logical cores you want to use if you don't want to use all the logical cores.
Finally, to ensure the environment is fully prepared for building the temporary tools, force the bash shell to read the
new user profile:
source ~/.bash_profile

35

### 4.5 About SBUs
Many people would like to know beforehand approximately how long it takes to compile and install each package.
Because Linux From Scratch can be built on many different systems, it is impossible to provide absolute time estimates.
The biggest package (gcc) will take approximately 5 minutes on the fastest systems, but could take days on slower
systems! Instead of providing actual times, the Standard Build Unit (SBU) measure will be used instead.
The SBU measure works as follows. The first package to be compiled is binutils in Chapter 5. The time it takes to
compile using one core is what we will refer to as the Standard Build Unit or SBU. All other compile times will be
expressed in terms of this unit of time.
For example, consider a package whose compilation time is 4.5 SBUs. This means that if your system took 4 minutes
to compile and install the first pass of binutils, it will take approximately 18 minutes to build the example package.
Fortunately, most build times are shorter than one SBU.
SBUs are not entirely accurate because they depend on many factors, including the host system's version of GCC. They
are provided here to give an estimate of how long it might take to install a package, but the numbers can vary by as
much as dozens of minutes in some cases.
On some newer systems, the motherboard is capable of controlling the system clock speed. This can be controlled
with a command such as powerprofilesctl. This is not available in LFS, but may be available on the host distro. After
LFS is complete, it can be added to a system with the procedures at the BLFS power-profiles-daemon page. Before
measuring the build time of any package it is advisable to use a system power profile set for maximum performance
(and maximum power consumption). Otherwise the measured SBU value may be inaccurate because the system may
react differently when building binutils-pass1 or other packages. Be aware that a significant inaccuracy can still show
up even if the same profile is used for both packages because the system may respond slower if the system is idle when
starting the build procedure. Setting the power profile to “performance” will minimize this problem. And obviously
doing so will also make the system build LFS faster.
If powerprofilesctl is available, issue the powerprofilesctl set performance command to select the performance
profile. Some distros provides the tuned-adm command for managing the profiles instead of powerprofilesctl, on these
distros issue the tuned-adm profile throughput-performance command to select the throughput-performance profile.

When multiple processors are used in this way, the SBU units in the book will vary even more than they
normally would. In some cases, the make step will simply fail. Analyzing the output of the build process will
also be more difficult because the lines from different processes will be interleaved. If you run into a problem
with a build step, revert to a single processor build to properly analyze the error messages.
The times presented here for all packages (except binutils-pass1 which is based on one core) are based upon
using four cores (-j4). The times in Chapter 8 also include the time to run the regression tests for the package
unless specified otherwise.

### 4.6 About the Test Suites
Most packages provide a test suite. Running the test suite for a newly built package is a good idea because it can provide
a “sanity check” indicating that everything compiled correctly. A test suite that passes its set of checks usually proves
that the package is functioning as the developer intended. It does not, however, guarantee that the package is totally
bug free.
36

Some test suites are more important than others. For example, the test suites for the core toolchain packages—GCC,
binutils, and glibc—are of the utmost importance due to their central role in a properly functioning system. The test
suites for GCC and glibc can take a very long time to complete, especially on slower hardware, but are strongly
recommended.

Running the test suites in Chapter 5 and Chapter 6 is pointless; since the test programs are compiled with a
cross-compiler, they probably can't run on the build host.
A common issue with running the test suites for binutils and GCC is running out of pseudo terminals (PTYs). This can
result in a large number of failing tests. This may happen for several reasons, but the most likely cause is that the host
system does not have the devpts file system set up correctly. This issue is discussed in greater detail at https://www.
linuxfromscratch.org/lfs/faq.html#no-ptys.
Sometimes package test suites will fail for reasons which the developers are aware of and have deemed non-critical.
Consult the logs located at https://www.linuxfromscratch.org/lfs/build-logs/12.2/ to verify whether or not these failures
are expected. This site is valid for all test suites throughout this book.

37

Part III. Building the LFS Cross
Toolchain and Temporary Tools

Important Preliminary Material
Introduction
This part is divided into three stages: first, building a cross compiler and its associated libraries; second, using this
cross toolchain to build several utilities in a way that isolates them from the host distribution; and third, entering the
chroot environment (which further improves host isolation) and constructing the remaining tools needed to build the
final system.

This is where the real work of building a new system begins. Be very careful to follow the instructions
exactly as the book shows them. You should try to understand what each command does, and no matter how
eager you are to finish your build, you should refrain from blindly typing the commands as shown. Read
the documentation when there is something you do not understand. Also, keep track of your typing and of
the output of commands, by using the tee utility to send the terminal output to a file. This makes debugging
easier if something goes wrong.
The next section is a technical introduction to the build process, while the following one presents very important
general instructions.

Toolchain Technical Notes
This section explains some of the rationale and technical details behind the overall build method. Don't try to
immediately understand everything in this section. Most of this information will be clearer after performing an actual
build. Come back and re-read this chapter at any time during the build process.
The overall goal of Chapter 5 and Chapter 6 is to produce a temporary area containing a set of tools that are known to
be good, and that are isolated from the host system. By using the chroot command, the compilations in the remaining
chapters will be isolated within that environment, ensuring a clean, trouble-free build of the target LFS system. The
build process has been designed to minimize the risks for new readers, and to provide the most educational value at
the same time.
This build process is based on cross-compilation. Cross-compilation is normally used to build a compiler and its
associated toolchain for a machine different from the one that is used for the build. This is not strictly necessary for
LFS, since the machine where the new system will run is the same as the one used for the build. But cross-compilation
has one great advantage: anything that is cross-compiled cannot depend on the host environment.

About Cross-Compilation
The LFS book is not (and does not contain) a general tutorial to build a cross- (or native) toolchain. Don't
use the commands in the book for a cross-toolchain for some purpose other than building LFS, unless you
really understand what you are doing.
Cross-compilation involves some concepts that deserve a section of their own. Although this section may be omitted
on a first reading, coming back to it later will help you gain a fuller understanding of the process.
Let us first define some terms used in this context.
39

The build
is the machine where we build programs. Note that this machine is also referred to as the “host.”
The host
is the machine/system where the built programs will run. Note that this use of “host” is not the same as in other
sections.
The target
is only used for compilers. It is the machine the compiler produces code for. It may be different from both the
build and the host.
As an example, let us imagine the following scenario (sometimes referred to as “Canadian Cross”). We have a compiler
on a slow machine only, let's call it machine A, and the compiler ccA. We also have a fast machine (B), but no compiler
for (B), and we want to produce code for a third, slow machine (C). We will build a compiler for machine C in three
stages.

A

A

B

crosscompiler
cc1 using
ccA on
A.

A

B

crosscompiler
cc2 using
cc1 on
A.

B

compiler
ccC using
cc2 on
B.

Then, all the programs needed by machine C can be compiled using cc2 on the fast machine B. Note that unless B can
run programs produced for C, there is no way to test the newly built programs until machine C itself is running. For
example, to run a test suite on ccC, we may want to add a fourth stage:

Rebuild
and test
ccC using
ccC on
C.

40

In the example above, only cc1 and cc2 are cross-compilers, that is, they produce code for a machine different from the
one they are run on. The other compilers ccA and ccC produce code for the machine they are run on. Such compilers
are called native compilers.

Implementation of Cross-Compilation for LFS
All the cross-compiled packages in this book use an autoconf-based building system. The autoconf-based
building system accepts system types in the form cpu-vendor-kernel-os, referred to as the system triplet. Since
the vendor field is often irrelevant, autoconf lets you omit it.
An astute reader may wonder why a “triplet” refers to a four component name. The kernel field and the
os field began as a single “system” field. Such a three-field form is still valid today for some systems, for
example, x86_64-unknown-freebsd. But two systems can share the same kernel and still be too different to use
the same triplet to describe them. For example, Android running on a mobile phone is completely different
from Ubuntu running on an ARM64 server, even though they are both running on the same type of CPU
(ARM64) and using the same kernel (Linux).
Without an emulation layer, you cannot run an executable for a server on a mobile phone or vice versa. So
the “system” field has been divided into kernel and os fields, to designate these systems unambiguously. In
our example, the Android system is designated aarch64-unknown-linux-android, and the Ubuntu system is
designated aarch64-unknown-linux-gnu.
The word “triplet” remains embedded in the lexicon. A simple way to determine your system triplet is to run
the config.guess script that comes with the source for many packages. Unpack the binutils sources, run the
script ./config.guess, and note the output. For example, for a 32-bit Intel processor the output will be i686pc-linux-gnu. On a 64-bit system it will be x86_64-pc-linux-gnu. On most Linux systems the even simpler
gcc -dumpmachine command will give you similar information.
You should also be aware of the name of the platform's dynamic linker, often referred to as the dynamic
loader (not to be confused with the standard linker ld that is part of binutils). The dynamic linker provided by
package glibc finds and loads the shared libraries needed by a program, prepares the program to run, and then
runs it. The name of the dynamic linker for a 32-bit Intel machine is ld-linux.so.2; it's ld-linux-x86-64.
so.2 on 64-bit systems. A sure-fire way to determine the name of the dynamic linker is to inspect a random
binary from the host system by running: readelf -l <name of binary> | grep interpreter and noting the
output. The authoritative reference covering all platforms is in a Glibc wiki page.
In order to fake a cross-compilation in LFS, the name of the host triplet is slightly adjusted by changing the "vendor"
field in the LFS_TGT variable so it says "lfs". We also use the --with-sysroot option when building the cross-linker and
cross-compiler, to tell them where to find the needed host files. This ensures that none of the other programs built in
Chapter 6 can link to libraries on the build machine. Only two stages are mandatory, plus one more for tests.

pc

pc

crosscompiler
cc1 using
cc-pc on
pc.

41

2

pc

compiler
cc-lfs
using cc1
on pc.

3

Rebuild
and test
cc-lfs
using cclfs on lfs.

In the preceding table, “on pc” means the commands are run on a machine using the already installed distribution. “On
lfs” means the commands are run in a chrooted environment.
This is not yet the end of the story. The C language is not merely a compiler; it also defines a standard library. In this
book, the GNU C library, named glibc, is used (there is an alternative, "musl"). This library must be compiled for the
LFS machine; that is, using the cross-compiler cc1. But the compiler itself uses an internal library providing complex
subroutines for functions not available in the assembler instruction set. This internal library is named libgcc, and it must
be linked to the glibc library to be fully functional. Furthermore, the standard library for C++ (libstdc++) must also be
linked with glibc. The solution to this chicken and egg problem is first to build a degraded cc1-based libgcc, lacking
some functionalities such as threads and exception handling, and then to build glibc using this degraded compiler (glibc
itself is not degraded), and also to build libstdc++. This last library will lack some of the functionality of libgcc.
The upshot of the preceding paragraph is that cc1 is unable to build a fully functional libstdc++ with the degraded
libgcc, but cc1 is the only compiler available for building the C/C++ libraries during stage 2. There are two reasons we
don't immediately use the compiler built in stage 2, cc-lfs, to build those libraries.
- Generally speaking, cc-lfs cannot run on pc (the host system). Even though the triplets for pc and lfs are
compatible with each other, an executable for lfs must depend on glibc-2.40; the host distro may utilize either a
different implementation of libc (for example, musl), or a previous release of glibc (for example, glibc-2.13).
- Even if cc-lfs can run on pc, using it on pc would create a risk of linking to the pc libraries, since cc-lfs is a native
compiler.
So when we build gcc stage 2, we instruct the building system to rebuild libgcc and libstdc++ with cc1, but we link
libstdc++ to the newly rebuilt libgcc instead of the old, degraded build. This makes the rebuilt libstdc++ fully functional.
In Chapter 8 (or “stage 3”), all the packages needed for the LFS system are built. Even if a package has already been
installed into the LFS system in a previous chapter, we still rebuild the package. The main reason for rebuilding these
packages is to make them stable: if we reinstall an LFS package on a completed LFS system, the reinstalled content of
the package should be the same as the content of the same package when first installed in Chapter 8. The temporary
packages installed in Chapter 6 or Chapter 7 cannot satisfy this requirement, because some of them are built without
optional dependencies, and autoconf cannot perform some feature checks in Chapter 6 because of cross-compilation,
causing the temporary packages to lack optional features, or use suboptimal code routines. Additionally, a minor reason
for rebuilding the packages is to run the test suites.

Other Procedural Details
The cross-compiler will be installed in a separate $LFS/tools directory, since it will not be part of the final system.
42

Binutils is installed first because the configure runs of both gcc and glibc perform various feature tests on the assembler
and linker to determine which software features to enable or disable. This is more important than one might realize at
first. An incorrectly configured gcc or glibc can result in a subtly broken toolchain, where the impact of such breakage
might not show up until near the end of the build of an entire distribution. A test suite failure will usually highlight this
error before too much additional work is performed.
Binutils installs its assembler and linker in two locations, $LFS/tools/bin and $LFS/tools/$LFS_TGT/bin. The tools in
one location are hard linked to the other. An important facet of the linker is its library search order. Detailed information
can be obtained from ld by passing it the --verbose flag. For example, $LFS_TGT-ld --verbose | grep SEARCH will
illustrate the current search paths and their order. (Note that this example can be run as shown only while logged in as
user lfs. If you come back to this page later, replace $LFS_TGT-ld with ld).
The next package installed is gcc. An example of what can be seen during its run of configure is:
checking what assembler to use... /mnt/lfs/tools/i686-lfs-linux-gnu/bin/as
checking what linker to use... /mnt/lfs/tools/i686-lfs-linux-gnu/bin/ld

This is important for the reasons mentioned above. It also demonstrates that gcc's configure script does not search the
PATH directories to find which tools to use. However, during the actual operation of gcc itself, the same search paths
are not necessarily used. To find out which standard linker gcc will use, run: $LFS_TGT-gcc -print-prog-name=ld.
(Again, remove the $LFS_TGT- prefix if coming back to this later.)
Detailed information can be obtained from gcc by passing it the -v command line option while compiling a program. For
example, $LFS_TGT-gcc -v example.c (or without $LFS_TGT- if coming back later) will show detailed information
about the preprocessor, compilation, and assembly stages, including gcc's search paths for included headers and their
order.
Next up: sanitized Linux API headers. These allow the standard C library (glibc) to interface with features that the
Linux kernel will provide.
Next comes glibc. The most important considerations for building glibc are the compiler, binary tools, and kernel
headers. The compiler and binary tools are generally not an issue since glibc will always those relating to the --host
parameter passed to its configure script; e.g., in our case, the compiler will be $LFS_TGT-gcc and the readelf tool
will be $LFS_TGT-readelf. The kernel headers can be a bit more complicated. Therefore, we take no risks and use
the available configure switch to enforce the correct selection. After the run of configure, check the contents of the
config.make file in the build directory for all important details. These items highlight an important aspect of the glibc
package—it is very self-sufficient in terms of its build machinery, and generally does not rely on toolchain defaults.
As mentioned above, the standard C++ library is compiled next, followed in Chapter 6 by other programs that must
be cross-compiled to break circular dependencies at build time. The install step of all those packages uses the DESTDIR
variable to force installation in the LFS filesystem.
At the end of Chapter 6 the native LFS compiler is installed. First binutils-pass2 is built, in the same DESTDIR directory as
the other programs, then the second pass of gcc is constructed, omitting some non-critical libraries. Due to some weird
logic in gcc's configure script, CC_FOR_TARGET ends up as cc when the host is the same as the target, but different from
the build system. This is why CC_FOR_TARGET=$LFS_TGT-gcc is declared explicitly as one of the configuration options.
Upon entering the chroot environment in Chapter 7, the temporary installations of programs needed for the proper
operation of the toolchain are performed. From this point onwards, the core toolchain is self-contained and self-hosted.
In Chapter 8, final versions of all the packages needed for a fully functional system are built, tested, and installed.

43

General Compilation Instructions
During a development cycle of LFS, the instructions in the book are often modified to adapt for a package
update or take the advantage of new features from updated packages. Mixing up the instructions of different
versions of the LFS book can cause subtle breakages. This kind of issue is generally a result from reusing
some script created for a prior LFS release. Such a reuse is strongly discouraged. If you are reusing scripts
for a prior LFS release for any reason, you'll need to be very careful to update the scripts to match current
version of the LFS book.
Here are some things you should know about building each package:
- Several packages are patched before compilation, but only when the patch is needed to circumvent a problem.
A patch is often needed in both the current and the following chapters, but sometimes, when the same package
is built more than once, the patch is not needed right away. Therefore, do not be concerned if instructions for a
downloaded patch seem to be missing. Warning messages about offset or fuzz may also be encountered when
applying a patch. Do not worry about these warnings; the patch was still successfully applied.
- During the compilation of most packages, some warnings will scroll by on the screen. These are normal and can
safely be ignored. These warnings are usually about deprecated, but not invalid, use of the C or C++ syntax. C
standards change fairly often, and some packages have not yet been updated. This is not a serious problem, but it
does cause the warnings to appear.
- Check one last time that the LFS environment variable is set up properly:
echo $LFS

Make sure the output shows the path to the LFS partition's mount point, which is /mnt/lfs, using our example.
- Finally, two important items must be emphasized:

The build instructions assume that the Host System Requirements, including symbolic links, have been
set properly:
- bash is the shell in use.
- sh is a symbolic link to bash.
- /usr/bin/awk is a symbolic link to gawk.
- /usr/bin/yacc is a symbolic link to bison, or to a small script that executes bison.

44

Here is a synopsis of the build process.
1. Place all the sources and patches in a directory that will be accessible from the chroot environment,
such as /mnt/lfs/sources/.
2. Change to the /mnt/lfs/sources/ directory.
## 3. For each package:
a. Using the tar program, extract the package to be built. In Chapter 5 and Chapter 6, ensure you are
the lfs user when extracting the package.
Do not use any method except the tar command to extract the source code. Notably, using the cp
-R command to copy the source code tree somewhere else can destroy timestamps in the source
tree, and cause the build to fail.
b. Change to the directory created when the package was extracted.
c. Follow the instructions for building the package.
d. Change back to the sources directory when the build is complete.
e. Delete the extracted source directory unless instructed otherwise.

45

## Chapter 5. Compiling a Cross-Toolchain
### 5.1 Introduction
This chapter shows how to build a cross-compiler and its associated tools. Although here cross-compilation is faked,
the principles are the same as for a real cross-toolchain.
The programs compiled in this chapter will be installed under the $LFS/tools directory to keep them separate from the
files installed in the following chapters. The libraries, on the other hand, are installed into their final place, since they
pertain to the system we want to build.

46

### 5.2 Binutils-2.43.1 - Pass 1
The Binutils package contains a linker, an assembler, and other tools for handling object files.

1 SBU
677 MB

#### 5.2.1 Installation of Cross Binutils
Go back and re-read the notes in the section titled General Compilation Instructions. Understanding the notes
labeled important can save you a lot of problems later.
It is important that Binutils be the first package compiled because both Glibc and GCC perform various tests on the
available linker and assembler to determine which of their own features to enable.
The Binutils documentation recommends building Binutils in a dedicated build directory:

In order for the SBU values listed in the rest of the book to be of any use, measure the time it takes to build
this package from the configuration, up to and including the first install. To achieve this easily, wrap the
commands in a time command like this: time { ../configure ... && make && make install; }.
Now prepare Binutils for compilation:
../configure --prefix=$LFS/tools \
--with-sysroot=$LFS \
--enable-gprofng=no \
--enable-new-dtags \

--prefix=$LFS/tools

This tells the configure script to prepare to install the Binutils programs in the $LFS/tools directory.
--with-sysroot=$LFS

For cross compilation, this tells the build system to look in $LFS for the target system libraries as needed.

Because the machine description in the LFS_TGT variable is slightly different than the value returned by the
config.guess script, this switch will tell the configure script to adjust binutil's build system for building a cross
linker.

This disables internationalization as i18n is not needed for the temporary tools.
--enable-gprofng=no

This disables building gprofng which is not needed for the temporary tools.
47

This prevents the build from stopping in the event that there are warnings from the host's compiler.
--enable-new-dtags

This makes the linker use the “runpath” tag for embedding library search paths into executables and shared
libraries, instead of the traditional “rpath” tag. It makes debugging dynamically linked executables easier and
works around potential issues in the test suite of some packages.

By default, the linker would generate both the GNU-style hash table and the classic ELF hash table for shared
libraries and dynamically linked executables. The hash tables are only intended for a dynamic linker to perform
symbol lookup. On LFS the dynamic linker (provided by the Glibc package) will always use the GNU-style hash
table which is faster to query. So the classic ELF hash table is completely useless. This makes the linker only
generate the GNU-style hash table by default, so we can avoid wasting time to generate the classic ELF hash table
when we build the packages, or wasting disk space to store it.
Continue with compiling the package:

Details on this package are located in Section 8.20.2, “Contents of Binutils.”

48

### 5.3 GCC-14.2.0 - Pass 1
The GCC package contains the GNU compiler collection, which includes the C and C++ compilers.

3.2 SBU
4.9 GB

#### 5.3.1 Installation of Cross GCC
GCC requires the GMP, MPFR and MPC packages. As these packages may not be included in your host distribution,
they will be built with GCC. Unpack each package into the GCC source directory and rename the resulting directories
so the GCC build procedures will automatically use them:

There are frequent misunderstandings about this chapter. The procedures are the same as every other
chapter, as explained earlier (Package build instructions). First, extract the gcc-14.2.0 tarball from the sources
directory, and then change to the directory created. Only then should you proceed with the instructions below.
tar -xf ../mpfr-4.2.1.tar.xz
mv -v mpfr-4.2.1 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc

On x86_64 hosts, set the default directory name for 64-bit libraries to “lib”:
x86_64)
sed -e '/m64=/s/lib64/lib/' \
-i.orig gcc/config/i386/t-linux64

The GCC documentation recommends building GCC in a dedicated build directory:

49

Prepare GCC for compilation:
--prefix=$LFS/tools
--with-glibc-version=2.40 \
--with-sysroot=$LFS
--with-newlib
--without-headers
--enable-default-pie
--enable-default-ssp
--disable-shared
--disable-threads
--disable-libatomic
--disable-libgomp
--disable-libquadmath
--disable-libssp
--disable-libvtv
--disable-libstdcxx
--enable-languages=c,c++

--with-glibc-version=2.40

This option specifies the version of Glibc which will be used on the target. It is not relevant to the libc of the
host distro because everything compiled by pass1 GCC will run in the chroot environment, which is isolated from
libc of the host distro.
--with-newlib

Since a working C library is not yet available, this ensures that the inhibit_libc constant is defined when building
libgcc. This prevents the compiling of any code that requires libc support.
--without-headers

When creating a complete cross-compiler, GCC requires standard headers compatible with the target system. For
our purposes these headers will not be needed. This switch prevents GCC from looking for them.
--enable-default-pie and --enable-default-ssp

Those switches allow GCC to compile programs with some hardening security features (more information on
those in the note on PIE and SSP in chapter 8) by default. They are not strictly needed at this stage, since the
compiler will only produce temporary executables. But it is cleaner to have the temporary packages be as close
as possible to the final ones.
--disable-shared

This switch forces GCC to link its internal libraries statically. We need this because the shared libraries require
Glibc, which is not yet installed on the target system.

On x86_64, LFS does not support a multilib configuration. This switch is harmless for x86.
--disable-threads, --disable-libatomic, --disable-libgomp, --disable-libquadmath, --disable-libssp, -disable-libvtv, --disable-libstdcxx

These switches disable support for threading, libatomic, libgomp, libquadmath, libssp, libvtv, and the C++ standard
library respectively. These features may fail to compile when building a cross-compiler and are not necessary for
the task of cross-compiling the temporary libc.
--enable-languages=c,c++

This option ensures that only the C and C++ compilers are built. These are the only languages needed now.
50

Compile GCC by running:

This build of GCC has installed a couple of internal system headers. Normally one of them, limits.h, would in turn
include the corresponding system limits.h header, in this case, $LFS/usr/include/limits.h. However, at the time of
this build of GCC $LFS/usr/include/limits.h does not exist, so the internal header that has just been installed is a
partial, self-contained file and does not include the extended features of the system header. This is adequate for building
Glibc, but the full internal header will be needed later. Create a full version of the internal header using a command
that is identical to what the GCC build system does in normal circumstances:

The command below shows an example of nested command substitution using two methods: backquotes and
a $() construct. It could be rewritten using the same method for both substitutions, but is shown this way to
demonstrate how they can be mixed. Generally the $() method is preferred.
cd ..
cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \
`dirname $($LFS_TGT-gcc -print-libgcc-file-name)`/include/limits.h

Details on this package are located in Section 8.29.2, “Contents of GCC.”

51

### 5.4 Linux-6.10.5 API Headers
The Linux API Headers (in linux-6.10.5.tar.xz) expose the kernel's API for use by Glibc.

1.6 GB

#### 5.4.1 Installation of Linux API Headers
The Linux kernel needs to expose an Application Programming Interface (API) for the system's C library (Glibc in
LFS) to use. This is done by way of sanitizing various C header files that are shipped in the Linux kernel source tarball.
Make sure there are no stale files embedded in the package:
make mrproper

Now extract the user-visible kernel headers from the source. The recommended make target “headers_install” cannot
be used, because it requires rsync, which may not be available. The headers are first placed in ./usr, then copied to
the needed location.
make headers
find usr/include -type f ! -name '*.h' -delete
cp -rv usr/include $LFS/usr

#### 5.4.2 Contents of Linux API Headers
Installed headers:

/usr/include/asm/*.h, /usr/include/asm-generic/*.h, /usr/include/drm/*.h, /usr/include/
linux/*.h, /usr/include/misc/*.h, /usr/include/mtd/*.h, /usr/include/rdma/*.h, /usr/
include/scsi/*.h, /usr/include/sound/*.h, /usr/include/video/*.h, and /usr/include/xen/*.h
/usr/include/asm, /usr/include/asm-generic, /usr/include/drm, /usr/include/linux, /usr/
include/misc, /usr/include/mtd, /usr/include/rdma, /usr/include/scsi, /usr/include/sound, /
usr/include/video, and /usr/include/xen

/usr/include/asm/*.h

The Linux API ASM Headers

/usr/include/asm-generic/*.h

The Linux API ASM Generic Headers

/usr/include/drm/*.h

The Linux API DRM Headers

/usr/include/linux/*.h

The Linux API Linux Headers

/usr/include/misc/*.h

The Linux API Miscellaneous Headers

/usr/include/mtd/*.h

The Linux API MTD Headers

/usr/include/rdma/*.h

The Linux API RDMA Headers

/usr/include/scsi/*.h

The Linux API SCSI Headers

/usr/include/sound/*.h

The Linux API Sound Headers

/usr/include/video/*.h

The Linux API Video Headers

/usr/include/xen/*.h

The Linux API Xen Headers

52

### 5.5 Glibc-2.40
The Glibc package contains the main C library. This library provides the basic routines for allocating memory, searching
directories, opening and closing files, reading and writing files, string handling, pattern matching, arithmetic, and so on.

1.3 SBU
828 MB

#### 5.5.1 Installation of Glibc
First, create a symbolic link for LSB compliance. Additionally, for x86_64, create a compatibility symbolic link required
for proper operation of the dynamic library loader:
i?86)
ln -sfv ld-linux.so.2 $LFS/lib/ld-lsb.so.3
x86_64) ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64
ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64/ld-lsb-x86-64.so.3

The above command is correct. The ln command has several syntactic versions, so be sure to check info
coreutils ln and ln(1) before reporting what may appear to be an error.
Some of the Glibc programs use the non-FHS-compliant /var/db directory to store their runtime data. Apply the
following patch to make such programs store their runtime data in the FHS-compliant locations:
patch -Np1 -i ../glibc-2.40-fhs-1.patch

The Glibc documentation recommends building Glibc in a dedicated build directory:

Ensure that the ldconfig and sln utilities are installed into /usr/sbin:
echo "rootsbindir=/usr/sbin" > configparms

Next, prepare Glibc for compilation:
--build=$(../scripts/config.guess) \
--with-headers=$LFS/usr/include

--host=$LFS_TGT, --build=$(../scripts/config.guess)

The combined effect of these switches is that Glibc's build system configures itself to be cross-compiled, using
the cross-linker and cross-compiler in $LFS/tools.
53

This tells Glibc to compile the library with support for 4.19 and later Linux kernels. Workarounds for older kernels
are not enabled.
--with-headers=$LFS/usr/include

This tells Glibc to compile itself against the headers recently installed to the $LFS/usr/include directory, so that it
knows exactly what features the kernel has and can optimize itself accordingly.

This ensures that the library is installed in /usr/lib instead of the default /lib64 on 64-bit machines.

Do not build the name service cache daemon which is no longer used.
During this stage the following warning might appear:
configure: WARNING:
*** These auxiliary programs are missing or
*** incompatible versions: msgfmt
*** some features will be disabled.
*** Check the INSTALL file for required versions.

The missing or incompatible msgfmt program is generally harmless. This msgfmt program is part of the Gettext
package, which the host distribution should provide.

There have been reports that this package may fail when building as a “parallel make.” If that occurs, rerun
the make command with the -j1 option.

If LFS is not properly set, and despite the recommendations, you are building as root, the next command will
install the newly built Glibc to your host system, which will almost certainly render it unusable. So doublecheck that the environment is correctly set, and that you are not root, before running the following command.

The meaning of the make install option:
DESTDIR=$LFS

The DESTDIR make variable is used by almost all packages to define the location where the package should be
installed. If it is not set, it defaults to the root (/) directory. Here we specify that the package is installed in $LFS ,
which will become the root directory in Section 7.4, “Entering the Chroot Environment”.
Fix a hard coded path to the executable loader in the ldd script:
sed '/RTLDLIST=/s@/usr@@g' -i $LFS/usr/bin/ldd

54

At this point, it is imperative to stop and ensure that the basic functions (compiling and linking) of the new
toolchain are working as expected. To perform a sanity check, run the following commands:
echo 'int main(){}' | $LFS_TGT-gcc -xc readelf -l a.out | grep ld-linux

If everything is working correctly, there should be no errors, and the output of the last command will be of
the form:
[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

Note that for 32-bit machines, the interpreter name will be /lib/ld-linux.so.2.
If the output is not as shown above, or there is no output at all, then something is wrong. Investigate and
retrace the steps to find out where the problem is and correct it. This issue must be resolved before continuing.
Once all is well, clean up the test file:
rm -v a.out

Building the packages in the next chapter will serve as an additional check that the toolchain has been built
properly. If some package, especially Binutils-pass2 or GCC-pass2, fails to build, it is an indication that
something has gone wrong with the preceding Binutils, GCC, or Glibc installations.
Details on this package are located in Section 8.5.3, “Contents of Glibc.”

55

### 5.6 Libstdc++ from GCC-14.2.0
Libstdc++ is the standard C++ library. It is needed to compile C++ code (part of GCC is written in C++), but we had
to defer its installation when we built gcc-pass1 because Libstdc++ depends on Glibc, which was not yet available in
the target directory.

1.2 GB

#### 5.6.1 Installation of Target Libstdc++
Libstdc++ is part of the GCC sources. You should first unpack the GCC tarball and change to the gcc-14.
2.0 directory.
Create a separate build directory for Libstdc++ and enter it:

Prepare Libstdc++ for compilation:
../libstdc++-v3/configure
--build=$(../config.guess)
--disable-libstdcxx-pch
--with-gxx-include-dir=/tools/$LFS_TGT/include/c++/14.2.0

--host=...

Specifies that the cross-compiler we have just built should be used instead of the one in /usr/bin.
--disable-libstdcxx-pch

This switch prevents the installation of precompiled include files, which are not needed at this stage.
--with-gxx-include-dir=/tools/$LFS_TGT/include/c++/14.2.0

This specifies the installation directory for include files. Because Libstdc++ is the standard C++ library for LFS,
this directory should match the location where the C++ compiler ($LFS_TGT-g++) would search for the standard
C++ include files. In a normal build, this information is automatically passed to the Libstdc++ configure options
from the top level directory. In our case, this information must be explicitly given. The C++ compiler will prepend
the sysroot path $LFS (specified when building GCC-pass1) to the include file search path, so it will actually
search in $LFS/tools/$LFS_TGT/include/c++/14.2.0. The combination of the DESTDIR variable (in the make install
command below) and this switch causes the headers to be installed there.
Compile Libstdc++ by running:

Install the library:

56

Remove the libtool archive files because they are harmful for cross-compilation:
rm -v $LFS/usr/lib/lib{stdc++{,exp,fs},supc++}.la

Details on this package are located in Section 8.29.2, “Contents of GCC.”

57

## Chapter 6. Cross Compiling Temporary Tools
### 6.1 Introduction
This chapter shows how to cross-compile basic utilities using the just built cross-toolchain. Those utilities are installed
into their final location, but cannot be used yet. Basic tasks still rely on the host's tools. Nevertheless, the installed
libraries are used when linking.
Using the utilities will be possible in the next chapter after entering the “chroot” environment. But all the packages built
in the present chapter need to be built before we do that. Therefore we cannot be independent of the host system yet.
Once again, let us recall that improper setting of LFS together with building as root, may render your computer unusable.
This whole chapter must be done as user lfs, with the environment as described in Section 4.4, “Setting Up the
Environment.”

58

6.2. M4-1.4.19
The M4 package contains a macro processor.

31 MB

#### 6.2.1 Installation of M4
Prepare M4 for compilation:

Details on this package are located in Section 8.13.2, “Contents of M4.”

59

### 6.3 Ncurses-6.5
The Ncurses package contains libraries for terminal-independent handling of character screens.

53 MB

#### 6.3.1 Installation of Ncurses
First, ensure that gawk is found first during configuration:
sed -i s/mawk// configure

Then, run the following commands to build the “tic” program on the build host:
mkdir build
pushd build
make -C include
make -C progs tic

Prepare Ncurses for compilation:
--build=$(./config.guess)
--mandir=/usr/share/man
--with-manpage-format=normal \
--without-ada
--disable-stripping

--with-manpage-format=normal

This prevents Ncurses from installing compressed manual pages, which may happen if the host distribution itself
has compressed manual pages.

This makes Ncurses build and install shared C libraries.

This prevents Ncurses from building and installing static C libraries.

This prevents Ncurses from building and installing debug libraries.

This makes Ncurses build and install shared C++ bindings. It also prevents it building and installing static C+
+ bindings.
--without-ada

This ensures that Ncurses does not build support for the Ada compiler, which may be present on the host but will
not be available once we enter the chroot environment.
60

--disable-stripping

This switch prevents the building system from using the strip program from the host. Using host tools on crosscompiled programs can cause failure.

make DESTDIR=$LFS TIC_PATH=$(pwd)/build/progs/tic install
ln -sv libncursesw.so $LFS/usr/lib/libncurses.so
sed -e 's/^#if.*XOPEN.*$/#if 1/' \
-i $LFS/usr/include/curses.h

The meaning of the install options:
TIC_PATH=$(pwd)/build/progs/tic

We need to pass the path of the newly built tic program that runs on the building machine, so the terminal database
can be created without errors.
ln -sv libncursesw.so $LFS/usr/lib/libncurses.so
The libncurses.so library is needed by a few packages we will build soon. We create this symlink to use
libncursesw.so as a replacement.
sed -e 's/^#if.*XOPEN.*$/#if 1/' ...
The header file curses.h contains the definition of various Ncurses data structures. With different preprocessor
macro definitions two different sets of the data structure definition may be used: the 8-bit definition is compatible
with libncurses.so and the wide-character definition is compatible with libncursesw.so. Since we are using
libncursesw.so as a replacement of libncurses.so, edit the header file so it will always use the wide-character
data structure definition compatible with libncursesw.so.
Details on this package are located in Section 8.30.2, “Contents of Ncurses.”

61

### 6.4 Bash-5.2.32
The Bash package contains the Bourne-Again Shell.

67 MB

#### 6.4.1 Installation of Bash
Prepare Bash for compilation:
--build=$(sh support/config.guess) \
--without-bash-malloc
bash_cv_strtold_broken=no

--without-bash-malloc

This option turns off the use of Bash's memory allocation (malloc) function which is known to cause segmentation
faults. By turning this option off, Bash will use the malloc functions from Glibc which are more stable.

Make a link for the programs that use sh for a shell:
ln -sv bash $LFS/bin/sh

Details on this package are located in Section 8.36.2, “Contents of Bash.”

62

### 6.5 Coreutils-9.5
The Coreutils package contains the basic utility programs needed by every operating system.

175 MB

#### 6.5.1 Installation of Coreutils
Prepare Coreutils for compilation:
--build=$(build-aux/config.guess) \
--enable-install-program=hostname \
--enable-no-install-program=kill,uptime

--enable-install-program=hostname

This enables the hostname binary to be built and installed – it is disabled by default but is required by the Perl
test suite.

Move programs to their final expected locations. Although this is not necessary in this temporary environment, we must
do so because some programs hardcode executable locations:
mv -v $LFS/usr/bin/chroot
$LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'
$LFS/usr/share/man/man8/chroot.8

Details on this package are located in Section 8.58.2, “Contents of Coreutils.”

63

### 6.6 Diffutils-3.10
The Diffutils package contains programs that show the differences between files or directories.

29 MB

#### 6.6.1 Installation of Diffutils
Prepare Diffutils for compilation:
--build=$(./build-aux/config.guess)

Details on this package are located in Section 8.60.2, “Contents of Diffutils.”

64

### 6.7 File-5.45
The File package contains a utility for determining the type of a given file or files.

37 MB

#### 6.7.1 Installation of File
The file command on the build host needs to be the same version as the one we are building in order to create the
signature file. Run the following commands to make a temporary copy of the file command:
mkdir build
pushd build
../configure --disable-bzlib
--disable-libseccomp \
--disable-xzlib
--disable-zlib

--disable-*

The configuration script attempts to use some packages from the host distribution if the corresponding library files
exist. It may cause compilation failure if a library file exists, but the corresponding header files do not. These
options prevent using these unneeded capabilities from the host.
Prepare File for compilation:
./configure --prefix=/usr --host=$LFS_TGT --build=$(./config.guess)

make FILE_COMPILE=$(pwd)/build/src/file

Remove the libtool archive file because it is harmful for cross compilation:
rm -v $LFS/usr/lib/libmagic.la

Details on this package are located in Section 8.11.2, “Contents of File.”

65

### 6.8 Findutils-4.10.0
The Findutils package contains programs to find files. Programs are provided to search through all the files in a directory
tree and to create, maintain, and search a database (often faster than the recursive find, but unreliable unless the database
has been updated recently). Findutils also supplies the xargs program, which can be used to run a specified command
on each file selected by a search.

48 MB

#### 6.8.1 Installation of Findutils
Prepare Findutils for compilation:
--localstatedir=/var/lib/locate \

Details on this package are located in Section 8.62.2, “Contents of Findutils.”

66

### 6.9 Gawk-5.3.0
The Gawk package contains programs for manipulating text files.

47 MB

#### 6.9.1 Installation of Gawk
First, ensure some unneeded files are not installed:
sed -i 's/extras//' Makefile.in

Prepare Gawk for compilation:

Details on this package are located in Section 8.61.2, “Contents of Gawk.”

67

### 6.10 Grep-3.11
The Grep package contains programs for searching through the contents of files.

27 MB

#### 6.10.1 Installation of Grep
Prepare Grep for compilation:
--build=$(./build-aux/config.guess)

Details on this package are located in Section 8.35.2, “Contents of Grep.”

68

### 6.11 Gzip-1.13
The Gzip package contains programs for compressing and decompressing files.

#### 6.11.1 Installation of Gzip
Prepare Gzip for compilation:
./configure --prefix=/usr --host=$LFS_TGT

Details on this package are located in Section 8.65.2, “Contents of Gzip.”

69

### 6.12 Make-4.4.1
The Make package contains a program for controlling the generation of executables and other non-source files of a
package from source files.

15 MB

#### 6.12.1 Installation of Make
Prepare Make for compilation:
--without-guile \

--without-guile

Although we are cross-compiling, configure tries to use guile from the build host if it finds it. This makes
compilation fail, so this switch prevents using it.

Details on this package are located in Section 8.69.2, “Contents of Make.”

70

### 6.13 Patch-2.7.6
The Patch package contains a program for modifying or creating files by applying a “patch” file typically created by
the diff program.

12 MB

#### 6.13.1 Installation of Patch
Prepare Patch for compilation:

Details on this package are located in Section 8.70.2, “Contents of Patch.”

71

6.14. Sed-4.9
The Sed package contains a stream editor.

21 MB

#### 6.14.1 Installation of Sed
Prepare Sed for compilation:
--build=$(./build-aux/config.guess)

Details on this package are located in Section 8.31.2, “Contents of Sed.”

72

6.15. Tar-1.35
The Tar package provides the ability to create tar archives as well as perform various other kinds of archive
manipulation. Tar can be used on previously created archives to extract files, to store additional files, or to update or
list files which were already stored.

42 MB

#### 6.15.1 Installation of Tar
Prepare Tar for compilation:

Details on this package are located in Section 8.71.2, “Contents of Tar.”

73

6.16. Xz-5.6.2
The Xz package contains programs for compressing and decompressing files. It provides capabilities for the lzma and
the newer xz compression formats. Compressing text files with xz yields a better compression percentage than with
the traditional gzip or bzip2 commands.

20 MB

#### 6.16.1 Installation of Xz
Prepare Xz for compilation:
--build=$(build-aux/config.guess) \
--docdir=/usr/share/doc/xz-5.6.2

Remove the libtool archive file because it is harmful for cross compilation:
rm -v $LFS/usr/lib/liblzma.la

Details on this package are located in Section 8.8.2, “Contents of Xz.”

74

### 6.17 Binutils-2.43.1 - Pass 2
The Binutils package contains a linker, an assembler, and other tools for handling object files.

549 MB

#### 6.17.1 Installation of Binutils
Binutils building system relies on an shipped libtool copy to link against internal static libraries, but the libiberty and
zlib copies shipped in the package do not use libtool. This inconsistency may cause produced binaries mistakenly linked
against libraries from the host distro. Work around this issue:
sed '6009s/$add_dir//' -i ltmain.sh

Create a separate build directory again:

Prepare Binutils for compilation:
--build=$(../config.guess) \
--enable-gprofng=no
--enable-64-bit-bfd
--enable-new-dtags

Builds libbfd as a shared library.
--enable-64-bit-bfd

Enables 64-bit support (on hosts with smaller word sizes). This may not be needed on 64-bit systems, but it does
no harm.

Remove the libtool archive files because they are harmful for cross compilation, and remove unnecessary static libraries:
rm -v $LFS/usr/lib/lib{bfd,ctf,ctf-nobfd,opcodes,sframe}.{a,la}

Details on this package are located in Section 8.20.2, “Contents of Binutils.”

75

### 6.18 GCC-14.2.0 - Pass 2
The GCC package contains the GNU compiler collection, which includes the C and C++ compilers.

4.2 SBU
5.5 GB

#### 6.18.1 Installation of GCC
As in the first build of GCC, the GMP, MPFR, and MPC packages are required. Unpack the tarballs and move them
into the required directories:
tar -xf ../mpfr-4.2.1.tar.xz
mv -v mpfr-4.2.1 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc

If building on x86_64, change the default directory name for 64-bit libraries to “lib”:
x86_64)
sed -e '/m64=/s/lib64/lib/' \
-i.orig gcc/config/i386/t-linux64

Override the building rule of libgcc and libstdc++ headers, to allow building these libraries with POSIX threads support:
sed '/thread_header =/s/@.*@/gthr-posix.h/' \
-i libgcc/Makefile.in libstdc++-v3/include/Makefile.in

Create a separate build directory again:

Before starting to build GCC, remember to unset any environment variables that override the default optimization flags.
Now prepare GCC for compilation:
--build=$(../config.guess)
LDFLAGS_FOR_TARGET=-L$PWD/$LFS_TGT/libgcc
--with-build-sysroot=$LFS
--enable-default-pie
--enable-default-ssp
--disable-libatomic
--disable-libgomp
--disable-libquadmath
--disable-libsanitizer
--disable-libssp
--disable-libvtv
--enable-languages=c,c++

76

--with-build-sysroot=$LFS

Normally, using --host ensures that a cross-compiler is used for building GCC, and that compiler knows that it
has to look for headers and libraries in $LFS. But the build system for GCC uses other tools, which are not aware
of this location. This switch is needed so those tools will find the needed files in $LFS, and not on the host.

We are cross-compiling GCC, so it's impossible to build target libraries (libgcc and libstdc++) with the GCC
binaries compiled in this pass—those binaries won't run on the host. The GCC build system will attempt to use
the host's C and C++ compilers as a workaround by default. Building the GCC target libraries with a different
version of GCC is not supported, so using the host's compilers may cause the build to fail. This parameter ensures
the libraries are built by GCC pass 1.
LDFLAGS_FOR_TARGET=...

Allow libstdc++ to use the libgcc being built in this pass, instead of the previous version built in gcc-pass1. The
previous version cannot properly support C++ exception handling because it was built without libc support.
--disable-libsanitizer

Disable GCC sanitizer runtime libraries. They are not needed for the temporary installation. In gcc-pass1 it was
implied by --disable-libstdcxx, and now we can explicitly pass it.

As a finishing touch, create a utility symlink. Many programs and scripts run cc instead of gcc, which is used to keep
programs generic and therefore usable on all kinds of UNIX systems where the GNU C compiler is not always installed.
Running cc leaves the system administrator free to decide which C compiler to install:
ln -sv gcc $LFS/usr/bin/cc

Details on this package are located in Section 8.29.2, “Contents of GCC.”

77

## Chapter 7. Entering Chroot and Building Additional
Temporary Tools
7.1. Introduction
This chapter shows how to build the last missing bits of the temporary system: the tools needed to build the various
packages. Now that all circular dependencies have been resolved, a “chroot” environment, completely isolated from
the host operating system (except for the running kernel), can be used for the build.
For proper operation of the isolated environment, some communication with the running kernel must be established.
This is done via the so-called Virtual Kernel File Systems, which will be mounted before entering the chroot
environment. You may want to verify that they are mounted by issuing the findmnt command.
Until Section 7.4, “Entering the Chroot Environment”, the commands must be run as root, with the LFS variable set.
After entering chroot, all commands are run as root, fortunately without access to the OS of the computer you built
LFS on. Be careful anyway, as it is easy to destroy the whole LFS system with bad commands.

### 7.2 Changing Ownership
The commands in the remainder of this book must be performed while logged in as user root and no longer
as user lfs. Also, double check that $LFS is set in root's environment.
Currently, the whole directory hierarchy in $LFS is owned by the user lfs, a user that exists only on the host system.
If the directories and files under $LFS are kept as they are, they will be owned by a user ID without a corresponding
account. This is dangerous because a user account created later could get this same user ID and would own all the files
under $LFS, thus exposing these files to possible malicious manipulation.
To address this issue, change the ownership of the $LFS/* directories to user root by running the following command:
chown --from lfs -R root:root $LFS/{usr,lib,var,etc,bin,sbin,tools}
x86_64) chown --from lfs -R root:root $LFS/lib64 ;;

### 7.3 Preparing Virtual Kernel File Systems
Applications running in userspace utilize various file systems created by the kernel to communicate with the kernel
itself. These file systems are virtual: no disk space is used for them. The content of these file systems resides in
memory. These file systems must be mounted in the $LFS directory tree so the applications can find them in the chroot
environment.
Begin by creating the directories on which these virtual file systems will be mounted:
mkdir -pv $LFS/{dev,proc,sys,run}

#### 7.3.1 Mounting and Populating /dev
During a normal boot of an LFS system, the kernel automatically mounts the devtmpfs file system on the /dev directory;
the kernel creates device nodes on that virtual file system during the boot process, or when a device is first detected
or accessed. The udev daemon may change the ownership or permissions of the device nodes created by the kernel,
78

and create new device nodes or symlinks, to ease the work of distro maintainers and system administrators. (See
Section 9.3.2.2, “Device Node Creation” for details.) If the host kernel supports devtmpfs, we can simply mount a
devtmpfs at $LFS/dev and rely on the kernel to populate it.
But some host kernels lack devtmpfs support; these host distros use different methods to create the content of /dev. So
the only host-agnostic way to populate the $LFS/dev directory is by bind mounting the host system's /dev directory. A
bind mount is a special type of mount that makes a directory subtree or a file visible at some other location. Use the
following command to do this.
mount -v --bind /dev $LFS/dev

#### 7.3.2 Mounting Virtual Kernel File Systems
Now mount the remaining virtual kernel file systems:
mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run

The meaning of the mount options for devpts:
gid=5

This ensures that all devpts-created device nodes are owned by group ID 5. This is the ID we will use later on for the
tty group. We use the group ID instead of a name, since the host system might use a different ID for its tty group.
mode=0620

This ensures that all devpts-created device nodes have mode 0620 (user readable and writable, group writable).
Together with the option above, this ensures that devpts will create device nodes that meet the requirements of
grantpt(), meaning the Glibc pt_chown helper binary (which is not installed by default) is not necessary.
In some host systems, /dev/shm is a symbolic link to a directory, typically /run/shm. The /run tmpfs was mounted above
so in this case only a directory needs to be created with the correct permissions.
In other host systems /dev/shm is a mount point for a tmpfs. In that case the mount of /dev above will only create /dev/
shm as a directory in the chroot environment. In this situation we must explicitly mount a tmpfs:
if [ -h $LFS/dev/shm ]; then
install -v -d -m 1777 $LFS$(realpath /dev/shm)
mount -vt tmpfs -o nosuid,nodev tmpfs $LFS/dev/shm

### 7.4 Entering the Chroot Environment
Now that all the packages which are required to build the rest of the needed tools are on the system, it is time to enter
the chroot environment and finish installing the temporary tools. This environment will also be used to install the final
system. As user root, run the following command to enter the environment that is, at the moment, populated with
nothing but temporary tools:
chroot "$LFS" /usr/bin/env -i
HOME=/root
TERM="$TERM"
PS1='(lfs chroot) \u:\w\$ ' \
PATH=/usr/bin:/usr/sbin
MAKEFLAGS="-j$(nproc)"
TESTSUITEFLAGS="-j$(nproc)" \
/bin/bash --login

79

If you don't want to use all available logical cores, replace $(nproc) with the number of logical cores you want to use
for building packages in this chapter and the following chapters. The test suites of some packages (notably Autoconf,
Libtool, and Tar) in Chapter 8 are not affected by MAKEFLAGS, they use a TESTSUITEFLAGS environment variable instead.
We set that here as well for running these test suites with multiple cores.
The -i option given to the env command will clear all the variables in the chroot environment. After that, only the HOME,
TERM, PS1, and PATH variables are set again. The TERM=$TERM construct sets the TERM variable inside chroot to the same
value as outside chroot. This variable is needed so programs like vim and less can operate properly. If other variables
are desired, such as CFLAGS or CXXFLAGS, this is a good place to set them.
From this point on, there is no need to use the LFS variable any more because all work will be restricted to the LFS file
system; the chroot command runs the Bash shell with the root (/) directory set to $LFS.
Notice that /tools/bin is not in the PATH. This means that the cross toolchain will no longer be used.
Also note that the bash prompt will say I have no name! This is normal because the /etc/passwd file has not been
created yet.

It is important that all the commands throughout the remainder of this chapter and the following chapters
are run from within the chroot environment. If you leave this environment for any reason (rebooting for
example), ensure that the virtual kernel filesystems are mounted as explained in Section 7.3.1, “Mounting and
Populating /dev” and Section 7.3.2, “Mounting Virtual Kernel File Systems” and enter chroot again before
continuing with the installation.

### 7.5 Creating Directories
It is time to create the full directory structure in the LFS file system.

Some of the directories mentioned in this section may have already been created earlier with explicit
instructions, or when installing some packages. They are repeated below for completeness.
Create some root-level directories that are not in the limited set required in the previous chapters by issuing the following
command:
mkdir -pv /{boot,home,mnt,opt,srv}

80

Create the required set of subdirectories below the root-level by issuing the following commands:
mkdir -pv /etc/{opt,sysconfig}
mkdir -pv /lib/firmware
mkdir -pv /media/{floppy,cdrom}
mkdir -pv /usr/{,local/}{include,src}
mkdir -pv /usr/lib/locale
mkdir -pv /usr/local/{bin,lib,sbin}
mkdir -pv /usr/{,local/}share/{color,dict,doc,info,locale,man}
mkdir -pv /usr/{,local/}share/{misc,terminfo,zoneinfo}
mkdir -pv /usr/{,local/}share/man/man{1..8}
mkdir -pv /var/{cache,local,log,mail,opt,spool}
mkdir -pv /var/lib/{color,misc,locate}
ln -sfv /run /var/run
ln -sfv /run/lock /var/lock
install -dv -m 0750 /root
install -dv -m 1777 /tmp /var/tmp

Directories are, by default, created with permission mode 755, but this is not desirable everywhere. In the commands
above, two changes are made—one to the home directory of user root, and another to the directories for temporary files.
The first mode change ensures that not just anybody can enter the /root directory—just like a normal user would do
with his or her own home directory. The second mode change makes sure that any user can write to the /tmp and /
var/tmp directories, but cannot remove another user's files from them. The latter is prohibited by the so-called “sticky
bit,” the highest bit (1) in the 1777 bit mask.

#### 7.5.1 FHS Compliance Note
This directory tree is based on the Filesystem Hierarchy Standard (FHS) (available at https://refspecs.linuxfoundation.
org/fhs.shtml). The FHS also specifies the optional existence of additional directories such as /usr/local/games and
/usr/share/games. In LFS, we create only the directories that are really necessary. However, feel free to create more
directories, if you wish.

The FHS does not mandate the existence of the directory /usr/lib64, and the LFS editors have decided not
to use it. For the instructions in LFS and BLFS to work correctly, it is imperative that this directory be nonexistent. From time to time you should verify that it does not exist, because it is easy to create it inadvertently,
and this will probably break your system.

### 7.6 Creating Essential Files and Symlinks
Historically, Linux maintained a list of the mounted file systems in the file /etc/mtab. Modern kernels maintain this
list internally and expose it to the user via the /proc filesystem. To satisfy utilities that expect to find /etc/mtab, create
the following symbolic link:
ln -sv /proc/self/mounts /etc/mtab

Create a basic /etc/hosts file to be referenced in some test suites, and in one of Perl's configuration files as well:
cat > /etc/hosts << EOF
127.0.0.1 localhost $(hostname)
::1
localhost

81

In order for user root to be able to login and for the name “root” to be recognized, there must be relevant entries in
the /etc/passwd and /etc/group files.
Create the /etc/passwd file by running the following command:
cat > /etc/passwd << "EOF"
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/usr/bin/false
daemon:x:6:6:Daemon User:/dev/null:/usr/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/run/dbus:/usr/bin/false
uuidd:x:80:80:UUID Generation Daemon User:/dev/null:/usr/bin/false
nobody:x:65534:65534:Unprivileged User:/dev/null:/usr/bin/false

The actual password for root will be set later.
Create the /etc/group file by running the following command:
cat > /etc/group << "EOF"
root:x:0:
bin:x:1:daemon
sys:x:2:
kmem:x:3:
tape:x:4:
tty:x:5:
daemon:x:6:
floppy:x:7:
disk:x:8:
lp:x:9:
dialout:x:10:
audio:x:11:
video:x:12:
utmp:x:13:
cdrom:x:15:
adm:x:16:
messagebus:x:18:
input:x:24:
mail:x:34:
kvm:x:61:
uuidd:x:80:
wheel:x:97:
users:x:999:
nogroup:x:65534:

The created groups are not part of any standard—they are groups decided on in part by the requirements of the Udev
configuration in Chapter 9, and in part by common conventions employed by a number of existing Linux distributions.
In addition, some test suites rely on specific users or groups. The Linux Standard Base (LSB, available at https://
refspecs.linuxfoundation.org/lsb.shtml) only recommends that, besides the group root with a Group ID (GID) of 0, a
group bin with a GID of 1 be present. The GID of 5 is widely used for the tty group, and the number 5 is also used in /
etc/fstab for the devpts filesystem. All other group names and GIDs can be chosen freely by the system administrator
since well-written programs do not depend on GID numbers, but rather use the group's name.
The ID 65534 is used by the kernel for NFS and separate user namespaces for unmapped users and groups (those exist
on the NFS server or the parent user namespace, but “do not exist” on the local machine or in the separate namespace).
We assign nobody and nogroup to avoid an unnamed ID. But other distros may treat this ID differently, so any portable
program should not depend on this assignment.
Some packages need a locale.
localedef -i C -f UTF-8 C.UTF-8

82

Some tests in Chapter 8 need a regular user. We add this user here and delete this account at the end of that chapter.
echo "tester:x:101:101::/home/tester:/bin/bash" >> /etc/passwd
echo "tester:x:101:" >> /etc/group
install -o tester -d /home/tester

To remove the “I have no name!” prompt, start a new shell. Since the /etc/passwd and /etc/group files have been
created, user name and group name resolution will now work:
exec /usr/bin/bash --login

The login, agetty, and init programs (and others) use a number of log files to record information such as who was
logged into the system and when. However, these programs will not write to the log files if they do not already exist.
Initialize the log files and give them proper permissions:
touch /var/log/{btmp,lastlog,faillog,wtmp}
chgrp -v utmp /var/log/lastlog
chmod -v 664 /var/log/lastlog
chmod -v 600 /var/log/btmp

The /var/log/wtmp file records all logins and logouts. The /var/log/lastlog file records when each user last logged
in. The /var/log/faillog file records failed login attempts. The /var/log/btmp file records the bad login attempts.

The /run/utmp file records the users that are currently logged in. This file is created dynamically in the boot
scripts.

The utmp, wtmp, btmp, and lastlog files use 32-bit integers for timestamps and they'll be fundamentally broken
after year 2038. Many packages have stopped using them and other packages are going to stop using them.
It is probably best to consider them deprecated.

83

### 7.7 Gettext-0.22.5
The Gettext package contains utilities for internationalization and localization. These allow programs to be compiled
with NLS (Native Language Support), enabling them to output messages in the user's native language.

1.1 SBU
321 MB

#### 7.7.1 Installation of Gettext
For our temporary set of tools, we only need to install three programs from Gettext.
Prepare Gettext for compilation:
./configure --disable-shared

--disable-shared

We do not need to install any of the shared Gettext libraries at this time, therefore there is no need to build them.

Install the msgfmt, msgmerge, and xgettext programs:
cp -v gettext-tools/src/{msgfmt,msgmerge,xgettext} /usr/bin

Details on this package are located in Section 8.33.2, “Contents of Gettext.”

84

### 7.8 Bison-3.8.2
The Bison package contains a parser generator.

57 MB

#### 7.8.1 Installation of Bison
Prepare Bison for compilation:
./configure --prefix=/usr \
--docdir=/usr/share/doc/bison-3.8.2

--docdir=/usr/share/doc/bison-3.8.2

This tells the build system to install bison documentation into a versioned directory.

Details on this package are located in Section 8.34.2, “Contents of Bison.”

85

### 7.9 Perl-5.40.0
The Perl package contains the Practical Extraction and Report Language.

0.6 SBU
285 MB

#### 7.9.1 Installation of Perl
Prepare Perl for compilation:
sh Configure -des
-D prefix=/usr
-D vendorprefix=/usr
-D useshrplib
-D privlib=/usr/lib/perl5/5.40/core_perl
-D archlib=/usr/lib/perl5/5.40/core_perl
-D sitelib=/usr/lib/perl5/5.40/site_perl
-D sitearch=/usr/lib/perl5/5.40/site_perl
-D vendorlib=/usr/lib/perl5/5.40/vendor_perl \
-D vendorarch=/usr/lib/perl5/5.40/vendor_perl

The meaning of the Configure options:
-des

This is a combination of three options: -d uses defaults for all items; -e ensures completion of all tasks; -s silences
non-essential output.
-D vendorprefix=/usr

This ensures perl knows how to tell packages where they should install their Perl modules.
-D useshrplib

Build libperl needed by some Perl modules as a shared library, instead of a static library.
-D privlib,-D archlib,-D sitelib,...

These settings define where Perl looks for installed modules. The LFS editors chose to put them in a directory
structure based on the MAJOR.MINOR version of Perl (5.40) which allows upgrading Perl to newer patch levels
(the patch level is the last dot separated part in the full version string like 5.40.0) without reinstalling all of the
modules.

Details on this package are located in Section 8.43.2, “Contents of Perl.”

86

### 7.10 Python-3.12.5
The Python 3 package contains the Python development environment. It is useful for object-oriented programming,
writing scripts, prototyping large programs, and developing entire applications. Python is an interpreted computer
language.

603 MB

#### 7.10.1 Installation of Python
There are two package files whose name starts with the “python” prefix. The one to extract from is Python3.12.5.tar.xz (notice the uppercase first letter).
Prepare Python for compilation:
--enable-shared \
--without-ensurepip

This switch prevents installation of static libraries.
--without-ensurepip

This switch disables the Python package installer, which is not needed at this stage.

Some Python 3 modules can't be built now because the dependencies are not installed yet. For the ssl module,
a message Python requires a OpenSSL 1.1.1 or newer is outputted. The message should be ignored. Just
make sure the toplevel make command has not failed. The optional modules are not needed now and they
will be built in Chapter 8.

Details on this package are located in Section 8.52.2, “Contents of Python 3.”

87

### 7.11 Texinfo-7.1
The Texinfo package contains programs for reading, writing, and converting info pages.

130 MB

#### 7.11.1 Installation of Texinfo
Prepare Texinfo for compilation:

Details on this package are located in Section 8.72.2, “Contents of Texinfo.”

88

### 7.12 Util-linux-2.40.2
The Util-linux package contains miscellaneous utility programs.

180 MB

#### 7.12.1 Installation of Util-linux
The FHS recommends using the /var/lib/hwclock directory instead of the usual /etc directory as the location for the
adjtime file. Create this directory with:
mkdir -pv /var/lib/hwclock

Prepare Util-linux for compilation:
./configure --libdir=/usr/lib
--runstatedir=/run
--disable-chfn-chsh
--disable-login
--disable-nologin
--disable-su
--disable-setpriv
--disable-runuser
--disable-pylibmount \
--disable-liblastlog2 \
--without-python
ADJTIME_PATH=/var/lib/hwclock/adjtime \
--docdir=/usr/share/doc/util-linux-2.40.2

ADJTIME_PATH=/var/lib/hwclock/adjtime

This sets the location of the file recording information about the hardware clock in accordance to the FHS. This
is not strictly needed for this temporary tool, but it prevents creating a file at another location, which would not
be overwritten or removed when building the final util-linux package.
--libdir=/usr/lib

This switch ensures the .so symlinks targeting the shared library file in the same directory (/usr/lib) directly.
--disable-*

These switches prevent warnings about building components that require packages not in LFS or not installed yet.
--without-python

This switch disables using Python. It avoids trying to build unneeded bindings.
runstatedir=/run

This switch sets the location of the socket used by uuidd and libuuid correctly.

Details on this package are located in Section 8.79.2, “Contents of Util-linux.”
89

### 7.13 Cleaning up and Saving the Temporary System
#### 7.13.1 Cleaning
First, remove the currently installed documentation files to prevent them from ending up in the final system, and to
save about 35 MB:
rm -rf /usr/share/{info,man,doc}/*

Second, on a modern Linux system, the libtool .la files are only useful for libltdl. No libraries in LFS are loaded by
libltdl, and it's known that some .la files can cause BLFS package failures. Remove those files now:
find /usr/{lib,libexec} -name \*.la -delete

The current system size is now about 3 GB, however the /tools directory is no longer needed. It uses about 1 GB of
disk space. Delete it now:
rm -rf /tools

#### 7.13.2 Backup
At this point the essential programs and libraries have been created and your current LFS system is in a good state.
Your system can now be backed up for later reuse. In case of fatal failures in the subsequent chapters, it often turns out
that removing everything and starting over (more carefully) is the best way to recover. Unfortunately, all the temporary
files will be removed, too. To avoid spending extra time to redo something which has been done successfully, creating
a backup of the current LFS system may prove useful.

All the remaining steps in this section are optional. Nevertheless, as soon as you begin installing packages
in Chapter 8, the temporary files will be overwritten. So it may be a good idea to do a backup of the current
system as described below.
The following steps are performed from outside the chroot environment. That means you have to leave the chroot
environment first before continuing. The reason for that is to get access to file system locations outside of the chroot
environment to store/read the backup archive, which ought not be placed within the $LFS hierarchy.
If you have decided to make a backup, leave the chroot environment:
exit

All of the following instructions are executed by root on your host system. Take extra care about the
commands you're going to run as mistakes made here can modify your host system. Be aware that the
environment variable LFS is set for user lfs by default but may not be set for root.
Whenever commands are to be executed by root, make sure you have set LFS.
This has been discussed in Section 2.6, “Setting The $LFS Variable.”
Before making a backup, unmount the virtual file systems:
mountpoint -q $LFS/dev/shm && umount $LFS/dev/shm
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}

90

Make sure you have at least 1 GB free disk space (the source tarballs will be included in the backup archive) on the
file system containing the directory where you create the backup archive.
Note that the instructions below specify the home directory of the host system's root user, which is typically found
on the root file system. Replace $HOME by a directory of your choice if you do not want to have the backup stored in
root's home directory.
Create the backup archive by running the following command:

Because the backup archive is compressed, it takes a relatively long time (over 10 minutes) even on a
reasonably fast system.
cd $LFS
tar -cJpf $HOME/lfs-temp-tools-12.2.tar.xz .

If continuing to chapter 8, don't forget to reenter the chroot environment as explained in the “Important” box
below.

#### 7.13.3 Restore
In case some mistakes have been made and you need to start over, you can use this backup to restore the system and
save some recovery time. Since the sources are located under $LFS, they are included in the backup archive as well,
so they do not need to be downloaded again. After checking that $LFS is set properly, you can restore the backup by
executing the following commands:

The following commands are extremely dangerous. If you run rm -rf ./* as the root user and you do not
change to the $LFS directory or the LFS environment variable is not set for the root user, it will destroy your
entire host system. YOU ARE WARNED.
cd $LFS
rm -rf ./*
tar -xpf $HOME/lfs-temp-tools-12.2.tar.xz

Again, double check that the environment has been set up properly and continue building the rest of the system.

If you left the chroot environment to create a backup or restart building using a restore, remember to check
that the virtual file systems are still mounted (findmnt | grep $LFS). If they are not mounted, remount them
now as described in Section 7.3, “Preparing Virtual Kernel File Systems” and re-enter the chroot environment
(see Section 7.4, “Entering the Chroot Environment”) before continuing.

91

Part IV. Building the LFS System
