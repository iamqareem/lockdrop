---
id: book-of-pf-02
title: "The Book of PF — Chapter 3, This is true unless, of course, the information…"
slug: book-of-pf-02-the-book-of-pf-chapter-3-this-is-true-unless-of-course-the-i
source: "The Book of PF, 3rd Edition"
sourceSection: "32. Chapter 3, 4. This is true unless, of course, the information changed in the meantime. Some sysadmins, 34. Chapter 3, 5. The earliest RFC describing the FTP protocol is RFC 114, dated April 10, 1971. The switch, 36. Chapter 3, 38. Chapter 3, 40. Chapter 3, 7. The main RFCs describing ICMP and so"
track: bsd-internals
tier: premium
tags: [firewall, pf, networking, security]
summary: "Here’s another pass rule that is useful to those who want the ability to Covers 23 sections: Chapter 3, This is true unless, of course, the information changed in the meantime. Some sysadmins, Chapter 3."
---
# The Book of PF — Chapter 3, This is true unless, of course, the information…

## 32. Chapter 3

Here’s another pass rule that is useful to those who want the ability to
administer machines from elsewhere:
pass in proto tcp to port ssh

Or use this form, if you prefer:
pass in proto tcp to $ext_if port ssh

When you leave out the from part entirely, the default is from any, which
is quite permissive. It lets you log in from anywhere, which is great if you
travel a lot and need SSH access from unknown locations around the world.
If you’re not all that mobile—say you haven’t quite developed the taste for
conferences in far-flung locations, or you feel your colleagues can fend for
themselves while you’re on vacation—you may want to tighten up with a from
part that includes only the places where you and other administrators are
likely to log in from for legitimate reasons.
Our very basic rule set is still not complete. Next, we need to make the
name service work for our clients. We start with another macro at the start
of our rule set:

This is supplemented with a rule that passes the traffic we want through
our firewall:
pass quick proto { tcp, udp } to port $udp_services

Note the quick keyword in this rule. We’ve started writing rule sets that
consist of several rules, and it’s time to revisit the relationships and interactions between them.
As noted in the previous chapter, the rules are evaluated from top to
bottom in the sequence they’re written in the configuration file. For each
packet or connection evaluated by PF, the last matching rule in the rule set is
the one that’s applied.
The quick keyword offers an escape from the ordinary sequence. When
a packet matches a quick rule, the packet is treated according to the present
rule. The rule processing stops without considering any further rules that
might have matched the packet. As your rule sets grow longer and more
complicated, you’ll find this quite handy. For example, it’s useful when you
need a few isolated exceptions to your general rules.
This quick rule also takes care of NTP, which is used for time synchronization. Common to both the name service and time synchronization protocols is that they may, under certain circumstances, communicate alternately
over TCP and UDP.

Into the Real World   33

Testing Your Rule Set
You may not have gotten around to writing that formal test suite for your
rule sets just yet, but there’s every reason to test that your configuration
works as expected.
The same basic tests in the standalone example from the previous chapter still apply. But now you need to test from the other hosts in your network
as well as from your packet-filtering gateway. For each of the services you
specified in your pass rules, test that machines in your local network get
meaningful results. From any machine in your local network, enter a command like this:
$ host nostarch.com

It should return exactly the same results as when you tested the standalone rule set in the previous chapter, and traffic for the services you have
specified should pass.4
You may not think it’s necessary, but it doesn’t hurt to check that the
rule set works as expected from outside your gateway as well. If you’ve done
exactly what this chapter says so far, it shouldn’t be possible to contact
machines in your local network from the outside.

W h y Only IP A ddre sse s —
Not Host n a me s or Dom a in Na me s?
Looking at the examples up to this point, you’ve probably noticed that the rule
sets all have macros that expand into IP addresses or address ranges but never
into hostnames or domain names. You’re probably wondering why. After all,
you’ve seen that PF lets you use service names in your rule set, so why not
include hostnames or domain names?
The answer is that if you used domain names and hostnames in your
rule set, the rule set would be valid only after the name service was running
and accessible. In the default configuration, PF is loaded before any network services are running. This means that if you want to use domain names
and hostnames in your PF configuration, you’ll need to change the system’s
startup sequence (by editing /etc/rc.local, perhaps) to load the name service–dependent rule set only after the name service is available. If you have only a
limited number of hostnames or domain names you want to reference in your
PF configuration, it’s likely at least as useful to add those as IP addresses to
name-mapping entries in your /etc/hosts file and leave the rc scripts alone.

## 4. This is true unless, of course, the information changed in the meantime. Some sysadmins
are fond of practical jokes, but most of the time changes in DNS zone information are due to
real-world needs in that particular organization or network.

## 34. Chapter 3

That Sad Old FTP Thing
The short list of real-life TCP ports we looked at a few moments back contained, among other things, FTP, the classic file transfer protocol. FTP is a relic
of the early Internet, when experiments were the norm and security was not
really on the horizon in any modern sense. FTP actually predates TCP/IP, 5
and it’s possible to track the protocol’s development through more than
50 RFCs. After more than 30 years, FTP is both a sad old thing and a problem child—emphatically so for anyone trying to combine FTP and firewalls.
FTP is an old and weird protocol with a lot to dislike. Here are the most
common points against it:

Passwords are transferred in the clear.
The protocol demands the use of at least two TCP connections (control
and data) on separate ports.
When a session is established, data is communicated via ports usually
selected at random.

All of these points make for challenges security-wise, even before considering any potential weaknesses in client or server software that may lead to
security issues. As any network graybeard will tell you, these things tend to
crop up when you need them the least.
Under any circumstances, other more modern and more secure options
for file transfer exist, such as SFTP and SCP, which feature both authentication and data transfer via encrypted connections. Competent IT professionals should have a preference for some form of file transfer other than FTP.
Regardless of our professionalism and preferences, we sometimes must
deal with things we would prefer not to use at all. In the case of FTP through
firewalls, we can combat problems by redirecting the traffic to a small program that’s written specifically for this purpose. The upside for us is that
handling FTP offers us a chance to look at two fairly advanced PF features:
redirection and anchors.
The easiest way to handle FTP in a default-to-block scenario such as
ours is to have PF redirect the traffic for that service to an external application that acts as a proxy for the service. The proxy maintains its own named
sub–rule set (an anchor in PF terminology), where it inserts or deletes rules as
needed for the FTP traffic. The combination of redirection and the anchor
provides a clean, well-defined interface between the packet-filtering subsystem and the proxy.

## 5. The earliest RFC describing the FTP protocol is RFC 114, dated April 10, 1971. The switch
to TCP/IP happened with FTP version 5, as defined in RFCs 765 and 775, dated June and
December 1980, respectively.
6. An encrypted version of the protocol, dubbed FTPS, is specified in RFC4217, but support
remains somewhat spotty.
Into the Real World   35

If We Must: ftp-proxy with Divert or Redirect
Enabling FTP transfers through your gateway is amazingly simple, thanks
to the FTP-proxy program included in the OpenBSD base system. The program is called—you guessed it— ftp-proxy.
To enable ftp-proxy, you need to add this line to your /etc/rc.conf.local
file on OpenBSD:
ftpproxy_flags=""

On FreeBSD, /etc/rc.conf needs to contain at least the first of these two
lines:
ftpproxy_enable="YES"
ftpproxy_flags="" # and put any command line options here

If you need to specify any command-line options to ftp-proxy, you put
them in the ftpproxy_flags variable.
You can start the proxy manually by running /usr/sbin/ftp-proxy if you
like (or even better, use the /etc/rc.d/ftp-proxy script with the start option on
OpenBSD), and you may want to do this in order to check that the changes
to the PF configuration you’re about to make have the intended effect.
For a basic configuration, you need to add only three elements to your
/etc/pf.conf: the anchor and two pass rules. The anchor declaration looks
anchor "ftp-proxy/*"

In pre-OpenBSD 4.7 versions, two anchor declarations were needed:
nat-anchor "ftp-proxy/*"
rdr-anchor "ftp-proxy/*"

The proxy will insert the rules it generates for the FTP sessions here.
Then, you also need a pass rule to let FTP traffic into the proxy:
pass in quick inet proto tcp to port ftp divert-to 127.0.0.1 port 8021

Note the divert-to part. This redirects the traffic to the local port,
where the proxy listens via the highly efficient, local-connections-only
divert(4) interface. In OpenBSD versions 4.9 and older, the traffic diversion
happened via an rdr-to. If you’re upgrading an existing pre-OpenBSD 5.0
configuration, you’ll need to update your rdr-to rules for the FTP proxy to
use divert-to instead.
If your operating system uses a pre-OpenBSD 4.7 PF version, you need
this version of the redirection rule:
rdr pass on $int_if inet proto tcp from any to any port ftp -> 127.0.0.1 port 8021

## 36. Chapter 3

Finally, make sure your rule set contains a pass rule to let the packets
pass from the proxy to the rest of the world, where $proxy expands to the
address to which the proxy daemon is bound:
pass out inet proto tcp from $proxy to any port ftp

