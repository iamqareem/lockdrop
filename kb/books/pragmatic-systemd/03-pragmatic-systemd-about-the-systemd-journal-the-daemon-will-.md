---
id: pragmatic-systemd-03
title: "Pragmatic systemd — About the systemd journal, The daemon will implicitly collect…",
slug: pragmatic-systemd-03-pragmatic-systemd-about-the-systemd-journal-the-daemon-will-
source: "Pragmatic systemd",
sourceSection: "About the systemd journal, The daemon will implicitly collect numerous metadata fields for each log messages, Configuration changes, About journalctl, • short-monotonic: Very similar to the default but shows monotonic timestamps, -6 6e94...7fa4 Sat 2020-07-04 07:33:25 EDT—Sat 2020-07-04 07:58:59 EDT"
track: linux-engineer,
tier: free
tags: [linux, systemd, services, init, production]
summary: "The systemd journaling service is implemented by the systemd-journald daemon. Covers 51 sections: About the systemd journal, The daemon will implicitly collect numerous metadata fields for each log messages, Configurat.",
---
# Pragmatic systemd — About the systemd journal, The daemon will implicitly collect…

## About the systemd journal
The systemd journaling service is implemented by the systemd-journald daemon.
According to the systemd-journald man page:
systemd-journald is a system service that collects and stores logging data. It
creates and maintains structured, indexed journals based on logging information
that is received from a variety of sources:
- Kernel log messages, via kmsg
- Simple system log messages, via the libc syslog(3) call
- Structured system log messages via the native Journal API, see
sd_journal_print(3)
- Standard output and standard error of service units. For further details see
below.
- Audit records, originating from the kernel audit subsystem

92

## The daemon will implicitly collect numerous metadata fields for each log messages
in a secure and unfakeable way. See systemd.journal-fields(7) for more information
about the collected metadata.
Log data collected by the journal is primarily text-based but can also include binary
data where necessary. Individual fields making up a log record stored in the journal
may be up to 2^64-1 bytes in size.

## Configuration changes
The systemd journal daemon can be configured using the /etc/systemd/journald.conf
file. For many hosts, this file does not need any changes because the defaults are quite
reasonable. Look at your journald.conf file now, if you have not already.
The most common configuration changes you might consider would specify the maximum
journal file size, the number of older journal files, and the maximum file-retention times. The
primary reason to make those changes would be to reduce the storage space used by the
journal if you have a small storage device. In a mission-critical environment, you may also want
to reduce the amount of time between syncing journal data stored in RAM memory to the
storage device.
The journald.conf man page has more details.

Controversies about the data format
One of the controversies surrounding systemd is the binary format in which the journal
contents are stored. Some arguments against systemd are based on the systemd journal
being stored in a binary format. This would seem to be contrary to the Unix/Linux philosophy
to use ASCII text for data, which is one argument people use to justify their dislike of systemd.
For example, Doug McIlroy, the inventor of the pipes, said:
"This is the Unix Philosophy: Write programs that do one thing well. Write programs
to work together. Write programs to handle text steams, because that is a universal
interface." —Doug McIlroy, quoted in Eric S. Raymond's book The Art of Unix
Programming
However, these arguments seem to be based on at least a partial misconception because the
man page clearly states that the data "is primarily text-based," although it allows for binary
data forms. Linux kernel creator Linus Torvalds, who is always clear about his feelings, said:

93

"I don't actually have any particularly strong opinions on systemd itself. I've had
issues with some of the core developers that I think are much too cavalier about
bugs and compatibility, and I think some of the design details are insane (I dislike
the binary logs, for example), but those are details, not big issues." —Linus Torvalds,
quoted in ZDNet's "Linus Torvalds and others on Linux's systemd" in 2014
The systemd journal files are stored in one or more subdirectories of /var/log/journal.
Log into a test system where you have root access, and make /var/log/journal the
present working directory (PWD). List the subdirectories there, choose one, and make it the
PWD. You can look at these files in a number of ways. I started with the stat command (note
that the journal file names on your host will be different from mine):
File: system@7ed846aadf1743139083681ec4042037-00000000000000010005a99c0280fd5f.journal
Size: 8388608
Blocks: 16392
IO Block: 4096
regular file
Device: fd04h/64772d
Inode: 524384
Links: 1
Access: (0640/-rw-r-----) Uid: (
0/
root)
Gid: ( 190/systemd-journal)
Access: 2020-07-13 08:30:05.764291231 -0400
Modify: 2020-07-04 07:33:52.916001110 -0400
Change: 2020-07-04 07:33:52.916001110 -0400
Birth: -

