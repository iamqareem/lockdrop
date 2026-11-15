---
id: lfs-12-2-02
title: "Linux From Scratch 12.2 — Installing Basic System Software, SBU (with tests), System…"
slug: lfs-12-2-02-linux-from-scratch-12-2-installing-basic-system-software-sbu
source: "Linux From Scratch 12.2"
sourceSection: "Chapter 8. Installing Basic System Software, 46. SBU (with tests), Chapter 9. System Configuration, Chapter 10. Making the LFS System Bootable, Chapter 11. The End"
track: linux-engineer
tier: free
tags: [linux, lfs, from-scratch, compilation, sysadmin]
summary: "In this chapter, we start constructing the LFS system in earnest. Covers 5 sections: Installing Basic System Software, SBU (with tests), System Configuration."
---
# Linux From Scratch 12.2 — Installing Basic System Software, SBU (with tests), System…

## Chapter 8. Installing Basic System Software
### 8.1 Introduction
In this chapter, we start constructing the LFS system in earnest.
The installation of this software is straightforward. Although in many cases the installation instructions could be made
shorter and more generic, we have opted to provide the full instructions for every package to minimize the possibilities
for mistakes. The key to learning what makes a Linux system work is to know what each package is used for and why
you (or the system) may need it.
We do not recommend using customized optimizations. They can make a program run slightly faster, but they may
also cause compilation difficulties, and problems when running the program. If a package refuses to compile with a
customized optimization, try to compile it without optimization and see if that fixes the problem. Even if the package
does compile when using a customized optimization, there is the risk it may have been compiled incorrectly because
of the complex interactions between the code and the build tools. Also note that the -march and -mtune options using
values not specified in the book have not been tested. This may cause problems with the toolchain packages (Binutils,
GCC and Glibc). The small potential gains achieved by customizing compiler optimizations are often outweighed by
the risks. First-time builders of LFS are encouraged to build without custom optimizations.
On the other hand, we keep the optimizations enabled by the default configuration of the packages. In addition, we
sometimes explicitly enable an optimized configuration provided by a package but not enabled by default. The package
maintainers have already tested these configurations and consider them safe, so it's not likely they would break the
build. Generally the default configuration already enables -O2 or -O3, so the resulting system will still run very fast
without any customized optimization, and be stable at the same time.
Before the installation instructions, each installation page provides information about the package, including a concise
description of what it contains, approximately how long it will take to build, and how much disk space is required
during this building process. Following the installation instructions, there is a list of programs and libraries (along with
brief descriptions) that the package installs.

The SBU values and required disk space include test suite data for all applicable packages in Chapter 8. SBU
values have been calculated using four CPU cores (-j4) for all operations unless specified otherwise.

#### 8.1.1 About Libraries
In general, the LFS editors discourage building and installing static libraries. Most static libraries have been made
obsolete in a modern Linux system. In addition, linking a static library into a program can be detrimental. If an update
to the library is needed to remove a security problem, every program that uses the static library will need to be relinked
with the new library. Since the use of static libraries is not always obvious, the relevant programs (and the procedures
needed to do the linking) may not even be known.
The procedures in this chapter remove or disable installation of most static libraries. Usually this is done by passing a
--disable-static option to configure. In other cases, alternate means are needed. In a few cases, especially Glibc and
GCC, the use of static libraries remains an essential feature of the package building process.
For a more complete discussion of libraries, see Libraries: Static or shared? in the BLFS book.
93

### 8.2 Package Management
Package Management is an often requested addition to the LFS Book. A Package Manager tracks the installation of
files, making it easier to remove and upgrade packages. A good package manager will also handle the configuration files
specially to keep the user configuration when the package is reinstalled or upgraded. Before you begin to wonder, NO
—this section will not talk about nor recommend any particular package manager. What it does provide is a roundup of
the more popular techniques and how they work. The perfect package manager for you may be among these techniques,
or it may be a combination of two or more of these techniques. This section briefly mentions issues that may arise
when upgrading packages.
Some reasons why no package manager is mentioned in LFS or BLFS include:
- Dealing with package management takes the focus away from the goals of these books—teaching how a Linux
system is built.
- There are multiple solutions for package management, each having its strengths and drawbacks. Finding one
solution that satisfies all audiences is difficult.
There are some hints written on the topic of package management. Visit the Hints Project and see if one of them fits
your needs.

#### 8.2.1 Upgrade Issues
A Package Manager makes it easy to upgrade to newer versions when they are released. Generally the instructions in
the LFS and BLFS books can be used to upgrade to the newer versions. Here are some points that you should be aware
of when upgrading packages, especially on a running system.
- If the Linux kernel needs to be upgraded (for example, from 5.10.17 to 5.10.18 or 5.11.1), nothing else needs to be
rebuilt. The system will keep working fine thanks to the well-defined interface between the kernel and userspace.
Specifically, Linux API headers need not be upgraded along with the kernel. You will merely need to reboot your
system to use the upgraded kernel.
- If Glibc needs to be upgraded to a newer version, (e.g., from Glibc-2.36 to Glibc-2.40), some extra steps are
needed to avoid breaking the system. Read Section 8.5, “Glibc-2.40” for details.
- If a package containing a shared library is updated, and if the name of the library changes, then any packages
dynamically linked to the library must be recompiled, to link against the newer library. (Note that there is no
correlation between the package version and the name of the library.) For example, consider a package foo-1.2.3
that installs a shared library with the name libfoo.so.1. Suppose you upgrade the package to a newer version
foo-1.2.4 that installs a shared library with the name libfoo.so.2. In this case, any packages that are dynamically
linked to libfoo.so.1 need to be recompiled to link against libfoo.so.2 in order to use the new library version.
You should not remove the old libraries until all the dependent packages have been recompiled.
- If a package is (directly or indirectly) linked to both the old and new names of a shared library (for example,
the package links to both libfoo.so.2 and libbar.so.1, while the latter links to libfoo.so.3), the package may
malfunction because the different revisions of the shared library present incompatible definitions for some symbol
names. This can be caused by recompiling some, but not all, of the packages linked to the old shared library after
the package providing the shared library is upgraded. To avoid the issue, users will need to rebuild every package
linked to a shared library with an updated revision (e.g. libfoo.so.2 to libfoo.so.3) as soon as possible.
- If a package containing a shared library is updated, and the name of the library doesn't change, but the version
number of the library file decreases (for example, the library is still named libfoo.so.1, but the name of the library
file is changed from libfoo.so.1.25 to libfoo.so.1.24), you should remove the library file from the previously
94

installed version (libfoo.so.1.25 in this case). Otherwise, a ldconfig command (invoked by yourself from the
command line, or by the installation of some package) will reset the symlink libfoo.so.1 to point to the old library
file because it seems to be a “newer” version; its version number is larger. This situation may arise if you have to
downgrade a package, or if the authors change the versioning scheme for library files.
- If a package containing a shared library is updated, and the name of the library doesn't change, but a severe issue
(especially, a security vulnerability) is fixed, all running programs linked to the shared library should be restarted.
The following command, run as root after the update is complete, will list which processes are using the old
versions of those libraries (replace libfoo with the name of the library):
grep -l 'libfoo.*deleted' /proc/*/maps | tr -cd 0-9\\n | xargs -r ps u

If OpenSSH is being used to access the system and it is linked to the updated library, you must restart the sshd
service, then logout, login again, and run the preceding command again to confirm that nothing is still using the
deleted libraries.
- If an executable program or a shared library is overwritten, the processes using the code or data in that program
or library may crash. The correct way to update a program or a shared library without causing the process to
crash is to remove it first, then install the new version. The install command provided by coreutils has already
implemented this, and most packages use that command to install binary files and libraries. This means that
you won't be troubled by this issue most of the time. However, the install process of some packages (notably
SpiderMonkey in BLFS) just overwrites the file if it exists; this causes a crash. So it's safer to save your work and
close unneeded running processes before updating a package.

#### 8.2.2 Package Management Techniques
The following are some common package management techniques. Before making a decision on a package manager,
do some research on the various techniques, particularly the drawbacks of each particular scheme.

8.2.2.1. It is All in My Head!
Yes, this is a package management technique. Some folks do not need a package manager because they know the
packages intimately and know which files are installed by each package. Some users also do not need any package
management because they plan on rebuilding the entire system whenever a package is changed.

8.2.2.2. Install in Separate Directories
This is a simplistic package management technique that does not need a special program to manage the packages. Each
package is installed in a separate directory. For example, package foo-1.1 is installed in /opt/foo-1.1 and a symlink
is made from /opt/foo to /opt/foo-1.1. When a new version foo-1.2 comes along, it is installed in /opt/foo-1.2 and
the previous symlink is replaced by a symlink to the new version.
Environment variables such as PATH, MANPATH, INFOPATH, PKG_CONFIG_PATH, CPPFLAGS, LDFLAGS, and the configuration file
/etc/ld.so.conf may need to be expanded to include the corresponding subdirectories in /opt/foo-x.y.
This scheme is used by the BLFS book to install some very large packages to make it easier to upgrade them. If you
install more than a few packages, this scheme becomes unmanageable. And some packages (for example Linux API
headers and Glibc) may not work well with this scheme. Never use this scheme system-wide.

95

8.2.2.3. Symlink Style Package Management
This is a variation of the previous package management technique. Each package is installed as in the previous scheme.
But instead of making the symlink via a generic package name, each file is symlinked into the /usr hierarchy. This
removes the need to expand the environment variables. Though the symlinks can be created by the user, many package
managers use this approach, and automate the creation of the symlinks. A few of the popular ones include Stow, Epkg,
Graft, and Depot.
The installation script needs to be fooled, so the package thinks it is installed in /usr though in reality it is installed in
the /usr/pkg hierarchy. Installing in this manner is not usually a trivial task. For example, suppose you are installing a
package libfoo-1.1. The following instructions may not install the package properly:
./configure --prefix=/usr/pkg/libfoo/1.1

The installation will work, but the dependent packages may not link to libfoo as you would expect. If you compile a
package that links against libfoo, you may notice that it is linked to /usr/pkg/libfoo/1.1/lib/libfoo.so.1 instead of /
usr/lib/libfoo.so.1 as you would expect. The correct approach is to use the DESTDIR variable to direct the installation.
This approach works as follows:
make DESTDIR=/usr/pkg/libfoo/1.1 install

Most packages support this approach, but there are some which do not. For the non-compliant packages, you may either
need to install the package manually, or you may find that it is easier to install some problematic packages into /opt.

8.2.2.4. Timestamp Based
In this technique, a file is timestamped before the installation of the package. After the installation, a simple use of
the find command with the appropriate options can generate a log of all the files installed after the timestamp file was
created. A package manager that uses this approach is install-log.
Though this scheme has the advantage of being simple, it has two drawbacks. If, during installation, the files are
installed with any timestamp other than the current time, those files will not be tracked by the package manager. Also,
this scheme can only be used when packages are installed one at a time. The logs are not reliable if two packages are
installed simultaneously from two different consoles.

8.2.2.5. Tracing Installation Scripts
In this approach, the commands that the installation scripts perform are recorded. There are two techniques that one
can use:
The LD_PRELOAD environment variable can be set to point to a library to be preloaded before installation. During
installation, this library tracks the packages that are being installed by attaching itself to various executables such as
cp, install, mv and tracking the system calls that modify the filesystem. For this approach to work, all the executables
need to be dynamically linked without the suid or sgid bit. Preloading the library may cause some unwanted side-effects
during installation. Therefore, it's a good idea to perform some tests to ensure that the package manager does not break
anything, and that it logs all the appropriate files.
Another technique is to use strace, which logs all the system calls made during the execution of the installation scripts.
96

8.2.2.6. Creating Package Archives
In this scheme, the package installation is faked into a separate tree as previously described in the symlink style package
management section. After the installation, a package archive is created using the installed files. This archive is then
used to install the package on the local machine or even on other machines.
This approach is used by most of the package managers found in the commercial distributions. Examples of package
managers that follow this approach are RPM (which, incidentally, is required by the Linux Standard Base Specification),
pkg-utils, Debian's apt, and Gentoo's Portage system. A hint describing how to adopt this style of package management
for LFS systems is located at https://www.linuxfromscratch.org/hints/downloads/files/fakeroot.txt.
The creation of package files that include dependency information is complex, and beyond the scope of LFS.
Slackware uses a tar-based system for package archives. This system purposely does not handle package dependencies
as more complex package managers do. For details of Slackware package management, see https://www.slackbook.
org/html/package-management.html.

8.2.2.7. User Based Management
This scheme, unique to LFS, was devised by Matthias Benkmann, and is available from the Hints Project. In this
scheme, each package is installed as a separate user into the standard locations. Files belonging to a package are easily
identified by checking the user ID. The features and shortcomings of this approach are too complex to describe in this
section. For the details please see the hint at https://www.linuxfromscratch.org/hints/downloads/files/more_control_
and_pkg_man.txt.

#### 8.2.3 Deploying LFS on Multiple Systems
One of the advantages of an LFS system is that there are no files that depend on the position of files on a disk system.
Cloning an LFS build to another computer with the same architecture as the base system is as simple as using tar on the
LFS partition that contains the root directory (about 900MB uncompressed for a basic LFS build), copying that file via
network transfer or CD-ROM / USB stick to the new system, and expanding it. After that, a few configuration files will
have to be changed. Configuration files that may need to be updated include: /etc/hosts, /etc/fstab, /etc/passwd, /
etc/group, /etc/shadow, /etc/ld.so.conf, /etc/sysconfig/rc.site, /etc/sysconfig/network, and /etc/sysconfig/
ifconfig.eth0.
A custom kernel may be needed for the new system, depending on differences in system hardware and the original
kernel configuration.

There have been some reports of issues when copying between similar but not identical architectures. For
instance, the instruction set for an Intel system is not identical with the AMD processor's instructions, and
later versions of some processors may provide instructions that are unavailable with earlier versions.
Finally, the new system has to be made bootable via Section 10.4, “Using GRUB to Set Up the Boot Process”.

97

### 8.3 Man-pages-6.9.1
The Man-pages package contains over 2,400 man pages.

52 MB

#### 8.3.1 Installation of Man-pages
Remove two man pages for password hashing functions. Libxcrypt will provide a better version of these man pages:
rm -v man3/crypt*

Install Man-pages by running:
make prefix=/usr install

#### 8.3.2 Contents of Man-pages
Installed files:

various man pages

man pages

Describe C programming language functions, important device files, and significant configuration files

98

### 8.4 Iana-Etc-20240806
The Iana-Etc package provides data for network services and protocols.

4.8 MB

#### 8.4.1 Installation of Iana-Etc
For this package, we only need to copy the files into place:
cp services protocols /etc

#### 8.4.2 Contents of Iana-Etc
Installed files:

/etc/protocols and /etc/services

/etc/protocols

Describes the various DARPA Internet protocols that are available from the TCP/IP subsystem

/etc/services

Provides a mapping between friendly textual names for internet services, and their underlying
assigned port numbers and protocol types

99

### 8.5 Glibc-2.40
The Glibc package contains the main C library. This library provides the basic routines for allocating memory, searching
directories, opening and closing files, reading and writing files, string handling, pattern matching, arithmetic, and so on.

12 SBU
3.1 GB

#### 8.5.1 Installation of Glibc
Some of the Glibc programs use the non-FHS compliant /var/db directory to store their runtime data. Apply the
following patch to make such programs store their runtime data in the FHS-compliant locations:
patch -Np1 -i ../glibc-2.40-fhs-1.patch

The Glibc documentation recommends building Glibc in a dedicated build directory:

Ensure that the ldconfig and sln utilities will be installed into /usr/sbin:
echo "rootsbindir=/usr/sbin" > configparms

Prepare Glibc for compilation:
--enable-stack-protector=strong

This option disables the -Werror option passed to GCC. This is necessary for running the test suite.

This option tells the build system that this Glibc may be used with kernels as old as 4.19. This means generating
workarounds in case a system call introduced in a later version cannot be used.
--enable-stack-protector=strong

This option increases system security by adding extra code to check for buffer overflows, such as stack smashing
attacks. Note that Glibc always explicitly overrides the default of GCC, so this option is still needed even though
we've already specified --enable-default-ssp for GCC.

Do not build the name service cache daemon which is no longer used.

This variable sets the correct library for all systems. We do not want lib64 to be used.

100

In this section, the test suite for Glibc is considered critical. Do not skip it under any circumstance.
Generally a few tests do not pass. The test failures listed below are usually safe to ignore.

You may see some test failures. The Glibc test suite is somewhat dependent on the host system. A few failures out of
over 5000 tests can generally be ignored. This is a list of the most common issues seen for recent versions of LFS:
- io/tst-lchmod is known to fail in the LFS chroot environment.
- Some tests, for example nss/tst-nss-files-hosts-multi and nptl/tst-thread-affinity* are known to fail due to a timeout
(especially when the system is relatively slow and/or running the test suite with multiple parallel make jobs).
These tests can be identified with:
grep "Timed out" $(find -name \*.out)

It's possible to re-run a single test with enlarged timeout with TIMEOUTFACTOR=<factor> make test t=<test
name>. For example, TIMEOUTFACTOR=10 make test t=nss/tst-nss-files-hosts-multi will re-run nss/tst-nssfiles-hosts-multi with ten times the original timeout.
- Additionally, some tests may fail with a relatively old CPU model (for example elf/tst-cpu-features-cpuinfo) or
host kernel version (for example stdlib/tst-arc4random-thread).
Though it is a harmless message, the install stage of Glibc will complain about the absence of /etc/ld.so.conf. Prevent
this warning with:
touch /etc/ld.so.conf

Fix the Makefile to skip an outdated sanity check that fails with a modern Glibc configuration:
sed '/test-installation/s@$(PERL)@echo not running@' -i ../Makefile

101

If upgrading Glibc to a new minor version (for example, from Glibc-2.36 to Glibc-2.40) on a running LFS
system, you need to take some extra precautions to avoid breaking the system:
- Upgrading Glibc on a LFS system prior to 11.0 (exclusive) is not supported. Rebuild LFS if you are
running such an old LFS system but you need a newer Glibc.
- If upgrading on a LFS system prior to 12.0 (exclusive), install Libxcrypt following Section 8.27,
“Libxcrypt-4.4.36.” In addition to a normal Libxcrypt installation, you MUST follow the note
in Libxcrypt section to install libcrypt.so.1* (replacing libcrypt.so.1 from the prior Glibc
installation).
- If upgrading on a LFS system prior to 12.1 (exclusive), remove the nscd program:
rm -f /usr/sbin/nscd

- Upgrade the kernel and reboot if it's older than 4.19 (check the current version with uname -r) or if you
want to upgrade it anyway, following Section 10.3, “Linux-6.10.5.”
- Upgrade the kernel API headers if it's older than 4.19 (check the current version with cat /usr/include/
linux/version.h) or if you want to upgrade it anyway, following Section 5.4, “Linux-6.10.5 API
Headers” (but removing $LFS from the cp command).
- Perform a DESTDIR installation and upgrade the Glibc shared libraries on the system using one single
install command:
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/*.so.* /usr/lib

It's imperative to strictly follow these steps above unless you completely understand what you are doing. Any
unexpected deviation may render the system completely unusable. YOU ARE WARNED.
Then continue to run the make install command, the sed command against /usr/bin/ldd, and the commands
to install the locales. Once they are finished, reboot the system immediately.

Fix a hardcoded path to the executable loader in the ldd script:
sed '/RTLDLIST=/s@/usr@@g' -i /usr/bin/ldd

Next, install the locales that can make the system respond in a different language. None of these locales are required,
but if some of them are missing, the test suites of some packages will skip important test cases.

102

Individual locales can be installed using the localedef program. E.g., the second localedef command below combines
the /usr/share/i18n/locales/cs_CZ charset-independent locale definition with the /usr/share/i18n/charmaps/UTF-8.
gz charmap definition and appends the result to the /usr/lib/locale/locale-archive file. The following instructions
will install the minimum set of locales necessary for the optimal coverage of tests:
localedef -i C -f UTF-8 C.UTF-8
localedef -i cs_CZ -f UTF-8 cs_CZ.UTF-8
localedef -i de_DE -f ISO-8859-1 de_DE
localedef -i de_DE@euro -f ISO-8859-15 de_DE@euro
localedef -i de_DE -f UTF-8 de_DE.UTF-8
localedef -i el_GR -f ISO-8859-7 el_GR
localedef -i en_GB -f ISO-8859-1 en_GB
localedef -i en_GB -f UTF-8 en_GB.UTF-8
localedef -i en_HK -f ISO-8859-1 en_HK
localedef -i en_PH -f ISO-8859-1 en_PH
localedef -i en_US -f ISO-8859-1 en_US
localedef -i en_US -f UTF-8 en_US.UTF-8
localedef -i es_ES -f ISO-8859-15 es_ES@euro
localedef -i es_MX -f ISO-8859-1 es_MX
localedef -i fa_IR -f UTF-8 fa_IR
localedef -i fr_FR -f ISO-8859-1 fr_FR
localedef -i fr_FR@euro -f ISO-8859-15 fr_FR@euro
localedef -i fr_FR -f UTF-8 fr_FR.UTF-8
localedef -i is_IS -f ISO-8859-1 is_IS
localedef -i is_IS -f UTF-8 is_IS.UTF-8
localedef -i it_IT -f ISO-8859-1 it_IT
localedef -i it_IT -f ISO-8859-15 it_IT@euro
localedef -i it_IT -f UTF-8 it_IT.UTF-8
localedef -i ja_JP -f EUC-JP ja_JP
localedef -i ja_JP -f SHIFT_JIS ja_JP.SJIS 2> /dev/null || true
localedef -i ja_JP -f UTF-8 ja_JP.UTF-8
localedef -i nl_NL@euro -f ISO-8859-15 nl_NL@euro
localedef -i ru_RU -f KOI8-R ru_RU.KOI8-R
localedef -i ru_RU -f UTF-8 ru_RU.UTF-8
localedef -i se_NO -f UTF-8 se_NO.UTF-8
localedef -i ta_IN -f UTF-8 ta_IN.UTF-8
localedef -i tr_TR -f UTF-8 tr_TR.UTF-8
localedef -i zh_CN -f GB18030 zh_CN.GB18030
localedef -i zh_HK -f BIG5-HKSCS zh_HK.BIG5-HKSCS
localedef -i zh_TW -f UTF-8 zh_TW.UTF-8

In addition, install the locale for your own country, language and character set.
Alternatively, install all the locales listed in the glibc-2.40/localedata/SUPPORTED file (it includes every locale listed
above and many more) at once with the following time-consuming command:
make localedata/install-locales

Then use the localedef command to create and install locales not listed in the glibc-2.40/localedata/SUPPORTED file
when you need them. For instance, the following two locales are needed for some tests later in this chapter:
localedef -i C -f UTF-8 C.UTF-8
localedef -i ja_JP -f SHIFT_JIS ja_JP.SJIS 2> /dev/null || true

Glibc now uses libidn2 when resolving internationalized domain names. This is a run time dependency. If
this capability is needed, the instructions for installing libidn2 are in the BLFS libidn2 page.
103

#### 8.5.2 Configuring Glibc
8.5.2.1. Adding nsswitch.conf
The /etc/nsswitch.conf file needs to be created because the Glibc defaults do not work well in a networked
environment.
Create a new file /etc/nsswitch.conf by running the following:
cat > /etc/nsswitch.conf << "EOF"
passwd: files
group: files
shadow: files
hosts: files dns
networks: files
protocols: files
services: files
ethers: files
rpc: files

8.5.2.2. Adding Time Zone Data
Install and set up the time zone data with the following:
tar -xf ../../tzdata2024a.tar.gz
ZONEINFO=/usr/share/zoneinfo
mkdir -pv $ZONEINFO/{posix,right}
for tz in etcetera southamerica northamerica europe africa antarctica
asia australasia backward; do
zic -L /dev/null
-d $ZONEINFO
${tz}
zic -L /dev/null
-d $ZONEINFO/posix ${tz}
zic -L leapseconds -d $ZONEINFO/right ${tz}

cp -v zone.tab zone1970.tab iso3166.tab $ZONEINFO
zic -d $ZONEINFO -p America/New_York
unset ZONEINFO

The meaning of the zic commands:
zic -L /dev/null ...

This creates posix time zones without any leap seconds. It is conventional to put these in both zoneinfo and
zoneinfo/posix. It is necessary to put the POSIX time zones in zoneinfo, otherwise various test suites will report
errors. On an embedded system, where space is tight and you do not intend to ever update the time zones, you could
save 1.9 MB by not using the posix directory, but some applications or test suites might produce some failures.
zic -L leapseconds ...

This creates right time zones, including leap seconds. On an embedded system, where space is tight and you do
not intend to ever update the time zones, or care about the correct time, you could save 1.9MB by omitting the
right directory.
104

zic ... -p ...

This creates the posixrules file. We use New York because POSIX requires the daylight saving time rules to be
in accordance with US rules.
One way to determine the local time zone is to run the following script:
tzselect

After answering a few questions about the location, the script will output the name of the time zone (e.g., America/
Edmonton). There are also some other possible time zones listed in /usr/share/zoneinfo such as Canada/Eastern or
EST5EDT that are not identified by the script but can be used.
Then create the /etc/localtime file by running:
ln -sfv /usr/share/zoneinfo/<xxx> /etc/localtime

Replace <xxx> with the name of the time zone selected (e.g., Canada/Eastern).

8.5.2.3. Configuring the Dynamic Loader
By default, the dynamic loader (/lib/ld-linux.so.2) searches through /usr/lib for dynamic libraries that are needed
by programs as they are run. However, if there are libraries in directories other than /usr/lib, these need to be added
to the /etc/ld.so.conf file in order for the dynamic loader to find them. Two directories that are commonly known to
contain additional libraries are /usr/local/lib and /opt/lib, so add those directories to the dynamic loader's search
path.
Create a new file /etc/ld.so.conf by running the following:
cat > /etc/ld.so.conf << "EOF"
/usr/local/lib
/opt/lib

If desired, the dynamic loader can also search a directory and include the contents of files found there. Generally the
files in this include directory are one line specifying the desired library path. To add this capability run the following
commands:
cat >> /etc/ld.so.conf << "EOF"
include /etc/ld.so.conf.d/*.conf
mkdir -pv /etc/ld.so.conf.d

105

#### 8.5.3 Contents of Glibc

gencat, getconf, getent, iconv, iconvconfig, ldconfig, ldd, lddlibc4, ld.so (symlink to ldlinux-x86-64.so.2 or ld-linux.so.2), locale, localedef, makedb, mtrace, pcprofiledump,
pldd, sln, sotruss, sprof, tzselect, xtrace, zdump, and zic
ld-linux-x86-64.so.2, ld-linux.so.2, libBrokenLocale.{a,so}, libanl.{a,so}, libc.{a,so},
libc_nonshared.a, libc_malloc_debug.so, libdl.{a,so.2}, libg.a, libm.{a,so}, libmcheck.a,
libmemusage.so, libmvec.{a,so}, libnsl.so.1, libnss_compat.so, libnss_dns.so,
libnss_files.so, libnss_hesiod.so, libpcprofile.so, libpthread.{a,so.0}, libresolv.{a,so},
librt.{a,so.1}, libthread_db.so, and libutil.{a,so.1}
/usr/include/arpa, /usr/include/bits, /usr/include/gnu, /usr/include/net, /usr/include/
netash, /usr/include/netatalk, /usr/include/netax25, /usr/include/neteconet, /usr/include/
netinet, /usr/include/netipx, /usr/include/netiucv, /usr/include/netpacket, /usr/include/
netrom, /usr/include/netrose, /usr/include/nfs, /usr/include/protocols, /usr/include/rpc, /
usr/include/sys, /usr/lib/audit, /usr/lib/gconv, /usr/lib/locale, /usr/libexec/getconf, /usr/
share/i18n, /usr/share/zoneinfo, and /var/lib/nss_db

gencat

Generates message catalogues

getconf

Displays the system configuration values for file system specific variables

getent

Gets entries from an administrative database

iconv

Performs character set conversion

iconvconfig

Creates fastloading iconv module configuration files

ldconfig

Configures the dynamic linker runtime bindings

ldd

Reports which shared libraries are required by each given program or shared library

lddlibc4

Assists ldd with object files. It does not exist on newer architectures like x86_64

locale

Prints various information about the current locale

localedef

Compiles locale specifications

makedb

Creates a simple database from textual input

mtrace

Reads and interprets a memory trace file and displays a summary in human-readable format

pcprofiledump

Dump information generated by PC profiling

pldd

Lists dynamic shared objects used by running processes

sln

A statically linked ln program

sotruss

Traces shared library procedure calls of a specified command

sprof

Reads and displays shared object profiling data

tzselect

Asks the user about the location of the system and reports the corresponding time zone
description

xtrace

Traces the execution of a program by printing the currently executed function

zdump

The time zone dumper

zic

The time zone compiler

ld-*.so

The helper program for shared library executables
106

libBrokenLocale

Used internally by Glibc as a gross hack to get broken programs (e.g., some Motif
applications) running. See comments in glibc-2.40/locale/broken_cur_max.c for more
information

libanl

Dummy library containing no functions. Previously was the asynchronous name lookup
library, whose functions are now in libc

libc

The main C library

libc_malloc_debug

Turns on memory allocation checking when preloaded

libdl

Dummy library containing no functions. Previously was the dynamic linking interface
library, whose functions are now in libc

libg

Dummy library containing no functions. Previously was a runtime library for g++

libm

The mathematical library

libmvec

The vector math library, linked in as needed when libm is used

libmcheck

Turns on memory allocation checking when linked to

libmemusage

Used by memusage to help collect information about the memory usage of a program

libnsl

The network services library, now deprecated

libnss_*

The Name Service Switch modules, containing functions for resolving host names, user
names, group names, aliases, services, protocols, etc. Loaded by libc according to the
configuration in /etc/nsswitch.conf

libpcprofile

Can be preloaded to PC profile an executable

libpthread

Dummy library containing no functions. Previously contained functions providing most of
the interfaces specified by the POSIX.1c Threads Extensions and the semaphore interfaces
specified by the POSIX.1b Real-time Extensions, now the functions are in libc

libresolv

Contains functions for creating, sending, and interpreting packets to the Internet domain
name servers

librt

Contains functions providing most of the interfaces specified by the POSIX.1b Real-time
Extensions

libthread_db

Contains functions useful for building debuggers for multi-threaded programs

libutil

Dummy library containing no functions. Previously contained code for “standard”
functions used in many different Unix utilities. These functions are now in libc

107

### 8.6 Zlib-1.3.1
The Zlib package contains compression and decompression routines used by some programs.

6.4 MB

#### 8.6.1 Installation of Zlib
Prepare Zlib for compilation:

Remove a useless static library:
rm -fv /usr/lib/libz.a

#### 8.6.2 Contents of Zlib

libz.so

libz

Contains compression and decompression functions used by some programs

108

### 8.7 Bzip2-1.0.8
The Bzip2 package contains programs for compressing and decompressing files. Compressing text files with bzip2
yields a much better compression percentage than with the traditional gzip.

7.2 MB

#### 8.7.1 Installation of Bzip2
Apply a patch that will install the documentation for this package:
patch -Np1 -i ../bzip2-1.0.8-install_docs-1.patch

The following command ensures installation of symbolic links are relative:
sed -i 's@\(ln -s -f \)$(PREFIX)/bin/@\1@' Makefile

Ensure the man pages are installed into the correct location:
sed -i "s@(PREFIX)/man@(PREFIX)/share/man@g" Makefile

Prepare Bzip2 for compilation with:
make -f Makefile-libbz2_so
make clean

The meaning of the make parameter:
-f Makefile-libbz2_so

This will cause Bzip2 to be built using a different Makefile file, in this case the Makefile-libbz2_so file, which
creates a dynamic libbz2.so library and links the Bzip2 utilities against it.
Compile and test the package:

Install the programs:
make PREFIX=/usr install

Install the shared library:
cp -av libbz2.so.* /usr/lib
ln -sv libbz2.so.1.0.8 /usr/lib/libbz2.so

Install the shared bzip2 binary into the /usr/bin directory, and replace two copies of bzip2 with symlinks:
cp -v bzip2-shared /usr/bin/bzip2
for i in /usr/bin/{bzcat,bunzip2}; do
ln -sfv bzip2 $i

Remove a useless static library:
rm -fv /usr/lib/libbz2.a

109

#### 8.7.2 Contents of Bzip2

bunzip2 (link to bzip2), bzcat (link to bzip2), bzcmp (link to bzdiff), bzdiff, bzegrep (link
to bzgrep), bzfgrep (link to bzgrep), bzgrep, bzip2, bzip2recover, bzless (link to bzmore),
and bzmore
libbz2.so
/usr/share/doc/bzip2-1.0.8

bunzip2

Decompresses bzipped files

bzcat

Decompresses to standard output

bzcmp

Runs cmp on bzipped files

bzdiff

Runs diff on bzipped files

bzegrep

Runs egrep on bzipped files

bzfgrep

Runs fgrep on bzipped files

bzgrep

Runs grep on bzipped files

bzip2

Compresses files using the Burrows-Wheeler block sorting text compression algorithm with
Huffman coding; the compression rate is better than that achieved by more conventional
compressors using “Lempel-Ziv” algorithms, like gzip

bzip2recover

Tries to recover data from damaged bzipped files

bzless

Runs less on bzipped files

bzmore

Runs more on bzipped files

libbz2

The library implementing lossless, block-sorting data compression, using the Burrows-Wheeler
algorithm

110

8.8. Xz-5.6.2
The Xz package contains programs for compressing and decompressing files. It provides capabilities for the lzma and
the newer xz compression formats. Compressing text files with xz yields a better compression percentage than with
the traditional gzip or bzip2 commands.

21 MB

#### 8.8.1 Installation of Xz
Prepare Xz for compilation with:
--docdir=/usr/share/doc/xz-5.6.2

#### 8.8.2 Contents of Xz

lzcat (link to xz), lzcmp (link to xzdiff), lzdiff (link to xzdiff), lzegrep (link to xzgrep),
lzfgrep (link to xzgrep), lzgrep (link to xzgrep), lzless (link to xzless), lzma (link to xz),
lzmadec, lzmainfo, lzmore (link to xzmore), unlzma (link to xz), unxz (link to xz), xz,
xzcat (link to xz), xzcmp (link to xzdiff), xzdec, xzdiff, xzegrep (link to xzgrep), xzfgrep
(link to xzgrep), xzgrep, xzless, and xzmore
liblzma.so
/usr/include/lzma and /usr/share/doc/xz-5.6.2

lzcat

Decompresses to standard output

lzcmp

Runs cmp on LZMA compressed files

lzdiff

Runs diff on LZMA compressed files

lzegrep

Runs egrep on LZMA compressed files

lzfgrep

Runs fgrep on LZMA compressed files

lzgrep

Runs grep on LZMA compressed files

lzless

Runs less on LZMA compressed files

lzma

Compresses or decompresses files using the LZMA format

lzmadec

A small and fast decoder for LZMA compressed files

lzmainfo

Shows information stored in the LZMA compressed file header
111

lzmore

Runs more on LZMA compressed files

unlzma

Decompresses files using the LZMA format

unxz

Decompresses files using the XZ format

xz

Compresses or decompresses files using the XZ format

xzcat

Decompresses to standard output

xzcmp

Runs cmp on XZ compressed files

xzdec

A small and fast decoder for XZ compressed files

xzdiff

Runs diff on XZ compressed files

xzegrep

Runs egrep on XZ compressed files

xzfgrep

Runs fgrep on XZ compressed files

xzgrep

Runs grep on XZ compressed files

xzless

Runs less on XZ compressed files

xzmore

Runs more on XZ compressed files

liblzma

The library implementing lossless, block-sorting data compression, using the Lempel-Ziv-Markov chain
algorithm

112

8.9. Lz4-1.10.0
Lz4 is a lossless compression algorithm, providing compression speed greater than 500 MB/s per core. It features an
extremely fast decoder, with speed in multiple GB/s per core. Lz4 can work with Zstandard to allow both algorithms
to compress data faster.

4.2 MB

#### 8.9.1 Installation of Lz4
make BUILD_STATIC=no PREFIX=/usr

make -j1 check

make BUILD_STATIC=no PREFIX=/usr install

#### 8.9.2 Contents of Lz4

lz4, lz4c (link to lz4), lz4cat (link to lz4), and unlz4 (link to lz4)
liblz4.so

lz4

Compresses or decompresses files using the LZ4 format

lz4c

Compresses files using the LZ4 format

lz4cat

Lists the contents of a file compressed using the LZ4 format

unlz4

Decompresses files using the LZ4 format

liblz4

The library implementing lossless data compression, using the LZ4 algorithm

113

### 8.10 Zstd-1.5.6
Zstandard is a real-time compression algorithm, providing high compression ratios. It offers a very wide range of
compression / speed trade-offs, while being backed by a very fast decoder.

84 MB

#### 8.10.1 Installation of Zstd
make prefix=/usr

In the test output there are several places that indicate 'failed'. These are expected and only 'FAIL' is an actual
test failure. There should be no test failures.

make prefix=/usr install

Remove the static library:
rm -v /usr/lib/libzstd.a

#### 8.10.2 Contents of Zstd

zstd, zstdcat (link to zstd), zstdgrep, zstdless, zstdmt (link to zstd), and unzstd (link to
zstd)
libzstd.so

zstd

Compresses or decompresses files using the ZSTD format

zstdgrep

Runs grep on ZSTD compressed files

zstdless

Runs less on ZSTD compressed files

libzstd

The library implementing lossless data compression, using the ZSTD algorithm

114

### 8.11 File-5.45
The File package contains a utility for determining the type of a given file or files.

17 MB

#### 8.11.1 Installation of File
Prepare File for compilation:

#### 8.11.2 Contents of File

file
libmagic.so

file

Tries to classify each given file; it does this by performing several tests—file system tests, magic number
tests, and language tests

libmagic

Contains routines for magic number recognition, used by the file program

115

### 8.12 Readline-8.2.13
The Readline package is a set of libraries that offer command-line editing and history capabilities.

16 MB

#### 8.12.1 Installation of Readline
Reinstalling Readline will cause the old libraries to be moved to <libraryname>.old. While this is normally not a
problem, in some cases it can trigger a linking bug in ldconfig. This can be avoided by issuing the following two seds:
sed -i '/MV.*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install

Prevent hard coding library search paths (rpath) into the shared libraries. This package does not need rpath for an
installation into the standard location, and rpath may sometimes cause unwanted effects or even security issues:
sed -i 's/-Wl,-rpath,[^ ]*//' support/shobj-conf

Prepare Readline for compilation:
--with-curses
--docdir=/usr/share/doc/readline-8.2.13

--with-curses

This option tells Readline that it can find the termcap library functions in the curses library, not a separate termcap
library. This will generate the correct readline.pc file.
make SHLIB_LIBS="-lncursesw"

The meaning of the make option:
SHLIB_LIBS="-lncursesw"

This option forces Readline to link against the libncursesw library.
make SHLIB_LIBS="-lncursesw" install

install -v -m644 doc/*.{ps,pdf,html,dvi} /usr/share/doc/readline-8.2.13

#### 8.12.2 Contents of Readline

libhistory.so and libreadline.so
/usr/include/readline and /usr/share/doc/readline-8.2.13

libhistory

Provides a consistent user interface for recalling lines of history
116

libreadline

Provides a set of commands for manipulating text entered in an interactive session of a program

117

8.13. M4-1.4.19
The M4 package contains a macro processor.

48 MB

#### 8.13.1 Installation of M4
Prepare M4 for compilation:

#### 8.13.2 Contents of M4

m4

m4

Copies the given files while expanding the macros that they contain. These macros are either built-in or userdefined and can take any number of arguments. Besides performing macro expansion, m4 has built-in functions
for including named files, running Unix commands, performing integer arithmetic, manipulating text, recursion,
etc. The m4 program can be used either as a front end to a compiler or as a macro processor in its own right

118

8.14. Bc-6.7.6
The Bc package contains an arbitrary precision numeric processing language.

7.8 MB

#### 8.14.1 Installation of Bc
Prepare Bc for compilation:
CC=gcc ./configure --prefix=/usr -G -O3 -r

CC=gcc

This parameter specifies the compiler to use.
-G

Omit parts of the test suite that won't work until the bc program has been installed.
-O3

Specify the optimization to use.
-r

Enable the use of Readline to improve the line editing feature of bc.

To test bc, run:

#### 8.14.2 Contents of Bc

bc and dc

bc

A command line calculator

dc

A reverse-polish command line calculator

119

### 8.15 Flex-2.6.4
The Flex package contains a utility for generating programs that recognize patterns in text.

33 MB

#### 8.15.1 Installation of Flex
Prepare Flex for compilation:
./configure --prefix=/usr \
--docdir=/usr/share/doc/flex-2.6.4 \

To test the results (about 0.5 SBU), issue:

A few programs do not know about flex yet and try to run its predecessor, lex. To support those programs, create a
symbolic link named lex that runs flex in lex emulation mode, and also create the man page of lex as a symlink:
ln -sv flex
/usr/bin/lex
ln -sv flex.1 /usr/share/man/man1/lex.1

#### 8.15.2 Contents of Flex

flex, flex++ (link to flex), and lex (link to flex)
libfl.so
/usr/share/doc/flex-2.6.4

flex

A tool for generating programs that recognize patterns in text; it allows for the versatility to specify the rules
for pattern-finding, eradicating the need to develop a specialized program

flex++

An extension of flex, is used for generating C++ code and classes. It is a symbolic link to flex

lex

A symbolic link that runs flex in lex emulation mode

libfl

The flex library

120

8.16. Tcl-8.6.14
The Tcl package contains the Tool Command Language, a robust general-purpose scripting language. The Expect
package is written in Tcl (pronounced "tickle").

3.2 SBU
91 MB

#### 8.16.1 Installation of Tcl
This package and the next two (Expect and DejaGNU) are installed to support running the test suites for Binutils, GCC
and other packages. Installing three packages for testing purposes may seem excessive, but it is very reassuring, if not
essential, to know that the most important tools are working properly.
Prepare Tcl for compilation:
SRCDIR=$(pwd)
cd unix
--mandir=/usr/share/man \
--disable-rpath

The meaning of the new configure parameters:
--disable-rpath

This parameter prevents hard coding library search paths (rpath) into the binary executable files and shared
libraries. This package does not need rpath for an installation into the standard location, and rpath may sometimes
cause unwanted effects or even security issues.
sed -e "s|$SRCDIR/unix|/usr/lib|" \
-e "s|$SRCDIR|/usr/include|" \
-i tclConfig.sh
sed -e "s|$SRCDIR/unix/pkgs/tdbc1.1.7|/usr/lib/tdbc1.1.7|" \
-e "s|$SRCDIR/pkgs/tdbc1.1.7/generic|/usr/include|"
-e "s|$SRCDIR/pkgs/tdbc1.1.7/library|/usr/lib/tcl8.6|" \
-e "s|$SRCDIR/pkgs/tdbc1.1.7|/usr/include|"
-i pkgs/tdbc1.1.7/tdbcConfig.sh
sed -e "s|$SRCDIR/unix/pkgs/itcl4.2.4|/usr/lib/itcl4.2.4|" \
-e "s|$SRCDIR/pkgs/itcl4.2.4/generic|/usr/include|"
-e "s|$SRCDIR/pkgs/itcl4.2.4|/usr/include|"
-i pkgs/itcl4.2.4/itclConfig.sh
unset SRCDIR

The various “sed” instructions after the “make” command remove references to the build directory from the
configuration files and replace them with the install directory. This is not mandatory for the remainder of LFS, but may
be needed if a package built later uses Tcl.

121

Make the installed library writable so debugging symbols can be removed later:
chmod -v u+w /usr/lib/libtcl8.6.so

Install Tcl's headers. The next package, Expect, requires them.
make install-private-headers

Now make a necessary symbolic link:
ln -sfv tclsh8.6 /usr/bin/tclsh

Rename a man page that conflicts with a Perl man page:
mv /usr/share/man/man3/{Thread,Tcl_Thread}.3

Optionally, install the documentation by issuing the following commands:
cd ..
tar -xf ../tcl8.6.14-html.tar.gz --strip-components=1
mkdir -v -p /usr/share/doc/tcl-8.6.14
cp -v -r ./html/* /usr/share/doc/tcl-8.6.14

#### 8.16.2 Contents of Tcl

tclsh (link to tclsh8.6) and tclsh8.6
libtcl8.6.so and libtclstub8.6.a

tclsh8.6

The Tcl command shell

tclsh

A link to tclsh8.6

libtcl8.6.so

The Tcl library

libtclstub8.6.a

The Tcl Stub library

122

### 8.17 Expect-5.45.4
The Expect package contains tools for automating, via scripted dialogues, interactive applications such as telnet, ftp,
passwd, fsck, rlogin, and tip. Expect is also useful for testing these same applications as well as easing all sorts of
tasks that are prohibitively difficult with anything else. The DejaGnu framework is written in Expect.

3.9 MB

#### 8.17.1 Installation of Expect
Expect needs PTYs to work. Verify that the PTYs are working properly inside the chroot environment by performing
a simple test:
python3 -c 'from pty import spawn; spawn(["echo", "ok"])'

This command should output ok. If, instead, the output includes OSError: out of pty devices, then the environment
is not set up for proper PTY operation. You need to exit from the chroot environment, read Section 7.3, “Preparing
Virtual Kernel File Systems” again, and ensure the devpts file system (and other virtual kernel file systems) mounted
correctly. Then reenter the chroot environment following Section 7.4, “Entering the Chroot Environment”. This issue
needs to be resolved before continuing, or the test suites requiring Expect (for example the test suites of Bash, Binutils,
GCC, GDBM, and of course Expect itself) will fail catastrophically, and other subtle breakages may also happen.
Now, make some changes to allow the package with gcc-14.1 or later:
patch -Np1 -i ../expect-5.45.4-gcc14-1.patch

Prepare Expect for compilation:
--with-tcl=/usr/lib
--disable-rpath
--mandir=/usr/share/man \
--with-tclinclude=/usr/include

--with-tcl=/usr/lib

This parameter is needed to tell configure where the tclConfig.sh script is located.
--with-tclinclude=/usr/include

This explicitly tells Expect where to find Tcl's internal headers.

ln -svf expect5.45.4/libexpect5.45.4.so /usr/lib

123

#### 8.17.2 Contents of Expect

expect
libexpect5.45.4.so

expect

Communicates with other interactive programs according to a script

libexpect-5.45.4.so

Contains functions that allow Expect to be used as a Tcl extension or to be used directly
from C or C++ (without Tcl)

124

### 8.18 DejaGNU-1.6.3
The DejaGnu package contains a framework for running test suites on GNU tools. It is written in expect, which itself
uses Tcl (Tool Command Language).

6.9 MB

#### 8.18.1 Installation of DejaGNU
The upstream recommends building DejaGNU in a dedicated build directory:

Prepare DejaGNU for compilation:
makeinfo --html --no-split -o doc/dejagnu.html ../doc/dejagnu.texi
makeinfo --plaintext
-o doc/dejagnu.txt ../doc/dejagnu.texi

install -v -dm755
install -v -m644

/usr/share/doc/dejagnu-1.6.3
doc/dejagnu.{html,txt} /usr/share/doc/dejagnu-1.6.3

#### 8.18.2 Contents of DejaGNU

dejagnu and runtest

dejagnu

DejaGNU auxiliary command launcher

runtest

A wrapper script that locates the proper expect shell and then runs DejaGNU

125

### 8.19 Pkgconf-2.3.0
The pkgconf package is a successor to pkg-config and contains a tool for passing the include path and/or library paths
to build tools during the configure and make phases of package installations.

4.7 MB

#### 8.19.1 Installation of Pkgconf
Prepare Pkgconf for compilation:
--docdir=/usr/share/doc/pkgconf-2.3.0

To maintain compatibility with the original Pkg-config create two symlinks:
ln -sv pkgconf
/usr/bin/pkg-config
ln -sv pkgconf.1 /usr/share/man/man1/pkg-config.1

#### 8.19.2 Contents of Pkgconf

pkgconf, pkg-config (link to pkgconf), and bomtool
libpkgconf.so
/usr/share/doc/pkgconf-2.3.0

pkgconf

Returns meta information for the specified library or package

bomtool

Generates a Software Bill Of Materials from pkg-config .pc files

libpkgconf

Contains most of pkgconf's functionality, while allowing other tools like IDEs and compilers to use
its frameworks

126

### 8.20 Binutils-2.43.1
The Binutils package contains a linker, an assembler, and other tools for handling object files.

2.0 SBU
2.7 GB

#### 8.20.1 Installation of Binutils
The Binutils documentation recommends building Binutils in a dedicated build directory:

Prepare Binutils for compilation:
--enable-gold
--enable-ld=default \
--enable-plugins
--enable-64-bit-bfd \
--enable-new-dtags \
--with-system-zlib \

The meaning of the new configure parameters:
--enable-gold

Build the gold linker and install it as ld.gold (alongside the default linker).
--enable-ld=default

Build the original bfd linker and install it as both ld (the default linker) and ld.bfd.
--enable-plugins

Enables plugin support for the linker.
--with-system-zlib

Use the installed zlib library instead of building the included version.
make tooldir=/usr

The meaning of the make parameter:
tooldir=/usr

Normally, the tooldir (the directory where the executables will ultimately be located) is set to $(exec_prefix)/
$(target_alias). For example, x86_64 machines would expand that to /usr/x86_64-pc-linux-gnu. Because this
is a custom system, this target-specific directory in /usr is not required. $(exec_prefix)/$(target_alias) would
be used if the system were used to cross-compile (for example, compiling a package on an Intel machine that
generates code that can be executed on PowerPC machines).

The test suite for Binutils in this section is considered critical. Do not skip it under any circumstances.
127

Test the results:
make -k check

For a list of failed tests, run:
grep '^FAIL:' $(find -name '*.log')

Twelve tests fail in the gold test suite when the --enable-default-pie and --enable-default-ssp options are passed
to GCC.
make tooldir=/usr install

Remove useless static libraries:
rm -fv /usr/lib/lib{bfd,ctf,ctf-nobfd,gprofng,opcodes,sframe}.a

#### 8.20.2 Contents of Binutils

addr2line, ar, as, c++filt, dwp, elfedit, gprof, gprofng, ld, ld.bfd, ld.gold, nm, objcopy,
objdump, ranlib, readelf, size, strings, and strip
libbfd.so, libctf.so, libctf-nobfd.so, libgprofng.so, libopcodes.so, and libsframe.so
/usr/lib/ldscripts

addr2line

Translates program addresses to file names and line numbers; given an address and the name of
an executable, it uses the debugging information in the executable to determine which source file
and line number are associated with the address

ar

Creates, modifies, and extracts from archives

as

An assembler that assembles the output of gcc into object files

c++filt

Used by the linker to de-mangle C++ and Java symbols and to keep overloaded functions from
clashing

dwp

The DWARF packaging utility

elfedit

Updates the ELF headers of ELF files

gprof

Displays call graph profile data

gprofng

Gathers and analyzes performance data

ld

A linker that combines a number of object and archive files into a single file, relocating their data
and tying up symbol references

ld.gold

A cut down version of ld that only supports the elf object file format

ld.bfd

A hard link to ld

nm

Lists the symbols occurring in a given object file

objcopy

Translates one type of object file into another

objdump

Displays information about the given object file, with options controlling the particular information
to display; the information shown is useful to programmers who are working on the compilation
tools
128

ranlib

Generates an index of the contents of an archive and stores it in the archive; the index lists all of
the symbols defined by archive members that are relocatable object files

readelf

Displays information about ELF type binaries

size

Lists the section sizes and the total size for the given object files

strings

Outputs, for each given file, the sequences of printable characters that are of at least the specified
length (defaulting to four); for object files, it prints, by default, only the strings from the initializing
and loading sections while for other types of files, it scans the entire file

strip

Discards symbols from object files

libbfd

The Binary File Descriptor library

libctf

The Compat ANSI-C Type Format debugging support library

libctf-nobfd

A libctf variant which does not use libbfd functionality

libgprofng

A library containing most routines used by gprofng

libopcodes

A library for dealing with opcodes—the “readable text” versions of instructions for the processor;
it is used for building utilities like objdump

libsframe

A library to support online backtracing using a simple unwinder

129

8.21. GMP-6.3.0
The GMP package contains math libraries. These have useful functions for arbitrary precision arithmetic.
Approximate build time: 0.3 SBU
54 MB

#### 8.21.1 Installation of GMP
If you are building for 32-bit x86, but you have a CPU which is capable of running 64-bit code and you have
specified CFLAGS in the environment, the configure script will attempt to configure for 64-bits and fail. Avoid
this by invoking the configure command below with
ABI=32 ./configure ...

The default settings of GMP produce libraries optimized for the host processor. If libraries suitable for
processors less capable than the host's CPU are desired, generic libraries can be created by appending the -host=none-linux-gnu option to the configure command.
Prepare GMP for compilation:
--enable-cxx
--docdir=/usr/share/doc/gmp-6.3.0

--enable-cxx

This parameter enables C++ support
--docdir=/usr/share/doc/gmp-6.3.0

This variable specifies the correct place for the documentation.

The test suite for GMP in this section is considered critical. Do not skip it under any circumstances.
Test the results:
make check 2>&1 | tee gmp-check-log

The code in gmp is highly optimized for the processor where it is built. Occasionally, the code that detects
the processor misidentifies the system capabilities and there will be errors in the tests or other applications
using the gmp libraries with the message Illegal instruction. In this case, gmp should be reconfigured with
the option --host=none-linux-gnu and rebuilt.

130

Ensure that at least 199 tests in the test suite passed. Check the results by issuing the following command:
awk '/# PASS:/{total+=$3} ; END{print total}' gmp-check-log

make install-html

#### 8.21.2 Contents of GMP

libgmp.so and libgmpxx.so
/usr/share/doc/gmp-6.3.0

libgmp

Contains precision math functions

libgmpxx

Contains C++ precision math functions

131

### 8.22 MPFR-4.2.1
The MPFR package contains functions for multiple precision math.

#### 8.22.1 Installation of MPFR
Prepare MPFR for compilation:
--enable-thread-safe \
--docdir=/usr/share/doc/mpfr-4.2.1

The test suite for MPFR in this section is considered critical. Do not skip it under any circumstances.
Test the results and ensure that all 198 tests passed:

make install-html

#### 8.22.2 Contents of MPFR

libmpfr.so
/usr/share/doc/mpfr-4.2.1

libmpfr

Contains multiple-precision math functions

132

8.23. MPC-1.3.1
The MPC package contains a library for the arithmetic of complex numbers with arbitrarily high precision and correct
rounding of the result.

22 MB

#### 8.23.1 Installation of MPC
Prepare MPC for compilation:
--docdir=/usr/share/doc/mpc-1.3.1

make install-html

#### 8.23.2 Contents of MPC

libmpc.so
/usr/share/doc/mpc-1.3.1

libmpc

Contains complex math functions

133

### 8.24 Attr-2.5.2
The Attr package contains utilities to administer the extended attributes of filesystem objects.

4.1 MB

#### 8.24.1 Installation of Attr
Prepare Attr for compilation:
--sysconfdir=/etc \
--docdir=/usr/share/doc/attr-2.5.2

The tests must be run on a filesystem that supports extended attributes such as the ext2, ext3, or ext4 filesystems. To
test the results, issue:

#### 8.24.2 Contents of Attr

attr, getfattr, and setfattr
libattr.so
/usr/include/attr and /usr/share/doc/attr-2.5.2

attr

Extends attributes on filesystem objects

getfattr

Gets the extended attributes of filesystem objects

setfattr

Sets the extended attributes of filesystem objects

libattr

Contains the library functions for manipulating extended attributes

134

8.25. Acl-2.3.2
The Acl package contains utilities to administer Access Control Lists, which are used to define fine-grained
discretionary access rights for files and directories.

6.3 MB

#### 8.25.1 Installation of Acl
Prepare Acl for compilation:
--docdir=/usr/share/doc/acl-2.3.2

The Acl tests must be run on a filesystem that supports access controls, but not until the Coreutils package has been built,
using the Acl libraries. If desired, return to this package and run make check after the Coreutils package has been built.

#### 8.25.2 Contents of Acl

chacl, getfacl, and setfacl
libacl.so
/usr/include/acl and /usr/share/doc/acl-2.3.2

chacl

Changes the access control list of a file or directory

getfacl

Gets file access control lists

setfacl

Sets file access control lists

libacl

Contains the library functions for manipulating Access Control Lists

135

### 8.26 Libcap-2.70
The Libcap package implements the userspace interface to the POSIX 1003.1e capabilities available in Linux kernels.
These capabilities partition the all-powerful root privilege into a set of distinct privileges.

2.9 MB

#### 8.26.1 Installation of Libcap
Prevent static libraries from being installed:
sed -i '/install -m.*STA/d' libcap/Makefile

make prefix=/usr lib=lib

The meaning of the make option:
lib=lib

This parameter sets the library directory to /usr/lib rather than /usr/lib64 on x86_64. It has no effect on x86.

make prefix=/usr lib=lib install

#### 8.26.2 Contents of Libcap

capsh, getcap, getpcaps, and setcap
libcap.so and libpsx.so

capsh

A shell wrapper to explore and constrain capability support

getcap

Examines file capabilities

getpcaps

Displays the capabilities of the queried process(es)

setcap

Sets file capabilities

libcap

Contains the library functions for manipulating POSIX 1003.1e capabilities

libpsx

Contains functions to support POSIX semantics for syscalls associated with the pthread library

136

### 8.27 Libxcrypt-4.4.36
The Libxcrypt package contains a modern library for one-way hashing of passwords.

12 MB

#### 8.27.1 Installation of Libxcrypt
Prepare Libxcrypt for compilation:
--enable-hashes=strong,glibc \
--enable-obsolete-api=no
--disable-failure-tokens

--enable-hashes=strong,glibc

Build strong hash algorithms recommended for security use cases, and the hash algorithms provided by traditional
Glibc libcrypt for compatibility.
--enable-obsolete-api=no

Disable obsolete API functions. They are not needed for a modern Linux system built from source.
--disable-failure-tokens

Disable failure token feature. It's needed for compatibility with the traditional hash libraries of some platforms,
but a Linux system based on Glibc does not need it.

The instructions above disabled obsolete API functions since no package installed by compiling from sources
would link against them at runtime. However, the only known binary-only applications that link against these
functions require ABI version 1. If you must have such functions because of some binary-only application or
to be compliant with LSB, build the package again with the following commands:
make distclean
--enable-hashes=strong,glibc \
--enable-obsolete-api=glibc \
--disable-failure-tokens
cp -av --remove-destination .libs/libcrypt.so.1* /usr/lib

137

#### 8.27.2 Contents of Libxcrypt

libcrypt.so

libcrypt

Contains functions to hash passwords

138

### 8.28 Shadow-4.16.0
The Shadow package contains programs for handling passwords in a secure way.

112 MB

#### 8.28.1 Installation of Shadow
If you've installed Linux-PAM, you should follow the BLFS shadow page instead of this page to build (or,
rebuild or upgrade) shadow.

If you would like to enforce the use of strong passwords, refer to https://www.linuxfromscratch.org/blfs/view/
12.2/postlfs/cracklib.html for installing CrackLib prior to building Shadow. Then add --with-libcrack to the
configure command below.
Disable the installation of the groups program and its man pages, as Coreutils provides a better version. Also, prevent
the installation of manual pages that were already installed in Section 8.3, “Man-pages-6.9.1”:
sed -i 's/groups$(EXEEXT) //' src/Makefile.in
find man -name Makefile.in -exec sed -i 's/groups\.1 / /'
{} \;
find man -name Makefile.in -exec sed -i 's/getspnam\.3 / /' {} \;
find man -name Makefile.in -exec sed -i 's/passwd\.5 / /'
{} \;

Instead of using the default crypt method, use the much more secure YESCRYPT method of password encryption, which
also allows passwords longer than 8 characters. It is also necessary to change the obsolete /var/spool/mail location
for user mailboxes that Shadow uses by default to the /var/mail location used currently. And, remove /bin and /sbin
from the PATH, since they are simply symlinks to their counterparts in /usr.

If you wish to include /bin and/or /sbin in the PATH for some reason, modify the PATH in .bashrc after LFS
has been built.
sed -e 's:#ENCRYPT_METHOD DES:ENCRYPT_METHOD YESCRYPT:' \
-e 's:/var/spool/mail:/var/mail:'
-e '/PATH=/{s@/sbin:@@;s@/bin:@@}'
-i etc/login.defs

If you chose to build Shadow with Cracklib support, issue this command:
sed -i 's:DICTPATH.*:DICTPATH\t/lib/cracklib/pw_dict:' etc/login.defs

139

Prepare Shadow for compilation:
touch /usr/bin/passwd
./configure --sysconfdir=/etc
--with-{b,yes}crypt \
--without-libbsd
--with-group-name-max-length=32

The meaning of the new configuration options:

touch /usr/bin/passwd
The file /usr/bin/passwd needs to exist because its location is hardcoded in some programs; if it does not already
exist, the installation script will create it in the wrong place.
--with-{b,yes}crypt

The shell expands this to two switches, --with-bcrypt and --with-yescrypt. They allow shadow to use the Bcrypt
and Yescrypt algorithms implemented by Libxcrypt for hashing passwords. These algorithms are more secure (in
particular, much more resistant to GPU-based attacks) than the traditional SHA algorithms.
--with-group-name-max-length=32

The longest permissible user name is 32 characters. Make the maximum length of a group name the same.
--without-libbsd

Do not use the readpassphrase function from libbsd which is not in LFS. Use the internal copy instead.

make exec_prefix=/usr install
make -C man install-man

#### 8.28.2 Configuring Shadow
This package contains utilities to add, modify, and delete users and groups; set and change their passwords; and perform
other administrative tasks. For a full explanation of what password shadowing means, see the doc/HOWTO file within the
unpacked source tree. If you use Shadow support, keep in mind that programs which need to verify passwords (display
managers, FTP programs, pop3 daemons, etc.) must be Shadow-compliant. That is, they must be able to work with
shadowed passwords.
To enable shadowed passwords, run the following command:
pwconv

To enable shadowed group passwords, run:
grpconv

Shadow's default configuration for the useradd utility needs some explanation. First, the default action for the useradd
utility is to create the user and a group with the same name as the user. By default the user ID (UID) and group ID (GID)
numbers will begin at 1000. This means if you don't pass extra parameters to useradd, each user will be a member of a
unique group on the system. If this behavior is undesirable, you'll need to pass either the -g or -N parameter to useradd,
or else change the setting of USERGROUPS_ENAB in /etc/login.defs. See useradd(8) for more information.
140

Second, to change the default parameters, the file /etc/default/useradd must be created and tailored to suit your
particular needs. Create it with:
mkdir -p /etc/default
useradd -D --gid 999
/etc/default/useradd parameter explanations
GROUP=999

This parameter sets the beginning of the group numbers used in the /etc/group file. The particular value 999 comes
from the --gid parameter above. You may set it to any desired value. Note that useradd will never reuse a UID or
GID. If the number identified in this parameter is used, it will use the next available number. Note also that if you
don't have a group with an ID equal to this number on your system, then the first time you use useradd without the
-g parameter, an error message will be generated—useradd: unknown GID 999, even though the account has been
created correctly. That is why we created the group users with this group ID in Section 7.6, “Creating Essential
Files and Symlinks.”
CREATE_MAIL_SPOOL=yes

This parameter causes useradd to create a mailbox file for each new user. useradd will assign the group ownership
of this file to the mail group with 0660 permissions. If you would rather not create these files, issue the following
command:
sed -i '/MAIL/s/yes/no/' /etc/default/useradd

#### 8.28.3 Setting the Root Password
Choose a password for user root and set it by running:
passwd root

#### 8.28.4 Contents of Shadow

chage, chfn, chgpasswd, chpasswd, chsh, expiry, faillog, getsubids, gpasswd,
groupadd, groupdel, groupmems, groupmod, grpck, grpconv, grpunconv, login, logoutd,
newgidmap, newgrp, newuidmap, newusers, nologin, passwd, pwck, pwconv, pwunconv,
sg (link to newgrp), su, useradd, userdel, usermod, vigr (link to vipw), and vipw
/etc/default and /usr/include/shadow
libsubid.so

chage

Used to change the maximum number of days between obligatory password changes

chfn

Used to change a user's full name and other information

chgpasswd

Used to update group passwords in batch mode

chpasswd

Used to update user passwords in batch mode

chsh

Used to change a user's default login shell

expiry

Checks and enforces the current password expiration policy

faillog

Is used to examine the log of login failures, to set a maximum number of failures before an account
is blocked, and to reset the failure count

getsubids

Is used to list the subordinate id ranges for a user
141

gpasswd

Is used to add and delete members and administrators to groups

groupadd

Creates a group with the given name

groupdel

Deletes the group with the given name

groupmems

Allows a user to administer his/her own group membership list without the requirement of super user
privileges.

groupmod

Is used to modify the given group's name or GID

grpck

Verifies the integrity of the group files /etc/group and /etc/gshadow

grpconv

Creates or updates the shadow group file from the normal group file

grpunconv

Updates /etc/group from /etc/gshadow and then deletes the latter

login

Is used by the system to let users sign on

logoutd

Is a daemon used to enforce restrictions on log-on time and ports

newgidmap

Is used to set the gid mapping of a user namespace

newgrp

Is used to change the current GID during a login session

newuidmap

Is used to set the uid mapping of a user namespace

newusers

Is used to create or update an entire series of user accounts

nologin

Displays a message saying an account is not available; it is designed to be used as the default shell
for disabled accounts

passwd

Is used to change the password for a user or group account

pwck

Verifies the integrity of the password files /etc/passwd and /etc/shadow

pwconv

Creates or updates the shadow password file from the normal password file

pwunconv

Updates /etc/passwd from /etc/shadow and then deletes the latter

sg

Executes a given command while the user's GID is set to that of the given group

su

Runs a shell with substitute user and group IDs

useradd

Creates a new user with the given name, or updates the default new-user information

userdel

Deletes the specified user account

usermod

Is used to modify the given user's login name, user identification (UID), shell, initial group, home
directory, etc.

vigr

Edits the /etc/group or /etc/gshadow files

vipw

Edits the /etc/passwd or /etc/shadow files

libsubid

library to handle subordinate id ranges for users and groups

142

8.29. GCC-14.2.0
The GCC package contains the GNU compiler collection, which includes the C and C++ compilers.

## 46. SBU (with tests)
6.3 GB

#### 8.29.1 Installation of GCC
If building on x86_64, change the default directory name for 64-bit libraries to “lib”:
x86_64)
sed -e '/m64=/s/lib64/lib/' \
-i.orig gcc/config/i386/t-linux64

The GCC documentation recommends building GCC in a dedicated build directory:

Prepare GCC for compilation:
LD=ld
--enable-languages=c,c++ \
--enable-default-pie
--enable-default-ssp
--enable-host-pie
--disable-bootstrap
--disable-fixincludes
--with-system-zlib

GCC supports seven different computer languages, but the prerequisites for most of them have not yet been installed.
See the BLFS Book GCC page for instructions on how to build all of GCC's supported languages.
The meaning of the new configure parameters:
LD=ld

This parameter makes the configure script use the ld program installed by the Binutils package built earlier in this
chapter, rather than the cross-built version which would otherwise be used.
--disable-fixincludes

By default, during the installation of GCC some system headers would be “fixed” to be used with GCC. This is
not necessary for a modern Linux system, and potentially harmful if a package is reinstalled after installing GCC.
This switch prevents GCC from “fixing” the headers.
--with-system-zlib

This switch tells GCC to link to the system installed copy of the Zlib library, rather than its own internal copy.

143

PIE (position-independent executables) are binary programs that can be loaded anywhere in memory. Without
PIE, the security feature named ASLR (Address Space Layout Randomization) can be applied for the shared
libraries, but not for the executables themselves. Enabling PIE allows ASLR for the executables in addition
to the shared libraries, and mitigates some attacks based on fixed addresses of sensitive code or data in the
executables.
SSP (Stack Smashing Protection) is a technique to ensure that the parameter stack is not corrupted. Stack
corruption can, for example, alter the return address of a subroutine, thus transferring control to some
dangerous code (existing in the program or shared libraries, or injected by the attacker somehow).

In this section, the test suite for GCC is considered important, but it takes a long time. First-time builders are
encouraged to run the test suite. The time to run the tests can be reduced significantly by adding -jx to the
make -k check command below, where x is the number of CPU cores on your system.
GCC may need more stack space compiling some extremely complex code patterns. As a precaution for the host distros
with a tight stack limit, explicitly set the stack size hard limit to infinite. On most host distros (and the final LFS system)
the hard limit is infinite by default, but there is no harm done by setting it explicitly. It's not necessary to change the
stack size soft limit because GCC will automatically set it to an appropriate value, as long as the value does not exceed
the hard limit:
ulimit -s -H unlimited

Now remove/fix several known test failures:
sed -e '/cpython/d'
-i ../gcc/testsuite/gcc.dg/plugin/plugin.exp
sed -e 's/no-pic /&-no-pie /'
-i ../gcc/testsuite/gcc.target/i386/pr113689-1.c
sed -e 's/300000/(1|300000)/'
-i ../libgomp/testsuite/libgomp.c-c++-common/pr109062.c
sed -e 's/{ target nonpic } //' \
-e '/GOTPCREL/d'
-i ../gcc/testsuite/gcc.target/i386/fentryname3.c

Test the results as a non-privileged user, but do not stop at errors:
su tester -c "PATH=$PATH make -k check"

To extract a summary of the test suite results, run:
../contrib/test_summary

To filter out only the summaries, pipe the output through grep -A7 Summ.
Results can be compared with those located at https://www.linuxfromscratch.org/lfs/build-logs/12.2/ and https://gcc.
gnu.org/ml/gcc-testresults/.
A few unexpected failures cannot always be avoided. In some cases test failures depend on the specific hardware of the
system. Unless the test results are vastly different from those at the above URL, it is safe to continue.

144

The GCC build directory is owned by tester now, and the ownership of the installed header directory (and its content)
is incorrect. Change the ownership to the root user and group:
chown -v -R root:root \
/usr/lib/gcc/$(gcc -dumpmachine)/14.2.0/include{,-fixed}

Create a symlink required by the FHS for "historical" reasons.
ln -svr /usr/bin/cpp /usr/lib

Many packages use the name cc to call the C compiler. We've already created cc as a symlink in gcc-pass2, create its
man page as a symlink as well:
ln -sv gcc.1 /usr/share/man/man1/cc.1

Add a compatibility symlink to enable building programs with Link Time Optimization (LTO):
ln -sfv ../../libexec/gcc/$(gcc -dumpmachine)/14.2.0/liblto_plugin.so \
/usr/lib/bfd-plugins/

Now that our final toolchain is in place, it is important to again ensure that compiling and linking will work as expected.
We do this by performing some sanity checks:
echo 'int main(){}' > dummy.c
cc dummy.c -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'

There should be no errors, and the output of the last command will be (allowing for platform-specific differences in
the dynamic linker name):
[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

Now make sure that we're set up to use the correct start files:
grep -E -o '/usr/lib.*/S?crt[1in].*succeeded' dummy.log

The output of the last command should be:
/usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/../../../../lib/Scrt1.o succeeded
/usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/../../../../lib/crti.o succeeded
/usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/../../../../lib/crtn.o succeeded

Depending on your machine architecture, the above may differ slightly. The difference will be the name of the directory
after /usr/lib/gcc. The important thing to look for here is that gcc has found all three crt*.o files under the /usr/
lib directory.
Verify that the compiler is searching for the correct header files:
grep -B4 '^ /usr/include' dummy.log

This command should return the following output:
#include <...> search starts here:
/usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/include
/usr/local/include
/usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/include-fixed
/usr/include

Again, the directory named after your target triplet may be different than the above, depending on your system
architecture.
Next, verify that the new linker is being used with the correct search paths:
grep 'SEARCH.*/usr/lib' dummy.log |sed 's|; |\n|g'

145

References to paths that have components with '-linux-gnu' should be ignored, but otherwise the output of the last
command should be:
SEARCH_DIR("/usr/x86_64-pc-linux-gnu/lib64")
SEARCH_DIR("/usr/local/lib64")
SEARCH_DIR("/lib64")
SEARCH_DIR("/usr/lib64")
SEARCH_DIR("/usr/x86_64-pc-linux-gnu/lib")
SEARCH_DIR("/usr/local/lib")
SEARCH_DIR("/lib")
SEARCH_DIR("/usr/lib");

A 32-bit system may use a few other directories. For example, here is the output from an i686 machine:
SEARCH_DIR("/usr/i686-pc-linux-gnu/lib32")
SEARCH_DIR("/usr/local/lib32")
SEARCH_DIR("/lib32")
SEARCH_DIR("/usr/lib32")
SEARCH_DIR("/usr/i686-pc-linux-gnu/lib")
SEARCH_DIR("/usr/local/lib")
SEARCH_DIR("/lib")
SEARCH_DIR("/usr/lib");

Next make sure that we're using the correct libc:
grep "/lib.*/libc.so.6 " dummy.log

The output of the last command should be:
attempt to open /usr/lib/libc.so.6 succeeded

Make sure GCC is using the correct dynamic linker:
grep found dummy.log

The output of the last command should be (allowing for platform-specific differences in dynamic linker name):
found ld-linux-x86-64.so.2 at /usr/lib/ld-linux-x86-64.so.2

If the output does not appear as shown above or is not received at all, then something is seriously wrong. Investigate
and retrace the steps to find out where the problem is and correct it. Any issues should be resolved before continuing
with the process.
Once everything is working correctly, clean up the test files:
rm -v dummy.c a.out dummy.log

Finally, move a misplaced file:
mkdir -pv /usr/share/gdb/auto-load/usr/lib
mv -v /usr/lib/*gdb.py /usr/share/gdb/auto-load/usr/lib

#### 8.29.2 Contents of GCC

c++, cc (link to gcc), cpp, g++, gcc, gcc-ar, gcc-nm, gcc-ranlib, gcov, gcov-dump, gcovtool, and lto-dump
libasan.{a,so}, libatomic.{a,so}, libcc1.so, libgcc.a, libgcc_eh.a, libgcc_s.so, libgcov.a,
libgomp.{a,so}, libhwasan.{a,so}, libitm.{a,so}, liblsan.{a,so}, liblto_plugin.so,
libquadmath.{a,so}, libssp.{a,so}, libssp_nonshared.a, libstdc++.{a,so}, libstdc++exp.a,
libstdc++fs.a, libsupc++.a, libtsan.{a,so}, and libubsan.{a,so}
/usr/include/c++, /usr/lib/gcc, /usr/libexec/gcc, and /usr/share/gcc-14.2.0
146

c++

The C++ compiler

cc

The C compiler

cpp

The C preprocessor; it is used by the compiler to expand the #include, #define, and similar
directives in the source files

g++

The C++ compiler

gcc

The C compiler

gcc-ar

A wrapper around ar that adds a plugin to the command line. This program is only used to add
"link time optimization" and is not useful with the default build options.

gcc-nm

A wrapper around nm that adds a plugin to the command line. This program is only used to add
"link time optimization" and is not useful with the default build options.

gcc-ranlib

A wrapper around ranlib that adds a plugin to the command line. This program is only used to
add "link time optimization" and is not useful with the default build options.

gcov

A coverage testing tool; it is used to analyze programs to determine where optimizations will
have the greatest effect

gcov-dump

Offline gcda and gcno profile dump tool

gcov-tool

Offline gcda profile processing tool

lto-dump

Tool for dumping object files produced by GCC with LTO enabled

libasan

The Address Sanitizer runtime library

libatomic

GCC atomic built-in runtime library

libcc1

A library that allows GDB to make use of GCC

libgcc

Contains run-time support for gcc

libgcov

This library is linked into a program when GCC is instructed to enable profiling

libgomp

GNU implementation of the OpenMP API for multi-platform shared-memory parallel
programming in C/C++ and Fortran

libhwasan

The Hardware-assisted Address Sanitizer runtime library

libitm

The GNU transactional memory library

liblsan

The Leak Sanitizer runtime library

liblto_plugin

GCC's LTO plugin allows Binutils to process object files produced by GCC with LTO enabled

libquadmath

GCC Quad Precision Math Library API

libssp

Contains routines supporting GCC's stack-smashing protection functionality. Normally it is not
used, because Glibc also provides those routines.

libstdc++

The standard C++ library

libstdc++exp

Experimental C++ Contracts library

libstdc++fs

ISO/IEC TS 18822:2015 Filesystem library

libsupc++

Provides supporting routines for the C++ programming language

libtsan

The Thread Sanitizer runtime library

libubsan

The Undefined Behavior Sanitizer runtime library
147

### 8.30 Ncurses-6.5
The Ncurses package contains libraries for terminal-independent handling of character screens.

46 MB

#### 8.30.1 Installation of Ncurses
Prepare Ncurses for compilation:
--mandir=/usr/share/man \
--enable-pc-files
--with-pkg-config-libdir=/usr/lib/pkgconfig

This makes Ncurses build and install shared C libraries.

This prevents Ncurses building and installing static C libraries.

This prevents Ncurses building and installing debug libraries.

This makes Ncurses build and install shared C++ bindings. It also prevents it building and installing static C+
+ bindings.
--enable-pc-files

This switch generates and installs .pc files for pkg-config.

This package has a test suite, but it can only be run after the package has been installed. The tests reside in the test/
directory. See the README file in that directory for further details.
The installation of this package will overwrite libncursesw.so.6.5 in-place. It may crash the shell process which is
using code and data from the library file. Install the package with DESTDIR, and replace the library file correctly using
install command (the header curses.h is also edited to ensure the wide-character ABI to be used as what we've done
in Section 6.3, “Ncurses-6.5”):
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/libncursesw.so.6.5 /usr/lib
rm -v dest/usr/lib/libncursesw.so.6.5
sed -e 's/^#if.*XOPEN.*$/#if 1/' \
-i dest/usr/include/curses.h
cp -av dest/* /

148

Many applications still expect the linker to be able to find non-wide-character Ncurses libraries. Trick such applications
into linking with wide-character libraries by means of symlinks (note that the .so links are only safe with curses.h
edited to always use the wide-character ABI):
for lib in ncurses form panel menu ; do
ln -sfv lib${lib}w.so /usr/lib/lib${lib}.so
ln -sfv ${lib}w.pc
/usr/lib/pkgconfig/${lib}.pc

Finally, make sure that old applications that look for -lcurses at build time are still buildable:
ln -sfv libncursesw.so /usr/lib/libcurses.so

If desired, install the Ncurses documentation:
cp -v -R doc -T /usr/share/doc/ncurses-6.5

The instructions above don't create non-wide-character Ncurses libraries since no package installed by
compiling from sources would link against them at runtime. However, the only known binary-only
applications that link against non-wide-character Ncurses libraries require version 5. If you must have such
libraries because of some binary-only application or to be compliant with LSB, build the package again with
the following commands:
make distclean
--without-normal \
--without-debug \
--without-cxx-binding \
--with-abi-version=5
make sources libs
cp -av lib/lib*.so.5* /usr/lib

#### 8.30.2 Contents of Ncurses

captoinfo (link to tic), clear, infocmp, infotocap (link to tic), ncursesw6-config, reset (link
to tset), tabs, tic, toe, tput, and tset
libcurses.so (symlink), libform.so (symlink), libformw.so, libmenu.so (symlink),
libmenuw.so, libncurses.so (symlink), libncursesw.so, libncurses++w.so, libpanel.so
(symlink), and libpanelw.so,
/usr/share/tabset, /usr/share/terminfo, and /usr/share/doc/ncurses-6.5

captoinfo

Converts a termcap description into a terminfo description

clear

Clears the screen, if possible

infocmp

Compares or prints out terminfo descriptions

infotocap

Converts a terminfo description into a termcap description

ncursesw6-config

Provides configuration information for ncurses

reset

Reinitializes a terminal to its default values

tabs

Clears and sets tab stops on a terminal
149

tic

The terminfo entry-description compiler that translates a terminfo file from source format
into the binary format needed for the ncurses library routines [A terminfo file contains
information on the capabilities of a certain terminal.]

toe

Lists all available terminal types, giving the primary name and description for each

tput

Makes the values of terminal-dependent capabilities available to the shell; it can also be used
to reset or initialize a terminal or report its long name

tset

Can be used to initialize terminals

libncursesw

Contains functions to display text in many complex ways on a terminal screen; a good
example of the use of these functions is the menu displayed during the kernel's make
menuconfig

libncurses++w

Contains C++ binding for other libraries in this package

libformw

Contains functions to implement forms

libmenuw

Contains functions to implement menus

libpanelw

Contains functions to implement panels

150

8.31. Sed-4.9
The Sed package contains a stream editor.

30 MB

#### 8.31.1 Installation of Sed
Prepare Sed for compilation:

install -d -m755
/usr/share/doc/sed-4.9
install -m644 doc/sed.html /usr/share/doc/sed-4.9

#### 8.31.2 Contents of Sed

sed
/usr/share/doc/sed-4.9

sed

Filters and transforms text files in a single pass

151

### 8.32 Psmisc-23.7
The Psmisc package contains programs for displaying information about running processes.

6.7 MB

#### 8.32.1 Installation of Psmisc
Prepare Psmisc for compilation:

To run the test suite, run:

#### 8.32.2 Contents of Psmisc

fuser, killall, peekfd, prtstat, pslog, pstree, and pstree.x11 (link to pstree)

fuser

Reports the Process IDs (PIDs) of processes that use the given files or file systems

killall

Kills processes by name; it sends a signal to all processes running any of the given commands

peekfd

Peek at file descriptors of a running process, given its PID

prtstat

Prints information about a process

pslog

Reports current logs path of a process

pstree

Displays running processes as a tree

pstree.x11

Same as pstree, except that it waits for confirmation before exiting

152

### 8.33 Gettext-0.22.5
The Gettext package contains utilities for internationalization and localization. These allow programs to be compiled
with NLS (Native Language Support), enabling them to output messages in the user's native language.

1.6 SBU
260 MB

#### 8.33.1 Installation of Gettext
Prepare Gettext for compilation:
--docdir=/usr/share/doc/gettext-0.22.5

To test the results (this takes a long time, around 3 SBUs), issue:

chmod -v 0755 /usr/lib/preloadable_libintl.so

#### 8.33.2 Contents of Gettext

autopoint, envsubst, gettext, gettext.sh, gettextize, msgattrib, msgcat, msgcmp,
msgcomm, msgconv, msgen, msgexec, msgfilter, msgfmt, msggrep, msginit, msgmerge,
msgunfmt, msguniq, ngettext, recode-sr-latin, and xgettext
libasprintf.so, libgettextlib.so, libgettextpo.so, libgettextsrc.so, libtextstyle.so, and
preloadable_libintl.so
/usr/lib/gettext, /usr/share/doc/gettext-0.22.5, /usr/share/gettext, and /usr/share/
gettext-0.22.5

autopoint

Copies standard Gettext infrastructure files into a source package

envsubst

Substitutes environment variables in shell format strings

gettext

Translates a natural language message into the user's language by looking up the
translation in a message catalog

gettext.sh

Primarily serves as a shell function library for gettext

gettextize

Copies all standard Gettext files into the given top-level directory of a package to begin
internationalizing it

msgattrib

Filters the messages of a translation catalog according to their attributes and manipulates
the attributes

msgcat

Concatenates and merges the given .po files

msgcmp

Compares two .po files to check that both contain the same set of msgid strings
153

msgcomm

Finds the messages that are common to the given .po files

msgconv

Converts a translation catalog to a different character encoding

msgen

Creates an English translation catalog

msgexec

Applies a command to all translations of a translation catalog

msgfilter

Applies a filter to all translations of a translation catalog

msgfmt

Generates a binary message catalog from a translation catalog

msggrep

Extracts all messages of a translation catalog that match a given pattern or belong to
some given source files

msginit

Creates a new .po file, initializing the meta information with values from the user's
environment

msgmerge

Combines two raw translations into a single file

msgunfmt

Decompiles a binary message catalog into raw translation text

msguniq

Unifies duplicate translations in a translation catalog

ngettext

Displays native language translations of a textual message whose grammatical form
depends on a number

recode-sr-latin

Recodes Serbian text from Cyrillic to Latin script

xgettext

Extracts the translatable message lines from the given source files to make the first
translation template

libasprintf

Defines the autosprintf class, which makes C formatted output routines usable in C++
programs, for use with the <string> strings and the <iostream> streams

libgettextlib

Contains common routines used by the various Gettext programs; these are not intended
for general use

libgettextpo

Used to write specialized programs that process .po files; this library is used when the
standard applications shipped with Gettext (such as msgcomm, msgcmp, msgattrib,
and msgen) will not suffice

libgettextsrc

Provides common routines used by the various Gettext programs; these are not intended
for general use

libtextstyle

Text styling library

preloadable_libintl

A library, intended to be used by LD_PRELOAD, that helps libintl log untranslated
messages

154

### 8.34 Bison-3.8.2
The Bison package contains a parser generator.

2.2 SBU
62 MB

#### 8.34.1 Installation of Bison
Prepare Bison for compilation:
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.8.2

To test the results (about 5.5 SBU), issue:

#### 8.34.2 Contents of Bison

bison and yacc
liby.a
/usr/share/bison

bison

Generates, from a series of rules, a program for analyzing the structure of text files; Bison is a replacement
for Yacc (Yet Another Compiler Compiler)

yacc

A wrapper for bison, meant for programs that still call yacc instead of bison; it calls bison with the -y option

liby

The Yacc library containing implementations of Yacc-compatible yyerror and main functions; this library is
normally not very useful, but POSIX requires it

155

### 8.35 Grep-3.11
The Grep package contains programs for searching through the contents of files.

39 MB

#### 8.35.1 Installation of Grep
First, remove a warning about using egrep and fgrep that makes tests on some packages fail:
sed -i "s/echo/#echo/" src/egrep.sh

Prepare Grep for compilation:

#### 8.35.2 Contents of Grep

egrep, fgrep, and grep

egrep

Prints lines matching an extended regular expression. It is obsolete, use grep -E instead

fgrep

Prints lines matching a list of fixed strings. It is obsolete, use grep -F instead

grep

Prints lines matching a basic regular expression

156

### 8.36 Bash-5.2.32
The Bash package contains the Bourne-Again Shell.

1.4 SBU
52 MB

#### 8.36.1 Installation of Bash
Prepare Bash for compilation:
--without-bash-malloc
--with-installed-readline \
bash_cv_strtold_broken=no \
--docdir=/usr/share/doc/bash-5.2.32

--with-installed-readline

This option tells Bash to use the readline library that is already installed on the system rather than using its own
readline version.

Skip down to “Install the package” if not running the test suite.
To prepare the tests, ensure that the tester user can write to the sources tree:

The test suite of this package is designed to be run as a non-root user who owns the terminal connected to standard
input. To satisfy the requirement, spawn a new pseudo terminal using Expect and run the tests as the tester user:
su -s /usr/bin/expect tester << "EOF"
set timeout -1
spawn make tests
expect eof
lassign [wait] _ _ _ value
exit $value

The test suite uses diff to detect the difference between test script output and the expected output. Any output from diff
(prefixed with < and >) indicates a test failure, unless there is a message saying the difference can be ignored. One test
named run-builtins is known to fail on some host distros with a difference on the first line of the output.

Run the newly compiled bash program (replacing the one that is currently being executed):
exec /usr/bin/bash --login

#### 8.36.2 Contents of Bash

bash, bashbug, and sh (link to bash)
/usr/include/bash, /usr/lib/bash, and /usr/share/doc/bash-5.2.32
157

bash

A widely-used command interpreter; it performs many types of expansions and substitutions on a given
command line before executing it, thus making this interpreter a powerful tool

bashbug

A shell script to help the user compose and mail standard formatted bug reports concerning bash

sh

A symlink to the bash program; when invoked as sh, bash tries to mimic the startup behavior of historical
versions of sh as closely as possible, while conforming to the POSIX standard as well

158

### 8.37 Libtool-2.4.7
The Libtool package contains the GNU generic library support script. It makes the use of shared libraries simpler with
a consistent, portable interface.

0.8 SBU
45 MB

#### 8.37.1 Installation of Libtool
Prepare Libtool for compilation:

make -k check

Five tests are known to fail in the LFS build environment due to a circular dependency, but these tests pass if rechecked
after automake has been installed. Additionally, with grep-3.8 or newer, two tests will trigger a warning for non-POSIX
regular expressions and fail.

Remove a useless static library:
rm -fv /usr/lib/libltdl.a

#### 8.37.2 Contents of Libtool

libtool and libtoolize
libltdl.so
/usr/include/libltdl and /usr/share/libtool

libtool

Provides generalized library-building support services

libtoolize

Provides a standard way to add libtool support to a package

libltdl

Hides the various difficulties of opening dynamically loaded libraries

159

### 8.38 GDBM-1.24
The GDBM package contains the GNU Database Manager. It is a library of database functions that uses extensible
hashing and works like the standard UNIX dbm. The library provides primitives for storing key/data pairs, searching
and retrieving the data by its key and deleting a key along with its data.

13 MB

#### 8.38.1 Installation of GDBM
Prepare GDBM for compilation:
--enable-libgdbm-compat

--enable-libgdbm-compat

This switch enables building the libgdbm compatibility library. Some packages outside of LFS may require the
older DBM routines it provides.

#### 8.38.2 Contents of GDBM

gdbm_dump, gdbm_load, and gdbmtool
libgdbm.so and libgdbm_compat.so

gdbm_dump

Dumps a GDBM database to a file

gdbm_load

Recreates a GDBM database from a dump file

gdbmtool

Tests and modifies a GDBM database

libgdbm

Contains functions to manipulate a hashed database

libgdbm_compat

Compatibility library containing older DBM functions

160

### 8.39 Gperf-3.1
Gperf generates a perfect hash function from a key set.

6.1 MB

#### 8.39.1 Installation of Gperf
Prepare Gperf for compilation:
./configure --prefix=/usr --docdir=/usr/share/doc/gperf-3.1

The tests are known to fail if running multiple simultaneous tests (-j option greater than 1). To test the results, issue:
make -j1 check

#### 8.39.2 Contents of Gperf

gperf
/usr/share/doc/gperf-3.1

gperf

Generates a perfect hash from a key set

161

### 8.40 Expat-2.6.2
The Expat package contains a stream oriented C library for parsing XML.

13 MB

#### 8.40.1 Installation of Expat
Prepare Expat for compilation:
--docdir=/usr/share/doc/expat-2.6.2

install -v -m644 doc/*.{html,css} /usr/share/doc/expat-2.6.2

#### 8.40.2 Contents of Expat

xmlwf
libexpat.so
/usr/share/doc/expat-2.6.2

xmlwf

Is a non-validating utility to check whether or not XML documents are well formed

libexpat

Contains API functions for parsing XML

162

### 8.41 Inetutils-2.5
The Inetutils package contains programs for basic networking.

35 MB

#### 8.41.1 Installation of Inetutils
First, make the package build with gcc-14.1 or later::
sed -i 's/def HAVE_TERMCAP_TGETENT/ 1/' telnet/telnet.c

Prepare Inetutils for compilation:
--bindir=/usr/bin
--localstatedir=/var \
--disable-logger
--disable-whois
--disable-rcp
--disable-rexec
--disable-rlogin
--disable-rsh
--disable-servers

--disable-logger

This option prevents Inetutils from installing the logger program, which is used by scripts to pass messages to the
System Log Daemon. Do not install it because Util-linux installs a more recent version.
--disable-whois

This option disables the building of the Inetutils whois client, which is out of date. Instructions for a better whois
client are in the BLFS book.
--disable-r*

These parameters disable building obsolete programs that should not be used due to security issues. The functions
provided by these programs can be provided by the openssh package in the BLFS book.
--disable-servers

This disables the installation of the various network servers included as part of the Inetutils package. These servers
are deemed not appropriate in a basic LFS system. Some are insecure by nature and are only considered safe on
trusted networks. Note that better replacements are available for many of these servers.

Move a program to the proper location:
mv -v /usr/{,s}bin/ifconfig

163

#### 8.41.2 Contents of Inetutils

dnsdomainname, ftp, ifconfig, hostname, ping, ping6, talk, telnet, tftp, and traceroute

dnsdomainname

Show the system's DNS domain name

ftp

Is the file transfer protocol program

hostname

Reports or sets the name of the host

ifconfig

Manages network interfaces

ping

Sends echo-request packets and reports how long the replies take

ping6

A version of ping for IPv6 networks

talk

Is used to chat with another user

telnet

An interface to the TELNET protocol

tftp

A trivial file transfer program

traceroute

Traces the route your packets take from the host you are working on to another host on a network,
showing all the intermediate hops (gateways) along the way

164

### 8.42 Less-661
The Less package contains a text file viewer.

14 MB

#### 8.42.1 Installation of Less
Prepare Less for compilation:
./configure --prefix=/usr --sysconfdir=/etc

This option tells the programs created by the package to look in /etc for the configuration files.

#### 8.42.2 Contents of Less

less, lessecho, and lesskey

less

A file viewer or pager; it displays the contents of the given file, letting the user scroll, find strings, and
jump to marks

lessecho

Needed to expand meta-characters, such as * and ?, in filenames on Unix systems

lesskey

Used to specify the key bindings for less

165

### 8.43 Perl-5.40.0
The Perl package contains the Practical Extraction and Report Language.

1.4 SBU
245 MB

#### 8.43.1 Installation of Perl
This version of Perl builds the Compress::Raw::Zlib and Compress::Raw::BZip2 modules. By default Perl will use an
internal copy of the sources for the build. Issue the following command so that Perl will use the libraries installed on
the system:
export BUILD_ZLIB=False
export BUILD_BZIP2=0

To have full control over the way Perl is set up, you can remove the “-des” options from the following command and
hand-pick the way this package is built. Alternatively, use the command exactly as shown below to use the defaults
that Perl auto-detects:
sh Configure -des
-D prefix=/usr
-D vendorprefix=/usr
-D privlib=/usr/lib/perl5/5.40/core_perl
-D archlib=/usr/lib/perl5/5.40/core_perl
-D sitelib=/usr/lib/perl5/5.40/site_perl
-D sitearch=/usr/lib/perl5/5.40/site_perl
-D vendorlib=/usr/lib/perl5/5.40/vendor_perl \
-D vendorarch=/usr/lib/perl5/5.40/vendor_perl \
-D man1dir=/usr/share/man/man1
-D man3dir=/usr/share/man/man3
-D pager="/usr/bin/less -isR"
-D useshrplib
-D usethreads

The meaning of the new Configure options:
-D pager="/usr/bin/less -isR"

This ensures that less is used instead of more.
-D man1dir=/usr/share/man/man1 -D man3dir=/usr/share/man/man3

Since Groff is not installed yet, Configure will not create man pages for Perl. These parameters override this
behavior.
-D usethreads

Build Perl with support for threads.

To test the results (approximately 11 SBU), issue:
TEST_JOBS=$(nproc) make test_harness

Install the package and clean up:
unset BUILD_ZLIB BUILD_BZIP2

166

#### 8.43.2 Contents of Perl

corelist, cpan, enc2xs, encguess, h2ph, h2xs, instmodsh, json_pp, libnetcfg, perl,
perl5.40.0 (hard link to perl), perlbug, perldoc, perlivp, perlthanks (hard link to perlbug),
piconv, pl2pm, pod2html, pod2man, pod2text, pod2usage, podchecker, podselect, prove,
ptar, ptardiff, ptargrep, shasum, splain, xsubpp, and zipdetails
Many which cannot all be listed here
/usr/lib/perl5

corelist

A command line front end to Module::CoreList

cpan

Interact with the Comprehensive Perl Archive Network (CPAN) from the command line

enc2xs

Builds a Perl extension for the Encode module from either Unicode Character Mappings or Tcl
Encoding Files

encguess

Guess the encoding type of one or several files

h2ph

Converts .h C header files to .ph Perl header files

h2xs

Converts .h C header files to Perl extensions

instmodsh

Shell script for examining installed Perl modules; it can create a tarball from an installed module

json_pp

Converts data between certain input and output formats

libnetcfg

Can be used to configure the libnet Perl module

perl

Combines some of the best features of C, sed, awk and sh into a single Swiss Army language

perl5.40.0

A hard link to perl

perlbug

Used to generate bug reports about Perl, or the modules that come with it, and mail them

perldoc

Displays a piece of documentation in pod format that is embedded in the Perl installation tree or in
a Perl script

perlivp

The Perl Installation Verification Procedure; it can be used to verify that Perl and its libraries have
been installed correctly

perlthanks

Used to generate thank you messages to mail to the Perl developers

piconv

A Perl version of the character encoding converter iconv

pl2pm

A rough tool for converting Perl4 .pl files to Perl5 .pm modules

pod2html

Converts files from pod format to HTML format

pod2man

Converts pod data to formatted *roff input

pod2text

Converts pod data to formatted ASCII text

pod2usage

Prints usage messages from embedded pod docs in files

podchecker

Checks the syntax of pod format documentation files

podselect

Displays selected sections of pod documentation

prove

Command line tool for running tests against the Test::Harness module

ptar

A tar-like program written in Perl

ptardiff

A Perl program that compares an extracted archive with an unextracted one
167

ptargrep

A Perl program that applies pattern matching to the contents of files in a tar archive

shasum

Prints or checks SHA checksums

splain

Is used to force verbose warning diagnostics in Perl

xsubpp

Converts Perl XS code into C code

zipdetails

Displays details about the internal structure of a Zip file

168

### 8.44 XML::Parser-2.47
The XML::Parser module is a Perl interface to James Clark's XML parser, Expat.

2.4 MB

#### 8.44.1 Installation of XML::Parser
Prepare XML::Parser for compilation:
perl Makefile.PL

#### 8.44.2 Contents of XML::Parser
Installed module:

Expat.so

Expat

provides the Perl Expat interface

169

### 8.45 Intltool-0.51.0
The Intltool is an internationalization tool used for extracting translatable strings from source files.

1.5 MB

#### 8.45.1 Installation of Intltool
First fix a warning that is caused by perl-5.22 and later:
sed -i 's:\\\${:\\\$\\{:' intltool-update.in

The above regular expression looks unusual because of all the backslashes. What it does is add a backslash
before the right brace character in the sequence '\${' resulting in '\$\{'.
Prepare Intltool for compilation:

install -v -Dm644 doc/I18N-HOWTO /usr/share/doc/intltool-0.51.0/I18N-HOWTO

#### 8.45.2 Contents of Intltool

intltool-extract, intltool-merge, intltool-prepare, intltool-update, and intltoolize
/usr/share/doc/intltool-0.51.0 and /usr/share/intltool

intltoolize

Prepares a package to use intltool

intltool-extract

Generates header files that can be read by gettext

intltool-merge

Merges translated strings into various file types

intltool-prepare

Updates pot files and merges them with translation files

intltool-update

Updates the po template files and merges them with the translations

170

### 8.46 Autoconf-2.72
The Autoconf package contains programs for producing shell scripts that can automatically configure source code.

less than 0.1 SBU (about 1.8 SBU with tests)
25 MB

#### 8.46.1 Installation of Autoconf
Prepare Autoconf for compilation:

#### 8.46.2 Contents of Autoconf

autoconf, autoheader, autom4te, autoreconf, autoscan, autoupdate, and ifnames
/usr/share/autoconf

autoconf

Produces shell scripts that automatically configure software source code packages to adapt to many
kinds of Unix-like systems; the configuration scripts it produces are independent—running them
does not require the autoconf program

autoheader

A tool for creating template files of C #define statements for configure to use

autom4te

A wrapper for the M4 macro processor

autoreconf

Automatically runs autoconf, autoheader, aclocal, automake, gettextize, and libtoolize in the
correct order to save time when changes are made to autoconf and automake template files

autoscan

Helps to create a configure.in file for a software package; it examines the source files in a directory
tree, searching them for common portability issues, and creates a configure.scan file that serves as
a preliminary configure.in file for the package

autoupdate

Modifies a configure.in file that still calls autoconf macros by their old names to use the current
macro names

ifnames

Helps when writing configure.in files for a software package; it prints the identifiers that the
package uses in C preprocessor conditionals [If a package has already been set up to have some
portability, this program can help determine what configure needs to check for. It can also fill in
gaps in a configure.in file generated by autoscan.]

171

### 8.47 Automake-1.17
The Automake package contains programs for generating Makefiles for use with Autoconf.

less than 0.1 SBU (about 1.1 SBU with tests)
121 MB

#### 8.47.1 Installation of Automake
Prepare Automake for compilation:
./configure --prefix=/usr --docdir=/usr/share/doc/automake-1.17

Using four parallel jobs speeds up the tests, even on systems with less logical cores, due to internal delays in individual
tests. To test the results, issue:
make -j$(($(nproc)>4?$(nproc):4)) check

Replace $((...)) with the number of logical cores you want to use if you don't want to use all.

#### 8.47.2 Contents of Automake

aclocal, aclocal-1.17 (hard linked with aclocal), automake, and automake-1.17 (hard
linked with automake)
/usr/share/aclocal-1.17, /usr/share/automake-1.17, and /usr/share/doc/automake-1.17

aclocal

Generates aclocal.m4 files based on the contents of configure.in files

aclocal-1.17

A hard link to aclocal

automake

A tool for automatically generating Makefile.in files from Makefile.am files [To create all the
Makefile.in files for a package, run this program in the top-level directory. By scanning the
configure.in file, it automatically finds each appropriate Makefile.am file and generates the
corresponding Makefile.in file.]

automake-1.17

A hard link to automake

172

### 8.48 OpenSSL-3.3.1
The OpenSSL package contains management tools and libraries relating to cryptography. These are useful for providing
cryptographic functions to other packages, such as OpenSSH, email applications, and web browsers (for accessing
HTTPS sites).

1.7 SBU
883 MB

#### 8.48.1 Installation of OpenSSL
Prepare OpenSSL for compilation:
./config --prefix=/usr
--openssldir=/etc/ssl \
--libdir=lib
shared
zlib-dynamic

HARNESS_JOBS=$(nproc) make test

One test, 30-test_afalg.t, is known to fail if the host kernel does not have CONFIG_CRYPTO_USER_API_SKCIPHER enabled,
or does not have any options providing an AES with CBC implementation (for example, the combination of CONFIG_
CRYPTO_AES and CONFIG_CRYPTO_CBC, or CONFIG_CRYPTO_AES_NI_INTEL if the CPU supports AES-NI) enabled. If it fails,
it can safely be ignored.
sed -i '/INSTALL_LIBS/s/libcrypto.a libssl.a//' Makefile
make MANSUFFIX=ssl install

Add the version to the documentation directory name, to be consistent with other packages:
mv -v /usr/share/doc/openssl /usr/share/doc/openssl-3.3.1

If desired, install some additional documentation:
cp -vfr doc/* /usr/share/doc/openssl-3.3.1

You should update OpenSSL when a new version which fixes vulnerabilities is announced. Since OpenSSL
3.0.0, the OpenSSL versioning scheme follows the MAJOR.MINOR.PATCH format. API/ABI compatibility
is guaranteed for the same MAJOR version number. Because LFS installs only the shared libraries, there is
no need to recompile packages which link to libcrypto.so or libssl.so when upgrading to a version with
the same MAJOR version number.
However, any running programs linked to those libraries need to be stopped and restarted. Read the related
entries in Section 8.2.1, “Upgrade Issues” for details.
173

#### 8.48.2 Contents of OpenSSL

c_rehash and openssl
libcrypto.so and libssl.so
/etc/ssl, /usr/include/openssl, /usr/lib/engines and /usr/share/doc/openssl-3.3.1

c_rehash

is a Perl script that scans all files in a directory and adds symbolic links to their hash values. Use
of c_rehash is considered obsolete and should be replaced by openssl rehash command

openssl

is a command-line tool for using the various cryptography functions of OpenSSL's crypto library
from the shell. It can be used for various functions which are documented in openssl(1)

libcrypto.so

implements a wide range of cryptographic algorithms used in various Internet standards. The
services provided by this library are used by the OpenSSL implementations of SSL, TLS and S/
MIME, and they have also been used to implement OpenSSH, OpenPGP, and other cryptographic
standards

libssl.so

implements the Transport Layer Security (TLS v1) protocol. It provides a rich API, documentation
on which can be found in ssl(7)

174

### 8.49 Kmod-33
The Kmod package contains libraries and utilities for loading kernel modules

#### 8.49.1 Installation of Kmod
Prepare Kmod for compilation:
--sysconfdir=/etc \
--with-openssl
--with-xz
--with-zstd
--with-zlib
--disable-manpages

--with-openssl

This option enables Kmod to handle PKCS7 signatures for kernel modules.
--with-xz, --with-zlib, and --with-zstd

These options enable Kmod to handle compressed kernel modules.
--disable-manpages

This option disables generating the man pages which requires an external program.

The test suite of this package requires raw kernel headers (not the “sanitized” kernel headers installed earlier), which
are beyond the scope of LFS.
Install the package and recreate some symlinks for compatibility with Module-Init-Tools (the package that previously
handled Linux kernel modules). The building system will create all these symlinks in /usr/bin, but we only want lsmod
there and all other symlinks in /usr/sbin instead:
for target in depmod insmod modinfo modprobe rmmod; do
ln -sfv ../bin/kmod /usr/sbin/$target
rm -fv /usr/bin/$target

#### 8.49.2 Contents of Kmod

depmod (link to kmod), insmod (link to kmod), kmod, lsmod (link to kmod), modinfo
(link to kmod), modprobe (link to kmod), and rmmod (link to kmod)
libkmod.so

depmod

Creates a dependency file based on the symbols it finds in the existing set of modules; this dependency
file is used by modprobe to automatically load the required modules
175

insmod

Installs a loadable module in the running kernel

kmod

Loads and unloads kernel modules

lsmod

Lists currently loaded modules

modinfo

Examines an object file associated with a kernel module and displays any information that it can glean

modprobe

Uses a dependency file, created by depmod, to automatically load relevant modules

rmmod

Unloads modules from the running kernel

libkmod

This library is used by other programs to load and unload kernel modules

176

### 8.50 Libelf from Elfutils-0.191
Libelf is a library for handling ELF (Executable and Linkable Format) files.

127 MB

#### 8.50.1 Installation of Libelf
Libelf is part of the elfutils-0.191 package. Use the elfutils-0.191.tar.bz2 file as the source tarball.
Prepare Libelf for compilation:
--disable-debuginfod
--enable-libdebuginfod=dummy

Install only Libelf:
make -C libelf install
install -vm644 config/libelf.pc /usr/lib/pkgconfig
rm /usr/lib/libelf.a

#### 8.50.2 Contents of Libelf

libelf.so
/usr/include/elfutils

libelf.so

Contains API functions to handle ELF object files

177

### 8.51 Libffi-3.4.6
The Libffi library provides a portable, high level programming interface to various calling conventions. This allows a
programmer to call any function specified by a call interface description at run time.
FFI stands for Foreign Function Interface. An FFI allows a program written in one language to call a program written
in another language. Specifically, Libffi can provide a bridge between an interpreter like Perl, or Python, and shared
library subroutines written in C, or C++.

1.7 SBU

#### 8.51.1 Installation of Libffi
Like GMP, Libffi builds with optimizations specific to the processor in use. If building for another system,
change the value of the --with-gcc-arch= parameter in the following command to an architecture name fully
implemented by the CPU on that system. If this is not done, all applications that link to libffi will trigger
Illegal Operation Errors.
Prepare Libffi for compilation:
--with-gcc-arch=native

--with-gcc-arch=native

Ensure GCC optimizes for the current system. If this is not specified, the system is guessed and the code generated
may not be correct. If the generated code will be copied from the native system to a less capable system, use the less
capable system as a parameter. For details about alternative system types, see the x86 options in the GCC manual.

#### 8.51.2 Contents of Libffi

libffi.so

libffi

Contains the foreign function interface API functions

178

### 8.52 Python-3.12.5
The Python 3 package contains the Python development environment. It is useful for object-oriented programming,
writing scripts, prototyping large programs, and developing entire applications. Python is an interpreted computer
language.

2.2 SBU
530 MB

#### 8.52.1 Installation of Python 3
Prepare Python for compilation:
--with-system-expat \
--enable-optimizations

--with-system-expat

This switch enables linking against the system version of Expat.
--enable-optimizations

This switch enables extensive, but time-consuming, optimization steps. The interpreter is built twice; tests
performed on the first build are used to improve the optimized final version.

Some tests are known to occasionally hang indefinitely. So to test the results, run the test suite but set a 2-minute time
limit for each test case:
make test TESTOPTS="--timeout 120"

For a relatively slow system you may need to increase the time limit and 1 SBU (measured when building Binutils pass
1 with one CPU core) should be enough. Some tests are flaky, so the test suite will automatically re-run failed tests. If
a test failed but then passed when re-run, it should be considered as passed.

We use the pip3 command to install Python 3 programs and modules for all users as root in several places in this
book. This conflicts with the Python developers' recommendation: to install packages into a virtual environment, or
into the home directory of a regular user (by running pip3 as this user). A multi-line warning is triggered whenever
pip3 is issued by the root user.
The main reason for the recommendation is to avoid conflicts with the system's package manager (dpkg, for example).
LFS does not have a system-wide package manager, so this is not a problem. Also, pip3 will check for a new version
of itself whenever it's run. Since domain name resolution is not yet configured in the LFS chroot environment, pip3
cannot check for a new version of itself, and will produce a warning.
After we boot the LFS system and set up a network connection, a different warning will be issued, telling the user
to update pip3 from a pre-built wheel on PyPI (whenever a new version is available). But LFS considers pip3 to
be a part of Python 3, so it should not be updated separately. Also, an update from a pre-built wheel would deviate
179

from our objective: to build a Linux system from source code. So the warning about a new version of pip3 should be
ignored as well. If you wish, you can suppress all these warnings by running the following command, which creates
a configuration file:
cat > /etc/pip.conf << EOF
[global]
root-user-action = ignore
disable-pip-version-check = true

In LFS and BLFS we normally build and install Python modules with the pip3 command. Please be sure that
the pip3 install commands in both books are run as the root user (unless it's for a Python virtual environment).
Running pip3 install as a non-root user may seem to work, but it will cause the installed module to be
inaccessible by other users.
pip3 install will not reinstall an already installed module automatically. When using the pip3 install
command to upgrade a module (for example, from meson-0.61.3 to meson-0.62.0), insert the option --upgrade
into the command line. If it's really necessary to downgrade a module, or reinstall the same version for some
reason, insert --force-reinstall --no-deps into the command line.
If desired, install the preformatted documentation:
install -v -dm755 /usr/share/doc/python-3.12.5/html
tar --no-same-owner \
-xvf ../python-3.12.5-docs-html.tar.bz2
cp -R --no-preserve=mode python-3.12.5-docs-html/* \
/usr/share/doc/python-3.12.5/html

The meaning of the documentation install commands:
--no-same-owner (tar) and --no-preserve=mode (cp)

Ensure the installed files have the correct ownership and permissions. Without these options, tar will install the
package files with the upstream creator's values and files would have restrictive permissions.

#### 8.52.2 Contents of Python 3

2to3, idle3, pip3, pydoc3, python3, and python3-config
libpython3.12.so and libpython3.so
/usr/include/python3.12, /usr/lib/python3, and /usr/share/doc/python-3.12.5

2to3

is a Python program that reads Python 2.x source code and applies a series of fixes to transform it into
valid Python 3.x code

idle3

is a wrapper script that opens a Python aware GUI editor. For this script to run, you must have installed
Tk before Python, so that the Tkinter Python module is built.

pip3

The package installer for Python. You can use pip to install packages from Python Package Index and
other indexes.

pydoc3

is the Python documentation tool

python3

is the interpreter for Python, an interpreted, interactive, object-oriented programming language
180

### 8.53 Flit-Core-3.9.0
Flit-core is the distribution-building parts of Flit (a packaging tool for simple Python modules).

1.6 MB

#### 8.53.1 Installation of Flit-Core

pip3 install --no-index --no-user --find-links dist flit_core

The meaning of the pip3 configuration options and commands:

wheel
This command builds the wheel archive for this package.
-w dist

Instructs pip to put the created wheel into the dist directory.
--no-cache-dir

Prevents pip from copying the created wheel into the /root/.cache/pip directory.
install
This command installs the package.
--no-build-isolation, --no-deps, and --no-index

These options prevent fetching files from the online package repository (PyPI). If packages are installed in the
correct order, pip won't need to fetch any files in the first place; these options add some safety in case of user error.
--find-links dist

Instructs pip to search for wheel archives in the dist directory.

#### 8.53.2 Contents of Flit-Core

/usr/lib/python3.12/site-packages/flit_core
flit_core-3.9.0.dist-info

181

and

/usr/lib/python3.12/site-packages/

### 8.54 Wheel-0.44.0
Wheel is a Python library that is the reference implementation of the Python wheel packaging standard.

1.5 MB

#### 8.54.1 Installation of Wheel
Compile Wheel with the following command:

Install Wheel with the following command:
pip3 install --no-index --find-links=dist wheel

#### 8.54.2 Contents of Wheel

wheel
/usr/lib/python3.12/site-packages/wheel
wheel-0.44.0.dist-info

wheel

is a utility to unpack, pack, or convert wheel archives

182

and

/usr/lib/python3.12/site-packages/

### 8.55 Setuptools-72.2.0
Setuptools is a tool used to download, build, install, upgrade, and uninstall Python packages.

35 MB

#### 8.55.1 Installation of Setuptools

pip3 install --no-index --find-links dist setuptools

#### 8.55.2 Contents of Setuptools

/usr/lib/python3.12/site-packages/_distutils_hack,
/usr/lib/python3.12/site-packages/
pkg_resources, /usr/lib/python3.12/site-packages/setuptools, and /usr/lib/python3.12/
site-packages/setuptools-72.2.0.dist-info

183

### 8.56 Ninja-1.12.1
Ninja is a small build system with a focus on speed.

37 MB

#### 8.56.1 Installation of Ninja
When run, ninja normally utilizes the greatest possible number of processes in parallel. By default this is the number
of cores on the system, plus two. This may overheat the CPU, or make the system run out of memory. When ninja is
invoked from the command line, passing the -jN parameter will limit the number of parallel processes. Some packages
embed the execution of ninja, and do not pass the -j parameter on to it.
Using the optional procedure below allows a user to limit the number of parallel processes via an environment variable,
NINJAJOBS. For example, setting:
export NINJAJOBS=4

will limit ninja to four parallel processes.
If desired, make ninja recognize the environment variable NINJAJOBS by running the stream editor:
sed -i '/int Guess/a \
int
j = 0;\
char* jobs = getenv( "NINJAJOBS" );\
if ( jobs != NULL ) j = atoi( jobs );\
if ( j > 0 ) return j;\
' src/ninja.cc

Build Ninja with:
python3 configure.py --bootstrap

The meaning of the build option:
--bootstrap

This parameter forces Ninja to rebuild itself for the current system.
The package tests cannot run in the chroot environment. They require cmake.
install -vm755 ninja /usr/bin/
install -vDm644 misc/bash-completion /usr/share/bash-completion/completions/ninja
install -vDm644 misc/zsh-completion /usr/share/zsh/site-functions/_ninja

#### 8.56.2 Contents of Ninja

ninja

ninja

is the Ninja build system

184

### 8.57 Meson-1.5.1
Meson is an open source build system designed to be both extremely fast and as user friendly as possible.

#### 8.57.1 Installation of Meson
Compile Meson with the following command:

The test suite requires some packages outside the scope of LFS.
pip3 install --no-index --find-links dist meson
install -vDm644 data/shell-completions/bash/meson /usr/share/bash-completion/completions/meson
install -vDm644 data/shell-completions/zsh/_meson /usr/share/zsh/site-functions/_meson

The meaning of the install parameters:
-w dist

Puts the created wheels into the dist directory.
--find-links dist

Installs wheels from the dist directory.

#### 8.57.2 Contents of Meson

meson
/usr/lib/python3.12/site-packages/meson-1.5.1.dist-info and /usr/lib/python3.12/sitepackages/mesonbuild

meson

A high productivity build system

185

### 8.58 Coreutils-9.5
The Coreutils package contains the basic utility programs needed by every operating system.

1.1 SBU
173 MB

#### 8.58.1 Installation of Coreutils
POSIX requires that programs from Coreutils recognize character boundaries correctly even in multibyte locales. The
following patch fixes this non-compliance and other internationalization-related bugs.
patch -Np1 -i ../coreutils-9.5-i18n-2.patch

Many bugs have been found in this patch. When reporting new bugs to the Coreutils maintainers, please check
first to see if those bugs are reproducible without this patch.
Now prepare Coreutils for compilation:
autoreconf -fiv
FORCE_UNSAFE_CONFIGURE=1 ./configure \
--enable-no-install-program=kill,uptime

autoreconf
The patch for internationalization has modified the build system, so the configuration files must be regenerated.
FORCE_UNSAFE_CONFIGURE=1

This environment variable allows the package to be built by the root user.
--enable-no-install-program=kill,uptime

The purpose of this switch is to prevent Coreutils from installing programs that will be installed by other packages.

Skip down to “Install the package” if not running the test suite.
Now the test suite is ready to be run. First, run the tests that are meant to be run as user root:
make NON_ROOT_USERNAME=tester check-root

We're going to run the remainder of the tests as the tester user. Certain tests require that the user be a member of more
than one group. So that these tests are not skipped, add a temporary group and make the user tester a part of it:
groupadd -g 102 dummy -U tester

Fix some of the permissions so that the non-root user can compile and run the tests:

186

Now run the tests (using /dev/null for the standard input, or two tests may be broken if building LFS in a graphical
terminal or a session in SSH or GNU Screen because the standard input is connected to a PTY from host distro, and
the device node for such a PTY cannot be accessed from the LFS chroot environment):
su tester -c "PATH=$PATH make -k RUN_EXPENSIVE_TESTS=yes check" \
< /dev/null

Remove the temporary group:
groupdel dummy

Two tests, tests/cp/preserve-mode.sh and tests/mv/acl.sh, are known to fail in the chroot environment, but pass in
a complete system.

Move programs to the locations specified by the FHS:
mv -v /usr/bin/chroot /usr/sbin
mv -v /usr/share/man/man1/chroot.1 /usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/' /usr/share/man/man8/chroot.8

#### 8.58.2 Contents of Coreutils

[, b2sum, base32, base64, basename, basenc, cat, chcon, chgrp, chmod, chown, chroot,
cksum, comm, cp, csplit, cut, date, dd, df, dir, dircolors, dirname, du, echo, env, expand,
expr, factor, false, fmt, fold, groups, head, hostid, id, install, join, link, ln, logname, ls,
md5sum, mkdir, mkfifo, mknod, mktemp, mv, nice, nl, nohup, nproc, numfmt, od, paste,
pathchk, pinky, pr, printenv, printf, ptx, pwd, readlink, realpath, rm, rmdir, runcon, seq,
sha1sum, sha224sum, sha256sum, sha384sum, sha512sum, shred, shuf, sleep, sort, split,
stat, stdbuf, stty, sum, sync, tac, tail, tee, test, timeout, touch, tr, true, truncate, tsort, tty,
uname, unexpand, uniq, unlink, users, vdir, wc, who, whoami, and yes
libstdbuf.so (in /usr/libexec/coreutils)
/usr/libexec/coreutils

[

Is an actual command, /usr/bin/[; it is a synonym for the test command

base32

Encodes and decodes data according to the base32 specification (RFC 4648)

base64

Encodes and decodes data according to the base64 specification (RFC 4648)

b2sum

Prints or checks BLAKE2 (512-bit) checksums

basename

Strips any path and a given suffix from a file name

basenc

Encodes or decodes data using various algorithms

cat

Concatenates files to standard output

chcon

Changes security context for files and directories

chgrp

Changes the group ownership of files and directories

chmod

Changes the permissions of each file to the given mode; the mode can be either a symbolic
representation of the changes to be made, or an octal number representing the new permissions
187

chown

Changes the user and/or group ownership of files and directories

chroot

Runs a command with the specified directory as the / directory

cksum

Prints the Cyclic Redundancy Check (CRC) checksum and the byte counts of each specified file

comm

Compares two sorted files, outputting in three columns the lines that are unique and the lines that are
common

cp

Copies files

csplit

Splits a given file into several new files, separating them according to given patterns or line numbers,
and outputting the byte count of each new file

cut

Prints sections of lines, selecting the parts according to given fields or positions

date

Displays the current date and time in the given format, or sets the system date and time

dd

Copies a file using the given block size and count, while optionally performing conversions on it

df

Reports the amount of disk space available (and used) on all mounted file systems, or only on the file
systems holding the selected files

dir

Lists the contents of each given directory (the same as the ls command)

dircolors

Outputs commands to set the LS_COLOR environment variable to change the color scheme used by ls

dirname

Extracts the directory portion(s) of the given name(s)

du

Reports the amount of disk space used by the current directory, by each of the given directories
(including all subdirectories) or by each of the given files

Displays the given strings

env

Runs a command in a modified environment

expand

Converts tabs to spaces

expr

Evaluates expressions

factor

Prints the prime factors of the specified integers

false

Does nothing, unsuccessfully; it always exits with a status code indicating failure

fmt

Reformats the paragraphs in the given files

fold

Wraps the lines in the given files

groups

Reports a user's group memberships

head

Prints the first ten lines (or the given number of lines) of each given file

hostid

Reports the numeric identifier (in hexadecimal) of the host

id

Reports the effective user ID, group ID, and group memberships of the current user or specified user

install

Copies files while setting their permission modes and, if possible, their owner and group

join

Joins the lines that have identical join fields from two separate files

link

Creates a hard link (with the given name) to a file

ln

Makes hard links or soft (symbolic) links between files

logname

Reports the current user's login name

ls

Lists the contents of each given directory

md5sum

Reports or checks Message Digest 5 (MD5) checksums
188

mkdir

Creates directories with the given names

mkfifo

Creates First-In, First-Outs (FIFOs), "named pipes" in UNIX parlance, with the given names

mknod

Creates device nodes with the given names; a device node is a character special file, a block special
file, or a FIFO

mktemp

Creates temporary files in a secure manner; it is used in scripts

mv

Moves or renames files or directories

nice

Runs a program with modified scheduling priority

nl

Numbers the lines from the given files

nohup

Runs a command immune to hangups, with its output redirected to a log file

nproc

Prints the number of processing units available to a process

numfmt

Converts numbers to or from human-readable strings

od

Dumps files in octal and other formats

paste

Merges the given files, joining sequentially corresponding lines side by side, separated by tab characters

pathchk

Checks if file names are valid or portable

pinky

Is a lightweight finger client; it reports some information about the given users

pr

Paginates and columnates files for printing

printenv

Prints the environment

printf

Prints the given arguments according to the given format, much like the C printf function

ptx

Produces a permuted index from the contents of the given files, with each keyword in its context

pwd

Reports the name of the current working directory

readlink

Reports the value of the given symbolic link

realpath

Prints the resolved path

rm

Removes files or directories

rmdir

Removes directories if they are empty

runcon

Runs a command with specified security context

seq

Prints a sequence of numbers within a given range and with a given increment

sha1sum

Prints or checks 160-bit Secure Hash Algorithm 1 (SHA1) checksums

sha224sum

Prints or checks 224-bit Secure Hash Algorithm checksums

sha256sum

Prints or checks 256-bit Secure Hash Algorithm checksums

sha384sum

Prints or checks 384-bit Secure Hash Algorithm checksums

sha512sum

Prints or checks 512-bit Secure Hash Algorithm checksums

shred

Overwrites the given files repeatedly with complex patterns, making it difficult to recover the data

shuf

Shuffles lines of text

sleep

Pauses for the given amount of time

sort

Sorts the lines from the given files

split

Splits the given file into pieces, by size or by number of lines
189

stat

Displays file or filesystem status

stdbuf

Runs commands with altered buffering operations for its standard streams

stty

Sets or reports terminal line settings

sum

Prints checksum and block counts for each given file

sync

Flushes file system buffers; it forces changed blocks to disk and updates the super block

tac

Concatenates the given files in reverse

tail

Prints the last ten lines (or the given number of lines) of each given file

tee

Reads from standard input while writing both to standard output and to the given files

test

Compares values and checks file types

timeout

Runs a command with a time limit

touch

Changes file timestamps, setting the access and modification times of the given files to the current time;
files that do not exist are created with zero length

tr

Translates, squeezes, and deletes the given characters from standard input

true

Does nothing, successfully; it always exits with a status code indicating success

truncate

Shrinks or expands a file to the specified size

tsort

Performs a topological sort; it writes a completely ordered list according to the partial ordering in a
given file

tty

Reports the file name of the terminal connected to standard input

uname

Reports system information

unexpand

Converts spaces to tabs

uniq

Discards all but one of successive identical lines

unlink

Removes the given file

users

Reports the names of the users currently logged on

vdir

Is the same as ls -l

wc

Reports the number of lines, words, and bytes for each given file, as well as grand totals when more
than one file is given

who

Reports who is logged on

whoami

Reports the user name associated with the current effective user ID

yes

Repeatedly outputs y or a given string, until killed

libstdbuf

Library used by stdbuf

190

### 8.59 Check-0.15.2
Check is a unit testing framework for C.

### 0.1 SBU (about 2.1 SBU with tests)

#### 8.59.1 Installation of Check
Prepare Check for compilation:
./configure --prefix=/usr --disable-static

Compilation is now complete. To run the Check test suite, issue the following command:

make docdir=/usr/share/doc/check-0.15.2 install

#### 8.59.2 Contents of Check

checkmk
libcheck.so

checkmk

Awk script for generating C unit tests for use with the Check unit testing framework

libcheck.so

Contains functions that allow Check to be called from a test program

191

### 8.60 Diffutils-3.10
The Diffutils package contains programs that show the differences between files or directories.

42 MB

#### 8.60.1 Installation of Diffutils
Prepare Diffutils for compilation:

#### 8.60.2 Contents of Diffutils

cmp, diff, diff3, and sdiff

cmp

Compares two files and reports any differences byte by byte

diff

Compares two files or directories and reports which lines in the files differ

diff3

Compares three files line by line

sdiff

Merges two files and interactively outputs the results

192

### 8.61 Gawk-5.3.0
The Gawk package contains programs for manipulating text files.

42 MB

#### 8.61.1 Installation of Gawk
First, ensure some unneeded files are not installed:
sed -i 's/extras//' Makefile.in

Prepare Gawk for compilation:

rm -f /usr/bin/gawk-5.3.0

The meaning of the command:

rm -f /usr/bin/gawk-5.3.0
The building system will not recreate the hard link gawk-5.3.0 if it already exists. Remove it to ensure that the
previous hard link installed in Section 6.9, “Gawk-5.3.0” is updated here.
The installation process already created awk as a symlink to gawk, create its man page as a symlink as well:
ln -sv gawk.1 /usr/share/man/man1/awk.1

mkdir -pv
/usr/share/doc/gawk-5.3.0
cp
-v doc/{awkforai.txt,*.{eps,pdf,jpg}} /usr/share/doc/gawk-5.3.0

#### 8.61.2 Contents of Gawk

awk (link to gawk), gawk, and gawk-5.3.0
filefuncs.so, fnmatch.so, fork.so, inplace.so, intdiv.so, ordchr.so, readdir.so, readfile.so,
revoutput.so, revtwoway.so, rwarray.so, and time.so (all in /usr/lib/gawk)
/usr/lib/gawk, /usr/libexec/awk, /usr/share/awk, and /usr/share/doc/gawk-5.3.0

awk

A link to gawk

gawk

A program for manipulating text files; it is the GNU implementation of awk

gawk-5.3.0

A hard link to gawk
193

### 8.62 Findutils-4.10.0
The Findutils package contains programs to find files. Programs are provided to search through all the files in a directory
tree and to create, maintain, and search a database (often faster than the recursive find, but unreliable unless the database
has been updated recently). Findutils also supplies the xargs program, which can be used to run a specified command
on each file selected by a search.

0.7 SBU
62 MB

#### 8.62.1 Installation of Findutils
Prepare Findutils for compilation:
./configure --prefix=/usr --localstatedir=/var/lib/locate

--localstatedir

This option moves the locate database to /var/lib/locate, which is the FHS-compliant location.

#### 8.62.2 Contents of Findutils

find, locate, updatedb, and xargs
/var/lib/locate

find

Searches given directory trees for files matching the specified criteria

locate

Searches through a database of file names and reports the names that contain a given string or match
a given pattern

updatedb

Updates the locate database; it scans the entire file system (including other file systems that are currently
mounted, unless told not to) and puts every file name it finds into the database

xargs

Can be used to apply a given command to a list of files

194

### 8.63 Groff-1.23.0
The Groff package contains programs for processing and formatting text and images.

107 MB

#### 8.63.1 Installation of Groff
Groff expects the environment variable PAGE to contain the default paper size. For users in the United States, PAGE=letter
is appropriate. Elsewhere, PAGE=A4 may be more suitable. While the default paper size is configured during compilation,
it can be overridden later by echoing either “A4” or “letter” to the /etc/papersize file.
Prepare Groff for compilation:
PAGE=<paper_size> ./configure --prefix=/usr

#### 8.63.2 Contents of Groff

addftinfo, afmtodit, chem, eqn, eqn2graph, gdiffmk, glilypond, gperl, gpinyin,
grap2graph, grn, grodvi, groff, groffer, grog, grolbp, grolj4, gropdf, grops, grotty,
hpftodit, indxbib, lkbib, lookbib, mmroff, neqn, nroff, pdfmom, pdfroff, pfbtops, pic,
pic2graph, post-grohtml, preconv, pre-grohtml, refer, roff2dvi, roff2html, roff2pdf,
roff2ps, roff2text, roff2x, soelim, tbl, tfmtodit, and troff
/usr/lib/groff and /usr/share/doc/groff-1.23.0, /usr/share/groff

addftinfo

Reads a troff font file and adds some additional font-metric information that is used by the groff
system

afmtodit

Creates a font file for use with groff and grops

chem

Groff preprocessor for producing chemical structure diagrams

eqn

Compiles descriptions of equations embedded within troff input files into commands that are
understood by troff

eqn2graph

Converts a troff EQN (equation) into a cropped image

gdiffmk

Marks differences between groff/nroff/troff files

glilypond

Transforms sheet music written in the lilypond language into the groff language

gperl

Preprocessor for groff, allowing the insertion of perl code into groff files

gpinyin

Preprocessor for groff, allowing the insertion of Pinyin (Mandarin Chinese spelled with the Roman
alphabet) into groff files.
195

grap2graph

Converts a grap program file into a cropped bitmap image (grap is an old Unix programming
language for creating diagrams)

grn

A groff preprocessor for gremlin files

grodvi

A driver for groff that produces TeX dvi format output files

groff

A front end to the groff document formatting system; normally, it runs the troff program and a
post-processor appropriate for the selected device

groffer

Displays groff files and man pages on X and tty terminals

grog

Reads files and guesses which of the groff options -e, -man, -me, -mm, -ms, -p, -s, and -t are required
for printing files, and reports the groff command including those options

grolbp

Is a groff driver for Canon CAPSL printers (LBP-4 and LBP-8 series laser printers)

grolj4

Is a driver for groff that produces output in PCL5 format suitable for an HP LaserJet 4 printer

gropdf

Translates the output of GNU troff to PDF

grops

Translates the output of GNU troff to PostScript

grotty

Translates the output of GNU troff into a form suitable for typewriter-like devices

hpftodit

Creates a font file for use with groff -Tlj4 from an HP-tagged font metric file

indxbib

Creates an inverted index for the bibliographic databases with a specified file for use with refer,
lookbib, and lkbib

lkbib

Searches bibliographic databases for references that contain specified keys and reports any
references found

lookbib

Prints a prompt on the standard error (unless the standard input is not a terminal), reads a line
containing a set of keywords from the standard input, searches the bibliographic databases in a
specified file for references containing those keywords, prints any references found on the standard
output, and repeats this process until the end of input

mmroff

A simple preprocessor for groff

neqn

Formats equations for American Standard Code for Information Interchange (ASCII) output

nroff

A script that emulates the nroff command using groff

pdfmom

Is a wrapper around groff that facilitates the production of PDF documents from files formatted
with the mom macros.

pdfroff

Creates pdf documents using groff

pfbtops

Translates a PostScript font in .pfb format to ASCII

pic

Compiles descriptions of pictures embedded within troff or TeX input files into commands
understood by TeX or troff

pic2graph

Converts a PIC diagram into a cropped image

post-grohtml

Translates the output of GNU troff to HTML

preconv

Converts encoding of input files to something GNU troff understands

pre-grohtml

Translates the output of GNU troff to HTML

refer

Copies the contents of a file to the standard output, except that lines between .[ and .] are interpreted
as citations, and lines between .R1 and .R2 are interpreted as commands for how citations are to
be processed
196

roff2dvi

Transforms roff files into DVI format

roff2html

Transforms roff files into HTML format

roff2pdf

Transforms roff files into PDFs

roff2ps

Transforms roff files into ps files

roff2text

Transforms roff files into text files

roff2x

Transforms roff files into other formats

soelim

Reads files and replaces lines of the form .so file by the contents of the mentioned file

tbl

Compiles descriptions of tables embedded within troff input files into commands that are
understood by troff

tfmtodit

Creates a font file for use with groff -Tdvi

troff

Is highly compatible with Unix troff; it should usually be invoked using the groff command, which
will also run preprocessors and post-processors in the appropriate order and with the appropriate
options

197

### 8.64 GRUB-2.12
The GRUB package contains the GRand Unified Bootloader.

166 MB

#### 8.64.1 Installation of GRUB
If your system has UEFI support and you wish to boot LFS with UEFI, you need to install GRUB with UEFI
support (and its dependencies) by following the instructions on the BLFS page. You may skip this package,
or install this package and the BLFS GRUB for UEFI package without conflict (the BLFS page provides
instructions for both cases).

Unset any environment variables which may affect the build:
unset {C,CPP,CXX,LD}FLAGS

Don't try “tuning” this package with custom compilation flags. This package is a bootloader. The low-level
operations in the source code may be broken by aggressive optimization.
Add a file missing from the release tarball:
echo depends bli part_gpt > grub-core/extra_deps.lst

Prepare GRUB for compilation:
--disable-efiemu

This allows the build to complete with warnings introduced by more recent versions of Flex.
--disable-efiemu

This option minimizes what is built by disabling a feature and eliminating some test programs not needed for LFS.

The test suite for this packages is not recommended. Most of the tests depend on packages that are not available in the
limited LFS environment. To run the tests anyway, run make check.
mv -v /etc/bash_completion.d/grub /usr/share/bash-completion/completions

Making your LFS system bootable with GRUB will be discussed in Section 10.4, “Using GRUB to Set Up the Boot
Process.”
198

#### 8.64.2 Contents of GRUB

grub-bios-setup, grub-editenv, grub-file, grub-fstest, grub-glue-efi, grub-install, grubkbdcomp, grub-macbless, grub-menulst2cfg, grub-mkconfig, grub-mkimage, grubmklayout, grub-mknetdir, grub-mkpasswd-pbkdf2, grub-mkrelpath, grub-mkrescue,
grub-mkstandalone, grub-ofpathname, grub-probe, grub-reboot, grub-render-label, grubscript-check, grub-set-default, grub-sparc64-setup, and grub-syslinux2cfg
/usr/lib/grub, /etc/grub.d, /usr/share/grub, and /boot/grub (when grub-install is first run)

grub-bios-setup

Is a helper program for grub-install

grub-editenv

Is a tool to edit the environment block

grub-file

Checks to see if the given file is of the specified type

grub-fstest

Is a tool to debug the filesystem driver

grub-glue-efi

Glues 32-bit and 64-bit binaries into a single file (for Apple machines)

grub-install

Installs GRUB on your drive

grub-kbdcomp

Is a script that converts an xkb layout into one recognized by GRUB

grub-macbless

Is the Mac-style bless for HFS or HFS+ file systems (bless is peculiar to Apple
machines; it makes a device bootable)

grub-menulst2cfg

Converts a GRUB Legacy menu.lst into a grub.cfg for use with GRUB 2

grub-mkconfig

Generates a grub.cfg file

grub-mkimage

Makes a bootable image of GRUB

grub-mklayout

Generates a GRUB keyboard layout file

grub-mknetdir

Prepares a GRUB netboot directory

grub-mkpasswd-pbkdf2

Generates an encrypted PBKDF2 password for use in the boot menu

grub-mkrelpath

Makes a system pathname relative to its root

grub-mkrescue

Makes a bootable image of GRUB suitable for a floppy disk, CDROM/DVD, or a USB
drive

grub-mkstandalone

Generates a standalone image

grub-ofpathname

Is a helper program that prints the path to a GRUB device

grub-probe

Probes device information for a given path or device

grub-reboot

Sets the default boot entry for GRUB for the next boot only

grub-render-label

Renders Apple .disk_label for Apple Macs

grub-script-check

Checks the GRUB configuration script for syntax errors

grub-set-default

Sets the default boot entry for GRUB

grub-sparc64-setup

Is a helper program for grub-setup

grub-syslinux2cfg

Transforms a syslinux config file into grub.cfg format

199

### 8.65 Gzip-1.13
The Gzip package contains programs for compressing and decompressing files.

21 MB

#### 8.65.1 Installation of Gzip
Prepare Gzip for compilation:

#### 8.65.2 Contents of Gzip

gunzip, gzexe, gzip, uncompress (hard link with gunzip), zcat, zcmp, zdiff, zegrep,
zfgrep, zforce, zgrep, zless, zmore, and znew

gunzip

Decompresses gzipped files

gzexe

Creates self-decompressing executable files

gzip

Compresses the given files using Lempel-Ziv (LZ77) coding

uncompress

Decompresses compressed files

zcat

Decompresses the given gzipped files to standard output

zcmp

Runs cmp on gzipped files

zdiff

Runs diff on gzipped files

zegrep

Runs egrep on gzipped files

zfgrep

Runs fgrep on gzipped files

zforce

Forces a .gz extension on all given files that are gzipped files, so that gzip will not compress them
again; this can be useful when file names were truncated during a file transfer

zgrep

Runs grep on gzipped files

zless

Runs less on gzipped files

zmore

Runs more on gzipped files

znew

Re-compresses files from compress format to gzip format—.Z to .gz

200

### 8.66 IPRoute2-6.10.0
The IPRoute2 package contains programs for basic and advanced IPV4-based networking.

17 MB

#### 8.66.1 Installation of IPRoute2
The arpd program included in this package will not be built since it depends on Berkeley DB, which is not installed
in LFS. However, a directory and a man page for arpd will still be installed. Prevent this by running the commands
shown below.
sed -i /ARPD/d Makefile
rm -fv man/man8/arpd.8

make NETNS_RUN_DIR=/run/netns

This package does not have a working test suite.
make SBINDIR=/usr/sbin install

mkdir -pv
/usr/share/doc/iproute2-6.10.0
cp -v COPYING README* /usr/share/doc/iproute2-6.10.0

#### 8.66.2 Contents of IPRoute2

bridge, ctstat (link to lnstat), genl, ifstat, ip, lnstat, nstat, routel, rtacct, rtmon, rtpr, rtstat
(link to lnstat), ss, and tc
/etc/iproute2, /usr/lib/tc, and /usr/share/doc/iproute2-6.10.0

bridge

Configures network bridges

ctstat

Connection status utility

genl

Generic netlink utility front end

ifstat

Shows interface statistics, including the number of packets transmitted and received, by interface

ip

The main executable. It has several different functions, including these:
ip link <device> allows users to look at the state of devices and to make changes
ip addr allows users to look at addresses and their properties, add new addresses, and delete old ones
ip neighbor allows users to look at neighbor bindings and their properties, add new neighbor entries, and
delete old ones
ip rule allows users to look at the routing policies and change them
ip route allows users to look at the routing table and change routing table rules
ip tunnel allows users to look at the IP tunnels and their properties, and change them
ip maddr allows users to look at the multicast addresses and their properties, and change them
201

ip mroute allows users to set, change, or delete the multicast routing
ip monitor allows users to continuously monitor the state of devices, addresses and routes
lnstat

Provides Linux network statistics; it is a generalized and more feature-complete replacement for the old
rtstat program

nstat

Displays network statistics

routel

A component of ip route, for listing the routing tables

rtacct

Displays the contents of /proc/net/rt_acct

rtmon

Route monitoring utility

rtpr

Converts the output of ip -o into a readable form

rtstat

Route status utility

ss

Similar to the netstat command; shows active connections

tc

Traffic control for Quality of Service (QoS) and Class of Service (CoS) implementations
tc qdisc allows users to set up the queueing discipline
tc class allows users to set up classes based on the queuing discipline scheduling
tc filter allows users to set up the QoS/CoS packet filtering
tc monitor can be used to view changes made to Traffic Control in the kernel.

202

8.67. Kbd-2.6.4
The Kbd package contains key-table files, console fonts, and keyboard utilities.

34 MB

#### 8.67.1 Installation of Kbd
The behavior of the backspace and delete keys is not consistent across the keymaps in the Kbd package. The following
patch fixes this issue for i386 keymaps:
patch -Np1 -i ../kbd-2.6.4-backspace-1.patch

After patching, the backspace key generates the character with code 127, and the delete key generates a well-known
escape sequence.
Remove the redundant resizecons program (it requires the defunct svgalib to provide the video mode files - for normal
use setfont sizes the console appropriately) together with its manpage.
sed -i '/RESIZECONS_PROGS=/s/yes/no/' configure
sed -i 's/resizecons.8 //' docs/man/man8/Makefile.in

Prepare Kbd for compilation:
./configure --prefix=/usr --disable-vlock

--disable-vlock

This option prevents the vlock utility from being built because it requires the PAM library, which isn't available
in the chroot environment.

For some languages (e.g., Belarusian) the Kbd package doesn't provide a useful keymap where the stock
“by” keymap assumes the ISO-8859-5 encoding, and the CP1251 keymap is normally used. Users of such
languages have to download working keymaps separately.
cp -R -v docs/doc -T /usr/share/doc/kbd-2.6.4

203

#### 8.67.2 Contents of Kbd

chvt, deallocvt, dumpkeys, fgconsole, getkeycodes, kbdinfo, kbd_mode, kbdrate,
loadkeys, loadunimap, mapscrn, openvt, psfaddtable (link to psfxtable), psfgettable (link
to psfxtable), psfstriptable (link to psfxtable), psfxtable, setfont, setkeycodes, setleds,
setmetamode, setvtrgb, showconsolefont, showkey, unicode_start, and unicode_stop
/usr/share/consolefonts, /usr/share/consoletrans, /usr/share/keymaps, /usr/share/doc/
kbd-2.6.4, and /usr/share/unimaps

chvt

Changes the foreground virtual terminal

deallocvt

Deallocates unused virtual terminals

dumpkeys

Dumps the keyboard translation tables

fgconsole

Prints the number of the active virtual terminal

getkeycodes

Prints the kernel scancode-to-keycode mapping table

kbdinfo

Obtains information about the status of a console

kbd_mode

Reports or sets the keyboard mode

kbdrate

Sets the keyboard repeat and delay rates

loadkeys

Loads the keyboard translation tables

loadunimap

Loads the kernel unicode-to-font mapping table

mapscrn

An obsolete program that used to load a user-defined output character mapping table into the
console driver; this is now done by setfont

openvt

Starts a program on a new virtual terminal (VT)

psfaddtable

Adds a Unicode character table to a console font

psfgettable

Extracts the embedded Unicode character table from a console font

psfstriptable

Removes the embedded Unicode character table from a console font

psfxtable

Handles Unicode character tables for console fonts

setfont

Changes the Enhanced Graphic Adapter (EGA) and Video Graphics Array (VGA) fonts on
the console

setkeycodes

Loads kernel scancode-to-keycode mapping table entries; this is useful if there are unusual
keys on the keyboard

setleds

Sets the keyboard flags and Light Emitting Diodes (LEDs)

setmetamode

Defines the keyboard meta-key handling

setvtrgb

Sets the console color map in all virtual terminals

showconsolefont

Shows the current EGA/VGA console screen font

showkey

Reports the scancodes, keycodes, and ASCII codes of the keys pressed on the keyboard

unicode_start

Puts the keyboard and console in UNICODE mode [Don't use this program unless your
keymap file is in the ISO-8859-1 encoding. For other encodings, this utility produces incorrect
results.]

unicode_stop

Reverts keyboard and console from UNICODE mode
204

### 8.68 Libpipeline-1.5.7
The Libpipeline package contains a library for manipulating pipelines of subprocesses in a flexible and convenient way.

9.7 MB

#### 8.68.1 Installation of Libpipeline
Prepare Libpipeline for compilation:

#### 8.68.2 Contents of Libpipeline

libpipeline.so

libpipeline

This library is used to safely construct pipelines between subprocesses

205

### 8.69 Make-4.4.1
The Make package contains a program for controlling the generation of executables and other non-source files of a
package from source files.

0.7 SBU
13 MB

#### 8.69.1 Installation of Make
Prepare Make for compilation:

#### 8.69.2 Contents of Make

Automatically determines which pieces of a package need to be (re)compiled and then issues the relevant
commands

206

### 8.70 Patch-2.7.6
The Patch package contains a program for modifying or creating files by applying a “patch” file typically created by
the diff program.

12 MB

#### 8.70.1 Installation of Patch
Prepare Patch for compilation:

#### 8.70.2 Contents of Patch

patch

patch

Modifies files according to a patch file (A patch file is normally a difference listing created with the diff
program. By applying these differences to the original files, patch creates the patched versions.)

207

8.71. Tar-1.35
The Tar package provides the ability to create tar archives as well as perform various other kinds of archive
manipulation. Tar can be used on previously created archives to extract files, to store additional files, or to update or
list files which were already stored.

0.7 SBU

#### 8.71.1 Installation of Tar
Prepare Tar for compilation:
FORCE_UNSAFE_CONFIGURE=1 \

FORCE_UNSAFE_CONFIGURE=1

This forces the test for mknod to be run as root. It is generally considered dangerous to run this test as the root
user, but as it is being run on a system that has only been partially built, overriding it is OK.

One test, capabilities: binary store/restore, is known to fail if it is run because LFS lacks selinux, but will be skipped if
the host kernel does not support extended attributes or security labels on the filesystem used for building LFS.
make -C doc install-html docdir=/usr/share/doc/tar-1.35

#### 8.71.2 Contents of Tar

tar
/usr/share/doc/tar-1.35

tar

Creates, extracts files from, and lists the contents of archives, also known as tarballs

208

### 8.72 Texinfo-7.1
The Texinfo package contains programs for reading, writing, and converting info pages.

139 MB

#### 8.72.1 Installation of Texinfo
Prepare Texinfo for compilation:

Optionally, install the components belonging in a TeX installation:
make TEXMF=/usr/share/texmf install-tex

The meaning of the make parameter:
TEXMF=/usr/share/texmf

The TEXMF makefile variable holds the location of the root of the TeX tree if, for example, a TeX package will
be installed later.
The Info documentation system uses a plain text file to hold its list of menu entries. The file is located at /usr/share/
info/dir. Unfortunately, due to occasional problems in the Makefiles of various packages, it can sometimes get out
of sync with the info pages installed on the system. If the /usr/share/info/dir file ever needs to be recreated, the
following optional commands will accomplish the task:
pushd /usr/share/info
rm -v dir
for f in *
do install-info $f dir 2>/dev/null

#### 8.72.2 Contents of Texinfo

info, install-info, makeinfo (link to texi2any), pdftexi2dvi, pod2texi, texi2any, texi2dvi,
texi2pdf, and texindex
MiscXS.so, Parsetexi.so, and XSParagraph.so (all in /usr/lib/texinfo)
/usr/share/texinfo and /usr/lib/texinfo

info

Used to read info pages which are similar to man pages, but often go much deeper than just
explaining all the available command line options [For example, compare man bison and info
bison.]
209

install-info

Used to install info pages; it updates entries in the info index file

makeinfo

Translates the given Texinfo source documents into info pages, plain text, or HTML

pdftexi2dvi

Used to format the given Texinfo document into a Portable Document Format (PDF) file

pod2texi

Converts Pod to Texinfo format

texi2any

Translate Texinfo source documentation to various other formats

texi2dvi

Used to format the given Texinfo document into a device-independent file that can be printed

texi2pdf

Used to format the given Texinfo document into a Portable Document Format (PDF) file

texindex

Used to sort Texinfo index files

210

8.73. Vim-9.1.0660
The Vim package contains a powerful text editor.
Approximate build time: 2.9 SBU
245 MB

Alternatives to Vim
If you prefer another editor—such as Emacs, Joe, or Nano—please refer to https://www.linuxfromscratch.
org/blfs/view/12.2/postlfs/editors.html for suggested installation instructions.

#### 8.73.1 Installation of Vim
First, change the default location of the vimrc configuration file to /etc:
echo '#define SYS_VIMRC_FILE "/etc/vimrc"' >> src/feature.h

Prepare Vim for compilation:

To prepare the tests, ensure that user tester can write to the source tree:

Now run the tests as user tester:
su tester -c "TERM=xterm-256color LANG=en_US.UTF-8 make -j1 test" \
&> vim-test.log

The test suite outputs a lot of binary data to the screen. This can cause issues with the settings of the current terminal
(especially while we are overriding the TERM variable to satisfy some assumptions of the test suite). The problem can
be avoided by redirecting the output to a log file as shown above. A successful test will result in the words ALL DONE
in the log file at completion.

Many users reflexively type vi instead of vim. To allow execution of vim when users habitually enter vi, create a
symlink for both the binary and the man page in the provided languages:
ln -sv vim /usr/bin/vi
for L in /usr/share/man/{,*/}man1/vim.1; do
ln -sv vim.1 $(dirname $L)/vi.1

By default, Vim's documentation is installed in /usr/share/vim. The following symlink allows the documentation to be
accessed via /usr/share/doc/vim-9.1.0660, making it consistent with the location of documentation for other packages:
ln -sv ../vim/vim91/doc /usr/share/doc/vim-9.1.0660

If an X Window System is going to be installed on the LFS system, it may be necessary to recompile Vim after installing
X. Vim comes with a GUI version of the editor that requires X and some additional libraries to be installed. For more
information on this process, refer to the Vim documentation and the Vim installation page in the BLFS book at https://
www.linuxfromscratch.org/blfs/view/12.2/postlfs/vim.html.
211

#### 8.73.2 Configuring Vim
By default, vim runs in vi-incompatible mode. This may be new to users who have used other editors in the past. The
“nocompatible” setting is included below to highlight the fact that a new behavior is being used. It also reminds those
who would change to “compatible” mode that it should be the first setting in the configuration file. This is necessary
because it changes other settings, and overrides must come after this setting. Create a default vim configuration file
by running the following:
cat > /etc/vimrc << "EOF"
" Begin /etc/vimrc
" Ensure defaults are set before customizing settings, not after
source $VIMRUNTIME/defaults.vim
let skip_defaults_vim=1
set nocompatible
set backspace=2
set mouse=
syntax on
if (&term == "xterm") || (&term == "putty")
set background=dark
endif
" End /etc/vimrc

The set nocompatible setting makes vim behave in a more useful way (the default) than the vi-compatible manner.
Remove the “no” to keep the old vi behavior. The set backspace=2 setting allows backspacing over line breaks,
autoindents, and the start of an insert. The syntax on parameter enables vim's syntax highlighting. The set mouse=
setting enables proper pasting of text with the mouse when working in chroot or over a remote connection. Finally, the
if statement with the set background=dark setting corrects vim's guess about the background color of some terminal
emulators. This gives the highlighting a better color scheme for use on the black background of these programs.
Documentation for other available options can be obtained by running the following command:
vim -c ':options'

By default, vim only installs spell-checking files for the English language. To install spell-checking files for
your preferred language, copy the .spl and optionally, the .sug files for your language and character encoding
from runtime/spell into /usr/share/vim/vim91/spell/.
To use these spell-checking files, some configuration in /etc/vimrc is needed, e.g.:
set spelllang=en,ru
set spell

For more information, see runtime/spell/README.txt.

#### 8.73.3 Contents of Vim

ex (link to vim), rview (link to vim), rvim (link to vim), vi (link to vim), view (link to
vim), vim, vimdiff (link to vim), vimtutor, and xxd
/usr/share/vim
212

ex

Starts vim in ex mode

rview

Is a restricted version of view; no shell commands can be started and view cannot be suspended

rvim

Is a restricted version of vim; no shell commands can be started and vim cannot be suspended

vi

Link to vim

view

Starts vim in read-only mode

vim

Is the editor

vimdiff

Edits two or three versions of a file with vim and shows differences

vimtutor

Teaches the basic keys and commands of vim

xxd

Creates a hex dump of the given file; it can also perform the inverse operation, so it can be used for
binary patching

213

### 8.74 MarkupSafe-2.1.5
MarkupSafe is a Python module that implements an XML/HTML/XHTML Markup safe string.

508 KB

#### 8.74.1 Installation of MarkupSafe
Compile MarkupSafe with the following command:

pip3 install --no-index --no-user --find-links dist Markupsafe

#### 8.74.2 Contents of MarkupSafe

/usr/lib/python3.12/site-packages/MarkupSafe-2.1.5.dist-info

214

### 8.75 Jinja2-3.1.4
Jinja2 is a Python module that implements a simple pythonic template language.

2.5 MB

#### 8.75.1 Installation of Jinja2

pip3 install --no-index --no-user --find-links dist Jinja2

#### 8.75.2 Contents of Jinja2

/usr/lib/python3.12/site-packages/Jinja2-3.1.4.dist-info

215

### 8.76 Udev from Systemd-256.4
The Udev package contains programs for dynamic creation of device nodes.
Approximate build time: 0.2 SBU
144 MB

#### 8.76.1 Installation of Udev
Udev is part of the systemd-256.4 package. Use the systemd-256.4.tar.xz file as the source tarball.
Remove two unneeded groups, render and sgx, from the default udev rules:
sed -i -e 's/GROUP="render"/GROUP="video"/' \
-e 's/GROUP="sgx", //' rules.d/50-udev-default.rules.in

Remove one udev rule requiring a full Systemd installation:
sed '/systemd-sysctl/s/^/#/' -i rules.d/99-systemd.rules.in

Adjust the hardcoded paths to network configuration files for the standalone udev installation:
sed '/NETWORK_DIRS/s/systemd/udev/' -i src/basic/path-lookup.h

Prepare Udev for compilation:
mkdir -p build
meson setup ..
--buildtype=release
-D mode=release
-D dev-kvm-mode=0660
-D link-udev-shared=false \
-D logind=false
-D vconsole=false

The meaning of the meson options:
--buildtype=release

This switch overrides the default buildtype (“debug”), which produces unoptimized binaries.
-D mode=release

Disable some features considered experimental by upstream.
-D dev-kvm-mode=0660

The default udev rule would allow all users to access /dev/kvm. The editors consider it dangerous. This option
overrides it.
-D link-udev-shared=false

This option prevents udev from linking to the internal systemd shared library, libsystemd-shared. This library is
designed to be shared by many Systemd components and it's too overkill for a udev-only installation.
-D logind=false -D vconsole=false

These options prevent the generation of several udev rule files belonging to the other Systemd components that
we won't install.
Get the list of the shipped udev helpers and save it into an environment variable (exporting it is not strictly necessary,
but it makes building as a regular user or using a package manager easier):
export udev_helpers=$(grep "'name' :" ../src/udev/meson.build | \
awk '{print $3}' | tr -d ",'" | grep -v 'udevadm')

216

Only build the components needed for udev:
ninja udevadm systemd-hwdb
$(ninja -n | grep -Eo '(src/(lib)?udev|rules.d|hwdb.d)/[^ ]*') \
$(realpath libudev.so --relative-to .)
$udev_helpers

install -vm755 -d {/usr/lib,/etc}/udev/{hwdb.d,rules.d,network}
install -vm755 -d /usr/{lib,share}/pkgconfig
install -vm755 udevadm
/usr/bin/
install -vm755 systemd-hwdb
/usr/bin/udev-hwdb
ln
-svfn ../bin/udevadm
/usr/sbin/udevd
cp
-av
libudev.so{,*[0-9]}
/usr/lib/
install -vm644 ../src/libudev/libudev.h
/usr/include/
install -vm644 src/libudev/*.pc
/usr/lib/pkgconfig/
install -vm644 src/udev/*.pc
/usr/share/pkgconfig/
install -vm644 ../src/udev/udev.conf
/etc/udev/
install -vm644 rules.d/* ../rules.d/README
/usr/lib/udev/rules.d/
install -vm644 $(find ../rules.d/*.rules \
-not -name '*power-switch*') /usr/lib/udev/rules.d/
install -vm644 hwdb.d/* ../hwdb.d/{*.hwdb,README} /usr/lib/udev/hwdb.d/
install -vm755 $udev_helpers
/usr/lib/udev
install -vm644 ../network/99-default.link
/usr/lib/udev/network

Install some custom rules and support files useful in an LFS environment:
tar -xvf ../../udev-lfs-20230818.tar.xz
make -f udev-lfs-20230818/Makefile.lfs install

Install the man pages:
tar -xf ../../systemd-man-pages-256.4.tar.xz
--no-same-owner --strip-components=1
-C /usr/share/man --wildcards '*/udev*' '*/libudev*'
'*/systemd.link.5'
'*/systemd-'{hwdb,udevd.service}.8

sed 's|systemd/network|udev/network|'
/usr/share/man/man5/systemd.link.5
> /usr/share/man/man5/udev.link.5

sed 's/systemd\(\\\?-\)/udev\1/' /usr/share/man/man8/systemd-hwdb.8
> /usr/share/man/man8/udev-hwdb.8

sed 's|lib.*udevd|sbin/udevd|'
/usr/share/man/man8/systemd-udevd.service.8
> /usr/share/man/man8/udevd.8

rm /usr/share/man/man*/systemd*

Finally, unset the udev_helpers variable:
unset udev_helpers

#### 8.76.2 Configuring Udev
Information about hardware devices is maintained in the /etc/udev/hwdb.d and /usr/lib/udev/hwdb.d directories. Udev
needs that information to be compiled into a binary database /etc/udev/hwdb.bin. Create the initial database:
udev-hwdb update

217

This command needs to be run each time the hardware information is updated.

#### 8.76.3 Contents of Udev

udevadm, udevd (symlink to udevadm), and udev-hwdb
libudev.so
/etc/udev and /usr/lib/udev

udevadm

Generic udev administration tool: controls the udevd daemon, provides info from the Udev database,
monitors uevents, waits for uevents to finish, tests Udev configuration, and triggers uevents for a given
device

udevd

A daemon that listens for uevents on the netlink socket, creates devices and runs the configured external
programs in response to these uevents

udev-hwdb

Updates or queries the hardware database.

libudev

A library interface to udev device information

/etc/udev

Contains Udev configuration files, device permissions, and rules for device naming

218

### 8.77 Man-DB-2.12.1
The Man-DB package contains programs for finding and viewing man pages.

#### 8.77.1 Installation of Man-DB
Prepare Man-DB for compilation:
--docdir=/usr/share/doc/man-db-2.12.1 \
--disable-setuid
--enable-cache-owner=bin
--with-browser=/usr/bin/lynx
--with-vgrind=/usr/bin/vgrind
--with-grap=/usr/bin/grap
--with-systemdtmpfilesdir=
--with-systemdsystemunitdir=

--disable-setuid

This disables making the man program setuid to user man.
--enable-cache-owner=bin

This changes ownership of the system-wide cache files to user bin.
--with-...

These three parameters are used to set some default programs. lynx is a text-based web browser (see BLFS for
installation instructions), vgrind converts program sources to Groff input, and grap is useful for typesetting graphs
in Groff documents. The vgrind and grap programs are not normally needed for viewing manual pages. They are
not part of LFS or BLFS, but you should be able to install them yourself after finishing LFS if you wish to do so.
--with-systemd...

These parameters prevent installing unneeded systemd directories and files.

#### 8.77.2 Non-English Manual Pages in LFS
The following table shows the character set that Man-DB assumes manual pages installed under /usr/share/man/<ll>
will be encoded with. In addition to this, Man-DB correctly determines if manual pages installed in that directory are
UTF-8 encoded.
219

Table 8.1. Expected character encoding of legacy 8-bit manual pages

Language (code)

Encoding

Language (code)

Encoding

Danish (da)

Croatian (hr)

German (de)

Hungarian (hu)

English (en)

Japanese (ja)

EUC-JP

Spanish (es)

Korean (ko)

EUC-KR

Estonian (et)

Lithuanian (lt)

ISO-8859-13

Finnish (fi)

Latvian (lv)

ISO-8859-13

French (fr)

Macedonian (mk)

ISO-8859-5

Irish (ga)

Polish (pl)

Galician (gl)

Romanian (ro)

Indonesian (id)

Greek (el)

ISO-8859-7

Icelandic (is)

Slovak (sk)

Italian (it)

Slovenian (sl)

Norwegian
(nb)

Bokmal ISO-8859-1

Serbian Latin (sr@latin)

Dutch (nl)

Serbian (sr)

ISO-8859-5

Norwegian Nynorsk ISO-8859-1
(nn)

Turkish (tr)

ISO-8859-9

Norwegian (no)

Ukrainian (uk)

KOI8-U

Portuguese (pt)

Vietnamese (vi)

TCVN5712-1

Swedish (sv)

Simplified Chinese (zh_CN)

GBK

Belarusian (be)

CP1251

Simplified
(zh_SG)

Bulgarian (bg)

CP1251

Traditional Chinese, Hong Kong BIG5HKSCS
(zh_HK)

Czech (cs)

Traditional Chinese (zh_TW)

Chinese,

Singapore GBK

BIG5

Manual pages in languages not in the list are not supported.

#### 8.77.3 Contents of Man-DB

accessdb, apropos (link to whatis), catman, lexgrog, man, man-recode, mandb, manpath,
and whatis
libman.so and libmandb.so (both in /usr/lib/man-db)
/usr/lib/man-db, /usr/libexec/man-db, and /usr/share/doc/man-db-2.12.1

accessdb

Dumps the whatis database contents in human-readable form
220

apropos

Searches the whatis database and displays the short descriptions of system commands that contain
a given string

catman

Creates or updates the pre-formatted manual pages

lexgrog

Displays one-line summary information about a given manual page

man

Formats and displays the requested manual page

man-recode

Converts manual pages to another encoding

mandb

Creates or updates the whatis database

manpath

Displays the contents of $MANPATH or (if $MANPATH is not set) a suitable search path based on
the settings in man.conf and the user's environment

whatis

Searches the whatis database and displays the short descriptions of system commands that contain
the given keyword as a separate word

libman

Contains run-time support for man

libmandb

Contains run-time support for man

221

### 8.78 Procps-ng-4.0.4
The Procps-ng package contains programs for monitoring processes.

26 MB

#### 8.78.1 Installation of Procps-ng
Prepare Procps-ng for compilation:
--docdir=/usr/share/doc/procps-ng-4.0.4 \
--disable-kill

--disable-kill

This switch disables building the kill command; it will be installed from the Util-linux package.

To run the test suite, run:

One test named ps with output flag bsdtime,cputime,etime,etimes is known to fail if the host kernel is not built
with CONFIG_BSD_PROCESS_ACCT enabled.

#### 8.78.2 Contents of Procps-ng

free, pgrep, pidof, pkill, pmap, ps, pwdx, slabtop, sysctl, tload, top, uptime, vmstat, w,
and watch
libproc-2.so
/usr/include/procps and /usr/share/doc/procps-ng-4.0.4

free

Reports the amount of free and used memory (both physical and swap memory) in the system

pgrep

Looks up processes based on their name and other attributes

pidof

Reports the PIDs of the given programs

pkill

Signals processes based on their name and other attributes

pmap

Reports the memory map of the given process

ps

Lists the current running processes

pwdx

Reports the current working directory of a process

slabtop

Displays detailed kernel slab cache information in real time
222

sysctl

Modifies kernel parameters at run time

tload

Prints a graph of the current system load average

top

Displays a list of the most CPU intensive processes; it provides an ongoing look at processor activity
in real time

uptime

Reports how long the system has been running, how many users are logged on, and the system load
averages

vmstat

Reports virtual memory statistics, giving information about processes, memory, paging, block Input/
Output (IO), traps, and CPU activity

w

Shows which users are currently logged on, where, and since when

watch

Runs a given command repeatedly, displaying the first screen-full of its output; this allows a user to
watch the output change over time

libproc-2

Contains the functions used by most programs in this package

223

### 8.79 Util-linux-2.40.2
The Util-linux package contains miscellaneous utility programs. Among them are utilities for handling file systems,
consoles, partitions, and messages.

0.5 SBU
315 MB

#### 8.79.1 Installation of Util-linux
Prepare Util-linux for compilation:
./configure --bindir=/usr/bin
--libdir=/usr/lib
--runstatedir=/run
--sbindir=/usr/sbin
--disable-chfn-chsh
--disable-login
--disable-nologin
--disable-su
--disable-setpriv
--disable-runuser
--disable-pylibmount \
--disable-liblastlog2 \
--without-python
--without-systemd
--without-systemdsystemunitdir
ADJTIME_PATH=/var/lib/hwclock/adjtime \
--docdir=/usr/share/doc/util-linux-2.40.2

The --disable and --without options prevent warnings about building components that either require packages not in
LFS, or are inconsistent with programs installed by other packages.

If desired, create a dummy /etc/fstab file to satisfy two tests and run the test suite as a non-root user:

Running the test suite as the root user can be harmful to your system. To run it, the CONFIG_SCSI_DEBUG
option for the kernel must be available in the currently running system and must be built as a module. Building
it into the kernel will prevent booting. For complete coverage, other BLFS packages must be installed. If
desired, this test can be run by booting into the completed LFS system and running:
bash tests/run.sh --srcdir=$PWD --builddir=$PWD
touch /etc/fstab
su tester -c "make -k check"

The hardlink tests will fail if the host's kernel does not have the option CONFIG_CRYPTO_USER_API_HASH enabled or does
not have any options providing a SHA256 implementation (for example, CONFIG_CRYPTO_SHA256, or CONFIG_CRYPTO_
SHA256_SSSE3 if the CPU supports Supplemental SSE3) enabled. In addition, the lsfd: inotify test will fail if the kernel
option CONFIG_NETLINK_DIAG is not enabled.
224

#### 8.79.2 Contents of Util-linux

addpart, agetty, blkdiscard, blkid, blkzone, blockdev, cal, cfdisk, chcpu, chmem, choom,
chrt, col, colcrt, colrm, column, ctrlaltdel, delpart, dmesg, eject, fallocate, fdisk, fincore,
findfs, findmnt, flock, fsck, fsck.cramfs, fsck.minix, fsfreeze, fstrim, getopt, hardlink,
hexdump, hwclock, i386 (link to setarch), ionice, ipcmk, ipcrm, ipcs, irqtop, isosize, kill,
last, lastb (link to last), ldattach, linux32 (link to setarch), linux64 (link to setarch), logger,
look, losetup, lsblk, lscpu, lsipc, lsirq, lsfd, lslocks, lslogins, lsmem, lsns, mcookie,
mesg, mkfs, mkfs.bfs, mkfs.cramfs, mkfs.minix, mkswap, more, mount, mountpoint,
namei, nsenter, partx, pivot_root, prlimit, readprofile, rename, renice, resizepart, rev,
rfkill, rtcwake, script, scriptlive, scriptreplay, setarch, setsid, setterm, sfdisk, sulogin,
swaplabel, swapoff, swapon, switch_root, taskset, uclampset, ul, umount, uname26 (link
to setarch), unshare, utmpdump, uuidd, uuidgen, uuidparse, wall, wdctl, whereis, wipefs,
x86_64 (link to setarch), and zramctl
libblkid.so, libfdisk.so, libmount.so, libsmartcols.so, and libuuid.so
/usr/include/blkid,
/usr/include/libfdisk,
/usr/include/libmount,
/usr/include/
libsmartcols, /usr/include/uuid, /usr/share/doc/util-linux-2.40.2, and /var/lib/hwclock

addpart

Informs the Linux kernel of new partitions

agetty

Opens a tty port, prompts for a login name, and then invokes the login program

blkdiscard

Discards sectors on a device

blkid

A command line utility to locate and print block device attributes

blkzone

Is used to manage zoned storage block devices

blockdev

Allows users to call block device ioctls from the command line

cal

Displays a simple calendar

cfdisk

Manipulates the partition table of the given device

chcpu

Modifies the state of CPUs

chmem

Configures memory

choom

Displays and adjusts OOM-killer scores, used to determine which process to kill first when Linux
is Out Of Memory

chrt

Manipulates real-time attributes of a process

col

Filters out reverse line feeds

colcrt

Filters nroff output for terminals that lack some capabilities, such as overstriking and half-lines

colrm

Filters out the given columns

column

Formats a given file into multiple columns

ctrlaltdel

Sets the function of the Ctrl+Alt+Del key combination to a hard or a soft reset

delpart

Asks the Linux kernel to remove a partition
225

dmesg

Dumps the kernel boot messages

eject

Ejects removable media

fallocate

Preallocates space to a file

fdisk

Manipulates the partition table of the given device

fincore

Counts pages of file contents in core

findfs

Finds a file system, either by label or Universally Unique Identifier (UUID)

findmnt

Is a command line interface to the libmount library for working with mountinfo, fstab and mtab files

flock

Acquires a file lock and then executes a command with the lock held

fsck

Is used to check, and optionally repair, file systems

fsck.cramfs

Performs a consistency check on the Cramfs file system on the given device

fsck.minix

Performs a consistency check on the Minix file system on the given device

fsfreeze

Is a very simple wrapper around FIFREEZE/FITHAW ioctl kernel driver operations

fstrim

Discards unused blocks on a mounted filesystem

getopt

Parses options in the given command line

hardlink

Consolidates duplicate files by creating hard links

hexdump

Dumps the given file in hexadecimal, decimal, octal, or ascii

hwclock

Reads or sets the system's hardware clock, also called the Real-Time Clock (RTC) or Basic InputOutput System (BIOS) clock

i386

ionice

Gets or sets the io scheduling class and priority for a program

ipcmk

Creates various IPC resources

ipcrm

Removes the given Inter-Process Communication (IPC) resource

ipcs

Provides IPC status information

irqtop

Displays kernel interrupt counter information in top(1) style view

isosize

Reports the size of an iso9660 file system

kill

Sends signals to processes

last

Shows which users last logged in (and out), searching back through the /var/log/wtmp file; it also
shows system boots, shutdowns, and run-level changes

lastb

Shows the failed login attempts, as logged in /var/log/btmp

ldattach

Attaches a line discipline to a serial line

linux32

linux64

logger

Enters the given message into the system log

look

Displays lines that begin with the given string

losetup

Sets up and controls loop devices

lsblk

Lists information about all or selected block devices in a tree-like format
226

lscpu

Prints CPU architecture information

lsfd

Displays information about open files; replaces lsof

lsipc

Prints information on IPC facilities currently employed in the system

lsirq

Displays kernel interrupt counter information

lslocks

Lists local system locks

lslogins

Lists information about users, groups and system accounts

lsmem

Lists the ranges of available memory with their online status

lsns

Lists namespaces

mcookie

Generates magic cookies (128-bit random hexadecimal numbers) for xauth

mesg

Controls whether other users can send messages to the current user's terminal

mkfs

Builds a file system on a device (usually a hard disk partition)

mkfs.bfs

Creates a Santa Cruz Operations (SCO) bfs file system

mkfs.cramfs

Creates a cramfs file system

mkfs.minix

Creates a Minix file system

mkswap

Initializes the given device or file to be used as a swap area

more

A filter for paging through text one screen at a time

mount

Attaches the file system on the given device to a specified directory in the file-system tree

mountpoint

Checks if the directory is a mountpoint

namei

Shows the symbolic links in the given paths

nsenter

Runs a program with namespaces of other processes

partx

Tells the kernel about the presence and numbering of on-disk partitions

pivot_root

Makes the given file system the new root file system of the current process

prlimit

Gets and sets a process's resource limits

readprofile

Reads kernel profiling information

rename

Renames the given files, replacing a given string with another

renice

Alters the priority of running processes

resizepart

Asks the Linux kernel to resize a partition

rev

Reverses the lines of a given file

rfkill

Tool for enabling and disabling wireless devices

rtcwake

Used to enter a system sleep state until the specified wakeup time

script

Makes a typescript of a terminal session

scriptlive

Re-runs session typescripts using timing information

scriptreplay

Plays back typescripts using timing information

setarch

Changes reported architecture in a new program environment, and sets personality flags

setsid

Runs the given program in a new session

setterm

Sets terminal attributes
227

sfdisk

A disk partition table manipulator

sulogin

Allows root to log in; it is normally invoked by init when the system goes into single user mode

swaplabel

Makes changes to the swap area's UUID and label

swapoff

Disables devices and files for paging and swapping

swapon

Enables devices and files for paging and swapping, and lists the devices and files currently in use

switch_root

Switches to another filesystem as the root of the mount tree

taskset

Retrieves or sets a process's CPU affinity

uclampset

Manipulates the utilization clamping attributes of the system or a process

ul

A filter for translating underscores into escape sequences indicating underlining for the terminal
in use

umount

Disconnects a file system from the system's file tree

uname26

unshare

Runs a program with some namespaces unshared from parent

utmpdump

Displays the content of the given login file in a user-friendly format

uuidd

A daemon used by the UUID library to generate time-based UUIDs in a secure and guaranteedunique fashion

uuidgen

Creates new UUIDs. Each new UUID is a random number likely to be unique among all UUIDs
created, on the local system and on other systems, in the past and in the future, with extremely
high probability (2128 UUIDs are possible)

uuidparse

A utility to parse unique identifiers

wall

Displays the contents of a file or, by default, its standard input, on the terminals of all currently
logged in users

wdctl

Shows hardware watchdog status

whereis

Reports the location of the binary, source, and man page files for the given command

wipefs

Wipes a filesystem signature from a device

x86_64

zramctl

A program to set up and control zram (compressed ram disk) devices

libblkid

Contains routines for device identification and token extraction

libfdisk

Contains routines for manipulating partition tables

libmount

Contains routines for block device mounting and unmounting

libsmartcols

Contains routines for aiding screen output in tabular form

libuuid

Contains routines for generating unique identifiers for objects that may be accessible beyond the
local system

228

### 8.80 E2fsprogs-1.47.1
The E2fsprogs package contains the utilities for handling the ext2 file system. It also supports the ext3 and ext4
journaling file systems.
Approximate build time: 2.4 SBU on a spinning disk, 0.5 SBU on an SSD
98 MB

#### 8.80.1 Installation of E2fsprogs
The E2fsprogs documentation recommends that the package be built in a subdirectory of the source tree:

Prepare E2fsprogs for compilation:
--enable-elf-shlibs
--disable-libblkid
--disable-libuuid
--disable-uuidd
--disable-fsck

--enable-elf-shlibs

This creates the shared libraries which some programs in this package use.
--disable-*

These prevent building and installing the libuuid and libblkid libraries, the uuidd daemon, and the fsck wrapper;
util-linux installs more recent versions.

To run the tests, issue:

One test named m_assume_storage_prezeroed is known to fail.

Remove useless static libraries:
rm -fv /usr/lib/{libcom_err,libe2p,libext2fs,libss}.a

This package installs a gzipped .info file but doesn't update the system-wide dir file. Unzip this file and then update
the system dir file using the following commands:
gunzip -v /usr/share/info/libext2fs.info.gz
install-info --dir-file=/usr/share/info/dir /usr/share/info/libext2fs.info

If desired, create and install some additional documentation by issuing the following commands:
makeinfo -o
doc/com_err.info ../lib/et/com_err.texinfo
install -v -m644 doc/com_err.info /usr/share/info
install-info --dir-file=/usr/share/info/dir /usr/share/info/com_err.info

229

#### 8.80.2 Configuring E2fsprogs
/etc/mke2fs.conf contains the default value of various command line options of mke2fs. You may edit the file to make

the default values suitable for your need. For example, some utilities (not in LFS or BLFS) cannot recognize a ext4
file system with metadata_csum_seed feature enabled. If you need such an utility, you may remove the feature from the
default ext4 feature list with the command:
sed 's/metadata_csum_seed,//' -i /etc/mke2fs.conf

Read the man page mke2fs.conf(5) for details.

#### 8.80.3 Contents of E2fsprogs

badblocks, chattr, compile_et, debugfs, dumpe2fs, e2freefrag, e2fsck, e2image, e2label,
e2mmpstatus, e2scrub, e2scrub_all, e2undo, e4crypt, e4defrag, filefrag, fsck.ext2,
fsck.ext3, fsck.ext4, logsave, lsattr, mk_cmds, mke2fs, mkfs.ext2, mkfs.ext3, mkfs.ext4,
mklost+found, resize2fs, and tune2fs
libcom_err.so, libe2p.so, libext2fs.so, and libss.so
/usr/include/e2p, /usr/include/et, /usr/include/ext2fs, /usr/include/ss, /usr/lib/e2fsprogs, /
usr/share/et, and /usr/share/ss

badblocks

Searches a device (usually a disk partition) for bad blocks

chattr

Changes the attributes of files on ext{234} file systems

compile_et

An error table compiler; it converts a table of error-code names and messages into a C source file
suitable for use with the com_err library

debugfs

A file system debugger; it can be used to examine and change the state of ext{234} file systems

dumpe2fs

Prints the super block and blocks group information for the file system present on a given device

e2freefrag

Reports free space fragmentation information

e2fsck

Is used to check and optionally repair ext{234} file systems

e2image

Is used to save critical ext{234} file system data to a file

e2label

Displays or changes the file system label on the ext{234} file system on a given device

e2mmpstatus

Checks MMP (Multiple Mount Protection) status of an ext4 file system

e2scrub

Checks the contents of a mounted ext{234} file system

e2scrub_all

Checks all mounted ext{234} file systems for errors

e2undo

Replays the undo log for an ext{234} file system found on a device. [This can be used to undo a
failed operation by an E2fsprogs program.]

e4crypt

Ext4 file system encryption utility

e4defrag

Online defragmenter for ext4 file systems

filefrag

Reports on how badly fragmented a particular file might be

fsck.ext2

By default checks ext2 file systems and is a hard link to e2fsck

fsck.ext3

By default checks ext3 file systems and is a hard link to e2fsck

fsck.ext4

By default checks ext4 file systems and is a hard link to e2fsck
230

logsave

Saves the output of a command in a log file

lsattr

Lists the attributes of files on a second extended file system

mk_cmds

Converts a table of command names and help messages into a C source file suitable for use with
the libss subsystem library

mke2fs

Creates an ext{234} file system on the given device

mkfs.ext2

By default creates ext2 file systems and is a hard link to mke2fs

mkfs.ext3

By default creates ext3 file systems and is a hard link to mke2fs

mkfs.ext4

By default creates ext4 file systems and is a hard link to mke2fs

mklost+found

Creates a lost+found directory on an ext{234} file system; it pre-allocates disk blocks to this
directory to lighten the task of e2fsck

resize2fs

Can be used to enlarge or shrink ext{234} file systems

tune2fs

Adjusts tunable file system parameters on ext{234} file systems

libcom_err

The common error display routine

libe2p

Used by dumpe2fs, chattr, and lsattr

libext2fs

Contains routines to enable user-level programs to manipulate ext{234} file systems

libss

Used by debugfs

231

### 8.81 Sysklogd-2.6.1
The Sysklogd package contains programs for logging system messages, such as those emitted by the kernel when
unusual things happen.

3.9 MB

#### 8.81.1 Installation of Sysklogd
Prepare the package for compilation:
--sysconfdir=/etc \
--runstatedir=/run \
--without-logger

#### 8.81.2 Configuring Sysklogd
Create a new /etc/syslog.conf file by running the following:
cat > /etc/syslog.conf << "EOF"
auth,authpriv.* -/var/log/auth.log
*.*;auth,authpriv.none -/var/log/sys.log
daemon.* -/var/log/daemon.log
kern.* -/var/log/kern.log
mail.* -/var/log/mail.log
user.* -/var/log/user.log
*.emerg *
secure_mode 2

#### 8.81.3 Contents of Sysklogd

syslogd

syslogd

Logs the messages that system programs offer for logging [Every logged message contains at least a date
stamp and a hostname, and normally the program's name too, but that depends on how trusting the logging
daemon is told to be.]

232

### 8.82 SysVinit-3.10
The SysVinit package contains programs for controlling the startup, running, and shutdown of the system.

2.8 MB

#### 8.82.1 Installation of SysVinit
First, apply a patch that removes several programs installed by other packages, clarifies a message, and fixes a compiler
warning:
patch -Np1 -i ../sysvinit-3.10-consolidated-1.patch

#### 8.82.2 Contents of SysVinit

bootlogd, fstab-decode, halt, init, killall5, poweroff (link to halt), reboot (link to halt),
runlevel, shutdown, and telinit (link to init)

bootlogd

Logs boot messages to a log file

fstab-decode

Runs a command with fstab-encoded arguments

halt

Normally invokes shutdown with the -h option, but when already in run-level 0, it tells the kernel
to halt the system; it notes in the file /var/log/wtmp that the system is going down

init

The first process to be started when the kernel has initialized the hardware; it takes over the boot
process and starts all the processes specified in its configuration file

killall5

Sends a signal to all processes, except the processes in its own session; it will not kill its parent shell

poweroff

Tells the kernel to halt the system and switch off the computer (see halt)

reboot

Tells the kernel to reboot the system (see halt)

runlevel

Reports the previous and the current run-level, as noted in the last run-level record in /run/utmp

shutdown

Brings the system down in a secure way, signaling all processes and notifying all logged-in users

telinit

Tells init which run-level to change to

233

### 8.83 About Debugging Symbols
Most programs and libraries are, by default, compiled with debugging symbols included (with gcc's -g option). This
means that when debugging a program or library that was compiled with debugging information, the debugger can
provide not only memory addresses, but also the names of the routines and variables.
The inclusion of these debugging symbols enlarges a program or library significantly. Here are two examples of the
amount of space these symbols occupy:
- A bash binary with debugging symbols: 1200 KB
- A bash binary without debugging symbols: 480 KB (60% smaller)
- Glibc and GCC files (/lib and /usr/lib) with debugging symbols: 87 MB
- Glibc and GCC files without debugging symbols: 16 MB (82% smaller)
Sizes will vary depending on which compiler and C library were used, but a program that has been stripped of debugging
symbols is usually some 50% to 80% smaller than its unstripped counterpart. Because most users will never use a
debugger on their system software, a lot of disk space can be regained by removing these symbols. The next section
shows how to strip all debugging symbols from the programs and libraries.

### 8.84 Stripping
This section is optional. If the intended user is not a programmer and does not plan to do any debugging of the system
software, the system's size can be decreased by some 2 GB by removing the debugging symbols, and some unnecessary
symbol table entries, from binaries and libraries. This causes no real inconvenience for a typical Linux user.
Most people who use the commands mentioned below do not experience any difficulties. However, it is easy to make a
mistake and render the new system unusable. So before running the strip commands, it is a good idea to make a backup
of the LFS system in its current state.
A strip command with the --strip-unneeded option removes all debug symbols from a binary or library. It also removes
all symbol table entries not needed by the linker (for static libraries) or dynamic linker (for dynamically linked binaries
and shared libraries).
The debugging symbols from selected libraries are compressed with Zlib and preserved in separate files. That debugging
information is needed to run regression tests with valgrind or gdb later, in BLFS.
Note that strip will overwrite the binary or library file it is processing. This can crash the processes using code or data
from the file. If the process running strip is affected, the binary or library being stripped can be destroyed; this can
make the system completely unusable. To avoid this problem we copy some libraries and binaries into /tmp, strip them
there, then reinstall them with the install command. (The related entry in Section 8.2.1, “Upgrade Issues” gives the
rationale for using the install command here.)

The ELF loader's name is ld-linux-x86-64.so.2 on 64-bit systems and ld-linux.so.2 on 32-bit systems. The
construct below selects the correct name for the current architecture, excluding anything ending with g, in
case the commands below have already been run.

234

If there is any package whose version is different from the version specified by the book (either following
a security advisory or satisfying personal preference), it may be necessary to update the library file name in
save_usrlib or online_usrlib. Failing to do so may render the system completely unusable.
save_usrlib="$(cd /usr/lib; ls ld-linux*[^g])
libc.so.6
libthread_db.so.1
libquadmath.so.0.0.0
libstdc++.so.6.0.33
libitm.so.1.0.0
libatomic.so.1.2.0"
cd /usr/lib
for LIB in $save_usrlib; do
objcopy --only-keep-debug --compress-debug-sections=zlib $LIB $LIB.dbg
cp $LIB /tmp/$LIB
strip --strip-unneeded /tmp/$LIB
objcopy --add-gnu-debuglink=$LIB.dbg /tmp/$LIB
install -vm755 /tmp/$LIB /usr/lib
rm /tmp/$LIB
online_usrbin="bash find strip"
online_usrlib="libbfd-2.43.1.so
libsframe.so.1.0.0
libhistory.so.8.2
libncursesw.so.6.5
libm.so.6
libreadline.so.8.2
libz.so.1.3.1
libzstd.so.1.5.6
$(cd /usr/lib; find libnss*.so* -type f)"
for BIN in $online_usrbin; do
cp /usr/bin/$BIN /tmp/$BIN
strip --strip-unneeded /tmp/$BIN
install -vm755 /tmp/$BIN /usr/bin
rm /tmp/$BIN
for LIB in $online_usrlib; do
cp /usr/lib/$LIB /tmp/$LIB
strip --strip-unneeded /tmp/$LIB
install -vm755 /tmp/$LIB /usr/lib
rm /tmp/$LIB
for i in $(find /usr/lib -type f -name \*.so* ! -name \*dbg) \
$(find /usr/lib -type f -name \*.a)
$(find /usr/{bin,sbin,libexec} -type f); do
case "$online_usrbin $online_usrlib $save_usrlib" in
*$(basename $i)* )
- ) strip --strip-unneeded $i
unset BIN LIB save_usrlib online_usrbin online_usrlib

235

A large number of files will be flagged as errors because their file format is not recognized. These warnings can be
safely ignored. They indicate that those files are scripts, not binaries.

### 8.85 Cleaning Up
Finally, clean up some extra files left over from running tests:
rm -rf /tmp/{*,.*}

There are also several files in the /usr/lib and /usr/libexec directories with a file name extension of .la. These are "libtool
archive" files. On a modern Linux system the libtool .la files are only useful for libltdl. No libraries in LFS are expected
to be loaded by libltdl, and it's known that some .la files can break BLFS package builds. Remove those files now:
find /usr/lib /usr/libexec -name \*.la -delete

For more information about libtool archive files, see the BLFS section "About Libtool Archive (.la) files".
The compiler built in Chapter 6 and Chapter 7 is still partially installed and not needed anymore. Remove it with:
find /usr -depth -name $(uname -m)-lfs-linux-gnu\* | xargs rm -rf

Finally, remove the temporary 'tester' user account created at the beginning of the previous chapter.
userdel -r tester

236

## Chapter 9. System Configuration
### 9.1 Introduction
Booting a Linux system involves several tasks. The process must mount both virtual and real file systems, initialize
devices, check file systems for integrity, mount and activate any swap partitions or files, set the system clock, bring up
networking, start any daemons required by the system, and accomplish any other custom tasks specified by the user. This
process must be organized to ensure the tasks are performed in the correct order and executed as quickly as possible.

#### 9.1.1 System V
System V is the classic boot process that has been used in Unix and Unix-like systems such as Linux since about 1983.
It consists of a small program, init, that sets up basic processes such as login (via getty) and runs a script. This script,
usually named rc, controls the execution of a set of additional scripts that perform the tasks required to initialize the
system.
The init program is controlled by the /etc/inittab file and is organized into run levels that can be chosen by the user.
In LFS, they are used as follows:
0 — halt
1 — Single user mode
2 — User definable
3 — Full multiuser mode
4 — User definable
5 — Full multiuser mode with display manager
6 — reboot
The usual default run level is 3 or 5.

Advantages
- Established, well understood system.
- Easy to customize.

Disadvantages
- May be slower to boot. A medium speed base LFS system takes 8-12 seconds where the boot time is measured
from the first kernel message to the login prompt. Network connectivity is typically established about 2 seconds
after the login prompt.
- Serial processing of boot tasks. This is related to the previous point. A delay in any process, such as a file system
check, will delay the entire boot process.
- Does not directly support advanced features like control groups (cgroups) and per-user fair share scheduling.
- Adding scripts requires manual, static sequencing decisions.

237

### 9.2 LFS-Bootscripts-20240825
The LFS-Bootscripts package contains a set of scripts to start/stop the LFS system at bootup/shutdown. The
configuration files and procedures needed to customize the boot process are described in the following sections.

248 KB

#### 9.2.1 Installation of LFS-Bootscripts

#### 9.2.2 Contents of LFS-Bootscripts
Installed scripts:

checkfs, cleanfs, console, functions, halt, ifdown, ifup, localnet, modules, mountfs,
mountvirtfs, network, rc, reboot, sendsignals, setclock, ipv4-static, swap, sysctl,
sysklogd, template, udev, and udev_retry
/etc/rc.d, /etc/init.d (symbolic link), /etc/sysconfig, /lib/services, /lib/lsb (symbolic link)

checkfs

Checks the integrity of the file systems before they are mounted (with the exception of journaling
and network-based file systems)

cleanfs

Removes files that should not be preserved between reboots, such as those in /run/ and /var/lock/;
it re-creates /run/utmp and removes the possibly present /etc/nologin, /fastboot, and /forcefsck
files

console

Loads the correct keymap table for the desired keyboard layout; it also sets the screen font

functions

Contains common functions, such as error and status checking, that are used by several bootscripts

halt

Halts the system

ifdown

Stops a network device

ifup

Initializes a network device

Sets up the system's hostname and local loopback device

Loads kernel modules listed in /etc/sysconfig/modules, using arguments that are also given there

mountfs

Mounts all file systems, except those that are marked noauto, or are network based

Mounts virtual kernel file systems, such as proc

network

Sets up network interfaces, such as network cards, and sets up the default gateway (where applicable)

rc

The master run-level control script; it is responsible for running all the other bootscripts one-by-one,
in a sequence determined by the names of the symbolic links to those other bootscripts

reboot

Reboots the system

sendsignals

Makes sure every process is terminated before the system reboots or halts

setclock

Resets the system clock to local time if the hardware clock is not set to UTC

ipv4-static

Provides the functionality needed to assign a static Internet Protocol (IP) address to a network
interface
238

Enables and disables swap files and partitions

sysctl

Loads system configuration values from /etc/sysctl.conf, if that file exists, into the running kernel

sysklogd

Starts and stops the system and kernel log daemons

template

A template to create custom bootscripts for other daemons

udev

Prepares the /dev directory and starts the udev daemon

udev_retry

Retries failed udev uevents, and copies generated rules files from /run/udev to /etc/udev/rules.
d if required

239

### 9.3 Overview of Device and Module Handling
In Chapter 8, we installed the udev daemon when udev was built. Before we go into the details regarding how udev
works, a brief history of previous methods of handling devices is in order.
Linux systems in general traditionally used a static device creation method, whereby a great many device nodes were
created under /dev (sometimes literally thousands of nodes), regardless of whether the corresponding hardware devices
actually existed. This was typically done via a MAKEDEV script, which contained a number of calls to the mknod
program with the relevant major and minor device numbers for every possible device that might exist in the world.
Using the udev method, device nodes are only created for those devices which are detected by the kernel. These device
nodes are created each time the system boots; they are stored in a devtmpfs file system (a virtual file system that resides
entirely in system memory). Device nodes do not require much space, so the memory that is used is negligible.

#### 9.3.1 History
In February 2000, a new filesystem called devfs was merged into the 2.3.46 kernel and was made available during
the 2.4 series of stable kernels. Although it was present in the kernel source itself, this method of creating devices
dynamically never received overwhelming support from the core kernel developers.
The main problem with the approach adopted by devfs was the way it handled device detection, creation, and naming.
The latter issue, that of device node naming, was perhaps the most critical. It is generally accepted that if device names
are configurable, the device naming policy should be chosen by system administrators, and not imposed on them by the
developer(s). The devfs file system also suffered from race conditions that were inherent in its design; these could not
be fixed without a substantial revision of the kernel. devfs was marked as deprecated for a long time, and was finally
removed from the kernel in June, 2006.
With the development of the unstable 2.5 kernel tree, later released as the 2.6 series of stable kernels, a new
virtual filesystem called sysfs came to be. The job of sysfs is to provide information about the system's hardware
configuration to userspace processes. With this userspace-visible representation, it became possible to develop a
userspace replacement for devfs.

#### 9.3.2 Udev Implementation
9.3.2.1. Sysfs
The sysfs filesystem was mentioned briefly above. One may wonder how sysfs knows about the devices present on a
system and what device numbers should be used for them. Drivers that have been compiled into the kernel register their
objects in sysfs (devtmpfs internally) as they are detected by the kernel. For drivers compiled as modules, registration
happens when the module is loaded. Once the sysfs filesystem is mounted (on /sys), data which the drivers have
registered with sysfs are available to userspace processes and to udevd for processing (including modifications to
device nodes).

9.3.2.2. Device Node Creation
Device files are created by the kernel in the devtmpfs file system. Any driver that wishes to register a device node will
use the devtmpfs (via the driver core) to do it. When a devtmpfs instance is mounted on /dev, the device node will
initially be exposed to userspace with a fixed name, permissions, and owner.
A short time later, the kernel will send a uevent to udevd. Based on the rules specified in the files within the /etc/
udev/rules.d, /usr/lib/udev/rules.d, and /run/udev/rules.d directories, udevd will create additional symlinks to
the device node, or change its permissions, owner, or group, or modify the internal udevd database entry (name) for
that object.
240

The rules in these three directories are numbered and all three directories are merged together. If udevd can't find a
rule for the device it is creating, it will leave the permissions and ownership at whatever devtmpfs used initially.

9.3.2.3. Module Loading
Device drivers compiled as modules may have aliases built into them. Aliases are visible in the output of the modinfo
program and are usually related to the bus-specific identifiers of devices supported by a module. For example,
the snd-fm801 driver supports PCI devices with vendor ID 0x1319 and device ID 0x0801, and has an alias of
pci:v00001319d00000801sv*sd*bc04sc01i*. For most devices, the bus driver exports the alias of the driver that would
handle the device via sysfs. E.g., the /sys/bus/pci/devices/0000:00:0d.0/modalias file might contain the string
pci:v00001319d00000801sv00001319sd00001319bc04sc01i00. The default rules provided with udev will cause udevd to
call out to /sbin/modprobe with the contents of the MODALIAS uevent environment variable (which should be the same
as the contents of the modalias file in sysfs), thus loading all modules whose aliases match this string after wildcard
expansion.
In this example, this means that, in addition to snd-fm801, the obsolete (and unwanted) forte driver will be loaded if it
is available. See below for ways in which the loading of unwanted drivers can be prevented.
The kernel itself is also able to load modules for network protocols, filesystems, and NLS support on demand.

9.3.2.4. Handling Hotpluggable/Dynamic Devices
When you plug in a device, such as a Universal Serial Bus (USB) MP3 player, the kernel recognizes that the device is
now connected and generates a uevent. This uevent is then handled by udevd as described above.

#### 9.3.3 Problems with Loading Modules and Creating Devices
There are a few possible problems when it comes to automatically creating device nodes.

9.3.3.1. A Kernel Module Is Not Loaded Automatically
Udev will only load a module if it has a bus-specific alias and the bus driver properly exports the necessary aliases to
sysfs. In other cases, one should arrange module loading by other means. With Linux-6.10.5, udev is known to load
properly-written drivers for INPUT, IDE, PCI, USB, SCSI, SERIO, and FireWire devices.
To determine if the device driver you require has the necessary support for udev, run modinfo with the module name
as the argument. Now try locating the device directory under /sys/bus and check whether there is a modalias file there.
If the modalias file exists in sysfs, the driver supports the device and can talk to it directly, but doesn't have the alias,
it is a bug in the driver. Load the driver without the help from udev and expect the issue to be fixed later.
If there is no modalias file in the relevant directory under /sys/bus, this means that the kernel developers have not yet
added modalias support to this bus type. With Linux-6.10.5, this is the case with ISA busses. Expect this issue to be
fixed in later kernel versions.
Udev is not intended to load “wrapper” drivers such as snd-pcm-oss and non-hardware drivers such as loop at all.

9.3.3.2. A Kernel Module Is Not Loaded Automatically, and Udev Is Not Intended to Load It
If the “wrapper” module only enhances the functionality provided by some other module (e.g., snd-pcm-oss enhances
the functionality of snd-pcm by making the sound cards available to OSS applications), configure modprobe to load
the wrapper after udev loads the wrapped module. To do this, add a “softdep” line to the corresponding /etc/modprobe.
d/<filename>.conf file. For example:
softdep snd-pcm post: snd-pcm-oss

241

Note that the “softdep” command also allows pre: dependencies, or a mixture of both pre: and post: dependencies.
See the modprobe.d(5) manual page for more information on “softdep” syntax and capabilities.
If the module in question is not a wrapper and is useful by itself, configure the modules bootscript to load this module
on system boot. To do this, add the module name to the /etc/sysconfig/modules file on a separate line. This works for
wrapper modules too, but is suboptimal in that case.

9.3.3.3. Udev Loads Some Unwanted Module
Either don't build the module, or blacklist it in a /etc/modprobe.d/blacklist.conf file as done with the forte module
in the example below:
blacklist forte

Blacklisted modules can still be loaded manually with the explicit modprobe command.

9.3.3.4. Udev Creates a Device Incorrectly, or Makes the Wrong Symlink
This usually happens if a rule unexpectedly matches a device. For example, a poorly-written rule can match both a
SCSI disk (as desired) and the corresponding SCSI generic device (incorrectly) by vendor. Find the offending rule and
make it more specific, with the help of the udevadm info command.

9.3.3.5. Udev Rule Works Unreliably
This may be another manifestation of the previous problem. If not, and your rule uses sysfs attributes, it may be a
kernel timing issue, to be fixed in later kernels. For now, you can work around it by creating a rule that waits for the
used sysfs attribute and appending it to the /etc/udev/rules.d/10-wait_for_sysfs.rules file (create this file if it does
not exist). Please notify the LFS Development list if you do so and it helps.

9.3.3.6. Udev Does Not Create a Device
First, be certain that the driver is built into the kernel or already loaded as a module, and that udev isn't creating a
misnamed device.
If a kernel driver does not export its data to sysfs, udev lacks the information needed to create a device node. This is
most likely to happen with third party drivers from outside the kernel tree. Create a static device node in /usr/lib/
udev/devices with the appropriate major/minor numbers (see the file devices.txt inside the kernel documentation or
the documentation provided by the third party driver vendor). The static device node will be copied to /dev by udev.

9.3.3.7. Device Naming Order Changes Randomly After Rebooting
This is due to the fact that udev, by design, handles uevents and loads modules in parallel, and thus in an unpredictable
order. This will never be “fixed.” You should not rely upon the kernel device names being stable. Instead, create your
own rules that make symlinks with stable names based on some stable attributes of the device, such as a serial number
or the output of various *_id utilities installed by udev. See Section 9.4, “Managing Devices” and Section 9.5, “General
Network Configuration” for examples.

#### 9.3.4 Useful Reading
Additional helpful documentation is available at the following sites:
- A Userspace Implementation of devfs http://www.kroah.com/linux/talks/ols_2003_udev_paper/Reprint-KroahHartman-OLS2003.pdf
242

- The sysfs Filesystem https://www.kernel.org/pub/linux/kernel/people/mochel/doc/papers/ols-2005/mochel.pdf

### 9.4 Managing Devices
#### 9.4.1 Network Devices
Udev, by default, names network devices according to Firmware/BIOS data or physical characteristics like the bus,
slot, or MAC address. The purpose of this naming convention is to ensure that network devices are named consistently,
not based on when the network card was discovered. In older versions of Linux—on a computer with two network
cards made by Intel and Realtek, for instance—the network card manufactured by Intel might have become eth0 while
the Realtek card became eth1. After a reboot, the cards would sometimes get renumbered the other way around.
In the new naming scheme, typical network device names are something like enp5s0 or wlp3s0. If this naming
convention is not desired, the traditional naming scheme, or a custom scheme, can be implemented.

9.4.1.1. Disabling Persistent Naming on the Kernel Command Line
The traditional naming scheme using eth0, eth1, etc. can be restored by adding net.ifnames=0 on the kernel command
line. This is most appropriate for systems that have just one ethernet device of a particular type. Laptops often have two
ethernet connections named eth0 and wlan0; such laptops can also use this method. The command line is in the GRUB
configuration file. See Section 10.4.4, “Creating the GRUB Configuration File.”

9.4.1.2. Creating Custom Udev Rules
The naming scheme can be customized by creating custom udev rules. A script has been included that generates the
initial rules. Generate these rules by running:
bash /usr/lib/udev/init-net-rules.sh

Now, inspect the /etc/udev/rules.d/70-persistent-net.rules file, to find out which name was assigned to which
network device:
cat /etc/udev/rules.d/70-persistent-net.rules

In some cases, such as when MAC addresses have been assigned to a network card manually, or in a virtual
environment such as Qemu or Xen, the network rules file may not be generated because addresses are not
consistently assigned. In these cases, this method cannot be used.
The file begins with a comment block, followed by two lines for each NIC. The first line for each NIC is a commented
description showing its hardware IDs (e.g. its PCI vendor and device IDs, if it's a PCI card), along with its driver (in
parentheses, if the driver can be found). Neither the hardware ID nor the driver is used to determine which name to
give an interface; this information is only for reference. The second line is the udev rule that matches this NIC and
actually assigns it a name.
All udev rules are made up of several keywords, separated by commas and optional whitespace. Here are the keywords,
and an explanation of each one:
- SUBSYSTEM=="net" - This tells udev to ignore devices that are not network cards.
- ACTION=="add" - This tells udev to ignore this rule for a uevent that isn't an add ("remove" and "change" uevents
also happen, but don't need to rename network interfaces).
243

- DRIVERS=="?*" - This exists so that udev will ignore VLAN or bridge sub-interfaces (because these sub-interfaces
do not have drivers). These sub-interfaces are skipped because the name that would be assigned would collide with
the parent devices.
- ATTR{address} - The value of this keyword is the NIC's MAC address.
- ATTR{type}=="1" - This ensures the rule only matches the primary interface in the case of certain wireless drivers
which create multiple virtual interfaces. The secondary interfaces are skipped for the same reason that VLAN and
bridge sub-interfaces are skipped: there would be a name collision otherwise.
- NAME - The value of this keyword is the name that udev will assign to this interface.
The value of NAME is the important part. Make sure you know which name has been assigned to each of your network
cards before proceeding, and be sure to use that NAME value when creating your network configuration files.
Even if the custom udev rule file is created, udev may still assign one or more alternative names for a NIC based on
physical characteristics. If a custom udev rule would rename some NIC using a name already assigned as an alternative
name of another NIC, this udev rule will fail. If this issue happens, you may create the /etc/udev/network/99-default.
link configuration file with an empty alternative assignment policy, overriding the default configuration file /usr/lib/
udev/network/99-default.link:
sed -e '/^AlternativeNamesPolicy/s/=.*$/=/' \
/usr/lib/udev/network/99-default.link \
> /etc/udev/network/99-default.link

#### 9.4.2 CD-ROM Symlinks
Some software that you may want to install later (e.g., various media players) expects the /dev/cdrom and /dev/dvd
symlinks to exist, and to point to a CD-ROM or DVD-ROM device. Also, it may be convenient to put references to
those symlinks into /etc/fstab. Udev comes with a script that will generate rules files to create these symlinks for
you, depending on the capabilities of each device, but you need to decide which of two modes of operation you wish
to have the script use.
First, the script can operate in “by-path” mode (used by default for USB and FireWire devices), where the rules it
creates depend on the physical path to the CD or DVD device. Second, it can operate in “by-id” mode (default for IDE
and SCSI devices), where the rules it creates depend on identification strings stored on the CD or DVD device itself.
The path is determined by udev's path_id script, and the identification strings are read from the hardware by its ata_id
or scsi_id programs, depending on which type of device you have.
There are advantages to each approach; the correct approach depends on what kinds of device changes may happen.
If you expect the physical path to the device (that is, the ports and/or slots that it plugs into) to change, for example
because you plan on moving the drive to a different IDE port or a different USB connector, then you should use the “byid” mode. On the other hand, if you expect the device's identification to change, for example because it may die, and you
intend to replace it with a different device that plugs into the same connectors, then you should use the “by-path” mode.
If either type of change is possible with your drive, then choose a mode based on the type of change you expect to
happen more often.

External devices (for example, a USB-connected CD drive) should not use by-path persistence, because each
time the device is plugged into a new external port, its physical path will change. All externally-connected
devices will have this problem if you write udev rules to recognize them by their physical path; the problem
is not limited to CD and DVD drives.
244

If you wish to see the values that the udev scripts will use, then for the appropriate CD-ROM device, find the
corresponding directory under /sys (e.g., this can be /sys/block/hdd) and run a command similar to the following:
udevadm test /sys/block/hdd

Look at the lines containing the output of various *_id programs. The “by-id” mode will use the ID_SERIAL value
if it exists and is not empty, otherwise it will use a combination of ID_MODEL and ID_REVISION. The “by-path”
mode will use the ID_PATH value.
If the default mode is not suitable for your situation, then the following modification can be made to the /etc/udev/
rules.d/83-cdrom-symlinks.rules file, as follows (where mode is one of “by-id” or “by-path”):
sed -e 's/"write_cd_rules"/"write_cd_rules mode"/' \
-i /etc/udev/rules.d/83-cdrom-symlinks.rules

Note that it is not necessary to create the rules files or symlinks at this time because you have bind-mounted the host's /
dev directory into the LFS system and we assume the symlinks exist on the host. The rules and symlinks will be created
the first time you boot your LFS system.
However, if you have multiple CD-ROM devices, then the symlinks generated at that time may point to different devices
than they point to on your host because devices are not discovered in a predictable order. The assignments created when
you first boot the LFS system will be stable, so this is only an issue if you need the symlinks on both systems to point
to the same device. If you need that, then inspect (and possibly edit) the generated /etc/udev/rules.d/70-persistentcd.rules file after booting, to make sure the assigned symlinks match your needs.

#### 9.4.3 Dealing with Duplicate Devices
As explained in Section 9.3, “Overview of Device and Module Handling,” the order in which devices with the same
function appear in /dev is essentially random. E.g., if you have a USB web camera and a TV tuner, sometimes /dev/
video0 refers to the camera and /dev/video1 refers to the tuner, and sometimes after a reboot the order changes. For
all classes of hardware except sound cards and network cards, this is fixable by creating udev rules to create persistent
symlinks. The case of network cards is covered separately in Section 9.5, “General Network Configuration,” and sound
card configuration can be found in BLFS.
For each of your devices that is likely to have this problem (even if the problem doesn't exist in your current Linux
distribution), find the corresponding directory under /sys/class or /sys/block. For video devices, this may be /sys/
class/video4linux/videoX. Figure out the attributes that identify the device uniquely (usually, vendor and product IDs
and/or serial numbers work):
udevadm info -a -p /sys/class/video4linux/video0

Then write rules that create the symlinks, e.g.:
cat > /etc/udev/rules.d/83-duplicate_devs.rules << "EOF"
KERNEL=="video*", ATTRS{idProduct}=="1910", ATTRS{idVendor}=="0d81", SYMLINK+="webcam"
KERNEL=="video*", ATTRS{device}=="0x036f", ATTRS{vendor}=="0x109e", SYMLINK+="tvtuner"

The result is that /dev/video0 and /dev/video1 devices still refer randomly to the tuner and the web camera (and thus
should never be used directly), but there are symlinks /dev/tvtuner and /dev/webcam that always point to the correct
device.
245

### 9.5 General Network Configuration
#### 9.5.1 Creating Network Interface Configuration Files
The files in /etc/sysconfig/ usually determine which interfaces are brought up and down by the network script. This
directory should contain a file for each interface to be configured, such as ifconfig.xyz, where “xyz” describes the
network card. The interface name (e.g. eth0) is usually appropriate. Each file contains the attributes of one interface,
such as its IP address(es), subnet masks, and so forth. The stem of the filename must be ifconfig.

If the procedure in the previous section was not used, udev will assign network card interface names based
on system physical characteristics such as enp2s1. If you are not sure what your interface name is, you can
always run ip link or ls /sys/class/net after you have booted your system.
The interface names depend on the implementation and configuration of the udev daemon running on the
system. The udev daemon for LFS (installed in Section 8.76, “Udev from Systemd-256.4”) will not run until
the LFS system is booted. So the interface names in the LFS system cannot always be determined by running
those commands on the host distro, even in the chroot environment.
The following command creates a sample file for the eth0 device with a static IP address:
cd /etc/sysconfig/
cat > ifconfig.eth0 << "EOF"
ONBOOT=yes
IFACE=eth0
SERVICE=ipv4-static
IP=192.168.1.2
GATEWAY=192.168.1.1
PREFIX=24
BROADCAST=192.168.1.255

The values in italics must be changed in each file, to set the interfaces up correctly.
If the ONBOOT variable is set to yes the System V network script will bring up the Network Interface Card (NIC) during
the system boot process. If set to anything besides yes, the NIC will be ignored by the network script and will not be
started automatically. Interfaces can be manually started or stopped with the ifup and ifdown commands.
The IFACE variable defines the interface name, for example, eth0. It is required for all network device configuration
files. The filename extension must match this value.
The SERVICE variable defines the method used for obtaining the IP address. The LFS-Bootscripts package has a modular
IP assignment format, and creating additional files in the /lib/services/ directory allows other IP assignment methods.
This is commonly used for Dynamic Host Configuration Protocol (DHCP), which is addressed in the BLFS book.
The GATEWAY variable should contain the default gateway IP address, if one is present. If not, then comment out the
variable entirely.
The PREFIX variable specifies the number of bits used in the subnet. Each segment of an IP address is 8 bits. If the
subnet's netmask is 255.255.255.0, then it is using the first three segments (24 bits) to specify the network number. If
the netmask is 255.255.255.240, the subnet is using the first 28 bits. Prefixes longer than 24 bits are commonly used by
DSL and cable-based Internet Service Providers (ISPs). In this example (PREFIX=24), the netmask is 255.255.255.0.
Adjust the PREFIX variable according to your specific subnet. If omitted, the PREFIX defaults to 24.
246

For more information see the ifup man page.

#### 9.5.2 Creating the /etc/resolv.conf File
The system will need some means of obtaining Domain Name Service (DNS) name resolution to resolve Internet domain
names to IP addresses, and vice versa. This is best achieved by placing the IP address of the DNS server, available from
the ISP or network administrator, into /etc/resolv.conf. Create the file by running the following:
cat > /etc/resolv.conf << "EOF"
domain <Your Domain Name>
nameserver <IP address of your primary nameserver>
nameserver <IP address of your secondary nameserver>

The domain statement can be omitted or replaced with a search statement. See the man page for resolv.conf for more
details.
Replace <IP address of the nameserver> with the IP address of the DNS most appropriate for the setup. There will often
be more than one entry (requirements demand secondary servers for fallback capability). If you only need or want one
DNS server, remove the second nameserver line from the file. The IP address may also be a router on the local network.

The Google Public IPv4 DNS addresses are 8.8.8.8 and 8.8.4.4.

#### 9.5.3 Configuring the System Hostname
During the boot process, the file /etc/hostname is used for establishing the system's hostname.
Create the /etc/hostname file and enter a hostname by running:
echo "<lfs>" > /etc/hostname
<lfs> needs to be replaced with the name given to the computer. Do not enter the Fully Qualified Domain Name

(FQDN) here. That information goes in the /etc/hosts file.

#### 9.5.4 Customizing the /etc/hosts File
Decide on a fully-qualified domain name (FQDN), and possible aliases for use in the /etc/hosts file. If using static IP
addresses, you'll also need to decide on an IP address. The syntax for a hosts file entry is:
IP_address myhost.example.org aliases

Unless the computer is to be visible to the Internet (i.e., there is a registered domain and a valid block of assigned
IP addresses—most users do not have this), make sure that the IP address is in the private network IP address range.
Valid ranges are:
Private Network Address Range
10.0.0.1 - 10.255.255.254
172.x.0.1 - 172.x.255.254
192.168.y.1 - 192.168.y.254

Normal Prefix
8
16
24

247

x can be any number in the range 16-31. y can be any number in the range 0-255.
A valid private IP address could be 192.168.1.1.
If the computer is to be visible to the Internet, a valid FQDN can be the domain name itself, or a string resulted by
concatenating a prefix (often the hostname) and the domain name with a “.” character. And, you need to contact the
domain provider to resolve the FQDN to your public IP address.
Even if the computer is not visible to the Internet, a FQDN is still needed for certain programs, such as MTAs, to operate
properly. A special FQDN, localhost.localdomain, can be used for this purpose.
Create the /etc/hosts file by running:
cat > /etc/hosts << "EOF"
127.0.0.1 localhost.localdomain localhost
127.0.1.1 <FQDN> <HOSTNAME>
<192.168.1.1> <FQDN> <HOSTNAME> [alias1] [alias2 ...]
::1
localhost ip6-localhost ip6-loopback
ff02::1
ip6-allnodes
ff02::2
ip6-allrouters

The <192.168.1.1>, <FQDN>, and <HOSTNAME> values need to be changed for specific uses or requirements (if assigned an
IP address by a network/system administrator and the machine will be connected to an existing network). The optional
alias name(s) can be omitted.

### 9.6 System V Bootscript Usage and Configuration
#### 9.6.1 How Do the System V Bootscripts Work?
This version of LFS uses a special booting facility named SysVinit, based on a series of run levels. The boot procedure
can be quite different from one system to another; the fact that things worked one way in a particular Linux distribution
does not guarantee they will work the same way in LFS. LFS has its own way of doing things, but it does respect
generally accepted standards.
There is an alternative boot procedure called systemd. We will not discuss that boot process any further here. For a
detailed description visit https://www.linux.com/training-tutorials/understanding-and-using-systemd/.
SysVinit (which will be referred to as “init” from now on) uses a run levels scheme. There are seven run levels, numbered
0 to 6. (Actually, there are more run levels, but the others are for special cases and are generally not used. See init(8)
for more details.) Each one of the seven corresponds to actions the computer is supposed to perform when it starts up
or shuts down. The default run level is 3. Here are the descriptions of the different run levels as they are implemented
in LFS:
0: halt the computer
1: single-user mode
2: reserved for customization, otherwise the same as 3
3: multi-user mode with networking
4: reserved for customization, otherwise the same as 3
5: same as 4, it is usually used for GUI login (like GNOME's gdm or LXDE's lxdm)
6: reboot the computer
248

Classically, run level 2 above was defined as “multi-user mode without networking,” but this was only the
case many years ago when multiple users could connect to a system via serial ports. In today's environment
it makes no sense, and we now say it is “reserved.”

#### 9.6.2 Configuring SysVinit
During kernel initialization, the first program that is run (if not overridden on the command line) is init. This program
reads the initialization file /etc/inittab. Create this file with:
cat > /etc/inittab << "EOF"
id:3:initdefault:
si::sysinit:/etc/rc.d/init.d/rc S
l0:0:wait:/etc/rc.d/init.d/rc 0
l1:S1:wait:/etc/rc.d/init.d/rc 1
l2:2:wait:/etc/rc.d/init.d/rc 2
l3:3:wait:/etc/rc.d/init.d/rc 3
l4:4:wait:/etc/rc.d/init.d/rc 4
l5:5:wait:/etc/rc.d/init.d/rc 5
l6:6:wait:/etc/rc.d/init.d/rc 6
ca:12345:ctrlaltdel:/sbin/shutdown -t1 -a -r now
su:S06:once:/sbin/sulogin
s1:1:respawn:/sbin/sulogin
1:2345:respawn:/sbin/agetty --noclear tty1 9600
2:2345:respawn:/sbin/agetty tty2 9600
3:2345:respawn:/sbin/agetty tty3 9600
4:2345:respawn:/sbin/agetty tty4 9600
5:2345:respawn:/sbin/agetty tty5 9600
6:2345:respawn:/sbin/agetty tty6 9600

An explanation of this initialization file is in the man page for inittab. In LFS, the key command is rc. The initialization
file above instructs rc to run all the scripts starting with an S in the /etc/rc.d/rcS.d directory followed by all the scripts
starting with an S in the /etc/rc.d/rc?.d directory where the question mark is specified by the initdefault value.
As a convenience, the rc script reads a library of functions in /lib/lsb/init-functions. This library also reads
an optional configuration file, /etc/sysconfig/rc.site. Any of the system configuration parameters described in
subsequent sections can be placed in this file, allowing consolidation of all system parameters in this one file.
As a debugging convenience, the functions script also logs all output to /run/var/bootlog. Since the /run directory
is a tmpfs, this file is not persistent across boots; however, it is appended to the more permanent file /var/log/boot.
log at the end of the boot process.

9.6.2.1. Changing Run Levels
Changing run levels is done with init <runlevel>, where <runlevel> is the target run level. For example, to reboot the
computer, a user could issue the init 6 command, which is an alias for the reboot command. Likewise, init 0 is an
alias for the halt command.
249

There are a number of directories under /etc/rc.d that look like rc?.d (where ? is the number of the run level) and
rcS.d, all containing a number of symbolic links. Some links begin with a K; the others begin with an S, and all of them
have two numbers following the initial letter. The K means to stop (kill) a service and the S means to start a service.
The numbers determine the order in which the scripts are run, from 00 to 99—the smaller the number, the sooner the
script runs. When init switches to another run level, the appropriate services are either started or stopped, depending
on the run level chosen.
The real scripts are in /etc/rc.d/init.d. They do the actual work, and the symlinks all point to them. K links and S
links point to the same script in /etc/rc.d/init.d. This is because the scripts can be called with different parameters
like start, stop, restart, reload, and status. When a K link is encountered, the appropriate script is run with the stop
argument. When an S link is encountered, the appropriate script is run with the start argument.
These are descriptions of what the arguments make the scripts do:
start

The service is started.
stop

The service is stopped.
restart

The service is stopped and then started again.
reload

The configuration of the service is updated. This is used after the configuration file of a service was modified,
when the service does not need to be restarted.
status

Tells if the service is running and with which PIDs.
Feel free to modify the way the boot process works (after all, it is your own LFS system). The files given here are an
example of how it can be done.

#### 9.6.3 Udev Bootscripts
The /etc/rc.d/init.d/udev initscript starts udevd, triggers any "coldplug" devices that have already been created by
the kernel, and waits for any rules to complete. The script also unsets the uevent handler from the default of /sbin/
hotplug . This is done because the kernel no longer needs to call an external binary. Instead, udevd will listen on a
netlink socket for uevents that the kernel raises.
The /etc/rc.d/init.d/udev_retry script takes care of re-triggering events for subsystems whose rules may rely on file
systems that are not mounted until the mountfs script is run (in particular, /usr and /var may cause this). This script
runs after the mountfs script, so those rules (if re-triggered) should succeed the second time around. It is configured
by the /etc/sysconfig/udev_retry file; any words in this file other than comments are considered subsystem names to
trigger at retry time. To find the subsystem of a device, use udevadm info --attribute-walk <device> where <device>
is an absolute path in /dev or /sys, such as /dev/sr0, or /sys/class/rtc.
For information on kernel module loading and udev, see Section 9.3.2.3, “Module Loading.”

#### 9.6.4 Configuring the System Clock
The setclock script reads the time from the hardware clock, also known as the BIOS or Complementary Metal Oxide
Semiconductor (CMOS) clock. If the hardware clock is set to UTC, this script will convert the hardware clock's time
to the local time using the /etc/localtime file (which tells the hwclock program which time zone to use). There is no
way to detect whether or not the hardware clock is set to UTC, so this must be configured manually.
250

The setclock program is run via udev when the kernel detects the hardware capability upon boot. It can also be run
manually with the stop parameter to store the system time to the CMOS clock.
If you cannot remember whether or not the hardware clock is set to UTC, find out by running the hwclock --localtime
--show command. This will display what the current time is according to the hardware clock. If this time matches
whatever your watch says, then the hardware clock is set to local time. If the output from hwclock is not local time,
chances are it is set to UTC time. Verify this by adding or subtracting the proper number of hours for your time zone
to the time shown by hwclock. For example, if you are currently in the MST time zone, which is also known as GMT
-0700, add seven hours to the local time.
Change the value of the UTC variable below to a value of 0 (zero) if the hardware clock is NOT set to UTC time.
Create a new file /etc/sysconfig/clock by running the following:
cat > /etc/sysconfig/clock << "EOF"
UTC=1
CLOCKPARAMS=

A good hint explaining how to deal with time on LFS is available at https://www.linuxfromscratch.org/hints/downloads/
files/time.txt. It explains issues such as time zones, UTC, and the TZ environment variable.

The CLOCKPARAMS and UTC parameters may also be set in the /etc/sysconfig/rc.site file.

#### 9.6.5 Configuring the Linux Console
This section discusses how to configure the console bootscript that sets up the keyboard map, console font, and console
kernel log level. If non-ASCII characters (e.g., the copyright sign, the British pound sign, and the Euro symbol) will
not be used and the keyboard is a U.S. one, much of this section can be skipped. Without the configuration file, (or
equivalent settings in rc.site), the console bootscript will do nothing.
The console script reads the /etc/sysconfig/console file for configuration information. Decide which keymap and
screen font will be used. Various language-specific HOWTOs can also help with this; see https://tldp.org/HOWTO/
HOWTO-INDEX/other-lang.html. If still in doubt, look in the /usr/share/keymaps and /usr/share/consolefonts
directories for valid keymaps and screen fonts. Read the loadkeys(1) and setfont(8) manual pages to determine the
correct arguments for these programs.
The /etc/sysconfig/console file should contain lines of the form: VARIABLE=value. The following variables are
recognized:
LOGLEVEL
This variable specifies the log level for kernel messages sent to the console as set by dmesg -n. Valid levels are
from 1 (no messages) to 8. The default level is 7, which is quite verbose.
KEYMAP
This variable specifies the arguments for the loadkeys program, typically, the name of the keymap to load, e.g.,
it. If this variable is not set, the bootscript will not run the loadkeys program, and the default kernel keymap will
251

be used. Note that a few keymaps have multiple versions with the same name (cz and its variants in qwerty/ and
qwertz/, es in olpc/ and qwerty/, and trf in fgGIod/ and qwerty/). In these cases the parent directory should also
be specified (e.g. qwerty/es) to ensure the proper keymap is loaded.
KEYMAP_CORRECTIONS
This (rarely used) variable specifies the arguments for the second call to the loadkeys program. This is useful if
the stock keymap is not completely satisfactory and a small adjustment has to be made. E.g., to include the Euro
sign into a keymap that normally doesn't have it, set this variable to euro2.
FONT
This variable specifies the arguments for the setfont program. Typically, this includes the font name, -m, and the
name of the application character map to load. E.g., in order to load the “lat1-16” font together with the “8859-1”
application character map (appropriate in the USA), set this variable to lat1-16 -m 8859-1. In UTF-8 mode, the
kernel uses the application character map to convert 8-bit key codes to UTF-8. Therefore the argument of the "m" parameter should be set to the encoding of the composed key codes in the keymap.
UNICODE
Set this variable to 1, yes, or true in order to put the console into UTF-8 mode. This is useful in UTF-8 based
locales and harmful otherwise.
LEGACY_CHARSET
For many keyboard layouts, there is no stock Unicode keymap in the Kbd package. The console bootscript will
convert an available keymap to UTF-8 on the fly if this variable is set to the encoding of the available non-UTF-8
keymap.
Some examples:
- We'll use C.UTF-8 as the locale for interactive sessions in the Linux console in Section 9.7, “Configuring the
System Locale,” so we should set UNICODE to 1. And the console fonts shipped by the Kbd package containing the
glyphs for all characters from the program messages in the C.UTF-8 locale are LatArCyrHeb*.psfu.gz, LatGrkCyr*.
psfu.gz, Lat2-Terminus16.psfu.gz, and pancyrillic.f16.psfu.gz in /usr/share/consolefonts (the other shipped
console fonts lack glyphs of some characters like the Unicode left/right quotation marks and the Unicode English
dash). So set one of them, for example Lat2-Terminus16.psfu.gz as the default console font:
FONT="Lat2-Terminus16"

- For a non-Unicode setup, only the KEYMAP and FONT variables are generally needed. E.g., for a Polish setup,
one would use:
KEYMAP="pl2"
FONT="lat2a-16 -m 8859-2"

252

- As mentioned above, it is sometimes necessary to adjust a stock keymap slightly. The following example adds the
Euro symbol to the German keymap:
KEYMAP="de-latin1"
KEYMAP_CORRECTIONS="euro2"
FONT="lat0-16 -m 8859-15"

- The following is a Unicode-enabled example for Bulgarian, where a stock UTF-8 keymap exists:
KEYMAP="bg_bds-utf8"
FONT="LatArCyrHeb-16"

- Due to the use of a 512-glyph LatArCyrHeb-16 font in the previous example, bright colors are no longer available
on the Linux console unless a framebuffer is used. If one wants to have bright colors without a framebuffer and
can live without characters not belonging to his language, it is still possible to use a language-specific 256-glyph
font, as illustrated below:
KEYMAP="bg_bds-utf8"
FONT="cyr-sun16"

- The following example illustrates keymap autoconversion from ISO-8859-15 to UTF-8 and enabling dead keys in
Unicode mode:
KEYMAP="de-latin1"
KEYMAP_CORRECTIONS="euro2"
LEGACY_CHARSET="iso-8859-15"
FONT="LatArCyrHeb-16 -m 8859-15"

- Some keymaps have dead keys (i.e., keys that don't produce a character by themselves, but put an accent on the
character produced by the next key) or define composition rules (such as: “press Ctrl+. A E to get Æ” in the
default keymap). Linux-6.10.5 interprets dead keys and composition rules in the keymap correctly only when
the source characters to be composed together are not multibyte. This deficiency doesn't affect keymaps for
European languages, because there accents are added to unaccented ASCII characters, or two ASCII characters are
253

composed together. However, in UTF-8 mode it is a problem; e.g., for the Greek language, where one sometimes
needs to put an accent on the letter α. The solution is either to avoid the use of UTF-8, or to install the X window
system, which doesn't have this limitation, in its input handling.
- For Chinese, Japanese, Korean, and some other languages, the Linux console cannot be configured to display
the needed characters. Users who need such languages should install the X Window System, fonts that cover the
necessary character ranges, and the proper input method (e.g., SCIM supports a wide variety of languages).

The /etc/sysconfig/console file only controls the Linux text console localization. It has nothing to do with
setting the proper keyboard layout and terminal fonts in the X Window System, with ssh sessions, or with a
serial console. In such situations, limitations mentioned in the last two list items above do not apply.

#### 9.6.6 Creating Files at Boot
At times, it is desirable to create files at boot time. For instance, the /tmp/.ICE-unix directory is often needed. This
can be done by creating an entry in the /etc/sysconfig/createfiles configuration script. The format of this file is
embedded in the comments of the default configuration file.

#### 9.6.7 Configuring the Sysklogd Script
The sysklogd script invokes the syslogd program as a part of System V initialization. The -m 0 option turns off the
periodic timestamp mark that syslogd writes to the log files every 20 minutes by default. If you want to turn on this
periodic timestamp mark, edit /etc/sysconfig/rc.site and define the variable SYSKLOGD_PARMS to the desired
value. For instance, to remove all parameters, set the variable to a null value:
SYSKLOGD_PARMS=

See man syslogd for more options.

#### 9.6.8 The rc.site File
The optional /etc/sysconfig/rc.site file contains settings that are automatically set for each SystemV boot script. It
can alternatively set the values specified in the hostname, console, and clock files in the /etc/sysconfig/ directory.
If the associated variables are present in both these separate files and rc.site, the values in the script-specific files
take effect.
rc.site also contains parameters that can customize other aspects of the boot process. Setting the IPROMPT variable

will enable selective running of bootscripts. Other options are described in the file comments. The default version of
the file is as follows:
#DISTRO="Linux From Scratch" # The distro name
#DISTRO_CONTACT="lfs-dev@lists.linuxfromscratch.org" # Bug report address
#DISTRO_MINI="LFS" # Short name used in filenames for distro config

254

#BRACKET="\\033[1;34m" # Blue
#FAILURE="\\033[1;31m" # Red
#INFO="\\033[1;36m"
#NORMAL="\\033[0;39m" # Grey
#SUCCESS="\\033[1;32m" # Green
#WARNING="\\033[1;33m" # Yellow
#BMPREFIX="
"
#SUCCESS_PREFIX="${SUCCESS} * ${NORMAL} "
#FAILURE_PREFIX="${FAILURE}*****${NORMAL} "
#WARNING_PREFIX="${WARNING} *** ${NORMAL} "
#COLUMNS=120
#IPROMPT="yes" # Whether to display the interactive boot prompt
#itime="3"
#wlen=$(echo "Welcome to ${DISTRO}" | wc -c )
#welcome_message="Welcome to ${INFO}${DISTRO}${NORMAL}"
#ilen=$(echo "Press 'I' to enter interactive startup" | wc -c )
#i_message="Press '${FAILURE}I${NORMAL}' to enter interactive startup"
#FASTBOOT=yes
#HEADLESS=yes
#VERBOSE_FSCK=no
#OMIT_UDEV_SETTLE=y
#OMIT_UDEV_RETRY_SETTLE=yes
#SKIPTMPCLEAN=no
#UTC=1
#CLOCKPARAMS=
#LOGLEVEL=7

255

#HOSTNAME=mylfs
#KILLDELAY=3
#SYSKLOGD_PARMS="-m 0"
#UNICODE=1
#KEYMAP="de-latin1"
#KEYMAP_CORRECTIONS="euro2"
#FONT="lat0-16 -m 8859-15"
#LEGACY_CHARSET=

9.6.8.1. Customizing the Boot and Shutdown Scripts
The LFS boot scripts boot and shut down a system in a fairly efficient manner, but there are a few tweaks you can make
in the rc.site file to improve speed even more, and to adjust messages according to your preferences. To do this, adjust
the settings in the /etc/sysconfig/rc.site file above.
- During the boot script udev, there is a call to udev settle that requires some time to complete. This time may
or may not be required depending on the devices in the system. If you only have simple partitions and a single
ethernet card, the boot process will probably not need to wait for this command. To skip it, set the variable
OMIT_UDEV_SETTLE=y.
- The boot script udev_retry also runs udev settle by default. This command is only needed if the /var directory is
separately mounted, because the clock needs the /var/lib/hwclock/adjtime file. Other customizations may also
need to wait for udev to complete, but in many installations it is not necessary. Skip the command by setting the
variable OMIT_UDEV_RETRY_SETTLE=y.
- By default, the file system checks are silent. This can appear to be a delay during the bootup process. To turn on
the fsck output, set the variable VERBOSE_FSCK=y.
- When rebooting, you may want to skip the filesystem check, fsck, completely. To do this, either create the file /
fastboot or reboot the system with the command /sbin/shutdown -f -r now. On the other hand, you can force all
file systems to be checked by creating /forcefsck or running shutdown with the -F parameter instead of -f.
Setting the variable FASTBOOT=y will disable fsck during the boot process until it is removed. This is not
recommended on a permanent basis.
- Normally, all files in the /tmp directory are deleted at boot time. Depending on the number of files or directories
present, this can cause a noticeable delay in the boot process. To skip removing these files set the variable
SKIPTMPCLEAN=y.
- During shutdown, the init program sends a TERM signal to each program it has started (e.g. agetty), waits for a
set time (default 3 seconds), then sends each process a KILL signal and waits again. This process is repeated in
the sendsignals script for any processes that are not shut down by their own scripts. The delay for init can be set
by passing a parameter. For example to remove the delay in init, pass the -t0 parameter when shutting down or
rebooting (e.g. /sbin/shutdown -t0 -r now). The delay for the sendsignals script can be skipped by setting the
parameter KILLDELAY=0.

### 9.7 Configuring the System Locale
Some environment variables are necessary for native language support. Setting them properly results in:
256

- The output of programs being translated into your native language
- The correct classification of characters into letters, digits and other classes. This is necessary for bash to properly
accept non-ASCII characters in command lines in non-English locales
- The correct alphabetical sorting order for the country
- The appropriate default paper size
- The correct formatting of monetary, time, and date values
Replace <ll> below with the two-letter code for your desired language (e.g., en) and <CC> with the two-letter code for
the appropriate country (e.g., GB). <charmap> should be replaced with the canonical charmap for your chosen locale.
Optional modifiers such as @euro may also be present.
The list of all locales supported by Glibc can be obtained by running the following command:
locale -a

Charmaps can have a number of aliases, e.g., ISO-8859-1 is also referred to as iso8859-1 and iso88591. Some
applications cannot handle the various synonyms correctly (e.g., require that UTF-8 is written as UTF-8, not utf8), so
it is the safest in most cases to choose the canonical name for a particular locale. To determine the canonical name,
run the following command, where <locale name> is the output given by locale -a for your preferred locale (en_GB.
iso88591 in our example).
LC_ALL=<locale name> locale charmap

For the en_GB.iso88591 locale, the above command will print:

This results in a final locale setting of en_GB.ISO-8859-1. It is important that the locale found using the heuristic above
is tested prior to it being added to the Bash startup files:
LC_ALL=<locale name> locale language
LC_ALL=<locale name> locale charmap
LC_ALL=<locale name> locale int_curr_symbol
LC_ALL=<locale name> locale int_prefix

The above commands should print the language name, the character encoding used by the locale, the local currency,
and the prefix to dial before the telephone number in order to get into the country. If any of the commands above fail
with a message similar to the one shown below, this means that your locale was either not installed in Chapter 8 or is
not supported by the default installation of Glibc.
locale: Cannot set LC_* to default locale: No such file or directory

If this happens, you should either install the desired locale using the localedef command, or consider choosing a different
locale. Further instructions assume that there are no such error messages from Glibc.
Other packages can also function incorrectly (but may not necessarily display any error messages) if the locale name
does not meet their expectations. In those cases, investigating how other Linux distributions support your locale might
provide some useful information.
The shell program /bin/bash (here after referred as “the shell”) uses a collection of startup files to help create the
environment to run in. Each file has a specific use and may affect login and interactive environments differently. The
files in the /etc directory provide global settings. If equivalent files exist in the home directory, they may override
the global settings.
257

An interactive login shell is started after a successful login, using /bin/login, by reading the /etc/passwd file. An
interactive non-login shell is started at the command-line (e.g. [prompt]$/bin/bash). A non-interactive shell is usually
present when a shell script is running. It is non-interactive because it is processing a script and not waiting for user
input between commands.
Create the /etc/profile once the proper locale settings have been determined to set the desired locale, but set the C.
UTF-8 locale instead if running in the Linux console (to prevent programs from outputting characters that the Linux
console is unable to render):
cat > /etc/profile << "EOF"
for i in $(locale); do
unset ${i%=*}
if [[ "$TERM" = linux ]]; then
export LANG=C.UTF-8
export LANG=<ll>_<CC>.<charmap><@modifiers>

The C (default) and en_US (the recommended one for United States English users) locales are different. C uses the USASCII 7-bit character set, and treats bytes with the high bit set as invalid characters. That's why, e.g., the ls command
substitutes them with question marks in that locale. Also, an attempt to send mail with such characters from Mutt or
Pine results in non-RFC-conforming messages being sent (the charset in the outgoing mail is indicated as unknown 8bit). It's suggested that you use the C locale only if you are certain that you will never need 8-bit characters.

### 9.8 Creating the /etc/inputrc File
The inputrc file is the configuration file for the readline library, which provides editing capabilities while the user is
entering a line from the terminal. It works by translating keyboard inputs into specific actions. Readline is used by bash
and most other shells as well as many other applications.
Most people do not need user-specific functionality so the command below creates a global /etc/inputrc used by
everyone who logs in. If you later decide you need to override the defaults on a per user basis, you can create a .inputrc
file in the user's home directory with the modified mappings.
For more information on how to edit the inputrc file, see info bash under the Readline Init File section. info readline
is also a good source of information.

258

Below is a generic global inputrc along with comments to explain what the various options do. Note that comments
cannot be on the same line as commands. Create the file using the following command:
cat > /etc/inputrc << "EOF"
set horizontal-scroll-mode Off
set meta-flag On
set input-meta On
set convert-meta Off
set output-meta On
set bell-style none
"\eOd": backward-word
"\eOc": forward-word
"\e[1~": beginning-of-line
"\e[4~": end-of-line
"\e[5~": beginning-of-history
"\e[6~": end-of-history
"\e[3~": delete-char
"\e[2~": quoted-insert
"\eOH": beginning-of-line
"\eOF": end-of-line
"\e[H": beginning-of-line
"\e[F": end-of-line

### 9.9 Creating the /etc/shells File
The shells file contains a list of login shells on the system. Applications use this file to determine whether a shell is
valid. For each shell a single line should be present, consisting of the shell's path relative to the root of the directory
structure (/).
For example, this file is consulted by chsh to determine whether an unprivileged user may change the login shell for
her own account. If the command name is not listed, the user will be denied the ability to change shells.

259

It is a requirement for applications such as GDM which does not populate the face browser if it can't find /etc/shells,
or FTP daemons which traditionally disallow access to users with shells not included in this file.
cat > /etc/shells << "EOF"
/bin/sh
/bin/bash

260

## Chapter 10. Making the LFS System Bootable
### 10.1 Introduction
It is time to make the LFS system bootable. This chapter discusses creating the /etc/fstab file, building a kernel for
the new LFS system, and installing the GRUB boot loader so that the LFS system can be selected for booting at startup.

### 10.2 Creating the /etc/fstab File
The /etc/fstab file is used by some programs to determine where file systems are to be mounted by default, in which
order, and which must be checked (for integrity errors) prior to mounting. Create a new file systems table like this:
cat > /etc/fstab << "EOF"

mount-point

type

options

dump

/dev/<xxx>
/dev/<yyy>
sysfs
devpts
devtmpfs
cgroup2

/
<fff>
defaults
pri=1
/proc
nosuid,noexec,nodev 0
/sys
sysfs
nosuid,noexec,nodev 0
/dev/pts
devpts
gid=5,mode=620
/run
defaults
/dev
devtmpfs mode=0755,nosuid
/dev/shm
nosuid,nodev
/sys/fs/cgroup cgroup2 nosuid,noexec,nodev 0

fsck
order

Replace <xxx>, <yyy>, and <fff> with the values appropriate for the system, for example, sda2, sda5, and ext4. For
details on the six fields in this file, see fstab(5).
Filesystems with MS-DOS or Windows origin (i.e. vfat, ntfs, smbfs, cifs, iso9660, udf) need a special option, utf8, in
order for non-ASCII characters in file names to be interpreted properly. For non-UTF-8 locales, the value of iocharset
should be set to be the same as the character set of the locale, adjusted in such a way that the kernel understands it. This
works if the relevant character set definition (found under File systems -> Native Language Support when configuring
the kernel) has been compiled into the kernel or built as a module. However, if the character set of the locale is UTF-8,
the corresponding option iocharset=utf8 would make the file system case sensitive. To fix this, use the special option
utf8 instead of iocharset=utf8, for UTF-8 locales. The “codepage” option is also needed for vfat and smbfs filesystems.
It should be set to the codepage number used under MS-DOS in your country. For example, in order to mount USB
flash drives, a ru_RU.KOI8-R user would need the following in the options portion of its mount line in /etc/fstab:
noauto,user,quiet,showexec,codepage=866,iocharset=koi8r

The corresponding options fragment for ru_RU.UTF-8 users is:
noauto,user,quiet,showexec,codepage=866,utf8

Note that using iocharset is the default for iso8859-1 (which keeps the file system case insensitive), and the utf8 option
tells the kernel to convert the file names using UTF-8 so they can be interpreted in the UTF-8 locale.

261

It is also possible to specify default codepage and iocharset values for some filesystems during kernel configuration.
The relevant parameters are named “Default NLS Option” (CONFIG_NLS_DEFAULT), “Default Remote NLS Option”
(CONFIG_SMB_NLS_DEFAULT), “Default codepage for FAT” (CONFIG_FAT_DEFAULT_CODEPAGE), and “Default iocharset for
FAT” (CONFIG_FAT_DEFAULT_IOCHARSET). There is no way to specify these settings for the ntfs filesystem at kernel
compilation time.
It is possible to make the ext3 filesystem reliable across power failures for some hard disk types. To do this, add the
barrier=1 mount option to the appropriate entry in /etc/fstab. To check if the disk drive supports this option, run
hdparm on the applicable disk drive. For example, if:
hdparm -I /dev/sda | grep NCQ

returns non-empty output, the option is supported.
Note: Logical Volume Management (LVM) based partitions cannot use the barrier option.

262

### 10.3 Linux-6.10.5
The Linux package contains the Linux kernel.
Approximate build time: 0.4 - 32 SBU (typically about 2.5 SBU)
1.7 - 14 GB (typically about 2.3 GB)

#### 10.3.1 Installation of the kernel
Building the kernel involves a few steps—configuration, compilation, and installation. Read the README file in the kernel
source tree for alternative methods to the way this book configures the kernel.

Building the linux kernel for the first time is one of the most challenging tasks in LFS. Getting it right depends
on the specific hardware for the target system and your specific needs. There are almost 12,000 configuration
items that are available for the kernel although only about a third of them are needed for most computers. The
LFS editors recommend that users not familiar with this process follow the procedures below fairly closely.
The objective is to get an initial system to a point where you can log in at the command line when you reboot
later in Section 11.3, “Rebooting the System.” At this point optimization and customization is not a goal.
For general information on kernel configuration see https://www.linuxfromscratch.org/hints/downloads/files/
kernel-configuration.txt. Additional information about configuring and building the kernel can be found at
https://anduin.linuxfromscratch.org/LFS/kernel-nutshell/. These references are a bit dated, but still give a
reasonable overview of the process.
If all else fails, you can ask for help on the lfs-support mailing list. Note that subscribing is required in order
for the list to avoid spam.
Prepare for compilation by running the following command:
make mrproper

This ensures that the kernel tree is absolutely clean. The kernel team recommends that this command be issued prior to
each kernel compilation. Do not rely on the source tree being clean after un-tarring.
There are several ways to configure the kernel options. Usually, this is done through a menu-driven interface, for
example:
make menuconfig

The meaning of optional make environment variables:
LANG=<host_LANG_value> LC_ALL=

This establishes the locale setting to the one used on the host. This may be needed for a proper menuconfig ncurses
interface line drawing on a UTF-8 linux text console.
If used, be sure to replace <host_LANG_value> by the value of the $LANG variable from your host. You can
alternatively use instead the host's value of $LC_ALL or $LC_CTYPE.
make menuconfig
This launches an ncurses menu-driven interface. For other (graphical) interfaces, type make help.

A good starting place for setting up the kernel configuration is to run make defconfig. This will set the base
configuration to a good state that takes your current system architecture into account.
263

Be sure to enable/disable/set the following features or the system might not work correctly or boot at all:
General setup --->
[ ] Compile the kernel with warnings as errors
[WERROR]
CPU/Task time and stats accounting --->
[*] Pressure stall information tracking
[PSI]
[ ]
Require boot parameter to enable pressure stall information tracking
... [PSI_DEFAULT_DISABLED]
< > Enable kernel headers through /sys/kernel/kheaders.tar.xz
[IKHEADERS]
[*] Control Group support --->
[CGROUPS]
[*] Memory controller
[MEMCG]
[ ] Configure standard kernel features (expert users) --->
[EXPERT]
Processor type and features --->
[*] Build a relocatable kernel
[*]
Randomize the address of the kernel image (KASLR)
General architecture-dependent options --->
[*] Stack Protector buffer overflow detection
[*]
Strong Stack Protector

[RELOCATABLE]
[RANDOMIZE_BASE]

[STACKPROTECTOR]
[STACKPROTECTOR_STRONG]

Device Drivers --->
Generic Driver Options --->
[ ] Support for uevent helper
[UEVENT_HELPER]
[*] Maintain a devtmpfs filesystem to mount at /dev
[DEVTMPFS]
[*]
Automount devtmpfs at /dev, after the kernel mounted the rootfs
... [DEVTMPFS_MOUNT]
Graphics support --->
< /*/M> Direct Rendering Manager (XFree86 4.1.0 and higher DRI support) --->
... [DRM]
[ /*] Enable legacy fbdev support for your modesetting driver
... [DRM_FBDEV_EMULATION]
Console display driver support --->
[ /*] Framebuffer Console support
[FRAMEBUFFER_CONSOLE]

Enable some additional features if you are building a 64-bit system. If you are using menuconfig, enable them
in the order of CONFIG_PCI_MSI first, then CONFIG_IRQ_REMAP, at last CONFIG_X86_X2APIC because an option only
shows up after its dependencies are selected.
Processor type and features --->
[*] Support x2apic

[X86_X2APIC]

Device Drivers --->
[*] PCI support --->
[*] Message Signaled Interrupts (MSI and MSI-X)
[*] IOMMU Hardware Support --->
[*] Support for Interrupt Remapping

[PCI]
[PCI_MSI]
[IOMMU_SUPPORT]
[IRQ_REMAP]

If you are building a 32-bit system running on a hardware with RAM more than 4GB, adjust the configuration
so the kernel will be able to use up to 64GB physical RAM:
Processor type and features --->
High Memory Support --->
(X) 64GB

[HIGHMEM64G]

264

If the partition for the LFS system is in a NVME SSD (i. e. the device node for the partition is /dev/nvme*
instead of /dev/sd*), enable NVME support or the LFS system won't boot:
Device Drivers --->
NVME Support --->
<*> NVM Express block device

[BLK_DEV_NVME]

There are several other options that may be desired depending on the requirements for the system. For a list of options
needed for BLFS packages, see the BLFS Index of Kernel Settings.

If your host hardware is using UEFI and you wish to boot the LFS system with it, you should adjust some
kernel configuration following the BLFS page even if you'll use the UEFI bootloader from the host distro.
The rationale for the above configuration items:
Randomize the address of the kernel image (KASLR)

Enable ASLR for kernel image, to mitigate some attacks based on fixed addresses of sensitive data or code in
the kernel.
Compile the kernel with warnings as errors

This may cause building failure if the compiler and/or configuration are different from those of the kernel
developers.
Enable kernel headers through /sys/kernel/kheaders.tar.xz

This will require cpio building the kernel. cpio is not installed by LFS.
Configure standard kernel features (expert users)

This will make some options show up in the configuration interface but changing those options may be dangerous.
Do not use this unless you know what you are doing.
Strong Stack Protector

Enable SSP for the kernel. We've enabled it for the entire userspace with --enable-default-ssp configuring GCC,
but the kernel does not use GCC default setting for SSP. We enable it explicitly here.
Support for uevent helper

Having this option set may interfere with device management when using Udev.
Maintain a devtmpfs

This will create automated device nodes which are populated by the kernel, even without Udev running. Udev
then runs on top of this, managing permissions and adding symlinks. This configuration item is required for all
users of Udev.
Automount devtmpfs at /dev

This will mount the kernel view of the devices on /dev upon switching to root filesystem just before starting init.
Enable legacy fbdev support for your modesetting driver and Framebuffer Console support
These are needed to display the Linux console on a GPU driven by a DRI (Direct Rendering Infrastructure) driver.
If CONFIG_DRM (Direct Rendering Manager) is enabled, you should enable these two options as well or you'll see
a blank screen once the DRI driver is loaded.
Support x2apic

Support running the interrupt controller of 64-bit x86 processors in x2APIC mode. x2APIC may be enabled by
firmware on 64-bit x86 systems, and a kernel without this option enabled will panic on boot if x2APIC is enabled
by firmware. This option has no effect, but also does no harm if x2APIC is disabled by the firmware.
265

Alternatively, make oldconfig may be more appropriate in some situations. See the README file for more information.
If desired, skip kernel configuration by copying the kernel config file, .config, from the host system (assuming it is
available) to the unpacked linux-6.10.5 directory. However, we do not recommend this option. It is often better to
explore all the configuration menus and create the kernel configuration from scratch.
Compile the kernel image and modules:

If using kernel modules, module configuration in /etc/modprobe.d may be required. Information pertaining to modules
and kernel configuration is located in Section 9.3, “Overview of Device and Module Handling” and in the kernel
documentation in the linux-6.10.5/Documentation directory. Also, modprobe.d(5) may be of interest.
Unless module support has been disabled in the kernel configuration, install the modules with:
make modules_install

After kernel compilation is complete, additional steps are required to complete the installation. Some files need to be
copied to the /boot directory.

If you've decided to use a separate /boot partition for the LFS system (maybe sharing a /boot partition with
the host distro) , the files copied below should go there. The easiest way to do that is to create the entry for /
boot in /etc/fstab first (read the previous section for details), then issue the following command as the root
user in the chroot environment:
mount /boot

The path to the device node is omitted in the command because mount can read it from /etc/fstab.
The path to the kernel image may vary depending on the platform being used. The filename below can be changed to
suit your taste, but the stem of the filename should be vmlinuz to be compatible with the automatic setup of the boot
process described in the next section. The following command assumes an x86 architecture:
cp -iv arch/x86/boot/bzImage /boot/vmlinuz-6.10.5-lfs-12.2
System.map is a symbol file for the kernel. It maps the function entry points of every function in the kernel API, as well

as the addresses of the kernel data structures for the running kernel. It is used as a resource when investigating kernel
problems. Issue the following command to install the map file:
cp -iv System.map /boot/System.map-6.10.5

The kernel configuration file .config produced by the make menuconfig step above contains all the configuration
selections for the kernel that was just compiled. It is a good idea to keep this file for future reference:
cp -iv .config /boot/config-6.10.5

Install the documentation for the Linux kernel:
cp -r Documentation -T /usr/share/doc/linux-6.10.5

It is important to note that the files in the kernel source directory are not owned by root. Whenever a package is unpacked
as user root (like we did inside chroot), the files have the user and group IDs of whatever they were on the packager's
computer. This is usually not a problem for any other package to be installed because the source tree is removed after
266

the installation. However, the Linux source tree is often retained for a long time. Because of this, there is a chance
that whatever user ID the packager used will be assigned to somebody on the machine. That person would then have
write access to the kernel source.

In many cases, the configuration of the kernel will need to be updated for packages that will be installed later
in BLFS. Unlike other packages, it is not necessary to remove the kernel source tree after the newly built
kernel is installed.
If the kernel source tree is going to be retained, run chown -R 0:0 on the linux-6.10.5 directory to ensure
all files are owned by user root.

Some kernel documentation recommends creating a symlink from /usr/src/linux pointing to the kernel
source directory. This is specific to kernels prior to the 2.6 series and must not be created on an LFS system
as it can cause problems for packages you may wish to build once your base LFS system is complete.

The headers in the system's include directory (/usr/include) should always be the ones against which Glibc
was compiled, that is, the sanitised headers installed in Section 5.4, “Linux-6.10.5 API Headers”. Therefore,
they should never be replaced by either the raw kernel headers or any other kernel sanitized headers.

#### 10.3.2 Configuring Linux Module Load Order
Most of the time Linux modules are loaded automatically, but sometimes it needs some specific direction. The program
that loads modules, modprobe or insmod, uses /etc/modprobe.d/usb.conf for this purpose. This file needs to be created
so that if the USB drivers (ehci_hcd, ohci_hcd and uhci_hcd) have been built as modules, they will be loaded in the
correct order; ehci_hcd needs to be loaded prior to ohci_hcd and uhci_hcd in order to avoid a warning being output
at boot time.
Create a new file /etc/modprobe.d/usb.conf by running the following:
install -v -m755 -d /etc/modprobe.d
cat > /etc/modprobe.d/usb.conf << "EOF"
install ohci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i ohci_hcd ; true
install uhci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i uhci_hcd ; true

#### 10.3.3 Contents of Linux
Installed files:

config-6.10.5, vmlinuz-6.10.5-lfs-12.2, and System.map-6.10.5
/lib/modules, /usr/share/doc/linux-6.10.5

config-6.10.5

Contains all the configuration selections for the kernel
267

vmlinuz-6.10.5-lfs-12.2

The engine of the Linux system. When turning on the computer, the kernel is
the first part of the operating system that gets loaded. It detects and initializes all
components of the computer's hardware, then makes these components available
as a tree of files to the software and turns a single CPU into a multitasking machine
capable of running scores of programs seemingly at the same time

System.map-6.10.5

A list of addresses and symbols; it maps the entry points and addresses of all the
functions and data structures in the kernel

268

### 10.4 Using GRUB to Set Up the Boot Process
If your system has UEFI support and you wish to boot LFS with UEFI, you should skip the instructions in
this page but still learn the syntax of grub.cfg and the method to specify a partition in the file from this page,
and configure GRUB with UEFI support using the instructions provided in the BLFS page.

#### 10.4.1 Introduction
Configuring GRUB incorrectly can render your system inoperable without an alternate boot device such as a
CD-ROM or bootable USB drive. This section is not required to boot your LFS system. You may just want
to modify your current boot loader, e.g. Grub-Legacy, GRUB2, or LILO.
Ensure that an emergency boot disk is ready to “rescue” the computer if the computer becomes unusable (un-bootable).
If you do not already have a boot device, you can create one. In order for the procedure below to work, you need to
jump ahead to BLFS and install xorriso from the libisoburn package.
cd /tmp
grub-mkrescue --output=grub-img.iso
xorriso -as cdrecord -v dev=/dev/cdrw blank=as_needed grub-img.iso

#### 10.4.2 GRUB Naming Conventions
GRUB uses its own naming structure for drives and partitions in the form of (hdn,m), where n is the hard drive number
and m is the partition number. The hard drive numbers start from zero, but the partition numbers start from one for
normal partitions (from five for extended partitions). Note that this is different from earlier versions where both numbers
started from zero. For example, partition sda1 is (hd0,1) to GRUB and sdb3 is (hd1,3). In contrast to Linux, GRUB
does not consider CD-ROM drives to be hard drives. For example, if using a CD on hdb and a second hard drive on
hdc, that second hard drive would still be (hd1).

#### 10.4.3 Setting Up the Configuration
GRUB works by writing data to the first physical track of the hard disk. This area is not part of any file system. The
programs there access GRUB modules in the boot partition. The default location is /boot/grub/.
The location of the boot partition is a choice of the user that affects the configuration. One recommendation is to have
a separate small (suggested size is 200 MB) partition just for boot information. That way each build, whether LFS or
some commercial distro, can access the same boot files and access can be made from any booted system. If you choose
to do this, you will need to mount the separate partition, move all files in the current /boot directory (e.g. the Linux
kernel you just built in the previous section) to the new partition. You will then need to unmount the partition and
remount it as /boot. If you do this, be sure to update /etc/fstab.
Leaving /boot on the current LFS partition will also work, but configuration for multiple systems is more difficult.
Using the above information, determine the appropriate designator for the root partition (or boot partition, if a separate
one is used). For the following example, it is assumed that the root (or separate boot) partition is sda2.
Install the GRUB files into /boot/grub and set up the boot track:
269

The following command will overwrite the current boot loader. Do not run the command if this is not desired,
for example, if using a third party boot manager to manage the Master Boot Record (MBR).
grub-install /dev/sda

If the system has been booted using UEFI, grub-install will try to install files for the x86_64-efi target, but
those files have not been installed in Chapter 8. If this is the case, add --target i386-pc to the command
above.

#### 10.4.4 Creating the GRUB Configuration File
Generate /boot/grub/grub.cfg:
cat > /boot/grub/grub.cfg << "EOF"
set default=0
set timeout=5
insmod part_gpt
insmod ext2
set root=(hd0,2)
menuentry "GNU/Linux, Linux 6.10.5-lfs-12.2" {
linux
/boot/vmlinuz-6.10.5-lfs-12.2 root=/dev/sda2 ro

The insmod commands load the GRUB modules named part_gpt and ext2. Despite the naming, ext2 actually supports
ext2, ext3, and ext4 filesystems. The grub-install command has embedded some modules into the main GRUB image
(installed into the MBR or the GRUB BIOS partition) to access the other modules (in /boot/grub/i386-pc) without a
chicken-or-egg issue, so with a typical configuration these two modules are already embedded and those two insmod
commands will do nothing. But they do no harm anyway, and they may be needed with some rare configurations.

From GRUB's perspective, the kernel files are relative to the partition used. If you used a separate /boot
partition, remove /boot from the above linux line. You will also need to change the set root line to point to
the boot partition.

270

The GRUB designator for a partition may change if you added or removed some disks (including
removable disks like USB thumb devices). The change may cause boot failure because grub.cfg refers
to some “old” designators. If you wish to avoid such a problem, you may use the UUID of a partition
and the UUID of a filesystem instead of a GRUB designator to specify a device. Run lsblk -o
UUID,PARTUUID,PATH,MOUNTPOINT to show the UUIDs of your filesystems (in the UUID column)
and partitions (in the PARTUUID column). Then replace set root=(hdx,y) with search --set=root --fsuuid <UUID of the filesystem where the kernel is installed>, and replace root=/dev/sda2 with
root=PARTUUID=<UUID of the partition where LFS is built>.
Note that the UUID of a partition is completely different from the UUID of the filesystem in this
partition. Some online resources may instruct you to use root=UUID=<filesystem UUID> instead of
root=PARTUUID=<partition UUID>, but doing so will require an initramfs, which is beyond the scope of LFS.
The name of the device node for a partition in /dev may also change (this is less likely than a GRUB designator
change). You can also replace paths to device nodes like /dev/sda1 with PARTUUID=<partition UUID>, in /
etc/fstab, to avoid a potential boot failure in case the device node name has changed.
GRUB is an extremely powerful program and it provides a tremendous number of options for booting from a wide
variety of devices, operating systems, and partition types. There are also many options for customization such as
graphical splash screens, playing sounds, mouse input, etc. The details of these options are beyond the scope of this
introduction.

There is a command, grub-mkconfig, that can write a configuration file automatically. It uses a set of scripts
in /etc/grub.d/ and will destroy any customizations that you make. These scripts are designed primarily for
non-source distributions and are not recommended for LFS. If you install a commercial Linux distribution,
there is a good chance that this program will be run. Be sure to back up your grub.cfg file.

271

## Chapter 11. The End
### 11.1 The End
Well done! The new LFS system is installed! We wish you much success with your shiny new custom-built Linux
system.
It may be a good idea to create an /etc/lfs-release file. By having this file, it is very easy for you (and for us if you
need to ask for help at some point) to find out which LFS version is installed on the system. Create this file by running:
echo 12.2 > /etc/lfs-release

Two files describing the installed system may be used by packages that can be installed on the system later, either in
binary form or by building them.
The first one shows the status of your new system with respect to the Linux Standards Base (LSB). To create this
file, run:
cat > /etc/lsb-release << "EOF"
DISTRIB_ID="Linux From Scratch"
DISTRIB_RELEASE="12.2"
DISTRIB_CODENAME="<your name here>"
DISTRIB_DESCRIPTION="Linux From Scratch"

The second one contains roughly the same information, and is used by systemd and some graphical desktop
environments. To create this file, run:
cat > /etc/os-release << "EOF"
NAME="Linux From Scratch"
VERSION="12.2"
ID=lfs
PRETTY_NAME="Linux From Scratch 12.2"
VERSION_CODENAME="<your name here>"
HOME_URL="https://www.linuxfromscratch.org/lfs/"

Be sure to customize the fields 'DISTRIB_CODENAME' and 'VERSION_CODENAME' to make the system uniquely
yours.

### 11.2 Get Counted
Now that you have finished the book, do you want to be counted as an LFS user? Head over to https://www.
linuxfromscratch.org/cgi-bin/lfscounter.php and register as an LFS user by entering your name and the first LFS version
you have used.
Let's reboot into LFS now.

### 11.3 Rebooting the System
Now that all of the software has been installed, it is time to reboot your computer. However, there are still a few things
to check. Here are some suggestions:
- Install any firmware needed if the kernel driver for your hardware requires some firmware files to function
properly.
- Ensure a password is set for the root user.
272

- A review of the following configuration files is also appropriate at this point.
- /etc/bashrc
- /etc/dircolors
- /etc/fstab
- /etc/hosts
- /etc/inputrc
- /etc/profile
- /etc/resolv.conf
- /etc/vimrc
- /root/.bash_profile
- /root/.bashrc
- /etc/sysconfig/ifconfig.eth0
Now that we have said that, let's move on to booting our shiny new LFS installation for the first time! First exit from
the chroot environment:
logout

Then unmount the virtual file systems:
umount -v $LFS/dev/pts
mountpoint -q $LFS/dev/shm && umount -v $LFS/dev/shm
umount -v $LFS/dev
umount -v $LFS/run
umount -v $LFS/proc
umount -v $LFS/sys

If multiple partitions were created, unmount the other partitions before unmounting the main one, like this:
umount -v $LFS/home
umount -v $LFS

Unmount the LFS file system itself:
umount -v $LFS

Now, reboot the system.
Assuming the GRUB boot loader was set up as outlined earlier, the menu is set to boot LFS 12.2 automatically.
When the reboot is complete, the LFS system is ready for use. What you will see is a simple “login: ” prompt. At this
point, you can proceed to the BLFS Book where you can add more software to suit your needs.
If your reboot is not successful, it is time to troubleshoot. For hints on solving initial booting problems, see https://
www.linuxfromscratch.org/lfs/troubleshooting.html.

### 11.4 Additional Resources
Thank you for reading this LFS book. We hope that you have found this book helpful and have learned more about
the system creation process.
Now that the LFS system is installed, you may be wondering “What next?” To answer that question, we have compiled
a list of resources for you.
273

- Maintenance
Bugs and security notices are reported regularly for all software. Since an LFS system is compiled from source,
it is up to you to keep abreast of such reports. There are several online resources that track such reports, some of
which are shown below:
- LFS Security Advisories
This is a list of security vulnerabilities discovered in the LFS book after it's published.
- Open Source Security Mailing List
This is a mailing list for discussion of security flaws, concepts, and practices in the Open Source community.
- LFS Hints
The LFS Hints are a collection of educational documents submitted by volunteers in the LFS community. The
hints are available at https://www.linuxfromscratch.org/hints/downloads/files/.
- Mailing lists
There are several LFS mailing lists you may subscribe to if you are in need of help, want to stay current with
the latest developments, want to contribute to the project, and more. See Chapter 1 - Mailing Lists for more
information.
- The Linux Documentation Project
The goal of The Linux Documentation Project (TLDP) is to collaborate on all of the issues of Linux
documentation. The TLDP features a large collection of HOWTOs, guides, and man pages. It is located at https://
tldp.org/.

### 11.5 Getting Started After LFS
#### 11.5.1 Deciding what to do next
Now that LFS is complete and you have a bootable system, what do you do? The next step is to decide how to use it.
Generally, there are two broad categories to consider: workstation or server. Indeed, these categories are not mutually
exclusive. The applications needed for each category can be combined onto a single system, but let's look at them
separately for now.
A server is the simpler category. Generally this consists of a web server such as the Apache HTTP Server and a database
server such as MariaDB. However other services are possible. The operating system embedded in a single use device
falls into this category.
On the other hand, a workstation is much more complex. It generally requires a graphical user environment such as
LXDE, XFCE, KDE, or Gnome based on a basic graphical environment and several graphical based applications such
as the Firefox web browser, Thunderbird email client, or LibreOffice office suite. These applications require many
(several hundred depending on desired capabilities) more packages of support applications and libraries.
In addition to the above, there is a set of applications for system management for all kinds of systems. These applications
are all in the BLFS book. Not all packages are needed in every environments. For example dhcpcd, is not normally
appropriate for a server and wireless_tools, are normally only useful for a laptop system.

#### 11.5.2 Working in a basic LFS environment
When you initially boot into LFS, you have all the internal tools to build additional packages. Unfortunately, the user
environment is quite sparse. There are a couple of ways to improve this:

274

11.5.2.1. Work from the LFS host in chroot
This method provides a complete graphical environment where a full featured browser and copy/paste capabilities are
available. This method allows using applications like the host's version of wget to download package sources to a
location available when working in the chroot environment.
In order to properly build packages in chroot, you will also need to remember to mount the virtual file systems if they
are not already mounted. One way to do this is to create a script on the HOST system:
cat > ~/mount-virt.sh << "EOF"
function mountbind
if ! mountpoint $LFS/$1 >/dev/null; then
$SUDO mount --bind /$1 $LFS/$1
echo $LFS/$1 mounted
echo $LFS/$1 already mounted
function mounttype
if ! mountpoint $LFS/$1 >/dev/null; then
$SUDO mount -t $2 $3 $4 $5 $LFS/$1
echo $LFS/$1 mounted
echo $LFS/$1 already mounted
if [ $EUID -ne 0 ]; then
SUDO=sudo
SUDO=""
if [ x$LFS == x ]; then
echo "LFS not set"
mountbind dev
mounttype dev/pts devpts devpts -o gid=5,mode=620
mounttype proc
mounttype sys
sysfs sysfs
mounttype run
tmpfs run
if [ -h $LFS/dev/shm ]; then
install -v -d -m 1777 $LFS$(realpath /dev/shm)
mounttype dev/shm tmpfs tmpfs -o nosuid,nodev
#mountbind usr/src
#mountbind boot
#mountbind home

Note that the last three commands in the script are commented out. These are useful if those directories are mounted as
separate partitions on the host system and will be mounted when booting the completed LFS/BLFS system.
275

The script can be run with bash ~/mount-virt.sh as either a regular user (recommended) or as root. If run as a regular
user, sudo is required on the host system.
Another issue pointed out by the script is where to store downloaded package files. This location is arbitrary. It can
be in a regular user's home directory such as ~/sources or in a global location like /usr/src. Our recommendation is not
to mix BLFS sources and LFS sources in (from the chroot environment) /sources. In any case, the packages must be
accessible inside the chroot environment.
A last convenience feature presented here is to streamline the process of entering the chroot environment. This can be
done with an alias placed in a user's ~/.bashrc file on the host system:
alias lfs='sudo /usr/sbin/chroot /mnt/lfs /usr/bin/env -i HOME=/root TERM="$TERM" PS1="\u:\w\\\\$ "
PATH=/bin:/usr/bin:/sbin:/usr/sbin /bin/bash --login'

This alias is a little tricky because of the quoting and levels of backslash characters. It must be all on a single line. The
above command has been split in two for presentation purposes.

11.5.2.2. Work remotely via ssh
This method also provides a full graphical environment, but first requires installing sshd on the LFS system, usually
in chroot. It also requires a second computer. This method has the advantage of being simple by not requiring the
complexity of the chroot environment. It also uses your LFS built kernel for all additional packages and still provides
a complete system for installing packages.
You may use the scp command to upload the package sources to be built onto the LFS system. If you want to download
the sources onto the LFS system directly instead, install libtasn1, p11-kit, make-ca, and wget in chroot (or upload their
sources using scp after booting the LFS system).

11.5.2.3. Work from the LFS command line
This method requires installing libtasn1, p11-kit, make-ca, wget, gpm, and links (or lynx) in chroot and then rebooting
into the new LFS system. At this point the default system has six virtual consoles. Switching consoles is as easy as
using the Alt+Fx key combinations where Fx is between F1 and F6. The Alt+← and Alt+→ combinations also will
change the console.
At this point you can log into two different virtual consoles and run the links or lynx browser in one console and bash
in the other. GPM then allows copying commands from the browser with the left mouse button, switching consoles,
and pasting into the other console.

As a side note, switching of virtual consoles can also be done from an X Window instance with the
Ctrl+Alt+Fx key combination, but the mouse copy operation does not work between the graphical interface
and a virtual console. You can return to the X Window display with the Ctrl+Alt+Fx combination, where
Fx is usually F1 but may be F7.

276

Part V. Appendices

Appendix A. Acronyms and Terms
ABI

Application Binary Interface

ALFS

Automated Linux From Scratch

API

Application Programming Interface

ASCII

American Standard Code for Information Interchange

BIOS

Basic Input/Output System

BLFS

Beyond Linux From Scratch

BSD

Berkeley Software Distribution

chroot

change root

CMOS

Complementary Metal Oxide Semiconductor

COS

Class Of Service

CPU

Central Processing Unit

CRC

Cyclic Redundancy Check

CVS

Concurrent Versions System

DHCP

Dynamic Host Configuration Protocol

DNS

Domain Name Service

EGA

Enhanced Graphics Adapter

ELF

Executable and Linkable Format

End of File

EQN

equation

ext2

second extended file system

ext3

third extended file system

ext4

fourth extended file system

FAQ

Frequently Asked Questions

FHS

Filesystem Hierarchy Standard

FIFO

First-In, First Out

FQDN

Fully Qualified Domain Name

FTP

File Transfer Protocol

GB

Gigabytes

GCC

GNU Compiler Collection

GID

Group Identifier

GMT

Greenwich Mean Time

HTML

Hypertext Markup Language

IDE

Integrated Drive Electronics

IEEE

Institute of Electrical and Electronic Engineers
278

IO

Input/Output

IP

Internet Protocol

IPC

Inter-Process Communication

IRC

Internet Relay Chat

ISO

International Organization for Standardization

ISP

Internet Service Provider

KB

Kilobytes

LED

Light Emitting Diode

Linux From Scratch

LSB

Linux Standard Base

MB

Megabytes

MBR

Master Boot Record

MD5

Message Digest 5

NIC

Network Interface Card

NLS

Native Language Support

NNTP

Network News Transport Protocol

NPTL

Native POSIX Threading Library

OSS

Open Sound System

PCH

Pre-Compiled Headers

PCRE

Perl Compatible Regular Expression

PID

Process Identifier

PTY

pseudo terminal

QOS

Quality Of Service

RAM

Random Access Memory

RPC

Remote Procedure Call

RTC

Real Time Clock

SBU

Standard Build Unit

SCO

The Santa Cruz Operation

SHA1

Secure-Hash Algorithm 1

TLDP

The Linux Documentation Project

TFTP

Trivial File Transfer Protocol

TLS

Thread-Local Storage

UID

User Identifier

umask

user file-creation mask

USB

Universal Serial Bus

UTC

Coordinated Universal Time
279

UUID

Universally Unique Identifier

VC

Virtual Console

VGA

Video Graphics Array

VT

Virtual Terminal

280

Appendix B. Acknowledgments
We would like to thank the following people and organizations for their contributions to the Linux From Scratch Project.
- Gerard Beekmans <gerard@linuxfromscratch.org> – LFS Creator
- Bruce Dubbs <bdubbs@linuxfromscratch.org> – LFS Managing Editor
- Jim Gifford <jim@linuxfromscratch.org> – CLFS Project Co-Leader
- Pierre Labastie <pierre@linuxfromscratch.org> – BLFS Editor and ALFS Lead
- DJ Lucas <dj@linuxfromscratch.org> – LFS and BLFS Editor
- Ken Moffat <ken@linuxfromscratch.org> – BLFS Editor
- Countless other people on the various LFS and BLFS mailing lists who helped make this book possible by giving
their suggestions, testing the book, and submitting bug reports, instructions, and their experiences with installing
various packages.

Translators
- Manuel Canales Esparcia <macana@macana-es.com> – Spanish LFS translation project
- Johan Lenglet <johan@linuxfromscratch.org> – French LFS translation project until 2008
- Jean-Philippe Mengual <jmengual@linuxfromscratch.org> – French LFS translation project 2008-2016
- Julien Lepiller <jlepiller@linuxfromscratch.org> – French LFS translation project 2017-present
- Anderson Lizardo <lizardo@linuxfromscratch.org> – Portuguese LFS translation project historical
- Jamenson Espindula <jafesp@gmail.com> – Portuguese LFS translation project 2022-present
- Thomas Reitelbach <tr@erdfunkstelle.de> – German LFS translation project

Mirror Maintainers
North American Mirrors
- Scott Kveton <scott@osuosl.org> – lfs.oregonstate.edu mirror
- William Astle <lost@l-w.net> – ca.linuxfromscratch.org mirror
- Eujon Sellers <jpolen@rackspace.com> – lfs.introspeed.com mirror
- Justin Knierim <tim@idge.net> – lfs-matrix.net mirror

South American Mirrors
- Manuel Canales Esparcia <manuel@linuxfromscratch.org> – lfsmirror.lfs-es.info mirror
- Luis Falcon <Luis Falcon> – torredehanoi.org mirror

European Mirrors
- Guido Passet <guido@primerelay.net> – nl.linuxfromscratch.org mirror
- Bastiaan Jacques <baafie@planet.nl> – lfs.pagefault.net mirror
- Sven Cranshoff <sven.cranshoff@lineo.be> – lfs.lineo.be mirror
281

- Scarlet Belgium – lfs.scarlet.be mirror
- Sebastian Faulborn <info@aliensoft.org> – lfs.aliensoft.org mirror
- Stuart Fox <stuart@dontuse.ms> – lfs.dontuse.ms mirror
- Ralf Uhlemann <admin@realhost.de> – lfs.oss-mirror.org mirror
- Antonin Sprinzl <Antonin.Sprinzl@tuwien.ac.at> – at.linuxfromscratch.org mirror
- Fredrik Danerklint <fredan-lfs@fredan.org> – se.linuxfromscratch.org mirror
- Franck <franck@linuxpourtous.com> – lfs.linuxpourtous.com mirror
- Philippe Baque <baque@cict.fr> – lfs.cict.fr mirror
- Vitaly Chekasin <gyouja@pilgrims.ru> – lfs.pilgrims.ru mirror
- Benjamin Heil <kontakt@wankoo.org> – lfs.wankoo.org mirror
- Anton Maisak <info@linuxfromscratch.org.ru> – linuxfromscratch.org.ru mirror

Asian Mirrors
- Satit Phermsawang <satit@wbac.ac.th> – lfs.phayoune.org mirror
- Shizunet Co.,Ltd. <info@shizu-net.jp> – lfs.mirror.shizu-net.jp mirror

Australian Mirrors
- Jason Andrade <jason@dstc.edu.au> – au.linuxfromscratch.org mirror

Former Project Team Members
- Christine Barczak <theladyskye@linuxfromscratch.org> – LFS Book Editor
- Archaic <archaic@linuxfromscratch.org> – LFS Technical Writer/Editor, HLFS Project Leader, BLFS Editor,
Hints and Patches Project Maintainer
- Matthew Burgess <matthew@linuxfromscratch.org> – LFS Project Leader, LFS Technical Writer/Editor
- Nathan Coulson <nathan@linuxfromscratch.org> – LFS-Bootscripts Maintainer
- Timothy Bauscher
- Robert Briggs
- Ian Chilton
- Jeroen Coumans <jeroen@linuxfromscratch.org> – Website Developer, FAQ Maintainer
- Manuel Canales Esparcia <manuel@linuxfromscratch.org> – LFS/BLFS/HLFS XML and XSL Maintainer
- Alex Groenewoud – LFS Technical Writer
- Marc Heerdink
- Jeremy Huntwork <jhuntwork@linuxfromscratch.org> – LFS Technical Writer, LFS LiveCD Maintainer
- Bryan Kadzban <bryan@linuxfromscratch.org> – LFS Technical Writer
- Mark Hymers
- Seth W. Klein – FAQ maintainer
- Nicholas Leippe <nicholas@linuxfromscratch.org> – Wiki Maintainer
282

- Anderson Lizardo <lizardo@linuxfromscratch.org> – Website Backend-Scripts Maintainer
- Randy McMurchy <randy@linuxfromscratch.org> – BLFS Project Leader, LFS Editor
- Dan Nicholson <dnicholson@linuxfromscratch.org> – LFS and BLFS Editor
- Alexander E. Patrakov <alexander@linuxfromscratch.org> – LFS Technical Writer, LFS Internationalization
Editor, LFS Live CD Maintainer
- Simon Perreault
- Scot Mc Pherson <scot@linuxfromscratch.org> – LFS NNTP Gateway Maintainer
- Douglas R. Reno <renodr@linuxfromscratch.org> – Systemd Editor
- Ryan Oliver <ryan@linuxfromscratch.org> – CLFS Project Co-Leader
- Greg Schafer <gschafer@zip.com.au> – LFS Technical Writer and Architect of the Next Generation 64-bitenabling Build Method
- Jesse Tie-Ten-Quee – LFS Technical Writer
- James Robertson <jwrober@linuxfromscratch.org> – Bugzilla Maintainer
- Tushar Teredesai <tushar@linuxfromscratch.org> – BLFS Book Editor, Hints and Patches Project Leader
- Jeremy Utley <jeremy@linuxfromscratch.org> – LFS Technical Writer, Bugzilla Maintainer, LFS-Bootscripts
Maintainer
- Zack Winkles <zwinkles@gmail.com> – LFS Technical Writer

283

Appendix C. Dependencies
Every package built in LFS relies on one or more other packages in order to build and install properly. Some packages
even participate in circular dependencies, that is, the first package depends on the second which in turn depends on the
first. Because of these dependencies, the order in which packages are built in LFS is very important. The purpose of
this page is to document the dependencies of each package built in LFS.
For each package that is built, there are three, and sometimes up to five types of dependencies listed below. The first
lists what other packages need to be available in order to compile and install the package in question. The second lists
the packages that must be available when any programs or libraries from the package are used at runtime. The third
lists what packages, in addition to those on the first list, need to be available in order to run the test suites. The fourth
list of dependencies are packages that require this package to be built and installed in its final location before they are
built and installed.
The last list of dependencies are optional packages that are not addressed in LFS, but could be useful to the user.
These packages may have additional mandatory or optional dependencies of their own. For these dependencies, the
recommended practice is to install them after completion of the LFS book and then go back and rebuild the LFS package.
In several cases, re-installation is addressed in BLFS.

Acl

Attr, Bash, Binutils, Coreutils, GCC, Gettext, Grep, M4, Make, Perl, Sed, and Texinfo
Attr and Glibc
Automake, Diffutils, Findutils, and Libtool
Coreutils, Sed, Tar, and Vim

Attr

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, M4, Make, Perl, Sed, and Texinfo
Automake, Diffutils, Findutils, and Libtool
Acl, Libcap, and Patch

Autoconf

Bash, Coreutils, Grep, M4, Make, Perl, Sed, and Texinfo
Bash, Coreutils, Grep, M4, Make, Sed, and Texinfo
Automake, Diffutils, Findutils, GCC, and Libtool
Automake and Coreutils
Emacs

Automake

Autoconf, Bash, Coreutils, Gettext, Grep, M4, Make, Perl, Sed, and Texinfo
Bash, Coreutils, Grep, M4, Sed, and Texinfo
Binutils, Bison, Bzip2, DejaGNU, Diffutils, Expect, Findutils, Flex, GCC, Gettext, Gzip,
Libtool, and Tar
284

Bash

Bash, Binutils, Bison, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Ncurses,
Patch, Readline, Sed, and Texinfo
Glibc, Ncurses, and Readline
Expect and Shadow
Xorg

Bc

Bash, Binutils, Coreutils, GCC, Glibc, Grep, Make, and Readline
Glibc, Ncurses, and Readline
Gawk
Linux

Binutils

Bash, Binutils, Coreutils, Diffutils, File, Flex, Gawk, GCC, Glibc, Grep, Make, Perl,
Pkgconf, Sed, Texinfo, Zlib, and Zstd
Glibc, Zlib, and Zstd
DejaGNU and Expect
Elfutils and Jansson

Bison

Bash, Binutils, Coreutils, Diffutils, GCC, Gettext, Glibc, Grep, M4, Make, Perl, and Sed
Diffutils, Findutils, and Flex
Kbd and Tar
Doxygen

Bzip2

Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, Make, and Patch
File and Libelf

Check

Gawk, GCC, Grep, Make, Sed, and Texinfo
Bash and Gawk
libsubunit and patchutils
285

Autoconf, Automake, Bash, Binutils, Coreutils, GCC, Gettext, Glibc, GMP, Grep,
Libcap, Make, OpenSSL, Patch, Perl, Sed, and Texinfo
Diffutils, E2fsprogs, Findutils, Shadow, and Util-linux
Bash, Diffutils, Findutils, Man-DB, and Udev
Expect.pm and IO::Tty

DejaGNU

Bash, Coreutils, Diffutils, Expect, GCC, Grep, Make, Sed, and Texinfo
Expect and Bash

Bash, Binutils, Coreutils, Gawk, GCC, Gettext, Glibc, Grep, Make, Sed, and Texinfo

E2fsprogs

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Gzip, Make, Pkgconf, Sed,
Texinfo, and Util-linux
Glibc and Util-linux
Procps-ng and Psmisc

Expat

Bash, Binutils, Coreutils, Gawk, GCC, Glibc, Grep, Make, and Sed
Python and XML::Parser

Expect

Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, Grep, Make, Patch, Sed, and Tcl
Glibc and Tcl
Tk
286

File

Bash, Binutils, Bzip2, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Sed, Xz, and
Glibc, Bzip2, Xz, and Zlib
libseccomp

Findutils

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, Make, Sed, and Texinfo
Bash and Glibc
DejaGNU, Diffutils, and Expect

Flex

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, M4, Make, Patch, Sed, and Texinfo
Bash, Glibc, and M4
Bison and Gawk
Binutils, IProute2, Kbd, Kmod, and Man-DB

Flit-Core

Wheel
pytest and testpath

Gawk

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, GMP, Grep, Make, MPFR, Patch,
Readline, Sed, and Texinfo
Bash, Glibc, and Mpfr
libsigsegv

GCC

Bash, Binutils, Coreutils, Diffutils, Findutils, Gawk, GCC, Gettext, Glibc, GMP, Grep,
M4, Make, MPC, MPFR, Patch, Perl, Sed, Tar, Texinfo, and Zstd
Bash, Binutils, Glibc, Mpc, and Python
DejaGNU, Expect, and Shadow
GDC, GNAT, and ISL
287

GDBM

Bash, Binutils, Coreutils, Diffutils, GCC, Grep, Make, and Sed
Bash, Glibc, and Readline

Gettext

Bash, Binutils, Coreutils, Gawk, GCC, Glibc, Grep, Make, Ncurses, Sed, and Texinfo
Acl, Bash, Gcc, and Glibc
Diffutils, Perl, and Tcl
Automake and Bison
libunistring and libxml2

Bash, Binutils, Bison, Coreutils, Diffutils, Gawk, GCC, Gettext, Grep, Gzip, Linux API
Headers, Make, Perl, Python, Sed, and Texinfo
File

GMP

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, M4, Make, Sed, and
GCC and Glibc
MPFR and GCC

Gperf

Bash, Binutils, Coreutils, GCC, Glibc, and Make
GCC and Glibc
Diffutils and Expect

Grep

Bash, Binutils, Coreutils, Diffutils, GCC, Gettext, Glibc, Grep, Make, Patch, Sed, and
Gawk
PCRE2 and libsigsegv
288

Groff

Bash, Binutils, Bison, Coreutils, Gawk, GCC, Glibc, Grep, Make, Patch, Sed, and
GCC, Glibc, and Perl
ghostscript and Uchardet

GRUB

Bash, Binutils, Bison, Coreutils, Diffutils, GCC, Gettext, Glibc, Grep, Make, Ncurses,
Sed, Texinfo, and Xz
Bash, GCC, Gettext, Glibc, Xz, and Sed.

Gzip

Bash, Binutils, Coreutils, GCC, Glibc, Grep, Make, Sed, and Texinfo
Bash and Glibc
Diffutils and Less

Iana-Etc

Inetutils

Bash, Binutils, Coreutils, GCC, Glibc, Grep, Make, Ncurses, Patch, Sed, Texinfo, and
GCC, Glibc, Ncurses, and Readline
Tar

Intltool

Bash, Gawk, Glibc, Make, Perl, Sed, and XML::Parser
Autoconf, Automake, Bash, Glibc, Grep, Perl, and Sed
289

IProute2

Bash, Bison, Coreutils, Flex, GCC, Glibc, Make, Libcap, Libelf, Linux API Headers,
Pkgconf, and Zlib
Bash, Coreutils, Glibc, Libcap, Libelf, and Zlib
Berkeley DB, iptables, libbpf, libmnl, and libtirpc

Jinja2

MarkupSafe, Python, Setuptools, and Wheel
MarkupSafe and Python

Kbd

Bash, Binutils, Bison, Check, Coreutils, Flex, GCC, Gettext, Glibc, Gzip, Make, Patch,
and Sed
Bash, Coreutils, and Glibc
Linux-PAM

Kmod

Bash, Binutils, Bison, Coreutils, Flex, GCC, Gettext, Glibc, Gzip, Make, OpenSSL,
Pkgconf, Sed, Xz, and Zlib
Glibc, Xz, and Zlib
scdoc (for man pages)

Less

Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, Grep, Make, Ncurses, and Sed
Gzip
PCRE2 or PCRE

Libcap

Attr, Bash, Binutils, Coreutils, GCC, Glibc, Perl, Make, and Sed
IProute2 and Shadow
Linux-PAM
290

Libelf

Bash, Binutils, Bzip2, Coreutils, GCC, Glibc, Make, Xz, Zlib, and Zstd
Bzip2, Glibc, Xz, Zlib, and Zstd
IProute2 and Linux

Libffi

Bash, Binutils, Coreutils, GCC, Glibc, Make, and Sed
DejaGnu

Libpipeline

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Sed, and Texinfo
Check and Pkgconf

Libtool

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Sed, and Texinfo
Autoconf, Automake, Bash, Binutils, Coreutils, File, GCC, Glibc, Grep, Make, and Sed
Autoconf, Automake, and Findutils

Libxcrypt

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Perl, and Sed
Perl, Python, Shadow, and Udev

Linux

Bash, Bc, Binutils, Coreutils, Diffutils, Findutils, GCC, Glibc, Grep, Gzip, Kmod, Libelf,
Make, Ncurses, OpenSSL, Perl, and Sed
cpio, LLVM (with Clang), and Rust-bindgen
291

Linux API Headers

Bash, Binutils, Coreutils, Findutils, GCC, Glibc, Grep, Gzip, Make, Perl, and Sed

Lz4

Bash, Binutils, Coreutils, GCC, Glibc, and Make
Zstd

M4

Bash, Binutils, Coreutils, GCC, Glibc, Grep, Make, Sed, and Texinfo
Bash and Glibc
Autoconf and Bison
libsigsegv

Make

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, Make, Sed, and Texinfo
Perl and Procps-ng
Guile

Bash, Binutils, Bzip2, Coreutils, Flex, GCC, GDBM, Gettext, Glibc, Grep, Groff, Gzip,
Less, Libpipeline, Make, Pkgconf, Sed, and Xz
Bash, GDBM, Groff, Glibc, Gzip, Less, Libpipeline, and Zlib
Util-linux
libseccomp and po4a

Man-Pages

Bash, Coreutils, Make, and Sed
292

MarkupSafe

Python, Setuptools, and Wheel
Jinja2

Meson

Ninja, Python, Setuptools, and Wheel

MPC

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, GMP, Make, MPFR, Sed,
and Texinfo
Glibc, GMP, and MPFR
GCC

MPFR

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, GMP, Make, Sed, and
Glibc and GMP
Gawk and GCC

Ncurses

Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Grep, Make, Patch, and Sed
Bash, GRUB, Inetutils, Less, Procps-ng, Psmisc, Readline, Texinfo, Util-linux, and Vim

Ninja

Binutils, Coreutils, GCC, and Python
GCC and Glibc
cmake
Meson
Asciidoc, Doxygen, Emacs, and re2c
293

OpenSSL

Binutils, Coreutils, GCC, Make, and Perl
Glibc and Perl
Coreutils, Kmod, Linux, and Udev

Patch

Attr, Bash, Binutils, Coreutils, GCC, Glibc, Grep, Make, and Sed
Attr and Glibc
Ed

Bash, Binutils, Coreutils, Gawk, GCC, GDBM, Glibc, Grep, Libxcrypt, Make, Sed, and
GDBM, Glibc, and Libxcrypt
Iana-Etc, Less, and Procps-ng
Autoconf
Berkeley DB

Pkgconf

Bash, Binutils, Coreutils, Gawk, GCC, Glibc, Grep, Make, and Sed
Binutils, E2fsprogs, IProute2, Kmod, Man-DB, Procps-ng, Python, Udev, and Util-linux

Procps-ng

Bash, Binutils, Coreutils, GCC, Glibc, Make, Ncurses, and Pkgconf
DejaGNU
elogind

Psmisc

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, Make, Ncurses, and Sed
294

Bash, Binutils, Coreutils, Expat, GCC, Gdbm, Gettext, Glibc, Grep, Libffi, Libxcrypt,
Make, Ncurses, OpenSSL, Pkgconf, Sed, and Util-linux
Bzip2, Expat, Gdbm, Glibc, Libffi, Libxcrypt, Ncurses, OpenSSL, and Zlib
GDB and Valgrind
Ninja
Berkeley DB, libnsl, SQLite, and Tk

Readline

Bash, Binutils, Coreutils, Gawk, GCC, Glibc, Grep, Make, Ncurses, Patch, Sed, and
Bash, Bc, and Gawk

Sed

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, Make, Sed, and Texinfo
Acl, Attr, and Glibc
Diffutils and Gawk
E2fsprogs, File, Libtool, and Shadow

Setuptools

Python and Wheel
Jinja2, MarkupSafe, and Meson

Shadow

Acl, Attr, Bash, Binutils, Coreutils, Diffutils, Findutils, Gawk, GCC, Gettext, Glibc,
Grep, Libcap, Libxcrypt, Make, and Sed
Glibc and Libxcrypt
CrackLib and Linux-PAM

Sysklogd

Binutils, Coreutils, GCC, Glibc, Make, and Patch
295

SysVinit

Binutils, Coreutils, GCC, Glibc, Make, and Sed

Tar

Acl, Attr, Bash, Binutils, Bison, Coreutils, GCC, Gettext, Glibc, Grep, Inetutils, Make,
Sed, and Texinfo
Acl, Attr, Bzip2, Glibc, Gzip, and Xz
Autoconf, Diffutils, Findutils, Gawk, and Gzip

Tcl

Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, Grep, Make, and Sed
Glibc and Zlib

Bash, Binutils, Coreutils, GCC, Gettext, Glibc, Grep, Make, Ncurses, Patch, and Sed

Acl, Bash, Binutils, Coreutils, Diffutils, Gawk, GCC, Glibc, Gperf, Grep, Jinja2, Libcap,
Libxcrypt, Meson, OpenSSL, Pkgconf, Sed, Util-linux, and Zstd
Acl, Glibc, Libcap, OpenSSL, and Util-linux
Util-linux

Util-linux

Bash, Binutils, Coreutils, Diffutils, File, Findutils, Gawk, GCC, Gettext, Glibc, Grep,
Make, Ncurses, Pkgconf, Sed, Udev, and Zlib
Glibc, Ncurses, Readline, Udev, and Zlib
Asciidoctor, Libcap-NG, libeconf, libuser, libutempter, Linux-PAM, smartmontools,
po4a, and slang
296

Vim

Acl, Attr, Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, Grep, Make, Ncurses, and Sed
Acl, Attr, Glibc, Python, Ncurses, and Tcl
Xorg, GTK+2, LessTif, Ruby, and GPM

Wheel

Python and Flit-core
Jinja2, MarkupSafe, Meson, and Setuptools

XML::Parser

Bash, Binutils, Coreutils, Expat, GCC, Glibc, Make, and Perl
Expat, Glibc, and Perl
Intltool

Xz

Bash, Binutils, Coreutils, Diffutils, GCC, Glibc, and Make
File, GRUB, Kmod, Libelf, Man-DB, and Udev

Bash, Binutils, Coreutils, GCC, Glibc, Make, and Sed
File, Kmod, Libelf, Perl, and Util-linux

Zstd

Binutils, Coreutils, GCC, Glibc, Gzip, Lz4, Make, Xz, and Zlib
Binutils, GCC, Libelf, and Udev
297

Appendix D. Boot and sysconfig scripts
version-20240825
The scripts in this appendix are listed by the directory where they normally reside. The order is /etc/rc.d/init.d, /etc/
sysconfig, /etc/sysconfig/network-devices, and /etc/sysconfig/network-devices/services. Within each section,
the files are listed in the order they are normally called.

D.1. /etc/rc.d/init.d/rc
The rc script is the first script called by init and initiates the boot process.
: DJ Lucas - dj@linuxfromscratch.org
: Pierre Labastie - pierre@linuxfromscratch.org
: Updates March 24th, 2022: new semantics of S/K files
- Instead of testing that S scripts were K scripts in the
previous runlevel, test that they were not S scripts
- Instead of testing that K scripts were S scripts in the
previous runlevel, test that they were not K scripts
- S scripts in runlevel 0 or 6 are now run with
"script start" (was "script stop" previously).
print_error_msg()
log_failure_msg
MSG="FAILURE:\n\nYou should not be reading this error message.\n\n"
MSG="${MSG}It means that an unforeseen error took place in\n"
MSG="${MSG}${i},\n"
MSG="${MSG}which exited with a return value of ${error_value}.\n"
MSG="${MSG}If you're able to track this error down to a bug in one of\n"
MSG="${MSG}the files provided by the ${DISTRO_MINI} book,\n"
MSG="${MSG}please be so kind to inform us at ${DISTRO_CONTACT}.\n"
log_failure_msg "${MSG}"
check_script_status()
if [ ! -f ${i} ]; then
log_warning_msg "${i} is not a valid symlink."
SCRIPT_STAT="1"

298

if [ ! -x ${i} ]; then
log_warning_msg "${i} is not executable, skipping."
SCRIPT_STAT="1"
run()
if [ -z $interactive ]; then
${1} ${2}
return $?
read -p "Run ${1} ${2} (Yes/no/continue)? " -n 1 runit
case ${runit} in
c | C)
interactive=""
${i} ${2}
ret=${?}
break;
n | N)
y | Y)
${i} ${2}
ret=${?}
return $ret
[ -r /etc/sysconfig/rc.site ] && source /etc/sysconfig/rc.site
DISTRO=${DISTRO:-"Linux From Scratch"}
DISTRO_CONTACT=${DISTRO_CONTACT:-"lfs-dev@lists.linuxfromscratch.org (Registration required)"}
DISTRO_MINI=${DISTRO_MINI:-"LFS"}
IPROMPT=${IPROMPT:-"no"}
trap "" INT QUIT TSTP
[ "${1}" != "" ] && runlevel=${1}
if [ "${runlevel}" == "" ]; then
echo "Usage: ${0} <runlevel>" >&2
previous=${PREVLEVEL}
[ "${previous}" == "" ] && previous=N

299

if [ ! -d /etc/rc.d/rc${runlevel}.d ]; then
log_info_msg "/etc/rc.d/rc${runlevel}.d does not exist.\n"
if [ "$runlevel" == "6" -o "$runlevel" == "0" ]; then IPROMPT="no"; fi
if [ "$runlevel" == "S" ]; then
[ -r /etc/sysconfig/console ] && source /etc/sysconfig/console
dmesg -n "${LOGLEVEL:-7}"
if [ "${IPROMPT}" == "yes" -a "${runlevel}" == "S" ]; then
wlen=${wlen:-$(echo "Welcome to ${DISTRO}" | wc -c )}
welcome_message=${welcome_message:-"Welcome to ${INFO}${DISTRO}${NORMAL}"}
ilen=${ilen:-$(echo "Press 'I' to enter interactive startup" | wc -c )}
i_message=${i_message:-"Press '${FAILURE}I${NORMAL}' to enter interactive startup"}

wcol=$(( ( ${COLUMNS} - ${wlen} ) / 2 ))
icol=$(( ( ${COLUMNS} - ${ilen} ) / 2 ))
itime=${itime:-"3"}
echo -e "\n\n"
echo -e "\\033[${wcol}G${welcome_message}"
echo -e "\\033[${icol}G${i_message}${NORMAL}"
echo ""
read -t "${itime}" -n 1 interactive 2>&1 > /dev/null
[ "${interactive}" == "I" ] && interactive="i"
[ "${interactive}" != "i" ] && interactive=""
[ -r /run/interactive ] && source /run/interactive
if [ "${previous}" != "N" ]; then
for i in $(ls -v /etc/rc.d/rc${runlevel}.d/K* 2> /dev/null)
check_script_status
if [ "${SCRIPT_STAT}" == "1" ]; then
SCRIPT_STAT="0"
suffix=${i#/etc/rc.d/rc${runlevel}.d/K[0-9][0-9]}
[ -e /etc/rc.d/rc${previous}.d/K[0-9][0-9]$suffix ] && continue
run ${i} stop
if [ "${error_value}" != "0" ]; then print_error_msg; fi

300

if [ "${previous}" == "N" ]; then export IN_BOOT=1; fi
if [ "$runlevel" == "6" -a -n "${FASTBOOT}" ]; then
touch /fastboot

for i in $( ls -v /etc/rc.d/rc${runlevel}.d/S* 2> /dev/null)
if [ "${previous}" != "N" ]; then
suffix=${i#/etc/rc.d/rc${runlevel}.d/S[0-9][0-9]}
[ -e /etc/rc.d/rc${previous}.d/S[0-9][0-9]$suffix ] && continue
check_script_status
if [ "${SCRIPT_STAT}" == "1" ]; then
SCRIPT_STAT="0"
run ${i} start
if [ "${error_value}" != "0" ]; then print_error_msg; fi
if [ "${runlevel}" == "S" -a "${interactive}" == "i" ]; then
echo "interactive=\"i\"" > /run/interactive
rm -f /run/interactive 2> /dev/null
if [ "${previous}" == "N" -a "${runlevel}" != "S" ]; then
cat $BOOTLOG >> /var/log/boot.log
echo "--------" >> /var/log/boot.log
rm -f $BOOTLOG 2> /dev/null

D.2. /lib/lsb/init-functions

301

: DJ Lucas - dj@linuxfromscratch.org
: With code based on Matthias Benkmann's simpleinit-msb
http://winterdrache.de/linux/newboot/index.html
The file should be located in /lib/lsb
## Environmental setup
umask 022
export PATH="/bin:/usr/bin:/sbin:/usr/sbin"
## Set color commands, used via echo
NORMAL="\\033[0;39m"
SUCCESS="\\033[1;32m"
WARNING="\\033[1;33m"
FAILURE="\\033[1;31m"
INFO="\\033[1;36m"
BRACKET="\\033[1;34m"

BMPREFIX="
"
SUCCESS_PREFIX="${SUCCESS} * ${NORMAL} "
FAILURE_PREFIX="${FAILURE}*****${NORMAL} "
WARNING_PREFIX="${WARNING} *** ${NORMAL} "
SKIP_PREFIX="${INFO} S
${NORMAL}"
SUCCESS_SUFFIX="${BRACKET}[${SUCCESS} OK ${BRACKET}]${NORMAL}"
FAILURE_SUFFIX="${BRACKET}[${FAILURE} FAIL ${BRACKET}]${NORMAL}"
WARNING_SUFFIX="${BRACKET}[${WARNING} WARN ${BRACKET}]${NORMAL}"
SKIP_SUFFIX="${BRACKET}[${INFO} SKIP ${BRACKET}]${NORMAL}"
BOOTLOG=/run/bootlog
KILLDELAY=3
SCRIPT_STAT="0"
[ -r /etc/sysconfig/rc.site ] && . /etc/sysconfig/rc.site
[ ! -t 1 -o ! -t 2 ] && HEADLESS=${HEADLESS:-yes}
## Screen Dimensions

302

if [ -z "${COLUMNS}" ]; then
COLUMNS=$(stty size)
COLUMNS=${COLUMNS##* }
COLUMNS=80
if [ "${COLUMNS}" = "0" ]; then
COLUMNS=80
## Measurements for positioning result messages
COL=$((${COLUMNS} - 8))
WCOL=$((${COL} - 2))
## Set Cursor Position Commands, used via echo
SET_COL="\\033[${COL}G"
SET_WCOL="\\033[${WCOL}G"
CURS_UP="\\033[1A\\033[0G"
CURS_ZERO="\\033[0G"
-n nicelevel: specify a nice level. See 'man nice(1)'.
-p pidfile: use the specified file to determine PIDs.
pathname: the complete path to the specified program
args: additional arguments passed to the program (pathname)
0 - program is running or service is OK
1 - generic or unspecified error
2 - invalid or excessive argument(s)
5 - program is not installed
start_daemon()
local force=""
local nice="0"
local pidfile=""
local pidlist=""
local retval=""
while true
-f)
force="1"
shift 1
-n)
nice="${2}"

303

-*)
return 2
program="${1}"
if [ ! -e "${program}" ]; then return 5; fi
if [ -z "${force}" ]; then
pidlist=`pidofproc "${1}"`
pidlist=`pidofproc -p "${pidfile}" "${1}"`
case "${retval}" in
0)
1)
rm -f "${pidfile}"
3)

304

nice -n "${nice}" "${@}"
pathname, pathname to the specified program
signal, send this signal to pathname
0 - program (pathname) has stopped/is already stopped or a
running program has been sent specified signal and stopped
successfully
1 - generic or unspecified error
2 - invalid or excessive argument(s)
5 - program is not installed
7 - program is not running and a signal was supplied
killproc()
local pidfile
local program
local prefix
local progname
local signal="-TERM"
local fallback="-KILL"
local nosig
local pidlist
local retval
local pid
local delay="30"
local piddead
local dtime
program="${1}"
if [ -n "${2}" ]; then
signal="${2}"
fallback=""
nosig=1
if [ -n "${3}" ]; then
return 2

305

if [ ! -e "${program}" ]; then return 5; fi
check_signal "${signal}"
if [ "${?}" -ne "0" ]; then return 2; fi
pidlist=`pidofproc "${1}"`
pidlist=`pidofproc -p "${pidfile}" "${1}"`
case "${retval}" in
0)
1)
progname=${program##*/}
if [[ -e "/run/${progname}.pid" ]]; then
pidfile="/run/${progname}.pid"
rm -f "${pidfile}"
if [ -n "${nosig}" ]; then
return 7
3)
if [ -n "${nosig}" ]; then
return 7

306

check_sig_type "${signal}"
if [ "${?}" -eq "0" ]; then # Signal is used to terminate the program
if [ "${pidlist}" != "" ]; then
for pid in ${pidlist}; do
kill -0 "${pid}" 2> /dev/null
if [ "${?}" -ne "0" ]; then
kill "${signal}" "${pid}" 2> /dev/null
while [ "${delay}" -ne "0" ]; do
kill -0 "${pid}" 2> /dev/null || piddead="1"
if [ "${piddead}" = "1" ]; then break; fi
sleep 0.1
delay="$(( ${delay} - 1 ))"
if [ -n "${fallback}" -a "${piddead}" != "1" ]; then
kill "${fallback}" "${pid}" 2> /dev/null
kill -0 "${pid}" 2> /dev/null && return 1
prefix=`echo "${program}" | sed 's/[^/]*$//'`
progname=`echo "${program}" | sed "s@${prefix}@@"`
if [ -e "/run/${progname}.pid" ]; then
rm -f "/run/${progname}.pid" 2> /dev/null
if [ -e "${pidfile}" ]; then rm -f "${pidfile}" 2> /dev/null; fi

307

else # check_sig_type - signal is not used to terminate program
for pid in ${pidlist}; do
kill "${signal}" "${pid}"
if [ "${?}" -ne "0" ]; then return 1; fi
pathname, path to the specified program
0 - Success (PIDs to stdout)
1 - Program is dead, PID file still exists (remaining PIDs output)
3 - Program is not running (no output)
pidofproc()
local pidfile
local program
local prefix
local progname
local pidlist
local lpids
local exitstatus="0"
program="${1}"
if [ -n "${2}" ]; then
return 4
prefix=`echo "${program}" | sed 's/[^/]*$//'`
if [ -z "${prefix}" ]; then
progname="${program}"

308

progname=`echo "${program}" | sed "s@${prefix}@@"`
if [ -e "/run/${progname}.pid" ]; then
pidfile="/run/${progname}.pid"
if [ -n "${pidfile}" -a -e "${pidfile}" ]; then
pidlist=`/bin/head -n1 "${pidfile}"`
pidlist=`pidof "${program}"`
for pid in ${pidlist}; do
kill -0 ${pid} 2> /dev/null
if [ "${?}" -eq "0" ]; then
lpids="${lpids}${pid} "
exitstatus="1"
if [ -z "${lpids}" -a ! -f "${pidfile}" ]; then
return 3
echo "${lpids}"
return "${exitstatus}"
pathname, path to the specified program
0 - Status printed
1 - Input error. The daemon to check was not specified.
statusproc()
local pidfile
local pidlist
if [ "${#}" = "0" ]; then
echo "Usage: statusproc [-p pidfle] {program}"

309

if [ -n "${2}" ]; then
echo "Too many arguments"
if [ -n "${pidfile}" ]; then
pidlist=`pidofproc -p "${pidfile}" $@`
pidlist=`pidofproc $@`
pidlist=`echo "${pidlist}" | sed -r 's/ +$//'`
base="${1##*/}"
if [ -n "${pidlist}" ]; then
/bin/echo -e "${INFO}${base} is running with Process" \
"ID(s) ${pidlist}.${NORMAL}"
if [ -n "${base}" -a -e "/run/${base}.pid" ]; then
/bin/echo -e "${WARNING}${1} is not running but" \
"/run/${base}.pid exists.${NORMAL}"
if [ -n "${pidfile}" -a -e "${pidfile}" ]; then
/bin/echo -e "${WARNING}${1} is not running" \
"but ${pidfile} exists.${NORMAL}"
/bin/echo -e "${INFO}${1} is not running.${NORMAL}"
a boot log file. Sets the STAMP variable.
timespec()
STAMP="$(echo `date +"%b %d %T %:z"` `hostname`) "

310

a boot log file.
log_success_msg()
/bin/echo -e "${CURS_ZERO}${SUCCESS_PREFIX}${SET_COL}${SUCCESS_SUFFIX}"
/bin/echo -e "${logmessage} OK"
/bin/echo -e "${STAMP} ${logmessage} OK" >> ${BOOTLOG}
log_success_msg2()
/bin/echo -e "${CURS_ZERO}${SUCCESS_PREFIX}${SET_COL}${SUCCESS_SUFFIX}"
echo " OK"
echo " OK" >> ${BOOTLOG}
a boot log file.
log_failure_msg()
/bin/echo -e "${CURS_ZERO}${FAILURE_PREFIX}${SET_COL}${FAILURE_SUFFIX}"
/bin/echo -e "${logmessage} FAIL"

311

/bin/echo -e "${STAMP} ${logmessage} FAIL" >> ${BOOTLOG}
log_failure_msg2()
/bin/echo -e "${CURS_ZERO}${FAILURE_PREFIX}${SET_COL}${FAILURE_SUFFIX}"
echo "FAIL"
echo "FAIL" >> ${BOOTLOG}
a boot log file.
log_warning_msg()
/bin/echo -e "${CURS_ZERO}${WARNING_PREFIX}${SET_COL}${WARNING_SUFFIX}"
/bin/echo -e "${logmessage} WARN"
/bin/echo -e "${STAMP} ${logmessage} WARN" >> ${BOOTLOG}
log_skip_msg()
/bin/echo -e "${CURS_ZERO}${SKIP_PREFIX}${SET_COL}${SKIP_SUFFIX}"
/bin/echo "SKIP"

312

/bin/echo "SKIP" >> ${BOOTLOG}
a boot log file. Does not print a trailing newline character.
log_info_msg()
/bin/echo -n -e "${logmessage}"
/bin/echo -n -e "${STAMP} ${logmessage}" >> ${BOOTLOG}
log_info_msg2()
/bin/echo -n -e "${@}"
/bin/echo -n -e "${logmessage}"
/bin/echo -n -e "${logmessage}" >> ${BOOTLOG}
evaluate_retval()

313

local error_value="${?}"
if [ ${error_value} = 0 ]; then
log_failure_msg2
however, it is required to check the signals to determine if the
signals chosen are invalid arguments to the other functions.
0 - Success (signal is valid
1 - Signal is not valid
check_signal()
local valsig
valsig=" -ALRM -HUP -INT -KILL -PIPE -POLL -PROF -TERM -USR1 -USR2"
valsig="${valsig} -VTALRM -STKFLT -PWR -WINCH -CHLD -URG -TSTP -TTIN"
valsig="${valsig} -TTOU -STOP -CONT -ABRT -FPE -ILL -QUIT -SEGV -TRAP"
valsig="${valsig} -SYS -EMT -BUS -XCPU -XFSZ -0 -1 -2 -3 -4 -5 -6 -8 -9"
valsig="${valsig} -11 -13 -14 -15 "
echo "${valsig}" | grep -- " ${1} " > /dev/null
if [ "${?}" -eq "0" ]; then
This is not defined by any LSB draft, however, it is required to
check the signals to determine if they are intended to end a
program or simply to control it.
0 - Signal is used for program termination
1 - Signal is used for program control
check_sig_type()
local valsig

314

valsig=" -ALRM -INT -KILL -TERM -PWR -STOP -ABRT -QUIT -2 -3 -6 -9 -14 -15 "
echo "${valsig}" | grep -- " ${1} " > /dev/null
if [ "${?}" -eq "0" ]; then
wait_for_user()
[ "${HEADLESS=0}" = "0" ] && read ENTER
is_true()
[ "$1" = "1" ] || [ "$1" = "yes" ] || [ "$1" = "true" ] || [ "$1" = "y" ] ||
[ "$1" = "t" ]

D.3. /etc/rc.d/init.d/mountvirtfs
Xi Ruoyao - xry111@xry111.site
: LFS 12.0

$first

315

Mounts various special fs needed at start
Mounts /sys and /proc virtual (kernel) filesystems.
Mounts /run (tmpfs) and /dev (devtmpfs).
This is done only if they are not already mounted.
with the kernel config proposed in the book, dev
should be automatically mounted by the kernel.

if ! mountpoint /run >/dev/null; then
mount /run || failed=1
mkdir -p
/run/lock
chmod 1777 /run/lock
log_info_msg "Mounting virtual file systems: ${INFO}/run"
if ! mountpoint /proc >/dev/null; then
log_info_msg2 " ${INFO}/proc"
mount -o nosuid,noexec,nodev /proc || failed=1
if ! mountpoint /sys >/dev/null; then
log_info_msg2 " ${INFO}/sys"
mount -o nosuid,noexec,nodev /sys || failed=1
if ! mountpoint /dev >/dev/null; then
log_info_msg2 " ${INFO}/dev"
mount -o mode=0755,nosuid /dev || failed=1
mkdir -p /dev/shm
log_info_msg2 " ${INFO}/dev/shm"
mount -o nosuid,nodev /dev/shm || failed=1
mkdir -p /sys/fs/cgroup
log_info_msg2 " ${INFO}/sys/fs/cgroup"
mount -o nosuid,noexec,nodev /sys/fs/cgroup || failed=1
(exit ${failed})
if [ "${failed}" = 1 ]; then
log_info_msg "Create symlinks in /dev targeting /proc: ${INFO}/dev/stdin"
ln -sf /proc/self/fd/0 /dev/stdin || failed=1
log_info_msg2 " ${INFO}/dev/stdout"
ln -sf /proc/self/fd/1 /dev/stdout || failed=1
log_info_msg2 " ${INFO}/dev/stderr"
ln -sf /proc/self/fd/2 /dev/stderr || failed=1
log_info_msg2 " ${INFO}/dev/fd"

316

ln -sfn /proc/self/fd

/dev/fd

|| failed=1

if [ -e /proc/kcore ]; then
log_info_msg2 " ${INFO}/dev/core"
ln -sf /proc/kcore /dev/core
|| failed=1
(exit ${failed})

D.4. /etc/rc.d/init.d/modules
: Zack Winkles

Loads required modules.
Loads modules listed in /etc/sysconfig/modules.

[ -e /proc/modules ] || exit 0
[ -r /etc/sysconfig/modules ]
|| exit 0
grep -E -qv '^($|#)' /etc/sysconfig/modules || exit 0
log_info_msg "Loading modules:"

317

while read module args; do
case "$module" in
""|"#"*) continue ;;
modprobe ${module} ${args} >/dev/null
if [ $? -eq 0 ]; then
log_info_msg2 " ${module}"
failedmod="${failedmod} ${module}"
done < /etc/sysconfig/modules
if [ -n "${failedmod}" ]; then
log_failure_msg "Failed to load modules:${failedmod}"

D.5. /etc/rc.d/init.d/udev
: Zack Winkles, Alexander E. Patrakov
Xi Ruoyao - xry111@xry111.site
: LFS 12.0

udev $time

318

Populates /dev with device nodes.
Mounts a tempfs on /dev and starts the udevd daemon.
Device nodes are created as defined by udev.

log_info_msg "Populating /dev with device nodes... "
if ! grep -q '[[:space:]]sysfs' /proc/mounts; then
log_failure_msg2
msg="FAILURE:\n\nUnable to create "
msg="${msg}devices without a SysFS filesystem\n\n"
msg="${msg}After you press Enter, this system "
msg="${msg}will be halted and powered off.\n\n"
log_info_msg "$msg"
/etc/rc.d/init.d/halt start
SYSTEMD_LOG_TARGET=kmsg /sbin/udevd --daemon
/bin/udevadm trigger --action=add
--type=subsystems
/bin/udevadm trigger --action=add
--type=devices
/bin/udevadm trigger --action=change --type=devices
if ! is_true "$OMIT_UDEV_SETTLE"; then
/bin/udevadm settle
if [ -x /sbin/vgchange ]; then /sbin/vgchange -a y >/dev/null; fi
echo "Usage ${0} {start}"

319

D.6. /etc/rc.d/init.d/swap

udev
Activates and deactivates swap partitions.
Activates and deactivates swap partitions defined in
/etc/fstab.

log_info_msg "Activating all swap files/partitions..."
swapon -a
log_info_msg "Deactivating all swap files/partitions..."
swapoff -a
log_success_msg "Retrieving swap status."
swapon -s
echo "Usage: ${0} {start|stop|restart|status}"

320

D.7. /etc/rc.d/init.d/setclock

$syslog
Stores and restores time from the hardware clock
On boot, system time is obtained from hwclock. The
hardware clock can also be set on shutdown.

[ -r /etc/sysconfig/clock ] && . /etc/sysconfig/clock

case "${UTC}" in
yes|true|1)
CLOCKPARAMS="${CLOCKPARAMS} --utc"
no|false|0)
CLOCKPARAMS="${CLOCKPARAMS} --localtime"
case ${1} in
hwclock --hctosys ${CLOCKPARAMS} >/dev/null
log_info_msg "Setting hardware clock..."
hwclock --systohc ${CLOCKPARAMS} >/dev/null

321

echo "Usage: ${0} {start|stop}"

D.8. /etc/rc.d/init.d/checkfs
A. Luebke - luebke@users.sourceforge.net
- No errors
- File system errors corrected
- System should be rebooted
- File system errors left uncorrected
- Operational error
- Usage or syntax error
- Fsck canceled by user request
#########################################################################

checkfs
udev swap

Checks local filesystems before mounting.
Checks local filesystems before mounting.

if [ -f /fastboot ]; then
msg="/fastboot found, will omit "
msg="${msg} file system checks as requested.\n"
log_info_msg "${msg}"
log_info_msg "Mounting root file system in read-only mode... "

322

mount -n -o remount,ro / >/dev/null
if [ ${?} != 0 ]; then
log_failure_msg2
msg="\n\nCannot check root "
msg="${msg}filesystem because it could not be mounted "
msg="${msg}in read-only mode.\n\n"
msg="${msg}After you press Enter, this system will be "
msg="${msg}halted and powered off.\n\n"
log_failure_msg "${msg}"
/etc/rc.d/init.d/halt start
if [ -f /forcefsck ]; then
msg="/forcefsck found, forcing file"
msg="${msg} system checks as requested."
log_success_msg "$msg"
options="-f"
options=""
log_info_msg "Checking file systems..."
if is_true "$VERBOSE_FSCK"; then
fsck ${options} -a -A -C -T
fsck ${options} -a -A -C -T >/dev/null
if [ "${error_value}" = 0 ]; then
if [ "${error_value}" = 1 ]; then
msg="\nWARNING:\n\nFile system errors "
msg="${msg}were found and have been corrected.\n"
msg="${msg}
You may want to double-check that "
msg="${msg}everything was fixed properly."
log_warning_msg "$msg"
if [ "${error_value}" = 2 -o "${error_value}" = 3 ]; then
msg="\nWARNING:\n\nFile system errors "
msg="${msg}were found and have been "
msg="${msg}corrected, but the nature of the "
msg="${msg}errors require this system to be rebooted.\n\n"
msg="${msg}After you press enter, "
msg="${msg}this system will be rebooted\n\n"
log_failure_msg "$msg"
reboot -f

323

if [ "${error_value}" -gt 3 -a "${error_value}" -lt 16 ]; then
msg="\nFAILURE:\n\nFile system errors "
msg="${msg}were encountered that could not be "
msg="${msg}fixed automatically.\nThis system "
msg="${msg}cannot continue to boot and will "
msg="${msg}therefore be halted until those "
msg="${msg}errors are fixed manually by a "
msg="${msg}System Administrator.\n\n"
msg="${msg}After you press Enter, this system will be "
msg="${msg}halted and powered off.\n\n"
log_failure_msg "$msg"
/etc/rc.d/init.d/halt start
if [ "${error_value}" -ge 16 ]; then
msg="FAILURE:\n\nUnexpected failure "
msg="${msg}running fsck. Exited with error "
msg="${msg} code: ${error_value}.\n"
log_info_msg $msg
exit ${error_value}

D.9. /etc/rc.d/init.d/mountfs

udev checkfs
Mounts/unmounts local filesystems defined in /etc/fstab.
Remounts root filesystem read/write and mounts all
remaining local filesystems defined in /etc/fstab on

324

start. Remounts root filesystem read-only and unmounts
remaining filesystems on stop.

log_info_msg "Remounting root file system in read-write mode..."
mount --options remount,rw / >/dev/null
rm -f /fastboot /forcefsck
mkdir -p /dev/pts
log_info_msg "Mounting remaining file systems..."
failed=0
mount --all --test-opts no_netdev >/dev/null || failed=1
log_info_msg "Unmounting all other currently mounted file systems..."
losetup -D
umount --all --detach-loop --read-only \
--types notmpfs,nosysfs,nodevtmpfs,noproc,nodevpts >/dev/null
mount --options remount,ro /
#if [ -x /sbin/vgchange ]; then /sbin/vgchange -an > /dev/null; fi
if [ -r /etc/mdadm.conf ]; then
log_info_msg "Mark arrays as clean..."
mdadm --wait-clean --scan
echo "Usage: ${0} {start|stop}"

D.10. /etc/rc.d/init.d/udev_retry

325

: Alexander E. Patrakov
Bryan Kadzban #

udev_retry
udev
$local_fs cleanfs

Replays failed uevents and creates additional devices.
Replays any failed uevents that were skipped due to
slow hardware initialization, and creates those needed
device nodes

log_info_msg "Retrying failed uevents, if any..."
rundir=/run/udev
for file in ${rundir}/tmp-rules--*; do
dest=${file##*tmp-rules--}
[ "$dest" = '*' ] && break
cat $file >> /etc/udev/rules.d/$dest
rm -f $file
/bin/sed -e 's/#.*$//' /etc/sysconfig/udev_retry | /bin/grep -v '^$' | \
while read line ; do
for subsystem in $line ; do
/bin/udevadm trigger --subsystem-match=$subsystem --action=add
if ! is_true "$OMIT_UDEV_RETRY_SETTLE"; then
/bin/udevadm settle

326

echo "Usage ${0} {start}"

D.11. /etc/rc.d/init.d/cleanfs

cleanfs

Cleans temporary directories early in the boot process.
Cleans temporary directories /run, /var/lock, and
optionally, /tmp. cleanfs also creates /run/utmp
and any files defined in /etc/sysconfig/createfiles.

create_files()
exec 9>&0 < /etc/sysconfig/createfiles
while read name type perm usr grp dtype maj min junk
case "${name}" in
""|\#*) continue ;;
if [ ! -e "${name}" ]; then
case "${type}" in
dir)
mkdir "${name}"

327

file)
:> "${name}"
dev)
case "${dtype}" in
char)
mknod "${name}" c ${maj} ${min}
block)
mknod "${name}" b ${maj} ${min}
pipe)
mknod "${name}" p
log_warning_msg "\nUnknown device type: ${dtype}"
log_warning_msg "\nUnknown type: ${type}"
chown ${usr}:${grp} "${name}"
chmod ${perm} "${name}"
exec 0>&9 9>&return 0
log_info_msg "Cleaning file systems:"
if [ "${SKIPTMPCLEAN}" = "" ]; then
log_info_msg2 " /tmp"
cd /tmp &&
find . -xdev -mindepth 1 ! -name lost+found -delete || failed=1
> /run/utmp
if grep -q '^utmp:' /etc/group ; then
chmod 664 /run/utmp
chgrp utmp /run/utmp
(exit ${failed})
if grep -E -qv '^(#|$)' /etc/sysconfig/createfiles 2>/dev/null; then
log_info_msg "Creating files and directories... "
create_files

328

D.12. /etc/rc.d/init.d/console
Alexander E. Patrakov

console
udev_retry

Sets up a localised console.
Sets up fonts and language settings for the user's
local as defined by /etc/sysconfig/console.

[ -r /etc/sysconfig/console ] && . /etc/sysconfig/console
failed=0
if [ -z "${KEYMAP}"
] && [ -z "${KEYMAP_CORRECTIONS}" ] &&
[ -z "${FONT}"
] && [ -z "${LEGACY_CHARSET}"
] &&
! is_true "${UNICODE}"; then
log_info_msg "Setting up Linux console..."
[ -d /sys/class/graphics/fbcon ] && use_fb=1 || use_fb=0

329

is_true "${UNICODE}" &&
MODE_COMMAND="echo -en '\033%G' && kbd_mode -u" ||
MODE_COMMAND="echo -en '\033%@\033(K' && kbd_mode -a"
! is_true "${use_fb}" || [ -z "${FONT}" ] ||
MODE_COMMAND="${MODE_COMMAND} && setfont ${FONT}"
for TTY in `grep '^[^#].*respawn:/sbin/agetty' /etc/inittab |
grep -o '\btty[[:digit:]]*\b'`
openvt -f -w -c ${TTY#tty} -- \
/bin/sh -c "${MODE_COMMAND}" || failed=1
[ "${use_fb}" == "1" ] || [ -z "${FONT}" ] || setfont $FONT || failed=1
[ -z "${KEYMAP}" ] ||
loadkeys ${KEYMAP} >/dev/null 2>&1 ||
failed=1
[ -z "${KEYMAP_CORRECTIONS}" ] ||
loadkeys ${KEYMAP_CORRECTIONS} >/dev/null 2>&1 ||
failed=1
[ -z "$LEGACY_CHARSET" ] ||
dumpkeys -c "$LEGACY_CHARSET" | loadkeys -u >/dev/null 2>&1 ||
failed=1
( exit $failed )
echo "Usage:

${0} {start}"

D.13. /etc/rc.d/init.d/localnet

330

Starts the local network.
Sets the hostname of the machine and starts the
loopback interface.

[ -r /etc/sysconfig/network ] && . /etc/sysconfig/network
[ -r /etc/hostname ] && HOSTNAME=`cat /etc/hostname`
log_info_msg "Bringing up the loopback interface..."
ip addr add 127.0.0.1/8 label lo dev lo
ip link set lo up
log_info_msg "Setting hostname to ${HOSTNAME}..."
hostname ${HOSTNAME}
log_info_msg "Bringing down the loopback interface..."
ip link set lo down
echo "Hostname is: $(hostname)"
ip link show lo
echo "Usage: ${0} {start|stop|restart|status}"

331

D.14. /etc/rc.d/init.d/sysctl
parameters
: Nathan Coulson (nathan@linuxfromscratch.org)
Matthew Burgress (matthew@linuxfromscratch.org)

sysctl
console

Makes changes to the proc filesystem
Makes changes to the proc filesystem as defined in
/etc/sysctl.conf. See 'man sysctl(8)'.

if [ -f "/etc/sysctl.conf" ]; then
log_info_msg "Setting kernel runtime parameters..."
sysctl -q -p
sysctl -a
echo "Usage: ${0} {start|status}"

332

D.15. /etc/rc.d/init.d/sysklogd
: Bruce Dubbs - bdubbs@linuxfromscratch.org LFS12.1
Remove kernel log daemon. The functionality has been
merged with syslogd.

$syslog
$first localnet
sendsignals
2 3 4 5
0 1 6
Starts system log daemon.
Starts system log daemon.
/etc/fstab.

log_info_msg "Starting system log daemon..."
parms=${SYSKLOGD_PARMS-'-m 0'}
start_daemon /sbin/syslogd $parms
log_info_msg "Stopping system log daemon..."
killproc /sbin/syslogd
reload)
log_info_msg "Reloading system log daemon config file..."
pid=`pidofproc syslogd`
kill -HUP "${pid}"

333

statusproc /sbin/syslogd
echo "Usage: ${0} {start|stop|reload|restart|status}"

D.16. /etc/rc.d/init.d/network
Nathan Coulson - nathan@linuxfromscratch.org

$network
$local_fs localnet swap
$syslog firewalld iptables nftables
$local_fs localnet swap
$syslog firewalld iptables nftables
2 3 4 5
0 1 6
Starts and configures network interfaces.
Starts and configures network interfaces.

if ip route | grep -q "^default"; then return 0; fi
for file in /etc/sysconfig/ifconfig.*
interface=${file##*/ifconfig.}
if [ "${interface}" = "*" ]; then continue; fi
/sbin/ifup ${interface}

334

umount --all --force --types nfs,cifs,nfs4
net_files=""
for file in /etc/sysconfig/ifconfig.*
net_files="${file} ${net_files}"
for file in ${net_files}
interface=${file##*/ifconfig.}
if [ "${interface}" = "*" ]; then continue; fi
if [ ! -e /sys/class/net/$interface ]; then continue; fi
ip link show $interface 2>/dev/null | grep -q "state UP"
if [ $? -ne 0 ]; then continue; fi
/sbin/ifdown ${interface}
echo "Usage: ${0} {start|stop|restart}"

D.17. /etc/rc.d/init.d/sendsignals

335

sendsignals

$local_fs swap localnet

Attempts to kill remaining processes.
Attempts to kill remaining processes.

omit=$(pidof mdmon)
[ -n "$omit" ] && omit="-o $omit"
log_info_msg "Sending all processes the TERM signal..."
killall5 -15 $omit
sleep ${KILLDELAY}
if [ "${error_value}" = 0 -o "${error_value}" = 2 ]; then
log_success_msg
log_failure_msg
log_info_msg "Sending all processes the KILL signal..."
killall5 -9 $omit
sleep ${KILLDELAY}
if [ "${error_value}" = 0 -o "${error_value}" = 2 ]; then
log_success_msg
log_failure_msg
echo "Usage: ${0} {stop}"

D.18. /etc/rc.d/init.d/reboot

336

: Pierre Labastie - pierre@linuxfromscratch.org
: Update March 24th, 2022: change "stop" to "start".
Add the $last facility to Required-start

reboot
$last

6
Reboots the system.
Reboots the System.

log_info_msg "Restarting system..."
reboot -d -f -i

D.19. /etc/rc.d/init.d/halt
: Pierre Labastie - pierre@linuxfromscratch.org
: Update March 24th, 2022: change "stop" to "start".
Add the $last facility to Required-start

337

halt
$last

Halts the system.
Halts the System.

halt -d -f -i -p
echo "Usage: {start}"

D.20. /etc/rc.d/init.d/template
: LFS x.x

template

log_info_msg "Starting..."

338

start_daemon fully_qualified_path
if ! pidofproc daemon_name_as_reported_by_ps >/dev/null; then
command_to_start_the_service
log_info_msg "Stopping..."
killproc fully_qualified_path
if pidofproc daemon_name_as_reported_by_ps >/dev/null; then
command_to_stop_the_service
echo "Usage: ${0} {start|stop|restart}"

D.21. /etc/sysconfig/modules
: 00.00
: The syntax of this file is as follows:
<module> [<arg1> <arg2> ...]

D.22. /etc/sysconfig/createfiles

339

: 00.00
: The syntax of this file is as follows:
if type is equal to "file" or "dir"
<filename> <type> <permissions> <user> <group>
if type is equal to "dev"
<filename> <type> <permissions> <user> <group> <devtype>
<major> <minor>
<filename> is the name of the file which is to be created
<type> is either file, dir, or dev.
file creates a new file
dir creates a new directory
dev creates a new device
<devtype> is either block, char or pipe
block creates a block device
char creates a character device
pipe creates a pipe, this will ignore the <major> and
<minor> fields
<major> and <minor> are the major and minor numbers used for
the device.

D.23. /etc/sysconfig/udev-retry
: 00.00
: Each subsystem that may need to be re-triggered after mountfs
runs should be listed in this file. Probable subsystems to be
listed here are rtc (due to /var/lib/hwclock/adjtime) and sound
(due to both /var/lib/alsa/asound.state and /usr/sbin/alsactl).
Entries are whitespace-separated.
rtc

D.24. /sbin/ifup

340

: Nathan Coulson - nathan@linuxfromscratch.org
: LFS 7.7
: The IFCONFIG variable is passed to the SERVICE script
in the /lib/services directory, to indicate what file the
service should source to get interface specifications.
up()
log_info_msg "Bringing up the ${1} interface..."
if ip link show $1 > /dev/null 2>&1; then
link_status=`ip link show $1`
if [ -n "${link_status}" ]; then
if ! echo "${link_status}" | grep -q UP; then
ip link set $1 up
log_failure_msg "Interface ${IFACE} doesn't exist."
RELEASE="7.7"
USAGE="Usage: $0 [ -hV ] [--help] [--version] interface"
VERSTR="LFS ifup, version ${RELEASE}"
while [ $# -gt 0 ]; do
case "$1" in
--help | -h)
help="y"; break ;;
--version | -V)

echo "${VERSTR}"; exit 0 ;;

-*)

echo "ifup: ${1}: invalid option" >&2
echo "${USAGE}" >& 2
exit 2 ;;

break ;;

if [ -n "$help" ]; then
echo "${VERSTR}"
echo "${USAGE}"
cat << HERE_EOF
ifup is used to bring up a network interface. The interface
parameter, e.g. eth0 or eth0:2, must match the trailing part of the
interface specifications file, e.g. /etc/sysconfig/ifconfig.eth0:2.
HERE_EOF

341

file=/etc/sysconfig/ifconfig.${1}
[ "${file}" = "${file%""~""}" ] || exit 0
if [ ! -r "${file}" ]; then
log_failure_msg "Unable to bring up ${1} interface! ${file} is missing or cannot be accessed."
.

$file

if [ "$IFACE" = "" ]; then
log_failure_msg "Unable to bring up ${1} interface! ${file} does not define an interface [IFACE]."
if [ "${IN_BOOT}" = "1" -a "${ONBOOT}" != "yes" ]; then
if [ "$VIRTINT" != "yes" ]; then
up ${IFACE}
for S in ${SERVICE}; do
if [ ! -x "/lib/services/${S}" ]; then
MSG="\nUnable to process ${file}. Either "
MSG="${MSG}the SERVICE '${S} was not present "
MSG="${MSG}or cannot be executed."
log_failure_msg "$MSG"
#if [ "${SERVICE}" = "wpa" ]; then log_success_msg; fi
for S in ${SERVICE}; do
IFCONFIG=${file} /lib/services/${S} ${IFACE} up
if [ "${VIRTINT}" == "yes" ]; then
up ${IFACE}
for I in $INTERFACE_COMPONENTS; do up $I; done
if test -n "${MTU}"; then
if [[ ${MTU} =~ ^[0-9]+$ ]] && [[ $MTU -ge 68 ]] ; then
for I in $IFACE $INTERFACE_COMPONENTS; do
ip link set dev $I mtu $MTU;

342

log_info_msg2 "Invalid MTU $MTU"
if [ -n "${GATEWAY}" ]; then
if ip route | grep -q default; then
log_warning_msg "Gateway already setup; skipping."
log_info_msg "Adding default gateway ${GATEWAY} to the ${IFACE} interface..."
ip route add default via ${GATEWAY} dev ${IFACE}

D.25. /sbin/ifdown
: Nathan Coulson - nathan@linuxfromscratch.org
: the IFCONFIG variable is passed to the scripts found
in the /lib/services directory, to indicate what file the
service should source to get interface specifications.
RELEASE="7.0"
USAGE="Usage: $0 [ -hV ] [--help] [--version] interface"
VERSTR="LFS ifdown, version ${RELEASE}"
while [ $# -gt 0 ]; do
case "$1" in
--help | -h)
help="y"; break ;;
--version | -V)

echo "${VERSTR}"; exit 0 ;;

-*)

echo "ifup: ${1}: invalid option" >&2
echo "${USAGE}" >& 2
exit 2 ;;

break ;;

if [ -n "$help" ]; then
echo "${VERSTR}"
echo "${USAGE}"

343

cat << HERE_EOF
ifdown is used to bring down a network interface. The interface
parameter, e.g. eth0 or eth0:2, must match the trailing part of the
interface specifications file, e.g. /etc/sysconfig/ifconfig.eth0:2.
HERE_EOF
file=/etc/sysconfig/ifconfig.${1}
[ "${file}" = "${file%""~""}" ] || exit 0
if [ ! -r "${file}" ]; then
log_warning_msg "${file} is missing or cannot be accessed."
. ${file}
if [ "$IFACE" = "" ]; then
log_failure_msg "${file} does not define an interface [IFACE]."
S=`echo ${SERVICE} | cut -f1 -d" "`
if ip link show ${IFACE} > /dev/null 2>&1; then
if [ -n "${S}" -a -x "/lib/services/${S}" ]; then
IFCONFIG=${file} /lib/services/${S} ${IFACE} down
MSG="Unable to process ${file}. Either "
MSG="${MSG}the SERVICE variable was not set "
MSG="${MSG}or the specified service cannot be executed."
log_failure_msg "$MSG"
log_warning_msg "Interface ${1} doesn't exist."
link_status=`ip link show ${IFACE} 2>/dev/null`
if [ -n "${link_status}" ]; then
if [ "$(echo "${link_status}" | grep UP)" != "" ]; then
if [ "$(ip addr show ${IFACE} | grep 'inet ')" == "" ]; then
log_info_msg "Bringing down the ${IFACE} interface..."
ip link set ${IFACE} down

344

D.26. /lib/services/ipv4-static
: Nathan Coulson - nathan@linuxfromscratch.org
. ${IFCONFIG}
if [ -z "${IP}" ]; then
log_failure_msg "\nIP variable missing from ${IFCONFIG}, cannot continue."
if [ -z "${PREFIX}" -a -z "${PEER}" ]; then
log_warning_msg "\nPREFIX variable missing from ${IFCONFIG}, assuming 24."
PREFIX=24
args="${args} ${IP}/${PREFIX}"
elif [ -n "${PREFIX}" -a -n "${PEER}" ]; then
log_failure_msg "\nPREFIX and PEER both specified in ${IFCONFIG}, cannot continue."
elif [ -n "${PREFIX}" ]; then
args="${args} ${IP}/${PREFIX}"
elif [ -n "${PEER}" ]; then
args="${args} ${IP} peer ${PEER}"
if [ -n "${LABEL}" ]; then
args="${args} label ${LABEL}"
if [ -n "${BROADCAST}" ]; then
args="${args} broadcast ${BROADCAST}"
case "${2}" in
up)
if [ "$(ip addr show ${1} 2>/dev/null | grep ${IP}/)" = "" ]; then
log_info_msg "Adding IPv4 address ${IP} to the ${1} interface..."
ip addr add ${args} dev ${1}
log_warning_msg "Cannot add IPv4 address ${IP} to ${1}. Already present."
down)
if [ "$(ip addr show ${1} 2>/dev/null | grep ${IP}/)" != "" ]; then
log_info_msg "Removing IPv4 address ${IP} from the ${1} interface..."

345

ip addr del ${args} dev ${1}
if [ -n "${GATEWAY}" ]; then
if [ "$(ip addr show ${1} 2>/dev/null | grep 'inet ')" != "" ]; then
log_info_msg "Removing default gateway..."
ip route del default
echo "Usage: ${0} [interface] {up|down}"

D.27. /lib/services/ipv4-static-route
: Kevin P. Fleming - kpfleming@linuxfromscratch.org
. ${IFCONFIG}
case "${TYPE}" in
("" | "network")
need_ip=1
need_gateway=1
("default")
need_gateway=1
args="${args} default"
desc="default"
("host")
need_ip=1
("unreachable")
need_ip=1
args="${args} unreachable"
desc="unreachable "

346

(*)
log_failure_msg "Unknown route type (${TYPE}) in ${IFCONFIG}, cannot continue."
if [ -n "${GATEWAY}" ]; then
MSG="The GATEWAY variable cannot be set in ${IFCONFIG} for static routes.\n"
log_failure_msg "$MSG Use STATIC_GATEWAY only, cannot continue"
if [ -n "${need_ip}" ]; then
if [ -z "${IP}" ]; then
log_failure_msg "IP variable missing from ${IFCONFIG}, cannot continue."
if [ -z "${PREFIX}" ]; then
log_failure_msg "PREFIX variable missing from ${IFCONFIG}, cannot continue."
args="${args} ${IP}/${PREFIX}"
desc="${desc}${IP}/${PREFIX}"
if [ -n "${need_gateway}" ]; then
if [ -z "${STATIC_GATEWAY}" ]; then
log_failure_msg "STATIC_GATEWAY variable missing from ${IFCONFIG}, cannot continue."
args="${args} via ${STATIC_GATEWAY}"
if [ -n "${SOURCE}" ]; then
args="${args} src ${SOURCE}"
case "${2}" in
up)
log_info_msg "Adding '${desc}' route to the ${1} interface..."
ip route add ${args} dev ${1}
down)
log_info_msg "Removing '${desc}' route from the ${1} interface..."
ip route del ${args} dev ${1}
echo "Usage: ${0} [interface] {up|down}"

347

Appendix E. Udev configuration rules
The rules in this appendix are listed for convenience. Installation is normally done via instructions in Section 8.76,
“Udev from Systemd-256.4.”

E.1. 55-lfs.rules
SUBSYSTEM=="rtc", ACTION=="add", MODE="0644", RUN+="/etc/rc.d/init.d/setclock start"
KERNEL=="rtc", ACTION=="add", MODE="0644", RUN+="/etc/rc.d/init.d/setclock start"

348

Appendix F. LFS Licenses
This book is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.0 License.
Computer instructions may be extracted from the book under the MIT License.

F.1. Creative Commons License
Creative Commons Legal Code
Attribution-NonCommercial-ShareAlike 2.0

CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL
SERVICES. DISTRIBUTION OF THIS LICENSE DOES NOT CREATE AN ATTORNEY-CLIENT
RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS INFORMATION ON AN "AS-IS" BASIS.
CREATIVE COMMONS MAKES NO WARRANTIES REGARDING THE INFORMATION PROVIDED,
AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM ITS USE.
License
THE WORK (AS DEFINED BELOW) IS PROVIDED UNDER THE TERMS OF THIS CREATIVE COMMONS
PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY COPYRIGHT AND/OR OTHER
APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS AUTHORIZED UNDER THIS LICENSE OR
COPYRIGHT LAW IS PROHIBITED.
BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE TO BE
BOUND BY THE TERMS OF THIS LICENSE. THE LICENSOR GRANTS YOU THE RIGHTS CONTAINED
HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND CONDITIONS.
1. Definitions
a. "Collective Work" means a work, such as a periodical issue, anthology or encyclopedia, in which the Work in its
entirety in unmodified form, along with a number of other contributions, constituting separate and independent
works in themselves, are assembled into a collective whole. A work that constitutes a Collective Work will not
be considered a Derivative Work (as defined below) for the purposes of this License.
b. "Derivative Work" means a work based upon the Work or upon the Work and other pre-existing works, such as
a translation, musical arrangement, dramatization, fictionalization, motion picture version, sound recording, art
reproduction, abridgment, condensation, or any other form in which the Work may be recast, transformed, or
adapted, except that a work that constitutes a Collective Work will not be considered a Derivative Work for the
purpose of this License. For the avoidance of doubt, where the Work is a musical composition or sound recording,
the synchronization of the Work in timed-relation with a moving image ("synching") will be considered a
Derivative Work for the purpose of this License.
c. "Licensor" means the individual or entity that offers the Work under the terms of this License.
d. "Original Author" means the individual or entity who created the Work.
e. "Work" means the copyrightable work of authorship offered under the terms of this License.
f. "You" means an individual or entity exercising rights under this License who has not previously violated the
terms of this License with respect to the Work, or who has received express permission from the Licensor to
exercise rights under this License despite a previous violation.
349

g. "License Elements" means the following high-level license attributes as selected by Licensor and indicated in
the title of this License: Attribution, Noncommercial, ShareAlike.
2. Fair Use Rights. Nothing in this license is intended to reduce, limit, or restrict any rights arising from fair use, first
sale or other limitations on the exclusive rights of the copyright owner under copyright law or other applicable laws.
3. License Grant. Subject to the terms and conditions of this License, Licensor hereby grants You a worldwide, royaltyfree, non-exclusive, perpetual (for the duration of the applicable copyright) license to exercise the rights in the
Work as stated below:
a. to reproduce the Work, to incorporate the Work into one or more Collective Works, and to reproduce the Work
as incorporated in the Collective Works;
b. to create and reproduce Derivative Works;
c. to distribute copies or phonorecords of, display publicly, perform publicly, and perform publicly by means of a
digital audio transmission the Work including as incorporated in Collective Works;
d. to distribute copies or phonorecords of, display publicly, perform publicly, and perform publicly by means of
a digital audio transmission Derivative Works;
The above rights may be exercised in all media and formats whether now known or hereafter devised. The above
rights include the right to make such modifications as are technically necessary to exercise the rights in other media
and formats. All rights not expressly granted by Licensor are hereby reserved, including but not limited to the rights
set forth in Sections 4(e) and 4(f).
4. Restrictions.The license granted in Section 3 above is expressly made subject to and limited by the following
restrictions:
a. You may distribute, publicly display, publicly perform, or publicly digitally perform the Work only under the
terms of this License, and You must include a copy of, or the Uniform Resource Identifier for, this License with
every copy or phonorecord of the Work You distribute, publicly display, publicly perform, or publicly digitally
perform. You may not offer or impose any terms on the Work that alter or restrict the terms of this License
or the recipients' exercise of the rights granted hereunder. You may not sublicense the Work. You must keep
intact all notices that refer to this License and to the disclaimer of warranties. You may not distribute, publicly
display, publicly perform, or publicly digitally perform the Work with any technological measures that control
access or use of the Work in a manner inconsistent with the terms of this License Agreement. The above applies
to the Work as incorporated in a Collective Work, but this does not require the Collective Work apart from
the Work itself to be made subject to the terms of this License. If You create a Collective Work, upon notice
from any Licensor You must, to the extent practicable, remove from the Collective Work any reference to such
Licensor or the Original Author, as requested. If You create a Derivative Work, upon notice from any Licensor
You must, to the extent practicable, remove from the Derivative Work any reference to such Licensor or the
Original Author, as requested.
b. You may distribute, publicly display, publicly perform, or publicly digitally perform a Derivative Work only
under the terms of this License, a later version of this License with the same License Elements as this License, or a
Creative Commons iCommons license that contains the same License Elements as this License (e.g. AttributionNonCommercial-ShareAlike 2.0 Japan). You must include a copy of, or the Uniform Resource Identifier for, this
License or other license specified in the previous sentence with every copy or phonorecord of each Derivative
Work You distribute, publicly display, publicly perform, or publicly digitally perform. You may not offer or
impose any terms on the Derivative Works that alter or restrict the terms of this License or the recipients'
exercise of the rights granted hereunder, and You must keep intact all notices that refer to this License and to
the disclaimer of warranties. You may not distribute, publicly display, publicly perform, or publicly digitally
perform the Derivative Work with any technological measures that control access or use of the Work in a manner

350

inconsistent with the terms of this License Agreement. The above applies to the Derivative Work as incorporated
in a Collective Work, but this does not require the Collective Work apart from the Derivative Work itself to be
made subject to the terms of this License.
c. You may not exercise any of the rights granted to You in Section 3 above in any manner that is primarily intended
for or directed toward commercial advantage or private monetary compensation. The exchange of the Work for
other copyrighted works by means of digital file-sharing or otherwise shall not be considered to be intended for
or directed toward commercial advantage or private monetary compensation, provided there is no payment of
any monetary compensation in connection with the exchange of copyrighted works.
d. If you distribute, publicly display, publicly perform, or publicly digitally perform the Work or any Derivative
Works or Collective Works, You must keep intact all copyright notices for the Work and give the Original Author
credit reasonable to the medium or means You are utilizing by conveying the name (or pseudonym if applicable)
of the Original Author if supplied; the title of the Work if supplied; to the extent reasonably practicable, the
Uniform Resource Identifier, if any, that Licensor specifies to be associated with the Work, unless such URI
does not refer to the copyright notice or licensing information for the Work; and in the case of a Derivative
Work, a credit identifying the use of the Work in the Derivative Work (e.g., "French translation of the Work by
Original Author," or "Screenplay based on original Work by Original Author"). Such credit may be implemented
in any reasonable manner; provided, however, that in the case of a Derivative Work or Collective Work, at a
minimum such credit will appear where any other comparable authorship credit appears and in a manner at least
as prominent as such other comparable authorship credit.
e. For the avoidance of doubt, where the Work is a musical composition:
i. Performance Royalties Under Blanket Licenses. Licensor reserves the exclusive right to collect, whether
individually or via a performance rights society (e.g. ASCAP, BMI, SESAC), royalties for the public
performance or public digital performance (e.g. webcast) of the Work if that performance is primarily intended
for or directed toward commercial advantage or private monetary compensation.
ii. Mechanical Rights and Statutory Royalties. Licensor reserves the exclusive right to collect, whether
individually or via a music rights agency or designated agent (e.g. Harry Fox Agency), royalties for any
phonorecord You create from the Work ("cover version") and distribute, subject to the compulsory license
created by 17 USC Section 115 of the US Copyright Act (or the equivalent in other jurisdictions), if Your
distribution of such cover version is primarily intended for or directed toward commercial advantage or private
monetary compensation. 6. Webcasting Rights and Statutory Royalties. For the avoidance of doubt, where
the Work is a sound recording, Licensor reserves the exclusive right to collect, whether individually or via a
performance-rights society (e.g. SoundExchange), royalties for the public digital performance (e.g. webcast)
of the Work, subject to the compulsory license created by 17 USC Section 114 of the US Copyright Act (or
the equivalent in other jurisdictions), if Your public digital performance is primarily intended for or directed
toward commercial advantage or private monetary compensation.
f. Webcasting Rights and Statutory Royalties. For the avoidance of doubt, where the Work is a sound recording,
Licensor reserves the exclusive right to collect, whether individually or via a performance-rights society
(e.g. SoundExchange), royalties for the public digital performance (e.g. webcast) of the Work, subject to the
compulsory license created by 17 USC Section 114 of the US Copyright Act (or the equivalent in other
jurisdictions), if Your public digital performance is primarily intended for or directed toward commercial
advantage or private monetary compensation.
5. Representations, Warranties and Disclaimer

351

UNLESS OTHERWISE MUTUALLY AGREED TO BY THE PARTIES IN WRITING, LICENSOR
OFFERS THE WORK AS-IS AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY
KIND CONCERNING THE WORK, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING,
WITHOUT LIMITATION, WARRANTIES OF TITLE, MERCHANTIBILITY, FITNESS FOR A PARTICULAR
PURPOSE, NONINFRINGEMENT, OR THE ABSENCE OF LATENT OR OTHER DEFECTS, ACCURACY,
OR THE PRESENCE OF ABSENCE OF ERRORS, WHETHER OR NOT DISCOVERABLE. SOME
JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO SUCH EXCLUSION
MAY NOT APPLY TO YOU.
6. Limitation on Liability. EXCEPT TO THE EXTENT REQUIRED BY APPLICABLE LAW, IN NO EVENT
WILL LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY FOR ANY SPECIAL, INCIDENTAL,
CONSEQUENTIAL, PUNITIVE OR EXEMPLARY DAMAGES ARISING OUT OF THIS LICENSE OR THE
USE OF THE WORK, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
DAMAGES.
7. Termination
a. This License and the rights granted hereunder will terminate automatically upon any breach by You of the terms
of this License. Individuals or entities who have received Derivative Works or Collective Works from You under
this License, however, will not have their licenses terminated provided such individuals or entities remain in full
compliance with those licenses. Sections 1, 2, 5, 6, 7, and 8 will survive any termination of this License.
b. Subject to the above terms and conditions, the license granted here is perpetual (for the duration of the applicable
copyright in the Work). Notwithstanding the above, Licensor reserves the right to release the Work under
different license terms or to stop distributing the Work at any time; provided, however that any such election
will not serve to withdraw this License (or any other license that has been, or is required to be, granted under the
terms of this License), and this License will continue in full force and effect unless terminated as stated above.
8. Miscellaneous
a. Each time You distribute or publicly digitally perform the Work or a Collective Work, the Licensor offers to the
recipient a license to the Work on the same terms and conditions as the license granted to You under this License.
b. Each time You distribute or publicly digitally perform a Derivative Work, Licensor offers to the recipient a
license to the original Work on the same terms and conditions as the license granted to You under this License.
c. If any provision of this License is invalid or unenforceable under applicable law, it shall not affect the validity
or enforceability of the remainder of the terms of this License, and without further action by the parties to this
agreement, such provision shall be reformed to the minimum extent necessary to make such provision valid and
enforceable.
d. No term or provision of this License shall be deemed waived and no breach consented to unless such waiver or
consent shall be in writing and signed by the party to be charged with such waiver or consent.
e. This License constitutes the entire agreement between the parties with respect to the Work licensed here. There
are no understandings, agreements or representations with respect to the Work not specified here. Licensor shall
not be bound by any additional provisions that may appear in any communication from You. This License may
not be modified without the mutual written agreement of the Licensor and You.

352

Creative Commons is not a party to this License, and makes no warranty whatsoever in connection with
the Work. Creative Commons will not be liable to You or any party on any legal theory for any damages
whatsoever, including without limitation any general, special, incidental or consequential damages arising
in connection to this license. Notwithstanding the foregoing two (2) sentences, if Creative Commons has
expressly identified itself as the Licensor hereunder, it shall have all rights and obligations of Licensor.
Except for the limited purpose of indicating to the public that the Work is licensed under the CCPL, neither
party will use the trademark "Creative Commons" or any related trademark or logo of Creative Commons
without the prior written consent of Creative Commons. Any permitted use will be in compliance with
Creative Commons' then-current trademark usage guidelines, as may be published on its website or otherwise
made available upon request from time to time.
Creative Commons may be contacted at http://creativecommons.org/.

F.2. The MIT License
Copyright © 1999-2024 Gerard Beekmans
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

353

tools: 65
Findutils: 194
tools: 66
Findutils: 194
tools: 66
Flex: 120
Flit-core: 181
Gawk: 193
tools: 67
Gawk: 193
tools: 67
GDBM: 160
Gettext: 153
tools: 84
Gettext: 153
tools: 84
Glibc: 100
tools: 53
Glibc: 100
tools: 53
GMP: 130
Gperf: 161
Grep: 156
tools: 68
Grep: 156
tools: 68
Groff: 195
GRUB: 198
Gzip: 200
tools: 69
Gzip: 200

Index
Packages
Acl: 135
Attr: 134
Autoconf: 171
Automake: 172
Bash: 157
tools: 62
Bash: 157
tools: 62
Bc: 119
Binutils: 127
tools, pass 1: 47
tools, pass 2: 75
Binutils: 127
tools, pass 1: 47
tools, pass 2: 75
Binutils: 127
tools, pass 1: 47
tools, pass 2: 75
Bison: 155
tools: 85
Bison: 155
tools: 85
Bootscripts: 238
usage: 248
Bootscripts: 238
usage: 248
Bzip2: 109
Check: 191
Coreutils: 186
tools: 63
Coreutils: 186
tools: 63
DejaGNU: 125
Diffutils: 192
tools: 64
Diffutils: 192
tools: 64
E2fsprogs: 229
Expat: 162
Expect: 123
File: 115
tools: 65
File: 115
354

tools: 69
Iana-Etc: 99
Inetutils: 163
Intltool: 170
IPRoute2: 201
Jinja2: 215
Kbd: 203
Kmod: 175
Less: 165
Libcap: 136
Libelf: 177
libffi: 178
Libpipeline: 205
Libtool: 159
Libxcrypt: 137
Linux: 263
tools, API headers: 52
Linux: 263
tools, API headers: 52
Lz4: 113
M4: 118
tools: 59
M4: 118
tools: 59
Make: 206
tools: 70
Make: 206
tools: 70
Man-DB: 219
Man-pages: 98
MarkupSafe: 214
Meson: 185
MPC: 133
MPFR: 132
Ncurses: 148
tools: 60
Ncurses: 148
tools: 60
Ninja: 184
OpenSSL: 173
Patch: 207
tools: 71
Patch: 207
tools: 71
Perl: 166
tools: 86
Perl: 166

tools: 86
Pkgconf: 126
Procps-ng: 222
Psmisc: 152
Python: 179
temporary: 87
Python: 179
temporary: 87
rc.site: 254
Readline: 116
Sed: 151
tools: 72
Sed: 151
tools: 72
Setuptools: 183
Shadow: 139
configuring: 140
Shadow: 139
configuring: 140
Sysklogd: 232
configuring: 232
Sysklogd: 232
configuring: 232
SysVinit: 233
configuring: 249
SysVinit: 233
configuring: 249
Tar: 208
tools: 73
Tar: 208
tools: 73
Tcl: 121
Texinfo: 209
temporary: 88
Texinfo: 209
temporary: 88
Udev: 216
configuring: 217
usage: 240
Udev: 216
configuring: 217
usage: 240
Udev: 216
configuring: 217
usage: 240
Util-linux: 224
tools: 89
355

Util-linux: 224
tools: 89
Vim: 211
wheel: 182
XML::Parser: 169
Xz: 111
tools: 74
Xz: 111
tools: 74
Zlib: 108
zstd: 114

blkdiscard: 224, 225
blkid: 224, 225
blkzone: 224, 225
blockdev: 224, 225
bomtool: 126, 126
bootlogd: 233, 233
bridge: 201, 201
bunzip2: 109, 110
bzcat: 109, 110
bzcmp: 109, 110
bzdiff: 109, 110
bzegrep: 109, 110
bzfgrep: 109, 110
bzgrep: 109, 110
bzip2: 109, 110
bzip2recover: 109, 110
bzless: 109, 110
bzmore: 109, 110
c++: 143, 147
c++filt: 127, 128
cal: 224, 225
capsh: 136, 136
captoinfo: 148, 149
cat: 186, 187
catman: 219, 221
cc: 143, 147
cfdisk: 224, 225
chacl: 135, 135
chage: 139, 141
chattr: 229, 230
chcon: 186, 187
chcpu: 224, 225
checkmk: 191, 191
chem: 195, 195
chfn: 139, 141
chgpasswd: 139, 141
chgrp: 186, 187
chmem: 224, 225
chmod: 186, 187
choom: 224, 225
chown: 186, 188
chpasswd: 139, 141
chroot: 186, 188
chrt: 224, 225
chsh: 139, 141
chvt: 203, 204
cksum: 186, 188

Programs
[: 186, 187
2to3: 179
accessdb: 219, 220
aclocal: 172, 172
aclocal-1.17: 172, 172
addftinfo: 195, 195
addpart: 224, 225
addr2line: 127, 128
afmtodit: 195, 195
agetty: 224, 225
apropos: 219, 221
ar: 127, 128
as: 127, 128
attr: 134, 134
autoconf: 171, 171
autoheader: 171, 171
autom4te: 171, 171
automake: 172, 172
automake-1.17: 172, 172
autopoint: 153, 153
autoreconf: 171, 171
autoscan: 171, 171
autoupdate: 171, 171
awk: 193, 193
b2sum: 186, 187
badblocks: 229, 230
base64: 186, 187, 186, 187
base64: 186, 187, 186, 187
basename: 186, 187
basenc: 186, 187
bash: 157, 158
bashbug: 157, 158
bc: 119, 119
bison: 155, 155
356

clear: 148, 149
cmp: 192, 192
col: 224, 225
colcrt: 224, 225
colrm: 224, 225
column: 224, 225
comm: 186, 188
compile_et: 229, 230
corelist: 166, 167
cp: 186, 188
cpan: 166, 167
cpp: 143, 147
csplit: 186, 188
ctrlaltdel: 224, 225
ctstat: 201, 201
cut: 186, 188
c_rehash: 173, 174
date: 186, 188
dc: 119, 119
dd: 186, 188
deallocvt: 203, 204
debugfs: 229, 230
dejagnu: 125, 125
delpart: 224, 225
depmod: 175, 175
df: 186, 188
diff: 192, 192
diff3: 192, 192
dir: 186, 188
dircolors: 186, 188
dirname: 186, 188
dmesg: 224, 226
dnsdomainname: 163, 164
du: 186, 188
dumpe2fs: 229, 230
dumpkeys: 203, 204
e2freefrag: 229, 230
e2fsck: 229, 230
e2image: 229, 230
e2label: 229, 230
e2mmpstatus: 229, 230
e2scrub: 229, 230
e2scrub_all: 229, 230
e2undo: 229, 230
e4crypt: 229, 230
e4defrag: 229, 230
echo: 186, 188

egrep: 156, 156
eject: 224, 226
elfedit: 127, 128
enc2xs: 166, 167
encguess: 166, 167
env: 186, 188
envsubst: 153, 153
eqn: 195, 195
eqn2graph: 195, 195
ex: 211, 213
expand: 186, 188
expect: 123, 124
expiry: 139, 141
expr: 186, 188
factor: 186, 188
faillog: 139, 141
fallocate: 224, 226
false: 186, 188
fdisk: 224, 226
fgconsole: 203, 204
fgrep: 156, 156
file: 115, 115
filefrag: 229, 230
fincore: 224, 226
find: 194, 194
findfs: 224, 226
findmnt: 224, 226
flex: 120, 120
flex++: 120, 120
flock: 224, 226
fmt: 186, 188
fold: 186, 188
free: 222, 222
fsck: 224, 226
fsck.cramfs: 224, 226
fsck.ext2: 229, 230
fsck.ext3: 229, 230
fsck.ext4: 229, 230
fsck.minix: 224, 226
fsfreeze: 224, 226
fstab-decode: 233, 233
fstrim: 224, 226
ftp: 163, 164
fuser: 152, 152
g++: 143, 147
gawk: 193, 193
gawk-5.3.0: 193, 193
357

gcc: 143, 147
gc-ar: 143, 147
gc-nm: 143, 147
gc-ranlib: 143, 147
gcov: 143, 147
gcov-dump: 143, 147
gcov-tool: 143, 147
gdbmtool: 160, 160
gdbm_dump: 160, 160
gdbm_load: 160, 160
gdiffmk: 195, 195
gencat: 100, 106
genl: 201, 201
getcap: 136, 136
getconf: 100, 106
getent: 100, 106
getfacl: 135, 135
getfattr: 134, 134
getkeycodes: 203, 204
getopt: 224, 226
getpcaps: 136, 136
getsubids: 139, 141
gettext: 153, 153
gettext.sh: 153, 153
gettextize: 153, 153
glilypond: 195, 195
gpasswd: 139, 142
gperf: 161, 161
gperl: 195, 195
gpinyin: 195, 195
gprof: 127, 128
gprofng: 127, 128
grap2graph: 195, 196
grep: 156, 156
grn: 195, 196
grodvi: 195, 196
groff: 195, 196
groffer: 195, 196
grog: 195, 196
grolbp: 195, 196
grolj4: 195, 196
gropdf: 195, 196
grops: 195, 196
grotty: 195, 196
groupadd: 139, 142
groupdel: 139, 142
groupmems: 139, 142

groupmod: 139, 142
groups: 186, 188
grpck: 139, 142
grpconv: 139, 142
grpunconv: 139, 142
grub-bios-setup: 198, 199
grub-editenv: 198, 199
grub-file: 198, 199
grub-fstest: 198, 199
grub-glue-efi: 198, 199
grub-install: 198, 199
grub-kbdcomp: 198, 199
grub-macbless: 198, 199
grub-menulst2cfg: 198, 199
grub-mkconfig: 198, 199
grub-mkimage: 198, 199
grub-mklayout: 198, 199
grub-mknetdir: 198, 199
grub-mkpasswd-pbkdf2: 198, 199
grub-mkrelpath: 198, 199
grub-mkrescue: 198, 199
grub-mkstandalone: 198, 199
grub-ofpathname: 198, 199
grub-probe: 198, 199
grub-reboot: 198, 199
grub-render-label: 198, 199
grub-script-check: 198, 199
grub-set-default: 198, 199
grub-setup: 198, 199
grub-syslinux2cfg: 198, 199
gunzip: 200, 200
gzexe: 200, 200
gzip: 200, 200
h2ph: 166, 167
h2xs: 166, 167
halt: 233, 233
hardlink: 224, 226
head: 186, 188
hexdump: 224, 226
hostid: 186, 188
hostname: 163, 164
hpftodit: 195, 196
hwclock: 224, 226
i386: 224, 226
iconv: 100, 106
iconvconfig: 100, 106
id: 186, 188
358

idle3: 179
ifconfig: 163, 164
ifnames: 171, 171
ifstat: 201, 201
indxbib: 195, 196
info: 209, 209
infocmp: 148, 149
infotocap: 148, 149
init: 233, 233
insmod: 175, 176
install: 186, 188
install-info: 209, 210
instmodsh: 166, 167
intltool-extract: 170, 170
intltool-merge: 170, 170
intltool-prepare: 170, 170
intltool-update: 170, 170
intltoolize: 170, 170
ionice: 224, 226
ip: 201, 201
ipcmk: 224, 226
ipcrm: 224, 226
ipcs: 224, 226
irqtop: 224, 226
isosize: 224, 226
join: 186, 188
json_pp: 166, 167
kbdinfo: 203, 204
kbdrate: 203, 204
kbd_mode: 203, 204
kill: 224, 226
killall: 152, 152
killall5: 233, 233
kmod: 175, 176
last: 224, 226
lastb: 224, 226
ld: 127, 128
ld.bfd: 127, 128
ld.gold: 127, 128
ldattach: 224, 226
ldconfig: 100, 106
ldd: 100, 106
lddlibc4: 100, 106
less: 165, 165
lessecho: 165, 165
lesskey: 165, 165
lex: 120, 120

lexgrog: 219, 221
lfskernel-6.10.5: 263, 268
libasan: 143, 147
libatomic: 143, 147
libcc1: 143, 147
libnetcfg: 166, 167
libtool: 159, 159
libtoolize: 159, 159
link: 186, 188
linux32: 224, 226
linux64: 224, 226
lkbib: 195, 196
ln: 186, 188
lnstat: 201, 202
loadkeys: 203, 204
loadunimap: 203, 204
locale: 100, 106
localedef: 100, 106
locate: 194, 194
logger: 224, 226
login: 139, 142
logname: 186, 188
logoutd: 139, 142
logsave: 229, 231
look: 224, 226
lookbib: 195, 196
losetup: 224, 226
ls: 186, 188
lsattr: 229, 231
lsblk: 224, 226
lscpu: 224, 227
lsfd: 224, 227
lsipc: 224, 227
lsirq: 224, 227
lslocks: 224, 227
lslogins: 224, 227
lsmem: 224, 227
lsmod: 175, 176
lsns: 224, 227
lto-dump: 143, 147
lz4: 113, 113
lz4c: 113, 113
lz4cat: 113, 113
lzcat: 111, 111
lzcmp: 111, 111
lzdiff: 111, 111
lzegrep: 111, 111
359

lzfgrep: 111, 111
lzgrep: 111, 111
lzless: 111, 111
lzma: 111, 111
lzmadec: 111, 111
lzmainfo: 111, 111
lzmore: 111, 112
m4: 118, 118
make: 206, 206
makedb: 100, 106
makeinfo: 209, 210
man: 219, 221
man-recode: 219, 221
mandb: 219, 221
manpath: 219, 221
mapscrn: 203, 204
mcookie: 224, 227
md5sum: 186, 188
mesg: 224, 227
meson: 185, 185
mkdir: 186, 189
mke2fs: 229, 231
mkfifo: 186, 189
mkfs: 224, 227
mkfs.bfs: 224, 227
mkfs.cramfs: 224, 227
mkfs.ext2: 229, 231
mkfs.ext3: 229, 231
mkfs.ext4: 229, 231
mkfs.minix: 224, 227
mklost+found: 229, 231
mknod: 186, 189
mkswap: 224, 227
mktemp: 186, 189
mk_cmds: 229, 231
mmroff: 195, 196
modinfo: 175, 176
modprobe: 175, 176
more: 224, 227
mount: 224, 227
mountpoint: 224, 227
msgattrib: 153, 153
msgcat: 153, 153
msgcmp: 153, 153
msgcomm: 153, 154
msgconv: 153, 154
msgen: 153, 154

msgexec: 153, 154
msgfilter: 153, 154
msgfmt: 153, 154
msggrep: 153, 154
msginit: 153, 154
msgmerge: 153, 154
msgunfmt: 153, 154
msguniq: 153, 154
mtrace: 100, 106
mv: 186, 189
namei: 224, 227
ncursesw6-config: 148, 149
neqn: 195, 196
newgidmap: 139, 142
newgrp: 139, 142
newuidmap: 139, 142
newusers: 139, 142
ngettext: 153, 154
nice: 186, 189
ninja: 184, 184
nl: 186, 189
nm: 127, 128
nohup: 186, 189
nologin: 139, 142
nproc: 186, 189
nroff: 195, 196
nsenter: 224, 227
nstat: 201, 202
numfmt: 186, 189
objcopy: 127, 128
objdump: 127, 128
od: 186, 189
openssl: 173, 174
openvt: 203, 204
partx: 224, 227
passwd: 139, 142
paste: 186, 189
patch: 207, 207
pathchk: 186, 189
pcprofiledump: 100, 106
pdfmom: 195, 196
pdfroff: 195, 196
pdftexi2dvi: 209, 210
peekfd: 152, 152
perl: 166, 167
perl5.40.0: 166, 167
perlbug: 166, 167
360

perldoc: 166, 167
perlivp: 166, 167
perlthanks: 166, 167
pfbtops: 195, 196
pgrep: 222, 222
pic: 195, 196
pic2graph: 195, 196
piconv: 166, 167
pidof: 222, 222
ping: 163, 164
ping6: 163, 164
pinky: 186, 189
pip3: 179
pivot_root: 224, 227
pkgconf: 126, 126
pkill: 222, 222
pl2pm: 166, 167
pldd: 100, 106
pmap: 222, 222
pod2html: 166, 167
pod2man: 166, 167
pod2texi: 209, 210
pod2text: 166, 167
pod2usage: 166, 167
podchecker: 166, 167
podselect: 166, 167
post-grohtml: 195, 196
poweroff: 233, 233
pr: 186, 189
pre-grohtml: 195, 196
preconv: 195, 196
printenv: 186, 189
printf: 186, 189
prlimit: 224, 227
prove: 166, 167
prtstat: 152, 152
ps: 222, 222
psfaddtable: 203, 204
psfgettable: 203, 204
psfstriptable: 203, 204
psfxtable: 203, 204
pslog: 152, 152
pstree: 152, 152
pstree.x11: 152, 152
ptar: 166, 167
ptardiff: 166, 167
ptargrep: 166, 168

ptx: 186, 189
pwck: 139, 142
pwconv: 139, 142
pwd: 186, 189
pwdx: 222, 222
pwunconv: 139, 142
pydoc3: 179
python3: 179
ranlib: 127, 129
readelf: 127, 129
readlink: 186, 189
readprofile: 224, 227
realpath: 186, 189
reboot: 233, 233
recode-sr-latin: 153, 154
refer: 195, 196
rename: 224, 227
renice: 224, 227
reset: 148, 149
resize2fs: 229, 231
resizepart: 224, 227
rev: 224, 227
rfkill: 224, 227
rm: 186, 189
rmdir: 186, 189
rmmod: 175, 176
roff2dvi: 195, 197
roff2html: 195, 197
roff2pdf: 195, 197
roff2ps: 195, 197
roff2text: 195, 197
roff2x: 195, 197
routel: 201, 202
rtacct: 201, 202
rtcwake: 224, 227
rtmon: 201, 202
rtpr: 201, 202
rtstat: 201, 202
runcon: 186, 189
runlevel: 233, 233
runtest: 125, 125
rview: 211, 213
rvim: 211, 213
script: 224, 227
scriptlive: 224, 227
scriptreplay: 224, 227
sdiff: 192, 192
361

sed: 151, 151
seq: 186, 189
setarch: 224, 227
setcap: 136, 136
setfacl: 135, 135
setfattr: 134, 134
setfont: 203, 204
setkeycodes: 203, 204
setleds: 203, 204
setmetamode: 203, 204
setsid: 224, 227
setterm: 224, 227
setvtrgb: 203, 204
sfdisk: 224, 228
sg: 139, 142
sh: 157, 158
sha1sum: 186, 189
sha224sum: 186, 189
sha256sum: 186, 189
sha384sum: 186, 189
sha512sum: 186, 189
shasum: 166, 168
showconsolefont: 203, 204
showkey: 203, 204
shred: 186, 189
shuf: 186, 189
shutdown: 233, 233
size: 127, 129
slabtop: 222, 222
sleep: 186, 189
sln: 100, 106
soelim: 195, 197
sort: 186, 189
sotruss: 100, 106
splain: 166, 168
split: 186, 189
sprof: 100, 106
ss: 201, 202
stat: 186, 190
stdbuf: 186, 190
strings: 127, 129
strip: 127, 129
stty: 186, 190
su: 139, 142
sulogin: 224, 228
sum: 186, 190
swaplabel: 224, 228

swapoff: 224, 228
swapon: 224, 228
switch_root: 224, 228
sync: 186, 190
sysctl: 222, 223
syslogd: 232, 232
tabs: 148, 149
tac: 186, 190
tail: 186, 190
talk: 163, 164
tar: 208, 208
taskset: 224, 228
tbl: 195, 197
tc: 201, 202
tclsh: 121, 122
tclsh8.6: 121, 122
tee: 186, 190
telinit: 233, 233
telnet: 163, 164
test: 186, 190
texi2dvi: 209, 210
texi2pdf: 209, 210
texi2any: 209, 210
texindex: 209, 210
tfmtodit: 195, 197
tftp: 163, 164
tic: 148, 150
timeout: 186, 190
tload: 222, 223
toe: 148, 150
top: 222, 223
touch: 186, 190
tput: 148, 150
tr: 186, 190
traceroute: 163, 164
troff: 195, 197
true: 186, 190
truncate: 186, 190
tset: 148, 150
tsort: 186, 190
tty: 186, 190
tune2fs: 229, 231
tzselect: 100, 106
uclampset: 224, 228
udev-hwdb: 216, 218
udevadm: 216, 218
udevd: 216, 218
362

ul: 224, 228
umount: 224, 228
uname: 186, 190
uname26: 224, 228
uncompress: 200, 200
unexpand: 186, 190
unicode_start: 203, 204
unicode_stop: 203, 204
uniq: 186, 190
unlink: 186, 190
unlz4: 113, 113
unlzma: 111, 112
unshare: 224, 228
unxz: 111, 112
updatedb: 194, 194
uptime: 222, 223
useradd: 139, 142
userdel: 139, 142
usermod: 139, 142
users: 186, 190
utmpdump: 224, 228
uuidd: 224, 228
uuidgen: 224, 228
uuidparse: 224, 228
vdir: 186, 190
vi: 211, 213
view: 211, 213
vigr: 139, 142
vim: 211, 213
vimdiff: 211, 213
vimtutor: 211, 213
vipw: 139, 142
vmstat: 222, 223
w: 222, 223
wall: 224, 228
watch: 222, 223
wc: 186, 190
wdctl: 224, 228
whatis: 219, 221
wheel: 182
whereis: 224, 228
who: 186, 190
whoami: 186, 190
wipefs: 224, 228
x86_64: 224, 228
xargs: 194, 194
xgettext: 153, 154

xmlwf: 162, 162
xsubpp: 166, 168
xtrace: 100, 106
xxd: 211, 213
xz: 111, 112
xzcat: 111, 112
xzcmp: 111, 112
xzdec: 111, 112
xzdiff: 111, 112
xzegrep: 111, 112
xzfgrep: 111, 112
xzgrep: 111, 112
xzless: 111, 112
xzmore: 111, 112
yacc: 155, 155
yes: 186, 190
zcat: 200, 200
zcmp: 200, 200
zdiff: 200, 200
zdump: 100, 106
zegrep: 200, 200
zfgrep: 200, 200
zforce: 200, 200
zgrep: 200, 200
zic: 100, 106
zipdetails: 166, 168
zless: 200, 200
zmore: 200, 200
znew: 200, 200
zramctl: 224, 228
zstd: 114, 114
zstdgrep: 114, 114
zstdless: 114, 114

Libraries
Expat: 169, 169
ld-2.40.so: 100, 106
libacl: 135, 135
libanl: 100, 107
libasprintf: 153, 154
libattr: 134, 134
libbfd: 127, 129
libblkid: 224, 228
libBrokenLocale: 100, 107
libbz2: 109, 110
libc: 100, 107
libcap: 136, 136
363

libcheck: 191, 191
libcom_err: 229, 231
libcrypt: 137, 138
libcrypto.so: 173, 174
libctf: 127, 129
libctf-nobfd: 127, 129
libc_malloc_debug: 100, 107
libdl: 100, 107
libe2p: 229, 231
libelf: 177, 177
libexpat: 162, 162
libexpect-5.45.4: 123, 124
libext2fs: 229, 231
libfdisk: 224, 228
libffi: 178
libfl: 120, 120
libformw: 148, 150
libg: 100, 107
libgcc: 143, 147
libgcov: 143, 147
libgdbm: 160, 160
libgdbm_compat: 160, 160
libgettextlib: 153, 154
libgettextpo: 153, 154
libgettextsrc: 153, 154
libgmp: 130, 131
libgmpxx: 130, 131
libgomp: 143, 147
libgprofng: 127, 129
libhistory: 116, 116
libhwasan: 143, 147
libitm: 143, 147
libkmod: 175
liblsan: 143, 147
libltdl: 159, 159
liblto_plugin: 143, 147
liblz4: 113, 113
liblzma: 111, 112
libm: 100, 107
libmagic: 115, 115
libman: 219, 221
libmandb: 219, 221
libmcheck: 100, 107
libmemusage: 100, 107
libmenuw: 148, 150
libmount: 224, 228
libmpc: 133, 133

libmpfr: 132, 132
libmvec: 100, 107
libncurses++w: 148, 150
libncursesw: 148, 150
libnsl: 100, 107
libnss_*: 100, 107
libopcodes: 127, 129
libpanelw: 148, 150
libpcprofile: 100, 107
libpipeline: 205
libpkgconf: 126, 126
libproc-2: 222, 223
libpsx: 136, 136
libpthread: 100, 107
libquadmath: 143, 147
libreadline: 116, 117
libresolv: 100, 107
librt: 100, 107
libsframe: 127, 129
libsmartcols: 224, 228
libss: 229, 231
libssl.so: 173, 174
libssp: 143, 147
libstdbuf: 186, 190
libstdc++: 143, 147
libstdc++exp: 143, 147
libstdc++fs: 143, 147
libsubid: 139, 142
libsupc++: 143, 147
libtcl8.6.so: 121, 122
libtclstub8.6.a: 121, 122
libtextstyle: 153, 154
libthread_db: 100, 107
libtsan: 143, 147
libubsan: 143, 147
libudev: 216, 218
libutil: 100, 107
libuuid: 224, 228
liby: 155, 155
libz: 108, 108
libzstd: 114, 114
preloadable_libintl: 153, 154

Scripts
checkfs: 238, 238
cleanfs: 238, 238
console: 238, 238
364

configuring: 251
console: 238, 238
configuring: 251
File creation at boot
configuring: 254
functions: 238, 238
halt: 238, 238
hostname
configuring: 247
ifdown: 238, 238
ifup: 238, 238
ipv4-static: 238, 238
localnet: 238, 238
localnet: 238, 238
modules: 238, 238
mountfs: 238, 238
mountvirtfs: 238, 238
network: 238, 238
configuring: 246
network: 238, 238
configuring: 246
network: 238, 238
configuring: 246
rc: 238, 238
reboot: 238, 238
sendsignals: 238, 238
setclock: 238, 238
configuring: 250
setclock: 238, 238
configuring: 250
swap: 238, 239
sysctl: 238, 239
sysklogd: 238, 239
configuring: 254
sysklogd: 238, 239
configuring: 254
template: 238, 239
udev: 238, 239
udev_retry: 238, 239
dwp: 127, 128

Others
/boot/config-6.10.5: 263, 267
/boot/System.map-6.10.5: 263, 268
/dev/*: 78
/etc/fstab: 261
/etc/group: 81
/etc/inittab: 249
/etc/inputrc: 258
/etc/ld.so.conf: 105
/etc/lfs-release: 272
/etc/localtime: 104
/etc/lsb-release: 272
/etc/mke2fs.conf: 230
/etc/modprobe.d/usb.conf: 267
/etc/nsswitch.conf: 104
/etc/os-release: 272
/etc/passwd: 81
/etc/profile: 256
/etc/protocols: 99
/etc/resolv.conf: 247
/etc/services: 99
/etc/syslog.conf: 232
/etc/udev: 216, 218
/etc/udev/hwdb.bin: 217
/etc/vimrc: 212
/run/utmp: 81
/usr/include/asm-generic/*.h: 52, 52
/usr/include/asm/*.h: 52, 52
/usr/include/drm/*.h: 52, 52
/usr/include/linux/*.h: 52, 52
/usr/include/misc/*.h: 52, 52
/usr/include/mtd/*.h: 52, 52
/usr/include/rdma/*.h: 52, 52
/usr/include/scsi/*.h: 52, 52
/usr/include/sound/*.h: 52, 52
/usr/include/video/*.h: 52, 52
/usr/include/xen/*.h: 52, 52
/var/log/btmp: 81
/var/log/lastlog: 81
/var/log/wtmp: 81
/etc/shells: 259
man pages: 98, 98

365