Reload your PF configuration:
$ sudo pfctl -f /etc/pf.conf

Before you know it, your users will thank you for making FTP work.

Variations on the ftp-proxy Setup
The preceding example covers a basic setup where the clients in your local
network need to contact FTP servers elsewhere. This configuration should
work well with most combinations of FTP clients and servers.
You can change the proxy’s behavior in various ways by adding options
to the ftpproxy_flags= line. You may bump into clients or servers with specific
quirks that you need to compensate for in your configuration, or you may
want to integrate the proxy in your setup in specific ways, such as assigning
FTP traffic to a specific queue. For these and other finer points of ftp-proxy
configuration, your best bet is to start by studying the man page.
If you’re interested in ways to run an FTP server protected by PF and
ftp-proxy, you could look into running a separate ftp-proxy in reverse mode
(using the -R option) on a separate port with its own redirecting pass rule.
It’s even possible to set up the proxy to run in IPv6 mode, but if you’re ahead
of the pack in running the modern protocol, you’re less likely to bother with
FTP as your main file transfer protocol.

If your PF version predates the ones described here, you’re running on an outdated,
unsupported operating system. I strongly urge you to schedule an operating system
upgrade as soon as possible. If an upgrade is for some reason not an option, please
look up the first edition of this book and study the documentation for your operating
system for information on how to use some earlier FTP proxies.

Making Your Network Troubleshooting-Friendly
Making your network troubleshooting-friendly is a potentially large subject.
Generally, the debugging- or troubleshooting-friendliness of your TCP/IP
network depends on how you treat the Internet protocol that was designed
specifically with debugging in mind: ICMP.
ICMP is the protocol for sending and receiving control messages between
hosts and gateways, mainly to provide feedback to a sender about any
unusual or difficult conditions en route to the target host.
There’s a lot of ICMP traffic, which usually happens in the background
while you are surfing the Web, reading mail, or transferring files. Routers

Into the Real World   37

