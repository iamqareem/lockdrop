---
id: lpi-101-500-03
title: "LPIC-1 · 101-500 — Package, Package, If you have a .repo file describing a new…",
slug: lpi-101-500-03-lpic-1-101-500-package-package-if-you-have-a-repo-file-descr
source: "LPI Learning Material — LPIC-1 (Exam 101-500)",
sourceSection: "1. Package, 1. Package, 5. If you have a .repo file describing a new repository, where this file should be put so that it is, 3. Using, 5. Using yum, find out which package provides the file /bin/wget., 576. Jun 28 16:39 default.xml, 1. What CPU extensions are necessary on an x86 based hardware plat"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "If you omit the name of a package, you can update every package on the system for which an Covers 24 sections: Package, Package, If you have a .repo file describing a new repository, where this file should be put so that it is.",
---
# LPIC-1 · 101-500 — Package, Package, If you have a .repo file describing a new…

## 1. Package

Total download size: 547 k
Is this ok [y/d/N]:

If you omit the name of a package, you can update every package on the system for which an
update is available.
To check if an update is available for a specific package, use yum check-update PACKAGENAME.
As before, if you omit the package name, yum will check for updates for every installed package on
the system.
To remove an installed package, use yum remove PACKAGENAME, where PACKAGENAME is the name
of the package you wish to remove.

Finding Which Package Provides a Specific File
In a previous example we showed an attempt to install the gimp image editor, which failed
because of unmet dependencies. However, rpm shows which files are missing, but does not list the
name of the packages that provide them.
For example, one of the dependencies missing was libgimpui-2.0.so.0. To see what package
provides it, you can use yum whatprovides, followed by the name of the file you are searching
for:

131

2:gimp-libs-2.8.22-1.el7.i686 : GIMP libraries
Repo

: base

Matched from:
Provides

: libgimpui-2.0.so.0

The answer is gimp-libs-2.8.22-1.el7.i686. You can then install the package with the
command yum install gimp-libs.
This also works for files already in your system. For example, if you wish to know where the file
/etc/hosts came from, you can use:
setup-2.8.71-10.el7.noarch : A set of system configuration and setup files
Repo

: base

Matched from:
Filename

: /etc/hosts

The answer is setup-2.8.71-10.el7.noarch.

Getting Information About a Package
To get information about a package, such as its version, architecture, description, size and more,
use yum info PACKAGENAME where PACKAGENAME is the name of the package you want
information for:
Last metadata expiration check: 0:24:16 ago on Sat 21 Sep 2019 02:39:43 PM -03.
Installed Packages

: firefox

: 69.0.1

Release

: 3.fc30

Architecture : x86_64

: 268 M

Source

: firefox-69.0.1-3.fc30.src.rpm

Repository

: @System

132

From repo

: updates

: Mozilla Firefox Web browser

: https://www.mozilla.org/firefox/

License

: MPLv1.1 or GPLv2+ or LGPLv2+

Description

: Mozilla Firefox is an open-source web browser, designed
: for standards compliance, performance and portability.

Managing Software Repositories
For yum the “repos” are listed in the directory /etc/yum.repos.d/. Each repository is
represented by a .repo file, like CentOS-Base.repo.
Additional, extra repositories can be added by the user by adding a .repo file in the directory
mentioned above, or at the end of /etc/yum.conf. However, the recommended way to add or
manage repositories is with the yum-config-manager tool.
To add a repository, use the --add-repo parameter, followed by the URL to a .repo file.
adding repo from: https://rpms.remirepo.net/enterprise/remi.repo
grabbing file https://rpms.remirepo.net/enterprise/remi.repo to /etc/yum.repos.d/remi.repo
repo saved to /etc/yum.repos.d/remi.repo

To get a list of all available repositories use yum repolist all. You will get an output similar to
this:
repo id

repo name

status

updates/7/x86_64

CentOS-7 - Updates

enabled:

updates-source/7

CentOS-7 - Updates Sources

disabled

2,500

disabled repositories will be ignored when installing or upgrading software. To enable or disable
a repository, use the yum-config-manager utility, followed by the repository id.

133

In the output above, the repository id is shown on the first column (repo id) of each line. Use
only the part before the first /, so the id for the CentOS-7 - Updates repo is updates, and not
updates/7/x86_64.

The command above will disable the updates repo. To re-enable it use:

Yum stores downloaded packages and associated metadata in a cache directory
(usually /var/cache/yum). As the system gets upgraded and new packages are
installed, this cache can get quite large. To clean the cache and reclaim disk space
you can use the yum clean command, followed by what to clean. The most useful
parameters are packages (yum clean packages) to delete downloaded packages
and metadata (yum clean metadata) to delete associated metadata. See the
manual page for yum (type man yum) for more information.

DNF
dnf is the package management tool used on Fedora, and is a fork of yum. As such, many of the
commands and parameters are similar. This section will give you just a quick overview of dnf.
Searching for packages
dnf search PATTERN, where PATTERN is what you are searching for. For example, dnf
search unzip will show all packages that contain the word unzip in the name or description.
Getting information about a package
dnf info PACKAGENAME
Installing packages
dnf install PACKAGENAME, where PACKAGENAME is the name of the package you wish to
install. You can find the name by performing a search.
Removing packages
dnf remove PACKAGENAME
Upgrading packages
dnf upgrade PACKAGENAME to update only one package. Omit the package name to upgrade

134

all the packages in the system.
Finding out which package provides a specific file
dnf provides FILENAME
Getting a list of all the packages installed in the system
dnf list --installed
Listing the contents of a package
dnf repoquery -l PACKAGENAME

dnf has a built-in help system, which shows more information (such as extra
parameters) for each command. To use it, type dnf help followed by the
command, like dnf help install.

Managing Software Repositories
Just as with yum and zypper, dnf works with software repositories (repos). Each distribution has a
list of default repositories, and administrators can add or remove repos as needed.
To get a list of all available repositories, use dnf repolist. To list only enabled repositories, add
the --enabled option, and to list only disabled repositories, add the --disabled option.
Last metadata expiration check: 0:20:09 ago on Sat 21 Sep 2019 02:39:43 PM -03.
repo id

repo name

status

*fedora

Fedora 30 - x86_64

56,582

*fedora-modular

Fedora Modular 30 - x86_64

*updates

Fedora 30 - x86_64 - Updates

*updates-modular

Fedora Modular 30 - x86_64 - Updates

135
12,774
145

To add a repository, use dnf config-manager --add_repo URL, where URL is the full URL to
the repository. To enable a repository, use dnf config-manager --set-enabled REPO_ID.
Likewise, to disable a repository use dnf config-manager --set-disabled REPO_ID. In both
cases REPO_ID is the unique ID for the repository, which you can get using dnf repolist. Added
repositories are enabled by default.
Repositories are stored in .repo files in the directory /etc/yum.repos.d/, with exactly the same
syntax used for yum.

135

Zypper
zypper is the package management tool used on SUSE Linux and OpenSUSE. Feature-wise it is
similar to apt and yum, being able to install, update and remove packages from a system, with
automated dependency resolution.

Updating the Package Index
Like other package management tools, zypper works with repositories containing packages and
metadata. This metadata needs to be refreshed from time to time, so that the utility will know
about the latest packages available. To do a refresh, simply type:
Repository 'Non-OSS Repository' is up to date.
Repository 'Main Repository' is up to date.
Repository 'Main Update Repository' is up to date.
Repository 'Update Repository (Non-Oss)' is up to date.
All repositories have been refreshed.

zypper has an auto-refresh feature that can be enabled on a per-repository basis, meaning that
some repos may be refreshed automatically before a query or package installation, and others
may need to be refreshed manually. You will learn how to control this feature shortly.

Searching for Packages
To search for a package, use the search (or se) operator, followed by the package name:
S | Name

| Summary

| Type

--+----------------+-----------------------------------+-------| gnumeric

| Spreadsheet Application

| package

| gnumeric-devel | Spreadsheet Application

| package

| gnumeric-doc

| Documentation files for Gnumeric

| package

| gnumeric-lang

| Translations for package gnumeric | package

The search operator can also be used to obtain a list of all the installed packages in the system. To
do so, use the -i parameter without a package name, as in zypper se -i.

136

To see if a specific package is installed, add the package name to the command above. For
example, the following command will search among the installed packages for any containing
“firefox” in the name:
S | Name

| Summary

| Type

--+------------------------------------+-------------------------+-------i | MozillaFirefox

| Mozilla Firefox Web B-> | package

i | MozillaFirefox-branding-openSUSE

| openSUSE branding of -> | package

i | MozillaFirefox-translations-common | Common translations f-> | package

To search only among non-installed packages, add the -u parameter to the se operator.

Installing, Upgrading and Removing Packages
To install a software package, use the install (or in) operator, followed by the package name.
Like so:
zypper in unrar
Resolving package dependencies...
The following NEW package is going to be installed:
unrar
1 new package to install.
Overall download size: 141.2 KiB. Already cached: 0 B. After the operation, additional 301.6
KiB will be used.
Continue? [y/n/v/...? shows all options] (y): y
Retrieving package unrar-5.7.5-lp151.1.1.x86_64
(1/1), 141.2 KiB (301.6 KiB unpacked)

zypper can also be used to install an RPM package on disk, while trying to satisfy its dependencies

137

using packages from the repositories. To do so, just provide the full path to the package instead of
a package name, like zypper in /home/john/newpackage.rpm.
To update packages installed on the system, use zypper update. As in the installation process,
this will show a list of packages to be installed/upgraded before asking if you want to proceed.
If you wish to only list the available updates, without installing anything, you can use zypper
list-updates.
To remove a package, use the remove (or rm) operator, followed by the package name:
Resolving package dependencies...
The following package is going to be REMOVED:
unrar
1 package to remove.
After the operation, 301.6 KiB will be freed.
Continue? [y/n/v/...? shows all options] (y): y

