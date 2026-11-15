---
id: freebsd-jails-02
title: "FreeBSD Mastery · Jails — Jail Management, Jail Filesystems & Packages and Upgrades"
slug: freebsd-jails-02-freebsd-mastery-jails-jail-management-jail-filesystems-packa
source: "FreeBSD Mastery — Jails"
sourceSection: "Chapter 3. Jail Management, Chapter 4. Jail Filesystems, Chapter 5. Packages and Upgrades"
track: bsd-internals
tier: premium
tags: [bsd, freebsd, jails, containers, security]
summary: "Starting and stopping jails is the least of your problems. Covers 3 sections: Jail Management, Jail Filesystems, Packages and Upgrades."
---
# FreeBSD Mastery · Jails — Jail Management, Jail Filesystems & Packages and Upgrades

## Chapter 3. Jail Management

Starting and stopping jails is the least of your problems. You must be able to run
commands inside jails, control the jail’s environment and the environment of
commands run inside jails, configure startup sequences, and install software.
When it comes to system management, iocage is a front end to jail(8). No matter
how you manage your jails, you must understand this core jail functionality.
We’ll cover controlling jails with built-in system tools, and then discuss the same
tasks with iocage.

Startup and Shutdown
A host treats each jail as an independent service, just like a web server or a
database. Each jail runs its own processes, but from the host’s perspective a jail
is a single self-managing entity that contains a whole bunch of processes and
memory. The host is only responsible for starting and stopping the jail, and
disavows responsibility for managing the jail’s processes.
Each jail must start and stop its own processes.

Startup and jail(8)
Start, stop, and restart jails with service(8). I’ve configured two jails using
jail.conf, loghost and logdb.
Stopping jails: loghost logdb ioc-www2.
Starting jails: loghost logdb.
I’ve configured two jails in jail.conf; where did ioc-www2 come from? That’s an
iocage jail. I had an iocage jail already running, so service(8) stopped it. My
command didn’t restart ioc-www2, however, as it’s not configured in jail.conf.
If you run both standard jails and iocage jails, you’ll need to stop, start, and
restart standard jails by name.
Stopping jails: loghost.
Starting jails: loghost.
When you set jail_enable to YES in /etc/rc.conf, FreeBSD runs service jail start
at boot and starts everything configured in jail.conf.
I’ll often configure jails for testing and debugging that I don’t want to
automatically start at boot. I don’t want the mere presence of a jail.conf entry to
make service(8) automatically start or stop these jails. The jail_list option in
rc.conf restricts the jails that service(8) manages.
jail_list="loghost logdb"
This restricts service(8) to only running the jails loghost and logdb. It exchanges
the problem of service(8) starting everything at boot for the problem of
maintaining jail_list.
To shut down all configured jails, run service jail stop. To stop only a single jail,

add the jail name.

Startup and Iocage
Iocage integrates with the FreeBSD service(8) architecture. If you set
iocage_enable to YES in /etc/rc.conf, FreeBSD runs service iocage start --rc at
boot. The iocage boot parameter dictates which jails autostart, and defaults to
off.

+------+-------------+
| NAME | PROP - boot |
+======+=============+
| www2 | off

+------+-------------+
| www1 | off

+------+-------------+
I want iocage to automatically start www1 at boot, so I change its boot
parameter.
Property: boot has been updated to on
Running iocage get verifies this.
The iocage start command starts jails. Use the --rc flag to affect only jails set to
start at boot, just like service iocage start. You can also select a jail by name.

- Starting www1
+ Started OK
+ Starting services OK
Use the ALL flag to start every jail, whether it’s set to start at boot or not.
If some iocage jails are running, using ALL starts only jails that aren’t already
running. It doesn’t trigger reboots.
To have iocage reboot running jails, use the restart command. Specify a jail, or
use ALL to bounce every jail.
The good news is that jails boot very quickly, so those service interruptions
won’t last long.
Stop jails with the iocage stop command, giving either a jail name or, if you
want to stop every jail, ALL. If iocage is enabled in rc.conf, you can also run
service iocage stop.
Iocage reports the status of every jail as it shuts it down.
When iocage is enabled in rc.conf, FreeBSD runs service iocage stop at system
shutdown. This turns off all machines that have the boot parameter set to on. It
ignores any jails without that parameter, so you’ll need to shut down those jails
yourself—or let them unceremoniously die with the host.

Tuning Startup and Shutdown
When you start a jail, FreeBSD creates it in something that closely resembles
single user mode. To enter multiuser mode the jail runs /bin/sh /etc/rc. On an
otherwise unconfigured jail, /etc/rc starts cron and syslogd and awaits your
commands.
Maybe you don’t want to run a full startup, though, and for some reason you
don’t want to disable cron and syslogd in /etc/rc.conf. Perhaps you want to not
even mount /dev, although lack of critical devices like standard in and standard
out will cause most programs to fail quickly.¹ You might get the bright idea to
write your own jail startup script. This impulse is almost always a mistake. If
you insist on making this mistake, set the parameter exec.start to your preferred
startup script.
exec.start="/bin/sh /etc/rc.custom"
When you shut down the jail, the jail runs /etc/rc.shutdown. Custom startup
script users probably won’t want the standard shutdown script. Use the exec.stop
parameter to set your custom shutdown script. If you have no live data, including
syslogd’s log files, you might use true(1).
exec.stop="/bin/true"
The start and stop scripts run as the user starting and stopping the jail, normally
root. Don’t do this if your jail writes data to disk. Databases in particular get
really cranky about being brutally terminated.
You might want to run a command on the host when starting and stopping a jail.
The exec.prestart, exec.poststart, exec.prestop, and exec.poststop parameters
support this. Before starting the jail, the host runs any command in exec.prestart.
Once the jail’s /etc/rc completes, the host runs the command in exec.poststart.
Similarly, exec.prestop gets run before the jail’s /etc/rc.shutdown, and
exec.poststop runs after the jail has been fully killed. Here I set defaults for all of
these in /etc/jail.conf.
exec.prestart="logger trying to start jail $name...";

exec.poststart="logger jail $name has started";
exec.prestop="logger shutting down jail $name";
exec.poststop="logger jail $name has shut down";
exec.timeout=90;
Now I get a /var/log/messages entry every time you start or stop a jail.
If you want to run multiple commands, stack them with the += syntax. Here I
want to log that a jail has started, but I also want to add a CPU limiting
command discussed in Chapter 11.
exec.poststart="logger jail $name has started";
exec.poststart+="cpuset -c -j $name -l 2-5";
Iocage’s exec_prestart, exec_poststart, exec_prestop, and exec_poststop
parameters work exactly the same way.
Where did this exec.timeout come from, though? Scripts, including rc.shutdown
and your custom shutdown script, can fail. A simple crash isn’t so worrisome,
but what if the script hangs forever? Jails use exec.timeout to set a limit on how
long to wait for exec.prestart, exec.poststart, exec.prestop, and exec.poststop. If
these commands are still running after the timeout, the jail is not started or
stopped. You must fix the command to start or stop the jail. If you keep this
unset, jail(8) will wait forever for the jail to finish its commands.
Additionally, the stop.timeout parameter sets a number of seconds between the
completion of a shutdown script and the jail waiting for any lingering
commands. It defaults to ten seconds. If you tell a jail to shut down, but the
scripts don’t finish in the allotted time exec.timeout permits, the shutdown waits
stop.timeout seconds before forcibly terminating the jail and all its processes.
Iocage sets a default exec_timeout to 60 seconds. Standard jails have no default
timeout; you must set one with exec.timeout. I set exec.timeout to 90 in this
example to match the 90 second timeout /etc/rc.shutdown uses before it forcibly
terminates processes. If the jail’s rc.shutdown can’t end a process, the jail
deletion will end it with prejudice.

