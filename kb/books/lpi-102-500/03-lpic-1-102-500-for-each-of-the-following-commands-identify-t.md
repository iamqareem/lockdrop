---
id: lpi-102-500-03
title: "LPIC-1 · 102-500 — For each of the following commands, identify the corresponding…",
slug: lpi-102-500-03-lpic-1-102-500-for-each-of-the-following-commands-identify-t
source: "LPI Learning Material — LPIC-1 (Exam 102-500)",
sourceSection: "1. For each of the following commands, identify the corresponding purpose:, 1. Using the groupadd command, create the administrators and developers groups. Assume, 2. Now that you have created these groups, run the following command: useradd -G, 3. Create a new group named designers, rename it to we"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "The following files and commands were discussed in this lesson: Covers 56 sections: For each of the following commands, identify the corresponding purpose:, Using the groupadd command, create the administ.",
---
# LPIC-1 · 102-500 — For each of the following commands, identify the corresponding…

## 3. Create a new group named designers, rename it to web-designers and add this new group
to the secondary groups of the kevin user account. Identify all the groups kevin belongs to
and their IDs.

4. Remove only the developers group from the secondary groups of kevin.

5. Set the password for the kevin user account.

## 6. Using the chage command, first check the expiry date of the kevin user account and then
change it to December 31st 2022. What other command can you use to change the expiration
date of a user account?

## 7. Add a new user account named emma with UID 1050 and set administrators as its primary
group and developers and web-designers as its secondary groups.

8. Change the login shell of emma to /bin/sh.

9. Delete the emma and kevin user accounts and the administrators, developers and webdesigners groups.

178

- The fundamentals of user and group management in Linux.
- How to add, modify and remove user accounts.
- How to add, modify and remove group accounts.
- Maintain the skeleton directory.
- Edit the file that controls the creation of users and groups.
- Change the passwords of user accounts.
- Change the password aging information of user accounts.
The following files and commands were discussed in this lesson:
useradd
Create a new user account.
usermod
Modify a user account.
userdel
Delete a user account.
groupadd
Create a new group account.
groupmod
Modify a group account.
groupdel
Delete a group account.
passwd
Change the password of user accounts and control all aspects of password aging.
chage
Change user password expiry information.

179

/etc/skel
The default location of the skeleton directory.
/etc/login.defs
The file that controls the creation of users and groups and provides default values for several
user account parameters.

180

## 1. For each of the following commands, identify the corresponding purpose:
usermod -L

Lock the user account

passwd -u

Unlock the user account

chage -E

Set the expiration date for the user account

groupdel

Delete the group

useradd -s

Create a new user account with a specific login
shell

groupadd -g

Create a new group with a specific GID

userdel -r

Remove the user account and all files in its
home directory, the home directory itself and
the user’s mail spool

usermod -l

Change the login name of the user account

groupmod -n

Change the name of the group

useradd -m

Create a new user account and its home
directory

## 2. For each of the following passwd commands, identify the corresponding chage command:
passwd -n

chage -m

passwd -x

chage -M

passwd -w

chage -W

passwd -i

chage -I

passwd -S

chage -l

## 3. Explain in detail the purpose of the commands in the previous question:
In Linux, you can use the passwd -n command (or chage -m) to set the minimum number of
days between password changes, the passwd -x command (or chage -M) to set the maximum
number of days during which a password is valid, the passwd -w command (or chage -W) to
set the number of days of warning before the password expires, the passwd -i command (or
chage -I) to set the number of days of inactivity during which the user should change the
password and the passwd -S command (or chage -l) to show brief information about the

181

password of the user account.
4. What commands can you use to lock a user account? And which commands to unlock it?
If you want to lock an user account, you can use one of these commands: usermod -L,
usermod --lock and passwd -l. Instead, if you want to unlock it, you can use usermod -U,
usermod --unlock and passwd -u.

182

## 1. Using the groupadd command, create the administrators and developers groups. Assume
you are working as root.

## 2. Now that you have created these groups, run the following command: useradd -G
administrators,developers kevin. What operations does this command perform? Assume
that CREATE_HOME and USERGROUPS_ENAB in /etc/login.defs are set to yes.
The command adds a new user, named kevin, to the list of users in the system, creates its
home directory (CREATE_HOME is set to yes and therefore you can omit the -m option) and
creates a new group, named kevin, as the primary group of this user account
(USERGROUPS_ENAB is set to yes). Finally, the files and folders contained in the skeleton
directory are copied to the home dir of kevin.
3. Create a new group named designers, rename it to web-designers and add this new group
to the secondary groups of the kevin user account. Identify all the groups kevin belongs to
and their IDs.
uid=1010(kevin) gid=1030(kevin)
groups=1030(kevin),1028(administrators),1029(developers),1031(web-designers)

## 4. Remove only the developers group from the secondary groups of kevin.
uid=1010(kevin) gid=1030(kevin) groups=1030(kevin),1028(administrators),1031(webdesigners)

The usermod command does not have an option to remove only one group; therefore, you need
to specify all the secondary groups to which the user belongs.
5. Set the password for the kevin user account.

183

Changing password for user kevin.
New UNIX password:
Retype new UNIX password:
passwd: all authentication tokens updated successfully.

## 6. Using the chage command, first check the expiry date of the kevin user account and then
change it to December 31st 2022. What other command can you use to change the expiration
date of a user account?

: dec 31, 2022

The usermod command with the -e option is equivalent to chage -E.
7. Add a new user account named emma with UID 1050 and set administrators as its primary
group and developers and web-designers as its secondary groups.
uid=1050(emma) gid=1028(administrators)
groups=1028(administrators),1029(developers),1031(web-designers)

## 8. Change the login shell of emma to /bin/sh.

9. Delete the emma and kevin user accounts and the administrators, developers and webdesigners groups.

184

### 107.1 Lesson 2

### 107.1 Manage user and group accounts and
related system files

The command line tools discussed in the previous lesson and the graphical applications provided
by each distribution that perform the same tasks update a series of files that store information
about users and groups.
These files are located under the /etc/ directory and are:
/etc/passwd
A file of seven colon-delimited fields containing basic information about users.
/etc/group
A file of four colon-delimited fields containing basic information about groups.
/etc/shadow
A file of nine colon-delimited fields containing encrypted user passwords.

185

/etc/gshadow
A file of four colon-delimited fields file containing encrypted group passwords.
Although these four files are in plain text, they should not be edited directly, but always through
the tools provided by the distribution you are using.

/etc/passwd
This is a world-readable file that contains a list of users, each on a separate line. Each line consists
of seven colon-delimited fields:
Username
The name used when the user logs into the system.
Password
The encrypted password (or an x if shadow passwords are used).
User ID (UID)
The ID number assigned to the user in the system.
Group ID (GID)
The primary group number of the user in the system.
GECOS
An optional comment field, which is used to add extra information about the user (such as the
full name). The field can contain multiple comma-separated entries.
Home Directory
The absolute path of the user’s home directory.
Shell
The absolute path of the program that is automatically launched when the user logs into the
system (usually an interactive shell such as /bin/bash).

/etc/group
This is a world-readable file that contains a list of groups, each on a separate line. Each line
consists of four colon-delimited fields:

186

Group Name
The name of the group.
Group Password
The encrypted password of the group (or an x if shadow passwords are used).
Group ID (GID)
The ID number assigned to the group in the system.
Member List
A comma-delimited list of users belonging to the group, except those for whom this is the
primary group.

/etc/shadow
This is a file readable only by root and by users with root privileges that contains encrypted user
passwords, each on a separate line. Each line consists of nine colon-delimited fields:
Username
The name used when the user logs into the system.
Encrypted Password
The encrypted password of the user (if the value starts with !, the account is locked).
Date of Last Password Change
The date of the last password change, as number of days since 01/01/1970 (a value of 0 means
that the user must change the password when they next login).
Minimum Password Age
The minimum number of days, after a password change, which must pass before the user will
be allowed to change the password again.
Maximum Password Age
The maximum number of days that must pass before a password change is required.
Password Warning Period
The number of days, before the password expires, during which the user is warned that the
password must be changed.

187

Password Inactivity Period
The number of days after a password expires during which the user should update the
password. After this period, if the user does not change the password, the account will be
disabled.
Account Expiration Date
The date, expressed as the number of days since 01/01/1970, in which the user account will be
disabled (an empty field means that the user account will never expire).
A reserved field
A field that is reserved for future use.

/etc/gshadow
This is a file readable only by root and by users with root privileges that contains encrypted group
passwords, each on a separate line. Each line consists of four colon-delimited fields:
Group Name
The name of the group.
Encrypted Password
The encrypted password for the group (it is used when a user, who is not a member of the
group, wants to join the group using the newgrp command — if the password starts with !, no
one is allowed to access the group with newgrp).
Group Administrators
A comma-delimited list of the administrators of the group (they can change the password of the
group and can add or remove group members with the gpasswd command).
Group Members
A comma-delimited list of the members of the group.

Filter the Password and Group Databases
Very often it may be necessary to review information on users and groups stored in these four
files and search for specific records. To perform this task, you can use the grep command or
alternatively concatenate cat and grep.
emma:x:1020:1020:User Emma:/home/emma:/bin/bash

188

db-admin:x:1050:grace,frank

Another way to access these databases is to use the getent command. In general, this command
displays entries from databases supported by the Name Service Switch (NSS) libraries and requires
the name of the database and a lookup key. If no key argument is provided, all entries in the
specified database are displayed (unless the database does not support enumeration). Otherwise,
if one or more key arguments are provided, the database is filtered accordingly.
emma:x:1020:1020:User Emma:/home/emma:/bin/bash
db-admin:x:1050:grace,frank

