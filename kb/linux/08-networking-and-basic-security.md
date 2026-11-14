---
id: linux-08
title: "Your Computer on the Network and Basic Security"
slug: 08-networking-and-basic-security
source: "LPI Learning Material 010-160"
sourceSection: "4.4, 5.1"
topic: "4, 5"
tags: [linux, lpic-1, networking, ipv4, ipv6, dns, security]
summary: "IPv4, IPv6, DNS and sockets on the wire, then the account types and privilege model that keep a Linux system safe."
---
# The Linux Operating System

## 4.4 Your Computer on the Network

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 4.4
**Weight:** 2
**Key knowledge areas**
- Internet, network, routers
- Querying DNS client configuration
- Querying network configuration
**Partial list of the used files, terms and utilities**
- route, ip route show
- ifconfig, ip addr show
- netstat, ss
- /etc/resolv.conf, /etc/hosts
- IPv4, IPv6
- ping
- host

### 4.4 Lesson 1

#### Introduction

In today’s world, computing devices of any kind exchange information through networks. At the very heart of the concept of computer networks are the physical connections between a device and its peer(s). These connections are called links, and they are the most basic connection between two different devices. Links can be established through various media, such as copper cables, optical fibres, radio waves or lasers. Each link is connected with an interface of a device. Each device can have multiple interfaces and thus be connected to multiple links. Through these links computers can form a network; a small community of devices that can directly connect to each other. There are numerous examples of such networks in the world. To be able to communicate beyond the scope of a link layer network, devices use routers. Think of link layer networks as islands connected by routers which connect the islands — just like bridges which information has to travel to reach a device which is part of a remote island. This model leads to several different layers of networking:
**Link Layer**
Handles the communication between directly connected devices.
**Network Layer**
Handles routing outside of individual networks and the unique addressing of devices beyond a single link layer network.
**Application Layer**
Enables individual programs to connect to each other. When first invented, computer networks used the same methods of communication as telephones in that they were circuit switched. This means that a dedicated and direct link had to be formed between two nodes for them to be able to communicate. This method worked well, however, it required all the space on a given link for only two hosts to communicate. Eventually computer networks moved over to something called packet switching. In this method the data is grouped up with a header, which contains information about where the information is coming from and where it’s going to. The actual content information is contained in this frame and sent over the link to the recipient indicated in the frame’s header. This allows for multiple devices to share a single link and communicate almost simultaneously.
#### Link Layer Networking

The job of any packet is to carry information from the source to its destination through a link connecting both devices. These devices need a way to identify themselves to each other. This is the purpose of a link layer address. In an ethernet network, Media Access Control Addresses (MAC) are used to identify individual devices. A MAC address consists of 48 bits. They are not necessarily globally unique and cannot be used to address peers outside of the current link. Thus these addresses can not be used to route packets to another links. The recipient of a packet checks whether the destination address matches its own link layer and, if it does, processes the packet. Otherwise the packet is dropped. The exception to this rule is broadcast packets (a packet sent to everyone in a given local network) which are always accepted. The command ip link show displays a list of all the available network interfaces and their link layer addresses as well as some other information about the maximum packet size:
```console
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group
default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT

group default qlen 1000
link/ether 00:0c:29:33:3b:25 brd ff:ff:ff:ff:ff:ff
```
The above output shows that the device has two interfaces, lo and ens33. lo is the loopback device and has the MAC address 00:00:00:00:00:00 while ens33 is an ethernet interface and has the MAC address 00:0c:29:33:3b:25.
#### IPv4 Networking

