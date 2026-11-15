---
id: linux-07
track: linux-engineer
title: "Understanding Computer Hardware and Where Data Is Stored"
slug: 07-hardware-and-where-data-is-stored
source: "LPI Learning Material 010-160"
sourceSection: "4.2, 4.3"
topic: "4"
tags: [linux, lpic-1, hardware, kernel, system-logging]
summary: "Power supplies, motherboards, memory, processors and storage devices, plus the Linux kernel, device files, processes and system logging."
---
# The Linux Operating System

## 4.2 Understanding Computer Hardware

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 4.2
**Weight:** 2

### 4.2 Lesson 1

#### Introduction

Without hardware, software is nothing more than another form of literature. Hardware processes the commands described by the software and provides mechanisms for storage, input, and output. Even the cloud is ultimately backed by hardware. As an operating system, one of Linux' responsibilities is providing software with interfaces to access a system’s hardware. Most configuration specifics are beyond the scope of this lesson. However, users are often concerned with the performance, capacity, and other factors of system hardware since they impact the ability of a system to adequately support specific applications. This lesson discusses hardware as separate physical items using standard connectors and interfaces. The standards are relatively static. But the form factor, performance, and capacity characteristics of hardware are constantly evolving. Regardless of how changes may blur physical distinctions the conceptual aspects of hardware described in this lesson still apply.
**NOTE**
At various points within this lesson command line examples are used to demonstrate ways to access information about hardware. Most examples are from a Raspberry Pi B+ but should apply to most systems. Understanding these commands is not required to understand this material.
#### Power Supplies

All of the active components in a computer system require electricity to operate. Unfortunately, most sources of electricity are not appropriate. Computer system hardware requires specific voltages with relatively tight tolerances. Which is not what is available from your local wall outlet. Power supplies normalize available sources of power. Standard voltage requirements allow manufacturers to create hardware components that can be used in systems anywhere in the world. Desktop power supplies tend to use the electricity from wall outlets as a source. Server power supplies tend to be more critical so they can often connect to multiple sources to assure that they continue operating if one source fails. Consuming power generates heat. Excessive heat can cause system components to operate slowly or even fail. Most systems have some form of fan to move air for more efficient cooling. Components such as processors often generate heat that air flow alone cannot dissipate. These hot components attach special fins known as heat sinks to help dissipate the heat they generate. Heat sinks often have their own small local fan to ensure adequate air flow.
#### Motherboard

All of a system’s hardware needs to interconnect. A motherboard normalizes that interconnection using standardized connectors and form factors. It also provides support for the configuration and electrical needs of those connectors. There are a large number of motherboard configurations. They support different processors and memory systems. They have different combinations of standardized connectors. And they adapt to the different sizes of the packaging that contains them. Except perhaps for the ability to connect specific external devices, motherboard configuration is effectively transparent to users. Administrators are mostly exposed to motherboard configuration when there is a need to identify specific devices. When power is first applied there is motherboard specific hardware that must be configured and initialized before the system can operate. Motherboards use programming stored in nonvolatile memory known as firmware to deal with motherboard specific hardware. The original form of motherboard firmware was known as BIOS (Basic Input/Output System). Beyond basic configuration settings BIOS was mostly responsible for identifying, loading, and transferring operation to an operating system such as Linux. As hardware evolved, firmware expanded to support larger disks, diagnostics, graphical interfaces, networking, and other advanced capabilities independent of any loaded operating system. Early attempts to advance firmware beyond basic BIOS was often specific to a motherboard manufacturer. Intel defined a standard for advanced firmware known as EFI (Extensible Firmware Interface). Intel contributed EFI to a
standards organization to create UEFI (Unified Extensible Firmware Interface). Today, most motherboards use UEFI. BIOS and EFI are almost never seen on recent systems. Regardless, most people still refer to motherboard firmware as BIOS. There are very few firmware settings of interest to general users so only individuals responsible for system hardware configuration typically need to deal with firmware and its settings. One of the few commonly changed options is enabling virtualization extensions of modern CPUs.
#### Memory

System memory holds the data and program code of currently running applications. When they talk about computer memory most people are referring to this system memory. Another common term used for system memory is the acronym RAM (Random Access Memory) or some variation of that acronym. Sometimes references to the physical packaging of the system memory such as DIMM, SIMM or DDR are also used. Physically, system memory is usually packaged on individual circuit board modules that plug into the motherboard. Individual memory modules currently range in size from 2 GB to 64 GB. For most general purpose applications 4 GB is the minimum system memory people should consider. For individual workstations 16 GB is typically more than sufficient. However even 16 GB might be limiting for users running gaming, video, or high-end audio applications. Servers often require 128 GB or even 256 GB of memory to efficiently support user loads. For the most part Linux allows users to treat system memory as a black box. An application is started and Linux takes care of allocating the system memory required. Linux releases the memory for use by other applications when an application completes. But what if an application requires more than the available system memory? In this case, Linux moves idle applications from system memory into a special disk area known as swap space. Linux moves idle applications from the disk swap space back to system memory when they need to run. Systems without dedicated video hardware often use a portion of the system memory (often 1 GB) to act as video display storage. This reduces the effective system memory. Dedicated video hardware typically has its own separate memory that is not available as system memory. There are several ways to obtain information about system memory. As a user, the total amount of memory available and in use are typically the values of interest. One source of information would be to run the command free along with the parameter -m to use megabytes in the output:
```console
$ free -m
```
Mem:
**total**
used free shared buff/cache available 748 37 51 14 660 645 Swap:
99
0
99
The first line specifies the total memory available to the system (total), the memory in use (used) and the free memory (free). The second line displays this information for the swap space. Memory indicated as shared and buff/cache is currently used for other system functions, although the amount indicated in available could be used for application.
#### Processors

The word “processor” implies that something is being processed. In computers most of that processing is dealing with electrical signals. Typically those signals are treated as having one of the binary values 1 or 0. When people talk about computers they often use the word processor interchangeably with the acronym CPU (Central Processing Unit). Which is not technically correct. Every general purpose computer has a CPU that processes the binary commands specified by software. So it is understandable that people interchange processor and CPU. However, in addition to a CPU, modern computers often include other task specific processors. Perhaps the most recognizable additional processor is a GPU (Graphical Processing Unit). Thus, while a CPU is a processor, not all processors are CPUs. For most people CPU architecture is a reference to the instructions that the processor supports. Although Intel and AMD make processors supporting the same instructions it is meaningful to differentiate by vendor because of vendor specific packaging, performance, and power consumption differences. Software distributions commonly use these designations to specify the minimum set of instructions they require to operate:
**i386**
References the 32-bit instruction set associated with the Intel 80386.
**x86**
Typically references the 32-bit instruction sets associated with successors to the 80386 such as 80486, 80586, and Pentium.
**x64 / x86-64**
References processors that support both the 32-bit and 64-bit instructions of the x86 family.
**AMD**
A reference to x86 support by AMD processors.
**AMD64**
A reference to x64 support by AMD processors.
**ARM**
References a Reduced Instruction Set Computer (RISC) CPU that is not based on the x86 instruction set. Commonly used by embedded, mobile, tablet, and battery operated devices. A version of Linux for ARM is used by the Raspberry Pi. The file /proc/cpuinfo contains detailed information about a system’s processor. Unfortunately the details are not friendly to general users. A more general result can be obtained with the command lscpu. Output from a Raspberry Pi B+:
```console
$ lscpu
```
Architecture:
armv7l
Byte Order:
Little Endian
CPU(s):
4
On-line CPU(s) list:
0-3
Thread(s) per core:
1
Core(s) per socket:
4
Socket(s):
1
Model:
4
Model name:
ARMv7 Processor rev 4 (v7l)
CPU max MHz:
1400.0000
CPU min MHz:
600.0000
BogoMIPS:
38.40
Flags:
half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32
lpae evtstrm crc32
To most people the myriad of vendors, processor families, and specification factors represent a bewildering array of choices. Regardless, there are several factors associated with CPUs and processors that even general users and administrators often need to consider when they need to specify operational environments: Bit size For CPUs this number relates to both the native size of data it manipulates and the amount of memory it can access. Most modern systems are either 32-bit or 64-bit. If an application needs access to more than 4 gigabytes of memory then it must run on a 64-bit system since 4 gigabytes is the maximum address that can be represented using 32 bits. And, while 32-bit applications can typically run on 64-bit systems, 64-bit applications cannot run on 32-bit systems.
**Clock speed**
Often expressed in megahertz (MHz) or gigahertz (GHz). This relates to how fast a processor processes instructions. But processor speed is just one of the factors impacting system response times, wait times, and throughput. Even an active multi-tasking user rarely keeps a CPU of a common desktop PC active more than 2 or 3 percent of the time. Regardless, if you frequently use computationally intensive applications involving activities such as encryption or video rendering then CPU speed may have a significant impact on throughput and wait time.
**Cache**
CPUs require a constant stream of both instructions and data in order to operate. The cost and power consumption of a multi-gigabyte system memory that could be accessed at CPU clock speeds would be prohibitive. CPU-speed cache memory is integrated onto the CPU chip to provide a high-speed buffer between CPUs and system memory. Cache is separated into multiple layers, commonly referenced as L1, L2, L3 and even L4. In the case of cache, more is often better.
**Cores**
Core refers to an individual CPU. In addition to core representing a physical CPU, HyperThreading Technology (HTT) allows a single physical CPU to concurrently process multiple instructions thus virtually acting as multiple physical CPUs. Most typically, multiple physical cores are packaged as a single physical processor chip. However, there are motherboards that support multiple physical processor chips. In theory having more cores to process tasks would always seem to yield better system throughput. Unfortunately, desktop applications often only keep CPUs busy 2 or 3 percent of the time, so adding more mostly idle CPUs is likely to result in minimal improvement to throughput. More cores are best suited to running applications that are written to have multiple independent threads of operation such as video frame rendering, web page rendering, or multi-user virtual machine environments.
#### Storage