The getent command does not require root authority; you just need to be able to read the
database from which you want to retrieve records.

Remember that getent
/etc/nsswitch.conf file.

can

only

access

databases

configured

in

189

## 1. Observe the following output and answer the following questions:
root:x:0:0:root:/root:/bin/bash
mail:x:8:8:mail:/var/spool/mail:/sbin/nologin
catherine:x:1030:1025:User Chaterine:/home/catherine:/bin/bash
kevin:x:1040:1015:User Kevin:/home/kevin:/bin/bash
root:x:0:
mail:x:8:
db-admin:x:1015:emma,grace
app-developer:x:1016:catherine,dave,christian
root:$6$1u36Ipok$ljt8ooPMLewAhkQPf.lYgGopAB.jClTO6ljsdczxvkLPkpi/amgp.zyfAN680zrLLp2avvpd
KA0llpssdfcPppOp:18015:0:99999:7:::
mail:*:18015:0:99999:7:::
catherine:$6$ABCD25jlld14hpPthEFGnnssEWw1234yioMpliABCdef1f3478kAfhhAfgbAMjY1/BAeeAsl/FeE
dddKd12345g6kPACcik:18015:20:90:5:::
kevin:$6$DEFGabc123WrLp223fsvp0ddx3dbA7pPPc4LMaa123u6Lp02Lpvm123456pyphhh5ps012vbArL245.P
R1345kkA3Gas12P:18015:0:60:7:2::
root:*::
mail:*::
db-admin:!:emma:emma,grace
app-developer:!::catherine,dave,christian

- What is the User ID (UID) and the Group ID (GID) of root and catherine?

- What is the name of the primary group of kevin? Are there other members in this group?

- Which shell is set for mail? What does it mean?

- Who are the members of the app-developer group? Which of these members are group
administrators and which are ordinary members?

190

- What is the minimum password lifetime for catherine? And what is the maximum
password lifetime?

- What is the password inactivity period for kevin?

2. By convention, which IDs are assigned to system accounts and which to ordinary users?

## 3. How do you find out if a user account, which was previously able to access the system, is now
locked? Assume your system uses shadow passwords.

191

## 1. Create a user account named christian using the useradd -m command and identify its User
ID (UID), Group ID (GID) and shell.

2. Identify the name of the primary group of christian. What can you deduce?

## 3. Using the getent command, review password aging information for the christian user
account.

## 4. Add the editor group to the secondary groups of christian. Assume that this group already
contains emma, dave and frank as ordinary members. How can you verify that there are no
administrators for this group?

## 5. Run the ls -l /etc/passwd /etc/group /etc/shadow /etc/gshadow command and
describe the output that it gives you in terms of file permissions. Which of these four files are
shadowed for security reasons? Assume your system uses shadow passwords.

192

- The location of files that store information about users and groups.
- Manage user and group information stored in password and group databases.
- Retrieve information from password and group databases.
The following files and commands were discussed in this lesson:
/etc/passwd
The file containing basic information about users.
/etc/group
The file containing basic information about groups.
/etc/shadow
The file containing encrypted user passwords.
/etc/gshadow
The file containing encrypted group passwords.
getent
Filter the password and group databases.

193

## 1. Observe the following output and answer the following questions:
root:x:0:0:root:/root:/bin/bash
mail:x:8:8:mail:/var/spool/mail:/sbin/nologin
catherine:x:1030:1025:User Chaterine:/home/catherine:/bin/bash
kevin:x:1040:1015:User Kevin:/home/kevin:/bin/bash
root:x:0:
mail:x:8:
db-admin:x:1015:emma,grace
app-developer:x:1016:catherine,dave,christian
root:$6$1u36Ipok$ljt8ooPMLewAhkQPf.lYgGopAB.jClTO6ljsdczxvkLPkpi/amgp.zyfAN680zrLLp2avvpd
KA0llpssdfcPppOp:18015:0:99999:7:::
mail:*:18015:0:99999:7:::
catherine:$6$ABCD25jlld14hpPthEFGnnssEWw1234yioMpliABCdef1f3478kAfhhAfgbAMjY1/BAeeAsl/FeE
dddKd12345g6kPACcik:18015:20:90:5:::
kevin:$6$DEFGabc123WrLp223fsvp0ddx3dbA7pPPc4LMaa123u6Lp02Lpvm123456pyphhh5ps012vbArL245.P
R1345kkA3Gas12P:18015:0:60:7:2::
root:*::
mail:*::
db-admin:!:emma:emma,grace
app-developer:!::catherine,dave,christian

- What is the User ID (UID) and the Group ID (GID) of root and catherine?
The UID and GID of root are 0 and 0, while the UID and GID of catherine are 1030 and
1025.
- What is the name of the primary group of kevin? Are there other members in this group?
The group name is db-admin. Also emma and grace are in this group.
- Which shell is set for mail? What does it mean?
mail is a system user account and its shell is /sbin/nologin. In fact, system user accounts
such as mail, ftp, news and daemon are used to perform administrative tasks and therefore
normal login should be prevented for these accounts. This is why the shell is usually set to

194

/sbin/nologin or /bin/false.
- What are the members of the app-developer group? Which of these are group
administrators and which are ordinary members?
The members are catherine, dave and christian and they are all ordinary members.
- What is the minimum password lifetime for catherine? And what is the maximum
password lifetime?
The minimum password lifetime is 20 days, while the maximum password lifetime is 90
days.
- What is the password inactivity period for kevin?
The password inactivity period is 2 days. During this period kevin should update the
password, otherwise the account will be disabled.
2. By convention, which IDs are assigned to system accounts and which to ordinary users?
System accounts usually have UIDs less than 100 or between 500 and 1000, while ordinary
users have UIDs starting at 1000 although some legacy systems may start numbering at 500.
The root user has UID 0. Remember that the UID_MIN and UID_MAX values in
/etc/login.defs define the range of UIDs used for the creation of ordinary users. From the
standpoint of LPI Linux Essentials and LPIC-1, system accounts have UIDs less than 1000 and
ordinary users have UIDs greater than 1000.
3. How do you find out if a user account, which was previously able to access the system, is now
locked? Assume your system uses shadow passwords.
When shadow passwords are used, the second field in /etc/passwd contains the x character
for each user account, because the encrypted user passwords are stored in /etc/shadow. In
particular, the encrypted password of a user account is stored in the second field of this file
and, if it starts with an exclamation mark, the account is locked.

195

## 1. Create a user account named christian using the useradd -m command and identify its User
ID (UID), Group ID (GID) and shell.
christian:x:1050:1060::/home/christian:/bin/bash

The UID and GID of christian are 1050 and 1060 respectively (the third and fourth fields in
/etc/passwd). /bin/bash is the shell set for this user account (the seventh field in
/etc/passwd).
2. Identify the name of the primary group of christian. What can you deduce?
christian:x:1060:

The name of the primary group of christian is christian (the first field in /etc/group).
Therefore, USERGROUPS_ENAB in /etc/login.defs is set to yes so that useradd creates by
default a group with the same name of the user account.
3. Using the getent command, review password aging information for the christian user
account.
christian:!:18015:0:99999:7:::

The christian user account does not have the password set and is now locked (the second
field in /etc/shadow contains an exclamation mark). There is no minimum and maximum
password age for this user account (the fourth and fifth fields in /etc/shadow are set to 0 and
99999 days), while the password warning period is set to 7 days (the sixth field in
/etc/shadow). Finally, there is no inactivity period (the seventh field in /etc/shadow) and the
account never expires (the eighth field in /etc/shadow).
4. Add the editor group to the secondary groups of christian. Assume that this group already
contains emma, dave and frank as ordinary members. How can you verify that there are no
administrators for this group?

196

editor:x:1100:emma,dave,frank
editor:x:1100:emma,dave,frank,christian
editor:!::emma,dave,frank,christian

The third and fourth fields in /etc/ghadow contain administrators and ordinary members for
the specified group. Therefore, since the third field is empty for editor, there are no
administrators for this group (emma, dave, frank and christian are all ordinary members).
5. Run the ls -l /etc/passwd /etc/group /etc/shadow /etc/gshadow command and
describe the output that it gives you in terms of file permissions. Which of these four files are
shadowed for security reasons? Assume your system uses shadow passwords.

853 mag

1 08:00 /etc/group

-rw-r----- 1 root shadow 1203 mag

1 08:00 /etc/gshadow

1354 mag

1 08:00 /etc/passwd

-rw-r----- 1 root shadow 1563 mag

1 08:00 /etc/shadow

The /etc/passwd and /etc/group files are world readable and are shadowed for security
reasons. When shadow passwords are used, you can see an x in the second field of these files,
because the encrypted passwords for users and groups are stored in /etc/shadow and
/etc/gshadow, which are readable only by root and, in my system, even by members
belonging to the shadow group.

197

### 107.2 Automate system administration tasks by scheduling jobs
LPIC-1 version 5.0, Exam 102, Objective 107.2
- Manage cron and at jobs.
- Configure user access to cron and at services.
- Understand systemd timer units.
- /etc/cron.{d,daily,hourly,monthly,weekly}/
- /etc/at.deny
- /etc/at.allow
- /etc/crontab
- /etc/cron.allow
- /etc/cron.deny
- /var/spool/cron/
- crontab
- at
- atq
- atrm

