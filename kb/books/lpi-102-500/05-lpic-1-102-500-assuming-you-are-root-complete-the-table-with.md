---
id: lpi-102-500-05
title: "LPIC-1 · 102-500 — Assuming you are root, complete the table with the appropriate…"
slug: lpi-102-500-05-lpic-1-102-500-assuming-you-are-root-complete-the-table-with
source: "LPI Learning Material — LPIC-1 (Exam 102-500)"
sourceSection: "1. Assuming you are root, complete the table with the appropriate journalctl command:, 1. What options should you modify in /etc/systemd/journald.conf so that messages are, 2. Provide the correct journalctl filter to print the following:, 4. Priority levels can also be specified numerically. Rewrite"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "Complete the following tasks using journalctl and the appropriate options: Covers 42 sections: Assuming you are root, complete the table with the appropriate journalctl command:, What options should you modify in /e."
---
# LPIC-1 · 102-500 — Assuming you are root, complete the table with the appropriate…

## 1. Assuming you are root, complete the table with the appropriate journalctl command:

Print kernel entries

journalctl -k or journalctl --dmesg

at beginning of journal

journalctl -b 2

at end of journal

journalctl -b -2 -r or journalctl -r
-b -2

Print most recent log messages and keep
watching for new ones

journalctl -f

Print only new messages since now, and
update the output continuously

journalctl --since "now" -f

Print messages from the previous boot with a
priority of warning and in reverse order

journalctl -b -1 -p warning -r

## 2. The behaviour of the journal daemon concerning storage is mostly controlled by the value of
the Storage option in /etc/systemd/journald.conf. Indicate what behaviour is related to
what value in the following table:
Log data is
thrown away but
forwarding is
possible

x

Once the system
directory will be
created

x

335

Once the system x
directory will not
be created
Log data will be
/var/run/journ
al but will not
survive reboots

x

3. As you learned, the journal can be manually vacuumed based on time, size and number of files.
Complete the following tasks using journalctl and the appropriate options:
- Check how much disk space is taken up by journal files:
journalctl --disk-usage

- Cut down on the quantity of space reserved for archived journal files and set it to 200MiB:
journalctl --vacuum-size=200M

- Check on disk space again and explain the results:
journalctl --disk-usage

There is no correlation because --disk-usage shows space occupied by both active and
archived journal files whereas --vacuum-size only applies to archived files.

336

## 1. What options should you modify in /etc/systemd/journald.conf so that messages are
forwarded to /dev/tty5? What values should the options have?
ForwardToConsole=yes
TTYPath=/dev/tty5

## 2. Provide the correct journalctl filter to print the following:

Filter + Value

Print messages belonging to a specific user

_ID=<user-id>

Print messages from a host named debian

_HOSTNAME=debian

Print messages belonging to a specific group

_GID=<group-id>

Print messages belonging to root

_UID=0

Based on the executable path, print sudo

_EXE=/usr/bin/sudo

Based on the command name, print sudo

_COMM=sudo

## 3. When filtering by priority, logs with a higher priority than indicated will also be included in
the listing; for instance journalctl -p err will print error, critical, alert and emergency
messages. However, you can have journalctl show only a specific range. What command
would you use to have journalctl print only messages in the warning, error and critical
priority levels?
journalctl -p warning..crit

## 4. Priority levels can also be specified numerically. Rewrite the command in the previous exercise
using the numeric representation of priority levels:
journalctl -p 4..2

337

### 108.3 Mail Transfer Agent (MTA) basics
LPIC-1 version 5.0, Exam 102, Objective 108.3
- Create e-mail aliases.
- Configure e-mail forwarding.
- Knowledge of commonly available MTA programs (postfix, sendmail, exim) (no
configuration)
- ~/.forward
- sendmail emulation layer commands
- newaliases
- mail
- mailq
- postfix
- sendmail
- exim

338

### 108.3 Lesson 1

### 108.3 Mail Transfer Agent (MTA) basics

In Unix-like operating systems, such as Linux, every user has their own inbox: a special location
on the filesystem that is inaccessible by other non-root users and stores the user’s personal email
messages. New incoming messages are added to the user’s inbox by the Mail Transfer Agent
(MTA). The MTA is a program running as a system service which collects messages sent by other
local accounts as well as messages received from the network, sent from remote user accounts.
The same MTA is also responsible for sending messages to the network, if the destination address
refers to a remote account. It does so by using a filesystem location as an email outbox for all
system users: as soon as a user places a new message in the outbox, the MTA will identify the
target network node from the domain name given by the destination email address — the portion
after the @ sign — and then it will try to transfer the message to the remote MTA using the Simple
Mail Transfer Protocol (SMTP). SMTP was designed with unreliable networks in mind, so it will try
to establish alternative delivery routes if the primary mail destination node is unreachable.

Local and Remote MTA
Traditional user accounts in network connected machines make up the simplest email exchange

339

scenario, where every network node runs its own MTA daemon. No software other than the MTA
is required to send and to receive email messages. In practice, however, it is more common to use
a remote email account and not have an active local MTA service (i.e. instead using an email client
application to access the remote account).
Unlike local accounts, a remote email account — also called remote mailbox — requires user
authentication to grant access to the user’s mailbox and to the remote MTA (in this case, simply
called the SMTP server). While the user interacting with a local inbox and MTA is already
identified by the system, a remote system must verify the user’s identity before handling its
messages through IMAP or POP3.

Nowadays the most common method to send and receive email is through a hosted
account on a remote server, e.g. a company’s centralized email server hosting all
employee accounts or a personal email service, such as Google’s Gmail. Instead of
collecting locally-delivered messages, the email client application will connect to
the remote mailbox and retrieve the messages from there. The POP3 and IMAP
protocols are commonly used to retrieve the messages from the remote server, but
other non-standard proprietary protocols may be used as well.

When an MTA daemon is running on the local system, local users can send an email to other local
users or to users on a remote machine, provided their system also has an MTA service that is
accepting network connections. TCP port 25 is the standard port for SMTP communication, but
other ports may be used as well, depending on the authentication and/or encryption schema being
used (if any).
Leaving aside topologies involving the access to remote mailboxes, an email exchange network
between ordinary Linux user accounts can be implemented as long as all network nodes have an
active MTA that is able to perform the following tasks:
- Maintain the outbox queue of messages to be sent. For each queued message, the local MTA
will assess the destination MTA from the recipient’s address.
- Communicate with remote MTA daemons using SMTP. The local MTA should be able to use the
Simple Mail Transfer Protocol (SMTP) over the TCP/IP stack to receive, send and redirect
messages from/to other remote MTA daemons.
- Maintain an individual inbox for every local account. The MTA will usually store the messages
in the mbox format: a single text file containing all email messages in sequence.
Normally, email addresses specify a domain name as the location, e.g. lpi.org in info@lpi.org.
When this is the case the sender’s MTA will query the DNS service for the corresponding MX
record. The DNS MX record contains the IP address of the MTA handling the email for that
domain. If the same domain has more than one MX record specified in the DNS, the MTA should
340

try to contact them according to their priority values. If the recipient’s address does not specify a
domain name or the domain does not have an MX record, then the part after the @ symbol will be
treated as the host of the destination MTA.
Security aspects must be considered if the MTA hosts will be visible to hosts on the Internet. For
instance, it is possible for an unknown user to use the local MTA to impersonate another user and
send potentially harmful emails. An MTA that blindly relays an email is known as an open relay,
when it can be used as an intermediary to potentially disguise the true sender of the message. To
prevent these misuses, the recommendation is to accept connections from authorized domains
only and to implement a secure authentication schema.
In addition to that, there are many different MTA implementations for Linux, each one focusing
on specific aspects like compatibility, performance, security, etc. Nevertheless, all MTAs will
follow the same basic principles and provide similar features.

