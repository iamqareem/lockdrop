---
id: book-of-pf-05
title: "The Book of PF — Chapter 7, Chapter 7, Chapter 7, VRRP is described in RFC 2281…"
slug: book-of-pf-05-the-book-of-pf-chapter-7-chapter-7-chapter-7-vrrp-is-describ
source: "The Book of PF, 3rd Edition"
sourceSection: "138. Chapter 7, 140. Chapter 7, 144. Chapter 7, 1. VRRP is described in RFC 2281 and RFC 3768. The patents involved are held by Cisco,, 148. Chapter 8, 150. Chapter 8, 152. Chapter 8, 154. Chapter 8, 156. Chapter 8, 160. Chapter 8, 162. Chapter 9, 166. Chapter 9, 168. Chapter 9, 170. Chapter 9"
track: bsd-internals
tier: premium
tags: [firewall, pf, networking, security]
summary: "Maximizing network performance generally feels nice. Covers 14 sections: Chapter 7, Chapter 7, Chapter 7."
---
# The Book of PF — Chapter 7, Chapter 7, Chapter 7, VRRP is described in RFC 2281…

## 138. Chapter 7

Class-Based Bandwidth Allocation for Small Networks
Maximizing network performance generally feels nice. However, you may
find that your network has other needs. For example, it might be important
for some traffic—such as mail and other vital services—to have a baseline
amount of bandwidth available at all times, while other services—peer-topeer file sharing comes to mind—shouldn’t be allowed to consume more
than a certain amount. To address these kinds of requirements or concerns,
ALTQ offers the class-based queue (cbq) discipline with a slightly larger set
of options.
To illustrate how to use cbq, we’ll build on the rule sets from previous
chapters within a small local network. We want to let the users on the local
network connect to a predefined set of services outside their own network
and let users from outside the local network access a Web server and an
FTP server somewhere on the local network.
All queues are set up on the external, Internet-facing interface. This approach
makes sense mainly because bandwidth is more likely to be limited on the
external link than on the local network. In principle, however, allocating
queues and running traffic shaping can be done on any network interface.
The example setup shown here includes a cbq queue for a total bandwidth
of 2Mb with six subqueues.
altq on $ext_if cbq bandwidth 2Mb queue { main, ftp, udp, web, ssh, icmp }
queue main bandwidth 18% cbq(default borrow red)
queue ftp bandwidth 10% cbq(borrow red)
queue udp bandwidth 30% cbq(borrow red)
queue web bandwidth 20% cbq(borrow red)
queue ssh bandwidth 20% cbq(borrow red) { ssh_interactive, ssh_bulk }
queue ssh_interactive priority 7 bandwidth 20%
queue ssh_bulk priority 5 bandwidth 80%
queue icmp bandwidth 2% cbq

The subqueue main has 18 percent of the bandwidth and is designated
as the default queue. This means any traffic that matches a pass rule but
isn’t explicitly assigned to some other queue ends up here. The borrow and
red keywords mean that the queue may “borrow” bandwidth from its parent
queue, while the system attempts to avoid congestion by applying the RED
algorithm.
The other queues follow more or less the same pattern up to the subqueue ssh, which itself has two subqueues with separate priorities. Here, we
see a variation on the ACK priority example. Bulk SSH transfers, typically
SCP file transfers, are transmitted with a ToS indicating throughput, while
interactive SSH traffic has the ToS flag set to low delay and skips ahead
of the bulk transfers. The interactive traffic is likely to be less bandwidth
consuming and gets a smaller share of the bandwidth, but it receives

Traffic Shaping with Queues and Priorities   139

preferential treatment because of the higher-priority value assigned to
it. This scheme also helps the speed of SCP file transfers because the
ACK packets for the SCP transfers will be assigned to the higher-priority
subqueue.
Finally, we have the icmp queue, which is reserved for the remaining
2 percent of the bandwidth from the top level. This guarantees a minimum
amount of bandwidth for ICMP traffic that we want to pass but that doesn’t
match the criteria for being assigned to the other queues.
To make it all happen, we use these pass rules, which indicate which traffic
is assigned to the queues and their criteria:
set skip on { lo, $int_if }
pass log quick on $ext_if proto tcp to port ssh queue (ssh_bulk, ssh_
interactive)
pass in quick on $ext_if proto tcp to port ftp queue ftp
pass in quick on $ext_if proto tcp to port www queue http
pass out on $ext_if proto udp queue udp
pass out on $ext_if proto icmp queue icmp
pass out on $ext_if proto tcp from $localnet to port $client_out

The rules for ssh, ftp, www, udp, and icmp assign traffic to their respective
queues. The last catchall rule passes all other traffic from the local network, lumping it into the default main queue.

A Basic HFSC Traffic Shaper
The simple schedulers we have looked at so far can make for efficient setups, but network admins with traffic-shaping ambitions tend to look for a
little more flexibility than can be found in the pure-priority-based queues
or the simple class-based variety. The HFSC queuing algorithm (hfsc in
pf.conf terminology) offers flexible bandwidth allocation, guaranteed lower
and upper bounds for bandwidth available to each queue, and variable allocations over time, and it only starts shaping when there’s an actual need.
However, the added flexibility comes at a price: The setup is a tad more
complex than the other ALTQ types, and tuning your setup for an optimal
result can be quite an interesting process.
First, working from the same configuration we altered slightly earlier, we
insert this queue definition early in the pf.conf file:
altq on $ext_if bandwidth $ext_bw hfsc queue { main, spamd }
queue main bandwidth 99% priority 7 qlimit 100 hfsc (realtime 20%, linkshare 99%) \
{ q_pri, q_def, q_web, q_dns }
queue q_pri bandwidth 3% priority 7 hfsc (realtime 0, linkshare 3% red )
queue q_def bandwidth 47% priority 1 hfsc (default realtime 30% linkshare 47% red)
queue q_web bandwidth 47% priority 1 hfsc (realtime 30% linkshare 47% red)

## 140. Chapter 7

queue q_dns bandwidth 3% priority 7 qlimit 100 hfsc (realtime (30Kb 3000 12Kb), \
linkshare 3%)
queue spamd bandwidth 0% priority 0 qlimit 300 hfsc (realtime 0, upperlimit 1%, \
linkshare 1%)

The hfsc queue definitions take slightly different parameters than the
simpler disciplines. We start off with this rather small hierarchy by splitting
the top-level queue into two. At the next level, we subdivide the main queue
into several subqueues, each with a defined priority. All the subqueues have
a realtime value set—the guaranteed minimum bandwidth allocated to
the queue. The optional upperlimit sets a hard upper limit on the queue’s
allocation. The linkshare parameter sets the allocation the queue will have
available when it’s backlogged—that is, when it’s started to eat into its qlimit
allocation.
In case of congestion, each queue by default has a pool of 50 slots, the
queue limit (qlimit), to keep packets around when they can’t be transmitted
immediately. In this example, the top-level queues main and spamd both have
larger-than-default pools set by their qlimit setting: 100 for main and 300 for
spamd. Cranking up queue sizes here means we’re a little less likely to drop
packets when the traffic approaches the set limits, but it also means that
when the traffic shaping kicks in, we’ll see increased latency for connections that end up in these larger than default pools.
The queue hierarchy here uses two familiar tricks to make efficient use
of available bandwidth:

It uses a variation of the high- and low-priority mix demonstrated in the
earlier pure-priority example.
We speed up almost all other traffic (and most certainly the Web traffic that appears to be the main priority here) by allocating a small but
guaranteed portion of bandwidth for name service lookups. For the q_dns
queue, we set up the realtime value with a time limit—after 3000 milliseconds, the realtime allocation goes down to 12Kb. This can be useful to
speed connections that transfer most of their payload during the early
phases.

Next, we tie the newly created queues into the rule set. If you have a filtering regime in place already, which we’ll assume you do, the tie-in becomes
amazingly simple, accomplished by adding a few match rules.
match out on $ext_if from $air_if:network nat-to ($ext_if) \
queue (q_def, q_pri)
match out on $ext_if from $int_if:network nat-to ($ext_if) \
queue (q_def, q_pri)
match out on $ext_if proto tcp to port { www https } queue (q_web, q_pri)
match out on $ext_if proto { tcp udp } to port domain queue (q_dns, q_pri)
match out on $ext_if proto icmp queue (q_dns, q_pri)

Traffic Shaping with Queues and Priorities   141

Here, the match rules once again do the ACK packet speedup trick with
the high- and low-priority queue assignment, just as you saw earlier in the
pure-priority-based system. The only exception is when we assign traffic to our
lowest-priority queue, where we really don’t care to have any speedup at all.
pass in log on egress proto tcp to port smtp rdr-to 127.0.0.1 port spamd queue spamd

This rule is intended to slow down the spammers a little more on their
way to our spamd. With a hierarchical queue system in place, systat queues
shows the queues and their traffic as a hierarchy, too.
QUEUE
root_nfe0
main
q_pri
q_def
q_web
q_dns
spamd