198

- systemctl
- systemd-run

199

### 107.2 Lesson 1

### 107.2 Automate system administration tasks by
scheduling jobs

One of the most important tasks of a good system administrator is to schedule jobs that must be
executed on a regular basis. For example, an administrator can create and automate jobs for
backups, system upgrades and to perform many other repetitive activities. To do this you can use
the cron facility, which is useful to automate periodic job scheduling.

Schedule Jobs with Cron
In Linux, cron is a daemon that runs continuously and wakes up every minute to check a set of
tables to find tasks to execute. These tables are known as crontabs and contain the so-called cron
jobs. Cron is suitable for servers and systems that are constantly powered on, because each cron
job is executed only if the system is running at the scheduled time. It can be used by ordinary
users, each of whom has their own crontab, as well as the root user who manages the system
crontabs.

200

In Linux there is also the anacron facility, which is suitable for systems that can be
powered off (such as desktops or laptops). It can only be used by root. If the

machine is off when the anacron jobs must be executed, they will run the next
time the machine is powered on. anacron is out of scope for the LPIC-1
certification.

User Crontabs
User crontabs are text files that manage the scheduling of user-defined cron jobs. They are always
named after the user account that created them, but the location of these files depends on the
distribution used (generally a subdirectory of /var/spool/cron).
Each line in a user crontab contains six fields separated by a space:
- The minute of the hour (0-59).
- The hour of the day (0-23).
- The day of the month (1-31).
- The month of the year (1-12).
- The day of the week (0-7 with Sunday=0 or Sunday=7).
- The command to run.
For the month of the year and the day of the week you can use the first three letters of the name
instead of the corresponding number.
The first five fields indicate when to execute the command that is specified in the sixth field, and
they can contain one or more values. In particular, you can specify multiple values using:
- (asterisk)
Refers to any value.
, (comma)
Specifies a list of possible values.
- (dash)
Specifies a range of possible values.
/ (slash)
Specifies stepped values.
Many distributions include the /etc/crontab file which can be used as a reference for the layout
of a cron file. Here is an example /etc/crontab file from a Debian installation:

201

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

.------------- hour (0 - 23)

.---------- day of month (1 - 31)

.------- month (1 - 12) OR jan,feb,mar,apr ...

.---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat

*

*

*

- user-name command to be executed

System Crontabs
System crontabs are text files that manage the scheduling of system cron jobs and can only be
edited by the root user. /etc/crontab and all files in the /etc/cron.d directory are system
crontabs.
Most distributions also include the /etc/cron.hourly, /etc/cron.daily, /etc/cron.weekly
and /etc/cron.monthly directories that contain scripts to be run with the appropriate
frequency. For example, if you want to run a script daily you can place it in /etc/cron.daily.

Some distributions use /etc/cron.d/hourly, /etc/cron.d/daily,
/etc/cron.d/weekly and /etc/cron.d/monthly. Always remember to
check for the correct directories in which to place scripts you would like cron
to run.

The syntax of system crontabs is similar to that of user crontabs, however it also requires an
additional mandatory field that specifies which user will run the cron job. Therefore, each line in
a system crontab contains seven fields separated by a space:
- The minute of the hour (0-59).
- The hour of the day (0-23).
- The day of the month (1-31).
- The month of the year (1-12).
- The day of the week (0-7 with Sunday=0 or Sunday=7).
- The name of the user account to be used when executing the command.
- The command to run.

202

As for user crontabs, you can specify multiple values for the time fields using the *, , , - and /
operators. You may also indicate the month of the year and the day of the week with the first
three letters of the name instead of the corresponding number.

Particular Time Specifications
When editing crontab files, you can also use special shortcuts in the first five columns instead of
the time specifications:
@reboot
Run the specified task once after reboot.
@hourly
Run the specified task once an hour at the beginning of the hour.
@daily (or @midnight)
Run the specified task once a day at midnight.
@weekly
Run the specified task once a week at midnight on Sunday.
@monthly
Run the specified task once a month at midnight on the first day of the month.
@yearly (or @annually)
Run the specified task once a year at midnight on the 1st of January.

Crontab Variables
Within a crontab file, there are sometimes variable assignments defined before the scheduled
tasks are declared. The environment variables commonly set are:
HOME
The directory where cron invokes the commands (by default the user’s home directory).
MAILTO
The name of the user or the address to which the standard output and error is mailed (by
default the crontab owner). Multiple comma-separated values are also allowed and an empty
value indicates that no mail should be sent.

203

PATH
The path where commands can be found.
SHELL
The shell to use (by default /bin/sh).

Creating User Cron Jobs
The crontab command is used to maintain crontab files for individual users. In particular, you
can run the crontab -e command to edit your own crontab file or to create one if it doesn’t
already exist.
$ crontab -e
no crontab for frank - using an empty one
Select an editor.

To change later, run 'select-editor'.

1. /bin/ed
2. /bin/nano

< ‑‑‑‑ easiest

3. /usr/bin/emacs24
4. /usr/bin/vim.tiny
Choose 1-4 [2]:

By default, the crontab command opens the editor specified by the VISUAL or EDITOR
environment variables so you can start editing your crontab file with the preferred editor. Some
distributions, as shown in the example above, allow you to choose the editor from a list when
crontab is run for the first time.
If you want to run the foo.sh script located in your home directory every day at 10:00 am, you
can add the following line to your crontab file:
0 10 * * * /home/frank/foo.sh

Consider the following sample crontab entries:
0,15,30,45 08 * * 2 /home/frank/bar.sh
30 20 1-15 1,6 1-5 /home/frank/foobar.sh

In the first line the bar.sh script is executed every Tuesday at 08:00 am, at 08:15 am, at 08:30 am

204

and at 08:45 am. On the second line the foobar.sh script is executed at 08:30 pm from Monday to
Friday for the first fifteen days of January and June.

Although crontab files can be edited manually, it is always recommended to
use the crontab command. The permissions on the crontab files usually only
allow them to be edited via the crontab command.

In addition to the -e option mentioned above, the crontab command has other useful options:
Display the current crontab on standard output.
-r
Remove the current crontab.
Specify the name of the user whose crontab needs to be modified. This option requires root
privileges and allows the root user to edit user crontab files.

Creating System Cron Jobs
Unlike user crontabs, system crontabs are updated using an editor: therefore, you do not need to
run the crontab command to edit /etc/crontab and the files in /etc/cron.d. Remember that
when editing system crontabs, you must specify the account that will be used to run the cron job
(usually the root user).
For example, if you want to run the barfoo.sh script located in the /root directory every day at
01:30 am, you can open /etc/crontab with your preferred editor and add the following line:
30 01 * * * root /root/barfoo.sh >>/root/output.log 2>>/root/error.log

In the above example, output of the job is appended to /root/output.log, while errors are
appended to /root/error.log.

Unless output is redirected to a file as in the example above (or the MAILTO
variable is set to a blank value), all output from a cron job will be sent to the
user via e-mail. A common practice is to redirect standard output to
/dev/null (or to a file for later review if necessary) and to not redirect
standard error. This way the user will be notified immediately by e-mail of
any errors.

205

Configure Access to Job Scheduling
In Linux the /etc/cron.allow and /etc/cron.deny files are used to set crontab restrictions.
In particular, they are used to allow or disallow the scheduling of cron jobs for different users. If
/etc/cron.allow exists, only non-root users listed within it can schedule cron jobs using the
crontab command. If /etc/cron.allow does not exist but /etc/cron.deny exists, only nonroot users listed within this file cannot schedule cron jobs using the crontab command (in this
case an empty /etc/cron.deny means that each user is allowed to schedule cron jobs with
crontab). If neither of these files exist, the user’s access to cron job scheduling depends on the
distribution used.

The /etc/cron.allow and /etc/cron.deny files contain of a list of usernames,
each on a separate line.

An Alternative to Cron
Using systemd as the system and service manager, you can set timers as an alternative to cron to
schedule your tasks. Timers are systemd unit files identified by the .timer suffix, and for each of
these there must be a corresponding unit file which describes the unit to be activated when the
timer elapses. By default, a timer activates a service with the same name, except for the suffix.
A timer includes a [Timer] section that specifies when scheduled jobs should run. Specifically,
you can use the OnCalendar= option to define real-time timers which work in the same way as
cron jobs (they are based on calendar event expressions). The OnCalendar= option requires the
following syntax:
DayOfWeek Year-Month-Day Hour:Minute:Second

with DayOfWeek being optional. The *, / and , operators have the same meaning as those used for
cron jobs, while you can use .. between two values to indicate a contiguous range. For
DayOfWeek specification, you can use the first three letters of the name or the full name.

You can also define monotonic timers that activate after some time has elapsed
from a specific start point (for example, when the machine was booted up or when
the timer itself is activated).

For example, if you want to run the service named /etc/systemd/system/foobar.service at
05:30 on the first Monday of each month, you can add the following lines in the corresponding
/etc/systemd/system/foobar.timer unit file.

206

[Unit]
Description=Run the foobar service
[Timer]
OnCalendar=Mon *-*-1..7 05:30:00
Persistent=true
[Install]
WantedBy=timers.target

Once you have created the new timer, you can enable it and start it by running the following
commands as root:

You can change the frequency of your scheduled job, modifying the OnCalendar value and then
typing the systemctl daemon-reload command.
Finally, if you want to view the list of active timers sorted by the time they elapse next, you can
use the systemctl list-timers command. You can add the --all option to see the inactive
timer units as well.