(remember, you're building one) use ICMP to negotiate packet sizes and
other transmission parameters in a process often referred to as path MTU
discovery.
You may have heard admins refer to ICMP as either “evil” or, if their
understanding runs a little deeper, “a necessary evil.” The reason for this
attitude is purely historical. A few years back, it was discovered that the networking stacks of several operating systems contained code that could make
the machine crash if it were sent a sufficiently large ICMP request.
One of the companies that was hit hard by this was Microsoft, and you
can find a lot of material on the ping of death bug by using your favorite
search engine. However, this all happened in the second half of the 1990s,
and all modern operating systems have thoroughly sanitized their network
code since then (at least, that’s what we’re led to believe).
One of the early work-arounds was to simply block either ICMP echo
(ping) requests or even all ICMP traffic. That measure almost certainly led
to poor performance and hard-to-debug network problems. In some places,
however, these rule sets have been around for almost two decades, and the
people who put them there are still scared. There’s most likely little to no
reason to worry about destructive ICMP traffic anymore, but here we’ll look
at how to manage just what ICMP traffic passes to or from your network.
In modern IPv6 networks, the updated icmp6 protocol plays a more crucial role than ever in parameter passing and even host configuration, and
network admins are playing a high-stakes game while learning the finer
points of blocking or passing icmp6 traffic. To a large extent, issues that are
relevant for IPv4 ICMP generally apply to IPv6 ICMP6 as well, but in addition, ICMP6 is used for several mechanisms that were handled differently
in IPv4. We’ll dip into some of these issues after walking through the issues
that are relevant for both IP protocol versions.

Do We Let It All Through?
The obvious question becomes, “If ICMP is such a good and useful thing,
shouldn’t we let it all through all the time?” The answer is that it depends.
Letting diagnostic traffic pass unconditionally makes debugging easier,
of course, but it also makes it relatively easy for others to extract information about your network. So, a rule like the following might not be optimal
if you want to cloak the internal workings of your IPv4 network:
pass inet proto icmp

If you want the same free flow of messages for your IPv6 traffic, the corresponding rule is this:
pass inet6 proto icmp6

In all fairness, it should also be said that you might find some ICMP and
ICMP6 traffic quite harmlessly riding piggyback on your keep state rules.

## 38. Chapter 3

The Easy Way Out: The Buck Stops Here
The easiest solution could very well be to allow all ICMP and ICMP6 traffic
from your local network through and to let probes from elsewhere stop at
your gateway:
pass inet proto icmp icmp-type $icmp_types from $localnet
pass inet6 proto icmp6 icmp6-type $icmp6_types from $localnet
pass inet proto icmp icmp-type $icmp_types to $ext_if
pass inet6 proto icmp6 icmp6-type $icmp6_types to $ext_if

This is assuming, of course that you’ve identified the list of desirable
ICMP and ICMP6 types to fill out your macro definitions. We’ll get back to
those shortly. Stopping probes at the gateway might be an attractive option
anyway, but let’s look at a few other options that’ll demonstrate some of PF’s
flexibility.

Letting ping Through
The rule set we have developed so far in this chapter has one clear disadvantage: Common troubleshooting commands, such as ping and traceroute
(and their IPv6 equivalents, ping6 and traceroute6), will not work. That may
not matter too much to your users, and because it was the ping command that
scared people into filtering or blocking ICMP traffic in the first place, there
are apparently some people who feel we’re better off without it. However,
you’ll find these troubleshooting tools useful. And with a couple of small
additions to the rule set, they will be available to you.
The diagnostic commands ping and ping6 rely on the ICMP and ICMP6
echo request (and the matching echo reply) types, and in order to keep our
rule set tidy, we start by defining another set of macros:
icmp_types = "echoreq"
icmp6_types = "echoreq"

Then, we add rules that use the definitions:
pass inet proto icmp icmp-type $icmp_types

The macros and the rules mean that ICMP and ICMP6 packets with
type echo request will be allowed through and matching echo replies will be
allowed to pass back due to PF’s stateful nature. This is all the ping and
ping6 commands need in order to produce their expected results.
If you need more or other types of ICMP or ICMP6 packets to go
through, you can expand icmp_types and icmp6_types to lists of those packet
types you want to allow.

Into the Real World   39

Helping traceroute
The traceroute command (and the IPv6 variant traceroute6) is useful when
your users claim that the Internet isn’t working. By default, Unix traceroute
uses UDP connections according to a set formula based on destination. The
following rules work with the traceroute and traceroute6 commands on all
forms of Unix I’ve had access to, including GNU/Linux:
pass out on egress inet proto udp to port 33433:33626 # For IPv4
pass out on egress inet6 proto udp to port 33433:33626 # For IPv6

This also gives you a first taste of what port ranges look like. They’re
quite useful in some contexts.
Experience so far indicates that traceroute and traceroute6 implementations on other operating systems work roughly the same way. One notable
exception is Microsoft Windows. On that platform, the tracert.exe program
and its IPv6 sister tracert6.exe use ICMP echo requests for this purpose. So if
you want to let Windows traceroutes through, you need only the first rule,
much as when letting ping through. The Unix traceroute program can be
instructed to use other protocols as well and will behave remarkably like
its Microsoft counterpart if you use its -I command-line option. You can
check the traceroute man page (or its source code, for that matter) for all
the details.
This solution is based on a sample rule I found in an openbsd-misc post.
I’ve found that list, and the searchable list archives (accessible among other
places from http://marc.info/), to be a valuable resource whenever you need
OpenBSD or PF-related information.

Path MTU Discovery
The last bit I’ll remind you about when it comes to troubleshooting is the path
MTU discovery. Internet protocols are designed to be device-independent,
and one consequence of device independence is that you cannot always
predict reliably what the optimal packet size is for a given connection. The
main constraint on your packet size is called the maximum transmission unit,
or MTU, which sets the upper limit on the packet size for an interface. The
ifconfig command will show you the MTU for your network interfaces.
Modern TCP/IP implementations expect to be able to determine the
correct packet size for a connection through a process that simply involves
sending packets of varying sizes within the MTU of the local link with the
“do not fragment” flag set. If a packet then exceeds the MTU somewhere
along the way to the destination, the host with the lower MTU will return
an ICMP packet indicating “type 3, code 4” and quoting its local MTU
when the local upper limit has been reached. Now, you don’t need to dive
for the RFCs right away. Type 3 means destination unreachable, and code 4

## 40. Chapter 3

is short for fragmentation needed, but the “do not fragment” flag is set. So if your
connections to other networks, which may have MTUs that differ from
your own, seem suboptimal, you could try changing your list of ICMP types
slightly to let the IPv4 destination-unreachable packets through:

As you can see, this means you do not need to change the pass rule
itself:
pass inet proto icmp icmp-type $icmp_types

Now I’ll let you in on a little secret: In almost all cases, these rules aren’t
necessary for purposes of path MTU discovery (but they don’t hurt either).
However, even though the default PF keep state behavior takes care of most
of the ICMP traffic you’ll need, PF does let you filter on all variations of ICMP
types and codes. For IPv6, you’d probably want to let the more common
ICMP6 diagnostics through, such as the following:
icmp6_types = "{ echoreq unreach timex paramprob }"

This means that we let echo requests and destination unreachable, time
exceeded, and parameter problem messages pass for IPv6 traffic. Thanks to
the macro definitions, you don’t need to touch the pass rule for the ICMP6
case either:

But it’s worth keeping in mind that IPv6 hosts rely on ICMP6 messages
for automatic configuration-related tasks, and you may want to explicitly
filter in order to allow or deny specific ICMP6 types at various points in
your network.
For example, you’ll want to let a router and its clients exchange router
solicitation and router advertisement messages (ICMP6 type routeradv
and routersol, respectively), while you may want to make sure that neighbor advertisements and neighbor solicitations (ICMP6 type neighbradv
and neighbrsol, respectively) stay confined within their directly connected
networks.
If you want to delve into more detail, the list of possible types and codes
are documented in the icmp(4) and icmp6(4) man pages. The background
information is available in the RFCs.7

## 7. The main RFCs describing ICMP and some related techniques are 792, 950, 1191, 1256,
2521, and 6145. ICMP updates for IPv6 are in RFC 3542 and RFC 4443. These documents
are available in a number of places on the Web, such as http://www.ietf.org/ and http://www
.faqs.org/, and probably also via your package system.
Into the Real World   41

Tables Make Your Life Easier
By now, you may be thinking that this setup gets awfully static and
rigid. There will, after all, be some kinds of data relevant to filtering
and redirection at a given time, but they don’t deserve to be put into a configuration file! Quite right, and PF offers mechanisms for handling those
situations.
Tables are one such feature. They’re useful as lists of IP addresses that
can be manipulated without reloading the entire rule set and also when fast
lookups are desirable.
Table names are always enclosed in < >, like this:
table <clients> persist { 192.168.2.0/24, !192.168.2.5 }

Here, the network 192.168.2.0/24 is part of the table with one exception:
The address 192.168.2.5 is excluded using the ! operator (logical NOT). The
keyword persist makes sure the table itself will exist, even if no rules currently refer to it.
It’s also possible to load tables from files where each item is on a separate line, such as the file /etc/clients:
192.168.2.0/24
!192.168.2.5

This, in turn, is used to initialize the table in /etc/pf.conf:
table <clients> persist file "/etc/clients"

So, for example, you can change one of our earlier rules to read like
this to manage outgoing traffic from your client computers:
pass inet proto tcp from <clients> to any port $client_out

With this in hand, you can manipulate the table’s contents live, like this:
$ sudo pfctl -t clients -T add 192.168.1/16

Note that this changes the in-memory copy of the table only, meaning that the change will not survive a power failure or reboot, unless you
arrange to store your changes.
You might opt to maintain the on-disk copy of the table with a cron job
that dumps the table content to disk at regular intervals, using a command
such as the following:
$ sudo pfctl -t clients -T show >/etc/clients

## 42. Chapter 3

Alternatively, you could edit the /etc/clients file and replace the in-memory table contents with the file data:
$ sudo pfctl -t clients -T replace -f /etc/clients

For operations you’ll be performing frequently, sooner or later, you’ll
end up writing shell scripts. It’s likely that routine operations on tables,
such as inserting or removing items or replacing table contents, will be part
of your housekeeping scripts in the near future.
One common example is to enforce network access restrictions via cron
jobs that replace the contents of the tables referenced as from addresses in
the pass rules at specific times. In some networks, you may even need different access rules for different days of the week. The only real limitations lie
in your own needs and your creativity.
We’ll be returning to some handy uses of tables frequently over the
next chapters, and we’ll look at a few programs that interact with tables in
useful ways.

Into the Real World   43

W i r e l e ss N e t w o r k s Ma d e Easy

It’s rather tempting to say that on BSD—
and OpenBSD, in particular—there’s no
need to “make wireless networking easy”
because it already is. Getting a wireless network running isn’t very different from getting a wired
one up and running, but there are some issues that
turn up simply because we’re dealing with radio waves and not wires. We’ll
look briefly at some of the issues before moving on to the practical steps
involved in creating a usable setup.
Once we have covered the basics of getting a wireless network up and
running, we’ll turn to some of the options for making your wireless network
more interesting and harder to break.

A Little IEEE 802.11 Background
Setting up any network interface, in principle, is a two-step process: You
establish a link, and then you move on to configuring the interface for
TCP/IP traffic.
In the case of wired Ethernet-type interfaces, establishing the link usually consists of plugging in a cable and seeing the link indicator light up.
However, some interfaces require extra steps. Networking over dial-up connections, for example, requires telephony steps, such as dialing a number to
get a carrier signal.
In the case of IEEE 802.11–style wireless networks, getting the carrier
signal involves quite a few steps at the lowest level. First, you need to select
the proper channel in the assigned frequency spectrum. Once you find a
signal, you need to set a few link-level network identification parameters.
Finally, if the station you want to link to uses some form of link-level encryption, you need to set the correct kind and probably negotiate some additional parameters.
Fortunately, on OpenBSD systems, all configuration of wireless network
devices happens via ifconfig commands and options, as with any other network interface. While most network configuration happens via ifconfig on
other BSDs, too, on some systems, specific features require other configuration.1 Still, because we’re introducing wireless networks here, we need
to look at security at various levels in the networking stack from this new
perspective.
There are basically three kinds of popular and simple IEEE 802.11 privacy mechanisms, and we’ll discuss them briefly over the next sections.

For a more complete overview of issues surrounding security in wireless networks, see
Professor Kjell Jørgen Hole’s articles and slides at http://www.kjhole.com/ and
http://www.nowires.org/.

MAC Address Filtering
The short version of the story about PF and MAC address filtering is that
we don’t do it. A number of consumer-grade, off-the-shelf wireless access
points offer MAC address filtering, but contrary to common belief, they
don’t really add much security. The marketing succeeds largely because
most consumers are unaware that it’s possible to change the MAC address
of essentially any wireless network adapter on the market today.2

## 1. On some systems, the older, device-specific programs, such as wicontrol and ancontrol, are
still around, but for the most part, they are deprecated and have long been replaced with
ifconfig functionality. On OpenBSD, the consolidation into ifconfig has been completed.
2. A quick man page lookup on OpenBSD will tell you that the command to change the MAC
address for the interface rum0 is simply ifconfig rum0 lladdr 00:ba:ad:f0:0d:11.

## 46. Chapter 4

If you really want to try MAC address filtering, you could look into using the bridge(4)
facility and the bridge-related rule options in ifconfig(8) on OpenBSD 4.7 and
later. We’ll look at bridges and some of the more useful ways to use them with packet
filtering in Chapter 5. Note that you can use the bridge filtering without really running a bridge by just adding one interface to the bridge.

WEP
One consequence of using radio waves instead of wires to move data is that
it’s comparatively easier for outsiders to capture data in transit over radio
waves. The designers of the 802.11 family of wireless network standards
seem to have been aware of this fact, and they came up with a solution that
they went on to market under the name Wired Equivalent Privacy, or WEP.
Unfortunately, the WEP designers came up with their wired equivalent
encryption without actually reading up on recent research or consulting
active researchers in the field. So the link-level encryption scheme they recommended is considered a pretty primitive homebrew among cryptography
professionals. It was no great surprise when WEP encryption was reverseengineered and cracked within a few months after the first products were
released.
Even though you can download free tools to descramble WEP-encoded
traffic in a matter of minutes, for a variety of reasons, WEP is still widely
supported and used. Essentially, all IEEE 802.11 equipment available today
has support for at least WEP, and a surprising number offer MAC address
filtering, too.
You should consider network traffic protected only by WEP to be just
marginally more secure than data broadcast in the clear. Then again, the
token effort needed to crack into a WEP network may be sufficient to deter
lazy and unsophisticated attackers.

WPA
It dawned on the 802.11 designers fairly quickly that their WEP system
wasn’t quite what it was cracked up to be, so they came up with a revised and
slightly more comprehensive solution called Wi-Fi Protected Access, or WPA.
WPA looks better than WEP, at least on paper, but the specification is
complicated enough that its widespread implementation was delayed. In
addition, WPA has attracted its share of criticism over design issues and
bugs that have produced occasional interoperability problems. Combined
with the familiar issues of access to documentation and hardware, free software support varies. Most free systems have WPA support, and even though
you may find that it’s not available for all devices, the situation has been
improving over time. If your project specification includes WPA, look carefully at your operating system and driver documentation.

Wireless Networks Made Easy   47

And, of course, it goes almost without saying that you’ll need further
security measures, such as SSH or SSL encryption, to maintain any significant level of confidentiality for your data stream.

The Right Hardware for the Task
Picking the right hardware is not necessarily a daunting task. On a BSD system, the following simple command is all you need to enter to see a listing
of all manual pages with the word wireless in their subject lines.3
$ apropos wireless

Even on a freshly installed system, this command will give you a complete list of all wireless network drivers available in the operating system.
The next step is to read the driver manual pages and compare the
lists of compatible devices with what is available as parts or built into the
systems you’re considering. Take some time to think through your specific
requirements. For test purposes, low-end rum or ural USB dongles (or the
newer urtwn and run) will work and are quite convenient. Later, when you’re
about to build a more permanent infrastructure, you may want to look into
higher-end gear, although you may find that the inexpensive test gear will
perform quite well. Some wireless chipsets require firmware that for legal
reasons can’t be distributed on the OpenBSD install media. In most cases,
the fw_update script will be able to fetch the required firmware on first boot
after a successful install, as long as a network connection is available. If
you install the units in an already configured system, you can try running
fw_update manually. You may also want to read Appendix B of this book for
some further discussion.

Setting Up a Simple Wireless Network
For our first wireless network, it makes sense to use the basic gateway configuration from the previous chapter as our starting point. In your network
design, it’s likely that the wireless network isn’t directly attached to the
Internet at large but that the wireless network will require a gateway of
some sort. For that reason, it makes sense to reuse the working gateway
setup for this wireless access point, with some minor modifications introduced over the next few paragraphs. After all, doing so is more convenient
than starting a new configuration from scratch.
NO T E

We’re in infrastructure-building mode here, and we’ll be setting up the access point
first. If you prefer to look at the client setup first, see “The Client Side” on page 55.
The first step is to make sure you have a supported card and to check
that the driver loads and initializes the card properly. The boot-time system
messages scroll by on the console, but they’re also recorded in the file
3. In addition, it’s possible to look up man pages on the Web. Check http://www.openbsd.org/
and the other project websites. They offer keyword-based man page searching.

## 48. Chapter 4

/var/run/dmesg.boot. You can view the file itself or use the dmesg command to
see these messages. With a successfully configured PCI card, you should see
something like this:
ral0 at pci1 dev 10 function 0 "Ralink RT2561S" rev 0x00: apic 2 int 11 (irq
11), address 00:25:9c:72:cf:60
ral0: MAC/BBP RT2561C, RF RT2527

If the interface you want to configure is a hot-pluggable type, such as a
USB or PC Card device, you can see the kernel messages by viewing the
/var/log/messages file—for example, by running tail -f on the file before
you plug in the device.
Next, you need to configure the interface: first to enable the link and,
finally, to configure the system for TCP/IP. You can do this from the command line, like this:
$ sudo ifconfig ral0 up mediaopt hostap mode 11g chan 1 nwid unwiredbsd nwkey 0x1deadbeef9

This command does several things at once. It configures the ral0 interface, enables the interface with the up parameter, and specifies that the
interface is an access point for a wireless network with mediaopt hostap. Then,
it explicitly sets the operating mode to 11g and the channel to 11. Finally, it
uses the nwid parameter to set the network name to unwiredbsd, with the
WEP key (nwkey) set to the hexadecimal string 0x1deadbeef9.
Use ifconfig to check that the command successfully configured the
interface:
media: IEEE802.11 autoselect mode 11g hostap
ieee80211: nwid unwiredbsd chan 1 bssid 00:25:9c:72:cf:60 nwkey <not displayed> 100dBm

Note the contents of the media and ieee80211 lines. The information displayed here should match what you entered on the ifconfig command line.
With the link part of your wireless network operational, you can assign
an IP address to the interface. First, set an IPv4 address:
$ sudo ifconfig ral0 10.50.90.1 255.255.255.0

Setting an IPv6 is equally straightforward:
$ sudo ifconfig alias ral0 2001:db8::baad:f00d:1 64

Wireless Networks Made Easy   49

On OpenBSD, you can combine both steps into one by creating a
/etc/hostname.ral0 file, roughly like this:
up mediaopt hostap mode 11g chan 1 nwid unwiredbsd nwkey 0x1deadbeef9
inet6 alias 2001:db8::baad:f00d:1 64

Then, run sh /etc/netstart ral0 (as root) or wait patiently for your next
boot to complete.
Notice that the preceding configuration is divided over several lines.
The first line generates an ifconfig command that sets up the interface with
the correct parameters for the physical wireless network. The second line
generates the command that sets the IPv4 address after the first command
completes, followed by setting an IPv6 address for a dual-stack configuration. Because this is our access point, we set the channel explicitly, and we
enable weak WEP encryption by setting the nwkey parameter.
On NetBSD, you can normally combine all of these parameters in one
rc.conf setting:
ifconfig_ral0="mediaopt hostap mode 11g chan 1 nwid unwiredbsd nwkey
0x1deadbeef inet 10.50.90.1 netmask 255.255.255.0 inet6 2001:db8::baad:f00d:1
prefixlen 64 alias"

FreeBSD 8 and newer versions take a slightly different approach, tying
wireless network devices to the unified wlan(4) driver. Depending on your
kernel configuration, you may need to add the relevant module load lines
to /boot/loader.conf. On one of my test systems, /boot/loader.conf looks like this:
if_rum_load="YES"
wlan_scan_ap_load="YES"
wlan_scan_sta_load="YES"
wlan_wep_load="YES"
wlan_ccmp_load="YES"
wlan_tkip_load="YES"

With the relevant modules loaded, setup is a multicommand affair, best
handled by a start_if.if file for your wireless network. Here is an example of
an /etc/start_if.rum0 file for a WEP access point on FreeBSD 8:
create_args_wlan0="wlandev rum0 wlanmode hostap"
ifconfig_wlan0="inet 10.50.90.1 netmask 255.255.255.0 ssid unwiredbsd \
wepmode on wepkey 0x1deadbeef9 mode 11g"
ifconfig_wlan0_ipv6="2001:db8::baad:f00d:1 prefixlen 64"

After a successful configuration, your ifconfig output should show both
the physical interface and the wlan interface up and running:
rum0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 2290

## 50. Chapter 4

wlan0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 1500
inet 10.50.90.1 netmask 0xffffff00 broadcast 10.50.90.255
inet6 2001:db8::baad:f00d:1 prefixlen 64
ssid unwiredbsd channel 6 (2437 Mhz 11g) bssid 00:24:1d:9a:bf:67
country US authmode OPEN privacy ON deftxkey UNDEF wepkey 1:40-bit
txpower 0 scanvalid 60 protmode CTS dtimperiod 1 -dfs

The line status: running means that you’re up and running, at least on
the link level.

Be sure to check the most up-to-date ifconfig man page for other options that may be
more appropriate for your configuration.

An OpenBSD WPA Access Point
WPA support was introduced in OpenBSD 4.4, with extensions to most
wireless network drivers, and all basic WPA keying functionality was merged
into ifconfig(8) in OpenBSD 4.9.

There may still be wireless network drivers that don’t have WPA support, so check
the driver’s man page to see whether WPA is supported before you try to configure
your network to use it. You can combine 802.1x key management with an external
authentication server for “enterprise” mode via the security/wpa_supplicant package,
but we’ll stick to the simpler preshared key setup for our purposes.
The procedure for setting up an access point with WPA is quite similar to the one we followed for WEP. For a WPA setup with a preshared key
(sometimes referred to as a network password), you would typically write a
hostname.if file like this:

up media autoselect mediaopt hostap mode 11g chan 1 nwid unwiredbsd wpakey 0x1deadbeef9
inet6 alias 2001:db8::baad:f00d:1 64

If you’re already running the WEP setup described earlier, disable
those settings with the following:
$ sudo ifconfig ral0 -nwid -nwkey

Then, enable the new settings with this command:
$ sudo sh /etc/netstart ral0

Wireless Networks Made Easy   51

You can check that the access point is up and running with ifconfig:
media: IEEE802.11 autoselect mode 11g hostap
ieee80211: nwid unwiredbsd chan 1 bssid 00:25:9c:72:cf:60 wpapsk <not displayed>
wpaprotos wpa1,wpa2 wpaakms psk wpaciphers tkip,ccmp wpagroupcipher tkip 100dBm
inet6 2001:db8::baad:f00d:1 prefixlen 64
inet 10.50.90.1 netmask 0xff000000 broadcast 10.255.255.255

Note the status: active indication and that the WPA options we didn’t
set explicitly are shown with their sensible default values.

A FreeBSD WPA Access Point
Moving from the WEP access point we configured earlier to a somewhat
safer WPA setup is straightforward. WPA support on FreeBSD comes in the
form of hostapd (a program that is somewhat similar to OpenBSD’s hostapd
but not identical). We start by editing the /etc/start_if.rum0 file to remove the
authentication information. The edited file should look something like this:
create_args_wlan0="wlandev rum0 wlanmode hostap"
ifconfig_wlan0="inet 10.50.90.1 netmask 255.255.255.0 ssid unwiredbsd mode 11g"
ifconfig_wlan0_ipv6="2001:db8::baad:f00d:1 prefixlen 64"

Next, we add the enable line for hostapd in /etc/rc.conf:
hostapd_enable="YES"

And finally, hostapd will need some configuration of its own, in /etc/
hostapd.conf:
interface=wlan0
debug=1
ctrl_interface=/var/run/hostapd
ctrl_interface_group=wheel
ssid=unwiredbsd
wpa=1
wpa_passphrase=0x1deadbeef9
wpa_key_mgmt=WPA-PSK
wpa_pairwise=CCMP TKIP

Here, the interface specification is rather self-explanatory, while the debug
value is set to produce minimal messages. The range is 0 through 4, where 0
is no debug messages at all. You shouldn’t need to change the ctrl_interface*
settings unless you’re developing hostapd. The first of the next five lines
52   Chapter 4

sets the network identifier. The subsequent lines enable WPA and set the
passphrase. The final two lines specify accepted key-management algorithms and encryption schemes. (For the finer details and updates, see the
hostapd(8) and hostapd.conf(5) man pages.)
After a successful configuration (running sudo /etc/rc.d/hostapd forcestart comes to mind), ifconfig should produce output about the two interfaces similar to this:
rum0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 2290
wlan0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 1500
inet 10.50.90.1 netmask 0xffffff00 broadcast 10.50.90.255
inet6 2001:db8::baad:f00d:1 prefixlen 64
ssid unwiredbsd channel 6 (2437 Mhz 11g) bssid 00:24:1d:9a:bf:67
country US authmode WPA privacy MIXED deftxkey 2 TKIP 2:128-bit
txpower 0 scanvalid 60 protmode CTS dtimperiod 1 -dfs

The line status: running means that you’re up and running, at least on
the link level.

The Access Point’s PF Rule Set
With the interfaces configured, it’s time to start configuring the access
point as a packet-filtering gateway. You can start by copying the basic gateway setup from Chapter 3. Enable gatewaying via the appropriate entries in
the access point’s sysctl.conf or rc.conf file and then copy across the pf.conf file.
Depending on the parts of the previous chapter that were most useful to
you, the pf.conf file may look something like this:
client_out = "{ ssh, domain, pop3, auth, nntp, http,\
https, cvspserver, 2628, 5999, 8000, 8080 }"
icmp6_types = "{ echoreq unreach timex paramprob }"
match out on $ext_if inet from $localnet nat-to ($ext_if)
pass quick inet proto { tcp, udp } from $localnet to port $udp_services
pass log inet proto icmp icmp-type $icmp_types
pass inet proto tcp from $localnet port $client_out
Wireless Networks Made Easy   53

If you’re running a PF version equal to OpenBSD 4.6 or earlier, the
match rule with nat-to instead becomes this (assuming the external interface

has one address, dynamically assigned):
nat on $ext_if from $localnet to any -> ($ext_if)

The only difference that’s strictly necessary for your access point to
work is the definition of int_if. You must change the definition of int_if to
match the wireless interface. In our example, this means the line should
now read as follows:
int_if = "ral0"

More than likely, you’ll also want to set up dhcpd to serve addresses and
other relevant network information to IPv4 clients after they’ve associated
with your access point. For IPv6 networks, you probably want to set up rtadvd
(or even a DHCP6 daemon) to aid your IPv6 clients in their autoconfiguration. Setting up dhcpd and rtadvd is fairly straightforward if you read the
man pages.
That’s all there is to it. This configuration gives you a functional BSD
access point, with at least token security (actually more like a Keep Out!
sign) via WEP encryption or a slightly more robust link-level encryption
with WPA. If you need to support FTP, copy the ftp-proxy configuration
from the machine you set up in Chapter 3 and make changes similar to
those you made for the rest of the rule set.

Access Points with Three or More Interfaces
If your network design dictates that your access point is also the gateway for
a wired local network, or even several wireless networks, you need to make
some minor changes to your rule set. Instead of just changing the value of
the int_if macro, you might want to add another (descriptive) definition
for the wireless interface, such as the following:
air_if = "ral0"

Your wireless interfaces are likely to be on separate subnets, so it might
be useful to have a separate rule for each of them to handle any IPv4 NAT
configuration. Here’s an example for OpenBSD 4.7 and newer systems:
match out on $ext_if from $air_if:network nat-to ($ext_if)

And here’s one on pre–OpenBSD 4.7 PF versions:
nat on $ext_if from $air_if:network to any -> ($ext_if) static-port

## 54. Chapter 4

Depending on your policy, you might also want to adjust your localnet
definition, or at least include $air_if in your pass rules where appropriate.
And once again, if you need to support FTP, a separate pass with divert or
redirection for the wireless network to ftp-proxy may be in order.

Handling IPSec, VPN Solutions
You can set up virtual private networks (VPNs) using built-in IPsec tools,
OpenSSH, or other tools. However, due to the perceived poor security profile of wireless networks in general or for other reasons, you’re likely to want
to set up some additional security.
The options fall roughly into three categories:
SSH If your VPN is based on SSH tunnels, the baseline rule set already
contains all the filtering you need. Your tunneled traffic will be indistinguishable from other SSH traffic to the packet filter.
IPsec with UDP key exchange (IKE/ISAKMP) Several IPsec variants depend critically on key exchange via proto udp port 500 and use
proto udp port 4500 for NAT Traversal (NAT-T). You need to let this traffic
through in order to let the flows become established. Almost all implementations also depend critically on letting ESP protocol traffic (protocol number 50) pass between the hosts with the following:
pass proto esp from $source to $target

Filtering on IPsec encapsulation interfaces With a properly configured IPsec setup, you can set up PF to filter on the encapsulation interface enc0 itself with the following:4
pass on enc0 proto ipencap from $source to $target keep state (if-bound)

See Appendix A for references to some of the more useful literature on
the subject.

The Client Side
As long as you have BSD clients, setup is extremely easy. The steps involved
in connecting a BSD machine to a wireless network are quite similar to the
ones we just went through to set up a wireless access point. On OpenBSD,
the configuration centers on the hostname.if file for the wireless interface.
On FreeBSD, the configuration centers on rc.conf but will most likely involve
a few other files, depending on your exact configuration.

## 4. In OpenBSD 4.8, the encapsulation interface became a cloneable interface, and you
can configure several separate enc interfaces. All enc interfaces become members of the
enc interface group.
Wireless Networks Made Easy   55

OpenBSD Setup
Starting with the OpenBSD case, in order to connect to the WEP access
point we just configured, your OpenBSD clients need a hostname.if (for
example, /etc/hostname.ral0) configuration file with these lines:
up media autoselect mode 11g chan 1 nwid unwiredbsd nwkey 0x1deadbeef9
dhcp
rtsol

The first line sets the link-level parameters in more detail than usually
required. Only up and the nwid and nwkey parameters are strictly necessary.
In almost all cases, the driver will associate with the access point on the
appropriate channel and in the best available mode. The second line calls
for a DHCP configuration and, in practice, causes the system to run a
dhclient command to retrieve TCP/IP configuration information. The final
line invokes rtsol(8) to initiate IPv6 configuration.
If you choose to go with the WPA configuration, the file will look like
this instead:
up media autoselect mode 11g chan 1 nwid unwiredbsd wpakey 0x1deadbeef9
dhcp
rtsol

Again, the first line sets the link-level parameters, where the crucial
ones are the network selection and encryption parameters nwid and wpakey.
You can try omitting the mode and chan parameters; in almost all cases, the
driver will associate with the access point on the appropriate channel and
in the best available mode.
If you want to try out the configuration commands from the command
line before committing the configuration to your /etc/hostname.if file, the
command to set up a client for the WEP network is as follows:
$ sudo ifconfig ral0 up mode 11g chan 1 nwid unwiredbsd nwkey 0x1deadbeef9

The ifconfig command should complete without any output. You can
then use ifconfig to check that the interface was successfully configured.
The output should look something like this:
media: IEEE802.11 autoselect (OFDM54 mode 11g)
ieee80211: nwid unwiredbsd chan 1 bssid 00:25:9c:72:cf:60 nwkey <not displayed> 100dBm

## 56. Chapter 4

Note that the ieee80211: line displays the network name and channel,
along with a few other parameters. The information displayed here should
match what you entered on the ifconfig command line.
Here is the command to configure your OpenBSD client to connect to
the WPA network:
$ sudo ifconfig ral0 nwid unwiredbsd wpakey 0x1deadbeef9

The command should complete without any output. If you use ifconfig
again to check the interface status, the output will look something like this:
media: IEEE802.11 autoselect (OFDM54 mode 11g)
ieee80211: nwid unwiredbsd chan 1 bssid 00:25:9c:72:cf:60 wpapsk <not
displayed> wpaprotos wpa1,wpa2 wpaakms psk wpaciphers tkip,ccmp wpagroupcipher
tkip 100dBm

Check that the ieee80211: line displays the correct network name and
sensible WPA parameters.
Once you are satisfied that the interface is configured at the link level,
use the dhclient command to configure the interface for TCP/IP, like this:
$ sudo dhclient ral0

The dhclient command should print a summary of its dialogue with the
DHCP server that looks something like this:
DHCPREQUEST on ral0 to 255.255.255.255 port 67
DHCPREQUEST on ral0 to 255.255.255.255 port 67
DHCPACK from 10.50.90.1 (00:25:9c:72:cf:60)
bound to 10.50.90.11 -- renewal in 1800 seconds.

To initialize the interface for IPv6, enter the following:
$ sudo rtsol ral0

The rtsol command normally completes without any messages. Check
the interface configuration with ifconfig to see that the interface did in fact
receive an IPv6 configuration.

Wireless Networks Made Easy   57

FreeBSD Setup
On FreeBSD, you may need to do a bit more work than is necessary with
OpenBSD. Depending on your kernel configuration, you may need to add
the relevant module load lines to /boot/loader.conf. On one of my test systems,
/boot/loader.conf looks like this:
if_rum_load="YES"
wlan_scan_ap_load="YES"
wlan_scan_sta_load="YES"
wlan_wep_load="YES"
wlan_ccmp_load="YES"
wlan_tkip_load="YES"

With the relevant modules loaded, you can join the WEP network we
configured earlier by issuing the following command:
$ sudo ifconfig wlan create wlandev rum0 ssid unwiredbsd wepmode on wepkey 0x1deadbeef9 up

Then, issue this command to get an IPv4 configuration for the
interface:
$ sudo dhclient wlan0

To initialize the interface for IPv6, enter the following:
$ sudo rtsol ral0

The rtsol command normally completes without any messages. Check
the interface configuration with ifconfig to see that the interface did in fact
receive an IPv6 configuration.
For a more permanent configuration, create a start_if.rum0 file (replace
rum0 with the name of the physical interface if it differs) with content like this:
create_args_wlan0="wlandev rum0 ssid unwiredbsd wepmode on wepkey 0x1deadbeef9 up"
ifconfig_wlan0="DHCP"
ifconfig_wlan0_ipv6="inet6 accept_rtadv"

If you want to join the WPA network, you need to set up wpa_supplicant
and change your network interface settings slightly. For the WPA access
point, connect with the following configuration in your start_if.rum0 file:
create_args_wlan0="wlandev rum0"
ifconfig_wlan0="WPA"

## 58. Chapter 4

You also need an /etc/wpa_supplicant.conf file that contains the following:
network={
ssid="unwiredbsd"
psk="0x1deadbeef9"

Finally, add a second ifconfig_wlan0 line in rc.conf to ensure that dhclient
runs correctly.
ifconfig_wlan0="DHCP"

For the IPv6 configuration, add the following line to rc.conf:
ifconfig_wlan0_ipv6="inet6 accept_rtadv"

Other WPA networks may require additional options. After a successful
configuration, the ifconfig output should display something like this:
rum0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 2290
media: IEEE 802.11 Wireless Ethernet autoselect mode 11g
status: associated
wlan0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0 mtu 1500
inet 10.50.90.16 netmask 0xffffff00 broadcast 10.50.90.255
inet6 2001:db8::baad:f00d:1635 prefixlen 64
media: IEEE 802.11 Wireless Ethernet OFDM/36Mbps mode 11g
status: associated
ssid unwiredbsd channel 1 (2412 Mhz 11g) bssid 00:25:9c:72:cf:60
country US authmode WPA2/802.11i privacy ON deftxkey UNDEF
TKIP 2:128-bit txpower 0 bmiss 7 scanvalid 450 bgscan bgscanintvl 300
bgscanidle 250 roam:rssi 7 roam:rate 5 protmode CTS roaming MANUAL

Guarding Your Wireless Network with authpf
Security professionals tend to agree that even though WEP encryption
offers little protection, it’s just barely enough to signal to would-be attackers that you don’t intend to let all and sundry use your network resources.
Using WPA increases security significantly, at the cost of some complexity
in contexts that require the “enterprise”-grade options.
The configurations we’ve built so far in this chapter are functional.
Both the WEP and WPA configurations will let all reasonably configured
wireless clients connect, and that may be a problem in itself because that
configuration doesn’t have any real support built in for letting you decide
who uses your network.

Wireless Networks Made Easy   59

As mentioned earlier, MAC address filtering is not really a solid defense
against attackers because changing a MAC address is just too easy. The OpenBSD developers chose a radically different approach to this problem when
they introduced authpf in OpenBSD version 3.1. Instead of tying access to a
hardware identifier, such as the network card’s MAC address, they decided
that the robust and highly flexible user authentication mechanisms already
in place were more appropriate for the task. The user shell authpf lets the
system load PF rules on a per-user basis, effectively deciding which user gets
to do what.
To use authpf, you create users with the authpf program as their shell. In
order to get network access, the user logs in to the gateway using SSH. Once
the user successfully completes SSH authentication, authpf loads the rules
you have defined for the user or the relevant class of users.
These rules, which usually are written to apply only to the IP address
the user logged in from, stay loaded and in force for as long as the user stays
logged in via the SSH connection. Once the SSH session is terminated, the
rules are unloaded, and in most scenarios, all non-SSH traffic from the
user’s IP address is denied. With a reasonable setup, only traffic originated
by authenticated users will be let through.

On OpenBSD, authpf is one of the login classes offered by default, as you’ll notice the
next time you create a user with adduser.
For systems where the authpf login class isn’t available by default, you
may need to add the following lines to your /etc/login.conf file:
authpf:\
:welcome=/etc/motd.authpf:\
:shell=/usr/sbin/authpf:\
:tc=default:

The next couple of sections contain a few examples that may or may not
fit your situation directly but that I hope will give you ideas you can use.

A Basic Authenticating Gateway
Setting up an authenticating gateway with authpf involves creating and
maintaining a few files besides your basic pf.conf. The main addition is
authpf.rules. The other files are fairly static entities that you won’t be spending much time on once they’ve been created.
Start by creating an empty /etc/authpf/authpf.conf file. This file needs to
be there in order for authpf to work, but it doesn’t actually need any content,
so creating an empty file with touch is appropriate.
The other relevant bits of /etc/pf.conf follow. First, here are the interface
macros:
ext_if = "re0"
int_if = "athn0"

## 60. Chapter 4

In addition, if you define a table called <authpf_users>, authpf will add
the IP addresses of authenticated users to the table:
table <authpf_users> persist

If you need to run NAT, the rules that take care of the translation
could just as easily go in authpf.rules, but keeping them in the pf.conf file
doesn’t hurt in a simple setup like this:
pass out on $ext_if inet from $localnet nat-to ($ext_if)

Here’s pre–OpenBSD 4.7 syntax:
nat on $ext_if inet from $localnet to any -> ($ext_if)

Next, we create the authpf anchor, where rules from authpf.rules are
loaded once the user authenticates:

For pre–OpenBSD 4.7 authpf versions, several anchors were required, so
the corresponding section would be as follows:
nat-anchor "authpf/*"
rdr-anchor "authpf/*"
binat-anchor "authpf/*"

This brings us to the end of the required parts of a pf.conf file for an
authpf setup.

For the filtering part, we start with the block all default and then add
the pass rules we need. The only essential item at this point is to let SSH
traffic pass on the internal network:
pass quick on $int_if proto { tcp, udp } to $int_if port ssh

From here on out, it really is up to you. Do you want to let your clients
have name resolution before they authenticate? If so, put the pass rules for
the TCP and UDP service domain in your pf.conf file, too.
For a relatively simple and egalitarian setup, you could include the rest
of our baseline rule set, changing the pass rules to allow traffic from the
addresses in the <authpf_users> table, rather than any address in your local
network:
pass quick proto { tcp, udp } from <authpf_users> to port $udp_services
pass proto tcp from <authpf_users> to port $client_out

Wireless Networks Made Easy   61

For a more differentiated setup, you could put the rest of your rule set
in /etc/authpf/authpf.rules or per-user rules in customized authpf.rules files in
each user’s directory under /etc/authpf/users/. If your users generally need
some protection, your general /etc/authpf/authpf.rules could have content
client_out = "{ ssh, domain, pop3, auth, nntp, http, https }"
pass quick proto { tcp, udp } from $user_ip to port $udp_services
pass proto tcp from $user_ip to port $client_out

The macro user_ip is built into authpf and expands to the IP address
from which the user authenticated. These rules will apply to any user who
completes authentication at your gateway.
A nice and relatively easy addition to implement is special-case rules
for users with different requirements than your general user population. If
an authpf.rules file exists in the user’s directory under /etc/authpf/users/, the
rules in that file will be loaded for the user. This means that your naive user
Peter who only needs to surf the Web and have access to a service that runs
on a high port on a specific machine could get what he needs with a /etc/
authpf/users/peter/authpf.rules file like this:
client_out = "{ domain, http, https }"
pass inet from $user_ip to 192.168.103.84 port 9000
pass quick inet proto { tcp, udp } from $user_ip to port $client_out

On the other hand, Peter’s colleague Christina runs OpenBSD and
generally knows what she’s doing, even if she sometimes generates traffic
to and from odd ports. You could give her free rein by putting this in
/etc/authpf/users/christina/authpf.rules:
pass from $user_ip os = "OpenBSD" to any

This means Christina can do pretty much anything she likes over
TCP/IP as long as she authenticates from her OpenBSD machines.

Wide Open but Actually Shut
In some settings, it makes sense to set up your network to be open and
unencrypted at the link level, while enforcing some restrictions via authpf.
The next example is very similar to Wi-Fi zones you may encounter in
airports or other public spaces, where anyone can associate to the access
points and get an IP address, but any attempt at accessing the Web will be
redirected to one specific Web page until the user has cleared some sort of
authentication.5

5. Thanks to Vegard Engen for the idea and for showing me his configuration, which is preserved here in spirit, if not in all its details.

## 62. Chapter 4

This pf.conf file is again built on our baseline, with two important additions to the basic authpf setup—a macro and a redirection:
ext_if = "re0"
int_if = "ath0"
auth_web="192.168.27.20"
dhcp_services = "{ bootps, bootpc }" # DHCP server + client
table <authpf_users> persist
pass in quick on $int_if proto tcp from ! <authpf_users> to port http rdr-to $auth_web
match out on $ext_if from $int_if:network nat-to ($ext_if)
pass quick on $int_if inet proto { tcp, udp } to $int_if port $dhcp_services
pass quick inet proto { tcp, udp } from $int_if:network to any port domain
pass quick on $int_if inet proto { tcp, udp } to $int_if port ssh
For older authpf versions, use this file instead:
ext_if = "re0"
int_if = "ath0"
auth_web="192.168.27.20"
dhcp_services = "{ bootps, bootpc }" # DHCP server + client
table <authpf_users> persist
rdr pass on $int_if proto tcp from ! <authpf_users> to any port http -> $auth_web
nat on $ext_if from $localnet to any -> ($ext_if)
nat-anchor "authpf/*"
rdr-anchor "authpf/*"
binat-anchor "authpf/*"
pass quick on $int_if inet proto { tcp, udp } to $int_if port $dhcp_services
pass quick inet proto { tcp, udp } from $int_if:network to port domain
pass quick on $int_if inet proto { tcp, udp } to $int_if port ssh

The auth_web macro and the redirection make sure all Web traffic from
addresses that are not in the <authpf_users> table leads all nonauthenticated
users to a specific address. At that address, you set up a Web server that
serves up whatever you need. This could range from a single page with
instructions on whom to contact in order to get access to the network all the
way up to a system that accepts credit cards and handles user creation.
Note that in this setup, name resolution will work, but all surfing attempts
will end up at the auth_web address. Once the users clear authentication, you
can add general rules or user-specific ones to the authpf.rules files as appropriate for your situation.

Wireless Networks Made Easy   63

B i gg e r o r T r i c k i e r N e t w o r k s

In this chapter, we’ll build on the material
in previous chapters to meet the real-life
challenges of both large and small networks
with relatively demanding applications or
users. The sample configurations in this chapter are
based on the assumption that your packet-filtering
setups will need to accommodate services you run on your local network.
We’ll mainly look at this challenge from a Unix perspective, focusing on
SSH, email, and Web services (with some pointers on how to take care of
other services).
This chapter is about the things to do when you need to combine packet
filtering with services that must be accessible outside your local network.
How much this complicates your rule sets will depend on your network
design and, to a certain extent, on the number of routable addresses you
have available. We’ll begin with configurations for official, routable IPv4
addresses as well as the generally roomier IPv6 address ranges. Then, we’ll
move on to situations with as few as one routable IPv4 address and the
PF-based work-arounds that make the services usable even under these
restrictions.

A Web Server and Mail Server on the Inside:
Routable IPv4 Addresses
How complicated is your network? How complicated does it need to be?
We’ll start with the baseline scenario of the sample clients from
Chapter 3. We set up the clients behind a basic PF firewall and give them
access to a range of services hosted elsewhere but no services running on
the local network. These clients get three new neighbors: a mail server,
a Web server, and a file server. In this scenario, we use official, routable
IPv4 addresses because it makes life a little easier. Another advantage of
this approach is that with routable addresses, we can let two of the new
machines run DNS for our example.com domain: one as the master and the
other as an authoritative slave.1 And as you’ll see, adding IPv6 addresses
and running a dual-stack network won’t necessarily make your rule set
noticeably more complicated.

For DNS, it always makes sense to have at least one authoritative slave server somewhere outside your own network (in fact, some top-level domains won’t let you register
a domain without it). You may also want to arrange for a backup mail server to be
hosted elsewhere. Keep these things in mind as you build your network.
At this stage, we keep the physical network layout fairly simple. We put
the new servers in the same local network as the clients—possibly in a separate server room but certainly on the same network segment or switch as
the clients. Conceptually, the new network looks something like Figure 5-1.
With the basic parameters for the network in place, we can start setting
up a sensible rule set for handling the services we need. Once again, we
start from the baseline rule set and add a few macros for readability.
The macros we need come rather naturally from the specifications:

Web server:
webserver = "{ 192.0.2.227, 2001:db8::baad:f00d:f17 }"

Web server services:

Mail server:
emailserver = "{ 192.0.2.225, 2001:db8::baad:f00d:f117 }"

## 1. In fact, the example.com network here lives in the 192.0.2.0/24 block, which is reserved in
RFC 3330 for example and documentation use. We use this address range mainly to differentiate from the NAT examples elsewhere in this book, which use addresses in the “private”
RFC 1918 address space.

## 66. Chapter 5

192.0.2.0/24
2001:db8::1

2001:db8::baad:f00d:f117

2001:db8::baad:f00d:fbaa

2001:db8::baad:f00d:f17

Figure 5-1: A basic network with servers and clients on the inside

Mail server services:

Name servers:
nameservers = "{ 192.0.2.221, 192.0.2.223 , \
2001:db8::baad:f00d:fbaa, 2001:db8::baad:f00d:ff00 }"

At this point, you’ve probably noticed that both the IPv4 and IPv6 addresses for our
servers are placed fairly close together within their respective address ranges. Some
schools of thought hold that in the case of IPv6, each interface should be allocated
at least a /64 range if your total allocation can bear it. Others have advocated more
modest allocations. The IETF’s current best practice document on the matter is
RFC6177, available from the IETF website (http://www.ietf.org).
We assume that the file server doesn’t need to be accessible to the outside world, unless we choose to set it up with a service that needs to be visible outside the local network, such as an authoritative slave name server for
our domain. Then, with the macros in hand, we add the pass rules. Starting
with the Web server, we make it accessible to the world with the following:
Bigger or Trickier Networks   67

Is sy nprox y Wor th the Trouble?
Over the years, the synproxy state option has received a lot of attention as a
possible bulwark against ill-intentioned traffic from the outside. Specifically,
the synproxy state option was intended to protect against SYN-flood attacks
that could lead to resource exhaustion at the back end.
It works like this: When a new connection is created, PF normally lets
the communication partners handle the connection setup themselves, simply
passing the packets on if they match a pass rule. With synproxy enabled, PF
handles the initial connection setup and hands over the connection to the communication partners only once it’s properly established, essentially creating
a buffer between the communication partners. The SYN proxying is slightly
more expensive than the default keep state, but not necessarily noticeably so
on reasonably scaled equipment.
The potential downsides become apparent in load-balancing setups
where a SYN-proxying PF could accept connections that the backend isn’t
ready to accept, in some cases short-circuiting the redundancy by setting up
connections to hosts other than those the load-balancing logic would have
selected. The classic example here is a pool of HTTP servers with round-robin
DNS. But the problem becomes especially apparent in protocols like SMTP,
where the built-in redundancy dictates (by convention, at least—the actual
RFC is a bit ambiguous) that if a primary mail exchanger isn’t accepting connections, you should try a secondary instead.
When considering a setup where synproxy seems attractive, keep these
issues in mind and analyze the potential impact on your setup that would
come from adding synproxy to the mix. If you conclude that SYN proxying
is needed, simply tack on synproxy state at the end of the rules that need
the option. The rule of thumb is, if you are under active attack, inserting the
synproxy option may be useful as a temporary measure. Under normal circumstances, it isn’t needed as a permanent part of your configuration.

On a similar note, we let the world talk to the mail server:

This lets clients anywhere have the same access as the ones in your local
network, including a few mail-retrieval protocols that may run without
encryption. That’s common enough in the real world, but you might want
to consider your options if you’re setting up a new network.
For the mail server to be useful, it needs to be able to send mail to hosts
outside the local network, too:
pass log proto tcp from $emailserver to port smtp

## 68. Chapter 5

Keep in mind that the rule set starts with a block all rule, which means
that only the mail server is allowed to initiate SMTP traffic from the local
network to the rest of the world. If any of the other hosts on the network
need to send email to or receive email from the outside world, they need
to use the designated mail server. This could be a good way to ensure, for
example, that you make it as hard as possible for any spam-sending zombie
machines that might turn up in your network to deliver their payloads.
Finally, the name servers need to be accessible to clients outside our
network who look up the information about example.com and any other
domains for which we answer authoritatively:
pass proto { tcp, udp } to $nameservers port domain

Having integrated all the services that need to be accessible from the
outside world, our rule set ends up looking roughly like this:
ext_if = "ep0" # macro for external interface - use tun0 or pppoe0 for PPPoE
int_if = "ep1" # macro for internal interface
webserver = "{ 192.0.2.227, 2001:db8::baad:f00d:f17 }"
emailserver = "{ 192.0.2.225, 2001:db8::baad:f00d:f117 }"
nameservers = "{ 192.0.2.221, 192.0.2.223, \
2001:db8::baad:f00d:fbaa, 2001:db8::baad:f00d:ff00 }"
client_out = "{ ssh, domain, pop3, auth, nntp, http,\
https, cvspserver, 2628, 5999, 8000, 8080 }"
icmp6_types = "{ echoreq unreach timex paramprob }"
pass quick proto { tcp, udp } from $localnet to port $udp_services
pass log inet proto icmp all icmp-type $icmp_types
pass proto tcp from $localnet to port $client_out
pass proto { tcp, udp } to $nameservers port domain
pass log proto tcp to $emailserver port $email
pass log proto tcp from $emailserver to port smtp

This is still a fairly simple setup, but unfortunately, it has one potentially troubling security disadvantage. The way this network is designed, the
servers that offer services to the world at large are all in the same local network
as your clients, and you’d need to restrict any internal services to only local
access. In principle, this means that an attacker would need to compromise
only one host in your local network to gain access to any resource there,
putting the miscreant on equal footing with any user in your local network.
Depending on how well each machine and resource are protected from
unauthorized access, this could be anything from a minor annoyance to a
major headache.

Bigger or Trickier Networks   69

In the next section, we’ll look at some options for segregating the services that need to interact with the world at large from the local network.

A Degree of Separation: Introducing the DMZ
In the previous section, you saw how to set up services on your local network and make them selectively available to the outside world through
a sensible PF rule set. For more fine-grained control over access to your
internal network, as well as the services you need to make it visible to the
rest of the world, add a degree of physical separation. Even a separate virtual
local area network (VLAN) will do nicely.
Achieving the physical and logical separation is fairly easy: Simply
move the machines that run the public services to a separate network that’s
attached to a separate interface on the gateway. The net effect is a separate
network that isn’t quite part of your local network but isn’t entirely in the
public part of the Internet either. Conceptually, the segregated network
looks like Figure 5-2.

192.0.2.0/24
2001:db8::1

$dmz_if
192.0.2.128/25
2001:db8::baad:f00d:1

2001:db8:baad:f00d:f117

2001:db8::baad:f00d:f17

2001:db8::baad:f00d:fbaa

Figure 5-2: A network with the servers in a DMZ

## 70. Chapter 5

Think of this little network as a zone of relative calm between the territories of hostile factions. It’s no great surprise that a few years back, someone coined the phrase
demilitarized zone (DMZ) to describe this type of configuration.

For address allocation, you can segment off an appropriately sized chunk
of your official address space for the new DMZ network. Alternatively, you
can move those parts of your network that don’t have a specific need to run
with publicly accessible and routable IPv4 addresses into a NAT environment.
Either way, you end up with at least one more interface in your filtering configuration. As you’ll see later, if you’re really short of official IPv4 addresses,
it’s possible to run a DMZ setup in all-NAT environments as well.
The adjustments to the rule set itself don’t need to be extensive. If necessary, you can change the configuration for each interface. The basic ruleset logic remains, but you may need to adjust the definitions of the macros
(webserver, mailserver, nameservers, and possibly others) to reflect your new
network layout.
In our example, we could choose to segment off the part of our address
ranges where we’ve already placed our servers. If we leave some room for
growth, we can set up the IPv4 range for the new dmz_if on a /25 ­subnet with
a network address and netmask of 192.0.2.128/255.255.255.128. This leaves
us with 192.0.2.129 through 192.0.2.254 as the usable address range for hosts
in the DMZ. As we’ve already placed our servers in the 2001:db8::baad:f00d:
0/112 network (with a measly 65,536 addresses to play with), the easiest way
forward for the IPv6 range is to segment off that network, too, and assign
the interface facing the network an appropriate IPv6 address, like the one
in Figure 5-2.
With that configuration and no changes in the IP addresses assigned to
the servers, you don’t really need to touch the rule set at all for the packet
filtering to work after setting up a physically segregated DMZ. That’s a nice
side effect, which could be due to either laziness or excellent long-range
planning. Either way, it underlines the importance of having a sensible
address-allocation policy in place.
It might be useful to tighten up your rule set by editing your pass rules
so the traffic to and from your servers is allowed to pass only on the interfaces that are actually relevant to the services:
pass in on $ext_if proto { tcp, udp } to $nameservers port domain
pass in on $int_if proto { tcp, udp } from $localnet to $nameservers \
port domain
pass out on $dmz_if proto { tcp, udp } to $nameservers port domain
pass in on $ext_if proto tcp to $webserver port $webports
pass out on $dmz_if proto tcp to $webserver port $webports
pass in log on $int_if proto tcp from $localnet to $mailserver \
port $email
pass out log on $dmz_if proto tcp to $mailserver port smtp
pass in on $dmz_if from $mailserver to port smtp
pass out log on $ext_if proto tcp from $mailserver to port smtp

You could choose to make the other pass rules that reference your local
network interface-specific, too, but if you leave them intact, they’ll continue
to work.
Bigger or Trickier Networks   71

Sharing the Load: Redirecting to a Pool of Addresses
Once you’ve set up services to be accessible to the world at large, one likely
scenario is that over time, one or more of your services will grow more
sophisticated and resource-hungry or simply attract more traffic than you
feel comfortable serving from a single server.
There are a number of ways to make several machines share the load
of running a service, including ways to fine-tune the service itself. For the
network-level load balancing, PF offers the basic functionality you need via
redirection to tables or address pools. In fact, you can implement a form of
load balancing without even touching your pass rules, at least if your environment is not yet dual-stack.
Take the Web server in our example. We already have the macro that
represents a service, our Web server. For reasons that will become obvious
in a moment, we need to reduce that macro to represent only the public
IPv4 address (webserver = "192.0.2.227"), which, in turn, is associated with
the hostname that your users have bookmarked, possibly www.example.com.
When the time comes to share the load, set up the required number of
identical, or at least equivalent, servers and then alter your rule set slightly
to introduce the redirection. First, define a table that holds the addresses
for your Web server pool’s IPv4 addresses:
table <webpool> persist { 192.0.2.214, 192.0.2.215, 192.0.2.216, 192.0.2.217 }

Then, perform the redirection:
match in on $ext_if protp tcp to $webserver port $webports \
rdr-to <webpool> round-robin

Unlike the redirections in earlier examples, such as the FTP proxy in
Chapter 3, this rule sets up all members of the webpool table as potential
redirection targets for incoming connections intended for the webports ports
on the webserver address. Each incoming connection that matches this rule
is redirected to one of the addresses in the table, spreading the load across
several hosts. You may choose to retire the original Web server once the
switch to this redirection is complete, or you may let it be absorbed in the
new Web server pool.
On PF versions earlier than OpenBSD 4.7, the equivalent rule is as follows:
rdr on $ext_if proto tcp to $webserver port $webports -> <webpool> round-robin

In both cases, the round-robin option means that PF shares the load
between the machines in the pool by cycling through the table of redirection addresses sequentially.
Some applications expect accesses from each individual source address
to always go to the same host in the backend (for example, there are services that depend on client- or session-specific parameters that will be lost
if new connections hit a different host in the backend). If your configuration needs to cater to such services, you can add the sticky-address option
72   Chapter 5

to make sure that new connections from a client are always redirected to
the same machine behind the redirection as the initial connection. The
downside to this option is that PF needs to maintain source-tracking data
for each client, and the default value for maximum source nodes tracked is
set at 10,000, which may be a limiting factor. (See Chapter 10 for advice on
adjusting this and similar limit values.)
When even load distribution isn’t an absolute requirement, selecting
the redirection address at random may be appropriate:
match in on $ext_if proto tcp to $webserver port $webports \
rdr-to <webpool> random

On pre–OpenBSD 4.7 PF versions, the random option isn’t supported for redirection to
tables or lists of addresses.
Even organizations with large pools of official, routable IPv4 addresses
have opted to introduce NAT between their load-balanced server pools and the
Internet at large. This technique works equally well in various NAT-based setups, but moving to NAT offers some additional possibilities and challenges.
In order to accommodate an IPv4 and IPv6 dual-stack environment in
this way, you’ll need to set up separate tables for address pools and separate
pass or match rules with redirections for IPv4 and IPv6. A single table of both
IPv4 and IPv6 addresses may sound like an elegant idea at first, but the
simple redirection rules outlined here aren’t intelligent enough to make
correct redirection decisions based on the address family of individual
table entries.

Getting Load Balancing Right with relayd
After you’ve been running for a while with load balancing via round-robin
redirection, you may notice that the redirection doesn’t automatically adapt
to external conditions. For example, unless special steps are taken, if a host
in the list of redirection targets goes down, traffic will still be redirected to
the IP addresses in the list of possibilities.
Clearly, a monitoring solution is needed. Fortunately, the OpenBSD
base system provides one. The relay daemon relayd2 interacts with your PF
configuration, providing the ability to weed out nonfunctioning hosts from
your pool. Introducing relayd into your setup, however, may require some
minor changes to your rule set.
The relayd daemon works in terms of two main classes of services that it
refers to as redirects and relays. It expects to be able to add or subtract hosts’
IP addresses to or from the PF tables it controls. The daemon interacts