To visit websites such as Google or Twitter, to check emails or to allow businesses to connect to each other, packets need to be able to roam from one link layer network to another. Often, these networks are connected just indirectly, with several intermediate link layer networks which packets have to cross to reach their actual destination. The link layer addresses of a network interface cannot be used outside that specific link layer network. Since this address has no significance to devices in other link layer networks, a form of globally unique addresses are needed in order to implement routing. This addressing scheme, along with the overall concept of routing, is implemented by the Internet Protocol (IP).
**NOTE**
A protocol is a set of procedures of doing something so that all parties following the protocol are compatible to each other. A protocol can be seen as the definition of a standard. In computing, the Internet Protocol is a standard agreed upon by everyone so that different devices produced by different manufacturers can all communicate with each other.
**IPv4 Addresses**
IP addresses, like MAC addresses, are a way to indicate where a data packet comes from and where it is going to. IPv4 was the original protocol. IPv4 addresses are 32 bits wide giving a theoretical maximum number of 4,294,967,296 addresses. However, the number of those addresses useable by devices is much smaller as some ranges are reserved for special use cases such as broadcast addresses (which are used to reach all participants of a specific network), multicast addresses (similar to broadcast addresses, but a device must tune in like a radio) or those reserved for private use. In their human readable format IPv4 addresses are denoted as four digits separated by a dot. Each digit can range from 0 to 255. For example, take the following IP address: 192.168.0.1
Technically, each of these digits represents eight individual bits. Thus this address could also be written like this: 11000000.10101000.00000000.00000001
In practice the decimal notation as seen above is used. However, the bitwise representation is still important to understand subnetting.
**IPv4 Subnets**
In order to support routing, IP addresses can be split into two parts: the network and host portions. The network portion identifies the network that the device is on and is used to route packets to that network. The host portion is used to specifically identify a given device on a network and to hand the packet over to its specific recipient once it has reached its link layer network. IP addresses can be broken into subnet and host parts at any point. The so-called subnet mask defines where this split happens. Let’s reconsider the binary representation of the IP address from the former example: 11000000.10101000.00000000.00000001
Now for this IP address, the subnet mask sets each bit which belongs to the network part to 1 and each bit that belongs to the host part to 0: 11111111.11111111.11111111.00000000
In practice the netmask is written in the decimal notation: 255.255.255.0
This means that this network ranges from 192.168.0.0 to 192.168.0.255. Note that the first three numbers, which have all bits set in the net mask, stay unchanged in the IP addresses. Finally, there is an alternative notation for the subnet mask, which is called Classless Inter-Domain Routing (CIDR). This notation just indicates how many bits are set in the subnet mask and adds this number to the IP address. In the example, 24 out of 32 bits are set to 1 in the subnet mask. This can be expressed in CIDR notation as 192.168.0.1/24
**Private IPv4 Addreses**
As mentioned before, certain sections of the IPv4 address space are reserved for special use cases. One of these use cases are private address assignments. The following subnets are reserved for private addressing:
- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
Addresses out of these subnets can be used by anyone. However, these subnets can not be routed on the public internet as they are potentially used by numerous networks at the same time. Today, most networks use these internal addresses. They allow internal communication without the need of any external address assignment. Most internet connections today just come with a single external IPv4 address. Routers map all the internal addresses to that single external IP address when forwarding packets to the internet. This is called Network Address Translation (NAT). The special case of NAT where a router maps internal addresses to a single external IP address is sometimes call masquerading. This allows any device on the inside network to establish new connections with any global IP address on the internet.
**NOTE**
With masquerading, the internal devices can not be referenced from the internet since they do not have a globally valid address. However, this is not a security feature. Even when using masquerading, a firewall is still needed.
**IPv4 Address Configuration**
There are two main ways to configure IPv4 addresses on a computer. Either by assigning addresses manually or by using the Dynamic Host Configuration Protocol (DHCP) for automatic configuration. When using DHCP, a central server controls which addresses are handed out to which devices. The server can also supply devices with other information about the network such as the IP addresses of DNS servers, the IP address of the default router or, in the case of more complicated setups, to start an operating system from the network. DHCP is enabled by default on many systems, therefore you will likely already have an IP address when you are connected to a network. IP addresses can also be manually added to an interface using the command ip addr add. Here, we add the address 192.168.0.5 to the interface ens33. The network uses the netmask 255.255.255.0 which equals /24 in CIDR notation:
```console
$ sudo ip addr add 192.168.0.5/255.255.255.0 dev ens33
```
Now we can verify that the address was added using the ip addr show command:
```console
$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
25: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen
1000
link/ether 00:0c:29:33:3b:25 brd ff:ff:ff:ff:ff:ff
inet 192.168.0.5/24 192.168.0.255 scope global ens33
valid_lft forever preferred_lft forever
inet6 fe80::010c:29ff:fe33:3b25/64 scope link noprefixroute
valid_lft forever preferred_lft forever
```
The above output shows both the lo interface and the ens33 interface with its address assigned with the command above. To verify the reachability of a device, the ping command can be used. It sends a special type of message called an echo request in which the sender asks the recipient for a response. If the connection between the two devices can be successfully established, the recipient will send back an echo reply, thus verifying the connection:
```console
$ ping -c 3 192.168.0.1
```
PING 192.168.0.1 (192.168.0.1) 56(84) bytes of data. 64 bytes from 192.168.0.1: icmp_seq=1 ttl=64 time=2.16 ms 64 bytes from 192.168.0.1: icmp_seq=2 ttl=64 time=1.85 ms 64 bytes from 192.168.0.1: icmp_seq=3 ttl=64 time=3.41 ms --- 192.168.0.1 ping statistics --3 packets transmitted, 3 received, 0% packet loss, time 5ms rtt min/avg/max/mdev = 1.849/2.473/3.410/0.674 ms
The -c 3 parameter makes ping stop after sending three echo requests. Otherwise, ping continues to run forever and has to be stopped by pressing Ctrl + C .
**IPv4 Routing**
Routing is the process in which a packet gets from the source network to the destination network. Each device maintains a routing table which contains information about which IP network can be directly reached through the device’s attachment to link layer networks and which IP network can be reached by passing packets on to a router. Finally, a default route defines a router which receives all packets which did not match any other route. When establishing a connection, the device looks up the target’s IP address in its routing table. If an entry matches the address, the packet is either sent to the respective link layer network or passed on to the router indicated in the routing table. Routers themselves maintain routing tables, too. When receiving a packet, a router also looks up the destination address in its own routing table and sends the packet on to the next router. This is repeated until the packet arrives at the router on the destination network. Each router involved in this journey is called a hop. This last router finds a direct connected link for the target address in its routing table and sends the packets to its target interface. Most home networks only have one way out, the singular router that came from the internet service provider (ISP). In this case a device just forwards all packets that aren’t for the internal network directly to the home router which will then send it to the provider’s router for further forwarding. This is an example of the default route. The command ip route show lists the current IPv4 routing table:
```console
$ ip route show
127.0.0.0/8 via 127.0.0.1 dev lo0
192.168.0.0/24 dev ens33 scope link
```
To add a default route, all that’s needed is the internal address of the router that’s going to be the default gateway. If, for example, the router has the address 192.168.0.1, then the following command sets it up as a default route:
```console
$ sudo ip route add default via 192.168.0.1

To verify, run ip route show again:
$ ip route show
default via 192.168.0.1 dev ens33
127.0.0.0/8 via 127.0.0.1 dev lo0

192.168.0.0/24 dev ens33 scope link
```
#### IPv6 Networking

