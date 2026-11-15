---
id: lpi-101-500-02
title: "LPIC-1 · 101-500 — On a disk formatted with the MBR partitioning scheme, which is…"
slug: lpi-101-500-02-lpic-1-101-500-on-a-disk-formatted-with-the-mbr-partitioning
source: "LPI Learning Material — LPIC-1 (Exam 101-500)"
sourceSection: "3. On a disk formatted with the MBR partitioning scheme, which is the ID of the EFI System, 1. What is the smallest unit inside of a Volume Group?, 5. Extended, 1. Imagine a user configuring GRUB Legacy to boot from the second partition of the first disk. He, 2. Imagine you have a disk identified as"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "In this lesson you learned about partitioning, which directories are usually kept in separate Covers 23 sections: On a disk formatted with the MBR partitioning scheme, which is the ID of the EFI System, What is the smallest unit insid."
---
# LPIC-1 · 101-500 — On a disk formatted with the MBR partitioning scheme, which is…

## 3. On a disk formatted with the MBR partitioning scheme, which is the ID of the EFI System
Partition?

4. Besides swap partitions, how can you quickly increase swap space on a Linux system?

In this lesson you learned about partitioning, which directories are usually kept in separate
partitions and why this is done. Also, we discussed an overview of LVM (Logical Volume
Management) and how it can offer a more flexible way to allocate your data and disk space
compared to traditional partitioning.
The following files, terms and utilities have been discussed:
The Linux root filesystem.
/var
The standard location for “variable data”, data that can shrink and grow over time.
/home
The standard parent directory for home directories of regular users on a system.
/boot
The standard location for the boot loader files, Linux kernel and initial RAM disk.
EFI System Partition (ESP)
Used by systems that have UEFI implemented for the storage of the system’s boot files.
Swap space
Used to swap out kernel memory pages when RAM is heavily used.
Mount points
Directory locations where a device (such as a hard disk) will be mounted to.
Partitions
Divisions on a hard disk.

1. On Linux systems, where are the files for the GRUB bootloader stored?
Under /boot/grub.
2. Where should the boot partition end to ensure that a PC will always be able to load the kernel?
Before cylinder 1024.
3. Where is the EFI partition usually mounted?
Under /boot/efi.
4. When manually mounting a filesystem, under which directory should it usually be mounted?
Under /mnt. However, this is not mandatory. You can mount a partition under any directory
you want.

## 1. What is the smallest unit inside of a Volume Group?
Volume Groups are subdivided into extents.
2. How is the size of a Logical Volume defined?
By the size of the physical extents multiplied by the number of extents on the volume.
3. On a disk formatted with the MBR partitioning scheme, which is the ID of the EFI System
Partition?
The ID is 0xEF.
4. Besides swap partitions, how can you quickly increase swap space on a Linux system?
Swap files can be used.

### 102.2 Install a boot manager
LPIC-1 v5, Exam 101, Objective 102.2
- Providing alternative boot locations and backup boot options.
- Install and configure a boot loader such as GRUB Legacy.
- Perform basic configuration changes for GRUB 2.
- Interact with the boot loader.
- menu.lst, grub.cfg and grub.conf
- grub-install
- grub-mkconfig
- MBR

### 102.2 Lesson 1

### 102.2 Install a boot manager

When a computer is powered on the first software to run is the boot loader. This is a piece of code
whose sole purpose is to load an operating system kernel and hand over control to it. The kernel
will load the necessary drivers, initialize the hardware and then load the rest of the operating
system.
GRUB is the boot loader used on most Linux distributions. It can load the Linux kernel or other
operating systems, such as Windows, and can handle multiple kernel images and parameters as
separate menu entries. Kernel selection at boot is done via a keyboard-driven interface, and there
is a command-line interface for editing boot options and parameters.
Most Linux distributions install and configure GRUB (actually, GRUB 2) automatically, so a regular
user does not need to think about that. However, as a system administrator, it is vital to know how
to control the boot process so you can recover the system from a boot failure after a failed kernel
upgrade, for example.
In this lesson you will learn about how to install, configure and interact with GRUB.

GRUB Legacy vs. GRUB 2
The original version of GRUB (Grand Unified Bootloader), now known as GRUB Legacy was
developed in 1995 as part of the GNU Hurd project, and later was adopted as the default boot
loader of many Linux distributions, replacing earlier alternatives such as LILO.
GRUB 2 is a complete rewrite of GRUB aiming to be cleaner, safer, more robust, and more
powerful. Among the many advantages over GRUB Legacy are a much more flexible configuration
file (with many more commands and conditional statements, similar to a scripting language), a
more modular design and better localization/internationalization.
There is also support for themes and graphical boot menus with splash screens, the ability to boot
LiveCD ISOs directly from the hard drive, better support for non-x86 architectures, universal
support for UUIDs (making it easier to identify disks and partitions) and much more.
GRUB Legacy is no longer under active development (the last release was 0.97, in 2005), and today
most major Linux distributions install GRUB 2 as the default boot loader. However, you may still
find systems using GRUB Legacy, so it is important to know how to use it and where it is different
from GRUB 2.

Where is the Bootloader?
Historically, hard disks on IBM PC compatible systems were partitioned using the MBR
partitioning scheme, created in 1982 for IBM PC-DOS (MS-DOS) 2.0.
In this scheme, the first 512-byte sector of the disk is called the Master Boot Record and contains a
table describing the partitions on the disk (the partition table) and also bootstrap code, called a
bootloader.
When the computer is turned on, this very minimal (due to size restrictions) bootloader code is
loaded, executed and passes control to a secondary boot loader on disk, usually located in a 32 KB
space between the MBR and the first partition, which in turn will load the operating system(s).
On an MBR-partitioned disk, the boot code for GRUB is installed to the MBR. This loads and passes
control to a “core” image installed between the MBR and the first partition. From this point, GRUB
is capable of loading the rest of the needed resources (menu definitions, configuration files and
extra modules) from disk.
However, MBR has limitations on the number of partitions (originally a maximum of 4 primary
partitions, later a maximum of 3 primary partitions with 1 extended partition subdivided into a
number of logical partitions) and maximum disk sizes of 2 TB. To overcome these limitations a
new partitioning scheme called GPT (GUID Partition Table), part of the UEFI (Unified Extensible

Firmware Interface) standard, was created.
GPT-partitioned disks can be used either with computers with the traditional PC BIOS or ones with
UEFI firmware. On machines with a BIOS, the second part of GRUB is stored in a special BIOS boot
partition.
On systems with UEFI firmware, GRUB is loaded by the firmware from the files grubia32.efi
(for 32-Bit systems) or grubx64.efi (for 64-Bit systems) from a partition called the ESP (EFI
System Partition).

The /boot Partition
On Linux the files necessary for the boot process are usually stored on a boot partition, mounted
under the root file system and colloquially referred to as /boot.
A boot partition is not needed on current systems, as boot loaders such as GRUB can usually
mount the root file system and look for the needed files inside a /boot directory, but it is good
practice as it separates the files needed for the boot process from the rest of the filesystem.
This partition is usually the first one on the disk. This is because the original IBM PC BIOS
addressed disks using Cylinders, Heads and Sectors (CHS), with a maximum of 1024 cylinders, 256
heads and 63 sectors, resulting in a maximum disk size of 528 MB (504 MB under MS-DOS). This
means that anything past this mark would not be accessible, unless a different disk addressing
scheme (like LBA, Logical Block Addressing) was used.
So for maximum compatibility, the /boot partition is usually located at the start of the disk and
ends before cylinder 1024 (528 MB), ensuring that the machine will always be able to load the
kernel. The recommended size for this partition on a current machine is 300 MB.
Other reasons for a separate /boot partition are encryption and compression since some methods
may not be supported by GRUB 2 yet, or if you need to have the system root partition (/)
formatted using an unsupported file system.

Contents of the Boot Partition
The contents of the /boot partition may vary with system architecture or the boot loader in use,
but on a x86-based system you will usually find the files below. Most of these are named with a
-VERSION suffix, where -VERSION is the version of the corresponding Linux kernel. So, for
example, a configuration file for the Linux kernel version 4.15.0-65-generic would be called
config-4.15.0-65-generic.

Config file
This file, usually called config-VERSION (see example above), stores configuration parameters
for the Linux kernel. This file is generated automatically when a new kernel is compiled or
installed and should not be directly modified by the user.
System map
This file is a look-up table matching symbol names (like variables or functions) to their
corresponding position in memory. This is useful when debugging a kind of system failure
known as a kernel panic, as it allows the user to know which variable or function was being
called when the failure occurred. Like the config file, the name is usually System.mapVERSION (e.g. System.map-4.15.0-65-generic).
Linux kernel
This is the operating system kernel proper. The name is usually vmlinux-VERSION (e.g.
vmlinux-4.15.0-65-generic). You may also find the name vmlinuz instead of vmlinux, the
z at the end meaning that the file has been compressed.
Initial RAM disk
This is usually called initrd.img-VERSION and contains a minimal root file system loaded
into a RAM disk, containing utilities and kernel modules needed so the kernel can mount the
real root filesystem.
Boot loader related files
On systems with GRUB installed, these are usually located on /boot/grub and include the
GRUB configuration file (/boot/grub/grub.cfg for GRUB 2 or /boot/grub/menu.lst in case
of
GRUB
Legacy),
modules
(in
/boot/grub/i386-pc),
translation
files
(in
/boot/grub/locale) and fonts (in /boot/grub/fonts).

