---
id: beej-network-01
title: "Beej's Guide to Network Programming — Networking Overview, Introducing The Sockets API, The Layered…",
slug: beej-network-01-beej-s-guide-to-network-programming-networking-overview-intr
source: "Beej's Guide to Network Programming",
sourceSection: "2. Networking Overview, 3. Introducing The Sockets API, 4. The Layered Network Model, 5. Project: HTTP Client and Server, 6. The Internet Protocol (IP), 7. The Internet Protocol version 4, 8. The Internet Protocol version 6, 9. Project: A Better Web Server, 10. Endianness and Integers, 11. Parsing P"
track: networking-dns,
tier: premium
tags: [network-programming, sockets, c, tcp-ip]
summary: "Circuit Switched . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Covers 43 sections: Networking Overview, Introducing The Sockets API, The Layered Network Model.",
---
# Beej's Guide to Network Programming — Networking Overview, Introducing The Sockets API, The Layered…

## 2. Networking Overview
2.1
Circuit Switched . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2
Packet Switched . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.3
Client/Server Architecture . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.4
The OS, Network Programming, and Sockets . . . . . . . . . . . . . . . . . . . . . .
2.5
Protocols . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.6
Network Layers and Abstraction . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7
Wired versus Wireless . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.8

## 3. Introducing The Sockets API
3.1
Client Connection Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.2
Server Listening Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3
3.4
Resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 4. The Layered Network Model
4.1
The Layered Network Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.2
An Example of Layering of Protocols on Data . . . . . . . . . . . . . . . . . . . . .
4.3
The Internet Layer Model . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.4
The ISO OSI Network Layer Model . . . . . . . . . . . . . . . . . . . . . . . . . .
4.5

11
15

## 5. Project: HTTP Client and Server
5.1
Restrictions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.2
Python Character Encoding . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.3
HTTP Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.4
The Client . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.5
The Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6
Hints and Help . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6.1 Address Already In Use . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6.2 Receiving Partial Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6.3 HTTP 301, HTTP 302 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6.4 HTTP 400, HTTP 501 (or any 500s) . . . . . . . . . . . . . . . . . . . . . . .
5.6.5 HTTP 404 Not Found! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.7
Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

18
19
20
21
21
23
23

## 6. The Internet Protocol (IP)
6.1
Terminology . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

iii

iv
6.2
6.3
6.4
6.5
6.6
6.7

Two Common Versions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Additional IP-layer Protocols . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Private Networks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Static versus Dynamic IP Addresses, and DHCP . . . . . . . . . . . . . . . . . . . .

27

## 7. The Internet Protocol version 4
7.1
IP Addresses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.2
Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.3
Subnet Masks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.4
Historic Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.5
Special Addresses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.6
Special Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.7

## 8. The Internet Protocol version 6
8.1
Representation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.2
Link-Local Addresses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.3
Special IPv6 Addresses and Subnets . . . . . . . . . . . . . . . . . . . . . . . . . .
8.4
IPv6 and DNS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.5
IPv6 and URLs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.6

35
35
37
37

## 9. Project: A Better Web Server
9.1
Restrictions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.2
The Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.3
Parsing the Request Header . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.4
Stripping the Path down to the Filename . . . . . . . . . . . . . . . . . . . . . . . .
9.5
MIME and Getting the Content-Type . . . . . . . . . . . . . . . . . . . . . . . . .
9.6
Reading the File, Content-Length, and Handling Not Found . . . . . . . . . . . . .
9.7
Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.8
Example Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.8.1 file1.txt . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.8.2 file2.html . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

40
40
41
42
43

## 10. Endianness and Integers
10.1 Integer Representations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.1.1 Decimal Byte Representation . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.1.2 Binary Byte Representations . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.1.3 Hexadecimal Byte Representations . . . . . . . . . . . . . . . . . . . . . . . .
10.2 Endianness . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.3 Python and Endianness . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.3.1 Converting a Number to Bytes . . . . . . . . . . . . . . . . . . . . . . . . . .
10.3.2 Convert Bytes Back to a Number . . . . . . . . . . . . . . . . . . . . . . . . .
10.4 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

46
47
47
48
48
49
49

## 11. Parsing Packets
11.1 You Know What Would Make This Easy? . . . . . . . . . . . . . . . . . . . . . . .
11.2 Processing a Stream into Packets . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.3 The Sentences Example Again . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.3.1 What If You Receive Multiple Sentences at Once? . . . . . . . . . . . . . . . .
11.4 The Grand Scheme . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.5 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

52
52
53
54
54

## 12. Project: Atomic Time
12.1 Note On Legality . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.2 Note On Allowable Use . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3 Epoch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

v

12.4
12.5

A Dire Warning about Zeros . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
The Gameplan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5.1 1. Connect to the Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5.2 2. Receive the Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5.3 3. Decode the Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5.4 4. Print Out NIST’s Time . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5.5 5. Print Out the System Time . . . . . . . . . . . . . . . . . . . . . . . . . . .

57
57

## 13. Project: The Word Server
13.1 Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.2 What is a “Word Packet”? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.3 Implementation: get_next_word_packet() . . . . . . . . . . . . . . . . . . . . .
13.4 Implementation: extract_word() . . . . . . . . . . . . . . . . . . . . . . . . . . .