Remember that timers are logged to the systemd journal and you can review the
logs of the different units using the journalctl command. Also remember that if
you are acting as an ordinary user, you need to use the --user option of the
systemctl and journalctl commands.

Instead of the longer normalized form mentioned above, you can use some special expressions
which describe particular frequencies for job execution:
hourly
Run the specified task once an hour at the beginning of the hour.
daily
Run the specified task once a day at midnight.
Run the specified task once a week at midnight on Monday.

207

monthly
Run the specified task once a month at midnight on the first day of the month.
yearly
Run the specified task once a year at midnight on the first day of January.
You can see the manual pages for the full list of time and date specifications at
systemd.timer(5).

208

1. For each of the following crontab shortcuts, indicate the corresponding time specification (i.e.
the first five columns in a user crontab file):
@hourly
@daily
@weekly
@monthly
@annually
2. For each of the following OnCalendar shortcuts, indicate the corresponding time specification
(the longer normalized form):
hourly
daily
monthly
yearly
3. Explain the meaning of the following time specifications found in a crontab file:
30 13 * * 1-5
00 09-18 * * *
30 08 1 1 *
0,20,40 11 * * Sun
00 09 10-20 1-3 *
*/20 * * * *
4. Explain the meaning of the following time specifications used in the OnCalendar option of a
timer file:
*-*-* 08:30:00
Sat,Sun *-*-* 05:00:00

209

*-*-01 13:15,30,45:00
Fri *-09..12-* 16:20:00
Mon,Tue *-*-1,15 08:30:00
*-*-* *:00/05:00

210

## 1. Assuming that you are authorized to schedule jobs with cron as an ordinary user, what
command would you use to to create your own crontab file?

2. Create a simple scheduled job that executes the date command every Friday at 01:00 pm.
Where can you see the output of this job?

## 3. Create another scheduled job that executes the foobar.sh script every minute, redirecting the
output to the output.log file in your home directory so that only standard error is sent to you
by e-mail.

## 4. Look at the crontab entry of the newly created scheduled job. Why is it not necessary to
specify the absolute path of the file in which the standard output is saved? And why can you
use the ./foobar.sh command to execute the script?

## 5. Edit the previous crontab entry by removing the output redirection and disable the first cron
job you have created.

6. How can you send the output and errors of your scheduled job to the emma user account via email? And how can you avoid sending the standard output and error via e-mail?

## 7. Execute the command ls -l /usr/bin/crontab. Which special bit is set and what is its
meaning?

211

In this lesson, you learned:
- Use cron to run jobs at regular intervals.
- Manage cron jobs.
- Configure user access to cron job scheduling.
- Understand the role of systemd timer units as an alternative to cron.
The following commands and files were discussed in this lesson:
crontab
Maintain crontab files for individual users.
/etc/cron.allow and /etc/cron.deny
Particular files used to set crontab restrictions.
/etc/crontab
System crontab file.
/etc/cron.d
The directory that contains system crontab files.
Control the systemd system and service manager. In relation to timers, it can be used to enable
and start them.

212

## 1. For each of the following crontab shortcuts, indicate the corresponding time specification (the
first five columns in a crontab file):
@hourly

0 * * * *

@daily

0 0 * * *

@weekly

0 0 * * 0

@monthly

0 0 1 * *

@annually

0 0 1 1 *

## 2. For each of the following OnCalendar shortcuts, indicate the corresponding time specification
(the longer normalized form):
hourly

*-*-* *:00:00

daily

*-*-* 00:00:00

Mon *-*-* 00:00:00

monthly

*-*-01 00:00:00

yearly

*-01-01 00:00:00

## 3. Explain the meaning of the following time specifications for a crontab file:
30 13 * * 1-5

At 01:30 pm every day of the week from
Monday to Friday

00 09-18 * * *

Every day and every hour from 09 am to 06
pm

30 08 1 1 *

At 08:30 am on the first day of January

0,20,40 11 * * Sun

Every Sunday at 11:00 am, 11:20 am and 11:40
am

00 09 10-20 1-3 *

At 09:00 am from the 10th to the 20th of
January, February and March

*/20 * * * *

Every twenty minutes

## 4. Explain the meaning of the following time specifications used in the OnCalendar option of a
timer file:

213

214

*-*-* 08:30:00

Every day at 08:30 am

Sat,Sun *-*-* 05:00:00

At 05:00 am on Saturday and Sunday

*-*-01 13:15,30,45:00

At 01:15 pm, 01:30 pm and 01:45 pm on the
first day of the month

Fri *-09..12-* 16:20:00

At 04:20 pm every Friday in September,
October, November and December

Mon,Tue *-*-1,15 08:30:00

At 08.30 am on the first or fifteenth day of
each month only if the day is a Monday or
Tuesday

*-*-* *:00/05:00

Every five minutes

## 1. Assuming that you are authorized to schedule jobs with cron as an ordinary user, what
command would you use to to create your own crontab file?
dave@hostname ~ $ crontab -e
no crontab for dave - using an empty one
Select an editor.

To change later, run 'select-editor'.

1. /bin/ed
2. /bin/nano

< ---- easiest

3. /usr/bin/emacs24
4. /usr/bin/vim.tiny
Choose 1-4 [2]:

2. Create a simple scheduled job that executes the date command every Friday at 01:00 pm.
Where can you see the output of this job?
00 13 * * 5 date

The output is mailed to the user; to view it, you can use the mail command.
3. Create another scheduled job that executes the foobar.sh script every minute, redirecting the
output to the output.log file in your home directory so that only standard error is sent to you
by e-mail.
*/1 * * * * ./foobar.sh >> output.log

## 4. Look at the crontab entry of the newly created scheduled job. Why is it not necessary to
specify the absolute path of the file in which the standard output is saved? And why can you
use the ./foobar.sh command to execute the script?
cron invokes the commands from the user’s home directory, unless another location is
specified by the HOME environment variable within the crontab file. For this reason, you can
use the relative path of the output file and run the script with ./foobar.sh.
5. Edit the previous crontab entry by removing the output redirection and disable the first cron
job you have created.

215

#00 13 * * 5 date
*/1 * * * * ./foobar.sh

To disable a cron job, you can simply comment the corresponding line within the crontab file.
6. How can you send the output and errors of your scheduled job to the emma user account via email? And how can you avoid sending the standard output and error via e-mail?
To send the standard output and error to emma, you must set the MAILTO environment variable
in your crontab file as follows:
MAILTO="emma"

To tell cron that no mail should be sent, you can assign an empty value to the MAILTO
environment variable.
MAILTO=""

## 7. Execute the command ls -l /usr/bin/crontab. Which special bit is set and what is its
meaning?
$ ls -l /usr/bin/crontab
-rwxr-sr-x 1 root crontab 25104 feb 10

2015 /usr/bin/crontab

The crontab command has the SGID bit set (the s character instead of the executable flag for
the group), which means that it is executed with the privileges of the group (thus crontab).
This is why ordinary users can edit their crontab file using the crontab command. Note that
many distributions have file permissions set such that crontab files can only be edited via the
crontab command.

216

### 107.2 Lesson 2

### 107.2 Automate system administration tasks by
scheduling jobs

As you learned in the previous lesson, you can schedule regular jobs using cron or systemd timers,
but sometimes you may need to run a job at a specific time in the future only once. To do this, you
can use another powerful utility: the at command.

Schedule Jobs with at
The at command is used for one-time task scheduling and only requires that you specify when the
job should be run in the future. After entering at on the command line followed by the time
specification, you will enter the at prompt where you can define the commands to be executed.
You can exit the prompt with the Ctrl + D key-sequence.
$ at now +5 minutes
at> date

217

job 12 at Sat Sep 14 09:15:00 2019

The at job in the above example simply executes the date command after five minutes. Similar to
cron, the standard output and error is sent to you via e-mail. Note that the atd daemon will need
to be running on the system in order for you to use at job scheduling.

In Linux, the batch command is similar to at, however batch jobs are executed
only when the system load is low enough to allow it.

The most important options which apply to the at command are:
-c
Print the commands of a specific job ID to the standard output.
Delete jobs based on their job ID. It is an alias for atrm.
Read the job from a file instead of the standard input.
List the pending jobs of the user. If the user is root, all jobs of all users are listed. It is an alias
for atq.
Send mail to the user at the end of the job even if there was no output.
-q
Specify a queue in the form of a single letter from a to z and from A to Z (by default a for at
and b for batch). Jobs in the queues with the highest letters are executed with increased
niceness. Jobs submitted to a queue with a capital letter are treated as batch jobs.
-v
Show the time at which the job will run before reading the job.

List Scheduled Jobs with atq
Now let us schedule two more at jobs: the first executes the foo.sh script at 09:30 am, while the
second executes the bar.sh script after one hour.

218

$ at 09:30 AM
at> ./foo.sh
job 13 at Sat Sep 14 09:30:00 2019
$ at now +2 hours
at> ./bar.sh
job 14 at Sat Sep 14 11:10:00 2019

To list your pending jobs, you can use the atq command which shows the following information
for each job: job ID, job execution date, job execution time, queue, and username.
$ atq

Sat Sep

14 11:10:00 2019 a frank

Sat Sep

14 09:30:00 2019 a frank

Sat Sep

14 09:15:00 2019 a frank

Remember that the at -l command is an alias for atq.

If you run atq as root, it will display the queued jobs for all users.

