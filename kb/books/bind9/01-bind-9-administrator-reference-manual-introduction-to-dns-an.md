---
id: bind9-01
title: "BIND 9 Administrator Reference Manual — Introduction to DNS and BIND 9, Resource Requirements…",
slug: bind9-01-bind-9-administrator-reference-manual-introduction-to-dns-an
source: "BIND 9 Administrator Reference Manual",
sourceSection: "1. Introduction to DNS and BIND 9, 2. Resource Requirements, 3. Configurations and Zone Files, 4. Name Server Operations, 5. DNSSEC, 6. Advanced Configurations, 7. Security Configurations, 8. Configuration Reference, 9. Troubleshooting, 10. Building BIND 9, 11. Release Notes, 12. Changelog, 13. DNSS"
track: networking-dns,
tier: premium
tags: [dns, bind9, networking, infrastructure]
summary: "Split DNS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Covers 20 sections: Introduction to DNS and BIND 9, Resource Requirements, Configurations and Zone Files.",
---
# BIND 9 Administrator Reference Manual — Introduction to DNS and BIND 9, Resource Requirements…

## 1. Introduction to DNS and BIND 9
1.1 Scope of Document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.2 Organization of This Document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.3 Conventions Used in This Document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.4 The Domain Name System (DNS) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
1.5 DNS Security Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

7

## 2. Resource Requirements
2.1 Hardware Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2 CPU Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.3 Memory Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.4 Name Server-Intensive Environment Issues . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.5 Supported Platforms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.6 Unsupported Platforms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7 Installing BIND 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 3. Configurations and Zone Files
3.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.2 Authoritative Name Servers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3 Resolver (Caching Name Servers) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.4 Load Balancing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.5 Zone File . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

16
21

## 4. Name Server Operations
4.1 Tools for Use With the Name Server Daemon . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.2 Signals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.3 Plugins . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.4 Configuring Plugins . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.5 Developing Plugins . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

37
37
42

## 5. DNSSEC
5.1 Zone Signing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.2 Secure Delegation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.3 DNSSEC Validation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.4 Dynamic Trust Anchor Management . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.5 PKCS#11 (Cryptoki) Support . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

43
43
46
47
48
49

## 6. Advanced Configurations
6.1 Dynamic Update . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.2 NOTIFY . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.3 Incremental Zone Transfers (IXFR) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

53
53
i

6.4
6.5
6.6
6.7
6.8
6.9

Split DNS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
IPv6 Support in BIND 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Dynamically Loadable Zones (DLZ) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Dynamic Database (DynDB) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Catalog Zones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
DNS Firewalls and Response Policy Zones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

58
58
60
61
65

## 7. Security Configurations
7.1 Security Assumptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.2 Access Control Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.3 Chroot and Setuid . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.4 Dynamic Update Security . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.5 TSIG . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.6 SIG(0) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

77
77
78
79
80
80
82

## 8. Configuration Reference
83
8.1 Configuration File (named.conf) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 83
### 8.2 Blocks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 88
### 8.3 Statements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 248
### 8.4 Statements by Tag . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 282
### 8.5 BIND 9 Statistics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 315
## 9. Troubleshooting
9.1 Common Problems . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.2 Incrementing and Changing the Serial Number . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.3 Where Can I Get Help? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

327
327
328
328

## 10. Building BIND 9
10.1 Required Libraries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.2 Optional Features . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.3 macOS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

331
331
332
333

## 11. Release Notes
11.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.2 Supported Platforms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.3 Download . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.4 Known Issues . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.5 Notes for BIND 9.21.5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.6 Notes for BIND 9.21.4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.7 Notes for BIND 9.21.3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.8 Notes for BIND 9.21.2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.9 Notes for BIND 9.21.1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.10 Notes for BIND 9.21.0 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.11 License . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.12 End of Life . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.13 Thank You . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

335
337
338
340
342
344
346

## 12. Changelog
12.1 BIND 9.21.5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.2 BIND 9.21.4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3 BIND 9.21.3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.4 BIND 9.21.2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.5 BIND 9.21.1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.6 BIND 9.21.0 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.7 Changes prior to 9.20.1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

349
349
351
355
360
364
367
371

ii

## 13. DNSSEC Guide
13.1 Preface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.2 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.3 Getting Started . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.4 Validation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.5 Signing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.6 Basic DNSSEC Troubleshooting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.7 Advanced Discussions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.8 Recipes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.9 Commonly Asked Questions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

797
797
798
803
804
816
837
845
857
876

14 A Brief History of the DNS and BIND

879

## 15. General DNS Reference Information
15.1 Requests for Comment (RFCs) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.2 Notes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.3 Internet Drafts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

881
881
886
886

## 16. Manual Pages
16.1 arpaname - translate IP addresses to the corresponding ARPA names . . . . . . . . . . . . . . . . . .
16.2 ddns-confgen - TSIG key generation tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.3 delv - DNS lookup and validation utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.4 dig - DNS lookup utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.5 dnssec-cds - change DS records for a child zone based on CDS/CDNSKEY . . . . . . . . . . . . . . .
16.6 dnssec-dsfromkey - DNSSEC DS RR generation tool . . . . . . . . . . . . . . . . . . . . . . . . . .
16.7 dnssec-importkey - import DNSKEY records from external systems so they can be managed . . . . . .
16.8 dnssec-keyfromlabel - DNSSEC key generation tool . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.9 dnssec-keygen: DNSSEC key generation tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.10 dnssec-ksr - Create signed key response (SKR) files for offline KSK setups . . . . . . . . . . . . . . .
16.11 dnssec-revoke - set the REVOKED bit on a DNSSEC key . . . . . . . . . . . . . . . . . . . . . . . .
16.12 dnssec-settime: set the key timing metadata for a DNSSEC key . . . . . . . . . . . . . . . . . . . . .
16.13 dnssec-signzone - DNSSEC zone signing tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.14 dnssec-verify - DNSSEC zone verification tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.15 dnstap-read - print dnstap data in human-readable form . . . . . . . . . . . . . . . . . . . . . . . . .
16.16 filter-aaaa.so - filter AAAA in DNS responses when A is present . . . . . . . . . . . . . . . . . . . .
16.17 host - DNS lookup utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.18 mdig - DNS pipelined lookup utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.19 named-checkconf - named configuration file syntax checking tool . . . . . . . . . . . . . . . . . . . .
16.20 named-checkzone - zone file validation tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.21 named-compilezone - zone file converting tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.22 named-journalprint - print zone journal in human-readable form . . . . . . . . . . . . . . . . . . . .
16.23 named-nzd2nzf - convert an NZD database to NZF text format . . . . . . . . . . . . . . . . . . . . .
16.24 named-rrchecker - syntax checker for individual DNS resource records . . . . . . . . . . . . . . . . .
16.25 named.conf - configuration file for named . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.26 named - Internet domain name server . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.27 nsec3hash - generate NSEC3 hash . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.28 nslookup - query Internet name servers interactively . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.29 nsupdate - dynamic DNS update utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.30 rndc-confgen - rndc key generation tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.31 rndc.conf - rndc configuration file . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.32 rndc - name server control utility . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.33 tsig-keygen - TSIG key generation tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

888
893
903
905
907
909
912
916
918
919
922
927
929
929
930
932
937
938
941
944
944
945
945
964
967
968
971
976
978
980
988

iii

iv

ONE

INTRODUCTION TO DNS AND BIND 9

The Internet Domain Name System (DNS) consists of:
- the syntax to specify the names of entities in the Internet in a hierarchical manner,
- the rules used for delegating authority over names, and
- the system implementation that actually maps names to Internet addresses.
DNS data is maintained in a group of distributed hierarchical databases.

### 1.1 Scope of Document
The Berkeley Internet Name Domain (BIND) software implements a domain name server for a number of operating systems. This document provides basic information about the installation and maintenance of Internet Systems Consortium
(ISC) BIND version 9 software package for system administrators.
This manual covers BIND version 9.21.7-dev.

### 1.2 Organization of This Document
Introduction to DNS and BIND 9 introduces the basic DNS and BIND concepts. Some tutorial material on The Domain
Name System (DNS) is presented for those unfamiliar with DNS. A DNS Security Overview is provided to allow BIND
operators to implement appropriate security for their operational environment.
Resource Requirements describes the hardware and environment requirements for BIND 9 and lists both the supported
and unsupported platforms.
Configurations and Zone Files is intended as a quickstart guide for newer users. Sample files are included for Authoritative
Name Servers (both primary and secondary), as well as a simple Resolver (Caching Name Servers) and a Forwarding
Resolver Configuration. Some reference material on the Zone File is included.
Name Server Operations covers basic BIND 9 software and DNS operations, including some useful tools, Unix signals,
and plugins.
Advanced Configurations builds on the configurations of Configurations and Zone Files, adding functions and features the
system administrator may need.
Security Configurations covers most aspects of BIND 9 security, including file permissions, running BIND 9 in a “jail,”
and securing file transfers and dynamic updates.
DNSSEC describes the theory and practice of cryptographic authentication of DNS information. The DNSSEC Guide is a
practical guide to implementing DNSSEC.
Configuration Reference gives exhaustive descriptions of all supported blocks, statements, and grammars used in BIND
9’s named.conf configuration file.

Troubleshooting provides information on identifying and solving BIND 9 and DNS problems. Information about bugreporting procedures is also provided.
Building BIND 9 is a definitive guide for those occasions where the user requires special options not provided in the
standard Linux or Unix distributions.
The Appendices contain useful reference information, such as a bibliography and historic information related to BIND
and the Domain Name System, as well as the current man pages for all the published tools.

### 1.3 Conventions Used in This Document
In this document, we generally use fixed-width text to indicate the following types of information:
- pathnames
- filenames
- URLs
- hostnames
- mailing list names
- new terms or concepts
- literal user input
- program output
- keywords
- variables
Text in “quotes,” bold text, or italics is also used for emphasis or clarity.

### 1.4 The Domain Name System (DNS)
This is a brief description of the functionality and organization of the Domain Name System (DNS). It is provided to
familiarize users with the concepts involved, the (often confusing) terminology used, and how all the parts fit together to
form an operational system.
All network systems operate with network addresses, such as IPv4 and IPv6. The vast majority of humans find it easier to
work with names rather than seemingly endless strings of network address digits. The earliest ARPANET systems (from
which the Internet evolved) mapped names to addresses using a hosts file that was distributed to all entities whenever
changes occurred. Operationally, such a system became rapidly unsustainable once there were more than 100 networked
entities, which led to the specification and implementation of the Domain Name System that we use today.

#### 1.4.1 DNS Fundamentals
The DNS naming system is organized as a tree structure comprised of multiple levels and thus it naturally creates a
distributed system. Each node in the tree is given a label which defines its Domain (its area or zone) of Authority. The
topmost node in the tree is the Root Domain; it delegates to Domains at the next level which are generically known as
the Top-Level Domains (TLDs). They in turn delegate to Second-Level Domains (SLDs), and so on. The Top-Level
Domains (TLDs) include a special group of TLDs called the Country Code Top-Level Domains (ccTLDs), in which
every country is assigned a unique two-character country code from ISO 3166 as its domain.