Storage devices provide a method for retaining programs and data. Hard Disk Drives (HDDs) and Solid State Drives (SSDs) are the most common form of storage device for servers and desktops. USB memory sticks and optical devices such as DVD are also used but rarely as a primary device. As the name implies, a hard disk drive stores information on one or more rigid physical disks. The physical disks are covered with magnetic media to make storage possible. The disks are contained within a sealed package since dust, small particles, and even finger prints would interfere with the ability of the HDD to read and write the magnetic media. SSDs are effectively more sophisticated versions of USB memory sticks with significantly larger
capacity. SSDs store information in microchips so there are no moving parts. Although the underlying technologies for HDDs and SSDs are different, there are important factors that can be compared. HDD capacity is based on scaling physical components while SSD capacity depends on the number of microchips. Per gigabyte, SSDs cost between 3 and 10 times what an HDD costs. To read or write, an HDD must wait for a location on a disk to rotate to a known location while SSDs are random access. SSD access speeds are typically 3 to 5 times faster than HDD devices. Since they have no moving parts SSDs consume less power and are more reliable than HDDs. Storage capacity is constantly increasing for HDDs and SSDs. Today, 5 terabyte HDDs and 1 terabyte SSDs are commonly available. Regardless, large storage capacity is not always better. When a storage device fails the information it contained is no longer available. And of course, backup takes longer when there is more information to back up. For applications which read and write a lot of data, latency and performance may be more important than capacity. Modern systems use SCSI (Small Computer System Interface) or SATA (Serial AT Attachment) to connect with storage devices. These interfaces are typically supported by the appropriate connector on the motherboard. Initial load comes from a storage device attached to the motherboard. Firmware settings define the order in which devices are accessed for this initial loading. Storage systems known as RAID (Redundant Array of Independent Disks) are a common implementation to avoid loss of information. A RAID array consists of multiple physical devices containing duplicate copies of information. If one device fails all of the information is still available. Different physical RAID configurations are referenced as 0, 1, 5, 6, and 10. Each designation has different storage size, performance characteristics and ways to store redundant data or checksums for data recovery. Beyond some administrative configuration overhead, the existence of RAID is effectively transparent to users. Storage devices commonly read and write data as blocks of bytes. The lsblk command can be used to list the block devices available to a system. The following example was run on a Raspberry Pi using an SD card as a storage device. The details of the output are covered by information in the Partitions and Drivers lessons that follow:
```console
$ lsblk
```
NAME
MAJ:MIN RM
mmcblk0
179:0
0 29.7G
0 disk
+-mmcblk0p1 179:1
0 43.9M
0 part /boot
+-mmcblk0p2 179:2
0 29.7G
0 part /
SIZE RO TYPE MOUNTPOINT
#### Partitions

A storage device is effectively a long sequence of storage locations. Partitioning is the mechanism that tells Linux if it is to see these storage locations as a single sequence or multiple independent sequences. Each partition is treated as if it is an individual device. Most of the time partitions are created when a system is first configured. If change is needed, administrative tools are available to manage device partitioning. So why would multiple partitions be desirable? Some examples for using partitions would be managing available storage, isolating encryption overhead, or supporting multiple file systems. Partitions make it possible to have a single storage device that can boot under different operating systems. While Linux can recognize the storage sequence of a raw device a raw device cannot be used as-is. To use a raw device it must be formatted. Formatting writes a file system to a device and prepares it for file operations. Without a file system a device cannot be used for file-related operations. Users see partitions as if they are individual devices. This makes it easy to overlook the fact that they’re still dealing with a single physical device. In particular, device to device operations that are actually partition to partition operations will not have the expected performance. A single device is one physical mechanism with one set of read/write hardware. More importantly, you can’t use partitions of a single physical device as a fault tolerant design. If the device fails, all partitions fail so there would be no fault tolerance.
**NOTE**
Logical Volume Manager (LVM) is a software capability that allows administrators to combine individual disks and disk partitions and treat them as if they are a single drive.
#### Peripherals

Servers and workstations need a combination of CPU, system memory, and storage to operate. But these fundamental components don’t directly interface with the external world. Peripherals are the devices that provide systems with input, output, and access to the rest of the real world. Most motherboards have built-in external connectors and firmware support for common legacy peripheral interfaces supporting devices such as keyboard, mouse, sound, video, and network. Recent motherboards typically have an Ethernet connector to support networks, a HDMI connector supporting basic graphical needs, and one or more USB (Universal Serial Bus) connectors for mostly everything else. There are several versions of USB with different speed and physical characteristics. Several versions of USB ports are common on a single motherboard.
Motherboards may also have one or more expansion slots. Expansion slots allow users to add special circuit boards known as expansion cards that support custom, legacy, and non-standard peripherals. Graphics, sound, and network interfaces are common expansion cards. Expansion cards also support RAID, and special format legacy interfaces involving serial and parallel connections. System on a Chip (SoC) configurations achieve power, performance, space, and reliability advantages over motherboard configurations by packaging processors, system memory, SSD, and hardware to control peripherals as a single integrated circuit package. The peripherals supported by SoC configurations are limited by the components packaged. Thus, SoC configurations tend to be developed for specific uses. Phones, tablets, and other portable devices are often based on SoC technology. Some systems incorporate peripherals. Laptops are similar to workstations but incorporate default display, keyboard, and mouse peripherals. All-In-One systems are similar to laptops but require mouse and keyboard peripherals. Motherboard or SoC based controllers are often packaged with integral peripherals appropriate to a specific use.
#### Drivers and Device Files

So far, this lesson has presented information about processors, memory, disks, partitioning, formatting and peripherals. But requiring general users to deal with the specific details for each of the devices in their system would make those systems unusable. Likewise, software developers would need to modify their code for every new or modified device they need to support. The solution to this “dealing with the details” problem is provided by a device driver. Device drivers accept a standard set of requests then translate those requests into the device appropriate control activities. Device drivers are what allow you and the applications you run to read from the file /home/carol/stuff without worrying about whether that file is on a hard drive, solid state drive, memory stick, encrypted storage, or some other device. Device files are found in the /dev directory and identify physical devices, device access, and supported drivers. By convention, in modern systems using SCSI or SATA based storage devices the specification filename starts with the prefix sd. The prefix is followed by a letter such as a or b indicating a physical device. After the prefix and device identifier comes a number indicating a partition within the physical device. So, /dev/sda would reference the entire first storage device while /dev/sda3 would reference partition 3 in the first storage device. The device file for each type of device has a naming convention appropriate to the device. While covering all of the possible naming conventions is beyond the scope of this lesson it is important to remember that these conventions are critical to making system administration possible.
While it is beyond the scope of this lesson to cover the contents of the /dev directory it is informative to look at the entry for a storage device. Device files for SD cards typically use mmcblk as a prefix:
```console
$ ls -l mmcblk*
brw-rw---- 1 root disk 179, 0 Jun 30 01:17 mmcblk0
brw-rw---- 1 root disk 179, 1 Jun 30 01:17 mmcblk0p1
brw-rw---- 1 root disk 179, 2 Jun 30 01:17 mmcblk0p2
```
The listing details for a device file are different from typical file details:
- Unlike a file or directory the first letter of the permissions field is b. This indicates that blocks are read from and written to the device in blocks rather than individual characters.
- The size field is two values separated by a comma rather than a single value. The first value generally indicates a particular driver within the kernel and the second value specifies a specific device handled by the driver.
- The filename uses a number for the physical device so the naming convention adapts by specifying the partition suffix as a p followed by a digit.
**NOTE**
Each system device should have an entry in /dev. Since the contents of the /dev directory are created at installation there are often entries for every possible driver and device even if no physical device exists.
#### Guided Exercises