60
61

## 14. Transmission Control Protocol (TCP)
14.1 Goals of TCP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.2 Location in the Network Stack . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.3 TCP Ports . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.4 TCP Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.4.1 Making the Connection . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.4.2 Transmitting Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.4.3 Closing the Connection . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.5 Data Integrity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.5.1 Packet Ordering . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.5.2 Error Detection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.6 Flow Control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.7 Congestion Control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.7.1 Slow Start . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.7.2 Congestion Avoidance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.8 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

66
66
67
67

## 15. User Datagram Protocol (UDP)
15.1 Goals of UDP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.2 Location in the Network Stack . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.3 UDP Ports . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.4 UDP Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.5 Data Integrity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.5.1 Error Detection . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.6 Maximum Payload Without Fragmentation . . . . . . . . . . . . . . . . . . . . . . .
15.7 What’s the Use? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.8 UDP (Datagram) Sockets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.8.1 Server Procedure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.8.2 Client Procedure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.9 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

72
72
73

## 16. Project: Validating a TCP Packet
16.1 Banned Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.2 How To Code This . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.3 Checksum in General . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.4 Input File Details . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.4.1 The .txt File . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.4.2 The .dat File . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.5 How On Earth Do You Compute A TCP Checksum? . . . . . . . . . . . . . . . . . .
16.6 The IP Pseudo Header . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.6.1 Example Pseudo Header . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.6.2 Getting the IP Address Bytes . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.6.3 Getting the TCP Data Length . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.7 The TCP Header Checksum . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.8 Actually Computing the Checksum . . . . . . . . . . . . . . . . . . . . . . . . . . .

77
77
79
79

vi

16.9 Final Comparison . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.10 Output . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.11 Success . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 17. IP Subnets and Subnet Masks
17.1 Address Representation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
17.2 Converting from Dots-and-Numbers . . . . . . . . . . . . . . . . . . . . . . . . . .
17.3 Converting to Dots-and-Numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . .
17.4 Subnet and Host Refresher . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
17.5 Subnet Mask Refresher . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
17.6 Computing the Subnet Mask from Slash Notation . . . . . . . . . . . . . . . . . . .
17.7 Finding the Subnet for an IP address . . . . . . . . . . . . . . . . . . . . . . . . . .
17.8 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

83
83
84
84
85
86
86
87
87

## 18. IP Routing
18.1 Routing Protocols . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.1.1 Interior Gateway Protocols . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.1.2 Exterior Gateway Protocols . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.2 Routing tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.3 Routing Algorithm . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.4 Routing Example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.5 Routing Loops and Time-To-Live . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.6 The Broadcast Address . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
18.7 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

90
90
91
92

## 19. Project: Computing and Finding Subnets
19.1 Restrictions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
19.2 What To Do . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
19.3 Testing as you Go . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
19.4 Running the Program . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 20. The Link Layer and Ethernet
99
20.1 A Quick Note on Octets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 99
### 20.2 Frames versus Packets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 99
### 20.3 MAC Addresses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
### 20.4 We’re All In The Same Room (Typically) . . . . . . . . . . . . . . . . . . . . . . . 100
### 20.5 Multiple Access Method . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
### 20.6 Ethernet . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 101
#### 20.6.1 Two Layers of Ethernet? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 102
### 20.7 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 103
## 21. ARP: The Address Resolution Protocol
105
21.1 Ethernet Broadcast Frames . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 105
### 21.2 ARP–The Address Resolution Protocol . . . . . . . . . . . . . . . . . . . . . . . . . 105
### 21.3 ARP Caching . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 106
### 21.4 ARP Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 106
### 21.5 ARP Request/Response . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
### 21.6 Other ARP Features . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
#### 21.6.1 ARP Announcements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
#### 21.6.2 ARP Probe . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
### 21.7 IPv6 and ARP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
### 21.8 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
## 22. Project 6: Routing with Dijkstra’s
109
22.1 Banned Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109
### 22.2 Graphs Refresher . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109
### 22.3 Dijkstra’s Algorithm Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109
### 22.4 Dijkstra’s Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 110
#### 22.4.1 Getting the Minimum Distance . . . . . . . . . . . . . . . . . . . . . . . . . . 111

vii

22.5

111
112
112
113
113

