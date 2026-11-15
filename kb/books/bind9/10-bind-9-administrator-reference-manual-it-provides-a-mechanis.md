---
id: bind9-10
title: "BIND 9 Administrator Reference Manual — It provides a mechanism for the parent zone to exclude insecure…",
slug: bind9-10-bind-9-administrator-reference-manual-it-provides-a-mechanis
source: "BIND 9 Administrator Reference Manual",
sourceSection: "2. It provides a mechanism for the parent zone to exclude insecure delegations (i.e., delegations to zones that are not, 600. IN DNSKEY 257 3 8 (, 6. Both DS records are shown. Click 'Save.', 300. IN DNSKEY 256 3 7 (, 300. IN DNSKEY 256 3 7 (, 300. IN NSEC aaa.example.com. NS SOA RRSIG NSEC DNSKEY,"
track: networking-dns,
tier: premium
tags: [dns, bind9, networking, infrastructure]
summary: "Recall that in NSEC we provided a range of names to prove that something does not exist. Covers 9 sections: It provides a mechanism for the parent zone to exclude insecure delegations (i.e., delegations to zones that are not, IN.",
---
# BIND 9 Administrator Reference Manual — It provides a mechanism for the parent zone to exclude insecure…

## 2. It provides a mechanism for the parent zone to exclude insecure delegations (i.e., delegations to zones that are not
signed) from the proof of non-existence.
Recall that in NSEC we provided a range of names to prove that something does not exist. But as it turns out, even
disclosing these ranges of names becomes a problem: this made it very easy for the curious-minded to look at our entire
zone. Not only that, unlike a zone transfer, this “zone walking” is more resource-intensive. So how do we disclose
something without actually disclosing it?
The answer is actually quite simple: hashing functions, or one-way hashes. Without going into many details, think of it
like a magical meat grinder. A juicy piece of ribeye steak goes in one end, and out comes a predictable shape and size of
ground meat (hash) with a somewhat unique pattern. No matter how hard you try, you cannot turn the ground meat back
into the ribeye steak: that’s what we call a one-way hash.
NSEC3 basically runs the names through a one-way hash before giving them out, so the recipients can verify the nonexistence without any knowledge of the other names in the zone.
So let’s tell our little story for the third time, this time with NSEC3. In this version, our intern is not given a list of actual
names; he is given a list of “hashed” names. So instead of Alice, Edward, and Susan, the list he is given reads like this
(hashes shortened for easier reading):
FSK5.... (produced from Edward)
JKMA.... (produced from Susan)
NTQ0.... (produced from Alice)

Then, an email is received for Bob again. Our intern takes the name Bob through a hash function, and the result is L8J2…,
so he replies: “I’m sorry, that person doesn’t work here. The name before that is JKMA…, and the name after that is
NTQ0…”. There, we proved Bob doesn’t exist, without giving away any names! To put that into proper NSEC3 resource
records, they would look like this (again, hashes shortened for ease of display):
FSK5....example.com. 300 IN NSEC3 1 0 0 JKMA....example.com. 300 IN NSEC3 1 0 0 NTQ0....example.com. 300 IN NSEC3 1 0 0 -

JKMA... A RRSIG
NTQ0... A RRSIG
FSK5... A RRSIG

Just because we employed one-way hash functions does not mean there is no way for a determined individual to figure
out our zone data.
Most names published in the DNS are rarely secret or unpredictable. They are published to be memorable, used and
consumed by humans. They are often recorded in many other network logs such as email logs, certificate transparency
logs, web page links, intrusion detection systems, malware scanners, email archives, etc. Many times a simple dictionary
of commonly used domain-name prefixes (www, mail, imap, login, database, etc.) can be used to quickly reveal a large
number of labels within a zone. Additionally, if an adversary really wants to expend significant CPU resources to mount
an offline dictionary attack on a zone’s NSEC3 chain, they will likely be able to find most of the “guessable” names despite
any level of hashing.
Also, it is still possible to gather all of our NSEC3 records and hashed names and perform an offline brute-force attack
by trying all possible combinations to figure out what the original name is. In our meat-grinder analogy, this would be
like someone buying all available cuts of meat and grinding them up at home using the same model of meat grinder, and
comparing the output with the meat you gave him. It is expensive and time-consuming (especially with real meat), but
like everything else in cryptography, if someone has enough resources and time, nothing is truly private forever. If you are

concerned about someone performing this type of attack on your zone data, use some of the special techniques described
in RFC 4470.
NSEC3PARAM

Before we dive into the details of NSEC3 parametrization, please note: the defaults should not be changed without a
strong justification and a full understanding of the potential impact. See RFC 9276.
The above NSEC3 examples used four parameters: 1, 0, 0, and zero-length salt. 1 represents the algorithm, 0 represents
the opt-out flag, 0 represents the number of additional iterations, and - is the salt. Let’s look at how each one can be
configured:
Algorithm
NSEC3 Hashing Algorithm
The only currently defined value is 1 for SHA-1, so there is no configuration field for it.
Opt-out
Setting this bit to 1 enables NSEC3 opt-out, which is discussed in NSEC3 Opt-Out.
Iterations
Iterations defines the number of _additional_ times to apply the algorithm when generating an NSEC3 hash. More
iterations consume more resources for both authoritative servers and validating resolvers. The considerations here
are similar to those seen in Key Sizes, of security versus resources.
Do not use values higher than zero. A value of zero provides one round of SHA-1 hashing and protects from
non-determined attackers.
A greater number of additional iterations causes interoperability problems and opens servers to CPU-exhausting
DoS attacks, while providing only doubtful security benefits.
Salt
A salt value, which can be combined with an FQDN to influence the resulting hash. Salt is discussed in more detail
in NSEC3 Salt.
NSEC3 Opt-Out
First things first: For most DNS administrators who do not manage a huge number of insecure delegations, the NSEC3
opt-out featuere is not relevant. See RFC 9276.
Opt-out allows for blocks of unsigned delegations to be covered by a single NSEC3 record. In other words, use of the
opt-out allows large registries to only sign as many NSEC3 records as there are signed DS or other RRsets in the zone;
with opt-out, unsigned delegations do not require additional NSEC3 records. This sacrifices the tamper-resistance proof
of non-existence offered by NSEC3 in order to reduce memory and CPU overheads, and decreases the effectiveness of
the cache (RFC 8198).
Why would that ever be desirable? If a significant number of delegations are not yet securely delegated, meaning they
lack DS records and are still insecure or unsigned, generating DNSSEC records for all their NS records might consume
lots of memory and is not strictly required by the child zones.
This resource-saving typically makes a difference only for huge zones like com.. Imagine that you are the operator of
busy top-level domains such as com., with millions of insecure delegated domain names. As of mid-2022, around 3% of

