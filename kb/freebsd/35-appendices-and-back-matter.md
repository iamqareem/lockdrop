---
id: freebsd-35
title: "Appendices and Back Matter"
slug: freebsd-35-appendices-and-back-matter
source: "FreeBSD Handbook"
sourceSection: "Part V — Appendices"
topic: "V"
tags: [freebsd, unix, reference, mirrors, bibliography, glossary]
summary: "Where to get FreeBSD, the bibliography, community resources, the OpenPGP keys of the officers and the glossary."
---
# Part V: Appendices

# Appendix A: Obtaining FreeBSD

## A.1. Mirrors

The official mirrors of the FreeBSD project are made up of many machines operated by the project cluster administrators and behind GeoDNS to direct users to the closest available mirror. Current locations are Australia, Brazil, Germany, Japan (two sites), Malaysia, South Africa, Sweden, Taiwan, United Kingdom, United States of America (California, Illinois - two sites, New Jersey, and Washington). Official mirrors service: Service Name

```
Protocols
More information
cgit.FreeBSD.org
https
Web interface for the FreeBSD Git repositories.
docs.FreeBSD.org https
FreeBSD Documentation Portal.
download.FreeBS https ftp
Same content as ftp.FreeBSD.org, ftp is a legacy name;
D.org
download.FreeBSD.org is recommended.
git.FreeBSD.org
git over https and
ssh
More details on using git section.
pkg.FreeBSD.org
pkg(8) over http
Official FreeBSD package repositories used by the pkg(8)
and https
program.
vuxml.FreeBSD.o https
FreeBSD Project VuXML web page. pkg audit fetches the
rg /
list of vulnerabilities from this service.
www.VuXML.org
www.FreeBSD.or https
```

FreeBSD Website.

g All official mirrors support IPv4 and IPv6. http://ftp-archive.FreeBSD.org is not in the GeoDNS Infrastructure, hosted in only one location (US). The project is looking for new locations; those willing to sponsor, please reach out to the Cluster Administrators team for more information. Mirror list maintained by the community and other companies: Country

```
Hostname
Protocols
Australia 
```

ftp.au.FreeBSD.org http http_v6 rsync rsync_v6 ftp3.au.FreeBSD.or http ftp rsync g

```
Austria 
ftp.at.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6
Brazil 
ftp2.br.FreeBSD.or http rsync rsync_v6
g
Country
```

Hostname

Protocols

```
ftp3.br.FreeBSD.or http ftp rsync
g
Bulgaria 
ftp.bg.FreeBSD.org ftp ftp_v6 rsync rsync_v6
Czech Republic 
ftp.cz.FreeBSD.org http http_v6 rsync rsync_v6
Denmark 
ftp.dk.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6
Finland 
ftp.fi.FreeBSD.org
France 
ftp.fr.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6
ftp
ftp3.fr.FreeBSD.or ftp
g
ftp6.fr.FreeBSD.or http ftp rsync
g
Germany 
```

ftp.de.FreeBSD.org ftp ftp_v6 rsync rsync_v6 ftp1.de.FreeBSD.or http http_v6 ftp ftp_v6 rsync rsync_v6 g ftp2.de.FreeBSD.or http http_v6 ftp ftp_v6 rsync rsync_v6 g ftp5.de.FreeBSD.or ftp ftp_v6 g ftp7.de.FreeBSD.or http http_v6 ftp ftp_v6 g

Greece 

ftp.gr.FreeBSD.org http http_v6 ftp ftp_v6 ftp2.gr.FreeBSD.or http http_v6 ftp ftp_v6 rsync g

Japan 

ftp.jp.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6 ftp2.jp.FreeBSD.or ftp rsync rsync_v6 g ftp3.jp.FreeBSD.or http rsync g ftp4.jp.FreeBSD.or ftp g ftp6.jp.FreeBSD.or http http_v6 ftp ftp_v6 rsync rsync_v6 g

```
Kazakhstan 
mirror.ps.kz
http ftp
mirror.neolabs.kz http ftp
Korea 
```

ftp.kr.FreeBSD.org http https ftp rsync ftp2.kr.FreeBSD.or rsync g Country

```
Hostname
Protocols
Latvia 
ftp.lv.FreeBSD.org http ftp
Netherlands 
```

ftp.nl.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6 ftp2.nl.FreeBSD.or http ftp rsync g mirror.nl.altushos https t.com

```
New Zealand 
ftp.nz.FreeBSD.org http ftp
Norway 
ftp.no.FreeBSD.org ftp ftp_v6 rsync rsync_v6
Poland 
ftp.pl.FreeBSD.org http http_v6 ftp rsync rsync_v6
Russia 
```

ftp.ru.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6 ftp2.ru.FreeBSD.or https ftp rsync g

```
Slovenia 
ftp.si.FreeBSD.org
http http_v6 ftp ftp_v6
South Africa 
```

ftp.za.FreeBSD.org https https_v6 rsync rsync_v6 ftp2.za.FreeBSD.or http http_v6 ftp_v6 g ftp4.za.FreeBSD.or http ftp rsync g

Sweden 

ftp.se.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6 mirror.se.altushos https t.com

Taiwan 

```
ftp4.tw.FreeBSD.or https ftp rsync
g
ftp5.tw.FreeBSD.or http ftp
g
Ukraine 
ftp.ua.FreeBSD.org http ftp ftp_v6 rsync rsync_v6
United Kingdom
```

ftp.uk.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6 ftp2.uk.FreeBSD.or http http_v6 https https_v6 ftp ftp_v6 g

United States of

ftp11.FreeBSD.org http http_v6 ftp ftp_v6 rsync rsync_v6

America  ftp14.FreeBSD.org ftp rsync (Former official tier 1) ftp5.FreeBSD.org

http http_v6 ftp ftp_v6

The current list of protocols supported by the community mirrors was last updated on 2022-01-31, and it’s not guaranteed.

## A.2. Using Git

### A.2.1. Introduction

As of December 2020, FreeBSD uses git as the primary version control system for storing all of FreeBSD’s base source code and documentation. As of April 2021, FreeBSD uses git as the only version control system for storing all of FreeBSD’s Ports Collection.

> Git is generally a developer tool. Users may prefer to use freebsd-update (“FreeBSD Update”) to update the FreeBSD base system.

This section demonstrates how to install Git on a FreeBSD system and use it to create a local copy of a FreeBSD source code repository.

### A.2.2. Installation