Delete Jobs with atrm
If you want to delete an at job, you can use the atrm command followed by the job ID. For
example, to delete the job with ID 14, you can run the following:
$ atrm 14

You can delete multiple jobs with atrm by specifying multiple IDs separated by spaces. Remember
that the at -d command is an alias for atrm.

If you run atrm as root you can delete the jobs of all users.

Configure Access to Job Scheduling
Authorization for ordinary users to schedule at jobs is determined by the /etc/at.allow and
/etc/at.deny files. If /etc/at.allow exists, only non-root users listed within it can schedule at
jobs. If /etc/at.allow does not exist but /etc/at.deny exists, only non-root users listed within

219

it cannot schedule at jobs (in this case an empty /etc/at.deny file means that each user is
allowed to schedule at jobs). If neither of these files exist, the user’s access to at job scheduling
depends on the distribution used.

Time Specifications
You can specify when to execute a particular at job using the form HH:MM, optionally followed by
AM or PM in case of 12-hour format. If the specified time has already passed, the next day is
assumed. If you want to schedule a particular date on which the job will run, you must add the
date information after the time using one of the following forms: month-name day-of-month,
month-name day-of-month year, MMDDYY, MM/DD/YY, DD.MM.YY and YYYY-MM-DD).
The following keywords are also accepted: midnight, noon, teatime (4 pm) and now followed by
a plus sign (+) and a time period (minutes, hours, days and weeks). Finally, you can tell at to run
the job today or tomorrow by suffixing the time with the words today or tomorrow. For example,
you can use at 07:15 AM Jan 01 to execute a job at 07:15 am on 01 January and at now +5
minutes to execute a job five minutes from now. You can read the timespec file under the
/usr/share tree for more information about the exact definition of time specifications.

An Alternative to at
Using systemd as the system and service manager, you can also schedule one-time tasks with the
systemd-run command. It is typically used to create a transient timer unit so that a command
will be executed at a specific time without the need to create a service file. For example, acting as
root, you can run the date command at 11:30 AM on 2019/10/06 using the following:

If you want to run the foo.sh script, located in your current working directory, after two minutes
you can use:

Consult the manual pages to learn all possible uses of systemd-run with systemd-run(1).

220

Remember that timers are logged to the systemd journal and you can review the
logs of the different units using the journalctl command. Also remember that if
you are acting as an ordinary user, you need to use the --user option of the
systemd-run and journalctl commands.

## 1. For each of the following time specifications, indicate which is valid and which is invalid for
at:
at 08:30 AM next week
at midday
at 01-01-2020 07:30 PM
at 21:50 01.01.20
at now +4 days
at 10:15 PM 31/03/2021
at tomorrow 08:30 AM
2. Once you have scheduled a job with at, how can you review its commands?

## 3. Which commands can you use to review your pending at jobs? Which commands would you
use to delete them?

## 4. With systemd, which command is used as an alternative to at?

221

## 1. Create an at job that runs the foo.sh script, located in your home directory, at 10:30 am on
coming October 31st. Assume you are acting as an ordinary user.

## 2. Login to the system as another ordinary user and create another at job that runs the bar.sh
script tomorrow at 10:00 am. Assume the script is located in the user’s home directory.

## 3. Login to the system as another ordinary user and create another at job that runs the
foobar.sh script just after 30 minutes. Assume the script is located in the user’s home
directory.

## 4. Now as root, run the atq command to review the scheduled at jobs of all users. What happens
if an ordinary user executes this command?

5. As root, delete all these pending at jobs using a single command.

## 6. Run the ls -l /usr/bin/at command and examine its permissions.

222

In this lesson, you learned:
- Use at to run one-time jobs at a specific time.
- Manage at jobs.
- Configure user access to at job scheduling.
- Use systemd-run as an alternative to at.
The following commands and files were discussed in this lesson:
at
Execute commands at a specified time.
atq
List the user’s pending at jobs, unless the user is the superuser.
atrm
Delete at jobs, identified by their job number.
/etc/at.allow and /etc/at.deny
Particular files used to set at restrictions.
systemd-run
Create and start a transient timer unit as an alternative to at for one-time scheduling.

223

## 1. For each of the following time specifications, indicate which is valid and which is invalid for
at:
at 08:30 AM next week

Valid

at midday

at 01-01-2020 07:30 PM

at 21:50 01.01.20

Valid

at now +4 days

Valid

at 10:15 PM 31/03/2021

at tomorrow 08:30 AM monotonic

2. Once you have scheduled a job with at, how can you review its commands?
You can use the at -c command followed by the ID of the job whose commands you want to
review. Note that the output also contains most of the environment that was active at the time
the job was scheduled. Remember that root can review the jobs of all users.
3. Which commands can you use to review your pending at jobs? Which commands would you
use to delete them?
You can use the at -l command to review your pending jobs, and you can use the at -d
command to delete your jobs. at -l is an alias for atq and at -d is an alias for atrm.
Remember that root can list and delete the jobs of all users.
4. With systemd, which command is used as an alternative to at?
The systemd-run command can be used as an alternative to at to schedule one-time jobs. For
example, you can use it to run commands at a specific time, defining a calendar timer or a
monotonic timer relative to different starting points.

224

## 1. Create an at job that runs the foo.sh script, located in your home directory, at 10:30 am on
coming October 31st. Assume you are acting as an ordinary user.
$ at 10:30 AM October 31
at> ./foo.sh
job 50 at Thu Oct 31 10:30:00 2019

## 2. Login to the system as another ordinary user and create another at job that runs the bar.sh
script tomorrow at 10:00 am. Assume the script is located in the user’s home directory.
$ at 10:00 AM tomorrow
at> ./bar.sh
job 51 at Sun Oct 6 10:00:00 2019

## 3. Login to the system as another ordinary user and create another at job that runs the
foobar.sh script just after 30 minutes. Assume the script is located in the user’s home
directory.
$ at now +30 minutes
at> ./foobar.sh
job 52 at Sat Oct 5 10:19:00 2019

## 4. Now as root, run the atq command to review the scheduled at jobs of all users. What happens
if an ordinary user executes this command?
52

Sat Oct

5 10:19:00 2019 a dave

50

Thu Oct 31 10:30:00 2019 a frank

51

Sun Oct

6 10:00:00 2019 a emma

If you run the atq command as root, all pending at jobs of all users are listed. If you run it as

225

an ordinary user, only your own pending at jobs are listed.
5. As root, delete all of these pending at jobs using a single command.

6. As root, run the ls -l /usr/bin/at command and examine its permissions.
-rwsr-sr-x 1 daemon daemon 43762 Dec

2015 /usr/bin/at

In this distribution, the at command has both the SUID (the s character instead of the
executable flag for the owner) and SGID (the s character instead of the executable flag for the
group) bits set, which means that it is executed with the privileges of the owner and group of
the file (daemon for both). This is why ordinary users are able to schedule jobs with at.

226

### 107.3 Localisation and internationalisation
LPIC-1 version 5.0, Exam 102, Objective 107.3
- Configure locale settings and environment variables.
- Configure timezone settings and environment variables.
- /etc/timezone
- /etc/localtime
- /usr/share/zoneinfo/
- LC_*
- LC_ALL
- LANG
- TZ
- /usr/bin/locale
- tzselect
- timedatectl
- date
- iconv

227

- UTF-8
- ISO-8859
- ASCII
- Unicode

228

### 107.3 Lesson 1

### 107.3 Localisation and internationalisation

All major Linux distributions can be configured to use custom localisation settings These settings
include region and language related definitions such as the time zone, interface language as well
as character encoding can be modified during the installation of the operating system or anytime
after that.
Applications rely on environment variables, system configuration files and commands to decide
the proper time and language to use; hence most Linux distribution share a standardized way to
adjust time and localisation settings. These adjustments are important not only to improve user
experience, but also to ensure that the timing of system events — important, for example, for
reporting security related issues — are correctly calculated.
To be able to represent any written text, regardless of the spoken language, modern operating
systems need a reference character encoding standard, and Linux systems are no different. As
computers are only able to deal with numbers, a text character is nothing more than a number
associated with a graphic symbol. Distinct computer platforms may associate distinct number
values to the same character, so a common character encoding standard is necessary to make
them compatible. A text document created in one system will be readable in another system only

229

if both agree on the encoding format and on what number is associated to what character, or at
least if they know how to convert between the two standards.
The heterogeneous nature of the localisation settings in Linux-based systems result in subtle
differences between the distributions. Despite these differences, all distributions share the same
basic tools and concepts to setup the internationalisation aspects of a system.

Time Zones
Time zones are roughly proportional discrete bands of Earth’s surface spanning the equivalent to
one hour, that is, regions of the world experiencing the same hour of the day at any given time.
Since there is not a single longitude that can be considered as the beginning of the day for the
whole world, time zones are relative to the prime meridian, where the Earth’s longitude angle is
defined to be 0. The time at the prime meridian is called the Coordinated Universal Time, by
convention abbreviated to UTC. Due to practical reasons, time zones do not follow the exact
longitudinal distance from the reference point (the prime meridian). Instead, time zones are
artificially adapted to follow the borders of countries or other significant subdivisions.
The political subdivisions are so relevant that time zones are named after some major
geographical agent in that particular area, usually based on the name of a large country or city
inside the zone. Yet, time zones are divided according to their time offset relative to UTC and this
offset can also be used to indicate the zone in question. The time zone GMT-5, for example,
indicates a region for which UTC time is five hours ahead, i.e. that region is 5 hours behind UTC.
Likewise, the time zone GMT+3 indicates a region for which UTC time is three hours behind. The
term GMT — from Greenwich Mean Time — is used as a synonym for UTC in the offset based zone
names.
A connected machine can be accessed from different parts of the world, so it is a good practice to
set the hardware clock to UTC (the GMT+0 time zone) and leave the choice of the time zone to each
particular case. Cloud services, for example, are commonly configured to use UTC, as it can help to
mitigate occasional inconsistencies between local time and time at clients or at other servers. In
contrast, users who open a remote session on the server may want to use their local time zone.
Thus, it will be up to the operating system to set up the correct time zone according to each case.
In addition to the current date and time, command date will also print the currently configured
time zone:
Mon Oct 21 10:45:21 -03 2019

