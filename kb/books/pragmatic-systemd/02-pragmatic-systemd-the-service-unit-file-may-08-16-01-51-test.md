---
id: pragmatic-systemd-02
title: "Pragmatic systemd — The service unit file, May 08 16:01:51 testvm1.both.org…",
slug: pragmatic-systemd-02-pragmatic-systemd-the-service-unit-file-may-08-16-01-51-test
source: "Pragmatic systemd",
sourceSection: "The service unit file, May 08 16:01:51 testvm1.both.org hello.sh[840]: ######### Hello World! ########, May 10 10:54:45 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0, StandardOutput=journal+console, and running the systemctl enable hello.service command creates the link in the, After=network-o"
track: linux-engineer,
tier: free
tags: [linux, systemd, services, init, production]
summary: "Create the service unit file /etc/systemd/system/hello.service with the following Covers 52 sections: The service unit file, May 08 16:01:51 testvm1.both.org hello.sh[840]: ######### Hello World! ########, May 10 10:54:45 .",
---
# Pragmatic systemd — The service unit file, May 08 16:01:51 testvm1.both.org…

## The service unit file
Create the service unit file /etc/systemd/system/hello.service with the following
content. This file does not need to be executable, but for security, it does need user and
group ownership by root and 644 or 640 permissions:
Description=My hello shell script
ExecStart=/usr/local/bin/hello.sh

48

Verify that the service unit file performs as expected by viewing the service status. Any
syntactical errors will show up here:
- hello.service - My hello shell script
Loaded: loaded (/etc/systemd/system/hello.service; disabled; vendor preset:

You can run this "oneshot" service type multiple times without problems. The oneshot type is
intended for services where the program launched by the service unit file is the main process
and must complete before systemd starts any dependent process.
There are seven service types, and you can find an explanation of each (along with the other
parts of a service unit file) in the systemd.service(5) man page. (You can also find more
information in the resources at the end of this article.)
As curious as I am, I wanted to see what an error might look like. So, I deleted the "o" from the
Type=oneshot line, so it looked like Type=neshot, and ran the command again:
- hello.service - My hello shell script
Loaded: loaded (/etc/systemd/system/hello.service; disabled; vendor preset:
May 06 08:50:09 testvm1.both.org systemd[1]:
/etc/systemd/system/hello.service:12: Failed to parse service type, ignoring:
neshot

These results told me where the error was and made it very easy to resolve the problem.
Just be aware that even after you restore the hello.service file to its original form, the
error will persist. Although a reboot will clear the error, you should not have to do that, so I
went looking for a method to clear out persistent errors like this. I have encountered service
errors that require the command systemctl daemon-reload to reset an error condition,
but that did not work in this case. The error messages that can be fixed with this command
always seem to have a statement to that effect, so you know to run it.
It is, however, recommended that you run systemctl daemon-reload after changing a
unit file or creating a new one. This notifies systemd that the changes have been made, and it
can prevent certain types of issues with managing altered services or units. Go ahead and run
this command.

49

After correcting the misspelling in the service unit file, a simple systemctl restart
hello.service cleared the error. Experiment a bit by introducing some other errors into the
hello.service file to see what kinds of results you get.

Start the service
Now you are ready to start the new service and check the status to see the result. Although
you probably did a restart in the previous section, you can start or restart a oneshot service as
many times as you want since it runs once and then exits.
Go ahead and start the service (as shown below), and then check the status. Depending upon
how much you experimented with errors, your results may differ from mine:
- hello.service - My hello shell script
Loaded: loaded (/etc/systemd/system/hello.service; disabled; vendor preset)
May 10 10:37:49 testvm1.both.org hello.sh[842]: ######### Hello World! ########

Notice in the status command's output that the systemd messages indicate that the
hello.sh script started and the service completed. You can also see the output from the
script. This display is generated from the journal entries of the most recent invocations of the
service. Try starting the service several times, and then run the status command again to see
what I mean.
You should also look at the journal contents directly; there are multiple ways to do this. One
way is to specify the record type identifier, in this case, the name of the shell script. This
shows the journal entries for previous reboots as well as the current session. As you can see, I
have been researching and testing for this article for some time now:
-- Reboot -May 08 15:55:47 testvm1.both.org hello.sh[840]: ######### Hello World! ########
-- Reboot --

50

## May 08 16:01:51 testvm1.both.org hello.sh[840]: ######### Hello World! ########
-- Reboot -May 10 10:37:49 testvm1.both.org hello.sh[842]: ######### Hello World! ########

To locate the systemd records for the hello.service unit, you can search on systemd. You
can use G+Enter to page to the end of the journal entries and then scroll back to locate the
ones you're interested in. Use the -b option to show only the most recent startup:
May 10 10:37:49 testvm1.both.org systemd[1]: Starting SYSV: Late init script for
live image....
May 10 10:37:49 testvm1.both.org systemd[1]: Started SYSV: Late init script for
live image..
May 10 10:37:50 testvm1.both.org systemd[1]: Starting D-Bus System Message Bus...
May 10 10:37:50 testvm1.both.org systemd[1]: Started D-Bus System Message Bus.

I copied a few other journal entries to give you an idea of what you might find. This command
spews all of the journal lines pertaining to systemd—109,183 lines when I wrote this. That is a
lot of data to sort through. You can use the pager's search facility, which is usually less, or
you can use the built-in grep feature. The -g (or --grep=) option uses Perl-compatible
regular expressions:
-- Logs begin at Tue 2020-05-05 18:11:49 EDT, end at Sun 2020-05-10 11:01:01 EDT.
May 10 10:37:49 testvm1.both.org systemd[1]: Starting My hello shell script...

You could use the standard GNU grep command, but that would not show the log metadata
in the first line.
If you do not want to see just the journal entries pertaining to your hello service, you can
narrow things down a bit by specifying a time range. For example, I will start with the
beginning time of 10:54:00 on my test VM, which was the start of the minute the entries
above are from. Note that the --since= option must be enclosed in quotes and that this
option can also be expressed as -S "<time specification>".

51

The date and time will be different on your host, so be sure to use the timestamps that match
the times in your journals:
May 10 10:54:35 testvm1.both.org audit: BPF prog-id=54 op=LOAD
May 10 10:54:35 testvm1.both.org audit: BPF prog-id=55 op=LOAD
May 10 10:54:45 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
exe="/usr/lib/systemd"'
May 10 10:54:45 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
exe="/usr/lib/systemd/"'
May 10 10:56:00 testvm1.both.org NetworkManager[840]: <error> [1589122560.0633]
dhcp4 (enp0s3): error -113 dispatching events
May 10 10:56:00 testvm1.both.org NetworkManager[840]: <info> [1589122560.0634]
dhcp4 (enp0s3): state changed bound -> fail

The since specification skips all of the entries before that time, but there are still a lot of
entries after that time that you do not need. You can also use the until option to trim off
the entries that come a bit after the time you are interested in. I want the entire minute when
the event occurred and nothing more:
-- Logs begin at Tue 2020-05-05 18:11:49 EDT, end at Sun 2020-05-10 11:04:59 EDT.
May 10 10:54:35 testvm1.both.org systemd[1]: Reloading.
May 10 10:54:35 testvm1.both.org audit: BPF prog-id=27 op=UNLOAD
May 10 10:54:35 testvm1.both.org audit: BPF prog-id=26 op=UNLOAD
ay 10 10:54:35 testvm1.both.org audit: BPF prog-id=55 op=LOAD
May 10 10:54:45 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
exe="/usr/lib/systemd>

52

## May 10 10:54:45 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
exe="/usr/lib/systemd/>
lines 1-46/46 (END)

If there were a lot of activity in this time period, you could further narrow the resulting data
stream using a combination of these options:
"hello.sh"
-- Logs begin at Tue 2020-05-05 18:11:49 EDT, end at Sun 2020-05-10 11:10:41 EDT

Your results should be similar to mine. You can see from this series of experiments that the
service executed properly.

Reboot—finally
So far, you have not rebooted the host where you installed your service. So do that now
because, after all, this how-to is about running a program at startup. First, you need to enable
the service to launch during the startup sequence:
Created symlink /etc/systemd/system/multi-user.target.wants/hello.service →
/etc/systemd/system/hello.service.

Notice that the link was created in the /etc/systemd/system/multiuser.target.wants directory. This is because the service unit file specifies that the
service is "wanted" by the multi-user.target.
Reboot, and be sure to watch the data stream during the startup sequence to see the "Hello
world" message. Wait … you did not see it? Well, neither did I. Although it went by very fast, I
did see systemd's message that it was starting the hello.service.
Look at the journal since the latest system boot. You can use the less pager's search tool to
find "Hello" or "hello." I pruned many lines of data, but I left some of the surrounding journal
entries, so you can get a feel for what the entries pertaining to your service look like locally:
May 10 10:37:49 testvm1.both.org systemd[1]: Listening on SSSD Kerberos Cache
Manager responder socket.
May 10 10:37:49 testvm1.both.org systemd[1]: Reached target Sockets.
May 10 10:37:49 testvm1.both.org systemd[1]: Reached target Basic System.

53

May 10 10:37:49 testvm1.both.org systemd[1]: Starting Modem Manager...
May 10 10:37:49 testvm1.both.org systemd[1]: Starting Network Manager...
May 10 10:37:49 testvm1.both.org systemd[1]: Starting Avahi mDNS/DNS-SD Stack...
May 10 10:37:49 testvm1.both.org systemd[1]: Condition check resulted in Secure
Boot DBX (blacklist) updater being skipped.
May 10 10:37:49 testvm1.both.org systemd[1]: Starting My hello shell script...
May 10 10:37:49 testvm1.both.org systemd[1]: Starting IPv4 firewall with
iptables...
May 10 10:37:49 testvm1.both.org systemd[1]: Started irqbalance daemon.
May 10 10:37:49 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=irqbalance comm="systemd"
exe="/usr/lib/sy>"'
May 10 10:37:49 testvm1.both.org systemd[1]: Starting LSB: Init script for live
image....
May 10 10:37:49 testvm1.both.org systemd[1]: Starting Hardware Monitoring
Sensors...
May 10 10:37:49 testvm1.both.org systemd[1]: Starting NTP client/server...
May 10 10:37:49 testvm1.both.org systemd[1]: Starting SYSV: Late init script for
live image....
May 10 10:37:49 testvm1.both.org systemd[1]: Started SYSV: Late init script for
live image..
May 10 10:37:49 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=livesys-late comm="systemd"
exe="/usr/lib/>"'
May 10 10:37:49 testvm1.both.org hello.sh[842]: ######### Hello World! ########
May 10 10:37:49 testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
exe="/usr/lib/systemd>"'
May 10 10:37:49 testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
exe="/usr/lib/systemd/>
May 10 10:37:50 testvm1.both.org audit: BPF prog-id=28 op=LOAD

You can see that systemd started the hello.service unit, which ran the hello.sh shell
script with the output recorded in the journal. If you were able to catch it during boot, you
would also have seen the systemd message indicating that it was starting the script and
another message indicating that the service succeeded. By looking at the first systemd
message in the data stream above, you can see that systemd started your service very soon
after reaching the basic system target.
But I would like to see the message displayed at startup as well. There is a way to make that
happen: Add the following line to the [Service] section of the hello.service file:

54

## StandardOutput=journal+console

The hello.service file now looks like this:
Description=My hello shell script
ExecStart=/usr/local/bin/hello.sh
StandardOutput=journal+console

After adding this line, reboot the system, and watch the data stream as it scrolls up the display
during the boot process. You should see the message in its little box. After the startup
sequence completes, you can view the journal for the most recent boot and locate the entries
for your new service.

Changing the sequence
Now that your service is working, you can look at where it starts in the startup sequence and
experiment with changing it. It is important to remember that systemd's intent is to start as
many services and other unit types in parallel within each of the major targets:
basic.target, multi-user.target, and graphical.target. You should have just
seen the journal entries for the most recent boot, which should look similar to my journal in
the output above.
Notice that systemd started your test service soon after it reached the target basic system.
This is what you specified in the service unit file in the WantedBy line, so it is correct. Before
you change anything, list the contents of the /etc/systemd/system/multiuser.target.wants directory, and you will see a symbolic (soft) link to the service unit file.
The [Install] section of the service unit file specifies which target will start the service,

55

## and running the systemctl enable hello.service command creates the link in the
appropriate "target wants" directory:
hello.service -> /etc/systemd/system/hello.service

Certain services need to start during the basic.target, and others do not need to start
unless the system is starting the graphical.target. The service in this experiment will not
start in the basic.target—assume you do not need it to start until the
graphical.target. So change the WantedBy line:
WantedBy=graphical.target

Be sure to disable the hello.service and re-enable it to delete the old link and add the
new one in the graphical.targets.wants directory. I have noticed that if I forget to
disable the service before changing the target that wants it, I can run the systemctl
disable command, and the links will be removed from both "target wants" directories. Then,
I just need to re-enable the service and reboot.
One concern with starting services in the graphical.target is that if the host boots to
multi-user.target, this service will not start automatically. That may be what you want if
the service requires a GUI desktop interface, but it also may not be what you want.
Look at the journal entries for the graphical.target and the multi-user.target using
the -o short-monotonic option that displays seconds after kernel startup with
microsecond precision:

Some results for multi-user.target:
17.264730] testvm1.both.org systemd[1]: Starting My hello shell script...
17.265561] testvm1.both.org systemd[1]: Starting IPv4 firewall...
19.478468] testvm1.both.org systemd[1]: Starting LSB: Init script for live
image....
19.507359] ...both.org iptables.init[844]: Applying firewall rules: [ OK ]
19.507835] testvm1.both.org hello.sh[843]: ######### Hello World! ########
21.482481] testvm1.both.org systemd[1]: hello.service: Succeeded.
21.482550] testvm1.both.org smartd[856]: Opened configuration file
/etc/smartmontools/smartd.conf
21.482605] testvm1.both.org systemd[1]: Finished My hello shell script.

