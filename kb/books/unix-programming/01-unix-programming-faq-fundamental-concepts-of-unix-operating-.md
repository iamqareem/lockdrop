---
id: unix-programming-01
title: "UNIX Programming FAQ — Fundamental Concepts of UNIX Operating System, File Management…",
slug: unix-programming-01-unix-programming-faq-fundamental-concepts-of-unix-operating-
source: "UNIX Programming FAQ — Processes, Memory, Communication, Networking and Shell Scripting",
sourceSection: "1. Fundamental Concepts of UNIX Operating System, 2. File Management, 3. Process Management, 4. Inter-Process Communication, 5. Socket Programming, 6. Memory Management, 7. UNIX Shell and Custom Environment, 8. Shell Programming Using Bourne Shell"
track: systems-kernel,
tier: premium
tags: [unix, systems-programming, processes, memory, ipc]
summary: "UNIX is a powerful operating system, first developed in Bell Labs and has been Covers 8 sections: Fundamental Concepts of UNIX Operating System, File Management, Process Management.",
---
# UNIX Programming FAQ — Fundamental Concepts of UNIX Operating System, File Management…

## 1. Fundamental Concepts of UNIX Operating System
History of UNIX
Salient features of UNIX
Portability
Multi-tasking
Multi-user
Device independence
Modularity
Networking
Tools and utilities
Security
The UNIX system architecture
UNIX programming environment
Personal environment
Time-sharing environment
Client-server environment

Process attributes
Process context
Process relationship
init process in 4.3 BSD
init process in UNIX system V
Files and directories
File
Pathname
Types of files
UNIX file name convention
File names and meta characters
UNIX file system
Important UNIX directories
Key terms
Review exercise

## 2. File Management
File input/output
Kernel data structures for file input/output
System call for UNIX file I/O
BASIC file permission
Real and effective user-IDs and group-IDs
Mounting and unmounting a file system
Directory related system calls
The mkdir system call
The rmdir system call
The chdir() system call
Standard I/O library in UNIX
Stream and FILE object
I/O buffering
Stream buffering operations
Standard data files
/etc/passwd file
/etc/group file

/etc/shadow file

## 3. Process Management
Process IDs
Executing process in UNIX environment
Process termination
Normal termination
Abnormal process termination
Command-line arguments and environment variables
Memory layout of a UNIX process
Setting branch into another function
Process control block
Process control

Process creation
Awaiting process termination
Executing another program
Accessing user information
User details
Group details
Show information of all users logged in
Process groups
Sessions
Signals
Sending a signal to processes
Signal handling
Thread

## 4. Inter-Process Communication
Introduction to IPC

Means of interprocess communication
Pipes and FiFOs
One end closed pipe
The popen() I/O library function
The pclose() I/O function
FIFOs
Server process
Client process
Message queues
Destroying a message queue
Controlling message queue
Shared memory
Creating shared memory
Controlling a shared memory segment
Attaching and detaching a shared memory segment
Process synchronization
Semaphores
Semaphore operations
Semaphore set
Creating semaphore
Controlling semaphore

Semaphore operations semop()
Destroying a semaphore

## 5. Socket Programming
Socket
Types of sockets
Socket data structure
System calls for socket communication
Creating a socket (server and client)
Binding socket to an address (server)
Listening incoming connection
Initiating connection
Accepting the connection from the incoming queue
Sending data through socket (connection-oriented)
Receiving message through socket (connection-oriented)
Receiving message through socket (connectionless)

Closing socket
I/O models
Blocking I/O model
Non-blocking I/O model
I/O multiplexing model
Signal-driven I/O model
Asynchronous I/O model
Name and address conversion
Resource records
The gethostbyname() function
The hostent structure
The gethostbyaddress() function
The getservbyname() and getservbyport() functions

## 6. Memory Management
Use of operating system memory

Memory contents of a running process in UNIX
Swapping
Demand paging
Memory management functions
The malloc() function
The free() function
The calloc() function
The realloc() function
The alloca() function
Setting branch to another function
Multiple choice questions
Questions

## 7. UNIX Shell and Custom Environment
Introduction to shell
Execution modes of UNIX shell
Interactive mode

Programming mode
UNIX session customization mode
Shell interpretation cycle
Functions of UNIX shell
Program execution
Input/output redirection
Environment customization
Shell programming language
Types of shells
The Bourne shell family
The C shell family
Summary of features
Meta character and wild cards
Command standard input/output
Redirection
Output redirection
Safe I/O redirection with noclobber
Input redirection
Redirecting error
Command grouping

The tee command
UNIX environment variables
PATH variable
HOME variable
Prompt string 1 (PS1) variable
Prompt string 2 (PS2) variable
MAIL variable
CDPATH variable
MAILCHECK variable
MAILPATH variable
User’s profile
Review Exercises
Lab practice

## 8. Shell Programming Using Bourne Shell

Introduction to shell programming
Writing shell scripts
Variables
Comment
Quoting
Single quotes
Double quotes
The backslash
Special shell variables
The shift command
The set command
Interactive input
Subshell
Exporting variables
Test operator for comparisons
Logical operators with test
The negation operator (!)
The logical AND operator
The logical OR operator
Control commands

Conditional if
Conditional case
The while command
The until command
The for command
The break command
The continue command
Special string operations
Parameter substitution
Functions
Passing arguments to function
Returning from function
Trapping signals
Arrays

Index

CHAPTER 1

Fundamental Concepts of UNIX Operating System

UNIX is a powerful operating system, first developed in Bell Labs and has been
under development ever since. It is very popular among scientific, engineering,
and academic communities because of its stability, multi-user, and multi-tasking
environment for servers, desktops, and laptops. The system is divided into two
parts consisting of programs and services that have made the UNIX system
environment so popular. The second part consists of the operating system, which
supports these programs and services. The two entities files and processes are
the main control concepts in the UNIX system model. This chapter discusses the
architecture and overview of these control entities of the operating system.

History of UNIX

Salient features of UNIX

Architecture of UNIX operating system

