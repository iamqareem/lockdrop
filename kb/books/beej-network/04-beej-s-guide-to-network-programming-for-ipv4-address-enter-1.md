---
id: beej-network-04
title: "Beej's Guide to Network Programming — For “IPv4 Address”, enter 192.168.0.2., In the command prompt…"
slug: beej-network-04-beej-s-guide-to-network-programming-for-ipv4-address-enter-1
source: "Beej's Guide to Network Programming"
sourceSection: "4. For “IPv4 Address”, enter 192.168.0.2., 3. In the command prompt, type ping 192.168.0.3., 1. Let’s choose a random root server, say c.root-servers.net. We’ll contact it and say, “Hey, we’re, 2. So we choose one of the .com name servers., 3. So we choose one of those servers., 2. You need more IP "
track: networking-dns
tier: premium
tags: [network-programming, sockets, c, tcp-ip]
summary: "Click on PC1 and do the same steps, except enter 192.168.0.3 for the IP address. Covers 7 sections: For “IPv4 Address”, enter 192.168.0.2., In the command prompt, type ping 192.168.0.3., Let’s choose a random root server."
---
# Beej's Guide to Network Programming — For “IPv4 Address”, enter 192.168.0.2., In the command prompt…

## 4. For “IPv4 Address”, enter 192.168.0.2.

### 25.4 Pinging Across the Network

Figure 25.5: Two PCs wired up
5. For “Subnet Mask”, enter 255.255.255.0.
Close the configuration window.
Click on PC1 and do the same steps, except enter 192.168.0.3 for the IP address. Close the configuration
window when you’re done.

### 25.4 Pinging Across the Network
Let’s ping from PC0 to PC1 to make sure the network is connected.
1. Click on PC0. Select the “Desktop” tab.
2. Click on “Command Prompt”.
## 3. In the command prompt, type ping 192.168.0.3.
When you ping, the first ping might timeout because ARP needs to do its work first. In more
complex networks, multiple pings might timeout before getting through.
You should see successful ping output:
C:\>ping 192.168.0.3
Pinging 192.168.0.3 with 32 bytes of data:
Ping statistics for 192.168.0.3:
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
Minimum = 0ms, Maximum = 0ms, Average = 0ms

If you see Request timed out. more than twice, something is misconfigured.

### 25.5 Saving the Project
Be sure to save the project. This will save a file with .pkt extension.

Chapter 25. Project: Packet Tracer: Connect Two Computers

Chapter 26

Project: Packet Tracer: Using a Switch
It’s not typical to wire two PCs directly together. Usually they’re connected through a switch.
Let’s set that up in the lab.

### 26.1 Add Some PCs
Choose “End Devices” in the lower left, and drag three PCs onto the workspace.
Click on each in turn, going to their “Config” tabs for their FastEthernet0 devices and giving them IP
addresses:
- PC0: 192.168.0.2
- PC1: 192.168.0.3
- PC2: 192.168.0.4
They should all use subnet mask 255.255.255.0.

### 26.2 Add a Switch
Click on “Network Devices” in the lower left. The bottom left row of icons will change.
Select “Switches”, second left on bottom row. The middle panel will change.
Drag a 2960 switch onto the workspace.
If you click on the switch and look under the “Physical” tab, you’ll see the switch is a device with a lot
of Ethernet ports on it. (This is a pretty high-end switch. Home switches typically have 4 or 8 ports. The
back of your WiFi router at home probably has 4 ports like this–that’s a switch built into it!)
We can connect PCs to these ports and they’ll be able to talk to one another.

### 26.3 Wire It Up
None of the PCs will be directly connected. They’ll all connect directly to the switch.
We don’t use crossover cables here; the switch knows what it’s doing.
Note that when you first wire up the LAN, you might not have two green up arrows shown on the
connection. One or both of them might be orange circles indicating the link is in the process of
coming up. You can hit the >> fast-forward button in the lower left to jump ahead in time until you
get two green up arrows.
Choose the “Connections” selector in the lower left.
Choose the “Copper Straight-Through” cable. (The icon will change to an “anti” symbol.)

Chapter 26. Project: Packet Tracer: Using a Switch

Click on PC0, then select FastEthernet0.
Click on the switch, then select any FastEthernet0 port.
Do the same for the other 2 PCs.

### 26.4 Test Pings!
Click on one of the PCs and go to the “Desktop” tab and run a Command Prompt. Make sure you can
ping the other two PCs.

Chapter 27

Project: Packet Tracer: Using a Router
We’re going to add a router between two independent networks in Packet Tracer.
The goal will be something that looks like this:

Figure 27.1: Single Router, Two Networks

### 27.1 Build the LANs
First of all, build two separate LANs. Each will have three PCs and a 2960 switch like before.
The left subnet will be 192.168.0.0/24. The right subnet will be 192.168.1.0/24.
Assign the left PCs the IP addresses on their FastEthernet0 interfaces:
- 192.168.0.2
- 192.168.0.3
- 192.168.0.4
Assign the right PCs the IP addresses on their FastEthernet0 interfaces:
- 192.168.1.2
- 192.168.1.3
- 192.168.1.4
All of them have subnet mask 255.255.255.0.

Chapter 27. Project: Packet Tracer: Using a Router

Connect the left PCs to one switch on any unused FastEthernet ports. Connect the right PCs to the
other switch in the same way.
At this point, you should have two separate LANs.
Hit the fast-forward button if all the links aren’t green yet. If they stay red, something is wrong–doublecheck your settings.
For sanity, make sure 192.168.0.2 can ping the other two machines on its LAN. And make sure
192.168.1.3 can ping the other two machines on its LAN.

### 27.2 Adding a Router
The router is going to route traffic between these two networks.
Click the “Network Devices” icon in the lower left. Then click “Routers” in the bottom left. Then drag a
4331 router in between the two.
This router is going to be connected to both switches. Each “side” of the router will have a different IP
address.
We’re going to connect some wires here, but the link won’t come up yet. We’ll deal with that in a minute.
On the switch on LAN 192.168.0.0/24, use a Copper Straight-Through connector to connect the
switch’s GigabitEthernet0/1 port to the router’s GigabitEthernet0/0/0 port.
On the switch on LAN 192.168.1.0/24, use the same type of connector to connect the switch’s
GigabitEthernet0/1 port to the router’s GigabitEthernet0/0/1 port.
Note this is a different port on the router than the other switch is connected to! Both switches are plugged
into different ports on the router.
We have the hardware in place now, but we don’t yet have any IP addresses assigned on the router. So
let’s do that.
In the “Config” for the router, choose the GigabitEthernet0/0/0 interface and give it the IP address
192.168.0.1–it’s now part of the 192.168.0.0/24 subnet. While you’re here, click the “On” checkbox
to power the port. This should bring up the connection and get you the green arrows.
Then go to the GigabitEthernet0/0/1 interface and give it the IP address 192.168.1.1–it’s now part
of the 192.168.1.0/24 subnet. While you’re here, click the “On” checkbox to power the port.
Let’s try pinging the router. Go to any PC on the 192.168.0.0/24 LAN and trying pinging 192.168.0.1
(the router). It should reply.
Then go to any PC on the 192.168.1.0/24 subnet and try pinging 192.168.1.1. It should reply.
Now the ultimate test: get a console on PC 192.168.0.2 and try to ping 192.168.1.2 on the other
subnet!
It… doesn’t work!
Why?

### 27.3 Adding a Default Route
All the computers need to know two things:
- What the LAN’s subnet number is so it knows to route local traffic on the LAN.
- A default gateway, the computer on the LAN that should get traffic for destinations outside the
LAN.
We’ve put the subnet in, but not the default gateway.
For all the PCs on the 192.168.0.0/24 subnet, go into the “Config”, then choose the “Global” sidebar
item. Enter 192.168.0.1 (the router!) in the “Default Gateway” field.

### 27.4 Try It Out!

Do the same for all the PCs on the other subnet, except enter 192.168.1.1 as the default gateway.

### 27.4 Try It Out!
Now you should be able to ping any PC from any other PC!
If you can’t, try pinging just on one LAN to make sure it works. And ping the router on that LAN to make
sure that works.

Chapter 27. Project: Packet Tracer: Using a Router

Chapter 28

Project: Packet Tracer: Multiple
Routers
In the last Packet Tracer project, we had a single router between two subnets. In this project, we’ll have
multiple routers between subnets.
This complicates matters, because each router’s routing table needs to be edited so that it knows out which
connection to forward packets.
In a larger LAN, a gateway protocol could be used to quickly distribute the information the routers needed.
But in our case, to keep it conceptually simple, we’ll just manually configure the routes in each of the
three routers we’ll have.

### 28.1 What We’re Building
FIVE subnets!
- Three of them are LANs:
- 192.168.0.0/24
- 192.168.1.0/24
- 192.168.2.0/24
- Two of them exist between routers:
- 10.0.0.0/16
- 10.1.0.0/16
And here’s a picture of it:

### 28.2 Drag Out the Components
We’ll need:
- 2 PCs per LAN, so 6 PCs total
- 3 2960 switches
- 3 4331 routers
Each LAN is connected to one router.
Two of the routers also connect to another router.
But, and this is the fun bit, the middle router is connected to two routers and another LAN!
Put straight-through copper connections between the components as shown in the diagram, above.

Chapter 28. Project: Packet Tracer: Multiple Routers

Figure 28.1: Multiple Routers Network Diagram