all com. zones are signed. Basically, without opt-out, with 1,000,000 delegations, only 30,000 of which are secure, you
still have to generate NSEC RRsets for the other 970,000 delegations; with NSEC3 opt-out, you will have saved yourself
970,000 sets of records.
In contrast, for a small zone the difference is operationally negligible and the drawbacks outweigh the benefits.
If NSEC3 opt-out is truly essential for a zone, the following configuration can be added to dnssec-policy ; for example,
to create an NSEC3 chain using the SHA-1 hash algorithm, with the opt-out flag, no additional iterations, and no extra
salt, use:
dnssec-policy "nsec3" {
nsec3param iterations 0 optout yes salt-length 0;

To learn more about how to configure NSEC3 opt-out, please see NSEC3 Opt-Out.
NSEC3 Salt

Contrary to popular belief, adding salt provides little value. Each DNS zone is always uniquely salted using the zone
name. Operators should use a zero-length salt value.
The properties of this extra salt are complicated and beyond scope of this document. For detailed description why the
salt in the context of DNSSEC provides little value please see RFC 9276.
NSEC or NSEC3?
So which is better: NSEC or NSEC3? There is no single right answer here that fits everyone; it comes down to a given
network’s needs or requirements.
In most cases, NSEC is a good choice for zone administrators. It relieves the authoritative servers and resolver of the
additional cryptographic operations that NSEC3 requires, and NSEC is comparatively easier to troubleshoot than NSEC3.
NSEC3 comes with many drawbacks and should be implemented only if zone enumeration prevention is really needed,
or when opt-out provides a significant reduction in memory and CPU overheads (in other words, with a huge zone with
mostly insecure delegations).

#### 13.7.3 DNSSEC Keys
Types of Keys
Although DNSSEC documentation talks about three types of keys, they are all the same thing - but they have different
roles. The roles are:
Zone-Signing Key (ZSK)
This is the key used to sign the zone. It signs all records in the zone apart from the DNSSEC key-related RRsets:
DNSKEY, CDS, and CDNSKEY.
Key-Signing Key (KSK)
This is the key used to sign the DNSSEC key-related RRsets and is the key used to link the parent and child zones.
The parent zone stores a digest of the KSK. When a resolver verifies the chain of trust it checks to see that the
DS record in the parent (which holds the digest of a key) matches a key in the DNSKEY RRset, and that it is able
to use that key to verify the DNSKEY RRset. If it can do that, the resolver knows that it can trust the DNSKEY
resource records, and so can use one of them to validate the other records in the zone.

Combined Signing Key (CSK)
A CSK combines the functionality of a ZSK and a KSK. Instead of having one key for signing the zone and one
for linking the parent and child zones, a CSK is a single key that serves both roles.
It is important to realize the terms ZSK, KSK, and CSK describe how the keys are used - all these keys are represented
by DNSKEY records. The following examples are the DNSKEY records from a zone signed with a KSK and ZSK:
$ dig @192.168.1.12 example.com DNSKEY
; <<>> DiG 9.16.0 <<>> @192.168.1.12 example.com dnskey +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54989
;; flags: qr aa rd; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: 5258d7ed09db0d76010000005ea1cc8c672d8db27a464e37 (good)
60 IN DNSKEY 256 3 13 (
tAeXLtIQ3aVDqqS/1UVRt9AE6/nzfoAuaT1Vy4dYl2CK
pLNcUJxME1Z//pnGXY+HqDU7Gr5HkJY8V0W3r5fzlw==
) ; ZSK; alg = ECDSAP256SHA256 ; key id = 63722
60 IN DNSKEY 257 3 13 (
cxkNegsgubBPXSra5ug2P8rWy63B8jTnS4n0IYSsD9eW
VhiyQDmdgevKUhfG3SE1wbLChjJc2FAbvSZ1qk03Nw==
) ; KSK; alg = ECDSAP256SHA256 ; key id = 42933

… and a zone signed with just a CSK:
$ dig @192.168.1.13 example.com DNSKEY
; <<>> DiG 9.16.0 <<>> @192.168.1.13 example.com dnskey +multiline
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 22628
;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1
; COOKIE: bf19ee914b5df46e010000005ea1cd02b66c06885d274647 (good)
60 IN DNSKEY 257 3 13 (
p0XM6AJ68qid2vtOdyGaeH1jnrdk2GhZeVvGzXfP/PNa

71wGtzR6jdUrTbXo5Z1W5QeeJF4dls4lh4z7DByF5Q==
) ; KSK; alg = ECDSAP256SHA256 ; key id = 1231

The only visible difference between the records (apart from the key data itself) is the value of the flags fields; this is 256
for a ZSK and 257 for a KSK or CSK. Even then, the flags field is only a hint to the software using it as to the role of the
key: zones can be signed by any key. The fact that a CSK and KSK both have the same flags emphasizes this. A KSK
usually only signs the DNSSEC key-related RRsets in a zone, whereas a CSK is used to sign all records in the zone.
The original idea of separating the function of the key into a KSK and ZSK was operational. With a single key, changing
it for any reason is “expensive,” as it requires interaction with the parent zone (e.g., uploading the key to the parent may
require manual interaction with the organization running that zone). By splitting it, interaction with the parent is required
only if the KSK is changed; the ZSK can be changed as often as required without involving the parent.
The split also allows the keys to be of different lengths. So the ZSK, which is used to sign the record in the zone, can
be of a (relatively) short length, lowering the load on the server. The KSK, which is used only infrequently, can be of a
much longer length. The relatively infrequent use also allows the private part of the key to be stored in a way that is more
secure but that may require more overhead to access, e.g., on an HSM (see Hardware Security Modules (HSMs)).
In the early days of DNSSEC, the idea of splitting the key went more or less unchallenged. However, with the advent of
more powerful computers and the introduction of signaling methods between the parent and child zones (see The CDS
and CDNSKEY Resource Records), the advantages of a ZSK/KSK split are less clear and, for many zones, a single key is
all that is required.
As with many questions related to the choice of DNSSEC policy, the decision on which is “best” is not clear and depends
on your circumstances.
Which Algorithm?
There are three algorithm choices for DNSSEC as of this writing (mid-2020):
- RSA
- Elliptic Curve DSA (ECDSA)
- Edwards Curve Digital Security Algorithm (EdDSA)
All are supported in BIND 9, but only RSA and ECDSA (specifically RSASHA256 and ECDSAP256SHA256) are
mandatory to implement in DNSSEC. However, RSA is a little long in the tooth, and ECDSA/EdDSA are emerging as
the next new cryptographic standards. In fact, the US federal government recommended discontinuing RSA use altogether
by September 2015 and migrating to using ECDSA or similar algorithms.
For now, use ECDSAP256SHA256 but keep abreast of developments in this area. For details about rolling over
DNSKEYs to a new algorithm, see Algorithm Rollovers.
Key Sizes
If using RSA keys, the choice of key sizes is a classic issue of finding the balance between performance and security.
The larger the key size, the longer it takes for an attacker to crack the key; but larger keys also mean more resources are
needed both when generating signatures (authoritative servers) and verifying signatures (recursive servers).
Of the two sets of keys, ZSK is used much more frequently. ZSK is used whenever zone data changes or when signatures
expire, so performance certainly is of a bigger concern. As for KSK, it is used less frequently, so performance is less of
a factor, but its impact is bigger because of its role in signing other keys.
In earlier versions of this guide, the following key lengths were chosen for each set, with the recommendation that they
be rotated more frequently for better security:
- ZSK: RSA 1024 bits, rollover every year
- KSK: RSA 2048 bits, rollover every five years

These should be considered minimum RSA key sizes. At the time of this writing (mid-2020), the root zone and many
TLDs are already using 2048 bit ZSKs. If you choose to implement larger key sizes, keep in mind that larger key sizes
result in larger DNS responses, which this may mean more load on network resources. Depending on your network
configuration, end users may even experience resolution failures due to the increased response sizes, as discussed in
What’s EDNS All About (And Why Should I Care)?.
ECDSA key sizes can be much smaller for the same level of security, e.g., an ECDSA key length of 224 bits provides the
same level of security as a 2048-bit RSA key. Currently BIND 9 sets a key size of 256 for all ECDSA keys.
Key Storage
Public Key Storage
The beauty of a public key cryptography system is that the public key portion can and should be distributed to as many
people as possible. As the administrator, you may want to keep the public keys on an easily accessible file system for
operational ease, but there is no need to securely store them, since both ZSK and KSK public keys are published in the
zone data as DNSKEY resource records.
Additionally, a hash of the KSK public key is also uploaded to the parent zone (see Working With the Parent Zone for
more details), and is published by the parent zone as DS records.
Private Key Storage
Ideally, private keys should be stored offline, in secure devices such as a smart card. Operationally, however, this creates
certain challenges, since the private key is needed to create RRSIG resource records, and it is a hassle to bring the private
key out of storage every time the zone file changes or signatures expire.
A common approach to strike the balance between security and practicality is to have two sets of keys: a ZSK set and
a KSK set. A ZSK private key is used to sign zone data, and can be kept online for ease of use, while a KSK private
key is used to sign just the DNSKEY (the ZSK); it is used less frequently, and can be stored in a much more secure and
restricted fashion.
For example, a KSK private key stored on a USB flash drive that is kept in a fireproof safe, only brought online once a
year to sign a new pair of ZSKs, combined with a ZSK private key stored on the network file system and available for
routine use, may be a good balance between operational flexibility and security.
For more information on changing keys, please see Key Rollovers.
Hardware Security Modules (HSMs)
A Hardware Security Module (HSM) may come in different shapes and sizes, but as the name indicates, it is a physical
device or devices, usually with some or all of the following features:
- Tamper-resistant key storage
- Strong random-number generation
- Hardware for faster cryptographic operations
Most organizations do not incorporate HSMs into their security practices due to cost and the added operational complexity.
BIND supports Public Key Cryptography Standard #11 (PKCS #11) for communication with HSMs and other cryptographic support devices. For more information on how to configure BIND to work with an HSM, please refer to the

#### 13.7.4 Rollovers
Key Rollovers
A key rollover is where one key in a zone is replaced by a new one. There are arguments for and against regularly rolling
keys. In essence these are:
Pros:
1. Regularly changing the key hinders attempts at determination of the private part of the key by cryptanalysis of
signatures.
2. It gives administrators practice at changing a key; should a key ever need to be changed in an emergency, they
would not be doing it for the first time.
Cons:
1. A lot of effort is required to hack a key, and there are probably easier ways of obtaining it, e.g., by breaking into
the systems on which it is stored.
2. Rolling the key adds complexity to the system and introduces the possibility of error. We are more likely to have
an interruption to our service than if we had not rolled it.
Whether and when to roll the key is up to you. How serious would the damage be if a key were compromised without
you knowing about it? How serious would a key roll failure be?
Before going any further, it is worth noting that if you sign your zone with dnssec-policy , you don’t really need to
concern yourself with the details of a key rollover: BIND 9 takes care of it all for you. If you are doing a manual key roll,
you do need to familiarize yourself with the various steps involved and the timing details.
Rolling a key is not as simple as replacing the DNSKEY statement in the zone. That is an essential part of it, but timing
is everything. For example, suppose that we run the example.com zone and that a friend queries for the AAAA record
of www.example.com. As part of the resolution process (described in How Does DNSSEC Change DNS Lookup?), their
recursive server looks up the keys for the example.com zone and uses them to verify the signature associated with the
AAAA record. We’ll assume that the records validated successfully, so they can use the address to visit example.com’s
website.
Let’s also assume that immediately after the lookup, we want to roll the ZSK for example.com. Our first attempt at
this is to remove the old DNSKEY record and signatures, add a new DNSKEY record, and re-sign the zone with it. So
one minute our server is serving the old DNSKEY and records signed with the old key, and the next minute it is serving
the new key and records signed with it. We’ve achieved our goal - we are serving a zone signed with the new keys; to
check this is really the case, we booted up our laptop and looked up the AAAA record ftp.example.com. The lookup
succeeded so all must be well. Or is it? Just to be sure, we called our friend and asked them to check. They tried to
lookup ftp.example.com but got a SERVFAIL response from their recursive server. What’s going on?
The answer, in a word, is “caching.” When our friend looked up www.example.com, their recursive server retrieved
and cached not only the AAAA record, but also a lot of other records. It cached the NS records for com and example.
com, as well as the AAAA (and A) records for those name servers (and this action may, in turn, have caused the lookup
and caching of other NS and AAAA/A records). Most importantly for this example, it also looked up and cached the
DNSKEY records for the root, com, and example.com zones. When a query was made for ftp.example.com, the
recursive server believed it already had most of the information we needed. It knew what nameservers served example.
com and their addresses, so it went directly to one of those to get the AAAA record for ftp.example.com and its
associated signature. But when it tried to validate the signature, it used the cached copy of the DNSKEY, and that is
when our friend had the problem. Their recursive server had a copy of the old DNSKEY in its cache, but the AAAA
record for ftp.example.com was signed with the new key. So, not surprisingly, the signature could not validate.
How should we roll the keys for example.com? A clue to the answer is to note that the problem came about because the DNSKEY records were cached by the recursive server. What would have happened had our friend flushed the
DNSKEY records from the recursive server’s cache before making the query? That would have worked; those records
would have been retrieved from example.com’s nameservers at the same time that we retrieved the AAAA record for

ftp.example.com. Our friend’s server would have obtained the new key along with the AAAA record and associated

signature created with the new key, and all would have been well.
As it is obviously impossible for us to notify all recursive server operators to flush our DNSKEY records every time we
roll a key, we must use another solution. That solution is to wait for the recursive servers to remove old records from
caches when they reach their TTL. How exactly we do this depends on whether we are trying to roll a ZSK, a KSK, or a
CSK.
ZSK Rollover Methods
The ZSK can be rolled in one of the following two ways:
1. Pre-Publication: Publish the new ZSK into zone data before it is actually used. Wait at least one TTL interval, so
the world’s recursive servers know about both keys, then stop using the old key and generate a new RRSIG using
the new key. Wait at least another TTL, so the cached old key data is expunged from the world’s recursive servers,
and then remove the old key.
The benefit of the pre-publication approach is it does not dramatically increase the zone size; however, the duration
of the rollover is longer. If insufficient time has passed after the new ZSK is published, some resolvers may only
have the old ZSK cached when the new RRSIG records are published, and validation may fail. This is the method
described in ZSK Rollover.
2. Double-Signature: Publish the new ZSK and new RRSIG, essentially doubling the size of the zone. Wait at least
one TTL interval, and then remove the old ZSK and old RRSIG.
The benefit of the double-signature approach is that it is easier to understand and execute, but it causes a significantly
increased zone size during a rollover event.
KSK Rollover Methods
Rolling the KSK requires interaction with the parent zone, so operationally this may be more complex than rolling ZSKs.
There are three methods of rolling the KSK:
1. Double-KSK: Add the new KSK to the DNSKEY RRset, which is then signed with both the old and new keys. After
waiting for the old RRset to expire from caches, change the DS record in the parent zone. After waiting a further
TTL interval for this change to be reflected in caches, remove the old key from the RRset.
Basically, the new KSK is added first at the child zone and used to sign the DNSKEY; then the DS record is changed,
followed by the removal of the old KSK. Double-KSK keeps the interaction with the parent zone to a minimum,
but for the duration of the rollover, the size of the DNSKEY RRset is increased.
2. Double-DS: Publish the new DS record. After waiting for this change to propagate into caches, change the KSK.
After a further TTL interval during which the old DNSKEY RRset expires from caches, remove the old DS record.
Double-DS is the reverse of Double-KSK: the new DS is published at the parent first, then the KSK at the child is
updated, then the old DS at the parent is removed. The benefit is that the size of the DNSKEY RRset is kept to a
minimum, but interactions with the parent zone are increased to two events. This is the method described in KSK
Rollover.
3. Double-RRset: Add the new KSK to the DNSKEY RRset, which is then signed with both the old and new key, and
add the new DS record to the parent zone. After waiting a suitable interval for the old DS and DNSKEY RRsets
to expire from caches, remove the old DNSKEY and old DS record.
Double-RRset is the fastest way to roll the KSK (i.e., it has the shortest rollover time), but has the drawbacks of
both of the other methods: a larger DNSKEY RRset and two interactions with the parent.

CSK Rollover Methods
Rolling the CSK is more complex than rolling either the ZSK or KSK, as the timing constraints relating to both the
parent zone and the caching of records by downstream recursive servers must be taken into account. There are numerous
possible methods that are a combination of ZSK rollover and KSK rollover methods. BIND 9 automatic signing uses a
combination of ZSK Pre-Publication and Double-KSK rollover.
Emergency Key Rollovers
Keys are generally rolled on a regular schedule - if you choose to roll them at all. But sometimes, you may have to rollover
keys out-of-schedule due to a security incident. The aim of an emergency rollover is to re-sign the zone with a new key
as soon as possible, because when a key is suspected of being compromised, a malicious attacker (or anyone who has
access to the key) could impersonate your server and trick other validating resolvers into believing that they are receiving
authentic, validated answers.
During an emergency rollover, follow the same operational procedures described in Rollovers, with the added task of reducing the TTL of the current active (potentially compromised) DNSKEY RRset, in an attempt to phase out the compromised key faster before the new key takes effect. The time frame should be significantly reduced from the 30-days-apart
example, since you probably do not want to wait up to 60 days for the compromised key to be removed from your zone.
Another method is to carry a spare key with you at all times. If you have a second key pre-published and that one is not
compromised at the same time as the first key, you could save yourself some time by immediately activating the spare key
if the active key is compromised. With pre-publication, all validating resolvers should already have this spare key cached,
thus saving you some time.
With a KSK emergency rollover, you also need to consider factors related to your parent zone, such as how quickly they
can remove the old DS records and publish the new ones.
As with many other facets of DNSSEC, there are multiple aspects to take into account when it comes to emergency key
rollovers. For more in-depth considerations, please check out RFC 7583.
Algorithm Rollovers
From time to time, new digital signature algorithms with improved security are introduced, and it may be desirable for
administrators to roll over DNSKEYs to a new algorithm, e.g., from RSASHA1 (algorithm 5 or 7) to RSASHA256
(algorithm 8). The algorithm rollover steps must be followed with care to avoid breaking DNSSEC validation.
If you are managing DNSSEC by using the dnssec-policy configuration, named handles these steps for you. Simply
change the algorithm for the relevant keys, and named uses the new algorithm when the key is next rolled. It performs a
smooth transition to the new algorithm, ensuring that the zone remains valid throughout rollover.

#### 13.7.5 Other Topics
DNSSEC and Dynamic Updates
Dynamic DNS (DDNS) is actually independent of DNSSEC. DDNS provides a mechanism, separate from editing the
zone file or zone database, to edit DNS data. Most DNS clients and servers are able to handle dynamic updates, and
DDNS can also be integrated as part of your DHCP environment.
When you have both DNSSEC and dynamic updates in your environment, updating zone data works the same way as
with traditional (insecure) DNS: you can use rndc freeze before editing the zone file, and rndc thaw when you have
finished editing, or you can use the command nsupdate to add, edit, or remove records like this:
$ nsupdate
> server 192.168.1.13
> update add xyz.example.com. 300 IN A 1.1.1.1
> send
> quit

The examples provided in this guide make named automatically re-sign the zone whenever its content has changed. If
you decide to sign your own zone file manually, you need to remember to execute the dnssec-signzone command
whenever your zone file has been updated.
As far as system resources and performance are concerned, be mindful that with a DNSSEC zone that changes frequently,
every time the zone changes your system is executing a series of cryptographic operations to (re)generate signatures and
NSEC or NSEC3 records.
DNSSEC on Private Networks
Let’s clarify what we mean: in this section, “private networks” really refers to a private or internal DNS view. Most DNS
products offer the ability to have different versions of DNS answers, depending on the origin of the query. This feature is
often called “DNS views” or “split DNS,” and is most commonly implemented as an “internal” versus an “external” setup.
For instance, your organization may have a version of example.com that is offered to the world, and its names most
likely resolve to publicly reachable IP addresses. You may also have an internal version of example.com that is only
accessible when you are on the company’s private networks or via a VPN connection. These private networks typically
fall under 10.0.0.0/8, 172.16.0.0/12, or 192.168.0.0/16 for IPv4.
So what if you want to offer DNSSEC for your internal version of example.com? This can be done: the golden rule is
to use the same key for both the internal and external versions of the zones. This avoids problems that can occur when
machines (e.g., laptops) move between accessing the internal and external zones, when it is possible that they may have
cached records from the wrong zone.
Introduction to DANE
With your DNS infrastructure secured with DNSSEC, information can now be stored in DNS and its integrity and authenticity can be proved. One of the new features that takes advantage of this is the DNS-Based Authentication of Named
Entities, or DANE. This improves security in a number of ways, including:
- The ability to store self-signed X.509 certificates and bypass having to pay a third party (such as a Certificate
Authority) to sign the certificates (RFC 6698).
- Improved security for clients connecting to mail servers (RFC 7672).
- A secure way of getting public PGP keys (RFC 7929).

#### 13.7.6 Disadvantages of DNSSEC
DNSSEC, like many things in this world, is not without its problems. Below are a few challenges and disadvantages that
DNSSEC faces.
1. Increased, well, everything: With DNSSEC, signed zones are larger, thus taking up more disk space; for DNSSECaware servers, the additional cryptographic computation usually results in increased system load; and the network
packets are bigger, possibly putting more strains on the network infrastructure.
2. Different security considerations: DNSSEC addresses many security concerns, most notably cache poisoning. But
at the same time, it may introduce a set of different security considerations, such as amplification attack and zone
enumeration through NSEC. These concerns are still being identified and addressed by the Internet community.
3. More complexity: If you have read this far, you have probably already concluded this yourself. With additional
resource records, keys, signatures, and rotations, DNSSEC adds many more moving pieces on top of the existing
DNS machine. The job of the DNS administrator changes, as DNS becomes the new secure repository of everything
from spam avoidance to encryption keys, and the amount of work involved to troubleshoot a DNS-related issue
becomes more challenging.
4. Increased fragility: The increased complexity means more opportunities for things to go wrong. Before DNSSEC,
DNS was essentially “add something to the zone and forget it.” With DNSSEC, each new component - re-signing,
key rollover, interaction with parent zone, key management - adds more opportunity for error. It is entirely possible

that a failure to validate a name may come down to errors on the part of one or more zone operators rather than
the result of a deliberate attack on the DNS.
5. New maintenance tasks: Even if your new secure DNS infrastructure runs without any hiccups or security breaches,
it still requires regular attention, from re-signing to key rollovers. While most of these can be automated, some of
the tasks, such as KSK rollover, remain manual for the time being.
6. Not enough people are using it today: While it’s estimated (as of mid-2020) that roughly 30% of the global Internet
DNS traffic is validating,7 that doesn’t mean that many of the DNS zones are actually signed. What this means is,
even if your company’s zone is signed today, fewer than 30% of the Internet’s servers are taking advantage of this
extra security. It gets worse: with less than 1.5% of the com. domains signed, even if your DNSSEC validation is
enabled today, it’s not likely to buy you or your users a whole lot more protection until these popular domain names
decide to sign their zones.
The last point may have more impact than you realize. Consider this: HTTP and HTTPS make up the majority of
traffic on the Internet. While you may have secured your DNS infrastructure through DNSSEC, if your web hosting is
outsourced to a third party that does not yet support DNSSEC in its own domain, or if your web page loads contents
and components from insecure domains, end users may experience validation problems when trying to access your web
page. For example, although you may have signed the zone company.com, the web address www.company.com may
actually be a CNAME to foo.random-cloud-provider.com. As long as random-cloud-provider.com remains
an insecure DNS zone, users cannot fully validate everything when they visit your web page and could be redirected
elsewhere by a cache poisoning attack.

### 13.8 Recipes
This chapter provides step-by-step “recipes” for some common DNSSEC configurations.

#### 13.8.1 DNSSEC Signing
There are two recipes here: the first shows an example using DNSSEC signing on the primary server, which has been
covered in this guide; the second shows how to setup a “bump in the wire” between a hidden primary and the secondary
servers to seamlessly sign the zone “on the fly.”
Primary Server DNSSEC Signing
In this recipe, our servers are illustrated as shown in DNSSEC Signing Recipe #1: we have a primary server (192.168.1.1)
and three secondary servers (192.168.1.2, 192.168.1.3, and 192.168.1.4) that receive zone transfers. To get the zone
signed, we need to reconfigure the primary server. Once reconfigured, a signed version of the zone is generated on the
fly; zone transfers take care of synchronizing the signed zone data to all secondary name servers, without configuration or
software changes on them.
Using the method described in Easy-Start Guide for Signing Authoritative Zones, we just need to add a dnssec-policy
statement to the relevant zone clause. This is what the named.conf zone statement looks like on the primary server,
192.168.1.1:
key-directory "keys/example.com";
allow-transfer { 192.168.1.2; 192.168.1.3; 192.168.1.4; };
7 Based on APNIC statistics at https://stats.labs.apnic.net/dnssec/XA

Fig. 5: DNSSEC Signing Recipe #1
We have chosen to use the default policy, storing the keys generated for the zone in the directory keys/example.com.
To use a custom policy, define the policy in the configuration file and select it in the zone statement (as described in
Creating a Custom DNSSEC Policy).
On the secondary servers, named.conf does not need to be updated, and it looks like this:
primaries { 192.168.1.1; };

In fact, the secondary servers do not even need to be running BIND; they can run any DNS product that supports DNSSEC.
“Bump in the Wire” Signing
In this recipe, we take advantage of the power of automated signing by placing an additional name server (192.168.1.5)
between the hidden primary (192.168.1.1) and the DNS secondaries (192.168.1.2, 192.168.1.3, and 192.168.1.4). The
additional name server, 192.168.1.5, acts as a “bump in the wire,” taking an unsigned zone from the hidden primary, and
sending out signed data on the other end to the secondary name servers. The steps described in this recipe may be used as
part of a DNSSEC deployment strategy, since it requires only minimal changes made to the existing hidden DNS primary
and DNS secondaries.

Fig. 6: DNSSEC Signing Recipe #2
It is important to remember that 192.168.1.1 in this case is a hidden primary not exposed to the world, and it must not
be listed in the NS RRset. Otherwise the world will get conflicting answers: unsigned answers from the hidden primary
and signed answers from the other name servers.

The only configuration change needed on the hidden primary, 192.168.1.1, is to make sure it allows our middle box to
perform a zone transfer:
allow-transfer { 192.168.1.5; };

On the middle box, 192.168.1.5, all the tasks described in Easy-Start Guide for Signing Authoritative Zones still need to
be performed, such as generating key pairs and uploading information to the parent zone. This server is configured as
secondary to the hidden primary 192.168.1.1 to receive the unsigned data; then, using keys accessible to this middle box,
to sign data on the fly; and finally, to send out the signed data via zone transfer to the other three DNS secondaries. Its
named.conf zone statement looks like this:
zone example.com {
primaries { 192.168.1.1; };
key-directory "keys/example.com";
allow-transfer { 192.168.1.2; 192.168.1.3; 192.168.1.4; };

(As before, the default policy has been selected here. See Creating a Custom DNSSEC Policy for instructions on how to
define and use a custom policy.)
Finally, on the three secondary servers, the configuration should be updated to receive a zone transfer from 192.168.1.5
(the middle box) instead of from 192.168.1.1 (the hidden primary). If using BIND, the named.conf file looks like this:
primaries { 192.168.1.5; };

#### 13.8.2 Rollovers
If you are signing your zone using a dnssec-policy statement, this section is not really relevant to you. In the policy
statement, you set how long you want your keys to be valid for, the time taken for information to propagate through your
zone, the time it takes for your parent zone to register a new DS record, etc., and that’s more or less it. named implements
everything for you automatically, apart from uploading the new DS records to your parent zone - which is covered in
Uploading Information to the Parent Zone. (Some screenshots from a session where a KSK is uploaded to the parent
zone are presented here for convenience.) However, these recipes may be useful in describing what happens through the
rollover process and what you should be monitoring.
ZSK Rollover
This recipe covers how to perform a ZSK rollover using what is known as the Pre-Publication method. For other ZSK
rolling methods, please see ZSK Rollover Methods in Advanced Discussions.
Below is a sample timeline for a ZSK rollover to occur on January 1, 2021:
1. December 1, 2020 (one month before rollover)
- Generate new ZSK

- Add DNSKEY for new ZSK to zone
2. January 1, 2021 (day of rollover)
- New ZSK used to replace RRSIGs for the bulk of the zone
3. February 1, 2021 (one month after rollover)
- Remove old ZSK DNSKEY RRset from zone
- DNSKEY signatures made with KSK are changed
The current active ZSK has the ID 17694 in the example below. For more information on key management and rollovers,
please see Rollovers.
One Month Before ZSK Rollover
On December 1, 2020, a month before the example rollover, you (as administrator) should change the parameters on the
current key (17694). Set it to become inactive on January 1, 2021 and be deleted from the zone on February 1, 2021;
also, generate a successor key (51623):
./Kexample.com.+008+17694.key/GoDaddy
./Kexample.com.+008+17694.private
Kexample.com.+008+51623

The first command gets us into the key directory /etc/bind/keys/example.com/, where keys for example.com
are stored.
The second, dnssec-settime, sets an inactive (-I) date of January 1, 2021, and a deletion (-D) date of February 1,
2021, for the current ZSK (Kexample.com.+008+17694).
The third command, dnssec-keygen, creates a successor key, using the exact same parameters (algorithms, key sizes,
etc.) as the current ZSK. The new ZSK created in our example is Kexample.com.+008+51623.
Make sure the successor keys are readable by named.
named ’s logging messages indicate when the next key checking event is scheduled to occur, the frequency of which can
be controlled by dnssec-loadkeys-interval. The log message looks like this:
zone example.com/IN (signed): next key event: 01-Dec-2020 00:13:05.385

And you can check the publish date of the key by looking at the key file:
; This is a zone-signing key, keyid 11623, for example.com.
; Created: 20201130160024 (Mon Dec 1 00:00:24 2020)
; Publish: 20201202000000 (Fri Dec 2 08:00:00 2020)
; Activate: 20210101000000 (Sun Jan 1 08:00:00 2021)

Since the publish date is set to the morning of December 2, and our example scenario takes place on December 1, the
next morning you will notice that your zone has gained a new DNSKEY record, but the new ZSK is not yet being used
to generate signatures. Below is the abbreviated output - with shortened DNSKEY and RRSIG - when querying the
authoritative name server, 192.168.1.13:

## 600. IN DNSKEY 257 3 8 (
AwEAAcWDps...lM3NRn/G/R
) ; KSK; alg = RSASHA256; key id = 6817
600 IN DNSKEY 256 3 8 (
AwEAAbi6Vo...qBW5+iAqNz
) ; ZSK; alg = RSASHA256; key id = 51623
600 IN DNSKEY 256 3 8 (
AwEAAcjGaU...0rzuu55If5
) ; ZSK; alg = RSASHA256; key id = 17694
20210101000000 20201201230000 6817 example.com.
LAiaJM26T7...FU9syh/TQ= )
20210101000000 20201201230000 17694 example.com.
HK4EBbbOpj...n5V6nvAkI= )