Unix programming environment

Unix process

Handling files and process control entities.

Unix file system

Understand salient features of the UNIX operating system to make it a popular
OS.

Get to know about the architecture and functioning of each layer.

Learn about UNIX programming environments.

Understand fundamental concepts of files and processes.

History of UNIX

Bell Laboratories, jointly with MIT and General Electric, developed a new
operating system Multics (Multiplexed Instruction Computing Service), in 1965.
The main features included in the operating system were multi-user, multiprocessor, and multi-level (hierarchical) file systems, among its many forwardlooking features.

In the year 1969, a few programmers, Ken Thompson, Dennis Ritchie, and
others working in Multics, designed and implemented the first version of the
UNIX file system on a PDP-7. After including a few more utilities, it was given
the name UNIX by Brian Kernighan. UNIX was written mainly in assembly
language.

In the year 1971, the system was implemented on PDP-11 with 16K bytes of
memory, including 8K bytes for user programs and a 512K byte disk. It was
designed with the following features due to which it caught the interest of
researchers:

Programmers environment.

Simple user interface.

Simple utilities that can be combined to perform powerful functions.

Hierarchical file system.

Simple interface to devices consistent with file format.

Multi-user and multi-process system.

Architecture is independent and transparent to the user.

In the year 1973, it was decided to re-write the UNIX in the C language
developed by Dennis Ritchie. This decision made it easy to port the UNIX to
new machines.

In the year 1974, it finally got recognition from the academic community when
Thompson and Ritchie published a paper in the Communications of the ACM
describing the new UNIX OS.

In the year 1980, Berkeley released the BSD 4.1 (Berkeley Software
Development) version of UNIX.

In the year 1988, AT&T and Sun Microsystems jointly developed System V
Release 4 (SVR4).

In the year 1993, Novell bought UNIX from AT&T.

Salient features of UNIX

UNIX is a very popular operating system due to its special and useful features,
and these are discussed as follows.

Portability

UNIX is considered a portable operating system as a large portion of it is written
in the C language, and only a very small portion of it is written in assembly
language. Because the C program can be easily moved from one hardware
environment to another, provided a standard Compiler is available, this makes
the UNIX code run on different hardware. All this only requires a standard C
compiler.

The application program interface allows many different types of applications to
be easily implemented under UNIX without writing assembly language. These
applications are relatively portable across multiple vendor hardware platforms.

Multi-tasking

This is managed by dividing the CPU time intelligently between all jobs. Each
job gets a time slot depending on its priority. A user can print a file and, at the
same time, execute a C program. Users do not have to wait for an application to
end before starting another one. A huge file can be sorted as a background job
while working on a foreground job.

Multi-user

The UNIX environment design allows multiple users to work concurrently, and
hence, they can share hardware and software resources of hard disk, CPU,
memory, printer, and file by working on a separate terminal. A terminal is a
keyboard and monitor, which is connected to the main computer called the host
machine, server, or console. In UNIX, every user gets an equal chance to share
resources while preventing the user from locking other’s resources.

Device independence

In UNIX, input/output devices are treated like ordinary files. Input and output
from the files and devices are handled using a design feature called indirection
(<, >. <<, >>) without going into detail specifications of devices. Input to a
program can come from any file or device, and output from a program can go to
any file or device.

Modularity

UNIX kernel consists of modules, and system administrators can customize it to
include only those modules that are normally required. If a new feature is
required later, the corresponding module can be added to the Kernel, and it can
be reconfigured or rebuilt.

Networking

Originally networking was not incorporated into the UNIX system. Networking
was added after the separation of UNIX between BSD UNIX and At&T UNIX.

Networking allows a user to log on to the remote system. Once access is gained
to a remote system, users can use system resources using UNIX commands
according to permission granted to him/her. A standard communication protocol
known as TCP/IP is used to access other system resources. UNIX also supports a
network file system, which allows users to access files on another network too.

Tools and utilities

Productivity of the system is increased with available software utilities and tools.
UNIX is very rich in tools and comes with hundreds of programs or tools. These
tools are either integral utilities that are absolutely necessary for the operation of
the computer, such as command interpreter, and tools that are not necessary for
the operation of the UNIX but provide the user with additional capabilities such
as email, typesetting capabilities such as troff, nroff, awk, sed, and so on.

Security

UNIX has several levels of security:

Assigning login name and password to individual users provides the first level of
security.

The second level is at a file level, where each file has read, write and execute
permission associated with the owner of the file, group members, and others,
which decide who can read, write, or execute a file.

The third type of security is that files can be encrypted so that the file is in an
unreadable format, and only you can decrypt it to read it.

The UNIX system architecture

The UNIX system has become quite popular since its inception in 1969, running
on machines of varying processing capacities from microprocess to the
mainframe and providing a common execution environment across them. The
operating system interacts directly with the hardware, providing common
services to the programs and insulating them from the hardware.

UNIX operating system is made up of layers around the hardware layer, as
shown in figure 1.1:

Figure 1.1: UNIX system architecture

It contains:

Hardware layer.

Kernel layer.

Shell layer.

Windowing layer as X—interacts with the shell but can interact with
applications and commands.

Utilities and application programs or tools layer.

Viewing the system as set of layers, the operating system is commonly called the
system kernel or just the Kernel. It emphasizes its isolation from user programs
because programs are independent of the underlying hardware, and it is easy to
move them between UNIX systems running on different hardware. If the
programs do not make an assumption about the underlying hardware, programs
such as the shell and editors shown in the next layer interact with the Kernel by
invoking a well-defined set of system calls. The system calls to interact with the
Kernel to do various operations for calling the program and exchange data

between the Kernel and the program. Several programs known as commands are
above this layer. Other application programs can build on top of lower-level
programs. Let us discuss them in detail:

Hardware layer: Innermost layer that provides the services for the OS is called
the hardware layer. This includes the terminals, terminal controllers, disks, tapes,
memory, and various device controllers.