GRUB 2
Installing GRUB 2
GRUB 2 can be installed using the grub-install utility. If you have a non-booting system you will
need to boot using a Live CD or rescue disc, find out which is the boot partition for your system,
mount it and then run the utility.

The commands below assume that you are logged in as root. If not, first run sudo
su - to “become” root. When finished, type exit to log out and return to a regular
user.

The first disk on a system is usually the boot device and you may need to know whether there is a
boot partition on the disk. This can be done with the fdisk utility. To list all the partitions on the
first disk of your machine, use:
Disk /dev/sda: 111,8 GiB, 120034123776 bytes, 234441648 sectors
Disk identifier: 0x97f8fef5

Sectors

2000895

1998848

976M 83 Linux

/dev/sda2

2002942 234440703 232437762 110,9G

/dev/sda5

2002944

/dev/sda6

18010112 234440703 216430592 103,2G 83 Linux

18008063

16005120

## 5. Extended

7,6G 82 Linux swap / Solaris

The boot partition is identified with the * under the boot column. In the example above, it is
/dev/sda1.
Now, create a temporary directory under /mnt and mount the partition under it:

Then run grub-install, pointing it to the boot device (not the partition) and the directory where
the boot partition is mounted. If your system does have a dedicated boot partition, the command
is:

If you are installing to a system which does not have a boot partition, but just a /boot directory
on the root filesystem, point grub-install to it. So, the command is:

Configuring GRUB 2
The default configuration file for GRUB 2 is /boot/grub/grub.cfg. This file is automatically
generated and manual editing is not recommended. To make changes to the GRUB configuration,
you need to edit the file /etc/default/grub and then run the update-grub utility to generate a
compliant file.

update-grub is usually a shortcut to grub-mkconfig -o /boot/grub/grub.cfg,
so they produce the same results.

There are some options in the file /etc/default/grub that control the behaviour of GRUB 2, like
the default kernel to boot, timeout, extra command line parameters, etc. The most important ones
GRUB_DEFAULT=
The default menu entry to boot. This can be a numeric value (like 0, 1, etc.), the name of a
menu entry (like debian) or saved, which is used in conjunction with GRUB_SAVEDEFAULT=,
explained below. Keep in mind that menu entries start at zero, so the first menu entry is 0, the
second is 1, etc.
GRUB_SAVEDEFAULT=
If this option is set to true and GRUB_DEFAULT= is set to saved, then the default boot option
will always be the last one selected in the boot menu.
GRUB_TIMEOUT=
The timeout, in seconds, before the default menu entry is selected. If set to 0 the system will
boot the default entry without showing a menu. If set to -1 the system will wait until the user
selects an option, no matter how long it takes.
GRUB_CMDLINE_LINUX=
This lists command line options that will be added to entries for the Linux kernel.
GRUB_CMDLINE_LINUX_DEFAULT=
By default, two menu entries are generated for each Linux kernel, one with the default options
and one entry for recovery. With this option you can add extra parameters that will be added
only to the default entry.
GRUB_ENABLE_CRYPTODISK=
If set to y, commands like grub-mkconfig, update-grub and grub-install will look for
encrypted disks and add the commands needed to access them during boot. This disables
automatic booting (GRUB_TIMEOUT= with any value other than -1) because a passphrase is

needed to decrypt the disks before they can be accessed.

Managing Menu Entries
When update-grub is run, GRUB 2 will scan for kernels and operating systems on the machine
and generate the corresponding menu entries on the /boot/grub/grub.cfg file. New entries can
be manually added to the script files within the /etc/grub.d directory.
These files should be executable, and are processed in numerical order by update-grub.
Therefore 05_debian_theme is processed before 10_linux and so on. Custom menu entries are
usually added to the 40_custom file.
The basic syntax for a menu entry is shown below:
set root=(hd0,1)

The first line always starts with menuentry and ends with {. The text between quotes will be
shown as the entry label on the GRUB 2 boot menu.
The set root parameter defines the disk and partition where the root file system for the
operating system is located. Please note that on GRUB 2 disks are numbered from zero, so hd0 is
the first disk (sda under Linux), hd1 the second, and so on. Partitions, however, are numbered
starting from one. In the example above the root file system is located at the first disk (hd0), first
partition (,1), or sda1.
Instead of directly specifying the device and partition you can also have GRUB 2 search for a file
system with a specific label or UUID (Universally Unique Identifier). For that, use the parameter
search --set=root followed by the --label parameter and file system label to search for, or
--fs-uuid followed by the UUID of the file system.
You can find the UUID of a filesystem with the command below:
$ ls -l /dev/disk/by-uuid/
total 0

4 08:40 3e0b34e2-949c-43f2-90b0-25454ac1595d -> ../../sda5

4 08:40 428e35ee-5ad5-4dcb-adca-539aba6c2d84 -> ../../sda6

5 19:10 56C11DCC5D2E1334 -> ../../sdb1

4 08:40 ae71b214-0aec-48e8-80b2-090b6986b625 -> ../../sda1

In the example above, the UUID for /dev/sda1 is ae71b214-0aec-48e8-80b2-090b6986b625.
Should you wish to set it as the root device for GRUB 2, the command would be search
--set=root --fs-uuid ae71b214-0aec-48e8-80b2-090b6986b625.
When using the search command it is common to add the --no-floppy parameter so GRUB will
not waste time searching on floppy disks.
The linux line indicates where the kernel for the operating system is located (in this case, the
vmlinuz file at the root of the file system). After that, you can pass command line parameters to
the kernel.
In the example above we specified the root partition (root=/dev/sda1) and passed three kernel
parameters: the root partition should be mounted read-only (ro), most of the log messages should
be disabled (quiet) and a splash screen should be shown (splash).
The initrd line indicates where the initial RAM disk is located. In the example above the file is
initrd.img, located at the root of the file system.

Most Linux distributions do not actually put the kernel and initrd at the root
directory of the root file system. Instead, these are links to the actual files inside the
/boot directory or partition.

The last line of a menu entry should contain only the character }.

Interacting with GRUB 2
When booting a system with GRUB 2 you will see a menu of options. Use the arrow keys to select
an option and Enter to confirm and boot the selected entry.

If you see just a countdown, but not a menu, press Shift to bring up the menu.

To edit an option, select it with the arrow keys and press E . This will show an editor window with
the contents of the menuentry associated with that option, as defined in /boot/grub/grub.cfg.
After editing an option, type Ctrl + X or F10 to boot, or Esc to return to the menu.
To enter the GRUB 2 shell, press C on the menu screen (or Ctrl + C ) on the editing window). You will
see a command prompt like this: grub >
Type help to see a list of all available commands, or press Esc to exit the shell and return to the
menu screen.

Remember this menu will not appear if GRUB_TIMEOUT is set to 0 in
/etc/default/grub.

Booting from the GRUB 2 Shell
You can use the GRUB 2 shell to boot the system in case a misconfiguration in a menu entry causes
it to fail.
The first thing you should do is find out where the boot partition is. You can do that with the
command ls, which will show you a list of the partitions and disks GRUB 2 has found.
grub> ls
(proc) (hd0) (hd0,msdos1)

In the example above, things are easy. There is only one disk (hd0) with only one partition on it:
(hd0,msdos1).
The disks and partitions listed will be different in your system. In our example the first partition
of hd0 is called msdos1 because the disk was partitioned using the MBR partitioning scheme. If it
were partitioned using GPT, the name would be gpt1.
To boot Linux, we need a kernel and initial RAM disk (initrd). Let us check the contents of
(hd0,msdos1):
grub> ls (hd0,msdos1)/
lost+found/ swapfile etc/ media/ bin/ boot/ dev/ home/ lib/ lib64/ mnt/ opt/ proc/ root/
run/ sbin/ srv/ sys/ tmp/ usr/ var/ initrd.img initrd.img.old vmlinuz cdrom/

You can add the -l parameter to ls to get a long listing, similar to what you would get on a Linux
terminal. Use Tab to autocomplete disk, partition and file names.
Note that we have a kernel (vmlinuz) and initrd (initrd.img) images right on the root directory.
If not, we could check the contents of /boot with list (hd0,msdos1)/boot/.
Now, set the boot partition:
grub> set root=(hd0,msdos1)

Load the Linux kernel with the linux command, followed by the path to the kernel and the root=
option to tell the kernel where the root filesystem for the operating system is located.

grub> linux /vmlinuz root=/dev/sda1

Load the initial RAM disk with initrd, followed by the full path to the initrd.img file:
grub> initrd /initrd.img

Now, boot the system with boot.

Booting from the Rescue Shell
In case of a boot failure GRUB 2 may load a rescue shell, a simplified version of the shell we
mentioned before. You will recognize it by the command prompt, which displays as grub
rescue>.
The process to boot a system from this shell is almost the same as shown before. However, you
will need to load a few GRUB 2 modules to make things work.
After finding out which partition is the boot partition (with ls, as shown before), use the set
prefix= command, followed by the full path to the directory containing the GRUB 2 files. Usually
/boot/grub. In our example:
grub rescue> set prefix=(hd0,msdos1)/boot/grub

Now, load the modules normal and linux with the insmod command:
grub rescue> insmod normal
grub rescue> insmod linux

Next, set the boot partition with set root= as directed before, load the linux kernel (with linux),
the initial RAM disk (initrd) and try to boot with boot.