Git can be installed from the Ports Collection, or as a package:

```
# pkg install git
```

### A.2.3. Running Git

To fetch a clean copy of the sources into a local directory, use git clone. This directory of files is called the working tree. Git uses URLs to designate a repository. There are three different repositories, src for the FreeBSD system source code, doc for documentation, and ports for the FreeBSD Ports Collection. All three are reachable

```
over
two
different
protocols:
HTTPS
and
SSH.
For
example,
the
URL
```

https://git.FreeBSD.org/src.git specifies the main branch of the src repository, using the https protocol. Table 49. FreeBSD Git Repository URL Table

```
Item
Git URL
Read-only src repo via HTTPS
https://git.FreeBSD.org/src.git
Read-only src repo via anon-ssh
ssh://anongit@git.FreeBSD.org/src.git
Read-only doc repo via HTTPS
https://git.FreeBSD.org/doc.git
Read-only doc repo via anon-ssh
ssh://anongit@git.FreeBSD.org/doc.git
Read-only ports repo via HTTPS
https://git.FreeBSD.org/ports.git
```

Read-only ports repo via anon-ssh

ssh://anongit@git.FreeBSD.org/ports.git

External mirrors maintained by project members are also available; please refer to the External mirrors section. To clone a copy of the FreeBSD system source code repository:

```
# git clone -o freebsd https://git.FreeBSD.org/src.git /usr/src
```

The -o freebsd option specifies the origin; by convention in the FreeBSD documentation, the origin is assumed to be freebsd. Because the initial checkout must download the full branch of the remote repository, it can take a while. Please be patient. Initially, the working tree contains source code for the main branch, which corresponds to CURRENT. To switch to 13-STABLE instead:

```
# cd /usr/src
# git checkout stable/13
```

The working tree can be updated with git pull. To update /usr/src created in the example above, use:

```
# cd /usr/src
# git pull --rebase
```

The update is much quicker than a checkout, only transferring files that have changed.

### A.2.4. Web-based repository browser

The FreeBSD project uses cgit as the web-based repository browser: https://cgit.FreeBSD.org/.

### A.2.5. For Developers

For information about write access to repositories see the Committer’s Guide.

### A.2.6. External mirrors

Those mirrors are not hosted in FreeBSD.org but still maintained by the project members. Users and developers are welcome to pull or browse repositories on those mirrors. Pull requests for the doc and src GitHub repositories are being accepted; otherwise, the project workflow with those mirrors is still under discussion. Codeberg

- doc: https://codeberg.org/FreeBSD/freebsd-doc
- ports: https://codeberg.org/FreeBSD/freebsd-ports
- src: https://codeberg.org/FreeBSD/freebsd-src

  GitHub

- doc: https://github.com/freebsd/freebsd-doc
- ports: https://github.com/freebsd/freebsd-ports
- src: https://github.com/freebsd/freebsd-src

  GitLab

- doc: https://gitlab.com/FreeBSD/freebsd-doc
- ports: https://gitlab.com/FreeBSD/freebsd-ports
- src: https://gitlab.com/FreeBSD/freebsd-src

### A.2.7. Mailing lists

The main mailing list for general usage and questions about git in the FreeBSD project is freebsdgit. For more details, including commit messages lists, see the Mailing Lists chapter.

### A.2.8. SSH host keys

- gitrepo.FreeBSD.org host key fingerprints:
  - ECDSA key fingerprint is SHA256:seWO5D27ySURcx4bknTNKlC1mgai0whP443PAKEvvZA
  - ED25519 key fingerprint is SHA256:lNR6i4BEOaaUhmDHBA1WJsO7H3KtvjE2r5q4sOxtIWo
  - RSA key fingerprint is SHA256:f453CUEFXEJAXlKeEHV+ajJfeEfx9MdKQUD7lIscnQI
- git.FreeBSD.org host key fingerprints:
  - ECDSA key fingerprint is SHA256:/UlirUAsGiitupxmtsn7f9b7zCWd0vCs4Yo/tpVWP9w
  - ED25519 key fingerprint is SHA256:y1ljKrKMD3lDObRUG3xJ9gXwEIuqnh306tSyFd1tuZE
  - RSA key fingerprint is SHA256:jBe6FQGoH4HjvrIVM23dcnLZk9kmpdezR/CvQzm7rJM These are also published as SSHFP records in DNS.

## A.3. Disc Copies

FreeBSD disc copies are available from several online retailers:

- FreeBSD Mall, Inc.

  1164 Claremont Dr Brentwood, CA 94513 USA Phone: +1 925 240-6652 Fax: +1 925 674-0821 Email: info@freebsdmall.com Website: https://www.freebsdmall.com

- Getlinux

  Website: https://www.getlinux.fr/

- Dr. Hinner EDV

  Schäftlarnstr. 10 // 4. Stock D-81371 München Germany Phone: +49 171 417 544 6 Email: infow@hinner.de Website: http://www.hinner.de/linux/freebsd.html

# Appendix B: Bibliography

While manual pages provide a definitive reference for individual pieces of the FreeBSD operating system, they seldom illustrate how to put the pieces together to make the whole operating system run smoothly. For this, there is no substitute for a good book or users' manual on UNIX® system administration.

## B.1. FreeBSD Bibliography

- Absolute FreeBSD: The Complete Guide To FreeBSD, Third Edition, published by No Starch Press, 2018. ISBN: 978-1593278922
- FreeBSD Mastery: Storage Essentials, published by Tilted Windmill Press, 2014. ISBN: 9781642350098
- FreeBSD Mastery: Specialty Filesystems, published by Tilted Windmill Press, 2015. ISBN: 9781642350111
- FreeBSD Mastery: ZFS, published by Tilted Windmill Press, 2015. ISBN: 978-1642350005
- FreeBSD Mastery: Advanced ZFS, published by Tilted Windmill Press, 2016. ISBN: 9780692688687
- FreeBSD Mastery: Jails, published by Tilted Windmill Press, 2019. ISBN: 978-1642350241
- FreeBSD Device Drivers: A Guide for the Intrepid, published by No Starch Press, 2012. ISBN: 978-1593272043
- The Design And Implementation Of The Freebsd Operating System, Second Edition, published by Pearson Education, Inc., 2014. ISBN: 978-0321968975
- UNIX and Linux System Administration Handbook, Fifth Edition, published by Pearson Education, Inc., 2017. ISBN: 978-0134277554
- Designing BSD Rootkits, published by No Starch Press, 2007. ISBN: 978-1593271428
- FreeBSD Jails using VNETs, published in gumroad

