---
id: pragmatic-systemd-01
title: "Pragmatic systemd — Pragmatic systemd, We are Opensource.com, Table of Contents…",
slug: pragmatic-systemd-01-pragmatic-systemd-pragmatic-systemd-we-are-opensource-com-ta
source: "Pragmatic systemd",
sourceSection: "Pragmatic systemd, We are Opensource.com, Table of Contents, David Both, SystemV target aliases Description, default.target, This target is always aliased with a symbolic link to, runlevel5.target, runlevel4.target Unused. Runlevel 4 was identical to runlevel 3 in the, runlevel3.target, All services"
track: linux-engineer,
tier: free
tags: [linux, systemd, services, init, production]
summary: "Opensource.com is a community website publishing stories about creating, adopting, and Covers 90 sections: Pragmatic systemd, We are Opensource.com, Table of Contents.",
---
# Pragmatic systemd — Pragmatic systemd, We are Opensource.com, Table of Contents…

## Pragmatic systemd
by David Both

## We are Opensource.com
Opensource.com is a community website publishing stories about creating, adopting, and
sharing open source solutions. Visit Opensource.com to learn more about how the open
source way is improving technologies, education, business, government, health, law,
entertainment, humanitarian efforts, and more.
Do you have an open source story to tell? Submit a story idea at opensource.com/story
Email us at open@opensource.com

## Table of Contents

## David Both

David Both is an Open Source Software and GNU/Linux advocate,
trainer, writer, and speaker who lives in Raleigh North Carolina. He
is a strong proponent of and evangelist for the "Linux Philosophy."
David has been in the IT industry for nearly 50 years. He has taught
RHCE classes for Red Hat and has worked at MCI Worldcom, Cisco,
and the State of North Carolina. He has been working with Linux
and Open Source Software for over 20 years.
David prefers to purchase the components and build his own computers from scratch to
ensure that each new computer meets his exacting specifications. His primary workstation is
an ASUS TUF X299 motherboard and an Intel i9 CPU with 16 cores (32 CPUs) and 64GB of
RAM in a ThermalTake Core X9 case.
David has written articles for magazines including, Linux Magazine, Linux Journal. His article
"Complete Kickstart," co-authored with a colleague at Cisco, was ranked 9th in the Linux
Magazine Top Ten Best System Administration Articles list for 2008. David currently writes
prolifically for OpenSource.com and Enable SysAdmin.
David currently has one book published, "The Linux Philosophy for SysAdmins." and is now is
working on his next project, “Using and Administering Linux: Zero to SysAdmin,” a self-study
training course in three volumes that is scheduled for release in late 2019."
David can be reached at LinuxGeek46@both.org or on Mastodon at
@LinuxGeek46@linuxrocks.online

3

Learning to love systemd
For the record, systemd is spelled in all lower-case, even at the beginning of a sentence.
systemd (see?) is a replacement for init and SystemV init scripts. It's also much more.
Like most sysadmins, when I think of the init program and SystemV, I think of Linux startup
and shutdown and not really much else, like managing services once they are up and running.
Like init, systemd is the mother of all processes, and it is responsible for bringing the Linux
host up to a state in which productive work can be done. Some of the functions assumed by
systemd, which is far more extensive than the old init program, are to manage many aspects
of a running Linux host, including mounting filesystems, managing hardware, handling timers,
and starting and managing the system services that are required to have a productive Linux
host.
This ebook explores systemd's functions both at startup and beginning after startup finishes.
It's an unofficial companion to my three-volume Linux training course, Using and
administering Linux: zero to sysadmin, and contains great information for advanced users and
beginning sysadmins alike.

Linux boot
The complete process that takes a Linux host from an off state to a running state is complex,
but it is open and knowable. Before getting into the details, I'll give a quick overview
from when the host hardware is turned on until the system is ready for a user to log in. Most of
the time, "the boot process" is discussed as a single entity, but that is not accurate. There are,
in fact, three major parts to the full boot and startup process:
- Hardware boot: Initializes the system hardware
- Linux boot: Loads the Linux kernel and then systemd
- Linux startup: Where systemd prepares the host for productive work

4

The Linux startup sequence begins after the kernel has loaded either init or systemd,
depending upon whether the distribution uses the old or new startup, respectively. The init
and systemd programs start and manage all the other processes and are both known as the
"mother of all processes" on their respective systems.
It is important to separate the hardware boot from the Linux boot from the Linux startup and
to explicitly define the demarcation points between them. Understanding these differences
and what part each plays in getting a Linux system to a state where it can be productive
makes it possible to manage these processes and better determine where a problem is
occurring during what most people refer to as "boot."
The startup process follows the three-step boot process and brings the Linux computer up to
an operational state in which it is usable for productive work. The startup process begins when
the kernel transfers control of the host to systemd.

systemd controversy
systemd can evoke a wide range of reactions from sysadmins and others responsible for
keeping Linux systems up and running. The fact that systemd is taking over so many tasks in
many Linux systems has engendered pushback and discord among certain groups of
developers and sysadmins.
SystemV and systemd are two different methods of performing the Linux startup sequence.
SystemV start scripts and the init program are the old methods, and systemd using targets is
the new method. Although most modern Linux distributions use the newer systemd for
startup, shutdown, and process management, there are still some that do not. One reason is
that some distribution maintainers and some sysadmins prefer the older SystemV method
over the newer systemd.
I think both have advantages.

Why I prefer SystemV
I prefer SystemV because it is more open. Startup is accomplished using Bash scripts. After
the kernel starts the init program, which is a compiled binary, init launches the rc.sysinit
script, which performs many system initialization tasks. After rc.sysinit completes, init
launches the /etc/rc.d/rc script, which in turn starts the various services defined by the
SystemV start scripts in the /etc/rc.d/rcX.d, where "X" is the number of the runlevel being
started.

5

Except for the init program itself, all these programs are open and easily knowable scripts. It is
possible to read through these scripts and learn exactly what is taking place during the entire
startup process, but I don't think many sysadmins actually do that. Each start script is
numbered so that it starts its intended service in a specific sequence. Services are started
serially, and only one service starts at a time.
systemd, developed by Red Hat's Lennart Poettering and Kay Sievers, is a complex system of
large, compiled binary executables that are not understandable without access to the source
code. It is open source, so "access to the source code" isn't hard, just less convenient. systemd
appears to represent a significant refutation of multiple tenets of the Linux philosophy. As a
binary, systemd is not directly open for the sysadmin to view or make easy changes. systemd
tries to do everything, such as managing running services, while providing significantly more
status information than SystemV. It also manages hardware, processes, and groups of
processes, filesystem mounts, and much more. systemd is present in almost every aspect of
the modern Linux host, making it the one-stop tool for system management. All of this is a
clear violation of the tenets that programs should be small and that each program should do
one thing and do it well.

Why I prefer systemd
I prefer systemd as my startup mechanism because it starts as many services as possible in
parallel, depending upon the current stage in the startup process. This speeds the overall
startup and gets the host system to a login screen faster than SystemV.
systemd manages almost every aspect of a running Linux system. It can manage running
services while providing significantly more status information than SystemV. It also manages
hardware, processes and groups of processes, filesystem mounts, and much more. systemd is
present in almost every aspect of the modern Linux operating system, making it the one-stop
tool for system management. (Does this sound familiar?)
The systemd tools are compiled binaries, but the tool suite is open because all the
configuration files are ASCII text files. Startup configuration can be modified through various
GUI and command-line tools, as well as adding or modifying various configuration files to suit
the needs of the specific local computing environment.

The real issue
Did you think I could not like both startup systems? I do, and I can work with either one.

In my opinion, the real issue and the root cause of most of the controversy between SystemV
and systemd is that there is no choice on the sysadmin level. The choice of whether to use
SystemV or systemd has already been made by the developers, maintainers, and packagers of
the various distributions—but with good reason. Scooping out and replacing an init system, by
its extreme, invasive nature, has a lot of consequences that would be hard to tackle outside
the distribution design process.
Despite the fact that this choice is made for me, my Linux hosts boot up and work, which is
what I usually care the most about. As an end user and even as a sysadmin, my primary
concern is whether I can get my work done, work such as writing my books and this article,
installing updates, and writing scripts to automate everything. So long as I can do my work, I
don't really care about the start sequence used on my distro.
I do care when there is a problem during startup or service management. Regardless of which
startup system is used on a host, I know enough to follow the sequence of events to find the
failure and fix it.

