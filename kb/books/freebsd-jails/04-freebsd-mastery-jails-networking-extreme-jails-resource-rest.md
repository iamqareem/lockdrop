---
id: freebsd-jails-04
title: "FreeBSD Mastery · Jails — Networking, Extreme Jails & Resource Restriction and Removal",
slug: freebsd-jails-04-freebsd-mastery-jails-networking-extreme-jails-resource-rest
source: "FreeBSD Mastery — Jails",
sourceSection: "Chapter 9. Networking, Chapter 10. Extreme Jails, Chapter 11. Resource Restriction and Removal"
track: bsd-internals,
tier: premium
tags: [bsd, freebsd, jails, containers, security]
summary: "Up until now, we’ve delegated all the networking to the host. Covers 3 sections: Networking, Extreme Jails, Resource Restriction and Removal.",
---
# FreeBSD Mastery · Jails — Networking, Extreme Jails & Resource Restriction and Removal

## Chapter 9. Networking

Up until now, we’ve delegated all the networking to the host. You can attach
networking configuration to a jail rather than the host, granting the jail more
independence and making it possible to more easily move jails from host to host.
You can also use virtual networking features to attach jails to different parts of
the network, have one jail firewall another, and even build a cluster of jails that
can network with each other but not the outside world.
This chapter assumes you understand networking. If anything in here confuses
you, go read a basic networking primer and come back. My Networking for
System Administrators (Tilted Windmill Press, 2015) would suffice, although
there’s a fair number of competitors.
Jails can get much more complicated than what I show here. I discuss bridging
with vnet; you could choose to route instead. You could use setfib(1), although
vnet has largely obsoleted it in a jail context. You could build a jailed load
balancer and distribute traffic between jails. I won’t show you everything. Once
you understand these examples, though, you’ll be able to implement as many
different structures as your networking knowledge permits.
Before diving into that, though, let’s consider the host.

Interface Names and Jails
Rather than configuring a jail to use an IP address already attached to a network
interface, you can have a jail attach its IP to a selected interface before starting.
This keeps you from having to constantly edit the host’s/etc/rc.conf as you add
and remove addresses, but it adds minor snags.
FreeBSD names network interfaces after the network card driver. Normally, the
only time you need the interface name is when you’re troubleshooting or
performing basic system configuration—that is, infrequently. The interface name
mostly gets used in /etc/rc.conf, so who cares what it’s called?
Once you start using an interface name in userland configurations, though, the
interface name really quickly becomes important. Changing the network card
from gigabit to ten gigabit doesn’t mean only a search-and-replace in rc.conf;
you must update all those userland entries as well. Jails with multiple network
interfaces amplify the problem.
Fortunately, FreeBSD has the ability to rename network interfaces. Before you
start assigning network interfaces in jail configurations, assign the network
interface a name like “jail.” When you change the network card, you can assign
the new interface the same name and leave all your jail configurations alone.
I’m dedicating this host’s em0 network interface to jails, so in this rc.conf
snippet I rename the interface and bring it up.
ifconfig_em0_name="jail"
ifconfig_jail="203.0.113.50/24"
All of my jail configuration can now use the interface name jail and it will all be
correct.
In cases where I want to assign multiple interfaces to jails, I’ll name interfaces
after their role. Suppose I have one for the jails’ public Internet, one for the jails
to access my private network, and one for host management. I’ll assign the
public interface a name like jpublic, the private one jprivate, and—as long as I’m

here—the host management interface mgmt.
I’ll use these interface names for all of the networking examples from here on
out.

TCP/IP and Jails
Jails get a limited view of the network, depending on the addresses assigned to
it. A jail can open standard TCP/IP sockets, allowing you to run typical servers.
If your jail has access to /dev/bpf and you fire up a packet sniffer, you only
receive broadcast traffic and traffic addressed to the jail’s IP address. You can
control exactly how these network restrictions work, though.

Managing Network Access
Jails default to only accessing the network addresses made available to them, but
that’s not the only option. The ip4 and ip6 parameters control access to the
kernel’s TCP/IP stack. Both work identically.
The default setting, new, tells the kernel to permit the jail access to only the
assigned IP addresses. If a jail requests a specific IP address, the host attempts to
add that address as a new alias. All traffic sourced from the jail uses the first IP
assigned as the source IP.
Set these to inherit and the jail can access all of the host’s IP addresses. This is
usually undesirable, but unusual is not uncommon as we’ll see in Chapter 11.
Finally, to prohibit a jail from using an IP family, set this value to disable. If I
want to block a jail from using IPv4 but allow access to the host’s entire
collection of IPv6 addresses, I would use this.
ip4=disable;
ip6=inherit;
Even a simple ping localhost will now get a “Protocol not supported” error. I
might use this to see if an application really works on pure IPv6.
Note that if you disable an IP protocol, but also assign an address in that protocol
family, the protocol is re-enabled. The jail assumes that if you assigned an
address, you must want the address to function.
Even if I permit a jail control of an IP address, it still can’t control the whole
network stack unless I let it.

Multiple Interfaces and Addresses
Large production hosts often have multiple interfaces, or at least multiple
VLANs, each dedicated to a particular purpose. If you want jail(8) to add the
jail’s IP addresses to a specific interface at jail startup, and remove that address
at jail shutdown, list the interface before the IP address in the IP address
parameter like so.
ip4.addr="jpublic|203.0.113.231";
ip6.addr="jpublic|2001:db8::1234";
The advantage to storing jail interface information with the IP address is that the
jail configuration can easily be moved to an entirely different host.
Iocage works exactly the same way, except it uses the ip4_addr and ip6_addr
parameters.
Property: ip4_addr has been updated to jpublic|203.0.113.234
ip6_addr: none -> jpublic|2001:db8::2
These jails will now attach themselves on startup to whatever network interface
happens to be called jpublic at the moment.
Jail addresses are IP aliases on the network interface. This means they are
assigned a /32 or /128 netmask, but inherit a practical netmask from the
interface’s primary address. That primary address is probably attached to the
host, which is fine for most applications. If the interface doesn’t already have an
address, specify the netmask with the address assignment.

ip4.addr="jpublic|203.0.113.225/24";
A jail can have multiple IP addresses. If a requested address isn’t already on the
host, the host will automatically add each as an alias on the main network
interface. List the addresses in ip4.addr or ip6.addr, separated by commas.
ip6.addr=" jpublic|2001:db8:0::225/64, jpublic|2001:db8:0::226/64";
Once you involve multiple interfaces, though, the jail.conf syntax changes. You
must use multiple ip4.addr or ip6.addr statements and the += syntax. Here I
assign a jail two addresses on the jpublic interface and another on the jprivate
interface.
ip6.addr="jpublic|2001:db8:0::225/64";
ip6.addr+="jprivate|2001:db8::226/64";
ip6.addr+="jprivate|2001:db8:1::225/64";
You cannot combine multiple IP addresses and interface assignments in jail.conf.
Once you start including interface information with addresses you must list each
address on its own line, even when multiple addresses get assigned to one
interface.
You can also give iocage jails addresses on multiple interfaces. With iocage, you
can combine these assignments in a single line.
You can list however many interfaces and addresses you like in a jail, but
remember that the jail will attach any IP not marked with an interface to what it
thinks is the host’s main interface. I encourage you to explicitly label interfaces
to prevent iocage from changing its mind and choosing a different interface.
Multiple addresses and interfaces force the jail to make decisions about which
source address to use for outbound connections. When a system can initiate

traffic from multiple addresses or multiple interfaces, it must choose which
source address to put on the outgoing connection. If a jail has fifteen IP
addresses, and you SSH out of the jail, where does the jail say the connection is
coming from?
The rule of thumb is that an outgoing connection uses the first address on the
interface that the traffic leaves the host from as its source address. If the interface
jprivate has a primary IP address of 198.51.100.234, and the system routes traffic
out that interface, the connection comes from the IP 198.51.100.234.
Jails slightly change source address selection. The first address assigned to a jail
is the jail’s primary address. If the jail can’t find a more appropriate address to
use for an outgoing connection, it uses that. It’s a meaningless distinction most
of the time, but has unusual effects on communication with the host and other
jails on the host.
Multiple jails can share a single IP, if and only if that’s the only IP assigned to
both jails. You cannot have one jail with multiple addresses, and a second jail
that shares one of those addresses. You can’t have multiple shared addresses on
multiple jails. Jails can share one and only one address, and they’ll bicker like
children over who gets to bind to which TCP/IP ports.
You can run jails on a host with only one network-facing IP address. If you
explicitly assign a jail the host’s only IP address, both the jail and the host will
lose network connectivity.¹ You can solve this by allowing the jails to inherit the
host’s IP stack, or by binding jails to the loopback address.
If you set a jail’s ip4 and ip6 parameters to “inherit,” the jail can access every IP
address on the host. You’ll need to run the jail’s external-facing services like
SSH on alternate ports, or manage the jails locally through jexec. We discuss this
model in Chapter 11.
You could attach private IP addresses to the loopback interface lo0 and bind the
jails to those addresses. You’ll need a NAT on the host’s packet filter to give
those jails network access and to make desired services accessible to the outside
world.

Ping, Traceroute, and Raw Sockets
A jail cannot access raw TCP/IP sockets. These are more flexible than the
standard “cooked” sockets, and allow a host to hand-craft packets. A
knowledgeable user could use raw sockets to twiddle various network stack
internals. The problem is, network tools like ping and traceroute require raw
socket access.
While ping and traceroute are the go-to tools for troubleshooting network
connectivity, there are alternatives for testing network functionality. My usual
command is host(1), especially when the jail’s nameserver is not on the local
network. If you can run a command like host mwl.io and get an answer, chances
are your jail has network connectivity. If your nameserver is on the local LAN,
try using another network-aware command like fetch(1). Running fetch
https://mwl.io will generate an OpenSSL error on a new FreeBSD install, as
FreeBSD doesn’t ship with a trusted certificate authority bundle—but the mere
appearance of that error means that your jail interacted with a remote host. The
network works. (You could run fetch -o - --no-verify-peer https://mwl.io to
ignore the TLS error, but that’s poor practice so don’t.)
If you trust the jail owner and the applications running in that jail, you can
permit raw IP socket access with the allow.raw_sockets parameter
(allow_raw_sockets for iocage). Setting this parameter and restarting the jail will
allow ping and traceroute to work.
Generally speaking, a jail’s network restrictions only impact IPv4, IPv6, local
sockets, and routing. You might want to jail applications that include TCP/IP
components beyond those, or even have non-TCP/IP components. Such
applications need privileges to create general IP sockets. The allow.socket_af
parameter (allow_socket_af in iocage) lets a jail create network sockets beyond
the jailed protocols. By enabling this, you’re allowing the jail to twiddle
arbitrary network characteristics. If you need to enable this for an untrusted
application or jail owner, you might consider switching this jail to full
virtualization.

