---
id: freebsd-27
title: "DTrace"
slug: freebsd-27-dtrace
source: "FreeBSD Handbook"
sourceSection: "Chapter 27 — DTrace"
topic: "III"
tags: [freebsd, unix, dtrace, tracing, performance]
summary: "Dynamic tracing on FreeBSD with DTrace: enabling it, writing scripts and using it to find performance problems."
---
# Chapter 27. DTrace

## 27.1. Synopsis

DTrace, also known as Dynamic Tracing, was developed by Sun™ as a tool for locating performance bottlenecks in production and pre-production systems. In addition to diagnosing performance problems, DTrace can be used to help investigate and debug unexpected behavior in both the FreeBSD kernel and in userland programs. DTrace is a remarkable profiling tool, with an impressive array of features for diagnosing system issues. It may also be used to run pre-written scripts to take advantage of its capabilities. Users can author their own utilities using the DTrace D Language, allowing them to customize their profiling based on specific needs. The FreeBSD implementation provides full support for kernel DTrace and experimental support for userland DTrace. Userland DTrace allows users to perform function boundary tracing for userland programs using the pid provider, and to insert static probes into userland programs for later tracing. Some ports, such as databases/postgresql12-server and lang/php74 have a DTrace option to enable static probes. The official guide to DTrace is maintained by the Illumos project at DTrace Guide. After reading this chapter, you will know:

- What DTrace is and what features it provides.
- Differences between the Solaris™ DTrace implementation and the one provided by FreeBSD.
- How to enable and use DTrace on FreeBSD.

  Before reading this chapter, you should:

- Understand UNIX® and FreeBSD basics (FreeBSD Basics).
- Have some familiarity with security and how it pertains to FreeBSD (Security).

## 27.2. Implementation Differences

While the DTrace in FreeBSD is similar to that found in Solaris™, differences do exist. The primary difference is that in FreeBSD, DTrace is implemented as a set of kernel modules and DTrace can not be used until the modules are loaded. To load all of the necessary modules:

```
# kldload dtraceall
```

Beginning with FreeBSD 10.0-RELEASE, the modules are automatically loaded when dtrace is run. FreeBSD uses the DDB_CTF kernel option to enable support for loading CTF data from kernel modules and the kernel itself. CTF is the Solaris™ Compact C Type Format which encapsulates a reduced form of debugging information similar to DWARF and the venerable stabs. CTF data is added to binaries by the ctfconvert and ctfmerge build tools. The ctfconvert utility parses DWARFELF debug sections created by the compiler and ctfmerge merges CTFELF sections from objects into either executables or shared libraries. Some different providers exist for FreeBSD than for Solaris™. Most notable is the dtmalloc provider, which allows tracing malloc() by type in the FreeBSD kernel. Some of the providers found in Solaris™, such as cpc and mib, are not present in FreeBSD. These may appear in future versions of FreeBSD. Moreover, some of the providers available in both operating systems are not compatible, in the sense that their probes have different argument types. Thus, D scripts written on Solaris™ may or may not work unmodified on FreeBSD, and vice versa. Due to security differences, only root may use DTrace on FreeBSD. Solaris™ has a few low level security checks which do not yet exist in FreeBSD. As such, the /dev/dtrace/dtrace is strictly limited to root. DTrace falls under the Common Development and Distribution License (CDDL) license. To view this license on FreeBSD, see /usr/src/cddl/contrib/opensolaris/OPENSOLARIS.LICENSE or view it online at http://opensource.org/licenses/CDDL-1.0. While a FreeBSD kernel with DTrace support is BSD licensed, the CDDL is used when the modules are distributed in binary form or the binaries are loaded.

## 27.3. Enabling DTrace Support

In FreeBSD 9.2 and 10.0, DTrace support is built into the GENERIC kernel. Users of earlier versions of FreeBSD or who prefer to statically compile in DTrace support should add the following lines to a custom kernel configuration file and recompile the kernel using the instructions in Configuring the FreeBSD Kernel:

```
options
KDTRACE_HOOKS
options
DDB_CTF
makeoptions DEBUG=-g
makeoptions WITH_CTF=1
Users of the AMD64 architecture should also add this line:
options
KDTRACE_FRAME
```

This option provides support for FBT. While DTrace will work without this option, there will be limited support for function boundary tracing. Once the FreeBSD system has rebooted into the new kernel, or the DTrace kernel modules have been loaded using kldload dtraceall, the system will need support for the Korn shell as the DTrace Toolkit has several utilities written in ksh. Make sure that the shells/ksh93 package or port is installed. It is also possible to run these tools under shells/pdksh or shells/mksh. Finally, install the current DTrace Toolkit, a collection of ready-made scripts for collecting system information. There are scripts to check open files, memory, CPU usage, and a lot more. FreeBSD 10 installs a few of these scripts into /usr/share/dtrace. On other FreeBSD versions, or to install the full DTrace Toolkit, use the sysutils/dtrace-toolkit package or port.

