---
id: lpi-102-500-01
title: "LPIC-1 · 102-500 — Shells and Shell Scripting, We make our script executable:…",
slug: lpi-102-500-01-lpic-1-102-500-shells-and-shell-scripting-we-make-our-script
source: "LPI Learning Material — LPIC-1 (Exam 102-500)",
sourceSection: "Topic 105: Shells and Shell Scripting, 2. We make our script executable:, 3. Finally, we invoke bash with the -l option to run the script:, 4. Hello from /home/user2/.profile means ~/.profile has been fully read and executed., 2. We list its contents:, 3. We create our directory and check all went a"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "The shell is arguably the most powerful tool in a Linux system and can be defined as an interface Covers 67 sections: Shells and Shell Scripting, We make our script executable:, Finally, we invoke bash with the -l option to run the script.",
---
# LPIC-1 · 102-500 — Shells and Shell Scripting, We make our script executable:…

## Topic 105: Shells and Shell Scripting

LPIC-1 version 5.0, Exam 102, Objective 105.1
- Set environment variables (e.g. PATH) at login or when spawning a new shell.
- Write Bash functions for frequently used sequences of commands.
- Maintain skeleton directories for new user accounts.
- Set command search path with the proper directory.
- .
- source
- /etc/bash.bashrc
- /etc/profile
- env
- export
- set
- unset
- ~/.bash_profile
- ~/.bash_login

- ~/.profile
- ~/.bashrc
- ~/.bash_logout
- function
- alias

### 105.1 Lesson 1

1 of 3

The shell is arguably the most powerful tool in a Linux system and can be defined as an interface
between the user and the kernel of the operating system. It interprets commands entered by the
user. Therefore, all system administrators must be skilled in using the shell. As we may certainly
know by now, the Bourne Again Shell (Bash) is the de facto shell for the vast majority of Linux
distributions.
Once started, the first thing Bash — or any other shell for that matter — does is executing a series
of startup scripts. These scripts customize the session’s environment. There are both system wide
and user specific scripts. We can put our personal preferences or settings that best fit our users'
needs in these scripts in the form of variables, aliases and functions.
The exact series of startup files depends on a very important parameter: the type of shell. Let us
have a look at the variety of shells that exist.

Shell Types: Interactive vs. Non-Interactive and Login vs. NonLogin
To start with, let us clarify the concepts of interactive and login in the context of shells:
Interactive / Non-interactive Shells
This kind of shell refers to the interaction that takes place between the user and the shell: The
user provides input by typing commands into the terminal using the keyboard; the shell
provides output by printing messages on the screen.
Login / Non-login Shells
This kind of shell refers to the event of a user accessing a computer system providing its
credentials, such as username and password.
Both interactive and non-interactive shells can be either login or non-login and any possible
combination of these types has its specific uses.
Interactive login shells are executed when users log into the system and are used to customize
users' configurations according to their needs. A good example of this type of shell would be that
of a group of users belonging to the same department who need a particular variable set in their
sessions.
By interactive non-login shells we refer to any other shells opened by the user after logging into
the system. Users use these shells during sessions to carry out maintenance and administrative
tasks such as setting variables, the time, copying files, writing scripts, etc.
On the other hand, non-interactive shells do not require any kind of human interaction. Thus,
these shells do not ask the user for input and their output — if any — is in most cases written to a
log.
Non-interactive login shells are quite rare and impractical. Their uses are virtually non-existent
and we will only comment on them for the sake of insight into shell behaviour. Some odd
examples include forcing a script to be run from a login shell with /bin/bash --login
<some_script> or piping the standard output (stdout) of a command into the standard input
(stdin) of an ssh connection:
<some_command> | ssh <some_user>@<some_server>

As for non-interactive non-login shell there is neither interaction nor login on behalf of the user, so
we are referring here to the use of automated scripts. These scripts are mostly used to carry out

repetitive administrative and maintenance tasks such as those included in cronjobs. In such cases,
bash does not read any startup files.

Opening a Terminal
When we are in a desktop environment, we can either open a terminal application or switch to
one of the system consoles. Therefore, a new shell is either a pts shell when opened from a
terminal emulator in the GUI or a tty shell when run from a system console. In the first case we
are not dealing with a terminal but with a terminal emulator. As part of graphical sessions,
terminal emulators like gnome-terminal or konsole are very feature-rich and user-friendly as
compared to text-based user interface terminals. Less feature-rich terminal emulators
include — amongst others — XTerm and sakura.
Using the Ctrl + Alt + F1 - F6 combos we can go to the console logins which open an interactive textbased login shell. Ctrl + Alt + F7 will take the session back into the Desktop.

tty stands for teletypewritter; pts stands for pseudo terminal slave. For more
information: man tty and man pts.

Launching Shells with bash
After logging in, type bash into a terminal to open a new shell. Technically, this shell is a child
process of the current shell.
While starting the bash child process, we can specify various switches to define which kind of
shell we want to start. Here some important bash invocation options:
bash -l or bash --login
will invoke a login shell.
bash -i
will invoke an interactive shell.
bash --noprofile
with login shells will ignore both the system-wide startup file /etc/profile and the user-level
startup files ~/.bash_profile, ~/.bash_login and ~/.profile.
bash --norc
with interactive shells will ignore both the system-wide startup file /etc/bash.bashrc and
the user-level startup file ~/.bashrc.

bash --rcfile <file>
with interactive shells will take <file> as the startup file ignoring system wide
/etc/bash.bashrc and user-level ~/.bashrc.
We will discus the various startup files below.

Launching Shells with su and sudo
Through the use of these two similar programs we can obtain specific types of shells:
Change user ID or become superuser (root). With this command we can invoke both login and
non-login shells:
- su - user2, su -l user2 or su --login user2 will start an interactive login shell as
user2.
- su user2 will start an interactive non-login shell as user2.
- su - root or su - will start an interactive login shell as root.
- su root or su will start an interactive non-login shell as root.
Execute commands as another user (including the supersuser). Because this command is
mainly used to gain root privileges temporarily, the user using it must be in the sudoers file.
To add users to sudoers we need to become root and then run:
root@debian:~# usermod -aG sudo user2

Just as su, sudo allows us to invoke both login and non-login shells:
- sudo su - user2, sudo su -l user2 or sudo su --login user2 will start an
interactive login shell as user2.
- sudo su user2 will start an interactive non-login shell as user2.
- sudo -u user2 -s will start an interactive non-login shell as user2.
- sudo su - root or sudo su - will start an interactive login shell as root.
- sudo -i will start an interactive login shell as root.
- sudo -i <some_command> will start an interactive login shell as root, run the command
and return to the original user.

- sudo su root or sudo su will start an interactive non-login shell as root.
- sudo -s or sudo -u root -s will start a non-login shell as root.
When using either su or sudo, it is important to consider our particular case scenario for starting
a new shell: Do we need the target user’s environment or not? If so, we would use the options
which invoke login shells; if not, those which invoke non-login shells.

What Shell Type Do We Have?
In order to find out what type of shell we are working at, we can type echo $0 into the terminal
and get the following output:
Interactive login
-bash or -su
Interactive non-login
bash or /bin/bash
Non-interactive non-login (scripts)
<name_of_script>

How Many Shells Do We Have?
To see how many bash shells we have up and running in the system, we can use the command ps
aux | grep bash:
user2@debian:~$ ps aux | grep bash

5270

0.1

0.1

25532

5664 pts/0

Ss

23:03

0:00 bash

5411

0.3

0.1

25608

5268 tty1

23:03

5452

16760

940 pts/0

23:04

0:00 grep --color=auto bash

user2 at debian has logged into a GUI (or X Window System) session and opened gnome-terminal,
then she has pressed Ctrl + Alt + F1 to go into a tty terminal session. Finally, she has gone back to
the GUI session by pressing Ctrl + Alt + F7 and typed in the command ps aux | grep bash. Thus,
the output shows an interactive non-login shell via the terminal emulator (pts/0) and an
interactive login shell via the proper text-based terminal (tty1). Note also how the last field of
each line (the command) is bash for the former and -bash for the latter.

Where Shells Get their Configuration From: Startup Files
Well, now that we know the shell types that we can find in a Linux system, it is high time that we
saw what startup files get executed by what shell. Note that system wide or global scripts are
placed in the /etc/ directory, whereas local or user-level ones are found in the user’s home (~).
Also, when there is more than one file to be searched, once one is found and run the others are
ignored. Explore and study these files yourself with your favorite text editor or by typing less
<startup_file>.

Startup files can be divided into Bash specific (those limited only to bash
configurations and commands) and general ones (relating to most shells).

