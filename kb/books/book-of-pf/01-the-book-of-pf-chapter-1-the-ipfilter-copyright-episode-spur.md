---
id: book-of-pf-01
title: "The Book of PF — Chapter 1, The IPFilter copyright episode spurred the OpenBSD…"
slug: book-of-pf-01-the-book-of-pf-chapter-1-the-ipfilter-copyright-episode-spur
source: "The Book of PF, 3rd Edition"
sourceSection: "2. Chapter 1, 4. The IPFilter copyright episode spurred the OpenBSD team to perform a license audit of, 4. Chapter 1, 6. Chapter 1, 8. Chapter 1, 10. Chapter 1, 1. If you’re setting up your first PF configuration on an OpenBSD version earlier than this,, 12. Chapter 2, 14. Chapter 2, 2. For instruct"
track: bsd-internals
tier: premium
tags: [firewall, pf, networking, security]
summary: "The packet filter’s main function is, as the name suggests, to filter network Covers 21 sections: Chapter 1, The IPFilter copyright episode spurred the OpenBSD team to perform a license audit of, Chapter 1."
---
# The Book of PF — Chapter 1, The IPFilter copyright episode spurred the OpenBSD…

## 2. Chapter 1

focus on some techniques based on pure network-level behavior, which are
most evident in the example configurations in Chapter 6. These techniques
will help ease the load on content-inspecting products if you have them in
place. As you’ll see in the following chapters, the network level offers a lot
of fun and excitement, in addition to the blocking or passing packets.

Where the Packet Filter Fits In
The packet filter’s main function is, as the name suggests, to filter network
packets by matching the properties of individual packets and the network
connections built from those packets against the filtering criteria defined in
its configuration files. The packet filter is responsible for deciding what to
do with those packets. This could mean passing them through or rejecting
them, or it could mean triggering events that other parts of the operating
system or external applications are set up to handle.
PF lets you write custom filtering criteria to control network traffic
based on essentially any packet or connection property, including address
family, source and destination address, interface, protocol, port, and direction. Based on these criteria, the packet filter performs the action you specify. One of the simplest and most common actions is to block traffic.
A packet filter can keep unwanted traffic out of your network. It can
also help contain network traffic inside your own network. Both these functions are important to the firewall concept, but blocking is far from the only
useful or interesting feature of a functional packet filter. As you’ll see in
this book, you can use filtering criteria to direct certain kinds of network
traffic to specific hosts, assign classes of traffic to queues, perform traffic
shaping, and even hand off selected kinds of traffic to other software for
special treatment.
All this processing happens at the network level, based on packet and
connection properties. PF is part of the network stack, firmly embedded
in the operating system kernel. While there have been examples of packet
filtering implemented in user space, in most operating systems, the filtering
functions are performed in the kernel because it’s faster to do so.

The Rise of PF
If you have a taste for history, you probably already know that OpenBSD
and the other BSDs3 are direct descendants of the BSD system (sometimes
referred to as BSD Unix), the operating system that contained the original
reference implementation of the TCP/IP Internet protocols in the early 1980s.
3. If BSD doesn’t sound familiar, here is a short explanation: The acronym expands to Berkeley
Software Distribution and originally referred to a collection of useful software developed for
the Unix operating system by staff and students at the University of California, Berkeley. Over
time, the collection expanded into a complete operating system, which in turn became the
forerunner of a family of systems, including OpenBSD, FreeBSD, NetBSD, DragonFly BSD,
and, by some definitions, even Apple’s Mac OS X. For a very readable explanation of what
BSD is, see Greg Lehey’s “Explaining BSD” at http://www.freebsd.org/doc/en/articles/explaining-bsd/
(and, of course, the projects’ websites).
Building the Network You Need    3

As the research project behind BSD development started winding down
in the early 1990s, the code was liberated for further development by small
groups of enthusiasts around the world. Some of these enthusiasts were
responsible for keeping vital parts of the emerging Internet’s infrastructure
running reliably, and BSD development continued along parallel lines in
several groups. The OpenBSD group became known as the most securityoriented of the BSDs. For its packet-filtering needs, it used a subsystem
called IPFilter, written mainly by Darren Reed. During these early years,
OpenBSD quickly earned a positive reputation as “THE firewall OS,” and
it’s still quite common for people to believe that OpenBSD was developed
specifically for that purpose.
It shocked the OpenBSD community when Reed announced in
early 2001 that IPFilter, which at that point was intimately integrated with
OpenBSD, wasn’t covered under the BSD license. Instead, it used almost a
word-for-word copy of the license, omitting only the right to make changes
to the code and distribute the result. The problem was that the OpenBSD
version of IPFilter contained several changes and customizations that, as
it turned out, were not allowed under the license. As a result, IPFilter was
deleted from the OpenBSD source tree on May 29, 2001, and for a few
weeks, the development version of OpenBSD (-current) didn’t include
any packet filter software.
Fortunately, at this time, in Switzerland, Daniel Hartmeier had been
performing some limited experiments involving kernel hacking in the networking code. He began by hooking a small function of his own into the
networking stack and then making packets pass through it. Then, he began
thinking about filtering. When the license crisis happened, PF was already
under development on a small scale. The first commit of the PF code was on
Sunday, June 24, 2001, at 19:48:58 UTC. A few months of intense activity by
many developers followed, and the resulting version of PF was launched as
a default part of the OpenBSD 3.0 base system in December of 2001.4 This
version contained an implementation of packet filtering, including network
address translation, with a configuration language that was similar enough
to IPFilter’s that migrating to the new OpenBSD version did not pose major
problems.

## 4. The IPFilter copyright episode spurred the OpenBSD team to perform a license audit of
the entire source tree in order to avoid similar situations in the future. Several potential problems were resolved over the months that followed, resulting in the removal of a number of
potential license pitfalls for everyone involved in free software development. Theo de Raadt
summed up the effort in a message to the openbsd-misc mailing list on February 20, 2003. The
initial drama of the license crisis had blown over, and the net gain was a new packet-filtering
system under a free license, with the best code quality available, as well as better free licenses
for a large body of code in OpenBSD itself and in other widely used free software.
5. Compatibility with IPFilter configurations was an early design goal for the PF ­developers,
but it stopped being a priority once it could be safely assumed that all OpenBSD users had
moved to PF (around the time OpenBSD 3.2 was released, if not earlier). You shouldn’t assume
that an existing IPFilter configuration will work without changes with any version of PF. With
the syntax changes introduced in OpenBSD 4.7, even upgrades from earlier PF versions will
involve some conversion work.

## 4. Chapter 1

PF proved to be well-developed software. In 2002, Hartmeier presented
a USENIX paper with performance tests showing that the OpenBSD 3.1
PF performed equally well or better under stress than either IPFilter on
Open­BSD 3.1 or iptables on Linux. In addition, tests run on the original
PF from OpenBSD 3.0 showed mainly that the code had gained in efficiency from version 3.0 to version 3.1.6
The OpenBSD PF code, with a fresh packet-filtering engine written by
experienced and security-oriented developers, naturally generated interest in the sister BSDs as well. The FreeBSD project gradually adopted PF,
first as a package and then, from version 5.3 on, in the base system as one
of three packet-filtering systems. PF has also been included in NetBSD and
DragonFly BSD.7
This book focuses on the PF version available in OpenBSD 5.5. I’ll note
significant differences between that version and the ones integrated in
other systems as appropriate.
If you’re ready to dive into PF configuration, you can jump to Chapter 2
to get started. If you want to spend a little more time getting your bearings
in unfamiliar BSD territory, continue reading this chapter.

