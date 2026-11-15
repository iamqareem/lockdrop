---
id: freebsd-jails-01
title: "FreeBSD Mastery · Jails — Introduction, The Jail Host, Jail Essentials, Jail Management…"
slug: freebsd-jails-01-freebsd-mastery-jails-introduction-the-jail-host-jail-essent
source: "FreeBSD Mastery — Jails"
sourceSection: "Chapter 0. Introduction, Chapter 1. The Jail Host, Chapter 2. Jail Essentials, Chapter 3. Jail Management, Chapter 4. Jail Filesystems, Chapter 5. Packages and Upgrades, Chapter 6. Space Optimization, Chapter 7. Living In A Jail, Chapter 8. Jail Features And Controls, Chapter 9. Networking, Chapter "
track: bsd-internals
tier: premium
tags: [bsd, freebsd, jails, containers, security]
summary: "When I first became a system administrator, operating system installations were Covers 15 sections: Introduction, The Jail Host, Jail Essentials."
---
# FreeBSD Mastery · Jails — Introduction, The Jail Host, Jail Essentials, Jail Management…

## Chapter 0. Introduction

When I first became a system administrator, operating system installations were
vital. Servers cost tens of thousands of dollars, and a medium-sized office had
only one or two. Initial installations were rare events that senior sysadmins
performed themselves—and with good reason, because everyone endured those
decisions for five or ten years. We parsimoniously partitioned disks to balance
performance and space utilization. We tuned or even rebuilt kernels to hoard
every scrap of memory for our precious applications. What we’d today call
routine updates and upgrades were tricky, dangerous events that required
meticulous planning, several meetings, and hours or days of scheduled
downtime.
Today, operating system installs are as common as sneezes and come in almost
as many varieties. Virtualization has revolutionized system administration more
than any other technology. We automatically deploy virtual systems to support
increased load, and auto-destroy them once the need passes. The sheer number
of operating system installs I’m responsible for would have horrified twentiethcentury me.

Virtualization and Jails
Virtualization separates an operating system install from the underlying
hardware, allowing you to stack operating system instances on top of one
another. The operating system instance installed directly on the computer is
called the host. The virtualization software running on the host provides virtual
hardware for further operating system installs, called virtual machines or guests.
Full virtualization creates a virtual machine, from the BIOS or UEFI on up, for
operating system installs. The virtualization system provides a keyboard, mouse,
and remote console (usually over VNC or a similar protocol). The virtual
machine gets a chunk of disk space, either on top of the host’s filesystem or
passed through to a disk partition. A subset of the host’s memory gets set aside
for the virtual machine. Full virtualization lets you run many wildly different
operating systems simultaneously on one host. FreeBSD’s full virtualization
server, bhyve, lets you run anything from Linux to Microsoft Windows on a
FreeBSD host.
Lightweight virtualization uses its own userland programs but runs on the host’s
kernel. Lightweight virtual machines don’t have private disks, but instead use
part of the host’s filesystem. The host provides any networking. The host’s kernel
directs the lightweight virtual machine’s memory, processor time, and
networking. Lightweight virtual machines on the same host can share filesystems
with one another. While the lightweight virtual machine cannot access the host,
the host can usually access the lightweight virtual machine.
FreeBSD’s jails were the first lightweight virtualization system in open source
Unix. Their capabilities have been continuously enhanced since their
introduction in 2000. Today’s jails can run their own network stacks and packet
filters, have private ZFS datasets, and do anything except run a different kernel.
The modern FreeBSD kernel supports binary interfaces for FreeBSD versions
back to FreeBSD 4, as well as certain versions of Linux. This compatibility is a
great way to ditch that scary old hardware while keeping a vital application
running.
Any time you see the word “host,” it refers to the operating system install
providing jail services. A host is the bottom layer of the stack of operating

systems. The word “jail” refers to a lightweight virtual machine running on the

Jails versus Chroots
Jails have been called “chroots on steroids.” That’s not wrong, but it’s not
wholly correct either.
Chroot, or changed root, locks a process into a subset of a filesystem, restricting
the files it can access. Chroots limit how much damage a deranged or damaged
process can inflict on the host. At one time, chrooting servers to proactively
contain intruders was a commonly recommended practice.¹ Today it’s still an
easy way to minimize potential damage, but not so widely recommended.
Chroot directories only contain files the chrooted program needs. Does the
program need a shell? If not, don’t put /bin/sh in the chroot. The same goes for
every other program, shared library, and script on the host. An intruder who
compromises a properly chrooted small program won’t be able to do much with
her access. Some servers, like OpenSSH’s sshd(8), chroot themselves into an
empty directory to thoroughly handicap potential intruders.
While a chroot limits disk access, it does nothing to restrict network access. A
chrooted program can access all of the host’s network interfaces and IP
addresses. It shares the same process and memory space with all the other
processes. Security tools like privilege separation and dropping privileges can
help, but a chrooted daemon can still access a whole bunch of resources that
aren’t the filesystem.
Jails unshare these resources.

What Is A Jail?
A jail is a collection of namespace transformations.
Uh, what?
Unix has many different named entities, each meant for a particular type of
application. Each entity has a discrete namespace. Process IDs are a namespace
—each PID is unique within it. The filesystem is a unique namespace, and each
file path is unique within it. An IP address attached to the host is unique in the
network namespace. Usernames are unique. Just as a single operating system
install can’t have two PID 100s, it can’t have two files named /etc/passwd or
attach 203.0.113.1 to multiple interfaces. You can create two identical
usernames, but it won’t end well.
A jail creates new namespaces for each of these.
Much like a chroot, a jail has a root directory somewhere on the host’s
filesystem. You might assign /var/www1 as the root directory for the jail www1.
Processes inside the jail think the contents of /var/www1 are in the root
directory. While a FreeBSD install can only have one /etc/passwd file, jailed
processes see /var/www1/etc/passwd as /etc/passwd. The host knows of many
passwd files across the filesystem, but a jailed process perceives only its own
namespace.
A chroot-style transformation won’t work on the network. A jail is granted
limited access to the host’s network stack, and can use only the IP addresses the
host permits. The host might have the whole IP range 198.51.100.1 through 254
attached to a NIC, but if a jail is only allocated 198.51.100.99, running ifconfig
em0 in the jail displays only 198.51.100.99. The host, though, can use the jail’s
IP address. If the host sysadmin wants to send a ping from a jail’s IP, she can
hijack that IP. The jail has no such option. (You can allocate a jail a private
network stack, as we’ll see in Chapter 9, but even that’s subordinate to the host.)
Rather like the network stack, process IDs are unique across the host. Each jail
gets a slice of the process namespace. Jailed processes can affect only other
processes within that jail’s process namespace. The host can create, signal,

terminate, and otherwise twiddle processes in any jail’s namespace.
The root user inside a jail is not the same as the root user of the host. A jail’s root
account can start and stop that jail’s processes, administer that jail’s users, and
even mount filesystems inside the jail if the host permits, but is helpless beyond
A jail is wholly subordinate to the host. Even if an intruder gains access to the
jailed system, the host retains supervisory access and can intervene. Think of it
like a literal jail cell. The inmates can freely use their own bed. The warden gets
a one-way mirror that looks into the cell and can impose changes at will.
Most jail documentation assumes that you’ll put a complete operating system
install in a jail, but that’s not necessary. You can populate a jail sparsely enough
to make the most hard-core chroot fan nod approvingly.