The journal file is identified as a "regular" file, which is not especially helpful. The file
command identifies it as a "journal" file, but you already know that. Look inside the file with
the dd command. The following command sends the output data stream to STDOUT; you
may want to pipe it through the less pager:
9�P1�8��9_SOURCE_MONOTONIC_TIMESTAMP=191726���/��P����9MESSAGE=Inode-cache hash
table entries: 1048576 (order: 11, 8388608 bytes, linear)�hx
9�P1�p�9��/
��P�b������9��9_SOURCE_MONOTONIC_TIMESTAMP=191825�pdXY�7p�9��9MESSAGE=mem autoinit: stack:off, heap alloc:off, heap free:off�i��
��(n�O���@Y�
�����Zս���82���7X�8�������8��ǱR�����8<~B�4�<�
�8tM˞8$����8��Ж��h9�&������9�����`@�9�pdXY�7b ͺ
���WV��9��9_SOURCE_MONOTONIC_TIM
ESTAMP=234745����4�h@�9��9MESSAGE=Memory: 12598028K/12963384K available (14339K
kernel code, 2406K rwdata, 8164K rodata, 2468K init, 5072K b
ss, 365356K reserved, 0K cma-reserved)�j����(n�O���@Y�
����]��m�82���7X�8�������8��ǱR�����8<~B�4�<�
�8tM˞8$����8��Ж��h9�&�����9 ͺ
���WV��9���

94

4�hbB���a��^��9��9_SOURCE_MONOTONIC_TIMESTAMP=234758��3�����9��9MESSAGE=random:
get_random_u64 called from __kmem_cache_create+0x3e/0x610 wi
th crng_init=0�k���(n�O���@Y�
����j������82���7X��8C�X�Y"��8�������8��ǱR�����8<~B�4�<�
�8tM˞8$����8��Ж�à�9B���a���9�3���b�8�ȭ�����9h�9_SO�9h�9MESSAGE=SLUB: HWalign=64,
Order=0-3, MinObjects=0, CPUs=4, Nodes=1�l����(n�O���@Y�
������z��X�82���7X�8�������8��ǱR�����8<~B�4�<� �8tM˞
b�(+I)�x�9�9_SOURCE_MONOTONIC_TIMESTAMP=235444r�%/p��9�9MESSAGE=Kernel/User page
tables isolation: enabled�m����(n�O���@Y�
����k��B0��8
2���7X�8�������8��ǱR�����8<~B�4�<�
�8tM˞8$����8��Ж��h9�&����8�9�(+I)Ҡ�9�%/pb8O{ W���8�9��9_SOURCE_MONOTONIC_TIMESTA
MP=235464u�N`�FP
M��9
��9MESSAGE=ftrace: allocating 41361 entries in 162 pages�n����(n�O���@Y�

Even this small portion of the data stream from the dd command shows an interesting mixture
of ASCII text and binary data. Another useful tool is the strings command, which simply
displays all the ASCII text strings contained in a file and ignores the binary data:
MESSAGE=Linux version 5.7.6-201.fc32.x86_64
(mockbuild@bkernel01.iad2.fedoraproject.org) (gcc version 10.1.1 20200507 (Red
Hat 10.1.1-1) (GC
C), GNU ld version 2.34-3.fc32) #1 SMP Mon Jun 29 15:15:52 UTC 2020
MESSAGE
_BOOT_ID=6e944f99ebd9405984090f829a927fa4
_BOOT_ID
_MACHINE_ID=3bccd1140fca488187f8a1439c832f07
_MACHINE_ID
_HOSTNAME=testvm1.both.org
_HOSTNAME
PRIORITY=6
MESSAGE=Command line: BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.7.6-201.fc32.x86_64
root=/dev/mapper/VG01-root ro resume=/dev/mapper/VG01-swap rd.lv
m.lv=VG01/root rd.lvm.lv=VG01/swap rd.lvm.lv=VG01/usr selinux=0
MESSAGE=x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
MESSAGE=x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'
MESSAGE=x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'
Z_g3;
MESSAGE=x86/fpu: Enabled xstate features 0x7, context size is 832 bytes, using
'standard' format.

95

This data can be interpreted by humans, and this particular segment looks very similar to the
output data stream from the dmesg command. I'll leave you to explore further on your own,
but my conclusion is that the journal files are clearly a mixture of binary and ASCII text. That
mix makes it cumbersome to use traditional text-based Linux tools to extract usable data. But
there is a better way that provides many possibilities for extracting and viewing journal data.

## About journalctl
The journalctl command is designed to extract usable information from the systemd
journals using powerful and flexible criteria for identifying the desired data. Previous articles in
this series have described journalctl, and there is more to know.
I'll review a bit first and start with some basics in case you have not read the previous articles
or just need a refresher.
You can use the journalctl command without any options or arguments to view the
systemd journal that contains all journal and log information:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Thu 2020-07-16 10:30:43 EDT.
-Jun 08 07:47:20 testvm1.both.org kernel: Linux version 5.6.6-300.fc32.x86_64
(mockbuild@bkernel03.phx2.fedoraproject.org) (gcc version 10.0>
Jun 08 07:47:20 testvm1.both.org kernel: Command line:
BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.6.6-300.fc32.x86_64 root=/dev/mapper/VG01-root
ro >
Jun 08 07:47:20 testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x001:
Jun 08 07:47:20 testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x002:
Jul 16 10:00:42 testvm1.both.org systemd[1]: sysstat-collect.service: Succeeded.
Jul 16 10:00:42 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=sysstat-collect comm="systemd>
Jul 16 10:00:42 testvm1.both.org systemd[1]: Finished system activity accounting
tool.
Jul 16 10:00:42 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=sysstat-collect comm="systemd">
Jul 16 10:01:01 testvm1.both.org CROND[378562]: (root) CMD (run-parts
/etc/cron.hourly)
Jul 16 10:01:01 testvm1.both.org run-parts[378565]: (/etc/cron.hourly) starting
0anacron

96

You can also explicitly show the same data the dmesg command presents. Open two terminal
sessions next to each other and issue the dmesg command in one and the following command
in the other:

The only difference you should see is the time format. The dmesg command is in a monotonic
format that shows the number of seconds since the system boot. The journalctl output is
in a date and time format. The short-monotonic option displays the time since boot:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Mon 2020-07-20 13:01:01 EDT.
-[
0.000000] testvm1.both.org kernel: Linux version 5.7.6-201.fc32.x86_64
(mockbuild@bkernel01.iad2.fedoraproject.org) (gcc version 10.1.>
0.000000] testvm1.both.org kernel: Command line:
BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.7.6-201.fc32.x86_64 root=/dev/mapper/VG01-root
ro r>
0.000000] testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x001:
0.000000] testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x002:
0.000000] testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x004:
'AVX registers'
0.000000] testvm1.both.org kernel: x86/fpu: xstate_offset[2]: 576,
xstate_sizes[2]: 256
0.000000] testvm1.both.org kernel: x86/fpu: Enabled xstate features 0x7,
context size is 832 bytes, using 'standard' format.
<snip>
0.000002] testvm1.both.org kernel: clocksource: kvm-clock: mask:
0xffffffffffffffff max_cycles: 0x1cd42e4dffb, max_idle_ns: 8815905914>
0.000005] testvm1.both.org kernel: tsc: Detected 2807.988 MHz processor
0.001157] testvm1.both.org kernel: e820: update [mem 0x00000000-0x00000fff]
usable ==> reserved
lines 624-681/681 (END)

The journalctl command has many options, including the -o (output) option with several
suboptions that allow you to select a time and date format that meets different sets of
requirements. I have listed most of them below, along with a short description that I expanded
or modified from the journalctl man page. Note that the primary difference between most
of these is the format of the date and time, and the other information remains the same.

97

journalctl time and date formats
- short: This is the default format and generates an output that is most closely like the
formatting of classic syslog files, showing one line per journal entry. This option shows
journal metadata including the monotonic time since boot, the fully qualified hostname,
and the unit name such as the kernel, DHCP, etc.
Jul 20 08:43:01 testvm1.both.org kernel: Inode-cache hash table entries:
1048576 (order: 11, 8388608 bytes, linear)

- short-full: This format is very similar to the default but shows timestamps in the
format the --since= and --until= options accept. Unlike the timestamp
information shown in short output mode, this mode includes weekday, year, and
timezone information in the output and is locale-independent.
Mon 2020-06-08 07:47:20 EDT testvm1.both.org kernel: x86/fpu: Supporting
XSAVE feature 0x004: 'AVX registers'

- short-iso: The short-iso format is very similar to the default, but shows ISO 8601
wallclock timestamps.
2020-06-08T07:47:20-0400 testvm1.both.org kernel: kvm-clock: Using msrs
4b564d01 and 4b564d00

- short-iso-precise: This format is the same as short-iso but includes full microsecond
precision.
2020-06-08T07:47:20.223738-0400 testvm1.both.org kernel: Booting
paravirtualized kernel on KVM

## • short-monotonic: Very similar to the default but shows monotonic timestamps
instead of wallclock timestamps.
2.091107] testvm1.both.org kernel: ata1.00: ATA-6: VBOX HARDDISK, 1.0,
max UDMA/133

- short-precise: This format is also similar to the default but shows classic syslog
timestamps with full microsecond precision.
Jun 08 07:47:20.223052 testvm1.both.org kernel: BIOS-e820: [mem
0x000000000009fc00-0x000000000009ffff] reserved

98

- short-unix: Like the default, but shows seconds passed since January 1, 1970, UTC
instead of wallclock timestamps ("Unix time"). The time is shown with microsecond
accuracy.
1591616840.232165 testvm1.both.org kernel: tcp_listen_portaddr_hash hash
table entries: 8192

- cat: Generates a very terse output only showing the message of each journal entry
with no metadata, not even a timestamp.
ohci-pci 0000:00:06.0: irq 22, io mem 0xf0804000

- verbose: This format shows the full data structure for all the entry items with all fields.
This is the format option that is most different from all the others.
Mon 2020-06-08 07:47:20.222969 EDT
[s=d52ddc9f3e8f434b9b9411be2ea50b1e;i=1;b=dcb6dcc0658e4a8d8c781c21a2c6360d;
m=242d7f;t=5a7912c6148f9;x=8f>
_SOURCE_MONOTONIC_TIMESTAMP=0
_TRANSPORT=kernel
PRIORITY=5
SYSLOG_FACILITY=0
SYSLOG_IDENTIFIER=kernel
MESSAGE=Linux version 5.6.6-300.fc32.x86_64
(mockbuild@bkernel03.phx2.fedoraproject.org) (gcc version 10.0.1 20200328
(Red Hat 10.0.1-0>
_BOOT_ID=dcb6dcc0658e4a8d8c781c21a2c6360d
_MACHINE_ID=3bccd1140fca488187f8a1439c832f07
_HOSTNAME=testvm1.both.org

Other choices, available with the -o option, allow exporting the data in various formats such
as binary or JSON. I also find the -x option illuminating because it can show additional
explanatory messages for some journal entries. If you try this option, be aware that it can
greatly increase the output data stream. For example, look at the additional information for an
entry like this:
4.503737] testvm1.both.org systemd[1]: Starting File System Check on
/dev/mapper/VG01-root...
4.691555] testvm1.both.org systemd-fsck[548]: root: clean, 1813/327680
files, 48555/1310720 blocks
4.933065] testvm1.both.org systemd[1]: Finished File System Check on
/dev/mapper/VG01-root.