230

The offset relative to UTC is given by the -03 value, meaning that the displayed time is three hours
less than UTC. Therefore, UTC time is three hours ahead, making GMT-3 the corresponding time
zone for the given time. Command timedatectl, which is available in distributions using
systemd, shows more details about the system time and date:
Local time: Sat 2019-10-19 17:53:18 -03
Universal time: Sat 2019-10-19 20:53:18 UTC
RTC time: Sat 2019-10-19 20:53:18
Time zone: America/Sao_Paulo (-03, -0300)
System clock synchronized: yes
systemd-timesyncd.service active: yes

As shown in the Time zone entry, time zone names based on localities — like
America/Sao_Paulo — are also accepted. The default time zone for the system is kept in the file
/etc/timezone, either by the zone’s full descriptive name or offset. Generic time zone names
given by the UTC offset must include Etc as the first part of the name. So, to set the default time
zone to GMT+3, the name of the time zone must be Etc/GMT+3:
$ cat /etc/timezone
Etc/GMT+3

Although time zone names based on localities do not require the time offset to work, they are not
so straight forward to choose from. The same zone can have more than one name, which can
make it difficult to remember. In order to ease this issue, command tzselect offers an
interactive method which will guide the user towards the correct time zone definition. Command
tzselect should be available by default in all Linux distributions, as it is provided by the
package that contains necessary utility programs related to the GNU C Library.
Command tzselect will be useful, for example, for a user who wants to identify the time zone
for “São Paulo City” in “Brazil”. tzselect starts by asking the macro region of the desired
location:
$ tzselect
Please identify a location so that time zone rules can be set correctly.
Please select a continent, ocean, "coord", or "TZ".
1) Africa
2) Americas
3) Antarctica

231

4) Asia
5) Atlantic Ocean
6) Australia
7) Europe
8) Indian Ocean
9) Pacific Ocean
10) coord - I want to use geographical coordinates.
11) TZ - I want to specify the time zone using the Posix TZ format.
#? 2

Option 2 is for (North and South) American locations, not necessarily in the same time zone. It is
also possible to specify the time zone with geographical coordinates or with the offset notation,
also known as the Posix TZ format. The next step is to choose the country:
Please select a country whose clocks agree with yours.
1) Anguilla

19) Dominican Republic

37) Peru

2) Antigua & Barbuda

20) Ecuador

38) Puerto Rico

3) Argentina

21) El Salvador

39) St Barthelemy

4) Aruba

22) French Guiana

40) St Kitts & Nevis

5) Bahamas

23) Greenland

41) St Lucia

6) Barbados

24) Grenada

42) St Maarten (Dutch)

7) Belize

25) Guadeloupe

43) St Martin (French)

8) Bolivia

26) Guatemala

44) St Pierre & Miquelon

9) Brazil

27) Guyana

45) St Vincent

10) Canada

28) Haiti

46) Suriname

11) Caribbean NL

29) Honduras

47) Trinidad & Tobago

12) Cayman Islands

30) Jamaica

48) Turks & Caicos Is

13) Chile

31) Martinique

49) United States

14) Colombia

32) Mexico

50) Uruguay

15) Costa Rica

33) Montserrat

51) Venezuela

16) Cuba

34) Nicaragua

52) Virgin Islands (UK)

17) Curaçao

35) Panama

53) Virgin Islands (US)

18) Dominica

36) Paraguay

#? 9

Brazil’s territory spans four time zones, so the country information alone is not enough to set the
time zone. In the next step tzselect will require the user to specify the local region:
Please select one of the following time zone regions.
1) Atlantic islands
2) Pará (east); Amapá
3) Brazil (northeast: MA, PI, CE, RN, PB)

232

4) Pernambuco
5) Tocantins
6) Alagoas, Sergipe
7) Bahia
8) Brazil (southeast: GO, DF, MG, ES, RJ, SP, PR, SC, RS)
9) Mato Grosso do Sul
10) Mato Grosso
11) Pará (west)
12) Rondônia
13) Roraima
14) Amazonas (east)
15) Amazonas (west)
16) Acre
#? 8

Not all locality names are available, but choosing the closest region will be good enough. The
given information will then be used by tzselect to display the corresponding time zone:
The following information has been given:
Brazil
Brazil (southeast: GO, DF, MG, ES, RJ, SP, PR, SC, RS)
Therefore TZ='America/Sao_Paulo' will be used.
Selected time is now:

sex out 18 18:47:07 -03 2019.

Universal Time is now:

sex out 18 21:47:07 UTC 2019.

Is the above information OK?
1) Yes
2) No
#? 1
You can make this change permanent for yourself by appending the line
TZ='America/Sao_Paulo'; export TZ
to the file '.profile' in your home directory; then log out and log in again.
Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
America/Sao_Paulo

The resulting time zone name, America/Sao_Paulo, can also be used as the content of the
/etc/timezone to inform the default time zone for the system:

233

$ cat /etc/timezone
America/Sao_Paulo

As stated by the output of tzselect, the environment variable TZ defines the time zone for the
shell session, whatever the system’s default time zone is. Adding the line
TZ='America/Sao_Paulo'; export TZ to the file ~/.profile will make America/Sao_Paulo
the time zone for the user’s future sessions. The TZ variable can also be temporarily modified
during the current session, in order to display the time in a different time zone:
$ env TZ='Africa/Cairo' date
Mon Oct 21 15:45:21 EET 2019

In the example, command env will run the given command in a new sub-shell session with the
same environment variables of the current session, except for the variable TZ, modified by the
argument TZ='Africa/Cairo'.

Daylight Savings Time
Many regions adopt daylight savings time for part of the year — when clocks are typically
adjusted by an hour — that could lead a misconfigured system to report the wrong time during
that season of the year.
The /etc/localtime file contains the data used by the operating system to adjust its clock
accordingly. Standard Linux systems have files for all time zones in the directory
/usr/share/zoneinfo/, so /etc/localtime is just a symbolic link to the actual data file inside
that directory. The files in /usr/share/zoneinfo/ are organized by the name of the
corresponding time zone, so the data file for the America/Sao_Paulo time zone will be
/usr/share/zoneinfo/America/Sao_Paulo
As the definitions for the daylight savings time may change, it is important to keep the files in
/usr/share/zoneinfo/ up to date. The upgrade command of the package management tool
provided by the distribution should update them every time a new version is available.

Language and Character Encoding
Linux systems can work with a wide variety of languages and non-western character encodings,
definitions known as locales. The most basic locale configuration is the definition of the
environment variable LANG, from which most shell programs identify the language to use.

234

The content of the LANG variable follows the format ab_CD, where ab is the language code and CD
is the region code. The language code should follow the ISO-639 standard and the region code
should follow the ISO-3166 standard. A system configured to use Brazilian Portuguese, for
example, should have the LANG variable defined to pt_BR.UTF-8:
$ echo $LANG
pt_BR.UTF-8

As seen in the sample output, the LANG variable also holds the character encoding intended for the
system. ASCII, short for American Standard Code for Information Interchange, was the first widely
used character encoding standard for electronic communication. However, since ASCII has a very
limited range of available numerical values and it was based on the English alphabet, it does not
contain characters used by other languages or an extended set of non-alphabetical symbols. The
UTF-8 encoding is a Unicode Standard for the ordinary western characters, plus many other nonconventional symbols. As stated by the Unicode Consortium, the maintainer of the Unicode
Standard, it should be adopted by default to ensure compatibility between computer platforms:
The Unicode Standard provides a unique number for every character, no matter what
platform, device, application or language. It has been adopted by all modern software
providers and now allows data to be transported through many different platforms, devices
and applications without corruption. Support of Unicode forms the foundation for the
representation of languages and symbols in all major operating systems, search engines,
browsers, laptops, and smart phones — plus the Internet and World Wide Web (URLs, HTML,
XML, CSS, JSON, etc.). (…) the Unicode Standard and the availability of tools supporting it are
among the most significant recent global software technology trends.
— The Unicode Consortium, What is Unicode?

Some systems may still use ISO defined standards — like the ISO-8859-1 standard — for the
encoding of non-ASCII characters. However, such character encoding standards should be
deprecated in favor of Unicode encodings standards. Nevertheless, all major operating systems
tend to adopt the Unicode standard by default.
System wide locale settings are configured in the file /etc/locale.conf. Variable LANG and
other locale related variables are assigned in this file like an ordinary shell variable, for example:
$ cat /etc/locale.conf
LANG=pt_BR.UTF-8

Users can use a custom locale configuration by redefining the LANG environment variable. It can

235

be done for the current session only or for future sessions, by adding the new definition to the
user’s Bash profile in ~/.bash_profile or ~/.profile. Until the user logs in, however, the
default system locale will still be used by user independent programs, like the display manager’s
login screen.

