---
id: lpi-101-500-07
title: "LPIC-1 · 101-500 — Which partitioning scheme should be used to partition a 3 TB hard…",
slug: lpi-101-500-07-lpic-1-101-500-which-partitioning-scheme-should-be-used-to-p
source: "LPI Learning Material — LPIC-1 (Exam 101-500)",
sourceSection: "1. Which partitioning scheme should be used to partition a 3 TB hard disk into three 1 GB, 3. What would be the command to create an ext3 filesystem, checking for bad blocks before, with, 4. Using parted, what is the command to create a 300 MB ext4 partition, starting at 500 MB on the, 5. Imagine yo"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "Then, you enable swap on this partition with swapon /dev/sdb1, but get the following error Covers 46 sections: Which partitioning scheme should be used to partition a 3 TB hard disk into three 1 GB, What would be the command to cre.",
---
# LPIC-1 · 101-500 — Which partitioning scheme should be used to partition a 3 TB hard…

## 3. What would be the command to create an ext3 filesystem, checking for bad blocks before, with
the label MyDisk and a random UUID, on the device /dev/sdc1?

## 4. Using parted, what is the command to create a 300 MB ext4 partition, starting at 500 MB on the
disk?

## 5. Imagine you have 2 partitions, one on /dev/sda1 and the other on /dev/sda2, both 20 GB in
size. How can you use them on a single Btrfs filesystem, in such a way that the contents of one
partition will be automatically mirrored on the other, like on a RAID1 setup? How big will the
filesystem be?

432

## 1. Consider a 2 GB disk with an MBR partition table and the following layout:
Disk /dev/sdb: 1.9 GiB, 1998631936 bytes, 3903578 sectors
Disk model: DataTraveler 2.0
Disk identifier: 0x31a83a48

2048 1050623 1048576

2099200 3147775 1048576

Can you create a 600 MB partition on it? Why?

## 2. On a disk at /dev/sdc, we have a first partition of 1 GB, containing about 256 MB of files. Using
parted, how can you shrink it so it has just enough space for the files?

## 3. Imagine you have a disk at /dev/sdb, and you want to create a 1 GB swap partition at the start
of it. So, using parted, you create the partition with mkpart primary linux-swap 0 1024M.
Then, you enable swap on this partition with swapon /dev/sdb1, but get the following error
message:
swapon: /dev/sdb1: read swap header failed
What went wrong?

## 4. During the course of this lesson, you were trying out some commands in parted but, by
mistake, deleted the 3rd partition on your hard disk. You know that it came after a 250 MB
UEFI partition and a 4 GB swap partition, and was 10 GB in size. Which command can you use
to recover it?

## 5. Imagine you have a 4 GB unused partition on /dev/sda3. Using fdisk, what would be the
sequence of operations to turn it into an active swap partition?

433

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

434

- How to create an MBR partition table on a disk with fdisk, and how to use it to create and
delete partitions.
- How to create an MBR partition table on a disk with gdisk, and how to use it to create and
delete partitions.
- How to create ext2, ext3, ext4, XFS, VFAT and exFAT partitions.
- How to use parted to create, delete and recover partitions on both MBR and GPT disks.
- How to use resize ext2, ext3, ext4 and Brts partitions.
- How to create, set-up and activate swap partitions and swap files.
- fdisk
- gdisk
- mkfs.ext2, mkfs.ext3, mkfs.ext4, mkfs.xfs, mkfs.vfat and mkfs.exfat
- parted
- btrfs
- mkswap
- swapon and swapoff

435

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Which partitioning scheme should be used to partition a 3 TB hard disk into three 1 GB
partitions? Why?
GPT, as MBR supports at most 2 TB hard disks.
2. On gdisk, how can we find out how much space is available on the disk?
Use p (print). The total free space will be shown as the last line of information before the
partition table itself.
3. What would be the command to create an ext3 filesystem, checking for bad blocks before, with
the label MyDisk and a random UUID, on the device /dev/sdc1?
The command would be mkfs.ext3 -c -L MyDisk -U random /dev/sdc1. Alternatively,
mke2fs -t ext3 can also be used instead of mkfs.ext3
4. Using parted, what is the command to create a 300 MB ext4 partition, starting at 500 MB on the
disk?
Use mkpart primary ext4 500m 800m. Remember that you will have to create the filesystem
using mkfs.ext4, as parted does not do this.
5. Imagine you have 2 partitions, one on /dev/sda1 and the other on /dev/sdb1, both 20 GB in
size. How can you use them on a single Btrfs filesystem, in such a way that the contents of one
partition will be automatically mirrored on the other, like on a RAID1 setup? How big will the
filesystem be?
Use mkfs.btrfs /dev/sda1 /dev/sdb1 -m raid1. The resulting filesystem will be 20 GB in
size, as one partition acts simply as a mirror of the other.

436

## 1. Consider a 2 GB disk with an MBR partition table and the following layout:
Disk /dev/sdb: 1.9 GiB, 1998631936 bytes, 3903578 sectors
Disk model: DataTraveler 2.0
Disk identifier: 0x31a83a48

2048 1050623 1048576

2099200 3147775 1048576

Can you create a 600 MB partition on it? Why?
You cannot, because there is not enough contiguous space. The first clue that something is “off”
is the list of devices: you have /dev/sdb1 and /dev/sdb3, but no /dev/sdb2. So, something is
missing.
Then, you need to look where a partition ends and the other one begins. Partition one ends at
sector 1050623, and partition 2 starts at 2099200. That’s a “gap” of 1048577 sectors. At 512
bytes per sector, that’s 536.871.424 bytes. If you divide it by 1024 you get 524.288 Kilobytes.
Divide by 1024 again and you get… 512 MB. This is the size of the “gap”.
If the disk is 2 GB, then we have at most another 512 MB after partition 3. Even if we have in
total around 1 GB unallocated, the biggest contiguous block is 512 MB. So, there is no space for
a 600 MB partition.
2. On a disk at /dev/sdc, we have a first partition of 1 GB, containing an ext4 filesystem with 241
MB of files. Using parted, how can you shrink it so it has just enough space for the files?
This is a multi-part operation. First you have to shrink the filesystem using resize2fs. Instead
of specifying the new size directly, you can use the -M parameter so it is just “big enough”. So:
resize2fs -M /dev/sdc1.
Then, you resize the partition itself with parted using resizepart. Since it is the first partition,
we can assume that it starts at zero and ends at 241 MB. So the command is resizepart 1
241M.

437

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

3. Imagine you have a disk at /dev/sdb, and you want to create a 1 GB partition at the start of it.
So, using parted, you create the partition with mkpart primary linux-swap 0 1024M. Then,
you enable swap on this partition with swapon /dev/sdb1, but get the following error
message:
swapon: /dev/sdb1: read swap header failed
What went wrong?
You created a partition of the correct type (linux-swap), but remember that mkpart does not
create a filesystem. You forgot to set-up the partition as a swap space first with mkswap before
using it.
4. During the course of this lesson, you were trying out some commands in parted but, by
mistake, deleted the 3rd partition on your hard disk. You know that it came after a 250 MB EFI
partition and a 4 GB swap partition, and was 10 GB in size. Which parted command can you
use to recover it?
Don’t panic, you have all the information you need to recover the partition, just use rescue
and do the math. You had 250 MB + 4.096 MB (4*1024) before it, so the start point should be
around 4346 MB. Plus 10.240 MB (10*1024) in size, it should end at 14.586 MB. So, rescue
4346m 14586m should do the trick. You might need to give some “slack” to rescue, starting a
little early and ending a little late, depending on the geometry of your disk.
5. Imagine you have a 4 GB unused partition on /dev/sda3. Using fdisk, what would be the
sequence of operations to turn it into an active swap partition?
First, change the partition type to “Linux Swap” (82), write your changes to disk and quit. Then,
use mkswap to set up the partition as a swap area. Then, use swapon to enable it.

438

### 104.2 Maintain the integrity of filesystems
LPIC-1 version 5.0, Exam 101, Objective 104.2
- Verify the integrity of filesystems.
- Monitor free space and inodes.
- Repair simple filesystem problems.
- du
- df
- fsck
- e2fsck
- mke2fs
- tune2fs
- xfs_repair
- xfs_fsr
- xfs_db

439

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.2 Lesson 1

### 104.2 Maintain the integrity of filesystems

