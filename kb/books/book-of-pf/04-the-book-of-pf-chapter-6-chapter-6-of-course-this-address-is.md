---
id: book-of-pf-04
title: "The Book of PF — Chapter 6, Chapter 6, Of course, this address is totally bogus.…",
slug: book-of-pf-04-the-book-of-pf-chapter-6-chapter-6-of-course-this-address-is
source: "The Book of PF, 3rd Edition",
sourceSection: "106. Chapter 6, 108. Chapter 6, 6. Of course, this address is totally bogus. It looks like the kind of message ID the GNUS, 110. Chapter 6, 112. Chapter 6, 114. Chapter 6, 118. Chapter 7, 120. Chapter 7, 122. Chapter 7, 124. Chapter 7, 126. Chapter 7, 130. Chapter 7, 134. Chapter 7, 136. Chapter 7"
track: bsd-internals,
tier: premium
tags: [firewall, pf, networking, security]
summary: "The colon-separated list 2:4:864 represents the values passtime, greyexp, Covers 14 sections: Chapter 6, Chapter 6, Of course, this address is totally bogus. It looks like the kind of message ID the GNUS.",
---
# The Book of PF — Chapter 6, Chapter 6, Of course, this address is totally bogus.…

## 106. Chapter 6

The colon-separated list 2:4:864 represents the values passtime, greyexp,
and whiteexp:

passtime denotes the minimum number of minutes spamd considers a
reasonable time before retry. The default is 25 minutes, but here we’ve
reduced it to 2 minutes.
greyexp is the number of hours an entry stays in the greylisted state
before it’s removed from the database.
whiteexp determines the number of hours a whitelisted entry is kept.
The default values for greyexp and whiteexp are 4 hours and 864 hours
(just over 1 month), respectively.

Greylisting in Practice
Users and administrators at sites that implement greylisting tend to agree
that greylisting gets rid of most of their spam, with a significant drop in the
load on any content filtering they have in place for their mail. We’ll start by
looking at what spamd’s greylisting looks like according to log files and then
return with some data.
If you start spamd with the -v command-line option for verbose logging,
your logs will include a few more items of information in addition to IP
addresses. With verbose logging, a typical log excerpt looks like this:
Oct 2 19:53:21 delilah spamd[26905]: 65.210.185.131: connected (1/1), lists: spews1
Oct 2 19:55:04 delilah spamd[26905]: 83.23.213.115: connected (2/1)
Oct 2 19:55:05 delilah spamd[26905]: (GREY) 83.23.213.115: <gilbert@keyholes.net> ->
Oct 2 19:55:05 delilah spamd[26905]: 83.23.213.115: disconnected after 0 seconds.
Oct 2 19:55:05 delilah spamd[26905]: 83.23.213.115: connected (2/1)
Oct 2 19:55:06 delilah spamd[26905]: (GREY) 83.23.213.115: <gilbert@keyholes.net> ->
Oct 2 19:55:06 delilah spamd[26905]: 83.23.213.115: disconnected after 1 seconds.
Oct 2 19:57:07 delilah spamd[26905]: (BLACK) 65.210.185.131: <bounce-3C7E40A4B3@branch15.
summer-bargainz.com> -> <adm@dataped.no>
Oct 2 19:58:50 delilah spamd[26905]: 65.210.185.131: From: Auto lnsurance Savings <noreply@
branch15.summer-bargainz.com>
Oct 2 19:58:50 delilah spamd[26905]: 65.210.185.131: Subject: Start SAVlNG M0NEY on Auto
lnsurance
Oct 2 19:58:50 delilah spamd[26905]: 65.210.185.131: To: adm@dataped.no
Oct 2 20:00:05 delilah spamd[26905]: 65.210.185.131: disconnected after 404 seconds. lists:
spews1
Oct 2 20:03:48 delilah spamd[26905]: 222.240.6.118: connected (1/0)
Oct 2 20:03:48 delilah spamd[26905]: 222.240.6.118: disconnected after 0 seconds.
Oct 2 20:06:51 delilah spamd[26905]: 24.71.110.10: connected (1/1), lists: spews1
Oct 2 20:07:00 delilah spamd[26905]: 221.196.37.249: connected (2/1)
Oct 2 20:07:00 delilah spamd[26905]: 221.196.37.249: disconnected after 0 seconds.
Oct 2 20:07:12 delilah spamd[26905]: 24.71.110.10: disconnected after 21 seconds. lists:
spews1

Turning the Tables for Proactive Defense   107

The first line is the beginning of a connection from a machine in the
spews1 blacklist. The next six lines show the complete records of two connec-

tion attempts from another machine, which each time connects as the second
active connection. This second machine isn’t yet in any blacklist, so it’s greylisted. Note the rather curious delivery address (wkitp98zpu.fsf@ ­datadok.no)
in the message that the greylisted machine tries to deliver. There’s a useful trick that we’ll look at in “Greytrapping” on page 109. The (GREY) and
(BLACK) before the addresses indicate greylisting or blacklisting status. Then
there’s more activity from the blacklisted host, and a little later we see that
after 404 seconds (or 6 minutes and 44 seconds), the blacklisted host gives
up without completing the delivery.
The remaining lines show a few very short connections, including one
from a machine already on a blacklist. This time, though, the machine disconnects too quickly to see any (BLACK) flag at the beginning of the SMTP
dialogue, but we see a reference to the list name (spews1) at the end.
Roughly 400 seconds is about the amount of time that naive blacklisted
spammers hang around (according to data from various sites) and about
the time it takes (at the rate of 1 byte per second) to complete the EHLO ...
dialogue until spamd rejects the message. However, while peeking at the logs,
you’re likely to find some spammers that hang around significantly longer.
For example, in the data from our office gateway, one log entry stood out:
Dec 11 23:57:24 delilah spamd[32048]: 69.6.40.26: connected (1/1), lists:
spamhaus spews1 spews2
Dec 12 00:30:08 delilah spamd[32048]: 69.6.40.26: disconnected after 1964
seconds. lists: spamhaus spews1 spews2

This particular machine was already on several blacklists when it made
13 attempts at delivery from December 9 through December 12. The last
attempt lasted 32 minutes and 44 seconds, without completing the delivery.
Relatively intelligent spam senders drop the connection during the first few
seconds, like the ones in the first log fragment. Others give up after around
400 seconds. A few hang on for hours. (The most extreme case we’ve recorded
hung on for 42,673 seconds, which is almost 12 hours.)

Tracking Your Real Mail Connections: spamlogd
Behind the scenes, rarely mentioned and barely documented, is one of
spamd’s most important helper programs: the spamlogd whitelist updater. As
the name suggests, spamlogd works quietly in the background, logging connections to and from your mail servers to keep your whitelist updated. The
idea is to make sure that valid mail sent between hosts you communicate
with regularly goes through with a minimum of fuss.

## 108. Chapter 6

If you’ve followed the discussion up to this point, spamlogd has probably been started
automatically already. However, if your initial spamd configuration didn’t include
greylisting, spamlogd may not have been started, and you may experience strange symptoms, like the greylist and whitelist not being updated properly. Restarting spamd after
you’ve enabled greylisting should ensure that spamlogd is loaded and available, too.

In order to perform its job properly, spamlogd needs you to log SMTP
connections to and from your mail servers, just as we did in the sample rule
sets in Chapter 5:
emailserver = "192.0.2.225"
pass log proto tcp to $emailserver port $email
pass log proto tcp from $emailserver to port smtp

On OpenBSD 4.1 and higher (and equivalents), you can create several
pflog interfaces and specify where rules should be logged. Here’s how to
separate the data spamlogd needs to read from the rest of your PF logs:

1.
2.

Create a separate pflog1 interface using ifconfig pflog1 create, or create
a hostname.pflog1 file with just the line up.
Change the rules to the following:
pass log (to pflog1) proto tcp to $emailserver port $email
pass log (to pflog1) proto tcp from $emailserver to port smtp

3.

Add -l pflog1 to spamlogd’s startup parameters.

This separates the spamd-related logging from the rest. (See Chapter 9
for more about logging.)
With the preceding rules in place, spamlogd will add the IP addresses that
receive email you send to the whitelist. This isn’t an ironclad guarantee that
the reply will pass immediately, but in most configurations, it helps speed
things significantly.

Greytrapping
We know that spam senders rarely use a fully compliant SMTP implementation to send their messages, which is why greylisting works. We also know
that spammers rarely check that the addresses they feed to their hijacked
machines are actually deliverable. Combine these facts, and you see that if
a greylisted machine tries to send a message to an invalid address in your
domain, there’s a good chance that the message is spam or malware.
This realization led to the next evolutionary step in spamd development—
a technique dubbed greytrapping. When a greylisted host tries to deliver
mail to a known bad address in our domains, the host is added to a locally
maintained blacklist called spamd-greytrap. Members of the spamd-greytrap list
are treated to the same 1-byte-per-second tarpitting as members of other
blacklists.
Greytrapping as implemented in spamd is simple and elegant. The main
thing you need as a starting point is spamd running in greylisting mode.
The other crucial component is a list of addresses in domains your servers
handle email for, but only ones that you’re sure will never receive legitimate email. The number of addresses in your list is unimportant, but there
must be at least one, and the upper limit is mainly defined by how many
addresses you wish to add.
Turning the Tables for Proactive Defense   109