Speaking of timeouts, we’ve all watched a host console as the system is shutting
down and seen FreeBSD announce that it’s forcibly massacring some program
that flat-out refuses to exit. Such programs can monopolize jails as well. When a
big program like a database is told to shut down, it’s not unreasonable for it to
take a few seconds to finish tidying itself up. Standard jails offer no grace time;
they terminate all such processes immediately when the jail’s rc.shutdown
completes. The parameter stop.timeout gives a number of seconds the jail will
wait for such programs to exit. It defaults to 0 in standard jails, but iocage
defaults to a stop_timeout of 30.
Always set a timeout. Always. Maybe you’re not using any exec.pre- or postcommands, and you don’t think any of your jails will be running processes that
need extra time at shutdown, but every real sysadmin knows that “things
happen” and sometimes those things are terrible. Setting exec.timeout and
stop.timeout to 30 at the top of jail.conf when you set up your host can prevent a
whole bunch of pain later.

Tuning Before Startup
FreeBSD creates the jail, and then runs the first command in the jail. It’s possible
that you might need to run a command on the host once the jail exists, but before
the jail actually starts. That’s where exec.created comes in.
Most of the exec.created use cases are fairly advanced, such as jailing ZFS
datasets and imposing resource limits. I’ll demonstrate exec.created in those
sections. It’s one of those tools that’s almost never needed, but on those rare
occasions it’s invaluable.

Dying and Life After Death
Jails have parameters that dictate how they behave during shutdown, and indeed
have special parameters that allow them to exist even when nothing’s running
inside them.
When a jail is in the process of shutting down, the read-only parameter dying is
set to 1. It’s really hard to catch this in action, as dying is only set once the jail’s
shutdown script finishes running and the host kernel is in the process of ripping
the jail out. In the unlikely event that you want to make changes to a jail as it’s
being killed, though, setting the parameter allow.dying to 1 permits such
changes.
Normally, when a jail no longer has any processes running FreeBSD deallocates
all resources, erases all the private namespaces, and forgets the jail ever existed.
You might need a jail that doesn’t have any processes in it to stick around,
though. The jail.conf persist parameter tells FreeBSD to keep the jail around
even when it has no processes. Iocage does not have a persist parameter. Most
often, persist is used during the creation of complex jails.

Users and Jail Commands
Only root can start jails, but many add-on tasks such as pre- and post- scripts
don’t need to be run with privilege. Running such commands as root is probably
unwise. While the exec.jail_user, exec.system_jail_user, and exec.system_user
parameters let you set special users for certain tasks, they’re not as useful as they
might seem.
Remember, a jail is created by running a jail(8) command. That command needs
permission to mount a device filesystem for the jail. Most users can’t do that.
You can use the exec.system_user to specify a user to run commands to create
the jail, but you’ll need to do a bunch of troubleshooting to make it work
correctly.
Similarly, the exec.jail_user parameter defines a user in the jail’s /etc/passwd to
run in-jail commands as. Unprivileged users can’t run /etc/rc, so it’s largely
useless unless you’ve written your own startup script—and even then, you’ll
wind up performing a huge amount of troubleshooting.
Finally, the exec.system_jail_user parameter has jail(8) use an account in the
host’s /etc/passwd to run commands as inside the jailed environment.

Jail Debugging
The service commands provide handy front ends to jail management, but what
do you do when things go wrong? At that point, you must fall back onto raw
jail(8) commands.

Debugging Standard Jails
That’s not as bad as it might sound. The -c flag creates a jail, and -v adds
verbosity. Here I start the jail loghost through jail(8).
loghost: run command: /sbin/ifconfig jailether inet 203.0.113.231 netmask
255.255.255.255 alias
loghost: run command: /sbin/mount -t devfs -oruleset=5 . /jail/loghost/dev
loghost: run command: logger trying to start jail loghost...
loghost: jail_set(JAIL_CREATE) persist name=loghost path=/jail/loghost
host.hostname=loghost.mwl.io ip4.addr=198.51.100.225 enforce_statfs=1
allow.mount=true allow.mount.tmpfs=true allow.mount.zfs=true devfs_ruleset=5
allow.raw_sockets
loghost: created
loghost: run command in jail: sh /etc/rc
loghost: run command: logger jail loghost has started
loghost: jail_set(JAIL_UPDATE) jid=4 nopersist
When a jail fails to start you can see exactly why. And by the time you finish this
book, you’ll understand all this gobbledygook.
To remove a running jail, run jail -r and give the JID or jail name. The jail will
run its shutdown script and exit.
Shutdown problems are rarer, but still happen. To unconditionally, immediately
destroy a jail without running any shutdown scripts, use the -R flag.

In addition to providing jail information via jls, jail(8) stores a jail IDs in a file in
/var/run. Each file starts with jail_, adds the jail name, and ends in .id. The JID
for logdb would be stored as /var/run/jail_logdb.id.

Debugging iocage Jails
Unfortunately, iocage does not provide a way to watch it create problem jails. It
does provide error messages indicating where the problem lies, however.
The iocage program creates a configuration file in /var/run for each jail it starts,
named jail.ioc-, the jail name, and .conf. For example, the configuration file for
iocage jail www1 is /var/run/jail.ioc-www1.conf. If you want to know why an
existing jail is behaving a certain way, double-check its configuration file.
If an iocage jail refuses to shut down, you can blow it away with jail -vR and the
jail name. Raw jail commands trump iocage, service(8), and all other add-on
tools.

Jail Return Codes
You might think you want to use a jail’s return code to see what happened inside
a jail, and take action. You’d be wrong. The return code from jail(8) represents
what jail experiences, not the specific error code from programs running or
shutting down inside a jail. If the jail starts or stops, jail returns the usual 0. If the
jail didn’t start or stop correctly because a command inside the jail erred out, jail
returns a 1.
In short, you can’t rely on a jail’s return code to represent events inside the jail.
All it can tell you is “stuff worked,” or “stuff didn’t work.”

Jail Boot Order
The order your jails start in might or might not be vital. If you have a jail with a
web server backed by the database in another jail, the web site won’t function
until both jails are fully running. If the database comes up first, users will get no
response until the web server starts. If the web server starts first, though, users
who hit the site before the database is accessible will see some variant of the
“Oh crud, my database is dead” page. As a sysadmin, I understand what’s
happening and don’t really care about such transient errors. My managers,
however, uniformly want to eliminate user-visible errors.² Both jail.conf and
iocage let you manage jail startup and shutdown order.

Standard Jail Start Order
You can manage standard jail boot order with either jail_list or the depend
parameter.
The depend parameter is probably the easiest way to control boot order. Rather
than explicitly listing an order the jails should start in, depend lets you say that
this jail requires another jail. You don’t care what order your flock of jails starts
in, so long as certain jails start before certain other jails. Suppose I need logdb to
start before loghost. I can specify that in loghost’s jail.conf entry.
ip4.addr="203.0.113.232";
depend="logdb";
If you have no depend parameters set, but use jail_list in rc.conf, FreeBSD starts
and stops jails in the order listed in jail_list. If the shutdown order should reverse
the startup order, set the rc.conf option jail_reverse_stop to YES.
The depend parameter overrides a jail’s placement in jail_list, allowing required
jails to jump ahead in line.

Iocage Start Order
Iocage uses the depends parameter rather than jail(8)’s depend, but it works
exactly the same way. If you want a jail to require that another jail to be running
before it starts, list the required jail in depends. Here I need database server
wdb1 to be running before www1.
Property: depends has been updated to wdb1
If I need multiple jails to be running before starting this jail, I’d enter them in
quotes.
Property: depends has been updated to wdb1 wdb2
The depends parameter overrides boot. If a jail set to run at boot requires another
jail to start, that other jail is started. Look at the boot property of my iocage jails.
www2 off
wdb2 off
www1 on
wdb1 off
Only www1 explicitly starts at boot.
Let’s shut everything down and see what starts at boot.

