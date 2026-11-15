---
id: lpi-050-100-02
title: "LPIC-5 · 050-100 — To redistribute copies of the modified versions, Integrity of the…"
slug: lpi-050-100-02-lpic-5-050-100-to-redistribute-copies-of-the-modified-versio
source: "LPI Learning Material — LPIC-5 (Exam 050-100)"
sourceSection: "4. To redistribute copies of the modified versions, 4. Integrity of the author’s source code: Modifications can be restricted if recipients are allowed to, 9. License must not restrict other software: For instance, other software bundled with this, 4. Can software be patented?, 2. Can software be pu"
track: linux-engineer
tier: free
tags: [linux, lpic-5, certification, security, cryptography]
summary: "Out of the free software movement, open source advocates arose in the late 1990s as a way to Covers 22 sections: To redistribute copies of the modified versions, Integrity of the author’s source code: Modifications can be restricted ."
---
# LPIC-5 · 050-100 — To redistribute copies of the modified versions, Integrity of the…

## 4. To redistribute copies of the modified versions
“Free software” in this definition is championed by the Free Software Foundation (FSF) which
introduced the term copyleft (which has no legal meaning, but presents a philosophical
consideration) to characterize the license on free software.

Open Source Software
Out of the free software movement, open source advocates arose in the late 1990s as a way to
make free software easier to understand and more popular among people outside the movement.
A nonprofit foundation, the Open Source Initiative (OSI), was founded in 1998, and Linus Torvalds,
initial author of the Linux kernel, gave his support to the concept. The Open Source Initiative
formalized the Open Source Definition to include the following criteria:
1. Free redistribution: One is free to decide how to redistribute the program, whether cost-free or
for sale, so long as no royalty or license fee is demanded. This freedom includes incorporating
the program into another program.
2. Source code availability, be it online or provided along with the software.
3. Allowing the creation and distribution of derived works and modifications.
## 4. Integrity of the author’s source code: Modifications can be restricted if recipients are allowed to
modify the program through patches at build time and to distribute these patches along with
the source code. The distribution of software built from modified source code may not be
restricted.
5. No discrimination against persons or groups: For instance, a license with permission for use of
the software by “teachers only” would not satisfy the Open Source Definition.
6. No discriminations against fields of endeavour: For instance, do not restrict commercial use.
7. Distribution of license: Everyone who receives the program has the same, original license.
8. License must not be specific to a product.
## 9. License must not restrict other software: For instance, other software bundled with this
software could have a different license.
10. License must be technology-neutral.

Freedom vs Open Source
The Free Software Foundation did not endorse the term “open source,” insisting that it hides the
key goal of freedom. Thus, while advocates of free software and open source software seem to be
pursuing and advocating for the same concept, the movements have separate motivations. Stated
in a simplified form, free software advocates emphasize the rights of developers and users,
whereas open source advocates prioritize the software’s widespread use and success.
Pretty much all free software qualifies as open source, while there are many licenses that are
considered to be open source (as approved by OSI) but are not free according to the FSF.

Because the differences between free and open source concern goals and motivations more than
the content of the licenses, and since both terms remain in frequent use, many advocates refer to
both definitions together using the phrases free and open source software (FOSS) or free/libre and
open source software (FLOSS). The term “libre” refers to freedom in many Romance languages.

Other Kinds of Monetarily Free Software
In addition to the broad categories of FOSS and proprietary software, a range of other distribution
strategies exist. Some of these strategies are:
Shareware
This term generally refers to proprietary software that is for sale, but can be used for free with
limited functionality until the user decides to buy the full version.
Freeware
This term describes software that is distributed free of cost and without limitation on use, but
not necessarily in comformance with a formal definition of the free software. Freeware in
many cases is proprietary and the source code is often not released at all.
Source available software
Sometimes the developers of proprietary software make their source code available (to
facilitate better bug reports, for instance), but impose acquisition of a proprietary license as a
condition on the use of the source code in other projects. This kind of availability with strict
limitations should not be confused with actual open source software.
Shared source software
This term was introduced by Microsoft in 2001, when the company decided to make some of
their software source code available online for research and testing. Don’t confuse this narrow
definition with shareware or source available software.
Public-domain software
This is software on which the authors have waived all copyrights. This definition does not
apply in all jurisdictions (especially with those where the author is granted rights of “droit
d’auteur” or “author’s rights,” as in France or Germany). Licenses such as the “Unlicense” have
been introduced, which are meant to have the same effect. Moreover, software may also enter
the public domain when the duration of copyright has expired.

Principles of Copyright Law and How They Are Affected by Open
Source Software Licenses
First and foremost: If there is no license information available for a certain source code file or
project, you cannot assume that the file or project lacks copyright protection. Indeed, the contrary
is the case, at least since most nations worldwide signed the Berne Convention since 1887.
In this treaty, the signatory nations agree that a literary or artistic work is protected by copyright
as soon as it exists (or in other words, as soon as it is “fixed” into a medium). That means that an
author does not have to register or apply for copyright. They still can do so in some countries, and
registration might be necessary for infringement actions in some jurisdictions including the US.
Also, the signatories agree to respect the copyright of any author of another signatory country,
which, as of November 2022, amounted to 181 of the 195 countries in the world.
However, not everything ever created is copyright protected. In order to qualify as a work
protected by copyright, the creation needs to satisfy some basic criteria: For example, facts and
ideas cannot be protected by copyright, but a text explaining an idea may be protected if it
reaches a certain degree of originality. The measure of originality differs around the world, but in
many cases, the barrier for protection is very low. Many jurisdictions are currently considering
how much artificial intelligence can be used to create a work deserving of originality and hence
copyright.
Depending on the jurisdiction, computer programs are protected by copyright as literary works:
That is, copyright does not apply to the idea or algorithm but to its implementation in source code.
Copyright gives the author the exclusive rights (among others) to copy, modify, sublicense,
distribute, and publish the work. Reception of the work is free, so one does not need a license to
read a book or to listen to a song on the radio, as long as doing so does not require making a
permanent copy.
Because the author’s rights come into being without the need for registration, anyone who wants
to copy, modify, sublicense, distribute, or publish the work of another author has to get
permission first. This is where licenses come into play, as contracts between the author of a work
and a person who wants to exercise some of the exclusive rights of the author.
FOSS licenses are offered to anyone without a fee. Anyone can create their own license and try to
get it approved by the OSI or FSF. But using an existing FOSS license is highly recommended
because of their general acceptance and the familiarity that knowledgeable software users have
with the contents of the license and its obligations. In fact, only a handful of the many licenses
approved by the FSF or OSI are in common use.

Principles of Patent Law
In contrast to copyright, which does not protect ideas, patents protect inventions (ideas) without
the need for the idea to be fixed (yet) in a machine or process. A further difference is that
inventors must apply for patents explicitly and register them with the patent office of the country
where protection is sought.
Without diving too deeply into patent law and its requirements, we’ll just point out a very central
issue: Patent protection requires (among other criteria) an idea with a certain technical aspect.
Historically, the ideas for a new meal recipe or a new board game do not qualify for patent
protection, whereas the ideas for a new cooking machine or a game console might qualify.
In the context of computer programming, the question arises whether software could be subject to
patent protection. This depends on both the legal jurisdiction and the particular application: For
example, in Germany, computer programs as such are generally excluded from patent protection.
However, if programs are combined with a physical object — e.g., when software controls an
automated braking system in a car — patent protection can be sought for the application including
the physical element of the brake and not the software as such, and might therefore qualify.
In other jurisdictions, such as the US, patents may be granted for computer programs as such,
depending on case law developments.
The concept of patent protection should be kept in mind in FOSS licensing. Some licenses (such as
the GPLv3) allow patents on the FOSS software by explicitly granting permission for the software’s
use. But some licenses do not even mention patents (such as the BSD-3-Clause license) and yet
other licenses explicitly exclude them (such as the Creative Commons licenses). However, under
certain circumstances, patent grants may be implied by the license or may be read into the
license.
NOTE