99

That expands to:
4.503737] testvm1.both.org systemd[1]: Starting File System Check on
/dev/mapper/VG01-root...
-- Subject: A start job for unit systemd-fsck-root.service has begun execution
-- Defined-By: systemd
-- Support: https://lists.freedesktop.org/mailman/listinfo/systemd-devel
--- A start job for unit systemd-fsck-root.service has begun execution.
--- The job identifier is 36.
4.691555] testvm1.both.org systemd-fsck[548]: root: clean, 1813/327680
files, 48555/1310720 blocks
4.933065] testvm1.both.org systemd[1]: Finished File System Check on
/dev/mapper/VG01-root.
-- Subject: A start job for unit systemd-fsck-root.service has finished
successfully
-- Defined-By: systemd
-- Support: https://lists.freedesktop.org/mailman/listinfo/systemd-devel
--- A start job for unit systemd-fsck-root.service has finished successfully.
--- The job identifier is 36

There is some new information here, but I think the main benefit is that the information is
contextualized to clarify the original terse messages to some degree.

Narrowing the search
Most of the time, it is not necessary or even desirable to list all the journal entries and
manually search through them. Sometimes I look for entries related to a specific service, and
other times I look for entries that happened at specific times. The journalctl command
provides powerful options that allow you to see only the data you are interested in finding.
Start with the --list-boots option, which lists all the boots during the time period when
journal entries exist. Note that the journalctl.conf file may specify that journal entries
are discarded after they reach a certain age or after the storage device (HDD/SSD) space
taken by the journals reaches a specified maximum amount:
-10 dcb6...360d Mon 2020-06-08 07:47:20 EDT—Mon 2020-06-08 07:53:05 EDT
-9 7d61...c2a4 Fri 2020-07-03 15:50:06 EDT—Fri 2020-07-03 18:21:23 EDT
-8 1b3a...2206 Fri 2020-07-03 18:21:58 EDT—Fri 2020-07-03 22:10:54 EDT
-7 5fef...61ae Fri 2020-07-03 22:18:41 EDT—Sat 2020-07-04 06:50:19 EDT

100

## -6 6e94...7fa4 Sat 2020-07-04 07:33:25 EDT—Sat 2020-07-04 07:58:59 EDT
-5 ec8b...32959 Sat 2020-07-04 08:12:06 EDT—Sat 2020-07-04 09:12:47 EDT
-4 cb17...9a99 Sat 2020-07-04 10:19:53 EDT—Sat 2020-07-04 11:31:03 EDT
-3 4fe3...dbb0 Sat 2020-07-04 07:59:58 EDT—Sun 2020-07-05 09:39:30 EDT
-2 06fb...446c Mon 2020-07-06 06:27:05 EDT—Mon 2020-07-13 08:50:06 EDT
-1 33db...ac37 Mon 2020-07-13 04:50:33 EDT—Thu 2020-07-16 13:49:32 EDT
0 75c9...ee50 Mon 2020-07-20 08:43:01 EDT—Fri 2020-07-24 12:44:06 EDT

The most recent boot ID appears at the bottom; it is the long, random hex number. You can
use this data to view the journals for a specific boot. This can be specified using the boot
offset number in the left-most column or the UUID in the second column. This command
displays the journal for the boot instance with the offset of -2—the second previous boot
from the current one:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Fri 2020-07-24 12:44:06 EDT.
-Jul 06 06:27:05 testvm1.both.org kernel: Linux version 5.7.6-201.fc32.x86_64
(mockbuild@bkernel01.iad2.fedoraproject.org) (gcc version 10.1>
Jul 06 06:27:05 testvm1.both.org kernel: Command line:
BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.7.6-201.fc32.x86_64 root=/dev/mapper/VG01-root
ro >
Jul 06 06:27:05 testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x001:
Jul 06 06:27:05 testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x002:
<SNIP>

Or you could use the UUID for the desired boot. The offset numbers change after each boot,
but the UUID does not:

The -u option allows you to select specific units to examine. You can use a unit name or a
pattern for matching, and you can use this option multiple times to match multiple units or
patterns. In this example, I used it in combination with -b to show chronyd journal entries for
the current boot:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Sun 2020-07-26 09:10:47 EDT.
-Jul 20 12:43:31 testvm1.both.org systemd[1]: Starting NTP client/server...

101

## Jul 20 12:43:31 testvm1.both.org chronyd[811]: chronyd version 3.5 starting
(+CMDMON +NTP +REFCLOCK +RTC +PRIVDROP +SCFILTER +SIGND +ASYNCD>
Jul 20 12:43:31 testvm1.both.org chronyd[811]: Frequency -0.021 +/- 0.560 ppm
read from /var/lib/chrony/drift
Jul 20 12:... chronyd[811]: Using right/UTC timezone to obtain leap second data
Jul 20 12:43:31 testvm1.both.org systemd[1]: Started NTP client/server.
Jul 20 12:44:00 testvm1.both.org chronyd[811]: Selected source 192.168.0.52
Jul 20 12:44:00 testvm1.both.org chronyd[811]: System clock TAI offset set to 37s
Jul 20 12:44:00 testvm1.both.org chronyd[811]: System clock wrong by 1.412227
seconds, adjustment started
Jul 20 12:44:01 testvm1.both.org chronyd[811]: System clock was stepped by
1.412227 seconds

Suppose you want to look at events that were recorded between two arbitrary times. You can
also use -S (--since) and -U (--until) to specify the beginning and ending times. The
following command displays journal entries starting at 15:36:00 on July 24, 2020, through the
current time:

And this command displays all journal entries starting at 15:36:00 on July 24, 2020, until
16:00:00 on July 25:

This command combines -S, -U, and -u to give journal entries for the NetworkManager
service unit starting at 15:36:00 on July 24, 2020, until 16:00:00 on July 25:

Some syslog facilities, such as cron, auth, mail, daemon, user, and more, can be viewed with
the --facility option. You can use --facility=help to list the available facilities. In this
example, the mail facility is not the Sendmail service that would be used for an email service,
but the local client used by Linux to send email to root as event notifications. Sendmail
actually has two parts, the server, which (for Fedora and related distributions) is not installed
by default, and the client, which is always installed so that it can be used to deliver system
emails to local recipients, especially root:

102

The journalctl man page lists all the options that can be used to narrow searches. The
table below summarizes some of the options I use most frequently. Most of these options can
be used in various combinations to further narrow a search.

## Options to narrow searches of the journal
Option

## --list-boots

This displays a list of boots. The information can be used to show
journal entries only for a particular boot.

## -b [offset|boot ID]

## This specifies which boot to display information for. It includes all
journal entries from that boot through shutdown or reboot.

## --facility=[facility
name]

This specifies the facility names as they're known to syslog. Use -facility=help to list the valid facility names.

## -k, --dmesg

## These display only kernel messages and are equivalent to using the
dmesg command.

## -S, --since
[timestamp]

These show all journal entries since (after) the specified time. They
can be used with --until to display an arbitrary range of time. Fuzzy
times such as "yesterday" and "2 hours ago"—with quotes—are also
allowed.

## -u [unit name]

The -u option allows you to select specific units to examine. You can
use a unit name or a pattern for matching. This option can be used
multiple times to match multiple units or patterns.

## -U, --until
[timestamp]

These show all journal entries until (prior to) the specified time. They
can be used with --since to display an arbitrary range of time. Fuzzy
times such as "yesterday" and "2 hours ago"—with quotes—are also
allowed.

Other interesting options
The journalctl program offers some other interesting options, as well. These are useful for
refining the data search, specifying how the journal data is displayed, and managing the
journal files.
Option

## -f, --follow

## This journalctl option is similar to using the tail -f command. It
shows the most recent entries in the journal that match whatever
other options have been specified and also displays new entries
as they occur. This can be useful when watching for events and

103

when testing changes.
-e, --pager-end

The -e option displays the end of the data stream instead of the
beginning. This does not reverse the order of the data stream,
rather it causes the pager to jump to the end.

## --file [journal filename]

## This names a specific journal file in /var/log/journal/<journal
subdirectory>.

## -r, --reverse

## This option reverses the order of the journal entries in the pager
so that the newest are at the top rather than the bottom.

## -n, --lines=[X]

This shows the most recent X number of lines from the journal.

## --utc

This displays times in UTC rather than local time.

## -g, --grep=[REGEX]

I like the -g option because it enables me to search for specific
patterns in the journal data stream. This is just like piping a text
data stream through the grep command. This option uses Perlcompatible regular expressions.

## --disk-usage

## This option displays the amount of disk storage used by the
current and archived journals. It might not be as much as you
think.

## --flush

Journal data stored in the virtual filesystem /run/log/journal/,
which is volatile storage, is written to /var/log/journal/ which is
persistent storage. This option ensures that all data is flushed
to /run/log/journal/ at the time it returns.

## --sync

## This writes all unwritten journal entries (still in RAM but not in
/run/log/journal) to the persistent filesystem. All journal entries
known to the journaling system at the time the command is
entered are moved to persistent storage.