Jail Security
Some people argue that jails are not secure. Others claim they are secure. Who’s
right?
To be simultaneously correct and useless: both of them.
Like all security matters, the answer is “it depends.” Today’s sysadmins practice
in an environment where everything is a security risk. We can’t trust our
hardware, our operating systems, or our software. Every so often, someone
figures out a way to escape hypervisors. Developers patch and we all move on.
So jails are not secure.
The solution isn’t to rely on bare metal. A FreeBSD security expert spotlighted a
class of problems with Intel processors back in 2005 that recently reached
critical mass. Even if your main CPU is solid, what about all the other hardware?
Nowadays, many server components have their own operating system. You can
attach a serial console to the proper pins on a hard drive and get a command
prompt.
Nothing is secure. Everything is terrible.
Asking if a jail is secure means asking about your application, your environment,
and your risks. Should you provide nuclear missile controls with a jail? No. You
also shouldn’t control nuclear missiles on a public web site. Can you provide
customer web sites in a jail? Probably, unless you have the sort of customers that
get kicked off of one provider after another. Consider the risks that you, your
organization, and your customers face.
Even if you utterly trust the security provided by jails, they’re only one
component of a security strategy. You certainly need privilege management and
properly applied encryption. You need packet filters, proxies, and host- and
network-based intrusion detection. Really, the only optional component is the
disturbingly large and muscular people with antisocial personality disorder and
spiked clubs.²
If you don’t trust the security of jails for your application, restraining

applications via jails is still a great way to ensure that programs can’t interfere
with each other, satisfy conflicting software requirements, and complicate
attackers’ lives.

Documentation and History
BSD supported lightweight virtualization before any other mainstream operating
system. The earliest jail-type virtualization code appeared sometime between the
18 July 1975 snapshot of UNIX v6 and the 7 May 1979 snapshot of UNIX v7.
Poul-Henning Kamp created modern FreeBSD jails in 1998. Many people have
improved and expanded them since, building an incredibly flexible lightweight
virtualization platform. Features were added, refined, and refined again.
All this iterative development caused a documentation problem.
While the Internet is famed for obsolete tutorials, jails in particular suffer from
old documentation. Twenty-year-old mailing list posts will claim to solve your
problem, and the method given works—if you’re running FreeBSD 4.8 or
earlier. If you want to manage System V IPC facilities in a jail, documents claim
it’s impossible and there’s a sysctl and there are per-jail settings. You’ll find
recommendations to configure jails in /etc/rc.conf and /etc/jail.conf. And entire
dynasties of jail management tools have risen and fallen.
This book deals with all this history by ignoring it.
I present modern jail management, glossing over or outright skipping older
methods. Some folks prefer the older methods, and while there’s nothing wrong
with that you might as well start off learning the current way. If you’re
researching a problem and find advice that contradicts this book, check the date.
That heavily-cited post from 2005 is likely to be wrong. (If you’re still trying to
use this book in 2035: I’m sorry.)

Prerequisites
Unlike most of my other books, FreeBSD Mastery: Jails is not an introductory
book. Yes, it introduces jails—but using jails effectively means understanding
FreeBSD. You must understand ZFS snapshots and clones. You’ll need a grip on
devfs(5) and nullfs(5). I won’t explain pkg.conf or zfs send.
Similarly, you must understand networking if you want to use jails’ virtual
networking features. You can run basic jails without this expertise, but once you
get into jail isolation and firewalls you must understand bridges and routing
tables. You want to set up a DHCP server for your jails, or use PF to redirect
connections to your single public address to the dozens of jails tied to the
loopback? Good for you! Not my problem.
You can learn more about all of these topics in the FreeBSD Handbook and
FAQ, other online resources, or in other books I’ve written, like the newest
edition of Absolute FreeBSD (2018, No Starch Press) and the FreeBSD Mastery
books.
Jails require no special hardware support. When you’re starting to learn, though,
I recommend dedicating a separate IP address on your test system to each jail. It
isn’t strictly necessary, but will simplify the learning process. Chapters 9 and 11
discuss sharing a single IP address among multiple jails.
I specifically focus on FreeBSD 12 and later, because of vnet virtual networking
support. Much of this book works on earlier versions of FreeBSD, but if you’re
installing a new jail host proceed directly to 12 or newer.

Jails and ZFS
ZFS has a whole bunch of features that enhance the power of jails, chief among
them clones. Clones are wonderful. Clones are powerful. Unwatched clones can
destroy your system. Remember: Clones grow.
Even when you don’t do much with them.
If you deploy a jail by cloning another jail, the clone starts out using zero bytes.
Every change to the filesystem increases the clone’s size. Edit /etc/rc.conf? The
clone’s size increases by the size of rc.conf. Upgrade the jail to a new minor or
major release? The clone uses enough space for all the new binaries. Testing a
database upgrade and churning the entire storage backend adds the database size
to the clone size. Logs increase the clone’s size.
Clone growth isn’t a big deal when you have three or four jails. With five
hundred jails, that scripted freebsd-update upgrade might consume every sector
of disk you’ve got and demand more. Clone users must carefully monitor disk
space. Don’t blindly churn jail filesystems just because the tooling makes it easy.
Don’t upgrade cloned jails across major FreeBSD versions: upgrading FreeBSD
12 to FreeBSD 13 burns up any space savings offered by cloning. Instead, install
new jails for new FreeBSD versions.
When a storage pool fills, ZFS throws a tantrum. Recovering from a full pool is
complicated. Sysadmins using ZFS should reserve twenty percent of each pool’s
space for an overflow dataset, to get unmistakable but easily recoverable
warning of disk capacity issues. It’s much easier to reduce that reservation to
fifteen percent and order new disks than recover from a completely full pool.
When using cloned jails, space reservations are not a suggestion. They are
utterly mandatory.