1. Describe these terms: Processor CPU GPU
2. If you are primarily running video editing applications (a computationally intensive activity) which components and characteristics would you expect to have the most impact on system usability: CPU cores CPU speed Available system memory Storage system GPU Video display None of the above
3. What would you expect the name of the device file in /dev to be for partition 3 of the third SATA drive in a system: sd3p3 sdcp3 sdc3 None of the above
#### Explorational Exercises

1. Run the lsblk command on your system. Identify the parameters below. If a system is not immediately available, consider the lsblk -f listing for the Raspberry Pi system mentioned in the “Storage” section above: $ lsblk -f NAME
FSTYPE LABEL
UUID
MOUNTPOINT
9304-D9FD
/boot
**mmcblk0**
+-mmcblk0p1 vfat
boot
+-mmcblk0p2 ext4
rootfs 29075e46-f0d4-44e2-a9e7-55ac02d6e6cc /
**◦ The type of devices and how many**
◦ The partition structure of each device ◦ The type of file system and mount for each partition
#### Summary

A system is the sum of its components. Different components impact cost, performance, and usability in different ways. While there are common configurations for workstations and servers there is no single best configuration.

### Answers

#### Guided Exercises

1. Describe these terms: Processor A general term that applies to any type of processor. Often used incorrectly as a synonym for CPU. CPU A Central Processing Unit. A processing unit providing support for general purpose computational tasks. GPU A Graphical Processing Unit. A processing unit optimized for supporting activities relating to the presentation of graphics.
2. If you are primarily running video editing applications (a computationally intensive activity) which components and characteristics would you expect to have the most impact on system usability: CPU cores Yes. Multiple cores support the concurrent presentation and rendering tasks required by video editing. CPU speed Yes. Video rendering requires a significant amount of computational activity. Available system memory Likely. The uncompressed video used in editing is large. General purpose systems often come with 8 gigabytes of memory. 16 or even 32 gigabytes of memory allows the system to handle more frames of uncompressed video making editing activities more efficient. Storage system Yes. Video files are large. The overhead of local SSD drives supports more efficient transfer. Slower network drives are likely to be counterproductive. GPU No. GPU primarily impacts the presentation of the rendered video.
**Video display**
No. The video display primarily impacts the presentation of the rendered video.
**None of the above**
No. Some of these factors have obvious impacts on how usable your system would be.
1. What would you expect the name of the device file in /dev to be for partition 3 of the third SATA drive in a system:
**sd3p3**
Not correct. Drive 3 would be sdc not sd3
**sdcp3**
Not correct. Partition 3 would be 3 not p3 sdc3
**Correct**

**None of the above**
Not correct. The correct answer is one of the choices.

#### Explorational Exercises

1. Run the lsblk command on your system. Identify the parameters below. If a system is not immediately available, consider the lsblk -f listing for the Raspberry Pi system mentioned in the “Storage” section above: $ lsblk -f NAME
FSTYPE LABEL
UUID
MOUNTPOINT
9304-D9FD
/boot
**mmcblk0**
+-mmcblk0p1 vfat
boot
+-mmcblk0p2 ext4
rootfs 29075e46-f0d4-44e2-a9e7-55ac02d6e6cc /
Answers that follow are based the lsblk -f listing for the Raspberry Pi system above. Your answers may differ:
**The type of devices and how many**
There is one device: mmcblk0. You know by convention that the mmcblk would be an SD memory card.
**The partition structure of each device**
There are two partitions: mmcblk0p1 and mmcblk0p2. The type of file system and mount for each partition Partition 1 uses the vfat file system. It is used to boot the system and is mounted as /boot. Partition 2 uses the ext4 file system. It is used as the primary file system and is mounted as /.

## 4.3 Where Data is Stored

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 4.3
**Weight:** 3
**Key knowledge areas**
- Programs and configuration
- Processes
- Memory addresses
- System messaging
- Logging
**Partial list of the used files, terms and utilities**
- ps, top, free
- syslog, dmesg
- /etc/, /var/log/
- /boot/, /proc/, /dev/, /sys/

### 4.3 Lesson 1

#### Introduction

For an operating system, everything is considered data. For Linux, everything is considered a file: programs, regular files, directories, block devices (hard disks, etc.), character devices (consoles, etc.), kernel processes, sockets, partitions, links, etc. The Linux directory structure, starting from the root /, is a collection of files containing data. The fact that everything is a file is a powerful feature of Linux as it allows for tweaking virtually every single aspect of the system. In this lesson we will be discussing the different locations in which important data is stored as established by the Linux Filesystem Hierarchy Standard (FHS). Some of these locations are real directories which store data persistently on disks, whereas others are pseudo filesystems loaded in memory which give us access to kernel subsystem data such as running processes, use of memory, hardware configuration and so on. The data stored in these virtual directories is used by a number of commands that allow us to monitor and handle it.
#### Programs and their Configuration

Important data on a Linux system are — no doubt — its programs and their configuration files. The former are executable files containing sets of instructions to be run by the computer’s
processor, whereas the latter are usually text documents that control the operation of a program. Executable files can be either binary files or text files. Executable text files are called scripts. Configuration data on Linux is traditionally stored in text files too, although there are various styles of representing configuration data.
**Where Binary Files are Stored**
Like any other file, executable files live in directories hanging ultimately from /. More specifically, programs are distributed across a three-tier structure: the first tier (/) includes programs that can be necessary in single-user mode, the second tier (/usr) contains most multi-user programs and the third tier (/usr/local) is used to store software that is not provided by the distribution and has been compiled locally. Typical locations for programs include: /sbin It contains essential binaries for system administration such as parted or ip. /bin It contains essential binaries for all users such as ls, mv, or mkdir. /usr/sbin It stores binaries for system administration such as deluser, or groupadd. /usr/bin It includes most executable files — such as free, pstree, sudo or man — that can be used by all users. /usr/local/sbin It is used to store locally installed programs for system administration that are not managed by the system’s package manager. /usr/local/bin It serves the same purpose as /usr/local/sbin but for regular user programs. Recently some distributions started to replace /bin and /sbin with symbolic links to /usr/bin and /usr/sbin.
**NOTE**
The /opt directory is sometimes used to store optional third-party applications.
Apart from these directories, regular users can have their own programs in either:
- /home/$USER/bin
- /home/$USER/.local/bin
You can find out what directories are available for you to run binaries from by referencing the PATH variable with echo $PATH. For more information on PATH, review the lessons on variables and shell customization.
**TIP**
We can find the location of programs with the which command:
```console
$ which git
/usr/bin/git

Where Configuration Files are Stored
The /etc Directory
In the early days of Unix there was a folder for each type of data, such as /bin for binaries and
/boot for the kernel(s). However, /etc (meaning et cetera) was created as a catch-all directory to
store any files that did not belong in the other categories. Most of these files were configuration
files. With the passing of time more and more configuration files were added so /etc became the
main folder for configuration files of programs. As said above, a configuration file usually is a
local, plain text (as opposed to binary) file which controls the operation of a program.
```
In /etc we can find different patterns for config files names:
- Files with an ad hoc extension or no extension at all, for example
**group**
System group database.
**hostname**
Name of the host computer.
**hosts**
List of IP addresses and their hostname translations.
**passwd**
System user database — made up of seven fields separated by colons providing information about the user.
**profile**
System-wide configuration file for Bash.
**shadow**
Encrypted file for user passwords.
- Initialization files ending in rc:
**bash.bashrc**
System-wide .bashrc file for interactive bash shells.
**nanorc**
Sample initialization file for GNU nano (a simple text editor that normally ships with any distribution).
- Files ending in .conf:
**resolv.conf**
Config file for the resolver — which provide access to the Internet Domain Name System (DNS).
**sysctl.conf**
Config file to set system variables for the kernel.
- Directories with the .d suffix:
Some programs with a unique config file (*.conf or otherwise) have evolved to have a dedicated *.d directory which help build modular, more robust configurations. For example, to configure logrotate, you will find logrotate.conf, but also the logrotate.d directories. This approach comes in handy in those cases where different applications need configurations for the same specific service. If, for example, a web server package contains a logrotate configuration, this configuration can now be placed in a dedicated file in the logrotate.d directory. This file can be updated by the webserver package without interfering with the remaining logrotate configuration. Likewise, packages can add specific tasks by placing files in the /etc/cron.d directory instead of modifying /etc/crontab. In Debian — and Debian derivatives — such an approach has been applied to the list of reliable sources read by the package management tool apt: apart from the classic /etc/apt/sources.list, now we find the /etc/apt/sources.list.d directory:
```console
$ ls /etc/apt/sources*
/etc/apt/sources.list
/etc/apt/sources.list.d:

Configuration Files in HOME (Dotfiles)
```
At user level, programs store their configurations and settings in hidden files in the user’s home directory (also represented ~). Remember, hidden files start with a dot (.) — hence their name: dotfiles. Some of these dotfiles are Bash scripts that customize the user’s shell session and are sourced as soon as the user logs into the system: .bash_history It stores the command line history. .bash_logout It includes commands to execute when leaving the login shell. .bashrc Bash’s initialization script for non-login shells. .profile Bash’s initialization script for login shells.
**NOTE**
Refer to the lesson on “Command Line Basics” to learn more about Bash and its init files.
Other user-specific programs' config files get sourced when their respective programs are started: .gitconfig, .emacs.d, .ssh, etc.
#### The Linux Kernel