Interactive Login Shell
Global Level
This is the system-wide .profile file for the Bourne shell and Bourne compatible shells (bash
included). Through a series of if statements this file sets a number of variables such as PATH
and PS1 accordingly as well as sourcing — if they exist — both the file /etc/bash.bashrc and
those in the directory /etc/profile.d.
/etc/profile.d/*
This directory may contain scripts that get executed by /etc/profile.
Local Level
~/.bash_profile
This Bash specific file is used for configuring the user environment. It can also be used to
source both ~/.bash_login and ~/.profile.
~/.bash_login
Also Bash specific, this file will only be executed if there is no ~/.bash_profile file. Its name
suggests that it should be used to run commands needed on login.
~/.profile
This file is not Bash specific and gets sourced only if neither ~/.bash_profile nor
~/.bash_login exist — which is normally the case. Thus, the main purpose of ~/.profile is
that of checking if a Bash shell is being run and — if so — sourcing ~/.bashrc if it exists. It
usually sets the variable PATH so that it includes the user’s private ~/bin directory if it exists.

~/.bash_logout
If it exists, this Bash specific file does some clean-up operations when exiting the shell. This can
be convenient in such cases as those in remote sessions.
Exploring Interactive Login Shell Configuration Files
Let us show some of these files in action by modifying /etc/profile and
/home/user2/.profile. We will append to each a line reminding us the file being executed:
root@debian:~# echo 'echo Hello from /etc/profile' >> /etc/profile
root@debian:~# echo 'echo Hello from ~/.profile' >> ~/.profile

Two redirection operators >> append the output of a command into an existing
file — not overwriting it. If the file does not exist, though, it will be created.

Thus, through the output of their respective echo commands we will know when each of these
files is read and executed. To prove it, let us see what happens when user2 logs in via ssh from
another machine:
user2@debian:~$ ssh user2@192.168.1.6
user2@192.168.1.6's password:
Linux debian 4.9.0-8-amd64 #1 SMP Debian 4.9.130-2 (2018-10-27) x86_64
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Tue Nov 27 19:57:19 2018 from 192.168.1.10

As the last two lines show, it worked. Also, note three things:
- The global file was run first.
- There were no .bash_profile or .bash_login files in he home directory of user2.
- The tilde (~) expanded to the absolute path of the file (/home/user2/.profile).

Interactive Non-Login Shell
Global Level
/etc/bash.bashrc
This is the system-wide .bashrc file for interactive bash shells. Through its execution bash
makes sure it is being run interactively, checks the window size after each command (updating
the values of LINES and COLUMNS if necessary) and sets some variables.
Local Level
~/.bashrc
In addition to carrying out similar tasks to those described for /etc/bash.bashrc at a user
level (such as checking the window size or if being run interactively), this Bash specific file
usually sets some history variables and sources ~/.bash_aliases if it exists. Apart from that,
this file is normally used to store users' specific aliases and functions.
Likewise, it is also worthwhile noting that ~/.bashrc is read if bash detects its <stdin> is a
network connection (as it was the case with the Secure Shell (SSH) connection in the example
above).
Exploring Interactive Non-Login Shell Configuration Files
Let us now modify /etc/bash.bashrc and /home/user2/.bashrc:
root@debian:~# echo 'echo Hello from /etc/bash.bashrc' >> /etc/bash.bashrc
root@debian:~# echo 'echo Hello from ~/.bashrc' >> ~/.bashrc

And this is what happens when user2 starts a new shell:
user2@debian:~$ bash
Hello from /etc/bash.bashrc
Hello from /home/user2/.bashrc

Again, the two files were read and executed.

Remember, because of the order in which files are run, local files take
precedence over global ones.

Non-Interactive Login Shell
A non-interactive shell with the -l or --login options is forced to behave like a login shell and so
the startup files to be run will be the same as those for interactive login shells.
To prove it, let us write a simple script and make it executable. We will not include any shebangs
because we will be invoking the bash executable (/bin/bash with the login option) from the
command line.
1. We create the script test.sh containing the line echo 'Hello from a script' so that we
can prove the script runs successfully:
user2@debian:~$ echo "echo 'Hello from a script'" > test.sh

## 2. We make our script executable:
user2@debian:~$ chmod +x ./test.sh

## 3. Finally, we invoke bash with the -l option to run the script:
user2@debian:~$ bash -l ./test.sh
Hello from a script

It works! Before running the script, the login took place and both /etc/profile and
~/.profile were executed.

We will learn about shebangs and all other aspects of shell scripting in future
lessons.

Let us now have the standard output (stdout) of the echo command into the standard input (stdin)
of an ssh connection by means of a pipe (|):
user2@debian:~$ echo "Hello-from-a-noninteractive-login-shell" | ssh user2@192.168.1.6
Pseudo-terminal will not be allocated because stdin is not a terminal.
user2@192.168.1.6's password:
Linux debian 4.9.0-8-amd64 #1 SMP Debian 4.9.130-2 (2018-10-27) x86_64
The programs included with the Debian GNU/Linux system are free software;

the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
-bash: line 1: Hello-from-a-noninteractive-login-shell: command not found

Again, /etc/profile and ~/.profile are executed. Other than that, the first and last lines of the
output are quite telling as far as the behaviour of the shell is concerned.
Non-Interactive Non-Login Shell
Scripts do not read any of the files listed above but look for the environment variable BASH_ENV,
expand its value if needed and use it as the name of a startup file to read and execute commands.
We will learn more about environment variables in the next lesson.
As mentioned above, typically /etc/profile and ~/.profile make sure that both
/etc/bash.bashrc and ~/.bashrc get executed after a successful login. The output of the
following command shows this phenomenon:
root@debian:~# su - user2
Hello from /etc/bash.bashrc
Hello from /home/user2/.bashrc

Bearing in mind the lines we previously appended to the startup scripts — and invoking an
interactive-login shell at user-level with su - user2 — the four lines of output can be explained
as follows:
1. Hello from /etc/bash.bashrc means /etc/profile has sourced /etc/bash.bashrc.
2. Hello from /etc/profile means /etc/profile has been fully read and executed.
3. Hello from /home/user2/.bashrc means ~/.profile has sourced ~/.bashrc.
## 4. Hello from /home/user2/.profile means ~/.profile has been fully read and executed.
Note how with su - <username> (also su -l <username> and su --login <username>) we
guarantee the invocation of a login shell, whereas su <username> would have only invoked
/etc/bash.bashrc and ~/.bashrc.

Sourcing Files
In the previous sections we have discussed that some startup scripts include or execute other
scripts. This mechanism is called sourcing and is explained in this section.
Sourcing Files with .
The dot (.) is normally found in startup files.
In the .profile file of our Debian server we can find — for instance — the following block:
if [ -f "$HOME/.bashrc" ]; then
. "$HOME/.bashrc"

We already saw how the execution of a script may lead to that of another. Thus, the if statement
guarantees that the file $HOME/.bashrc — if it exists (-f) — will be sourced (i.e. read and
executed) at login:
. "$HOME/.bashrc"

As we will learn in the next lesson, $HOME is an environment variable that expands
to the absolute path of the user’s home directory.

Furthermore, we can use the . whenever we have modified a startup file and want to make the
changes effective without a reboot. For example we can:
- add an alias to ~/.bashrc:
user2@debian:~$ echo "alias hi='echo We salute you.'" >> ~/.bashrc

When sending the output of one command into a file, remember not to
mistake append (>>) with overwrite (>).

- output the last line of ~/.bashrc to check everything went fine:
user2@debian:~$ tail -n 1 !$
tail -n 1 ~/.bashrc
alias hi='echo We salute you.'

!$ expands to the last argument from the previous command, in our case:
~/.bashrc.

- source the file by hand:
user2@debian:~$ . ~/.bashrc

- and invoke the alias to prove it works:
user2@debian:~$ hi
We salute you.

Refer to the next lesson to learn about aliases and variables.

Sourcing Files with source
The source command is a synonym for .. So to source ~/.bashrc we can also do it like this:
user2@debian:~$ source ~/.bashrc

The Origin of Shell Startup Files: SKEL
SKEL is a variable whose value is the absolute path to the skel directory. This directory serves as
a template for the file system structure of users' home directories. It includes the files that will be
inherited by any new user accounts created (including, of course, the configuration files for
shells). SKEL and other related variables are stored in /etc/adduser.conf, which is the
configuration file for adduser:
user2@debian:~$ grep SKEL /etc/adduser.conf
SKEL=/etc/skel
SKEL_IGNORE_REGEX="dpkg-(old|new|dist|save)"

SKEL is set to /etc/skel; thus, the startup scripts that configure our shells lie therein:
user2@debian:~$ ls -a /etc/skel/

Remember, files starting with a . are hidden, so we must use ls -a to see
them when listing directory contents.

Let us now create a directory in /etc/skel for all new users to store their personal scripts in:
1. As root we move into /etc/skel:
root@debian:~# cd /etc/skel/
root@debian:/etc/skel#

## 2. We list its contents:
root@debian:/etc/skel# ls -a

## 3. We create our directory and check all went as expected:
root@debian:/etc/skel# mkdir my_personal_scripts
root@debian:/etc/skel# ls -a

my_personal_scripts

## 4. Now we delete user2 together with its home directory:
root@debian:~# deluser --remove-home user2
Looking for files to backup/remove ...
Removing files ...
Removing user `user2' ...
Warning: group `user2' has no more members.
Done.

## 5. We add user2 again so that it gets a new home directory:
root@debian:~# adduser user2
Adding user `user2' ...
Adding new group `user2' (1001) ...
Adding new user `user2' (1001) with group `user2' ...
Creating home directory `/home/user2' ...
Copying files from `/etc/skel' ...
Enter new UNIX password:
Retype new UNIX password:

passwd: password updated successfully
Changing the user information for user2
Enter the new value, or press ENTER for the default
Full Name []:
Room Number []:
Work Phone []:
Home Phone []:
Other []:
Is the information correct? [Y/n] y

## 6. Finally, we login as user2 and list all the files in /home/user2 to see if everything went as
expected:
root@debian:~# su - user2
user2@debian:~$ pwd
user2@debian:~$ ls -a

.bash_history

my_personal_scripts

It did.

## 1. Study how the shells have been started under the column “Shell Started with…” and complete
with the required information:
Shell Started with…

Interactive?

Login?

sudo ssh
user2@machine2
Ctrl + Alt + F2

su - user2
gnome-terminal
A regular user uses
konsole to start an
instance of sakura
A script named
test.sh containing
the command echo
$0
2. Write the su and sudo commands to launch the specified shell:
Interactive-login shell as user2
Interactive login shell as root
Interactive non-login shell as root
Interactive non-login shell as user2

Result of echo $0

3. What startup file gets read when the shell under “Shell Type” is started?
Shell Type

/etc/bash.bash ~/.profile
rc

~/.bashrc

Interactive-login
shell as user2
Interactive login
shell as root

## 1. In Bash we can write a simple Hello world! function by including the following code in an
empty file:
function hello() {

- What should we do next to make the function available to the shell?

- Once it is available to the current shell, how would you invoke it?

- To automate things, in what file would you put the function and its invocation so that it gets
executed when user2 opens a terminal from an X Window session? What type of shell is it?

- In what file would you put the function and its invocation so that it is run when root
launches a new interactive shell irrespective of whether it is login or not?

## 2. Have a look at the following basic, Hello world! bash script:
#hello_world: a simple bash script to discuss interaction in scripts.

- Suppose we make the script executable and run it. Would that be an interactive script?
Why?

- What makes a script interactive?

## 3. Imagine you have changed the values of some variables in ~/.bashrc and want those changes
to take effect without a reboot. From your home directory, how could you achieve that in two

different ways?

## 4. John has just started an X Window session on a Linux server. He opens a terminal emulator to
carry out some administrative tasks but, surprisingly, the session freezes and he needs to open
a text shell.
- How can he open that tty shell?

- What startup files will get sourced?

## 5. Linda is a user of a Linux server. She kindly asks the administrator to have a ~/.bash_login
file so she can have the time and date printed on the screen when she logs in. Other users like
the idea and follow suit. The administrator has a hard time creating the file for all other users
on the server so he decides to add a new policy and have ~/.bash_login created for all
potential new users. How can the administrator accomplish that task?

In this lesson we learned:
- Shells set users' environment in a Linux system.
- Bash is the number one shell across GNU/Linux distributions.
- The first job a shell carries out is that of reading and executing one or various startup files.
- The concepts of interaction and login as related to shells.
- How to launch different types of shells with bash, su, sudo and Ctrl + Alt + F1 - F6 .
- How to check the type of shell with echo $0.
- The local startup files ~/.bash_profile, ~/.profile, ~/.bash_login, ~/.bash_logout and
~/.bashrc.
- The global startup files /etc/profile, /etc/profile.d/*, /etc/bash.bashrc.
- Local files take precedence over global ones.
- How to redirect the output of a command with > (overwrite) and >> (append).
- The meaning of the skel directory.
- How to source files.
Create a new shell.
Create a new shell.
Create a new shell.
usermod
Modify a user account.
echo
Display a line of text.

ps
Report a snapshot of the current processes.
less
A pager for long files.
Start an Open SSH connection (remotely).
Change mode bits of a file, for example make it executable.
Print lines matching a pattern.
ls
List directory contents.
cd
Change directory.
mkdir
Make directory.
deluser
Delete user.
adduser
Add a new user.
source
tail
Output the last part of files.

## 1. Study how the shells have been started under the column “Shell Started with…” and complete
with the required information:
Shell Started with…

Interactive?

Login?

Result of echo $0

sudo ssh
user2@machine2

Ctrl + Alt + F2

su - user2

gnome-terminal

A regular user uses
konsole to start an
instance of sakura

A script named
test.sh containing
the command echo
$0

./test.sh

## 2. Write the su and sudo commands to launch the specified shell:
Interactive-login shell as user2
su - user2, su -l user2 or su --login user2
sudo su - user2, sudo su -l user2 or sudo su --login user2
Interactive login shell as root
su - root or su sudo
sudo su - root, sudo su - or sudo -i

Interactive non-login shell as root
su root or su
sudo su root, sudo su, sudo -s or sudo -u root -s
Interactive non-login shell as user2
su user2
sudo su user2 or sudo -u user2 -s
3. What startup file gets read when the shell under “Shell Type” is started?
Shell Type

/etc/bash.bash ~/.profile
rc

~/.bashrc

Interactive-login
shell as user2

Interactive login
shell as root

## 1. In Bash we can write a simple Hello world! function by including the following code in an
empty file:
function hello() {

- What should we do next to make the function available to the shell?
To make the function availabe to the current shell, we must source the file which includes it.
- Once it is available to the current shell, how would you invoke it?
We will invoke it by typing its name into the terminal.
- To automate things, in what file would you put the function and its invocation so that it gets
executed when user2 opens a terminal from an X Window session? What type of shell is it?
The best file to put it is /home/user2/.bashrc. The invoked shell would be an interactive
non-login one.
- In what file would you put the function and its invocation so that it is run when root
launches a new interactive shell irrespective of whether it is login or not?
In /etc/bash.bashrc since this file gets executed for all interactive shells — whether login
or not.
2. Have a look at the following basic, Hello world! bash script:
#hello_world: a simple bash script to discuss interaction in scripts.

- Suppose we make the script executable and run it. Would that be an interactive script?
Why?
No, as there is no human interaction and no commands being typed in by the user.

- What makes a script interactive?
The fact that it requires user input.
3. Imagine you have changed the values of some variables in ~/.bashrc and want those changes
to take effect without a reboot. From your home directory, how could you achieve that in two
different ways?
$ source .bashrc

$ . .bashrc

## 4. John has just started an X Window session on a Linux server. He opens a terminal emulator to
carry out some administrative tasks but, surprisingly, the session freezes and he needs to open
a text shell.
- How can he open that tty shell?
He could do that by pressing Ctrl + Alt + F1 - F6 to enter one of the six tty shells.
- What startup files will get sourced?
/home/john/.profile
5. Linda is a user of a Linux server. She kindly asks the administrator to have a ~/.bash_login
file so she can have the time and date printed on the screen when she logs in. Other users like
the idea and follow suit. The administrator has a hard time creating the file for all other users
on the server so he decides to add a new policy and have ~/.bash_login created for all
potential new users. How can the administrator accomplish that task?
He could achieve that by putting .bash_login into the /etc/skel directory.

### 105.1 Lesson 2

2 of 3

Think of a variable as an imaginary box in which to temporarily place a piece of information. The
same as with its initialization scripts, Bash classifies variables as either shell/local (those which
live only within the limits of the shell in which they were created) or environment/global (those
that are inherited by children shells and/or processes). In fact, in the previous lesson we had a
look at shells and their configuration or initialization scripts. It is now convenient to point out that
the power of these startup files lies in the fact that they allow us to use variables — as well as
aliases and functions — which help us create and customize the shell environment of our choice.

Variables: Assignment and Reference
A variable can be defined as a name containing a value.
In Bash, giving a value to a name is called variable assignment and it is the way in which we create
or set variables. On the other hand, the process of accessing the value contained in the name is
called variable referencing.
The syntax for assigning variables is:

<variable_name>=<variable_value>

$ distro=zorinos

The variable distro equals zorinos, that is to say, there is a portion of memory holding the
value zorinos — with distro being the pointer to it.
Note, however, that there can not be any space on either side of the equal sign when assigning a
variable:
$ distro =zorinos
-bash: distro: command not found
$ distro= zorinos
-bash: zorinos: command not found

Because of our mistake, Bash read distro and zorinos as commands.
To reference a variable (that is, to check its value) we use the echo command preceding the
variable name with a $ sign:

Variable Names
When choosing the name of variables, there are certain rules that we must take into
consideration.
The name of a variable may contain letters (a-z,A-Z), numbers (0-9) and underscores (_):
$ distro=zorinos
$ DISTRO=zorinos
$ echo $DISTRO
$ distro_1=zorinos

$ echo $distro_1
$ _distro=zorinos
$ echo $_distro

It may not start with a number or Bash will get confused:
$ 1distro=zorinos
-bash: 1distro=zorinos: command not found

It may not contain spaces (not even using quotes); by convention, underscores are used instead:
$ "my distro"=zorinos
-bash: my: command not found
$ my_distro=zorinos
$ echo $my_distro

Variable Values
Concerning the reference or value of variables it is also important to consider a number of rules.
Variables may contain any alphanumerical characters (a-z,A-Z,0-9) as well as most other
characters (?,!,*,.,/, etc.):
$ distro=zorin12.4?
zorin12.4?

Variable values must be enclosed in quotes if they contain single spaces:
$ distro=zorin 12.4
-bash: 12.4: command not found
$ distro="zorin 12.4"
zorin 12.4
$ distro='zorin 12.4'

zorin 12.4

Variable values must also be enclosed in quotes if they contain such characters as those used for
redirection (<,>) or the pipe symbol (|). The only thing the following command does is create an
empty file named zorin:
$ distro=>zorin
$ ls zorin
zorin

This works, though, when we use the quotes:
$ distro=">zorin"
>zorin

However, single and double quotes are not always interchangeable. Depending on what we are
doing with a variable (assigning or referencing), the use of one or the other has implications and
will yield different results. In the context of variable assignment single quotes take all the
characters of the variable value literally, whereas double quotes allow for variable substitution:
$ lizard=uromastyx
$ animal='My $lizard'
$ echo $animal
My $lizard
$ animal="My $lizard"
$ echo $animal
My uromastyx

On the other hand, when referencing a variable whose value includes some initial (or extra)
spaces — sometimes combined with asterisks — it is mandatory that we use double quotes after
the echo command to avoid field splitting and pathname expansion:
$ lizard="

genus

uromastyx"

$ echo $lizard
genus | uromastyx
$ echo "$lizard"

genus

uromastyx

If the reference of the variable contains a closing exclamation mark, this must be the last
character in the string (as otherwise Bash will think we are referring to a history event):
$ distro=zorin.?/!os
-bash: !os: event not found
$ distro=zorin.?/!
zorin.?/!

Any backslashes must be escaped with another backslash. Also, if a backslash is the last character
in the string and we do not escape it Bash will interpret we want a line break and give us a new
line:
$ distro=zorinos\
>
$ distro=zorinos\\
zorinos\

In the next two sections we will sum up the main differences between local and environment
variables.

Local or Shell Variables
Local or shell variables exist only in the shell in which they are created. By convention, local
variables are written in lower-case letters.
For the sake of carrying out a few tests, let us create a local variable. As explained above, we
choose an appropriate variable name and equate it to an appropriate value. For instance:
$ reptile=tortoise

Let us now use the echo command to reference our variable and check that everything went as
expected:

tortoise

In certain scenarios — such as when writing scripts — immutability can be an interesting feature
of variables. If we want our variables to be immutable, we can either create them readonly:
$ readonly reptile=tortoise

Or turn them so after they have been created:
$ reptile=tortoise
$ readonly reptile

Now, if we try to change the value of reptile, Bash will refuse:
$ reptile=lizard
-bash: distro: readonly variable

To list all readonly variables in our current session, type readonly or readonly
-p into the terminal.

A useful command when dealing with local variables is set.
set outputs all of the currently assigned shell variables and functions. Since that can be a lot of
lines (try it yourself!), it is recommended to use it in combination with a pager such as less:
$ set | less
BASH=/bin/bash
BASHOPTS=checkwinsize:cmdhist:complete_fullquote:expand_aliases:extglob:extquote:force_figno
re:histappend:interactive_comments:login_shell:progcomp:promptvars:sourcepath
BASH_ALIASES=()
BASH_ARGC=()
BASH_ARGV=()
BASH_CMDS=()
BASH_COMPLETION_COMPAT_DIR=/etc/bash_completion.d
BASH_LINENO=()
BASH_SOURCE=()
BASH_VERSINFO=([0]="4" [1]="4" [2]="12" [3]="1" [4]="release" [5]="x86_64-pc-linux-gnu")
BASH_VERSION='4.4.12(1)-release'

Is our reptile variable there?
$ set | grep reptile
reptile=tortoise

Yes, there it is!
However, reptile — being a local variable — will not be inherited by any child processes
spawned from the current shell:
$ bash
$ set | grep reptile

And, of course, we cannot echo out its value either:

By typing the bash command into the terminal we open a new (child) shell.

To unset any variables (either local or global), we use the unset command:
tortoise
$ unset reptile

unset must be followed by the name of the variable alone (not preceded by the $
symbol).

Global or Environment Variables
Global or environment variables exist for the current shell as well as for all subsequent processes
spawned from it. By convention, environment variables are written in uppercase letters:
$ echo $SHELL

We can recursively pass the value of these variables to other variables and the value of the latter
will ultimately expand to that of the former:
$ my_shell=$SHELL
$ echo $my_shell
$ your_shell=$my_shell
$ echo $your_shell
$ our_shell=$your_shell
$ echo $our_shell

In order for a local shell variable to become an environment variable, the export command must
be used:
$ export reptile

With export reptile we have turned our local variable into an environment variable so that
child shells can recognize it and use it:
$ bash
tortoise

Likewise, export can be used to set and export a variable, all at once:
$ export amphibian=frog

Now we can open a new instance of Bash and successfully reference the new variable:
$ bash
$ echo $amphibian
frog

With export -n <VARIABLE-NAME> the variable will be turned back into a local

shell variable.
The export command will also give us a list of all existing environment variables when typed on
its own (or with the -p option):
$ export
declare -x HOME="/home/user2"
declare -x LANG="en_GB.UTF-8"
declare -x LOGNAME="user2"
declare -x PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games"
declare -x PWD="/home/user2"
declare -x SHELL="/bin/bash"
declare -x SHLVL="1"
declare -x SSH_CLIENT="192.168.1.10 49330 22"
declare -x SSH_CONNECTION="192.168.1.10 49330 192.168.1.7 22"
declare -x SSH_TTY="/dev/pts/0"
declare -x TERM="xterm-256color"
declare -x USER="user2"
declare -x XDG_RUNTIME_DIR="/run/user/1001"
declare -x XDG_SESSION_ID="8"
declare -x reptile="tortoise"

The command declare -x is equivalent to export.

Two more commands that can be used to print a list of all environment variables are env and
printenv:
$ env
SSH_CONNECTION=192.168.1.10 48678 192.168.1.7 22
LANG=en_GB.UTF-8
XDG_SESSION_ID=3
USER=user2
PWD=/home/user2
HOME=/home/user2
SSH_CLIENT=192.168.1.10 48678 22
SSH_TTY=/dev/pts/0
MAIL=/var/mail/user2
TERM=xterm-256color
SHELL=/bin/bash
SHLVL=1
LOGNAME=user2
XDG_RUNTIME_DIR=/run/user/1001

PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
_=/usr/bin/env

On top of being a synonym for env, we can sometimes use printenv in a similar way as we use
the echo command to check for the value of a variable:
$ echo $PWD
$ printenv PWD

Note, however, that with printenv the variable name is not preceded by $.

PWD stores the path of the present working directory. We will learn about this and
other common environment variables later.

Running a Program in a Modified Environment
env can be used to modify the shell environment at a program’s time of execution.
To start a new Bash session with as empty an environment as possible — clearing most variables
(as well as functions and aliases) — we will use env with the -i option:
$ env -i bash

Now most of our environment variables are gone:
$ echo $USER

And only a few remain:
$ env
LS_COLORS=
PWD=/home/user2
SHLVL=1
_=/usr/bin/printenv

We can also use env to set a particular variable for a particular program.

In our previous lesson, when discussing non-interactive non-login shells, we saw how scripts do
not read any standard startup files but instead they look for the value of the BASH_ENV variable
and use it as their startup file if it exists.
Let us demonstrate this process:
1. We create our own startup file called .startup_script with the following content:
CROCODILIAN=caiman

## 2. We write a Bash script named test_env.sh with the following content:
echo $CROCODILIAN

## 3. We set the executable bit for our test_env.sh script:
$ chmod +x test_env.sh

## 4. Finally, we use env to set BASH_ENV to .startup_script for test_env.sh:
$ env BASH_ENV=/home/user2/.startup_script ./test_env.sh
caiman

The env command is implicit even if we get rid of it:
$ BASH_ENV=/home/user2/.startup_script ./test_env.sh
caiman

If you do not understand the line #!/bin/bash or the chmod +x command, do not
panic! We will learn everything necessary about shell scripting in future lessons.
For now, just remember that to execute a script from within its own directory we
use ./some_script.

Common Environment Variables
Time now for reviewing some of the most relevant environment variables that are set in Bash

configuration files.
DISPLAY
Related to the X server, this variable’s value is normally made up of three elements:
- The hostname (the absence of it means localhost) where the X server is running.
- A colon as a delimiter.
- A number (it is normally 0 and refers to the computer’s display).
$ printenv DISPLAY
:0

An empty value for this variable means a server without an X Window System. An extra
number — as in my.xserver:0:1 — would refer to the screen number if more than one
exists.
HISTCONTROL
This variable controls what commands get saved into the HISTFILE (see below). Their are
three possible values:
ignorespace
Commands starting with a space will not be saved.
ignoredups
A command which is the same as the previous one will not be saved.
Commands which fall into any of the two previous categories will not be saved.
$ echo $HISTCONTROL

HISTSIZE
This sets the number of commands to be stored in memory while the shell session lasts.
$ echo $HISTSIZE
1000

HISTFILESIZE
This sets the number of commands to be saved in HISTFILE both at the start and at the end of
the session:
$ echo $HISTFILESIZE
2000

HISTFILE
The name of the file which stores all commands as they are typed. By default this file is located
at ~/.bash_history:
$ echo $HISTFILE
/home/user2/.bash_history

To view the contents of HISTFILE, we simply type history. Alternatively, we
can specify the number of commands we want to see by passing an argument
(the number of the most recent commands) to history as in history 3.

HOME
This variable stores the absolute path of the current user’s home directory and it is set when
the user logs in.
This piece of code — from ~/.profile — is self-explanatory (it sources "$HOME/.bashrc" if it
exists):
if [ -f "$HOME/.bashrc" ]; then
. "$HOME/.bashrc"

If you do not quite understand the if statement, do not worry: just refer to the
lessons about shell scripting.

Remember that ~ is equivalent to $HOME:
$ echo ~; echo $HOME

Commands can be concatenated with a semicolon (;).

We can also prove this with an if statement:
$ if [ ~ == "$HOME" ]; then echo "true"; else echo "false"; fi
true

Remember: The equals sign = is used for variable assignment. == is used to test
for equality.

HOSTNAME
This variable stores the TCP/IP name of the host computer:
$ echo $HOSTNAME

HOSTTYPE
This stores the architecture of the host computer’s processor:
$ echo $HOSTTYPE
x86_64

LANG
This variable saves the locale of the system:
$ echo $LANG
en_UK.UTF-8

LD_LIBRARY_PATH
This variable consists of a colon-separated set of directories where shared libraries are shared
by programs:
$ echo $LD_LIBRARY_PATH
/usr/local/lib

MAIL
This variable stores the file in which Bash searches for email:

$ echo $MAIL
/var/mail/carol

Another common value for this variable is /var/spool/mail/$USER.
MAILCHECK
This variable stores a numeric value which indicates in seconds the frequency with which Bash
checks for new mail:
$ echo $MAILCHECK

PATH
This environment variable stores the list of directories where Bash looks for executable files
when told to run any program. In our example machine this variable is set through the systemwide /etc/profile file:
if [ "`id -u`" -eq 0 ]; then
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games"
export PATH

Through the if statement the identity of the user is tested and — depending on the result of the
test (root or otherwise) — we will obtain one PATH or the other. Finally the chosen PATH is
propagated with export.
Observe two things regarding the value of PATH:
- Directory names are written using absolute paths.
- The colon is used as a delimiter.
If we wanted to include the folder /usr/local/sbin in the PATH for regular users, we will
modify the line so that it looks like this:
PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/local/sbin"

export PATH

Now we can see how the value of the variable changes when we login as a regular user:
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/local/sbin

We could have also added /usr/local/sbin to the user’s PATH at the
command line by typing either PATH=/usr/local/sbin:$PATH or
PATH=$PATH:/usr/local/sbin — the former making /usr/local/sbin
the first directory to be searched for executable files; the latter making it the
last.

PS1
This variable stores the value of the Bash prompt. In the following chunk of code (also from
/etc/profile), the if statement tests for the identity of the user and gives them a very
discrete prompt accordingly ( # for root or $ for regular users):
if [ "`id -u`" -eq 0 ]; then
PS1='# '
PS1='$ '

The id of root is 0. Become root and test it yourself with id -u.

Other Prompt Variables include:
PS2
Normally set to > and used as a continuation prompt for long multiline commands.
PS3
Used as the prompt for the select command.
PS4
Normally set to + and used for debugging.

SHELL
This variable stores the absolute path of the current shell:
$ echo $SHELL

This stores the name of the current user:
$ echo $USER

## 1. Observe the variable assignment under the “Command(s)” column and indicate if the resulting
variable is “Local” or “Global”:

Global

debian=mother
ubuntu=deb-based
mint=ubuntu-based;
export mint
export suse=rpm-based
zorin=ubuntu-based
2. Study the “Command” and the “Output” and explain the meaning:

Output

echo $HISTCONTROL

echo ~

echo $DISPLAY

reptilium:0:2

echo $MAILCHECK

echo $HISTFILE

/home/carol/.bash_histor
y

## 3. Variables are being set incorrectly under the “Wrong Command” column. Provide the missing
information under “Right Command” and “Variable Reference” so that we get the “Expected
Output”:
Wrong Command

Right Command

Variable Reference

Expected Output

lizard =chameleon

cool
lizard=chameleon

lizard=cha|me|leon

cha|me|leon

lizard=/**
chameleon **/