Kernel: This is the central part of the operating system, which interacts directly
with the hardware and provides the services to the user programs. The Kernel is
stored in a file called “UNIX”. There is only one Kernel running on the system.
User programs interact with the Kernel through a set of standard system calls
that are a part of the Kernel and provide the following basic functions of the
Kernel:

File system management: This includes management of the UNIX file system
that comprises files and directories. This includes creating, opening, reading,
writing, closing files, and other file system-related operations and data transfer
between the file system and the hardware.

Memory management: This includes allocation of memory to programs, sharing
of memory spaces, or freeing memory. If the system is low on free memory, the
Kernel frees memory by writing a program temporarily to secondary memory
called a swap device.

Process management: In UNIX, a process is a program in execution. Process
managing includes scheduling of various processes to the CPU and execution of
processes, including creating, terminating, or suspension of a process. It also

includes inter-process communication.

Storage management: Allocation of secondary storage disks for user data and
management of free space.

Device management: This includes allowing controlled access to peripheral
devices such as terminals, tape drives, disk drives, and network devices.

Shell: This is the part of the UNIX that is most visible to the user. It is the
command interpreter that interprets the commands entered by the user and
conveys them to the Kernel, which executes them. The shell is a program
running separately for each user working with UNIX. The number of shells
running in the system is equal to the number of users working in the system at a
time. There are different types of shells, and the commonly used ones are the
Bourne shell, C Shell, Korn Shell, and so on:

Bourne shell created by Steve Bourne is most popular and bundled with every
UNIX system.

The C shell was popular among UNIX programmers and was created by Bill Joy
at Berkeley. The advantages of the C shell over Bourne are as follows:

It allows the aliasing of commands; that is, we can rename command with our
alias so that we can use a short alias name for a long command.

C shell has a command history feature in which previously typed commands can
be recalled.

The Korn Shell is a superset of the Bourne shell and is more powerful. David
Korn of AT and T Bell labs designed it.

Bourne Again Shell (Bash) from the Free Software Foundations GNU project,
based on shell.

Utilities and application programs: There are hundreds of utilities in UNIX. A
utility is a standard UNIX program to provide support to the user. Most of the
UNIX utilities are available as application programs:

File management (rm, cat, ls, rmdir, mkdir).

User management (passwd, chmod, chgrp).

Process management (kill, ps).

Printing (lp, troff, pr).

Program development tools such as sccs, make editors (vi and ed), and compiler.

UNIX email utility.

Windowing layer: The GUI on UNIX is a separate layer that sits on top of the
core operating system. X window system is an underlying graphical layer for all
modern UNIX operating systems. The X Window System just facilitates the
system to accept input from devices such as keyboard and mouse and to draw the
graphical objects on display. Drawing ad taking input from devices is the job of
software called a Window manager. There are many Window managers available
for X. Generally, the Window manager is proprietary software and will only run
on a particular type of UNIX. Some of these are open and will run on any system
that has X installed.

The X Window system has some very unique and useful features. These things
are provided by the X itself and, as such, are common to all X window managers
and all UNIX/X11 systems.

UNIX programming environment

UNIX is a portable operating system basically designed for multi-user and multitasking environments. It contains hundreds of simple, single-purpose functions
that can be combined virtually to do every processing task imaginable. UNIX
system is used in three different programming environments.

Personal environment

Although UNIX was originally designed for multi-user environments, but some
users install it on their personal computers. This trend is accelerated with the
invention of LINUX, a free UNIX system. In 2001, Apple systems incorporated
UNIX as its Kernel.

Time-sharing environment

UNIX is a multi-user and multi-tasking system that runs in a time-sharing
environment to handle multiple tasks by a single processing unit. The Kernel
maintains a list of current tasks and allots a slot of time to each task, then to the
next, and so on. Normally, Kernel switches from one process to the next so
rapidly that each user has an impression that he has individual attention.

Figure 1.2: Multi-user environment

Client-server environment

A client/server computing environment divides processing functions between a
server computer and a client computer. In the client/server model, data
processing load is shared between the client computer and more powerful server
computers. The server computer is dedicated to storing and managing data and
fulfills client requests. The server receives structured requests from the client,
processes the requested data, and sends the data back to the client. His client
computers take the user’s input from an interface, process some information
using its CPU, and present the result to the user.

Note: In the single-user environment, a program may have multiple
instances because the process may be split into two processes by default,
sharing the same code.

A program in execution is a process. In UNIX, a process is a unit of work. If n
users are executing the same program, then there are n processes executing in the
system. A process executes by following a strict sequence of instructions that is
self-contained and does not jump to that of another process. All the processes
execute concurrently with the CPU switching between the processes.

All the UNIX commands are programmed, and thus, contribute to the process in
the system when they are under execution.

Process attributes

Every process in UNIX is attributed to some properties (as shown in table 1.1),
which affect the execution of the process.

Attribute

Meaning

PID

Process identification is a unique number

PPID

Process ID of the Parent

UID

User ID of the owner of the process

GID

ID of the group to which the owner belongs to

EUID

Effective User ID

EGID

Effective Group ID

Priority

The priority the process run at

Table 1.1: Process attributes

The lifetime of a process can be modeled by a set of states, and each process can
be in any of the states at one point in time. In UNIX, the process may undergo a
total of nine stages during its lifecycle, as shown in figure 1.3:

Figure 1.3: UNIX process sates

The description of each process state is shown in table 1.2:

Description

Executing (user mode)

Running in user mode.

Executing (Kernel-mode) Running in kernel mode.
Ready in memory

Ready to run as soon as kernel schedules it

Ready in swap device

Process is ready to run but must be swapped in memory so that Ke

Sleeping in memory

Unable to execute, waiting for an event to occur.

Sleeping in swap device

Process is blocked and awaiting an event in swap device.

Preempted

Process is returning from Kernel to user mode, but Kernel preemp

Created

The newly created process is not yet ready to execute.

Zombie

Process just completed but not yet left its resources.

Table 1.2: Process states

In UNIX, processes are executed in two different modes, user mode and kernel
mode (explained in the next section).