Jails and the Loopback Interface
All TCP/IP communication between jails and the host, and between jails on the
same host, happens on the loopback interface lo0. (Private jails that are attached
to an interface like lo1 communicate with each other on that interface, but any
communication with the host still traverses lo0.) If you’re on a jail and you SSH
to the host, the connection never hits the external network. This is standard
behavior for most operating systems, but it has consequences for jails.
An IP address can attach to more than one jail if and only if that’s the only IP all
the jails have. Most jails need an external address so they can access the
network, so they can’t also attach to the loopback addresses 127.0.0.1 and ::1.
Many software packages expect localhost to be available, including a bunch of
stuff in a standard FreeBSD install. Jails don’t have a loopback address by
default, so they use their default address: the first IP attached to the jail. Try it
yourself; run tcpdump -i lo0 ip on the host, then go to a jail and run ping
127.0.0.1.
This satisfies the software’s requirements. It also means that when a jailed
daemon attaches to a port on the “loopback address,” it’s actually attaching to
the jail’s external IP address. If you’re counting on a daemon binding to only the
loopback address as a security measure, your assumption is invalid. That
daemon listening on “localhost” is actually listening on the network-facing
address.
The obvious thing to do is to create a loopback interface just for jails, or perhaps
even give each jail its own loopback, and assign each jail a unique private IP.
While it isolates those addresses from the network it doesn’t isolate the jails
from one another. Loopback addresses can reach each other. The underlying
problem is that every jail uses the host’s network stack. The host’s network stack
knows dang well how to reach all of these addresses. TCP/IP on the local host is
designed to communicate, not isolate.
The only way to truly separate jails from one another is by assigning each jail a
virtual network stack, or vnet.

Virtual Networking Stacks: VNET
A Unix system traditionally has a single network stack. It might support multiple
routing tables, letting different applications send traffic to different networks, but
for the most part all of the networking stack is a monolithic whole. Every
program can see every interface on the host.
FreeBSD can create virtual network stacks, or vnets. A vnet completely controls
any interfaces assigned to that vnet. You can create virtual interfaces for jails,
plug them together as needed, and create your own network entirely inside your
machine.
You’ll read complaints about how vnets are buggy. They first appeared in
FreeBSD 8-CURRENT and had problems, like any other big new complicated
software. Vnets have undergone extensive testing for over a decade and were
only enabled by default in FreeBSD 12. If you see a message complaining about
vnets, check the date. It’s not that vnets are perfect—bugs can happen anywhere.
But they are expected to work, are in wide use, and bug reports are taken as
seriously as any other FreeBSD bug.
Placing each jail inside its own vnet gives the jail a completely isolated network
stack. Each jail gets its own loopback interface, permitting local networking
without leaking information to other jails. You can delegate packet filter
management to the jail, allowing your jail owners to lock themselves out of their
jails rather than doing it at the host level. Vnet isolation even protects against
debuggers like DTrace and packet sniffers.
Vnets are not perfect. Jails running a version of FreeBSD older than the host’s
might find that programs like netstat(1) and sockstat(1) don’t work properly due
to differing kernel structures. Some network-aware programs require access to
/dev/mem or /dev/kmem, which should never be exposed to a jail. (The jail
should get a “permission denied” message when trying to use them, but still;
don’t expose them.) Overall, though, vnets are a vast improvement to inheriting
a narrow slice of the host’s network stack.
A jail has complete control over its vnet. The jail gets raw socket access.
Parameters like allow.raw_sockets and allow.socket_af are effectively on and

cannot be turned off.
Throughout this section we’ll assume that your jails run a FreeBSD version
fairly similar to the host. The greater the difference between the jail and the host
the more difficulty you’ll have, as discussed in Chapter 10.

Virtual Network Design
Don’t slap the vnet parameter on all your jails and restart them. You’ll totally
disrupt connectivity. Start by designing your virtual network with interfaces and
bridges.
Interfaces are conduits that connect a host to something else. FreeBSD has a
couple of different sorts of virtual interfaces usable for jails. We’re going to
focus on epair(4), which is the virtual equivalent of two Ethernet interfaces
connected by a network cable. Epair interfaces have an A and a B end. For
consistency, always attach the A end to the bridge and the B end to the jail. (Or
decide that “B is for bridge” and do it the other way. Whatever you choose, be
consistent!) Each epair interface has a name starting with e, an interface
number, and which end this interface is, so either e0a or e0b. It then gets a
trailing label, describing the epair’s function. For jails, use the jail name. This
means the interface e0a_loghost is the first epair interface on the jail loghost,
and is attached to the bridge.
Bridges connect interfaces together. A bridge performs the same function as the
standard Ethernet switch. Networking purists should note that FreeBSD’s
bridge(4) virtual bridge filters traffic exactly like a switch. All the interfaces
connected to a bridge can communicate with each other, but can’t snoop each
others’ traffic.
The trick to this virtual network is that not all the interfaces need be virtual. I can
plug all my jails into a virtual bridge so they can see each other, and then add in
my host’s physical external interface. Suddenly, all my virtual interfaces plugged
into the virtual bridge can communicate with the non-virtual network beyond my
You might want your jails to communicate only with each other. Don’t connect a
real interface to the bridge, and the jails will remain isolated from the world.
Maybe your jails need to connect to multiple networks. Give each jail multiple
interfaces and connect to multiple bridges. Add one of the host’s VLANs to the
bridge and the bridge can see that VLAN.
If your jail network is even slightly more complicated than “all my jails bridge to

the outside world via the host’s jail interface,” stop. Get out a piece of paper.
Draw a map. Label all the network segments. Draw arrows on which
components lead to which segments. Use colors.² This might seem childish, but
if you can’t draw a picture you can’t assemble the virtual network. If you are
attempting to replicate an existing environment—say, if you’re building a testbed
that should mirror your organization’s production environment—get the diagram
of that environment and use it as a base.

Our First Virtual Network
For our initial tests we’re using a very simple network. We have a single
physical interface, jailether. All our jails will connect to a bridge that contains
that interface, and through that to the local network. We’ll consider this with
both standard jails and iocage.
Either way, pick a physical interface to dedicate to the jail. Remove all IP
networking configuration from the interface; only bring it up and give it a name.
ifconfig_em1_name="jailether"
ifconfig_jailether="up"
You can now configure vnet jails against that interface.

Standard VNET Jails
It’s entirely possible to manually create an epair interface, attach one end to a jail
and the other to a bridge, attach the bridge to an interface, and bring up the jail.
Nobody has time for all that, though, especially when FreeBSD includes scripts
to do that for you.
The directory /usr/share/examples/jails/ includes a whole bunch of scripts and
documents for jail administrators. Some of it is only applicable to older
FreeBSD releases, while others aren’t relevant for what we’re doing. Copy the
/usr/share/examples/jail/jib script and put it wherever you put your system
scripts. I use /usr/local/scripts/jib in these examples. “Jib” stands for JailInterface-Bridge, and automates epair interface creation and destruction on any
virtual network with four or fewer bridges.
Now configure our first vnet jail. Here’s the beginning of a vnet-friendly
jail.conf.
host.hostname="$name.mwl.io";
exec.prestart="logger trying to start jail $name...";
exec.poststart="logger jail $name has started";
exec.prestop="logger shutting down jail $name";

exec.poststop="logger jail $name has shut down";
exec.consolelog="/var/tmp/$name";
These entries start with the basic setup needed for any jail. We define a path to
place the jail’s files, set a hostname, define the startup and shutdown commands,
and put a devfs in the jail. The exec parameters that log when jail(8) starts and
stops jails aren’t mandatory, but I’ll use them to illustrate some features.
Now let’s set up a vnet jail.
vnet;
vnet.interface="e0b_loghost";
exec.prestart+="/usr/local/scripts/jib addm loghost jailether";
exec.poststop+="/usr/local/scripts/jib destroy loghost";
The vnet parameter tells jail(8) to assign this jail its own virtual network stack.
The vnet.interface parameter tells jail(8) which interface to plug into this jail.
We’re using epair interfaces, so I call the interface e0b_loghost.
The jail’s personal exec.prestart parameter calls jib to add the interface. Note that
I set this parameter with the += syntax. I already defined a global default
exec.prestart at the top of jail.conf. This new entry gets added to the default.
The jib addm command creates the jail’s epair interface and adds one end to a
bridge. If the bridge doesn’t exist, jib creates it. I’ve given two arguments here,
loghost jailether. This translates to: create an epair interface labeled loghost, and
attach one end to the bridge containing the interface jailether.
The jail’s exec.poststop calls jib destroy, which removes unnecessary epair
interfaces. It needs one argument, the epair interface to destroy.
Now start the jail.

The Jail and VNET
Log into the jail and run ifconfig. You’ll see two interfaces, lo0 and e0b_loghost.
You have a network!
root@loghost:~ # ping mwl.io
ping: cannot resolve mwl.io: Host name lookup failure
A closer look will show that the network has no IP configuration. A non-vnet jail
piggybacks off the host’s network, but a vnet jail has no access to the host’s
network. Go into the jail’s /etc/rc.conf and configure networking exactly as you
would on any other FreeBSD host.
ifconfig_e0b_loghost="203.0.113.231/24"
defaultrouter="203.0.113.1"
Reboot the jail, and you’ll be on the network!
The private vnet permits greater flexibility in jail configuration without
sacrificing security. If you permit access to /dev/bpf, you can both sniff packets
and use DHCP to assign jail addresses. If the host has a firewall kernel module
loaded and you expose the firewall devices to the jail, you can run PF inside the
jail.

The Host and VNET
Before you log into your new vnet jail, take a look at the host. You’ll notice two
new interfaces, jailetherbridge and e0a_loghost. Let’s look at the bridge first. A
bunch of what’s in the bridge is only of interest to network folks, but some bits
are illuminating.
jailetherbridge:
flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> metric 0
mtu 1500
ether 02:07:c5:a6:aa:00
member: e0a_loghost
flags=143<LEARNING,DISCOVER,AUTOEDGE,AUTOPTP>
ifmaxaddr 0 port 5 priority 128 path cost 2000
member: jailether
flags=143<LEARNING,DISCOVER,AUTOEDGE,AUTOPTP>
ifmaxaddr 0 port 2 priority 128 path cost 20000
This bridge is named after the first physical interface added to it. The interface
was named jailether, so this is jailetherbridge.
Each bridge member appears on the following list. The first member is the A end
of the jail’s epair interface, e0a_loghost. The second member is the physical
interface, jailether. This bridge will gain a member with every vnet jail added to
the bridge. If you see an interface for a jail that doesn’t belong on this bridge,
you botched the jail.conf entry.
One thing you won’t see is the e0b_loghost interface, the end that’s attached to
the jail. The ifconfig command only shows interfaces attached to the current

network stack. You can’t see the interface in the jail any more than you can run
ifconfig on your desktop and see the server’s interfaces. Go log into the jail.