Next, you use spamdb to feed your list to the greytrapping feature and sit
back to watch. First, a sender tries to send email to an address on your greytrap list and is simply greylisted, as with any sender you haven’t exchanged
email with before. If the same machine tries again, either to the same, invalid
address or another address on your greytrapping list, the greytrap is triggered, and the offender is put into spamd-greytrap for 24 hours. For the next
24 hours, any SMTP traffic from the greytrapped host will be stuttered,
with 1-byte-at-a-time replies.
That 24-hour period is short enough not to cause serious disruption
of legitimate traffic because real SMTP implementations will keep trying
to deliver for at least a few days. Experience from large-scale implementations of the technique shows that it rarely produces false positives. Machines
that continue spamming after 24 hours will make it back to the tarpit soon
enough.
To set up your traplist, use spamdb’s -T option. In my case, the strange
address6 I mentioned earlier in “Greylisting in Practice” on page 107 was
a natural candidate for inclusion:
$ sudo spamdb -T -a wkitp98zpu.fsf@datadok.no

The command I actually entered was $ sudo spamdb -T -a "<wkitp98zpu
.fsf@datadok.no>". In OpenBSD 4.1 and newer, spamdb doesn’t require the
angle brackets or quotes, but it will accept them.
Add as many addresses as you like. I tend to find new additions for my
local list of spamtrap addresses by looking in the greylist and mail server
logs for failed attempts to deliver delivery failure reports to nonexistent
addresses in my domains (yes, it really is as crazy as it sounds).
Wa r n i n g

Make sure that the addresses you add to your spamtrap lists are invalid and will stay
invalid. There’s nothing quite like the embarrassment of discovering that you made a
valid address into a spamtrap, however temporarily.
The following log fragment shows how a spam-sending machine is greylisted at first contact and then comes back and clumsily tries to deliver
messages to the curious address I added to my traplist, only to end up in
the spamd-greytrap blacklist after a few minutes. We know what it will be doing
for the next 20-odd hours.

Nov 6 09:50:25 delilah spamd[23576]: 210.214.12.57: connected (1/0)
Nov 6 09:50:32 delilah spamd[23576]: 210.214.12.57: connected (2/0)
Nov 6 09:50:40 delilah spamd[23576]: (GREY) 210.214.12.57: <gilbert@keyholes.net> ->
Nov 6 09:50:40 delilah spamd[23576]: 210.214.12.57: disconnected after 15 seconds.
Nov 6 09:50:42 delilah spamd[23576]: 210.214.12.57: connected (2/0)

## 6. Of course, this address is totally bogus. It looks like the kind of message ID the GNUS
email and news client generates, and it was probably lifted from a news spool or some unfortunate malware victim’s mailbox.

## 110. Chapter 6

Nov 6 09:50:45 delilah spamd[23576]: (GREY) 210.214.12.57: <bounce-3C7E40A4B3@branch15.summerbargainz.com> -> <adm@dataped.no>
Nov 6 09:50:45 delilah spamd[23576]: 210.214.12.57: disconnected after 13 seconds.
Nov 6 09:50:50 delilah spamd[23576]: 210.214.12.57: connected (2/0)
Nov 6 09:51:00 delilah spamd[23576]: (GREY) 210.214.12.57: <gilbert@keyholes.net> ->
Nov 6 09:51:00 delilah spamd[23576]: 210.214.12.57: disconnected after 18 seconds.
Nov 6 09:51:02 delilah spamd[23576]: 210.214.12.57: connected (2/0)
Nov 6 09:51:02 delilah spamd[23576]: 210.214.12.57: disconnected after 12 seconds.
Nov 6 09:51:02 delilah spamd[23576]: 210.214.12.57: connected (2/0)
Nov 6 09:51:18 delilah spamd[23576]: (GREY) 210.214.12.57: <gilbert@keyholes.net> ->
Nov 6 09:51:18 delilah spamd[23576]: 210.214.12.57: disconnected after 16 seconds.
Nov 6 09:51:18 delilah spamd[23576]: (GREY) 210.214.12.57: <bounce-3C7E40A4B3@branch15.summerbargainz.com> -> <adm@dataped.no>
Nov 6 09:51:18 delilah spamd[23576]: 210.214.12.57: disconnected after 16 seconds.
Nov 6 09:51:20 delilah spamd[23576]: 210.214.12.57: connected (1/1), lists: spamd-greytrap
Nov 6 09:51:23 delilah spamd[23576]: 210.214.12.57: connected (2/2), lists: spamd-greytrap
Nov 6 09:55:33 delilah spamd[23576]: (BLACK) 210.214.12.57: <gilbert@keyholes.net> ->
Nov 6 09:55:34 delilah spamd[23576]: (BLACK) 210.214.12.57: <bounce-3C7E40A4B3@branch15.
summer-bargainz.com> -> <adm@dataped.no>

As a side note, it looks like even though the spammer moved to send
from a different machine, both the From: and To: addresses stayed the same.
The fact that he’s still trying to send to an address that’s never been deliverable is a strong indicator that this spammer doesn’t check his lists frequently.

Managing Lists with spamdb
There may be times when you need to view or change the contents of blacklists, whitelists, and greylists. These records are located in the /var/db/spamdb
database, and an administrator’s main interface to managing those lists is
spamdb.
Early versions of spamdb simply offered options to add whitelist entries to
the database or update existing ones (spamdb -a nn.mm.nn.mm). You could delete
whitelist entries (spamdb -d nn.mm.nn.mm) to compensate for shortcomings in
either the blacklists used or the effects of the greylisting algorithms. Recent
versions of spamdb offer some interesting features to support greytrapping.
Updating Lists
If you run spamdb without any parameters, it lists the contents of your spamdb
database, and it lets you add or delete both spamtrap addresses and traplist
entries. You can also add whitelist entries on the fly.
If you want to add a host to your whitelist without adding it to your permanent nospamd file and reloading your rule set or the table, you could do it
from the command line instead, like this:
$ sudo spamdb -a 213.187.179.198

Turning the Tables for Proactive Defense   111

If a spam sender managed to get a message delivered despite your best
efforts, you could correct the situation by adding the spam sender to the
spamd-greytrap list like this:
$ sudo spamdb -a -t 192.168.2.128

Adding a new trap address is just as simple:
$ sudo spamdb -a -T _-medvetsky@ehtrib.org

If you want to reverse either of these decisions, you would simply substitute -d for the -a option in both these commands.
Keeping spamd Greylists in Sync
Beginning with OpenBSD 4.1, spamd can keep greylisting databases in sync
across any number of cooperating greylisting gateways. The implementation is via a set of spamd command-line options:

The -Y option specifies a sync target—that is, the IP address(es) of other
spamd-running gateways you want to inform of updates to your greylisting information.
On the receiving end, the -y option specifies a sync listener, which is the
address or interface where this spamd instance is prepared to receive
greylisting updates from other hosts.

For example, our main spamd gateway mainoffice-gw.example.com might
have the following options added to its startup command line to establish
a sync target and sync listener, respectively:
-Y minorbranch-gw.example.com -y mainoffice-gw.example.com

Conversely, minorbranch-gw.example.com at the branch office would have
the hostnames reversed:
-Y mainoffice-gw.example.com -y minorbranch-gw.example.com

The spamd daemon also supports shared-secret authentication between
the synchronization partners. Specifically, if you create the file /etc/mail/
spamd.key and distribute copies of it to all synchronization partners, it’ll be
used to calculate the necessary checksums for authentication. The spamd.key
file itself can be any kind of data, such as random data harvested from
/dev/arandom, as suggested by the spamd man page.

## 112. Chapter 6

In situations where direct synchronization of spamd-related data isn’t practical or if
you simply want to share your spamd-greytrap with others, exporting the contents of
your list of locally trapped spam senders to a text file may be desirable. The list format
spamd-setup expects is one address per line, optionally with comment lines starting
with one or more # characters. Exporting your list of currently trapped addresses in a
usable format can be as simple as putting together a one-liner with spamdb, grep, and
a little imagination.

Detecting Out-of-Order MX Use
OpenBSD 4.1 gave spamd the ability to detect out-of-order MX use. Contacting
a secondary mail exchanger first instead of trying the main one is a fairly
well-known spammer trick and one that runs contrary to the behavior we
expect from ordinary email transfer agents. In other words, if someone
tries the email exchangers in the wrong order, we can be pretty sure that
they’re trying to deliver spam.
For our example.com domain with main mail server 192.0.2.225 and
backup 192.0.2.224, adding -M 192.0.2.224 to spamd’s startup options would
mean that any host that tries to contact 192.0.2.224 via SMTP before contacting the main mail server at 192.0.2.225 will be added to the local spamdgreytrap list for the next 24 hours.

