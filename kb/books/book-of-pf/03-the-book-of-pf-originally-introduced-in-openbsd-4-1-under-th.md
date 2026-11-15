---
id: book-of-pf-03
title: "The Book of PF — Originally introduced in OpenBSD 4.1 under the name hoststated…",
slug: book-of-pf-03-the-book-of-pf-originally-introduced-in-openbsd-4-1-under-th
source: "The Book of PF, 3rd Edition",
sourceSection: "2. Originally introduced in OpenBSD 4.1 under the name hoststated, the daemon has seen, 74. Chapter 5, 76. Chapter 5, 3. See the OpenSSL man page for further explanation of cipher-related options., 78. Chapter 5, 80. Chapter 5, 82. Chapter 5, 5. How much security this actually adds is a matter of oc"
track: bsd-internals,
tier: premium
tags: [firewall, pf, networking, security]
summary: "To see how we can make our sample configuration work a little better by Covers 22 sections: Originally introduced in OpenBSD 4.1 under the name hoststated, the daemon has seen, Chapter 5, Chapter 5.",
---
# The Book of PF — Originally introduced in OpenBSD 4.1 under the name hoststated…

## 2. Originally introduced in OpenBSD 4.1 under the name hoststated, the daemon has seen
active development (mainly by Reyk Floeter and Pierre-Yves Ritschard) over several years,
including a few important changes to the configuration syntax, and it was renamed relayd in
time for the OpenBSD 4.3 release.
Bigger or Trickier Networks   73

with your rule set through a special-purpose anchor named relayd (and in
pre–OpenBSD 4.7 versions, also a redirection anchor, rdr-anchor, with the
same name).
To see how we can make our sample configuration work a little better by
using relayd, we’ll look back at the load-balancing rule set. Starting from the
top of your pf.conf file, add the anchor for relayd to insert rules as needed:
anchor "relayd/*"

On pre–OpenBSD 4.7 versions, you also need the redirection anchor:
rdr-anchor "relayd/*"
anchor "relayd/*"

In the load-balancing rule set, we had the following definition for our
Web server pool:
table webpool persist { 192.0.2.214, 192.0.2.215, 192.0.2.216, 192.0.2.217 }

It has this match rule to set up the redirection:
match in on $ext_if proto tcp to $webserver port $webports \
rdr-to <webpool> round-robin

Or on pre–OpenBSD 4.7 versions, you’d use the following:
rdr on $ext_if proto tcp to $webserver port $webports -> <webpool> round-robin

To make this configuration work slightly better, we remove the redirection and the table (remember to take care of both sets in a dual-stack
configuration), and we let relayd handle the redirection or redirections by
setting up its own versions inside the anchor. (Don’t remove the pass rule,
however, because your rule set will still need to have a pass rule that lets
traffic flow to the IP addresses in relayd’s tables. If you had separate rules
for your inet and inet6 traffic, you may be able to merge those rules back
into one.)
Once the pf.conf parts have been taken care of, we turn to relayd’s own
relayd.conf configuration file. The syntax in this configuration file is similar
enough to pf.conf to make it fairly easy to read and understand. First, we add
the macro definitions we’ll be using later:
web1="192.0.2.214"
web2="192.0.2.215"
web3="192.0.2.216"
web4="192.0.2.217"
webserver="192.0.2.227"
sorry_server="192.0.2.200"

## 74. Chapter 5

All of these correspond to definitions we could have put in a pf.conf file.
The default checking interval in relayd is 10 seconds, which means that a
host could be down for almost 10 seconds before it’s taken offline. Being
cautious, we’ll set the checking interval to 5 seconds to minimize visible
downtime, with the following line:
interval 5 # check hosts every 5 seconds

Now, we make a table called webpool that uses most of the macros:
table <webpool> { $web1, $web2, $web3, $web4 }

For reasons we’ll return to shortly, we define one other table:
table <sorry> { $sorry_server }