Replacing SystemV
There have been previous attempts at replacing SystemV with something a bit more modern.
For about two releases, Fedora used a thing called Upstart to replace the aging SystemV, but
it did not replace init and provided no changes that I noticed. Because Upstart provided no
significant changes to the issues surrounding SystemV, efforts in this direction were quickly
dropped in favor of systemd.
Despite the fact that most Linux developers agree that replacing the old SystemV startup is a
good idea, many developers and sysadmins dislike systemd for that. Rather than rehash all the
so-called issues that people have—or had—with systemd, I will refer you to two good, if
somewhat old, articles that should cover most everything. Linus Torvalds, the creator of the
Linux kernel, seems disinterested. In a 2014 ZDNet article, Linus Torvalds and others on
Linux's systemd, Linus is clear about his feelings.
"I don't actually have any particularly strong opinions on systemd itself. I've had
issues with some of the core developers that I think are much too cavalier about
bugs and compatibility, and I think some of the design details are insane (I dislike
the binary logs, for example), but those are details, not big issues."
In case you don't know much about Linus, I can tell you that if he does not like something, he
is very outspoken, explicit, and quite clear about that dislike.

7

In 2013, Poettering wrote a long blog post in which he debunks the myths about systemd while
providing insight into some of the reasons for creating it. I highly recommend reading it.

systemd tasks
Depending upon the options used during the compile process (which are not considered in
this series), systemd can have as many as 69 binary executables that perform the following
tasks, among others:
- The systemd program runs as PID 1 and provides system startup of as many services in
parallel as possible, which, as a side effect, speeds overall startup times. It also
manages the shutdown sequence.
- The systemctl program provides a user interface for service management.
- Support for SystemV and LSB start scripts is offered for backward compatibility.
- Service management and reporting provide more service status data than SystemV.
- It includes tools for basic system configuration, such as hostname, date, locale, lists of
logged-in users, running containers and virtual machines, system accounts, runtime
directories and settings, daemons to manage simple network configuration, network
time synchronization, log forwarding, and name resolution.
- It offers socket management.
- systemd timers provide advanced cron-like capabilities to include running a script at
times relative to system boot, systemd startup, the last time the timer was started, and
more.
- It provides a tool to analyze dates and times used in timer specifications.
- Mounting and unmounting of filesystems with hierarchical awareness allows safer
cascading of mounted filesystems.
- It enables the positive creation and management of temporary files, including deletion.
- An interface to D-Bus provides the ability to run scripts when devices are plugged in or
removed. This allows all devices, whether pluggable or not, to be treated as plug-andplay, which considerably simplifies device handling.
- Its tool to analyze the startup sequence can be used to locate the services that take
the most time.
- It includes journals for storing system log messages and tools for managing the
journals.

8

Architecture
Those tasks and more are supported by a number of daemons, control programs, and
configuration files. Figure 1 shows many of the components that belong to systemd. This is a
simplified diagram designed to provide a high-level overview, so it does not include all of the
individual programs or files. Nor does it provide any insight into data flow, which is so complex
that it would be a useless exercise in the context of this series of articles.

Fig 1: Architecture of systemd, by Shmuel Csaba Otto Traian (CC BY-SA 3.0)

A full exposition of systemd would take a book on its own. You do not need to understand the
details of how the systemd components in Figure 1 fit together; it's enough to know about the
programs and components that enable managing various Linux services and deal with log files
and journals. But it's clear that systemd is not the monolithic monstrosity it is purported to be
by some of its critics.

systemd as PID 1
systemd is PID 1. Some of its functions, which are far more extensive than the old SystemV3
init program, are to manage many aspects of a running Linux host, including mounting
filesystems and starting and managing system services required to have a productive Linux

9

host. Any of systemd's tasks that are not related to the startup sequence are outside the
scope of this article (but some will be explored later in this series).
First, systemd mounts the filesystems defined by /etc/fstab, including any swap files or
partitions. At this point, it can access the configuration files located in /etc, including its own.
It uses its configuration link, /etc/systemd/system/default.target, to determine which
state or target it should boot the host into. The default.target file is a symbolic link to the
true target file. For a desktop workstation, this is typically going to be the graphical.target,
which is equivalent to runlevel 5 in SystemV. For a server, the default is more likely to be the
multi-user.target, which is like runlevel 3 in SystemV. The emergency.target is similar to
single-user mode. Targets and services are systemd units.
The table below (Figure 2) compares the systemd targets with the old SystemV startup
runlevels. systemd provides the systemd target aliases for backward compatibility. The target
aliases allow scripts—and many sysadmins—to use SystemV commands like init 3 to change
runlevels. Of course, the SystemV commands are forwarded to systemd for interpretation and
execution.
systemd
targets

## SystemV target aliases Description
runlevel

## default.target

## This target is always aliased with a symbolic link to
either multi-user.target or graphical.target.
systemd always uses the default.target to start the
system. The default.target should never be aliased
to halt.target, poweroff.target, or reboot.target.
5

## runlevel5.target

4

## runlevel4.target Unused. Runlevel 4 was identical to runlevel 3 in the
SystemV world. This target could be created and
customized to start local services without changing
the default multi-user.target.

3

## runlevel3.target

## All services running, but command-line interface
(CLI) only

2

## runlevel2.target

## Multi-user, without NFS, but all other non-GUI
services running

## rescue.target

## runlevel1.target

## A basic system, including mounting the filesystems
with only the most basic services running and a rescue
shell on the main console

## emergency.targe
t

S

## Multi-user.target with a GUI

Single-user mode—no services are running;
filesystems are not mounted. This is the most basic
level of operation with only an emergency shell

10

## systemd
targets

## SystemV target aliases Description
runlevel
running on the main console for the user to interact
with the system.

## halt.target

## Halts the system without powering it down

## reboot.target

## runlevel6.target

## Reboot

## poweroff.target

## runlevel0.target Halts the system and turns the power off

Fig. 2: Comparison of SystemV runlevels with systemd targets and some target aliases

Each target has a set of dependencies described in its configuration file. systemd starts the
required dependencies, which are the services required to run the Linux host at a specific
level of functionality. When all the dependencies listed in the target configuration files are
loaded and running, the system is running at that target level. In Figure 2, the targets with the
most functionality are at the top of the table, with functionality declining towards the bottom
of the table.
systemd also looks at the legacy SystemV init directories to see if any startup files exist there.
If so, systemd uses them as configuration files to start the services described by the files. The
deprecated network service is a good example of one that still uses SystemV startup files in
Fedora.
Figure 3 is copied directly from the bootup man page. It shows a map of the general sequence
of events during systemd startup and the basic ordering requirements to ensure a successful
startup.

11

## cryptsetup-pre.target
(various low-level
API VFS mounts:
(various cryptsetup devices...)
mqueue, configfs,
debugfs, ...)
cryptsetup.target |
| (various swap
remote-fs-pre.target
devices...)
local-fs-pre.target |
| (network file systems)
| swap.target
| remote-cryptsetup.target |
| (various low-level (various mounts and |
services: udevd,
fsck services...)
remote-fs.target
tmpfiles, random
seed, sysctl, ...)
local-fs.target
\____|______|_______________
______|___________/
\ /
sysinit.target
______________________/|\_____________________
\
| /
| /
(various
(various
| (various
|/
timers...)
paths...)
sockets...)
timers.target paths.target
| sockets.target
\_______ | _____/
rescue.service
\|/
basic.target
rescue.target
________v____________________
\
display(various system
(various system |
manager.service
services
services)
required for
graphical UIs)
emergency.service
\_____________ | _____________/
\|/
emergency.target

## Fig 3: The systemd startup map

12

The sysinit.target and basic.target targets can be considered checkpoints in the startup
process. Although one of systemd's design goals is to start system services in parallel, certain
services and functional targets must be started before other services and targets can start.
These checkpoints cannot be passed until all of the services and targets required by that
checkpoint are fulfilled.
The sysinit.target is reached when all of the units it depends on are completed. All of those
units, mounting filesystems, setting up swap files, starting udev, setting the random generator
seed, initiating low-level services, and setting up cryptographic services (if one or more
filesystems are encrypted), must be completed but, within the sysinit.target, those tasks
can be performed in parallel.
The sysinit.target starts up all of the low-level services and units required for the system to
be marginally functional and that are required to enable moving onto the basic.target.
After the sysinit.target is fulfilled, systemd then starts all the units required to fulfill the next
target. The basic target provides some additional functionality by starting units that are
required for all of the next targets. These include setting up things like paths to various
executable directories, communication sockets, and timers.
Finally, the user-level targets, multi-user.target or graphical.target, can be initialized. The
multi-user.target must be reached before the graphical target dependencies can be met.
The underlined targets in Figure 3 are the usual startup targets. When one of these targets is
reached, startup has completed. If the multi-user.target is the default, then you should see
a text-mode login on the console. If graphical.target is the default, then you should see a
graphical login; the specific GUI login screen you see depends on your default display
manager.
The bootup man page also describes and provides maps of the boot into the initial RAM disk
and the systemd shutdown process.
systemd also provides a tool that lists dependencies of a complete startup or for a specified
unit. A unit is a controllable systemd resource entity that can range from a specific service,
such as httpd or sshd, to timers, mounts, sockets, and more. Try the following command and
scroll through the results.
systemctl list-dependencies graphical.target