56

And some results for graphical.target:
19.436815] testvm1.both.org systemd[1]: Starting My hello shell script...
19.437070] testvm1.both.org systemd[1]: Starting IPv4 firewall...
19.612614] testvm1.both.org hello.sh[841]: ###############################
19.612614] testvm1.both.org hello.sh[841]: ######### Hello World! ########
19.612614] testvm1.both.org hello.sh[841]: ###############################
19.629455] testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
19.629569] testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
19.629682] testvm1.both.org systemd[1]: hello.service: Succeeded.
19.629782] testvm1.both.org systemd[1]: Finished My hello shell script.

Despite having the graphical.target "want" in the unit file, the hello.service unit
runs about 19.5 or 19.6 seconds into startup. But hello.service starts at about 17.24
seconds in the multi-user.target and 19.43 seconds in the graphical target.
What does this mean? Look at the /etc/systemd/system/default.target link. The
contents of that file show that systemd first starts the default target, graphical.target,
which then pulls in the multi-user.target:
Description=Graphical Interface
Requires=multi-user.target
Wants=display-manager.service
After=multi-user.target rescue.service rescue.target display-manager.service

Whether it starts the service with the graphical.target or the multi-user.target, the
hello.service unit runs at about 19.5 or 19.6 seconds into startup. Based on this and the

57

journal results (especially the ones using the monotonic output), you know that both of these
targets are starting in parallel. Look at one more thing from the journal output:

28.397330] testvm1.both.org systemd[1]: Reached target Multi-User System.
28.397431] testvm1.both.org systemd[1]: Reached target Graphical Interface.

Both targets finish at almost the same time. This is consistent because graphical.target
pulls in the multi-user.target and cannot finish until the multi.user target is
reached (finished). But hello.service finishes much earlier than this.
What all this means is that these two targets start up pretty much in parallel. If you explore the
journal entries, you will see various targets and services from each of those primary targets
starting mostly in parallel. It is clear that the multi-user.target does not need to
complete before the graphical.target starts. Therefore, simply using these primary
targets to sequence the startup does not work very well, although it can be useful for
ensuring that units are started only when they are needed for the graphical.target.
Before continuing, revert the hello.service unit file to WantedBy=multi-user.target
(if it's not already.)

Ensure a service starts after the network is running
A common startup sequence issue is ensuring that a unit starts after the network is up and
running. The Freedesktop.org article Running services after the network is up says there is no
real consensus on when a network is considered "up." However, the article provides three
options, and the one that meets the needs of a fully operational network is networkonline.target. Just be aware that network.target is used during shutdown rather than
startup, so it will not do you any good when you are trying to sequence the startup.
Before making any other changes, be sure to examine the journal and verify that the
hello.service unit starts well before the network. You can look for the networkonline.target in the journal to check.
Your service does not really require the network service, but you can use it as an avatar for
one that does.
Because setting WantedBy=graphical.target does not ensure that the service will be
started after the network is up and running, you need another way to ensure that it is.
Fortunately, there is an easy way to do this. Add the following two lines to the [Unit] section
of the hello.service unit file:

58

## After=network-online.target
Wants=network-online.target

Both of these entries are required to make this work. Reboot the host and look for the location
of entries for your service in the journals:
26.083121] testvm1.both.org NetworkManager[842]: <info> [1589227764.0293]
device (enp0s3): Activation: successful, device activated.
26.083349] testvm1.both.org NetworkManager[842]: <info> [1589227764.0301]
manager: NetworkManager state is now CONNECTED_GLOBAL
26.085818] testvm1.both.org NetworkManager[842]: <info> [1589227764.0331]
manager: startup complete
26.089911] testvm1.both.org systemd[1]: Finished Network Manager Wait Online.
26.090254] testvm1.both.org systemd[1]: Reached target Network is Online.
26.090399] testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=NetworkManager-wait-online
comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? termina>"'
26.091991] testvm1.both.org systemd[1]: Starting My hello shell script...
26.095864] testvm1.both.org sssd[be[implicit_files]][1007]: Starting up
26.290539] testvm1.both.org systemd[1]: Condition check resulted in Login and
scanning of iSCSI devices being skipped.
26.291075] testvm1.both.org systemd[1]: Reached target Remote File Systems
(Pre).
26.291154] testvm1.both.org systemd[1]: Reached target Remote File Systems.
26.292671] testvm1.both.org systemd[1]: Starting Notify NFS peers of a
restart...
26.294897] testvm1.both.org systemd[1]: iscsi.service: Unit cannot be
reloaded because it is inactive.
26.304682] testvm1.both.org hello.sh[1010]: ######### Hello World! ########
26.306569] testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
26.306669] testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
26.306772] testvm1.both.org systemd[1]: hello.service: Succeeded.
26.306862] testvm1.both.org systemd[1]: Finished My hello shell script.
26.584966] testvm1.both.org sm-notify[1011]: Version 2.4.3 starting