For good measure, let’s take a look at the SOA record and its signature for this zone. Notice the RRSIG is signed by the
current ZSK, 17694. This will come in handy later when you want to verify whether the new ZSK is in effect:
$ dig @192.168.1.13 example.com. SOA +dnssec +multiline
2020120102 ; serial
600 IN RRSIG SOA 8 2 600 (
20201230160109 20201130150109 17694 example.com.
YUTC8rFULaWbW+nAHzbfGwNqzARHevpryzRIJMvZBYPo
NAeejNk9saNAoCYKWxGJ0YBc2k+r5fYq1Mg4ll2JkBF5
buAsAYLw8vEOIxVpXwlArY+oSp9T1w2wfTZ0vhVIxaYX
6dkcz4I3wbDx2xmG0yngtA6A8lAchERx2EGy0RM= )

These are all the manual tasks you need to perform for a ZSK rollover. If you have followed the configuration examples
in this guide of using inline-signing and dnssec-policy , everything else is automated for you by BIND.
Day of ZSK Rollover
On the actual day of the rollover, although there is technically nothing for you to do, you should still keep an eye on the
zone to make sure new signatures are being generated by the new ZSK (51623 in this example). The easiest way is to
query the authoritative name server 192.168.1.13 for the SOA record as you did a month ago:
$ dig @192.168.1.13 example.com. SOA +dnssec +multiline