Notice that this fully expands the top-level target units list required to bring the system up to
the graphical target run mode. Use the --all option to expand all of the other units as well.

13

## systemctl list-dependencies --all graphical.target

You can search for strings such as "target," "slice," and "socket" using the search tools of the
less command.
Try these commands:
systemctl list-dependencies multi-user.target
systemctl list-dependencies rescue.target
systemctl list-dependencies local-fs.target
systemctl list-dependencies dbus.service

This tool helps me visualize the specifics of the startup dependencies for the host I am
working on. Go ahead and spend some time exploring the startup tree for one or more of your
Linux hosts. But be careful because the systemctl man page contains this note:
"Note that this command only lists units currently loaded into memory by the
service manager. In particular, this command is not suitable to get a comprehensive
list at all reverse dependencies on a specific unit, as it won't list the dependencies
declared by units currently not loaded."

Even before getting very deep into systemd, it's obvious that it is both powerful and complex.
It is also apparent that systemd is not a single, huge, monolithic, and unknowable binary file.
Rather, it is composed of a number of smaller components and subcommands that are
designed to perform specific tasks.

Resources
There's a series of deeply technical articles for Linux sysadmins by Lennart Poettering, the
designer and primary developer of systemd. These articles were written between April 2010
and September 2011, but they're just as relevant now as they were then. Much of everything
else good that has been written about systemd and its ecosystem is based on these papers.
- Rethinking PID 1
- systemd for Administrators, Part I

14

## • systemd for Administrators, Part II
- systemd for Administrators, Part III
- systemd for Administrators, Part IV
- systemd for Administrators, Part V
- systemd for Administrators, Part VI
- systemd for Administrators, Part VII
- systemd for Administrators, Part VIII
- systemd for Administrators, Part IX
- systemd for Administrators, Part X
- systemd for Administrators, Part XI

15

Understanding systemd at startup
In the previous chapter, I looked at systemd's functions and architecture and the controversy
around its role as a replacement for the old SystemV init program and startup scripts. In this
chapter, I explore the files and tools that manage the Linux startup sequence. I'll explain the
systemd startup sequence, how to change the default startup target (runlevel in SystemV
terms), and how to manually switch to a different target without going through a reboot.
I'll also look at two important systemd tools. The first is the systemctl command, which is the
primary means of interacting with and sending commands to systemd. The second is
journalctl, which provides access to the systemd journals that contain huge amounts of
system history data such as kernel and service messages (both informational and error
messages).
Be sure to use a non-production system for testing and experimentation in this and future
articles. Your test system needs to have a GUI desktop (such as Xfce, LXDE, Gnome, KDE, or
another) installed.

Exploring Linux startup with systemd
Before you can observe the startup sequence, you need to do a couple of things to make the
boot and startup sequences open and visible. Normally, most distributions use a startup
animation or splash screen to hide the detailed messages that would otherwise be displayed
during a Linux host's startup and shutdown. This is called the Plymouth boot screen on Red
Hat-based distros. Those hidden messages can provide a great deal of information about
startup and shutdown to a sysadmin looking for information to troubleshoot a bug or to just
learn about the startup sequence. You can change this using the GRUB (Grand Unified Boot
Loader) configuration.

16

The main GRUB configuration file is /boot/grub2/grub.cfg, but, because this file can be
overwritten when the kernel version is updated, you do not want to change it. Instead, modify
the /etc/default/grub file, which is used to modify the default settings of grub.cfg.
Start by looking at the current, unmodified version of the /etc/default/grub file:
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="resume=/dev/mapper/fedora_testvm1-swap rd.lvm.
lv=fedora_testvm1/root rd.lvm.lv=fedora_testvm1/swap rd.lvm.lv=fedora_
testvm1/usr rhgb quiet"
GRUB_DISABLE_RECOVERY="true"

Chapter 6 of the GRUB documentation contains a list of all the possible entries in the
/etc/default/grub file, but I focus on the following:
- I change GRUB_TIMEOUT, the number of seconds for the GRUB menu countdown,
from five to 10 to give a bit more time to respond to the GRUB menu before the
countdown hits zero.
- I delete the last two parameters on GRUB_CMDLINE_LINUX, which lists the
command-line parameters that are passed to the kernel at boot time. One of these
parameters, rhgb stands for Red Hat Graphical Boot, and it displays the little Fedora
icon animation during the kernel initialization instead of showing boot-time messages.
The other, the quiet parameter, prevents displaying the startup messages that
document the progress of the startup and any errors that occur. I delete both rhgb and
quiet because sysadmins need to see these messages. If something goes wrong
during boot, messages on the screen can point to the cause of the problem.
After you make these changes, your GRUB file will look like:
GRUB_TIMEOUT=10
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="resume=/dev/mapper/fedora_testvm1-swap rd.lvm.
lv=fedora_testvm1/root rd.lvm.lv=fedora_testvm1/swap rd.lvm.lv=fedora_
testvm1/usr"
GRUB_DISABLE_RECOVERY="false"

17

The grub2-mkconfig program generates the grub.cfg configuration file using the contents
of the /etc/default/grub file to modify some of the default GRUB settings. The grub2mkconfig program sends its output to STDOUT. It has a -o option that allows you to specify
a file to send the datastream to, but it is just as easy to use redirection. Run the following
command to update the /boot/grub2/grub.cfg configuration file:
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-4.18.9-200.fc28.x86_64
Found initrd image: /boot/initramfs-4.18.9-200.fc28.x86_64.img
Found linux image: /boot/vmlinuz-4.17.14-202.fc28.x86_64
Found initrd image: /boot/initramfs-4.17.14-202.fc28.x86_64.img
Found linux image: /boot/vmlinuz-4.16.3-301.fc28.x86_64
Found initrd image: /boot/initramfs-4.16.3-301.fc28.x86_64.img
Found linux image: /boot/vmlinuz-0-rescue-7f12524278bd40e9b10a085bc82dc504
Found initrd image: /boot/initramfs-0-rescue-7f12524278bd40e9b10a085bc82dc504.img
done

Reboot your test system to view the startup messages that would otherwise be hidden behind
the Plymouth boot animation. But what if you need to view the startup messages and have
not disabled the Plymouth boot animation? Or you have, but the messages stream by too fast
to read? (Which they do.)
There are a couple of options, and both involve log files and systemd journals—which are your
friends. You can use the less command to view the contents of the /var/log/messages file.
This file contains boot and startup messages as well as messages generated by the operating
system during normal operation. You can also use the journalctl command without any
options to view the systemd journal, which contains essentially the same information:
-- Logs begin at Sat 2020-01-11 21:48:08 EST, end at Fri 2020-04-03 08:54:30 EDT.
-Jan 11 21:48:08 f31vm.both.org kernel: Linux version 5.3.7-301.fc31.x86_64
(mockbuild@bkernel03.phx2.fedoraproject.org) (gcc version 9.2.1 20190827 (Red Hat
9.2.1-1) (GCC)) #1 SMP Mon Oct >
Jan 11 21:48:08 f31vm.both.org kernel: Command line:
BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.3.7-301.fc31.x86_64 root=/dev/mapper/VG01-root
ro resume=/dev/mapper/VG01-swap rd.lvm.lv=VG01/root rd>
Jan 11 21:48:08 f31vm.both.org kernel: x86/fpu: Supporting XSAVE feature 0x001:
Jan 11 21:48:08 f31vm.both.org kernel: x86/fpu: Supporting XSAVE feature 0x002:

18

I truncated this datastream because it can be hundreds of thousands or even millions of lines
long. (The journal listing on my primary workstation is 1,188,482 lines long.) Be sure to try this
on your test system. If it has been running for some time—even if it has been rebooted many
times—huge amounts of data will be displayed. Explore this journal data. It contains a lot of
information that can be very useful when doing problem determination. Knowing what this
data looks like for a normal boot and startup can help you locate problems when they occur.
I will discuss systemd journals, the journalctl command, and how to sort through all of that
data to find what you want in more detail later in this book.
After GRUB loads the kernel into memory, it must first extract itself from the compressed
version of the file before it can perform any useful work. After the kernel has extracted itself
and started running, it loads systemd and turns control over to it.
This is the end of the boot process. At this point, the Linux kernel and systemd are running but
unable to perform any productive tasks for the end user because nothing else is running,
there's no shell to provide a command line, no background processes to manage the network
or other communication links, and nothing that enables the computer to perform any
productive function.
systemd can now load the functional units required to bring the system up to a selected
target run state.

