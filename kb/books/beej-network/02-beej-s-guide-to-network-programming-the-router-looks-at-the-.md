---
id: beej-network-02
title: "Beej's Guide to Network Programming — The router looks at the destination IP address. It consults its…"
slug: beej-network-02-beej-s-guide-to-network-programming-the-router-looks-at-the-
source: "Beej's Guide to Network Programming"
sourceSection: "2. The router looks at the destination IP address. It consults its routing table and decides to which, 2. Strip the sentence from the buffer., 3. Close the connection"
track: networking-dns
tier: premium
tags: [network-programming, sockets, c, tcp-ip]
summary: "Let’s start with the easier model that splits this transmission up into different layers from the top down. Covers 3 sections: The router looks at the destination IP address. It consults its routing table and decides to which, Strip the sen"
---
# Beej's Guide to Network Programming — The router looks at the destination IP address. It consults its…

## 2. The router looks at the destination IP address. It consults its routing table and decides to which
interface to forward the packet.
3. It sends it out to that interface, which wraps it up in another Ethernet frame and sends it to the next
router in line.

Chapter 4. The Layered Network Model

(Or maybe it’s not Ethernet! Ethernet is a protocol, and there are other low-level protocols in use
with fiber optic lines and so on. This is part of the beauty of these layers of abstraction–you can
switch protocols partway through transmission and the HTTP data above it is completely unaware
that any such thing has happened.)

### 4.3 The Internet Layer Model
Let’s start with the easier model that splits this transmission up into different layers from the top down.
(Note that the list of protocols is far from exhaustive.)

Structured application data

Data Integrity, packet splitting and
Physical, signals on wires

HTTP, FTP, TFTP, Telnet, SSH, SMTP,
POP, IMAP

Ethernet, PPP, token ring

You can see how different protocols take on the responsibilities of each layer in the model.
Another way to think of this is that all the programs that implement HTTP or FTP or SMTP can use TCP
or UDP to transmit data. (Typically all sockets programs and applications you write that implement any
protocol will live at the application layer.)
And all data that’s transmitted with TCP or UDP can use IP or IPv6 for routing.
And all data that uses IP or IPv6 for routing can use Ethernet or PPP, etc. for going over the wire.
And as a packet moves down through the layers before being transmitted over the wire, the protocols add
their own headers on top of everything else so far.
This model is complex enough for working on the Internet. You know what they say: as simple as possible,
but no simpler.
But there might be other networks in the Universe that aren’t the Internet, so there’s a more general model
out there that folks sometimes use: the OSI model.

### 4.4 The ISO OSI Network Layer Model
This is important to know if you’re taking a certification test or if you’re going into the field as more than
a regular programmer.
The Internet Layer Model is a special case of this more-detailed model called the ISO OSI model. (Bonus
points for being a palindrome.) It’s the International Organization for Standardization Open Systems
Interconnect model. I know that “ISO” is not a direct English abbreviation for “International Organization
for Standardization”, but I don’t have enough global political influence to change that.
Coming back to reality, the OSI model is like the Internet model, but more granular.
The Internet model maps to the OSI model, like so, with a single layer of the Internet model mapping to
multiple layers of the OSI model:
ISO OSI Layer

Internet Layer

Presentation
Session
Data link

### 4.5 Reflect

ISO OSI Layer

Internet Layer

Physical

And if we look at the OSI model, we can see some of the protocols that exist at those various layers, similar
to what we saw with the Internet model, above.
ISO OSI

Structured application data

Presentation
Session

Encoding translation, encryption, compression
Suspending, terminating, restarting sessions
between computers
Data integrity, packet splitting and reassembly
Encapsulation into frames
Physical, signals on wires

HTTP, FTP, TFTP, Telnet, SMTP,
POP, IMAP
MIME, SSL/TLS, XDR
Sockets, TCP

Data link
Physical

IP IPv6, ICMP
Ethernet, PPP, SLIP
Ethernet physical layer, DSL,
ISDN

We’re going to stick with the Internet model for this course since it’s good enough for 99.9% of the network
programming work you’d ever be likely to do. But please be aware of the OSI model if you’re going into
an interview for a network-specific programming position.

### 4.5 Reflect
- When a router sees an IP address, how does it know where to forward it?
- If an IPv4 address is 4 bytes, roughly how many different computers can that represent in total,
assuming each computer has a unique IP address?
- Same question, except for IPv6 and its 16-byte addresses?
- Bonus question for stats nerds: The odds of winning the super lotto jackpot are approximately 300
million to 1. What are the odds of randomly picking my pre-selected 16-byte (128-bit) number?
- Speculate on why the IP header wraps up the TCP header in the layered model, and not the other
way around.
- If UDP is unreliable and TCP is reliable, speculate on why one might ever use UDP.

Chapter 4. The Layered Network Model

Chapter 5

Project: HTTP Client and Server
We’re going to write a sockets program that can download files from a web server! This is going to be
our “web client”. This will work with almost any web server out there, if we code it right.
And as if that’s not enough, we’re going to follow it up by writing a simple web server! This program will
be able to handle requests from the web client we write… or indeed any other web client such as Chrome
or Firefox!
These programs are going to speak a protocol you have probably heard of: HTTP, the HyperText Transport
Protocol.
And because they speak HTTP, and web browsers like Chrome speak HTTP, they should be able to communicate!

### 5.1 Restrictions
In order to better understand the sockets API at a lower level, this project may not use any of the following
helper functions:
- The socket.create_connection() function.
- The socket.create_server() function.
- Anything in the urllib modules.
After coding up the project, it should be more obvious how these helper functions are implemented.

### 5.2 Python Character Encoding
The sockets in Python send and receive sequences of bytes, which are different than Python strings. You’ll
have to convert back and forth when you want to send a string, or when you want to print a byte sequence
as a string.
The sequences of bytes depend on the character encoding used by the string. The character encoding
defines which bytes correspond to which characters. Some encodings you might have heard of are ASCII
and UTF-8. There are hundreds.
The default character encoding of the web is “ISO-8859-1”.
This is important because you have to encode your Python strings into a sequence of bytes and you can
tell it the encoding when you do that. (It defaults to UTF-8.)
To convert from a Python string to an ISO-8859-1 sequence of bytes:
s = "Hello, world!"
b = s.encode("ISO-8859-1")

That sequence of bytes is ready to send over the socket.

To convert from a byte sequence you received from a socket in ISO-8859-1 format to a string:
s = b.decode("ISO-8859-1")

And then it’s ready to print.
Of course, if the data is not encoded with ISO-8859-1, you’ll get weird characters in your string or an
error.
The encodings ASCII, UTF-8, and ISO-8859-1 are all the same for your basic latin letters, numbers, and
punctuation, so your strings will all work as expected unless you start getting into some weird Unicode
characters.
If you’re writing this in C, it’s probably best just not to worry about it and print the bytes out as you get
them. A few might be garbage, but it’ll work for the most part.

### 5.3 HTTP Summary
HTTP operates on the concept of requests and responses. The client requests a web page, the server
responds by sending it back.
A simple HTTP request from a client looks like this:
GET / HTTP/1.1
Host: example.com

That shows the request header which consists of the request method, path, and protocol on the first line,
followed by any number of header fields. There is a blank line at the end of the header.
This request is saying “Get the root web page from the server example.com and I’m going to close the
connection as soon as I get your response.”
Ends-of-line are delimited by a Carriage Return/Linefeed combination. In Python or C, you write a CRLF
like this:
"\r\n"

If you were requesting a specific file, it would be on that first line, for example:
GET /path/to/file.html HTTP/1.1

(And if there were a payload to go with this header, it would go just after the blank line. There would also
be a Content-Length header giving the length of the payload in bytes. We don’t have to worry about
this for this project.)
A simple HTTP response from a server looks like:
Content-Type: text/plain
Content-Length: 6
Hello!

This response says, “Your request succeeded and here’s a response that’s 6 bytes of plain text. Also, I’m
going to close the connection right after I send this to you. And the response payload is ‘Hello!’.”
Notice that the Content-Length is set to the size of the payload: 6 bytes for Hello!.
Another common Content-Type is text/html when the payload has HTML data in it.

### 5.4 The Client

### 5.4 The Client
The client should be named webclient.py.
You can write the client before the server first and then test it on a real, existing webserver. No need to
write both the client and server before you test this.
The goal with the client is that you can run it from the command line, like so:
$ python webclient.py example.com

for output like this:
Age: 586480
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Thu, 22 Sep 2022 22:20:41 GMT
Etag: "3147526947+ident"
Expires: Thu, 29 Sep 2022 22:20:41 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Server: ECS (sec/96EE)
Vary: Accept-Encoding
X-Cache: HIT
Content-Length: 1256
<!doctype html>
<html>
<head>
<title>Example Domain</title>
...

(Output truncated, but it would show the rest of the HTML for the site.)
Notice how the first part of the output is the HTTP response with all those fields from the server, and then
there’s a blank line, and everything following the blank line is the response payload.
ALSO: you need to be able specify a port number to connect to on the command line. This defaults to
port 80 if not specified. So you could connect to a webserver on a different port like so:
$ python webclient.py example.com 8088

Which would get you to port 8088.
First things first, you need the socket module in Python, so
import socket

at the top. Then you have access to the functionality.
Here are some Python-specifics:
- Use socket.socket() to make a new socket. You don’t have to pass it anything–the default
parameter values work for this project.
- Use s.connect() to connect the new socket to a destination. You can bypass the DNS step since
.connect() does it for you.
This function takes a tuple as an argument that contains the host and port to connect to, e.g.

("example.com", 80)

- Build and send the HTTP request. You can use the simple HTTP request shown above. Don’t
forget the blank line at the end of the header, and don’t forget to end all lines with "\r\n"!
I recommend using the s.sendall() method to do this. You could use .send() instead but it
might only send part of the data.
(C programmers will find an implementation of sendall() in Beej’s Guide.)
- Receive the web response with the s.recv() method. It will return some bytes in response. You’ll
have to call it several times in a loop to get all the data from bigger sites.
It will return a byte array of zero elements when the server closes the connection and there’s no
more data to read, e.g.:
d = s.recv(4096)
if len(d) == 0:

- Call s.close() on your socket when you’re done.
Test the client by hitting some websites with it:
$ python webclient.py example.com
$ python webclient.py google.com
$ python webclient.py oregonstate.edu

### 5.5 The Server
The server should be named webserver.py.
You’ll launch the webserver from the command line like so:
$ python webserver.py

and that should start it listening on port 28333.
Code it so we could also specify an optional port number like this:
$ python webserver.py 12399