www2 down
wdb2 up
www1 up
wdb1 up
The jail www1 needs jails wdb1 and wdb2 running before it can start, so iocage
started them. That seems handy, but this implicit dependency breaks during
system shutdown. While your web server might require its database servers to
function, the web server doesn’t care if the database servers are running when
it’s off.
www2 down
wdb2 up
www1 down
wdb1 up
The database servers are still running. If this had been a real host shutdown, your
databases would be ungracefully terminated. That’s widely regarded as a bad
idea.³ Set the boot parameter for every machine you want FreeBSD to start for
you.
Iocage computes startup dependencies before starting any jails, letting you
daisy-chain the depends parameter. If www1 needs wdb1, and wdb1 needs
iscsi1, iocage starts and stops the jails in proper order. The downside of this is
that, predictably, circular dependencies make iocage unhappy. If www1 depends
on wdb1, but wdb1 requires www1, you’ve created a loop. Iocage won’t start

anything.
Dependencies can quickly grow frustratingly convoluted. Much of the time we
want to follow guidelines like “start the iscsi jails first, then the database jails,
then the web servers.” Establish this sort of system with the priority parameter.
Priority is an arbitrary integer, defaulting to 99. A priority of 1 gets started first,
while everything else gets started in order. Group your jails by role and assign
their priority accordingly, then patch up the exceptions with depends.
Iocage shuts down jails in reverse priority order.

Viewing Jails
Just because you configure a jail to start at boot doesn’t mean that the jail will
keep going. View currently running jails with jls(8). You’ll see the jail’s IP
address, hostname, and the path to the root directory. In this case, the root
directory also makes it obvious which jails are standard and which are iocage.

JID IP Address

Hostname

Path

1 203.0.113.234 www1

/iocage/jails/www1/root

2 203.0.113.236 wdb1

/iocage/jails/wdb1/root

3 203.0.113.235 www2

/iocage/jails/www2/root

4 203.0.113.237 wdb2

/iocage/jails/wdb2/root

6 203.0.113.232 logdb.mwl.io

/jail/logdb

7 203.0.113.231 loghost.mwl.io

/jail/loghost

Each jail also has a unique jail ID, or JID. Every jail is assigned a unique jail ID
at startup, and retains that JID as long as it runs. When you stop, restart, or
reboot the jail, the jail gets a new JID. The JID gets attached to jail-related
processes and memory, as we’ll see throughout this book.
While you can hard-code a jail ID in jail.conf with the jid parameter, this feature
exists mostly to support obsolete management scripts. Jail IDs get tied to system
resources, and a jail cannot be restarted until those resources are freed from the
shutdown. This takes longer than you would expect, and leads to frustration as
well as language that would shame your mother. Let JIDs be disposable. Iocage
does not include this option.
If you want to list a particular jail, add the -j flag and the jail’s name.

JID IP Address

Hostname

9 203.0.113.231 loghost.mwl.io

Path
/jail/loghost

Listing jails by name becomes very important when you use some of jls(8)’s
more advanced views.

Viewing Parameters
Jails are created by jail(8) commands. All of the jail configuration methods, from
jail.conf to iocage and beyond, are only tools that simplify creating the jail(8)
command to start the jail. They’re abstraction layers. If you want to verify that
the abstraction layer hasn’t gone sideways, and that all the options you set are
actually applied, you’ll need to view the parameters the jail’s running with.
A few parameters, such as securelevel (Chapter 8), can be adjusted after jail
creation. You’ll need to be able to view the jail’s current settings, as opposed to
how what you set the parameter to when you created the jail. We’ll specifically
mention these parameters when we get to them.
The jls(8) command can query the host’s kernel and display a jail’s current
parameter settings. Parameters that were not passed to the kernel are not shown;
they’re run-time ephemera, and could have been changed since the jail started
anyway. To find pseudo-parameters like depend and exec.prestart, you must read
jail.conf or query iocage.
One useful setting is to view the command line used to start the jail. Parameters
that can be changed on a live jail (such as securelevel) are shown at their current
value rather than the startup value, but it’s good enough for most debugging. Use
the -s flag to see the parameters arranged as jail(8) arguments. The output is
quite substantial, so I normally combine this with -j to view only the jail I’m
interested in.
devfs_ruleset=0 enforce_statfs=2 host=new ip4=disable ip6=disable jid=9
linux=new name=loghost osreldate=1300007 osrelease=13.0-CURRENT
path=/jail/loghost nopersist securelevel=-1 sysvmsg=new sysvsem=new
sysvshm=new vnet=inherit allow.nochflags allow.nomlock allow.nomount
allow.mount.nodevfs allow.mount.nofdescfs allow.mount.nolinprocfs
allow.mount.nonullfs allow.mount.noprocfs allow.mount.notmpfs
allow.mount.nozfs allow.noquotas allow.noraw_sockets allow.noread_msgbuf
allow.reserved_ports allow.set_hostname allow.nosocket_af allow.nosysvipc
allow.unprivileged_proc_debug children.max=0 host.domainname=/""}""
host.hostid=0 host.hostname=loghost.mwl.io host.hostuuid=00000000-0000-

0000-0000-000000000000 linux.osname=Linux linux.osrelease=2.6.32
linux.oss_version=198144
Now you see why jail(8) has abstraction layers.
A handful of parameters are internal to jail(8). To pull these as well, use the -n
flag.
devfs_ruleset=0 nodying enforce_statfs=2 host=new ip4=disable ip6=disable
jid=9 linux=new name=loghost osreldate=1300007 osrelease=13.0-CURRENT
For a nice table with a header listing all parameters, and each jail’s value for that
parameter listed beneath it, add the -h flag. This is useful when you want to
demonstrate to your boss that you need a bigger monitor because your current
one can only handle a 600-character-wide terminal. You can add parameter
names to view only the parameters of interest, though. Here I check the values of
sysvshm, sysvsem, and sysvmsg. I also grab the name parameter, so I know
which jail the results apply to. To tidy the results, I run them through column -t.

name

sysvshm sysvsem sysvmsg

ioc-wdb2 0

ioc-squid1 0

loghost 1
ioc-www1

1
2

2

Adding -j lets you check a parameter for a single jail.

Other Output Formats
To get a nice multi-line listing for each jail and select parameters, use the -v flag.

JID Hostname
Name

Path
State

CPUSetID
IP Address(es)
9 loghost.mwl.io
loghost

/jail/loghost
ACTIVE

4
203.0.113.231
This is also the only simple way to see which processor the jail is assigned to—a
fact that’s most often irrelevant, but it’s nice to know a jail can’t fork-bomb your
Jails support libXO, letting you print jail information in HTML, XML, JSON, or
even plain text. This is ridiculously helpful if you’re looking to run complicated
or extensive reports and have tools to parse these formats. Add the --libxo
argument and the format you want.
Us old-school sysadmins will continue using grep and cut in shell scripts,
painfully parsing the results, and adding special edge cases to our audit scripts
forever, all in the name of technical superiority.

Viewing Iocage Jails
If you’re only interested in iocage jails, the iocage list command displays which
jails are running and which aren’t. We’ve done this a few times. To get more
information on each jail, print a long list with iocage list -l. While the width of
the output depends on the information displayed, you’ll need a terminal at least a
hundred characters wide to show it properly.
The iocage list command has a whole bunch of flags and arguments to view
iocage-related information. It’s a general front end to examining iocage jails.
We’ll examine those in the relevant sections.

Process Management
Use standard systems administration tools to manage jailed processes. Neither
iocage(8) nor jail(8) include any special process-management tools.
Jails do not have unique ranges or separate pools of process IDs; they all share
the same range of process IDs as the host. If you’re root on the host and list all
running processes, you’ll see the processes running in all of the jails. Users in a
jail can see only processes tied to that jail. Processes running inside a jail are
flagged with a J in ps(1).