Handling Sites That Do Not Play Well with Greylisting
Unfortunately, there are situations where you’ll need to compensate for the
peculiarities of other sites’ email setups.
The first email message sent from any site that hasn’t contacted you for
as long as the greylister keeps its data around will be delayed for some random amount of time, which depends mainly on the sender’s retry interval.
There are times when even a minimal delay is undesirable. If, for example,
you have some infrequent customers who demand your immediate and
urgent attention to their business when they do contact you, an initial delivery delay of what could be up to several hours may not be optimal. In addition, you are bound to encounter misconfigured mail servers that either
don’t retry at all or retry too quickly, perhaps stopping delivery retries after
just one attempt.
Also, some sites are large enough to have several outgoing SMTP servers, and they don’t play well with greylisting because they’re not guaranteed
to retry delivery of any given message from the same IP address used with
the prior delivery attempt. Even though those sites comply with the retry
requirements, it’s obvious that this is one of the few remaining downsides
of greylisting.

Turning the Tables for Proactive Defense   113

One way to compensate for such situations is to define a table for a local
whitelist to be fed from a file in case of reboots. To make sure SMTP traffic
from the addresses in the table is not fed to spamd, add a pass rule to allow
the traffic to pass:
table <nospamd> persist file "/etc/mail/nospamd"

In pre–OpenBSD 4.7 syntax, add a no rdr rule at the top of your redirection block and a matching pass rule to let SMTP traffic from the hosts in
your nospamd table through, as shown here:
no rdr proto tcp from <nospamd> to $mailservers port smtp

Once you’ve made these changes to your rule set, enter the addresses
you need to protect from redirection into the /etc/mail/nospamd file. Then
reload your rule set using pfctl -f /etc/pf.conf. You can then use all the
expected table tricks on the <nospamd> table, including replacing its content
after editing the nospamd file. In fact, this approach is strongly hinted at in
both man pages and sample configuration files distributed with recent versions of spamd.
At least some sites with many outgoing SMTP servers publish information
about which hosts are allowed to send email for their domain via Sender
Policy Framework (SPF) records as part of the domain’s DNS information.7
To retrieve the SPF records for our example.com domain, use the host command’s -ttxt option as follows:
$ host -ttxt example.com

This command would produce an answer roughly like the following:
example.com descriptive text "v=spf1 ip4:192.0.2.128/25 -all"

Here, the text in quotes is the example.com domain’s SPF record. If you
want email from example.com to arrive quickly and you trust the people
there not to send or relay spam, choose the address range from the SPF
record, add it to your nospamd file, and reload the <nospamd> table contents
from the updated file.

7. SPF records are stored in DNS zones as TXT records. See http://www.openspf.org/ for details.

## 114. Chapter 6

Spam-Fighting Tips
When used selectively, blacklists combined with spamd are powerful, precise,
and efficient spam-fighting tools. The load on the spamd machine is minimal.
On the other hand, spamd will never perform better than its weakest data
source, which means you’ll need to monitor your logs and use whitelisting
when necessary.
It’s also feasible to run spamd in a pure greylisting mode, with no blacklists. In fact, some users report that a purely greylisting spamd configuration
is about as effective a spam-fighting tool as configurations with blacklists
and sometimes significantly more effective than content filtering. One such
report posted to openbsd-misc claimed that a pure greylisting configuration
immediately rid the company of approximately 95 percent of its spam load.
(This report is accessible via http://marc.info/, among other places; search
for the subject “Followup – spamd greylisting results.”)
I recommend two very good blacklists. One is Bob Beck’s traplist based
on “ghosts of usenet postings past.” Generated automatically by computers
running spamd at the University of Alberta, Bob’s setup is a regular spamd
system that removes trapped addresses automatically after 24 hours, which
means that you get an extremely low number of false positives. The number
of hosts varies widely and has been as high as 670,000. While still officially
in testing, the list was made public in January 2006. The list is available
from http://www.openbsd.org/spamd/traplist.gz. It’s part of recent sample
spamd.conf files as the uatraps blacklist.
The other list I recommend is heise.de’s nixspam, which has a 12-hour
automatic expiry and extremely good accuracy. It’s also in the sample
spamd.conf file. Detailed information about this list is available from http://
www.heise.de/ix/nixspam/dnsbl_en/.
Once you’re happy with your setup, try introducing local greytrapping.
This is likely to catch a few more undesirables, and it’s good, clean fun.
Some limited experiments—carried out while writing this chapter (chronicled at http://bsdly.blogspot.com/ in entries starting with http://bsdly.blogspot
.com/2007/07/hey-spammer-heres-list-for-you.html)—even suggest that harvesting the invalid addresses spammers use from your mail server logs, from
spamd logs, or directly from your greylist to put in your traplist is extremely
efficient. Publishing the list on a moderately visible Web page appears to
ensure that the addresses you put there will be recorded over and over
again by address-harvesting robots and will provide you with even better
greytrapping material, as they’re then more likely to be kept on the spammers’ list of known good addresses.

Turning the Tables for Proactive Defense   115

T r a f f i c S h ap i n g w i t h Q u e u e s
and Priorities

In this chapter, we look at how to use traffic shaping to allocate bandwidth resources
efficiently and according to a specified policy. If the term traffic shaping seems unfamiliar, rest
assured it means what you think it means: that you’ll
be altering the way your network allocates resources
in order to satisfy the requirements of your users and
their applications. With a proper understanding of your network traffic
and the applications and users that generate it, you can, in fact, go quite a
bit of distance toward “bigger, better, faster, more” just by optimizing your
network for the traffic that’s actually supposed to pass there.
A small but powerful arsenal of traffic-shaping tools is at your disposal;
all of them work by introducing nondefault behavior into your network setup
to bend the realities of your network according to your wishes. Traffic shaping for PF contexts currently comes in two flavors: the once experimental

ALTQ (short for alternate queuing) framework, now considered old-style after
some 15 years of service, and the newer OpenBSD priorities and queuing system introduced in OpenBSD 5.5.
In the first part of the chapter, we introduce traffic shaping by looking at the features of the new OpenBSD priority and queuing system. If
you’re about to set up on OpenBSD 5.5 or newer, you can jump right in,
starting with the next section, “Always-On Priority and Queues for Traffic
Shaping.” This is also where the main traffic-shaping concepts are introduced with examples.
On OpenBSD 5.4 and earlier as well as other BSDs where the PF
code wasn’t current with OpenBSD 5.5, traffic shaping was the domain
of the ALTQ system. On OpenBSD, ALTQ was removed after one transitional release, leaving only the newer traffic-shaping system in place from
OpenBSD 5.6 onward. If you’re interested in converting an existing ALTQ
setup to the new system, you’ll most likely find “Transitioning from ALTQ
to Priorities and Queues” on page 131 useful; this section highlights the
differences between the older ALTQ system and the new system.
If you’re working with an operating system where the queues system
introduced in OpenBSD 5.5 isn’t yet available, you’ll want to study the
ALTQ traffic-shaping subsystem, which is described in “Directing Traffic
with ALTQ” on page 133. If you’re learning traffic-shaping concepts and
want to apply them to an ALTQ setup, please read the first part of this
chapter before diving into ALTQ-specific configuration details.

Always-On Priority and Queues for Traffic Shaping
Managing your bandwidth has a lot in common with balancing your checkbook or handling other resources that are either scarce or available in finite
quantities. The resource is available in a constant supply with hard upper
limits, and you need to allocate the resource with maximum efficiency,
according to the priorities set out in your policy or specification.
OpenBSD 5.5 and newer offers several different options for managing
your bandwidth resources via classification mechanisms in our PF rule sets.
We’ll take a look at what you can do with pure traffic prioritization first and
then move on to how to subdivide your bandwidth resources by allocating
defined subsets of your traffic to queues.

## 118. Chapter 7

The always-on priorities were introduced as a teaser of sorts in OpenBSD 5.0. After
several years in development and testing, the new queuing system was finally committed in time to be included in OpenBSD 5.5, which was released on May 1, 2014. If
you’re starting your traffic shaping from scratch on OpenBSD 5.5 or newer or you’re
considering doing so, this section is the right place to start. If you’re upgrading from
an earlier OpenBSD version or transitioning from another ALTQ system to a recent
OpenBSD, you’ll most likely find the following section, “Transitioning from ALTQ to
Priorities and Queues,” useful.