Modern Linux filesystems are journaled. This means that every operation is registered in an
internal log (the journal) before it is executed. If the operation is interrupted due to a system error
(like a kernel panic, power failure, etc.) it can be reconstructed by checking the journal, avoiding
filesystem corruption and loss of data.
This greatly reduces the need for manual filesystem checks, but they may still be needed. Knowing
the tools used for this (and the corresponding parameters) may represent the difference between
dinner at home with your family or an all-nighter in the server room at work.
In this lesson, we will discuss the tools available to monitor filesystem usage, optimize its
operation and how to check and repair damage.

Checking Disk Usage
There are two commands that can be used to check how much space is being used and how much
is left on a filesystem. The first one is du, which stands for “disk usage”.

440

du is recursive in nature. In its most basic form, the command will simply show how many 1
Kilobyte blocks are being used by the current directory and all its subdirectories:
$ du
4816

This is not very helpful, so we can request more “human readable” output by adding the -h
parameter:

By default, du only shows the usage count for directories (considering all files and subdirectories
inside it). To show an individual count for all files in the directory, use the -a parameter:
$ du -ah
432K

./geminoid.jpg

508K

./Linear_B_Hero.jpg

468K

./LG-G8S-ThinQ-Mirror-White.jpg

656K

./LG-G8S-ThinQ-Range.jpg

60K ./Stranger3_Titulo.png
108K

./Baidu_Banho.jpg

324K

./Xiaomi_Mimoji.png

284K

./Mi_CC_9e.jpg

96K ./Mimoji_Comparativo.jpg
32K ./Xiaomi FCC.jpg
484K

./geminoid2.jpg

108K

./Mimoji_Abre.jpg

88K ./Mi8_Hero.jpg
832K

./Tablet_Linear_B.jpg

332K

./Mimoji_Comparativo.png

The default behaviour is to show the usage of every subdirectory, then the total usage of the
current directory, including subdirectories:

./Temp

6.0M

441

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

In the example above, we can see that the subdirectory Temp occupies 4.8 MB and the current
directory, including Temp, occupies 6.0 MB. But how much space do the files in the current
directory occupy, excluding the subdirectories? For that we have the -S parameter:
$ du -Sh

./Temp

1.3M

Keep in mind that command line parameters are case-sensitive: -s is different from
-S.

If you want to keep this distinction between the space used by the files in the current directory
and the space used by subdirectories, but also want a grand total at the end, you can add the -c
parameter:
$ du -Shc

./Temp

1.3M

6.0M

total

You can control how “deep” the output of du should go with the -d N parameter, where N
describes the levels. For example, if you use the -d 1 parameter, it will show the current
directory and its subdirectories, but not the subdirectories of those.
See the difference below. Without -d:
216K

./somedir/anotherdir

And limiting the depth to one level with -d 1:
$ du -h -d1

Please note that even if anotherdir is not being shown, its size is still being taken into account.
You may wish to exclude some types of files from the count, which you can do with
442

--exclude="PATTERN", where PATTERN is the pattern against which you wish to match. Consider
this directory:
$ du -ah
124K

./ASM68K.EXE

2.0M

./Contra.bin

36K ./fixheadr.exe

./README.txt

2.1M

./Contra_NEW.bin

./Built.bat

8.0K

./Contra_Main.asm

4.2M

Now, we will use --exclude to filter out every file with the .bin extension:
$ du -ah --exclude="*.bin"
124K

./ASM68K.EXE

36K ./fixheadr.exe

./README.txt

./Built.bat

8.0K

./Contra_Main.asm

180K

Note that the total no longer reflects the size of the excluded files.

Checking for Free Space
du works at the files level. There is another command that can show you disk usage, and how
much space is available, at the filesystem level. This command is df.
The command df will provide a list of all of the available (already mounted) filesystems on your
system, including their total size, how much space has been used, how much space is available,
the usage percentage and where it is mounted:
$ df

1K-blocks
2943068

Used Available Use% Mounted on

2943068

595892

2496

593396

110722904

25600600

79454800

2979440

951208

2028232

32% /dev/shm

5120

5120

0% /run/lock

443

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

2979440

2979440

0% /sys/fs/cgroup

595888

24

595864

1% /run/user/119

595888

116

595772

89111

1550

80824

83187

1550

75330

90827

1921

82045

312570036 233740356

78829680

However, showing the size in 1 KB blocks is not very user-friendly. Like on du, you can add the -h
parameters to get a more “human readable” output:
$ df -h

2.5M

580M

930M

2.0G

32% /dev/shm

0% /run/lock

0% /sys/fs/cgroup

24K

1% /run/user/119

116K

299G

223G

You can also use the -i parameter to show used/available inodes instead of blocks:
$ df -i

Inodes

IUsed

IFree IUse% Mounted on

737142

547

736595

1% /dev

908

744310

/dev/sda6

6766592 307153 6459439

5% /

215

745003

1% /dev/shm

745214

1% /run/lock

745200

1% /sys/fs/cgroup

62464

355

62109

1% /boot

43

745175

One useful parameter is -T, which will also print the type of each filesystem:

444

$ df -hT

devtmpfs

2.5M

580M

930M

2.0G

32% /dev/shm

0% /run/lock

0% /sys/fs/cgroup

24K

1% /run/user/119

116K

fuseblk

299G

223G

Knowing the type of the filesystem you can filter the output. You can show only filesystems of a
given type with -t TYPE, or exclude filesystems of a given type with -x TYPE, like in the
examples below.
Excluding tmpfs filesystems:
$ df -hx tmpfs

299G

223G

Showing only ext4 filesystems:
$ df -ht ext4

You can also customize the output of df, selecting what should be displayed and in which order,
using the --output= parameter followed by a comma separated list of fields you wish to display.

445

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Some of the available fields are:
source
The device corresponding to the filesystem.
fstype
The filesystem type.
size
The total size of the filesystem.
used
How much space is being used.
avail
How much space is available.
pcent
The usage percentage.
target
Where the filesystem is mounted (mount point).
If you want an output showing the target, source, type and usage, you can use:
$ df -h --output=target,source,fstype,pcent
Mounted on

/dev

devtmpfs

Use%

/run

25%

/dev/shm

32%

/run/lock

0%

/sys/fs/cgroup

0%

/run/user/119

/run/user/1000

/media/carol/part1

2%

/media/carol/part3

3%

/media/carol/part2

3%

/media/carol/Samsung Externo

fuseblk

75%

0%

df can also be used to check inode information, by passing the following fields to --output=:

446

itotal
The total number of inodes in the filesystem.
iused
The number of used inodes in the filesystem.
iavail
The number of available inodes in the filesystem.
ipcent
The percentage of used inodes in the filesystem.
For example:
$ df --output=source,fstype,itotal,iused,ipcent

Inodes

IUsed IUse%

devtmpfs

735764

593

1048

7069696 318651

5%

222

22

40

Maintaining ext2, ext3 and ext4 Filesystems
To check a filesystem for errors (and hopefully fix them), Linux provides the fsck utility (think of
“filesystem check” and you will never forget the name). In its most basic form, you can invoke it
with fsck followed by the filesystem’s location you want to check:
fsck from util-linux 2.33.1
e2fsck 1.44.6 (5-Mar-2019)
DT_2GB: clean, 20/121920 files, 369880/487680 blocks

NEVER run fsck (or related utilities) on a mounted filesystem. If this is done
anyway, data may be lost.

fsck itself will not check the filesystem, it will merely call the appropriate utility for the

447

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

filesystem type to do so. In the example above, since a filesystem type was not specified, fsck
assumed an ext2/3/4 filesystem by default, and called e2fsck.
To specify a filesystem, use the -t option, followed by the filesystem name, like in fsck -t vfat
/dev/sdc. Alternatively, you may call a filesystem-specific utility directly, like fsck.msdos for
FAT filesystems.

Type fsck followed by Tab twice to see a list of all related commands on your system.

fsck can take some command-line arguments. These are some of the most common:
-A
This will check all filesystems listed in /etc/fstab.
-C
Displays a progress bar when checking a filesystem. Currently only works on ext2/3/4
filesystems.
-N
This will print what would be done and exit, without actually checking the filesystem.
-R
When used in conjunction with -A, this will skip checking the root filesystem.
-V
Verbose mode, prints more information than usual during operation. This is useful for
debugging.
The specific utility for ext2, ext3 and ext4 filesystems is e2fsck, also called fsck.ext2,
fsck.ext3 and fsck.ext4 (those three are merely links to e2fsck). By default, it runs in
interactive mode: when a filesystem error is found, it stops and asks the user what to do. The user
must type y to fix the problem, n to leave it unfixed or a to fix the current problem and all
subsequent ones.
Of course sitting in front of a terminal waiting for e2fsck to ask what to do is not a productive use
of your time, especially if you are dealing with a big filesystem. So, there are options that cause
e2fsck to run in non-interactive mode:
-p
This will attempt to automatically fix any errors found. If an error that requires intervention
from the system administrator is found, e2fsck will provide a description of the problem and
exit.
448