### 28.3 Setting Up the Middle Router
That router in the middle that connects to two other routers and a LAN? It doesn’t come with enough ports
by default. We need to add one.
Luckily this is a virtual simulation, so you’re allowed to simulate virtual payment for the new components
and won’t have to open your real wallet.
Select that router and go to the “Physical” tab.
Click “Zoom In” to get a better view.
The power switch is on the right side. Scroll over there and click it. (You can’t add components until you
power it down.)
Two of the Ethernet connectors are in the upper left. Just right of those, there are two more ports that we
can plug components into.
From the left sidebar, drag a “GLC-T” into the lower one of those ports (apparently it doesn’t work in the
upper one), as shown below:
Then power the router back on.

### 28.4 Set up the Three LAN Subnets
Use these subnet numbers:
- 192.168.0.0/24
- 192.168.1.0/24
- 192.168.2.0/24
By convention, routers often are the .1 on their subnet, e.g. 192.168.2.1. This isn’t a requirement.
Assign the 2 PCs and 1 of the routers IP addresses on the subnet. Connect them all to a switch.
Make sure the correct Ethernet port on the router has been set “On” in its config!
Sanity check: all computers on a subnet should be able to ping each other and their router.

### 28.5 Set the Default Gateway on All PCs

Figure 28.2: Adding a GLC-T component

### 28.5 Set the Default Gateway on All PCs
Remember that when PCs send out traffic, they either know they’re sending it on the LAN (because the
destination is on the same LAN), or they don’t know where the IP is. If they don’t recognize the IP as
being on the same subnet, they send the traffic to their default gateway, i.e. the router that knows what to
do with it.
Click on each PC in turn. Under “Config” in sidebar “Global/Settings”, set a static “Default Gateway” of
that LAN’s router IP.
For example, if I’m on PC 192.168.1.2 and my router on that LAN is 192.168.1.1, I’ll set the PC’s
default gateway to 192.168.1.1.
In fact, I’ll set the default gateway for all the PCs on the LAN to that value.
Do the same for the other two LANs.

