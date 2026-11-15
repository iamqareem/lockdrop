---
id: lpi-102-500-07
title: "LPIC-1 · 102-500 — What will the command below do?, Which of the following is a…",
slug: lpi-102-500-07-lpic-1-102-500-what-will-the-command-below-do-which-of-the-f
source: "LPI Learning Material — LPIC-1 (Exam 102-500)",
sourceSection: "1. What will the command below do?, 4. Which of the following is a proper /etc/hosts entry?, 3. Considering the following /etc/resolv.conf why isn’t the system resolving names through, 1. What will the command below do?, Topic 110: Security, 402. F.... apache2, 404. F.... apache2, 405. F.... apache2"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "The getent command is a great tool to see the results of resolver calls. Covers 33 sections: What will the command below do?, Which of the following is a proper /etc/hosts entry?, Considering the following /etc/re.",
---
# LPIC-1 · 102-500 — What will the command below do?, Which of the following is a…

## 4. Which of the following is a proper /etc/hosts entry?
::1 localhost
localhost 127.0.0.1
5. Which option to getent is used to specify which data source should be used to perform a
lookup?

473

1. If you were to edit the /etc/resolv.conf below with a text editor, what is likely to happen?
nameserver 192.168.1.20

The changes will be overwritten by
NetworkManager.
NetworkManager will update its configuration
with your changes.
Your changes won’t affect the system.
NetworkManager will be disabled.
2. What does the following line in /etc/nsswitch.conf mean:
hosts: files [SUCCESS=continue] dns

## 3. Considering the following /etc/resolv.conf why isn’t the system resolving names through
DNS?
search lpi.org
#nameserver fd00:ffff::1:53
#nameserver 10.0.1.53

4. What does the command dig +noall +answer +question lpi.org do?

5. How can you override the defaults of dig without specifying them on the command line?

474

The getent command is a great tool to see the results of resolver calls. For simple DNS queries,
host is easy to use and produces straightforward output. If you need detailed information or need
to fine tune a DNS query, dig is most likely your best bet.
Due to the ability to add shared library plugins and configure the resolver behavior, Linux has
excellent support for name and number resolution of various types. The getent program can be
used to resolve names using the resolver libraries. host and dig can be used to query DNS
servers.
The file /etc/nsswitch.conf is used to configure the resolver behavior. You are able to change
data sources and add some simple conditional logic for name types with multiple sources.
DNS is configured by editing /etc/resolv.conf. Many distributions have tools that manage this
file for you, so make sure to check your system’s documentation if manual changes aren’t
persisting.
The /etc/hosts file is used to resolve host names to IPs and vice versa. It is typically used to
define names, such as localhost, that aren’t available through DNS.
It is possible to leave comments in the configuration files covered in this lesson. Any text to the
right of # is ignored by the system.

475

## 1. What will the command below do?
getent group openldap

It will read /etc/nsswitch.conf, lookup the openldap group from the sources listed, and
display information about it if it is found.
2. What is the biggest difference between getent and the other tools covered, host and dig?
getent looks up names using the resolver libraries, the others just query DNS. getent can be
used to troubleshoot your /etc/nsswitch.conf and the configuration of name resolution
libraries your system is configured to use. host and dig are used to lookup DNS records.
3. Which option to dig and host is used to specify the type of record you wish to retrieve?
Both programs use -t to specify the type of record you wish to look up.
4. Which of the following is a proper /etc/hosts entry?
::1 localhost

localhost 127.0.0.1
::1 localhost is the correct line. The left column is always an IPv4 or IPv6 address.
5. Which option to getent is used to specify which data source should be used to perform a
lookup?
The -s option is used to specify the data source. For example:
$ getent -s files hosts learning.lpi.org
192.168.10.25

$ getent -s dns hosts learning.lpi.org
208.94.166.198

476

1. If you were to edit the /etc/resolv.conf below with a text editor, what is likely to happen?
nameserver 192.168.1.20

The changes will be overwritten by
NetworkManager.

NetworkManager will update its configuration
with your changes.
Your changes won’t affect the system.
NetworkManager will be disabled.
2. What does the following line in /etc/nsswitch.conf mean:
hosts: files [SUCCESS=continue] dns

Lookups for host names will check your /etc/hosts files first and then DNS. If an entry found
is found in files and DNS, the entry in DNS will be used.
3. Considering the following /etc/resolv.conf why isn’t the system resolving names through
DNS?
search lpi.org
#nameserver fd00:ffff::1:53
#nameserver 10.0.1.53

Both DNS servers are commented out and there is no DNS server running on the local host.
4. What does the command dig +noall +answer +question lpi.org do?
It looks up the A record for lpi.org and displays only the query and response.
5. How can you override the defaults of dig without specifying them on the command line?
You create a .digrc file in your home directory.

477

## Topic 110: Security

478

### 110.1 Perform security administration tasks
LPIC-1 version 5.0, Exam 102, Objective 110.1
- Audit a system to find files with the suid/sgid bit set.
- Set or change user passwords and password aging information.
- Being able to use nmap and netstat to discover open ports on a system.
- Set up limits on user logins, processes and memory usage.
- Determine which users have logged in to the system or are currently logged in.
- Basic sudo configuration and usage.
- find
- passwd
- fuser
- lsof
- nmap
- chage
- netstat
- sudo

479

- /etc/sudoers
- su
- usermod
- ulimit
- who, w, last

480

### 110.1 Lesson 1

### 110.1 Perform security administration tasks

Security is a must in system administration. As a good Linux sysadmin you have to keep an eye on
a number of things such as special permissions on files, user password aging, open ports and
sockets, limiting the use of system resources, dealing with logged-in users, and privilege escalation
through su and sudo. In this lesson we will be reviewing each one of these topics.

Checking for Files with the SUID and SGID Set
Aside from the traditional permission set of read, write and execute, files in a Linux system may
also have some special permissions set such as the SUID or the SGID bits.
The SUID bit will allow the file to be executed with the privileges of the file’s owner. It is
numerically represented by 4000 and symbolically represented by either s or S on the owner’s
execute permission bit. A classic example of an executable file with the SUID permission set is
passwd:
carol@debian:~$ ls -l /usr/bin/passwd

481

-rwsr-xr-x 1 root root 63736 jul 27

2018 /usr/bin/passwd

The lowercase s in rws indicates the presence of the SUID on the file — together with the execute
permission. An uppercase S instead (rwS) would mean the underlying execute permission is not
set.

You will learn about passwd in the next section. The utility is mostly used by root
to set/change users' passwords (e.g.: passwd carol). However, regular users can
use it to change their own passwords, too. Therefore it comes with the SUID set.

On the other hand, the SGID bit can be set both on files and directories. With files, its behaviour is
equivalent to that of SUID but the privileges are those of the group owner. When set on a
directory, however, it will allow all files created therein to inherit the ownership of the directory’s
group. Like SUID, SGID is symbollically represented by either s or S on the group’s execute
permission bit. Numerically, it is represented by 2000. You can set the SGID on a directory by
using chmod. You have to add 2 (SGID) to the traditional permissions (755 in our case):
carol@debian:~$ ls -ld shared_directory
drwxr-xr-x 2 carol carol 4096 may 30 23:55 shared_directory
carol@debian:~$ sudo chmod 2755 shared_directory/
carol@debian:~$ ls -ld shared_directory
drwxr-sr-x 2 carol carol 4096 may 30 23:55 shared_directory

To find files with either or both the SUID and SGID set you can use the find command and make
use of the -perm option. You can use both numeric and symbolic values. The values — in
turn — can be passed on their own or preceded by a dash (-) or a forward slash (/). The meaning
is as follows:
-perm numeric-value or -perm symbolic-value
find files having the special permission exclusively
-perm -numeric-value or -perm -symbolic-value
find files having the special permission and other permissions
-perm /numeric-value or -perm /symbolic-value
find files having either of the special permission (and other permissions)
For example, to find files with only SUID set in the present working directory, you will use the

482

carol@debian:~$ find . -perm 4000
carol@debian:~$ touch file
carol@debian:~$ chmod 4000 file
carol@debian:~$ find . -perm 4000
./file

Note how — as there were not any files having exclusively the SUID — we created one to show
some output. You can run the same command in symbolic notation:
carol@debian:~$ find . -perm u+s
./file

To find files matching SUID (irrespective of any other permssions) in the /usr/bin/ directory,
you can use either of the following commands:
carol@debian:~$ sudo find /usr/bin -perm -4000
/usr/bin/umount
/usr/bin/newgrp
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/mount
/usr/bin/passwd
/usr/bin/chsh
/usr/bin/sudo
/usr/bin/su
carol@debian:~$ sudo find /usr/bin -perm -u+s
/usr/bin/umount
/usr/bin/newgrp
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/mount
/usr/bin/passwd
/usr/bin/chsh
/usr/bin/sudo
/usr/bin/su