GRUB Legacy
Installing GRUB Legacy from a Running System
To install GRUB Legacy on a disk from a running system we will use the grub-install utility.
The basic command is grub-install DEVICE where DEVICE is the disk where you wish to install
GRUB Legacy. An example would be /dev/sda.

Note that you need to specify the device where GRUB Legacy will be installed, like /dev/sda/, not
the partition as in /dev/sda1.
By default GRUB will copy the needed files to the /boot directory on the specified device. If you
wish to copy them to another directory, use the --boot-directory= parameter, followed by the
full path to where the files should be copied to.

Installing GRUB Legacy from a GRUB Shell
If you cannot boot the system for some reason and need to reinstall GRUB Legacy, you can do so
from the GRUB shell on a GRUB Legacy boot disk.
From the GRUB shell (type c at the boot menu to get to the grub> prompt), the first step is to set
the boot device, which contains the /boot directory. For example, if this directory is in the first
partition of the first disk, the command would be:
grub> root (hd0,0)

If you do not know which device contains the /boot directory, you can ask GRUB to search for it
with the find command, like below:
grub> find /boot/grub/stage1
(hd0,0)

Then, set the boot partition as instructed above and use the setup command to install GRUB
Legacy to the MBR and copy the needed files to the disk:
grub> setup (hd0)

When finished reboot the system and it should boot normally.

Configuring GRUB Legacy Menu Entries and Settings
GRUB Legacy menu entries and settings are stored in the file /boot/grub/menu.lst. This is a
simple text file with a list of commands and parameters, which can be edited directly with your
favourite text editor.

Lines starting with # are considered comments, and blank lines are ignored.
A menu entry has at least three commands. The first one, title, sets the title of the operating
system on the menu screen. The second one, root, tells GRUB Legacy which device or partition to
boot from.
The third entry, kernel, specifies the full path to the kernel image that should be loaded when the
corresponding entry is selected. Note that this path is relative to the device specified on the root
parameter.
A simple example follows:
title My Linux Distribution
root (hd0,0)

Unlike GRUB 2, in GRUB Legacy both disks and partitions are numbered from zero. So, the
command root (hd0,0) will set the boot partition as the first partition (0) of the first disk (hd0).
You can omit the root statement if you specify the boot device before the path on the kernel
command. The syntax is the same, so:
kernel (hd0,0)/vmlinuz root=dev/hda1

is equivalent to:
root (hd0,0)

Both will load the file vmlinuz from the root directory (/) of the first partition of the first disk
(hd0,0).
The parameter root=/dev/hda1 after the kernel command tells the Linux kernel which
partition should be used as the root filesystem. This is a Linux kernel parameter, not a GRUB
Legacy command.

To learn more about kernel parameters, see https://www.kernel.org/doc/html/v4.14/
admin-guide/kernel-parameters.html.

You may need to specify the location of the initial RAM Disk image for the operating system with
the initrd parameter. The full path to the file can be specified like in the kernel parameter, and
you can also specify a device or partition before the path, e.g.:
title My Linux Distribution
root (hd0,0)

GRUB Legacy has a modular design, where modules (usually stored as .mod files in
/boot/grub/i386-pc) can be loaded to add extra features, like support for unusual hardware,
filesystems or new compression algorithms.
Modules are loaded using the module command, followed by the full path to the corresponding
.mod file. Keep in mind that, like kernels and initrd images, this path is relative to the device
specified in the root command.
The example below will load the module 915resolution, needed to correctly set the framebuffer
resolution on systems with Intel 800 or 900 series video chipsets.
module /boot/grub/i386-pc/915resolution.mod

Chainloading other Operating Systems
GRUB Legacy can be used to load unsupported operating systems, like Windows, using a process
called chainloading. GRUB Legacy is loaded first, and when the corresponding option is selected
the bootloader for the desired system is loaded.
A typical entry for chainloading Windows would look like the one below:
title Windows XP
root (hd0,1)
makeactive
chainload +1
boot

Let us walk through each parameter. As before, root (hd0,1) specifies the device and partition
where the boot loader for the operating system we wish to load is located. In this example, the

second partition of the first disk.
makeactive
will set a flag indicating that this is an active partition. This only works on DOS primary
partitions.
chainload +1
tells GRUB to load the first sector of the boot partition. This is where bootloaders are usually
located.
boot
will run the bootloader and load the corresponding operating system.

1. What is the default location for the GRUB 2 configuration file?

2. What are the steps needed to change the settings for GRUB 2?

3. Into which file should custom GRUB 2 menu entries be added?

4. Where are the menu entries for GRUB Legacy stored?

5. From a GRUB 2 or GRUB Legacy menu, how can you enter the GRUB Shell?

## 1. Imagine a user configuring GRUB Legacy to boot from the second partition of the first disk. He
writes the following custom menu entry:
title My Linux Distro
root (hd0,2)

However, the system will not boot. What is wrong?

## 2. Imagine you have a disk identified as /dev/sda with multiple partitions. Which command can
be used to find out which is the boot partition on a system?

3. Which command can be used to find out the UUID of a partition?

## 4. Consider the following entry for GRUB 2
set root=(hd0,1)

Change it so the system will boot from a disk with the UUID 5dda0af3-c995-481a-a6f346dcd3b6998d

5. How can you set GRUB 2 to wait for 10 seconds before booting the default menu entry?

## 6. From a GRUB Legacy shell, what are the commands to install GRUB to the first partition of the
second disk?

In this lesson we learned
- What is a boot loader.
- The differences between GRUB Legacy and GRUB 2.
- What is a boot partition, and what are its contents.
- How to install GRUB Legacy and GRUB 2.
- How to configure GRUB Legacy and GRUB 2.
- How to add custom menu entries to GRUB Legacy and GRUB 2.
- How to interact with the menu screen and console of GRUB Legacy and GRUB 2.
- How to boot a system from a GRUB Legacy or GRUB 2 shell or rescue shell.
- grub-install
- update-grub
- grub-mkconfig

## 1. What is the default location for the GRUB 2 configuration file?
/boot/grub/grub.cfg
2. What are the steps needed to change the settings for GRUB 2?
Make your changes to the file /etc/default/grub, then update the configuration with
update-grub.
3. Into which file should custom GRUB 2 menu entries be added?
/etc/grub.d/40_custom
4. Where are the menu entries for GRUB Legacy stored?
/boot/grub/menu.lst
5. From a GRUB 2 or GRUB Legacy menu, how can you enter the GRUB Shell?
Press c in the menu screen.

## 1. Imagine a user configuring GRUB Legacy to boot from the second partition of the first disk. He
writes the following custom menu entry:
title My Linux Distro
root (hd0,2)

However, the system will not boot. What is wrong?
The boot partition is wrong. Remember that, unlike GRUB 2, GRUB Legacy counts the partitions
from zero. So, the correct command for the second partition of the first disk should be root
(hd0,1).
2. Imagine you have a disk identified as /dev/sda with multiple partitions. Which command can
be used to find out which is the boot partition on a system?
Use fdisk -l /dev/sda. The boot partition will be marked with an asterisk (*) in the listing.
3. Which command can be used to find out the UUID of a partition?
Use ls -la /dev/disk/by-uuid/ and look for the UUID that points to the partition.
4. Consider the following entry for GRUB 2
set root=(hd0,1)

Change it so the system will boot from a disk with the UUID 5dda0af3-c995-481a-a6f346dcd3b6998d
You will need to change the set root statement. Instead of specifying a disk and partition, tell
grub to search for the partition with the desired UUID.
search --set=root --fs-uuid 5dda0af3-c995-481a-a6f3-46dcd3b6998d

5. How can you set GRUB 2 to wait for 10 seconds before booting the default menu entry?
Add the parameter GRUB_TIMEOUT=10 to /etc/default/grub.
6. From a GRUB Legacy shell, what are the commands to install GRUB to the first partition of the
second disk?
grub> root (hd1,0)
grub> setup (hd1)

### 102.3 Manage shared libraries
LPIC-1 v5, Exam 101, Objective 102.3
- Identify shared libraries.
- Identify the typical locations of system libraries.
- Load shared libraries.
- ldd
- ldconfig
- /etc/ld.so.conf
- LD_LIBRARY_PATH

### 102.3 Lesson 1

### 102.3 Manage shared libraries

In this lesson we will be discussing shared libraries, also known as shared objects: pieces of
compiled, reusable code like functions or classes, that are recurrently used by various programs.
To start with, we will explain what shared libraries are, how to identify them and where they are
found. Next, we will go into how to configure their storage locations. Finally, we will show how to
search for the shared libraries on which a particular program depends.

Concept of Shared Libraries
Similar to their physical counterparts, software libraries are collections of code that are intended
to be used by many different programs; just as physical libraries keep books and other resources
to be used by many different people.
To build an executable file from a program’s source code, two important steps are necessary. First,
the compiler turns the source code into machine code that is stored in so-called object files.
Secondly, the linker combines the object files and links them to libraries in order to generate the

final executable file. This linking can be done statically or dynamically. Depending on which
method we go for, we will be talking about static libraries or, in case of dynamic linking, about
shared libraries. Let us explain their differences.
Static libraries
A static library is merged with the program at link time. A copy of the library code is embedded
into the program and becomes part of it. Thus, the program has no dependencies on the library
at run time because the program already contains the libraries code. Having no dependencies
can be seen as an advantage since you do not have to worry about making sure the used
libraries are always available. On the downside, statically linked programs are heavier.
Shared (or dynamic) libraries
In the case of shared libraries, the linker simply takes care that the program references
libraries correctly. The linker does, however, not copy any library code into the program file.
At run time, though, the shared library must be available to satisfy the program’s
dependencies. This is an economical approach to managing system resources as it helps reduce
the size of program files and only one copy of the library is loaded in memory, even when it is
used by multiple programs.