IPv6 was designed to deal with the shortcomings of IPv4, mainly the lack of addresses as more and more devices were being brought online. However, IPv6 also includes other features such as new protocols for automatic network configuration. Instead of 32 bits per address IPv6 uses 128. This 128 allows for approximately 2 addresses. However, like IPv4, the number of globally unique usable addresses is a lot smaller due to sections of the allocation being reserved for other uses. This large number of addresses means there are more than enough public addresses for every device currently connected to the internet and for many more to come, thus reducing the need for masquerading and its issues such as the delay during translation and the impossibility to directly connect to masqueraded devices.
**IPv6 Addresses**
Written down, the addresses use 8 groups of 4 hexadecimal digits each separated by a colon: 2001:0db8:0000:abcd:0000:0000:0000:7334
**NOTE**
Hexadecimal digits range from 0 to f, so each digit can contain one of 16 different values.
To make it easier leading zeros from each group can be removed when written down however each group must contain at least one digit: 2001:db8:0:abcd:0:0:0:7334
Where multiple groups containing only zeros follow directly after each other they may be entirely replaced by '::': 2001:db8:0:abcd::7334
However, this can only happen once in each address.
**IPv6 Prefix**
The first 64 bits of an IPv6 address are known as the routing prefix. The prefix is used by routers to
determine which network a device belongs to and therefore which path the data needs to be sent on. Subnetting always happens within the prefix. ISPs usually hand out /48 or /58 prefixes to their customers, leaving them 16 or 8 bits for their internal subnetting. There are three major prefix types in IPv6:
**Global Unique Address**
Wherein the prefix is assigned from the blocks reserved for global addresses. These addresses ware valid in the entire internet.
**Unique Local Address**
May not be routed in the internet. They may, however, be routed internally within an organization. These addresses are used within a network to ensure the devices still have an address even when there is no internet connection. They are the equivalent of the private address ranges from IPv4. The first 8 bits are always fc or fd, followed by 40 randomly generated bits.
**Link Local Address**
Are only valid on a particular link. Every IPv6 capable network interface has one such address, starting with fe80. These addresses are used internally by IPv6 to request additional addresses using automatic configuration and to find other computers on the network using the Neighbor Discovery protocol.
**IPv6 Interface Identifier**
While the prefix determines in which network a device resides, the interface identifier is used to enumerate the devices within a network. The last 64 bits in an IPv6 address form the interface identifier, just like the last bits of an IPv4 address. When an IPv6 address is assigned manually, the interface identifier is set as part of the address. When using automatic address configuration, the interface identifier is either chosen randomly or derived from the device’s link layer address. This makes a variation of the link layer address appear within the IPv6 address.
**IPv6 Address Configuration**
Like IPv4, IPv6 address can be either assigned manually or automatically. However, IPv6 has two different types of automated configuration, DHCPv6 and Stateless Address Autoconfiguration (SLAAC). SLAAC is the easier of the two automated methods and built right into the IPv6 standard. The
messages use the new Neighbor Discovery Protocol which allows devices to find each other and request information regarding a network. This information is sent by routers and can contain IPv6 prefixes which the devices may use by combining them with an interface identifier of their choice, as long as the resulting address it not yet in use. The devices do not provide feedback to the router about the actual addresses they have created. DHCPv6, on the other hand, is the updated DHCP made to work with the changes of IPv6. It allows for finer control over the information handed out to clients, like allowing for the same address to be handed out to the same client every time, and sending out more options to the client than SLAAC. With DHCPv6, clients need to get the explicit consent of a DHCP server in order to use an address. The method to manually assign an IPv6 address to an interface is the same as with IPv4:
```console
$ sudo ip addr add 2001:db8:0:abcd:0:0:0:7334/64 dev ens33
```
To verify the assignment has worked the same ip addr show command is used:
```console
$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
25: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen
1000
link/ether 00:0c:29:33:3b:25 brd ff:ff:ff:ff:ff:ff
inet 192.168.0.5/24 192.168.0.255 scope global ens33
valid_lft forever preferred_lft forever
inet6 fe80::010c:29ff:fe33:3b25/64 scope link noprefixroute
valid_lft forever preferred_lft forever
inet6 2001:db8:0:abcd::7334/64 scope global
valid_lft forever preferred_lft forever
```
Here we also see the link-local address fe80::010c:29ff:fe33:3b25/64. Like IPv4, the ping command can also be used to confirm the reachability of devices through IPv6:
```console
$ ping 2001:db8:0:abcd::1

PING 2001:db8:0:abcd::1(2001:db8:0:abcd::1) 56 data bytes
64 bytes from 2001:db8:0:abcd::1: icmp_seq=1 ttl=64 time=0.030 ms
64 bytes from 2001:db8:0:abcd::1: icmp_seq=2 ttl=64 time=0.040 ms
64 bytes from 2001:db8:0:abcd::1: icmp_seq=3 ttl=64 time=0.072 ms
--- 2001:db8:0:abcd::1 ping statistics --3 packets transmitted, 3 received, 0% packet loss, time 43ms
rtt min/avg/max/mdev = 0.030/0.047/0.072/0.018 ms
```
**NOTE**
On some Linux systems, ping does not support IPv6. These systems provide a dedicated ping6 command instead.
To verify the link-local address again use ping again. But since all interfaces use the fe80::/64 prefix, the correct interface has to be specified along with the address:
```console
$ ping6 -c 1 fe80::010c:29ff:fe33:3b25%ens33
PING fe80::010c:29ff:fe33:3b25(fe80::010c:29ff:fe33:3b25) 56 data bytes
64 bytes from fe80::010c:29ff:fe33:3b25%ens33: icmp_seq=1 ttl=64 time=0.049 ms
--- fe80::010c:29ff:fe33:3b25 ping statistics --1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.049/0.049/0.049/0.000 ms
```
#### DNS

IP addresses are difficult to remember and don’t exactly have a high coolness factor if you’re trying to market a service or product. This is where the Domain Name System comes into play. In its simplest form DNS is a distributed phone book that maps friendly rememberable domain names such as example.com to IP addresses. When, for example, a user navigates to a website, they enter the DNS hostname as part of the URL. The web browser then sends the DNS name to whichever DNS resolver has been configured. That DNS resolver will in turn find out the address that correlates to the domain. The resolver then replies with that address and the web browser tries to reach the web server at that IP address. The resolvers that Linux uses to look up DNS data are configured in the /etc/resolv.conf configuration file:
```console
$ cat /etc/resolv.conf
search lpi
nameserver 192.168.0.1
```
When the resolver performs a name lookup, it first checks the /etc/hosts file to see if it contains an address for the requested name. If it does, it returns that address and does not contact the DNS. This allows network administrators to provide name resolution without having to go through the effort of configuration a complete DNS server. Each line in that file contains one IP address followed by one or more names: 127.0.0.1
localhost.localdomain
localhost
::1
localhost.localdomain
localhost
192.168.0.10
server
2001:db8:0:abcd::f server
To perform a lookup in the DNS, use the command host:
```console
$ host learning.lpi.org
learning.lpi.org has address 208.94.166.198
```
More detailed information can be retrieved using the command dig:
```console
$ dig learning.lpi.org
; <<>> DiG 9.14.3 <<>> learning.lpi.org
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 21525
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; COOKIE: 2ac55879b1adef30a93013705d3306d2128571347df8eadf (bad)
;; QUESTION SECTION:
;learning.lpi.org.
```
IN
A
550 IN
A
;; ANSWER SECTION: learning.lpi.org.
208.94.166.198
**;; Query time: 3 msec**
;; SERVER: 192.168.0.1#53(192.168.0.1) ;; WHEN: Sat Jul 20 14:20:21 EST 2019 ;; MSG SIZE
rcvd: 89
Here we also see the name of the DNS record types, in this case A for IPv4.
#### Sockets