The server is going to going to run forever, handling incoming requests. (Forever means “until you hit
CTRL-C”.)
And it’s only going to send back one thing no matter what the request is. Have it send back the simple
server response, shown above.
So it’s not a very full-featured webserver. But it’s the start of one!
Here are some Python specifics:
- Get a socket just like you did for the client.
- After the call to socket(), you should add this crazy-looking line:
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

where s is the socket descriptor you got from socket(). This will prevent an “Address already in
use” error on the bind() in certain circumstances which would certainly be confusing at the time.
Usually it happens after the server crashes. Later on we’ll figure out why that error occurs.

### 5.6 Hints and Help

If you do get that error and don’t feel like adding this line of code because you’re feeling contrary,
you can also just wait a few minutes for the OS to give up on the broken connection..
- Bind the socket to a port with s.bind(). This takes one argument, a tuple containing the address
and port you want to bind to. The address can be left blank to have it choose a local address. For
example, “Any local address, port 28333” would be passed like so:
('', 28333)

- Set the socket up to listen with s.listen().
- Accept new connections with s.accept(). Note that this returns a tuple. The first item in the tuple
is a new socket representing the new connection. (The old socket is still listening and you will call
s.accept() on it again after you’re done handling this request.)
new_conn = s.accept()
new_socket = new_conn[0]

- Receive the request from the client. You should call new_socket.recv() in a loop similar to how
you did it with the client.
When you see a blank line (i.e. "\r\n\r\n") in the request, you’ve read enough and can quit
receiving.
(We don’t handle payloads in the request for this project. The right thing to do would be to look for
a Content-Length header and then receive the header plus that many bytes. But that’s a stretch
goal for you.)
Beware: you can’t just loop until recv() returns an empty string this time! This would only happen
if the client closed the connection, but the client isn’t closing the connection and it’s waiting for a
response. So you have to call recv() repeatedly until you see that blank line delimiting the end of
the header.
- Send the response. You should just send the “simple server reponse”, from above.
- Close the new socket with new_socket.close().
- Loop back to s.accept() to get the next request.
Now run the web server in one window and run the client in another, and see if it connects!
Once it’s working with webclient.py, try it with a web browser!
Run the server on an unused port (choose a big one at random):
$ python webserver.py 20123

Go to the URL http://localhost:20123/ to view the page. (localhost is the name of “this computer”.)
If it works, great!
Try printing out the value returned by .accept(). What’s in there?
Did you notice that if you use a web browser to connect to your server, the browser actually makes two
connections? Dig into it and see if you can figure out why!

### 5.6 Hints and Help
#### 5.6.1 Address Already In Use
If your server crashes and then you start getting an “Address already in use” error when you try to restart
it, it means the system hasn’t finished cleaning up the port. (In this case “address” refers to the port.)
Either switch to a different port for the server, or wait a minute or two for it to timeout and clean up.

#### 5.6.2 Receiving Partial Data
Even if you tell recv() that you want to get 4096 bytes, there’s no guarantee that you’ll get all of those.
Maybe the server sent fewer. Maybe the data got split in transit and only part of it is here.
This can get tricky when processing an HTTP request or response because you might call recv() and
only get part of the data. Worse, the data might get split in the middle of the blank line delimiter at the
end of the header!
Don’t assume that a single recv() call gets you all the data. Always call it in a loop, appending the data
to a buffer, until you have the data you want.
recv() will return an empty string (in Python) or 0 (in C) if you try to read from a connection that the
other side has closed. This is how you can detect that closure.

#### 5.6.3 HTTP 301, HTTP 302
If you run the client and get a server response with code 301 or 302, probably along with a message that
says Moved Permanently or Moved Temporarily, this is the server indicating to you that the particular
resource you’re trying to get at the URL has moved to a different URL.
If you look at the headers below that, you’ll find a Location: header field.
For example, attempting to run webclient.py google.com results in:
HTTP/1.1 301 Moved Permanently
Location: http://www.google.com/
Content-Type: text/html; charset=UTF-8
Date: Wed, 28 Sep 2022 20:41:09 GMT
Expires: Fri, 28 Oct 2022 20:41:09 GMT
Cache-Control: public, max-age=2592000
Server: gws
Content-Length: 219
X-XSS-Protection: 0
X-Frame-Options: SAMEORIGIN
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>
Connection closed by foreign host.

Notice the first line is telling us the resource we’re looking for has moved.
The second line with the Location: field tells us to where it has moved.
When a web browser sees a 301 redirect, it automatically goes to the other URL so you don’t have to
worry about it.
Try it! Enter google.com in your browser and watch it update to www.google.com after a moment.

#### 5.6.4 HTTP 400, HTTP 501 (or any 500s)
If you run the client and get a response from a server that has the code 400 or any of the 500s, odds are
you have made a bad request. That is, the request data you sent was malformed in some way.
Make sure every field of the header ends in \r\n and that the header is terminated by a blank line
(i.e. \r\n\r\n are the last 4 bytes of the header).

### 5.7 Extensions

#### 5.6.5 HTTP 404 Not Found!
Make sure you have the Host: field set correctly to the same hostname as you passed in on the command
line. If this is wrong, it’ll 404.

### 5.7 Extensions
These are here if you have time to give yourself the additional challenge for greater understanding of the
material. Push yourself!
- Modify the server to print out the IP address and port of the client that just connected to it. Hint:
look at the value returned by accept() in Python.
- Modify the client to be able to send payloads. You’ll need to be able to set the Content-Type and
Content-Length based on the payload.
- Modify the server to extract and print the “request method” from the request. This is most often
GET, but it could also be POST or DELETE or many others.
- Modify the server to extract and print a payload sent by the client.

Chapter 6

The Internet Protocol (IP)
This protocol is responsible for routing packets of data around the Internet, analogous to how the post
office is responsible for routing letters around the mail network.
Like with the post office, data on the Internet has to be labeled with a source and destination address,
called the IP address.
The IP address is a sequence of bytes that uniquely identifies every computer on the Internet.

### 6.1 Terminology
- Host - another name for “computer”.

### 6.2 Two Common Versions
There are two commonly used versions of IP: version 4 and version 6.
IP version 4 is referred to as “IPv4” or just plain “IP”.
IP version 6 is usually explicitly specified as “IPv6”.
You can tell the difference between the two by glancing at an IP address:
- Version 4 IP address example: 192.168.1.3
- Version 6 IP address example: fe80::c2b6:f9ff:fe7e:4b4
The main difference is the number of bytes that make up the address space. IPv4 uses 4 bytes per address,
and IPv6 uses 16 bytes.

### 6.3 Subnets
Every IP address is split into two portions.
The initial bits of the IP address identify individual networks.
The trailing bits of an IP address identify individual hosts (i.e. computers) on that network.
These individual networks are called subnets and the number of hosts they can support depends on how
many bits they’re reserved for identifying hosts on that subnet.
As a contrived non-Internet example, let’s look at an 8-bit “address”, and we’ll say the first 6 bits are the
network number and the last 2 bits are the host number.
So an address like this:

Chapter 6. The Internet Protocol (IP)

00010111

is split into two parts (because we said the first 6 bits were the network number):
------000101

Host
---11

So this is network 5 (101 binary), host 3 (11 binary).
The network part always comes before the host part.
Note that if there are only two “host” bits, there can only be 4 hosts on the network, numbered 0, 1, 2, and
3 (or 00, 01, 10, and 11 in binary).
And with IP, it would actually only be two hosts, because hosts with all zero bits or all one bits are reserved.
The next chapters will look at specific subnet examples for IPv4 and IPv6. The important part now is that
each address is split into network and host parts, with the network part first.

### 6.4 Additional IP-layer Protocols
There are some related protocols that also work in concert with IP and at the same layer in the network
stack.
- ICMP: Internet Control Message Protocol, a mechanism for communicating IP nodes to talk about
IP control metadata with one another.
- IPSec: Internet Protocol Security, encryption and authentication functionality. Commonly used
with VPNs (Virtual Private Networks).
Users commonly interface with ICMP when using the ping utility. This uses ICMP “echo request” and
“echo response” messages.
The traceroute utility uses ICMP “time exceeded” messages to find out how packets are being routed.

### 6.5 Private Networks
There are private networks hidden behind routers that do not have globally unique IP addresses on their
machines. (Though they do have unique addresses within the LAN itself.)
This is made possible through the magic of a mechanism called NAT (Network Address Translation). But
this is a story for the future.
For now, let’s just pretend all our addresses are globally unique.

### 6.6 Static versus Dynamic IP Addresses, and DHCP
If you have clients hitting your website, or you have a server that you want to SSH into repeatedly, you’ll
need a static IP. This means you get a globally-unique IP address assigned to you and it never changes.
This is like having a house number that never changes. If you need people to be able to find your house
repeatedly, this needs to be the case.
But since there are a limited number of IPv4 addresses, static IPs cost more money. Often an ISP will
have a block of IPs on a subnet that they dynamically allocate on-demand.
This means when you reboot your broadband modem, it might end up with a different public-facing IP
address when it comes back to life. (Unless you’ve paid for a static IP.)
Indeed, when you connect your laptop to WiFi, you also typically get a dynamic IP address. Your computer
connects to the LAN and broadcasts a packet saying, “Hey, I’m here! Can anyone tell me my IP address?
Pretty please with sugar on top?”

### 6.7 Reflect

And this is OK because people aren’t generally trying to connect to servers on your laptop. It’s usually
the laptop that’s connecting to other servers.
How does it work? On one of the servers on the LAN is a program that is listening for such requests,
which conform to DHCP (the Dynamic Host Configuration Protocol). The DHCP server keeps track of
which IP addresses on the subnet are already allocated for use, and which are free. It allocates a free one
and sends back a DHCP response that has your laptop’s new IP address, as well as other data about the
LAN your computer needs (like subnet mask, etc.).
If you have WiFi at home, you very likely already have a DHCP server. Most routers come from your ISP
with DHCP already set up, which is how your laptop gets its IP address on your LAN.

### 6.7 Reflect
- How many times more IPv6 addresses are there than IPv4 addresses?
- Applications commonly also implement their own encryption (e.g. ssh or web browsers with
HTTPS). Speculate on the advantages or disadvantages for having IPSec at the Internet layer
instead of doing encryption at the Application layer.
- If subnet reserved 5 bits to identify hosts, how many hosts can it support? Don’t forget that all-zerobits and all-one-bits for the host are reserved.
- What is the benefit to having a static IP? How does it relate to DNS?

Chapter 6. The Internet Protocol (IP)

Chapter 7

The Internet Protocol version 4
This is the first popular version of the Internet Protocol, and it lives to this day in common use.

### 7.1 IP Addresses
An IPv4 address is written in “dots and numbers” notation, like so:
198.51.100.125

