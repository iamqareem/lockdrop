---
id: beej-network-03
title: "Beej's Guide to Network Programming — Write a function that generates the IP pseudo header bytes from…",
slug: beej-network-03-beej-s-guide-to-network-programming-write-a-function-that-ge
source: "Beej's Guide to Network Programming",
sourceSection: "5. Write a function that generates the IP pseudo header bytes from the IP addresses from, 11. Modify your code to run it on all 10 of the data files. The first 5 files should have matching, 1. The source computer will broadcast a specialized Ethernet frame that contains the destination IP, 2. Look U"
track: networking-dns,
tier: premium
tags: [network-programming, sockets, c, tcp-ip]
summary: "The checksum in TCP is a 16-bit value that represents a 'sum total' of all the bytes in the packet. Covers 4 sections: Write a function that generates the IP pseudo header bytes from the IP addresses from, Modify your code to run it on all.",
---
# Beej's Guide to Network Programming — Write a function that generates the IP pseudo header bytes from…

## 5. Write a function that generates the IP pseudo header bytes from the IP addresses from
tcp_addrs_0.txt and the TCP length from the tcp_data_0.dat file.
6. Build a new version of the TCP data that has the checksum set to zero.
7. Concatenate the pseudo header and the TCP data with zero checksum.

https://beej.us/guide/bgnet0/source/exercises/tcpcksum/tcp_data.zip

8. Compute the checksum of that concatenation
9. Extract the checksum from the original data in tcp_data_0.dat.
10. Compare the two checksums. If they’re identical, it works!
## 11. Modify your code to run it on all 10 of the data files. The first 5 files should have matching
checksums! The second five files should not! That is, the second five files are simulating being
corrupted in transit.

### 16.3 Checksum in General
The checksum in TCP is a 16-bit value that represents a “sum total” of all the bytes in the packet. (Plus a
bit more. And it’s not just the total of the bytes–don’t just add them up!!! More below.)
The TCP header itself contains the checksum from the sending host.
The receiving host (which is what you’re pretending to be, here) computes its own checksum from the
incoming data, and makes sure it matches the value in the packet.
If it does, the packet is good. If it doesn’t, it means something got corrupted. Either the source or destination IP addresses are wrong, or the TCP header is corrupted, or the data is wrong. Or the checksum itself
got corrupted.
In any case, the TCP software in the OS will request a resend if the checksums don’t match.
Your job in this project is to re-compute the checksum of the given data, and make sure it matches (or
doesn’t) the checksum already in the given data.

### 16.4 Input File Details
Download this ZIP2 with the input files.
There are 10 sets of them. The first 5 have valid checksums. The second 5 are corrupted.
In case you didn’t notice, the previous line tells you what you have to do to get 100% on this project!
The files are named like so:
tcp_addrs_0.txt
tcp_addrs_0.dat
tcp addrs_1.txt
tcp addrs_1.dat

and so on, up to the index number 9. Each pair of files is related.

#### 16.4.1 The .txt File
You can look at the tcp_addrs_n.txt files in an editor and you’ll see it contains a pair of random IP
addresses, similar to the following:
192.0.2.207 192.0.2.244

These are the source IP address and destination IP address for this TCP packet.
Why do we need to know IP information if this is a TCP checksum? Stay tuned!

#### 16.4.2 The .dat File
This is a binary file containing the raw TCP header followed by payload data. It’ll look like garbage in an
editor. If you have a hexdump program, you can view the bytes with that. For example, here’s the output
from hexdump:

https://beej.us/guide/bgnet0/source/exercises/tcpcksum/tcp_data.zip

### 16.5 How On Earth Do You Compute A TCP Checksum?

hexdump -C tcp_data_0.dat

00000000
00000010
00000020
00000023

3f d7 c9 c5 ed d8 23 52
67 be ba aa 2a 63 25 2d
42 39 53

6a 15 32 96 50 d9 78 d8
7c 4f 2a 39 52 69 4b 75

|?.....#Rj.2.P.x.|
|g...*c%-|O*9RiKu|
|B9S|

But for this project, the only things in that file you really will care about are:
- The length (in bytes) of the data
- The 16-bit big-endian checksum that’s stored at offset 16-17
More on that later!
Note: these files contain “semi-correct” TCP headers. All the parts are there, but the various values
(especially in the flags and options fields) might make no sense.

### 16.5 How On Earth Do You Compute A TCP Checksum?
It’s not easy.
The TCP checksum is there to verify the integrity of several things:
- The TCP header
- The TCP payload
- The source and destination IP addresses (to protect against misrouted data ending up in the TCP
stream).
The last part is interesting, because the IP addresses aren’t in the TCP header or data at all, so how do we
get them included in the checksum?
A TCP checksum is a two-byte number that is computed like this, given TCP header data, the payload,
and the source and IP addresses:
- Build a sequence of bytes representing the IP Pseudo header (see below).
- Set the existing TCP header checksum to zero.
- Concatenate the IP pseudo header + the TCP header and payload.
- Compute the checksum of that concatenation.
That’s how you compute a TCP checksum.
But there are a lot of details.

### 16.6 The IP Pseudo Header
Since we want to make sure that the IP addresses are correct for this data, as well, we need to include the
IP header in our checksum.
Except we don’t include the real IP header. We make a fake one. And it looks like this (stolen straight out
of the TCP RFC):
Source Address
Destination Address
| Zero | PTCL |
TCP Length

Don’t let the grid layout fool you: the IP pseudo header is a string of bytes. It’s just in this layout for
easier human consumption.
Each + sign in diagram represents a byte delimiter.
So the Source Address is 4 bytes. (Hey! IPv4 addresses are 4 bytes long!) You get this out of the
tcp_addrs_n.txt files.
The Destination Address is 4 bytes. You get this out of the tcp_addrs_n.txt files, as well.
Zero is one byte, just set to byte value 0x00.
PTCL is the protocol, and that is always set to a byte value of 0x06. (IP has some magic numbers that
represent the higher level protocol above it. TCP’s number is 6. That’s where it comes from.)
TCP Length is the total length, in bytes of the TCP packet and data, big-endian. This is the length of the
data you’ll read out of the tcp_data_n.dat files.
So before you can compute the TCP checksum, you have to fabricate an IP pseudo header!

#### 16.6.1 Example Pseudo Header
If the source IP is 255.0.255.1 and the dest IP is 127.255.0.1, and the TCP length is 3490 (hex 0x0da2),
the pseudo header would be this sequence of bytes:
Source IP | Dest IP |Z |P |TCP length
| | |
ff 00 ff 01 7f ff 00 01 00 06 0d a2
Z is the zero section. And P is the protocol (always 6).

See how the bytes line up to the inputs? (255 is hex 0xff, 127 is hex 0x7f, etc.)

#### 16.6.2 Getting the IP Address Bytes
If you noticed, the IP addresses in the tcp_addrs_n.txt files are in dots and numbers format, not binary.
You’re going to need to write a function that turns a dots-and-numbers string into a sequence of 4
bytes.
Algorithm:
- Split the dots and numbers into an array of 4 integers.
- Convert each of those to a byte with .to_bytes()
- Concatenate them all together into a single bytestring.
This function will take a dots-and-numbers IPv4 address and return a four-byte bytestring with the result.
Here’s a test:
- Input: "1.2.3.4"
- Output: b'\x01\x02\x03\x04'
Then you can run this function on each of the IP addresses in the input file and append them to the
pseudoheader.

#### 16.6.3 Getting the TCP Data Length
This is easy: once you read in one of the tcp_data_n.dat files, just get the length of the data.
with open("tcp_data_0.dat", "rb") as fp:
tcp_data = fp.read()
tcp_length = len(tcp_data) # <-- right here

Be sure to use "rb" when reading binary data! That’s what the b is for! If you don’t do this, it might
break everything!

### 16.7 The TCP Header Checksum

### 16.7 The TCP Header Checksum
When computing the checksum, we need a TCP header with its checksum field set to zero.
And we also need to extract the existing checksum from the TCP header we received so that we can
compare it against the one we compute!
This diagram is massive, but we actually only care about one part. So skim this and move on to the next
paragraph:
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
Source Port
Destination Port
Sequence Number
Acknowledgment Number
| Data |
|U|A|P|R|S|F|
| Offset| Reserved |R|C|S|S|Y|I|
Window
|G|K|H|T|N|N|
Checksum
Urgent Pointer
Options
Padding
data

(Again, like the IP pseudo header, this is encoded as a stream of bytes and the grid is only here to make
our human lives easier. This grid is 32-bits across, numbered along the top.)
See where it says Checksum? That’s the bit we care about for this project. And it’s a two-byte number
(big-endian) at byte offsets 16 and 17 inside the TCP header.
It will also be at byte offset 16-17 in the files tcp_data_n.dat since those files start with the TCP header.
(Followed by the TCP payload.)
You’ll need the checksum from that file. Use a slice to get those two bytes and then use
.from_bytes() to convert it into a number. This is the original checksum you’ll compare against
at the end of the day!
You’ll also need to generate a version of that TCP header and data where the checksum is set to
zero. You can do it like this:
tcp_zero_cksum = tcp_data[:16] + b'\x00\x00' + tcp_data[18:]

See how we made a new version of the TCP data there? We sliced everything before and after the existing
checksum, and put two zero bytes in the middle.

### 16.8 Actually Computing the Checksum
We’re getting there. So far we’ve done these steps:
- Build the IP pseudo header
- Extract the checksum from the existing TCP header
- Build a version of the TCP header with a zero checksum
And now we get to the do the math. Here’s what the spec says to do:

The checksum field is the 16 bit one’s complement of the one’s complement sum of all 16 bit words
in the header and text.
All right, we’re already in trouble. The what of the what?
One’s complement is a way of representing positive and negative integers in binary. We don’t need to
know the details for this, gratefully.
But one thing we do need to notice is that we’re talking about all the “16 bit words”… what is that?
It means that instead of considering all this data to be a bunch of bytes, we’re considering it to be a bunch
of 16-bit values packed together.
So if you have the bytes:
01 02 03 04 05 06