The different FOSS licenses are covered in subsequent lessons.

Especially when dealing with embedded software, such as software in audio devices, special
attention should be paid to patents connected with the software, e.g. by conducting patent checks
on authors of the software.

Licensing Contracts
As mentioned before, licenses are contracts between the author of a work and someone who
wants to excercise some of the exclusive rights of the author. Some of the more extensive FOSS
licenses, such as the GNU General Public Licenses version 2 and version 3, include provisions for
contract termination. FOSS licenses always include rights grants regarding the central freedoms.

Usually, the following rights are stated or can be read into the license text:
…the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software…
— MIT license

License stewards are persons or, in many cases, organizations such as the FSF, who manage
versions of the licenses. For example, section 9 of GPLv2 declares the FSF to be the license
steward:
The Free Software Foundation may publish revised and/or new versions of the General
Public License from time to time. Such new versions will be similar in spirit to the present
version, but may differ in detail to address new problems or concerns.
— GNU General Public License version 2

Some license stewards also publish frequently asked questions (FAQs) to help answer questions
regarding the licenses. These can be useful as a conversation starter between licensee and
licensor.

Distribution
Distribution of software (in binary or source code form, in particular) is a central aspect of most
FOSS licenses, since mere use of FOSS software usually does not trigger any licensing obligations:
Activities other than copying, distribution and modification are not covered by this License;
they are outside its scope. The act of running the Program is not restricted…
— GNU General Public License version 2

Most licensing obligations arise only with distribution, i.e., passing on a modified or unmodified
copy, be it on a tangible medium such as a CD or via download. In some cases, licensing conditions
are also triggered if software is running on a server (i.e., without ever distributing the source
code) while the user interacts with the software.
Distribution of executable software might require the delivery of the source code, license text, and
copyright notices as well, depending on the FOSS license type. Some licenses require modification
notices to be put in the source code if modified code is being distributed.
Distribution could also trigger copyleft effects; i.e., upon distribution of GPLv3 licensed software
that has been modified, the source code of the entire modified software may have to be released
under the GPLv3.

While FOSS may be sold, usually no licensing fees may be imposed. This means, for instance, that
someone can sell software under the GPLv3 license as just a binary, but since the source code is
available (or has to be offered), people interested in the software can always opt to obtain the
sources (perhaps from somebody else, for free) and to build the software from the sources.

Derivative Works
When one set of developers incorporate code into their own project from someone else’s project,
the result might be a derivate or derived work. The details vary from one project to another and
from one license to another, and because the details require some sophistication with software
development techniques, we’ll just say that the developers have to make sure they are
incorporating the code in a way that conforms to the license.
The most important issue regarding derivative works is that, for some licenses such as the GPL, a
derivative work must be released under the same license. Such licenses are called reciprocal.
The immediate practical significance of a reciprocal requirement is that, if you use GPL’d code in
your own project in a way that makes yours a derivation, you have to reveal your source code and
let others build products on it. This licensing requirement is highly desired by some developers
who want to encourage more people to use free licenses. However, the license reduces the appeal
of the GPL for some developers who might potentially use free code.
Many other free and open source licenses do not impose that requirement. These tend to be called
permissive licenses.

Consequences of License Violations
If, at the time of distribution, licensing conditions are not met (e.g., if GPLv3 licensed software
distributed as a binary is not accompanied by an offer of source code), the licensing contract is
violated. The consequences of licensing violations depend on the license. Violation of the GPLv3
license, for example, may lead to termination of the license. Any further actions that require
permission by the author, e.g. distribution of the software, then constitute copyright violations.
If a company includes GPLv3 licensed software in a product and violates the license, a claim may
be filed requiring the company to recall their products. Intentional copyright violations can even
lead to criminal charges.
Some licenses have specific clauses allowing the licensee to fix the violation within 30 days of
notification. If the person distributing the software manages to comply with the license within this
period, the license is reinstated.

License Compatibility and Incompatibility
Large software projects often include software under different licenses, each license specifying its
individual requirements. Such projects can come up against hurdles using software that requires
its license to be used on derivative works. This is because the licensing terms of such copyleft
licenses may differ, rendering them incompatible. Publishing or distributing a software project
that integrates components under different copyleft licenses might not be possible without
violating one of the licenses.
Some copyleft licenses explicitly list compatible licenses making it easier to use a copyleft-licensed
component under another copyleft license.
Most permissive licenses are compatible with other licenses. For instance, MIT-licensed
components may be used in a GPLv3 licensed project without risking licensing violations.
However, a GPLv3 licensed component may not in every case be used in a MIT licensed project
without violating the terms of the GPLv3. Compatibility might therefore not always work both
ways.
Before a software project is put into the market, developers and their legal advisors should
conduct a thorough license compatibility check, to avoid running into licensing violations. Open
source compliance management should be integrated into the early stages of a software
development process to avoid delays in software distribution caused for example by license
incompatibility issues. Search the source code thoroughly for applicable licenses (e.g., by using
software scan tools) and check whether all licensing conditions are met.

Dual Licensing and Multiple Licenses
Some software may be available under several licenses. For example, a licensor may choose to
dual license their project under both a copyleft license such as the GPLv3 and a proprietary
license. The proprietary license might be required, for instance, if the potential licensee
incorporates the code into their own proprietary product. Each developer determines whether
they can adhere to the GPLv3 conditions or must obtain the proprietary license, and most likely
entail a licensing fee.
As pointed out earlier, some software may include components under various licenses with
differing licensing conditions. Although most licenses do not often cause incompatibility, different
licenses may come with different requirements for different parts of the software.

1. What does the acronym FOSS stand for?

2. Which of the following explicitly belong to the user’s essential freedoms for free software?
Run software
Study software
Copy software
Change software
Publish software
Redistribute software
3. Is source code found on the internet with no licensing information free for modification and
distribution by anyone? Please explain.

## 4. Can software be patented?
It depends
5. What is a license steward?
The same as a licensor
Someone who may propose future versions of
a license
Someone who may terminate a license
Someone who manages software of airplanes
6. Does license compatibility always work both ways?

Yes, if two licenses are compatible, it does not
matter whether A is included in B or B is
included in A.
No, in some cases license A may be included in
a project under license B, but B may not be
allowed to be distributed under license A.
No, license compatibility is always
unidirectional.

1. Are the GPLv2 and the LGPLv2.1 license compatible? Please give a short explanation.

## 2. Can software be published under Open Content licenses (such as CC-BY)?
Yes, CC licenses can be applied to any
copyrightable work.
No, software may only be protected by
patents.
No, CC licenses do not apply to software.
3. Why is distribution important in the context of FOSS licensing?

This lesson provides an introduction to the basic concepts of free and open source software as
well as the underlying concepts of copyright and patents. It explains some of the foundations and
history of both free software and open source software and helps distinguish both of those from
proprietary licensing concepts. The Open Source Definition by the OSI helps categorize licenses as
open source licenses.
While dozens of FOSS licenses already exist, anyone is free to introduce additional licenses.
The concept of licensing is not to be underestimated: Licenses provide permissions to deal with
software in ways otherwise reserved exclusively to the author. Breaches of licenses can result in
legal disputes. Legal advice regarding license compliance should therefore be sought before
software is distributed or incorporated into other project code.

## 1. What does the acronym FOSS stand for?
Free and Open Source Software
2. Which of the following explicitly belong to the user’s essential freedoms for free software?
Run software

Study software

Copy software
Change software

Publish software
Redistribute software

