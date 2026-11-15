---
id: lpi-102-500-06
title: "LPIC-1 · 102-500 — Which transport protocol ensures that all packets are delivered…"
slug: lpi-102-500-06-lpic-1-102-500-which-transport-protocol-ensures-that-all-pac
source: "LPI Learning Material — LPIC-1 (Exam 102-500)"
sourceSection: "3. Which transport protocol ensures that all packets are delivered properly, verifying the, 4. Which type of IPv6 address is used to sent a packet to all interfaces that belong to group of, 2. What is the name of the field on IPv6 header package that implement the same resource of TTL, 2. How many d"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "This lesson covered the main transport protocols and services used on TCP/IP stack. Covers 48 sections: Which transport protocol ensures that all packets are delivered properly, verifying the, Which type of IPv6 address is u."
---
# LPIC-1 · 102-500 — Which transport protocol ensures that all packets are delivered…

## 3. Which transport protocol ensures that all packets are delivered properly, verifying the
integrity and the order of the packets?

## 4. Which type of IPv6 address is used to sent a packet to all interfaces that belong to group of
hosts?

397

1. Mention 4 examples of services that use the TCP protocol by default.

## 2. What is the name of the field on IPv6 header package that implement the same resource of TTL
on IPv4?

3. What kind of information Neighbor Discovery Protocol (NDP) is able to discover?

398

This lesson covered the main transport protocols and services used on TCP/IP stack.
Another important topic was the version 6 of IP Protocol, including the IPv6 addresses and the
main differences with IPv4.
The following subjects were addressed:
- The correlation between Port numbers and Services
- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)
- ICMP (Internet Control Message Protocol)
- The IPv6 address and how it can be abbreviated
- IPv6 address types
- Main differences between IPv4 and IPv6

399

1. Which port is the default for the SMTP protocol?
## 2. How many different ports are available in a system?
65535
3. Which transport protocol ensures that all packets are delivered properly, verifying the
integrity and the order of the packets?
TCP
4. Which type of IPv6 address is used to sent a packet to all interfaces that belong to group of
hosts?
Multicast

400

1. Mention 4 examples of services that use the TCP protocol by default.
FTP, SMTP, HTTP, POP3, IMAP, SSH
2. What is the name of the field on IPv6 header package that implement the same resource of TTL
on IPv4?
Hop Limit
3. What kind of information Neighbor Discovery Protocol (NDP) is able to discover?
NDP is able to obtain various information from the network, including other nodes, duplicate
addresses, routes, DNS servers, gateways, etc.

401

### 109.2 Persistent network configuration
LPIC-1 version 5.0, Exam 102, Objective 109.2
- Understand basic TCP/IP host configuration
- Configure ethernet and wi-fi network configuration using NetworkManager
- Awareness of systemd-networkd
- /etc/hostname
- /etc/hosts
- /etc/nsswitch.conf
- /etc/resolv.conf
- nmcli
- hostnamectl
- ifup
- ifdown

402

### 109.2 Lesson 1

### 109.2 Persistent network configuration

In any TCP/IP network, every node must configure its network adapter to match the network
requirements, otherwise they will not be able to communicate with each other. Therefore, the
system administrator must provide the basic configuration so the operating system will be able to
setup the appropriate network interface, as well as to identify itself and the basic features of the
network every time it boots.
Network settings are agnostic in regard to operating systems, but the latter have their own
methods to store and apply these settings. Linux systems rely on configurations stored in plain
text files under the /etc directory to bring up network connectivity during boot time. It is worth
knowing how these files are used to avoid connectivity loss due to local misconfiguration.

The Network Interface
Network interface is the term by which the operating system refers to the communication channel
configured to work with the network hardware attached to the system, such as an ethernet or wifi device. The exception to this is the loopback interface, which the operating system uses when it
needs to establish a connection with itself, but the main purpose of a network interface is to

403

provide a route through which local data can be sent and remote data can be received. Unless the
network interface is properly configured, the operating system will not be able to communicate
with other machines in the network.
For most cases, the correct interface settings are either defined by default or customized during
the installation of the operating system. Nevertheless, these settings often need to be inspected or
even modified when the communication isn’t working properly or when the interface’s behavior
requires customization.
There are many Linux commands to list which network interfaces are present on the system, but
not all of them are available in all distributions. Command ip, however, is part of the basic set of
networking tools bundled with all Linux distributions and can be used to list the network
interfaces. The complete command to show the interfaces is ip link show:
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group
default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp3s5: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
link/ether 00:16:3e:8d:2b:5b brd ff:ff:ff:ff:ff:ff

If available, command nmcli device can also be used:
$ nmcli device
DEVICE

STATE

CONNECTION

enp3s5

ethernet

connected

Gigabit Powerline Adapter

lo

loopback

unmanaged

--

The commands shown in the examples do not modify any settings in the system, so they can be
executed by an unprivileged user. Both commands list two network interfaces: lo (the loopback
interface) and enp3s5 (an ethernet interface).
Desktops and laptops running Linux usually have two or three predefined network interfaces, one
for the loopback virtual interface and the others assigned to the network hardware found by the
system. Servers and network appliances running Linux, on the other hand, may have tens of
network interfaces, but the same principles apply to all of them. The abstraction provided by the
operating system allows for the setup of network interfaces using the same methods, regardless of
the underlying hardware.
However, knowing the details about the underlying hardware of an interface can be useful to

404

better understand what is going on when the communication is not working as expected. In a
system where many network interfaces are available, it could not be obvious which one
corresponds to the wi-fi and which one corresponds to the ethernet, for example. For this reason,
Linux uses an interface naming convention that helps identify which network interface
corresponds to which device and port.

Interface Names
Older Linux distributions named ethernet network interfaces as eth0, eth1, etc., numbered
according to the order in which the kernel identifies the devices. The wireless interfaces were
named wlan0, wlan1, etc. This naming convention, however, does not clarify which specific
ethernet port matches with the interface eth0, for example. Depending on how the hardware was
detected, it was even possible for two network interfaces to swap names after a reboot.
To overcome this ambiguity, more recent Linux systems employ a predictable naming convention
for network interfaces, making up a closer relationship between the interface name and the
underlying hardware connection.
In Linux distributions that use the systemd naming scheme, all interface names start with a twocharacter prefix that signifies the interface type:
en
Ethernet
ib
InfiniBand
sl
Serial line IP (slip)
wl
Wireless local area network (WLAN)
ww
Wireless wide area network (WWAN)
From higher to lower priority, the following rules are used by the operating system to name and
number the network interfaces:
1. Name the interface after the index provided by the BIOS or by the firmware of embedded
devices, e.g. eno1.

405

2. Name the interface after the PCI express slot index, as given by the BIOS or firmware, e.g. ens1.
3. Name the interface after its address at the corresponding bus, e.g. enp3s5.
4. Name the interface after the interface’s MAC address, e.g. enx78e7d1ea46da.
## 5. Name the interface using the legacy convention, e.g. eth0.
It is correct to assume, for example, that the network interface enp3s5 was so named because it
did not fit the first two naming methods, so its address in the corresponding bus and slot was used
instead. The device address 03:05.0, found in the output of the lspci command, reveals the
associate device:
$ lspci | fgrep Ethernet
03:05.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL-8110SC/8169SC Gigabit
Ethernet (rev 10)

Network interfaces are created by the Linux kernel itself, but there are many commands that can
be used to interact with them. Normally, the configuration happens automatically and there is no
need to change the settings manually. Nonetheless, with the name of the interface, it is possible to
tell the kernel how to proceed in configuring it if necessary.

Interface Management
Over the years, several programs have been developed to interact with the networking features
provided by the Linux kernel. Although the old ifconfig command can still be used to do simple
interface configurations and queries, it is now deprecated due to its limited support of nonethernet interfaces. The ifconfig command was superseded by the command ip, which is
capable of managing many other aspects of TCP/IP interfaces, like routes and tunnels.
The many capabilities of the ip command can be overkill for most ordinary tasks, so there are
auxiliary commands to facilitate the activation and configuration of the network interfaces.
Commands ifup and ifdown may be used to configure network interfaces based on interface
definitions found in the file /etc/network/interfaces. Although they can be invoked manually,
these commands are normally executed automatically during system boot.
All network interfaces managed by ifup and ifdown should be listed in the
/etc/network/interfaces file. The format used in the file is straightforward: lines beginning
with the word auto are used to identify the physical interfaces to be brought up when ifup is
executed with the -a option. The interface name should follow the word auto on the same line.
All interfaces marked auto are brought up at boot time, in the order they are listed.

406

Network configuration methods used by ifup and ifdown are not
standardized throughout all Linux distributions. CentOS, for example, keeps
the interface settings in individual files in the /etc/sysconfig/networkscripts/ directory and the configuration format used in them is slightly
different from the format used in /etc/network/interfaces.

The actual interface configuration is written in another line, starting with the word iface,
followed by the interface name, the name of the address family that the interface uses and the
name of the method used to configure the interface. The following example shows a basic
configuration file for interfaces lo (loopback) and enp3s5:
auto lo
iface lo inet loopback
auto enp3s5
iface enp3s5 inet dhcp

The address family should be inet for TCP/IP networking, but there is also support for IPX
networking (ipx), and IPv6 networking (inet6). Loopback interfaces use the loopback
configuration method. With the dhcp method, the interface will use the IP settings provided by the
network’s DHCP server. The settings from the example configuration allow the execution of
command ifup using interface name enp3s5 as its argument:
Internet Systems Consortium DHCP Client 4.4.1
Copyright 2004-2018 Internet Systems Consortium.
All rights reserved.
For info, please visit https://www.isc.org/software/dhcp/
Listening on LPF/enp3s5/00:16:3e:8d:2b:5b
Sending on

LPF/enp3s5/00:16:3e:8d:2b:5b

Sending on

Socket/fallback

DHCPDISCOVER on enp3s5 to 255.255.255.255 port 67 interval 4
DHCPOFFER of 10.90.170.158 from 10.90.170.1
DHCPREQUEST for 10.90.170.158 on enp3s5 to 255.255.255.255 port 67
DHCPACK of 10.90.170.158 from 10.90.170.1
bound to 10.90.170.158 -- renewal in 1616 seconds.