iocage VNET Jails
The iocage program can manage bridges and interfaces for you. It defaults to
using a very simple network, a single bridge that accesses the network through
the host’s main interface. (“Main interface” being defined as “whatever interface
can hit the default route.” We’ll discuss changing that, but for now go with it.)
Create a vnet jail by setting vnet to on. You must also set an IP address,
including the netmask. If you want the jail to reach networks beyond the local
LAN, also define the defaultrouter parameter. Then you’ll need a name and a
release, just like any other iocage jail.
defaultrouter=198.51.100.1 vnet=on -r 13.0-CURRENT
When the jail is created, take a look at your interfaces. You’ll discover a newly
added bridge0, containing the host’s main interface and half of the jail’s epair.
The iocage program names the new epair interface vnet with a number. The
interface description gives the jail name.
Shutting down all the jails does not destroy the bridge. People might configure
services like DHCP or packet filters or NetFlow³ on that bridge, so it needs to
remain in place. If it offends you, remove it manually with ifconfig bridge0
destroy—but it’ll reappear as soon as you start another vnet jail.
That’s really it. Unless we want to get complicated. Which we do.

Alternate Interfaces
I don’t want my jails using the host’s management interface. That’s why I have
this jailether interface, so jails can spew their garbage on the network and not
interfere with my pristine host. The parameter vnet_default_interface specifies a
system interface to add to the bridge instead of the host’s main interface. Not
only do I want to use the interface jailether, I want all iocage jails to use that
interface. This means I need to change iocage’s default setting for this parameter.
Shut down all of your iocage vnet jails. Remove the existing bridge0 interface.
Restart your iocage vnet jails, and iocage will create a new bridge with the
proper interface.

Complicated Networks
What if you want a whole bunch of bridges, with jails plugged into each willynilly? Again, make a network diagram. Name your bridges. Show where you
want every jail to plug in. You can then use iocage’s interface mapping
parameter, interfaces, to assign jail interfaces to bridges. The interfaces
parameter always takes the format vnet:bridge. The iocage program creates the
vnet interfaces, but it assumes that if you’re mapping interfaces to specific
bridges you’re taking responsibility for those bridges. Here I map the vnet
interface on jail www1 to connect to the bridge jailetherbridge.
If you have multiple interfaces, separate them with commas.
Assign IP addresses to each interface as well.
Why would a jail have multiple interfaces? I’m glad you asked!

Multiple Bridges
Having a single bridge with a single interface attached to the outside world
works fine for most applications, but what if you’re trying to simulate a more
complicated setup? Perhaps you want to test an application behind a firewall or
one of those multi-tier web server/database setups with layers of load balancers
and packet filters and who knows what? Maybe you can’t include that
proprietary multimillion-dollar⁴ firewall in a jail, but you can emulate the basic
architecture and work out the obvious bogusness before deploying your
application to the staging environment.
We’re going to add a second layer to our virtual network. The existing bridge,
jailetherbridge, will remain in place. We’re adding another bridge, jailprivbridge,
that uses the IP range 192.0.2.0/24. The database servers will only connect to the
private bridge, while the application servers will connect to both the Ethernetfacing and private bridges.
You know how to attach the database hosts to a bridge; merely change the
jailetherbridge entries to jailprivbridge. The only trick of this configuration is
understanding how to create the bridges, and then how to attach multiple
interfaces to a jail.

Standard Jails with Multiple Interfaces
The jib command requires an existing interface to build a bridge on, so we’ll
create a loopback interface on the host. I’ll call this interface jailpriv. (I would
spell out jailprivate, but the resulting bridge name is too long.) Create this
interface at boot-time with these rc.conf entries.
cloned_interfaces="lo1"
ifconfig_lo1_name="jailpriv"
Upon reboot, you can attach the private bridge to this interface.
Now configure a jail with multiple interfaces. The jail loghost will connect to
both the public and private networks.
vnet;
vnet.interface=e0b_loghost, e1b_loghost;
exec.prestart+="/usr/local/scripts/jib addm loghost jailether jailpriv";
exec.poststop+="/usr/local/scripts/jib destroy loghost";
allow.raw_sockets;
The vnet.interface parameter has two interface names, separated by a comma.
Note that the interfaces are not quoted. Quoting causes them to be treated as a
single unit, which is fine when you only have one interface but is counterproductive when you want multiple entries.
The tricky part is the exec.prestart jib command. The addm loghost part basically
means “add the loghost interfaces to these bridges.” It then lists the bridges to
add each of the interfaces to. Interfaces are added to bridges in order—that is,
the first interface is attached to the first bridge, the second interface to the

second bridge, and so on.
The first interface shown in vnet.interface, e0b_loghost, gets glued to the first
bridge shown at the end of the exec.prestart jib addm loghost command,
jailether. The second interface shown in vnet.interface, e1b_loghost, is
connected to the second bridge shown, jailpriv. The jib script lets you list up to
four interfaces and bridges.
If you make a mistake configuring the jail and wind up with freshly created
interfaces but no running jail, running jib destroy loghost will remove all of that
jail’s interfaces.
Boot up the jail and configure IP addresses on all the interfaces. You should be
able to ping across the private and Ethernet-facing bridge. Hosts on the private
bridge have no connectivity to the outside world—unless you configure one of
the dual-interface hosts as a packet filtering firewall, that is.

iocage With Multiple Interfaces
You must create the jailprivbridge and jailetherbridge interfaces in rc.conf before
trying to use them. Here I create the interfaces bridge0, bridge1, and lo1, give
them the desired names, and add interfaces to the bridges.
ifconfig_em1_name="jailether"
ifconfig_jailether="up"
cloned_interfaces="bridge0 bridge1 lo1"
ifconfig_bridge0_name="jailetherbridge"
ifconfig_bridge1_name="jailprivbridge"
ifconfig_lo1_name="jailpriv"
ifconfig_jailetherbridge="addm jailether up"
ifconfig_jailprivbridge="addm jailpriv up"
We can now use these bridges.
Use iocage’s interfaces property to assign virtual interfaces to bridges, in
comma-separated pairs. Here I attach the virtual interfaces vnet0 to the bridge
jailetherbridge, and vnet1 to jailprivbridge.
Configuring multiple IP addresses is rather similar, except the IP address
parameters use a pipe rather than a colon to pair up interfaces and addresses.
You can now start www1 and ping across both the private and public bridges.
(Remember, vnet jails control their own sockets and need no special permissions
for ping.)

You’ll find a minor gotcha when moving an iocage jail to a fully private bridge.
That bridge has no external access, but iocage won’t start a jail without a
legitimate-looking default route. The key here is legitimate-looking. Set the
defaultrouter parameter to an unused IP on the jail’s subnet and iocage will start
the jail right up.

Manual Interface Plumbing
Scripts and commands that hide all tedious command lines are nice, but
sometimes you have no choice but to dig in and set up the network manually.
Perhaps you need a virtual crossover cable between two jails, or you’re
attempting to simulate that rat’s nest of switches and cables your network
administrator jokingly calls a production network. The ifconfig command lets
you create logical interfaces and shift interfaces between vnets. As an example,
I’m creating a single epair interface and attaching one end to the host firewall
and another to the bridge failover. This is exactly what iocage and jib do when
they create interfaces.
Creating a virtual interface, like a bridge or an epair, merely requires declaring it
exists. The ifconfig command returns the device name and number.
epair0a
While ifconfig only tells you about the one end of the epair, it creates both ends.
If you want a specific device number, declare it when creating the interface. If I
want to specifically use device 9:
Assign your epair interfaces meaningful names.
e0a_firewall
e0b_firewall
Now we must decide where to put each of these interfaces. For all of our
previous examples, one end of the epair was attached to a bridge. The other was
attached to a jail. As a general rule, I put the interface’s a end as close to the host

as possible.⁵ Here I attach e0a_firewall to the bridge failover.
The e0b_firewall interface at the other end of the epair needs to be moved into
the vnet jail firewall. Each vnet is named after its jail. (Before you ask: yes, the
host’s networking stack also runs as a vnet, called vnet 0.) Assign the interface’s
vnet with ifconfig.
The interface will disappear from the host’s network stack and reappear inside
You can move any interface between vnets. Suppose you’re running your web
server inside a jail, but it has high enough traffic that it needs a dedicated
interface.
Your jail now has a private physical interface.

Other Networking Features
Jails have a variety of other networking features. You can get a jail’s IP address
from DNS, leverage PF to host multiple jails on one IP, and have iocage
configure a jail’s resolver.

Get Jail Address from DNS
You already have an authoritative list of hostnames and addresses in your DNS
server, so why would you possibly want to maintain a second list in jail.conf? In
my case, it’s because I make up all my jail names and don’t bother putting them
into DNS. Taking jail IP addresses from DNS makes perfect sense for many
environments, though.
The ip_hostname parameter tells jail(8) to look up the IPv4 and IPv6 addresses
of the value of the host.hostname parameter, and assign the first addresses
returned as the jail’s IPv4 and IPv6 addresses.
A jail’s name parameter is never a default, but if you set ip_hostname as a
default you can get your jail definitions down to something like this.
www4 {}
This feature is available in iocage as the ip_hostname parameter.
The ip_hostname parameter adds DNS as a startup dependency. If you jail your
DNS servers, verify that your DNS servers can bootstrap themselves even in a
completely cold startup. How will your network restart after a power outage that
outlasts your UPS and diesel generators? I recommend avoiding ip_hostname on
jails that provide DNS service. Chicken-and-egg bootstrap problems amuse
everyone who doesn’t have to solve them.

iocage and the Resolver
The iocage program defaults to copying the host’s /etc/resolv.conf to each jail.
This isn’t a bad default, but you might want a different configuration. If your
host has a whole bunch of jails, you might add one more to serve as a recursive
DNS server, or perhaps you want to direct a specific jail to a certain DNS server.
The resolver parameter lets you configure the jail’s resolv.conf on the command
line. Semicolons become newlines. Suppose I want the jail www1 to use this
resolv.conf.
search mwl.io
nameserver 198.51.100.3
nameserver 2001:db8::bad:code:cafe
I’d set the resolver property like so.
2001:db8::bad:code:cafe;" www1
To revert to the default, set resolver to /etc/resolv.conf or none.
Resolver configuration is a prime candidate for setting as a global default, using
the default jail.
At this point you should be able to configure the network any way you need.
Let’s see about using jails to handle the weird stuff.
¹ Everything will continue to run, mind you. Only without any network
connectivity.

² I always enjoy asking the company supply officer to order me new crayons.

³ No, I’m honestly not shilling my book Network Flow Analysis (No Starch
Press, 2010) here. That would require subtlety, which I lack.

⁴ but basically worthless

⁵ This echoes an interface IP addressing rule from my ISP career: “we are low,
and we are odd.” Both technically and socially accurate, and handy for the kids
that don’t yet understand subnets.

## Chapter 10. Extreme Jails

One reason I like jails so much is that they let you cope with weird problems.
We’ve all encountered those ancient, vital systems that nobody dares touch, let
alone upgrade, and yet the hardware is so feeble that you know they’re going to
implode any time. We have customers and applications that need to run their
own jails, but don’t need an entire host. Or you might even want to run a Linux
install inside a jail.
We’ll start with jails that can run jails.