Shaping by Setting Traffic Priorities
If you’re mainly interested in pushing certain kinds of traffic ahead of
­others, you may be able to achieve what you want by simply setting priorities: assigning a higher priority to some items so that they receive attention
before others.
The prio Priority Scheme
Starting with OpenBSD 5.0, a priority scheme for classifying network traffic
on a per-rule basis is available. The range of priorities is from 0 to 7, where
0 is lowest priority. Items assigned priority 7 will skip ahead of everything
else, and the default value 3 is automatically assigned for most kinds of traffic. The priority scheme, which you’ll most often hear referred to as prio
after the PF syntax keyword, is always enabled, and you can tweak your traffic by setting priorities via your match or pass rules.
For example, to speed up your outgoing SSH traffic to the max, you
could put a rule like this in your configuration:
pass proto tcp to port ssh set prio 7

Then your SSH traffic would be served before anything else.
You could then examine the rest of your rule set and decide what traffic
is more or less important, what you would like always to reach its destination, and what parts of your traffic you feel matter less.
To push your Web traffic ahead of everything else and bump up the priority for network time and name services, you could amend your configuration with rules like these:
pass proto tcp to port { www https } set prio 7
pass proto { udp tcp } to port { domain ntp } set prio 6

Or if you have a rule set that already includes rules that match criteria
other than just the port, you could achieve much the same effect by writing
your priority traffic shaping as match rules instead:
match proto tcp to port { www https } set prio 7
match proto { udp tcp } to port { domain ntp } set prio 6

In some networks, time-sensitive traffic, like Voice over Internet Protocol
(VoIP), may need special treatment. For VoIP, a priority setup like this may
improve phone conversation quality:
voip_ports="{ 2027 4569 5036 5060 10000:20000 }"
match proto udp to port $voip_ports set prio 7

But do check your VoIP application’s documentation for information
on what specific ports it uses. In any case, using match rules like these can
have a positive effect on your configuration in other ways, too: You can
use match rules like the ones in the examples here to separate filtering
Traffic Shaping with Queues and Priorities   119

decisions—such as passing, blocking, or redirecting—from traffic-shaping
decisions, and with that separation in place, you’re likely to end up with a
more readable and maintainable configuration.
It’s also worth noting that parts of the OpenBSD network stack set
default priorities for certain types of traffic that the developers decided was
essential to a functional network. If you don’t set any priorities, anything
with proto carp and a few other management protocols and packet types will
go by priority 6, and all types of traffic that don’t receive a specific classification with a set prio rule will have a default priority of 3.
The Two-Priority Speedup Trick
In the examples just shown, we set different priorities for different types of
traffic and managed to get specific types of traffic, such as VoIP and SSH,
to move faster than others. But thanks to the design of TCP, which carries
the bulk of your traffic, even a simple priority-shaping scheme has more to
offer with only minor tweaks to the rule set.
As readers of RFCs and a few practitioners have discovered, the
connection-oriented design of TCP means that for each packet sent, the
sender will expect to receive an acknowledgment (ACK) packet back within
a preset time or matching a defined “window” of sequence numbers. If the
sender doesn’t receive the acknowledgment within the expected limit, she
assumes the packet was lost in transit and arranges to resend the data.
One other important factor to consider is that by default, packets are
handled in the order they arrive. This is known as first in, first out (FIFO), and
it means that the essentially dataless ACK packets will be waiting their turn
in between the larger data packets. On a busy or congested link, which is
exactly where traffic shaping becomes interesting, waiting for ACKs and performing retransmissions can eat measurably into effective bandwidth and
slow down all transfers. In fact, concurrent transfers in both directions
can slow each other significantly more than the value of their expected
data sizes.1
Fortunately, a simple and quite popular solution to this problem is at
hand: You can use priorities to make sure those smaller packets skip ahead.
If you assign two priorities in a match or pass rule, like this:
match out on egress set prio (5, 6)

The first priority will be assigned to the regular traffic, while ACK packets and other packets with a low delay type of service (ToS) will be assigned
the second priority and will be served faster than the regular packets.
When a packet arrives, PF detects the ACK packets and puts them on
the higher-priority queue. PF also inspects the ToS field on arriving packets.
Packets that have the ToS set to low delay to indicate that the sender wants
1. Daniel Hartmeier, one of the original PF developers, wrote a nice article about this problem, which is available at http://www.benzedrine.cx/ackpri.html. Daniel’s explanations use the
older ALTQ priority queues syntax but include data that clearly illustrates the effect of assigning two different priorities to help ACKs along.

## 120. Chapter 7

speedier delivery also get the high-priority treatment. When more than one
priority is indicated, as in the preceding rule, PF assigns priority accordingly. Packets with other ToS values are processed in the order they arrive,
but with ACK packets arriving faster, the sender spends less time waiting for
ACKs and resending presumably lost data. The net result is that the available bandwidth is used more efficiently. (The match rule quoted here is the
first one I wrote in order to get a feel for the new prio feature—on a test system, of course—soon after it was committed during the OpenBSD 5.0 development cycle. If you put that single match rule on top of an existing rule set,
you’ll probably see that the link can take more traffic and more simultaneous connections before noticeable symptoms of congestion turn up.)
See whether you can come up with a way to measure throughout before
and after you introduce the two-priorities trick to your traffic shaping, and
note the difference before you proceed to the more complex traffic-shaping
options.

Introducing Queues for Bandwidth Allocation
We’ve seen that traffic shaping using only priorities can be quite effective,
but there will be times when a priorities-only scheme will fall short of your
goals. One such scenario occurs when you’re faced with requirements that
would be most usefully solved by assigning a higher priority, and perhaps
a larger bandwidth share, to some kinds of traffic, such as email and other
high-value services, and correspondingly less bandwidth to others. Another
such scenario would be when you simply want to apportion your available
bandwidth in different-sized chunks to specific services and perhaps set
hard upper limits for some types of traffic, while at the same time wanting
to ensure that all traffic that you care about gets at least its fair share of
available bandwidth. In cases like these, you leave the pure-priority scheme
behind, at least as the primary tool, and start doing actual traffic shaping
using queues.
Unlike with the priority levels, which are always available and can be
used without further preparations, in any rule, queues represent specific
parts of your available bandwidth and can be used only after you’ve defined
them in terms of available capacity. Queues are a kind of buffer for network
packets. Queues are defined with a specific amount of bandwidth, or as a
specific portion of available bandwidth, and you can allocate portions of
each queue’s bandwidth share to subqueues, or queues within queues,
which share the parent queue’s resources. The packets are held in a queue
until they’re either dropped or sent according to the queue’s criteria and
subject to the queue’s available bandwidth. Queues are attached to specific
interfaces, and bandwidth is managed on a per-interface basis, with available bandwidth on a given interface subdivided into the queues you define.
The basic syntax for defining a queue follows this pattern:
queue name on interface bandwidth number [ ,K,M,G]
queue name1 parent name bandwidth number[ ,K,M,G] default
queue name2 parent name bandwidth number[ ,K,M,G]
queue name3 parent name bandwidth number[ ,K,M,G]
Traffic Shaping with Queues and Priorities   121

The letters following the bandwidth number denote the unit of measurement: K denotes kilobits; M megabits; and G gigabits. When you write
only the bandwidth number, it’s interpreted as the number of bits per second. It’s possible to tack on other options to this basic syntax, as we’ll see in
later examples.

Subqueue definitions name their parent queue, and one queue needs to be the default
queue that receives any traffic not specifically assigned to other queues.
Once queue definitions are in place, you integrate traffic shaping into
your rule set by rewriting your pass or match rules to assign traffic to a specific queue.

W h at’s Your Tota l Usable Ba ndw idth?
Once we start working with defined parts of total bandwidth rather than priorities that somehow share the whole, determining the exact value of your
total usable bandwidth becomes interesting. It can be difficult to determine
actual usable bandwidth on a specific interface for queuing. If you don’t
specify a total bandwidth, the total bandwidth available will be used to calculate the allocations, but some types of interfaces cannot reliably report the
actual bandwidth value. One common example of this discrepancy is where
your gateway’s external interface is a 100 megabit (Mb) Ethernet interface,
attached to a DSL line that offers only 8Mb download and 1Mb upload.* The
Ethernet interface will then confidently report 100Mb bandwidth, not the actual
value of the Internet-facing connection.
For this reason, it usually makes sense to set the total bandwidth to a fixed
value. Unfortunately, the value to use may not be exactly what your bandwidth
supplier tells you is available because there will always be some overhead due
to various technologies and implementations. For example, in typical TCP/IP
over wired Ethernet, overhead can be as low as single-digit percentages, but
TCP/IP over ATM has been known to have overhead of almost 20 percent. If
your bandwidth supplier doesn’t provide the overhead information, you’ll need
to make an educated guess at the starting value. In any case, remember that
the total bandwidth available is never greater than the bandwidth of the weakest link in your network path.
Queues are supported only for outbound connections relative to the system doing the queuing. When planning your bandwidth management, consider
the actual usable bandwidth to be equal to the weakest (lowest bandwidth) link
in the connection’s path, even if your queues are set up on a different interface.