It’s always four numbers. Each number represents a byte, so it can go from 0 to 255 (00000000 to
11111111 binary).
This means that every IPv4 address is four bytes (32 bits) in size.

### 7.2 Subnets
The entire space of IP addresses is split up into subnets. The first part of the IP address indicates the subnet
number we’re talking about. The remaining part indicates the computer on that subnet in question.
And how many bits “the first part of the IP” constitutes is variable.
When you set up a network with public-facing IP addresses, you are allocated a subnet by whomever you
are paying to provide you with a connection. The more hosts your subnet supports, the more expensive it
is.
So you might say, “I need 180 IP static IP addresses.”
And your provider says, OK, that means you’ll have 180 IPs and 2 reserved (0 and the highest number),
so 182 total. We need 8 bits to represent the numbers 0-255, which is the smallest number of bits that
includes 182.
And so they allocate you a subnet that has 24 network bits and 8 host bits.
They could write out something like:
Your subnet is 198.51.100.0 and there are 24 network bits and 8 host
bits.

But that’s really verbose. So we use slash notation:
198.51.100.0/24

This tells us that 24 bits of the IP address represent the network number. (And therefore 32-24=8 bits
represent the host.) But what does that mean?

Chapter 7. The Internet Protocol version 4

Drawing it out:
---------198.51.100.0
8 host bits

Or converting all those numbers to binary:
-------------------------------+--------11000110 . 00110011 . 01100100 . 00000000

The upshot is that every single IP on our make-believe network here is going to start with 198.51.100.x.
And that last byte is going to indicate which host we’re talking about.
Here are some example IPs on our network:
198.51.100.2
198.51.100.3
198.51.100.4
198.51.100.30
198.51.100.212

But these two addresses have special meaning (see below):
198.51.100.0
198.51.100.255

Reserved
Broadcast (see below)

but other than those, we can use the other IPs as we see fit.
Now, I deliberately chose an example there where the subnet ended on a byte boundary because it’s easier
to see if the entire last byte is the host number.
But there’s no law about that. We could easily have a subnet like this:
198.51.100.96/28

In that case we have:
28 network bits
| 4 host bits
-------------------------------------+---11000110 . 00110011 . 01100100 . 0110 0000

and we could only fill those last 4 bits with different numbers to represent our hosts.
0000 and 1111 are reserved and broadcast, leaving us with 14 more we could use for host numbers.

For example, we could fill in those last 4 bits with host number 2 (which is 0010 binary):
28 network bits
| 4 host bits
-------------------------------------+---11000110 . 00110011 . 01100100 . 0110 0010
98

Giving the IP address 198.51.100.98.

### 7.3 Subnet Masks

All the IP addresses on this subnet are, exhaustively 198.51.100.96 through 198.51.100.111 (though
these first are last IPs are reserved and broadcast, respectively).
Finally, if you have a subnet you own, there’s nothing stopping you for further subnetting it down–
declaring that more bits are reserved for the network portion of the address.
ISPs (Internet Service Providers, like your cable or DSL company) do this all the time. They’ve given a
big subnet with, say, 12 network bits (20 host bits, for 1 million possible hosts). And they have customers
who want their own subnets. So the ISP decides the next 9 bits (for example) are going to be used to
uniquely identify additional subnets within the ISP’s subnet. And it sells those to customers, and each
customer gets 11 bits for hosts (supporting 2048 hosts).
ISP network |
Subnets |
Hosts
(12 bits)
| (9 bits) | (11 bits)
---------------+------------+-------------11010110 . 1100 0101 . 11011 001 . 00101101

[example IP]

But it doesn’t even stop there, necessarily. Maybe one of those customers you sold an 11-bit subnet to
wants to further subdivide it–they can add more network bits to define their own subnets. Of course, every
time you add more network bits, you’re taking away from the number of hosts you can have, but that’s
the tradeoff you have to make with subnetting.

### 7.3 Subnet Masks
Another way of writing subnet is with a subnet mask. This is a number that when bitwise-ANDed with
any IP address will give you the subnet number.
What does that mean? And why?
The subnet mask is also written with dots-and-numbers notation, and looks like an IP address with all the
subnet bits set to 1.
For example, if we have the subnet 198.51.100.0/24, that means we have:
-------------------------------+--------11000110 . 00110011 . 01100100 . 00000000

Putting a 1 in for all the network bits, we end up with:
-------------------------------+--------11111111 . 11111111 . 11111111 . 00000000
255
255
255

So the subnet mask for 198.51.100.0/24 is 255.255.255.0. It’s the same subnet mask for any /24
subnet.
The subnet mask for a /16 subnet has the first 16 bits set to 1: 255.255.0.0.
But why? Turns out a router can take any IP address and quickly determine its destination subnet by
ANDing the IP address with the subnet mask.
-------------------------------+--------11000110 . 00110011 . 01100100 . 01000011
198. 51.100.67
& 11111111 . 11111111 . 11111111 . 00000000 & 255.255.255. 0
------------------------------------------- ---------------11000110 . 00110011 . 01100100 . 00000000
198. 51.100. 0

Chapter 7. The Internet Protocol version 4

And so the subnet for the IP address 198.51.100.67 with subnet mask 255.255.255.0 is
198.51.100.0.

### 7.4 Historic Subnets
(This information is only included for historical interest.)
Before the idea that any number of bits could be reserved for the network, subnets were split into 3 main
classes:
- Class A - Subnet mask 255.0.0.0 (or /8), supports 16,777,214 hosts
- Class B - Subnet mask 255.255.0.0 (or /16), supports 65,534 hosts
- Class C - Subnet mask 255.255.255.0 (or /24) supports 254 hosts
The problem was that this caused a really uneven distribution of subnets, with some large companies
getting 16 million hosts (that they didn’t need), and there was no subnet class that supported a sensible
number of computers, like 1,000.
So we switched to the more-flexible “any number of bits in the mask” approach.

### 7.5 Special Addresses
There are a few common addresses that are worth noting:
- 127.0.0.1 - this is the computer you are on now. It’s often mapped to the name localhost.
- 0.0.0.0 - Reserved. Host 0 on any subnet is reserved.
- 255.255.255.255 - Broadcast. Intended for all hosts on a subnet. Though it seems like this would
broadcast to the entire Internet, routers don’t forward packets intended for this address.
You can also broadcast to your local subnet by sending to the host with all bits set to 1. For example,
the subnet broadcast address for 198.51.100.0/24 is 198.51.100.255.

### 7.6 Special Subnets
There are some reserved subnets you might come across:
- 10.0.0.0/8 - Private network addresses (very common)
- 127.0.0.0/8 - This computer, via the loopback device.
- 172.16.0.0/12 - Private network addresses
- 192.0.0.0/24 - Private network addresses
- 192.0.2.0/24 - Documentation
- 192.168.0.0/16 - Private network addresses (very common)
- 198.18.0.0/15 - Private network addresses
- 198.51.100.0/24 - Documentation
- 203.0.113.0/24 - Documentation
- 233.252.0.0/24 - Documentation
You’ll find your home IPs are in one of the “Private” address ranges. Probably 192.168.x.x.
Any documentation that you write that requires example (not real) IP addresses should use any of the ones
marked “Documentation”, above.

### 7.7 Reflect
- 192.168.262.12 is not a valid IP address. Why?
- Reflect on some of the advantages of the subnet concept as a way of dividing the global address
space.

### 7.7 Reflect

- What is your computer’s IPv4 address and subnet mask right now? (You might have to search how
to find this for your particular OS.)
- If a IP address is listed as 10.37.129.212/17, how many bits are used to represent the hosts?

Chapter 7. The Internet Protocol version 4

Chapter 8

The Internet Protocol version 6
This is the new big thing! Since there are so few addresses representable in 32 bits (only 4,294,967,296
not counting the reserved ones), the Powers That Be decided we needed a new addressing scheme. One
with more bits. One that could last, for all intents and purposes, forever.
There was a problem: we were running out of IP addresses. Back in the 1970s, a world with billions of
computers was beyond imagination. But today, we’ve already exceeded this by orders of magnitude.
So they decided to increase the size of IP addresses from 32 bits to 128 bits, which gives us
79,228,162,514,264,337,593,543,950,336 times as much address space. This should genuinely last a
looooooong time.
Lots of this address space is reserved, so there aren’t really that many addresses. But there are still
a LOT, both imperial and metric.
That’s the main difference between IPv4 and IPv6.
For demonstration purposes, we’ll stick with IPv4 because it’s still common and a little easier to write out.
But this is good background information to know, since someday IPv6 will be the only game in town.
Someday.

### 8.1 Representation
With that much address space, dots-and-decimal numbers won’t cut it. So they came up with a new way
of displaying IPv6 addresses: colons-and-hex numbers. And each hex number is 16 bits (4 hex digits), so
we need 8 of those numbers to get us to 128 bits.
For example:
2001:0db8:6ffa:8939:163b:4cab:98bf:070a

Slash notation is used for subnetting just like IPv4. Here’s an example with 64 bits for network (as
specified with /64) and 64 bits for host (since 128-64=64):
2001:0db8:6ffa:8939:163b:4cab:98bf:070a/64

64 bits for host! That means this subnet can have 18,446,744,073,709,551,616 hosts!
There’s a lot of space in an IPv6 address!
When we’re talking about standard IPv6 addresses for particular hosts, /64 is the stronglysuggested rule for how big your subnet is. Some protocols rely on it.
But when we’re just talking about subnets, you might see smaller numbers there representing larger
address spaces. But the expectation is that eventually that space will be partitioned down into /64

Chapter 8. The Internet Protocol version 6

subnets for use by individual hosts.

Now, writing all those hex numbers can be unwieldy, especially if there are large runs of zeros in them.
So there are a couple shortcut rules.
1. Leading zeros on any 16-bit number can be removed.
2. Runs of multiple zeros after rule 1 has been applied can be replaced with two sequential colons.
For example, we might have the address:
2001:0db8:6ffa:0000:0000:00ab:98bf:070a

And we apply the first rule and get rid of leading zeros:
2001:db8:6ffa:0:0:ab:98bf:70a

And we see we have a run of two 0s in the middle, and we can replace that with two colons:
2001:db8:6ffa::ab:98bf:70a

In this way we can get a more compact representation.

### 8.2 Link-Local Addresses
[This is “good to know” information, but just file it away under “IPv6 automatically gives all interfaces
an IP address”.]
There are addresses in IPv6 and IPv4 that are reserved for hosts on this particular LAN. These aren’t
commonly used in IPv4, but they’re required in IPv6. The addresses are all on subnet fe80::/10.
Expanded out, this is:
fe80:0000:0000:0000:0000:0000:0000:0000