At this point, we’re ready to set up the redirect:
redirect www {
listen on $webserver port 80 sticky-address
tag relayd
forward to <webpool> check http "/status.html" code 200 timeout 300
forward to <sorry> timeout 300 check icmp

This redirect says that connections to port 80 should be redirected to
the members of the webpool table. The sticky-address option has the same
effect here as the rdr-to in PF rules: New connections from the same source
IP address (within the time interval defined by the timeout value) are redirected to the same host in the backend pool as the previous ones.
The relayd daemon should check to see whether a host is available by
asking it for the file /status.html, using the protocol HTTP, and expecting
the return code to be equal to 200. This is the expected result for a client
asking a running Web server for a file it has available.
No big surprises so far, right? The relayd daemon will take care of
excluding hosts from the table if they go down. But what if all the hosts in
the webpool table go down? Fortunately, the developers thought of that, too,
and introduced the concept of backup tables for services. This is the last
part of the definition for the www service, with the table sorry as the backup
table: The hosts in the sorry table take over if the webpool table becomes
empty. This means that you need to configure a service that’s able to offer
a “Sorry, we’re down” message in case all the hosts in your webpool fail.
If you’re running an IPv6-only service, you should, of course, substitute your IPv6 addresses for the ones given in the example earlier. If you’re
running a dual-stack setup, you should probably set up the load-balancing
mechanism separately for each protocol, where the configurations differ
only in names (append a 4 or 6, for example, to the IPv4 and IPv6 sets of
names, respectively) and the addresses themselves.

Bigger or Trickier Networks   75

With all of the elements of a valid relayd configuration in place, you can
enable your new configuration.
Before you actually start relayd, add an empty set of relayd_flags to your
/etc/rc.conf.local to enable:
relayd_flags="" # for normal use: ""

Reload your PF rule set and then start relayd. If you want to check your
configuration before actually starting relayd, you can use the -n commandline option to relayd:
$ sudo relayd -n

If your configuration is correct, relayd displays the message configuration
OK and exits.

To actually start the daemon, you could start relayd without any commandline flags, but as with most daemons, it’s better to start it via its rc script
wrapper stored in /etc/rc.d/, so the following sequence reloads your edited
PF configuration and enables relayd.
$ sudo pfctl -f /etc/pf.conf
$ sudo sh /etc/rc.d/relayd start

With a correct configuration, both commands will silently start, without
displaying any messages. (If you prefer more verbose messages, both pfctl
and relayd offer the -v flag. For relayd, you may want to add the -v flag to
the rc.conf.local entry.) You can check that relayd is running with top or ps.
In both cases, you’ll find three relayd processes, roughly like this:
$ ps waux | grep relayd
_relayd
9153 0.0 0.1
(relayd)
_relayd
6144 0.0 0.1
(relayd)
root
3217 0.0 0.1

776

1424 ??

S

7:28PM

0:00.01 relayd: pf update engine

776

1440 ??

S

7:28PM

0:00.02 relayd: host check engine

776

1416 ??

Is

7:28PM

0:00.01 relayd: parent (relayd)

And as we mentioned earlier, with an empty set of relayd_flags in your
rc.conf.local file, relayd is enabled at startup. However, once the configuration is enabled, most of your interaction with relayd will happen through
the relayctl administration program. In addition to letting you monitor
status, relayctl lets you reload the relayd configuration and selectively disable or enable hosts, tables, and services. You can even view service status
interactively, as follows:
$ sudo relayctl show summary
Id
Type
Name
redirect
www
webpool:80
192.0.2.214
192.0.2.215

## 76. Chapter 5

Avlblty Status
active
active (2 hosts)

192.0.2.216
192.0.2.217
sorry:80
127.0.0.1

active (1 hosts)

In this example, the webpool is seriously degraded, with only two of four
hosts up and running. Fortunately, the backup table is still functioning, and
hopefully it’ll still be up if the last two servers fail as well. For now, all tables
are active with at least one host up. For tables that no longer have any members, the Status column changes to empty. Asking relayctl for host information shows the status information in a host-centered format:
$ sudo relayctl show hosts
Id
Type
Name
Avlblty Status
webpool:80
active (3 hosts)
192.0.2.214
total: 11340/11340 checks
192.0.2.215
total: 0/11340 checks, error: tcp connect failed
192.0.2.216
total: 11340/11340 checks
192.0.2.217
total: 0/11340 checks, error: tcp connect failed
sorry:80
active (1 hosts)
127.0.0.1
total: 11340/11340 checks

If you need to take a host out of the pool for maintenance (or any timeconsuming operation), you can use relayctl to disable it, as follows:
$ sudo relayctl host disable 192.0.2.217

In most cases, the operation will display command succeeded to indicate
that the operation completed successfully. Once you’ve completed maintenance and put the machine online, you can reenable it as part of relayd’s
pool with this command:
$ sudo relayctl host enable 192.0.2.217

Again, you should see the message command succeeded almost immediately
to indicate that the operation was successful.
In addition to the basic load balancing demonstrated here, relayd has
been extended in recent OpenBSD versions to offer several features that
make it attractive in more complex settings. For example, it can now handle
Layer 7 proxying or relaying functions for HTTP and HTTPS, including
protocol handling with header append and rewrite, URL-path append and
rewrite, and even session and cookie handling. The protocol handling needs
to be tailored to your application. For example, the following is a simple
HTTPS relay for load balancing the encrypted Web traffic from clients to
the Web servers.
Bigger or Trickier Networks   77

http protocol "httpssl" {
header append "$REMOTE_ADDR" to "X-Forwarded-For"
header append "$SERVER_ADDR:$SERVER_PORT" to "X-Forwarded-By"
header change "Keep-Alive" to "$TIMEOUT"
query hash "sessid"
cookie hash "sessid"
path filter "*command=*" from "/cgi-bin/index.cgi"
ssl { sslv2, ciphers "MEDIUM:HIGH" }
tcp { nodelay, sack, socket buffer 65536, backlog 128 }

This protocol handler definition demonstrates a range of simple operations on the HTTP headers and sets both SSL parameters and specific TCP
parameters to optimize connection handling. The header options operate on
the protocol headers, inserting the values of the variables by either appending to existing headers (append) or changing the content to a new value (change).
The URL and cookie hashes are used by the load balancer to select to
which host in the target pool the request is forwarded. The path filter
specifies that any get request, including the first quoted string as a substring of the second, is to be dropped. The ssl options specify that only
SSL version 2 ciphers are accepted, with key lengths in the medium-to-high
range—in other words, 128 bits or more.3 Finally, the tcp options specify
nodelay to minimize delays, specify the use of the selective acknowledgment
method (RFC 2018), and set the socket buffer size and the maximum allowed
number of pending connections the load balancer keeps track of. These
options are examples only; in most cases, your application will perform
well with these settings at their default values.
The relay definition using the protocol handler follows a pattern that
should be familiar given the earlier definition of the www service:
relay wwwssl {
listen on $webserver port 443 ssl
protocol "httpssl"
table <webhosts> loadbalance check ssl

Still, your SSL-enabled Web applications will likely benefit from a
slightly different set of parameters.

We’ve added a check ssl, assuming that each member of the webhosts table is properly configured to complete an SSL handshake. Depending on your application, it
may be useful to look into keeping all SSL processing in relayd, thus offloading the
encryption-handling tasks from the backends.

## 3. See the OpenSSL man page for further explanation of cipher-related options.

## 78. Chapter 5

Finally, for CARP-based failover of the hosts running relayd on your
network (see Chapter 8 for information about CARP), relayd can be configured to support CARP interaction by setting the CARP demotion counter
for the specified interface groups at shutdown or startup.
Like all others parts of the OpenBSD system, relayd comes with informative man pages. For the angles and options not covered here (there are a
few), dive into the man pages for relayd, relayd.conf, and relayctl and start
experimenting to find just the configuration you need.

A Web Server and Mail Server on the Inside—The NAT Version
Let’s backtrack a little and begin again with the baseline scenario where the
sample clients from Chapter 3 get three new neighbors: a mail server, a Web
server, and a file server. This time around, externally visible IPv4 addresses
are either not available or too expensive, and running several other services
on a machine that’s primarily a firewall isn’t desirable. This means we’re
back to the situation where we do our NAT at the gateway. Fortunately, the
redirection mechanisms in PF make it relatively easy to keep servers on the
inside of a gateway that performs NAT.
The network specifications are the same as for the example.com setup we
just worked through: We need to run a Web server that serves up data in
cleartext (http) and encrypted (https) form, and we want a mail server that
sends and receives email while letting clients inside and outside the local
network use a number of well-known submission and retrieval protocols. In
short, we want pretty much the same features as in the setup from the previous section, but with only one routable address.
Of the three servers, only the Web server and the mail server need to
be visible to the outside world, so we add macros for their IP addresses and
services to the Chapter 3 rule set:
webserver = "192.168.2.7"
emailserver = "192.168.2.5"

With only one routable address and the servers hidden in NATed
address space, we need to set up rules at the gateway that redirect the traffic we want our servers to handle. We could define a set of match rules to set
up the redirection and then address the block or pass question in a separate
set of rules later, like this:
match in on $ext_if proto tcp to $ext_if port $webports rdr-to $webserver
match in on $ext_if proto tcp to $ext_if port $email rdr-to $emailserver
pass proto tcp from $emailserver to port smtp

Bigger or Trickier Networks   79

This combination of match and pass rules is very close to the way things
were done in pre–OpenBSD 4.7 PF versions, and if you’re upgrading from a
previous version, this is the kind of quick edit that could bridge the syntax
gap quickly. But you could also opt to go for the new style and write this
slightly more compact version instead:
pass in on $ext_if inet proto tcp to $ext_if port $webports rdr-to $webserver tag RDR
pass in on $ext_if inet proto tcp to $ext_if port $email rdr-to $mailserver tag RDR
pass on $int_if inet tagged RDR

Note the use of pass rules with rdr-to. This combination of filtering and
redirection will help make things easier in a little while, so try this combination for now.
On pre–OpenBSD 4.7 PF, the rule set will be quite similar, except in
the way that we handle the redirections.
webserver = "192.168.2.7"
emailserver = "192.168.2.5"
rdr on $ext_if proto tcp to $ext_if port $webports -> $webserver
rdr on $ext_if proto tcp to $ext_if port $email -> $emailserver
pass proto tcp from $emailserver to any port smtp

DMZ with NAT
With an all-NAT setup, the pool of available addresses to allocate for a DMZ
is likely to be larger than in our previous example, but the same principles
apply. When you move the servers off to a physically separate network, you’ll
need to check that your rule set’s macro definitions are sane and adjust the
values if necessary.
Just as in the routable-addresses case, it might be useful to tighten
up your rule set by editing your pass rules so the traffic to and from your
­servers is allowed to pass on only the interfaces that are actually relevant
to the services:
pass in on $ext_if inet proto tcp to $ext_if port $webports rdr-to $webserver
pass in on $int_if inet proto tcp from $localnet to $webserver port $webports
pass out on $dmz_if proto tcp to $webserver port $webports
pass in log on $ext_if inet proto tcp to $ext_if port $email rdr-to $mailserver
pass out log on $dmz_if proto tcp to $mailserver port smtp
pass in on $dmz_if from $mailserver to port smtp
pass out log on $ext_if proto tcp from $mailserver to port smtp

## 80. Chapter 5

The version for pre–OpenBSD 4.7 PF differs in some details, with the
redirection still in separate rules:
pass in on $ext_if proto tcp to $webserver port $webports
pass out on $dmz_if proto tcp to $webserver port $webports
pass out log on $dmz_if proto tcp to $mailserver port smtp
pass in on $dmz_if from $mailserver to port smtp
pass out log on $ext_if proto tcp from $mailserver to port smtp

You could create specific pass rules that reference your local network
interface, but if you leave the existing pass rules intact, they’ll continue to work.

Redirection for Load Balancing
The redirection-based load-balancing rules from the previous example work
equally well in a NAT regime, where the public address is the gateway’s external interface and the redirection addresses are in a private range.
Here’s the webpool definition:
table <webpool> persist { 192.168.2.7, 192.168.2.8, 192.168.2.9, 192.168.2.10 }

The main difference between the routable-address case and the NAT
version is that after you’ve added the webpool definition, you edit the existing
pass rule with redirection, which then becomes this:
pass in on $ext_if inet proto tcp to $ext_if port $webports rdr-to <webpool> round-robin

Or for pre–OpenBSD 4.7 PF versions, use this:
rdr on $ext_if proto tcp to $ext_if port $webports -> <webpool> round-robin

From that point on, your NATed DMZ behaves much like the one with
official, routable addresses.

You can configure a valid IPv6 setup to coexist with a NATed IPv4 setup like this
one, but if you choose to do so, be sure to treat inet and inet6 traffic separately in
your PF rules. And contrary to popular belief, rules with nat-to and rdr-to options
work in IPv6 configurations the same as in IPv4.

Back to the Single NATed Network
It may surprise you to hear that there are cases where setting up a small
network is more difficult than working with a large one. For example,
returning to the situation where the servers are on the same physical

Bigger or Trickier Networks   81

network as the clients, the basic NATed configuration works very well—up
to a point. In fact, everything works brilliantly as long as all you’re interested in is getting traffic from hosts outside your local network to reach
your servers.
Here’s the full configuration:
proxy = "127.0.0.1"
client_out = "{ ssh, domain, pop3, auth, nntp, http, https, \
446, cvspserver, 2628, 5999, 8000, 8080 }"
webserver = "192.168.2.7"
emailserver = "192.168.2.5"
match out on $ext_if from $localnet nat-to ($ext_if)
anchor "ftp-proxy/*"
pass in quick proto tcp to port ftp rdr-to $proxy port 8021
pass out proto tcp from $proxy to port ftp
pass quick inet proto { tcp, udp } to port $udp_services
pass proto tcp to port $client_out
pass out on $ext_if inet proto udp to port 33433 >< 33626 keep state
pass inet proto icmp icmp-type $icmp_types from $localnet
pass inet proto icmp icmp-type $icmp_types to $ext_if
pass in on $ext_if inet proto tcp to $ext_if port $webports rdr-to $webserver
pass in on $ext_if inet proto tcp to $ext_if port $email rdr-to $mailserver
pass on $int_if inet proto tcp to $webserver port $webports
pass on $int_if inet proto tcp to $mailserver port $email

The last four rules here are the ones that interest us the most. If you
try to reach the services on the official address from hosts in your own
network, you’ll soon see that the requests for the redirected services from
machines in your local network most likely never reach the external interface. This is because all the redirection and translation happens on the
external interface. The gateway receives the packets from your local network
on the internal interface, with the destination address set to the external
interface’s address. The gateway recognizes the address as one of its own
and tries to handle the request as if it were directed at a local service; as a
consequence, the redirections don’t quite work from the inside.

## 82. Chapter 5

The equivalent part to those last four lines of the preceding rule set for
pre–OpenBSD 4.7 systems looks like this:
rdr on $ext_if proto tcp to $ext_if port
rdr on $ext_if proto tcp to $ext_if port

$webports -> $webserver
$email -> $emailserver

pass proto tcp from $emailserver to any port smtp

Fortunately, several work-arounds for this particular problem are possible. The problem is common enough that the PF User Guide lists four
different solutions to the problem,4 including moving your servers to a DMZ,
as described earlier. Because this is a PF book, we’ll concentrate on a PFbased solution (actually a pretty terrible work-around), which consists of
treating the local network as a special case for our redirection and NAT
rules.
We need to intercept the network packets originating in the local network and handle those connections correctly, making sure that any return
traffic is directed to the communication partner who actually originated
the connection. This means that in order for the redirections to work as
expected from the local network, we need to add special-case redirection
rules that mirror the ones designed to handle requests from the outside.
First, here are the pass rules with redirections for OpenBSD 4.7 and newer:
pass in on $ext_if inet proto tcp to $ext_if port $webports rdr-to $webserver
pass in on $ext_if inet proto tcp to $ext_if port $email rdr-to $mailserver
pass in log on $int_if inet proto tcp from $int_if:network to $ext_if \
port $webports rdr-to $webserver
pass in log on $int_if inet proto tcp from $int_if:network to $ext_if \
port $email rdr-to $mailserver
match out log on $int_if proto tcp from $int_if:network to $webserver \
port $webports nat-to $int_if
pass on $int_if inet proto tcp to $webserver port $webports
match out log on $int_if proto tcp from $int_if:network to $mailserver \
port $email nat-to $int_if
pass on $int_if inet proto tcp to $mailserver port $email

The first two rules are identical to the original ones. The next two
intercept the traffic from the local network, and the rdr-to actions in both
rewrite the destination address, much as the corresponding rules do for the
traffic that originates elsewhere. The pass on $int_if rules serve the same
purpose as in the earlier version.
The match rules with nat-to are there as a routing work-around. Without
them, the webserver and mailserver hosts would route return traffic for the
redirected connections directly back to the hosts in the local network, where
the traffic wouldn’t match any outgoing connection. With the nat-to in
4. See the “Redirection and Reflection” section in the PF User Guide (http://www.openbsd.org/
faq/pf/rdr.html#reflect).
Bigger or Trickier Networks   83

place, the servers consider the gateway as the source of the traffic and will
direct return traffic back the same path it came originally. The gateway
matches the return traffic to the states created by connections from the clients in the local network and applies the appropriate actions to return the
traffic to the correct clients.
The equivalent rules for pre–OpenBSD 4.7 versions are at first sight a
bit more confusing, but the end result is the same.
rdr on $int_if proto tcp from $localnet to $ext_if port $webports -> $webserver
rdr on $int_if proto tcp from $localnet to $ext_if port $email -> $emailserver
no nat on $int_if proto tcp from $int_if to $localnet
nat on $int_if proto tcp from $localnet to $webserver port $webports -> $int_if
nat on $int_if proto tcp from $localnet to $emailserver port $email -> $int_if

This way, we twist the redirections and the address translation logic to
do what we need, and we don’t need to touch the pass rules at all. (I’ve had
the good fortune to witness via email and IRC the reactions of several network admins at the moment when the truth about this five-line reconfiguration sank in.)

Filtering on Interface Groups
Your network could have several subnets that may never need to interact with
your local network except for some common services, like email, Web, file,
and print. How you handle the traffic from and to such subnets depends
on how your network is designed. One useful approach is to treat each lessprivileged network as a separate local network attached to its own separate
interface on a common filtering gateway and then to give it a rule set that
allows only the desired direct interaction with the neighboring networks
attached to the main gateway.
You can make your PF configuration more manageable and readable by
grouping logically similar interfaces into interface groups and by applying
filtering rules to the groups rather than the individual interfaces. Interface
groups, as implemented via the ifconfig group option, originally appeared in
OpenBSD 3.6 and have been adopted in FreeBSD 7.0 onward.
All configured network interfaces can be configured to belong to one
or more groups. Some interfaces automatically belong to one of the default
groups. For example, all IEEE 802.11 wireless network interfaces belong to
the wlan group, while interfaces associated with the default routes belong
to the egress group. Fortunately, an interface can be a member of several
groups, and you can add interfaces to interface groups via the appropriate
ifconfig command, as in this example:

For a permanent configuration, the equivalent under OpenBSD would
be in the hostname.sis2 file or the ifconfig_sis2= line in the rc.conf file on
FreeBSD 7.0 or later.
84   Chapter 5

Where it makes sense, you can then treat the interface group much the
same as you would handle a single interface in filtering rules:
pass in on untrusted to any port $webports
pass out on egress to any port $webports

If by now you’re thinking that in most, if not all, the rule-set examples
up to this point, it would be possible to filter on the group egress instead of
the macro $ext_if, you’ve grasped an important point. It could be a useful
exercise to go through any existing rule sets you have and see what using
interface groups can do to help readability even further. Remember that
an interface group can have one or more members.
Note that filtering on interface groups makes it possible to write essentially hardware-independent rule sets. As long as your hostname.if files or
ifconfig_if= lines put the interfaces in the correct groups, rule sets that consistently filter on interface groups will be fully portable between machines
that may or may not have identical hardware configurations.
On systems where the interface group feature isn’t available, you may be
able to achieve some of the same effects via creative use of macros, as follows:
untrusted = "{ ath0 ath1 wi0 ep0 }"
egress = "sk0"

The Power of Tags
In some networks, the decision of where a packet should be allowed to pass
can’t be made to map easily to criteria like subnet and service. The finegrained control the site’s policy demands could make the rule set complicated and potentially hard to maintain.
Fortunately, PF offers yet another mechanism for classification and
filtering in the form of packet tagging. The useful way to implement packet
tagging is to tag incoming packets that match a specific pass rule and then
let the packets pass elsewhere based on which identifiers the packet is tagged
with. In OpenBSD 4.6 and later, it’s even possible to have separate match
rules that tag according to the match criteria, leaving decisions on passing,
redirecting, or taking other actions to rules later in the rule set.
One example could be the wireless access points we set up in Chapter 4,
which we could reasonably expect to inject traffic into the local network
with an apparent source address equal to the access point’s $ext_if address.
In that scenario, a useful addition to the rule set of a gateway with several of
these access points might be the following (assuming, of course, that definitions of the wifi_allowed and wifi_ports macros fit the site’s requirements):
wifi = "{ 10.0.0.115, 10.0.0.125, 10.0.0.135, 10.0.0.145 }"
pass in on $int_if from $wifi to $wifi_allowed port $wifi_ports tag wifigood
pass out on $ext_if tagged wifigood

Bigger or Trickier Networks   85

As the complexity of the rule set grows, consider using tag in incoming
match and pass rules to make your rule set readable and easier to maintain.
Tags are sticky, and once a packet has been tagged by a matching rule,
the tag stays, which means that a packet can have a tag even if it wasn’t
applied by the last matching rule. However, a packet can have only one tag
at any time. If a packet matches several rules that apply tags, the tag will be
overwritten with a new one by each new matching tag rule.
For example, you could set several tags on incoming traffic via a set of
match or pass rules, supplemented by a set of pass rules that determine where
packets pass out based on the tags set on the incoming traffic.

The Bridging Firewall
An Ethernet bridge consists of two or more interfaces that are configured
to forward Ethernet frames transparently and that aren’t directly visible to
the upper layers, such as the TCP/IP stack. In a filtering context, the bridge
configuration is often considered attractive because it means that the filtering can be performed on a machine that doesn’t have its own IP addresses.
If the machine in question runs OpenBSD or a similarly capable operating
system, it can still filter and redirect traffic.
The main advantage of such a setup is that attacking the firewall itself
is more difficult. 5 The disadvantage is that all admin tasks must be performed at the firewall’s console, unless you configure a network interface
that’s reachable via a secured network of some kind or even a serial console.
It also follows that bridges with no IP address configured can’t be set as the
gateway for a network and can’t run any services on the bridged interfaces.
Rather, you can think of a bridge as an intelligent bulge on the network
cable, which can filter and redirect.
A few general caveats apply to using firewalls implemented as bridges:

The interfaces are placed in promiscuous mode, which means that they’ll
receive (and to some extent process) every packet on the network.
Bridges operate on the Ethernet level and, by default, forward all types
of packets, not just TCP/IP.
The lack of IP addresses on the interfaces makes some of the more
effective redundancy features, such as CARP, unavailable.

The method for configuring bridges differs among operating systems
in some details. The following examples are very basic and don’t cover all
possible wrinkles, but they should be enough to get you started.

## 5. How much security this actually adds is a matter of occasional heated debate on mailing
lists such as openbsd-misc and other networking-oriented lists. Reading up on the pros and
cons as perceived by core OpenBSD developers can be entertaining as well as enlightening.

## 86. Chapter 5

Basic Bridge Setup on OpenBSD
The OpenBSD GENERIC kernel contains all the necessary code to configure bridges and filter on them. Unless you’ve compiled a custom kernel
without the bridge code, the setup is quite straightforward.

On OpenBSD 4.7 and newer, the brconfig command no longer exists. All bridge configuration and related functionality was merged into ifconfig for the OpenBSD 4.7
release. If you’re running on an OpenBSD release where brconfig is available, you’re
running an out-of-date, unsupported configuration. Please upgrade to a more recent
version as soon as feasible.
To set up a bridge with two interfaces on the command line, you first
create the bridge device. The first device of a kind is conventionally given
the sequence number 0, so we create the bridge0 device with the following
command:
$ sudo ifconfig bridge0 create

Before the next ifconfig command, use ifconfig to check that the prospective member interfaces (in our case, ep0 and ep1) are up, but not assigned
IP addresses. Next, configure the bridge by entering the following:
$ sudo ifconfig bridge0 add ep0 add ep1 blocknonip ep0 blocknonip ep1 up

The OpenBSD ifconfig command contains a fair bit of filtering code
itself. In this example, we use the blocknonip option for each interface to
block all non-IP traffic.

The OpenBSD ifconfig command offers its own set of filtering options in addition to
other configuration options. The bridge(4) and ifconfig(8) man pages provide further information. Because it operates on the Ethernet level, it’s possible to use ifconfig
to specify filtering rules that let the bridge filter on MAC addresses. Using these filtering capabilities, it’s also possible to let the bridge tag packets for further processing
in your PF rule set via the tagged keyword. For tagging purposes, a bridge with one
member interface will do.
To make the configuration permanent, create or edit /etc/hostname.ep0
and enter the following line:

For the other interface, /etc/hostname.ep1 should contain the same line:

Bigger or Trickier Networks   87

Finally, enter the bridge setup in /etc/hostname.bridge0:
add ep0 add ep1 blocknonip ep0 blocknonip ep1 up

Your bridge should now be up, and you can go on to create the PF filter rules.

Basic Bridge Setup on FreeBSD
For FreeBSD, the procedure is a little more involved than on OpenBSD.
In order to be able to use bridging, your running kernel must include the
if_bridge module. The default kernel configurations build this module, so
under ordinary circumstances, you can go directly to creating the interface.
To compile the bridge device into the kernel, add the following line in the
kernel configuration file:
device if_bridge

You can also load the device at boot time by putting the following line
in the /etc/loader.conf file.
if_bridge_load="YES"

Create the bridge by entering this:
$ sudo ifconfig bridge0 create

Creating the bridge0 interface also creates a set of bridge-related sysctl
values:
$ sudo sysctl net.link.bridge
net.link.bridge.ipfw: 0
net.link.bridge.pfil_member: 1
net.link.bridge.pfil_bridge: 1
net.link.bridge.ipfw_arp: 0
net.link.bridge.pfil_onlyip: 1

It’s worth checking that these sysctl values are available. If they are, it’s
confirmation that the bridge has been enabled. If they’re not, go back and
see what went wrong and why.

These values apply to filtering on the bridge interface itself. You don’t need to touch
them because IP-level filtering on the member interfaces (the ends of the pipe) is
enabled by default.
Before the next ifconfig command, check that the prospective member
interfaces (in our case, ep0 and ep1) are up but haven’t been assigned IP
addresses. Then configure the bridge by entering this:
$ sudo ifconfig bridge0 addm ep0 addm ep1 up

## 88. Chapter 5

To make the configuration permanent, add the following lines to /etc/
rc.conf:
ifconfig_ep0="up"
ifconfig_ep1="up"
cloned_interfaces="bridge0"
ifconfig_bridge0="addm ep0 addm ep1 up"

This means your bridge is up and you can go on to create the PF filter
rules. See the if_bridge(4) man page for further FreeBSD-specific bridge
information.

Basic Bridge Setup on NetBSD
On NetBSD, the default kernel configuration doesn’t have the filtering
bridge support compiled in. You need to compile a custom kernel with the
following option added to the kernel configuration file. Once you have the
new kernel with the bridge code in place, the setup is straightforward.

BRIDGE_IPF

To create a bridge with two interfaces on the command line, first create
the bridge0 device:
$ sudo ifconfig bridge0 create

Before the next brconfig command, use ifconfig to check that the prospective member interfaces (in our case, ep0 and ep1) are up but haven’t
been assigned IP addresses. Then, configure the bridge by entering this:
$ sudo brconfig bridge0 add ep0 add ep1 up

Next, enable the filtering on the bridge0 device:
$ sudo brconfig bridge0 ipf

To make the configuration permanent, create or edit /etc/ifconfig.ep0
and enter the following line:

For the other interface, /etc/ifconfig.ep1 should contain the same line:

Finally, enter the bridge setup in /etc/ifconfig.bridge0:
create
!add ep0 add ep1 up

Bigger or Trickier Networks   89

Your bridge should now be up, and you can go on to create the PF filter
rules. For further information, see the PF on NetBSD documentation at
http://www.netbsd.org/Documentation/network/pf.html.

The Bridge Rule Set
Figure 5-3 shows the pf.conf file for a bulge-in-the-wire version of the baseline rule set we started in this chapter. As you can see, the network changes
slightly.

The clients’
default gateway

Our bridge,

Figure 5-3: A network with a bridge firewall

The machines in the local network share a common default gateway,
which isn’t the bridge but could be placed either inside or outside the bridge.
ext_if = ep0
int_if = ep1
localnet= "192.0.2.0/24"
webserver = "192.0.2.227"
emailserver = "192.0.2.225"
nameservers = "{ 192.0.2.221, 192.0.2.223 }"
client_out = "{ ssh, domain, pop3, auth, nntp, http, https, \
446, cvspserver, 2628, 5999, 8000, 8080 }"
set skip on $int_if
pass quick on $ext_if inet proto { tcp, udp } from $localnet \
        to port $udp_services
pass log on $ext_if inet proto icmp all icmp-type $icmp_types
pass on $ext_if inet proto tcp from $localnet to port $client_out
pass on $ext_if inet proto { tcp, udp } to $nameservers port domain
pass on $ext_if proto tcp to $webserver port $webports
pass log on $ext_if proto tcp to $emailserver port $email
pass log on $ext_if proto tcp from $emailserver to port smtp

## 90. Chapter 5

Significantly more complicated setups are possible. But remember that
while redirections will work, you won’t be able to run services on any of the
interfaces without IP addresses.

Handling Nonroutable IPv4 Addresses from Elsewhere
Even with a properly configured gateway to handle filtering and potentially
NAT for your own network, you may find yourself in the unenviable position of needing to compensate for other people’s misconfigurations.

Establishing Global Rules
One depressingly common class of misconfigurations is the kind that lets
traffic with nonroutable addresses out to the Internet. Traffic from nonroutable IPv4 addresses plays a part in several denial-of-service (DoS) attack
techniques, so it’s worth considering explicitly blocking traffic from nonroutable addresses from entering your network. One possible solution is
outlined here. For good measure, it also blocks any attempt to initiate contact to nonroutable addresses through the gateway’s external interface.
martians = "{ 127.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12, \
10.0.0.0/8, 169.254.0.0/16, 192.0.2.0/24, \
0.0.0.0/8, 240.0.0.0/4 }"
block in quick on $ext_if from $martians to any
block out quick on $ext_if from any to $martians

Here, the martians macro denotes the RFC 1918 addresses and a few
other ranges mandated by various RFCs not to be in circulation on the
open Internet. Traffic to and from such addresses is quietly dropped on the
gateway’s external interface.

The martians macro could easily be implemented as a table instead, with all of the
table advantages as an added bonus for your rule set. In fact, if you view the loaded
rules in a rule set that contains this combination of macro and rules, you’ll see that
macro expansion and rule-set optimization most likely replaced your list with one
table per rule. However, if you roll your own table, you’ll get to pick a nicer name for
it yourself.
The specific details of how to implement this kind of protection will
vary according to your network configuration and may be part of a wider set
of network security measures. Your network design might also dictate that
you include or exclude address ranges other than these.

Restructuring Your Rule Set with Anchors
We’ve mentioned anchors a few times already, in the context of applications
such as FTP-proxy or relayd that use anchors to interact with a running PF
configuration. Anchors are named sub–rule sets where it’s possible to insert
or remove rules as needed without reloading the whole rule set.
Bigger or Trickier Networks   91

Once you have a rule set where an otherwise unused anchor is defined,
you can even manipulate anchor contents from the command line using
pfctl’s -a switch, like this:
echo "block drop all" | pfctl -a baddies -f -

Here, a rule is inserted into the existing anchor baddies, overwriting any
previous content.
You can even load rules from a separate file into an anchor:
pfctl -a baddies -f /etc/anchor-baddies

Or you can list the current contents of an anchor:
pfctl -a baddies -s rules

There are a few more pfctl options that you’ll find useful for handling anchors. See
the pfctl man page for inspiration.
You can also split your configuration by putting the contents of anchors
into separate files to be loaded at rule-set load time. That way it becomes
possible to edit the rules in the anchors separately, reload the edited anchor,
and, of course, do any other manipulation like the ones described above. To
do this, first add a line like this to pf.conf:
anchor ssh-good load anchor ssh-good from "/etc/anchor-ssh-good"

This references the file /etc/anchor-ssh-good, which could look like this:
table <sshbuddies> file "/etc/sshbuddies"
pass inet proto tcp from <sshbuddies> to any port ssh

Perhaps simply to make it possible to delegate the responsibility for the
table sshbuddies to a junior admin, the anchor loads the table from the file
/etc/sshbuddies, which could look like this:
192.168.103.84
10.11.12.13

This way, you can manipulate the contents of the anchor in the following ways: Add rules by editing the file and reloading the anchor, replace the
rules by feeding other rules from the command line via standard input (as
shown in the earlier example), or change the behavior of the rules inside
the anchor by manipulating the contents of the table they reference.

## 92. Chapter 5

For more extensive anchors, like the ones discussed in the following paragraphs, it’s
probably more useful to use include clauses in your pf.conf if you want to maintain
the anchors as separate files.

The concept hinted at previously (specifying a set of common criteria
that apply to all actions within an anchor) is appealing in situations where
your configuration is large enough to need a few extra structuring aids.
For example, “on interface” could be a useful common criterion for traffic
arriving on a specific interface because that traffic tends to have certain
similarities. For example, look at the following:
anchor "dmz" on $dmz_if {
pass in proto { tcp udp } to $nameservers port domain
pass in proto tcp to $webservers port { www https }
pass in proto tcp to $mailserver port smtp
pass in log (all, to pflog1) in proto tcp from $mailserver \
to any port smtp

A separate anchor ext would serve the egress interface group:
anchor ext on egress {
match out proto tcp to port { www https } set queue (qweb, qpri) set prio (5,6)
match out proto { tcp udp } to port domain set queue (qdns, qpri) set prio (6,7)
match out proto icmp set queue (q_dns, q_pri) set prio (7,6)
pass in log proto tcp to port smtp rdr-to 127.0.0.1 port spamd queue spamd
pass in log proto tcp from <nospamd> to port smtp
pass in log proto tcp from <spamd-white> to port smtp
pass out log proto tcp to port smtp
pass log (all) proto { tcp, udp } to port ssh keep state (max-src-conn 15, \
max-src-conn-rate 7/3, overload <bruteforce> flush global)

Another obvious logical optimization if you group rules in anchors
based on interface affinity is to lump in tags to help policy-routing decisions. A simple but effective example could look like this:
anchor "dmz" on $dmz_if {
pass in proto { tcp udp } to $nameservers port domain tag GOOD
pass in proto tcp to $webservers port { www https } tag GOOD
pass in proto tcp to $mailserver port smtp tag GOOD
pass in log (all, to pflog1) in proto tcp from $mailserver
to any port smtp tag GOOD
block log quick ! tagged GOOD

Even if the anchor examples here have all included a blocking decision
inside the anchor, the decision to block or pass based on tag information
doesn’t have to happen inside the anchor.
After this whirlwind tour of anchors as a structuring tool, it may be
tempting to try to convert your entire rule set to an anchors-based structure. If you try to do so, you’ll probably find ways to make the internal logic
clearer. But don’t be surprised if certain rules need to be global, outside of

Bigger or Trickier Networks   93

anchors tied to common criteria. And you’ll almost certainly find that what
turns out to be useful in your environment is at least a little different from
what inspired the scenarios I’ve presented here.

How Complicated Is Your Network?—Revisited
Early on in this chapter, we posed the questions “How complicated is your
network?” and “How complicated does it need to be?” Over the subsections
of this chapter, we’ve presented a number of tools and techniques that make
it possible to build complex infrastructure with PF and related tools and that
help manage that complexity while keeping the network administrator sane.
If you’re in charge of one site where you need to apply all or most of the
techniques we’ve mentioned in this chapter, I feel your pain. On the other
hand, if you’re in charge of a network that diverse, the subsequent chapters
on traffic shaping and managing resource availability are likely to be useful
to you as well.
The rest of this book deals mainly with optimizing your setup for performance and resource availability, with the exception of one chapter where
we deviate slightly and take on a lighter tone. Before we dive into how to
optimize performance and ensure high availability, it’s time to take a look
at how to make your infrastructure unavailable or hard to reach for selected
groups or individuals. The next chapter deals exclusively with making life
harder for the unwashed masses—or perhaps even well-organized criminals—who try to abuse services in your care.

## 94. Chapter 5

T u r n i n g t h e T ab l e s f o r
P r o act i v e D e f e n s e

In the previous chapter, you saw how you
might need to spend considerable time and
energy making sure that the services you
want to offer will be available even when you
have strict packet filtering in place. Now, with your
working setup in place, you’ll soon notice that some
services tend to attract a little more unwanted attention than others.
Here’s the scenario: You have a network with packet filtering to match
your site’s needs, including some services that need to be accessible to users
from elsewhere. Unfortunately, when services are available, there’s a risk
that someone will want to exploit them for some sort of mischief.
You’ll almost certainly have remote login via SSH (Secure Shell), as
well as SMTP email running on your network—both are tempting targets.
In this chapter, we’ll look at ways to make it harder to gain unauthorized
access via SSH, and then we’ll turn to some of the more effective ways to
deny spammers use of your servers.

Turning Away the Brutes
The Secure Shell service, commonly referred to as SSH, is a fairly crucial
service for Unix administrators. It’s frequently the main interface to the
machine and a favorite target of script kiddie attacks.

SSH Brute-Force Attacks
If you run an SSH login service that’s accessible from the Internet, you’ve
probably seen entries like this in your authentication logs:
Sep 26 03:12:34 skapet sshd[25771]: Failed password for root from 200.72.41.31 port 40992 ssh2
Sep 26 03:12:34 skapet sshd[5279]: Failed password for root from 200.72.41.31 port 40992 ssh2
Sep 26 03:12:35 skapet sshd[5279]: Received disconnect from 200.72.41.31: 11: Bye Bye
Sep 26 03:12:44 skapet sshd[29635]: Invalid user admin from 200.72.41.31
Sep 26 03:12:44 skapet sshd[24703]: input_userauth_request: invalid user admin
Sep 26 03:12:44 skapet sshd[24703]: Failed password for invalid user admin from 200.72.41.31
port 41484 ssh2
Sep 26 03:12:44 skapet sshd[29635]: Failed password for invalid user admin from 200.72.41.31
port 41484 ssh2
Sep 26 03:12:45 skapet sshd[24703]: Connection closed by 200.72.41.31
Sep 26 03:13:10 skapet sshd[11459]: Failed password for root from 200.72.41.31 port 43344 ssh2
Sep 26 03:13:10 skapet sshd[7635]: Failed password for root from 200.72.41.31 port 43344 ssh2
Sep 26 03:13:10 skapet sshd[11459]: Received disconnect from 200.72.41.31: 11: Bye Bye
Sep 26 03:13:15 skapet sshd[31357]: Invalid user admin from 200.72.41.31
Sep 26 03:13:15 skapet sshd[10543]: input_userauth_request: invalid user admin
Sep 26 03:13:15 skapet sshd[10543]: Failed password for invalid user admin from 200.72.41.31
port 43811 ssh2
Sep 26 03:13:15 skapet sshd[31357]: Failed password for invalid user admin from 200.72.41.31
port 43811 ssh2
Sep 26 03:13:15 skapet sshd[10543]: Received disconnect from 200.72.41.31: 11: Bye Bye
Sep 26 03:13:25 skapet sshd[6526]: Connection closed by 200.72.41.31

This is what a brute-force attack looks like. Someone or something is trying by brute force to find a username and password combination that lets
them get into your system.
The simplest response would be to write a pf.conf rule that blocks all
access, but that leads to another class of problems, including how to let
­people with legitimate business on your system access it. Setting up your
sshd to accept only key-based authentication would help but most likely
would not stop the kiddies from trying. You might consider moving the service to another port, but then again, the ones flooding you on port 22 would
probably be able to scan their way to port 22222 for a repeat performance.1
Since OpenBSD 3.7 (and equivalents), PF has offered a slightly more
elegant solution.

## 1. At the time this chapter was first written, this was purely theoretical; I hadn’t yet had
any credible reports that this was happening. That changed during 2012 when reliable
sources started reporting the appearance of brute-force sequences at odd ports. See
http://bsdly.blogspot.com/2013/02/theres-no-protection-in-high-ports.html for more.

## 96. Chapter 6

Setting Up an Adaptive Firewall
To thwart brute-force attacks, you can write your pass rules so they maintain
certain limits on what connecting hosts can do. For good measure, you can
banish violators to a table of addresses to which you deny some or all access.
You can even choose to drop all existing connections from machines that
overreach your limits. To enable this feature, first set up the table by adding
the following line to your configuration before any filtering rules:
table <bruteforce> persist

Then, early in your rule set, block brute forcers, as shown here:
block quick from <bruteforce>

Finally, add your pass rule:
pass proto tcp to $localnet port $tcp_services \
keep state (max-src-conn 100, max-src-conn-rate 15/5, \
overload <bruteforce> flush global)

This rule is very similar to what you’ve seen in earlier examples. The
interesting part in this context is the contents of the parentheses, called
state-tracking options:

max-src-conn is the number of simultaneous connections allowed from
one host. In this example, it’s set to 100. You may want a slightly higher

or lower value, depending on your network’s traffic patterns.
max-src-conn-rate is the rate of new connections allowed from any single
host. Here, it’s set to 15 connections per 5 seconds, denoted as 15/5.
Choose a rate that suits your setup.
overload <bruteforce> means that the address of any host that exceeds
the preceding limits is added to the table bruteforce. Our rule set blocks
all traffic from addresses in the bruteforce table. Once a host exceeds
any of these limits and is put in the overload table, the rule no longer
matches traffic from that host. Make sure that overloaders are handled,
if only by a default block rule or similar.
flush global says that when a host reaches the limit, all states for its connections are terminated (flushed). The global option means that for
good measure, flush applies to all states created by traffic from that
host, no matter which rule created a state.

As you can imagine, the effect of this tiny addition to the rule set
is dramatic. After a few tries, brute forcers end up in the bruteforce table.
That means that all their existing connections are terminated (flushed)
and any new attempts will be blocked, most likely with Fatal: timeout before
authentication messages at their end. You have created an adaptive firewall
that adjusts automatically to conditions in your network and acts on undesirable activity.
Turning the Tables for Proactive Defense   97

These adaptive rules are effective only for protection against the traditional, rapid-fire
type of brute-force attempts. The low-intensity, distributed password-guessing attempts
that were first identified as such in 2008 and have been recurring ever since (known
among other names as The Hail Mary Cloud2) don’t produce traffic that will match
these rules.
It’s likely that you will want some flexibility in your rule set and want to
allow a larger number of connections for some services, but you also might
like to be a little more tight-fisted when it comes to SSH. In that case, you
could supplement the general-purpose pass rule with something like the
following one early in your rule set:
pass quick proto { tcp, udp } to port ssh \
keep state (max-src-conn 15, max-src-conn-rate 5/3, \
overload <bruteforce> flush global)

You should be able to find the set of parameters that’s just right for
your situation by reading the relevant man pages and the PF User Guide (see
Appendix A).

Remember that these sample rules are intended as illustrations and your network’s
needs may be better served by different rules. Setting the number of simultaneous
connections or the rate of connections too low may block legitimate traffic. There’s a
potential risk of self-inflicted denial of service when the configuration includes many
hosts behind a common NATing gateway and the users on the NATed hosts have
legitimate business on the other side of a gateway with strict overload rules.
The state-tracking options and the overload mechanism don’t need to
apply exclusively to the SSH service, and blocking all traffic from offenders
isn’t always desired. You could, for example, use a rule like this:
pass proto { tcp, udp } to port $mail_services \
keep state (max 1500, max-src-conn 100)

Here, max specifies the maximum number of states that can be created
for each rule with no overload to protect a mail or Web service from receiving more connections than it can handle (keep in mind that the number of
rules loaded depends on what the $mail_services macro expands to). Once
the max limit is reached, new connections will not match this rule until the
old ones terminate. Alternatively, you could remove the max restriction, add
an overload part to the rule, and assign offenders to a queue with a minimal
bandwidth allocation (see the discussion of traffic shaping in Chapter 7 for
details on setting up queues).

## 2. For an overview of the Hail Mary Cloud sequence of brute-force attempts, see the article
“The Hail Mary Cloud and the Lessons Learned” at http://bsdly.blogspot.com/2013/10/the-hailmary-cloud-and-lessons-learned.html. More resources are referenced there and in Appendix A.

## 98. Chapter 6

Some sites use overload to implement a multitiered system, where hosts
that trip one overload rule are transferred to one or more intermediate
“probation” tables for special treatment. It can be useful in Web contexts
not to block traffic from hosts in the overload tables outright but rather to
redirect all HTTP requests from these hosts to specific Web pages (as in
the authpf example near the end of Chapter 4).

Tidying Your Tables with pfctl
With the overload rules from the previous section in place, you now have an
adaptive firewall that automatically detects undesirable behavior and adds
offenders’ IP addresses to tables. Watching the logs and the tables can be fun
in the short run, but because those rules only add to the tables, we run into
the next challenge: keeping the content of the tables up-to-date and relevant.
When you’ve run a configuration with an adaptive rule set for a while,
at some point, you’ll discover that an IP address one of your overload
rules blocked last week due to a brute-force attack was actually a dynamically assigned address, which is now assigned to a different ISP customer
with a legitimate reason to communicate with hosts in your network.3 If
your adaptive rules catch a lot of traffic on a busy network, you may also
find that the overload tables will grow over time to take up an increasing
amount of memory.
The solution is to expire table entries—to remove entries after a certain
amount of time. In OpenBSD 4.1, pfctl acquired the ability to expire table
entries based on the time since their statistics were last reset.4 (In almost
all instances, this reset time is equal to the time since the table entry was
added.) The keyword is expire, and the table entry’s age is specified in seconds. Here’s an example:
$ sudo pfctl -t bruteforce -T expire 86400

This command will remove bruteforce table entries that had their statistics reset more than 86,400 seconds (24 hours) ago.

The choice of 24 hours as the expiry time is a fairly arbitrary one. You should choose
a value that you feel is a reasonable amount of time for any problem at the other end
to be noticed and fixed. If you have adaptive rules in place, it’s a good idea to set up
crontab entries to run table expiry at regular intervals with a command much like the
preceding one to make sure your tables are kept up-to-date.

## 3. From a longer-term perspective, it’s fairly normal for entire networks and larger ranges of
IP addresses to be reassigned to new owners in response to events in the physical, businessoriented world.
4. Before pfctl acquired the ability to expire table entries, table expiry was more likely than
not handled by the special-purpose utility expiretable. If your pfctl doesn’t have the expire
option, you should seriously consider upgrading to a newer system. If upgrading is for some
reason not practical, look for expiretable in your package system.
Turning the Tables for Proactive Defense   99

Giving Spammers a Hard Time with spamd
Email is a fairly essential service that needs special attention due to the
large volume of unwanted messages, or spam. The volume of unsolicited
commercial messages was already a painful problem when malware makers discovered that email-borne worms would work and started using email
to spread their payload. During the early 2000s, the combined volume of
spam and email-borne malware had increased to the point where running
an SMTP mail service without some sort of spam countermeasures had
become almost unthinkable.
Spam-fighting measures are almost as old as the spam problem itself.
The early efforts focused on analysis of the messages’ contents (known
as content filtering) and to some extent on interpretation of the messages’
rather trivially forgeable headers, such as the purported sender address
(From:) or the store and forward paths of intermediate deliveries recorded
in the Received: headers.
When the OpenBSD team designed its spam-fighting solution spamd,
first introduced with OpenBSD 3.3 in 2003, the developers instead focused
on the network level and the immediate communication partner in the
SMTP conversations along with any available information about hosts that
tried to deliver messages. The developers set out to create a small, simple,
and secure program. The early implementation was based almost entirely
on creative use of PF tables combined with data from trusted external sources.

In addition to the OpenBSD spam-deferral daemon, the content-filtering-based
antispam package SpamAssassin (http://spamassassin.apache.org/) features a
program called spamd. Both programs are designed to help fight spam, but they take
very different approaches to the underlying problem and don’t interoperate directly.
However, when both programs are correctly configured and running, they complement each other well.

Network-Level Behavior Analysis and Blacklisting
The original spamd design is based on the observation that spammers send a
lot of mail and the incredibly small likelihood of you being the first person
to receive a particular message. In addition, spam is sent via a few spammerfriendly networks and numerous hijacked machines. Both the individual
messages and the machines that send them will be reported to blacklist
maintainers quickly, and the blacklist data consisting of known spam
­senders’ IP addresses forms the basis for spamd’s processing.
When dealing with blacklisted hosts, spamd employs a method called
tarpitting. When the daemon receives an SMTP connection, it presents its
banner and immediately switches to a mode where it answers SMTP traffic
at the rate of 1 byte per second, using a tiny selection of SMTP commands
designed to make sure that mail is never delivered but rather rejected back
into the sender’s queue once the message headers have been transferred.
The intention is to waste as much time as possible on the sending end

## 100. Chapter 6

while costing the receiver pretty much nothing. This specific tarpitting
implementation with 1-byte SMTP replies is often referred to as stuttering.
Blacklist-based tarpitting with stuttering was the default mode for spamd up
to and including OpenBSD 4.0.

On FreeBSD and NetBSD, spamd is not part of the base system but is available
through ports and packages as mail/spamd. If you’re running PF on FreeBSD or
NetBSD, you need to install the port or package before following the instructions
over the next few pages.
Setting Up spamd in Blacklisting Mode
To set up spamd to run in traditional, blacklisting-only mode, you first put a
special-purpose table and a matching redirection in pf.conf and then turn
your attention to spamd’s own spamd.conf. spamd then hooks into the PF rule
set via the table and the redirection.
The following are the pf.conf lines for this configuration:
table <spamd> persist
pass in on $ext_if inet proto tcp from <spamd> to \
{ $ext_if, $localnet } port smtp rdr-to 127.0.0.1 port 8025

And here is the pre–OpenBSD 4.7 syntax:
table <spamd> persist
rdr pass on $ext_if inet proto tcp from <spamd> to \
{ $ext_if, $localnet } port smtp -> 127.0.0.1 port 8025

The table, <spamd>, is there to store the IP addresses you import from
trusted blacklist sources. The redirection takes care of all SMTP attempts
from hosts that are already in the blacklist. spamd listens on port 8025 and
responds s-l-o-w-l-y (1 byte per second) to all SMTP connections it receives
as a result of the redirection. Later on in the rule set, you would have a rule
that makes sure legitimate SMTP traffic passes to the mail server.
spamd.conf is where you specify the sources of your blacklist data and
any exceptions or local overrides you want.

On OpenBSD 4.0 and earlier (and by extension, ports based on versions prior to
OpenBSD 4.1), spamd.conf was in /etc. Beginning with OpenBSD 4.1, spamd.
conf is found in /etc/mail instead. The FreeBSD port installs a sample configuration in /usr/local/etc/spamd/spamd.conf.sample.
Near the beginning of spamd.conf, you’ll notice a line without a # comment sign that looks like all:\. This line specifies the blacklists you’ll use.
Here is an example:
all:\
:uatraps:whitelist:

Turning the Tables for Proactive Defense   101

Add all blacklists that you want to use below the all:\ line, separating
each with a colon (:). To use whitelists to subtract addresses from your blacklist, add the name of the whitelist immediately after the name of each
blacklist, as in :blacklist:whitelist:
Next is the blacklist definition:
uatraps:\
:black:\
:msg="SPAM. Your address %A has sent spam within the last 24 hours":\
:method=http:\
:file=www.openbsd.org/spamd/traplist.gz

Following the name (uatraps), the first data field specifies the list type—
in this case, black. The msg field contains the message to be displayed to
blacklisted senders during the SMTP dialogue. The method field specifies
how spamd-setup fetches the list data—in this case, via HTTP. Other possibilities include fetching via FTP (ftp), from a file in a mounted filesystem
(file), or via execution of an external program (exec). Finally, the file field
specifies the name of the file spamd expects to receive.
The definition of a whitelist follows much the same pattern but omits
the message parameter:
whitelist:\
:white:\
:method=file:\
:file=/etc/mail/whitelist.txt

The suggested blacklists in the current default spamd.conf are actively maintained
and have rarely, if ever, contained false positives. However, earlier versions of that
file also suggested lists that excluded large blocks of the Internet, including several
address ranges that claim to cover entire countries. If your site expects to exchange
legitimate mail with any of the countries in question, those lists may not be optimal
for your setup. Other popular lists have been known to list entire /16 ranges as spam
sources, and it’s well worth reviewing the details of the list’s maintenance policy before
putting a blacklist into production.
Put the lines for spamd and the startup parameters you want in your /etc/
rc.conf.local on OpenBSD or in /etc/rc.conf on FreeBSD or NetBSD. Here’s
an example:
spamd_flags="-v -b" # for normal use: "" and see spamd-setup(8)

Here, we enable spamd and set it to run in blacklisting mode with the
-b flag. In addition, the -v flag enables verbose logging, which is useful for
keeping track of spamd’s activity for debugging purposes.

## 102. Chapter 6

On FreeBSD, the /etc/rc.conf settings that control spamd’s behavior are
obspamd_enable, which should be set to "YES" in order to enable spamd, and
obspamd_flags, where you fill in any command-line options for spamd:
obspamd_enable="YES"
obspamd_flags="-v -b" # for normal use: "" and see spamd-setup(8)

To have spamd run in pure blacklist mode on OpenBSD 4.1 or newer, you can achieve
the same effect by setting the spamd_black variable to "YES" and then restarting spamd.
Once you’ve finished editing the setup, start spamd with the options you
want and complete the configuration with spamd-setup. Finally, create a cron
job that calls spamd-setup to update the blacklist at reasonable intervals. In
pure blacklist mode, you can view and manipulate the table contents using
pfctl table commands.
spamd Logging
By default, spamd logs to your general system logs. To send the spamd log messages to a separate log file, add an entry like this to syslog.conf :
!!spamd
daemon.err;daemon.warn;daemon.info;daemon.debug

/var/log/spamd

Once you’re satisfied that spamd is running and doing what it’s supposed
to do, you’ll probably want to add the spamd log file to your log rotations,
too. After you’ve run spamd-setup and the tables are filled, you can view the
table contents using pfctl.

In the sample pf.conf fragment at the beginning of this section, the redirection
(rdr-to) rule is also a pass rule. If you opted for a match rule instead (or if you’re
using an older PF version and chose to write a rdr rule that doesn’t include a pass
part), be sure to set up a pass rule to let traffic through to your redirection. You may
also need to set up rules to let legitimate email through. However, if you’re already
running an email service on your network, you can probably go on using your old
SMTP pass rules.
Given a set of reliable and well-maintained blacklists, spamd in pure blacklisting mode does a good job of reducing spam. However, with pure blacklisting, you catch traffic only from hosts that have already tried to deliver spam
elsewhere, and you put your trust in external data sources to determine
which hosts deserve to be tarpitted. For a setup that provides a more immediate response to network-level behavior and offers some real gains in spam
prevention, consider greylisting, which is a crucial part of how the modern
spamd works.

Turning the Tables for Proactive Defense   103

Greylisting: My Admin Told Me Not to Talk to Strangers
Greylisting consists mainly of interpreting the current SMTP standards and
adding a little white lie to make life easier.
Spammers tend to use other people’s equipment to send their messages, and the software they install without the legal owner’s permission
needs to be relatively lightweight in order to run undetected. Unlike legitimate mail senders, spammers typically don’t consider any individual message they send to be important. Taken together, this means that typical
spam and malware sender software aren’t set up to interpret SMTP status
codes correctly. This is a fact that we can use to our advantage, as Evan
Harris proposed in his 2003 paper titled “The Next Step in the Spam
Control War: Greylisting.” 5
As Harris noted, when a compromised machine is used to send spam,
the sender application tends to try delivery only once, without checking for
any results or return codes. Real SMTP implementations interpret SMTP
return codes and act on them, and real mail servers retry if the initial
attempt fails with any kind of temporary error.
In his paper, Harris outlined a practical approach:

On first SMTP contact from a previously unknown communication
partner, do not receive email on the first delivery attempt, but instead,
respond with a status code that indicates a temporary local problem,
and store the sender IP address for future reference.
If the sender retries immediately, reply as before with the temporary
failure status code.
If the sender retries after a set minimum amount of time (1 hour, for
example) but not more than a maximum waiting period (4 hours,
for example), accept the message for delivery and record the sender
IP address in your whitelist.

This is the essence of greylisting. And fortunately, you can set up and
maintain a greylisting spamd on your PF-equipped gateway.
Setting Up spamd in Greylisting Mode
OpenBSD’s spamd acquired its ability to greylist in OpenBSD 3.5. Beginning
with OpenBSD 4.1, spamd runs in greylisting mode by default.
In the default greylisting mode, the spamd table used for blacklisting, as
described in the previous section, becomes superfluous. You can still use blacklists, but spamd will use a combination of private data structures for blacklist
data and the spamdb database to store greylisting-related data. A typical set
of rules for spamd in default mode looks like this:
table <spamd-white> persist
table <nospamd> persist file "/etc/mail/nospamd"

## 5. The original Harris paper and a number of other useful articles and resources can be
found at http://www.greylisting.org/.

## 104. Chapter 6

pass in log on egress proto tcp to port smtp \
rdr-to 127.0.0.1 port spamd
pass in log on egress proto tcp from <spamd-white> to port smtp
pass out log on egress proto tcp to port smtp

This includes the necessary pass rules to let legitimate email flow to the
intended destinations from your own network. The <spamd-white> table is
the whitelist, maintained by spamd. The hosts in the <spamd-white> table have
passed the greylisting hurdle, and mail from these machines is allowed to
pass to the real mail servers or their content-filtering frontends. In addition, the nospamd table is there for you to load addresses of hosts that you
don’t want to expose to spamd processing, and the matching pass rule makes
sure SMTP traffic from those hosts passes.
In your network, you may want to tighten those rules to pass SMTP
traffic only to and from hosts that are allowed to send and receive email via
SMTP. We’ll get back to the nospamd table in “Handling Sites That Do Not
Play Well with Greylisting” on page 113.
The following are the equivalent rules in pre–OpenBSD 4.7 syntax:
table <spamd-white> persist
table <nospamd> persist file "/etc/mail/nospamd"
rdr pass in log on egress proto tcp to port smtp \
-> 127.0.0.1 port spamd
pass in log on egress proto tcp from <spamd-white> to port smtp
pass out log on egress proto tcp to port smtp

On FreeBSD, in order to use spamd in greylisting mode, you need a file
descriptor filesystem (see man 5 fdescfs) mounted at /dev/fd/. To implement
this, add the following line to /etc/fstab and make sure the fdescfs code is in
your kernel, either compiled in or by loading the module via the appropriate kldload command.
fdescfs /dev/fd fdescfs rw 0 0

To begin configuring spamd, place the lines for spamd and the startup
parameters you want in /etc/rc.conf.local. Here’s an example:
spamd_flags="-v -G 2:4:864" # for normal use: "" and see spamd-setup(8)

On FreeBSD, the equivalent line should go in /etc/rc.conf:
obspamd_flags="-v -G 2:4:864" # for normal use: "" and see spamd-setup(8)

You can fine-tune several of the greylisting-related parameters via spamd
command-line parameters trailing the -G option.

Turning the Tables for Proactive Defense   105

W h y Gre y listing Works
A significant amount of design and development effort has been put into making essential services, such as SMTP email transmission, fault-tolerant. In practical terms, this means that the best effort of a service such as SMTP is as close
as you can get to having a perfect record for delivering messages. That’s why
we can rely on greylisting to eventually let us receive email from proper mail
servers.
The current standard for Internet email transmission is defined in RFC
5321.* The following are several excerpts from Section 4.5.4.1, “Sending
Strategy”:
“In a typical system, the program that composes a message
has some method for requesting immediate attention for a new
piece of outgoing mail, while mail that cannot be transmitted
immediately MUST be queued and periodically retried by the
sender. . . .
“The sender MUST delay retrying a particular destination after one attempt has failed. In general, the retry interval
SHOULD be at least 30 minutes; however, more sophisticated
and variable strategies will be beneficial when the SMTP client
can determine the reason for non-delivery.
“Retries continue until the message is transmitted or the
sender gives up; the give-up time generally needs to be at
least 4–5 days.”
Delivering email is a collaborative, best-effort process, and the RFC clearly
states that if the site you are trying to send mail to reports that it can’t receive
at the moment, it is your duty (a must requirement) to try again later, giving the
receiving server a chance to recover from its problem.
The clever wrinkle to greylisting is that it’s a convenient white lie. When
we claim to have a temporary local problem, that problem is really the equivalent of “My admin told me not to talk to strangers.” Well-behaved senders with
valid messages will call again, but spammers won’t wait around for the chance
to retry, since doing so increases their cost of delivering messages. This is why
greylisting still works, and since it’s based on strict adherence to accepted stan†
dards, false positives are rare.

- The relevant parts of RFC 5321 are identical to the corresponding parts of RFC 2821, which
is obsolete. Some of us were more than a little disappointed that the IETF didn’t clarify these
chunks of the text, now moving forward on the standards track. My reaction (actually, it’s quite
a rant) is at http://bsdly.blogspot.com/2008/10/ietf-failed-to-account-for-greylisting.html.
†
The relevant RFCs are mainly RFC 1123 and RFC 5321, which made obsolete the earlier RFC
2821. Remember that temporary rejection is an SMTP fault-tolerance feature.