Ne w e r PF Re le ase s Pe rform Be tt e r
Like the rest of the computing world, OpenBSD and PF have been affected by
rapid changes in hardware and network conditions. I haven’t seen tests comparable to the ones in Daniel Hartmeier’s USENIX paper performed recently, but
PF users have found that the filtering overhead is modest.
As an example (mainly to illustrate that even unexciting hardware configurations can be useful), the machine that gateways between one small office network in my care and the world is a Pentium III 450MHz with 384MB of RAM.
When I’ve remembered to check, I’ve never seen the machine at less than
96 percent idle according to the output from the top(1) command.
It’s also worth noting that the current PF developers, mainly Henning Brauer
and Ryan McBride, with contributions from several others, rewrote large portions of OpenBSD’s PF code with improved performance as a stated main goal
during recent releases, making each release from 4.4 through 5.6 perform
noticeably better than its predecessors.

6. The article that provides the details of these tests is available from Daniel Hartmeier’s website. See http://www.benzedrine.cx/pf-paper.html.
7. At one point, there even existed a personal firewall product running on Microsoft Windows,
named Core Force, that was based on a port of PF. By early 2010, Core Security, the company
that developed Core Force (http://force.coresecurity.com/), seemed to have shifted focus to other
security areas, such as penetration testing, but the product was still available for download.
Building the Network You Need    5

If You Came from Elsewhere
If you’re reading this because you’re considering moving your setup to PF
from some other system, this section is for you.
If you want to use PF, you need to install and run a BSD system, such as
OpenBSD, FreeBSD, NetBSD, or DragonFly BSD. These are all fine operating systems, but my personal favorite is OpenBSD, mainly because that’s the
operating system where essentially all PF development happens. I also find
the no-nonsense approach of the developers and the system refreshing.
Occasionally, minor changes and bug fixes trickle back to the main PF
code base from the PF implementations on other systems, but the newest,
most up-to-date PF code is always to be found on OpenBSD. Some of the
features described in this book are available only in the most recent versions of OpenBSD. The other BSDs have tended to port the latest released
PF version from OpenBSD to their code bases in time for their next release,
but synchronized updates are far from guaranteed, and the lag is sometimes considerable.
If you’re planning to run PF on FreeBSD, NetBSD, DragonFly BSD,
or another system, you should check your system’s release notes and other
documentation for information about which version of PF is included.

Pointers for Linux Users
The differences and similarities between Linux and BSD are potentially a
large topic if you probe deeply, but if you have a reasonable command of
the basics, it shouldn’t take too long for you to feel right at home with the
BSD way of doing things. In the rest of this book, I’ll assume you can find
your way around the basics of BSD network configuration. So, if you’re
more familiar with configuring Linux or other systems than you are with
BSD, it’s worth noting a few points about BSD configuration:

## 6. Chapter 1

Linux and BSD use different conventions for naming network interfaces. The Linux convention is to label all the network interfaces on
a given machine in the sequence eth0, eth1, and so on (although with
some Linux versions and driver combinations, you also see wlan0, wlan1,
and so on for wireless interfaces).
On the BSDs, interfaces are assigned names that equal the driver
name plus a sequence number. For example, older 3Com cards using
the ep driver appear as ep0, ep1, and so on; Intel Gigabit cards are likely
to end up as em0, em1, and so on. Some SMC cards are listed as sn0, sn1,
and so on. This system is quite logical and makes it easier to find the
documentation for the specifics of that interface. If your kernel reports
(at boot time or in ifconfig output) that you have an interface called
em0, you need only type man em at a shell command-line prompt to find
out what speeds it supports—whether there are any eccentricities to be
aware of, whether any firmware download is needed, and so on.

You should be aware that in BSDs, the configuration is /etc/rc.conf-centric.
In general, the BSDs are organized to read the configuration from the
file /etc/rc.conf, which is read by the /etc/rc script at startup. OpenBSD
recommends using /etc/rc.conf.local for local customizations because
rc.conf contains the default values. FreeBSD uses /etc/defaults/rc.conf to
store the default settings, making /etc/rc.conf the correct place to make
changes. In addition, OpenBSD uses per-interface configuration files
called hostname.<if>, where <if> is replaced with the interface name.
For the purpose of learning PF, you’ll need to concentrate on an
/etc/pf.conf file, which will be largely your own creation.

If you need a broader and more thorough introduction to your BSD of
choice, look up the operating system’s documentation, including FAQs and
guides, at the project’s website. You can also find some suggestions for further reading in Appendix A.

Frequently Answered Questions About PF
This section is based on questions I’ve been asked via email or at meetings
and conferences as well as some that have popped up in mailing lists and
other discussion forums. Some of the more common questions are covered
here in a FAQ-style8 format.
Can I run PF on my Linux machine?
In a word, no. Over the years, announcements have appeared on the PF
mailing list from someone claiming to have started a Linux port of PF, but
at the time of this writing, no one has yet claimed to have completed the
task. The main reason for this is probably that PF is developed primarily
as a deeply integrated part of the OpenBSD networking stack. Even after
more than a decade of parallel development, the OpenBSD code still shares
enough fundamentals with the other BSDs to make porting possible, but
porting PF to a non-BSD system would require rewriting large chunks of
PF itself as well as whatever integration is needed at the target side.
For some basic orientation tips for Linux users to find their way in BSD
network configurations, see “Pointers for Linux Users” on page 6.
Can you recommend a GUI tool for managing my PF rule set?
This book is mainly oriented toward users who edit their rule sets in their
favorite text editor. The sample rule sets in this book are simple enough
that you probably wouldn’t get a noticeable benefit from any of the visualization options the various GUI tools are known to offer.
A common claim is that the PF configuration files are generally readable enough that a graphic visualization tool isn’t really necessary. There
are, however, several GUI tools available that can edit and/or generate PF
8. The three-letter abbreviation FAQ expands to either frequently asked questions or frequently
answered questions—both equally valid.
Building the Network You Need    7

configurations, including a complete, customized build of FreeBSD called
pfSense (http://www.pfsense.org/), which includes a sophisticated GUI rule
editor.
I recommend that you work through the parts of this book that apply to
your situation and then decide whether you need to use a GUI tool to feel
comfortable running and maintaining the systems you build.
Is there a tool I can use to convert my OtherProduct® setup to a PF configuration?
The best strategy when converting network setups, including firewall setups,
from one product to another is to go back to the specifications or policies
for your network or firewall configuration and then implement the policies
using the new tool.
Other products will inevitably have a slightly different feature set, and
the existing configuration you created for OtherProduct® is likely to mirror
slightly different approaches to specific problems, which do not map easily,
or at all, to features in PF and related tools.
Having a documented policy, and taking care to update it as your needs
change, will make your life easier. This documentation should contain a complete prose specification of what your setup is meant to achieve. (You might
start out by putting comments in your configuration file to explain the pur­pose of your rules.) This makes it possible to verify whether the configuration you’re running actually implements the design goals. In some corporate settings, there may even be a formal requirement for a written policy.
The impulse to look for a way to automate your conversion is quite
understandable and perhaps expected in a system administrator. I urge
you to resist the impulse and to perform your conversion after reevaluating
your business and technical needs and (preferably) after creating or updating a formal specification or policy in the process.
Some of the GUI tools that serve as administration frontends claim
the ability to output configuration files for several firewall products and
could conceivably be used as conversion tools. However, this has the effect
of inserting another layer of abstraction between you and your rule set,
and it puts you at the mercy of the tool author’s understanding of how PF
rule sets work. I recommend working through at least the relevant parts
of this book before spending serious time on considering an automated
conversion.
I heard PF is based on IPFilter, which I know from working with Solaris. Can I just copy my
IPFilter configuration across and have a working setup right away?
If people claim that PF is “based on” IPFilter, they are saying something
that isn’t true. PF was written from scratch to be a replacement for the
newly deleted IPFilter code. For that first version of PF, one of the design
goals was to keep the syntax fairly compatible with the older software so
the transition to OpenBSD 3.0 would be as painless as possible and not
break existing setups too badly or in unpredictable ways.

## 8. Chapter 1

However, a version or two down the road, it was reasonable to believe
that no OpenBSD users were still likely to upgrade from a version that contained IPFilter, so staying compatible with the older system fell off the list of
priorities. Some syntax similarities remain, even after 25 OpenBSD releases
and more than 12 years of active development. Trying to load one system’s
configuration on the other—for example, copying across an IPFilter configuration to an OpenBSD system and trying to load it there or copying
a modern PF configuration to a Solaris system and trying to load it as an
IPFilter configuration—is guaranteed to fail in almost all cases, except
for a few specially crafted but still quite trivial and, in fact, rather useless
configurations.
Why did the PF rule syntax change all of a sudden?
The world changed, and PF changed with it. More specifically, the OpenBSD
developers have a very active and pragmatically critical relationship to their
code, and like all parts of OpenBSD, the PF code is under constant review.
The lessons learned over more than a decade of PF development and
use led to internal changes in the code that eventually made it clear to
the developers that changing the syntax slightly would make sense. The
changes would make the PF syntax more consistent and make life easier for
users in the long run at the price of some light edits of configuration files.
The result for you, the user, is that PF is now even easier to use and that it
performs better than the earlier versions. If you’re upgrading your system
to OpenBSD 4.7 or newer, you’re in for a real treat.
And with OpenBSD 5.5, you’ll find another good reason to upgrade:
the new queuing system for traffic shaping, which is intended to replace the
venerable ALTQ system. ALTQ is still part of OpenBSD 5.5, although in
slightly modified form, but it has already been removed from the OpenBSD
kernel in time for the OpenBSD 5.6 release. Chapter 7 contains a section
specifically about migrating to the new traffic-shaping system.
Where can I find out more?
There are several good sources of information about PF and the systems
on which it runs. You’ve already found one in this book. You can find references to a number of printed and online resources in Appendix A.
If you have a BSD system with PF installed, consult the online manual
pages, or man pages, for information about your exact release of the software. Unless otherwise indicated, the information in this book refers to the
world as it looks from the command line on an OpenBSD 5.5 system.

A Little Encouragement: A PF Haiku
If you’re not quite convinced yet, or even if you are, a little encouragement
may be in order. Over the years, a good many people have said and written
their bit about PF—sometimes odd, sometimes wonderful, and sometimes
just downright strange.
Building the Network You Need    9

The poem quoted here is a good indication of the level of feeling PF
sometimes inspires in its users. This poem appeared on the PF mailing list,
in a thread that started with a message with the subject “Things pf can’t
do?” in May 2004. The message was written by someone who didn’t have
a lot of firewall experience and who consequently found it hard to get the
desired setup.
This, of course, led to some discussion, with several participants
­saying that if PF was hard on a newbie, the alternatives weren’t any better.
The thread ended in the following haiku of praise from Jason Dixon, dated
May 20, 2004.
Compared to working with iptables, PF is like this haiku:
A breath of fresh air,
floating on white rose petals,
eating strawberries.
Now I'm getting carried away:
Hartmeier codes now,
Henning knows not why it fails,
fails only for n00b.
Tables load my lists,
tarpit for the asshole spammer,
death to his mail store.
CARP due to Cisco,
redundant blessed packets,
licensed free for me.

Some of the concepts Dixon mentions here may sound a bit unfamiliar,
but if you read on, it’ll all make sense soon.

## 10. Chapter 1

P F C o n f i g u r at i o n B as i cs

In this chapter, we’ll create a very simple
setup with PF. We’ll begin with the simplest
configuration possible: a single machine
configured to communicate with a single network. This network could very well be the Internet.
Your two main tools for configuring PF are your favorite text editor and
the pfctl command-line administration tool. PF configurations, usually
stored in /etc/pf.conf, are called rule sets because each line in the configuration file is a rule that helps determine what the packet-filtering subsystem
should do with the network traffic it sees. In ordinary, day-to-day administration, you edit your configuration in the /etc/pf.conf file and then load
your changes using pfctl. There are Web interfaces for PF administration
tasks, but they’re not part of the base system. The PF developers aren’t
hostile toward these options, but they’ve yet to see a graphical interface
for configuring PF that’s clearly preferable to editing pf.conf and using pfctl
commands.

The First Step: Enabling PF
Before you can get started on the fun parts of shaping your network with PF
and related tools, you need to make sure that PF is available and enabled.
The details depend on your specific operating system: OpenBSD, FreeBSD,
or NetBSD. Check your setup by following the instructions for your operating system and then move on to “A Simple PF Rule Set: A Single, StandAlone Machine” on page 16.
The pfctl command is a program that requires higher privilege than
the default for ordinary users. In the rest of this book, you’ll see commands
that require extra privilege prefixed with sudo. If you haven’t started using
sudo yet, you should. sudo is in the base system on OpenBSD. On FreeBSD,
DragonFly BSD, and NetBSD, it’s within easy reach via the ports system or
pkgsrc system, respectively, as security/sudo.
Here are a couple general notes regarding using pfctl:

The command to disable PF is pfctl -d. Once you’ve entered that command, all PF-based filtering that may have been in place will be disabled, and all traffic will be allowed to pass.
For convenience, pfctl can handle several operations on a single command line. To enable PF and load the rule set in a single command,
enter the following:
$ sudo pfctl -ef /etc/pf.conf

Setting Up PF on OpenBSD
In OpenBSD 4.6 and later, you don’t need to enable PF because it’s enabled
by default with a minimal configuration in place.1 If you were watching the
system console closely while the system was starting up, you may have noticed
the pf enabled message appear soon after the kernel messages completed.
If you didn’t see the pf enabled message on the console at startup, you
have several options to check that PF is indeed enabled. One simple way to
check is to enter the command you would otherwise use to enable PF from
the command line:
$ sudo pfctl -e

If PF is already enabled, the system responds with this message:
pfctl: pf already enabled

## 1. If you’re setting up your first PF configuration on an OpenBSD version earlier than this,
the best advice is to upgrade to the most recent stable version. If for some reason you must
stay with the older version, it might be useful to consult the first edition of this book as well
as the man pages and other documentation for the specific version you’re using.

## 12. Chapter 2

If PF isn’t enabled, the pfctl -e command will enable PF and display this:
pf enabled

In versions prior to OpenBSD 4.6, PF wasn’t enabled by default. You
can override the default by editing your /etc/rc.conf.local file (or creating the
file, if it doesn’t exist). Although it isn’t necessary on recent OpenBSD versions, it doesn’t hurt to add this line to your /etc/rc.conf.local file:
pf=YES

If you take a look at the /etc/pf.conf file in a fresh OpenBSD installation,
you get your first exposure to a working rule set.
The default OpenBSD pf.conf file starts off with a set skip on lo rule to
make sure traffic on the loopback interface group isn’t filtered in any way.
The next active line is a simple pass default to let your network traffic pass
by default. Finally, an explicit block rule blocks remote X11 traffic to your
machine.
As you probably noticed, the default pf.conf file also contains a few comment lines starting with a hash mark (#). In those comments, you’ll find
suggested rules that hint at useful configurations, such as FTP passthrough
via ftp-proxy (see Chapter 3) and spamd, the OpenBSD spam-deferral daemon
(see Chapter 6). These items are potentially useful in various real-world scenarios, but because they may not be relevant in all configurations, they are
commented out in the file by default.
If you look for PF-related settings in your /etc/rc.conf file, you’ll find the
setting pf_rules=. In principle, this lets you specify that your configuration is
in a file other than the default /etc/pf.conf. However, changing this setting
is probably not worth the trouble. Using the default setting lets you take
advantage of a number of automatic housekeeping features, such as automatic nightly backup of your configuration to /var/backups.
On OpenBSD, the /etc/rc script has a built-in mechanism to help you
out if you reboot with either no pf.conf file or one that contains an invalid
rule set. Before enabling any network interfaces, the rc script loads a rule set
that allows a few basic services: SSH from anywhere, basic name resolution,
and NFS mounts. This allows you to log in and correct any errors in your
rule set, load the corrected rule set, and then go on working from there.

Setting Up PF on FreeBSD
Good code travels well, and FreeBSD users will tell you that good code from
elsewhere tends to find its way into FreeBSD sooner or later. PF is no exception, and from FreeBSD 5.2.1 and the 4.x series onward, PF and related
tools became part of FreeBSD.

PF Configuration Basics   13

If you read through the previous section on setting up PF on OpenBSD,
you saw that on OpenBSD, PF is enabled by default. That isn’t the case on
FreeBSD, where PF is one of three possible packet-filtering options. Here,
you need to take explicit steps to enable PF, and compared to OpenBSD, it
seems that you need a little more magic in your /etc/rc.conf. A look at your
/etc/defaults/rc.conf file shows that the FreeBSD default values for PF-related
settings are as follows:
pf_enable="NO"
pf_rules="/etc/pf.conf"
pf_program="/sbin/pfctl"
pf_flags=""
pflog_enable="NO"
pflog_logfile="/var/log/pflog" # where pflogd should store the logfile
pflog_program="/sbin/pflogd"
pflog_flags=""
pfsync_enable="NO"
pfsync_syncdev=""
pfsync_ifconfig=""

Fortunately, you can safely ignore most of these—at least for now. The
following are the only options that you need to add to your /etc/rc.conf
configuration:
pf_enable="YES"
pflog_enable="YES"

There are some differences between FreeBSD releases with respect
to PF. Refer to the FreeBSD Handbook available from http://www.freebsd.org/
—specifically the PF section of the “Firewalls” chapter—to see which information applies in your case. The PF code in FreeBSD 9 and 10 is equivalent
to the code in OpenBSD 4.5 with some bug fixes. The instructions in this
book assume that you’re running FreeBSD 9.0 or newer.
On FreeBSD, PF is compiled as a kernel-loadable module by default.
If your FreeBSD setup runs with a GENERIC kernel, you should be able to
start PF with the following:
$ sudo kldload pf
$ sudo pfctl -e

Assuming you have put the lines just mentioned in your /etc/rc.conf and
created an /etc/pf.conf file, you could also use the PF rc script to run PF. The
following enables PF:
$ sudo /etc/rc.d/pf start

And this disables the packet filter:
$ sudo /etc/rc.d/pf stop

## 14. Chapter 2

NO T E

On FreeBSD, the /etc/rc.d/pf script requires at least a line in /etc/rc.conf that
reads pf_enable="YES" and a valid /etc/pf.conf file. If either of these requirements
isn’t met, the script will exit with an error message. There is no /etc/pf.conf file in
a default FreeBSD installation, so you’ll need to create one before you reboot the system
with PF enabled. For our purposes, creating an empty /etc/pf.conf with touch will
do, but you could also work from a copy of the /usr/share/examples/pf/pf.conf
file supplied by the system.
The supplied sample file /usr/share/examples/pf/pf.conf contains no active
settings. It has only comment lines starting with a # character and commentedout rules, but it does give you a preview of what a working rule set will look
like. For example, if you remove the # sign before the line that says set skip
on lo to uncomment the line and then save the file as your /etc/pf.conf, your
loopback interface group will not be filtered once you enable PF and load
the rule set. However, even if PF is enabled on your FreeBSD system, we
haven’t gotten around to writing an actual rule set, so PF isn’t doing much
of anything and all packets will pass.
As of this writing (August 2014), the FreeBSD rc scripts don’t set up a
default rule set as a fallback if the configuration read from /etc/pf.conf fails
to load. This means that enabling PF with no rule set or with pf.conf content
that is syntactically invalid will leave the packet filter enabled with a default
pass all rule set.

Setting Up PF on NetBSD
On NetBSD 2.0, PF became available as a loadable kernel module that
could be installed via packages (security/pflkm) or compiled into a static
kernel configuration. In NetBSD 3.0 and later, PF is part of the base system.
On NetBSD, PF is one of several possible packet-filtering systems, and you
need to take explicit action to enable it.
Some details of PF configuration have changed between NetBSD
releases. This book assumes you are using NetBSD 6.0 or later.2
To use the loadable PF module for NetBSD, add the following lines to
your /etc/rc.conf to enable loadable kernel modules, PF, and the PF log interface, respectively.
lkm="YES" # do load kernel modules
pf=YES
pflogd=YES

To load the pf module manually and enable PF, enter this:
$ sudo modload /usr/lkm/pf.o
$ sudo pfctl -e

## 2. For instructions on using PF in earlier releases, see the documentation for your release and
look up supporting literature listed in Appendix A of this book.
PF Configuration Basics   15

Alternatively, you can run the rc.d scripts to enable PF and logging, as
follows:
$ sudo /etc/rc.d/pf start
$ sudo /etc/rc.d/pflogd start

To load the module automatically at startup, add the following line to
/etc/lkm.conf:
/usr/lkm/pf.o - - - - BEFORENET

If your /usr filesystem is on a separate partition, add this line to your
/etc/rc.conf:
critical_filesystems_local="${critical_filesystems_local} /usr"

If there are no errors at this point, you have enabled PF on your system,
and you’re ready to move on to creating a complete configuration.
The supplied /etc/pf.conf file contains no active settings; it has only
comment lines starting with a hash mark (#) and commented-out rules.
However, it does give you a preview of what a working rule set will look like.
For example, if you remove the hash mark before the line that says set skip
on lo to uncomment it and then save the file, your loopback interface will
not be filtered once you enable PF and load the rule set. However, even if
PF is enabled on your NetBSD system, we haven’t gotten around to writing
an actual rule set, so PF isn’t doing much of anything but passing packets.
NetBSD implements a default or fallback rule set via the file /etc/defaults/
pf.boot.conf. This rule set is intended only to let your system complete its boot
process in case the /etc/pf.conf file doesn’t exist or contains an invalid rule
set. You can override the default rules by putting your own customizations
in /etc/pf.boot.conf.

A Simple PF Rule Set: A Single, Stand-Alone Machine
Mainly to have a common, minimal baseline, we will start building rule sets
from the simplest possible configuration.

A Minimal Rule Set
The simplest possible PF setup is on a single machine that will not run any
services and talks to only one network, which may be the Internet.
We’ll begin with an /etc/pf.conf file that looks like this:
block in all
pass out all keep state

## 16. Chapter 2

This rule set denies all incoming traffic, allows traffic we send, and
retains state information on our connections. PF reads rules from top to
bottom; the last rule in a rule set that matches a packet or connection is the
one that is applied.
Here, any connection coming into our system from anywhere else will
match the block in all rule. Even with this tentative result, the rule evaluation will continue to the next rule (pass out all keep state), but the traffic
will not even match the first criterion (the out direction) in this rule. With
no more rules to evaluate, the status will not change, and the traffic will be
blocked. In a similar manner, any connection initiated from the machine
with this rule set will not match the first rule (once again, the wrong direction) but will match the second rule, which is a pass rule, and the connection is allowed to pass.
We’ll examine the way that PF evaluates rules and how ordering matters in a bit more detail in Chapter 3, in the context of a slightly longer
rule set.
For any rule that has a keep state part, PF keeps information about
the connection, including various counters and sequence numbers, as an
entry in the state table. The state table is where PF keeps information about
existing connections that have already matched a rule, and new packets
that arrive are compared to existing state table entries to find a match first.
Only when a packet doesn’t match any existing state will PF move on to a
full rule set evaluation, checking whether the packet matches a rule in the
loaded rule set. We can also instruct PF to act on state information in various ways, but in a simple case like this, our main goal is to allow return traffic for connections we initiate to return to us.
Note that on OpenBSD 4.1 and later, the default for pass rules is to keep
state information,3 and we no longer need to specify keep state explicitly in
a simple case like this. This means the rule set could be written like this:
block in all
pass out all

In fact, you could even leave out the all keyword here if you like.
The other BSDs have mostly caught up with this change by now, and
for the rest of this book, we’ll stick to the newer rules, with an occasional
reminder in case you are using an older system.
It goes pretty much without saying that passing all traffic generated by a
specific host implies that the host in question is, in fact, trustworthy. This is
something you do only if this is a machine you know you can trust.

## 3. In fact, the new default corresponds to keep state flags S/SA, ensuring that only initial SYN
packets during connection setup create state, eliminating some puzzling error scenarios. To
filter statelessly, you can specify no state for the rules where you don’t want to record or keep
state information. On FreeBSD, OpenBSD 4.1–equivalent PF code was merged into version 7.0.
If you’re using a PF version old enough that it does not have this default, it is a very strong
indicator that you should consider upgrading your operating system as soon as feasible.
PF Configuration Basics   17

When you’re ready to use this rule set, load it with the following:
$ sudo pfctl -ef /etc/pf.conf

The rule set should load without any error messages or warnings. On all
but the slowest systems, you should be returned to the $ prompt immediately.

Testing the Rule Set
It’s always a good idea to test your rule sets to make sure they work as
expected. Proper testing will become essential once you move on to more
complicated configurations.
To test the simple rule set, see whether it can perform domain name
resolution. For example, you could see whether $ host nostarch.com returns
information, such as the IP address of the host nostarch.com and the hostnames of that domain’s mail exchangers. Or just see whether you can surf
the Web. If you can connect to external websites by name, the rule set
allows your system to perform domain name resolution. Basically, any service you try to access from your own system should work, and any service
you try to access on your system from another machine should produce
a Connection refused message.

Slightly Stricter: Using Lists and Macros for Readability
The rule set in the previous section is an extremely simple one—probably
too simplistic for practical use. But it’s a useful starting point to build from
to create a slightly more structured and complete setup. We’ll start by denying all services and protocols and then allow only those we know that we
need,4 using lists and macros for better readability and control.
A list is simply two or more objects of the same type that you can refer
to in a rule set, such as this:
pass proto tcp to port { 22 80 443 }

Here, { 22 80 443 } is a list.
A macro is a pure readability tool. If you have objects that you’ll refer to
more than once in your configuration, such as an IP address for an important host, it could be useful to define a macro instead. For example, you
might define this macro early in your rule set:
external_mail = 192.0.2.12

4. Why write the rule set to default deny? The short answer is that it gives you better control.
The point of packet filtering is to take control, not to play catch-up with what the bad guys do.
Marcus Ranum has written a very entertaining and informative article about this called “The
Six Dumbest Ideas in Computer Security” (http://www.ranum.com/security/computer_security/
editorials/dumb/index.html).

## 18. Chapter 2

Then you could refer to that host as $external_mail later in the rule set:
pass proto tcp to $external_mail port 25

These two techniques have great potential for keeping your rule sets
readable, and as such, they are important factors that contribute to the
overall goal of keeping you in control of your network.

A Stricter Baseline Rule Set
Up to this point, we’ve been rather permissive with regard to any traffic we
generate ourselves. A permissive rule set can be very useful while we check
that basic connectivity is in place or we check whether filtering is part of a
problem we’re seeing. Once the “Do we have connectivity?” phase is over,
it’s time to start tightening up to create a baseline that keeps us in control.
To begin, add the following rule to /etc/pf.conf:

This rule is completely restrictive and will block all traffic in all directions. This is the initial baseline filtering rule that we’ll use in all complete
rule sets over the next few chapters. We basically start from zero, with a configuration where nothing is allowed to pass. Later on, we’ll add rules that cut
our traffic more slack, but we’ll do so incrementally and in a way that keeps
us firmly in control.
Next, we’ll define a few macros for later use in the rule set:
tcp_services = “{ ssh, smtp, domain, www, pop3, auth, https, pop3s }”
udp_services = “{ domain }”

Here, you can see how the combination of lists and macros can be turned
to our advantage. Macros can be lists, and as demonstrated in the example,
PF understands rules that use the names of services as well as port numbers,
as listed in your /etc/services file. We’ll take care to use all these elements
and some further readability tricks as we tackle complex situations that
require more elaborate rule sets.
Having defined these macros, we can use them in our rules, which we’ll
now edit slightly to look like this:
pass out proto tcp to port $tcp_services
pass proto udp to port $udp_services

The strings $tcp_services and $udp_services are macro references.
Macros that appear in a rule set are expanded in place when the rule set
loads, and the running rule set will have the full lists inserted where the
macros are referenced. Depending on the exact nature of the macros, they
may cause single rules with macro references to expand into several rules.
Even in a small rule set like this, the use of macros makes the rules easier
PF Configuration Basics   19

to grasp and maintain. The amount of information that needs to appear
in the rule set shrinks, and with sensible macro names, the logic becomes
clearer. To follow the logic in a typical rule set, more often than not, we
don’t need to see full lists of IP addresses or port numbers in place of
every macro reference.
From a practical rule set maintenance perspective, it’s important to
keep in mind which services to allow on which protocol in order to keep
a comfortably tight regime. Keeping separate lists of allowed services
according to protocol is likely to be useful in keeping your rule set both
functional and readable.

TCP v s. UDP
We’ve taken care to separate out UDP services from TCP services. Several
services run primarily on well-known port numbers on either TCP or UDP, and
a few alternate between using TCP and UDP according to specific conditions.
The two protocols are quite different in several respects. TCP is connection
oriented and reliable, a perfect candidate for stateful filtering. In contrast, UDP
is stateless and connectionless, but PF creates and maintains data equivalent to
state information for UDP traffic in order to ensure UDP return traffic is allowed
back if it matches an existing state.
One common example where state information for UDP is useful is when
handling name resolution. When you ask a name server to resolve a domain
name to an IP address or to resolve an IP address back to a hostname, it’s reasonable to assume that you want to receive the answer. Retaining state information, or the functional equivalent about your UDP traffic, makes this possible.

Reloading the Rule Set and Looking for Errors
After we’ve changed our pf.conf file, we need to load the new rules as
follows:
$ sudo pfctl -f /etc/pf.conf

If there are no syntax errors, pfctl shouldn’t display any messages during the rule load.
If you prefer to display verbose output, use the -v flag:
$ sudo pfctl -vf /etc/pf.conf

## 20. Chapter 2

When you use verbose mode, pfctl should expand your macros into their
separate rules before returning you to the command-line prompt, as follows:
$ sudo pfctl -vf /etc/pf.conf
tcp_services = "{ ssh, smtp, domain, www, pop3, auth, https, pop3s }"
udp_services = "{ domain }"
block drop all
pass out proto tcp from any to any port = ssh flags S/SA keep state
pass out proto tcp from any to any port = smtp flags S/SA keep state
pass out proto tcp from any to any port = domain flags S/SA keep state
pass out proto tcp from any to any port = www flags S/SA keep state
pass out proto tcp from any to any port = pop3 flags S/SA keep state
pass out proto tcp from any to any port = auth flags S/SA keep state
pass out proto tcp from any to any port = https flags S/SA keep state
pass out proto tcp from any to any port = pop3s flags S/SA keep state
pass proto udp from any to any port = domain keep state
$ _

Compare this output to the content of the /etc/pf.conf file you actually
wrote. Our single TCP services rule is expanded into eight different ones:
one for each service in the list. The single UDP rule takes care of only one
service, and it expands from what we wrote to include the default options.
Notice that the rules are displayed in full, with default values such as flags
S/SA keep state applied in place of any options you do not specify explicitly.
This is the configuration as it’s actually loaded.

Checking Your Rules
If you’ve made extensive changes to your rule set, check them before attempting to load the rule set by using the following:
$ pfctl -nf /etc/pf.conf

The -n option tells PF to parse the rules only, without loading them—
more or less as a dry run and to allow you to review and correct any errors.
If pfctl finds any syntax errors in your rule set, it’ll exit with an error message that points to the line number where the error occurred.
Some firewall guides advise you to make sure that your old configuration is
truly gone, or you’ll run into trouble—your firewall might be in some kind
of intermediate state that doesn’t match either the before or after state.
That’s simply not true when you’re using PF. The last valid rule set loaded is
active until you either disable PF or load a new rule set. pfctl checks the syntax and then loads your new rule set completely before switching over to the
new one. This is often referred to as atomic rule set load and means that once
a valid rule set has been loaded, there’s no intermediate state with a partial
rule set or no rules loaded. One consequence is that traffic that matches
states that are valid in both the old and new rule set will not be disrupted.

PF Configuration Basics   21

Unless you’ve actually followed the advice from some of those old
guides and flushed your existing rules (that is possible, using pfctl -F all
or similar) before attempting to load a new one from your configuration
file, the last valid configuration will remain loaded. In fact, flushing the
rule set is rarely a good idea because it effectively puts your packet filter in
a pass all mode, which in turn both opens the door to any comers and runs
the risk of disrupting useful traffic while you’re getting ready to load your
rules.

Testing the Changed Rule Set
Once you have a rule set that pfctl loads without any errors, it’s time to see
whether the rules you’ve written behave as expected. Testing name resolution with a command such as $ host nostarch.com, as we did earlier, should
still work. However, it’s better to choose a domain you haven’t accessed
recently, such as one for a political party you wouldn’t consider voting for,
to be sure that you’re not pulling DNS information from the cache.
You should be able to surf the Web and use several mail-related services,
but due to the nature of this updated rule set, attempts to access TCP services
other than the ones defined—SSH, SMTP, and so forth—on any remote system should fail. And, as with our simple rule set, your system should refuse
all connections that don’t match existing state table entries; only return traffic
for connections initiated by this machine will be allowed in.

Displaying Information About Your System
The tests you’ve performed on your rule sets should have shown that PF is
running and that your rules are behaving as expected. There are several
ways to keep track of what happens in your running system. One of the
more straightforward ways of extracting information about PF is to use the
already familiar pfctl program.
Once PF is enabled and running, the system updates various counters
and statistics in response to network activity. To confirm that PF is running and to view statistics about its activity, you can use pfctl -s, followed
by the type of information you want to display. A long list of information
types is available (see man 8 pfctl and look for the -s options). We’ll get back
to some of those display options in Chapter 9 and go into further detail
about some of the statistics they provide in Chapter 10, when we use the
data to optimize the configuration we’re building.
The following shows an example of just the top part of the output of
pfctl -s info (taken from my home gateway). The high-level information
that indicates the system actually passes traffic can be found in this upper part.

## 22. Chapter 2

$ sudo pfctl -s info
Status: Enabled for 24 days 12:11:27
Interface Stats for nfe0
Bytes In
Bytes Out
Packets In
Passed
Blocked
Packets Out
Passed
Blocked
State Table
current entries
searches
inserts
removals

Debug: err

IPv4
43846385394
20023639992

IPv6
64

49380289
49530

45701100
1034

Total
319
178598618
4965347
4965028

Rate
84.3/s
2.3/s
2.3/s

The first line of the pfctl output indicates that PF is enabled and has
been running for a little more than three weeks, which is equal to the time
since I last performed a system upgrade that required a reboot.
The Interface Stats part of the display is an indication that the system’s
administrator has chosen one interface (here, nfe0) as the log interface for
the system and shows the bytes in and out handled by the interface. If no
log interface has been chosen, the display is slightly different. Now would
be a good time to check what output your system produces. The next few
items are likely to be more interesting in our context, showing the number
of packets blocked or passed in each direction. This is where we find an early
indication of whether the filtering rules we wrote are catching any traffic.
In this case, either the rule set matches expected traffic well, or we have
fairly well-behaved users and guests, with the number of packets passed
being overwhelmingly larger than the number of packets blocked in both
directions.
The next important indicator of a working system that’s processing
traffic is the block of State Table statistics. The state table current entries
line shows that there are 319 active states or connections, while the state
table has been searched (searches) for matches to existing states on average
a little more than 84 times per second, for a total of just over 178 million
times since the counters were reset. The inserts and removals counters show
the number of times states have been created and removed, respectively. As
expected, the number of insertions and removals differs by the number of
currently active states, and the rate counters show that for the time since
the counters were last reset, the rate of states created and removed matches
exactly up to the resolution of this display.

PF Configuration Basics   23

The information here is roughly in line with the statistics you should
expect to see on a gateway for a small network configured for IPv4 only.
There’s no reason to be alarmed by the packet passed in the IPv6 column.
OpenBSD comes with IPv6 built in. During network interface configuration, by default, the TCP/IP stack sends IPv6 neighbor solicitation requests
for the link local address. In a normal IPv4-only configuration, only the
first few packets actually pass, and by the time the PF rule set from /etc/
pf.conf is fully loaded, IPv6 packets are blocked by the block all default rule.
(In this example, they don’t show up in nfe0’s statistics because IPv6 is tunneled over a different interface.)

Looking Ahead
You should now have a machine that can communicate with other Internetconnected machines, using a very basic rule set that serves as a starting point
for controlling your network traffic. As you progress through this book,
you’ll learn how to add rules that do various useful things. In Chapter 3, we’ll
extend the configuration to act as a gateway for a small network. Serving
the needs of several computers has some consequences, and we’ll look
at how to let at least some ICMP and UDP traffic through—for your own
trouble­shooting needs if nothing else.
In Chapter 3, we’ll also consider network services that have consequences for your security, like FTP. Using packet filtering intelligently to
handle services that are demanding, security-wise, is a recurring theme in
this book.

## 24. Chapter 2

Into the Re al World

The previous chapter demonstrated the
configuration for basic packet filtering on
a single machine. In this chapter, we’ll build
on that basic setup but move into more conventional territory: the packet-filtering gateway. Although
most of the items in this chapter are potentially useful in a single-machine
setup, our main focus is to set up a gateway that forwards a selection of
network traffic and handles common network services for a basic local
network.

A Simple Gateway
We’ll start with building what you probably associate with the term firewall:
a machine that acts as a gateway for at least one other machine. In addition
to forwarding packets between its various networks, this machine’s mission
will be to improve the signal-to-noise ratio in the network traffic it handles.
That’s where our PF configuration comes in.

But before diving into the practical configuration details, we need to
dip into some theory and flesh out some concepts. Bear with me; this will
end up saving you some headaches I’ve seen on mailing lists, newsgroups,
and Web forums all too often.

Keep It Simple: Avoid the Pitfalls of in, out, and on
In the single-machine setup, life is relatively simple. Traffic you create
should either pass out to the rest of the world or be blocked by your filtering rules, and you get to decide what you want to let in from elsewhere.
When you set up a gateway, your perspective changes. You go from the
“It’s me versus the network out there” mindset to “I’m the one who decides
what to pass to or from all the networks I’m connected to.” The machine
has several, or at least two, network interfaces, each connected to a separate
network, and its primary function (or at least the one we’re interested in
here) is to forward network traffic between networks. Conceptually, the network would look something like Figure 3-1.

Our bridge,

Figure 3-1: Network with a single gateway

It’s very reasonable to think that if you want traffic to pass from the network connected to re1 to hosts on the network connected to re0, you’ll need
a rule like the following:1
pass in proto tcp on re1 from re1:network to re0:network \
port $ports keep state

However, one of the most common and most complained-about mistakes in firewall configuration is not realizing that the to keyword doesn’t

## 1. In fact, the keep state part denotes the default behavior and is redundant if you’re working
with a PF version taken from OpenBSD 4.1 or later. However, there’s generally no need to
remove the specification from existing rules you come across when upgrading from earlier
versions. To ease the transition, the examples in this book will make this distinction when
needed.

## 26. Chapter 3

in itself guarantee passage to the end point. The to keyword here means
only that a packet or connection must have a destination address that
matches those criteria in order to match the rule. The rule we just wrote
lets the traffic pass in to just the gateway itself and on the specific interface
named in the rule. To allow the packets in a bit further and to move on to
the next network, we need a matching rule that says something like this:
pass out proto tcp on re0 from re1:network to re0:network \
port $ports keep state

But please stop and take a moment to read those rules one more time.
This last rule allows only packets with a destination in the network directly
connected to re0 to pass, and nothing else. If that’s exactly what you want,
fine. In other contexts, such rules are, while perfectly valid, more specific
than the situation calls for. It’s very easy to let yourself dive deeply into specific details and lose the higher-level view of the configuration’s purpose—
and maybe earn yourself a few extra rounds of debugging in the process.
If there are good reasons for writing very specific rules, like the preceding ones, you probably already know that you need them and why. By the
time you have finished this book (if not a bit earlier), you should be able to
articulate the circumstances when more specific rules are needed. However,
for the basic gateway configurations in this chapter, it’s likely that you’ll want
to write rules that are not interface-specific. In fact, in some cases, it isn’t
useful to specify the direction either; you’d simply use a rule like the following to let your local network access the Internet:
pass proto tcp from re1:network to port $ports keep state

For simple setups, interface-bound in and out rules are likely to add
more clutter to your rule sets than they’re worth. For a busy network admin,
a readable rule set is a safer one. (And we’ll look at some additional safety
measures, like antispoof, in Chapter 10.)
For the remainder of this book, with some exceptions, we’ll keep the
rules as simple as possible for readability.

Network Address Translation vs. IPv6
Once we start handling traffic between separate networks, it’s useful to look
at how network addresses work and why you’re likely to come across several
different addressing schemes. The subject of network addresses has been a
rich source of both confusion and buzzwords over the years. The underlying facts are sometimes hard to establish, unless you go to the source and
wade through a series of RFCs. Over the next few paragraphs, I’ll make an
effort to clear up some of the confusion.
For example, a widely held belief is that if you have an internal network
that uses a totally different address range from the one assigned to the
interface attached to the Internet, you’re safe, and no one from the outside

Into the Real World   27

can get at your network resources. This belief is closely related to the idea
that the IP address of your firewall in the local network must be either
192.168.0.1 or 10.0.0.1.
There’s an element of truth in both notions, and those addresses are
common defaults. But the real story is that it’s possible to sniff one’s way
past network address translation, although PF offers some tricks that make
that task harder.
The real reason we use a specific set of internal address ranges and a
different set of addresses for unique external address ranges isn’t primarily to address security concerns. Rather, it’s the easiest way to work around
a design problem in the Internet protocols: a limited range of possible
addresses.
In the 1980s, when the Internet protocols were formulated, most computers on the Internet (or ARPANET, as it was known at the time) were large
machines with anything from several dozen to several thousand users each.
At the time, a 32-bit address space with more than four billion addresses
seemed quite sufficient, but several factors have conspired to prove that
assumption wrong. One factor is that the address-allocation process led
to a situation where the largest chunks of the available address space were
already allocated before some of the world’s more populous nations even
connected to the Internet. The other, and perhaps more significant, factor
was that by the early 1990s, the Internet was no longer a research project,
but rather a commercially available resource with consumers and companies of all sizes consuming IP address space at an alarming rate.
The long-term solution was to redefine the Internet to use a larger
address space. In 1998, the specification for IPv6, with 128 bits of address
space for a total of 2128 addresses, was published as RFC 2460. But while
we were waiting for IPv6 to become generally available, we needed a stopgap solution. That solution came as a series of RFCs that specified how a
gateway could forward traffic with IP addresses translated so that a large
local network would look like just one computer to the rest of the Internet.
Certain previously unallocated IP address ranges were set aside for these
private networks. These were free for anyone to use, on the condition that
traffic in those ranges wouldn’t be allowed out on the Internet untranslated. Thus, network address translation (NAT) was born in the mid-1990s and
quickly became the default way to handle addressing in local networks.
PF supports IPv6 as well as the various IPv4 address translation tricks.
(In fact, the BSDs were among the earliest IPv6 adopters, thanks to the
efforts of the KAME project.3) All systems that have PF also support both
the IPv4 and the IPv6 address families. If your IPv4 network needs a NAT

## 2. RFC 1631, “The IP Network Address Translator (NAT),” dated May 1994, and RFC 1918,
“Address Allocation for Private Internets,” dated February 1996, provide the details about NAT.
3. To quote the project home page at http://www.kame.net/, “The KAME project was a joint
effort of six companies in Japan to provide a free stack of IPv6, IPsec, and Mobile IPv6 for
BSD variants.” The main research and development activities were considered complete in
March 2006, with only maintenance activity continuing now that the important parts have
been incorporated into the relevant systems.

## 28. Chapter 3

configuration, you can integrate the translation as needed in your PF rule
set. In other words, if you’re using a system that supports PF, you can be reasonably sure that your IPv6 needs have been taken care of, at least on the
operating-system level. However, some operating systems with a PF port use
older versions of the code, and it’s important to be aware that the general
rule that newer PF code is better applies equally to the IPv6 context.
The examples in this book use mainly IPv4 addresses and NAT where
appropriate, but most of the material is equally relevant to networks that
have implemented IPv6.

Final Preparations: Defining Your Local Network
In Chapter 2, we set up a configuration for a single, standalone machine.
We’re about to extend that configuration to a gateway version, and it’s useful
to define a few more macros to help readability and to conceptually separate the local networks where you have a certain measure of control from
everything else. So how do you define your “local” network in PF terms?
Earlier in this chapter, you saw the interface:network notation. This is
a nice piece of shorthand, but you can make your rule set even more readable and easier to maintain by taking the macro a bit further. For example,
you could define a $localnet macro as the network directly attached to
your internal interface (re1:network in our examples). Or you could change
the definition of $localnet to an IP address/netmask notation to denote a
network, such as 192.168.100.0/24 for a subnet of private IPv4 addresses or
2001:db8:dead:beef::/64 for an IPv6 range.
If your network environment requires it, you could define your $localnet
as a list of networks. For example, a sensible $localnet definition combined
with pass rules that use the macro, such as the following, could end up saving you a few headaches:
pass proto { tcp, udp } from $localnet to port $ports

We’ll stick to the convention of using macros such as $localnet for readability from here on.

Setting Up a Gateway
We’ll take the single-machine configuration we built from the ground up in
the previous chapter as our starting point for building our packet-filtering
gateway. We assume that the machine has acquired another network card
(or that you have set up a network connection from your local network to
one or more other networks via Ethernet, PPP, or other means).
In our context, it isn’t too interesting to look at the details of how the
interfaces are configured. We just need to know that the interfaces are up
and running.

Into the Real World   29

For the following discussion and examples, only the interface names
will differ between a PPP setup and an Ethernet one, and we’ll do our best
to get rid of the actual interface names as quickly as possible.
First, because packet forwarding is off by default in all BSDs, we need
to turn it on in order to let the machine forward the network traffic it
receives on one interface to other networks via one or more separate interfaces. Initially, we’ll do this on the command line with a sysctl command
for traditional IPv4:

If we need to forward IPv6 traffic, we use this sysctl command:

This is fine for now. However, in order for this to work once you reboot
the computer at some time in the future, you need to enter these settings
into the relevant configuration files.
In OpenBSD and NetBSD, you do this by editing /etc/sysctl.conf and adding IP-forwarding lines to the end of the file so the last lines look like this:
net.inet.ip.forwarding=1
net.inet6.ip6.forwarding=1

In FreeBSD, make the change by putting these lines in your /etc/rc.conf:
gateway_enable="YES" #for ipv4
ipv6_gateway_enable="YES" #for ipv6

The net effect is identical; the FreeBSD rc script sets the two values via
sysctl commands. However, a larger part of the FreeBSD configuration is

centralized into the rc.conf file.
Now it’s time to check whether all of the interfaces you intend to use
are up and running. Use ifconfig -a or ifconfig interface_name to find out.
The output of ifconfig -a on one of my systems looks like this:
$ ifconfig -a
lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 33224
groups: lo
inet 127.0.0.1 netmask 0xff000000
inet6 ::1 prefixlen 128
inet6 fe80::1%lo0 prefixlen 64 scopeid 0x5
xl0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
lladdr 00:60:97:83:4a:01
groups: egress
media: Ethernet autoselect (100baseTX full-duplex)
inet 194.54.107.18 netmask 0xfffffff8 broadcast 194.54.107.23
inet6 fe80::260:97ff:fe83:4a01%xl0 prefixlen 64 scopeid 0x1

## 30. Chapter 3

fxp0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
lladdr 00:30:05:03:fc:41
media: Ethernet autoselect (100baseTX full-duplex)
inet 194.54.103.65 netmask 0xffffffc0 broadcast 194.54.103.127
inet6 fe80::230:5ff:fe03:fc41%fxp0 prefixlen 64 scopeid 0x2
pflog0: flags=141<UP,RUNNING,PROMISC> mtu 33224
enc0: flags=0<> mtu 1536

Your setup is most likely somewhat different. Here, the physical interfaces
on the gateway are xl0 and fxp0. The logical interfaces lo0 (the loopback
interface), enc0 (the encapsulation interface for IPSEC use), and pflog0 (the
PF logging device) are probably on your system, too.
If you’re on a dial-up connection, you probably use some variant of PPP
for the Internet connection, and your external interface is the tun0 pseudodevice. If your connection is via some sort of broadband connection, you
may have an Ethernet interface to play with. However, if you’re in the significant subset of ADSL users who use PPP over Ethernet (PPPoE), the correct
external interface will be one of the pseudo-devices tun0 or pppoe0 (depending on whether you use userland pppoe(8) or kernel mode pppoe(4)), not the
physical Ethernet interface.
Depending on your specific setup, you may need to do some other
device-specific configuration for your interfaces. After you have that set
up, you can move on to the TCP/IP level and deal with the packet-filtering
configuration.
If you still intend to allow any traffic initiated by machines on the inside,
your /etc/pf.conf for your initial gateway setup could look roughly like this:
match out on $ext_if inet from $localnet nat-to ($ext_if) # NAT, match IPv4 only
pass from { self, $localnet }

Note the use of macros to assign logical names to the network interfaces. Here, Realtek Ethernet cards are used, but this is the last time we’ll
find this of any interest whatsoever in our context.
In truly simple setups like this one, we may not gain very much by using
macros like these, but once the rule sets grow a little larger, you’ll learn to
appreciate the readability they add.
One possible refinement to this rule set would be to remove the macro
ext_if and replace the $ext_if references with the string egress, which is the
name of the interface group that contains the interface that has the default
route. Interface groups are not macros, so you would write the name egress
without a leading $ character.
Also note the match rule with nat-to. This is where you handle NAT
from the nonroutable address inside your local network to the sole official address assigned to you. If your network uses official, routable IPv4
Into the Real World   31

addresses, you simply leave this line out of your configuration. The match
rules, which were introduced in OpenBSD 4.6, can be used to apply actions
when a connection matches the criteria without deciding whether a connection should be blocked or passed.
The parentheses surrounding the last part of the match rule ($ext_if)
are there to compensate for the possibility that the IP address of the external interface may be dynamically assigned. This detail will ensure that your
network traffic runs without serious interruptions, even if the interface’s IP
address changes.
It’s time to sum up the rule set we’ve built so far: (1) We block all traffic
originating outside our own network. (2) We make sure all IPv4 traffic initiated by hosts in our local network will pass into the outside world only with
the source address rewritten to the routable address assigned to the gateway’s external interface. (3) Finally, we let all traffic from our local network
(IPv4 and IPv6 both) and from the gateway itself pass. The keyword self in
the final pass rule is a macro-ish reserved word in PF syntax that denotes all
addresses assigned to all interfaces on the local host.
If your operating system runs a pre-OpenBSD 4.7 PF version, your first
gateway rule set would look something like this:
nat on $ext_if inet from $localnet to any -> ($ext_if) # NAT, match IPv4 only
pass from { self, $localnet } to any keep state

The nat rule here handles the translation much as does the match rule
with nat-to in the previous example.
On the other hand, this rule set probably allows more traffic than you
actually want to pass out of your network. In one of the networks where I’ve
done a bit of work, the main part of the rule set is based on a macro called
client_out:
client_out = "{ ftp-data, ftp, ssh, domain, pop3, auth, nntp, http,\
https, 446, cvspserver, 2628, 5999, 8000, 8080 }"

It has this pass rule:
pass proto tcp from $localnet to port $client_out

This may be a somewhat peculiar selection of ports, but it’s exactly what
my colleagues there needed at the time. Some of the numbered ports were
needed for systems that were set up for specific purposes at other sites. Your
needs probably differ at least in some details, but this should cover some of
the more useful services.