What About Our Project? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
22.5.1 The Function, Inputs, and Outputs . . . . . . . . . . . . . . . . . . . . . . . .
22.5.2 The Graph Representation . . . . . . . . . . . . . . . . . . . . . . . . . . . .
22.6 Input File and Example Output . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
22.7 Hints . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 23. Project: Sniff ARP packets with WireShark
115
23.1 What to Create . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 115
### 23.2 Step by Step . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 115
## 24. Network Hardware
119
24.1 Terminology and Components . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 119
### 24.2 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 121
## 25. Project: Packet Tracer: Connect Two Computers
123
25.1 Adding Computers to the LAN . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123
### 25.2 Wiring PCs Directly Together . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123
### 25.3 Setting Up the IP Network . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 124
### 25.4 Pinging Across the Network . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
### 25.5 Saving the Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
## 26. Project: Packet Tracer: Using a Switch
127
26.1 Add Some PCs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 127
### 26.2 Add a Switch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 127
### 26.3 Wire It Up . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 127
### 26.4 Test Pings! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 128
## 27. Project: Packet Tracer: Using a Router
129
27.1 Build the LANs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 129
### 27.2 Adding a Router . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 130
### 27.3 Adding a Default Route . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 130
### 27.4 Try It Out! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
## 28. Project: Packet Tracer: Multiple Routers
133
28.1 What We’re Building . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
### 28.2 Drag Out the Components . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
### 28.3 Setting Up the Middle Router . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 134
### 28.4 Set up the Three LAN Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 134
### 28.5 Set the Default Gateway on All PCs . . . . . . . . . . . . . . . . . . . . . . . . . . 135
### 28.6 Setting Up the Router Subnets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 135
### 28.7 Setting Up the Routing Tables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 136
### 28.8 Test It Out! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
## 29. Select
139
29.1 The Problem We’re Solving . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
### 29.2 Using select() . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
### 29.3 Using select() with Listening Sockets . . . . . . . . . . . . . . . . . . . . . . . . 140
### 29.4 The Main Algorithm . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 140
### 29.5 What About Those Other Arguments to select()? . . . . . . . . . . . . . . . . . . 140
#### 29.5.1 The Timeout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
### 29.6 Using select() with send() . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
### 29.7 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
## 30. Project: Using Select
143
30.1 Demo Code . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
### 30.2 Features to Add . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
### 30.3 Example Run . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
## 31. Domain Name System (DNS)
145
31.1 Typical Usage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 145

viii
31.2
31.3
31.4
31.5
31.6
31.7
31.8

Domains and IP Addresses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 145
(Domain) Name Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 146
Root Name Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 146
Example Run . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 146
Zones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 147
Resolver Library . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 147
Caching Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
31.8.1 Time To Live . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
### 31.9 Record Types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
### 31.10 Dynamic DNS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 149
### 31.11 Reverse DNS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 149
### 31.12 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 149
## 32. Network Address Translation (NAT)
151
32.1 A Snail-Mail Analogy . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
### 32.2 Why? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
#### 32.2.1 Hiding Your Network . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 152
#### 32.2.2 IPv4 Exhaustion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 152
### 32.3 Private Networks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 152
### 32.4 How it Works . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 152
### 32.5 NAT and IPv6 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
### 32.6 Port Forwarding . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
### 32.7 Review . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 155
## 33. Dynamic Host Configuration Protocol (DHCP)
157
33.1 Operation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 157
### 33.2 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 158
## 34. Project: Digging DNS Info
159
34.1 Installation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 159
### 34.2 Try it Out . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 159
### 34.3 Time To Live (TTL) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
### 34.4 Authoritative Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
### 34.5 Getting the Root Name Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
### 34.6 Digging at a Specific Name Server . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
### 34.7 Digging at a Root Name Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
### 34.8 What to Do . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
## 35. Port Scanning
163
35.1 Mechanics of a Portscanner . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
#### 35.1.1 Portscanning UDP . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
### 35.2 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
## 36. Firewalls
165
36.1 Firewall Operation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 165
### 36.2 Firewalls and NAT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 36.3 Local Firewalls . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 36.4 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
## 37. Trusting User Data
167
37.1 Buffer Overflow/Overrun . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 167
### 37.2 Injection Attacks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
#### 37.2.1 System Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
#### 37.2.2 SQL Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
#### 37.2.3 Cross-Site Scripting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 169
### 37.3 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 170
## 38. Project: Port Scanning

171

ix

## 39. Project: Multiuser Chat Client and Server
173
39.1 Overall Architecture . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 173
#### 39.1.1 Server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 173
#### 39.1.2 Client . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 174
### 39.2 Client I/O . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 174
#### 39.2.1 Special User Input . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 175
### 39.3 The Client TUI . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 175
#### 39.3.1 Curses Variant of chatui . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
### 39.4 Packet Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
### 39.5 JSON Payloads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
39.5.1 “Hello” Payload . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
39.5.2 “Chat” Payload . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
39.5.3 “Join” Payload . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
39.5.4 “Leave” Payload . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
39.6 Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
### 39.7 Some Recommendations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 178
## 40. Appendix: Bitwise Operations
179
40.1 Coding Different Bases in Python . . . . . . . . . . . . . . . . . . . . . . . . . . . 179
### 40.2 Printing and Converting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 180
### 40.3 Bitwise-AND . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 180
### 40.4 Bitwise-OR . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
### 40.5 Bitwise-NOT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 40.6 Bitwise shift . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 40.7 Setting a Given Number of 1 bits . . . . . . . . . . . . . . . . . . . . . . . . . . . . 183
### 40.8 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 184
## 41. Appendix: Installing Packet Tracer
185
41.1 Download Packet Tracer . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 185
### 41.2 Run Packet Tracer . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 185
## 42. Appendix: Multithreading
187
42.1 Concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 187
### 42.2 Multithreading In Python . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
### 42.3 Daemon Threads . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
#### 42.3.1 This is Somehow Related to CTRL-C . . . . . . . . . . . . . . . . . . . . . . . 189
### 42.4 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
### 42.5 Threading Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
#### 42.5.1 What We’re Building . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
#### 42.5.2 Overall Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
#### 42.5.3 Useful Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
#### 42.5.4 Things the Thread Running Function Needs . . . . . . . . . . . . . . . . . . . 191
#### 42.5.5 Example Run . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
#### 42.5.6 Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
## 43. Appendix: JSON
193
43.1 JSON versus Native . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 43.2 Converting Back and Forth . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 43.3 Pretty Printing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 43.4 Double Quotes are Important . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 43.5 Reflect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194