The command localectl, available on systems employing systemd as the system
manager, can also be used to query and change the system locale. For example:
localectl set-locale LANG=en_US.UTF-8.

In addition to the LANG variable, other environment variables have an affect on specific locale
aspects, like which currency symbol to use or the correct thousand separator for numbers:
LC_COLLATE
Sets the alphabetical ordering. One of its purposes is to define the order files and directories
are listed.
LC_CTYPE
Sets how the system will treat certain sets of characters. It defines, for example, which
characters to consider as uppercase or lowercase.
LC_MESSAGES
Sets the language to display program messages (mostly GNU programs).
LC_MONETARY
Sets the money unit and currency format.
LC_NUMERIC
Sets the numerical format for non-monetary values. Its main purpose is to define the thousand
and decimal separators.
LC_TIME
Sets the time and date format.
LC_PAPER
Sets the standard paper size.
LC_ALL
Overrides all other variables, including LANG.
The locale command will show all defined variables in the current locale configuration:

236

$ locale
LANG=pt_BR.UTF-8
LC_CTYPE="pt_BR.UTF-8"
LC_NUMERIC=pt_BR.UTF-8
LC_TIME=pt_BR.UTF-8
LC_COLLATE="pt_BR.UTF-8"
LC_MONETARY=pt_BR.UTF-8
LC_MESSAGES="pt_BR.UTF-8"
LC_PAPER=pt_BR.UTF-8
LC_NAME=pt_BR.UTF-8
LC_ADDRESS=pt_BR.UTF-8
LC_TELEPHONE=pt_BR.UTF-8
LC_MEASUREMENT=pt_BR.UTF-8
LC_IDENTIFICATION=pt_BR.UTF-8
LC_ALL=

The only undefined variable is LC_ALL, which can be used to temporarily override all the other
locale settings. The following example shows how the date command — running in a system
configured to pt_BR.UTF-8 locale — will modify its output to comply with the new LC_ALL
variable:
seg out 21 10:45:21 -03 2019
$ env LC_ALL=en_US.UTF-8 date
Mon Oct 21 10:45:21 -03 2019

The modification of the LC_ALL variable made both abbreviations for the day of the week and
month name to be shown in American English (en_US). It is not mandatory, however, to set the
same locale for all variables. It is possible, for example, to have the language defined to pt_BR and
the numerical format (LC_NUMERIC) set to the American standard.
Some localisation settings change how programs deal with alphabetical ordering and number
formats. Whilst conventional programs are usually prepared to correctly choose a common locale
for such situations, scripts can behave unexpectedly when trying to correctly alphabetically order
a list of items, for example. For this reason, it is recommended to set the environment variable
LANG to the common C locale, as in LANG=C, so the script produces unambiguous results,
regardless the localisation definitions used in the system where it is executed. The C locale only
conducts a simple bytewise comparison, so it will also perform better than the others.

237

Encoding Conversion
Text may appear with unintelligible characters when displayed on a system with a character
encoding configuration other than the system where the text was created. The command iconv
can be used to solve this issue, by converting the file from its original character encoding to the
desired one. For example, to convert a file named original.txt from the ISO-8859-1 encoding to
the file named converted.txt using UTF-8 encoding, the following command can be used:
$ iconv -f ISO-8859-1 -t UTF-8 original.txt > converted.txt

The option -f ISO-8859-1 (or --from-code=ISO-8859-1) sets the encoding of the original file
and option -t UTF-8 (or --to-code=UTF-8) sets the encoding for the converted file. All encoding
supported by command iconv are listed with command iconv -l or iconv --list. Instead of
using the output redirection, like in the example, option -o converted.txt or --output
converted.txt could also be used.

238

## 1. Based on the following output of the command date, what is the time zone of the system in
GMT notation?
Mon Oct 21 18:45:21 +05 2019

## 2. To what file should the symbolic link /etc/localtime point to in order to make
Europe/Brussels the system’s default local time?

## 3. Characters in text files may not be rendered correctly in a system with a character encoding
different from that used in the text document. How could iconv be used to convert the
WINDOWS-1252 encoded file old.txt to the file new.txt using UTF-8 encoding?

239

## 1. What command will make Pacific/Auckland the default time zone for the current shell
session?

## 2. Command uptime shows, among other things, the load average of the system in fractional
numbers. It uses the current locale settings to decide if the decimal place separator should be a
dot or a comma. If, for example, the current locale is set to de_DE.UTF-8 (the standard locale of
Germany), uptime will use a comma as the separator. Knowing that in the American English
language the dot is used as the separator, what command will make uptime display the
fractions using a dot instead of a comma for the rest of the current session?

## 3. Command iconv will replace all characters outside the target character set with a question
mark. If //TRANSLIT is appended to the target encoding, characters not represented in the
target character set will be replaced (transliterated) by one or more similar looking characters.
How could this method be used to convert a UTF-8 text file named readme.txt to a plain ASCII
file named ascii.txt?

240

This lesson covers how to set up a Linux system to work with custom languages and time settings.
Character encoding concepts and settings are also covered, as they are very important to correctly
render text content. The lesson goes through the following topics:
- How Linux systems select the language to display shell messages.
- Understanding how time zones affect the local time.
- How to identify the appropriate time zone and modify system settings accordingly.
- What character encodings are and how to convert between them.
- Locale and time related environment variables, such as LC_ALL, LANG and TZ.
- /etc/timezone
- /etc/localtime
- /usr/share/zoneinfo/
- locale
- tzselect
- timedatectl
- date
- iconv

241

## 1. Based on the following output of the command date, what is the time zone of the system in
GMT notation?
Mon Oct 21 18:45:21 +05 2019

It’s the Etc/GMT+5 time zone.
2. To what file should the symbolic link /etc/localtime point to in order to make
Europe/Brussels the system’s default local time?
The link /etc/localtime should point to /usr/share/zoneinfo/Europe/Brussels.
3. Characters in text files may not be rendered correctly in a system with a character encoding
different from that used in the text document. How could iconv be used to convert the
WINDOWS-1252 encoded file old.txt to the file new.txt using UTF-8 encoding?
Command iconv -f WINDOWS-1252 -t UTF-8 -o new.txt old.txt will perform the
desired conversion.

242

## 1. What command will make Pacific/Auckland the default time zone for the current shell
session?
export TZ=Pacific/Auckland
2. Command uptime shows, among other things, the load average of the system in fractional
numbers. It uses the current locale settings to decide if the decimal place separator should be a
dot or a comma. If, for example, the current locale is set to de_DE.UTF-8 (the standard locale of
Germany), uptime will use a comma as the separator. Knowing that in the American English
language the dot is used as the separator, what command will make uptime display the
fractions using a dot instead of a comma for the rest of the current session?
The command export LC_NUMERIC=en_US.UTF-8 or export LC_ALL=en_US.UTF-8.
3. Command iconv will replace all characters outside the target character set with a question
mark. If //TRANSLIT is appended to the target encoding, characters not represented in the
target character set will be replaced (transliterated) by one or more similar looking characters.
How this method can be used to convert a UTF-8 text file named readme.txt to a plain ASCII
file named ascii.txt?
Command iconv -f UTF-8 -t
perform the desired conversion.

ASCII//TRANSLIT

-o

ascii.txt

readme.txt will

243

## Topic 108: Essential System Services

244

### 108.1 Maintain system time
LPIC-1 version 5.0, Exam 102, Objective 108.1
- Set the system date and time.
- Set the hardware clock to the correct time in UTC.
- Configure the correct timezone.
- Basic NTP configuration using ntpd and chrony.
- Knowledge of using the pool.ntp.org service.
- Awareness of the ntpq command.
- /usr/share/zoneinfo/
- /etc/timezone
- /etc/localtime
- /etc/ntp.conf
- /etc/chrony.conf
- date
- hwclock
- timedatectl

245

- ntpd
- ntpdate
- chronyc
- pool.ntp.org

246

### 108.1 Lesson 1

LPIC-1 (102)

### 108.1 Maintain system time

Accurate timekeeping is absolutely crucial for modern computing. The implementation of keeping
time, however, is surprisingly complex. The practice of keeping time seems trivial to an end-user,
but the system needs to be able to handle many idiosyncrasies and edge cases intelligently.
Consider that time zones are not static, but may be changed by an administrative or political
decision. A country may choose to stop observing Daylight Savings Time. Any program must be
able to handle those changes logically. Fortunately for system administrators, the solutions for
timekeeping on the Linux operating system are mature, robust and usually work without much
interference.
When a Linux computer boots up, it starts keeping time. We refer to this as a system clock, since it
is updated by the operating system. In addition, modern computers will also have a hardware or
real time clock. This hardware clock is often a feature of the motherboard and keeps time
regardless if the computer is running or not. During boot, the system time is set from the
hardware clock, but for the most part these two clocks run independently of each other. In this
lesson we will be discussing methods of interacting with both the system and hardware clocks.
On most modern Linux systems, system time and hardware time are synchronised to network

247

time, which is implemented by the Network Time Protocol (NTP). In the vast majority of cases, the
only configuration a normal user will be required to do is to set their time zone and NTP will take
care of the rest. However, we will cover some ways of working with time manually and the
specifics of configuring network time will be covered in the next lesson.

Local Versus Universal Time
The system clock is set to Coordinated Universal Time (UTC), which is the local time at Greenwich,
United Kingdom. Usually a user wants to know their local time. Local time is calculated by taking
UTC time and applying an offset based on time zone and Daylight Savings. In this way, a lot of
complexity can be avoided.
The system clock can be set to either UTC time or local time, but it is recommended that it also be
set to UTC time.