## 3. Is source code found on the internet with no licensing information free for modification and
distribution by anyone? Please explain.
No. Source code, if it reaches the threshold of originality, is by default copyright protected as a
literary work. Since modification and distribution constitute exclusive rights of the author, no
one but the author may do so or give permission to do so.
4. Can software be patented?
It depends

## 5. What is a license steward?
The same as a licensor
Someone who may propose future versions of X
a license
Someone who may terminate a license
Someone who manages software of airplanes
6. Does license compatibility always work both ways?

Yes, if two licenses are compatible, it does not
matter whether A is included in B or B
included in A.
No, in some cases license A may be included in X
a project under license B, but B may not be
allowed to be distributed under license A.
No, license compatibility is always
unidirectional.

1. Are the GPLv2 and the LGPLv2.1 license compatible? Please give a short explanation.
If software A is licensed under the GPLv2 and software B is licensed under the LGPLv2.1, it is
possible to use B in A, since LGPLv2.1 allows for use under the conditions of the GPLv2 license.
However, A cannot be used in B under the terms of the LGPLv2.1. If A is being used in B, the
entire software has to be licensed under the GPLv2, which is possible, because LGPLv2.1 allows
for the software’s use under the GPLv2.0.
2. Can software be published under Open Content licenses (such as CC-BY)?
Yes, CC licenses can be applied to any
copyrightable work.

No, software may only be protected by
patents.
No, CC licenses do not apply to software.
3. Why is distribution important in the context of FOSS licensing?
Many FOSS license obligations are triggered upon distribution of the software. If software is
never distributed, but only changed and used in a closed system (such as a division of a
company), it may be possible to use the software without adhering to the licensing obligations.

### 052.2 Copyleft Software Licenses
Open Source Essentials version 1.0, Exam 050, Objective 052.2
- Understanding the concept of copyleft software licenses
- Understanding the rights granted by copyleft software licenses
- Understanding the obligations created by copyleft software licenses
- Understanding the main properties of common copyleft software licenses
- Understanding the compatibility of copyleft software licenses with other software licenses
- Awareness of the terms “reciprocal license” and “restrictive license”
- Copyleft
- Distributing
- Conveying
- Tivoization
- GNU General Public License, version 2.0 (GPLv2)
- GNU General Public License, version 3.0 (GPLv3)
- GNU Lesser General Public License, Version 2 (LGPLv2)
- GNU Lesser General Public License, Version 3 (LGPLv3)

- GNU Affero General Public License, Version 3 (AGPLv3)
- Eclipse Public License (EPL), version 1.0
- Eclipse Public License (EPL), version 2.0
- Mozilla Public Licence (MPL)

## 052. Open Source Software Licenses

### 052.2 Copyleft Software Licenses

The importance of licenses for both the use and the development of software has already been
described. It is therefore not surprising that free software has also been characterized by new
approaches to licensing from the outset: Conditions for the unrestricted use or collaborative
development of software must be legally defined in order to be protected and enforced.
Aware that copyright law, which is firmly anchored in almost all legal systems worldwide, could
not be questioned or replaced, software developers took an approach as early as the 1980s that
respects copyright regulations but supplements them with new regulations that emphasize the
principle of “freedom”: copyleft.

Copyleft and the GNU General Public License (GPL)
Richard Stallman, then a developer at the renowned MIT, founded the GNU Project in 1983 to
develop what he considered to be a “free” operating system. It soon became clear that the code
developed by the project had to be legally protected so that it could not simply be taken over by
commercial providers and thus become “non-free.”

Stallman therefore founded the non-profit Free Software Foundation (FSF) in 1985, which
summarizes its mission on its website as follows: “The Free Software Foundation is working to
secure freedom for computer users by promoting the development and use of free (as in freedom)
software and documentation…”
A key instrument for this mission is a license that respects applicable law (especially copyright
law) on the one hand and implements its own ideas of freedom in a legally clean manner on the
other. The result was the first version of the GNU General Public License (GPLv1) in 1989. This
license and numerous articles — such as “What is Free Software?”, written by Stallman in
1992 — make clear the motivations and values of free software developers, who now also see
themselves as a “movement.”
The programmatic core is still formed by the “four essential freedoms” formulated by Stallman in
the aforementioned article, the numbering of which begins with 0:
- The freedom to run the program as you wish, for any purpose (freedom 0).
- The freedom to study how the program works, and change it so it does your computing as
you wish (freedom 1). Access to the source code is a precondition for this.
- The freedom to redistribute copies so you can help others (freedom 2).
- The freedom to distribute copies of your modified versions to others (freedom 3). By doing
this you can give the whole community a chance to benefit from your changes. Access to
the source code is a precondition for this.
— Richard Stallman, What is Free Software?

Unlike licenses for commercial products, which place restrictions on use in the foreground, free
software is about maximum freedom for users and developers.
The preamble of the GNU GPLv1 summarizes this as follows:
Specifically, the General Public License is designed to make sure that you have the freedom
to give away or sell copies of free software, that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new free programs; and that
you know you can do these things.
— GNU General Public License, version 1

This means that everyone has the right to use, distribute, and modify software under the GPL
without restriction (which is possible because the source code is accessible, i.e. “open”) and in
turn to distribute the modifications. It is even possible to charge money for passing on the
software:

Actually, we encourage people who redistribute free software to charge as much as they wish
or can. If a license does not permit users to make copies and sell them, it is a nonfree
license….Free programs are sometimes distributed gratis, and sometimes for a substantial
price. Often the same program is available in both ways from different places. The program
is free regardless of the price, because users have freedom in using it.
— Free Software Foundation, Selling Free Software

But if the freedoms are so far-reaching, to what extent is software protected under this license, for
example from being incorporated into proprietary products?
This is the role of the previously mentioned copyleft principle, which the GPL already applies in
version 1 even if the term does not yet appear explicitly:
You may not copy, modify, sublicense, distribute or transfer the Program except as expressly
provided under this General Public License.
— GNU General Public License version 1

This means that all these freedoms are linked to the condition that users preserve these freedoms
in everything they do with the software.
Copyleft therefore not only guarantees freedoms, but also requires all users to grant these
freedoms to others. This is achieved by stipulating that software under a copyleft license (such as
the early GPLv1) may be modified and redistributed only if the modifications are published under
the same conditions, i.e. under the same license.
The ideal of free software, namely the collective use and further development of software,
therefore takes precedence over the personal needs that individuals might have in relation to the
software. The principle of reciprocity is crucial: Those who use freedoms must also grant them.
Copyleft licenses are therefore often referred to as reciprocal.
This completely new approach to a software license already proved to be legally sound and
practicable in version 1 of the GPL, so the GPL has undergone only two major revisions in the
almost 40 years during which the modern IT market has developed.

GPLv2 and GPLv3
In 1991, the Free Software Foundation presented version 2 of the GNU General Public License
(GPLv2), which established itself as the most popular license for free software projects over many
years. For example, the core of the Linux operating system is still licensed under GPLv2 today.
Compared to version 1, version 2 is primarily concerned with more precise definitions to avoid

ambiguities. For example, version 2 explains in much greater detail what is meant by “source
code.”
Also of interest is the new Section 7, which sets the principle of freedom and thus the validity of
the license as absolute and does not allow any compromises — for example, the integration of less
free parts into the software:
If you cannot distribute so as to satisfy simultaneously your obligations under this License
and any other pertinent obligations, then as a consequence you may not distribute the
Program at all. For example, if a patent license would not permit royalty-free redistribution
of the Program by all those who receive copies directly or indirectly through you, then the
only way you could satisfy both it and this License would be to refrain entirely from
distribution of the Program.
— GNU General Public License version 2