we’re going to think of that as 3 16-bit values:
0102 0304 0506

And we’re going to be adding those together. With one’s complement addition. Whatever that means.
Hey–but what if there are an odd number of bytes?
If a segment contains an odd number of header and text octets to be checksummed, the last octet
is padded on the right with zeros to form a 16 bit word for checksum purposes.
So we’re going to have to look at the tcp_length we got from taking the length of the data from the
tcp_data_0.dat file. If it’s odd, just add a zero to the end of the entire data.
Conveniently, we have a copy of the TCP data we can use already: the version we made with the checksum
zeroed out. Since we’re going to be iterating over this anyway, might as well append the zero byte to that:
if len(tcp_zero_cksum) % 2 == 1:
tcp_zero_cksum += b'\x00'

That will force it to be even length.
We can extract all those 16-bit values doing something like the following. Remember that the data to be
checksummed includes the pseudo header and TCP data (with the checksum field set to zero):
data = pseudoheader + tcp_zero_cksum
offset = 0

while offset < len(data):
word = int.from_bytes(data[offset:offset + 2], "big")
offset += 2

Great. That iterates over all the words in the whole chunk of data. But what does that buy us?
What’s the checksum, already?
Let’s take that loop above and add the checksum code to it.
Here we’re back to that one’s-complement stuff. And some 16-bit stuff, which is tricky in Python because
it uses arbitrary-precision integers.
But here’s how we want to do it. In the following example, tcp_data is the TCP data padded to an even
length with zero for the checksum.

### 16.9 Final Comparison

function checksum(pseudo_header, tcp_data)
data = pseudo_header + tcp_data
total = 0
for each 16-bit word of data:

total += word
total = (total & 0xffff) + (total >> 16)
return (~total) & 0xffff

That “carry around” thing is part of the one’s complement math. The &0xffff stuff all over the place is
forcing Python to give us 16-bit integers.
Remember what the spec said?
The checksum field is the 16 bit one’s complement of the one’s complement sum of all 16 bit words
in the header and text.
The loop is getting us the “one’s complement sum”. The ~total at the end is getting us the “one’s
complement” of that.

### 16.9 Final Comparison
Now that you’ve computed the checksum for the TCP data and extracted the existing checksum from the
TCP data, it’s time to compare the two.
If they are equal, the data is intact and correct. If they are unequal, the data corrupted.
In the sample data, the first 5 files are intact, and the last 5 are corrupted.

### 16.10 Output
The output of your program should show which TCP data passes and which fails. That is, this should be
your output:

### 16.11 Success
That was no easy thing. Treat yourself! You earned it.

Chapter 17

IP Subnets and Subnet Masks
[Everything in this chapter will use IPv4, not IPv6. The concepts are basically the same; it’s just easier
to learn with IPv4.]
If you’re needing to review your Bitwise Operations, please see the Appendix: Bitwise Operations.
In this chapter:
- Address representation
- Converting from dots-and-numbers to a value
- Converting from a value to dots-and-numbers
- Subnet and host refresher
- Subnet Mask refresher
- Finding the subnet mask from slash notation
- Finding the subnet for an IP address, given that address and a subnet mask

### 17.1 Address Representation
Remember that IPv4 addresses are commonly shown in dots-and-numbers notation, e.g. 198.51.100.10.
And recall that each of those numbers is a byte, which can have values 0-255, decimal (which is the same
as 00-FF hexadecimal, and 00000000-11111111 binary).
So really, the dots-and-numbers is just there for our human convenience.
Protip: remember that different number bases like hex, binary, and decimal are just different ways
of writing a value down. Kind of like different languages for representing the same numeric value.
When a value is stored in a variable, it’s best to think of it as existing in a pure numeric sense–no
base at all. It’s only when you write it down (in code or print it out) that the base matters.
For instance, Python prints everything in decimal (base 10) by default. It has various methods to
override that and output in another base.
Let’s look at that address 198.51.100.10 in hex: c6.33.64.0a.
Now let’s cram those bytes together into a single hex number: c633640a.
Converting c633640a into decimal, we get: 3325256714.
So in a way, these all represent the same IP address:
c6.33.64.0a
c633640a
3325256714

Fair enough?

Chapter 17. IP Subnets and Subnet Masks

But why?

Well, we’re about to do some math on IP addresses. Now, we could do that math one byte at a time and
it would work just fine.
But it turns out that if we pack all those bytes into a single number, we can do the math on all the bytes at
once, and it becomes easier. Stay tuned!

### 17.2 Converting from Dots-and-Numbers
Our goal in this section is to take a dots-and-numbers string like 198.51.100.10 and convert it into the
corresponding value, like 3325256714 (decimal).
We could do it with string manipulation like in the previous section, but let’s do it in a more bitwise sense.
Let’s extract the individual numbers from an IP address (Python can do this with .split().)
The string:
"198.51.100.10"

becomes the list of strings:
["198", "51", "100", "10"]

Now let’s convert each of those to integers. (Python could do this with a loop and the int() function, or
map(), or a list comprehension.)
[198, 51, 100, 10]

Now I’m going to write these numbers in hex because it makes the future steps more clear. But remember
that they’re just stored as numeric values, so Python won’t print them as hex unless you ask it to.
[0xc6, 0x33, 0x64, 0x0a]

To build our number, we’re going to rely on a couple bitwise operations: bitwise-OR and bitwise-shift.
For the sake of example, let’s hardcode the math:
(0xc6 << 24) | (0x33 << 16) | (0x64 << 8) | 0x0a

Running that in Python gives the decimal number 3325256714. Converted to hex, we’re back to
0xc633640a.
You can use the above formula to convert any set of 4 bytes to a packed number.
There’s also a clever loop you can run to do it one byte at a time. See if you can figure that out as
an added challenge! DM the instructor to see how clever you were.

### 17.3 Converting to Dots-and-Numbers
What if you have that value from the previous section, 3325256714, and you want to get it back as an IP
address?
We can use some shifting to make that happen, too! But we have to do some AND masking to get just the
parts of the number we want.
Let’s convert to hex because each byte is exactly 2 hex digits and it’s a little easier to see them:
0xc633640a.

Now let’s look at that number shifted by 0 bits, 8 bits, 16 bits, and 24 bits:

### 17.4 Subnet and Host Refresher

0xc633640a >> 24 == 0x000000c6
0xc633640a >> 16 == 0x0000c633
0xc633640a >> 8 == 0x00c63364
0xc633640a >> 0 == 0xc633640a

If you look at just the two digits on the right, you’ll see they’re the bytes of the original number:
0xc633640a >> 24 == 0x000000 c6
0xc633640a >> 16 == 0x0000c6 33
0xc633640a >> 8 == 0x00c633 64
0xc633640a >> 0 == 0xc63364 0a

So we’re onto something, except looking at the right shift 8, for example, we get this:
0xc633640a >> 8

== 0x00c63364

So yes, I’m interested in the byte 0x64 like we see on the right, but not the 0xc633 part of it. How can I
zero that higher part out, leaving just the 0x64?
We can use an AND mask! The bitwise-AND operator can work like a stencil letting some of the number
through and zeroing other parts of it. Let’s do a bitwise-AND on that number with the byte 0xff, which
is all 8 bits set to 1 and all bits over the first 8 have implied value 0.
0x00c63364
& 0x000000ff
-----------0x00000064

Hey! 0x64 is the byte from the IP address we wanted! See how where there were binary 1s in the mask
(except here represented in hex) it let the value “show through”, while everywhere that had a zero it was
masked out?
Now we can extract our digits:
(0xc633640a >> 24) & 0xff == 0x000000c6 == 0xc6
(0xc633640a >> 16) & 0xff == 0x00000033 == 0x33
(0xc633640a >> 8) & 0xff == 0x00000064 == 0x64
(0xc633640a >> 0) & 0xff == 0x0000000a == 0x0a

And those are the individual bytes of the IP address.
To get from there to dots-and-numbers, you can use an f-string or .join() in Python.

### 17.4 Subnet and Host Refresher
Recall that IP addresses are split into two portions: the subnet number and the host number. Some of the
bits on the left side of the IP address are the network number, and the remaining bits on the right are the
host number.
Let’s look at an example where the left 24 bits (3 bytes) are the subnet number and the right 8 bits (1 byte)
holds the host number.
Subnet

| Host

So that represents host 10 on subnet 198.51.100.0. (We replace the host bits with 0 when talking about
the subnet number.)

Chapter 17. IP Subnets and Subnet Masks

But I just said above, unilaterally, that there were 24 network bits in that IP address. That’s not very
concise. So they invented slash notation.
198.51.100.0/24

24 bits are used for subnet

Or you could use it with an IP address:
198.51.100.10/24

Host 10 on subnet 198.51.100.0

Let’s try it with 16 bits for the network:
10.121.2.17/16

Host 2.17 on subnet 10.121.0.0

Get it?
In those examples we used a multiple of 8 so it would align visually on a byte boundary, but there’s no
reason you can’t have a fractional part of a byte left over for a subnet:
10.121.2.68/28

Host 4 on subnet 10.121.2.64

If you don’t see where the 4 and 64 came from in the previous example, try writing the bytes out in binary!

### 17.5 Subnet Mask Refresher
What is the subnet mask? This is a run of 1 bits in binary that indicates which part of the IP address is the
network portion. It is followed by a run of 0s in binary that indicate which part is the host portion.
It’s used to determine what subnet an IP address belongs to, or what part of the IP represents the host
number.
Let’s draw one in binary. We’ll use this example IP address:
198.51.100.10/24

Host 10 on subnet 198.51.100.0

Let’s first convert to binary. (There’s a hint here that the subnet mask is a bitwise-AND mask!)
11000110.00110011.01100100.00001010

And now, above it, let’s draw a run of 24 1s (because this is a /24 subnet) followed by 8 0s (because the
IP address is 32 bits total).
11111111.11111111.11111111.00000000

11000110.00110011.01100100.00001010

subnet mask!