A socket is a communication endpoint for two programs talking to each other. If the socket is connected over a network, the programs can run on different devices, such as a web browser running on a user’s laptop and a web server running in a company’s data center. There are three main types of sockets:
**Unix Sockets**
Which connect processes running on the same device.
**UDP (User Datagram Protocol) Sockets**
Which connect applications using a protocol which is fast but not resilient.
**TCP (Transmission Control Protocol) Sockets**
Which are more reliable than UDP sockets and, for example, confirm the receipt of data. Unix sockets can only connect applications running on the same device. TCP and UDP sockets however can connect over a network. TCP allows for a stream of data that always arrives in the exact order it was sent. UDP is more fire and forget; the packet is sent but its delivery at the other end is not guaranteed. UDP does however lack the overhead of TCP, making it perfect for low latency applications such as online video games. TCP and UDP both use ports to address multiple sockets on the same IP address. While the source port for a connection is usually random, target ports are standardized for a specific service. HTTP is, for example, usually hosted at port 80, HTTPS is run on port 443. SSH, a protocol to securely log into a remote Linux system, listens on port 22. The ss command allows an administrator to investigate all of the sockets on a Linux computer. It shows everything from the source address, destination address and type. One of its best features is the use of filters so a user can monitor the sockets in whatever connection state they would like. ss can be run with a set of options as well as a filter expression to limit the information shown. When executed without any options, the command shows a list of all established sockets. Using the -p option includes information on the process using each socket. The –s option shows a summary of sockets. There are many more options available for this tool but the last set of major ones are -4 and -6 for narrowing down the IP protocol to either IPv4 or IPv6 respectively, -t and -u allow the administrator to select TCP or UDP sockets and -l to show only socket which listen for new connections. The following command, for example, lists all TCP sockets currently in use:
```console
$ ss -t
```
State
Recv-Q
Send-Q
Local Address:Port
Peer Address:Port
ESTAB
0
ESTAB
0
0
192.168.0.5:49412
192.168.0.1:https
0
192.168.0.5:37616
192.168.0.1:https
ESTAB
0
0
192.168.0.5:40114
192.168.0.1:https
ESTAB
0
0
192.168.0.5:54948
192.168.0.1:imap
...
#### Guided Exercises

1. A network engineer is asked to assign two IP addresses to the ens33 interface of a host, one IPv4 address (192.168.10.10/24) and one IPv6 address (2001:0:0:abcd:0:8a2e:0370:7334/64). What commands must they enter to achieve this?
2. Which addresses from the list below are private? 192.168.10.1 120.56.78.35 172.16.57.47 10.100.49.162 200.120.42.6
3. What entry would you add into the hosts file to assign 192.168.0.15 to example.com?
4. What effect would the following command have? sudo ip -6 route add default via 2001:db8:0:abcd::1
#### Explorational Exercises

1. Name the DNS record type used to serve the following requests: ◦ Textual data
◦ Reverse IP address lookup
◦ A domain that has no address of its own and relies on another domain for this information
◦ Mail Server
1. Linux has a feature called bridging, what does it do and how is it useful?
2. What option needs to be supplied to the ss command in order to view all established UDP sockets?
3. Which command shows a summary of all sockets running on a Linux device?
4. The following output is generated by the command from the previous exercise. How many TCP and UDP sockets are active? Total: 978 (kernel 0) TCP:
4 (estab 0, closed 0, orphaned 0, synrecv 0, timewait 0/0), ports 0
Transport Total
IP
IPv6
*
0
-
-
RAW
1
0
1
UDP
7
5
2
TCP
4
3
1
INET
12
8
4
FRAG
0
0
0
#### Summary

This topic covers networking your Linux computer. First we learned about the various levels of networking:
- The link layer which connects devices directly.
- The networking layer which provides routing between networks and a global address space.
- The application layer where applications connect to each other.
We have seen how IPv4 and IPv6 are used to address individual computers, and how TCP and UDP enumerate sockets used by applications to connect to each other. We also learned how DNS is used to resolve names to IP addresses. Commands used in the exercises:
**dig**
Query DNS information and provide verbose information about the DNS queries and responses.
**host**
Query DNS information and provide condensed output.
**ip**
Configure networking on Linux, including network interfaces, addresses and routing.
**ping**
Test the connectivity to a remote device.
**ss**
Show information regarding sockets.

### Answers

#### Guided Exercises

1. A network engineer is asked to assign two IP addresses to the ens33 interface of a host, one IPv4 address (192.168.10.10/24) and one IPv6 address (2001:0:0:abcd:0:8a2e:0370:7334/64). What commands must they enter to achieve this? sudo ip addr add 192.168.10.10/24 dev ens33 sudo ip addr add 2001:0:0:abcd:0:8a2e:0370:7334/64 dev ens33
2. Which addresses from the list below are private? 192.168.10.1
X
**120.56.78.35**
172.16.57.47
X
10.100.49.162
X
200.120.42.6
1. What entry would you add into the hosts file to assign 192.168.0.15 to example.com? 192.168.0.15
example.com
1. What effect would the following command have? sudo ip -6 route add default via 2001:db8:0:abcd::1
It would add a default route into the table that sends all IPv6 traffic to the router with an internal address of 2001:db8:0:abcd::1.

#### Explorational Exercises

1. Name the DNS record type used to serve the following requests: ◦ Textual data TXT ◦ Reverse IP address lookup PTR ◦ A domain that has no address of its own and relies on another domain for this information CNAME ◦ Mail Server MX
2. Linux has a feature called bridging, what does it do and how is it useful? A bridge connects multiple networking interfaces. All interfaces connected to a bridge can communicate as if they were connected to the same link layer network: All devices use IP addresses from the same subnet and do not require a router in order to connect to each other.
3. What option needs to be supplied to the ss command in order to view all established UDP sockets? The -u option shows all established UDP sockets.
4. Which command shows a summary of all sockets running on a Linux device? The ss -s command shows a summary of all sockets
5. The following output is generated by the command from the previous exercise. How many TCP and UDP sockets are active? Total: 978 (kernel 0) TCP:
4 (estab 0, closed 0, orphaned 0, synrecv 0, timewait 0/0), ports 0
Transport Total
**IP**
IPv6 * 0 - - RAW 1 0 1 UDP
7
TCP
4
5
2
3
1
INET
12
8
4
FRAG
0
0
0
11 TCP and UDP sockets are active.

# Security and File Permissions

## 5.1 Basic Security and Identifying User Types

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 5.1
**Weight:** 2
**Key knowledge areas**
- Root and standard users
- System users
**Partial list of the used files, terms and utilities**
- /etc/passwd, /etc/shadow, /etc/group
- id, last, who, w
- sudo, su