### 28.6 Setting Up the Router Subnets
In order to route properly, we need one subnet between the left and middle router, and another between
the middle and right.
Use these subnets:
- 10.0.0.0/16
- 10.1.0.0/16
This means the left and right routers will have TWO IP addresses because they’re attached to two subnets.
But the middle router will have THREE IP addresses because it’s attached to three subnets! (i.e. attached
to one LAN, and attached to two other routers.
Connect the subnets with copper straight-through connectors if you haven’t done so already..

Chapter 28. Project: Packet Tracer: Multiple Routers

### 28.7 Setting Up the Routing Tables
We’re almost there, but if you’re on 192.168.0.2 and you try to ping 192.168.1.2, the traffic won’t
get through.
This is because the router on subnet 192.168.0.0/24 doesn’t know where to send so that it arrives at
192.168.1.2.
We have to put that in.
We’re going to manually add “static routes” to each of the routers so that they know where to send things.
As mentioned earlier, in real-life LANs, it would be more common to use gateway protocols to automatically get these routing tables set up.
But this is a lab–what would the fun be in that? (Actually it would be a very useful exercise, but this one
is usefuller as an introduction.)
Let’s look at the network diagram again:

Figure 28.3: Multiple Routers Network Diagram
If a packet destined for 192.168.1.2 (on the right) leaves from 192.168.0.3 on the left, how does it
get there?
We can see it must travel through all three routers. But when it arrives at the first one at 192.168.0.1
(the router for the LAN), where does that router send it?
Well, from there, we’ll head out on the 10.0.0.0/16 subnet to router 10.0.0.2.
So we have to add a route for the leftmost router saying, “Hey, if you get anything for subnet
192.168.0.0/24, forward it to 10.0.0.2 because that’s the next hop on the way.”
We do this by clicking on the leftmost router, then going to “Config”, and “Routing/Static” in the left
sidebar.
The “Network” and “Mask” fields are the destination, and “Next Hop” is the router we should forward
that traffic to.
In the case of the diagram, we’d add a route to the leftmost router like so (recalling that a \24 network
has netmask 255.255.255.0):
Network: 192.168.1.0
Mask:
Next Hop: 10.0.0.2

### 28.8 Test It Out!

And that gets us partway there! But, sadly and importantly, that middle router doesn’t know where to send
traffic for 192.168.1.0/24, either.
So we have to add a route to that middle router that sends it on the next hop, but this time out its
10.1.0.0/16 interface:
Network: 192.168.1.0
Mask:
Next Hop: 10.1.0.2

And now we’re there! The router with IP 10.1.0.2 has an interface that is connected to 192.168.1.0/24.
Our original packet is going to 192.168.1.2, and that’s on the same subnet! The router knows it can just
send the traffic out on that interface.
Of course, that’s not all we have to do.
Add routing table entries for all the non-directly-connected subnets to each router.
Each router should have two static routing table entries so that all inbound and outbound traffic is covered.

### 28.8 Test It Out!
If it’s all configured correctly, you should be able to ping any PC from any other PC! The routers forward
the traffic to the other LANs!

Chapter 28. Project: Packet Tracer: Multiple Routers

Chapter 29

Select
In this chapter we’re taking a look at the select() function. This is a function that looks at a whole set
of sockets and lets you know which ones have sent you data. That is, which ones are ready to call recv()
on.
This enables us to wait for data on a large number of sockets at the same time.

### 29.1 The Problem We’re Solving
Let’s say the server is connected to three clients. It wants to recv() data from whichever client sends it
next.
But the server has no way of knowing which client will send data next.
In addition, when the server calls recv() on a socket with no data ready to read, the recv() call blocks,
preventing anything else from running.
To block means that the process will stop executing here and goes to sleep until some condition is
met. In the case of recv(), the process goes to sleep until there’s some data to receive.
So we have this problem where if we do something like this:
data1 = s1.recv(4096)
data2 = s2.recv(4096)
data3 = s3.recv(4096)

but there’s no data ready on s1, then the process will block there and not call recv() on s2 or s3 even if
there’s data to be received on those sockets.
We need a way to monitor s1, s2, and s3 at the same time, determine which of them have data ready to
receive, and then call recv() only on those sockets.
The select() function does this. Calling select() on a set of sockets will block until one or more of
those sockets is ready-to-read. And then it returns to you which sockets are ready and you can call recv()
specifically on those.

### 29.2 Using select()
First of all, you need the select module.
import select

If you have a bunch of connected sockets you want to test for being ready to recv(), you can add those
to a set() and pass that to select(). It will block until one is ready to read.

Chapter 29. Select

This set can be used as your canonical list of connected sockets. You need to keep track of them all
somewhere, and this set is a good place. As you get new connections, you add them to the set, and as the
connections hang up, you remove them from the set. In this way, it always holds the sockets of all the
current connections.
Here’s an example. select() takes three arguments and return three values. We’ll just look at the first
of each of these for now, ignoring the other ones.
read_set = {s1, s2, s3}
ready_to_read, _, _ = select.select(read_set, {}, {})

At this point, we can go through the sockets that are ready and receive data.
for s in ready_to_read:
data = s.recv(4096)

### 29.3 Using select() with Listening Sockets
If you’ve been looking closely, you might have the following question: if the server is blocked on a
select() call waiting for incoming data, how can it also call accept() to accept incoming connections?
Won’t the incoming connections have to wait? Furthermore, accept() blocks… how will we get back to
the select() if we’re blocked on that?
Fortunately, select() provides us with an answer: you can add a listening socket to the set! When the
listening socket shows up as “ready-to-read”, it means there’s a new incoming connection to accept().

### 29.4 The Main Algorithm
Putting it all together, we get the core of any main loop that uses select():
add the listener socket to the set
main loop:
call select() and get the sockets that are ready to read
for all sockets that are ready to read:
if the socket is the listener socket:
accept() a new connection
add the new socket to our set!
else the socket is a regular socket:
recv() the data from the socket
if you receive zero bytes
the client hung up
remove the socket from tbe set!

### 29.5 What About Those Other Arguments to select()?
select() actually takes three arguments. (Though for this project we only need to use the first one, so

this section is purely informational.)
They correspond to:

### 29.6 Using select() with send()

- Which sockets you want to monitor for ready-to-read
- Which sockets you want to monitor for ready-to-write
- Which sockets you want to monitor for exception conditions
And the return values map to these, as well.
read, write, exc = select.select(read_set, write_set, exc_set)

But again, for this project, we just use the first and ignore the rest.
read, _, _ = select.select(read_set, {}, {})

#### 29.5.1 The Timeout
I told a bit of a lie. There’s an optional fourth arguments, the timeout. It’s a floating point number of
seconds to wait for an event to occur; if nothing occurs in that timeframe, select() returns and none of
the returned sockets are shown as ready.
You can also specify a timeout of 0 if you want to just poll the sockets.

### 29.6 Using select() with send()
If your computer tries to send too much too fast, the call to send() might block. That is, the OS will have
it sleep while it processes the backlog of data to be sent.
But let’s say you really don’t want to have the call block and want to keep processing.
You can query with select() to make sure a socket won’t block with a send() call by passing a set
containing the socket descriptor as the second argument.
And it’ll work in much the same way as the “ready to read” set works, above.

### 29.7 Reflect
- Why can’t we just call recv() on all the connected sockets? What does select() buy us?
- When select() shows a socket “ready-to-read”, what does it mean if the socket is a listening
socket versus a non-listening socket?
- Why do we have to add the listener socket to the set, anyway? Why not just call accept() and
then call select()?

Chapter 29. Select

Chapter 30

Project: Using Select
In this project we’re going to write a server that uses select() to handle multiple simultaneous connections.
The client is already provided. You fill in the server.

### 30.1 Demo Code
Grab this ZIP file1 with all the input files.
The select_client.py file is already complete.
You have to fill in the select_server.py file to get it going.

### 30.2 Features to Add
Your server should do the following:
- When a client connects, the server prints out the client connection info in this form (it’s the client
IP and port number in front):
('127.0.0.1', 61457): connected

- When a client disconnects, the server prints out the late client’s connection info in this form:
('127.0.0.1', 61457): disconnected

Hint: You can use the .getpeername() method on a socket to get the address of the remote side
even after it has disconnected. It’ll come back as a tuple containing ("host", port), just like what
you pass to connect().
- When a client sends data, the server should print out the length of the data as well as the raw
bytestring object received:
('127.0.0.1', 61457) 22 bytes: b'test1: xajrxttphhlwmjf'

### 30.3 Example Run
Running the server:

https://beej.us/guide/bgnet0/source/exercises/select/select.zip

Chapter 30. Project: Using Select

python select_server.py 3490

Running the clients:
python select_client.py alice localhost 3490
python select_client.py bob localhost 3490
python select_client.py chris localhost 3490

The first argument to the client can be any string–the server prints it out with the data to help you identify
which client it came from.
Example output:
waiting for connections
('127.0.0.1', 61457): connected
('127.0.0.1', 61457) 22 bytes: b'test1: xajrxttphhlwmjf'
('127.0.0.1', 61457) 22 bytes: b'test1: geqtgopbayogenz'
('127.0.0.1', 61457) 23 bytes: b'test1: jquijcatyhvfpydn'
('127.0.0.1', 61457) 23 bytes: b'test1: qbavdzfihualuxzu'
('127.0.0.1', 61457) 24 bytes: b'test1: dyqmzawthxjpkgpcg'
('127.0.0.1', 61457) 23 bytes: b'test1: mhxebjpmsmjsycmj'
('127.0.0.1', 61458): connected
('127.0.0.1', 61458) 23 bytes: b'test2: bejnrwxftgzcgdyg'
('127.0.0.1', 61457) 24 bytes: b'test1: ptcavvhroihmgdfyw'
('127.0.0.1', 61458) 24 bytes: b'test2: qrumcrmqxauwtcuaj'
('127.0.0.1', 61457) 26 bytes: b'test1: tzoitpusjaxljkfxfvw'
('127.0.0.1', 61457) 17 bytes: b'test1: mtcwokwquc'
('127.0.0.1', 61458) 18 bytes: b'test2: whvqnzgtaem'
('127.0.0.1', 61457): disconnected
('127.0.0.1', 61458) 21 bytes: b'test2: raqlvexhimxfgl'
('127.0.0.1', 61458): disconnected

Chapter 31

Domain Name System (DNS)
We’ve learned that IP is responsible for routing traffic around the Internet. We’ve also learned that it does
it with IP addresses, which we commonly show in dots-and-numbers format for IPv4, such as 10.1.2.3.
But as humans, we rarely use IP addresses. When you use your web browser, you don’t typically put an
IP address in the address bar.
Even in our projects, we tended to type localhost instead of our localhost address of 127.0.0.1.
The general process for converting a name like www.example.com that humans use into an IP address
that computers use is called domain name resolution, and is provided by a distributed group of servers
that comprise the Domain Name System, or DNS.

### 31.1 Typical Usage
From a user standpoint, we configure our devices to have a “name server” that they contact to convert
those names to IP addresses. (Probably this is configured with DHCP, but more on that later.)
When you try to connect to example.com, your computer contacts that name server to get the IP address.
If that name server knows the answer, it supplies it. But if it doesn’t, then a whole bunch of wheels get
put into motion.
Let’s start diving down into that process.

### 31.2 Domains and IP Addresses
If haven’t ever registered a domain (such as example.com or oregonstate.edu or google.com or
army.mil), the process is something like this:
1. Contact a domain registrar (i.e. some company that has the authority to sell domains).
2. Choose a domain no one has picked yet.
3. Pay them some money annually to use the domain.
4. …
5. Profit!
But doing this is completely disconnected from the idea of an IP address. Indeed, domains can exist
without IP addresses–they just can’t be used.
Once you have your domain, you can contact a hosting company that will provide you with an IP address
on a server that you can use.
Now you have the two pieces: the domain and the IP address.
But you still have to connect them so people can look up your IP if they have your domain name.

Chapter 31. Domain Name System (DNS)

To do this, you add a database record with the pertinent information to a server that’s part of the DNS
landscape: a domain name server.

31.3 (Domain) Name Servers
Usually called name servers for short, these servers contain IP records for the domain in which they are an
authority. That is, a name server doesn’t have records for the entire world; it just has them for a particular
domain or subdomain.
A subdomain is a domain administered by the owner of a domain. For example, the owner of
example.com might make subdomains sub1.example.com and sub2.example.com. These
aren’t hosts in this case–but they can have their own hosts, e.g. host1.sub1.example.com,
host2.sub1.example.com, somecompy.sub2.example.com.
Domain owners can make as many subdomains as they want. They just have to make sure they
have a name server set up to handle them.
A name server that’s authoritative for a specific domain can be asked about any host on that domain.
The host is often the first “word” of a domain name, though it’s not necessarily.
For example with www.example.com, the host is a computer called www on a domain example.com.
A single name server might be authoritative for many domains.
But even if a name server doesn’t know the IP address of the domain it’s been asked to provide, it can
contact some other name servers to figure it out. From a user perspective, this process is transparent.
So, easy-peasy. If I don’t know the domain in question, I’ll just contact the name server for that domain
and get the answer from them, right?

### 31.4 Root Name Servers
We have an issue, though. How can I connect to the name server for a domain if I don’t know what the
name server is for a domain?
To solve this, we have a number of root name servers that can help us on our way. When we don’t know
an IP, we can start with them and ask them to tell us the IP, or tell us which other server to ask. More on
that process in a minute.
Computers are preconfigured with the IP addresses of the 13 root name servers. These IPs rarely ever
change, and only one of them is needed to work. Computers that perform DNS frequently retrieve the list
to keep it up to date.
The root name servers themselves are named a to m:
a.root-servers.net
b.root-servers.net
c.root-servers.net
...
k.root-servers.net
l.root-servers.net
m.root-servers.net

### 31.5 Example Run
Let’s start by doing a query on a computer called www.example.com. We need to know its IP address.
We don’t know which name server is responsible for the example.com domain. All we know is our list
of root name servers.

### 31.6 Zones

## 1. Let’s choose a random root server, say c.root-servers.net. We’ll contact it and say, “Hey, we’re
looking for www.example.com. Can you help us?”
But the root name server doesn’t know that. It says, “I don’t know about that, but I can tell you if
you’re looking for any .com domain, you can contact any one of these name servers.” It attaches a
list of name servers who know about the .com domains:
a.gtld-servers.net
b.gtld-servers.net
c.gtld-servers.net
d.gtld-servers.net
e.gtld-servers.net
f.gtld-servers.net
g.gtld-servers.net
h.gtld-servers.net
i.gtld-servers.net
j.gtld-servers.net
k.gtld-servers.net
l.gtld-servers.net
m.gtld-servers.net

## 2. So we choose one of the .com name servers.
“Hey h.gtld-servers.net, we’re looking for www.example.com. Can you help us?”
And it answers, “I don’t know that name, but I do know the name servers for example.com. You
can talk to one of them. It attaches the list of name servers who know about the example.com
domain:
a.iana-servers.net
b.iana-servers.net

## 3. So we choose one of those servers.
“Hey a.iana-servers.net, we’re looking for www.example.com. Can you help us?”
And that name server answers, “Yes, I can! I know that name! Its IP address is 93.184.216.34!”
So for any lookup, we start with root name server and it directs us on where to go to find more info.
(Unless the information has been cached somewhere, but more on that later.)

### 31.6 Zones
The Domain Name System is split into logical administrative zones. A zone is, loosely, a collection of
domains under the authority of a particular name server.
But that’s an oversimplification. There could be one or more domains in the same zone. And there could
be a number of name servers working in that same zone.
Think of the zones as all the domains and subdomains some administration is responsible for.
For example, in the root zone, we saw there were a number of name servers responsible for that lookup.
And also in the .com zone, there were a number of different name servers there with authority.

### 31.7 Resolver Library
When you write software that uses domain names, it calls a library to do the DNS lookup. You might have
noticed that in Python when you called:
s.connect(("example.com", 80))

Chapter 31. Domain Name System (DNS)

you didn’t have to worry about DNS at all. Behind the scenes, Python did all that work of looking up that
domain in DNS.
In C, there’s a function called getaddrinfo() that does the same thing.
The short of it is that there’s a library that we can use and we don’t have to write all that code ourselves.
The OS also has a record containing its default name server to use for lookups. (This is sometimes configured by hand, but more commonly is configured through DHCP.) So when you request a lookup, your
computer first goes to this server.
But wait a minute–how does that tie into the whole root server hierarchy thing?
The answer: caching!

### 31.8 Caching Servers
Imagine all the DNS lookups that are happening globally. If we had to go to the root servers for every
request, not only would that take a long time for repeated requests, but the root servers would get absolutely
hammered.
To avoid this, all DNS resolver libraries and DNS servers cache their results.
As it is, the root servers handle literally trillions of requests per day.
This way we can avoid overloading the root servers with repeated requests.
So we’re going to have to amend the outline we already went over.
1. Ask our resolver library for the IP address. If it has it cached, it will return it.
2. If it doesn’t have it, ask our local name server for the IP address. If it has it cached, it will return it.
3. If it’s not cached and if this name server has another upstream name server (that is, another nameserver it can appeal to for answers), it asks that name server for the answer.
4. If it’s not cached and if this name server does not have another upstream name server, it goes to the
root servers and the process continues as before.
With all these possible opportunities to get a cached result, it really helps take the load off the root name
servers./
Lots of WiFi routers you get also run caching name servers. So when DHCP configures your computer,
your computer uses your router as a DNS server for the computers on your LAN. This gives you a snappy
response for DNS lookups since you have a really short ping time to your router.

#### 31.8.1 Time To Live
Since the IP address for a domain or host might change, we have to have a way to expire cache entries.
This is done through a field in the DNS record called time to live (TTL). This is the number of seconds
a server should cache the results. It’s commonly set to 86400 seconds (1 day), but could be more or less
depending on how often a zone administrator thinks an IP address will change.
When a cache entry expires, the name server will have to once again ask for the data from upstream or the
root servers if someone requests it.

### 31.9 Record Types
So far, we’ve talked about using DNS to map a host or domain name to an IP address. This is one of the
types of records stored for a domain on a DNS server.
The common record types are:
- A: An address record for IPv4. This is the type of record we’ve been talking about this whole time.
Answers the question, “What is the IPv4 address for this host or domain?”

### 31.10 Dynamic DNS

- AAAA: An address record for IPv6. Answers the question, “What is the IPv6 address for this host or
domain?”
- NS: A name server record for a particular domain. Answers the question, “What are the name
servers answering for this host or domain?”
- MX: A mail exchange record. Answers the question, “What computers are responsible for handling
mail on this domain?”
- TXT: A text record. Holds free-form text information. Is sometimes used for anti-spam purposes
and proof-of-ownership of a domain.
- CNAME: A canonical name record. Think of this as an alias. Makes the statement, “Domain
xyz.example.com is an alias for abc.example.com.”
- SOA: A start of authority record. This contains information about a domain, including its main name
server and contact information.
There are a lot of DNS record types.

### 31.10 Dynamic DNS
Typical users of the Internet don’t have a static IP address (that is, dedicated or unchanging) at their house.
If they reboot their modem, their ISP might hand them a different IP address.
This causes a ruckus with DNS because any DNS records pointing to their public IPs would be out of
date.
Dynamic DNS (DDNS) aims to solve this problem.
In a nutshell, there are two mechanisms at play:
1. A way for a client to tell the DDNS server what their IP address is.
2. A very short TTL on the DDNS server for that record.
While DNS defines a way to send update records, a common other way is for a computer on your LAN
to periodically (e.g. every 10 minutes) contact the DDNS provider with an authenticated HTTP request.
The DDNS server will see the IP address it came from and use that to update its record.

### 31.11 Reverse DNS
What if you have a dots-and-numbers IP address and want the host name for that IP? You can do a reverse
DNS lookup.
Note that not all IP addresses have such records, and often a reverse DNS query will come up empty.

### 31.12 Reflect
- What is your name server for your computer right now? Search the net for how to look it up on
your particular OS.
- Do the root name servers know every IP address in the world?
- Why would anyone use dynamic DNS?
- What is TTL used for?

Chapter 31. Domain Name System (DNS)

Chapter 32

Network Address Translation (NAT)
In this chapter we’ll be taking a look at network address translation, or NAT.
This is a service provided on a router which hides a “private” LAN from the rest of the world.
The router acts as a middleman, translating internal IP addresses to a single external IP address. It keeps
a table of these connections so when packets arrive on either interface, the router can rewrite them appropriately.
We say the LAN behind the NAT router is a “private network”, and the external IP address the router
presents for that LAN is the “public IP”.

### 32.1 A Snail-Mail Analogy
Imagine how an anonymous snail-mail program might work.
You write a letter addressed to the recipient with your return address on it.
Instead of mailing it directly, you hand the letter to an anonymizer. The anonymizer removes your letter
from the envelope and puts it in another envelope with the same recipient, but replaces the return address
with the anonymnizer’s address. It also records that this sender wrote a letter to this recipient.
The recipient gets the letter. All they see is the anonymizer’s return address on the letter.
The recipient responds to the letter, and sends the response back to the anonymizer. The recipient lists
themselves as the return address.
The anonymizer receives the mail and notes it’s from the recipient. It looks in its records to determine the
person who originally sent a message to the recipient.
The anonymizer takes the response out of the envelope and puts it in a new envelope with the destination
address being the original sender, and the return address remaining the original recipient.
The original sender receives the response.
Note that the original recipient never knew the original sender’s address; they only knew the anonymizer’s
address.

32.2 Why?
NAT is very, very common. It almost certainly runs on every IPv4 LAN.
But why?
There are two main reasons to use this type of service.
1. You want to hide your network details from the rest of the world.

Chapter 32. Network Address Translation (NAT)

## 2. You need more IP addresses than either (a) anyone is willing to allocate to you or (b) you’re willing
to pay for.

#### 32.2.1 Hiding Your Network
There’s no easy way to get random, unsolicited packets onto the private network through the gateway
running NAT.
You can possibly do it with something called source routing, but that’s not commonly enabled by
ISPs.
You’d have to have the private IP on the packet and get that packet to the router. There’s no way to do
this unless you’re on the same LAN as the router, and that’s really unlikely.
Regarding the second point, we should talk about the phenomenon known as address space exhaustion.

#### 32.2.2 IPv4 Exhaustion
There are really a limited number of IPv4 addresses in the world. As such, getting a large block of them
costs a lot of money.
It’s a lot cheaper to get just a handful of addresses (e.g. a /20 or /24 or /4 network) and then have large
private networks behind NAT routers. This way you can have a lot of IPs, but they all present to the world
as coming from the single public IP.
This is really the motivation behind using NAT everywhere. There was a time when we were genuinely
about to run out of IPv4 addresses, and NAT saved us.

### 32.3 Private Networks
There are subnets that are reserved for use as private networks. Routers don’t forward these addresses
directly. If a router on the greater Internet sees an IP from one of these subnets, it will drop it.
For IPv4 there are three such subnets:
- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
The last of these is really common on household LANs.
Again, routers on the Internet will drop packets with these addresses. The only way data gets from these
IPs onto the Internet is via NAT.

### 32.4 How it Works
For this demo, we’re going to use IP:port notation. The number after the colon is the port number.
Also, we’ll use the term “Local Computer” to refer to the computer on the LAN, and “Remote Computer”
or “Remote Server” to refer to the distant computer it’s connecting to.
And finally, the local LAN router will just be called “The Router” or the “NAT Router”.
Let’s go!
On my LAN, I want to go from 192.168.1.2:1234 on my private LAN to the public address
203.0.113.24:80–that’s port 80, the HTTP server.
The first thing my computer does is check to see if the destination IP address is on my LAN… Since my
LAN is 192.168.0.0/16 or smaller, then no, it’s not.
So my computer sends it to the default gateway, my router that has NAT enabled.
The router is going to play the role of the “anonymizer” middleman in the earlier analogy example. And
recall that the router has two interfaces on it–one faces the internal 192.168.0.0/16 private LAN, and

### 32.4 How it Works

the other faces the greater Internet with a public, external IP. Let’s use 192.168.1.1 as the private IP
address on the router and 198.51.100.99 as the public IP.
So the LAN looks like this:
+----------+-------------+
| Local
| Computer | 192.168.1.2 |>-------+
+----------+-------------+
^
| 192.168.1.1 | Internal IP
Router
| NAT-enabled
| 198.51.100.99 | External IP
v
{The Greater Internet}

The router now has to “repackage” the data for the greater Internet. This means rewriting the packet source
to be from the router’s public IP and some unused port on the public interface of the router. (The port
doesn’t need to be the same as the port originally on the packet. The router allocates a random unused
port when the new packet is sent out.))
So the router records all this information:

IP

Port

Protocol

Local Private Address
Remote Public Address
Router Public Address

192.168.1.2
203.0.113.24
198.51.100.99

1234
80
5678

TCP
TCP
TCP

(Note: except for 80, since we’re connecting to HTTP in this example, all port numbers were randomly
chosen.)
So while the original packet was:
192.168.1.2:1234 --> 203.0.113.24:80
Local

the NAT router rewrites it to be the same destination, but the router as the source.
198.51.100.99:5678 --> 203.0.113.24:80
NAT router

From the destination’s point of view, it is completely unaware that this isn’t originally from the router
itself.
So the destination replies with some HTTP data, sending it back to the router:

Chapter 32. Network Address Translation (NAT)

203.0.113.24:80 --> 198.51.100.99:5678

NAT router

The router then looks at its records. It says, “Wait a moment–if I get data on port 5678, that means I need
to translate this back to a private IP on the LAN!
So it translates the message so that it’s no longer addressed to the router, but instead is sent to the private
source IP recorded earlier:
203.0.113.24:80 --> 192.168.1.2:1234

Local

And sends that out on the LAN. And its received! The LAN computer thinks it’s talking to the remote
server, and the remote server thinks it’s talking to the router! NAT!
It might be a little confusing in that last step that the packet is coming from the NAT router but is actually
IP addressed like it came from the Remote Computer. This is OK on the LAN because the NAT router
sends that IP packet out with an Ethernet address of the Local Computer on the LAN. Or, put another way,
the NAT router can use link layer addressing to get the packet delivered to the Local Computer and the IP
address of where that packet came from doesn’t have to match the internet IP of the NAT router.

### 32.5 NAT and IPv6
Since IPv6 has tons of addresses, do we really need NAT? And the technical answer is “no”. Part of the
reason IPv6 came about was to get rid of this nasty NAT middleman business.
That said, there is a reserved IPv6 subnet for private networks:
fd00::/8

There’s some additional structure in the “host” portion of the address, but you can read about it on
Wikipedia if you want.
Like the IPv4 private subnets, IP addresses from this subnet are dropped by routers on the greater Internet.
NAT doesn’t work for IPv6, but there is another way to do the translation with network prefix translation.
But what about the whole idea that people can’t easily get unsolicited packets onto your LAN? Well,
you’re just going to have to configure your firewall properly to keep people out. But that’s a story for
another time.