-y
This will answer y (yes) to all questions.
-n
The opposite of -y. Besides answering n (no) to all questions, this will cause the filesystem to be
mounted read-only, so it cannot be modified.
Forces e2fsck to check a filesystem even if is marked as “clean”, i.e. has been correctly
unmounted.

Fine Tuning an ext Filesystem
ext2, ext3 and ext4 filesystems have a number of parameters that can be adjusted, or “tuned”, by
the system administrator to better suit the system needs. The utility used to display or modify
these parameters is called tune2fs.
To see the current parameters for any given filesystem, use the -l parameter followed by the
device representing the partition. The example below shows the output of this command on the
first partition of the first disk (/dev/sda1) of a machine:
tune2fs 1.44.6 (5-Mar-2019)
Filesystem volume name:

<none>

Last mounted on:

Filesystem UUID:

6e2c12e3-472d-4bac-a257-c49ac07f3761

Filesystem magic number:

0xEF53

Filesystem revision #:

1 (dynamic)

Filesystem features:

has_journal ext_attr resize_inode dir_index filetype

needs_recovery extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize
metadata_csum
Filesystem flags:

signed_directory_hash

Default mount options:

user_xattr acl

Filesystem state:

clean

Errors behavior:

Continue

Filesystem OS type:

Linux

Inode count:

7069696

Block count:

28255605

Reserved block count:

1412780

Free blocks:

23007462

Free inodes:

6801648

First block:

449

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Block size:

Fragment size:

Group descriptor size:

64

Reserved GDT blocks:

1024

Blocks per group:

32768

Fragments per group:

32768

Inodes per group:

8192

Inode blocks per group:

512

Flex block group size:

16

Filesystem created:

Mon Jun 17 13:49:59 2019

Last mount time:

Fri Jun 28 21:14:38 2019

Last write time:

Mon Jun 17 13:53:39 2019

Mount count:

Maximum mount count:

-1

Last checked:

Mon Jun 17 13:49:59 2019

Check interval:

0 (<none>)

Lifetime writes:

20 GB

Reserved blocks uid:

0 (user root)

Reserved blocks gid:

0 (group root)

First inode:

Inode size:

256

Required extra isize:

32

Desired extra isize:

32

Journal inode:

First orphan inode:

5117383

Default directory hash:

half_md4

Directory Hash Seed:

fa95a22a-a119-4667-a73e-78f77af6172f

Journal backup:

inode blocks

Checksum type:

crc32c

Checksum:

0xe084fe23

ext filesystems have mount counts. The count is increased by 1 each time the filesystem is
mounted, and when a threshold value (the maximum mount count) is reached the system will be
automatically checked with e2fsck on the next boot.
The maximum mount count can be set with the -c N parameter, where N is the number of times
the filesystem can be mounted without being checked. The -C N parameter sets the number of
times the system has been mounted to the value of N. Note that command line parameters are
case-sensitive, so -c is different from -C.
It is also possible to define a time interval between checks, with the -i parameter, followed by a
number and the letters d for days, m for months and y for years. For example, -i 10d would
check the filesystem at the next reboot every 10 days. Use zero as the value to disable this feature.

450

-L can be used to set a label for the filesystem. This label can have up to 16 characters. The -U
parameter sets the UUID for the filesystem, which is a 128 bit hexadecimal number. In the
example above, the UUID is 6e2c12e3-472d-4bac-a257-c49ac07f3761. Both the label and UUID
can be used instead of the device name (like /dev/sda1) to mount the filesystem.
The option -e BEHAVIOUR defines the kernel behaviour when a filesystem error is found. There
are three possible behaviours:
continue
Will continue execution normally.
remount-ro
Will remount the filesystem as read-only.
panic
Will cause a kernel panic.
The default behaviour is to continue. remount-ro might be useful in data-sensitive applications,
as it will immediately stop writes to the disk, avoiding more potential errors.
ext3 filesystems are basically ext2 filesystems with a journal. Using tune2fs you can add a
journal to an ext2 filesystem, thus converting it to ext3. The procedure is simple, just pass the -j
parameter to tune2fs, followed by the device containing the filesystem:

Afterwards, when mounting the converted filesystem, do not forget to set the type to ext3 so the
journal can be used.
When dealing with journaled filesystems, the -J parameter allows you to use extra parameters to
set some journal options, like -J size= to set the journal size (in megabytes), -J location= to
specify where the journal should be stored (either a specific block, or a specific position on the
disk with suffixes like M or G) and even put the journal on an external device with -J device=.
You can specify multiple parameters at once by separating them with a comma. For example: -J
size=10,location=100M,device=/dev/sdb1 will create a 10 MB Journal at the 100 MB position
on the device /dev/sdb1.

tune2fs has a “brute force” option, -f, which will force it to complete an
operation even if errors are found. Needless to say, this should be only used
with extreme caution.

451

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Maintaining XFS Filesystems
For XFS filesystems, the equivalent of fsck is xfs_repair. If you suspect that something is wrong
with the filesystem, the first thing to do is to scan it for damage.
This can be done by passing the -n parameter to xfs_repair, followed by the device containing
the filesystem. The -n parameter means “no modify”: the filesystem will be checked, errors will be
reported but no repairs will be made:
Phase 1 - find and verify superblock...
Phase 2 - using internal log
- zero log...
- scan filesystem freespace and inode maps...
- found root inode chunk
Phase 3 - for each AG...
- scan (but do not clear) agi unlinked lists...
- process known inodes and perform inode discovery...
- agno = 0
- agno = 1
- agno = 2
- agno = 3
- process newly discovered inodes...
Phase 4 - check for duplicate blocks...
- setting up duplicate extent list...
- check for inodes claiming duplicate blocks...
- agno = 1
- agno = 3
- agno = 0
- agno = 2
No modify flag set, skipping phase 5
Phase 6 - check inode connectivity...
- traversing filesystem ...
- traversal finished ...
- moving disconnected inodes to lost+found ...
Phase 7 - verify link counts...
No modify flag set, skipping filesystem flush and exiting.

If errors are found, you can proceed to do the repairs without the -n parameter, like so:
xfs_repair /dev/sdb1.
xfs_repair accepts a number of command line options. Among them:

452

-l LOGDEV and -r RTDEV
These are needed if the filesystem has external log and realtime sections. In this case, replace
LOGDEV and RTDEV with the corresponding devices.
-m N
Is used to limit the memory usage of xfs_repair to N megabytes, something which can be
useful on server settings. According to the man page, by default xfs_repair will scale its
memory usage as needed, up to 75% of the system’s physical RAM.
-d
The “dangerous” mode will enable the repair of filesystems that are mounted read-only.
-v
You may have guessed it: verbose mode. Each time this parameter is used, the “verbosity” is
increased (for example, -v -v will print more information than just -v).
Note that xfs_repair is unable to repair filesystems with a “dirty” log. You can “zero out” a
corrupt log with the -L parameter, but keep in mind that this is a last resort as it may result in
filesystem corruption and data loss.
To debug an XFS filesystem, the utility xfs_db can be used, like in xfs_db /dev/sdb1. This is
mostly used to inspect various elements and parameters of the filesystem.
This utility has an interactive prompt, like parted, with many internal commands. A help system
is also available: type help to see a list of all commands, and help followed by the command
name to see more information about the command.
Another useful utility is xfs_fsr, which can be used to reorganize (“defragment”) an XFS
filesystem. When executed without any extra arguments it will run for two hours and try to
defragment all mounted, writable XFS filesystems listed on the /etc/mtab/ file. You may need to
install this utility using the package manager for your Linux distribution, as it may not be part of a
default install. For more information consult the corresponding man page.

453

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Using du, how can we check how much space is being used by just the files on the current
directory?

## 2. Using df, list information for every ext4 filesystem, with the outputs including the following
fields, in order: device, mount point, total number of inodes, number of available inodes,
percentage of free space.

## 3. What is the command to run e2fsck on /dev/sdc1 in non-interactive mode, while trying to
automatically fix most errors?

## 4. Suppose /dev/sdb1 is an ext2 filesystem. How can you convert it to ext3, and at the same time
reset its mount count and change its label to UserData?