Ready to run in memory and preempted are essentially the two same states, but
the distinction is made to just emphasize how the process enters in the
preempted state. When the process executes system calls and interrupts the
handler (clock or I/), it is in kernel mode. When Kernel finishes its job, the
process moves from kernel mode to the user mode. However, Kernel can
preempt such jobs to execute other ready-to-run jobs that have higher priorities.

There are two modes of execution of the system as seen by the hardware:

User mode: When the user process executes, it does so in the user mode. In the
user mode, processes can access their own instructions and data but not kernel
instructions and data or those of other processes.

Kernel mode: When a user process executes a system call, the execution mode of
the process changes from user mode to kernel mode; the Kernel executes the
users’ request. Processes in kernel mode can access both Kernel and user
addresses.

A typical UNIX system consists of a collection of processes: operating system
processes executing system code and user processes executing user code. System
processes run in kernel mode to perform administrative and housekeeping
activities such as allocation of memory, system accounting, and process
scheduling. User processes run in user mode to execute programs and utilities.
User processes move into kernel mode if it invokes a system call or when an
interrupt or exception has occurred.

Note: UNIX is not suitable for real-time processing because preemption can only
occur when the process is about to move from kernel mode to user mode. When
the process is in Kernel mode, it cannot be preempted.

Process context

The process context of the process represents the current operating state of the
process. The context of a process includes its address space, stack space, virtual
address space, register set image, accounting information, associated kernel data
structures, and state information. In general, process context has the following
three components:

User-level context: User-level context contains the basic user’s program
generated after compiling the source file. The basic elements of the program are
categorized in text and data. The text holds a read-only set of instructions for the
program. The data area is the shared memory area accessible by many processes.
There is only one shared memory area, but with the concept of virtual memory,
each sharing process may have a shared memory region in its address space. The
user stack area is used to store parameters that return values and pointer to
function calls.

Register context: Register level context stores process status information in the
processor’s registers when the process is not executing.

System-level context: System-level context consists of information required by
the operating system to manage processes. System-level context has static and
dynamic parts. The static part contains an entry for each process in the process
table to store process control information to be available to the Kernel at all
times. The user (U) area is another part of the static context, which contains
additional control information required by the Kernel when it is executing within
the context of the process. The third part of the static context is the per-process
region table to be used by a memory management system to swap in and out
processes from/to main memory. Finally dynamic part of the system-level

context is the Kernel stack.

Kernel stack is used for processes executing in kernel mode. Kernel stack stores
information required when an interrupt, or procedure call occurs.

Kernel stack is used by a process executing in Kernel mode. Kernel stack stores
information required when an interrupt, or procedure call occurs. Table 1.3
shows the set of information available under different contexts of the process
currently executing in the system.

User-level context
Process text

Executable machine instructions associated with the program.

Process data

Data accessible by the program.

User stack

Contains local variable, arguments, and pointers to functions exec

Register context
Program counter

Address of next instruction to be executed.

Stack pointer

Point to the top of the kernel or user stack depending upon the ope

General-purpose registers Value of these registers depends on implementing hardware.
Processor status register

Status of processor at the time of preemption.

System-level context
Process table entry

Contains the state of the process.

Per process region table

Mapping from virtual to physical addresses and access permission

User (U) area

Process control information is required for a context switch.

Kernel stack

Stack frames for kernel procedures.

Table 1.3: Process contexts

Process relationship

Processes in UNIX have a parent–child relationship, shown in figure 1.4. Each
process has one parent and one or more children. The process ID 0 is the
scheduler process and is called swapper. Swapper is part of the Kernel and is
called the system process. The init process (Process id 1) is the process
dispatcher, which gives birth to the shell, and all processes initiated by us are
children of the shell, and so descendants of the init process. The init is a normal
user process and never dies. UNIX keeps track of all processes in an internal
data structure called a process table.

When the UNIX system is started for normal multi-user operation, then Kernel
invokes the program. etc/init. The init process has Process ID 1 and runs under
super-user privileges (User-ID 0). The operation of init depends on different
UNIX systems.

init process in 4.3 BSD

In 4.3 BSD, to startup the system init executes the shell script /etc/rc. The file
does some bookkeeping and then calls daemon processes. The init then reads the
/etc/ttys process to determine which terminal is activated in a multi-user
environment.

init process in UNIX system V

In system V, to startup the system init read /etc/initab file to put the system in a
different mode (single-user or multi-user) depending on the value of the run
level. For normal multi-user operation /etc.rc file is executed, which starts
various daemon processes.

Regardless of the UNIX system, init process invokes fork copies of itself to
activate terminals. Each child process executes the /etc/getty process to set the
terminal’s speed, display a greeting message, and waits for the user to enter the
login name. The Getty process executes /bin/login program to check whether
login exists in /etc/passwd file or not. If it finds the login name in ./etc/passwd
file, it prompts the user to enter a password. If rejected, Getty gives three
chances to enter your login and password.

The init, Getty, and login processes are executed with the user ID and effective
user ID of the super-user. All these processes run with the same process ID
because the process ID does not change during the exec system call.

Figure 1.4: Process relationship

Login program

While logging in, the system login program sets the following things:

The current working directory as a login directory using chdir system call.

The effective group ID and the effective user ID of the login process in the order
specified in the password file entry using setgid and setuid system calls.

Executes the shell program as specified in the /etc/passwd file, or /bin/sh if the
shell is not specified in the passwd file.

The shell that is invoked by the login program is called login-shell and is treated
as the parent of all processes.

Shell process

The shell process normally waits for the user to enter the command. When the
user enters the command on the command line, the shell forks make a copy of

itself and wait for the child process to terminate. The child shell process checks
the PATH environment variable to search the command file. Commands in
UNIX are generally available in /bin directory.

When the command finishes, it calls an exit system call and exits with its exit
status, which terminates the child process and allows the wait to return to the
parent process.

Network login