## B.2. Security Reference

- The Book of PF: A No-Nonsense Guide to the OpenBSD Firewall, Third Edition, published by No Starch Press, 2014. ISBN: 978-1593275891
- SSH Mastery: OpenSSH, PuTTY, Tunnels, and Keys, Second Edition, 2018. ISBN: 9781642350029

## B.3. UNIX® History

- Lion, John Lion’s Commentary on UNIX, 6th Ed. With Source Code. ITP Media Group, 1996. ISBN 1573980137
- Raymond, Eric S. The New Hacker’s Dictionary, 3rd edition. MIT Press, 1996. ISBN 0-262-68092-0. Also known as the Jargon File
- Salus, Peter H. A quarter century of UNIX. Addison-Wesley Publishing Company, Inc., 1994. ISBN 0-201-54777-5
- Simon Garfinkel, Daniel Weise, Steven Strassmann. The UNIX-HATERS Handbook. IDG Books Worldwide, Inc., 1994. ISBN 1-56884-203-1. Out of print, but available online.
- Don Libes, Sandy Ressler Life with UNIX - special edition. Prentice-Hall, Inc., 1989. ISBN 0-13536657-7
- The

```
BSD
family
tree.
https://cgit.freebsd.org/src/tree/share/misc/bsd-family-tree
```

or

/usr/share/misc/bsd-family-tree on a FreeBSD machine.

- Networked Computer Science Technical Reports Library.
- Old

```
BSD
releases
from
the
Computer
Systems
Research
group
(CSRG).
```

http://www.mckusick.com/csrg/: The 4CD set covers all BSD versions from 1BSD to 4.4BSD and 4.4BSD-Lite2 (but not 2.11BSD, unfortunately). The last disk also holds the final sources plus the SCCS files.

- Kernighan, Brian Unix: A History and a Memoir. Kindle Direct Publishing, 2020. ISBN 978169597855-3

## B.4. Periodicals, Journals, and Magazines

- Admin Magazin (in German), published by Medialinx AG. ISSN: 2190-1066
- BSD Now - Video Podcast, published by Jupiter Broadcasting LLC
- FreeBSD Journal, published by S&W Publishing, sponsored by The FreeBSD Foundation. ISBN: 978-0-615-88479-0

# Appendix C: Resources on the Internet

Development of FreeBSD is too rapid for print media to be practical for keeping people informed. For awareness of developments: electronic alternatives to print are best. The FreeBSD user community provides much technical support — with forums, chat and email amongst the most popular and effective means of communication. The most important points of contact are outlined below. The Community wiki area may be more up-to-date. Please make the FreeBSD documentation project mailing list aware of any resource that is either redundant, or not yet listed below.

## C.1. Websites

- The FreeBSD Forums provide a web based discussion forum for FreeBSD questions and technical discussion.
- The FreeBSD Wiki provides various bits of information that hadn’t yet made it into the Handbook.
- The Documentation Portal offers much more than the FreeBSD Handbook alone; there are more than forty books and articles.
- The FreeBSD Journal is a free, professionally-edited, bi-monthly technical magazine released by The FreeBSD Foundation.
- The BSDConferences YouTube Channel provides a collection of high quality videos from BSD conferences around the world. This is a great way to watch key developers give presentations about new work in FreeBSD.
- FreeBSD Status Reports are released every three months and track progress of FreeBSD development.
- There’s a FreeBSD-focused Reddit group at r/freebsd.
- Super User and Server Fault, the Stack Exchange services for system administrators.
- FreeBSD Discord server, a communications and community-building service, where FreeBSD community members can socialise, obtain support or support others, learn, contribute, collaborate, and stay up to date with all things FreeBSD-related.
- IRC channels, a widely implemented, technically mature, open standard text chat.

## C.2. Mailing Lists

The mailing lists are the most direct way of addressing questions or opening a technical discussion to a concentrated FreeBSD audience. There are a wide variety of lists on a number of different FreeBSD topics. Sending questions to the most appropriate mailing list will invariably assure a faster and more accurate response. Technical list threads should remain technical.

All users and developers of FreeBSD should subscribe to the FreeBSD announcements mailing list.

> To test FreeBSD mailing list capabilities, aim for the FreeBSD test mailing list. Please do not send test messages to any other list.

When in doubt about what list to post a question to, see How to get best results from the FreeBSDquestions mailing list. Before posting to any list, please:

- learn about how to best use the mailing lists, such as how to help avoid frequently-repeated discussions, by reading the Mailing List Frequently Asked Questions (FAQ) document
- search the archives, to tell whether someone else has already posted what you intend to post. Archive search interfaces include:
- https://lists.freebsd.org/search (FreeBSD, experimental)
- https://www.freebsd.org/search/ (DuckDuckGo)

  Note that this also means that messages sent to FreeBSD mailing lists are archived in perpetuity. When protecting privacy is a concern, consider using a disposable secondary email address and posting only public information. FreeBSD-provided archives:

- do not present links as links
- do not present inline images
- do not present HTML content of HTML messages.

  The FreeBSD public mailing lists can be consulted here.

### C.2.1. How to Subscribe or Unsubscribe

At https://lists.freebsd.org, click the name of a list to reveal its options. To post, after subscribing, send mail to listname@FreeBSD.org. The message will be redistributed to list members.

### C.2.2. Lists Basic Rules

All FreeBSD mailing lists have certain basic rules which must be adhered to by anyone using them. Failure to comply with these guidelines will result in two (2) written warnings from the FreeBSD Postmaster postmaster@FreeBSD.org, after which, on a third offense, the poster will removed from all FreeBSD mailing lists and filtered from further posting to them. We regret that such rules and measures are necessary at all, but today’s Internet is a pretty harsh environment, it would seem, and many fail to appreciate just how fragile some of its mechanisms are. Rules of the road:

- The topic of any posting should adhere to the basic description of the list it is posted to. If the list is about technical issues, the posting should contain technical discussion. Ongoing irrelevant chatter or flaming only detracts from the value of the mailing list for everyone on it and will not be tolerated. For free-form discussion on no particular topic, the FreeBSD chat mailing list is freely available and should be used instead.
- No posting should be made to more than 2 mailing lists, and only to 2 when a clear and obvious need to post to both lists exists. For most lists, there is already a great deal of subscriber overlap and except for the most esoteric mixes (say "-stable & -scsi"), there really is no reason to post to more than one list at a time. If a message is received with multiple mailing lists on the Cc line, trim the Cc line before replying. The person who replies is still responsible for cross-posting, no matter who the originator might have been.
- Personal attacks and profanity (in the context of an argument) are not allowed, and that includes users and developers alike. Gross breaches of netiquette, like excerpting or reposting private mail when permission to do so was not and would not be forthcoming, are frowned upon but not specifically enforced.
- Advertising of non-FreeBSD related products or services is strictly prohibited and will result in an immediate ban if it is clear that the offender is advertising by spam.

### C.2.3. Filtering on the Mailing Lists

The FreeBSD mailing lists are filtered in multiple ways to avoid the distribution of spam, viruses, and other unwanted emails. The filtering actions described in this section do not include all those used to protect the mailing lists. Only certain types of attachments are allowed on the mailing lists. All attachments with a MIME content type not found in the list below will be stripped before an email is distributed on the mailing lists.

- application/octet-stream
- application/pdf
- application/pgp-signature
- application/x-pkcs7-signature
- message/rfc822
- multipart/alternative
- multipart/related
- multipart/signed
- text/html
- text/plain
- text/x-diff
- text/x-patch

> Some of the mailing lists might allow attachments of other MIME content types, but the above list should be applicable for most of the mailing lists.

If a multi-part message includes text/plain and text/html parts:

- addressees will receive both parts
- lists.freebsd.org will present text/plain with an option to view original text (source, with raw HTML amongst the parts).

  If text/plain does not accompany text/html:

- there will be conversion from HTML to plain text.

## C.3. Usenet Newsgroups

In addition to two FreeBSD specific newsgroups, there are many others in which FreeBSD is discussed or are otherwise relevant to FreeBSD users.

### C.3.1. BSD Specific Newsgroups

- comp.unix.bsd.freebsd.announce
- comp.unix.bsd.freebsd.misc
- de.comp.os.unix.bsd (German)
- fr.comp.os.bsd (French)

### C.3.2. Other UNIX® Newsgroups of Interest

- comp.unix
- comp.unix.questions
- comp.unix.admin
- comp.unix.programmer
- comp.unix.shell
- comp.unix.misc
- comp.unix.bsd

### C.3.3. X Window System

- comp.windows.x

# Appendix D: OpenPGP Keys

The OpenPGP keys of the FreeBSD.org officers are shown here. These keys can be used to verify a signature or send encrypted email to one of the officers. A full list of FreeBSD OpenPGP keys is available in the PGP Keys article. The complete keyring can be downloaded at pgpkeyring.txt.

## D.1. Officers

### D.1.1. Security Officer Team <security-officer@FreeBSD.org>

```
pub
uid
sub
sub
rsa4096/D9AD2A18057474CB 2022-12-11 [C] [expires: 2026-01-24]
Key fingerprint = 0BE3 3275 D74C 953C 79F8 1107 D9AD 2A18 0574 74CB
FreeBSD Security Officer <security-officer@freebsd.org>
rsa4096/6E58DE901F001AEF 2022-12-11 [S] [expires: 2026-01-15]
rsa4096/46DB26D62F6039B7 2022-12-11 [E] [expires: 2026-01-15]
```

-----BEGIN PGP PUBLIC KEY BLOCK----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

```
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
x+JYcxmrZXndSMObd0IiWOhwXlgarbJJMReOORg=
=cYaK
```

-----END PGP PUBLIC KEY BLOCK-----

### D.1.2. Core Team Secretary <core-secretary@FreeBSD.org> pub

```
rsa4096/4D632518C3546B05 2024-02-17 [SC] [expires: 2028-02-08]
Key fingerprint = 1A23 6A92 528D 00DD 7965 76FE 4D63 2518 C354 6B05
uid
```

FreeBSD Core Team Secretary <coresecretary@FreeBSD.org> sub rsa4096/CABFDE12CA516ED2 2024-02-17 [E] [expires: 2028-02-08]

-----BEGIN PGP PUBLIC KEY BLOCK----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 GRFZYciqIoG4n3tl8Pob15vFlVqk47rRqg== =8TzT -----END PGP PUBLIC KEY BLOCK-----

### D.1.3. Ports Management Team Secretary <portmgr-secretary@FreeBSD.org> pub

```
ed25519/E3C401F60D709D59 2023-03-06 [SC] [expires: 2027-03-05]
Key fingerprint = BED4 A1D3 6555 B681 2E9F ABDA E3C4 01F6 0D70 9D59
uid
```

FreeBSD Ports Management Team Secretary <portmgrsecretary@FreeBSD.org> sub cv25519/2C92B55E27A641C3 2023-03-06 [E] [expires: 2027-03-05]