5. How can you check for errors on an XFS filesystem, without repairing any damage found?

454

## 1. Consider you have an ext4 filesystem on /dev/sda1 with the following parameters, obtained
with tune2fs:
Mount count:

Maximum mount count:

-1

What will happen at the next boot if the command tune2fs -c 9 /dev/sda1 is issued?

## 2. Consider the following output of du -h:
216K

./somedir/anotherdir

How much space is occupied by just the files on the current directory? How could we rewrite
the command to show this information more clearly?

3. What would happen to the ext2 filesystem /dev/sdb1 if the command below is issued?

## 4. How can we check for errors on a XFS filesystem on /dev/sda1 that has a log section on
/dev/sdc1, without actually making any repairs?

5. What is the difference between the -T and -t parameters for df?

455

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

- How to check for used and free space on a filesystem.
- How to tailor the output of df to suit your needs.
- How to check the integrity of and repair a filesystem with fsck and e2fsck.
- How to fine tune an ext filesystem with tune2fs.
- How to check and repair XFS filesystems with xfs_repair.
du
View the amount of disk space in use on a filesystem.
df
View the amount of disk space that is available (free) on a filesystem.
fsck
The filesystem check repair utility.
e2fsck
The filesystem check repair utility specific to extended (ext2/3/4) filesystems.
tune2fs
Modifies filesystem parameters on an extended (ext2/3/4) filesystem.
xfs_repair
The equivalent of fsck for XFS filesystems.
xfs_db
This utility is used to view various parameters of an XFS filesystem.

456

## 1. Using du, how can we check how much space is being used by just the files on the current
directory?
First, use the -S parameter to separate the output of the current directory from its
subdirectories. Then, use -d 0 to limit the output depth to zero, meaning “no subdirectories”.
Do not forget -h to get an output in an “human-readable” format:
$ du -S -h -d 0

$ du -Shd 0

## 2. Using df, list information for every ext4 filesystem, with the outputs including the following
fields, in order: device, mount point, total number of inodes, number of available inodes,
percentage of free space.
You can filter filesystems with the -t option followed by the filesystem name. To get the output
needed, use --output=source,target,itotal,iavail,pcent. So, the answer is:
$ df -t ext4 --output=source,target,itotal,iavail,pcent

## 3. What is the command to run e2fsck on /dev/sdc1 in non-interactive mode, while trying to
automatically fix most errors?
The parameter to automatically try to fix most errors is -p. So the answer is:

## 4. Suppose /dev/sdb1 is an ext2 filesystem. How can you convert it to ext3 and at the same time
reset its mount count and change its label to UserData?
Remember that converting an ext2 filesystem to ext3 is just a matter of adding a journal, which
can be done with the -j parameter. To reset the mount count, use -C 0. To change the label
use -L UserData. The correct answer is:

457

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

5. How can you check for errors on an XFS filesystem, without repairing any damage found?
Use the -n parameter, like in xfs -n, followed by the corresponding device.

458

## 1. Consider you have an ext4 filesystem on /dev/sda1 with the following parameters, obtained
with tune2fs:
Mount count:

Maximum mount count:

-1

What will happen at the next boot if the command tune2fs -c 9 /dev/sda1 is issued?
The command will set the maximum mount count for the filesystem to 9. Since the mount
count is currently 8, the next system boot will cause a filesystem check.
2. Consider the following output of du -h:
216K

./somedir/anotherdir

How much space is occupied by just the files on the current directory? How could we rewrite
the command to show this information more clearly?
Of the total of 232 K used, 224 K are used by the subdirectory somedir and its subdirectories.
So, excluding those, we have 8K being occupied by the files on the current directory. This
information can be shown more clearly by using the -S parameter, which will separate the
directories in the count.
3. What would happen to the ext2 filesystem /dev/sdb1 if the command below is issued?

A journal will be added to /dev/sdb1, converting it to ext3. The journal will be stored on the
device /dev/sdc1 and the filesystem will be checked every 30 days.
4. How can we check for errors on a XFS filesystem on /dev/sda1 that has a log section on
/dev/sdc1, without actually making any repairs?
Use xfs_repair, followed by -l /dev/sdc1 to indicate the device containing the log section,
and -n to avoid making any changes.

459

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

5. What is the difference between the -T and -t parameters for df?
The parameter -T will include the type of each filesystem in the output of df. -t is a filter, and
will show only filesystems of the given type on the output, excluding all others.

460

### 104.3 Control mounting and unmounting of filesystems
LPIC-1 version 5.0, Exam 101, Objective 104.3
- Manually mount and unmount filesystems.
- Configure filesystem mounting on bootup.
- Configure user mountable removable filesystems.
- Use of labels and UUIDs for identifying and mounting file systems.
- Awareness of systemd mount units.
- /etc/fstab
- /media/
- mount
- umount
- blkid
- lsblk

461

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.3 Lesson 1

### 104.3 Control mounting and unmounting of
filesystems

Up until now, you learned how to partition disks and how to create and maintain filesystems on
them. However before a filesystem can be accessed on Linux, it needs to be mounted.
This means attaching the filesystem to a specific point in your system’s directory tree, called a
mount point. Filesystems can be mounted manually or automatically and there are many ways to
do this. We will learn about some of them in this lesson.

Mounting and Unmounting Filesystems
The command to manually mount a filesystem is called mount and its syntax is:
mount -t TYPE DEVICE MOUNTPOINT

Where:

462

TYPE
The type of the filesystem being mounted (e.g. ext4, btrfs, exfat, etc.).
DEVICE
The name of the partition containing the filesystem (e.g. /dev/sdb1)
MOUNTPOINT
Where the filesystem will be mounted. The mounted-on directory need not be empty, although
it must exist. Any files in it, however, will be inaccessible by name while the filesystem is
mounted.
For example, to mount a USB flash drive containing an exFAT filesystem located on /dev/sdb1 to
a directory called flash under your home directory, you could use:

Many Linux systems use the Bash shell, and on those the tilde ~ on the path to the
mountpoint is a shorthand for the current user’s home directory. If the current user
is named john, for example, it will be replaced by /home/john.

After mounting, the contents of the filesystem will be accessible under the ~/flash directory:

ls -lh ~/flash/

total 469M
-rwxrwxrwx 1 root root 454M jul 19 09:49 lineage-16.0-20190711-MOD-quark.zip
-rwxrwxrwx 1 root root

16M jul 19 09:44 twrp-3.2.3-mod_4-quark.img

Listing Mounted Filesystems
If you type just mount, you will get a list of all the filesystems currently mounted on your system.
This list can be quite large, because in addition to the disks attached to your system, it also
contains a number of run-time filesystems in memory that serve various purposes. To filter the
output, you can use the -t parameter to list only filesystems of the corresponding type, like below:
/dev/sda1 on / type ext4 (rw,noatime,errors=remount-ro)

You can specify multiple filesystems at once by separating them with a comma:

463

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

/dev/sda1 on / type ext4 (rw,noatime,errors=remount-ro)
/dev/sdb1 on /home/carol/flash type fuseblk
(rw,nosuid,nodev,relatime,user_id=0,group_id=0,default_permissions,allow_other,blksize=4096)
[DT_8GB]

The output in the examples above can be described in the format:
SOURCE on TARGET type TYPE OPTIONS

Where SOURCE is the partition which contains the filesystem, TARGET is the directory where it is
mounted, TYPE is the filesystem type and OPTIONS are the options passed to the mount command
at mount time.

Additional Command Line Parameters
There are many command line parameters that can be used with mount. Some of the most used
ones are:
-a
This will mount all filesystems listed in the file /etc/fstab (more on that in the next section).
-o or --options
This will pass a list of comma-separated mount options to the mount command, which can
change how the filesystem will be mounted. These will also be discussed alongside
/etc/fstab.
-r or -ro
This will mount the filesystem as read-only.
-w or -rw
This will the mount filesystem as writable.
To unmount a filesystem, use the umount command, followed by the device name or the mount
point. Considering the example above, the commands below are interchangeable:

464

Some of the command line parameters to umount are:
-a
This will unmount all filesystems listed in /etc/fstab.
This will force the unmounting of a filesystem. This may be useful if you mounted a remote
filesystem that has become unreachable.
-r
If the filesystem cannot be unmounted, this will try to make it read-only.

Dealing with Open Files
When unmounting a filesystem, you may encounter an error message stating that the target is
busy. This will happen if any files on the filesystem are open. However, it may not be immediately
obvious where an open file is located, or what is accessing the filesystem.
In such cases you may use the lsof command, followed by the name of the device containing the
filesystem, to see a list of processes accessing it and which files are open. For example:
umount: /media/carol/External_Drive: target is busy.
COMMAND