x

Chapter 1

Foreword
What is this? Well, it’s a guide to a bunch of concepts that you might see in networking. It’s not Network
Programming in C—see Beej’s Guide to Network Programming1 for that. But it is here to help make sense
of the terminology, and also to do a bit of network programming in Python.
Is it Beej’s Guide to Network Programming in Python? Well, kinda, actually. The C book is more about
how C’s (well, Unix’s) network API works. And this book is more about the concepts underlying it, using
Python as a vehicle.
I trust that’s perfectly confusing. Maybe just skip to the Audience section, below.

### 1.1 Audience
Are you completely new to networking and are confused by all these terms like ISO-OSI, TCP/IP, ports,
Ethernet, LANs, and all that? And maybe you want to write some network-capable code in Python?
Congrats! You’re the target audience!
But be forewarned: this guide assumes that you’ve already got some Python programming knowledge
under your belt.

### 1.2 Official Homepage
This official location of this document is (currently) https://beej.us/guide/bgnet0/2 .

### 1.3 Email Policy
I’m generally available to help out with email questions so feel free to write in, but I can’t guarantee a
response. I lead a pretty busy life and there are times when I just can’t answer a question you have. When
that’s the case, I usually just delete the message. It’s nothing personal; I just won’t ever have the time to
give the detailed answer you require.
As a rule, the more complex the question, the less likely I am to respond. If you can narrow down your
question before mailing it and be sure to include any pertinent information (like platform, compiler, error
messages you’re getting, and anything else you think might help me troubleshoot), you’re much more
likely to get a response.
If you don’t get a response, hack on it some more, try to find the answer, and if it’s still elusive, then write
me again with the information you’ve found and hopefully it will be enough for me to help out.
Now that I’ve badgered you about how to write and not write me, I’d just like to let you know that I fully
appreciate all the praise the guide has received over the years. It’s a real morale boost, and it gladdens me
to hear that it is being used for good! :-) Thank you!

https://beej.us/guide/bgnet
https://beej.us/guide/bgnet0/

Chapter 1. Foreword

### 1.4 Mirroring
You are more than welcome to mirror this site, whether publicly or privately. If you publicly mirror the
site and want me to link to it from the main page, drop me a line at beej@beej.us.

### 1.5 Note for Translators
If you want to translate the guide into another language, write me at beej@beej.us and I’ll link to your
translation from the main page. Feel free to add your name and contact info to the translation.
Please note the license restrictions in the Copyright and Distribution section, below.

### 1.6 Copyright and Distribution
Beej’s Guide to Networking Concepts is Copyright © 2023 Brian “Beej Jorgensen” Hall.
With specific exceptions for source code and translations, below, this work is licensed under the Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License. To view a copy of this
license, visit https://creativecommons.org/licenses/by-nc-nd/3.0/ or send a letter to Creative
Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
One specific exception to the “No Derivative Works” portion of the license is as follows: this guide may
be freely translated into any language, provided the translation is accurate, and the guide is reprinted in
its entirety. The same license restrictions apply to the translation as to the original guide. The translation
may also include the name and contact information for the translator.
The programming source code presented in this document is hereby granted to the public domain, and is
completely free of any license restriction.
Educators are freely encouraged to recommend or supply copies of this guide to their students.
Contact beej@beej.us for more information.

### 1.7 Dedication
The hardest things about writing these guides are:
- Learning the material in enough detail to be able to explain it
- Figuring out the best way to explain it clearly, a seemingly-endless iterative process
- Putting myself out there as a so-called authority, when really I’m just a regular human trying to
make sense of it all, just like everyone else
- Keeping at it when so many other things draw my attention
A lot of people have helped me through this process, and I want to acknowledge those who have made
this book possible.
- Everyone on the Internet who decided to help share their knowledge in one form or another. The
free sharing of instructive information is what makes the Internet the great place that it is.
- Everyone who submitted corrections and pull-requests on everything from misleading instructions
to typos.
Thank you! ♥

Chapter 2

Networking Overview
The Big Idea of networking is that we’re going to get arbitrary bytes of data exchanged between two (or
more) computers on the Internet or LAN.
So we need:
- A way of identifying the source and destination computers.
- A way of maintaining data integrity.
- A way of routing data from one computer to another (out of billions).
And we need all the hardware and software support to make this happen.
Let’s take a look at two basic kinds of communications networks.