Before any process can run, the kernel must be loaded into a protected area of memory. After that, the process with PID 1 (more often than not systemd nowadays) sets off the chain of processes, that is to say, one process starts other(s) and so on. Once the processes are active, the Linux kernel is in charge of allocating resources to them (keyboard, mouse, disks, memory, network interfaces, etc).
**NOTE**
Prior to systemd, /sbin/init was always the first process in a Linux system as part of the System V Init system manager. In fact, you still find /sbin/init
currently but linked to /lib/systemd/systemd.
Where Kernels are Stored: /boot The kernel resides in /boot — together with other boot-related files. Most of these files include the kernel version number components in their names (kernel version, major revision, minor revision and patch number). The /boot directory includes the following types of files, with names corresponding with the respective kernel version:
**config-4.9.0-9-amd64**
Configuration settings for the kernel such as options and modules that were compiled along with the kernel.
**initrd.img-4.9.0-9-amd64**
Initial RAM disk image that helps in the startup process by loading a temporary root filesystem into memory.
**System-map-4.9.0-9-amd64**
The System-map (on some systems it will be named System.map) file contains memory address locations for kernel symbol names. Each time a kernel is rebuilt the file’s contents will change as the memory locations could be different. The kernel uses this file to lookup memory address locations for a particular kernel symbol, or vice-versa.
**vmlinuz-4.9.0-9-amd64**
The kernel proper in a self-extracting, space-saving, compressed format (hence the z in vmlinuz; vm stands for virtual memory and started to be used when the kernel first got support for virtual memory).
**grub**
Configuration directory for the grub2 bootloader.
**TIP**
Because it is a critical feature of the operating system, more than one kernel and its associated files are kept in /boot in case the default one becomes faulty and we have to fall back on a previous version to — at least — be able to boot the system up and fix it.
**The /proc Directory**
The /proc directory is one of the so-called virtual or pseudo filesystems since its contents are not
written to disk, but loaded in memory. It is dynamically populated every time the computer boots up and constantly reflects the current state of the system. /proc includes information about:
- Running processes
- Kernel configuration
- System hardware
Besides all the data concerning processes that we will see in the next lesson, this directory also stores files with information about the system’s hardware and the kernel’s configuration settings. Some of these files include: /proc/cpuinfo It stores information about the system’s CPU:
```console
$ cat /proc/cpuinfo
processor

: 0

vendor_id

: GenuineIntel

cpu family

: 6

model

: 158

model name

: Intel(R) Core(TM) i7-8700K CPU @ 3.70GHz

stepping

: 10

cpu MHz

: 3696.000

cache size

: 12288 KB

(...)

/proc/cmdline
```
It stores the strings passed to the kernel on boot:
```console
$ cat /proc/cmdline
```
BOOT_IMAGE=/boot/vmlinuz-4.9.0-9-amd64 root=UUID=5216e1e4-ae0e-441f-b8f5-8061c0034c74 ro quiet
**/proc/modules**
It shows the list of modules loaded into the kernel:
```console
$ cat /proc/modules
nls_utf8 16384 1 - Live 0xffffffffc0644000
isofs 40960 1 - Live 0xffffffffc0635000
udf 90112 0 - Live 0xffffffffc061e000
crc_itu_t 16384 1 udf, Live 0xffffffffc04be000

fuse 98304 3 - Live 0xffffffffc0605000
vboxsf 45056 0 - Live 0xffffffffc05f9000 (O)
joydev 20480 0 - Live 0xffffffffc056e000
vboxguest 327680 5 vboxsf, Live 0xffffffffc05a8000 (O)
hid_generic 16384 0 - Live 0xffffffffc0569000
(...)

The /proc/sys Directory
```
This directory includes kernel configuration settings in files classified into categories per subdirectory:
```console
$ ls /proc/sys
abi

debug

dev

fs

kernel

net

user

vm
```
Most of these files act like a switch and — therefore — only contain either of two possible values: 0 or 1 (“on” or “off”). For instance: /proc/sys/net/ipv4/ip_forward The value that enables or disables our machine to act as a router (be able to forward packets):
```console
$ cat /proc/sys/net/ipv4/ip_forward
0

There are some exceptions, though:
/proc/sys/kernel/pid_max
The maximum PID allowed:
$ cat /proc/sys/kernel/pid_max
32768
```
**WARNING**
Be extra careful when changing the kernel settings as the wrong value may result in an unstable system.
#### Hardware Devices

Remember, in Linux “everything is a file”. This implies that hardware device information as well as the kernel’s own configuration settings are all stored in special files that reside in virtual
directories.
**The /dev Directory**
The device directory /dev contains device files (or nodes) for all connected hardware devices. These device files are used as an interface between the devices and the processes using them. Each device file falls into one of two categories:
**Block devices**
Are those in which data is read and written in blocks which can be individually addressed. Examples include hard disks (and their partitions, like /dev/sda1), USB flash drives, CDs, DVDs, etc.
**Character devices**
Are those in which data is read and written sequentially one character at a time. Examples include keyboards, the text console (/dev/console), serial ports (such as /dev/ttyS0 and so on), etc. When listing device files, make sure you use ls with the -l switch to differentiate between the two. We can — for instance — check for hard disks and partitions:
```console
# ls -l /dev/sd*
brw-rw---- 1 root disk 8, 0 may 25 17:02 /dev/sda
brw-rw---- 1 root disk 8, 1 may 25 17:02 /dev/sda1
brw-rw---- 1 root disk 8, 2 may 25 17:02 /dev/sda2
(...)
```
Or for serial terminals (TeleTYpewriter):
```console
# ls -l /dev/tty*
crw-rw-rw- 1 root tty

5,

0 may 25 17:26 /dev/tty

crw--w---- 1 root tty

4,

0 may 25 17:26 /dev/tty0

crw--w---- 1 root tty

4,

1 may 25 17:26 /dev/tty1

(...)
```
Notice how the first character is b for block devices and c for character devices.
**TIP**
The asterisk (*) is a globbing character than means 0 or more characters. Hence its importance in the ls -l /dev/sd* and ls -l /dev/tty* commands above. To learn more about these special characters, refer to the lesson on globbing.
Furthermore, /dev includes some special files which are quite useful for different programming purposes: /dev/zero It provides as many null characters as requested. /dev/null Aka bit bucket. It discards all information sent to it. /dev/urandom It generates pseudo-random numbers.
**The /sys Directory**
The sys filesystem (sysfs) is mounted on /sys. It was introduced with the arrival of kernel 2.6 and meant a great improvement on /proc/sys. Processes need to interact with the devices in /dev and so the kernel needs a directory which contains information about these hardware devices. This directory is /sys and its data is orderly arranged into categories. For instance, to check on the MAC address of your network card ( enp0s3), you would cat the following file:
```console
$ cat /sys/class/net/enp0s3/address
08:00:27:02:b2:74
```
#### Memory and Memory Types