The first 10 bits being the network portion. In an IPv6 link-local address, the next 54 bits are reserved (0)
and then there are 64 bits remaining to identify the host.
When an IPv6 interface is brought up, it automatically computes its link-local address based on its Ethernet
address and other things.
Link-local addresses are unique on the LAN, but might not be globally-unique. Routers do not forward
any link-local packets out of the LAN to prevent issues with duplicate IPs.
An interface might get a different IP later if a DHCP server hands one out, for example, in which case it’ll
have two IPs.

### 8.3 Special IPv6 Addresses and Subnets
Like with IPv4, there are a lot of addresses that have special meaning.
- ::1 - localhost, this computer, IPv6 version of 127.0.0.1
- 2001:db8::/32 - for use in documentation
- fe80::/10 - link local address
There are IPv6 ranges with special meanings, but those are the common ones you’ll see.

### 8.4 IPv6 and DNS
DNS maps human-readable names to IPv6 addresses, as well. You can look them up with dig by telling
it to look for an AAAA record (which is what DNS calls IPv6 address records).

### 8.5 IPv6 and URLs

$ dig example.com AAAA

; <<>> DiG 9.10.6 <<>> example.com AAAA
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 13491
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;example.com.
AAAA
81016

AAAA

2606:2800:220:1:248:1893:25c8:1946

;; Query time: 14 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Wed Sep 28 16:05:16 PDT 2022
;; MSG SIZE rcvd: 68

You can see the IPv6 address of example.com in the ANSWER SECTION, above.

### 8.5 IPv6 and URLs
Since a URL uses the : character to delimit a port number, that meaning collides with the : characters
used in an IPv6 address.
If you run your server on port 33490, you can connect to it in your web browser by putting the IPv6
address in square brackets. For example, to connect to localhost on address ::1, you can:
http://[::1]:33490/

### 8.6 Reflect
- What are some benefits of IPv6 over IPv4?
- How can the address 2001:0db8:004a:0000:0000:00ab:ab4d:000a be written more simply?

Chapter 8. The Internet Protocol version 6

Chapter 9

Project: A Better Web Server
Time to improve the web server so that it serves actual files!
We’re going to make it so that when a web client (in this case we’ll use a browser) requests a specific file,
the webserver will return that file.
There are some interesting details to be found along the way.

### 9.1 Restrictions
In order to better understand the sockets API at a lower level, this project may not use any of the following
helper functions:
- The socket.create_connection() function.
- The socket.create_server() function.
- Anything in the urllib modules.
After coding up the project, it should be more obvious how these helper functions are implemented.

### 9.2 The Process
If you go to your browser and enter a URL like this (substituting the port number of your running server):
http://localhost:33490/file1.txt

The client will send a request to your server that looks like this:
GET /file1.txt HTTP/1.1
Host: localhost

Notice the file name is right there in the GET request on the first line!
Your server will:
1. Parse that request header to get the file name.
2. Strip the path off for security reasons.
3. Read the data from the named file.
4. Determine the type of data in the file, HTML or text.
5. Build an HTTP response packet with the file data in the payload.
6. Send that HTTP response back to the client.
The response will look like this example file:

Chapter 9. Project: A Better Web Server

Content-Type: text/html
Content-Length: 357
<!DOCtype html>
<html>
<head>
...

[The rest of the HTML file has been truncated in this example.]
At this point, the browser should display the file.
Notice a couple things in the header that need to be computed: the Content-Type will be set according
to the type of data in the file being served, and the Content-Length will be set to the length in bytes of
that data.
We’re going to want to be able to display at least two different types of files: HTML and text files.