/** chamelon **/

Wrong Command

Right Command

Variable Reference

win_path=C:\path\t
o\dir\

Expected Output
C:\path\to\dir\

## 4. Consider the purpose and write the appropriate command:

Set the language of the current shell to
Spanish UTF-8 (es_ES.UTF-8).
Print the name of the current working
directory.
Reference the environment variable which
stores the information about ssh connections.
Set PATH to include /home/carol/scripts as
the last directory to search for executables.
Set the value of my_path to PATH.
Set the value of my_path to that of PATH.
5. Create a local variable named mammal and assign it the value gnu:

## 6. Using variable substitution, create another local variable named var_sub with the appropriate
value so that when referenced via echo $var_sub we obtain: The value of mammal is
gnu:

7. Turn mammal into an environment variable:

8. Search for it with set and grep:

9. Search for it with env and grep:

## 10. Create, in two consecutive commands, an environment variable named BIRD whose value is
penguin:

## 11. Create, in a single command, an environment variable named NEW_BIRD whose value is
yellow-eyed penguin:

12. Assuming you are user2, create a folder named bin in your home directory:

## 13. Type the command to add the ~/bin folder to your PATH so that it is the first directory bash
searches for binaries:

## 14. To guarantee the value of PATH remains unaltered across reboots, what piece of code — in the
form of an if statement — would you put into ~/.profile?

