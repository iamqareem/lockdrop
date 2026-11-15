---
id: bind9-11
title: "BIND 9 Administrator Reference Manual — Strict TLS and Mutual TLS authentication mechanisms are not…"
slug: bind9-11-bind-9-administrator-reference-manual-strict-tls-and-mutual-
source: "BIND 9 Administrator Reference Manual"
sourceSection: "23. Strict TLS and Mutual TLS authentication mechanisms are not supported yet., 16. This does not apply to DNS server implementations."
track: networking-dns
tier: premium
tags: [dns, bind9, networking, infrastructure]
summary: "RFC 9432 - P. van Dijk, L. Covers 2 sections: Strict TLS and Mutual TLS authentication mechanisms are not supported yet., This does not apply to DNS server implementa."
---
# BIND 9 Administrator Reference Manual — Strict TLS and Mutual TLS authentication mechanisms are not…

## 23. Strict TLS and Mutual TLS authentication mechanisms are not supported yet.

Chapter 15. General DNS Reference Information

RFC 9432 - P. van Dijk, L. Peltan, O. Sury, W. Toorop, C.R. Monshouwer, P. Thomassen, A. Sargsyan. DNS Catalog
Zones. July 2023.
RFC 9460 - B. Schwartz, M. Bishop and E. Nygren, Service Binding and Parameter Specification via the DNS (SVCB and
HTTPS Resource Records). November 2023.24

#### 15.1.2 Best Current Practice RFCs
RFC 2219 - M. Hamilton and R. Wright. Use of DNS Aliases for Network Services. October 1997.
RFC 2317 - H. Eidnes, G. de Groot, and P. Vixie. Classless IN-ADDR.ARPA Delegation. March 1998.
RFC 2606 - D. Eastlake, 3rd and A. Panitz. Reserved Top Level DNS Names. June 1999.16
RFC 3901 - A. Durand and J. Ihren. DNS IPv6 Transport Operational Guidelines. September 2004.
RFC 5625 - R. Bellis. DNS Proxy Implementation Guidelines. August 2009.
RFC 6303 - M. Andrews. Locally Served DNS Zones. July 2011.
RFC 7793 - M. Andrews. Adding 100.64.0.0/10 Prefixes to the IPv4 Locally-Served DNS Zones Registry. May 2016.
RFC 8906 - M. Andrews and R. Bellis. A Common Operational Problem in DNS Servers: Failure to Communicate.
September 2020.
RFC 9276 - W. Hardaker and V. Dukhovni. Guidance for NSEC3 Parameter Settings. August 2022.

#### 15.1.3 For Your Information
RFC 1101 - P. Mockapetris. DNS Encoding of Network Names and Other Types. April 1989.
RFC 1123 - R. Braden. Requirements for Internet Hosts - Application and Support. October 1989.
RFC 1535 - E. Gavron. A Security Problem and Proposed Correction With Widely Deployed DNS Software. October
1993.
RFC 1536 - A. Kumar, J. Postel, C. Neuman, P. Danzig, and S. Miller. Common DNS Implementation Errors and
Suggested Fixes. October 1993.
RFC 1912 - D. Barr. Common DNS Operational and Configuration Errors. February 1996.
RFC 2874 - M. Crawford and C. Huitema. DNS Extensions to Support IPv6 Address Aggregation and Renumbering. July
2000.4
RFC 3833 - D. Atkins and R. Austein. Threat Analysis of the Domain Name System (DNS). August 2004.
RFC 4074 - Y. Morishita and T. Jinmei. Common Misbehavior Against DNS Queries for IPv6 Addresses. June 2005.
RFC 4294 - J. Loughney, Ed. - IPv6 Node Requirements. April 2006.19
RFC 4431 - M. Andrews and S. Weiler. The DNSSEC Lookaside Validation (DLV) DNS Resource Record. February
2006.5
RFC 4892 - S. Woolf and D. Conrad. Requirements for a Mechanism Identifying a Name Server Instance. June 2007.
RFC 6781 - O. Kolkman, W. Mekking, and R. Gieben. DNSSEC Operational Practices, Version 2. December 2012.
RFC 7129 - R. Gieben and W. Mekking. Authenticated Denial of Existence in the DNS. February 2014.
RFC 8749 - W. Mekking and D. Mahoney. Moving DNSSEC Lookaside Validation (DLV) to Historic Status. March 2020.
24 Additional section processing is not supported for HTTPS and SVCB records.
## 16. This does not apply to DNS server implementations.
4 Compliance is with loading and serving of A6 records only. A6 records were moved to the experimental category by RFC 3363.
19 Section 5.1 - DNAME records are fully supported.
5 Compliance is with loading and serving of DLV records only. DLV records were moved to the historic category by RFC 8749.

### 15.1 Requests for Comment (RFCs)

RFC 9567 - R. Arends and M. Larson. DNS Error Reporting

### 15.2 Notes
### 15.3 Internet Drafts
Internet Drafts (IDs) are rough-draft working documents of the Internet Engineering Task Force (IETF). They are, in
essence, RFCs in the preliminary stages of development. Implementors are cautioned not to regard IDs as archival, and
they should not be quoted or cited in any formal documents unless accompanied by the disclaimer that they are “works
in progress.” IDs have a lifespan of six months, after which they are deleted unless updated by their authors.

Chapter 15. General DNS Reference Information

SIXTEEN

MANUAL PAGES

16.1 arpaname - translate IP addresses to the corresponding ARPA
names
16.1.1 Synopsis
arpaname {ipaddress …}

#### 16.1.2 Description
arpaname translates IP addresses (IPv4 and IPv6) to the corresponding IN-ADDR.ARPA or IP6.ARPA names.

#### 16.1.3 See Also

16.2 ddns-confgen - TSIG key generation tool
16.2.1 Synopsis
ddns-confgen [-a algorithm] [-h] [-k keyname] [-q] [-s name] [-z zone]

#### 16.2.2 Description
ddns-confgen is an utility that generates keys for use in TSIG signing. The resulting keys can be used, for example, to
secure dynamic DNS updates to a zone, or for the rndc command channel.

The key name can specified using -k parameter and defaults to ddns-key. The generated key is accompanied by configuration text and instructions that can be used with nsupdate and named when setting up dynamic DNS, including an
example update-policy statement. (This usage is similar to the rndc-confgen command for setting up commandchannel security.)
Note that named itself can configure a local DDNS key for use with nsupdate -l; it does this when a zone is configured
with update-policy local;. ddns-confgen is only needed when a more elaborate configuration is required: for
instance, if nsupdate is to be used from a remote system.

#### 16.2.3 Options

This option specifies the algorithm to use for the TSIG key. Available choices are: hmac-md5, hmac-sha1, hmacsha224, hmac-sha256, hmac-sha384, and hmac-sha512. The default is hmac-sha256. Options are case-insensitive,
and the “hmac-” prefix may be omitted.

This option prints a short summary of options and arguments.
-k keyname

This option specifies the key name of the DDNS authentication key. The default is ddns-key when neither the -s
nor -z option is specified; otherwise, the default is ddns-key as a separate label followed by the argument of the
option, e.g., ddns-key.example.com. The key name must have the format of a valid domain name, consisting
of letters, digits, hyphens, and periods.

This option enables quiet mode, which prints only the key, with no explanatory text or usage examples. This is
essentially identical to tsig-keygen.
-s name

This option generates a configuration example to allow dynamic updates of a single hostname. The example named.
conf text shows how to set an update policy for the specified name using the “name” nametype. The default key
name is ddns-key.name. Note that the “self” nametype cannot be used, since the name to be updated may differ
from the key name. This option cannot be used with the -z option.
-z zone

This option generates a configuration example to allow dynamic updates of a zone. The example named.conf
text shows how to set an update policy for the specified zone using the “zonesub” nametype, allowing updates to all
subdomain names within that zone. This option cannot be used with the -s option.

#### 16.2.4 See Also
nsupdate(1), named.conf(5), named(8), BIND 9 Administrator Reference Manual.