Hierarchical Jails
Jails can run their own jails, with their host administrator’s permission. These
hierarchical jails let you establish further layers of access control. Hierarchical
jails let you delegate jail management down from the host. A jail that runs a jail
is called a parent jail, while jails run inside a jail are child jails. It’s possible for
children to run their own child jails, making them both parents and children.¹ A
parent jail can restart its children, which empowers users. Both standard jails and
iocage can create a top-level parent jail, but you can’t yet use iocage within a
jail.
The children.max parameter (children_max in iocage) sets the maximum number
of jails that a jail can run. This defaults to zero, blocking jails from spawning
jails. Parent jails can delegate a number of their allowed children to a child jail,
allowing children to have their own children.
If a jail is a collection of altered namespaces, hierarchical jails offer child jails
subsets of those altered namespaces. For example, a child jail’s process
namespace is a subset of the parent jail’s process namespace. A parent jail can
see all of the processes in its namespace and all of its child’s processes, where
the child can only see its own processes. The parent jail’s process namespace is a
subset of the host’s process namespace, so the host can see all the processes. A
parent jail is restricted to a portion of the filesystem, so child jails are limited to
a subset of that portion. If a parent jail only gets partial access to kernel
functions, the child jail gets a subset of that.
This means that a parent jail cannot grant a child jail access rights the parent
doesn’t have. If a parent jail is not allowed to mount filesystems, the child jail
cannot either. A jail can’t assign its children access to device nodes that it
doesn’t have.

Hierarchical Jail Networking
Before configuring a parent jail, think about the network configuration. Some of
the constraints that seem minor when managing jails from a host get really
inconvenient when a parent jail tries to corral its children.
A common desire is to assign each parent several IP addresses, so that it can
allocate those addresses to its children. Each IP can be assigned to one and only
one jail, though. The parent jail is a jail. You can have a parent jail delegate
addresses to its children, if the parent jail has its own vnet. Remember, IP
addresses belong to the vnet. If the parent jail controls the vnet, this restriction
doesn’t apply.
A parent jail without vnet cannot control its IP address stack. It can tell its
children to inherit its IP settings, which works fine but limits jail utility. You can
configure the host firewall to redirect incoming connections to particular
addresses and ports bound to the loopback interface. This is all ugly and clunky,
though.
I recommend always configuring parent jails in their own vnet.