In 4.3 BSD, to startup the system, init executes the shell script /etc/rc. The file
does some bookkeeping and then calls daemon processes. One of the daemons
that are started by the shell script is netd. Once the shell script terminates, the
parent process of inetd becomes init. This daemon can be used by a server that
uses either TCP or UDP. This daemon creates sockets on behalf of a number of
services and listens to all of them simultaneously.

Files and directories

The organization of the UNIX files is shown in the following figure:

Figure 1.5: UNIX directory structure

UNIX file system is a hierarchical tree structure of directories and files. The tree
grows or decays dynamically.

The file system tree starts with a single node root /; every non-leaf node is a
directory of files, and leaf nodes are directories, regular files, or special device
files.

File

To UNIX, everything is a file; this means in UNIX data, program files,
directories, devices, and links are considered as files. Each file has a name, an
owner, and access rights. Each file is assigned an inode number that is unique.
All attributes of files are stored in the filesystem in an inode entry. An inode
entry stores everything except the filename. The names are stored in directories
and associated with inode through pointers.

Each inode generally contains the following:

The location of the file’s contents on the disk.

Type of file.

Size of the file in bytes.

The time when file’s inode was last modified.

The time when file’s contents were last modified.

The time when the file was last accessed for reading, writing, and for other

operations.

The reference count, different number of names the file has.

The file’s owner’s ID.

The file’s group ID.

File’s access permission bits.

In UNIX, every file has a nonnegative number associated with it called the file
descriptor. The Kernel uses a file descriptor to identify a file when any program
accesses it. Every file or directory has an associated filename in the directory
entry. Slash and null characters cannot appear in the filename. Some UNIX
systems restrict the filename to 14 characters, and most other systems allow 256
characters in the filename.

Every directory and file has a corresponding entry in its parent directory.
Directory entry specifies an attribute of the file, such as type of file, size of the
file, owner of the file, and permission on the file. The root directory is the first
directory of the directory tree, and it contains its own information. Every
directory also contains information on two special directory entries, the current
directory and the parent of the current directory.
Note: [Reserved Inode Number]:
0: Deleted files / directories
1: File system Dependent, ( file system creation time / bad block count etc )

2: Refers to the root directory of the file system.

Pathname

Every file or directory is identified by its pathname; the pathname of the file or
directory is either absolute or relative to a location.

The absolute pathname starts with the root (/) and follows the branches of the
directory tree, each separated by /, until the required file is found, for example,
/usr/bin.

A relative pathname specifies the path relative to another, usually the current
working directory. So if the current working directory is /usr/bin then the path of
the file in this current directory is specified as: ../date. This indicates that is
control should move one directory level up, then come down through the date.

Types of files

UNIX considers everything as a file. There are seven types of files in UNIX, as
shown in the following figure:

Figure 1.6: Types of UNIX files

The UNIX files can be described as follows:

Regular files: These are a sequence of unformatted bytes. A regular file may
contain ASCII or binary characters or a combination of both. A text file is
also considered as a regular file. ALL shell scripts and programs are written
in high-level languages, and even object codes are also considered as regular
files in UNIX. There’s no header, trailer, label information, or EOF
character as part of the file.

Directory files: These are a sequence of formatted bytes and contain
information about other files and subdirectories. A directory contains
information on the name of the file or directory in it and its inode (index
node) number.

For directory files, the output of the ls –l command shows the first character as
d. To change into a directory or list files in a directory, we need read permission
for that directory. To create a file or subdirectory in that directory, we need write
permission.

Special files: This represents physical devices such as keyboards, tapes,
disks, and printers. They are characters, block files, sockets, and so on. The
operating system uses these files to communicate with the hardware.

We can use the same commands for these special files that we use for regular
files, but the operating system takes care of handling the devices. The physical
devices are represented /dev directory.

PIPES: A type of file used for inter-process communication between
processes. Their implementation allows processes to communicate even
though they do not know what processes are on the other end of the pipe.
Pipes are basically of two types: named pipes and unnamed pipes.

Sockets: UNIX sockets are used to establish communication between two
processes residing same or different machines. Just like other types of files,
sockets are also associated with a file descriptor.

Symbolic link: A symbolic link is a special type of file that points to an
existing file. It is also call soft link. The file contents can be either accessed
through the file name or through the link name.

FIFO: FIFO that is First In First Out is a file, which that has a directory
entry and is accessed by pathname. It works as a pipe between two
processes.

UNIX file name convention

Every file or directory has an associated filename in the directory entry. Some
UNIX systems restrict the filename to 14 characters, and most other systems
allow 256 characters in the filename. In general, UNIX follows some naming
conventions for files:

File names are case-sensitive.

Almost all characters on the keyboard are allowed in the filename except.
| ; , ! @ # $ () <> / \ “ ‘ `{} [] + = & ^ <space> <tab>

Character delimiters are used to make file name easy to read.

In UNIX file name does not specify its functionality.

File names and meta characters