This confirms that the hello.service unit started after the network-online.target.
This is exactly what you want. You may also have seen the "Hello World" message as it passed
by during startup. Notice also that the timestamp is about six seconds later in the startup than
it was before.

59

The best way to define the start sequence
This article explored Linux startup with systemd and unit files and journals in greater detail
and discovered what happens when errors are introduced into the service file. As a sysadmin, I
find that this type of experimentation helps me understand the behaviors of a program or
service when it breaks, and breaking things intentionally is a good way to learn in a safe
environment.
As the experiments in this article proved, just adding a service unit to either the multiuser.target or the graphical.target does not define its place in the start sequence. It
merely determines whether a unit starts as part of a graphical environment or not. The reality
is that the startup targets multi-user.target and graphical.target—and all of their
Wants and Requires—start up pretty much in parallel. The best way to ensure that a unit starts
in a specific order is to determine the unit it is dependent on and configure the new unit to
"Want" and "After" the unit upon which it is dependent.

60

## Control your computer time and
date with systemd
Most people are concerned with time. We get up in time to perform our morning rituals and
commute to work (a short trip for many of us these days), take a break for lunch, meet a
project deadline, celebrate birthdays and holidays, catch a plane, and so much more.
Some of us are even obsessed with time. My watch is solar-powered and obtains the exact
time from the National Institute of Standards and Technology (NIST) in Fort Collins, Colorado,
via the WWVB time signal radio station located there. The time signals are synced to the
atomic clock, also located in Fort Collins. My Fitbit syncs up to my phone, which is synced to a
Network Time Protocol (NTP) server, which is ultimately synced to the atomic clock.

Why time is important to computers
There are many reasons our devices and computers need the exact time. For example, in
banking, stock markets, and other financial businesses, transactions must be maintained in
the proper order, and exact time sequences are critical for that.
Our phones, tablets, cars, GPS systems, and computers all require precise time and date
settings. I want the clock on my computer desktop to be correct, so I can count on my local
calendar application to pop up reminders at the correct time. The correct time also ensures
SystemV cron jobs and systemd timers trigger at the correct time.
The correct time is also important for logging, so it is a bit easier to locate specific log entries
based on the time. For one example, I once worked in DevOps (it was not called that at the
time) for the State of North Carolina email system. We used to process more than 20 million
emails per day. Following the trail of email through a series of servers or determining the exact
sequence of events by using log files on geographically dispersed hosts can be much easier
when the computers in question keep exact times.

61

Multiple times
Linux hosts have two times to consider: system time and RTC time. RTC stands for real-time
clock, which is a fancy and not particularly accurate name for the system hardware clock.
The hardware clock runs continuously, even when the computer is turned off, by using a
battery on the system motherboard. The RTC's primary function is to keep the time when a
connection to a time server is not available. In the dark ages of personal computers, there was
no internet to connect to a time server, so the only time a computer had available was the
internal clock. Operating systems had to rely on the RTC at boot time, and the user had to
manually set the system time using the hardware BIOS configuration interface to ensure it
was correct.
The hardware clock does not understand the concept of time zones; only the time is stored in
the RTC, not the time zone nor an offset from UTC (Universal Coordinated Time, which is also
known as GMT, or Greenwich Mean Time).
The system time is the time known by the operating system. It is the time you see on the GUI
clock on your desktop, in the output from the date command, in timestamps for logs, and in
file access, modify, and change times.
The rtc man page contains a more complete discussion of the RTC and system clocks and
RTC's functionality.

What about NTP?
Computers worldwide use the NTP (Network Time Protocol) to synchronize their time with
internet standard reference clocks through a hierarchy of NTP servers. The primary time
servers are at stratum 1, and they are connected directly to various national time services at
stratum 0 via satellite, radio, or even modems over phone lines. The time services at stratum 0
may be an atomic clock, a radio receiver that is tuned to the signals broadcast by an atomic
clock, or a GPS receiver using the highly accurate clock signals broadcast by GPS satellites.
To prevent time requests from time servers or clients lower in the hierarchy (i.e., with a higher
stratum number) from overwhelming the primary reference servers, several thousand public
NTP stratum 2 servers are open and available for all to use. Many organizations and users
(including me) with large numbers of hosts that need an NTP server choose to set up their
own time servers, so only one local host accesses the stratum 2 or 3 time servers. Then they

62

configure the remaining hosts in the network to use the local time server. In the case of my
home network, that is a stratum 3 server.

NTP implementation options
The original NTP implementation is ntpd, and it has been joined by two newer ones, chronyd
and systemd-timesyncd. All three keep the local host's time synchronized with an NTP time
server. The systemd-timesyncd service is not as robust as chronyd, but it is sufficient for most
purposes. It can perform large time jumps if the RTC is far out of sync, and it can adjust the
system time gradually to stay in sync with the NTP server if the local system time drifts a bit.
The systemd-timesync service cannot be used as a time server.
Chrony is an NTP implementation containing two programs: the chronyd daemon and a
command-line interface called chronyc. As I explained in a previous article, Chrony has some
features that make it the best choice for many environments, chiefly:
- Chrony can synchronize to the time server much faster than the old ntpd service. This
is good for laptops or desktops that do not run constantly.
- It can compensate for fluctuating clock frequencies, such as when a host hibernates or
enters sleep mode, or when the clock speed varies due to frequency stepping that
slows clock speeds when loads are low.
- It handles intermittent network connections and bandwidth saturation.
- It adjusts for network delays and latency.
- After the initial time sync, Chrony never stops the clock. This ensures stable and
consistent time intervals for many system services and applications.
- Chrony can work even without a network connection. In this case, the local host or
server can be updated manually.
- Chrony can act as an NTP server.
Just to be clear, NTP is a protocol that is implemented on a Linux host using either Chrony or
the systemd-timesyncd.service.
The NTP, Chrony, and systemd-timesyncd RPM packages are available in standard Fedora
repositories. The systemd-udev RPM is a rule-based device node and kernel event manager
that is installed by default with Fedora but not enabled.
You can install all three and switch between them, but that is a pain and not worth the trouble.
Modern releases of Fedora, CentOS, and RHEL have moved from NTP to Chrony as their
default timekeeping implementation, and they also install systemd-timesyncd. I find that

63

Chrony works well, provides a better interface than the NTP service, presents much more
information, and increases control, which are all advantages for the sysadmin.

Disable other NTP services
It's possible an NTP service is already running on your host. If so, you need to disable it before
switching to something else. I have been using chronyd, so I used the following commands to
stop and disable it. Run the appropriate commands for whatever NTP daemon you are using
on your host:
Removed /etc/systemd/system/multi-user.target.wants/chronyd.service.

Verify that it is both stopped and disabled:
- chronyd.service - NTP client/server
Loaded: loaded (/usr/lib/systemd/system/chronyd.service; disabled; vendor
preset: enabled)
Docs: man:chronyd(8)
man:chrony.conf(5)

## Check the status before starting
The systemd timesync's status indicates whether systemd has initiated an NTP service.
Because you have not yet started systemd NTP, the timesync-status command returns no
data:
Failed to query server: Could not activate remote peer.

## But a straight status request provides some important information. For example, the
timedatectl command without an argument or options implies the status subcommand
as default:
Local time: Fri 2020-05-15 08:43:10 EDT
Universal time: Fri 2020-05-15 12:43:10 UTC
RTC time: Fri 2020-05-15 08:43:08
Time zone: America/New_York (EDT, -0400)
System clock synchronized: no
NTP service: inactive
RTC in local TZ: yes

64

Warning: The system is configured to read the RTC time in the local time zone.
This mode cannot be fully supported. It will create various problems
with time zone changes and daylight saving time adjustments. The RTC
time is never updated, it relies on external facilities to maintain it.
If at all possible, use RTC in UTC by calling
'timedatectl set-local-rtc 0'.

This returns the local time for your host, the UTC time, and the RTC time. It shows that the
system time is set to the America/New_York time zone (TZ), the RTC is set to the time in
the local time zone, and the NTP service is not active. The RTC time has started to drift a bit
from the system time. This is normal with systems whose clocks have not been synchronized.
The amount of drift on a host depends upon the amount of time since the system was last
synced and the speed of the drift per unit of time.
There is also a warning message about using local time for the RTC—this relates to time-zone
changes and daylight saving time adjustments. If the computer is off when changes need to
be made, the RTC time will not change. This isn't an issue in servers or other hosts that are
powered on 24/7. Also, any service that provides NTP time synchronization ensures time is set
early in the startup process, so it's correct before it is fully up and running.