That is the subnet mask that corresponds to a /24 subnet! 255.255.255.0!

### 17.6 Computing the Subnet Mask from Slash Notation
If I tell you a subnet is /24, how can you determine the subnet mask is 255.255.255.0? Or if I tell you
it’s /28 that the mask is 255.255.255.240?
For a subnet /24, we need a run of 24 1s, followed by 8 0s.
Look at the Appendix: Bitwise for ways to generate runs of 1s in binary and shift them over.
Once you have that big binary number, it’s a matter of switching it back to dots-and-numbers notation,
using the technique we outlined, above.

### 17.7 Finding the Subnet for an IP address

Remember that subnets can end on any bit boundary. /17 is a fine subnet. It doesn’t have to be a multiple
of 8!

### 17.7 Finding the Subnet for an IP address
If you’re given an IP address with slash notation like this:
198.51.100.10/24

Host 10 on subnet 198.51.100.0

How can you extract just the subnet (198.51.100.0) and just the host
You can do it with bitwise-AND!
We can compute the subnet mask for /24 and get 255.255.255.0, as above.
After that, let’s take a look in binary and AND these together:
11111111.11111111.11111111.00000000
& 11000110.00110011.01100100.00001010
------------------------------------11000110.00110011.01100100.00000000

subnet mask
IP address

198.51.100.0

network number!

We can operate on the whole thing at once instead of a byte at a time, as well… we just need to cram those
numbers together into a single value, like we did in the section above:
11111111111111111111111100000000
255.255.255.0 subnet mask
& 11000110001100110110010000001010
198.51.100.10 IP address
------------------------------------11000110001100110110010000000000
198.51.100.0 network number

The AND works on the whole thing at once! Then we can convert back to dots-and-numbers notation like
we did in the previous sections.
Now what if you had the IP address and the subnet mask and wanted to get the host bits out of the IP
address, not the network bits. Do you see how you could do it? (Hint: bitwise NOT!)
Routers use this all the time–they are given an IP address and they need to know if it matches any subnets
the router is connected to. So it masks out the IP address’s network number and compares it to all the
subnets that router knows. And then forwards it toward the right one.

### 17.8 Reflect
- What is the 32-bit (4-byte) representation of the IP address 10.100.30.90 in hex? In decimal? In
binary?
- What is the dots-and-numbers IP address represented by the 32-bit number 0xc0a88225?
- What is the dots-and-numbers IP address represented by the 32-bit decimal number 180229186?
- What bitwise operations do you need to extract the second byte from the left (0xff) of the number
0x12ff5678?
- What is the slash notation for subnet mask 255.255.0.0?
- What is the subnet mask for network 192.168.1.12/24?
- What are the numeric operations necessary to convert a slash subnet mask to a binary value?
- Given an IP address value (in a single 32-bit number) and a subnet mask value (in a single 32-bit
number), what bitwise operation do you need to perform to get the subnet number from the IP
address?

Chapter 17. IP Subnets and Subnet Masks

192.168.1.0 is the network number, but it’s not the subnet mask. The subnet mask is the dots-and-numbers
value obtained from the slash notation. In this case it’s /24, which gives us 255.255.255.0.

Chapter 18

IP Routing
This chapter is all about routing over IP. This task is handled by computers called routers that know how
to direct traffic down different lines that are connected to them.
As we’ll see, every computer attached to the Internet is actually a router, but they all rely on other routers
to get the packets to their destinations.
We’re going to talk about two big ideas:
- Routing Protocols: how routers learn the “map” of the network.
- Routing Algorithm: how routers decide which direction to send packets after they’ve learned the
map.
Let’s get into it!

### 18.1 Routing Protocols
Routing protocols in general have this goal: give routers enough information to make routing decisions.
That is, when a router receives a packet on one interface, how does it decide which interface to forward it
to? How does it know which route leads to the packet’s eventual destination?

#### 18.1.1 Interior Gateway Protocols
When it comes to routing packets over the Internet, we’ll take a higher view. Let’s look at the Internet as
a bunch of clumps of networks that are more loosely connected. “Clump” is not an official industry term,
for the record. The official term is autonomous system (AS), which Wikipedia defines as:
[…] a collection of connected Internet Protocol (IP) routing prefixes under the control of one or
more network operators on behalf of a single administrative entity or domain, that presents a common and clearly defined routing policy to the Internet.
But let’s think of it as a clump for now.
For example, OSU has a clump of network. It has its own internal routers and subnets that are “on the
Internet”. A FAANG company might have another clump of Internet.
Within these clumps of Internet, an interior gateway protocol is used for routing. It’s a routing algorithm
that is optimized for smaller networks with a small number of subnets.
Here are some examples of interior gateway protocols
Abbreviation

Name

Notes

OSPF
IS-IS

Open Shortest Path First
Intermediate System to
Intermediate System

Most commonly used, IP layer
Link layer

Chapter 18. IP Routing

Abbreviation

Name

Notes

EIGRP

Enhanced Interior Gateway
Routing Protocol
Routing Information Protocol

Cisco semi-proprietary

RIP

Old, rarely used

But of course you need to be able to communicate between these clumps of Internet–the whole Internet is
connected after all. It would be a bummer if you couldn’t use Google’s servers from Oregon State. But
clearly Google’s servers don’t have a map of OSU’s network… so how do they know how to route traffic?

#### 18.1.2 Exterior Gateway Protocols
Having every router have a complete map of the Internet isn’t practical. Works fine on smaller clumps,
but not on the whole thing.
So we change it up for communication between these clumps and use an exterior gateway protocol for
routing between the clumps.
Remember the official term for “clump”? Autonomous Systems. Each autonomous system on the Internet
is assigned an autonomous system number (ASN) that is used by the border gateway protocol (BGP) to
help determine where to route packets.
Abbreviation

Name

Notes

BGP
EGP

Border Gateway Protocol
Exterior Gateway Protocol

Used everywhere
Obsolete

BGP can work in two different modes: internal BGP and external BGP. In internal mode, it acts as an
interior gateway protocol, while external mode acts as an external gateway protocol.
There’s a great video from Eye on Tech1 that concisely covers it. I highly recommend spending the two
minutes watching this to tie it all together.

### 18.2 Routing tables
A routing table is a definition of where to forward packets to get them farther along to their destination.
Or, if the router is on the destination LAN, the routing table directs the router to send the traffic out locally
at the physical layer (e.g. Ethernet).
The goal of the routing protocols we talked about above is to help routers across the Internet build their
routing tables.
All computers connected to the Internet–routers and otherwise–have routing tables. Even on your laptop,
the OS has to know what to do with different destination addresses. What if the destination is localhost?
What if it’s another computer on the same subnet? What if it’s something else?
Looking at the typical laptop as an example, the OS keeps localhost traffic on the loopback device and it
typically doesn’t go out on the network at all. From our programmer standpoint, it looks like it’s doing
network stuff, but the OS knows to route 127.0.0.1 traffic internally.
But what if you ping another computer on the same LAN as you? In that case, the OS checks the routing
table, determines it’s on the same LAN, and sends it out over Ethernet to the destination.
But what if you ping another computer on a completely different LAN than you? When that happens,
the OS can’t just send out an Ethernet frame and have it reach the destination. The destination isn’t on
the same Ethernet network! So your computer instead forwards the packet to its default gateway, that is,
the router of last resort. If your computer doesn’t have a routing table entry for the destination subnet in
question, it sends it to the default gateway, which forwards it to the greater Internet.

https://www.youtube.com/watch?v=A1KXPpqlNZ4

### 18.3 Routing Algorithm

Let’s look at an example routing table from my Linux machine, which in this example has been assigned
address 192.168.1.230.

127.0.0.0/8
127.255.255.255
192.168.1.0/24
192.168.1.255

Gateway

Device

192.168.1.1

lo
lo
lo

Let’s take a look at connecting from localhost to localhost (127.0.0.1). In that case, the OS looks
up what route matches and sends the data on the corresponding interface. In this case, that’s the loopback
interface (lo), a “fake” interface that the OS pretends is a network interface. (For performance reasons.)
But what if we send data from 127.0.0.1 to anything on the 127.0.0.0/8 subnet? It uses the lo interface
as well. And the same thing happens if we send data to the 127.255.255.255 broadcast address (on the
127.0.0.0/8 subnet).
The other entries are more interesting. Remember as you look at these that my machine has been assigned
192.168.1.230.
So if we look at line 4, above, we’re looking at the case where I send from my machine to itself. This is
like localhost except I’m deliberately using the IP attached to my wireless LAN device, wlan0. So the
OS is going to use that system, but is smart enough to not bother sending it over the wire–after all, this is
the destination.
After that, we have the case where we’re sending to any other host on the 192.168.1.0/24 subnet. So this
is like my sending from my machine as 192.168.1.230 to another machine, for example 192.168.1.22,
say. Or any other machine on that subnet.
And then on line 6 we have a broadcast address for the LAN, which also goes out on the WiFi device.
But what if all that fails? What if I’m sending from 192.168.1.230 to 203.0.113.37? That’s not an IP
or subnet listed on my destinations in my routing table.
This is what line 7 is for: the default gateway. This is where a router sends packets if it doesn’t know how
to otherwise route them.
At your house, this is the router that you got from your ISP. Or that you bought and installed yourself if
you were so-inclined.
So when I ping example.com (93.184.216.34 as of this writing) from my home computer, those packets
get sent to my default gateway because that IP and its corresponding subnet don’t appear in my computer’s
routing table.
(And they don’t appear in my default gateway’s routing table, either. So it forwards them to its default
route.)

### 18.3 Routing Algorithm
Let’s assume now that the routing protocols have done their job and all the routers have the information
they need to know where to forward packets along the way.
When the packet arrives, the router follows a sequence of steps to decide what to do with it next. (For this
discussion we’ll ignore the loopback device and assume all traffic is on an actual network.)
- If the destination IP is on the local network attached to the router
- Deliver the packet on the link (physical layer, e.g. Ethernet)
- Else If the routing table has an entry for the destination IP’s network
- Deliver to the next router toward that destination