In this example, the method chosen for the enp3s5 interface was dhcp, so the command ifup
called a DHCP client program to obtain the IP settings from the DHCP server. Likewise, command
ifdown enp3s5 can be used to turn the interface off.

407

In networks without a DHCP server, the static method could be used instead and the IP settings
provided manually in /etc/network/interfaces. For example:
iface enp3s5 inet static
address 192.168.1.2/24
gateway 192.168.1.1

Interfaces using the static method do not need a corresponding auto directive, as they are
brought up whenever the network hardware is detected.
If the same interface has more than one iface entry, then all of the configured addresses and
options will be applied when bringing up that interface. This is useful to configure both IPv4 and
IPv6 addresses on the same interface, as well as to configure multiple addresses of the same type
on a single interface.

Local and Remote Names
A working TCP/IP setup is just the first step towards full network usability. In addition to being
able to identify nodes on the network by their IP numbers, the system must be able to identify
them with names more easily understood by human beings.
The name by which the system identifies itself is customizable and it is good practice to define it,
even if the machine is not intended to join a network. The local name often matches the network
name of the machine, but this isn’t necessarily always true. If the file /etc/hostname exists, the
operating system will use the contents of the first line as its local name, thereafter simply called
the hostname. Lines starting with # inside /etc/hostname are ignored.
The /etc/hostname file can be edited directly, but the machine’s hostname can also be defined
with the hostnamectl command. When supplied with sub-command set-hostname, command
hostnamectl will take the name given as an argument and write it in /etc/hostname:
storage

The hostname defined in /etc/hostname is the static hostname, that is, the name which is used to
initialize the system’s hostname at boot. The static hostname may be a free-form string up to 64
characters in length. However, it is recommended that it consists only of ASCII lower-case
characters and no spaces or dots. It should also limit itself to the format allowed for DNS domain
name labels, even though this is not a strict requirement.

408

Command hostnamectl can set two other types of hostnames in addition to the static hostname:
Pretty hostname
Unlike the static hostname, the pretty hostname may include all kinds of special characters. It
can be used to set a more descriptive name for the machine, e.g. “LAN Shared Storage”:

Transient hostname
Used when the static hostname is not set or when it is the default localhost name. The
transient hostname is normally the name set together with other automatic configurations, but
it can also be modified by the command hostnamectl, e.g.

If neither the --pretty nor --transient option is used, then all three hostname types will be set
to the given name. To set the static hostname, but not the pretty and transient names, the option
--static should be used instead. In all cases, only the static hostname is stored in the
/etc/hostname file. Command hostnamectl can also be used to display various descriptive and
identity bits of information about the running system:
$ hostnamectl status
Static hostname: storage
Pretty hostname: LAN Shared Storage
Transient hostname: generic-host
Icon name: computer-server
Chassis: server
Machine ID: d91962a957f749bbaf16da3c9c86e093
Boot ID: 8c11dcab9c3d4f5aa53f4f4e8fdc6318
Operating System: Debian GNU/Linux 10 (buster)
Kernel: Linux 4.19.0-8-amd64
Architecture: x86-64

This is the default action of the hostnamectl command, so the status sub-command can be
omitted.
Regarding the name of the remote network nodes, there are two basic ways the operating system
can implement to match names and IP numbers: to use a local source or to use a remote server to
translate names into IP numbers and vice versa. The methods can be complementary to each

409

other and their priority order is defined in the Name Service Switch configuration file:
/etc/nsswitch.conf. This file is used by the system and applications to determine not only the
sources for name-IP matches, but also the sources from which to obtain name-service information
in a range of categories, called databases.
The hosts database keeps track of the mapping between host names and host numbers. The line
inside /etc/nsswitch.conf beginning with hosts defines the services accountable for
providing the associations for it:
hosts: files dns

In this example entry, files and dns are the service names that specify how the lookup process
for host names will work. First, the system will look for matches in local files, then it will ask the
DNS service for matches.
The local file for the hosts database is /etc/hosts, a simple text file that associates IP addresses
with hostnames, one line per IP address, e.g.:
127.0.0.1 localhost

The IP number 127.0.0.1 is the default address for the loopback interface, hence its association
with the localhost name.
It is also possible to bind optional aliases to the same IP. Aliases can provide alternate spellings,
shorter hostnames and should be added at the end of the line, for example:
192.168.1.10 foo.mydomain.org foo

The formatting rules for the /etc/hosts file are:
- Fields of the entry are separated by any number of blanks and/or tab characters.
- Text from a # character until the end of the line is a comment and is ignored.
- Host names may contain only alphanumeric characters, minus signs and periods.
- Host names must begin with an alphabetic character and end with an alphanumeric character.
IPv6 addresses may also be added to /etc/hosts. The following entry refers to the IPv6 loopback
address:

410

::1 localhost ip6-localhost ip6-loopback

Following the files service specification, the dns specification tells the system to ask a DNS
service for the desired name/IP association. The set of routines responsible for this method is
called the resolver and its configuration file is /etc/resolv.conf. The following example shows
a generic /etc/resolv.conf containing entries for Google’s public DNS servers:
nameserver 8.8.4.4
nameserver 8.8.8.8

As shown in the example, the nameserver keyword indicates the IP address of the DNS server.
Only one nameserver is required, but up to three nameservers can be given. The supplementary
ones will be used as a fallback. If no nameserver entries are present, the default behaviour is to
use the name server on the local machine.
The resolver can be configured to automatically add the domain to names before consulting them
on the name server. For example:
nameserver 8.8.4.4
nameserver 8.8.8.8
domain mydomain.org
search mydomain.net mydomain.com

The domain entry sets mydomain.org as the local domain name, so queries for names within this
domain will be allowed to use short names relative to the local domain. The search entry has a
similar purpose, but it accepts a list of domains to try when a short name is provided. By default, it
contains only the local domain name.

411

1. What commands can be used to list the network adapters present in the system?

2. What is the type of network adapter whose interface name is wlo1?

3. What role does the file /etc/network/interfaces play during boot time?

## 4. What entry in /etc/network/interfaces configures interface eno1 to obtain its IP settings
with DHCP?

412

## 1. How could the hostnamectl command be used to change only the static hostname of the local
machine to firewall?

2. What details other than hostnames can be modified by command hostnamectl?

3. What entry in /etc/hosts associates both names firewall and router with IP 10.8.0.1?

## 4. How could the /etc/resolv.conf file be modified in order to send all DNS requests to
1.1.1.1?

413

This lesson covers how to make persistent changes to the local network configuration using
standard Linux files and commands. Linux expects the TCP/IP settings to be in specific places and
it may be necessary to change them when the default settings are not appropriate. The lesson goes
through the following topics:
- How Linux identifies network interfaces.
- Interface activation during boot and basic IP configuration.
- How the operating system associates names with hosts.
The concepts, commands and procedures addressed were:
- Interface naming conventions.
- Listing network interfaces with ip and nmcli.
- Interface activation with ifup and ifdown.
- Command hostnamectl and the /etc/hostname file.
- Files /etc/nsswitch.conf, /etc/hosts and /etc/resolv.conf.

414

1. What commands can be used to list the network adapters present in the system?
Commands ip link show, nmcli device and the legacy ifconfig.
2. What is the type of a network adapter whose interface name is wlo1?
The name starts with wl, so it is a wireless LAN adapter.
3. What role does the file /etc/network/interfaces play during boot time?
It has the configurations used by command ifup to activate the corresponding interfaces
during boot time.
4. What entry in /etc/network/interfaces configures interface eno1 to obtain its IP settings
with DHCP?
The line iface eno1 inet dhcp.

415

## 1. How could the hostnamectl command be used to change only the static hostname of the local
machine to firewall?
With the --static option: hostnamectl --static set-hostname firewall.
2. What details other than hostnames can be modified by command hostnamectl?
hostnamectl can also set the default icon for the local machine, its chassis type, the location
and the deployment environment.
3. What entry in /etc/hosts associates both names firewall and router with IP 10.8.0.1?
The line 10.8.0.1 firewall router.
4. How could the /etc/resolv.conf file be modified in order to send all DNS requests to
1.1.1.1?
Using nameserver 1.1.1.1 as its only nameserver entry.

416

### 109.2 Lesson 2

### 109.2 Persistent network configuration

Linux supports virtually every network technology used to connect servers, containers, virtual
machines, desktops and mobile devices. The connections between all these network nodes can be
dynamic and heterogeneous, thus requiring appropriate management by the operating system
running in them.
In the past, distributions developed their own customized solutions for managing dynamic
network infrastructure. Today, tools like NetworkManager and systemd provide more
comprehensive and integrated features to meet all the specific demands.

NetworkManager
Most Linux distributions adopt the NetworkManager service daemon to configure and control the
system’s network connections. NetworkManager’s purpose is to make the network configuration
as simple and automatic as possible. When using DHCP, for example, NetworkManager arranges
route changes, IP address fetching and updates to the local list of DNS servers, if necessary. When
both wired and wireless connections are available, NetworkManager prioritizes the wired
connection by default. NetworkManager will try to keep at least one connection active all the time,

417

whenever it is possible.

A request using DHCP (Dynamic Host Configuration Protocol) is usually sent
through the network adapter as soon as the link to the network is established. The
DHCP server that is active on the network then responds with the settings (IP
address, network mask, default route, etc.) which the requester must use to
communicate via IP protocol.

By default, the NetworkManager daemon controls the network interfaces not mentioned in the
/etc/network/interfaces file. It does so to not interfere with other configuration methods that
may be present as well, thus modifying the unattended interfaces only.
The NetworkManager service runs in the background with root privileges and triggers the
necessary actions to keep the system online. Ordinary users can create and modify network
connections with client applications that, albeit not having root privileges themselves, are capable
of communicating with the underlying service in order to perform the requested actions.
Client applications for NetworkManager are available for both the command line and the
graphical environment. For the latter, the client application comes as an accessory of the desktop
environment (under names like, nm-tray, network-manager-gnome, nm-applet or plasma-nm) and
it is usually accessible through an indicator icon at the corner of the desktop bar or from the
system configuration utility.
In the command line, NetworkManager itself provides two client programs: nmcli and nmtui.
Both programs have the same basic features, but nmtui has a curses-based interface while nmcli
is a more comprehensive command that can also be used in scripts. Command nmcli separates all
network related properties controlled by NetworkManager in categories called objects:
general
NetworkManager’s general status and operations.
networking
Overall networking control.
radio
NetworkManager radio switches.
connection
NetworkManager’s connections.