--vacuum-size= -These can be used singly or in combination to remove the oldest
vacuum-time= --vacuum- archived journal files until the specified condition is met. These
files=
options only consider archived files, and not active files, so the
result might not be exactly what was specified.

Journal files
If you have not already, be sure to list the files in the journal directory on your host. Remember
that the name of the directory containing the journal files is a long, random number. This
directory contains multiple active and archived journal files, including some for users:
[root@david ad8f29ed15044f8ba0458c846300c2a4]# ll
total 352308

104

## -rw-r-----+ 1 root systemd-journal 33554432 May 28 13:07
system@0c91aaef57c441859ea5e421edff6528-0000000000000001-0005a6703120d448.journal
-rw-r-----+ 1 root systemd-journal 109051904 Jun 23 21:24
system@0c91aaef57c441859ea5e421edff6528-0000000000008238-0005a6b85e4e03c6.journal
-rw-r-----+ 1 root systemd-journal 100663296 Jul 21 18:39
system@0c91aaef57c441859ea5e421edff6528-0000000000021f3e-0005a8ca55efa66a.journal
-rw-r-----+ 1 root systemd-journal 41943040 Jul 30 09:34 system.journal
-rw-r-----+ 1 root systemd-journal
8388608 May 28 13:07 user1000@037bcc7935234a5ea243b3af304fd08a-0000000000000c45-0005a6705ac48a3c.journal
-rw-r-----+ 1 root systemd-journal 16777216 Jun 23 21:24 user1000@bc90cea5294447fba2c867dfe40530db-0000000000008266-0005a6b85e910761.journal
-rw-r-----+ 1 root systemd-journal 41943040 Jul 21 16:08 user1000@bc90cea5294447fba2c867dfe40530db-0000000000021f4b-0005a8ca68c83ab7.journal
-rw-r-----+ 1 root systemd-journal
8388608 Jul 30 09:34 user-1000.journal
[root@david ad8f29ed15044f8ba0458c846300c2a4]#

You can see the user files in this listing for the user ID (UID) 1000, which is my Linux account.
The --files option allows me to see the content of specified files, including the user files:
Jul 29 14:13:32 david.both.org tumblerd[145509]: Registered thumbnailer
/usr/bin/gdk-pixbuf-thumbnailer -s %s %u %o
Jul 29 14:13:32 david.both.org Thunar[2788]: ThunarThumbnailer: got 0 handle
(Queue)
Jul 29 14:13:32 david.both.org Thunar[2788]: ThunarThumbnailer: got 0 handle
(Error or Ready)
Jul 29 14:13:32 david.both.org Thunar[2788]: ThunarThumbnailer: got 0 handle
(Finished)
Jul 29 14:15:33 david.both.org tumblerd[145552]: error: Broken zip file structure
Jul 29 14:20:34 david.both.org systemd[2466]: dbus-:1.2org.freedesktop.thumbnails.Thumbnailer1@11.service: Succeeded.
Jul 29 14:34:17 david.both.org systemd[2466]: Starting Cleanup of User's
Temporary Files and Directories...
Jul 29 14:34:17 david.both.org systemd[2466]: systemd-tmpfiles-clean.service:
Succeeded.
Jul 29 14:34:17 david.both.org systemd[2466]: Finished Cleanup of User's
Temporary Files and Directories.
Jul 29 14:48:26 david.both.org systemd[2466]: Started dbus-:1.2org.freedesktop.thumbnails.Thumbnailer1@12.service.
Jul 29 14:48:26 david.both.org tumblerd[145875]: Registered thumbnailer gsfoffice-thumbnailer -i %i -o %o -s %s

This output shows, among other things, temporary file cleanup for the UID1000 user. Data
relating to individual users may be helpful in locating the root cause of problems originating in

105

user space. I found a number of interesting entries in this output. Try it on your host and see
what you find.

Adding journal entries
It can be useful to add your own entries to the journal. This is accomplished with the
systemd-cat program that allows piping the STDOUT of a command or program to the
journal. This command can be used as part of a pipeline on the command line or in a script:
Jul 27 09:01:01...both.org CROND[9742]: (root) CMD (run-parts /etc/cron.hourly)
Jul 27 09:01:01...both.org run-parts[...]: (/etc/cron.hourly) starting 0anacron
Jul 27 09:01:01...both.org run-parts[451]: (/etc/cron.hourly) finished 0anacron
Jul 27 09:07:53 testvm1.both.org unknown[976501]: Hello world
Jul 27 09:10:47...both.org systemd[1]: Starting system activity accounting
tool...
Jul 27 09:10:47 testvm1.both.org systemd[1]: sysstat-collect.service: Succeeded.
Jul 27 09:10:47...both.org systemd[1]: Finished system activity accounting tool.
Jul 27 09:10:47 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=sysstat-collect comm="systemd"
exe="/usr/lib/syst>
Jul 27 09:10:47 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=sysstat-collect comm="systemd"
exe="/usr/lib/syste>
Jul 27 09:17:10 testvm1.both.org myprog[976516]: Hello world

The -p option specifies a priority, emerg, alert, crit, err, warning, notice, info, debug, or a value
between 0 and 7 that represents each of those named levels. These priority values are the
same as those defined by syslog(3). The default is info. The -t option is an identifier, which
can be any arbitrary short string, such as a program or script name. This string can be used for
searches by the journalctl command:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Mon 2020-07-27 09:21:57 EDT.
-Jul 27 09:17:10 testvm1.both.org myprog[976516]: Hello world

Journal management
I use the --disk-usage option to check on journal sizes, along with other commands
relating to disk usage, to ensure that my /var filesystem is not filling up:

106

Archived and active journals take up 136.0M in the file system.

The disk usage for the journals on the testvm1 host is about 136MB. The result on my primary
workstation is 328MB, and the host I use for my firewall and router uses 2.8GB for the
journals. Journal sizes depend greatly on the host's use and daily run time. My physical hosts
all run 24x7.
The /etc/systemd/journald.conf file can be used to configure the journal file sizes,
rotation, and retention times to meet any needs not met by the default settings. You can also
configure the journal storage location—you can specify a directory on the storage device or
whether to store everything in RAM, which is volatile storage. If the journals are stored in
RAM, they will not be persistent between boots.
The default time unit in the journald.conf file is seconds, but it can be overridden using
the suffixes year, month, week, day, h, or m.
Suppose you want to limit the total amount of storage space allocated to journal files to 1GB,
store all journal entries in persistent storage, keep a maximum of 10 files, and delete any
journal archive files that are more than a month old. You can configure this in
/etc/systemd/journald.conf using:
SystemMaxUse=1G
Storage=persistent
SystemMaxFiles=10
MaxRetentionSec=1month