Targets
A systemd target represents a Linux system's current or desired run state. Much like SystemV
start scripts, targets define the services that must be present for the system to run and be
active in that state. Figure 1 shows the possible run-state targets of a Linux system using
systemd. As seen in the first article of this series and in the systemd bootup man page (man
bootup), there are other intermediate targets that are required to enable various necessary
services. These can include swap.target, timers.target, local-fs.target, and more. Some
targets (like basic.target) are used as checkpoints to ensure that all the required services are
up and running before moving on to the next-higher level target.
Unless otherwise changed at boot time in the GRUB menu, systemd always starts the
default.target. The default.target file is a symbolic link to the true target file. For a desktop
workstation, this is typically going to be the graphical.target, which is equivalent to runlevel
5 in SystemV. For a server, the default is more likely to be the multi-user.target, which is like

19

runlevel 3 in SystemV. The emergency.target file is similar to single-user mode. Targets and
services are systemd units.
The following table, which I included in the previous article in this series, compares the
systemd targets with the old SystemV startup runlevels. The systemd target aliases are
provided by systemd for backward compatibility. The target aliases allow scripts—and
sysadmins—to use SystemV commands like init 3 to change runlevels. Of course, the
SystemV commands are forwarded to systemd for interpretation and execution.
systemd
targets

## SystemV target aliases
runlevel

## default.target

## This target is always aliased with a symbolic link to
either multi-user.target or graphical.target.
systemd always uses the default.target to start the
system. The default.target should never be aliased
to halt.target, poweroff.target, or reboot.target.

5

## runlevel5.target

4

## runlevel4.target Unused. Runlevel 4 was identical to runlevel 3 in the
SystemV world. This target could be created and
customized to start local services without changing
the default multi-user.target.

3

## runlevel3.target

## All services running, but command-line interface
(CLI) only

## runlevel2.target

## Multi-user, without NFS, but all other non-GUI
services running

## rescue.target

1

## runlevel1.target

## A basic system, including mounting the filesystems
with only the most basic services running and a rescue
shell on the main console

## emergency.target

S

## Multi-user.target with a GUI

Single-user mode—no services are running;
filesystems are not mounted. This is the most basic
level of operation with only an emergency shell
running on the main console for the user to interact
with the system.

## halt.target

## Halts the system without powering it down

## reboot.target

## runlevel6.target

## Reboot

## poweroff.target

## runlevel0.target Halts the system and turns the power off

Fig. 1: Comparison of SystemV runlevels with systemd targets and target aliases.

Each target has a set of dependencies described in its configuration file. systemd starts the
required dependencies, which are the services required to run the Linux host at a specific

20

level of functionality. When all of the dependencies listed in the target configuration files are
loaded and running, the system is running at that target level. If you want, you can review the
systemd startup sequence and runtime targets in the first article in this series, Learning to
love systemd.

Exploring the current target
Many Linux distributions default to installing a GUI desktop interface so that the installed
systems can be used as workstations. I always install from a Fedora Live boot USB drive with
an Xfce or LXDE desktop. Even when installing a server or other infrastructure type of host
(such as the ones I use for routers and firewalls), I use one of these installations that installs a
GUI desktop.
I could install a server without a desktop (and that would be typical for data centers), but that
does not meet my needs. It is not that I need the GUI desktop itself, but the LXDE installation
includes many of the other tools I use that are not in a default server installation. This means
less work for me after the initial installation.
But just because I have a GUI desktop does not mean it makes sense to use it. I have a 16-port
KVM that I can use to access the KVM interfaces of most of my Linux systems, but the vast
majority of my interaction with them is via a remote SSH connection from my primary
workstation. This way is more secure and uses fewer system resources to run multiuser.target compared to graphical.target.
To begin, check the default target to verify that it is the graphical.target:

Now verify the currently running target. It should be the same as the default target. You can
still use the old method, which displays the old SystemV runlevels. Note that the previous
runlevel is on the left; it is N (which means None), indicating that the runlevel has not changed
since the host was booted. The number 5 indicates the current target, as defined in the old
SystemV terminology:
N 5

Note that the runlevel man page indicates that runlevels are obsolete and provides a
conversion table.

21

You can also use the systemd method. There is no one-line answer here, but it does provide
the answer in systemd terms:
ACTIVE SUB
basic.target
loaded active active Basic System
cryptsetup.target
loaded active active Local Encrypted Volumes
getty.target
loaded active active Login Prompts
loaded active active Graphical Interface
local-fs-pre.target
loaded active active Local File Systems (Pre)
local-fs.target
loaded active active Local File Systems
loaded active active Multi-User System
network-online.target loaded active active Network is Online
network.target
loaded active active Network
nfs-client.target
loaded active active NFS client services
nss-user-lookup.target loaded active active User and Group Name Lookups
paths.target
loaded active active Paths
remote-fs-pre.target
loaded active active Remote File Systems (Pre)
remote-fs.target
loaded active active Remote File Systems
rpc_pipefs.target
loaded active active rpc_pipefs.target
slices.target
loaded active active Slices
sockets.target
loaded active active Sockets
sshd-keygen.target
loaded active active sshd-keygen.target
swap.target
loaded active active Swap
sysinit.target
loaded active active System Initialization
timers.target
loaded active active Timers
= Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
= The low-level unit activation state, values depend on unit type.
21 loaded units listed. Pass --all to see loaded but inactive units, too.
To show all installed unit files use 'systemctl list-unit-files'.

This shows all of the currently loaded and active targets. You can also see the
graphical.target and the multi-user.target. The multi-user.target is required before the
graphical.target can be loaded. In this example, the graphical.target is active.

## Switching to a different target
Making the switch to the multi-user.target is easy:

22

The display now changes from the GUI desktop or login screen to a virtual console. Log in and
list the currently active systemd units to verify that graphical.target is no longer running:

Be sure to use the runlevel command to verify that it shows both previous and current
"runlevels":
5 3

Changing the default target
Now, change the default target to the multi-user.target so that it will always boot into the
multi-user.target for a console command-line interface rather than a GUI desktop interface.
As the root user on your test host, change to the directory where the systemd configuration is
maintained and do a quick listing:
drwxr-xr-x. 2 root root 4096 Apr 25 2018
<snip>
lrwxrwxrwx. 1 root root
36 Aug 13 16:23
/lib/systemd/system/graphical.target
lrwxrwxrwx. 1 root root
39 Apr 25 2018
/usr/lib/systemd/system/lightdm.service
drwxr-xr-x. 2 root root 4096 Apr 25 2018
drwxr-xr-x. 2 root root 4096 Aug 18 10:16
drwxr-xr-x. 2 root root 4096 Apr 25 2018
drwxr-xr-x. 2 root root 4096 Oct 30 16:54

## basic.target.wants
default.target ->
display-manager.service ->
getty.target.wants
graphical.target.wants
local-fs.target.wants
multi-user.target.wants

I shortened this listing to highlight a few important things that will help explain how systemd
manages the boot process. You should be able to see the entire list of directories and links on
your virtual machine.
The default.target entry is a symbolic link (symlink, soft link) to the directory
/lib/systemd/system/graphical.target. List that directory to see what else is there:

23

You see files, directories, and more links in this listing, but look specifically for multiuser.target and graphical.target. Now display the contents of default.target, which is a
link to /lib/systemd/system/graphical.target:
Description=Graphical Interface
Requires=multi-user.target
Wants=display-manager.service
After=multi-user.target rescue.service rescue.target display-manager.service

This link to the graphical.target file describes all of the prerequisites and requirements that
the graphical user interface requires. I explore these options later in this book.
To enable the host to boot to multi-user mode, delete the existing link and create a new one
that points to the correct target:

List the default.target link to verify that it links to the correct file:
lrwxrwxrwx 1 root root 37 Nov 28 16:08 default.target ->
/lib/systemd/system/multi-user.target

If your link does not look exactly like this, delete it and try again. List the content of the
default.target link:

24

systemd is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or
(at your option) any later version.

## Description=Multi-User System
Requires=basic.target
After=basic.target rescue.service rescue.target

The default.target—which is really a link to the multi-user.target at this point—now has
different requirements in the [Unit] section. It does not require the graphical display
manager.
Reboot. Your virtual machine should boot to the console login for virtual console 1, which is
identified on the display as tty1. Now that you know how to change the default target, change
it back to the graphical.target using a command designed for the purpose.
First, check the current default target:
Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target →
/usr/lib/systemd/system/graphical.target