### 9.3 Parsing the Request Header
You’ll want to read in the full request header, so your probably doing something like accumulating data
from all your recv()s in a single variable and searching it (with something like string’s .find() method
to find the "\r\n\r\n" that marks the end of the header.
At that point, you can .split() the header data on "\r\n" to get individual lines.
The first line is the GET line.
You can .split() that single line into its three parts:
(e.g. /file1.txt), and the protocol (HTTP/1.1).

the request method (GET), the path

Don’t forget to .decode("ISO-8859-1") the first line of the request so that you can use it as a string.
We only really need the path.

### 9.4 Stripping the Path down to the Filename
SECURITY RISK! If we don’t strip the path off, a malicious attacker could use it to accesss arbitrary
files on your system. Can you think of how they might build a URL that reads /etc/password?
Real web servers just check to make sure the path is restricted to a certain directory hierarchy, but we’ll
take the easy way and just strip all the path information off and only serve files from the directory the
webserver is running in.
The path is going to be made up of directory names separated by a slash (/), so the easiest thing to do at
this point is to use .split('/') on your path and filename, and then look at the last element.
fullpath = "/foo/bar/baz.txt"
file_name = fullpath.split("/")[-1]

A more portable way is to use the standard library function os.path.split. The value returned by
os.path.split is will be a tuple with two elements, the second of which is the file name:
fullpath = "/foo/bar/baz.txt"
os.path.split(fullpath)

### 9.5 MIME and Getting the Content-Type

=> ('/foo/bar', 'baz.txt')

Select the last element:
fullpath = "/foo/bar/baz.txt"
file_name = os.path.split(fullpath)[-1]

Use that to get the file name you want to serve.

### 9.5 MIME and Getting the Content-Type
In HTTP, the payload can be anything–any collection of bytes. So how does the web browser know how
to display it?
The answer is in the Content-Type header, which gives the MIME type of the data. This is enough for
the client to know how to display it.
Some example MIME types:
MIME Type

Description

text/plain
text/html
application/pdf
image/jpeg
image/gif
application/octet-stream

Plain text file
HTML file
PDF file
JPEG image
GIF image
Generic unclassified data

There are a lot of MIME types to identify any kind of data.
You put these right in the HTTP response in the Content-Type header:
Content-Type: application/pdf

But how do you know what type of data a file holds?
The classic way to do this is by looking at the file extension, everything after the last period in the file
name.
Luckily, os.path.splitext() gives us an easy way to pull the extension off a file name:
os.path.splitext('keyboardcat.gif')

returns a tuple containing:
('keyboardcat', '.gif')

You can just map the following extensions for this assignment:
Extension

MIME Type

.txt
.html

text/plain
text/html

So if the file has a .txt extension, be sure to send back:

Chapter 9. Project: A Better Web Server

Content-Type: text/plain

in your response.
If you really want to be correct, add charset to your header to specify the character encoding:
Content-Type: text/plain; charset=iso-8859-1

but that’s not necessary, since browsers typically default to that encoding.

### 9.6 Reading the File, Content-Length, and Handling Not Found
Here’s some code to read an entire file and check for errors:
try:
with open(filename, "rb") as fp:
data = fp.read()
return data
except:

The data you get back from .read() is what will be the payload. Use len() to compute the number of
bytes.
The number of bytes will be send back in the Content-Length header, like so:
Content-Length: 357

(with the number of bytes of your file).
You might be wondering what the "rb" thing is in the open() call. This causes the file to open for
reading in binary mode. In Python, a file open for reading in binary mode will return a bytestring
representing the file that you can send straight out on the socket.
What about this 404 Not Found thing? It’s common enough that you’ve probably seen it in normal web
usage from time to time.
This just means you’ve requested a file or other resource that doesn’t exist.
In our case, we’ll detect some kind of file open error (with the except block, above) and return a 404
response.
The 404 response is an HTTP response, except instead of

our response will start with
HTTP/1.1 404 Not Found

So when you try to open the file and it fails, you’re going to just return the following (verbatim) and close
the connection:
HTTP/1.1 404 Not Found
Content-Type: text/plain
Content-Length: 13

### 9.7 Extensions

404 not found

(Both the content length and the payload can just be hardcoded in this case, but of course have to be
.encode()’d to bytes.)

### 9.7 Extensions
These are here if you have time to give yourself the additional challenge for greater understanding of the
material. Push yourself!
- Add MIME support for other file types so you can serve JPEGs and other files.
- Add support for showing a directory listing. If the user doesn’t specify a file in the URL, show a
directory listing where each file name is a link to that file.
Hint: os.listdir and os.path.join()
- Instead of just dropping the entire path, allow serving out of subdirectories from a root directory
your specify on the server.
SECURITY RISK! Make sure the user can’t break out of the root directory by using a bunch of
..s in the path!
Normally you’d have some kind of configuration variable that specified the server root directory
as an absolute path. But if you’re in one of my classes, that would make my life miserable when I
went to grade projects. So if that’s the case, please use a relative path for your server root directory
and create a full path with the os.path.abspath() function.
server_root = os.path.abspath('.')
server_root = os.path.abspath('./root')

This would set server_root to a full path to where you ran your server. For example, on my
machine, I might get:
/home/beej/src/webserver
/home/beej/src/webserver/root

Then when the user tries to GET some path, you can just append it to server root to get the path to
the file.
file_path = os.path.sep.join(server_root, get_path)

So if they tried to GET /foo/bar/index.html, then file_path would get set to:
/home/beej/src/webserver/foo/bar/index.html

And now the security crux! You have to make sure that file_path is within the server root
directory. See, a villain might try to:
GET /../../../../../etc/passwd HTTP/1.1

And if they did that, we’d unknowingly serve out this file:
/home/beej/src/webserver/../../../../../etc/passwd

which would get them to my password file in /etc/passwd. I don’t want that.
So I need to make sure that wherever they end up is still within my server_root hierarchy. How?
We can use abspath() again.

Chapter 9. Project: A Better Web Server

If I run the crazy .. path above through abspath(), it just returns /etc/passwd to me. It resolves
all the ..s and other things and returns the “real” path.
But I know my server root in this example is /home/beej/src/webserver, so I can just verify
that the absolute file path begins with that. And 404 if it doesn’t.
file_path = os.path.abspath(file_path)
if not file_path.startswith(server_root):
send_404()

### 9.8 Example Files
You can copy and paste these into files for testing purposes:

9.8.1 file1.txt
This is a sample text file that has all kinds of words in it that
seemingly go on for a long time but really don't say much at all.
And as that weren't enough, here is a second paragraph that continues
the tradition. And then goes for a further sentence, besides.

9.8.2 file2.html
<!DOCTYPE html>
<html>
<head>
<title>Test HTML File</title>
</head>
<body>
<h1>Test HTML</h1>
<p>This is my test file that has <i>some</i> HTML in in that the browser
should render as HTML.</p>
<p>If you're seeing HTML tags that look like this <tt>&lt;p&gt;</tt>,
you're sending it out as the wrong MIME type! It should be
<tt>text/html</tt>!</p>
<hr>
</body>
</html>

The idea is that these URLs would retrieve the above files (with the appropriate port given):
http://localhost:33490/file1.txt
http://localhost:33490/file2.html

Chapter 10

Endianness and Integers
We’ve done some work transmitting text over the network. But now we want to do something else: we
want to transfer binary integer data.
Sure we could just convert the numbers to strings, but this is more wasteful than it needs to be. Binary
representation is more compact and saves bandwidth.
But the network can only send and receive bytes! How can we convert arbitrary numbers to single bytes?
That’s what this chapter is all about.
We want to:
- Convert integers to byte sequences
- Convert byte sequences back into integers
And in this chapter we’ll look at:
- How numbers are represented by sequences of bytes
- What order those bytes go in
- How to convert a number to a sequence of bytes in Python
- How to convert a sequence of bytes to a number in Python
Key points to look out for:
- Integers can be represented by sequences of bytes.
- We’ll convert integers to sequences of bytes before we transmit them over the network.
- We’ll convert sequences of bytes back into integers when we receive them over the network.
- Big-Endian and Little-Endian are two different ways of ordering those sequences of bytes.
- Python offers built-in functionality for converting integers to sequences of bytes and back again.

### 10.1 Integer Representations
In this section we’ll dive deep into how an integer can be represented by a sequence of individual bytes.

#### 10.1.1 Decimal Byte Representation
Let’s look at how integers are represented as sequences of bytes. These sequences of bytes are what we’ll
send across the network to send integer values to other systems.
A single byte (in this context well define a byte to be the usual 8 bits) can encode binary values from
00000000 to 11111111. In decimal, these numbers go from 0 to 255.
So what happens if you want to store number larger than 255? Like 256? In that case, you need to use a
second byte to store the additional value.
The more bytes you use to represent an integer, the larger the range of integers you can represent. One
byte can store from 0 to 255. Two bytes can store from 0 to 65535.

Chapter 10. Endianness and Integers

Thinking about it another way, 65536 is the number of combinations of 1s and 0s you can have in a 16-bit
number.
This section is talking about non-negative integers only. Floating point numbers use a different
encoding. Negative integers use a similar technique to positive, but we’ll keep it simple for now
and ignore them.
Let’s take a look what happens when we count up from 253 to 259 in a 16-bit number. Since 259 is bigger
than a single byte can hold, we’ll use two bytes (holding numbers from 0 to 255), with the corresponding
decimal value represented on the right:
0 253
0 254
0 255

represents 253
represents 254
represents 255
represents 256
represents 257
represents 258
represents 259

Notice that the byte on the right “rolled over” from 255 to 0 like an odometer. It’s almost like that byte
is the “ones place” and the byte on the left is the “256s place”… like looking at a base-256 numbering
system, almost.
We could compute the decimal value of the number by taking the first byte and multiplying it by 256, then
adding on the value of the second byte:

- 256 +

3 = 259

Or in this example, where two bytes with values 17 and 178 represent the value 4530:
17 * 256 + 178 = 4530

Neither 17 not 178 are larger than 255, so they both fit in a single byte each.
So every integer can be perfectly represented by a sequence of bytes. You just need more bytes in the
sequence to represent larger numbers.

#### 10.1.2 Binary Byte Representations
Binary, hexadecimal, and decimal are just all different “languages” for writing down values.
So we could rewrite the entire previous section of the document by merely translating all the decimal
numbers to binary, and it would still be just as true.
In fact, let’s do it for the example from the previous section. Remember: this is numerically equivalent–we
just changed the numbers from decimal to binary. All other concepts are identical.
00000000 11111101
00000000 11111110
00000000 11111111
00000001 00000000
00000001 00000001
00000001 00000010
00000001 00000011

represents 11111101 (253 decimal)
represents 11111110 (254 decimal)
represents 11111111 (255 decimal)
represents 100000000 (256 decimal)
represents 100000001 (257 decimal)
represents 100000010 (258 decimal)
represents 100000011 (259 decimal)

But wait a second–see the pattern? If you just stick the two bytes together you end up with the exact same
number as the binary representation! (Ignoring leading zeros.)
Really all we’ve done is take the binary representation of a number and split it up into chunks of 8 bits.
We could take any arbitrary number like 1,256,616,290,962 decimal and convert it to binary:

### 10.2 Endianness

10010010010010100001010101110101010010010

and do the same thing, split it up into chunks of 8 bits:
1 00100100 10010100 00101010 11101010 10010010

Since we’re packing it into bytes, we should pad that leading 1 out to 8 bits like so:
00000001 00100100 10010100 00101010 11101010 10010010

And there you have it, the byte-by-byte representation of the number 1,256,616,290,962.

#### 10.1.3 Hexadecimal Byte Representations
Again, it doesn’t matter what number base we use–they’re just all different “languages” for representing
a numeric value.
Programmers like hex because it’s very compatible with bytes (each byte is 2 hex digits). Let’s do the
same chart again, this time in hex:
00 fd
00 fe
00 ff
01 00
01 01
01 02
01 03

represents 00fd (253 decimal)
represents 00fe (254 decimal)
represents 00ff (255 decimal)
represents 0100 (256 decimal)
represents 0101 (257 decimal)
represents 0102 (258 decimal)
represents 0103 (259 decimal)

Look at that again! The hex representation of the number is the same as the two bytes just crammed
together! Super-duper convenient.

### 10.2 Endianness
Ready to get a wrench thrown in the works?
I just finished telling you that a number like (in hex):
45f2

can be represented by these two bytes:
45 f2

But guess what! Some systems will represent 0x45f2 as:
f2 45

It’s backwards! This is analogous to me saying “I want 123 pieces of toast” when in fact I really wanted
321!
There’s a name for putting the bytes backward like this. We say such representations are little endian.
This means the “little end” of the number (the “ones” byte, if I can call it that) comes at the front end.
The more-normal, more-forward way to write it (like we did at first, where the number 0x45f2 was
reasonably represented in the order 45 f2) is called big endian. The byte in the largest value slot (also
called the most-significant byte) is at the front end.
The bad news is that virtually all Intel CPU models are little-endian.

Chapter 10. Endianness and Integers

The good news is that Mac M1s are big-endian.

The even better news is that all network numbers are transmitted as big-endian, the sensible way.
And when I say “all”, I mean “a certain amount”[^—Monty Python]. If both sides agree to transmit
in little endian, there’s no law against that. This would make sense if the sender and receiver were
both little-endian architectures—why waste time reversing bytes just to reverse them back? But
the majority of protocols specify big-endian.
Big-endian byte order is called network byte order in network contexts for this reason.

### 10.3 Python and Endianness
What if you have some number in Python, how do you convert it into a byte sequence?
Luckily, there’s a built-in function to help with that: .to_bytes().
And there’s one to go the other way: .from_bytes()
It even allows you to specify the endianness! Since we’ll be using this to transmit bytes over the network,
we’ll always use "big" endian.

#### 10.3.1 Converting a Number to Bytes
Here’s a demo where we take the number 3490 and store it as bytestring of 2 bytes in big-endian order.
Note that we pass two things into the .to_bytes() method: the number of bytes for the result, and "big"
if it’s to be big-endian, or "little" if it’s to be little endian.
Newer versions of Python default to "big". In older versions, you still have to be explicit.
n = 3490
bytes = n.to_bytes(2, "big")

If we print them out we’ll see the byte values:
for b in bytes:
print(b)

13
162

Those are the big-endian byte values that make up the number 3490. We can verify that 13 * 256 + 162 == 3490
easily enough.
If you try to store the number 70,000 in two bytes, you’ll get an OverflowError. Two bytes isn’t large
enough to store values over 65535–you’ll need to add another byte.
Let’s do one more example in hex:
n = 0xABCD
bytes = n.to_bytes(2, "big")
for b in bytes:
print(f"{b:02X}")

prints:

### 10.4 Reflect

AB
CD

It’s the same digits as the original value stored in n!

#### 10.3.2 Convert Bytes Back to a Number
Let’s take the full tour. We’re going to make a hex number and convert it to bytes, like we did in the
previous section. Then we’ll even print out the bytestring to see what it looks like.
Then we’ll convert that bytestring back to a number and print it out to make sure it matches the original.
n = 0x0102
bytes = n.to_bytes(2, "big")
print(bytes)

gives the output:
b'\x01\x02'

The b at the front means this is a bytestring (as opposed to a regular string) and the \x is an escape sequence
that appears before a 2-digit hex number.
Since our original number was 0x0102, it makes sense that the two bytes in the byte string have values
\x01 and \x02.
Now let’s convert that string back and print in hex:
v = int.from_bytes(bytes, "big")
print(f"{v:04x}")

And that prints:
0102

just like our original value!

### 10.4 Reflect
- Using only the .to_bytes() and .from_bytes() methods, how can you swap the byte order in a
2-byte number? (That is reverse the bytes.) How can you do that without using any loops or other
methods? (Hint: "big" and "little"!)
- Describe in your own words the difference between Big-Endian and Little-Endian.
- What is Network Byte Order?
- Why not just send an entire number at once instead of breaking it into bytes?
- Little-endian just seems backwards. Why does it even exist? Do a little Internet searching to answer
this question.

Chapter 10. Endianness and Integers

Chapter 11

Parsing Packets
We’ve already seen some issues with receiving structured data from a server. You call recv(4096), and
you only get 20 bytes back. Or you call recv(4096) and it turns out the data is longer than that, and you
need to call it again.
There’s an even worse issue there, too. If the server is sending you multiple pieces of data, you might
receive the first and part of the next. You’ll have a complete packet and the next partially complete one!
How do you reconstruct this?
An analogy might be if I needed you to split up individual sentences from a block of text I give you, but
you can only get 20 characters at a time.
You call recv(20) and you get:
This is a test of th

That’s not a full sentence, so you can’t print it yet. So you call recv(20) again:
This is a test of the emergency broadcas

Still not a sentence. Call it again:
This is a test of the emergency broadcast system. This is on

Hey! There’s a period in there, so we have a complete sentence. So we can print it out. But we also have
part of the next sentence already received!
How are we going to handle all this in a graceful way?

### 11.1 You Know What Would Make This Easy?
You know what would make this easy? If we abstracted it out and then we could do something like this:
while the connection isn't closed:
sentence = get_next_packet()
print(sentence)

Isn’t that easier to think about? Once we have that code the extracts the next complete packet from the
data stream, we can just use it.
And if that code is complex enough, it could actually extract different types of packets from the stream:

Chapter 11. Parsing Packets

packet = get_next_packet()
if packet.type == PLAYER_POSITION:
set_player_position(packet.player_index, packet.player_position)
elif packet.type == PRIVATE_CHAT:
display_chat(packet.player_from, packet.message, private=True)

and so on.
Makes things soooo much easier than trying to reason about packets as collections of bytes that might or
might not be complete.
Of course, doing that processing is the real trick. Let’s talk about how to make it happen.

### 11.2 Processing a Stream into Packets
The big secret to making this work is this: make a big global buffer.
A buffer is just another word for a storage area for a bunch of bytes. In Python, it would be a
bytestring, which is convenient since you’re already getting those back from recv().
This buffer will hold the bytes you’ve seen so far. You will inspect the buffer to see if it holds a complete
data packet.
If there is a complete packet in there, you’ll return it (as a bytestring or processed). And also, critically,
you’ll strip it off the front of the buffer.
Otherwise, you’ll call recv() again to try to fill up the buffer until you have a complete packet.
In Python, remember to use the global keyword to access global variables, e.g.
packet_buffer = b''
def get_next_packet(s):
global packet_buffer

Otherwise Python will just make another local variable that shadows the global one.

### 11.3 The Sentences Example Again
Let’s look at that sentences example from the beginning of this chapter.
We’ll call our get_sentence() function, and it’ll look at all the data received so far and see if there’s a
period in it.
So far we have:

Nothing. No data is received. There’s no period in there so we don’t have a sentence, so we have to call
recv(20) again to get more bytes:
This is a test of th

Still no period. Call recv(20) again:
This is a test of the emergency broadcas

### 11.3 The Sentences Example Again

Still no period. Call recv(20) again:
This is a test of the emergency broadcast system. This is on

There’s one! So we do two things:
1. Copy the sentence out so we can return it, and:
## 2. Strip the sentence from the buffer.
After step two, the first sentence is gone and the buffer looks like this:
This is on

and we return the first sentence “This is a test of the emergency broadcast system.”
And the function that called get_sentence() can print it.
And then call get_sentence() again!
In get_sentence(), we look at the buffer again. (Remember, the buffer is global so it still has the data
in it from the last call.)
This is on

There’s no period, so we call recv(20) again, but this time we only get 10 bytes back:
This is only a test.

But it’s a complete sentence, so we strip it from the buffer, leaving it empty, and then return it to the caller
for printing.

#### 11.3.1 What If You Receive Multiple Sentences at Once?
What if I call recv(20) and get this back:
Part 1. Part 2. Part

Well, it still works! The get_sentence() function will see the first period in there, strip off the first
sentence from the buffer so it contains:
Part 2. Part

and then return Part 1..
The next time you call get_sentence(), as always, the first thing it does is check to see if the buffer
contains a full sentence. It does! So we strip it off:
Part

and return Part 2.
The next time you call get_sentence(), it sees no period in the buffer, so there is no complete sentence,
so it calls recv(20) again to get more data.
Part 3. Part 4. Part 5.

And now we have a complete sentence, so we strip it off the front:
Part 4. Part 5.

and return Part 3 to the caller. And so on.

Chapter 11. Parsing Packets

### 11.4 The Grand Scheme
Overall, you could think of this abstraction as a pipe full of data. When there is a complete packet in the
pipe, it’s pulled off the front and returned.
But if there’s not, the pipe receives more data at the back and keeps checking to see if it has an entire
packet yet.
Here’s some pseudocode:
global buffer = b''

function get_packet():
while True:
if buffer starts with a complete packet
extract the packet data
strip the packet data off the front of the buffer
return the packet data
receive more data
if amount of data received is zero bytes
return connection closed indicator
append received data onto the buffer

In Python, you can slice off the buffer to get rid of the packet data from the front.
For example, if you know the packet data is 12 bytes, you can slice it off with:
packet = buffer[:12]
buffer = buffer[12:]

### 11.5 Reflect
- Describe the advantages from a programming perspective to abstracting packets out of a stream of
data.

Chapter 12

Project: Atomic Time
You’re going to reach out to the atomic clock at NIST (National Institute of Standards and Technology)
and get the number of seconds since January 1, 1900 from their clocks. (That’s a lot of seconds.)
And you’ll print it out.
And then you’re going to print out the system time from the clock on your computer.
If your computer’s clock is accurate, the numbers should be very close in the output:
NIST time : 3874089043
System time: 3874089043

We’re just writing a client in this case. The server already exists and is already running.

### 12.1 Note On Legality
The NIST runs this server for public use. Generally speaking, you don’t want to be connecting to servers
where the owner doesn’t want you to. It’s a quick way to run afoul of the law.
But in this case, the general public is welcome to use it.

### 12.2 Note On Allowable Use
The NIST server should never be queried more than once every four seconds. They might start
refusing service if you exceed this rate.
If you’re running the code frequently and want to be sure you’ve waited 4 seconds, you can buffer the run
with a sleep call on the command line:
sleep 4; python3 timeclient.py

### 12.3 Epoch
In computer parlance, we refer to “epoch” as meaning “the beginning of time” from a computer perspective.
Lots of libraries measure time in “number of seconds since epoch”, meaning since the dawn of time.
What do we mean by the dawn of time? Well, it’s depends.
But in Unix-land, the dawn of time is very specifically January 1, 1970 at 00:00 UTC (AKA Greenwich
Mean Time).

Chapter 12. Project: Atomic Time

In other epochs, the dawn of time might be another date. For example, the Time Protocol that we’ll be
speaking uses January 1, 1900 00:00 UTC, 70 years before Unix’s.
This means we’ll have to do some conversion. But luckily for you, we’ll just give you the code that will
return the value for you and you don’t have to worry about it.

### 12.4 A Dire Warning about Zeros
For reasons I don’t understand, sometimes the NIST server will return 4 bytes of all zeros. And other
times it will just send zero bytes and close the connection.
If this happens, you’ll probably see 0 show up as the NIST time.
Just try running your client again to see if you get good results after one or two more tries, keeping in
mind the restriction of one query every 4 seconds.
They’re on a rotating IP for time.nist.gov and it seems like one or two of the servers might not be
working right.
If it keeps coming up zero, something else might be wrong.

### 12.5 The Gameplan
The is what we’ll be doing:
1. Connect to the server time.nist.gov on port 37 (the Time Protocol port).
2. Receive data. (You don’t need to send anything.) You should get 4 bytes.
3. The 4 bytes represent a 4-byte big-endian number. Decode the 4 bytes with .from_bytes() into a
numeric variable.
4. Print out the value from the time server, which should be the number of seconds since January 1,
1900 00:00.
5. Print the system time as number of seconds since January 1, 1900 00:00.
The two times should loosely (or exactly) agree if your computer’s clock is accurate.
The number should be a bit over 3,870,000,000, to give you a ballpark idea. And it should increment once
per second.

#### 12.5.1 1. Connect to the Server
The Time Protocol in general works with both UDP and TCP. For this project you must use TCP sockets,
just like we have been for other projects.
So make a socket and connect to time.nist.gov on port 37, the Time Protocol port.

#### 12.5.2 2. Receive the Data
Technically you should use a loop to do this, but it’s very unlikely that such a small amount of data will
be split into multiple packets.
You’ll receive 4 bytes max, no matter how many you ask for.
You can close the socket right after the data is received.

#### 12.5.3 3. Decode the Data
The data is an integer encoded as 4 bytes, big-endian.
Use the .from_bytes() method mentioned in the earlier chapters to convert the bytestream from recv()
to a value.

### 12.5 The Gameplan

#### 12.5.4 4. Print Out NIST’s Time
It should be in this format:
NIST time

: 3874089043

#### 12.5.5 5. Print Out the System Time
Here’s some Python code that get the number of seconds since January 1 1900 00:00 from your system
clock.
You can paste this right into your code and call it to get the system time.
Print the system time right after the NIST time in the following format:
System time: 3874089043

Here’s the code:
import time
def system_seconds_since_1900():
"""
The time server returns the number of seconds since 1900, but Unix
systems return the number of seconds since 1970. This function
computes the number of seconds since 1900 on the system.
"""
seconds_delta = 2208988800
seconds_since_unix_epoch = int(time.time())
seconds_since_1900_epoch = seconds_since_unix_epoch + seconds_delta
return seconds_since_1900_epoch

Assuming NIST’s number isn’t zero:
- If this number is within 10 seconds of NIST’s number, that’s great.
- If it’s within 86,400 seconds, that’s OK. And I’d like to hear about it because it might be a bug in
the above code.
- If it’s within a million seconds, I really want to hear about it.
- If it’s outside of that, it’s probably a bug in your code. Did you use "big" endian? Are you receiving
4 bytes?

Chapter 12. Project: Atomic Time

Chapter 13

Project: The Word Server
This is a project that is all about reading packets.
You’ll receive a stream of encoded data from a server (provided) and you’ll have to write code to determine
when you’ve received a complete packet and the print out that data.

### 13.1 Overview
First: download these files:
- wordserver.py1 : a ready-to-run server that hands out lists of random words.
- wordclient.py2 : skeleton code for the client.
RESTRICTION! Do not modify any of the existing code! Just search for TODO and fill in that code.
You may add additional functions and variables if you wish.
REQUIREMENT! The code should work with any positive value passed to recv() between 1 and
4096! You might want to test values like 1, 5, and 4096 to make sure they all work.
REQUIREMENT! The code must work with words from length 1 to length 65535. The server won’t
send very long words, but you can modify it to test. To build a string in Python of a specific number of
characters, you can:
long_str = "a" * 256

PROTIP! Read and understand all the existing client code before you start. This will save you all
kinds of trouble. And note how the structure of the main code doesn’t even care about bytes and streams–
it’s only concerned with entire packets. Cleaner, right?
You are going to complete two functions:
- get_next_word_packet(): gets the next complete word packet from the stream. This should
return the complete packet, the header and the data.
- extract_word(): extract and return the word from a complete word packet.
What do they do? Keep reading!

### 13.2 What is a “Word Packet”?
When you connect to the server, it will send you a stream of data.

https://beej.us/guide/bgnet0/source/exercises/word/wordserver.py
https://beej.us/guide/bgnet0/source/exercises/word/wordclient.py

Chapter 13. Project: The Word Server

This stream is made up of a random number (1 to 10 inclusive) of words prefixed by the length of the
word in bytes.
Each word is UTF-8 encoded.
The length of the word is encoded as a big-endian 2-byte number.
For example, the word “hello” with length 5 would be encoded as the following bytes (in hex):
length 5
+-+-+
| h e l l o
00 05 68 65 6C 6C 6F

The numbers corresponding to the letters are the UTF-8 encoding of those letters.
Fun fact: for alphabetic letters and numbers, UTF-8, ASCII, and ISO-8859-1 are all the same
encoding.
The word “hi” followed by “encyclopedia” would be encoded as two word packets, transmitted in the
stream like so:
length 2
length 12
+-+-+
+-+-+
| h i |
| e n c y c l o p e d i a
00 02 68 69 00 0C 65 6E 63 79 63 6C 6F 70 65 64 69 61

### 13.3 Implementation: get_next_word_packet()
This function takes the connected socket as argument. It will return the next word packet (the length plus
the word, as received) as a bytestring.
It will follow the process outlined in the Parsing Packets chapter for extracting packets from a stream of
data.
For example, if the words were “hi” and “encyclopedia” from the example above, and we received the
first 5 bytes, the packet buffer would contain:
h i
00 02 68 69 00

We see the first word is 2 bytes long, and we have captured those 2 bytes.
We would extract and return the first word (“hi”) and its length (bytes 00 02) and return this bytestring:
h i
00 02 68 69

We’d also strip those bytes out of the packet buffer so that all that remained was the zero that was at the
end.
00

At that point, lacking a complete word in the buffer, a subsequent call to the function would trigger a
recv(5) for the next chunk of data, giving us:
e n c y
00 0C 65 6E 63 79

### 13.4 Implementation: extract_word()

And so on.

### 13.4 Implementation: extract_word()
This function takes a complete word packet as input, such as:
h i
00 02 68 69

and returns a string of the word, "hi".
This involves slicing off everything past the two length bytes to get the word bytes.
But remember: the word is UTF-8 encoded! So you have to call .decode() to turn it back into a string.
(The default decoding is UTF-8, so you don’t have to pass an argument to .decode().)

Chapter 13. Project: The Word Server

Chapter 14

Transmission Control Protocol (TCP)
When someone puts a backhoe through a fiber optic cable, packets might be lost. (Entire countries have
been brought offline by having a boat anchor dragged through an undersea network cable!) Software
errors and computer crashes and router malfunctions can all cause problems.
But we don’t want to have to think about that. We want an entity to deal with all that and then let us know
when the data is complete and intact and in order.
TCP is that entity. It worries about lost packets so we don’t have to. And when it is sure it has all the
correct data, then it gives it to us.
We’ll look at:
- The overall goals of TCP
- Where it fits in the network stack
- A refresher on TCP ports
- How TCP makes, uses, and closes connections
- Data integrity mechanisms
- Maintaining packet order
- Detecting errors
- Flow control–how a receiver keeps from getting overwhelmed
- Congestion Control–how senders avoid overloading the Internet
TCP is a very complex topic and we’re only skimming the highlights here. If you want to learn more, the
go-to book is TCP/IP Illustrated Volume 1 by the late, great W. Richard Stevens.

### 14.1 Goals of TCP
- Provide reliable communication
- Simulate a circuit-like connection on a packet-switched network
- Provide flow control
- Provide congestion control
- Support out-of-band data

### 14.2 Location in the Network Stack
Recall the layers of the Network Stack:

Telnet, SSH,
SMTP, POP, IMAP

Chapter 14. Transmission Control Protocol (TCP)

Data Integrity,

token ring

You can see TCP in there at the Transport Layer. IP below it is responsible for routing. And the application
layer above it takes advantage of all the features TCP has to offer.
That’s why when we wrote our HTTP client and server, we didn’t have to worry about data integrity at all.
We used TCP so that took care of it for us!

### 14.3 TCP Ports
Recall that when we used TCP we had to specify port numbers to connect to. And even our clients were
automatically assigned local ports by the operating system (if we didn’t bind() them ourselves).
IP uses IP addresses to identify hosts.
But once on that host, the port number is what the OS uses to deliver the data to the correct process.
By analogy, the IP address is like a street address, and the port number is like an apartment number at that
street address.

### 14.4 TCP Overview
There are three main things TCP does during a connection:
1. Make the connection
2. Transmit data
## 3. Close the connection
Each of these involves the sending of special non-user-data packets back and forth between the client and
server. We’ll look at special packet types SYN, SYN-ACK, ACK, and FIN.

#### 14.4.1 Making the Connection
This involves the famous “three-way handshake”. Since any packets can be lost during transmission, TCP
takes extra care to make sure both sides of the connection are ready for data before proceeding.
1. The client sends a SYN (synchronize) packet to the server.
2. The server replies with a SYN-ACK (synchronize acknowledge) packet back to the client.
3. The client replies with an ACK (acknowledge) packet back to the server.
If there is no reply in a reasonable time to any one of these steps, the packet is resent.

#### 14.4.2 Transmitting Data
TCP takes a stream of data and splits it into chunks. Each chunk gets a TCP header attached to it, and is
then sent on to the IP layer for delivery. The header and the chunk together are called a TCP segment.
(We’ll use “TCP packet” and “TCP segment” interchangeably, but segment is more correct.)
When TCP sends a segment, it expects the recipient of that data to respond with an acknowledgment,
hereafter known as an ACK. If TCP doesn’t get the ACK, it’s going to assume something has gone wrong
and it needs to resend that segment.
Segments are numbered so even if they arrive out of order, TCP can put them back in the proper sequence.

### 14.5 Data Integrity

#### 14.4.3 Closing the Connection
When a side wants to close the connection, it sends a FIN (finis [sic]) packet. The remote side will typically
reply with an ACK and a FIN of its own. The local side would then complete the hangup with another
ACK.
In some OSes, if a host closes a connection with unread data, it sends back a RST (reset) to indicate that
condition. Socket programs might print the message “Connection reset by peer” when this happens.

### 14.5 Data Integrity
There are a lot of things that can go wrong. Data can arrive out of order. It can be corrupted. It might be
duplicated. Or maybe it doesn’t arrive at all.
TCP has mechanisms to handle all these contingencies.

#### 14.5.1 Packet Ordering
The sender places an ever-increasing sequence number on each segment. “Here’s segment 3490. Here’s
segment 3491.”
The receiver replies to the sender with an ACK packet containing that sequence number. “I got segment
3490. I got segment 3491.”
If two segments arrive out of order, TCP can put them back in order by sorting them by sequence number.
Analogy time! If you had a stack of papers and threw them in the air, how could you possibly
know their original order? Well, if you numbered all the pages correctly, you just have to sort
them. That’s the role the sequence number plays in TCP.
If a duplicate segment arrives, TCP knows it’s already seen that sequence number, so it can safely discard
the duplicate.
If a segment is missing, TCP can ask for a retransmission. It does this by repeatedly ACKing the previous
segment. The sender will retransmit the next one.
Alternately, if the sender doesn’t get an ACK for a particular segment for some time, it might retransmit
that segment on its own, thinking the segment might have been lost. This retransmission gets more and
more pessimistic with each timeout; the server doubles the timeout each time it happens.
Lastly, sequence numbers are initialized to random values during the three-way handshake as the connection is being made.

#### 14.5.2 Error Detection
Before the sender sends out a segment, a checksum is computed for that segment.
When the receiver gets the segment, it computes its own checksum of that segment.
If the two checksums match, the data is assumed to be error-free. If they differ, the data is discarded and
the sender must timeout and retransmit.
The checksum is a 16-bit number that is the result of piping all the TCP header and payload data and the
IP addresses involved into a function that digests them down.
The details are in this week’s project.

### 14.6 Flow Control
Flow Control is the mechanism by which two communicating devices alert one another that data needs
to be sent more slowly. You can’t pour 1000 Mbs (megabits per second) at a device that can only handle
100 Mbs. The device needs a way to alert the sender that to slow it down.

Chapter 14. Transmission Control Protocol (TCP)

Analogy time: you do this on the phone when you tell the other party “You’re talking too fast for
me to understand! Slow down!”
The most simple way to do this (and this is not what TCP does) is for the sender to send the data, then wait
for the receiver to send back an ACK packet with that sequence number. Then send another data packet.
This way the receiver can delay the ACK if it needs the sender to slow down.
But this is a slow back and forth, and the network is usually reliable enough for the sender to push out
multiple segments without waiting for a response.
However, if we do this, we risk the sender sending data more quickly than the receiver can handle it!
In TCP, this is solved with something called a sliding window. This goes in the “window” field of the
TCP header in the receiver’s ACK packet.
In that field, the data receiver can specify how much more data (in bytes) it is willing to receive. The
sender must not send more than this without before getting an ACK from the receiver. And the ACK it
gets will contain new window information.
Using the mechanism, the receiver can get the sender “once you’ve sent X bytes, you have to wait for an
ACK telling you how many more you can send”.
It’s important to note that this is a byte count, not a segment count. The sender is free to send multiple
segments without receiving an ACK as long as the total bytes doesn’t exceed the receiver’s advertised
window size.

### 14.7 Congestion Control
Flow control operates between two computers, but there’s a greater issue of the Internet as a whole. If a
router becomes overwhelmed, it might start dropping packets which causes the sender to begin retransmitting, which does nothing to alleviate the problem. And it’s not even on flow control’s radar since the
packets aren’t reaching the receiver.
This happened in 1986 when NSFNET (basically the pre-commercial Internet, may it rest in peace) was
overwhelmed by insistent senders who didn’t know when to quit with the retransmissions. Throughput
dropped to 0.1% of normal. It wasn’t great.
To fix this, a number of mechanisms were implemented by TCP to estimate and eliminate network congestion. Note that these are in addition to the Flow Control window advertised by a receiver. The sender
must obey the Flow Control limit and the computed network congestion limit, whichever is lower. It
cannot have more unacknowledged segments out on the network than this limit. If it does, it has to stop
sending and wait for some ACKs to come in.
Another way to think about this is that when a sender puts out a new TCP segment, that adds to network
congestion. When it receives an ACK, that indicates that the segment has been removed from the network,
decreasing congestion.
In order to alleviate the problems that hit NFSNET, two big algorithms were added: Slow Start and
Congestion Avoidance.
NOTE: This is a simplified view of these two algorithms. For full details on the complex interplay
between them and even more on congestion avoidance, see TCP Congestion Control (RFC 5681).

#### 14.7.1 Slow Start
When the connection first comes up, the sender has no way of knowing how congested the network is.
This first phase is all about getting a rough guess sorted out.
And so it’s going to start conservatively, assuming there’s a high congestion level. (If there is already a
high congestion level, liberally flooding it with data wouldn’t be helpful.)
It starts by allowing itself an initial congestion window which is how many unACKed bytes (and segments,
but let’s just think of bytes for now) it is allowed to have outstanding.

### 14.8 Reflect

As the ACKs come in, the size of the congestion window increases by the number of acknowledged bytes.
So, loosely, after one segment gets ACKed, two can be sent out. If those two are successfully ACKed,
four can be sent out.
So it starts with a very limited number of unACKed segments allowed to be outstanding, but grows very
rapidly.
Eventually one of those ACKs is lost and that’s when Slow Start decides to slow way down. It cuts the
congestion window size by half and then TCP switches to the Congestion Avoidance algorithm.

#### 14.7.2 Congestion Avoidance
This algorithm is similar to Slow Start, but it makes much more controlled moves. No more of this
exponential growth stuff.
Each time a congestion window’s-worth of data is successfully transmitted, it pushes a little harder by
adding another segment’s worth of bytes to the window. This allows it to have another unACKed segment
out on the network. If that works fine, it allows itself one more. And so on.
So it’s pushing the limits of what can be successfully sent without congesting the network, but it’s pushing slowly. We call this additive-increase and it’s generally linear (compared to Slow Start which was
generally exponential).
Eventually, though, it pushes too far, and has to retransmit a packet. At this point, the congestion window
is set to a small size and the algorithm drops back to Slow Start.

### 14.8 Reflect
- Name a few protocols that rely on TCP for data integrity.
- Why is there a three-way handshake to set up a connection? Why not just start transmitting?
- How does a checksum protect against data corruption?
- What’s the main difference in the goals of Flow Control and Congestion Control?
- Reflect on the reasons for switching between Slow Start and Congestion Avoidance. What advantages does each have in different phases of congestion detection?
- What is the purpose of Flow Control?

Chapter 14. Transmission Control Protocol (TCP)

Chapter 15

User Datagram Protocol (UDP)
If you like to keep things simple and are a positive thinker, UDP is for you. It’s the near-ultimate in
lightweight data transfer over the Internet.
You fire UDP packets off and hope they arrive. Maybe they do, or maybe someone put a backhoe through
a fiber optic cable, or there were cosmic rays, or a router got too congested or irate and just dropped it.
Unceremoniously.
It’s living on the Internet data edge! Virtually all the pleasant and reliable guarantees of TCP–gone!

### 15.1 Goals of UDP
- Provide a way to send error-free data from one computer to another.
That’s about it.
The following are not goals of UDP:
- Provide data in order
- Provide data without loss
- Provide data without duplicates
If those are needed, TCP is a better choice. UDP offers zero protection against lost or misordered data.
The only guarantee is that if the data arrives, it will be correct.
But what it does give you is really low overhead and quick response times. It doesn’t have any of the
packet reassembly or flow control or ACK packets or any of the stuff TCP does. As a consequence, the
header is much smaller.

### 15.2 Location in the Network Stack
Recall the layers of the Network Stack:

Data Integrity,

Telnet, SSH,
SMTP, POP, IMAP

token ring

Chapter 15. User Datagram Protocol (UDP)

You can see UDP in there at the Transport Layer. IP below it is responsible for routing. And the application
layer above it takes advantage of all the features UDP has to offer. Which isn’t a lot.

### 15.3 UDP Ports
UDP uses ports, similar to TCP. In fact, you can have a TCP program using the same port number as a
different UDP program.
IP uses IP addresses to identify hosts.
But once on that host, the port number is what the OS uses to deliver the data to the correct process.
By analogy, the IP address is like a street address, and the port number is like an apartment number at that
street address.

### 15.4 UDP Overview
UDP is connectionless. You know how TCP takes the packet-switched network and makes it look like
it’s a reliable connection between two computers? UDP doesn’t do that.
You send a UDP datagram to an IP address and port. IP routes it there and the receiving computer sends
it to the program that’s bound to that port.
There’s no connection. It’s all on an individual packet basis.
When the packet arrives, the receiver can tell which IP and port it came from. This way the receiver can
send a response.

### 15.5 Data Integrity
There are a lot of things that can go wrong. Data can arrive out of order. It can be corrupted. It might be
duplicated. Or maybe it doesn’t arrive at all.
UDP barely has any mechanisms to handle all these contingencies.
In fact, all it does is error detection.

#### 15.5.1 Error Detection
Before the sender sends out a segment, a checksum is computed for that packet.
The checksum works exactly the same way as with TCP, except the UDP header is used. Compared to the
TCP header, the UDP header is dead simple:
7 8
15 16
23 24
Port
Port
Length
Checksum
data octets ...
+---------------- ...

When the receiver gets the packet, it computes its own checksum of that packet.
If the two checksums match, the data is assumed to be error-free. If they differ, the data is discarded.
That’s it. The receiver never even knows that there was some data aimed at it. It just vanishes into the
ether.

### 15.6 Maximum Payload Without Fragmentation

The checksum is a 16-bit number that is the result of piping all the UDP header and payload data and the
IP addresses involved into a function that digests them down.
This works the same way as the TCP checksum. (Jon Postel wrote the first RFCs for both TCP and UDP
so it’s no surprise they use the same algorithm.)
The details of how the checksum works are in this week’s project. Just substitute the UDP header for the
TCP header.

### 15.6 Maximum Payload Without Fragmentation
It’s a little ahead of schedule, but lower layers can decide to split a UDP packet up into smaller packets.
Maybe there’s a part of the internet the UDP packet has to pass through that can only handle sending data
of a certain size.
We call this “fragmentation”, when a UDP packet is split among multiple IP packets.
The maximum size packet that can be sent on any particular wire is called its MTU (maximum transmission
unit). The smallest possible MTU on the Internet (IPv4) is 576 bytes. The biggest IP header is 60 bytes.
And the UDP header is 8 bytes. So that leaves 576-60-8 = 508 bytes of payload that you can guarantee
won’t be fragmented[^If you’re sending through a VPN, it might be less than this, but we’ll ignore that
for sake of simplicity.]. Since the IP header is sometimes smaller than 60 bytes, lots of source say 512
bytes is the limit.
Is fragmentation bad? Some routers might drop fragmented UDP packets. So staying under the minimum
MTU is often a good idea with UDP.

### 15.7 What’s the Use?
If UDP can drop packets all over the place, why ever use it?
Well, the performance gain is notable, so that’s a draw.
There are a number of circumstances you would use UDP:
1. If you don’t care if you lose a few packets. If you’re transmitting voice or video or even game frame
information, it might be OK to drop a few packets. The stream will just glitch out for a moment
and then continue when the next packets arrive.
This is the most common use. Multiplayer high-framerate games use this from frame-by-frame
updates, and also use TCP for lower bandwidth needs like chat messages and player inventory
changes.
2. If you can’t have packet loss, you can implement another protocol on top of UDP. The TFTP (Trivial
File Transfer Protocol) does this. It puts a sequence number in each packet, and waits for the other
side to respond with a TFTP ACK packet before sending another. It’s not fast because the sender
has to wait for an ACK before sending the next packet, but it’s really simple to implement.
This is a rarer use. TFTP is used by diskless computers that don’t have an OS installed. They
transfer the OS over the network on boot, and need a small built-in network stack to make that
happen. It’s a lot easier to implement an Ethernet/IP/UDP stack than an Ethernet/IP/TCP stack.
3. You want to multiplex different data “streams” without having multiple TCP connections. You
could tag each UDP packet with an identifier so that they all go in the right buckets upon arrival.
4. Early processing is possible. Maybe you can start processing packet 4 even if packet 3 hasn’t arrived
yet.
5. Etc.

### 15.8 UDP (Datagram) Sockets
With UDP sockets, there are some differences from TCP:

Chapter 15. User Datagram Protocol (UDP)

- You no longer call listen(), connect(), accept(), send(), or recv() because there’s no “connection”.
- You call sendto() to send UDP data.
- You call recvfrom() to receive UDP data.

#### 15.8.1 Server Procedure
The general procedure for a server is to make a new socket of type SOCK_DGRAM, which is a datagram/UDP
socket. (We have been using the default of SOCK_STREAM which is a TCP socket.)
Then the server calls bind() to bind to a port. This port is where the client will send packets.
After that, the server can loop receiving data and sending responses.
When it receives data, recvfrom() will return the host and port the data was sent from. This can be used
to reply, sending data back to the sender.
Here’s an example server:
import sys
import socket
try:
port = int(sys.argv[1])
except:
print("usage: udpserver.py port", file=sys.stderr)
sys.exit(1)
s = socket.socket(type=socket.SOCK_DGRAM)
s.bind(("", port))
while True:
data, sender = s.recvfrom(4096)
print(f"Got data from {sender[0]}:{sender[1]}: \"{data.decode()}\"")
s.sendto(f"Got your {len(data)} byte(s) of data!".encode(), sender)

#### 15.8.2 Client Procedure
It’s about the same as the server procedure, except it’s not going to bind() to a specific port. It’ll let the
OS choose bind port for it the first time it calls sendto().
Remember: UDP is unreliable, so there’s a chance the data might not arrive! If it doesn’t, just try again.
(But it will almost certainly arrive running on localhost.)
Example client that can communicate with the above server:
import socket
import sys

### 15.9 Reflect

try:
server = sys.argv[1]
port = int(sys.argv[2])
message = sys.argv[3]
except:
print("usage: udpclient.py server port message", file=sys.stderr)
sys.exit(1)
s = socket.socket(type=socket.SOCK_DGRAM)
print("Sending message...")
s.sendto(message.encode(), (server, port))
data, sender = s.recvfrom(4096)
print(f"Got reply: \"{data.decode()}\"")
s.close()

### 15.9 Reflect
- What does TCP provide that UDP does not in terms of delivery guarantees?
- Why do people recommend keeping UDP packets small?
- Why is the UDP header so much smaller than the TCP header?
- sendto() requires you specify a destination IP and port. Why does the TCP-oriented send()
function not require those arguments?
- Why would people use UDP over TCP if it’s relatively unreliable?

Chapter 15. User Datagram Protocol (UDP)

Chapter 16

Project: Validating a TCP Packet
In this project you’ll write some code that validates a TCP packet, making sure it hasn’t been corrupted
in transit.
Inputs: A sequence of pairs of files:
- One contains the source and destination IPv4 addresses in dots-and-numbers notation.
- The other contains the raw TCP packet, both the TCP header and the payload.
You can download the input files from the exercises folder1 .
Outputs:
- For each pair of files, print PASS if the TCP checksum is correct. Otherwise print FAIL.
There are a lot of parts to this project, so it is suggested you write and test as you go.
You should understand this specification 100% before you begin to plan your approach! Get clarification before proceeding to the planning stage!
The ABSOLUTE HARDEST PART of this project is understanding it! Your code will never work
before you understand it!
The model solution is 37 lines of code! (Not including whitespace and comments.) This is not a number
to beat, but is an indication of how much effort you need to put in to understanding this spec versus typing
in code!

### 16.1 Banned Functions
You may not use anything in the socket library.

### 16.2 How To Code This
You can do this however you like, but I recommend this order. Details for each of these steps is included
in the following sections.
1. Read in the tcp_addrs_0.txt file.
2. Split the line in two, the source and destination addresses.
3. Write a function that converts the dots-and-numbers IP addresses into bytestrings.
4. Read in the tcp_data_0.dat file.
