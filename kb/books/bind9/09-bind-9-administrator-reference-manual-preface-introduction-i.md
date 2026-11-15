---
id: bind9-09
title: "BIND 9 Administrator Reference Manual — Preface, Introduction, Introduction, Introduction, Getting…",
slug: bind9-09-bind-9-administrator-reference-manual-preface-introduction-i
source: "BIND 9 Administrator Reference Manual",
sourceSection: "13.1 Preface, 13.2 Introduction, 13.2 Introduction, 13.2 Introduction, 13.3 Getting Started, 13.3 Getting Started, 4. Network interfaces: While your authoritative name servers will begin sending back larger responses, it is unlikely, 4. The isc.org name server responds with the DNSKEY and RRSIG reco"
track: networking-dns,
tier: premium
tags: [dns, bind9, networking, infrastructure]
summary: "One factor to consider, but over which you really have no control, is the number of users who query your domain name Covers 30 sections: Preface, Introduction, Introduction.",
---
# BIND 9 Administrator Reference Manual — Preface, Introduction, Introduction, Introduction, Getting…

## 4. Network interfaces: While your authoritative name servers will begin sending back larger responses, it is unlikely
that you need to upgrade your network interface card (NIC) on the name server unless you have some truly outdated
hardware.
One factor to consider, but over which you really have no control, is the number of users who query your domain name
who themselves have DNSSEC enabled. As of mid-2022, measurements by APNIC show 41% of Internet users send
DNSSEC-aware queries. This means that more DNS queries for your domain will take advantage of the additional security
features, which will result in increased system load and possibly network traffic.

#### 13.3.3 Network Requirements
From a network perspective, DNS and DNSSEC packets are very similar; DNSSEC packets are just bigger, which means
DNS is more likely to use TCP. You should test for the following two items to make sure your network is ready for
DNSSEC:
1. DNS over TCP: Verify network connectivity over TCP port 53, which may mean updating firewall policies or Access
Control Lists (ACL) on routers. See Wait… DNS Uses TCP? for more details.
2. Large UDP packets: Some network equipment, such as firewalls, may make assumptions about the size of DNS
UDP packets and incorrectly reject DNS traffic that appears “too big.” Verify that the responses your name server
generates are being seen by the rest of the world: see What’s EDNS All About (And Why Should I Care)? for more
details.

#### 13.3.4 Operational Requirements
Parent Zone
Before starting your DNSSEC deployment, check with your parent zone administrators to make sure they support
DNSSEC. This may or may not be the same entity as your registrar. As you will see later in Working With the Parent Zone, a crucial step in DNSSEC deployment is establishing the parent-child trust relationship. If your parent zone
does not yet support DNSSEC, contact that administrator to voice your concerns.
Security Requirements
Some organizations may be subject to stricter security requirements than others. Check to see if your organization requires
stronger cryptographic keys be generated and stored, and how often keys need to be rotated. The examples presented
in this document are not intended for high-value zones. We cover some of these security considerations in Advanced
Discussions.

### 13.4 Validation
#### 13.4.1 Easy-Start Guide for Recursive Servers
This section provides the basic information needed to set up a working DNSSEC-aware recursive server, also known as
a validating resolver. A validating resolver performs validation for each remote response received, following the chain of
trust to verify that the answers it receives are legitimate, through the use of public key cryptography and hashing functions.
Enabling DNSSEC Validation
So how do we turn on DNSSEC validation? It turns out that you may not need to reconfigure your name server at all, since
the most recent versions of BIND 9 - including packages and distributions - have shipped with DNSSEC validation enabled
by default. Before making any configuration changes, check whether you already have DNSSEC validation enabled by
following the steps described in So You Think You Are Validating (How To Test A Recursive Server).
In earlier versions of BIND, including 9.11-ESV, DNSSEC validation must be explicitly enabled. To do this, you only
need to add one line to the options section of your configuration file:

dnssec-validation auto;

Restart named or run rndc reconfig , and your recursive server is now happily validating each DNS response. If this
does not work for you, you may have some other network-related configurations that need to be adjusted. Take a look at
Network Requirements to make sure your network is ready for DNSSEC.
Effects of Enabling DNSSEC Validation
Once DNSSEC validation is enabled, any DNS response that does not pass the validation checks results in a failure to
resolve the domain name (often a SERVFAIL status seen by the client). If everything has been configured properly, this
is the correct result; it means that an end user has been protected against a malicious attack.
However, if there is a DNSSEC configuration issue (sometimes outside of the administrator’s control), a specific name or
sometimes entire domains may “disappear” from the DNS, and become unreachable through that resolver. For the end
user, the issue may manifest itself as name resolution being slow or failing altogether; some parts of a URL not loading;
or the web browser returning an error message indicating that the page cannot be displayed. For example, if root name
servers were misconfigured with the wrong information about .org, it could cause all validation for .org domains to
fail. To end users, it would appear that all .org web sites were out of service.2 Should you encounter DNSSEC-related
problems, don’t be tempted to disable validation; there is almost certainly a solution that leaves validation enabled. A
basic troubleshooting guide can be found in Basic DNSSEC Troubleshooting.

#### 13.4.2 So You Think You Are Validating (How To Test A Recursive Server)
Now that you have reconfigured your recursive server and restarted it, how do you know that your recursive name server
is actually verifying each DNS query? There are several ways to check, and we’ve listed a few of them below.
Using Web-Based Tools to Verify
For most people, the simplest way to check if a recursive name server is indeed validating DNS queries is to use one of
the many web-based tools available.
Configure your client computer to use the newly reconfigured recursive server for DNS resolution; then use one of these
web-based tests to confirm that it is in fact validating DNS responses.
- Internet.nl
- DNSSEC or Not (VeriSign)
Using dig to Verify
Web-based DNSSEC-verification tools often employ JavaScript. If you don’t trust the JavaScript magic that the webbased tools rely on, you can take matters into your own hands and use a command-line DNS tool to check your validating
resolver yourself.
While nslookup is popular, partly because it comes pre-installed on most systems, it is not DNSSEC-aware. dig , on the
other hand, fully supports the DNSSEC standard and comes as a part of BIND. If you do not have dig already installed
on your system, install it by downloading it from ISC’s website.
dig is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are
returned from the name servers that were queried. Most seasoned DNS administrators use dig to troubleshoot DNS

problems because of its flexibility, ease of use, and clarity of output.
2 Of course, something like this could happen for reasons other than DNSSEC: for example, the root publishing the wrong addresses for the .org
nameservers.

The example below shows how to use dig to query the name server 10.53.0.1 for the A record for ftp.isc.org when
DNSSEC validation is enabled (i.e. the default). The address 10.53.0.1 is only used as an example; replace it with the
actual address or host name of your recursive name server.
$ dig @10.53.0.1 ftp.isc.org. A +dnssec +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.1 ftp.isc.org a +dnssec +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48742
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 29a9705c2160b08c010000005e67a4a102b9ae079c1b24c8 (good)
;ftp.isc.org.
300 IN A 149.20.1.49
;; Query time: 452 msec
;; WHEN: Tue Mar 10 14:30:57 GMT 2020
;; MSG SIZE rcvd: 187

The important detail in this output is the presence of the ad flag in the header. This signifies that BIND has retrieved all
related DNSSEC information related to the target of the query (ftp.isc.org) and that the answer received has passed
the validation process described in How Are Answers Verified?. We can have confidence in the authenticity and integrity
of the answer, that ftp.isc.org really points to the IP address 149.20.1.49, and that it was not a spoofed answer from
a clever attacker.
Unlike earlier versions of BIND, the current versions of BIND always request DNSSEC records (by setting the do bit
in the query they make to upstream servers), regardless of DNSSEC settings. However, with validation disabled, the
returned signature is not checked. This can be seen by explicitly disabling DNSSEC validation. To do this, add the line
dnssec-validation no; to the “options” section of the configuration file, i.e.:
dnssec-validation no;

If the server is restarted (to ensure a clean cache) and the same dig command executed, the result is very similar:
$ dig @10.53.0.1 ftp.isc.org. A +dnssec +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.1 ftp.isc.org a +dnssec +multiline

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39050
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: a8dc9d1b9ec45e75010000005e67a8a69399741fdbe126f2 (good)
;ftp.isc.org.
300 IN A 149.20.1.49
;; Query time: 261 msec
;; WHEN: Tue Mar 10 14:48:06 GMT 2020
;; MSG SIZE rcvd: 187

However, this time there is no ad flag in the header. Although dig is still returning the DNSSEC-related resource records,
it is not checking them, and thus cannot vouch for the authenticity of the answer. If you do carry out this test, remember
to re-enable DNSSEC validation (by removing the dnssec-validation no; line from the configuration file) before
continuing.

#### 13.4.3 Verifying Protection From Bad Domain Names
It is also important to make sure that DNSSEC is protecting your network from domain names that fail to validate; such
failures could be caused by attacks on your system, attempting to get it to accept false DNS information. Validation could
fail for a number of reasons: maybe the answer doesn’t verify because it’s a spoofed response; maybe the signature was
a replayed network attack that has expired; or maybe the child zone has been compromised along with its keys, and the
parent zone’s information tells us that things don’t add up. There is a domain name specifically set up to fail DNSSEC
validation, www.dnssec-failed.org.
With DNSSEC validation enabled (the default), an attempt to look up that name fails:
$ dig @10.53.0.1 www.dnssec-failed.org. A
; <<>> DiG 9.16.0 <<>> @10.53.0.1 www.dnssec-failed.org. A
;; ->>HEADER<<- opcode: QUERY, status: SERVFAIL, id: 22667
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 69c3083144854587010000005e67bb57f5f90ff2688e455d (good)
;www.dnssec-failed.org.

;; Query time: 2763 msec
;; WHEN: Tue Mar 10 16:07:51 GMT 2020
;; MSG SIZE rcvd: 78

On the other hand, if DNSSEC validation is disabled (by adding the statement dnssec-validation no; to the options clause in the configuration file), the lookup succeeds:
$ dig @10.53.0.1 www.dnssec-failed.org. A
; <<>> DiG 9.16.0 <<>> @10.53.0.1 www.dnssec-failed.org. A
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54704
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 251eee58208917f9010000005e67bb6829f6dabc5ae6b7b9 (good)
;www.dnssec-failed.org.

7200
7200

68.87.109.242
69.252.193.191

;; Query time: 439 msec
;; WHEN: Tue Mar 10 16:08:08 GMT 2020
;; MSG SIZE rcvd: 110

Do not be tempted to disable DNSSEC validation just because some names are failing to resolve. Remember, DNSSEC
protects your DNS lookup from hacking. The next section describes how to quickly check whether the failure to successfully look up a name is due to a validation failure.
How Do I Know I Have a Validation Problem?
Since all DNSSEC validation failures result in a general SERVFAIL message, how do we know if it was really a validation
error? Fortunately, there is a flag in dig , (“CD” for “checking disabled”) which tells the server to disable DNSSEC
validation. If you receive a SERVFAIL message, re-run the query a second time and set the dig +cd flag. If the query
succeeds with dig +cd, but ends in SERVFAIL without it, you know you are dealing with a validation problem. So using
the previous example of www.dnssec-failed.org and with DNSSEC validation enabled in the resolver:
$ dig @10.53.0.1 www.dnssec-failed.org A +cd
; <<>> DiG 9.16.0 <<>> @10.53.0.1 www.dnssec-failed.org. A +cd
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 62313
;; flags: qr rd ra cd; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

; COOKIE: 73ca1be3a74dd2cf010000005e67c8c8e6df64b519cd87fd (good)
;www.dnssec-failed.org.

7197
7197

68.87.109.242
69.252.193.191

;; Query time: 0 msec
;; WHEN: Tue Mar 10 17:05:12 GMT 2020
;; MSG SIZE rcvd: 110

For more information on troubleshooting, please see Basic DNSSEC Troubleshooting.

#### 13.4.4 Validation Easy Start Explained
In Easy-Start Guide for Recursive Servers, we used one line of configuration to turn on DNSSEC validation: the act
of chasing down signatures and keys, making sure they are authentic. Now we are going to take a closer look at what
DNSSEC validation actually does, and some other options.
dnssec-validation auto;