-----BEGIN PGP PUBLIC KEY BLOCK----mDMEZAXJvxYJKwYBBAHaRw8BAQdASFAC20WL3R1T6uNyGMZbfJCxDkcP4C5vi3Op tcZ2fbq0R0ZyZWVCU0QgUG9ydHMgTWFuYWdlbWVudCBUZWFtIFNlY3JldGFyeSA8 cG9ydG1nci1zZWNyZXRhcnlARnJlZUJTRC5vcmc+iJYEExYKAD4WIQS+1KHTZVW2 gS6fq9rjxAH2DXCdWQUCZAXJvwIbAwUJB4TOAAULCQgHAwUVCgkICwUWAwIBAAIe BQIXgAAKCRDjxAH2DXCdWYN1AP43TjyfZtZ3DLYT++g0+SuPsoO/3yWVybA+UmFL zb8MngEA+LLNUfvEwCuXS/soh+ww5bpfmi3UUmeGiQEAXug3iA+JATMEEAEKAB0W IQT7N0XIbxXo7ayBMvzYKU7Du8TX1QUCZAXLkwAKCRDYKU7Du8TX1XHMB/9R1MX4 6zMgpKqPPt76GOI+eGEdBK6bY8aJZjQGdqTh9f6VtXVoTGIG7cvhc9X8tDBoB0PT 2KZWheF51AV1+NHU4HwLAQ1BMebrFvWSfkw4xg4fBGwDhz9/GN85No+Js772V5ey 8lRiL6meRVWxMlLyWcxGd8JjcC5yX/iAUQ3SBGCLqW7unWjjg7CTd+AMBwcqPGrv ax8q6eFVguJcHJAjMnKf6HAy4cpK3s+uMoUBCGnszSN12B3ysKfyC4pNO/pix5tA Q5v8aRqTeFPh5zmNhWo0KGPzplTPqRQSHDl7GDQC8Ru3MhzFkeWzHsexjZVwS6W2 DPcYpuuAsA0XOZIZiQIzBBABCgAdFiEEEBpxaxYrAOVb7eoFrbv4YQo3ibcFAmQF 0u0ACgkQrbv4YQo3ibccwg/9F2Xuic3nhKxRbB3mJeDo6SYQETa/Gh1qQ34+8zlt 8UMazOx67gnYQfy+pXjro6eQ2up0a4eUYezcNOudqAQD21nRz3HA6EQVNcE/TzEA xl5CJntTaLOt7S+EDXFW5BuQIvhhoMGgm8+WNVgA0EJ7tfL0OcYBSvr19fqwChEn 9c14cSk6mgHSsleP5NvskYN053pxHwy0LTSb8YBBv52th37t/CRFC1363rS5q+D7 JixFopd1O5pKpA5ipvE4gGgRjPtwjx0SjjepwK/3fuhEJQQyKzTIKlMfu2Dj/iR2 Li1Sfccau5LQXOj9fUITU3u1YG7yrm8VGzT7ao4d+KRwgMLjd2pLqiGIbbJwGBiP FRmtilWQoeIlmSlFX4obAA517DOK0pW1mH8+eEn4EJd3SekT3yzFyKTASv0J48Z8 3F928xg+eZvHxVC0t1J+J5IG0gt3EEncuWKIPQGR7PiQbti6R3FQVTz6WfMWOebP Qi0E9F/Aqakr6Vj2sKGrDq+ebpaF5G8Yw1YrUl2IDiPzkCegp3ZbI0wh11Xvzhi8 LXPQGK4jBQas4G8cegfitzmtdGRHYrbMv0R9I4mvaL+WlOuD2AvyVG28lguqVhnN AZP+ohdquYyX2CNCVvbKWAtXo6Ur0vWG8BL8m6defAtEkIwVBALaOHQOSI3aNUz4 lwy4OARkBcm/EgorBgEEAZdVAQUBAQdAsefmSfxEOdOr02+K/6noYCuJ1FeAWVz6 jFYQ+9w6jggDAQgHiH4EGBYKACYWIQS+1KHTZVW2gS6fq9rjxAH2DXCdWQUCZAXJ vwIbDAUJB4TOAAAKCRDjxAH2DXCdWRl4AP9h5ot212BK29S6ZcMBhHvmtF5PG1oD c7LnZycSRmbFiwEAndCMpAGOhDW8iVgDd0wLQq/ZMPe+xccfG1b3zFH2EgE= =iiAT -----END PGP PUBLIC KEY BLOCK-----

### D.1.4. doceng-secretary@FreeBSD.org pub

```
rsa2048/E1C03580AEB45E58 2019-10-31 [SC] [expires: 2022-10-30]
Key fingerprint = F24D 7B32 B864 625E 5541 A0E4 E1C0 3580 AEB4 5E58
uid
```

FreeBSD Doceng Team Secretary <docengsecretary@freebsd.org> sub rsa2048/9EA8D713509472FC 2019-10-31 [E] [expires: 2022-10-30]

-----BEGIN PGP PUBLIC KEY BLOCK----mQENBF27FFcBCADeoSsIgyQUY8vREwkTikwFFlNg31MVy5s/Nq1cNK1PRfRMnprS yfB62KqbYuz16bmQKaA9zHN4FGfiTvR6tl66LVHm1s/5HPiLv8sP14GsruLro9zN v72dO7a9i68bMw+jarPOnu9dGiDFEI0dACOkdCGEYKEUapQeNpmWRrQ46BeXyFwF JcNx76bJJUkwk6fWC0W63D762e6lCEX6ndoaPjjLBnFvtx13heNGUc8RukBwe2mA U5pSGHj47J05bdWiRSwZaXa8PcW+20zTWaP755w7zWe4h60GANY7OsT9nuOqsioJ QonxTrJuZweKRV8fNQ1EfDws3HZr7/7iXvO3ABEBAAG0PEZyZWVCU0QgRG9jZW5n IFRlYW0gU2VjcmV0YXJ5IDxkb2Nlbmctc2VjcmV0YXJ5QGZyZWVic2Qub3JnPokB VAQTAQoAPhYhBPJNezK4ZGJeVUGg5OHANYCutF5YBQJduxRXAhsDBQkFo5qABQsJ CAcDBRUKCQgLBRYDAgEAAh4BAheAAAoJEOHANYCutF5YB2IIALw+EPYmOz9qlqIn oTFmk/5MrcdzC5iLEfxubbF6TopDWsWPiOh5mAuvfEmROSGf6ctvdYe9UtQV3VNY KeeyskeFrIBOFo2KG/dFqKPAWef6IfhbW3HWDWo5uOBg01jHzQ/pB1n6SMKiXfsM idL9wN+UQKxF3Y7S/bVrZTV0isRUolO9+8kQeSYT/NMojVM0H2fWrTP/TaNEW4fY JBDAl5hsktzdl8sdbNqdC0GiX3xb4GvgVzGGQELagsxjfuXk6PfOyn6Wx2d+yRcI FrKojmhihBp5VGFQkntBIXQkaW0xhW+WBGxwXdaAl0drQlZ3W+edgdOl705x73kf Uw3Fh2a5AQ0EXbsUVwEIANEPAsltM4vFj2pi5xEuHEcZIrIX/ZJhoaBtZkqvkB+H 4pu3/eQHK5hg0Dw12ugffPMz8mi57iGNI9TXd8ZYMJxAdvEZSDHCKZTX9G+FcxWa