418

device
Devices managed by NetworkManager.
agent
NetworkManager secret agent or polkit agent.
monitor
Monitor NetworkManager changes.
The object name is the main argument to command nmcli. To show the overall connectivity
status of the system, for example, the object general should be given as the argument:
$ nmcli general
STATE

CONNECTIVITY

WIFI-HW

WIFI

WWAN-HW

WWAN

connected

full

Column STATE tells whether the system is connected to a network or not. If the connection is
limited due to external misconfiguration or access restrictions, then the CONNECTIVITY column
will not report the full connectivity status. If Portal appears in the CONNECTIVITY column, it
means that extra authentication steps (usually through the web browser) are required to complete
the connection process. The remaining columns report the status of the wireless connections (if
any), either WIFI or WWAN (Wide Wireless Area Network, i.e. cellular networks). The HW suffix
indicates that the status corresponds to the network device rather than the system network
connection, that is, it tells if the hardware is enabled or disabled to save power.
In addition to the object argument, nmcli also needs a command argument to execute. The
status command is used by default if no command argument is present, so the command nmcli
general is actually interpreted as nmcli general status.
It is hardly necessary to take any action when the network adapter is connected directly to the
access point through cables, but wireless networks require further interaction to accept new
members. nmcli facilitates the connection process and saves the settings to connect automatically
in the future, hence it is very helpful for laptops or any other mobile appliances.
Before connecting to wi-fi, it is convenient to first list the available networks in the local area. If
the system has a working wi-fi adapter, then the device object will use it to scan the available
networks with command nmcli device wifi list:
$ nmcli device wifi list
IN-USE

BSSID

SSID

MODE

CHAN

RATE

SIGNAL

BARS

SECURITY

90:F6:52:C5:FA:12

Hypnotoad

## 130. Mbit/s

67

▂▄▆_

WPA2

419

10:72:23:C7:27:AC

Jumbao

## 130. Mbit/s

55

▂▄__

WPA2

00:1F:33:33:E9:BE

NETGEAR

## 54. Mbit/s

35

▂▄__

WPA1 WPA2

A4:33:D7:85:6D:B0

AP53

## 130. Mbit/s

32

▂▄__

WPA1 WPA2

98:1E:19:1D:CC:3A

Bruma

## 195. Mbit/s

22

▂___

WPA1 WPA2

Most users will probably use the name in the SSID column to identify the network of interest. For
example, command nmcli can connect to the network named Hypnotoad using the device object
again:
$ nmcli device wifi connect Hypnotoad

If the command is executed inside a terminal emulator in the graphical environment, then a
dialog box will appear asking for the network’s passphrase. When executed in a text only console,
the password may be provided together with the other arguments:
$ nmcli device wifi connect Hypnotoad password MyPassword

If the wi-fi network hides its SSID name, nmcli can still connect to it with the extra hidden yes
arguments:
$ nmcli device wifi connect Hypnotoad password MyPassword hidden yes

If the system has more than one wi-fi adapter, the one to be used may be indicated with ifname.
For example, to connect using the adapter named wlo1:
$ nmcli device wifi connect Hypnotoad password MyPassword ifname wlo1

After the connection succeeds, NetworkManager will name it after the corresponding SSID (if it is
a wi-fi connection) and will keep it for future connections. The connections names and their
UUIDs are listed by command nmcli connection show:
$ nmcli connection show
NAME

UUID

DEVICE

Ethernet

53440255-567e-300d-9922-b28f0786f56e

ethernet

enp3s5

tun0

cae685e1-b0c4-405a-8ece-6d424e1fb5f8

tun

tun0

Hypnotoad

6fdec048-bcc5-490a-832b-da83d8cb7915

wifi

wlo1

4G

a2cf4460-0cb7-42e3-8df3-ccb927f2fd88

gsm

--

The type of each connection is shown — which can be ethernet, wifi, tun, gsm, bridge, etc. — as
well as the device to which they are associated with. To perform actions on a specific connection,
its name or UUID must be supplied. To deactivate the Hypnotoad connection, for example:
$ nmcli connection down Hypnotoad
Connection 'Hypnotoad' successfully deactivated

Likewise, the command nmcli connection up Hypnotoad can be used to bring the connection
up, as it is now saved by NetworkManager. The interface name can also be used to reconnect, but
in this case the device object should be used instead:
$ nmcli device disconnect wlo2
Device 'wlo1' successfully disconnected.

The interface name can also be used to reestablish the connection:
$ nmcli device connect wlo2
Device 'wlo1' successfully activated with '833692de-377e-4f91-a3dc-d9a2b1fcf6cb'.

Note that the connection UUID changes every time the connection is brought up, so it is preferable
to use its name for consistency.
If the wireless adapter is available but it is not being used, then it can be turned off to save power.
This time, the object radio should be passed to nmcli:
$ nmcli radio wifi off

Of course, the wireless device can be turned on again with command nmcli radio wifi on.
Once the connections are established no manual interaction will be required in the future, as
NetworkManager identifies available known networks and automatically connects to them. If
necessary, NetworkManager has plugins that can extend its functionalities, like the plugin to
support VPN connections.

systemd-networkd
Systems running systemd can optionally use its built-in daemons to manage network connectivity:
systemd-networkd to control network interfaces and systemd-resolved to manage the local
name resolution. These services are backwards compatible with legacy Linux configuration

421

