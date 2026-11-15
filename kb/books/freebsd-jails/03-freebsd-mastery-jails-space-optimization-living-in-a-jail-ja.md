---
id: freebsd-jails-03
title: "FreeBSD Mastery · Jails — Space Optimization, Living In A Jail & Jail Features And Controls",
slug: freebsd-jails-03-freebsd-mastery-jails-space-optimization-living-in-a-jail-ja
source: "FreeBSD Mastery — Jails",
sourceSection: "Chapter 6. Space Optimization, Chapter 7. Living In A Jail, Chapter 8. Jail Features And Controls"
track: bsd-internals,
tier: premium
tags: [bsd, freebsd, jails, containers, security]
summary: "Standard jails plop a copy of FreeBSD down onto the disk and use it like any Covers 3 sections: Space Optimization, Living In A Jail, Jail Features And Controls.",
---
# FreeBSD Mastery · Jails — Space Optimization, Living In A Jail & Jail Features And Controls

## Chapter 6. Space Optimization

Standard jails plop a copy of FreeBSD down onto the disk and use it like any
other install. When you have a bunch of jails running the same release, and
perhaps even running the same packages, storing terabytes of duplicated files
feels inelegant.
Iocage jails optimize disk usage by using ZFS clones. This is great, so long as
you don’t keep your jails around long enough to need to upgrade across major
versions. Once you replace all of the files in a ZFS clone it becomes another
copy of the operating system, but with a dependency on the underlying snapshot.
Again: inelegant.
No jail system has an elegant solution to this problem. Instead, I offer three
different ways to work around it.
Iocage offers a clone command that lets you duplicate an existing jail. You can
do the same thing with standard jails, of course, but iocage provides a handy
script to copy for you.
The next step up from a clone is a template, a jail that you configure perfectly
and then copy on demand.
Some environments have many jails that must be completely synchronized. The
environment demands that all servers run exactly the same FreeBSD version, or
that all packages be provably, programmatically identical. Or, perhaps you’re
desperately short on disk space but need several jails. Use base jails to share one
filesystem between all these jails.
Which should you use? It depends entirely on your needs. Don’t skip ahead to
what you think is your preferred solution, though. Each section in this chapter
refers to concepts discussed in earlier parts, so read this entire chapter before
deploying.
This is not a complete list of optimizations. People reimplement base jails with

hard links and even symlinks. Folks painstakingly optimize jail contents, build
custom crunched binaries, and set up any number of clever systems. If you find
something that works better for you than what I discuss, use it. Unix offers an
endless supply of rope, you can hang yourself any way you please.

Clones
If you want an exact copy of an existing jail, clone it. A clone is a fork of a jail;
it starts off identical to the original, but diverges when anything changes on
either jail. Updates to the original jail do not propagate to its clones: consider
base jails if you need such propagation.
Clones are most often used for one-off duplication, such as duplicating an
application server so you can test an upgrade. They’re generally short-lived.

Standard Jail Clones
With standard jails, clones are pretty simple. On UFS, use tar(1) or even cp -rp to
duplicate the source directory tree in another directory, then configure the copy
as a new jail in jail.conf. If you’re using ZFS, you can use a ZFS clone.
Really. That’s it.
Creating a template from a standard jail is more useful, however, as we’ll see in
the next section.

Iocage Clones
An iocage clone is a ZFS clone of the original jail’s dataset, plus a fresh copy of
the iocage support files for that jail. You cannot clone a running jail. Use iocage
clone to clone a jail. The first argument must be the name or UUID of the jail to
be cloned. Assign a new name to the jail with the -n argument, and add any
parameters you want to change as command-line arguments after the name. Here
I clone the jail www1 to www2, assigning it a new IP address with the ip4_addr
parameter.
www2 successfully cloned!
When you assign the clone a name, iocage changes the hostname value in the
clone’s /etc/rc.conf to match. If you don’t assign the clone a name, iocage
generates a random UUID for the new jail. Again, while this is perfectly fine for
automation, it’s not so great for human beings.
Maybe you need a whole herd of clones. The -c argument to iocage clone lets
you specify how many clones to create at once.
6ed60d8f-0274-47bf-86d4-b4483cbaa1d2 successfully cloned!
bc586521-6313-4ef3-9a39-e6f569e3c0c9 successfully cloned!
Each clone is assigned a UUID, printed on the command line. If you want to
name the jails as you create them, create them individually and use -n to assign
names.
All of these jails are exactly identical. That brings up a new problem…