2020112011 ; serial
600 IN RRSIG SOA 8 2 600 (
20210131000000 20201231230000 51623 example.com.
J4RMNpJPOmMidElyBugJp0RLqXoNqfvo/2AT6yAAvx9X
zZRL1cuhkRcyCSLZ9Z+zZ2y4u2lvQGrNiondaKdQCor7
uTqH5WCPoqalOCBjqU7c7vlAM27O9RD11nzPNpVQ7xPs
y5nkGqf83OXTK26IfnjU1jqiUKSzg6QR7+XpLk0= )

As you can see, the signature generated by the old ZSK (17694) has disappeared, replaced by a new signature generated
from the new ZSK (51623).
Not all signatures will disappear magically on the same day; it depends on when each one was generated. In the worstcase scenario, a new signature could have been signed by the old ZSK (17694) moments before it was deactivated,
meaning that the signature could live for almost 30 more days, until just before February 1.
This is why it is important to keep the old ZSK in the zone and not delete it right away.

One Month After ZSK Rollover
Again, technically there is nothing you need to do on this day, but it doesn’t hurt to verify that the old ZSK (17694) is
now completely gone from your zone. named will not touch Kexample.com.+008+17694.private and Kexample.
com.+008+17694.key on your file system. Running the same dig command for DNSKEY should suffice:
$ dig @192.168.1.13 example.com. DNSKEY +multiline +dnssec
600 IN DNSKEY 257 3 8 (
AwEAAcWDps...lM3NRn/G/R
) ; KSK; alg = RSASHA256; key id = 6817
600 IN DNSKEY 256 3 8 (
AwEAAdeCGr...1DnEfX+Xzn
) ; ZSK; alg = RSASHA256; key id = 51623
20170203000000 20170102230000 6817 example.com.
KHY8P0zE21...Y3szrmjAM= )
20170203000000 20170102230000 51623 example.com.
G2g3crN17h...Oe4gw6gH8= )