Keep in mind that removing a package also removes any other packages that depend on it. For
example:
Warning: No repositories defined. Operating only with the installed resolvables. Nothing can
be installed.
Resolving package dependencies...
The following 6 packages are going to be REMOVED:
gimp gimp-help gimp-lang gimp-plugins-python libgimp-2_0-0
libgimpui-2_0-0
6 packages to remove.
After the operation, 98.0 MiB will be freed.
Continue? [y/n/v/...? shows all options] (y):

138

Finding Which Packages Contain a Specific File
To see which packages contain a specific file, use the search operator followed by the --provides
parameter and the name of the file (or full path to it). For example, if you want to know which
packages contain the file libgimpmodule-2.0.so.0 in /usr/lib64/ you would use:
S | Name

| Summary

| Type

--+---------------+----------------------------------------------+-------i | libgimp-2_0-0 | The GNU Image Manipulation Program - Libra-> | package

Getting Package Information
To see the metadata associated with a package, use the info operator followed by the package
name. This will provide you with the origin repository, package name, version, architecture,
vendor, installed size, if it is installed or not, the status (if it is up-to-date), the source package and
a description.
Information for package gimp:
----------------------------Repository

: Main Repository

: gimp

: 2.8.22-lp151.4.6

Arch

: x86_64

Vendor

: openSUSE

Installed Size : 29.1 MiB
Installed

: Yes (automatically)

Status

: up-to-date

Source package : gimp-2.8.22-lp151.4.6.src

: The GNU Image Manipulation Program

Description

:

The GIMP is an image composition and editing program, which can be
used for creating logos and other graphics for Web pages. The GIMP
offers many tools and filters, and provides a large image
manipulation toolbox, including channel operations and layers,

139

effects, subpixel imaging and antialiasing, and conversions, together
with multilevel undo. The GIMP offers a scripting facility, but many
of the included scripts rely on fonts that we cannot distribute.

Managing Software Repositories
zypper can also be used to manage software repositories. To see a list of all the repositories
currently registered in your system, use zypper repos:
Repository priorities are without effect. All enabled repositories share the same priority.
#

| Alias

| Name

| Enabled | GPG Check |

Refresh
---+---------------------------+------------------------------------+---------+-----------+
-------1 | openSUSE-Leap-15.1-1

| openSUSE-Leap-15.1-1

| Debug Repository

| Debug Repository (Non-OSS)

| Update Repository (Debug)

5 | repo-debug-update-non-oss | Update Repository (Debug, Non-OSS) | No

---2 | repo-debug
---3 | repo-debug-non-oss
---4 | repo-debug-update
------6 | repo-non-oss

| Non-OSS Repository

| Main Repository

| Source Repository

| Source Repository (Non-OSS)

| Main Update Repository

| Update Repository (Non-Oss)

7 | repo-oss
8 | repo-source
---9 | repo-source-non-oss
---10 | repo-update
11 | repo-update-non-oss

See in the Enabled column that some repositories are enabled, while others are not. You can
change this with the modifyrepo operator, followed by the -e (enable) or -d (disable) parameter
and the repository alias (the second column in the output above).

140

Repository 'repo-non-oss' has been successfully disabled.
Repository 'repo-non-oss' has been successfully enabled.

Previously we mentioned that zypper has an auto refresh capability that can be enabled on a perrepository basis. When enabled, this flag will make zypper run a refresh operation (the same as
running zypper refresh) before working with the specified repo. This can be controlled with
the -f and -F parameters of the modifyrepo operator:
Autorefresh has been disabled for repository 'repo-non-oss'.
Autorefresh has been enabled for repository 'repo-non-oss'.

Adding and Removing Repositories
To add a new software repository for zypper, use the addrepo operator followed by the
repository URL and repository name, like below:
Repository 'packman' successfully added
URI

: http://packman.inode.at/suse/openSUSE_Leap_15.1/

Enabled

: Yes

GPG Check

: Yes

Autorefresh : No
Priority

: 99 (default priority)

Repository priorities are without effect. All enabled repositories share the same priority.

While adding a repository, you can enable auto-updates with the -f parameter. Added
repositories are enabled by default, but you can add and disable a repository at the same time by
using the -d parameter.
To remove a repository, use the removerepo operator, followed by the repository name (Alias). To
remove the repository added in the example above, the command would be:

141

Repository 'packman' has been removed.

142

1. Using rpm on a Red Hat Enterprise Linux system, how would you install the package fileroller-3.28.1-2.el7.x86_64.rpm showing a progress bar during the installation?

2. Using rpm, find out which package contains the file /etc/redhat-release.

3. How would you use yum to check for updates for all packages in the system?

4. Using zypper, how would you disable a repository called repo-extras?

## 5. If you have a .repo file describing a new repository, where this file should be put so that it is
recognized by DNF?

143

1. How would you use zypper to find out which package owns the file /usr/sbin/swapon?

2. How can you get a list of all installed packages in the system using dnf?

## 3. Using
dnf,
what
is
command
to
add
repository
https://www.example.url/home:reponame.repo to the system?

4. How can you use zypper to check if the package unzip is installed?

## 5. Using yum, find out which package provides the file /bin/wget.

144

located

at

- How to use rpm to install, upgrade and remove packages.
- How to use yum, zypper and dnf.
- How to get information about a package.
- How to get a list of the package contents.
- How to find out which package a file came from.
- How to list, add, remove, enable or disable software repositories.
The following commands were discussed:
- rpm
- yum
- dnf
- zypper

145

1. Using rpm on a Red Hat Enterprise Linux system, how would you install the package fileroller-3.28.1-2.el7.x86_64.rpm showing a progress bar during the installation?
Use the -i parameter to install a package, and the -h option to enable “hash marks” showing
installation progress. So, the answer is: rpm -ih file-roller-3.28.1-2.el7.x86_64.rpm.
2. Using rpm, find out which package contains the file /etc/redhat-release.
You are querying information about a file, so use the -qf parameter: rpm -qf /etc/redhatrelease.
3. How would you use yum to check for updates for all packages in the system?
Use the check-update operation without a package name: yum check-update.
4. Using zypper, how would you disable a repository called repo-extras?
Use the modifyrepo operation to change the parameters of a repo, and the -d parameter to
disable it: zypper modifyrepo -d repo-extras.
5. If you have a .repo file describing a new repository, where this file should be put so that it is
recognized by DNF?
.repo files for DNF should be put on the same place used by YUM, inside /etc/yum.repos.d/.

146

1. How would you use zypper to find out which package owns the file /usr/sbin/swapon?
Use the se (search) operator and the --provides parameter: zypper se --provides
/usr/sbin/swapon.
2. How can you get a list of all installed packages in the system using dnf?
Use the list operator, followed by the --installed parameter: dnf list --installed.
3. Using
dnf,
what
is
command
to
add
repository
https://www.example.url/home:reponame.repo to the system?

located

at

Working with repositories is a “configuration change”, so use the config-manager and the
--add_repo
parameter:
dnf
config-manager
--add_repo
https://www.example.url/home:reponame.repo.
4. How can you use zypper to check if the package unzip is installed?
You need to do a search (se) on the installed (-i) packages: zypper se -i unzip.
5. Using yum, find out which package provides the file /bin/wget.
To find out what provides a file, use whatprovides and the filename: yum whatprovides
/bin/wget.

147

### 102.6 Linux as a virtualization guest
LPIC-1, Exam 101, Objective 102.6
- Understand the general concept of virtual machines and containers
- Understand common elements virtual machines in an IaaS cloud, such as computing
instances, block storage and networking
- Understand unique properties of a Linux system which have to changed when a system is
cloned or used as a template
- Understand how system images are used to deploy virtual machines, cloud instances and
containers
- Understand Linux extensions which integrate Linux with a virtualization product
- Awareness of cloud-init
- Virtual machine
- Linux container
- Application container
- Guest drivers
- SSH host keys
- D-Bus machine id

148

### 102.6 Lesson 1

### 102.6 Linux as a virtualization guest

One of the great strengths of Linux is its versatility. One aspect of this versatility is the ability to
use Linux as a means of hosting other operating systems, or individual applications, in a
completely isolated and secure environment. This lesson will focus on the concepts of
virtualization and container technologies, along with some technical details that should be taken
into consideration when deploying a virtual machine on a cloud platform.

Virtualization Overview
Virtualization is a technology that allows for a software platform, called a hypervisor, to run
processes that contain a fully emulated computer system. The hypervisor is responsible for
managing the physical hardware’s resources that can be used by individual virtual machines.
These virtual machines are called guests of the hypervisor. A virtual machine has many aspects of
a physical computer emulated in software, such as a system’s BIOS and hard drive disk
controllers. A virtual machine will often use hard disk images that are stored as individual files,
and will have access to the host machine’s RAM and CPU through the hypervisor software. The
hypervisor separates the access to the host system’s hardware resources among the guests, thus

149

allowing for multiple operating systems to run on a single host system.
Commonly used hypervisors for Linux include:
Xen
Xen is an open source Type-1 hypervisor, meaning that it does not rely on an underlying
operating system to function. A hypervisor of this sort is known as a bare-metal hypervisor
since the computer can boot directly into the hypervisor.
KVM
The Kernel Virtual Machine is a Linux kernel module for virtualization. KVM is a hypervisor of
both Type-1 and Type-2 hypervisor because, although it needs a generic Linux operating
system to work, it is able to perform as a hypervisor perfectly well by integrating with a
running Linux installation. Virtual machines deployed with KVM use the libvirt daemon and
associated software utilities to be created and managed.
VirtualBox
A popular desktop application that makes it easy to create and manage virtual machines.
Oracle VM VirtualBox is cross-platform, and will work on Linux, macOS, and Microsoft
Windows. Since VirtualBox requires an underlying operating system to run, it is a Type-2
hypervisor.
Some hypervisors allow for the dynamic relocation of a virtual machine. The process of moving a
virtual machine from one hypervisor installation to another is called a migration, and the
techniques involved differ between hypervisor implementations. Some migrations can only be
performed when the guest system has been completely shut down, and other can be performed
while the guest is running (called a live migration). Such techniques can be of aid during
maintenance windows for hypervisors, or for system resiliency when a hypervisor becomes nonfunctional and the guest can be moved to a hypervisor that is working.