It was not until 16 years later, in 2007, that the FSF published a new version of the GPL in order to
take account of technical innovations — such as the provision of software services via the
internet — as well as issues of compatibility with other FOSS licenses. However, the license
remains stable in terms of its core statements and merely adds details for further clarification.
Let’s take a closer look at some of these additions.
While the GPLv2 still generally refers to the provision of software as distribution, GPLv3 specifies
this process with two new terms: propagation and conveying. The main reason for this is that the
term “distribution” is defined in numerous copyright laws worldwide. To avoid ambiguity or
conflict, the GPLv3 chooses these new terms and defines them as follows:
To “propagate” a work means to do anything with it that, without permission, would make
you directly or secondarily liable for infringement under applicable copyright law, except
executing it on a computer or modifying a private copy. Propagation includes copying,
distribution (with or without modification), making available to the public, and in some
countries other activities as well.
To “convey” a work means any kind of propagation that enables other parties to make or
receive copies. Mere interaction with a user through a computer network, with no transfer of
a copy, is not conveying.
— GNU General Public License version 3

With the significantly growing number of commercial software products whose distribution is
restricted by manufacturers through technical measures such as registration codes or hardware
components (so-called dongles), there were a number of international legal initiatives in the late
1990s to criminalize the circumvention of these measures. This so-called digital rights

management (DRM), also derogatorily referred to by opponents as digital restrictions management,
is a thorn in the side of the FSF, as the measures fundamentally contradict the demand for the free
distribution of software.
In response, version 3 of the GPL contains a passage stating that software under the GPL may not
be modified with reference to legal DRM requirements. This also means that software licensed
under GPLv3 may use DRM, but that others are also permitted to circumvent such measures.
The term tivoization is also frequently used in this context. The word appeared explicitly in the
first drafts of GPLv3 but was not included in the final version. The term goes back to the company
TiVo, which used GPLv2-licensed software in its digital video recorder, but at the same time
technically prevented modified software from being installed and used on the device. In the FSF’s
opinion, this contradicted the principles of the GPL, and after some discussion, the GPLv3 takes
this into account with a paragraph on so-called user products. It generally stipulates that products
that use GPLv3-licensed software must also provide information on how this software can be
modified.
A further addition concerns patents, which the FSF fundamentally rejects on software with
reference to their obstruction of freedom and innovation. This is already stated in the preamble to
GPLv3:
Finally, every program is threatened constantly by software patents. States should not allow
patents to restrict development and use of software on general-purpose computers, but in
those that do, we wish to avoid the special danger that patents applied to a free program
could make it effectively proprietary. To prevent this, the GPL assures that patents cannot be
used to render the program non-free.
— GNU General Public License version 3

The license text also contains several passages that allow the inclusion of code under a patent by
means of a “non-exclusive, worldwide, royalty-free patent license” from the licensor in order to
protect users of such code from disputes between patent holders and licensees.

The GNU Affero General Public License (AGPL)
With the increasing availability and speed of the internet, more and more services are emerging
in which the software is merely installed on the servers of the vendor — the Application Service
Provider (ASP) — and whose customers interact with the services via the internet. The trend has
gained the name Software as a Service (SaaS).
In such cases, the GPLv2 did not provide any clarity as to whether and how the source code
(possibly modified by the provider) should be made available. Version 3 of the GPL closes this

loophole, known as the ASP loophole, by explicitly referring in section 13 to another license issued
by the FSF in 2007: the GNU Affero General Public License version 3 (GNU AGPLv3). The name goes
back to the company Affero, which developed and published the first two versions of this license.
This AGPLv3 basically corresponds to the GPLv3, but explicitly regulates the ASP problem in the
section “remote network interaction.” Furthermore, both licenses explicitly state that they can be
combined with each other without restriction.
In summary, the GNU AGPL is a complementary supplement to the GPL. The AGPL extends the
scope of the GPL by applying copyleft to software that is no longer used in local installations, but
exclusively in the form of services transmitted via networks.

Compatibility of Copyleft Licenses
The development of free software thrives on building on the work of others, i.e. integrating,
modifying, and sharing the source code of others. If all parts of a modified or newly compiled
software are under the same copyleft license, for example the GPLv3, this is possible without any
legal problems. The license simply requires that the result is distributed under the same license.
Things become more complicated when software consists of parts that are licensed under
different licenses. Several factors need to be taken into account here.

Combined and Derivative Works
Free software is sometimes created under very different conditions. Changes range from simple
error corrections to complex projects with millions of lines of code. Regardless of the scope, a
basic distinction is made between two types of works when it comes to licensing: derivative and
combined.
Let’s assume, for example, that software project A is missing a certain functionality. Instead of
developing this functionality from scratch, it makes sense to combine code from another project B,
which offers exactly this functionality, with A. The software from B would not even have to be
changed for this, but could simply be added to A. It is therefore a combined work. If both A and B
are under the same copyleft license, there are no problems for the combined work.
If A and B are under different copyleft licenses, caution is required: Is the combination of A and B
already a separate work? And, if so, under which license can or must it be licensed? Or can a
conflict be avoided by ensuring that both parts A and B remain separate with their respective
licenses and do not constitute a new work?
It becomes even more difficult with derivative works, i.e. when project A can make use of B’s

functionality only by incorporating code from B directly into the code of A. This integration
creates a new, derivative work whose parts can no longer be separated.
Copyleft comes into play for a derivative work. If, for example, A is under a copyleft license such
as the GPLv3, the new, derivative work must also be under the GPLv3 in accordance with the
principle of reciprocity. But what if B is under a different license? Is it a copyleft license, and is it
compatible with the GPLv3? Or, if it is a different type of license, can B also be published under a
different license, i.e. relicensed? Or are the licenses of A and B even categorically mutually
exclusive?
The aim in this lesson is not to list the possible combinations and possible solutions. The
important thing is to illustrate the complexity of the problem resulting from the combination of
very different issues.
Technically, the first thing to clarify is how the different parts of the software (in our example A
and B) work together: Can they be separated from each other or are there processes whose
execution can no longer be clearly assigned to one part or the other?
From a legal point of view, questions arise about the relationship between the licenses of A and B.
Are they compatible with each other, or only in parts or only in one direction? Is relicensing an
option?
We can only hint at the complexity of these questions here, not resolve them. Such decisions call
for sound legal knowledge. Thus, licensing decisions for new works, but especially for combined
and derivative works, should be made early, carefully, and always after detailed legal advice.

Weaker Copyleft
The copyleft has proven to be extremely robust over the past decades, especially in the form of the
GPL in versions 2 and 3. However, special technical requirements have prompted the FSF to react
by adapting its licenses. The GNU Affero General Public License is one such example. We discuss
other examples in the following subsections.

The GNU Lesser General Public License (LGPL)
A method frequently used in software development is the use of small modules for standard tasks,
such as opening or saving files. These modules — or collections of such modules — are referred to
as software libraries. They are usually not independently executable applications, but routines
that the actual application integrates as required. The integration process is known as linking,
whereby a distinction is made between two methods.
With static libraries, the actual application (via auxiliary programs and intermediate steps) firmly

integrates the code of the modules into the executable file of the application. With dynamic
libraries, on the other hand, the application integrates a module only when required at runtime
and loads it into the working memory.
This raises a question with regard to copyleft and licensing: What are the licensing implications of
linking? For example, does this form of taking over code require an application that uses a library
under the GPL to adopt the GPL itself? And does this apply to both static and dynamic linking?
The linking process is so ubiquitous in software development, and the issues associated with
reciprocal copyleft so extensive, that the FSF looked early on for a licensing solution that
permitted linking through the GNU Lesser General Public License (LGPL). The LGPL is updated at
the same time as each new version of the GPL. The name of the license in version 1 was the GNU
Library General Public License, which revealed the original problem that led to the license’s
creation. In versions 2 and 3, “Library” replaced by “Lesser” to indicate what is actually at stake,
namely a pragmatic weakening of the copyleft principle.
A library licensed under the LGPL can therefore be used by software without this software itself
automatically being subject to the copyleft. Software projects under so-called permissive licenses
(covered in another lesson), in particular, benefit from this compromise, as it creates legal
protection for the combination of approaches that are not per se compatible under licensing law.
Any changes to LGPL-licensed software are still subject to the copyleft, i.e. they must also be under
the LGPL.
However, the LGPL-licensed library must be interchangeable, to allow the user of the software to
replace the library with a modified version. Appropriate conditions must be created for this, i.e.
information must be provided on how such a replacement can be made.