Set the time zone
Usually, you set a computer's time zone during the installation procedure and never need to
change it. However, there are times it is necessary to change the time zone, and there are a
couple of tools to help. Linux uses time-zone files to define the local time zone in use by the
host. These binary files are located in the /usr/share/zoneinfo directory. The default for
my time zone is defined by the link /etc/localtime ->
../usr/share/zoneinfo/America/New_York. But you don't need to know that to
change the time zone.
But you do need to know the official time-zone name for your location. Say you want to
change the time zone to Los Angeles:
America/La_Paz
Europe/Budapest
America/Lima
Europe/Chisinau
America/Los_Angeles
Europe/Copenhagen
America/Maceio
Europe/Dublin
America/Managua
Europe/Gibraltar

65

Now you can set the time zone. I used the date command to verify the change, but you could
also use timedatectl:
Tue 19 May 2020 04:47:49 PM EDT
Tue 19 May 2020 01:48:23 PM PDT

You can now change your host's time zone back to your local one.

systemd-timesyncd
The systemd timesync daemon provides an NTP implementation that is easy to manage
within a systemd context. It is installed by default in Fedora and Ubuntu and started by default
in Ubuntu but not in Fedora. I am unsure about other distros; you can check yours with:

## Configure systemd-timesyncd
The configuration file for systemd-timesyncd is /etc/systemd/timesyncd.conf. It is a
simple file with fewer options included than the older NTP service and chronyd. Here are the
complete contents of the default version of this file on my Fedora VM:
[Time]
#NTP=
#FallbackNTP=0.fedora.pool.ntp.org 1.fedora.pool.ntp.org 2.fedora.pool.ntp.org
3.fedora.pool.ntp.org
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048

The only section it contains besides comments is [Time], and all the lines are commented
out. These are the default values and do not need to be changed or uncommented (unless

66

you have some reason to do so). If you do not have a specific NTP time server defined in the
NTP= line, Fedora's default is to fall back on the Fedora pool of time servers. I like to add the
time server on my network to this line:
NTP=myntpserver

## Start timesync
Starting and enabling systemd-timesyncd is just like any other service:
Created symlink /etc/systemd/system/dbus-org.freedesktop.timesync1.service →
/usr/lib/systemd/system/systemd-timesyncd.service.
Created symlink /etc/systemd/system/sysinit.target.wants/systemdtimesyncd.service → /usr/lib/systemd/system/systemd-timesyncd.service.

## Set the hardware clock
Here's what one of my systems looked like after starting timesyncd:
Local time: Sat 2020-05-16 14:34:54 EDT
Universal time: Sat 2020-05-16 18:34:54 UTC
RTC time: Sat 2020-05-16 14:34:53
Time zone: America/New_York (EDT, -0400)
System clock synchronized: yes
NTP service: active
RTC in local TZ: no

The RTC time is around a second off from local time (EDT), and the discrepancy grows by a
couple more seconds over the next few days. Because RTC does not have the concept of time
zones, the timedatectl command must do a comparison to determine which time zone is a
match. If the RTC time does not match local time exactly, it is not considered to be in the local
time zone.
In search of a bit more information, I checked the status of systemd-timesync.service and
found:
- systemd-timesyncd.service - Network Time Synchronization
Loaded: loaded (/usr/lib/systemd/system/systemd-timesyncd.service; enabled;
vendor preset: disabled)

67

## Active: active (running) since Sat 2020-05-16 13:56:53 EDT; 18h ago
Docs: man:systemd-timesyncd.service(8)
Main PID: 822 (systemd-timesyn)
Status: "Initial synchronization to time server 163.237.218.19:123
(2.fedora.pool.ntp.org)."
Tasks: 2 (limit: 10365)
Memory: 2.8M
CPU: 476ms
CGroup: /system.slice/systemd-timesyncd.service
└─822 /usr/lib/systemd/systemd-timesyncd
May 16 09:57:24 testvm2.both.org systemd[1]: Starting Network Time
Synchronization...
May 16 09:57:24 testvm2.both.org systemd-timesyncd[822]: System clock time unset
or jumped backwards, restoring from recorded timestamp: Sat 2020-05-16 13:56:53
May 16 13:56:53 ...m2.both.org systemd[1]: Started Network Time Synchronization.
May 16 13:57:56 testvm2.both.org systemd-timesyncd[822]: Initial synchronization
to time server 163.237.218.19:123 (2.fedora.pool.ntp.org).

Notice the log message that says the system clock time was unset or jumped backward. The
timesync service sets the system time from a timestamp. Timestamps are maintained by the
timesync daemon and are created at each successful time synchronization.
The timedatectl command does not have the ability to set the value of the hardware clock
from the system clock; it can only set the time and date from a value entered on the
command line. However, you can set the RTC to the same value as the system time by using
the hwclock command:
Local time: Mon 2020-05-18 13:56:46 EDT
Universal time: Mon 2020-05-18 17:56:46 UTC
RTC time: Mon 2020-05-18 13:56:46
Time zone: America/New_York (EDT, -0400)
System clock synchronized: yes
NTP service: active
RTC in local TZ: yes

The --localtime option ensures that the hardware clock is set to local time, not UTC.

Do you really need RTC?
Any NTP implementation will set the system clock during the startup sequence, so is RTC
necessary? Not really, so long as you have a network connection to a time server. However,
many systems do not have full-time access to a network connection, so the hardware clock is

68

useful so that Linux can read it and set the system time. This is a better solution than having
to set the time by hand, even if it might drift away from the actual time.

Summary
This article explored the use of some systemd tools for managing date, time, and time zones.
The systemd-timesyncd tool provides a decent NTP client that can keep time on a local host
synchronized with an NTP server. However, systemd-timesyncd does not provide a server
service, so if you need an NTP server on your network, you must use something else, such as
Chrony, to act as a server.
I prefer to have a single implementation for any service in my network, so I use Chrony. If you
do not need a local NTP server, or if you do not mind dealing with Chrony for the server and
systemd-timesyncd for the client and you do not need Chrony's additional capabilities, then
systemd-timesyncd is a serviceable choice for an NTP client.
There is another point I want to make: You do not have to use systemd tools for NTP
implementation. You can use the old ntpd or Chrony or some other NTP implementation.
systemd is composed of a large number of services; many of them are optional, so they can
be disabled and something else used in its place. It is not the huge, monolithic monster that
some make it out to be. It is OK to not like systemd or parts of it, but you should make an
informed decision.
I don't dislike systemd's implementation of NTP, but I much prefer Chrony because it meets
my needs better. And that is what Linux is all about.

69

## Use systemd timers instead of
cronjobs
I am in the process of converting my cron jobs to systemd timers. I have used timers for a few
years, but usually, I learned just enough to perform the task I was working on. While doing
research for this systemd series, I learned that systemd timers have some very interesting
capabilities.
Like cron jobs, systemd timers can trigger events—shell scripts and programs—at specified
time intervals, such as once a day, on a specific day of the month (perhaps only if it is a
Monday), or every 15 minutes during business hours from 8am to 6pm. Timers can also do
some things that cron jobs cannot. For example, a timer can trigger a script or program to run
a specific amount of time after an event such as boot, startup, completion of a previous task,
or even the previous completion of the service unit called by the timer.

System maintenance timers
When Fedora or any systemd-based distribution is installed on a new system, it creates
several timers that are part of the system maintenance procedures that happen in the
background of any Linux host. These timers trigger events necessary for common
maintenance tasks, such as updating system databases, cleaning temporary directories,
rotating log files, and more.
As an example, I'll look at some of the timers on my primary workstation by using the
systemctl status *timer command to list all the timers on my host. The asterisk symbol
works the same as it does for file globbing, so this command lists all systemd timer units:
- mlocate-updatedb.timer - Updates mlocate database every day
Loaded: loaded (/usr/lib/systemd/system/mlocate-updatedb.timer; enabled;
vendor preset: enabled)

70

## Active: active (waiting) since Tue 2020-06-02 08:02:33 EDT; 2 days ago
Trigger: Fri 2020-06-05 00:00:00 EDT; 15h left
Triggers: ● mlocate-updatedb.service
Jun 02 08:02:33 testvm1.both.org systemd[1]: Started Updates mlocate database
every day.
- logrotate.timer - Daily rotation of log files
Loaded: loaded (/usr/lib/systemd/system/logrotate.timer; enabled; vendor
preset: enabled)
Active: active (waiting) since Tue 2020-06-02 08:02:33 EDT; 2 days ago
Trigger: Fri 2020-06-05 00:00:00 EDT; 15h left
Triggers: ● logrotate.service
Docs: man:logrotate(8)
man:logrotate.conf(5)
Jun 02 08:02:33 testvm1.both.org systemd[1]: Started Daily rotation of log files.
Jun 02 08:02:33 testvm1.both.org systemd[1]: Started Run system activity
accounting tool every 10 minutes.