If you are looking for files in the same directory with the SGID bit set, you can execute find
/usr/bin/ -perm -2000 or find /usr/bin/ -perm -g+s.
Finally, to find files with either of the two special permissions set, add 4 and 2 and use /:

483

carol@debian:~$ sudo find /usr/bin -perm /6000
/usr/bin/dotlock.mailutils
/usr/bin/umount
/usr/bin/newgrp
/usr/bin/wall
/usr/bin/ssh-agent
/usr/bin/chage
/usr/bin/dotlockfile
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/mount
/usr/bin/passwd
/usr/bin/chsh
/usr/bin/expiry
/usr/bin/sudo
/usr/bin/bsd-write
/usr/bin/crontab
/usr/bin/su

Password Management and Aging
As noted above you can use the passwd utility to change your own password as a regular user.
Additionally, you can pass the -S or --status switch to get status information about your
account:
carol@debian:~$ passwd -S
carol P 12/07/2019 0 99999 7 -1

Here is a breakdown of the seven fields you get in the output:
User’s login name.
P
It indicates that the user has a valid password (P); other possible values are L for a locked
password and NP for no password.
12/07/2019
Date of the last password change.

484

Minimum age in days (the minimum number of days between password changes). A value of 0
means the password may be changed at any time.
99999
Maximum age in days (the maximum number of days the password is valid for). A value of
99999 will disable password expiration.
Warning period in days (the number of days prior to password expiration that a user will be
warned).
-1
Password inactivity period in days (the number of inactive days after password expiration
before the account is locked). A value of -1 will remove an account’s inactivity.
Apart from reporting on account status, you will use the passwd command as root to carry out
some basic account maintenance. You can lock and unlock accounts, force a user to change their
password on the next login and delete a user’s password with the -l, -u, -e and -d options,
respectively.
To test these options it is convenient to introduce the su command at this point. Through su you
can change users during a login session. So, for example, let us use passwd as root to lock carol's
password. Then we will switch to carol and check our account status to verify that the password
has — in fact — been locked (L) and cannot be changed. Finally, going back to the root user, we
will unlock carol's password:
root@debian:~# passwd -l carol
passwd: password expiry information changed.
root@debian:~# su - carol
carol@debian:~$ passwd -S
carol L 05/31/2020 0 99999 7 -1
carol@debian:~$ passwd
Changing password for carol.
Current password:
passwd: Authentication token manipulation error
passwd: password unchanged
carol@debian:~$ exit
logout
root@debian:~# passwd -u carol
passwd: password expiry information changed.

485

Alternatively, you can also lock and unlock a user’s password with the usermod command:
Lock user carol's password
usermod -L carol or usermod --lock carol.
Unlock user carol's password
usermod -U carol or usermod --unlock carol.

With the -f or --inactive switches, usermod can also be used to set the number
of days before an account with an expired password is disabled (e.g.: usermod -f
3 carol).

Aside from passwd and usermod, the most direct command to deal with password and account
aging is chage (“change age”). As root, you can pass chage the -l (or --list) switch followed by
a username to have that user’s current password and account expiry information printed on the
screen; as a regular user, you can view your own information:
carol@debian:~$ chage -l carol
Last password change

: Aug 06, 2019

Password expires

Password inactive

Minimum number of days between password change

: 0

Maximum number of days between password change

: 99999

Number of days of warning before password expires

: 7

Run without options and only followed by a username, chage will behave interactively:
root@debian:~# chage carol
Changing the aging information for carol
Enter the new value, or press ENTER for the default
Minimum Password Age [0]:
Maximum Password Age [99999]:
Last Password Change (YYYY-MM-DD) [2020-06-01]:
Password Expiration Warning [7]:
Password Inactive [-1]:
Account Expiration Date (YYYY-MM-DD) [-1]:

The options to modify the different chage settings are as follows:

486

-m days username or --mindays days username
Specify minimum number of days between password changes (e.g.: chage -m 5 carol). A
value of 0 will enable the user to change his/her password at any time.
-M days username or --maxdays days username
Specify maximum number of days the password will be valid for (e.g.: chage -M 30 carol).
To disable password expiration, it is customary to give this option a value of 99999.
-d days username or --lastday days username
Specify number of days since the password was last changed (e.g.: chage -d 10 carol). A
value of 0 will force the user to change their password on the next login.
-W days username or --warndays days username
Specify number of days the user will be reminded of their password being expired.
-I days username or --inactive days username
Specify number of inactive days after password expiration (e.g.: chage -I 10 carol) — the
same as usermod -f or usermod --inactive. Once that number of days has gone by, the
account will be locked. With a value of 0, the account will not be locked, though.
-E date username or --expiredate date username
Specify date (or number of days since the epoch — January, 1st 1970) on which the account will
be locked. It is normally expressed in the format YYYY-MM-DD(e.g.: chage -E 2050-12-13
carol).

You can learn more about passwd, usermod and chage — and their options — by
consulting their respective manual pages.

Discovering Open Ports
When it comes to keeping an eye on open ports, four powerful utilities are present on most Linux
systems: lsof, fuser, netstat and nmap. We will cover them in this section.
lsof stands for “list open files”, which is no small thing considering that — for
Linux — everything is a file. In fact, if you type lsof into the terminal, you will get a large listing
of regular files, device files, sockets, etc. However, for the sake of this lesson, we will mainly focus
on ports. To print the listing of all “Internet” network files, run lsof with the -i option:
root@debian:~# lsof -i
COMMAND

PID

487

dhclient 357

7u

13493

UDP *:bootpc

13689

4u

13700

apache2

399

13826

TCP *:http (LISTEN)

apache2

401 www-data

13826

TCP *:http (LISTEN)

apache2

402 www-data

13826

TCP *:http (LISTEN)

569

Apart from the bootpc service — which is used by DHCP — the ouput shows two services listening
for connections — ssh and the Apache web server (http) — as well as two established SSH
connections. You can specify a particular host with the @ip-address notation to check for its
connections:
root@debian:~# lsof -i@192.168.1.7
COMMAND PID

569 carol

To print only IPv4 and IPv6 network files, use the -i4 and -i6 options respectively.

Likewise, you can filter by port by passing the -i (or -i@ip-address) option the :port
argument:
root@debian:~# lsof -i :22
COMMAND PID

13689

4u

13700

569 carol

Multiple ports are separated by commas (and ranges are specified using a dash):
root@debian:~# lsof -i@192.168.1.7:22,80
COMMAND PID

488

705

13960

TCP 192.168.1.7:ssh->192.168.1.4:44766

13960

TCP 192.168.1.7:ssh->192.168.1.4:44766

718 carol

The amount of options available to lsof is quite impressive. To find out more,
consult its manual page.

Next on the list of network commands is fuser. Its main purpose is to find a “file’s user” — which
involves knowing what processes are accessing what files; it also gives you some other
information such as the type of access. For example, to check on the current working directory, it
is sufficient to run fuser . However, to get a little more information, it is convenient to use the
verbose (-v or --verbose) option:
root@debian:~# fuser .
/root:

580c

root@debian:~# fuser -v .
/root:

PID ACCESS COMMAND

580 ..c.. bash

Let us break down the output:
File
The file we are getting information about (/root).
USER Column
The owner of the file (root).
PID Column
The process identifier (580).
ACCESS Column
Type of access (..c..). One of:
c
Current directory.
e
Executable being run.

489

f
Open file (omitted in default display mode).
F
Open file for writing (omitted in default display mode).
r
root directory.
m
mmap’ed file or shared library.
Placeholder (omitted in default display mode).
COMMAND Column
The command affiliated with the file (bash).
With the -n (or --namespace) option, you can find information about network ports/sockets. You
must also supply the network protocol and port number. Thus, to get information about the
Apache web server you will run the following command:
root@debian:~# fuser -vn tcp 80
80/tcp:

PID ACCESS COMMAND

## 402. F.... apache2

www-data

## 404. F.... apache2

www-data

## 405. F.... apache2

fuser can be also be used to kill the processes accessing the file with the -k or
--kill switches (e.g.: fuser -k 80/tcp). Refer to the manual page for more
detailed information.

Let us turn to netstat now. netstat is a very versatile network tool that is mostly used to print
“network statistics”.
Run without options, netstat will display both active Internet connections and Unix sockets.
Because of the size of the listing, you may want to pipe its output through less:
carol@debian:~$ netstat |less
Active Internet connections (w/o servers)

490

0 192.168.1.7:ssh

192.168.1.4:55444

ESTABLISHED

Active UNIX domain sockets (w/o servers)
Proto RefCnt Flags

Type

unix

[ ]

unix

[ ]

I-Node

Path

DGRAM

10509

/run/systemd/journal/syslog

DGRAM

10123