Load 0.22 0.25 0.25
BW SCH PRIO
20M hfsc
19M hfsc
594K hfsc
9306K hfsc
9306K hfsc
594K hfsc
0 hfsc

PKTS
1360
158
914
196
431

Fri Apr  3 16:43:37 2015
BYTES
82284
15816
709845
17494
24159

DROP_P

DROP_B QLEN BORROW SUSPEN

P/S
0.2
50

B/S
770
61010
277
174

The root queue is shown as attached to the physical interface—as nfe0
and root_nfe0, in this case. main and its subqueues— q_pri, q_def, q_web, and
q_dns—are shown with their bandwidth allocations and number of bytes
and packets passed. The DROP_P and DROP_B columns are where number of
packets and bytes dropped, respectively, would appear if we had been forced
to drop packets at this stage. The final two columns show live updates of
packets per second and bytes per second.

Queuing for Servers in a DMZ
In Chapter 5, we set up a network with a single gateway but with all externally visible services configured on a separate DMZ network. That way, all
traffic to the servers from both the Internet and the internal network had
to pass through the gateway (see Figure 7-1).
With the rule set from Chapter 5 as our starting point, we’ll add some
queuing in order to optimize our network resources. The physical and
logical layout of the network will not change. The most likely bottleneck
for this network is the bandwidth for the connection between the gateway’s
external interface and the Internet at large. The bandwidth elsewhere in
our setup isn’t infinite, of course, but the available bandwidth on any interface in the local network is likely to be less of a limiting factor than the
bandwidth actually available for communication with the outside world.
For services to be available with the best possible performance, we need to
set up the queues so the bandwidth available at the site is made available
to the traffic we want to allow.
In our example, it’s likely that the interface bandwidth on the DMZ
interface is either 100Mb or 1Gb, while the actual available bandwidth for
connections from outside the local network is considerably smaller. This
142   Chapter 7

consideration shows up in our queue definitions, where you clearly see that
the bandwidth available for external traffic is the main limitation in the
queue setup.
total_ext = 2Mb
total_dmz = 100Mb
altq on $ext_if cbq bandwidth $total_ext queue { ext_main, ext_web, ext_udp, \
    ext_mail, ext_ssh }
queue ext_main bandwidth 25% cbq(default borrow red) { ext_hi, ext_lo }
queue ext_hi priority 7 bandwidth 20%
queue ext_lo priority 0 bandwidth 80%
queue ext_web bandwidth 25% cbq(borrow red)
queue ext_udp bandwidth 20% cbq(borrow red)
queue ext_mail bandwidth 30% cbq(borrow red)
altq on $dmz_if cbq bandwidth $total_dmz queue { ext_dmz, dmz_main, dmz_web, \
    dmz_udp, dmz_mail }
queue ext_dmz bandwidth $total_ext cbq(borrow red) queue { ext_dmz_web, \
    ext_dmz_udp, ext_dmz_mail }
queue ext_dmz_web bandwidth 40% priority 5
queue ext_dmz_udp bandwidth 10% priority 7
queue ext_dmz_mail bandwidth 50% priority 3
queue dmz_main bandwidth 25Mb cbq(default borrow red) queue { dmz_main_hi, \
    dmz_main_lo }
queue dmz_main_hi priority 7 bandwidth 20%
queue dmz_main_lo priority 0 bandwidth 80%
queue dmz_web bandwidth 25Mb cbq(borrow red)
queue dmz_udp bandwidth 20Mb cbq(borrow red)
queue dmz_mail bandwidth 20Mb cbq(borrow red)

Notice that the total_ext bandwidth limitation determines the allocation for all queues where the bandwidth for external connections is available. In order to use the new queuing infrastructure, we need to make some
changes to the filtering rules, too. Keep in mind that any traffic you don’t
explicitly assign to a specific queue is assigned to the default queue for the
interface. Thus, it’s important to tune your filtering rules as well as your
queue definitions to the actual traffic in your network.
With queue assignment, the main part of the filtering rules could end
up looking like this:
pass in on $ext_if proto { tcp, udp } to $nameservers port domain \
queue ext_udp
pass in on $int_if proto { tcp, udp } from $localnet to $nameservers \
port domain
pass out on $dmz_if proto { tcp, udp } to $nameservers port domain \
queue ext_dmz_udp
pass out on $dmz_if proto { tcp, udp } from $localnet to $nameservers \
port domain queue dmz_udp
pass in on $ext_if proto tcp to $webserver port $webports queue ext_web
pass out on $dmz_if proto tcp to $webserver port $webports queue ext_dmz_web
pass out on $dmz_if proto tcp from $localnet to $webserver port $webports \
queue dmz_web
Traffic Shaping with Queues and Priorities   143

pass in log on $ext_if proto tcp from $localnet to $mailserver port smtp
pass out log on $dmz_if proto tcp to $mailserver port smtp queue ext_mail
pass in on $dmz_if from $mailserver to port smtp queue dmz_mail
pass out log on $ext_if proto tcp from $mailserver to port smtp \
queue ext_dmz_mail

Notice that only traffic that will pass either the DMZ interface or the
external interface is assigned to queues. In this configuration, with no externally accessible services on the internal network, queuing on the internal
interface wouldn’t make much sense because it’s likely the part of our network with the least restrictions on available bandwidth.

Using ALTQ to Handle Unwanted Traffic
So far, we’ve focused on queuing as a method to make sure specific kinds
of traffic are let through as efficiently as possible given the conditions that
exist in and around your network. Now, we’ll look at two examples that
present a slightly different approach to identify and handle unwanted traffic in order to demonstrate some queuing-related tricks you can use to keep
miscreants in line.
Overloading to a Tiny Queue
Think back to “Turning Away the Brutes” on page 94, where we used
a combination of state-tracking options and overload rules to fill up a table
of addresses for special treatment. The special treatment we demonstrated
in Chapter 6 was to cut all connections, but it’s equally possible to assign
overload traffic to a specific queue instead.
Consider this rule from our class-based bandwidth example in “ClassBased Bandwidth Allocation for Small Networks” on page 139.
keep state queue (ssh_bulk, ssh_interactive)

We could add state-tracking options, as shown in here.
keep state (max-src-conn 15, max-src-conn-rate 5/3, \
overload <bruteforce> flush global) queue (ssh_bulk, ssh_interactive)

Then, we could make one of the queues slightly smaller.
queue smallpipe bandwidth 1kb cbq

Next, we could assign traffic from miscreants to the small-bandwidth
queue with the following rule.
pass inet proto tcp from <bruteforce> to port $tcp_services queue smallpipe

## 144. Chapter 7

It might also be useful to supplement rules like these with table-entry
expiry, as described in “Tidying Your Tables with pfctl” on page 97.
Queue Assignments Based on Operating System Fingerprint
Chapter 6 covered several ways to use spamd to cut down on spam. If running
spamd isn’t an option in your environment, you can use a queue and rule set
based on the common knowledge that machines that send spam are likely
to run a particular operating system.
PF has a fairly reliable operating system fingerprinting mechanism,
which detects the operating system at the other end of a network connection based on characteristics of the initial SYN packets at connection setup.
The following may be a simple substitute for spamd if you’ve determined that
legitimate mail is highly unlikely to be delivered from systems that run that
particular operating system.
pass quick proto tcp from any os "Windows" to $ext_if port smtp queue smallpipe

Here, email traffic originating from hosts that run a particular operating system get no more than 1KB of your bandwidth, with no borrowing.

Conclusion: Traffic Shaping for Fun, and Perhaps Even Profit
This chapter has dealt with traffic-shaping techniques that can make your
traffic move faster, or at least make preferred traffic pass more efficiently
and according to your specifications. By now you should have at least a basic
understanding of traffic-shaping concepts and how they apply to the trafficshaping tool set you’ll be using on your systems.
I hope that the somewhat stylized (but functional) examples in this
chapter have given you a taste of what’s possible with traffic shaping and
that the material has inspired you to play with some of your own ideas of
how you can use the traffic-shaping tools in your networks. If you pay attention to your network traffic and the underlying needs it expresses (see
Chapters 9 and 10 for more on studying network traffic in detail), you can
use the traffic-shaping tools to improve the way your network serves its
users. With a bit of luck, your users will appreciate your efforts and you
may even enjoy the experience.

Traffic Shaping with Queues and Priorities   145

8

R e d u n d a n cy a n d R e s o u r c e
A v a i l ab i l i ty

High availability and uninterrupted service
have been both marketing buzzwords and
coveted goals for real-world IT professionals
and network administrators as long as most
of us can remember. To meet this perceived need and
solve a few related problems, CARP and pfsync were
added as two highly anticipated features in OpenBSD 3.5. With these tools,
OpenBSD and the other operating systems that adopted them came a long
way toward offering what other operating systems refer to as general purpose clustering functionality. The terminology used by OpenBSD and its
sister BSDs differs from what other products use, but as you will see in this
chapter, CARP, pfsync, and related tools offer high availability functionality equivalent to what a variety of proprietary systems tend to offer only as
costly optional extras.
This chapter covers how to use these tools as found in your base system
to manage resource availability—or, in other words, how to use them to
make sure resources and services in your care stay available even in adverse
conditions.