Types of Virtual Machines
There are three main types of virtual machines, the fully virtualized guest, the paravirtualized
guest and the hybrid guest.
Fully Virtualized
All instructions that a guest operating system is expected to execute must be able to run within
a fully virtualized operating system installation. The reason for this is that no additional
software drivers are installed within the guest to translate the instructions to either simulated
or real hardware. A fully virtualized guest is one where the guest (or HardwareVM) is unaware
that it is a running virtual machine instance. In order for this type of virtualization to take
150

place on x86 based hardware the Intel VT-x or AMD-V CPU extensions must be enabled on the
system that has the hypervisor installed. This can be done from a BIOS or UEFI firmware
configuration menu.
Paravirtualized
A paravirtualized guest (or PVM) is one where the guest operating system is aware that it is a
running virtual machine instance. These types of guests will make use of a modified kernel and
special drivers (known as guest drivers) that will help the guest operating system utilize
software and hardware resources of the hypervisor. The performance of a paravirtualized
guest is often better than that of the fully virtualized guest due to the advantage that these
software drivers provide.
Hybrid
Paravirtualization and full virtualization can be combined to allow unmodified operating
systems to receive near native I/O performance by using paravirtualized drivers on fully
virtualized operating systems. The paravirtualized drivers contain storage and network device
drivers with enhanced disk and network I/O performance.
Virtualization platforms often provide packaged guest drivers for virtualized operating systems.
The KVM utilizes drivers from the Virtio project, whereas Oracle VM VirtualBox uses Guest
Extensions available from a downloadable ISO CD-ROM image file.

Example libvirt Virtual Machine
We will look at an example virtual machine that is managed by libvirt and uses the KVM
hypervisor. A virtual machine often consists of a group of files, primarily an XML file that defines
the virtual machine (such as its hardware configuration, network connectivity, display
capabilities, and more) and an associated hard disk image file that contains the installation of the
operating system and its software.
First, let us start to examine an example XML configuration file for a virtual machine and its
network environment:
$ ls /etc/libvirt/qemu
total 24
drwxr-xr-x 3 root root 4096 Oct 29 17:48 networks
-rw------- 1 root root 5667 Jun 29 17:17 rhel8.0.xml

The qemu portion of the directory path refers to the underlying software that KVMbased virtual machines rely on. The QEMU project provides software for the

151

hypervisor to emulate hardware devices that the virtual machine will use, such as
disk controllers, access to the host CPU, network card emulation, and more.
Note that there is a directory named networks. This directory contains definition files (also using
XML) that create network configurations that the virtual machines can use. This hypervisor is
only using one network, and so there is only one definition file that contains a configuration for a
virtual network segment that these systems will utilize.
$ ls -l /etc/libvirt/qemu/networks/
total 8
drwxr-xr-x 2 root root 4096 Jun 29 17:15 autostart
-rw------- 1 root root

## 576. Jun 28 16:39 default.xml

$ sudo cat /etc/libvirt/qemu/networks/default.xml
<!-WARNING: THIS IS AN AUTO-GENERATED FILE. CHANGES TO IT ARE LIKELY TO BE
OVERWRITTEN AND LOST. Changes to this xml configuration should be made using:
virsh net-edit default
or other application using the libvirt API.
-->
<network>
<name>default</name>
<uuid>55ab064f-62f8-49d3-8d25-8ef36a524344</uuid>
<forward mode='nat'/>
<bridge name='virbr0' stp='on' delay='0'/>
<mac address='52:54:00:b8:e0:15'/>
<ip address='192.168.122.1' netmask='255.255.255.0'>
<dhcp>
<range start='192.168.122.2' end='192.168.122.254'/>
</dhcp>
</ip>
</network>

This definition includes a Class C private network and an emulated hardware device to act as a
router for this network. There is also a range of IP addresses for the hypervisor to use with a
DHCP server implementation that can be assigned to the virtual machines that use this network.
This network configuration also utilizes network address translation (NAT) to forward packets to
other networks, such as the hypervisor’s LAN.
Now we turn our attention to a Red Hat Enterprise Linux 8 virtual machine definition file.
(sections of special note are in bold text):

152

$ sudo cat /etc/libvirt/qemu/rhel8.0.xml
<!-WARNING: THIS IS AN AUTO-GENERATED FILE. CHANGES TO IT ARE LIKELY TO BE
OVERWRITTEN AND LOST. Changes to this xml configuration should be made using:
virsh edit rhel8.0
or other application using the libvirt API.
-->
<domain type='kvm'>
<name>rhel8.0</name>
<uuid>fadd8c5d-c5e1-410e-b425-30da7598d0f6</uuid>
<metadata>
<libosinfo:libosinfo xmlns:libosinfo="http://libosinfo.org/xmlns/libvirt/domain/1.0">
<libosinfo:os id="http://redhat.com/rhel/8.0"/>
</libosinfo:libosinfo>
</metadata>
<memory unit='KiB'>4194304</memory>
<currentMemory unit='KiB'>4194304</currentMemory>
<vcpu placement='static'>2</vcpu>
<os>
<type arch='x86_64' machine='pc-q35-3.1'>hvm</type>
<boot dev='hd'/>
</os>
<features>
<acpi/>
<apic/>
<vmport state='off'/>
</features>
<cpu mode='host-model' check='partial'>
<model fallback='allow'/>
</cpu>
<clock offset='utc'>
<timer name='rtc' tickpolicy='catchup'/>
<timer name='pit' tickpolicy='delay'/>
<timer name='hpet' present='no'/>
</clock>
<on_poweroff>destroy</on_poweroff>
<on_reboot>restart</on_reboot>
<on_crash>destroy</on_crash>
<pm>
<suspend-to-mem enabled='no'/>
<suspend-to-disk enabled='no'/>
</pm>
<devices>

153

<emulator>/usr/bin/qemu-system-x86_64</emulator>
<disk type='file' device='disk'>
<driver name='qemu' type='qcow2'/>
<source file='/var/lib/libvirt/images/rhel8'/>
<target dev='vda' bus='virtio'/>
<address type='pci' domain='0x0000' bus='0x04' slot='0x00' function='0x0'/>
</disk>
<controller type='usb' index='0' model='qemu-xhci' ports='15'>
<address type='pci' domain='0x0000' bus='0x02' slot='0x00' function='0x0'/>
<controller type='sata' index='0'>
<address type='pci' domain='0x0000' bus='0x00' slot='0x1f' function='0x2'/>
<controller type='pci' index='0' model='pcie-root'/>
<controller type='pci' index='1' model='pcie-root-port'>
<target chassis='1' port='0x10'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x0'
multifunction='on'/>
<controller type='pci' index='2' model='pcie-root-port'>
<target chassis='2' port='0x11'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x1'/>
<controller type='pci' index='3' model='pcie-root-port'>
<target chassis='3' port='0x12'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x2'/>
<controller type='pci' index='4' model='pcie-root-port'>
<target chassis='4' port='0x13'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x3'/>
<controller type='pci' index='5' model='pcie-root-port'>
<target chassis='5' port='0x14'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x4'/>
<controller type='pci' index='6' model='pcie-root-port'>
<target chassis='6' port='0x15'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x5'/>

154

<controller type='pci' index='7' model='pcie-root-port'>
<target chassis='7' port='0x16'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x6'/>
<controller type='virtio-serial' index='0'>
<address type='pci' domain='0x0000' bus='0x03' slot='0x00' function='0x0'/>
<interface type='network'>
<mac address='52:54:00:50:a7:18'/>
<source network='default'/>
<model type='virtio'/>
<address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
</interface>
<serial type='pty'>
<target type='isa-serial' port='0'>
<model name='isa-serial'/>
</target>
</serial>
<console type='pty'>
<target type='serial' port='0'/>
</console>
<channel type='unix'>
<target type='virtio' name='org.qemu.guest_agent.0'/>
<address type='virtio-serial' controller='0' bus='0' port='1'/>
</channel>
<channel type='spicevmc'>
<target type='virtio' name='com.redhat.spice.0'/>
<address type='virtio-serial' controller='0' bus='0' port='2'/>
</channel>
<input type='tablet' bus='usb'>
<address type='usb' bus='0' port='1'/>
</input>
<input type='mouse' bus='ps2'/>
<input type='keyboard' bus='ps2'/>
<graphics type='spice' autoport='yes'>
<listen type='address'/>
<image compression='off'/>
</graphics>
<sound model='ich9'>
<address type='pci' domain='0x0000' bus='0x00' slot='0x1b' function='0x0'/>
</sound>
<video>

155

<model type='virtio' heads='1' primary='yes'/>
<address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x0'/>
</video>
<redirdev bus='usb' type='spicevmc'>
<address type='usb' bus='0' port='2'/>
</redirdev>
<redirdev bus='usb' type='spicevmc'>
<address type='usb' bus='0' port='3'/>
</redirdev>
<memballoon model='virtio'>
<address type='pci' domain='0x0000' bus='0x05' slot='0x00' function='0x0'/>
</memballoon>
<rng model='virtio'>
<backend model='random'>/dev/urandom</backend>
<address type='pci' domain='0x0000' bus='0x06' slot='0x00' function='0x0'/>
</rng>
</devices>
</domain>

This file defines a number of hardware settings that are used by this guest, such as the amount of
RAM that it will have assigned to it, the number of CPU cores from the hypervisor that the guest
will have access to, the hard disk image file that is associated with this guest (under the disk
stanza), its display capabilities (via the SPICE protocol), and the guest’s access to USB devices as
well as emulated keyboard and mice input.