### 2.1 Circuit Switched
Don’t be alarmed! The Internet doesn’t use this type of network (at least not as far as it is aware). So you
can read the rest of this section with the confident knowledge that you won’t have to use it again.
For this type of network, visualize an old-school telephone operator (like a human operator). Back before
you could dial numbers directly, a call went something like this:
You’d pick up the receiver and turn a crank on it to generate an electrical signal that rang a bell at the other
end of the phone line, which was in some telephone exchange office somewhere.
An operator would hear the bell and pick up the other end and say something appropriate like, “Operator.”
And you’d tell (like with your voice) the operator what number you wanted to connect to.
Then the operator would physically plug jumper wires into the switchboard in front of them to physically
complete an electrical connection between your phone and the phone of the person you wanted to call.
You’d have a direct wire from your phone to their phone.
This scales very poorly. And if you had to make a long distance call, that cost extra, because an operator
would have to call another operator over a limited number of long-distance lines.
Eventually, people figured out they could replace the human operators with electro-mechanical relays and
switches that you could control by sending carefully coded signals down the line, either electrical pulses
(sent by old rotary dial phones) or the still-recognizable “touch” tones.
But we still had problems:
- A dedicated circuit was needed for every call.
- Even if you sat there quietly saying nothing, the circuit was still occupied and couldn’t be used by
anyone else.
- Multiple people couldn’t use the same line at the same time.
- There were a limited number of wires you could string up.
So the Internet took a different approach.

Chapter 2. Networking Overview

### 2.2 Packet Switched
In a packet switched network, the data you want to send is split up into individual packets of varying
numbers of bytes. If you want to send 83,234 bytes of data, that might be split up into 50 or 60 packets.
Then each of these packets are individually sent over the lines as space permits.
Imagine little packets of data from computers all over North America arriving at a router at the edge of
the Atlantic Ocean which sends them, one at a time, over a thousands-of-miles-long undersea cable to
Europe.
Once the packets arrive at their destination computer, that computer reconstructs the data from the individual packets.
This is analogous to writing a snail-mail letter and putting it in the post. It ends up in a truck with a bunch
of other pieces of mail that aren’t going to the same place as yours.
The post office routes the letters through the appropriate mailing facilities until they arrive.
Maybe your letter gets on a plane headed for the opposite side of the country with a bunch of other letters.
And when the plane arrives, those letters might part, with some going north and some going south.
They don’t use a whole plane for a single letter–the letters are like packets, and they get switched from
one transportation medium to another.
In the same way, packets of data on the Internet will move from computer to computer, sharing the lines
between those computers with other traffic, until they finally get where they’re going.
And this affords some great advantages in a computer network:
- You don’t need a dedicated circuit between every communicating pair of computers (this would
likely be a physical impossibility if we wanted to support the amount of traffic we currently have
today).
- Multiple computers can all use the same wire to send data at the “same” time. (The packets actually
go one at a time, but they’re interleaved so it looks simultaneous.)
- A wire can be utilized to full capacity; there’s no “dead air” that goes unused if someone wants to
use it. One computer’s silence is another computer’s opportunity to transmit on the same wire.

### 2.3 Client/Server Architecture
You know this from using the web–you’ve heard of web servers.
A server is a program that listens for incoming connections, accepts them, and then typically receives a
request from the client and sends back a response to the client.
Actual conversations between the server and client might be far more complex depending on what the
server does.
But both the client and server are network programs. The practical difference is the server is the program
sitting there waiting for clients to call.
Typically one server exists for many clients. Many servers might exist in a server farm to serve many,
many, many clients. Think about how many people use Google at the same time.

### 2.4 The OS, Network Programming, and Sockets
The network is hardware, and the OS controls all access to hardware. So if you want to write software to
use the network, you have to do it through the OS.
Historically, and modernly, this was done using an API called the sockets API that was pioneered on Unix.
The Unix sockets API is very general purpose, but one of the many things it can do is give you a way to
read and write data over the Internet.

### 2.5 Protocols

Other languages and operating systems have added the same Internet functionality over time, and many
of them use different calls in their APIs. But as an homage to the original, many of these APIs are still
called “sockets” APIs even if they don’t match the original.
If you want to use the original sockets API, you can do it programming with C in Unix.

### 2.5 Protocols
You know that conversation that the client and server have? It’s written down very specifically what bytes
get sent when and from and to whom. You can’t just send any old data to a web server–it has to be wrapped
up a certain way.
Just like you can’t take a letter, wrap it up in aluminum foil with no address, and expect the post office to
deliver it to your intended recipient. That’s breaking post office protocol.
Both the sender and recipient have to be speaking the same protocol for correct communication to occur.
“Thank you for calling The Pizza Restaurant. Can I help you?” “Would you like fries with that?”
A person calling a pizza restaurant breaks protocol.
There are many protocols, and we’ll cover a few of them in detail later. These were invented by people to
solve different sorts of problems. If you need to pass data between two specialized programs you write,
you’ll have to define a protocol for that, too!
Here are some common ones you might have heard of:
- TCP - used to transmit data reliably.
- UDP - used to transmit data quickly and unreliably.
- IP - used to route packets over the network from one computer to another.
- HTTP - used to get web pages and make other web requests.
- Ethernet - used to send data over a LAN.
As we’ll see in a moment, these protocols “live” at different layers of the network software.