### 32.6 Port Forwarding
If you have a server running behind the NAT router, how can it serve content to the outside world? After
all, no one on the outside can refer to it by its internal IP address–all they can see is the router’s external
IP.
But you can configure the NAT router to do something called port forwarding.
For example, you could tell it that traffic sent to its public IP port 80 should be forwarded to some private
IP on port 80. The router forwards the traffic, and the original sender is unaware that its traffic is ultimately
arriving at a private IP.
There’s no reason the same port must be used.
For example, SSH uses port 22, and that’s fine on the computer on the private network. But if you forward
from the public port 22, you’ll find malicious actors are continuously trying to log in through it. (Yes, even

### 32.7 Review

on your computer at home.) So it’s more common to use some other uncommon port as the public SSH
port, and then forward it to port 22 on the LAN.

### 32.7 Review
- Look up your computer’s internal IP address. (Might have to search the net to see how to do this.)
Then go to google.com and type “what is my ip”. The numbers are (very probably) different. Why?
- What problems does NAT solve?

Chapter 32. Network Address Translation (NAT)

Chapter 33

Dynamic Host Configuration Protocol
(DHCP)
When you first open your laptop at the coffee shop, it doesn’t have an IP address. It doesn’t even know
what IP address it should have. Or what its name servers are. Or what its subnet mask is.
Of course, you could manually configure it! Just type in the numbers that the cashier hands you with your
coffee!
OK, that doesn’t happen. No one would bother. Or they’d use a duplicate address. And things wouldn’t
work. And they’d probably rage-drink their coffee and never return.
It would be better if there were a way to automatically configure a computer that just arrived on the
network, wouldn’t it?
That’s what the Dynamic Host Configuration Protocol (DHCP) is for.

### 33.1 Operation
The overview:
Client --> [DHCPDISCOVER packet] --> Server
Client <-- [DHCPOFFER packet] <-- Server
Client --> [DHCPREQUEST packet] --> Server
Client <-- [DHCPACK packet] <-- Server

The details:
When your laptop first tries to connect to the network, it sends a DHCPDISCOVER packet to the broadcast
address (255.255.255.255) over UDP to port 67, the DHCP server port.
Recall that the broadcast address only propagates on the LAN–the default gateway does not forward it.
On the LAN is another computer acting as the DHCP server. There’s a process running on it waiting on
port 67.
The DHCP server process sees the DISCOVER and decides what to do with it.
The typical use is that the client wants an IP address. We call this leasing an IP from the DHCP server.
The DHCP server is tracking which IPs have been allocated and which are free out of its pool.
In response to the DHCPDISCOVER packet, the DHCP server sends a DHCPOFFER response back to the client
on port 68.

Chapter 33. Dynamic Host Configuration Protocol (DHCP)

The offer contains an IP address and potentially a lot of other pieces of information including, but not
limited to:
- Subnet mask
- Default gateway address
- The lease time
- DNS servers
The client can accept or ignore the offer. (Maybe there are multiple DHCP servers making offers, but the
client may only accept one of them.)
If the offer is accepted, the client sends a DHCPREQUEST back to the server notifying it that it wants that
particular IP address.
Finally, if all’s well, the server replies with an acknowledgment packet, DHCPACK.
At that point, the client has all the information it needs to participate on the network.

### 33.2 Reflect
- Reflect on the advantages of using something like DHCP over manually configuring the devices on
your LAN.
- What types of information does a DHCP client receive from the DHCP server?

Chapter 34

Project: Digging DNS Info
The dig utility is a great command line tool for getting DNS information from your default name server,
or from any name server.

### 34.1 Installation
On Macs:
brew install bind

On WSL:
sudo apt install dnsutils

### 34.2 Try it Out
Type:
dig example.com

and see what it gives back.
; <<>> DiG 9.10.6 <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 60465
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;example.com.

79753

;; Query time: 23 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Fri Nov 18 18:37:13 PST 2022

Chapter 34. Project: Digging DNS Info

;; MSG SIZE

rcvd: 56

That’s a lot of stuff. But let’s look at these lines:

79753

That’s the IP address for example.com! Notice the A? That means this is an address record.
You can get other record types, as well. What if you want the mail exchange server for oregonstate.edu?
You can put that on the command line:
dig mx oregonstate.edu

We get:
oregonstate.edu. 600 IN MX 5 oregonstate-edu.mail.protection.outlook.com.

Or if we want the name servers for example.com, we can:
dig ns example.com

### 34.3 Time To Live (TTL)
If you dig an A record, you’ll see a number on the line:

78236

In this case, it’s 78236. This is the TTL of an entry in the cache. This is telling you that the name server
you used has cached that IP address, and it won’t expire that cache entry until 78,236 more seconds have
elapsed. (For reference, there are 86,400 seconds in a day.)

### 34.4 Authoritative Servers
If you get an entry that’s cached in your name server, you’ll see AUTHORITY: 0 in the dig output:
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
^^^^^^^^^^^^

But if the entry comes directly from the name server that’s responsible for the domain, you’ll see
AUTHORITY: 1 (or some positive number).

### 34.5 Getting the Root Name Servers
Just type dig and hit return and you’ll see all the root DNS servers, probably both their IPv4 (record type
A) and IPv6 (record type AAAA) addresses

### 34.6 Digging at a Specific Name Server
If you know a name server that you want to query, you can use an @ sign to specify that server.
Two popular free-to-use name servers are 1.1.1.1 and 8.8.8.8.

### 34.7 Digging at a Root Name Server

Let’s ask one of them for the IP of example.com
dig @8.8.8.8 example.com

And we get our expected answer. (Though the TTL is probably different–these are different servers and
their cache entries have different ages, after all.)

### 34.7 Digging at a Root Name Server
There were a bunch of root name servers, so let’s dig example.com at one of them:
dig @l.root-servers.net example.com

We get some interesting results:

a.gtld-servers.net.
b.gtld-servers.net.
c.gtld-servers.net.
d.gtld-servers.net.

and then some.
That’s not example.com… and look–those are NS records, name servers.
This is the root server telling us, “I don’t know who example.com is, but here are some name servers that
know what .com is.”
So we choose one of those and dig there:
dig @c.gtld-servers.net example.com

And we get:

a.iana-servers.net.
b.iana-servers.net.

Same thing again, more NS name server records. This is the c.gtld-servers.net name server telling
us, I don’t know the IP for example.com, but here are some name servers that might!”
So we try again:
dig @a.iana-servers.net example.com

And at last we get the A record with the IP!

86400

You can also use +trace on the command line to watch the entire query from start to end:
dig +trace example.com

### 34.8 What to Do
Try to answer the following:
- What’s the IP address of microsoft.com?
- What’s the mail exchange for google.com?

Chapter 34. Project: Digging DNS Info

- What are the name servers for duckduckgo.com?

- Following the process in the Digging from a Root Name Server in the section above, start with a
root name server and dig your way down to www.yahoo.com (NOT yahoo.com).
Note that this ends in a CNAME record! You’ll have to repeat the process with the alias named by the
CNAME record starting from the root servers again.
Add to your document the dig commands you used to get the IP address. Each dig command
should be @ a different name server, starting with the root.

Chapter 35

Port Scanning
A NOTE ON LEGALITY: It’s unclear whether or not it is legal to portscan a computer you do not
own. We’ll be doing all our portscanning on localhost. Don’t portscan computers you do not have
permission to!
A port scan is a method of determining which ports on a computer a ready to accept connections. In other
words, which ports have a server listening on them.
The port scan is often the first line of attack on a system. Before being able to connect to see if some
vulnerabilities can be found in any listening servers, we need to know which servers are running in the
first place.

### 35.1 Mechanics of a Portscanner
A portscanner will attempt to find listening server processes on a range of ports on a specified IP. (Sometimes the range is all ports.)
With TCP, the general approach is to try to set up a connection with the connect() call on the candidate
port. If it works, we have an open port, and the portscanner outputs that information. Nothing is sent over
the connection, and it is closed immediately.
The job of the portscanner is to identify open ports, not to send or receive other data unnecessarily.
Calling connect() causes the TCP connection to complete its three-way handshake. This isn’t strictly
necessary, since if the portscanner gets any reply from the server (i.e. the second part of the three way
handshake) then we know the port is open. Completing the handshake would cause the remote OS to
wake up the server on that port for a connection we know we’re just going to close anyway.
Some TCP portscanners will instead build a TCP SYN packet to start the handshake and send that to
the port. If they get a SYN-ACK reply, they know the port is open. But then, instead of completing
the handshake with an ACK, they send a RST (reset) causing the remote OS to terminate the nascent
connection entirely–and causing it to not wake up the server on that port.
You can write software that builds custom TCP packets with raw sockets. Usually you need to be
a superuser/admin to use these.

#### 35.1.1 Portscanning UDP
Since there is no connection with UDP, port scans are a little less exact.
One technique is to send a UDP packet to a port and see if you get an ICMP “destination unreachable”
message back. If so, the port is not open.
If you don’t get a response, maybe the port is open. Or maybe the UDP packet is being filtered out and
dropped with no ICMP response.

Chapter 35. Port Scanning

Another option is to send a UDP packet to a known port that might have a server behind it. If you get a
response from the server, you know the port is open. If not, it’s closed or your traffic was filtered out.

### 35.2 Reflect
- Why shouldn’t you portscan random computers on the Internet?
- What’s the purpose of using a portscanner?

Chapter 36

Firewalls
A favorite component of every bad hacker movie ever is the firewall. It’s clear from those bad movies
that it has something to do with security, but the exact role is ambiguous; it’s only apparent that a bad guy
getting through the firewall is a bad thing.
But back to reality: a firewall is a computer (often a router) that restricts certain types of traffic between
one interface and another. So instead of forwarding every packet of every type from every port, it might
decide to drop those packets instead.
The upshot is that if someone in trying to connect to a port on the far side of a firewall, the firewall might
prevent that connection depending on how it is configured.
In this chapter, we’ll be speaking conceptually about firewalls, but won’t get into any specifics about
practical configuration. There are many implementations of firewalls out there, and they all tend to have
different methods of configuration.