Redundancy and Failover: CARP and pfsync
The Common Address Redundancy Protocol (CARP) was developed as
a non-patent-encumbered alternative to the Virtual Router Redundancy
Protocol (VRRP), which was far along the track to becoming an IETFsanctioned standard, even though possible patent issues haven’t been
resolved.1 One of the main purposes of CARP is to ensure that the network will keep functioning as usual, even when a firewall or other service goes down due to errors or planned maintenance activities, such as
upgrades. Not content to just make a clone of the patent-encumbered protocol, the OpenBSD developers decided to go one better on several fronts.
CARP features authenticated redundancy—it’s address-family independent
and comes with state synchronization features. Complementing CARP,
the pfsync protocol is designed to handle synchronization of PF states
between redundant packet-filtering nodes or gateways. Both protocols are
intended to ensure redundancy for essential network features with automatic failover.
CARP is based on setting up a group of machines as one master and one
or more redundant backups, all equipped to handle a common IP address.
If the master goes down, one of the backups will inherit the IP address. The
handover from one CARP host to another may be authenticated, essentially
by setting a shared secret (in practice, much like a password).
In the case of PF firewalls, pfsync can be set up to handle the synchronization, and if the synchronization via pfsync has been properly set up,
active connections will be handed over without noticeable interruption.
In essence, pfsync is a type of virtual network interface specially designed
to synchronize state information between PF firewalls. Its interfaces are
assigned to physical interfaces with ifconfig.
Even if it’s technically possible to lump pfsync traffic together with
other traffic on a regular interface, it’s strongly recommended that you set
up pfsync on a separate network, or even VLAN. pfsync does no authentication on its synchronization partners, so the only way to guarantee correct
synchronization is to use dedicated interfaces for your pfsync traffic.

The Project Specification: A Redundant Pair of Gateways
To illustrate a useful failover setup with CARP and pfsync, we’ll examine a
network with one gateway to the world. Our goals for the reconfigured network are as follows:

The network should keep functioning much the same way it did before
we introduced redundancy.
We should have better availability without noticeable downtime.
The network should experience graceful failover with no interruption
of active connections.

## 1. VRRP is described in RFC 2281 and RFC 3768. The patents involved are held by Cisco,
IBM, and Nokia. See the RFCs for details.

## 148. Chapter 8

We’ll begin with the relatively simple network from Chapter 3, as shown
in Figure 8-1.

Our bridge,

Figure 8-1: Network with a single gateway

We replace the single gateway with a redundant pair of gateways that
share a private network for state-information updates over pfsync. The
result is shown in Figure 8-2.
192.0.2.18
ep0
carp0
192.0.2.19

192.168.12.3
ep1
carp1
192.168.12.1

pfsync0

10.0.12.16
ep2

Crossover
cable

pfsync0

10.0.12.17
ep2

192.0.2.17
ep0
carp0
192.0.2.19

192.168.12.2
ep1
carp1
192.168.12.1

Figure 8-2: Network with redundant gateways

Redundancy and Resource Availability   149

CARP addresses are virtual addresses, and unless you have console
access to all machines in your CARP group, you should almost always assign
an IP address to the physical interfaces. With a unique IP address for each
physical interface, you’ll be able to communicate with the host and be sure
of which machine you’re interacting with. Without IP addresses assigned to
physical interfaces, you could find yourself with a setup where the backup
gateways are unable to communicate (except with hosts in networks where
the physical interfaces have addresses assigned) until they become the master in the redundancy group and take over the virtual IP addresses.
It’s reasonable to assume that the IP address assigned to the physical
interface will belong in the same subnet as the virtual, shared IP address.
It’s also important to be aware that this is, in fact, not a requirement—it’s
even possible to configure CARP where the physical interface hasn’t been
assigned an address. If you don’t specify a specific physical interface for the
CARP interface, the kernel will try to assign the CARP address to a physical
interface that’s already configured with an address in the same subnet as
the CARP address. Even if it may not be required in simpler configurations,
it’s generally useful to make the interface selection explicit via the carpdev
option in the ifconfig command string that you use to set up the CARP
interface.
Wa r n i n g

If when you reconfigure your network, the default gateway address goes from fixed to
a specific interface and from host to a virtual address, it’s nearly impossible to avoid a
temporary loss of connectivity.

Setting Up CARP
Most CARP setup lies in cabling (according to the schematic for your
network), setting sysctl values, and issuing ifconfig commands. Also, on
some systems, you’ll need to make sure that your kernel is set up with the
required devices compiled in.
Checking Kernel Options
On OpenBSD, both the CARP and pfsync devices are in the default GENERIC
and GENERIC.MP kernel configurations. Unless you’re running a custom
kernel without these options, no kernel reconfiguration is necessary. If
you’re running FreeBSD, make sure that the kernel has the CARP and
pfsync devices compiled in because the default GENERIC kernel lacks
these options. (See the FreeBSD Handbook to learn how to compile and
install a custom kernel with these options.)
NetBSD should check that the kernel has pseudo-device CARP compiled in because NetBSD’s default GENERIC kernel configuration doesn’t
have it. (You’ll find the relevant line commented out in the GENERIC configuration file.) As of this writing, NetBSD doesn’t support pfsync due to
claimed protocol-numbering issues.

## 150. Chapter 8

Setting sysctl Values
On all CARP-capable systems, the basic functions are governed by a handful of sysctl variables. The main one is net.inet.carp.allow, and it’s enabled
by default. On a typical OpenBSD system, you’ll see:
$ sysctl net.inet.carp.allow
net.inet.carp.allow=1

This means that your system comes equipped for CARP.
If your kernel isn’t configured with a CARP device, this command
should produce something like the following on FreeBSD:
sysctl: unknown oid 'net.inet.carp.allow'

Or it could produce something like this on NetBSD:
sysctl: third level name 'carp' in 'net.inet.carp.allow' is invalid

Use this sysctl command to view all CARP-related variables:
$ sysctl net.inet.carp
net.inet.carp.allow=1
net.inet.carp.preempt=0
net.inet.carp.log=2

On FreeBSD, you’ll also encounter the read-only status variable net.inet.carp
.suppress_preempt, which indicates whether preemption is possible. On systems
with CARP code based on OpenBSD 4.2 or earlier, you’ll also see net.inet.carp
.arpbalance, which is used to enable CARP ARP balancing to offer some limited
load balancing for hosts on a local network.
To enable the graceful failover between the gateways in our setup, we
need to set the net.inet.carp.preempt variable so that on hosts with more
than one network interface (like our gateways), all CARP interfaces will
move between master and backup status concurrently. This setting must be
identical on all hosts in the CARP group, and it should be repeated on all
hosts during setup.
$ sudo sysctl net.inet.carp.preempt=1

The net.inet.carp.log variable sets the debug level for CARP logging
between 0 and 7. The default of 2 means only CARP state changes are logged.
Setting Up Network Interfaces with ifconfig
Notice in the network diagram shown in Figure 8-2 that the local network uses addresses in the 192.168.12.0 network, while the Internet-facing

Redundancy and Resource Availability   151

interface is in the 192.0.2.0 network. With these address ranges and the
CARP interface’s default behavior in mind, the commands for setting up
the virtual interfaces are actually quite straightforward.
In addition to the usual network parameters, CARP interfaces require
one additional parameter: the virtual host ID (vhid), which uniquely identifies the interfaces that will share the virtual IP address.
Wa r n i n g

The vhid is an 8-bit value that must be set uniquely within the network’s broadcast
domain. Setting the vhid to the wrong value can lead to network problems that can
be hard to debug, and there’s even anecdotal evidence that ID collisions with otherwise unrelated systems can occur and cause disruption on redundancy and load-balancing systems based on VRRP, which uses a virtual node identification scheme
similar to CARP’s.
Run these commands on the machine that will be the initial master for
the group:
$ sudo ifconfig carp0 192.0.2.19 vhid 1
$ sudo ifconfig carp1 192.168.1.1 vhid 2

We don’t need to explicitly set the physical interface because the carp0
and carp1 virtual interfaces will bind themselves to the physical interfaces
that are already configured with addresses in the same subnets as the
assigned CARP address.