Basically, for a program to start running, it has to be loaded into memory. By and large, when we speak of memory we refer to Random Access Memory (RAM) and — when compared to mechanical hard disks — it has the advantage of being a lot faster. On the down side, it is volatile (i.e., once the computer shuts down, the data is gone). Notwithstanding the aforementioned — when it comes to memory — we can differentiate two main types in a Linux system: Physical memory Also known as RAM, it comes in the form of chips made up of integrated circuits containing millions of transistors and capacitors. These, in turn, form memory cells (the basic building block of computer memory). Each of these cells has an associated hexadecimal code — a memory address — so that it can be referenced when needed.
**Swap**
Also known as swap space, it is the portion of virtual memory that lives on the hard disk and is used when there is no more RAM available. On the other hand, there is the concept of virtual memory which is an abstraction of the total amount of usable, addressing memory (RAM, but also disk space) as seen by applications. free parses /proc/meminfo and displays the amount of free and used memory in the system in a very clear manner:
```console
$ free
total

used

free

shared

buff/cache

available

Mem:

4050960

1474960

1482260

96900

1093740

2246372

Swap:

4192252

0

4192252
```
Let us explain the different columns:
**total**
Total amount of physical and swap memory installed.
**used**
Amount of physical and swap memory currently in use.
**free**
Amount of physical and swap memory currently not in use.
**shared**
Amount of physical memory used — mostly — by tmpfs.
**buff/cache**
Amount of physical memory currently in use by kernel buffers and the page cache and slabs.
**available**
Estimate of how much physical memory is available for new processes. By default free shows values in kibibytes, but allows for a variety of switches to display its results in different units of measurement. Some of these options include: -b Bytes.
**-m**
Mebibytes.
**-g**
Gibibytes.
**-h**
Human-readable format. -h is always comfortable to read:
```console
$ free -h
total

used

free

shared

buff/cache

available

Mem:

3,9G

1,4G

1,5G

75M

1,0G

2,2G

Swap:

4,0G

0B

4,0G
```
**NOTE**
A kibibyte (KiB) equals 1,024 bytes while a kilobytes (KB) equals 1000 bytes. The same is respectively true for mebibytes, gibibytes, etc.
#### Guided Exercises

1. Use the which command to find out the location of the following programs and complete the table: Program
**Path to Executable**
(output)
```console
which command
```
**User needs root**
privileges?
**swapon**
kill cut usermod cron ps
1. Where are the following files to be found? File
/etc
~
**.bashrc**
bash.bashrc passwd .profile resolv.conf sysctl.conf
1. Explain the meaning of the number elements for kernel file vmlinuz-4.15.0-50-generic found in /boot: Number Element
Meaning
**4**
15 0 50
1. What command would you use to list all hard drives and partitions in /dev?
#### Explorational Exercises

1. Device files for hard drives are represented based on the controllers they use — we saw /dev/sd* for drives using SCSI (Small Computer System Interface) and SATA (Serial Advanced Technology Attachment), but ◦ How were old IDE (Integrated Drive Electronics) drives represented?
◦ And modern NVMe (Non-Volatile Memory Express) drives?
1. Take a look at the file /proc/meminfo. Compare the contents of this file to the output of the command free and identify which key from /proc/meminfo correspond to the following fields in the output of free: free output
/proc/meminfo field
**total**
free shared buff/cache available
#### Summary

In this lesson you have learned about the location of programs and their configuration files in a Linux system. Important facts to remember are:
- Basically, programs are to be found across a three-level directory structure: /, /usr and /usr/local. Each of these levels may contain bin and sbin directories.
- Configuration files are stored in /etc and ~.
- Dotfiles are hidden files that start with a dot (.).
We have also discussed the Linux kernel. Important facts are:
- For Linux, everything is a file.
- The Linux kernel lives in /boot together with other boot-related files.
- For processes to start executing, the kernel has to first be loaded into a protected area of memory.
- The kernel job is that of allocating system resources to processes.
- The /proc virtual (or pseudo) filesystem stores important kernel and system data in a volatile way. Likewise, we have explored hardware devices and learned the following:
- The /dev directory stores special files (aka nodes) for all connected hardware devices: block devices or character devices. The former transfer data in blocks; the latter, one character at a time.
- The /dev directory also contains other special files such as /dev/zero, /dev/null or /dev/urandom.
- The /sys directory stores information about hardware devices arranged into categories.
Finally, we touched upon memory. We learned:
- A program runs when it is loaded into memory.
- What RAM (Random Access Memory) is.
- What Swap is.
- How to display the use of memory.
Commands used in this lesson:
**cat**
Concatenate/print file content.
**free**
Display amount of free and used memory in the system.
**ls**
List directory contents.
**which**
Show location of program.

### 4.3 Lesson 2

#### Introduction

After exploring programs and their configuration files, in this lesson we will learn how commands are executed as processes. Likewise, we will be commenting on the system messaging, the use of the kernel ring buffer and how the arrival of systemd and its journal daemon — journald — changed the ways things had been done so far regarding system logging.
#### Processes

Every time a user issues a command, a program is run and one or more processes are generated. Processes exist in a hierarchy. After the kernel is loaded in memory on boot, the first process is initiated which — in turn — starts other processes, which, again, can start other processes. Every process has a unique identifier (PID) and parent process identifier (PPID). These are positive integers that are assigned in sequential order.
**Exploring Processes Dynamically: top**
You can get a dynamic listing of all running processes with the top command:
```console
$ top
top - 11:10:29 up

2:21,

Tasks:

1 running,

73 total,

1 user,

0,3 sy,

load average: 0,11, 0,20, 0,14

72 sleeping,

0,0 ni, 99,7 id,

0 stopped,
0,0 wa,

0 zombie

%Cpu(s):

0,0 us,

0,0 hi,

0,0 si,

KiB Mem :

1020332 total,

909492 free,

38796 used,

72044 buff/cache

KiB Swap:

1046524 total,

1046524 free,

0 used.

873264 avail Mem

PID USER
```
PR
NI
VIRT
RES
SHR S %CPU %MEM
436 carol
20
0
42696
3624
3060 R
0,7
0,4
0:00.30 top
0,0 st
TIME+ COMMAND
4 root
20
0
0
0
0 S
0,3
0,0
0:00.12 kworker/0:0
399 root
20
0
95204
6748
5780 S
0,3
0,7
0:00.22 sshd
1 root
20
0
56872
6596
5208 S
0,0
0,6
0:01.29 systemd
2 root
20
0
0
0
0 S
0,0
0,0
0:00.00 kthreadd
3 root
20
0
0
0
0 S
0,0
0,0
0:00.02 ksoftirqd/0
5 root
0 -20
0
0
0 S
0,0
0,0
0:00.00 kworker/0:0H
6 root
20
0
0
0
0 S
0,0
0,0
0:00.00 kworker/u2:0
7 root
20
0
0
0
0 S
0,0
0,0
0:00.08 rcu_sched
8 root
20
0
0
0
0 S
0,0
0,0
0:00.00 rcu_bh
9 root
rt
0
0
0
0 S
0,0
0,0
0:00.00 migration/0
10 root
0 -20
0
0
0 S
0,0
0,0
0:00.00 lru-add-drain
(...)
As we saw above, top can also give us information about memory and CPU consumption of the overall system as well as for each process. top allows the user some interaction. By default, the output is sorted by the percentage of CPU time used by each process in descending order. This behavior can be modified by pressing the following keys from within top:
**M**
Sort by memory usage.
**N**
Sort by process ID number.
**T**
Sort by running time.
**P**
Sort by percentage of CPU usage.
To switch between descending/ascending order just press R.
**TIP**
A fancier and more user-friendly version of top is htop. Another — perhaps more exhaustive — alternative is atop. If not already installed in your system, I encourage you to use your package manager to install them and give them a try.
**A Snapshot of Processes: ps**
Another very useful command to get information about processes is ps. Whereas top provides dynamic information, that of ps is static. If invoked without options, the output of ps is quite discrete and relates only to the processes attached to the current shell:
```console
$ ps
PID TTY

TIME CMD

2318 pts/0

00:00:00 bash

2443 pts/0

00:00:00 ps
```
The displayed information has to do with the process identifier (PID), the terminal in which the process is run (TTY), the CPU time taken by the process (TIME) and the command which started the process (CMD). A useful switch for ps is -f which shows the full-format listing:
```console
$ ps -f
```
UID
PID
PPID
C STIME TTY
carol
2318
1682
0 08:38 pts/1
00:00:00 bash
TIME CMD
carol
2443
2318
0 08:46 pts/1
00:00:00 ps -f
In combination with other switches, -f shows the relationship between parent and child processes:
```console
$ ps -uf
```
USER
PID %CPU %MEM
VSZ
RSS TTY
carol
2318
0.0
0.1
21336
5140 pts/1
**STAT START**
Ss
08:38
**TIME COMMAND**
0:00 bash
carol
2492
0.0
0.0
38304
3332 pts/1
R+
08:51
0:00
carol
1780
0.0
0.1
21440
5412 pts/0
Ss
08:28
0:00 bash
carol
2291
0.0
0.7 305352 28736 pts/0
Sl+
08:35
0:00
**\_ ps -uf**
\_ emacs index.en.adoc
-nw
(...)
Likewise, ps can show the percentage of memory used when invoked with the -v switch:
```console
$ ps -v
PID TTY
```
STAT
TIME
MAJFL
1163 tty2
Ssl+
0:00
1
TRS
DRS
RSS %MEM COMMAND
67 201224 5576
0.1 /usr/lib/gdm3/gdm-x-session (...)
(...)
**NOTE**
Another visually attractive command that shows the hierarchy of processes is pstree. It ships with all major distributions.
**Process Information in the /proc Directory**
We have already seen the /proc filesystem. /proc includes a numbered subdirectory for every running process in the system (the number is the PID of the process): carol@debian:~# ls /proc 1
108
13
17
21
27
354
41
665
8
9
10
109
14
173
22
28
355
42
7
804
915
103
11
140
18
23
29
356
428
749
810
918
104
111
148
181
24
3
367
432
75
811
105
112
149
19
244
349
370
433
768
83
106
115
15
195
25
350
371
5
797
838
107
12
16
2
26
353
404
507
798
899
(...)
Thus, all the information about a particular process is included within its directory. Let us list the contents of the first process — that whose PID is 1 (the output has been truncated for readability):
```console
# ls /proc/1/
attr

cmdline

environ

io

mem

autogroup

comm

exe

limits

mountinfo numa_maps

ns

auxv

coredump_filter

fd

loginuid

mounts

oom_adj

...
```
You can check — for instance — the process executable:
```console
# cat /proc/1/cmdline; echo

/sbin/init
```
As you can see, the binary that started the hierarchy of processes was /sbin/init.
**NOTE**
Commands can be concatenated with the semicolon (;). The point in using the echo command above is to provide a newline. Try and run simply cat /proc/1/cmdline to see the difference.
**The System Load**
Each process on a system can potentially consume system resources. The so-called system load tries to aggregate the overall load of the system into a single numeric indicator. You can see the current load with the command uptime:
```console
$ uptime
22:12:54 up 13 days, 20:26,

1 user,

load average: 2.91, 1.59, 0.39
```
The three last digits indicate the system’s load average for the last minute (2.91), the last five minutes (1.59) and the last fifteen minutes (0.39), respectively. Each of these numbers indicates how many processes were waiting either for CPU resources or for input/output operations to complete. This means that these processes were ready to run if they had received the respective resources.
#### System Logging and System Messaging