Shared Object File Naming Conventions
The name of a shared library, also known as soname, follows a pattern which is made up of three
elements:
- Library name (normally prefixed by lib)
- so (which stands for “shared object”)
- Version number of the library
Here an example: libpthread.so.0
By contrast, static library names end in .a, e.g. libpthread.a.

Because the files containing shared libraries must be available when the program
is executed, most Linux systems contain shared libraries. Since static libraries are
only required in a dedicated file when a program is linked, they might not be
present on an end user system.

glibc (GNU C library) is a good example of a shared library. On a Debian GNU/Linux 9.9 system,
its file is named libc.so.6. Such rather general file names are normally symbolic links that point
to the actual file containing a library, whose name contains the exact version number. In case of

glibc, this symbolic link looks like this:
$ ls -l /lib/x86_64-linux-gnu/libc.so.6
lrwxrwxrwx 1 root root 12 feb

6 22:17 /lib/x86_64-linux-gnu/libc.so.6 -> libc-2.24.so

This pattern of referencing shared library files named by a specific version by more general file
names is common practice.
Other examples of shared libraries include libreadline (which allows users to edit command
lines as they are typed in and includes support for both Emacs and vi editing modes), libcrypt
(which contains functions related to encryption, hashing, and encoding), or libcurl (which is a
multiprotocol file transfer library).
Common locations for shared libraries in a Linux system are:
- /lib
- /lib32
- /lib64
- /usr/lib
- /usr/local/lib

The concept of shared libraries is not exclusive to Linux. In Windows, for example,
they are called DLL which stands for dynamic linked libraries.