```
/AzKNiG25uSISzz7rMB/lV1gofCdGtpHFRFTiNxFcoacugTdlYDiscgJZMJSg/hC
GXBdEKXR5WRAgAGandcL8llCToOt1lZEOkd5vJM861w6evgDhAZ2HGhRuG8/NDxG
r4UtlnYGUCFof/Q4oPNbDJzmZXF+8OQyTNcEpVD3leEOWG1Uv5XWS2XKVHcHZZ++
ISo/B5Q6Oi3SJFCVV9f+g09YF+PgfP/mVMBgif2fT20AEQEAAYkBPAQYAQoAJhYh
BPJNezK4ZGJeVUGg5OHANYCutF5YBQJduxRXAhsMBQkFo5qAAAoJEOHANYCutF5Y
kecIAMTh2VHQqjXHTszQMsy3NjiTVVITI3z+pzY0u2EYmLytXQ2pZMzLHMcklmub
5po0X4EvL6bZiJcLMI2mSrOs0Gp8P3hyMI40IkqoLMp7VA2LFlPgIJ7K5W4oVwf8
khY6lw7qg2l69APm/MM3xAyiL4p6MU8tpvWg5AncZ6lxyy27rxVflzEtCrKQuG/a
oVaOlMjH3uxvOK6IIxlhvWD0nKs/e2h2HIAZ+ILE6ytS5ZEg2GXuigoQZdEnv71L
xyvE9JANwGZLkDxnS5pgN2ikfkQYlFpJEkrNTQleCOHIIIp8vgJngEaP51xOIbQM
CiG/y3cmKQ/ZfH7BBvlZVtZKQsI=
=MQKT
```

-----END PGP PUBLIC KEY BLOCK----- FreeBSD Glossary This glossary contains terms and acronyms used within the FreeBSD community and documentation.

```
A
ACL
See Access Control List.
ACPI
```

See Advanced Configuration and Power Interface. AMD See Automatic Mount Daemon. AML See ACPI Machine Language. API See Application Programming Interface. APIC See Advanced Programmable Interrupt Controller. APM See Advanced Power Management. APOP See Authenticated Post Office Protocol. ASL See ACPI Source Language. ATA See Advanced Technology Attachment. ATM See Asynchronous Transfer Mode. ACPI Machine Language Pseudocode, interpreted by a virtual machine within an ACPI-compliant operating system, providing a layer between the underlying hardware and the documented interface presented to the OS. ACPI Source Language The programming language AML is written in.

Access Control List A list of permissions attached to an object, usually either a file or a network device. Advanced Configuration and Power Interface A specification which provides an abstraction of the interface the hardware presents to the operating system, so that the operating system should need to know nothing about the underlying hardware to make the most of it. ACPI evolves and supersedes the functionality provided previously by APM, PNPBIOS and other technologies, and provides facilities for controlling power consumption, machine suspension, device enabling and disabling, etc. Application Programming Interface A set of procedures, protocols and tools that specify the canonical interaction of one or more program parts; how, when and why they do work together, and what data they share or operate on. Advanced Power Management An API enabling the operating system to work in conjunction with the BIOS in order to achieve power management. APM has been superseded by the much more generic and powerful ACPI specification for most applications. Advanced Programmable Interrupt Controller

```
Advanced Technology Attachment
Asynchronous Transfer Mode
Authenticated Post Office Protocol
```

Automatic Mount Daemon A daemon that automatically mounts a filesystem when a file or directory within that filesystem is accessed.

```
B
BAR
See Base Address Register.
BIND
```

See Berkeley Internet Name Domain. BIOS See Basic Input/Output System.

```
BSD
See Berkeley Software Distribution.
Base Address Register
```

The registers that determine which address range a PCI device will respond to. Basic Input/Output System The definition of BIOS depends a bit on the context. Some people refer to it as the ROM chip with a basic set of routines to provide an interface between software and hardware. Others refer to it as the set of routines contained in the chip that help in bootstrapping the system. Some might also refer to it as the screen used to configure the bootstrapping process. The BIOS is PC-specific but other systems have something similar. Berkeley Internet Name Domain An implementation of the DNS protocols. Berkeley Software Distribution This is the name that the Computer Systems Research Group (CSRG) at The University of California at Berkeley gave to their improvements and modifications to AT&T’s 32V UNIX®. FreeBSD is a descendant of the CSRG work. Bikeshed Building A phenomenon whereby many people will give an opinion on an uncomplicated topic, whilst a complex topic receives little or no discussion. See the FAQ for the origin of the term.

```
C
CD
See Carrier Detect.
CHAP
```

See Challenge Handshake Authentication Protocol. CLIP See Classical IP over ATM. COFF See Common Object File Format. CPU See Central Processing Unit. CTS See Clear To Send. Carrier Detect An RS232C signal indicating that a carrier has been detected.

Central Processing Unit Also known as the processor. This is the brain of the computer where all calculations take place. There are a number of different architectures with different instruction sets. Among the more well-known are the Intel-x86 and derivatives, Arm, and PowerPC. Challenge Handshake Authentication Protocol A method of authenticating a user, based on a secret shared between client and server. Classical IP over ATM

Clear To Send An RS232C signal giving the remote system permission to send data. See Also Request To Send. Common Object File Format

```
D
DAC
See Discretionary Access Control.
DDB
See Debugger.
DES
See Data Encryption Standard.
DHCP
```

See Dynamic Host Configuration Protocol. DNS See Domain Name System. DSDT See Differentiated System Description Table. DSR See Data Set Ready. DTR See Data Terminal Ready. DVMRP See Distance-Vector Multicast Routing Protocol.

Discretionary Access Control

Data Encryption Standard A method of encrypting information, traditionally used as the method of encryption for UNIX® passwords and the crypt(3) function. Data Set Ready An RS232C signal sent from the modem to the computer or terminal indicating a readiness to send and receive data. See Also Data Terminal Ready. Data Terminal Ready An RS232C signal sent from the computer or terminal to the modem indicating a readiness to send and receive data. Debugger An interactive in-kernel facility for examining the status of a system, often used after a system has crashed to establish the events surrounding the failure. Differentiated System Description Table An ACPI table, supplying basic configuration information about the base system. Distance-Vector Multicast Routing Protocol

Domain Name System The system that converts humanly readable hostnames (i.e., mail.example.net) to Internet addresses and vice versa. Dynamic Host Configuration Protocol A protocol that dynamically assigns IP addresses to a computer (host) when it requests one from the server. The address assignment is called a “lease”.

```
E
ECOFF
See Extended COFF.
ELF
```

See Executable and Linking Format. ESP See Encapsulated Security Payload. Encapsulated Security Payload Executable and Linking Format

Extended COFF

```
F
FADT
```

See Fixed ACPI Description Table. FAT See File Allocation Table. FAT16 See File Allocation Table (16-bit). FTP See File Transfer Protocol. File Allocation Table

File Allocation Table (16-bit)