As soon as the kernel and the processes start executing and communicating with each other, a lot of information is produced. Most of it is sent to files — the so-called log files or, simply, logs. Without logging, searching for an event that happened on a server would give sysadmins many a headache, hence the importance of having a standardized and centralized way of keeping track of any system events. Besides, logs are determinant and telling when it comes to troubleshooting and security as well as reliable data sources for understanding system statistics and making trend predictions.
**Logging with the syslog Daemon**
Traditionally, system messages have been managed by the standard logging facility — syslog — or any of its derivatives — syslog-ng or rsyslog. The logging daemon collects messages from other services and programs and stores them in log files, typically under /var/log. However, some
services take care of their own logs (take — for example — the Apache HTTPD web server). Likewise, the Linux kernel uses an in-memory ring buffer for storing its log messages. Log Files in /var/log Because logs are data that varies over time, they are normally found in /var/log. If you explore /var/log, you will realize that the names of logs are — to a certain degree — quite self-explanatory. Some examples include: /var/log/auth.log It stores information about authentication. /var/log/kern.log It stores kernel information. /var/log/syslog It stores system information. /var/log/messages It stores system and application data.
**NOTE**
The exact name and contents of log files may vary across Linux distributions.
**Accessing Log Files**
When exploring log files, remember to be root (if you do not have reading permissions) and use a pager such as less;
```console
# less /var/log/messages
```
Jun
4 18:22:48 debian liblogging-stdlog:
[origin software="rsyslogd" swVersion="8.24.0" x-
pid="285" x-info="http://www.rsyslog.com"] rsyslogd was HUPed Jun 29 16:57:10 debian kernel: [
0.000000] Linux version 4.9.0-8-amd64 (debian-
kernel@lists.debian.org) (gcc version 6.3.0 20170516 (Debian 6.3.0-18+deb9u1) ) #1 SMP Debian 4.9.130-2 (2018-10-27) Jun 29 16:57:10 debian kernel: [
0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-4.9.0-
8-amd64 root=/dev/sda1 ro quiet
Alternatively, you can use tail with the -f switch to read the most recent messages of the file and dynamically show new lines as they are appended:
```console
# tail -f /var/log/messages
```
Jul
9 18:39:37 debian kernel: [
2.350572] RAPL PMU: hw unit of domain psys 2^-0 Joules
Jul
9 18:39:37 debian kernel: [
2.512802] input: VirtualBox USB Tablet as
/devices/pci0000:00/0000:00:06.0/usb1/1-1/1-1:1.0/0003:80EE:0021.0001/input/input7 Jul
9 18:39:37 debian kernel: [
2.513861] Adding 1046524k swap on /dev/sda5.
Priority:-
**1 extents:1 across:1046524k FS**
Jul
9 18:39:37 debian kernel: [
2.519301] hid-generic 0003:80EE:0021.0001:
input,hidraw0: USB HID v1.10 Mouse [VirtualBox USB Tablet] on usb-0000:00:06.0-1/input0 Jul
9 18:39:37 debian kernel: [
2.623947] snd_intel8x0 0000:00:05.0: white list rate for
**1028:0177 is 48000**
Jul
9 18:39:37 debian kernel: [
2.914805] IPv6: ADDRCONF(NETDEV_UP): enp0s3: link is not
**ready**
Jul
9 18:39:39 debian kernel: [
4.937283] e1000: enp0s3 NIC Link is Up 1000 Mbps Full
**Duplex, Flow Control: RX**
Jul
9 18:39:39 debian kernel: [
4.938493] IPv6: ADDRCONF(NETDEV_CHANGE): enp0s3: link
**becomes ready**
Jul
9 18:39:40 debian kernel: [
5.315603] random: crng init done
Jul
9 18:39:40 debian kernel: [
5.315608] random: 7 urandom warning(s) missed due to
ratelimiting
You will find the output into the following format:
- Timestamp
- Hostname from which the message came from
- Name of program/service that generated the message
- The PID of the program that generated the message
- Description of the action that took place
Most log files are written in plain text; however, a few can contain binary data as is the case with /var/log/wtmp — which stores data relevant to successful logins. You can use the file command to determine which is the case:
```console
$ file /var/log/wtmp
/var/log/wtmp: dBase III DBT, version number 0, next free block index 8

These files are normally read using special commands. last is used to interpret the data in
/var/log/wtmp:
$ last

carol

tty2

:0
```
Thu May 30 10:53
still logged in
reboot
system boot
4.9.0-9-amd64
Thu May 30 10:52
still running
carol
tty2
:0
Thu May 30 10:47 - crash
reboot
system boot
4.9.0-9-amd64
Thu May 30 09:11
carol
tty2
:0
Tue May 28 08:28 - 14:11
(05:42)
reboot
system boot
4.9.0-9-amd64
Tue May 28 08:27 - 14:11
(05:43)
carol
tty2
:0
Mon May 27 19:40 - 19:52
(00:11)
reboot
system boot
4.9.0-9-amd64
Mon May 27 19:38 - 19:52
(00:13)
carol
tty2
:0
Mon May 27 19:35 - down
(00:03)
reboot
system boot
4.9.0-9-amd64
Mon May 27 19:34 - 19:38
(00:04)
**NOTE**
(00:05)
still running
Similar to /var/log/wtmp, /var/log/btmp stores information about failed login attempts and the special command to read its contents is lastb.
**Log Rotation**
Log files can grow a lot over a few weeks or months and take up all free disk space. To tackle this, the utility logrotate is used. It implements log rotation or cycling which implies actions such as moving log files to a new name, archiving and/or compressing them, sometimes emailing them to the sysadmin and eventually deleting them as they grow old. The conventions used for naming these rotated log files are diverse (adding a suffix with the date, for example); however, simply adding a suffix with an integer is commonplace:
```console
# ls /var/log/apache2/
access.log

error.log

error.log.1

error.log.2.gz

other_vhosts_access.log
```
Note how error.log.2.gz has already been compressed with gzip (hence the .gz suffix).
**The Kernel Ring Buffer**
The kernel ring buffer is a fixed-size data structure that records kernel boot messages as well as any live kernel messages. The function of this buffer — a very important one — is that of logging all the kernel messages produced on boot — when syslog is not yet available. The dmesg command prints the kernel ring buffer (which used to be also stored in /var/log/dmesg). Because of the extension of the ring buffer, this command is normally used in combination with the text filtering utility grep or a pager such as less. For instance, to search for boot messages:
```console
$ dmesg | grep boot
[

0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-4.9.0-9-amd64 root=UUID=5216e1e4-ae0e-

441f-b8f5-8061c0034c74 ro quiet
[

0.000000] smpboot: Allowing 1 CPUs, 0 hotplug CPUs
[

0.000000] Kernel command line: BOOT_IMAGE=/boot/vmlinuz-4.9.0-9-amd64

root=UUID=5216e1e4-ae0e-441f-b8f5-8061c0034c74 ro quiet
[

0.144986] AppArmor: AppArmor disabled by boot time parameter

(...)
```
**NOTE**
As the kernel ring buffer grows with new messages over time, the oldest ones will fade away.
**The System Journal: systemd-journald**
As of 2015, systemd replaced SysV Init as a de facto system and service manager in most major Linux distributions. As a consequence, the journal daemon — journald — has become the standard logging component, superseding syslog in most aspects. The data is no longer stored in plain text but in binary form. Thus, the journalctl utility is necessary to read the logs. On top of that, journald is syslog compatible and can be integrated with syslog. journalctl is the utility that is used to read and query systemd’s journal database. If invoked without options, it prints the entire journal:
```console
# journalctl
-- Logs begin at Tue 2019-06-04 17:49:40 CEST, end at Tue 2019-06-04 18:13:10 CEST. -jun 04 17:49:40 debian systemd-journald[339]: Runtime journal (/run/log/journal/) is 8.0M,
max 159.6M, 151.6M free.
jun 04 17:49:40 debian kernel: microcode: microcode updated early to revision 0xcc, date =
2019-04-01
Jun 04 17:49:40 debian kernel: Linux version 4.9.0-8-amd64 (debian-kernel@lists.debian.org)
(gcc version 6.3.0 20170516 (Debian 6.3.0-18+deb9u1) )
```
Jun 04 17:49:40 debian kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-4.9.0-8-amd64 root=/dev/sda1 ro quiet (...)
However, if invoked with the -k or --dmesg switches, it will be equivalent to using the dmesg command:
```console
# journalctl -k
[

0.000000] Linux version 4.9.0-9-amd64 (debian-kernel@lists.debian.org) (gcc version

6.3.0 20170516 (Debian 6.3.0-18+deb9u1) ) #1 SMP Debian 4.9.168-1+deb9u2 (2019-05-13)
[

0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-4.9.0-9-amd64 root=UUID=5216e1e4-ae0e-

441f-b8f5-8061c0034c74 ro quiet
(...)
```
Other interesting options for journalctl include: -b, --boot It shows boot information.
**-u**
It shows messages about a specified unit. Roughly, a unit can be defined as any resource handled by systemd. For example journalctl -u apache2.service is used to read messages about the apache2 web server.
**-f**
It shows most recent journal messages and keeps printing new entries as they are appended to the journal — much like tail -f.
#### Guided Exercises