Configuration of Shared Library Paths
The references contained in dynamically linked programs are resolved by the dynamic linker
(ld.so or ld-linux.so) when the program is run. The dynamic linker searches for libraries in a
number of directories. These directories are specified by the library path. The library path is
configured in the /etc directory, namely in the file /etc/ld.so.conf and, more common
nowadays, in files residing in the /etc/ld.so.conf.d directory. Normally, the former includes
just a single include line for *.conf files in the latter:
$ cat /etc/ld.so.conf
include /etc/ld.so.conf.d/*.conf

The /etc/ld.so.conf.d directory contains *.conf files:

$ ls /etc/ld.so.conf.d/
libc.conf

x86_64-linux-gnu.conf

These *.conf files must include the absolute paths to the shared library directories:
$ cat /etc/ld.so.conf.d/x86_64-linux-gnu.conf
/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu

The ldconfig command takes care of reading these config files, creating the aforementioned set
of symbolic links that help to locate the individual libraries and finally of updating the cache file
/etc/ld.so.cache. Thus, ldconfig must be run every time configuration files are added or
updated.
Useful options for ldconfig are:
-v, --verbose
Display the library version numbers, the name of each directory, and the links that are created:
$ sudo ldconfig -v
/usr/local/lib:
/lib/x86_64-linux-gnu:
libnss_myhostname.so.2 -> libnss_myhostname.so.2
libfuse.so.2 -> libfuse.so.2.9.7
libidn.so.11 -> libidn.so.11.6.16
libnss_mdns4.so.2 -> libnss_mdns4.so.2
libparted.so.2 -> libparted.so.2.0.1

So we can see, for example, how libfuse.so.2 is linked to the actual shared object file
libfuse.so.2.9.7.
-p, --print-cache
Print the lists of directories and candidate libraries stored in the current cache:
$ sudo ldconfig -p
1094 libs found in the cache `/etc/ld.so.cache'
libzvbi.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzvbi.so.0
libzvbi-chains.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzvbi-chains.so.0

libzmq.so.5 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzmq.so.5
libzeitgeist-2.0.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzeitgeist2.0.so.0

Note how the cache uses the fully qualified soname of the links:
$ sudo ldconfig -p |grep libfuse
libfuse.so.2 (libc6,x86-64) => /lib/x86_64-linux-gnu/libfuse.so.2

If we long list /lib/x86_64-linux-gnu/libfuse.so.2, we will find the reference to the actual
shared object file libfuse.so.2.9.7 which is stored in the same directory:
$ ls -l /lib/x86_64-linux-gnu/libfuse.so.2
lrwxrwxrwx 1 root root 16 Aug 21

2018 /lib/x86_64-linux-gnu/libfuse.so.2 ->

libfuse.so.2.9.7

Since it requires write access to /etc/ld.so.cache (owned by root), you must
either be root or use sudo to invoke ldconfig. For more information about
ldconfig switches, refer to its manual page.

In addition to the configuration files described above, the LD_LIBRARY_PATH environment
variable can be used to add new paths for shared libraries temporarily. It is made up of a colonseparated (:) set of directories where libraries are looked up. To add, for example,
/usr/local/mylib to the library path in the current shell session, you could type:
$ LD_LIBRARY_PATH=/usr/local/mylib

Now you can check its value:
$ echo $LD_LIBRARY_PATH
/usr/local/mylib

To add /usr/local/mylib to the library path in the current shell session and have it exported to
all child processes spawned from that shell, you would type:
$ export LD_LIBRARY_PATH=/usr/local/mylib

To remove the LD_LIBRARY_PATH environment variable, just type:
$ unset LD_LIBRARY_PATH

To make the changes permanent, you can write the line
export LD_LIBRARY_PATH=/usr/local/mylib

in one of Bash’s initialization scripts such as /etc/bash.bashrc or ~/.bashrc.

LD_LIBRARY_PATH is to shared libraries what PATH is to executables. For more
information about environment variables and shell configuration, refer to the
respective lessons.

Searching for the Dependencies of a Particular Executable
To look up the shared libraries required by a specific program, use the ldd command followed by
the absolute path to the program. The output shows the path of the shared library file as well as
the hexadecimal memory address at which it is loaded:
$ ldd /usr/bin/git
linux-vdso.so.1 =>

(0x00007ffcbb310000)

libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f18241eb000)
libz.so.1 => /lib/x86_64-linux-gnu/libz.so.1 (0x00007f1823fd1000)
libresolv.so.2 => /lib/x86_64-linux-gnu/libresolv.so.2 (0x00007f1823db6000)
libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f1823b99000)
librt.so.1 => /lib/x86_64-linux-gnu/librt.so.1 (0x00007f1823991000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f18235c7000)
/lib64/ld-linux-x86-64.so.2 (0x00007f182445b000)

Likewise, we use ldd to search for the dependencies of a shared object:
$ ldd /lib/x86_64-linux-gnu/libc.so.6
/lib64/ld-linux-x86-64.so.2 (0x00007fbfed578000)
linux-vdso.so.1 (0x00007fffb7bf5000)

With the -u (or --unused) option ldd prints the unused direct dependencies (if they exist):
$ ldd -u /usr/bin/git

Unused direct dependencies:
/lib/x86_64-linux-gnu/libz.so.1
/lib/x86_64-linux-gnu/libpthread.so.0
/lib/x86_64-linux-gnu/librt.so.1

The reason for unused dependencies is related to the options used by the linker when building the
binary. Although the program does not need an unused library, it was still linked and labelled as
NEEDED in the information about the object file. You can investigate this using commands such as
readelf or objdump, which you will soon use in the explorational exercise.

## 1. Divide the following shared library names into their parts:
Complete file name

Library name

so suffix

Version number

linux-vdso.so.1
libprocps.so.6
libdl.so.2
libc.so.6
libsystemd.so.0
ld-linux-x8664.so.2
2. You have developed a piece of software and want to add a new shared library directory to your
system (/opt/lib/mylib). You write its absolute path in a file called mylib.conf.
- In what directory should you put this file?

- What command should you run to make the changes fully effective?

3. What command would you use to list the shared libraries required by kill?

1. objdump is a command line utility that displays information from object files. Check if it is
installed in your system with which objdump. If it is not, please, install it.
dependencies of glibc:

- Use objdump with the -p (or --private-headers) option and grep to print the soname of
glibc:

dependencies of Bash:

In this lesson you have learned:
- What a shared (or dynamic) library is.
- The differences between shared and static libraries.
- The names of shared libraries (sonames).
- The preferred locations for shared libraries in a Linux system such as /lib or /usr/lib.
- The purpose of the dynamic linker ld.so (or ld-linux.so).
- How to configure shared library paths by means of files in /etc/ such as ld.so.conf or the
ones in the ld.so.conf.d directory.
- How to configure shared library paths by means of the LD_LIBRARY_PATH environment
variable.
- How to look up for executable and shared library dependencies.
Commands used in this lesson:
ls
List directory contents.
Concatenate files and print on the standard output.
sudo
Have the superuser executing the command with administrative privileges.
ldconfig
Configure dynamic linker run-time bindings.
echo
Display value of environment variable.
export
Export value of environment variable to child shells.
unset
Remove environment variable.

ldd
Print shared objects dependencies of a program.
readelf
Display information about ELF files (ELF stands for executable and linkable format).
objdump
Print information from object files.

## 1. Divide the following shared library names into their parts:
Complete file name

Library name

so suffix

Version number

linux-vdso.so.1

linux-vdso

libprocps.so.6

libprocps

libdl.so.2

libdl

libc.so.6

libc

libsystemd.so.0

libsystemd

ld-linux-x8664.so.2

ld-linux-x86-64

## 2. You have developed a piece of software and want to add a new shared library directory to your
system (/opt/lib/mylib). You write its absolute path in a file called mylib.conf.
- In what directory should you put this file?
/etc/ld.so.conf.d
- What command should you run to make the changes fully effective?
ldconfig
3. What command would you use to enumerate the shared libraries required by kill?
ldd /bin/kill

1. objdump is a command line utility that displays information from object files. Check if it is
installed in your system with which objdump. If it is not, please, install it.
dependencies of glibc:
objdump -p /lib/x86_64-linux-gnu/libc.so.6 | grep NEEDED
- Use objdump with the -p (or --private-headers) option and grep to print the soname of
glibc:
objdump -p /lib/x86_64-linux-gnu/libc.so.6 | grep SONAME
dependencies of Bash:
objdump -p /bin/bash | grep NEEDED

### 102.4 Use Debian package management
LPIC-1 v5, Exam 101, Objective 102.4
- Install, upgrade and uninstall Debian binary packages.
- Find packages containing specific files or libraries which may or may not be installed.
- Obtain package information like version, content, dependencies, package integrity and
installation status (whether or not the package is installed).
- Awareness of apt.
- /etc/apt/sources.list
- dpkg
- dpkg-reconfigure
- apt-get
- apt-cache

### 102.4 Lesson 1

### 102.4 Use Debian package management

A long time ago, when Linux was still in its infancy, the most common way to distribute software
was a compressed file (usually a .tar.gz archive) with source code, which you would unpack
and compile yourself.
However, as the amount and complexity of software grew, the need for a way to distribute precompiled software became clear. After all, not everyone had the resources, both in time and
computing power, to compile large projects like the Linux kernel or an X Server.
Soon, efforts to standardize a way to distribute these software “packages” grew, and the first
package managers were born. These tools made it much easier to install, configure or remove
software from a system.
One of those was the Debian package format (.deb) and its package tool (dpkg). Today, they are
widely used not only on Debian itself, but also on its derivatives, like Ubuntu and those derived
from it.
Another package management tool that is popular on Debian-based systems is the Advanced

Package Tool (apt), which can streamline many of the aspects of the installation, maintenance
and removal of packages, making it much easier.
In this lesson, we will learn how to use both dpkg and apt to obtain, install, maintain and remove
software on a Debian-based Linux system.

The Debian Package Tool (dpkg)
The Debian Package (dpkg) tool is the essential utility to install, configure, maintain and remove
software packages on Debian-based systems. The most basic operation is to install a .deb package,
which can be done with:

Where PACKAGENAME is the name of the .deb file you want to install.
Package upgrades are handled the same way. Before installing a package, dpkg will check if a
previous version already exists in the system. If so, the package will be upgraded to the new
version. If not, a fresh copy will be installed.

Dealing with Dependencies
More often than not, a package may depend on others to work as intended. For example, an image
editor may need libraries to open JPEG files, or another utility may need a widget toolkit like Qt or
GTK for its user interface.
dpkg will check if those dependencies are installed on your system, and will fail to install the
package if they are not. In this case, dpkg will list which packages are missing. However it cannot
solve dependencies by itself. It is up to the user to find the .deb packages with the corresponding
dependencies and install them.
In the example below, the user tries to install the OpenShot video editor package, but some
dependencies were missing:
(Reading database ... 269630 files and directories currently installed.)
Preparing to unpack openshot-qt_2.4.3+dfsg1-1_all.deb ...
Unpacking openshot-qt (2.4.3+dfsg1-1) over (2.4.3+dfsg1-1) ...
dpkg: dependency problems prevent configuration of openshot-qt:
openshot-qt depends on fonts-cantarell; however:
Package fonts-cantarell is not installed.

openshot-qt depends on python3-openshot; however:
Package python3-openshot is not installed.
openshot-qt depends on python3-pyqt5; however:
Package python3-pyqt5 is not installed.
openshot-qt depends on python3-pyqt5.qtsvg; however:
Package python3-pyqt5.qtsvg is not installed.
openshot-qt depends on python3-pyqt5.qtwebkit; however:
Package python3-pyqt5.qtwebkit is not installed.
openshot-qt depends on python3-zmq; however:
Package python3-zmq is not installed.
dpkg: error processing package openshot-qt (--install):
dependency problems - leaving unconfigured
Processing triggers for mime-support (3.60ubuntu1) ...
Processing triggers for gnome-menus (3.32.0-1ubuntu1) ...
Processing triggers for desktop-file-utils (0.23-4ubuntu1) ...
Processing triggers for hicolor-icon-theme (0.17-2) ...
Processing triggers for man-db (2.8.5-2) ...
Errors were encountered while processing:
openshot-qt

As shown above, OpenShot depends on the fonts-cantarell, python3-openshot, python3pyqt5, python3-pyqt5.qtsvg, python3-pyqt5.qtwebkit and python3-zmq packages. All of
those need to be installed before the installation of OpenShot can succeed.

Removing Packages
To remove a package, pass the -r parameter to dpkg, followed by the package name. For example,
the following command will remove the unrar package from the system:
(Reading database ... 269630 files and directories currently installed.)
Removing unrar (1:5.6.6-2) ...
Processing triggers for man-db (2.8.5-2) ...

The removal operation also runs a dependency check, and a package cannot be removed unless
every other package that depends on it is also removed. If you try to do so, you will get an error
message like the one below:
dpkg: dependency problems prevent removal of p7zip:

winetricks depends on p7zip; however:
Package p7zip is to be removed.
p7zip-full depends on p7zip (= 16.02+dfsg-6).
dpkg: error processing package p7zip (--remove):
dependency problems - not removing
Errors were encountered while processing:
p7zip

You can pass multiple package names to dpkg -r, so they will all be removed at once.
When a package is removed, the corresponding configuration files are left on the system. If you
want to remove everything associated with the package, use the -P (purge) option instead of -r.

You can force dpkg to install or remove a package, even if dependencies are not
met, by adding the --force parameter like in dpkg -i --force PACKAGENAME.
However, doing so will most likely leave the installed package, or even your
system, in a broken state. Do not use --force unless you are absolutely sure of
what you are doing.

Getting Package Information
To get information about a .deb package, such as its version, architecture, maintainer,
dependencies and more, use the dpkg command with the -I parameter, followed by the filename
of the package you want to inspect:
new Debian package, version 2.0.
size 59477810 bytes: control archive=10394 bytes.
1222 bytes,

13 lines

control

16906 bytes,

457 lines

postinst

#!/bin/sh

12983 bytes,

344 lines

postrm

#!/bin/sh

1385 bytes,

42 lines

prerm

#!/bin/sh

Package: google-chrome-stable
Version: 76.0.3809.100-1
Architecture: amd64
Maintainer: Chrome Linux Team <chromium-dev@chromium.org>
Installed-Size: 205436
Pre-Depends: dpkg (>= 1.14.0)
Depends: ca-certificates, fonts-liberation, libappindicator3-1, libasound2 (>= 1.0.16),
libatk-bridge2.0-0 (>= 2.5.3), libatk1.0-0 (>= 2.2.0), libatspi2.0-0 (>= 2.9.90), libc6 (>=
2.16), libcairo2 (>= 1.6.0), libcups2 (>= 1.4.0), libdbus-1-3 (>= 1.5.12), libexpat1 (>=

2.0.1), libgcc1 (>= 1:3.0), libgdk-pixbuf2.0-0 (>= 2.22.0), libglib2.0-0 (>= 2.31.8),
libgtk-3-0 (>= 3.9.10), libnspr4 (>= 2:4.9-2~), libnss3 (>= 2:3.22), libpango-1.0-0 (>=
1.14.0), libpangocairo-1.0-0 (>= 1.14.0), libuuid1 (>= 2.16), libx11-6 (>= 2:1.4.99.1),
libx11-xcb1, libxcb1 (>= 1.6), libxcomposite1 (>= 1:0.3-1), libxcursor1 (>> 1.1.2),
libxdamage1 (>= 1:1.1), libxext6, libxfixes3, libxi6 (>= 2:1.2.99.4), libxrandr2 (>=
2:1.2.99.3), libxrender1, libxss1, libxtst6, lsb-release, wget, xdg-utils (>= 1.0.2)
Recommends: libu2f-udev
Provides: www-browser
Section: web
Priority: optional
Description: The web browser from Google
Google Chrome is a browser that combines a minimal design with sophisticated technology to
make the web faster, safer, and easier.

Listing Installed Packages and Package Contents
To get a list of every package installed on your system, use the --get-selections option, as in
dpkg --get-selections. You can also get a list of every file installed by a specific package by
passing the -L PACKAGENAME parameter to dpkg, like below:
/.
/usr
/usr/bin
/usr/bin/unrar-nonfree
/usr/share
/usr/share/doc
/usr/share/doc/unrar
/usr/share/doc/unrar/changelog.Debian.gz
/usr/share/doc/unrar/copyright
/usr/share/man
/usr/share/man/man1
/usr/share/man/man1/unrar-nonfree.1.gz

Finding Out Which Package Owns a Specific File
Sometimes you may need to find out which package owns a specific file in your system. You can
do so by using the dpkg-query utility, followed by the -S parameter and the path to the file in
question:

unrar: /usr/bin/unrar-nonfree

Reconfiguring Installed Packages
When a package is installed there is a configuration step called post-install where a script runs to
set-up everything needed for the software to run such as permissions, placement of configuration
files, etc. This may also ask some questions of the user to set preferences on how the software will
run.
Sometimes, due to a corrupt or malformed configuration file, you may wish to restore a package’s
settings to its “fresh” state. Or you may wish to change the answers you gave to the initial
configuration questions. To do this run the dpkg-reconfigure utility, followed by the package
name.
This program will back-up the old configuration files, unpack the new ones in the correct
directories and run the post-install script provided by the package, as if the package had been
installed for the first time. Try to reconfigure the tzdata package with the following example:

Advanced Package Tool (apt)
The Advanced Package Tool (APT) is a package management system, including a set of tools, that
greatly simplifies package installation, upgrade, removal and management. APT provides features
like advanced search capabilities and automatic dependency resolution.
APT is not a “substitute” for dpkg. You may think of it as a “front end”, streamlining operations
and filling gaps in dpkg functionality, like dependency resolution.
APT works in concert with software repositories which contain the packages available to install.
Such repositories may be a local or remote server, or (less common) even a CD-ROM disc.
Linux distributions, such as Debian and Ubuntu, maintain their own repositories, and other
repositories may be maintained by developers or user groups to provide software not available
from the main distribution repositories.
There are many utilities that interact with APT, the main ones being:
apt-get
used to download, install, upgrade or remove packages from the system.

apt-cache
used to perform operations, like searches, in the package index.
apt-file
used for searching for files inside packages.
There is also a “friendlier” utility named simply apt, combining the most used options of apt-get
and apt-cache in one utility. Many of the commands for apt are the same as the ones for aptget, so they are in many cases interchangeable. However, since apt may not be installed on a
system, it is recommended to learn how to use apt-get and apt-cache.

apt and apt-get may require a network connection, because packages and
package indexes may need to be downloaded from a remote server.

Updating the Package Index
Before installing or upgrading software with APT, it is recommended to update the package index
first in order to retrieve information about new and updated packages. This is done with the aptget command, followed by the update parameter:
Ign:1 http://dl.google.com/linux/chrome/deb stable InRelease
Hit:2 https://repo.skype.com/deb stable InRelease
Hit:3 http://us.archive.ubuntu.com/ubuntu disco InRelease
Hit:4 http://repository.spotify.com stable InRelease
Hit:5 http://dl.google.com/linux/chrome/deb stable Release
Hit:6 http://apt.pop-os.org/proprietary disco InRelease
Hit:7 http://ppa.launchpad.net/system76/pop/ubuntu disco InRelease
Hit:8 http://us.archive.ubuntu.com/ubuntu disco-security InRelease
Hit:9 http://us.archive.ubuntu.com/ubuntu disco-updates InRelease
Hit:10 http://us.archive.ubuntu.com/ubuntu disco-backports InRelease

Instead of apt-get update, you can also use apt update.

Installing and Removing Packages
With the package index updated you may now install a package. This is done with apt-get
install, followed by the name of the package you wish to install:

Reading state information... Done
The following NEW packages will be installed:
xournal
0 upgraded, 1 newly installed, 0 to remove and 75 not upgraded.
Need to get 285 kB of archives.
After this operation, 1041 kB of additional disk space will be used.

Similarly, to remove a package use apt-get remove, followed by the package name:
Reading state information... Done
The following packages will be REMOVED:
xournal
0 upgraded, 0 newly installed, 1 to remove and 75 not upgraded.
After this operation, 1041 kB disk space will be freed.
Do you want to continue? [Y/n]

Be aware that when installing or removing packages, APT will do automatic dependency
resolution. This means that any additional packages needed by the package you are installing will
also be installed, and that packages that depend on the package you are removing will also be
removed. APT will always show what will be installed or removed before asking if you want to
continue:
The following packages will be REMOVED:
android-libbacktrace android-libunwind android-libutils
android-libziparchive android-sdk-platform-tools fastboot p7zip p7zip-full
0 upgraded, 0 newly installed, 8 to remove and 75 not upgraded.
After this operation, 6545 kB disk space will be freed.
Do you want to continue? [Y/n]

Note that when a package is removed the corresponding configuration files are left on the system.
To remove the package and any configuration files, use the purge parameter instead of remove or
the remove parameter with the --purge option:

You can also use apt install and apt remove.

Fixing Broken Dependencies
It is possible to have “broken dependencies” on a system. This means that one or more of the
installed packages depend on other packages that have not been installed, or are not present
anymore. This may happen due to an APT error, or because of a manually installed package.
To solve this, use the apt-get install -f command. This will try to “fix” the broken packages
by installing the missing dependencies, ensuring that all packages are consistent again.

You can also use apt install -f.

Upgrading Packages
APT can be used to automatically upgrade any installed packages to the latest versions available
from the repositories. This is done with the apt-get upgrade command. Before running it, first
update the package index with apt-get update:
Hit:1 http://us.archive.ubuntu.com/ubuntu disco InRelease
Hit:2 http://us.archive.ubuntu.com/ubuntu disco-security InRelease
Hit:3 http://us.archive.ubuntu.com/ubuntu disco-updates InRelease
Hit:4 http://us.archive.ubuntu.com/ubuntu disco-backports InRelease
Reading state information... Done
Calculating upgrade... Done
The following packages have been kept back:
gnome-control-center
The following packages will be upgraded:
cups cups-bsd cups-client cups-common cups-core-drivers cups-daemon

cups-ipp-utils cups-ppdc cups-server-common firefox-locale-ar (...)
74 upgraded, 0 newly installed, 0 to remove and 1 not upgraded.
Need to get 243 MB of archives.
After this operation, 30.7 kB of additional disk space will be used.
Do you want to continue? [Y/n]

The summary at the bottom of the output shows how many packages will be upgraded, how many
will be installed, removed or kept back, the total download size and how much extra disk space
will be needed to complete the operation. To complete the upgrade, just answer Y and wait for
apt-get to finish the task.
To upgrade a single package, just run apt-get upgrade followed by the package name. As in
dpkg, apt-get will first check if a previous version of a package is installed. If so, the package will
be upgraded to the newest version available in the repository. If not, a fresh copy will be installed.

You can also use apt upgrade and apt update.

The Local Cache
When you install or update a package, the corresponding .deb file is downloaded to a local cache
directory before the package is installed. By default, this directory is /var/cache/apt/archives.
Partially downloaded files are copied to /var/cache/apt/archives/partial/.
As you install and upgrade packages, the cache directory can get quite large. To reclaim space, you
can empty the cache by using the apt-get clean command. This will remove the contents of the
/var/cache/apt/archives and /var/cache/apt/archives/partial/ directories.

You can also use apt clean.

Searching for Packages
The apt-cache utility can be used to perform operations on the package index, such as searching
for a specific package or listing which packages contain a specific file.
To conduct a search, use apt-cache search followed by a search pattern. The output will be a
list of every package that contains the pattern, either in its package name, description or files
provided.
liblzma-dev - XZ-format compression library - development files
liblzma5 - XZ-format compression library

forensics-extra - Forensics Environment - extra console components (metapackage)
p7zip - 7zr file archiver with high compression ratio
p7zip-full - 7z and 7za file archivers with high compression ratio
p7zip-rar - non-free rar module for p7zip

In the example above, the entry liblzma5 - XZ-format compression library does not seem
to match the pattern. However, if we show the full information, including description, for the
package using the show parameter, we will find the pattern there:
Package: liblzma5
Architecture: amd64
Version: 5.2.4-1
Multi-Arch: same
Priority: required
Section: libs
Source: xz-utils
Origin: Ubuntu
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Jonathan Nieder <jrnieder@gmail.com>
Bugs: https://bugs.launchpad.net/ubuntu/+filebug
Installed-Size: 259
Depends: libc6 (>= 2.17)
Breaks: liblzma2 (<< 5.1.1alpha+20110809-3~)
Filename: pool/main/x/xz-utils/liblzma5_5.2.4-1_amd64.deb
Size: 92352
MD5sum: 223533a347dc76a8cc9445cfc6146ec3
SHA1: 8ed14092fb1caecfebc556fda0745e1e74ba5a67
SHA256: 01020b5a0515dbc9a7c00b464a65450f788b0258c3fbb733ecad0438f5124800
Homepage: https://tukaani.org/xz/
Description-en: XZ-format compression library
XZ is the successor to the Lempel-Ziv/Markov-chain Algorithm
compression format, which provides memory-hungry but powerful
compression (often better than bzip2) and fast, easy decompression.
The native format of liblzma is XZ; it also supports raw (headerless)
streams and the older LZMA format used by lzma. (For 7-Zip's related
format, use the p7zip package instead.)

You can use regular expressions with the search pattern, allowing for very complex (and precise)
searches. However, this topic is out of scope for this lesson.

You can also use apt search instead of apt-cache search and apt show instead
of apt-cache show.

The Sources List
APT uses a list of sources to know where to get packages from. This list is stored in the file
sources.list, located inside the /etc/apt directory. This file can be edited directly with a text
editor, like vi, pico or nano, or with graphical utilities like aptitude or synaptic.
A typical line inside sources.list looks like this:
deb http://us.archive.ubuntu.com/ubuntu/ disco main restricted universe multiverse

The syntax is archive type, URL, distribution and one or more components, where:
Archive type
A repository may contain packages with ready-to-run software (binary packages, type deb) or
with the source code to this software (source packages, type deb-src). The example above
provides binary packages.
The URL for the repository.
Distribution
The name (or codename) for the distribution for which packages are provided. One repository
may host packages for multiple distributions. In the example above, disco is the codename for
Ubuntu 19.04 Disco Dingo.
Components
Each component represents a set of packages. These components may be different on different
Linux distributions. For example, on Ubuntu and derivatives, they are:
main
contains officially supported, open-source packages.
restricted
contains officially supported, closed-source software, like device drivers for graphic cards,
for example.

universe
contains community maintained open-source software.
multiverse
contains unsupported, closed-source or patent-encumbered software.
On Debian, the main components are:
main
consists of packages compliant with the Debian Free Software Guidelines (DFSG), which do
not rely on software outside this area to operate. Packages included here are considered to
be part of the Debian distribution.
contrib
contains DFSG-compliant packages, but which depend on other packages that are not in
main.
non-free
contains packages that are not compliant with the DFSG.
security
contains security updates.
backports
contains more recent versions of packages that are in main. The development cycle of the
stable versions of Debian is quite long (around two years), and this ensures that users can
get the most up-to-date packages without having to modify the main core repository.

You can learn more about the Debian Free
https://www.debian.org/social_contract#guidelines

Software

Guidelines

at:

To add a new repository to get packages from, you can simply add the corresponding line (usually
provided by the repository maintainer) to the end of sources.list, save the file and reload the
package index with apt-get update. After that, the packages in the new repository will be
available for installation using apt-get install.
Keep in mind that lines starting with the # character are considered comments, and are ignored.
The /etc/apt/sources.list.d Directory
Inside the /etc/apt/sources.list.d directory you can add files with additional repositories to
be used by APT, without the need to modify the main /etc/apt/sources.list file. These are

simple text files, with the same syntax described above and the .list file extension.
Below you see
backports.list:

contents

of

called

/etc/apt/sources.list.d/buster-

deb http://deb.debian.org/debian buster-backports main contrib non-free
deb-src http://deb.debian.org/debian buster-backports main contrib non-free

Listing Package Contents and Finding Files
A utility called apt-file can be used to perform more operations in the package index, like
listing the contents of a package or finding a package that contains a specific file. This utility may
not be installed by default in your system. In this case, you can usually install it using apt-get:

After installation, you will need to update the package cache used for apt-file:

This usually takes only a few seconds. After that, you are ready to use apt-file.
To list the contents of a package, use the list parameter followed by the package name:
unrar: /usr/bin/unrar-nonfree
unrar: /usr/share/doc/unrar/changelog.Debian.gz
unrar: /usr/share/doc/unrar/copyright
unrar: /usr/share/man/man1/unrar-nonfree.1.gz

You can also use apt list instead of apt-file list.

You can search all packages for a file using the search parameter, followed by the file name. For
example, if you wish to know which package provides a file called libSDL2.so, you can use:
libsdl2-dev: /usr/lib/x86_64-linux-gnu/libSDL2.so

The answer is the package libsdl2-dev, which provides the file /usr/lib/x86_64-linux114

gnu/libSDL2.so.
The difference between apt-file search and dpkg-query is that apt-file search will also
search uninstalled packages, while dpkg-query can only show files that belong to an installed
package.

115

1. What is the command to install a package named package.deb using dpkg?

2. Using dpkg-query, find which package contains a file named 7zr.1.gz.

## 3. Can you remove a package called unzip from the system using dpkg -r unzip if the package
file-roller depends on it? If not, what would be the correct way to do it?

4. Using apt-file, how can you find out which package contains the file unrar?

5. Using apt-cache, what is the command to show information for the package gimp?

116

## 1. Consider a repository with Debian source packages for the xenial distribution, hosted at
http://us.archive.ubuntu.com/ubuntu/ and with packages for the universe component.
What would be the corresponding line to be added to /etc/apt/sources.list?

## 2. While compiling a program, you come across an error message complaining that the header
file zzip-io.h is not present in your system. How can you find out which package provides
that file?

## 3. How can you ignore a dependency warning and remove a package using dpkg, even if there
are packages that depend on it in the system?

4. How can you get more information about a package called midori using apt?

## 5. Before installing or updating packages with apt, which command should be used to ensure
that the package index is up-to-date?

117

- How to use dpkg to install and remove packages.
- How to list installed packages and package contents.
- How to reconfigure an installed package.
- What is apt, and how to install, upgrade and remove packages using it.
- How to use apt-cache to search for packages.
- How the /etc/apt/sources.list file works.
- How to use apt-file to show the contents of a package, or how to find which package
contains a specific file.
The following commands were discussed:
dpkg -i
Installs a single package, or a space-separated list of packages.
dpkg -r
Removes a package, or a space-separated list of packages.
dpkg -I
Inspects a package, providing details on the software it installs and any needed dependencies.
dpkg --get-selections
Lists out every package that dpkg has installed on the system.
dpkg -L
Prints out a list of every file that a particular package installs.
dpkg-query
With a specified file name, this command will print out the package that installed the file.
dpkg-reconfigure
This command will re-run a packages post-install script so that an administrator can make
configuration adjustments to the package’s installation.

118

apt-get update
This command will update the local package index to match what is available within the
configured repositories under the /etc/apt/ directory.
apt-get install
This command will download a package from a remote repository and install it along with its
dependencies, can also be used to install a Debian package that has already been downloaded.
apt-get remove
This command will uninstall the specified package(s) from the system.
apt-cache show
Just like the dpkg -I command, this command can be used to show details on a specific
package.
apt-cache search
This command will search your local APT cached database for a particular package.
apt-file update
This command will update the package cache so that the apt-file command can query its
contents.
apt-file search
This command will search in which package a file is included. A list of all packages containing
the pattern is returned.
apt-file list
This command is used to list the contents of a package, just like the dpkg -L command.

119

1. What is the command to install a package named package.deb using dpkg?
Pass the -i parameter to dpkg:

## 2. Using dpkg-query, find which package contains a file named 7zr.1.gz.
Add the -S parameter to dpkg-query:

## 3. Can you remove a package called unzip from the system using dpkg -r unzip if the package
file-roller depends on it? If not, what would be the correct way to do it?
No. dpkg will not resolve dependencies, and will not let you remove a package if another
installed package depends on it. In this example, you could first remove file-roller
(assuming nothing depends on it) and then remove unzip, or remove both at the same time
with:

## 4. How can you find out which package contains the file /usr/bin/unrar using the apt-file
utility?
Use the search parameter followed by the path (or filename):

5. Using apt-cache, what is the command to show information for the package gimp?
Use the show parameter followed by the package name:

120

## 1. Consider a repository with Debian source packages for the xenial distribution, hosted at
http://us.archive.ubuntu.com/ubuntu/ and with packages for the universe component.
What would be the corresponding line to be added to /etc/apt/sources.list?
Source packages are of the deb-src type, so the line should be:
deb-src http://us.archive.ubuntu.com/ubuntu/ xenial universe

This line could also be added inside a .list file in /etc/apt/sources.list.d/. The name is
up to you but should be descriptive, something like xenial_sources.list.
2. While compiling a program, you come across an error message complaining that the header
file zzip-io.h is not present on your system. How can you find out which package provides
that file?
Use apt-file search to find which package contains a file not present in the system:

## 3. How can you ignore a dependency warning and remove a package using dpkg, even if there
are packages that depend on it in the system?
The parameter --force can be used, but this should never be done unless you know exactly
what you are doing, since there is a great risk that your system will be left in an inconsistent or
“broken” state.
4. How can you get more information about a package called midori using apt-cache?
Use apt-cache show followed by the package name:

## 5. Before installing or updating packages with apt-get, which command should be used to
ensure that the package index is up-to-date?
apt-get update should be used. This will download the latest package indexes from the
repositories
described
/etc/apt/sources.list
/etc/apt/sources.list.d/ directory.

121

### 102.5 Use RPM and YUM package management
LPIC-1 v5, Exam 101, Objective 102.5
- Install, re-install, upgrade and remove packages using RPM, YUM and Zypper.
- Obtain information on RPM packages such as version, status, dependencies, integrity and
signatures.
- Determine what files a package provides, as well as find which package a specific file comes
from.
- Awareness of dnf.
- rpm
- rpm2cpio
- /etc/yum.conf
- /etc/yum.repos.d/
- yum
- zypper

122

### 102.5 Lesson 1

### 102.5 Use RPM and YUM package management

A long time ago, when Linux was still in its infancy, the most common way to distribute software
was a compressed file (usually as a .tar.gz archive) with source code, which you would unpack
and compile yourself.
However, as the amount and complexity of software grew, the need for a way to distribute precompiled software became clear. After all, not everyone had the resources, both in time and
computing power, to compile large projects like the Linux kernel or an X Server.
Soon, efforts to standardize a way to distribute these software “packages” grew, and the first
package managers were born. These tools made it much easier to install, configure or remove
software from a system.
One of those was the RPM Package Manager and its corresponding tool (rpm), developed by Red
Hat. Today, they are widely used not only on Red Hat Enterprise Linux (RHEL) itself, but also on
its descendants, like Fedora, CentOS and Oracle Linux, other distributions like openSUSE and even
other operating systems, like IBM’S AIX.

123

Other package management tools popular on Red Hat compatible distros are yum (YellowDog
Updater Modified), dnf (Dandified YUM) and zypper, which can streamline many of the aspects of
the installation, maintenance and removal of packages, making package management much
easier.
In this lesson, we will learn how to use rpm, yum, dnf and zypper to obtain, install, manage and
remove software on a Linux system.

Despite using the same package format, there are internal differences between
distributions so a package made specifically for openSUSE might not work on a
RHEL system, and vice-versa. When searching for packages, always check for
compatibility and try to find one tailored for your specific distribution, if possible.

The RPM Package Manager (rpm)
The RPM Package Manager (rpm) is the essential tool for managing software packages on Red Hatbased (or derived) systems.

Installing, Upgrading and Removing Packages
The most basic operation is to install a package, which can be done with:

Where PACKAGENAME is the name of the .rpm package you wish to install.
If there is a previous version of a package on the system, you can upgrade to a newer version
using the -U parameter:

If there is no previous version of PACKAGENAME installed, then a fresh copy will be installed. To
avoid this and only upgrade an installed package, use the -F option.
In both operations you can add the -v parameter to get a verbose output (more information is
shown during the installation) and -h to get hash signs (#) printed as a visual aid to track
installation progress. Multiple parameters can be combined into one, so rpm -i -v -h is the
same as rpm -ivh.
To remove an installed package, pass the -e parameter (as in “erase”) to rpm, followed by the

124

name of the package you wish to remove:

If an installed package depends on the package being removed, you will get an error message:
error: Failed dependencies:
/usr/bin/unzip is needed by (installed) file-roller-3.28.1-2.el7.x86_64

To complete the operation, first you will need to remove the packages that depend on the one you
wish to remove (in the example above, file-roller). You can pass multiple package names to
rpm -e to remove multiple packages at once.

Dealing with Dependencies
More often than not, a package may depend on others to work as intended. For example, an image
editor may need libraries to open JPG files, or a utility may need a widget toolkit like Qt or GTK for
its user interface.
rpm will check if those dependencies are installed on your system, and will fail to install the
package if they are not. In this case, rpm will list what is missing. However it cannot solve
dependencies by itself.
In the example below, the user tried to install a package for the GIMP image editor, but some
dependencies were missing:
error: Failed dependencies:
babl(x86-64) >= 0.1.10 is needed by gimp-2:2.8.22-1.el7.x86_64
gegl(x86-64) >= 0.2.0 is needed by gimp-2:2.8.22-1.el7.x86_64
gimp-libs(x86-64) = 2:2.8.22-1.el7 is needed by gimp-2:2.8.22-1.el7.x86_64
libbabl-0.1.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgegl-0.2.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimp-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpbase-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpcolor-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpconfig-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpmath-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpmodule-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpthumb-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64

125

libgimpui-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libgimpwidgets-2.0.so.0()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libmng.so.1()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libwmf-0.2.so.7()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64
libwmflite-0.2.so.7()(64bit) is needed by gimp-2:2.8.22-1.el7.x86_64

It is up to the user to find the .rpm packages with the corresponding dependencies and install
them. Package managers such as yum, zypper and dnf have tools that can tell which package
provides a specific file. Those will be discussed later in this lesson.

Listing Installed Packages
To get a list of all installed packages on your system, use the rpm -qa (think of “query all”).
selinux-policy-3.13.1-229.el7.noarch
pciutils-libs-3.5.1-3.el7.x86_64
redhat-menus-12.0.2-8.el7.noarch
grubby-8.28-25.el7.x86_64
hunspell-en-0.20121024-6.el7.noarch
dejavu-fonts-common-2.33-6.el7.noarch
xorg-x11-drv-dummy-0.3.7-1.el7.1.x86_64
libevdev-1.5.6-1.el7.x86_64
[...]

Getting Package Information
To get information about an installed package, such as its version number, architecture, install
date, packager, summary, etc., use rpm with the -qi (think of “query info”) parameters, followed
by the package name. For example:

: unzip

: 6.0

Release

: 19.el7

Architecture: x86_64
Install Date: Sun 25 Aug 2019 05:14:39 PM EDT
Group

: Applications/Archiving

: 373986

License

: BSD

Signature

: RSA/SHA256, Wed 25 Apr 2018 07:50:02 AM EDT, Key ID 24c6a8a7f4a80eb5

126

Source RPM

: unzip-6.0-19.el7.src.rpm

Build Date

: Wed 11 Apr 2018 01:24:53 AM EDT

Build Host

: x86-01.bsys.centos.org

Relocations : (not relocatable)
Packager

: CentOS BuildSystem <http://bugs.centos.org>

Vendor

: CentOS

: http://www.info-zip.org/UnZip.html

: A utility for unpacking zip files

Description :
The unzip utility is used to list, test, or extract files from a zip
archive. Zip archives are commonly found on MS-DOS systems. The zip
utility, included in the zip package, creates zip archives. Zip and
unzip are both compatible with archives created by PKWARE(R)'s PKZIP
for MS-DOS, but the programs' options and default behaviors do differ
in some respects.
Install the unzip package if you need to list, test or extract files from
a zip archive.

To get a list of what files are inside an installed package use the -ql parameters (think of “query
list”) followed by the package name:
/usr/bin/funzip
/usr/bin/unzip
/usr/bin/unzipsfx
/usr/bin/zipgrep
/usr/bin/zipinfo
/usr/share/doc/unzip-6.0
/usr/share/doc/unzip-6.0/BUGS
/usr/share/doc/unzip-6.0/LICENSE
/usr/share/doc/unzip-6.0/README
/usr/share/man/man1/funzip.1.gz
/usr/share/man/man1/unzip.1.gz
/usr/share/man/man1/unzipsfx.1.gz
/usr/share/man/man1/zipgrep.1.gz
/usr/share/man/man1/zipinfo.1.gz

If you wish to get information or a file listing from a package that has not been installed yet, just
add the -p parameter to the commands above, followed by the name of the RPM file (FILENAME).
So rpm -qi PACKAGENAME becomes rpm -qip FILENAME, and rpm -ql PACKAGENAME becomes
rpm -qlp FILENAME, as shown below.

127

: atom

: 1.40.0

Release

: 0.1

Architecture: x86_64
Install Date: (not installed)
Group

: Unspecified

: 570783704

License

: MIT

Signature

: (none)

Source RPM

: atom-1.40.0-0.1.src.rpm

Build Date

: sex 09 ago 2019 12:36:31 -03

Build Host

: b01bbeaf3a88

Relocations : /usr

: https://atom.io/

: A hackable text editor for the 21st Century.

Description :
A hackable text editor for the 21st Century.

/usr/bin/apm
/usr/bin/atom
/usr/share/applications/atom.desktop
/usr/share/atom
/usr/share/atom/LICENSE
/usr/share/atom/LICENSES.chromium.html
/usr/share/atom/atom
/usr/share/atom/atom.png
/usr/share/atom/blink_image_resources_200_percent.pak
/usr/share/atom/content_resources_200_percent.pak
/usr/share/atom/content_shell.pak
(listing goes on)

Finding Out Which Package Owns a Specific File
To find out which installed package owns a file, use the -qf (think “query file”) followed by the
full path to the file:
unzip-6.0-19.el7.x86_64

128

In the example above, the file /usr/bin/unzip belongs to the unzip-6.0-19.el7.x86_64
package.

YellowDog Updater Modified (YUM)
yum was originally developed as the Yellow Dog Updater (YUP), a tool for package management on
the Yellow Dog Linux distribution. Over time, it evolved to manage packages on other RPM based
systems, such as Fedora, CentOS, Red Hat Enterprise Linux and Oracle Linux.
Functionally, it is similar to the apt utility on Debian-based systems, being able to search for,
install, update and remove packages and automatically handle dependencies. yum can be used to
install a single package, or to upgrade a whole system at once.

Searching for Packages
In order to install a package, you need to know its name. For this you can perform a search with
yum search PATTERN, where PATTERN is the name of the package you are searching for. The
result is a list of packages whose name or summary contain the search pattern specified. For
example, if you need a utility to handle 7Zip compressed files (with the .7z extension) you can
use:
=========================== N/S matchyutr54ed: 7zip ============================
p7zip-plugins.x86_64 : Additional plugins for p7zip
p7zip.x86_64 : Very high compression ratio file archiver
p7zip-doc.noarch : Manual documentation and contrib directory
p7zip-gui.x86_64 : 7zG - 7-Zip GUI version
Name and summary matches only, use "search all" for everything.

Installing, Upgrading and Removing Packages
To install a package using yum, use the command yum install PACKAGENAME, where
PACKAGENAME is the name of the package. yum will fetch the package and corresponding
dependencies from an online repository, and install everything in your system.

129

Resolving Dependencies
--> Running transaction check
---> Package p7zip.x86_64 0:16.02-10.el7 will be installed
--> Finished Dependency Resolution
Dependencies Resolved
Package

Arch

Repository

Installing:
p7zip

x86_64

16.02-10.el7

epel

604 k

Transaction Summary
Install

## 1. Package

Total download size: 604 k
Installed size: 1.7 M
Is this ok [y/d/N]:

To upgrade an installed package, use yum update PACKAGENAME, where PACKAGENAME is the
name of the package you want to upgrade. For example:
Resolving Dependencies
--> Running transaction check
---> Package wget.x86_64 0:1.14-18.el7 will be updated
---> Package wget.x86_64 0:1.14-18.el7_6.1 will be an update
--> Finished Dependency Resolution

130

Dependencies Resolved
Package

Arch

Repository

Updating:
wget

x86_64

1.14-18.el7_6.1

updates

547 k

Transaction Summary
Upgrade