By default, the SystemMaxUse is 10% of available disk space. The default settings have been
fine for the systems I work with, and I have not needed to change any of them. The
journald.conf man page states that the time-based settings for specifying how long to
store journal entries in a single file or to retain older files are normally not necessary. This is
because file number and size configurations usually force rotation and deletion of old files
before any time settings might be needed.
The SystemKeepFree option ensures a specific amount of space is kept free for other data.
Many databases and application programs use the /var filesystem to store data, so ensuring
enough available storage space may be critical in systems with smaller hard drives and
minimum space allocated to /var.
If you make changes to this configuration, be sure to monitor the results carefully for an
appropriate period of time to ensure they are performing as expected.

107

Journal file rotation
The journal files are typically rotated automatically based upon the configuration in the
/etc/systemd/journald.conf file. Files are rotated whenever one of the specified
conditions is met. So if, for example, the space allocated to journal files is exceeded, the
oldest file(s) is deleted, the active file is made into an archive, and a new active file is created.
Journal files can also be rotated manually. I suggest using the --flush option to ensure
current data is moved to persistent storage before you run the command:

There is another way to purge old journal files without performing a file rotation. The
vacuum-size=, vacuum-files=, and vacuum-time= commands can be used to delete
old archive files down to a specified total size, number of files, or prior time. The option values
consider only the archive files and not the active ones, so the resulting reduction in total file
size might be somewhat less than expected.
The following command purges old archive files so that only ones that are less than one
month old are left. You can use the s, m, h, days, months, weeks, and years suffixes:

This command deletes all archive files except for the four most recent ones. If there are fewer
than four archive files, nothing will happen, and the original number of files remains:

This last vacuum command deletes archive files until 200MB or less of archived files are left:

Only complete files are deleted. The vacuum commands do not truncate archive files to meet
the specification. They also work only on archive files, not active ones.

This article looked at using the journalctl command to extract various types of data from
the systemd journal in different formats. It also explored managing journal files and how to
add entries to the log from commands and scripts.

108

The systemd journal system provides a significant amount of metadata and context for entries
compared to the old syslogd program. This additional data and the context available from the
other journal entries around the time of an incident can help the sysadmin locate and resolve
problems much faster than having to search multiple syslog files.
In my opinion, the journalctl command meets the Unix philosophy that programs should
do one thing and do it well. The only thing journalctl does is extract data from the journal
and provide many options for selecting and formatting that data. At about 85K, it is not very
big. Of course, that does not include shared libraries, but those are, by definition, shared with
other programs.
You should now have enough information to use the systemd journal more effectively. If you
would like to know more than what I covered here, look in the man pages for journalctl and
systemd-cat.

109

Resolve systemd-resolved nameservice failures with Ansible
Most people tend to take name services for granted. They are necessary to convert humanreadable names, such as www.example.com, into IP addresses, like 93.184.216.34. It is
easier for humans to recognize and remember names than IP addresses, and name services
allow us to use names, and they also convert them to IP addresses for us.
The Domain Name System (DNS) is the global distributed database that maintains the data
required to perform these lookups and reverse lookups, in which the IP address is known and
the domain name is needed.
I installed Fedora 33 the first day it became available in October 2020. One of the major
changes was a migration from the ancient Name Service Switch (NSS) resolver to systemdresolved. Unfortunately, after everything was up and running, I couldn't connect to or even
ping any of the hosts on my network by name, although using IP addresses did work.

The problem
I run my own name server using BIND on my network server, and all has been good for over 20
years. I've configured my DHCP server to provide the IP address of my name server to every
workstation connected to my network, and that (along with a couple of backup name servers)
is stored in /etc/resolv.conf.
Michael Catanzaro describes how systemd-resolved is supposed to work, but the introduction
of systemd-resolved caused various strange resolution problems on my network hosts. The
symptoms varied depending upon the host's purpose. The trouble mostly presented as an
inability to find IP addresses for hosts inside the network on most systems. On other systems,
it failed to resolve any names at all. For example, even though nslookup sometimes returned
the correct IP addresses for hosts inside and outside networks, ping would not contact the

110

designated host, nor could I SSH to that same host. Most of the time, neither the lookup, the
ping, nor SSH would work unless I used the IP address in the command.
The new resolver allegedly has four operational modes, described in this Fedora Magazine
article. None of the options seems to work correctly when the network has its own name
server designed to perform lookups for internal and external hosts.
In theory, systemd-resolved is supposed to fix some corner issues around the NSS resolver
failing to use the correct name server when a host is connected to a VPN, which has become
a common problem with so many more people working from home.
The new resolver is supposed to use the fact that /etc/resolv.conf is now a symlink to
determine how it is supposed to work based on which resolve file it is linked to. systemdresolved's man page includes details about this behavior. The man page says that setting
/etc/resolv.conf as a symlink to /run/systemd/resolve/resolv.conf should
cause the new resolver to work the same way the old one does, but that didn't work for me.

My fix
I have seen many options on the internet for resolving this problem, but the only thing that
works reliably for me is to stop and disable the new resolver. First, I deleted the existing link
for resolv.conf, copied my preferred resolv.conf file to
/run/NetworkManager/resolv.conf, and added a new link to that file in /etc:

These commands stop and disable the systemd-resolved service:
Removed /etc/systemd/system/multi-user.target.wants/systemd-resolved.service.
Removed /etc/systemd/system/dbus-org.freedesktop.resolve1.service.

There's no reboot required. The old resolver takes over, and name services work as expected.

Make it easy with Ansible
I set up this Ansible playbook to make the necessary changes if I install a new host or an
update that reverts the resolver to systemd-resolved, or if an upgrade to the next release of

111

Fedora reverts the resolver. The resolv.conf file you want for your network should be
located in /root/ansible/resolver/files/:
################################################################################
--- name: Revert to old NSS resolver and disable the systemd-resolved service
hosts: all_by_IP
################################################################################
tasks:
- name: Copy resolv.conf for my network
copy:
src: /root/ansible/resolver/files/resolv.conf
dest: /run/NetworkManager/resolv.conf
mode: 0644
owner: root
group: root
- name: Delete existing /etc/resolv.conf file or link
file:
path: /etc/resolv.conf
state: absent
- name: Create link from /etc/resolv.conf to /run/NetworkManager/resolv.conf
file:
src: /run/NetworkManager/resolv.conf
dest: /etc/resolv.conf
state: link
- name: Stop and disable systemd-resolved
systemd:
name: systemd-resolved
state: stopped
enabled: no

Whichever Ansible inventory you use must have a group that uses IP addresses instead of
hostnames. This command runs the playbook and specifies the name of the inventory file I
use for hosts by IP address:

112

Sometimes the best answer to a tech problem is to fall back to what you know. When
systemd-resolved is more robust, I'll likely give it another try, but for now I'm glad that open
source infrastructure allows me to quickly identify and resolve network problems. Using
Ansible to automate the process is a much appreciated bonus. The important lesson here is to
do your research when troubleshooting, and to never be afraid to void your warranty.

113

## Analyze Linux startup
performance
Part of the system administrator's job is to analyze the performance of systems and to find
and resolve problems that cause poor performance and long startup times. Sysadmins also
need to check other aspects of systemd configuration and usage.
The systemd init system provides the systemd-analyze tool that can help uncover
performance problems and other important systemd information. In a previous chapter, I used
systemd-analyze to analyze timestamps and timespans in systemd timers, but this tool has
many other uses, some of which I explore in this article.

Startup overview
The Linux startup sequence is a good place to begin exploring because many systemdanalyze tool functions are targeted at startup. But first, it is important to understand the
difference between boot and startup. The boot sequence starts with the BIOS power-on self
test (POST) and ends when the kernel is finished loading and takes control of the host
system, which is the beginning of startup and the point when the systemd journal begins.
Earlier in this book, I discussed startup in more detail with respect to what happens and in
what sequence. In this article, I want to examine the startup sequence to look at the amount
of time it takes to go through startup and which tasks take the most time.
The results I'll show below are from my primary workstation, which is much more interesting
than a virtual machine's results. This workstation consists of an ASUS TUF X299 Mark 2
motherboard, an Intel i9-7960X CPU with 16 cores and 32 CPUs (threads), and 64GB of
RAM. Some of the commands below can be run by a non-root user, but I will use root in this
article to prevent having to switch between users.