Example Virtual Machine Disk Storage
This virtual machine’s hard disk image resides at /var/lib/libvirt/images/rhel8. Here is the
disk image itself on this hypervisor:
$ sudo ls -lh /var/lib/libvirt/images/rhel8
-rw------- 1 root root 5.5G Oct 25 15:57 /var/lib/libvirt/images/rhel8

The current size of this disk image consumes only 5.5 GB of space on the hypervisor. However, the
operating system within this guest sees a 23.3 GB sized disk, as evidenced by the output of the
following command from within the running virtual machine:
$ lsblk
NAME

MAJ:MIN RM

vda

252:0

0 23.3G

0 disk

├─vda1

252:1

0 part /boot

156

SIZE RO TYPE MOUNTPOINT
1G

└─vda2

252:2

0 22.3G

0 part

├─rhel-root 253:0

20G

0 lvm

└─rhel-swap 253:1

2.3G

0 lvm

[SWAP]

This is due to the type of disk provisioning used for this guest. There are multiple types of disk
images that a virtual machine can use but the two primary types are:
COW
Copy-on-write (also referred to as thin-provisioning or sparse images) is a method where a disk
file is created with a pre-defined upper size limit. The disk image size only increases as new
data is written to the disk. Just like the previous example, the guest operating system sees the
predefined disk limit of 23.3 GB, but has only written 5.5 GB of data to the disk file. The disk
image format used for the example virtual machine is qcow2 which is a QEMU COW file format.
RAW
A raw or full disk type is a file that has all of its space pre-allocated. For example, a 10 GB raw
disk image file consumes 10 GB of actual disk space on the hypervisor. There is a performance
benefit to this style of disk as all of the needed disk space already exists, so the underlying
hypervisor can just write data to the disk without the performance hit of monitoring the disk
image to ensure that it has not yet reached its limit and extending the size of the file as new
data is written to it.
There are other virtualization management platforms such as Red Hat Enterprise Virtualization
and oVirt that can make use of physical disks to act as backing storage locations for a virtual
machine’s operating system. These systems can utilize storage area network (SAN) or network
attached storage (NAS) devices to write their data to, and the hypervisor keeps track of what
storage locations belong to which virtual machines. These storage systems can use technologies
such as logical volume management (LVM) to grow or shrink the size of a virtual machine’s disk
storage as needed, and to aid in the creation and management of storage snapshots.

Working with Virtual Machine Templates
Since virtual machines are typically just files running on a hypervisor, it is easy to create
templates that can be customized for particular deployment scenarios. Often a virtual machine
will have a basic operating system installation and some pre-configured authentication
configuration settings set up to ease future system launches. This cuts down on the amount of
time it takes to build a new system by reducing the amount of work that is often repeated, such as
base package installation and locale settings.
This virtual machine template could then later get copied to a new guest system. In this case, the

157

new guest would get renamed, a new MAC address generated for its network interface, and other
modifications can be made depending on its intended use.

The D-Bus Machine ID
Many Linux installations will utilize a machine identification number generated at install time,
called the D-Bus machine ID. However, if a virtual machine is cloned to be used as a template for
other virtual machine installations, a new D-Bus machine ID would need to be created to ensure
that system resources from the hypervisor get directed to the appropriate guest system.
The following command can be used to validate that a D-Bus machine ID exists for the running
system:
$ dbus-uuidgen --ensure

If no error messages are displayed, then an ID exists for the system. To view the current D-Bus
machine ID, run the following:
$ dbus-uuidgen --get
17f2e0698e844e31b12ccd3f9aa4d94a

The string of text that is displayed is the current ID number. No two Linux systems running on a
hypervisor should have the same D-Bus machine ID.
The D-Bus machine ID is located at /var/lib/dbus/machine-id and is symbolically linked to
/etc/machine-id. Changing this ID number on a running system is discouraged as system
instability and crashes are likely to occur. If two virtual machines do have the same D-Bus
machine ID, follow the procedure below to generate a new one:
$ sudo rm -f /etc/machine-id
$ sudo dbus-uuidgen --ensure=/etc/machine-id

In the event that /var/lib/dbus/machine-id is not a symbolic link back to /etc/machine-id,
then /var/lib/dbus/machine-id will need to be removed.

Deploying Virtual Machines to the Cloud
There are a multitude of IaaS (infrastructure as a service) providers available that run hypervisor
systems and that can deploy virtual guest images for an organization. Practically all of these

158

providers have tools in place that allows an administrator to build, deploy and configure custom
virtual machines based on a variety of Linux distributions. Many of these companies also have
systems in place that allow for the deployment and migrations of virtual machines built from
within a customer’s organization.
When assessing a deployment of a Linux system in an IaaS environment, there are some key
elements that an administrator should be cognizant of:
Computing Instances
Many cloud providers will charge usage rates based on “computing instances”, or how much
CPU time your cloud-based infrastructure will use. Careful planning of how much processing
time applications will actually require will aid in keeping the costs of a cloud solution
manageable.
Computing instances will also often refer to the number of virtual machines that are
provisioned in a cloud environment. Again, the more instances of systems that are running at
one time will also factor into how much overall CPU time an organization will be charged for.
Block Storage
Cloud providers also have various levels of block storage available for an organization to use.
Some offerings are simply meant to be web-based network storage for files, and other offerings
relate to external storage for a cloud provisioned virtual machine to use for hosting files.
The cost for such offerings will vary based on the amount of storage used, and the speed of the
storage within the provider’s data centers. Faster storage access typically will cost more, and
conversely data “at rest” (as in archival storage) is often very inexpensive.
Networking
One of the main components of working with a cloud solutions provider is how the virtual
network will be configured. Many IaaS providers will have some form of web-based utilities
that can be utilized for the design and implementation of different network routes, subnetting,
and firewall configurations. Some will even provide DNS solutions so that publicly accessible
FQDN (fully qualified domain names) can be assigned to your internet facing systems. There are
even “hybrid” solutions available that can connect an existing, on-premise network
infrastructure to a cloud-based infrastructure through the means of a VPN (virtual private
network), thus tying the two infrastructures together.

Securely Accessing Guests in the Cloud
The most prevalent method in use for accessing a remote virtual guest on a cloud platform is
through the use of OpenSSH software. A Linux system that resides in the cloud would have the

159

OpenSSH server running, while an administrator would use an OpenSSH client with pre-shared
keys for remote access.
An administrator would run the following command
$ ssh-keygen

and follow the prompts to create a public and private SSH key pair. The private key remains on
the administrator’s local system (stored in ~/.ssh/) and the public key gets copied to the remote
cloud system, the exact same method one would use when working with networked machines on
a corporate LAN.
The administrator would then run the following command:
$ ssh-copy-id -i <public_key> user@cloud_server

This will copy the public SSH key from the key pair just generated to the remote cloud server. The
public key will be recorded in the ~/.ssh/authorized_keys file of the cloud server, and set the
appropriate permissions on the file.

If there is only one public key file in the ~/.ssh/ directory, then the -i switch can
be omitted, as the ssh-copy-id command will default to the public key file in the
directory (typically the file ending with the .pub extension).

Some cloud providers will automatically generate a key pair when a new Linux system is
provisioned. The administrator will then need to download the private key for the new system
from the cloud provider and store it on their local system. Note that the permissions for SSH keys
must be 0600 for a private key, and 0644 for a public key.

Preconfiguring Cloud Systems
A useful tool that simplifies the deployments of cloud-based virtual machine is the cloud-init
utility. This command, along with the associated configuration files and pre-defined virtual
machine image, is a vendor-neutral method for deploying a Linux guest across a plethora of IaaS
providers. Utilizing YAML (YAML Ain’t Markup Language) plain-text files an administrator can
pre-configure network settings, software package selections, SSH key configuration, user account
creations, locale settings, along with a myriad of other options to quickly build out new systems.
During a new system’s initial boot up, cloud-init will read in the settings from YAML
configurations files and apply them. This process only needs to apply to a system’s initial setup,

160

and makes deploying a fleet of new systems on a cloud provider’s platform easy.
The YAML file syntax used with cloud-init is called cloud-config. Here is a sample cloudconfig file:
#cloud-config
timezone: Africa/Dar_es_Salaam
hostname: test-system
apt_update: true
apt_upgrade: true
packages:
- nginx