Cleaning Clones
Clones start off as exact copies of the original jail. Do you want your jails to all
have exactly the same files? Almost certainly not. If nothing else, each jail needs
unique SSH host keys. User accounts might have ephemeral information you
don’t want to carry to the clones.
Fixing sshd(8) host keys is easy. If host key files exist, sshd(8) uses them.
Removing the key files forces sshd to create new ones.
You’ll probably have other elements that you don’t want to replicate across your
jails. In my environment, I particularly don’t want the original host’s
/root/.ssh/known_hosts distributed across new jails; host keys change too
frequently, and a bogus entry will pain me months from now. I use a ridiculously
simple script, newjailclean.sh, that takes one argument, the name of the new jail.
#!/bin/sh
rm /iocage/jails/$1/root/etc/ssh/*key*
rm /iocage/jails/$1/root/root/.ssh/known_hosts
Clones inherit all of the original jail’s settings and configuration, including those
in /etc/passwd. This is guaranteed to cause contention among any group of
sysadmins: should the template have user accounts or a root password? Is it
better to have an initial default root password that you need to change on each
new host? Or should you risk having no root password? In my mind, the failure
mode of “this host has an old root password” is less horrific than “this host has
no root password,” but you must assess the risks in your environment. Whatever
you decide, put the result in your jail-cleaning script.
Your script will become especially important when using templates.

Templates
A template is a perfect jail specifically designed to be duplicated for other jails.
It’s basically a variant of a clone, except that the template jail is set to read-only
to avoid unintended changes. A template is almost never run as an actual jail,
outside of testing. When you deploy a jail from the template, you add on other
programs and configurations depending on the jail’s role. Templates are only
worthwhile if you intend to deploy several jails from the template.
Configure your template to the standard baseline for your network, including all
files and services critical to your environment. All of my systems, regardless of
operating system or virtualization method, share a sudoers sudo configuration
file. My servers authenticate via LDAP, so they need ldap.conf and
nsswitch.conf. As a responsible sysadmin I disable password-based
authentication on all production, staging, and test servers, so my jails need a
custom sshd_config. Some environments have custom PAM configurations. I
add management users like ansible or nagios to the template, as well as fallback
accounts to handle those inevitable LDAP failures.
Just as with clones, any mistakes in your template get replicated to all jails based
on that template. It’s a little more high-risk than a clone, however. While a clone
is generally used to duplicate an existing jail, a template is intended for
deploying new jails. Configure template jails perfectly. Ideally, your organization
has a checklist for how to set up a new system. While a jail can’t encrypt its own
disk or have a serial console, steps like “configure LDAP” and “install tmux”
certainly apply. Use everything you can steal from the checklist, and then test
everything. Does the SSH server start with your new configuration? Does LDAP
authentication work? How about logging; does each jail run its own syslogd(8),
or do they forward all log messages to a syslog jail?
After you test the template, have someone else test it again. You can either fix
the template once, before deployment, or fix all of your jails later.
It’s entirely possible to create templates from templates, but I advise against it.
The thought of an organizational template, which you snapshot and clone to
create templates for different types of servers, which you snapshot and clone to
create individual servers, might feel tempting, but such trees are fragile and

make changes difficult. Resist this temptation, especially if you’re using ZFS.
Standard jails on ZFS can use a ZFS snapshot as a template. On UFS, build a
standard jail template by tarring up the template jail’s directory and extracting it
when needed.
Iocage’s template support is more complicated, and more featureful.

Creating Iocage Templates
Initially, your iocage template is a boring old jail exactly like every other jail.
Give it a temporary IP that will allow it access to all necessary network
resources. I’m going to test LDAP and SSH functionality, so the jail needs an
address on my network.
Exactly like other jails, dnstemplate is a ZFS clone of iocage’s directory of a
FreeBSD release. In this case it’s a clone of 11.2. You’ll modify the clone
dnstemplate, and then clone dnstemplate to create more jails.
All of my servers need the tmux, openldap-client, emacs-nox, and sudo
packages. Additionally, my DNS servers run BIND 9.13. I install all of these in
the template jail.
Now I copy my network’s vital configuration files into the template jail and
create standard users.
My template jail is intended as a base template for DNS servers, and while I’ve
installed the organization’s preferred DNS server, I won’t configure DNS yet.
Authoritative and recursive DNS servers have very different configurations.
When iocage creates a jail based on a template, it duplicates all of the template’s
parameters as well. If jails based on this template need specific non-default
iocage parameters, adjust those too.
Once you’re certain that the template jail works correctly, use the clone-cleaning
script discussed under “Clones” to remove any ephemera that must not be
replicated on jails based on this template.
Reclaim any temporary settings, such as temporarily loaned IPs, before
finalizing the template. Iocage lets you assign one IP to multiple jails, but you’ll
need to either configure those jails to avoid TCP/IP port overlaps or make sure
you don’t run multiple jails with that IP simultaneously. Future You will

appreciate you preventing those overlaps while they’re in front of you.
Once your template jail is set up exactly as desired, convert it to a template by
setting the template parameter. This makes the jail read-only at the ZFS level and
moves the dataset from /iocage/jails to /iocage/templates.
dnstemplate converted to a template.
Template jails do not start at system boot, even if the boot property is set to on,
and cannot be manually started. Running the jail would involve writing to the
dataset, and we can’t be having that.
View all templates with iocage list -t.

+-----+-------------+-------+--------------+---------------+
| JID |

NAME | STATE | RELEASE |

+=====+=============+=======+==============+===============+
| - | dnstemplate | down | 11.2-RELEASE | -

+-----+-------------+-------+--------------+---------------+
For more details on your templates, add the -l flag.
We can now deploy jails based on this template.

Using Iocage Templates
To create a jail based on a template, use iocage create with the -t flag. Give the
template name as an argument. Here I create a jail, dns3, based on the template
dnstemplate.
Take a look at the results.

+-----+--------+-------+--------------+---------------+
| JID | NAME | STATE | RELEASE |

+=====+========+=======+==============+===============+
| - | dns3 | down | 11.2-RELEASE | -

Iocage does not copy uniquely per-jail items, such as IPv4 and IPv6 addresses, to
the new jail. I must set IP addresses if I want them. I also must set booting at
system startup. Here I do everything in a single command.
Property: boot has been updated to on
Property: ip4_addr has been updated to 203.0.113.243
I can now start the jail and configure its specific function, confident that all its
core services work.

Templates and ZFS
Let’s look at how iocage templates work at the filesystem level. The default
output of zfs get is pretty wide, so I use the -o option to trim unneeded columns
from the output. I also ordered the output to more easily explain what’s going on.

iocage/iocage/releases/11.2-RELEASE/root@dnstemplate iocage/iocage/templates/dnstemplate

-

iocage/iocage/templates/dnstemplate/root iocage/iocage/releases/11.2RELEASE/root@dnstemplate
iocage/iocage/templates/dnstemplate/root@dns3

-

iocage/iocage/jails/dns3/root
iocage/iocage/templates/dnstemplate/root@dns3
The first entry, iocage/iocage/releases/11.2-RELEASE/root@dnstemplate, is a
snapshot of iocage’s FreeBSD 11.2 installation directory. All jails installed
running 11.2 start as a clone of this dataset.
The second entry, iocage/iocage/templates/dnstemplate, is a dataset to contain
the dnstemplate jail and its iocage configuration file.
Third is the dataset for the files belonging to jail dnstemplate,
iocage/iocage/templates/dnstemplate/root. It’s a clone of the 11.2 release in the
first snapshot.
Fourth, we have the snapshot iocage/iocage/templates/dnstemplate/root@dns3.
This is the state of the template dnstemplate when we created the jail dns3 from
it.
Last we have iocage/iocage/jails/dns3/root, the dataset for the files inside jail

dns3. It’s a clone of the dataset in the fourth entry.
Taken as a whole, we’ve cloned the 11.2 installation directory to create the
template dnstemplate, configured dnstemplate, and then cloned dnstemplate to
create the jail dns3. All jails based on dnstemplate have a dependency on the
11.2 release, even if we eventually upgrade them to FreeBSD 13 or 15 or 30.
This tree will get more complex if you use a template as a basis for another
template, which you then create jails from.
From this it’s easy to see how you’d create a ZFS-based jail template without
iocage.

Standard Jail Templates
If you’re using standard jails on ZFS, you can use ZFS snapshots to build your
own templates. If you’re using UFS, build templates with tar(1). Either way,
build your pristine jail first. Test it exactly as you would when using iocage.
To use templates via ZFS clones, each jail must be its own dataset. Here I create
a ZFS dataset for my DNS server template.
If you’re running UFS, create the directory /jail/dnstemplate.
No matter what filesystem you’re using, extract your chosen base.txz into that
directory and make an /etc/jail.conf entry for dnstemplate. Copy /etc/resolv.conf
into the jail. Start the jail and install the needed packages.
Now add other critical common files to the template jail, such as sudoers and
ldap.conf. Assign a default root password and create any local users. Remember,
jails based on this template inherit all of these users and passwords. Test your
template jail to verify that the core functions like LDAP and sudo behave as
expected.
As a very last step, eliminate files that should not be replicated:
/root/known_hosts, SSH host keys, and any other ephemera. Ideally, create a list
of files that should be removed and write a script to destroy them. You’ll need it
again, when you update the template if nothing else.
Shut the template jail down. It’s now ready to duplicate.
For ZFS, snapshot the jail’s dataset and create a clone from the snapshot. I name
my snapshots by date. Here I create the filesystem for jail dns1 from the
template.

While this would be a lot of work to create one server, creating additional
servers off this template is a single command.
This illustrates how templates are only worthwhile in bulk.
Templates on UFS use more space, but many people find throwing lumps of files
around conceptually simpler than ZFS snapshots. Back up your template jail to a
tarball. I strongly recommend including the date in the tarball name, so you can
easily update your template.
When you want to deploy the jail, extract the tarball.
Whether you’re on UFS or ZFS, configure dns1 in /etc/jail.conf and you’re ready
to go.

Updating Templates
Experienced sysadmins all understand that crafting and deploying a perfectly
polished server template is the only excuse the universe needs to obsolete that
template. Security advisories and patches arrive daily. Every time you deploy a
new jail, via any method, immediately run freebsd-update and pkg upgrade
(Chapter 5) to update it. Templates complicate patching, however.
A template and jails created from the template are different entities. Updates to a
template affect only new jails created from that template, not existing jails.
Patching iocage jails built from templates, or standard jails built from ZFS
clones, causes those jails to grow larger. You’ll want to update your template so
that newly deployed jails are less obsolete and require less patching.
Should you update your template every time you deploy a new jail? Not
necessarily. Most security updates are comparatively tiny, and constantly
updating the template means extra testing. Never updating templates isn’t a good
idea either, though. I generally update my templates every time the underlying
FreeBSD has a new point release. If I install a template with 12.0, I update the
template at 12.1, 12.2, and so on. This minimizes size increases on new ZFS
clones.
When you declare an iocage jail to be a template, iocage makes the ZFS dataset
read-only. You’ll need to declare the template jail to no longer be a template,
start and update it, and declare it to be a template again.
dnstemplate converted to a jail.
Property: template has been updated to no
While your template should have an existing snapshot for every jail based on the
template, I’d recommend creating a specific pre-upgrade snapshot right now. I
name snapshots after the date. If you don’t specify a snapshot name as the final
argument, iocage assigns one based on the current date and time.

Snapshot: iocage/iocage/templates/dnstemplate@2019-02-25_20:17:46 created.
Now upgrade the jail, restart the jail, and upgrade the packages.
Your system and packages are now updated, so something’s subtly busted. That’s
the rule. Fix the problems, verify that everything works as expected, then shut
down the jail.
Remove any files that shouldn’t be propagated to new jails, such as the
template’s SSH host keys. Remember in the last section, when I suggested you
write a script to remove these files? This is why. Run your convenient templatecleaning script.
Now switch the jail back to a template.
Your jail is now updated. New jails cloned from this template will get the most
secure versions of all installed software… if you create them before the next
security advisory.¹

Base Jails
Perhaps the biggest pain point in jail management is applying security patches.
You must apply patches immediately if not sooner, but disks have limited
throughput. When you have hundreds of jails, patching is a not-inconsiderable
undertaking and imposes a noticeable performance hit. Similarly, some
environments need their jails to all run the exact same FreeBSD release, often
down to the packages. If you manage dozens of jails or require meticulous
version synchronization, consider base jails.
The term “base jail” originated in the days when people would remount the base
operating system as a filesystem for all the jails. Once upon a time, disks were so
small that an operating system took up a substantial portion of a system’s
storage. Reusing the base install for a jail was a substantial savings. That feels
quaint in this age of multiterabyte disks.
Nowadays the term describes any jail setup derived from that type of
configuration. Most often there’s a FreeBSD install somewhere on the disk,
exactly as for a regular jail, but which gets remounted for use by other jails. The
term “base jail” could mean the type of jails being used, the jail upon which
others are based, or a jail that’s based on another jail. In other words, a base jail
is a base jail based on the base jail. In the interest of clarity, I’ll refer to a jail
underlying other jails as an origin jail. Jails built on that base (dang it!) I’ll call
derived jails. Once you understand how everything works and can infer the exact
meaning of “base” from context, feel free to call everything a base jail and
perplex the next generation.
FreeBSD’s nullfs(5) allows connecting directories to multiple points of the
directory tree. A modern base jail takes advantage of nullfs to mount key
directories from a single jail’s filesystem over many other jails. The derived jail
mounts those directories read-only, so a derived jail can’t muck with its peer
derived jails. Updating the origin jail magically updates the binaries and other
critical files in all the jails. It won’t update /etc for you, but handles all the
binaries and libraries.

Base Jail Packages
Base jails complicate software management. Think about templates for a
moment. The main reason to deploy jails from a template rather than from a
release is because all your jails need a common set of packages and
configuration files. Including packages in an origin jail gets complicated quickly,
though. It’s not that including packages in the origin jail is technically
complicated, but the administration of those packages can spiral into a tangled
mess.
The obvious approach is to mount the origin jail’s /usr/local in the derived jail.
This works great, if all of your derived jails need exactly the same packages. But
do they? Do they really? How many of your web servers have that one special
package required by no other server? With /usr/local mounted read-only, jail
administrators cannot install additional packages. Any package you install in the
origin jail is available to all jails. You must separate jails by role. Fine. Let’s
suppose you need a whole bunch of nginx server jails, so you create an nginx
origin jail. Some of your applications need PHP 5.6, though, while others need
PHP 7. FreeBSD’s packaging system doesn’t support installing multiple versions
of PHP. Do you install both by hand, one as /usr/local/bin/php56 and the other as
/usr/local/bin/php7, and manually install all the modules? Or do you carefully
divide your jails by very precise software requirements? What do you do when
one jail needs a specific php-xmlreader package, but another jail explicitly needs
that package to not be installed?²
You choose your pain, that’s what you do.
Another option would be to use poudriere to build packages that use a different
package root directory by setting $PREFIX. You could put your origin jail’s
packages in /usr/pkg, like NetBSD, and reserve /usr/local for truly local
packages. A whole bunch of software doesn’t recognize software installed
outside the root directory or /usr/local, however. NetBSD’s valiant pkgsrc
developers do an inordinate amount of work to make software in /usr/pkg work
correctly, but many upstream projects don’t accept those patches because what
sort of loony needs software installed outside / or /usr/local? Default FreeBSD
packages might not recognize software in /usr/pkg, resulting in duplicated or
conflicting software installs.

It can be done. It’s a great deal of work. Do you want to do that work? If you
elect to perform that work, submit patches.
Or, you could use poudriere to build packages that install directly under the root
directory. Rather than installing sudo(1) as /usr/local/bin/sudo, put it in
/bin/sudo. I abhor this solution, even though it works. Mostly. One of FreeBSD’s
key advantages is the clear separation between the base system and packages. A
file from a package might overwrite a base system file. Again, basing packages
in / can be done, but requires careful testing.
Even if your software is all identical, chances are your server configuration will
differ. All those configuration files that normally appear in /usr/local/etc but the
jail admin needs to edit must go someplace local to the derived jail. For example,
while FreeBSD’s Apache port uses a default configuration file of
/usr/local/etc/apache24/httpd.conf, that directory would be mounted from the
derived jail. The jail admin will be rightfully upset if she can’t edit it. You’ll
need a configuration directory like /etc/apache24. Perhaps you’ll need an
/etc/rc.conf entry to point Apache at a configuration file in that directory. Maybe
you’ll keep the standard configuration file location, but edit it to suck in
additional configuration files from the local configuration directory.
Configuration files used globally, like ldap.conf and sudoers, can remain in
/usr/local/etc.
Or, you can meticulously group jails by role and software requirements and
develop a comparatively painless process to migrate derived jails between origin
jails. Fortunately, that’s not terribly difficult.

Iocage Base Jails
Iocage defaults to using a release as the origin jail. This maximizes flexibility for
each derived jail, but minimizes shared local customization. Patching the release
updates the FreeBSD install for each jail, but doesn’t affect the packages or
configuration.
Create a derived jail by adding the -b flag when creating the jail.
dns3 successfully created!
Before customizing the new jail, let’s examine the filesystems and mounts
iocage uses for this base jail. Widen your terminal to 120 characters or so and
follow along.
iocage/iocage/jails/dns3 on /iocage/jails/dns3 (zfs, local, nfsv4acls)
iocage/iocage/jails/dns3/root on /iocage/jails/dns3/root (zfs, local, nfsv4acls)
These datasets are for the jail’s iocage directory and the jail’s root directory,
exactly like any other jail.
/iocage/releases/11.2-RELEASE/root/bin on /iocage/jails/dns3/root/bin (nullfs,
local, read-only)
Here’s the first piece of base jail magic. The /bin directory from the FreeBSD
release is mounted read-only on the jail’s /bin directory. This same remounting
happens for /boot, /lib, /libexec, /rescue, /sbin, /usr/bin, /usr/include, /usr/lib,
/usr/libexec, /usr/sbin, /usr/share, /usr/libdata, and /usr/lib32. After all that,
you’ll find the standard devfs(5) and fdescfs(5) mounts that appear in all iocage
jails.

With all of these remounts and overlays from the origin jail, what’s left to handle
inside the derived jail? For one, everything in /etc. Local configuration is
entirely delegated to the derived jail. As user accounts aren’t centrally managed
by the jail, /usr/home needs to remain with the derived jail. Each jail manages its
own logs and packages, so the derived jail includes /usr/local and /var. If your
jail includes the FreeBSD source code it’s presumably so you can hack on it, so
the jail gets its own copy. Directories like /var and /home all go with the derived
jail.
When creating the derived jail, iocage populates only the directories managed by
the derived jail. As /bin and /sbin get remounted from the origin jail, iocage
empties the derived jail’s /bin and /sbin. If you’re in doubt about which files
iocage copies into a derived jail and which get remounted from the origin jail,
stop the jail and examine the derived jail’s directory tree. Test this yourself.
Here, base jail dns3 is running.
[ df kill ps
Stop the jail and look again.
With the origin jail’s directories unmounted, the derived jail’s /bin is empty.
Jailed users perceive their filesystem differently. The jail appears as a single
contiguous filesystem rather than a morass of nullfs mounts. A jail has no
knowledge of those mythical filesystems beyond its root directory, so those
mounts are invisible.

iocage/iocage/jails/dns3/root on / (zfs, local, nfsv4acls)
A curious user with root access to a jail can trivially identify read-only
directories with touch(1). Once she starts looking, she’ll quickly realize that
she’s in a base jail. Don’t count on the invisibility of base jail mounts for any
sort of security.
To see all base jails on the system, run iocage list -B.

| JID | NAME | STATE | RELEASE |

+=====+======+=======+==============+===============+
| - | dns3 | down | 11.2-RELEASE | 203.0.113.243 |
For the long jail list that includes only base jails, add the -l flag.
You can use other iocage list flags like -q and -s to modify the output.

Custom Iocage Base Jails
Derived jails that use a FreeBSD release as the origin are handy when you want
to update a base operating system install once and have those updates
automatically replicate to all the derived jails. But what if you want a customized
origin jail, including additional files? Use a template as the base jail.
Create the derived jail as you would any other template-based jail by using the -t
flag, but add the -b flag to create it as a base jail. Here I create a derived jail
named dns4 that uses the template dnstemplate as the origin jail.
Any updates you apply to dnstemplate automatically propagate to dns4.

Iocage Base Jail Rebasing
No matter how carefully you assign your base jails to their roles, eventually
you’ll need to move a derived jail to another origin jail. Future releases of iocage
will include an option to do this automatically, but for the moment you’ll need to
manually rebase your jails by backing up the old derived jail and restoring it in a
new derived jail.
On the host, use tar(1) to back up the derived jail. The --one-file-system flag tells
tar to not cross filesystem boundaries. It won’t cross the nullfs mounts holding
the files remounted from the origin jail, thus including only what’s in the derived
jail’s filesystem.
/iocage/jails/dns4/root/
Create a new derived jail and restore the critical files. You’ll need to manually
compare files like /etc/rc.conf and build new configurations. If the origin jail
provides /usr/src, you can use mergemaster(1). Which exact files you can
restore, which you mustn’t, and which you must evaluate and rebuild depends on
exactly how you’re using base jails.
You could leave the derived jail in place and manually change the jail’s fstab to
point at the new origin, but this goes outside iocage management and something
might break.

Standard Base Jails
Using a base jail with FreeBSD’s standard jail management tools is only slightly
more complicated than using iocage. You must prepare the origin jail, create an
fstab, prepare the derived jail, and configure jail.conf. We’ll create an origin jail
(ldapbase) and a derived jail (ldap3), and also create a template to ease
deployment of further jails using the same origin jail.
Create your origin jail exactly like any other jail. If you’ll be including packages
with your base jail, install those packages in the origin jail. If you wish, create
the origin jail from a template. Each of your derived jails will have an
independent /etc, so the origin jail’s cryptographic keys can’t leak into the
derived jails. Configure the origin jail in the host’s /etc/jail.conf and verify that it
functions as expected. The jail should be able to reach the Internet, provide a
shell, cleanly start and stop, and all the other functions you’d expect. My origin
jail is intended for LDAP servers and is called ldapbase. As this origin jail
shouldn’t start automatically at system boot, I exclude it from the host’s rc.conf
settings.
Decide which directories your base jail provides from the origin jail and which
must be in the derived jail. Base jails default to “all directories not provided by
the origin jail belong in the derived jail,” but it’s worth considering if this
specific application must write to specific directories normally provided by the
origin jail before trying to deploy. At a minimum, an origin standard jail must
provide the directories an iocage origin jail provides. You’ll use this list to build
the filesystem table for your jail.
Remember back in Chapter 4 when we discussed how mount(8) can use fstab
files other than /etc/fstab? We’ll use the mount.fstab parameter to give each jail
its own filesystem table, in the exact same syntax as /etc/fstab. The jail system
mounts these filesystems before creating the jail and unmounts them after
shutting down the jail.
Store each jail’s fstab outside the jail. You might find it useful to create a
directory for each jail to contain jail metadata, much as iocage does, or perhaps
create directories for different types of per-jail files.

I create a /jails/fstab/ directory for fstab files, each named after the jail. My first
derived jail will be called ldap3, so it uses ldap3.fstab. Here’s a typical fstab,
providing the same filesystems iocage-based derived jails inherit.

/jail/ldapbase/bin

/jail/ldap3/bin

/jail/ldapbase/boot

/jail/ldap3/boot

/jail/ldapbase/lib

/jail/ldap3/lib

/jail/ldapbase/libexec

/jail/ldap3/libexec nullfs ro 0 0

/jail/ldapbase/rescue

/jail/ldap3/rescue

/jail/ldapbase/sbin

/jail/ldap3/sbin

/jail/ldapbase/usr/bin

/jail/ldap3/usr/bin

/jail/ldapbase/usr/include /jail/ldap3/usr/include nullfs ro 0 0
/jail/ldapbase/usr/lib

/jail/ldap3/usr/lib

/jail/ldapbase/usr/libexec /jail/ldap3/usr/libexec nullfs ro 0 0
/jail/ldapbase/usr/sbin

/jail/ldap3/usr/sbin

/jail/ldapbase/usr/share /jail/ldap3/usr/share nullfs ro 0 0
/jail/ldapbase/usr/libdata /jail/ldap3/usr/libdata nullfs ro 0 0
/jail/ldapbase/usr/lib32

/jail/ldap3/usr/lib32 nullfs ro 0 0

Now create a template for derived jails.
A derived jail includes everything that isn’t in the origin jail. The easiest way to
create the derived jail template for standard jails is to take the template used to
create the origin jail and remove everything the base jail provides. The fstab file
provides a convenient list of directories to be emptied. Don’t remove the
directories—you can’t mount anything on nonexistent directories! Only remove

the contents.
You might save this as a new template for derived jails. As the origin jail
contains all of the stuff that gets patched during an upgrade, a derived jail
template remains valid longer than most templates.
You might find you can’t delete some files.
rm: /jail/ldap3/lib/libc.so.7: Operation not permitted
rm: /jail/ldap3/lib/libcrypt.so.5: Operation not permitted
rm: /jail/ldap3/lib/libthr.so.3: Operation not permitted
These files are installed with the immutable flag set. Clear that flag and try
again.
If your standard jail template included packages, those packages got copied into
the origin and derived jails. The fstab above doesn’t remount the origin jail’s
/usr/local onto the derived jail, so the jail has its own independent copy of those
packages. The template also includes /var/db/pkg, the package database, so the
templated jail can manage those packages. You might want to include the origin
jail’s packages instead… or not. Again, package management with base jails is a
matter of agony selection.
Last, make a jail.conf entry for your derived jail. “Base jail” and related words
doesn’t appear anywhere in jail.conf. All you need to create a derived jail is the
mount.fstab parameter that specifies an fstab to mount before starting the jail.

ldap3 {
ip4.addr="203.0.113.239";
mount.fstab="/jail/fstab/ldap3.fstab";

Default Base Jail fstab Files
I’m always tempted to make mount.fstab a default setting. If it’s a default,
however, you can’t start or stop any configured jail without an fstab. Creating an
empty fstab file with touch(1) satisfies the jail system, though, or you could set
mount.nofstab in the jail definition. If you set mount.fstab as a default, you must
either create an fstab for every jail or set a property for fstab-free jails.
mount.fstab="/jail/fstab/$name.fstab";
Which is right for your environment? All I know is, whatever choice you make
will annoy you.

Standard Base Jail Crashes
I treat my jails badly. When they threaten to stay up, I put a stick between their
legs so they trip. At times, I unceremoniously crash them. For normal jails this
isn’t a big deal, other than recovering any dirty databases, but a crashed base jail
leaves wreckage behind. The jail shutdown process unmounts any filesystems
mounted during the startup. If the jail crashes, you need to manually unmount
those filesystems.
Derived jails won’t restart until you unmount leftover filesystems. That might
seem unnecessary, but jail(8) thinks that if it’s responsible for those filesystems
it’s gonna dang well be sure the right ones are mounted.

Packages and Standard Base Jails
A standard set of packages that’s centrally managed in a single origin jail and yet
meets every need for every jail is the Platonic ideal, long-sought and forever
unattainable. All those problems that apply to distributing packages in iocage
base jails apply exactly as well to standard base jails. You’re going to wind up
with several different origin jails that each have their own package sets, and
shifting derived jails between those origin jails as needed. Here we run into the
deadliest part of jail management, and the system administrator’s nemesis:
organization.
Sysadmins love creating organizational schemes. When we start a new
assignment or job, the first thing we do is gripe about our predecessor’s lack of
organizational expertise, and loudly declare that our new and improved scheme
will handle all problems for every conceivable use case, forever, while
simultaneously optimizing resource use. Inside six months we’re looking for a
new way to organize everything, as this environment is “unexpectedly
complicated.” We struggle with the system for a while longer, eventually giving
the whole thing up as a bad job and searching for a new gig.³
One factor many people cite in deciding to use base jails is optimizing disk space
usage. There’s nothing wrong with this fully natural tendency for efficiency, but
combined with base jails it leads directly to an organizational nightmare. I’ve
seen several setups where people install a single origin jail, derive jails from that
for different package loads, and then carefully cross-mount and remount specific
/usr/local and /var/db/pkg directories to other derived jails depending on each
jail’s needs. It’s unquestionably space-efficient, yes, but exchanges a few gig of
disk for a vastly increased chance of outages incurred from administrative
overhead.
Once you find yourself contemplating deriving jails from derived jails, step back
and slap yourself until you regain your senses. Base jails are complicated. Don’t
increase their complexity. Instead, do this complex thing in the simplest possible
manner.
I recommend creating an origin jail for each type of package load. Suppose I
have a bunch of web server jails. They all run the same web server software but

have different PHP versions. Create an origin jail for each set of packages you
want available, and give the origin jail a name that represents that package set. If
I have a group of jails running FreeBSD 12 with (now-EOL’d) PHP 5.6, and
another running FreeBSD 12 with PHP 7.1, I might call them 12php56 and
12php71. I don’t include FreeBSD minor versions in the names, because I’ll be
upgrading these jails throughout the FreeBSD 12 lifespan.

Preparing an Origin Jail With Packages
Let’s start with creating the 12php56 origin jail. Extract base.txz from FreeBSD
12 into /jail/12php56.
Now do the basic setup.
As I’ve set mount.fstab as a default in jail.conf, each origin jail needs a blank
jail(8) fstab file.
Now create a jail.conf entry for this origin jail.
12php56 {
ip4.addr="203.0.113.221";
If everything is correct, the jail should start.
Starting jails: 12php56.
The jls(8) command shows the jail is running. I did it right? Huh. Cool.
Get the latest security patches.

`jexec -l 12php56 freebsd-version` fetch install
Now install the desired packages in the jail. Make sure you put the correct
versions in the correct jail—installing PHP 7.1 in the PHP 5.6 jail wrecks the
whole endeavor.
Technically, you have a complete origin jail for web servers using PHP 5.6. A
little extra effort here can save you work later, though. Remember, the default
configuration files all live in /usr/local, which will be read-only mounted from
the origin jail. Your derived jail will need its own configuration files for many
services. Providing suitable flags and examples in /etc/rc.conf right now will
save you much scrambling later. For example, Apache lets you set a custom
configuration file with the -f flag. Adding a placeholder entry to rc.conf will help
Future You appreciate Present You.
apache24_flags="-f /etc/httpd.conf"
Even if you need to change the configuration file location, a good example
helps.
You don’t need to provide alternate configurations for all programs. Some
configurations, like the sudoers used by sudo(1), probably should be managed
entirely from the origin jail.
Now let’s derive a jail from this origin.

Preparing a Derived Jail with Packages
Let’s set up www8, a base jail derived from 12php56. A derived jail is identical
to an origin jail, minus the directories provided by the origin jail. Figure out
what comes from the origin jail, and create an fstab for that. Here’s an fstab for
www8, www8.fstab. It looks much like the fstab for any other derived jail, but
includes entries for /usr/local and /var/db/pkg.

/jail/12php56/bin

/jail/www8/bin

/jail/12php56/boot

/jail/www8/boot

/jail/12php56/lib

/jail/www8/lib

/jail/12php56/libexec

/jail/www8/libexec

/jail/12php56/rescue

/jail/www8/rescue

/jail/12php56/sbin

/jail/www8/sbin

/jail/12php56/usr/bin

/jail/www8/usr/bin

/jail/12php56/usr/include /jail/www8/usr/include nullfs ro 0 0
/jail/12php56/usr/lib

/jail/www8/usr/lib

/jail/12php56/usr/libexec /jail/www8/usr/libexec nullfs ro 0 0
/jail/12php56/usr/sbin

/jail/www8/usr/sbin

/jail/12php56/usr/share /jail/www8/usr/share

/jail/12php56/usr/libdata /jail/www8/usr/libdata nullfs ro 0 0
/jail/12php56/usr/lib32

/jail/www8/usr/lib32

/jail/12php56/usr/local /jail/www8/usr/local

/jail/12php56/var/db/pkg /jail/www8/var/db/pkg nullfs ro 0 0
The whole point of this derived jail is that it gets all packages from the origin
jail, so why drag along /var/db/pkg? Users can use pkg(8) to query the package
database, saving me the trouble of answering trouble tickets with “yes, php56xmlwriter is installed, the problem is your busted code.”
Our derived jail runs FreeBSD 12.0, like the origin jail. If you have a tarball
containing a 12.0 derived jail, you can use it. If not, prepare one from our new
origin jail. Here I copy our origin jail, /jail/12php56, in its entirety into
/jail/www8.
Now empty all directories the origin jail will provide. Remember, don’t destroy
the directories, only the content of the directories. You can’t mount filesystems
on nonexistent directories. Use the www8.fstab file as a checklist.
I recommend using full file paths, to avoid accidentally emptying the host’s
/bin.⁴
We never started sshd(8) or used an SSH client, so there’s no need to blow away
the host keys or any known_hosts files.
You now have a directory tree for a FreeBSD 12.0 jail. Save it so you can skip
purging these directories next time you want a jail.
Now configure the derived jail in /etc/jail.conf. If you’ve defined mount.fstab as
a default property, all you need to set is an IP address.

Now that you’ve set up a single jail and saved a tarball of the derived jail,
creating other derived jails is a matter of extracting that tarball in another
directory, creating an fstab, and making a jail.conf entry. As that tarball doesn’t
include any packages, you can use it for any origin jail of the same release.

Rebasing Standard Jails
All software becomes obsolete. PHP 5.6 is past its end-of-life, and eventually
you’ll get the time to stop using it. You’ll need to migrate all your applications to
a newer version of PHP. Rather than installing the newer software in the origin
jail and attempting to migrate all of your derived jails simultaneously, rebase
each derived jail one-by-one to an origin jail running a different version of that
software. Changing a derived jail to rely on a different origin jail running the
same FreeBSD release is trivial. Merely edit the derived jail’s fstab to pull in the
other origin jail’s directories. You can safely edit a jail’s fstab while the jail is
running; jail(8) can unmount nullfs mounts even with an incorrect mount device
in fstab.
Yes, changing a standard base jail’s origin jail is as simple as a global searchand-replace and a restart.
The tricky part of rebasing a jail comes in integrating changes between the
different FreeBSD versions. Jails make building test servers fairly
straightforward, especially if you’re using ZFS and use clones. Yes, you must
configure your applications to run on a different IP address or perhaps use host
files, but that’s wholly unrelated to jails. While you can minimize some
application changes, you’re still stuck with upgrading the base jail’s /etc. The
simplest way is to share /usr/src on your origin jail and use mergemaster(8).
Once you’ve performed a few of these upgrades, you’ll have a really good idea
what files can be kept, which need wholesale replacement, and which need
careful handling.
¹ “Sysadmin” is just another way to say “professional patcher.” You’re a roofer,
but indoors and with different tar.

² It’s a short step from here into complete containerization. Or insanity. But I
repeat myself.

³ I know, I know. You’re the exception, and your systems and records are
pristine. I’m talking about those other sysadmins.

⁴ Again.

## Chapter 7. Living In A Jail

A lightweight virtual machine isn’t the same as a host or a fully virtualized
system. For one, the host imposes restrictions on the jail. The jail owner can’t
change those restrictions from within the jail; he must request those privileges
from the host sysadmin. These restrictions are a feature—if there’s no reason for
your database server to be pinging the outside world, why permit that activity?
Being a jail administrator means knowing your limits, understanding them, and
working around them. The most obvious limits involve rebooting, processes, and
network access.

Restarting Your Jail
Commands that shut down or restart the system, like halt(8), reboot(8), and so
on, don’t work in jails. These commands work by signaling the kernel and the
master process init(8) that it’s time to carry out their final tasks: signal all the
processes to shut down gracefully, kill all the processes, flush the disk cache, and
either halt or restart the hardware. Jails can query but not change the kernel, and
they have no init process. The result?
reboot: SIGTSTP init: No such process
Strictly speaking, a jail sysadmin should never need to reboot their jail. A jail is
only a bunch of processes trapped in a collection of transformed namespaces.
Seasoned sysadmins understand that it’s perfectly possible to restart all those
processes and achieve the same effects as a reboot. Seasoned sysadmins also
know that sometimes the easiest and least risky way to achieve these restarts is
to reboot the dang jail.
The only way to restart a jail is from the host. You must ask your host sysadmin
to perform the reboot. If you hunt around, you can find add-on scripts that will
let jail owners reboot their jails. None of them have been nicely packaged for
installation, though.

Processes and Jails
A host’s processes and process IDs are each unique. A jail does transform a
processes’ namespace, but only by restricting which processes can be viewed
within the jail. If PID 2029 is in the jail loghost, no other PID 2029 appears
anywhere else on the host, jailed or not. PID 2029 can only see processes in its
own jail, however. Jails cannot see PID 1, or /sbin/init.
If you’re managing your jails with iocage, remember that iocage puts the prefix
ioc- before every jail name. Perhaps the host doesn’t think the jail www1 exists,
but the jail ioc-www1 does.
If you run ps(1), jailed processes show up with the J flag. I’m inside a jail here.
$ ps

PID TT STAT TIME COMMAND
23615 0 IJ 0:00.01 login [pam] (login)
23616 0 SJ 0:00.01 -csh (csh)
24808 0 R+J 0:00.00 ps
Look under STAT. All of the processes have the J flag. The jail can’t see
anything that’s not in its own jail. If I checked processes on the host, PIDs
23615, 23616, and 24808 would show up exactly the same.

Network Visibility
Networking commands like netstat(1) are tightly tied to the kernel’s data
structures. If the version of FreeBSD running inside the jail is older than the
version running on the host, they probably won’t work. You must use netstat
from the host.
The sockstat(1) command has a -j flag, to let you specify a jail to observe. You
must run it from the host.
Always check a command’s man page to see if it has a jail-specific flag that will
help in troubleshooting. Now let’s head towards kernel-level customization of
individual jails.

## Chapter 8. Jail Features And Controls

A jail’s root account has complete control of the jail’s userland. She can add
accounts, install packages, configure login classes and servers, and more. Yes,
the host administrator can block out a bunch of these functions through tricks
like mounting filesystems read-only, but for the most part the jail owner controls
her jail.
The host administrator can also permit jail owners greater kernel-level access to
their jails. This includes functions like allowing the jail owner to change their
jail’s hostname, allocate kernel memory for System V IPC, mounting
filesystems, and enforcing chflags(1). All this requires that the jail owner
interacts with the kernel more authoritatively, and the host administrator must
deliberately enable all of these features.
Many advanced jail features have two levels of access control. First, the feature
must be enabled on the host. If the host administrator wants the jail owner to be
able to mount filesystems, he must toggle “jails can mount filesystems” on the
host. This doesn’t actually grant any individual jail the power to mount
filesystems, however. The host administrator needs to set that permission on
individual jails. While not all features have this dual-layer access control, many
do. When you set a permission on a jail and it doesn’t work, check to see if
there’s a host-level control for that feature.
In this chapter we’ll look at memory management, securelevels, and filesystems
as examples of per-jail features, but the underlying access control concepts will
be used throughout the rest of this book.

System V IPC
System V IPC, or sysvipc, is a way a program or set of programs can set aside a
chunk of memory and use it as a shared resource. Programs can send each other
messages, leave records, manage queues of objects, scribble “Hey Bill, look at
this!” and so on. Think of sysvipc as a shared whiteboard where different
processes can communicate with one another.
While sysvipc was designed with access controls, those access controls
considerably predate Unix virtualization, let alone jails. For many years, all the
jails on a host shared one common sysvipc namespace. This meant you couldn’t
securely isolate programs like databases within jails. All supported versions of
FreeBSD offer sysvipc namespace translations, though, so you can now safely
use sysvipc in jails.
Sysvipc is broken up into three components: message primitives (sysvmsg),
semaphore primitives (sysvsem), and shared memory primitives (sysvshm). Each
of these primitives can be set to new, inherit, or disable.
New, or 1, means that the host provisions a private sysvipc namespace for that
feature, totally isolated from the other jails. Inherit, or 2, tells the host to permit
access to the host’s sysvipc memory space. Using inherit is generally
inadvisable, unless you’re deliberately using sysvipc for communication
between jails. Finally, disable, or 0, tells the host to disable that type of sysvipc
in the jail.
I recommend treating all of these primitives as a unit and setting them all to the
same value. Yes, it’s entirely possible that a program might need only one or two
primitives. Even if this particular release of DoofusSQL only needs shared
memory and runs fine without the other primitives, a point release might well
add another primitive and cause weird failures.
Jails use the sysvmsg, sysvsem, and sysvshm parameters for sysvipc. There is no
host-level access control for sysvipc.

security.jail.sysvipc
There’s a sysctl security.jail.sysvipc, and you’ll see references to an
allow.sysvipc parameter. These are obsolete, and are used to control per-jail
access to the host’s untransformed sysvipc namespace. Enabling it is equivalent
to setting all three sysvipc parameters to “inherit.”
If it’s obsolete, why mention it? There’s almost twenty years of documentation
out there referring to it, for one thing. If a document says that you must enable it,
stop and consider what you want to achieve. For many years, sysadmins had two
choices for jail sysvipc: disable sysvipc entirely, or allow access to the host’s
sysvipc namespace. Many programs, notably databases, won’t run without
sysvipc, so the host administrator had to delicately judge whether to jail the
service or not.
In most cases, if a document says “enable sysvipc,” on modern FreeBSD you
can safely set the specific jail’s sysvipc parameters to “new.” It’s extremely rare
that you would truly want “inherit,” as the documents might imply.
Using sysvipc on older FreeBSD meant enabling the security.jail.sysvipc sysctl,
and then enabling sysvipc on individual jails. If you find this still in use on your
hosts, migrate them to the newer system.

Sysvipc and Standard Jails
The default sysvipc setting for standard jails is “disable,” or 0. This was
FreeBSD’s default for many years, and most programs work fine with it. Set the
new parameter values in jail.conf, using either the word or numerical values.
Here we enable a new sysvipc namespace for the jail logdb, so I can run a
database and aggregate my log entries.
logdb {
ip4.addr="203.0.113.232";
sysvmsg=new;
sysvsem=new;
sysvshm=new;
Restart the jail and you’ll see sysvipc enabled therein.
name sysvmsg sysvsem sysvshm
logdb 1 1 1
We can now run a database in this jail.

Sysvipc and Iocage
Iocage has the same sysvmsg, sysvsem, and sysvshm parameters. The default is
“new,” creating a new sysvipc memory space for every jail. It uses a scrap more
memory than disabling sysvipc, but programs Just Work. To change these
parameters, use the word values rather than the numbers. Here, for a variety of
daft reasons including but not limited to managerial fiat, I’m letting this jail
access the host’s sysvipc namespace.
The jail wdb2 is now ready to leak information into any other jail set to inherit
sysvipc namespace.¹

Securelevels and chflags(1)
While you can change a jail’s securelevel, many securelevel protections and
access controls simply don’t apply to a jail. Jails don’t get access to disk devices
by default, so disallowing the ability to edit those devices is irrelevant. In the
unlikely disaster of a jail panicking the kernel, the host handles all the debugging
functions. While we’ll discuss jails using their own packet filter in Chapter 9,
many sysadmins perform all packet filtering at the host level. Jails can’t change
the system clock.
The only securelevel control that has practical impact in a jail is file flag
enforcement, so we’ll focus on chflags(1). This means that the only securelevels
that really matter are -1 and 1. (Securelevel 2 matters if you’re running a jailed
firewall.)
Standard jails default to securelevel -1, while iocage jails default to 2.

Setting Jail Securelevel
Jails can run at any securelevel equal to or higher than the host’s. A jail cannot
have a securelevel lower than the host’s. The securelevel can be increased when
creating the jail, or from within the jail.
The parameter securelevel controls the jail’s securelevel at creation time.
Standard jails default to the host’s securelevel, -1 by default, while iocage jails
default to securelevel 2. Adjust this in jail.conf or with iocage set, exactly as you
would any other parameter.
A jail owner can increase the jail’s securelevel through the kern.securelevel
sysctl, or by setting a new securelevel in the jail’s /etc/rc.conf.
This complicates checking a jail’s securelevel. An iocage get securelevel or
checking jail.conf will give you the securelevel the jail was created with, but the
jail owner might have changed the jail’s securelevel. Use jls to get a jail’s actual
securelevel.
Securelevel is a parameter where I always query the current state of the jail, not
the way the jail was created.

File Flags and Securelevel
While most file flags don’t interact with securelevel, securelevel directly
controls schg and sappnd. At securelevel 1 or higher, these flags prevent
removing or altering files they’re applied to.
If a host is running at securelevel 0 or -1, but the jail is running at securelevel 1
or greater, the jail owner can’t remove these flags or muck with files marked
with these flags—but the host administrator can. If you have an overly
enthusiastic but inexperienced jail administrator, this can result in trouble tickets
like “I made my home directory immutable, send help!” You can also use it as
part of your security enforcement, though. If you want to keep jail owners from
replacing system binaries in the jail, flag them all as immutable and crank up the
jail’s securelevel. You must run chflags -R noschg on those critical directories
before upgrading the jail, but for certain environments (and certain users) it’s
worth the trouble.
Jail owners cannot use chflags(1) by default, as that leads to those
aforementioned support tickets. If you want a jail owner to be able to set file
flags, you must set the allow.chflags parameter on the jail.

Mounting Filesystems
Filesystems are dangerous. Corrupt filesystems can panic the host. Jails can’t
mount filesystems by default. If you grant a jail owner permission to mount a
type of filesystem, they can mount any filesystem of that type. It’s truly best for
the host administrator to mount any needed filesystems for the jail, preferably
through an fstab file (Chapter 4) or the automounter.
But sometimes you can’t help it. Perhaps the jail exists specifically to examine
and process filesystems, or maybe it needs a filesystem mounted at irregular
intervals but specifically not mounted at other times. Reality is often
inconvenient that way. You can grant a jail permission to mount specific types of
filesystem.
Remember, not all filesystems can be managed from within a jail. Identify jailsafe filesystems by running lsvfs(8) and looking for the “jail” flag. Some
common filesystems like FAT, cd9660, NFS, and even UFS cannot be safely
managed from within a jail. They are tightly integrated into the virtual memory
system in such a way that they cannot be easily contained. ZFS was written for
virtualizing operating systems, so making it jail-safe was fairly straightforward.
You can manage synthetic filesystems like devfs, fdescfs, and tmpfs, as well as
FUSE and (sadly) procfs from within a jail. You can also manage Linux
synthetic filesystems like linprocfs and linsysfs, but not EXT-based filesystems.
While an unsafe filesystem cannot be managed from within a jail, it can provide
data storage to a jail. Mount and manage such filesystems from the host.
If you still want to manage filesystems from within a jail, read on.

Mounting Prerequisites
The enforce_statfs parameter (Chapter 4) controls mount point visibility. The
default setting, 2, means that mount points other than the jail’s root directory are
invisible as mount points. The jail owner can’t even see mount points that they
know exist (like /dev) as mount points, but only as directories. This blocks any
chance of mounting anything anywhere other than /. To allow a jail owner to
view other mount points, and thus to mount anything that can be perceived from
within the jail, set enforce_statfs to 1. (You could also set it to 0, but that
removes all mount point visibility restrictions and is almost certainly a terrible
idea.)
Invisible mount points can cause problems. The jail owner can think that their
jail has a great deal of disk space, but maybe the host administrator has mounted
a separate partition as the jail’s /home and that partition is almost full. The jail
owner can’t see that. Moving open files between partitions won’t happen. I’m
not saying don’t configure your jail with multiple invisible partitions, but I am
saying you should let the jail owner know about it.
Now that the jail can see mount points, let’s talk permissions. Jails have a
generic mount parameter, allow.mount. It defaults to zero, disallowing all
mount(8) commands from within the jail. Setting it to 1 opens the possibility of
mounting and unmounting filesystems.
You still need to grant permissions by filesystem type, however. Jails provide
separate parameters for permissions to new mounts and unmounts of each jailsafe filesystem, in the form allow.mount. and the filesystem name, such as
allow.mount.zfs and allow.mount.devfs. If the jail has a parameter granting
permission to mount that filesystem type, the jail’s root account can use the
standard mount(8) commands to mount and unmount those filesystems.
Permission to mount and unmount a filesystem does not include the power to
mount filesystems mounted by jail(8) when the jail was created. Consider /dev
and devfs. Certain software configurations, such as chroots, might well require
an additional devfs in, say, the jail’s /var/named. The jail’s root can mount and
unmount that devfs instance. The jail’s proper /dev, however, needed to exist
before the jail was started. Its mount is controlled by the host, not the jail. A jail

owner can’t unmount the jail’s /dev, or the /dev/fd created by mount.fdescfs, and
so on.
Let’s discuss each of the jail-manageable filesystems in turn.

fdescfs
The mount.fdescfs parameter controls whether a jail should mount fdescfs at
startup. Iocage mounts fdescfs by default. I normally set mount.fdescfs as a
default in jail.conf for standard jails as well, because it costs almost nothing and
its presence reduces the number of trouble calls I get.
Why would a jail owner need to manage additional fdescfs instances? Linux
emulation requires an additional fdescfs within the Linux chroot. Set
allow.mount.fdescfs in the jail configuration to let the jail owner manage their
own fdescfs.

devfs
The jail’s main device filesystem, /dev, exists outside the jail’s process
namespace and cannot be managed from within. The host must make all changes
to a jail’s /dev. The mount.devfs parameter controls whether the host creates /dev
when starting the jail, and enabling it is the universal default. I am not aware of
any jailable applications that don’t require /dev.
If a jail needs additional devfs instances, set allow.mount.devfs in the jail
configuration.
Jails cannot run devd(8), so the jail does not have access to dynamic devices or
devfs rules. New devfs instances are an exact copy of the jail’s /dev. If you need
a different set of devfs rules in a jail, configure it from the host with mount.fstab.

nullfs
Loopback-style mounts with nullfs(5) work perfectly fine inside a jail. The jail
can only null-mount directories it can see. Enable the jail owner to perform them
with allow.mount.nullfs. There is no mount.nullfs parameter; configure null
mounts at jail creation with an fstab file.

procfs, linprocfs, and linsysfs
All three of these synthetic filesystems work with jails.
The mount.procfs parameter tells jail(8) to mount /proc when starting the jail.
This mount remains in place for the life of the jail. The jail owner only needs
allow.mount.procfs if she intends to mount additional procfs instances, or if she
needs to mount and unmount /proc. Use of the process filesystem is heavily
discouraged, and I encourage unmounting it when not in use.
FreeBSD’s Linux mode requires linprocfs and linsysfs. The jail owner must have
the allow.mount.linprocfs and allow.mount.linsysfs parameters set to use Linux
software inside a jail. You can use Linux compatibility within a jail, and the
hard-core can run Linux as a jail (Chapter 10).

tmpfs
Set the allow.mount.tmpfs parameter to allow a jail owner to create and destroy
memory filesystems. The older style of memory disks, md(4), cannot be
managed from within a jail. Even if you could get the /dev/md0 device, the UFS
filesystem traditionally used on them can’t be managed within a jail. Use
tmpfs(5).
If you grant this permission, a jail can exhaust the host memory. You’ll need to
restrict the amount of memory the jail can access, as discussed in Chapter 11.

ZFS In A Jail
ZFS is more jail-aware than any other filesystem. You can delegate
administration of a ZFS dataset and all its children to a jail. You can allow a jail
owner to create new datasets in their jail, adjust those datasets, and assign new
datasets to a jail. The jailed property indicates that a dataset belongs to a jail.
A jail owner with the ability to make arbitrary changes to a ZFS dataset can
make changes that make the dataset incompatible with the host. If they create a
new dataset with a mountpoint of /var/log, she obviously wants that dataset to be
used as /var/log within the jail. If the host mounted that dataset, it would mount
over the host’s /var/log. The amount of mayhem this would inflict is not worth
the amusement. ZFS datasets with the jailed property set cannot be mounted by
the host. You can certainly unset this, but check the dataset’s mount point first.
Don’t delegate the jail’s primary dataset to the jail. Managing a jail from the host
means that the host must access the jail’s base system and its packages. You
could temporarily free a dataset from the jail, reconfigure all the mount points,
perform maintenance, and restore the jail owner’s configuration, but that’s a
tricky process that’s likely to go wrong. Instead, provide the jail owner a private
dataset that they can use and abuse to their heart’s content. If the dataset needs to
go in a critical system location like /home, perform the initial setup before
handing control of the jail over to the user.

Configuring a Dataset
On the host, create the dataset that you want to delegate to the jail. Copy any
necessary files to that dataset. Remember, once the dataset is delegated to a jail
you won’t be able to access the contents from the host without removing the
dataset from the jail and carefully checking the dataset’s compatibility with your
That’s really it. Everything else happens in the jail.

Configuring a ZFS-Delegated Standard Jail
To manage ZFS, the jail must have access to /dev/zfs. Don’t allow all your jails
access to /dev/zfs; while they won’t have permission to manage datasets, you
don’t need jail owners nosing about. Create a special devfs ruleset specifically
for ZFS management and assign it only to jails that need it.
For a jail to manage ZFS, the jail must have the allow.mount.zfs parameter. It
also needs the generic allow.mount parameter and must have enforce_statfs set
to 1 or lower, exactly as when managing any other filesystem. Additionally, use
exec.start to run zfs mount -a, telling the jail to mount all the ZFS datasets it can
see.
Here I’m jailing the dataset cdr/cdr, a top-level dataset in a pool dedicated to
retaining call detail records.² The jail cdrpit relies on global defaults for boring
details like path and IP addresses.
cdrpit {
allow.mount=true;
allow.mount.zfs=true;
enforce_statfs=1;
devfs_ruleset=5;
exec.created+="zfs set jailed=on cdr";
exec.created+="zfs jail cdrpit cdr";
exec.start="zfs mount -a";
exec.start+="/bin/sh /etc/rc";
The magic pixie dust of ZFS delegation is entirely in the two exec.created
parameters. The first, zfs set jailed=on cdr, sets the jailed property on the target

ZFS dataset. Theoretically you need only do this once, but in case the host
administrator mucked with the dataset we’ll verify it as the jail starts. The
second command, zfs jail cdrpit cdr, tells ZFS to assign the dataset cdr to the jail
cdrpit. This is another command that should need to be done only once, but
double-checking might prevent trouble.
The jail’s startup script might require data in the jailed dataset. Before we can
start the jail, therefore, we must mount all ZFS datasets. This means redefining
the default exec.start, so that the jails mounts all its ZFS datasets before running
its startup script.

Inside the Jail
Log into the jail and examine the available datasets.

NAME USED AVAIL REFER MOUNTPOINT
cdr 376K 899G 88K /cdr
The jail’s ZFS knows about our delegated dataset, and expects to manage it. If
you run mount, you’ll see the jail’s other filesystems. If you’ve delegated a ZFS
dataset to the jail, chances are that the jail’s root directory is also ZFS. The jail
recognizes the root filesystem as a filesystem, but not as ZFS. The jail does not
have access to the root filesystem’s ZFS characteristics, as that dataset hasn’t
been delegated to the jail.
As the jail owner, the delegated dataset is yours. You cannot adjust quotas on
delegated datasets but it’s otherwise yours.

Configuring a ZFS-Delegated iocage Jail
The jail cdrpit2 handles a different set of call detail records, on the dataset
cdr2/cdr.
Set the jail_zfs parameter to “on” to enable ZFS management inside a jail, then
set the jail_zfs_dataset parameter to list a dataset to be delegated to the jail. Give
the dataset name without the pool name. Here I create the jail cdrpit2, and assign
it the top-level cdr dataset.
jail_zfs=on jail_zfs_dataset=cdr
You can’t set the delegated dataset’s mount point from within iocage, though.
You must use ZFS commands. Log into the jail and look at your datasets.

NAME
iocage

USED AVAIL REFER MOUNTPOINT
14.7G 884G 4.04M /iocage

iocage/cdr 88K 884G 88K none
The delegate dataset shows up under the iocage pool, even though it’s really a
separate pool. Even this amount of detail is concealed from the jail owner.
Change its mountpoint as desired.
That’s it. The jail now owns that dataset.

Minor Features
Jails have a bunch of small features that don’t really fit into any other section,
from setting the hostname to special memory and buffer access.

Change Hostname
A jail owner might want to change the jail’s hostname using the standard in-jail
methods like hostname(1) or /etc/rc.conf. The allow.set_hostname parameter
(allow_set_hostname in iocage) permits the jail owner to change the jail’s
hostname, and it defaults to on.
Changed jail hostnames can confuse the host administrator. The jls command
defaults to showing jail hostnames, rather than the jail name. Remember that the
hostname is not the same as the jail name. You set the jail name at the beginning
of the jail definition, and it goes in the name parameter. The jail’s hostname is
the host.hostname parameter.
If hostname consistency is important to you or your organization, set the
allow.noset_hostname parameter in jail.conf; in iocage, set allow_set_hostname
to 0.

Dmesg
Jails don’t get to view the host’s dmesg(8) buffer or the contents of the
kern.msgbuf sysctl. The kernel’s messages are hidden from jails. If you want a
jail to be able to view the host’s message buffer, set allow.read_msgbuf
(allow_read_msgbuf in iocage).
Once you enable message buffer access, any user in the jail can access it. To
restrict message buffer visibility to only root on both the host and allowed jails,
set the sysctl security.bsd.unprivileged_read_msgbuf to 0.
No combination of settings permits dmesg(8) access to all users on the host but
only root on a jail.

Lock Physical Memory
When a program requests memory, the kernel hands it a chunk of memory
addresses. The program has no way to know if this memory lies on the memory
chips or if it’s swapped out to disk; it’s memory, it stores stuff for the program,
enough said.
Data like encryption keys, however, should never be swapped. Programs that
handle such confidential data need to request memory specifically on memory
chips, or to lock physical memory. Jails default to not allowing programs to lock
physical memory, but you can permit locking physical memory with the
allow.mlock parameter (allow_mlock in iocage).
If the sysctl security.bsd.unprivileged_mlock is set to 0, only root can lock
physical memory on both jails and the host.
Now that you can fine-tune your jail exactly as you like, let’s interconnect them
in strange and terrible ways.
¹ But I’m sure nothing will go wrong. Ignore those resumes on the printer.

² This dataset and jail are named in honor of anyone sentenced to maintaining
decades of telco call detail records that nobody ever looks at, until they’re
suddenly the most vital data in the company. I am delighted beyond words to no
longer be you.