114

There are several options for examining the startup sequence. The simplest form of the
systemd-analyze command displays an overview of the amount of time spent in each of
the main sections of startup, the kernel startup, loading and running initrd (i.e., initial
ramdisk, a temporary system image that is used to initialize some hardware and mount the /
[root] filesystem), and userspace (where all the programs and daemons required to bring the
host up to a usable state are loaded). If no subcommand is passed to the command,
systemd-analyze time is implied:
Startup finished in 53.921s (firmware) + 2.643s (loader) + 2.236s (kernel) +
4.348s (initrd) + 10.082s (userspace) = 1min 13.233s
graphical.target reached after 10.071s in userspace

The most notable data in this output is the amount of time spent in firmware (BIOS): almost
54 seconds. This is an extraordinary amount of time, and none of my other physical systems
take anywhere near as long to get through BIOS.
My System76 Oryx Pro laptop spends only 8.506 seconds in BIOS, and all of my home-built
systems take a bit less than 10 seconds. After some online searches, I found that this
motherboard is known for its inordinately long BIOS boot time. My motherboard never "just
boots." It always hangs, and I need to do a power off/on cycle, and then BIOS starts with an
error, and I need to press F1 to enter BIOS configuration, from where I can select the boot
drive and finish the boot. This is where the extra time comes from.
Not all hosts show firmware data. My unscientific experiments lead me to believe that this
data is shown only for Intel generation 9 processors or above. But that could be incorrect.
This overview of the boot startup process is interesting and provides good (though limited)
information, but there is much more information available about startup, as I'll describe below.

Assigning blame
You can use systemd-analyze blame to discover which systemd units take the most time
to initialize. The results are displayed in order by the amount of time they take to initialize,
from most to least:
5.417s NetworkManager-wait-online.service
3.423s dracut-initqueue.service
2.715s systemd-udev-settle.service
2.519s fstrim.service
1.275s udisks2.service

115

## 1.271s smartd.service
996ms upower.service
637ms lvm2-monitor.service
533ms lvm2-pvscan@8:17.service
520ms dmraid-activation.service
460ms vboxdrv.service
396ms initrd-switch-root.service
[...] # I removed lots of entries with increasingly small times

Because many of these services start in parallel, the numbers may add up to significantly
more than the total given by systemd-analyze time for everything after the BIOS. All of
these are small numbers, so I cannot find any significant savings here.
The data from this command can provide indications about which services you might consider
to improve boot times. Services that are not used can be disabled. There does not appear to
be any single service that is taking an excessively long time during this startup sequence. You
may see different results for each boot and startup.

Critical chains
Like the critical path in project management, a critical chain shows the time-critical chain of
events that take place during startup. These are the systemd units you want to look at if
startup is slow, as they are the ones that would cause delays. This tool does not display all the
units that start, only those in this critical chain of events:
The time when unit became active or started is printed after the "@" character.
The time the unit took to start is printed after the "+" character.
graphical.target @10.071s
└─lxdm.service @10.071s
└─plymouth-quit.service @10.047s +22ms
└─systemd-user-sessions.service @10.031s +7ms
└─remote-fs.target @10.026s
└─remote-fs-pre.target @10.025s
└─nfs-client.target @4.636s
└─gssproxy.service @4.607s +28ms
└─network.target @4.604s
└─NetworkManager.service @4.383s +219ms
└─dbus-broker.service @4.434s +136ms
└─dbus.socket @4.369s
└─sysinit.target @4.354s
└─systemd-update-utmp.service @4.345s +9ms
└─auditd.service @4.301s +42ms
└─systemd-tmpfiles-setup.service @4.254s +42ms

116

## └─import-state.service @4.233s +19ms
└─local-fs.target @4.229s
└─Virtual.mount @4.019s +209ms
└─systemd-fsck@dev-mapper-vg_david2\
x2dVirtual.service @3.742s +274ms
└─local-fs-pre.target @3.726s
└─lvm2-monitor.service @356ms +637ms
└─dm-event.socket @319ms
└─-.mount
└─system.slice
└─-.slice

The numbers preceded with @ show the absolute number of seconds since startup began
when the unit becomes active. The numbers preceded by + show the amount of time it takes
for the unit to start.

## System state
Sometimes you need to determine the system's current state. The systemd-analyze dump
command dumps a massive amount of data about the current system state. It starts with a list
of the primary boot timestamps, a list of each systemd unit, and a complete description of the
state of each:
Timestamp firmware: 1min 7.983523s
Timestamp loader: 3.872325s
Timestamp kernel: Wed 2020-08-26 12:33:35 EDT
Timestamp initrd: Wed 2020-08-26 12:33:38 EDT
Timestamp userspace: Wed 2020-08-26 12:33:42 EDT
Timestamp finish: Wed 2020-08-26 16:33:56 EDT
Timestamp security-start: Wed 2020-08-26 12:33:42 EDT
Timestamp security-finish: Wed 2020-08-26 12:33:42 EDT
Timestamp generators-start: Wed 2020-08-26 16:33:42 EDT
Timestamp generators-finish: Wed 2020-08-26 16:33:43 EDT
Timestamp units-load-start: Wed 2020-08-26 16:33:43 EDT
Timestamp units-load-finish: Wed 2020-08-26 16:33:43 EDT
Timestamp initrd-security-start: Wed 2020-08-26 12:33:38 EDT
Timestamp initrd-security-finish: Wed 2020-08-26 12:33:38 EDT
Timestamp initrd-generators-start: Wed 2020-08-26 12:33:38 EDT
Timestamp initrd-generators-finish: Wed 2020-08-26 12:33:38 EDT
Timestamp initrd-units-load-start: Wed 2020-08-26 12:33:38 EDT
Timestamp initrd-units-load-finish: Wed 2020-08-26 12:33:38 EDT
-> Unit system.slice:
Description: System Slice
Instance: n/a
Unit Load State: loaded

117

## Unit Active State: active
State Change Timestamp: Wed 2020-08-26 12:33:38 EDT
Inactive Exit Timestamp: Wed 2020-08-26 12:33:38 EDT
Active Enter Timestamp: Wed 2020-08-26 12:33:38 EDT
Active Exit Timestamp: n/a
Inactive Enter Timestamp: n/a
May GC: no
[...] # I've deleted a bazillion lines of output

On my main workstation, this command generated a stream of 49,680 lines and about
1.66MB. This command is very fast, so you don't need to wait for the results.
I do like the wealth of detail provided for the various connected devices, such as storage. Each
systemd unit has a section with details such as modes for various runtimes, cache, and log
directories, the command line used to start the unit, the process ID (PID), the start
timestamp, as well as memory and file limits.
The man page for systemd-analyze shows the systemd-analyze --user dump
option, which is intended to display information about the internal state of the user manager.
This fails for me, and internet searches indicate that there may be a problem with it. In
systemd, --user instances are used to manage and control the resources for the hierarchy of
processes belonging to each user. The processes for each user are part of a control group,
which I'll cover in a future article.

## Analytic graphs
Most pointy-haired-bosses (PHBs) and many good managers find pretty graphs easier to
read and understand than the text-based system performance data I usually prefer.
Sometimes, though, even I like a good graph, and systemd-analyze provides the capability
to display startup data in an SVG vector graphics chart.
The following command generates a vector graphics file that displays the events that take
place during boot and startup. It only takes a few seconds to generate this file:

This command creates an SVG, which is a text file that defines a series of graphic vectors that
applications, including Image Viewer, Ristretto, Okular, Eye of Mate, LibreOffice Draw, and
others, use to generate a graph. These applications process SVG files to create an image.

118

I used LibreOffice Draw to render a graph. The graph is huge, and you need to zoom in
considerably to make out any detail. Here is a small portion of it:

The bootup sequence is to the left of the zero (0) on the timeline in the graph, and the
startup sequence is to the right of zero. This small portion shows the kernel, initrd, and the
processes initrd started.
This graph shows at a glance what started when, how long it took to start up, and the major
dependencies. The critical path is highlighted in red.
Another command that generates graphical output is systemd-analyze dot. It generates
textual dependency graph descriptions in DOT format. The resulting data stream is then
piped through the dot utility, which is part of a family of programs that can be used to
generate vector graphic files from various types of data. These SVG files can also be
processed by the tools listed above.
First, generate the file. This took almost nine minutes on my primary workstation:
Color legend: black
= Requires

119

## dark blue = Requisite
dark grey = Wants
red
= Conflicts
green
= After
real
user
sys

## 8m37.544s
8m35.375s
0m0.070s

I won't reproduce the output here because the resulting graph is pretty much spaghetti. But
you should try it and view the result to see what I mean.

Conditionals
One of the more interesting, yet somewhat generic, capabilities I discovered while reading the
systemd-analyze(1) man page is the condition subcommand. (Yes—I do read the man
pages, and it is amazing what I have learned this way!) This condition subcommand can be
used to test the conditions and asserts that can be used in systemd unit files.
It can also be used in scripts to evaluate one or more conditions—it returns a zero (0) if all are
met or a one (1) if any condition is not met. In either case, it also spews text about its findings.
The example below, from the man page, is a bit complex. It tests for a kernel version between
4.0 and 5.1, that the host is running on AC power, that the system architecture is anything but
ARM, and that the directory /etc/os-release exists. I added the echo $? statement to
print the return code.
'ConditionKernelVersion = >=5.1' \
'ConditionACPower=|false' \
'ConditionArchitecture=|!arm' \
'AssertPathExists=/etc/os-release' ; \
echo $?
test.service: AssertPathExists=/etc/os-release succeeded.
Asserts succeeded.
test.service: ConditionArchitecture=|!arm succeeded.
test.service: ConditionACPower=|false failed.
test.service: ConditionKernelVersion=>=5.1 succeeded.
test.service: ConditionKernelVersion=!<4.0 succeeded.
Conditions succeeded.

The list of conditions and asserts starts around line 600 on the systemd.unit(5) man
page.

120

Listing configuration files
The systemd-analyze tool provides a way to send the contents of various configuration
files to STDOUT, as shown here. The base directory is /etc/:
Description=LXDM (Lightweight X11 Display Manager)
#Documentation=man:lxdm(8)
Conflicts=getty@tty1.service
After=systemd-user-sessions.service getty@tty1.service plymouth-quit.service
livesys-late.service
#Conflicts=plymouth-quit.service
ExecStart=/usr/sbin/lxdm
Restart=always
IgnoreSIGPIPE=no
#BusName=org.freedesktop.lxdm
Alias=display-manager.service

This is a lot of typing to do nothing more than a standard cat command does. I find the next
command a tiny bit helpful. It can search out files with the specified pattern within the
standard systemd locations:
Description=Perform system backups
Requires=backup.service
[Timer]
Unit=backup.service
OnCalendar=*-*-* 00:15:30
WantedBy=timers.target

## # /etc/systemd/system/backup.service

121

## # This service unit runs the rsbu backup program
Description=Backup services using rsbu
Wants=backup.timer
Environment="HOME=/root"
ExecStart=/usr/local/bin/rsbu -bvd1
ExecStart=/usr/local/bin/rsbu -buvd2

Both of these commands preface the contents of each file with a comment line containing the
file's full path and name.

Unit file verification
After creating a new unit file, it can be helpful to verify that its syntax is correct. This is what
the verify subcommand does. It can list directives that are spelled incorrectly and call out
missing service units:

Adhering to the Unix/Linux philosophy that "silence is golden," a lack of output messages
means that there are no errors in the scanned file.

Security
The security subcommand checks the security level of specified services. It only works on
service units and not on other types of unit files:
NAME
✗ PrivateNetwork=
to the host's network
✗ User=/DynamicUser=
root user

## Service has access

## Service runs as

122

## ✗ CapabilityBoundingSet=~CAP_SET(UID|GID|PCAP)
UID/GID identities/capabilities
✗ CapabilityBoundingSet=~CAP_SYS_ADMIN
administrator privileges
✗ CapabilityBoundingSet=~CAP_SYS_PTRACE
ptrace() debugging abilities
✗ RestrictAddressFamilies=~AF_(INET|INET6)
allocate Internet sockets
✗ RestrictNamespaces=~CLONE_NEWUSER
user namespaces
✗ RestrictAddressFamilies=~…
allocate exotic sockets
✗ CapabilityBoundingSet=~CAP_SYS_TTY_CONFIG
vhangup()
✗ CapabilityBoundingSet=~CAP_WAKE_ALARM
timers that wake up the system
✗ RestrictAddressFamilies=~AF_UNIX
allocate local sockets

## Service may change
Service has

## Service has
Service may
Service may create
Service may
Service may issue
Service may program

## Service may

→ Overall exposure level for backup.service: 9.6 UNSAFE ?
lines 34-81/81 (END)

Of course, many services need pretty much complete access to everything in order to do their
work. I ran this program against several services, including my own backup service; the results
may differ, but the bottom line seems to be mostly the same.
This tool would be very useful for checking and fixing userspace service units in securitycritical environments. I don't think it has much to offer for most of us.

This powerful tool offers some interesting and amazingly useful options. Much of what this
article explores is about using systemd-analyze to provide insights into Linux's startup
performance using systemd. It can also analyze other aspects of systemd.
Some of these tools are of limited use, and a couple should be forgotten completely. But most
can be used to good effect when resolving problems with startup and other systemd
functions.

123

## Managing resources with cgroups
in systemd
There is little more frustrating to me as a sysadmin than unexpectedly running out of a
computing resource. On more than one occasion, I have filled all available disk space in a
partition, run out of RAM, and not had enough CPU time to perform my tasks in a reasonable
amount of time. Resource management is one of the most important tasks that sysadmins do.
The point of resource management is to ensure that all processes have relatively equal access
to the system resources they need. Resource management also involves ensuring that RAM,
hard drive space, and CPU capacity are added when necessary or rationed when that is not
possible. In addition, users who hog system resources, whether intentionally or accidentally,
should be prevented from doing so.
There are tools that enable sysadmins to monitor and manage various system resources. For
example, top and similar tools allow you to monitor the use of memory, I/O, storage (disk,
SSD, and so on), network, swap space, CPU usage, and more. These tools, particularly those
that are CPU-centric, are mostly based on the paradigm that the running process is the unit
of control. At best, they provide a way to adjust the nice number–and through that, the
priority—or to kill a running process. (For information about nice numbers, see Monitoring
Linux and Windows hosts with Glances.)
Other tools based on traditional resource management in a SystemV environment are
managed by the /etc/security/limits.conf file and the local configuration files
located in the /etc/security/limits.d directory. Resources can be limited in a fairly
crude but useful manner by user or group. Resources that can be managed include various
aspects of RAM, total CPU time per day, total amount of data, priority, nice number, number
of concurrent logins, number of processes, maximum file size, and more.

124

Using cgroups for process management
One major difference between systemd and SystemV is how they handle processes. SystemV
treats each process as an entity unto itself. systemd collects related processes into control
groups, called cgroups (short for control groups), and manages system resources for the
cgroup as a whole. This means resources can be managed per application rather than by the
individual processes that make up an application.
The control units for cgroups are called slice units. Slices are a conceptualization that allows
systemd to order processes in a tree format for ease of management.

Viewing cgroups
I'll start with some commands that allow you to view various types of information about
cgroups. The systemctl status <service> command displays slice information about a
specified service, including its slice. This example shows the at daemon:
- atd.service - Deferred execution scheduler
Loaded: loaded (/usr/lib/systemd/system/atd.service; enabled; vendor preset:
enabled)
Active: active (running) since Wed 2020-09-23 12:18:24 EDT; 1 day 3h ago
Docs: man:atd(8)
Main PID: 1010 (atd)
Tasks: 1 (limit: 14760)
Memory: 440.0K
CPU: 5ms
CGroup: /system.slice/atd.service
└─1010 /usr/sbin/atd -f
Sep 23 12:18:24 testvm1.both.org systemd[1]: Started Deferred execution
scheduler.