### 2.6 Network Layers and Abstraction
Here’s a quick overview of what happens when data goes out on the network. We’ll cover this in much
more detail in the coming modules.
1. A user program says, “I want to send the bytes ‘GET / HTTP/1.1’ to that web server over there.”
(Servers are identified by IP address and a port on the Internet–more on that later.)
2. The OS takes the data and wraps it up in a header (that is, prepends some data) that provides error
detection (and maybe ordering) information. The exact structure of this header would be defined
by a protocol such as TCP or UDP.
3. The OS takes all of that, and wraps it up in another header that helps with routing. This header
would be defined by the IP protocol.
4. The OS hands all that data to the network interface card (the NIC–the piece of hardware that’s
responsible for networking).
5. The NIC wraps all that data up into another header that’s defined by a protocol such as Ethernet
that helps with delivery on the LAN.
6. The NIC sends the entire, multiply-wrapped data out over the wire, or over the air (with WiFi).
When the receiving computer gets the packet, the reverse process happens. Its NIC strips the Ethernet
header, the OS makes sure the IP address is correct, figures out which program is listening on that port,
and sends it the fully unwrapped data.
All these different layers that do all this wrapping are together called the protocol stack. (This is a different
usage of the word “stack” than the stack abstract data type.)

Chapter 2. Networking Overview

This works well because each layer is responsible for different parts of the process, e.g. one layer handles
data integrity, and another handles routing the packet over the network, and another handles the data itself
that is being transmitted between the programs. And each layer doesn’t care about what the layers below
it are doing with the data.
It’s that last concept that’s really important: when data is going over WiFi, the WiFi hardware doesn’t
even care what the data is, if it’s Internet data or not, how integrity is assured (or not). All WiFi cares
about is getting a big chunk of data transmitted over the air to another computer. When it arrives at the
other computer, that computer will strip off the Ethernet stuff and look deeper in the packet, deciding what
to do with it.
And since the layers don’t care what data is encapsulated below them, you can swap out protocols at
various layers and still have the rest of them work. So if you’re writing a program at the top layer (where
we tend to write them most commonly), you don’t care what’s happening at the layers below that. It’s
Somebody Else’s Problem.
For example, you might be getting a web page with HTTP/TCP/IP/Ethernet, or you might be transmitting
a file to another computer with TFTP/UDP/IP/Ethernet. IP and Ethernet work fine in both cases, because
they are indifferent about the data they are sending.
There are many, many details omitted from this description, but we’re still in high-level overview land.

### 2.7 Wired versus Wireless
When we’re talking about LANs, we can think about network programming as if these two things were
the same:
- Computers on a LAN connected by physical Ethernet cables[1].
- Computers on a LAN all connected to the same WiFi access point.
Turns out they both use the Ethernet protocol for low-level communication.
So when we say the computers are on the same LAN, we mean they are either wired together or they are
using the same WiFi access point.
[1] It’s a bit wrong to call them “Ethernet cables” because they are just wires, and Ethernet is a protocol
that effectively defines patterns of electricity that go over those wires. But what I mean is, “a cable that
is commonly used with Ethernet”.

### 2.8 Reflect
- Is the Internet circuit-switched or packet-switched?
- What is the relationship between a client program and a server program?
- What role does the OS play when you’re writing networked programs?
- What is a protocol?
- What are the reasons for having a protocol stack and data encapsulation?
- What are the practical differences between a WiFi network and a wired network?

Chapter 3

Introducing The Sockets API
In Unix, the sockets API generally gives processes a way to communicate with one another. It supports a
variety of methods of communication, and one of those methods is over the Internet.
And that’s the one we’re interested in right now.
In C and Unix, the sockets API is a blend of library calls and system calls (functions that call the OS
directly).
In Python, the Python sockets API is a library that calls the lower-level C sockets API. At least on Unixlikes. On other platforms, it will call whatever API that OS exposes for network communication.
We’re going to use this to write programs that communicate over the Internet!

### 3.1 Client Connection Process
The most confusing thing about using sockets is that there are generally several steps you have to take to
connect to another computer, and they’re not obvious.
But they are:
1. Ask the OS for a socket. In C, this is just a file descriptor (an integer) that will be used from here
on to refer to this network connection. Python will return an object representing the socket. Other
language APIs might return different things.
But the important thing about this step is that you have a way to refer to this socket for upcoming
data transmission. Note that it’s not connected to anything yet at all.
2. Perform a DNS lookup to convert the human-readable name (like example.com) into an IP address
(like 198.51.100.12). DNS is the distributed database that holds this mapping, and we query it to
get the IP address.
We need the IP address so that we know the machine to connect to.
Python Hint: While you can do DNS lookups in Python with socket.getaddrinfo(), just calling
socket.connect() with a hostname will do the DNS lookup for you. So you can skip this step.
Optional C Hint: Use getaddrinfo() to perform this lookup.
3. Connect the socket to that IP address on a specific port.
Think of a port number like an open door that you can connect through. They’re integers that range
from 0 to 65535.
A good example port to remember is 80, which is the standard port used for servers that speak the
HTTP protocol (unencrypted).
There must be a server listening on that port on that remote computer, or the connection will fail.