### 36.1 Firewall Operation
If you think about a packet arriving at a router, that router has the capability to inspect that packet all it
wants. It can look at the source and destination IPs, or the ports, or even the application layer data.
So that gives it the opportunity to make a decision about whether or not to keep forwarding that packet
based on any of that data.
For example, the firewall might be configured to allow any port 80 (HTTP) traffic to come from the
outside of the firewall to the inside, but block incoming traffic on all other destination ports.
Or maybe it’ll be configured to only allow certain IP addresses to connect.
So the firewall, on receipt of a packet, looks at its configured rules and decides whether or not to drop the
packet (if it’s being filtered out), or forward the packet normally.
When it decides to drop the packet, it has a more options. It can either silently drop it, or it can reply with
a ICMP “destination unreachable” message.
That basic filtering gives some a control, but there are still some things you might want to do that it can’t
manage.
For example, if someone behind the firewall establishes a TCP connection over the Internet from a random
port, we want to be able to get traffic back to that host from that random port.
With plain filtering, we’d just have to allow traffic on all those ports.
But with stateful filtering, the firewall tracks the state of TCP connections that have been initiated from
behind the firewall. The firewall sees the TCP three-way handshake and knows then that there is a valid
connection. It can then safely allow traffic back that’s destined for the inside computer’s random port
number.

Chapter 36. Firewalls

Stateful filtering is also used with UDP traffic, even though it’s connectionless. The firewall sees a UDP
packet go out, and it’ll allow incoming UDP packets to that port. (For a while. Since it’s connectionless,
there’s no way to tell when the server and client and done. So the firewall will timeout UDP rules after
they haven’t been used for a while.)
In order to keep the firewall from timing-out on any of its rules, the programs can send keepalive
messages. TCP actually has a specific message type for this, and the OS will periodically send
empty ACK packets out to keep anyone from timing out. (If programming with sockets, you will
likely need to set the SO_KEEPALIVE option.)
The keepalive can also be effectively implemented by a program using UDP, as well. It could be
configured to send a custom keepalive packet to the receiver (who would reply with some kind of
ACK) every so often.
Keepalive is only an issue for programs that have long periods of no network traffic.
Finally, filtering could also be done at the application layer. If the firewall digs deeply enough into the
packet, it might see that it’s HTTP or FTP data, for example. With that knowledge, it could allow or deny
all HTTP traffic, even if it’s arriving on a non-standard port.

### 36.2 Firewalls and NAT
In a home network, it’s really common for the firewall to also be the router and the switch and do NAT.
It’s all rolled into one.
But there’s nothing stopping us from having a separate firewall computer on the network that only decides
whether or not to allow traffic.
And there’s no rule that one side of the firewall must be a private network and the other side a public
network. Both sides could be private networks or public networks, or one private and one public.
The role of the firewall at its core is not to separate public and private networks–that’s NAT’s role–but
rather to control which traffic is allowed to pass through the firewall.

### 36.3 Local Firewalls
You can also set up a firewall just on your computer (and this is commonly done). Typically this is set up
to allow all connections from the computer going out, but to restrict connections from other computers
coming in.
In MacOS and Windows, the firewall is something that can simply be turned on and then it will start
blocking traffic based on some common rules.
If you need some specific ports unblocked, you’ll have to manually add those.
Linux has firewall support through a mechanism called iptables. This isn’t the most straightforward thing
to configure, but it’s powerful enough to build a NAT router/firewall from scratch.

### 36.4 Reflect
- What’s the difference/relationship between a firewall and a router?
- What’s the difference/relationship between a firewall and NAT?
- What’s the funniest or most painful thing in this NCIS clip?

Chapter 37

Trusting User Data
“You won’t know who to trust…”
—Gregor Ivanovich, Sneakers
When your server receives data from someone on the Internet, it’s not good enough to trust that they have
good intentions.
There are lots of bad actors out there. You have to take steps to prevent them from sending things that
crash your server processes or, worse, give them access to your server machine itself.
In this chapter we’re going to take a high-level look at some issues that might arise from users trying to
send malicious data.
The two big ideas here are:
- Think like a villain. What could someone pass your code that would crash it or make it behave in
an unexpected way?
- Don’t trust anything from the remote side. Don’t trust that it will be a reasonable length. Don’t
trust that it will contain reasonable data.

### 37.1 Buffer Overflow/Overrun
This is something that mostly affects memory-unsafe languages like C or C++.
The idea is:
1. Your program allocates a fixed size region of memory to use.
2. Your program reads some data into that memory region over a network connection.
3. The attacker sends more data than can fit in that memory region. This data is carefully constructed
to contain a payload.
4. Your program, without thinking about it, writes the data from the attacker, filling the memory region
and overflowing into whatever is in memory after that.
5. Depending on how things are written, the attacker could overwrite the return address value on
the stack, causing the function to return into the attacker’s payload and run that. The payload
manipulates the system to install a virus or change the system to otherwise allow remote access.
Modern OSes try to mitigate by making the stack and heap regions of memory non-executable, and the
code region of memory non-writable.
As a developer, you need to write code in C that properly performs bounds-checking and never writes to
memory it doesn’t intend to.

Chapter 37. Trusting User Data

### 37.2 Injection Attacks
These attacks are ones where you build a command using some data the user has provided to you. And
then run that command.
A malicious user can feed you data that causes another command to be run.

#### 37.2.1 System Commands
In many languages, there’s a feature that allows you to run a command via the shell.
For example, in Python you can run the ls command to get a directory listing like this:
import os
os.system("ls")

Let’s say you write a server that receives some data from a user. The user will send 1, 2 or 3 as data,
depending on the function they want to select.
You run some code in your server like this:
os.system("mycommand " + user_input)

So if the user sends 2, it will run mycommand 2 as expected and return the output to the user.
To be safe, the mycommand program verifies that the only allowable inputs are 1, 2, or 3 and returns an
error if something else is passed.
Are we safe?
No. Do you see how?
The user could pass the input:
1; cat /etc/passwd

This would cause the following to be executed:
mycommand 1; cat /etc/passwd

The semicolon is the command separator in bash. This causes the mycommand program to execute, followed by a command that shows the contents of the Unix password file.
To be safe, all the special characters in the input need to be stripped or escaped so that the shell doesn’t
interpret them.

#### 37.2.2 SQL Commands
There’s a similar attack called SQL Injection, where a non-carefully crafted SQL query can allow a malicious user to execute arbitrary SQL queries.
Let’s say you build a SQL query in Python like this, where we get the variable username over the network
in some way:
q = f"SELECT * FROM users WHERE name = '{username}'

So if I enter Alice for the user, we get the following perfectly valid query:
SELECT * FROM users WHERE name = 'Alice'

And then I run it, no problem.

### 37.2 Injection Attacks

But let’s think like a villain.
What if we entered this:
Alice' or 1=1 --

Now we get this:
SELECT * FROM users WHERE name = 'Alice' or 1=1 -- '

The -- is a comment delimiter in SQL. Now we’ve put together a query that shows all user information,
not just Alice’s.
Not only that, but a naive implementation might also support the ; command separator. If so, an attacker
could do something like this:
Alice'; SELECT * FROM passwords --

Now we get this command:
SELECT * FROM users WHERE name = 'Alice'; SELECT * FROM passwords -- '

And we get the output from the passwords table.
To avoid this trap, use parameterized query generators. This will be something in the SQL library that
allows you to safely build a query with any user input.
Never try to build the SQL string yourself.

#### 37.2.3 Cross-Site Scripting
This is something that happens with HTML/JS.
Let’s say you have a form that accepts a user comment, and then the server appends that comment to the
web page.
So if the user enters:
This site has significant problems. I feel uncomfortable using it.
Love, FriendlyTroll

That gets added to the end of the page.
But if the user enters:
LOL
<script>alert("Pwnd!")</script>

Now everyone will see that alert box whenever they view the comments!
And that’s a pretty innocuous example. The JavaScript could be anything and will be executed on the
remote site (meaning it can perform API calls and fetches as that domain). It could also rewrite the page
so that the login/password input submitted that information to the attacker’s website.
“It would be bad.”
—Egon Spengler, Ghostbusters
Most HTML-oriented libraries come with a function to sterilize strings so that the browser will render
them and not interpret them (e.g. all < replaced with &gt; and so on).
Definitely run any user-generated data through such a function before displaying it on a browser.

Chapter 37. Trusting User Data

### 37.3 Reflect
- In general terms, what’s the problem with trusting user input?
- Why aren’t buffer overflows as much of a problem with languages like Python, Go, or Rust as they
are with C?

Chapter 38

Project: Port Scanning
We’re going to do some port scanning!
NOTE: We’re only going to run this on localhost to avoid any legal trouble.
To make this happen, we need to install the nmap too.
MacOS:
brew install nmap

Windows WSL:
sudo apt-get update
sudo apt-get install nmap

## 1. Portscan All Common Ports
This command will portscan 1000 of the most common ports:
nmap localhost

What’s the output?
2. Portscan All Ports
This will scan all the ports–starting from 0 on:
nmap -p0- localhost

What’s the output?
3. Run a Server and Portscan
Run any TCP server program that you wrote this quarter on some port.
Run the all-port scan again (above).
- Notice your server’s port in the output!
- Does your server crash with a “Connection reset” error? If so, why? If not, speculate on why
this might happen even if you didn’t see it from your server. (See the Port Scanning chapter
for this!)

Chapter 38. Project: Port Scanning

Chapter 39