This “auto” line enables automatic DNSSEC trust anchor configuration using the trust-anchors feature. In this case,
no manual key configuration is needed. There are three possible choices for the dnssec-validation option:
- yes: DNSSEC validation is enabled, but a trust anchor must be manually configured. No validation actually takes
place until at least one trusted key has been manually configured.
- no: DNSSEC validation is disabled, and the recursive server behaves in the “old-fashioned” way of performing
insecure DNS lookups.
- auto: DNSSEC validation is enabled, and a default trust anchor (included as part of BIND 9) for the DNS root
zone is used. This is the default; BIND automatically does this if there is no dnssec-validation line in the
configuration file.
Let’s discuss the difference between yes and auto. If set to yes, the trust anchor must be manually defined and maintained
using the trust-anchors statement (with either the static-key or static-ds modifier) in the configuration file; if
set to auto (the default, and as shown in the example), then no further action should be required as BIND includes a copy3
of the root key. When set to auto, BIND automatically keeps the keys (also known as trust anchors, discussed in Trust
Anchors) up-to-date without intervention from the DNS administrator.
When using yes, please note that if trust-anchors does not include a valid root key, then validation does not take place
for names which are not covered by any of the configured trust anchors.
We recommend using the default auto unless there is a good reason to require a manual trust anchor. To learn more about
trust anchors, please refer to Trusted Keys and Managed Keys.
3 The root zone was signed in July 2010 and, as at the time of this writing (mid-2020), the key has been changed once, in October 2018.

The

intention going forward is to roll the key once every five years.

How Does DNSSEC Change DNS Lookup (Revisited)?
Now you’ve enabled validation on your recursive name server and verified that it works. What exactly changed? In How
Does DNSSEC Change DNS Lookup? we looked at a very high-level, simplified version of the 12 steps of the DNSSEC
validation process. Let’s revisit that process now and see what your validating resolver is doing in more detail. Again, as
an example we are looking up the A record for the domain name www.isc.org (see The 12-Step DNSSEC Validation
Process (Simplified)):
1. The validating resolver queries the isc.org name servers for the A record of www.isc.org. This query has the
DNSSEC OK (do) bit set to 1, notifying the remote authoritative server that DNSSEC answers are desired.
2. Since the zone isc.org is signed, and its name servers are DNSSEC-aware, it responds with the answer to the A
record query plus the RRSIG for the A record.
3. The validating resolver queries for the DNSKEY for isc.org.
## 4. The isc.org name server responds with the DNSKEY and RRSIG records. The DNSKEY is used to verify the
answers received in #2.
5. The validating resolver queries the parent (.org) for the DS record for isc.org.
6. The .org name server is also DNSSEC-aware, so it responds with the DS and RRSIG records. The DS record is
used to verify the answers received in #4.
7. The validating resolver queries for the DNSKEY for .org.
## 8. The .org name server responds with its DNSKEY and RRSIG. The DNSKEY is used to verify the answers received
in #6.
9. The validating resolver queries the parent (root) for the DS record for .org.
10. The root name server, being DNSSEC-aware, responds with DS and RRSIG records. The DS record is used to
verify the answers received in #8.
11. The validating resolver queries for the DNSKEY for root.
## 12. The root name server responds with its DNSKEY and RRSIG. The DNSKEY is used to verify the answers received
in #10.
After step #12, the validating resolver takes the DNSKEY received and compares it to the key or keys it has configured,
to decide whether the received key can be trusted. We talk about these locally configured keys, or trust anchors, in Trust
Anchors.
With DNSSEC, every response includes not just the answer, but a digital signature (RRSIG) as well, so the validating
resolver can verify the answer received. That is what we look at in the next section, How Are Answers Verified?.
How Are Answers Verified?
Keep in mind, as you read this section, that although words like “encryption” and “decryption” are used here from
time to time, DNSSEC does not provide privacy. Public key cryptography is used to verify data authenticity (who sent
it) and data integrity (it did not change during transit), but any eavesdropper can still see DNS requests and responses
in clear text, even when DNSSEC is enabled.
So how exactly are DNSSEC answers verified? Let’s first see how verifiable information is generated. On the authoritative
server, each DNS record (or message) is run through a hash function, and this hashed value is then encrypted by a private
key. This encrypted hash value is the digital signature.
When the validating resolver queries for the resource record, it receives both the plain-text message and the digital signature(s). The validating resolver knows the hash function used (it is listed in the digital signature record itself), so it can

Fig. 1: Signature Generation
take the plain-text message and run it through the same hash function to produce a hashed value, which we’ll call hash
value X. The validating resolver can also obtain the public key (published as DNSKEY records), decrypt the digital signature, and get back the original hashed value produced by the authoritative server, which we’ll call hash value Y. If hash
values X and Y are identical, and the time is correct (more on what this means below), the answer is verified, meaning
this answer came from the authoritative server (authenticity), and the content remained intact during transit (integrity).

Fig. 2: Signature Verification
Take the A record ftp.isc.org, for example. The plain text is:

## 4. IN A

149.20.1.49

The digital signature portion is:

When a validating resolver queries for the A record ftp.isc.org, it receives both the A record and the RRSIG record.
It runs the A record through a hash function (in this example, SHA256 as indicated by the number 13, signifying ECDSAP256SHA256) and produces hash value X. The resolver also fetches the appropriate DNSKEY record to decrypt the
signature, and the result of the decryption is hash value Y.
But wait, there’s more! Just because X equals Y doesn’t mean everything is good. We still have to look at the time.
Remember we mentioned a little earlier that we need to check if the time is correct? Look at the two timestamps in our
example above:
- Signature Expiration: 20200401191851
- Signature Inception: 20200302184340
This tells us that this signature was generated UTC March 2nd, 2020, at 6:43:40 PM (20200302184340), and it is good
until UTC April 1st, 2020, 7:18:51 PM (20200401191851). The validating resolver’s current system time needs to fall

between these two timestamps. If it does not, the validation fails, because it could be an attacker replaying an old captured
answer set from the past, or feeding us a crafted one with incorrect future timestamps.
If the answer passes both the hash value check and the timestamp check, it is validated and the authenticated data (ad)
bit is set, and the response is sent to the client; if it does not verify, a SERVFAIL is returned to the client.

#### 13.4.5 Trust Anchors
A trust anchor is a key that is placed into a validating resolver, so that the validator can verify the results of a given request
with a known or trusted public key (the trust anchor). A validating resolver must have at least one trust anchor installed
to perform DNSSEC validation.

#### 13.4.6 How Trust Anchors are Used
In the section How Does DNSSEC Change DNS Lookup (Revisited)?, we walked through the 12 steps of the DNSSEC
lookup process. At the end of the 12 steps, a critical comparison happens: the key received from the remote server and
the key we have on file are compared to see if we trust it. The key we have on file is called a trust anchor, sometimes also
known as a trust key, trust point, or secure entry point.
The 12-step lookup process describes the DNSSEC lookup in the ideal world, where every single domain name is signed
and properly delegated, and where each validating resolver only needs to have one trust anchor - that is, the root’s public
key. But there is no restriction that the validating resolver must only have one trust anchor. In fact, in the early stages of
DNSSEC adoption, it was not unusual for a validating resolver to have more than one trust anchor.
For instance, before the root zone was signed (in July 2010), some validating resolvers that wished to validate domain
names in the .gov zone needed to obtain and install the key for .gov. A sample lookup process for www.fbi.gov at
that time would have been eight steps rather than 12:

1. The validating resolver queried fbi.gov name server for the A record of www.fbi.gov.
2. The FBI’s name server responded with the answer and its RRSIG.
## 3. The validating resolver queried the FBI’s name server for its DNSKEY.