FD

TYPE DEVICE SIZE/OFF NODE NAME

evince

3135 carol

16r

REG

8,17 21881768 5195 /media/carol/External_Drive/Documents/E-

Books/MagPi40.pdf

COMMAND is the name of the executable that opened the file, and PID is the process number. NAME
is the name of the file that is open. In the example above, the file MagPi40.pdf is opened by the
program evince (a PDF viewer). If we close the program, then we will be able to unmount the
filesystem.
Before the lsof output appears GNOME users may see a warning message in the
terminal window.

lsof: WARNING: can't stat() fuse.gvfsd-fuse file system /run/user/1000/gvfs
Output information may be incomplete.

465

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

lsof tries to process all mounted filesystems. This warning message is raised
because lsof has encountered a GNOME Virtual file system (GVFS). This is a special
case of a filesystem in user space (FUSE). It acts as a bridge between GNOME, its APIs
and the kernel. No one—not even root—can access one of these file systems, apart
from the owner who mounted it (in this case, GNOME). You can ignore this warning.

Where to Mount?
You can mount a filesystem anywhere you want. However, there are some good practices that
should be followed to make system administration easier.
Traditionally, /mnt was the directory under which all external devices would be mounted and a
number of pre-configured “anchor points” for common devices, like CD-ROM drives (/mnt/cdrom)
and floppy disks (/mnt/floppy) existed under it.
This has been superseded by /media, which is now the default mount point for any userremovable media (e.g. external disks, USB flash drives, memory card readers, etc.) connected to
the system.
On most modern Linux distributions and desktop environments, removable devices are
automatically mounted under /media/USER/LABEL when connected to the system, where USER is
the username and LABEL is the device label. For example, a USB flash drive with the label
FlashDrive connected by the user john would be mounted under /media/john/FlashDrive/.
The way this is handled is different depending on the desktop environment.
That being said, whenever you need to manually mount a filesystem, it is good practice to mount it
under /mnt.

Mounting Filesystems on Bootup
The file /etc/fstab contains descriptions about the filesystems that can be mounted. This is a
text file, where each line describes a filesystem to be mounted, with six fields per line in the
following order:
FILESYSTEM MOUNTPOINT TYPE OPTIONS DUMP PASS

Where:
FILESYSTEM
The device containing the filesystem to be mounted. Instead of the device, you can specify the
UUID or label of the partition, something which we will discuss later on.
466

MOUNTPOINT
Where the filesystem will be mounted.
TYPE
The filesystem type.
OPTIONS
Mount options that will be passed to mount.
DUMP
Indicates whether any ext2, ext3 or ext4 filesystems should be considered for backup by the
dump command. Usually it is zero, meaning they should be ignored.
PASS
When non-zero, defines the order in which the filesystems will be checked on bootup. Usually
it is zero.
For example, the first partition on the first disk of a machine could be described as:

noatime,errors

The mount options on OPTIONS are a comma-separated list of parameters, which can be generic
or filesystem specific. Among the generic ones we have:
atime and noatime
By default, every time a file is read the access time information is updated. Disabling this (with
noatime) can speed up disk I/O. Do not confuse this with the modification time, which is
updated every time a file is written to.
auto and noauto
Whether the filesystem can (or can not) be mounted automatically with mount -a.
defaults
This will pass the options rw, suid, dev, exec, auto, nouser and async to mount.
dev and nodev
Whether character or block devices in the mounted filesystem should be interpreted.
exec and noexec
Allow or deny permission to execute binaries on the filesystem.

467

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

user and nouser
Allows (or not) an ordinary user to mount the filesystem.
group
Allows a user to mount the filesystem if the user belongs to the same group which owns the
device containing it.
owner
Allows a user to mount a filesystem if the user owns the device containing it.
suid and nosuid
Allow, or not, SETUID and SETGID bits to take effect.
ro and rw
Mount a filesystem as read-only or writable.
remount
This will attempt to remount an already mounted filesystem. This is not used on /etc/fstab,
but as a parameter to mount -o. For example, to remount the already mounted partition
/dev/sdb1 as read-only, you could use the command mount -o remount,ro /dev/sdb1.
When remounting, you do not need to specify the filesystem type, only the device name or the
mount point.
sync and async
Whether to do all I/O operations to the filesystem synchronously or asynchronously. async is
usually the default. The manual page for mount warns that using sync on media with a limited
number of write cycles (like flash drives or memory cards) may shorten the life span of the
device.

Using UUIDs and Labels
Specifying the name of the device containing the filesystem to mount may introduce some
problems. Sometimes the same device name may be assigned to another device depending on
when, or where, it was connected to your system. For example, a USB flash drive on /dev/sdb1
may be assigned to /dev/sdc1 if plugged on another port, or after another flash drive.
One way to avoid this is to specify the label or UUID (Universally Unique Identifier) of the volume.
Both are specified when the filesystem is created and will not change, unless the filesystem is
destroyed or manually assigned a new label or UUID.
The command lsblk can be used to query information about a filesystem and find out the label
468

and UUID associated to it. To do this, use the -f parameter, followed by the device name:
$ lsblk -f /dev/sda1
NAME FSTYPE LABEL UUID
sda1 ext4

FSAVAIL FSUSE% MOUNTPOINT

6e2c12e3-472d-4bac-a257-c49ac07f3761

64,9G

33% /

Here is the meaning of each column:
NAME
Name of the device containing the filesystem.
FSTYPE
Filesystem type.
LABEL
Filesystem label.
UUID
Universally Unique Identifier (UUID) assigned to the filesystem.
FSAVAIL
How much space is available in the filesystem.
FSUSE%
Usage percentage of the filesystem.
MOUNTPOINT
Where the filesystem is mounted.
In /etc/fstab a device can be specified by its UUID with the UUID= option, followed by the UUID,
or with LABEL=, followed by the label. So, instead of:

noatime,errors

You would use:
UUID=6e2c12e3-472d-4bac-a257-c49ac07f3761

noatime,errors

Or, if you have a disk labeled homedisk:

469

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

LABEL=homedisk

/home ext4

defaults

The same syntax can be used with the mount command. Instead of the device name, pass the UUID
or label. For example, to mount an external NTFS disk with the UUID 56C11DCC5D2E1334 on
/mnt/external, the command would be:
$ mount -t ntfs UUID=56C11DCC5D2E1334 /mnt/external

Mounting Disks with Systemd
Systemd is the init process, the first process to run on many Linux distributions. It is responsible
for spawning other processes, starting services and bootstraping the system. Among many other
tasks, systemd can also be used to manage the mounting (and automounting) of filesystems.
To use this feature of systemd, you need to create a configuration file called a mount unit. Each
volume to be mounted gets its own mount unit and they need to be placed in
/etc/systemd/system/.
Mount units are simple text files with the .mount extension. The basic format is shown below:
Description=
What=
Where=
Type=
Options=
WantedBy=

Description=
Short description of the mount unit, something like Mounts the backup disk.
What=
What should be mounted. The volume must be specified as /dev/disk/by-uuid/VOL_UUID
where VOL_UUID is the UUID of the volume.

470

Where=
Should be the full path to where the volume should be mounted.
Type=
The filesystem type.
Options=
Mount options that you may wish to pass, these are the same used with the mount command or
in /etc/fstab.
WantedBy=
Used for dependency management. In this case, we will use multi-user.target, which
means that whenever the system boots into a multi-user environment (a normal boot) the unit
will be mounted.
Our previous example of the external disk could be written as:
Description=External data disk
What=/dev/disk/by-uuid/56C11DCC5D2E1334
Type=ntfs
Options=defaults

But we are not done yet. To work correctly, the mount unit must have the same name as the
mount point. In this case, the mount point is /mnt/external, so the file should be named mntexternal.mount.
After that, you need to restart the systemd daemon with the systemctl command, and start the
unit:

Now the contents of the external disk should be available on /mnt/external. You can check the

471

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