- This really dates the book, I know. In a few years, these numbers will seem quaint.

## 122. Chapter 7

The HFSC Algorithm
Underlying any queue system you define using the queue system in
OpenBSD 5.5 and later is the Hierarchical Fair Service Curve (HFSC) algorithm. HFSC was designed to allocate resources fairly among queues in a
hierarchy. One of its interesting features is that it imposes no limits until
some part of the traffic reaches a volume that’s close to its preset limits.
The algorithm starts shaping just before the traffic reaches a point where
it deprives some other queue of its guaranteed minimum share.

All sample configurations we present in this book assign traffic to queues in the outgoing direction because you can realistically control only traffic generated locally and,
once limits are reached, any traffic-shaping system will eventually resort to dropping
packets in order to make the endpoint back off. As we saw in the earlier examples, all
well-behaved TCP stacks will respond to lost ACKs with slower packet rates.
Now that you know at least the basics of the theory behind the OpenBSD
queue system, let’s see how queues work.
Splitting Your Bandwidth into Fixed-Size Chunks
You’ll often find that certain traffic should receive a higher priority than
other traffic. For example, you’ll often want important traffic, such as mail
and other vital services, to have a baseline amount of bandwidth available at
all times, while other services, such as peer-to-peer file sharing, shouldn’t be
allowed to consume more than a certain amount. To address these kinds of
issues, queues offer a wider range of options than the pure-priority scheme.
The first queue example builds on the rule sets from earlier chapters.
The scenario is that we have a small local network, and we want to let the
users on the local network connect to a predefined set of services outside
their own network while also letting users from outside the local network
access a Web server and an FTP server somewhere on the local network.
In the following example, all queues are set up with the root queue, called
main, on the external, Internet-facing interface. This approach makes sense
mainly because bandwidth is more likely to be limited on the external link
than on the local network. In principle, however, allocating queues and
running traffic shaping can be done on any network interface.
This setup includes a queue for a total bandwidth of 20Mb with six
subqueues.
queue main on $ext_if bandwidth 20M
queue defq parent main bandwidth 3600K default
queue ftp parent main bandwidth 2000K
queue udp parent main bandwidth 6000K
queue web parent main bandwidth 4000K

Traffic Shaping with Queues and Priorities   123

queue ssh parent main bandwidth 4000K
queue ssh_interactive parent ssh bandwidth 800K
queue ssh_bulk parent ssh bandwidth 3200K
queue icmp parent main bandwidth 400K

The subqueue defq, shown in the preceding example, has a bandwidth
allocation of 3600K, or 18 percent of the bandwidth, and is designated as
the default queue. This means any traffic that matches a pass rule but that
isn’t explicitly assigned to some other queue ends up here.
The other queues follow more or less the same pattern, up to subqueue
ssh, which itself has two subqueues (the two indented lines below it). Here,
we see a variation on the trick of using two separate priorities to speed up
ACK packets, and as we’ll see shortly, the rule that assigns traffic to the two
SSH subqueues assigns different priorities. Bulk SSH transfers, typically
SCP file transfers, are transmitted with a ToS indicating throughput, while
interactive SSH traffic has the ToS flag set to low delay and skips ahead
of the bulk transfers. The interactive traffic is likely to be less bandwidth
consuming and gets a smaller share of the bandwidth, but it receives preferential treatment because of the higher-priority value assigned to it. This
scheme also helps the speed of SCP file transfers because the ACK packets
for the SCP transfers will be assigned a higher priority.
Finally, we have the icmp queue, which is reserved for the remaining
400K, or 2 percent, of the bandwidth from the top level. This guarantees a
minimum amount of bandwidth for ICMP traffic that we want to pass but that
doesn’t match the criteria that would have it assigned to the other queues.
To tie the queues into the rule set, we use the pass rules to indicate which
traffic is assigned to the queues and their criteria.
set skip on { lo, $int_if }
pass log quick on $ext_if proto tcp to port ssh \
queue (ssh_bulk, ssh_interactive) set prio (5,7)
pass in quick on $ext_if proto tcp to port ftp queue ftp
pass in quick on $ext_if proto tcp to port www queue http
pass out on $ext_if proto udp queue udp
pass out on $ext_if proto icmp queue icmp
pass out on $ext_if proto tcp from $localnet to port $client_out u

The rules for ssh, ftp, www, udp, and icmp assign traffic to their respective
queues, and we note again that the ssh queue’s subqueues are assigned traffic with two different priorities. The last catchall rule u passes all other outgoing traffic from the local network, lumping it into the default defq queue.
You can always let a block of match rules do the queue assignment instead
in order to make the configuration even more flexible. With match rules in
place, you move the filtering decisions to block, pass, or even redirect to a
set of rules elsewhere.

## 124. Chapter 7

match log quick on $ext_if proto tcp to port ssh \
queue (ssh_bulk, ssh_interactive) set prio (5,7)
match in quick on $ext_if proto tcp to port ftp queue ftp
match in quick on $ext_if proto tcp to port www queue http
match out on $ext_if proto udp queue udp
match out on $ext_if proto icmp queue icmp

Note that with match rules performing the queue assignment, there’s no
need for a final catchall to put the traffic that doesn’t match the other rules
into the default queue. Any traffic that doesn’t match these rules and that’s
allowed to pass will end up in the default queue.
Upper and Lower Bounds with Bursts
Fixed bandwidth allocations are nice, but network admins with traffic-shaping ambitions tend to look for a little more flexibility once they’ve
gotten their feet wet. Wouldn’t it be nice if there were a regime with flexible bandwidth allocation, offering guaranteed lower and upper bounds
for bandwidth available to each queue and variable allocations over time—
and one that starts shaping only when there’s an actual need to do so?
The good news is that the OpenBSD queues can do just that, courtesy
of the underlying HFSC algorithm discussed earlier. HFSC makes it possible to set up queuing regimes with guaranteed minimum allocations and
hard upper limits, and you can even have allocations that include burst values to let available capacity vary over time.
Working from a typical gateway configuration like the ones we’ve altered
incrementally over the earlier chapters, we insert this queue definition early
in the pf.conf file:
queue rootq on $ext_if bandwidth 20M
queue main parent rootq bandwidth 20479K min 1M max 20479K qlimit 100
queue qdef parent main bandwidth 9600K min 6000K max 18M default
queue qweb parent main bandwidth 9600K min 6000K max 18M
queue qpri parent main bandwidth 700K min 100K max 1200K
queue qdns parent main bandwidth 200K min 12K burst 600K for 3000ms
queue spamd parent rootq bandwidth 1K min 0K max 1K qlimit 300

This definition has some characteristics that are markedly different
from the previous one on page 121. We start with this rather small hierarchy by splitting the top-level queue, rootq, into two. Next, we subdivide the
main queue into several subqueues, all of which have a min value set—the
guaranteed minimum bandwidth allocated to the queue. (The max value
would set a hard upper limit on the queue’s allocation.) The bandwidth
parameter also sets the allocation the queue will have available when it’s
backlogged—that is, when it’s started to eat into its qlimit, or queue limit,
allocation.
Traffic Shaping with Queues and Priorities   125

The queue limit parameter works like this: In case of congestion, each
queue by default has a pool of 50 slots, the queue limit, to keep packets
around when they can’t be transmitted immediately. Here, the top-level
queues, main and spamd, both have larger-than-default pools set by their
qlimit setting: 100 for main and 300 for spamd. Cranking up these qlimit sizes
means we’re a little less likely to drop packets when the traffic approaches
the set limits, but it also means that when the traffic shaping kicks in, we’ll
see increased latency for connections that end up in these larger pools.
The next step is to tie the newly created queues into the rule set. If you have
a filtering regime in place already, the tie-in is simple—just add a few match
rules:
match out on $ext_if proto tcp to port { www https } \
set queue (qweb, qpri) set prio (5,6)
match out on $ext_if proto { tcp udp } to port domain \
set queue (qdns, qpri) set prio (6,7)
match out on $ext_if proto icmp \
set queue (qdns, qpri) set prio (6,7)

Here, the match rules once again do the ACK packet speedup trick with
the high- and low-priority queue assignment, just as we saw earlier in the
pure-priority-based system. The only exception is when we assign traffic
to our lowest-priority queue (with a slight modification to an existing pass
rule), where we really don’t want any speedup.
pass in log on egress proto tcp to port smtp \
rdr-to 127.0.0.1 port spamd set queue spamd set prio 0