4. The FBI’s name server responded with the DNSKEY and its RRSIG.
5. The validating resolver queried a .gov name server for the DS record of fbi.gov.
6. The .gov name server responded with the DS record and the associated RRSIG for fbi.gov.
7. The validating resolver queried the .gov name server for its DNSKEY.
8. The .gov name server responded with its DNSKEY and the associated RRSIG.
This all looks very similar, except it’s shorter than the 12 steps that we saw earlier. Once the validating resolver receives
the DNSKEY file in #8, it recognizes that this is the manually configured trusted key (trust anchor), and never goes to the
root name servers to ask for the DS record for .gov, or ask the root name servers for their DNSKEY.
In fact, whenever the validating resolver receives a DNSKEY, it checks to see if this is a configured trusted key to decide
whether it needs to continue chasing down the validation chain.
Trusted Keys and Managed Keys
Since the resolver is validating, we must have at least one key (trust anchor) configured. How did it get here, and how do
we maintain it?
If you followed the recommendation in Easy-Start Guide for Recursive Servers, by setting dnssec-validation to auto,
there is nothing left to do. BIND already includes a copy of the root key, and automatically updates it when the root key
changes.Page 809, 3 It looks something like this:
trust-anchors {
. initial-key 257 3 8 "AwEAAaz/
,→tAm8yTn4Mfeh5eyI96WSVexTBAvkMgJzkKTOiW1vkIbzxeF3
+/4RgWOq7HrxRixHlFlExOLAJr5emLvN7SWXgnLh4+B5xQlNVz8Og8kv
ArMtNROxVQuCaSnIDdD5LKyWbRd2n9WGe2R8PzgCmr3EgVLrjyBxWezF
0jLHwVN8efS3rCj/EWgvIWgb9tarpVUDK/b58Da+sqqls3eNbuv7pr+e
oZG+SrDK6nWeL3c6H5Apxz7LjVc1uTIdsIXxuOLYA4/ilBmSVIzuDWfd
RUfhHdY6+cn8HFRm+2hM8AnXGXws9555KrUB5qihylGa8subX2Nn6UwN
R1AkUTV74bU=";

You can, of course, decide to manage this key manually yourself. First, you need to make sure that dnssec-validation
is set to yes rather than auto:
dnssec-validation yes;

Then, download the root key manually from a trustworthy source, and put it into a trust-anchors statement as shown
below:
trust-anchors {
. static-key 257 3 8 "AwEAAaz/tAm8yTn4Mfeh5eyI96WSVexTBAvkMgJzkKTOiW1vkIbzxeF3
+/4RgWOq7HrxRixHlFlExOLAJr5emLvN7SWXgnLh4+B5xQlNVz8Og8kv
ArMtNROxVQuCaSnIDdD5LKyWbRd2n9WGe2R8PzgCmr3EgVLrjyBxWezF
0jLHwVN8efS3rCj/EWgvIWgb9tarpVUDK/b58Da+sqqls3eNbuv7pr+e
oZG+SrDK6nWeL3c6H5Apxz7LjVc1uTIdsIXxuOLYA4/ilBmSVIzuDWfd
RUfhHdY6+cn8HFRm+2hM8AnXGXws9555KrUB5qihylGa8subX2Nn6UwN
R1AkUTV74bU=";

While this trust-anchors statement looks similar to the built-in version above, the built-in key has the initial-key
modifier, whereas in the statement in the configuration file, that is replaced by static-key. There is an important
difference between the two: a key defined with static-key is always trusted until it is deleted from the configuration
file. With the initial-key modifier, keys are only trusted once: for as long as it takes to load the managed key database
and start the key maintenance process. Thereafter, BIND uses the managed keys database (managed-keys.bind.jnl)
as the source of key information.
Remember, if you choose to manage the keys on your own, whenever the key changes (which, for most zones, happens
on a periodic basis), the configuration needs to be updated manually. Failure to do so will result in breaking nearly
all DNS queries for the subdomain of the key. So if you are manually managing .gov, all domain names in the .gov
space may become unresolvable; if you are manually managing the root key, you could break all DNS requests made
to your recursive name server.
Explicit management of keys was common in the early days of DNSSEC, when neither the root zone nor many top-level
domains were signed. Since then, over 90% of the top-level domains have been signed, including all the largest ones.
Unless you have a particular need to manage keys yourself, it is best to use the BIND defaults and let the software manage
the root key.

#### 13.4.7 What’s EDNS All About (And Why Should I Care)?
EDNS Overview
Traditional DNS responses are typically small in size (less than 512 bytes) and fit nicely into a small UDP packet. The
Extension mechanism for DNS (EDNS, or EDNS(0)) offers a mechanism to send DNS data in larger packets over UDP.
To support EDNS, both the DNS server and the network need to be properly prepared to support the larger packet sizes
and multiple fragments.
This is important for DNSSEC, since the dig +do bit that signals DNSSEC-awareness is carried within EDNS, and
DNSSEC responses are larger than traditional DNS ones. If DNS servers and the network environment cannot support
large UDP packets, it will cause retransmission over TCP, or the larger UDP responses will be discarded. Users will likely
experience slow DNS resolution or be unable to resolve certain names at all.
Note that EDNS applies regardless of whether you are validating DNSSEC, because BIND has DNSSEC enabled by
default.
Please see Network Requirements for more information on what DNSSEC expects from the network environment.
EDNS on DNS Servers
For many years, BIND has had EDNS enabled by default, and the UDP packet size is set to a maximum of 4096 bytes.
The DNS administrator should not need to perform any reconfiguration. You can use dig to verify that your server
supports EDNS and see the UDP packet size it allows with this dig command:
$ dig @10.53.0.1 www.isc.org. A +dnssec +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.1 ftp.isc.org a +dnssec +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48742
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

; COOKIE: 29a9705c2160b08c010000005e67a4a102b9ae079c1b24c8 (good)
;ftp.isc.org.
300 IN A 149.20.1.49
;; Query time: 452 msec
;; WHEN: Tue Mar 10 14:30:57 GMT 2020
;; MSG SIZE rcvd: 187

There is a helpful testing tool available (provided by DNS-OARC) that you can use to verify resolver behavior regarding
EDNS support: https://www.dns-oarc.net/oarc/services/replysizetest/ .
Once you’ve verified that your name servers have EDNS enabled, that should be the end of the story, right? Unfortunately,
EDNS is a hop-by-hop extension to DNS. This means the use of EDNS is negotiated between each pair of hosts in a DNS
resolution process, which in turn means if one of your upstream name servers (for instance, your ISP’s recursive name
server that your name server forwards to) does not support EDNS, you may experience DNS lookup failures or be unable
to perform DNSSEC validation.
Support for Large Packets on Network Equipment
If both your recursive name server and your ISP’s name servers support EDNS, we are all good here, right? Not so fast.
Since these large packets have to traverse the network, the network infrastructure itself must allow them to pass.
When data is physically transmitted over a network, it has to be broken down into chunks. The size of the data chunk is
known as the Maximum Transmission Unit (MTU), and it can differ from network to network. IP fragmentation occurs
when a large data packet needs to be broken down into chunks smaller than the MTU; these smaller chunks then need to
be reassembled back into the large data packet at their destination. IP fragmentation is not necessarily a bad thing, and it
most likely occurs on your network today.
Some network equipment, such as a firewall, may make assumptions about DNS traffic. One of these assumptions may
be how large each DNS packet is. When a firewall sees a larger DNS packet than it expects, it may either reject the large
packet or drop its fragments because the firewall thinks it’s an attack. This configuration probably didn’t cause problems
in the past, since traditional DNS packets are usually pretty small in size. However, with DNSSEC, these configurations
need to be updated, since DNSSEC traffic regularly exceeds 1500 bytes (a common MTU value). If the configuration is
not updated to support a larger DNS packet size, it often results in the larger packets being rejected, and to the end user it
looks like the queries go unanswered. Or in the case of fragmentation, only a part of the answer makes it to the validating
resolver, and your validating resolver may need to re-ask the question again and again, creating the appearance for end
users that the DNS/network is slow.
While you are updating the configuration on your network equipment, make sure TCP port 53 is also allowed for DNS
traffic.

Wait… DNS Uses TCP?
Yes. DNS uses TCP port 53 as a fallback mechanism, when it cannot use UDP to transmit data. This has always been
the case, even long before the arrival of DNSSEC. Traditional DNS relies on TCP port 53 for operations such as zone
transfer. The use of DNSSEC, or DNS with IPv6 records such as AAAA, increases the chance that DNS data will be
transmitted via TCP.
Due to the increased packet size, DNSSEC may fall back to TCP more often than traditional (insecure) DNS. If your
network blocks or filters TCP port 53 today, you may already experience instability with DNS resolution, before even
deploying DNSSEC.

### 13.5 Signing
#### 13.5.1 Easy-Start Guide for Signing Authoritative Zones
This section provides the basic information needed to set up a DNSSEC-enabled authoritative name server. A DNSSECenabled (or “signed”) zone contains additional resource records that are used to verify the authenticity of its zone information.
To convert a traditional (insecure) DNS zone to a secure one, we need to create some additional records (DNSKEY,
RRSIG, and NSEC or NSEC3), and upload verifiable information (such as a DS record) to the parent zone to complete
the chain of trust. For more information about DNSSEC resource records, please see What Does DNSSEC Add to DNS?.
In this chapter, we assume all configuration files, key files, and zone files are stored in /etc/bind, and most examples
show commands run as the root user. This may not be ideal, but the point is not to distract from what is important
here: learning how to sign a zone. There are many best practices for deploying a more secure BIND installation, with
techniques such as jailed process and restricted user privileges, but those are not covered in this document. We trust
you, a responsible DNS administrator, to take the necessary precautions to secure your system.
For the examples below, we work with the assumption that there is an existing insecure zone example.com that we are
converting to a secure zone.
Enabling Automated DNSSEC Zone Maintenance and Key Generation
To sign a zone, add the following statement to its zone clause in the BIND 9 configuration file:
directory "/etc/bind";
zone "example.com" in {

The dnssec-policy statement causes the zone to be signed and turns on automatic maintenance for the zone. This
includes re-signing the zone as signatures expire and replacing keys on a periodic basis. The value default selects the
default policy, which contains values suitable for most situations. We cover the creation of a custom policy in Creating a
Custom DNSSEC Policy, but for the moment we are accepting the default values.

Using dnssec-policy requires dynamic DNS or inline-signing to be enabled.
When the configuration file is updated, tell named to reload the configuration file by running rndc reconfig :

And that’s it - BIND signs your zone.
At this point, before you go away and merrily add dnssec-policy statements to all your zones, we should mention that,
like a number of other BIND configuration options, its scope depends on where it is placed. In the example above, we
placed it in a zone clause, so it applied only to the zone in question. If we had placed it in a view clause, it would have
applied to all zones in the view; and if we had placed it in the options clause, it would have applied to all zones served
by this instance of BIND.
Verification
The BIND 9 reconfiguration starts the process of signing the zone. First, it generates a key for the zone and includes it in
the published zone. The log file shows messages such as these:
07-Apr-2020 16:02:55.045 zone example.com/IN (signed): reconfiguring zone keys
07-Apr-2020 16:02:55.045 reloading configuration succeeded
07-Apr-2020 16:02:55.046 keymgr: DNSKEY example.com/ECDSAP256SHA256/10376 (CSK)␣
,→created for policy default
07-Apr-2020 16:02:55.046 Fetching example.com/ECDSAP256SHA256/10376 (CSK) from key␣
,→repository.
07-Apr-2020 16:02:55.046 DNSKEY example.com/ECDSAP256SHA256/10376 (CSK) is now␣
,→published
07-Apr-2020 16:02:55.046 DNSKEY example.com/ECDSAP256SHA256/10376 (CSK) is now active
07-Apr-2020 16:02:55.048 zone example.com/IN (signed): next key event: 07-Apr-2020␣
,→18:07:55.045

It then starts signing the zone. How long this process takes depends on the size of the zone, the speed of the server, and
how much activity is taking place. We can check what is happening by using rndc, entering the command:

While the signing is in progress, the output is something like:
Signing with key 10376/ECDSAP256SHA256

and when it is finished:
Done signing with key 10376/ECDSAP256SHA256

When the second message appears, the zone is signed.
Before moving on to the next step of coordinating with the parent zone, let’s make sure everything looks good using delv .
We want to simulate what a validating resolver will check, by telling delv to use a specific trust anchor.
First, we need to make a copy of the key created by BIND. This is in the directory you set with the directory statement
in your configuration file’s options clause, and is named something like Kexample.com.+013.10376.key:

The original key file looks like this (with the actual key shortened for ease of display, and comments omitted):

example.com. 3600 IN DNSKEY 257 3 13 6saiq99qDB...dqp+o0dw==

We want to edit the copy to be in the trust-anchors format, so that it looks like this:
trust-anchors {
example.com. static-key 257 3 13 "6saiq99qDB...dqp+o0dw==";

Now we can run the delv command and instruct it to use this trusted-key file to validate the answer it receives from the
authoritative name server 192.168.1.13:
$ delv @192.168.1.13 -a /tmp/example.key +root=example.com example.com. SOA +multiline
; fully validated
2020040703 ; serial
600 IN RRSIG SOA 13 2 600 (
jBsz92zwAcGMNV/yu167aKQZvFyC7BiQe1WEnlogdLTF
oq4yBQumOhO5WX61LjA17l1DuLWcd/ASwlUZWFGCYQ== )

Uploading Information to the Parent Zone
Once everything is complete on our name server, we need to generate some information to be uploaded to the parent
zone to complete the chain of trust. The format and the upload methods are actually dictated by your parent zone’s
administrator, so contact your registrar or parent zone administrator to find out what the actual format should be and how
to deliver or upload the information to the parent zone.
What about your zone between the time you signed it and the time your parent zone accepts the upload? To the rest of the
world, your zone still appears to be insecure, because if a validating resolver attempts to validate your domain name via
your parent zone, your parent zone will indicate that you are not yet signed (as far as it knows). The validating resolver
will then give up attempting to validate your domain name, and will fall back to the insecure DNS. Until you complete
this final step with your parent zone, your zone remains insecure.
Before uploading to your parent zone, verify that your newly signed zone has propagated to all of your name servers
(usually via zone transfers). If some of your name servers still have unsigned zone data while the parent tells the world
it should be signed, validating resolvers around the world cannot resolve your domain name.
Here are some examples of what you may upload to your parent zone, with the DNSKEY/DS data shortened for display.
Note that no matter what format may be required, the end result is the parent zone publishing DS record(s) based on the
information you upload. Again, contact your parent zone administrator(s) to find out the correct format for their system.
1. DS record format:

example.com. 3600 IN DS 10376 13 2 B92E22CAE0...33B8312EF0

## 2. DNSKEY format:
example.com. 3600 IN DNSKEY 257 3 13 6saiq99qDB...dqp+o0dw==

The DS record format may be generated from the DNSKEY using the dnssec-dsfromkey tool, which is covered in
DS Record Format. For more details and examples on how to work with your parent zone, please see Working With the
Parent Zone.
So… What Now?
Congratulations! Your zone is signed, your secondary servers have received the new zone data, and the parent zone has
accepted your upload and published your DS record. Your zone is now officially DNSSEC-enabled. What happens next?
That is basically it - BIND takes care of everything else. As for updating your zone file, you can continue to update it
the same way as prior to signing your zone; the normal work flow of editing a zone file and using the rndc command to
reload the zone still works as usual, and although you are editing the unsigned version of the zone, BIND generates the
signed version automatically.
Curious as to what all these commands did to your zone file? Read on to Your Zone, Before and After DNSSEC and find
out. If you are interested in how to roll this out to your existing primary and secondary name servers, check out DNSSEC
Signing in the Recipes chapter.

#### 13.5.2 Your Zone, Before and After DNSSEC
When we assigned the default DNSSEC policy to the zone, we provided the minimal amount of information to convert a
traditional DNS zone into a DNSSEC-enabled zone. This is what the zone looked like before we started:
$ dig @192.168.1.13 example.com. AXFR +multiline +onesoa
; <<>> DiG 9.16.0 <<>> @192.168.1.13 example.com AXFR +multiline +onesoa
2020040700 ; serial
600 IN NS ns1.example.com.
## 600. IN A 192.168.1.200
## 600. IN A 192.168.1.1
## 600. IN CNAME www.example.com.
## 600. IN A 192.168.1.100

Below shows the test zone example.com after reloading the server configuration. Clearly, the zone grew in size, and the
number of records multiplied:
; <<>> DiG 9.16.0 <<>> @192.168.1.13 example.com AXFR +multiline +onesoa

2020040703 ; serial
300 IN RRSIG NSEC 13 2 300 (
drtV1rJbo5OMi65OJtu7Jmg/thgpdTWrzr6O3Pzt12+B
oCxMAv3orWWYjfP2n9w5wj0rx2Mt2ev7MOOG8IOUCA== )
300 IN NSEC ftp.example.com. NS SOA RRSIG NSEC DNSKEY TYPE65534
## 600. IN RRSIG NS 13 2 600 (
2ipmzm1Ei6vfE9OLowPMsxLBCbjrCpWPgWJ0ekwZBbux
MLffZOXn8clt0Ql2U9iCPdyoQryuJCiojHSE2d6nrw== )
600 IN RRSIG SOA 13 2 600 (
jBsz92zwAcGMNV/yu167aKQZvFyC7BiQe1WEnlogdLTF
oq4yBQumOhO5WX61LjA17l1DuLWcd/ASwlUZWFGCYQ== )
0 IN RRSIG TYPE65534 13 2 0 (
Xjkom24N6qeCJjg9BMUfuWf+euLeZB169DHvLYZPZNlm
GgM2czUDPio6VpQbUw6JE5DSNjuGjgpgXC5SipC42g== )
3600 IN RRSIG DNSKEY 13 2 3600 (
maK75+28oUyDtci3V7wjTsuhgkLUZW+Q++q46Lea6bKn
Xj77kXcLNogNdUOr5am/6O6cnPeJKJWsnmTLISm62g== )
0 IN TYPE65534 \# 5 ( 0D28880001 )
## 3600. IN DNSKEY 257 3 13 (
6saiq99qDBb5b4G4cx13cPjFTrIvUs3NW44SvbbHorHb
kXwOzeGAWyPORN+pwEV/LP9+FHAF/JzAJYdqp+o0dw==
) ; KSK; alg = ECDSAP256SHA256 ; key id = 10376
600 IN NS ns1.example.com.
## 600. IN RRSIG A 13 3 600 (
UYo1njeUA49VhKnPSS3JO4G+/Xd2PD4m3Vaacnd191yz
BIoouEBAGPcrEM2BNrgR0op1EWSus9tG86SM1ZHGuQ== )
rPADrAMAPIPSF3S45OSY8kXBTYMS3nrZg4Awj7qRL+/b
sOKy6044MbIbjg+YWL69dBjKoTSeEGSCSt73uIxrYA== )
300 IN NSEC ns1.example.com. A RRSIG NSEC
## 600. IN A 192.168.1.200
## 600. IN RRSIG A 13 3 600 (
Yeojg7qrJmxL6uLTnALwKU5byNldZ9Ggj5XjcbpPvujQ
ocG/ovGBg6pdugXC9UxE39bCDl8dua1frjDcRCCZAA== )
vukgQme6k7JwCf/mJOOzHXbE3fKtSro+Kc10T6dHMdsc
oM1/oXioZvgBZ9cKrQhIAUt7r1KUnrUwM6Je36wWFA== )