Each timer has at least six lines of information associated with it:
- The first line has the timer's file name and a short description of its purpose.
- The second line displays the timer's status, whether it is loaded, the full path to the
timer unit file, and the vendor preset.
- The third line indicates its active status, which includes the date and time the timer
became active.
- The fourth line contains the date and time the timer will be triggered next and an
approximate time until the trigger occurs.
- The fifth line shows the name of the event or the service that is triggered by the timer.
- Some (but not all) systemd unit files have pointers to the relevant documentation.
Three of the timers in my virtual machine's output have pointers to documentation.
This is a nice (but optional) bit of data.
- The final line is the journal entry for the most recent instance of the service triggered
by the timer.
Depending upon your host, you probably have a different set of timers.

Create a timer
Although we can deconstruct one or more of the existing timers to learn how they work, let’s
create our own service unit and a timer unit to trigger it. We will use a fairly trivial example in

71

order to keep this simple. After we have finished this, it will be easier to understand how the
other timers work and to determine what they are doing.
First, create a simple service that will run something basic, such as the free command. For
example, you may want to monitor free memory at regular intervals. Create the following
myMonitor.service unit file in the /etc/systemd/system directory. It does not need to
be executable:
Description=Logs system statistics to the systemd journal
Wants=myMonitor.timer
ExecStart=/usr/bin/free