The shell expands the filename if it contains *, ?, and [ characters. The * in the
file name can be replaced with 0 or more permissible characters, the ? can be
replaced with any single character in the file name, and square brackets specify a
range of particular combinations of characters. The range of characters is
specified using—in the square brackets. If the first character inside the square
bracket in ! sign, the complement of the range of other characters is used. Table
1.4 shows different patterns and meanings to refer to a file or set of files.

Pattern

Expansion

*

All files are in the current directory.

?

All files with one character in the file name.

[a-h]

One character file name consisting a to d.

[abcdefgh]

Same as above.

[a-ef-h]

Same as above.

*[0-9]

File where the name ends with a number.

?[0-9]

Two character file name that ends with a number.

[a-zA-Z0-9]

File names that contain a single letter or number.

Table 1.4: Pattern used for file naming

Note: In UNIX, the dot is not a special character. The file name may or may
not contain a dot. Normally file names where the name starts with a dot are
not listed using the ls command.

UNIX file system

Each disk drive is divided into various partitions. Each partition may contain a
file system. A file system consists of a sequence of logical blocks, each
consisting of 512, 1,024, or any other multiple of 512 bytes. The size of the
logical block within the filesystem is the same, but it can vary across the
different file systems.

The file system has the following structure, which is described as follows:

Boot block Super block Inode list Data blocks

The boot block is the first block and contains the bootstrapping code required to
boot the system. Although only one boot block is needed to boot the system,
every file system has an empty boot block.

The superblock describes the state of the system and contains information
including the following:

Size of the file system

Number of free blocks

List of available free blocks

Index of next free block

Size of inode list

Number of free inodes

List of free inode

Flag to check whether the superblock has been modified

The inode list is a list of the inode. It contains entries for every index node of a
file. Inode contains:

File type

Permissions

Number of hard links

Owner user-id

Group id

Size of the file

Time of last access

Time of last modification and

location of data blocks

Finally, data blocks start at the end of the inode list and contain file data and
administrative data. An allocated data block belongs to only one file system.

Important UNIX directories

Table 1.5 shows important UNIX directories related to administrating the system
resources, including users, files, processes, and devices.

Directory

Description

/

Root-kernel.

/etc

Files are required to boot the system, communicate, and scripts to control th

/etc/config

System configuration option files.

/etc/cron.d

Cron access files and FIFO.

/etc/rc#.d

Operations performed when entering run level # (S,0,1,2,3).

/usr

Directories of system files.

/usr/bin

System binary files.

/usr/etc

Further system communication and administration programs.

/usr/lib

Libraries of object files, send mail.

/var

Directories for administrative programs and logs.

/var/adm

System log and account files.

/var/log

System log files.

/var/spool/mail

Mail spool directory.

/var/mail

Mail spool directory.

/var/spool

Directories for cron, logs, and so on.

/dev

Devices directory.

/home /usr/users User directories.
/usr/local

Locally installed files.

/tmp

Contains temporary files created in the system.

Table 1.5: Important UNIX directories

The operating system is a special type of system software that manages all
operating resources to facilitate users to perform their work. UNIX is a multiuser, multi-tasking portable operating system to facilitate text processing,
programming communication, and many other tasks. UNIX operating system
works in various different environments. The major components of the UNIX
system include the Kernel, the shell, and the Utilities and application program.
Among the functionality of the Kernel, the most important is process and file
management. A process is an instance of a program that can open many files.
Each process in the system is identified by different identifiers. Each process
undergoes nine states during its life cycle. The file management and various file
related functions will be discussed in next chapter. It includes the I/O functions,
various system calls and library functions for handling file operations and many
more related topics.

Key terms

Kernel: Part of the operating system that resides in memory all time and
performs most essential tasks.

Multiprocessing: A technique that allows a single processor to process
multiple programs residing simultaneously in the memory.

Parent process: A job that controls one or many child processes which it
created.

Child process: A process that is created and controlled by the parent
process.

File: Collection of data. File in UNIX typically includes ordinary file,
directory, and device files.

File attributes: Characteristics that describe the file.

init: First non-kernel process, thus, parent of all processes.

Process: Program under execution.

Process ID: Numeric identifier of process.

Directory: Type of file that serves as a container for other files and
directories.

Which of the following information is stored in the inode structure?

The file size

The name of the owner of the file

The access permission for the file

All dates since the file was last modified or accessed

The number of symbolic links

Absolute path begins with the path from the root.

TRUE

FALSE

Which of the following files in the current directory are identified by the
regular expression a?b*.

afile

aab

abb

abc

axbb

abxy

Works as a command interpreter.

Hardware

Kernel

Shell

CPU

The process which terminates before the parent process exits is called as.

Zombie

Orphan

Child

None of the other options listed for this question

Context switch means

Kernel switches from executing one process to another

Process switches from kernel mode to user mode

Process switches from user mode to kernel mode

None of the other options listed for this question

e

b-c-e

c

b

Review exercise

What happens if the file mode creation mask is set to 777?

Does UNIX have a fundamental limitation on the depth of a directory tree?

Explain absolute and relative pathnames with examples.

What do multiprogramming, multi-user, and multi-tasking means?

With a neat diagram explain the relationship between the Kernel and the shell of
Unix.

Explain the wild cards * and ?

Where is the password stored ?

Explain standard UNIX file hierarchy

What do UID and GID signify?

CHAPTER 2

File Management

Afile is a collection of related information that is recorded on secondary storage.
Or file is a collection of logically related entities. From user’s perspective, a file
is the smallest unit of secondary storage to provide input and receive output from
the computer program. In storage, a media file is just a sequence of bits, bytes,
or records whose logical meaning is defined by the file owner.

The structure and logical rules to manage files in the data storage are called a file
system. To understand the internal operation of a filesystem, it is required to
know how files and directories are presented externally to the user and how they
are represented internally in the system. A storage medium may have many file
systems existing in different partitions. This chapter discusses the structure of
the UNIX file system and file system-related system calls to manipulate files.

System calls and library functions for I/O

Kernel data structures used to handle all opened files

File access permission

Standard files for maintain user passwords and aging information

Structure and operations on the UNIX file system

Know how the UNIX operating system organizes files in secondary storage

Understand the file-related activities such as naming, retrieval, and sharing

Learn how the file protection policies are implemented in UNIX operating
system

File input/output

File input/output (I/O) is an important function of any operating system, and file
input is performed to provide information to the executing process to manipulate
existing information. File output is performed to permanently store either firsttime created information or updated information through a UNIX process. UNIX
maintains some Kernel data structures to manage FILE I/O. These data
structures store Metadata required to access and update all files opened in the
system. UNIX FILE I/O is performed using either C standard library functions
or UNIX system call. In this section, we are discussing various system calls to
perform UNIX FILE I/O.

Kernel data structures for file input/output

The following three data structures are used to manage opened files in the UNIX
file system:

The Kernel file table: The file table contains an entry for each file opened
by any process. It is a global data structure that keeps track of bytes offset
during read and write operations; each entry in this file contains flags to
indicate read/write access, blocking/no blocking, and so on, and an entry
contains a pointer to the v-node table entry for the file. The Kernel file table
contains a reference count, which shows how many times the file is opened.

Per-process file descriptor table: It monitors all opened files for a process.
Each entry contains a pointer to the Kernel file table. A file descriptor used
in read, write, and other system calls is an index in this table. The file
descriptor is an unsigned positive number with negative values being
reserved to indicate “no value”, or error conditions. Values 0, 1, and 2 are
reserved for “standard input”, “standard output”, and standard error,
respectively.

The in-core table: The in-core table holds an in-memory copy of the i-node
of each open file.

Figure 2.1: Kernel data structures for files

Whenever a file is opened in any process, a corresponding entry is made in the
file table, the file’s I-node table entry is copied to v-node table, and an entry is
made in the per-process file descriptor table. When a process closes a file, the
Kernel deletes the entry, which refers to the file from the per-process file table
and decrements the reference count in the Kernel file table. If the reference count
becomes zero, the Kernel file table entry is deleted, and the file is closed.

When a process is forked, a copy of its parent’s per-process file table is created.
The parent and child share the same file pointer.

On the other hand, the same file can be opened more than once by the same
process or different processes. In that case, each open results in a different entry
in the global file table. Each of these has its own current position pointer.
Closing one has no effect on the others.

System call for UNIX file I/O

UNIX provides system calls for basic file I/O, such as for opening, creating,
closing, and reading writing operations.

Kernel refers to all the opened files by file descriptors. The file descriptor is a
unique integer number assigned to all opened files in the operating system.
When an existing file is opened, or a new file is created, Kernel returns a file
descriptor to the process. This file descriptor is further used for other file
operations like read and write.

The open function

The open() is used to open an existing file for reading and writing. If the file
does not already exist, it also creates a new file for further file operations.

The syntax for the open function is as follows:
int open (char*pathname, int oflag, int mode);

If the file is opened successfully, the open function returns a file descriptor for
the file. (If not, the return value is –1.) All of the other system calls use a file

descriptor (rather than its name) to refer to a file.

The first argument is the name of the file to be opened. oflag contains the
following 1-bit flags to indicate how the file is to be opened:

O_RDONLY /* open for reading only. */

O_WRONLY /* open for writing only. */

O_RDWR

/* open for reading and writing. */

O_APPEND /* open in append mode (initializes the position pointer to the end
of the file instead of the beginning). */

O_CREAT . /* create the file if it does not exist. */

O_TRUNC /* if the file exists and is opened for either writing or read/write,
truncate its length to 0. */

The third argument is used only if a file is created. It is used to set the
permission bits for the new file.

Static char msg = “greeting message”;
char buffer[80];
fd = open(“dfile.dat”, O_RDWR | O_CREAT | O_EXCL |
S_IREAD
S_IWRITE);
if (fd != -1)
printf(“datafile opened\n”);
write(fd,msg, sizeof(msg))
printf(“data file already exists”);

In the given example, a file is created to write a greeting message. If the file
already exists, a message or data file that already exists will be printed.

The close function

The process closes a file when it is no longer required. Closeting file releases all
locks on the file that the process may have. Kernel decreases the reference count
of the file in the file table. If the reference count reaches to 0, then Kernel frees
the file table entry and releases the in-core memory allocated at the time of
opening the file.

When a process terminates, the Kernel automatically terminates all the opened
files in that process.

The syntax for close function is as follows:
int close(int fd);

Where fd is the file descriptor for the file. It returns 0 on success and –1 on error.

The creat function

The creat() system call creates a new empty file in the file system. It creates a
file table entry. If a file with the same name already exists, Kernel releases all the
data blocks and sets file size equal to 0 subject to the suitable access permission.
Kernel assigns a new I-node to a newly created file and creates an entry in the
parent directory.

int creat(char*pathname, int mode);

Equivalent to:
open(pathname, O_RDWR | O_CREAT | O_TRUNC, mode);

The creat function opens the newly created file in write mode only. It sets and
returns the first unused file descriptor. On failure, it returns -1.

fd = creat(“datafile.dat”, S_IREAD | S_IWRITE);
if(fd != -1)
printf(“datafile.dat opened for read/write access\n”);
printf(“Error in opening datafile.dat\n”);

In the given example, a file is created for reading and writing access both. The
newly created file is always opened in WRITE mode. If the error occurs, the
program prints the message Error in opening datafile.dat.

The read function

Read system call is used to read data from an opened file. If the read is
successful, the number of bytes read is written. If the end of the file is
encountered, 0 is written. To begin reading from a file, Kernel sets various I/O
parameters such as I/O mode, a flag to indicate that the I/O will go to user
address space, a count field to indicate the number of bytes to read, the target
address of the user data buffer, and offset field to indicate the byte offset into the
file where the I/O should begin.

ssize_t read(int fd, void *buff, size_t nbytes);

#include <cntl.h>

/* defines options flags */

#include <;sys/types.h>

/* defines types used by sys/stat.h */

/* defines S_IREAD &amp; S_IWRITE */

static char message[] = “File programming in C”;
char buffer[80];

fd = open(“datafile.dat”,O_RDWR | O_CREAT | O_EXCL, S_IREAD |
S_IWRITE);
if (fd != -1)
printf(“datafile.dat opened for read/write access\n”);
write(fd, message, sizeof(message));

lseek(fd, 0L, 0);

/* go back to the beginning of the file */

if (read(fd, buffer, sizeof(message)) == sizeof(message))
printf(“ Contents of the datafile are %s\n”, buffer);
printf(“Error in reading datafile\n”);
close (fd);
printf(“\n File already exists\n”);

In the given example, it first creates a file both for reading and writing. If the file
is already existing with the same name, it prints a message File already exists.
Once the file is created, the message File programming in C is written into it. In
the next step, the file pointer is set to the beginning of the file, and the read
operation is performed. It checks if the contents read are the same as the
message; it prints the message; otherwise, an error message is printed.

The write function

The write function writes data from the buffer to the file. The number of bytes to
be written is given as the third argument to the system call. On success number
of bytes written is returned. On error -1 is written.

If the value of the third argument is zero and the file descriptor refers to a regular
file, 0 may be returned, or an error could be detected. For a special file, the
results are not portable.

int write(int fd, void*buffer, int nbytes);

Where:

First argument: fd represents file descriptor.

Second argument: Temporary buffer contains data to write on the file.

Third argument: Size of data in bytes.

The lseek function

The lseek() function sets the current position of the file pointer. If successful,
lseek returns the new position; else, it returns -1.

int lseek(int fd, int offset, int whence);

Where fd is the file descriptor of the file in which the file pointer will be set;
offset is the number of bytes by which the pointer will be adjusted; hence, maybe
one of the following:

SEEK_SET offset is from the beginning of the file.

SEEK_CUR offset is from the current position.

SEEK_END offset if from the end of the file.

Whence maybe 0, 1, or 2, respectively, for SEEK_SET, SEEK_CUR, and
SEEK_END.

#include <fcntl.h>

long position;

fd = open(“datafile.dat”, O_RDONLY);
if ( fd != -1)
position = lseek(fd, 0L, 2); /* seek 0 bytes from end-of-file */
if (position != -1)
printf(“The length of datafile.dat is %ld bytes.\n”, position);
perror(“lseek error”);
printf(“can’t open datafile \n”);

In the given example, a file is opened in read-only mode. On error, a message
can’t open datafile will be printed. Once the file is opened successfully, the file
pointer is set to the End of the File.

The link() function

The link() system call links an existing file to a new one. Linking a file in the
UNIX system creates a new directory entry (hard link) that contains the linked
filename and the I-node number of the existing file. All linked files refer to the
same data. Changing content in one file is reflected in all links. In a simple way,
we can say that it makes a new name for a file.

int link(char*original_name, char * new_name)

On success, it returns 0, and on error -1 is returned. The link() system call fails if
any of the following conditions exist:

Original_name does not exist.

New_name does exist.

Original_name is a directory, and the user is not a superuser.

Try to create a link across the file system.

if ((link(“file.old”, “file.new”)) == -1)
perror(“ERROR“);

In the given example, a new name file. New is created for a file. If an error
occurs, it prints ERROR.

The unlink system call

The unlink system call removes a hard link and corresponding directory entry
and decreases the link count of the file. If the link count reaches 0, the contents
of the file are also deleted. If the file is opened by any process, the contents of
the file are not deleted till it is closed. When the process closes the file, the
Kernel removes the contents of the file.

int unlink(const char *pathname)

Where pathname is the name of the linked file which is to be removed. For
unlink() to be successful, the directory containing the corresponding directory
entry must have write and execute permission. On success, 0 is returned, and on
error, -1 is returned.

if ((unlink(“file.old”)) == -1)
perror(“ERROR “);

In the given example, on successful unlinking, the directory entry of the file will
be removed, and on error, an ERROR message will be printed.

The dup() system call

The dup() system call duplicates the file descriptor for a file, which points to the

same file table entry as the old file descriptor does. The dup() system call
generates the lowest available file descriptor. Both the file descriptors share the
same file offset and status flags (read, write, and append).

int dup(int fd)

This system call returns a new file descriptor for the file. Both file descriptors
can be interchangeably used to edit the file.

#include <fcntl.h>
fd = open(“file.dat”,O_WRONLY | O_CREAT, S_IREAD | S_IWRITE );
if (fd == -1)
perror(“FILE already opened”);

exit (1);
close(1);

/* close standard output */

dup(fd);

/* fd will be duplicated */

/* close the extra slot */

printf(“Hello\n”);
exit(0); }