## 300. IN NSEC web.example.com. A RRSIG NSEC
## 600. IN A 192.168.1.1
## 600. IN RRSIG CNAME 13 3 600 (
JXi4WYypofD5geUowVqlqJyHzvcRnsvU/ONhTBaUCw5Y
XtifKAXRHWrUL1HIwt37JYPLf5uYu90RfkWLj0GqTQ== )
XF4Hsd58dalL+s6Qu99bG80PQyMf7ZrHEzDiEflRuykP
DfBRuf34z27vj70LO1lp2ZiX4BB1ahcEK2ae9ASAmA== )
300 IN NSEC www.example.com. CNAME RRSIG NSEC
## 600. IN CNAME www.example.com.
## 600. IN RRSIG A 13 3 600 (
mACKXrDOF5JMWqncSiQ3pYWA6abyGDJ4wgGCumjLXhPy
0cMzJmKv2s7G6+tW3TsA6BK3UoMfv30oblY2Mnl4/A== )
1YQ22odVt0TeP5gbNJwkvS684ipDmx6sEOsF0eCizhCv
x8osuOATdlPjIEztt+rveaErZ2nsoLor5k1nQAHsbQ== )
300 IN NSEC example.com. A RRSIG NSEC
## 600. IN A 192.168.1.100

But this is a really messy way to tell if the zone is set up properly with DNSSEC. Fortunately, there are tools to help us
with that. Read on to How To Test Authoritative Zones to learn more.

#### 13.5.3 How To Test Authoritative Zones
So we’ve activated DNSSEC and uploaded some data to our parent zone. How do we know our zone is signed correctly?
Here are a few ways to check.
Look for Key Data in Your Zone
One way to see if your zone is signed is to check for the presence of DNSKEY record types. In our example, we created
a single key, and we expect to see it returned when we query for it.
$ dig @192.168.1.13 example.com. DNSKEY +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.6 example.com DNSKEY +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 18637
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: efe186423313fb66010000005e8c997e99864f7d69ed7c11 (good)

## 3600. IN DNSKEY 257 3 13 (
6saiq99qDBb5b4G4cx13cPjFTrIvUs3NW44SvbbHorHb
kXwOzeGAWyPORN+pwEV/LP9+FHAF/JzAJYdqp+o0dw==
) ; KSK; alg = ECDSAP256SHA256 ; key id = 10376

Look for Signatures in Your Zone
Another way to see if your zone data is signed is to check for the presence of a signature. With DNSSEC, every record4
now comes with at least one corresponding signature, known as an RRSIG.
$ dig @192.168.1.13 example.com. SOA +dnssec +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.6 example.com SOA +dnssec +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45219
;; flags: qr aa rd; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 75adff4f4ce916b2010000005e8c99c0de47eabb7951b2f5 (good)
IN SOA
2020040703 ; serial
600 IN RRSIG SOA 13 2 600 (
jBsz92zwAcGMNV/yu167aKQZvFyC7BiQe1WEnlogdLTF
oq4yBQumOhO5WX61LjA17l1DuLWcd/ASwlUZWFGCYQ== )

The serial number was automatically incremented from the old, unsigned version. named keeps track of the serial number
of the signed version of the zone independently of the unsigned version. If the unsigned zone is updated with a new serial
number that is higher than the one in the signed copy, then the signed copy is increased to match it; otherwise, the two
are kept separate.
Examine the Zone File
Our original zone file example.com.db remains untouched, and named has generated three additional files automatically
for us (shown below). The signed DNS data is stored in example.com.db.signed and in the associated journal file.
4 Well, almost every record: NS records and glue records for delegations do not have RRSIG records. If there are no delegations, then every record
in your zone is signed and comes with its own RRSIG.

example.com.db

example.com.db.jbk

example.com.db.signed

example.com.db.signed.jnl

A quick description of each of the files:
- .jbk: a transient file used by named
- .signed: the signed version of the zone in raw format
- .signed.jnl: a journal file for the signed version of the zone
These files are stored in raw (binary) format for faster loading. To reveal the human-readable version, use
named-compilezone as shown below. In the example below, we run the command on the raw format zone example.
com.db.signed to produce a text version of the zone example.com.text:
,→signed
zone example.com/IN: loaded serial 2014112008 (DNSSEC signed)
dump zone to example.com.text...done
OK

Check the Parent
Although this is not strictly related to whether the zone is signed, a critical part of DNSSEC is the trust relationship
between the parent and the child. Just because we, the child, have all the correctly signed records in our zone does not
mean it can be fully validated by a validating resolver, unless our parent’s data agrees with ours. To check if our upload
to the parent was successful, ask the parent name server for the DS record of our child zone; we should get back the DS
record(s) containing the information we uploaded in Uploading Information to the Parent Zone:
$ dig example.com. DS
; <<>> DiG 9.16.0 <<>> example.com DS
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 16954
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: db280d5b52576780010000005e8c9bf5b0d8de103d934e5d (good)
IN DS
example.com. 61179 IN DS 10376 13 2␣
,→B92E22CAE0B41430EC38D3F7EDF1183C3A94F4D4748569250C15EE33B8312EF0

External Testing Tools
We recommend two tools, below: Verisign DNSSEC Debugger and DNSViz. Others can be found via a simple online
search. These excellent online tools are an easy way to verify that your domain name is fully secured.

Verisign DNSSEC Debugger
URL: https://dnssec-debugger.verisignlabs.com/
This tool shows a nice summary of checks performed on your domain name. You can expand it to view more details for
each of the items checked, to get a detailed report.
DNSViz
URL: https://dnsviz.net/
DNSViz provides a visual analysis of the DNSSEC authentication chain for a domain name and its resolution path in the
DNS namespace.

#### 13.5.4 Signing Easy Start Explained
Enable Automatic DNSSEC Maintenance Explained
Signing a zone requires a number of separate steps:
- Generation of the keys to sign the zone.
- Inclusion of the keys into the zone.
- Signing of the records in the file (including the generation of the NSEC or NSEC3 records).
Maintaining a signed zone comprises a set of ongoing tasks:
- Re-signing the zone as signatures approach expiration.
- Generation of new keys as the time approaches for a key roll.
- Inclusion of new keys into the zone when the rollover starts.
- Transition from signing the zone with the old set of keys to signing the zone with the new set of keys.
- Waiting the appropriate interval before removing the old keys from the zone.
- Deleting the old keys.
That is quite complex, and it is all handled in BIND 9 with the single dnssec-policy default statement. We will
see later on (in the Creating a Custom DNSSEC Policy section) how these actions can be tuned, by setting up our own
DNSSEC policy with customized parameters. However, in many cases the defaults are adequate.
dnssec-policy is the preferred way to run DNSSEC in a zone, but sometimes a more “hands-on” approach to signing

and key maintenance is needed. For this reason, we cover manual signing techniques in Manual Signing.

#### 13.5.5 Working With the Parent Zone
As mentioned in Uploading Information to the Parent Zone, the format of the information uploaded to your parent zone
is dictated by your parent zone administrator. The two main formats are:
1. DS record format
## 2. DNSKEY format
Check with your parent zone to see which format they require.
But how can you get each of the formats from your existing data?
When named turned on automatic DNSSEC maintenance, essentially the first thing it did was to create the DNSSEC
keys and put them in the directory you specified in the configuration file. If you look in that directory, you will see three
files with names like Kexample.com.+013+10376.key, Kexample.com.+013+10376.private, and Kexample.
com.+013+10376.state. The one we are interested in is the one with the .key suffix, which contains the zone’s public

Fig. 3: Verisign DNSSEC Debugger

Fig. 4: DNSViz

key. (The other files contain the zone’s private key and the DNSSEC state associated with the key.) This public key is
used to generate the information we need to pass to the parent.
DS Record Format
Below is an example of a DS record format generated from the KSK we created earlier (Kexample.com.+013+10376.
key):
dnssec-dsfromkey Kexample.com.+013+10376.key
example.com. IN DS 10376 13 2␣
,→B92E22CAE0B41430EC38D3F7EDF1183C3A94F4D4748569250C15EE33B8312EF0

Some registrars ask their customers to manually specify the types of algorithm and digest used. In this example, 13
represents the algorithm used, and 2 represents the digest type (SHA-256). The key tag or key ID is 10376.
DNSKEY Format
Below is an example of the same key ID (10376) using DNSKEY format (with the actual key shortened for ease of
display):
example.com. 3600 IN DNSKEY 257 3 13 (6saiq99qDB...dqp+o0dw==) ; key id = 10376

The key itself is easy to find (it’s difficult to miss that long base64 string) in the file.
; This is a key-signing key, keyid 10376, for example.com.
; Created: 20200407150255 (Tue Apr 7 16:02:55 2020)
; Publish: 20200407150255 (Tue Apr 7 16:02:55 2020)
; Activate: 20200407150255 (Tue Apr 7 16:02:55 2020)
example.com. 3600 IN DNSKEY 257 3 13 6saiq99qDB...dqp+o0dw==