Chapter 18. IP Routing

Figure 18.1: IP Routing Algorithm
- Else If a default route exists:
- Deliver to default gateway router
- Else
- Drop packet
- Send an ICMP “Destination Unreachable” error message back to the sender
If multiple matching routes exist, the one with the longest subnet mask is chosen.
If there is still a tie, the one with the lowest metric is used.
If there is still a tie, ECMP (Equal Cost Multi-Path) routing can be used–send the packet down both paths.

### 18.4 Routing Example
Let’s run some examples. You can download a PDF of this diagram for greater clarity2 .
In this diagram there are lot of missing things. Notably that every router interface has an IP address
attached to it.
Also note that, for example, Router 1 is directly connected to 3 subnets, and it has an IP address on each
of them.
Trace the route of these packets:

10.1.23.12
10.1.99.2
192.168.2.30
10.2.12.37

10.2.1.16
10.1.99.6
8.8.8.8
192.168.2.12

10.0.0.0/8 and
192.168.0.0/16 are private

networks and don’t get routed
over the outside Internet
10.1.17.22

10.1.17.23

https://beej.us/guide/bgnet0/source/examples/ip-routing-demo.pdf

### 18.5 Routing Loops and Time-To-Live

10.2.12.2

10.1.23.12

### 18.5 Routing Loops and Time-To-Live
It should be apparent that it would be possible to set up a loop where a packet traveled in a circle forever.
To solve this problem, IP has a field in its header: time to live (TTL). This is a one-byte counter that starts
at 255 and gets decremented every time a router forwards a packet.
When the counter reaches zero, the packet is discarded and an ICMP “Time Exceeded” error message is
returned to the sender.
So the most hops that a packet can make is 255, even in a loop.
The traceroute utility function works by sending a packet toward a destination with a TTL of 1 and
seeing who sends back the ICMP message. Then it sends out another with a TTL of 2 and sees who
responds. And it keeps increasing the TTL on subsequent packets until the ultimate destination responds.

### 18.6 The Broadcast Address
There’s a special address in IPv4 called the broadcast address. This is an address that sends a packet to
every computer on the LAN.
This is an address on a subnet with all the host bits set to 1.
For example:
Subnet

Subnet Mask

Broadcast Address

10.20.30.0/24
10.20.0.0/16
10.0.0.0/8

255.255.0.0
255.0.0.0

10.20.30.255
10.20.255.255
10.255.255.255

There’s also the broadcast address: 255.255.255.255. This goes to everyone…
…And by everyone I mean everyone on the LAN. None of these broadcast packets make it past the router,
not even 255.255.255.255. The routers don’t forward them anywhere.
The world would be a very noisy place if they did.
One of the main uses for it is when you first open your laptop on WiFi. The laptop doesn’t know its
IP, the subnet mask, the default gateway, or even whom to ask. So it sends out a broadcast packet to
255.255.255.255 with a DHCP packet asking for that information. A DHCP server is listening and can
then reply with the info.
And since you’re all wondering: IPv6 doesn’t have a broadcast address; its obviated by a thing called
IPv6 multicast. Same idea, just more focused.

### 18.7 Reflect
- What is the difference between an interior gateway protocol and an external gateway protocol?
- What is the goal of a routing protocol in general?
- What’s an example of a place where an interior gateway protocol would be used? And exterior?
- What does a router use its routing table to determine?
- What does an IP router do next with a packet if the destination IP address is not on one of its local
subnets?
- Why would a process send anything to the broadcast address?

Chapter 18. IP Routing

10.1.99.0/24

10.2.1.0/24

10.1.17.0/24

10.2.12.0/24

en2

Router 1 en3

en0 Router 2 en2

en4
en3

Destination Interface
10.1.17.0/24
10.1.99.0/24
en2
10.2.0.0/16
en3
en4

Router 5

Destination Interface
10.1.0.0/16
10.2.1.0/24
10.2.12.0/24
en2
en3

Router 6

en0 Router 3 en1

Destination Interface

ISP
Router 4

The Greater Internet

Figure 18.2: Network Diagram

Chapter 19

Project: Computing and Finding
Subnets
In preparation for our subsequent project that finds routes across the network, we need to do some work
in figuring out how IP addresses, subnet masks, and subnets all work together.
In this project we’ll put some of the work from the chapters into practice. We’ll:
- Write functions to convert dots-and-numbers IP addresses into single 32-bit values–and back again.
- Write a function that converts a subnet mask in slash notation into a single 32-bit value representing
that mask.
- Write a function to see if two IP addresses are on the same subnet.

### 19.1 Restrictions
You may not use:
- Any functionality from the socket module.
- Any functionality from the struct module.
- Any functionality from the netaddr module.
- The .to_bytes() or .from_bytes() methods.
Keep it in the realm of your own home-cooked bitwise operations.

### 19.2 What To Do
Grab the skeleton code and other files in this ZIP archive1 . This is what you’ll fill in for this project.
Implement the following functions in netfuncs.py:
- ipv4_to_value(ipv4_addr)
- value_to_ipv4(addr)
- get_subnet_mask_value(slash)
- ips_same_subnet(ip1, ip2, slash)
- get_network(ip_value, netmask)
- find_router_for_ip(routers, ip)
The descriptions of the functions are in the file in their respective docstrings. Be sure to pay special
attention to the input and output types in the examples shown there.
Note that none of the functions need be more than 5-15 lines long. If you’re getting a much bigger function
implementation, you might be off track.

https://beej.us/guide/bgnet0/source/exercises/netfuncs/netfuncs.zip

Chapter 19. Project: Computing and Finding Subnets

### 19.3 Testing as you Go
I encourage you to write one function at a time and test it out by calling it with your own sample data
before moving on to the next function.
You can add your own calls to the functions to help you verify that they’re doing what they’re supposed
to do. Use the inputs and outputs from the example comments for tests.
There is a function called my_tests() in netfuncs.py that will run instead of the default main function
if you uncomment it.
If you uncomment my_tests(), you can run the program with:
python netfuncs.py

and see the output from that function.
Be sure to comment out my_tests() and run it with the included main code before you submit, as shown
in the next section.

### 19.4 Running the Program
You’ll run it like this:
python netfuncs.py example1.json

It will read in the JSON data from the included example1.json and run your functions on various parts
of it.
The output, included in example1_output.txt, should look exactly like this if everything is working
correctly:
Routers:
10.34.166.1: netmask 255.255.255.0: network 10.34.166.0
10.34.194.1: netmask 255.255.255.0: network 10.34.194.0
10.34.209.1: netmask 255.255.255.0: network 10.34.209.0
10.34.250.1: netmask 255.255.255.0: network 10.34.250.0
10.34.46.1: netmask 255.255.255.0: network 10.34.46.0
10.34.52.1: netmask 255.255.255.0: network 10.34.52.0
10.34.53.1: netmask 255.255.255.0: network 10.34.53.0
10.34.79.1: netmask 255.255.255.0: network 10.34.79.0
10.34.91.1: netmask 255.255.255.0: network 10.34.91.0
10.34.98.1: netmask 255.255.255.0: network 10.34.98.0
IP Pairs:
10.34.194.188
10.34.209.189
10.34.209.229
10.34.250.213
10.34.250.228
10.34.250.234
10.34.46.25
10.34.52.118
10.34.52.158
10.34.52.187
10.34.52.23
10.34.52.60
10.34.79.218
10.34.79.81

10.34.91.252: different subnets
10.34.91.120: different subnets
10.34.166.26: different subnets
10.34.91.184: different subnets
10.34.52.119: different subnets
10.34.46.73: different subnets
10.34.166.228: different subnets
10.34.91.55: different subnets
10.34.166.1: different subnets
10.34.52.244: same subnet
10.34.46.130: different subnets
10.34.46.125: different subnets
10.34.79.58: same subnet
10.34.46.142: different subnets

### 19.4 Running the Program

10.34.79.99
10.34.91.205
10.34.91.68
10.34.91.97
10.34.98.184
10.34.98.33

10.34.46.205: different subnets
10.34.53.190: different subnets
10.34.79.122: different subnets
10.34.46.255: different subnets
10.34.209.6: different subnets
10.34.166.170: different subnets