On systems that offer the carpdev option to ifconfig, it’s recommended to use the carpdev
option for all CARP interface setups, even if it isn’t strictly required. The carpdev option
becomes indispensable in cases where the choice of physical network device for the
CARP interface isn’t obvious from the existing network configuration, and adding a
carpdev interface string to the ifconfig commands can make the difference between
a nonfunctional setup and a working one. This can be particularly useful in some
nonintuitive configurations and where the number of free IP addresses in the relevant
network is severely limited. The FreeBSD port of CARP offers the carpdev option starting with FreeBSD 10.0.
Use ifconfig to make sure that each CARP interface is properly configured and pay particular attention to the carp: line, which indicates MASTER
status, as shown here:
$ ifconfig carp0
lladdr 00:00:5e:00:01:01
carp: MASTER carpdev ep0 vhid 1 advbase 1 advskew 0
inet6 fe80::200:5eff:fe00:101%carp0 prefixlen 64 scopeid 0x5

## 152. Chapter 8

The setup is almost identical on the backup except that you add the
advskew parameter, which indicates how much less preferred it is for the speci-

fied machine to take over than the current master.
$ sudo ifconfig carp0 192.0.2.19 vhid 1 advskew 100
$ sudo ifconfig carp1 192.168.1.1 vhid 2 advskew 100

The advskew parameter and its companion value, advbase, are used to calculate the interval between the current host’s announcements of its master
status once it’s taken over. The default value for advbase is 1, and the default
for advskew is 0. In the preceding example, the master would announce every
second (1 + 0/256), while the backup would wait for 1 + 100/256 seconds.
With net.inet.carp.preempt=1 on all hosts in the failover group, when the
master stops announcing or announces that it isn’t available, the backups
take over, and the new master starts announcing at its configured rate.
Smaller advskew values mean shorter announcement intervals and a higher
likelihood that the host becomes the new master. If more hosts have the
same advskew, the one that’s already master will keep its master status.
On OpenBSD 4.1 and higher, one more factor in the equation determines which host takes over CARP master duty. The demotion counter is a
value each CARP host announces for its interface group as a measure of
readiness for its CARP interfaces. When the demotion counter value is 0,
the host is in complete readiness; higher values indicate measures of degradation. You can set the demotion counter from the command line using
ifconfig -g, but the value is usually set by the system itself, with higher values typically during the boot process. All other things being equal, the host
with the lowest demotion counter will win the contest to take over as the
CARP master.

As of this writing, FreeBSD CARP versions earlier than FreeBSD 10 don’t support
setting the demotion counter.
On the backup, use ifconfig once again to check that each CARP interface is properly configured:
$ ifconfig carp0
lladdr 00:00:5e:00:01:01
carp: BACKUP carpdev ep0 vhid 1 advbase 1 advskew 100
inet6 fe80::200:5eff:fe00:101%carp0 prefixlen 64 scopeid 0x5

Redundancy and Resource Availability   153

The output here is only slightly different from what you’ve just seen on
the master. Notice that the carp: line indicates BACKUP status along with the
advbase and advskew parameters.
For actual production use, you should add a measure of security against
unauthorized CARP activity by configuring the members of the CARP
group with a shared, secret passphrase, such as the following:2
$ sudo ifconfig carp0 pass mekmitasdigoat 192.0.2.19 vhid 1
$ sudo ifconfig carp1 pass mekmitasdigoat 192.168.1.1 vhid 2

As with any other password, the passphrase will become a required ingredient in all
CARP traffic in your setup. Be sure to configure all CARP interfaces in a failover
group with the same passphrase (or none).
Once you’ve figured out the appropriate settings, preserve them
through future system reboots by putting them in the proper files in /etc:

On OpenBSD, put the proper ifconfig parameters into hostname.carp0
and hostname.carp1.
On FreeBSD and NetBSD, put the relevant lines in your rc.conf file as
contents of the ifconfig_carp0= and ifconfig_carp1= variables.

Keeping States Synchronized: Adding pfsync
As the final piece of configuration, set up state-table synchronization
between the hosts in your redundancy group to prevent traffic disruption
during failover. This feat is accomplished through a set of pfsync interfaces.
(As noted earlier, as of this writing, NetBSD doesn’t support pfsync.)
Configuring pfsync interfaces requires planning and a few ifconfig
commands. You can set up pfsync on any configured network interface, but
it’s best to set up a separate network for the synchronization. The sample
configuration in Figure 8-2 shows a tiny network set aside for the purpose.
A crossover cable connects the two Ethernet interfaces, but in configurations with more than two hosts in the failover group, you may want a setup
with a separate switch, hub, or VLAN. The interfaces to be used for the synchronization have been assigned the IP addresses 10.0.12.16 and 10.0.12.17,
respectively.
With the basic TCP/IP configuration in place, the complete pfsync
setup for each synchronization partner interface is
$ sudo ifconfig pfsync0 syncdev ep2

2. This particular passphrase has a very specific meaning. A Web search will reveal its significance and why it’s de rigeur for modern networking documentation. The definitive answer can
be found via the openbsd-misc mailing list archives.

## 154. Chapter 8

The pfsync protocol itself offers little in the way of security features:
It has no authentication mechanism and, by default, communicates via IP
multicast traffic. However, in cases where a physically separate network isn’t
feasible, you can tighten up your pfsync security by setting up pfsync to synchronize only with a specified syncpeer:
$ sudo ifconfig pfsync0 syncpeer 10.0.12.16 syncdev ep2

This produces a configured interface that shows up in ifconfig output
pfsync0: flags=41<UP,RUNNING> mtu 1500
pfsync: syncdev: ep2 syncpeer: 10.0.12.16 maxupd: 128 defer: off
groups: carp pfsync

Another option is to set up an IPsec tunnel and use that to protect the
sync traffic. In this case, the ifconfig command is
$ sudo ifconfig pfsync0 syncpeer 10.0.12.16 syncdev enc0

This means that the syncdev device becomes the enc0 encapsulating
interface instead of the physical interface.

If possible, set up synchronization across a physically separate, dedicated network or a
separate VLAN because any lost pfsync updates could lead to less than clean failover.
One very useful way to check that your PF state synchronization is
running properly is to watch the state table on your synchronized hosts
using systat states on each machine. The command gives you a live display of states, showing updates happening in bulk on the sync targets.
Between the synchronizations, states should display identically on all hosts.
(Traffic counters—such as the number of packets and bytes passed—are the
exception; they display updates only on the host that handles the actual
connection.)
This takes us to the end of the basic network configuration for CARPbased failover. In the next section, we’ll discuss what to keep in mind when
writing rule sets for redundant configurations.

Putting Together a Rule Set
After all the contortions we’ve been through in order to configure basic
networking, you may be wondering what it will take to migrate the rules
you use in your current pf.conf to the new setup. Fortunately, not much.
The main change we’ve introduced is essentially invisible to the rest of the
world, and a well-designed rule set for a single gateway configuration will
generally work well for a redundant setup, too.

Redundancy and Resource Availability   155

That said, we’ve introduced two additional protocols (CARP and
pfsync), and you’ll probably need to make some relatively minor changes
to your rule set in order for the failover to work properly. Basically, you
need to pass the CARP and pfsync traffic to the appropriate interfaces.
The simplest way to handle the CARP traffic is to introduce a macro definition for your carpdevs that includes all physical interfaces that will handle
CARP traffic. You’ll also introduce an accompanying pass rule, like the following one, in order to pass CARP traffic on the appropriate interfaces:
pass on $carpdevs proto carp

Similarly, for pfsync traffic, you can introduce a macro definition for
your syncdev and an accompanying pass rule:
pass on $syncdev proto pfsync

Skipping the pfsync interfaces entirely for filtering is cheaper performance-wise than filtering and passing. To take the pfsync device out of the
filtering equation altogether, use this rule:
set skip on $syncdev

You should also consider the roles of the virtual CARP interface and its
address versus the physical interface. As far as PF is concerned, all traffic
will pass through the physical interfaces, but the traffic may have the CARP
interface’s IP addresses as source or destination addresses.
You may find that you have rules in your configuration that you don’t
want to bother to synchronize in case of a failover, such as connections to
services that run on the gateway itself. One prime example is the typical
rule to allow SSH in for the administrator:
pass in on $int_if from $ssh_allowed to self

For rules like these, you could use the state option no-sync to prevent
synchronizing state changes for connections that really aren’t relevant once
failover has occurred:
pass in on $int_if from $ssh_allowed to self keep state (no-sync)

With this configuration, you’ll be able to schedule operating system
upgrades and formerly downtime-producing activities on members of your
CARPed group of systems at times when they’re most convenient, with no
noticeable downtime for the users of your services.

## 156. Chapter 8