Other Copyleft Licenses
Other FOSS projects and organizations also look for the best legal framework for their needs, and
hence develop their own licenses. One example is the Mozilla Foundation, founded in 1998 and
today best known for the two projects it supports: the Firefox internet browser and the
Thunderbird email client.
Version 1 of the Mozilla Public License (MPL) was published in 1998, and the current (as of 2024)
version 2.0 in 2012.
Like the LGPL, the MPL is often referred to as a “weak copyleft” license. In fact, it seeks to strike a
balance between the strict requirements of the copyleft and the possibilities for integration with
commercial products. It achieves this, among other things, through a principle known as file-level
copyleft: If you make a change to a file that belongs to software under the MPL, you can integrate

this file into proprietary software as long as the modified file itself is remains under the MPL and
is therefore accessible.
Another example of a weak copyleft license is the Eclipse Public License (EPL) from the Eclipse
Foundation. The current version 2.0 from 2017 is very similar to the MPL and is often referred to
as the most “business-friendly” copyleft license. However, the various copyleft licenses — and
there are others besides the ones mentioned here — often arose due to historical developments
rather than clear legal differences.

1. What does the abbreviation GPL stand for?

2. Why are copyleft licenses also referred to as reciprocal?

3. Which FSF copyleft license is suitable for software libraries?

4. Which English terms replace the term “distribution” in GPLv3 and why?

5. Which of the following copyleft licenses were issued by the Free Software Foundation?
GPL version 3
AGPL version 1
LGPL version 2
MPL 2.0

## 1. Which of the following are copyleft licenses?
GPL version 2
3-clause BSD License
LGPL version 3
CC BY-ND
2. Can one typically create a derivative work combining parts of two software projects that are
under different strong copyleft licenses? Give reasons!

3. Which of the following licenses have a strong copyleft and which have a weak copyleft?
Common Development and Distribution
License (CDDL) 1.1
GNU AGPLv3
Microsoft Reciprocal License (MS-RL)
IBM Public License (IPL) 1.0
Sleepycat License
4. Describe some compatibility issues that could arise when combining software under a weak
copyleft license with software under a non-copyleft license.

This lesson deals with the characteristics of software licenses that follow the principle of copyleft.
Developed in the 1980s by the Free Software Foundation, the GNU General Public License (GPL) is
currently the most popular license with a strong copyright. Despite several revisions up to the
current version 3, its basic requirements have remained virtually unchanged: The freedoms
granted by the license to use, redistribute, and modify the software without restriction must be
preserved at all times. This means that the modified software may be distributed only under the
same conditions (i.e., the same license).
Technical innovations as well as the desire for legal leeway when collaborating with other
projects have prompted the FSF to develop supplementary or alternative licenses. The GNU Lesser
General Public License (LGPL), for example, takes into account the static or dynamic linking of
software libraries frequently used in software development. The GNU Affero General Public
License (AGPL) responds to the technical trend toward using software in the form of services via
the network (especially the internet), i.e. not in local installations.
In addition to the FSF, other projects such as the Mozilla Foundation and the Eclipse Foundation
have developed copyleft licenses. These also seek a compromise between securing the freedoms
granted by the license and a simpler relationship to software under other licenses by means of a
weaker copyleft.
In principle, license compatibility is an important issue with copyleft licenses, because the
principle of free, collaborative software development must be reconciled with the legal conditions
determined by the respective license. In any form of combination of software under different
licenses, the legal conditions must be examined carefully in each individual case.

## 1. What does the abbreviation GPL stand for?
General Public License
2. Why are copyleft licenses also referred to as reciprocal?
The principle of copyleft requires that freedoms granted by a license must also be granted to
others without restriction. For example, if you make a change to software under the GPL, you
are obliged to make these changes available to others under the same conditions, in accordance
with this reciprocity.
3. Which FSF copyleft license is suitable for software libraries?
GNU Lesser General Public License (GNU LGPL)
4. Which English terms replace the term “distribution” in GPLv3 and why?
The terms “convey” and “propagate” replace “distribution.” The background to this is that the
term “distribution” is firmly anchored in international copyright law. To avoid conflicts or
misunderstandings, the GPL in version 3 does not use this term.
5. Which of the following copyleft licenses were issued by the Free Software Foundation?
GPL version 3

AGPL version 1
LGPL version 2

MPL 2.0

## 1. Which of the following are copyleft licenses?
GPL version 2

3-clause BSD License
LGPL version 3

CC BY-ND

## 2. Can one typically create a derivative work combining parts of two software projects that are
under different strong copyleft licenses? Give reasons!
No. Licenses with a strong copyleft generally require that modified versions are under the
same license. This also excludes relicensing. The combination of licenses, when both follow
these principles, therefore represents an irresolvable contradiction.
3. Which of the following licenses have a strong copyleft and which have a weak copyleft?
Common Development and Distribution
License (CDDL) 1.1

weak

GNU AGPLv3

strong

Microsoft Reciprocal License (MS-RL)

weak

IBM Public License (IPL) 1.0

weak

Sleepycat License

strong

## 4. Describe some compatibility issues that could arise when combining software under a weak
copyleft license with software under a non-copyleft license.
While a strong copyleft requires the modified software to be distributed under the same
license, the conditions are “relaxed” in the case of a weak copyleft. Nevertheless, any
combination with other licenses raises fundamental questions of compatibility. Important
aspects need to be considered when answering these questions: Are the original parts of the
two software projects clearly separate in the new work and, if necessary, can they still be
licensed differently? At what level does the connection between the two original software
projects actually take place? Is source code directly adopted or is it “only” dynamically linked
against the other software (library)? Does one of the two licenses generally allow relicensing?
All questions of this kind can be answered only after a precise analysis of the respective

licenses and with specialist legal expertise.

### 052.3 Permissive Software Licenses
Open Source Essentials version 1.0, Exam 050, Objective 052.3
- Understanding the concept of permissive software licenses
- Understanding the rights granted by permissive software licenses
- Understanding the obligations created by permissive software licenses
- Understanding the main properties of common permissive software licenses
- Understanding the compatibility of permissive software licenses with other licenses
- 2-Clause BSD License
- 3-Clause BSD License
- MIT License
- Apache License, version 2.0

## 052. Open Source Software Licenses

### 052.3 Permissive Software Licenses

Permissive licenses are currently the most widely used open-source licenses, in contrast to
restrictive licenses such as the GNU General Public License (GPL). Permissive software licenses
tend to be simple and flexible, and provide a wide range of freedom to their authors — perhaps
the widest freedom available among open source licenses.
This type of license grants broad freedom to software developers regarding the use, modification,
and redistribution of the software, so long as they acknowledge the original author. For example,
someone can usually distribute a derivative work under a closed-source license, so long as the
work includes attribution for the author of the work from which the new one was derived.
The principle behind this logic is to allow the maximum possible dissemination of the software.
Permissive licenses claim to benefit individuals and the public by facilitating commercial use of
the software, while preserving the rights to the original author through attribution.
It is no coincidence that the first and most important permissive software licenses were developed
in the academic field, such as the BSD-like licenses of the University of Berkeley in California or
the MIT/X11 License of the Massachusetts Institute of Technology. These are known as academic