status of the mounting with the command systemctl status mnt-external.mount, like
below:
- mnt-external.mount - External data disk
Loaded: loaded (/etc/systemd/system/mnt-external.mount; disabled; vendor pres
Active: active (mounted) since Mon 2019-08-19 22:27:02 -03; 14s ago
Where: /mnt/external
What: /dev/sdb1
Tasks: 0 (limit: 4915)
Memory: 128.0K
CGroup: /system.slice/mnt-external.mount
ago 19 22:27:02 pop-os systemd[1]: Mounting External data disk...
ago 19 22:27:02 pop-os systemd[1]: Mounted External data disk.

The systemctl start mnt-external.mount command will only enable the unit for the current
session. If you want to enable it on every boot, replace start with enable:

Automounting a Mount Unit
Mount units can be automounted whenever the mount point is accessed. To do this, you need an
.automount file, alongside the .mount file describing the unit. The basic format is:
Description=
[Automount]
Where=

Like before, Description= is a short description of the file, and Where= is the mountpoint. For
example, an .automount file for our previous example would be:
Description=Automount for the external data disk

472

[Automount]

Save the file with the same name as the mount point (in this case, mnt-external.automount),
reload systemd and start the unit:

Now whenever the /mnt/external directory is accessed, the disk will be mounted. Like before, to
enable the automount on every boot you would use:

473

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Using mount, how can you mount an ext4 filesystem on /dev/sdc1 to /mnt/external as
read-only, using the noatime and async options?

2. When unmounting a filesystem at /dev/sdd2, you get the target is busy error message.
How can you find out which files on the filesystem are open, and what processes opened them?

## 3. Consider
/data
noatime,noauto,async. Will this filesystem be mounted if the command mount -a is issued?
Why?

4. How can you find out the UUID of a filesystem under /dev/sdb1?

## 5. How can you use mount to remount as read-only an exFAT filesystem with the UUID
6e2c12e3-472d-4bac-a257-c49ac07f3761, mounted at /mnt/data?

6. How can you get a list of all ext3 and ntfs filesystems currently mounted on a system?

474

## 1. Consider
/backup
noatime,nouser,async. Can a user mount this filesystem with the command mount
/backup? Why?

## 2. Consider a remote filesystem mounted at /mnt/server, which has become unreachable due to
a loss of network connectivity. How could you force it to be unmounted, or mounted as readonly if this is not possible?

## 3. Write an /etc/fstab entry that would mount a btrfs volume with the label Backup on
/mnt/backup, with default options and without allowing the execution of binaries from it.

## 4. Consider the following systemd mount unit:
Description=External data disk
What=/dev/disk/by-uuid/56C11DCC5D2E1334
Type=ntfs
Options=defaults

- What would be an equivalent /etc/fstab entry for this filesystem?

## 5. What should be the file name for the unit above, so it can be used by systemd? Where should it
be placed?

475

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

In this lesson, you learned how to mount and unmount filesystems, manually or automatically.
Some of the commands and concepts explained were:
- mount (mounts a device to a location)
- umount (unmounts a device)
- lsof (lists the processes accessing a filesystem)
- /mnt and /media directories
- /etc/fstab
- lsblk (lists the type and UUID of a filesystem)
- How to mount a filesystem using its UUID or label.
- How to mount a filesystem using systemd mount units.
- How to automount a filesystem using systemd mount units.

476

## 1. Using mount, how can you mount an ext4 filesystem on /dev/sdc1 to /mnt/external as
read-only, using the noatime and async options?

2. When unmounting a filesystem at /dev/sdd2, you get the target is busy error message.
How can you find out which files on the filesystem are open, and what processes opened them?
Use lsof followed by the device name:
$ lsof /dev/sdd2

## 3. Consider
/data
noatime,noauto,async. Will this filesystem be mounted if the command mount -a is issued?
Why?
It will not be mounted. The key is the noauto parameter, which means this entry be ignored by
mount -a.
4. How can you find out the UUID of a filesystem under /dev/sdb1?
Use lsblk -f, followed by the filesystem name:
$ lsblk -f /dev/sdb1

## 5. How can you use mount to remount as read-only an exFAT filesystem with the UUID
6e2c12e3-472d-4bac-a257-c49ac07f3761, mounted at /mnt/data?
Since the filesystem is mounted, you do not need to worry about the filesystem type or the ID,
just use the remount option with the ro (read-only) parameter and the mount point:

6. How can you get a list of all ext3 and ntfs filesystems currently mounted on a system?
Use mount -t, followed by a comma-separated list of filesystems:

477

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

478

## 1. Consider
/backup
noatime,nouser,async. Can a user mount this filesystem with the command mount
/backup? Why?
No, the parameter nouser will not allow ordinary users to mount this filesystem.
2. Consider a remote filesystem mounted at /mnt/server, which has become unreachable due to
a loss of network connectivity. How could you force it to be unmounted, or mounted as readonly if this is not possible?
Pass the -f and -r parameters to unmount. The command would be umount -f -r
/mnt/server. Remember that you can group parameters, so umount -fr /mnt/server
would also work.
3. Write an /etc/fstab entry that would mount an btrfs volume with the label Backup on
/mnt/backup, with default options and without allowing the execution of binaries from it.
The line should be LABEL=Backup /mnt/backup btrfs defaults,noexec
4. Consider the following systemd mount unit:
Description=External data disk
What=/dev/disk/by-uuid/56C11DCC5D2E1334
Type=ntfs
Options=defaults

- What would be an equivalent /etc/fstab entry for this filesystem?
The entry would be: UUID=56C11DCC5D2E1334 /mnt/external ntfs defaults
5. What should be the file name for the unit above, so it can be used by systemd? Where should it
be placed?

479

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

The filename must be the same as the mount point, so mnt-external.mount, placed in
/etc/systemd/system.

480

### 104.5 Manage file permissions and ownership
LPIC-1 version 5.0, Exam 101, Objective 104.5
- Manage access permissions on regular and special files as well as directories.
- Use access modes such as suid, sgid and the sticky bit to maintain security.
- Know how to change the file creation mask.
- Use the group field to grant file access to group members.
- chmod
- umask
- chown
- chgrp

481

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.5 Lesson 1

### 104.5 Manage file permissions and ownership

Being a multi-user system, Linux needs some way to track who owns each file and whether or not
a user is allowed to perform actions on a file. This is to ensure the privacy of users who might
want to keep the contents of their files confidential, as well as to ensure collaboration by making
certain files accessible to multiple users.
This is done through a three-level permissions system. Every file on disk is owned by a user and a
user group and has three sets of permissions: one for its owner, one for the group who owns the
file and one for everyone else. In this lesson, you will learn how to query the permissions for a
file, the meaning of these permissions and how to manipulate them.

Querying Information about Files and Directories
The command ls is used to get a listing of the contents of any directory. In this basic form, all you
get are the filenames:

482

Another_Directory

picture.jpg

text.txt

But there is much more information available for each file, including its type, size, ownership and
more. To see this information you must ask ls for a “long form” listing, using the -l parameter:
$ ls -l
total 536
drwxrwxr-x 2 carol carol

## 4096. Dec 10 15:57 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg

## 1881. Dec 10 15:57 text.txt

Each column on the output above has a meaning. Let us have a look at the columns relevant for
this lesson.
- The first column on the listing shows the file type and permissions. For example, on drwxrwxrx:
- The first character, d, indicates the file type.
- The next three characters, rwx, indicate the permissions for the owner of the file, also
referred to as user or u.
- The next three characters, rwx, indicate the permissions of the group owning the file, also
referred to as g.
- The last three characters, r-x, indicate the permissions for anyone else, also known as
others or o.

It is also common to hear the others permission set referred to as world permissions,
as in “Everyone else in the world has these permissions”.

- The third and fourth columns show ownership information: respectively the user and group
that own the file.
- The seventh and last column shows the file name.
The second column indicates the number of hard links pointing to that file. The fifth column shows
the filesize. The sixth column shows the date and time the file was last modified. But these
columns are not relevant for the current topic.

What about Directories?
If you try to query information about a directory using ls -l, it will show you a listing of the
directory’s contents instead:

483

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

$ ls -l Another_Directory/
total 0
-rw-r--r-- 1 carol carol 0 Dec 10 17:59 another_file.txt

To avoid this and query information about the directory itself, add the -d parameter to ls:
$ ls -l -d Another_Directory/
drwxrwxr-x 2 carol carol 4096 Dec 10 17:59 Another_Directory/

Viewing Hidden Files
The directory listing we have retrieved using ls -l before is incomplete:
$ ls -l
total 544
drwxrwxr-x 2 carol carol

## 4096. Dec 10 17:59 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg

## 1881. Dec 10 15:57 text.txt

There are three other files in that directory, but they are hidden. On Linux, files whose name
starts with a period (.) are automatically hidden. To see them we need to add the -a parameter to
ls:
$ ls -l -a
total 544
drwxrwxr-x 3 carol carol

## 4096. Dec 10 16:01 .

drwxrwxr-x 4 carol carol

## 4096. Dec 10 15:56 ..

drwxrwxr-x 2 carol carol

## 4096. Dec 10 17:59 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg
-rw-r--r-- 1 carol carol

## 1881. Dec 10 15:57 text.txt
## 0. Dec 10 16:01 .thisIsHidden

The file .thisIsHidden is simply hidden because its name starts with ..
The directories . and .. however are special. . is a pointer to the current directory. And .. is a
pointer to the parent directory, the one which contains the current one. In Linux, every directory
contains at least these two directories.

484

You can combine multiple parameters for ls (and many other Linux commands). ls

-l -a can, for example, be written as ls -la.

Understanding Filetypes
We have already mentioned that the first letter in each output of ls -l describes the type of the
file. The three most common file types are:
- (normal file)
A file can contain data of any kind and help to manage this data. Files can be modified, moved,
copied and deleted.
d (directory)
A directory contains other files or directories and helps to organize the file system. Technically,
directories are a special kind of file.
l (symbolic link)
This “file” is a pointer to another file or directory elsewhere in the filesystem.
In addition to these, there are three other file types that you should at least know about, but are
out of scope for this lesson:
b (block device)
This file stands for a virtual or physical device, usually disks or other kinds of storage devices,
such as the first hard disk which might be represented by /dev/sda.
c (character device)
This file stands for a virtual or physical device. Terminals (like the main terminal on
/dev/ttyS0) and serial ports are common examples of character devices.
s (socket)
Sockets serve as “conduits” passing information between two programs.

Do not alter any of the permissions on block devices, character devices or
sockets, unless you know what you are doing. This may prevent your system
from working!

Understanding Permissions
In the output of ls -l the file permissions are shown right after the filetype, as three groups of
three characters each, in the order r, w and x. Here is what they mean. Keep in mind that a dash represents the lack of a permission.

485

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Permissions on Files
Stands for read and has an octal value of 4 (do not worry, we will discuss octals shortly). This
means permission to open a file and read its contents.
Stands for write and has an octal value of 2. This means permission to edit or delete a file.
Stands for execute and has an octal value of 1. This means that the file can be run as an
executable or script.
So, for example, a file with permissions rw- can be read and written to, but cannot be executed.

Permissions on Directories
Stands for read and has an octal value of 4. This means permission to read the directory’s
contents, like filenames. But it does not imply permission to read the files themselves.
Stands for write and has an octal value of 2. This means permission to create or delete files in a
directory.
Keep in mind that you cannot make these changes with write permissions alone, but also need
execute permission (x) to change to the directory.
Stands for execute and has an octal value of 1. This means permission to enter a directory, but
not to list its files (for that r is needed).
The last bit about directories may sound a bit confusing. Let us imagine, for example, that you
have a directory named Another_Directory, with the following permissions:
$ ls -ld Another_Directory/
d--x--x--x 2 carol carol 4,0K Dec 20 18:46 Another_Directory

Also imagine that inside this directory you have a shell script called hello.sh:

486

-rwxr-xr-x 1 carol carol 33 Dec 20 18:46 hello.sh

If you are the user carol and try to list the contents of Another_Directory, you will get an error
message, as your user lacks read permission for that directory:
$ ls -l Another_Directory/
ls: cannot open directory 'Another_Directory/': Permission denied

However, the user carol does have execute permissions, which means that she can enter the
directory. Therefore, the user carol can access files inside the directory, as long as she has the
correct permissions for the respective file. Let us assume the user has full permissions (rwx) for the
script hello.sh. Then she can run the script, even though she cannot read the contents of the
directory containing it if she knows the complete filename:
$ sh Another_Directory/hello.sh
Hello LPI World!

As we said before, permissions are specified in sequence: first for the owner of the file, then for
the owning group, and then for other users. Whenever someone tries to perform an action on the
file, the permissions are checked in the same fashion.
First the system checks if the current user owns the file, and if this is true it applies the first set of
permissions only. Otherwise, it checks if the current user belongs to the group owning the file. In
that case, it applies the second set of permissions only. In any other case, the system will apply the
third set of permissions.
This means that if the current user is the owner of the file, only the owner permissions are
effective, even if the group or other permissions are more permissive than the owner’s
permissions.

Modifying File Permissions
The command chmod is used to modify the permissions for a file, and takes at least two
parameters: the first one describes which permissions to change, and the second one points to the
file or directory where the change will be made. Keep in mind that only the owner of the file, or
the system administrator (root) can change the permissions on a file.
The permissions to change can be described in two different ways, or “modes”.

487

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

The first one, called symbolic mode offers fine grained control, allowing you to add or revoke a
single permission without modifying others on the set. The other mode, called octal mode, is easier
to remember and quicker to use if you wish to set all permission values at once.
Both modes will lead to the same end result. So, for example, the commands:
$ chmod ug+rw-x,o-rwx text.txt

and
$ chmod 660 text.txt

will produce exactly the same output, a file with the permissions set:
-rw-rw---- 1 carol carol

## 765. Dec 20 21:25 text.txt

Now, let us see how each mode works.

Symbolic Mode
When describing which permissions to change in symbolic mode the first character(s) indicate(s)
whose permissions you will alter: the ones for the user (u), for the group (g), for others (o) and/or
for everyone (a).
Then you need to tell the command what to do: you can grant a permission (+), revoke a
permission (-), or set it to a specific value (=).
Lastly, you specify which permission you wish to act on: read (r), write (w), or execute (x).
For example, imagine we have a file called text.txt with the following permission set:
-rw-r--r-- 1 carol carol 765 Dec 20 21:25 text.txt

If you wish to grant write permissions to members of the group owning the file, you would use the
g+w parameter. It is easier if you think about it this way: “For the group (g), grant (+) write
permissions (w)”. So, the command would be:

488

$ chmod g+w text.txt

Let us check the result with ls:
-rw-rw-r-- 1 carol carol 765 Dec 20 21:25 text.txt

Do you wish to remove read permissions for the owner of the same file? Think about it as: “For
the user (u), revoke (-) read permissions (r)”. So the parameter is u-r, like so:
$ chmod u-r text.txt
--w-rw-r-- 1 carol carol 765 Dec 20 21:25 text.txt

What if we want to set the permissions exactly as rw- for everyone? Then think of it as: “For all (
a), set exactly (=) read (r), write (w), and no execute (-)”. So:
$ chmod a=rw- text.txt
-rw-rw-rw- 1 carol carol 765 Dec 20 21:25 text.txt

Of course, it is possible to modify multiple permissions at the same time. In this case, separate
them with a comma (,):
$ chmod u+rwx,g-x text.txt
$ ls -lh text.txt
-rwxrw-rw- 1 carol carol 765 Dec 20 21:25 text.txt

The example above can be read as: “For the user (u), grant (+) read, write and execute (rwx)
permissions, for the group (g), revoke (-) execute permissions (x)”.
When run on a directory, chmod modifies only the directory’s permissions. chmod also has a
recursive mode, which is useful for when you want to change the permissions for “all files inside a
directory and its subdirectories”. To use this, add the parameter -R after the command name,
before the permissions to change:
$ chmod -R u+rwx Another_Directory/

489

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

This command can be read as: “Recursively (-R), for the user (u), grant (+) read, write and execute
(rwx) permissions”.

Be careful and think twice before using the -R switch, as it is easy to change
permissions on files and directories which you do not want to change,
especially on directories with a large number of files and subdirectories.

Octal Mode
In octal mode, the permissions are specified in a different way: as a three-digit value on octal
notation, a base-8 numeric system.
Each permission has a corresponding value, and they are specified in the following order: first
comes read (r), which is 4, then write (w), which is 2 and last is execute (x), represented by 1. If
there is no permission, use the value zero (0). So, a permission of rwx would be 7 (4+2+1) and r-x
would be 5 (4+0+1).
The first of the three digits on the permission set represents the permissions for the user (u), the
second for the group (g) and the third for others (o). If we wanted to set the permissions for a file
to rw-rw----, the octal value would be 660:
$ chmod 660 text.txt
-rw-rw---- 1 carol carol 765 Dec 20 21:25 text.txt

Besides this, the syntax in octal mode is the same as in symbolic mode, the first parameter
represents the permissions you wish to change, and the second parameter points to the file or
directory where the change will be made.

If a permission value is odd, the file surely is executable!

Which syntax should you use? The octal mode is recommended if you want to change the
permissions to a specific value, for example 640 (rw- r-- ---).
The symbolic mode is more useful if you want to flip just a specific value, regardless of the current
permissions for the file. For example, you can add execute permissions for the user using just
chmod u+x script.sh without regard to, or even touching, the current permissions for the
group and others.

490

Modifying File Ownership
The command chown is used to modify the ownership of a file or directory. The syntax is quite
simple:
chown USERNAME:GROUPNAME FILENAME

For example, let us check a file called text.txt:
-rw-rw---- 1 carol carol 1881 Dec 10 15:57 text.txt

The user who owns the file is carol, and the group is also carol. Now, we will change the group
owning the file to some other group, like students:
$ chown carol:students text.txt
-rw-rw---- 1 carol students 1881 Dec 10 15:57 text.txt

Keep in mind that the user who owns a file does not need to belong to the group who owns a file.
In the example above, the user carol does not need to be a member of the students group.
The user or group permission set can be omitted if you do not wish to change them. So, to change
just the group owning a file you would use chown :students text.txt. To change just the user,
the command would be chown carol: text.txt or just chown carol text.txt. Alternatively,
you could use the command chgrp students text.txt.
Unless you are the system administrator (root), you cannot change ownership of a file to another
user or group you do not belong to. If you try to do this, you will get the error message Operation
not permitted.

Querying Groups
Before changing the ownership of a file, it might be useful to know which groups exist on the
system, which users are members of a group and to which groups a user belongs.
To see which groups exist on your system, type getent group. The output will be similar to this
one (the output has been abbreviated):

491

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

$ getent group
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
adm:x:4:syslog,rigues
tty:x:5:rigues
disk:x:6:
lp:x:7:
mail:x:8:
news:x:9:
uucp:x:10:rigues

If you want to know to which groups a user belongs, add the username as a parameter to groups:
$ groups carol
carol : carol students cdrom sudo dip plugdev lpadmin sambashare

To do the reverse (see which users belong to a group) use groupmems. The parameter -g specifies
the group, and -l will list all of its members:
carol

groupmems can only be run as root, the system administrator. If you are not currently
logged in as root, add sudo before the command.

Default Permissions
Let us try an experiment. Open a terminal window and create an empty file with the following
$ touch testfile

Now, let us take a look at the permissions for this file. They may be different on your system, but
let us assume they look like the following:
$ ls -lh testfile

492

-rw-r--r-- 1 carol carol 0 jul 13 21:55 testfile

The permissions are rw-r—r--: read and write for the user, and read for the group and others, or
644 in octal mode. Now, try creating a directory:
$ mkdir testdir
$ ls -lhd testdir
drwxr-xr-x 2 carol carol 4,0K jul 13 22:01 testdir

Now the permissions are rwxr-xr-x : read, write and execute for the user, read and execute for
the group and others, or 755 in octal mode.
No matter where you are in the filesystem every file or directory you create will get those same
permissions. Did you ever wonder where they come from?
They come from the user mask or umask, which sets the default permissions for every file created.
You can check the current values with the umask command:
$ umask
0022

But that does not look like rw-r—r--, or even 644. Maybe we should try with the -S parameter, to
get an output in symbolic mode:
$ umask -S
u=rwx,g=rx,o=rx

Those are the same permissions our test directory got in one of the examples above. But, why is it
that when we created a file the permissions were different?
Well, it makes no sense to set global execute permissions for everyone on any file by default,
right? Directories need execute permissions (otherwise you cannot enter them), but files do not, so
they do not get them. Hence the rw-r—r--.
Besides displaying the default permissions, umask can also be used to change them for your
current shell session. For example, if we use the command:
$ umask u=rwx,g=rwx,o=

493

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Every new directory will inherit the permissions rwxrwx---, and every file rw-rw---- (as they
do not get execute permissions). If you repeat the examples above to create a testfile and
testdir and check the permissions, you should get:
$ ls -lhd test*
drwxrwx--- 2 carol carol 4,0K jul 13 22:25 testdir
-rw-rw---- 1 carol carol

0 jul 13 22:25 testfile

And if you check the umask without the -S (symbolic mode) parameter, you get:
$ umask
0007

The result does not look familiar because the values used are different. Here is a table with every
value and its respective meaning:
Value

Permission for Files

Permission for Directories

rw-

rwx

rw-

rw-

r--

r-x

r--

r--

-w-

-wx

-w-

-w-

---

--x

---

---

As you can see, 007 corresponds to rwxrwx---, exactly as we requested. The leading zero can be
ignored.

Special Permissions
Besides the read, write and execute permissions for user, group and others, each file can have
three other special permissions which can alter the way a directory works or how a program runs.
They can be specified either in symbolic or octal mode, and are as follows:

494

Sticky Bit
The sticky bit, also called the restricted deletion flag, has the octal value 1 and in symbolic mode is
represented by a t within the other’s permissions. This applies only to directories, and has no
effect on normal files. On Linux it prevents users from removing or renaming a file in a directory
unless they own that file or directory.
Directories with the sticky bit set show a t replacing the x on the permissions for others on the
output of ls -l:
$ ls -ld Sample_Directory/
drwxr-xr-t 2 carol carol 4096 Dec 20 18:46 Sample_Directory/

In octal mode, the special permissions are specified using a 4-digit notation, with the first digit
representing the special permission to act upon. For example, to set the sticky bit (value 1) for the
directory Another_Directory in octal mode, with permissions 755, the command would be:
$ chmod 1755 Another_Directory
$ ls -ld Another_Directory
drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory

Set GID
Set GID, also known as SGID or Set Group ID bit, has the octal value 2 and in symbolic mode is
represented by an s on the group permissions. This can be applied to executable files or
directories. On files, it will make the process run with the privileges of the group who owns the
file. When applied to directories, it will make every file or directory created under it inherit the
group from the parent directory.
Files and directories with SGID bit show an s replacing the x on the permissions for the group on
the output of ls -l:
-rwxr-sr-x 1 carol root 33 Dec 11 10:36 test.sh

To add SGID permissions to a file in symbolic mode, the command would be:
$ chmod g+s test.sh

495

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

-rwxr-sr-x 1 carol root

## 33. Dec 11 10:36 test.sh

The following example will help you better understand the effects of SGID on a directory. Suppose
we have a directory called Sample_Directory, owned by the user carol and the group users,
with the following permission structure:
$ ls -ldh Sample_Directory/
drwxr-xr-x 2 carol users 4,0K Jan 18 17:06 Sample_Directory/

Now, let us change to this directory and, using the command touch, create an empty file inside of
it. The result would be:
$ cd Sample_Directory/
$ touch newfile
$ ls -lh newfile
-rw-r--r-- 1 carol carol 0 Jan 18 17:11 newfile

As we can see, the file is owned by the user carol and group carol. But, if the directory had the
SGID permission set, the result would be different. First, let us add the SGID bit to the
Sample_Directory and check the results:
$ sudo chmod g+s Sample_Directory/
$ ls -ldh Sample_Directory/
drwxr-sr-x 2 carol users 4,0K Jan 18 17:17 Sample_Directory/

The s on the group permissions indicates that the SGID bit is set. Now, we will change to this
directory and, again, create an empty file with the touch command:
$ cd Sample_Directory/
$ touch emptyfile
$ ls -lh emptyfile
-rw-r--r-- 1 carol users 0 Jan 18 17:20 emptyfile

The group who owns the file is users. This is because the SGID bit made the file inherit the group
owner of its parent directory, which is users.

496

Set UID
SUID, also known as Set User ID, has the octal value 4 and is represented by an s on the user
permissions in symbolic mode. It only applies to files and has no effect on directories. Its behavior
is similar to the SGID bit, but the process will run with the privileges of the user who owns the file.
Files with the SUID bit show a s replacing the x on the permissions for the user on the output of ls
-l:
$ ls -ld test.sh
-rwsr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh

You can combine multiple special permissions on one parameter. So, to set SGID (value 2) and
SUID (value 4) in octal mode for the script test.sh with permissions 755, you would type:
$ chmod 6755 test.sh

And the result would be:
$ ls -lh test.sh
-rwsr-sr-x 1 carol carol 66 Jan 18 17:29 test.sh

If your terminal supports color, and these days most of them do, you can quickly see
if these special permissions are set by glancing at the output of ls -l. For the sticky
bit, the directory name might be shown in a black font with blue background. The
same applies for files with the SGID (yellow background) and SUID (red background)
bits. Colors may be different depending on which Linux distribution and terminal
settings you use.

497

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list
the permissions for the directory emptydir.