16.3 delv - DNS lookup and validation utility
16.3.1 Synopsis
delv [@server] [ [-4] | [-6] ] [-a anchor-file] [-b address] [-c class] [-d level] [-F] [-i] [-m] [-p port#] [-q name] [-t type]

[-x addr] [name] [type] [class] [queryopt…]
delv [-h]
delv [-v]
delv [queryopt…] [query…]

#### 16.3.2 Description
delv is a tool for sending DNS queries and validating the results, using the same internal resolver and validator logic as
delv sends to a specified name server all queries needed to fetch and validate the requested data; this includes the original

requested query, subsequent queries to follow CNAME or DNAME chains, queries for DNSKEY, and DS records to
establish a chain of trust for DNSSEC validation. It does not perform iterative resolution, but simulates the behavior of
a name server configured for DNSSEC validating and forwarding.
By default, responses are validated using the built-in DNSSEC trust anchor for the root zone (“.”). Records returned by
delv are either fully validated or were not signed. If validation fails, an explanation of the failure is included in the output;
the validation process can be traced in detail. Because delv does not rely on an external server to carry out validation, it
can be used to check the validity of DNS responses in environments where local name servers may not be trustworthy.
Unless it is told to query a specific name server, delv tries each of the servers listed in /etc/resolv.conf. If no
usable server addresses are found, delv sends queries to the localhost addresses (127.0.0.1 for IPv4, ::1 for IPv6).

When no command-line arguments or options are given, delv performs an NS query for “.” (the root zone).

#### 16.3.3 Simple Usage
A typical invocation of delv looks like:
delv @server name type

where:

is the name or IP address of the name server to query. This can be an IPv4 address in dotted-decimal notation or
an IPv6 address in colon-delimited notation. When the supplied server argument is a hostname, delv resolves
that name before querying that name server (note, however, that this initial lookup is not validated by DNSSEC).
If no server argument is provided, delv consults /etc/resolv.conf; if an address is found there, it queries
the name server at that address. If either of the -4 or -6 options is in use, then only addresses for the corresponding
transport are tried. If no usable addresses are found, delv sends queries to the localhost addresses (127.0.0.1 for
IPv4, ::1 for IPv6).

is the domain name to be looked up.

indicates what type of query is required - ANY, A, MX, etc. type can be any valid query type. If no type
argument is supplied, delv performs a lookup for an A record.

#### 16.3.4 Options
-a anchor-file

This option specifies a file from which to read an alternate DNSSEC root zone trust anchor.
By default, keys that do not match the root zone name (.) are ignored. If an alternate key name is desired, it can be
specified using the +root option.
Note: When reading trust anchors, delv treats trust-anchors, initial-key, and static-key identically.
That is, for a managed key, it is the initial key that is trusted; RFC 5011 key management is not supported. delv
does not consult the managed-keys database maintained by named. This means that if the default key built in to
delv is revoked, delv must be updated to a newer version in order to continue validating.
-b address

This option sets the source IP address of the query to address. This must be a valid address on one of the host’s
network interfaces, or 0.0.0.0, or ::. An optional source port may be specified by appending #<port>

This option sets the query class for the requested data. Currently, only class “IN” is supported in delv and any
other value is ignored.
-d level

This option sets the systemwide debug level to level. The allowed range is from 0 to 99. The default is 0 (no
debugging). Debugging traces from delv become more verbose as the debug level increases. See the +mtrace,
+rtrace, and +vtrace options below for additional debugging details.

This option enables FIPS mode if supported by the cryptographic library in use.

16.3. delv - DNS lookup and validation utility

This option displays the delv help usage output and exits.
-i

This option sets insecure mode, which disables internal DNSSEC validation. (Note, however, that this does not
set the CD bit on upstream queries. If the server being queried is performing DNSSEC validation, then it does
not return invalid data; this can cause delv to time out. When it is necessary to examine invalid data to debug a
DNSSEC problem, use dig +cd.)

This option enables memory usage debugging.
-p port#

This option specifies a destination port to use for queries, instead of the standard DNS port number 53. This option
is used with a name server that has been configured to listen for queries on a non-standard port number.
-q name

This option sets the query name to name. While the query name can be specified without using the -q option, it is
sometimes necessary to disambiguate names from types or classes (for example, when looking up the name “ns”,
which could be misinterpreted as the type NS, or “ch”, which could be misinterpreted as class CH).

This option sets the query type to type, which can be any valid query type supported in BIND 9 except for zone
transfer types AXFR and IXFR. As with -q , this is useful to distinguish query-name types or classes when they
are ambiguous. It is sometimes necessary to disambiguate names from types.
The default query type is “A”, unless the -x option is supplied to indicate a reverse lookup, in which case it is
“PTR”.

This option prints the delv version and exits.
-x addr

This option performs a reverse lookup, mapping an address to a name. addr is an IPv4 address in dotted-decimal
notation, or a colon-delimited IPv6 address. When -x is used, there is no need to provide the name or type
arguments; delv automatically performs a lookup for a name like 11.12.13.10.in-addr.arpa and sets the
query type to PTR. IPv6 addresses are looked up using nibble format under the IP6.ARPA domain.

This option forces delv to only use IPv4.

This option forces delv to only use IPv6.

#### 16.3.5 Query Options
delv provides a number of query options which affect the way results are displayed, and in some cases the way lookups

are performed.
Each query option is identified by a keyword preceded by a plus sign (+). Some keywords set or reset an option. These
may be preceded by the string no to negate the meaning of that keyword. Other keywords assign values to options like
the timeout interval. They have the form +keyword=value. The query options are:
+cdflag, +nocdflag

This option controls whether to set the CD (checking disabled) bit in queries sent by delv. This may be useful
when troubleshooting DNSSEC problems from behind a validating resolver. A validating resolver blocks invalid
responses, making it difficult to retrieve them for analysis. Setting the CD flag on queries causes the resolver to
return invalid responses, which delv can then validate internally and report the errors in detail.

+class, +noclass

This option controls whether to display the CLASS when printing a record. The default is to display the CLASS.
+hint=FILE, +nohint

This option specifies a filename from which to load root hints; this will be used to find the root name servers when
name server mode (delv +ns) is in use. If the option is not specified, built-in root hints will be used.
+ns, +nons

This option toggles name server mode. When this option is in use, the delv process instantiates a full recursive
resolver, and uses that to look up the requested query name and type. Turning on this option also activates +mtrace,
+strace and +rtrace, so that every iterative query will be logged, including the full response messages from each
authoritatve server. These logged messages will be written to stdout rather than stderr as usual, so that the full
trace can be captured more easily.
This is intended to be similar to the behavior of dig +trace, but because it uses the same code as named, it much
more accurately replicates the behavior of a recursive name server with a cold cache that is processing a recursive
query.
+qmin[=MODE], +noqmin

When used with +ns, this option enables QNAME minimization mode. Valid options of MODE are relaxed
and strict. By default, QNAME minimization is disabled. If +qmin is specified but MODE is omitted, then
relaxed mode will be used.
+ttl, +nottl

This option controls whether to display the TTL when printing a record. The default is to display the TTL.
+rtrace, +nortrace

This option toggles resolver fetch logging. This reports the name and type of each query sent by delv in the process
of carrying out the resolution and validation process, including the original query and all subsequent queries to follow
CNAMEs and to establish a chain of trust for DNSSEC validation.
This is equivalent to setting the debug level to 1 in the “resolver” logging category. Setting the systemwide debug
level to 1 using the -d option produces the same output, but affects other logging categories as well.
+mtrace, +nomtrace

This option toggles logging of messages received. This produces a detailed dump of the responses received by
delv in the process of carrying out the resolution and validation process.
This is equivalent to setting the debug level to 10 for the “packets” module of the “resolver” logging category.
Setting the systemwide debug level to 10 using the -d option produces the same output, but affects other logging
categories as well.
+strace, +nostrace

This option toggles logging of messages sent. This produces a detailed dump of the queries sent by delv in the
process of carrying out the resolution and validation process. Turning on this option also activates +mtrace.
This is equivalent to setting the debug level to 11 for the “packets” module of the “resolver” logging category.
Setting the systemwide debug level to 11 using the -d option produces the same output, but affects other logging
categories as well.
+vtrace, +novtrace

This option toggles validation logging. This shows the internal process of the validator as it determines whether an
answer is validly signed, unsigned, or invalid.
This is equivalent to setting the debug level to 3 for the “validator” module of the “dnssec” logging category. Setting
the systemwide debug level to 3 using the -d option produces the same output, but affects other logging categories
as well.

16.3. delv - DNS lookup and validation utility

+short, +noshort

This option toggles between verbose and terse answers. The default is to print the answer in a verbose form.
+comments, +nocomments

This option toggles the display of comment lines in the output. The default is to print comments.
+rrcomments, +norrcomments

This option toggles the display of per-record comments in the output (for example, human-readable key information
about DNSKEY records). The default is to print per-record comments.
+crypto, +nocrypto

This option toggles the display of cryptographic fields in DNSSEC records. The contents of these fields are unnecessary to debug most DNSSEC validation failures and removing them makes it easier to see the common failures.
The default is to display the fields. When omitted, they are replaced by the string [omitted] or, in the DNSKEY
case, the key ID is displayed as the replacement, e.g. [ key id = value ].
+restarts

When name server mode (delv +ns) is in use, this option sets the maximum number of CNAME queries to follow
before terminating resolution. This prevents delv from hanging in the event of a CNAME loop. The default is 11.
+maxqueries

This option specifies the maximum number of queries to send to resolve a name before giving up. The default is
50.
+maxtotalqueries

This option specifies the maximum number of queries to send to resolve a client request before giving up. The
default is 200.
+trust, +notrust

This option controls whether to display the trust level when printing a record. The default is to display the trust
level.
+split[=W], +nosplit

This option splits long hex- or base64-formatted fields in resource records into chunks of W characters (where W is
rounded up to the nearest multiple of 4). +nosplit or +split=0 causes fields not to be split at all. The default
is 56 characters, or 44 characters when multiline mode is active.
+all, +noall

This option sets or clears the display options +comments, +rrcomments, and +trust as a group.
+multiline, +nomultiline

This option prints long records (such as RRSIG, DNSKEY, and SOA records) in a verbose multi-line format with
human-readable comments. The default is to print each record on a single line, to facilitate machine parsing of the
delv output.
+dnssec, +nodnssec

This option indicates whether to display RRSIG records in the delv output. The default is to do so. Note that
(unlike in dig ) this does not control whether to request DNSSEC records or to validate them. DNSSEC records
are always requested, and validation always occurs unless suppressed by the use of -i or +noroot.
+root[=ROOT], +noroot

This option indicates whether to perform conventional DNSSEC validation, and if so, specifies the name of a trust
anchor. The default is to validate using a trust anchor of “.” (the root zone), for which there is a built-in key. If
specifying a different trust anchor, then -a must be used to specify a file containing the key.

+tcp, +notcp

This option controls whether to use TCP when sending queries. The default is to use UDP unless a truncated
response has been received.
+unknownformat, +nounknownformat

This option prints all RDATA in unknown RR-type presentation format (RFC 3597). The default is to print
RDATA for known types in the type’s presentation format.
+yaml, +noyaml

This option prints response data in YAML format.

#### 16.3.6 Files

#### 16.3.7 See Also
dig(1), named(8), RFC 4034, RFC 4035, RFC 4431, RFC 5074, RFC 5155.

16.4 dig - DNS lookup utility
16.4.1 Synopsis
dig [@server] [-b address] [-c class] [-f filename] [-F] [-k filename] [-m] [-p port#] [-q name] [-t type] [-v] [-x addr]

[-y [hmac:]name:key] [ [-4] | [-6] ] [name] [type] [class] [queryopt…]
dig [-h]
dig [global-queryopt…] [query…]

#### 16.4.2 Description
dig is a flexible tool for interrogating DNS name servers. It performs DNS lookups and displays the answers that are
returned from the name server(s) that were queried. Most DNS administrators use dig to troubleshoot DNS problems
because of its flexibility, ease of use, and clarity of output. Other lookup tools tend to have less functionality than dig.

Although dig is normally used with command-line arguments, it also has a batch mode of operation for reading lookup
requests from a file. A brief summary of its command-line arguments and options is printed when the -h option is given.
The BIND 9 implementation of dig allows multiple lookups to be issued from the command line.
Unless it is told to query a specific name server, dig tries each of the servers listed in /etc/resolv.conf. If no usable
server addresses are found, dig sends the query to the local host.
When no command-line arguments or options are given, dig performs an NS query for “.” (the root).
It is possible to set per-user defaults for dig via ${HOME}/.digrc. This file is read and any options in it are applied
before the command-line arguments. The -r option disables this feature, for scripts that need predictable behavior.
The IN and CH class names overlap with the IN and CH top-level domain names. Either use the -t and -c options to
specify the type and class, use the -q to specify the domain name, or use “IN.” and “CH.” when looking up these top-level
domains.

#### 16.4.3 Simple Usage
A typical invocation of dig looks like:

dig @server name type

where:

is the name or IP address of the name server to query. This can be an IPv4 address in dotted-decimal notation or
an IPv6 address in colon-delimited notation. When the supplied server argument is a hostname, dig resolves
that name before querying that name server.
If no server argument is provided, dig consults /etc/resolv.conf; if an address is found there, it queries the
name server at that address. If either of the -4 or -6 options are in use, then only addresses for the corresponding
transport are tried. If no usable addresses are found, dig sends the query to the local host. The reply from the
name server that responds is displayed.

is the name of the resource record that is to be looked up.

indicates what type of query is required - ANY, A, MX, SIG, etc. type can be any valid query type. If no type
argument is supplied, dig performs a lookup for an A record.

#### 16.4.4 Options

This option indicates that only IPv4 should be used.

This option indicates that only IPv6 should be used.
-b address[#port]

This option sets the source IP address of the query. The address must be a valid address on one of the host’s
network interfaces, or “0.0.0.0” or “::”. An optional port may be specified by appending #port.

This option sets the query class. The default class is IN; other classes are HS for Hesiod records or CH for
Chaosnet records.
-f file

This option sets batch mode, in which dig reads a list of lookup requests to process from the given file. Each
line in the file should be organized in the same way it would be presented as a query to dig using the command-line
interface.

This option enables FIPS mode if supported by the cryptographic library in use.

Print a usage summary.
-k keyfile

This option tells dig to sign queries using TSIG or SIG(0) using a key read from the given file. Key files can be
generated using tsig-keygen. When using TSIG authentication with dig, the name server that is queried needs
to know the key and algorithm that is being used. In BIND, this is done by providing appropriate key and server
statements in named.conf for TSIG and by looking up the KEY record in zone data for SIG(0).

This option enables memory usage debugging.

This option sends the query to a non-standard port on the server, instead of the default port 53. This option is used
to test a name server that has been configured to listen for queries on a non-standard port number.
-q name

This option specifies the domain name to query. This is useful to distinguish the name from other arguments.

This option indicates that options from ${HOME}/.digrc should not be read. This is useful for scripts that need
predictable behavior.

This option indicates the resource record type to query, which can be any valid query type. If it is a resource record
type supported in BIND 9, it can be given by the type mnemonic (such as NS or AAAA). The default query type is
A, unless the -x option is supplied to indicate a reverse lookup. A zone transfer can be requested by specifying a
type of AXFR. When an incremental zone transfer (IXFR) is required, set the type to ixfr=N. The incremental
zone transfer contains all changes made to the zone since the serial number in the zone’s SOA record was N.
All resource record types can be expressed as TYPEnn, where nn is the number of the type. If the resource record
type is not supported in BIND 9, the result is displayed as described in RFC 3597.

This option indicates that print query times should be provided in microseconds instead of milliseconds.

This option prints the version number and exits.
-x addr

This option sets simplified reverse lookups, for mapping addresses to names. The addr is an IPv4 address in
dotted-decimal notation, or a colon-delimited IPv6 address. When the -x option is used, there is no need to
provide the name, class, and type arguments. dig automatically performs a lookup for a name like 94.2.0.
192.in-addr.arpa and sets the query type and class to PTR and IN respectively. IPv6 addresses are looked up
using nibble format under the IP6.ARPA domain.
-y [hmac:]keyname:secret

This option signs queries using TSIG with the given authentication key. keyname is the name of the key, and
secret is the base64-encoded shared secret. hmac is the name of the key algorithm; valid choices are hmac-md5,
hmac-sha1, hmac-sha224, hmac-sha256, hmac-sha384, or hmac-sha512. If hmac is not specified, the
default is hmac-md5; if MD5 was disabled, the default is hmac-sha256.
Only the -k option should be used, rather than the -y option, because with -y the shared secret is supplied as a
command-line argument in clear text. This may be visible in the output from ps1 or in a history file maintained by
the user’s shell.

#### 16.4.5 Query Options
dig provides a number of query options which affect the way in which lookups are made and the results displayed. Some

of these set or reset flag bits in the query header, some determine which sections of the answer get printed, and others
determine the timeout and retry strategies.
Each query option is identified by a keyword preceded by a plus sign (+). Some keywords set or reset an option; these
may be preceded by the string no to negate the meaning of that keyword. Other keywords assign values to options, like
the timeout interval. They have the form +keyword=value. Keywords may be abbreviated, provided the abbreviation
is unambiguous; for example, +cd is equivalent to +cdflag . The query options are:

+aaflag, +noaaflag

This option is a synonym for +aaonly , +noaaonly .
+aaonly, +noaaonly

This option sets the aa flag in the query.
+additional, +noadditional

This option displays [or does not display] the additional section of a reply. The default is to display it.
+adflag, +noadflag

This option sets [or does not set] the AD (authentic data) bit in the query. This requests the server to return whether
all of the answer and authority sections have been validated as secure, according to the security policy of the server.
AD=1 indicates that all records have been validated as secure and the answer is not from a OPT-OUT range. AD=0
indicates that some part of the answer was insecure or not validated. This bit is set by default.
+all, +noall

This option sets or clears all display flags.
+answer, +noanswer

This option displays [or does not display] the answer section of a reply. The default is to display it.
+authority, +noauthority

This option displays [or does not display] the authority section of a reply. The default is to display it.
+badcookie, +nobadcookie

This option retries the lookup with a new server cookie if a BADCOOKIE response is received.
+besteffort, +nobesteffort

This option attempts to display the contents of messages which are malformed. The default is to not display malformed answers.
+bufsize[=B]

This option sets the UDP message buffer size advertised using EDNS0 to B bytes. The maximum and minimum
sizes of this buffer are 65535 and 0, respectively. +bufsize restores the default buffer size.
+cd, +cdflag, +nocdflag

This option sets [or does not set] the CD (checking disabled) bit in the query. This requests the server to not
perform DNSSEC validation of responses.
+class, +noclass

This option displays [or does not display] the CLASS when printing the record.
+cmd, +nocmd

This option toggles the printing of the initial comment in the output, identifying the version of dig and the query
options that have been applied. This option always has a global effect; it cannot be set globally and then overridden
on a per-lookup basis. The default is to print this comment.
+comments, +nocomments

This option toggles the display of some comment lines in the output, with information about the packet header and
OPT pseudosection, and the names of the response section. The default is to print these comments.
Other types of comments in the output are not affected by this option, but can be controlled using other commandline switches. These include +cmd, +question, +stats, and +rrcomments.
+cookie=####, +nocookie

This option sends [or does not send] a COOKIE EDNS option, with an optional value. Replaying a COOKIE from
a previous response allows the server to identify a previous client. The default is +cookie.
+cookie is also set when +trace is set to better emulate the default queries from a nameserver.

+crypto, +nocrypto

This option toggles the display of cryptographic fields in DNSSEC records. The contents of these fields are unnecessary for debugging most DNSSEC validation failures and removing them makes it easier to see the common
failures. The default is to display the fields. When omitted, they are replaced by the string [omitted] or, in the
DNSKEY case, the key ID is displayed as the replacement, e.g. [ key id = value ].
+defname, +nodefname

This option, which is deprecated, is treated as a synonym for +search, +nosearch.
+dns64prefix, +nodns64prefix

Lookup IPV4ONLY.ARPA AAAA and print any DNS64 prefixes found.
+dnssec, +do, +nodnssec, +nodo

This option requests that DNSSEC records be sent by setting the DNSSEC OK (DO) bit in the OPT record in the
additional section of the query.
+domain=somename

This option sets the search list to contain the single domain somename, as if specified in a domain directive in
/etc/resolv.conf, and enables search list processing as if the +search option were given.
+edns[=#], +noedns

This option specifies the EDNS version to query with. Valid values are 0 to 255. Setting the EDNS version causes
an EDNS query to be sent. +noedns clears the remembered EDNS version. EDNS is set to 0 by default.
+ednsflags[=#], +noednsflags

This option sets the must-be-zero EDNS flags bits (Z bits) to the specified value. Decimal, hex, and octal encodings
are accepted. Setting a named flag (e.g., DO) is silently ignored. By default, no Z bits are set.
+ednsnegotiation, +noednsnegotiation

This option enables/disables EDNS version negotiation. By default, EDNS version negotiation is enabled.
+ednsopt[=code[:value]], +noednsopt

This option specifies the EDNS option with code point code and an optional payload of value as a hexadecimal
string. code can be either an EDNS option name (for example, NSID or ECS) or an arbitrary numeric value.
+noednsopt clears the EDNS options to be sent.
+expire, +noexpire

This option sends an EDNS Expire option.
+fail, +nofail

This option indicates that named should try [or not try] the next server if a SERVFAIL is received. The default is
to not try the next server, which is the reverse of normal stub resolver behavior.
+fuzztime[=value], +nofuzztime

This option allows the signing time to be specified when generating signed messages. If a value is specified it is the
seconds since 00:00:00 January 1, 1970 UTC ignoring leap seconds. If no value is specified 1646972129 (Fri 11
Mar 2022 04:15:29 UTC) is used. The default is +nofuzztime and the current time is used.
+header-only, +noheader-only

This option sends a query with a DNS header without a question section. The default is to add a question section.
The query type and query name are ignored when this is set.
+https[=value], +nohttps

This option indicates whether to use DNS over HTTPS (DoH) when querying name servers. When this option is
in use, the port number defaults to 443. The HTTP POST request mode is used when sending the query.
If value is specified, it will be used as the HTTP endpoint in the query URI; the default is /dns-query. So, for
example, dig @example.com +https will use the URI https://example.com/dns-query.

+https-get[=value], +nohttps-get

Similar to +https, except that the HTTP GET request mode is used when sending the query.
+https-post[=value], +nohttps-post

Same as +https.
+http-plain[=value], +nohttp-plain

Similar to +https, except that HTTP queries will be sent over a non-encrypted channel. When this option is in
use, the port number defaults to 80 and the HTTP request mode is POST.
+http-plain-get[=value], +nohttp-plain-get

Similar to +http-plain, except that the HTTP request mode is GET.
+http-plain-post[=value], +nohttp-plain-post

Same as +http-plain.
+identify, +noidentify

This option shows [or does not show] the IP address and port number that supplied the answer, when the +short
option is enabled. If short form answers are requested, the default is not to show the source address and port number
of the server that provided the answer.
+idn, +noidn

Enable or disable IDN processing. By default IDN is enabled for input query names, and for display when the
output is a terminal.
You can also turn off dig’s IDN processing by setting the IDN_DISABLE environment variable.
+ignore, +noignore

This option ignores [or does not ignore] truncation in UDP responses instead of retrying with TCP. By default,
TCP retries are performed.
+keepalive, +nokeepalive

This option sends [or does not send] an EDNS Keepalive option.
+keepopen, +nokeepopen

This option keeps [or does not keep] the TCP socket open between queries, and reuses it rather than creating a new
TCP socket for each lookup. The default is +nokeepopen.
+multiline, +nomultiline

This option prints [or does not print] records, like the SOA records, in a verbose multi-line format with humanreadable comments. The default is to print each record on a single line to facilitate machine parsing of the dig
output.
+ndots=D

This option sets the number of dots (D) that must appear in name for it to be considered absolute. The default
value is that defined using the ndots statement in /etc/resolv.conf, or 1 if no ndots statement is present.
Names with fewer dots are interpreted as relative names, and are searched for in the domains listed in the search
or domain directive in /etc/resolv.conf if +search is set.
+nsid, +nonsid

When enabled, this option includes an EDNS name server ID request when sending a query.
+nssearch, +nonssearch

When this option is set, dig attempts to find the authoritative name servers for the zone containing the name being
looked up, and display the SOA record that each name server has for the zone. Addresses of servers that did not
respond are also printed.

+onesoa, +noonesoa

When enabled, this option prints only one (starting) SOA record when performing an AXFR. The default is to print
both the starting and ending SOA records.
+opcode=value, +noopcode

When enabled, this option sets (restores) the DNS message opcode to the specified value. The default value is
QUERY (0).
+padding=value

This option pads the size of the query packet using the EDNS Padding option to blocks of value bytes. For
example, +padding=32 causes a 48-byte query to be padded to 64 bytes. The default block size is 0, which
disables padding; the maximum is 512. Values are ordinarily expected to be powers of two, such as 128; however,
this is not mandatory. Responses to padded queries may also be padded, but only if the query uses TCP or DNS
COOKIE.
+proxy[=src_addr[#src_port]-dst_addr[#dst_port]], +noproxy

When this option is set, dig adds PROXYv2 headers to the queries. When source and destination addresses are
specified, the headers contain them and use the PROXY command. It means for the remote peer that the queries
were sent on behalf of another node and that the PROXYv2 header reflects the original connection endpoints. The
default source port is 0 and destination port is 53.
For encrypted DNS transports, to prevent accidental information leakage, encryption is applied to the PROXYv2
headers: the headers are sent right after the handshake process has been completed.
For plain DNS transports, no encryption is applied to the PROXYv2 headers.
If the addressees are omitted, PROXYv2 headers, that use the LOCAL command set, are added instead. For the
remote peer, that means that the queries were sent on purpose without being relayed, so the real connection endpoint
addresses must be used.
+proxy-plain[=src_addr[#src_port]-dst_addr[#dst_port], +noproxy-plain

The same as +[no]proxy, but instructs dig to send PROXYv2 headers ahead of any encryption, before any handshake messages are sent. That makes dig behave exactly how it is described in the PROXY protocol specification,
but not all software expects such behaviour.
Please consult the software documentation to find out if you need this option. (for example, dnsdist expects
encrypted PROXYv2 headers sent over TLS when encryption is used, while HAProxy and many other software
packages expect plain ones).
For plain DNS transports the option is effectively an alias for the +[no]proxy described above.
+qid=value

This option specifies the query ID to use when sending queries.
+qr, +noqr

This option toggles the display of the query message as it is sent. By default, the query is not printed.
+question, +noquestion

This option toggles the display of the question section of a query when an answer is returned. The default is to print
the question section as a comment.
+raflag, +noraflag

This option sets [or does not set] the RA (Recursion Available) bit in the query. The default is +noraflag. This
bit is ignored by the server for QUERY.
+rdflag, +nordflag

This option is a synonym for +recurse, +norecurse.

+recurse, +norecurse

This option toggles the setting of the RD (recursion desired) bit in the query. This bit is set by default, which means
dig normally sends recursive queries. Recursion is automatically disabled when the +nssearch or +trace query
option is used.
+retry=T

This option sets the number of times to retry UDP and TCP queries to server to T instead of the default, 2. Unlike
+tries, this does not include the initial query.
+rrcomments, +norrcomments

This option toggles the display of per-record comments in the output (for example, human-readable key information
about DNSKEY records). The default is not to print record comments unless multiline mode is active.
+search, +nosearch

This option uses [or does not use] the search list defined by the searchlist or domain directive in resolv.conf, if
any. The search list is not used by default.
ndots from resolv.conf (default 1), which may be overridden by +ndots, determines whether the name is
treated as relative and hence whether a search is eventually performed.
+short, +noshort

This option toggles whether a terse answer is provided. The default is to print the answer in a verbose form. This
option always has a global effect; it cannot be set globally and then overridden on a per-lookup basis.
+showbadcookie, +noshowbadcookie

This option toggles whether to show the message containing the BADCOOKIE rcode before retrying the request
or not. The default is to not show the messages.
+showbadvers, +noshowbadvers

This option toggles whether to show the message containing the BADVERS rcode before retrying the request or
not. The default is to not show the messages.
+showsearch, +noshowsearch

This option performs [or does not perform] a search showing intermediate results.
+split=W

This option splits long hex- or base64-formatted fields in resource records into chunks of W characters (where W is
rounded up to the nearest multiple of 4). +nosplit or +split=0 causes fields not to be split at all. The default
is 56 characters, or 44 characters when multiline mode is active.
+stats, +nostats

This option toggles the printing of statistics: when the query was made, the size of the reply, etc. The default
behavior is to print the query statistics as a comment after each lookup.
+subnet=addr[/prefix-length], +nosubnet

This option sends [or does not send] an EDNS CLIENT-SUBNET option with the specified IP address or network
prefix.
dig +subnet=0.0.0.0/0, or simply dig +subnet=0 for short, sends an EDNS CLIENT-SUBNET option with
an empty address and a source prefix-length of zero, which signals a resolver that the client’s address information
must not be used when resolving this query.
+svcparamkeycompat, +nosvcparamkeycompat

This option sets [or does not set] the backward-compatible representation of the Service Parameter Keys (SvcParamKeys) for SVCB records, in which case the keys, which were not defined initially in RFC 9460 are represented in their opaque “keyN”-like format, where “N” is their numerical value. The default is +nosvcparamkeycompat.

+tcflag, +notcflag

This option sets [or does not set] the TC (TrunCation) bit in the query. The default is +notcflag. This bit is
ignored by the server for QUERY.
+tcp, +notcp

This option indicates whether to use TCP when querying name servers. The default behavior is to use UDP unless
a type any or ixfr=N query is requested, in which case the default is TCP. AXFR queries always use TCP. To
prevent retry over TCP when TC=1 is returned from a UDP query, use +ignore.
+timeout=T

This option sets the timeout for a query to T seconds. The default timeout is 5 seconds. An attempt to set T to less
than 1 is silently set to 1.
+tls, +notls

This option indicates whether to use DNS over TLS (DoT) when querying name servers. When this option is in
use, the port number defaults to 853.
+tls-ca[=file-name], +notls-ca

This option enables remote server TLS certificate validation for DNS transports, relying on TLS. Certificate authorities certificates are loaded from the specified PEM file (file-name). If the file is not specified, the default
certificates from the global certificates store are used.
+tls-certfile=file-name, +tls-keyfile=file-name, +notls-certfile, +notls-keyfile

These options set the state of certificate-based client authentication for DNS transports, relying on TLS. Both
certificate chain file and private key file are expected to be in PEM format. Both options must be specified at the
same time.
+tls-hostname=hostname, +notls-hostname

This option makes dig use the provided hostname during remote server TLS certificate verification. Otherwise,
the DNS server name is used. This option has no effect if +tls-ca is not specified.
+trace, +notrace

This option toggles tracing of the delegation path from the root name servers for the name being looked up. Tracing
is disabled by default. When tracing is enabled, dig makes iterative queries to resolve the name being looked up.
It follows referrals from the root servers, showing the answer from each server that was used to resolve the lookup.
If @server is also specified, it affects only the initial query for the root zone name servers.
+dnssec is set when +trace is set, to better emulate the default queries from a name server.

Note that the delv +ns option can also be used for tracing the resolution of a name from the root (see delv ).
+tries=T

This option sets the number of times to try UDP and TCP queries to server to T instead of the default, 3. If T is
less than or equal to zero, the number of tries is silently rounded up to 1.
+ttlid, +nottlid

This option displays [or does not display] the TTL when printing the record.
+ttlunits, +nottlunits

This option displays [or does not display] the TTL in friendly human-readable time units of s, m, h, d, and w,
representing seconds, minutes, hours, days, and weeks. This implies +ttlid.
+unknownformat, +nounknownformat

This option prints all RDATA in unknown RR type presentation format (RFC 3597). The default is to print
RDATA for known types in the type’s presentation format.

+vc, +novc

This option uses [or does not use] TCP when querying name servers. This alternate syntax to +tcp is provided for
backwards compatibility. The vc stands for “virtual circuit.”
+yaml, +noyaml

When enabled, this option prints the responses (and, if +qr is in use, also the outgoing queries) in a detailed YAML
format.
+zflag, +nozflag

This option sets [or does not set] the last unassigned DNS header flag in a DNS query. This flag is off by default.

#### 16.4.6 Multiple Queries
The BIND 9 implementation of dig supports specifying multiple queries on the command line (in addition to supporting
the -f batch file option). Each of those queries can be supplied with its own set of flags, options, and query options.
In this case, each query argument represents an individual query in the command-line syntax described above. Each
consists of any of the standard options and flags, the name to be looked up, an optional query type and class, and any
query options that should be applied to that query.
A global set of query options, which should be applied to all queries, can also be supplied. These global query options
must precede the first tuple of name, class, type, options, flags, and query options supplied on the command line. Any
global query options (except +cmd and +short options) can be overridden by a query-specific set of query options. For
example:
dig +qr www.isc.org any -x 127.0.0.1 isc.org ns +noqr

shows how dig can be used from the command line to make three lookups: an ANY query for www.isc.org, a reverse
lookup of 127.0.0.1, and a query for the NS records of isc.org. A global query option of +qr is applied, so that dig
shows the initial query it made for each lookup. The final query has a local query option of +noqr which means that dig
does not print the initial query when it looks up the NS records for isc.org.

#### 16.4.7 Return Codes
dig return codes are:

DNS response received, including NXDOMAIN status

Usage error
8

Couldn’t open batch file

No reply from server

Internal error

#### 16.4.8 Files
${HOME}/.digrc

#### 16.4.9 See Also
delv(1), host(1), named(8), dnssec-keygen(8), RFC 1035.

#### 16.4.10 Bugs
There are probably too many query options.

16.5 dnssec-cds - change DS records for a child zone based on
CDS/CDNSKEY
16.5.1 Synopsis
dnssec-cds [-a alg…] [-c class] [-D] {-d dsset-file} {-f child-file} [-i**[extension]] [-s** start-time] [-T ttl] [-u] [-v

level] [-V] {domain}

#### 16.5.2 Description
The dnssec-cds command changes DS records at a delegation point based on CDS or CDNSKEY records published
in the child zone. If both CDS and CDNSKEY records are present in the child zone, the CDS is preferred. This enables a child zone to inform its parent of upcoming changes to its key-signing keys (KSKs); by polling periodically with
dnssec-cds, the parent can keep the DS records up-to-date and enable automatic rolling of KSKs.
Two input files are required. The -f child-file option specifies a file containing the child’s CDS and/or CDNSKEY
records, plus RRSIG and DNSKEY records so that they can be authenticated. The -d path option specifies the location
of a file containing the current DS records. For example, this could be a dsset- file generated by dnssec-signzone,
or the output of dnssec-dsfromkey , or the output of a previous run of dnssec-cds.
The dnssec-cds command uses special DNSSEC validation logic specified by RFC 7344. It requires that the CDS
and/or CDNSKEY records be validly signed by a key represented in the existing DS records. This is typically the preexisting KSK.
For protection against replay attacks, the signatures on the child records must not be older than they were on a previous
run of dnssec-cds. Their age is obtained from the modification time of the dsset- file, or from the -s option.
To protect against breaking the delegation, dnssec-cds ensures that the DNSKEY RRset can be verified by every key
algorithm in the new DS RRset, and that the same set of keys are covered by every DS digest type.
By default, replacement DS records are written to the standard output; with the -i option the input file is overwritten in
place. The replacement DS records are the same as the existing records, when no change is required. The output can be
empty if the CDS/CDNSKEY records specify that the child zone wants to be insecure.
Be careful not to delete the DS records when dnssec-cds fails!
Alternatively, :option`dnssec-cds -u` writes an nsupdate script to the standard output. The -u and -i options can be
used together to maintain a dsset- file as well as emit an nsupdate script.

#### 16.5.3 Options

When converting CDS records to DS records, this option specifies the acceptable digest algorithms. This option
can be repeated, so that multiple digest types are allowed. If none of the CDS records use an acceptable digest

16.5. dnssec-cds - change DS records for a child zone based on CDS/CDNSKEY

type, dnssec-cds will try to use CDNSKEY records instead; if there are no CDNSKEY records, it reports an
When converting CDNSKEY records to DS records, this option specifies the digest algorithm to use. It can be
repeated, so that multiple DS records are created for each CDNSKEY records.
The algorithm must be one of SHA-1, SHA-256, or SHA-384. These values are case-insensitive, and the hyphen
may be omitted. If no algorithm is specified, the default is SHA-256 only.

This option specifies the DNS class of the zones.

This option generates DS records from CDNSKEY records if both CDS and CDNSKEY records are present in the
child zone. By default CDS records are preferred.
-d path

This specifies the location of the parent DS records. The path can be the name of a file containing the DS records;
if it is a directory, dnssec-cds looks for a dsset- file for the domain inside the directory.
To protect against replay attacks, child records are rejected if they were signed earlier than the modification time
of the dsset- file. This can be adjusted with the -s option.
-f child-file

This option specifies the file containing the child’s CDS and/or CDNSKEY records, plus its DNSKEY records and
the covering RRSIG records, so that they can be authenticated.
The examples below describe how to generate this file.
-i extension

This option updates the dsset- file in place, instead of writing DS records to the standard output.
There must be no space between the -i and the extension. If no extension is provided, the old dsset- is discarded.
If an extension is present, a backup of the old dsset- file is kept with the extension appended to its filename.
To protect against replay attacks, the modification time of the dsset- file is set to match the signature inception
time of the child records, provided that it is later than the file’s current modification time.
-s start-time

This option specifies the date and time after which RRSIG records become acceptable. This can be either an
absolute or a relative time. An absolute start time is indicated by a number in YYYYMMDDHHMMSS notation;
20170827133700 denotes 13:37:00 UTC on August 27th, 2017. A time relative to the dsset- file is indicated
with -N, which is N seconds before the file modification time. A time relative to the current time is indicated with
now+N.
If no start-time is specified, the modification time of the dsset- file is used.
-T ttl

This option specifies a TTL to be used for new DS records. If not specified, the default is the TTL of the old DS
records. If they had no explicit TTL, the new DS records also have no explicit TTL.

This option writes an nsupdate script to the standard output, instead of printing the new DS reords. The output
is empty if no change is needed.
Note: The TTL of new records needs to be specified: it can be done in the original dsset- file, with the -T option,
or using the nsupdate ttl command.

This option sets the debugging level. Level 1 is intended to be usefully verbose for general users; higher levels are
intended for developers.
domain

This indicates the name of the delegation point/child zone apex.

#### 16.5.4 Exit Status
The dnssec-cds command exits 0 on success, or non-zero if an error occurred.
If successful, the DS records may or may not need to be changed.

#### 16.5.5 Examples
Before running dnssec-signzone, ensure that the delegations are up-to-date by running dnssec-cds on every dssetfile.
To fetch the child records required by dnssec-cds, invoke dig as in the script below. It is acceptable if the dig fails,
since dnssec-cds performs all the necessary checking.
for f in dsset-*
do
d=${f#dsset-}
dig +dnssec +noall +answer $d DNSKEY $d CDNSKEY $d CDS |
dnssec-cds -i -f /dev/stdin -d $f $d
done

When the parent zone is automatically signed by named, dnssec-cds can be used with nsupdate to maintain a delegation as follows. The dsset- file allows the script to avoid having to fetch and validate the parent DS records, and it
maintains the replay attack protection time.
dig +dnssec +noall +answer $d DNSKEY $d CDNSKEY $d CDS |
dnssec-cds -u -i -f /dev/stdin -d $f $d |
nsupdate -l

#### 16.5.6 See Also
dig(1), dnssec-settime(8), dnssec-signzone(8), nsupdate(1), BIND 9 Administrator Reference Manual,

RFC 7344.

16.6 dnssec-dsfromkey - DNSSEC DS RR generation tool
16.6.1 Synopsis
dnssec-dsfromkey [ -1 | -2 | -a alg ] [ -C ] [-T TTL] [-v level] [-K directory] {keyfile}
dnssec-dsfromkey [ -1 | -2 | -a alg ] [ -C ] [-T TTL] [-v level] [-c class] [-A] {-f file} [dnsname]
dnssec-dsfromkey [ -1 | -2 | -a alg ] [ -C ] [-T TTL] [-v level] [-c class] [-K directory] {-s} {dnsname}
dnssec-dsfromkey [ -h | -V ]

16.6. dnssec-dsfromkey - DNSSEC DS RR generation tool

#### 16.6.2 Description
The dnssec-dsfromkey command outputs DS (Delegation Signer) resource records (RRs), or CDS (Child DS) RRs
with the -C option.
By default, only KSKs are converted (keys with flags = 257). The -A option includes ZSKs (flags = 256). Revoked keys
are never included.
The input keys can be specified in a number of ways:
By default, dnssec-dsfromkey reads a key file named in the format Knnnn.+aaa+iiiii.key, as generated by
dnssec-keygen.
With the -f file option, dnssec-dsfromkey reads keys from a zone file or partial zone file (which can contain just
the DNSKEY records).
With the -s option, dnssec-dsfromkey reads a keyset- file, as generated by dnssec-keygen -C .

#### 16.6.3 Options
-1

This option is an abbreviation for -a SHA1.
-2

This option is an abbreviation for -a SHA-256.

This option specifies a digest algorithm to use when converting DNSKEY records to DS records. This option can
be repeated, so that multiple DS records are created for each DNSKEY record.
The algorithm must be one of SHA-1, SHA-256, or SHA-384. These values are case-insensitive, and the hyphen
may be omitted. If no algorithm is specified, the default is SHA-256.
-A

This option indicates that ZSKs are to be included when generating DS records. Without this option, only keys
which have the KSK flag set are converted to DS records and printed. This option is only useful in -f zone file
mode.

This option specifies the DNS class; the default is IN. This option is only useful in -s keyset or -f zone file mode.

This option generates CDS records rather than DS records.
-f file

This option sets zone file mode, in which the final dnsname argument of dnssec-dsfromkey is the DNS domain
name of a zone whose master file can be read from file. If the zone name is the same as file, then it may be
omitted.
If file is -, then the zone data is read from the standard input. This makes it possible to use the output of the
dig command as input, as in:
dig dnskey example.com | dnssec-dsfromkey -f - example.com

This option prints usage information.

This option tells BIND 9 to look for key files or keyset- files in directory.

This option enables keyset mode, in which the final dnsname argument from dnssec-dsfromkey is the DNS
domain name used to locate a keyset- file.
-T TTL

This option specifies the TTL of the DS records. By default the TTL is omitted.

#### 16.6.4 Example
To build the SHA-256 DS RR from the Kexample.com.+003+26160 keyfile, issue the following command:
dnssec-dsfromkey -2 Kexample.com.+003+26160

The command returns something similar to:
example.com. IN DS 26160 5 2 3A1EADA7A74B8D0BA86726B0C227AA85AB8BBD2B2004F41A868A54F0C5EA0B94

#### 16.6.5 Files
The keyfile can be designated by the key identification Knnnn.+aaa+iiiii or the full file name Knnnn.+aaa+iiiii.
key, as generated by dnssec-keygen.
The keyset file name is built from the directory, the string keyset-, and the dnsname.

#### 16.6.6 Caveat
A keyfile error may return “file not found,” even if the file exists.

#### 16.6.7 See Also
dnssec-keygen(8), dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 3658 (DS RRs), RFC

4509 (SHA-256 for DS RRs), RFC 6605 (SHA-384 for DS RRs), RFC 7344 (CDS and CDNSKEY RRs).

16.7 dnssec-importkey - import DNSKEY records from external systems so they can be managed
16.7.1 Synopsis
dnssec-importkey [-K directory] [-L ttl] [-P date/offset] [-P sync date/offset] [-D date/offset] [-D sync date/offset]

[-h] [-v level] [-V] {keyfile}
dnssec-importkey {-f filename} [-K directory] [-L ttl] [-P date/offset] [-P sync date/offset] [-D date/offset] [-D sync
date/offset] [-h] [-v level] [-V] [dnsname]

#### 16.7.2 Description
dnssec-importkey reads a public DNSKEY record and generates a pair of .key/.private files. The DNSKEY record

may be read from an existing .key file, in which case a corresponding .private file is generated, or it may be read from any
other file or from the standard input, in which case both .key and .private files are generated.

16.7. dnssec-importkey - import DNSKEY records from external systems so they can be managed

The newly created .private file does not contain private key data, and cannot be used for signing. However, having a
.private file makes it possible to set publication (-P) and deletion (-D) times for the key, which means the public key can
be added to and removed from the DNSKEY RRset on schedule even if the true private key is stored offline.

#### 16.7.3 Options
-f filename

This option indicates the zone file mode. Instead of a public keyfile name, the argument is the DNS domain name
of a zone master file, which can be read from filename. If the domain name is the same as filename, then it
may be omitted.
If filename is set to "-", then the zone data is read from the standard input.

This option sets the directory in which the key files are to reside.

This option sets the default TTL to use for this key when it is converted into a DNSKEY RR. This is the TTL
used when the key is imported into a zone, unless there was already a DNSKEY RRset in place, in which case the
existing TTL takes precedence. Setting the default TTL to 0 or none removes it from the key.

This option emits a usage message and exits.

#### 16.7.4 Timing Options
Dates can be expressed in the format YYYYMMDD or YYYYMMDDHHMMSS. (which is the format used inside key
files), or ‘Day Mon DD HH:MM:SS YYYY’ (as printed by dnssec-settime -p), or UNIX epoch time (as printed by
The argument can be followed by + or - and an offset from the given time. The literal now can be omitted before an
offset. The offset can be followed by one of the suffixes y, mo, w, d, h, or mi, so that it is computed in years (defined as
365 24-hour days, ignoring leap years), months (defined as 30 24-hour days), weeks, days, hours, or minutes, respectively.
To explicitly prevent a date from being set, use none, never, or unset.
All these formats are case-insensitive.

This option sets the date on which a key is to be published to the zone. After that date, the key is included in the
zone but is not used to sign it.

This option sets the date on which CDS and CDNSKEY records that match this key are to be published to

This option sets the date on which the key is to be deleted. After that date, the key is no longer included in the

This option sets the date on which the CDS and CDNSKEY records that match this key are to be deleted.

#### 16.7.5 Files
A keyfile can be designed by the key identification Knnnn.+aaa+iiiii or the full file name Knnnn.+aaa+iiiii.key,
as generated by dnssec-keygen.

#### 16.7.6 See Also
dnssec-keygen(8), dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 5011.

16.8 dnssec-keyfromlabel - DNSSEC key generation tool
16.8.1 Synopsis
dnssec-keyfromlabel {-l label} [-3] [-a algorithm] [-A date/offset] [-c class] [-D date/offset] [-D sync date/offset]

[-f flag] [-G] [-I date/offset] [-i interval] [-k] [-K directory] [-L ttl] [-M tag_min:tag_max] [-n nametype] [-P date/offset]
[-P sync date/offset] [-p protocol] [-R date/offset] [-S key] [-t type] [-v level] [-V] [-y] {name}

#### 16.8.2 Description
dnssec-keyfromlabel generates a pair of key files that reference a key object stored in a cryptographic hardware

service module (HSM). The private key file can be used for DNSSEC signing of zone data as if it were a conventional
signing key created by dnssec-keygen, but the key material is stored within the HSM and the actual signing takes place
there.
The name of the key is specified on the command line. This must match the name of the zone for which the key is being
generated.

#### 16.8.3 Options

This option selects the cryptographic algorithm. The value of algorithm must be one of RSASHA1,
NSEC3RSASHA1, RSASHA256, RSASHA512, ECDSAP256SHA256, ECDSAP384SHA384, ED25519, or
ED448.
These values are case-insensitive. In some cases, abbreviations are supported, such as ECDSA256 for ECDSAP256SHA256 and ECDSA384 for ECDSAP384SHA384. If RSASHA1 is specified along with the -3 option,
then NSEC3RSASHA1 is used instead.
This option is mandatory except when using the -S option, which copies the algorithm from the predecessory key.
Changed in version 9.12.0: The default value RSASHA1 for newly generated keys was removed.
-3

This option uses an NSEC3-capable algorithm to generate a DNSSEC key. If this option is used with an algorithm
that has both NSEC and NSEC3 versions, then the NSEC3 version is used; for example, dnssec-keygen -3a
RSASHA1 specifies the NSEC3RSASHA1 algorithm.
-l label

This option specifies the label for a key pair in the crypto hardware.
When BIND 9 is built with OpenSSL-based PKCS#11 support, the label is an arbitrary string that identifies a
particular key.
-n nametype

This option specifies the owner type of the key. The value of nametype must either be ZONE (for a DNSSEC zone
key (KEY/DNSKEY)), HOST or ENTITY (for a key associated with a host (KEY)), USER (for a key associated
with a user (KEY)), or OTHER (DNSKEY). These values are case-insensitive.

16.8. dnssec-keyfromlabel - DNSSEC key generation tool

This option enables compatibility mode, which generates an old-style key, without any metadata. By default,
dnssec-keyfromlabel includes the key’s creation date in the metadata stored with the private key; other dates
may be set there as well, including publication date, activation date, etc. Keys that include this data may be incompatible with older versions of BIND; the -C option suppresses them.

This option indicates that the DNS record containing the key should have the specified class. If not specified, class
IN is used.
-f flag

This option sets the specified flag in the flag field of the KEY/DNSKEY record. The only recognized flags are
KSK (Key-Signing Key) and REVOKE.
-G

This option generates a key, but does not publish it or sign with it. This option is incompatible with -P and -A.

This option prints a short summary of the options and arguments to dnssec-keyfromlabel.

This option sets the directory in which the key files are to be written.
-k

This option generates KEY records rather than DNSKEY records.

This option sets the default TTL to use for this key when it is converted into a DNSKEY RR. This is the TTL
used when the key is imported into a zone, unless there was already a DNSKEY RRset in place, in which case the
existing TTL would take precedence. Setting the default TTL to 0 or none removes it.
-M tag_min:tag_max

This option sets the range of key tag values that dnssec-keyfromlabel will accept. If the key tag of the new
key or the key tag of the revoked version of the new key is outside this range, the new key will be rejected. This is
designed to be used when generating keys in a multi-signer scenario, where each operator is given a range of key
tags to prevent collisions among different operators. The valid values for tag_min and tag_max are [0..65535].
The default allows all key tag values to be accepted.
-p protocol

This option sets the protocol value for the key. The protocol is a number between 0 and 255. The default is 3
(DNSSEC). Other possible values for this argument are listed in RFC 2535 and its successors.
-S key

This option generates a key as an explicit successor to an existing key. The name, algorithm, size, and type of the
key are set to match the predecessor. The activation date of the new key is set to the inactivation date of the existing
one. The publication date is set to the activation date minus the prepublication interval, which defaults to 30 days.

This option indicates the type of the key. type must be one of AUTHCONF, NOAUTHCONF, NOAUTH, or
NOCONF. The default is AUTHCONF. AUTH refers to the ability to authenticate data, and CONF to the ability
to encrypt data.

-y

This option allows DNSSEC key files to be generated even if the key ID would collide with that of an existing key,
in the event of either key being revoked. (This is only safe to enable if RFC 5011 trust anchor maintenance is not
used with either of the keys involved.)

#### 16.8.4 Timing Options
Dates can be expressed in the format YYYYMMDD or YYYYMMDDHHMMSS (which is the format used inside key
files), or ‘Day Mon DD HH:MM:SS YYYY’ (as printed by dnssec-settime -p), or UNIX epoch time (as printed by
The argument can be followed by + or - and an offset from the given time. The literal now can be omitted before an
offset. The offset can be followed by one of the suffixes y, mo, w, d, h, or mi, so that it is computed in years (defined as
365 24-hour days, ignoring leap years), months (defined as 30 24-hour days), weeks, days, hours, or minutes, respectively.
To explicitly prevent a date from being set, use none, never, or unset.
All these formats are case-insensitive.

This option sets the date on which a key is to be published to the zone. After that date, the key is included in the
zone but is not used to sign it. If not set, and if the -G option has not been used, the default is the current date.

This option sets the date on which CDS and CDNSKEY records that match this key are to be published to
-A date/offset

This option sets the date on which the key is to be activated. After that date, the key is included in the zone and
used to sign it. If not set, and if the -G option has not been used, the default is the current date.
-R date/offset

This option sets the date on which the key is to be revoked. After that date, the key is flagged as revoked. It is
included in the zone and is used to sign it.
-I date/offset

This option sets the date on which the key is to be retired. After that date, the key is still included in the zone, but
it is not used to sign it.

This option sets the date on which the key is to be deleted. After that date, the key is no longer included in the

This option sets the date on which the CDS and CDNSKEY records that match this key are to be deleted.

This option sets the prepublication interval for a key. If set, then the publication and activation dates must be
separated by at least this much time. If the activation date is specified but the publication date is not, the publication
date defaults to this much time before the activation date; conversely, if the publication date is specified but not the
activation date, activation is set to this much time after publication.
If the key is being created as an explicit successor to another key, then the default prepublication interval is 30 days;
otherwise it is zero.
As with date offsets, if the argument is followed by one of the suffixes y, mo, w, d, h, or mi, the interval is measured
in years, months, weeks, days, hours, or minutes, respectively. Without a suffix, the interval is measured in seconds.

16.8. dnssec-keyfromlabel - DNSSEC key generation tool

#### 16.8.5 Generated Key Files
When dnssec-keyfromlabel completes successfully, it prints a string of the form Knnnn.+aaa+iiiii to the standard output. This is an identification string for the key files it has generated.
- nnnn is the key name.
- aaa is the numeric representation of the algorithm.
- iiiii is the key identifier (or footprint).
dnssec-keyfromlabel creates two files, with names based on the printed string. Knnnn.+aaa+iiiii.key contains
the public key, and Knnnn.+aaa+iiiii.private contains the private key.

The .key file contains a DNS KEY record that can be inserted into a zone file (directly or with an $INCLUDE statement).
The .private file contains algorithm-specific fields. For obvious security reasons, this file does not have general read
permission.

#### 16.8.6 See Also
dnssec-keygen(8), dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 4034, RFC 7512.

16.9 dnssec-keygen: DNSSEC key generation tool
16.9.1 Synopsis
dnssec-keygen [-3] [-A date/offset] [-a algorithm] [-b keysize] [-C] [-c class] [-D date/offset] [-d bits] [-D sync
date/offset] [-f flag] [-F] [-G] [-h] [-I date/offset] [-i interval] [-K directory] [-k policy] [-L ttl] [-l file] [-M
tag_min:tag_max] [-n nametype] [-P date/offset] [-P sync date/offset] [-p protocol] [-q] [-R date/offset] [-S key] [-s
strength] [-T rrtype] [-t type] [-V] [-v level] {name}

#### 16.9.2 Description
dnssec-keygen generates keys for DNSSEC (Secure DNS), as defined in RFC 2535 and RFC 4034.

The name of the key is specified on the command line. For DNSSEC keys, this must match the name of the zone for
which the key is being generated.

#### 16.9.3 Options
-3

This option uses an NSEC3-capable algorithm to generate a DNSSEC key. If this option is used with an algorithm
that has both NSEC and NSEC3 versions, then the NSEC3 version is selected; for example, dnssec-keygen -3
-a RSASHA1 specifies the NSEC3RSASHA1 algorithm.

This option selects the cryptographic algorithm. For DNSSEC keys, the value of algorithm must be one
of RSASHA1, NSEC3RSASHA1, RSASHA256, RSASHA512, ECDSAP256SHA256, ECDSAP384SHA384,
ED25519, or ED448.
These values are case-insensitive. In some cases, abbreviations are supported, such as ECDSA256 for ECDSAP256SHA256 and ECDSA384 for ECDSAP384SHA384. If RSASHA1 is specified along with the -3 option,
NSEC3RSASHA1 is used instead.
This parameter must be specified except when using the -S option, which copies the algorithm from the predecessor
key.

In prior releases, HMAC algorithms could be generated for use as TSIG keys, but that feature was removed in
BIND 9.13.0. Use tsig-keygen to generate TSIG keys.
-b keysize

This option specifies the number of bits in the key. The choice of key size depends on the algorithm used: RSA
keys must be between 1024 and 4096 bits; Diffie-Hellman keys must be between 128 and 4096 bits. Elliptic curve
algorithms do not need this parameter.
If the key size is not specified, some algorithms have pre-defined defaults. For example, RSA keys for use as
DNSSEC zone-signing keys have a default size of 1024 bits; RSA keys for use as key-signing keys (KSKs, generated
with -f KSK ) default to 2048 bits.

This option enables compatibility mode, which generates an old-style key, without any timing metadata. By default,
dnssec-keygen includes the key’s creation date in the metadata stored with the private key; other dates may be
set there as well, including publication date, activation date, etc. Keys that include this data may be incompatible
with older versions of BIND; the -C option suppresses them.

This option indicates that the DNS record containing the key should have the specified class. If not specified, class
IN is used.
-d bits

This option specifies the key size in bits. For the algorithms RSASHA1, NSEC3RSASA1, RSASHA256, and
RSASHA512 the key size must be between 1024 and 4096 bits; DH size is between 128 and 4096 bits. This option
is ignored for algorithms ECDSAP256SHA256, ECDSAP384SHA384, ED25519, and ED448.
-f flag

This option sets the specified flag in the flag field of the KEY/DNSKEY record. The only recognized flags are ZSK
(Zone-Signing Key), KSK (Key-Signing Key) and REVOKE.
Note that ZSK is not a physical flag in the DNSKEY record, it is merely used to explicitly tell that you want to
create a ZSK. Setting -f in conjunction with -k will result in generating keys that only match the given role set
with this option.

This options turns on FIPS (US Federal Information Processing Standards) mode if the underlying crytographic
-G

This option generates a key, but does not publish it or sign with it. This option is incompatible with -P and -A.

This option prints a short summary of the options and arguments to dnssec-keygen.

This option sets the directory in which the key files are to be written.
-k policy

This option creates keys for a specific dnssec-policy. If a policy uses multiple keys, dnssec-keygen generates
multiple keys. This also creates a “.state” file to keep track of the key state.
This option creates keys according to the dnssec-policy configuration, hence it cannot be used at the same time
as many of the other options that dnssec-keygen provides.

This option sets the default TTL to use for this key when it is converted into a DNSKEY RR. This is the TTL
used when the key is imported into a zone, unless there was already a DNSKEY RRset in place, in which case the

16.9. dnssec-keygen: DNSSEC key generation tool

existing TTL takes precedence. If this value is not set and there is no existing DNSKEY RRset, the TTL defaults
to the SOA TTL. Setting the default TTL to 0 or none is the same as leaving it unset.
-l file

This option provides a configuration file that contains a dnssec-policy statement (matching the policy set with
-k).
-M tag_min:tag_max

This option sets the range of acceptable key tag values that dnssec-keygen will produce. If the key tag of the
new key or the key tag of the revoked version of the new key is outside this range, the new key will be rejected and
another new key will be generated. This is designed to be used when generating keys in a multi-signer scenario,
where each operator is given a range of key tags to prevent collisions among different operators. The valid values
for tag_min and tag_max are [0..65535]. The default allows all key tag values to be produced. This option is
ignored when -k policy is specified.
-n nametype

This option specifies the owner type of the key. The value of nametype must either be ZONE (for a DNSSEC zone
key (KEY/DNSKEY)), HOST or ENTITY (for a key associated with a host (KEY)), USER (for a key associated
with a user (KEY)), or OTHER (DNSKEY). These values are case-insensitive. The default is ZONE for DNSKEY
generation.
-p protocol

This option sets the protocol value for the generated key, for use with -T KEY . The protocol is a number between
0 and 255. The default is 3 (DNSSEC). Other possible values for this argument are listed in RFC 2535 and its
successors.

This option sets quiet mode, which suppresses unnecessary output, including progress indication. Without this
option, when dnssec-keygen is run interactively to generate an RSA or DSA key pair, it prints a string of
symbols to stderr indicating the progress of the key generation. A . indicates that a random number has been
found which passed an initial sieve test; + means a number has passed a single round of the Miller-Rabin primality
test; and a space ( ) means that the number has passed all the tests and is a satisfactory key.
-S key

This option creates a new key which is an explicit successor to an existing key. The name, algorithm, size, and type
of the key are set to match the existing key. The activation date of the new key is set to the inactivation date of the
existing one. The publication date is set to the activation date minus the prepublication interval, which defaults to
30 days.
-s strength

This option specifies the strength value of the key. The strength is a number between 0 and 15, and currently has
no defined purpose in DNSSEC.
-T rrtype

This option specifies the resource record type to use for the key. rrtype must be either DNSKEY or KEY. The
default is DNSKEY when using a DNSSEC algorithm, but it can be overridden to KEY for use with SIG(0).

This option indicates the type of the key for use with -T KEY . type must be one of AUTHCONF, NOAUTHCONF, NOAUTH, or NOCONF. The default is AUTHCONF. AUTH refers to the ability to authenticate data,
and CONF to the ability to encrypt data.

#### 16.9.4 Timing Options
Dates can be expressed in the format YYYYMMDD or YYYYMMDDHHMMSS (which is the format used inside key
files), or ‘Day Mon DD HH:MM:SS YYYY’ (as printed by dnssec-settime -p), or UNIX epoch time (as printed by
The argument can be followed by + or - and an offset from the given time. The literal now can be omitted before an
offset. The offset can be followed by one of the suffixes y, mo, w, d, h, or mi, so that it is computed in years (defined as
365 24-hour days, ignoring leap years), months (defined as 30 24-hour days), weeks, days, hours, or minutes, respectively.
To unset a date, use none, never, or unset.

This option sets the date on which a key is to be published to the zone. After that date, the key is included in the
zone but is not used to sign it. If not set, and if the -G option has not been used, the default is the current date.

This option sets the date on which CDS and CDNSKEY records that match this key are to be published to
-A date/offset

This option sets the date on which the key is to be activated. After that date, the key is included in the zone and
used to sign it. If not set, and if the -G option has not been used, the default is the current date. If set, and -P is
not set, the publication date is set to the activation date minus the prepublication interval.
-R date/offset

This option sets the date on which the key is to be revoked. After that date, the key is flagged as revoked. It is
included in the zone and is used to sign it.
-I date/offset

This option sets the date on which the key is to be retired. After that date, the key is still included in the zone, but
it is not used to sign it.

This option sets the date on which the key is to be deleted. After that date, the key is no longer included in the

This option sets the date on which the CDS and CDNSKEY records that match this key are to be deleted.

This option sets the prepublication interval for a key. If set, then the publication and activation dates must be
separated by at least this much time. If the activation date is specified but the publication date is not, the publication
date defaults to this much time before the activation date; conversely, if the publication date is specified but not the
activation date, activation is set to this much time after publication.
If the key is being created as an explicit successor to another key, then the default prepublication interval is 30 days;
otherwise it is zero.
As with date offsets, if the argument is followed by one of the suffixes y, mo, w, d, h, or mi, the interval is measured
in years, months, weeks, days, hours, or minutes, respectively. Without a suffix, the interval is measured in seconds.

#### 16.9.5 Generated Keys
When dnssec-keygen completes successfully, it prints a string of the form Knnnn.+aaa+iiiii to the standard output.
This is an identification string for the key it has generated.
- nnnn is the key name.
16.9. dnssec-keygen: DNSSEC key generation tool

- aaa is the numeric representation of the algorithm.
- iiiii is the key identifier (or footprint).
dnssec-keygen creates two files, with names based on the printed string. Knnnn.+aaa+iiiii.key contains the
public key, and Knnnn.+aaa+iiiii.private contains the private key.

The .key file contains a DNSKEY or KEY record. When a zone is being signed by named or dnssec-signzone -S,
DNSKEY records are included automatically. In other cases, the .key file can be inserted into a zone file manually or
with an $INCLUDE statement.
The .private file contains algorithm-specific fields. For obvious security reasons, this file does not have general read
permission.

#### 16.9.6 Example
To generate an ECDSAP256SHA256 zone-signing key for the zone example.com, issue the command:
dnssec-keygen -a ECDSAP256SHA256 example.com

The command prints a string of the form:
Kexample.com.+013+26160

In this example, dnssec-keygen creates the files Kexample.com.+013+26160.key and Kexample.com.
+013+26160.private.
To generate a matching key-signing key, issue the command:
dnssec-keygen -a ECDSAP256SHA256 -f KSK example.com

#### 16.9.7 See Also
dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 2539, RFC 2845, RFC 4034.

16.10 dnssec-ksr - Create signed key response (SKR) files for offline
KSK setups
16.10.1 Synopsis
dnssec-ksr [-e date/offset] [-F] [-f file] [-h] [-i date/offset] [-K directory] [-k policy] [-l file] [-o] [-V] [-v level]

{command} {zone}

#### 16.10.2 Description
The dnssec-ksr can be used to issue several commands that are needed to generate presigned RRsets for a zone where
the private key file of the Key Signing Key (KSK) is typically offline. This requires Zone Signing Keys (ZSKs) to be
pregenerated, and the DNSKEY, CDNSKEY, and CDS RRsets to be already signed in advance.
The latter is done by creating Key Signing Requests (KSRs) that can be imported to the environment where the KSK is
available. Once there, this program can create Signed Key Responses (SKRs) that can be loaded by an authoritative DNS

#### 16.10.3 Options
-e date/offset

This option sets the end date for which keys or SKRs need to be generated (depending on the command).

This options turns on FIPS (US Federal Information Processing Standards) mode if the underlying crytographic

This option sets the SKR file to be signed when issuing a sign command.

This option prints a short summary of the options and arguments to dnssec-ksr.
-i date/offset

This option sets the start date for which keys or SKRs need to be generated (depending on the command).

This option sets the directory in which the key files are to be read or written (depending on the command).
-k policy

This option sets the specific dnssec-policy for which keys need to be generated, or signed.
-l file

This option provides a configuration file that contains a dnssec-policy statement (matching the policy set with
-k).
-o

Normally when pregenerating keys, ZSKs are created. When this option is set, create KSKs instead.

This option sets the debugging level. Level 1 is intended to be usefully verbose for general users; higher levels are
intended for developers.
command

The KSR command to be executed. See below for the available commands.

The name of the zone for which the KSR command is being executed.

#### 16.10.4 Commands
keygen

Pregenerate a number of keys, given a DNSSEC policy and an interval. The number of generated keys depends on
the interval and the key lifetime.
request

Create a Key Signing Request (KSR), given a DNSSEC policy and an interval. This will generate a file with a number of key bundles, where each bundle contains the currently published ZSKs (according to the timing metadata).
sign

Sign a Key Signing Request (KSR), given a DNSSEC policy and an interval, creating a Signed Key Response
(SKR). This will add the corresponding DNSKEY, CDS, and CDNSKEY records for the KSK that is being used
for signing.

16.10. dnssec-ksr - Create signed key response (SKR) files for offline KSK setups

#### 16.10.5 Exit Status
The dnssec-ksr command exits 0 on success, or non-zero if an error occurred.

#### 16.10.6 Examples
When you need to generate ZSKs for the zone “example.com” for the next year, given a dnssec-policy named “mypolicy”:
dnssec-ksr -i now -e +1y -k mypolicy -l named.conf keygen example.com

Creating a KSR for the same zone and period can be done with:
dnssec-ksr -i now -e +1y -k mypolicy -l named.conf request example.com > ksr.txt

Typically you would now transfer the KSR to the system that has access to the KSK.
Signing the KSR created above can be done with:
dnssec-ksr -i now -e +1y -k kskpolicy -l named.conf -f ksr.txt sign example.com

Make sure that the DNSSEC parameters in kskpolicy match those in mypolicy.

#### 16.10.7 See Also
dnssec-keygen(8), dnssec-signzone(8), BIND 9 Administrator Reference Manual.

16.11 dnssec-revoke - set the REVOKED bit on a DNSSEC key
16.11.1 Synopsis
dnssec-revoke [-hr] [-v level] [-V] [-K directory] [-f] [-R] {keyfile}

#### 16.11.2 Description
dnssec-revoke reads a DNSSEC key file, sets the REVOKED bit on the key as defined in RFC 5011, and creates a

new pair of key files containing the now-revoked key.

#### 16.11.3 Options

This option emits a usage message and exits.

This option sets the directory in which the key files are to reside.

This option indicates to remove the original keyset files after writing the new keyset files.

This option indicates a forced overwrite and causes dnssec-revoke to write the new key pair, even if a file already
exists matching the algorithm and key ID of the revoked key.
-R

This option prints the key tag of the key with the REVOKE bit set, but does not revoke the key.

#### 16.11.4 See Also
dnssec-keygen(8), BIND 9 Administrator Reference Manual, RFC 5011.

16.12 dnssec-settime: set the key timing metadata for a DNSSEC key
16.12.1 Synopsis
dnssec-settime [-f] [-K directory] [-L ttl] [-P date/offset] [-P ds date/offset] [-P sync date/offset] [-A date/offset]

[-R date/offset] [-I date/offset] [-D date/offset] [-D ds date/offset] [-D sync date/offset] [-S key] [-i interval] [-h] [-V] [-v
level] {keyfile} [-s] [-g state] [-d state date/offset] [-k state date/offset] [-r state date/offset] [-z state date/offset]

#### 16.12.2 Description
dnssec-settime reads a DNSSEC private key file and sets the key timing metadata as specified by the -P, -A, -R, -I,
and -D options. The metadata can then be used by dnssec-signzone or other signing software to determine when a

key is to be published, whether it should be used for signing a zone, etc.
If none of these options is set on the command line, dnssec-settime simply prints the key timing metadata already
stored in the key.
When key metadata fields are changed, both files of a key pair (Knnnn.+aaa+iiiii.key and Knnnn.+aaa+iiiii.
private) are regenerated.

Metadata fields are stored in the private file. A human-readable description of the metadata is also placed in comments in
the key file. The private file’s permissions are always set to be inaccessible to anyone other than the owner (mode 0600).
When working with state files, it is possible to update the timing metadata in those files as well with -s. With this option,
it is also possible to update key states with -d (DS), -k (DNSKEY), -r (RRSIG of KSK), or -z (RRSIG of ZSK).
Allowed states are HIDDEN, RUMOURED, OMNIPRESENT, and UNRETENTIVE.
The goal state of the key can also be set with -g . This should be either HIDDEN or OMNIPRESENT, representing
whether the key should be removed from the zone or published.
It is NOT RECOMMENDED to manipulate state files manually, except for testing purposes.

#### 16.12.3 Options

This option forces an update of an old-format key with no metadata fields. Without this option, dnssec-settime
fails when attempting to update a legacy key. With this option, the key is recreated in the new format, but with the
original key data retained. The key’s creation date is set to the present time. If no other values are specified, then
the key’s publication and activation dates are also set to the present time.

This option sets the directory in which the key files are to reside.

16.12. dnssec-settime: set the key timing metadata for a DNSSEC key

This option sets the default TTL to use for this key when it is converted into a DNSKEY RR. This is the TTL
used when the key is imported into a zone, unless there was already a DNSKEY RRset in place, in which case the
existing TTL takes precedence. If this value is not set and there is no existing DNSKEY RRset, the TTL defaults
to the SOA TTL. Setting the default TTL to 0 or none removes it from the key.

This option emits a usage message and exits.

#### 16.12.4 Timing Options
Dates can be expressed in the format YYYYMMDD or YYYYMMDDHHMMSS (which is the format used inside key
files), or ‘Day Mon DD HH:MM:SS YYYY’ (as printed by dnssec-settime -p), or UNIX epoch time (as printed by
The argument can be followed by + or - and an offset from the given time. The literal now can be omitted before an
offset. The offset can be followed by one of the suffixes y, mo, w, d, h, or mi, so that it is computed in years (defined as
365 24-hour days, ignoring leap years), months (defined as 30 24-hour days), weeks, days, hours, or minutes, respectively.
To unset a date, use none, never, or unset.
All these formats are case-insensitive.

This option sets the date on which a key is to be published to the zone. After that date, the key is included in the
zone but is not used to sign it.
ds date/offset

This option sets the date on which DS records that match this key have been seen in the parent zone.

This option sets the date on which CDS and CDNSKEY records that match this key are to be published to
-A date/offset

This option sets the date on which the key is to be activated. After that date, the key is included in the zone and
used to sign it.
-R date/offset

This option sets the date on which the key is to be revoked. After that date, the key is flagged as revoked. It is
included in the zone and is used to sign it.
-I date/offset

This option sets the date on which the key is to be retired. After that date, the key is still included in the zone, but
it is not used to sign it.

This option sets the date on which the key is to be deleted. After that date, the key is no longer included in the

ds date/offset

This option sets the date on which the DS records that match this key have been seen removed from the parent

This option sets the date on which the CDS and CDNSKEY records that match this key are to be deleted.
-S predecessor key

This option selects a key for which the key being modified is an explicit successor. The name, algorithm, size,
and type of the predecessor key must exactly match those of the key being modified. The activation date of the
successor key is set to the inactivation date of the predecessor. The publication date is set to the activation date
minus the prepublication interval, which defaults to 30 days.

This option sets the prepublication interval for a key. If set, then the publication and activation dates must be
separated by at least this much time. If the activation date is specified but the publication date is not, the publication
date defaults to this much time before the activation date; conversely, if the publication date is specified but not the
activation date, activation is set to this much time after publication.
If the key is being created as an explicit successor to another key, then the default prepublication interval is 30 days;
otherwise it is zero.
As with date offsets, if the argument is followed by one of the suffixes y, mo, w, d, h, or mi, the interval is measured
in years, months, weeks, days, hours, or minutes, respectively. Without a suffix, the interval is measured in seconds.

#### 16.12.5 Key State Options
To test dnssec-policy it may be necessary to construct keys with artificial state information; these options are used by the
testing framework for that purpose, but should never be used in production.
Known key states are HIDDEN, RUMOURED, OMNIPRESENT, and UNRETENTIVE.

This option indicates that when setting key timing data, the state file should also be updated.
-g state

This option sets the goal state for this key. Must be HIDDEN or OMNIPRESENT.
-d state date/offset

This option sets the DS state for this key as of the specified date, offset from the current date.
-k state date/offset

This option sets the DNSKEY state for this key as of the specified date, offset from the current date.
-r state date/offset

This option sets the RRSIG (KSK) state for this key as of the specified date, offset from the current date.
-z state date/offset

This option sets the RRSIG (ZSK) state for this key as of the specified date, offset from the current date.

#### 16.12.6 Printing Options
dnssec-settime can also be used to print the timing metadata associated with a key.

This option indicates that times should be printed in Unix epoch format.

16.12. dnssec-settime: set the key timing metadata for a DNSSEC key

-p C/P/Pds/Psync/A/R/I/D/Dds/Dsync/all

This option prints a specific metadata value or set of metadata values. The -p option may be followed by one or
more of the following letters or strings to indicate which value or values to print: C for the creation date, P for the
publication date, Pds` for the DS publication date, ``Psync for the CDS and CDNSKEY publication
date, A for the activation date, R for the revocation date, I for the inactivation date, D for the deletion date, Dds for
the DS deletion date, and Dsync for the CDS and CDNSKEY deletion date. To print all of the metadata, use all.

#### 16.12.7 See Also
dnssec-keygen(8), dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 5011.

16.13 dnssec-signzone - DNSSEC zone signing tool
16.13.1 Synopsis
dnssec-signzone [-a] [-c class] [-d directory] [-D] [-e end-time] [-f output-file] [-F] [-g] [-G sync-records] [-h] [-i
interval] [-I input-format] [-j jitter] [-J filename] [-K directory] [-k key] [-L serial] [-M maxttl] [-N soa-serial-format] [-o
origin] [-O output-format] [-P] [-Q] [-q] [-R] [-S] [-s start-time] [-T ttl] [-t] [-u] [-v level] [-V] [-X extended end-time]
[-x] [-z] [-3 salt] [-H iterations] [-A] {zonefile} [key…]

#### 16.13.2 Description
dnssec-signzone signs a zone; it generates NSEC and RRSIG records and produces a signed version of the zone.

The security status of delegations from the signed zone (that is, whether the child zones are secure) is determined by the
presence or absence of a keyset file for each child zone.

#### 16.13.3 Options

This option verifies all generated signatures.

This option specifies the DNS class of the zone.

This option sets compatibility mode, in which a keyset-zonename file is generated in addition to
dsset-zonename when signing a zone, for use by older versions of dnssec-signzone.
-d directory

This option indicates the directory where BIND 9 should look for dsset- or keyset- files.

This option indicates that only those record types automatically managed by dnssec-signzone, i.e., RRSIG,
NSEC, NSEC3 and NSEC3PARAM records, should be included in the output. If smart signing (-S) is used,
DNSKEY records are also included. The resulting file can be included in the original zone file with $INCLUDE.
This option cannot be combined with -O raw or serial-number updating.

This options turns on FIPS (US Federal Information Processing Standards) mode if the underlying crytographic
-g

This option indicates that DS records for child zones should be generated from a dsset- or keyset- file. Existing
DS records are removed.

-G sync-records

This option indicates which CDS and CDNSKEY records should be generated. sync-records is a commaseparated string with the following allowed items: cdnskey, and cds:<digest-type>, where digest-type is
an allowed algorithm such as SHA-256 (2), or SHA-384 (4). Only works in combination with smart signing (-S).

This option tells dnssec-signzone to read the journal from the given file when loading the zone file.

This option specifies the directory to search for DNSSEC keys. If not specified, it defaults to the current directory.
-k key

This option tells BIND 9 to treat the specified key as a key-signing key, ignoring any key flags. This option may be
specified multiple times.
-M maxttl

This option sets the maximum TTL for the signed zone. Any TTL higher than maxttl in the input zone is reduced
to maxttl in the output. This provides certainty as to the largest possible TTL in the signed zone, which is useful
to know when rolling keys. The maxttl is the longest possible time before signatures that have been retrieved by
resolvers expire from resolver caches. Zones that are signed with this option should be configured to use a matching
max-zone-ttl in named.conf . (Note: This option is incompatible with -D, because it modifies non-DNSSEC
data in the output zone.)
-s start-time

This option specifies the date and time when the generated RRSIG records become valid. This can be either an
absolute or relative time. An absolute start time is indicated by a number in YYYYMMDDHHMMSS notation;
20000530144500 denotes 14:45:00 UTC on May 30th, 2000. A relative start time is indicated by +N, which is N
seconds from the current time. If no start-time is specified, the current time minus 1 hour (to allow for clock
skew) is used.
-e end-time

This option specifies the date and time when the generated RRSIG records expire. As with start-time, an
absolute time is indicated in YYYYMMDDHHMMSS notation. A time relative to the start time is indicated with
+N, which is N seconds from the start time. A time relative to the current time is indicated with now+N. If no
end-time is specified, 30 days from the start time is the default. end-time must be later than start-time.
-X extended end-time

This option specifies the date and time when the generated RRSIG records for the DNSKEY RRset expire. This
is to be used in cases when the DNSKEY signatures need to persist longer than signatures on other records; e.g.,
when the private component of the KSK is kept offline and the KSK signature is to be refreshed manually.
As with end-time, an absolute time is indicated in YYYYMMDDHHMMSS notation. A time relative to the start
time is indicated with +N, which is N seconds from the start time. A time relative to the current time is indicated
with now+N. If no extended end-time is specified, the value of end-time is used as the default. (end-time,
in turn, defaults to 30 days from the start time.) extended end-time must be later than start-time.
-f output-file

This option indicates the name of the output file containing the signed zone. The default is to append .signed
to the input filename. If output-file is set to -, then the signed zone is written to the standard output, with a
default output format of full.

This option prints a short summary of the options and arguments to dnssec-signzone.

16.13. dnssec-signzone - DNSSEC zone signing tool

This option indicates that, when a previously signed zone is passed as input, records may be re-signed. The interval option specifies the cycle interval as an offset from the current time, in seconds. If a RRSIG record expires
after the cycle interval, it is retained; otherwise, it is considered to be expiring soon and it is replaced.
The default cycle interval is one quarter of the difference between the signature end and start times. So if neither
end-time nor start-time is specified, dnssec-signzone generates signatures that are valid for 30 days, with
a cycle interval of 7.5 days. Therefore, if any existing RRSIG records are due to expire in less than 7.5 days, they
are replaced.
Note that the calculation of cycle interval is based upon the validity period of the replacement signatures that
would be generated by dnssec-signzone, not on the valid lifetimes of the input RRSIGs being considered for
pre-expiry replacement.
-I input-format

This option sets the format of the input zone file. Possible formats are text (the default), and raw. This option is
primarily intended to be used for dynamic signed zones, so that the dumped zone file in a non-text format containing
updates can be signed directly. This option is not useful for non-dynamic zones.
-j jitter

When signing a zone with a fixed signature lifetime, all RRSIG records issued at the time of signing expire simultaneously. If the zone is incrementally signed, i.e., a previously signed zone is passed as input to the signer, all expired
signatures must be regenerated at approximately the same time. The jitter option specifies a jitter window that
is used to randomize the signature expire time, thus spreading incremental signature regeneration over time.
Signature lifetime jitter also, to some extent, benefits validators and servers by spreading out cache expiration, i.e.,
if large numbers of RRSIGs do not expire at the same time from all caches, there is less congestion than if all
validators need to refetch at around the same time.
-L serial

When writing a signed zone to “raw” format, this option sets the “source serial” value in the header to the specified
serial number. (This is expected to be used primarily for testing purposes.)
-n ncpus

This option specifies the number of threads to use. By default, one thread is started for each detected CPU.
-N soa-serial-format

This option sets the SOA serial number format of the signed zone. Possible formats are keep (the default), increment, unixtime, and date.

keep
This format indicates that the SOA serial number should not be modified.
increment
This format increments the SOA serial number using RFC 1982 arithmetic.
unixtime
This format sets the SOA serial number to the number of seconds since the beginning of the Unix epoch,
unless the serial number is already greater than or equal to that value, in which case it is simply incremented
by one.
date
This format sets the SOA serial number to today’s date, in YYYYMMDDNN format, unless the serial number
is already greater than or equal to that value, in which case it is simply incremented by one.
-o origin

This option sets the zone origin. If not specified, the name of the zone file is assumed to be the origin.

-O output-format

This option sets the format of the output file containing the signed zone. Possible formats are text (the default),
which is the standard textual representation of the zone; full, which is text output in a format suitable for processing
by external scripts; and raw and raw=N, which store the zone in binary formats for rapid loading by named. raw=N
specifies the format version of the raw zone file: if N is 0, the raw file can be read by any version of named; if N
is 1, the file can be read by release 9.9.0 or higher. The default is 1.
-P

This option disables post-sign verification tests.
The post-sign verification tests ensure that for each algorithm in use there is at least one non-revoked self-signed
KSK key, that all revoked KSK keys are self-signed, and that all records in the zone are signed by the algorithm.
This option skips these tests.
-Q

This option removes signatures from keys that are no longer active.
Normally, when a previously signed zone is passed as input to the signer, and a DNSKEY record has been removed
and replaced with a new one, signatures from the old key that are still within their validity period are retained.
This allows the zone to continue to validate with cached copies of the old DNSKEY RRset. The -Q option forces
dnssec-signzone to remove signatures from keys that are no longer active. This enables ZSK rollover using the
procedure described in RFC 6781 Section 4.1.1.1 (“Pre-Publish Zone Signing Key Rollover”).

This option enables quiet mode, which suppresses unnecessary output.
Without this option, when
dnssec-signzone is run it prints three pieces of information to standard output: the number of keys in use;
the algorithms used to verify the zone was signed correctly and other status information; and the filename containing the signed zone. With the option that output is suppressed, leaving only the filename.
-R

This option removes signatures from keys that are no longer published.
This option is similar to -Q, except it forces dnssec-signzone to remove signatures from keys that are no longer
published. This enables ZSK rollover using the procedure described in RFC 6781 Section 4.1.1.2 (“Double Signature Zone Signing Key Rollover”).
-S

This option enables smart signing, which instructs dnssec-signzone to search the key repository for keys that
match the zone being signed, and to include them in the zone if appropriate.
When a key is found, its timing metadata is examined to determine how it should be used, according to the following
rules. Each successive rule takes priority over the prior ones:
If no timing metadata has been set for the key, the key is published in the zone and used to sign the
If the key’s publication date is set and is in the past, the key is published in the zone.
If the key’s activation date is set and is in the past, the key is published (regardless of publication date)
and used to sign the zone.
If the key’s revocation date is set and is in the past, and the key is published, then the key is revoked,
and the revoked key is used to sign the zone.
If either the key’s unpublication or deletion date is set and in the past, the key is NOT published or used
to sign the zone, regardless of any other metadata.
If the key’s sync publication date is set and is in the past, synchronization records (type CDS and/or
CDNSKEY) are created.

16.13. dnssec-signzone - DNSSEC zone signing tool

If the key’s sync deletion date is set and is in the past, synchronization records (type CDS and/or
CDNSKEY) are removed.
-T ttl

This option specifies a TTL to be used for new DNSKEY records imported into the zone from the key repository.
If not specified, the default is the TTL value from the zone’s SOA record. This option is ignored when signing
without -S, since DNSKEY records are not imported from the key repository in that case. It is also ignored if there
are any pre-existing DNSKEY records at the zone apex, in which case new records’ TTL values are set to match
them, or if any of the imported DNSKEY records had a default TTL value. In the event of a conflict between TTL
values in imported keys, the shortest one is used.
-t

This option prints statistics at completion.

This option updates the NSEC/NSEC3 chain when re-signing a previously signed zone. With this option, a zone
signed with NSEC can be switched to NSEC3, or a zone signed with NSEC3 can be switched to NSEC or to NSEC3
with different parameters. Without this option, dnssec-signzone retains the existing chain when re-signing.

This option indicates that BIND 9 should only sign the DNSKEY, CDNSKEY, and CDS RRsets with key-signing
keys, and should omit signatures from zone-signing keys.
-z

This option indicates that BIND 9 should ignore the KSK flag on keys when determining what to sign. This causes
KSK-flagged keys to sign all records, not just the DNSKEY RRset.
-3 salt

This option generates an NSEC3 chain with the given hex-encoded salt. A dash (-) can be used to indicate that no
salt is to be used when generating the NSEC3 chain.
-3 - is the recommended configuration. Adding salt provides no practical benefits. See RFC 9276.
-H iterations

This option indicates that, when generating an NSEC3 chain, BIND 9 should use this many iterations. The default
is 0.
Values greater than 0 cause interoperability issues and also increase the risk of CPU-exhausting DoS attacks.
See RFC 9276.
-A

This option indicates that, when generating an NSEC3 chain, BIND 9 should set the OPTOUT flag on all NSEC3
records and should not generate NSEC3 records for insecure delegations.

Do not use this option unless all its implications are fully understood. This option is intended only for extremely
large zones (comparable to com.) with sparse secure delegations. See RFC 9276.
-AA

This option turns the OPTOUT flag off for all records. This is useful when using the -u option to modify an NSEC3
chain which previously had OPTOUT set.
zonefile

This option sets the file containing the zone to be signed.

This option specifies which keys should be used to sign the zone. If no keys are specified, the zone is examined for
DNSKEY records at the zone apex. If these records are found and there are matching private keys in the current
directory, they are used for signing.

#### 16.13.4 Example
The following command signs the example.com zone with the ECDSAP256SHA256 key generated by
dnssec-keygen (Kexample.com.+013+17247). Because the -S option is not being used, the zone’s keys must be
in the master file (db.example.com). This invocation looks for dsset files in the current directory, so that DS records
can be imported from them (-g ).
% dnssec-signzone -g -o example.com db.example.com \
Kexample.com.+013+17247
db.example.com.signed
%

In the above example, dnssec-signzone creates the file db.example.com.signed. This file should be referenced
in a zone statement in the named.conf file.
This example re-signs a previously signed zone with default parameters. The private keys are assumed to be in the current
directory.
% cp db.example.com.signed db.example.com
% dnssec-signzone -o example.com db.example.com
db.example.com.signed
%

#### 16.13.5 See Also
dnssec-keygen(8), BIND 9 Administrator Reference Manual, RFC 4033, RFC 6781.

16.14 dnssec-verify - DNSSEC zone verification tool
16.14.1 Synopsis
dnssec-verify [-c class] [-I input-format] [-J filename] [-o origin] [-q] [-v level] [-V] [-x] [-z] {zonefile}

16.14. dnssec-verify - DNSSEC zone verification tool

#### 16.14.2 Description
dnssec-verify verifies that a zone is fully signed for each algorithm found in the DNSKEY RRset for the zone, and

that the NSEC/NSEC3 chains are complete.

#### 16.14.3 Options

This option specifies the DNS class of the zone.
-I input-format

This option sets the format of the input zone file. Possible formats are text (the default) and raw. This option is
primarily intended to be used for dynamic signed zones, so that the dumped zone file in a non-text format containing
updates can be verified independently. This option is not useful for non-dynamic zones.

This option tells dnssec-verify to read the journal from the given file when loading the zone file.
-o origin

This option indicates the zone origin. If not specified, the name of the zone file is assumed to be the origin.

This option sets quiet mode, which suppresses output. Without this option, when dnssec-verify is run it prints
to standard output the number of keys in use, the algorithms used to verify the zone was signed correctly, and other
status information. With this option, all non-error output is suppressed, and only the exit code indicates success.

This option verifies only that the DNSKEY RRset is signed with key-signing keys. Without this flag, it is assumed
that the DNSKEY RRset is signed by all active keys. When this flag is set, it is not an error if the DNSKEY RRset
is not signed by zone-signing keys. This corresponds to the -x option in dnssec-signzone.
-z

This option indicates that the KSK flag on the keys should be ignored when determining whether the zone is correctly
signed. Without this flag, it is assumed that there is a non-revoked, self-signed DNSKEY with the KSK flag set
for each algorithm, and that RRsets other than DNSKEY RRset are signed with a different DNSKEY without the
KSK flag set.
With this flag set, BIND 9 only requires that for each algorithm, there be at least one non-revoked, self-signed
DNSKEY, regardless of the KSK flag state, and that other RRsets be signed by a non-revoked key for the same
algorithm that includes the self-signed key; the same key may be used for both purposes. This corresponds to the
-z option in dnssec-signzone.
zonefile

This option indicates the file containing the zone to be signed.

#### 16.14.4 See Also
dnssec-signzone(8), BIND 9 Administrator Reference Manual, RFC 4033.

16.15 dnstap-read - print dnstap data in human-readable form
16.15.1 Synopsis
dnstap-read [-m] [-p] [-x] [-y] {file}

#### 16.15.2 Description
dnstap-read reads dnstap data from a specified file and prints it in a human-readable format. By default, dnstap
data is printed in a short summary format, but if the -y option is specified, a longer and more detailed YAML format is

used.

#### 16.15.3 Options

This option indicates trace memory allocations, and is used for debugging memory leaks.
-p

This option prints the text form of the DNS message that was encapsulated in the dnstap frame, after printing the
dnstap data.
-t

This option prints long timestamps with millisecond precision.

This option prints a hex dump of the wire form of the DNS message that was encapsulated in the dnstap frame,
after printing the dnstap data.
-y

This option prints dnstap data in a detailed YAML format.

#### 16.15.4 See Also
named(8), rndc(8), BIND 9 Administrator Reference Manual.

16.16 filter-aaaa.so - filter AAAA in DNS responses when A is present
16.16.1 Synopsis
plugin query “filter-aaaa.so” [{ parameters }];

#### 16.16.2 Description
filter-aaaa.so is a query plugin module for named , enabling named to omit some IPv6 addresses when responding

to clients.
Until BIND 9.12, this feature was implemented natively in named and enabled with the filter-aaaa ACL and the
filter-aaaa-on-v4 and filter-aaaa-on-v6 options. These options are no longer available in named.conf but
can be passed as parameters to the filter-aaaa.so plugin, for example:
plugin query "filter-aaaa.so" {
filter-aaaa-on-v4 yes;
filter-aaaa-on-v6 yes;
filter-aaaa { 192.0.2.1; 2001:db8:2::1; };

16.15. dnstap-read - print dnstap data in human-readable form

This module is intended to aid transition from IPv4 to IPv6 by withholding IPv6 addresses from DNS clients which are
not connected to the IPv6 Internet, when the name being looked up has an IPv4 address available. Use of this module is
not recommended unless absolutely necessary.
Note: This mechanism can erroneously cause other servers not to give AAAA records to their clients. If a recursing
server with both IPv6 and IPv4 network connections queries an authoritative server using this mechanism via IPv4, it is
denied AAAA records even if its client is using IPv6.

#### 16.16.3 Options
filter-aaaa

This option specifies a list of client addresses for which AAAA filtering is to be applied. The default is any.
filter-aaaa-on-v4
If set to yes, this option indicates that the DNS client is at an IPv4 address, in filter-aaaa. If the response

does not include DNSSEC signatures, then all AAAA records are deleted from the response. This filtering applies
to all responses, not only authoritative ones.
If set to break-dnssec, then AAAA records are deleted even when DNSSEC is enabled. As suggested by the
name, this causes the response to fail to verify, because the DNSSEC protocol is designed to detect deletions.
This mechanism can erroneously cause other servers not to give AAAA records to their clients. If a recursing server
with both IPv6 and IPv4 network connections queries an authoritative server using this mechanism via IPv4, it is
denied AAAA records even if its client is using IPv6.
filter-aaaa-on-v6

This option is identical to filter-aaaa-on-v4, except that it filters AAAA responses to queries from IPv6
clients instead of IPv4 clients. To filter all responses, set both options to yes.

#### 16.16.4 See Also

16.17 host - DNS lookup utility
16.17.1 Synopsis
host [-aACdlnrsTUwv] [-c class] [-N ndots] [-p port] [-R number] [-t type] [-W wait] [-m flag] [ [-4] | [-6] ] [-v] [-V]
{name} [server]

#### 16.17.2 Description
host is a simple utility for performing DNS lookups. It is normally used to convert names to IP addresses and vice versa.
When no arguments or options are given, host prints a short summary of its command-line arguments and options.
name is the domain name that is to be looked up. It can also be a dotted-decimal IPv4 address or a colon-delimited
IPv6 address, in which case host by default performs a reverse lookup for that address. server is an optional argument
which is either the name or IP address of the name server that host should query instead of the server or servers listed
in /etc/resolv.conf.

#### 16.17.3 Options

This option specifies that only IPv4 should be used for query transport. See also the -6 option.

This option specifies that only IPv6 should be used for query transport. See also the -4 option.

The -a (“all”) option is normally equivalent to -v -t ANY . It also affects the behavior of the -l list zone option.
-A

The -A (“almost all”) option is equivalent to -a, except that RRSIG, NSEC, and NSEC3 records are omitted from
the output.

This option specifies the query class, which can be used to lookup HS (Hesiod) or CH (Chaosnet) class resource
records. The default class is IN (Internet).

This option indicates that named should check consistency, meaning that host queries the SOA records for zone
name from all the listed authoritative name servers for that zone. The list of name servers is defined by the NS
records that are found for the zone.

This option prints debugging traces, and is equivalent to the -v verbose option.
-l

This option tells named to list the zone, meaning the host command performs a zone transfer of zone name and
prints out the NS, PTR, and address records (A/AAAA).
Together, the -l -a options print all records in the zone.
-N ndots

This option specifies the number of dots (ndots) that have to be in name for it to be considered absolute. The
default value is that defined using the ndots statement in /etc/resolv.conf, or 1 if no ndots statement is
present. Names with fewer dots are interpreted as relative names, and are searched for in the domains listed in the
search or domain directive in /etc/resolv.conf.

This option specifies the port to query on the server. The default is 53.

This option specifies a non-recursive query; setting this option clears the RD (recursion desired) bit in the query.
This means that the name server receiving the query does not attempt to resolve name. The -r option enables
host to mimic the behavior of a name server by making non-recursive queries, and expecting to receive answers
to those queries that can be referrals to other name servers.
-R number

This option specifies the number of retries for UDP queries. If number is negative or zero, the number of retries
is silently set to 1. The default value is 1, or the value of the attempts option in /etc/resolv.conf, if set.

This option tells named not to send the query to the next nameserver if any server responds with a SERVFAIL
response, which is the reverse of normal stub resolver behavior.

This option specifies the query type. The type argument can be any recognized query type: CNAME, NS, SOA,
TXT, DNSKEY, AXFR, etc.
When no query type is specified, host automatically selects an appropriate query type. By default, it looks for
A, AAAA, MX, and HTTPS records. If the -C option is given, queries are made for SOA records. If name is a
dotted-decimal IPv4 address or colon-delimited IPv6 address, host queries for PTR records.
16.17. host - DNS lookup utility

If a query type of IXFR is chosen, the starting serial number can be specified by appending an equals sign (=),
followed by the starting serial number, e.g., -t IXFR=12345678.
-T, -U

This option specifies TCP or UDP. By default, host uses UDP when making queries; the -T option makes it use a
TCP connection when querying the name server. TCP is automatically selected for queries that require it, such as
zone transfer (AXFR) requests. Type ANY queries default to TCP, but can be forced to use UDP initially via -U .
-m flag

This option sets memory usage debugging: the flag can be record, usage, or trace. The -m option can be
specified more than once to set multiple flags.

This option sets verbose output, and is equivalent to the -d debug option. Verbose output can also be enabled by
setting the debug option in /etc/resolv.conf.

This option prints the version number and exits.
-w

This option sets “wait forever”: the query timeout is set to the maximum possible. See also the -W option.
-W wait

This options sets the length of the wait timeout, indicating that named should wait for up to wait seconds for a
reply. If wait is less than 1, the wait interval is set to 1 second.
By default, host waits for 5 seconds for UDP responses and 10 seconds for TCP connections. These defaults can
be overridden by the timeout option in /etc/resolv.conf.
See also the -w option.

#### 16.17.4 IDN Support
If host has been built with IDN (internationalized domain name) support, it can accept and display non-ASCII domain
names. host appropriately converts character encoding of a domain name before sending a request to a DNS server or
displaying a reply from the server. To turn off IDN support, define the IDN_DISABLE environment variable. IDN support
is disabled if the variable is set when host runs.

#### 16.17.5 Files

#### 16.17.6 See Also
dig(1), named(8).

16.18 mdig - DNS pipelined lookup utility
16.18.1 Synopsis
mdig {@server} [-f filename] [-h] [-v] [ [-4] | [-6] ] [-m] [-b address] [-p port#] [-c class] [-t type] [-i] [-x addr]

[plusopt…]
mdig {-h}
mdig [@server] {global-opt…} { {local-opt…} {query} …}

#### 16.18.2 Description
mdig is a multiple/pipelined query version of dig : instead of waiting for a response after sending each query, it begins

by sending all queries. Responses are displayed in the order in which they are received, not in the order the corresponding
queries were sent.
mdig options are a subset of the dig options, and are divided into “anywhere options,” which can occur anywhere, “global

options,” which must occur before the query name (or they are ignored with a warning), and “local options,” which apply
to the next query on the command line.
The @server option is a mandatory global option. It is the name or IP address of the name server to query. (Unlike dig ,
this value is not retrieved from /etc/resolv.conf.) It can be an IPv4 address in dotted-decimal notation, an IPv6
address in colon-delimited notation, or a hostname. When the supplied server argument is a hostname, mdig resolves
that name before querying the name server.
mdig provides a number of query options which affect the way in which lookups are made and the results displayed. Some

of these set or reset flag bits in the query header, some determine which sections of the answer get printed, and others
determine the timeout and retry strategies.
Each query option is identified by a keyword preceded by a plus sign (+). Some keywords set or reset an option. These
may be preceded by the string no to negate the meaning of that keyword. Other keywords assign values to options like
the timeout interval. They have the form +keyword=value.

#### 16.18.3 Anywhere Options

This option makes mdig operate in batch mode by reading a list of lookup requests to process from the file filename. The file contains a number of queries, one per line. Each entry in the file should be organized in the same
way they would be presented as queries to mdig using the command-line interface.

This option causes mdig to print detailed help information, with the full list of options, and exit.

This option causes mdig to print the version number and exit.

#### 16.18.4 Global Options

This option forces mdig to only use IPv4 query transport.

This option forces mdig to only use IPv6 query transport.
-b address

This option sets the source IP address of the query to address. This must be a valid address on one of the host’s
network interfaces or “0.0.0.0” or “::”. An optional port may be specified by appending “#<port>”

This option enables memory usage debugging.
-p port#

This option is used when a non-standard port number is to be queried. port# is the port number that mdig sends
its queries to, instead of the standard DNS port number 53. This option is used to test a name server that has been
configured to listen for queries on a non-standard port number.
The global query options are:

16.18. mdig - DNS pipelined lookup utility

+additional, +noadditional

This option displays [or does not display] the additional section of a reply. The default is to display it.
+all, +noall

This option sets or clears all display flags.
+answer, +noanswer

This option displays [or does not display] the answer section of a reply. The default is to display it.
+authority, +noauthority

This option displays [or does not display] the authority section of a reply. The default is to display it.
+besteffort, +nobesteffort

This option attempts to display [or does not display] the contents of messages which are malformed. The default
is to not display malformed answers.
+burst

This option delays queries until the start of the next second.
+cl, +nocl

This option displays [or does not display] the CLASS when printing the record.
+comments, +nocomments

This option toggles the display of comment lines in the output. The default is to print comments.
+continue, +nocontinue

This option toggles continuation on errors (e.g. timeouts).
+crypto, +nocrypto

This option toggles the display of cryptographic fields in DNSSEC records. The contents of these fields are unnecessary to debug most DNSSEC validation failures and removing them makes it easier to see the common failures.
The default is to display the fields. When omitted, they are replaced by the string “[omitted]”; in the DNSKEY
case, the key ID is displayed as the replacement, e.g., [ key id = value ].
+multiline, +nomultiline

This option toggles printing of records, like the SOA records, in a verbose multi-line format with human-readable
comments. The default is to print each record on a single line, to facilitate machine parsing of the mdig output.
+question, +noquestion

This option prints [or does not print] the question section of a query when an answer is returned. The default is to
print the question section as a comment.
+rrcomments, +norrcomments

This option toggles the display of per-record comments in the output (for example, human-readable key information
about DNSKEY records). The default is not to print record comments unless multiline mode is active.
+short, +noshort

This option provides [or does not provide] a terse answer. The default is to print the answer in a verbose form.
+split=W

This option splits long hex- or base64-formatted fields in resource records into chunks of W characters (where W is
rounded up to the nearest multiple of 4). +nosplit or +split=0 causes fields not to be split. The default is 56
characters, or 44 characters when multiline mode is active.
+tcp, +notcp

This option uses [or does not use] TCP when querying name servers. The default behavior is to use UDP.

+ttlid, +nottlid

This option displays [or does not display] the TTL when printing the record.
+ttlunits, +nottlunits

This option displays [or does not display] the TTL in friendly human-readable time units of “s”, “m”, “h”, “d”, and
“w”, representing seconds, minutes, hours, days, and weeks. This implies +ttlid.
+vc, +novc

This option uses [or does not use] TCP when querying name servers. This alternate syntax to +tcp is provided for
backwards compatibility. The vc stands for “virtual circuit”.

#### 16.18.5 Local Options

This option sets the query class to class. It can be any valid query class which is supported in BIND 9. The
default query class is “IN”.

This option sets the query type to type. It can be any valid query type which is supported in BIND 9. The default
query type is “A”, unless the -x option is supplied to indicate a reverse lookup with the “PTR” query type.
-x addr

Reverse lookups - mapping addresses to names - are simplified by this option. addr is an IPv4 address in dotteddecimal notation, or a colon-delimited IPv6 address. mdig automatically performs a lookup for a query name like
11.12.13.10.in-addr.arpa and sets the query type and class to PTR and IN respectively. By default, IPv6
addresses are looked up using nibble format under the IP6.ARPA domain.
The local query options are:
+aaflag, +noaaflag

This is a synonym for +aaonly , +noaaonly .
+aaonly, +noaaonly

This sets the aa flag in the query.
+adflag, +noadflag

This sets [or does not set] the AD (authentic data) bit in the query. This requests the server to return whether all of
the answer and authority sections have all been validated as secure, according to the security policy of the server.
AD=1 indicates that all records have been validated as secure and the answer is not from a OPT-OUT range. AD=0
indicates that some part of the answer was insecure or not validated. This bit is set by default.
+bufsize=B

This sets the UDP message buffer size advertised using EDNS0 to B bytes. The maximum and minimum sizes of
this buffer are 65535 and 0 respectively. Values outside this range are rounded up or down appropriately. Values
other than zero cause a EDNS query to be sent.
+cdflag, +nocdflag

This sets [or does not set] the CD (checking disabled) bit in the query. This requests the server to not perform
DNSSEC validation of responses.
+cookie=####, +nocookie

This sends [or does not send] a COOKIE EDNS option, with an optional value. Replaying a COOKIE from a
previous response allows the server to identify a previous client. The default is +nocookie.
+dnssec, +nodnssec

This requests that DNSSEC records be sent by setting the DNSSEC OK (DO) bit in the OPT record in the additional
section of the query.

16.18. mdig - DNS pipelined lookup utility

+edns[=#], +noedns

This specifies [or does not specify] the EDNS version to query with. Valid values are 0 to 255. Setting the EDNS
version causes an EDNS query to be sent. +noedns clears the remembered EDNS version. EDNS is set to 0 by
default.
+ednsflags[=#], +noednsflags

This sets the must-be-zero EDNS flag bits (Z bits) to the specified value. Decimal, hex, and octal encodings are
accepted. Setting a named flag (e.g. DO) is silently ignored. By default, no Z bits are set.
+ednsopt[=code[:value]], +noednsopt

This specifies [or does not specify] an EDNS option with code point code and an optional payload of value as a
hexadecimal string. +noednsopt clears the EDNS options to be sent.
+expire, +noexpire

This toggles sending of an EDNS Expire option.
+nsid, +nonsid

This toggles inclusion of an EDNS name server ID request when sending a query.
+recurse, +norecurse

This toggles the setting of the RD (recursion desired) bit in the query. This bit is set by default, which means mdig
normally sends recursive queries.
+retry=T

This sets the number of times to retry UDP queries to server to T instead of the default, 2. Unlike +tries, this
does not include the initial query.
+subnet=addr[/prefix-length], +nosubnet

This sends [or does not send] an EDNS Client Subnet option with the specified IP address or network prefix.
mdig +subnet=0.0.0.0/0, or simply mdig +subnet=0

This sends an EDNS client-subnet option with an empty address and a source prefix-length of zero, which signals
a resolver that the client’s address information must not be used when resolving this query.
+timeout=T

This sets the timeout for a query to T seconds. The default timeout is 5 seconds for UDP transport and 10 for TCP.
An attempt to set T to less than 1 results in a query timeout of 1 second being applied.
+tries=T

This sets the number of times to try UDP queries to server to T instead of the default, 3. If T is less than or equal
to zero, the number of tries is silently rounded up to 1.
+udptimeout=T

This sets the timeout between UDP query retries to T.
+unknownformat, +nounknownformat

This prints [or does not print] all RDATA in unknown RR-type presentation format (see RFC 3597). The default
is to print RDATA for known types in the type’s presentation format.
+yaml, +noyaml

This toggles printing of the responses in a detailed YAML format.
+zflag, +nozflag

This sets [or does not set] the last unassigned DNS header flag in a DNS query. This flag is off by default.

#### 16.18.6 See Also
dig(1), RFC 1035.

16.19 named-checkconf - named configuration file syntax checking
tool
16.19.1 Synopsis
named-checkconf [-achjlnvz] [-p [-x ]] [-t directory] {filename}

#### 16.19.2 Description
named-checkconf checks the syntax, but not the semantics, of a named configuration file. The file, along with all files
included by it, is parsed and checked for syntax errors. If no file is specified, /etc/named.conf is read by default.

Note: files that named reads in separate parser contexts, such as rndc.conf or rndc.key, are not automatically read
by named-checkconf. Configuration errors in these files may cause named to fail to run, even if named-checkconf
was successful. However, named-checkconf can be run on these files explicitly.

#### 16.19.3 Options

Don’t check the dnssec-policy’s DNSSEC key algorithms against those supported by the crypto provider. This is
useful when checking a named.conf intended to be run on another machine with possibly a different set of supported
DNSSEC key algorithms.

This option prints the usage summary and exits.
-j

When loading a zonefile, this option instructs named to read the journal if it exists.
-l

This option lists all the configured zones. Each line of output contains the zone name, class (e.g. IN), view, and
type (e.g. primary or secondary).
-c

This option specifies that only the “core” configuration should be checked. This suppresses the loading of plugin
modules, and causes all parameters to plugin statements to be ignored.
-i

This option ignores warnings on deprecated options.
-n

Do not print errors when encountering options that are disabled in this build. This allows checking of configuration
files for other builds, in which those options are enabled.
-p

This option prints out the named.conf and included files in canonical form if no errors were detected. See also
the -x option.

This option instructs named to chroot to directory, so that include directives in the configuration file are
processed as if run by a similarly chrooted named.

16.19. named-checkconf - named configuration file syntax checking tool

This option prints the version of the named-checkconf program and exits.

When printing the configuration files in canonical form, this option obscures shared secrets by replacing them with
strings of question marks (?). This allows the contents of named.conf and related files to be shared - for example,
when submitting bug reports - without compromising private data. This option cannot be used without -p.
-z

This option performs a test load of all zones of type primary found in named.conf .

This indicates the name of the configuration file to be checked. If not specified, it defaults to /etc/named.conf.

#### 16.19.4 Return Values
named-checkconf returns an exit status of 1 if errors were detected and 0 otherwise.

#### 16.19.5 See Also
named(8), named-checkzone(8), BIND 9 Administrator Reference Manual.

16.20 named-checkzone - zone file validation tool
16.20.1 Synopsis
named-checkzone [-d] [-h] [-j] [-q] [-v] [-c class] [-C mode] [-f format] [-F format] [-J filename] [-i mode] [-k mode]
[-m mode] [-M mode] [-n mode] [-l ttl] [-L serial] [-o filename] [-r mode] [-R mode] [-s style] [-S mode] [-t directory]
[-T mode] [-w directory] [-D] [-W mode] {zonename} {filename}

#### 16.20.2 Description
named-checkzone checks the syntax and integrity of a zone file. It performs the same checks as named does when
loading a zone. This makes named-checkzone useful for checking zone files before configuring them into a name server.

#### 16.20.3 Options

This option enables debugging.

This option prints the usage summary and exits.

This option sets quiet mode, which only sets an exit code to indicate successful or failed completion.

This option prints the version of the named-checkzone program and exits.
-j

When loading a zone file, this option tells named to read the journal if it exists. The journal file name is assumed
to be the zone file name with the string .jnl appended.

When loading the zone file, this option tells named to read the journal from the given file, if it exists. This implies
-j.

This option specifies the class of the zone. If not specified, IN is assumed.
-C mode

This option controls check mode on zone files when loading. Possible modes are check-svcb:fail and
check-svcb:ignore.
check-svcb:fail turns on additional checks on _dns SVCB records and check-svcb:ignore disables these
checks. The default is check-svcb:fail.
-i mode

This option performs post-load zone integrity checks. Possible modes are full (the default), full-sibling,
local, local-sibling, and none.
Mode full checks that MX records refer to A or AAAA records (both in-zone and out-of-zone hostnames). Mode
local only checks MX records which refer to in-zone hostnames.
Mode full checks that SRV records refer to A or AAAA records (both in-zone and out-of-zone hostnames).
Mode local only checks SRV records which refer to in-zone hostnames.
Mode full checks that a zone that has A or AAAA records it is served by a server with the same type of address
Mode full checks that delegation NS records refer to A or AAAA records (both in-zone and out-of-zone hostnames). It also checks that glue address records in the zone match those advertised by the child.
Mode local only checks NS records which refer to in-zone hostnames or verifies that some required glue exists,
i.e., when the name server is in a child zone.
Modes full-sibling and local-sibling disable sibling glue checks, but are otherwise the same as full and
local, respectively.
Mode none disables the checks.
-f format

This option specifies the format of the zone file. Possible formats are text (the default), and raw.
-F format

This option specifies the format of the output file specified. For named-checkzone, this does not have any effect
unless it dumps the zone contents.
Possible formats are text (the default), which is the standard textual representation of the zone, and raw and
raw=N, which store the zone in a binary format for rapid loading by named . raw=N specifies the format version of
the raw zone file: if N is 0, the raw file can be read by any version of named; if N is 1, the file can only be read by
release 9.9.0 or higher. The default is 1.
-k mode

This option performs check-names checks with the specified failure mode. Possible modes are fail, warn (the
default), and ignore.
-l ttl

This option sets a maximum permissible TTL for the input file. Any record with a TTL higher than this value
causes the zone to be rejected. This is similar to using the max-zone-ttl option in named.conf .

16.20. named-checkzone - zone file validation tool

-L serial

When compiling a zone to raw format, this option sets the “source serial” value in the header to the specified serial
number. This is expected to be used primarily for testing purposes.
-m mode

This option specifies whether MX records should be checked to see if they are addresses. Possible modes are fail,
warn (the default), and ignore.
-M mode

This option checks whether a MX record refers to a CNAME. Possible modes are fail, warn (the default), and
ignore.
-n mode

This option specifies whether NS records should be checked to see if they are addresses. Possible modes are fail,
warn (the default), and ignore.
-o filename

This option writes the zone output to filename. If filename is -, then the zone output is written to standard
output.
-r mode

This option checks for records that are treated as different by DNSSEC but are semantically equal in plain DNS.
Possible modes are fail, warn (the default), and ignore.
-R mode

This option checks whether a TXT wildcard record exists that matches the name format for RFC 9567 errorreporting queries: *._er. Possible modes are fail and ignore (the default).
-s style

This option specifies the style of the dumped zone file. Possible styles are full (the default) and relative. The
full format is most suitable for processing automatically by a separate script. The relative format is more humanreadable and is thus suitable for editing by hand. This does not have any effect unless it dumps the zone contents.
It also does not have any meaning if the output format is not text.
-S mode

This option checks whether an SRV record refers to a CNAME. Possible modes are fail, warn (the default), and
ignore.

This option tells named to chroot to directory, so that include directives in the configuration file are processed
as if run by a similarly chrooted named.
-T mode

This option checks whether Sender Policy Framework (SPF) records exist and issues a warning if an SPF-formatted
TXT record is not also present. Possible modes are warn (the default) and ignore.
-w directory

This option instructs named to chdir to directory, so that relative filenames in master file $INCLUDE directives
work. This is similar to the directory clause in named.conf .

This option dumps the zone file in canonical format.
-W mode

This option specifies whether to check for non-terminal wildcards. Non-terminal wildcards are almost always the
result of a failure to understand the wildcard matching algorithm (RFC 4592). Possible modes are warn (the
default) and ignore.

zonename

This indicates the domain name of the zone being checked.

This is the name of the zone file.

#### 16.20.4 Return Values
named-checkzone returns an exit status of 1 if errors were detected and 0 otherwise.

#### 16.20.5 See Also
named(8), named-checkconf(8), named-compilezone(8), RFC 1035, BIND 9 Administrator Reference Man-

ual.

16.21 named-compilezone - zone file converting tool
16.21.1 Synopsis
named-compilezone [-d] [-h] [-j] [-q] [-v] [-c class] [-C mode] [-f format] [-F format] [-J filename] [-i mode] [-k

mode] [-m mode] [-M mode] [-n mode] [-l ttl] [-L serial] [-r mode] [-R mode] [-s style] [-S mode] [-t directory] [-T
mode] [-w directory] [-D] [-W mode] {-o filename} {zonename} {filename}

#### 16.21.2 Description
named-compilezone checks the syntax and integrity of a zone file, and dumps the zone contents to a specified file in a

specified format.
Unlike named-checkzone, zone contents are not strictly checked by default. If the output is to be used as an actual zone
file to be loaded by named, then the check levels should be manually configured to be at least as strict as those specified
in the named configuration file.
Running named-checkzone on the input prior to compiling will ensure that the zone compiles with the default requirements of named.

#### 16.21.3 Options

This option enables debugging.

This option prints the usage summary and exits.

This option sets quiet mode, which only sets an exit code to indicate successful or failed completion.

This option prints the version of the named-checkzone program and exits.
-j

When loading a zone file, this option tells named to read the journal if it exists. The journal file name is assumed
to be the zone file name with the string .jnl appended.

16.21. named-compilezone - zone file converting tool

When loading the zone file, this option tells named to read the journal from the given file, if it exists. This implies
-j.

This option specifies the class of the zone. If not specified, IN is assumed.
-C mode

This option controls check mode on zone files when loading. Possible modes are check-svcb:fail and
check-svcb:ignore.
check-svcb:fail turns on additional checks on _dns SVCB records and check-svcb:ignore disables these
checks. The default is check-svcb:ignore.
-i mode

This option performs post-load zone integrity checks. Possible modes are full, full-sibling, local,
local-sibling, and none (the default).

Mode full checks that MX records refer to A or AAAA records (both in-zone and out-of-zone hostnames). Mode
local only checks MX records which refer to in-zone hostnames.
Mode full checks that SRV records refer to A or AAAA records (both in-zone and out-of-zone hostnames).
Mode local only checks SRV records which refer to in-zone hostnames.
Mode full checks that delegation NS records refer to A or AAAA records (both in-zone and out-of-zone hostnames). It also checks that glue address records in the zone match those advertised by the child. Mode local only
checks NS records which refer to in-zone hostnames or verifies that some required glue exists, i.e., when the name
server is in a child zone.
Modes full-sibling and local-sibling disable sibling glue checks, but are otherwise the same as full and
local, respectively.
Mode none disables the checks.
-f format

This option specifies the format of the zone file. Possible formats are text (the default), and raw.
-F format

This option specifies the format of the output file specified. For named-checkzone, this does not have any effect
unless it dumps the zone contents.
Possible formats are text (the default), which is the standard textual representation of the zone, and raw and
raw=N, which store the zone in a binary format for rapid loading by named . raw=N specifies the format version of
the raw zone file: if N is 0, the raw file can be read by any version of named; if N is 1, the file can only be read by
release 9.9.0 or higher. The default is 1.
-k mode

This option performs check-names checks with the specified failure mode. Possible modes are fail, warn, and
ignore (the default).
-l ttl

This option sets a maximum permissible TTL for the input file. Any record with a TTL higher than this value
causes the zone to be rejected. This is similar to using the max-zone-ttl option in named.conf .
-L serial

When compiling a zone to raw format, this option sets the “source serial” value in the header to the specified serial
number. This is expected to be used primarily for testing purposes.

-m mode

This option specifies whether MX records should be checked to see if they are addresses. Possible modes are fail,
warn, and ignore (the default).
-M mode

This option checks whether a MX record refers to a CNAME. Possible modes are fail, warn, and ignore (the
default).
-n mode

This option specifies whether NS records should be checked to see if they are addresses. Possible modes are fail,
warn, and ignore (the default).
-o filename

This option writes the zone output to filename. If filename is -, then the zone output is written to standard
output. This is mandatory for named-compilezone.
-r mode

This option checks for records that are treated as different by DNSSEC but are semantically equal in plain DNS.
Possible modes are fail, warn, and ignore (the default).
-R mode

This option checks whether a TXT wildcard record exists that matches the name format for RFC 9567 errorreporting queries: *._er. Possible modes are fail and ignore (the default).
-s style

This option specifies the style of the dumped zone file. Possible styles are full (the default) and relative.
The full format is most suitable for processing automatically by a separate script. The relative format is more
human-readable and is thus suitable for editing by hand.
-S mode

This option checks whether an SRV record refers to a CNAME. Possible modes are fail, warn, and ignore (the
default).

This option tells named to chroot to directory, so that include directives in the configuration file are processed
as if run by a similarly chrooted named.
-T mode

This option checks whether Sender Policy Framework (SPF) records exist and issues a warning if an SPF-formatted
TXT record is not also present. Possible modes are warn and ignore (the default).
-w directory

This option instructs named to chdir to directory, so that relative filenames in master file $INCLUDE directives
work. This is similar to the directory clause in named.conf .

This option dumps the zone file in canonical format. This is always enabled for named-compilezone.
-W mode

This option specifies whether to check for non-terminal wildcards. Non-terminal wildcards are almost always the
result of a failure to understand the wildcard matching algorithm (RFC 4592). Possible modes are warn and
ignore (the default).
zonename

This indicates the domain name of the zone being checked.

This is the name of the zone file.
16.21. named-compilezone - zone file converting tool

#### 16.21.4 Return Values
named-compilezone returns an exit status of 1 if errors were detected and 0 otherwise.

#### 16.21.5 See Also
named(8), named-checkconf(8), named-checkzone(8), RFC 1035, BIND 9 Administrator Reference Manual.

16.22 named-journalprint - print zone journal in human-readable
form
16.22.1 Synopsis
named-journalprint [-c serial] [-dux] {journal}

#### 16.22.2 Description
named-journalprint scans the contents of a zone journal file, printing it in a human-readable form, or, optionally,

converting it to a different journal file format.
Journal files are automatically created by named when changes are made to dynamic zones (e.g., by nsupdate). They
record each addition or deletion of a resource record, in binary format, allowing the changes to be re-applied to the zone
when the server is restarted after a shutdown or crash. By default, the name of the journal file is formed by appending
the extension .jnl to the name of the corresponding zone file.
named-journalprint converts the contents of a given journal file into a human-readable text format. Each line begins
with add or del, to indicate whether the record was added or deleted, and continues with the resource record in master-file

format.
The -c (compact) option provides a mechanism to reduce the size of a journal by removing (most/all) transactions prior
to the specified serial number. Note: this option must not be used while named is running, and can cause data loss if the
zone file has not been updated to contain the data being removed from the journal. Use with extreme caution.
The -x option causes additional data about the journal file to be printed at the beginning of the output and before each
group of changes.
The -u (upgrade) and -d (downgrade) options recreate the journal file with a modified format version. The existing
journal file is replaced. -d writes out the journal in the format used by versions of BIND up to 9.16.11; -u writes it out
in the format used by versions since 9.16.13. (9.16.12 is omitted due to a journal-formatting bug in that release.) Note
that these options must not be used while named is running.

#### 16.22.3 See Also
named(8), nsupdate(1), BIND 9 Administrator Reference Manual.

16.23 named-nzd2nzf - convert an NZD database to NZF text format
16.23.1 Synopsis
named-nzd2nzf {filename}

#### 16.23.2 Description
named-nzd2nzf converts an NZD database to NZF format and prints it to standard output. This can be used to review
the configuration of zones that were added to named via rndc addzone. It can also be used to restore the old file format

when rolling back from a newer version of BIND to an older version.

#### 16.23.3 Arguments

This is the name of the .nzd file whose contents should be printed.

#### 16.23.4 See Also

16.24 named-rrchecker - syntax checker for individual DNS resource
records
16.24.1 Synopsis
named-rrchecker [-h] [-o origin] [-p] [-u] [-C] [-T] [-P]

#### 16.24.2 Description
named-rrchecker reads a individual DNS resource record from standard input and checks whether it is syntactically

correct.

#### 16.24.3 Options

This option prints out the help menu.
-o origin

This option specifies the origin to be used when interpreting the record.
-p

This option prints out the resulting record in canonical form. If there is no canonical form defined, the record is
printed in unknown record format.

This option prints out the resulting record in unknown record form.
-C, -T, -P

These options print out the known class, standard type, and private type mnemonics, respectively.

#### 16.24.4 See Also
RFC 1034, RFC 1035, named(8).

16.25 named.conf - configuration file for named
16.25.1 Synopsis
named.conf

16.24. named-rrchecker - syntax checker for individual DNS resource records

#### 16.25.2 Description
named.conf is the configuration file for named .

For complete documentation about the configuration statements, please refer to the Configuration Reference section in
the BIND 9 Administrator Reference Manual.
Statements are enclosed in braces and terminated with a semi-colon. Clauses in the statements are also semi-colon
terminated. The usual comment styles are supported:
C style: /* */
C++ style: // to end of line
Unix style: # to end of line
acl <string> { <address_match_element>; ... }; // may occur multiple times
inet ( <ipv4_address> | <ipv6_address> | * ) [ port ( <integer> | * ) ] allow
,→{ <address_match_element>; ... } [ keys { <string>; ... } ] [ read-only <boolean> ];
,→ // may occur multiple times
unix <quoted_string> perm <integer> owner <integer> group <integer> [ keys {
,→<string>; ... } ] [ read-only <boolean> ]; // may occur multiple times
dnssec-policy <string> {
cdnskey <boolean>;
cds-digest-types { <string>; ... };
dnskey-ttl <duration>;
keys { ( csk | ksk | zsk ) [ key-directory | key-store <string> ] lifetime
,→<duration_or_unlimited> algorithm <string> [ tag-range <integer> <integer> ] [
,→<integer> ]; ... };
max-zone-ttl <duration>;
nsec3param [ iterations <integer> ] [ optout <boolean> ] [ salt-length
,→<integer> ];
offline-ksk <boolean>;
parent-ds-ttl <duration>;
parent-propagation-delay <duration>;
publish-safety <duration>;
purge-keys <duration>;
retire-safety <duration>;
signatures-jitter <duration>;
signatures-refresh <duration>;
signatures-validity <duration>;
signatures-validity-dnskey <duration>;
zone-propagation-delay <duration>;
dyndb <string> <quoted_string> { <unspecified-text> }; // may occur multiple times

http <string> {
endpoints { <quoted_string>; ... };
listener-clients <integer>;
streams-per-connection <integer>;
}; // optional (only available if configured), may occur multiple times
key-store <string> {
directory <string>;
pkcs11-uri <quoted_string>;
category <string> { <string>; ... }; // may occur multiple times
channel <string> {
buffered <boolean>;
file <quoted_string> [ versions ( unlimited | <integer> ) ] [ size
,→<size> ] [ suffix ( increment | timestamp ) ];
print-category <boolean>;
print-severity <boolean>;
print-time ( iso8601 | iso8601-utc | iso8601-tzinfo | local |
,→<boolean> );
severity <log_severity>;
syslog [ <syslog_facility> ];

answer-cookie <boolean>;
automatic-interface-scan <boolean>;
bindkeys-file <quoted_string>; // test only
blackhole { <address_match_element>; ... };
catalog-zones { zone <string> [ default-primaries [ port <integer> ] [ source␣
,→( <ipv4_address> | * ) ] [ source-v6 ( <ipv6_address> | * ) ] { ( <server-list> |
,→<ipv4_address> [ port <integer> ] | <ipv6_address> [ port <integer> ] ) [ key
,→<string> ] [ tls <string> ]; ... } ] [ zone-directory <quoted_string> ] [ in-memory
,→<boolean> ] [ min-update-interval <duration> ]; ... };
check-names ( primary | master | secondary | slave | response ) ( fail | warn␣
,→| ignore ); // may occur multiple times
cookie-algorithm ( siphash24 );
cookie-secret <string>; // may occur multiple times
directory <quoted_string>;
dnsrps-library <quoted_string>; // obsolete

dnstap { ( all | auth | client | forwarder | resolver | update ) [ ( query |␣
,→response ) ]; ... }; // optional (only available if configured)
dnstap-identity ( <quoted_string> | none | hostname ); // optional (only␣
,→available if configured)
dnstap-output ( file | unix ) <quoted_string> [ size ( unlimited | <size> ) ]␣
,→[ versions ( unlimited | <integer> ) ] [ suffix ( increment | timestamp ) ]; //␣
,→optional (only available if configured)
dnstap-version ( <quoted_string> | none ); // optional (only available if␣
dual-stack-servers [ port <integer> ] { ( <quoted_string> [ port <integer> ]␣
,→| <ipv4_address> [ port <integer> ] | <ipv6_address> [ port <integer> ] ); ... };
dump-file <quoted_string>;
flush-zones-on-shutdown <boolean>;
fstrm-set-buffer-hint <integer>; // optional (only available if configured)
fstrm-set-flush-timeout <integer>; // optional (only available if configured)
fstrm-set-input-queue-size <integer>; // optional (only available if␣
fstrm-set-output-notify-threshold <integer>; // optional (only available if␣
fstrm-set-output-queue-model ( mpsc | spsc ); // optional (only available if␣
fstrm-set-output-queue-size <integer>; // optional (only available if␣
fstrm-set-reopen-interval <duration>; // optional (only available if␣
geoip-directory ( <quoted_string> | none );
hostname ( <quoted_string> | none );
http-listener-clients <integer>; // optional (only available if configured)
http-port <integer>; // optional (only available if configured)
http-streams-per-connection <integer>; // optional (only available if␣
https-port <integer>; // optional (only available if configured)
interface-interval <duration>;
ixfr-from-differences ( primary | master | secondary | slave | <boolean> );
keep-response-order { <address_match_element>; ... }; // obsolete
listen-on [ port <integer> ] [ proxy <string> ] [ tls <string> ] [ http

<string> ] { <address_match_element>; ... }; // may occur multiple times
listen-on-v6 [ port <integer> ] [ proxy <string> ] [ tls <string> ] [ http
,→<string> ] { <address_match_element>; ... }; // may occur multiple times
lmdb-mapsize <sizeval>; // optional (only available if configured)
managed-keys-directory <quoted_string>;
match-mapped-addresses <boolean>;
max-rsa-exponent-size <integer>;
memstatistics <boolean>;
memstatistics-file <quoted_string>;
notify-rate <integer>;

pid-file ( <quoted_string> | none );
port <integer>;
querylog <boolean>;
recursing-file <quoted_string>;
recursive-clients <integer>;
response-policy { zone <string> [ add-soa <boolean> ] [ log <boolean> ] [ max,→policy-ttl <duration> ] [ min-update-interval <duration> ] [ policy ( cname |␣
,→disabled | drop | given | no-op | nodata | nxdomain | passthru | tcp-only <quoted_
,→string> ) ] [ recursive-only <boolean> ] [ nsip-enable <boolean> ] [ nsdname-enable
,→<boolean> ] [ ede <string> ]; ... } [ add-soa <boolean> ] [ break-dnssec <boolean>␣
,→] [ max-policy-ttl <duration> ] [ min-update-interval <duration> ] [ min-ns-dots
,→<integer> ] [ nsip-wait-recurse <boolean> ] [ nsdname-wait-recurse <boolean> ] [␣
,→qname-wait-recurse <boolean> ] [ recursive-only <boolean> ] [ nsip-enable <boolean>␣

] [ nsdname-enable <boolean> ] [ dnsrps-enable <boolean> ] [ dnsrps-options {
,→<unspecified-text> } ];
responselog <boolean>;
reuseport <boolean>;
rrset-order { [ class <string> ] [ type <string> ] [ name <quoted_string> ]
,→<string> <string>; ... };
secroots-file <quoted_string>;
serial-query-rate <integer>;
server-id ( <quoted_string> | none | hostname );
session-keyalg <string>;
session-keyfile ( <quoted_string> | none );
session-keyname <string>;
sig0checks-quota <integer>; // experimental
sig0checks-quota-exempt { <address_match_element>; ... }; // experimental
startup-notify-rate <integer>;
statistics-file <quoted_string>;
tcp-advertised-timeout <integer>;
tcp-clients <integer>;
tcp-idle-timeout <integer>;
tcp-initial-timeout <integer>;
tcp-keepalive-timeout <integer>;
tcp-listen-queue <integer>;
tcp-receive-buffer <integer>;
tcp-send-buffer <integer>;
tkey-domain <quoted_string>;
tkey-gssapi-credential <quoted_string>;
tkey-gssapi-keytab <quoted_string>;
tls-port <integer>;
transfer-message-size <integer>;
transfers-in <integer>;
transfers-out <integer>;
transfers-per-ns <integer>;

udp-receive-buffer <integer>;
udp-send-buffer <integer>;
update-quota <integer>;
version ( <quoted_string> | none );
plugin ( query ) <string> [ { <unspecified-text> } ]; // may occur multiple times
remote-servers <string> [ port <integer> ] [ source ( <ipv4_address> | * ) ] [ source,→v6 ( <ipv6_address> | * ) ] { ( <server-list> | <ipv4_address> [ port <integer> ] |
,→<ipv6_address> [ port <integer> ] ) [ key <string> ] [ tls <string> ]; ... }; //␣
,→may occur multiple times
statistics-channels {
inet ( <ipv4_address> | <ipv6_address> | * ) [ port ( <integer> | * ) ] [␣
,→allow { <address_match_element>; ... } ]; // may occur multiple times
}; // optional (only available if configured), may occur multiple times

tls <string> {
ca-file <quoted_string>;
cert-file <quoted_string>;
cipher-suites <string>;
ciphers <string>;
dhparam-file <quoted_string>;
key-file <quoted_string>;
prefer-server-ciphers <boolean>;
protocols { <string>; ... };
remote-hostname <quoted_string>;
session-tickets <boolean>;
trust-anchors { <string> ( static-key | initial-key | static-ds | initial-ds )
,→<integer> <integer> <integer> <quoted_string>; ... }; // may occur multiple times
view <string> [ <class> ] {
catalog-zones { zone <string> [ default-primaries [ port <integer> ] [ source␣
,→( <ipv4_address> | * ) ] [ source-v6 ( <ipv6_address> | * ) ] { ( <server-list> |
,→<ipv4_address> [ port <integer> ] | <ipv6_address> [ port <integer> ] ) [ key
,→<string> ] [ tls <string> ]; ... } ] [ zone-directory <quoted_string> ] [ in-memory
,→<boolean> ] [ min-update-interval <duration> ]; ... };
check-names ( primary | master | secondary | slave | response ) ( fail | warn␣
,→| ignore ); // may occur multiple times

dnstap { ( all | auth | client | forwarder | resolver | update ) [ ( query |␣
,→response ) ]; ... }; // optional (only available if configured)
dual-stack-servers [ port <integer> ] { ( <quoted_string> [ port <integer> ]␣
,→| <ipv4_address> [ port <integer> ] | <ipv6_address> [ port <integer> ] ); ... };
dyndb <string> <quoted_string> { <unspecified-text> }; // may occur multiple␣
,→times
ixfr-from-differences ( primary | master | secondary | slave | <boolean> );

lmdb-mapsize <sizeval>; // optional (only available if configured)
match-clients { <address_match_element>; ... };
match-destinations { <address_match_element>; ... };
match-recursive-only <boolean>;

plugin ( query ) <string> [ { <unspecified-text> } ]; // may occur multiple␣

response-policy { zone <string> [ add-soa <boolean> ] [ log <boolean> ] [ max,→policy-ttl <duration> ] [ min-update-interval <duration> ] [ policy ( cname |␣
,→disabled | drop | given | no-op | nodata | nxdomain | passthru | tcp-only <quoted_
,→string> ) ] [ recursive-only <boolean> ] [ nsip-enable <boolean> ] [ nsdname-enable
,→<boolean> ] [ ede <string> ]; ... } [ add-soa <boolean> ] [ break-dnssec <boolean>␣
,→] [ max-policy-ttl <duration> ] [ min-update-interval <duration> ] [ min-ns-dots
,→<integer> ] [ nsip-wait-recurse <boolean> ] [ nsdname-wait-recurse <boolean> ] [␣
,→qname-wait-recurse <boolean> ] [ recursive-only <boolean> ] [ nsip-enable <boolean>␣
,→] [ nsdname-enable <boolean> ] [ dnsrps-enable <boolean> ] [ dnsrps-options {
,→<unspecified-text> } ];

rrset-order { [ class <string> ] [ type <string> ] [ name <quoted_string> ]
,→<string> <string>; ... };
trust-anchors { <string> ( static-key | initial-key | static-ds | initial-ds␣
,→) <integer> <integer> <integer> <quoted_string>; ... }; // may occur multiple times

Any of these zone statements can also be set inside the view statement.

parental-agents [ port <integer> ] [ source ( <ipv4_address> | * ) ] [ source,→v6 ( <ipv6_address> | * ) ] { ( <server-list> | <ipv4_address> [ port <integer> ] |
update-policy ( local | { ( deny | grant ) <string> ( 6to4-self | external |␣
,→krb5-self | krb5-selfsub | krb5-subdomain | krb5-subdomain-self-rhs | ms-self | ms,→selfsub | ms-subdomain | ms-subdomain-self-rhs | name | self | selfsub | selfwild |␣
,→subdomain | tcp-self | wildcard | zonesub ) [ <string> ] <rrtypelist>; ... } );

parental-agents [ port <integer> ] [ source ( <ipv4_address> | * ) ] [ source,→v6 ( <ipv6_address> | * ) ] { ( <server-list> | <ipv4_address> [ port <integer> ] |

type static-stub;
server-addresses { ( <ipv4_address> | <ipv6_address> ); ... };
server-names { <string>; ... };
type stub;

in-view <string>;

#### 16.25.3 Files
/etc/named.conf

#### 16.25.4 See Also
named(8), named-checkconf(8), rndc(8), rndc-confgen(8), tsig-keygen(8), BIND 9 Administrator Ref-

erence Manual.

16.26 named - Internet domain name server
16.26.1 Synopsis
named [ [-4] | [-6] ] [-c config-file] [-C] [-d debug-level] [-D string] [-f] [-g] [-L logfile] [-M option] [-m flag] [-n #cpus]

[-p port] [-s] [-t directory] [-u user] [-v] [-V] ]

#### 16.26.2 Description
named is a Domain Name System (DNS) server, part of the BIND 9 distribution from ISC. For more information on the

DNS, see RFC 1033, RFC 1034, and RFC 1035.
When invoked without arguments, named reads the default configuration file /etc/named.conf, reads any initial data,
and listens for queries.

#### 16.26.3 Options

This option tells named to use only IPv4, even if the host machine is capable of IPv6. -4 and -6 are mutually
exclusive.

This option tells named to use only IPv6, even if the host machine is capable of IPv4. -4 and -6 are mutually
exclusive.
-c config-file

This option tells named to use config-file as its configuration file instead of the default, /etc/named.conf.
To ensure that the configuration file can be reloaded after the server has changed its working directory due to to a
possible directory option in the configuration file, config-file should be an absolute pathname.

This option prints out the default built-in configuration and exits.
NOTE: This is for debugging purposes only and is not an accurate representation of the actual configuration used
by named at runtime.
-d debug-level

This option sets the daemon’s debug level to debug-level. Debugging traces from named become more verbose
as the debug level increases.
-D string

This option specifies a string that is used to identify a instance of named in a process listing. The contents of
string are not examined.

This option runs the server in the foreground (i.e., do not daemonize).

This options turns on FIPS (US Federal Information Processing Standards) mode if the underlying crytographic
-g

This option runs the server in the foreground and forces all logging to stderr.
-L logfile

This option sets the log to the file logfile by default, instead of the system log.
-M option

This option sets the default (comma-separated) memory context options. The possible flags are:
- fill: fill blocks of memory with tag values when they are allocated or freed, to assist debugging of memory
problems; this is the implicit default if named has been compiled with --enable-developer.
- nofill: disable the behavior enabled by fill; this is the implicit default unless named has been compiled
with --enable-developer.

16.26. named - Internet domain name server

-m flag

This option turns on memory usage debugging flags. Possible flags are usage, trace and record. These correspond to the ISC_MEM_DEBUGXXXX flags described in <isc/mem.h>.
-n #cpus

This option creates #cpus worker threads to take advantage of multiple CPUs. If not specified, named tries to
determine the number of CPUs present and creates one thread per CPU. If it is unable to determine the number of
CPUs, a single worker thread is created.
-p value

This option specifies the port(s) on which the server will listen for queries. If value is of the form <portnum> or
dns=<portnum>, the server will listen for DNS queries on portnum; if not not specified, the default is port 53.
If value is of the form tls=<portnum>, the server will listen for TLS queries on portnum; the default is 853.
If value is of the form https=<portnum>, the server will listen for HTTPS queries on portnum; the default is
443. If value is of the form http=<portnum>, the server will listen for HTTP queries on portnum; the default
is 80.

This option writes memory usage statistics to stdout on exit.
This option is mainly of interest to BIND 9 developers and may be removed or changed in a future release.

This option tells named to chroot to directory after processing the command-line arguments, but before reading
the configuration file.
This option should be used in conjunction with the -u option, as chrooting a process running as root doesn’t enhance
security on most systems; the way chroot is defined allows a process with root privileges to escape a chroot jail.
-U #listeners

This option has been removed. Attempts to use it now result in a warning.
-u user

This option sets the setuid to user after completing privileged operations, such as creating sockets that listen on
privileged ports.
On Linux, named uses the kernel’s capability mechanism to drop all root privileges except the ability to bind to a
privileged port and set process resource limits. Unfortunately, this means that the -u option only works when named
is run on kernel 2.2.18 or later, or kernel 2.3.99-pre3 or later, since previous kernels did not allow privileges to be
retained after setuid.

This option reports the version number and exits.

This option reports the version number, build options, supported cryptographics algorithms, and exits.
-X lock-file

This option has been removed and using it will cause a fatal error.

#### 16.26.4 Signals
In routine operation, signals should not be used to control the nameserver; rndc should be used instead.
SIGHUP
This signal forces a reload of the server.
SIGINT, SIGTERM
These signals shut down the server.
The result of sending any other signals to the server is undefined.

#### 16.26.5 Configuration
The named configuration file is too complex to describe in detail here. A complete description is provided in the BIND
9 Administrator Reference Manual.
named inherits the umask (file creation mode mask) from the parent process. If files created by named, such as journal
files, need to have custom permissions, the umask should be set explicitly in the script used to start the named process.

#### 16.26.6 Files
/etc/named.conf

The default configuration file.
/run/named.pid

The default process-id file.

#### 16.26.7 See Also
RFC 1033, RFC 1034, RFC 1035, named-checkconf(8), named-checkzone(8), rndc(8), named.conf(5),

16.27 nsec3hash - generate NSEC3 hash
16.27.1 Synopsis
nsec3hash {salt} {algorithm} {iterations} {domain}
nsec3hash -r {algorithm} {flags} {iterations} {salt} {domain}

#### 16.27.2 Description
nsec3hash generates an NSEC3 hash based on a set of NSEC3 parameters. This can be used to check the validity of

NSEC3 records in a signed zone.
If this command is invoked as nsec3hash -r, it takes arguments in order, matching the first four fields of an NSEC3
record followed by the domain name: algorithm, flags, iterations, salt, domain. This makes it convenient to
copy and paste a portion of an NSEC3 or NSEC3PARAM record into a command line to confirm the correctness of an
NSEC3 hash.

16.27. nsec3hash - generate NSEC3 hash

#### 16.27.3 Arguments
salt

This is the salt provided to the hash algorithm.

This is a number indicating the hash algorithm. Currently the only supported hash algorithm for NSEC3 is SHA-1,
which is indicated by the number 1; consequently “1” is the only useful value for this argument.
flags

This is provided for compatibility with NSEC3 record presentation format, but is ignored since the flags do not
affect the hash.
iterations

This is the number of additional times the hash should be performed.
domain

This is the domain name to be hashed.

#### 16.27.4 See Also
BIND 9 Administrator Reference Manual, RFC 5155.

16.28 nslookup - query Internet name servers interactively
16.28.1 Synopsis
nslookup [-option] [name | -] [server]

#### 16.28.2 Description
nslookup is a program to query Internet domain name servers. nslookup has two modes: interactive and non-

interactive. Interactive mode allows the user to query name servers for information about various hosts and domains
or to print a list of hosts in a domain. Non-interactive mode prints just the name and requested information for a host or
domain.

#### 16.28.3 Arguments
Interactive mode is entered in the following cases:
a. when no arguments are given (the default name server is used);
b. when the first argument is a hyphen (-) and the second argument is the host name or Internet address of a name
Non-interactive mode is used when the name or Internet address of the host to be looked up is given as the first argument.
The optional second argument specifies the host name or address of a name server.
Options can also be specified on the command line if they precede the arguments and are prefixed with a hyphen. For
example, to change the default query type to host information, with an initial timeout of 10 seconds, type:
nslookup -query=hinfo

-timeout=10

The -version option causes nslookup to print the version number and immediately exit.

#### 16.28.4 Interactive Commands
host [server]

This command looks up information for host using the current default server or using server, if specified. If
host is an Internet address and the query type is A or PTR, the name of the host is returned. If host is a name
and does not have a trailing period (.), the search list is used to qualify the name.
To look up a host not in the current domain, append a period to the name.
server domain | lserver domain

These commands change the default server to domain; lserver uses the initial server to look up information about
domain, while server uses the current default server. If an authoritative answer cannot be found, the names of
servers that might have the answer are returned.
root

finger

ls

help

?

exit

This command exits the program.
set keyword[=value]

This command is used to change state information that affects the lookups. Valid keywords are:

This keyword prints the current values of the frequently used options to set. Information about the current
default server and host is also printed.
class=value

This keyword changes the query class to one of:

the Internet class
CH

the Chaos class
HS

the Hesiod class
ANY

wildcard
The class specifies the protocol group of the information. The default is IN; the abbreviation for this keyword
is cl.
nodebug

This keyword turns on or off the display of the full response packet, and any intermediate response packets,
when searching. The default for this keyword is nodebug; the abbreviation for this keyword is [no]deb.

16.28. nslookup - query Internet name servers interactively

nod2

This keyword turns debugging mode on or off. This displays more about what nslookup is doing. The default
is nod2.
domain=name

This keyword sets the search list to name.
nosearch

If the lookup request contains at least one period, but does not end with a trailing period, this keyword appends
the domain names in the domain search list to the request until an answer is received. The default is search.
port=value

This keyword changes the default TCP/UDP name server port to value from its default, port 53. The abbreviation for this keyword is po.
querytype=value | type=value

This keyword changes the type of the information query to value. The defaults are A and then AAAA; the
abbreviations for these keywords are q and ty.
Please note that it is only possible to specify one query type. Only the default behavior looks up both when
an alternative is not specified.
norecurse

This keyword tells the name server to query other servers if it does not have the information. The default is
recurse; the abbreviation for this keyword is [no]rec.
ndots=number

This keyword sets the number of dots (label separators) in a domain that disables searching. Absolute names
always stop searching.
retry=number

This keyword sets the number of retries to number.
timeout=number

This keyword changes the initial timeout interval to wait for a reply to number, in seconds.
novc

This keyword indicates that a virtual circuit should always be used when sending requests to the server. novc
is the default.
nofail

This keyword tries the next nameserver if a nameserver responds with SERVFAIL or a referral (nofail), or
terminates the query (fail) on such a response. The default is nofail.

#### 16.28.5 Return Values
nslookup returns with an exit status of 1 if any query failed, and 0 otherwise.

#### 16.28.6 IDN Support
If nslookup has been built with IDN (internationalized domain name) support, it can accept and display non-ASCII
domain names. nslookup appropriately converts character encoding of a domain name before sending a request to
a DNS server or displaying a reply from the server. To turn off IDN support, define the IDN_DISABLE environment
variable. IDN support is disabled if the variable is set when nslookup runs, or when the standard output is not a tty.

#### 16.28.7 Files

#### 16.28.8 See Also
dig(1), host(1), named(8).

16.29 nsupdate - dynamic DNS update utility
16.29.1 Synopsis
nsupdate [-d] [-D] [-i] [-L level] [ [-g] | [-o] | [-l] | [-y [hmac:]keyname:secret] | [-k keyfile] ] [ [-S] [-K tlskeyfile] [-E

tlscertfile] [-A tlscafile] [-H tlshostname] [-O] ] [-t timeout] [-u udptimeout] [-r udpretries] [-v] [-T] [-P] [-V] [ [-4] |
[-6] ] [filename]

#### 16.29.2 Description
nsupdate is used to submit Dynamic DNS Update requests, as defined in RFC 2136, to a name server. This allows

resource records to be added or removed from a zone without manually editing the zone file. A single update request can
contain requests to add or remove more than one resource record.
Zones that are under dynamic control via nsupdate or a DHCP server should not be edited by hand. Manual edits could
conflict with dynamic updates and cause data to be lost.
The resource records that are dynamically added or removed with nsupdate must be in the same zone. Requests are
sent to the zone’s primary server, which is identified by the MNAME field of the zone’s SOA record.
Transaction signatures can be used to authenticate the Dynamic DNS updates. These use the TSIG resource record type
described in RFC 2845, the SIG(0) record described in RFC 2535 and RFC 2931, or GSS-TSIG as described in RFC
3645.
TSIG relies on a shared secret that should only be known to nsupdate and the name server. For instance, suitable key
and server statements are added to /etc/named.conf so that the name server can associate the appropriate secret
key and algorithm with the IP address of the client application that is using TSIG authentication. ddns-confgen can
generate suitable configuration fragments. nsupdate uses the -y or -k options to provide the TSIG shared secret; these
options are mutually exclusive.
SIG(0) uses public key cryptography. To use a SIG(0) key, the public key must be stored in a KEY record in a zone
served by the name server.
GSS-TSIG uses Kerberos credentials. Standard GSS-TSIG mode is switched on with the -g flag. A non-standardscompliant variant of GSS-TSIG used by Windows 2000 can be switched on with the -o flag.

#### 16.29.3 Options

This option sets use of IPv4 only.

This option sets use of IPv6 only.
-A tlscafile

This option specifies the file of the certificate authorities (CA) certificates (in PEM format) in order to verify the
remote server TLS certificate when using DNS-over-TLS (DoT), to achieve Strict or Mutual TLS. When used,
it will override the certificates from the global certificates store, which are otherwise used by default when -S is
enabled. This option can not be used in conjuction with -O, and it implies -S.

16.29. nsupdate - dynamic DNS update utility

Overrides the default resolv.conf file. This is only intended for testing.

This option sets debug mode, which provides tracing information about the update requests that are made and the
replies received from the name server.

This option sets extra debug mode.
-E tlscertfile

This option sets the certificate(s) file for authentication for the DNS-over-TLS (DoT) transport to the remote server.
The certificate chain file is expected to be in PEM format. This option implies -S, and can only be used with -K .
-g

This option enables standard GSS-TSIG mode.
-H tlshostname

This option makes nsupdate use the provided hostname during remote server TLS certificate verification. Otherwise, the DNS server name is used. This option implies -S.
-i

This option forces interactive mode, even when standard input is not a terminal.
-k keyfile

This option indicates the file containing the TSIG authentication key. Keyfiles may be in two formats: a single
file containing a named.conf -format key statement, which may be generated automatically by ddns-confgen;
or a pair of files whose names are of the format K{name}.+157.+{random}.key and K{name}.+157.
+{random}.private, which can be generated by dnssec-keygen. The -k option can also be used to specify
a SIG(0) key used to authenticate Dynamic DNS update requests. In this case, the key specified is not an HMACMD5 key.
-K tlskeyfile

This option sets the key file for authenticated encryption for the DNS-over-TLS (DoT) transport with the remote
server. The private key file is expected to be in PEM format. This option implies -S, and can only be used with
-E.
-l

This option sets local-host only mode, which sets the server address to localhost (disabling the server so that the
server address cannot be overridden). Connections to the local server use a TSIG key found in /run/session.
key, which is automatically generated by named if any local primary zone has set update-policy to local.
The location of this key file can be overridden with the -k option.
-L level

This option sets the logging debug level. If zero, logging is disabled.
-o

This option is deprecated. Previously, it enabled a non-standards-compliant variant of GSS-TSIG that was used by
Windows 2000. Since that OS is now long past its end of life, this option is now treated as a synonym for -g .
-O

This option enables Opportunistic TLS. When used, the remote peer’s TLS certificate will not be verified. This
option should be used for debugging purposes only, and it is not recommended to use it in production. This option
can not be used in conjuction with -A, and it implies -S.

This option sets the port to use for connections to a name server. The default is 53.

-P

This option prints the list of private BIND-specific resource record types whose format is understood by nsupdate.
See also the -T option.
-r udpretries

This option sets the number of UDP retries. The default is 3. If zero, only one update request is made.
-S

This option indicates whether to use DNS-over-TLS (DoT) when querying name servers specified by server
servername port syntax in the input file, and the primary server discovered through a SOA request. When the
-K and -E options are used, then the specified TLS client certificate and private key pair are used for authentication
(Mutual TLS). This option implies -v .
-t timeout

This option sets the maximum time an update request can take before it is aborted. The default is 300 seconds.
If zero, the timeout is disabled for TCP mode. For UDP mode, the option -u takes precedence over this option,
unless the option -u is set to zero, in which case the interval is computed from the -t timeout interval and the
number of UDP retries. For UDP mode, the timeout can not be disabled, and will be rounded up to 1 second in
case if both -t and -u are set to zero.
-T

This option prints the list of IANA standard resource record types whose format is understood by nsupdate.
nsupdate exits after the lists are printed. The -T option can be combined with the -P option.

Other types can be entered using TYPEXXXXX where XXXXX is the decimal value of the type with no leading
zeros. The rdata, if present, is parsed using the UNKNOWN rdata format, (<backslash> <hash> <space> <length>
<space> <hexstring>).
-u udptimeout

This option sets the UDP retry interval. The default is 3 seconds. If zero, the interval is computed from the timeout
interval and number of UDP retries.

This option specifies that TCP should be used even for small update requests. By default, nsupdate uses UDP
to send update requests to the name server unless they are too large to fit in a UDP request, in which case TCP is
used. TCP may be preferable when a batch of update requests is made.

This option prints the version number and exits.
-y [hmac:]keyname:secret

This option sets the literal TSIG authentication key. keyname is the name of the key, and secret is the base64
encoded shared secret. hmac is the name of the key algorithm; valid choices are hmac-md5, hmac-sha1,
hmac-sha224, hmac-sha256, hmac-sha384, or hmac-sha512. If hmac is not specified, the default is
hmac-md5, or if MD5 was disabled, hmac-sha256.
NOTE: Use of the -y option is discouraged because the shared secret is supplied as a command-line argument in
clear text. This may be visible in the output from ps1 or in a history file maintained by the user’s shell.

#### 16.29.4 Input Format
nsupdate reads input from filename or standard input. Each command is supplied on exactly one line of input. Some

commands are for administrative purposes; others are either update instructions or prerequisite checks on the contents of
the zone. These checks set conditions that some name or set of resource records (RRset) either exists or is absent from
the zone. These conditions must be met if the entire update request is to succeed. Updates are rejected if the tests for the
prerequisite conditions fail.

16.29. nsupdate - dynamic DNS update utility

Every update request consists of zero or more prerequisites and zero or more updates. This allows a suitably authenticated
update request to proceed if some specified resource records are either present or missing from the zone. A blank input
line (or the send command) causes the accumulated commands to be sent as one Dynamic DNS update request to the
The command formats and their meanings are as follows:
server servername port

This command sends all dynamic update requests to the name server servername. When no server statement is
provided, nsupdate sends updates to the primary server of the correct zone. The MNAME field of that zone’s
SOA record identify the primary server for that zone. port is the port number on servername where the dynamic
update requests are sent. If no port number is specified, the default DNS port number of 53 is used.
This command has no effect when GSS-TSIG is in use.
local address port

This command sends all dynamic update requests using the local address. When no local statement is provided,
nsupdate sends updates using an address and port chosen by the system. port can also be used to force requests
to come from a specific port. If no port number is specified, the system assigns one.
zone zonename

This command specifies that all updates are to be made to the zone zonename. If no zone statement is provided,
nsupdate attempts to determine the correct zone to update based on the rest of the input.
class classname

This command specifies the default class. If no class is specified, the default class is IN.
ttl seconds

This command specifies the default time-to-live, in seconds, for records to be added. The value none clears the
default TTL.
key hmac:keyname secret

This command specifies that all updates are to be TSIG-signed using the keyname-secret pair. If hmac is
specified, it sets the signing algorithm in use. The default is hmac-md5; if MD5 was disabled, the default is
hmac-sha256. The key command overrides any key specified on the command line via -y or -k.
gsstsig

This command uses GSS-TSIG to sign the updates. This is equivalent to specifying -g on the command line.
oldgsstsig

This command is deprecated and will be removed in a future release. Previously, it caused nsupdate to use the
Windows 2000 version of GSS-TSIG to sign updates. It is now treated as a synonym for gsstsig.
realm [realm_name]

When using GSS-TSIG, this command specifies the use of realm_name rather than the default realm in krb5.
conf. If no realm is specified, the saved realm is cleared.
check-names [boolean]

This command turns on or off check-names processing on records to be added. Check-names has no effect on
prerequisites or records to be deleted. By default check-names processing is on. If check-names processing fails,
the record is not added to the UPDATE message.
check-svbc [boolean]

This command turns on or off check-svcb processing on records to be added. Check-svcb has no effect on prerequisites or records to be deleted. By default check-svcb processing is on. If check-svcb processing fails, the record
is not added to the UPDATE message.

lease time [keytime]

Set the EDNS Update Lease (UL) option to value to time and optionally also set the key lease time to keytime
in seconds. If time is none the lease times are cleared.
prereq nxdomain domain-name

This command requires that no resource record of any type exist with the name domain-name.
prereq yxdomain domain-name
This command requires that domain-name exist (as at least one resource record, of any type).
prereq nxrrset domain-name class type

This command requires that no resource record exist of the specified type, class, and domain-name. If class
is omitted, IN (Internet) is assumed.
prereq yxrrset domain-name class type

This command requires that a resource record of the specified type, class and domain-name exist. If class
is omitted, IN (internet) is assumed.
prereq yxrrset domain-name class type data
With this command, the data from each set of prerequisites of this form sharing a common type, class, and
domain-name are combined to form a set of RRs. This set of RRs must exactly match the set of RRs existing in
the zone at the given type, class, and domain-name. The data are written in the standard text representation

of the resource record’s RDATA.
update delete domain-name ttl class type data
This command deletes any resource records named domain-name. If type and data are provided, only matching
resource records are removed. The Internet class is assumed if class is not supplied. The ttl is ignored, and is

only allowed for compatibility.
update add domain-name ttl class type data

This command adds a new resource record with the specified ttl, class, and data.
show

This command displays the current message, containing all of the prerequisites and updates specified since the last
send.
send

This command sends the current message. This is equivalent to entering a blank line.
answer

This command displays the answer.
debug

This command turns on debugging.

This command prints the version number.
help

This command prints a list of commands.
Lines beginning with a semicolon (;) are comments and are ignored.

#### 16.29.5 Examples
The examples below show how nsupdate can be used to insert and delete resource records from the example.com
zone. Notice that the input in each example contains a trailing blank line, so that a group of commands is sent as one
dynamic update request to the primary name server for example.com.

16.29. nsupdate - dynamic DNS update utility

> update delete oldhost.example.com A
> update add newhost.example.com 86400 A 172.16.1.1
> send

Any A records for oldhost.example.com are deleted, and an A record for newhost.example.com with IP address
172.16.1.1 is added. The newly added record has a TTL of 1 day (86400 seconds).
> prereq nxdomain nickname.example.com
> update add nickname.example.com 86400 CNAME somehost.example.com
> send

The prerequisite condition tells the name server to verify that there are no resource records of any type for nickname.
example.com. If there are, the update request fails. If this name does not exist, a CNAME for it is added. This ensures
that when the CNAME is added, it cannot conflict with the long-standing rule in RFC 1034 that a name must not exist as
any other record type if it exists as a CNAME. (The rule has been updated for DNSSEC in RFC 2535 to allow CNAMEs
to have RRSIG, DNSKEY, and NSEC records.)

#### 16.29.6 Files

Used to identify the default name server
/run/session.key

Sets the default TSIG key for use in local-only mode
K{name}.+157.+{random}.key

Base-64 encoding of the HMAC-MD5 key created by dnssec-keygen.
K{name}.+157.+{random}.private

Base-64 encoding of the HMAC-MD5 key created by dnssec-keygen.

#### 16.29.7 See Also
RFC 2136, RFC 3007, RFC 2104, RFC 2845, RFC 1034, RFC 2535, RFC 2931, named(8), dnssec-keygen(8),
tsig-keygen(8).

#### 16.29.8 Bugs
The TSIG key is redundantly stored in two separate files. This is a consequence of nsupdate using the DST library for
its cryptographic operations, and may change in future releases.

16.30 rndc-confgen - rndc key generation tool
16.30.1 Synopsis
rndc-confgen [-a] [-A algorithm] [-b keysize] [-c keyfile] [-h] [-k keyname] [-p port] [-s address] [-t chrootdir] [-u

user]

#### 16.30.2 Description
rndc-confgen generates configuration files for rndc. It can be used as a convenient alternative to writing the rndc.
conf file and the corresponding controls and key statements in named.conf by hand. Alternatively, it can be run with
the -a option to set up a rndc.key file and avoid the need for a rndc.conf file and a controls statement altogether.

#### 16.30.3 Options

This option sets automatic rndc configuration, which creates a file /etc/rndc.key that is read by both rndc and
named on startup. The rndc.key file defines a default command channel and authentication key allowing rndc
to communicate with named on the local host with no further configuration.
If a more elaborate configuration than that generated by rndc-confgen -a is required, for example if rndc is to be
used remotely, run rndc-confgen without the -a option and set up rndc.conf and named.conf as directed.
-A algorithm

This option specifies the algorithm to use for the TSIG key. Available choices are: hmac-md5, hmac-sha1, hmacsha224, hmac-sha256, hmac-sha384, and hmac-sha512. The default is hmac-sha256.
-b keysize

This option specifies the size of the authentication key in bits. The size must be between 1 and 512 bits; the default
is the hash size.
-c keyfile

This option is used with the -a option to specify an alternate location for rndc.key.

This option prints a short summary of the options and arguments to rndc-confgen.
-k keyname

This option specifies the key name of the rndc authentication key. This must be a valid domain name. The default
is rndc-key.

This option specifies the command channel port where named listens for connections from rndc. The default is
953.

This option prevets printing the written path in automatic configuration mode.
-s address

This option specifies the IP address where named listens for command-channel connections from rndc. The default
is the loopback address 127.0.0.1.
-t chrootdir

This option is used with the -a option to specify a directory where named runs chrooted. An additional copy of
the rndc.key is written relative to this directory, so that it is found by the chrooted named.
-u user

This option is used with the -a option to set the owner of the generated rndc.key file. If -t is also specified, only
the file in the chroot area has its owner changed.

16.30. rndc-confgen - rndc key generation tool

#### 16.30.4 Examples
To allow rndc to be used with no manual configuration, run:
rndc-confgen -a

To print a sample rndc.conf file and the corresponding controls and key statements to be manually inserted into
named.conf , run:
rndc-confgen

#### 16.30.5 See Also
rndc(8), rndc.conf(5), named(8), BIND 9 Administrator Reference Manual.

16.31 rndc.conf - rndc configuration file
16.31.1 Synopsis
rndc.conf

#### 16.31.2 Description
rndc.conf is the configuration file for rndc, the BIND 9 name server control utility. This file has a similar structure and
syntax to named.conf . Statements are enclosed in braces and terminated with a semi-colon. Clauses in the statements

are also semi-colon terminated. The usual comment styles are supported:
C style: /* */
C++ style: // to end of line
Unix style: # to end of line
rndc.conf is much simpler than named.conf . The file uses three statements: an options statement, a server statement,

and a key statement.
The options statement contains five clauses. The default-server clause is followed by the name or address of a
name server. This host is used when no name server is given as an argument to rndc. The default-key clause is
followed by the name of a key, which is identified by a key statement. If no keyid is provided on the rndc command
line, and no key clause is found in a matching server statement, this default key is used to authenticate the server’s
commands and responses. The default-port clause is followed by the port to connect to on the remote name server.
If no port option is provided on the rndc command line, and no port clause is found in a matching server statement,
this default port is used to connect. The default-source-address and default-source-address-v6 clauses
can be used to set the IPv4 and IPv6 source addresses respectively.
After the server keyword, the server statement includes a string which is the hostname or address for a name server. The
statement has three possible clauses: key, port, and addresses. The key name must match the name of a key statement
in the file. The port number specifies the port to connect to. If an addresses clause is supplied, these addresses are used
instead of the server name. Each address can take an optional port. If an source-address or source-address-v6
is supplied, it is used to specify the IPv4 and IPv6 source address, respectively.
The key statement begins with an identifying string, the name of the key. The statement has two clauses. algorithm
identifies the authentication algorithm for rndc to use; currently only HMAC-MD5 (for compatibility), HMAC-SHA1,
HMAC-SHA224, HMAC-SHA256 (default), HMAC-SHA384, and HMAC-SHA512 are supported. This is followed by
a secret clause which contains the base-64 encoding of the algorithm’s authentication key. The base-64 string is enclosed
in double quotes.
There are two common ways to generate the base-64 string for the secret. The BIND 9 program rndc-confgen can be
used to generate a random key, or the mmencode program, also known as mimencode, can be used to generate a base-64

string from known input. mmencode does not ship with BIND 9 but is available on many systems. See the Example
section for sample command lines for each.

#### 16.31.3 Example
default-server
default-key

localhost;
samplekey;

server localhost {
samplekey;
server testserver {
testkey;
addresses
{ localhost port 5353; };
key samplekey {

hmac-sha256;
"6FMfj43Osz4lyb24OIe2iGEz9lf1llJO+lz";

key testkey {
hmac-sha256;
"R3HI8P6BKw9ZwXwN3VZKuQ==";

In the above example, rndc by default uses the server at localhost (127.0.0.1) and the key called “samplekey”. Commands
to the localhost server use the “samplekey” key, which must also be defined in the server’s configuration file with the same
name and secret. The key statement indicates that “samplekey” uses the HMAC-SHA256 algorithm and its secret clause
contains the base-64 encoding of the HMAC-SHA256 secret enclosed in double quotes.
If rndc -s testserver is used, then rndc connects to the server on localhost port 5353 using the key “testkey”.
To generate a random secret with rndc-confgen:
rndc-confgen

A complete rndc.conf file, including the randomly generated key, is written to the standard output. Commented-out
key and controls statements for named.conf are also printed.
To generate a base-64 secret with mmencode:
echo "known plaintext for a secret" | mmencode

#### 16.31.4 Name Server Configuration
The name server must be configured to accept rndc connections and to recognize the key specified in the rndc.conf file,
using the controls statement in named.conf . See the sections on the controls statement in the BIND 9 Administrator
Reference Manual for details.

16.31. rndc.conf - rndc configuration file

#### 16.31.5 See Also
rndc(8), rndc-confgen(8), mmencode(1), BIND 9 Administrator Reference Manual.

16.32 rndc - name server control utility
16.32.1 Synopsis
rndc [-b source-address] [-c config-file] [-k key-file] [-s server] [-p port] [-q] [-r] [-V] [-y server_key] [[-4] | [-6]]
{command}

#### 16.32.2 Description
rndc controls the operation of a name server. If rndc is invoked with no command line options or arguments, it prints
a short summary of the supported commands and the available options and their arguments.
rndc communicates with the name server over a TCP connection, sending commands authenticated with digital signatures. In the current versions of rndc and named, the only supported authentication algorithms are HMAC-MD5 (for

compatibility), HMAC-SHA1, HMAC-SHA224, HMAC-SHA256 (default), HMAC-SHA384, and HMAC-SHA512.
They use a shared secret on each end of the connection, which provides TSIG-style authentication for the command request and the name server’s response. All commands sent over the channel must be signed by a server_key known to the
rndc reads a configuration file to determine how to contact the name server and decide what algorithm and key it should

use.

#### 16.32.3 Options

This option indicates use of IPv4 only.

This option indicates use of IPv6 only.
-b source-address

This option indicates source-address as the source address for the connection to the server. Multiple instances
are permitted, to allow setting of both the IPv4 and IPv6 source addresses.
-c config-file

This option indicates config-file as the configuration file instead of the default, /etc/rndc.conf.
-k key-file

This option indicates key-file as the key file instead of the default, /etc/rndc.key. The key in /etc/rndc.
key is used to authenticate commands sent to the server if the config-file does not exist.
-s server
server is the name or address of the server which matches a server statement in the configuration file for rndc.
If no server is supplied on the command line, the host named by the default-server clause in the options statement
of the rndc configuration file is used.

This option instructs BIND 9 to send commands to TCP port port instead of its default control channel port, 953.

This option sets quiet mode, where message text returned by the server is not printed unless there is an error.

This option instructs rndc to print the result code returned by named after executing the requested command (e.g.,
ISC_R_SUCCESS, ISC_R_FAILURE, etc.).
-t timeout

This option sets the idle timeout period for rndc to timeout seconds. The default is 60 seconds, and the maximum
settable value is 86400 seconds (1 day). If set to 0, there is no timeout.

This option enables verbose logging.
-y server_key

This option indicates use of the key server_key from the configuration file. For control message validation to
succeed, server_key must be known by named with the same algorithm and secret string. If no server_key is
specified, rndc first looks for a key clause in the server statement of the server being used, or if no server statement is
present for that host, then in the default-key clause of the options statement. Note that the configuration file contains
shared secrets which are used to send authenticated control commands to name servers, and should therefore not
have general read or write access.

#### 16.32.4 Commands
A list of commands supported by rndc can be seen by running rndc without arguments.
Currently supported commands are:
addzone zone [class [view]] configuration

This command adds a zone while the server is running. This command requires the allow-new-zones option
to be set to yes. The configuration string specified on the command line is the zone configuration text that would
ordinarily be placed in named.conf .
The configuration is saved in a file called viewname.nzf (or, if named is compiled with liblmdb, an LMDB
database file called viewname.nzd). viewname is the name of the view, unless the view name contains characters
that are incompatible with use as a file name, in which case a cryptographic hash of the view name is used instead.
When named is restarted, the file is loaded into the view configuration so that zones that were added can persist
after a restart.
This sample addzone command adds the zone example.com to the default view:
rndc addzone example.com '{ type primary; file "example.com.db"; };'

(Note the brackets around and semi-colon after the zone configuration text.)
See also rndc delzone and rndc modzone.
closelogs

This command closes currently open log files. It is intended to be used by external log rotation tools following this
proceedure.
1) rename the log files
2) run rndc closelogs
3) optionally compress the log files
delzone [-clean] zone [class [view]]

This command deletes a zone while the server is running.
If the -clean argument is specified, the zone’s master file (and journal file, if any) are deleted along with the zone.
Without the -clean option, zone files must be deleted manually. (If the zone is of type secondary or stub, the
files needing to be removed are reported in the output of the rndc delzone command.)

If the zone was originally added via rndc addzone, then it is removed permanently. However, if it was originally configured in named.conf , then that original configuration remains in place; when the server is restarted or
reconfigured, the zone is recreated. To remove it permanently, it must also be removed from named.conf .
See also rndc addzone and rndc modzone.
dnssec (-status | -rollover -key id [-alg algorithm] [-when time] | -checkds [-key id [-alg algorithm]] [-when time]
lished | withdrawn)) zone [class [view]]

pub-

This command allows you to interact with the “dnssec-policy” of a given zone.
rndc dnssec -status show the DNSSEC signing state for the specified zone.
rndc dnssec -rollover allows you to schedule key rollover for a specific key (overriding the original key

lifetime).
rndc dnssec -checkds informs named that the DS for a specified zone’s key-signing key has been confirmed

to be published in, or withdrawn from, the parent zone. This is required in order to complete a KSK rollover. The
-key id and -alg algorithm arguments can be used to specify a particular KSK, if necessary; if there is only
one key acting as a KSK for the zone, these arguments can be omitted. The time of publication or withdrawal
for the DS is set to the current time by default, but can be overridden to a specific time with the argument -when
time, where time is expressed in YYYYMMDDHHMMSS notation.
dnstap (-reopen | -roll [number])

This command closes and re-opens DNSTAP output files.
rndc dnstap -reopen allows the output file to be renamed externally, so that named can truncate and re-open

it.
rndc dnstap -roll causes the output file to be rolled automatically, similar to log files. The most recent output
file has “.0” appended to its name; the previous most recent output file is moved to “.1”, and so on. If number is

specified, then the number of backup log files is limited to that number.
dumpdb [-all | -cache | -zones | -adb | -bad | -expired | -fail] [view ...]

This command dumps the server’s caches (default) and/or zones to the dump file for the specified views. If no view
is specified, all views are dumped. (See the dump-file option in the BIND 9 Administrator Reference Manual.)
fetchlimit [view]

This command dumps a list of servers that are currently being rate-limited as a result of fetches-per-server
settings, and a list of domain names that are currently being rate-limited as a result of fetches-per-zone settings.
flush

This command flushes the server’s cache.
flushname name [view]

This command flushes the given name from the view’s DNS cache and, if applicable, from the view’s nameserver
address database, bad server cache, and SERVFAIL cache.
flushtree name [view]

This command flushes the given name, and all of its subdomains, from the view’s DNS cache, address database,
bad server cache, and SERVFAIL cache.
freeze [zone [class [view]]]

This command suspends updates to a dynamic zone. If no zone is specified, then all zones are suspended. This
allows manual edits to be made to a zone normally updated by dynamic update, and causes changes in the journal
file to be synced into the master file. All dynamic update attempts are refused while the zone is frozen.
See also rndc thaw .

halt [-p]

This command stops the server immediately. Recent changes made through dynamic update or IXFR are not saved
to the master files, but are rolled forward from the journal files when the server is restarted. If -p is specified,
named ’s process ID is returned. This allows an external process to determine when named has completed halting.
See also rndc stop.
skr -import file zone [class [view]]

This command allows you to import a SKR file for the specified zone, to support offline KSK signing.
loadkeys [zone [class [view]]]

This command fetches all DNSSEC keys for the given zone from the key directory. If they are within their publication period, they are merged into the zone’s DNSKEY RRset. Unlike rndc sign, however, the zone is not
immediately re-signed by the new keys, but is allowed to incrementally re-sign over time.
This command requires that the zone be configured with a dnssec-policy, and also requires the zone to be
configured to allow dynamic DNS. (See “Dynamic Update Policies” in the Administrator Reference Manual for
more details.)
managed-keys (status | refresh | sync | destroy) [class [view]]

This command inspects and controls the “managed-keys” database which handles RFC 5011 DNSSEC trust anchor
maintenance. If a view is specified, these commands are applied to that view; otherwise, they are applied to all
views.
- When run with the status keyword, this prints the current status of the managed-keys database.
- When run with the refresh keyword, this forces an immediate refresh query to be sent for all the managed
keys, updating the managed-keys database if any new keys are found, without waiting the normal refresh
interval.
- When run with the sync keyword, this forces an immediate dump of the managed-keys database to disk (in
the file managed-keys.bind or (viewname.mkeys). This synchronizes the database with its journal file,
so that the database’s current contents can be inspected visually.
- When run with the destroy keyword, the managed-keys database is shut down and deleted, and all key
maintenance is terminated. This command should be used only with extreme caution.
Existing keys that are already trusted are not deleted from memory; DNSSEC validation can continue after
this command is used. However, key maintenance operations cease until named is restarted or reconfigured,
and all existing key maintenance states are deleted.
Running rndc reconfig or restarting named immediately after this command causes key maintenance
to be reinitialized from scratch, just as if the server were being started for the first time. This is primarily
intended for testing, but it may also be used, for example, to jumpstart the acquisition of new keys in the
event of a trust anchor rollover, or as a brute-force repair for key maintenance problems.
memprof [(on | off | dump)]

This command controls memory profiling. To have any effect, named must be built with jemalloc, the library
have profiling support enabled and run with the prof:true allocator configuration. (either via MALLOC_CONF or
/etc/malloc.conf)
The prof_active:false option is recommended to ensure the profiling overhead does not affect named when
not needed.
The on and off options will start and stop the jemalloc memory profiling respectively. When run with the dump
option, named will dump the profile to the working directory. The name will be chosen automatically by jemalloc.
modzone zone [class [view]] configuration

This command modifies the configuration of a zone while the server is running. This command requires the

allow-new-zones option to be set to yes. As with addzone, the configuration string specified on the command line is the zone configuration text that would ordinarily be placed in named.conf .

If the zone was originally added via rndc addzone, the configuration changes are recorded permanently and are
still in effect after the server is restarted or reconfigured. However, if it was originally configured in named.conf ,
then that original configuration remains in place; when the server is restarted or reconfigured, the zone reverts to
its original configuration. To make the changes permanent, it must also be modified in named.conf .
See also rndc addzone and rndc delzone.
notify zone [class [view]]

This command resends NOTIFY messages for the zone.
notrace

This command sets the server’s debugging level to 0.
See also rndc trace.
nta [(-class class | -dump | -force | -remove | -lifetime duration)] domain [view]

This command sets a DNSSEC negative trust anchor (NTA) for domain, with a lifetime of duration. The default
lifetime is configured in named.conf via the nta-lifetime option, and defaults to one hour. The lifetime cannot
exceed one week.
A negative trust anchor selectively disables DNSSEC validation for zones that are known to be failing because of
misconfiguration rather than an attack. When data to be validated is at or below an active NTA (and above any
other configured trust anchors), named aborts the DNSSEC validation process and treats the data as insecure rather
than bogus. This continues until the NTA’s lifetime has elapsed.
NTAs persist across restarts of the named server. The NTAs for a view are saved in a file called name.nta, where
name is the name of the view; if it contains characters that are incompatible with use as a file name, a cryptographic
hash is generated from the name of the view.
An existing NTA can be removed by using the -remove option.
An NTA’s lifetime can be specified with the -lifetime option. TTL-style suffixes can be used to specify the
lifetime in seconds, minutes, or hours. If the specified NTA already exists, its lifetime is updated to the new value.
Setting lifetime to zero is equivalent to -remove.
If -dump is used, any other arguments are ignored and a list of existing NTAs is printed. Note that this may include
NTAs that are expired but have not yet been cleaned up.
Normally, named periodically tests to see whether data below an NTA can now be validated (see the nta-recheck
option in the Administrator Reference Manual for details). If data can be validated, then the NTA is regarded as
no longer necessary and is allowed to expire early. The -force parameter overrides this behavior and forces an
NTA to persist for its entire lifetime, regardless of whether data could be validated if the NTA were not present.
The view class can be specified with -class. The default is class IN, which is the only class for which DNSSEC
is currently supported.
All of these options can be shortened, i.e., to -l, -r, -d, -f, and -c.
Unrecognized options are treated as errors. To refer to a domain or view name that begins with a hyphen, use a
double-hyphen (–) on the command line to indicate the end of options.
querylog [(on | off)]

This command enables or disables query logging. For backward compatibility, this command can also be used
without an argument to toggle query logging on and off.
Query logging can also be enabled by explicitly directing the queries category to a channel in the logging
section of named.conf , or by specifying querylog yes; in the options section of named.conf .

reconfig

This command reloads the configuration file and loads new zones, but does not reload existing zone files even if
they have changed. This is faster than a full rndc reload when there is a large number of zones, because it avoids
the need to examine the modification times of the zone files.
recursing

This command dumps the list of queries named is currently recursing on, and the list of domains to which iterative
queries are currently being sent.
The first list includes all unique clients that are waiting for recursion to complete, including the query that is awaiting
a response, the timestamp (seconds since the Unix epoch) of when named started processing this client query, the
client’s address, and the transport over which the the query was received (UDP, TCP, TLS, or HTTP).
The second list comprises of domains for which there are active (or recently active) fetches in progress. It reports
the number of active fetches for each domain and the number of queries that have been passed (allowed) or dropped
(spilled) as a result of the fetches-per-zone limit. (Note: these counters are not cumulative over time; whenever
the number of active fetches for a domain drops to zero, the counter for that domain is deleted, and the next time
a fetch is sent to that domain, it is recreated with the counters set to zero).
refresh zone [class [view]]

This command schedules zone maintenance for the given zone.
reload

This command reloads the configuration file and zones.
zone [class [view]]

If a zone is specified, this command reloads only the given zone. If no zone is specified, the reloading happens
asynchronously.
responselog [on | off]

This command enables or disables response logging. For backward compatibility, this command can also be used
without an argument to toggle response logging on and off.
Unlike query logging, response logging cannot be enabled by explicitly directing the responses category to a
channel in the logging section of named.conf , but it can still be enabled by specifying responselog yes;
in the options section of named.conf .
retransfer [-force] zone [class [view]]

This command retransfers the given secondary zone from the primary server.
If the zone is configured to use inline-signing, the signed version of the zone is discarded; after the retransfer of
the unsigned version is complete, the signed version is regenerated with new signatures. With the optional -force
argument provided if there is an ongoing zone transfer it will be aborted before a new zone transfer is scheduled.
scan

This command scans the list of available network interfaces for changes, without performing a full rndc reconfig
or waiting for the interface-interval timer.
secroots [-] [view ...]

This command dumps the security roots (i.e., trust anchors configured via trust-anchors statement, or
dnssec-validation auto) and negative trust anchors for the specified views. If no view is specified, all views
are dumped. Security roots indicate whether they are configured as trusted keys, managed keys, or initializing
managed keys (managed keys that have not yet been updated by a successful key refresh query).
If the first argument is -, then the output is returned via the rndc response channel and printed to the standard output. Otherwise, it is written to the secroots dump file, which defaults to named.secroots, but can be overridden
via the secroots-file option in named.conf .
See also rndc managed-keys.

serve-stale (on | off | reset | status) [class [view]]

This command enables, disables, resets, or reports the current status of the serving of stale answers as configured
in named.conf .
If serving of stale answers is disabled by rndc-serve-stale off, then it remains disabled even if named is
reloaded or reconfigured. rndc serve-stale reset restores the setting as configured in named.conf .
rndc serve-stale status reports whether caching and serving of stale answers is currently enabled or disabled. It also reports the values of stale-answer-ttl and max-stale-ttl.
showzone zone [class [view]]

This command prints the configuration of a running zone.
See also rndc zonestatus.
sign zone [class [view]]

This command fetches all DNSSEC keys for the given zone from the key directory (see the key-directory option
in the BIND 9 Administrator Reference Manual). If they are within their publication period, they are merged into
the zone’s DNSKEY RRset. If the DNSKEY RRset is changed, then the zone is automatically re-signed with the
new key set.
This command requires that the zone be configured with a dnssec-policy, and also requires the zone to be
configured to allow dynamic DNS. (See “Dynamic Update Policies” in the Administrator Reference Manual for
more details.)
See also rndc loadkeys.
signing [(-list | -clear keyid/algorithm | -clear all | -nsec3param (parameters | none) | -serial value) zone [class [view]]

This command lists, edits, or removes the DNSSEC signing-state records for the specified zone. The status of
ongoing DNSSEC operations, such as signing or generating NSEC3 chains, is stored in the zone in the form of
DNS resource records of type sig-signing-type. rndc signing -list converts these records into a humanreadable form, indicating which keys are currently signing or have finished signing the zone, and which NSEC3
chains are being created or removed.
rndc signing -clear can remove a single key (specified in the same format that rndc signing -list uses

to display it), or all keys. In either case, only completed keys are removed; any record indicating that a key has not
yet finished signing the zone is retained.
rndc signing -nsec3param sets the NSEC3 parameters for a zone. This is the only supported mechanism for
using NSEC3 with inline-signing zones. Parameters are specified in the same format as an NSEC3PARAM
resource record: hash algorithm, flags, iterations, and salt, in that order.

Currently, the only defined value for hash algorithm is 1, representing SHA-1. The flags may be set to 0 or
1, depending on whether the opt-out bit in the NSEC3 chain should be set. iterations defines the number of
additional times to apply the algorithm when generating an NSEC3 hash. The salt is a string of data expressed in
hexadecimal, a hyphen (-) if no salt is to be used, or the keyword auto, which causes named to generate a random
64-bit salt.
The only recommended configuration is rndc signing -nsec3param 1 0 0 - zone, i.e. no salt, no additional
iterations, no opt-out.
Do not use extra iterations, salt, or opt-out unless all their implications are fully understood. A higher number
of iterations causes interoperability problems and opens servers to CPU-exhausting DoS attacks.
rndc signing -nsec3param none removes an existing NSEC3 chain and replaces it with NSEC.

rndc signing -serial value sets the serial number of the zone to value. If the value would cause the serial
number to go backwards, it is rejected. The primary use of this parameter is to set the serial number on inline
signed zones.
stats

This command writes server statistics to the statistics file. (See the statistics-file option in the BIND 9
Administrator Reference Manual.)
status

This command displays the status of the server. Note that the number of zones includes the internal bind/CH zone
and the default ./IN hint zone, if there is no explicit root zone configured.
stop -p

This command stops the server, making sure any recent changes made through dynamic update or IXFR are first
saved to the master files of the updated zones. If -p is specified, named’s process ID is returned. This allows an
external process to determine when named has completed stopping.
See also rndc halt.
sync -clean [zone [class [view]]]

This command syncs changes in the journal file for a dynamic zone to the master file. If the “-clean” option is
specified, the journal file is also removed. If no zone is specified, then all zones are synced.
tcp-timeouts [initial idle keepalive advertised]

When called without arguments, this command displays the current values of the tcp-initial-timeout,
tcp-idle-timeout, tcp-keepalive-timeout, and tcp-advertised-timeout options. When called
with arguments, these values are updated. This allows an administrator to make rapid adjustments when under
a denial-of-service (DoS) attack. See the descriptions of these options in the BIND 9 Administrator Reference
Manual for details of their use.
thaw [zone [class [view]]]

This command enables updates to a frozen dynamic zone. If no zone is specified, then all frozen zones are enabled. This causes the server to reload the zone from disk, and re-enables dynamic updates after the load has
completed. After a zone is thawed, dynamic updates are no longer refused. If the zone has changed and the
ixfr-from-differences option is in use, the journal file is updated to reflect changes in the zone. Otherwise, if the zone has changed, any existing journal file is removed. If no zone is specified, the reloading happens
asynchronously.
See also rndc freeze.
trace [level]

If no level is specified, this command increments the server’s debugging level by one.
level

If specified, this command sets the server’s debugging level to the provided value.
See also rndc notrace.
validation (on | off | status) [view ...]

This command enables, disables, or checks the current status of DNSSEC validation. By default, validation is
enabled.
The cache is flushed when validation is turned on or off to avoid using data that might differ between states.
zonestatus zone [class [view]]

This command displays the current status of the given zone, including the master file name and any include files from
which it was loaded, when it was most recently loaded, the current serial number, the number of nodes, whether
the zone supports dynamic updates, whether the zone is DNSSEC signed, whether it uses automatic DNSSEC key
management or inline signing, and the scheduled refresh or expiry times for the zone.

See also rndc showzone.
rndc commands that specify zone names, such as reload retransfer, or zonestatus, can be ambiguous when
applied to zones of type redirect. Redirect zones are always called ., and can be confused with zones of type hint
or with secondary copies of the root zone. To specify a redirect zone, use the special zone name -redirect, without a

trailing period. (With a trailing period, this would specify a zone called “-redirect”.)

#### 16.32.5 Limitations
There is currently no way to provide the shared secret for a server_key without using the configuration file.
Several error messages could be clearer.

#### 16.32.6 See Also
rndc.conf(5), rndc-confgen(8), named(8), named.conf(5), BIND 9 Administrator Reference Manual.

16.33 tsig-keygen - TSIG key generation tool
16.33.1 Synopsis
tsig-keygen [-a algorithm] [-h] [name]

#### 16.33.2 Description
tsig-keygen is an utility that generates keys for use with TSIG (Transaction Signatures) as defined in RFC 2845. The
resulting keys can be used, for example, to secure dynamic DNS updates to a zone, or for the rndc command channel.

A domain name can be specified on the command line to be used as the name of the generated key. If no name is specified,
the default is tsig-key.

#### 16.33.3 Options

This option specifies the algorithm to use for the TSIG key. Available choices are: hmac-md5, hmac-sha1, hmacsha224, hmac-sha256, hmac-sha384, and hmac-sha512. The default is hmac-sha256. Options are case-insensitive,
and the “hmac-” prefix may be omitted.

This option prints a short summary of options and arguments.

#### 16.33.4 See Also
nsupdate(1), named.conf(5), named(8), BIND 9 Administrator Reference Manual.