This is an excellent example of one reason that I find systemd more usable than SystemV and
the old init program. There is so much more information here than SystemV could provide.
The cgroup entry includes the hierarchical structure where the system.slice is systemd
(PID 1), and the atd.service is one level below and part of the system.slice. The
second line of the cgroup entry also shows the process ID (PID) and the command used to
start the daemon.

125

The systemctl command shows multiple cgroup entries. The --all option shows all slices,
including those that are not currently active:
ACTIVE
-.slice
active Root Slice
system-getty.slice
active system-getty.slice
system-lvm2\x2dpvscan.slice
active system-lvm2\
x2dpvscan.slice
system-modprobe.slice
active system-modprobe.slice
system-sshd\x2dkeygen.slice
active system-sshd\
x2dkeygen.slice
system-systemd\x2dcoredump.slice loaded inactive dead
system-systemd\
x2dcoredump.slice
system-systemd\x2dfsck.slice
active system-systemd\
x2dfsck.slice
system.slice
active System Slice
user-0.slice
active User Slice of UID 0
user-1000.slice
active User Slice of UID 1000
user.slice
active User and Session Slice
= Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
= The low-level unit activation state, values depend on unit type.
11 loaded units listed.
To show all installed unit files use 'systemctl list-unit-files'.

The first thing to notice about this data is that it shows user slices for UIDs 0 (root) and 1000,
which is my user login. This shows only the slices and not the services that are part of each
slice. This data shows that a slice is created for each user at the time they log in. This can
provide a way to manage all of a user's tasks as a single cgroup entity.

Explore the cgroup hierarchy
All is well and good so far, but cgroups are hierarchical, and all of the service units run as
members of one of the cgroups. Viewing that hierarchy is easy and uses one old command
and one new one that is part of systemd.
The ps command can be used to map the processes and their locations in the cgroup
hierarchy. Note that it is necessary to specify the desired data columns when using the ps
command. I significantly reduced the volume of output from this command below, but I tried
to leave enough so you can get a feel for what you might find on your systems:

126

## # ps xawf -eo pid,user,cgroup,args
PID USER
CGROUP
COMMAND
2 root
[kthreadd]
3 root
\_ [rcu_gp]
4 root
\_ [rcu_par_gp]
6 root
\_ [kworker/0:0H-kblockd]
9 root
\_ [mm_percpu_wq]
10 root
\_ [ksoftirqd/0]
11 root
\_ [rcu_sched]
12 root
\_ [migration/0]
13 root
\_ [cpuhp/0]
14 root
\_ [cpuhp/1]
<SNIP>
625406 root
\_ [kworker/3:0-ata_sff]
625409 root
\_ [kworker/u8:0-events_unbound]
1 root
0::/init.scope
/usr/lib/systemd/systemd --switchedroot --system --deserialize 30
588 root
0::/system.slice/systemd-jo /usr/lib/systemd/systemd-journald
599 root
0::/system.slice/systemd-ud /usr/lib/systemd/systemd-udevd
741 root
0::/system.slice/auditd.ser /sbin/auditd
743 root
0::/system.slice/auditd.ser \_ /usr/sbin/sedispatch
764 root
0::/system.slice/ModemManag /usr/sbin/ModemManager
765 root
0::/system.slice/NetworkMan /usr/sbin/NetworkManager --no-daemon
767 root
0::/system.slice/irqbalance /usr/sbin/irqbalance --foreground
779 root
0::/system.slice/mcelog.ser /usr/sbin/mcelog --ignorenodev -daemon --foreground
781 root
0::/system.slice/rngd.servi /sbin/rngd -f
782 root
0::/system.slice/rsyslog.se /usr/sbin/rsyslogd -n
<SNIP>
893 root
0::/system.slice/sshd.servi sshd: /usr/sbin/sshd -D [listener] 0
of 10-100 startups
1130 root
0::/user.slice/user-0.slice \_ sshd: root [priv]
1147 root
\_ sshd: root@pts/0
1148 root
\_ -bash
1321 root
\_ screen
1322 root
\_ SCREEN
1323 root
\_ /bin/bash
498801 root
\_ man
systemd.resource-control

You can view the entire hierarchy with the systemd-cgls command, which is a bit simpler
because it does not require any complex options.
I have shortened this tree view considerably. as well, but I left enough to give you some idea of
the amount of data as well as the types of entries you should see when you do this on your
system. I did this on one of my virtual machines, and it is about 200 lines long; the amount of
data from my primary workstation is about 250 lines:

127

## # systemd-cgls
Control group /:
-.slice
├─user.slice
│ ├─user-0.slice
│ │ ├─session-1.scope
│ │ │ ├─ 1130 sshd: root [priv]
│ │ │ ├─ 1147 sshd: root@pts/0
│ │ │ ├─ 1148 -bash
│ │ │ ├─ 1321 screen
│ │ │ ├─ 1322 SCREEN
│ │ │ ├─ 1323 /bin/bash
│ │ │ ├─ 1351 /bin/bash
│ │ │ ├─ 1380 /bin/bash
│ │ │ ├─123293 man systemd.slice
│ │ │ ├─123305 less
│ │ │ ├─246795 /bin/bash
│ │ │ ├─371371 man systemd-cgls
│ │ │ ├─371383 less
│ │ │ ├─371469 systemd-cgls
│ │ │ └─371470 less
│ │ └─user@0.service …
├─dbus-broker.service
│ ├─1170 /usr/bin/dbus-broker-launch --scope user
│ └─1171 dbus-broker --log 4 --controller 12 --machine-id
3bccd1140fca488187f8a1439c832f07 --max-bytes 100000000000000 --max-fds
25000000000000 --max->
├─gvfs-daemon.service
│ └─1173 /usr/libexec/gvfsd
└─init.scope
├─1137 /usr/lib/systemd/systemd --user
└─1138 (sd-pam)
│ └─user-1000.slice
├─user@1000.service …
│ ├─dbus\x2d:1.2\x2dorg.xfce.Xfconf.slice
│ │ └─dbus-:1.2-org.xfce.Xfconf@0.service
└─370748 /usr/lib64/xfce4/xfconf/xfconfd

This tree view shows all of the user and system slices and the services and programs running
in each cgroup. Notice the units called "scopes," which group related programs into a
management unit, within the user-1000.slice in the listing above. The user1000.slice/session-7.scope cgroup contains the GUI desktop program hierarchy,
starting with the LXDM display manager session and all of its subtasks, including things like
the Bash shell and the Thunar GUI file manager.

128

Scope units are not defined in configuration files but are generated programmatically as the
result of starting groups of related programs. Scope units do not create or start the processes
running as part of that cgroup. All processes within the scope are equal, and there is no
internal hierarchy. The life of a scope begins when the first process is created and ends when
the last process is destroyed.
Open several windows on your desktop, such as terminal emulators, LibreOffice, or whatever
you want, then switch to an available virtual console and start something like top or Midnight
Commander. Run the systemd-cgls command on your host, and take note of the overall
hierarchy and the scope units.
The systemd-cgls command provides a more complete representation of the cgroup
hierarchy (and details of the units that make it up) than any other command I have found. I
prefer its cleaner representation of the tree than what the ps command provides.

More information
After covering these basics, I had planned to go into more detail about cgroups and how to
use them, but I discovered a series of four excellent articles by Red Hat's Steve Ovens on
Opensource.com's sister site Enable Sysadmin. Rather then basically rewriting Steve's articles,
I decided it would be much better to take advantage of his cgroup expertise by linking to
them:
1. A Linux sysadmin's introduction to cgroups
2. How to manage cgroups with CPUShares
3. Managing cgroups the hard way—manually
4. Managing cgroups with systemd
Enjoy and learn from them, as I did.

129