Assigning the spamd traffic to a minimal-sized queue with 0 priority
here is intended to slow down the spammers on their way to our spamd.
(See Chapter 6 for more on spamd and related matters.)
With the queue assignment and priority setting in place, it should be
clear that the queue hierarchy here uses two familiar tricks to make efficient use of available bandwidth. First, it uses a variation of the high- and
low-priority mix demonstrated in the earlier pure-priority example. Second,
we speed up almost all other traffic, especially the Web traffic, by allocating
a small but guaranteed portion of bandwidth for name service lookups. For
the qdns queue, we set the burst value with a time limit: After 3000 milliseconds, the allocation goes down to a minimum of 12K to fit within the total
200K quota. Short-lived burst values like this can be useful to speed connections that transfer most of their payload during the early phases.
It may not be immediately obvious from this example, but HFSC requires
that traffic be assigned only to leaf queues, or queues without subqueues. That
means it’s possible to assign traffic to main’s subqueues— qpri, qdef, qweb, and
qdns—as well as rootq’s subqueue—spamd—as we just did with the match and

## 126. Chapter 7

pass rules, but not to rootq or main themselves. With all queue assignments in
place, we can use systat queues to show the queues and their traffic:
6 users
QUEUE
rootq
main
qdef
qweb
qpri
qdns
spamd

Load 0.31 0.28 0.34
BW SCH
20M
20M
9M
9M
600K
200K
1K

PR

Tue May 19 21:31:54 2015

PKTS BYTES DROP_P DROP_B QLEN BORR SUSP P/S
48887
15M
18553 8135K
37549 2407K
15716 1568K
10590 661K
126
8772
47

B/S

The queues are shown indented to indicate their hierarchy, from root to
leaf queues. The main queue and its subqueues— qpri, qdef, qweb, and qdns—
are shown with their bandwidth allocations and number of bytes and packets
passed. The DROP_P and DROP_B columns, which show the number of packets
and bytes dropped, would appear if we had been forced to drop packets at
this stage. QLEN is the number of packets waiting for processing, while the
final two columns show live updates of packets and bytes per second.
For a more detailed view, use pfctl -vvsq to show the queues and their
traffic:
queue rootq on xl0 bandwidth 20M qlimit 50
0 dropped pkts:
0.0 packets/s, 0 b/s ]
queue main parent rootq on xl0 bandwidth 20M, min 1M, max 20M qlimit 100
0 dropped pkts:
0/100 ]
0.0 packets/s, 0 b/s ]
queue qdef parent main on xl0 bandwidth 9M, min 6M, max 18M default qlimit 50
1051 bytes:
302813 dropped pkts:
2.6 packets/s, 5.64Kb/s ]
queue qweb parent main on xl0 bandwidth 9M, min 6M, max 18M qlimit 50
1937 bytes:
1214950 dropped pkts:
3.6 packets/s, 13.65Kb/s ]
queue qpri parent main on xl0 bandwidth 600K, max 1M qlimit 50
2169 bytes:
143302 dropped pkts:
6.6 packets/s, 3.55Kb/s ]
queue qdns parent main on xl0 bandwidth 200K, min 12K burst 600K for 3000ms qlimit 50
604 bytes:
65091 dropped pkts:
1.6 packets/s, 1.31Kb/s ]
queue spamd parent rootq on xl0 bandwidth 1K, max 1K qlimit 300
884 bytes:
57388 dropped pkts:
[ qlength: 176/300 ]
1.9 packets/s, 1Kb/s ]

Traffic Shaping with Queues and Priorities   127

This view shows that the queues receive traffic roughly as expected with
the site’s typical workload. Notice that only a few moments after the rule set
has been reloaded, the spamd queue is already backed up more than halfway
to its qlimit setting, which seems to indicate that the queues are reasonably
dimensioned to actual traffic.

Pay attention to each queue’s dropped packets (dropped pkts:) counter. If the number
of packets dropped is high or increasing, then that could mean that one of the bandwidth allocation parameters needs adjusting or that some other network problem
needs to be investigated.
The DMZ Network, Now with Traffic Shaping
In Chapter 5, we set up a network with a single gateway and all externally
visible services configured on a separate DMZ (demilitarized zone) network so that all traffic to the servers from both the Internet and the internal
network had to pass through the gateway. That network schematic, illustrated in Chapter 5, is shown again in Figure 7-1. Using the rule set from
Chapter 5 as the starting point, we’ll add some queuing in order to optimize our network resources. The physical and logical layout of the network
will not change.

192.0.2.0/24
2001:db8::1

$dmz_if
192.0.2.129/25
2001:db8::baad:f00d:1

2001:db8::baad:f00d:f117

2001:db8::baad:f00d:f17

2001:db8:baad:f00d:fbaa

Figure 7-1: Network with DMZ

The most likely bottleneck for this network is the bandwidth for the
connection between the gateway’s external interface and the Internet.
Although the bandwidth elsewhere in our setup isn’t infinite, of course,
the available bandwidth on any interface in the local network is likely to be
128   Chapter 7

less limiting than the bandwidth actually available for communication with
the outside world. In order to make services available with the best possible
performance, we need to set up the queues so that the bandwidth available
at the site is made available to the traffic we want to allow. The interface
bandwidth on the DMZ interface is likely either 100Mb or 1Gb, while the
actual available bandwidth for connections from outside the local network is
considerably smaller. This consideration shows up in our queue definitions,
where the actual bandwidth available for external traffic is the main limitation in the queue setup.
queue ext on $ext_if bandwidth 2M
queue ext_main parent ext bandwidth 500K default
queue ext_web parent ext bandwidth 500K
queue ext_udp parent ext bandwidth 400K
queue ext_mail parent ext bandwidth 600K
queue dmz on $dmz_if bandwidth 100M
queue ext_dmz parent dmz bandwidth 2M
queue ext_dmz_web parent ext_dmz bandwidth 800K default
queue ext_dmz_udp parent ext_dmz bandwidth 200K
queue ext_dmz_mail parent ext_dmz bandwidth 1M
queue dmz_main parent dmz bandwidth 25M
queue dmz_web parent dmz bandwidth 25M
queue dmz_udp parent dmz bandwidth 20M
queue dmz_mail parent dmz bandwidth 20M

Notice that for each interface, there’s a root queue with a bandwidth
limitation that determines the allocation for all queues attached to that
interface. In order to use the new queuing infrastructure, we need to make
some changes to the filtering rules, too.

Because any traffic not explicitly assigned to a specific queue is assigned to the default
queue for the interface, be sure to tune your filtering rules as well as your queue definitions to the actual traffic in your network.
The main part of the filtering rules could end up looking like this after
adding the queues:
pass in on $ext_if proto { tcp, udp } to $nameservers port domain \
set queue ext_udp set prio (6,5)
pass in on $int_if proto { tcp, udp } from $localnet to $nameservers \
port domain
pass out on $dmz_if proto { tcp, udp } to $nameservers port domain \
set queue ext_dmz_udp set prio (6,5)
pass out on $dmz_if proto { tcp, udp } from $localnet to $nameservers \
port domain set queue dmz_udp
pass in on $ext_if proto tcp to $webserver port $webports set queue ext_web
pass out on $dmz_if proto tcp to $webserver port $webports \
set queue ext_dmz_web
pass out on $dmz_if proto tcp from $localnet to $webserver port $webports \
set queue dmz_web
Traffic Shaping with Queues and Priorities   129

pass in log on $ext_if proto tcp from $localnet to $mailserver port smtp
pass out log on $dmz_if proto tcp to $mailserver port smtp set queue ext_mail
pass in on $dmz_if proto tcp from $mailserver to port smtp set queue dmz_mail
pass out log on $ext_if proto tcp from $mailserver to port smtp \
set queue ext_dmz_mail

Notice that only traffic that will pass either the DMZ or the external
interface is assigned to queues. In this configuration, with no externally
accessible services on the internal network, queuing on the internal interface wouldn’t make much sense because that’s likely the part of the network
with the least restricted available bandwidth. Also, as in earlier examples,
there’s a case to be made for separating the queue assignments from the
filtering part of the rule set by making a block of match rules responsible
for queue assignment.

Using Queues to Handle Unwanted Traffic
So far, we’ve focused on queuing as a way to make sure specific kinds of traffic are let through as efficiently as possible. Now, we’ll look at two examples
that present a slightly different way to identify and handle unwanted traffic
using various queuing-related tricks to keep miscreants in line.
Overloading to a Tiny Queue
In “Turning Away the Brutes” on page 94, we used a combination of
state-tracking options and overload rules to fill a table of addresses for special treatment. The special treatment we demonstrated in Chapter 6 was
to cut all connections, but it’s equally possible to assign overload traffic to a
specific queue instead. For example, consider the rule from our first queue
example, shown here.
keep state queue (ssh_bulk, ssh_interactive) set prio (5,7)

To create a variation of the overload table trick from Chapter 6, add
state-tracking options, like this:
keep state (max-src-conn 15, max-src-conn-rate 5/3, \
overload <bruteforce> flush global) queue (ssh_bulk, ssh_interactive) \
set prio (5,7)

Then, make one of the queues slightly smaller:
queue smallpipe parent main bandwidth 512

## 130. Chapter 7