### 5.1 Lesson 1

#### Introduction

This lesson will focus on the basic terminology of the accounts, access controls and security of local Linux systems, the command line interface (CLI) tools in a Linux system for basic security access controls and the basic files to support user and group accounts, including those used for elementary privilege escalation. Basic security in Linux systems is modeled after Unix access controls that, despite being nearly fifty years-old, are quite effective in comparison to some popular consumer operating systems of much newer lineage. Even some other, popular, Unix-based operating systems tend to “take liberties” that are focused on “ease-of-access,” while Linux does not. Modern Linux desktop environments and interfaces simplify the creation and management of users and often automate the assignment of access controls when a user logs in — e.g., to the display, audio and other services — requiring virtually no manual system administrator intervention. However, it is important to understand the basic concepts of an underlying Linux operating system.
#### Accounts

Security involves many concepts, one of the most common being the general concept of access controls. Before one can tackle file access controls such as ownership and permissions, one must understand the basic concepts of Linux user accounts, which are broken out into several types. Every user on a Linux system has an associated account which besides login information (like username and password) also defines how, and where, the user can interact with the system. Privileges and access controls define the “boundaries” within which each user can operate.
**Identifiers (UIDs/GIDs)**
The User and Group Identifiers (UIDs/GIDs) are the basic, enumerated references to accounts. Early implementations were limited 16-bit (values 0 to 65535) integers, but 21st century systems support 64-bit UIDs and GIDs. Users and groups are enumerated independently, so the same ID can stand for both a user and group. Every user has not only an UID, but also a primary GID. The primary GID for a user can be unique to that user alone, and may end up not being used by any other users. However, this group could also be a group shared by numerous users. In addition to these primary groups, each user can be member of other groups, too. By default on Linux systems, every user is assigned to a group with the same name as their username, and same GID as his UID. E.g., create a new user named newuser and, by default, its default group is newuser as well.
**The Superuser Account**
On Linux the superuser account is root, which always has UID 0. The superuser is sometimes called the system administrator, and has unlimited access and control over the system, including other users. The default group for the superuser has the GID 0 and is also named root. The home directory for the superuser is a dedicated, top level directory, /root, only accessible by the root user himself.
**Standard User Accounts**
All accounts other than root are technically regular user accounts, but on a Linux system the colloquial term user account often means a “regular” (unprivileged) user account. They typically have the following properties, with select exceptions:
- UIDs starting at 1000 (4 digits), although some legacy systems may start at 500.
- A defined home directory, usually a subdirectory of /home, depending on the site-local configuration.
- A defined login shell. In Linux the default shell is usually the Bourne Again Shell (/bin/bash), though others may be available. If a user account does not have a valid shell in their attributes, the user will not be able to open an interactive shell. Usually /sbin/nologin is used as an invalid shell. This may be purposeful, if the user will only be authenticated for services other than console or SSH access, e.g., Secure FTP (sftp) access only.
**NOTE**
To avoid confusion, the term user account will only apply to standard or regular user accounts going forward. E.g., system account will be used to explain a Linux user account that is of the system user account type.
**System Accounts**
System accounts are typically pre-created at system installation time. These are for facilities, programs and services that will not run as the superuser. In an ideal world, these would all be operating system facilities. The system accounts vary, but their attributes include:
- UIDs are usually under 100 (2-digit) or 500-1000 (3-digit).
- Either no dedicated home directory or a directory that is usually not under /home.
- No valid login shell (typically /sbin/nologin), with rare exceptions.
Most system accounts on Linux will never login, and do not need a defined shell in their attributes. Many processes owned and executed by system accounts are forked into their own environment by the system management, running with the specified, system account. These accounts usually have limited or, more often than not, no privileges.
**NOTE**
From the standpoint of the LPI Linux Essentials, system accounts are UIDs <1000, with 2 or 3 digit UIDs (and GIDs).
In general, the system accounts should not have a valid login shell. The opposite would be a security issue in most cases.
**Service Accounts**
Service accounts are typically created when services are installed and configured. Similar to system accounts, these are for facilities, programs and services that will not run as the superuser.
In much documentation, system and service accounts are similar, and interchanged often. This includes the location of home directories typically being outside of /home, if defined at all (service accounts are often more likely to have one, compared to system accounts), and no valid login shell. Although there is no strict definition, the primary difference between system and service accounts breaks down to UID/GID.
**System account**
UID/GID <100 (2-digit) or <500-1000 (3-digit)
**Service account**
UID/GID >1000 (4+ digit), but not a “standard” or “regular” user account, an account for services, with an UID/GID >1000 (4+ digits) Some Linux distributions still have pre-reserved service accounts under UID <100, and those could be considered a system account as well, even though they are not created at system installation. E.g., on Fedora-based (including Red Hat) Linux distributions, the user for the Apache Web server has UID (and GID) 48, clearly a system account, despite having a home directory (usually at /usr/share/httpd or /var/www/html/).
**NOTE**
From the standpoint of the LPI Linux Essentials, system accounts are UIDs <1000, and regular user accounts are UIDs >1000. Since the regular user accounts are >1000, these UIDs can also include service accounts.
**Login Shells and Home Directories**
Some accounts have a login shell, while others do not for security purposes as they do not require interactive access. The default login shell on most Linux distributions is the Bourne Again Shell, or bash, but other shells may be available, like the C Shell (csh), Korn shell (ksh) or Z shell (zsh), to name a few. A user can change his login shell using the chsh command. By default the command runs in interactive mode, and displays a prompt asking which shell should be used. The answer should be the full path to the shell binary, like below:
```console
$ chsh
Changing the login shell for emma
Enter the new value, or press ENTER for the default
Login Shell [/bin/bash]: /usr/bin/zsh
```
You can also run the command in non-interactive mode, with the -s parameter followed by the
path to the binary, like so:
```console
$ chsh -s /usr/bin/zsh
```
Most accounts have a defined home directory. On Linux, this is usually the only location where that user account has guaranteed write access, with some exceptions (e.g., temporary file system areas). However, some accounts are purposely setup to not have any write access to even their own home directory, for security purposes.
#### Getting Information About Your Users