Routers and corresponding IPs:
10.34.166.1: ['10.34.166.1', '10.34.166.170', '10.34.166.228', '10.34.166.26']
10.34.194.1: ['10.34.194.188']
10.34.209.1: ['10.34.209.189', '10.34.209.229', '10.34.209.6']
10.34.250.1: ['10.34.250.213', '10.34.250.228', '10.34.250.234']
10.34.46.1: ['10.34.46.125', '10.34.46.130', '10.34.46.142', '10.34.46.205', '10.34.46.25', '10.34
10.34.52.1: ['10.34.52.118', '10.34.52.119', '10.34.52.158', '10.34.52.187', '10.34.52.23', '10.34
10.34.53.1: ['10.34.53.190']
10.34.79.1: ['10.34.79.122', '10.34.79.218', '10.34.79.58', '10.34.79.81', '10.34.79.99']
10.34.91.1: ['10.34.91.120', '10.34.91.184', '10.34.91.205', '10.34.91.252', '10.34.91.55', '10.34
10.34.98.1: ['10.34.98.184', '10.34.98.33']

If you’re getting different output, try to look through the code and see what functions are being used with
the incorrect output. Then test those in more detail in the my_tests() function.

Chapter 19. Project: Computing and Finding Subnets

Chapter 20

The Link Layer and Ethernet
We’re getting down to the guts of the thing: The Link Layer.

Data Integrity,

Telnet, SSH,
SMTP, POP, IMAP

token ring

The link layer is where all the action happens, where bytes turn into electricity.
This is where Ethernet lives, as we’ll soon see.

### 20.1 A Quick Note on Octets
We’ve been using “byte” as a word meaning 8 bits, but now it’s time to get more specific.
Historically, see, a byte didn’t have to be 8 bits. (Famously, the C programming language doesn’t specify
how many bits are in a byte, exactly.) And there’s nothing preventing computer designers from just making
things up. It only so happens that basically every modern computer uses 8 bits for a byte.
In order to be more precise, people sometimes use the word octet to represent 8 bits. It’s defined to be
exactly 8 bits, period.
When someone casually says (or writes) “byte”, they probably mean 8 bits. When someone says “octet”
they most definitely mean exactly 8 bits, end of story.

### 20.2 Frames versus Packets
When we get to the Link Layer, we’ve got a bit more terminology to get used to. Data sent out over
Ethernet is a packet, but within that packet is a frame. It’s like a sub-packet.
Conversationally, people use Ethernet “frame” and “packet” interchangeably. But as we’ll see later, there
is a differentiation in the full ISO OSI layered network model.
In the simplified Internet layered network model, the differentiation is not made, thus leading to the confusing terminology.
More on this captivating tale later in this chapter.

Chapter 20. The Link Layer and Ethernet

### 20.3 MAC Addresses
Every network interface device has a MAC (Media Access Control) address. This is an address that’s
unique on the LAN (local area network) that’s used for sending and receiving data.
An Ethernet MAC address comes in the form of 6 hex bytes (12 hex digits) separated by colons (or hyphens
or periods). For example, these are all ways you might see a MAC address represented:
ac:d1:b8:df:20:85
ac-d1-b8-df-20-85
acd1.b8df.2085

MAC address must be unique on the LAN. The numbers are assigned at manufacturer and are not typically
changed by the end user. (You’d only want to change them if you happened to get unlucky and buy two
network cards that happened to have been assigned the same MAC address.)
The first three bytes of an Ethernet MAC address are called the OUI (Organizationally Unique Identifier)
that is assigned to a manufacturer. This leaves each manufacturer three bytes to uniquely represent the
cards they make. (That’s 16,777,216 possible unique combinations. If a manufacturer runs out, they can
always get another OUI–there are 16 million of those available, too!)
Funny Internet rumor: there was once a manufacturer of knockoffs of a network card called the
NE2000, itself already known as a “bargain” network card. The knockoff manufacturer took the
shortcut of burning the same MAC address into every card they made. This was discovered when
a company bought a large number of them and found that only one computer would work at a time.
Of course, in a home LAN where someone was only likely to have one of these cards, it wouldn’t
be a problem–which is what the manufacturer was banking on. To add insult (or perhaps injury)
to injury, there was no way to change the MAC address in the knockoff cards. The company was
forced to discard them all.
Except one, presumably.

### 20.4 We’re All In The Same Room (Typically)
Lots of modern link layer protocols that you’ll be directly exposed to operate on the idea that they’re all
broadcasting into a shared medium and listening for traffic that’s addressed to them.
It’s like being in a room full of talkative people and someone shouts your name–you get the data that’s
addressed to you and everyone else ignores it.
This works in real life and in protocols like Ethernet. When you transmit a packet on an Ethernet network,
everyone else on the same Ethernet LAN can see that traffic. It’s just that their network cards ignore the
traffic unless it’s specifically addressed to them.
Asterisks: there are a couple handwavey things in that paragraph.
One is that in a modern wired Ethernet, a device called a switch typically prevents packets from
going out to nodes that they’re not supposed to. So the network isn’t really as loud as the crowdedroom analogy suggests. Back before switches, we used things called hubs, which didn’t have the
brains to discriminate between destinations. They’d broadcast all Ethernet packets to all destinations.
Not every link layer protocol works this way, however. The common goal of all of them is that we’re
going to send and receive data at the wire level.

### 20.5 Multiple Access Method
Ready for some more backstory?
If everyone on the same Ethernet is in the same room yelling at other people, how does that actually work
on the wire? How do multiple entities access a shared medium in a way that they don’t conflict?

### 20.6 Ethernet

When we’re talking “medium” here, we mean wires (if you’ve plugged your computer into the
network) or radio (if you’re on WiFi).
The method particular link layer protocols use to allow multiple entities access the shared medium is called
the multiple access method, or channel access method.
There are a number of ways of doing this. On the same medium:
- You could transmit packets on different frequencies.
- You could send packets at different times, like timesharing.
- You could use spread spectrum or frequency hopping.
- You could split the network into different “cells”.
- You could add another wire to allow traffic to flow both directions at once.
Let’s again use Ethernet as an example. Ethernet is most like the “timesharing” mode, above.
But that still leaves a lot of options open for exactly how we do that.
Wired Ethernet uses something called CSMA/CD (Carrier-Sense Multiple Access with Collision Detection). Easy for you to say.
This method works like this:
1. The Ethernet card waits for quiet in the room–when no other network card is transmitting. (This is
the “CSMA” part of CSMA/CD.)
2. It starts sending.
3. It also listens while it’s sending.
4. If it receives the same thing that it sent, all is well.
If it doesn’t receive the same thing it sent, it means that another network device also started transmitting at the same time. This is a collision detection, the “CD” part of CSMA/CD.
5. To resolve the situation, the network card transmits a special signal called the “jam signal” to alert
other cards on the network that a collision has occurred and they should stop transmitting. The
network card then waits a small, partly random amount of time, and then goes back to step 1 to retry
the transmission.
WiFi (wireless) Ethernet uses something similar, except it’s CSMA/CA (Carrier-Sense Multiple Access
with Collision Avoidance). Also easy for you to say.
This method works like this:
1. The Ethernet card waits for quiet in the room–when no other network card is transmitting. (This is
the “CSMA” part of CSMA/CA.)
2. If the channel isn’t quiet, the network card waits a small, random amount of time, then goes back
to step 1 to retry.
There are a few more details omitted there, but that’s the gist of it.

### 20.6 Ethernet
Remember with the layered network model how each layer encapsulates the previous layer’s data into its
own header?
For example, HTTP data (Application Layer) gets wrapped up in a TCP (Transport Layer) header. And
then all of that gets wrapped up in an IP (Network Layer) header. And then all of that gets wrapped up in
an Ethernet (Link Layer) frame.
And recall that each protocol had its own header structure that helped it perform its job.
Ethernet is no different. It’s going to encapsulate the data from the layer above it.
Now, I want to get a little picky about terminology. The whole chunk of data that’s transmitted is the
Ethernet packet. But within it is the Ethernet frame. As we’ll see later, these correspond to two layers of

Chapter 20. The Link Layer and Ethernet

the ISO OSI layered network model (that have been condensed into a single “Link layer” in the Internet
layered network model).
Though I’ve written the frame “inside” the packet here, note that they are all transmitted as a single
bitstream.
- The Packet:
- 7 octets: Preamble (in hex: AA AA AA AA AA AA AA)
- 1 octet: Start frame delimiter (in hex: AB)
- The Frame:
- 6 octets: Destination MAC address
- 6 octets: Source MAC address
- 4 octets: “Dot1q” tag for virtual LAN differentiation.
- 2 octets: Payload Length/Ethertype (see below)
- 46-1500 octets: Payload
- 4 octets: CRC-32 checksum
- End of frame marker, loss of carrier signal
- Interpacket gap, enough time to transmit 12 octets
The Payload Length/EtherType field is used for the payload length in normal usage. But other values can
be put there that indicate an alternate payload structure.
The largest payload that can be transmitted is 1500 octets. This is known as the MTU (Maximum Transmission Unit) of the network. Data that is larger must be fragmented down to this size.
Ethernet hardware can use this 1500 number to differentiate the Payload Length/EtherType header
field. If it’s 1500 octets or fewer, it’s a length. Otherwise it’s an EtherType value.
After the frame, there’s an end-of-frame marker. This is indicated by loss of carrier signal on the wire, or
by some explicit transmission in some versions of Ethernet.
Lastly, there’s a time gap between Ethernet packets which corresponds to the amount of time it would take
to transmit 12 octets.

#### 20.6.1 Two Layers of Ethernet?
If you recall, our simplified layer model is actually a crammed-down version of the full ISO OSI 7-Layer
model:
ISO OSI Layer

Presentation

Encoding
translation,
encryption,
compression
Suspending,
terminating,
restarting sessions
between computers
Data integrity,
Encapsulation into
frames

Telnet, SMTP, POP,
IMAP
MIME, SSL/TLS,
XDR

Session

Data link
Physical

Sockets, TCP

IP IPv6, ICMP
SLIP
Ethernet physical
layer, DSL, ISDN

What we call the Internet “Link Layer” is the “Data Link” layer and the “Physical” layer.

### 20.7 Reflect

The Data Link layer of Ethernet is the frame. It’s a subset of the entire packet (outlined above) which is
defined at the Physical Layer.
Another way to consider this is that the Data Link Layer is busy thinking about logical entities like who has
what MAC address and what the payload checksum is. And that that Physical Layer is all about figuring
out which patterns of signals to send that correspond to the start and end of the packet and frame, when
to lower the carrier signal, and how long to delay between transmissions.

### 20.7 Reflect
- What’s your MAC address on your computer? Do an Internet search to find how to look it up.
- What’s the deal with frames versus packets in Ethernet? Where in the ISO OSI network stack do
they live?
- What’s the difference between a byte and an octet?
- What’s the main difference between CSMA/CD and CSMA/CA?

Chapter 20. The Link Layer and Ethernet

Chapter 21

ARP: The Address Resolution Protocol
As a networked computer, we have a problem.
We want to send data on the LAN to another computer on the same subnet.
Here’s what we need to know in order to build an Ethernet frame:
- The data we want to send and its length
- Our source MAC address
- Their destination MAC address
Here’s what we know:
- The data we want to send and its length
- Our source MAC address
- Our source IP address
- Their destination IP address
What’s missing? Even though we know the other computer’s IP address, we don’t know their MAC address.
How can we build an Ethernet frame without their MAC address? We can’t. We must get it somehow.
Again, for this section we’re talking about sending on the LAN, the local Ethernet. Not over the
Internet with IP. This is between two computers on the same Physical Layer network.
This section is all about ARP, the Address Resolution Protocol. This is how one computer can map a
different computer’s IP address to that computer’s MAC address.

### 21.1 Ethernet Broadcast Frames
We need some background first, though.
Recall that network hardware listens for Ethernet frames that are addressed specifically to it. Ethernet
frames for other MAC address destinations are ignored.
Side note: they are ignored unless the network card is placed into promiscuous mode, in which
case it receives all traffic on the LAN and forwards it to the OS.
But there’s a way to override: the broadcast frame. This is a frame that has a destination MAC address
of ff:ff:ff:ff:ff:ff. All devices on the LAN will receive that frame.
We’re going to make use of this with ARP.

### 21.2 ARP–The Address Resolution Protocol
So we have the destination’s IP address, but not its MAC address. We want its MAC address.
Here’s what’s going to happen:

Chapter 21. ARP: The Address Resolution Protocol

## 1. The source computer will broadcast a specialized Ethernet frame that contains the destination IP
address. This is the ARP request.
(Remember the EtherType field from the previous chapter? ARP packets have EtherType 0x0806
to differentiate them from regular data Ethernet packets.)
2. All computers on the LAN receive the ARP request and examine it. But only the computer with the
IP address specified in the ARP request will continue. The other computers discard the packet.
3. The destination computer with the specified IP address builds an ARP response. This Ethernet frame
contains the destination computer’s MAC address.
4. The destination computer sends the ARP response back to the source computer.
5. The source computer receives the ARP response, and now it knows the destination computer’s MAC
address.
And it’s game-on! Now that we know the MAC address, we can send with impunity.

### 21.3 ARP Caching
Since it’s a pain to ask a computer for its MAC address every time we want to send it something, we’ll
cache the result for a while.
Then, when we want to send to a particular IP on the LAN, we can look in the ARP cache and see if the
IP/Ethernet pair is already there. If so, no need to send out an ARP request–we can just transmit the data
right away.
The entries in the cache will timeout and be removed after a certain amount of time. There’s no standard
time to expiration, but I’ve seen numbers from 60 seconds to 4 hours.
Entries could go stale if the MAC address changes for a given IP address. Then the cache entry would be
out of date. The easiest way for that to happen would be if someone closed their laptop and left the network
(taking their MAC address with them), and then another person with a different laptop (and different MAC
address) showed up and was assigned the same IP address. If that happened, computers with the stale entry
would send the frames for that IP to the wrong (old) MAC address.

### 21.4 ARP Structure
The ARP data goes in the payload portion of the Ethernet frame. It’s fixed length. As mentioned before,
it’s identified by setting the EtherType/packet length field to 0x0806.
In the payload structure below, when it says “Hardware” it means the Link Layer (e.g. Ethernet in this
example) and when it says “Protocol” it means Network Layer (e.g. IP in this example). It uses those
generalized names for the fields since there’s no requirement that ARP use Ethernet or IP–it can work
with other protocols, too.
The payload structure, with a total fixed length of 28 octets:
- 2 octets: Hardware Type (Ethernet is 0x0001)
- 2 octets: Protocol Type (IPv4 is 0x8000)
- 1 octet: Hardware address length in octets (Ethernet is 0x06)
- 1 octet: Protocol address length in octets (IPv4 is 0x04)
- 2 octets: Operation (0x01 for request, 0x02 for reply)
- 6 octets: Sender hardware address (Sender MAC address)
- 4 octets: Sender protocol address (Sender IP address)
- 6 octets: Target hardware address (Target MAC address)
- 4 octets: Target protocol address (Target IP address)

### 21.5 ARP Request/Response

### 21.5 ARP Request/Response
This gets a little confusing, because the “Sender” fields are always set up from the point of view of the
computer doing the transmitting, not from the point of view of who is the requester.
So we’re going to declare that Computer 1 is the sending the ARP request, and Computer 2 is going to
respond to it.
In an ARP request from Computer 1 (“If you have this IP, what’s your MAC?”), the following fields are
set up (in addition to the rest of the boilerplate ARP request fields mentioned above):
- Sender hardware address: Computer 1’s MAC address
- Sender protocol address: Computer 1’s IP address
- Target hardware address: unused
- Target protocol address: the IP address Computer 1 is curious about
In an ARP response from Computer 2 (“I have that IP, and this is my MAC.”), the following fields are set
up:
- Sender hardware address: Computer 2’s MAC address
- Sender protocol address: Computer 2’s IP address
- Target hardware address: Computer 1’s MAC address
- Target protocol address: Computer 1’s IP address
When Computer 1 receives the ARP reply that names it as the target, it can look in the Sender fields and
get the MAC address and its corresponding IP address.
After that, Computer 1 is able to send Ethernet traffic to Computer 2’s now-known MAC address.
And that is how MAC addresses are discovered for a particular IP address!

### 21.6 Other ARP Features
#### 21.6.1 ARP Announcements
It’s not uncommon for computers that have just come online to announce their ARP information unsolicited. This gives everyone else a chance to add the data to their caches, and it overwrites potentially
stale data in those caches.

#### 21.6.2 ARP Probe
A computer can send out a specially-constructed ARP request that basically asks, “Is anyone else using
this IP address?”
Typically it asks using its own IP address; if it gets a response, it knows it has an IP conflict.

### 21.7 IPv6 and ARP
IPv6 has its own version of ARP called NDP (the Neighbor Discovery Protocol).
The eagle-eyed among you might have noticed that ARP only supports protocol addresses (e.g. IP addresses) of up to 4 bytes, and IPv6 addresses are 16 bytes.
NDP addresses this issue and more, defining a number of ICMPv6 (Internet Message Control Protocol
for IPv6) that can be used to take the place of ARP, among other things.

### 21.8 Reflect
- Describe the problem ARP is solving.
- Why do entries in ARP caches have to expire?
- Why can’t IPv6 use ARP?

Chapter 21. ARP: The Address Resolution Protocol

Chapter 22

Project 6: Routing with Dijkstra’s
Internal Gateway Protocols share information with one another such that every router has a complete make
of the network they’re a part of. This way, each router can make autonomous routing decisions given an
IP address. No matter where it’s going, the router can always forward the packet in the right direction.
IGPs like Open Shortest Path First (OSPF) use Dijkstra’s Algorithm to find the shortest path along a
weighted graph.
In this project, we’re going to simulate that routing. Were going to implement Dijkstra’s Algorithm to
print out the shortest path from one IP to another IP, showing the IPs of all the routers in between.
We won’t be using a real network for this. Rather, your program will read in a JSON file that contains the
network description and then compute the route from that.

### 22.1 Banned Functions
You’re going to implement Dijkstra’s yourself. No credit for using an existing library!

### 22.2 Graphs Refresher
Graphs are made of vertices and edges. Sometimes vertices are called “vertexes” or “verts” or “nodes”.
Edges are connections from one node to another.
Any node on the graph can be connected to any number of other nodes, even zero. A node can be connected
to every single other node. It could even connect to itself.
An edge can have a weight which generally means the cost of traversing that edge when you’re walking
a path through the graph.
For example, imagine a highway map that shows cities and highways between the cities. And each highway is labeled with its length. In this example, the cities would be vertices, the highways would be edges,
and the highway length would be the edge weight.
When traversing a graph, the goal is to minimize the total of all the edge weights that you encounter along
the way. On our map, the goal would be to choose edges from our starting city through all the intermediate
cities to our destination city that had us driving the minimum total distance.

### 22.3 Dijkstra’s Algorithm Overview
Edsger Dijkstra (DIKE-struh) was a famous computer scientist who came up with a lot of things, but one
of them was so influential it came to be known by only his name: Dijkstra’s Algorithm.
Protip: The secret to spelling “Dijkstra” is remembering that “ijk” appears in order.

Chapter 22. Project 6: Routing with Dijkstra’s

If you want to find the shortest path between nodes in an unweighted graph, you merely need to perform
a breadth-first traversal until you find what you’re looking for. Distances are only measured in “hops”.
But if you add weights to the edges between the nodes, BFT can’t help you differentiate them. Maybe
some paths are very desirable, and others are very undesirable.
Dijkstra’s can differentiate. It’s a BFT with a twist.
The gist of the algorithm is this: explore outward from the starting point, pursuing only the path with the
shortest total length so far.
Each path’s total weight is the sum of the weights of all its edges.
In a well-connected graph, there will be a lot of potential paths from the start to the destination. But since
we only pursue the shortest known path so far, we’ll never pursue one that takes us a million miles out of
the way, assuming we know of a path that is shorter than a million miles.

### 22.4 Dijkstra’s Implementation
Dijkstra’s builds a tree structure on top of a graph. When you find the shortest path from any node back
toward the start, that node records the prior node in its path as its parent.
If another shorter path comes to be found later, the parent is switched to the new shorter path’s node.
Wikipedia has some great diagrams that show it in action1 .
Now how do make it work?
Dijkstra’s itself only builds the tree representing the shortest paths back to the start. We’ll follow that
shortest path tree later to find a particular path.
- Dijkstra’s Algorithm to compute all shortest paths over a graph from a source point:
- Initialization:
- Create an empty to_visit set. This is the set of all nodes we still need to visit.
- Create a distance dictionary. For any given node (as a key), it will hold the distance
from that node to the starting node
- Create a parent dictionary. For any given node (as a key), it lists the key for the node
that leads back to the starting node (along the shortest path).
- For every node:
- Set its parent to None.
- Set its distance to infinity. (Python has infinity in math.inf, but you could also
use just a very large number, e.g. 4 billion.)
- Add the node to the to_visit set.
- Set the distance to the starting node to 0.
- Running:
- While to_visit isn’t empty:
- Find the node in to_visit with the smallest distance. Call this the “current node”.
- Remove the current node from the to_visit set.
- For each one of the current node’s neighbors still in to_visit:
- Compute the distance from the starting node to the neighbor. This is the distance
of the current node plus the edge weight to the neighbor.
- If the computed distance is less than the neighbor’s current value in distance:
- Set the neighbor’s value in distance to the computed distance.
- Set the neighbor’s parent to the current node.
- [This process is called “relaxing”. The node distances start at infinity and “relax”
down to their shortest distances.]
Wikipedia offers this pseudocode, if that’s easier to digest:

https://en.wikipedia.org/wiki/Dijkstra’s_algorithm

### 22.5 What About Our Project?

9
10
11
13
15
16
18
19

function Dijkstra(Graph, source):
for each vertex v in Graph.Vertices:
dist[v] ← INFINITY
prev[v] ← UNDEFINED
add v to Q
dist[source] ← 0
while Q is not empty:
u ← vertex in Q with min dist[u]
remove u from Q
for each neighbor v of u still in Q:
alt ← dist[u] + Graph.Edges(u, v)
if alt < dist[v]:
dist[v] ← alt
prev[v] ← u
return dist[], prev[]

At this point, we have constructed our tree made up of all the parent pointers.
To find the shortest path from one point back to the start (at the root of the tree), you need to just follow
the parent pointers from that point back up the tree.
- Get Shortest Path from source to destination:
- Set our current node to the destination node.
- Set our path to be an empty array.
- While current node is not starting node:
- Append current node to path.
- current node = the parent of current node
- Append the starting node to the path.
Of course, this will build the path in reverse order. It has to, since the parent pointers all point back to
the starting node at the root of the tree. Either reverse it at the end, or run the main Dijkstra’s algorithm
passing the destination in for the source.

#### 22.4.1 Getting the Minimum Distance
Part of the algorithm is to find the node with the minimum distance that is still in the to_visit set.
For this project, you can just do a O(n) linear search to find the node with the shortest distance so far.
In real life, this is too expensive–O(n²) performance over the number of vertices. So implementations
will use a min heap which will effectively get us the minimum in far-superior O(log n) time. This gets
us to O(n log n) over the number of verts.
If you wish the additional challenge, use a min heap.

### 22.5 What About Our Project?
[All IP addresses in this project are IPv4 addresses.]
Download the skeleton code ZIP here2 .
OK, so that was a lot of general stuff.
So what does that correspond to in the project?

https://beej.us/guide/bgnet0/source/exercises/dijkstra/dijkstra.zip

Chapter 22. Project 6: Routing with Dijkstra’s

#### 22.5.1 The Function, Inputs, and Outputs
You have to implement this function:
def dijkstras_shortest_path(routers, src_ip, dest_ip):

The function inputs are:
- routers: A dictionary representing the graph.
- src_ip: A source IP address as a dots-and-numbers string.
- dest_ip: A destination IP address as a dots-and-numbers string.
The function output is:
- An array of strings showing all the router IP addresses along the route.
- Note: If the source IP and destination IP are on the same subnet as one another, return
an empty array. No routers would be involved in this case.
Code to drive your function is already included in the skeleton code above. It will output to the console
lines like this showing the source, destination, and all routers in between:
10.34.46.25 -> 10.34.166.228

['10.34.46.1', '10.34.98.1', '10.34.166.1']

#### 22.5.2 The Graph Representation
The graph dictionary in routers looks like this excerpt:
"10.34.98.1": {
"connections": {
"10.34.166.1": {
"interface": "en0",
"ad": 70
"10.34.194.1": {
"interface": "en1",
"ad": 93
"10.34.46.1": {
"interface": "en2",
"ad": 64
"if_count": 3,
"if_prefix": "en"

The top-level keys (e.g. "10.34.98.1") are the router IPs. These are the vertices of the graph.
For each of those, you have a list of "connections" which are the edges of the graph.
In each connection, you have a field "ad" which is the edge weight.

### 22.6 Input File and Example Output

“AD” is short for Administrative Distance. This is a weight set manually or automatically (or a
mix of both) that defines how expensive a particular segment of the route is. The default value is
110. Higher numbers are more expensive.
The metric encompasses a number of ideas about the route, including how much bandwidth it
provides, how congested it is, how much the administrators want it used (or not), and so on.
The netmask for the router IP is in the "netmask" field, and there are additional "netmask" fields for all
the connection routers, as well.
The "interface" says which network device on the router is used to reach a neighboring router. It is
unused in this project.
"if_count" and "if_prefix" are also unused in this project.

### 22.6 Input File and Example Output
The skeleton archive includes an example input file (example1.json) and expected output for that file
(example1_output.json).

### 22.7 Hints
- Rely heavily on the network functions you wrote in the previous project!
- Fully understand this project description before coming up with a plan!
- Come up with a plan as much as possible before writing any code!

Chapter 22. Project 6: Routing with Dijkstra’s

Chapter 23

Project: Sniff ARP packets with
WireShark
We’re going to take a look at some live network traffic with WireShark1 and see if we can capture some
ARP requests and replies.
Wireshark is a great tool for sniffing network packets. It gives you a way to trace packets as that move
across the LAN.
We’ll set up a filter in WireShark so that we’re only looking for ARP packets to and from our specific
machines so we don’t have to search for a needle in a haystack.

### 23.1 What to Create
A document that contains 4 things:
1. Your MAC address of your currently active connection.
2. Your IP address of your currently active connection.
3. A human-readable WireShark packet capture of an ARP request.
4. A human-readable WireShark packet capture of an ARP reply.
Details below!

### 23.2 Step by Step
Here’s what we’ll do:
1. Look Up Your Ethernet (MAC) Address
Your computer might have multiple Ethernet interfaces (e.g. one for WiFi and one for wired–the
Ethernet jack on the side).
Since you’re almost certainly using wireless right now, look up the MAC address for your wireless
interface. (You might have to search online for how to do this.)
For both this step and step 2, below, the information can be found with this command on Unix-likes:
ifconfig

and this command on Windows:

https://www.wireshark.org/

Chapter 23. Project: Sniff ARP packets with WireShark

ipconfig

## 2. Look Up Your IP Address
Again, we want the IP address of your active network interface, probably your WiFi device.
3. Launch WireShark
On initial launch, set up WireShark to look at your active Ethernet device. On Linux, this might be
wlan0. On Mac, it could be en0. On Windows, it’s likely just Wi-Fi.
Set up a display filter in WireShark to filter ARP packets that are only either to or from your machine.
Type this in the bar near the top of the window, just under the blue sharkfin button.
arp and eth.addr==[your MAC address]

Don’t forget to hit RETURN after typing in the filter.
Start capturing by hitting the blue sharkfin button.
4. Find more IPs on your subnet
For this section it doesn’t matter if there’s actually a computer at the remote IP, but it’s nice if there
is. Watch the Wireshark log for a while to see what other IPs are active on your LAN.
Your IP ANDed with the subnet mask is your subnet number. Try putting various numbers
for the host portion. Try your default gateway (search the Internet for how to find your
default gateway in your OS.)
On the command line, ping another IP on your LAN:
ping [IP address]

(Hit CONTROL-C to break out of ping.)
On the first ping, did you see any ARP packets go by in Wireshark? If not, try other IP addresses
on the subnet, as noted above.
No matter how many pings you send, you should only see one ARP reply. (You’ll see one request
per ping if there are no replies!) This is because after the first reply, your computer caches the ARP
reply and no longer needs to send them out!
After a minute or five, your computer should expire that ARP cache entry and you’ll see another
ARP exchange if you ping that IP again.
5. Write Down the Request and Reply
In the timeline, the ARP request will look something like this excerpt (with different IP addresses,
obviously):
ARP 60 Who has 192.168.1.230? Tell 192.168.1.1

And if all goes well, you’ll have a reply that looks like this:
ARP 42 192.168.1.230 is at ac:d1:b8:df:20:85

[If you’re not seeing anything, try changing your display filter to just say “arp”. Watch for a while
and see if you see a request/reply pair go by.]
Click on the request and look at the details in the lower left panel. Expand the “Address Resolution
Protocol (request)” panel.
Right click any line in that panel and select “Copy->All Visible Items”.
Here’s an example request (truncated for line length):

### 23.2 Step by Step

Frame 221567: 42 bytes on wire (336 bits), 42 bytes captured [...]
Ethernet II, Src: HonHaiPr_df:20:85 (ac:d1:b8:df:20:85), Dst: [...]
Address Resolution Protocol (request)
Hardware type: Ethernet (1)
Protocol type: IPv4 (0x0800)
Hardware size: 6
Protocol size: 4
Opcode: request (1)
Sender MAC address: HonHaiPr_df:20:85 (ac:d1:b8:df:20:85)
Sender IP address: 192.168.1.230
Target MAC address: 00:00:00_00:00:00 (00:00:00:00:00:00)
Target IP address: 192.168.1.148

Click on the reply in the timeline. Copy the reply information in the same way.
Here’s an example reply (truncated for line length):
Frame 221572: 42 bytes on wire (336 bits), 42 bytes captured [...]
Ethernet II, Src: Apple_63:3c:ef (8c:85:90:63:3c:ef), Dst:
[...]
Address Resolution Protocol (reply)
Hardware type: Ethernet (1)
Protocol type: IPv4 (0x0800)
Hardware size: 6
Protocol size: 4
Opcode: reply (2)
Sender MAC address: Apple_63:3c:ef (8c:85:90:63:3c:ef)
Sender IP address: 192.168.1.148
Target MAC address: HonHaiPr_df:20:85 (ac:d1:b8:df:20:85)
Target IP address: 192.168.1.230

Chapter 23. Project: Sniff ARP packets with WireShark

Chapter 24

Network Hardware
In this chapter we’ll take a look at a number of hardware networking components.
Some of these you have at home or on your computer already.

### 24.1 Terminology and Components
- Network Topology: describes the layout of a network, how devices and nodes are connected, and
how data flows from one part of the network to another.
- Mbs: Megabits per second (compare to “MBs”, megabytes per second).
- Gbs: Gigabits per second, 1000 Mbs (compare to “GBs”, gigabytes per second).
- Bandwidth: Measured in bits per second, how much data a certain type of cable can carry over a
certain amount of time. e.g. 500 Mbs.
- ISP: Internet Service Provider, the company that you pay for your Internet connection. (Or that
provides it, even if you aren’t paying!)
- Twisted Pair Cable: What people typically think of as “Ethernet cable”. It’s a cable with plug-in
jacks on either end. Internally, pairs of wires are twisted together to reduce interference. These
cables have published maximum length “runs” that determine how far you can string a cable before
you run into trouble, usually 50-100 meters depending on the cable and traffic speed.
- 10baseT: 10 Mbs twisted-pair for Ethernet
- 100baseTX: 100 Mbs twisted-pair for Fast Ethernet.
- 1000baseT: 1 Gbs twisted-pair for Gigabit Ethernet.
- 10GbaseT: 10 Gbs twisted-pair for 10 Gigabit Ethernet.
- Category-5: Called cat-5 for short, a twisted pair wire built to category-5 specs. Good for
Fast Ethernet.
- Category-6: Called cat-6 for short, a twisted pair wire built to category-6 specs. Good for
Gigabit Ethernet.
- Network Port: Not to be confused with TCP or UDP port numbers, which are completely different,
in this context refers to a physical socket on a device where you can plug in a network cable.
- Ethernet Cable: Conversational term meaning a twisted pair cable that you plug into Ethernet
devices.
- Crossover Cable: Cable where the transmit and receive pins are swapped on one end of the cable.
This is typically used when connecting two devices directly to each other when normally a switch
or hub would be used as an intermediary. If you’re plugging one computer directly into another
with an Ethernet cable, it should probably be a crossover cable. Opposite of straight-through cable.
- Auto-sensing: A network port that can tell if it has a straight-through or cross-over cable plugged
into it, and can reverse the transmit and receive signals if it has to.

Chapter 24. Network Hardware

- Thin-net/Thick-net: Obsolete coaxial cabling used for Ethernet.

- LAN: Local Area Network. For Ethernet, this would be the network at your house. Think of a
single IP subnet.
- WAN: Wide Area Network. Network that’s not LAN. Think of a collection of LANs on University
of company campus.
- Dynamic IP: This is when your IP gets set automatically with DHCP, for example. Your IP address
might change over time.
- Static IP: This is when you hardcode the IP address for a certain device. The IP address doesn’t
change until you actively enter a new one.
- Network Interface Controller (NIC), Network Interface Card, Network Adapter, LAN
Adapter, Network Card: A bunch of different names for a hardware device that allows a
computer to get on the network. This card might have Ethernet ports on it, or maybe it’s just pure
wireless. It’s probably not even be a proper card these days–maybe it’s all on-board the same chip
as a bunch of other I/O devices built into the motherboard.
- Network Device (OS): A software device structure in the operating system that typically maps to a
NIC. Some network devices like the loopback device don’t actually use a physical piece of hardware
and just “transmit” data internally within the OS. On Unix-likes, these devices are named things
like eth0, en1, wlan2 and so on. The loopback device is typically called lo.
- MAC address: Media Access Control address. A unique Link Layer address for computers. With
Ethernet, the MAC address is 6 bytes, and is usually written as hex bytes separated by colons:
12:34:56:78:9A:BC. These address must be unique on a LAN for Ethernet to function correctly.
- Hub: A device that allows you to connect several computers via Ethernet cables. It’ll have 4, 8,
or more ports on the front. All these devices plugged into those ports are effectively on the same
“wire” once connected, which is to say that any Ethernet packet transmitted is seen by all devices
plugged into the HUB. You don’t typically see these any longer, since switches perform the same
role better.
- Switch: A hub with some brains. It knows the MAC addresses on the other side of the ports so it
doesn’t have to retransmit Ethernet packets to everyone. It just sends them down the proper wire to
the correct destination. Help prevent network overload.
- Router: A Network Layer device that have multiple interfaces and chooses the correct one to send
traffic down so that it will eventually reach its destination. Routers contain routing tables that let
them decide where to forward a packet with a given IP address.
- Default Gateway: A router that handles traffic to all other destinations, if a specific route to the
destination isn’t known. A computer’s routing table specifies the default gateway. On a home LAN,
this is the IP of the “router” the ISP gave you.
Imagine an island with a small town on it. The island is connected to the mainland by a single
bridge. If someone wants to know where to go in town, you give them directions in town. For all
other destinations, they drive across the bridge. In this analogy, the bridge is the default gateway
for traffic.
- Broadcast: To send traffic to everyone on the LAN. This can be done at the Link Layer by sending
an Ethernet frame to MAC address ff:ff:ff:ff:ff, or at the Network Layer by sending an IP
packet with all the host bits set to 1. For instance, if the network is 192.168.0.0/16, the broadcast
address would be 192.168.255.255. You can also broadcast to 255.255.255.255 for the same
effect. IP routers do not forward IP broadcast packets, so they are always restricted to the LAN.
- Wi-Fi: Short for Wireless Fidelity (a non-technical marketing trademark presumably meant to pun
Hi-Fi), this is your wireless LAN connection. Speaks Ethernet at the Link Layer. Very similar to
using an Ethernet cable, except instead of electricity over copper, it uses radio waves.
- Firewall: A computer or device at or near where your LAN connects to your ISP that filters traffic,
preventing unwanted traffic from being transmitted on your LAN. Keeps the bad guys out, hopefully.

### 24.2 Reflect

- NAT: Network Address Translation. A way to have a private IP subnet behind the NAT device that
is not visible to the rest of the Internet. The NAT device translates internal IP addresses and ports
to an external IP on the router. This is why if you go to Google and ask “what is my ip”, you’ll
get a different number than you’ll see when you look at the settings on your computer. NAT is in
the middle, translating between your internal LAN IP address and the external, publicly-visible IP
address. We’ll talk more about the details of this mechanism later.
- Private Network IPv4 Addresses: For LANs not connected to the Internet or LANs behind NAT,
there are three common subnets that are used: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
These are reserved for private use; no public sites will ever use them, so you can put them on your
LAN without worrying about conflicts.
- WiFi Modem/WiFi Router: Loosely refers to a consumer-grade device that you get when you sign
up with an ISP for service. Often does a variety of things
- Rack-mount: If a device doesn’t come in a nice plastic case or isn’t meant to be plugged directly into a computer, it might be rack-mount. These are larger non-consumer devices like routers,
switches, or banks of disks, that get stacked up in “racks”.
- Upload: Transferring a file from your local device to a remote device.
- Download: Transferring a file from a remote device to your local device.
- Symmetric: In the context of transfer speeds, means that a connection offers the same speeds in
both directions. “1 Gbs symmetric” means that upload and download speeds are 1 Gbs.
- Asymmetric: In the context of transfer speeds, means that a connection offers different speeds
in either direction. Usually written as something like “600 Mbs down, 20 Mbs up”, for example,
indicating download and upload speeds. Often shortened to “600 by 20” conversationally. Most
general usage is people download things, not uploading, so companies that provide service allocate
more of their total bandwidth on the download side.
- Cable (from the cable company): Many cable television companies offer Internet connectivity over
the coaxial cable line they’ve run to your house. Speeds up to 1 Gbs aren’t unheard of. Typically
a neighborhood shares bandwidth, so your speeds will drop in the evening when everyone living
around you is watching movies. Most cable offerings are asymmetric.
- DSL: Digital Subscriber Line. Many telephone companies offer Internet connectivity over the
phone lines they’ve run to your house. It’s slower than cable at around 100 Mbs, but bandwidth is
not shared with neighbors. Most DSL offerings are asymmetric.
- Fiber: Short for optical fiber, uses light through glass “wires” instead of electricity through copper
wires. Very quick. Many ISPs that offer relatively-cheap fiber have packages that deliver 1 Gbs
symmetric.
- Modem: Short for Modulator/Demodulator, converts signals in one form to signals in another form.
Historically, this meant turning sounds transmitted over a telephone landline into data. In modern
usage, it means converting the signals on your Ethernet LAN to whatever form is needed by the ISP,
e.g. cable or DSL.
- Bridge: A device that connects two networks at the link level, allowing them to behave as a single
network. Some bridges blindly forward all traffic, other bridges are smarter about it. Cable modems
are a type of bridge, though they often come built into the same box as a router and switch.
- Vampire Tap: Back in the old days, when you wanted to connect a computer to a thicknet cable,
you used one of these awesomely-named devices to do it. Included here just for fun.

### 24.2 Reflect
- What’s the difference between a hub and a switch?
- What does a router do?
- Why would a router with only one network connection not make any sense?

Chapter 24. Network Hardware
- What kind of device do you connect to with your laptop where you live? Do you use a physical
cable to connect?
- No need to write anything for this reflection point unless you’re inclined, but ponder what life
was like with 300 bps modems. The author’s first modem was a VICMODEM, literally two million
times slower than a modern cable connection. That was 40 years ago. Now imagine network speeds
in the year 2062.

Chapter 25

Project: Packet Tracer: Connect Two
Computers
In this project, we’re going to build a simple network between two computers using Cisco’s Packet Tracer1
tool. It’s free!
If you don’t have it installed, check out Appendix: Packet Tracer for installation information.
If at any time you make a mistake that you need to delete, choose the “Delete” tool from the second icon
row down.

### 25.1 Adding Computers to the LAN
Select “End Devices” lower left.

Figure 25.1: End Devices Icon
Then drag two “PC”s out onto the work area from the panel in the lower middle.

### 25.2 Wiring PCs Directly Together
Now that you have two PCs in the workspace, let’s wire them together.
Click on the “Connections” icon in the lower left.

https://www.netacad.com/courses/packet-tracer

Chapter 25. Project: Packet Tracer: Connect Two Computers

Figure 25.2: PC Tool Icon

Figure 25.3: Connections Icon
Click on the “Copper Cross-Over” icon in the lower middle. (The icon will change to an “anti” symbol.)

Figure 25.4: Copper Cross-Over Selection
Click on one of the PCs. Select “FastEthernet0”.
Click on the other PC. Select “FastEthernet0”.
You should now see something like this:

### 25.3 Setting Up the IP Network
Neither of these computers have IP addresses yet. We’ll set them up with static IPs of our choosing.
1. Click on PC0.
2. Click the “Config” tab.
3. Click “FastEthernet0” in the sidebar.