File Transfer Protocol A member of the family of high-level protocols implemented on top of TCP which can be used to transfer files over a TCP/IP network. Fixed ACPI Description Table

```
G
GUI
See Graphical User Interface.
Giant
```

The name of a mutual exclusion mechanism (a sleep mutex) that protects a large set of kernel resources. Although a simple locking mechanism was adequate in the days where a machine might have only a few dozen processes, one networking card, and certainly only one processor, in current times it is an unacceptable performance bottleneck. FreeBSD developers are actively working to replace it with locks that protect individual resources, which will allow a much greater degree of parallelism for both single-processor and multi-processor machines.

Graphical User Interface A system where the user and computer interact with graphics.

```
H
HTML
See HyperText Markup Language.
HUP
See HangUp.
HangUp
```

HyperText Markup Language The markup language used to create web pages.

```
I
I/O
See Input/Output.
IASL
See Intel’s ASL compiler.
IMAP
```

See Internet Message Access Protocol. IP See Internet Protocol. IPFW See IP Firewall. IPP See Internet Printing Protocol. IPv4 See IP Version 4. IPv6 See IP Version 6. ISP See Internet Service Provider.

IP Firewall

IP Version 4 The IP protocol version 4, which uses 32 bits for addressing. This version is still the most widely used, but it is slowly being replaced with IPv6. See Also IP Version 6. IP Version 6 The new IP protocol. Invented because the address space in IPv4 is running out. Uses 128 bits for addressing. Input/Output

Intel’s ASL compiler Intel’s compiler for converting ASL into AML. Internet Message Access Protocol A protocol for accessing email messages on a mail server, characterised by the messages usually being kept on the server as opposed to being downloaded to the mail reader client. See Also Post Office Protocol Version 3. Internet Printing Protocol

Internet Protocol The packet transmitting protocol that is the basic protocol on the Internet. Originally developed at the U.S. Department of Defense and an extremely important part of the TCP/IP stack. Without the Internet Protocol, the Internet would not have become what it is today. For more information, see RFC 791. Internet Service Provider A company that provides access to the Internet.

```
K
KAME
```

Japanese for “turtle”, the term KAME is used in computing circles to refer to the KAME Project, who work on an implementation of IPv6. KDC See Key Distribution Center. KLD See Kernel ld(1).

```
KSE
See Kernel Scheduler Entities.
KVA
See Kernel Virtual Address.
Kbps
```

See Kilo Bits Per Second. Kernel ld(1) A method of dynamically loading functionality into a FreeBSD kernel without rebooting the system. Kernel Scheduler Entities A kernel-supported threading system. See the project home page for further details. Kernel Virtual Address

Key Distribution Center

Kilo Bits Per Second Used to measure bandwidth (how much data can pass a given point at a specified amount of time). Alternates to the Kilo prefix include Mega, Giga, Tera, and so forth.

```
L
LAN
See Local Area Network.
LOR
See Lock Order Reversal.
LPD
See Line Printer Daemon.
Line Printer Daemon
```

Local Area Network A network used on a local area, e.g. office, home, or so forth. Lock Order Reversal The FreeBSD kernel uses a number of resource locks to arbitrate contention for those resources. A run-time lock diagnostic system found in FreeBSD-CURRENT kernels (but removed for releases), called witness(4), detects the potential for deadlocks due to locking errors. (witness(4)

is actually slightly conservative, so it is possible to get false positives.) A true positive report indicates that “if you were unlucky, a deadlock would have happened here”. True positive LORs tend to get fixed quickly, so check https://lists.FreeBSD.org/subscription/ freebsd-current and the LORs Seen page before posting to the mailing lists.

```
M
MAC
See Mandatory Access Control.
MADT
```

See Multiple APIC Description Table. MFC See Merge From Current. MFH See Merge From Head. MFS See Merge From Stable. MFV See Merge From Vendor. MIT See Massachusetts Institute of Technology. MLS See Multi-Level Security. MOTD See Message Of The Day. MTA See Mail Transfer Agent. MUA See Mail User Agent. Mail Transfer Agent An application used to transfer email. An MTA has traditionally been part of the BSD base system. Today Sendmail is included in the base system, but there are many other MTAs, such as postfix, qmail and Exim. Mail User Agent An application used by users to display and write email.

Mandatory Access Control

Massachusetts Institute of Technology

Merge From Current To merge functionality or a patch from the -CURRENT branch to another, most often -STABLE. Merge From Head To merge functionality or a patch from a repository HEAD to an earlier branch. Merge From Stable In the normal course of FreeBSD development, a change will be committed to the -CURRENT branch for testing before being merged to -STABLE. On rare occasions, a change will go into -STABLE first and then be merged to -CURRENT. This term is also used when a patch is merged from -STABLE to a security branch. See Also Merge From Current. Merge From Vendor

Message Of The Day A message, usually shown on login, often used to distribute information to users of the system. Multi-Level Security

Multiple APIC Description Table

```
N
NAT
See Network Address Translation.
NDISulator
See Project Evil.
NFS
See Network File System.
NTFS
```

See New Technology File System.

```
NTP
See Network Time Protocol.
Network Address Translation
```

A technique where IP packets are rewritten on the way through a gateway, enabling many machines behind the gateway to effectively share a single IP address. Network File System

New Technology File System A filesystem developed by Microsoft and available in its “New Technology” operating systems, such as Windows® 2000, Windows NT® and Windows® XP. Network Time Protocol A means of synchronizing clocks over a network.

```
O
OBE
See Overtaken By Events.
ODMR
See On-Demand Mail Relay.
OS
See Operating System.
On-Demand Mail Relay
```

Operating System A set of programs, libraries and tools that provide access to the hardware resources of a computer. Operating systems range today from simplistic designs that support only one program running at a time, accessing only one device to fully multi-user, multi-tasking and multi-process systems that can serve thousands of users simultaneously, each of them running dozens of different applications. Overtaken By Events Indicates a suggested change (such as a Problem Report or a feature request) which is no longer relevant or applicable due to such things as later changes to FreeBSD, changes in networking standards, the affected hardware having since become obsolete, and so forth.

```
P
PAE
See Physical Address Extensions.
PAM
See Pluggable Authentication Modules.
PAP
See Password Authentication Protocol.
PC
See Personal Computer.
PCNSFD
```