1. let: more than arithmetic expression evaluation:
- Do a manpage or web search for let and its implications when setting variables and create
a new local variable named my_val whose value is 10 — as a result of adding 5 and 5:

- Now create another variable named your_val whose value is 5 — as a result of dividing the
value of my_val into 2:

## 2. The result of a command in a variable? Of course, that is possible; it is called command
substitution. Investigate it and study the following function named music_info:
music_info(){
echo -e "Your latest 5 music files:\n$latest_music"

The result of the command ls -l1t ~/Music | head -n 6 becomes the value of the
variable latest_music. Then the variable latest_music is referenced in the echo command
(which outputs the total number of bytes occupied by the Music folder and the latest five music
files stored in the Music folder — one per line).
Which of the following is a valid synonym for

Option A:
latest_music=$(ls -l1t ~/Music| head -n 6)

Option B:
latest_music="(ls -l1t ~/Music| head -n 6)"

Option C:

latest_music=((ls -l1t ~/Music| head -n 6))

In this lesson we learned:
- Variables are a very important part of the shell environment as they are used by the shell itself
as well as by other programs.
- How to assign and reference variables.
- The differences between local and global (or environment) variables.
- How to make variables readonly.
- How to turn a local variable into an environment variable with the export command.
- How to list all environment variables.
- How to run a program in a modified environment.
- How to make variables persistent with the help of startup scripts.
- Some common environment variables: DISPLAY, HISTCONTROL, HISTSIZE, HISTFILESIZE,
HISTFILE, HOME, HOSTNAME, HOSTTYPE, LANG, LD_LIBRARY_PATH, MAIL, MAILCHECK, PATH, PS1
(and other prompt variables), SHELL and USER.
- The meaning of the tilde (~).
- The very basics of if statements.
echo
Reference a variable.
ls
List directory contents.
readonly
Make variables immutable. List all readonly variables in current session.
set
List all variables and functions in current session.
Print lines matching a pattern.

Launch a new shell
unset
Unset variables.
export
Turn a local variable into an environment variable. List environment variables.
env
List environment variables. Run a program in a modified environment.
printenv
List environment variables. Reference a variable.
Change mode bits of a file, for example make it executable.
history
List previous commands.
Change user ID or become superuser.
id
Print user ID.

## 1. Observe the variable assignment under the “Command(s)” column and indicate if the resulting
variable is “Local” or “Global”:

Global

debian=mother

ubuntu=deb-based

mint=ubuntu-based;
export mint

export suse=rpm-based

zorin=ubuntu-based

## 2. Study the “Command” and the “Output” and explain the meaning:

Output

echo $HISTCONTROL

Both duplicate commands and
those starting with a space
will not be saved in history.

echo ~

The HOME of carol is
/home/carol.

echo $DISPLAY

reptilium:0:2

reptilium machine has a X
server running and we are
using the second screen of the
display.

echo $MAILCHECK

Mail will be checked every
minute.

echo $HISTFILE

/home/carol/.bash_histor history will be saved in
y
/home/carol/.bash_histor
y.

## 3. Variables are being set incorrectly under the “Wrong Command” column. Provide the missing
information under “Right Command” and “Variable Reference” so that we get the “Expected
Output”:

Wrong Command

Right Command

Variable Reference

Expected Output

lizard =chameleon

lizard=chameleon

echo $lizard

cool
lizard=chameleon

cool_lizard=chamel echo $cool_lizard
eon (for example)

lizard=cha|me|leon lizard="cha|me|leo echo $lizard
n" or
lizard='cha|me|leo
n'

cha|me|leon

lizard=/**
chameleon **/

echo "$lizard"

/** chamelon **/

win_path=C:\path\t win_path=C:\\path\ echo $win_path
o\dir\
\to\\dir\\

C:\path\to\dir\

lizard="/**
chameleon **/" or
lizard='/**
chameleon **/'

## 4. Consider the purpose and write the appropriate command:

Set the language of the current shell to
Spanish UTF-8 (es_ES.UTF-8).

LANG=es_ES.UTF-8

Print the name of the current working
directory

echo $PWD or pwd

Reference the environment variable which
stores the information about ssh connections

echo $SSH_CONNECTION

Set PATH to include /home/carol/scripts as PATH=$PATH:/home/carol/scripts
the last directory to search for executables.
Set the value of my_path to PATH.

my_path=PATH

Set the value of my_path to that of PATH.

my_path=$PATH

## 5. Create a local variable named mammal and assign it the value gnu:
mammal=gnu

## 6. Using variable substitution, create another local variable named var_sub with the appropriate
value so that when referenced via echo $var_sub we obtain The value of mammal is gnu:

var_sub="The value of mammal is $mammal"

## 7. Turn mammal into an environment variable:
export mammal

## 8. Search for it with set and grep:
set | grep mammal

## 9. Search for it with env and grep:
env | grep mammal

## 10. Create, in two consecutive commands, an environment variable named BIRD whose value is
penguin:
BIRD=penguin; export BIRD

## 11. Create, in a single command, an environment variable named NEW_BIRD whose value is
yellow-eyed penguin:
export NEW_BIRD="yellow-eyed penguin"

export NEW_BIRD='yellow-eyed penguin'

## 12. Assuming you are user2, use mkdir to create a folder named bin in your home directory:
mkdir ~/bin

mkdir /home/user2/bin

mkdir $HOME/bin

## 13. Type the command to add the ~/bin folder to your PATH so that it is the first directory bash
searches for binaries:
PATH="$HOME/bin:$PATH"

PATH=~/bin:$PATH or PATH=/home/user2/bin:$PATH are equally valid.
14. To guarantee the value of PATH remains unaltered across reboots, what piece of code — in the
form of an if statement — would you put into ~/.profile?
if [ -d "$HOME/bin" ] ; then
PATH="$HOME/bin:$PATH"

1. let: more than arithmetic expression evaluation:
- Do a manpage or web search for let and its implications when setting variables and create
a new local variable named my_val whose value is 10 — as a result of adding 5 and 5:
let "my_val = 5 + 5"

let 'my_val = 5 + 5'

- Now create another variable named your_val whose value is 5 — as a result of dividing the
value of my_val into 2:
let "your_val = $my_val / 2"

let 'your_val = $my_val / 2'

## 2. The result of a command in a variable? Of course, that is possible; it is called command
substitution. Investigate it and study the following function named music_info:
music_info(){
echo -e "Your latest 5 music files:\n$latest_music"

The result of the command ls -l1t ~/Music | head -n 6 becomes the value of the
variable latest_music. Then the variable latest_music is referenced in the echo command
(which outputs the total number of bytes occupied by the Music folder and the latest five music
files stored in the Music folder — one per line).
Which of the following is a valid synonym for

It is option A:
latest_music=$(ls -l1t ~/Music| head -n 6)

### 105.1 Lesson 3

3 of 3

After going through shells, startup scripts and variables in the previous lessons, we will round the
whole topic of customizing the shell off by having a look at two very interesting shell elements:
aliases and functions. In fact the entire group of variables, aliases and functions — and their
influence on one another — is what makes up the shell environment.
The main strength of these two flexible and time-saving shell facilities has to do with the concept
of encapsulation: they offer the possibility of putting together — under a single command — a
series of repetitive or recurrent commands.

Creating Aliases
An alias is a substitute name for another command(s). It can run like a regular command, but
instead executes another command according to the alias definition.
The syntax for declaring aliases is quite straightforward. Aliases are declared by writing the
keyword alias followed by the alias assignment. In turn, the alias assignment consists of the alias
name, an equal sign and one or more commands:

alias alias_name=command(s)

$ alias oldshell=sh

This awkward alias will start an instance of the original sh shell when the user types oldshell
into the terminal:
$ oldshell

The power of aliases lies in that they allow us to write short versions of long commands:
$ alias ls='ls --color=auto'

For information about ls and its colors, type man dir_colors into the terminal.

Likewise, we can create aliases for a series of concatenated commands — the semicolon (;) is used
as a delimiter. We can, for instance, have an alias that gives us information about the location of
the git executable and its version:
$ alias git_info='which git;git --version'

To invoke an alias, we type its name into the terminal:
$ git_info
/usr/bin/git
git version 2.7.4

The alias command will produce a listing of all available aliases in the system:
$ alias
alias git-info='which git;git --version'
alias ls='ls --color=auto'
alias oldshell='sh'

The unalias command removes aliases. We can, for instance, unalias git-info and see how it
disappears from the listing:
$ unalias git-info
$ alias
alias ls='ls --color=auto'
alias oldshell='sh'

As we saw with the alias hi='echo We salute you.' in a previous lesson, we must enclose
commands in quotes (either single or double) when — as a result of having arguments or
parameters — they contain spaces:
$ alias greet='echo Hello world!'
Hello world!

Commands with spaces include also those with options:
$ alias ll='ls -al'

Now ll will list all files — including the hidden ones (a) — in the long format (l).
We can reference variables in aliases:
$ reptile=uromastyx
$ alias greet='echo Hello $reptile!'
Hello uromastyx!

The variable can also be assigned within the alias:
$ alias greet='reptile=tortoise; echo Hello $reptile!'
Hello tortoise!

We can escape an alias with \:
$ alias where?='echo $PWD'

$ \where?
-bash: where?: command not found

Escaping an alias is useful when an alias has the same name as a regular command. In this case,
the alias takes precedence over the original command, which, however, is still be accessible by
escaping the alias.
Likewise, we can put an alias inside another alias:
$ alias my_home=where?
$ my_home

On top of that, we can also put a function inside an alias as you will be shown below.

Expansion and Evaluation of Quotes in Aliases
When using quotes with environment variables, single quotes make the expansion dynamic:
$ alias where?='echo $PWD'
$ cd Music
/home/user2/Music

However, with double quotes the expansion is done statically:
$ alias where?="echo $PWD"
$ cd Music

Persistence of Aliases: Startup Scripts
Just as with variables, for our aliases to gain persistence, we must put them into initialization
scripts that are sourced at startup. As we already know, a good file for users to put their personal
aliases in is ~/.bashrc. You will probably find some aliases there already (most of them
commented out and ready to be used by removing the leading #):
$ grep alias .bashrc
alias ls='ls --color=auto'
#alias dir='dir --color=
#alias vdir='vdir --color=
#alias grep='grep --color=
#alias fgrep='fgrep --color'
#alias egrep='egrep --color=
#ll='ls -al'
#alias la='ls -A'
#alias l='ls -CF'
if [ -f ~/.bash_aliases ]; then
. ~/.bash_aliases

As you can read in the last three lines, we are offered the possibility of having our own aliasdedicated file — ~/.bash_aliases — and have it sourced by .bashrc with every system start. So
we can go for that option and create and populate such file:
###########
###########
alias git_info='which git;git --version'
alias greet='echo Hello world!'
alias ll='ls -al'
alias where?='echo $PWD'

Creating Functions
Compared to aliases, functions are more programmatic and flexible, specially when it comes to
exploiting the full potential of Bash special built-in variables and positional parameters. They are
also great to work with flow control structures such as loops or conditionals. We can think of a

function as a command which includes logic through blocks or collections of other commands.

Two Syntaxes for Creating Functions
There are two valid syntaxes to define functions.
Using the keyword function
On the one hand, we can use the keyword function, followed by the name of the function and
the commands between curly brackets:
function function_name {
command #1
command #2
command #3
command #n

Using ()
On the other, we can leave out the keyword function and use two brackets right after the
name of the function instead:
function_name() {
command #1
command #2
command #3
command #n

It is commonplace to put functions in files or scripts. However, they can also be written directly
into the shell prompt with each command on a different line — note PS2(>) indicating a new line
after a line break:
$ greet() {
> greeting="Hello world!"

> echo $greeting
> }

Whatever the case — and irrespective of the syntax we choose — , if we decide to skip line breaks
and write a function in just one line, commands must be separated by semicolons (note the
semicolon after the last command too):
$ greet() { greeting="Hello world!"; echo $greeting; }

bash did not complain when we pressed Enter, so our function is ready to be invoked. To invoke a
function, we must type its name into the terminal:
Hello world!

Just as with variables and aliases, if we want functions to be persistent across system reboots we
have to put them into shell initialization scripts such as /etc/bash.bashrc (global) or
~/.bashrc (local).

After adding aliases or functions to any startup script file, you should source
such files with either . or source for the changes to take effect if you do not
want to logout and back in again or reboot the system.

Bash Special Built-in Variables
The Bourne Again Shell comes with a set of special variables which are particularly useful for
functions and scripts. These are special because they can only be referenced — not assigned. Here
is a list of the most relevant ones:
$?
This variable’s reference expands to the result of the last command run. A value of 0 means
success:
$ ps aux | grep bash

0.4

21156

5012 pts/0

Ss

17:10

640

12784

936 pts/0

18:04

0:00 grep bash

$ echo $?

A value other than 0 means error:
user1@debian:~$ ps aux |rep bash
-bash: rep: command not found
user1@debian:~$ echo $?
127

$$
It expands to the shell PID (process ID):
$ ps aux | grep bash

0.4

21156

5012 pts/0

Ss

17:10

640

12784

936 pts/0

18:04

0:00 grep bash

$ echo $$

$!
It expands to the PID of the last background job:
$ ps aux | grep bash &
[1] 663
$ user2

663

0.4

21156
12784

5012 pts/0
972 pts/0

Ss+
S

17:10
18:08

0:00 grep bash

^C
[1]+

Done

ps aux | grep bash

$ echo $!
663

Remember, the ampersand (&) is used to start processes in the background.

Positional parameters $0 through $9
They expand to the parameters or arguments being passed to the function (alias or script) — $0
expanding to the name of the script or shell.
Let us create a function to demonstrate positional parameters — note PS2 (>) indicating new
lines after line breaks:
$ special_vars() {
> echo $0
> echo $1

> echo $2
> echo $3

Now, we will invoke the function (special_vars) passing three parameters to it (debian,
ubuntu, zorin):
$ special_vars debian ubuntu zorin
ubuntu
zorin

It worked as expected.
Although passing positional parameters to aliases is technically possible, it
is not at all functional since — with aliases — positional parameters are
always passed at the end:
$ alias great_editor='echo $1 is a great text editor'
$ great_editor emacs
is a great text editor emacs

Other Bash special built-in variables include:
$#
It expands to the number of arguments passed to the command.
$@, $*
They expand to the arguments passed to the command.
$_
It expands to the last parameter or the name of the script (amongst other things; see man bash
to find out more!):

Variables in Functions
Of course, variables can be used within functions.
To prove it, this time we will create a new empty file called funed and put the following function

into it:
echo "My editor is: $editor. $editor is a fun text editor."

As you may have guessed by now, we must source the file first to be able to invoke the function:

And now we can test it:
$ editors
My editor is emacs. emacs is a fun text editor.

As you can appreciate, for the editors function to work properly, the editor variable must first
be set. The scope of that variable is local to the current shell and we can reference it as long as the
session lasts:
$ echo $editor
emacs

Together with local variables we can also include environment variables in our function:
editors

Note how this time we decided to call the function from within the file itself (editors in the last
line). That way, when we source the file, the function will also be invoked — all at once:

Positional Parameters in Functions
Something similar occurs with positional parameters.
We can pass them to functions from within the file or script (note the last line: editors
tortoise):
echo "Bash is not a $1 shell."
editors tortoise

We source the file and prove it works:
Bash is not a tortoise shell.

And we can also pass positional parameters to functions at the command line. To prove it, we get
rid of the last line of the file:
echo "Bash is not a $1 shell."

Then, we have to source the file:

Finally, we invoke the function with tortoise as the positional parameter $1 at the command
line:
$ editors tortoise
Bash is not a tortoise shell.

Functions in Scripts
Functions are mostly found in Bash scripts.
Turning our funed file into a script (we will name it funed.sh) is really a piece of cake:
echo "Bash is not a $1 shell."
editors tortoise

That is it! We only added two lines:
- The first line is the shebang and defines what program is going to interpret the script:
#!/bin/bash. Curiously enough, that program is bash itself.
- The last line is simply the invocation of the function.
Now there is only one thing left — we have to make the script executable:
$ chmod +x funed.sh

And now it is ready to be executed:

$ ./funed.sh
Bash is not a tortoise shell.

You will learn all about shell scripting in the next few lessons.

A Function within an Alias
As said above, we can put a function inside an alias:
$ alias great_editor='gr8_ed() { echo $1 is a great text editor; unset -f gr8_ed; }; gr8_ed'

This long alias value deserves an explanation. Let us break it down:
- First there is the function itself: gr8_ed() { echo $1 is a great text editor; unset
-f gr8_ed; }
- The last command in the function — unset -f gr8_ed — unsets the function so that it does
not remain in the present bash session after the alias is called.
- Last but not least, to have a successful alias invocation, we must first invoke the function too:
gr8_ed.
Let us invoke the alias and prove it works:
$ great_editor emacs
emacs is a great text editor

As shown in unset -f gr8_ed above, the unset command is not only used to unset variables,
but also functions. In fact, there are specific switches or options:
unset -v
for variables
unset -f
for functions
If used without switches, unset will try to unset a variable first and — if it fails — then it will try to
unset a function.

A Function within a Function
Now say we want to communicate two things to user2 every time she logs into the system:
- Say hello and recommend/praise a text editor.
- Since she is starting to put a lot of Matroska video files in its $HOME/Video folder, we also want
to give her a warning.
To accomplish that purpose,
/home/user2/.bashrc:

we

have

put

following

two

functions

into

The first function (check_vids) does the checking on .mkv files and the warning:
check_vids() {
ls -1 ~/Video/*.mkv > /dev/null 2>&1
if [ "$?" = "0" ];then
echo -e "Remember, you must not keep more than 5 video files in your Video
folder.\nThanks."
echo -e "You do not have any videos in the Video folder. You can keep up to 5.\nThanks."

check_vids does three things:
- It lists the mkv files in ~/Video sending the output — and any errors — to the so-called bitbucket (/dev/null).
- It tests the output of the previous command for success.
- Depending on the result of the test, it echoes one of two messages.
The second function is a modified version of our editors function:
echo "Hi, $USER!"
echo "$editor is more than a text editor!"
check_vids

editors

It is important to observe two things:
- The last command of editors invokes check_vids so both functions get chained: The
greeting, praise and the checking and warning are executed in sequence.
- editors itself is the entry point to the sequence of functions so it is invoked in the last line
(editors).
Now, let us log in as user2 and prove it works:
Hi, user2!
emacs is more than a text editor!
Remember, you must not keep more than 5 video files in your Video folder.
Thanks.

## 1. Complete the table with “Yes” or “No” considering the capabilities of aliases and functions:
Feature

Aliases?

Functions?

Local variables can be used
Environment variables can be
used
Can be escaped with \
Can be recursive
Very productive when used
with positional parameters
2. Enter the command that list all aliases in your system:

3. Write an alias named logg that lists all ogg files in ~/Music — one per line:

4. Invoke the alias to prove it works:

5. Now, modify the alias so that it echoes out the session’s user and a colon before the listing:

6. Invoke it again to prove this new version also works:

7. List all aliases again and check your logg alias appears in the listing:

8. Remove the alias:

## 9. Study the columns “Alias Name” and “Aliased Command(s)`” and assign the aliases to their
values correctly:

Alias Name

Aliased Command(s)

b

bash_info

which bash + echo
"$BASH_VERSION"

kernel_info

uname -r

greet

echo Hi, $USER!

computer

pc=slimbook + echo My
computer is a $pc

Alias Assignment

## 10. As root, write a function called my_fun in /etc/bash.bashrc. The function must say hello to
the user and tell them what their path is. Invoke it so that the user gets both messages every
time they log in:

11. Login as user2 to check it works:

12. Write the same function in just one line:

13. Invoke the function:

14. Unset the function:

## 15. This is a modified version of the special_vars function:
$ special_vars2() {
> echo $#
> echo $1
> echo $4
> echo $6
> echo $7
> echo $@
> echo $?

> }

This is the command we use to invoke it:
$ special_vars2 crying cockles and mussels alive alive oh

Guess the outputs:
Reference

echo $#
echo $1
echo $4
echo $6
echo $7
echo $@
echo $?
16. Based on the sample function (check_vids) in the section “A Function within a Function”,
write a function named check_music to include into a bash startup script that accepts
positional parameters so that we can modify easily:
- the type of file being checked: ogg
- the directory in which files are saved: ~/Music
- the type of file being kept: music
- the number of files being saved: 7

## 1. Read-only functions are those whose contents we cannot modify. Do a research on readonly
functions and complete the following table:
Function Name

Make it readonly

List all readonly Functions

## 2. Search the web for how to modify PS1 and anything else you may need to write a function
called fyi (to be placed in a startup script) which gives the user the following information:
- name of the user
- home directory
- name of the host
- operating system type
- search path for executables
- mail directory
- how often mail is checked
- how many shells deep the current session is
- prompt (you should modify it so that it shows <user>@<host-date>)

- Both aliases and functions are important features of the shell that allow us to encapsulate
recurrent blocks of code.
- Aliases are useful to have shorter versions of long and/or complicated commands.
- Functions are procedures that implement logic and allow us to automate tasks, specially when
used in scripts.
- The syntax to write aliases and functions.
- How to concatenate various commands by means of the semicolon (;).
- How to properly use quotes with aliases.
- How to make aliases and functions persistent.
- Bash special built-in variables: $?, $$, $!, positional parameters ($0-$9), $#, $@, $* and $_.
- How to use variables and positional parameters with functions.
- How to use functions in scripts.
- How to invoke a function from an alias.
- How to invoke a function from another function.
- The basics for creating a bash script.
Commands and keywords used in this lesson:
Create aliases.
unalias
Remove aliases.
cd
Change directory.
Print lines matching a pattern.
function
Shell keyword to create functions.

source
ps
Report a snapshot of the current processes.
echo
Display a line of text.
Change mode bits of a file, for example make it executable.
unset
Unset variables and functions.
Change user ID or become superuser.

## 1. Complete the table with “Yes” or “No” considering the capabilities of aliases and functions:
Feature

Aliases?

Functions?

Local variables can be used

Environment variables can be Yes
used

Can be escaped with \

Can be recursive

Very productive when used
with positional parameters

2. Enter the command that list all aliases in your system:

## 3. Write an alias named logg that lists all ogg files in ~/Music — one per line:
alias logg='ls -1 ~/Music/*ogg'

## 4. Invoke the alias to prove it works:
logg

## 5. Now, modify the alias so that it echoes out the session’s user and a colon before the listing:
alias logg='echo $USER:; ls -1 ~/Music/*ogg'

## 6. Invoke it again to prove this new version also works:
logg

## 7. List all aliases again and check your logg alias appears in the listing:

## 8. Remove the alias:
unalias logg

## 9. Study the columns “Alias Name” and “Aliased Command(s)” and assign the aliases to their
values correctly:
Alias Name

Aliased Command(s)

Alias Assignment

b

alias b=bash

bash_info

which bash + echo
"$BASH_VERSION"

alias bash_info='which
bash; echo
"$BASH_VERSION"'

kernel_info

uname -r

alias kernel_info='uname
-r'

greet

echo Hi, $USER!

alias greet='echo Hi,
$USER'

computer

pc=slimbook + echo My
computer is a $pc

computer='pc=slimbook;
echo My computer is a
$pc'

Single quotes can also be replaced by double ones.

## 10. As root, write a function called my_fun in /etc/bash.bashrc. The function must say hello to
the user and tell them what their path is. Invoke it so that the user gets both messages every
time they log in:
Option A:
my_fun() {
echo Hello, $USER!
echo Your path is: $PATH

Option B:
function my_fun {
echo Hello, $USER!
echo Your path is: $PATH

## 11. Login as user2 to check it works:
su - user2

## 12. Write the same function in just one line:
Option A:
my_fun() { echo "Hello, $USER!"; echo "Your path is: $PATH"; }

Option B:
function my_fun { echo "Hello, $USER!"; echo "Your path is: $PATH"; }

13. Invoke the function:

## 14. Unset the function:
unset -f my_fun

## 15. This is a modified version of the special_vars function:
$ special_vars2() {
> echo $#
> echo $1
> echo $4
> echo $6

> echo $7
> echo $@
> echo $?
> }

This is the command we use to invoke it:
$ special_vars2 crying cockles and mussels alive alive oh

Guess the outputs:
Reference

echo $#

echo $1

crying

echo $4

mussels

echo $6

alive

echo $7

oh

oh

echo $@

crying cockles and mussels alive
alive oh

echo $?

## 16. Based on the sample function (check_vids) in section “A Function within a Function”, write a
function named check_music to include into a bash startup script that accepts positional
parameters so that we can modify easily:
- the type of file being checked: ogg
- the directory in which files are saved: ~/Music
- the type of file being kept: music
- the number of files being saved: 7
check_music() {
ls -1 ~/$1/*.$2 > ~/.mkv.log 2>&1
if [ "$?" = "0" ];then

echo -e "Remember, you must not keep more than $3 $4 files in your $1
folder.\nThanks."
echo -e "You do not have any $4 files in the $1 folder. You can keep up to
$3.\nThanks."
check_music Music ogg 7 music

## 1. Read-only functions are those whose contents we cannot modify. Do a research on readonly
functions and complete the following table:
Function Name

Make it readonly

List all readonly Functions

readonly -f my_fun

readonly -f

## 2. Search the web for how to modify PS1 and anything else you may need to write a function
called fyi (to be placed in a startup script) which gives the user the following information:
- name of the user
- home directory
- name of the host
- operating system type
- search path for executables
- mail directory
- how often mail is checked
- how many shells deep the current session is
- prompt (you should modify it so that it shows <user>@<host-date>)
fyi() {
echo -e "For your Information:\n
Username: $USER
Home directory: $HOME
Host: $HOSTNAME
Operating System: $OSTYPE
Path for executable files: $PATH
Your mail directory is $MAIL and is searched every $MAILCHECK seconds.
The current level of your shell is: $SHLVL"
PS1="\u@\h-\d "
fyi

### 105.2 Customize or write simple scripts
LPIC-1 5.0, Exam 102, Objective 105.2
- Use standard sh syntax (loops, tests).
- Use command substitution.
- Test return values for success or failure or other information provided by a command.
- Execute chained commands.
- Perform conditional mailing to the superuser.
- Correctly select the script interpreter through the shebang (#!) line.
- Manage the location, ownership, execution and suid-rights of scripts.
- for
- while
- test
- if
- read
- seq
- exec

- ||
- &&

### 105.2 Lesson 1

### 105.2 Customize or write simple scripts

The Linux shell environment allows the use of files — called scripts — containing commands from
any available program in the system combined with shell builtin commands to automate a user’s
and/or a system’s custom tasks. Indeed, many of the operating system maintenance tasks are
performed by scripts consisting of sequences of commands, decision structures and conditional
loops. Although scripts are most of the time intended for tasks related to the operating system
itself, they are also useful for user oriented tasks, like mass renaming of files, data collecting and
parsing, or any otherwise repetitive command line activities.
Scripts are nothing more than text files that behave like programs. An actual program — the
interpreter — reads and executes the instructions listed in the script file. The interpreter can also
start an interactive session where commands — including scripts — are read and executed as they
are entered, as is the case with Linux shell sessions. Script files can group those instructions and
commands when they grow too complex to be implemented as an alias or a custom shell function.
Furthermore, script files can be maintained like conventional programs and, being just text files,
they can be created and modified with any simple text editor.

Script Structure and Execution
Basically, a script file is an ordered sequence of commands that must be executed by a
corresponding command interpreter. How an interpreter reads a script file varies and there are
distinct ways of doing so in a Bash shell session, but the default interpreter for a script file will be
the one indicated in the first line of the script, just after the characters #! (known as shebang). In a
script with instructions for the Bash shell, the first line should be #!/bin/bash. By indicating this
line, the interpreter for all the instructions in the file will be /bin/bash. Except for the first line,
all other lines starting with the hash character # will be ignored, so they can be used to place
reminders and comments. Blank lines are also ignored. A very concise shell script file can
therefore be written as follows:
echo "Cheers from the script file! Current time is: "
date +%H:%M

This script has only two instructions for the /bin/bash interpreter: the builtin command echo
and the command date. The most basic way to run a script file is to execute the interpreter with
the script path as the argument. So, assuming the previous example was saved in a script file
named script.sh in the current directory, it will be read and interpreted by Bash with the
$ bash script.sh
Cheers from the script file! Current time is:
10:57

Command echo will automatically add a new line after displaying the content, but the option -n
will suppress this behaviour. Thus, using echo -n in the script will make the output of both
commands to appear in the same line:
$ bash script.sh
Cheers from the script file! Current time is: 10:57

Although not required, the suffix .sh helps to identify shell scripts when listing and searching for
files.

Bash will call whatever command is indicated after the #! as the interpreter for the
script file. It may be useful, for example, to employ the shebang for other scripting
languages, like Python (#!/usr/bin/python), Perl (#!/usr/bin/perl) or awk
(#!/usr/bin/awk).

If the script file is intended to be executed by other users in the system, it is important to check if
the proper reading permissions are set. The command chmod o+r script.sh will give reading
permission to all users in the system, allowing them to execute script.sh by placing the path to
the script file as the argument of command bash. Alternatively, the script file may have the
execution bit permission set so the file can be executed as a conventional command. The
execution bit is activated on the script file with the command chmod:
$ chmod +x script.sh

With the execution bit enabled, the script file named script.sh in the current directory can be
executed directly with the command ./script.sh. Scripts placed in a directory listed in the PATH
environment variable will also be accessible without their complete path.

A script performing restricted actions may have its SUID permission activated,
so ordinary users can also run the script with root privileges. In this case, it is
very important to ensure that no user other than root has the permission to
write in the file. Otherwise, an ordinary user could modify the file to perform
arbitrary and potentially harmful operations.

The placement and indentation of commands in script files are not too rigid. Every line in a shell
script will be executed as an ordinary shell command, in the same sequence as the line appears in
the script file, and the same rules that apply to the shell prompt also apply to each script line
individually. It is possible to place two or more commands in the same line, separated by
semicolons:
echo "Cheers from the script file! Current time is:" ; date +%H:%M

Although this format might be convenient at times, its usage is optional, as sequential commands
can be placed one command per line and they will be executed just as they were separated by
semicolons. In other words, the semicolon can be replaced by a new line character in Bash script
files.
When a script is executed, the commands contained therein are not executed directly in the
current session, but instead they are executed by a new Bash process, called a sub-shell. It
prevents the script from overwriting the current session’s environment variables and from

leaving unattended modifications in the current session. If the goal is to run the script’s contents
in the current shell session, then it should be executed with source script.sh or . script.sh
(note that there is a space between the dot and the script name).
As it happens with the execution of any other command, the shell prompt will only be available
again when the script ends its execution and its exit status code will be available in the $?
variable. To change this behaviour, so the current shell also ends when the script ends, the
script — or any other command — can be preceded by the exec command. This command will
also replace the exit status code of the current shell session with its own.

Variables
Variables in shell scripts behave in the same way as in interactive sessions, given that the
interpreter is the same. For example, the format SOLUTION=42 (without spaces around the equal
sign) will assign the value 42 to the variable named SOLUTION. By convention, uppercase letters
are used for variable names, but it’s not mandatory. Variable names can not, however, start with
non alphabetical characters.
In addition to the ordinary variables created by the user, Bash scripts also have a set of special
variables called parameters. Unlike ordinary variables, parameter names start with a nonalphabetical character that designates its function. Arguments passed to a script and other useful
information are stored in parameters like $0, $*, $?, etc, where the character following the dollar
sign indicates the information to be fetched:
$*
All the arguments passed to the script.
$@
All the arguments passed to the script. If used with double quotes, as in "$@", every argument
will be enclosed by double quotes.
$#
The number of arguments.
$0
The name of the script file.
$!
PID of the last executed program.

$$
PID of the current shell.
$?
Numerical exit status code of the last finished command. For POSIX standard processes, a
numerical value of 0 means that the last command was successfully executed, which also
applies to shell scripts.
A positional parameter is a parameter denoted by one or more digits, other than the single digit 0.
For example, the variable $1 corresponds to the first argument given to the script (positional
parameter one), $2 corresponds to the second argument, and so on. If the position of a parameter
is greater than nine, it must be referenced with curly braces, as in ${10}, ${11}, etc.
Ordinary variables, on the other hand, are intended to store manually inserted values or the
output generated by other commands. Command read, for example, can be used inside the script
to ask the user for input during script execution:
echo "Do you want to continue (y/n)?"
read ANSWER

The returned value will be stored in the ANSWER variable. If the name of the variable is not
supplied, the variable name REPLY will be used by default. It is also possible to use command
read to read more than one variable simultaneously:
echo "Type your first name and last name:"
read NAME SURNAME

In this case, each space separated term will be assigned to the variables NAME and SURNAME
respectively. If the number of given terms is greater than the number of variables, the exceeding
terms will be stored in the last variable. read itself can display the message to the user with
option -p, making the echo command redundant in this case:
read -p "Type your first name and last name:" NAME SURNAME

Scripts performing system tasks will often require information provided by other programs. The
backtick notation can be used to store the output of a command in a variable:
$ OS=`uname -o`

In the example, the output of command uname -o will be stored in the OS variable. An identical
result will be produced with $():
$ OS=$(uname -o)

The length of a variable, that is, the quantity of characters it contains, is returned by prepending a
hash # before the name of the variable. This feature, however, requires the use of the curly braces
syntax to indicate the variable:
$ OS=$(uname -o)
$ echo $OS
GNU/Linux
$ echo ${#OS}

Bash also features one-dimensional array variables, so a set of related elements can be stored with
a single variable name. Every element in an array has a numerical index, which must be used to
write and read values in the corresponding element. Different from ordinary variables, arrays
must be declared with the Bash builtin command declare. For example, to declare a variable
named SIZES as an array:
$ declare -a SIZES

Arrays can also be implicitly declared when populated from a predefined list of items, using the
parenthesis notation:
$ SIZES=( 1048576 1073741824 )

In the example, the two large integer values were stored in the SIZES array. Array elements must
be referenced using curly braces and square brackets, otherwise Bash will not change or display
the element correctly. As array indexes start at 0, the content of the first element is in
${SIZES[0]}, the second element is in ${SIZES[1]}, and so on:
$ echo ${SIZES[0]}
1048576
$ echo ${SIZES[1]}
1073741824

Unlike reading, changing an array element’s content is performed without the curly braces (e.g.,
SIZES[0]=1048576). As with ordinary variables, the length of an element in an array is returned
with the hash character (e.g., ${#SIZES[0]} for the length of the first element in SIZES array).
The total number of elements in an array is returned if @ or * are used as the index:
$ echo ${#SIZES[@]}
$ echo ${#SIZES[*]}

Arrays can also be declared using the output of a command as the initial elements through
command substitution. The following example shows how to create a Bash array whose elements
are the current system’s supported filesystems:
$ FS=( $(cut -f 2 < /proc/filesystems) )

The command cut -f 2 < /proc/filesystems will display all the filesystems currently
supported by the running kernel (as listed in the second column of the file /proc/filesystems),
so the array FS now contains one element for each supported filesystem. Any text content can be
used to initialize an array as, by default, any terms delimited by space, tab or newline characters
will become an array element.

Bash treats each character of an environment variable’s $IFS (Input Field Separator)
as a delimiter. To change the field delimiter to newline characters only, for example,
the IFS variable should be reset with command IFS=$'\n'.

Arithmetic Expressions
Bash provides a practical method to perform integer arithmetic operations with the builtin
command expr. Two numerical variables, $VAL1 and $VAL2 for example, can be added together
with the following command:
$ SUM=`expr $VAL1 + $VAL2`

The resulting value of the example will be available in the $SUM variable. Command expr can be
replaced by $(()), so the previous example can be rewritten as SUM=$(( $VAL1 + $VAL2 )).
Power expressions are also allowed with the double asterisks operator, so the previous array
declaration SIZES=( 1048576 1073741824) could be rewritten as SIZES=( $((1024**2))
$((1024**3)) ).

Command substitution can also be used in arithmetic expressions. For example, the file
/proc/meminfo has detailed information about the system memory, including the number of free
bytes in RAM:
$ FREE=$(( 1000 * `sed -nre '2s/[^[:digit:]]//gp' < /proc/meminfo` ))

The example shows how the command sed can be used to parse the contents of /proc/meminfo
inside the arithmetic expression. The second line of the /proc/meminfo file contains the amount
of free memory in thousands of bytes, so the arithmetic expression multiplies it by 1000 to obtain
the number of free bytes in RAM.

Conditional Execution
Some scripts usually are not intended to execute all the commands in the script file, but just those
commands that match a predefined criteria. For example, a maintenance script may send a
warning message to the administrator’s email only if the execution of a command fails. Bash
provides specific methods of assessing the success of command execution and general conditional
structures, more similar to those found in popular programming languages.
By separating commands with &&, the command to the right will be executed only if the command
to the left did not encounter an error, that is, if its exit status was equal to 0:
COMMAND A && COMMAND B && COMMAND C

The opposite behaviour occurs if commands are separated with ||. In this case, the following
command will be executed only if the previous command did encounter an error, that is, if its
returning status code differs from 0.
One of the most important features of all programming languages is the ability to execute
commands depending on previously defined conditions. The most straightforward way to
conditionally execute commands is to use the Bash builtin command if, which executes one or
more commands only if the command given as argument returns a 0 (success) status code.
Another command, test, can be used to assess many different special criteria, so it is mostly used
in conjunction with if. In the following example, the message Confirmed: /bin/bash is
executable. will be displayed if the file /bin/bash exists and it is executable:
if test -x /bin/bash ; then
echo "Confirmed: /bin/bash is executable."

Option -x makes command test return a status code 0 only if the given path is an executable file.
The following example shows another way to achieve the exact same result, as the square
brackets can be used as a replacement for test:
if [ -x /bin/bash ] ; then
echo "Confirmed: /bin/bash is executable."

The else instruction is optional to the if structure and can, if present, define a command or
sequence of commands to execute if the conditional expression is not true:
if [ -x /bin/bash ] ; then
echo "Confirmed: /bin/bash is executable."
echo "No, /bin/bash is not executable."

if structures must always end with fi, so the Bash interpreter knows were the conditional
commands end.

Script Output
Even when the purpose of a script only involves file-oriented operations, it is important to display
progress related messages in the standard output, so the user is kept informed of any issues and
can eventually use those messages to generate operation logs.
The Bash builtin command echo is commonly used to display simple strings of text, but it also
provides some extended features. With option -e, command echo is able to display special
characters using escaped sequences (a backslash sequence designating a special character). For
example:
OS=$(uname -o)
FREE=$(( 1000 * `sed -nre '2s/[^[:digit:]]//gp' < /proc/meminfo` ))
echo -e "Operating system:\t$OS"

echo -e "Unallocated RAM:\t$(( $FREE / 1024**2 )) MB"

Whilst the use of quotes is optional when using echo with no options, it is necessary to add them
when using option -e, otherwise the special characters may not render correctly. In the previous
script, both echo commands use the tabulation character \t to align the text, resulting in the
following output:
Operating system:

GNU/Linux

Unallocated RAM:

1491 MB

The newline character \n can be used to separate the output lines, so the exact same output is
obtained by combining the two echo commands into only one:
echo -e "Operating system:\t$OS\nUnallocated RAM:\t$(( $FREE / 1024**2 )) MB"

Although fit to display most text messages, command echo may not be well suited to display more
specific text patterns. Bash builtin command printf gives more control over how to display the
variables. Command printf uses the first argument as the format of the output, where
placeholders will be replaced by the following arguments in the order they appear in the
command line. For example, the message of the previous example could be generated with the
following printf command:
printf "Operating system:\t%s\nUnallocated RAM:\t%d MB\n" $OS $(( $FREE / 1024**2 ))

The placeholder %s is intended for text content (it will be replaced by the $OS variable) and the %d
placeholder is intended to integer numbers (it will be replaced by the resulting number of free
megabytes in RAM). printf does not append a newline character at the end of the text, so the
newline character \n should be placed at the end of the pattern if needed. The entire pattern
should be interpreted as a single argument, so it must be enclosed in quotes.

The format of placeholder substitution performed by printf can be customized
using the same format used by the printf function from the C programming
language. The full reference for the printf function can be found in its manual page,
accessed with the command man 3 printf.

With printf, the variables are placed outside the text pattern, which makes it possible to store
the text pattern in a separate variable:
MSG='Operating system:\t%s\nUnallocated RAM:\t%d MB\n'

printf "$MSG" $OS $(( $FREE / 1024**2 ))

This method is particularly useful to display distinct output formats, depending on the user’s
requirements. It makes it easier, for example, to write a script that uses a distinct text pattern if
the user requires a CSV (Comma Separated Values) list rather than a default output message.

## 1. The -s option for the read command is useful for entering passwords, as it will not show the
content being typed on the screen. How could the read command be used to store the user’s
input in the variable PASSWORD while hiding the typed content?