Jail Management Tools
Every jail management system is an add-on tool. Even the base system’s
/etc/jail.conf is an add-on tool. Jails are created and destroyed by running jail(8)
with a whole bunch of command-line arguments. The jail(8) command has builtin support for parsing jail.conf and bootstrapping its own command-line
arguments, but other tools can generate those commands.
Also, each additional jail increases system complexity. A minimal standard jail
has three mount points (/, /dev, and /dev/fd). A dozen jails equals thirty-six
mount points. Depending on the filesystem used, those might all be separate
datasets or a mass of directories. Each base jail brings at least a dozen mount
points. Each jail has its own packages and users.
With all of this complexity, jails demand management tools. While we’ll cover
FreeBSD’s integrated jail management, if you intend to have many jails,
consider an add-on tool.
This book uses the newest version of iocage (https://github.com/iocage/). Highly
flexible, iocage is the most popular tool for managing jails on a single host. It’s
written in Python and the developers respond to bug reports. The author takes
reports of missing features as a personal challenge; if this book says that iocage
doesn’t support a feature, check the latest version to see if that’s still true.
Ezjail is one of the oldest jail management tools. Very popular in its time, ezjail
has not been updated for FreeBSD’s last few versions. I used ezjail, I liked it, but
it’s sadly out of date.
BSDPloy (https://github.com/ployground/bsdploy) is a tool for DevOps-style
mass jail deployment built on top of the Ploy infrastructure. It integrates with
other tools like Ansible and Fabric. If you speak DevOps, consider Ploy and
BSDPloy.
CBSD (https://bsdstore.ru/) is a hosting control panel for managing FreeBSD
virtualization across multiple hosts. It does jails. It does bhyve. It sings, it
dances, it brings you coffee. If you don’t manage servers as much as you herd
them, and if you want bhyve as well as jails, look at CBSD. I don’t cover CBSD

because I haven’t yet written a bhyve book.
And more: Fubarnetes (in Rust), jailctl, jailadmin, iocell, pot, and more.
No matter what jail management system you choose, in the medium-to-long term
you must understand what actions the tool takes. You need to understand the
jail’s underlying mechanisms. A jail might work great at setup, but when it goes
sideways only your comprehension and troubleshooting can restore service.
Additionally, you must be able to differentiate jail problems, FreeBSD issues,
and management tool bugs. For that reason, this book performs all jail
configurations both by hand and with iocage. To differentiate, I call jails that are
managed with base system tools standard jails, while iocage-managed jails are
iocage jails. Iocage jails are perfectly standard, mind you, and you can perfectly
emulate all iocage functions using only the base system, but it’s a useful
distinction when learning the tools.
Creating and removing jails is the smallest part of the problem. You must also
manage existing jails. While virtualization was created to divorce the operating
system from the hardware, many organizations use it as a way to kick problems
further up the stack so that maintaining all this crud becomes someone else’s
problem. While I fully support delegating routine maintenance to other people,
host sysadmins share responsibility for the jails they provide. Perhaps managing
a jailed server is the web developer’s problem, but his problems can escalate to
become your problems. Host administrators can manage many issues more
simply than jail owners. Leverage your tools to simplify everyone’s lives, and
tell your jail owners that you’ll do so. While spending half an hour negotiating
an operating agreement with your coworkers is annoying, it beats spending days
troubleshooting subtle problems created by multiple systems administrators
independently attacking one issue.

What’s In This Book?
You’re reading Chapter 0.
Chapter 1, The Jail Host, covers configuring your base FreeBSD install to best
support jails.
Chapter 2, Jail Essentials, takes you through the core concepts of jails. You’ll
learn to set up a simple jail using both base system tools and iocage.
Chapter 3, Jail Management, teaches you about tuning, viewing, and otherwise
herding jails.
Chapter 4, Jail Filesystems, discusses jail-specific aspects of filesystem
management.
Chapter 5, Packages and Upgrades, covers different ways to perform these
standard sysadmin tasks on jails.
Chapter 6, Space Optimization, discusses disk-saving tricks like clones and base
jails, as well as how they change software management.
Chapter 7, Living in a Jail, covers some of the differences of working inside a
jail versus having access to the whole system.
Chapter 8, Jail Features and Controls, takes you through some of the special
features that make jails more than a chroot, like private System V IPC space, the
ability to mount filesystems, securelevels, and more.
Chapter 9, Networking, goes into depth on how TCP/IP works in jails. We’ll
discuss virtual network stacks and bridges.
Chapter 10, Extreme Jails, shows how you can use jails inside jails and even run
Linux in a jail.
Chapter 11, Resource Restriction and Removal, discusses preventing a jail from
consuming the host. Or, alternately, how to give a jail more access to your host
than usual.

Chapter 12, iocage Bonuses, introduces some features iocage provides that make
it a powerful choice over other base system jails.
While jails have more features than I can cover in a book, once you master the
topics covered here, you’ll be able to solve most of your jail challenges.
¹ Not a commonly deployed practice, mind you. But recommended.

² Coating the spikes in your choice of nasty bacteria doesn’t help with the current
intrusion, but does deter future attacks. Word gets around.

## Chapter 1. The Jail Host

Virtualization is grand, but even with nested layers of virtual machines
eventually you hit an operating system installed on physical hardware. Yes,
many components of modern systems run their own internal operating systems,
but we call those BIOS and firmware and UEFI and try desperately to ignore
them.¹ Installing and configuring your host so that it can most easily run jails
will save you a bunch of later trouble.
An intruder that cracks your host gains control of all the jails running on that
host. Plan from the beginning to run zero nonessential services on the host. If it
isn’t absolutely needed to manage the host, jail it. The jail host needs SSH and
timekeeping, so run them on a network interface not exposed to the Internet.
Web, database, and application servers? Untrustworthy critters, the lot of them.
Jail them all. Deny potential intruders even the smallest opportunity to ravage
your host.
If you want to use virtual networking with jails, I strongly recommend using
FreeBSD 12 or later. You can do virtual networking with earlier versions of
FreeBSD, but it’s moderately hideous and either requires compiling a custom
kernel or gluing a bunch of virtual interfaces together. It can be done, but vnet in
FreeBSD 12 vastly simplifies and stabilizes virtual networking.
We’ll start with storage, proceed to networking, and then look at detailed
configuration of the host’s services and kernel.

Storage
Jails are all about storage. Yes, they need process management and networking
and all that, but those can be reconfigured without ripping everything out and
starting over. If possible, separate your jail data from the host’s data. On a host
with several hard drives, dedicate a couple of drives to your operating system
and the rest to jails. If using multiple multi-terabyte drives for a small operating
system install feels wasteful, get a mainboard with a couple of directly attached
high endurance flash drives. Either way, mirror the operating system drives with
geom_mirror(8) or ZFS. Make your jail storage redundant as well.
Your filesystem needs to support standard Unix filesystem features, such as
owners and permissions and so on. Don’t try to build jails on a FAT filesystem,
unless you’re looking to amuse yourself with new and intriguing failure
scenarios. Use either UFS or ZFS. If your host can support ZFS, I recommend
choosing it. Jails appeared when UFS was the only serious filesystem option in
FreeBSD, but ZFS has additional features that amplify and expand jails, such as
completely delegating datasets to a jail.
Two filesystems that seem like obvious choices for jails are nullfs and unionfs.
We’ll make heavy use of nullfs, but more than one FreeBSD developer has
described unionfs as “a basket of panic.” The man page warns people not to use
it. Some people disregard that warning and report excellent results, while others
suffer endless agony. If you use unionfs and love it, good for you—but this book
doesn’t suggest it and I won’t recommend it.
What about networked filesystems like NFS or AFS? Any networked filesystem
presents challenges, from the usual performance issues to strange edge cases that
affect only your precise configuration and the environment of one lone sysadmin
who posted a desperate, detailed plea for aid to Usenet in 1994, got no answer,
and was never heard from again. If you’re willing to cope with those problems
when they manifest at the least convenient moment, you can make jails work on
a networked filesystem. The nfsuserd(8) daemon needed for NFSv4 doesn’t
interoperate well with jails, so you should probably use NFSv3 or earlier.
Remember, networked filesystems are not the same as networked disks. The
mechanism used to connect the disks to the host is irrelevant. Fiber channel and

iSCSI are not networked filesystems—they’re networked disks. They’re fine.
Nobody has escaped a jail by exploiting fiber channel. Yet.
You’ll see documents declaring that you should run lsvfs(1) to see the
filesystems supported by the kernel, and to only use filesystems marked with the
jail flag. This indicates filesystems that can be safely managed from within the
jail, not filesystems that the host can use to provide storage to the jail. We’ll
discuss managing filesystems from within a jail in Chapter 8.
This book’s examples of hand-crafted standard jails all go in the /jail filesystem.
Ideally, this is a separate set of physical media than your operating system. It
could use either UFS or ZFS. Any examples that run on UFS are by definition
standard jails and appear in /jail.
Iocage works only on ZFS. I call my pool dedicated to iocage iocage, mounted at
/iocage. Any examples under /iocage by definition use iocage.
Python uses fdescfs(5) to improve performance. If you’re using iocage, enable
fdescfs on the host with an /etc/fstab entry.
fdescfs /dev/fd fdescfs rw 0 0
Each jail can have several mount points. Expect to have a whole bunch of
filesystem table files like /etc/fstab.
Comment everything very, very well. Document it all, or regret it.

Networking
The rules of TCP/IP declare that only one process can listen on a combination of
IP addresses and ports at a time. You can attach a jail to any IP address and port
on a host, but if a process on the host or another jail is already attached to that
port and address, the jail won’t work properly. The most obvious example is with
the SSH server sshd(8). SSH normally attaches to port 22 on all IP addresses on
a host. If your host monopolizes port 22 on all of the jail addresses, none of the
jails can use SSH on port 22. They must use a different port, which adds
complexity. “Hosts use port 22, while jails use port 23” is the sort of statement
that makes people plot vengeance against sysadmins.
When you’re first learning about jails, use a simple host with a single network
interface but multiple IP addresses. Assign one IP exclusively for the host’s use.
Bind all of the host’s services to that IP. Once you understand the basics of jails,
you can start on a production host with multiple interfaces attached to different
networks, VLANs, and all that fun stuff, but keep your initial test environment
simple. We’ll discuss more complicated network setups in Chapter 9.
If you don’t have the luxury of multiple IP addresses you must track which
daemons in which jails get bound to which IP addresses and ports, possibly on
multiple distributed copies of a cryptographically signed giant spreadsheet. This
leads to telling users things like “add 61000 to all your port numbers to find the
services for jail 61. Yes, as in 61022, 61443, and so on.”²
While jails routinely piggyback on the host’s network stack, FreeBSD’s vnet(9)
virtual networking stack allows you to assign each jail a virtual network stack
and its own routing tables. Each jail can have a completely different routing
table. We discuss this in Chapter 9.
Protect your host by reducing its network profile as greatly as possible. Identify
open ports with sockstat(1) or netstat(1). Remember, any service you run on the
host is also a potential attack vector for intruders. A new FreeBSD install
defaults to having three daemons listen to the network: syslogd(8), ntpd(8), and
sshd(8).

syslogd
FreeBSD’s logger syslogd(8) proactively binds to UDP port 514 on every
available IP so it can send log messages to other hosts. If you don’t need remote
logging, or if your remote logging solution doesn’t use syslogd(8), disable
syslogd’s network access with -ss. (This will probably be the default in FreeBSD
13.)
Security-sensitive organizations almost certainly require remote logging. Lock
syslogd to the host’s management IP with the -b flag.
This frees up the syslogd port on other addresses for jails.

ntpd
All jails take their time from the host. FreeBSD’s timekeeper daemon, ntpd(8),
listens to all available IP addresses. There’s no way to restrict this with stock
ntpd—you can bind ntpd to a single interface, but not a single address. This is
the one case where I’ll tell you to not worry about it, and to run ntpd.
Jails cannot change the kernel’s time. Even if you run ntpd in a jail, it can’t
actually change the host time. Any program running in a jail that connects to or
from UDP port 123, as ntpd does, is almost certainly trying to sneak through a
packet filter. There’s no reason to make that little trick easier. Have the host
monopolize UDP port 123.
If you worry anyway, disable the base system’s ntpd(8) and install OpenNTPd.
OpenNTPd has privilege separation as a bonus.

sshd
Everyone manages Unix hosts with sshd(8). Your users will want to SSH into
their jails, and forcing them to use an alternate port will annoy them. That can’t
be helped if all your jails use the same IP, but in our ideal every-jail-has-its-ownIP world you’ll restrict the host’s SSH daemon to a single IP. Use the
ListenAddress keyword in /etc/ssh/sshd_config to restrict which address
OpenSSH’s sshd(8) uses.
ListenAddress 192.0.2.2
Ideally, this address is reachable only from your management network.
Chapter 9 takes you deep into jail networking, but this should get you started.

Enabling Jails
FreeBSD has built-in scripts for starting and stopping jails. The scripts read the
configuration file /etc/jail.conf and feed the results to jail(8). While it’s possible
to configure, start, and stop jails entirely on the command line with the jail
command, as we’ll see in Chapter 3, those commands become tedious as the
number of jails increases. You’re better off using the configuration file and
enabling jail management through service(8).
Iocage uses configuration files stored with each individual jail. When iocage
starts, it reads its own configuration files and fires up jail(8) to create and start
all the jails you’ve flagged for automatic startup. Tell FreeBSD to start iocage at
boot with service iocage enable.
You can use both jail management systems simultaneously. Jails configured in
jail.conf don’t inherently conflict with those managed by iocage. Both systems
are merely front ends to jail(8), after all. They might have administrative
conflicts, such as both trying to bind to the same IP address and port, but the two
systems work independently. Iocage can manage hundreds of your most
common types of jail, freeing you up to painfully maintain a couple of festering
hand-tweaked artisan jails that require their own exotic weirdness.

Iocage Setup
First off, iocage requires ZFS. If you don’t have ZFS, don’t try to use iocage.
Find the current iocage package with pkg search iocage , or pull the bleedingedge version from github. Once you get that far, though, iocage requires specific
locale settings. Add the following to $HOME/.login_conf.
me:\
:charset=UTF-8:\
:lang=en_US.UTF-8:\
:setenv=LC_COLLATE=C:
Log out and log back in to activate these locale settings.
The first time you run any iocage command, it automatically creates iocage
datasets on your root pool. If you have a separate pool for iocage jails, tell
iocage about it before it spams your root pool. Point iocage at your pool with the
iocage activate command. Here I dedicate the pool iocage to iocage jails.
ZFS pool 'iocage' successfully activated.
The iocage files get mounted at /poolname/iocage. If you use a default install
and the default root pool, as nobody does, all iocage files appear under
/zroot/iocage. Using a pool named iocage, the iocage files go under
/iocage/iocage. For brevity, and to avoid sprinkling horrible filenames like
$POOL/iocage throughout this book, all the examples use /iocage.
If you mistakenly tell iocage to set itself up on the wrong pool, use iocage clean
-a to destroy all those datasets. For older versions of iocage, you must zfs
destroy -r whatever dataset has the iocage files.
The first time you run iocage it creates datasets for downloads, jails, templates,
and all other iocage functions. If you jump ahead and create your first jail,

iocage will automatically prompt you to choose a release, download it, and set
up the jail for you. Or you can run iocage list to display all your iocage jails, of
which you have none yet. We’ll explain all those datasets throughout this book.
Iocage has experimental color output. I don’t use color here because this book
will be printed in black and white, but if you want colors in your terminal set the
environment variable IOCAGE_COLOR to TRUE.
Reboot your host to verify that everything is secured as tightly as you thought,
and that the host restarts as expected. Once you’ve confirmed everything, you
can start adding jails.
¹ Most sysadmins routinely pretend that it’s not turtles all the way down. It’s the
only way we stay sane. Sane-ish.

² Yes, you’ll be miserable—but the good news is, your users will be miserable
too! They’ll be steadfast allies in your battle for more IP addresses.

## Chapter 2. Jail Essentials

While jails can have convoluted or highly specialized configurations, a simple
jail on a dedicated IP address is pretty simple. The jail itself requires a dedicated
root directory, an IP address, and a hostname. You’ll need an installation source
for the userland. We’ll start by using the FreeBSD native tools and proceed to
iocage.
Jails come in “thin” and “thick” varieties. A thin jail is a ZFS clone of another
jail. A thick jail is a full, independent copy of a FreeBSD system. Our standard
jails are thick jails, while iocage defaults to thin jails.
To start with, we’ll build two standard jails. One, loghost, runs rsyslogd to
collect everything from your network, while the second, logdb, runs PostgreSQL
and aggregates those log messages.¹ We’ll then build two iocage jails, www1
and www2. We’ll use those to test apps to easily view the log data.
Each jail needs a root directory. Everything under that directory belongs to the
jail. I name my root directories after the standard jail hostnames. In this chapter
I’ll use/jail/loghost and /jail/logdb.
Let’s start by discussing core configuration and networking.

Jail Networking
A jail’s network connectivity is isolated from the host and from other jails. Each
jail has an IP reserved for its exclusive use. This sounds great, until you hit
localhost and the loopback interface.
Theoretically, every computer that speaks TCP/IP has access to the loopback
interface as well as the loopback addresses 127.0.0.1 (IPv4) and ::1 (IPv6).
These are artificial constructs that mean “this machine right here.” A host can
only have one loopback address attached to it, and can’t delegate it to a jail. So
how do jails get loopback addresses?
The kernel lies to them.
A jail substitutes the jail’s main IP address for the loopback address. When you
use the address 127.0.0.1 in the jail, you’re actually using the jail’s public
address. For many applications, this simply doesn’t matter… except when it
does. If you run a jailed daemon on the address 127.0.0.1 expecting it to be
isolated from the public network, you’re heading for disappointment. The
daemon is listening on the jail’s external address.
While the loopback address is not as important as it once was, many software
packages still need it and many sysadmins expect it to be available. Without a
loopback address you can’t, say, run a DNS resolver for local use and another for
public consumption. The database for your web site needs to be configured to
use a local socket rather than a TCP/IP port. None of these issues are
insurmountable, so long as you’re aware of them.
Chapter 9 discusses giving your jail its own private network stack and a
legitimate loopback interface through vnet.

Jail Sysctls
FreeBSD has a whole section of the sysctl tree dedicated to jails, security.jail.
All the jail sysctls are run-time tunable; you don’t have to reboot to adjust them.
You might need to restart a jail for the new setting to affect it, however. Many of
these sysctls are merely defaults, and can be overriden by jail parameters, as
discussed in the next section.
Programs and users can check the security.jail.jailed sysctl to see if they’re
inside a jail. The sysctl is 0 on a host, but 1 inside a jail.

Parameters and Properties
Configure jails with parameters (also called properties) that dictate how the jail
should function. The jail’s root filesystem? That’s a parameter. The IP address
assigned to the jail? Also a parameter. Can the jail mount filesystems, and if so,
which types? Yep, a parameter. Some parameters manage jail(8), while others
get passed to the host’s kernel.
Kernel-related parameters control functions that interact with the kernel. How
does the jail present mount points and filesystems? Which devices may the jail
see? Can this jail create more jails, and if so, how many? Should we allocate a
chunk of memory for System V IPC? All these require twiddling the kernel. A
few of these parameters, such as the jail’s securelevel, can be changed while the
jail is running. Some parameters, such as those for less well-known filesystems,
are tied to specific kernel modules.
Non-kernel parameters are only used to initially configure the jail. These give
commands like “run this command at such-and-such stage,” “log the console to
this file,” “use this virtual network stack,” and “set this hostname.” They do
involve the kernel, but only in the ways that every other program does.
Jail parameters are deliberately modeled after sysctls, and consist of periodseparated terms like ip4.addr, allow.mount.devfs, and allow.socket_af. Set a jail’s
parameters in the jail configuration file /etc/jail.conf.
Iocage has a similar set of parameters. Jail and iocage parameters often share
names, but they’re separate entities. Iocage uses its parameters to set the
corresponding flags, parameters, and options for jail(8) commands. Iocage
parameters use underscores where jail parameters use periods. Those example
jail parameters I gave in the last paragraph map to the iocage parameters
ip4_addr, allow_mount_devfs, and allow_socket_af. Generally speaking,
anything that applies to standard jail parameters also applies to iocage
parameters.
We configure jails by assigning values to parameters. We’ll use the jail(8) format
for these examples, but the values work exactly the same in iocage even though
the configuration method differs. Parameter values can contain any non-

whitespace character. If a value contains anything other than letters, digits, dots,
dashes, and underscores, put single or double quotes around the value. (You can
technically escape other characters with backslashes, but that gets ugly quick.)
Some parameters have values assigned to them with equal signs. You’ll use such
a parameter to tell a jail its root directory, using the path parameter.
Path="/jail/mariadb";
This jail’s root directory is /jail/mariadb.
Some parameters have a default, shown in jail(8). The parameter’s presence
implies the default setting, but you can change that default. Here I set the
parameter ip4, enabling the feature at its default value.
ip4;
Use an equal sign to set a parameter like ip4 to a non-default value. You can
disable such a feature by setting it to “false” or “no,” in jail.conf and iocage
alike.
ip4=false;
A few parameters can have multiple values. Separate those values with a comma.
ip4.addr="203.0.113.231,203.0.113.232";
Complex parameter values might not permit separating the values with commas.
In this case, repeat the parameter assignment with the += syntax to add a value.
Here I assign ip4.addr two complex values.
ip4.addr="jpublic|203.0.113.225";
ip4.addr+="jprivate|198.51.100.225";
You can safely use += to initialize variables.
Other parameters alter the environment with their mere presence, much as the
whole mood of a room changes when Darth Vader walks in. Here, I set the
allow.mount parameter, allowing the jail’s sysadmin to mount additional jail-safe

filesystems.
allow.mount;
Many jail.conf parameters have a “no” version that turns off a function. It’s
normally used to turn off default settings, and is equivalent to setting that
parameter to “no” or zero. Here I disallow mounting additional filesystems.
allow.nomount;
Iocage does not have the no version of parameters. You can’t set
allow_noset_hostname in iocage; you must set allow_set_hostname to 0 instead.
Now let’s see how to use jail.conf.

/etc/jail.conf
The format of /etc/jail.conf should look familiar to any sysadmin. Each jail needs
a block of configuration, set apart by curly braces. Each parameter declaration
ends with a semicolon. As with almost every other Unix configuration file, a
hash mark in /etc/jail.conf denotes a comment.

Defining Standard Jails
Here’s a jail.conf entry for loghost.
host.hostname="loghost.mwl.io";
path="/jail/loghost";
Each jail starts with a name. The name parameter isn’t explicitly labeled, but
always appears in front of the opening brace. The jail(8) command will create a
jail named “loghost.”
The first parameter inside the braces, host.hostname, gives the jail’s hostname. I
called the jail loghost, but the virtual machine identifies itself by the Internet
hostname loghost.mwl.io.
With ip4.addr, I assign the jail an IP address of 203.0.113.231. For our initial
testing, use an IP address already attached to the host. Chapter 9 discusses
having jail(8) automatically add and remove IP addresses from the host.
The path parameter gives the jail’s root directory.
The presence of mount.devfs tells jail(8) to attach a device filesystem to the jail’s
/dev directory. The default device filesystem assigned to jails includes only the
device nodes needed for basic jail operations. It won’t get device nodes for

hardware, kernel dumps, sound cards, and so on. Jails don’t need any of those
device nodes, and access to those nodes might allow a clever inmate to escape
his jail.
Jailed processes can inherit environment variables from their parent process.
This is almost always bad. Here I explicitly define the exec.clean parameter to
strip the jail(8) command environment when starting the jail.
Finally, the jail must know what program to run at startup and shutdown. A tiny
jail might only run a single command. A full-featured jail needs the full
FreeBSD startup and shutdown procedures defined in exec.start and exec.stop. I
discuss jail startup and shutdown in Chapter 3.

Default Settings
Many jails share common settings. All of my jails start by stripping the shell
environment via exec.clean. Almost all of my jails run complete FreeBSD
installs, starting with /etc/rc and shutting down with /etc/rc.shutdown. Every jail
needs a device filesystem. Defining these for each and every jail would be
tedious and repetitive.
Fortunately, jail.conf lets you set system-wide defaults for jails. Specify your
defaults at the beginning of the configuration file.
host.hostname="loghost.mwl.io";
ip4.addr="203.0.113.221";
path="/jail/loghost";
Every jail on this host gets the mount.devfs, exec.clean, exec.start, and exec.stop
settings. Defining new jails becomes a matter of defining only the unique
settings.

Overriding Defaults
When a jail needs a parameter setting other than the defaults, override the
defaults. Maybe the jail mariadb has a unique startup command.
mariadb {
host.hostname="mariadb.mwl.io";
exec.start="sh /etc/rc.mariadb";
ip4.addr="203.0.113.232";
path="/jail/mariadb";
This jail inherits all the defaults, but also runs the custom startup command
/etc/rc.mariadb rather than the full FreeBSD startup.
If a default parameter activates a feature by its presence, but you must disable
that feature for a jail, set the “no” version of that parameter in that jail.
Overriding defaults gets a little tricky when you use the += syntax to chain
multiple statements in a default. You can override the defaults within a jail
definition, but you must give all the desired statements in the jail definition.
Consider this default.
#default settings
exec.created="logger jail $name has started";
exec.created+="cpuset -c -j $name -l 2-5";
The exec.created parameter runs a command when the jail is created, but before
the first jailed process is started. We run two commands, logger and cpuset.
(Chapter 11 covers cpuset.) I need to run a slightly different cpuset command for

my jail logdb. I can’t use a plain += and stack a third command on top of the
first two commands, because the two cpuset commands are incompatible;
running the default precludes running the jail-specific command.
logdb {
exec.created="logger jail logdb has started";
exec.created+="cpuset -j logdb -cl 6-7";
I use a plain equals sign for the first exec.created statement, wiping out all
previous definitions. The second exec.created statement gets added to the list
thanks to the +=. If you can’t figure out why a jail isn’t working right, doublecheck you didn’t forget the plus sign in one of your parameters.
Those of you who carefully read examples are probably wondering about the
$name in the default settings. Let’s talk about variables.

Variables
Variable substitution simplifies jail management. You can define your own
variables, or pull some from the jail’s settings. Variables in double quotes and
unquoted strings get expanded, but not in single-quoted strings.
One obvious place for a user-defined variable is the path to the jail filesystem. If
I move my hundreds of jails from /jail to another partition, I must update every
jail’s configuration entry. That seems simple, but I know me. I’ll screw that up.
Instead, I define a variable for that filesystem.
path="$j/loghost";
Moving my jails to another partition now requires updating only one jail.conf
entry.
Much more interesting, though, is the ability to use jail parameters as variables.
Once you define a parameter, you can use that parameter’s value in later
configuration statements. This isn’t terribly useful for ip4 but works beautifully
with, say, name.
host.hostname="$name.mwl.io"

We can now define global defaults for a jail’s hostname and root directory. The
only information unique to each jail is the IP address assigned. This has the
additional advantage of synchronizing hostnames with the labels jail(8) uses.
Parameters with a period in them can be used as variables, but the parameter
name must be enclosed in braces. Folks who deploy multiple domain names in
their jails might prefer to use the fully qualified domain name as part of the root
directory path. Here’s a default that supports that.
path="/jail/${host.hostname}";
Using parameters as variables, combined with a coherent directory layout, lets
you configure jails by their unique parameters.
You can now perform basic standard jail configuration. Let’s check out iocage.

Iocage Configuration
Perform all jail configuration with the iocage(8) command, which closely
resembles the zfs(8) and zpool(8) commands. Just as with standard jails, iocage
configures each jail with parameters. Unlike standard jails, iocage stores all jail
configuration with the jail’s files.
Iocage creates a dataset for each jail, containing an fstab with details on special
filesystems to mount in that jail and a config.json to record the jail’s parameters.
You’ll also see a root dataset where the jail’s actual filesystem resides.
The configuration file lists the jail’s parameters, in alphabetical order.
{
"CONFIG_VERSION": "18",
"allow_chflags": "0",
"allow_mount": "0",
"allow_mount_devfs": "0",
"allow_mount_nullfs": "0",
It’s very readable with the naked eye. Readability is a design goal of JSON.
Writable? Uh… yeah, technically, you can hand-edit JSON. Hand-editing is a
great way to introduce errors, though. Iocage reads and writes configuration file
parameters for you, and validates the result as legitimate JSON.
Read a jail’s parameters with iocage get. You need two more arguments, the
parameter of interest and the jail name. Here I grab the value of the sysvshm
parameter from the jail www1.

new
To see all parameters for a jail, use the -a argument and the jail name.
CONFIG_VERSION:11
allow_chflags:0
allow_mount:0
allow_mount_devfs:0
This looks an awful lot like the configuration file, doesn’t it?
To retrieve a parameter from every iocage jail, add the -r flag. This defaults to
printing a fancy table with ASCII borders highly suitable for eyeballs, but I use
this most often in scripts and scripts don’t like fancy borders. Add the -h flag to
strip away the decorations and produce simple tab-delimited output. Here I want
to check all of my hosts to see if anyone’s adjusting a particular parameter to a
forbidden setting.
db5 inherit
See Chapter 8 for why I’m going to yell at the person who set up the jail named
db5.

Changing Parameters
Use iocage set to change a parameter.
Property: sysvshm has been updated to new
The new setting will take effect upon restarting the jail.
The iocage configuration files contain a few parameters that don’t appear in
jail(8) and won’t work in jail.conf. These support functions such as clones and
base jails. We’ll discuss them in Chapter 6.

Iocage Booleans
A whole bunch of parameters are functionally toggles. The feature is on or off,
enabled or disabled, true or false, 0 or 1. These boolean parameters are all stored
as 0 or 1.

Iocage Defaults
While iocage’s defaults are decent, your organization will unquestionably need a
different default, sometime, somewhere. The jail name default is reserved for
iocage’s default settings. To view every possible iocage parameter and its initial
setting, query this jail.
To change the default settings for all jails, change the default jail.
The default settings take effect on all jails where you haven’t changed the
parameter. If you manually tweaked a parameter on a jail, and then manually set
it back to the default, changing the default setting of that parameter won’t affect
that jail. If you changed sysvshm on a jail, changing sysvshm on default won’t
alter that jail’s sysvshm. You touched it, you own it.
The current iocage defaults are stored in /iocage/defaults.json. To get rid of all
your customizations to iocage’s defaults, remove the file. A new defaults file will
appear the next time you run iocage. Changing a single parameter back to the
default value means figuring out what that default value is and changing it by
hand. You do have a test host, right?

Standard Jail Userland
The easiest way to get a userland is to grab the base.txz file from a FreeBSD
release or build. Keep old userland installation sources on your jail host in a
place like /jail/media, in a subdirectory named after the release. If you rebuild,
reinstall, or duplicate a jail, you’ll need the installation media.
You can also use a locally-built userland from /usr/src and /usr/obj. Make your
own userland tarball by installing in a temporary directory, though. Don’t install
directly to a jail; you’ll need reproducible jails. FreeBSD’s build process
includes options to install your custom world in a non-standard directory, thanks
to the DESTDIR option.
The make installworld command copies FreeBSD’s program files to the
destination and sets the appropriate permissions. The make distribution
command creates supporting directories and files, such as many from /etc. The
end result is a pristine userland.
Bundle it up for deployment to your jails.
Install your actual jails from this tarball.
Remember, the userland in the jail cannot be newer than the host’s kernel: June
2020’s userland won’t work reliably on April 2019’s kernel.

Iocage Userland
Iocage is intended for large scale deployments based on official FreeBSD
releases. You won’t be installing and upgrading jails from /usr/src; instead,
you’ll use release tarballs and freebsd-update(8). The iocage fetch command
grabs releases for you.
You’ll get a list of available releases.
[0] 9.3-RELEASE (EOL)
[1] 10.1-RELEASE (EOL)
[2] 10.2-RELEASE (EOL)
[3] 10.3-RELEASE (EOL)
[4] 10.4-RELEASE (EOL)
[5] 11.0-RELEASE (EOL)
[6] 11.1-RELEASE (EOL)
[7] 11.2-RELEASE
[8] 12.0-RELEASE
Releases marked with EOL are past their end of life. While FreeBSD continues
to offer them for download, they do not receive security patches and you run
them at your own risk.
Type the number of the desired RELEASE
Press [Enter] to fetch the default selection: (Not a RELEASE)
Type EXIT to quit: 7

I want the newest FreeBSD 11 release, so I hit 7. Depending on my connection
speed, I can either grab lunch from the fridge or hit La Snootiér for a twelvecourse snack.
Fetching: 11.2-RELEASE
Downloading : MANIFEST [####################] 100% 0Mbit/s
Downloading : base.txz [######--------------] 29% 19.57Mbit/s
The downloaded files get cached in /iocage/download. Once iocage has all the
files for a release it automatically extracts them and applies the latest security
updates. I wind up with 11.2-RELEASE plus all available patches.
To disable security updates, you can add the -NU or --noupdate option to the
iocage fetch command. That’s a bad idea. Don’t do it.
If your local firewall requires proxy configuration or authentication, you might
need to download the release distribution files manually and then import them
into iocage. You can also import your own custom FreeBSD releases. Find the
desired release on the FreeBSD download server https://download.FreeBSD.org
and grab the files MANIFEST, base.txz, doc.txz, kernel.txz, and src.txz. Stick
them all in a directory named after the release. The -f flag tells iocage to extract
the release from local files instead of the network. Use -d to specify the directory
and -r to give iocage the name of this release. Here I’ve fetched the files for 12.0
into the directory /home/mwl/releases/12.0.
You might want to have iocage provide files from your host’s software build in
/usr/src, without all the trouble of making a full release. That requires leaving
iocage, but it’s doable. First, create a dataset for the release, and a separate root
dataset beneath it. My host is running FreeBSD 13-current. If you’re going to
create new releases from -current every so often, you might find it useful to
name the iocage release after the SVN version you’re building from.

Now install a jail userland to that directory.
If you plan to regularly update your jails to the latest -current, I recommend
using thick jails or perhaps even a base jail with a thick origin. ZFS clones will
quickly diverge from their origin. If a jail sticks around long enough that
divergence is a problem, export and import the jail as discussed in Chapter 12.
Iocage only applies security updates if freebsd-update(8) supports that release. I
must patch my -current jails by hand. I wouldn’t do this for standard production
jails, but I’m contributing to FreeBSD by performing pre-release testing in my
environment.
You can run iocage fetch multiple times for a release. It won’t re-download the
files, but it re-extracts previously downloaded files and applies all current
security updates. If you went into the release directory and mucked with the
files, this cleans up your mess.
If I know what release I want to grab, I can specify it on the command line with
the -r option.
To see which releases you’ve already downloaded, run iocage list -r.

| Bases fetched |
+===============+
| 9.3-RELEASE |

| 11.2-RELEASE |
| 12.0-RELEASE |
I can install a jail with any release on this list.
To get rid of a downloaded release, use the iocage destroy -d command. Specify
the release with -r. FreeBSD 9.3 is long gone, and I don’t want to install any
more jails with it.
This will destroy RELEASE: 9.3-RELEASE
Are you sure? [y/N]: y
9.3-RELEASE has dependent jails (who may also have dependents), use -recursive to destroy:
www1
Uh oh. I still have a 9.3-RELEASE jail running. I must eliminate that jail before
iocage will let me destroy the downloaded release. Iocage installs are ZFS
clones, so even upgrading the jails to a newer release won’t let me eliminate the
underlying release. If you need independence, consider thick jails or base jails
(Chapter 6).
To change a cloned, or “thin” jail so that it no longer depends on a release or
template, export and re-import the jail (Chapter 12). All exported jails become
thick jails.

Your First Jail
Now that you have software to run in your jail, you can set up a first jail. You’ll
use different methods for raw jail(8) and iocage(8).

Creating and Destroying Jails with jail(8)
Building a jail with jail(8) means populating a directory tree with a FreeBSD
userland and then configuring it in jail.conf. Before you stick a userland in a
directory, think about how you want to arrange your jail files. A jail might need
additional support files that don’t go inside the jail, but are necessary to start or
configure the jail. A key example would be fstab files (Chapter 8). Do you want
to keep these files with the jail, or separately?
I put all jail userlands in a directory directly beneath /jail, like /jail/loghost, and
then add-on files in topic-specific directories like /jail/fstab. Other people prefer
having the jail’s userland one directory further down, like /jail/loghost/root/,
letting them put add-on files under /jail/loghost. Do whatever makes sense to
you.
Here I want to set up a jail called loghost, running FreeBSD 11.2. The original
distribution file is in /jail/media/11.2/base.txz, and I want the jail in /jail/loghost.
Extract the release with tar(1). If you have a disk image handy, remember that tar
can pull files straight from an unmounted ISO.
If you need additional distribution sets, such as the system sources or
documentation, extract them to the directory tree as well.
Now create a jail.conf entry. We created a perfectly suitable configuration when
discussing jail configuration, including variables for additional jails.
host.hostname="$name.mwl.io"

The jail is now ready to start.
To remove a jail, delete its directory, all its contents, and the jail.conf entry.

Creating, Viewing, Renaming, and Destroying Iocage Jails
Much like installing a standard jail, to create an iocage jail you must know the
jail’s IP address, FreeBSD release, and the jail’s name.
Use the -n option to name the jail. If you don’t assign a name, iocage assigns a
Universally Unique Identifier (UUID), a thirty-two-character hexadecimal
string. That’s fine for your load-driven deployment system, but terrible for
human beings.
The -r option lets you specify the release.
You can also specify any additional parameters on the command line. Here I
specify the IP address with the ip4_addr parameter.
www1 successfully created!
The jail creation process is very quick because it leverages ZFS clones. Clones
retain an attachment to their parent dataset, though. You might expect a jail to
quickly diverge from the parent dataset, though, and want to prepare for that
beforehand. A thick jail uses a copy of a dataset, not a clone, as its base. It’s
slower to create, but will save you pain in the long run—particularly if you
expect this jail to have a long run. Use the -T flag to specify a thick jail.
Creating a thick jail is much slower than cloning a jail, but it’s a one-time cost.
If you want to create a highly customized jail—say, if you want to do an oldschool install from /usr/src and /usr/obj—create an empty jail with -e.
View existing iocage jails with iocage list.

| JID | NAME | STATE | RELEASE |

+=====+======+=======+==============+===============+
| - | www1 | down | 11.2-RELEASE | 203.0.113.234 |
Iocage stores the jail’s files in /iocage/jails/www1. You’ll find iocage’s
configuration file for the jail, config.json, and an fstab file iocage uses to mount
extra filesystems before starting the jail. The root subdirectory is the jail’s actual
root directory.
To see more detail on each iocage jail, add the -l flag to iocage list to produce the
“long list.” You’ll need a wide terminal to use the long list. The -q flag strips the
output down to the jail name and IP address. Adding -s lets you sort by any of
the headers. Here I list all of my jails, sort them by the release they were
installed with, and strip out the fancy headers.

13

wdb1

11.2-RELEASE 203.0.113.236

12

www1

11.2-RELEASE 203.0.113.234

15

wdb2

12.0-ALPHA2

203.0.113.237

14

www2

12.0-ALPHA2

203.0.113.235

Use iocage destroy to eliminate a jail and its dataset.
This will destroy jail www1
Are you sure? [y/N]: y

Stopping www1
Destroying www1
ioc-www1: removed
To tell iocage to skip confirmation, add the -f flag. Be careful, though;
accidentally running iocage destroy -f on something you needed can cause
iorage.
Destroy multiple jails simultaneously by naming all the jails on the command
line.
If you screw up and mis-name your jail, don’t destroy and reinstall it. Use iocage
rename to change the jail’s name. Here I fix one of my most common typos.
Jail: wwww1 renamed to www1
Now let’s test our jails.

Jail Directory Testing
Test your jail directory tree by running a single command within the jail.
For standard jails, use jail(8) to run a command within a jail. The jail command
takes four arguments: the jail’s path, name, and primary IP address, and the
command to run inside the jail. This starts the jail and runs the command. When
you exit the command, the jail shuts down as well.
I want to run a shell inside my jail loghost. It’s in the directory /jail/loghost, and
has the IP 203.0.113.231.
I get a command prompt back… but it’s not the same command prompt.
FreeBSD loghost 13.0-CURRENT FreeBSD 13.0-CURRENT #5 r336638: Mon
Jul 22 13:32:15 EDT 2019
root@storm:/usr/obj/usr/src/amd64.amd64/sys/GENERIC amd64
I’m jailed! Specifically, I’m locked in /jail/loghost, and now see it as my root
directory. This jail is running in something that closely resembles single user
mode. Look at the processes running in this jail.
ps: /dev/null: No such file or directory
There’s no /dev? We haven’t mounted one yet, so: no. No processes other than
the shell are running, but you can run some basic commands like ls(1) and
mount(8).

To test-start an iocage jail, run iocage console.
The jail www1 is now running. Exactly as with a standard jail, the host is
stripped bare. There are no user accounts or installed packages. Exiting the
console won’t shut down the jail, however.
Configure each jail before truly starting it.

Final Jail Configuration
Whether you install with raw FreeBSD tools or iocage, your new jail is even
more bare than that created by the FreeBSD installer. There are no users. There
is no root password. The network has an IP, but there’s no resolver. “Time zone?
What is this ‘time zone’ of which you speak?” Spend a minute decorating the jail
before locking users into it.²
Many of the setup commands you must run aren’t jail-aware. The passwd(1) and
adduser(8) programs don’t know anything about jails, and can only affect files in
/etc. You don’t need to start them under jail(8) to set up your jail, though: a
simple chroot(8) suffices.
If you’re using commands that affect processes, such as running a database
client, you really must execute the program from within the jail’s process
context. Start the whole jail.

DNS
Each jail performs its own DNS resolution. You must provide a resolver
configuration for standard jails. In many environments you can copy it straight
from the host. Perhaps you have a recursive nameserver jail you want hosts to
use. The local caching server you get by setting local_unbound to YES in
/etc/rc.conf has trouble because it can’t really attach to the loopback address.
Either set up a place for your jails to get their DNS queries answered, or point all
the jails at your provider.
You can use local_unbound on the host to provide DNS to the jails if you like;
set up an ACL to only permit access from the jail network and localhost, and use
the interface-automatic unbound option to help the server correctly return
responses.
Iocage automatically copies the host’s /etc/resolv.conf into the jail when the jail
starts. The resolver parameter lets you specify a different file on the host to be
copied to the jail’s resolv.conf.

Time Zone
Jails probably share the host’s time zone. You can copy the host’s /etc/localtime
into the jail. If a jail needs a unique time zone setting, though, run tzsetup(8).
Conveniently, tzsetup is jail-aware. Use the -C flag to specify a chroot directory.
If you know the desired time zone, give it as a final argument.
The iocage program automatically copies the host’s time zone settings into the
jail. Disable this by setting the host_time parameter to no.
I encourage using the same time zone in all your jails and hosts. Others disagree.

/etc/fstab
All core filesystem mounting should happen in the host, so jails work without a
file system table. Many programs that can run within a jail, however, expect to
find /etc/fstab and assume that everything has gone horribly wrong if the file
doesn’t exist. Use touch(1) to create an empty filesystem table.
The jail’s sysadmin can add their own custom filesystem entries to this file.
Those mounts will only work if you’ve delegated them that permission,
however. See Chapter 4.

/etc/rc.conf
If a jail runs a complete FreeBSD install, as discussed in this chapter, you’ll
probably use the FreeBSD startup script /etc/rc. Jail creation works without
/etc/rc.conf, but you’ll probably want the jail to start other programs at boot. If
nothing else, users will manage most jails via SSH. Thankfully, sysrc(8) has a -j
flag to modify a jail’s rc.conf from the host.
Add any other rc.conf settings the jail will need.

Root Password and Accounts
You must be within the jail filesystem to add user accounts or change passwords.
User management commands don’t need to run in the jail’s process namespace,
though; they merely must be rooted in the jail’s root filesystem. You can use
chroot(8).
You could also run a shell as discussed in “Jail Testing” earlier this chapter, and
set a root password with passwd(1).
If you’re going to manage this jail with SSH, run adduser(8) to add at least one
user.

Other Configuration
If your network has additional requirements that can be met by editing
configuration files, this is the time to set them up. Do you use LDAP for
authentication? Copy your configuration files into the jail now. You won’t want
to change nsswitch.conf until we install packages in Chapter 5, but having your
ldap.conf in place won’t hurt.
While iocage installs all the security patches available when it downloads the
FreeBSD release, it won’t install any patches released between when you
downloaded the release and when you install the jail. Similarly, with a standard
jail you must run freebsd-update(8) (Chapter 4) to install all current patches.
Your jail is now ready for use.
¹ You don’t have to run my example applications. Feel free to use your own,
inferior, choices.

² Every prisoner appreciates a considerate gaoler.