Now let’s look at the status and test our service unit to ensure that it works as we expect it to.
- myMonitor.service - Logs system statistics to the systemd journal
Loaded: loaded (/etc/systemd/system/myMonitor.service; disabled; vendor

Where is the output? By default, the standard output (STDOUT) from programs run by
systemd service units is sent to the systemd journal, which leaves a record you can view now
or later—up to a point. (I will look at systemd journaling and retention strategies in a future
article in this series.) Look at the journal specifically for your service unit and for today only.
The -S option, which is the short version of --since, allows you to specify the time period
that the journalctl tool should search for entries. This isn't because you don't care about
previous results—in this case, there won't be any—it is to shorten the search time if your host
has been running for a long time and has accumulated a large number of entries in the journal:

72

-- Logs begin at Mon 2020-06-08 07:47:20 EDT, end at Thu 2020-06-11 09:40:47 EDT.
-Jun 11 09:12:09 testvm1.both.org systemd[1]: Starting Logs system statistics to the systemd journal...
Jun 11 09:12:09 testvm1.both.org free[377966]: total
shared buff/cache
available
Jun 11 09:12:09 testvm1.both.org free[377966]: Mem:
522868
11032860
8016
1080012
11821508
Jun 11 09:12:09 testvm1.both.org free[377966]: Swap:
Jun 11 09:12:09 testvm1.both.org systemd[1]: myMonitor.service: Succeeded.

A task triggered by a service can be a single program, a series of programs, or a script written
in any scripting language. Add another task to the service by adding the following line to the
end of the [Service] section of the myMonitor.service unit file:
ExecStart=/usr/bin/lsblk

Start the service again and check the journal for the results, which should look like this. You
should see the results from both commands in the journal:
Jun 11 15:42:18 testvm1.both.org systemd[1]: Starting Logs system statistics to the systemd journal...
Jun 11 15:42:18 testvm1.both.org free[379961]:
shared
buff/cache
available
Jun 11 15:42:18 testvm1.both.org free[379961]: Mem:
531788
11019540
8024...
Jun 11 15:42:18 testvm1.both.org free[379961]: Swap:
Jun 11 15:42:18 testvm1.both.org lsblk[379962]: NAME
Jun 11 15:42:18 testvm1.both.org lsblk[379962]: sda
Jun 11 15:42:18 testvm1.both.org lsblk[379962]: ├─sda1
Jun 11 15:42:18 testvm1.both.org lsblk[379962]: └─sda2
Jun 11 15:42:18 testvm1.both.org lsblk[379962]: sr0
Jun 11 15:42:18 testvm1.both.org systemd[1]: myMonitor.service: Succeeded.
Jun 11 15:42:18 testvm1.both.org systemd[1]: Finished Logs system statistics to the systemd journal.

Now that you know your service works as expected, create the timer unit file,
myMonitor.timer in /etc/systemd/system, and add the following:
Description=Logs some system statistics to the systemd journal
Requires=myMonitor.service
[Timer]
Unit=myMonitor.service
OnCalendar=*-*-* *:*:00

73

## WantedBy=timers.target

The OnCalendar time specification in the myMonitor.timer file, *-*-* *:*:00,
should trigger the timer to execute the myMonitor.service unit every minute. I will explore
OnCalendar settings a bit later in this article.
For now, observe any journal entries pertaining to running your service when it is triggered by
the timer. You could also follow the timer, but following the service allows you to see the
results in near real time. Run journalctl with the -f (follow) option:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT. --

Start but do not enable the timer, and see what happens after it runs for a while:

One result shows up right away, and the next ones come at—sort of—one-minute intervals.
Watch the journal for a few minutes and see if you notice the same things I did:
-- Logs begin at Mon 2020-06-08 07:47:20 EDT. -Jun 13 08:39:18 testvm1.both.org systemd[1]: Starting Logs system statistics to the systemd journal...
Jun 13 08:39:18 testvm1.both.org systemd[1]: myMonitor.service: Succeeded.
Jun 13 08:39:19 testvm1.both.org free[630566]:
shared...
Jun 13 08:39:19 testvm1.both.org free[630566]: Mem:
556604
10965516
8036...
Jun 13 08:39:19 testvm1.both.org free[630566]: Swap:
Jun 13 08:39:18 testvm1.both.org systemd[1]: Finished Logs system statistics to the systemd journal.
Jun 13 08:39:19 testvm1.both.org lsblk[630567]: NAME
Jun 13 08:39:19 testvm1.both.org lsblk[630567]: sda
Jun 13 08:39:19 testvm1.both.org lsblk[630567]: ├─sda1
Jun 13 08:39:19 testvm1.both.org lsblk[630567]: └─sda2
Jun 13 08:39:19 testvm1.both.org lsblk[630567]: sr0
Jun 13 08:40:46 testvm1.both.org systemd[1]: Starting Logs system statistics to the systemd journal...
Jun 13 08:40:46 testvm1.both.org free[630572]:
shared...
Jun 13 08:40:46 testvm1.both.org free[630572]: Mem:
555228
10966836
8036...
Jun 13 08:40:46 testvm1.both.org free[630572]: Swap:
Jun 13 08:40:46 testvm1.both.org lsblk[630574]: NAME
Jun 13 08:40:46 testvm1.both.org lsblk[630574]: sda
Jun 13 08:40:46 testvm1.both.org lsblk[630574]: ├─sda1
Jun 13 08:40:46 testvm1.both.org lsblk[630574]: └─sda2

74

## Jun 13 08:40:46 testvm1.both.org lsblk[630574]: sr0
Jun 13 08:40:46 testvm1.both.org systemd[1]: myMonitor.service: Succeeded.
Jun 13 08:40:46 testvm1.both.org systemd[1]: Finished Logs system statistics to the systemd journal.
Jun 13 08:41:46 testvm1.both.org systemd[1]: Starting Logs system statistics to the systemd journal...
Jun 13 08:41:46 testvm1.both.org free[630580]:
shared...
Jun 13 08:41:46 testvm1.both.org free[630580]: Mem:
553488
10968564
8036...
Jun 13 08:41:46 testvm1.both.org free[630580]: Swap:
Jun 13 08:41:47 testvm1.both.org lsblk[630581]: NAME
Jun 13 08:41:47 testvm1.both.org lsblk[630581]: sda
Jun 13 08:41:47 testvm1.both.org lsblk[630581]: ├─sda1
Jun 13 08:41:47 testvm1.both.org lsblk[630581]: └─sda2
Jun 13 08:41:47 testvm1.both.org lsblk[630581]: sr0
Jun 13 08:41:47 testvm1.both.org systemd[1]: myMonitor.service: Succeeded.
Jun 13 08:41:47 testvm1.both.org systemd[1]: Finished Logs system statistics to the systemd journal.

Be sure to check the status of both the timer and the service.
You probably noticed at least two things in the journal. First, you do not need to do anything
special to cause the STDOUT from the ExecStart triggers in the myMonitor.service unit
to be stored in the journal. That is all part of using systemd for running services. However, it
does mean that you might need to be careful about running scripts from a service unit and
how much STDOUT they generate.
The second thing is that the timer does not trigger exactly on the minute at :00 seconds or
even exactly one minute from the previous instance. This is intentional, but it can be
overridden if necessary (or if it just offends your sysadmin sensibilities).
The reason for this behavior is to prevent multiple services from triggering at exactly the
same time. For example, you can use time specifications such as Weekly, Daily, and more.
These shortcuts are all defined to trigger at 00:00:00 hours on the day they are triggered.
When multiple timers are specified this way, there is a strong likelihood that they would
attempt to start simultaneously.
systemd timers are intentionally designed to trigger somewhat randomly around the specified
time to try to prevent simultaneous triggers. They trigger semi-randomly within a time
window that starts at the specified trigger time and ends at the specified time plus one
minute. This trigger time is maintained at a stable position with respect to all other defined
timer units, according to the systemd.timer man page. You can see in the journal entries

75

above that the timer triggered immediately when it started and then about 46 or 47 seconds
after each minute.
Most of the time, such probabilistic trigger times are fine. When scheduling tasks such as
backups to run, so long as they run during off-hours, there will be no problems. A sysadmin
can select a deterministic start time, such as 01:05:00 in a typical cron job specification, to
not conflict with other tasks, but there is a large range of time values that will accomplish that.
A one-minute bit of randomness in a start time is usually irrelevant.
However, for some tasks, exact trigger times are an absolute requirement. For those, you can
specify greater trigger time-span accuracy (to within a microsecond) by adding a statement
like this to the Timer section of the timer unit file:
AccuracySec=1us

Time spans can be used to specify the desired accuracy as well as to define time spans for
repeating or one-time events. It recognizes the following units:
- usec, us, µs
- msec, ms
- seconds, second, sec, s
- minutes, minute, min, m
- hours, hour, hr, h
- days, day, d
- weeks, week, w
- months, month, M (defined as 30.44 days)
- years, year, y (defined as 365.25 days)
All the default timers in /usr/lib/systemd/system specify a much larger range for
accuracy because exact times are not critical. Look at some of the specifications in the
system-created timers:
/usr/lib/systemd/system/fstrim.timer:AccuracySec=1h
/usr/lib/systemd/system/logrotate.timer:AccuracySec=1h
/usr/lib/systemd/system/logwatch.timer:AccuracySec=12h
/usr/lib/systemd/system/mlocate-updatedb.timer:AccuracySec=24h
/usr/lib/systemd/system/raid-check.timer:AccuracySec=24h
/usr/lib/systemd/system/unbound-anchor.timer:AccuracySec=24h

76

View the complete contents of some of the timer unit files in the
/usr/lib/systemd/system directory to see how they are constructed.
You do not have to enable the timer in this experiment to activate it at boot time, but the
command to do so would be:

The unit files you created do not need to be executable. You also did not enable the service
unit because it is triggered by the timer. You can still trigger the service unit manually from
the command line, should you want to. Try that and observe the journal.
See the man pages for systemd.timer and systemd.time for more information about
timer accuracy, event-time specifications, and trigger events.

Timer types
systemd timers have other capabilities that are not found in cron, which triggers only on
specific, repetitive, real-time dates and times. systemd timers can be configured to trigger
based on status changes in other systemd units. For example, a timer might be configured to
trigger a specific elapsed time after system boot, after startup, or after a defined service unit
activates. These are called monotonic timers. Monotonic refers to a count or sequence that
continually increases. These timers are not persistent because they reset after each boot.
Table 1 lists the monotonic timers along with a short definition of each, as well as the
OnCalendar timer, which is not monotonic and is used to specify future times that may or
may not be repetitive. This information is derived from the systemd.timer man page with a
few minor changes.
Timer

## Monotonic

## Definition

## OnActiveSec=

## This defines a timer relative to the moment the timer is
activated.

## OnBootSec=

This defines a timer relative to when the machine boots up.

## This defines a timer relative to when the service manager
first starts. For system timer units, this is very similar to
OnBootSec=, as the system service manager generally starts
very early at boot. It's primarily useful when configured in
units running in the per-user service manager, as the user
service manager generally starts on first login only, not
during boot.

## OnStartupSec=

77

## Timer

## Monotonic

## Definition

## OnUnitActiveSec=

This defines a timer relative to when the timer that is to be
activated was last activated.

## OnUnitInactiveSec=

This defines a timer relative to when the timer that is to be
activated was last deactivated.

## OnCalendar=

## This defines real-time (i.e., wall clock) timers with calendar
event expressions. See systemd.time(7) for more information
on the syntax of calendar event expressions. Otherwise, the
semantics are similar to OnActiveSec= and related settings.
This timer is the one most like those used with the cron
service.

Table 1: systemd timer definitions
Monotonic timers can use the same shortcut names for their time spans as the AccuracySec
statement mentioned before, but systemd normalizes those names to seconds. For example,
you might want to specify a timer that triggers an event one time, five days after the system
boots; that might look like: OnBootSec=5d. If the host booted at 2020-06-15 09:45:27,
the timer would trigger at 2020-06-20 09:45:27 or within one minute after.

Calendar event specifications
Calendar event specifications are a key part of triggering timers at desired repetitive times.
Start by looking at some specifications used with the OnCalendar setting.
systemd and its timers use a different style for time and date specifications than the format
used in crontab. It is more flexible than crontab and allows fuzzy dates and times in the
manner of the at command. It should also be familiar enough that it will be easy to
understand.
The basic format for systemd timers using OnCalendar= is DOW YYYY-MM-DD HH:MM:SS.
DOW (day of week) is optional, and other fields can use an asterisk (*) to match any value for
that position. All calendar time forms are converted to a normalized form. If the time is not
specified, it is assumed to be 00:00:00. If the date is not specified but the time is, the next
match might be today or tomorrow, depending upon the current time. Names or numbers can
be used for the month and day of the week. Comma-separated lists of each unit can be
specified. Unit ranges can be specified with .. between the beginning and ending values.
There are a couple interesting options for specifying dates. The Tilde (~) can be used to
specify the last day of the month or a specified number of days prior to the last day of the
month. The “/” can be used to specify a day of the week as a modifier.

78

Here are some examples of some time specifications used in OnCalendar statements.
Calendar event
specification

## DOW YYYY-MM-DD
HH:MM:SS
*-*-* 00:15:30

Every day of every month of every year at 15 minutes and 30 seconds
after midnight

## Weekly

## Every Monday at 00:00:00

## Mon *-*-* 00:00:00

## Same as weekly

## Mon

## Same as weekly

## Wed 2020-*-*

## Every Wednesday in 2020 at 00:00:00

## Mon..Fri 2021-*-*

## Every weekday in 2021 at 00:00:00

2022-6,7,8-1,15 01:15:00

The 1st and 15th of June, July, and August of 2022 at 01:15:00am

## Mon *-05~03

The next occurrence of a Monday in May of any year which is also the
3rd day from the end of the month.

## Mon..Fri *-08~04

The 4th day preceding the end of August for any years in which it also
falls on a weekday.

*-05~03/2

The 3rd day from the end of the month of May and then again two days
later. Repeats every year. Note that this expression uses the Tilde (~).

*-05-03/2

The third day of the month of may and then every 2nd day for the rest
of May. Repeats every year. Note that this expression uses the dash (-).

## Table 2: Sample OnCalendar event specifications

## Test calendar specifications
systemd provides an excellent tool for validating and examining calendar time event
specifications in a timer. The systemd-analyze calendar tool parses a calendar time
event specification and provides the normalized form as well as other interesting information
such as the date and time of the next "elapse," i.e., match, and the approximate amount of
time before the trigger time is reached.
First, look at a date in the future without a time (note that the times for Next elapse and
UTC will differ based on your local time zone):

79

Now add a time. In this example, the date and time are analyzed separately as non-related
entities:
Original form: 15:21:16
Normalized form: *-*-* 15:21:16
Next elapse: Mon 2020-06-15 15:21:16 EDT
(in UTC): Mon 2020-06-15 19:21:16 UTC
From now: 3h 55min left

To analyze the date and time as a single unit, enclose them together in quotes. Be sure to
remove the quotes when using them in the OnCalendar= event specification in a timer unit
or you get errors:
Normalized form: 2030-06-17 15:21:16
Next elapse: Mon 2030-06-17 15:21:16 EDT
(in UTC): Mon 2030-06-17 19:21:16 UTC

Now test the entries in Table 2. I like the last one, especially:
Original form: 2022-6,7,8-1,15 01:15:00
Normalized form: 2022-06,07,08-01,15 01:15:00
Next elapse: Wed 2022-06-01 01:15:00 EDT
(in UTC): Wed 2022-06-01 05:15:00 UTC
From now: 1 years 11 months left

Look at this example, in which I list the next five elapses for the timestamp expression:
Original form: Mon *-05~3
Normalized form: Mon *-05~03 00:00:00
Next elapse: Mon 2023-05-29 00:00:00 EDT
(in UTC): Mon 2023-05-29 04:00:00 UTC
From now: 2 years 11 months left
Iter. #2: Mon 2028-05-29 00:00:00 EDT
(in UTC): Mon 2028-05-29 04:00:00 UTC
From now: 7 years 11 months left

80

## Iter. #3: Mon 2034-05-29 00:00:00 EDT
(in UTC): Mon 2034-05-29 04:00:00 UTC
From now: 13 years 11 months left
Iter. #4: Mon 2045-05-29 00:00:00 EDT
(in UTC): Mon 2045-05-29 04:00:00 UTC
From now: 24 years 11 months left
Iter. #5: Mon 2051-05-29 00:00:00 EDT
(in UTC): Mon 2051-05-29 04:00:00 UTC
From now: 30 years 11 months left

This gives you enough information to start testing your OnCalendar time specifications. The
systemd-analyze tool can be used for other interesting analyses, which I will begin to
explore in the next article in this series.

Summary
systemd timers can be used to perform the same kinds of tasks as the cron tool but offer
more flexibility in terms of the calendar and monotonic time specifications for triggering
events.
Even though the service unit you created for this experiment is usually triggered by the timer,
you can also use the systemctl start myMonitor.service command to trigger it at
any time. Multiple maintenance tasks can be scripted in a single timer; these can be Bash
scripts or Linux utility programs. You can run the service triggered by the timer to run all the
scripts, or you can run individual scripts as needed.
I have not yet seen any indication that cron and at will be deprecated. I hope that does not
happen because at is much easier to use for one-off task scheduling than systemd timers!

81

systemd calendar and timespans
systemd uses calendar time, specifying one or more moments in time to trigger events (such
as a backup program), as well as timestamped entries in the journal. It can also use timespans,
which define the amount of time between two events but are not directly tied to specific
calendar times.
In this chapter, I will look in more detail at how time and date are used and specified in
systemd. Also, because systemd uses two slightly different, non-compatible time formats, I
will explain how and when they are used.

## Definitions
Here are some important time- and calendar-related systemd terms to understand:
- Absolute timestamp: A single unambiguous and unique point in time defined in the
format YYYY-MM-DD HH:MM:SS. The timestamp format specifies points in time when
events are triggered by timers. An absolute timestamp can represent only a single
point in time, such as 2025-04-15 13:21:05.
- Accuracy is the quality of closeness to the true time; in other words, how close to the
specified calendar time an event is triggered by a timer. The default accuracy for
systemd timers is defined as a one-minute timespan that starts at the defined calendar
time. For example, an event specified to occur at the OnCalendar time of 09:52:17
might be triggered at any time between then and 09:53:17.
- Calendar events are one or more specific times specified by a systemd timestamp in
the format YYYY-MM-DD HH:MM:SS. It can be a single point in time or a series of
points that are well-defined and for which the exact times can be calculated. systemd
journals use timestamps to mark each event with the exact time it occurred.

82

In systemd, exact time is specified in the timestamp format YYYY-MM-DD HH:MM:SS.
When only the YYYY-MM-DD portion is specified, the time defaults to 00:00:00. When
only the HH:MM:SS portion is specified, the date is the next calendar instance of that
time. If the time specified is before the current time, the next instance will be tomorrow,
and if the specified time is later than the current time, the next instance will be today.
This is the format systemd timers use to express OnCalendar times.
Recurring calendar events can be specified using special characters and formats that
represent fields with multiple value matches. For example, 2026-08-15..25
12:15:00 represents 12:15pm on the 15th through the 25th of August 2026 and would
trigger 11 matches. Calendar events can also be specified with an absolute timestamp.
- Timespan is the amount of time between two events or the duration of something like
an event or the time between two events. Timespans can be used to specify the
desired accuracy for an event to be triggered by a timer and to define the time to
elapse between events. systemd recognizes the following time units:
- usec, us, µs
- msec, ms
- seconds, second, sec, s
- minutes, minute, min, m
- hours, hour, hr, h
- days, day, d
- weeks, week, w
- months, month, M (defined as 30.44 days)
- years, year, y (defined as 365.25 days)
The systemd.time(7) man page has a complete description of time and date expressions
in timers and other systemd tools.

Calendar event expressions
Calendar event expressions are a key part of triggering timers at repetitive times. systemd
and its timers don't use the same style for time and date expressions as crontab uses.
systemd is also more flexible than crontab and allows fuzzy dates and times similar to the at
command.
The format OnCalendar= uses for calendar event expressions is DOW YYYY-MM-DD
HH:MM:SS. DOW (day of the week) is optional, and other fields can use an asterisk (*) to

83

match any value for that position. If the time is not specified, it is assumed to be 00:00:00. If
the date is not specified but the time is, the next match might be today or tomorrow,
depending upon the current time. All the various calendar time-expression formats are
converted to a normalized form, and the systemd-analyze calendar command shows
the normalized form of the time expression.
systemd provides an excellent tool for validating and examining calendar events used in an
expression. The systemd-analyze calendar tool parses a calendar time event expression
and provides the normalized form and other information, such as the date and time of the
next "elapse" (match) and the approximate amount of time before it reaches the trigger time.
Note: All the following commands can be performed by non-root users and the
times for "Next elapse" and "UTC" differ based on your local time zone.
First, look at the syntax of the systemd-analyze calendar command. Start with a date in the
future without a time. Because all the date unit fields are explicitly specified, this is a one-time
event:
$ systemd-analyze calendar 2030-06-17

Add a time (in this example, the date and time are analyzed separately as non-related
entities):
$ systemd-analyze calendar 2030-06-17 15:21:16
Original form: 15:21:16
Normalized form: *-*-* 15:21:16
Next elapse: Mon 2020-06-15 15:21:16 EDT
(in UTC): Mon 2020-06-15 19:21:16 UTC
From now: 3h 55min left

To analyze the date and time as a single entity, enclose them together in quotes:

84

## $ systemd-analyze calendar "2030-06-17 15:21:16"
Normalized form: 2030-06-17 15:21:16
Next elapse: Mon 2030-06-17 15:21:16 EDT
(in UTC): Mon 2030-06-17 19:21:16 UTC

Specify one time earlier than the current time and one later. In this example, the current time
is 16:16 on 2019-05-15:
$ systemd-analyze calendar 15:21:16 22:15
Original form: 15:21:16
Normalized form: *-*-* 15:21:16
Next elapse: Fri 2019-05-17 15:21:16 EDT
(in UTC): Fri 2019-05-17 19:21:16 UTC
From now: 23h left
Original form: 22:15
Normalized form: *-*-* 22:15:00
Next elapse: Thu 2019-05-16 22:15:00 EDT
(in UTC): Fri 2019-05-17 02:15:00 UTC
From now: 5h 59min left

The systemd-analyze calendar tool does not work on timestamps. So things like
"tomorrow" or "today" will cause errors if you use them with the calendar sub-command
because they are timestamps rather than OnCalendar time formats:
$ systemd-analyze calendar "tomorrow"
Failed to parse calendar expression 'tomorrow': Invalid argument
Hint: this expression is a valid timestamp. Use 'systemd-analyze timestamp
"tomorrow"' instead?

The term "tomorrow" always resolves to tomorrow's date and a time of 00:00:00. You must
use the normalized expression format, YYYY-MM-DD HH:MM:SS, for this tool to work in
calendar mode. Despite this, the systemd-analyze calendar tool can still help you
understand the structure of the calendar time expressions used by systemd timers. I
recommend reading the systemd.time(7) man page for a better understanding of the
time formats that can be used with systemd timers.
Why would using a statement like OnCalendar=tomorrow fail when used in a timer?

85

Timestamps
Whereas calendar times can be used to match single or multiple points in time, timestamps
unambiguously represent a single point in time. For example, timestamps in the systemd
journal refer to a precise moment when each logged event occurs:
$ journalctl -S today
Hint: You are currently not seeing messages from other users and the system.
Users in groups 'adm', 'systemd-journal', 'wheel' can see all messages.
Pass -q to turn off this notice.
-- Logs begin at Wed 2020-06-17 10:08:41 EDT, end at Wed 2020-06-17 10:13:55 EDT.
-Jun 17 10:08:41 testvm1.both.org systemd[1137785]: Started Mark boot as
successful after the user session has run 2 minutes.
Jun 17 10:08:41 testvm1.both.org systemd[1137785]: Started Daily Cleanup of
User's Temporary Directories.
Jun 17 10:08:41 testvm1.both.org systemd[1137785]: Reached target Paths.
Jun 17 10:08:41 testvm1.both.org systemd[1137785]: Reached target Timers.
Jun 17 10:13:55 testvm1.both.org systemd[1137785]: systemd-tmpfilesclean.service: Succeeded.
Jun 17 10:13:55 testvm1.both.org systemd[1137785]: Finished Cleanup of User's
Temporary Files and Directories.

The systemd-analyze timestamp command can be used to analyze timestamp
expressions the same way it analyzes calendar expressions. Here is an example from the
journal data stream:
$ systemd-analyze timestamp "Jun 17 10:08:41"
Failed to parse "Jun 17 10:08:41": Invalid argument
[student@testvm1 ~]$ systemd-analyze timestamp Jun 17 10:08:41
Failed to parse "Jun": Invalid argument
Failed to parse "17": Invalid argument
Hint: this expression is a valid timespan. Use 'systemd-analyze timespan "17"'
instead?
Original form: 10:08:41
Normalized form: Wed 2020-06-17 10:08:41 EDT
(in UTC): Wed 2020-06-17 14:08:41 UTC
UNIX seconds: @1592402921
From now: 11min ago

Why is the data copied from the journal not considered to be a valid timestamp? I have no
idea. It seems pretty dumb to print the timestamps for the journal in a format that cannot be

86

used by the tool designed to analyze timestamps. But look at the time specified as the
beginning of the log:
$ systemd-analyze timestamp "Wed 2020-06-17 10:08:41"
Original form: Wed 2020-06-17 10:08:41
Normalized form: Wed 2020-06-17 10:08:41 EDT
(in UTC): Wed 2020-06-17 14:08:41 UTC
UNIX seconds: @1592402921
From now: 15min ago

OK, so that time is a valid timestamp. The key is that the systemd-analyze tool only
recognizes the DOW YYYY-MM-DD HH:MM:SS format. As the error messages state, it does
not recognize month names or standalone days of the month, such as 17. It is very exacting
because the only way to ensure events are triggered by timers at desired points in time or
intervals is to be completely accurate with how they are specified.
Any unambiguously expressed time, such as 2020-06-17 10:08:41, is a timestamp
because it can only occur once. A timestamp that will occur in the future can also be used in a
systemd timer, and that timer will only trigger its defined action once.
A time expressed somewhat more ambiguously, such as 2025-*-* 22:15:00, can only be a
calendar time used in the OnCalendar statement in a timer unit file. This expression will
trigger an event every day in the year 2025 at 22:15:00 (10:15:00pm).
But still—why not use valid timestamps in the journal output? I still don't know, but with a bit of
command-line manipulation, you can convert the default time display into valid timestamps.
The journalctl command tool has some options that can display the timestamps in a
format you can easily use with the systemd-analyze tool:
Fri 2020-06-26 12:51:36 EDT testvm1.both.org systemd[1]: Finished Update UTMP
about System Runlevel Changes.
Fri 2020-06-26 12:51:36 EDT testvm1.both.org systemd[1]: Startup finished in
2.265s (kernel) + 4.883s (initrd) + 22.645s (userspace) = 29.793s.
Fri 2020-06-26 12:51:36 EDT testvm1.both.org audit[1]: SERVICE_START pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=systemd-update-utmp-runlevel>
Fri 2020-06-26 12:51:36 EDT testvm1.both.org audit[1]: SERVICE_STOP pid=1 uid=0
auid=4294967295 ses=4294967295 msg='unit=systemd-update-utmp-runlevel >
Fri 2020-06-26 12:51:36 EDT testvm1.both.org crond[959]: (CRON) INFO (running
with inotify support)
Fri 2020-06-26 12:51:36 EDT testvm1.both.org ModemManager[759]: <info> Couldn't
check support for device '/sys/devices/pci0000:00/0000:00:03.0': not >
Fri 2020-06-26 12:51:37 EDT testvm1.both.org VBoxService[804]: 16:51:37.196960
timesync vgsvcTimeSyncWorker: Radical guest time change: -14 388 436 32>

87

## Fri 2020-06-26 12:51:39 EDT testvm1.both.org chronyd[827]: Selected source
192.168.0.52
Fri 2020-06-26 12:51:39 EDT testvm1.both.org chronyd[827]: System clock TAI
offset set to 37 seconds

You can now use the timestamps like this:
Original form: 2020-06-26 12:51:36
Normalized form: Fri 2020-06-26 12:51:36 EDT
(in UTC): Fri 2020-06-26 16:51:36 UTC
UNIX seconds: @1593190296
From now: 2h 37min ago

You can also display the journal timestamps in a monotonic format that shows the number of
seconds since boot:
0.000000] testvm1.both.org kernel: Linux version 5.6.6-300.fc32.x86_64
(mockbuild@bkernel03.phx2.fedoraproject.org) (gcc version 10.0.1 20200328 >
0.000000] testvm1.both.org kernel: Command line:
BOOT_IMAGE=(hd0,msdos1)/vmlinuz-5.6.6-300.fc32.x86_64 root=/dev/mapper/VG01-root
ro resume=/dev/>
0.000000] testvm1.both.org kernel: x86/fpu: Supporting XSAVE feature 0x001:
0.000000] testvm1.both.org kernel: x86/fpu: xstate_offset[2]: 576,
xstate_sizes[2]: 256
0.000000] testvm1.both.org kernel: x86/fpu: Enabled xstate features 0x7,
context size is 832 bytes, using 'standard' format.
0.000000] testvm1.both.org kernel: BIOS-provided physical RAM map:
0.000000] testvm1.both.org kernel: BIOS-e820: [mem 0x00000000000000000x000000000009fbff] usable
0.000000] testvm1.both.org kernel: BIOS-e820: [mem 0x000000000009fc000x000000000009ffff] reserved
[29337.443404] testvm1.both.org systemd[1]: sysstat-collect.service: Succeeded.
[29337.443504] testvm1.both.org systemd[1]: Finished system activity accounting
tool.
[29394.784506] testvm1.both.org CROND[2253]: (root) CMD (run-parts
/etc/cron.hourly)
[29394.792113] testvm1.both.org run-parts[2256]: (/etc/cron.hourly) starting
0anacron
[29394.799468] testvm1.both.org run-parts[2262]: (/etc/cron.hourly) finished
0anacron