Note that on the top line there is no space between the hash symbol (#) and the term cloudconfig.

cloud-init is not just for virtual machines. The cloud-init tool suite can also be
used to pre-configure containers (such as LXD Linux containers) prior to
deployment.

Containers
Container technology is similar in some aspects to a virtual machine, where you get an isolated
environment to easily deploy an application. Whereas with a virtual machine an entire computer
is emulated, a container uses just enough software to run an application. In this way, there is far
less overhead.
Containers allow for greater flexibility over that of a virtual machine. An application container
can be migrated from one host to another, just as a virtual machine can be migrated from one
hypervisor to another. However, sometimes a virtual machine will need to be powered off before
it could be migrated, whereas with a container the application is always running while it is getting
migrated. Containers also make it easy to deploy new versions of applications in tandem with an
existing version. As users close their sessions with running containers, these containers can get
automatically removed from the system by the container orchestration software and replaced
with the new version thus reducing downtime.

There are numerous container technologies available for Linux, such as Docker,

161

Kubernetes, LXD/LXC, systemd-nspawn, OpenShift and more. The exact
implementation of a container software package is beyond the scope of the LPIC-1
exam.
Containers make use of the control groups (better known as cgroups) mechanism within the Linux
kernel. The cgroup is a way to partition system resources such as memory, processor time as well
as disk and network bandwidth for an individual application. An administrator can use cgroups
directly to set system resource limits on an application, or a group of applications that could exist
within a single cgroup. In essence this is what container software does for the administrator,
along with providing tools that ease the management and deployment of cgroups.

162

Currently, knowledge of cgroups are not necessary for passing the LPIC-1 exam.
The concept of the cgroup is mentioned here so that the candidate would at least
have some background knowledge of how an application is segregated for the sake
of system resource utilization.

## 1. What CPU extensions are necessary on an x86 based hardware platform that will run fully
virtualized guests?

2. A mission-critical server installation that will require the fastest performance will likely use
what type of virtualization?

## 3. Two virtual machines that have been cloned from the same template and that utilize D-Bus are
performing erratically. They both have separate hostnames and network configuration
settings. What command would be used to determine if each of the virtual machines have
different D-Bus Machine IDs?

163

## 1. Run the following command to see if your system already has CPU extensions enabled to run a
virtual machine (your results may vary depending on your CPU):
grep --color -E "vmx|svm" /proc/cpuinfo
Depending on the output, you may have vmx highlighted (for Intel VT-x enabled CPU’s) or svm
highlighted (for AMD SVM enabled CPU’s). Should you get no results, consult your BIOS or UEFI
firmware instructions on how to enable virtualization for your processor.

## 2. If your processor supports virtualizations, seek out your distribution’s documentation for
running a KVM hypervisor.
- Install the necessary packages to run a KVM hypervisor.

- If you are using a graphical desktop environment, it is recommended to also install the
virt-manager application which is a graphical front-end that can be used on a KVM
installation. This will aid in virtual machine installations and management.

- Download a Linux distribution ISO image of your choice, and following your distribution’s
documentation create a new virtual machine using this ISO.

164

In this lesson we covered the conceptual basics of virtual machines and containers, and how these
technologies can be used with Linux.
We briefly described the following commands:
dbus-uuidgen
Used to verify and view a system’s DBus ID.
ssh-keygen
Used to generate a public and private SSH key pair for use when accessing remote, cloud-based
systems.
ssh-copy-id
Used to copy a system’s public SSH key to a remote system to facilitate remote authentication.
cloud-init
Used to aid in the configuration and deployment of virtual machines and containers to a cloud
environment.

165

## 1. What CPU extensions are necessary on an x86 based hardware platform that will run fully
virtualized guests?
VT-x for Intel CPUs or AMD-V for AMD CPUs
2. A mission-critical server installation that will require the fastest performance will likely use
what type of virtualization?
An operating system that makes use of paravirtualization, such as Xen, as the guest operating
system can make better use of hardware resources available to it through the use of software
drivers designed to work with the hypervisor.
3. Two virtual machines that have been cloned from the same template and that utilize D-Bus are
performing erratically. They both have separate hostnames and network configuration
settings. What command would be used to determine if each of the virtual machines have
different D-Bus Machine IDs?
dbus-uuidgen --get

166

## 1. Run the following command to see if your system already has CPU extensions enabled to run a
virtual machine (your results may vary depending on your CPU): grep --color -E
"vmx|svm" /proc/cpuinfo. Depending on the output, you may have "vmx" highlighted (for
Intel VT-x enabled CPU’s) or "svm" highlighted (for AMD SVM enabled CPU’s). Should you get no
results, consult your BIOS or UEFI firmware instructions on how to enable virtualization for
your processor.
The results will vary depending on your CPU that you have. Here is example output from a
computer with an Intel CPU with virtualization extensions enabled in the UEFI firmware:
$ grep --color -E "vmx|svm" /proc/cpuinfo
flags

: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36

clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc
art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni
pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1
sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm
3dnowprefetch cpuid_fault epb invpcid_single pti ssbd ibrs ibpb stibp tpr_shadow vnmi
flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm
mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat
pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d

## 2. If your processor supports virtualizations, seek out your distribution’s documentation for
running a KVM hypervisor.
- Install the necessary packages to run a KVM hypervisor.
This will vary depending on your distribution, but here are some starting points:
Ubuntu — https://help.ubuntu.com/lts/serverguide/libvirt.html
Fedora — https://docs.fedoraproject.org/en-US/quick-docs/getting-started-with-virtualization/
Arch Linux — https://wiki.archlinux.org/index.php/KVM
- If you are using a graphical desktop environment, it is recommended to also install the
virt-manager application which is a graphical front-end that can be used on a KVM
installation. This will aid in virtual machine installations and management.
Again, this will vary by distribution. An example using Ubuntu looks like this:

167

$ sudo apt install virt-manager

- Download a Linux distribution ISO image of your choice, and following your distribution’s
documentation create a new virtual machine using this ISO.
This task is easily handled by the virt-manager package. However a virtual machine can
be created from the command-line using the virt-install command. Try both methods to
get an understanding of how virtual machines are deployed.

168

## Topic 103: GNU and Unix Commands

169

### 103.1 Work on the command line
LPIC-1 version 5.0, Exam 101, Objective 103.1
- Use single shell commands and one line command sequences to perform basic tasks on the
command line.
- Use and modify the shell environment including defining, referencing and exporting
environment variables.
- Use and edit command history.
- Invoke commands inside and outside the defined path.
- bash
- echo
- env
- export
- pwd
- set
- unset
- type
- which

170

- man
- uname
- history
- .bash_history
- Quoting

171

### 103.1 Lesson 1

### 103.1 Work on the command line

Newcomers to the world of Linux administration and the Bash shell often feel a bit lost without
the reassuring comforts of a GUI interface. They are used to having right-click access to the visual
cues and contextual information that graphic file manager utilities make available. So it is
important to quickly learn and master the relatively small set of command line tools through
which you can instantly tap into all the data offered by your old GUI — and more.

Getting System Information
While staring at the flashing rectangle of a command line prompt, your first question will
probably be “Where am I?” Or, more precisely, “Where in the Linux filesystem am I right now and
if, say, I created a new file, where would it live?” What you are after here is your present work
directory, and the pwd command will tell you what you want to know:
$ pwd
/home/frank

172

Assuming that Frank is currently logged in to the system and he is now in his home directory:
/home/frank/. Should Frank create an empty file using the touch command without specifying
any other location in the filesystem, the file will be created within /home/frank/. Listing the
directory contents using ls will show us that new file:
$ touch newfile
newfile

Besides your location in the filesystem, you will often want information about the Linux system
you are running. This might include the exact release number of your distribution or the Linux
kernel version that is currently loaded. The uname tool is what you are after here. And, in
particular, uname using the -a (“all”) option.
$ uname -a
Linux base 4.18.0-18-generic #19~18.04.1-Ubuntu SMP Fri Apr 5 10:22:13 UTC 2019 x86_64
x86_64 x86_64 GNU/Linux

Here, uname shows that Frank’s machine has the Linux kernel version 4.18.0 installed and is
running Ubuntu 18.04 on a 64-bit (x86_64) CPU.

Getting Command Information
You will often come across documentation talking about Linux commands with which you are not
yet familiar. The command line itself offers all kinds of helpful information on what commands
do and how to effectively use them. Perhaps the most useful information is found within the many
files of the man system.
As a rule, Linux developers write man files and distribute them along with the utilities they create.
man files are highly structured documents whose contents are intuitively divided by standard
section headings. Typing man followed by the name of a command will give you information that
includes the command name, a brief usage synopsis, a more detailed description, and some
important historical and licensing background. Here is an example:
$ man uname
UNAME(1)

User Commands

UNAME(1)

NAME
uname - print system information
SYNOPSIS
uname [OPTION]...

173

DESCRIPTION
Print certain system information.

With no OPTION, same as -s.

-a, --all
print

all information, in the following order, except omit -p

and -i if unknown:
-s, --kernel-name
print the kernel name
-n, --nodename
print the network node hostname
-r, --kernel-release
print the kernel release
-v, --kernel-version
print the kernel version
-m, --machine
print the machine hardware name
-p, --processor
print the processor type (non-portable)
-i, --hardware-platform
print the hardware platform (non-portable)
-o, --operating-system
print the operating system
--help display this help and exit
--version
output version information and exit
AUTHOR
Written by David MacKenzie.
REPORTING BUGS
GNU coreutils online help: <http://www.gnu.org/software/coreutils/>
Report uname translation bugs to
<http://translationproject.org/team/>
COPYRIGHT
Copyright©2017 Free Software Foundation, Inc. License

GPLv3+: GNU

GPL version 3 or later <http://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
SEE ALSO
arch(1), uname(2)
Full documentation at: <http://www.gnu.org/software/coreutils/uname>
or available locally via: info '(coreutils) uname invocation'
GNU coreutils 8.28

January 2018

UNAME(1)

man only works when you give it an exact command name. If, however, you are not sure about the
name of the command you are after, you can use the apropos command to search through the

174

man page names and descriptions. Assuming, for instance, that you cannot remember that it is
uname that will give you your current Linux kernel version, you can pass the word kernel to
apropros. You will probably get many lines of output, but they should include these:
$ apropos kernel
systemd-udevd-kernel.socket (8) - Device event managing daemon
uname (2)

- get name and information about current kernel

urandom (4)

- kernel random number source devices

If you do not need a command’s full documentation, you can quickly get basic data about a
command using type. This example uses type to query four separate commands at once. The
results show us that cp (“copy”) is a program that lives in /bin/cp and that kill (change the state
of a running process) is a shell builtin — meaning that it is actually a part of the Bash shell itself:
$ type uname cp kill which
uname is hashed (/bin/uname)
cp is /bin/cp
kill is a shell builtin
which is /usr/bin/which

Notice that, besides being a regular binary command like cp, uname is also “hashed.” That is
because Frank recently used uname and, to increase system efficiency, it was added to a hash table
to make it more accessible the next time you run it. If he would run type uname after a system
boot, Frank would find that type once again describes uname as a regular binary.

A quicker way to clean up the hash table is to run the command hash -d.

Sometimes — particularly when working with automated scripts — you will need a simpler source
of information about a command. The which command that our previous type command traced
for us, will return nothing but the absolute location of a command. This example locates both the
uname and which commands.
$ which uname which
/bin/uname
/usr/bin/which

If you want to display information about “builtin” commands, you can use the
help command.

175

Using Your Command History
You will often carefully research the proper usage for a command and successfully run it along
with a complicated trail of options and arguments. But what happens a few weeks later when you
need to run the same command with the same options and arguments but cannot remember the
details? Rather than having to start your research over again from scratch, you will often be able
to recover the original command using history.
Typing history will return the most recent commands you have executed with the most recent of
those appearing last. You can easily search through those commands by piping a specific string to
the grep command. This example will search for any command that included the text
bash_history:
$ history | grep bash_history
1605 sudo find /home -name ".bash_history" | xargs grep sudo

Here a single command is returned along with is sequence number, 1605.
And speaking of bash_history, that is actually the name of a hidden file you should find within
your user’s home directory. Since it is a hidden file (designated as such by the dot that precedes its
filename), it will only be visible by listing the directory contents using ls with the -a argument:
$ ls /home/frank
newfile
$ ls -a /home/frank

..

.bash_history

.bash_logout

.bashrc

.profile

.ssh

newfile

What is in the .bash_history file? Take a look for yourself: you will see hundreds and hundreds
of your most recent commands. You might, however, be surprised to find that some of your most
recent commands are missing. That is because, while they are instantly added to the dynamic
history database, the latest additions to your command history are not written to the
.bash_history file until you exit your session.
You can leverage the contents of history to make your command line experience much faster
and more efficient using the up and down arrow keys on your keyboard. Hitting the up key
multiple times will populate the command line with recent commands. When you get to the one
you would like to execute a second time, you can run it by pressing Enter. This makes it easy to
recall and, if desired, modify commands multiple times during a shell session.

176

## 1. Use the man system to determine how to tell apropos to output a brief command so that it
outputs only a brief usage message and then exits.

2. Use the man system to determine which copyright license is assigned to the grep command.

177

## 1. Identify the hardware architecture and Linux kernel version being used on your computer in
an easy-to-read output format.

## 2. Print out the last twenty lines of the dynamic history database and the .bash_history file to
compare them.

## 3. Use the apropos tool to identify the man page where you will find the command you will need
to display the size of an attached physical block device in bytes rather than megabytes or
gigabytes.

178

- How to get information about your filesystem location and OS software stack.
- How to find help for command usage.
- How to identify the filesystem location and type of command binaries.
- How to find and reuse previously-executed commands.
pwd
Print the path to the current working directory.
uname
Print your system’s hardware architecture, Linux kernel version, distribution, and distribution
release.
man
Access help files documenting command usage.
type
Print the filesystem location and type for one or more commands.
which
Print the filesystem location for a command.
history
Print or reuse commands that you have previously executed.

179

## 1. Use the man system to determine how to tell apropos to output a brief command so that it
outputs only a brief usage message and then exits.
Run man apropos and scroll down through the “Options” section until you get to the --usage
paragraph.
2. Use the man system to determine which copyright license is assigned to the grep command.
Run man grep and scroll down to the “Copyright” section of the document. Note that the
program uses a copyright from the Free Software Foundation.

180

## 1. Identify the hardware architecture and Linux kernel version being used on your computer in
an easy-to-read output format.
Run man uname, read through the “Description” section, and identify the command arguments
that will display only the exact results you want. Note how -v will give you the kernel version
and -i will provide hardware platform.
$ man uname
$ uname -v
$ uname -i

## 2. Print out the last twenty lines of the dynamic history database and the .bash_history file to
compare them.
$ history 20
$ tail -n 20 .bash_history

## 3. Use the apropos tool to identify the man page where you will find the command you will need
to display the size of an attached physical block device in bytes rather than megabytes or
gigabytes.
One way, would be to run apropos with the string block, read through the results, note that
lsblk lists block devices (and would, therefore, be the most likely tool for our needs), run man
lsblk, scroll through the “Description” section and note that -b will display a device size in
bytes. Finally, run lsblk -b to see what comes out.
$ apropos block
$ man lsblk
$ lsblk -b

181

### 103.1 Lesson 2

### 103.1 Work on the command line

An operating system environment includes the basic tools — like command line shells and
sometimes a GUI — that you will need in order to get stuff done. But your environment will also
come with a catalog of shortcuts and preset values. Here is where we will learn how to list, invoke,
and manage those values.

Finding Your Environment Variables
So just how do we identify the current values for each of our environment variables? One way is
through the env command:
$ env
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
XDG_RUNTIME_DIR=/run/user/1000
XAUTHORITY=/run/user/1000/gdm/Xauthority
XDG_CONFIG_DIRS=/etc/xdg/xdg-ubuntu:/etc/xdg
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/game
s:/snap/bin

182

GJS_DEBUG_TOPICS=JS ERROR;JS LOG
[...]

You will get a lot of output — much more than what is included in the above excerpt. But for now
note the PATH entry, which contains the directories where your shell (and other programs) will
look for other programs without having to specify a complete path. With that set, you could run a
binary program that lives, say, in /usr/local/bin from within your home directory and it would
run just as though the file was local.
Let us change the subject for a moment. The echo command will print to the screen whatever you
tell it to. Believe it or not, there will be many times when getting echo to literally repeat
something will be very useful.
$ echo "Hi. How are you?"
Hi. How are you?

But there is something else you can do with echo. When you feed it the name of an environment
variable — and tell it that this is a variable by prefixing the variable name with a $ — then, instead
of just printing the variable’s name, the shell will expand it giving you the value. Not sure whether
your favorite directory is currently in the path? You can quickly check by running it through
echo:
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/sn
ap/bin

Creating New Environment Variables
You can add your own custom variables to your environment. The simplest way is to use the =
character. The string to the left will be the name of your new variable, and the string to the right
will be its value. You can now feed the variable name to echo to confirm it worked:
$ myvar=hello
hello

Notice that there is no space on either side of the equal sign during variable
assignment.

183

But did it really work? Type bash into the terminal to open a new shell. This new shell looks
exactly like the one you were just in, but it is actually a child of the original one (which we call the
parent). Now, inside this new child shell, try to get echo to do its magic the way it did before.
Nothing. What’s going on?
$ bash

A variable you create the way we just did is only going to be available locally — within the
immediate shell session. If you start up a new shell — or close down the session using exit — the
variable will not go along with you. Typing exit here will take you back to your original parent
shell which, right now, is where we want to be. You can run echo $myvar once again if you like
just to confirm that the variable is still valid. Now type export myvar to pass the variable to any
child shells that you may subsequently open. Try it out: type bash for a new shell and then echo:
$ exit
$ export myvar
$ bash
hello

All this may feel a bit silly when we are creating shells for no real purpose. But understanding
how shell variables are propagated through your system will become very important once you
start writing serious scripts.

Deleting Environment Variables
Want to know how to clean up all those ephemeral variables you have created? One way is to
simply close your parent shell — or reboot your computer. But there are simpler ways. Like, for
instance, unset. Typing unset (without the $) will kill the variable. echo will now prove that.
$ unset myvar

If there is an unset command, then you can bet there must be a set command to go with it.

184

Running set by itself will display lots of output, but it is really not all that different from what env
gave you. Look at the first line of output you will get when you filter for PATH:
$ set | grep PATH
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/game
s:/snap/bin
[...]

What is the difference between set and env? For our purposes, the main thing is that set will
output all variables and functions. Let us illustrate that. We will create a new variable called
mynewvar and then confirm it is there:
$ mynewvar=goodbye
$ echo $mynewvar
goodbye

Now, running env while using grep to filter for the string mynewvar will not display any output.
But running set the same way will show us our local variable.
$ env | grep mynewvar
$ set | grep mynewvar
mynewvar=goodbye

Quoting to Escape Special Characters
Now is as good a time as any other to introduce you to the problem of special characters.
Alphanumeric characters (a-z and 0-9) will normally be read literally by Bash. If you try to create
a new file called myfile you would just type touch followed by myfile and Bash will know what
to do with it. But if you want to include a special character in your filename, you will need to do a
bit more work.
To illustrate this, we will type touch and follow it by the title: my big file. The problem is that
there are two spaces there between words which Bash will interpret. While, technically, you
would not call a space a “character,” it is like one in the sense that Bash will not read it literally. If
you list the contents of your current directory, rather than one file called my big file, you will
see three files named, respectively, my, big, and file. That is because Bash thought you wanted to
create multiple files whose names you were passing in a list:

185

$ touch my big file
my big file

The spaces will be interpreted the same way if you delete (rm) the three files all in one command:
$ rm my big file

Now let us try it the right way. Type touch and the three parts of your filename but this time
enclose the name in quotation marks. This time it worked. Listing the directory contents will show
you a single file with the proper name.
$ touch "my big file"
'my big file'

There are other ways to get the same effect. Single quotes, for instance, work just as well as double
quotes. (Note that single quotes will preserve the literal value of all characters, while double
quotes will preserve all characters except for $, `, \ and, on certain cases, !.)
$ rm 'my big file'

Prepending each special character with the backslash will “escape” the specialness of the
character and cause Bash to read it literally.
$ touch my\ big\ file

186

1. Use the export command to add a new directory to your path (this will not survive a reboot).

## 2. Use the unset command to delete the PATH variable. Try running a command (like sudo cat
/etc/shadow) using sudo. What happened? Why? (Exiting your shell will return you to your
original state.)

187

1. Search the internet to find and explore the complete list of special characters.
2. Try running commands using strings made up of special characters and using various methods
to escape them. Are there differences between the way those methods behave?

188

- How to identify your system’s environment variables.
- How to create your own environment variables and export them to other shells.
- How to remove environment variables and how to use both the env and set commands.
- How to escape special characters so Bash will read them literally.
echo
Print input strings and variables.
env
Understand and modify your environment variables.
export
Pass an environment variable to child shells.
unset
Unset values and attributes of shell variables and functions.

189

1. Use the export command to add a new directory to your path (this will not survive a reboot).
You can temporarily add a new directory (perhaps one called myfiles that lives in your home
directory) to your path using export PATH="/home/yourname/myfiles:$PATH". Create a
simple script in the myfiles/ directory, make it executable, and try to run it from a different
directory. These commands assume you’re in your home directory which contains a directory
called myfiles.
$ touch myfiles/myscript.sh
$ echo '#!/bin/bash' >> myfiles/myscript.sh
$ echo 'echo Hello' >> myfiles/myscript.sh
$ chmod +x myfiles/myscript.sh
$ myscript.sh
Hello

## 2. Use the unset command to delete the PATH variable. Try running a command (like sudo cat
/etc/shadow) using sudo. What happened? Why? (Exiting your shell will return you to your
original state.)
Typing unset PATH will erase the current path settings. Trying to invoke a binary without its
absolute address will fail. For that reason, trying to run a command using sudo (which itself is a
binary program located in /usr/bin/sudo) will fail — unless you specify the absolute location,
as in: /usr/bin/sudo /bin/cat /etc/shadow. You can reset your PATH using export or by
simply exiting from the shell.

190

1. Search the internet to find and explore the complete list of special characters.
Here is a list: & ; | * ? " ' [ ] ( ) $ < > { } # / \ ! ~.
2. Try running commands using strings made up of special characters and using various methods
to escape them. Are there differences between the way those methods behave?
Escaping using " characters will preserve the special values of the dollar sign, a backtick, and
the backslash. Escaping using a ' character, on the other hand, will render all characters as
literal.
$ echo "$mynewvar"
goodbye
$ echo '$mynewvar'
$mynewvar

191

### 103.2 Process text streams using filters
LPIC-1 v5, Exam 101, Objective 103.2
- Send text files and output streams through text utility filters to modify the output using
standard UNIX commands found in the GNU textutils package.
- bzcat
- cat
- cut
- head
- less
- md5sum
- nl
- od
- paste
- sed
- sha256sum
- sha512sum
- sort
192

- split
- tail
- tr
- uniq
- wc
- xzcat
- zcat

193

### 103.2 Lesson 1

### 103.2 Process text streams using filters

Dealing with text is a major part of every systems administrator’s job. Doug McIlroy, a member of
the original Unix development team, summarized the Unix philosophy and said (among other
important things): “Write programs to handle text streams, because that is a universal interface.”
Linux is inspired by the Unix operating system and it firmly adopts its philosophy, so an
administrator must expect lots of text manipulation tools within a Linux distribution.

A Quick Review on Redirections and Pipes
Also from the Unix philosophy:
- Write programs that do one thing and do it well.
- Write programs to work together.
One major way of making programs work together is through piping and redirections. Pretty much
all of your text manipulation programs will get text from a standard input (stdin), output it to a
standard output (stdout) and send eventual errors to a standard error output (stderr). Unless you
specify otherwise, the standard input will be what you type on your keyboard (the program will
194

read it after you press the Enter key). Similarly, the standard output and errors will be displayed
in your terminal screen. Let us see how this works.
In your terminal, type cat and then hit the Enter key. Then type some random text.
$ cat
Hey!
Hey!
It is repeating everything I type!
It is repeating everything I type!
(I will hit ctrl+c so I will stop this nonsense)
(I will hit ctrl+c so I will stop this nonsense)

For more information about the cat command (the term comes from “concatenate”) please refer
to the man pages.

If you are working on a really plain installation of a Linux server, some commands
such as info and less might not be available. If this is the case, install these tools
using the proper procedure in your system as described in the corresponding
lessons.

As demonstrated above if you do not specify where cat should read from, it will read from the
standard input (whatever you type) and output whatever it reads to your terminal window (its
standard output).
Now try the following:
$ cat > mytextfile
$ cat mytextfile

The > (greater than) tells cat to direct its output to the mytextfile file, not the standard output.

195

Now try this:
$ cat mytextfile > mynewtextfile
$ cat mynewtextfile

This has the effect of copying mytextfile to mynewtextfile. You can actually verify that these
two files have the same content by performing a diff:
$ diff mynewtextfile mytextfile

As there is no output, the files are equal. Now try the append redirection operator (>>):
$ echo 'This is my new line' >> mynewtextfile
$ diff mynewtextfile mytextfile
4d3
< This is my new line

So far we have used redirections to create and manipulate files. We can also use pipes
(represented by the symbol |) to redirect the output of one program to another program. Let us
find the lines where the word “this” is found:
$ cat mytextfile | grep this
$ cat mytextfile | grep -i this

Now we have piped the output of cat to another command: grep. Notice when we ignore the case
(using the -i option) we get an extra line as a result.

Processing Text Streams

196

Reading a Compressed File
We will create a file called ftu.txt containing a list of the following commands:

Now we will use the grep command to print all of the lines containing the string cat:
$ cat ftu.txt | grep cat

Another way to get this information is to just use the grep command to filter the text directly,
without the need to use another application to send the text stream to stdout.
$ grep cat ftu.txt

197

Remember there are many ways to perform the same task using Linux.

There are other commands that handle compressed files (bzcat for bzip compressed files, xzcat
for xz compressed files and zcat for gzip compressed files) and each one is used to view the
contents of a compressed file based on the compression algorithm used.
Verify that the newly created file ftu.txt is the only one in the directory, then create a gzip
compressed version of the file:
$ gzip ftu.txt
ftu.txt.gz

Next, use the zcat command to view the contents of the gzipped compressed file:
$ zcat ftu.txt.gz

Note that gzip will compress ftu.txt into ftu.txt.gz and it will remove the original file. By
default, no output from the gzip command will be displayed. However, if you do want gzip to tell

198

you what it is doing, use the -v option for the “verbose” output.

Viewing a File in a Pager
You know cat concatenates a file to the standard output (once a file is provided after the
command). The file /var/log/syslog is where your Linux system stores everything important
going on in your system. Using the sudo command to elevate privileges so as to be able to read the
/var/log/syslog file:
$ sudo cat /var/log/syslog

…you will see messages scrolling very fast within your terminal window. You can pipe the output
to the program less so the results will be paginated. By using less you can use the arrow keys to
navigate through the output and also use vi like commands to navigate and search throughout
the text.
However, rather than pipe the cat command into a pagination program it is more pragmatic to
just use the pagination program directly:
$ sudo less /var/log/syslog
... (output omitted for clarity)

Getting a Portion of a Text File
If only the start or end of a file needs to be reviewed, there are other methods available. The
command head is used to read the first ten lines of a file by default, and the command tail is
used to read the last ten lines of a file by default. Now try:
$ sudo head /var/log/syslog
Nov 12 08:04:30 hypatia rsyslogd: [origin software="rsyslogd" swVersion="8.1910.0" xpid="811" x-info="https://www.rsyslog.com"] rsyslogd was HUPed
Nov 12 08:04:30 hypatia systemd[1]: logrotate.service: Succeeded.
Nov 12 08:04:30 hypatia systemd[1]: Started Rotate log files.
Nov 12 08:04:30 hypatia vdr: [928] video directory scanner thread started (pid=882, tid=928,
prio=low)
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'A - ATSC'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'C - DVB-C'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'S - DVB-S'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'T - DVB-T'
Nov 12 08:04:30 hypatia vdr[882]: vdr: no primary device found - using first device!

199

Nov 12 08:04:30 hypatia vdr: [929] epg data reader thread started (pid=882, tid=929,
prio=high)
$ sudo tail /var/log/syslog
Nov 13 10:24:45 hypatia kernel: [ 8001.679238] mce: CPU7: Core temperature/speed normal
Nov 13 10:24:46 hypatia dbus-daemon[2023]: [session uid=1000 pid=2023] Activating via
systemd: service name='org.freedesktop.Tracker1.Miner.Extract' unit='trackerextract.service' requested by ':1.73' (uid=1000 pid=2425 comm="/usr/lib/tracker/trackerminer-fs ")
Nov 13 10:24:46 hypatia systemd[2004]: Starting Tracker metadata extractor...
Nov 13 10:24:47 hypatia dbus-daemon[2023]: [session uid=1000 pid=2023] Successfully
activated service 'org.freedesktop.Tracker1.Miner.Extract'
Nov 13 10:24:47 hypatia systemd[2004]: Started Tracker metadata extractor.
Nov 13 10:24:54 hypatia kernel: [ 8010.462227] mce: CPU0: Core temperature above threshold,
cpu clock throttled (total events = 502907)
Nov 13 10:24:54 hypatia kernel: [ 8010.462228] mce: CPU4: Core temperature above threshold,
cpu clock throttled (total events = 502911)
Nov 13 10:24:54 hypatia kernel: [ 8010.469221] mce: CPU0: Core temperature/speed normal
Nov 13 10:24:54 hypatia kernel: [ 8010.469222] mce: CPU4: Core temperature/speed normal
Nov 13 10:25:03 hypatia systemd[2004]: tracker-extract.service: Succeeded.

To help illustrate the number of lines displayed, we can pipe the output of the head command to
the nl command, which will display the number of lines of text streamed into the command:
$ sudo head /var/log/syslog | nl

Nov 12 08:04:30 hypatia rsyslogd: [origin software="rsyslogd" swVersion="8.1910.0" x-

pid="811" x-info="https://www.rsyslog.com"] rsyslogd was HUPed

Nov 12 08:04:30 hypatia systemd[1]: logrotate.service: Succeeded.

Nov 12 08:04:30 hypatia systemd[1]: Started Rotate log files.

Nov 12 08:04:30 hypatia vdr: [928] video directory scanner thread started (pid=882,

tid=928, prio=low)

Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'A - ATSC'

Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'C - DVB-C'

Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'S - DVB-S'

Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'T - DVB-T'

Nov 12 08:04:30 hypatia vdr[882]: vdr: no primary device found - using first device!

Nov 12 08:04:30 hypatia vdr: [929] epg data reader thread started (pid=882, tid=929,

prio=high)

And we can do the same by piping the output of the tail command to the wc command, which by
default will count the number of words within a document, and using the -l switch to print out
the number of lines of text that the command has read:

200

$ sudo tail /var/log/syslog | wc -l

Should an administrator need to review more (or less) of the beginning or end of a file, the -n
option can be used to limit the commands' output:
$ sudo tail -n 5 /var/log/syslog
Nov 13 10:37:24 hypatia systemd[2004]: tracker-extract.service: Succeeded.
Nov 13 10:37:42 hypatia dbus-daemon[2023]: [session uid=1000 pid=2023] Activating via
systemd: service name='org.freedesktop.Tracker1.Miner.Extract' unit='trackerextract.service' requested by ':1.73' (uid=1000 pid=2425 comm="/usr/lib/tracker/trackerminer-fs ")
Nov 13 10:37:42 hypatia systemd[2004]: Starting Tracker metadata extractor...
Nov 13 10:37:43 hypatia dbus-daemon[2023]: [session uid=1000 pid=2023] Successfully
activated service 'org.freedesktop.Tracker1.Miner.Extract'
Nov 13 10:37:43 hypatia systemd[2004]: Started Tracker metadata extractor.
$ sudo head -n 12 /var/log/syslog
Nov 12 08:04:30 hypatia rsyslogd: [origin software="rsyslogd" swVersion="8.1910.0" xpid="811" x-info="https://www.rsyslog.com"] rsyslogd was HUPed
Nov 12 08:04:30 hypatia systemd[1]: logrotate.service: Succeeded.
Nov 12 08:04:30 hypatia systemd[1]: Started Rotate log files.
Nov 12 08:04:30 hypatia vdr: [928] video directory scanner thread started (pid=882, tid=928,
prio=low)
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'A - ATSC'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'C - DVB-C'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'S - DVB-S'
Nov 12 08:04:30 hypatia vdr: [882] registered source parameters for 'T - DVB-T'
Nov 12 08:04:30 hypatia vdr[882]: vdr: no primary device found - using first device!
Nov 12 08:04:30 hypatia vdr: [929] epg data reader thread started (pid=882, tid=929,
prio=high)
Nov 12 08:04:30 hypatia vdr: [882] no DVB device found
Nov 12 08:04:30 hypatia vdr: [882] initializing plugin: vnsiserver (1.8.0): VDR-NetworkStreaming-Interface (VNSI) Server

The Basics of sed, the Stream Editor
Let us take a look at the other files, terms and utilities that do not have cat in their names. We can
do this by passing the -v option to grep, which instructs the command to output only the lines not
containing cat:
$ zcat ftu.txt.gz | grep -v cat

201

Most of what we can do with grep we can also do with sed — the stream editor for filtering and
transforming text (as stated in the sed manual page). First we will recover our ftu.txt file by
decompressing our gzip archive of the file:
$ gunzip ftu.txt.gz

Now, we can use sed to list only the lines containing the string cat:
$ sed -n /cat/p < ftu.txt

We have used the less-than sign < to direct the contents of the file ftu.txt into into our sed
command. The word enclosed between slashes (i.e. /cat/) is the term we are searching for. The
-n option instructs sed to produce no output (unless the ones later instructed by the p command).
Try running this same command without the -n option to see what happens. Then try this:
$ sed /cat/d < ftu.txt

202

If we do not use the -n option, sed will print everything from the file except for what the d
instructs sed to delete from its output.
A common use of sed is to find and replace text within a file. Suppose you want to change every
occurrence of cat to dog. You can use sed to do this by supplying the s option to swap out each
instance of the first term, cat, for the second term, dog:
$ sed s/cat/dog/ < ftu.txt
bzdog
dog
xzdog

203

zdog

Rather than using a redirection operator (<) to pass the ftu.txt file into our sed command, we
can just have the sed command operate on the file directly. We will try that next, while
simultaneously creating a backup of the original file:
$ sed -i.backup s/cat/dog/ ftu.txt

ftu.txt.backup

The -i option will perform an in-place sed operation on your original file. If you do not use the
.backup after the -i parameter, you would just have rewritten your original file. Whatever you
use as text after the -i parameter will be the name the original file will be saved to prior to the
modifications you asked sed to perform.

Ensuring Data Integrity
We have demonstrated how easy it is to manipulate files in Linux. There are times where you may
wish to distribute a file to someone else, and you want to be sure that the recipient ends up with a
true copy of the original file. A very common use of this technique is practiced when Linux
distribution servers host downloadable CD or DVD images of their software along with files that
contain the calculated checksum values of those disc images. Here is an example listing from a
Debian download mirror:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PARENTDIR] Parent Directory

MD5SUMS

2019-09-08 17:46 274

MD5SUMS.sign

SHA1SUMS

2019-09-08 17:46 306

SHA1SUMS.sign

SHA256SUMS

2019-09-08 17:46 402

SHA256SUMS.sign

SHA512SUMS

2019-09-08 17:46 658

SHA512SUMS.sign

debian-10.1.0-amd64-netinst.iso

2019-09-08 04:37 335M

debian-10.1.0-amd64-xfce-CD-1.iso

2019-09-08 04:38 641M

debian-edu-10.1.0-amd64-netinst.iso

2019-09-08 04:38 405M

debian-mac-10.1.0-amd64-netinst.iso

2019-09-08 04:38 334M

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

204

In the listing above, the Debian installer image files are accompanied by text files that contain
checksums of the files from the various algorithms (MD5, SHA1, SHA256 and SHA512).

A checksum is a value derived from a mathematical computation, based on a
cryptographic hash function, against a file. There are different types of
cryptographic hash functions that vary in strength. The exam will expect you to be
familiar with using md5sum, sha256sum and sha512sum.

Once you download a file (for example, the debian-10.1.0-amd64-netinst.iso image) you
would then compare the checksum of the file that was downloaded against a checksum value that
was provided for you.
Here is an example to illustrate the point. We will calculate the SHA256 value of the ftu.txt file
using the sha256sum command:
$ sha256sum ftu.txt
345452304fc26999a715652543c352e5fc7ee0c1b9deac6f57542ec91daf261c

The long string of characters preceding the file name is the SHA256 checksum value of this text
file. Let us create a file that contains that value, so that we can use it to verify the integrity of our
original text file. We can do this with the same sha256sum command and redirect the output to a
file:
$ sha256sum ftu.txt > sha256.txt

Now, to verify the ftu.txt file, we just use the same command and supply the filename that
contains our checksum value along with the -c switch:
$ sha256sum -c sha256.txt
ftu.txt: OK

The value contained within the file matches the calculated SHA256 checksum for our ftu.txt
file, just as we would expect. However, if the original file were modified (such as a few bytes lost
during a file download, or someone had deliberately tampered with it) the value check would fail.
In such cases we know that our file is bad or corrupted, and we can not trust the integrity of its
contents. To prove the point, we will add some text at the end of the file:
$ echo "new entry" >> ftu.txt

205

Now we will make an attempt to verify the file’s integrity:
$ sha256sum -c sha256.txt
ftu.txt: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match

And we see that the checksum does not match what was expected for the file. Therefore, we could
not trust the integrity of this file. We could attempt to download a new copy of a file, report the
failure of the checksum to the sender of the file, or report it to a data center security team
depending on the importance of the file.

Looking Deeper into Files
The octal dump (od) command is often used for debugging applications and various files. By itself,
the od command will just list out a file’s contents in octal format. We can use our ftu.txt file
from earlier to practice with this command:
$ od ftu.txt
0000000 075142 060543 005164 060543 005164 072543 005164 062550
0000020 062141 066012 071545 005163 062155 071465 066565 067012
0000040 005154 062157 070012 071541 062564 071412 062145 071412
0000060 060550 032462 071466 066565 071412 060550 030465 071462
0000100 066565 071412 071157 005164 070163 064554 005164 060564
0000120 066151 072012 005162 067165 070551 073412 005143 075170
0000140 060543 005164 061572 072141 000012
0000151

The first column of output is the byte offset for each line of output. Since od prints out information
in octal format by default, each line begins with the byte offset of eight bits, followed by eight
columns, each containing the octal value of the data within that column.

Recall that a byte is 8 bits in length.

Should you need to view a file’s contents in hexadecimal format, use the -x option:
$ od -x ftu.txt
0000000 7a62 6163 0a74 6163 0a74 7563 0a74 6568
0000020 6461 6c0a 7365 0a73 646d 7335 6d75 6e0a
0000040 0a6c 646f 700a 7361 6574 730a 6465 730a
0000060 6168 3532 7336 6d75 730a 6168 3135 7332
0000100 6d75 730a 726f 0a74 7073 696c 0a74 6174

206

0000120 6c69 740a 0a72 6e75 7169 770a 0a63 7a78
0000140 6163 0a74 637a 7461 000a
0000151

Now each of the eight columns after the byte offset are represented by their hexadecimal
equivalents.
One handy use of the od command is for debugging scripts. For example, the od command can
show us characters that are not normally seen that exist within a file, such as newline entries. We
can do this with the -c option, so that instead of displaying the numerical notation for each byte,
these column entries will instead be shown as their character equivalents:
$ od -c ftu.txt
0000000

b

0000020

0000040

0000060

0000100

0000120

q

0000140

0000151

All of the newline entries within the file are represented by the hidden \n characters. If you just
want to view all of the characters within a file, and do not need to see the byte offset information,
the byte offset column can be removed from the output like so:
$ od -An -c ftu.txt
b

q

207

## 1. Someone just donated a laptop to your school and now you wish to install Linux on it. There is
no manual and you were forced to boot it from a USB thumb drive with no graphics
whatsoever. You do get a shell terminal and you know, for every processor you have there will
be a line for it in the /proc/cpuinfo file:

: 0

(lines skipped)

: 1

(more lines skipped)

- Using the commands grep and wc display how many processors you have.

- Do the same thing with sed instead of grep.