/run/systemd/notify

To list only “listening” ports and sockets, you will use the -l or --listening options. The -t/
--tcp and -u/--udp options can be added to filter by TCP and UDP protocol, respectively (they
can also be combined in the same command). Likewise, -e/--extend will display additional
information:
carol@debian:~$ netstat -lu

0 0.0.0.0:bootpc

carol@debian:~$ netstat -lt

0 0.0.0.0:ssh

0 [::]:http

0 [::]:ssh

carol@debian:~$ netstat -lute
Inode

0 0.0.0.0:ssh

0 [::]:http

0 [::]:ssh

0 0.0.0.0:bootpc

13729
14372
14159
13740
14374

13604

If you omit -l option, only established connections will be shown:

491

carol@debian:~$ netstat -ute
Active Internet connections (w/o servers)

192.168.1.4:39144

ESTABLISHED root

Inode

0 192.168.1.7:ssh

15103

If you are only interested in numerical information concerning ports and hosts, you can use the
-n or --numeric option to print only port numbers and IP addresses. Note how ssh turns into to
22 when adding -n to the command above:
carol@debian:~$ netstat -uten
Active Internet connections (w/o servers)

192.168.1.4:39144

ESTABLISHED 0

Inode

0 192.168.1.7:22

15103

As you can see, you can make very useful and productive netstat commands by combining some
of its options. Browse through the man pages to learn more and find the combinations that best
suit your needs.
Finally, we will introduce nmap — or the “network mapper”. Another very powerful utility, this
port scanner is executed by specifying an IP address or hostname:
root@debian:~# nmap localhost
Starting Nmap 7.70 ( https://nmap.org ) at 2020-06-04 19:29 CEST
Host is up (0.0000040s latency).
Not shown: 998 closed ports

80/tcp open

http

Nmap done: 1 IP address (1 host up) scanned in 1.58 seconds

Aside from a single host, nmap allows you to scan:

492

multiple hosts
by separating them by spaces (e.g.: nmap localhost 192.168.1.7).
host ranges
by using a dash (e.g.: nmap 192.168.1.3-20).
subnets
by using a wildcard or CIDR notation (e.g.: nmap 192.168.1.* or nmap 192.168.1.0/24).
You can exclude particular hosts (e.g.: nmap 192.168.1.0/24 --exclude 192.168.1.7).
To scan a particular port, use the -p switch followed by the port number or service name (nmap
-p 22 and nmap -p ssh will give you the same output):
root@debian:~# nmap -p 22 localhost
Starting Nmap 7.70 ( https://nmap.org ) at 2020-06-04 19:54 CEST
Host is up (0.000024s latency).

Nmap done: 1 IP address (1 host up) scanned in 0.22 seconds

You can also scan multiple ports or port ranges by using commas and dashes, respectively:
root@debian:~# nmap -p ssh,80 localhost
Starting Nmap 7.70 ( https://nmap.org ) at 2020-06-04 19:58 CEST
Host is up (0.000051s latency).

80/tcp open

http

Nmap done: 1 IP address (1 host up) scanned in 0.22 seconds

root@debian:~# nmap -p 22-80 localhost
Starting Nmap 7.70 ( https://nmap.org ) at 2020-06-04 19:58 CEST

493

Host is up (0.000011s latency).
Not shown: 57 closed ports

80/tcp open

http

Nmap done: 1 IP address (1 host up) scanned in 1.47 seconds

Two other important and handy nmap options are:
-F
Run a fast scan on the 100 most common ports.
-v
Get verbose output (-vv will print even more verbose output).

nmap can run quite complex commands by making use of scan types. However, that
topic is outside of the scope of this lesson.

Limits on Users Logins, Processes and Memory Usage
Resources on a Linux system are not unlimited so — as a sysadmin — you should ensure a good
balance between user limits on resources and the proper functioning of the operating system.
ulimit can help you out in that regard.
ulimit deals with soft and hard limits — specified by the -S and -H options, respectively. Run
without options or arguments, ulimit will display the soft file blocks of the current user:
carol@debian:~$ ulimit
unlimited

With the -a option, ulimit will show all current soft limits (the same as -Sa); to display all
current hard limits, use -Ha:
carol@debian:~$ ulimit -a
core file size

(blocks, -c) 0

data seg size

(kbytes, -d) unlimited

scheduling priority

(-e) 0

carol@debian:~$ ulimit -Ha

494

core file size

(blocks, -c) unlimited

data seg size

(kbytes, -d) unlimited

scheduling priority

(-e) 0

The available shell resources are specified by options such as:
-b
maximum socket buffer size
maximum size of files written by the shell and its children
maximum size that may be locked into memory
maximum resident set size (RSS) — the current portion of memory held by a process in main
memory (RAM)
-v
maximum amout of virtual memory
maximum number of processes available to a single user
Thus, to display limits you will use ulimit followed by either -S (soft) or -H(hard) and the
resource option; if neither -S or -H is supplied, soft limits will be shown:
carol@debian:~$ ulimit -u
10000
carol@debian:~$ ulimit -Su
10000
carol@debian:~$ ulimit -Hu
15672

Likewise, to set new limits on a particular resource you will specify either -S or -H, followed by
the corresponding resource option and the new value. This value can be a number or the special
words soft (current soft limit), hard (current hard limit) or unlimited (no limit). If neither -S or
-H is specified, both limits will be set. For example, let us first read the current maximum size
value for files written by the shell and its children:

495

root@debian:~# ulimit -Sf
unlimited
root@debian:~# ulimit -Hf
unlimited

Now, let us change the value from unlimited to 500 blocks without specifying either -S or -H.
Note how both the soft and hard limits are changed:
root@debian:~# ulimit -f 500
root@debian:~# ulimit -Sf
root@debian:~# ulimit -Hf

Finally, we will decrease only the soft limit to 200 blocks:
root@debian:~# ulimit -Sf 200
root@debian:~# ulimit -Sf
200
root@debian:~# ulimit -Hf

Hard limits can only be increased by the root user. On the other hand, regular users can decrease
hard limits and increase soft limits up to the value of hard limits. To make new limit values
persistent across reboots, you must write them to the /etc/security/limits.conf file. This is
also the file used by the administrator to apply restrictions on particular users.

Be warned that there is no ulimit man page as such. It is a bash builtin so you
have to refer to bash man page to learn about it.

Dealing with Logged in Users
Another of your jobs as a sysadmin entails keeping track of logged-in users. There are three
utilities that can help you out with those tasks: last, who and w.
last prints a listing of the last logged in users with the most recent information on top:
root@debian:~# last

6 14:25

still logged in

reboot

system boot

4.19.0-9-amd64

6 14:24

still running

496

6 12:07 - 14:24

(02:16)

reboot

system boot

4.19.0-9-amd64

6 12:07 - 14:24

(02:17)

wtmp begins Sun May 31 14:14:58 2020

Considering the truncated listing, we get information about the last two users on the system. The
first two lines tell us about user carol; the next two lines, about user mimi. The information is as
follows:
1. User carol at terminal pts/0 from host 192.168.1.4 started her session on Sat Jun 6 at
14:25 and is still logged in. The system — using kernel 4.19.0-9-amd64 — was started
(reboot system boot) on Sat Jun 6 at 14:24 and is still running.
2. User mimi at terminal pts/0 from host 192.168.1.4 started her session on Sat Jun 6 at
12:07 and logged out at 14:24 (the session lasted a total of (02:16) hours). The
system — using kernel 4.19.0-9-amd64 — was started (reboot system boot) on Sat Jun 6
at 12:07 and was powered off at 14:24 (it was up and running for (02:17) hours).

The line wtmp begins Sun May 31 14:14:58 2020 refers to /var/log/wtmp,
which is the special log file from which last gets the information.

You can pass last a username to have only entries for that user displayed:
root@debian:~# last carol

6 14:25

6 12:07 - 14:24

still logged in
(02:16)

Fri Jun

5 00:48 - 01:28

(00:39)

Regarding the second column (terminal), pts stands for Pseudo Terminal Slave — as opposed to a
proper TeleTYpewriter or tty terminal; 0 refers to the first one (the count starts at zero).

To check for bad login attempts, run lastb instead of last.

The who and w utilities focus on currently logged in users and are quite similar. The former
displays who is logged on, while the latter also shows information on what they are doing.
When executed with no options, who will display four columns corresponding to logged-in user,
terminal, date and time, and hostname:
root@debian:~# who

2020-06-06 17:16 (192.168.1.4)

497

2020-06-06 17:28 (192.168.1.4)

who accepts a series of options, among which we can highlight the following:
-b,--boot
Display time of last system boot.
-r,--runlevel
Display current runlevel.
-H,--heading
Print column headings.
Compared to who, w gives a little more verbose output:
root@debian:~# w
17:56:12 up 40 min,

2 users,

TTY

FROM

load average: 0.04, 0.12, 0.09
LOGIN@

IDLE

JCPU

PCPU WHAT

17:16

1.00s

0.15s

0.05s sshd: carol [priv]

17:28

15:08

0.05s

0.05s -bash

The top line gives you information about the current time (17:56:12), how long the system has
been up and running (up 40 min), the number of currently logged in users (2 users) and the
load average numbers (load average: 0.04, 0.12, 0.09). These values refer to the number
of jobs in the run queue averaged over the last 1, 5 and 15 minutes, respectively.
Then you find eight columns; let us break them down:
Login name of user.
TTY
Name of terminal the user is on.
FROM
Remote host from which the user has logged on.
LOGIN@
Login time.

498

IDLE
Idle time.
JCPU
Time used by all processes attached to the tty (including currently running background jobs).
PCPU
Time used by current process (the one showing under WHAT).
WHAT
Command line of current process.
Just like with who, you can pass w usernames:
root@debian:~# w mimi
18:23:15 up

1:07,

2 users,

load average: 0.00, 0.02, 0.05

TTY

FROM

LOGIN@

IDLE

JCPU

PCPU WHAT

17:28

9:23

0.06s

0.06s -bash

Basic sudo Configuration and Usage
As already noted in this lesson, su lets you switch to any other user in the system as long as you
provide the target user’s password. In the case of the root user, having its password distributed or
known to (many) users puts the system at risk and is a very bad security practice. The basic usage
of su is su - target-username. When changing to root — though — the target username is
optional:
carol@debian:~$ su - root
root@debian:~# exit
logout
carol@debian:~$ su Password:
root@debian:~#

The use of the dash (-) ensures that the target user’s environment is loaded. Without it, the old
user’s environment will be kept:
carol@debian:~$ su

499

root@debian:/home/carol#

On the other hand, there is the sudo command. With it you can execute a command as the root
user — or any other user for that matter. From a security perspective, sudo is a far better option
than su as it presents two main advantages:
1. to run a command as root, you do not need the root user’s password, but only that of the
invoking user in compliance with a security policy. The default security policy is sudoers as
specified in /etc/sudoers and /etc/sudoers.d/*.
2. sudo lets you run single commands with elevated privileges instead of launching a whole new
subshell for root as su does.
The basic usage of sudo is sudo -u target-username command. However, to run a command as
user root, the -u target-username option is not necessary:
carol@debian:~$ sudo -u mimi whoami
carol@debian:~$ sudo whoami

sudoers will use a per-user (and per-terminal) timestamp for credential caching,
so that you can use sudo without a password for a default period of fifteen
minutes. This default value can be modified by adding the timestamp_timeout
option as a Defaults setting in /etc/sudoers (e.g.: Defaults
timestamp_timeout=1 will set credential caching timeout to one minute).

The /etc/sudoers File
sudo's main configuration file is /etc/sudoers(there is also the /etc/sudoers.d directory).
That is the place where users' sudo privileges are determined. In other words, here you will
specify who can run what commands as what users on what machines — as well as other settings.
The syntax used is as follows:
carol@debian:~$ sudo less /etc/sudoers

The privilege specification for the root user is ALL=(ALL:ALL) ALL. This translates as: user root
(root) can log in from all hosts (ALL), as all users and all groups ((ALL:ALL)), and run all
commands (ALL). The same is true for members of the sudo group — note how group names are
identified by a preceding percent sign (%).
Thus, to have user carol be able to check apache2 status from any host as any user or group, you
will add the following line in the sudoers file:

ALL=(ALL:ALL) /usr/bin/systemctl status apache2

You may want to save carol the inconvenience of having to provide her password to run the
systemctl status apache2 command. For that, you will modify the line to look like this:

ALL=(ALL:ALL) NOPASSWD: /usr/bin/systemctl status apache2

Say that now you want to restrict your hosts to 192.168.1.7 and enable carol to run systemctl
status apache2 as user mimi. You would modify the line as follows:

192.168.1.7=(mimi) /usr/bin/systemctl status apache2

Now you can check the status of the Apache web server as user mimi:
carol@debian:~$ sudo -u mimi systemctl status apache2
- apache2.service - The Apache HTTP Server
Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2020-06-09 13:12:19 CEST; 29min ago

If carol was to be promoted to sysadmin and you wanted to give her all privileges, the easiest
approach would be that of including her in the special sudo group with usermod and the -G
option (you may also want to use the -a option, which ensures that the user is not removed from
any other groups they might belong to):
root@debian:~# sudo useradd -aG sudo carol

In the Red Hat family of distributions the wheel group is the counterpart to the

501

special administrative sudo group of Debian systems.
Instead of editing /etc/sudoers directly, you should simply use the visudo command as root
(e.g.: visudo), which will open /etc/sudoers using your predefined text editor. To change the
default text editor, you can add the editor option as a Defaults setting in /etc/sudoers. For
instance, to change the editor to nano, you will add the following line:
Defaults

editor=/usr/bin/nano

Alternatively, you can specify a text editor via the EDITOR environment variable
when using visudo (e.g.: EDITOR=/usr/bin/nano visudo)

Aside from users and groups, you can also make use of aliases in /etc/sudoers. There are three
main categories of aliases that you can define: host aliases (Host_Alias), user aliases
(User_Alias) and command aliases (Cmnd_Alias). Here is an example:
User_Alias REGULAR_USERS = john, mary, alex
User_Alias PRIVILEGED_USERS = mimi
Cmnd_Alias SERVICES = /usr/bin/systemctl *

ADMINS

SERVERS=SERVICES

Considering this sample sudoers file, let us explain the three types of aliases in a bit more detail:

502

Host aliases
They include a comma-separated list of hostnames, IP addresses, as well as networks and
netgroups (preceded by +). Netmasks can be also specified. The SERVERS host alias includes an
IP address and two hostnames:

User aliases
They include a comma-separated list of users specified as usernames, groups (preceded by %)
and netgroups (preceded by +). You can exclude particular users with !. The ADMINS user
alias — for example — includes user carol, the members of the sudo group and those
members of the PRIVILEGE_USERS user alias that do not belong in the REGULAR_USERS user
alias:

Command aliases
They include a comma-separated list of commands and directories. If a directory is specified,
any file in that directory will be included — subdirectories will be ignored, though. The
SERVICES command alias includes a single command with all its subcommands — as specified
by the asterisk (*):
Cmnd_Alias SERVICES = /usr/bin/systemctl *

As a result of the alias specifications, the line ADMINS SERVERS=SERVICES under the User
privilege specification section translates as: all users belonging in ADMINS can use sudo to
run any command in SERVICES on any server in SERVERS.

There is a fourth type of alias that you can include in /etc/sudoers: runas aliases
(Runas_Alias). They are very similar to user aliases, but allow you to specify users
by their user ID (UID). This feature might be convenient in some scenarios.

503

## 1. Complete the following table regarding special permissions:
Special Permission

Numeric

Symbolic

Find files with only
that Permission set

SUID
SGID
2. Displaying files with only the SUID or SGID bit set is normally not very practical. Perform the
following tasks to prove that your searches can be more productive:
- Find all files with the SUID (and other permissions) set in /usr/bin:

- Find all files with the SGID (and other permissions) set in /usr/bin:

- Find all files with either the SUID or the SGID set in /usr/bin:

3. chage lets you change a user’s password expiry information. As root, complete the following
table by providing the correct commands on user mary:

chage Commands

Make password will be valid for 365 days.
Make user change password on next login.
Set minimum number of days between
password changes to 1.
Disable password expiration.
Enable user to change her password at any
Set warning period to 7 days and account
expiration date to August, 20th 2050.
Print user’s current password expiry
information.

504

## 4. Complete the following table with the appropriate network utility:
Action

Show network files for host 192.168.1.55 on
port 22 using lsof.
Show processes accessing the default port of
the Apache web server on your machine with
fuser.
List all listening udp sockets on your machine
using netstat.
Scan ports 80 through 443 on host
192.168.1.55 using nmap.
5. Perform the following tasks concerning resident set size (RSS) and ulimit as a regular user:
- Display soft limits on the maximum RSS:

- Display hard limits on the maximum RSS:

- Set the soft limits on the maximum RSS to 5,000 kilobytes:

- Set the hard limits on the maximum RSS to 10,000 kilobytes:

- Finally, try to increase the hard limit on the maximum RSS up to 15,000 kilobytes. Can you do
it? Why?

## 6. Consider the following last command output line and answer the questions:

Sun May 31 14:16 - 14:22

(00:06)

- Was carol connected from a remote host? Why?

- How long did carol's session last?

505

- Was carol connected through a true classic text-based terminal? Why?

## 7. Consider the following excerpt from /etc/sudoers and answer the question below.
User_Alias REGULAR_USERS = john, mary, alex
User_Alias PRIVILEGED_USERS = mimi
Cmnd_Alias WEB_SERVER_STATUS = /usr/bin/systemctl status apache2

ADMINS

SERVERS=WEB_SERVER_STATUS

Can alex check the status of the Apache Web Server on any host? Why?

506

## 1. Apart from the SUID and SGID, there is a third special permission: the sticky bit. At present it is
mostly used on directories such as /tmp to prevent regular users from deleting or moving files
other than their own. Do the following tasks:
- Set the sticky bit on ~/temporal:

- Find directories with the sticky bit (and any other permissions) set on your home directory:

- Unset the sticky bit on ~/temporal:

## 2. When a user’s password is locked via passwd -l username or usermod -L username, how
can you tell by looking into /etc/shadow?

## 3. What is the usermod command counterpart to chage
--expiredate date username?

-E

date

username or chage

## 4. Provide two different nmap commands to scan all 65535 ports on localhost:

507

In this lesson you have learned how to perform a number of security administration tasks. The
following topics have been covered:
- Finding files with the special SUID and SGID permissions set.
- Setting and changing users' passwords and dealing with password aging information.
- Using a number of network utilities to discover open ports on hosts/networks.
- Setting up limits on system resources.
- Checking on users that have logged in to the system or who are currently logged in.
- Basic sudo usage and configuration (through the /etc/sudoers file).
Commands and files discussed in this lesson:
find
Search for files in a directory hierarchy.
passwd
Change user password.
Change file mode bits.
chage
Change user password expiry information.
lsof
List open files.
fuser
Identify processes using files or sockets.
Print network connections.
nmap
Network exploration tool and port scanner.

508

ulimit
Get and set user limits.
/etc/security/limits.conf
Configuration file to apply restrictions on users.
last
Print a listing of last logged in users.
lastb
Print a listing of bad login attempts.
/var/log/wtmp
Database of user logins.
who
Show who is logged on.
w
Show who is logged on and what they are doing.
Change user or become superuser.
Execute a command as another user (including the superuser).
/etc/sudoers
Default configuration file for sudo security policy.

509

## 1. Complete the following table regarding special permissions:
Special Permission

Numeric

Symbolic

Find files with only
that Permission set

SUID

4000

s,S

find -perm 4000,
find -perm u+s

SGID

2000

s,S

find -perm 2000,
find -perm g+s

## 2. Displaying files with only the SUID or SGID bit set is normally not very practical. Perform the
following tasks to prove that your searches can be more productive:
- Find all files with the SUID (and other permissions) set in /usr/bin:
find /usr/bin -perm -4000 or find /usr/bin -perm -u+s
- Find all files with the SGID (and other permissions) set in /usr/bin:
find /usr/bin -perm -2000 or find /usr/bin -perm -g+s
- Find all files with either the SUID or the SGID set in /usr/bin:
find /usr/bin -perm /6000
3. chage lets you change a user’s password expiry information. As root, complete the following
table by providing the correct commands on user mary:

510

chage Commands

Make password will be valid for 365 days.

chage -M 365 mary, chage --maxdays 365

Make user change password on next login.

chage -d 0 mary, chage --lastday 0

Set minimum number of days between
password changes to 1.

chage -m 1 mary, chage --mindays 1

Disable password expiration.

chage -M 99999 mary, chage --maxdays
99999 mary

chage Commands

Enable user to change her password at any

chage -m 0 mary, chage --mindays 0

Set warning period to 7 days and account
expiration date to August, 20th 2050.

chage -W 7 -E 2050-08-20 mary, chage
--warndays 7 --expiredate 2050-08-20

Print user’s current password expiry
information.

chage -l mary, chage --list mary

## 4. Complete the following table with the appropriate network utility:
Action

Show network files for host 192.168.1.55 on lsof -i@192.168.1.55:22
port 22 using lsof.
Show processes accessing the default port of
the Apache web server on your machine with
fuser.

fuser -vn tcp 80, fuser --verbose
--namespace tcp 80

List all listening udp sockets on your machine
using netstat.

netstat -lu,netstat --listening --udp

Scan ports 80 through 443 on host
192.168.1.55 using nmap.

nmap -p 80-443 192.168.1.55

## 5. Perform the following tasks concerning resident set size (RSS) and ulimit as a regular user:
- Display soft limits on the maximum RSS:
ulimit -m, ulimit -Sm
- Display hard limits on the maximum RSS:
ulimit -Hm
- Set the soft limits on the maximum RSS to 5,000 kilobytes:
ulimit -Sm 5000
- Set the hard limits on the maximum RSS to 10,000 kilobytes:
ulimit -Hm 10000

511

- Finally, try to increase the hard limit on the maximum RSS up to 15,000 kilobytes. Can you do
it? Why?
No. Once set, regular users cannot increase hard limits.
6. Consider the following last command output line and answer the questions:

Sun May 31 14:16 - 14:22

(00:06)

- Was carol connected from a remote host? Why?
Yes, the IP address of the remote host is in the third column.
- How long did carol's session last?
Six minutes (as shown in the last column).
- Was carol connected through a true classic text-based terminal? Why?
No, pts/0 in the second column indicates the connection was made through a graphical
terminal emulator (aka Pseudo Terminal Slave).
7. Consider the following excerpt from /etc/sudoers and answer the question below.
User_Alias REGULAR_USERS = john, mary, alex
User_Alias PRIVILEGED_USERS = mimi
Cmnd_Alias WEB_SERVER_STATUS = /usr/bin/systemctl status apache2

512

ADMINS

SERVERS=WEB_SERVER_STATUS

Can alex check the status of the Apache Web Server on any host? Why?
No, as he is a member of REGULAR_USERS and that group of users is excluded from ADMINS; the
only users (apart from carol, members of the sudo group and root) that can run systemctl
status apache2 on the SERVERS.

513

## 1. Apart from the SUID and SGID, there is a third special permission: the Sticky bit. At present it is
mostly used on directories such as /tmp to prevent regular users from deleting or moving files
other than their own. Do the following tasks:
- Set the sticky bit on ~/temporal:
chmod +t temporal, chmod 1755 temporal
- Find directories with the sticky bit (and any other permissions) set on your home directory:
find ~ -perm -1000, find ~ -perm /1000
- Unset the sticky bit on ~/temporal:
chmod -t temporal, chmod 0755 temporal
2. When a user’s password is locked via passwd -l username or usermod -L username, how
can you tell by looking into /etc/shadow?
An exclamation mark will appear in the second field, right after the login name of the affected
user (e.g.: mary:!$6$gOg9xJgv…).
3. What is the usermod command counterpart to chage
--expiredate date username?

-E

date

username or chage

usermod -e date username, usermod --expiredate date username
4. Provide two different nmap commands to scan all 65535 ports on localhost:
nmap -p 1-65535 localhost and nmap -p- localhost

514

### 110.2 Setup host security
LPIC-1 version 5.0, Exam 102, Objective 110.2
- Awareness of shadow passwords and how they work.
- Turn off network services not in use.
- Understand the role of TCP wrappers.
- /etc/nologin
- /etc/passwd
- /etc/shadow
- /etc/xinetd.d/
- /etc/xinetd.conf
- systemd.socket
- /etc/inittab
- /etc/init.d/
- /etc/hosts.allow
- /etc/hosts.deny

515

### 110.2 Lesson 1

### 110.2 Setup host security

This chapter explains four basic ways to improve host security:
1. Some basic commands and configuration settings to improve authentication security with
shadow passwords.
2. How to use superdaemons to listen for incoming network connections.
3. Checking network services for unnecessary daemons.
## 4. TCP wrappers as sort of a simple firewall.

Improve Authentication Security with Shadow Passwords
The basic components of a user’s account data are stored in the file /etc/passwd. This file
contains seven fields: login name, password placeholder, user ID, group ID, comment (also known
as GECOS), home directory location, and the default shell. A simple way to remember the order of
these fields is to think about the process of a user logging in: first you enter a login name and a
password (here typically represented by an x). The system will map these to a user ID (uid) and a
group ID (gid). After a comment or GECOS field is provided, the user’s home directory is assigned
516

and finally the default shell specified.
Although in modern systems the password is no longer stored in the file /etc/passwd. Instead
the password field contains a lower-case x only. The file /etc/passwd has to be readable by all
users. Therefore it is not a good idea to store passwords there. The x indicates the encrypted
(hashed) password is actually stored in the /etc/shadow file instead. This file must not be
readable to all users.
Password settings are configured with the commands passwd and chage. Both commands will
change the entry for user emma in the file /etc/shadow. As a superuser you can set the password
for user emma with the following command:
$ sudo passwd emma
New password:
Retype new password:
passwd: password updated successfully

You will then be prompted twice to confirm the new password.
To list the password expiration time and other password expiration settings for user emma use:
$ sudo chage -l emma
Last password change

: Apr 27, 2020

Password expires

Password inactive

Minimum number of days between password change

: 0

Maximum number of days between password change

: 99999

Number of days of warning before password expires

: 7

To prevent the user emma from logging into the system the superuser may set a password
expiration date that precedes the current date. For example, if today’s date were 2020-03-27, you
could expire the user’s password by using an older date:
$ sudo chage -E 2020-03-26 emma

Alternatively, the superuser may use:
$ sudo passwd -l emma

517

to lock the account temporarily via the -l option for passwd. To test the effects of these changes,
attempt to login as the emma account:
$ sudo login emma
Your account has expired; please contact your system administrator
Authentication failure

To prevent all users except the root user from logging into the system temporarily, the superuser
may create a file named /etc/nologin. This file may contain a message to the users notifying
them as to why they can not login (for example, system maintenance notifications). For details see
man 5 nologin. Note there is also a command nologin which can be used to prevent a login
when set as the default shell for a user. For example:
$ sudo usermod -s /sbin/nologin emma

See man 8 nologin for more details.

How to Use a Superdaemon to Listen for Incoming Network
Connections
Network services such as web servers, email servers and print servers usually run as a standalone
service listening on a dedicated network port. All of these standalone services are running sideby-side. On classic Sys-V-init based system each of these services can be controlled by the
command service. On current systemd based systems you would use systemctl to manage the
service.
In former times the availability of computer resources had been much smaller. To run many
services in standalone mode in tandem was not a good option. Instead a so-called superdaemon
had been used to listen for incoming network connections and start the appropriate service on
demand. This method of building a network connection took a little more time. Well known
superdaemons are inetd and xinetd. On current systems based on systemd the
systemd.socket unit can be used in a similar way. In this section we will use xinetd to intercept
connections to the sshd daemon and start this daemon on request to demonstrate how the
superdaemon was used.
Before configuring the xinetd service some preparation is necessary. It does not matter whether
you use a Debian or Red Hat based system. Though these explanations have been tested with

518

Debian/GNU Linux 9.9 they should work on any current Linux system featuring systemd, without
any significant changes. First make sure the packages openssh-server and xinetd are installed.
Now verify that the SSH service works with:
$ systemctl status sshd
- ssh.service - OpenBSD Secure Shell server
Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
Active: active (running) since Mon 2020-04-27 09:33:48 EDT; 3h 11min ago
Docs: man:sshd(8)
man:sshd_config(5)
Process: 430 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
Main PID: 460 (sshd)
Tasks: 1 (limit: 1119)
Memory: 5.3M
CGroup: /system.slice/ssh.service
└─460 /usr/sbin/sshd -D

Also check that the SSH service is listening on its standard network port of 22:
COMMAND

PID USER

DEVICE SIZE/OFF NODE NAME

1194 root

IPv4 16053268

1194 root

4u

IPv6 16053270

Finally stop the SSH service with:
$ sudo systemctl stop sshd.service

In the case that you would want to make this change permanent and to survive reboot use
systemctl disable sshd.service.
Now you can create the xinetd configuration file /etc/xinetd.d/ssh with some basic settings:
service ssh
disable

socket_type = stream
protocol

= tcp

wait

= root

519

= /usr/sbin/sshd

server_args

= -i

flags

= IPv4

interface

= 192.168.178.1

Restart the xinetd service with:
$ sudo systemctl restart xinetd.service

Check which service is listening now for incoming SSH connections.
$ sudo lsof -i :22
COMMAND

PID USER

xinetd

24098 root

5u

IPv4 7345141

DEVICE SIZE/OFF NODE NAME

TCP 192.168.178.1:ssh (LISTEN)

We can see that the xinetd service has taken over control for the access of port 22.
Here are some more details about the xinetd configuration. The main configuration file is
/etc/xinetd.conf:
defaults
includedir /etc/xinetd.d

Besides the default settings, there is only one directive to set an include directory. In this directory
you can set up a single configuration file for each service you want to have handled by xinetd.
We have done this above for the SSH service and named the file /etc/xinetd.d/ssh. The names
of the configuration files can be chosen arbitrarily, except filenames containing a dot (.) or

520

ending with a tilde (~). But it is widespread practice to name the file after the service you want to
configure.
Some configuration files in the /etc/xinet.d/ directory are provided by the distribution
already:
$ ls -l /etc/xinetd.d
total 52
-rw-r--r-- 1 root root 640 Feb

2018 chargen

-rw-r--r-- 1 root root 313 Feb

2018 chargen-udp

-rw-r--r-- 1 root root 502 Apr 11 10:18 daytime
-rw-r--r-- 1 root root 313 Feb

2018 daytime-udp

-rw-r--r-- 1 root root 391 Feb

2018 discard

-rw-r--r-- 1 root root 312 Feb

2018 discard-udp

-rw-r--r-- 1 root root 422 Feb

2018 echo

-rw-r--r-- 1 root root 304 Feb

2018 echo-udp

-rw-r--r-- 1 root root 312 Feb

2018 servers

-rw-r--r-- 1 root root 314 Feb

2018 services

-rw-r--r-- 1 root root 569 Feb

2018 time

-rw-r--r-- 1 root root 313 Feb

2018 time-udp

These files can be used as templates in the rare case you have to use some legacy services such as
daytime, a very early implementation of a time server. All of these template file contain the
directive disable = yes.
Here are some more details about the directives used in the /etc/xinetd.d/ssh example file for
ssh above.
service ssh
disable

socket_type = stream
protocol

= tcp

wait

= root

= /usr/sbin/sshd

server_args

= -i

flags

= IPv4

interface

= 192.168.178.1

521

service
Lists the service xinetd has to control. You may use either a port number, such as 22, or the
name mapped to the port number in /etc/services e.g. ssh.
Detailed settings begin with an opening curly bracket.
disable
To activate these settings, set this to no. If you want to disable the setting temporarily you may
set it to yes.
socket_type
You can choose stream for TCP sockets or dgram for UDP sockets and more.
protocol
Choose either TCP or UDP.
wait
For TCP connections this is set to no usually.
The service started in this line will be owned by this user.
Full path to the service which should be started by xinetd.
server_args
You can add options for the service here. If started by a super-server many services require a
special option. For SSH this would be the -i option.
flags
You may choose IPv4, IPv6 and others.
interface
The network interface which xinetd has to control. Note: you may also choose the bind
directive, which is just a synonym for interface.
Finish with a closing curly bracket.
The successors of services started by the super-server xinetd are systemd socket units. Setting up
522

a systemd socket unit is very straight forward and easy, because there is a predefined systemd
socket unit for SSH available already. Make sure that the xinetd and SSH services are not
running.
Now you just have to start the SSH socket unit:
$ sudo systemctl start ssh.socket

To check which service is now listening on port 22 we use lsof again. Note here the option -P has
been used to show the port number instead of the service name in the output:
$ sudo lsof -i :22 -P
COMMAND PID USER

systemd

57u

IPv6 14730112

1 root

DEVICE SIZE/OFF NODE NAME

TCP *:22 (LISTEN)

To make this session complete, you should try to login into your server with an SSH client of your
choice.

In case systemctl start ssh.socket does not work with your distribution, try
systemctl start sshd.socket.

Checking Services for Unnecessary Daemons
For security reasons, as well as to control system resources, it is important to have an overview of
what services are running. Unnecessary and unused services should be disabled. For example in
case you do not need to distribute web pages there is no need to run a web server such as Apache
or nginx.
On SyS-V-init based systems you may check the status of all services with the following:
$ sudo service --status-all

Verify whether each of the services listed from the output of the command are necessary and
disable all unnecessary services with (for Debian-based systems):
$ sudo update-rc.d SERVICE-NAME remove

Or on Red Hat-based systems you would use:

523

$ sudo chkconfig SERVICE-NAME off

On modern systemd based systems we can use the following to list all running services:
$ systemctl list-units --state active --type service

You would then disable each unnecessary service unit with:
$ sudo systemctl disable UNIT --now

This command will stop the service and remove it from the list of services, so as to prevent it from
starting up at next system boot.
Additionally to get a survey of listening network services you may use netstat on older systems
(provided that you have the net-tools package installed):
$ netstat -ltu

0 0.0.0.0:ssh

0 localhost:mysql

0 [::]:http

0 [::]:ssh

0 0.0.0.0:bootpc

Or on modern systems you could use the equivalent command ss (for “socket services”):
$ ss -ltu
Netid

Recv-Q

Send-Q

Local Address:Port

UNCONN

0.0.0.0:bootpc

0.0.0.0:ssh

80

127.0.0.1:mysql

*:http

[::]:ssh

Address:Port
*:*

524

Peer

TCP Wrappers as Sort of a Simple Firewall
In times when no firewalls were available for Linux, TCP wrappers had been used to secure
network connections into a host. Nowadays many programs do not obey TCP wrappers anymore.
In recent Red Hat (e.g. Fedora 29) based distributions TCP wrappers support has been removed
completely. In order to support legacy Linux systems that still use TCP wrappers, it is helpful to
have some basic knowledge about this particular technology.
We will once again use the SSH service as a basic example. The service on our example host
should be reachable from the local network only. First we check whether the SSH daemon uses
the libwrap library which offers TCP wrappers support:
$ ldd /usr/sbin/sshd | grep "libwrap"
libwrap.so.0 => /lib/x86_64-linux-gnu/libwrap.so.0 (0x00007f91dbec0000)

Now we add the following line in the file /etc/hosts.deny:
sshd: ALL

Finally we configure an exception in the file /etc/hosts.allow for SSH connections from the
local network:
sshd: LOCAL

The changes take effect immediately, there is no need to restart any service. You may check this
with the ssh client.

525

1. How can the previously locked account emma be unlocked?

## 2. Previously the account emma had an expiration date set. How can the expiration date get set to
never?

## 3. Imagine the CUPS printing service handling print jobs is not needed on your server. How can
you disable the service permanently? How can you check the appropriate port is not active
anymore?

## 4. You have installed the nginx web server. How can you check whether nginx supports TCP
wrappers?

526

1. Check out whether the existence of the /etc/nologin file prevents the login of the user root?

2. Does the existence of the /etc/nologin file prevent passwordless logins with SSH keys?

## 3. What happens on login, when the file /etc/nologin contains this line of text login
currently is not possible only?

## 4. May an ordinary user emma obtain information about the user root contained in the file
/etc/passwd e.g. with the command grep root /etc/passwd?

## 5. May an ordinary user emma retrieve information about her own hashed password contained in
the file /etc/shadow e.g. with the command grep emma /etc/shadow?

## 6. What steps have to be taken to enable and check the ancient daytime service to be handled by
xinetd? Note this is just an explorational excercise don’t do this in a production environment.

527

1. In which file passwords are stored as well as some password security settings e.g. expiration
## 2. The purpose of the superdaemon xinetd and how to get it running and start the sshd service
on demand.
3. To check which network services are running and how to disable unnecessary services.
4. Use TCP wrappers as sort of a simple firewall.
Commands used in the lab and the exercises:
chage
Change the age of a user’s password.
chkconfig
A classic command initially used on Red Hat based systems to set whether a service would start
at boot time or not.
A classic utility (now in the net-tools package) that will display daemons that access network
ports on a system and their usage.
nologin
A command that can be used in place of a user’s shell to prevent them from logging in.
passwd
Used to create or change a user’s password.
service
Older method of controlling a daemon’s status, such as stopping or starting a service.
ss
The modern equivalent to netstat, but also displays more information about various sockets
in use on the system.
The system control command used to control various aspects of services and sockets on a

528

computer using systemd.
update-rc.d
A classic command similar to chkconfig that enables or disables a system to start at boot time
on Debian based distributions.
xinetd
A superdaemon that can control access to a network service on demand, thus leaving a service
inactive until it is actually called upon to perform some task.

529

## 1. How can the previously locked account emma be unlocked?
The superuser can run passwd -u emma to unlock the account.
2. Previously the account emma had an expiration date set. How can the expiration date get set to
never?
The superuser may use chage -E -1 emma to set the expiration date to never. This setting
may be checked with chage -l emma.
3. Imagine the CUPS printing service handling print jobs is not needed on your server. How can
you disable the service permanently? How can you check the appropriate port is not active
anymore?
As superuser issue
systemctl disable cups.service --now

Now you can check
netstat -l | grep ":ipp "` or `ss -l | grep ":ipp "

## 4. You have installed the nginx web server. How can you check whether nginx supports TCP
wrappers?
The command
ldd /usr/sbin/nginx | grep "libwrap"

will show an entry in case nginx supports TCP wrappers.

530

1. Check out whether the existence of the /etc/nologin file prevents the login of the user root?
User root is still able to login.
2. Does the existence of the /etc/nologin file prevent passwordless logins with SSH keys?
Yes, also passwordless logins are prevented.
3. What happens on login, when the file /etc/nologin contains this line of text login
currently is not possible only?
The message login currently is not possible will be shown, and a login is prevented.
4. May an ordinary user emma obtain information about the user root contained in the file
/etc/passwd e.g. with the command grep root /etc/passwd?
Yes, because all users have read permission for this file.
5. May an ordinary user emma retrieve information about her own hashed password contained in
the file /etc/shadow e.g. with the command grep -i emma /etc/shadow?
No, because ordinary users have no read permission for this file.
6. What steps have to be taken to enable and check the ancient daytime service to be handled by
xinetd? Note this is just an explorational excercise don’t do this in a production environment.
First change the file /etc/xinetd.d/daytime and set the directive disable = no. Second
restart the xinetd service systemctl restart xinetd.service (or service xinetd
restart on systems with SyS-V-Init). Now you can check whether it works nc localhost
daytime. Instead of nc you may also use netcat.

531

### 110.3 Securing data with encryption
LPIC-1 version 5.0, Exam 102, Objective 110.3
- Perform basic OpenSSH 2 client configuration and usage.
- Understand the role of OpenSSH 2 server host keys.
- Perform basic GnuPG configuration, usage and revocation.
- Use GPG to encrypt, decrypt, sign and verify files.
- Understand SSH port tunnels (including X11 tunnels).
- ssh
- ssh-keygen
- ssh-agent
- ssh-add
- ~/.ssh/id_rsa and id_rsa.pub
- ~/.ssh/id_dsa and id_dsa.pub
- ~/.ssh/id_ecdsa and id_ecdsa.pub
- ~/.ssh/id_ed25519 and id_ed25519.pub
- /etc/ssh/ssh_host_rsa_key and ssh_host_rsa_key.pub

532

- /etc/ssh/ssh_host_dsa_key and ssh_host_dsa_key.pub
- /etc/ssh/ssh_host_ecdsa_key and ssh_host_ecdsa_key.pub
- /etc/ssh/ssh_host_ed25519_key and ssh_host_ed25519_key.pub
- ~/.ssh/authorized_keys
- ssh_known_hosts
- gpg
- gpg-agent
- ~/.gnupg/

533

### 110.3 Lesson 1

### 110.3 Securing data with encryption

Securing data with encryption is of paramount importance in many aspects of today’s system
administration — even more so when it comes to accessing systems remotely. As opposed to
insecure solutions such as telnet, rlogin or FTP, the SSH (Secure Shell) protocol was designed with
security in mind. Using public key cryptography, it authenticates both hosts and users and
encrypts all subsequent information exchange. Furthermore, SSH can be used to establish port
tunnels, which — amongst other things — allows for a non-encrypted protocol to transmit data
over an encrypted SSH connection. The current, recommended version of the SSH protocol is 2.0.
OpenSSH is a free and open source implementation of the SSH protocol.
This lesson will cover basic OpenSSH client configuration as well as the role of OpenSSH server
host keys. The concept of SSH port tunnels will also be discussed. We will be using two machines
with the following setup:

534

Machine Role

OS

IP Address

Hostname

Client

Debian
GNU/Linux 10
(buster)

192.168.1.55

Server

openSUSE Leap
15.1

192.168.1.77

halof

ina

Basic OpenSSH Client Configuration and Usage
Although the OpenSSH server and client come in separate packages, you can normally install a
metapackage that will provide both at once. To establish a remote session with the SSH server you
use the ssh command, specifying the user you want to connect as on the remote machine and the
remote machine’s IP address or hostname. The first time you connect to a remote host you will
receive a message like this:
carol@debian:~$ ssh ina@192.168.1.77
The authenticity of host '192.168.1.77 (192.168.1.77)' can't be established.
ECDSA key fingerprint is SHA256:5JF7anupYipByCQm2BPvDHRVFJJixeslmppi2NwATYI.
Are you sure you want to continue connecting (yes/no)?

After typing yes and hitting Enter, you will be asked for the remote user’s password. If
successfully entered, you will be shown a warning message and then logged in to the remote host:
Warning: Permanently added '192.168.1.77' (ECDSA) to the list of known hosts.
Last login: Sat Jun 20 10:52:45 2020 from 192.168.1.4
ina@halof:~>

The messages are quite self-explanatory: as it was the first time that you established a connection
to the 192.168.1.77 remote server, its authenticity could not be checked against any database.
Thus, the remote server provided an ECDSA key fingerprint of its public key (using the SHA256
hash function). Once you accepted the connection, the public key of the remote server was added
to the known hosts database, thus enabling the authentication of the server for future connections.
This list of known hosts' public keys is kept in the file known_hosts which lives in ~/.ssh:
ina@halof:~> exit
logout

535

Connection to 192.168.1.77 closed.
carol@debian:~$ ls .ssh/
known_hosts

Both .ssh and known_hosts were created after the first remote connection was established.
~/.ssh is the default directory for user-specific configuration and authentication information.

You can also use ssh to just execute a single command on the remote host and then
come back to your local terminal (e.g.: running ssh ina@halof ls).

If you are using the same user on both the local and remote hosts, there is no need to specify the
username when establishing the SSH connection. For instance, if you are logged in as user carol
on debian and wanted to connect to halof also as user carol, you would simply type ssh
192.168.1.77 or ssh halof (if the name can be resolved):
carol@debian:~$ ssh halof
Last login: Wed Jul

1 23:45:02 2020 from 192.168.1.55

carol@halof:~>

Now suppose you establish a new remote connection with a host that happens to have the same IP
address as halof (a common thing if you use DHCP in your LAN). You will be warned about the
possibility of a man-in-the-middle attack:
carol@debian:~$ ssh john@192.168.1.77
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@

WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!

@

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:KH4q3vP6C7e0SEjyG8Wlz9fVlf+jmWJ5139RBxBh3TY.
Please contact your system administrator.
Add correct host key in /home/carol/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /home/carol/.ssh/known_hosts:1
remove with:
ssh-keygen -f "/home/carol/.ssh/known_hosts" -R "192.168.1.77"
ECDSA host key for 192.168.1.77 has changed and you have requested strict checking.
Host key verification failed.

536

Since you are not dealing with a man-in-the-middle attack, you can safely add the public key
fingerprint of the new host to .ssh/known_hosts. As the message indicates, you can first use the
command ssh-keygen -f "/home/carol/.ssh/known_hosts" -R "192.168.1.77" to
remove the offending key (alternatively, you can go for ssh-keygen -R 192.168.1.77 to delete
all keys belonging to 192.168.1.77 from ~/.ssh/known_hosts). Then, you will be able to
establish a connection to the new host.

Key-Based Logins
You can set up your SSH client to not provide any passwords at login but use public keys instead.
This is the preferred method of connecting to a remote server via SSH, as it is far more secure. The
first thing you have to do is create a key pair on the client machine. To do this, you will use sshkeygen with the -t option specifying the type of encryption you want (Elliptic Curve Digital
Signature Algorithm in our case). Then, you will be asked for the path to save the key pair
(~/.ssh/ is convenient as well as the default location) and a passphrase. While a passphrase is
optional, it is highly recommended to always use one.
carol@debian:~/.ssh$ ssh-keygen -t ecdsa
Generating public/private ecdsa key pair.
Enter file in which to save the key (/home/carol/.ssh/id_ecdsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/carol/.ssh/id_ecdsa.
Your public key has been saved in /home/carol/.ssh/id_ecdsa.pub.
The key fingerprint is:
SHA256:tlamD0SaTquPZYdNepwj8XN4xvqmHCbe8g5FKKUfMo8 carol@debian
The key's randomart image is:
+---[ECDSA 256]---+

o .

= o o

B *

E B S o

o & O

@ ^ =

*.@ @.

o.o+B+o

+----[SHA256]-----+

When creating the key pair, you can pass ssh-keygen the -b option to specify the
key size in bits (e.g.: ssh-keygen -t ecdsa -b 521).

537

The previous command produced two more files in your ~/.ssh directory:
carol@debian:~/.ssh$ ls
id_ecdsa

id_ecdsa.pub

known_hosts

id_ecdsa
This is your private key.
id_ecdsa.pub
This is your public key.

In asymmetric cryptography (aka public-key cryptography), the public and private
keys are mathematically related to one another in such a way that whatever is
encrypted by one can only be decrypted by the other.

The next thing you need to do is add your public key to the ~/.ssh/authorized_keys file of the
user you want to log in as on the remote host (if the ~/.ssh directory does not already exist, you
will have to create it first). You can copy your public key into the remote server in a number of
ways: using a USB flash drive, through the scp command — which will transfer the file over using
SSH — or by catting out the content of your public key and piping it into ssh like so:
carol@debian:~/.ssh$ cat id_ecdsa.pub |ssh ina@192.168.1.77 'cat >> .ssh/authorized_keys'

Once your public key has been added to the authorized_keys file on the remote host, you can
face two scenarios when trying to establish a new connection:
- If you did not provide a passphrase when creating the key pair, you will be logged in
automatically. Although convenient, this method can be insecure depending on the situation:
carol@debian:~$ ssh ina@192.168.1.77
Last login: Thu Jun 25 20:31:03 2020 from 192.168.1.55
ina@halof:~>

- If you provided a passphrase when creating the key pair, you will have to enter it on every
connection much in the same way as if it was a password. Apart from the public key, this
method adds an extra layer of security in the form of a passphrase and can — therefore — be
considered more secure. As far as convenience goes — however — it is is exactly the same as

538

having to enter a password every time you establish a connection. If you don’t use a passphrase
and someone manages to obtain your private SSH key file, they would have access to every
server on which your public key is installed.
carol@debian:~/.ssh$ ssh ina@192.168.1.77
Last login: Thu Jun 25 20:39:30 2020 from 192.168.1.55
ina@halof:~>

There is a way which combines security and convenience, though: using the SSH authentication
agent (ssh-agent). The authentication agent needs to spawn its own shell and will hold your
private keys — for public key authentication — in memory for the remainder of the session. Let us
see how it works in a little bit more detail:
1. Use ssh-agent to start a new Bash shell:
carol@debian:~/.ssh$ ssh-agent /bin/bash
carol@debian:~/.ssh$

## 2. Use the ssh-add command to add your private key to a secure area of memory. If you supplied
a passphrase when generating the key pair — which is recommended for extra security — you
will be asked for it:
carol@debian:~/.ssh$ ssh-add
Enter passphrase for /home/carol/.ssh/id_ecdsa:
Identity added: /home/carol/.ssh/id_ecdsa (carol@debian)

Once your identity has been added, you can login to any remote server on which your public
key is present without having to type your passphrase again. It is common practice on modern
desktops to perform this command upon booting your computer, as it will remain in memory
until the computer is shutdown (or the key is unloaded manually).
Let us round this section off by listing the four types of public-key algorithms that can be specified
with ssh-keygen:
RSA
Named after its creators Ron Rivest, Adi Shamir and Leonard Adleman, it was published in
1977. It is considered secure and still widely used today. Its minimum key size is 1024 bits
(default is 2048).

539

DSA
The Digital Signature Algorithm has proven to be insecure and it was deprecated as of OpenSSH
7.0. DSA keys must be exaclty 1024 bits in length.
ecdsa
The Elliptic Curve Digital Signature Algorithm is an improvement on DSA
and — therefore — considered more secure. It uses elliptic curve cryptography. ECDSA key
length is determined by one of the three possible elliptic curve sizes in bits: 256, 384 or 521.
ed25519
It is an implementation of EdDSA — Edwards-curve Digital Signature Algorithm — that uses the
stronger 25519 curve. It is considered the most secure of all. All Ed25519 keys have a fixed
length of 256 bits.

If invoked with no -t specification, ssh-keygen will generate an RSA key pair by
default.

The Role of OpenSSH Server Host Keys
The global configuration directory for OpenSSH lives in the /etc directory:
halof:~ # tree /etc/ssh
/etc/ssh
├── moduli
├── ssh_config
├── ssh_host_dsa_key
├── ssh_host_dsa_key.pub
├── ssh_host_ecdsa_key
├── ssh_host_ecdsa_key.pub
├── ssh_host_ed25519_key
├── ssh_host_ed25519_key.pub
├── ssh_host_rsa_key
├── ssh_host_rsa_key.pub
└── sshd_config
0 directories, 11 files

Apart from moduli and the configuration files for the client (ssh_config) and the server
(sshd_config), you will find four key pairs — a key pair for each supported algorithm — that are
created when the OpenSSH server is installed. As already noted, the server uses these host keys to
identify itself to clients as required. Their name pattern is as follows:

540

Private keys
ssh_host_ prefix + algorithm + key suffix (e.g.: ssh_host_rsa_key)
Public keys (or public key fingerprints)
ssh_host_ prefix + algorithm + key.pub suffix (e.g.: ssh_host_rsa_key.pub)
A fingerprint is created by applying a cryptographic hash function to a public key.
As fingerprints are shorter than the keys they refer to, they come in handy to
simplify certain key management tasks.

The permissions on the files containing the private keys are 0600 or -rw-------: only readable
and writable by the owner (root). On the other hand, all public key files are also readable by
members in the owner group and everybody else (0644 or -rw-r—r--):
halof:~ # ls -l /etc/ssh/ssh_host_*
-rw------- 1 root root 1381 Dec 21 20:35 /etc/ssh/ssh_host_dsa_key