Listing basic user information is a common, everyday practice on a Linux system. In some cases, users will need to switch users and raise privilege to complete privileged tasks. Even users have the ability to list attributes and access from the command line, using the commands below. Basic information under limited context is not a privileged operation. Listing the current information of a user at the command line is as simple as a two letter command, id. The output will vary based on your login ID:
```console
$ id
uid=1024(emma) gid=1024(emma) 1024(emma),20(games),groups=10240(netusers),20480(netadmin)
context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```
In the preceding listing, the user (emma) has identifiers which breakdown as follows:
- 1024 = User ID (UID), followed by the username (common name aka login name) in
parenthesis.
- 1024 = the primary Group ID (GID), followed by the groupname (common name) in parenthesis.
- A list of additional GIDs (groupnames) the user also belongs to.
Listing the last time users have logged into the system is done with the command last:
```console
$ last
emma

pts/3

::1

reboot

system boot

5.0.17-300.fc30. Fri Jun 14 04:03

reboot

system boot

5.0.17-300.fc30. Wed Jun

5 14:32 - 15:19
```
(00:46)
reboot
system boot
5.0.17-300.fc30. Sat May 25 18:27 - 19:11
(00:43)
reboot
system boot
5.0.16-100.fc28. Sat May 25 16:44 - 17:06
(00:21)
reboot
system boot
5.0.9-100.fc28.x Sun May 12 14:32 - 14:46
(00:14)
**Fri Jun 14 04:28**
still logged in still running root
tty2
Fri May 10 21:55 - 21:55
(00:00)
...
The information listed in columns may vary, but some notable entries in the preceding listing are:
- A user (emma) logged in via the network (pseudo TTY pts/3) and is still logged in.
- The time of current boot is listed, along with the kernel. In the example above, about 25 minutes before the user logged in.
- The superuser (root) logged in via a virtual console (TTY tty2), briefly, in mid-May.
A variant of the last command is the lastb command, which lists all the last bad login attempts. The commands who and w list only the active logins on the system:
```console
$ who
emma

pts/3

2019-06-14 04:28 (::1)

$ w
05:43:41 up
```
USER
TTY
emma
pts/3
1:40,
1 user,
load average: 0.25, 0.53, 0.51
LOGIN@
IDLE
04:28
1:14m
JCPU
0.04s
PCPU WHAT
0.04s -bash
Both commands list some of the same information. For example, one user (emma) is logged in with a pseudo TTY device (pts/3) and the time of login is 04:28. The w command lists more information, including the following:
- The current time and how long the system has been up
- How many users are connected
- The load averages for the past 1, 5 and 15 minutes
And the additional information for each active user session.
- Select, total CPU utilization times (IDLE, JCPU and PCPU)
- The current process (-bash). The total CPU utilization time of that process is the last item ( PCPU). Both commands have further options to list various, additional information.
#### Switching Users and Escalating Privilege