Congratulations, the ZSK rollover is complete! As for the actual key files (the files ending in .key and .private), they
may be deleted at this point, but they do not have to be.
KSK Rollover
This recipe describes how to perform KSK rollover using the Double-DS method. For other KSK rolling methods, please
see KSK Rollover Methods in Advanced Discussions. The registrar used in this recipe is GoDaddy. Also for this recipe,
we are keeping the number of DS records down to just one per active set using just SHA-1, for the sake of better clarity,
although in practice most zone operators choose to upload two DS records as shown in Working With the Parent Zone.
For more information on key management and rollovers, please see Rollovers.
Below is a sample timeline for a KSK rollover to occur on January 1, 2021:
1. December 1, 2020 (one month before rollover)
- Change timer on the current KSK
- Generate new KSK and DS records
- Add DNSKEY for the new KSK to zone
- Upload new DS records to parent zone
2. January 1, 2021 (day of rollover)
- Use the new KSK to sign all DNSKEY RRsets, which generates new RRSIGs
- Add new RRSIGs to the zone
- Remove RRSIG for the old ZSK from zone
- Start using the new KSK to sign DNSKEY
3. February 1, 2021 (one month after rollover)
- Remove the old KSK DNSKEY from zone
- Remove old DS records from parent zone
The current active KSK has the ID 24828, and this is the DS record that has already been published by the parent zone:
example.com. IN DS 24828 7 1 D4A33E8DD550A9567B4C4971A34AD6C4B80A6AD3

One Month Before KSK Rollover
On December 1, 2020, a month before the planned rollover, you (as administrator) should change the parameters on the
current key. Set it to become inactive on January 1, 2021, and be deleted from the zone on February 1st, 2021; also
generate a successor key (23550). Finally, generate a new DS record based on the new key, 23550:
./Kexample.com.+007+24848.key
./Kexample.com.+007+24848.private
Kexample.com.+007+23550
example.com. IN DS 23550 7 1 54FCF030AA1C79C0088FDEC1BD1C37DAA2E70DFB

The first command gets us into the key directory /etc/bind/keys/example.com/, where keys for example.com
are stored.
The second, dnssec-settime, sets an inactive (-I) date of January 1, 2021, and a deletion (-D) date of February 1,
2021 for the current KSK (Kexample.com.+007+24848).
The third command, dnssec-keygen, creates a successor key, using the exact same parameters (algorithms, key sizes,
etc.) as the current KSK. The new key pair created in our example is Kexample.com.+007+23550.
The fourth and final command, dnssec-dsfromkey , creates a DS record from the new KSK (23550), using SHA-1
as the digest type. Again, in practice most people generate two DS records for both supported digest types (SHA-1 and
SHA-256), but for our example here we are only using one to keep the output small and hopefully clearer.
Make sure the successor keys are readable by named.
The syslog message indicates when the next key checking event is. The log message looks like this:
zone example.com/IN (signed): next key event: 01-Dec-2020 00:13:05.385

You can check the publish date of the key by looking at the key file:
; This is a key-signing key, keyid 23550, for example.com.
; Created: 20201130160024 (Thu Dec 1 00:00:24 2020)
; Publish: 20201202000000 (Fri Dec 2 08:00:00 2020)
; Activate: 20210101000000 (Sun Jan 1 08:00:00 2021)

Since the publish date is set to the morning of December 2, and our example scenario takes place on December 1, the
next morning you will notice that your zone has gained a new DNSKEY record based on your new KSK, but with no
corresponding RRSIG yet. Below is the abbreviated output - with shortened DNSKEY and RRSIG - when querying the
authoritative name server, 192.168.1.13:
300 IN DNSKEY 256 3 7 (
AwEAAdYqAc...TiSlrma6Ef
) ; ZSK; alg = NSEC3RSASHA1; key id = 29747
AwEAAeTJ+w...O+Zy9j0m63
) ; KSK; alg = NSEC3RSASHA1; key id = 24828
AwEAAc1BQN...Wdc0qoH21H
) ; KSK; alg = NSEC3RSASHA1; key id = 23550
20201206125617 20201107115617 24828 example.com.
4y1iPVJOrK...aC3iF9vgc= )
20201206125617 20201107115617 29747 example.com.
g/gfmPjr+y...rt/S/xjPo= )

Anytime after generating the DS record, you can upload it; it is not necessary to wait for the DNSKEY to be published in

your zone, since this new KSK is not active yet. You can do it immediately after the new DS record has been generated
on December 1, or you can wait until the next day after you have verified that the new DNSKEY record is added to the
zone. Below are some screenshots from GoDaddy’s web-based interface, used to add a new DS record.8
1. After logging in, click the green “Launch” button next to the domain name you want to manage.

Fig. 7: Upload DS Record Step #1
2. Scroll down to the “DS Records” section and click “Manage.”
3. A dialog appears, displaying the current key (24828). Click “Add DS Record.”
4. Enter the Key ID, algorithm, digest type, and the digest, then click “Next.”
5. Address any errors and click “Finish.”
## 6. Both DS records are shown. Click “Save.”
Finally, let’s verify that the registrar has published the new DS record. This may take anywhere from a few minutes to a
few days, depending on your parent zone. You can verify whether your parent zone has published the new DS record by
querying for the DS record of your zone. In the example below, the Google public DNS server 8.8.8.8 is used:
$ dig @8.8.8.8 example.com. DS
21552
21552

DS
DS

24828 7 1 D4A33E8DD550A9567B4C4971A34AD6C4B80A6AD3
23550 7 1 54FCF030AA1C79C0088FDEC1BD1C37DAA2E70DFB

You can also query your parent zone’s authoritative name servers directly to see if these records have been published. DS
records will not show up on your own authoritative zone, so you cannot query your own name servers for them. In this
recipe, the parent zone is .com, so querying a few of the .com name servers is another appropriate verification.
Day of KSK Rollover
If you have followed the examples in this document, as described in Easy-Start Guide for Signing Authoritative Zones,
there is technically nothing you need to do manually on the actual day of the rollover. However, you should still keep an
eye on the zone to make sure new signature(s) are being generated by the new KSK (23550 in this example). The easiest
way is to query the authoritative name server 192.168.1.13 for the same DNSKEY and signatures, as you did a month
ago:
8 The screenshots were taken from GoDaddy’s interface at the time the original version of this guide was published (2015). It may have changed

since then.

Fig. 8: Upload DS Record Step #2

Fig. 9: Upload DS Record Step #3

Fig. 10: Upload DS Record Step #4

Fig. 11: Upload DS Record Step #5

Fig. 12: Upload DS Record Step #6

## 300. IN DNSKEY 256 3 7 (
AwEAAdYqAc...TiSlrma6Ef
) ; ZSK; alg = NSEC3RSASHA1; key id = 29747
AwEAAeTJ+w...O+Zy9j0m63
) ; KSK; alg = NSEC3RSASHA1; key id = 24828
AwEAAc1BQN...Wdc0qoH21H
) ; KSK; alg = NSEC3RSASHA1; key id = 23550
20210201074900 20210101064900 23550 mydnssecgood.org.
S6zTbBTfvU...Ib5eXkbtE= )
20210105074900 20201206064900 29747 mydnssecgood.org.
VY5URQA2/d...OVKr1+KX8= )

As you can see, the signature generated by the old KSK (24828) has disappeared, replaced by a new signature generated
from the new KSK (23550).
One Month After KSK Rollover
While the removal of the old DNSKEY from the zone should be automated by named, the removal of the DS record
is manual. You should make sure the old DNSKEY record is gone from your zone first, by querying for the DNSKEY
records of the zone; this time we expect not to see the key with an ID of 24828:

## 300. IN DNSKEY 256 3 7 (
AwEAAdYqAc...TiSlrma6Ef
) ; ZSK; alg = NSEC3RSASHA1; key id = 29747
AwEAAc1BQN...Wdc0qoH21H
) ; KSK; alg = NSEC3RSASHA1; key id = 23550
20210208000000 20210105230000 23550 mydnssecgood.org.
Qw9Em3dDok...bNCS7KISw= )
20210208000000 20210105230000 29747 mydnssecgood.org.
OuelpIlpY9...XfsKupQgc= )

Since the key with the ID 24828 is gone, you can now remove the old DS record for that key from our parent zone. Be
careful to remove the correct DS record. If you accidentally remove the new DS record(s) with key ID 23550, it could
lead to a problem called “security lameness,” as discussed in Security Lameness, and may cause users to be unable to
resolve any names in the zone.
1. After logging in (again, GoDaddy.com in our example) and launching the domain, scroll down to the “DS Records”
section and click Manage.

Fig. 13: Remove DS Record Step #1
2. A dialog appears, displaying both keys (24828 and 23550). Use the far right-hand X button to remove key 24828.
3. Key 24828 now appears crossed out; click “Save” to complete the removal.

Fig. 14: Remove DS Record Step #2

Fig. 15: Remove DS Record Step #3

Congratulations, the KSK rollover is complete! As for the actual key files (ending in .key and .private), they may be
deleted at this point, but they do not have to be.