Creating a Parent Jail
Creating a parent jail requires setting children.max to the maximum number of
child jails this parent should have. A parent jail must be able to mount
filesystems for its children—if nothing else, each child needs a device
filesystem. We’ll use the parent jails dba1 and dba2 in our examples, each in its
own vnet. The jail dba1 is used for MariaDB testing, while dba2 is for Postgres.
Here’s dba1 in jail.conf. It can support five child jails, and gets a virtual interface
attached to a bridge as discussed in Chapter 9. I’m inheriting parameters such as
path, host.hostname, and so on from the defaults at the top of jail.conf.
dba1 {
vnet;
vnet.interface=e0b_dba1;
exec.prestart+="/usr/local/scripts/jib addm dba1 jailether";
exec.poststop+="/usr/local/scripts/jib destroy dba1";
allow.mount;
allow.mount.devfs;
enforce_statfs=1;
children.max=5;
Creating a parent jail with iocage is very similar to creating any other jail. It will
have a much longer address entry than most, and you must set the children_max
parameter. Here I create the jail dba2, with the IP addresses 198.51.100.230,
running FreeBSD 12.0, and let it start up to five children.
interfaces="vnet0:jailetherbridge" ip4_addr="vnet0|198.51.100.230/24"

defaultrouter=198.51.100.1 children_max=5
While you can set all the necessary parameters when creating the jail, the
command line is already too long for my comfort. Here I give dba2 permission
to mount a /dev in its child jails.
You must use standard jails to manage children.

Creating Child Jails
I’ll set up the child jails much like I do jails on the host, with all configuration in
/etc/jail.conf and all child jail data files in the jail’s /jail. Here’s how I configure
/etc/jail.conf on dba1 for a whole bunch of MariaDB jails on dba1.
host.hostname="$name.mwl.io";
All of the above comes straight from the host’s jail.conf.
devfs_ruleset="0";
The jails must have a devfs. Jails don’t have access to the host’s devd, though,
and have no ability to create their own device filesystems. Their /dev is a copy of
the parent jail’s. Attempting to apply a ruleset is an error, though, so by using
devfs_ruleset to specify ruleset 0 we tell jail(8) to not bother attempting to apply
a ruleset.
ip_hostname;
mariadb1 {}
mariadb2 {}
mariadb3 {}
mariadb4 {}

mariadb5 {}
By pulling the child jail IP addresses out of DNS, our jail definitions become a
set of names that all use the default settings.
The jail.conf on dba2 looks exactly like this, except with a global search-andreplace of “mariadb” with “pg.”
The parent jails can now run service jail start and spawn their children.

Managing Children
A jail can view all of its own children, and all of its children’s children. A host
can view and manage every jail on the system. If I run jls on dba2, I see its child
jails. The default jls view isn’t terribly enlightening here, so I’m going to look
specifically at jail names, jail IDs, and parents.

name jid parent
pg1 28 0
pg2 29 0
pg3 30 0
pg4 31 0
Each jail is named as this parent jail configured it, much as you’d expect. If
you’ve just started your jails you might expect your jail IDs to start with 1, but
these higher numbers are fine. The jail’s parent should show the JID of the
parent jail. A parent of 0 means “this system.”
The exact same command on the host shows something else.

name

jid parent

ioc-dba2

21 0

dba1

22 0

dba1.mariadb1 23 22
dba1.mariadb2 24 22
ioc-dba2.pg1 28 21
ioc-dba2.pg2 29 21
ioc-dba2.pg3 30 21
The first two jails are ioc-dba2, or “jail dba2 run via iocage,” and standard jail
dba1. Their parent is 0, so they’re running on the host.
Child jails get names starting with their parent, a period, and the child jail name.
Jail dba1.mariadb1 is the jail mariadb1 running on jail dba1. Jail ioc-dba2.pg3 is
jail pg3 running on jail ioc-dba2. If the child jails have their own children, these
names can get quite long.
The “parent” column shows the JID of each child jail’s parent.
The host has ultimate control over all its jails. As root on the host I can run top -j
ioc-dba2.pg4 and see what’s going on in this jail. I can kill arbitrary processes. If
a child jail runs amok I can shut it down hard. One way is to use jexec on the
parent jail and shut the jail down, but if it’s really a problem I’ll break out raw
jail(8) commands and blow the child away. The -r flag unceremoniously
removes jails without bothering to run any of the shutdown commands.
dba1.mariadb3: removed
Problem child removed. And with hierarchical jails, problem users can now own
any problems with their jails.

Old FreeBSD Versions
One advantage to jails is that you can avoid upgrading old systems. Every
enterprise has hosts that are old enough that the hardware’s going to die any day,
but the operating system and applications are so ancient that no current sysadmin
dares touch it. You can pick up almost any FreeBSD 4.0 or later system and jail
it on a current FreeBSD host. Some people have had success jailing FreeBSD 3
and earlier, but that requires a custom kernel with a.out support.²
We’re going to go through jailing an ancient FreeBSD server. My first and
foremost recommendation is to not do it. It’s almost always better to reinstall a
modern operating system release and current applications. The packages
collection includes compatibility libraries back to FreeBSD 4. Try to make your
application work with those before converting the old host to a jail. Sometimes
installing a new OS release, the compatibility libraries, and copying the old
server’s /usr/local to the new host suffices to get those old applications running.
Sometimes it doesn’t, though. The last ancient server I jailed ran FreeBSD 4,
with PHP 5 and MySQL 4. Unfortunately, it ran a mission-critical application
that had been written in-house and was continually modified for years and years
afterwards. Nobody still employed there knew anything about the application’s
innards, nobody was willing to even try to rewrite it, commercial replacements
ran hundreds of thousands of dollars, and the underlying hardware had started
life as a discarded desktop. Being responsible for the system, I decided I would
rather jail it than try to resurrect the hardware after its inevitable smoky death.
The goal of such a project is not to perfectly replicate the old FreeBSD install in
a jail. The goal is to restore the vital application by any means necessary.

Identifying Your Jail
Before you try converting an old server to a jail, investigate the existing system.
You at least want your jail to lie consistently.
Many people use some variant of uname(1) to get the operating system version.
That’s incorrect practice, but most of the time it’s okay. The first thing I do on an
unfamiliar system is run uname -a to see what I’m really dealing with. The
problem is, uname queries the kernel. The host kernel must be equal to or newer
than the jail’s operating system version. If uname declares you’re running
FreeBSD 15, the only thing you can be sure of is that you’re not running
FreeBSD 16 or higher. On a hypothetical FreeBSD 4 jail, this is wildly
misleading.
The kernel provides two sysctls that uname uses to provide this information. The
kern.osreldate sysctl provides the kernel release date for uname -K, while
kern.osrelease gives the FreeBSD release returned by uname -r. The osreldate
parameter lets you set a jail’s kern.osreldate, while osrelease lets you set
kern.osrelease. The problem with these is that you need to know those values for
the FreeBSD version you’re jailing. If the host runs you can check the sysctls. If
not, spend some time with search engines and dig up reasonable values.
As of FreeBSD 10, use freebsd-version(1) to print the release you’re running.

Pillaging the Old Server
Take the server destined for jailing and drop it to single user mode. If it’s old
enough to have /proc, unmount it. Mount some sort of removable storage such as
a USB drive or even an NFS share. Tar up every file on the server, including
temporary directories. If directories like /usr/obj, /usr/src, or /usr/ports exist, grab
them. They won’t take up much space on a modern hard drive, and having the
exact source used to build the host’s binaries might be vital later.
Keep the original server on hand until you’re absolutely, positively certain you
don’t need it any more.

Replicating the Old Server
Extract the old server’s files in their new home on the jail host. Be sure you use
the -p flag, to preserve permissions.
Study the jail’s /etc/fstab. A whole bunch of it is now irrelevant—you won’t
need separate mounts for /var and /tmp, but this jail might expect a special NFS
mount or some such. Is that mount a convenience, or does the application truly
need that? You might have to provide such mounts from the host rather than the
jail. If the application doesn’t need /proc, get rid of it.
The jail’s /etc/rc.conf is where stuff gets really interesting. The host handles all
networking functions, so all those settings can go away. Eliminate any daemons
that provide services the host now handles. Your jailed host needs only the
functions that directly support the application. For my jail, that meant MySQL
and Apache.
Resist the temptation to improve the application. If the web server compiled PHP
scripts on every hit rather than using PHP-FPM, leave it alone. Premature
optimization will doom this project.
Does the original server predate devfs? If so, remove the contents of /dev. You
can’t use old device nodes on a modern system.³ Have the jail mount a devfs.
Use the host to protect the new jail. Ancient packet filters and SSH daemons are
probably vulnerable to intruders, so don’t use them. Use the host’s SSH daemon
to provide user access, and then jexec into the jail. Use a packet filter to isolate
the jail from absolutely everyone who doesn’t specifically need access.
In theory, the jail should now run. You’ll have to perform your usual sysadmin
debugging to find all the edge cases that drove you to attempt this migration.

Old Release Compatibility
FreeBSD’s binary compatibility with older releases is generally excellent, but
programs that directly access the kernel have problems. Programs like netstat(1)
and route(1) expect to read kernel memory structures, and choke when those
structures differ from what it expects. I have trouble running a FreeBSD 12
sockstat(1) on a FreeBSD 13 host. And there’s no way a FreeBSD 4 /bin/ps can
read process information from a modern FreeBSD kernel.
One possible solution is to copy static binaries for those programs into the jail,
overwriting the original programs. The /rescue directory includes a whole bunch
of programs hard-linked to a single crunched binary, /rescue/rescue. It’s intended
for repairing badly damaged systems. There’s a whole bunch of useful stuff in
there, from gzip to route. You can copy the host’s /rescue/ps over the jail’s
/bin/ps and restore that function, so long as your custom application didn’t
involve parsing ps(1) output. If you need to replace multiple programs, use hard
links instead of copying the crunched binary again.
The Jetpack container toolkit (https://gitlab.com/jetpack-containers/) contains
jexec-static, a program to run static binaries on the host inside a jail. You might
find this useful in kludging together a solution.
If FreeBSD doesn’t ship with a static version of a program that you can copy
into the jail, you might have to build that binary yourself. Figuring out how to do
that is a heck of a lot easier than waiting for a twenty-year-old hard drive to
shatter and bring down your whole company. It’s not like you’re doing
something truly unspeakable, like running Linux in a jail.

Running Linux in a Jail
While you can run Linux in a jail I must say up front: I don’t recommend it.
Here be feral wombats, refurbished Tiger tanks, and Sauron. Running Linux in a
jail is more complicated than running twenty-year-old FreeBSD in a jail, and
requires moral compromise and tedious debugging. But people successfully run
Linux software in Linux jails. People have developed working device drivers in
Linux jails. Sometimes, running Linux in a jail is the least hideous way to solve
a problem.⁴
You must understand how to use FreeBSD’s Linux mode before you can run a
Linux in a jail. If you’ve never used Linux mode, trying to run a Linux jail is
likely to drive you to madness. I’m going to touch on a few basics here to
remind those of you that haven’t used it for a while.
FreeBSD’s Linux compatibility system isn’t really a compatibility system. The
FreeBSD kernel provides a Linux-compatible application binary interface (ABI).
The ABI is how programs request services from the kernel. As far as software is
concerned, the ABI is the kernel. By providing the Linux ABI, FreeBSD can
answer system calls from Linux programs. You still have to provide the userland
libraries and programs, but those you can grab from any number of download
sites. FreeBSD’s standard Linux emulator uses a Linux userland in
/compat/linux and runs most of the programs there, but we want to take this a
step further and run a pure Linux userland inside a jail.
Always remember that Linux mode is imperfect. The ABI provides most of what
a Linux kernel does. Some system calls are missing, and will remain missing
until someone gets sufficiently annoyed to add them. The sysctl
compat.linux.osrelease provides a Linux kernel version that we claim to support,
but really that’s just a lie FreeBSD tells because certain Linux programs get
upset when that string isn’t available.
Not all programs work; you won’t be formatting filesystems using Linux tools.
You’ll have to piece together the software and configurations needed to solve
your specific problem. Definitely review the basics of Linux compatibility
before starting on such a project; you must understand how to install packages
and how to debug with tools like truss or DTrace. Modern FreeBSD should

handle binary branding for you; if you need brandelf(1), it’s a bug.
Before starting, enable Linux mode on the host. The initial installation process
also requires the Linux synthetic filesystem linsysfs and linprocfs, as well as
fdescfs and tmpfs. Load everything into the kernel before starting.

Which Linux?
A quick Internet search shows that people have successfully installed different
distributions into a jail. Which should you pick? I recommend choosing the
simplest and most BSD-ish distribution that will meet your needs. Avoid
systemd-based distributions if possible—again, it can be done, but systemd is
intrusive and that dependency further complicates the whole effort.
For this example I’m using Devuan (https://www.devuan.org), a systemd-free
Debian variant. The userland tools are familiar to a majority of Linux
administrators, and it has a reasonably numerous user base.
If you need another specific Linux distribution, or if you’re attempting to jail an
old Linux in the same way you’d jail an old FreeBSD, look around and you’ll
probably find a post by someone who’s already done it. Learn from their
mistakes.

Creating the Devuan Jail
Start with an empty jail. Here I create the jail devuan with iocage.
Linux uses startup and shutdown scripts other than FreeBSD’s /etc/rc. Figure out
what scripts your chosen Linux uses and set them in the jail’s exec.start and
exec.stop. Here I tell iocage to use the Devuan scripts. Set these parameters in
jail.conf if you’re using standard jails.
The jail will also need a linprocfs, linsysfs, and tmpfs.
Now to put some files in the jail. Use debootstrap to download Devuan into the
jail. The debootstrap program is a Debian management tool for installing Debian
to a directory, but it’s available as a FreeBSD package. We can only use part of
debootstrap’s functionality, but it’s enough to get packages on the disk.
Our debootstrap command has this format.
The --foreign flag tell debootstrap that it’s running on something other than the
destination platform, and that it shouldn’t try to run Debian-specific commands
because they aren’t present. It will download and unpack programs, but stop
before making device nodes and other Linuxy stuff.
The arch flag is the hardware architecture you’re running on. This is probably
amd64, but if you’re on 32-bit hardware use i386.

Devuan, like Debian, comes in several versions simultaneously. You can’t use
Devuan release names, but you can use the stable, unstable, and testing labels.
Stick with stable for your first attempt.
The directory is the destination for these files—in this case,
/iocage/jails/devuan/root/.
Finally, the site is the Internet location to download the files from. We’ll use the
Devuan main site, http://deb.devuan.org/merged/.
This gives us a final command of:
http://deb.devuan.org/merged/
You’ll get a warning that debootstrap cannot validate the package signatures
because your FreeBSD machine doesn’t have the Devuan keys installed, and
then you’ll see a bunch of packages being downloaded.
Once the packages are downloaded, go into the jail’s root directory and
temporarily mount the synthetic filesystems.
In theory, you can run a simple chroot now and be inside the Linux jail. If you
get errors involving binary types, either you haven’t loaded all the Linux kernel
modules or you need to fix the branding on all the binaries in the jail’s /bin and
/sbin.
I have no name!@storm:/#
The prompt includes the standard Debian unconfigured host complaint, and has
dragged my jail server’s hostname in as well. I don’t know a better sign that this
jail is a total mess—but it’s progress.

We only did the initial Debian bootstrapping. The package database is in an
inconsistent state, and while packages are extracted they’re not really
configured. Inside the chroot, tell dpkg to configure everything and set up the
package database.
It’ll generate warnings because you’re not really running on a Linux host, but
you’ll wind up with configured packages. You’ll be prompted for a couple of
choices, depending on your Devuan version. I take the defaults, because I’m
going to be butchering this system and there’s no reason to inflict additional
damage. Some of those errors left packages in a “to be configured” state, though,
so let’s configure those.
At this point everything should be installed. You can check the package database
for problems, though. Any package flagged with “ii” is having trouble.
If a package is having trouble, try reinstalling it. Find the original download for
that package in /var/cache/apt/archives/ and run dpkg --force-all -i on the file.
Once the userland looks as good as you can get it, start the jail.
iocage console devuan
Linux devuan 2.6.32 x86_64 GNU/Linux
The programs included with the Devuan GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
Devuan GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the
extent

permitted by applicable law.
root@devuan:~#
Congratulations, the monster is alive and lurching towards the village. Toast
your successful abomination and find a way to cleanse your soul.
At this point, you’re on your own. Will your Linux-only program run in a jail?
The only way to find out is to install it and resolve the inevitable errors.

Helping Linux Jails
While you’re on your own at this point, here’s some tricks I use to help make
Linux jails manageable.
You can’t use Linux ifconfig or route in a Linux jail. If you want the jail in its
own vnet, that’s a problem. You need to use FreeBSD tools to configure
FreeBSD networking. The /rescue directory includes quite a few standard
commands, including networking commands. Don’t just copy the whole
directory, though; there’s only one binary in that directory, /rescue/rescue. It’s a
crunched binary, and all the other commands are links to that binary. If you copy
the directory, you’ll have umpteen copies of the same crunched binary. Tar up
the host’s /rescue and extract it in the jail’s /rescue to preserve those links.
Perhaps replacing the Linux ifconfig and route commands with the FreeBSD
versions would simplify your life, or perhaps it would ruin everything.
I’ve found strange differences between standard jails and iocage. Sometimes a
Linux jail works fine under one or the other. I’ve run Linux jails with their own
vnet, which works fine so long as I use an external script to create and connect
the interfaces rather than relying on the build-in jail configuration.
Running a Linux jail is an exercise in patience and persistence. Good luck.

Other Jail Tricks
If you can imagine it happening in a jail, someone’s tried it. People run X servers
inside jails, using Xnest. People develop device drivers in jails. People ranch
cattle in jails—no, wait. Not cattle. But jails can subsume almost anything, and
people have successfully jailed software I wouldn’t have imagined could be
constrained that way.
Do some research. See what people have successfully jailed, and where they’ve
failed. Pay attention to dates; the jail toolchain constantly improves, and what
was impossible several years ago might be very doable today.
Now let’s make sure your experiments don’t monopolize your host.
¹ When using hierarchical jails some folks call the parent jail a “host” and the
FreeBSD install running on hardware the “base host,” but I absolutely refuse to
torment the word “base” any further.

² And desperation. Piles of desperation.

³ Technically you can use twenty-year-old device nodes on a modern system. It’ll
unpredictably damage the system, but you can do it.

⁴ Sysadmin rule #14 – The only thing worse than going with your least appalling
idea is to do nothing.

## Chapter 11. Resource Restriction and Removal

We’ve all seen amok programs entirely consume a host. Jailing a program
doesn’t solve this problem. You can do various login.conf tweaks to help restrict
particular programs, but that doesn’t constrain a jail as a whole. FreeBSD lets
you restrict the resources a program, user, login class, or jail can use with rctl(8)
and cpuset(8). We’re going to focus on their application to jails, but you can use
them on any host for any reason.
Resource limiting is not a miracle. One of a sysadmin’s major responsibilities is
rearranging bottlenecks to coax optimal performance out of limited resources.
Resource limiting is the reverse of that: imposing bottlenecks to impose a
specific distribution of limited resources. How many times have you removed a
bottleneck, only to discover another bottleneck right behind it? I once fixed a
database server’s slow disk reads, and discovered they were the only thing
keeping the database from exhausting the host’s memory. Impose a limit on a
jail’s memory and it might page so fiercely that your disk becomes unusable.
Resource limits are a source of infinite frustration or boundless sardonic
amusement, depending on your personality.
Some resources shortages can be worked around easily, though.

Periodic(8) and Jails
FreeBSD runs periodic(8) once a day, once a week, and once a month, as
scheduled by /etc/crontab. This is how FreeBSD performs routine maintenance
and generates those daily, weekly, and monthly status reports. Jails need that
maintenance as well, but these tasks eat storage I/O. Once a host has more than a
couple jails, it drags to a crawl when the scheduled jobs kick off.
The easiest thing to do is to reschedule the periodic tasks in your jails. I allow
my host an hour for periodic tasks, and then stagger the jails five minutes apart.
You might schedule jails attached to different storage controllers to run
simultaneously.
You might find it easier to schedule jail periodic tasks from the host, rather than
the jails. Disable the periodic entries in each jail. Use the host’s root crontab and
launch periodic with jexec.
You can also audit which tasks the jails perform. I don’t want to see network
interface output from my jails as part of the daily maintenance: jails don’t have
enough access to give me accurate results. The only interface reports I care about
come from the host. I can disable that output in my daily status mails. Does a
host handle email? If not, stop checking the sendmail queue.¹ Adjust all of these
tasks in the jail’s /etc/periodic.conf.
When you experience recurring performance issues, always check to see if your
jails are simultaneously running scheduled tasks. It doesn’t matter if you have
the biggest, baddest storage arrays and controllers known to man; enough
processes beating on it will make it stagger. My forty database jails can run their
dump-to-file backups ten minutes apart and nobody will notice anything, but
simultaneous database dumps interrupt service. As with periodic tasks, I often
find scheduling software maintenance simplest from the host’s crontab.
Some problems aren’t so easy to solve.

Resource Limiting
Software cannot be trusted. Even a highly skilled developer with the best of
intentions and meticulous coding practices writes programs that bursts into
flames when poked wrong. They can’t help it; the software they’re using to write
the software also cannot be trusted. One of the risks of jails is that one jail might
demand an unfair share of host resources, starving other jails. FreeBSD uses
RCTL and rctl(8) to limit resource consumption. While older versions of RCTL
impacted system performance, it now has negligible effects on system capacity
and non-limited processes.
RCTL is a kernel feature specifically for restricting resource usage. You must
enable it at boot by setting kern.racct.enable to 1 in /boot/loader.conf. If RCTL is
enabled, rctl should run without errors.
It won’t produce any output until you have rules.

RCTL Rules
RCTL manages resources through rules. Use rctl(8) to add, remove, and view
rules. Rules all have four components, separated by colons.
subject type : subject : resource : action
The subject type is what sort of entity this rule applies to. RCTL supports four
types of rules: process, user, loginclass, and jail. The subject type differentiates
the user phk from the jail named phk.
The subject is where you specify the entity to be limited. Give a username, a
process ID, a login class, or a jail name here.
The resource is the formal name of the system resource we’re restricting access
to.
The action sets the limit and declares what’s to be done when the limit is hit.
Taken as a whole, this lets you declare rules such as “limit user phk to 50% of
one CPU.”
user:phk:pcpu:deny=50
Here I restrict the jail loghost to 10 disk read operations per second.
jail:loghost:readiops:throttle=10
Restricting the amount of memory a big application can use makes sense. In this
rule I limit the jail dba1 to 2 GB of memory.
jail:dba1:vmemoryuse:deny=2g
Rules let you impose nearly arbitrary limits. In this rule, if process 1 runs for
longer than thirty seconds I send it SIGKILL. (You can only assign process rules
to processes that exist, and the rules self-destruct when the process exits.)
process:1:wallclock:sigkill=30

We’ll mostly focus on jail rules from here on out. Writing good rules is about
understanding resources and actions.

RCTL Resources
RCTL supports over two dozen resources, but some are friendlier than others.
Perhaps you know how to calculate the appropriate amount of CPU time a jail
should use before it gets unceremoniously terminated, but I don’t. Setting a
maximum limit on how long a jail can run is similarly an edge case. Or you
might be one of the folks unlucky enough to need to restrict the amount of
sysvipc memory a jail can use, or limit the amount dedicated to one of the
sysvipc data types. RCTL can do that, but it’s certainly uncommon. We’ll focus
on the resources I find most useful: processor, memory, and disk throughput.
Once you understand these rules, you’ll be able to limit the other resources.
The pcpu resource lets you restrict the amount of CPU power a jail can access,
measured in percentages of a processor. A limit of 100 means “no more than one
processor,” while 50 would mean “no more than half a processor.” We’ll look at
another approach to CPU limits in “CPU Sets” later this chapter.
The vmemoryuse resource restricts the total number of bytes of physical
memory (RAM) and swap the jail can use. It is possible to separately restrict the
amount of physical memory and swap the jail may access through the
memoryuse and swapuse resources, but it’s also possible to thrash your disks
that way. You’re better off setting a maximum amount of memory the jail can
access and letting the kernel sort out questions of allocation.
RCTL offers four resources for disk I/O: readbps, writebps, readiops, and
writeiops. Each is about restricting reads versus writes, and measuring in bytes
per second or I/O operations per second. Use whatever measurement annoys you
least.

RCTL Actions
The five actions RCTL supports are deny, throttle, signal, log, and devctl. Not all
actions make sense for all resources.
The deny action tells the kernel to refuse the resource request. You can have only
one deny action for a rule: you can’t deny a jail memory at 2 GB and again at 3
GB. The kernel cannot deny certain resource types, like the various time
measurements. The clock keeps moving even if the server locks up. The kernel
can’t refuse requests for disk I/O—well, it theoretically could, but software isn’t
written to gracefully handle rejection, so RCTL doesn’t support it.
While you can’t deny disk I/O requests, you can sure slow them down. The
throttle action lets you slow down how quickly the kernel allocates a resource,
giving the program soft feedback on its limits.² The throttle action doesn’t make
sense for resources like processor time or memory—either it’s there, or it’s not—
but throttle is perfect for disk activity.
The signal action sends a signal to a process, letting you SIGTERM or SIGKILL
errant processes. This action is mostly useful for process rules. You can set
multiple rules for a process, so long as you use different signals.
The log action sends a warning to syslog. Creating a rule to log when a jail is
approaching an upper limit is a great way to get advance warning of impending
resource shortages, provided you read the system logs. Create log rules to your
heart’s content.
Finally, the devctl action triggers a devd rule, letting you take arbitrary actions
when the limit is exceeded. See rctl(8) for the devd event details.
Define the limit in the action, by setting it with an equal sign.

Managing Rules
Now that you’ve looked at the various actions, let’s assemble some rules.
My jail logdb keeps eating all the memory it can steal, and I need to restrict it to
2 GB or less. The first two entries in my rule will be jail:logdb:. The resource to
control the virtual memory a jail can access is vmemoryuse, so that’s my third
entry. The action is the tricky part. I don’t want to log violations or send devd
events: I want to flat-out refuse to allocate more memory to this jail, and let the
software running inside it deal with the consequences. That’s a deny action.
Add a RCTL rule with rctl -a.
View all the rules by running rctl without any arguments.
jail:logdb:vmemoryuse:deny=2147483648
Note that the limit has changed. While rctl accepts 2g on the command line, it
automatically converts that to bytes. Use the -h flag if you want human-readable
output.
jail:logdb:vmemoryuse:deny=2048M
Remove a rule with the -r flag and the rule to be removed. You don’t need to
specify the action in the rule, but if you do it must exactly match rule’s action.
rctl: failed to remove rule 'jail:logdb:vmemoryuse:deny=3g': No such process
We have no rule defining a 3 GB memory limit on this jail’s virtual memory
size. It’s a 2 GB limit. Cut the action off your command line and try again.

Store RCTL rules in /etc/rctl.rules. Enable the rctl service to read them at boot.
You can also set them through exec.created parameters with each jail.

Filters
On a complicated host, RCTL rules can get very long. While a rule must have all
four components, you can have rctl show and remove rules based on partial
rules. These filters tell rctl to only show or remove the provided rule
components. A string like jail:, ::vmemoryuse:, or :logdb:: is a filter. Here I tell
rctl to show me only the rules for jails.
You must use enough colons so that rctl can figure out which part of the rule
you’ve specified. Here I want to see all the rules applied to the resource
vmemoryuse. I give the first two colons because rctl needs to know I’m not
talking about the jail vmemoryuse, but I don’t need the last colon.
I can match more than one field at a time. Suppose I want all of the readiops
rules applied to jails.
You can remove rules based on filters. I’ve had enough of resource limits, and
have decided to let the jails battle it out for dominance.
All the jails now have no resource restrictions, but that sample rule limiting PID
1 to a thirty second lifespan remains in place.

RCTL and iocage
Iocage provides a parameter for each RCTL resource. It adds RCTL rules when
starting the jail, and removes them when shutting down the jail. You don’t have
to worry about the RCTL subject type—it’s always “jail.” Similarly, the RCTL
subject is always the jail you’re setting the parameter for. You only need concern
yourself with the RCTL resource and action.
Here I want to set the vmemoryuse resource to two gigabytes for the jail www1.
While generic RCTL rules for jails remain in place even when the jail doesn’t
exist, iocage adds its RCTL rules when starting the jail and removes them when
the jail is shut down.

Processor Restrictions
Modern servers can have dozens of processors and far too many processor cores.
FreeBSD’s scheduler does a good job of assigning processes to cores, and you
should let it do its job. While RCTL lets you restrict how much processor time a
jail can monopolize, it might be necessary to lock down a set of processor cores
for a particular jail, limit jails to running on a subset of available processors, or
reserve a few cores for the host’s exclusive use. FreeBSD lets you meddle with
these details via cpuset(1).
The effects and impact of cpuset are intimately tied to Non-Uniform Memory
Access, or NUMA. NUMA is basically about taking into account what parts of a
process’ data is stored where in the system. If a process last ran on CPU 19, that
process’ data is probably still in CPU 19’s cache. Moving the process to CPU
204 means dragging all that data across the system to the new processor.
FreeBSD’s NUMA functionality is under active development, and while you’ll
see references to several NUMA policies you should leave them alone. Satisfy
yourself with tying a jail to a set of processors, and let FreeBSD handle the nittygritty details of scheduling processes.
These CPU restrictions make sense only when the jail host is running on real
hardware. Hypervisors deliberately conceal the details of their underlying
hardware from their guests. A virtual server configured with 192 cores might be
running on a server with only one core.
Before attaching jails to processors, you should understand the processors you
have.

Host CPU Topology
During boot, FreeBSD explores the available CPUs and discovers how they’re
interconnected. The scheduler uses this information to efficiently assign
processes to processors. When running on real, non-virtual hardware, you can
get this same information and use it to sensibly assign jails to processors. The
sysctl kern.sched.topology_spec shows what FreeBSD thinks your host has in
the way of processors and cores. Here’s what you might find on a small host.
kern.sched.topology_spec: <groups>
<group level="1" cache-level="0">
<cpu count="1" mask="1">0</cpu>
</group>
</groups>
Processors are divided into groups. This shows a single group, group 1. Within
that group, processor 1 is core number 0. This host has one processor, with one
core.
A host that might be more a more realistic jail server looks more like this.
kern.sched.topology_spec: <groups>
<group level="1" cache-level="3">
<cpu count="8" mask="ff,0,0,0">0, 1, 2, 3, 4, 5, 6, 7</cpu>
This host has eight processors. They’re numbered zero through seven. Go down
to view the first group.
<group level="2" cache-level="2">
<cpu count="2" mask="3,0,0,0">0, 1</cpu>

<flags><flag name="THREAD">THREAD group</flag><flag
name="SMT">SMT group</flag></flags>
</group>
This group includes two processor cores, number zero and one. They’re flagged
SMT, or Simultaneous Multi-Threading. They’re two logical cores on the same
CPU. Going down the whole list of processors, you’ll see that all eight
processors exist as pairs. This host has four processor chips, with two processor
cores per chip. When you assign a jail to run on only a single core, this
information isn’t terribly vital. But if you grant a jail multiple cores, it generally
makes sense to put them on a single processor to take advantage of any shared
cache space.

CPU Sets
A CPU set, or cpuset, is a list of processors that a process or set of processes
may be assigned to. Every process belongs to a cpuset. Processes normally
belong to cpuset 1, the root cpuset, which grants access to all processors. View
the root dataset with cpuset -g.
pid -1 mask: 0, 1, 2, 3, 4, 5, 6, 7
pid -1 domain policy: first-touch mask: 0
The first line lists the processors that processes in this cpuset may utilize. The
second line gives the NUMA policy for allocating processes.
Every jail automatically gets its own cpuset at creation, but it’s a copy of the root
cpuset. View the cpuset assigned to a jail by using the -j flag to cpuset.
jail 20 mask: 0, 1, 2, 3, 4, 5, 6, 7
jail 20 domain policy: first-touch mask: 0
This jail can access all processors. Let’s change that. Use the -c flag to change an
existing cpuset. The -l flag lets you specify which processors the cpuset may
access. Here I let the cpuset for jail logdb to permit access to only processors 4
and 5.
Verify it worked with cpuset -g.
jail 25 mask: 4, 5
jail 25 domain policy: first-touch mask: 0

This jail is restricted to processors 4 and 5.
If you have multicore processors you should try to restrict a jail to cores on the
same processor, but reality has a way of making that difficult. If you must
allocate processors that aren’t in a tidy range, separate them with commas. Here
I restrict the jail logdb to processors 1, 3, 6, and 7.
You can reduce the number of processors that a jail can run on, but you cannot
add in previously forbidden processors. In this example, I could run cpuset again
to trim the allowed processors down to 6 and 7, but I can’t add processor 0 to the
permitted list. Increasing the number of permitted processors requires restarting
Note that the kernel is not a process, and does not belong to a cpuset. If the host
is being hammered by a network attack or computationally expensive storage
encryption, the kernel spreads its pain out amongst the host’s processors.
Configuring a cpuset looks simple at the command line, but how do we hook it
into jails?

Cpuset and Standard Jails
While jail.conf has no parameters to define a cpuset, it’s easy to trigger via
exec.created. You don’t want to use exec.poststart, because the processes will
have already started and might have overloaded other processors. Here I want
the jail logdb to use only processors 6 and 7.
logdb {
exec.created="cpuset -j logdb -cl 6-7";
You can globally restrict your jails to a subset of processors by making the
cpuset command a default.
exec.created="cpuset -j $name -cl 2-5";
This reserves processors 0 and 1 exclusively for the host. There’s no guarantee
that the host will only use processors 0 and 1—much like the kernel, the host
does what it must to continue functioning. That’s how every virtualization
system works. But the kernel is highly likely to schedule host processes on these
otherwise idle processors.
The read-only parameter cpuset.id gives the number of the current cpuset. If you
need to access the cpuset, though, it’s much easier to use -j and the jail name.

Cpuset and iocage
The cpuset property in iocage lets you directly set the processors a jail may
access.
The most common use case is to restrict all jails to a specific set of processors,
leaving other processors for the host. Adjust the default settings to achieve this.
If you have a jail that should get access to other processors, set that separately.
Presumably, processors 0 and 1 are left for the host.

Incomplete Jails
A jail is a set of files and programs existing in a set of altered namespaces.
Sometimes you might not want all of those namespaces altered, or you might
want to change the files. A jail might not need a complete FreeBSD userland.
You might want to deliberately share the network stack, or even the root
filesystem. It might sound weird, but in systems administration today’s weird is
tomorrow’s normal.

Trimming FreeBSD
It’s a perennial discussion: if you don’t run an SSH server in a jail, why install
one? Should the jail have a compiler? If not, remove it. All those shared libraries
—discard everything that programs don’t need! This harks back to the golden
age of hand-crafted chrooted daemons, where an attacker would break into a
service only to discover himself locked in a barren cave with only /dev/null for
company.
It’s not that this is hard. Once you’ve played with ldconfig a few times and have
learned about /bin/sh -x, you can successfully flense a userland down to the
barest minimum. The problem is, flensing is excruciatingly tedious and must be
retested every time the FreeBSD Project releases a new security update.
You might also try building a custom userland with the various WITHOUT
options. Such builds tend to be fragile, and need rebuilding every time FreeBSD
has a security update, but they’re certainly an option.
The FreeBSD Project has an impending solution, though: pkgbase, a packaged
base system. It breaks the base system up into about 800 packages. The packages
all have dependency information so you can install the barest possible system
and be sure of getting only what you require. Originally scheduled to be
integrated with FreeBSD 12, it’s currently been pushed back to FreeBSD 13. It’s
highly usable and is used in production by quite a few people, but the FreeBSD
developers are sticklers about quality. (For reference, vnet appeared in FreeBSD
8. Despite heavy use, it wasn’t made a default until FreeBSD 12.)
If you want to install a minimal system, do an Internet search for “FreeBSD
pkgbase” and play along. I’m not giving an example because pkgbase is not
finalized; you’ll have to wait for my packaging book for that. If you happen to
find a bug, getting it fixed will be much easier than spending hours debugging
your personally fileted userland.

Network Inheritance
You can allow a jail access to the host’s network namespace by setting the ip4
and ip6 parameters to “inherit.” This permits the jail access to every IP address
on the host. This violates one of the original purposes of jails, but makes sense
on hosts with limited network resources.
Most virtual server companies will be delighted to offer you an additional IPv4
address, for a merely usurious monthly fee. I don’t want to pay that fee for each
jail. I could bind the jail to a private address on the loopback interface and use
the packet filter to NAT traffic to and from it. I could assign each jail its own
VNET, bridge them all together with a cloned loopback interface, and NAT that.
Your security model might require that.
If your security model doesn’t demand such isolation in your jails, though,
consider letting the jails inherit the host’s network stack. Consider this standard
jail (although you can do the same thing with iocage). I’ve set all of the vital
parameters like the path and hostname as defaults, leaving us with.
www1 {
ip4=inherit;
This gives the jail access to the two IP addresses on the jail, the public address
and 127.0.0.1. The jail cannot ping, as it doesn’t have access to raw sockets. It
cannot sniff packets, as there is no /dev/bpf. All its files are jailed. If anyone
breaks into the jail, they’ll be blocked from reaching the host.
This has downsides, of course. A misconfigured jail might try to bind to a TCP
port the host expects to use. Your host should start all of its services before
starting its jail, though. You must track which daemons use which ports, exactly
as you would with a firewall. If you have a complicated network environment,
you probably don’t want the jail to inherit the whole network stack—but you
probably also have additional addresses to assign to a jail, which makes the
whole problem moot.

I’m not saying that you should use an inherited network stack instead of NATing a jail bound to the loopback address. I’m saying you should look at your
specific application and consider if setting up a loopback-bound jail is an
improvement over a fully inherited network stack in this particular instance. I
find an inherited stack most sensible when I’m using a stripped-down userland in
If you have a single IP and the inherited stack isn’t sufficient, you really should
go all the way and give each jail its own vnet. Create a loopback address and
attach to a bridge. Give the bridge an IP address, then bridge all the vnets to it.
Set up your firewall and proceed.

Jails as Control Groups
Sometimes the only part of the jail you really care about is the shared process
namespace. You’re not trying to protect files on the host, or restrict network
addresses. You just want to treat a group of processes as a single entity. Maybe
they need to all run together, or share resource restrictions. A jail lets you create
an entity that closely resembles a Solaris control group, or cgroup, and manage it
discretely.
Consider this jail definition for a host running a very complicated Java
Application Server that includes a whole bunch of different daemons and
countless processes. Again, I’m taking a bunch of configuration from the global
defaults, including the network courtesy of ip_hostname.
jas1 {
path=/;
mount.nodevfs;
exec.start="/bin/sh /etc/rc.java-apps.sh start";
exec.stop="/bin/sh /etc/rc.java-apps.sh stop";
The jail can access the entire filesystem. Any operating system or software
updates are immediately available to the jail. Processes in the jail can only
access other processes in its namespace, but they can access local sockets to
communicate with other software.
If this jail mounted a device filesystem, it would cover the host’s /dev. The host
would lose its device nodes. This is one of the rare cases where a jail doesn’t
need devfs.
However complicated the tangle of services is, they’re a single entity. If I need to
restart the application server, I shut down the jail. The kernel definitively
terminates every process in the jail, gracefully or not. When I restart the jail,

each program starts deterministically and in the proper order. I can limit the jail
via CPU sets and RCTL.
I’ve given a few different examples here, but the real point is that you can
leverage jails any number of ways. Namespace transformation doesn’t merely
create lightweight virtual machines; it creates a variety of highly-tunable
lightweight virtual machines.
Jails are a many-faceted multitool. Used with care, they’ll make your life easier.
Used poorly, you’ll lop off a finger and have to explain the mess before anyone
will give you a bandage.
¹ If a jail has a problem emailing you, the email telling you there’s a problem
sending email won’t arrive, so why watch it? Monitor all services outside the
service.

² Not that most software processes such soft feedback, but it’s nice to dream.

Chapter 12: iocage Bonuses

So far, we’ve used iocage as a command-line alternative to editing /etc/jail.conf.
It has a few other features that make it compelling, however. While you can
emulate iocage import/export with standard jails, iocage handles them in a
highly convenient way. And there’s no real equivalent to iocage plugins
elsewhere in the FreeBSD world, although other lightweight virtualization
systems have had them for years.

Migrating Jails
The iocage program lets you trivially bundle up a jail on one host and extract it
on another, retaining all its settings. While creating a tarball of a jail and copying
the settings from jail.conf isn’t onerous, we all know that someone will
eventually mess it up and cause more downtime than necessary. Migrating jails
from one host to another with iocage is automatable, deterministic, and reliable.
Assuming all your hosts are configured similarly, that is.

Migrations and Defaults
A jail’s configuration contains only the differences between iocage’s defaults and
the jail’s settings. If all of a host’s jails need a specific setting, you can set that
setting in the special jail default and it will apply to all jails.
The problems I experience migrating jails between hosts come from different
defaults on each host. If one host defaults to running vnet jails, and the other
uses shared networking, a migrated jail’s configuration will require tweaks to
work. You’re better off keeping your default iocage settings synchronized on all
hosts that you migrate jails between. You can always compare the default
configuration file, /iocage/defaults.json, to identify differences.
Physical differences between hosts can also interfere with jail migration.
Suppose one host uses interface em0 for jails, while the new one uses ixgbe0.
All those ip4_addr and ip6_addr parameters that have interface names coded into
them must be touched before the migrated jail can start. That’s why I
recommend giving interfaces dedicated to jails a single standard name across all
of your hosts. It doesn’t matter what device driver underlies the interface
jailether; a migrated jail can find it by name and use it without your clumsy
fingers having to change anything.
Assuming your jails have sufficiently similar defaults, you can migrate jails
transparently between hosts.

Exporting a Jail
Exporting a jail duplicates the jail in a bundle for convenient transport and
installation on another iocage host.
You must shut the jail down before exporting it with the iocage export command.
Here the database team needs more resources for the host dba2 than its current
host can provide, so I export the jail.
Exporting dataset: iocage/iocage/jails/dba2
Exporting dataset: iocage/iocage/jails/dba2/root
Preparing zip file: /iocage/images/dba2_2019-02-08.zip.
Exported: /iocage/images/dba2_2019-02-08.zip
This takes a while, depending on the size of the jail and the speed of your
storage. All exported jails end up in /iocage/images. Exported jails are thick
jails; they no longer depend on any templates or releases.
The export creates two files: one named after the jail and the current date, and
the other a cryptographic hash of the first file. Send both to the target host by the
best available means.¹

Importing a Jail
On the exported jail’s new host, copy the jail file and the validate that the export
file was not damaged in transit. Here I generate a cryptographic hash for the file
and compare it to the hash generated on the origin host.
Positioned one above the other, the hashes are easy to compare. Note that this
check does not protect against willful malfeasance, only accidental damage. If an
intruder can replace the jail’s zip file in transit, they could also replace the
included sha256 hash file. If you’re truly paranoid, compare the hash of the jail
that arrived with the hash of the file still on the original host. If the export file
survives your rigorous validation, the correct jail arrived intact and you can now
import it. Give the jail’s name or short UUID, not the whole file name.
Importing dataset: dba2
Importing dataset: dba2/root
Imported: dba2
The jail will now show up in iocage list, and can be started if the host’s iocage
defaults aren’t too different.

Migration Cleanup
Despite what you might assume, an exported jail remains on the host after
export. Exporting a jail doesn’t free up any disk space on the original host until
you iocage destroy it. Destroying the jail doesn’t destroy the export file. If an
exported jail is set to automatically start at system boot, it’ll restart itself with the
host. Be sure you remove jails you’ve deployed elsewhere.
Exported jails remain available for sysadmin convenience. Jails can be quite
large, and moving them around the network can take a long time. You might
export a database jail, restart it, send the export across the country, install it, and
transmit the database afterwards before switching over. Or perhaps the export is
a cold backup, and you’re going to keep the original jail running. Destroying a
stopped jail after migration is much easier than restoring the jail from backup
after a failed migration.
And a bundled-up jail is easier to shift around the network than a standard jail
tarball and a snippet of jail.conf.

Iocage Plugins
We install jails to run and isolate collections of software. You might have a jail
that runs a backup server, a web server, a database server, Nethack, whatever.
But some software goes into a jail so frequently that its setup has been fully
automated. An iocage plugin is an automated install of a jail, complete with
packages and configurations for running a service. While plugins are still new,
the number of plugins is quickly expanding and their quality is improving.
Plugins are not the same as Docker, but there are similarities.
Get the current plugin information with iocage fetch. The -P flag indicates that
you’re working on plugins, while -R triggers checking the public remote plugin
repository.
This displays the current plugins, and installs a copy in /iocage/.plugin_index.
Go take a look. While the INDEX describes the available plugins, I find it
easiest to just look at the file names. Each file represents one plugin.
There’s a file plexmediaserver.json. I’ve been meaning to install a Plex server to
see what all the fuss is about. Let’s give that a try. Run iocage fetch -P to grab a
plugin. Give the plugin name with -n, and assign a valid IP for the jail.
Plugin: Plex
Official Plugin: True
Using RELEASE: 11.2-RELEASE
Using Branch: 13.0-RELEASE
Post-install Artifact: https://github.com/freenas/iocage-pluginplexmediaserver.git
These pkgs will be installed:

- multimedia/plexmediaserver
- multimedia/ffmpeg
The plugin will install the jail and all necessary packages, then run a post-install
script to configure the jail. At the end you’ll see:
Starting plexmediaserver.
Admin Portal:
http://203.0.113.222:32400/web
Plex is now installed in the jail. I still have to configure it for my environment,
though. No services other than that needed for the jail are enabled, so if you
want SSH or sudo or somesuch you’ll need to set it up.
You can use plugins outside the official repository by downloading the plugin
definition file and using the plugin name defined in the file.
While plugin jails show up in iocage list, display only the plugin jails with
iocage list -P.
Plugin jails are overwhelmingly maintained by the community, and as such their
quality and completeness varies. They’ve achieved critical mass, though, and the
number of available plugins is constantly increasing.
Plugins let you quickly deploy many purpose-built jails.
Having read this book, though, you can now deploy jails any way you want, for
any purpose. Good luck.
¹ Depending on your organization, “best available means” might mean a pack
mule loaded with tapes.

Afterword

Jails are way cool. They’re sufficiently cool that in 2013 I set out to write a book
about them. That’s when everything went horribly wrong.
Writing about jails means understanding filesystems—perhaps not to the depth
of a kernel hacker, but pretty thoroughly for a sysadmin. It means understanding
processes and packaging and upgrades and a whole bunch of other stuff to a
degree I simply wasn’t at.
I had to write the four FreeBSD Mastery storage books, as well as the third
edition of Absolute FreeBSD, to prepare to write this book. I’m not saying that
you have to read all of those to use this book, but I had to write them to gather
the knowledge to write this book. Now that it’s finished, I find myself pleased to
have escaped without also being compelled to also write books on networking,
packaging, and probably cat(1).
The strength of jails isn’t merely administrative. It’s how they provide a whole
new set of tools that can help you solve real world problems. A host can support
several jails for each fully virtualized host it could run, chopping your energy
and space needs.
All that power is now in your brain.
Use it wisely.
Or… unwisely, I suppose. Up to you.

Sponsors

I offer people the opportunity to sponsor my books. They send me money as I’m
writing the book, and I put their name in the book. Sponsors help provide
financial stability as I work on a book, and have more than once bailed me out of
a tight spot. Fortunately, I didn’t have a water heater split open while writing this
book, so I was able to spend the money on useless stuff like food and water.
These fine people made this book a whole bunch easier. Thank you all.

Print Sponsors
Theodore Durst
Giorgio Arcamone
Brian Downs
Philip Jocks
Niall Navin
Benedict Reuschling
Phi Network Systems
tanamar corporation
Allan Jude
Mischa Peters
John W. O’Brien
Sebastian Oswald
Mason Egger
Stefan Johnson
Brad Sliger
Anthony Carpenter
Shaun Addison
Russell Folk
Trix Farrar

Jake Champlin
Rogier Krieger
Trond Endrestøl
Chris Dunbar
Phillip Vuchetich
Joachim Ernst
Melissa R. Muth
Adrian Jaskuła

Ebook Sponsors
Jake Crimmins
Liam Andrew
Ronald Ridley
Theodore Durst
Thijs van Dien
Geza Mihala
Henning Kessler
Ollivier Robert
Filipe Rodrigues
Todd Norris
Brian Downs
Don Jackson
Niall Navin
Joseph Maag
Simon Nielsen
Tim Chase
Kelly Hays
Ferruccio Zamuner
Doug Poland

Alexandre Rosenberg
Berta Sándor
Vitor Perito de Bem
Mischa Peters
John W. O’Brien
Adam Daniels
Branislav Ivosev
Markus Weber
Florian Ermisch
Henrik Krysteli Semark
Timur Anthony
Barry van Someren
Brad Alexander
Alex Rodriguez
Jason Barbier
Marshall Barker
Birthe Thompson
Clayton Kern
Thijs van Dien
Glauco Chiyaki Sesta
Steven Senator

Don Jackson
Henning Kessler
Ollivier Robert
Maurizio Giunti
Melissa R. Muth

Patronizers

The following fine folks back me on Patreon
(https://www.patreon.com/mwlucas), at a sufficient level to get their names in
the ebook version of every book I write.
Allan Jude
Ray Percival
Jeffrey David Marraccini
Mordant
Norman Jaffe
Peter Wemm
Trent T.
Stefan Johnson
Kate Ebneter patronizes me so much, she gets her name in the print version of
every book.

About the Author

Sign up for Michael W Lucas’ mailing list.
https://mwl.io

More Tech Books from Michael W Lucas

Absolute BSD
Absolute OpenBSD (1st and 2nd edition)
Cisco Routers for the Desperate (1st and 2nd edition)
PGP and GPG
Absolute FreeBSD (2nd and 3rd edition)
Network Flow Analysis

the IT Mastery Series

SSH Mastery (1st and 2nd edition)
DNSSEC Mastery
Sudo Mastery

FreeBSD Mastery: Storage Essentials
Networking for Systems Administrators
Tarsnap Mastery
FreeBSD Mastery: ZFS
FreeBSD Mastery: Specialty Filesystems
FreeBSD Mastery: Advanced ZFS
PAM Mastery
Relayd and Httpd Mastery
Ed Mastery
FreeBSD Mastery: Jails

Novels (as Michael Warren Lucas)

Immortal Clay
Kipuka Blues
Butterfly Stomp Waltz
Hydrogen Sleets
git commit murder

Copyright Information

FreeBSD Mastery: Jails
Copyright 2019 by Michael W Lucas (https://mwl.io).
All rights reserved.
Authors: Michael W Lucas
Copyediting: Amanda Robinson
Cover art: Eddie Sharam, “The Beastie Prison,” after John Phillip’s “The Prison
Window,” 1857.
ISBN-13: 978-1-64235-023-4 (paperback)
ISBN-13: 978-1-64235-024-1 (hardcover)
All rights reserved. No part of this work may be reproduced or transmitted in
any form or by any means, electronic or mechanical, including but not limited to
photocopying, recording, baking in a cake, or by any information storage or
retrieval system, without the prior written permission of the copyright holder and
the publisher. For information on book distribution, translations, or other rights,
please contact Tilted Windmill Press (accounts@tiltedwindmillpress.com).
The information in this book is provided on an “As Is” basis, without warranty.
While every precaution has been taken in the preparation of this work, neither
the author nor Tilted Windmill Press shall have any liability to any person or
entity with respect to any loss or damage caused or alleged to be caused directly
or indirectly by the information contained in it.
Tilted Windmill Press
https://www.tiltedwindmillpress.com