1951 - SsJ

0:00.10 /usr/sbin/syslogd -c -ss

2005 - IsJ

0:00.29 /usr/sbin/cron -J 15 -s

2090 - SsJ

0:00.10 /usr/sbin/syslogd -c -ss

2144 - IsJ

0:00.30 /usr/sbin/cron -J 15 -s

2229 - SsJ

0:00.11 /usr/sbin/syslogd -c -ss

2283 - IsJ

0:00.32 /usr/sbin/cron -J 15 -s

All of these processes have the J flag, showing they’re tied to a jail.
The -J flag to ps(1) lets you view the processes that belong to a specific jail.
Give -J one argument, the jail name or JID. Here I see what’s running inside
logdb.

PID TT STAT TIME COMMAND
3652 - SsJ 0:00.10 /usr/sbin/syslogd -s
3705 - SsJ 0:00.45 sendmail: accepting connections (sendmail)
3708 - IsJ 0:00.02 sendmail: Queue runner@00:30:00 for
/var/spool/clientmqueue (sen
3712 - IsJ 0:00.32 /usr/sbin/cron -s
That’s a pretty minimal system. Don’t worry, I’ll be adding to it soon.
To exclude all jailed processes and see only processes belonging to the host, tell
-J to use jail ID 0. This lets you more easily debug the host itself.

PID TT STAT

TIME COMMAND

0 - DLs

2:38.25 [kernel]

1 - ILs

0:00.08 /sbin/init --

2 - DL

0:00.00 [crypto]

Most process-related commands, such as pkill(1), pgrep(1), and killall(1) accept
a -j argument to let you specify a jail. Each jail runs its own cron process. Here I
find out which belongs to the jail logdb.
3712
Most of us don’t troubleshoot this way, though. We’ll log into a troubled host,

see that one of the MySQL processes is running amok and eating all the CPU,
and need to backtrack which jail it belongs to. The -O option to ps(1) reveals
many handy facts about processes through keyword arguments. (If you’re trying
to extract information about a process, definitely look at the list of eighty-plus
keywords in ps(1).) Adding -O jail prints the name of the jail.
8219 wdb1 - IsJ 0:00.00 /usr/local/libexec/mysqld
Process 8219 is running in the jail wdb1.
For a more dynamic view of a particular jail’s processes, top(1) also accepts the J flag. Add the jail name as an argument, and you’ll see the standard top view of
what’s running within the jail.
$ top -J ioc-www1
Running top with the -j flag gives you the host’s top listing, including a JID
column. The j is also an interactive top command, letting you toggle the JID
display on and off.
Similarly, the process management programs pkill(1), pgrep(1), and killall(1) all
accept a -j argument to specify a jail by JID or name.
You could use jexec(8) or iocage exec to manage processes inside jails, yes.
There’s no practical difference. Choose what works for you. (My fingers are not
yet accustomed to these newfangled “pgrep” and “pkill” commands, but you
youngsters are welcome to them.)

Jailing Commands
While you can log into a jail to run commands, you can run commands inside an
active jail from the host using jexec(8). You might want to SSH into the jail for
complicated work, such as server configuration or troubleshooting, but for oneoff commands—especially on multiple jails—jexec is almost always easiest.
You’ll need three arguments: -l, the name of jail to run the command in, and the
command to run. (We’ll see why you need -l in the next section.) If you don’t
enter a command, it runs a shell. You must be root to run jexec.
FreeBSD loghost.mwl.io 13.0-CURRENT FreeBSD 13.0-CURRENT #10
r338496: Fri Sep 6 12:29:00 EDT 2019
root@storm:/usr/obj/usr/src/amd64.amd64/sys/GENERIC amd64
I’ve run this command from my host, but it’s run inside the jail loghost.
Suppose I’m first setting up the jail and I want to set a root password. I give the
name of the jail, the command I want to run, and any arguments to that
command.
Changing local password for root
New Password:
The jexec(8) command only works on running jails. To run a command inside a
jail that isn’t working, you’ll need to jail an individual command as discussed in
Chapter 2. Here I start a shell in a non-active jail.
Technically speaking this starts the jail, but only in a limited way. The only
process running in the jail is your shell, plus anything you start.
You can use jexec on iocage jails, but you’ll need to add the ioc- in front of the

jail name—remember, iocage jails get that tag in front of their name. Rather than
having to remember that, use iocage exec. Like jexec it takes two arguments, the
host and a command. If you don’t provide a command, it runs a shell. Here I add
a user to my iocage jail loghost.
If you want a shell inside your jail, you’re better off using the iocage console
command. This simulates a full root login of your jail. Give it the jail name as an
argument.
Why use iocage console and not just jexec a shell? Because of the jail
environment.

Jailed Process Environment
Processes inherit their environment from their parent. Processes started by the
jail’s startup process are children of the jail’s /etc/rc (or whatever command you
used to start the jail). That environment’s pretty well sanitized. While your jexec
and iocage exec commands are flagged as belonging to a jail, they’re children of
your existing shell. This seems like a minor detail, but ask a jailed command
about its environment. We’ll skip the -l this time.
HOME=/home/mwlucas
TERM=xterm
LC_COLLATE=C
SSH_CLIENT=203.0.113.70 59076 22
SSH_CONNECTION=203.0.113.70 59076 203.0.113.50 22
SSH_TTY=/dev/pts/2
SSH_AUTH_SOCK=/tmp/ssh-ZfvZOatcsu/agent.60492
Hang on here—a jailed process should not have my terminal session’s SSH
environment variables! It has them because this process, while created in the
jail’s process context, inherits the parent’s environment. Never mind that the
directory where my SSH agent’s authentication socket lurks doesn’t even exist in
the jail, they’re part of the shell environment. Similarly, it inherits a bunch of
other crud from my login files.
Adding -l tells jexec to eradicate every setting except $HOME, $SHELL,
$TERM, and $USER. It also preserves anything from user’s login class.

Similarly, the initial process that boots the jail is a child of another process—
possibly /etc/rc from the host’s initial boot, or maybe your shell if you start the
jail by hand. The exec.clean parameter tells jail(8) to purge the environment
before starting the jail. It defaults to 1, cleaning the environment. If you want to
have a jail inherit the environment of the process that starts it, set exec.noclean
to learn exactly how you’re wrong.
Iocage’s exec command defaults to running everything in a clean environment.
The iocage parameter exec_clean controls if commands should be run in a clean
environment. The default, 1, purges the environment. When set to 0, iocage exec
inherits the user’s environment.

Console Access
You could run jexec -l /bin/sh or iocage exec /bin/sh to get a shell, but that won’t
really simulate the effect of being logged in as root on the jail. A real login
experience should source dotfiles and process login classes.
Get a true login on a jail from the host through jexec(8) by running login(1).
Give login the -f argument and the account you want to log into. Here I get a
root shell on the jail loghost.
FreeBSD 13.0-CURRENT (GENERIC) #10 r338496: Thu Sep 6 12:29:00 EDT
2019
Welcome to FreeBSD!
Release Notes, Errata: https://www.FreeBSD.org/releases/
root@loghost:~ #
Yep, you get the full /etc/motd and everything.
To get a root login using iocage, use the console command.
root@www1:~ #
Iocage does not have a feature to log into a jail as a non-root user but you can
fall back on jexec -l jail login -f user, login as root and use su(1), or use an addon package like jailme.

Console Logging
We’ve all had FreeBSD fail to start, fail to stop, or inexplicably hang for an
excessive time somewhere in the reboot process. Usually you need to check the
system console to see what misconfiguration is causing the delay.⁴ Jails can log
their console output to a file.
On a standard jail, set the parameter exec.consolelog to a file. Here I set a default
console log at the top of jail.conf.
exec.consolelog="/var/tmp/$name";
This creates files like /var/tmp/loghost and /var/tmp/logdb.
You might think that console logs should be carefully protected, and there’s
certainly an argument to be made for that. Your jail host should be carefully
protected as a whole, however, and regular users shouldn’t have any access to it.
Illicit access to read jail console logs is the least of your problems. If you’re
concerned, though, put those logs in a directory only readable by root.
Iocage automatically logs all consoles to the log directory on iocage’s dataset, so
my console logs go in /iocage/log/. Each console log is named after the jail, with
-console.log appended. The log for iocage jail www1 is /iocage/log/www1console.log.
Now that you can create, start, stop, reboot, fold, and spindle jails, let’s perform
some common sysadmin tasks with them.
¹ Remove /dev/null from a host and a surprising number of programs crash and
burn. Experienced sysadmins understand that most software requires an
uninterruptible supply of nothing.

² My perennial suggestion to eliminate user-visible errors by eliminating users
often makes it surprisingly far up the org chart.

³ Databases in general are a bad idea, but Big Data keeps suppressing the truth.

⁴ I want to say “it’s always DNS,” but that’s obviously not true. It’s
overwhelmingly DNS. When it’s not, it’s some balky service. service -R is your
friend.

## Chapter 4. Jail Filesystems

If you haven’t noticed yet, filesystem management is a huge part of jails. As we
discuss jails we’ll dive into all sorts of filesystem tricks and details. You need to
understand a few dusty corners about filesystems before we go too far, though.
Many of these are not jail-specific, but they’re not commonly used.
This chapter is mostly about managing filesystems from the host. Chapter 8
provides insight into managing filesystems within a jail.

mount(8) And umount(8)
You’ve used mount(8) and umount(8). You’ve mounted disks, and disk images.
You’ve rebooted systems after accidentally mounting something incorrectly and
destroying the system’s stability. If you’ve been a sysadmin long enough, you’ve
accidentally unmounted the /bin disk pack as payroll was running. What more is
there to learn about mount(8)? A bunch. Sometime when you have a few minutes
to spare, reread mount(8). Play with some of the options. Revisiting commands
you think you know is a great way to improve your skills. We’ll cover the
options I find useful for jail management here.
Running mount(8) on its own shows all mounted filesystems, of all types. But
sometimes you want to view only a certain type of filesystem. To show only one
filesystem, use the -t flag and the filesystem name. Here I show every device
filesystem mounted on this host.
devfs on /dev (devfs, local, multilabel)
devfs on /iocage/jails/wdb2/root/dev (devfs, local, multilabel)
devfs on /iocage/jails/squid1/root/dev (devfs, local, multilabel)
devfs on /jail/loghost/dev (devfs, local, multilabel)
devfs on /iocage/jails/www1/root/dev (devfs, local, multilabel)
If you’re searching for strangeness, you might find piping this to column -t
useful.
While mount can read /etc/fstab, it can also write files in that format. Add the -p
flag to display the results in this style.

devfs /dev

devfs rw 0 0

devfs /iocage/jails/wdb2/root/dev

devfs rw 0 0

devfs /iocage/jails/squid1/root/dev devfs rw 0 0
devfs /jail/loghost/dev

devfs rw 0 0

devfs /iocage/jails/www1/root/dev devfs rw 0 0
I find this useful when I’ve manually tweaked filesystems and want to produce
fstab entries. You might need to tweak the last two fields, for dump(8) level and
mounting order, but it’s at least a really good start.
Finally, mount and umount can read fstab files other than /etc/fstab with the -F
flag. You can create a per-jail fstab and only mount that when starting the jail.
The jail system hides this behind the mount.fstab parameter, but you need to
know how that magic happens. If you accidentally blow up a jail and its custom
filesystems are still mounted, unmount everything in its fstab.
This will save you huge amounts of annoyance once you start destructive testing
on base jails (discussed in Chapter 6).

Filesystem Visibility
Log into one of your jails and run mount(8). What you get depends on the
underlying filesystem. A jailed user can see where the files for their jail are
mounted on the host, but can’t see other mount points on the jail. Jails running
on ZFS can view the dataset their jail is rooted in. Here, the jail www1 is locked
into the directory /iocage/jails/www1/root.
iocage/iocage/jails/www1/root on / (zfs, local, nfsv4acls)
Jails on UFS see the device their root filesystem is mounted on. The jail loghost
is locked into /jail/loghost, but that’s a directory on the UFS filesystem /jail.
/dev/gpt/ufs1 on / (ufs, local)
The /jail filesystem is on device /dev/gpt/ufs1, so that’s what the jail sees.
Jails on both UFS and ZFS have more filesystems than a single root directory,
though. Every jail has /dev, unless you deliberately turn it off. Iocage jails mount
fdescfs(5) by default. Each should show up in a list of mounted filesystems, no?
No. Jails deliberately restrict what filesystems jailed processes can see. By
default, jailed processes can only see their root directory and the device that it’s
mounted on. Use the parameter enforce_statfs to adjust this behavior. The
default, 2, is the highest setting, and most tightly restricts filesystem visibility.
The other mount points are still present, and jailed processes can access them as
permissions permit. The jail can’t see them as separate mount points, however.
Loosen the restrictions by setting enforce_statfs to 1, and a jail can perceive
filesystems mounted within the jail.
iocage/iocage/jails/www1/root on / (zfs, local, nfsv4acls)

devfs on /dev (devfs, local, multilabel)
fdescfs on /dev/fd (fdescfs)
If you want jailed processes to be able to mount new filesystems within the jail,
the process must be able to perceive the mount points. Any sort of allowed
mount requires setting enforce_statfs to 1 or lower. The jail must have additional
privileges defining which types of filesystems can be mounted, as discussed
elsewhere this chapter, but the kernel doesn’t unilaterally block mount-related
syscalls.
Setting enforce_statfs to 0 removes all limits on what the jail can see. The jail
can see all of the mount points and filesystems on the host, and if granted
permission can mount them. If the host has a separate /var partition, the jail can’t
read the contents but knows that the partition exists. If you think a jail needs this,
you’re probably wrong.
Most filesystem requirements can be solved by having the host mount the
appropriate filesystem when starting the jail.

Mounting Filesystems at Startup
If a jail needs access to a device or filesystem beyond its root directory, you can
mount that filesystem automatically when creating the jail. This can be space
shared between jails, a read-only data store, special filesystems such as /proc or
fdescfs(5) or anything else.
Remember that sharing read-write disk space doesn’t control how different jails
write to that space. If multiple jails have MariaDB¹ installs and you configure
them to share the same data directory, bad things will happen to your data—
exactly as if different database servers accessed that data directory via NFS or
SMB or any other file sharing protocol. Different jails cannot see others’
processes. Be very careful in what you choose to share.
Having said that, sharing directories between multiple jails can make sense. How
many copies of /usr/ports or /usr/src do you need? Sharing such infrastructure
directories between hosts might make perfect sense. For maximum safety, mount
such directories read-only.
The jails system has a few ways to mount additional filesystems in a jail at
startup.

Mounting Special Filesystems
Some special-purpose filesystems do not need configuring. They’re either
present, or not. Examples include procfs(5), fdescfs(5), and devfs(5). Jails have a
parameter for each.
Almost every jail needs /dev. The mount.devfs parameter mounts a standard
device filesystem for the jail. You can customize which device nodes a jail can
access, as discussed in “Customizing /dev” later this chapter.
The file descriptor filesystem is only needed if you use exotic software like the
Bash shell. Enable it with the mount.fdescfs parameter (mount_fdescfs in
iocage).
FreeBSD developers loathe the process filesystem, /proc. If your software
demands /proc, better you enable mount.procfs (mount_procfs in iocage) and run
it in a jail than expose your host to it. Also, get better software.
Mounting other filesystems inside a jail is slightly more complicated.

Standard Jails and Extra Mounts
If a jail needs only one special mount, we might use the mount parameter. It
takes one argument, a formatted fstab line. The jail system mounts this
filesystem at jail creation, and unmounts it when shutting down the jail.
Suppose my standard jail loghost needs really speedy scratch space, and I decide
to assign it a tmpfs(5) memory filesystem for /tmp. The jail’s root filesystem is
/jail/loghost, so I need this tmpfs mounted at /jail/loghost/tmp. I need jail(8) to
mount this filesystem before starting the jail. I can accomplish this with the
following jail.conf snippet.
mount="tmpfs /jail/loghost/tmp tmpfs rw,size=1g,mode=1777 0 0";
That’s almost straight from fstab(5); the only thing I’ve changed is the directory
to mount the memory filesystem on.
The problem with one-off solutions is that they’re never one-offs. Once you
realize you can mount extra filesystems in a jail, you’ll find more and more uses
for them. Plus, these fstab entries can really clutter up your nice tidy jail.conf.
The jail system can mount an additional fstab when creating the jail, and
automatically unmount these filesystems when shutting down the jail. Give the
full path to this fstab file in the mount.fstab parameter.
mount.fstab="/jail/fstab/loghost.fstab";
I normally create a directory for fstab files, and name the individual files after
the jail. This lets you do daft things like make mount.fstab a default, useful when
you have many standard base jails (Chapter 6).
With each jail’s additional filesystems contained in a separate file, you can easily
mount and unmount that jail’s filesystems without activating the jail itself.

While mounting and remounting additional filesystems are integral to base jails,
they add much-needed flexibility to more routine jails.

Iocage and Extra Mounts
Iocage provides several ways to edit fstab files, all through the iocage fstab
command. Newly created iocage jails (that aren’t clones or base jails) have no
fstab entries, so we’ll start by adding some.
Use the -a option to add a line to the fstab. The command has the format:
This command differs from creating an fstab for a standard jail. You don’t give
the full path to the destination mount point. Iocage moves jails between datasets
as needed, so you don’t specify the full path to the current mount location:
instead, you give the mount point inside the jail where you want the new mount
to wind up. Here I give the jail www4 a tmpfs /tmp.
If you want the source directory nullfs-mounted in the same location in the jail,
such as mounting the host’s /usr/src on the jail’s /usr/src, you can shorten this
command to:
In my environment I put all custom scripts in /usr/local/scripts. I want to make
this directory on the host available inside all the jails. I won’t need all those
scripts on all the hosts, so I can use nullfs(5) to make this directory available on
multiple mount points.
Destination: /iocage/jails/www1/root/usr/local/scripts does not exist!
Iocage refuses to create the directory because the jail www1 doesn’t have a
/usr/local/scripts directory to mount on. The command-line tool provides some
sanity checking that you don’t get from editing an fstab by hand. Once I create
the directory, the command works and iocage immediately performs the mount.

After a while, you’ll forget what you’ve added to each jail’s fstab. To view the
current fstab, use iocage fstab -l. It prints out a formatted table by default, but
you can use -h to strip all that out and get the information.
0 /usr/local/scripts /iocage/jails/www1/root/usr/local/scripts nullfs ro 0 0
1 /usr/src /iocage/jails/www1/root/usr/src nullfs ro 0 0
I guess I added /usr/src to this jail sometime. Each entry has an index number,
shown at the far left. My /usr/local/scripts mount is index 0, while /usr/src is
index 1.
To remove an fstab entry, get the entry’s index number and use the iocage fstab r command. Give the jail name and the fstab table entry’s index number as
arguments. This jail no longer needs /usr/src, so I’m going to remove it. The
/usr/src mount is index 1, so I run:
Successfully removed mount from www1's fstab
Note that removing an fstab entry changes index numbers. Everything below the
deleted entry moves up one. Don’t willy-nilly remove indexes 0, 1, and 2 one
after the other, because after each removal they’ll point to different entries.
You can replace entries with iocage fstab -R. Eventually I realized that I didn’t
want to make all of my host’s scripts available on jails. The script to purge
templates and perform other jail management tasks shouldn’t be on the jails
themselves; they leak information about my sloppy sysadmin habits to potential
intruders. I needed to create an expurgated scripts directory on the host,
/usr/local/jail-scripts, and mount that on the jail. The /usr/local/scripts mount is
at index 0, so I ran:
00
Index 0 replaced.

If all this programmatic stuff feels like too much work, and you’d rather edit a
jail’s fstab directly, use iocage fstab -e and the jail name. This brings up the jail’s
fstab in your default editor.
When you directly edit a jail’s fstab, iocage performs no sanity checking and
mounts no filesystems for you. If you create a bogus fstab entry, iocage won’t
tell you until you try to restart the jail. If you’re worried about uptime, let iocage
edit the filesystem table for you.

Device Filesystems and Jails
Every jail gets a stripped-down device filesystem. Typical jails need access to
the devices that let users log in, transfer data to and from programs, generate
numbers, and discard data. They don’t need disk devices, the physical console,
sound cards, and so on.
Except when they do.
Eventually, you’ll need to grant a jail access to a different device. Perhaps you’re
running your backup software in a jail, or ripping CDs from the backup vault, or
using a webcam, or who knows what? That means exposing a device in a jail,
which means configuring a special device filesystem for that jail.

Configuring devfs(5)
In-depth configuration of a device filesystem is really beyond the scope of this
book, but I’ll give you a very brief example for a simple case because I’m such a
nice guy not a complete monster. Configuring a device filesystem means
creating rulesets that hide and reveal device nodes. Configure a devfs rulesets in
/etc/devfs.rules. Perhaps the most common mistake in working with devfs(5) is
putting rules in /etc/devfs.conf. Don’t do that.
Each rule is assigned a number. FreeBSD includes a few rulesets in
/etc/defaults/devfs.rules. These are intended as building blocks for further
rulesets, mainly jails. Each ruleset is identified with a unique name and number.
Ruleset 4 is specifically for jails.
[devfsrules_jail=4]
add include $devfsrules_hide_all
add include $devfsrules_unhide_basic
add include $devfsrules_unhide_login
add path fuse unhide
add path zfs unhide
The initial brackets set off the ruleset name (devfsrules_jail) and the ruleset
number (4).
The following lines include other rulesets, by name. The standard rulesets have
names that reflect their purpose: devfsrules_hide_all hides all the devices,
devfsrules_unhide_basic unhides essential devices like /dev/random and
/dev/stdin, and devfsrules_unhide_login unhides the virtual terminal devices
needed for logging in.
Building on this basic model, a ruleset for jails needs two more special device
nodes. The fourth rule reveals /dev/fuse, and the fifth /dev/zfs. This permits use
of mount_fusefs(8) and zfs(8) from within a jail. Exposing these generically

within jails means that you can control access to them through jail parameters
without having to assign a new set of devfs rules for the jail. If you’re running
jails on UFS, and you don’t allow use of FUSE, you could strip out these rules.
Creating a new ruleset is as simple as picking a rule number, including a ruleset
to build on, and adding the new rules you need. Suppose you want to let a
particular jail access the CD reader, /dev/cd0. (You cannot read the CD
filesystem from within a jail, but presumably you have a ZFS pool or some other
filesystem on it.) I’m going to copy the jail ruleset devfsrules_jail and add a new
unhide statement.
[devfsrules_jail_cd=1000]
add include $devfsrules_hide_all
add include $devfsrules_unhide_basic
add include $devfsrules_unhide_login
add path cd0 unhide
This ruleset has the name of devfsrules_jail_cd, and is ruleset number 1000. This
gives me lots of room for FreeBSD to add more rulesets. It includes most of the
devfsrules_jail ruleset and adds a rule to unhide the cd0 device.
Run service devfs restart to make devd reread its rules, and verify that the new
ruleset shows up in devfs rule showsets. Once it’s available in devd, assign the
ruleset to a jail.

Standard Jails and Devfs
The parameter devfs_ruleset tells jail(8) which ruleset to assign to a jail. The
default is ruleset 4, also called devfsrules_jail. Here I want to assign a specific
jail my custom devfsrules_jail_cd ruleset, also known as ruleset 1000.
devfs_ruleset=1000;
Restart the jail, and your device will be available.
View all devfs rulesets assigned to jails using jls(8).

name

devfs_ruleset

ioc-www2 9
loghost 1000
ioc-www1 10
logdb

Or, you could log into the jail and verify that /dev/cd0 exists while /dev/acpi
doesn’t… but where’s the fun in that?

Iocage and Devfs
Control an iocage jail’s device filesystem rules with the devfs_ruleset parameter.
Sort of.
Iocage has a hard-coded initial devfs ruleset. As I write this, the default iocage
ruleset is the same as the standard devfs.rules ruleset 4 that the base system uses
for jails. If you enable DHCP on a jail, it adds /dev/bpf.² When you start the jail,
iocage builds a brand-new set of devfs rules and assigns it to the jail. If
devfs_ruleset is set to 4, the common default for jails, iocage creates this new
ruleset every time it starts the jail. When you stop the jail, it removes that jail’s
ruleset.
Why does iocage do this? One little known feature of devfs is that you can edit
its rules on the command line, with the devfs(8) command. I don’t know anyone
who actually does this, but I’m assured that the people who do have perfectly
good reasons. Each iocage jail gets assigned a unique ruleset at startup, so you
can manipulate that jail without affecting any other jails. Whenever you start a
jail, iocage tells you the number of the devfs ruleset it created for that jail. Query
jls(8) for which devfs rulesets are applied to which jails.
When you assign a specific devd ruleset to a jail, iocage does not copy this
ruleset to a new ruleset. It believes that if you assigned ruleset 1000 to a jail, you
dang well meant it. If you assign a specific ruleset to several jails, and then
manipulate that ruleset live, the changes apply to all jails that use that ruleset.
Changes to devfs_ruleset do not take effect until you restart the jail.
So to give the jail wdb2 access to the CD drive via ruleset 1000, which I added
to /etc/devfs.rules, I would run:
Property: devfs_ruleset has been updated to 1000
This jail can now see /dev/cd0.

Iocage Disk Usage
Iocage creates at least two datasets for each jail. As we get into more
complicated iocage uses and leverage ZFS features, it’ll quickly become obvious
that figuring out how much disk space a jail uses isn’t as easy as running df(1)
inside your jail. As your ZFS clones diverge, you’ll see pool utilization creep
upward and need to figure out where all your disk space is going.
Iocage provides the df command to sort out exactly how much disk space each
jail uses.

NAME | CRT | RES | QTA | USE | AVA |

+=============+=======+======+======+=======+======+
| dns3

| 1.03x | none | none | 604K | 888G |

| dns4

| 1.03x | none | none | 25.2M | 888G |

| dnstemplate | 1.55x | none | none | 567M | 888G |
| squid1

| 2.01x | none | none | 209M | 888G |

The first column gives the name or UUID of the jail.
The CRT column shows the jail’s ZFS compression ratio.
The RES column shows any ZFS reservation for the jail, while QTA displays the
ZFS quota.
USE shows how much space the jail actually uses.
Use the -s flag to sort by a particular column, from smallest to largest. Here I
sort by how well the jails compress.
If you want to find, say, the five largest jails, sort by USE and pipe the output to
tail(1). The -h flag strips out all the fancy table formatting, leaving you the raw
data.
Or, you can trawl through zfs(8) commands and figure out disk space usage.
Whatever floats your fish.
¹ MariaDB is MySQL without the Oracle taint.

² “Keeping servers running is already hard enough, and you want to add a
dependency on DHCP?” (throws up hands) “Fine. It’s your life.”

## Chapter 5. Packages and Upgrades

Empty jails have uses—just not many uses. You almost certainly want to install
FreeBSD packages on your jail. Similarly, unpatched FreeBSD installs have
uses, but those uses are all for intruders. You must install security updates on
your jails! FreeBSD’s packaging and upgrade tools support jails, and iocage has
specific support for packages.

Packages
You’ll see there’s a bunch of ways to manage packages in jails. Pick a method
and stick to it. Don’t bounce between iocage packages and host-based pkg(8)
and jail-based pkg(8). The packaging tools might be subtly different, especially
if the jail runs an older FreeBSD release than the host.
Managing jail packages from the host with pkg(8) is not the same as running
jexec -l jailname pkg. The former uses the host’s packaging tools, while the
latter runs the jail’s packaging tools.
A jail owner might want to install his own packages using the standard pkg(8)
tools inside the jail. That’s perfectly reasonable—a jail has a complete FreeBSD
userland, after all. Carefully consider if you want a particular user installing
packages or not. Remember, if the user screws up you’ll get a phone call from
the user. If the user doesn’t apply security updates to his packages and an
intruder penetrates the jail, you’ll get a call from law enforcement. For users
who shouldn’t even have shell access let alone their own jail, I replace the jail’s
/usr/sbin/pkg with a shell script that prints instructions to ask the helpdesk to
install all packages and then emails me a warning that my special friend is
meddling with things he doesn’t understand. If the user has a modicum of
competence, though, have them manage their own packages with pkg(8) like any
other FreeBSD install.

pkg(8)
Jails are a first-class citizen of the pkg(8) ecosystem. The host’s package tools
can identify running jails by name and manage their installed packages. I
generally recommend managing jail packages from the host rather than inside
the jail. While host-based package management uses the host’s packaging tools,
it stores the jail’s package database inside the jail and uses the jail’s pkg.conf,
certificates, and so on. This lets jails use different repositories.
Managing a jail’s packages with the host’s pkg(8) requires the -j flag and the jail
name. This flag goes right after pkg, not the sub-commands. Here I’m telling
pkg to run on jail logdb, and install the package sudo.
The first time you run pkg(8) on a host it upgrades itself, installs a database of
packages available in the repository, and does whatever you asked for. Running
the host’s pkg(8) on a jail avoids installing a current pkg(8) in the jail, but still
installs the current package database in the jail. The pkg(8) program will detect
version differences between the host and the jail, and will issue warnings. You
can safely ignore these warnings.
Other than -j and the jail name, managing a jail’s packages from the host is
exactly like managing packages on any other host.

Iocage Packages
Iocage integrates package management into its command line. Use the iocage
pkg command. Give it the name of the jail and the pkg(8) command you want to
run. Here I install sudo on the jail www1.
The iocage pkg command checks the repository’s package database, installs an
in-jail package database if needed, and installs sudo, exactly as if I ran raw
pkg(8) commands on the host. Only the syntax differs slightly.
Why would you use iocage pkg over pkg -j? Your preference. Iocage aims to be
a complete jail management solution, and provides iocage pkg as a convenience
for iocage users, that’s all.

Patching Jails
FreeBSD’s binary upgrade tool, freebsd-update(8), supports jails. A jail is
merely a FreeBSD install mounted at a particular directory, after all. While
you’ll need to use freebsd-update for standard jails, iocage provides a simpler
front-end and leverages ZFS snapshots.

Patching with freebsd-update
You cannot reliably use freebsd-update(8) within a jail. The key word here is
reliably. I’ve gotten away with in-jail upgrades, but it’s not supported and if you
make it a regular practice it’ll eventually sink its fangs into your arm. Perform
all jail upgrades on the host.
To update or upgrade a jail, freebsd-update(8) must know the version of
FreeBSD running in the jail and the jail’s base directory. Always back up your
jails before upgrading. If the upgrade fails, a backup tarball or ZFS snapshot will
save you a world of pain.
Patching or upgrading a jail has different requirements than a host. You’ll need a
different update configuration for your jails.
Open the file and start trimming. You need a server and the KeyPrint for that
server, so leave those alone. Start with the Components line. Jails have no
kernel, so don’t try to update it. Most (not all) jails don’t include the system
source code. The only component you must always update is the world.
Components world
You can use the host’s intrusion detection functions inside a jail if you want.
Some commands should never be run inside my jails, like pkg(8) and freebsdupdate(8). I replace them with shell scripts reminding me to not use them. I also
don’t care about updates to files like /etc/motd. Block freebsd-update from
replacing such files with the IgnorePaths statement.
IgnorePaths /usr/sbin/pkg /usr/sbin/freebsd-update /etc/motd
You’ll need MergeChanges in /etc, but /boot/device.hints is irrelevant in jails.
You might modify UpdateIfUnmodified to suit your configuration.
The freebsd-update(8) command checks the kernel to identify which FreeBSD
release it’s running on, much as uname -a does. Jails run on the host kernel, but

the jail’s userland is often entirely different. FreeBSD 12 jails running on a
FreeBSD 13 system would default to applying FreeBSD 13 patches. That would
be bad. Use freebsd-version(1) instead to get the jail’s current patchlevel.
Here, my standard jail ldap1 currently runs FreeBSD 11.1-RELEASE. I need to
install the current security patches on it. I’m running this from the host.
The jail now has updated binaries, as freebsd-version(1) will confirm.
11.1-RELEASE-p14
Any currently running programs are still the old versions, though. It’s best to
restart the whole jail.
Your jail is now upgraded.
It’s an annoyingly long command line, but ridiculously amenable to scripting if
your jails are in a directory named after the jail. Here’s my script jailpatch.sh. It
takes one argument, the name of the jail to be patched.
#!/bin/sh
freebsd-update -f /etc/jail-update.conf -b /jail/$1 --currently-running `jexec -l $1
freebsd-version` fetch install
service jail restart $1
Run this through a loop to patch and restart all your jails.
The brave can add a pkg -j $1 upgrade -y in the middle of the script.

Backups and Patching with Iocage
Iocage’s snapshot features simplify pre-upgrade backups. The iocage snapshot
command takes a snapshot. Give it the jail name, and then use -n to provide a
snapshot name. Here I take a snapshot of jail www1 and call it “install.” If you
don’t provide a snapshot name, iocage creates one based on the current date and
time.
View all snapshots with iocage snaplist. Add the jail name. As with most iocage
commands you can use the -h option to get rid of the table formatting and/or sort
on a column with -s.

+--------------+-----------------------+-------+------+

NAME |

CREATED

| RSIZE | USED |

+==============+=======================+=======+======+
| install

| Thu Sep 20 17:34 2018 | 92K | 0

+--------------+-----------------------+-------+------+
| install/root | Thu Sep 20 17:36 2018 | 680M | 0

+--------------+-----------------------+-------+------+
Always take a snapshot before updating a jail.
Iocage simplifies jail patching with the iocage update command. Give one
argument, the name of the jail to patch.

- Updating www1 to the latest patch level...
You’ll see the usual freebsd-update messages.
If the upgrade goes terribly wrong, you can revert an upgrade with the iocage
rollback command. Give the snapshot name with -n, and then the jail name.
This will destroy ALL data created including ALL snapshots taken after the
snapshot install
Are you sure? [y/N]: y
Rolled back to: iocage/iocage/jails/www1
You can now try the patch again when you have a higher pain tolerance.
Delete snapshots with iocage snapremove. Give the snapshot name with -n, then
the jail name. After a few successful upgrades the install-time snapshot won’t
ever be used, so you can get rid of it.
This particular jail runs FreeBSD 9.3. I don’t really want to patch it. I want to
upgrade it to a supported version of FreeBSD. Let’s discuss upgrades.

Upgrading Jails
Upgrading a host across major (12.0 to 13.0) or minor (12.0 to 12.1) FreeBSD
versions is a whole bunch easier than it used to be, thanks to freebsd-update(8).
Even so, if you have an automation system such as Ansible or Puppet that make
deployment trivial, I recommend installing new jails at the new FreeBSD version
rather than upgrading. Automation makes server installation faster and safer than
upgrading. This is especially true with iocage, as default iocage jails are ZFS
clones and upgrading from 12.2 to 13.0 vastly increases disk space usage.
No matter how you upgrade your jails, be sure to take a backup before starting.

Upgrades with freebsd-update
Everything about patching a jail applies to upgrading a jail. You need that same
jail-specific freebsd-update.conf to upgrade a jail. You must feed freebsd-update
the jail’s current version of FreeBSD and the root directory. Once you’re set up
to update a jail, though, an upgrade isn’t much different.
The jail ldap1 runs FreeBSD 11.1 patchlevel something-or-other. I want to
upgrade it to a fully patched 11.2. Specify the target release with -r and give the
upgrade sub-command.
You’ll be asked to confirm which components are installed and which aren’t.
After inspecting the system and downloading patches, you’ll see lists of files to
be updated, added, and removed. Once all that finishes, you’ll need to install the
updates as a second command.
-l ldap1 freebsd-version` -r 11.2-RELEASE install
Kernel updates have been installed. Please reboot and run
"/usr/sbin/freebsd-update install" again to finish installing updates.
It’s nice that freebsd-update patched the jail’s copy of the kernel file, but it’s
irrelevant. Jail hosts always run a FreeBSD equal to or newer than any jail. Hit
the up arrow to repeat the command and install the new userland.
It’s a new version of FreeBSD, so you really should reinstall all of your
packages. Use the -f flag to force reinstalls even if the software doesn’t seem to
have changed.
Now restart the jail.

Much as with patching, these upgrades are highly amenable to scripting. This
script takes one argument, the jail to be upgraded, and upgrades it to FreeBSD
11.2. When I upgrade a bunch of jails, I edit the script to change the version
number. You could make the FreeBSD version an argument to the script, but that
would mean longer command lines and I can’t be bothered.
#!/bin/sh
freebsd-update -f /etc/jail-update.conf -b /jail/$1 --currently-running `jexec -l $1
freebsd-version` -r 11.2-RELEASE upgrade
freebsd-update -f /etc/jail-update.conf -b /jail/$1 --currently-running `jexec -l $1
freebsd-version` -r 11.2-RELEASE install
pkg -j $1 upgrade -fy
service jail restart $1
If you’re upgrading across major releases, you’ll also be prompted for merging
/etc/.

Upgrades with Iocage
You could use freebsd-update(8) with iocage jails, but iocage assimilated a
whole bunch of the command line into the iocage upgrade command. Give the
name of the jail as one argument, and the desired upgrade target with -r. My jail
www1 is running FreeBSD 9.3, and I want to upgrade it to the newest FreeBSD
10.
You’ll see the familiar “inspecting system” and “preparing to download files”
messages. This particular upgrade required 35,266 patches and 50,864 files, so
it’s a good time to check your Mastodon feed.
Once all of this finishes, you’ll have the joy of merging /etc changes into your
jail. Iocage automatically updates all the files you haven’t changed. Iocage
automatically handles the repeated runs of freebsd-update needed to complete
the upgrade.
Upgrading iocage jails across major versions is unwise. Iocage creates jails as
ZFS clones unless told otherwise. ZFS clones only use an amount of disk space
equal to the differences between the snapshot they were cloned from and the
current files on disk. Even minor version upgrades can use half a gig of disk,
while major revisions suck up the space of a complete FreeBSD install.

NAME

USED AVAIL REFER MOUNTPOINT

iocage/iocage/jails/www1@install
iocage/iocage/jails/www1/root@install

56K

- 92K -

- 680M -

Upgrading this jail from 9.3 to 10.4 used an additional 680 MB of disk space.
That’s not a killer, but it’s certainly not a space savings over full 10.4 install.

Fortunately, you can configure jails in ways that conserve disk during upgrades.
We’ll see some of those in the next chapter.