88

Read the journalctl man page for a complete list of the timestamp format options (among
other things).

Timespans
Timespans are primarily used in systemd timers to define a specific span of time between
events. This could be used to trigger events so that they occur a specified amount of time
after system startup or after a previous instance of the same event. For example, here is a
sample expression in the timer unit file to trigger an event 32 minutes after system startup:
OnStartupSec=32m

The default accuracy for triggering systemd timers is a time window starting at the specified
time and lasting one minute. You can increase trigger timespan accuracy to within a
microsecond by adding a statement like the following to the Timer section of the timer-unit
file:
AccuracySec=1us

## The systemd-analyze timespan command can help ensure you are using a valid
timespan in the unit file. These samples will get you started:
$ systemd-analyze timespan 15days
Original: 15days
μs: 1296000000000
Human: 2w 1d
[student@testvm1 ~]$ systemd-analyze timespan "15days 6h 32m"
Original: 15days 6h 32m
μs: 1319520000000
Human: 2w 1d 6h 32min

Experiment with these and some of your own:
- "255days 6h 31m"
- "255days 6h 31m 24.568ms"

Timespans are used to schedule timer events a specified interval after a defined event such
as startup. Calendar timestamps can be used to schedule timer events on specific calendar
days and times, either as one-offs or repeating. Timestamps are also used on systemd journal