In an ideal world, users would never need to escalate privilege to complete their tasks. The system would always “just work” and everything would be configured for various access. Luckily for us, Linux — out-of-the-box — works like this for most users who are not system administrators, despite always following the least privilege security model. However, there are commands that allow for privilege escalation when needed. Two of the most important ones are su and sudo. On most Linux systems today, the su command is only used for escalating privileges to root, which is the default user if a username is not specified after the command name. While it can be used to switch to another user, it is not good practice: users should login from another system, over the network, or physical console or terminal on the system. emma ~$ su Password: root ~#
After entering the superuser (root) password, the user has a superuser shell (notice the # at the end of the command prompt) and is, for all intents and purposes, the superuser (root). Sharing passwords is a very bad security practice, so there should be very few, if any, need for the su command in a modern Linux system. The dollar symbol ($) should terminate the command line prompt for a non-privileged user shell, while the pound symbol (#) should terminate the command line prompt for the superuser (root) shell prompt. It is highly recommend that final character of any prompt never be changed from this “universally understood” standard, since this nomenclature is used in learning materials, including these.
**WARNING**
Never switch to the superuser (root) without passing the login shell (-) parameter. Unless explicitly instructed otherwise by the OS or software vendor when su is required, always execute su - with extremely limited exceptions. User environments may cause undesirable configuration changes and issues when used in full privilege mode as superuser.
What is the biggest issue with using su to switch to the superuser (root)? If a regular user’s session has been compromised, the superuser (root) password could be captured. That’s where “Switch User Do” (or “Superuser Do”) comes in:
```console
$ cat /sys/devices/virtual/dmi/id/board_serial
cat: /sys/devices/virtual/dmi/id/board_serial: Permission denied
$ sudo cat /sys/devices/virtual/dmi/id/board_serial
[sudo] password for emma:
/6789ABC/
```
In the preceding listing, the user is attempting to look up the serial number of their system board. However, the permission is denied, as that information is marked privileged. However, using sudo, the user enters his own password to authenticate who he is. If he has been authorized in the sudoers configuration to run that command with privilege, with the options allowed, it will work.
**TIP**
By default, the first authorized sudo command will authenticate subsequent sudo commands for a (very short) period of time. This is configurable by the system administrator.
#### Access Control Files

Nearly all operating systems have a set of places used to store access controls. In Linux these are typically text files located under the /etc directory, which is where system configuration files should be stored. By default, this directory is readable by every user on the system, but writable only by root. The main files related to user accounts, attributes and access control are: /etc/passwd This file stores basic information about the users on the system, including UID and GID, home directory, shell, etc. Despite the name, no passwords are stored here. /etc/group This file stores basic information about all user groups on the system, like group name and GID and members. /etc/shadow This is where user passwords are stored. They are hashed, for security. /etc/gshadow This file stores more detailed information about groups, including a hashed password which lets users temporarily become a member of the group, a list of users who can become a
member of the group at and time and a list of group administrators. These files are not designed to and should never be edited directly. This lesson only covers the information stored in these files, and not editing these files.
**WARNING**
By default, every user can enter /etc and read the files /etc/passwd and /etc/group. And also by default no user, except root, may read the files /etc/shadow or /etc/gshadow. There are also files involved with basic privilege escalation on Linux systems, like on the commands su and sudo. By default, these are only accessible by the root user. /etc/sudoers This file controls who can use the sudo command, and how. /etc/sudoers.d This directory may contain files that supplement the settings on the sudoers file. From the standpoint of the LPI Linux Essentials exam, just know the path and filename of the default sudo configuration file, /etc/sudoers. Its configuration is beyond the scope of these materials. Even though /etc/sudoers is a text file, it should never be edited directly. If any changes to its contents are needed, they should be made using the visudo utility.
**WARNING**
**/etc/passwd**
The file /etc/passwd is commonly referred to as the “password file”. Each line contains multiple fields always delimited by a colon (:). Despite the name, the actual one-way password hash is nowadays not stored in this file. The typical syntax for a line on this file is: USERNAME:PASSWORD:UID:GID:GECOS:HOMEDIR:SHELL
Where: USERNAME The username aka login (name), like root, nobody, emma.
**PASSWORD**
Legacy location of the password hash. Almost always x, indicating that the password is stored in the file /etc/shadow.
**UID**
User ID (UID), like 0, 99, 1024.
**GID**
Default Group ID (GID), like 0, 99, 1024.
**GECOS**
A CSV list of user information including name, location, phone number. For example: Emma Smith,42 Douglas St,555.555.5555
**HOMEDIR**
Path to the user’s home directory, like /root, /home/emma, etc.
**SHELL**
The default shell for this user, like /bin/bash, /sbin/nologin, /bin/ksh, etc. For example, the following line describes the user emma: emma:x:1000:1000:Emma Smith,42 Douglas St,555.555.5555:/home/emma:/bin/bash
**Understanding the GECOS Field**
The GECOS field contains three (3) or more fields, delimited by a comma (,), aka a list of Comma Separated Values (CSV). Although there is no enforced standard, the fields are usually in the following order: NAME,LOCATION,CONTACT
Where: NAME is the user’s “Full Name”, or the “Software Name” in the case of a service account. LOCATION is usually the user’s physical location within a building, room number or the contact
department or person in the case of a service account. CONTACT lists contact information such as home or work telephone number. Additional fields may include additional contact information, such as a home number or e-mail address. To change the information on the GECOS field, use the chfn command and answer the questions, like below. If no username is provided after the command name, you will change information for the current user:
```console
$ chfn
Changing the user information for emma
Enter the new value, or press ENTER for the default
Full Name: Emma Smith
Room Number []: 42
Work Phone []: 555.555.5555
Home Phone []: 555.555.6666

/etc/group
```
The /etc/group file contains fields always delimited by a colon (:), storing basic information about the groups on the system. It is sometimes called the “group file”. The syntax for each line is: NAME:PASSWORD:GID:MEMBERS
Where: NAME is the group name, like root, users, emma, etc. PASSWORD legacy location of an optional group password hash. Almost always x, indicating that the password (if defined) is stored in the file /etc/gshadow. GID Group ID (GID), like 0, 99, 1024. MEMBERS a comma-separated list of usernames which are members of the group, like jsmith,emma.
The example below shows a line containing information about the students group: students:x:1023:jsmith,emma
The user does not need to be listed in the members field when the group is the primary group for a user. If a user is listed, then it is redundant — i.e., there is no change in functionality, listed or not.
**NOTE**
Use of passwords for groups are beyond the scope of this section, however if defined the password hash is stored in the file /etc/gshadow. This is also beyond the scope of this section.
**/etc/shadow**
The following table lists the attributes stored in the file /etc/shadow, commonly referred to as the “shadow file”. The file contains fields always delimited by a colon (:). Although the file has many fields, most are beyond the scope of this lesson, other than the first two. The basic syntax for a line on this file is: USERNAME:PASSWORD:LASTCHANGE:MINAGE:MAXAGE:WARN:INACTIVE:EXPDATE
Where:
**USERNAME**
The username (same as /etc/passwd), like root, nobody, emma.
**PASSWORD**
A one-way hash of the password, including !$1$01234567$ABC…, $6$012345789ABCDEF$012….
preceding
salt.
For
!!,
example:
**LASTCHANGE**
Date of the last password change in days since the “epoch”, such as 17909.
**MINAGE**
Minimum password age in days.
**MAXAGE**
Maximum password age in days.
**WARN**
Warning period before password expiration, in days.
**INACTIVE**
Maximum password age past expiration, in days.
**EXPDATE**
Date of password expiration, in days since the “epoch”. In the example below you can see a sample entry from the /etc/shadow file. Note that some values, like INACTIVE and EXPDATE are undefined. emma:$6$nP532JDDogQYZF8I$bjFNh9eT1xpb9/n6pmjlIwgu7hGjH/eytSdttbmVv0MlyTMFgBIXESFNUmTo9EGxxH1 OT1HGQzR0so4n1npbE0:18064:0:99999:7:::
The “epoch” of a POSIX system is midnight (0000), Universal Coordinate Time (UTC), on Thursday, January 1st, 1970. Most POSIX dates and times are in either seconds since “epoch”, or in the case of the file /etc/shadow, days since “epoch”.
**NOTE**
The shadow file is designed to be only readable by the superuser, and select, core system authentication services that check the one-way password hash at login or other authentication-time.
Although different authentication solutions exist, the elementary method of password storage is the one-way hash function. This is done so the password is never stored in clear-text on a system, as the hashing function is not reversible. You can turn a password into a hash, but (ideally) it is not possible to turn a hash back into a password. At most, a brute force method is required to hash all combinations of a password, until one matches. To mitigate the issue of a password hash being cracked on one system, Linux systems use a random “salt” on each password hash for a user. So the hash for a user password on one Linux system will usually not be the same as on another Linux system, even if the password is the same. In the file /etc/shadow, the password may take several forms. These forms typically include the following: !! This means a “disabled” account (no authentication possible), with no password hash stored. !$1$01234567$ABC… A “disabled” account (due to the initial exclamation mark), with a prior hash function, hash salt
and hash string stored. $1$0123456789ABC$012… An “enabled” account, with a hash function, hash salt and hash string stored. The hash function, hash salt and hash string are preceded and delimited by a dollar symbol ($). The hash salt length must be between eight and sixteen (8-16) characters. Examples of the three most common are as follows: $1$01234567$ABC… A hash function of MD5 (1), with an example hash length of eight. $5$01234567ABCD$012… A hash function of SHA256 (5), with an example hash length of twelve. $6$01234567ABCD$012… A hash function of SHA512 (6), with an example hash length of twelve.
**NOTE**
The MD5 hash function is considered cryptographically insecure with today’s (2010s and later) level of ASIC and even general computing SIMD performance. E.g., the US Federal Information Processing Standards (FIPS) does not allow MD5 to be used for any cryptographic functions, only very limited aspects of validation, but not the integrity of digital signatures or similar purposes.
From the standpoint of the LPI Linux Essentials objectives and exam, just understand the password hash for a local user is only stored in the file /etc/shadow which only select, authentication services can read, or the superuser can modify via other commands.
#### Guided Exercises

1. Consider the following output of the id command: $ id emma uid=1000(emma) gid=1000(emma) groups=1000(emma),4(adm),5(tty),10(uucp),20(dialout),27(sudo),46(plugdev)
In which files are the following attributes stored? UID and GID Groups ◦ Additionally, in which file is the user password stored?
1. Which of the following types of cryptography is used by default to store passwords locally on a Linux system? ◦ Asymmetric ◦ One-way Hash ◦ Symmetric ◦ ROT13
2. If an account has a User ID (UID) enumerated under 1000, what type of account is this?
3. How can you get a list of the active logins in your system, and a count of them as well?
4. Using the grep command, we got the result below with information about the user emma. $ grep emma /etc/passwd emma:x:1000:1000:Emma Smith,42 Douglas St,555.555.5555,:/home/emma:/bin/ksh
Fill in the blanks of the chart with the appropriate information using the output of the previous command.
Username Password
**UID**
Primary GID
**GECOS**
Home Directory Shell
#### Explorational Exercises

1. Compare the results of last to w and who. What details are missing from each of the commands compared to one another?
2. Try issuing the commands who and w -his. ◦ What information has been removed from the output of the w command with the “no header” (-h) and “short” (-s) options?
◦ What information has been added in the output the w command with the “ip address” (-i) option?
1. Which file is the file that stores a user account’s one-way password hash?
2. Which file contains the list of groups a user account is a member of? What logic could be used to compile a list of a groups a user account is a member of?
3. One or more (1+) of the following files are not readable by regular, unprivileged users, by default. Which ones? ◦ /etc/group ◦ /etc/passwd ◦ /etc/shadow ◦ /etc/sudoers
4. How would you change the current user’s login shell to the Korn Shell (/usr/bin/ksh) in noninteractive mode?
5. Why is the home directory of the root user not placed within /home directory?
#### Summary

In this lesson we have discovered the Linux user and group databases. We have learned the most important properties of users and groups, including their names and their numeric IDs. We have also investigated how password hashing works on Linux and how users are assigned to groups. All of this information is stored in the following four files, which provide the most basic, local security access controls on a Linux system: /etc/passwd All system-local user account POSIX attributes, other than password hash, readable by all. /etc/group All system-local group account POSIX attributes, readable by all. /etc/shadow All system-local user password hashes (and expiration information), unreadable by any (only select processes). /etc/sudoers All system-local privilege escalation information/allowance by the sudo command. The following commands were discussed in this lesson:
**id**
List real (or effective) user and group IDs.
**last**
List users who logged in last.
**who**
List users who are currently logged in.
**w**
Similar to who but with additional context.
**su**
Switch to another user with a login shell, or run commands as that user, by passing that user’s password.
**sudo**
Switch User (or Superuser) Do, if entitled, the current user enters their own password (if required) to raise privilege.
**chsh**
Change a user’s shell.
**chfn**
Change the user’s information on the GECOS field.

### Answers

#### Guided Exercises

1. Consider the following output of the id command: $ id emma uid=1000(emma) gid=1000(emma) groups=1000(emma),4(adm),5(tty),10(uucp),20(dialout),27(sudo),46(plugdev)
In which files are the following attributes stored? UID and GID
/etc/passwd
Groups
/etc/group
◦ Additionally, in which file is the user password stored? The hashed user password is stored in /etc/shadow.
1. Which of the following types of cryptography is used by default to store passwords locally on a Linux system? By default, a one-way hash is used to store passwords.
2. If an account has a User ID (UID) enumerated under 1000, what type of account is this? Accounts with a UID lower than 1000 generally are system accounts.
3. How can you get a list of the active logins in your system, and a count of them as well? Use the w command. Besides a list of all active logins, it will also show information like how many users are logged in, along the system load and uptime.
4. Using the grep command, we got the result below with information about the user emma. $ grep emma /etc/passwd emma:x:1000:1000:Emma Smith,42 Douglas St,555.555.5555,:/home/emma:/bin/ksh
Fill in the blanks of the chart with the appropriate information using the output of the previous command. Username
emma
**Password**
x - should always be x for a valid, active user login UID 1000 Primary GID 1000 GECOS Emma Smith,42 Douglas St,555.555.5555 Home Directory /home/emma Shell /bin/ksh

#### Explorational Exercises

1. Compare the results of last to w and who. What details are missing from each of the commands compared to one another? The w and who tools only list current users logged into the system, whereas last also lists users that have disconnected. The w command lists system utilization, while who does not.
2. Try issuing the commands who and w -his. ◦ What information has been removed from the output of the w command with the “no header” (-h) and “short” (-s) options? The header is not printed, which is useful for parsing, and the login time and select CPU information is not listed, respectively. ◦ What information has been added in the output the w command with the “ip address” (-i) option? This prints the IP address, instead of attempting DNS resolution, printing the hostname. This option to w better matches the default output of the last command.
3. Which file is the file that stores a user account’s one-way password hash? The file /etc/shadow stores a user account’s one-way password hash, since it is not readable by a regular, unprivileged user account, unlike file /etc/passwd.
4. Which file contains the list of groups a user account is a member of? What logic could be used to compile a list of a groups a user account is a member of? The file /etc/group has a CSV list of usernames in the last field, “members”, of any line for a group. Any line in the file /etc/group where the user is listed in the final field, “members”, would mean the user is a member of that group — assuming it is correctly formatted (CSV delimited). Additionally, the user’s primary group membership in the /etc/passwd file will also have a matching entry in the /etc/group file for both the group name and GID.
5. One or more (1+) of the following files are not readable by regular, unprivileged users, by default. Which ones? ◦ /etc/group ◦ /etc/passwd
**◦ /etc/shadow**
◦ /etc/sudoers The files /etc/shadow and /etc/sudoers are not readable by default, except by select services or the superuser. These answers will be customized, based on the systems and usernames used in the laboratory.
1. How would you change the current user’s login shell to the Korn Shell (/usr/bin/ksh) in noninteractive mode? $ chsh -s /usr/bin/ksh
2. Why is the home directory of the root user not placed within /home directory? Because the root account is required to troubleshoot and fix errors, which might include file system issues related to the /home directory. In such cases, root should be fully functional even when the /home file system is not available yet.