1. Have a look at the following listing of top and answer the following questions: carol@debian:~$ top top - 13:39:16 up 31 min, Tasks:
73 total,
1 user,
2 running, 0.4 sy,
load average: 0.12, 0.15, 0.10
71 sleeping,
0.0 ni, 98.6 id,
0 stopped,
1.1 us,
KiB Mem :
1020332 total,
698700 free,
170664 used,
150968 buff/cache
KiB Swap:
1046524 total,
1046524 free,
0 used.
710956 avail Mem
VIRT
RES
0.0 wa,
0 zombie
%Cpu(s):
0.0 hi,
SHR S %CPU %MEM
0.0 si,
0.0 st
PID USER
PR
NI
605 nobody
20
0 1137620 132424
34256 S
6.3 13.0
1:47.24 ntopng
TIME+ COMMAND
444 www-data
20
0
364780
4132
2572 S
0.3
0.4
0:00.44 apache2
734 root
20
0
95212
7004
6036 S
0.3
0.7
0:00.36 sshd
887 carol
20
0
46608
3680
3104 R
0.3
0.4
0:00.03 top
1 root
20
0
56988
6688
5240 S
0.0
0.7
0:00.42 systemd
2 root
20
0
0
0
0 S
0.0
0.0
0:00.00 kthreadd
3 root
20
0
0
0
0 S
0.0
0.0
0:00.09 ksoftirqd/0
4 root
20
0
0
0
0 S
0.0
0.0
0:00.87 kworker/0:0
(...)
◦ Which processes have been started by the user carol?
◦ What virtual directory of /proc should you visit to search for data regarding the top command?
◦ What process was run first? How can you tell?
◦ Complete the table specifying in what area of top output the following information is found: Information about …
Summary Area
Task Area
**Memory**
Swap PID
Information about …
Summary Area
Task Area
**CPU time**
Commands
1. What command is used to read the following binary logs? ◦ /var/log/wtmp
◦ /var/log/btmp
◦ /run/log/journal/2a7d9730cd3142f4b15e20d6be631836/system.journal
1. In combination with grep, what commands would you use to find out the following information about your Linux system? ◦ When the system was last rebooted (wtmp)
◦ Which hard disks are installed (kern.log)
◦ When the last login occurred (auth.log)
1. What two commands would you use to have the kernel ring buffer displayed?
2. Indicate where the following log messages belong: ◦ Jul 10 13:37:39 debian dbus[303]: [system] Successfully activated service 'org.freedesktop.nm_dispatcher' /var/log/auth.log /var/log/kern.log /var/log/syslog /var/log/messages
◦ Jul 10 11:23:58 debian kernel: [ 1.923349] usbhid: USB HID core driver /var/log/auth.log /var/log/kern.log /var/log/syslog /var/log/messages ◦ Jul 10 14:02:53 debian sudo: pam_unix(sudo:session): session opened for user root by carol(uid=0) /var/log/auth.log /var/log/kern.log /var/log/syslog /var/log/messages ◦ Jul 10 11:23:58 debian NetworkManager[322]: NetworkManager (version 1.6.2) is starting…
<info>
[1562750638.8672]
**/var/log/auth.log**
/var/log/kern.log /var/log/syslog /var/log/messages
1. Have journalctl query information about the following units? Unit
Command
**ssh**
networking rsyslog cron
#### Explorational Exercises

1. Reconsider the top output from the guided exercises and answer the following questions: ◦ What two steps would you follow to kill the apache web server?
◦ In the summary area, how could you display the information about physical memory and swap using progress bars?
◦ Now, sort the processes by memory usage:
◦ Now that you have memory information displayed in progress bars and processes sorted by memory usage, save these configurations so that you get them as default next time you use top:
◦ What file stores top’s configuration settings? Where does it live? How can you check for its existence?
1. Learn about the command exec in Bash. Try to demonstrate its functionality by starting a Bash session, finding the Bash process with ps, then run exec /bin/sh and search for the process with the same PID again.
2. Follow these steps to explore kernel events and udev’s dynamic management of devices: ◦ Hotplug a USB drive into your computer. Run dmesg and pay attention to the last lines. What is the most recent line?
◦ Bearing in mind the output from the previous command, run ls /dev/sd* and make sure your USB drive appears in the listing. What is the output?
◦ Now remove the USB drive and run dmesg again. How does the most recent line read?
◦ Run ls /dev/sd* again and make sure your device disappeared from the listing. What is the output?
#### Summary