89

entries, although not in a default format that can be used directly in tools like systemdanalyze.
All of this was more than just a little confusing to me when I started working with systemd
timers and creating calendar and timestamp expressions to trigger events. That was partly
because of the similar—but not quite identical—formats used for specifying timestamps and
calendar event trigger times. I hope that this has helped to clarify all of this for you.

90

## Using systemd journals to
troubleshoot transient problems
Problem determination can be as much an art as a science, and sometimes, it seems even a
little magic can be useful. Everyone has encountered situations where a reported failure could
not be reproduced, which is always frustrating for both the user and the system administrator.
Even home appliances and automobiles can be obstinate and refuse to fail when the service
person shows up.
Anthropomorphism aside, sysadmins have some tools that can show what has been
happening in their Linux computers with varying degrees of granularity. There are tools, like
top, htop, glances, sar, iotop, tcpdump, traceroute, mtr, iptraf-ng, df, du, and many more, all of
which can display a host's current state, and several of which can produce logs of various
levels of detail.
While these tools can be used to find ongoing problems, they are not particularly helpful for
transient problems or those with no directly observable symptoms—not observable, at least,
until some major and possibly catastrophic problem occurs.
An important tool I use for problem determination is the system logs—and with systemd, the
system journals. The systemd journal is always one of the first tools I turn to when solving a
problem, especially the problems that don't seem to happen when I am watching. It took me a
long time at the beginning of my sysadmin career to realize the wealth of information in the
log files, and this discovery greatly improved my speed in resolving problems.
In this chapter, I explore some details about the systemd journal, how it works, and ways to use
journalctl to locate and identify problems.

91

About journals
The purpose of any log or journal is to maintain a time-sequenced history of the normal
activities of the services and programs that run on a host and to record any errors or warning
messages that occur. The log messages used to be maintained in separate files in /var/log,
usually one file for the kernel and separate ones for most of the services running on the host.
Unfortunately, the large number of log files could spread out necessary information and delay
the discovery of a problem's root cause. This could be especially time-consuming when you're
trying to determine what was happening in a system when an error occurred.
The old /var/log/dmesg file was usually used for the kernel, but that file was discontinued
several years ago in favor of using the dmesg command to display the same information and
integrating those messages (and more) into the /var/log/messages file. This merger of
other logs into the messages file helped speed problem determination by keeping much of
the data in one file, but there were still many services whose logs were not integrated into the
more central messages file.
The systemd journal is designed to collect all messages into a single, unified structure that
can show a complete picture of everything that happened in a system at and around a specific
time or event. Because the events, regardless of the source, are in one place and in time
sequence, it is possible to see at a glance everything happening at a specific point or range of
times. In my opinion, this is one of the main benefits of systemd journaling.