In the given example, the file is created in write-only mode. If it already exists,
an error occurs, and FILE already opened message is printed. The file is
duplicated, and both the standard output and original file are closed afterward.
The only opened file is the second one, and Hello message is printed on this.

The stat and fstat system calls

The stat() and fstat() system calls give the status of files. These system calls
return information such as file owner, i-node number, file type, file size, access
permission, and file access time.

int stat(const char *pathname, struct stat *buf);
int fstat(int fd, struct stat *buf);
int lstat(const char *oathname, struct stat *buf);

Where:

buf is the address of the data structure in the user process that contains the
status information of the file. These system calls simply write fields of the inode table into the buf.

The fstat system call to obtain information about the file that is already open on
the descriptor fd. A Stat system call gives information about a file specified in
the pathname; lstat system call is the same as a stat system call.

Stat structure contains following information:
dev_t

st_dev

/* Device ID of device containing file. */

ino_t

st_ino

/* File serial number. */

mode_t st_mode /* Mode of file (see below). */
nlink_t st_nlink

/* Number of hard links to the file. */

uid_t

st_uid

/* User ID of file. */

gid_t

st_gid

/* Group ID of file. */

dev_t

st_rdev

/* Device ID (if file is character or block special). */

off_t

st_size

/* For regular files, the file size in bytes.

For symbolic links, the length in bytes of the
pathname contained in the symbolic link.
For a shared memory object, the length in bytes.

For a typed memory object, the length in bytes.
For other file types, the use of this field is
unspecified. */
time_t st_atime

/* Time of last access. */

time_t st_mtime /* Time of last data modification. */
time_t st_ctime /* Time of last status change. */
blksize_t st_blksize /*A file system-specific preferred I/O block size for
this object. In some file system types, this may
vary from file to file. */
blkcnt_t st_blocks /* Number of blocks allocated for this object. */

BASIC file permission

In UNIX, each file can be accessed by different users as per the permission
assigned to them. Each user is identified by a unique number, known as User_Id.
The user who has created the file is the owner of the file. Users can also belong
to a group. All members of the group share the same file permissions. Users who
are neither owners nor belong to the group are known as others. The file owner
can provide the file access permissions to the group members and other users.
The file access permissions may read (r), write (w), or execute (x). the ls –l
command may be used to see the assigned access permission given to the
various files in the directory.

>ls -l /usr/bin/new1
-rwxr-xr-x

1 user1 use1