In the context of data storage, the following topics have been discussed in this lesson: process management and system logging and messaging. Regarding process management, we have learned the following:
- Programs generate processes and processes exist in a hierarchy.
- Every process has a unique identifier (PID) and a parent process identifier (PPID).
- top is a very useful command to dynamically and interactively explore the running processes of the system.
- ps can be used to obtain a snapshot of the current running processes in the system.
- The /proc directory includes directories for every running process in the system named after their PIDs.
- The concept of system
utilization/overloading.
load
average — which
is
very
useful
to
check
on
CPU
Concerning system logging, we must remember that:
- A log is a file where system events are recorded. Logs are invaluable when it comes to troubleshooting.
- Logging has traditionally been handled by special services such as syslog, syslog-ng or rsyslog.
Nevertheless, some programs use their own logging daemons.
- Because logs are variable data, they are kept in /var and — sometimes — their names can give you a clue about their content (kern.log, auth.log, etc.)
- Most logs are written in plain text and can be read with any text editor as long as you have the right permissions. However, a few of them are binary and must be read using special commands.
- To avoid problems with disk space, log rotation is carried out by the logrotate utility.
- As for the kernel, it uses a circular data structure — the ring buffer — where boot messages are kept (old messages fade away over time).
- The system and service manager systemd replaced System V init in virtually all distros with journald becoming the standard logging service.
- To read systemd’s journal, the journalctl utility is needed.
Commands used in this lesson:
**cat**
Concatenate/print file content.
**dmesg**
Print the kernel ring buffer.
**echo**
Display a line of text or a newline.
**file**
Determine file type.
**grep**
Print lines matching a pattern.
**last**
Show a listing of last logged in users.
**less**
Display contents of file one page at a time.
**ls**
List directory contents.
**journalctl**
Query the systemd journal.
**tail**
Display the last lines of a file.
0.4 sy,
load average: 0.12, 0.15, 0.10
71 sleeping,
0 stopped,
0.0 ni, 98.6 id,
1.1 us,
KiB Mem :
1020332 total,
698700 free,
170664 used,
150968 buff/cache
KiB Swap:
1046524 total,
1046524 free,
0 used.
710956 avail Mem
VIRT
RES
0.0 wa,
0 zombie
%Cpu(s):
0.0 hi,
SHR S %CPU %MEM
0.0 si,
0.0 st
PID USER
PR
NI
605 nobody
20
0 1137620 132424
34256 S
6.3 13.0
1:47.24 ntopng
TIME+ COMMAND
444 www-data
20
0
364780
4132
2572 S
0.3
0.4
0:00.44 apache2
734 root
20
0
95212
7004
6036 S
0.3
0.7
0:00.36 sshd
887 carol
20
0
46608
3680
3104 R
0.3
0.4
0:00.03 top
1 root
20
0
56988
6688
5240 S
0.0
0.7
0:00.42 systemd
2 root
20
0
0
0
0 S
0.0
0.0
0:00.00 kthreadd
3 root
20
0
0
0
0 S
0.0
0.0
0:00.09 ksoftirqd/0
4 root
20
0
0
0
0 S
0.0
0.0
0:00.87 kworker/0:0
(...)
◦ Which processes have been started by the user carol? Answer: Only one: top. ◦ What virtual directory of /proc should you visit to search for data regarding the top command? Answer: /proc/887 ◦ What process was run first? How can you tell? Answer: systemd. Because it is the one with PID #1. ◦ Complete the table specifying in what area of top output the following information is found:
**Information about …**
Summary Area Task Area Memory Yes Yes Swap Yes No Information about …
Summary Area
Task Area
PID
No
Yes
CPU time
Yes
Yes
Commands
No
Yes
2. What command is used to read the following binary logs? ◦ /var/log/wtmp Answer: last ◦ /var/log/btmp Answer: lastb ◦ /run/log/journal/2a7d9730cd3142f4b15e20d6be631836/system.journal Answer: journalctl 3. In combination with grep, what commands would you use to find out the following information about your Linux system? ◦ When the system was last rebooted (wtmp) Answer: last ◦ Which hard disk are installed (kern.log) Answer: less /var/log/kern.log ◦ When the last login occurred (auth.log) Answer: less /var/log/auth.log 4. What two commands would you use to have the kernel ring buffer displayed? dmesg and journalctl -k (also journalctl --dmesg). 5. Indicate where the following log messages belong: ◦ Jul 10 13:37:39 debian dbus[303]: [system] Successfully activated service 'org.freedesktop.nm_dispatcher' /var/log/auth.log
**/var/log/kern.log**
/var/log/syslog
X
**/var/log/messages**
◦ Jul 10 11:23:58 debian kernel: [ 1.923349] usbhid: USB HID core driver /var/log/auth.log /var/log/kern.log
X
**/var/log/syslog**
X
/var/log/messages
Jul 10 14:02:53 debian sudo: pam_unix(sudo:session): session opened for user root by carol(uid=0) /var/log/auth.log
X
**/var/log/kern.log**
/var/log/syslog /var/log/messages ◦ Jul 10 11:23:58 debian NetworkManager[322]: NetworkManager (version 1.6.2) is starting…
<info>
[1562750638.8672]
**/var/log/auth.log**
/var/log/kern.log /var/log/syslog /var/log/messages
X
6. Have journalctl query information about the following units:
**Unit**
Command ssh journalctl -u ssh.service networking journalctl -u networking.service rsyslog journalctl -u rsyslog.service cron journalctl -u cron.service

### Answers

#### Guided Exercises

**Lesson 1**

1. Use the which command to find out the location of the following programs and complete the table: Program
```console
which command
```
**Path to Binary**
(output)
**User needs root**
privileges?
swapon
```console
which swapon
```
/sbin/swapon
Yes
```console
kill
```
```console
which kill
```
/bin/kill
No
```console
cut
```
```console
which cut
```
/usr/bin/cut
No
usermod
```console
which usermod
```
/usr/sbin/usermod
Yes
cron
```console
which cron
```
/usr/sbin/cron
Yes
```console
ps
```
```console
which ps
```
/bin/ps
No
1. Where are the following files to be found? File
/etc
~
.bashrc
No
Yes
```console
bash.bashrc
```
Yes
No
passwd
Yes
No
.profile
No
Yes
resolv.conf
Yes
No
```console
sysctl.conf
```
Yes
No
1. Explain the meaning of the number elements for kernel file vmlinuz-4.15.0-50-generic found in /boot: Number Element
Meaning
4
Kernel version
15
Major revision
0
Minor revision
50
Patch number
1. What command would you use to list all hard drives and partitions in /dev?
```console
ls /dev/sd*
```

**Lesson 2**

1. Have a look the following listing of top and answer the following questions: carol@debian:~$ top top - 13:39:16 up 31 min, Tasks:
73 total,
1 user,
2 running,

#### Explorational Exercises

**Lesson 1**

1. Device files for hard drives are represented based on the controllers they use — we saw /dev/sd* for drives using SCSI (Small Computer System Interface) and SATA (Serial Advanced Technology Attachment), but ◦ How were old IDE (Integrated Drive Electronics) drives represented? /dev/hd* ◦ And modern NVMe (Non-Volatile Memory Express) drives? /dev/nvme*
2. Take a look at the file /proc/meminfo. Compare the contents of this file to the output of the command free and identify which key from /proc/meminfo correspond to the following fields in the output of free:
free output /proc/meminfo field
**total**
MemTotal / SwapTotal
**free**
MemFree / SwapFree shared Shmem
**buff/cache**
Buffers, Cached and SReclaimable
**available**
MemAvailable

**Lesson 2**

1. Reconsider the top output from the guided exercises and answer the following questions: ◦ What two steps would you follow to kill the apache web server? First, press k; then provide a kill value. ◦ In the summary area, how could you display the information about physical memory and swap using progress bars? By pressing m once or twice. ◦ Now, sort the processes by memory usage: M ◦ Now that you have memory information displayed in progress bars and processes sorted by memory usage, save these configurations so that you get them as default next time you use top: W ◦ What file stores top’s configuration settings? Where does it live? How can you check for its existence? The file is ~/.config/procps/toprc and lives in the user’s home directory (~). Since it is a hidden file (it resides in a directory whose name starts with a dot), we can check for its existence with ls -a (list all files). This file can be generated by pressing Shift + W while in top.
2. Learn about the command exec in Bash. Try to demonstrate its functionality by starting a Bash session, finding the Bash process with ps, then run exec /bin/sh and search for the process with the same PID again. exec replaces a process with another command. In the following example we can see that the Bash process is replaced by /bin/sh (instead of /bin/sh becoming a child process): $ echo $$ 19877 $ ps auxf | grep 19877 | head -1 carol
19877
0.0
0.0
7448
3984 pts/25
Ss
21:17
0:00
\_ bash
```console
$ exec /bin/sh

sh-5.0$ ps auxf | grep 19877 | head -1
carol

19877

0.0

0.0

7448

3896 pts/25
```
Ss
21:17
0:00
\_ /bin/sh
1. Follow these steps to explore kernel events and udev’s dynamic management of devices: ◦ Hotplug a USB drive into your computer. Run dmesg and pay attention to the last lines. What is the most recent line? You should get something along the lines of [ 1967.700468] sd 6:0:0:0: [sdb] Attached SCSI removable disk. ◦ Bearing in mind the output from the previous command, run ls /dev/sd* and make sure your USB drive appears in the listing. What is the output? Depending on the number of devices connected to your system, you should get something like /dev/sda /dev/sda1 /dev/sdb /dev/sdb1 /dev/sdb2. In our case, we find our USB drive (/dev/sdb) and its two partitions (/dev/sdb1 and /dev/sdb2). ◦ Now remove the USB drive and run dmesg again. How does the most recent line read? You should get something along the lines of [ disconnect, device number 6.
2458.881695]
usb
1-9:
USB
◦ Run ls /dev/sd* again and make sure your device disappeared from the listing. What is the output? In our case, /dev/sda /dev/sda1.