#### 13.5.6 Creating a Custom DNSSEC Policy
The remainder of this section describes the contents of a custom DNSSEC policy. Advanced Discussions describes the
concepts involved here and the pros and cons of choosing particular values. If you are not already familiar with DNSSEC,
it may be worth reading that chapter first.
Setting up your own DNSSEC policy means that you must include a dnssec-policy clause in the zone file. This sets
values for the various parameters that affect the signing of zones and the rolling of keys. The following is an example of
such a clause:
dnssec-policy standard {
dnskey-ttl 600;
keys {
ksk lifetime 365d algorithm ecdsap256sha256;
zsk lifetime 60d algorithm ecdsap256sha256;
max-zone-ttl 600;
parent-ds-ttl 600;
parent-propagation-delay 2h;
publish-safety 7d;
retire-safety 7d;

signatures-refresh 5d;
signatures-validity 15d;
signatures-validity-dnskey 15d;
zone-propagation-delay 2h;

The policy has multiple parts:
- The name must be specified. As each zone can use a different policy, named needs to be able to distinguish between
policies. This is done by giving each policy a name, such as standard in the above example.
- The keys clause lists all keys that should be in the zone, along with their associated parameters. In this example, we are using the conventional KSK/ZSK split, with the KSK changed every year and the ZSK changed
every two months (the default DNSSEC policy sets a CSK that is never changed). Keys are created using the
ECDSAPS256SHA256 algorithm; each KSK/ZSK pair must have the same algorithm. A CSK combines the functionality of a ZSK and a KSK.
- The parameters ending in -ttl are, as expected, the TTLs of the associated records. Remember that during a key
rollover, we have to wait for records to expire from caches? The values here tell BIND 9 the maximum amount of
time it has to wait for this to happen. Values can be set for the DNSKEY records in your zone, the non-DNSKEY
records in your zone, and the DS records in the parent zone.
- Another set of time-related parameters are those ending in -propagation-delay. These tell BIND how long it
takes for a change in zone contents to become available on all secondary servers. (This may be non-negligible: for
example, if a large zone is transferred over a slow link.)
- The policy also sets values for the various signature parameters: how long the signatures on the DNSKEY and
non-DNSKEY records are valid, and how often BIND should re-sign the zone.
- The parameters ending in -safety are there to give you a bit of leeway in case a key roll doesn’t go to plan.
When introduced into the zone, the publish-safety time is the amount of additional time, over and above that
calculated from the other parameters, during which the new key is in the zone but before BIND starts to sign records
with it. Similarly, the retire-safety is the amount of additional time, over and above that calculated from the
other parameters, during which the old key is retained in the zone before being removed.
- Finally, the purge-keys option allows you to clean up key files automatically after a period of time. If a key has
been removed from the zone, this option will determine how long its key files will be retained on disk.
(You do not have to specify all the items listed above in your policy definition. Any that are not set simply take the default
value.)
Usually, the exact timing of a key roll, or how long a signature remains valid, is not critical. For this reason, err on the
side of caution when setting values for the parameters. It is better to have an operation like a key roll take a few days
longer than absolutely required, than it is to have a quick key roll but have users get validation failures during the process.
Having defined a new policy called “standard”, we now need to tell named to use it. We do this by adding a
dnssec-policy standard; statement to the configuration file. Like many other configuration statements, it can
be placed in the options statement (thus applying to all zones on the server), a view statement (applying to all zones in
the view), or a zone statement (applying only to that zone). In this example, we’ll add it to the zone statement:
zone "example.net" in {
dnssec-policy standard;

Finally, tell named to use the new policy:

… and that’s it. named now applies the “standard” policy to your zone.

#### 13.5.7 Maintenance Tasks
Zone data is signed and the parent zone has published your DS records: at this point your zone is officially secure. When
other validating resolvers look up information in your zone, they are able to follow the 12-step process as described in
How Does DNSSEC Change DNS Lookup (Revisited)? and verify the authenticity and integrity of the answers.
There is not that much left for you, as the DNS administrator, to do on an ongoing basis. Whenever you update your
zone, BIND automatically re-signs your zone with new RRSIG and NSEC/NSEC3 records, and even increments the serial
number for you. If you choose to split your keys into a KSK and ZSK, the rolling of the ZSK is completely automatic.
Rolling of a KSK or CSK may require some manual intervention, though, so let’s examine two more DNSSEC-related
resource records, CDS and CDNSKEY.
The CDS and CDNSKEY Resource Records
Passing the DS record to the organization running the parent zone has always been recognized as a bottleneck in the key
rollover process. To automate the process, the CDS and CDNSKEY resource records were introduced.
The CDS and CDNSKEY records are identical to the DS and DNSKEY records, except in the type code and the name.
When such a record appears in the child zone, it is a signal to the parent that it should update the DS it has for that zone.
In essence, when the parent notices the presence of the CDS and/or CDNSKEY record(s) in the child zone, it checks
these records to verify that they are signed by a valid key for the zone. If the record(s) successfully validate, the parent
zone’s DS RRset for the child zone is changed to correspond to the CDS (or CDNSKEY) records. (For more information
on how the signaling works and the issues surrounding it, please refer to RFC 7344 and RFC 8078.)
Working with the Parent Zone (2)
Once the zone is signed, the only required manual tasks are to monitor KSK or CSK key rolls and pass the new DS record
to the parent zone. However, if the parent can process CDS or CDNSKEY records, you may not even have to do that.5
When the time approaches for the roll of a KSK or CSK, BIND adds a CDS and a CDNSKEY record for the key in
question to the apex of the zone. If your parent zone supports polling for CDS/CDNSKEY records, they are uploaded
and the DS record published in the parent - at least ideally.
If BIND is configured with parental-agents, it will check for the DS presence. Let’s look at the following configuration excerpt:
remote-servers "net" {
10.53.0.11; 10.53.0.12;
zone "example.net" in {
dnssec-policy standard;
parental-agents { "net"; };
checkds explicit;
5 For security reasons, a parent zone that supports CDS/CDNSKEY may require the DS record to be manually uploaded when we first sign the zone.
Until our zone is signed, the parent cannot be sure that a CDS or CDNSKEY record it finds by querying our zone really comes from our zone; thus, it
needs to use some other form of secure transfer to obtain the information.

BIND will check for the presence of the DS record in the parent zone by querying its parental agents (defined in RFC
7344 to be the entities that the child zone has a relationship with to change its delegation information). In the example
above, The zone example.net is configured with two parental agents, at the addresses 10.53.0.11 and 10.53.0.12. These
addresses are used as an example only. Both addresses will have to respond with a DS RRset that includes the DS record
identifying the key that is being rolled. If one or both don’t have the DS included yet the rollover is paused, and the check
for DS presence is retried after an hour. The same applies for DS withdrawal.
The example also has checkds set to explicit. This means that only the addresses defined in parental-agents are
being queried. If set to yes, the parental agents are being looked up by querying for the parent NS records.
Alternatively, you can use the rndc tool to tell named that the DS record has been published or withdrawn. For example:

This command should also be used when checkds is set to no.
If your parent zone doesn’t support CDS/CDNSKEY, you will have to supply the DNSKEY or DS record to the parent
zone manually when a new KSK appears in your zone, presumably using the same mechanism you used to upload the
records for the first time. Again, you need to use the rndc tool to tell named that the DS record has been published.

#### 13.5.8 Manual Signing
Manual signing of a zone was the first method of signing introduced into BIND and offers, as the name suggests, no
automation. The user must handle everything: create the keys, sign the zone file with them, load the signed zone, periodically re-sign the zone, and manage key rolls, including interaction with the parent. A user certainly can do all this, but
why not use one of the automated methods?
Although use of the automatic dnssec-policy is the preferred way to sign zones in BIND, there are occasions where a
manual approach may be needed. dnssec-policy does not currently support the use of external hardware, so if your
security policy requires it, you need to use manual signing.
BIND 9 ships with several tools that are used in this process, which are explained in more detail below. In all cases, the -h
option prints a full list of parameters. Note that the DNSSEC tools require the keyset files to be in the working directory
or the directory specified by the -d option.
To convert a traditional (insecure) DNS zone to a secure one, we need to create various additional records (DNSKEY,
RRSIG, NSEC/NSEC3) and, as with fully automatic signing, to upload verifiable information (such as a DS record) to
the parent zone to complete the chain of trust.
The first step is to create the keys as described in Generate Keys, then using the BIND-provided tools dnssec-keygen to
create the keys and dnssec-signzone to sign the zone. The signed zone is stored in another file and is the one you tell
BIND to load. To update the zone (for example, to add a resource record), you update the unsigned zone, re-sign it, and
tell named to load the updated signed copy. The same goes for refreshing signatures or rolling keys; the user is responsible
for providing the signed zone served by named. (In the case of rolling keys, you are also responsible for ensuring that the
keys are added and removed at the correct times.)
Why would you want to sign your zone this way? You probably wouldn’t in the normal course of events, but as there may
be circumstances in which it is required, the scripts have been left in the BIND distribution.
Again, we assume all configuration files, key files, and zone files are stored in /etc/bind, and most examples show
commands run as the root user. This may not be ideal, but the point is not to distract from what is important here:
learning how to sign a zone. There are many best practices for deploying a more secure BIND installation, with
techniques such as jailed process and restricted user privileges, but those are not covered in this document. We trust
you, a responsible DNS administrator, to take the necessary precautions to secure your system.

For our examples below, we work with the assumption that there is an existing insecure zone example.com that we
are converting to a secure version. The secure version uses both a KSK and a ZSK.

Generate Keys
Everything in DNSSEC centers around keys, so we begin by generating our own keys.
Kexample.com.+013+34371
Kexample.com.+013+00472

This command generates four key files in /etc/bind/keys:
- Kexample.com.+013+34371.key
- Kexample.com.+013+34371.private
- Kexample.com.+013+00472.key
- Kexample.com.+013+00472.private
The two files ending in .key are the public keys. These contain the DNSKEY resource records that appear in the zone.
The two files ending in .private are the private keys, and contain the information that named actually uses to sign the
Of the two pairs, one is the zone-signing key (ZSK), and one is the key-signing key (KSK).6 We can tell which is which
by looking at the file contents (the actual keys are shortened here for ease of display):
; This is a zone-signing key, keyid 34371, for example.com.
; Created: 20200616104249 (Tue Jun 16 11:42:49 2020)
; Publish: 20200616104249 (Tue Jun 16 11:42:49 2020)
; Activate: 20200616104249 (Tue Jun 16 11:42:49 2020)
example.com. IN DNSKEY 256 3 13 AwEAAfel66...LqkA7cvn8=
; This is a key-signing key, keyid 472, for example.com.
; Created: 20200616104254 (Tue Jun 16 11:42:54 2020)
; Publish: 20200616104254 (Tue Jun 16 11:42:54 2020)
; Activate: 20200616104254 (Tue Jun 16 11:42:54 2020)
example.com. IN DNSKEY 257 3 13 AwEAAbCR6U...l8xPjokVU=

The first line of each file tells us what type of key it is. Also, by looking at the actual DNSKEY record, we can tell them
apart: 256 is ZSK, and 257 is KSK.
The name of the file also tells us something about the contents. See chapter Zone keys for more details.
Make sure that these files are readable by named and that the .private files are not readable by anyone else.
Alternativelly, the dnssec-keyfromlabel program is used to get a key pair from a crypto hardware device and build
the key files. Its usage is similar to dnssec-keygen.
6 Only one key file - for either a KSK or ZSK - is needed to signal the presence of the zone. dnssec-keygen creates files of both types as needed.

Setting Key Timing Information
Key files contain time information related to rolling keys. This is placed there by dnssec-keygen when the file is
created, and it can be modified using dnssec-settime. By default, only a limited amount of timing information is
included in the file, as illustrated in the examples in the previous section.
Note that dnssec-policy does set key timing information, but it uses its own state machine to determine what actions
to perform.
But when performing manual signing the key parameters and the timing information in the key files, you can implement
any DNSSEC policy you want for your zones.
All the dates are the same, and are the date and time that dnssec-keygen created the key. We can use
dnssec-settime to modify the dates. The dates can also be modified using an editor, but that is likely to be more
error-prone than using dnssec-settime. For example, to publish this key in the zone on 1 July 2020, use it to sign
records for a year starting on 15 July 2020, and remove it from the zone at the end of July 2021, we can use the following
command:
,→+013+34371.key
./Kexample.com.+013+34371.key
./Kexample.com.+013+34371.private

which would set the contents of the key file to:
; This is a zone-signing key, keyid 34371, for example.com.
; Created: 20200616104249 (Tue Jun 16 11:42:49 2020)
; Publish: 20200701000000 (Wed Jul 1 01:00:00 2020)
; Activate: 20200715000000 (Wed Jul 15 01:00:00 2020)
; Inactive: 20210715000000 (Thu Jul 15 01:00:00 2021)
; Delete: 20210731000000 (Sat Jul 31 01:00:00 2021)
example.com. IN DNSKEY 256 3 13 AwEAAfel66...LqkA7cvn8=

(The actual key is truncated here to improve readability.)
Below is a complete list of each of the metadata fields, and how each one affects the signing of your zone:
1. Created: This records the date on which the key was created. It is not used in calculations; it is useful simply for
documentation purposes.
2. Publish: This sets the date on which a key is to be published to the zone. After that date, the key is included in the
zone but is not used to sign it. This allows validating resolvers to get a copy of the new key in their cache before
there are any resource records signed with it. By default, if not specified at creation time, this is set to the current
time, meaning the key is published as soon as named picks it up.
3. Activate: This sets the date on which the key is to be activated. After that date, resource records are signed with
the key. By default, if not specified during creation time, this is set to the current time, meaning the key is used to
sign data as soon as named picks it up.
4. Revoke: This sets the date on which the key is to be revoked. After that date, the key is flagged as revoked, although
it is still included in the zone and used to sign it. This is used to notify validating resolvers that this key is about to
be removed or retired from the zone. (This state is not used in normal day-to-day operations. See RFC 5011 to
understand the circumstances where it may be used.)
5. Inactive: This sets the date on which the key is to become inactive. After that date, the key is still included in the
zone, but it is no longer used to sign it. This sets the “expiration” or “retire” date for a key.
6. Delete: This sets the date on which the key is to be deleted. After that date, the key is no longer included in the
zone, but it continues to exist on the file system or key repository.

This can be summarized as follows:
Table 1: Key Metadata Comparison
Metadata

Included in Zone File?

Used to Sign Data?

Purpose

Created
Publish
Activate
Revoke
Inactive
Delete

Recording of key creation
Introduction of a key soon to be active
Activation date for new key
Notification of a key soon to be retired
Inactivation or retirement of a key
Deletion or removal of a key from a zone

The publication date is the date the key should be introduced into the zone. The activation date can be used to determine
when to sign resource records. With “Inactive” you signal when the signer should stop generating new signatures with the
given key, and the “Delete” metadata specifies when the key should be removed from the zone.
Finally, we should note that the dnssec-keygen command supports the same set of switches so we could have set the
dates when we created the key.
Signing the Zone
Now, edit the zone file to make sure the proper DNSKEY entries are included. The public keys should be inserted into
the zone file by including the .key files using $INCLUDE statements.
Use the command dnssec-signzone. Any keyset files corresponding to secure sub-zones should be present. The
zone signer generates NSEC, NSEC3, and RRSIG records for the zone, as well as DS for the child zones if -g is specified.
If -g is not specified, then DS RRsets for the secure child zones need to be added manually.
The following command signs the zone, assuming it is in a file called zone.child.example, using manually specified
keys:
,→db \
/etc/bind/db/example.com.db Kexample.com.+013+17694.key Kexample.com.+013+06817.
,→key
Verifying the zone using the following algorithms: ECDSAP256SHA256.
Zone fully signed:
Algorithm: ECDSAP256SHA256: KSKs: 1 active, 0 stand-by, 0 revoked
ZSKs: 1 active, 0 stand-by, 0 revoked
/etc/bind/db/example.com.signed.db
Signatures generated:
17
Signatures retained:
Signatures dropped:
Signatures successfully verified:
Signatures unsuccessfully verified:
Signing time in seconds:
0.046
Signatures per second:
364.634
Runtime in seconds:
0.055

The -o switch explicitly defines the domain name (example.com in this case), while the -f switch specifies the output file
name. The second line has three parameters: the unsigned zone name (/etc/bind/db/example.com.db), the ZSK
file name, and the KSK file name. This also generates a plain-text file /etc/bind/db/example.com.signed.db,
which can be manually verified for correctness.

dnssec-signzone also produces keyset and dsset files. These are used to provide the parent zone administrators with
the DNSKEY records (or their corresponding DS records) that are the secure entry point to the zone.

By default, all zone keys which have an available private key are used to generate signatures. You can use the -S to only
include keys that have the “Activate” timing metadata in the past and the “Inactive” timing metadata in the future (or not
present).
Reloading the Zone
Now it is time to inform BIND that a new signed zonefile is available. We can do this with the rndc reload example.
com command.
Verifying That the Zone Is Signed Correctly
You should now check that the zone is signed. Follow the steps in Verification.
Uploading the DS Record to the Parent
As described in Uploading Information to the Parent Zone, we must now upload the new information to the parent zone.
The format of the information and how to generate it is described in Working With the Parent Zone, although it is important
to remember that you must use the contents of the KSK file that you generated above as part of the process.
The file dsset-example.com (created by dnssec-signzone when it signed the example.com zone) contains the
DS record for the zone’s KSK.
If not yet done so, you will need to pass that to the administrator of the parent zone, to be placed in the zone. When the
DS record is published in the parent zone, your zone is fully signed.
Checking That Your Zone Can Be Validated
Finally, follow the steps in How To Test Authoritative Zones to confirm that a query recognizes the zone as properly signed
and vouched for by the parent zone.
Re-signing the Zone
Since this is a manual process, you will need to re-sign periodically, as well as every time the zone data changes. You
will also need to manually roll the keys by adding and removing DNSKEY records (and interacting with the parent) at
the appropriate times.
So… What Now?
Once the zone is signed, it must be monitored as described in Maintenance Tasks. However, as the time approaches for a
key roll, you must create the new key. Of course, it is possible to create keys for the next fifty years all at once and set the
key times appropriately. Whether the increased risk in having the private key files for future keys available on disk offsets
the overhead of having to remember to create a new key before a rollover depends on your organization’s security policy.

#### 13.5.9 Offline KSK
For operational reasons, it is possible to keep the KSK offline. Doing so minimizes the risk of the key being compromised
through theft or loss.
This effectively means that the private keys of the KSKs and the ZSKs are located in two physically separate places. The
KSK is kept completely offline, and the ZSK is used in the primary DNS server to sign the zone data. The DNSKEY,
CDS, and CDNSKEY RRsets are signed separately by the KSK.
Because of this, CSKs are incompatible with Offline KSK.
To enable Offline KSK in BIND 9, add the following to the dnssec-policy configuration:

dnssec-policy "offline-ksk" {
offline-ksk yes;

With this configuration, BIND 9 will no longer generate signatures for the DNSKEY, CDS, and CDNSKEY RRsets, nor
will it generate keys for rollovers.
Before enabling Offline KSK, the keys and signed RRsets must be pregenerated. This can be done with the dnssec-ksr
program, which is used to create Signed Key Response (SKR) files that can be imported into BIND 9.
Creating SKR files is a four-step process. First, the ZSKs must be pregenerated; then, a Key Signing Request (KSR) is
created. This file is presented to the KSK operators to be signed. The result is a SKR file that is returned to the ZSK
operators, to be imported into the DNS server.
Pregenerating ZSKs
First we need to pregenerate ZSKs for the future. Let’s say we want to generate enough keys for the next two years; this
will create several key files, depending on the dnssec-policy used. If the ZSK lifetime is six months, this will create
about four keys (other timing metadata may cause an extra key to be generated).
This can be done with the dnssec-ksr program:
Kexample.net.+013+63278
Kexample.net.+013+13211
Kexample.net.+013+50958
Kexample.net.+013+12403

The timing metadata is set accordingly in the key files. Keys that already exist in the key-directory are taken into
consideration when pregenerating keys; if the above command is run multiple times quickly in succession, no additional
keys are generated.
Key Signing Request
Now that we have keys that can be published in the zone, we need to get signatures for the DNSKEY RRset to be used in
the future. For that, we generate a Key Signing Request (KSR). In this example, we are using the same DNSSEC policy
and interval.
;; KeySigningRequest 1.0 20240813133035 (Tue Aug 13 15:30:35 2024)
;; KeySigningRequest 1.0 20250215111826 (Sat Feb 15 12:18:26 2025)
example.net. 3600 IN DNSKEY 256 3 13 ph7zZ/
,→QgvwHuq2U1aYoMT3MqPUZYEq6y4qNwOb8uzurVISxL0XyhYH+Q ngEOV2ECgndMjn8e1ujH/d0H3cPX8A==
;; KeySigningRequest 1.0 20250225142826 (Tue Feb 25 15:28:26 2025)
example.net. 3600 IN DNSKEY 256 3 13 ph7zZ/
,→QgvwHuq2U1aYoMT3MqPUZYEq6y4qNwOb8uzurVISxL0XyhYH+Q ngEOV2ECgndMjn8e1ujH/d0H3cPX8A==

The output shows that the ZSK rollovers are pre-planned, which will result in a number of key bundles. Each bundle
contains a start time and the ZSKs that need to be published from that time.

The data needs to be stored in a file and can be handed over to the KSK operators, and can be secured by encryption
and/or digital signature.
Signed Key Response
The KSK operators receive a KSR file that contain ZSK sets for a given interval. By signing the KSR, a Signed Key
Response (SKR) is created that consists of numerous response bundles; for each bundle, the DNSKEY RRset needs to be
constructed by combining the records of the KSK and ZSKs. Then, a signature is generated for the constructed RRset.
In addition, the signed CDS and CDNSKEY RRsets are added.
Again the same interval and DNSSEC policy should be used. Below is the command for signing a KSR file “example.net.ksr”.
,→sign example.net
;; SignedKeyResponse 1.0 20240813134020 (Tue Aug 13 15:40:20 2024)
example.net. 3600 IN DNSKEY 257 3 13␣
,→vV2+6W+cFd3nn8eLrswUnhrPIxdgmslFWwF45MlCPIhjXIp6PpvaHC8k␣
,→Y2RH46UrbWINDEo7k5wqvUncakKhJw==
example.net. 3600 IN RRSIG DNSKEY 13 2 3600 20240827134020 20240813124020 6221␣
,→example.net. gkiw6M72Gi8XDu8XEAnPVR+AF4K7j1fApt2puLWgChayvaWrMPIbG2jP gvd/
,→RJiJSsdGBx4P3GYdNqfFskNKIA==
example.net. 3600 IN CDNSKEY 257 3 13␣
,→vV2+6W+cFd3nn8eLrswUnhrPIxdgmslFWwF45MlCPIhjXIp6PpvaHC8k␣
,→Y2RH46UrbWINDEo7k5wqvUncakKhJw==
example.net. 3600 IN RRSIG CDNSKEY 13 2 3600 20240827134020 20240813124020 6221␣
,→example.net. 1hAwRv2Nbkwfv8KWXdM9eBedgFZapECZJN4iTKj/yb50mjrPjK9JiQ92 m/
,→xSFUC6gRxMkoPnaULYs+3Qc/XqDA==
example.net. 3600 IN CDS 6221 13 2␣
,→A9EEDE51FA154B90259A1B8788D26C53C20AFE759D3B5FEA0349675A EEC0479D
example.net. 3600 IN RRSIG CDS 13 2 3600 20240827134020 20240813124020 6221 example.
,→net. TtbCbxTP4WEm5W8ZOdD3DgVlDSz0sdimm5YO28Bi+kP2ZVEM72A0B9QP␣
,→pCiXKrRjCLN2aguqNlRzupWiwb22cA==
;; SignedKeyResponse 1.0 20240822134020 (Thu Aug 22 15:40:20 2024)
example.net. 3600 IN DNSKEY 257 3 13␣
,→vV2+6W+cFd3nn8eLrswUnhrPIxdgmslFWwF45MlCPIhjXIp6PpvaHC8k␣
,→Y2RH46UrbWINDEo7k5wqvUncakKhJw==

The output is stored in a file and can be given back to the ZSK operators.
Importing the SKR
Now that we have an SKR file, it needs to be imported into the DNS server, via the rndc skr command. Let’s say the
SKR is stored in a file “example.net.skr”:

From now on, when it is time for a new signature for the DNSKEY, CDS, or CDNSKEY RRset, instead of it being
generated, it will be looked up in the SKR data.
When the SKR data is nearing the end of its lifetime, simply repeat the four-step process for the next period.

### 13.6 Basic DNSSEC Troubleshooting
In this chapter, we cover some basic troubleshooting techniques, some common DNSSEC symptoms, and their causes
and solutions. This is not a comprehensive “how to troubleshoot any DNS or DNSSEC problem” guide, because that
could easily be an entire book by itself.

#### 13.6.1 Query Path
The first step in troubleshooting DNS or DNSSEC should be to determine the query path. Whenever you are working
with a DNS-related issue, it is always a good idea to determine the exact query path to identify the origin of the problem.
End clients, such as laptop computers or mobile phones, are configured to talk to a recursive name server, and the recursive
name server may in turn forward requests on to other recursive name servers before arriving at the authoritative name
server. The giveaway is the presence of the Authoritative Answer (aa) flag in a query response: when present, we know
we are talking to the authoritative server; when missing, we are talking to a recursive server. The example below shows
an answer to a query for www.example.com without the Authoritative Answer flag:
$ dig @10.53.0.3 www.example.com A
; <<>> DiG 9.16.0 <<>> @10.53.0.3 www.example.com a
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 62714
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: c823fe302625db5b010000005e722b504d81bb01c2227259 (good)
;www.example.com.

60

10.1.0.1

;; Query time: 3 msec
;; WHEN: Wed Mar 18 14:08:16 GMT 2020
;; MSG SIZE rcvd: 88

Not only do we not see the aa flag, we see an ra flag, which indicates Recursion Available. This indicates that the server
we are talking to (10.53.0.3 in this example) is a recursive name server: although we were able to get an answer for
www.example.com, we know that the answer came from somewhere else.
If we query the authoritative server directly, we get:
$ dig @10.53.0.2 www.example.com A
; <<>> DiG 9.16.0 <<>> @10.53.0.2 www.example.com a
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39542
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

The aa flag tells us that we are now talking to the authoritative name server for www.example.com, and that this is not
a cached answer it obtained from some other name server; it served this answer to us right from its own database. In fact,
the Recursion Available (ra) flag is not present, which means this name server is not configured to perform recursion (at
least not for this client), so it could not have queried another name server to get cached results.

#### 13.6.2 Visible DNSSEC Validation Symptoms
After determining the query path, it is necessary to determine whether the problem is actually related to DNSSEC validation. You can use the dig +cd flag to disable validation, as described in How Do I Know I Have a Validation Problem?.
When there is indeed a DNSSEC validation problem, the visible symptoms, unfortunately, are very limited. With
DNSSEC validation enabled, if a DNS response is not fully validated, it results in a generic SERVFAIL message, as
shown below when querying against a recursive name server at 192.168.1.7:
$ dig @10.53.0.3 www.example.org. A
; <<>> DiG 9.16.0 <<>> @10.53.0.3 www.example.org A
;; ->>HEADER<<- opcode: QUERY, status: SERVFAIL, id: 28947
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: d1301968aca086ad010000005e723a7113603c01916d136b (good)
;www.example.org.
;; Query time: 3 msec
;; WHEN: Wed Mar 18 15:12:49 GMT 2020
;; MSG SIZE rcvd: 72

With delv , a “resolution failed” message is output instead:
$ delv @10.53.0.3 www.example.org. A +rtrace
;; fetch: www.example.org/A
;; resolution failed: SERVFAIL

BIND 9 logging features may be useful when trying to identify DNSSEC errors.

#### 13.6.3 Basic Logging
DNSSEC validation error messages show up in syslog as a query error by default. Here is an example of what it may
look like:
validating www.example.org/A: no valid signature found
RRSIG failed to verify resolving 'www.example.org/A/IN': 10.53.0.2#53

Usually, this level of error logging is sufficient. Debug logging, described in BIND DNSSEC Debug Logging, gives information on how to get more details about why DNSSEC validation may have failed.

#### 13.6.4 BIND DNSSEC Debug Logging
A word of caution: before you enable debug logging, be aware that this may dramatically increase the load on your name
servers. Enabling debug logging is thus not recommended for production servers.
With that said, sometimes it may become necessary to temporarily enable BIND debug logging to see more details of how
and whether DNSSEC is validating. DNSSEC-related messages are not recorded in syslog by default, even if query log
is enabled; only DNSSEC errors show up in syslog .
The example below shows how to enable debug level 3 (to see full DNSSEC validation messages) in BIND 9 and have it
sent to syslog :
channel dnssec_log {
syslog daemon;
severity debug 3;
print-category yes;
category dnssec { dnssec_log; };

The example below shows how to log DNSSEC messages to their own file (here, /var/log/dnssec.log):
channel dnssec_log {
file "/var/log/dnssec.log";
severity debug 3;
category dnssec { dnssec_log; };

After turning on debug logging and restarting BIND, a large number of log messages appear in syslog . The example
below shows the log messages as a result of successfully looking up and validating the domain name ftp.isc.org.
validating ./NS: starting
validating ./NS: attempting positive response validation
validating ./DNSKEY: starting
validating ./DNSKEY: attempting positive response validation
validating ./DNSKEY: verify rdataset (keyid=20326): success
validating ./DNSKEY: marking as secure (DS)
validating ./NS: in validator_callback_dnskey
validating ./NS: keyset with trust secure
validating ./NS: resuming validate
validating ./NS: verify rdataset (keyid=33853): success
validating ./NS: marking as secure, noqname proof not needed
validating ftp.isc.org/A: starting
validating ftp.isc.org/A: attempting positive response validation
validating isc.org/DNSKEY: starting
validating isc.org/DNSKEY: attempting positive response validation
validating isc.org/DS: starting
validating isc.org/DS: attempting positive response validation
validating org/DNSKEY: starting

validating org/DNSKEY: attempting positive response validation
validating org/DS: starting
validating org/DS: attempting positive response validation
validating org/DS: keyset with trust secure
validating org/DS: verify rdataset (keyid=33853): success
validating org/DS: marking as secure, noqname proof not needed
validating org/DNSKEY: in validator_callback_ds
validating org/DNSKEY: dsset with trust secure
validating org/DNSKEY: verify rdataset (keyid=9795): success
validating org/DNSKEY: marking as secure (DS)
validating isc.org/DS: in fetch_callback_dnskey
validating isc.org/DS: keyset with trust secure
validating isc.org/DS: resuming validate
validating isc.org/DS: verify rdataset (keyid=33209): success
validating isc.org/DS: marking as secure, noqname proof not needed
validating isc.org/DNSKEY: in validator_callback_ds
validating isc.org/DNSKEY: dsset with trust secure
validating isc.org/DNSKEY: verify rdataset (keyid=7250): success
validating isc.org/DNSKEY: marking as secure (DS)
validating ftp.isc.org/A: in fetch_callback_dnskey
validating ftp.isc.org/A: keyset with trust secure
validating ftp.isc.org/A: resuming validate
validating ftp.isc.org/A: verify rdataset (keyid=27566): success
validating ftp.isc.org/A: marking as secure, noqname proof not needed

Note that these log messages indicate that the chain of trust has been established and ftp.isc.org has been successfully
validated.
If validation had failed, you would see log messages indicating errors. We cover some of the most validation problems in
the next section.

#### 13.6.5 Common Problems
Security Lameness
Similar to lame delegation in traditional DNS, security lameness refers to the condition when the parent zone holds a
set of DS records that point to something that does not exist in the child zone. As a result, the entire child zone may
“disappear,” having been marked as bogus by validating resolvers.
Below is an example attempting to resolve the A record for a test domain name www.example.net. From the user’s
perspective, as described in How Do I Know I Have a Validation Problem?, only a SERVFAIL message is returned. On
the validating resolver, we see the following messages in syslog :
named[126063]: validating example.net/DNSKEY: no valid signature found (DS)
named[126063]: no valid RRSIG resolving 'example.net/DNSKEY/IN': 10.53.0.2#53
named[126063]: broken trust chain resolving 'www.example.net/A/IN': 10.53.0.2#53

This gives us a hint that it is a broken trust chain issue. Let’s take a look at the DS records that are published for the zone
(with the keys shortened for ease of display):
$ dig @10.53.0.3 example.net. DS
; <<>> DiG 9.16.0 <<>> @10.53.0.3 example.net DS

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 59602
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 7026d8f7c6e77e2a010000005e735d7c9d038d061b2d24da (good)
;example.net.
IN DS

256 IN

DS

14956 8 2 9F3CACD...D3E3A396

;; Query time: 0 msec
;; WHEN: Thu Mar 19 11:54:36 GMT 2020
;; MSG SIZE rcvd: 116

Next, we query for the DNSKEY and RRSIG of example.net to see if there’s anything wrong. Since we are having
trouble validating, we can use the dig +cd option to temporarily disable checking and return results, even though they
do not pass the validation tests. The dig +multiline option causes dig to print the type, algorithm type, and key id
for DNSKEY records. Again, some long strings are shortened for ease of display:
$ dig @10.53.0.3 example.net. DNSKEY +dnssec +cd +multiline
; <<>> DiG 9.16.0 <<>> @10.53.0.3 example.net DNSKEY +cd +multiline +dnssec
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 42980
;; flags: qr rd ra cd; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 4b5e7c88b3680c35010000005e73722057551f9f8be1990e (good)
;example.net.
287 IN DNSKEY 256 3 8 (
AwEAAbu3NX...ADU/D7xjFFDu+8WRIn
) ; ZSK; alg = RSASHA256 ; key id = 35328
287 IN DNSKEY 257 3 8 (
AwEAAbKtU1...PPP4aQZTybk75ZW+uL
6OJMAF63NO0s1nAZM2EWAVasbnn/X+J4N2rLuhk=
) ; KSK; alg = RSASHA256 ; key id = 27247
287 IN RRSIG DNSKEY 8 2 300 (
20811123173143 20180101000000 27247 example.net.
Fz1sjClIoF...YEjzpAWuAj9peQ== )
287 IN RRSIG DNSKEY 8 2 300 (
20811123173143 20180101000000 35328 example.net.

seKtUeJ4/l...YtDc1rcXTVlWIOw= )
;; Query time: 0 msec
;; WHEN: Thu Mar 19 13:22:40 GMT 2020
;; MSG SIZE rcvd: 962

Here is the problem: the parent zone is telling the world that example.net is using the key 14956, but the authoritative
server indicates that it is using keys 27247 and 35328. There are several potential causes for this mismatch: one possibility
is that a malicious attacker has compromised one side and changed the data. A more likely scenario is that the DNS
administrator for the child zone did not upload the correct key information to the parent zone.
Incorrect Time
In DNSSEC, every record comes with at least one RRSIG, and each RRSIG contains two timestamps: one indicating
when it becomes valid, and one when it expires. If the validating resolver’s current system time does not fall within the
two RRSIG timestamps, error messages appear in the BIND debug log.
The example below shows a log message when the RRSIG appears to have expired. This could mean the validating resolver
system time is incorrectly set too far in the future, or the zone administrator has not kept up with RRSIG maintenance.
validating example.com/DNSKEY: verify failed due to bad signature (keyid=19036):␣
,→RRSIG has expired

The log below shows that the RRSIG validity period has not yet begun. This could mean the validation resolver’s system
time is incorrectly set too far in the past, or the zone administrator has incorrectly generated signatures for this domain
validating example.com/DNSKEY: verify failed due to bad signature (keyid=4521): RRSIG␣
,→validity period has not begun

Unable to Load Keys
This is a simple yet common issue. If the key files are present but unreadable by named for some reason, the syslog
returns clear error messages, as shown below:
named[32447]: zone example.com/IN (signed): reconfiguring zone keys
named[32447]: dns_dnssec_findmatchingkeys: error reading key file Kexample.com.
,→+008+06817.private: permission denied
named[32447]: dns_dnssec_findmatchingkeys: error reading key file Kexample.com.
,→+008+17694.private: permission denied
named[32447]: zone example.com/IN (signed): next key event: 27-Nov-2014 20:04:36.521

However, if no keys are found, the error is not as obvious. Below shows the syslog messages after executing rndc
reload with the key files missing from the key directory:
named[32516]: received control channel command 'reload'
named[32516]: loading configuration from '/etc/bind/named.conf'
named[32516]: using default UDP/IPv4 port range: [1024, 65535]
named[32516]: using default UDP/IPv6 port range: [1024, 65535]
named[32516]: sizing zone task pool based on 6 zones
named[32516]: the working directory is not writable
named[32516]: reloading configuration succeeded

named[32516]: reloading zones succeeded
named[32516]: all zones loaded
named[32516]: running
named[32516]: zone example.com/IN (signed): reconfiguring zone keys
named[32516]: zone example.com/IN (signed): next key event: 27-Nov-2014 20:07:09.292

This happens to look exactly the same as if the keys were present and readable, and appears to indicate that named loaded
the keys and signed the zone. It even generates the internal (raw) files:
example.com.db example.com.db.jbk

example.com.db.signed

If named really loaded the keys and signed the zone, you should see the following files:
example.com.db example.com.db.jbk

example.com.db.signed

example.com.db.signed.jnl

So, unless you see the *.signed.jnl file, your zone has not been signed.
Invalid Trust Anchors
In most cases, you never need to explicitly configure trust anchors. named supplies the current root trust anchor and, with
the default setting of dnssec-validation, updates it on the infrequent occasions when it is changed.
However, in some circumstances you may need to explicitly configure your own trust anchor. As we saw in the Trust
Anchors section, whenever a DNSKEY is received by the validating resolver, it is compared to the list of keys the resolver
explicitly trusts to see if further action is needed. If the two keys match, the validating resolver stops performing further
verification and returns the answer(s) as validated.
But what if the key file on the validating resolver is misconfigured or missing? Below we show some examples of log
messages when things are not working properly.
First of all, if the key you copied is malformed, BIND does not even start and you will likely find this error message in
syslog:
named[18235]: /etc/bind/named.conf.options:29: bad base64 encoding
named[18235]: loading configuration: failure

If the key is a valid base64 string but the key algorithm is incorrect, or if the wrong key is installed, the first thing you
will notice is that virtually all of your DNS lookups result in SERVFAIL, even when you are looking up domain names
that have not been DNSSEC-enabled. Below shows an example of querying a recursive server 10.53.0.3:
$ dig @10.53.0.3 www.example.com. A
; <<>> DiG 9.16.0 <<>> @10.53.0.3 www.example.org A +dnssec
;; ->>HEADER<<- opcode: QUERY, status: SERVFAIL, id: 29586
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 1

; COOKIE: ee078fc321fa1367010000005e73a58bf5f205ca47e04bed (good)
;www.example.org.
delv shows a similar result:
$ delv @192.168.1.7 www.example.com. +rtrace
;; fetch: www.example.com/A
;; resolution failed: SERVFAIL

The next symptom you see is in the DNSSEC log messages:
managed-keys-zone: DNSKEY set for zone '.' could not be verified with current keys
validating ./DNSKEY: starting
validating ./DNSKEY: attempting positive response validation
validating ./DNSKEY: no DNSKEY matching DS
validating ./DNSKEY: no DNSKEY matching DS
validating ./DNSKEY: no valid signature found (DS)

These errors are indications that there are problems with the trust anchor.

#### 13.6.6 Negative Trust Anchors
BIND 9.11 introduced Negative Trust Anchors (NTAs) as a means to temporarily disable DNSSEC validation for a zone
when you know that the zone’s DNSSEC is misconfigured.
NTAs are added using the rndc command, e.g.:
$ rndc nta example.com
Negative trust anchor added: example.com/_default, expires 19-Mar-2020 19:57:42.000

The list of currently configured NTAs can also be examined using rndc, e.g.:
$ rndc nta -dump
example.com/_default: expiry 19-Mar-2020 19:57:42.000

The default lifetime of an NTA is one hour, although by default, BIND polls the zone every five minutes to see if the zone
correctly validates, at which point the NTA automatically expires. Both the default lifetime and the polling interval may
be configured via named.conf , and the lifetime can be overridden on a per-zone basis using the -lifetime duration
parameter to rndc nta. Both timer values have a permitted maximum value of one week.

#### 13.6.7 NSEC3 Troubleshooting
BIND includes a tool called nsec3hash that runs through the same steps as a validating resolver, to generate the correct
hashed name based on NSEC3PARAM parameters. The command takes the following parameters in order: salt, algorithm, iterations, and domain. For example, if the salt is 1234567890ABCDEF, hash algorithm is 1, and iteration is 10,
to get the NSEC3-hashed name for www.example.com we would execute a command like this:
$ nsec3hash 1234567890ABCEDF 1 10 www.example.com
RN7I9ME6E1I6BDKIP91B9TCE4FHJ7LKF (salt=1234567890ABCEDF, hash=1, iterations=10)

Zero-length salt can be specified as -.

While it is unlikely you would construct a rainbow table of your own zone data, this tool may be useful when troubleshooting NSEC3 problems.

### 13.7 Advanced Discussions
#### 13.7.1 Signature Validity Periods and Zone Re-Signing Intervals
In How Are Answers Verified?, we saw that record signatures have a validity period outside of which they are not valid.
This means that at some point, a signature will no longer be valid and a query for the associated record will fail DNSSEC
validation. But how long should a signature be valid for?
The maximum value for the validity period should be determined by the impact of a replay attack: if this is low, the
period can be long; if high, the period should be shorter. There is no “right” value, but periods of between a few days to
a month are common.
Deciding a minimum value is probably an easier task. Should something fail (e.g., a hidden primary distributing to
secondary servers that actually answer queries), how long will it take before the failure is noticed, and how long before it
is fixed? If you are a large 24x7 operation with operators always on-site, the answer might be less than an hour. In smaller
companies, if the failure occurs just after everyone has gone home for a long weekend, the answer might be several days.
Again, there are no “right” values - they depend on your circumstances. The signature validity period you decide to use
should be a value between the two bounds. At the time of this writing (mid-2020), the default policy used by BIND sets
a value of 14 days.
To keep the zone valid, the signatures must be periodically refreshed since they expire - i.e., the zone must be periodically
re-signed. The frequency of the re-signing depends on your network’s individual needs. For example, signing puts a load
on your server, so if the server is very highly loaded, a lower re-signing frequency is better. Another consideration is the
signature lifetime: obviously the intervals between signings must not be longer than the signature validity period. But
if you have set a signature lifetime close to the minimum (see above), the signing interval must be much shorter. What
would happen if the system failed just before the zone was re-signed?
Again, there is no single “right” answer; it depends on your circumstances. The BIND 9 default policy sets the signature
refresh interval to 5 days.

#### 13.7.2 Proof of Non-Existence (NSEC and NSEC3)
How do you prove that something does not exist? This zen-like question is an interesting one, and in this section we
provide an overview of how DNSSEC solves the problem.
Why is it even important to have authenticated denial of existence in DNS? Couldn’t we just send back “hey, what you
asked for does not exist,” and somehow generate a digital signature to go with it, proving it really is from the correct
authoritative source? Aside from the technical challenge of signing something that doesn’t exist, this solution has flaws,
one of which is it gives an attacker a way to create the appearance of denial of service by replaying this message on the
network.
Let’s use a little story, told three different ways, to illustrate how proof of nonexistence works. In our story, we run a
small company with three employees: Alice, Edward, and Susan. For reasons that are far too complicated to go into, they
don’t have email accounts; instead, email for them is sent to a single account and a nameless intern passes the message to
them. The intern has access to our private DNSSEC key to create signatures for their responses.
If we followed the approach of giving back the same answer no matter what was asked, when people emailed and asked
for the message to be passed to “Bob,” our intern would simply answer “Sorry, that person doesn’t work here” and sign
this message. This answer could be validated because our intern signed the response with our private DNSSEC key.
However, since the signature doesn’t change, an attacker could record this message. If the attacker were able to intercept
our email, when the next person emailed asking for the message to be passed to Susan, the attacker could return the exact
same message: “Sorry, that person doesn’t work here,” with the same signature. Now the attacker has successfully fooled

the sender into thinking that Susan doesn’t work at our company, and might even be able to convince all senders that no
one works at this company.
To solve this problem, two different solutions were created. We will look at the first one, NSEC, next.
The NSEC record is used to prove that something does not exist, by providing the name before it and the name after it.
Using our tiny company example, this would be analogous to someone sending an email for Bob and our nameless intern
responding with with: “I’m sorry, that person doesn’t work here. The name before the location where ‘Bob’ would be is
Alice, and the name after that is Edward.” Let’s say another email was received for a non-existent person, this time Oliver;
our intern would respond “I’m sorry, that person doesn’t work here. The name before the location where ‘Oliver’ would
be is Edward, and the name after that is Susan.” If another sender asked for Todd, the answer would be: “I’m sorry, that
person doesn’t work here. The name before the location where ‘Todd’ would be is Susan, and there are no other names
after that.”
So we end up with four NSEC records:
300 IN
alice.example.com. 300 IN
edward.example.com. 300 IN
susan.example.com. 300 IN

alice.example.com. A RRSIG NSEC
edward.example.com. A RRSIG NSEC
susan.example.com. A RRSIG NSEC
A RRSIG NSEC

What if the attacker tried to use the same replay method described earlier? If someone sent an email for Edward, none
of the four answers would fit. If attacker replied with message #2, “I’m sorry, that person doesn’t work here. The name
before it is Alice, and the name after it is Edward,” it is obviously false, since “Edward” is in the response; and the same
goes for #3, Edward and Susan. As for #1 and #4, Edward does not fall in the alphabetical range before Alice or after
Susan, so the sender can logically deduce that it was an incorrect answer.
When BIND signs your zone, the zone data is automatically sorted on the fly before generating NSEC records, much like
how a phone directory is sorted.
The NSEC record allows for a proof of non-existence for record types. If you ask a signed zone for a name that exists but
for a record type that doesn’t (for that name), the signed NSEC record returned lists all of the record types that do exist
for the requested domain name.
NSEC records can also be used to show whether a record was generated as the result of a wildcard expansion. The details
of this are not within the scope of this document, but are described well in RFC 7129.
Unfortunately, the NSEC solution has a few drawbacks, one of which is trivial “zone walking.” In our story, a curious
person can keep sending emails, and our nameless, gullible intern keeps divulging information about our employees.
Imagine if the sender first asked: “Is Bob there?” and received back the names Alice and Edward. Our sender could then
email again: “Is Edwarda there?”, and will get back Edward and Susan. (No, “Edwarda” is not a real name. However,
it is the first name alphabetically after “Edward” and that is enough to get the intern to reply with a message telling us
the next valid name after Edward.) Repeat the process enough times and the person sending the emails eventually learns
every name in our company phone directory. For many of you, this may not be a problem, since the very idea of DNS is
similar to a public phone book: if you don’t want a name to be known publicly, don’t put it in DNS! Consider using DNS
views (split DNS) and only display your sensitive names to a select audience.
The second potential drawback of NSEC is a bigger zone file and memory consumption; there is no opt-out mechanism
for insecure child zones, so each name in the zone will get an additional NSEC record and a RRSIG record to go with it.
In practice this is a problem only for parent-zone operators dealing with mostly insecure child zones, such as com.. To
learn more about opt-out, please see NSEC3 Opt-Out.

NSEC3
NSEC3 adds two additional features that NSEC does not have:
1. It offers no easy zone enumeration.