methods, but the configuration of network interfaces in particular has features that are worth
knowing.
The configuration files used by systemd-networkd to setup network interfaces can be found in any
of the following three directories:
/lib/systemd/network
The system network directory.
/run/systemd/network
The volatile runtime network directory.
/etc/systemd/network
The local administration network directory.
The files are processed in lexicographic order, so it is recommended to start their names with
numbers to make the ordering easier to read and set.
Files in /etc have the highest priority, whilst files in /run take precedence over files with the
same name in /lib. This means that if configuration files in different directories have the same
name, then systemd-networkd will ignore the files with lesser priority. Separating files like that is
a way to change the interface settings without having to modify the original files: modifications
can be placed in /etc/systemd/network to override those in /lib/systemd/network.
The purpose of each configuration file depends on its suffix. File names ending in .netdev are
used by systemd-networkd to create virtual network devices, such as bridge or tun devices. Files
ending in .link set low-level configurations for the corresponding network interface. systemdnetworkd detects and configures network devices automatically as they appear — as well as
ignore devices already configured by other means — so there is little need to add these files in
most situations.
The most important suffix is .network. Files using this suffix can be used to setup network
addresses and routes. As with the other configuration file types, the name of the file defines the
order in which the file will be processed. The network interface to which the configuration file
refers to is defined in the [Match]` section inside the file.
For example, the ethernet network interface enp3s5 can be selected within the file
/etc/systemd/network/30-lan.network by using the Name=enp3s5 entry in the [Match]
section:

422

Name=enp3s5

A list of whitespace-separated names is also accepted to match many network interfaces with this
same file at once. The names can contain shell-style globs, like en*. Other entries provide various
matching rules, like selecting a network device by its MAC address:
MACAddress=00:16:3e:8d:2b:5b

The settings for the device are in the [Network] section of the file. A simple static network
configuration only requires the Address and Gateway entries:
MACAddress=00:16:3e:8d:2b:5b
[Network]
Address=192.168.0.100/24
Gateway=192.168.0.1

To use the DHCP protocol instead of static IP addresses, the DHCP entry should be used instead:
MACAddress=00:16:3e:8d:2b:5b
[Network]
DHCP=yes

The systemd-networkd service will try to fetch both IPv4 and IPv6 addresses for the network
interface. To use IPv4 only, DHCP=ipv4 should be used. Likewise, DHCP=ipv6 will ignore IPv4
settings and use the provided IPv6 address only.
Password-protected wireless networks can also be configured by systemd-networkd, but the
network adapter must be already authenticated in the network before systemd-networkd can
configure it. Authentication is performed by WPA supplicant, a program dedicated to configure
network adapters for password protected networks.
The first step is to create the credentials file with command wpa_passphrase:

423

This command will take the passphrase for the MyWifi wireless network from the standard input
and store its hash in the /etc/wpa_supplicant/wpa_supplicant-wlo1.conf. Note that the
filename should contain the appropriate name of the wireless interface, hence the wlo1 in the file
name.
The systemd manager reads the WPA passphrase files in /etc/wpa_supplicant/ and creates the
corresponding service to run WPA supplicant and bring the interface up. The passphrase file
created in the example will then have a corresponding service unit called
wpa_supplicant@wlo1.service.
start
wpa_supplicant@wlo1.service will associate the wireless adapter with the remote access
point. Command systemctl enable wpa_supplicant@wlo1.service makes the association
automatic during boot time.
Finally, a .network file matching the wlo1 interface must be present in
/etc/systemd/network/, as systemd-networkd will use it to configure the interface as soon as
WPA supplicant finishes the association with the access point.

424

## 1. What is the meaning of the word Portal in the CONNECTIVITY column in the output of
command nmcli general status?

## 2. In a console terminal, how can an ordinary user use the command nmcli to connect to the
MyWifi wireless network protected by the password MyPassword?

## 3. What command can turn the wireless adapter on if it was previously disabled by the operating
system?

## 4. Custom configuration files should be placed in what directory when systemd-networkd is
managing the network interfaces?

425

## 1. How can a user run the command nmcli to delete an unused connection named Hotel
Internet?

## 2. NetworkManager scans wi-fi networks periodically and command nmcli device wifi list
only lists the access points found in the last scan. How should the nmcli command be used to
ask NetworkManager to immediately re-scan all available access points?

## 3. What name entry should be used in the [Match] section of a systemd-networkd configuration
file to match all ethernet interfaces?

## 4. How should the wpa_passphrase command be executed to use the passphrase given as an
argument and not from the standard input?

426

This lesson covers the common tools used in Linux to manage heterogeneous and dynamic
network connections. Although most configuration methods do not require user intervention,
sometimes that is necessary and tools like NetworkManager and systemd-networkd can reduce the
hassle to a minimum. The lesson goes through the following topics:
- How NetworkManager and systemd-networkd integrate with the system.
- How the user can interact with NetworkManager and systemd-networkd.
- Basic interface configuration with both NetworkManager and systemd-networkd.
The concepts, commands and procedures addressed were:
- NetworkManager’s client commands: nmtui and nmcli.
- Scanning and connecting to wireless networks using nmcli appropriate commands.
- Persistent wi-fi network connections using systemd-networkd.

427

## 1. What is the meaning of the word Portal in the CONNECTIVITY column in the output of
command nmcli general status?
It means that extra authentication steps (usually through the web browser) are required to
complete the connection process.
2. In a console terminal, how can an ordinary user use the command nmcli to connect to the
MyWifi wireless network protected by the password MyPassword?
In a text-only terminal, the command would be
$ nmcli device wifi connect MyWifi password MyPassword

## 3. What command can turn the wireless adapter on if it was previously disabled by the operating
system?
$ nmcli radio wifi on

## 4. Custom configuration files should be placed in what directory when systemd-networkd is
managing the network interfaces?
In the local administration network directory: /etc/systemd/network.

428

## 1. How can a user run the command nmcli to delete an unused connection named Hotel
Internet?
$ nmcli connection delete "Hotel Internet"

## 2. NetworkManager scans wi-fi networks periodically and command nmcli device wifi list
only lists the access points found in the last scan. How should the nmcli command be used to
ask NetworkManager to immediately re-scan all available access points?
The root user can run nmcli device wifi rescan to make NetworkManager re-scan
available access points.
3. What name entry should be used in the [Match] section of a systemd-networkd configuration
file to match all ethernet interfaces?
The entry name=en*, as en is the prefix for ethernet interfaces in Linux and systemd-networkd
accepts shell-like globs.
4. How should the wpa_passphrase command be executed to use the passphrase given as an
argument and not from the standard input?
The password should be given just after the SSID, as in wpa_passphrase
MyPassword.

MyWifi

429

### 109.3 Basic network troubleshooting
LPIC-1 version 5.0, Exam 102, Objective 109.3
- Manually configure network interfaces, including viewing and changing the configuration
of network interfaces using iproute2.
- Manually configure routing, including viewing and changing routing tables and setting the
default route using iproute2.
- Debug problems associated with the network configuration.
- Awareness of legacy net-tools commands.
- ip
- hostname
- ss
- ping
- ping6
- traceroute
- traceroute6
- tracepath
- tracepath6

430

- netcat
- ifconfig
- netstat
- route

431

### 109.3 Lesson 1

### 109.3 Basic network troubleshooting

Linux has very flexible and powerful network capabilities. In fact, Linux based operating systems
are often used on common network devices, including expensive commercial equipment. Linux
networking could be a certification in itself. With this mind, this lesson is only going to cover a
few basic configuration and troubleshooting tools.
Be sure to review the lessons on internet protocols and persistent network configuration prior to
this lesson. Within this lesson, we will be covering tools to configure and troubleshoot IPv4 and
IPv6 networking.
While not an official objective, packet sniffers such as tcpdump are useful troubleshooting tools.
Packet sniffers allow you to view and record packets coming into or out of a network interface.
Tools such as hex viewers and protocol analyzers can be used to view these packets in more detail
than a packet sniffer will typically allow. It wouldn’t hurt to at least be aware of such programs.

About the ip Command
The ip command is a fairly recent utility used to view and configure just about anything relating

432

to network configurations. This lesson covers some of the most used subcommands of ip, but it
barely scratches the surface of what is available. Learning to read the documentation will help
you be much more efficient with it.
Each subcommand of ip has its own man page. The SEE ALSO section of the ip man page has a
list of them:
$ man ip
SEE ALSO
ip-address(8), ip-addrlabel(8), ip-l2tp(8), ip-link(8), ip-maddress(8),
ip-monitor(8), ip-mroute(8), ip-neighbour(8), ip-netns(8), ipntable(8), ip-route(8), ip-rule(8), ip-tcp_metrics(8), ip-token(8), iptunnel(8), ip-xfrm(8)
IP Command reference ip-cref.ps

Instead of looking at this every time you need the man page, simply add - and the name of the
subcommand to ip, e.g. man ip-route.
Another source of information is the help function. To view the built-in help, add help after the
subcommand:
$ ip address help
Usage: ip address {add|change|replace} IFADDR dev IFNAME [ LIFETIME ]
[ CONFFLAG-LIST ]
ip address del IFADDR dev IFNAME [mngtmpaddr]
ip address {save|flush} [ dev IFNAME ] [ scope SCOPE-ID ]
[ to PREFIX ] [ FLAG-LIST ] [ label LABEL ] [up]
ip address [ show [ dev IFNAME ] [ scope SCOPE-ID ] [ master DEVICE ]
[ type TYPE ] [ to PREFIX ] [ FLAG-LIST ]
[ label LABEL ] [up] [ vrf NAME ] ]
ip address {showdump|restore}
IFADDR := PREFIX | ADDR peer PREFIX

Netmask and Routing Review
IPv4 and IPv6 are what are known as routed or routable protocols. This means they are designed
in a way that make it possible for network designers to control traffic flow. Ethernet is not a
routable protocol. This means that if you were to connect a bunch of devices together using

433

nothing but Ethernet, there is very little you can do to control the flow of network traffic. Any
measures to control traffic would end up similar to current routable and routing protocols.
Routable protocols allow network designers to segment networks to reduce the processing
requirements of connectivity devices, provide redundancy, and manage traffic.
IPv4 and IPv6 addresses have two sections. The first set of bits make up the network section while
the second set make up the host portion. The number of bits that make up the network portion are
determined by the netmask (also called subnet mask). Sometimes it will also be referred to as the
prefix length. Regardless of what it is called, it is the number of bits that the machine treats as the
network portion of the address. With IPv4, sometimes this is specified in dotted decimal notation.
Below is an example using IPv4. Notice how the binary digits maintain their place value in the
octets even when it is divided by the netmask.
192.168.130.5/20
192

168

130

11000000 10101000 10000010 00000101
20 bits = 11111111 11111111 11110000 00000000
Network = 192.168.128.0
Host

= 2.5

The network portion of an address is used by an IPv4 or IPv6 machines to lookup which interface
a packet should be sent out on in its routing table. When an IPv4 or IPv6 host with routing enabled
receives a packet that is not for the host itself, it attempts to match the network portion of the
destination to a network in the routing table. If a matching entry is found, it sends the packet to
the destination specified in the routing table. If no entries are found and a default route is
configured, it is sent to the default route. If no entry is found and no default route are configured,
the packet is discarded.

Configuring an Interface
There are two tools we will be covering that you can use to configure a network interface:
ifconfig and ip. The ifconfig program, while still widely used, is considered a legacy tool and
may not be available on newer systems.

434

On newer Linux distributions, installation of the net-tools package will provide you
with the legacy networking commands.

Before configuring an interface, you must first know what interfaces are available. There are a
few ways to do this. One way is to use the -a option of ifconfig:
$ ifconfig -a

Another way is with ip. Sometimes you will see examples with ip addr, ip a, and some with ip
address. They are synonymous. Officially, the subcommand is ip address. This means that if
you wish to view the man page, you must use man ip-address and not man ip-addr.
The link subcommand for ip will list the interface links available for configuration:
$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group
default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT
link/ether 08:00:27:54:18:57 brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT
link/ether 08:00:27:ab:11:3e brd ff:ff:ff:ff:ff:ff

Assuming the sys filesystem is mounted, you can also list the contents of /sys/class/net:
$ ls /sys/class/net
enp0s3

enp0s8

lo

To configure an interface with ifconfig, you must be logged in as root or use a utility such as
sudo to run the command with root privilege. Follow the example below:

The Linux version of ifconfig is flexible with how you specify the subnet mask:

Notice how with IPv6 the keyword add was used. If you don’t precede an IPv6 address with add,

435

you will get an error message.
The following command configures an interface with ip:

With ip, the same command is used for both IPv4 and IPv6.

Configuring Low Level Options
The ip link command is used to configure low level interface or protocol settings such as VLANs,
ARP, or MTUs, or disabling an interface.
A common task for ip link is to disable or enable an interface. This can be done with ifconfig
as well:
3: enp0s8: <BROADCAST,MULTICAST> mtu 1500 qdisc pfifo_fast state DOWN mode DEFAULT group
default qlen 1000
link/ether 08:00:27:ab:11:3e brd ff:ff:ff:ff:ff:ff
3: enp0s8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT
link/ether 08:00:27:ab:11:3e brd ff:ff:ff:ff:ff:ff

Sometimes you may need to adjust an interface’s MTU. As with enabling/disabling interfaces, this
can be done with either ifconfig of ip link:
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 2000 qdisc pfifo_fast state UP mode DEFAULT
link/ether 08:00:27:54:53:59 brd ff:ff:ff:ff:ff:ff
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT
link/ether 08:00:27:54:53:59 brd ff:ff:ff:ff:ff:ff

436

The Routing Table
The commands route, netstat -r, and ip route can all be used to view your routing table. If
you wish to modify your routes, you need to use route or ip route. Below are examples of
viewing a routing table:
$ netstat -r

Flags

MSS Window

irtt Iface

10.0.2.0

192.168.150.0

$ ip route
default via 10.0.2.2 dev enp0s3 proto dhcp metric 100
10.0.2.0/24 dev enp0s3 proto kernel scope link src 10.0.2.15 metric 100
192.168.150.0/24 dev enp0s8 proto kernel scope link src 192.168.150.200
$ route

Flags Metric Ref

Use Iface

10.0.2.0

192.168.150.0

Notice how there is no output regarding IPv6. If you wish to view your routing table for IPv6, you
must use route -6, netstat -6r, and ip -6 route.
$ route -6
Kernel IPv6 routing table

Next Hop

Flag Met Ref Use If

2001:db8::/64

256 0

fe80::/64

100 0

2002:a00::/24

!n

1024 0

0 lo

[::]/0

2001:db8::1

localhost/128

Un

84 lo

2001:db8::10/128

Un

0 lo

fe80::a00:27ff:fe54:5359/128

Un

0 lo

ff00::/8

256 1

3 enp0s3

ff00::/8

256 1

6 enp0s8

An example of netstat -r6 has been omitted because its output is identical to route -6. Some
of the output of the above route command is self explanatory. The Flag column provides some

437

information about the route. The U flag indicates that a route is up. A ! means reject route i.e. a
route with a ! won’t be used. The n flag means the route hasn’t been cached. The kernel maintains
a cache of routes for faster lookups separately from all known routes. The G flag indicates a
gateway. The Metric or Met column isn’t used by the kernel. It refers to the administrative
distance to the target. This administrative distance is used by routing protocols to determine
dynamic routes. The Ref column is the reference count, or number of uses of a route. Like
Metric, it is not used by the Linux kernel. The Use column shows the number of lookups for a
route.
In the output of netstat -r, MSS indicates the maximum segment size for TCP connections over
that route. The Window column shows you the defualt TCP window size. The irtt shows the
round trip time for packets on this route.
The output of ip route and ip -6 route reads as follows:
1. Destination.
2. Optional address followed by interface.
3. The routing protocol used to add the route.
4. The scope of the route. If this is omitted, it is global scope, or a gateway.
5. The route’s metric. This is used by dynamic routing protocols to determine the cost of the route.
This isn’t used by most systems.
6. If it is an IPv6 route, the RFC4191 route preference.
Working through a few examples should clarify this:
IPv4 Example
default via 10.0.2.2 dev enp0s3 proto dhcp metric 100

1. The destination is the default route.
2. The gateway address is 10.0.2.2 reachable through interface enp0s3.
3. It was added to the routing table by DHCP.
4. The scope was omitted, so it is global.
5. The route has a cost value of 100.
## 6. No IPv6 route preference.
IPv6 Example

438

fc0::/64 dev enp0s8 proto kernel metric 256 pref medium

1. The destination is fc0::/64.
2. It is reachable through interface enp0s8.
3. It was added automatically by the kernel.
4. The scope was omitted, so it is global.
5. The route has a cost value of 256.
## 6. It has an IPv6 preference of medium.

Managing Routes
Routes can by managed by using route or ip route. Below is an example of adding and
removing a route using the route command. With route, you must use the -6 option for IPv6:
PING 2001:db8:1::20(2001:db8:1::20) 56 data bytes
64 bytes from 2001:db8:1::20: icmp_seq=1 ttl=64 time=0.451 ms
64 bytes from 2001:db8:1::20: icmp_seq=2 ttl=64 time=0.438 ms

Below is the same example using the ip route command:
PING 2001:db8:1::20(2001:db8:1::20) 56 data bytes
64 bytes from 2001:db8:1::20: icmp_seq=2 ttl=64 time=0.529 ms
64 bytes from 2001:db8:1::20: icmp_seq=2 ttl=64 time=0.438 ms

439

1. Which commands can be used to list network interfaces?

2. How would you temporarily disable an interface? How would you re-enable it?

## 3. Which of the following is a reasonable subnet mask for IPv4?
0.0.0.255
255.0.255.0
255.252.0.0
/24
4. Which commands can you use to verify your default route?

## 5. How would add a second IP address to an interface?

440

1. Which subcommand of ip can be used to configure vlan tagging?

2. How would you configure a default route?

## 3. How would you get detailed information about the ip neighbour command? What happens if
you run it by itself?

4. How would you backup your routing table? How would you restore from it?

## 5. Which ip subcommand can be used to configure spanning tree options?

441

Networking is usually configured by a system’s startup scripts or a helper such as
NetworkManager. Most distributions have tools that will edit the startup script configuration files
for you. Consult your distribution’s documentation for details.
Being able to manually configure networking allows you to troubleshoot more effectively. It is
useful in minimal environments used for things like restoring from backups or migrating to new
hardware.
The utilities covered in this section have more functionality than covered in this lesson. It would
be worthwhile to skim through the man page of each to familiarize yourself with the options
available. The ss and ip commands are the modern way of doing things, while the rest that are
covered, while still in common use, are considered legacy tools.
The best way to get familiar with the tools covered is practice. Using a computer with a modest
amount of RAM, it is possible to setup a virtual network lab using virtual machines that you can
practice with. Three virtual machines are enough to get comfortable with the tools listed.
Commands used in this lesson include:
ifconfig
Legacy utility used to configure network interfaces and review their states.
ip
Modern and versatile utility used to configure network interfaces and review their states.
Legacy command used to view current network connections and route information.
route
Legacy command used to view or modify a system’s routing table.

442

## 1. Which commands can be used to list network interfaces?
Any of the commands below:
ip link, ifconfig -a, or ls /sys/class/net
2. How would you temporarily disable an interface? How would you re-enable it?
You could use ifconfig or ip link:
Using ifconfig:
$ ifconfig wlan1 down
$ ifconfig wlan1 up

Using ip link:
$ ip link set wlan1 down
$ ip link set wlan1 up

## 3. Which of the following is a reasonable subnet mask for IPv4?
- 255.252.0.0
- /24
The other masks listed are invalid because they don’t separate the address cleanly into two
sections, the first part defining the network, and the second the host. The left most bits of a
mask will always be 1 and the right bits will always be 0.
4. Which commands can you use to verify your default route?
You can use route, netstat -r, or ip route:
$ route

Flags Metric Ref

600

Use Iface

192.168.1.0

600

$ netstat -r

443

Flags

MSS Window

irtt Iface

192.168.1.0

$ ip route
default via 192.168.1.20 dev wlan1 proto static metric 600
192.168.1.0/24 dev wlan1 proto kernel scope link src 192.168.1.24 metric 600

## 5. How would add a second IP address to an interface?
You would use ip address or ifconfig. Keep in mind that ifconfig is a legacy tool:
$ ip addr add 172.16.15.16/16 dev enp0s9 label enp0s9:sub1

The portion of the command label enp0s9:sub1 adds an alias to enp0s9. If you don’t use the
legacy ifconfig you can omit this. If you do, the command will still work, but the address you
just added won’t show up in the output of ifconfig.
You can also use ifconfig:
$ ifconfig enp0s9:sub1 172.16.15.16/16

444

## 1. Which subcommand of ip can be used to configure vlan tagging?
ip link has a vlan option that can be used. Below is an example of tagging a sub interface
with vlan 20.

## 2. How would you configure a default route?
Using route or ip route:

## 3. How would you get detailed information about the ip neighbour command? What happens if
you run it by itself?
By reading the man page:
$ man ip-neigbour

It displays your ARP cache:
$ ip neighbour
10.0.2.2 dev enp0s3 lladdr 52:54:00:12:35:02 REACHABLE

4. How would you backup your routing table? How would you restore from it?
The example below demonstrates backing up and restoring a routing table:

## 5. Which ip subcommand can be used to configure spanning tree options?
Similar to managing vlan settings, ip link can configure spanning tree by using the bridge
type. The example shows adding a virtual interface with a STP priority of 50:

445

446

### 109.3 Lesson 2

### 109.3 Basic network troubleshooting

Linux based operating systems have a variety of tools to troubleshoot network problems with.
This lesson is going to cover some of the more common ones. At this point you should have a grasp
of the OSI or other layered models of networking, IPv4 or IPv6 addressing, and the basics of
routing and switching.
The best way to test a network connection is to try to use your application. When that doesn’t
work, there are plenty of tools available to help diagnose the problem.

Testing Connections With ping
The ping and ping6 commands can be used to send an ICMP echo request to an IPv4 or IPv6
address, respectively. An ICMP echo request sends a small amount of data to the destination
address. If the destination address is reachable, it will send an ICMP echo reply message back to
the sender with the same data that was sent to it:
$ ping -c 3 192.168.50.2
PING 192.168.50.2 (192.168.50.2) 56(84) bytes of data.

447

64 bytes from 192.168.50.2: icmp_seq=1 ttl=64 time=0.525 ms
64 bytes from 192.168.50.2: icmp_seq=2 ttl=64 time=0.419 ms
64 bytes from 192.168.50.2: icmp_seq=3 ttl=64 time=0.449 ms
--- 192.168.50.2 ping statistics --3 packets transmitted, 3 received, 0% packet loss, time 2006ms
rtt min/avg/max/mdev = 0.419/0.464/0.525/0.047 ms

$ ping6 -c 3 2001:db8::10
PING 2001:db8::10(2001:db8::10) 56 data bytes
64 bytes from 2001:db8::10: icmp_seq=1 ttl=64 time=0.425 ms
64 bytes from 2001:db8::10: icmp_seq=2 ttl=64 time=0.480 ms
64 bytes from 2001:db8::10: icmp_seq=3 ttl=64 time=0.725 ms
--- 2001:db8::10 ping statistics --3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 0.425/0.543/0.725/0.131 ms

The -c option is used to specify the number of packets to send. If you omit this option, ping and
ping6 will continue to send packets until you stop it, typically with the Ctrl + C keyboard
combination.
Just because you can’t ping a host, doesn’t mean you can’t connect to it. Many organizations have
firewalls or router access control lists that block everything but the bare minimum needed for
their systems to function. This includes ICMP echo request and replies. Since these packets can
include arbitrary data, a clever attacker could use them to exfiltrate data.

Tracing Routes
The traceroute and traceroute6 programs can be used to show you the route a packet takes to
get to its destination. They do this by sending multiple packets to the destination, incrementing the
Time-To-Live (TTL) field of the IP header with each subsequent packet. Each router along the way
will respond with a TTL exceeded ICMP message:
$ traceroute 192.168.1.20
traceroute to 192.168.1.20 (192.168.1.20), 30 hops max, 60 byte packets

10.0.2.2 (10.0.2.2)

0.396 ms

192.168.1.20 (192.168.1.20)

0.171 ms
2.665 ms

0.132 ms
2.573 ms

2.573 ms

$ traceroute 192.168.50.2
traceroute to 192.168.50.2 (192.168.50.2), 30 hops max, 60 byte packets

448

192.168.50.2 (192.168.50.2)

0.433 ms

0.273 ms

0.171 ms

$ traceroute6 2001:db8::11
traceroute to 2001:db8::11 (2001:db8::11), 30 hops max, 80 byte packets

2001:db8::11 (2001:db8::11)

0.716 ms

0.550 ms

0.641 ms

$ traceroute 2001:db8::11
traceroute to 2001:db8::11 (2001:db8::11), 30 hops max, 80 byte packets

2001:db8::10 (2001:db8::11)

0.617 ms

0.461 ms

0.387 ms

$ traceroute net2.example.net
traceroute to net2.example.net (192.168.50.2), 30 hops max, 60 byte packets

net2.example.net (192.168.50.2)

0.533 ms

0.529 ms

0.504 ms

$ traceroute6 net2.example.net
traceroute to net2.example.net (2001:db8::11), 30 hops max, 80 byte packets

net2.example.net (2001:db8::11)

0.738 ms

0.607 ms

0.304 ms

By default, traceroute sends 3 UDP packets with junk data to port 33434, incrementing it each
time it sends a packet. Each line in the command’s output is a router interface the packet traverses
through. The times shown in each line of the output is the round trip time for each packet. The IP
address is the address of the router interface in question. If traceroute is able to, it uses the DNS
name of the router interface. Sometimes you will see * in place of a time. When this happens, it
means that traceroute never received the TTL exceeded message for this packet. When you start
seeing this, this often indicates that the last response is the last hop on the route.
If you have access to root, the -I option will set traceroute to use ICMP echo requests instead of
UDP packets. This is often more effective than UDP because the destination host is more likely to
respond to an ICMP echo request than the UDP packet:
traceroute to learning.lpi.org (208.94.166.201), 30 hops max, 60 byte packets

047-132-144-001.res.spectrum.com (47.132.144.1)

9.764 ms

9.702 ms

9.693 ms

096-034-094-106.biz.spectrum.com (96.34.94.106)

8.389 ms

8.481 ms

8.480 ms

dtr01hlrgnc-gbe-4-15.hlrg.nc.charter.com (96.34.64.172)

8.763 ms

8.775 ms

8.770 ms

acr01mgtnnc-vln-492.mgtn.nc.charter.com (96.34.67.202)

27.080 ms

27.154 ms

27.151 ms

bbr01gnvlsc-bue-3.gnvl.sc.charter.com (96.34.2.112)

bbr01aldlmi-tge-0-0-0-13.aldl.mi.charter.com (96.34.0.161)

31.339 ms

31.398 ms

39.092 ms

31.395 ms

38.794 ms

38.821

ms

prr01ashbva-bue-3.ashb.va.charter.com (96.34.3.51)

bx2-ashburn.bell.ca (206.126.236.203)

tcore4-ashburnbk_0-12-0-0.net.bell.ca (64.230.125.190)

tcore4-toronto47_2-8-0-3.net.bell.ca (64.230.51.22)

agg1-toronto47_xe-7-0-0_core.net.bell.ca (64.230.161.114)

61.270 ms

61.299 ms

dis4-clarkson16_5-0.net.bell.ca (64.230.131.98)

61.177 ms

61.168 ms

207.35.12.142 (207.35.12.142)

53.973 ms

34.208 ms
35.975 ms

36.474 ms

36.544 ms

38.250 ms

66.315 ms

67.427 ms

65.319 ms

67.502 ms

65.345 ms

67.498 ms
61.291

ms
70.009 ms

61.101 ms

70.069 ms

59.893 ms

449

unassigned-117.001.centrilogic.com (66.135.117.1)

unassigned-116.122.akn.ca (66.135.116.122)

62.702 ms

62.759 ms

208.94.166.201 (208.94.166.201)

62.932 ms

62.921 ms

62.936 ms

61.778 ms

61.950 ms

63.041 ms

62.755 ms

Some organizations block ICMP echo requests and replies. To get around this, you can use TCP. By
using a known open TCP port, you can guarantee the destination host will respond. To use TCP,
use the -T option along with -p to specify the port. As with ICMP echo requests, you must have
access to root to do this:

traceroute to learning.lpi.org (208.94.166.201), 60 hops max, 60 byte packets

- * *

096-034-094-106.biz.spectrum.com (96.34.94.106)

dtr01hlrgnc-gbe-4-15.hlrg.nc.charter.com (96.34.64.172)

12.134 ms

12.093 ms

12.062 ms

acr01mgtnnc-vln-492.mgtn.nc.charter.com (96.34.67.202)

31.146 ms

31.192 ms

31.828 ms

bbr01gnvlsc-bue-3.gnvl.sc.charter.com (96.34.2.112)

bbr01aldlmi-tge-0-0-0-13.aldl.mi.charter.com (96.34.0.161)

12.178 ms

12.229 ms

39.057 ms

12.175 ms

46.706 ms

50.590 ms

39.745 ms

58.852 ms

58.841

ms

prr01ashbva-bue-3.ashb.va.charter.com (96.34.3.51)

bx2-ashburn.bell.ca (206.126.236.203)

tcore4-ashburnbk_0-12-0-0.net.bell.ca (64.230.125.190)

38.249 ms

34.556 ms

ashburnbk_100ge0-12-0-0.net.bell.ca (64.230.125.188)

36.991 ms

37.892 ms

38.274 ms

36.270 ms

66.779 ms

63.218 ms tcore3-

60.441 ms

tcore4-toronto47_2-8-0-3.net.bell.ca (64.230.51.22)

agg2-toronto47_xe-7-0-0_core.net.bell.ca (64.230.161.118)

63.932 ms

63.733 ms

60.144 ms

68.847 ms

60.443 ms agg1-

toronto47_xe-7-0-0_core.net.bell.ca (64.230.161.114)

60.851 ms

67.246 ms dis4-clarkson16_7-

dis4-clarkson16_5-0.net.bell.ca (64.230.131.98)

0.net.bell.ca (64.230.131.102)

68.404 ms dis4-clarkson16_5-0.net.bell.ca (64.230.131.98)

67.403 ms

207.35.12.142 (207.35.12.142)

unassigned-117.001.centrilogic.com (66.135.117.1)

66.138 ms

60.608 ms

64.656 ms

unassigned-116.122.akn.ca (66.135.116.122)

62.692 ms

69.470 ms

208.94.166.201 (208.94.166.201)

61.433 ms

65.421 ms

65.247 ms

17

208.94.166.201 (208.94.166.201)

64.023 ms

62.181 ms

61.899 ms

70.690 ms

62.190 ms

61.787 ms

68.815 ms

Like ping, traceroute has its limitations. It is possible for firewalls and routers to block the
packets sent from or returned to traceroute. If you have root access, there are options that can
help you get accurate results.

Finding MTUs With tracepath
The tracepath command is similar to traceroute. The difference is it tracks Maximum

450

Transmission Unit (MTU) sizes along the path. The MTU is either a configured setting on a network
interface or hardware limitation of the largest protocol data unit that it can transmit or receive.
The tracepath program works the same way as traceroute in that it increments the TTL with
each packet. It differs by sending a very large UDP datagram. It is almost inevitable for the
datagram to be larger than the device with the smallest MTU along the route. When the packet
reaches this device, the device will typically respond with a destination unreachable packet. The
ICMP destination unreachable packet has a field for the MTU of the link it would send the packet
on if it were able. tracepath then sends all subsequent packets with this size:
$ tracepath 192.168.1.20
1?: [LOCALHOST]

pmtu 1500

0.321ms

0.110ms

2:

192.168.1.20

2.714ms reached

Resume: pmtu 1500 hops 2 back 64

Unlike traceroute, you must explicitly use tracepath6 for IPv6:
$ tracepath 2001:db8::11
tracepath: 2001:db8::11: Address family for hostname not supported
$ tracepath6 2001:db8::11
1?: [LOCALHOST]

0.027ms pmtu 1500

net2.example.net

0.917ms reached

net2.example.net

0.527ms reached

Resume: pmtu 1500 hops 1 back 1

The output is similar to traceroute. The advantage of tracepath is on the last line it outputs the
smallest MTU on the entire link. This can be useful for troubleshooting connections that can’t
handle fragments.
As with the previous troubleshooting tools, there is the potential for equipment to block your
packets.

Creating Arbitrary Connections
The nc program, known as netcat, can send or receive arbitrary data over a TCP or UDP network
connection. The following examples should make its functionality clear.
Here is an example of setting up a listener on port 1234:

451

$ nc -l 1234
LPI Example

The output of LPI Example appears after the example below, which is setting up a netcat sender
to send packets to net2.example.net on port 1234. The -l option is used to specify that you wish
for nc to receive data instead of send it:
$ nc net2.example.net 1234
LPI Example

Press Ctrl + C on either system to stop the connection.
Netcat works with both IPv4 and IPv6 addresses. It works with both TCP and UDP. It can even be
used to setup a crude remote shell.

Note that not every installation of nc supports the -e switch. Be sure to review
the man pages for your installation for security information about this option
as well as alternative methods to execute commands on a remote system.

$ hostname
net2
$ nc -u -e /bin/bash -l 1234

The -u option is for UDP. -e instructs netcat to send everything it receives to standard input of the
executable following it. In this example, /bin/bash.
$ hostname
net1
$ nc -u net2.example.net 1234
hostname
net2
pwd
/home/emma

Notice how the hostname command output matched that of the listening host and the pwd
command output a directory?

452

Viewing Current Connections and Listeners
The netstat and ss programs can be used to view the status of your current listeners and
connections. As with ifconfig, netstat is a legacy tool. Both netstat and ss have similar
output and options. Here some options available to both programs:
-a
Shows all sockets.
Shows listening sockets.
-p
Shows the process associated with the connection.
-n
Prevents name lookups for both ports and addresses.
-t
Shows TCP connections.
Shows UDP connections.
The examples below show the output of a commonly used set of options for both programs:

PID/Program

name

0 0.0.0.0:22

892/sshd

0 127.0.0.1:25

1141/master

0 :::22

:::*

892/sshd

0 ::1:25

:::*

1141/master

0 0.0.0.0:68

692/dhclient

Netid

Recv-Q Send-Q

Local Address:Port

Peer

Address:Port

UNCONN

:68

*:

:22

*:

users:(("dhclient",pid=693,fd=6))

453

users:(("sshd",pid=892,fd=3))

127.0.0.1:25

:

users:(("master",pid=1099,fd=13))

[::]:22

[::1]:25

users:(("sshd",pid=892,fd=4))

users:(("master",pid=1099,fd=14))

The Recv-Q column is the number of packets a socket has received but not passed off to its
program. The Send-Q column is the number of packets a socket has sent that have not been
acknowledged by the receiver. The rest of the columns are self explanatory.

454

1. What command(s) would you use to send an ICMP echo to learning.lpi.org?

2. How could you determine the route to 8.8.8.8?

3. What command would show you if any processes are listening on TCP port 80?

4. How could you find which process is listening on a port?

## 5. How could you determine the max MTU of a network path?

455

1. How could you use netcat to send an HTTP request to a web server?

2. What are a few reasons pinging a host can fail?

3. Name a tool you could use to see network packets reaching or leaving a Linux host?

4. How can you force traceroute to use a different interface?

## 5. Is it possible for traceroute to report MTUs?

456

Networking is usually configured by a system’s startup scripts or a helper such as
NetworkManager. Most distributions have tools that will edit the startup script configuration files
for you. Consult your distribution’s documentation for details.
Being able to manually configure networking allows you to troubleshoot more effectively. It is
useful in minimal environments used for things like restoring from backups or migrating to new
hardware.
The utilities covered in this section have more functionality than covered in this lesson. It would
be worthwhile to skim through the man page of each to familiarize yourself with the options
available. The ss and ip commands are the modern way of doing things, while the rest that are
covered, while still in common use, are considered legacy tools.
The best way to get familiar with the tools covered is practice. Using a computer with a modest
amount of RAM, it is possible to setup a virtual network lab using virtual machines that you can
practice with. Three virtual machines are enough to get comfortable with the tools listed.
The commands covered in this lesson include:
ping and ping6
Used to transmit ICMP packets to a remote host to test a network connection’s availability.
traceroute and traceroute6
Used to trace a path through a network to determine a network’s connectivity.
tracepath and tracepath6
Used to trace a path through a network as well as determine MTU sizes along a route.
nc
Used to set up arbitrary connections on a network for testing connectivity, as well as querying
a network for available services and devices.
Legacy command used to determine a system’s open network connections and statistics.
ss
Modern command used to determine a system’s open network connections and statistics.

457

1. What command(s) would you use to send an ICMP echo to learning.lpi.org?
You would use ping or ping6:
$ ping learning.lpi.org

$ ping6 learning.lpi.org

## 2. How could you determine the route to 8.8.8.8?
By using the tracepath or traceroute commands.
$ tracepath 8.8.8.8

$ traceroute 8.8.8.8

3. What command would show you if any processes are listening on TCP port 80?
With ss:
$ ss -ln | grep ":80"

With netstat:
$ netstat -ln | grep ":80"

While not listed as a requirement for the exam, you can also use lsof:

## 4. How could you find which process is listening on a port?

458

Again, there are multiple ways to do this. You could use lsof in the same manner as the
previous answer, replacing the port number. You could also use netstat or ss with the -p
option. Remember, netstat is considered a legacy tool.

The same options that work with netstat also work with ss:

## 5. How could you determine the max MTU of a network path?
By using the tracepath command:
$ tracepath somehost.example.com

459

1. How could you use netcat to send an HTTP request to a web server?
By entering the HTTP request line, any headers, and a blank line into the terminal:
$ nc learning.lpi.org 80
GET /index.html HTTP/1.1
HOST: learning.lpi.org
HTTP/1.1 302 Found
Location: https://learning.lpi.org:443/index.html
Date: Wed, 27 May 2020 22:54:46 GMT
Content-Length: 5
Content-Type: text/plain; charset=utf-8
Found

## 2. What are a few reasons pinging a host can fail?
There are a number of possible reasons. Here are some:
- The remote host is down.
- A router ACL is blocking your ping.
- The remote host’s firewall is blocking your ping.
- You may be using an incorrect host name or address.
- Your name resolution is returning an incorrect address.
- Your machine’s network configuration is incorrect.
- Your machine’s firewall is blocking it.
- The remote host’s network configuration is incorrect.
- Your machine’s interface(s) are disconnected.
- The remote machine’s interface(s) are disconnected.
- A network component such as a switch, cable, or router between your machine and the
remote’s is no longer functioning.
3. Name a tool you could use to see network packets reaching or leaving a Linux host?
Both tcpdump and wireshark can be used.

460

## 4. How can you force traceroute to use a different interface?
By using the -i option:
$ traceroute -i eth2 learning.lpi.org
traceroute -i eth2 learning.lpi.org
traceroute to learning.lpi.org (208.94.166.201), 30 hops max, 60 byte packets

## 5. Is it possible for traceroute to report MTUs?
Yes, with the --mtu option:

traceroute to learning.lpi.org (208.94.166.201), 30 hops max, 65000 byte packets

047-132-144-001.res.spectrum.com (47.132.144.1)

9.974 ms F=1500

096-034-094-106.biz.spectrum.com (96.34.94.106)

8.697 ms

10.476 ms

9.963 ms

4.743 ms

10.321 ms

461

### 109.4 Configure client side DNS
LPIC-1 version 5.0, Exam 102, Objective 109.4
- Query remote DNS servers.
- Configure local name resolution and use remote DNS servers.
- Modify the order in which name resolution is done.
- Debug errors related to name resolution.
- Awareness of systemd-resolved
- /etc/hosts
- /etc/resolv.conf
- /etc/nsswitch.conf
- host
- dig
- getent

462

### 109.4 Lesson 1

### 109.4 Configure client side DNS

This lesson covers configuring client side name resolution and how to use a few CLI name
resolution tools.
Remembering and maintaining IP addresses, UIDs, and GIDs, and other numbers for everything
isn’t feasible. Name resolution services translate easy to remember names to numbers and vice
versa. This lesson focuses on host name resolution, but a similar process happens for user names,
group names, port numbers, and several others.

Name Resolution Process
Programs that resolve names to numbers almost always use functions provided by the standard C
library, which on Linux systems is the GNU project’s glibc. The first things these functions do is
read the file /etc/nsswitch.conf for instructions on how to resolve that type of name. This
lesson is focused on host name resolution, but the same process applies to other types of name
resolution as well. Once the process reads /etc/nsswitch.conf, it looks up the name in the
manner specified. Since /etc/nsswitch.conf supports plugins, what comes next could be
anything. After the function is done looking up the name or number, it returns the result to the

463

calling process.

DNS Classes
DNS has three record classes, IN, HS, and CH. In this lesson, all DNS queries will be of type IN. The
IN class is for internet addresses using the TCP/IP stack. CH is for ChaosNet, which is a network
technology that was short lived and is no longer in use. The HS class is for Hesiod. Hesiod is a way
to store things like passwd and group entries in DNS. Hesiod is beyond the scope of this lesson.

Understanding /etc/nsswitch.conf
The best way to learn about this file is to read the man page that is part of the Linux man-pages
project. It is available on most systems. It can be accessed with the command man
nsswitch.conf. Alternatively, it can be found at https://man7.org/linux/man-pages/
dir_section_5.html
Below is a simple example of /etc/nsswitch.conf from its man page:
passwd:

compat

group:

compat

shadow:

compat

hosts:

dns [!UNAVAIL=return] files

networks:

ethers:

protocols:

rpc:

services:

The file is organized into columns. The far left column is the type of name database. The rest of
the columns are the methods the resolution functions should use to lookup a name. The methods
are followed by the functions from left to right. Columns with [] are used to provide some limited
conditional logic to the column immediately to the left of it.
Suppose a process is trying to resolve the host name learning.lpi.org. It would make an
appropriate C library call (most likely gethostbyname). This function will then read
/etc/nsswitch.conf. Since the process is looking up a host name, it will find the line starting
with hosts. It would then attempt to use DNS to resolve the name. The next column,
[!UNAVAIL=return] means that if the service is not unavailable, then do not try the next source,
i.e., if DNS is available, stop trying to resolve the host name even if the name servers are unable to.

464

If DNS is unavailable, then continue on to the next source. In this case, the next source is files.
When you see a column in the format [result=action], it means that when a resolver lookup of
the column to the left of it is result, then action is performed. If result is preceded with a !, it
means if the result is not result, then perform action. For descriptions of the possible results
and actions, see the man page.
Now suppose a process is trying to resolve a port number to a service name. It would read the
services line. The first source listed is NIS. NIS stands for Network Information Service (it is
sometimes referred to as yellow pages). It is an old service that allowed central management of
things such as users. It is rarely used anymore due to its weak security. The next column
[NOTFOUND=return] means that if the lookup succeeded but the service was not found to stop
looking. If the aforementioned condition does not apply, use local files.
Anything to the right of # is a comment and ignored.

The /etc/resolv.conf File
The file /etc/resolv.conf is used to configure host resolution via DNS. Some distributions have
startup scripts, daemons, and other tools that write to this file. Keep this in mind when manually
editing this file. Check your distribution and any network configuration tools documentation if
this is the case. Some tools, such as Network Manager will leave a comment in the file letting you
know that manual changes will be overwritten.
As with /etc/nsswitch.conf, there is a man page associated with the file. It can be accessed
with the command man
resolv.conf or at https://man7.org/linux/man-pages/man5/
resolv.conf.5.html.
The file format is rather straight forward. In the far left column, you have the option name. The
rest of the columns on the same line are the option’s value.
The most common option is the nameserver option. It is used to specify the IPv4 or IPv6 address
of a DNS server. As of the date of this writing, you can specify up to three name servers. If your
/etc/resolv.conf does not have a nameserver option, your system will by default use the
name server on the local machine.
Below is a simple example file that is representative of common configurations:
search lpi.org
nameserver 10.0.0.53
nameserver fd00:ffff::2:53

465

The search option is used to allow short form searches. In the example, a single search domain of
lpi.org is configured. This means that any attempt to resolve a host name without a domain
portion will have .lpi.org appended before the search. For example, if you were to try to search
for a host named learning, the resolver would search for learning.lpi.org. You can have up
to six search domains configured.
Another common option is the domain option. This is used to set your local domain name. If this
option is missing, this defaults to everything after the first . in the machine’s host name. If the
host name does not contain a ., it is assumed that the machine is part of the root domain. Like
search, domain can be used for short name searches.
Keep in mind that domain and search are mutually exclusive. If both are present, the last
instance in the file is used.
There are several options that can be set to affect the behavior of the resolver. To set these, use the
options keyword, followed by the name of the option to set, and if applicable, a : followed by the
value. Below is an example of setting the timeout option, which is the length of time in seconds the
resolver will wait for a name server before giving up:
option timeout:3

There are other options to resolv.conf, but these are the most common.

The /etc/hosts File
The file /etc/hosts is used to resolve names to IP addresses and vice versa. Both IPv4 and IPv6
are supported. The left column is the IP address, the rest are names associated with that address.
The most common use for /etc/hosts is for hosts and addresses where DNS is not possible, such
as loop back addresses. In the example below, IP addresses of critical infrastructure components
are defined.
Here is a realistic example of an /etc/hosts file:
127.0.0.1

localhost

127.0.1.1

proxy

::1

localhost ip6-localhost ip6-loopback

ff02::1

ip6-allnodes

ff02::2

ip6-allrouters

10.0.0.1

gateway.lpi.org gateway gw

fd00:ffff::1

gateway.lpi.org gateway gw

466

10.0.1.53

dns1.lpi.org

fd00:ffff::1:53 dns1.lpi.org
10.0.2.53

dns2.lpi.org

fd00:ffff::2:53 dns2.lpi.org

systemd-resolved
Systemd provides a service called systemd-resolved. It provides mDNS, DNS, and LLMNR. When
it is running, it listens for DNS requests on 127.0.0.53. It does not provide a full fledged DNS
server. Any DNS requests it receives are looked up by querying servers configured in
/etc/systemd/resolv.conf or /etc/resolv.conf. If you wish to use this, use resolve for
hosts in /etc/nsswitch.conf. Keep in mind that the OS package that has the systemdresolved library may not be installed by default.

Name Resolution Tools
There are many tools available to Linux users for name resolution. This lesson covers three. One,
getent, is useful for seeing how real world requests will resolve. Another command is host,
which is useful for simple DNS queries. A program called dig is useful for complex DNS
operations that can aid with troubleshooting DNS server problems.

The getent Command
The getent utility is used to display entries from name service databases. It can retrieve records
from any source configurable by /etc/nsswitch.conf.
To use getent, follow the command with the type of name you wish to resolve and optionally a
specific entry to lookup. If you only specify the type of name, getent will attempt to display all
entries of that data type:
$ getent hosts
127.0.0.1

localhost

127.0.1.1

proxy

10.0.1.53

dns1.lpi.org

10.0.2.53

dns2.lpi.org

127.0.0.1

localhost ip6-localhost ip6-loopback

$ getent hosts dns1.lpi.org
fd00:ffff::1:53 dns1.lpi.org

467

Starting with glibc version 2.2.5, you can force getent to use a specific data source with the -s
option. The example below demonstrates this:
$ getent -s files hosts learning.lpi.org
::1

$ getent -s dns hosts learning.lpi.org
208.94.166.198

The host Command
host is a simple program for looking up DNS entries. With no options, if host is given a name, it
returns the A, AAAA, and MX record sets. If given an IPv4 or IPv6 address, it outputs the PTR
record if one is available:
$ host wikipedia.org
wikipedia.org has address 208.80.154.224
wikipedia.org has IPv6 address 2620:0:861:ed1a::1
wikipedia.org mail is handled by 10 mx1001.wikimedia.org.
wikipedia.org mail is handled by 50 mx2001.wikimedia.org.
$ host 208.80.154.224
224.154.80.208.in-addr.arpa domain name pointer text-lb.eqiad.wikimedia.org.

If you are looking for a specific record type, you can use host -t:
$ host -t NS lpi.org
lpi.org name server dns1.easydns.com.
lpi.org name server dns3.easydns.ca.
lpi.org name server dns2.easydns.net.
$ host -t SOA lpi.org
lpi.org has SOA record dns1.easydns.com. zone.easydns.com. 1593109612 3600 600 1209600 300

host can also be used to query a specific name server if you do not wish to use the ones in
/etc/resolv.conf. Simply add the IP address or host name of the server you wish to use as the
last argument:
$ host -t MX lpi.org dns1.easydns.com
Using domain server:
Name: dns1.easydns.com
Address: 64.68.192.10#53
Aliases:

468

lpi.org mail is handled by 10 aspmx4.googlemail.com.
lpi.org mail is handled by 10 aspmx2.googlemail.com.
lpi.org mail is handled by 5 alt1.aspmx.l.google.com.
lpi.org mail is handled by 0 aspmx.l.google.com.
lpi.org mail is handled by 10 aspmx5.googlemail.com.
lpi.org mail is handled by 10 aspmx3.googlemail.com.
lpi.org mail is handled by 5 alt2.aspmx.l.google.com.

The dig Command
Another tool for querying DNS servers is dig. This command is much more verbose than host. By
default, dig queries for A records. It is probably too verbose for simply looking up an IP address
or host name. dig will work for simple lookups, but it is more suited for troubleshooting DNS
server configuration:
$ dig learning.lpi.org
; <<>> DiG 9.11.5-P4-5.1+deb10u1-Debian <<>> learning.lpi.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 63004
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 3, ADDITIONAL: 5
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
; COOKIE: ca7a415be1cec45592b082665ef87f3483b81ddd61063c30 (good)
;; QUESTION SECTION:
;learning.lpi.org.

600 IN

208.94.166.198

;; ANSWER SECTION:
learning.lpi.org.

;; AUTHORITY SECTION:

86400

86400

86400

172682

64.68.192.10

170226

198.41.222.254

172682

2400:cb00:2049:1::a29f:1835

170226

2400:cb00:2049:1::c629:defe

;; ADDITIONAL SECTION:

469

;; Query time: 135 msec
;; SERVER: 192.168.1.20#53(192.168.1.20)
;; WHEN: Sun Jun 28 07:29:56 EDT 2020
;; MSG SIZE

rcvd: 266

As you can see, dig provides a lot of information. The output is divided into sections. The first
section displays information about the version of dig installed and the query sent, along with any
options used for the command. Next it shows information about the query and the response.
The next section shows information about EDNS extensions used and the query. In the example,
the cookie extension is used. dig is looking for an A record for learning.lpi.org.
The next section shows the result of the query. The number in the second column is the TTL of the
resource in seconds.
The rest of the output provides information about the domain’s name servers, including the NS
records for the server along with the A and AAAA records of the servers in the domain’s NS
record.
Like host, you can specify a record type with the -t option:
$ dig -t SOA lpi.org
; <<>> DiG 9.11.5-P4-5.1+deb10u1-Debian <<>> -t SOA lpi.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 16695
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 3, ADDITIONAL: 6
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
; COOKIE: 185c67140a63baf46c4493215ef8906f7bfbe15bdca3b01a (good)
;; QUESTION SECTION:
;lpi.org.

SOA

;; ANSWER SECTION:

600 IN

SOA dns1.easydns.com. zone.easydns.com. 1593109612 3600 600 1209600

300
;; AUTHORITY SECTION:

81989

81989

470

81989

168271

64.68.192.10

165815

198.41.222.254

107 IN

64.68.196.10

168271

2400:cb00:2049:1::a29f:1835

165815

2400:cb00:2049:1::c629:defe

;; ADDITIONAL SECTION:

;; Query time: 94 msec
;; SERVER: 192.168.1.20#53(192.168.1.20)
;; WHEN: Sun Jun 28 08:43:27 EDT 2020
;; MSG SIZE

rcvd: 298

Dig has many options to fine tune both the output and query sent to the server. These options
begin with +. One option is the short option, which suppresses all output except the result:
$ dig +short lpi.org
65.39.134.165
$ dig +short -t SOA lpi.org
dns1.easydns.com. zone.easydns.com. 1593109612 3600 600 1209600 300

Here is an example of turning off the cookie EDNS extension:
$ dig +nocookie -t MX lpi.org
; <<>> DiG 9.11.5-P4-5.1+deb10u1-Debian <<>> +nocookie -t MX lpi.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 47774
;; flags: qr rd ra; QUERY: 1, ANSWER: 7, AUTHORITY: 3, ADDITIONAL: 5
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;lpi.org.

0 aspmx.l.google.com.

10 aspmx4.googlemail.com.

10 aspmx5.googlemail.com.

10 aspmx2.googlemail.com.

;; ANSWER SECTION:

471

10 aspmx3.googlemail.com.

5 alt2.aspmx.l.google.com.

5 alt1.aspmx.l.google.com.

;; AUTHORITY SECTION:

77130

77130

77130

76140

64.68.192.10

73684

198.41.222.254

76140

2400:cb00:2049:1::a29f:1835

73684

2400:cb00:2049:1::c629:defe

;; ADDITIONAL SECTION:

;; Query time: 2 msec
;; SERVER: 192.168.1.20#53(192.168.1.20)
;; WHEN: Mon Jun 29 10:18:58 EDT 2020
;; MSG SIZE

472

rcvd: 389

## 1. What will the command below do?
getent group openldap

2. What is the biggest difference between getent and the other tools covered, host and dig?

3. Which option to dig and host is used to specify the type of record you wish to retrieve?