Project: Multiuser Chat Client and
Server
It’s time to put it all together into this, the final project!
We’re going to build a multiuser chat server and a chat client to go along with it.
The chat server should allow an arbitrary number of connections from clients. All the clients will see what
the other ones are saying.
Not only that, but there should be messages for when a user joins or leaves the chat.
Here’s a sample screenshot. The prompt where this user (“pat” in this example) is typing what they’re
about to say. The region above it is where all the output accumulates.
*** pat has joined the chat
pat: Hello?
*** leslie has joined the chat
leslie: hi everyone!
pat: hows it going
*** chris has joined the chat
chris: OK, now we can start!
pat: lol
leslie: Why are you always last?
*** chris has left the chat
pat> oh no!! :)█

### 39.1 Overall Architecture
There will be one server, and it will handle many simultaneous clients.

#### 39.1.1 Server
The server will run using select() to handle multiple connections to see which ones are ready to read.
The listener socket itself will also be included in this set. When it shows “ready-to-read”, it means there’s
a new connection to be accept()ed. If any of the other already-accepted sockets show “ready-to-read”,
it means the client has sent some data that needs to be handled.
When the server get a chat packet from one client, it rebroadcasts that chat message to every connected
client.

Chapter 39. Project: Multiuser Chat Client and Server

Note: when we use the term “broadcast” here, we’re using it in the generic sense of sending a thing
to a lot of people. We’re not talking about IP or Ethernet broadcast addresses. We won’t use those
in this project.
When a new client connects or disconnects, the server broadcasts that to all the clients, as well.
Since multiple clients will be sending data streams to the server, the server needs to maintain a packet
buffer for each client.
You can put this is a Python dict that uses the client’s socket itself as the key, so it maps from a
socket to a buffer.
The server will be launched by specifying a port number on the command line. This is mandatory; there
is no default port.
python chat_server.py 3490

#### 39.1.2 Client
When the client is launched, the user specifies their nickname (AKA “nick”) on the command line along
with the server information.
The very first packet it sends is a “hello” packet that has the nickname in it. (This is how the server
associates a connection with a nick and rebroadcasts the connection event to the other clients.)
After that, every line the user types into the client gets sent to the server as a chat packet.
Every chat packet (or connect or disconnect packet) the client gets from the server is shown on the output.
The client has a text user interface (TUI) that helps keep the output clean. Since the output is happening
asynchronously on a different part of the screen than the input, we need to do some terminal magic to keep
them from overwriting each other. This TUI code will be supplied and is described in the next section.
Since there can be data arriving while the user is typing something, we need a way to handle that. The
client will be multithreaded. There will be two threads of execution.
- The main sending thread will:
- Read keyboard input
- Send chat messages from the user to the server
- The receiving thread will:
- Receive packets from the server
- Display those results on-screen
Since there is no shared data between those threads, no synchronization (mutexes, etc.) will be required.
They do share the socket, but the OS makes sure that it’s OK for multiple threads to use that at the
same time without an issue. It’s threadsafe.
If you need more information on threading in Python, see the Appendix: Threading section.
The client will be started by specifying the user’s nickname, the server address, and the server port on the
command line. These are all required arguments; there are no defaults.
python chat_client.py chris localhost 3490

### 39.2 Client I/O
The client screen is split into two main regions:
- The input section, the last row or two of the screen.
- The output section, the remaining top part of the screen.

### 39.3 The Client TUI

(The Client TUI section, below, has details about how to do this I/O.)
The client input line at the bottom of the screen should be the user’s nickname followed by > and a space.
The input takes place after that:
alice> this is some sample input

The output area of the screen has two main types of messages:
- Chat messages: these show the speaker nickname followed by : and a space, and then the message.
pat: hows it going

- Informational messages: these show when a user has joined or left the chat, or any other information that needs printing. They consist of *** followed by a space, then the message. Joining and
leaving messages are shown here:
*** leslie has joined the chat
*** chris has left the chat

#### 39.2.1 Special User Input
If the user input begins with /, it has special meaning and should be parsed farther to determine the action.
Currently, the only special input defined is /q:
- /q: if the user enters this, the client should exit. Nothing is sent to the server in this case.

### 39.3 The Client TUI
Download the Chat UI code and demo here1 .
In the file chatui.py, there are four functions you need, and you can get them with this import:
from chatui import init_windows, read_command, print_message, end_windows

The functions are:
- init_windows(): call this first before doing any other UI-oriented I/O of any kind. It should also be
called before you start the receiver thread since that thread does I/O.
- end_windows(): call this when your program completes to clean everything up.
- read_command(): this prints a prompt out at the bottom of the screen and accepts user input. It
returns the line the user entered once they hit the ENTER key.
For example:
s = read_command("Enter something> ")

The function takes care of screen placement of the element.
- print_message(): Prints a message to the output portion of the screen. This handle scrolling and
making sure the output doesn’t interfere with the input from read_command().
Do not include a newline in your output. It will be added automatically.
Known Bug: on Mac, if something gets written by print_message(), then next backspace you type
will show a ^R and scroll down a line. It’s unclear why this happens.

https://beej.us/guide/bgnet0/source/exercises/chat/chatui.zip

Chapter 39. Project: Multiuser Chat Client and Server

#### 39.3.1 Curses Variant of chatui
If the chatui library is causing you trouble, you could try the alternate version chatuicurses. It has
the exact same functions and is used in the exact same way.
Before you use it, you have to install the unicurses library:
python3 -m pip install uni-curses

After that installs, you should just be able to use chatuicurses instead of chatui in the import line.
Known Mac Issue: my attempt complained that the curses library wasn’t installed when in fact it was.
This doesn’t seem to affect Linux or Windows.
One caveat here is that the input routine doesn’t obey CRTL-C to get out of the app. As such, you might
have to hit CTRL-C followed by RETURN to actually break out. On Windows, you might try CTRL-BREAK.

### 39.4 Packet Structure
The client and server will communicate over TCP (stream) sockets using a defined packet structure.
In a nutshell, a packet is a 16-bit big-endian number representing the payload length. The payload is a
string containing JSON-format data with UTF-8 encoding.
You can encode the JSON string to UTF-8 bytes by calling .encode() on the string. .encode()
takes an argument to specify the encoding, but it defaults to "UTF-8".
So the first thing you’ll have to do when looking at the data stream is make sure you have at least two
bytes in your buffer so you can determine the JSON data length. And then after that, see if you have the
length (plus 2 for the 2-byte header) in your buffer.
If you don’t, you’ll have to keep receiving data in a loop until you have enough. Also remember that you
might receive some data from the next packet in a single recv() call.
Your code has to work no matter how many bytes are returned by recv(), even if it’s more or fewer than
you expected!
Have a get_next_packet() function that will extract and return the next packet, like you’ve done in
earlier projects. Abstracting the byte stream into packets like this will make your life easier.
Also: be sure to use sendall() so that all the data you want sent actually gets sent!

### 39.5 JSON Payloads
If your JSON is rusty, check out the Appendix: JSON section.
Each packet starts with the two-byte length of the payload, followed by the payload.
The payload is a UTF-8 encoded string representing a JSON object.
Each payload is an Object, and has a field in it named "type" that represents the type of the payload. The
remaining fields vary based on the type.
In the following examples, square brackets in strings are used to indicate a place where you need to put
in the relevant information. The brackets are not to be included in the packet.

39.5.1 “Hello” Payload
When a client first connects to a server, it sends a hello packet with the user’s nickname. This allows the
server to associate a connection with a nick.
This MUST be sent before any other packets.
From client to server:

### 39.6 Extensions

"type": "hello"
"nick": "[user nickname]"

39.5.2 “Chat” Payload
This represents a chat message. It has two forms depending on whether or not the chat message originated
with the client (i.e. the user wants to send a message) or the server (i.e. the server is broadcasting someone
else’s message).
From client to server:
"type": "chat"
"message": "[message]"

From server to clients:
"type": "chat"
"nick": "[sender nickname]"
"message": "[message]"

The client doesn’t need to send the sender’s nick along with the packet since the server can already make
that association from the hello packet sent earlier.

39.5.3 “Join” Payload
The server sends this to all the clients when someone joins the chat.
"type": "join"
"nick": "[joiner's nickname]"

39.5.4 “Leave” Payload
The server sends this to all the clients when someone leaves the chat.
"type": "leave"
"nick": "[leaver's nickname]"

### 39.6 Extensions
These aren’t worth any points, but if you want to push farther, here are some ideas. Caveat! Be sure
whatever you turn in has the official functionality as already described. These mods can be a strict superset
of that, or you can fork a new project to hold them.
At the very least, I recommend branching from your working version so it doesn’t get accidentally messed
up!

Chapter 39. Project: Multiuser Chat Client and Server

- Add direct messaging–if the user “pat” sends:
/message chris how's it going?

then “chris” will see:
pat -> chris: how's it going?

(What if the user doesn’t exist? Maybe you need to define an error packet to get back from the
server!)
- Add a way to list the names of all the people in the chat
- Add emotes–if the user “pat” sends:
/me goes out to buy some snacky cakes

everyone else sees:
[pat goes out to buy some snacky cakes]

(The right way to do this is to add a new packet type!)
- Add chat rooms–there could be a default room everyone is in when they first join, but additions
could be to add chat rooms, join or leave chat rooms, and list available chat rooms.
- Turn the whole thing into a MUD. That should keep you busy!