> The scripts found in /usr/share/dtrace have been specifically ported to FreeBSD. Not all of the scripts found in the DTrace Toolkit will work as-is on FreeBSD and some scripts may require some effort in order for them to work on FreeBSD.

The DTrace Toolkit includes many scripts in the special language of DTrace. This language is called the D language and it is very similar to C++. An in depth discussion of the language is beyond the scope of this document. It is covered extensively in the Illumos Dynamic Tracing Guide.

## 27.4. Enabling DTrace in Out-of-Kernel Modules

To add DTrace support to an out-of-kernel module, which is useful for development and debugging, include the following line in the module’s Makefile:

CFLAGS+= -DKDTRACE_HOOKS This flag enables DTrace hooks during compilation, allowing for advanced debugging and monitoring of the module. Ensure to recompile the module after this modification to activate DTrace functionality.

## 27.5. Using DTrace

DTrace scripts consist of a list of one or more probes, or instrumentation points, where each probe is associated with an action. Whenever the condition for a probe is met, the associated action is executed. For example, an action may occur when a file is opened, a process is started, or a line of code is executed. The action might be to log some information or to modify context variables. The reading and writing of context variables allows probes to share information and to cooperatively analyze the correlation of different events. To view all probes, the administrator can execute the following command:

```
# dtrace -l | more
```

Each probe has an ID, a PROVIDER (dtrace or fbt), a MODULE, and a FUNCTION NAME. Refer to dtrace(1) for more information about this command. The examples in this section provide an overview of how to use two of the fully supported scripts from the DTrace Toolkit: the hotkernel and procsystime scripts. The hotkernel script is designed to identify which function is using the most kernel time. It will produce output similar to the following:

```
# cd /usr/local/share/dtrace-toolkit
# ./hotkernel
```

Sampling... Hit Ctrl-C to end. As instructed, use the Ctrl + C key combination to stop the process. Upon termination, the script will display a list of kernel functions and timing information, sorting the output in increasing order of time:

```
kernel`_thread_lock_flags
0xc1097063
kernel`sched_userret
kernel`kern_select
kernel`generic_copyin
kernel`_mtx_assert
kernel`vm_fault
kernel`sopoll_generic
kernel`fixup_filename
kernel`_isitmyx
kernel`find_instance
kernel`_mtx_unlock_flags
kernel`syscall
kernel`DELAY
0xc108a253
kernel`witness_lock
kernel`read_aux_data_no_wait
kernel`Xint0x80_syscall
kernel`witness_checkorder
kernel`sse2_pagezero
kernel`strncmp
kernel`spinlock_exit
kernel`_mtx_lock_flags
kernel`witness_unlock
kernel`sched_idletd
0xc10981a5
2
2
2
2
3
3
3
3
4
4
4
5
5
5
6
7
7
7
7
8
9
10
11
15
137
42139
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.3%
99.3%
```

This script will also work with kernel modules. To use this feature, run the script with -m:

```
# ./hotkernel -m
```

Sampling... Hit Ctrl-C to end. ^C MODULE 0xc107882e 0xc10e6aa4 0xc1076983 0xc109708a 0xc1075a5d 0xc1077325 0xc108a245 0xc107730d 0xc1097063 COUNT 1 1 1 1 1 1 1 1 2

```
PCNT
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0.0%
0xc108a253
kernel
0xc10981a5
73
874
213781
0.0%
0.4%
99.6%
```

The procsystime script captures and prints the system call time usage for a given process ID (PID) or process name. In the following example, a new instance of /bin/csh was spawned. Then, procsystime was executed and remained waiting while a few commands were typed on the other incarnation of csh. These are the results of this test:

```
# ./procsystime -n csh
```

Tracing... Hit Ctrl-C to end... ^C Elapsed Times for processes csh, SYSCALL getpid sigreturn close fcntl dup setpgid stat setitimer wait4 sigaction sigprocmask gettimeofday write execve ioctl vfork sigsuspend read

```
TIME (ns)
6131
8121
19127
19959
26955
28070
31899
40938
62717
67372
119091
183710
263242
492547
770073
3258923
6985124
3988049784
```

As shown, the read() system call used the most time in nanoseconds while the getpid() system call used the least amount of time.