if state d, the Inte rface S tate Da e mon
In properly CARPed setups, basic networking functionality is well provided for,
but your setup may include elements that need special attention when the network configuration changes on a host. For example, some services might need
to be started or stopped when a specific interface goes down or restarts, or
you may want to run specific commands or scripts in response to interface state
changes. If this sounds familiar, ifstated is for you.
The ifstated tool was introduced in OpenBSD 3.5 to trigger actions
based on changes in the state of network interfaces. You’ll find it in the base
system on OpenBSD and via the ports system as net/ifstated on FreeBSD. On
OpenBSD, the file /etc/ifstated.conf (or /usr/local/etc/ifstated.conf if you installed
the port on FreeBSD) contains an almost-ready-to-run configuration with a few
pointers on how to set up ifstated for a CARPed environment.
The main controlling objects are interfaces and their states—for ­example,
carp0.link.up is the state where the carp0 interface has become ­master—and
you perform actions in response to state changes.
The states and actions to perform whenever the state of an interface
changes are specified in a straightforward scripting language with basic features like variables, macros, and simple logical conditionals. (See man ifstated
and man ifstated.conf as well as the default ifstated.conf sample file supplied
in your base system install for more on this topic and on implementing CARPbased clustering features in your environment.)

CARP for Load Balancing
Redundancy by failover is nice, but sometimes it’s less attractive to have
hardware sitting around in case of failure and better to create a configuration that spreads the network load over several hosts.
In addition to ARP balancing (which works by calculating hashes based on
the source MAC address on incoming connections), CARP in OpenBSD 4.3
and higher supports several varieties of IP-based load balancing, with traffic
allocated based on hashes calculated from the connections’ source and destination IP addresses. Because ARP balancing is based on the source MAC
address, it’ll work only for hosts in the directly connected network segment.
On the other hand, the IP-based methods are appropriate for load-balancing
connections to and from the Internet at large.
The choice of method for your application will depend on the specifications of the rest of the network equipment you need to work with. The basic
ip balancing mode uses a multicast MAC address to have the directly connected switch forward traffic to all hosts in the load-balancing cluster.

Redundancy and Resource Availability   157

Unfortunately, the combination of a unicast IP address and a multicast
MAC address isn’t supported by some systems. In those cases, you may need
to configure your load balancing in ip-unicast mode, which uses a unicast
MAC address, and configure your switch to forward to the appropriate
hosts. Or you may need to configure your load balancing in ip-stealth mode,
which doesn’t use the multicast MAC address at all. As usual, the devil is in
the details, and the answers are found in man pages and other documentation, most likely with a bit of experimentation thrown in.

Traditionally, relayd has been used to do intelligent load balancing as the frontend
for servers that offer services to the rest of the world. In OpenBSD 4.7, relayd acquired
the ability to track available uplinks and alter the system’s routing tables based on link
health, with the functionality wrapped in a bundle with the router keyword. For setups
with several possible uplinks or various routing tables, you can set up relayd to choose
your uplink or, with a little help from the sysctl variables net.inet.ip.multipath
and net.inet6.ip6.multipath, perform load balancing across available routes and
uplinks. The specifics will vary with your networking environment. The relayd.conf
man page contains a complete example to get you started.

CARP in Load-Balancing Mode
In load-balancing mode, the CARP concept is extended by letting each
CARP interface be a member of multiple failover groups and as many
load-balancing groups as there are physical hosts that will share the virtual
address. In contrast with the failover case, where there can be only one
master, each node in a load-balancing cluster must be the master of its own
group so that it can receive traffic. The choice of group—and by extension,
physical host—that ends up handling a given connection is determined
by CARP via a hash value calculation. This calculation is based on the
connection’s source MAC address in the ARP-balancing case and on the
source and destination IP address in the IP-balancing case as well as actual
availability. The downside to this scheme is that each group consumes one
virtual host ID, so you’ll run out of these IDs quite a bit more quickly in a
load-balancing configuration than when using failover only. In fact, there’s
a hard upper limit to the number of CARP-based load-balancing clusters of
32 virtual host IDs.
The advskew parameter plays a similar role in load-balancing configurations as in the failover ones, but the ifconfig (and hostname.carpN) syntax
for CARP load balancing is slightly different from that of the failover case.
Setting Up CARP Load Balancing
Changing the CARP failover group built over the previous sections to a
load-balancing cluster is as simple as editing the configuration files and
reloading. In the following example, we choose an IP load-balancing
scheme. If you choose a different scheme, the configuration itself differs
only in the keyword for mode selection.
158   Chapter 8

On the first host, we change /etc/hostname.carp0 to
pass mekmitasdigoat 192.0.2.19 balancing ip carpnodes 5:100,6:0

This says that on this host, the carp0 interface is a member of the group
with vhid 5 (with an advskew of 100) as well as the interface with vhid 6, where
it’s the prime candidate for becoming initial master (with an advskew set to 0).
Next, we change /etc/hostname.carp1 to this:
pass mekmitasdigoat 192.168.12.1 balancing ip carpnodes 3:100,4:0

For carp1, the memberships are vhids 3 and 4, with advskew values of 100
and 0, respectively.
For the other host, the advskew values are reversed, but the configuration is otherwise predictably similar. Here, /etc/hostname.carp0 reads:
pass mekmitasdigoat 192.0.2.19 balancing ip carpnodes 5:0,6:100

This means that the carp0 interface is a member of vhid 5 with advskew 0
and a member of vhid 6 with advskew 100. Complementing this is the /etc/
hostname.carp1 file that reads:
pass mekmitasdigoat 192.168.12.1 balancing ip carpnodes 3:0,4:100

Again, carp1 is a member of vhid 3 and 4, with advskew 0 in the first and
100 in the other.
The ifconfig output for the carp interface group on the first host looks
$ ifconfig carp
lladdr 01:00:5e:00:01:05
carp: carpdev vr0 advbase 1 balancing ip
state MASTER vhid 5 advskew 0
state BACKUP vhid 6 advskew 100
inet6 fe80::200:24ff:fecb:1c10%carp0 prefixlen 64 scopeid 0x7
carp1: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
lladdr 01:00:5e:00:01:03
carp: carpdev vr1 advbase 1 balancing ip
state MASTER vhid 3 advskew 0
state BACKUP vhid 4 advskew 100
inet 192.168.12.1 netmask 0xffffff00 broadcast 192.168.12.255
inet6 fe80::200:24ff:fecb:1c10%carp1 prefixlen 64 scopeid 0x8
pfsync0: flags=41<UP,RUNNING> mtu 1500
pfsync: syncdev: vr2 syncpeer: 10.0.12.17 maxupd: 128 defer: off
groups: carp pfsync
Redundancy and Resource Availability   159

The other host has this ifconfig output:
$ ifconfig carp
lladdr 01:00:5e:00:01:05
carp: carpdev vr0 advbase 1 balancing ip
state BACKUP vhid 5 advskew 100
state MASTER vhid 6 advskew 0
inet6 fe80::200:24ff:fecb:1c18%carp0 prefixlen 64 scopeid 0x7
carp1: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
lladdr 01:00:5e:00:01:03
carp: carpdev vr1 advbase 1 balancing ip
state BACKUP vhid 3 advskew 100
state MASTER vhid 4 advskew 0
inet 192.168.12.1 netmask 0xffffff00 broadcast 192.168.12.255
inet6 fe80::200:24ff:fecb:1c18%carp1 prefixlen 64 scopeid 0x8
pfsync0: flags=41<UP,RUNNING> mtu 1500
pfsync: syncdev: vr2 syncpeer: 10.0.12.16 maxupd: 128 defer: off
groups: carp pfsync

If we had three nodes in our load-balancing scheme, each carp interface would need to be a member of an additional group, for a total of three
groups. In short, for each physical host you introduce in the load-balancing
group, each carp interface becomes the member of an additional group.
Once you’ve set up the load-balancing cluster, check the flow of
connections by running systat states on each of the hosts in your load-balancing cluster for a few minutes to make sure that the system works as
expected and to see that all the effort you put in has been worth it.

## 160. Chapter 8

L o gg i n g , M o n i t o r i n g ,
a n d S tat i st i cs

Exercising control over a network—
whether for your home networking needs
or in a professional context—is likely to be
a main objective for anyone who reads this
book. One necessary element of keeping control is
having access to all relevant information about what
happens in your network. Fortunately for us, PF—like
most components of Unix-like systems—is able to generate log data for network activity.
PF offers a wealth of options for setting the level of logging detail,
processing log files, and extracting specific kinds of data. You can already
do a lot with the tools that are in your base system, and several other tools
are available via your package system to collect, study, and view log data
in a number of useful ways. In this chapter, we take a closer look at PF
logs in general and some of the tools you can use to extract and present
information.

PF Logs: The Basics
The information that PF logs and the level of logging detail are up to you,
as determined by your rule set. Basic logging is simple: For each rule that
you want to log data for, add the log keyword. When you load the rule set
with log added to one or more rules, any packet that starts a connection
matching the logging rule (blocked, passed, or matched) is copied to a
pflog device. The packet is logged as soon as it’s seen by PF and at the same time
that the logging rule is evaluated.