### 39.7 Some Recommendations
Here are some pointers that might help.
- Have the server use the set of connected sockets that it passes to select() as its canonical list of
everyone who is connected.
If a client disconnects, remove them from the set.
If a new client connects, add them to the set.
The set will always reflect everyone who is connected at this time.
- Have a buffer per connection on the server. Remember how we had a buffer in earlier projects
that would accumulate data until there was a complete packet? We need one of those buffers per
connection. And in this project, we have a lot of connections.
Use a dict to store the buffers. The key is the socket itself, and the value is a string with the buffer
for that socket in it.
- Remember the project where we wrote code to extract packets from the bytestring buffer?
Use that strategy again.
- You’ll want to use .to_bytes() and .from_bytes() to get and set the packet length.
- Use old projects as much as you can.

Chapter 40

Appendix: Bitwise Operations
In this section, we’ll refresh on bitwise operations.
The bitwise operators in a language manipulate the bits of numbers. These operators act as if a number is
represented in binary, even if its not. They can work on numbers of any base in Python code, but it makes
the most sense to us as humans in binary.
Protip: remember that different number bases like hex, binary, and decimal are just different ways
of writing a value down. Kind of like different languages for representing the same numeric value.
When a value is stored in a variable, it’s best to think of it as existing in a pure numeric sense–no
base at all. It’s only when you write it down (in code or print it out) that the base matters.
For instance, Python prints everything in decimal (base 10) by default. It has various methods to
override that and output in another base.
We’ll look at:
- Coding different bases in Python
- Printing different bases in Python
- Bitwise-AND
- Bitwise-OR
- Bitwise-NOT
- Bitwise shift
- Setting a given number of 1 bits

### 40.1 Coding Different Bases in Python
What value is 110101?
Your brain might think I’m asking “What is this binary number in decimal?” But you’d be wrong!
I did not specify a number base along with that number, so you don’t know if it’s binary or decimal or
hex!
For the record, I meant it to be decimal, so it’s one hundred ten thousand one hundred one.
Python and most other languages assume the numbers in your code are decimal unless you specify otherwise.
If you wanted it to be a different base, you have to prefix the number to indicate the base.
These prefixes are:
Base

Base name

Prefix

Binary
Octal

0b
0o

Chapter 40. Appendix: Bitwise Operations

Base

Base name

Prefix

10
16

Decimal
Hexadecimal

None
0x

So let’s write some numbers in different bases:
110101 decimal!
0b110101 binary!
0x110101 hex!

Let’s look at the decimal value 3490. I can convert that to hex and get 0xda2.
It’s important to remember these two values are identical:
>>> 3490 == 0xda2
True

It’s just a different “language” for representing the same value.

### 40.2 Printing and Converting
Remember that there’s no such thing as a value “stored in hex” or “stored in decimal” in a variable. The
variable holds just a numeric value and we shouldn’t consider it to have a base.
It only acquires a base when we write in our code or print it out. Then we have to specify the base.
(Although Python uses decimal by default in all cases.)
You can convert a value to a hex string with the hex() function. All “converted” values end up as strings.
What else would they be?
>>> print(hex(3490))
0xda2

You can convert a value to a binary string with the bin() function.
>>> print(bin(3490))
0b110110100010

You can also use f-strings to get the job done:
>>> print(f"3490 is {3490:x} in hex and {3490:b} in binary")
3490 is da2 in hex and 110110100010 in binary

The f-strings have a nice feature of being able to pad to a field width with zeros. Let’s say you wanted an
8-digit hex number representation, you could do it like this:
>>> print(f"3490 is {3490:08x} in hex")
3490 is 00000da2 in hex

### 40.3 Bitwise-AND
Bitwise-AND mashes two numbers together with an AND operation. The result of an AND operation is
1 if both of the two input bits are 1. Otherwise it’s 0.

### 40.4 Bitwise-OR

B

A AND B

Let’s do an example and AND two binary numbers together. Bitwise-AND uses the ampersand operator
(&) in Python and many other languages.
& 0

& 1

& 0

& 1

You see the result is 1 only if both of the two input bits are 1.
Larger inputs are AND’d by pairs of individual bits, which are what appears in each column of the large
numbers below. (For completeness, the decimal result is shown on the right, but this is derived from the
binary representation. It’s not easy to look at two decimal numbers and ascertain their bitwise-AND.)
0100011111000101010
& 1001111001001111000
--------------------0000011001000101000

146986
& 324216
-------12840

See how any particular output bit is 1 only if both bits in the column above it are 1.

### 40.4 Bitwise-OR
Bitwise-OR mashes two numbers together with an OR operation. The result of an OR operation is 1 if
either or both of the two input bits are 1. Otherwise it’s 0.

B

A OR B

Let’s do an example and OR two binary numbers together. Bitwise-OR uses the pipe operator (|) in
Python and many other languages.
| 0

| 1

| 0

| 1

You see the result is 1 if either of the two input bits are 1.
Larger inputs are OR’d by pairs of individual bits, which are what appears in each column of the large
numbers below. (For completeness, the decimal result is shown on the right, but this is derived from the
binary representation. It’s not easy to look at two decimal numbers and ascertain their bitwise-OR.)
0100011111000101010
| 1001111001001111000
---------------------

146986
| 324216
--------

Chapter 40. Appendix: Bitwise Operations

1101111111001111010

458362

See how any particular output bit is 1 if either or both bits in the column above it are 1.

### 40.5 Bitwise-NOT
Bitwise-NOT inverts a value by changing all the 1 bits to 0 and all the 0 bits to 1 This is a unary operator–it
just works on a single number.

NOT A

Let’s do an example and NOT a single bit number. Bitwise-NOT uses the tilde operator (~) in Python and
many other languages.
~ 0

~ 1

You see the result is simply flipped to the other bit value.
Larger inputs are NOT’d by individual bits, which are what appears in each column of the large numbers
below. (For completeness, the decimal result is shown on the right, but this is derived from the binary
representation. It’s not easy to look at two decimal numbers and ascertain their bitwise-NOT.)
~ 0100011111000101010
--------------------1011100000111010101

~ 146986
-------377301

See how any particular output bit is 1 only if both bits in the column above it are 1.
Python note: the bitwise-NOT of a number will frequently be negative because of Python’s arbitraryprecision arithmetic. If you need it to be positive, bitwise-AND the result with the number of 1 bits you
need to represent the final value. For instance, to get a byte with 37 inverted, you can do any of these:
(~37) & 255
(~37) & 0xff
(~37) & 0b11111111

(Because, of course, those are all the same number in different bases!)

### 40.6 Bitwise shift
This is an interesting one. Using this, you can move a number back and forth by a certain number of bits.
Check out how we’re moving all the bits left by 2 in this example:
000111000111
011100011100

left shifted by 2 is:

Or we can shift right:
000111000111
000001110001

right shifted by 2 is:

### 40.7 Setting a Given Number of 1 bits

New bits on the left or right are set to zero, and bits that fall off the ends vanish forever.
I’m lying a little because of how a lot of languages handle right shifting of negative numbers. If
you shift a negative number right, the new bits might be 1 instead of 0 depending on the language.
Python uses arbitrary precision integer math, so there are actually an infinite number of 1 bits on
the left of any negative number in Python, making things even weirder.
For now, best to just think about positive numbers.
The operator is << for left shift and >> for right shift in most languages (sorry, Ruby!). Let’s do an example:
>>> v = 0b00000101
>>> print(f"{v << 2:08b}")
00010100

There we had a byte in binary and we left-shifted it by 2 with v << 2. And you can see the 101 has moved
over 2 bits to the left!

### 40.7 Setting a Given Number of 1 bits
This is a little bit-hack we can do if we want to get a number with a certain number of contiguous bits set
to 1.
For example, what if I want a number with 12 bits set to one, namely:
0b111111111111

What would I have to do?
We can make use of a couple tricks here. Let’s start with trick #1.
If you want to set the nth bit to 1 (where the rightmost bit is bit number 0), you can raise 2 to that power
and get there.
Let’s set bit #5 to 1. We can take 2**5 which gives us 32. And 32 in binary is 100000. There we are.
Another option is to left-shift a 1 by 5 bits: 1 << 5 is 100000 in binary, which is 32 decimal.
That works.
But how do we get to our bit run of 1s from there?
Check this out: what’s 32 minus 1? 31. Not a trick question. But let’s look at those in binary:

100000
011111

Hey! It’s a run of 1s! Not only that, but it’s a run of 5 1s, just like we wanted! (This is analogous to
subtraction in decimal. 10,000 - 1 is 9,999. Just in binary we roll over to all 1s, not 9s.)
run_of_ones = (1 << count) - 1

Here’s our run of 12 1s:
>>> bin((1 << 12) - 1)
'0b111111111111'

If you like these sorts of bit-twiddling hacks, you might enjoy the book Hacker’s Delight. Chapter 2,
which covers a lot of these techniques had historically been distributed for free; you might be able to find
a PDF floating around.

Chapter 40. Appendix: Bitwise Operations

### 40.8 Reflect
- What is 2342 & 2332?
- What is 0b110101 | 112?
- What is ~0b101010010101 in binary? (Python will show the result as a negative number, but you
can turn it back positive by ANDing it with 0b111111111111. And don’t forget that Python leaves
off leading zeroes when it prints!)
- What is 16 << 1?
- What is 64 << 1?
- What is 4200 << 1? See the pattern?
- What is 16 >> 2?
- What is 0b11100111 << 3?
- What is (1 << 8) - 1?
- What is 0x01020304 & ((1 << 16) - 1)?

Chapter 41

Appendix: Installing Packet Tracer
This week we’re going to building a number of small networks in a simulator. This simulator, called
Packet Tracer is provided for free by Cisco (as long as you sign up for a free class, which you don’t have
to take–though it is useful).
This project is to get an account set up at Cisco, download Packet Tracer, and run it.

### 41.1 Download Packet Tracer
How to get your download directly (if you want to go via the online Cisco courses interface, see below):
1. Head to the Packet Tracer Download page.
2. Click “Log in”.
3. Create an account.
4. Click the download link for your OS.