open source licenses. Their influence within the industry was such that they laid the groundwork
for similar permissive software licenses conceived outside of academic contexts, such as the
Apache License from the Apache Software Foundation.

Rights and Obligations of Permissive Software Licenses
In general, the most popular permissive software licenses grant the licensee the unlimited right
to:
Use the software
Software covered by a permissive software license can be used by anyone (from individual
users, to commercial companies, to public authorities) and for any purpose, whether personal
or professional.
Modify the software
The software can be improved, adapted, or even integrated as a component (e.g., a library) into
other software.
Redistribute the software
If the software is modified, taking the form of a derivative work, it can be redistributed under
different licenses, including proprietary ones.
The only obligation in permissive software licenses usually is that of attribution: The licensee is
required to indicate the name of the original author of the software in the derivative work and
include a copy of the license text in any redistribution of the software.

Features of the Most Important Permissive Software Licenses
This section explains the differences between the MIT/X11 license, the most common BSD licenses,
and the Apache 2.0 license, all of which are in wide use nowadays.

MIT/X11 License
The MIT/X11 license (text: https://opensource.org/license/mit), also known as the X11 license, is
one of the academic licenses mentioned earlier. The license takes its name from the X Window
System software developed by the Massachusetts Institute of Technology back in 1987. This license
is one of the oldest and most popular permissive software licenses, partly because of its simple,
clear language.
This license grants the licensee the rights to:

- Use, modify, and distribute the software
- Commercialize the software, with or without modifications
- Release derivative works under a different license, even as closed-source software
The sole obligation of the licensee is to include the copyright notice and the license text in the
source code of the software or of its derivative works.
The MIT/X11 license is considered to be compatible with all the most important copyleft licenses,
both weak and strong. In particular, the MIT/X11 license is compatible with the
- GNU General Public License (GPL), versions 2.0 and 3.0
- GNU Lesser General Public License (LGPL), versions 2.0 and 3.0
- Mozilla Public License (MPL)
That means that derivative works of software originally licensed under the MIT/X11 license can be
redistributed under one of the above-mentioned licenses or be included in projects released
under one of the above-mentioned licenses.

2-Clause BSD License
The 2-Clause BSD License (text: https://opensource.org/license/bsd-2-clause) derives from the
original BSD license, created in 1980 by the University of Berkeley in California as the license for
BSD, its Unix-like operating system.
The license is well known for its simplicity and, as its name indicates, consists of just two short
clauses. It is substantially identical to the MIT/X11 license. Like the MIT/X11 license, this one
requires attribution in the software. Additionally, the 2-Clause BSD License requires the licensee
to include the license text in the documentation and other materials provided when redistributing
the code.
To summarize, the 2-Clause BSD license grants the rights to:
- Use, modify, and distribute the software
- Commercialize the software, with or without modification
- Release derivative works under a different license, even as closed-source software
The licensee has the obligation to:
- Include the copyright notice and the license text in the source code and binary of the software
or of its derivative works

- Include the copyright notice and the license text in documentation or other materials provided
with the software
The 2-Clause BSD license is considered to be compatible with all major copyleft licenses, both
weak and strong. In particular, the 2-Clause BSD license is compatible with:
- GNU General Public License (GPL), versions 2.0 and 3.0
- GNU Lesser General Public License (LGPL), versions 2.0 and 3.0
- Mozilla Public License (MPL)
Therefore, derivative works of software originally licensed under the 2-Clause BSD license can be
redistributed under one of the above-mentioned licenses or be included in projects released
under one of the above-mentioned licenses.

3-Clause BSD License
The 3-Clause BSD license (text: https://opensource.org/license/bsd-3-clause) is yet another variant
of the original BSD license, consisting of just three clauses. The main feature distinguishing this
license from the sister 2-Clause BSD license is the “non-endorsement clause,” which aims to
prevent the name of the original author from being exploited to distribute or sell derivative
works.
The 3-Clause BSD license grants the licensee the rights to:
- Use, modify, and distribute the software
- Commercialize the software, with or without modifications
- Release derivative works under a different license, even as closed-source software
The licensee has the obligation to:
- Include the copyright notice and the license text in the source code and binary of the software
or of its derivative works
- Include the copyright notice and the license text in documentation or other materials provided
with the software
- Refrain from citing the name of the copyright holder or contributors to endorse or promote
products derived from this software, without specific prior written permission
In order to explain the latter obligation — the “non-endorsement clause” — let’s think of a
scenario in which a company or individual creates a derivative work starting from software
licensed under a permissive software license. In the absence of this clause, the licensee could

promote the new work by indicating that it is a derivative of software by a well-known developer,
in order to benefit from their prestige.
As with its sister license, the 3-Clause BSD license is considered to be compatible with all the most
important copyleft licenses, both weak and strong. In particular, the 3-Clause BSD license is
compatible with:
- GNU General Public License (GPL), version 2.0 and 3.0
- GNU Lesser General Public License (LGPL), version 2 and 3
- Mozilla Public License (MPL)
Therefore, derivative works of software originally licensed under the 3-Clause BSD license can be
redistributed under one of the above-mentioned licenses or be included in projects released
under one of the above-mentioned licenses.

Apache 2.0 License
The first Apache license was developed by the Apache Software Foundation, a nonprofit
organization established in 1999, to distribute its software and make it easy to include in other
projects. The mission was to guarantee collaborative software development, embracing the opensource philosophy with a business-friendly perspective.
The Apache 2.0 license (text: https://www.apache.org/licenses/LICENSE-2.0), probably the most
widespread among the permissive software licenses, differs from the licenses discussed
previously in a few relevant aspects. The main aspect concerns the attribution of patent rights to
each licensee, including a clause related to the termination of the patent license, so as to limit and
prevent any claims for damages for patent infringement.
Two other obligations are significant. The licensee must release, under the same Apache 2.0
license, any parts or components of the software not modified by the licensee. Furthermore, the
licensee must place prominent notices in any modified files stating that the licensee changed those
files.
The Free Software Foundation, which promotes restrictive licenses, recommends Apache 2.0 as
the best of the permissive software licenses for distributing small amounts of software and
libraries.
The Apache 2.0 license grants the licensee:
- The right to use, modify and distribute the software
- the right to commercialize the software, with or without modifications

- The right to release derivative works under a different license, even as closed-source software
- A patent license to use, sell, import, and otherwise transfer the software covered by a patent
- A patent license to use, sell, import, and otherwise transfer the software which might otherwise
infringe a contributor’s patent claim
The licensee has the obligation to:
- Place prominent notices in any modified files stating that the files have been modified
- Release all unmodified parts of the original software under the Apache 2.0 license
- Include the copyright notice and the license text in the source code of the software and its
derivative works
- Include the copyright notice and the license text in documentation and other materials
provided with the software
The Apache 2.0 license is considered to be compatible with only some of the most important
copyleft licenses. In particular, the Apache 2.0 license is compatible with:
- GNU General Public License (GPL), version 3.0 but not 2.0
- GNU Lesser General Public License (LGPL), version 3.0 but not 2.0
- Mozilla Public License (MPL), version 2.0 but not version 1.1
That means that derivative works of software originally licensed under the Apache 2.0 license can
be redistributed under one of the above-mentioned compatible licenses or be included in projects
released under one of the above-mentioned compatible licenses.
The limited compatibility between the Apache 2.0 license and other open source licenses is
primarily due to the presence of clauses related to the grant of a patent license to the licensee.

Permissive Software Licenses in Relation to Other Open Source
Licenses
Now that we have an overview of the common and essential features of permissive software
licenses, we can move on to examine how they differ from the public domain software and from
copyleft licenses.

Comparison to Public Domain Software
The first distinction between permissive software licenses and public domain software release lies
in their very existence. The public domain is not an actual license, but just a way to release

software. In other words, by definition, works in the public domain have no license.
The next distinction lies in the obligations that permissive licenses impose on the licensee. In fact,
the user of a public domain release has no obligations whatsoever. However, anyone who uses,
modifies, or redistributes software under a permissive software license must comply with the
attribution obligation explained earlier: a requirement to include the name of the original author
and a copy of the license text in the software.
The consequence of the attribution obligation is that no derivative work originating from software
under a permissive software license can be released as public domain, because this would violate
(or at least circumvent) the original author’s right to receive attribution.

Comparison to Copyleft
The distinction between permissive software licenses and restrictive, copyleft licenses is more
complex, especially considering the differences between various copyleft licenses. As seen in
previous lessons, one major difference separates strong copyleft licenses (including GNU General
Public License (GPL), version 2.0 and 3.0) from weak copyleft licenses (including GNU Lesser
General Public License (LGPL), version 2.0 and 3.0, and the Mozilla Public License).
The major difference between restrictive licenses and permissive licenses lies in the copyleft
principle, which is core to restrictive licenses. In conformance with this principle, the licensee
who modifies software under copyleft license, and then distributes it, must necessarily
release — totally or partially — the derivative work with the same license as the original software.
Failure to comply with this obligation results in copyright infringement, with its attendant legal
consequences.
On the contrary, permissive software licenses do not impose such an obligation. Those who use or
plan to release software under this type of licenses can freely decide the license for their
derivative work, including proprietary licenses.
Strong Copyleft
The difference between permissive software licenses and strong copyleft licenses are more
marked than with weak copyleft licenses.
The essential difference is that strong copyleft licenses require derivative works to be released
under the same license as the original software. This also applies if the copyleft-licensed software
is integrated into another project: The entire derivative work must be released under the same
strong copyleft license.

Weak Copyleft
Unlike strong copyleft licenses, weak ones have only a partial requirement to release a derivative
work under the same license. To be more specific, the licensee who redistributes software
released under a weak copyleft license must apply the same license to the portion of their work
derived from the original one. For example, a library based on a library licensed under the LGPL
must also be licensed under the LGPL.
The weak copyleft licenses were conceived precisely to bring their features closer to those of the
permissive software licenses. They are nevertheless distinguished from permissive software
licenses in that the latter do not impose, under any circumstances, an obligation to maintain the
same license on a derivative or integrated work.

1. What are the two obligations generally imposed by permissive software licenses?

## 2. Which of the following licenses is not a permissive software license?
LGPL license
3-Clause BSD
3. What distinguishes a permissive software license from a copyleft license?
Software released under a copyleft license
cannot be distributed, whereas softare under
The works derived from software under a
copyleft license cannot be released under a
proprietary license, whereas software under a
Copyleft licenses are legally recognized only in
the United States of America, whereas
permissive software licenses are globally
recognized.
4. Which permissive software license grants a patent license to use, sell, import, and otherwise
transfer the software covered by a patent?
2-Clause BSD license
3-Clause BSD license
5. When software is released under the MIT/X11 license, can you distribute it under a proprietary
license and sell a derivative work based on the software?

## 1. You are modifying software distributed under the Apache 2.0 license and redistributing the
derivative work under a proprietary license. What steps should you follow to be compliant
with the Apache 2.0 license obligations?

2. Name at least three examples of popular projects released under permissive software licenses.

## 3. Why can’t you distribute, under a LGPL 2.0 license, software that includes components that
were originally released under the MIT/X11 license, the Apache 2.0 license, and the 2-Clause
BSD license? What different weak copyleft license can be used to release the software?

In this lesson you have learned: * What permissive software licenses are, the rights they grant,
and the obligations they provide * The differences between permissive software licenses and
other open source licenses * Features of the most popular permissive software licenses *
Compatibility of permissive software licenses with other open-source licenses

## 1. What are the two obligations generally imposed by permissive software licenses?
The obligation to indicate the name of the original author of the software and to include a copy
of the text of the license in the derived work.
2. Which of the following licenses is not a permissive software license?
LGPL license

3-Clause BSD
3. What distinguishes a permissive software license from a copyleft license?
Software released under a copyleft license
cannot be distributed, whereas softare under
The works derived from software under a
copyleft license cannot be released under a
proprietary license, whereas software under a
Copyleft licenses are legally recognized only in
the United States of America, whereas
permissive software licenses are globally
recognized.
4. Which permissive software license grants a patent license to use, sell, import, and otherwise
transfer the software covered by a patent?

2-Clause BSD license
3-Clause BSD license
5. When software is released under the MIT/X11 license, can you distribute it under a proprietary
license and sell a derivative work based on the software?

Yes.

## 1. You are modifying software distributed under the Apache 2.0 license and redistributing the
derivative work under a proprietary license. What steps should you follow to be compliant
with the Apache 2.0 license obligations?
You should:
- Insert into each modified file a notice attesting that the files have been modified.
- Release all unmodified parts of the original software under the Apache 2.0 license.
- Include the copyright notice and the license text in the source code of the software or of its
derivative works.
- Include the copyright notice and the license text in documentation and other materials
provided with the distribution of the software.
2. Name at least three examples of popular projects released under permissive software licenses.
- Angular web framework — MIT/X11 license
- Ruby on Rails — MIT/X11 license
- Apache HTTP Server — Apache 2.0 license
- Kubernetes — Apache 2.0 license
3. Why can’t you distribute, under a LGPL 2.0 license, software that includes components that
were originally released under the MIT/X11 license, the Apache 2.0 license, and the 2-Clause
BSD license? What different weak copyleft license can be used to release the software?
Even though the MIT/X11 license and 2-Clause BSD license are compatible with the LGPL 2.0
license, the Apache 2.0 license is not. Software that includes components released under
MIT/X11 license, Apache 2.0 license, and 2-Clause BSD license can be released under LGPL 3.0
license, because it is compatible with all those permissive software licenses.

Open Source Essentials (Version 1.0) |

## Topic 053: Open Content Licenses

### 053.1 Concepts of Open Content Licenses
Open Source Essentials version 1.0, Exam 050, Objective 053.1
- Understanding types of open content
- Understanding what constitutes content that is subject to copyright
- Understanding derivative works of copyrighted materials
- Understanding the need for open content licenses
- Awareness of trademarks
- Documentation
- Images
- Artwork
- Maps
- Music
- Videos
- Hardware designs and specifications
- Databases
- Data streams

- Data feeds

## 053. Open Content Licenses

### 053.1 Concepts of Open Content Licenses

Think about this hypothetical situation: Frank is a writer who wants to make some of his stories
available to anyone on the internet, but under certain conditions. He wants his work to be free of
cost. He wants anyone to be able to use the stories without asking for permission, but he doesn’t
want his work to be used commercially. Finally, he wants people to credit him properly if the
stories are used for any purpose. He would like to do this without involving himself in
complicated legal processes. We’ll see later why a writer might want to do these things.
Emma is a filmmaker who teaches some students how to produce short films. Among other things,
the students need a story to create their works. Emma knows Frank’s stories and thinks they are
perfect for her class.
What can Frank do to allow Emma to use his stories? This situation and many more can be solved
by using an open content licensing model. Nowadays, millions of copyright-protected works can be
reused by anybody without explicit consent from the copyright holder or the payment of a license
fee, thanks to their distribution under open content licenses. Resources such as Wikipedia, Flickr,
OpenStreetMap, Unsplash, and Jamendo are some examples of the many platforms that use this
license model.

According to a very broad definition, open content refers to any work (including, for example,
movies, music, images, texts, databases, data sets, documentation, maps, and hardware designs)
whose free use and redistribution is permitted under copyright law. This also includes originally
protected works whose term of protection has expired and which are therefore in the public
domain. A somewhat narrower definition presupposes that a work has been explicitly placed
under an open content license by its author, which allows use and distribution of the work
without any payment or permission. The open content model is therefore not in opposition to
copyright law, but complements it.

Copyright Fundamentals
Because open content licenses are based on copyright, you need to learn some aspects of copyright
law in order to understand why the licenses are needed and what they allow.
Copyright is a part of a legal category known as intellectual property. Copyright protects original
works by granting its creators exclusive legal rights to control certain uses of their works by other
people and corporations. Generally, this means that no one else can copy, distribute, publicly
perform, adapt, or do almost anything else other than view or read the work without the
permission of the copyright holder.
The fundamentals we will examine in this section include what is copyrightable, along with who
controls the rights and can grant permission to reuse a copyrighted work as Emma wants to do in
our example.
As explicitly stated by the World Intellectual Property Organization:
Copyright protects two types of rights. Economic rights allow right owners to derive financial
reward from the use of their works by others. Moral rights allow authors and creators to take
certain actions to preserve and protect their link with their work. The author or creator may
be the owner of the economic rights or those rights may be transferred to one or more
copyright owners. Many countries do not allow the transfer of moral rights. Copyright only
protects the expression of facts or ideas. It does not allow the copyright holder to own or
control the idea exclusively. For example, an illustration can be copyrighted but not the idea
that originated it.
— World Intellectual Property Organisation, Understanding Copyright and Related Rights

Economic rights protected by copyright last a long time, generally decades after the creator dies.
Moral rights never expire.
Copyright grants rights to creative works, such as literary and artistic creations that must meet a
certain standard of originality. The work must be a creation of its creator and not copied from

another work. (There are ongoing debates about how much artificial intelligence can go into a
work and still have it be considered original.)
Copyright protects only the expression of facts or ideas. It does not allow the copyright holder to
own or control the idea exclusively. For example, an illustration can be copyrighted, but not the
idea that originated it.
Copyright is automatic when a work is created and fixed in some tangible form, for example, a
digital artwork or a song. This means that the rights are granted to the creator without even
formally registering the work.
The people who promote open content licensing want to promote a free culture and the
development of a digital commons. They have found the copyright system too restrictive and rigid
for both users and creators. By creating easy-to-use standard licenses, the open content advocates
simplify the use and distribution of works protected by copyright.

What Can Be Copyrighted?
Copyright laws vary from country to country. However, there are international agreements to
standardize copyright laws. Original literary and artistic works can be copyrighted: for example,
works in art, music, photography, film, television, literature, and programming. The particular
rules to decide what is copyrightable, and how original a work is, vary depending on the region.
Sometimes these categories can be very general and apply to works that have both creative and
strictly functional elements: For example, a short film is considered artistic work. However,
portions of it can be uncopyrightable if they do not meet the standard of originality.

Derivative Works
Let’s continue with the hypothetical situation from the beginning of the lesson: Frank ultimately
decided to publish his stories under an open content license so they can be used under the terms
he chose. Since the stories came under that license, Emma used them in her class and decided to
show some of her students' short films during a film festival. In this case, the content created by
the students can be considered derivative works.
A derivative work or adaptation is a work based on existing works, such as a translation, musical
arrangement, dramatization, fictionalization, motion picture version, sound recording, art
reproduction, or any other form in which the original work is transformed or adapted. The
derivative work becomes a second, separate work independent in form from the first. The
transformation, modification, or adaptation of the work must be substantial in order to be
original and thus protected by copyright.

Common Open Content Licenses Features
Every open content license asserts the copyright of the author and affirms that without a license
from the author, any person using the work would be in violation of copyright. Therefore, such
licenses work within the global copyright system instead of trying to overturn it.
Open content licenses also ensure that appropriate credits should be given to the author of the
work. If recipients of the work distribute it to a third party, they should ensure that the original
author is acknowledged and credited. Also, when recipients modify the work, the derivative work
should clearly mention the author of the original and mention where the original can be found.
Unlike most copyright licenses, which impose restrictive conditions on uses of the work, open
content licenses enable users to have certain freedoms by granting them rights. Some of these
rights are common to virtually all open content licenses, such as the right to copy the work and
the right to distribute the work. Depending on the license, the user may also have the right to
modify the work, create derivative works, perform the work, display the work, and distribute the
derivative works.
Open content licenses can control derivative works. These licenses normally include the right to
create a derivative work and distribute it in any media. If a person licenses a painting under an
open content license, the right to base another picture on it can be granted as well. These
permissions are granted on the condition that others may use the derivative work freely, just like
the original work.
Therefore, an open content license normally ensures that derivative works are licensed under the
terms and conditions of the same open content license. But this obligation is not applicable when
the work is included in a compilation. For example, if a person makes an album of songs, one of
which is licensed under an open content license, not all the songs have to be licensed under the
same terms.
Another important aspect of open content licenses is the control of commercial use of a work.
People can license their works under an open content license while restricting the rights to
noncommercial purposes. Alternatively, people may also grant all rights, including the right to use
the work commercially.
Open content licenses don’t stop people from making money from their work. If a work is under a
noncommercial license, a publisher or other commercial entity may publish the work by making
an agreement with the copyright holders before doing so. In other words, even after releasing a
piece of work on a noncommercial basis, authors may sell the copyright to a for-profit entity,
provided that there is no exclusion placed upon continuing, noncommercial usage.

Importance of Open Content Licenses
What are some of the benefits of an open content model, and why would people use an open
content license to distribute their creative work rather than relying on the traditional copyright
model?
Open content licenses allow works to circulate more widely than if they were restricted by
default. Therefore, new artists could benefit from these licenses, as they can become more
popular and recognized by more people. By relinquishing certain controls (and possibly the
revenues that go along with them) content creators can be invited to more shows, obtain more
sponsorships, make more collaborations, etc.
Open content licenses can be practical in the internet age, because creators can publish their
works without relying on another person or institution. For example, a photographer who wants
to exhibit their photos could publish them on a personal website. This way, they can establish
themselves and be known to a wider public without signing up an agency or gallery to do so.
By choosing the right license, rights holders can maximize distribution and maintain control of
the commercialization of their works. If people want to use a work commercially, the content
creator can preserve the right to grant or withhold permission. Even if others are prohibited from
commercial use, rights holders may still use their work commercially.
Besides the possibility of a much broader distribution of a work, open content licenses also
increase legal certainty for users and significantly decrease legal transaction costs.
People may also use funding models that do not depend on using a noncommercial license. For
example, many artists and creators use crowdfunding to fund their work before releasing it under
a permissive license. Others use a model where the basic content is free, but extras such as
printed versions or special access to a members-only website are for paying customers only.
Open content licenses allow people to distribute their works to anybody and on any media and
format such as websites, photocopies, CDs, or books, without restrictions.
Open content licenses automatically establish a license between authors and users. Without an
open content license, the sharing of works via another online source would require an individual
contractual agreement between authors and users.

Trademarks and Copyrights
Trademarks, like copyright, are a type of intellectual property. But the law that protects a
trademark is different from that protecting copyright. Trademarks protect brands, related words
such as brand names, logos, symbols, and even sounds and colors that are used to distinguish

particular goods and services from others. Any special element used to promote and distinguish
businesses and the services or products sold from others can be a trademark.
The holder of a trademark is generally allowed to prevent others from using these trademarked
items if the public will be confused. Trademark law helps producers of goods and services protect
their reputation, and protects the public by giving them a simple way to differentiate between
similar products and services.
Trademarks can be registered officially or be automatically protected under common law. This
means that a trademark exists as soon as it is being used, but a common-law trademark does not
offer the same legal protection as a registered trademark. That’s why many companies register
their trademarks.
Copyright and trademarks can coexist. For example, Wikipedia is a registered trademark, and its
logo is also protected under copyright law as an original artwork or creation.

1. Can open content licenses be used to avoid copyright?

2. What is considered open content?