In complicated rule sets, a packet may go through several transformations due to
match or pass rules, and criteria that matched a packet when it entered the host
might not match after a transformation.
PF will also store certain additional data, such as the timestamp, interface, original source and destination IP addresses, whether the packet was
blocked or passed, and the associated rule number from the loaded rule set.
PF log data is collected by the pflogd logging daemon, which starts by
default when PF is enabled at system startup. The default location for storing
the log data is /var/log/pflog. The log is written in a binary format, usually
called packet capture format (pcap), that’s intended to be read and processed
by tcpdump. We’ll discuss additional tools to extract and display information
from your log file later. The log file format is a well-documented and widely
supported binary format.
To get started, here’s a basic log example. Start with the rules you want
to log and add the log keyword:
block log
pass log quick proto { tcp, udp } to port ssh

Reload the rule set, and you should see the timestamp on your /var/log/
pflog file change as the file starts growing. To see what’s being stored there,
use tcpdump with the -r option to read the file.
If logging has been going on for a while, entering the following on a
command line can produce large amounts of output:
$ sudo tcpdump -n -ttt -r /var/log/pflog

For example, the following are just the first lines from a file several
screens long, with almost all lines long enough to wrap:
$ sudo tcpdump -n -ttt -r /var/log/pflog
tcpdump: WARNING: snaplen raised from 116 to 160
Sep 13 13:00:30.556038 rule 10/(match) pass in on epic0: 194.54.107.19.34834 >
194.54.103.66.113: S 3097635127:3097635127(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
Sep 13 13:00:30.556063 rule 10/(match) pass out on fxp0: 194.54.107.19.34834 >
194.54.103.66.113: S 3097635127:3097635127(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale

## 162. Chapter 9

Sep 13 13:01:07.796096 rule 10/(match) pass in on epic0: 194.54.107.19.29572 >
194.54.103.66.113: S 2345499144:2345499144(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
Sep 13 13:01:07.796120 rule 10/(match) pass out on fxp0: 194.54.107.19.29572 >
194.54.103.66.113: S 2345499144:2345499144(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
Sep 13 13:01:15.096643 rule 10/(match) pass in on epic0: 194.54.107.19.29774 >
194.54.103.65.53: 49442 [1au][|domain]
Sep 13 13:01:15.607619 rule 12/(match) pass in on epic0: 194.54.107.19.29774 >
194.54.107.18.53: 34932 [1au][|domain]

The tcpdump program is very flexible, especially when it comes to output,
and it offers a number of display choices. The format in this example follows from the options we fed to tcpdump. The program almost always displays
the date and time the packet arrived (the -ttt option specifies this long
format). Next, tcpdump lists the rule number in the loaded rule set, the interface on which the packet appeared, the source and target address and ports
(the -n option tells tcpdump to display IP addresses, not hostnames), and the
various packet properties.

The rule numbers in your log files refer to the loaded, in-memory rule set. Your
rule set goes through some automatic steps during the loading process, such as macro
expansion and optimizations, which make it likely that the rule number as stored in
the logs will not quite match what you’d find by counting from the top of your pf.conf
file. If it isn’t immediately obvious to you which rule matched, use pfctl -vvs rules
and study the output.
In our tcpdump output example, we see that the tenth rule (rule 10) in
the loaded rule set seems to be a catchall that matches both IDENT requests
and domain name lookups. This is the kind of output you’ll find invaluable when debugging, and it’s essential to have this kind of data available in
order to stay on top of your network. With a little effort and careful reading
of the tcpdump man pages, you should be able to extract useful information
from your log data.
For a live display of the traffic you log, use tcpdump to read log information
directly from the log device. To do so, use the -i option to specify which
interface you want tcpdump to read from, as follows. (The -l option, which
enables line buffering on the output, is useful if you want to look at what
you’re capturing.)

$ sudo tcpdump -lnettti pflog0
Apr 29 22:07:36.097434 rule 16/(match) pass in on xl0: 85.19.150.98.53 > 213.187.179.198.41101:
63267*- 1/0/2 (68)
Apr 29 22:07:36.097760 rule def/(match) pass out on em0: 213.187.179.198.22 >
192.168.103.44.30827: P 1825500807:1825500883(76) ack 884130750 win 17520 [tos 0x10]
Apr 29 22:07:36.098386 rule def/(match) pass in on em0: 192.168.103.44.30827 >
213.187.179.198.22: . ack 76 win 16308 (DF) [tos 0x10]
Apr 29 22:07:36.099544 rule 442/(match) pass in on xl0: 93.57.15.161.4487 > 213.187.179.198.80:
P ack 3570451894 win 65535 <nop,nop,timestamp 4170023961 0>

Logging, Monitoring, and Statistics    163

Apr 29 22:07:36.108037 rule 25/(match) pass out on xl0: 213.187.179.198.25 >
213.236.166.45.65106: P 2038177705:2038177719(14) ack 149019161 win 17424 (DF)
Apr 29 22:07:36.108240 rule def/(match) pass out on em0: 213.187.179.198.22 >
192.168.103.44.30827: P 76:232(156) ack 1 win 17520 [tos 0x10]

This sequence begins with a domain name lookup answer, followed
by two packets from an open SSH connection, which tells us that the site’s
administrator probably enabled log (all) on the matching rules (see
“Logging All Packets: log (all)” on page 165). The fourth packet belongs
to a website connection, the fifth is part of an outgoing SMTP connection,
and finally there’s another SSH packet. If you were to leave this command
running, the displayed lines would eventually scroll off the top of your
screen, but you could redirect the data to a file or to a separate program
for further processing.

Sometimes you’ll be interested mainly in traffic between specific hosts or in traffic
matching specific criteria. For these cases, tcpdump’s filtering features can be useful.
See man tcpdump for details.

Logging the Packet's Path Through Your Rule Set: log (matches)
Early versions of the PF logging code didn’t feature an easy way to track
all rules that a packet would match during rule-set traversal. This omission became more evident than before when match rules were introduced
in OpenBSD 4.6 and PF users were offered a more convenient and slightly
easier way to subject packets and connections to transformations, such as
address rewriting. match rules allow you to perform actions on a packet or
connection independently of the eventual pass or block decision. The specified
actions—such as nat-to, rdr-to, and a few others—are performed immediately. This can lead to situations in which a packet has been transformed by
a match rule and it no longer matches criteria in a filtering rule that appears
later in the rule set that it otherwise would have matched if the transformation hadn’t already occurred. One fairly basic example is a match rule that
applies nat-to on the external interface, placed before any pass rules in the
rule set. Once the nat-to action has been applied, any filtering criteria that
would have matched the packet’s original source address will no longer
match the packet.
This greater versatility made some rule sets harder to debug (typically
those with several match rules that perform transformations), and it became
clear that a new logging option was needed.
The PF developers had been eyeing the logging code for a rewrite
for some time, and by the time the logging system was rewritten for the
OpenBSD 4.9 release, the restructured code made it easy to introduce the
log option matches to help debug such rule sets and to help track a packet’s
path through rule sets where several sets of match or pass rules could transform the packet.
Adding log (matches) to a rule forces the logging of all matched rules
once a packet matches a rule containing a log (matches) clause. Once such a
164   Chapter 9

match occurs, all subsequent rules will also be logged. As a result, you can
use targeted log (matches) statements to trace a packet’s path through your
loaded rule set, making it much easier to untangle complicated rule sets.
For example, consider this simple rule set with NAT. The log (matches)
rule is as follows:
match in log (matches) on $int_if from $testhost tag localnet

Our test host is a workstation in the local network with the IP address
192.168.103.44. When the test host looks up a website somewhere on the
Internet, the logged information looks like this:
Apr 29 21:08:24.386474 rule 3/(match) match in on em0: 192.168.103.44.14054 > 81.93.163.115.80:
S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale 3,nop,nop,timestamp
735353043[|tcp]> (DF) u
Apr 29 21:08:24.386487 rule 11/(match) block in on em0: 192.168.103.44.14054 >
81.93.163.115.80: S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
3,nop,nop,timestamp 735353043[|tcp]> (DF) v
Apr 29 21:08:24.386497 rule 17/(match) pass in on em0: 192.168.103.44.14054 > 81.93.163.115.80:
S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale 3,nop,nop,timestamp
735353043[|tcp]> (DF) w
Apr 29 21:08:24.386513 rule 17/(match) pass in on em0: 192.168.103.44.14054 > 81.93.163.115.80:
S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale 3,nop,nop,timestamp
735353043[|tcp]> (DF)
Apr 29 21:08:24.386553 rule 5/(match) match out on xl0: 213.187.179.198.14054 >
81.93.163.115.80: S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
3,nop,nop,timestamp 735353043[|tcp]> (DF) x
Apr 29 21:08:24.386568 rule 16/(match) pass out on xl0: 213.187.179.198.14054 >
81.93.163.115.80: S 1381487359:1381487359(0) win 16384 <mss 1460,nop,nop,sackOK,nop,wscale
3,nop,nop,timestamp 735353043[|tcp]> (DF) y

The initial packet first matches rule 3, the match log (matches) rule
quoted above the log fragment . The next match is rule 11 in our loaded
rule set , the initial block all, but the packet also matches rule 17, which
lets it pass in on em0 . The next matching rule 5 at  is apparently a match
rule that applies nat-to (note the changed source address). Finally, the
packet passes out on xl0 thanks to rule 16 , a matching pass rule.
This example really has only one transformation (the nat-to), but the log
(matches) feature allows us to follow the connection’s initial packet through all
matching rules in the rule set, including the source address substitution.

Logging All Packets: log (all)
For most debugging and lightweight monitoring purposes, logging the first
packet in a connection provides enough information. However, sometimes
you may want to log all packets that match certain rules. To do so, use the
(all) logging option in the rules you want to monitor. After making this
change to our minimal rule set, we have the following:
block log (all)
pass log (all) quick proto tcp to port ssh keep state
Logging, Monitoring, and Statistics    165

This option makes the logs quite a bit more verbose. To illustrate just how
much more data log (all) generates, we’ll use the following rule set fragment,
which passes domain name lookups and network time synchronizations:
pass log (all) inet proto udp to port $udp_services

With these rules in place, here’s an example of what happens when a
Russian name server sends a domain name request to a server in our network:
$ sudo tcpdump -lnttti pflog0 port domain
tcpdump: WARNING: snaplen raised from 116 to 160
tcpdump: listening on pflog0, link-type PFLOG
Sep 30 14:27:41.260190 212.5.66.14.53 > 194.54.107.19.53:[|domain]
Sep 30 14:27:41.260253 212.5.66.14.53 > 194.54.107.19.53:[|domain]
Sep 30 14:27:41.260267 212.5.66.14.53 > 194.54.107.19.53:[|domain]
Sep 30 14:27:41.260638 194.54.107.19.53 > 212.5.66.14.53:[|domain]
Sep 30 14:27:41.260798 194.54.107.19.53 > 212.5.66.14.53:[|domain]
Sep 30 14:27:41.260923 194.54.107.19.53 > 212.5.66.14.53:[|domain]

We now have six entries instead of just one.
Even with all but port domain filtered out by tcpdump, adding log (all) to
one or more rules considerably increases the amount of data in your logs. If
you need to log all traffic but your gateway’s storage capacity is limited, you
may find yourself shopping for additional storage, and the added I/O activity may in fact have a negative impact on performance. Also, recording and
storing traffic logs with this level of detail is likely to have legal implications.

Log Re sponsibly !
Creating logs of any kind could have surprising consequences, including some
legal implications. Once you start storing log data generated by your network
traffic, you’re creating a store of information about your users. There may be
good technical and business reasons to store logs for extended periods, but
logging just enough data and storing it for just the right amount of time can be
a fine art.
You probably have some idea of the practical issues related to generating log data, such as arranging for sufficient storage to retain enough log data
long enough to be useful. The legal implications will vary according to your
location. Some countries and territories have specific requirements for handling
log data, along with restrictions on how that data may be used and how long
logs can be retained. Others require service providers to retain traffic logs for
a specific period of time, in some cases with a requirement to deliver any such
data to law enforcement upon request. Make sure you understand the legal
issues before you build a logging infrastructure.

## 166. Chapter 9

Logging to Several pflog Interfaces
Versions of PF newer than OpenBSD 4.1 make it possible to direct your log
data to more than one pflog interface. In OpenBSD 4.1, the pflog interface
became a cloneable device, meaning that you can use ifconfig commands to
create several pflog interfaces, in addition to the default pflog0. This makes
it possible to record the log data for different parts of your rule set to separate pflog interfaces, and it makes it easier to process the resulting data
separately if necessary.
Moving from the default single pflog0 interface to several pflog interfaces requires some changes to your setup that are subtle but effective. To
log to several interfaces, make sure that all the log interfaces your rule set
uses are created. You don’t need to create the devices before the rule set is
loaded; if your rule set logs to a nonexistent interface, the log data is simply
discarded.
When tuning your setup to use several pflog interfaces, you’ll most likely
add the required interfaces from the command line, like so:
$ sudo ifconfig create pflog1

Specify the log device when you add the log keyword to your rule set,
as follows:
pass log (to pflog1) proto tcp to $emailserver port $email
pass log (to pflog1) proto tcp from $emailserver to port smtp

For a more permanent configuration on OpenBSD, create a hostname.
pflog1 file containing only up and similar hostname.pflogN files for any additional logging interfaces.
On FreeBSD, the configuration of the cloned pflog interfaces belongs
in your rc.conf file in the following form:
ifconfig_pflog1="up"

As of this writing, cloning pflog interfaces on NetBSD isn’t an option.
As you saw in Chapter 6, directing log information for different parts of
your rule set to separate interfaces makes it possible to feed different parts
of the log data PF produces to separate applications. This makes it easier
to have programs like spamlogd process only the relevant information, while
you feed other parts of your PF log data to other log-processing programs.

Logging to syslog, Local or Remote
One way to avoid storing PF log data on the gateway itself is to instruct
your gateway to log to another machine. If you already have a centralized
logging infrastructure in place, this is a fairly logical thing to do, even if
PF’s ordinary logging mechanisms weren’t really designed with traditional
syslog-style logging in mind.

Logging, Monitoring, and Statistics    167

As any old BSD hand will tell you, the traditional syslog system log
facility is a bit naive about managing the data it receives over UDP from
other hosts, with denial-of-service attacks involving full disks one frequently
mentioned danger. There’s also the ever-present risk that log information
will be lost under high load on either individual systems or the network.
Therefore, consider setting up remote logging only if all hosts involved communicate over a well-secured and properly dimensioned network. On most
BSDs, syslogd isn’t set up by default to accept log data from other hosts. (See
the syslogd man page for information about how to enable listening for log
data from remote hosts if you plan to use remote syslog logging.)
If you’d still like to do your PF logging via syslog, the following is a
short recipe for how to accomplish this. In ordinary PF setups, pflogd copies
the log data to the log file. When you want to store the log data on a remote
system, you should disable pflog’s data accumulation by changing daemon’s
startup options in rc.conf.local (on OpenBSD), like so:
pflogd_flags="NO"

On FreeBSD and NetBSD, change the pflog_flats= setting line in rc.conf.
Then kill the pflogd process. Next, make sure that the log data, now no
longer collected by pflogd, is transmitted in a meaningful way to your logprocessing system instead. This step has two parts: First, set up your system
logger to transmit data to the log-processing system, and then use tcpdump
with logger to convert the data and inject it into the syslog system.
To set up syslogd to process the data, choose your log facility, log level,
and action and put the resulting line in /etc/syslog.conf. These concepts are
very well explained in man syslog.conf, which is required reading if you want
to understand system logs. The action part is usually a file in a local filesystem. For example, if you’ve already set up the system logger at loghost
.example.com to receive your data, choose log facility local2 with log level
info and enter this line:
local2.info

@loghost.example.com

Once you’ve made this change, restart syslogd to make it read the new
settings.
Next, set tcpdump to convert the log data from the pflog device and feed
it to logger, which will then send it to the system logger. Here, we reuse the
tcpdump command from the basic examples earlier in this chapter, with some
useful additions:
$ sudo nohup tcpdump -lnettti pflog0 | logger -t pf -p local2.info &

The nohup command makes sure the process keeps running even if it
doesn’t have a controlling terminal or it’s put in the background (as we do
here with the trailing &). The -l option to the tcpdump command specifies
line-buffered output, which is useful for redirecting to other programs.

## 168. Chapter 9

The logger option adds the tag pf to identify the PF data in the stream and
specifies log priority with the -p option as local2.info. The result is logged
to the file you specify on the logging host, with entries that will look something like this:
pf: Sep 21 14:05:11.492590 rule 93/(match) pass in on ath0:
10.168.103.11.15842 > 82.117.50.17.80: [|tcp] (DF)
pf: Sep 21 14:05:11.492648 rule 93/(match) pass out on xl0:
194.54.107.19.15842 > 82.117.50.17.80: [|tcp] (DF)
pf: Sep 21 14:05:11.506289 rule 93/(match) pass in on ath0:
10.168.103.11.27984 > 82.117.50.17.80: [|tcp] (DF)
pf: Sep 21 14:05:11.506330 rule 93/(match) pass out on xl0:
194.54.107.19.27984 > 82.117.50.17.80: [|tcp] (DF)
pf: Sep 21 14:05:11.573561 rule 136/(match) pass in on ath0:
10.168.103.11.6430 > 10.168.103.1.53:[|domain]
pf: Sep 21 14:05:11.574276 rule 136/(match) pass out on xl0:
194.54.107.19.26281 > 209.62.178.21.53:[|domain]

This log fragment shows mainly Web-browsing activities from a client in
a NATed local network, as seen from the gateway’s perspective, with accompanying domain name lookups.

Tracking Statistics for Each Rule with Labels
The sequential information you get from retrieving log data basically tracks
packet movements over time. In other contexts, the sequence or history of
connections is less important than aggregates, such as the number of packets or bytes that have matched a rule since the counters were last cleared.
At the end of Chapter 2, you saw how to use pfctl -s info to view the
global aggregate counters, along with other data. For a more detailed breakdown of the data, track traffic totals on a per-rule basis with a slightly different form of pfctl command, such as pfctl -vs rules, to display statistics
along with the rule, as shown here:
$ pfctl -vs rules
pass inet proto tcp from any to 192.0.2.225 port = smtp flags S/SA keep state label "mail-in"
[ Evaluations: 1664158
Packets: 1601986
Bytes: 763762591
[ Inserted: uid 0 pid 24490 ]
pass inet proto tcp from 192.0.2.225 to any port = smtp flags S/SA keep state label "mail-out"
[ Evaluations: 2814933
Packets: 2711211
Bytes: 492510664
[ Inserted: uid 0 pid 24490 ]

The format of this output is easy to read, and it’s obviously designed
for contexts in which you want to get an idea of what’s going on at a glance.
If you specify even more verbose output with pfctl -vvs rules, you’ll see
essentially the same display, with rule numbers added. On the other hand,
the output from this command isn’t very well suited for feeding to a script
or other program for further processing. To extract these statistics and a
few more items in a script-friendly format—and to make your own decisions
about which rules are worth tracking)—use rule labels.
Logging, Monitoring, and Statistics    169

Labels do more than identify rules for processing specific kinds of
traffic; they also make it easier to extract the traffic statistics. By attaching labels to rules, you can store certain extra data about parts of your
rule set. For example, you could use labeling to measure bandwidth use
for accounting purposes.
In the following example, we attach the labels mail-in and mail-out to
our pass rules for incoming and outgoing mail traffic, respectively.
pass log proto { tcp, udp } to $emailserver port smtp label "mail-in"
pass log proto { tcp, udp } from $emailserver to port smtp label "mail-out"

Once you’ve loaded the rule set with labels, check the data using pfctl -vsl:
$ sudo pfctl -vsl
                                                 |
mail-in 1664158 1601986 763762591 887895 682427415 714091 81335176
mail-out 2814933 2711211 492510664 1407278 239776267 1303933 252734397

This output contains the following information:
u
v
w
x
y
z
{

The label
The number of times the rule has been evaluated
The total number of packets passed
The total number of bytes passed
The number of packets passed in
The number of bytes passed in
The number of packets passed out
The number of bytes passed out

The format of this list makes it very well suited for parsing by scripts
and applications.
The labels accumulate data from the time the rule set is loaded until
their counters are reset. And, in many contexts, it makes sense to set up a
cron job that reads label values at fixed intervals and then puts those values
into permanent storage.
If you choose to run the data collection at fixed intervals, consider collecting the data using pfctl -vsl -z. The z option resets the counters once
pfctl has read them, with the result that your data collector will then fetch
periodic data, accumulated since the command or the script was last run.

## 170. Chapter 9

Rules with macros and lists expand to several distinct rules. If your rule set contains
rules with lists and macros that have a label attached, the in-memory result will be a
number of rules, each with a separate, identically named label attached to it. While
this may lead to confusing sudo pfctl -vsl output, it shouldn’t be a problem as long
as the application or script that receives the data can interpret the data correctly by
adding up the totals for the identical labels.

If this type of data collection sounds useful to you, it’s also worth noting that recent PF versions offer the option of collecting traffic metadata
as NetFlow or IPFIX data. See“Collecting NetFlow Data with pflow(4)” on
page 176 for details.

Additional Tools for PF Logs and Statistics
One other important component of staying in control of your network is
having the ability to keep an updated view of your system’s status. In this
section, we’ll examine a selection of monitoring tools that you may find useful. All the tools presented here are available either in the base system or
via the package system on OpenBSD and FreeBSD (and, with some exceptions, on NetBSD).

Keeping an Eye on Things with systat
If you’re interested in seeing an instant snapshot of the traffic passing
through your systems right now, the systat program on OpenBSD offers
several useful views. In Chapter 7, we looked briefly at systat queues to see
how traffic was assigned to queues in our traffic-shaping rule sets. Here,
we’ll review some additional useful options.
The systat program is available on all BSD operating systems, in slightly
different versions. On all systems, systat offers views of system statistics,
with some minor variations in syntax and output. For example, the queues
view is one of several systat views available in recent OpenBSD versions, but
not in FreeBSD or NetBSD as of this writing.
For a more general view of the current state table than that offered by
queues, try systat states, which gives a listing very similar to the top(1) process listing. Here’s an example of typical systat states output:
PR
udp

Load 0.24 0.28 0.27 (1-16 of 895)

Wed Apr 1 14:00:04 2015

D SRC
DEST
STATE AGE EXP PKTS BYTES RATE PEAK AVG RU G
O 192.168.103.1:56729 192.168.103.9:12345 1:0 8340m
25 372K 542M 1492 4774 1137 *
I 10.168.103.15:47185 213.187.179.198:22
4:4 62377 86398 2954 613K 13264 23654
10 18
I 10.168.103.15:2796 213.187.179.198:22
4:4 62368 86219 4014 679K
11 18
I 10.168.103.15:15599 129.240.64.10:6667
4:4 61998 86375 9266 849K
58
14 *
O 213.187.179.198:1559 129.240.64.10:6667
4:4 61998 86375 9266 849K
58
14 * 1
I 10.168.103.15:8923 140.211.166.4:6667
4:4 61843 86385 15677 4794K
0 299
79 *
O 213.187.179.198:8923 140.211.166.4:6667
4:4 61843 86385 15677 4794K
0 299
79 * 1
I 10.168.103.15:47047 217.17.33.10:6667
4:4 61808 86385 7093 556K
88
9 *
O 213.187.179.198:4704 217.17.33.10:6667
4:4 61808 86385 7093 556K
88
9 * 1
I 10.168.103.15:30006 203.27.221.42:6667
4:4 61744 86375 6000 487K
49
8 *
O 213.187.179.198:3000 203.27.221.42:6667
4:4 61744 86375 6000 487K
49
8 * 1
I 10.168.103.15:31709 209.250.145.51:6667 4:4 61744 86385 6646 613K
0 114
10 *
O 213.187.179.198:3170 209.250.145.51:6667 4:4 61744 86385 6646 613K
0 114
10 * 1
I 192.168.103.254:5386 69.90.74.197:80
4:4 56718 29844
0 *
O 213.187.179.198:5386 69.90.74.197:80
4:4 56718 29844
0 * 1
I 10.168.103.15:33241 192.168.103.84:22
4:4 46916 82678 7555 897K
19 *

If your states don’t fit on one screen, just page through the live display.
Logging, Monitoring, and Statistics    171

Similarly, systat rules displays a live view of packets, bytes, and other
statistics for your loaded rule set, as in this example:

Load 1.25 0.87 0.52 (1-16 of 239)

RUL ANCHOR
8
10

Fri Apr  3 14:01:59 2015

A DIR L Q IF
PR K PKTS BYTES STATE MAX INFO
M In
26M 12G 4946K
all max-mss 1440
nfe0
4853K 3162M 94858
inet from 10.0.0.0/8 to any queue(q_def
nfe0
3318K 2430M 61672
inet from 192.168.103.0/24 to any queue
nfe0 tcp
6404K 4341M 134K
from any to any port = www queue(q_web,
nfe0 tcp
84298 43M 1594
from any to any port = https queue(q_we
nfe0 tcp
502 34677
63
from any to any port = domain queue(q_d
nfe0 udp
512K 64M 257K
from any to any port = domain queue(q_d
nfe0 icmp
11 1008
all queue(q_dns, q_pri)
B Any L
14638 1346K
return all
B Any Q
95 5628
return from <bruteforce> to any
P Any
1139K 1005M 757
all flags any
P In
Q
tcp K 18538 1350K 708
inet from any to any port = ftp
P Out
tcp K
inet from 127.0.0.1/32 to any port = ftp
P Any
1421 128K 134
all flags any
P In L egres tcp K 1830K 87M 18933
inet from any to any port = smtp queue
P In L egres tcp K
31 5240
from <nospamd> to any port = smtp

The systat rules view is especially useful because it offers a live view into
the fully parsed and loaded rule set. For example, if your rule set behaves
oddly, the rules view can point you in the right direction and show you the
flow of packets.
The systat program also offers a view that presents the same data you’d
get via pfctl -s status on the command line. The following example shows
part of the output of systat pf. The systat pf view offers more information
than will fit on most screens, but you can page through the live display of
the data.

Load 0.34 0.64 0.47

(1-16 of 51)

TYPE NAME
pf Status
pf Since
pf Debug
pf Hostid

VALUE
Enabled
139:05:08
err
0x82aea702

nfe0 Bytes In
nfe0 Bytes In
nfe0 Bytes Out
nfe0 Bytes Out
nfe0 Packets Out
nfe0 Packets Out
nfe0 Packets Out

6217042900
5993394114
64
12782504
11096
12551463
167