Linux MTAs
The traditional MTA available for Linux systems is Sendmail, a very flexible general purpose MTA
used by many Unix-like operating systems. Some of the other common MTAs are Postfix, qmail
and Exim. The main reason to choose an alternative MTA is to implement advanced features more
easily, as configuring custom email servers in Sendmail can be a complicated task. Also, each
distribution may have its preferred MTA, with predefined settings appropriate for most common
setups. All MTAs intend to be drop-in Sendmail replacements, so all Sendmail-compatible
applications should work regardless of what MTA is being used.
If the MTA is running but not accepting network connections, it will only be able to deliver email
messages on the local machine. For the sendmail MTA, the /etc/mail/sendmail.mc file should
be modified to accept non-local connections. To do so, the entry
DAEMON_OPTIONS(`Port=smtp,Addr=127.0.0.1, Name=MTA')dnl

should be modified to the correct network address and the service should be restarted. Some
Linux distributions, such as Debian, may offer configuration tools to help bring up the email
server with a predefined set of commonly used features.

Due to security issues most Linux distributions do not install an MTA by default. To
test the examples given in this lesson, make sure there’s a running MTA on every
machine and that they are accepting connections on TCP port 25. For security
purposes, these systems should not be exposed to incoming connections from the
public internet during testing.

341

Once the MTA is running and accepting connections from the network, new email messages are
passed to it with SMTP commands that are sent through a TCP connection. The command nc — a
networking utility which reads and writes generic data across the network — can be used to send
SMTP commands directly to the MTA. If the command nc is not available, it will be installed with
the ncat or nmap-ncat package, depending on the package management system in use. Writing
SMTP commands directly to the MTA will help you understand the protocol and other general
email concepts better, but it can also help to diagnose problems in the mail delivery process.
If, for example, user emma at the lab1.campus host wants to send a message to user dave at the
lab2.campus host, then she can use the nc command to directly connect to the lab2.campus
MTA, assuming it is listening on the TCP port 25:
$ nc lab2.campus 25
220 lab2.campus ESMTP Sendmail 8.15.2/8.15.2; Sat, 16 Nov 2019 00:16:07 GMT
HELO lab1.campus
250 lab2.campus Hello lab1.campus [10.0.3.134], pleased to meet you
MAIL FROM: emma@lab1.campus
250 2.1.0 emma@lab1.campus... Sender ok
RCPT TO: dave@lab2.campus
250 2.1.5 dave@lab2.campus... Recipient ok
DATA
354 Enter mail, end with "." on a line by itself
Subject: Recipient MTA Test
Hi Dave, this is a test for your MTA.
250 2.0.0 xAG0G7Y0000595 Message accepted for delivery
QUIT
221 2.0.0 lab2.campus closing connection

Once the connection is established, the remote MTA identifies itself and then it’s ready to receive
SMTP commands. The first SMTP command in the example, HELO lab1.campus, indicates
lab1.campus as the exchange initiator. The next two commands, MAIL
FROM:
emma@lab1.campus and RCPT TO: dave@lab2.campus, indicate the sender and the recipient.
The proper email message starts after the DATA command and ends with a period on a line by
itself. To add a subject field to the email, it should be in the first line after the DATA command, as
shown in the example. When the subject field is used, there must be an empty line separating it
from the email content. The QUIT command finishes the connection with the MTA at the
lab2.campus host.
On the lab2.campus host, user dave will receive a message similar to You have new mail in

342

/var/spool/mail/dave as soon as he enters a shell session. This file will contain the raw email
message sent by emma as well as the headers added by the MTA:
$ cat /var/spool/mail/dave
From emma@lab1.campus

Sat Nov 16 00:19:13 2019

Return-Path: <emma@lab1.campus>
Received: from lab1.campus (lab1.campus [10.0.3.134])
by lab2.campus (8.15.2/8.15.2) with SMTP id xAG0G7Y0000595
for dave@lab2.campus; Sat, 16 Nov 2019 00:17:06 GMT
Date: Sat, 16 Nov 2019 00:16:07 GMT
From: emma@lab1.campus
Message-Id: <201911160017.xAG0G7Y0000595@lab2.campus>
Subject: Recipient MTA Test
Hi Dave, this is a test for your MTA.

The header Received: shows that the message from lab1.campus was received directly by
lab2.campus. By default, MTAs will only accept messages to local recipients. The following error
will probably occur if user emma tries to send an email to user henry at the lab3.campus host, but
using the lab2.campus MTA instead of the proper lab3.campus MTA:
$ nc lab2.campus 25
220 lab2.campus ESMTP Sendmail 8.15.2/8.15.2; Sat, 16 Nov 2019 00:31:44 GMT
HELO lab1.campus
250 lab2.campus Hello lab1.campus [10.0.3.134], pleased to meet you
MAIL FROM: emma@lab1.campus
250 2.1.0 emma@lab1.campus... Sender ok
RCPT TO: henry@lab3.campus
550 5.7.1 henry@lab3.campus... Relaying denied

SMTP response numbers beginning with 5, such as the Relaying denied message, indicate an
error. There are legitimate situations when relaying is desirable, like when the hosts sending and
receiving emails are not connected all the time: an intermediate MTA can be configured to accept
emails intended to other hosts, acting as a relay SMTP server that can forward messages between
MTAs.
The ability to route email traffic through intermediate SMTP servers discourages the attempt to
connect directly to the host indicated by the recipient’s email address, as shown in the previous
examples. Moreover, email addresses often have a domain name as the location (after the @), so
the actual name of the corresponding MTA host must be retrieved through DNS. Therefore, it is
recommended to delegate the task of identifying the appropriate destination host to the local MTA

343

or to the remote SMTP server, when remote mailboxes are used.
Sendmail provides sendmail command to perform many email-related operations, including
assisting in composing new messages. It also requires the user to type the email headers by hand,
but in a friendlier way than using SMTP commands directly. So a more adequate method for user
emma@lab1.campus to send an email message to dave@lab2.campus would be:
$ sendmail dave@lab2.campus
From: emma@lab1.campus
To: dave@lab2.campus
Subject: Sender MTA Test
Hi Dave, this is a test for my MTA.

Here again, the dot in a line by itself finishes the message. The message should be immediately
sent to the recipient, unless the local MTA was unable to contact the remote MTA. The command
mailq, if executed by root, will show all non-delivered messages. If, for example, the MTA at
lab2.campus did not respond, then command mailq will list the undelivered message and the
cause of the failure:
/var/spool/mqueue (1 request)
-----Q-ID----- --Size-- -----Q-Time----- ------------Sender/Recipient----------xAIK3D9S000453

## 36. Mon Nov 18 20:03 <emma@lab1.campus>
(Deferred: Connection refused by lab2.campus.)
<dave@lab2.campus>

Total requests: 1

The default location for the outbox queue is /var/spool/mqueue/, but different MTAs may use
different locations in the /var/spool/ directory. Postfix, for instance, will create a directory tree
under /var/spool/postfix/ to manage the queue. The command mailq is equivalent to
sendmail -bp, and they should be present regardless of the MTA installed in the system. To
ensure backward compatibility, most MTAs provide these traditional mail administration
commands.
If the primary email destination host — when it is provided from an MX DNS record for the
domain — is unreachable, the MTA will try to contact the entries with lower priority (if there are
any specified). If none of them are reachable, the message will stay in the local outbox queue to be
sent later. If configured to do so, the MTA can periodically check the availability of the remote
hosts and perform a new delivery attempt. If using a Sendmail-compatible MTA, a new attempt
344

will immediately take place with the command sendmail -q.
Sendmail will store incoming messages in a file named after the corresponding inbox owner, for
example /var/spool/mail/dave. Other MTAs, like Postfix, may store the incoming email
messages in locations like /var/mail/dave, but the file content is the same. In the example, the
command sendmail was used in the sender’s host to compose the message, so the raw message
headers show that the email took extra steps before reaching the final destination:
$ cat /var/spool/mail/dave
From emma@lab1.campus

Mon Nov 18 20:07:39 2019

Return-Path: <emma@lab1.campus>
Received: from lab1.campus (lab1.campus [10.0.3.134])
by lab2.campus (8.15.2/8.15.2) with ESMTPS id xAIK7clC000432
(version=TLSv1.3 cipher=TLS_AES_256_GCM_SHA384 bits=256 verify=NOT)
for <dave@lab2.campus>; Mon, 18 Nov 2019 20:07:38 GMT
Received: from lab1.campus (localhost [127.0.0.1])
by lab1.campus (8.15.2/8.15.2) with ESMTPS id xAIK3D9S000453
(version=TLSv1.3 cipher=TLS_AES_256_GCM_SHA384 bits=256 verify=NOT)
for <dave@lab2.campus>; Mon, 18 Nov 2019 20:03:13 GMT
Received: (from emma@localhost)
by lab1.campus (8.15.2/8.15.2/Submit) id xAIK0doL000449
for dave@lab2.campus; Mon, 18 Nov 2019 20:00:39 GMT
Date: Mon, 18 Nov 2019 20:00:39 GMT
Message-Id: <201911182000.xAIK0doL000449@lab1.campus>
From: emma@lab1.campus
To: dave@lab2.campus
Subject: Sender MTA Test
Hi Dave, this is a test for my MTA.

From bottom to top, the lines starting with Received: show the route taken by the message. The
message was submitted by user emma with the command sendmail dave@lab2.campus issued
on lab1.campus, as stated by the first Received: header. Then, still on lab1.campus, the MTA
uses ESMTPS — a superset of the SMTP, which adds encryption extensions — to send the message
to the MTA at lab2.campus, as stated by the last (top) Received: header.
The MTA finishes its job after the message is saved in the user’s inbox. It is common to perform
some kind of email filtering, such as spam blockers or the enforcement of user-defined filtering
rules. These tasks are executed by third-party applications, working together with the MTA. The
MTA could, for example, call the SpamAssassin utility to mark suspicious messages using its text
analysis features.

345

Although possible, it is not convenient to read the mailbox file directly. It is recommended to use a
email client program instead (e.g. Thunderbird, Evolution, or KMail), which will parse the file and
appropriately manage the messages. Such programs also offer extra features, like shortcuts to
common actions, inbox sub-directories, etc.

The mail Command and Mail User Agents (MUA)
It is possible to write an email message directly in its raw format, but it is much more practical to
use a client application — also known as an MUA (Mail User Agent) — to speed up the process and
to avoid mistakes. The MUA takes care of the work under the hood, that is, the email client
presents and organizes the received messages and handles the proper communication with the
MTA after the user composes an email.
There are many distinct types of Mail User Agents. Desktop applications like Mozilla Thunderbird
and Gnome’s Evolution support both local and remote email accounts. Even Webmail interfaces
can be seen as a type of MUA, as they intermediate the interaction between the user and the
underlying MTA. Email clients are not restricted to graphical interfaces though: console email
clients are widely used to access mailboxes not integrated with a graphical interface and to
automate email related tasks within shell scripts.
Originally, the Unix mail command was only intended to share messages between local system
users (the first mail command dates back to the first Unix edition, released in 1971). When
network email exchanges became more prominent, other programs were created to deal with the
new delivery system and gradually replaced the old mail program.
Nowadays, the most commonly used mail command is provided by the mailx package, which is
compatible with all modern email features. In most Linux distributions, the command mail is just
a symbolic link to the mailx command. Other implementations, like the GNU Mailutils package,
basically provide the same features as mailx. There are, however, slight differences between
them, especially with respect to command-line options.
Regardless of their implementation, all modern variations of the mail command operate in two
modes: normal mode and send mode. If an email address is provided as an argument to the
command mail, it will enter the send mode, otherwise it will enter the normal (read) mode. In
normal mode, the received messages are listed with a numerical index for each one, so the user
can refer to them individually when typing commands in the interactive prompt. The command
print 1 can be used to display the contents of message number 1, for example. Interactive
commands can be abbreviated, so commands like print, delete or reply can be replaced by p, d
or r, respectively. The mail command will always consider the last received or the last viewed
message when the message index number is omitted. The command quit or q will exit the
program.

346

The send mode is especially useful for sending automated email messages. It can be used, for
example, to send an email to the system administrator if a scheduled maintenance script fails to
perform its task. In send mode, mail will use the contents from the standard input as the message
body:
$ mail -s "Maintenance fail" henry@lab3.campus <<<"The maintenance script failed at `date`"

In this example, the option -s was added to include a subject field to the message. The message
body was provided by the Hereline redirection to the standard input, but the contents of a file or
the output of a command could also be piped to the program’s stdin. If no content is provided by a
redirection to the standard input, then the program will wait for the user to enter the message
body. In this case, keystroke Ctrl + D will end the message. The mail command will immediately
exit after the message is added to the outbox queue.

Delivery Customization
By default, the email accounts on a Linux system are associated with the standard system
accounts. For example, If user Carol has the login name carol on the host lab2.campus then her
email address will be carol@lab2.campus. This one-to-one association between system accounts
and mailboxes can be extended by standard methods provided by most Linux distributions, in
particular the email routing mechanism provided by the /etc/aliases file.
An email alias is a “virtual” email recipient whose receiving messages are redirected to existing
local mailboxes or to other types of message storage or processing destinations. Aliases are useful,
for example, to place messages sent to postmaster@lab2.campus in Carol’s mailbox, which is an
ordinary local mailbox in the lab2.campus system. To do so, the line postmaster: carol should
be added to the /etc/aliases file in lab2.campus. After modifying the /etc/aliases file, the
command newaliases should be executed to update the MTA’s aliases database and make the
changes effective. Commands sendmail -bi or sendmail -I can also be used to update the
aliases database.
Aliases are defined one per line, in the format <alias>: <destination>. In addition to the
ordinary local mailboxes, indicated by the corresponding username, other destination types are
available:
- A full path (starting with /) to a file. Messages sent to the corresponding alias will be appended
to the file.
- A command to process the message. The <destination> must start with a pipe character and,
if the command contains special characters (like blank spaces), it must be enclosed in double
quotes. For example, the alias subscribe: |subscribe.sh in lab2.campus will forward all

347

messages sent to subscribe@lab2.campus to the standard input of the command
subscribe.sh. If sendmail is running in restricted shell mode, the allowed commands — or the
links to them — should be in /etc/smrsh/.
- An include file. A single alias can have multiple destinations (separated by commas), so it may
be more practical to keep them in an external file. The :include: keyword must indicate the
file path, as in :include:/var/local/destinations
- An external address. Aliases can also forward messages to external email addresses.
- Another alias.
An unprivileged local user can define aliases for their own email by editing the file .forward in
their home directory. As the aliases can only affect their own mailbox, only the <destination>
part is necessary. To forward all incoming emails to an external address, for example, user dave
in lab2.campus could create the following ~/.forward file:
$ cat ~/.forward
emma@lab1.campus

It will forward all email messages sent to dave@lab2.campus to emma@lab1.campus. As with the
/etc/aliases file, other redirection rules can be added to .forward, one per line. Nevertheless,
the .forward file must be writable by its owner only and it is not necessary to execute the
newaliases command after modifying it. Files starting with a dot do not appear in regular file
listings, which could make the user unaware of active aliases. Therefore, it is important to verify if
the file exists when diagnosing email delivery issues.

348

## 1. Without further options or arguments, the command mail henry@lab3.campus enters the
input mode so the user can type the message to henry@lab3.campus. After finishing the
message, which keystroke will close the input mode and dispatch the email?

## 2. Which command can the root user execute to list the undelivered messages that originated on
the local system?

## 3. How can an unprivileged user use the standard MTA method to automatically forward all of
their incoming mail to the address dave@lab2.campus?

349

## 1. Using the mail command provided by mailx, what command will send a message to
emma@lab1.campus with the file logs.tar.gz as an attachment and the output of the
command uname -a as the email body?

## 2. An email service administrator wants to monitor email transfers through the network, but they
don’t want to clutter their mailbox with test messages. How could this administrator configure
a system-wide email alias to redirect all email sent to the user test to the file /dev/null?

## 3. What command, besides newaliases, could be used to update the aliases database after
adding a new alias to /etc/aliases?

350

This lesson covered the role and usage of Mail Transfer Agents in Linux systems. The MTA
provides a standard method for communication amongst user accounts and can be combined
with other software to provide extra functionality. The lesson discussed the following topics:
- Concepts about email-related technologies, mailboxes and protocols.
- How Linux MTAs exchange messages over the network.
- Console email clients and MUAs (Mail User Agents).
- Local email aliasing and forwarding.
The technologies, commands and procedures addressed were:
- SMTP and related protocols.
- MTAs available for Linux: Sendmail, Postfix, qmail, Exim.
- MTA and MUA commands: sendmail and mail.
- Administrative files and commands: mailq, /etc/aliases, newaliases, ~/.forward.

351

## 1. Without further options or arguments, the command mail henry@lab3.campus enters the
input mode so the user can type the message to henry@lab3.campus. After finishing the
message, which keystroke will close the input mode and dispatch the email?
Pressing Ctrl + D will cause the program to close and dispatch the email.
2. Which command can the root user execute to list the undelivered messages that originated on
the local system?
The command mailq or sendmail -bp.
3. How can an unprivileged user use the standard MTA method to automatically forward all of
their incoming mail to the address dave@lab2.campus?
The user should add dave@lab2.campus to ~/.forward.

352

## 1. Using the mail command provided by mailx, what command will send a message to
emma@lab1.campus with the file logs.tar.gz as an attachment and the output of the
command uname -a as the email body?
uname -a | mail -a logs.tar.gz emma@lab1.campus
2. An email service administrator wants to monitor email transfers through the network, but they
don’t want to clutter their mailbox with test messages. How could this administrator configure
a system-wide email alias to redirect all email sent to the user test to the file /dev/null?
The test: /dev/null line in /etc/aliases will redirect all messages sent to the local
mailbox test to the file /dev/null.
3. What command, besides newaliases, could be used to update the aliases database after
adding a new alias to /etc/aliases?
Command sendmail -bi or sendmail -I.

353

### 108.4 Manage printers and printing
LPIC-1 version 5.0, Exam 102, Objective 108.4
- Basic CUPS configuration (for local and remote printers).
- Manage user print queues.
- Troubleshoot general printing problems.
- Add and remove jobs from configured printer queues.
- CUPS configuration files, tools and utilities
- /etc/cups/
- lpd legacy interface (lpr, lprm, lpq)

354

### 108.4 Lesson 1

### 108.4 Manage printers and printing

Declarations of a “paperless society” brought on by the advent of computers have, up to current
times, proven to be false. Many organizations still rely on printed, or “hard copy”, pages of
information. With this in mind we can see how important it is for a computer user to know how to
print from a system as well as an administrator needing to know how to maintain a computer’s
ability to work with printers.
On Linux, as well as many other operating systems, the Common Unix Printing System (CUPS)
software stack allows for printing and printer management from a computer. Here is a very
simplified outline of how a file is printed in Linux using CUPS:
1. A user submits a file to be printed.
2. The CUPS daemon, cupsd, then spools the print job. This print job is given a job number by
CUPS, along with information about which print queue holds the job as well as the name of the
document to print.
3. CUPS utilizes filters that are installed on the system to generate a formatted file that the printer
can use.

355

## 4. CUPS then sends the re-formatted file to the printer for printing.
We will look at these steps in more detail, as well as how to install and manage a printer in Linux.

The CUPS Service
Most Linux desktop installations will have the CUPS packages already installed. On minimal Linux
installations the CUPS packages may not be installed, depending on the distribution. A basic CUPS
installation can be performed on a Debian system with the following:
$ sudo apt install cups

On Fedora systems the installation process is just as easy. You will need to start the CUPS service
manually after installation on Fedora and other Red Hat-based distributions:
$ sudo dnf install cups
$ sudo systemctl start cups.service

After the installation has completed, you can verify that the CUPS service is running with the use
of the systemctl command:
$ systemctl status cups.service
- cups.service - CUPS Scheduler
Loaded: loaded (/lib/systemd/system/cups.service; enabled; vendor preset: enabled)
Active: active (running) since Thu 2020-06-25 14:35:47 EDT; 41min ago
Docs: man:cupsd(8)
Main PID: 3136 (cupsd)
Tasks: 2 (limit: 1119)
Memory: 3.2M
CGroup: /system.slice/cups.service
├─3136 /usr/sbin/cupsd -l
└─3175 /usr/lib/cups/notifier/dbus dbus://

As with many other Linux daemons, CUPS relies on a set of configuration files for its operations.
Listed below are the main ones that are of interest to the system administrator:
/etc/cups/cupsd.conf
This file contains the configuration settings for the CUPS service itself. If you are at all familiar
with the Apache web server configuration file then the CUPS configuration file will look quite

356

similar to you as it uses a very similar syntax. The cupsd.conf file contains settings for things
such as controlling access to the various print queues in use on the system, if whether or not
the CUPS web interface is enabled, as well as the level of logging that the daemon will use.
/etc/printcap
This is the legacy file that was used by the LPD (Line Printer Daemon) protocol before the
advent of CUPS. CUPS will still create this file on systems for backwards compatibility and it is
often-times a symbolic link to /run/cups/printcap. Each line in this file contains a printer
that the system has access to.
/etc/cups/printers.conf
This file contains each printer that is configured to be used by the CUPS system. Each printer
and its associated print queue in this file is enclosed within a <Printer></Printer> stanza.
This file provides the individual printer listings found within /etc/printcap.

No modifications to the /etc/cups/printers.conf file should be made at
the command line while the CUPS service is running.

/etc/cups/ppd/
This is not a configuration file but a directory that holds the PostScript Printer Description (PPD)
files for the printers that use them. Each printer’s operating capabilities will be stored within a
PPD file (ending in the .ppd extension). These are plain-text files and follow a specific format.
The CUPS service also utilizes logging in much the same manner as the Apache 2 service. The logs
are stored within /var/log/cups/ and contain an access_log, page_log, and an error_log.
The access_log keeps a record of access to the CUPS web interface as well as actions taken
within it, such as printer management. The page_log keeps track of print jobs that have been
submitted to the print queues managed by the CUPS installation. The error_log will contain
messages about print jobs that have failed and other errors recorded by the web interface.
We will next look at the tools and utilities that are used to manage the CUPS service.

Using the Web Interface
As stated earlier, the /etc/cups/cupsd.conf configuration file determines if the web interface
for the CUPS system is enabled. The configuration option looks like this:
WebInterface Yes

If the web interface is enabled, then CUPS can be managed from a browser at the default URL of

357

http://localhost:631. By default a user on the system can view printers and print queues but
any form of configuration modification requires a user with root access to authenticate with the
web service. The configuration stanza within the /etc/cups/cupsd.conf file for restricting
access to administrative capabilities will resemble the following:
<Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class
CUPS-Set-Default>
AuthType Default
Require user @SYSTEM
Order deny,allow
</Limit>

Here is a breakdown of these options:
AuthType Default
will use a basic authentication prompt when an action requires root access.
Require user @SYSTEM
indicates that a user with administrative privileges will be required for the operation. This
could be changed to @groupname where members of groupname can administer the CUPS
service or individual users could be provided with a list as in Require user carol, tim.
Order deny,allow
works much like the Apache 2 configuration option where the action is denied by default
unless a user (or member of a group) is authenticated.
The web interface for CUPS can be disabled by first stopping the CUPS service, changing the
WebInterface option from Yes to No, then restarting the CUPS service.
The CUPS web interface is built like a basic web site with navigation tabs for various sections of
CUPS system. The tabs in the web interface include the following:
Home
The home page will list the current version of CUPS that is installed. It also breaks down CUPS
into sections such as:
CUPS for Users
Provides a description of CUPS, command-line options for working with printers and print
queues, and a link to the CUPS user forum.

358

CUPS for Administrators
Provides links in the interface to install and manage printers and links to information about
working with printers on a network.
CUPS for Developers
Provides links to developing for CUPS itself as well as creating PPD files for printers.
Administration
The administration page is also broken down into sections:
Printers
Here an administrator can add new printers to the system, locate printers connected to the
system and manage printers that are already installed.
Classes
Classes are a mechanism where printers can be added to groups with specific policies. For
example, a class can contain a group of printers that belong to a specific floor of a building
that only users within a particular department can print to. Another class can have
limitations on how many pages a user can print. Classes are not created by default on a
CUPS installation and have to be defined by an administrator. This is the section in the CUPS
web interface where new classes can be created and managed.
Jobs
This is where an administrator can view all print jobs that are currently in queue for all
printers that this CUPS installation manages.
Server
This is where an administrator can make changes to the /etc/cups/cupsd.conf file. Also,
further configuration options are available via check boxes such as allowing printers
connected to this CUPS installation to be shared on a network, advanced authentication, and
allowing remote printer administration.
Classes
If printer classes are configured on the system they will be listed on this page. Each printer
class will have options to manage all of the printers in the class at once, as well as view all jobs
that are in queue for the printers in this class.
Help
This tab provides links for all of the available documentation for CUPS that is installed on the
system.

359

Jobs
The Jobs tab allows for the searching of individual print jobs as well as listing out all of the
current print jobs managed by the server.
Printers
The Printers tab lists all of the printers currently managed by the system as well as a quick
overview of each printer’s status. Each printer listed can be clicked on and the administrator
will be taken to the page where the individual printer can be further managed. The
information for the printers on this tab comes from the /etc/cups/printers.conf file.

Installing a Printer
Adding a printer queue to the system is a simple process within the CUPS web interface:
1. Click on the Administration tab then the Add Printer button.
## 2. The next page will provide various options depending on how your printer is connected to your
system. If it is a local printer select the most relevant option such as which port the printer is
connected to or which third-party printer software may be installed. CUPS will also try to detect
printers that are connected to the network and display those here. You can also choose a direct
connection option to a network printer depending on which network printing protocols the
printer supports. Select your appropriate option and click on the Continue button.
3. The next page will allow you to provide a name, description, and location (such as “back office”
or “front desk” etc.) for the printer. If you wish to share this printer over the network you can
select the check box for that option on this page as well. Once your settings have been entered,
click on the Continue button.
4. The next page is where the printer’s make and model can be selected. This allows CUPS to
search its locally installed database for the most suitable drivers and PPD files to use with the
printer. If you have a PPD file provided by the printer manufacturer, browse to its location and
select it for use here. Once this is done, click on the Add Printer button.
5. The final page is where you would set your default options such as the page size that the
printer will use and the resolution of the characters printed to the page. Click on the Set
Default Options button and your printer is now installed on your system.

360

Many desktop installations of Linux will have different tools that can be used to
install a printer. The GNOME and KDE desktop environments have their own
applications built-in that can be used to install and manage printers. Also, some
distributions provide separate printer management applications. However when
dealing with a server installation that many users will print to, the CUPS web
interface may provide the best tools for the task.

A printer’s queue may also be installed using the legacy LPD/LPR commands. Here is an example
using the lpadmin command:
$ sudo lpadmin -p ENVY-4510 -L "office" -v socket://192.168.150.25 -m everywhere

We will break down the command to illustrate the options used here:
- Since the addition of a printer to the system requires a user with administrative privileges, we
prepend the lpadmin command with sudo.
- The -p option is the destination for your print jobs. It is essentially a friendly name for the user
to know where the print jobs will land. Typically you can provide the name of the printer.
- The -L option is the location of the printer. This is optional but helpful should you need to
manage a number of printers in various locations.
- The -v option is for the printer device’s URI. The device URI is what the CUPS print queue needs
in order to send rendered print jobs to a specific printer. In our example, we are using a
network location using the IP address provided.
- The final option, -m, is set to “everywhere”. This sets the model of the printer for CUPS to
determine which PPD file to use. In modern versions of CUPS, it is best to use “everywhere” so
that CUPS can check the device URI (set with the previous -v option) to automatically
determine the correct PPD file to use for the printer. In modern situations, CUPS will just use
IPP as explained below.
As stated previously, it is best to let CUPS automatically determine which PPD file to use for a
particular print queue. However, the legacy lpinfo command can be used to query the locally
installed PPD files to see what are available. Just provide the --make-and-model option for the
printer you wish to install and the -m option:
$ lpinfo --make-and-model "HP Envy 4510" -m
hplip:0/ppd/hplip/HP/hp-envy_4510_series-hpijs.ppd HP Envy 4510 Series hpijs, 3.17.10
hplip:1/ppd/hplip/HP/hp-envy_4510_series-hpijs.ppd HP Envy 4510 Series hpijs, 3.17.10
hplip:2/ppd/hplip/HP/hp-envy_4510_series-hpijs.ppd HP Envy 4510 Series hpijs, 3.17.10
drv:///hpcups.crv/hp-envy_4510_series.ppd HP Envy 4510 Series, hpcups 3.17.10
everywhere IPP Everywhere

Note that the lpinfo command is deprecated. It is shown here as an example of listing out what
print driver files a printer could use.

Future versions of CUPS have deprecated drivers and will instead focus on
using IPP (Internet Printing Protocol) and standard file formats. The output of

361

the previous command illustrates this with the everywhere IPP
Everywhere printing capability. IPP can perform the same tasks that a print
driver is used for. IPP, just like the CUPS web interface, utilizes network port
631 with the TCP protocol.
A default printer can be set using the lpoptions command. This way, should the majority (or all)
print jobs be sent to a particular printer then the one specified with the lpoptions command will
be the default. Just specify the printer along with the -d option:
$ lpoptions -d ENVY-4510

Managing Printers
Once a printer has been installed an administrator could use the web interface to manage the
options that are available to the printer. A more direct approach to managing a printer is through
the use of the lpadmin command.
One option is allowing the ability for a printer to be shared on the network. This can be achieved
with the printer-is-shared option, and by specifying the printer with the -p option:
$ sudo lpadmin -p FRONT-DESK -o printer-is-shared=true

An administrator can also configure a print queue to only accept print jobs from specific users
with each user separated by a comma:
$ sudo lpadmin -p FRONT-DESK -u allow:carol,frank,grace

Inversely, only specific users could be denied access to a specific print queue:
$ sudo lpadmin -p FRONT-DESK -u deny:dave

User groups could also be used to allow or deny access to a printer’s queue provided that the
group’s name is preceded by an “at” (@) character:
$ sudo lpadmin -p FRONT-DESK -u deny:@sales,@marketing

A print queue can also have an error policy should it encounter issues printing a job. With the use

362

of policies, a print job could be aborted (abort-job) or another attempt to print it could occur at a
later time (retry-job). Other policies include the ability to stop the printer immediately should
an error occur (stop-printer) as well as the ability to retry the job immediately after a failure is
detected (retry-current-job). Here is an example where the printer policy is set to abort the
print job should an error occur on the FRONT-DESK printer:
$ sudo lpadmin -p FRONT-DESK -o printer-error-policy=abort-job

Be sure to review the manual pages for the lpadmin command located at lpadmin(8) for further
details on the usage of this command.

Submitting Print Jobs
Many desktop applications will allow you to submit print jobs from a menu item or by using the
Ctrl + p keyboard shortcut. Should you find yourself on a Linux system that does not utilize a
desktop environment, you can still send files to a printer by way of the legacy LPD/LPR
commands.
The lpr (“line printer remote”) command is used to send a print job to a printer’s queue. In the
command’s most basic form, a file name along with the lpr command is all that is required:
$ lpr report.txt

The above command will send the file report.txt to the default print queue for the system (as
identified by the /etc/cups/printers.conf file).
If a CUPS installation has multiple printers installed then the lpstat command can be used to
print out a list of available printers using the -p option and the -d option will indicate which is
the default printer:
$ lpstat -p -d
printer FRONT-DESK is idle.

enabled since Mon 03 Aug 2020 10:33:07 AM EDT

printer PostScript_oc0303387803 disabled since Sat 07 Mar 2020 08:33:11 PM EST reason unknown
printer ENVY-4510 is idle.

enabled since Fri 31 Jul 2020 10:08:31 AM EDT

system default destination: ENVY-4510

So in our example here, the report.txt file will be sent to the ENVY-4510 printer as it is set as
the default. Should the file need to be printed at a different printer, specify the printer along with

363

the -P option:
$ lpr -P FRONT-DESK report.txt

When a print job is submitted to CUPS the daemon will figure out which backend is best suited to
handle the task. CUPS can make use of various printer drivers, filters, hardware port monitors
and other software to properly render the document. There will be times when a user printing a
document will need to make modifications to how the document should be printed. Many
graphical applications make this task rather easy. There are also command line options that can
be utilized to change how a document should be printed. When a print job is submitted via the
command line, the -o switch (for “options”) can be used in conjunction with specific terms to
adjust the document’s layout for printing. Here is a short list of commonly used options:
landscape
The document is printed where the page is rotated 90 degrees clockwise. The option
orientation-requested=4 will achieve the same result.
two-sided-long-edge
The printer will print the document in portrait mode on both sides of the paper, provided that
the printer supports this capability.
two-sided-short-edge
The printer will print the document in landscape mode on both sides of the paper, provided
that the printer supports this capability.
media
The printer will print the job to the specified media size. The media sizes available for a print
job to use depend on the printer, but here is a list of common sizes:
Size Option

A4

ISO A4

Letter

US Letter

Legal

US Legal

DL

ISO DL Envelope

COM10

US #10 Envelope

collate
Collate the printed document. This is helpful if you have a multi-page document that will be
364

printed more than once as all of the pages for each document will then be printed in order. Set
this option to either true to enable it or false to disable it.
page-ranges
This option can be used to select a single page to print, or a specific set of pages to print from a
document. An example would look like: -o page-ranges=5-7,9,15. This would print pages 5,
6 and 7 then pages 9 and 15.
fit-to-page
Print the document so that the file is scaled to fit the paper. If no information about the page
size is provided by the file to be printed, it is possible that the printed job will be scaled
incorrectly and portions of the document could be scaled off the page or the document could be
scaled too small.
outputorder
Print the document in either reverse order or normal to start the printing on page one. If a
printer prints its pages face-down, the default is for the order to be -o outputorder=normal
whereas printers that print with their pages facing up will print with -o
outputorder=reverse.
Taking a sampling of the options above, the following example command can be constructed:
$ lpr -P ACCOUNTING-LASERJET -o landscape -o media=A4 -o two-sided-short-edge financereport.pdf

More than one copy of a document can be printed by using the number option in the following
format: -#N where N is equal to the number of copies to print. Here is an example with the collate
option where seven copies of a report are to be printed on the default printer:
$ lpr -#7 -o collate=true status-report.pdf

Aside from the lpr command, the lp command can also be used. Many of the options that are
used with the lpr command can also be used with the lp command, but there are some
differences. Be sure to consult the man page at lp(1) for reference. Here is how we can run the
previous example lpr command using the syntax of the lp command while also specifying the
destination printer with the -d option:
$ lp -d ACCOUNTING-LASERJET -n 7 -o collate=true status-report.pdf

365

Managing Print Jobs
As stated earlier, each print job submitted to the print queue receives a job ID from CUPS. A user
can view the print jobs that they have submitted with the lpq command. Passing in the -a option
will show the queues of all printers that are managed by the CUPS installation:
$ lpq -a
Rank

Owner

Job

File(s)

Total Size

1st

20

finance-report.pdf

5072 bytes

The same lpstat command used previously also has an option to view printer queues. The -o
option by itself will show all print queues, or a print queue can be specified by name:
$ lp -o
ACCOUNTING-LASERJET-4

19456

Wed 05 Aug 2020 04:29:44 PM EDT

The print job ID will be prepended with the name of the queue where the job was sent, then the
name of the user that submitted the job, the file’s size, and the time it was submitted.
Should a print job get stuck on a printer or a user wishes to cancel their print job, use the lprm
command along with the job ID found from the lpq command:
$ lprm 20

All jobs in a print queue could be deleted at once by providing just a dash -:
$ lprm -

Alternatively, the CUPS cancel command could also be used by a user to stop their current print
job:
$ cancel

A specific print job can be cancelled by its job ID prepended by the printer name:
$ cancel ACCOUNTING-LASERJET-20

366

A print job can also be moved from one print queue to another. This is often helpful should a
printer stop responding or the document to be printed requires features available on a different
printer. Take note that this procedure typically requires a user with elevated privileges. Using the
same print job from the previous example, we could move it to the queue of the FRONT-DESK
printer:
$ sudo lpmove ACCOUNTING-LASERJET-20 FRONT-DESK

Removing Printers
To remove a printer, it is often helpful to first list out all of the printers that are currently
managed by the CUPS service. This can be done with the lpstat command:
$ lpstat -v
device for FRONT-DESK: socket://192.168.150.24
device for ENVY-4510: socket://192.168.150.25
device for PostScript_oc0303387803: ///dev/null

The -v option not only lists out the printers but also where (and how) they are attached. It is good
practice to first reject any new jobs going to the printer and provide a reason as to why the printer
will not be accepting new jobs. This can be done with the following:
$ sudo cupsreject -r "Printer to be removed" FRONT-DESK

Note the use of sudo as this task requires a user with elevated privileges.
To remove a printer, we utilize the lpadmin command with the -x option to delete the printer:
$ sudo lpadmin -x FRONT-DESK

367

1. A new printer was just installed on a local workstation named office-mgr. What command
could be used to set this printer as the default for this workstation?

## 2. Which command and option would be used to determine what printers are available for
printing from a workstation?

## 3. Using the cancel command, how would you remove a print job with ID 15 that is stuck in the
queue for the printer named office-mgr?

## 4. You have a print job destined for a printer that does not have enough paper to print the full
file. What command would you use to move the print job with ID 2 queued to print on the
FRONT-DESK printer over to the print queue for the ACCOUNTING-LASERJET printer?

368

Using your distribution’s package manager, install the cups and the printer-driver-cups-pdf
packages. Note that if you are using a Red Hat based distribution (such as Fedora) the CUPS PDF
driver is called cups-pdf. Also install the cups-client package to utilize the System V style
printing commands We will use these packages to practice managing a CUPS printer without
physically installing a real printer.
1. Verify that the CUPS daemon is running, then verify that the PDF printer is enabled and set to
the default.

## 2. Run a command that will print the /etc/services file. You should now have a directory
named PDF within your home directory.

## 3. Use a command that will only disable the printer, then run a separate command that shows all
status information to verify that the PDF printer is disabled. Then try to print a copy of your
/etc/fstab file. What happens?

4. Now try to print a copy of the /etc/fstab file to the PDF printer. What happens?

## 5. Cancel the print job, then remove the PDF printer.

369

The CUPS daemon is a widely-used platform for printing to local and remote printers. While it
supersedes the legacy LPD protocol it still provides backwards compatibility for its tools.
The files and commands discussed in this lesson were:
/etc/cups/cupsd.conf
The primary configuration file for the CUPS service itself. This file also controls access to the
web interface for CUPS.
/etc/printcap
A legacy file used by LPD that contains a line for each printer connected to the system.
/etc/cups/printers.conf
The configuration file used by CUPS for printer information.
The CUPS web interface, which on a default installation can be found at http://localhost:631.
Remember that the default network port for the web interface is 631/TCP.
The following legacy LPD/LPR commands were also discussed:
lpadmin
Used to install and remove printers and printer classes.
lpoptions
Used to print out printer options and to modify a printer’s settings.
lpstat
Used to display status information of the printers connected to a CUPS installation.
lpr
Used to submit print jobs to a printer’s queue.
lp
Used to submit print jobs to a printer’s queue.
lpq
This command lists out the print jobs within the print queue.

370

lprm
Used to cancel print jobs by ID. The ID for a job can be obtained with the output of the lpq
command.
cancel
An alternative to the lprm command to cancel print jobs by their ID.
Be sure to review the following man pages for the various tools and utilities for cups:
lpadmin(8), lpoptions(1), lpr(1), lpq(1), lprm(1), cancel(1), lpstat(1), cupsenable(8)
and cupsaccept(8). Reviewing the online help documentation at http://localhost:631/help
is also recommended.

371

1. A new printer was just installed on a local workstation named office-mgr. What command
could be used to set this printer as the default for this workstation?
$ lpoptions -d office-mgr

## 2. Which command and option would be used to determine what printers are available for
printing from a workstation?
$ lpstat -p

The -p option lists out all available printers and if they are enabled for printing.
3. Using the cancel command, how would you remove a print job with ID 15 that is stuck in the
queue for the printer named office-mgr?
$ cancel office-mgr-15

## 4. You have a print job destined for a printer that does not have enough paper to print the full
file. What command would you use to move the print job with ID 2 queued to print on the
FRONT-DESK printer over to the print queue for the ACCOUNTING-LASERJET printer?
$ sudo lpmove FRONT-DESK-2 ACCOUNTING-LASERJET

372

Using your distribution’s package manager, install the cups and the printer-driver-cups-pdf
packages. Note that if you are using a Red Hat based distribution (such as Fedora) the CUPS PDF
driver is called cups-pdf. We will use these packages to practice managing a CUPS printer
without physically installing a real printer.
1. Verify that the CUPS daemon is running, then verify that the PDF printer is enabled and set to
the default.
One method to check the availability and status of the PDF printer would be to run the
$ lpstat -p -d
printer PDF is idle.

enabled since Thu 25 Jun 2020 02:36:07 PM EDTi

system default destination: PDF

## 2. Run a command that will print the /etc/services file. You should now have a directory
named PDF within your home directory.
$ lp -d PDF /etc/services

would work. You will now have a PDF version of this file within the PDF directory.
3. Use a command that will only disable the printer, then run a separate command that shows all
status information to verify that the PDF printer is disabled.
$ sudo cupsdisable PDF

will disable the printer.
Next run the lpstat -t command to get a full listing of the printer’s condition. It should look
similar to the following output:
$ scheduler is running
system default destination: PDFi

373

device for PDF: cups-pdf:/
PDF accepting requests since Wed 05 Aug 2020 04:19:15 PM EDTi
printer PDF disabled since Wed 05 Aug 2020 04:19:15 PM EDT Paused

4. Now try to print a copy of the /etc/fstab file to the PDF printer. What happens?
After attempting the command lp -d PDF /etc/fstab you should get output showing the job
ID information. However, if you check the PDF folder in your home directory, the new file is
not there. You can then check the print queue with the lpstat -o command, and you will find
your job listed there.
5. Cancel the print job, then remove the PDF printer.
Using the output from the previous lp command, use the cancel command to delete the job.
$ cancel PDF-4

Then run the lpstat -o command to verify that the job has been deleted.
Remove the PDF printer with the following: sudo lpadmin -x PDF. Then verify that the
printer has been removed: lpstat -a.

374

LPIC-1 (102) (Version 5.0) |

## Topic 109: Networking Fundamentals

375

### 109.1 Fundamentals of internet protocols
LPIC-1 version 5.0, Exam 102, Objective 109.1
- Demonstrate an understanding of network masks and CIDR notation.
- Knowledge of the differences between private and public "dotted quad" IP addresses.
- Knowledge about common TCP and UDP ports and services (20, 21, 22, 23, 25, 53, 80, 110,
123, 139, 143, 161, 162, 389, 443, 465, 514, 636, 993, 995).
- Knowledge about the differences and major features of UDP, TCP and ICMP.
- Knowledge of the major differences between IPv4 and IPv6.
- Knowledge of the basic features of IPv6.
- /etc/services
- IPv4, IPv6
- Subnetting
- TCP, UDP, ICMP

376

### 109.1 Lesson 1

### 109.1 Fundamentals of internet protocols

The TCP/IP (Transmission Control Protocol/Internet Protocol) is a stack of protocols used to enable
communication between computers. Despite the name, the stack consists of several protocols such
as IP, TCP, UDP, ICMP, DNS, SMTP, ARP and others.

IP (Internet Protocol)
The IP is the protocol responsible for the logical addressing of a host, enabling the packet to be
sent from one host to another. For this each device on the network is assigned a unique IP
address, and it is possible to assign more than one address to the same device.
In the version 4 of the IP protocol, usually called IPv4, the address is formed by a set of 32 bits
separated into 4 groups of 8 bits, represented in decimal form, called “dotted quad”. For example:
Binary format (4 groups of 8 bits)
11000000.10101000.00001010.00010100

Decimal format
192.168.10.20
In IPv4, the values for each octet can range from 0 to 255, which is the equivalent of 11111111 in
binary format.

Address Classes
Theoretically, IP addresses are separated by classes, which are defined by the range of the first
octet as shown in the table below:
Class

First Octect

Example

1-126

1.0.0.0 –
126.255.255.255

10.25.13.10

B

128-191

128.0.0.0 –
191.255.255.255

141.150.200.1

C

192-223

192.0.0.0 –
223.255.255.255

200.178.12.242

Public and Private IPs
As mentioned earlier, for communication to occur each device on the network must be associated
with at least one unique IP address. However, if each device connected to the Internet in the
world had a unique IP address, there would not be enough IPs (v4) for everyone. For this, private
IP addresses were defined.
Private IPs are ranges of IP addresses that have been reserved for use in the internal (private)
networks of companies, institutions, homes, etc. Within the same network, the use of an IP
address remains unique. However, the same private IP address can be used within any private
network.
Thus, on the Internet we have data traffic using public IP addresses, which are recognizable and
routed over the Internet, while within private networks these reserved IP ranges are used. The
router is responsible for converting traffic from the private network to the public network and
vice versa.
The ranges of Private IPs, separated by classes, can be seen in the table below:

378

Class

First Octet

Private IPs

1-126

1.0.0.0 –
126.255.255.255

10.0.0.0 –
10.255.255.255

B

128-191

128.0.0.0 –
191.255.255.255

172.16.0.0 –
172.31.255.255

C

192-223

192.0.0.0 –
223.255.255.255

192.168.0.0 –
192.168.255.255

Converting from Decimal Format to Binary
For the subjects of this topic, it is important to know how to convert IP addresses between binary
and decimal formats.
The conversion from decimal format to binary is done through consecutive divisions by 2. As an
example, let’s convert the value 105 by the following steps:
1. Dividing the value 105 by 2 we have:
105/2
Quotient = 52
Rest = 1

## 2. Divide the quotient sequentially by 2, until the quotient is equal to 1:
52/2
Rest = 0
Quotient = 26

26/2
Rest = 0
Quotient = 13

13/2
Rest = 1
Quotient = 6

6/2

379

Rest = 0
Quotient = 3

3/2
Rest = 1
Quotient = 1

## 3. Group the last quotient followed by the remainder of all divisions:
1101001

## 4. Fill in 0s to the left until 8 bits are completed:
01101001

5. In the end, we have that the value 105 in decimal is equal to 01101001 in binary.

Converting from Binary Format to Decimal
In this example, we will use the binary value 10110000.
1. Each bit is associated with a value with a base power of two. The powers are started at 0, and
are incremented from right to left. In this example we will have:

2. When the bit is 1, we assign the value of the respective power, when the bit is 0 the result is 0.

32

## 3. Add up all values:
128 + 32 + 16 = 176
4. Thus, 10110000 in binary is equal to 176 in decimal.

380

Netmask
The network mask (or netmask) is used in conjunction with the IP address to determine which
part of the IP represents the network and which represents the hosts. It has the same format as
the IP address, that is, there are 32 bits in 4 groups of 8. For example:
Decimal

Binary

CIDR

255.0.0.0

11111111.00000000.0000000 8
0.00000000

255.255.0.0

11111111.11111111.0000000 16
0.00000000

11111111.11111111.1111111 24
1.00000000

Using the 255.255.0.0 mask as an example, it indicates that in the IP associated with it, the first
16 bits (2 first decimals) identify the network/subnet and the last 16 bits are used to uniquely
identify the hosts within the network.
The CIDR (Classless Inter-Domain Routing) mentioned above is related to a simplified mask
notation, which indicates the number of bits (1) associated with the network/subnet. This notation
is commonly used to replace the decimal format, for example /24 instead of 255.255.255.0.
It is interesting to note that each class of IP has a standard mask, as follows:
Class

First Octet

Default Mask

1-126

1.0.0.0 –
126.255.255.255

255.0.0.0 / 8

B

128-191

128.0.0.0 –
191.255.255.255

255.255.0.0 / 16

C

192-223

192.0.0.0 –
223.255.255.255

255.255.255.0 / 24

However, this pattern does not mean that this is the mask that will always be used. It is possible to
use any mask with any IP address, as we will see below.
Here are some examples of using IPs and Masks:
192.168.8.12 / 255.255.255.0 / 24

381

192.168.8.0 - 192.168.8.255
Network Address
Broadcast Address
192.168.8.255
Hosts
192.168.8.1 - 192.168.8.254
In this case we have the first 3 digits (first 24 bits) of the IP address define the network and the
final digit identifies the addresses of the hosts, that is, the range of this network goes from
192.168.8.0 to 192.168.8.255.
We now have two important concepts: Every network/subnet has 2 reserved addresses, the first
address in the range is called the network address. In this case 192.168.8.0, which is used to
identify the network/subnet itself. The last address in the range is called the broadcast address, in
this case 192.168.8.255. This destination address is used to send the same message (packet) to
all IP hosts on that network/subnet.
The network and broadcast addresses cannot be used by the machines on the network. Therefore,
the list of IPs that can be effectively configured ranges from 192.168.8.1 to 192.168.8.254.
Now the example of the same IP, but with a different mask:
192.168.8.12 / 255.255.0.0 / 16

192.168.0.0 - 192.168.255.255
Network Address
192.168.0.0
Broadcast Address
192.168.255.255
Hosts
192.168.0.1 – 192.168.255.254

382

See how the different mask changes the range of IPs that are within the same network/subnet.
The division of networks by masks is not restricted to the default values (8, 16, 24). We can create
subdivisions as desired, adding or removing bits in the network identification, creating the new
subnets.
11111111.11111111.11111111.00000000 = 255.255.255.0 = 24

If we want to subdivide the network above into 2, just add another bit to the network
identification in the mask, like this:
11111111.11111111.11111111.10000000 = 255.255.255.128 = 25

We have then the following subnets:

- 192.168.8.127

192.168.8.128 - 192.168.8.255

If we further increase the subdivision of the network:
11111111.11111111.11111111.11000000 = 255.255.255.192 = 26

We will have:

- 192.168.8.63

192.168.8.64

- 192.168.8.127

192.168.8.128 - 192.168.8.191
192.168.8.192 - 192.168.8.255

Note that in each subnet we will have the reserved network (the first in the range) and broadcast
(the last in the range) addresses, so the more the network is subdivided, the fewer IPs can be
effectively used by the hosts.

Identifying the Network and Broadcast Addresses
Through an IP Address and a Mask, we can identify the network address and the broadcast

383

address, and thus define the range of IPs for the network/subnet.
The network address is obtained by using a “Logical AND” between the IP address and the mask in
their binary formats. Let’s take the example using IP 192.168.8.12 and mask 255.255.255.192.
Converting from decimal to binary format, as we saw earlier, we have:
11000000.10101000.00001000.00001100 (192.168.8.12)
11111111.11111111.11111111.11000000 (255.255.255.192)

With “Logical AND”, we have 1 and 1 = 1, 0 and 0 = 0, 1 and 0 = 0, so:
11000000.10101000.00001000.00001100 (192.168.8.12)
11111111.11111111.11111111.11000000 (255.255.255.192)
11000000.10101000.00001000.00000000

So the network address for that subnet is 192.168.8.0.
Now to obtain the broadcast address, we must use the network address where all bits related to
the host address to 1:
11000000.10101000.00001000.00000000 (192.168.8.0)
11111111.11111111.11111111.11000000 (255.255.255.192)
11000000.10101000.00001000.00111111

The broadcast address is then 192.168.8.63.
In conclusion, we have:
192.168.8.12 / 255.255.255.192 / 26

192.168.8.0 - 192.168.8.63
Network Address
Broadcast Address
192.168.8.63

384

Hosts
192.168.8.1 – 192.168.8.62

Default Route
As we have seen so far, machines that are within the same logical network/subnet can
communicate directly via the IP protocol.
But let’s consider the example below:
Network 1
192.168.10.0/24
Network 2
192.168.200.0/24
In this case, the 192.168.10.20 machine cannot directly send a packet to the 192.168.200.100,
as they are on different logical networks.
To enable this communication a router (or a set of routers) is used. A router in this configuration
can also be called a gateway as it provides a gateway between two networks. This device has
access to both networks as it is configured with IPs from both networks. For example
192.168.10.1 and 192.168.200.1, and for this reason it manages to be the intermediary in this
communication.
To enable this, each host on the network must have configured what is called the default route.
The default route indicates the IP to which all packets whose destination is an IP that is not part of
the host’s logical network must be sent.
In the example above, the default route for machines on the 192.168.10.0/24 network will be
the IP 192.168.10.1, which is the router/gateway IP, while the default route for machines on the
192.168.200.0/24 network will be 192.168.200.1.
The default route is also used so that machines on the private network (LAN) have access to the
Internet (WAN), through a router.

385

## 1. Using the IP 172.16.30.230 and netmask 255.255.255.224, identify:
The CIDR notation for the netmask
Network address
Broadcast address
Number of IPs that can be used for hosts in
this subnet
2. Which setting is required on a host to allow an IP communication with a host in a different
logical network?

386

## 1. Why are the IP ranges starting with 127 and the range after 224 not included in the IP address
classes A, B or C?

## 2. One of the fields belonging to an IP packet that is very important is TTL (Time To Live). What is
the function of this field and how does it work?

## 3. Explain the function of NAT and when it is used.

387

This lesson covered the main concepts for the IPv4 protocol, which is responsible for enabling
communication between hosts on a network.
The main operations that the professional must know in order to convert the IPs in different
formats, and to be able to analyze and perform the logical configurations on networks and
subnets were also studied.
The following subjects were addressed:
- IP addresses classes
- Public and private IPs
- How to convert IPs from decimal to binary format, and vice versa
- The network mask (netmask)
- How to identify the network and broadcast addresses from IP and netmask
- Default route

388

## 1. Using the IP 172.16.30.230 and netmask 255.255.255.224, identify:
The CIDR notation for the netmask

27

Network address

172.16.30.224

Broadcast address

172.16.30.255

Number of IPs that can be used for hosts in
this subnet

30

## 2. Which setting is required on a host to allow an IP communication with a host in a different
logical network?
Default route

## 1. Why are the IP ranges starting with 127 and the range after 224 not included in the IP address
classes A, B or C?
The range that starts with 127 is reserved for loopback addresses, used for tests and internal
communication between processes, such as the address 127.0.0.1. In addition, addresses
above 224 are also not used as host addresses, but for multicast and other purposes.
2. One of the fields belonging to an IP packet that is very important is TTL (Time To Live). What is
the function of this field and how does it work?
TTL defines the lifetime of a packet. This is implemented through a counter in which the initial
value defined at the source is decremented in each gateway/router through which the packet
passes, which is also called a “hop”. If this counter reaches 0 the packet is discarded.
3. Explain the function of NAT and when it is used.
The NAT (Network Address Translation) feature allows hosts on an internal network, which
uses private IPs, to have access to the Internet as if they were directly connected to it, with the
Public IP used on the gateway.

390

### 109.1 Lesson 2

### 109.1 Fundamentals of internet protocols

At the beginning of this subtopic we saw that the TCP/IP stack is composed of a series of different
protocols. So far we have studied the IP protocol, which allows communication between machines
through IP addresses, masks, routes, etc.
For a host to be able to access a service available on another host, in addition to the IP addressing
protocol at the network layer, it will be necessary to use a protocol at the transport layer such as
the TCP and UDP protocols.
These protocols carry out this communication through network ports. So in addition to defining a
source and destination IP, source and destination ports will be used to access a service.
The port is identified by a 16-bit field thus providing a limit of 65,535 possible ports. The services
(destination) use ports 1 to 1023, which are called privileged ports because they have root access to
the system. The origin of the connection will use the range of ports from 1024 to 65,535, called
non-privileged ports, or socket ports.
The ports used by each type of service are standardized and controlled by IANA (Internet Assigned
Numbers Authority). This means that on any system, port 22 is used by the SSH service, port 80 by

391

the HTTP service and so on.
The table below contains the main services and their respective ports.
Port

Service

20

FTP (data)

21

FTP (control)

22

SSH (Secure Socket Shell)

23

Telnet (Remote connection without encryption)

SMTP (Simple Mail Transfer Protocol), Sending
Mails

53

DNS (Domain Name System)

80

HTTP (Hypertext Transfer Protocol)

110

POP3 (Post Office Protocol), Receiving Mails

123

NTP (Network Time Protocol)

139

Netbios

143

IMAP (Internet Message Access Protocol),
Accessing Mails

161

SNMP (Simple Network Management Protocol)

162

SNMPTRAP, SNMP Notifications

LDAP (Lightweight Directory Access Protocol)

443

HTTPS (Secure HTTP)

465

SMTPS (Secure SMTP)

514

RSH (Remote Shell)

636

LDAPS (Secure LDAP)

993

IMAPS (Secure IMAP)

995

POP3S (Secure POP3)

On a Linux system, standard service ports are listed in the /etc/services file.
The identification of the desired destination port in a connection is done using the character :
(colon) after the IPv4 address. Thus, when seeking access to the HTTPS service that is served by
the IP host 200.216.10.15, the client must send the request to the destination

392

200.216.10.15:443.
The services listed above, and all others, use a transport protocol according to the characteristics
required by the service, where TCP and UDP are the main ones.

Transmission Control Protocol (TCP)
TCP is a connection-oriented transport protocol. This means that a connection is established
between the client through the socket port, and the service through the service standard port. The
protocol is in charge of ensuring that all packets are delivered properly, verifying the integrity
and order of the packets, including the re-transmission of packets lost due to network errors.
Thus the application does not need to implement this data flow control as it is already guaranteed
by the TCP protocol.

User Datagram Protocol (UDP)
UDP establishes a connection between the client and the service, but does not control the data
transmission of that connection. In other words, it does not check if packages have been lost, or if
they are out of order, etc. The application is responsible for implementing the controls that are
necessary.
As there is less control, UDP enables better performance in the data flow which is important for
some types of services.

Internet Control Message Protocol (ICMP)
ICMP is a network layer protocol in the TCP/IP stack and its main function is to analyze and
control network elements, making it possible, for example:
- Traffic volume control
- Detection of unreachable destinations
- Route redirection
- Checking the status of remote hosts
It is the protocol used by the ping command, which will be studied in another subtopic.

So far we have studied version 4 of the IP protocol, i.e. IPv4. This has been the standard version

393

used in all network and Internet environments. However it has limitations especially in regards to
the number of available addresses, and with an already current reality that all devices will be
somehow connected to the Internet (see IoT), it is becoming increasingly common to use version 6
of the IP protocol, commonly written as IPv6.
IPv6 brings a series of changes, new implementations and features, as well as a new
representation of the address itself.
Each IPv6 address has 128 bits, divided into 8 groups of 16 bits, represented by hexadecimal
values.
2001:0db8:85a3:08d3:1319:8a2e:0370:7344

Abbreviations
IPv6 defines ways to shorten addresses in some situations. Let’s review the following address:
2001:0db8:85a3:0000:0000:0000:0000:7344

The first possibility is to reduce strings from 0000 to just 0, resulting in:
2001:0db8:85a3:0:0:0:0:7344

In addition, in case of group strings with a value of 0, they can be omitted, as follows:
2001:0db8:85a3::7344

However, this last abbreviation can only be done once in the address. See the example:
2001:0db8:85a3:0000:0000:1319:0000:7344
2001:0db8:85a3:0:0:1319:0:7344
2001:0db8:85a3::1319:0:7344

394

IPv6 Address Types
IPv6 classifies addresses into 3 types:
Unicast
Identifies a single network interface. By default, the 64 bits on the left identify the network, and
the 64 bits on the right identify the interface.
Multicast
Identifies a set of network interfaces. A packet sent to a multicast address will be sent to all
interfaces that belong to that group. Although similar, it should not be confused with broadcast,
which does not exist in the IPv6 protocol.
Anycast
This also identifies a set of interfaces on the network, but the packet forwarded to an anycast
address will be delivered to only one address in that set, not everyone.

Differences between IPv4 and IPv6
In addition to the address several other differences can be pointed out between versions 4 and 6
of the IP. Here are some of them:
- Service ports follow the same standards and protocols (TCP, UDP), the difference is only in the
representation of the IP and port set. In IPv6 the IP address must be protected with []
(brackets):
200.216.10.15:443
[2001:0db8:85a3:08d3:1319:8a2e:0370:7344]:443
- IPv6 does not implement the broadcast feature exactly as it exists in IPv4. However the same
result can be achieved by sending the packet to the address ff02::1, reaching all hosts on the
local network. Something similar to using 224.0.0.1 on IPv4 for multicasting as a destination.
- Through the SLAAC (Stateless Address Autoconfiguration) feature, IPv6 hosts are able to selfconfigure.
- The TTL (Time to Live) field of IPv4 has been replaced by the “Hop Limit” in the IPv6 header.
- All IPv6 interfaces have a local address, called link-local address, prefixed with fe80::/10.
- IPv6 implements the Neighbor Discovery Protocol (NDP), which is similar to the ARP used by

395

IPv4, but with much more functionality.

396

1. Which port is the default for the SMTP protocol?

2. How many different ports are available in a system?