#### 13.8.3 NSEC and NSEC3
Migrating from NSEC to NSEC3
This recipe describes how to transition from using NSEC to NSEC3, as described in Proof of Non-Existence (NSEC and
NSEC3). This recipe assumes that the zones are already signed, and that named is configured according to the steps
described in Easy-Start Guide for Signing Authoritative Zones.
If your zone is signed with RSASHA1 (algorithm 5), you cannot migrate to NSEC3 without also performing an
algorithm rollover to RSASHA1-NSEC3-SHA1 (algorithm 7), as described in Algorithm Rollovers. This ensures that
older validating resolvers that do not understand NSEC3 will fall back to treating the zone as unsecured (rather than
“bogus”), as described in Section 2 of RFC 5155.
To enable NSEC3, update your dnssec-policy and add the desired NSEC3 parameters. The example below enables
NSEC3 for zones with the standard DNSSEC policy, using 0 additional iterations, no opt-out, and a zero-length salt:
dnssec-policy "standard" {

Then reconfigure the server with rndc. You can tell that it worked if you see the following debug log messages:
Oct 21 13:47:21 received control channel command 'reconfig'
Oct 21 13:47:21 zone example.com/IN (signed): zone_addnsec3chain(1,CREATE,0,-)

You can also verify that it worked by querying for a name that you know does not exist, and checking for the presence of
the NSEC3 record. For example:
$ dig @192.168.1.13 thereisnowaythisexists.example.com. A +dnssec +multiline
5A03TL362CS8VSIH69CVA4MJIKRHFQH3.example.com. 300 IN NSEC3 1 0 0 - (
TQ9QBEGA6CROHEOC8KIH1A2C06IVQ5ER
NS SOA RRSIG DNSKEY NSEC3PARAM )

Our example used four parameters: 1, 0, 0, and -, in order. 1 represents the algorithm, 0 represents the opt-out flag, 0
represents the number of additional iterations, and - denotes no salt is used. To learn more about each of these parameters,
please see NSEC3PARAM.
Migrating from NSEC3 to NSEC
Migrating from NSEC3 back to NSEC is easy; just remove the nsec3param configuration option from your
dnssec-policy and reconfigure the name server. You can tell that it worked if you see these messages in the log:
named[14093]: received control channel command 'reconfig'
named[14093]: zone example.com/IN: zone_addnsec3chain(1,REMOVE,0,-)

You can also query for a name that you know does not exist, and you should no longer see any traces of NSEC3 records.

$ dig @192.168.1.13 reieiergiuhewhiouwe.example.com. A +dnssec +multiline

## 300. IN NSEC aaa.example.com. NS SOA RRSIG NSEC DNSKEY
## 300. IN NSEC web.example.com. A RRSIG NSEC

NSEC3 Opt-Out
This recipe discusses how to enable and disable NSEC3 opt-out, and how to show the results of each action. As discussed
in NSEC3 Opt-Out, NSEC3 opt-out is a feature that can help conserve resources on parent zones with many delegations
that have not yet been signed.
NSEC3 Opt-Out feature brings benefit only to _extremely_ large zones with lots of insecure delegations. It’s use
is counterproductive in all other cases as it decreases tamper-resistance of the zone and also decreases efficiency of
resolver cache (see RFC 8198).
In other words, don’t enable Opt-Out unless you are serving an equivalent of com. zone.
Because the NSEC3PARAM record does not keep track of whether opt-out is used, it is hard to check whether changes
need to be made to the NSEC3 chain if the flag is changed. Similar to changing the NSEC3 salt, your best option is to
change the value of optout together with another NSEC3 parameter, like iterations, and in a following step restore
the iterations value.
For this recipe we assume the zone example.com has the following four entries (for this example, it is not relevant what
record types these entries are):
- ns1.example.com
- ftp.example.com
- www.example.com
- web.example.com
And the zone example.com has five delegations to five subdomains, only one of which is signed and has a valid DS
RRset:
- aaa.example.com, not signed
- bbb.example.com, signed
- ccc.example.com, not signed
- ddd.example.com, not signed
- eee.example.com, not signed
Before enabling NSEC3 opt-out, the zone example.com contains ten NSEC3 records; below is the list with the plain
text name before the actual NSEC3 record:
- aaa.example.com: IFA1I3IE7EKCTPHM6R58URO3Q846I52M.example.com
- bbb.example.com: ROJUF3VJSJO6LQ2LC1DNSJ5GBAUJPVHE.example.com
- ccc.example.com: 0VPUT696LUVDPDS5NIHSHBH9KLV20V5K.example.com

- ddd.example.com: UHPBD5U4HRGB84MLC2NQOVEFNAKJU0CA.example.com
- eee.example.com: NF7I61FA4C2UEKPMEDSOC25FE0UJIMKT.example.com
- ftp.example.com: 8P15KCUAT1RHCSDN46HBQVPI5T532IN1.example.com
- ns1.example.com: GUFVRA2SFIO8RSFP7UO41E8AD1KR41FH.example.com
- web.example.com: CVQ4LA4ALPQIAO2H3N2RB6IR8UHM91E7.example.com
- www.example.com: MIFDNDT3NFF3OD53O7TLA1HRFF95JKUK.example.com
- example.com: ONIB9MGUB9H0RML3CDF5BGRJ59DKJHVK.example.com
We can enable NSEC3 opt-out with the following configuration, changing the optout configuration value from no to
yes:
dnssec-policy "standard" {
nsec3param iterations 0 optout yes salt-length 0;

After NSEC3 opt-out is enabled, the number of NSEC3 records is reduced. Notice that the unsigned delegations aaa,
ccc, ddd, and eee no longer have corresponding NSEC3 records.
- bbb.example.com: ROJUF3VJSJO6LQ2LC1DNSJ5GBAUJPVHE.example.com
- ftp.example.com: 8P15KCUAT1RHCSDN46HBQVPI5T532IN1.example.com
- ns1.example.com: GUFVRA2SFIO8RSFP7UO41E8AD1KR41FH.example.com
- web.example.com: CVQ4LA4ALPQIAO2H3N2RB6IR8UHM91E7.example.com
- www.example.com: MIFDNDT3NFF3OD53O7TLA1HRFF95JKUK.example.com
- example.com: ONIB9MGUB9H0RML3CDF5BGRJ59DKJHVK.example.com
To undo NSEC3 opt-out, change the configuration again:
dnssec-policy "standard" {

NSEC3 hashes the plain text domain name, and we can compute our own hashes using the tool nsec3hash. For
example, to compute the hashed name for www.example.com using the parameters we listed above, we can execute
this command:
MIFDNDT3NFF3OD53O7TLA1HRFF95JKUK (salt=-, hash=1, iterations=0)

#### 13.8.4 Reverting to Unsigned
This recipe describes how to revert from a signed zone (DNSSEC) back to an unsigned (DNS) zone.
Here is what named.conf looks like when it is signed:

dnssec-policy "default";

To indicate the reversion to unsigned, change the dnssec-policy line:
dnssec-policy "insecure";

Then use rndc reload to reload the zone.
The “insecure” policy is a built-in policy (like “default”). It makes sure the zone is still DNSSEC-maintained, to allow
for a graceful transition to unsigned. It also publishes the CDS and CDNSKEY DELETE records automatically at the
appropriate time.
If the parent zone allows management of DS records via CDS/CDNSKEY, as described in RFC 8078, the DS record
should be removed from the parent automatically.
Otherwise, DS records can be removed via the registrar. Below is an example showing how to remove DS records using
the GoDaddy web-based interface:
1. After logging in, click the green “Launch” button next to the domain name you want to manage.

Fig. 16: Revert to Unsigned Step #1

2. Scroll down to the “DS Records” section and click Manage.

3. A dialog appears, displaying all current keys. Use the far right-hand X button to remove each key.

## 4. Click Save.

When the DS records have been removed from the parent zone, use rndc dnssec -checkds -key id withdrawn
example.com to tell named that the DS is removed, and the remaining DNSSEC records will be removed in a timely
manner. Or, if parental agents are configured, the DNSSEC records will be automatically removed after BIND has seen
that the parental agents no longer serve the DS RRset for this zone.

Fig. 17: Revert to Unsigned Step #2

Fig. 18: Revert to Unsigned Step #3

Fig. 19: Revert to Unsigned Step #4
After a while, the zone is reverted back to the traditional, insecure DNS format. This can be verified by checking that all
DNSKEY and RRSIG records have been removed from the zone.
The dnssec-policy line can then be removed from named.conf and the zone reloaded. The zone will no longer be
subject to any DNSSEC maintenance.

### 13.9 Commonly Asked Questions
Below are some common questions and (hopefully) some answers that help.
Do I need IPv6 to have DNSSEC?
No. DNSSEC can be deployed without IPv6.
Does DNSSEC encrypt my DNS traffic, so others cannot eavesdrop on my DNS queries?
No. Although cryptographic keys and digital signatures are used in DNSSEC, they only provide authenticity and
integrity, not privacy. Someone who sniffs network traffic can still see all the DNS queries and answers in plain
text; DNSSEC just makes it very difficult for the eavesdropper to alter or spoof the DNS responses. For protection
against eavesdropping, the preferred protocol is DNS-over-TLS. DNS-over-HTTPS can also do the job, but it is
more complex.
If I deploy DNS-over-TLS/HTTPS, can I skip deploying DNSSEC?
No. DNS-over-encrypted-transport stops eavesdroppers on a network, but it does not protect against cache poisoning and answer manipulation in other parts of the DNS resolution chain. In other words, these technologies
offer protection only for records when they are in transit between two machines; any compromised server can still
redirect traffic elsewhere (or simply eavesdrop). However, DNSSEC provides integrity and authenticity for DNS
records, even when these records are stored in caches and on disks.
Does DNSSEC protect the communication between my laptop and my name server?
Unfortunately, not at the moment. DNSSEC is designed to protect the communication between end clients (laptop)
and name servers; however, there are few applications or stub resolver libraries as of mid-2020 that take advantage
of this capability.
Does DNSSEC secure zone transfers?
No. You should consider using TSIG to secure zone transfers among your name servers.
Does DNSSEC protect my network from malicious websites?
DNSSEC makes it much more difficult for attackers to spoof DNS responses or perform cache poisoning. It
cannot protect against users who visit a malicious website that an attacker owns and operates, or prevent users from
mistyping a domain name; it will just become less likely that an attacker can hijack other domain names.

In other words, DNSSEC is designed to provide confidence that when a DNS response is received for
www.company.com over port 53, it really came from Company’s name servers and the answers are authentic.
But that does not mean the web server a user visits over port 80 or port 443 is necessarily safe.
If I enable DNSSEC validation, will it break DNS lookup, since most domain names do not yet use DNSSEC?
No, DNSSEC is backwards-compatible to “standard” DNS. A DNSSEC-enabled validating resolver can still look
up all of these domain names as it always has under standard DNS.
There are four (4) categories of responses (see RFC 4035):
Secure
Domains that have DNSSEC deployed correctly.
Insecure
Domains that have yet to deploy DNSSEC.
Bogus
Domains that have deployed DNSSEC but have done it incorrectly.
Indeterminate
Domains for which it is not possible to determine whether these domains use DNSSEC.
A DNSSEC-enabled validating resolver still resolves Secure and Insecure; only Bogus and Indeterminate result in a
SERVFAIL. As of mid-2022, roughly one-third of users worldwide are using DNSSEC validation on their recursive
name servers. Google public DNS (8.8.8.8) also has enabled DNSSEC validation.
Do I need to have special client software to use DNSSEC?
No. DNSSEC only changes the communication behavior among DNS servers, not between a DNS server (validating
resolver) and a client (stub resolver). With DNSSEC validation enabled on your recursive server, if a domain name
does not pass the checks, an error message (typically SERVFAIL) is returned to clients; to most client software
today, it appears that the DNS query has failed or that the domain name does not exist.
Since DNSSEC uses public key cryptography, do I need Public Key Infrastructure (PKI) in order to use
DNSSEC?
No, DNSSEC does not depend on an existing PKI. Public keys are stored within the DNS hierarchy; the trustworthiness of each zone is guaranteed by its parent zone, all the way back to the root zone. A copy of the trust anchor
for the root zone is distributed with BIND 9.
Do I need to purchase SSL certificates from a Certificate Authority (CA) to use DNSSEC?
No. With DNSSEC, you generate and publish your own keys, and sign your own data as well. There is no need to
pay someone else to do it for you.
My parent zone does not support DNSSEC; can I still sign my zone?
Technically, yes, but you will not get the full benefit of DNSSEC, as other validating resolvers are not able to
validate your zone data. Without the DS record(s) in your parent zone, other validating resolvers treat your zone
as an insecure (traditional) zone, and no actual verification is carried out. To the rest of the world, your zone still
appears to be insecure, and it will continue to be insecure until your parent zone can host the DS record(s) for you
and tell the rest of the world that your zone is signed.
Is DNSSEC the same thing as TSIG?
No. TSIG is typically used between primary and secondary name servers to secure zone transfers, while DNSSEC
secures DNS lookup by validating answers. Even if you enable DNSSEC, zone transfers are still not validated; to
secure the communication between your primary and secondary name servers, consider setting up TSIG or similar
secure channels.
How are keys copied from primary to secondary server(s)?
DNSSEC uses public cryptography, which results in two types of keys: public and private. The public keys are
part of the zone data, stored as DNSKEY record types. Thus the public keys are synchronized from primary to
secondary server(s) as part of the zone transfer. The private keys are not, and should not be, stored anywhere other
than secured on the primary server. See Key Storage for more information on key storage options and considerations.

### 13.9 Commonly Asked Questions

Can I use the same key for multiple zones?
Yes and no. Good security practice suggests that you should use unique key pairs for each zone, just as you should
have different passwords for your email account, social media login, and online banking credentials. On a technical
level, it is completely feasible to reuse a key, but multiple zones are at risk if one key pair is compromised. However,
if you have hundreds or thousands of zones to administer, a single key pair for all might be less error-prone to
manage. You may choose to use the same approach as with password management: use unique passwords for your
bank accounts and shopping sites, but use a standard password for your not-very-important logins. First, categorize
your zones: high-value zones (or zones that have specific key rollover requirements) get their own key pairs, while
other, more “generic” zones can use a single key pair for easier management. Note that at present (mid-2020), fully
automatic signing (using the dnssec-policy clause in your named configuration file) does not support reuse of
keys except when the same zone appears in multiple views (see next question). To use the same key for multiple
zones, sign your zones using semi-automatic signing. Each zone wishing to use the key should point to the same
key directory.
How do I sign the different instances of a zone that appears in multiple views?
Add a dnssec-policy statement to each zone definition in the configuration file. To avoid problems when a
single computer accesses different instances of the zone while information is still in its cache (e.g., a laptop moving
from your office to a customer site), you should sign all instances with the same key. This means setting the same
DNSSEC policy for all instances of the zone, and making sure that the key directory is the same for all instances
of the zone.
Will there be any problems if I change the DNSSEC policy for a zone?
If you are using fully automatic signing, no. Just change the parameters in the dnssec-policy statement and
reload the configuration file. named makes a smooth transition to the new policy, ensuring that your zone remains
valid at all times.

FOURTEEN

A BRIEF HISTORY OF THE DNS AND BIND

Although the Domain Name System “officially” began in 1984 with the publication of RFC 920, the core of the new
system was described in 1983 in RFC 882 and RFC 883. From 1984 to 1987, the ARPAnet (the precursor to today’s
Internet) became a testbed of experimentation for developing the new naming/addressing scheme in a rapidly expanding,
operational network environment. New RFCs were written and published in 1987 that modified the original documents
to incorporate improvements based on the working model. RFC 1034, “Domain Names-Concepts and Facilities,” and
RFC 1035, “Domain Names-Implementation and Specification,” were published and became the standards upon which
all DNS implementations are built.
The first working domain name server, called “Jeeves,” was written in 1983-84 by Paul Mockapetris for operation on
DEC Tops-20 machines located at the University of Southern California’s Information Sciences Institute (USC-ISI) and
SRI International’s Network Information Center (SRI-NIC). A DNS server for Unix machines, the Berkeley Internet
Name Domain (BIND) package, was written soon after by a group of graduate students at the University of California at
Berkeley under a grant from the US Defense Advanced Research Projects Administration (DARPA).
Versions of BIND through 4.8.3 were maintained by the Computer Systems Research Group (CSRG) at UC Berkeley.
Douglas Terry, Mark Painter, David Riggle, and Songnian Zhou made up the initial BIND project team. After that,
additional work on the software package was done by Ralph Campbell. Kevin Dunlap, a Digital Equipment Corporation
employee on loan to the CSRG, worked on BIND for 2 years, from 1985 to 1987. Many other people also contributed
to BIND development during that time: Doug Kingston, Craig Partridge, Smoot Carl-Mitchell, Mike Muuss, Jim Bloom,
and Mike Schwartz. BIND maintenance was subsequently handled by Mike Karels and Øivind Kure.
BIND versions 4.9 and 4.9.1 were released by Digital Equipment Corporation (which became Compaq Computer Corporation and eventually merged with Hewlett-Packard). Paul Vixie, then a DEC employee, became BIND’s primary
caretaker. He was assisted by Phil Almquist, Robert Elz, Alan Barrett, Paul Albitz, Bryan Beecher, Andrew Partan,
Andy Cherenson, Tom Limoncelli, Berthold Paffrath, Fuat Baran, Anant Kumar, Art Harkin, Win Treese, Don Lewis,
Christophe Wolfhugel, and others.
In 1994, BIND version 4.9.2 was sponsored by Vixie Enterprises.
tect/programmer.

Paul Vixie became BIND’s principal archi-

BIND versions from 4.9.3 onward have been developed and maintained by Internet Systems Consortium and its predecessor, the Internet Software Consortium, with support provided by ISC’s sponsors.
As co-architects/programmers, Bob Halley and Paul Vixie released the first production-ready version of BIND version 8
in May 1997.
BIND version 9 was released in September 2000 and is a major rewrite of nearly all aspects of the underlying BIND
architecture.
BIND versions 4 and 8 are officially deprecated. No additional development is done on BIND version 4 or BIND version
8.
BIND development work is made possible today by the sponsorship of corporations who purchase professional support
services from ISC (https://www.isc.org/contact/) and/or donate to our mission, and by the tireless efforts of numerous
individuals.

Chapter 14. A Brief History of the DNS and BIND

FIFTEEN

GENERAL DNS REFERENCE INFORMATION

### 15.1 Requests for Comment (RFCs)
Specification documents for the Internet protocol suite, including the DNS, are published as part of the Request for
Comments (RFCs) series of technical notes. The standards themselves are defined by the Internet Engineering Task Force
(IETF) and the Internet Engineering Steering Group (IESG). RFCs can be viewed online at: https://www.rfc-editor.org/.
While reading RFCs, please keep in mind that not all RFCs are standards, and also that the validity of documents does
change over time. Every RFC needs to be interpreted in the context of other documents.
BIND 9 strives for strict compliance with IETF standards. To the best of our knowledge, BIND 9 complies with the
following RFCs, with the caveats and exceptions listed in the numbered notes below. Many of these RFCs were written
by current or former ISC staff members. The list is non-exhaustive.
Some of these RFCs, though DNS-related, are not concerned with implementing software.

#### 15.1.1 Protocol Specifications
RFC 1034 - P. Mockapetris. Domain Names — Concepts and Facilities. November 1987.
RFC 1035 - P. Mockapetris. Domain Names — Implementation and Specification. November 1987.12
RFC 1183 - C. F. Everhart, L. A. Mamakos, R. Ullmann, P. Mockapetris. New DNS RR Definitions. October 1990.
RFC 1521 - N. Borenstein, N. Freed - MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying
and Describing the Format of Internet Message Bodies. September 1993.17
RFC 1706 - B. Manning and R. Colella. DNS NSAP Resource Records. October 1994.
RFC 1712 - C. Farrell, M. Schulze, S. Pleitner, and D. Baldoni. DNS Encoding of Geographical Location. November
1994.
RFC 1876 - C. Davis, P. Vixie, T. Goodwin, and I. Dickinson. A Means for Expressing Location Information in the
Domain Name System. January 1996.
RFC 1982 - R. Elz and R. Bush. Serial Number Arithmetic. August 1996.
RFC 1995 - M. Ohta. Incremental Zone Transfer in DNS. August 1996.
RFC 1996 - P. Vixie. A Mechanism for Prompt Notification of Zone Changes (DNS NOTIFY). August 1996.
RFC 2136 - P. Vixie, S. Thomson, Y. Rekhter, and J. Bound. Dynamic Updates in the Domain Name System (DNS
UPDATE). April 1997.
RFC 2163 - A. Allocchio. Using the Internet DNS to Distribute MIXER Conformant Global Address Mapping (MCGAM).
January 1998.
1 Queries to zones that have failed to load return SERVFAIL rather than a non-authoritative response. This is considered a feature.
2 CLASS ANY queries are not supported. This is considered a feature.
## 17. Only the Base 64 encoding specification is supported.

RFC 2181 - R. Elz and R. Bush. Clarifications to the DNS Specification. July 1997.
RFC 2230 - R. Atkinson. Key Exchange Delegation Record for the DNS. November 1997.
RFC 2308 - M. Andrews. Negative Caching of DNS Queries (DNS NCACHE). March 1998.
RFC 2539 - D. Eastlake, 3rd. Storage of Diffie-Hellman Keys in the Domain Name System (DNS). March 1999.
RFC 2782 - A. Gulbrandsen, P. Vixie, and L. Esibov. A DNS RR for Specifying the Location of Services (DNS SRV).
February 2000.
RFC 2930 - D. Eastlake, 3rd. Secret Key Establishment for DNS (TKEY RR). September 2000.
RFC 2931 - D. Eastlake, 3rd. DNS Request and Transaction Signatures (SIG(0)s). September 2000.3
RFC 3007 - B. Wellington. Secure Domain Name System (DNS) Dynamic Update. November 2000.
RFC 3110 - D. Eastlake, 3rd. RSA/SHA-1 SIGs and RSA KEYs in the Domain Name System (DNS). May 2001.
RFC 3123 - P. Koch. A DNS RR Type for Lists of Address Prefixes (APL RR). June 2001.
RFC 3225 - D. Conrad. Indicating Resolver Support of DNSSEC. December 2001.
RFC 3226 - O. Gudmundsson. DNSSEC and IPv6 A6 Aware Server/Resolver Message Size Requirements. December
2001.
RFC 3363 - R. Bush, A. Durand, B. Fink, O. Gudmundsson, and T. Hain. Representing Internet Protocol Version 6 (IPv6)
Addresses in the Domain Name System (DNS). August 2002.15
RFC 3403 - M. Mealling. Dynamic Delegation Discovery System (DDDS). Part Three: The Domain Name System (DNS)
Database. October 2002.
RFC 3492 - A. Costello. Punycode: A Bootstring Encoding of Unicode for Internationalized Domain Names in Applications
(IDNA). March 2003.18
RFC 3493 - R. Gilligan, S. Thomson, J. Bound, J. McCann, and W. Stevens. Basic Socket Interface Extensions for IPv6.
March 2003.
RFC 3496 - A. G. Malis and T. Hsiao. Protocol Extension for Support of Asynchronous Transfer Mode (ATM) Service
Class-aware Multiprotocol Label Switching (MPLS) Traffic Engineering. March 2003.
RFC 3596 - S. Thomson, C. Huitema, V. Ksinant, and M. Souissi. DNS Extensions to Support IP Version 6. October
2003.
RFC 3597 - A. Gustafsson. Handling of Unknown DNS Resource Record (RR) Types. September 2003.
RFC 3645 - S. Kwan, P. Garg, J. Gilroy, L. Esibov, J. Westhead, and R. Hall. Generic Security Service Algorithm for
Secret Key Transaction Authentication for DNS (GSS-TSIG). October 2003.
RFC 4025 - M. Richardson. A Method for Storing IPsec Keying Material in DNS. March 2005.
RFC 4033 - R. Arends, R. Austein, M. Larson, D. Massey, and S. Rose. DNS Security Introduction and Requirements.
March 2005.
RFC 4034 - R. Arends, R. Austein, M. Larson, D. Massey, and S. Rose. Resource Records for the DNS Security Extensions.
March 2005.
RFC 4035 - R. Arends, R. Austein, M. Larson, D. Massey, and S. Rose. Protocol Modifications for the DNS Security
Extensions. March 2005.
RFC 4255 - J. Schlyter and W. Griffin. Using DNS to Securely Publish Secure Shell (SSH) Key Fingerprints. January 2006.
3 When receiving a query signed with a SIG(0), the server is only able to verify the signature if it has the key in its local authoritative data; it cannot
do recursion or validation to retrieve unknown keys.
15 Section 4 is ignored.
18 BIND 9 requires --with-libidn2 to enable entry of IDN labels within dig, host, and nslookup at compile time. ACE labels are supported
everywhere with or without --with-libidn2.

Chapter 15. General DNS Reference Information

RFC 4343 - D. Eastlake, 3rd. Domain Name System (DNS) Case Insensitivity Clarification. January 2006.
RFC 4398 - S. Josefsson. Storing Certificates in the Domain Name System (DNS). March 2006.
RFC 4470 - S. Weiler and J. Ihren. Minimally covering NSEC Records and DNSSEC On-line Signing. April 2006.6
RFC 4509 - W. Hardaker. Use of SHA-256 in DNSSEC Delegation Signer (DS) Resource Records (RRs). May 2006.
RFC 4592 - E. Lewis. The Role of Wildcards in the Domain Name System. July 2006.
RFC 4635 - D. Eastlake, 3rd. HMAC SHA (Hashed Message Authentication Code, Secure Hash Algorithm) TSIG Algorithm
Identifiers. August 2006.
RFC 4701 - M. Stapp, T. Lemon, and A. Gustafsson. A DNS Resource Record (RR) for Encoding Dynamic Host Configuration Protocol (DHCP) Information (DHCID RR). October 2006.
RFC 4955 - D. Blacka. DNS Security (DNSSEC) Experiments. July 2007.7
RFC 5001 - R. Austein. DNS Name Server Identifier (NSID) Option. August 2007.
RFC 5011 - M. StJohns. Automated Updates of DNS Security (DNSSEC) Trust Anchors.
RFC 5155 - B. Laurie, G. Sisson, R. Arends, and D. Blacka. DNS Security (DNSSEC) Hashed Authenticated Denial of
Existence. March 2008.
RFC 5205 - P. Nikander and J. Laganier. Host Identity Protocol (HIP) Domain Name System (DNS) Extension. April
2008.
RFC 5452 - A. Hubert and R. van Mook. Measures for Making DNS More Resilient Against Forged Answers. January
2009.8
RFC 5702 - J. Jansen. Use of SHA-2 Algorithms with RSA in DNSKEY and RRSIG Resource Records for DNSSEC. October
2009.
RFC 5891 - J. Klensin. Internationalized Domain Names in Applications (IDNA): Protocol. August 2010Page 882, 18
RFC 5936 - E. Lewis and A. Hoenes, Ed. DNS Zone Transfer Protocol (AXFR). June 2010.
RFC 5952 - S. Kawamura and M. Kawashima. A Recommendation for IPv6 Address Text Representation. August 2010.
RFC 6052 - C. Bao, C. Huitema, M. Bagnulo, M. Boucadair, and X. Li. IPv6 Addressing of IPv4/IPv6 Translators.
October 2010.
RFC 6147 - M. Bagnulo, A. Sullivan, P. Matthews, and I. van Beijnum. DNS64: DNS Extensions for Network Address
Translation from IPv6 Clients to IPv4 Servers. April 2011.9
RFC 6604 - D. Eastlake, 3rd. xNAME RCODE and Status Bits Clarification. April 2012.
RFC 6605 - P. Hoffman and W. C. A. Wijngaards. Elliptic Curve Digital Signature Algorithm (DSA) for DNSSEC. April
2012.10
RFC 6672 - S. Rose and W. Wijngaards. DNAME Redirection in the DNS. June 2012.
RFC 6698 - P. Hoffman and J. Schlyter. The DNS-Based Authentication of Named Entities (DANE) Transport Layer
Security (TLS) Protocol: TLSA. August 2012.
RFC 6725 - S. Rose. DNS Security (DNSSEC) DNSKEY Algorithm IANA Registry Updates. August 2012.11
RFC 6742 - RJ Atkinson, SN Bhatti, U. St. Andrews, and S. Rose. DNS Resource Records for the Identifier-Locator
Network Protocol (ILNP). November 2012.
6 Minimally Covering NSEC records are accepted but not generated.
7 BIND 9 interoperates with correctly designed experiments.
8 named only uses ports to extend the ID space; addresses are not used.
9 Section 5.5 does not match reality. named uses the presence of DO=1 to detect if validation may be occurring. CD has no bearing on whether
validation occurs.
10 Compliance is conditional on the OpenSSL library being linked against a supporting ECDSA.
11 RSAMD5 support has been removed. See RFC 8624.

### 15.1 Requests for Comment (RFCs)

RFC 6840 - S. Weiler, Ed., and D. Blacka, Ed. Clarifications and Implementation Notes for DNS Security (DNSSEC).
February 2013.12
RFC 6891 - J. Damas, M. Graff, and P. Vixie. Extension Mechanisms for DNS (EDNS(0)). April 2013.
RFC 7043 - J. Abley. Resource Records for EUI-48 and EUI-64 Addresses in the DNS. October 2013.
RFC 7050 - T. Savolainen, J. Korhonen, and D. Wing. Discovery of the IPv6 Prefix Used for IPv6 Address Synthesis.
November 2013.20
RFC 7208 - S. Kitterman. Sender Policy Framework (SPF) for Authorizing Use of Domains in Email, Version 1. April
2014.
RFC 7314 - M. Andrews. Extension Mechanisms for DNS (EDNS) EXPIRE Option. July 2014.
RFC 7344 - W. Kumari, O. Gudmundsson, and G. Barwood. Automating DNSSEC Delegation Trust Maintenance.
September 2014.13
RFC 7477 - W. Hardaker. Child-to-Parent Synchronization in DNS. March 2015.
RFC 7553 - P. Faltstrom and O. Kolkman. The Uniform Resource Identifier (URI) DNS Resource Record. June 2015.
RFC 7583 - S. Morris, J. Ihren, J. Dickinson, and W. Mekking. DNSSEC Key Rollover Timing Considerations. October
2015.
RFC 7766 - J. Dickinson, S. Dickinson, R. Bellis, A. Mankin, and D. Wessels. DNS Transport over TCP - Implementation
Requirements. March 2016.
RFC 7828 - P. Wouters, J. Abley, S. Dickinson, and R. Bellis. The edns-tcp-keepalive EDNS0 Option. April 2016.
RFC 7830 - A. Mayrhofer. The EDNS(0) Padding Option. May 2016.14
RFC 7858 - Z. Hu, L. Zhu, J. Heidemann, A. Mankin, D. Wessels, and P. Hoffman. Specification for DNS over Transport
Layer Security (TLS). May 2016.21
RFC 7929 - P. Wouters. DNS-Based Authentication of Named Entities (DANE) Bindings for OpenPGP. August 2016.
RFC 8078 - O. Gudmundsson and P. Wouters. Managing DS Records from the Parent via CDS/CDNSKEY. March 2017.22
RFC 8080 - O. Sury and R. Edmonds. Edwards-Curve Digital Security Algorithm (EdDSA) for DNSSEC. February 2017.
RFC 8484 - P. Hoffman and P. McManus. DNS Queries over HTTPS (DoH). October 2018.21
RFC 8509 - G. Huston, J. Damas, W. Kumari. A Root Key Trust Anchor Sentinel for DNSSEC. December 2018.
RFC 8624 - P. Wouters and O. Sury. Algorithm Implementation Requirements and Usage Guidance for DNSSEC. June
2019.
RFC 8659 - P. Hallam-Baker, R. Stradling, and J. Hoffman-Andrews. DNS Certification Authority Authorization (CAA)
Resource Record. November 2019.
RFC 8880 - S. Cheshire and D. Schinazi. Special Use Domain Name ‘ipv4only.arpa’. August 2020.
RFC 8945 - F. Dupont, S. Morris, P. Vixie, D. Eastlake 3rd, O. Gudmundsson, and B. Wellington. Secret Key Transaction
Authentication for DNS (TSIG). November 2020.
RFC 9103 - W. Toorop, S. Dickinson, S. Sahib, P. Aras, and A. Mankin. DNS Zone Transfer over TLS. August 2021.23
12 Section 5.9 - Always set CD=1 on queries. This is not done, as it prevents DNSSEC from working correctly through another recursive server.

When talking to a recursive server, the best algorithm is to send CD=0 and then send CD=1 iff SERVFAIL is returned, in case the recursive server
has a bad clock and/or bad trust anchor. Alternatively, one can send CD=1 then CD=0 on validation failure, in case the recursive server is under attack
or there is stale/bogus authoritative data.
20 RFC 7050 is updated by RFC 8880.
13 Updating of parent zones is not yet implemented.
14 named does not currently encrypt DNS requests, so the PAD option is accepted but not returned in responses.
21 Forwarding DNS queries over encrypted transports is not supported yet.
22 Updating of parent zones is not yet implemented.