Enter the following command to go directly to the graphical.target and the display manager
login page without having to reboot:

I do not know why the term "isolate" was chosen for this sub-command by systemd's
developers. My research indicates that it may refer to running the specified target but
"isolating" and terminating all other targets that are not required to support the target.
However, the effect is to switch targets from one run target to another—in this case, from the
multi-user target to the graphical target. The command above is equivalent to the old init 5
command in SystemV start scripts and the init program.
Log into the GUI desktop, and verify that it's working.

25

## Using the systemctl command to manage
systemd units
In the previous chapters, I explored the Linux systemd startup sequence. In the first, I looked
at systemd's functions and architecture and the controversy around its role as a replacement
for the old SystemV init program and startup scripts. And in the second, I examined two
important systemd tools, systemctl and journalctl, and explained how to switch from one
target to another and to change the default target.
In this chapter, I look at systemd units in more detail, and how to use the systemctl command
to explore and manage units. I also explain how to stop and disable units and how to create a
new systemd mount unit to mount a new filesystem and enable it to initiate during startup.

Preparation
All of the experiments in this chapter should be done as the root user (unless otherwise
specified). Some of the commands that simply list various systemd units can be performed by
non-root users, but the commands that make changes cannot. Make sure to do all of these
experiments only on non-production hosts or virtual machines (VMs).
One of these experiments requires the sysstat package, so install it before you move on. For
Fedora and other Red Hat-based distributions you can install sysstat with:
dnf -y install sysstat

The sysstat RPM installs several statistical tools that can be used for problem determination.
One is System Activity Report (SAR), which records many system performance data points at
regular intervals (every 10 minutes by default). Rather than run as a daemon in the
background, the sysstat package installs two systemd timers. One timer runs every 10 minutes
to collect data, and the other runs once a day to aggregate the daily data. In this article, I will
look briefly at these timers but wait to explain how to create a timer in a future article.

26

systemd suite
The fact is, systemd is more than just one program. It is a large suite of programs all designed
to work together to manage nearly every aspect of a running Linux system. A full exposition of
systemd would take a book on its own. Most of us do not need to understand all of the details
about how all of systemd's components fit together, so I will focus on the programs and
components that enable you to manage various Linux services and deal with log files and
journals.

## Practical structure
The structure of systemd—outside of its executable files—is contained in its many
configuration files. Although these files have different names and identifier extensions, they
are all called "unit" files. Units are the basis of everything systemd.
Unit files are ASCII plain-text files that are accessible to and can be created or modified by a
sysadmin. There are a number of unit file types, and each has its own man page. Figure 1 lists
some of these unit file types by their filename extensions and a short description of each.
systemd unit

.automount The .automount units are used to implement on-demand (i.e., plug and play) and
mounting of filesystem units in parallel during startup.
.device

The .device unit files define hardware and virtual devices that are exposed to the
sysadmin in the /dev/directory. Not all devices have unit files; typically, block
devices such as hard drives, network devices, and some others have unit files.

## .mount

The .mount unit defines a mount point on the Linux filesystem directory structure.

## .scope

The .scope unit defines and manages a set of system processes. This unit is not
configured using unit files, rather it is created programmatically. Per the
systemd.scope man page, “The main purpose of scope units is grouping worker
processes of a system service for organization and for managing resources.”

## .service

The .service unit files define processes that are managed by systemd. These include
services such as crond cups (Common Unix Printing System), iptables, multiple logical
volume management (LVM) services, NetworkManager, and more.

## .slice

The .slice unit defines a “slice,” which is a conceptual division of system resources that
are related to a group of processes. You can think of all system resources as a pie and
this subset of resources as a “slice” out of that pie.

## .socket

## The .socket units define interprocess communication sockets, such as network
sockets.

## .swap

The .swap units define swap devices or files.

27

## .target

The .target units define groups of unit files that define startup synchronization
points, runlevels, and services. Target units define the services and other units that
must be active in order to start successfully.

## .timer

The .timer unit defines timers that can initiate program execution at specified times.

## Fig. 1: Some systemd unit file types

systemctl
The systemctl command is used to start and stop services, configure them to launch (or not)
at system startup, and monitor the current status of running services.
In a terminal session with root priviledges, list all of the loaded and active systemd units.
systemctl automatically pipes its stdout data stream through the less pager, so you don't
have to:
ACTIVE SUB
proc-sys-fs-binfmt_misc.automount
loaded active running
Arbitrary
Executable File>
sys-devices-pci0000:00-0000:00:01.1-ata7-host6-target6:0:0-6:0:0:0-blocksr0.device loaded a>
sys-devices-pci0000:00-0000:00:03.0-net-enp0s3.device loaded active plugged
82540EM Gigabi>
sys-devices-pci0000:00-0000:00:05.0-sound-card0.device loaded active plugged
82801AA AC'97>
sys-devices-pci0000:00-0000:00:08.0-net-enp0s8.device loaded active plugged
82540EM Gigabi>
sys-devices-pci0000:00-0000:00:0d.0-ata1-host0-target0:0:0-0:0:0:0-block-sdasda1.device loa>
sys-devices-pci0000:00-0000:00:0d.0-ata1-host0-target0:0:0-0:0:0:0-block-sdasda2.device loa>
= Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
= The low-level unit activation state, values depend on unit type.
206 loaded units listed. Pass --all to see loaded but inactive units, too.
To show all installed unit files use 'systemctl list-unit-files'.

As you scroll through the data in your terminal session, look for some specific things. The first
section lists devices such as hard drives, sound cards, network interface cards, and TTY
devices. Another section shows the filesystem mount points. Other sections include various
services and a list of all loaded and active targets.

28

The sysstat timers at the bottom of the output are used to collect and generate daily system
activity summaries for SAR. SAR is a very useful problem-solving tool. (You can learn more
about it in Chapter 13 of my book Using and Administering Linux: Volume 1, Zero to SysAdmin:
Getting Started.)
Near the very bottom, three lines describe the meanings of the statuses (loaded, active, and
sub). Press q to exit the pager.
Use the following command (as suggested in the last line of the output above) to see all the
units that are installed, whether or not they are loaded. I won't reproduce the output here,
because you can scroll through it on your own. The systemctl program has an excellent tabcompletion facility that makes it easy to enter complex commands without needing to
memorize all the options:

You can see that some units are disabled. Table 1 in the man page for systemctl lists and
provides short descriptions of the entries you might see in this listing. Use the -t (type)
option to view just the timer units:
UNIT FILE
STATE
chrony-dnssrv@.timer
dnf-makecache.timer
fstrim.timer
logrotate.timer
logwatch.timer
mdadm-last-resort@.timer
mlocate-updatedb.timer
sysstat-collect.timer
sysstat-summary.timer
systemd-tmpfiles-clean.timer static
unbound-anchor.timer

You can do the same thing with this alternative, which provides considerably more detail:
Thu 2020-04-16 09:06:20 EDT 3min 59s left n/a
systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Thu 2020-04-16 10:02:01 EDT 59min left
Thu 2020-04-16 09:01:32 EDT
dnf-makecache.timer
dnf-makecache.service
Thu 2020-04-16 13:00:00 EDT 3h 57min left n/a
sysstat-collect.timer
sysstat-collect.service

## 49s ago

29

## Fri 2020-04-17 00:00:00 EDT
left mlocate-updatedb.timer
Fri 2020-04-17 00:00:00 EDT
left unbound-anchor.timer
Fri 2020-04-17 00:07:00 EDT
sysstat-summary.timer

## 14h left
Thu 2020-04-16 12:51:37 EDT
mlocate-updatedb.service
14h left
Thu 2020-04-16 12:51:37 EDT
unbound-anchor.service
15h left
sysstat-summary.service

## 3h 49min
3h 49min

6 timers listed.
Pass --all to see loaded but inactive timers, too.

Although there is no option to do systemctl list-mounts, you can list the mount point unit files:
UNIT FILE
STATE
-.mount
boot.mount
dev-hugepages.mount
dev-mqueue.mount
home.mount
proc-fs-nfsd.mount
proc-sys-fs-binfmt_misc.mount disabled
run-vmblock\x2dfuse.mount
sys-fs-fuse-connections.mount static
sys-kernel-config.mount
sys-kernel-debug.mount
tmp.mount
usr.mount
var-lib-nfs-rpc_pipefs.mount static
var.mount
15 unit files listed.