The Domain Name System is controlled by ICANN (https://www.icann.org) (a 501c non-profit entity); their current
policy is that any new TLD, consisting of three or more characters, may be proposed by any group of commercial
sponsors and if it meets ICANN’s criteria will be added to the TLDs.
The concept of delegation and authority flows down the DNS tree (the DNS hierarchy) as shown:

Fig. 1: Delegation and Authority in the DNS Name Space
A domain is the label of a node in the tree. A domain name uniquely identifies any node in the DNS tree and is written, left
to right, by combining all the domain labels (each of which are unique within their parent’s zone or domain of authority),
with a dot separating each component, up to the root domain. In the above diagram the following are all domain names:
example.com
b.com
ac.uk
us
org

The root has a unique label of “.” (dot), which is normally omitted when it is written as a domain name, but when it is
written as a Fully Qualified Domain Name (FQDN) the dot must be present. Thus:
example.com

#### 1.4.2 Authority and Delegation
Each domain (node) has been delegated the authority from its parent domain. The delegated authority includes specific
responsibilities to ensure that every domain it delegates has a unique name or label within its zone or domain of authority,
and that it maintains an authoritative list of its delegated domains. The responsibilities further include an operational
requirement to operate two (or more) name servers (which may be contracted to a third party) which will contain the

### 1.4 The Domain Name System (DNS)

authoritative data for all the domain labels within its zone of authority in a zone file. Again, the tree structure ensures that
the DNS name space is naturally distributed.
The following diagram illustrates that Authoritative Name Servers exist for every level and every domain in the DNS
name space:

Fig. 2: Authoritative Name Servers in the DNS Name Space

The difference between a domain and a zone can appear confusing. Practically, the terms are generally used synonymously in the DNS. If, however, you are into directed graphs and tree structure theory or similar exotica, a zone can
be considered as an arc through any node (or domain) with the domain at its apex. The zone therefore encompasses
all the name space below the domain. This can, however, lead to the concept of subzones and these were indeed
defined in the original DNS specifications. Thankfully the term subzone has been lost in the mists of time.

#### 1.4.3 Root Servers
The root servers are a critical part of the DNS authoritative infrastructure. There are 13 root servers (a.root-servers.net
to m.root-servers.net). The number 13 is historically based on the maximum amount of name and IPv4 data that could be
packed into a 512-byte UDP message, and not a perverse affinity for a number that certain cultures treat as unlucky. The
512-byte UDP data limit is no longer a limiting factor and all root servers now support both IPv4 and IPv6. In addition,
almost all the root servers use anycast, with well over 300 instances of the root servers now providing service worldwide
(see further information at https://root-servers.org). The root servers are the starting point for all name resolution within
the DNS.

#### 1.4.4 Name Resolution
So far all the emphasis has been on how the DNS stores its authoritative domain (zone) data. End-user systems use names
(an email address or a web address) and need to access this authoritative data to obtain an IP address, which they use to
contact the required network resources such as web, FTP, or mail servers. The process of converting a domain name to
a result (typically an IP address, though other types of data may be obtained) is generically called name resolution, and
is handled by resolvers (also known as caching name servers and many other terms). The following diagram shows the
typical name resolution process:

Fig. 3: Authoritative Name Servers and Name Resolution
An end-user application, such as a browser (1), when needing to resolve a name such as www.example.com, makes an
internal system call to a minimal function resolution entity called a stub resolver (2). The stub resolver (using stored IP
addresses) contacts a resolver (a caching name server or full-service resolver) (3), which in turn contacts all the necessary
authoritative name servers (4, 5, and 6) to provide the answer that it then returns to the user (2, 1). To improve performance, all resolvers (including most stub resolvers) cache (store) their results such that a subsequent request for the same
data is taken from the resolver’s cache, removing the need to repeat the name resolution process and use time-consuming
resources. All communication between the stub resolver, the resolver, and the authoritative name servers uses the DNS
protocol’s query and response message pair.

#### 1.4.5 DNS Protocol and Queries
DNS queries use the UDP protocol over the reserved port 53 (but both TCP and TLS can optionally be used in some
parts of the network).
The following diagram shows the name resolution process expressed in terms of DNS queries and responses.
The stub resolver sends a recursive query message (with the required domain name in the QUESTION section of the
query) (2) to the resolver. A recursive query simply requests the resolver to find the complete answer. A stub resolver
only ever sends recursive queries and always needs the service of a resolver. The response to a recursive query can be:
1. The answer to the user’s QUESTION in the ANSWER section of the query response.
2. An error (such as NXDOMAIN - the name does not exist).
The resolver, on receipt of the user’s recursive query, either responds immediately, if the ANSWER is in its cache, or
accesses the DNS hierarchy to obtain the answer. The resolver always starts with root servers and sends an iterative
query (4, 5, and 6). The response to an iterative query can be:
1. The answer to the resolver’s QUESTION in the ANSWER section of the query response.
2. A referral (indicated by an empty ANSWER section but data in the AUTHORITY section, and typically IP addresses
in the ADDITIONAL section of the response).
3. An error (such as NXDOMAIN - the name does not exist).

### 1.4 The Domain Name System (DNS)

Fig. 4: Resolvers and Queries

If the response is either an answer or an error, these are returned immediately to the user (and cached for future use). If
the response is a referral, the resolver needs to take additional action to respond to the user’s recursive query.
A referral, in essence, indicates that the queried server does not know the answer (the ANSWER section of the response
is empty), but it refers the resolver to the authoritative name servers (in the AUTHORITY section of the response)
which it knows about in the domain name supplied in the QUESTION section of the query. Thus, if the QUESTION
is for the domain name www.example.com, the root server to which the iterative query was sent adds a list of the .com
authoritative name servers in the AUTHORITY section. The resolver selects one of the servers from the AUTHORITY
section and sends an iterative query to it. Similarly, the .com authoritative name servers send a referral containing a list of
the example.com authoritative name servers. This process continues down the DNS hierarchy until either an ANSWER
or an error is received, at which point the user’s original recursive query is sent a response.
The DNS hierarchy is always accessed starting at the root servers and working down; there is no concept of “up” in
the DNS hierarchy. Clearly, if the resolver has already cached the list of .com authoritative name servers and the
user’s recursive query QUESTION contains a domain name ending in .com, it can omit access to the root servers.
However, that is simply an artifact (in this case a performance benefit) of caching and does not change the concept of
top-down access within the DNS hierarchy.
The insatiably curious may find reading RFC 1034 and RFC 1035 a useful starting point for further information.

#### 1.4.6 DNS and BIND 9
BIND 9 is a complete implementation of the DNS protocol. BIND 9 can be configured (using its named.conf file) as an
authoritative name server, a resolver, and, on supported hosts, a stub resolver. While large operators usually dedicate DNS
servers to a single function per system, smaller operators will find that BIND 9’s flexible configuration features support
multiple functions, such as a single DNS server acting as both an authoritative name server and a resolver.
Example configurations of basic authoritative name servers and resolvers and forwarding resolvers, as well as advanced
configurations and secure configurations, are provided.

### 1.5 DNS Security Overview
DNS is a communications protocol. All communications protocols are potentially vulnerable to both subversion and
eavesdropping. It is important for users to audit their exposure to the various threats within their operational environment
and implement the appropriate solutions. BIND 9, a specific implementation of the DNS protocol, provides an extensive
set of security features. The purpose of this section is to help users to select from the range of available security features
those required for their specific user environment.
A generic DNS network is shown below, followed by text descriptions. In general, the further one goes from the left-hand
side of the diagram, the more complex the implementation.
Historically, DNS data was regarded as public and security was concerned, primarily, with ensuring the integrity of
DNS data. DNS data privacy is increasingly regarded as an important dimension of overall security, specifically DNS
over TLS.
The following notes refer to the numbered elements in the above diagram.
1. A variety of system administration techniques and methods may be used to secure BIND 9’s local environment,
including file permissions, running BIND 9 in a jail, and the use of Access Control Lists.

### 1.5 DNS Security Overview

Fig. 5: BIND 9 Security Overview
2. The remote name daemon control (rndc) program allows the system administrator to control the operation of a name
server. The majority of BIND 9 packages or ports come preconfigured with local (loopback address) security preconfigured. If rndc is being invoked from a remote host, further configuration is required. The nsupdate tool uses Dynamic
DNS (DDNS) features and allows users to dynamically change the contents of the zone file(s). nsupdate access and
security may be controlled using named.conf statements or using TSIG or SIG(0) cryptographic methods. Clearly, if the
remote hosts used for either rndc or DDNS lie within a network entirely under the user’s control, the security threat may
be regarded as non-existent. Any implementation requirements, therefore, depend on the site’s security policy.
3. Zone transfer from a primary to one or more secondary authoritative name servers across a public network carries
risk. The zone transfer may be secured using named.conf statements, TSIG cryptographic methods, or TLS. Clearly, if
the secondary authoritative name server(s) all lie within a network entirely under the user’s control, the security threat
may be regarded as non-existent. Any implementation requirements again depend on the site’s security policy.
4. If the operator of an authoritative name server (primary or secondary) wishes to ensure that DNS responses to userinitiated queries about the zone(s) for which they are responsible can only have come from their server, that the data
received by the user is the same as that sent, and that non-existent names are genuine, then DNSSEC is the only solution.
DNSSEC requires configuration and operational changes both to the authoritative name servers and to any resolver which
accesses those servers.
5. The typical Internet-connected end-user device (PCs, laptops, and even mobile phones) either has a stub resolver
or operates via a DNS proxy. A stub resolver requires the services of an area or full-service resolver to completely
answer user queries. Stub resolvers on the majority of PCs and laptops typically have a caching capability to increase
performance. At this time there are no standard stub resolvers or proxy DNS tools that implement DNSSEC. BIND 9
may be configured to provide such capability on supported Linux or Unix platforms. DNS over TLS may be configured to
verify the integrity of the data between the stub resolver and area (or full-service) resolver. However, unless the resolver
and the authoritative name server implements DNSSEC, end-to-end integrity (from authoritative name server to stub
resolver) cannot be guaranteed.

TWO

RESOURCE REQUIREMENTS

### 2.1 Hardware Requirements
DNS hardware requirements have traditionally been quite modest. For many installations, servers that have been retired
from active duty have performed admirably as DNS servers.
However, the DNSSEC features of BIND 9 may be quite CPU-intensive, so organizations that make heavy use of these
features may wish to consider larger systems for these applications. BIND 9 is fully multithreaded, allowing full utilization
of multiprocessor systems for installations that need it.

### 2.2 CPU Requirements
CPU requirements for BIND 9 range from i386-class machines, for serving static zones without caching, to enterpriseclass machines to process many dynamic updates and DNSSEC-signed zones, serving many thousands of queries per
second.

### 2.3 Memory Requirements
Server memory must be sufficient to hold both the cache and the zones loaded from disk. The max-cache-size option
can limit the amount of memory used by the cache, at the expense of reducing cache hit rates and causing more DNS
traffic. It is still good practice to have enough memory to load all zone and cache data into memory; unfortunately, the
best way to determine this for a given installation is to watch the name server in operation. After a few weeks, the server
process should reach a relatively stable size where entries are expiring from the cache as fast as they are being inserted.

### 2.4 Name Server-Intensive Environment Issues
For name server-intensive environments, there are two configurations that may be used. The first is one where clients and
any second-level internal name servers query the main name server, which has enough memory to build a large cache;
this approach minimizes the bandwidth used by external name lookups. The second alternative is to set up second-level
internal name servers to make queries independently. In this configuration, none of the individual machines need to have
as much memory or CPU power as in the first alternative, but this has the disadvantage of making many more external
queries, as none of the name servers share their cached data.

### 2.5 Supported Platforms
The current support status of BIND 9 versions across various platforms can be found in the ISC Knowledgebase:
https://kb.isc.org/docs/supported-platforms

In general, this version of BIND will build and run on any POSIX-compliant system with a modern C11 (or better)
compiler, BSD-style sockets with RFC-compliant IPv6 support, POSIX-compliant threads, and the required libraries.
The following C11 features are required to compile BIND 9:
- Atomic operations support defined in <stdatomic.h>
- Thread Local Storage support defined in <threads.h>
Where it makes sense, BIND 9 uses C-standard fixes introduced by the C17 update of the C11 standard.
ISC regularly tests BIND on many operating systems and architectures, but lacks the resources to test all of them. Consequently, ISC is only able to offer support on a “best-effort” basis for some.

#### 2.5.1 Regularly Tested Platforms
Current versions of BIND 9 are fully supported and regularly tested on the following systems:
- Debian 12
- Ubuntu LTS 20.04, 22.04, 24.04
- Fedora 41
- Red Hat Enterprise Linux / CentOS / Oracle Linux 8, 9
- FreeBSD 13.4, 14.2
- Alpine Linux 3.21
The amd64 CPU architecture is fully supported and regularly tested.

#### 2.5.2 Best-Effort
The following are platforms on which BIND is known to build and run. ISC makes every effort to fix bugs on these
platforms, but may be unable to do so quickly due to lack of hardware, less familiarity on the part of engineering staff,
and other constraints. None of these are tested regularly by ISC.
- macOS 10.12+
- Solaris 11
- NetBSD
- OpenBSD
- Other Linux distributions still supported by their vendors, such as:
– Ubuntu 22.10+
– Gentoo
– Arch Linux
- OpenWRT/LEDE 17.01+
- Other CPU architectures (arm, arm64, mips64, ppc64, s390x)

#### 2.5.3 Community-Maintained
These systems may not all have the required dependencies for building BIND easily available, although it is possible in
many cases to compile those directly from source. The community and interested parties may wish to help with maintenance, and we welcome patch contributions, although we cannot guarantee that we will accept them. All contributions
will be assessed against the risk of adverse effect on officially supported platforms.
- Platforms past or close to their respective EOL dates, such as:

Chapter 2. Resource Requirements

– Ubuntu 14.04, 16.04, 18.04 (Ubuntu ESM releases are not supported)
– Red Hat Enterprise Linux / CentOS / Oracle Linux 6, 7
– Debian 8 Jessie, 9 Stretch, 10 Buster, 11 Bullseye
– FreeBSD 10.x, 11.x
- Less common CPU architectures (i386, i686, mips, mipsel, sparc, ppc, and others)

### 2.6 Unsupported Platforms
These are platforms on which current versions of BIND 9 are known not to build or run:
- Platforms without at least OpenSSL 1.1.1
- Windows
- Solaris 10 and older
- Platforms that do not support IPv6 Advanced Socket API (RFC 3542)
- Platforms that do not support atomic operations (via compiler or library)
- Linux without NPTL (Native POSIX Thread Library)
- Platforms on which libuv >= 1.34 cannot be compiled or is not available

### 2.7 Installing BIND 9
Building BIND 9 contains complete instructions for how to build BIND 9.
The ISC Knowledgebase contains many useful articles about installing BIND 9 on specific platforms.

### 2.6 Unsupported Platforms

Chapter 2. Resource Requirements

THREE

CONFIGURATIONS AND ZONE FILES

### 3.1 Introduction
BIND 9 uses a single configuration file called named.conf.
/usr/local/etc/namedb.

which is typically located in either /etc/namedb or

If rndc is being used locally (on the same host as BIND 9) then an additional file rndc.conf may
be present, though rndc operates without this file. If rndc is being run from a remote host then an
rndc.conf file must be present as it defines the link characteristics and properties.
Depending on the functionality of the system, one or more zone files is required.
The samples given throughout this and subsequent chapters use a standard base format for both the named.conf and the
zone files for example.com. The intent is for the reader to see the evolution from a common base as features are added
or removed.

3.1.1 named.conf Base File
This file illustrates the typical format and layout style used for named.conf and provides a basic logging service, which
may be extended as required by the user.
// base named.conf file
// Recommended that you always maintain a change log in this file as shown here

The logging and options blocks and category , channel, directory , file, and severity statements are all
described further in the appropriate sections of this ARM.

3.1.2 example.com base zone file
The following is a complete zone file for the domain example.com, which illustrates a number of common features.
Comments in the file explain these features where appropriate. Zone files consist of Resource Records (RR), which describe
the zone’s characteristics or properties.
3
4
5
6
7
8
12

; base zone file for example.com
$TTL 2d
; default TTL for zone
$ORIGIN example.com. ; base domain-name
; Start of Authority RR defining the key characteristics of the zone (domain)
ns1.example.com. hostmaster.example.com. (
2003080800 ; serial number
12h
; refresh
15m
; update retry
4d
; expiry
2h
; minimum
; name server RR for the domain
; the second name server is external to this zone (domain)
ns2.example.net.
; mail server RRs for the zone (domain)
3w IN
MX 10 mail.example.com.
; the second mail servers is external to the zone (domain)
MX 20 mail.example.net.
; domain hosts includes NS and MX records defined above
; plus any others required
; for instance a user query for the A RR of joe.example.com will
; return the IPv4 address 192.168.254.6 from this zone file
ns1
192.168.254.2
mail
192.168.254.4
joe
192.168.254.6
www
192.168.254.7
; aliases ftp (ftp server) to an external domain
ftp
ftp.example.net.

This type of zone file is frequently referred to as a forward-mapped zone file, since it maps domain names to some
other value, while a reverse-mapped zone file maps an IP address to a domain name. The zone file is called example.com
14

for no good reason except that it is the domain name of the zone it describes; as always, users are free to use whatever
file-naming convention is appropriate to their needs.

#### 3.1.3 Other Zone Files
Depending on the configuration additional zone files may or should be present. Their format and functionality are briefly
described here.

3.1.4 localhost Zone File
All end-user systems are shipped with a hosts file (usually located in /etc). This file is normally configured to map the
name localhost (the name used by applications when they run locally) to the loopback address. It is argued, reasonably, that a forward-mapped zone file for localhost is therefore not strictly required. This manual does use the BIND
9 distribution file localhost-forward.db (normally in /etc/namedb/master or /usr/local/etc/namedb/master) in all
configuration samples for the following reasons:
1. Many users elect to delete the hosts file for security reasons (it is a potential target of serious domain name
redirection/poisoning attacks).
2. Systems normally lookup any name (including domain names) using the hosts file first (if present), followed
by DNS. However, the nsswitch.conf file (typically in /etc) controls this order (normally hosts: file dns),
allowing the order to be changed or the file value to be deleted entirely depending on local needs. Unless the
BIND administrator controls this file and knows its values, it is unsafe to assume that localhost is forward-mapped
correctly.
3. As a reminder to users that unnecessary queries for localhost form a non-trivial volume of DNS queries on the
public network, which affects DNS performance for all users.
Users may, however, elect at their discretion not to implement this file since, depending on the operational environment,
it may not be essential.
The BIND 9 distribution file localhost-forward.db format is shown for completeness and provides for both IPv4
and IPv6 localhost resolution. The zone (domain) name is localhost.
$TTL 3h

127.0.0.1
::1

nobody.localhost. 42

1d

12h

1w

3h

Readers of a certain age or disposition may note the reference in this file to the late, lamented Douglas Noel Adams.

3.1.5 localhost Reverse-Mapped Zone File
This zone file allows any query requesting the name associated with the loopback IP (127.0.0.1). This file is required to
prevent unnecessary queries from reaching the public DNS hierarchy. The BIND 9 distribution file localhost.rev is
shown for completeness:
$TTL 1D

localhost. root.localhost. (
2007091701 ; serial
30800
; refresh
7200
; retry

### 3.1 Introduction

15

PTR

604800
; expire
300 )
; minimum

### 3.2 Authoritative Name Servers
These provide authoritative answers to user queries for the zones they support: for instance, the zone data describing the
domain name example.com. An authoritative name server may support one or many zones.
Each zone may be defined as either a primary or a secondary. A primary zone reads its zone data directly from a file
system. A secondary zone obtains its zone data from the primary zone using a process called zone transfer. Both the
primary and the secondary zones provide authoritative data for their zone; there is no difference in the answer to a query
from a primary or a secondary zone. An authoritative name server may support any combination of primary and secondary
zones.
The terms primary and secondary do not imply any access priority. Resolvers (name servers that provide the complete answers to user queries) are not aware of (and cannot find out) whether an authoritative answer comes from the
primary or secondary name server. Instead, the resolver uses the list of authoritative servers for the zone (there must
be at least two) and maintains a Round Trip Time (RTT) - the time taken to respond to the query - for each server in
the list. The resolver uses the lowest-value server (the fastest) as its preferred server for the zone and continues to do
so until its RTT becomes higher than the next slowest in its list, at which time that one becomes the preferred server.
For reasons of backward compatibility BIND 9 treats “primary” and “master” as synonyms, as well as “secondary”
and “slave.”
The following diagram shows the relationship between the primary and secondary name servers. The text below explains
the process in detail.
The numbers in parentheses in the following text refer to the numbered items in the diagram above.
1. The authoritative primary name server always loads (or reloads) its zone files from (1) a local or networked filestore.
2. The authoritative secondary name server always loads its zone data from a primary via a zone transfer operation.
Zone transfer may use AXFR (complete zone transfer) or IXFR (incremental zone transfer), but only if both
primary and secondary name servers support the service. The zone transfer process (either AXFR or IXFR) works
as follows:
a) The secondary name server for the zone reads (3 and 4) the SOA RR periodically. The interval is defined by
the refresh parameter of the Start of Authority (SOA) RR.
b) The secondary compares the serial number parameter of the SOA RR received from the primary with the
serial number in the SOA RR of its current zone data.
c) If the received serial number is arithmetically greater (higher) than the current one, the secondary initiates a
zone transfer (5) using AXFR or IXFR (depending on the primary and secondary configuration), using TCP
over port 53 (6).
3. The typically recommended zone refresh times for the SOA RR (the time interval when the secondary reads or
polls the primary for the zone SOA RR) are multiples of hours to reduce traffic loads. Worst-case zone change
propagation can therefore take extended periods.
4. The optional NOTIFY (RFC 1996) feature (2) is automatically configured; use the notify statement to turn
off the feature. Whenever the primary loads or reloads a zone, it sends a NOTIFY message to the configured
16

Fig. 1: Authoritative Primary and Secondary Name Servers

### 3.2 Authoritative Name Servers

17

secondary (or secondaries) and may optionally be configured to send the NOTIFY message to other hosts using the
also-notify statement. The NOTIFY message simply indicates to the secondary that the primary has loaded
or reloaded the zone. On receipt of the NOTIFY message, the secondary respons to indicate it has received the
NOTIFY and immediately reads the SOA RR from the primary (as described in section 2 a. above). If the zone
file has changed, propagation is practically immediate.
The authoritative samples all use NOTIFY but identify the statements used, so that they can be removed if not required.

#### 3.2.1 Primary Authoritative Name Server
The zone files are unmodified from the base samples but the named.conf file has been modified as shown:
// authoritative primary named.conf file
// This is the default - allows user queries from any IP
// normal server operations may place items in the cache
// this prevents any user query from accessing these items
// only authoritative zone data will be returned
allow-query-cache { none; };
// Do not provide recursive service to user queries
// Provide forward mapping zone for localhost
// (optional)
file "master/localhost-forward.db";

18

// Provide reverse mapping zone for the loopback
// address 127.0.0.1
// We are the primary server for example.com
// this is the primary name server for the zone
file "example.com";
notify yes;
// IP addresses of secondary servers allowed to
// transfer example.com from this server
allow-transfer {
192.168.4.14;
192.168.5.53;

The added statements and blocks are commented in the above file.
The zone block, and allow-query , allow-query-cache, allow-transfer, file, notify , recursion, and
type statements are described in detail in the appropriate sections.

#### 3.2.2 Secondary Authoritative Name Server
The zone files local-host-forward.db and localhost.rev are unmodified from the base samples. The example.com zone file is not required (the zone file is obtained from the primary via zone transfer). The named.conf file has
been modified as shown:
// authoritative secondary named.conf file
// This is the default - allows user queries from any IP
// normal server operations may place items in the cache
// this prevents any user query from accessing these items
// only authoritative zone data will be returned
allow-query-cache { none; };
// Do not provide recursive service to user queries

### 3.2 Authoritative Name Servers

19

// Provide forward mapping zone for localhost
// (optional)
file "master/localhost-forward.db";
// Provide reverse mapping zone for the loopback
// address 127.0.0.1
// We are the secondary server for example.com
// this is a secondary server for the zone
// the file statement here allows the secondary to save
// each zone transfer so that in the event of a program restart
// the zone can be loaded immediately and the server can start
// to respond to queries without waiting for a zone transfer
file "example.com.saved";
// IP address of example.com primary server
primaries { 192.168.254.2; };

The statements and blocks added are all commented in the above file.
The zone block, and allow-query , allow-query-cache, allow-transfer, file, primaries, recursion, and
type statements are described in detail in the appropriate sections.
If NOTIFY is not being used, no changes are required in this named.conf file, since it is the primary that initiates the
NOTIFY message.
Just when the reader thought they understood primary and secondary, things can get more complicated. A secondary

20

zone can also be a primary to other secondaries: named, by default, sends NOTIFY messages for every zone it loads.
Specifying notify primary-only; in the zone block for the secondary causes named to only send NOTIFY messages
for primary zones that it loads.

### 3.3 Resolver (Caching Name Servers)
Resolvers handle recursive user queries and provide complete answers; that is, they issue one or more iterative queries to
the DNS hierarchy. Having obtained a complete answer (or an error), a resolver passes the answer to the user and places it
in its cache. Subsequent user requests for the same query will be answered from the resolver’s cache until the TTL of the
cached answer has expired, when it will be flushed from the cache; the next user query that requests the same information
results in a new series of queries to the DNS hierarchy.
Resolvers are frequently referred to by a bewildering variety of names, including caching name servers, recursive name
servers, forwarding resolvers, area resolvers, and full-service resolvers.
The following diagram shows how resolvers can function in a typical networked environment:

Resolver and Forwarding Resolver
1. End-user systems are all distributed with a local stub resolver as a standard feature. Today, the majority of stub
resolvers also provide a local cache service to speed up user response times.
2. A stub resolver has limited functionality; specifically, it cannot follow referrals. When a stub resolver receives a
request for a name from a local program, such as a browser, and the answer is not in its local cache, it sends a
recursive user query (1) to a locally configured resolver (5), which may have the answer available in its cache. If it
does not, it issues iterative queries (2) to the DNS hierarchy to obtain the answer. The resolver to which the local
system sends the user query is configured, for Linux and Unix hosts, in /etc/resolv.conf; for Windows users
it is configured or changed via the Control Panel or Settings interface.
3. Alternatively, the user query can be sent to a forwarding resolver (4). Forwarding resolvers on first glance look
fairly pointless, since they appear to be acting as a simple pass-though and, like the stub resolver, require a fullservice resolver (5). However, forwarding resolvers can be very powerful additions to a network for the following
reasons:
a) Cost and Performance. Each recursive user query (1) at the forwarding resolver (4) results in two messages
- the query and its answer. The resolver (5) may have to issue three, four, or more query pairs (2) to get
the required answer. Traffic is reduced dramatically, increasing performance or reducing cost (if the link
is tariffed). Additionally, since the forwarding resolver is typically shared across multiple hosts, its cache is
more likely to contain answers, again improving user performance.
b) Network Maintenance. Forwarding resolvers (4) can be used to ease the burden of local administration by
providing a single point at which changes to remote name servers can be managed, rather than having to update
all hosts. Thus, all hosts in a particular network section or area can be configured to point to a forwarding
resolver, which can be configured to stream DNS traffic as desired and changed over time with minimal effort.