Chapter 3. Introducing The Sockets API

4. Send data and receive data. This is the part we’ve been waiting for.
Data is sent as a sequence of bytes.
5. Close the connection. When we’re done, we close the socket indicating to the remote side that we
have nothing more to say. The remote side can also close the connection any time it wishes.

### 3.2 Server Listening Process
Writing a server program is a little bit different.
1. Ask the OS for a socket. Just like with the client.
## 2. Bind the socket to a port. This is where you assign a port number to the server that other clients
can connect to. “I’m going to be listening on port 80!” for instance.
Caveat: programs that aren’t run as root/administrator can’t bind to ports under 1024–those are
reserved. Choose a big, uncommon port number for your servers, like something in the 15,00030,000 range. If you try to bind to a port another server is using, you’ll get an “Address already in
use” error.
Ports are per-computer. It’s OK if two different computers use the same port. But two programs on
the same computer cannot use the same port on that computer.
Fun fact: clients are bound to a port, as well. If you don’t explicitly bind them, they get assigned
an unused port when the connect–which is usually what we want.
3. Listen for incoming connections. We have to let the OS know when it gets an incoming connection
request on the port we selected.
4. Accept incoming connections. The server will block (it will sleep) when you try to accept a new
connection if none are pending. Then it wakes up when someone tries to connect.
Accept returns a new socket! This is confusing. The original socket the server made in step 1 is
still there listening for new connections. When the connection arrives, the OS makes a new socket
specifically for that one connection. This way the server can handle multiple clients at once.
Sometimes the server spawns a new thread or process to handle each new client. But there’s no law
that says it has to.
5. Send data and receive data. This is typically where the server would receive a request from the
client, and the server would send back the response to that request.
6. Go back and accept another connection. Servers tend to be long-running processes and handle
many requests over their lifetimes.

### 3.3 Reflect
- What role does bind() play on the server side?
- Would a client ever call bind()? (Might have to search this one on the Internet.)
- Speculate on why accept() returns a new socket as opposed to just reusing the one we called
listen() with.
- What would happen if the server didn’t loop to another accept() call? What would happen when
a second client tried to connect?
- If one computer is using TCP port 3490, can another computer use port 3490?
- Speculate about why ports exist. What functionality do they make possible that plain IP addresses
do not?

### 3.4 Resources

### 3.4 Resources
- Python Sockets Documentation
- Beej’s Guide to Network Programming1 –optional, for C devs

https://beej.us/guide/bgnet

9

Chapter 3. Introducing The Sockets API

Chapter 4

The Layered Network Model
Before we get started, here are some terms to know:
- IP Address – historically 4-byte number uniquely identifying your computer on the Internet. Written in dots-and-numbers notation, like so: 198.51.100.99.
These are IP version 4 (“IPv4”) addresses. Typically “v4” is implied in the absence of any other
version identifier.
- Port – Programs talk through ports, which are numbered 0-65535 and are associated with the TCP
or UDP protocols.
Since multiple programs can be running on the same IP address, the port provides a way to uniquely
identify those programs on the network.
For example, it’s very common for a web server to listen for incoming connections on port 80.
Publishing the port number is really important for server programs since client programs need to
know where to connect to them.
Clients usually let the OS choose an unused port for them to use since no one tries to connect to
clients.
In a URL, the port number is after a colon. Here we try to connect to example.com on port 3490:
http://example.com:3490/foo.html

Ports under 1024 need root/administrator privileges to bind to (but not to connect to).
- TCP – Transmission Control Protocol, responsible for reliable, in-order data transmission. From a
higher-up perspective, makes a packet-switched network feel more like a circuit-switched network.
TCP uses port numbers to identify senders and receivers of data.
This protocol was invented in 1974 and is still in extremely heavy use today.
In the sockets API, TCP sockets are called stream sockets.
- UDP – sibling of TCP, except lighter weight. Doesn’t guarantee data will arrive, or that it will be
in order, or that it won’t be duplicated. If it arrives, it will be error-free, but that’s all you get.
In the sockets API, UDP sockets are called datagram sockets.
- IPv6 Address – Four bytes isn’t enough to hold a unique address, so IP version 6 expands the address size considerably to 16 bytes. IPv6 addresses look like this: ::1 or
2001:db8::8a2e:370:7334, or even bigger.
- NAT – Network Address Translation. A way to allow organizations to have private subnets with
non-globally-unique addresses that get translated to globally-unique addresses as they pass through
the router.
Private subnets commonly start with addresses 192.168.x.x or 10.x.x.x.

Chapter 4. The Layered Network Model