And assign traffic from miscreants to the small-bandwidth queue with
this rule:
pass inet proto tcp from <bruteforce> to port $tcp_services queue smallpipe

As a result, the traffic from the bruteforcers would pass, but with a
hard upper limit of 512 bits per second. (It’s worth noting that tiny bandwidth allocations may be hard to enforce on high-speed links due to the
network stack’s timer resolution. If the allocation is small enough relative
to the capacity of the link, packets that exceed the stated per-second maximum allocation may be transferred anyway, before the bandwidth limit
kicks in.) It might also be useful to supplement rules like these with tableentry expiry, as described in “Tidying Your Tables with pfctl” on page 97.
Queue Assignments Based on Operating System Fingerprint
Chapter 6 covered several ways to use spamd to cut down on spam. If running
spamd isn’t an option in your environment, you can use a queue and rule set
based on the knowledge that machines that send spam are likely to run a
particular operating system. (Let’s call that operating system Windows.)
PF has a fairly reliable operating system fingerprinting mechanism,
which detects the operating system at the other end of a network connection based on characteristics of the initial SYN packets at connection setup.
The following may be a simple substitute for spamd if you’ve determined that
legitimate mail is highly unlikely to be delivered from systems that run that
particular operating system.
pass quick proto tcp from any os "Windows" to $ext_if \
port smtp set queue smallpipe

Here, email traffic originating from hosts that run a particular operating system get no more than 512 bits per second of your bandwidth.

Transitioning from ALTQ to Priorities and Queues
If you already have configurations that use ALTQ for traffic shaping and
you’re planning a switch to OpenBSD 5.5 or newer, this section contains
some pointers for how to manage the transition. The main points are these:
The rules after transition are likely simpler. The OpenBSD 5.5 and newer
traffic-shaping system has done away with the somewhat arcane ALTQ
syntax with its selection of queuing algorithms, and it distinguishes clearly
between queues and pure-priority shuffling. In most cases, your configuration becomes significantly more readable and maintainable after a conversion to the new traffic-shaping system.
For simple configurations, set prio is enough. The simplest queue discipline in ALTQ was priq, or priority queues. The most common simple use

Traffic Shaping with Queues and Priorities   131

case was the two-priority speedup trick first illustrated by Daniel Hartmeier
in the previously cited article. The basic two-priority configuration looks
ext_if="kue0"
altq on $ext_if priq bandwidth 100Kb queue { q_pri, q_def }
queue q_pri priority 7
queue q_def priority 1 priq(default)
pass out on $ext_if proto tcp from $ext_if queue (q_def, q_pri)
pass in on $ext_if proto tcp to $ext_if queue (q_def, q_pri)

In OpenBSD 5.5 and newer, the equivalent effect can be achieved with
no queue definitions. Instead, you assign two priorities in a match or pass
rule, like this:
match out on egress set prio (5, 6)

Here, the first priority will be assigned to regular traffic, while ACK and
other packets with a low-delay ToS will be assigned the second priority and
will be served faster than the regular packets. The effect is the same as in
the ALTQ example we just quoted, with the exception of defined bandwidth limits and the somewhat dubious effect of traffic shaping on incoming traffic.
Priority queues can for the most part be replaced by set prio constructs. For
pure-priority differentiation, applying set prio on a per pass or match rule
basis is simpler than defining queues and assigning traffic and affects only
the packet priority. ALTQ allowed you to define CBQ or HFSC queues that
also had a priority value as part of their definition. Under the new queuing
system, assigning priority happens only in match or pass rules, but if your
application calls for setting both priority and queue assignment in the same
rule, the new syntax allows for that, too:
pass log quick on $ext_if proto tcp to port ssh \
queue (ssh_bulk, ssh_interactive) set prio (5,7)

The effect is similar to the previous behavior shown in “Splitting Your
Bandwidth into Fixed-Size Chunks” on page 123, and this variant may be
particularly helpful during transition.
Priorities are now always important. Keep in mind that the default is 3.
It’s important to be aware that traffic priorities are always enabled since
OpenBSD 5.0, and they need to be taken into consideration even when
you’re not actively assigning priorities. In old-style configurations that
employed the two-priority trick to speed up ACKs and by extension all
traffic, the only thing that was important was that there were two different priorities in play. The low-delay packets would be assigned to the
higher-priority queue, and the net effect would be that traffic would likely
pass faster, with more efficient bandwidth use than with the default FIFO
132   Chapter 7

queue. Now the default priority is 3, and setting the priority for a queue to
0, as a few older examples do, will mean that the traffic assigned that priority will be considered ready to pass only when there’s no higher-priority
traffic left to handle.
For actual bandwidth shaping, HFSC works behind the scenes. Once you’ve
determined that your specification calls for slicing available bandwidth into
chunks, the underlying algorithm is always HFSC. The variety of syntaxes
for different types of queues is gone. HFSC was chosen for its flexibility
as well as the fact that it starts actively shaping traffic only once the traffic
approaches one of the limits set by your queuing configuration. In addition, it’s possible to create CBQ-like configurations by limiting the queue
definitions to only bandwidth declarations. “Splitting Your Bandwidth into
Fixed-Size Chunks” on page 123 (mentioned earlier) demonstrates a static
configuration that implements CBQ as a subset of HFSC.
You can transition from ALTQ via the oldqueue mechanism. OpenBSD 5.5
supports legacy ALTQ configurations with only one minor change to configurations: The queue keyword was needed as a reserved word for the new
queuing system, so ALTQ queues need to be declared as oldqueue instead.
Following that one change (a pure search and replace operation that you
can even perform just before starting your operating system upgrade), the
configuration will work as expected.
If your setup is sufficiently complicated, go back to specifications and reimplement. The examples in this chapter are somewhat stylized and rather simple.
If you have running configurations that have been built up incrementally
over several years and have reached a complexity level, orders of magnitude
larger than those described here, the new syntax may present an opportunity to define what your setup is for and produce a specification that is fit to
reimplement in a cleaner and more maintainable configuration.
Going the oldqueue route and tweaking from there will work to some
degree, but it may be easier to make the transition via a clean reimplementation from revised specification in a test environment where you can test
whether your accumulated assumptions hold up in a the context of the
new traffic-shaping system. Whatever route you choose for your transition,
you’re more or less certain to end up with a more readable and maintainable configuration after your switch to OpenBSD 5.5 or newer.

Directing Traffic with ALTQ
ALTQ is the very flexible legacy mechanism for network traffic shaping,
which was integrated into PF on OpenBSD2 in time for the OpenBSD 3.3
release by Henning Brauer, who’s also the main developer of the priorities and queues system introduced in OpenBSD 5.5 (described in the
previous sections of this chapter). OpenBSD 3.3 onward moved all ALTQ
2. The original research on ALTQ was presented in a paper for the USENIX 1999 conference.
You can read Kenjiro Cho’s paper “Managing Traffic with ALTQ” online at http://www.usenix
.org/publications/library/proceedings/usenix99/cho.html. The code turned up in OpenBSD soon
after through the efforts of Cho and Chris Cappucio.
Traffic Shaping with Queues and Priorities   133

configuration into pf.conf to ease the integration of traffic shaping and filtering. PF ports to other BSDs were quick to adopt at least some optional
ALTQ integration.

OpenBSD 5.5 introduced a new queue system for traffic shaping with a radically
different (and more readable) syntax that complements the always-on priority system
introduced in OpenBSD 5.0. The new system is intended to replace ALTQ entirely
after one transitional release. The rest of this chapter is useful only if you’re interested
in learning about how to set up or maintain an ALTQ-based system.

Basic ALTQ Concepts
As the name suggests, ALTQ configurations are totally queue-centric. As in
the more recent traffic-shaping system, ALTQ queues are defined in terms
of bandwidth and attached to interfaces. Queues can be assigned priority,
and in some contexts, they can have subqueues that receive a share of the
parent queue’s bandwidth.
The general syntax for ALTQ queues looks like this:
altq on interface type [options ... ] main_queue { sub_q1, sub_q2 ..}
queue sub_q1 [ options ... ]
queue sub_q2 [ options ... ] { subA, subB, ... }
[...]
pass [ ... ] queue sub_q1
pass [ ... ] queue sub_q2

On OpenBSD 5.5 and newer, ALTQ queues are denoted oldqueue instead of queue
due to an irresolvable syntax conflict with the new queuing subsystem.
Once queue definitions are in place, you integrate traffic shaping into
your rule set by rewriting your pass or match rules to assign traffic to a specific queue. Any traffic that you don’t explicitly assign to a specific queue
gets lumped in with everything else in the default queue.