See crossref:glossary[pcnfsd-glossary,Personal Computer Network File System Daemon]. PDF See Portable Document Format. PID See Process ID. POLA See Principle Of Least Astonishment. POP See Post Office Protocol. POP3 See Post Office Protocol Version 3. PPD See PostScript Printer Description. PPP See Point-to-Point Protocol. PPPoA See PPP over ATM. PPPoE See PPP over Ethernet. PPP over ATM

PPP over Ethernet

```
PR
See Problem Report.
PXE
See Preboot eXecution Environment.
Password Authentication Protocol
```

Personal Computer

Personal Computer Network File System Daemon

Physical Address Extensions A method of enabling access to up to 64 GB of RAM on systems which only physically have a 32bit wide address space (and would therefore be limited to 4 GB without PAE). Pluggable Authentication Modules

Point-to-Point Protocol

Pointy Hat A mythical piece of headgear, much like a dunce cap, awarded to any FreeBSD committer who breaks the build, makes revision numbers go backwards, or creates any other kind of havoc in the source base. Any committer worth his or her salt will soon accumulate a large collection. The usage is (almost always?) humorous. Portable Document Format

Post Office Protocol See Also Post Office Protocol Version 3. Post Office Protocol Version 3 A protocol for accessing email messages on a mail server, characterised by the messages usually being downloaded from the server to the client, as opposed to remaining on the server. See Also Internet Message Access Protocol. PostScript Printer Description

Preboot eXecution Environment

Principle Of Least Astonishment As FreeBSD evolves, changes visible to the user should be kept as unsurprising as possible. For example, arbitrarily rearranging system startup variables in /etc/defaults/rc.conf violates POLA. Developers consider POLA when contemplating user-visible system changes. Problem Report A description of some kind of problem that has been found in either the FreeBSD source or documentation. See Writing FreeBSD Problem Reports. Process ID A number, unique to a particular process on a system, which identifies it and allows actions to be taken against it. Project Evil The working title for the NDISulator, written by Bill Paul, who named it referring to how awful it is (from a philosophical standpoint) to need to have something like this in the first place. The NDISulator is a special compatibility module to allow Microsoft Windows™ NDIS miniport network drivers to be used with FreeBSD/i386. This is usually the only way to use cards where the driver is closed-source. See src/sys/compat/ndis/subr_ndis.c.

```
R
RA
See Router Advertisement.
RAID
```

See Redundant Array of Inexpensive Disks. RAM See Random Access Memory. RD See Received Data. RFC See Request For Comments. RISC See Reduced Instruction Set Computer. RPC See Remote Procedure Call. RS232C See Recommended Standard 232C. RTS See Request To Send.

Random Access Memory

Revision Control System The Revision Control System (RCS) is one of the oldest software suites that implement “revision control” for plain files. It allows the storage, retrieval, archival, logging, identification and merging of multiple revisions for each file. RCS consists of many small tools that work together. It lacks some of the features found in more modern revision control systems, like Git, but it is very simple to install, configure, and start using for a small set of files. See Also Subversion. Received Data An RS232C pin or wire that data is received on. See Also Transmitted Data. Recommended Standard 232C A standard for communications between serial devices. Reduced Instruction Set Computer An approach to processor design where the operations the hardware can perform are simplified but made as general purpose as possible. This can lead to lower power consumption, fewer transistors and in some cases, better performance and increased code density. Examples of RISC processors include the Alpha, SPARC®, ARM® and PowerPC®. Redundant Array of Inexpensive Disks

Remote Procedure Call

Request For Comments A set of documents defining Internet standards, protocols, and so forth. See www.rfc-editor.org. Also used as a general term when someone has a suggested change and wants feedback. Request To Send An RS232C signal requesting that the remote system commences transmission of data. See Also Clear To Send. Router Advertisement

```
S
SCI
See System Control Interrupt.
SCSI
```

See Small Computer System Interface. SG See Signal Ground. SMB See Server Message Block. SMP See Symmetric MultiProcessor. SMTP See Simple Mail Transfer Protocol. SMTP AUTH See SMTP Authentication. SSH See Secure Shell. STR See Suspend To RAM. SVN See Subversion. SMTP Authentication

Server Message Block

Signal Ground An RS232 pin or wire that is the ground reference for the signal. Simple Mail Transfer Protocol

Secure Shell

```
Small Computer System Interface
Subversion
```

Subversion is a version control system currently used by the FreeBSD project. Suspend To RAM

Symmetric MultiProcessor

System Control Interrupt

```
T
TCP
See Transmission Control Protocol.
TCP/IP
```

See crossref:glossary[tcpip-glossary,Transmission Control Protocol/Internet Protocol]. TD See Transmitted Data. TFTP See Trivial FTP. TGT See Ticket-Granting Ticket. TSC See Time Stamp Counter. Ticket-Granting Ticket

Time Stamp Counter A profiling counter internal to modern Pentium® processors that counts core frequency clock ticks. Transmission Control Protocol A protocol that sits on top of (e.g.) the IP protocol and guarantees that packets are delivered in a reliable, ordered, fashion. Transmission Control Protocol/Internet Protocol The term for the combination of the TCP protocol running over the IP protocol. Much of the Internet runs over TCP/IP.

Transmitted Data An RS232C pin or wire that data is transmitted on. See Also Received Data. Trivial FTP

```
U
UDP
See User Datagram Protocol.
UFS1
```

See Unix File System Version 1. UFS2 See Unix File System Version 2. UID See User ID. URL See Uniform Resource Locator. USB See Universal Serial Bus. Uniform Resource Locator A method of locating a resource, such as a document on the Internet and a means to identify that resource. Unix File System Version 1 The original UNIX® file system, sometimes called the Berkeley Fast File System. Unix File System Version 2 An extension to UFS1, introduced in FreeBSD 5-CURRENT. UFS2 adds 64 bit block pointers (breaking the 1T barrier), support for extended file storage and other features. Universal Serial Bus A hardware standard used to connect a wide variety of computer peripherals to a universal interface. User ID A unique number assigned to each user of a computer, by which the resources and permissions assigned to that user can be identified.

User Datagram Protocol A simple, unreliable datagram protocol which is used for exchanging data on a TCP/IP network. UDP does not provide error checking and correction like TCP.

```
V
VPN
See Virtual Private Network.
Virtual Private Network
```

A method of using a public telecommunication such as the Internet, to provide remote access to a localized network, such as a corporate LAN.

Colophon This book is the combined work of hundreds of contributors to "The FreeBSD Documentation Project". The text is authored in AsciiDoc.