The STATE column in this data stream is interesting and requires a bit of explanation. The
"generated" states indicate that the mount unit was generated on the fly during startup using
the information in /etc/fstab. The program that generates these mount units is
/lib/systemd/system-generators/systemd-fstab-generator, along with other tools
that generate a number of other unit types. The "static" mount units are for filesystems like
/proc and /sys, and the files for these are located in the /usr/lib/systemd/system
directory.
Now look at the service units. This command will show all services installed on the host,
whether or not they are active:

30

The bottom of this listing of service units displays 166 as the total number of loaded units on
my host. Your number will probably differ.
Unit files do not have a filename extension (such as .unit) to help identify them, so you can
generalize that most configuration files that belong to systemd are unit files of one type or
another. The few remaining files are mostly .conf files located in /etc/systemd.
Unit files are stored in the /usr/lib/systemd directory and its subdirectories, while the
/etc/systemd/ directory and its subdirectories contain symbolic links to the unit files
necessary to the local configuration of this host.
To explore this, change directory to /etc/systemd and list its contents. Then change
directory to /etc/systemd/system and list its contents.
Take a look at the default.target file, which determines which runlevel target the system will
boot to. In the second article in this series, I explained how to change the default target from
the GUI (graphical.target) to the command-line only (multi-user.target) target. The
default.target file on my test VM is simply a symlink to
/usr/lib/systemd/system/graphical.target.
Examine the contents of the /etc/systemd/system/default.target file:
Description=Graphical Interface
Requires=multi-user.target
Wants=display-manager.service
After=multi-user.target rescue.service rescue.target display-manager.service

Note that this requires the multi-user.target; the graphical.target cannot start if the
multi-user.target is not already up and running. It also says it "wants" the displaymanager.service unit. A "want" does not need to be fulfilled in order for the unit to start

31

successfully. If the "want" cannot be fulfilled, it will be ignored by systemd, and the rest of the
target will start regardless.
The subdirectories in /etc/systemd/system are lists of wants for various targets. Explore
the files and their contents in the /etc/systemd/system/graphical.target.wants directory.
The systemd.unit man page contains a lot of good information about unit files, their
structure, the sections they can be divided into, and the options that can be used. It also lists
many of the unit types, all of which have their own man pages. If you want to interpret a unit
file, this would be a good place to start.

Service units
A Fedora installation usually installs and enables services that particular hosts do not need for
normal operation. Conversely, sometimes it doesn't include services that need to be installed,
enabled, and started. Services that are not needed for the Linux host to function as desired,
but which are installed and possibly running, represent a security risk and should—at minimum
—be stopped and disabled and—at best—should be uninstalled.
The systemctl command is used to manage systemd units, including services, targets,
mounts, and more. Take a closer look at the list of services to identify services that will never
be used:
<snip>
chronyd.service
crond.service
cups.service
dbus-daemon.service
Bus
- ip6tables.service
- ipset.service
- iptables.service
firewalld.service
firewall daemon
- ntpd.service
- ntpdate.service
pcscd.service
Daemon

## ACTIVE SUB

## NTP client/server
Command Scheduler
CUPS Scheduler
D-Bus System Message

## ip6tables.service
ipset.service
iptables.service

## firewalld - dynamic

## active

## running

## ntpd.service
ntpdate.service
active
running PC/SC Smart Card

32