- Router – A specialized computer that forwards packets through the packet switching network. It
inspects destination IP addresses to determine which route will get the packet closer to its goal.
- IP – Internet Protocol. This is responsible for identifying computers by IP address and using those
addresses to route data to recipients through a variety of routers.
- LAN – Local Area Network. A network where all the computers are effectively directly connected,
not via a router.
- Interface – physical networking hardware on a computer. A computer might have a number of
interfaces. Your computer likely has two: a wired Ethernet interface and a wireless Ethernet interface.
A router might have a large number of interfaces to be able to route packets to a large number of
destinations. Your home router probably only has two interfaces: one facing inward to your LAN
and the other facing outward to the rest of the Internet.
Each interface typically has one IP address and one MAC address.
The OS names the interfaces on your local machine. They might be something like wlan0 or eth2
or something else. It depends on the hardware and the OS.
- Header – Some data that is prepended to some other data by a particular protocol. The header contains information appropriate for that protocol. A TCP header would include some error detection
and correction information and a source and destination port number. IP would include the source
and destination IP addresses. Ethernet would include the source and destination MAC addresses.
And an HTTP response would include things like the length of the data, the date modified, and
whether or not the request was successful.
Putting a header in front of the data is analogous to putting your letter in an envelope in the snail-mail
analogy. Or putting that envelope in another envelope.
As data moves through the network, additional headers are added and removed. Typically only the
top-most (front-most?) header is removed or added in normal operation, like a stack. (But some
software and hardware peeks deeper.)
Network Adapter – Another name for “network card”, the hardware on your computer that does
network stuff.
MAC Address – Ethernet interfaces have MAC addresses, which take the form aa:bb:cc:dd:ee:ff,
where the fields are random-ish one-byte hex numbers. MAC addresses are 6 bytes long, and must
be unique on the LAN. When a network adapter is manufactured, it is given a unique MAC address
that it keeps for life, typically.

### 4.1 The Layered Network Model
When you send data over the Internet, that data is encapsulated in different layers of protocols.
The layers of the conceptual layered network model correspond to various classes of protocols.
And those protocols are responsible for different things, e.g. describing data, preserving data integrity,
routing, local delivery, etc.
So it’s a little chicken-and-eggy, because we can’t really discuss one without the other.
Best just to dive in and take a look at protocols layering headers on top of some data.

### 4.2 An Example of Layering of Protocols on Data
Let’s consider what happens with an HTTP request.
1. The web browser builds the HTTP request that looks like this:

### 4.2 An Example of Layering of Protocols on Data

GET / HTTP/1.1
Host: example.com

And that’s all the browser cares about. It doesn’t care about IP routing or TCP data integrity or
Ethernet.
It just says “Send this data to that computer on port 80”.
2. The OS takes over and says, “OK, you asked me to send this over a stream-oriented socket, and I’m
going to use the TCP protocol to do that and ensure all the data arrives intact and in order.”
So the OS takes the HTTP data and wraps it in a TCP header which includes the port number.
3. And then the OS says, “And you wanted to send it to this remote computer whose IP address is
198.51.100.2, so we’ll use the IP protocol to do that.”
And it takes the entire TCP-HTTP data and wraps it up in an IP header. So now we have data that
looks like this: IP-TCP-HTTP.
4. After that, the OS takes a look at its routing table and decides where to send the data next. Maybe
the web server is on the LAN, conveniently. More likely, it’s somewhere else, so the data would be
sent to the router for your house destined for the greater Internet.
In either case, it’s going to send the data to a server on the LAN, or to your outbound router, also
on the LAN. So it’s going to a computer on the LAN.
And computers on the LAN have an Ethernet address (AKA MAC address–which stands for “Media Access Control”), so the sending OS looks up the MAC address that corresponds to the next
destination IP address, whether that’s a local web server or the outbound router. (This happens via
a lookup in something called the ARP Cache, but we’ll get to that part of the story another time.)
And it wraps the whole IP-TCP-HTTP packet in an Ethernet header, so it becomes Ethernet-IP-TCPHTTP. The web request is still in there, buried under layers of protocols!
5. And finally, the data goes out on the wire (even if it’s WiFi, we still say “on the wire”).
The computer with the destination MAC address, listening carefully, sees the Ethernet packet on the wire
and reads it in. (Ethernet packets are called Ethernet frames.)
It strips off the Ethernet header, exposing the IP header below it. It looks at the destination IP address.
1. If the inspecting computer is a server and it has that IP address, its OS strips off the IP header and
looks deeper. (If it doesn’t have that IP address, something’s wrong and it discards the packet.)
2. It looks at the TCP header and does all the TCP magic needed to make sure the data isn’t corrupted.
If it is, it replies back with the magic TCP incantations, saying, “Hey, I need you to send that data
again, please.”
Note that the web browser or server never knows about this TCP conversation that’s happening. It’s
all behind the scenes. For all it can see, the data is just magically arriving intact and in order.
The reason is that they’re on a higher layer of the network. They don’t have to worry about routing
or anything. The lower layers take care of it.
3. If everything’s good with TCP, that header gets stripped and the OS is left with the HTTP data. It
wakes up the process (the web server) that was waiting to read it, and gives it the HTTP data.
But what if the destination Ethernet address was an intermediate router?
1. The router strips off the Ethernet frame as always.