Queue Schedulers, aka Queue Disciplines
In the default networking setup, with no queuing, the TCP/IP stack and its
filtering subsystem process the packets according to the FIFO discipline.
ALTQ offers three queue-scheduler algorithms, or disciplines, that can
alter this behavior slightly. The types are priq, cbq, and hfsc. Of these, cbq
and hfsc queues can have several levels of subqueues. The priq queues are
essentially flat, with only one queue level. Each of the disciplines has its own
syntax specifics, and we’ll address those in the following sections.
priq
Priority-based queues are defined purely in terms of priority within the
total declared bandwidth. For priq queues, the allowed priority range is

## 134. Chapter 7

0 through 15, where a higher value earns preferential treatment. Packets
that match the criteria for higher-priority queues are serviced before the
ones matching lower-priority queues.
cbq
Class-based queues are defined as constant-sized bandwidth allocations, as a
percentage of the total available or in units of kilobits, megabits, or gigabits per second. A cbq queue can be subdivided into queues that are also
assigned priorities in the range 0 to 7, and again, a higher priority means
preferential treatment.
hfsc
The hfsc discipline uses the HFSC algorithm to ensure a “fair” allocation of
bandwidth among the queues in a hierarchy. HFSC comes with the possibility of setting up queuing regimes with guaranteed minimum allocations
and hard upper limits. Allocations can even vary over time, and you can
even have fine-grained priority with a 0 to 7 range.
Because both the algorithm and the corresponding setup with ALTQ
are fairly complicated, with a number of tunable parameters, most ALTQ
practitioners tend to stick with the simpler queue types. Yet the ones who
claim to understand HFSC swear by it.

Setting Up ALTQ
Enabling ALTQ may require some extra steps, depending on your choice of
operating system.
ALTQ on OpenBSD
On OpenBSD 5.5, all supported queue disciplines are compiled into the
GENERIC and GENERIC.MP kernels. Check that your OpenBSD version
still supports ALTQ. If so, the only configuration you need to do involves
editing your pf.conf.
ALTQ on FreeBSD
On FreeBSD, make sure that your kernel has ALTQ and the ALTQ queue
discipline options compiled in. The default FreeBSD GENERIC kernel
doesn’t have ALTQ options enabled, as you may have noticed from the messages you saw when running the /etc/rc.d/pf script to enable PF. The relevant
options are as follows:

ALTQ
ALTQ_CBQ
ALTQ_RED
ALTQ_RIO
ALTQ_HFSC
ALTQ_PRIQ
ALTQ_NOPCC

Traffic Shaping with Queues and Priorities   135

The ALTQ option is needed to enable ALTQ in the kernel, but on SMP
systems, you also need the ALTQ_NOPCC option. Depending on which types of
queues you’ll be using, you’ll need to enable at least one of these: ALTQ_CBQ,
ALTQ_PRIQ, or ALTQ_HFSC. Finally, you can enable the congestion-avoidance
techniques random early detection (RED) and RED In/Out with the ALTQ_RED
and ALTQ_RIO options, respectively. (See the FreeBSD Handbook for information on how to compile and install a custom kernel with these options.)
ALTQ on NetBSD
ALTQ was integrated into the NetBSD 4.0 PF implementation and is
­supported in NetBSD 4.0 and later releases. NetBSD’s default GENERIC
kernel configuration doesn’t include the ALTQ-related options, but the
GENERIC configuration file comes with all relevant options commented
out for easy inclusion. The main kernel options are these:

ALTQ
ALTQ_CBQ
ALTQ_HFSC
ALTQ_PRIQ
ALTQ_RED

The ALTQ option is needed to enable ALTQ in the kernel. Depending on
the types of queues you’ll be using, you must enable at least one of these:
ALTQ_CBQ, ALTQ_PRIQ, or ALTQ_HFSC.
Using ALTQ requires you to compile PF into the kernel because the PF
loadable module doesn’t support ALTQ functionality. (See the NetBSD PF
documentation at http://www.netbsd.org/Documentation/network/pf.html for the
most up-to-date information.)

Priority-Based Queues
The basic concept behind priority-based queues (priq) is fairly straightforward. Within the total bandwidth allocated to the main queue, only traffic
priority matters. You assign queues a priority value in the range 0 through 15,
where a higher value means that the queue’s requests for traffic are serviced
sooner.

Using ALTQ Priority Queues to Improve Performance
Daniel Hartmeier discovered a simple yet effective way to improve the
throughput for his home network by using ALTQ priority queues. Like
many people, he had his home network on an asymmetric connection,
with total usable bandwidth low enough that he wanted better bandwidth
utilization. In addition, when the line was running at or near ­capacity, oddities started appearing. One symptom in particular seemed to suggest room
for improvement: Incoming traffic (downloads, incoming mail, and such)

## 136. Chapter 7

slowed down disproportionately whenever outgoing traffic started—more
than could be explained by measuring the raw amount of data transferred.
It all came back to a basic feature of TCP.
When a TCP packet is sent, the sender expects acknowledgment (in
the form of an ACK packet) from the receiver and will wait a specified
time for it to arrive. If the ACK doesn’t arrive within that time, the sender
assumes that the packet hasn’t been received and resends it. And because
in a default setup, packets are serviced sequentially by the interface as they
arrive, ACK packets, with essentially no data payload, end up waiting in line
while the larger data packets are transferred.
If ACK packets could slip in between the larger data packets, the result
would be more efficient use of available bandwidth. The simplest practical
way to implement such a system with ALTQ is to set up two queues with different priorities and integrate them into the rule set. Here are the relevant
parts of the rule set.
ext_if="kue0"
altq on $ext_if priq bandwidth 100Kb queue { q_pri, q_def }
queue q_pri priority 7
queue q_def priority 1 priq(default)
pass out on $ext_if proto tcp from $ext_if queue (q_def, q_pri)
pass in on $ext_if proto tcp to $ext_if queue (q_def, q_pri)

Here, the priority-based queue is set up on the external interface with
two subordinate queues. The first subqueue, q_pri, has a high-priority value
of 7; the other subqueue, q_def, has a significantly lower-priority value of 1.
This seemingly simple rule set works by exploiting how ALTQ treats
queues with different priorities. Once a connection is set up, ALTQ inspects
each packet’s ToS field. ACK packets have the ToS delay bit set to low, which
indicates that the sender wanted the speediest delivery possible. When ALTQ
sees a low-delay packet and queues of differing priorities are available, it
assigns the packet to the higher-priority queue. This means that the ACK
packets skip ahead of the lower-priority queue and are delivered more
quickly, which in turn means that data packets are serviced more quickly.
The net result is better performance than a pure FIFO configuration with
the same hardware and available bandwidth. (Daniel Hartmeier’s article
about this version of his setup, cited previously, contains a more detailed
analysis.)

Using a match Rule for Queue Assignment
In the previous example, the rule set was constructed the traditional way,
with the queue assignment as part of the pass rules. However, this isn’t the
only way to do queue assignment. When you use match rules (available in
OpenBSD 4.6 and later), it’s incredibly easy to retrofit this simple priorityqueuing regime onto an existing rule set.
Traffic Shaping with Queues and Priorities   137

If you worked through the examples in Chapters 3 and 4, your rule set
probably has a match rule that applies nat-to on your outgoing traffic. To
introduce priority-based queuing to your rule set, you first add the queue
definitions and make some minor adjustments to your outgoing match rule.
Start with the queue definition from the preceding example and adjust
the total bandwidth to local conditions, as shown in here.
altq on $ext_if priq bandwidth $ext_bw queue { q_pri, q_def }
queue q_pri priority 7
queue q_def priority 1 priq(default)

This gives the queues whatever bandwidth allocation you define with
the ext_bw macro.
The simplest and quickest way to integrate the queues into your rule set
is to edit your outgoing match rule to read something like this:
match out on $ext_if from $int_if:network nat-to ($ext_if) queue (q_def, q_pri)

Reload your rule set, and the priority-queuing regime is applied to all
traffic that’s initiated from your local network.
You can use the systat command to get a live view of how traffic is
assigned to your queues.
$ sudo systat queues

This will give you a live display that looks something like this:
QUEUE
q_pri
q_def

Load 0.39 0.27 0.30
BW SCH PR
priq 7
priq

Fri Apr  1 16:33:44 2015
PKTS
21705
12138

BYTES
1392K
6759K

DROP_P

DROP_B QLEN BORRO SUSPE

P/S
12

B/S
803
4620

Looking at the numbers in the PKTS (packets) and BYTES columns, you
see a clear indication that the queuing is working as intended.
The q_pri queue has processed a rather large number of packets in relation to the amount of data, just as we expected. The ACK packets don’t take
up a lot of space. On the other hand, the traffic assigned to the q_def queue
has more data in each packet, and the numbers show essentially the reverse
packet numbers–to–data size ratio as in to the q_pri queue.

systat is a rather capable program on all BSDs, and the OpenBSD version offers several views that are relevant to PF and that aren’t found in the systat variants on the
other systems as of this writing. We’ll be looking at systat again in the next chapter.

In the meantime, read the man pages and play with the program. It’s a very useful
tool for getting to know your system.