I have pruned out most of the output from the command to save space. The services that
show "loaded active running" are obvious. The "not-found" services are ones that systemd is
aware of but are not installed on the Linux host. If you want to run those services, you must
install the packages that contain them.
Note the pcscd.service unit. This is the PC/SC smart-card daemon. Its function is to
communicate with smart-card readers. Many Linux hosts—including VMs—have no need for
this reader nor the service that is loaded and taking up memory and CPU resources. You can
stop this service and disable it, so it will not restart on the next boot. First, check its status:
- pcscd.service - PC/SC Smart Card Daemon
Loaded: loaded (/usr/lib/systemd/system/pcscd.service; indirect; vendor
Active: active (running) since Fri 2019-05-10 11:28:42 EDT; 3 days ago
Docs: man:pcscd(8)
Main PID: 24706 (pcscd)
Tasks: 6 (limit: 4694)
Memory: 1.6M
CGroup: /system.slice/pcscd.service
└─24706 /usr/sbin/pcscd --foreground --auto-exit
May 10 11:28:42 testvm1 systemd[1]: Started PC/SC Smart Card Daemon.

This data illustrates the additional information systemd provides versus SystemV, which only
reports whether or not the service is running. Note that specifying the .service unit type is
optional. Now stop and disable the service, then re-check its status:
Warning: Stopping pcscd.service, but it can still be activated by:
pcscd.socket
Removed /etc/systemd/system/sockets.target.wants/pcscd.socket.
- pcscd.service - PC/SC Smart Card Daemon
Loaded: loaded (/usr/lib/systemd/system/pcscd.service; indirect;...)
Active: failed (Result: exit-code) since Mon 2019-05-13 15:23:15 EDT; 48s ago
Main PID: 24706 (code=exited, status=1/FAILURE)
May 10 11:28:42 testvm1 systemd[1]: Started PC/SC Smart Card Daemon.
May 13 15:23:15 testvm1 systemd[1]: Stopping PC/SC Smart Card Daemon...
May 13 15:23:15 testvm1 systemd[1]: pcscd.service: Main process exited,
code=exited, status=1/FAIL>
May 13 15:23:15 testvm1 systemd[1]: pcscd.service: Failed with 'exit-code'.
May 13 15:23:15 testvm1 systemd[1]: Stopped PC/SC Smart Card Daemon.

33

The short log entry display for most services prevents having to search through various log
files to locate this type of information. Check the status of the system runlevel targets—
specifying the "target" unit type is required:
- multi-user.target - Multi-User System
Loaded: loaded (/usr/lib/systemd/system/multi-user.target; static; vendor
Active: active since Thu 2019-05-09 13:27:22 EDT; 4 days ago
Docs: man:systemd.special(7)
May 09 13:27:22 testvm1 systemd[1]: Reached target Multi-User System.
- graphical.target - Graphical Interface
Loaded: loaded (/usr/lib/systemd/system/graphical.target; indirect; vendor
Active: active since Thu 2019-05-09 13:27:22 EDT; 4 days ago
Docs: man:systemd.special(7)
May 09 13:27:22 testvm1 systemd[1]: Reached target Graphical Interface.
- graphical.target - Graphical Interface
Loaded: loaded (/usr/lib/systemd/system/graphical.target; indirect; vendor
Active: active since Thu 2019-05-09 13:27:22 EDT; 4 days ago
Docs: man:systemd.special(7)
May 09 13:27:22 testvm1 systemd[1]: Reached target Graphical Interface.

The default target is the graphical target. The status of any unit can be checked in this way.

Mounts the old way
A mount unit defines all of the parameters required to mount a filesystem on a designated
mount point. systemd can manage mount units with more flexibility than those using the
/etc/fstab filesystem configuration file. Despite this, systemd still uses the /etc/fstab file
for filesystem configuration and mounting purposes. systemd uses the systemd-fstabgenerator tool to create transient mount units from the data in the fstab file.
I will create a new filesystem and a systemd mount unit to mount it. If you have some available
disk space on your test system, you can do it along with me.
Note that the volume group and logical volume names may be different on your test system.
Be sure to use the names that are pertinent to your system.

34

You need to create a partition or logical volume, then make an EXT4 filesystem on it. Add a
label to the filesystem, TestFS, and create a directory for a mount point /TestFS.
To try this on your own, first, verify that you have free space on the volume group. Here is
what that looks like on my VM where I have some space available on the volume group to
create a new logical volume:
NAME
sda
├─sda1
└─sda2
├─VG01-home 253:3
20G 0 lvm /home
└─VG01-tmp 253:5
sr0
VG
#PV #LV #SN Attr
VSize
VFree
VG01
1
0 wz--n- <116.00g <23.00g

Then create a new volume on VG01 named TestFS. It does not need to be large; 1GB is fine.
Then create a filesystem, add the filesystem label, and create the mount point:
Logical volume "TestFS" created.
mke2fs 1.45.3 (14-Jul-2019)
Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: 8718fba9-419f-4915-ab2d-8edf811b5d23
Superblock backups stored on blocks:
32768, 98304, 163840, 229376
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done

Mount the new filesystem (it fails, but try it anyway):
mount: /TestFS/: can't find in /etc/fstab.

35

Mounting the volume doesn't work, because you don't have an entry in /etc/fstab. You can
mount the new filesystem even without the entry in /etc/fstab using both the device name
(as it appears in /dev) and the mount point. Mounting in this manner is simpler than it used to
be—it used to require the filesystem type as an argument. The mount command is now smart
enough to detect the filesystem type and mount it accordingly.
Try it again:
NAME
sda
├─sda1
└─sda2
├─VG01-root
253:0
├─VG01-swap
253:1
├─VG01-usr
253:2
├─VG01-home
253:3
20G 0 lvm /home
├─VG01-var
253:4
├─VG01-tmp
253:5
└─VG01-TestFS 253:6
1G 0 lvm /TestFS
sr0

Now the new filesystem is mounted in the proper location. List the mount unit files:

This command does not show a file for the /TestFS filesystem because no file exists for it.
The command systemctl status TestFS.mount does not display any information about the
new filesystem either. You can try it using wildcards with the systemctl status command:
- usr.mount - /usr
Loaded: loaded (/etc/fstab; generated)
Active: active (mounted)
Where: /usr
What: /dev/mapper/VG01-usr
Docs: man:fstab(5)
man:systemd-fstab-generator(8)
- TestFS.mount - /TestFS
Loaded: loaded (/proc/self/mountinfo)
Active: active (mounted) since Fri 2020-04-17 16:02:26 EDT; 1min 18s ago

36

## ● run-user-0.mount - /run/user/0
Loaded: loaded (/proc/self/mountinfo)
Active: active (mounted) since Thu 2020-04-16 08:52:29 EDT; 1 day 5h ago
Where: /run/user/0
What: tmpfs
- var.mount - /var
Loaded: loaded (/etc/fstab; generated)
Active: active (mounted) since Thu 2020-04-16 12:51:34 EDT; 1 day 1h ago
Where: /var
What: /dev/mapper/VG01-var
Docs: man:fstab(5)
man:systemd-fstab-generator(8)
Tasks: 0 (limit: 19166)
Memory: 212.0K
CPU: 5ms
CGroup: /system.slice/var.mount

This command provides some very interesting information about your system's mounts, and
your new filesystem shows up. The /var and /usr filesystems are identified as being
generated from /etc/fstab, while your new filesystem simply shows that it is loaded and
provides the location of the info file in the /proc/self/mountinfo file.
Next, automate this mount. First, do it the old-fashioned way by adding an entry in
/etc/fstab. Later, I'll show you how to do it the new way, which will teach you about creating
units and integrating them into the startup sequence.
Unmount /TestFS and add the following line to the /etc/fstab file:
/dev/mapper/VG01-TestFS

## /TestFS

## ext4

## defaults

1 2

Now, mount the filesystem with the simpler mount command and list the mount units again:
- TestFS.mount - /TestFS
Loaded: loaded (/proc/self/mountinfo)
Active: active (mounted) since Fri 2020-04-17 16:26:44 EDT; 1min 14s ago

37

This did not change the information for this mount because the filesystem was manually
mounted. Reboot and run the command again, and this time specify TestFS.mount rather
than using the wildcard. The results for this mount are now consistent with it being mounted
at startup:
- TestFS.mount - /TestFS
Loaded: loaded (/etc/fstab; generated)
Active: active (mounted) since Fri 2020-04-17 16:30:21 EDT; 1min 38s ago
Docs: man:fstab(5)
man:systemd-fstab-generator(8)
Tasks: 0 (limit: 19166)
Memory: 72.0K
CPU: 6ms
CGroup: /system.slice/TestFS.mount
Apr 17 16:30:21 testvm1 systemd[1]: Mounting /TestFS...
Apr 17 16:30:21 testvm1 systemd[1]: Mounted /TestFS.

Creating a mount unit
Mount units may be configured either with the traditional /etc/fstab file or with systemd
units. Fedora uses the fstab file as it is created during the installation. However, systemd uses
the systemd-fstab-generator program to translate the fstab file into systemd units for
each entry in the fstab file. Now that you know you can use systemd .mount unit files for
filesystem mounting, try it out by creating a mount unit for this filesystem.
First, unmount /TestFS. Edit the /etc/fstab file and delete or comment out the TestFS line.
Now, create a new file with the name TestFS.mount in the /etc/systemd/system directory.
Edit it to contain the configuration data below. The unit file name and the name of the mount
point must be identical, or the mount will fail:
Description=TestFS Mount
[Mount]

38

## What=/dev/mapper/VG01-TestFS
Where=/TestFS
Type=ext4
Options=defaults

The Description line in the [Unit] section is for us humans, and it provides the name that's
shown when you list mount units with systemctl -t mount. The data in the [Mount] section
of this file contains essentially the same data that would be found in the fstab file.
Now enable the mount unit:
Created symlink /etc/systemd/system/multi-user.target.wants/TestFS.mount →
/etc/systemd/system/TestFS.mount.

This creates the symlink in the /etc/systemd/system directory, which will cause this mount
unit to be mounted on all subsequent boots. The filesystem has not yet been mounted, so you
must "start" it:

Verify that the filesystem has been mounted:
- TestFS.mount - TestFS Mount
Loaded: loaded (/etc/systemd/system/TestFS.mount; enabled; vendor preset:
Active: active (mounted) since Sat 2020-04-18 09:59:53 EDT; 14s ago
Tasks: 0 (limit: 19166)
Memory: 76.0K
CPU: 3ms
CGroup: /system.slice/TestFS.mount
Apr 18 09:59:53 testvm1 systemd[1]: Mounting TestFS Mount...
Apr 18 09:59:53 testvm1 systemd[1]: Mounted TestFS Mount.

This experiment has been specifically about creating a unit file for a mount, but it can be
applied to other types of unit files as well. The details will be different, but the concepts are
the same. Yes, I know it is still easier to add a line to the /etc/fstab file than it is to create a

39

mount unit. But this is a good example of how to create a unit file because systemd does not
have generators for every type of unit.

In summary
This article looked at systemd units in more detail and how to use the systemctl command to
explore and manage units. It also showed how to stop and disable units and create a new
systemd mount unit to mount a new filesystem and enable it to initiate during startup.

40

## Start using systemd as a
troubleshooting tool
No one would really consider systemd to be a troubleshooting tool, but when I encountered a
problem on my webserver, my growing knowledge of systemd and some of its features helped
me locate and circumvent the problem.
The problem was that my server, yorktown, which provides name services, DHCP, NTP,
HTTPD, and SendMail email services for my home office network, failed to start the Apache
HTTPD daemon during normal startup. I had to start it manually after I realized that it was not
running. The problem had been going on for some time, and I recently got around to trying to
fix it.
Some of you will say that systemd itself is the cause of this problem, and, based on what I
know now, I agree with you. However, I had similar types of problems with SystemV. (In the
first article in this series, I looked at the controversy around systemd as a replacement for the
old SystemV init program and startup scripts.
No software is perfect, and neither systemd nor SystemV is an exception, but systemd
provides far more information for problem-solving than SystemV ever offered.

Determining the problem
The first step to finding the source of this problem is to determine the httpd service's status:
- httpd.service - The Apache HTTP Server
Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset:
Active: failed (Result: exit-code) since Thu 2020-04-16 11:54:37; 15min ago
Docs: man:httpd.service(8)
Process: 1101 ExecStart=/usr/sbin/httpd $OPTIONS -DFOREGROUND (code=exited,
status=1/FAILURE)

41

## Main PID: 1101 (code=exited, status=1/FAILURE)
Status: "Reading configuration..."
CPU: 60ms
Apr 16 11:54:35 yorktown.both.org systemd[1]: Starting The Apache HTTP Server...
Apr 16 11:54:37 yorktown.both.org httpd[1101]: (99)Cannot assign requested
address: AH00072: make_sock: could not bind to address 192.168.0.52:80
Apr 16 11:54:37 yorktown.both.org httpd[1101]: no listening sockets available,
shutting down
Apr 16 11:54:37 yorktown.both.org httpd[1101]: AH00015: Unable to open logs
Apr 16 11:54:37 yorktown.both.org systemd[1]: httpd.service: Main process exited,
code=exited, status=1/FAILURE
Apr 16 11:54:37 yorktown.both.org systemd[1]: httpd.service: Failed with result
'exit-code'.
Apr 16 11:54:37 yorktown.both.org systemd[1]: Failed to start The Apache HTTP
Server.

This status information is one of the systemd features that I find much more useful than
anything SystemV offers. The amount of helpful information here leads me easily to a logical
conclusion that takes me in the right direction. All I ever got from the old chkconfig
command is whether or not the service is running and the process ID (PID) if it is. That isn't
very helpful.
The key entry in this status report shows that HTTPD cannot bind to the IP address, which
means it cannot accept incoming requests. This indicates that the network is not starting fast
enough to be ready for the HTTPD service to bind to the IP address because the IP address
has not yet been set. This is not supposed to happen, so I explored my network service
systemd startup configuration files; all appeared to be correct with the right "after" and
"requires" statements. Here is the /lib/systemd/system/httpd.service file from my server:

## Environment=OPTIONS=-DMY_DEFINE

## Description=The Apache HTTP Server
Wants=httpd-init.service
After=network.target remote-fs.target nss-lookup.target httpd-init.service
Documentation=man:httpd.service(8)

42

## Type=notify
Environment=LANG=C
ExecStart=/usr/sbin/httpd $OPTIONS -DFOREGROUND
ExecReload=/usr/sbin/httpd $OPTIONS -k graceful
KillSignal=SIGWINCH
KillMode=mixed
PrivateTmp=true

The httpd.service unit file explicitly specifies that it should load after the network.target
and the httpd-init.service (among others). I tried to find all of these services using the
systemctl list-units command and searching for them in the resulting data stream. All were
present and should have ensured that the httpd service did not load before the network IP
address was set.

First solution
A bit of searching on the internet confirmed that others had encountered similar problems
with httpd and other services. This appears to happen because one of the required services
indicates to systemd that it has finished its startup—but it actually spins off a child process
that has not finished. After a bit more searching, I came up with a circumvention.
I could not figure out why the IP address was taking so long to be assigned to the network
interface card. So, I thought that if I could delay the start of the HTTPD service by a
reasonable amount of time, the IP address would be assigned by that time.
Fortunately, the /lib/systemd/system/httpd.service file above provides some direction.
Although it says not to alter it, it does indicate how to proceed: Use the command systemctl
edit httpd, which automatically creates a new file
(/etc/systemd/system/httpd.service.d/override.conf) and opens the GNU Nano editor.
(If you are not familiar with Nano, be sure to look at the hints at the bottom of the Nano
interface.)
Add the following text to the new file and save it:

43

## # ll
total 4
-rw-r--r-- 1 root root 243 Apr 16 11:43 override.conf
[root@yorktown httpd.service.d]# cat override.conf
ExecStartPre=/bin/sleep 30

The [Service] section of this override file contains a single line that delays the start of the
HTTPD service by 30 seconds. The following status command shows the service status during
the wait time:
- httpd.service - The Apache HTTP Server
Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset:
Drop-In: /etc/systemd/system/httpd.service.d
└─override.conf
/usr/lib/systemd/system/httpd.service.d
└─php-fpm.conf
Active: activating (start-pre) since Thu 2020-04-16 12:14:29 EDT; 28s ago
Docs: man:httpd.service(8)
Cntrl PID: 1102 (sleep)
Tasks: 1 (limit: 38363)
Memory: 260.0K
CPU: 2ms
CGroup: /system.slice/httpd.service
└─1102 /bin/sleep 30
Apr 16 12:14:29 yorktown.both.org systemd[1]: Starting The Apache HTTP Server...
Apr 16 12:15:01 yorktown.both.org systemd[1]: Started The Apache HTTP Server.

And this command shows the status of the HTTPD service after the 30-second delay expires.
The service is up and running correctly:
- httpd.service - The Apache HTTP Server
Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset:
Drop-In: /etc/systemd/system/httpd.service.d
└─override.conf
/usr/lib/systemd/system/httpd.service.d

44

## └─php-fpm.conf
Active: active (running) since Thu 2020-04-16 12:15:01 EDT; 1min 18s ago
Docs: man:httpd.service(8)
Process: 1102 ExecStartPre=/bin/sleep 30 (code=exited, status=0/SUCCESS)
Main PID: 1567 (httpd)
Status: "Total requests: 0; Idle/Busy workers 100/0;Requests/sec: 0; Bytes
served/sec:
0 B/sec"
Tasks: 213 (limit: 38363)
Memory: 21.8M
CPU: 82ms
CGroup: /system.slice/httpd.service
├─1567 /usr/sbin/httpd -DFOREGROUND
├─1569 /usr/sbin/httpd -DFOREGROUND
├─1570 /usr/sbin/httpd -DFOREGROUND
├─1571 /usr/sbin/httpd -DFOREGROUND
└─1572 /usr/sbin/httpd -DFOREGROUND
Apr 16 12:14:29 yorktown.both.org systemd[1]: Starting The Apache HTTP Server...
Apr 16 12:15:01 yorktown.both.org systemd[1]: Started The Apache HTTP Server.

I could have experimented to see if a shorter delay would work as well, but my system is not
that critical, so I decided not to. It works reliably as it is, so I am happy.
Because I gathered all this information, I reported it to Red Hat Bugzilla as Bug 1825554. I
believe that it is much more productive to report bugs than it is to complain about them.

The better solution
A couple of days after reporting this as a bug, I received a response indicating that systemd is
just the manager, and if httpd needs to be ordered after some requirements are met, it needs
to be expressed in the unit file. The response pointed me to the httpd.service man page. I
wish I had found this earlier because it is a better solution than the one I came up with. This
solution is explicitly targeted to the prerequisite target unit rather than a somewhat random
delay.
From the httpd.service man page:
Starting the service at boot time
The httpd.service and httpd.socket units are disabled by default. To start the httpd
service at boot time, run: systemctl enable httpd.service. In the default
configuration, the httpd daemon will accept connections on port 80 (and, if

45

mod_ssl is installed, TLS connections on port 443) for any configured IPv4 or IPv6
address.
If httpd is configured to depend on any specific IP address (for example, with a
"Listen" directive) which may only become available during start-up, or if httpd
depends on other services (such as a database daemon), the service must be
configured to ensure correct start-up ordering.
For example, to ensure httpd is only running after all configured network interfaces
are configured, create a drop-in file (as described above) with the following
section:
After=network-online.target
Wants=network-online.target
I still think this is a bug because it is quite common—at least in my experience—to use a Listen
directive in the httpd.conf configuration file. I have always used Listen directives, even on
hosts with only a single IP address, and it is clearly necessary on hosts with multiple network
interface cards (NICs) and internet protocol (IP) addresses. Adding the lines above to the
/usr/lib/systemd/system/httpd.service default file would not cause problems for
configurations that do not use a Listen directive, and prevents this problem for those that do.
In the meantime, I will use the suggested solution.

Next steps
This article describes a problem I had with starting the Apache HTTPD service on my server. It
leads you through the problem determination steps I took and shows how I used systemd to
assist. I also covered the circumvention I implemented using systemd and the better solution
that followed from my bug report.
It's likely that this is the result of a problem with systemd, specifically the configuration for
httpd startup. Nevertheless, systemd provided me with the tools to locate the likely source of
the problem and to formulate and implement a circumvention. Neither solution really resolves
the problem to my satisfaction.
One of the things I discovered during this is process is that I need to learn more about
defining the sequences in which things start!

46

Manage startup using systemd
While setting up a Linux system recently, I wanted to know how to ensure that dependencies
for services and other units were up and running before those dependent services and units
start. Specifically, I needed more knowledge of how systemd manages the startup sequence,
especially in determining the order services are started in what is essentially a parallel system.
You may know that SystemV (systemd's predecessor) orders the startup sequence by naming
the startup scripts with an SXX prefix, where XX is a number from 00 to 99. SystemV then
uses the sort order by name and runs each start script in sequence for the desired runlevel.
But systemd uses unit files, which can be created or modified by a sysadmin, to define
subroutines for not only initialization but also for regular operation. In the third article in this
series, I explained how to create a mount unit file. In this fifth article, I demonstrate how to
create a different type of unit file—a service unit file that runs a program at startup. You can
also change certain configuration settings in the unit file and use the systemd journal to view
the location of your changes in the startup sequence.

Preparation
Make sure you have removed rhgb and quiet from the GRUB_CMDLINE_LINUX= line in the
/etc/default/grub file. This enables you to observe the Linux startup message stream,
which you'll need for some of the experiments in this article.

The program
In this tutorial, you will create a simple program that enables you to observe a message during
startup on the console and later in the systemd journal.
Create the shell program /usr/local/bin/hello.sh and add the following content. You
want to ensure that the result is visible during startup and that you can easily find it when
looking through the systemd journal. You will use a version of the "Hello world" program with

47

some bars around it, so it stands out. Make sure the file is executable and has user and group
ownership by root with 700 permissions for security:
#!/usr/bin/bash
echo "######### Hello World! ########"

Run this program from the command line to verify that it works correctly:
######### Hello World! ########

This program could be created in any scripting or compiled language. The hello.sh program
could also be located in other places based on the Linux filesystem hierarchical structure
(FHS). I place it in the /usr/local/bin directory so that it can be easily run from the
command line without having to prepend a path when I type the command. I find that many of
the shell programs I create need to be run from the command line and by other tools such as
systemd.