Date
date is a core utility which simply prints local time:
Sun Nov 17 12:55:06 EST 2019

Modifying the options of the date command will change the format of the output.
For example, a user can use date -u to view the current UTC time.
$ date -u
Sun Nov 17 18:02:51 UTC 2019

Some other commonly-used options will return the local time in a format which adheres to an
accepted RFC format:
-I
Date/time in ISO 8601 format. Appending date (-Idate) will limit the output to date only.
Other formats are hours, minutes, seconds and ns for nanoseconds.
-R
Returns date and time in RFC 5322 format.

248

--rfc-3339
Returns date and time in RFC 3339 format.
The format of date can be customized by the user with sequences specified in the man page. For
example, the current time can be formatted as Unix time thusly:
$ date +%s
1574014515

From date 's man page we can see that %s refers to Unix time.
Unix time is used internally on most Unix-like systems. It stores UTC time as the number of
seconds since Epoch, which has been defined as January 1st, 1970.

The number of bits required to store Unix time at the present moment is 32 bits.
There is a future issue when 32 bits will become insufficient to contain the current
time in Unix format. This will cause serious issues for any 32-bit Linux systems.
Fortunately, this will not occur until January 19, 2038.

Using these sequences, we are able to format date and time in almost any format required by any
application. Of course, in most cases it is far preferable to stick with an accepted standard.
Additionally, date --date can be used to format a time that is not the current time. In this
scenario, a user can specify the date to be applied to the system using Unix time for example:
$ date --date='@1564013011'
Wed Jul 24 20:03:31 EDT 2019

Using the --debug option can be very useful for ensuring that a date can be successfully parsed.
Observe what happens when passing a valid date to the command:
$ date --debug --date="Fri, 03 Jan 2020 14:00:17 -0500"
date: parsed day part: Fri (day ordinal=0 number=5)
date: parsed date part: (Y-M-D) 2020-01-03
date: parsed time part: 14:00:17 UTC-05
date: input timezone: parsed date/time string (-05)
date: using specified time as starting value: '14:00:17'
date: warning: day (Fri) ignored when explicit dates are given
date: starting date/time: '(Y-M-D) 2020-01-03 14:00:17 TZ=-05'
date: '(Y-M-D) 2020-01-03 14:00:17 TZ=-05' = 1578078017 epoch-seconds
date: timezone: system default

249

date: final: 1578078017.000000000 (epoch-seconds)
date: final: (Y-M-D) 2020-01-03 19:00:17 (UTC)
date: final: (Y-M-D) 2020-01-03 14:00:17 (UTC-05)

This can be a handy tool when troubleshooting an application that generates a date.

Hardware Clock
A user may run the hwclock command to view the time as maintained on the real-time clock. This
command will require elevated privileges, so we will use sudo to call the command in this case:
$ sudo hwclock
2019-11-20 11:31:29.217627-05:00

Using the option --verbose will return more output which might be useful for troubleshooting:
$ sudo hwclock --verbose
hwclock from util-linux 2.34
System Time: 1578079387.976029
Trying to open: /dev/rtc0
Using the rtc interface to the clock.
Assuming hardware clock is kept in UTC time.
Waiting for clock tick...
...got clock tick
Time read from Hardware Clock: 2020/01/03 19:23:08
Hw clock time : 2020/01/03 19:23:08 = 1578079388 seconds since 1969
Time since last adjustment is 1578079388 seconds
Calculated Hardware Clock drift is 0.000000 seconds
2020-01-03 14:23:07.948436-05:00

Note the Calculated Hardware Clock drift. This output can tell you if system time and
hardware time are deviating from one another.

timedatectl is a command that can be used to check the general status of time and date,
including whether or not network time has been synchronised (Network Time Protocol will be
covered in the next lesson).
By default timedatectl returns information similar to date, but with the addition of the RTC

250

(hardware) time as well as the status of the NTP service:
Local time: Thu 2019-12-05 11:08:05 EST
Universal time: Thu 2019-12-05 16:08:05 UTC
RTC time: Thu 2019-12-05 16:08:05
Time zone: America/Toronto (EST, -0500)
System clock synchronized: yes
NTP service: active

Setting Time Using timedatectl
If NTP is unavailable, it is recommended to use timedatectl rather than date or hwclock to set
time:

The process is similar to that of date. The user can also set time independent of date using the
format HH:MM:SS.

Setting Timezone Using timedatectl
timedatectl is the preferred way of setting the local time zone on systemd based Linux systems
when no GUI exists. timedatectl will list possible time zones and then the time zone can be set
using one of these as an argument.
First we will list possible timezones:
$ timedatectl list-timezones
Africa/Abidjan
Africa/Accra
Africa/Algiers
Africa/Bissau
Africa/Cairo

The list of possible time zones is long, so the use of the grep command is recommended in this
case.

251

Next we can set the timezone using one of the elements of the list that was returned:
$ timedatectl set-timezone Africa/Cairo
Local time: Thu 2019-12-05 18:18:10 EET
Universal time: Thu 2019-12-05 16:18:10 UTC
RTC time: Thu 2019-12-05 16:18:10
Time zone: Africa/Cairo (EET, +0200)
System clock synchronized: yes
NTP service: active

Keep in mind that the name of the time zone must be exact. Africa/Cairo for example will
change the time zone, but cairo or africa/cairo will not.

Disabling NTP Using timedatectl
In some cases it might be necessary to disable NTP. This could be done using systemctl but we
will demonstrate this using timedatectl:
Local time: Thu 2019-12-05 18:19:04 EET Universal time: Thu 2019-12-05 16:19:04
UTC
RTC time: Thu 2019-12-05 16:19:04
Time zone: Africa/Cairo (EET, +0200)
NTP enabled: no
NTP synchronized: no
DST active: n/a

Setting Time Zone Without timedatectl
Setting time zone information is a standard step when installing Linux on a new machine. If there
is a graphical installation process, this will most likely be handled without any further user input.
The /usr/share/zoneinfo directory contains information for the different time zones that are
possible. In the zoneinfo directory, there are subdirectories that contain the names of continents
as well as other symbolic links. It is recommended to find your region’s zoneinfo starting from
your continent.

252

zoneinfo files contain rules required to calculate the local time offset in relation to UTC, and they
also are important if your region observes Daylight Savings Time. The contents of
/etc/localtime will be read when Linux needs to determine the local time zone. In order to set
the time zone without the use of a GUI, the user should create a symbolic link for their location
from /usr/share/zoneinfo to /etc/localtime. For example:
$ ln -s /usr/share/zoneinfo/Canada/Eastern /etc/localtime

After setting the correct time zone, it is often recommended to run:

This will set the hardware clock from the system clock (that is, the real-time clock will be set to the
same time as date). Please note that this command is run with root privileges, in this case by
being logged in as root.
/etc/timezone is similar to /etc/localtime. It is a data representation of the local time zone,
and as such it can be read using cat:
$ cat /etc/timezone
America/Toronto

Note that this file is not used by all Linux distributions.

Setting Date and Time Without timedatectl

Most modern Linux systems use systemd for its configuration and services and as
such it is not recommended that you use date or hwclock for setting time.
systemd uses timedatectl for this. Nonetheless it is important to know these
legacy commands in the event that you must administer an older system.

Using date
date has an option to set the system time. Use --set or -s to set the date and time. You may also
choose to use --debug to verify the correct parsing of the command:

253

Note that root privileges are required to set the date here. We may also choose to change to time
or date independently:

Here we must specify the sequences so that our string is parsed properly. For example %Y refers to
the year, and so the first four digits 2011 will be interpreted as the year 2011. Similarly, %T is the
sequence for time, and it is demonstrated here by setting time:

After changing system time, it is recommended to also set the hardware clock so that both system
and hardware clocks are synchronised:

systohc means “system clock to hardware clock”.

Using hwclock
Rather than setting the system clock and updating the hardware clock, you may choose to reverse
the process. We will start by setting the hardware clock:
Fri 12 Apr 2019 6:15:19 AM EST -0.562862 seconds

Notice that by default hwclock is expecting UTC time, but returns the local time by default.
After setting the hardware clock, we will need to update the system clock from it. hctosys can be
understood to mean “hardware clock to system clock”.

254

Guided Exercise
1. Indicate whether the following commands are displaying or modifying system time or
hardware time:

System

Hardware

Both

date -u
hwclock --set
--date "12:00:00"
timedatectl | grep
RTC
hwclock --hctosys
date +%T -s
"08:00:00"
timedatectl settime 1980-01-10
2. Observe the following output, and then correct the format of the argument so that the
command is successful:
$ date --debug --date "20/20/12 0:10 -3"
date: warning: value 20 has less than 4 digits. Assuming MM/DD/YY[YY]
date: parsed date part: (Y-M-D) 0002-20-20
date: parsed time part: 00:10:00 UTC-03
date: input timezone: parsed date/time string (-03)
date: using specified time as starting value: '00:10:00'
date: error: invalid date/time value:

user provided time: '(Y-M-D) 0002-20-20 00:10:00 TZ=-03'

normalized time: '(Y-M-D) 0003-08-20 00:10:00 TZ=-03'

---- -possible reasons:

numeric values overflow;

incorrect timezone

date: invalid date ‘20/20/2 0:10 -3’

255

## 3. Use the date command and sequences so that the system’s month is set to February. Leave the
rest of the date and time unchanged.