21

c) Sanitizing Traffic. Especially in larger private networks it may be sensible to stream DNS traffic using a
forwarding resolver structure. The forwarding resolver (4) may be configured, for example, to handle all
in-domain traffic (relatively safe) and forward all external traffic to a hardened resolver (5).
d) Stealth Networks. Forwarding resolvers are extensively used in stealth or split networks.
4. Forwarding resolvers (4) can be configured to forward all traffic to a resolver (5), or to only forward selective traffic
(5) while directly resolving other traffic (3).
Á Attention
While the diagram above shows recursive user queries arriving via interface (1), there is nothing to stop them from
arriving via interface (2) via the public network. If no limits are placed on the source IPs that can send such queries,
the resolver is termed an open resolver. Indeed, when the world was young this was the way things worked on the
Internet. Much has changed and what seems to be a friendly, generous action can be used by rogue actors to cause all
kinds of problems including Denial of Service (DoS) attacks. Resolvers should always be configured to limit the IP
addresses that can use their services. BIND 9 provides a number of statements and blocks to simplify defining these
IP limits and configuring a closed resolver. The resolver samples given here all configure closed resolvers using a
variety of techniques.

#### 3.3.1 Additional Zone Files
Root Servers (Hint) Zone File
Resolvers (although not necessarily forwarding resolvers) need to access the DNS hierarchy. To do this, they need to
know the addresses (IPv4 and/or IPv6) of the 13 root servers. This is done by the provision of a root server zone file,
which is contained in the standard BIND 9 distribution as the file named.root (normally found in /etc/namedb or
/usr/local/namedb). This file may also be obtained from the IANA website (https://www.iana.org/domains/root/files).
Many distributions rename this file for historical reasons. Consult the appropriate distribution documentation for the actual file name.
The hint zone file is referenced using the type hint statement and a zone (domain) name of “.” (the generally silent
dot).
The root server IP addresses have been stable for a number of years and are likely to remain stable for
the near future. BIND 9 has a root-server list in its executable such that even if this file is omitted, outof-date, or corrupt BIND 9 can still function. For this reason, many sample configurations omit the hints
file. All the samples given here include the hints file primarily as a reminder of the functionality of the
configuration, rather than as an absolute necessity.

Private IP Reverse Map Zone Files
Resolvers are configured to send iterative queries to the public DNS hierarchy when the information requested is not in
their cache or not defined in any local zone file. Many networks make extensive use of private IP addresses (defined by
RFC 1918, RFC 2193, RFC 5737, and RFC 6598). By their nature these IP addresses are forward-mapped in various
user zone files. However, certain applications may issue reverse map queries (mapping an IP address to a name). If

22

the private IP addresses are not defined in one or more reverse-mapped zone file(s), the resolver sends them to the DNS
hierarchy where they are simply useless traffic, slowing down DNS responses for all users.
Private IP addresses may be defined using standard reverse-mapping techniques or using the empty-zones-enable
statement. By default this statement is set to empty-zones-enable yes; and thus automatically prevents unnecessary
DNS traffic by sending an NXDOMAIN error response (indicating the name does not exist) to any request. However,
some applications may require a genuine answer to such reverse-mapped requests or they will fail to function. Mail systems
in particular perform reverse DNS queries as a first-line spam check; in this case a reverse-mapped zone file is essential.
The sample configuration files given here for both the resolver and the forwarding resolver provide a reverse-mapping zone
file for the private IP address 192.168.254.4, which is the mail server address in the base zone file, as an illustration of
the reverse-map technique. The file is named 192.168.254.rev and has a zone name of 254.168.192.in-addr.arpa.
; reverse map zone file for 192.168.254.4 only
$TTL 2d ; 172800 seconds
$ORIGIN 254.168.192.IN-ADDR.ARPA.
ns1.example.com. hostmaster.example.com. (
2003080800 ; serial number
3h
; refresh
15m
; update retry
3w
; expiry
3h
; nx = nxdomain ttl
; only one NS is required for this local file
; and is an out of zone name
; other IP addresses can be added as required
; this maps 192.168.254.4 as shown
4
PTR
mail.example.com. ; fully qualified domain name (FQDN)

#### 3.3.2 Resolver Configuration
The resolver provides recursive query support to a defined set of IP addresses. It is therefore a closed resolver and cannot
be used in wider network attacks.
// resolver named.conf file
// Two corporate subnets we wish to allow queries from
// defined in an acl clause
acl corpnets {
192.168.4.0/24;
192.168.7.0/24;
// recursive queries only allowed from these ips
// and references the acl clause
allow-query { corpnets; };

23

// this ensures that any reverse map for private IPs
// not defined in a zone file will *not* be passed to the public network
// it is the default value
empty-zones-enable yes;
// zone file for the root servers
// discretionary zone (see root server discussion above)
file "named.root";
// zone file for the localhost forward map
// discretionary zone depending on hosts file (see discussion)
file "masters/localhost-forward.db";
// zone file for the loopback address
// necessary zone
// zone file for local IP reverse map
// discretionary file depending on requirements
zone "254.168.192.in-addr.arpa" {

24

file "192.168.254.rev";

The zone and acl blocks, and the allow-query , empty-zones-enable, file, notify , recursion, and type
statements are described in detail in the appropriate sections.
As a reminder, the configuration of this resolver does not access the DNS hierarchy (does not use the public network) for
any recursive query for which:
1. The answer is already in the cache.
2. The domain name is localhost (zone localhost).
3. Is a reverse-map query for 127.0.0.1 (zone 0.0.127.in-addr.arpa).
4. Is a reverse-map query for 192.168.254/24 (zone 254.168.192.in-addr.arpa).
## 5. Is a reverse-map query for any local IP (empty-zones-enable statement).
All other recursive queries will result in access to the DNS hierarchy to resolve the query.

#### 3.3.3 Forwarding Resolver Configuration
This forwarding resolver configuration forwards all recursive queries, other than those for the defined zones and those for
which the answer is already in its cache, to a full-service resolver at the IP address 192.168.250.3, with an alternative at
192.168.230.27. The forwarding resolver will cache all responses from these servers. The configuration is closed, in that
it defines those IPs from which it will accept recursive queries.
A second configuration in which selective forwarding occurs is also provided.
// forwarding named.conf file
// Two corporate subnets we wish to allow queries from
// defined in an acl clause
acl corpnets {
192.168.4.0/24;
192.168.7.0/24;
// recursive queries only allowed from these ips
// and references the acl clause
allow-query { corpnets; };
// this ensures that any reverse map for private IPs
// not defined in a zone file will *not* be passed to the public network
// it is the default value
empty-zones-enable yes;
// this defines the addresses of the resolvers to which queries will be forwarded

25

forwarders {
192.168.250.3;
192.168.230.27;
// indicates all queries will be forwarded other than for defined zones
forward only;
// hints zone file is not required
// zone file for the localhost forward map
// discretionary zone depending on hosts file (see discussion)
file "masters/localhost-forward.db";
// zone file for the loopback address
// necessary zone
// zone file for local IP reverse map
// discretionary file depending on requirements
zone "254.168.192.in-addr.arpa" {
file "192.168.254.rev";

26

The zone and acl blocks, and the allow-query , empty-zones-enable, file, forward, forwarders, notify ,
recursion, and type statements are described in detail in the appropriate sections.
As a reminder, the configuration of this forwarding resolver does not forward any recursive query for which:
1. The answer is already in the cache.
2. The domain name is localhost (zone localhost).
3. Is a reverse-map query for 127.0.0.1 (zone 0.0.127.in-addr.arpa).
4. Is a reverse-map query for 192.168.254/24 (zone 254.168.192.in-addr.arpa).
## 5. Is a reverse-map query for any local IP (empty-zones-enable statement).
All other recursive queries will be forwarded to resolve the query.

#### 3.3.4 Selective Forwarding Resolver Configuration
This forwarding resolver configuration only forwards recursive queries for the zone example.com to the resolvers at
192.168.250.3 and 192.168.230.27. All other recursive queries, other than those for the defined zones and those for
which the answer is already in its cache, are handled by this resolver. The forwarding resolver will cache all responses
from both the public network and from the forwarded resolvers. The configuration is closed, in that it defines those IPs
from which it will accept recursive queries.
// selective forwarding named.conf file
// Two corporate subnets we wish to allow queries from
// defined in an acl clause
acl corpnets {
192.168.4.0/24;
192.168.7.0/24;
// recursive queries only allowed from these ips
// and references the acl clause
allow-query { corpnets; };
// this ensures that any reverse map for private IPs
// not defined in a zone file will *not* be passed to the public network
// it is the default value
empty-zones-enable yes;
// forwarding is not global but selective by zone in this configuration

27

// zone file for the root servers
// discretionary zone (see root server discussion above)
file "named.root";
// zone file for the localhost forward map
// discretionary zone depending on hosts file (see discussion)
file "masters/localhost-forward.db";
// zone file for the loopback address
// necessary zone
// zone file for local IP reverse map
// discretionary file depending on requirements
zone "254.168.192.in-addr.arpa" {
file "192.168.254.rev";
// zone file forwarded example.com
// this defines the addresses of the resolvers to
// which queries for this zone will be forwarded
forwarders {
192.168.250.3;

28

192.168.230.27;
// indicates all queries for this zone will be forwarded
forward only;

The zone and acl blocks, and the allow-query , empty-zones-enable, file, forward, forwarders, notify ,
recursion, and type statements are described in detail in the appropriate sections.
As a reminder, the configuration of this resolver does not access the DNS hierarchy (does not use the public network) for
any recursive query for which:
1. The answer is already in the cache.
2. The domain name is localhost (zone localhost).
3. Is a reverse-map query for 127.0.0.1 (zone 0.0.127.in-addr.arpa).
4. Is a reverse-map query for 192.168.254/24 (zone 254.168.192.in-addr.arpa).
5. Is a reverse-map query for any local IP (empty-zones-enable statement).
## 6. Is a query for the domain name example.com, in which case it will be forwarded to either 192.168.250.3 or
192.168.230.27 (zone example.com).
All other recursive queries will result in access to the DNS hierarchy to resolve the query.

### 3.4 Load Balancing
A primitive form of load balancing can be achieved in the DNS by using multiple resource records (RRs) in a zone file
(such as multiple A records) for one name.
For example, assuming three HTTP servers with network addresses of 10.0.0.1, 10.0.0.2, and 10.0.0.3, a set of records
such as the following means that clients will connect to each machine one-third of the time:
Name
www

TTL

CLASS

TYPE

Resource Record (RR) Data
10.0.0.1
10.0.0.2
10.0.0.3

When a resolver queries for these records, BIND rotates them and responds to the query with the records in a random
order. In the example above, clients randomly receive records in the order 1, 2, 3; 2, 3, 1; and 3, 1, 2. Most clients use
the first record returned and discard the rest.
For more detail on ordering responses, refer to the rrset-order statement in the options block.

### 3.5 Zone File
This section, largely borrowed from RFC 1034, describes the concept of a Resource Record (RR) and explains how to
use them.

### 3.4 Load Balancing

#### 3.5.1 Resource Records
A domain name identifies a node in the DNS tree namespace. Each node has a set of resource information, which may
be empty. The set of resource information associated with a particular name is composed of separate RRs. The order of
RRs in a set is not significant and need not be preserved by name servers, resolvers, or other parts of the DNS. However,
sorting of multiple RRs is permitted for optimization purposes: for example, to specify that a particular nearby server be
tried first. See RRset Ordering.
The components of a Resource Record are:
owner name
The domain name where the RR is found.
RR type
An encoded 16-bit value that specifies the type of the resource record. For a list of types of valid RRs, including those that have been obsoleted, please refer to https://www.iana.org/assignments/dns-parameters/dnsparameters.xhtml#dns-parameters-4.
TTL
The time-to-live of the RR. This field is a 32-bit integer in units of seconds, and is primarily used by resolvers when
they cache RRs. The TTL describes how long a RR can be cached before it should be discarded.
class
An encoded 16-bit value that identifies a protocol family or an instance of a protocol.
RDATA
The resource data. The format of the data is type- and sometimes class-specific.
The following classes of resource records are currently valid in the DNS:
The Internet. The only widely class used today.
CH
Chaosnet, a LAN protocol created at MIT in the mid-1970s. It was rarely used for its historical purpose, but was
reused for BIND’s built-in server information zones, e.g., version.bind.
HS
Hesiod, an information service developed by MIT’s Project Athena. It was used to share information about various
systems databases, such as users, groups, printers, etc.
The owner name is often implicit, rather than forming an integral part of the RR. For example, many name servers
internally form tree or hash structures for the name space, and chain RRs off nodes. The remaining RR parts are the fixed
header (type, class, TTL), which is consistent for all RRs, and a variable part (RDATA) that fits the needs of the resource
being described.
The TTL field is a time limit on how long an RR can be kept in a cache. This limit does not apply to authoritative data
in zones; that also times out, but follows the refreshing policies for the zone. The TTL is assigned by the administrator
for the zone where the data originates. While short TTLs can be used to minimize caching, and a zero TTL prohibits
caching, the realities of Internet performance suggest that these times should be on the order of days for the typical host.
If a change is anticipated, the TTL can be reduced prior to the change to minimize inconsistency, and then increased back
to its former value following the change.
The data in the RDATA section of RRs is carried as a combination of binary strings and domain names. The domain
names are frequently used as “pointers” to other data in the DNS.

Textual Expression of RRs
RRs are represented in binary form in the packets of the DNS protocol, and are usually represented in highly encoded
form when stored in a name server or resolver. In the examples provided in RFC 1034, a style similar to that used in
primary files was employed in order to show the contents of RRs. In this format, most RRs are shown on a single line,
although continuation lines are possible using parentheses.
The start of the line gives the owner of the RR. If a line begins with a blank, then the owner is assumed to be the same
as that of the previous RR. Blank lines are often included for readability.
Following the owner are listed the TTL, type, and class of the RR. Class and type use the mnemonics defined above, and
TTL is an integer before the type field. To avoid ambiguity in parsing, type and class mnemonics are disjoint, TTLs are
integers, and the type mnemonic is always last. The IN class and TTL values are often omitted from examples in the
interest of clarity.
The resource data or RDATA section of the RR is given using knowledge of the typical representation for the data.
For example, the RRs carried in a message might be shown as:
ISI.EDU.
VENERA.ISI.EDU
VAXA.ISI.EDU

## 10. VENERA.ISI.EDU.
## 10. VAXA.ISI.EDU
128.9.0.32
10.1.0.52
10.2.0.27
128.9.0.33

The MX RRs have an RDATA section which consists of a 16-bit number followed by a domain name. The address RRs
use a standard IP address format to contain a 32-bit Internet address.
The above example shows six RRs, with two RRs at each of three domain names.
Here is another possible example:
XX.LCS.MIT.EDU.

CH A

10.0.0.44
MIT.EDU. 2420

This shows two addresses for XX.LCS.MIT.EDU, each of a different class.

#### 3.5.2 Discussion of MX Records
As described above, domain servers store information as a series of resource records, each of which contains a particular
piece of information about a given domain name (which is usually, but not always, a host). The simplest way to think of
an RR is as a typed pair of data, a domain name matched with a relevant datum and stored with some additional type
information, to help systems determine when the RR is relevant.
MX records are used to control delivery of email. The data specified in the record is a priority and a domain name. The
priority controls the order in which email delivery is attempted, with the lowest number first. If two priorities are the
same, a server is chosen randomly. If no servers at a given priority are responding, the mail transport agent falls back to
the next largest priority. Priority numbers do not have any absolute meaning; they are relevant only respective to other
MX records for that domain name. The domain name given is the machine to which the mail is delivered. It must have
an associated address record (A or AAAA); CNAME is not sufficient.
For a given domain, if there is both a CNAME record and an MX record, the MX record is in error and is ignored.
Instead, the mail is delivered to the server specified in the MX record pointed to by the CNAME. For example:

### 3.5 Zone File

mail.example.com.
mail2.example.com.

20
10.0.0.1
10.0.0.2

mail.example.com.
mail2.example.com.
mail.backup.org.

Mail delivery is attempted to mail.example.com and mail2.example.com (in any order); if neither of those succeeds,
delivery to mail.backup.org is attempted.

#### 3.5.3 Setting TTLs
The time-to-live (TTL) of the RR field is a 32-bit integer represented in units of seconds, and is primarily used by resolvers
when they cache RRs. The TTL describes how long an RR can be cached before it should be discarded. The following
three types of TTLs are currently used in a zone file.
SOA minimum
The last field in the SOA is the negative caching TTL. This controls how long other servers cache no-such-domain
(NXDOMAIN) responses from this server. Further details can be found in RFC 2308.
The maximum time for negative caching is 3 hours (3h).
$TTL
The $TTL directive at the top of the zone file (before the SOA) gives a default TTL for every RR without a specific
TTL set.
RR TTLs
Each RR can have a TTL as the second field in the RR, which controls how long other servers can cache it.
All of these TTLs default to units of seconds, though units can be explicitly specified: for example, 1h30m.

#### 3.5.4 Inverse Mapping in IPv4
Reverse name resolution (that is, translation from IP address to name) is achieved by means of the in-addr.arpa domain
and PTR records. Entries in the in-addr.arpa domain are made in least-to-most significant order, read left to right. This
is the opposite order to the way IP addresses are usually written. Thus, a machine with an IP address of 10.1.2.3 would
have a corresponding in-addr.arpa name of 3.2.1.10.in-addr.arpa. This name should have a PTR resource record whose
data field is the name of the machine or, optionally, multiple PTR records if the machine has more than one name. For
example, in the example.com domain:
$ORIGIN
3

2.1.10.in-addr.arpa
IN PTR foo.example.com.

The $ORIGIN line in this example is only to provide context; it does not necessarily appear in the actual usage. It is
only used here to indicate that the example is relative to the listed origin.

#### 3.5.5 Other Zone File Directives
The DNS “master file” format was initially defined in RFC 1035 and has subsequently been extended. While the format
itself is class-independent, all records in a zone file must be of the same class.
Master file directives include $ORIGIN, $INCLUDE, and $TTL.

The @ (at-sign)
When used in the label (or name) field, the asperand or at-sign (@) symbol represents the current origin. At the start of
the zone file, it is the <zone_name>, followed by a trailing dot (.).
The $ORIGIN Directive
Syntax: $ORIGIN domain-name [comment]
$ORIGIN sets the domain name that is appended to any unqualified records. When a zone is first read, there is an
implicit $ORIGIN <zone_name>.; note the trailing dot. The current $ORIGIN is appended to the domain specified in
the $ORIGIN argument if it is not absolute.
$ORIGIN example.com.
WWW
MAIN-SERVER

is equivalent to
WWW.EXAMPLE.COM. CNAME MAIN-SERVER.EXAMPLE.COM.

The $INCLUDE Directive
Syntax: $INCLUDE filename [origin] [comment]
This reads and processes the file filename as if it were included in the file at this point. The filename can be an absolute
path, or a relative path. In the latter case it is read from named’s working directory. If origin is specified, the file is
processed with $ORIGIN set to that value; otherwise, the current $ORIGIN is used.
The origin and the current domain name revert to the values they had prior to the $INCLUDE once the file has been
read.
RFC 1035 specifies that the current origin should be restored after an $INCLUDE, but it is silent on whether the
current domain name should also be restored. BIND 9 restores both of them. This could be construed as a deviation
from RFC 1035, a feature, or both.
The $TTL Directive
Syntax: $TTL default-ttl [comment]
This sets the default Time-To-Live (TTL) for subsequent records with undefined TTLs. Valid TTLs are of the range
0-2147483647 seconds.
$TTL is defined in RFC 2308.

#### 3.5.6 BIND Primary File Extension: the $GENERATE Directive
Syntax: $GENERATE range owner [ttl] [class] type rdata [comment]
$GENERATE is used to create a series of resource records that only differ from each other by an iterator.
range
This can be one of two forms: start-stop or start-stop/step. If the first form is used, then step is set to 1. “start”,
“stop”, and “step” must be positive integers between 0 and (2^31)-1. “start” must not be larger than “stop”.

### 3.5 Zone File

owner
This describes the owner name of the resource records to be created.
The owner string may include one or more $ (dollar sign) symbols, which will be replaced with the iterator value
when generating records; see below for details.
ttl
This specifies the time-to-live of the generated records. If not specified, this is inherited using the normal TTL
inheritance rules.
class and ttl can be entered in either order.
class
This specifies the class of the generated records. This must match the zone class if it is specified.
class and ttl can be entered in either order.
This can be any valid type.
rdata
This is a string containing the RDATA of the resource record to be created. As with owner, the rdata string may
include one or more $ symbols, which are replaced with the iterator value. rdata may be quoted if there are spaces
in the string; the quotation marks do not appear in the generated record.
Any single $ (dollar sign) symbols within the owner or rdata strings are replaced by the iterator value. To get a $ in
the output, escape the $ using a backslash \, e.g., \$. (For compatibility with earlier versions, $$ is also recognized
as indicating a literal $ in the output.)
The $ may optionally be followed by modifiers which change the offset from the iterator, field width, and base.
Modifiers are introduced by a { (left brace) immediately following the $, as in ${offset[,width[,base]]}. For example, ${-20,3,d} subtracts 20 from the current value and prints the result as a decimal in a zero-padded field of
width 3. Available output forms are decimal (d), octal (o), hexadecimal (x or X for uppercase), and nibble (n or
N for uppercase). The modfiier cannot contain whitespace or newlines.
The default modifier is ${0,0,d}. If the owner is not absolute, the current $ORIGIN is appended to the name.
In nibble mode, the value is treated as if it were a reversed hexadecimal string, with each hexadecimal digit as a
separate label. The width field includes the label separator.
Examples:
$GENERATE can be used to easily generate the sets of records required to support sub-/24 reverse delegations described
in RFC 2317:
$ORIGIN 0.0.192.IN-ADDR.ARPA.
$GENERATE 1-2 @ NS SERVER$.EXAMPLE.
$GENERATE 1-127 $ CNAME $.0

is equivalent to
0.0.0.192.IN-ADDR.ARPA. NS SERVER1.EXAMPLE.
0.0.0.192.IN-ADDR.ARPA. NS SERVER2.EXAMPLE.
1.0.0.192.IN-ADDR.ARPA. CNAME 1.0.0.0.192.IN-ADDR.ARPA.
2.0.0.192.IN-ADDR.ARPA. CNAME 2.0.0.0.192.IN-ADDR.ARPA.
127.0.0.192.IN-ADDR.ARPA. CNAME 127.0.0.0.192.IN-ADDR.ARPA.

This example creates a set of A and MX records. Note the MX’s rdata is a quoted string; the quotes are stripped when
$GENERATE is processed:

$ORIGIN EXAMPLE.
$GENERATE 1-127 HOST-$ A 1.2.3.$
$GENERATE 1-127 HOST-$ MX "0 ."

is equivalent to
HOST-1.EXAMPLE.
A 1.2.3.1
HOST-1.EXAMPLE.
MX 0 .
HOST-2.EXAMPLE.
A 1.2.3.2
HOST-2.EXAMPLE.
MX 0 .
HOST-3.EXAMPLE.
A 1.2.3.3
HOST-3.EXAMPLE.
MX 0 .
HOST-127.EXAMPLE. A 1.2.3.127
HOST-127.EXAMPLE. MX 0 .

This example generates A and AAAA records using modifiers; the AAAA owner names are generated using nibble mode:
$ORIGIN EXAMPLE.
$GENERATE 0-2 HOST-${0,4,d} A 1.2.3.${1,0,d}
$GENERATE 1024-1026 ${0,3,n} AAAA 2001:db8::${0,4,x}

is equivalent to:
HOST-0000.EXAMPLE.
HOST-0001.EXAMPLE.
HOST-0002.EXAMPLE.
0.0.4.EXAMPLE.
1.0.4.EXAMPLE.
2.0.4.EXAMPLE.

1.2.3.1
1.2.3.2
1.2.3.3
2001:db8::400
2001:db8::401
2001:db8::402

The $GENERATE directive is a BIND extension and not part of the standard zone file format.

#### 3.5.7 Additional File Formats
In addition to the standard text format, BIND 9 supports the ability to read or dump to zone files in other formats.
The raw format is a binary representation of zone data in a manner similar to that used in zone transfers. Since it does
not require parsing text, load time is significantly reduced.
For a primary server, a zone file in raw format is expected to be generated from a text zone file by the
named-compilezone command. For a secondary server or a dynamic zone, the zone file is automatically generated
when named dumps the zone contents after zone transfer or when applying prior updates, if one of these formats is
specified by the masterfile-format option.
If a zone file in raw format needs manual modification, it first must be converted to text format by the
named-compilezone command, then converted back after editing. For example:
named-compilezone -f raw -F text -o zonefile.text <origin> zonefile.raw
[edit zonefile.text]
named-compilezone -f text -F raw -o zonefile.raw <origin> zonefile.text

### 3.5 Zone File

FOUR

NAME SERVER OPERATIONS

### 4.1 Tools for Use With the Name Server Daemon
This section describes several indispensable diagnostic, administrative, and monitoring tools available to the system administrator for controlling and debugging the name server daemon.

#### 4.1.1 Diagnostic Tools
The dig , host, and nslookup programs are all command-line tools for manually querying name servers. They differ
in style and output format.
dig
dig is the most versatile and complete of these lookup tools. It has two modes: simple interactive mode for a

single query, and batch mode, which executes a query for each in a list of several query lines. All query options are
accessible from the command line.
For more information and a list of available commands and options, see dig - DNS lookup utility.
host

The host utility emphasizes simplicity and ease of use. By default, it converts between host names and Internet
addresses, but its functionality can be extended with the use of options.
For more information and a list of available commands and options, see host - DNS lookup utility.
nslookup
nslookup has two modes: interactive and non-interactive. Interactive mode allows the user to query name servers

for information about various hosts and domains, or to print a list of hosts in a domain. Non-interactive mode is
used to print just the name and requested information for a host or domain.
Due to its arcane user interface and frequently inconsistent behavior, we do not recommend the use of nslookup.
Use dig instead.

#### 4.1.2 Administrative Tools
Administrative tools play an integral part in the management of a server.
named-checkconf
The named-checkconf program checks the syntax of a named.conf file.

For more information and a list of available commands and options, see named-checkconf - named configuration
file syntax checking tool.
named-checkzone
The named-checkzone program checks a zone file for syntax and consistency.

For more information and a list of available commands and options, see named-checkzone - zone file validation
tool.

named-compilezone

This tool is similar to named-checkzone but it always dumps the zone content to a specified file (typically in a
different format).
For more information and a list of available commands and options, see named-compilezone - zone file converting
tool.
rndc

The remote name daemon control (rndc) program allows the system administrator to control the operation of a
See rndc - name server control utility for details of the available rndc commands.
rndc requires a configuration file, since all communication with the server is authenticated with digital signatures

that rely on a shared secret, and there is no way to provide that secret other than with a configuration file. The default
location for the rndc configuration file is /etc/rndc.conf, but an alternate location can be specified with the
-c option. If the configuration file is not found, rndc also looks in /etc/rndc.key (or whatever sysconfdir
was defined when the BIND build was configured). The rndc.key file is generated by running rndc-confgen
-a as described in controls.
The format of the configuration file is similar to that of named.conf , but is limited to only three blocks: the
options, key , server, and the include Directive. These blocks are what associate the secret keys to the servers
with which they are meant to be shared. The order of blocks is not significant.

default-key <string>;
default-port <integer>;
default-server <string>;
default-source-address ( <ipv4_address> | * );
default-source-address-v6 ( <ipv6_address> | * );

default-server

Grammar: default-server <string>;
default-server takes a host name or address argument and represents the server that is contacted if no
-s option is provided on the command line.
default-key

Grammar: default-key <string>;
default-key takes the name of a key as its argument, as defined by a key block.
default-port

Grammar: default-port <integer>;
default-port specifies the port to which rndc should connect if no port is given on the command line or
in a server block.

Chapter 4. Name Server Operations

default-source-address

Grammar: default-source-address ( <ipv4_address> | * );
default-source-address-v6

Grammar: default-source-address-v6 ( <ipv6_address> | * );
default-source-address and default-source-address-v6 specify the IPv4 and IPv6 source address used to communicate with the server if no address is given on the command line or in a server block.

Grammar server: key <string>;
Grammar topmost:

Blocks: topmost, server
The key block defines a key to be used by rndc when authenticating with named. Its syntax is identical to the key
statement in named.conf . The keyword key is followed by a key name, which must be a valid domain name,
though it need not actually be hierarchical; thus, a string like rndc_key is a valid name. The key block has two
statements: algorithm and secret.

Grammar: algorithm <string>;
Blocks: key
While the configuration parser accepts any string as the argument to algorithm, currently only the strings
hmac-md5, hmac-sha1, hmac-sha224, hmac-sha256, hmac-sha384, and hmac-sha512 have any
meaning.

Grammar: secret <string>;
Blocks: key
The secret is a Base64-encoded string as specified in RFC 3548.

server <string> {
addresses { ( <quoted_string> [ port <integer> ] | <ipv4_address> [ port
,→<integer> ] | <ipv6_address> [ port <integer> ] ); ... };
key <string>;
port <integer>;
source-address ( <ipv4_address> | * );
source-address-v6 ( <ipv6_address> | * );

### 4.1 Tools for Use With the Name Server Daemon

The server block specifies connection parameters for a given server. The server can be specified as a host name
or address.
addresses

Grammar: addresses { ( <quoted_string> [ port <integer> ] | <ipv4_address> [
port <integer> ] | <ipv6_address> [ port <integer> ] ); ... };

Specifies one or more addresses to use when communicating with this server.

Associates a key defined using the key statement with a server.

Grammar: port <integer>;
Specifes the port rndc should connect to on the server.
source-address

Grammar: source-address ( <ipv4_address> | * );
source-address-v6

Grammar: source-address-v6 ( <ipv6_address> | * );
Overrides default-source-address and default-source-address-v6 for this specific server.
A sample minimal configuration file is as follows:
key rndc_key {
algorithm "hmac-sha256";
"c3Ryb25nIGVub3VnaCBmb3IgYSBtYW4gYnV0IG1hZGUgZm9yIGEgd29tYW4K";
default-server 127.0.0.1;
default-key
rndc_key;

This file, if installed as /etc/rndc.conf, allows the command:
rndc reload

to connect to 127.0.0.1 port 953 and causes the name server to reload, if a name server on the local machine is
running with the following controls statements:
inet 127.0.0.1
allow { localhost; } keys { rndc_key; };

and it has an identical key block for rndc_key.

Chapter 4. Name Server Operations

Running the rndc-confgen program conveniently creates an rndc.conf file, and also displays the corresponding
controls statement needed to add to named.conf . Alternatively, it is possible to run rndc-confgen -a to
set up an rndc.key file and not modify named.conf at all.

### 4.2 Signals
Certain Unix signals cause the name server to take specific actions, as described in the following table. These signals can
be sent using the kill command.
SIGHUP
SIGUSR1
SIGTERM
SIGINT

Causes the server to read named.conf and reload the database.
Causes the server close the currently open log files
Causes the server to clean up and exit.
Causes the server to clean up and exit.

### 4.3 Plugins
Plugins are a mechanism to extend the functionality of named using dynamically loadable libraries. By using plugins,
core server functionality can be kept simple for the majority of users; more complex code implementing optional features
need only be installed by users that need those features.
The plugin interface is a work in progress, and is expected to evolve as more plugins are added. Currently, only “query
plugins” are supported; these modify the name server query logic. Other plugin types may be added in the future.
The only plugin currently included in BIND is filter-aaaa.so, which replaces the filter-aaaa feature that previously existed natively as part of named. The code for this feature has been removed from named and can no longer be
configured using standard named.conf syntax, but linking in the filter-aaaa.so plugin provides identical functionality.

### 4.4 Configuring Plugins
plugin

Grammar: plugin ( query ) <string> [ { <unspecified-text> } ]; // may occur multiple

Configures plugins in named.conf .
A plugin is configured with the plugin statement in named.conf :
plugin query "library.so" {
parameters

In this example, file library.so is the plugin library. query indicates that this is a query plugin.
Multiple plugin statements can be specified, to load different plugins or multiple instances of the same plugin.
parameters are passed as an opaque string to the plugin’s initialization routine. Configuration syntax differs depending

on the module.

### 4.2 Signals

### 4.5 Developing Plugins
Each plugin implements four functions:
- plugin_register to allocate memory, configure a plugin instance, and attach to hook points within named ,
- plugin_destroy to tear down the plugin instance and free memory,
- plugin_version to check that the plugin is compatible with the current version of the plugin API,
- plugin_check to test syntactic correctness of the plugin parameters.
At various locations within the named source code, there are “hook points” at which a plugin may register itself. When a
hook point is reached while named is running, it is checked to see whether any plugins have registered themselves there;
if so, the associated “hook action” - a function within the plugin library - is called. Hook actions may examine the runtime
state and make changes: for example, modifying the answers to be sent back to a client or forcing a query to be aborted.
More details can be found in the file lib/ns/include/ns/hooks.h.

Chapter 4. Name Server Operations

FIVE

DNSSEC

DNS Security Extensions (DNSSEC) provide reliable protection from cache poisoning attacks. At the same time these
extensions also provide other benefits: they limit the impact of random subdomain attacks on resolver caches and authoritative servers, and provide the foundation for modern applications like authenticated and private e-mail transfer.
To achieve this goal, DNSSEC adds digital signatures to DNS records in authoritative DNS zones, and DNS resolvers
verify the validity of the signatures on the received records. If the signatures match the received data, the resolver can be
sure that the data was not modified in transit.
DNSSEC and transport-level encryption are complementary! Unlike typical transport-level encryption like DNSover-TLS, DNS-over-HTTPS, or VPN, DNSSEC makes DNS records verifiable at all points of the DNS resolution
chain.
This section focuses on ways to deploy DNSSEC using BIND. For a more in-depth discussion of DNSSEC principles
(e.g. How Does DNSSEC Change DNS Lookup?) please see DNSSEC Guide.

### 5.1 Zone Signing
BIND offers several ways to generate signatures and maintain their validity during the lifetime of a DNS zone:
- Fully Automated (Key and Signing Policy) - strongly recommended
- Manual Signing - discouraged, use only for debugging

#### 5.1.1 Zone keys
Regardless of the zone-signing method in use, cryptographic keys are stored in files named like Kdnssec.example.
+013+12345.key and Kdnssec.example.+013+12345.private. The private key (in the .private file) is used
to generate signatures, and the public key (in the .key file) is used for signature verification. Additionally, the Fully
Automated (Key and Signing Policy) method creates a third file, Kdnssec.example+013+12345.state, which is used
to track DNSSEC key timings and to perform key rollovers safely.
These filenames contain:
- the key name, which always matches the zone name (dnssec.example.),
- the algorithm number (013 is ECDSAP256SHA256, 008 is RSASHA256, etc.),
- and the key tag, i.e. a non-unique key identifier (12345 in this case).

Private keys are required for full disaster recovery. Back up key files in a safe location and protect them from unauthorized access. Anyone with access to the private key can create fake but seemingly valid DNS data.

#### 5.1.2 Fully Automated (Key and Signing Policy)
Key and Signing Policy (KASP) is a method of configuration that describes how to maintain DNSSEC signing keys and
how to sign the zone.
This is the recommended, fully automated way to sign and maintain DNS zones. For most use cases users can simply use
the built-in default policy, which applies up-to-date DNSSEC practices:
zone "dnssec.example" {
file "dnssec.example.db";

The dnssec-policy statement requires dynamic DNS to be set up, or inline-signing to be enabled. In the example
above we use the latter, because the default policy uses inline-signing .
This is sufficient to create the necessary signing keys, and generate DNSKEY, RRSIG, and NSEC records for the zone. BIND
also takes care of any DNSSEC maintenance for this zone, including replacing signatures that are about to expire and
managing Key Rollovers.
dnssec-policy needs write access to the zone. Please see dnssec-policy for more details about implications

for zone storage.
The default policy creates one key that is used to sign the complete zone, and uses NSEC to enable authenticated denial of
existence (a secure way to tell which records do not exist in a zone). This policy is recommended and typically does not
need to be changed.
If needed, a custom policy can be defined by adding a dnssec-policy statement into the configuration:
dnssec-policy "custom" {
dnskey-ttl 600;
keys {
ksk lifetime P1Y algorithm ecdsap384sha384;
zsk lifetime 60d algorithm ecdsap384sha384;

This custom policy, for example:
- uses a very short DNSKEY TTL (600 seconds),
- uses two keys to sign the zone: a Key Signing Key (KSK) to sign the key related RRsets (DNSKEY, CDS, and
CDNSKEY), and a Zone Signing Key (ZSK) to sign the rest of the zone. The KSK is automatically rotated after one
year and the ZSK after 60 days.
Also:

- The configured keys have a lifetime set and use the ECDSAP384SHA384 algorithm.
- The last line instructs BIND to generate NSEC3 records for Proof of Non-Existence, using zero extra iterations
and no salt. NSEC3 opt-out is disabled, meaning insecure delegations also get an NSEC3 record.
For more information about KASP configuration see dnssec-policy .
The Advanced Discussions section in the DNSSEC Guide discusses the various policy settings and may be useful for
determining values for specific needs.
Key Rollover
When using a dnssec-policy , a key lifetime can be set to trigger key rollovers. ZSK rollovers are fully automatic, but
for KSK and CSK rollovers a DS record needs to be submitted to the parent. See Secure Delegation for possible ways to
do so.
Once the DS is in the parent (and the DS of the predecessor key is withdrawn), BIND needs to be told that this event has
happened. This can be done automatically by configuring parental agents:
zone "dnssec.example" {
file "dnssec.example.db";
parental-agents { 192.0.2.1; };
checkds explicit;

Here one server, 192.0.2.1, is configured for BIND to send DS queries to, to check the DS RRset for dnssec-example
during key rollovers. This needs to be a trusted server, because BIND does not validate the response. The checkds option
makes BIND use the explicitly configured parental agents, rather than looking them up by querying for the parent NS
If setting up a parental agent is undesirable, it is also possible to tell BIND that the DS is published in the parent with:
rndc dnssec -checkds -key 12345 published dnssec.example.. and the DS for the predecessor key has
been removed with: rndc dnssec -checkds -key 54321 withdrawn dnssec.example.. where 12345 and
54321 are the key tags of the successor and predecessor key, respectively.
To roll a key sooner than scheduled, or to roll a key that has an unlimited lifetime, use: rndc dnssec -rollover
-key 12345 dnssec.example..
To revert a signed zone back to an insecure zone, change the zone configuration to use the built-in “insecure” policy.
Detailed instructions are described in Reverting to Unsigned.
Multi-Signer Model
Dynamic zones provide the ability to sign a zone by multiple providers, meaning each provider signs and serves the same
zone independently, as is described in RFC 8901. BIND 9 is able to support Model 2, where each provider has their own
KSK and ZSK (or CSK). The keys from the other provider can be imported via Dynamic Update. For each active KSK
there must be a corresponding DS record in the parent zone. Key rollovers require coordination in order to update the
DS and DNSKEY RRset.

#### 5.1.3 Manual Signing
There are several tools available to manually sign a zone.

### 5.1 Zone Signing

Please note manual procedures are available mainly for backwards compatibility and should be used only by expert
users with specific needs.
To set up a DNSSEC secure zone manually, a series of steps must be followed. Please see chapter Manual Signing in the
DNSSEC Guide for more information.

#### 5.1.4 Monitoring with Private Type Records
The state of the signing process is signaled by private type records (with a default type value of 65534). When signing is
complete, those records with a non-zero initial octet have a non-zero value for the final octet.
If the first octet of a private type record is non-zero, the record indicates either that the zone needs to be signed with the
key matching the record, or that all signatures that match the record should be removed. Here are the meanings of the
different values of the first octet:
- algorithm (octet 1)
- key ID in network order (octet 2 and 3)
- removal flag (octet 4)
- complete flag (octet 5)
Only records flagged as “complete” can be removed via dynamic update; attempts to remove other private type records
are silently ignored.
If the first octet is zero (this is a reserved algorithm number that should never appear in a DNSKEY record), the record
indicates that changes to the NSEC3 chains are in progress. The rest of the record contains an NSEC3PARAM record, while
the flag field tells what operation to perform based on the flag bits:
0x01 OPTOUT
0x80 CREATE
0x40 REMOVE
0x20 NONSEC

### 5.2 Secure Delegation
Once a zone is signed on the authoritative servers, the last remaining step is to establish chain of trust1 between the parent
zone (example.) and the local zone (dnssec.example.).
Generally the procedure is:
- Wait for stale data to expire from caches. The amount of time required is equal to the maximum TTL value used in
the zone before signing. This step ensures that unsigned data expire from caches and resolvers do not get confused
by missing signatures.
- Insert/update DS records in the parent zone (dnssec.example. DS record).
There are multiple ways to update DS records in the parent zone. Refer to the documentation for the parent zone to find
out which options are applicable to a given case zone. Generally the options are, from most- to least-recommended:
1 For further details on how the chain of trust is used in practice, see The 12-Step DNSSEC Validation Process (Simplified) in the DNSSEC Guide.

- Automatically update the DS record in the parent zone using CDS/CDNSKEY records automatically generated by
BIND. This requires support for RFC 7344 in either parent zone, registry, or registrar. In that case, configure
BIND to monitor DS records in the parent zone and everything will happen automatically at the right time.
- Query the zone for automatically generated CDS or CDNSKEY records using dig , and then insert these records into
the parent zone using the method specified by the parent zone (web form, e-mail, API, …).
- Generate DS records manually using the dnssec-dsfromkey utility on zone keys, and then insert them into the
parent zone.

### 5.3 DNSSEC Validation
The BIND resolver validates answers from authoritative servers by default. This behavior is controlled by the configuration
statement dnssec-validation.
By default a trust anchor for the DNS root zone is used. This trust anchor is provided as part of BIND and is kept
up-to-date using Dynamic Trust Anchor Management.
DNSSEC validation works “out of the box” and does not require additional configuration. Additional configuration
options are intended only for special cases.
To validate answers, the resolver needs at least one trusted starting point, a “trust anchor.” Essentially, trust anchors are
copies of DNSKEY RRs for zones that are used to form the first link in the cryptographic chain of trust. Alternative trust
anchors can be specified using trust-anchors, but this setup is very unusual and is recommended only for expert use.
For more information, see Trust Anchors in the DNSSEC Guide.
The BIND authoritative server does not verify signatures on load, so zone keys for authoritative zones do not need to be
specified in the configuration file.

#### 5.3.1 Validation Failures
When DNSSEC validation is configured, the resolver rejects any answers from signed, secure zones which fail to validate,
and returns SERVFAIL to the client.
Responses may fail to validate for any of several reasons, including missing, expired, or invalid signatures; a key which
does not match the DS RRset in the parent zone; or an insecure response from a zone which, according to its parent,
should have been secure.
For more information see Basic DNSSEC Troubleshooting.

#### 5.3.2 Coexistence With Unsigned (Insecure) Zones
Zones not protected by DNSSEC are called “insecure,” and these zones seamlessly coexist with signed zones.
When the validator receives a response from an unsigned zone that has a signed parent, it must confirm with the parent
that the zone was intentionally left unsigned. It does this by verifying, via signed and validated NSEC/NSEC3 records, that
the parent zone contains no DS records for the child.
If the validator can prove that the zone is insecure, then the response is accepted. However, if it cannot, the validator
must assume an insecure response to be a forgery; it rejects the response and logs an error.
The logged error reads “insecurity proof failed” and “got insecure response; parent indicates it should be secure.”

### 5.3 DNSSEC Validation

### 5.4 Dynamic Trust Anchor Management
BIND is able to maintain DNSSEC trust anchors using RFC 5011 key management. This feature allows named to keep
track of changes to critical DNSSEC keys without any need for the operator to make changes to configuration files.

#### 5.4.1 Validating Resolver
To configure a validating resolver to use RFC 5011 to maintain a trust anchor, configure the trust anchor using a trust-anchors statement and the initial-key keyword. Information about this can be found in the
trust-anchors statement description.

#### 5.4.2 Authoritative Server
To set up an authoritative zone for RFC 5011 trust anchor maintenance, generate two (or more) key signing keys (KSKs)
for the zone. Sign the zone with one of them; this is the “active” KSK. All KSKs which do not sign the zone are “stand-by”
keys.
Any validating resolver which is configured to use the active KSK as an RFC 5011-managed trust anchor takes note of
the stand-by KSKs in the zone’s DNSKEY RRset, and stores them for future reference. The resolver rechecks the zone
periodically; after 30 days, if the new key is still there, the key is accepted by the resolver as a valid trust anchor for the
zone. Anytime after this 30-day acceptance timer has completed, the active KSK can be revoked, and the zone can be
“rolled over” to the newly accepted key.
The easiest way to place a stand-by key in a zone is to use the “smart signing” features of dnssec-keygen and
dnssec-signzone. If a key exists with a publication date in the past, but an activation date which is unset or in
the future, dnssec-signzone -S includes the DNSKEY record in the zone but does not sign with it:
$ dnssec-keygen -K keys -f KSK -P now -A now+2y example.net
$ dnssec-signzone -S -K keys example.net

To revoke a key, use the command dnssec-revoke. This adds the REVOKED bit to the key flags and regenerates the
K*.key and K*.private files.
After revoking the active key, the zone must be signed with both the revoked KSK and the new active KSK. Smart signing
takes care of this automatically.
Once a key has been revoked and used to sign the DNSKEY RRset in which it appears, that key is never again accepted
as a valid trust anchor by the resolver. However, validation can proceed using the new active key, which was accepted by
the resolver when it was a stand-by key.
See RFC 5011 for more details on key rollover scenarios.
When a key has been revoked, its key ID changes, increasing by 128 and wrapping around at 65535. So, for example, the
key “Kexample.com.+005+10000” becomes “Kexample.com.+005+10128”.
If two keys have IDs exactly 128 apart and one is revoked, the two key IDs will collide, causing several problems. To
prevent this, dnssec-keygen does not generate a new key if another key which may collide is present. This checking
only occurs if the new keys are written to the same directory that holds all other keys in use for that zone.
Older versions of BIND 9 did not have this protection. Exercise caution if using key revocation on keys that were generated
by previous releases, or if using keys stored in multiple directories or on multiple machines.
It is expected that a future release of BIND 9 will address this problem in a different way, by storing revoked keys with
their original unrevoked key IDs.

### 5.5 PKCS#11 (Cryptoki) Support
Public Key Cryptography Standard #11 (PKCS#11) defines a platform-independent API for the control of hardware
security modules (HSMs) and other cryptographic support devices.
PKCS#11 uses a “provider library”: a dynamically loadable library which provides a low-level PKCS#11 interface to
drive the HSM hardware. The PKCS#11 provider library comes from the HSM vendor, and it is specific to the HSM to
be controlled.
BIND 9 accesses PKCS#11 libraries via OpenSSL Providers. The provider for OpenSSL 3 and newer is pkcs11-provider.
In both cases the extension is dynamically loaded into OpenSSL and the HSM is operated indirectly; any cryptographic
operations not supported by the HSM can be carried out by OpenSSL instead.

#### 5.5.1 Prerequisites
See the documentation provided by the HSM vendor for information about installing, initializing, testing, and troubleshooting the HSM.

#### 5.5.2 Building SoftHSMv2
SoftHSMv2, the latest development version of SoftHSM, is available from https://github.com/softhsm/SoftHSMv2. It
is a software library developed by the OpenDNSSEC project (https://www.opendnssec.org) which provides a PKCS#11
interface to a virtual HSM, implemented in the form of an SQLite3 database on the local filesystem. It provides less security than a true HSM, but it allows users to experiment with native PKCS#11 when an HSM is not available. SoftHSMv2
can be configured to use either OpenSSL or the Botan library to perform cryptographic functions, but when using it for
native PKCS#11 in BIND, OpenSSL is required.
By default, the SoftHSMv2 configuration file is prefix/etc/softhsm2.conf (where prefix is configured at compile
time). This location can be overridden by the SOFTHSM2_CONF environment variable. The SoftHSMv2 cryptographic
store must be installed and initialized before using it with BIND.

cd SoftHSMv2
configure --with-crypto-backend=openssl --prefix=/opt/pkcs11/usr
make
make install
/opt/pkcs11/usr/bin/softhsm-util --init-token 0 --slot 0 --label softhsmv2

#### 5.5.3 OpenSSL 3 With pkcs11-provider
OpenSSL provider-based PKCS#11 uses the pkcs11-provider project.
pkcs11-provider tries to fit the PKCS#11 API within the Provider API of OpenSSL; that is, it provides a gateway between
PKCS#11 modules and the OpenSSL Provider API. The provider must be registered with OpenSSL and the path to the
PKCS#11 module gateway must be provided. This can be done by editing the OpenSSL configuration file, by providerspecific controls, or by using the p11-kit proxy module.
It is required to use pkcs11-provider version 0.3 or later. It is recommended to use the lastest version available.

#### 5.5.4 Configuring pkcs11-provider
The canonical documentation for configuring pkcs11-provider is in the provider-pkcs11.7 manual page, but a copy of a
working configuration is provided here for convenience:
In this example, we use a custom copy of OpenSSL configuration, driven by an environment variable called
OPENSSL_CONF. First, copy the global OpenSSL configuration (often found in etc/ssl/openssl.conf) and customize it to use pkcs11-provider.

### 5.5 PKCS#11 (Cryptoki) Support

cp /etc/ssl/openssl.cnf /opt/bind9/etc/openssl.cnf

Next, export the environment variable:
export OPENSSL_CONF=/opt/bind9/etc/openssl.cnf

Then add the following line at the top of the file, before any sections (in square brackets) are defined:
openssl_conf = openssl_init

Make sure there are no other ‘openssl_conf = …’ lines in the file.
Add the following lines at the bottom of the file:
[openssl_init]
providers = provider_init
[provider_init]
default = default_init
pkcs11 = pkcs11_init
[default_init]
activate = 1
[pkcs11_init]
module = <PATHTO>/pkcs11.so
pkcs11-module-path = <FULL_PATH_TO_HSM_MODULE>
,→266
pkcs11-module-load-behavior = early
#pkcs11-module-quirks = no-deinit
#pkcs11-module-token-pin = file:/etc/pki/pin.txt
activate = 1

#### 5.5.5 Key Generation
HSM keys can now be created and used. We are assuming that BIND 9 is already installed, either from a package or from
the sources, and the tools are readily available in the $PATH.
A zone that is configured with dnssec-policy can generate keys through the PKCS#11 Provider API of OpenSSL.
If you want to create keys manually, the pkcs11-tool available from the OpenSC suite can be used. On both DEB-based
and RPM-based distributions, the package is called opensc.
We need to generate at least two RSA keys:
pkcs11-tool --module <FULL_PATH_TO_HSM_MODULE> -l -k --key-type rsa:2048 --label␣
,→example.net-ksk --pin <PIN>
pkcs11-tool --module <FULL_PATH_TO_HSM_MODULE> -l -k --key-type rsa:2048 --label␣
,→example.net-zsk --pin <PIN>

Remember that each key should have unique label and we are going to use that label to reference the private key.

Convert the RSA keys stored in the HSM into a format that BIND 9 understands. The dnssec-keyfromlabel tool
from BIND 9 can link the raw keys stored in the HSM with the K<zone>+<alg>+<id> files.
The algorithm (RSASHA256) must be provided. The key is referenced with the PKCS#11 URI scheme and it can contain
the PKCS#11 token label (we asume that it has been initialized as bind9), and the PKCS#11 object label (called label when
generating the keys using pkcs11-tool) and the HSM PIN. Refer to RFC 7512 for the full PKCS#11 URI specification.
Convert the KSK:
dnssec-keyfromlabel -a RSASHA256 -l "pkcs11:token=bind9;object=example.net-ksk;pin,→value=0000" -f KSK example.net

and ZSK:
dnssec-keyfromlabel -a RSASHA256 -l "pkcs11:token=bind9;object=example.net-zsk;pin,→value=0000" example.net

NOTE: a PIN stored on disk can be used by specifying pin-source=<path_to>/<file>, e.g:
(umask 0700 && echo -n 0000 > /opt/bind9/etc/pin.txt)

and then use in the label specification:
pin-source=/opt/bind9/etc/pin.txt

Confirm that there is one KSK and one ZSK present in the current directory:
ls -l K*

The output should look like this (the second number will be different):
Kexample.net.+008+31729.key
Kexample.net.+008+31729.private
Kexample.net.+008+42231.key
Kexample.net.+008+42231.private

A note on generating ECDSA keys: there is a bug in libp11 when looking up a key. That function compares keys only
on their ID, not the label, so when looking up a key it returns the first key, rather than the matching key. To work around
this when creating ECDSA keys, specify a unique ID:
ksk=$(echo "example.net-ksk" | openssl sha1 -r | awk '{print $1}')
zsk=$(echo "example.net-zsk" | openssl sha1 -r | awk '{print $1}')
pkcs11-tool --module <FULL_PATH_TO_HSM_MODULE> -l -k --key-type EC:prime256v1 --id
,→$ksk --label example.net-ksk --pin <PIN>
pkcs11-tool --module <FULL_PATH_TO_HSM_MODULE> -l -k --key-type EC:prime256v1 --id
,→$zsk --label example.net-zsk --pin <PIN>

#### 5.5.6 Running named With Automatic Zone Re-signing
Once the keys are created, the zone can also be signed automatically by named without further requisites.
The logs should have lines like:
Fetching example.net/RSASHA256/31729 (KSK) from key repository.
DNSKEY example.net/RSASHA256/31729 (KSK) is now published
DNSKEY example.net/RSA256SHA256/31729 (KSK) is now active

### 5.5 PKCS#11 (Cryptoki) Support

Fetching example.net/RSASHA256/42231 (ZSK) from key repository.
DNSKEY example.net/RSASHA256/42231 (ZSK) is now published
DNSKEY example.net/RSA256SHA256/42231 (ZSK) is now active

For named to dynamically re-sign zones using HSM keys, and/or to sign new records inserted via nsupdate, named must
have access to the HSM PIN. In OpenSSL-based PKCS#11, this is accomplished by placing the PIN into the openssl.
cnf file (in the above examples, /opt/pkcs11/usr/ssl/openssl.cnf).
See OpenSSL extension-specific documentation for instructions on configuring the PIN on the global level; doing so allows
the dnssec-\* tools to access the HSM without PIN entry. (The pkcs11-\* tools access the HSM directly, not via
OpenSSL, so a PIN is still required to use them.)

SIX

ADVANCED CONFIGURATIONS

### 6.1 Dynamic Update
Dynamic update is a method for adding, replacing, or deleting records in a primary server by sending it a special form of
DNS messages. The format and meaning of these messages is specified in RFC 2136.
Dynamic update is enabled by including an allow-update or an update-policy clause in the zone statement.
If the zone’s update-policy is set to local, updates to the zone are permitted for the key local-ddns, which is
generated by named at startup. See Dynamic Update Policies for more details.
Dynamic updates using Kerberos-signed requests can be made using the TKEY/GSS protocol, either by setting the
tkey-gssapi-keytab option or by setting both the tkey-gssapi-credential and tkey-domain options. Once
enabled, Kerberos-signed requests are matched against the update policies for the zone, using the Kerberos principal as
the signer for the request.
Updating of secure zones (zones using DNSSEC) follows RFC 3007: RRSIG, NSEC, and NSEC3 records affected by
updates are automatically regenerated by the server using an online zone key. Update authorization is based on transaction
signatures and an explicit server policy.

#### 6.1.1 The Journal File
All changes made to a zone using dynamic update are stored in the zone’s journal file. This file is automatically created by
the server when the first dynamic update takes place. The name of the journal file is formed by appending the extension
.jnl to the name of the corresponding zone file unless specifically overridden. The journal file is in a binary format and
should not be edited manually.
The server also occasionally writes (“dumps”) the complete contents of the updated zone to its zone file. This is not done
immediately after each dynamic update because that would be too slow when a large zone is updated frequently. Instead,
the dump is delayed by up to 15 minutes, allowing additional updates to take place. During the dump process, transient
files are created with the extensions .jnw and .jbk; under ordinary circumstances, these are removed when the dump is
complete, and can be safely ignored.
When a server is restarted after a shutdown or crash, it replays the journal file to incorporate into the zone any updates
that took place after the last zone dump.
Changes that result from incoming incremental zone transfers are also journaled in a similar way.
The zone files of dynamic zones cannot normally be edited by hand because they are not guaranteed to contain the most
recent dynamic changes; those are only in the journal file. The only way to ensure that the zone file of a dynamic zone is
up-to-date is to run rndc stop.
To make changes to a dynamic zone manually, follow these steps: first, disable dynamic updates to the zone using rndc
freeze zone. This updates the zone file with the changes stored in its .jnl file. Then, edit the zone file. Finally, run
rndc thaw zone to reload the changed zone and re-enable dynamic updates.

rndc sync zone updates the zone file with changes from the journal file without stopping dynamic updates; this may be
useful for viewing the current zone state. To remove the .jnl file after updating the zone file, use rndc sync -clean.

### 6.2 NOTIFY
DNS NOTIFY is a mechanism that allows primary servers to notify their secondary servers of changes to a zone’s data.
In response to a NOTIFY message from a primary server, the secondary checks to see that its version of the zone is the
current version and, if not, initiates a zone transfer.
For more information about DNS NOTIFY, see the description of the notify and also-notify statements. The
NOTIFY protocol is specified in RFC 1996.
As a secondary zone can also be a primary to other secondaries, named, by default, sends NOTIFY messages for
every zone it loads.

### 6.3 Incremental Zone Transfers (IXFR)
The incremental zone transfer (IXFR) protocol is a way for secondary servers to transfer only changed data, instead of
having to transfer an entire zone. The IXFR protocol is specified in RFC 1995.
When acting as a primary server, BIND 9 supports IXFR for those zones where the necessary change history information
is available. These include primary zones maintained by dynamic update and secondary zones whose data was obtained
by IXFR. For manually maintained primary zones, and for secondary zones obtained by performing a full zone transfer
(AXFR), IXFR is supported only if the option ixfr-from-differences is set to yes.
When acting as a secondary server, BIND 9 attempts to use IXFR unless it is explicitly disabled. For more information
about disabling IXFR, see the description of the request-ixfr clause of the server statement.
When a secondary server receives a zone via AXFR, it creates a new copy of the zone database and then swaps it into place;
during the loading process, queries continue to be served from the old database with no interference. When receiving
a zone via IXFR, however, changes are applied to the running zone, which may degrade query performance during the
transfer. If a server receiving an IXFR request determines that the response size would be similar in size to an AXFR
response, it may wish to send AXFR instead. The threshold at which this determination is made can be configured using
the max-ixfr-ratio option.

### 6.4 Split DNS
Setting up different views of the DNS space to internal and external resolvers is usually referred to as a split DNS setup.
There are several reasons an organization might want to set up its DNS this way.
One common reason to use split DNS is to hide “internal” DNS information from “external” clients on the Internet.
There is some debate as to whether this is actually useful. Internal DNS information leaks out in many ways (via email
headers, for example) and most savvy “attackers” can find the information they need using other means. However, since
listing addresses of internal servers that external clients cannot possibly reach can result in connection delays and other
annoyances, an organization may choose to use split DNS to present a consistent view of itself to the outside world.
Another common reason for setting up a split DNS system is to allow internal networks that are behind filters or in RFC
1918 space (reserved IP space, as documented in RFC 1918) to resolve DNS on the Internet. Split DNS can also be used
to allow mail from outside back into the internal network.

#### 6.4.1 Example Split DNS Setup
Let’s say a company named Example, Inc. (example.com) has several corporate sites that have an internal network with
reserved Internet Protocol (IP) space and an external demilitarized zone (DMZ), or “outside” section of a network, that
is available to the public.
Example, Inc. wants its internal clients to be able to resolve external hostnames and to exchange mail with people on the
outside. The company also wants its internal resolvers to have access to certain internal-only zones that are not available
at all outside of the internal network.
To accomplish this, the company sets up two sets of name servers. One set is on the inside network (in the reserved IP
space) and the other set is on bastion hosts, which are “proxy” hosts in the DMZ that can talk to both sides of its network.
The internal servers are configured to forward all queries, except queries for site1.internal, site2.internal,
site1.example.com, and site2.example.com, to the servers in the DMZ. These internal servers have complete
sets of information for site1.example.com, site2.example.com, site1.internal, and site2.internal.
To protect the site1.internal and site2.internal domains, the internal name servers must be configured to
disallow all queries to these domains from any external hosts, including the bastion hosts.
The external servers, which are on the bastion hosts, are configured to serve the “public” version of the site1.example.
com and site2.example.com zones. This could include things such as the host records for public servers (www.
example.com and ftp.example.com) and mail exchange (MX) records (a.mx.example.com and b.mx.example.
com).
In addition, the public site1.example.com and site2.example.com zones should have special MX records that
contain wildcard (*) records pointing to the bastion hosts. This is needed because external mail servers have no other way
of determining how to deliver mail to those internal hosts. With the wildcard records, the mail is delivered to the bastion
host, which can then forward it on to internal hosts.
Here’s an example of a wildcard MX record:
*

IN MX 10 external1.example.com.

Now that they accept mail on behalf of anything in the internal network, the bastion hosts need to know how to deliver
mail to internal hosts. The resolvers on the bastion hosts need to be configured to point to the internal name servers for
DNS resolution.
Queries for internal hostnames are answered by the internal servers, and queries for external hostnames are forwarded
back out to the DNS servers on the bastion hosts.
For all of this to work properly, internal clients need to be configured to query only the internal name servers for DNS
queries. This could also be enforced via selective filtering on the network.
If everything has been set properly, Example, Inc.’s internal clients are now able to:
- Look up any hostnames in the site1.example.com and site2.example.com zones.
- Look up any hostnames in the site1.internal and site2.internal domains.
- Look up any hostnames on the Internet.
- Exchange mail with both internal and external users.
Hosts on the Internet are able to:
- Look up any hostnames in the site1.example.com and site2.example.com zones.
- Exchange mail with anyone in the site1.example.com and site2.example.com zones.
Here is an example configuration for the setup just described above. Note that this is only configuration information; for
information on how to configure the zone files, see Configurations and Zone Files.
Internal DNS server config:

### 6.4 Split DNS

acl internals { 172.16.72.0/24; 192.168.1.0/24; };
acl externals { bastion-ips-go-here; };
forward only;
// forward to external servers
forwarders {
bastion-ips-go-here;
// sample allow-transfer (no one)
allow-transfer { none; };
// restrict query access
allow-query { internals; externals; };
// restrict recursion
allow-recursion { internals; };
// sample primary zone
zone "site1.example.com" {
file "m/site1.example.com";
// do normal iterative resolution (do not forward)
allow-query { internals; externals; };
allow-transfer { internals; };
// sample secondary zone
zone "site2.example.com" {
file "s/site2.example.com";
primaries { 172.16.72.3; };
allow-query { internals; externals; };
allow-transfer { internals; };
zone "site1.internal" {
file "m/site1.internal";
allow-query { internals; };
allow-transfer { internals; }
zone "site2.internal" {
file "s/site2.internal";

primaries { 172.16.72.3; };
allow-query { internals };
allow-transfer { internals; }

External (bastion host) DNS server configuration:
acl internals { 172.16.72.0/24; 192.168.1.0/24; };
acl externals { bastion-ips-go-here; };
// sample allow-transfer (no one)
allow-transfer { none; };
// default query access
// restrict cache access
allow-query-cache { internals; externals; };
// restrict recursion
allow-recursion { internals; externals; };
// sample secondary zone
zone "site1.example.com" {
file "m/site1.foo.com";
allow-transfer { internals; externals; };
zone "site2.example.com" {
file "s/site2.foo.com";
primaries { another_bastion_host_maybe; };
allow-transfer { internals; externals; }

In the resolv.conf (or equivalent) on the bastion host(s):
search ...
nameserver 172.16.72.2
nameserver 172.16.72.3
nameserver 172.16.72.4

### 6.4 Split DNS

### 6.5 IPv6 Support in BIND 9
BIND 9 fully supports all currently defined forms of IPv6 name-to-address and address-to-name lookups. It also uses
IPv6 addresses to make queries when running on an IPv6-capable system.
For forward lookups, BIND 9 supports only AAAA records. RFC 3363 deprecated the use of A6 records, and client-side
support for A6 records was accordingly removed from BIND 9. However, authoritative BIND 9 name servers still load
zone files containing A6 records correctly, answer queries for A6 records, and accept zone transfer for a zone containing
A6 records.
For IPv6 reverse lookups, BIND 9 supports the traditional “nibble” format used in the ip6.arpa domain, as well as the
older, deprecated ip6.int domain. Older versions of BIND 9 supported the “binary label” (also known as “bitstring”)
format, but support of binary labels has been completely removed per RFC 3363. Many applications in BIND 9 do not
understand the binary label format at all anymore, and return an error if one is given. In particular, an authoritative BIND
9 name server will not load a zone file containing binary labels.

#### 6.5.1 Address Lookups Using AAAA Records
The IPv6 AAAA record is a parallel to the IPv4 A record, and, unlike the deprecated A6 record, specifies the entire IPv6
address in a single record. For example:
$ORIGIN example.com.
host
3600

2001:db8::1

Use of IPv4-in-IPv6 mapped addresses is not recommended. If a host has an IPv4 address, use an A record, not a AAAA,
with ::ffff:192.168.42.1 as the address.

#### 6.5.2 Address-to-Name Lookups Using Nibble Format
When looking up an address in nibble format, the address components are simply reversed, just as in IPv4, and ip6.
arpa. is appended to the resulting name. For example, the following commands produce a reverse name lookup for a
host with address 2001:db8::1:
$ORIGIN 0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.
1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0 14400
PTR
host.example.com. )

(

### 6.6 Dynamically Loadable Zones (DLZ)
Dynamically Loadable Zones (DLZ) are an extension to BIND 9 that allows zone data to be retrieved directly from an
external database. There is no required format or schema.
There are number of contributed DLZ modules for several different database backends, including MySQL and LDAP,
but they are not actively maintained.
The DLZ module provides data to named in text format, which is then converted to DNS wire format by named. This
conversion, and the lack of any internal caching, places significant limits on the query performance of DLZ modules.
Consequently, DLZ is not recommended for use on high-volume servers. However, it can be used in a hidden primary
configuration, with secondaries retrieving zone updates via AXFR. Note, however, that DLZ has no built-in support for
DNS notify; secondary servers are not automatically informed of changes to the zones in the database.

#### 6.6.1 Configuring DLZ
dlz

Grammar zone (primary, redirect, secondary): dlz <string>;
Grammar topmost, view:

Blocks: topmost, view, zone (primary, redirect, secondary)

Configures a Dynamically Loadable Zone (DLZ) database in named.conf .
A DLZ database is configured with a dlz statement in named.conf :
dlz example {
database "dlopen driver.so args";
search yes;

This specifies a DLZ module to search when answering queries; the module is implemented in driver.so and is loaded
at runtime by the dlopen DLZ driver. Multiple dlz statements can be specified.
search

Grammar: search <boolean>;
Blocks: dlz, view.dlz

Specifies whether a Dynamically Loadable Zone (DLZ) module is queried for an answer to a query name.
When answering a query, all DLZ modules with search set to yes are queried to see whether they contain an answer
for the query name. The best available answer is returned to the client.
The search option in the above example can be omitted, because yes is the default value.
If search is set to no, this DLZ module is not searched for the best match when a query is received. Instead, zones in
this DLZ must be separately specified in a zone statement. This allows users to configure a zone normally using standard
zone-option semantics, but specify a different database backend for storage of the zone’s data. For example, to implement
NXDOMAIN redirection using a DLZ module for backend storage of redirection rules:
dlz other {
database "dlopen driver.so args";
search no;
dlz other;

### 6.6 Dynamically Loadable Zones (DLZ)

#### 6.6.2 Sample DLZ Module
For guidance in the implementation of DLZ modules, the example directory in the [gitlab.isc.org/isc-projects/dlzmodules](https://gitlab.isc.org/isc-projects/dlz-modules/-/tree/main/example?ref_type=heads) contains a basic dynamically linkable DLZ module - i.e., one which can be loaded at runtime by the “dlopen” DLZ driver. The example sets up
a single zone, whose name is passed to the module as an argument in the dlz statement:
dlz other {
database "dlopen driver.so example.nil";

In the above example, the module is configured to create a zone “example.nil”, which can answer queries and AXFR
requests and accept DDNS updates. At runtime, prior to any updates, the zone contains an SOA, NS, and a single A
record at the apex:

3600

3600

example.nil. hostmaster.example.nil. (
123 900 600 86400 3600

10.53.0.1

The sample driver can retrieve information about the querying client and alter its response on the basis of this information.
To demonstrate this feature, the example driver responds to queries for “source-addr.``zonename``>/TXT” with the source
address of the query. Note, however, that this record will not be included in AXFR or ANY responses. Normally, this
feature is used to alter responses in some other fashion, e.g., by providing different address records for a particular name
depending on the network from which the query arrived.
Documentation of the DLZ module API can be found in [README](https://gitlab.isc.org/isc-projects/dlz-modules/
-/raw/main/example/README). This repository also contains the header file [dlz_minimal.h](https://gitlab.isc.org/
isc-projects/dlz-modules/-/raw/main/modules/include/dlz_minimal.h), which defines the API and should be included
by any dynamically linkable DLZ module.

### 6.7 Dynamic Database (DynDB)
Dynamic Database, or DynDB, is an extension to BIND 9 which, like DLZ (see Dynamically Loadable Zones (DLZ)),
allows zone data to be retrieved from an external database. Unlike DLZ, a DynDB module provides a full-featured BIND
zone database interface. Where DLZ translates DNS queries into real-time database lookups, resulting in relatively poor
query performance, and is unable to handle DNSSEC-signed data due to its limited API, a DynDB module can pre-load
an in-memory database from the external data source, providing the same performance and functionality as zones served
natively by BIND.
A DynDB module supporting LDAP has been created by Red Hat and is available from https://pagure.io/
bind-dyndb-ldap.
A sample DynDB module for testing and developer guidance is included with the BIND source code, in the directory
bin/tests/system/dyndb/driver.

#### 6.7.1 Configuring DynDB
dyndb

Grammar: dyndb <string> <quoted_string> { <unspecified-text> }; // may occur multiple

Configures a DynDB database in named.conf .
A DynDB database is configured with a dyndb statement in named.conf :
dyndb example "driver.so" {
parameters

The file driver.so is a DynDB module which implements the full DNS database API. Multiple dyndb statements
can be specified, to load different drivers or multiple instances of the same driver. Zones provided by a DynDB module
are added to the view’s zone table, and are treated as normal authoritative zones when BIND responds to queries. Zone
configuration is handled internally by the DynDB module.
The parameters are passed as an opaque string to the DynDB module’s initialization routine. Configuration syntax differs
depending on the driver.

#### 6.7.2 Sample DynDB Module
For guidance in the implementation of DynDB modules, the directory bin/tests/system/dyndb/driver contains a
basic DynDB module. The example sets up two zones, whose names are passed to the module as arguments in the dyndb
statement:
dyndb sample "sample.so" { example.nil. arpa. };

In the above example, the module is configured to create a zone, “example.nil”, which can answer queries and AXFR
requests and accept DDNS updates. At runtime, prior to any updates, the zone contains an SOA, NS, and a single A
record at the apex:

86400

86400
86400

example.nil. example.nil. (
0 28800 7200 604800 86400
127.0.0.1

When the zone is updated dynamically, the DynDB module determines whether the updated RR is an address (i.e., type
A or AAAA); if so, it automatically updates the corresponding PTR record in a reverse zone. Note that updates are not
stored permanently; all updates are lost when the server is restarted.

### 6.8 Catalog Zones
A “catalog zone” is a special DNS zone that contains a list of other zones to be served, along with their configuration
parameters. Zones listed in a catalog zone are called “member zones.” When a catalog zone is loaded or transferred to a
secondary server which supports this functionality, the secondary server creates the member zones automatically. When
the catalog zone is updated (for example, to add or delete member zones, or change their configuration parameters), those
changes are immediately put into effect. Because the catalog zone is a normal DNS zone, these configuration changes can
be propagated using the standard AXFR/IXFR zone transfer mechanism.
The format and behavior of catalog zones are specified in RFC 9432.

### 6.8 Catalog Zones

#### 6.8.1 Principle of Operation
Normally, if a zone is to be served by a secondary server, the named.conf file on the server must list the zone, or the
zone must be added using rndc addzone. In environments with a large number of secondary servers, and/or where the
zones being served are changing frequently, the overhead involved in maintaining consistent zone configuration on all the
secondary servers can be significant.
A catalog zone is a way to ease this administrative burden: it is a DNS zone that lists member zones that should be served
by secondary servers. When a secondary server receives an update to the catalog zone, it adds, removes, or reconfigures
member zones based on the data received.
To use a catalog zone, it must first be set up as a normal zone on both the primary and secondary servers that are configured
to use it. It must also be added to a catalog-zones list in the options or view statement in named.conf . This is
comparable to the way a policy zone is configured as a normal zone and also listed in a response-policy statement.
To use the catalog zone feature to serve a new member zone:
- Set up the member zone to be served on the primary as normal. This can be done by editing named.conf or by
running rndc addzone.
- Add an entry to the catalog zone for the new member zone. This can be done by editing the catalog zone’s zone file
and running rndc reload, or by updating the zone using nsupdate.
The change to the catalog zone is propagated from the primary to all secondaries using the normal AXFR/IXFR mechanism. When the secondary receives the update to the catalog zone, it detects the entry for the new member zone, creates
an instance of that zone on the secondary server, and points that instance to the primaries specified in the catalog zone
data. The newly created member zone is a normal secondary zone, so BIND immediately initiates a transfer of zone
contents from the primary. Once complete, the secondary starts serving the member zone.
Removing a member zone from a secondary server requires only deleting the member zone’s entry in the catalog zone;
the change to the catalog zone is propagated to the secondary server using the normal AXFR/IXFR transfer mechanism.
The secondary server, on processing the update, notices that the member zone has been removed, stops serving the zone,
and removes it from its list of configured zones. However, removing the member zone from the primary server must be
done by editing the configuration file or running rndc delzone.

#### 6.8.2 Configuring Catalog Zones
catalog-zones

Grammar: catalog-zones { zone <string> [ default-primaries [ port <integer> ] [
source ( <ipv4_address> | * ) ] [ source-v6 ( <ipv6_address> | * ) ] { ( <server-list>
| <ipv4_address> [ port <integer> ] | <ipv6_address> [ port <integer> ] ) [ key
<string> ] [ tls <string> ]; ... } ] [ zone-directory <quoted_string> ] [ in-memory
<boolean> ] [ min-update-interval <duration> ]; ... };

Configures catalog zones in named.conf .
Catalog zones are configured with a catalog-zones statement in the options or view section of named.conf . For
example:
catalog-zones {
zone "catalog.example"
default-primaries { 10.53.0.1; }
in-memory no

zone-directory "catzones"
min-update-interval 10;

This statement specifies that the zone catalog.example is a catalog zone. This zone must be properly configured in
the same view. In most configurations, it would be a secondary zone.
The options following the zone name are not required, and may be specified in any order.
default-masters
Synonym for default-primaries.
default-primaries

This option defines the default primaries for member zones listed in a catalog zone, and can be overridden by options
within a catalog zone. If no such options are included, then member zones transfer their contents from the servers
listed in this option.
in-memory

This option, if set to yes, causes member zones to be stored only in memory. This is functionally equivalent to
configuring a secondary zone without a file option. The default is no; member zones’ content is stored locally in
a file whose name is automatically generated from the view name, catalog zone name, and member zone name.
zone-directory

This option causes local copies of member zones’ zone files to be stored in the specified directory, if in-memory
is not set to yes. The default is to store zone files in the server’s working directory. A non-absolute pathname in
zone-directory is assumed to be relative to the working directory.
min-update-interval

This option sets the minimum interval between updates to catalog zones, in seconds. If an update to a catalog zone
(for example, via IXFR) happens less than min-update-interval seconds after the most recent update, the
changes are not carried out until this interval has elapsed. The default is 5 seconds.
Catalog zones are defined on a per-view basis. Configuring a non-empty catalog-zones statement in a view automatically turns on allow-new-zones for that view. This means that rndc addzone and rndc delzone also work in any
view that supports catalog zones.

#### 6.8.3 Catalog Zone Format
A catalog zone is a regular DNS zone; therefore, it must have a single SOA and at least one NS record.
A record stating the version of the catalog zone format is also required. If the version number listed is not supported by
the server, then a catalog zone may not be used by that server.
catalog.example.
IN SOA . . 2016022901 900 600 86400 1
catalog.example.
IN NS invalid.
version.catalog.example.
IN TXT "2"

Note that this record must have the domain name version.catalog-zone-name. The data stored in a catalog zone is
indicated by the domain name label immediately before the catalog zone domain. Currently BIND supports catalog zone
schema versions “1” and “2”.
Also note that the catalog zone must have an NS record in order to be a valid DNS zone, and using the value “invalid.”
for NS is recommended.
A member zone is added by including a PTR resource record in the zones sub-domain of the catalog zone. The record
label can be any unique label. The target of the PTR record is the member zone name. For example, to add member
zones domain.example and domain2.example:

### 6.8 Catalog Zones

5960775ba382e7a4e09263fc06e7c00569b6a05c.zones.catalog.example. IN PTR domain.example.
uniquelabel.zones.catalog.example. IN PTR domain2.example.

The label is necessary to identify custom properties (see below) for a specific member zone. Also, the zone state can be
reset by changing its label, in which case BIND will remove the member zone and add it back.

#### 6.8.4 Catalog Zone Custom Properties
BIND uses catalog zones custom properties to define different properties which can be set either globally for the whole
catalog zone or for a single member zone. Global custom properties override the settings in the configuration file, and
member zone custom properties override global custom properties.
For the version “1” of the schema custom properties must be placed without a special suffix.
For the version “2” of the schema custom properties must be placed under the “.ext” suffix.
Global custom properties are set at the apex of the catalog zone, e.g.:
primaries.ext.catalog.example.

IN AAAA 2001:db8::1

BIND currently supports the following custom properties:
- A simple primaries definition:
primaries.ext.catalog.example.

IN A 192.0.2.1

This custom property defines a primary server for the member zones, which can be either an A or AAAA record.
If multiple primaries are set, the order in which they are used is random.
Note: masters can be used as a synonym for primaries.
- A primaries with a TSIG key defined:
label.primaries.ext.catalog.example.
label.primaries.ext.catalog.example.

IN A 192.0.2.2
IN TXT "tsig_key_name"

This custom property defines a primary server for the member zone with a TSIG key set. The TSIG key must be
configured in the configuration file. label can be any valid DNS label.
Note: masters can be used as a synonym for primaries.
- allow-query and allow-transfer ACLs:
allow-query.ext.catalog.example.
IN APL 1:10.0.0.1/24
allow-transfer.ext.catalog.example.
IN APL !1:10.0.0.1/32 1:10.0.0.0/24

These custom properties are the equivalents of allow-query and allow-transfer options in a zone declaration
in the named.conf configuration file. The ACL is processed in order; if there is no match to any rule, the default
policy is to deny access. For the syntax of the APL RR, see RFC 3123.
The member zone-specific custom properties are defined the same way as global custom properties, but in the member
zone subdomain:
primaries.ext.5960775ba382e7a4e09263fc06e7c00569b6a05c.zones.catalog.example. IN A␣
,→192.0.2.2
label.primaries.ext.5960775ba382e7a4e09263fc06e7c00569b6a05c.zones.catalog.example.␣
,→IN AAAA 2001:db8::2
label.primaries.ext.5960775ba382e7a4e09263fc06e7c00569b6a05c.zones.catalog.example.␣

IN TXT "tsig_key_name"
allow-query.ext.5960775ba382e7a4e09263fc06e7c00569b6a05c.zones.catalog.example. IN␣
,→APL 1:10.0.0.0/24
primaries.ext.uniquelabel.zones.catalog.example. IN A 192.0.2.3

Custom properties defined for a specific zone override the global custom properties defined in the catalog zone. These in
turn override the global options defined in the catalog-zones statement in the configuration file.
Note that none of the global records for a custom property are inherited if any records are defined for that custom property
for the specific zone. For example, if the zone had a primaries record of type A but not AAAA, it would not inherit
the type AAAA record from the global custom property or from the global option in the configuration file.

#### 6.8.5 Change of Ownership (coo)
BIND supports the catalog zones “Change of Ownership” (coo) property. When the same entry which exists in one catalog
zone is added into another catalog zone, the default behavior for BIND is to ignore it, and continue serving the zone using
the catalog zone where it was originally existed, unless it is removed from there, then it can be added into the new one.
Using the coo property it is possible to gracefully move a zone from one catalog zone into another, by letting the catalog
consumers know that it is permitted to do so. To do that, the original catalog zone should be updated with a new record
with coo custom property:
uniquelabel.zones.catalog.example. IN PTR domain2.example.
coo.uniquelabel.zones.catalog.example. IN PTR catalog2.example.

Here, the catalog.example catalog zone gives permission for the member zone with label “uniquelabel” to be transferred into catalog2.example catalog zone. Catalog consumers which support the coo property will then take note,
and when the zone is finally added into catalog2.example catalog zone, catalog consumers will change the ownership
of the zone from catalog.example to catalog2.example. BIND’s implementation simply deletes the zone from
the old catalog zone and adds it back into the new catalog zone, which also means that all associated state for the just
migrated zone will be reset, including when the unique label is the same.
The record with coo custom property can be later deleted by the catalog zone operator after confirming that all the
consumers have received it and have successfully changed the ownership of the zone.

### 6.9 DNS Firewalls and Response Policy Zones
A DNS firewall examines DNS traffic and allows some responses to pass through while blocking others. This examination
can be based on several criteria, including the name requested, the data (such as an IP address) associated with that name,
or the name or IP address of the name server that is authoritative for the requested name. Based on these criteria, a DNS
firewall can be configured to discard, modify, or replace the original response, allowing administrators more control over
what systems can access or be accessed from their networks.
DNS Response Policy Zones (RPZ) are a form of DNS firewall in which the firewall rules are expressed within the DNS
itself - encoded in an open, vendor-neutral format as records in specially constructed DNS zones.
Using DNS zones to configure policy allows policy to be shared from one server to another using the standard DNS zone
transfer mechanism. This allows a DNS operator to maintain their own firewall policies and share them easily amongst
their internal name servers, or to subscribe to external firewall policies such as commercial or cooperative “threat feeds,”
or both.
named can subscribe to up to 64 Response Policy Zones, each of which encodes a separate policy rule set. Each rule is

stored in a DNS resource record set (RRset) within the RPZ, and consists of a trigger and an action. There are five types
of triggers and six types of actions.
A response policy rule in a DNS RPZ can be triggered as follows:

- by the IP address of the client
- by the query name
- by an address which would be present in a truthful response
- by the name or address of an authoritative name server responsible for publishing the original response
A response policy action can be one of the following:
- to synthesize a “domain does not exist” (NXDOMAIN) response
- to synthesize a “name exists but there are no records of the requested type” (NODATA) response
- to drop the response
- to switch to TCP by sending a truncated UDP response that requires the DNS client to try again with TCP
- to replace/override the response’s data with specific data (provided within the response policy zone)
- to exempt the response from further policy processing
The most common use of a DNS firewall is to “poison” a domain name, IP address, name server name, or name server
IP address. Poisoning is usually done by forcing a synthetic “domain does not exist” (NXDOMAIN) response. This
means that if an administrator maintains a list of known “phishing” domains, these names can be made unreachable by
customers or end users just by adding a firewall policy into the recursive DNS server, with a trigger for each known
“phishing” domain, and an action in every case forcing a synthetic NXDOMAIN response. It is also possible to use a
data-replacement action such as answering for these known “phishing” domains with the name of a local web server that
can display a warning page. Such a web server would be called a “walled garden.”
Authoritative name servers can be responsible for many different domains. If DNS RPZ is used to poison all domains
served by some authoritative name server name or address, the effects can be quite far-reaching. Users are advised to
ensure that such authoritative name servers do not also serve domains that should not be poisoned.

#### 6.9.1 Why Use a DNS Firewall?
Criminal and network abuse traffic on the Internet often uses the Domain Name System (DNS), so protection against
these threats should include DNS firewalling. A DNS firewall can selectively intercept DNS queries for known network
assets including domain names, IP addresses, and name servers. Interception can mean rewriting a DNS response to direct
a web browser to a “walled garden,” or simply making any malicious network assets invisible and unreachable.

#### 6.9.2 What Can a DNS Firewall Do?
Firewalls work by applying a set of rules to a traffic flow, where each rule consists of a trigger and an action. Triggers
determine which messages within the traffic flow are handled specially, and actions determine what that special handling
is. For a DNS firewall, the traffic flow to be controlled consists of responses sent by a recursive DNS server to its end-user
clients. Some true responses are not safe for all clients, so the policy rules in a DNS firewall allow some responses to be
intercepted and replaced with safer content.

#### 6.9.3 Creating and Maintaining RPZ Rule Sets
In DNS RPZ, the DNS firewall policy rule set is stored in a DNS zone, which is maintained and synchronized using the
same tools and methods as for any other DNS zone. The primary name server for a DNS RPZ may be an internal server,
if an administrator is creating and maintaining their own DNS policy zone, or it may be an external name server (such as
a security vendor’s server), if importing a policy zone published externally. The primary copy of the DNS firewall policy
can be a DNS “zone file” which is either edited by hand or generated from a database. A DNS zone can also be edited
indirectly using DNS dynamic updates (for example, using the “nsupdate” shell level utility).

DNS RPZ allows firewall rules to be expressed in a DNS zone format and then carried to subscribers as DNS data. A
recursive DNS server which is capable of processing DNS RPZ synchronizes these DNS firewall rules using the same
standard DNS tools and protocols used for secondary name service. The DNS policy information is then promoted to the
DNS control plane inside the customer’s DNS resolver, making that server into a DNS firewall.
A security company whose products include threat intelligence feeds can use a DNS Response Policy Zone (RPZ) as a
delivery channel to customers. Threats can be expressed as known-malicious IP addresses and subnets, known-malicious
domain names, and known-malicious domain name servers. By feeding this threat information directly into customers’
local DNS resolvers, providers can transform these DNS servers into a distributed DNS firewall.
When a customer’s DNS resolver is connected by a realtime subscription to a threat intelligence feed, the provider can
protect the customer’s end users from malicious network elements (including IP addresses and subnets, domain names,
and name servers) immediately as they are discovered. While it may take days or weeks to “take down” criminal and
abusive infrastructure once reported, a distributed DNS firewall can respond instantly.
Other distributed TCP/IP firewalls have been on the market for many years, and enterprise users are now comfortable
importing real-time threat intelligence from their security vendors directly into their firewalls. This intelligence can take
the form of known-malicious IP addresses or subnets, or of patterns which identify known-malicious email attachments,
file downloads, or web addresses (URLs). In some products it is also possible to block DNS packets based on the names
or addresses they carry.

#### 6.9.4 Limitations of DNS RPZ
We’re often asked if DNS RPZ could be used to set up redirection to a CDN. For example, if “mydomain.com” is a normal
domain with SOA, NS, MX, TXT records etc., then if someone sends an A or AAAA query for “mydomain.com”, can
we use DNS RPZ on an authoritative nameserver to return “CNAME mydomain.com.my-cdn-provider.net”?
The problem with this suggestion is that there is no way to CNAME only A and AAAA queries, not even with RPZ.
The underlying reason is that if the authoritative server answers with a CNAME, the recursive server making that query
will cache the response. Thereafter (while the CNAME is still in cache), it assumes that there are no records of any
non-CNAME type for the name that was being queried, and directs subsequent queries for all other types directly to the
target name of the CNAME record.
To be clear, this is not a limitation of RPZ; it is a function of the way the DNS protocol works. It’s simply not possible
to use “partial” CNAMES to help when setting up CDNs because doing this will break other functionality such as email
routing.
Similarly, following the DNS protocol definition, wildcards in the form of *.example records might behave in unintuitive
ways. For a detailed definition of wildcards in DNS, please see RFC 4592, especially section 2.

#### 6.9.5 DNS Firewall Usage Examples
Here are some scenarios in which a DNS firewall might be useful.
Some known threats are based on an IP address or subnet (IP address range). For example, an analysis may show that all
addresses in a “class C” network are used by a criminal gang for “phishing” web servers. With a DNS firewall based on
DNS RPZ, a firewall policy can be created such as “if a DNS lookup would result in an address from this class C network,
then answer instead with an NXDOMAIN indication.” That simple rule would prevent any end users inside customers’
networks from being able to look up any domain name used in this phishing attack – without having to know in advance
what those names might be.
Other known threats are based on domain names. An analysis may determine that a certain domain name or set of domain
names is being or will shortly be used for spamming, phishing, or other Internet-based attacks which all require working
domain names. By adding name-triggered rules to a distributed DNS firewall, providers can protect customers’ end users
from any attacks which require them to be able to look up any of these malicious names. The names can be wildcards
(for example, *.evil.com), and these wildcards can have exceptions if some domains are not as malicious as others (if
*.evil.com is bad, then not.evil.com might be an exception).

Alongside growth in electronic crime has come growth of electronic criminal expertise. Many criminal gangs now maintain their own extensive DNS infrastructure to support a large number of domain names and a diverse set of IP addressing
resources. Analyses show in many cases that the only truly fixed assets criminal organizations have are their name servers,
which are by nature slightly less mobile than other network assets. In such cases, DNS administrators can anchor their
DNS firewall policies in the abusive name server names or name server addresses, and thus protect their customers’ end
users from threats where neither the domain name nor the IP address of that threat is known in advance.
Electronic criminals rely on the full resiliency of DNS just as the rest of digital society does. By targeting criminal assets
at the DNS level we can deny these criminals the resilience they need. A distributed DNS firewall can leverage the high
skills of a security company to protect a large number of end users. DNS RPZ, as the first open and vendor-neutral
distributed DNS firewall, can be an effective way to deliver threat intelligence to customers.
A Real-World Example of DNS RPZ’s Value
The Conficker malware worm (https://en.wikipedia.org/wiki/Conficker) was first detected in 2008. Although it is no
longer an active threat, the techniques described here can be applied to other DNS threats.
Conficker used a domain generation algorithm (DGA) to choose up to 50,000 command and control domains per day.
It would be impractical to create an RPZ that contains so many domain names and changes so much on a daily basis.
Instead, we can trigger RPZ rules based on the names of the name servers that are authoritative for the command and
control domains, rather than trying to trigger on each of 50,000 different (daily) query names. Since the well-known name
server names for Conficker’s domain names are never used by nonmalicious domains, it is safe to poison all lookups that
rely on these name servers. Here is an example that achieves this result:
ns.0xc0f1c3a5.com.rpz-nsdname
ns.0xc0f1c3a5.net.rpz-nsdname
ns.0xc0f1c3a5.org.rpz-nsdname

*.walled-garden.example.com.
*.walled-garden.example.com.
*.walled-garden.example.com.

The * at the beginning of these CNAME target names is special, and it causes the original query name to be prepended
to the CNAME target. So if a user tries to visit the Conficker command and control domain racaldftn.com.ai (which was
a valid Conficker command and control domain name on 19-October-2011), the RPZ-configured recursive name server
will send back this answer:
racaldftn.com.ai.
racaldftn.com.ai.walled-garden.example.com.
racaldftn.com.ai.walled-garden.example.com.
192.168.50.3

This example presumes that the following DNS content has also been created, which is not part of the RPZ zone itself
but is in another domain:
$ORIGIN walled-garden.example.com.
*
192.168.50.3

Assuming that we’re running a web server listening on 192.168.50.3 that always displays a warning message no matter
what uniform resource identifier (URI) is used, the above RPZ configuration will instruct the web browser of any infected
end user to connect to a “server name” consisting of their original lookup name (racaldftn.com.ai) prepended to the walled
garden domain name (walled-garden.example.com). This is the name that will appear in the web server’s log file, and
having the full name in that log file will facilitate an analysis as to which users are infected with what virus.

#### 6.9.6 Keeping Firewall Policies Updated
It is vital for overall system performance that incremental zone transfers (see RFC 1995) and real-time change notification
(see RFC 1996) be used to synchronize DNS firewall rule sets between the publisher’s primary copy of the rule set and
the subscribers’ working copies of the rule set.
If DNS dynamic updates are used to maintain a DNS RPZ rule set, the name server automatically calculates a stream
of deltas for use when sending incremental zone transfers to the subscribing name servers. Sending a stream of deltas –

known as an “incremental zone transfer” or IXFR – is usually much faster than sending the full zone every time it changes,
so it’s worth the effort to use an editing method that makes such incremental transfers possible.
Administrators who edit or periodically regenerate a DNS RPZ rule set and whose primary name server uses BIND
can enable the ixfr-from-differences option, which tells the primary name server to calculate the differences between each new zone and the preceding version, and to make these differences available as a stream of deltas for use in
incremental zone transfers to the subscribing name servers. This will look something like the following:
ixfr-from-differences yes;

As mentioned above, the simplest and most common use of a DNS firewall is to poison domain names known to be purely
malicious, by simply making them disappear. All DNS RPZ rules are expressed as resource record sets (RRsets), and
the way to express a “force a name-does-not-exist condition” is by adding a CNAME pointing to the root domain (.). In
practice this looks like:
malicious1.org
*.malicious1.org
malicious2.org
*.malicious2.org

Two things are noteworthy in this example. First, the malicious names are made relative within the response policy zone.
Since there is no trailing dot following “.org” in the above example, the actual RRsets created within this response policy
zone are, after expansion:
malicious1.org.rpz.example.com.
*.malicious1.org.rpz.example.com.
malicious2.org.rpz.example.com.
*.malicious2.org.rpz.example.com.

Second, for each name being poisoned, a wildcard name is also listed. This is because a malicious domain name probably
has or may potentially have malicious subdomains.
In the above example, the relative domain names malicious1.org and malicious2.org will match only the real domain names
malicious1.org and malicious2.org, respectively. The relative domain names *.malicious1.org and *.malicious2.org will
match any subdomain.of.malicious1.org or subdomain.of.malicious2.org, respectively.
This example forces an NXDOMAIN condition as its policy action, but other policy actions are also possible.

#### 6.9.7 Performance and Scalability When Using Multiple RPZs
Since version 9.10, BIND can be configured to have different response policies depending on the identity of the querying
client and the nature of the query. To configure BIND response policy, the information is placed into a zone file whose
only purpose is conveying the policy information to BIND. A zone file containing response policy information is called a
Response Policy Zone, or RPZ, and the mechanism in BIND that uses the information in those zones is called DNS RPZ.
It is possible to use as many as 64 separate RPZ files in a single instance of BIND, and BIND is not significantly slowed
by such heavy use of RPZ.
(Note: by default, BIND 9.11 only supports up to 32 RPZ files, but this can be increased to 64 at compile time. All other
supported versions of BIND support 64 by default.)
Each one of the policy zone files can specify policy for as many different domains as necessary. The limit of 64 is on the
number of independently-specified policy collections and not the number of zones for which they specify policy.

Policy information from all of the policy zones together are stored in a special data structure allowing simultaneous
lookups across all policy zones to be performed very rapidly. Looking up a policy rule is proportional to the logarithm of
the number of rules in the largest single policy zone.

#### 6.9.8 Practical Tips for DNS Firewalls and DNS RPZ
Administrators who subscribe to an externally published DNS policy zone and who have a large number of internal
recursive name servers should create an internal name server called a “distribution master” (DM). The DM is a secondary
(stealth secondary) name server from the publisher’s point of view; that is, the DM is fetching zone content from the
external server. The DM is also a primary name server from the internal recursive name servers’ point of view: they fetch
zone content from the DM. In this configuration the DM is acting as a gateway between the external publisher and the
internal subscribers.
The primary server must know the unicast listener address of every subscribing recursive server, and must enumerate all
of these addresses as destinations for real time zone change notification (as described in RFC 1996). So if an enterprisewide RPZ is called “rpz.example.com” and if the unicast listener addresses of four of the subscribing recursive name
servers are 192.0.200.1, 192.0.201.1, 192.0.202.1, and 192.0.203.1, the primary server’s configuration looks like this:
zone "rpz.example.com" {
file "primary/rpz.example.com";
notify explicit;
also-notify { 192.0.200.1;
192.0.201.1;
192.0.202.1;
192.0.203.1; };
allow-transfer { 192.0.200.1;
192.0.201.1;
192.0.202.1;
192.0.203.1; };
allow-query { localhost; };

Each recursive DNS server that subscribes to the policy zone must be configured as a secondary server for the zone, and
must also be configured to use the policy zone for local response policy. To subscribe a recursive name server to a response
policy zone where the unicast listener address of the primary server is 192.0.220.2, the server’s configuration should look
like this:
response-policy {
zone "rpz.example.com";
zone "rpz.example.com";
primaries { 192.0.222.2; };
file "secondary/rpz.example.com";
allow-query { localhost; };
allow-transfer { none; };

Note that queries are restricted to “localhost,” since query access is never used by DNS RPZ itself, but may be useful to

DNS operators for use in debugging. Transfers should be disallowed to prevent policy information leaks.
If an organization’s business continuity depends on full connectivity with another company whose ISP also serves some
criminal or abusive customers, it’s possible that one or more external RPZ providers – that is, security feed vendors –
may eventually add some RPZ rules that could hurt a company’s connectivity to its business partner. Users can protect
themselves from this risk by using an internal RPZ in addition to any external RPZs, and by putting into their internal RPZ
some “pass-through” rules to prevent any policy action from affecting a DNS response that involves a business partner.
A recursive DNS server can be connected to more than one RPZ, and these are searched in order. Therefore, to protect a
network from dangerous policies which may someday appear in external RPZ zones, administrators should list the internal
RPZ zones first.
response-policy {
zone "rpz.example.com";
zone "rpz.security-vendor-1.com";
zone "rpz.security-vendor-2.com";

Within an internal RPZ, there need to be rules describing the network assets of business partners whose communications
need to be protected. Although it is not generally possible to know what domain names they use, administrators will be
aware of what address space they have and perhaps what name server names they use.
8.0.0.0.10.rpz-ip
16.0.0.45.128.rpz-nsip
ns.partner1.com.rpz-nsdname
ns.partner2.com.rpz-nsdname

Here, we know that answers in address block 10.0.0.0/8 indicate a business partner, as well as answers involving any
name server whose address is in the 128.45.0.0/16 address block, and answers involving the name servers whose names
are ns.partner1.com or ns.partner2.com.
The above example demonstrates that when matching by answer IP address (the .rpz-ip owner), or by name server IP
address (the .rpz-nsip owner) or by name server domain name (the .rpz-nsdname owner), the special RPZ marker (.rpzip, .rpz-nsip, or .rpz-nsdname) does not appear as part of the CNAME target name.
By triggering these rules using the known network assets of a partner, and using the “pass-through” policy action, no later
RPZ processing (which in the above example refers to the “rpz.security-vendor-1.com” and “rpz.security-vendor-2.com”
policy zones) will have any effect on DNS responses for partner assets.

#### 6.9.9 Creating a Simple Walled Garden Triggered by IP Address
It may be the case that the only thing known about an attacker is the IP address block they are using for their “phishing” web
servers. If the domain names and name servers they use are unknown, but it is known that every one of their “phishing”
web servers is within a small block of IP addresses, a response can be triggered on all answers that would include records
in this address range, using RPZ rules that look like the following example:
22.0.212.94.109.rpz-ip
*.212.94.109.in-addr.arpa
*.213.94.109.in-addr.arpa

drop.garden.example.com.

*.214.94.109.in-addr.arpa
*.215.94.109.in-addr.arpa

Here, if a truthful answer would include an A (address) RR (resource record) whose value were within the 109.94.212.0/22
address block, then a synthetic answer is sent instead of the truthful answer. Assuming the query is for www.malicious.net,
the synthetic answer is:
www.malicious.net.
drop.garden.example.com.

drop.garden.example.com.
192.168.7.89

This assumes that drop.garden.example.com has been created as real DNS content, outside of the RPZ:
$ORIGIN example.com.
drop.garden

192.168.7.89

In this example, there is no “*” in the CNAME target name, so the original query name will not be present in the walled
garden web server’s log file. This is an undesirable loss of information, and is shown here for example purposes only.
The above example RPZ rules would also affect address-to-name (also known as “reverse DNS”) lookups for the unwanted
addresses. If a mail or web server receives a connection from an address in the example’s 109.94.212.0/22 address block,
it will perform a PTR record lookup to find the domain name associated with that IP address.
This kind of address-to-name translation is usually used for diagnostic or logging purposes, but it is also common for
email servers to reject any email from IP addresses which have no address-to-name translation. Most mail from such IP
addresses is spam, so the lack of a PTR record here has some predictive value. By using the “force name-does-not-exist”
policy trigger on all lookups in the PTR name space associated with an address block, DNS administrators can give their
servers a hint that these IP addresses are probably sending junk.

#### 6.9.10 A Known Inconsistency in DNS RPZ’s NSDNAME and NSIP Rules
Response Policy Zones define several possible triggers for each rule, and among these two are known to produce inconsistent results. This is not a bug; rather, it relates to inconsistencies in the DNS delegation model.
DNS Delegation
In DNS authority data, an NS RRset that is not at the apex of a DNS zone creates a sub-zone. That sub-zone’s data is
separate from the current (or “parent”) zone, and it can have different authoritative name servers than the current zone.
In this way, the root zone leads to COM, NET, ORG, and so on, each of which have their own name servers and their
own way of managing their authoritative data. Similarly, ORG has delegations to ISC.ORG and to millions of other
“dot-ORG” zones, each of which can have its own set of authoritative name servers. In the parlance of the protocol, these
NS RRsets below the apex of a zone are called “delegation points.” An NS RRset at a delegation point contains a list of
authoritative servers to which the parent zone is delegating authority for all names at or below the delegation point.
At the apex of every zone there is also an NS RRset. Ideally, this so-called “apex NS RRset” should be identical to the
“delegation point NS RRset” in the parent zone, but this ideal is not always achieved. In the real DNS, it’s almost always
easier for a zone administrator to update one of these NS RRsets than the other, so that one will be correct and the other
out of date. This inconsistency is so common that it’s been necessarily rendered harmless: domains that are inconsistent
in this way are less reliable and perhaps slower, but they still function as long as there is some overlap between each of the
NS RRsets and the truth. (“Truth” in this case refers to the actual set of name servers that are authoritative for the zone.)

A Quick Review of DNS Iteration
In DNS recursive name servers, an incoming query that cannot be answered from the local cache is sent to the closest
known delegation point for the query name. For example, if a server is looking up XYZZY.ISC.ORG and it the name
servers for ISC.ORG, then it sends the query to those servers directly; however, if it has never heard of ISC.ORG before,
it must first send the query to the name servers for ORG (or perhaps even to the root zone that is the parent of ORG).
When it asks one of the parent name servers, that server will not have an answer, so it sends a “referral” consisting only
of the “delegation point NS RRset.” Once the server receives this referral, it “iterates” by sending the same query again,
but this time to name servers for a more specific part of the query name. Eventually this iteration terminates, usually by
getting an answer or a “name error” (NXDOMAIN) from the query name’s authoritative server, or by encountering some
type of server failure.
When an authoritative server for the query name sends an answer, it has the option of including a copy of the zone’s apex
NS RRset. If this occurs, the recursive name server caches this NS RRset, replacing the delegation point NS RRset that it
had received during the iteration process. In the parlance of the DNS, the delegation point NS RRset is “glue,” meaning
non-authoritative data, or more of a hint than a real truth. On the other hand, the apex NS RRset is authoritative data,
coming as it does from the zone itself, and it is considered more credible than the “glue.” For this reason, it’s a little bit
more important that the apex NS RRset be correct than that the delegation point NS RRset be correct, since the former
will quickly replace the latter, and will be used more often for a longer total period of time.
Importantly, the authoritative name server need not include its apex NS RRset in any answers, and recursive name servers
do not ordinarily query directly for this RRset. Therefore it is possible for the apex NS RRset to be completely wrong
without any operational ill-effects, since the wrong data need not be exposed. Of course, if a query comes in for this NS
RRset, most recursive name servers will forward the query to the zone’s authority servers, since it’s bad form to return
“glue” data when asked a specific question. In these corner cases, bad apex NS RRset data can cause a zone to become
unreachable unpredictably, according to what other queries the recursive name server has processed.
There is another kind of “glue,” for name servers whose names are below delegation points. If ORG delegates ISC.ORG
to NS-EXT.ISC.ORG, the ORG server needs to know an address for NS-EXT.ISC.ORG and return this address as
part of the delegation response. However, the name-to-address binding for this name server is only authoritative inside
the ISC.ORG zone; therefore, the A or AAAA RRset given out with the delegation is non-authoritative “glue,” which is
replaced by an authoritative RRset if one is seen. As with apex NS RRsets, the real A or AAAA RRset is not automatically
queried for by the recursive name server, but is queried for if an incoming query asks for this RRset.
Enter RPZ
RPZ has two trigger types that are intended to allow policy zone authors to target entire groups of domains based on
those domains all being served by the same DNS servers: NSDNAME and NSIP. The NSDNAME and NSIP rules are
matched against the name and IP address (respectively) of the nameservers of the zone the answer is in, and all of its
parent zones. In its default configuration, BIND actively fetches any missing NS RRsets and address records. If, in the
process of attempting to resolve the names of all of these delegated server names, BIND receives a SERVFAIL response
for any of the queries, then it aborts the policy rule evaluation and returns SERVFAIL for the query. This is technically
neither a match nor a non-match of the rule.
Every “.” in a fully qualified domain name (FQDN) represents a potential delegation point. When BIND goes searching
for parent zone NS RRsets (and, in the case of NSIP, their accompanying address records), it has to check every possible
delegation point. This can become a problem for some specialized pseudo-domains, such as some domain name and
network reputation systems, that have many “.” characters in the names. It is further complicated if that system also
has non-compliant DNS servers that silently drop queries for NS and SOA records. This forces BIND to wait for those
queries to time out before it can finish evaluating the policy rule, even if this takes longer than a reasonable client typically
waits for an answer (delays of over 60 seconds have been observed).
While both of these cases do involve configurations and/or servers that are technically “broken,” they may still “work”
outside of RPZ NSIP and NSDNAME rules because of redundancy and iteration optimizations.
There are two RPZ options, nsip-wait-recurse and nsdname-wait-recurse, that alter BIND’s behavior by allowing it to use only those records that already exist in the cache when evaluating NSIP and NSDNAME rules, respectively.

Therefore NSDNAME and NSIP rules are unreliable. The rules may be matched against either the apex NS RRset or the
“glue” NS RRset, each with their associated addresses (that also might or might not be “glue”). It’s in the administrator’s
interests to discover both the delegation name server names and addresses, and the apex name server names and authoritative address records, to ensure correct use of NS and NSIP triggers in RPZ. Even then, there may be collateral damage
to completely unrelated domains that otherwise “work,” just by having NSIP and NSDNAME rules.

#### 6.9.11 Example: Using RPZ to Disable Mozilla DoH-by-Default
Mozilla announced in September 2019 that they would enable DNS-over-HTTPS (DoH) for all US-based users of the
Firefox browser, sending all their DNS queries to predefined DoH providers (Cloudflare’s 1.1.1.1 service in particular).
This is a concern for some network administrators who do not want their users’ DNS queries to be rerouted unexpectedly. However, Mozilla provides a mechanism to disable the DoH-by-default setting: if the Mozilla-owned domain
use-application-dns.net returns an NXDOMAIN response code, Firefox will not use DoH.
To accomplish this using RPZ:
1. Create a polizy zone file called mozilla.rpz.db configured so that NXDOMAIN will be returned for any query
to use-application-dns.net:
$TTL 604800
$ORIGIN
mozilla.rpz.
localhost. root.localhost. 1 604800 86400 2419200 604800
use-application-dns.net CNAME .
