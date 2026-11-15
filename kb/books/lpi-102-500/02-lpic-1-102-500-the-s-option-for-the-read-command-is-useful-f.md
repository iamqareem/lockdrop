---
id: lpi-102-500-02
title: "LPIC-1 · 102-500 — The -s option for the read command is useful for entering…"
slug: lpi-102-500-02-lpic-1-102-500-the-s-option-for-the-read-command-is-useful-f
source: "LPI Learning Material — LPIC-1 (Exam 102-500)"
sourceSection: "1. The -s option for the read command is useful for entering passwords, as it will not show the, 2. The only purpose of the command whoami is to display the username of the user who called it,, 3. What Bash operator should be between the commands apt-get dist-upgrade and, 1. After trying to run a ne"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, shells, scripting]
summary: "Considering that the file ./script.sh was created by the same user, what would be the Covers 40 sections: The -s option for the read command is useful for entering passwords, as it will not show the, The only purpose of the co."
---
# LPIC-1 · 102-500 — The -s option for the read command is useful for entering…

## 2. The only purpose of the command whoami is to display the username of the user who called it,
so it is mostly used inside scripts to identify the user who is running it. Inside a Bash script,
how could the output of the whoami command be stored in the variable named WHO?

## 3. What Bash operator should be between the commands apt-get dist-upgrade and
systemctl reboot if the root user wants to execute systemctl reboot only if apt-get
dist-upgrade finished successfully?

## 1. After trying to run a newly created Bash script, a user receives the following error message:
bash: ./script.sh: Permission denied

Considering that the file ./script.sh was created by the same user, what would be the
probable cause of this error?

## 2. Suppose a script file named do.sh is executable and the symbolic link named undo.sh points
to it. From within the script, how could you identify if the calling filename was do.sh or
undo.sh?

## 3. In a system with a properly configured email service, the command mail -s "Maintenance
Error" root <<<"Scheduled task error" sends the notice email message to the root user.
Such a command could be used in unattended tasks, like cronjobs, to inform the system
administrator about an unexpected issue. Write an if construct that will execute the
aforementioned mail command if the exit status of the previous command — whatever it
was — is unsuccessful.

This lesson covers the basic concepts for understanding and writing Bash shell scripts. Shell
scripts are a core part of any Linux distribution as they offer a very flexible way to automate user
and system tasks performed in the shell environment. The lesson goes through the following
steps:
- Shell script structure and correct script file permissions
- Script parameters
- Using variables to read user input and to store the output of commands
- Bash arrays
- Simple tests and conditional execution
- Output formatting
- Bash builtin notation for command substitution, array expansion and arithmetic expressions
- Conditional command execution with the || and && operators
- echo
- chmod
- exec
- read
- declare
- test
- if
- printf

## 1. The -s option for the read command is useful for entering passwords, as it will not show the
content being typed on the screen. How could the read command be used to store the user’s
input in the variable PASSWORD while hiding the typed content?
read -s PASSWORD
2. The only purpose of the command whoami is to display the username of the user who called it,
so it is mostly used inside scripts to identify the user who is running it. Inside a Bash script,
how could the output of the whoami command be stored in the variable named WHO?
WHO=`whoami` or WHO=$(whoami)
3. What Bash operator should be between the commands apt-get dist-upgrade and
systemctl reboot if the root user wants to execute systemctl reboot only if apt-get
dist-upgrade finished successfully?
The operator &&, as in apt-get dist-upgrade && systemctl reboot.

## 1. After trying to run a newly created Bash script, a user receives the following error message:
bash: ./script.sh: Permission denied

Considering that the file ./script.sh was created by the same user, what would be the
probable cause of this error?
The ./script.sh file does not have the execution permission enabled.
2. Suppose a script file named do.sh is executable and the symbolic link named undo.sh points
to it. From within the script, how could you identify if the calling filename was do.sh or
undo.sh?
The special variable $0 contains the filename used to call the script.
3. In a system with a properly configured email service, the command mail -s "Maintenance
Error" root <<<"Scheduled task error" sends the notice email message to the root user.
Such a command could be used in unattended tasks, like cronjobs, to inform the system
administrator about an unexpected issue. Write an if construct that will execute the
aforementioned mail command if the exit status of the previous command — whatever it
was — is unsuccessful.
if [ "$?" -ne 0 ]; then mail -s "Maintenance Error" root <<<"Scheduled task
error"; fi

### 105.2 Lesson 2

### 105.2 Customize or write simple scripts

Shell scripts are generally intended to automate operations related to files and directories, the
same operations that could be performed manually at the command line. Yet, the coverage of shell
scripts are not only restricted to a user’s documents, as the configuration and interaction with
many aspects of a Linux operating system are also accomplished through script files.
The Bash shell offers many helpful builtin commands to write shell scripts, but the full power of
these scripts relies on the combination of Bash builtin commands with the many command line
utilities available on a Linux system.

Extended Tests
Bash as a script language is mostly oriented to work with files, so the Bash builtin command test
has many options to evaluate the properties of filesystem objects (essentially files and directories).
Tests that are focused on files and directories are useful, for example, to verify if the files and
directories required to perform a particular task are present and can be read. Then, associated
with an if conditional construct, the proper set of actions are executed if the test is successful.

The test command can evaluate expressions using two different syntaxes: test expressions can
be given as an argument to command test or they can be placed inside square brackets, where
command test is given implicitly. Thus, the test to evaluate if /etc is a valid directory can be
written as test -d /etc or as [ -d /etc]:
$ test -d /etc
$ echo $?
$ [ -d /etc ]
$ echo $?

As confirmed by the exit status codes in the special variable $? — a value of 0 means the test was
successful — both forms evaluated /etc as a valid directory. Assuming the path to a file or
directory was stored in the variable $VAR, the following expressions can be used as arguments to
test or inside square brackets:
-a "$VAR"
Evaluate if the path in VAR exists in the filesystem and it is a file.
-b "$VAR"
Evaluate if the path in VAR is a special block file.
-c "$VAR"
Evaluate if the path in VAR is a special character file.
-d "$VAR"
Evaluate if the path in VAR is a directory.
-e "$VAR"
Evaluate if the path in VAR exists in the filesystem.
-f "$VAR"
Evaluate if the path in VAR exists and it is a regular file.
-g "$VAR"
Evaluate if the path in VAR has the SGID permission.
-h "$VAR"
Evaluate if the path in VAR is a symbolic link.

-L "$VAR"
Evaluate if the path in VAR is a symbolic link (like -h).
-k "$VAR"
Evaluate if the path in VAR has the sticky bit permission.
-p "$VAR"
Evaluate if the path in VAR is a pipe file.
-r "$VAR"
Evaluate if the path in VAR is readable by the current user.
-s "$VAR"
Evaluate if the path in VAR exists and it is not empty.
-S "$VAR"
Evaluate if the path in VAR is a socket file.
-t "$VAR"
Evaluate if the path in VAR is open in a terminal.
-u "$VAR"
Evaluate if the path in VAR has the SUID permission.
-w "$VAR"
Evaluate if the path in VAR is writable by the current user.
-x "$VAR"
Evaluate if the path in VAR is executable by the current user.
-O "$VAR"
Evaluate if the path in VAR is owned by the current user.
-G "$VAR"
Evaluate if the path in VAR belongs to the effective group of the current user.
-N "$VAR"
Evaluate if the path in VAR has been modified since the last time it was accessed.

"$VAR1" -nt "$VAR2"
Evaluate if the path in VAR1 is newer than the path in VAR2, according to their modification
dates.
"$VAR1" -ot "$VAR2"
Evaluate if the path in VAR1 is older than VAR2.
"$VAR1" -ef "$VAR2"
This expression evaluates to True if the path in VAR1 is a hardlink to VAR2.
It is recommended to use the double quotes around a tested variable because, if the variable
happens to be empty, it could cause a syntax error for the test command. The test options
require an operand argument and an unquoted empty variable would cause an error due to a
missing required argument. There are also tests for arbitrary text variables, described as follows:
-z "$TXT"
Evaluate if variable TXT is empty (zero size).
-n "$TXT" or test "$TXT"
Evaluate if variable TXT is not empty.
"$TXT1" = "$TXT2" or "$TXT1" == "$TXT2"
Evaluate if TXT1 and TXT2 are equal.
"$TXT1" != "$TXT2"
Evaluate if TXT1 and TXT2 are not equal.
"$TXT1" < "$TXT2"
Evaluate if TXT1 comes before TXT2, in alphabetical order.
"$TXT1" > "$TXT2"
Evaluate if TXT1 comes after TXT2, in alphabetical order.
Distinct languages may have different rules for alphabetical ordering. To obtain consistent results,
regardless of the localization settings of the system where the script is being executed, it is
recommended to set the environment variable LANG to C, as in LANG=C, before doing operations
involving alphabetical ordering. This definition will also keep the system messages in the original
language, so it should be used only within script scope.
Numerical comparisons have their own set of test options:

$NUM1 -lt $NUM2
Evaluate if NUM1 is less than NUM2.
$NUM1 -gt $NUM2
Evaluate if NUM1 is greater than NUM2.
$NUM1 -le $NUM2
Evaluate if NUM1 is less or equal to NUM2.
$NUM1 -ge $NUM2
Evaluate if NUM1 is greater or equal to NUM2.
$NUM1 -eq $NUM2
Evaluate if NUM1 is equal to NUM2.
$NUM1 -ne $NUM2
Evaluate if NUM1 is not equal to NUM2.
All tests can receive the following modifiers:
! EXPR
Evaluate if the expression EXPR is false.
EXPR1 -a EXPR2
Evaluate if both EXPR1 and EXPR2 are true.
EXPR1 -o EXPR2
Evaluate if at least one of the two expressions are true.
Another conditional construct, case, can be seen as a variation of the if construct. The instruction
case will execute a list of given commands if a specified item — the content of a variable, for
example — can be found in a list of items separated by pipes (the vertical bar |) and terminated by
). The following sample script shows how the case construct can be used to indicate the
corresponding software packaging format for a given Linux distribution:
DISTRO=$1
echo -n "Distribution $DISTRO uses "
case "$DISTRO" in

debian | ubuntu | mint)
echo -n "the DEB"
;;
centos | fedora | opensuse )
echo -n "the RPM"
;;
*)
echo -n "an unknown"
;;
esac
echo " package format."

Each list of patterns and associated commands must be terminated with ;;, ;&, or ;;&. The last
pattern, an asterisk, will match if no other previous pattern corresponded beforehand. The esac
instruction (case backwards) terminates the case construct. Assuming the previous sample script
was named script.sh and it is executed with opensuse as the first argument, the following
output will be generated:
$ ./script.sh opensuse
Distribution opensuse uses the RPM package format.

Bash has an option called nocasematch that enables case-insensitive pattern
matching for the case construct and other conditional commands. The shopt builtin
command toggles the values of settings controlling optional shell behaviour: shopt
-s will enable (set) the given option and shopt -u will disable (unset) the given
option. Therefore, placing shopt -s nocasematch before the case construct will
enable case-insensitive pattern matching. Options modified by shopt will only affect
the current session, so modified options inside scripts running in a sub-shell — which
is the standard way to run a script — do not affect the options of the parent session.

The searched item and the patterns undergo tilde expansion, parameter expansion, command
substitution and arithmetic expansion. If the searched item is specified with quotes, they will be
removed before matching is attempted.

Loop Constructs
Scripts are often used as a tool to automate repetitive tasks, performing the same set of commands
until a stop criteria is verified. Bash has three loop instructions — for, until and
while — designed for slightly distinct loop constructions.
The for construct walks through a given list of items — usually a list of words or any other space108

separated text segments — executing the same set of commands on each one of those items. Before
each iteration, the for instruction assigns the current item to a variable, which can then be used
by the enclosed commands. The process is repeated until there are no more items left. The syntax
of the for construct is:
for VARNAME in LIST
COMMANDS

VARNAME is an arbitrary shell variable name and LIST is any sequence of separated terms. The
valid delimiting characters splitting items in the list are defined by the IFS environment variable,
which are the characters space, tab and newline by default. The list of commands to be executed is
delimited by the do and done instructions, so commands can occupy as much lines as needed.
In the following example, the for command will take each item from the provided list — a
sequence of numbers — and assign it to the NUM variable, one item at a time:
for NUM in 1 1 2 3 5 8 13
echo -n "$NUM is "
if [ $(( $NUM % 2 )) -ne 0 ]
echo "odd."
echo "even."

In the example, a nested if construct is used in conjunction with an arithmetic expression to
evaluate if the number in the current NUM variable is even or odd. Assuming the previous sample
script was named script.sh and it is in the current directory, the following output will be
generated:
$ ./script.sh
1 is odd.
1 is odd.
2 is even.
3 is odd.

109

5 is odd.
8 is even.
13 is odd.

Bash also supports an alternative format to for constructs, with the double parenthesis notation.
This notation resembles the for instruction syntax from the C programming language and it is
particularly useful for working with arrays:
SEQ=( 1 1 2 3 5 8 13 )
for (( IDX = 0; IDX < ${#SEQ[*]}; IDX++ ))
echo -n "${SEQ[$IDX]} is "
if [ $(( ${SEQ[$IDX]} % 2 )) -ne 0 ]
echo "odd."
echo "even."

This sample script will generate the exact same output as the previous example. However, instead
of using the NUM variable to store one item at a time, the IDX variable is employed to track the
current array index in ascending order, starting from 0 and continuously adding to it while it is
under the number of items in the SEQ array. The actual item is retrieved from its array position
with ${SEQ[$IDX]}.
In the same fashion, the until construct executes a command sequence until a test
command — like the test command itself — terminates with status 0 (success). For example, the
same loop structure from the previous example can be implemented with until as follows:
SEQ=( 1 1 2 3 5 8 13 )
IDX=0
until [ $IDX -eq ${#SEQ[*]} ]

110

echo -n "${SEQ[$IDX]} is "
if [ $(( ${SEQ[$IDX]} % 2 )) -ne 0 ]
echo "odd."
echo "even."
IDX=$(( $IDX + 1 ))

until constructs may require more instructions than for constructs, but it can be more suitable
to non-numerical stop criteria provided by test expressions or any other command. It is
important to include actions that ensure a valid stop criteria, like the increment of a counter
variable, otherwise the loop may run indefinitely.
The instruction while is similar to the instruction until, but while keeps repeating the set of
commands if the test command terminates with status 0 (success). Therefore, the instruction
until [ $IDX -eq ${#SEQ[*]} ] from the previous example is equivalent to while [ $IDX
-lt ${#SEQ[*]} ], as the loop should repeat while the array index is less than the total of items
in the array.

A More Elaborate Example
Imagine a user wants to periodically sync a collection of their files and directories with another
storage device, mounted at an arbitrary mount point in the filesystem, and a full featured backup
system is considered overkill. Since this is an activity intended to be performed periodically, it is a
good application candidate for automating with a shell script.
The task is straight forward: sync every file and directory contained in a list, from an origin
directory informed as the first script argument to a destination directory informed as the second
script argument. To make it easier to add or remove items from the list, it will be kept in a
separated file, ~/.sync.list, one item per line:
$ cat ~/.sync.list
Documents
To do
Work
Family Album
.config
.ssh
.bash_profile

111

.vimrc

The file contains a mixture of files and directories, some with blank spaces in their names. This is
a suitable scenario for the builtin Bash command mapfile, which will parse any given text
content and create an array variable from it, placing each line as an individual array item. The
script file will be named sync.sh, containing the following script:
set -ef
FILE=~/.sync.list
FROM=$1
TO=$2
if [ ! -d "$FROM" -o ! -d "$TO" ]
echo Usage:
echo "$0 <SOURCEDIR> <DESTDIR>"
exit 1
mapfile -t LIST < $FILE
for (( IDX = 0; IDX < ${#LIST[*]}; IDX++ ))
echo -e "$FROM/${LIST[$IDX]} \u2192 $TO/${LIST[$IDX]}";
rsync -qa --delete "$FROM/${LIST[$IDX]}" "$TO";

The first action the script does is to redefine two shell parameters with command set: option -e
will exit execution immediately if a command exits with a non-zero status and option -f will
disable file name globbing. Both options can be shortened as -ef. This is not a mandatory step,
but helps diminish the probability of unexpected behaviour.

112

The actual application oriented instructions of the script file can be divided in three parts:
1. Collect and check script parameters
The FILE variable is the path to the file containing the list of items to be copied:
~/.sync.list. Variables FROM and TO are the origin and destination paths, respectively. Since
these last two parameters are user provided, they go through a simple validation test
performed by the if construct: if any of the two is not a valid directory — assessed by the test [
! -d "$FROM" -o ! -d "$TO" ] — the script will show a brief help message and then
terminate with an exit status of 1.
2. Load list of files and directories
After all the parameters are defined, an array containing the list of items to be copied is created
with the command mapfile -t LIST < $FILE. Option -t of mapfile will remove the trailing
newline character from each line before including it in the array variable named LIST. The
contents of the file indicated by the variable FILE — ~/.sync.list — is read via input
redirection.
3. Perform the copy and inform the user
A for loop using double parenthesis notation traverses the array of items, with the IDX
variable keeping track of the index increment. The echo command will inform the user of each
item being copied. The escaped unicode character — \u2192 — for the right arrow character is
present in the output message, so the -e option of command echo must be used. Command
rsync will selectively copy only the modified file pieces from the origin, thus its use is
recommended for such tasks. rsync options -q and -a, condensed in -qa, will inhibit rsync
messages and activate the archive mode, where all file properties are preserved. Option
--delete will make rsync delete an item in the destination that does not exist in the origin
anymore, so it should be used with care.
Assuming all the items in the list exist in the home directory of user carol, /home/carol, and the
destination directory /media/carol/backup points to a mounted external storage device, the
command sync.sh /home/carol /media/carol/backup will generate the following output:
$ sync.sh /home/carol /media/carol/backup
/home/carol/Documents → /media/carol/backup/Documents
/home/carol/"To do" → /media/carol/backup/"To do"
/home/carol/Work → /media/carol/backup/Work
/home/carol/"Family Album" → /media/carol/backup/"Family Album"
/home/carol/.config → /media/carol/backup/.config
/home/carol/.ssh → /media/carol/backup/.ssh

113

/home/carol/.bash_profile → /media/carol/backup/.bash_profile
/home/carol/.vimrc → /media/carol/backup/.vimrc

The example also assumes the script is executed by root or by user carol, as most of the files
would be unreadable by other users. If script.sh is not inside a directory listed in the PATH
environment variable, then it should be specified with its full path.

114

## 1. How could command test be used to verify if the file path stored in the variable FROM is newer
than a file whose path is stored in the variable TO?

## 2. The following script should print a number sequence from 0 to 9, but instead it indefinitely
prints 0. What should be done in order to get the expected output?
COUNTER=0
while [ $COUNTER -lt 10 ]
echo $COUNTER

## 3. Suppose a user wrote a script that requires a sorted list of usernames. The resulting sorted list
is presented as the following on his computer:

However, the same list is sorted as the following on his colleague’s computer:

What could explain the differences between the two sorted lists?

115

116

1. How could all of the script’s command line arguments be used to initialize a Bash array?

2. Why is it that, counter intuitively, the command test 1 > 2 evaluates as true?

## 3. How would a user temporarily change the default field separator to the newline character only,
while still being able to revert it to its original content?

117

This lesson takes a deeper look at the tests available for the test command and at other
conditional and loop constructs, necessary to write more elaborate shell scripts. A simple file
synchronization script is given as an example of a practical shell script application. The lesson
goes through the following steps:
- Extended tests for the if and case conditional constructs.
- Shell loop constructs: for, until and while.
- Iterating through arrays and parameters.
test
Perform a comparison between items supplied to the command.
if
A logic construct used in scripts to evaluate something as either true or false, then branch
command execution based on results.
case
Evaluate several values against a single variable. Script command execution is then carried out
depending on the case command’s result.
for
Repeat execution of a command based on a given criteria.
until
Repeat the execution of a command until an expression evaluates to false.
while
Repeat the execution of a command while a given expression evaluates to true.

118

## 1. How could command test be used to verify if the file path stored in the variable FROM is newer
than a file whose path is stored in the variable TO?
The command test "$FROM" -nt "$TO" will return a status code of 0 if the file in the FROM
variable is newer than the file in the TO variable.
2. The following script should print a number sequence from 0 to 9, but instead it indefinitely
prints 0. What should be done in order to get the expected output?
COUNTER=0
while [ $COUNTER -lt 10 ]
echo $COUNTER

The COUNTER variable should be incremented, which could be done with the arithmetic
expression COUNTER=$(( $COUNTER + 1 )), to eventually reach the stop criteria and end the
loop.
3. Suppose a user wrote a script that requires a sorted list of usernames. The resulting sorted list
is presented as the following in his computer:

However, the same list is sorted as the following in his colleague computer:

119

What could explain the differences between the two sorted lists?
The sorting is based on the current system’s locale. To avoid the inconsistencies, sorting tasks
should be performed with the LANG environment variable set to C.

120

1. How could all of the script’s command line arguments be used to initialize a Bash array?
The commands PARAMS=( $* ) or PARAMS=( "$@" ) will create an array called PARAMS with
all the arguments.
2. Why is it that, counter intuitively, the command test 1 > 2 evaluates as true?
Operator > is intended to be used with string tests, no numerical tests.
3. How would a user temporarily change the default field separator to the newline character only,
while still being able to revert it to its original content?
A copy of the IFS variable can be stored in another variable: OLDIFS=$IFS. Then the new line
separator is defined with IFS=$'\n' and the IFS variable can be reverted back with
IFS=$OLDIFS.

121

## Topic 106: User Interfaces and Desktops

122

### 106.1 Install and configure X11
LPIC-1 version 5.0, Exam 102, Objective 106.1
- Understanding of the X11 architecture.
- Basic understanding and knowledge of the X Window configuration file.
- Overwrite specific aspects of Xorg configuration, such as keyboard layout.
- Understand the components of desktop environments, such as display managers and
window managers.
- Manage access to the X server and display applications on remote X servers.
- Awareness of Wayland.
- /etc/X11/xorg.conf
- /etc/X11/xorg.conf.d/
- ~/.xsession-errors
- xhost
- xauth
- DISPLAY
- X

123

### 106.1 Lesson 1

## 106. User Interfaces and Desktops

### 106.1 Install and configure X11

The X Window System is a software stack that is used to display text and graphics on a screen. The
overall look and design of an X client is not dictated by the X Window System, but is instead
handled by each individual X client, a window manager (e.g. Window Maker, Tab Window
Manager), or a complete desktop environment such as KDE, GNOME, or Xfce. Desktop
environments will be covered in a later lesson. This lesson will focus on the underlying
architecture and common tools for the X Window System that an administrator would use to
configure X.
The X Window System is cross-platform and runs on various operating systems such as Linux, the
BSDs, Solaris and other Unix-like systems. There are also implementations available for Apple’s
macOS and Microsoft Windows.
The primary version of the X protocol used in modern Linux distributions is X.org version 11,
commonly written as X11. The X protocol is the communication mechanism between the X client
and X server. The differences between the X client and X server will be discussed below.

124

The X Window System’s predecessor was a window system called W and was a

joint development effort between IBM, DEC and MIT. This software was born out of
Project Athena in 1984. When the developers started work on a new display server,
they chose the next letter in the English alphabet: “X”. The X Window System’s
evolution is currently controlled by the MIT X Consortium.

X Window System Architecture
The X Window System provides the mechanisms for drawing basic two dimensional shapes (and
three dimensional shapes through extensions) on a display. It is divided into a client and a server,
and in most installations where a graphical desktop is needed both of these components are on
the same computer. The client component takes the form of an application, such as a terminal
emulator, a game or a web browser. Each client application informs the X server about its window
location and size on a computer screen. The client also handles what goes into that window, and
the X server puts the requested drawing up on the screen. The X Window System also handles
input from devices such as mice, keyboards, trackpads and more.
Basic Structure of an X Window System

The X Window System is network-capable and multiple X clients from different computers on a
network can make drawing requests to a single remote X server. The reasoning behind this is so
that an administrator or user can have access to a graphical application on a remote system that

125

may not be available on their local system.
A key feature of the X Window System is that it is modular. Over the course of the X Window
System’s existence newer features have been developed and added to its framework. These new
components were only added as extensions to the X server, leaving the core X11 protocol intact.
These extensions are contained within Xorg library files. Examples of Xorg libraries include:
libXrandr, libXcursor, libX11, libxkbfile as well as several others, each providing extended
functionality to the X server.
A display manager provides a graphical login to a system. This system can either be a local
computer or a computer across a network. The display manager is launched after the computer
boots and will start an X server session for the authenticated user. The display manager is also
responsible for keeping the X server up and running. Example display managers include GDM,
SDDM and LightDM.
Each instance of a running X server has a display name to identify it. The display name contains
the following:
hostname:displaynumber.screennumber

The display name also instructs a graphical application where it should be rendered and on which
host (if using a remote X connection).
The hostname refers to the name of the system that will display the application. If a hostname is
missing from the display name, then the local host is assumed.
The displaynumber references the collection of “screens” that are in use, whether that is a single
laptop screen or multiple screens on a workstation. Each running X server session is given a
display number starting at 0.
The default screennumber is 0. This can be the case if only one physical screen or multiple
physical screens are configured to work as one screen. When all screens in a multi-monitor setup
are combined into one logical screen, application windows can be moved freely between the
screens. In situations where each screen is configured to work independently of one another, each
screen will house the application windows that open within them and the windows can not be
moved from one screen to another. Each independent screen will have its own number assigned
to it. If there is only one logical screen in use, then the dot and the screen number are omitted.
The display name of a running X session is stored in the DISPLAY environment variable:
$ echo $DISPLAY

126

:0

The output details the following:
1. The X server in use is on the local system, hence there is nothing printed to the left of the colon.
2. The current X server session is the first as indicated by the 0 immediately following the colon.
3. There is only one logical screen in use, so a screen number is not visible.
To further illustrate this concept, refer to the following diagram:
Example Display Configurations

(A)
A single monitor, with a single display configuration and only one screen.
(B)
Configured as a single display, with two physical monitors configured as one screen.
Application windows can be moved freely between the two monitors.
(C)
A single display configuration (as indicated by the :0) however each monitor is an independent
screen. Both screens will still share the same input devices such as a keyboard and mouse,
however an application opened on screen :0.0 can not be moved to screen :0.1 and vice
versa.
To start an application on a specific screen, assign the screen number to the DISPLAY
environment variable prior to launching the application:
$ DISPLAY=:0.1 firefox &

This command would start the Firefox web browser on the screen to the right in the diagram
above. Some toolkits also provide command line options to instruct an application to run on a
specified screen. See --screen and --display in the gtk-options(7) man page for an example.

127

X Server Configuration
Traditionally, the primary configuration file that is used to configure an X server is the
/etc/X11/xorg.conf file. On modern Linux distributions, the X server will configure itself at
runtime when the X server is started and so no xorg.conf file may exist.
The xorg.conf file is divided up into separate stanzas called sections. Each section begins with
the term Section and following this term is the section name which refers to a component’s
configuration. Each Section is terminated by a corresponding EndSection. The typical
xorg.conf file contains the following sections:
InputDevice
Used to configure a specific model of keyboard or mouse.
InputClass
In modern Linux distributions this section is typically found in a separate configuration file
located under /etc/X11/xorg.conf.d/. The InputClass is used to configure a class of
hardware devices such as keyboards and mice rather than a specific piece of hardware. Below
is an example /etc/X11/xorg.conf.d/00-keyboard.conf file:
Section "InputClass"
Identifier "system-keyboard"
MatchIsKeyboard "on"
Option "XkbLayout" "us"
Option "XkbModel" "pc105"

The option for XkbLayout determines the layout of the keys on a keyboard, such as Dvorak, left
or right handed, QWERTY and language. The option for XkbModel is used to define the type of
keyboard in use. A table of models, layouts and their descriptions can be found within
xkeyboard-config(7). The files associated with keyboard layouts can be found within
/usr/share/X11/xkb. An example Greek Polytonic keyboard layout on a Chromebook
computer would look like the following:
Section "InputClass"
Identifier "system-keyboard"
MatchIsKeyboard "on"
Option "XkbLayout" "gr(polytonic)"
Option "XkbModel" "chromebook"

Alternatively, a keyboard’s layout can be modified during a running X session with the
setxkbmap command. Here is an example of this command setting up the Greek Polytonic
layout on a Chromebook computer:
$ setxkbmap -model chromebook -layout "gr(polytonic)"

This setting will only last as long as the X session in use. To make such changes permanent,
modify the /etc/X11/xorg.conf.d/00-keyboard.conf file to include the settings required.
The setxkbmap command makes use of the X Keyboard Extension (XKB). This is
an example of the additive functionality of the X Window System through its use
of extensions.

Modern Linux distributions provide the localectl command via systemd which can also be
used
to
modify
a
keyboard
layout
and
will
automatically
create
/etc/X11/xorg.conf.d/00-keyboard.conf configuration file. Once more, here is an
example setting up a Greek Polytonic keyboard on a Chromebook, this time using the
localectl command:
$ localectl --no-convert set-x11-keymap "gr(polytonic)" chromebook

The --no-convert option is used here to prevent localectl from modifying the host’s
console keymap.
Monitor
The Monitor section describes the physical monitor that is used and where it is connected.
Here is an example configuration showing a hardware monitor connected to the second
display port and is used as the primary monitor.
Section "Monitor"
Identifier

"DP2"

"Primary" "true"

Device
The Device section describes the physical video card that is used. The section will also contain
the kernel module used as the driver for the video card, along with its physical location on the
motherboard.

129

Section "Device"
Identifier

"Device0"

Driver

"i915"

BusID

"PCI:0:2:0"

Screen
The Screen section ties the Monitor and Device sections together. An example Screen section
could look like the following;
Section "Screen"
Identifier "Screen0"
Device

"Device0"

Monitor

"DP2"

ServerLayout
The ServerLayout section groups all of the sections such as mouse, keyboard and screens into
one X Window System interface.
Section "ServerLayout"
Identifier

"Layout-1"

Screen

"Screen0" 0 0

InputDevice

"mouse1"

InputDevice

"system-keyboard"

"CorePointer"
"CoreKeyboard"

Not all sections may be found within a configuration file. In instances where a
section is missing, default values are provided by the running X server instance
instead.

User-specified configuration files also reside in /etc/X11/xorg.conf.d/. Configuration files
provided by the distribution are located in /usr/share/X11/xorg.conf.d/. The configuration
files located within /etc/X11/xorg.conf.d/ are parsed prior to the /etc/X11/xorg.conf file if
it exists on the system.
The xdpyinfo command is used on a computer to display information about a running X server
instance. Below is sample output from the command:

130

$ xdpyinfo
name of display:

:0

version number:

11.0

vendor string:

The X.Org Foundation

vendor release number:

12004000

X.Org version: 1.20.4
maximum request size:
motion buffer size:

16777212 bytes
256

bitmap unit, bit order, padding:
image byte order:

32, LSBFirst, 32

LSBFirst

number of supported pixmap formats:

supported pixmap formats:
depth 1, bits_per_pixel 1, scanline_pad 32
depth 4, bits_per_pixel 8, scanline_pad 32
depth 8, bits_per_pixel 8, scanline_pad 32
depth 15, bits_per_pixel 16, scanline_pad 32
depth 16, bits_per_pixel 16, scanline_pad 32
depth 24, bits_per_pixel 32, scanline_pad 32
depth 32, bits_per_pixel 32, scanline_pad 32
keycode range:
focus:

minimum 8, maximum 255

None

number of extensions:

BIG-REQUESTS
Composite
DAMAGE
DOUBLE-BUFFER
DRI3
GLX
Generic Event Extension
MIT-SCREEN-SAVER
MIT-SHM
Present
RANDR
RECORD
RENDER
SECURITY
SHAPE
SYNC
X-Resource
XC-MISC
XFIXES
XFree86-VidModeExtension
XINERAMA
XInputExtension

131

XKEYBOARD
XTEST
XVideo
default screen number:
number of screens:

screen #0:
dimensions:

3840x1080 pixels (1016x286 millimeters)

resolution:

96x96 dots per inch

depths (7):

24, 1, 4, 8, 15, 16, 32

root window id:

0x39e

depth of root window:

24 planes

number of colormaps:

minimum 1, maximum 1

default colormap:

0x25

default number of colormap cells:
preallocated pixels:
options:

256

black 0, white 16777215

backing-store WHEN MAPPED, save-unders NO

largest cursor:

3840x1080

current input event mask:

0xda0033

KeyPressMask

KeyReleaseMask

EnterWindowMask

LeaveWindowMask

StructureNotifyMask

SubstructureNotifyMask

SubstructureRedirectMask PropertyChangeMask
number of visuals:

ColormapChangeMask

270

The more relevant portions of the output are in bold, such as the name of the display (which is the
same as the contents of the DISPLAY environment variable), the versioning information of the X
server in use, the number and listing of Xorg extensions in use, and further information about the
screen itself.

Creating a Basic Xorg Configuration File
Even though X will create its configuration after system startup on modern Linux installations, an
xorg.conf file can still be used. To generate a permanent /etc/X11/xorg.conf file, run the
$ sudo Xorg -configure

132

If there is already an X session running, you will need to specify a different
DISPLAY in your command, for example:

$ sudo Xorg :1 -configure

On some Linux distributions, the X command can be used in place of Xorg, as X is a symbolic link
to Xorg.
An xorg.conf.new file will be created in your current working directory. The contents of this file
are derived from what the X server has found to be available in hardware and drivers on the local
system. To use this file, it will need to be moved to the /etc/X11/ directory and renamed to
xorg.conf:
$ sudo mv xorg.conf.new /etc/X11/xorg.conf

The following manual pages provide further information on components of the X
Window System: xorg.conf(5), Xserver(1), X(1) and Xorg(1).

Wayland
Wayland is the newer display protocol designed to replace the X Window System. Many modern
Linux distributions are using it as their default display server. It is meant to be lighter on system
resources and have a smaller installation footprint than X. The project began in 2010 and is still
undergoing active development, including work from active and former X.org developers.
Unlike the X Window System, there is no server instance that runs between the client and kernel.
Instead, a client window works with its own code or that of a toolkit (such as Gtk+ or Qt) to
provide the rendering. In order to do the rendering, a request is made to the Linux kernel via the
Wayland protocol. The kernel forwards the request via the Wayland protocol to the Wayland
compositor, which handles device input, window management and composition. The compositor
is the part of the system that combines the rendered elements into visual output on the screen.
Most modern toolkits such Gtk+ 3 and Qt 5 have been updated to allow for rendering to either an
X Window System or a computer running Wayland. Not all standalone applications have been
written to support rendering in Wayland as of yet. For applications and frameworks that are still
targeting the X Window System to run, the application can run within XWayland. The XWayland
system is a separate X server that runs within a Wayland client and thus renders a client
window’s contents within a standalone X server instance.
Just as the X Window System uses a DISPLAY environment variable to keep track of screens in
use, the Wayland protocol uses a WAYLAND_DISPLAY environment variable. Below is sample
output from a system running a Wayland display:

133

$ echo $WAYLAND_DISPLAY
wayland-0

This environment variable is not available on systems running X.

134

1. What command would you use to determine what Xorg extensions are available on a system?

## 2. You have just received a brand new 10-button mouse for your computer, however it will
require extra configuration in order to get all of the buttons to function properly. Without
modifying the rest of the X server configuration, what directory would you use to create a new
configuration file for this mouse, and what specific configuration section would be used in this
file?

3. What component of a Linux installation is responsible for keeping an X server running?

## 4. What command line switch is used with the X command to create a new xorg.conf
configuration file?

135

## 1. What would the contents of the DISPLAY environment variable be on a system named lab01
using a single display configuration? Assume that the DISPLAY environment variable is being
viewed in a terminal emulator on the third independent screen.

## 2. What command can be used to create a keyboard configuration file for use by the X Window
System?

## 3. On a typical Linux installation a user can switch to a virtual terminal by pressing the Ctrl + Alt
+ F1 - F6 keys on a keyboard. You have been asked to set up a kiosk system with a graphical
interface and need this feature disabled to prevent unauthorized tampering with the system.
You decide to create a /etc/X11/xorg.conf.d/10-kiosk.conf configuration file. Using a
ServerFlags section (which is used to set global Xorg options on the server), what option
would need to be specified? Review the xorg(1) man page to locate the option.

136

This lesson covered the X Window System as it is used on Linux. The X Window System is used to
draw images and text on screens, as they are defined in various configuration files. The X Window
System is often used to configure input devices such as mice and keyboards. This lesson discussed
the following points:
- The X Window System architecture at a high level.
- What configuration files are used to configure an X Windows System, and their location on the
filesystem.
- How to use the DISPLAY environment variable on a system running X.
- A brief introduction to the Wayland display protocol.
The commands and configuration files addressed were:
- Modification of a keyboard’s layout within an Xorg installation with setxkbmap and
localectl.
- The Xorg command for creating a new /etc/X11/xorg.conf configuration file.
- The contents of the Xorg configuration files located at:
/etc/X11/xorg.conf.d/ and /usr/share/X11/xorg.conf.d/.

/etc/X11/xorg.conf,

- The xdpyinfo command for displaying general information about a running X server session.

137

1. What command would you use to determine what Xorg extensions are available on a system?
$ xdpyinfo

## 2. You have just received a brand new 10-button mouse for your computer, however it will
require extra configuration in order to get all of the buttons to function properly. Without
modifying the rest of the X server configuration, what directory would you use to create a new
configuration file for this mouse, and what specific configuration section would be used in this
file?
User-defined configurations should be located in /etc/X11/xorg.conf.d/ and the specific
section needed for this mouse configuration would be InputDevice.
3. What component of a Linux installation is responsible for keeping an X server running?
The display manager.
4. What command line switch is used with the X command to create a new xorg.conf
configuration file?
-configure

Remember that the X command is a symbolic link to the Xorg command.

138

## 1. What would the contents of the DISPLAY environment variable be on a system named lab01
using a single display configuration? Assume that the DISPLAY environment variable is being
viewed in a terminal emulator on the third independent screen.
$ echo $DISPLAY
lab01:0.2

## 2. What command can be used to create a keyboard configuration file for use by the X Window
System?
$ localectl

## 3. On a typical Linux installation a user can switch to a virtual terminal by pressing the Ctrl + Alt
+ F1 - F6 keys on a keyboard. You have been asked to set up a kiosk system with a graphical
interface and need this feature disabled to prevent unauthorized tampering with the system.
You decide to create a /etc/X11/xorg.conf.d/10-kiosk.conf configuration file. Using a
ServerFlags section (which is used to set global Xorg options on the server), what option
would need to be specified? Review the xorg.conf(5) man page to locate the option.
Section "ServerFlags"

"DontVTSwitch"

"True"

139

### 106.2 Graphical Desktops
LPIC-1 version 5.0, Exam 102, Objective 106.2
- Awareness of major desktop environments
- Awareness of protocols to access remote desktop sessions
- KDE
- Gnome
- Xfce
- X11
- XDMCP
- VNC
- Spice
- RDP

140

### 106.2 Lesson 1

## 106. User Interfaces and Desktops

### 106.2 Graphical Desktops

Linux based operating systems are known for their advanced command line interface, but it can
be intimidating for non-technical users. Intending to make computer usage more intuitive, the
combination of high resolution displays with pointing devices gave birth to picture driven user
interfaces. Whilst the command line interface requires prior knowledge about program names
and their configuration options, with a graphical user interface (GUI) program functionality can be
triggered by pointing to familiar visual elements, making the learning curve less steep.
Furthermore, the graphical interface is best suited for multimedia and other visually oriented
activities.
Indeed, the graphical user interface is almost a synonym to computer interface and most Linux
distributions come with the graphical interface installed by default. There is not, however, a single
monolithic program accountable for the full featured graphical desktops available in Linux
systems. Instead, each graphical desktop is in fact a large collection of programs and their
dependencies, varying from distribution’s choices to the user’s personal taste.

141

X Window System
In Linux and other Unix-like operating systems where it’s employed, the X Window System (also
known as X11 or just X) provides the low-level resources related to the graphical interface
rendering and the user interaction with it, such as:
- The handling of the input events, like mouse movements or keystrokes.
- The ability to cut, copy and paste text content between separate applications.
- The programming interface other programs resort to draw the graphic elements.
Although the X Window System is in charge of controlling the graphic display (the video driver
itself is part of X), it is not intended to draw complex visual elements on its own. Shapes, colors,
shades and any other visual effects are generated by the application running on top of X. This
approach gives applications a lot of room to create customized interfaces, but it can also lead to
development overhead that is beyond the application scope and to inconsistencies in appearance
and behaviour when compared to other program interfaces.
From the developer’s perspective, the introduction of the desktop environment facilitates the GUI
programming bound to the underlying application development, whereas from the user’s
perspective it gives a consistent experience among distinct applications. Desktop environments
bring together programming interfaces, libraries and supporting programs that cooperate to
deliver traditional but still evolving design concepts.

Desktop Environment
The traditional desktop computer GUI consists of various windows — the term window is used
here to refer to any autonomous screen area — associated with running processes. As the X
Window System alone offers only basic interactive features, the full user experience depends on
the components provided by the desktop environment.
Probably the most important component of a desktop environment, the window manager controls
window placement and decorations. It is the window manager that adds the title bar to the
window, the control buttons — generally associated with the minimize, maximize and close
actions — and manages the switching between open windows.

142

The basic concepts found in graphic interfaces of desktop computers came from
ideas taken from actual office workspaces. Metaphorically speaking, the computer
screen is the desktop, where objects like documents and folders are placed. An
application window with the content of a document mimics physical acts like
filling in a form or painting a picture. As actual desktops, computer desktops also

have software accessories like notepads, clocks, calendars, etc., most of them based
on their “real” counterparts.
All desktop environments provide a window manager that matches the look and feel of its widget
toolkit. Widgets are informative or interactive visual elements, like buttons or text input fields,
distributed inside the application window. The standard desktop components — like the
application launcher, taskbar, etc. — and the window manager itself rely on such widget toolkits
to assemble their interfaces.
Software libraries, like GTK+ and Qt, provide widgets that programmers can use to build elaborate
graphical interfaces for their applications. Historically, applications developed with GTK+ didn’t
look like applications made with Qt and vice-versa, but the better theme support of today’s
desktop environments make the distinction less obvious.
Overall, GTK+ and Qt offer the same features regarding widgets. Simple interactive elements can
be indistinguishable, whereas composite widgets — such as the dialog window used by
applications to open or save files — can, however, look quite different. Nonetheless, applications
built with distinct toolkits can run simultaneously, regardless of the widget toolkit used by the
other desktop components.
In addition to the basic desktop components, which could be considered individual programs on
their own, desktop environments pursue the desktop metaphor by providing a minimal set of
accessory applications developed under the same design guidelines. Variations of the following
applications are commonly provided by all major desktop environments:
System related applications
Terminal emulator, file manager, package installation manager, system configuration tools.
Communication and Internet
Contacts manager, email client, web browser.
Office applications
Calendar, calculator, text editor.
Desktop environments may include many other services and applications: the login screen
greeter, session manager, inter-process communication, keyring agent, etc. They also incorporate
features provided by third-party system services, such as PulseAudio for sound and CUPS for
printing. These features do not need the graphical environment to work, but the desktop
environment provides graphical frontends to facilitate the configuration and operation of such
resources.

143

Popular Desktop Environments
Many proprietary operating systems support only a single official desktop environment, which is
tied to their particular release and it is not supposed to be changed. Unlike them, Linux-based
operating systems support different desktop environment options that can be used in conjunction
with X. Each desktop environment has its own features, but they usually share some common
design concepts:
- An application launcher listing the builtin and third-party applications available in the system.
- Rules defining the default applications associated to file types and protocols.
- Configuration tools to customize the appearance and behaviour of the desktop environment.
Gnome is one of the most popular desktop environments, being the first choice in distributions
like Fedora, Debian, Ubuntu, SUSE Linux Enterprise, Red Hat Enterprise Linux, CentOS, etc. In its
version 3, Gnome brought major changes in its look and structure, moving away from the desktop
metaphor and introducing the Gnome Shell as its new interface.

Figure 1. Gnome Shell Activities

The general purpose full-screen launcher Gnome Shell Activities replaced the traditional
application launcher and taskbar. However, it is still possible to use Gnome 3 with the old look by
choosing the Gnome Classic option in the login screen.
KDE is a large ecosystem of applications and development platform. Its latest desktop
environment version, KDE Plasma, is used by default in openSUSE, Mageia, Kubuntu, etc. The
employment of the Qt library is KDE’s striking feature, giving it its unmistakable appearance and
a plethora of original applications. KDE even provides a configuration tool to ensure visual
144

cohesion with GTK+ applications.

Figure 2. KDE GTK Settings

Xfce is a desktop environment that aims to be aesthetically pleasing while not consuming a lot of
machine resources. Its structure is highly modularized, allowing a user to activate and to
deactivate components according to the user’s needs and preferences.

Figure 3. The Xfce desktop

There are many other desktop environments for Linux, usually provided by alternative
distribution spins. The Linux Mint distribution, for example, provides two original desktop
environments: Cinnamon (a fork of Gnome 3) and MATE (a fork of Gnome 2). LXDE is a desktop
environment tailored to low resource consumption, which makes it a good choice for installation

145

on older equipment or single board computers. While not offering all the features of heavier
desktop environments, LXDE offers all the basic features expected from a modern graphical user
interface.

Keyboard shortcuts play an important role in the interaction with the desktop
environment. Some keyboard shortcuts — such as Alt + Tab to switch between windows
or Ctrl + c to copy text — are universal across desktop environments, but each desktop
environment has its own keyboard shortcuts too. Keyboard shortcuts are found in the
keyboard configuration tool provided by the desktop environment, where shortcuts
can be added or modified.

Desktop Interoperability
The diversity of desktop environments in Linux-based operating systems imposes a challenge:
how to make them work correctly with third-party graphical applications or system services
without having to implement specific support for each of them. Shared methods and
specifications across desktop environments greatly improve user experience and settles many
development issues, as graphical applications must interact with the current desktop
environment regardless of the desktop environment they originally were designed for. In addition
to that, it is important to keep general desktop settings if the user eventually changes their
desktop environment choice.
A large body of specifications for desktop interoperability is maintained by the freedesktop.org
organization. The adoption of the full specification is not mandatory, but many of them are widely
used:
Directories locations
Where the personal settings and other user-specific files are located.
Desktop entries
Command line applications can run in the desktop environment through any terminal
emulator, but it would be too confusing to make all of them available in the application
launcher. Desktop entries are text files ending with .desktop which are used by the desktop
environment to gather information about the available desktop applications and how to use
them.
Application autostart
Desktop entries indicating the application that should start automatically after the user has
logged in.

146

Drag and drop
How applications should handle drag and drop events.
Trash can
The common location of files deleted by the file manager, as well as the methods to store and
remove files from there.
Icon themes
The common format for interchangeable icon libraries.
The ease of use provided by desktop environments has a downside compared to text interfaces
such as the shell: the ability to provide remote access. While a remote machine command-line
shell environment can be easily accessed with tools such as ssh, remote access to graphical
environments requires different methods and may not achieve satisfactory performance on
slower connections.

Non-Local Access
The X Window Systems adopts a design based on autonomous displays, where the same X display
manager can control more than one graphical desktop session at the same time. In essence, a
display is analogous to a text terminal: both refer to a machine or software application used as an
entry point to establish an independent operating system session. Although the most common
setup involves a singular graphical session running in the local machine, other less conventional
setups are also possible:
- Switch between active graphical desktop sessions in the same machine.
- More than one set of display devices (e.g. screen, keyboard, mouse) connected to the same
machine, each one controlling its own graphical desktop session.
- Remote graphical desktop sessions, where the graphical interface is sent through the network
to a remote display.
Remote desktop sessions are supported natively by X, which employs the X Display Manager
Control Protocol (XDMCP) to communicate with remote displays. Due to its high bandwidth usage,
XDMCP is rarely used through the internet or in low-speed LANs. Security issues are also a
concern with XDMCP: the local display communicates with a privileged remote X display manager
to execute remote procedures, so an eventual vulnerability could make it possible to execute
arbitrary privileged commands on the remote machine.
Furthermore, XDMCP requires X instances running on both ends of the connection, which can
make it unfeasible if the X Windows System is not available for all the machines involved. In

147

practice, other more efficient and less invasive methods are used to establish remote graphical
desktop sessions.
Virtual Network Computing (VNC) is a platform-independent tool to view and control remote
desktop environments using the Remote Frame Buffer protocol (RFB). Through it, events produced
by the local keyboard and mouse are transmitted to the remote desktop, which in turn sends back
any screen updates to be displayed locally. It is possible to run many VNC servers in the same
machine, but each VNC server needs an exclusive TCP port in the network interface accepting
incoming session requests. By convention, the first VNC server should use TCP port 5900, the
second should use 5901, and so on.
The VNC server does not need special privileges to run. An ordinary user can, for example, log in
to their remote account and start their own VNC server from there. Then, in the local machine,
any VNC client application can be used to access the remote desktop (assuming the corresponding
network ports are reachable). The ~/.vnc/xstartup file is a shell script executed by the VNC
server when it starts and can be used to define which desktop environment the VNC server will
make available for the VNC client. It is important to note that VNC does not provide modern
encryption and authentication methods natively, so it should be used in conjunction with a thirdparty application that provides such features. Methods involving VPN and SSH tunnels are often
used to secure VNC connections.
The Remote Desktop Protocol (RDP) is mainly used to remotely access the desktop of a Microsoft
Windows operating system through the TCP 3389 network port. Although it uses Microsoft’s
proprietary RDP protocol, the client implementation used in Linux systems are open-source
programs licensed under the GNU General Public License (GPL) and has no legal restrictions on
use.
Simple Protocol for Independent Computing Environments (Spice) comprises a suite of tools aimed
at accessing the desktop environment of virtualised systems, either in the local machine or in a
remote location. In addition to that, the Spice protocol offers native features to integrate the local
and remote systems, like the ability to access local devices (for example, the sound speakers and
the connected USB devices) from the remote machine and file sharing between the two systems.
There are specific client commands to connect to each one of these remote desktop protocols, but
the Remmina remote desktop client provides an integrated graphical interface that facilitates the
connection process, optionally storing the connection settings for later use. Remmina has plugins
for each individual protocol and there are plugins for XDMCP, VNC, RDP and Spice. The choice of
the right tool depends on the operating systems involved, the quality of the network connection
and what features of the remote desktop environment should be available.

148

1. What type of application provides windowed shell sessions in the desktop environment?

## 2. Due to the variety of Linux desktop environments, the same application may have more than
one version, each of them best suited for a particular widget toolkit. For example, the bittorrent
client Transmission has two versions: transmission-gtk and transmission-qt. Which of the two
should be installed to ensure maximum integration with KDE?

## 3. What Linux desktop environments are recommended for low-cost single board computers with
little processing power?

149

## 1. There are two ways to copy and paste text in the X Window System: using the traditional Ctrl + c
and Ctrl + v keystrokes (also available in the window menu) or to use the mouse middle-button
click to paste the currently selected text. What’s the appropriate way to copy and paste text
from a terminal emulator?

## 2. Most desktop environments assign the Alt + F2 keyboard shortcut to the Run program window,
where programs can be executed in a command line fashion. In KDE, what command would
execute the default terminal emulator?

## 3. What protocol is best suited to access a remote Windows desktop from a Linux desktop

150

This lesson is an overview of graphical desktops available for Linux systems. The X Window
System alone provides only simple interface features, so desktop environments extend the user
experience in the graphical windowed interface. The lesson goes through the following topics:
- Graphic interface and X Window System concepts.
- Desktop environments available for Linux.
- Similarities and differences between desktop environments.
- How to access a remote desktop environment.
The concepts and programs addressed were:
- X Window System.
- Popular desktop environments: KDE, Gnome, Xfce.
- Remote access protocols: XDMCP, VNC, RDP, Spice.

151

1. What type of application provides windowed shell sessions in the desktop environment?
Any terminal emulator like Konsole, Gnome terminal, xterm, etc., will give access to a local
interactive shell session.
2. Due to the variety of Linux desktop environments, the same application may have more than
one version, each of them best suited for a particular widget toolkit. For example, the bittorrent
client Transmission has two versions: transmission-gtk and transmission-qt. Which of the two
should be installed to ensure maximum integration with KDE?
KDE is built on top of the Qt library, so the Qt version — transmission-qt — should be installed.
3. What Linux desktop environments are recommended for low-cost single board computers with
little processing power?
Basic desktop environments that don’t use too much visual effects, such as Xfce and LXDE.

152

## 1. There are two ways to copy and paste text in the X Window System: using the traditional Ctrl + c
and Ctrl + v keystrokes (also available in the window menu) or to use the mouse middle-button
click to paste the currently selected text. What’s the appropriate way to copy and paste text
from a terminal emulator?
Interactive shell sessions assign the Ctrl + c keystroke to stop program execution, so the middlebutton method is recommended.
2. Most desktop environments assign the Alt + F2 keyboard shortcut to the Run program window,
where programs can be executed in a command line fashion. In KDE, what command would
execute the default terminal emulator?
The command konsole executes KDE’s terminal emulator, but generic terms like terminal also
works.
3. What protocol is best suited to access a remote Windows Desktop from a Linux desktop
The Remote Desktop Protocol (RDP), as it is natively supported by both Windows and Linux.

153

### 106.3 Accessibility
LPIC-1 version 5.0, Exam 102, Objective 106.3
- Basic knowledge of visual settings and themes.
- Basic knowledge of assistive technology.
- High Contrast/Large Print Desktop Themes.
- Screen Reader.
- Braille Display.
- Screen Magnifier.
- On-Screen Keyboard.
- Sticky/Repeat keys.
- Slow/Bounce/Toggle keys.
- Mouse keys.
- Gestures.
- Voice recognition.

154

### 106.3 Lesson 1

## 106. User Interfaces and Desktops

### 106.3 Accessibility

The Linux desktop environment has many settings and tools to adapt the user interface for people
with disabilities. The ordinary human interface devices — screen, keyboard and
mouse/touchpad — can be individually reconfigured to overcome visual impairments or reduced
mobility.
It is possible, for example, to adjust the desktop color scheme to better serve color-blind people.
Also, people suffering from repetitive strain injury may take advantage of alternative typing and
pointing methods.
Some of these accessibility features are provided by the desktop environment itself, like Gnome or
KDE, and others are provided by additional programs. In the latter case, it is important to pick the
tool that best integrates the desktop environment, so that the aid is of better quality.

Accessibility Settings
All major Linux distributions provide about the same accessibility features, which can be
customized with a configuration module found in the settings manager that come with the

155

desktop environment. The accessibility settings module is called Universal Access in the Gnome
desktop, whereas in KDE is under System Settings, Personalization, Accessibility. Other desktop
environments, like Xfce, also call it Accessibility in their graphical settings manager. However,
they offer a reduced set of functionalities compared to Gnome and KDE.
Gnome, for instance, can be configured to permanently show the Universal Access menu in the
top-right corner of the screen, where the accessibility options can be quickly switched on. It can
be used, for example, to replace the sound alert by a visual one, so users with hearing impairment
will be able to perceive system alerts more easily. Although KDE does not have a similar quickaccess menu, the visual alert feature is also available, but is called visual bell instead.

Keyboard and Mouse Assist
The default keyboard and mouse behaviour can be modified to get around specific mobility
difficulties. Key combinations, key auto repeat rate and unintended key presses can be significant
obstacles for users with reduced hand mobility. These typing shortcomings are addressed by three
keyboard related accessibility features: Sticky keys, Bounce keys and Slow keys.
The Sticky keys feature, found in the Typing Assist section of Gnome’s Universal Access
configuration, allows the user to type keyboard shortcuts one key at a time. When enabled, key
combinations like Ctrl + C do not need to be held down at the same time. The user may first press
the Ctrl key, release it and then press the C key. In KDE, this option is in the Modifier Keys tab of the
Accessibility settings window. KDE also offers the Locking Keys option: if enabled, the Alt , Ctrl and
Shift keys will stay “down” if the user presses them twice, similar to the Caps lock key behaviour.
Like the Caps Lock feature, the user will need to press the corresponding key again to release it.
The Bounce keys feature tries to inhibit unintended key presses by placing a delay between them,
that is, a new key press will be accepted only after a specified length of time has passed since the
last key press. Users with hand tremors may find the Bounce keys feature helpful to avoid
pressing a key multiple times when they only intend to press it once. In Gnome, this feature
concerns only same key repetitions, while in KDE it concerns any other key press as well and is
found in the Keyboard Filters tab.
The Slow keys feature also helps to avoid accidental key strokes. When enabled, Slow keys will
require the user to hold down the key for a specified length of time before it is accepted.
Depending on the user’s needs, it may also be helpful to adjust the automatic repetition while
holding a key down, available in the keyboard settings.
The Sticky keys and Slow keys accessibility features can be turned on and off with Activation
Gestures performed in the keyboard. In KDE, the Use gestures for activating sticky keys and slow
keys option should be checked to enable Activation Gestures, while in Gnome this feature is called

156

Enable by Keyboard in the Typing Assist configuration window. Once the Activation Gestures are
enabled, the Sticky keys feature will be activated after pressing the Shift key five consecutive
times. To activate the Slow keys feature, the Shift key must be held down for eight consecutive
seconds.
Users who find it more comfortable to use keyboard over the mouse or touchpad can resort to
keyboard shortcuts to get around in the desktop environment. Furthermore, a feature called
Mouse Keys allows the user to control the mouse pointer itself with the numerical keypad, which
is present in full-sized desktop keyboards and in larger laptops.
The numerical keypad is arranged into a square grid, so each number corresponds to a direction: 2
moves the cursor downwards, 4 moves the cursor to the left, 7 moves do cursor north-west, etc. By
default, number 5 corresponds to the left mouse click.
Whilst in Gnome there is only a switch to enable the Mouse Keys option at the Universal Access
settings window, in KDE the Mouse Keys settings are located at System Settings, Mouse, Keyboard
Navigation, and options like speed and acceleration can be customized.

The Slow keys, Stick keys, Bounce keys and Mouse keys are accessibility features
provided by AccessX, a resource within the X keyboard extension of the X Window
System. AccessX settings can also be modified from the command line, with the
xkbset command.

The mouse or touchpad can be used to generate keyboard input when keyboard usage is too
uncomfortable or not possible. If the Screen Keyboard switch in Gnome’s Universal Access settings
is enabled, then an on-screen keyboard will appear every time the cursor is in a text field and new
text is entered by clicking the keys with the mouse or touchscreen, much like the virtual keyboard
of smartphones.
KDE and other desktop environments may not provide the screen keyboard by default, but the
onboard package can be manually installed to provide a simple on-screen keyboard that can be
used in any desktop environment. After installation, it will be available as a regular application in
the application launcher.
The pointer behaviour can also be modified if clicking and dragging the mouse causes pain or is
impracticable for any other reason. If the user is not able to click the mouse button quick enough
to trigger a double-click event, for example, the time interval to press the mouse button a second
time to double-click can be increased in the Mouse Preferences in the system configuration
window.
If the user is not able to press one of the mouse buttons or none of the mouse buttons, then mouse
clicks can be simulated using different techniques. In the Click Assist section of the Gnome

157

Universal Access, the Simulate a right mouse click option will generate a right-click if the user
presses and holds the left mouse button. With the Simulate clicking by hovering option enabled, a
click event will be triggered when the user holds the mouse still. In KDE, the KMouseTool
application will provide these same features to assist mouse actions.

Visual Impairments
Users with reduced eyesight may still be able to use the monitor screen to interact with the
computer. Depending on the user’s needs, many visual adjustments can be made to improve the
otherwise hard to see details of the standard graphical desktop.
Gnome’s Seeing section of Universal Access settings provide options that can help people with
reduced eyesight:
High Contrast
will make windows and buttons easier to see by drawing them in sharper colors.
Large Text
will enlarge the standard screen font size.
Cursor Size
allows to choose a bigger mouse cursor, making it easier to locate on the screen.
Some of these adjustments are not strictly related to accessibility features, thus can be found in
the appearance section of the configuration utility provided by other desktop environments. A
user having difficulties discerning between visual elements can choose a high-contrast theme to
make it easier to identify buttons, overlapping windows, etc.
If appearance adjustments alone are not enough to improve screen readability, then a screen
magnifier program can be used to zoom in on parts of the screen. This feature is called Zoom in
Gnome’s Universal Access settings, where options like magnification ratio, position of the
magnifier and color adjustments can be customized.
In KDE, the KMagnifier program provides the same features, but it is available as an ordinary
application through the application launcher. Other desktop environments may provide their own
screen magnifiers. Xfce, for example, will zoom in and out the screen by rotating the mouse
scrolling wheel while the Alt key is down.
Finally, users for whom the graphical interface is not an option can use a screen reader to interact
with the computer. Regardless of the chosen desktop environment, the most popular screen
reader for Linux systems is Orca, which is usually installed by default in most distributions. Orca

158

generates a synthesized voice to report screen events and to read the text under the mouse cursor.
Orca also works with refreshable braille displays, special devices that display braille characters by
raising small pins that can be felt with the fingertips. Not all desktop applications are fully
adapted for screen readers and not all users will find it easy to use them, so it is important to
provide as many screen reading strategies as possible for users to choose from.

159

## 1. What accessibility feature could help a user to alternate between open windows using the
keyboard, considering that the user is unable to press the Alt and Tab keys at the same time?

## 2. How could the Bounce keys accessibility feature help users whose involuntary hand tremors
disturb their typing?

3. What is the most common Activation Gestures for the Sticky keys accessibility feature?

160

## 1. Accessibility features may not be provided by a single application and may vary from one
desktop environment to another. In KDE, what application helps those with repetitive strain
injuries by clicking the mouse whenever the mouse cursor pauses briefly?

## 2. What appearance aspects of the graphical environment can be modified to make it easier for
people to read text on the screen?

## 3. In what ways can the Orca application help visually impaired users to interact with the desktop

161

This lesson covers general accessibility features available in Linux systems. All major desktop
environments, specially Gnome and KDE, provide many builtin and third-party applications to
assist people with visual impairments or reduced mobility. The lesson goes through the following
topics:
- How to change accessibility settings.
- Alternative ways to use the keyboard and mouse.
- Desktop enhancements for the visually impaired.
- Keyboard accessibility settings: Sticky keys, Slow keys, Bounce keys.
- Artificially generate mouse events.
- On-screen keyboard.
- Visual settings to enhance readability.
- High Contrast/Large Print Desktop Themes.
- Screen magnifiers.
- The Orca screen reader.

162

## 1. What accessibility feature could help a user to alternate between open windows using the
keyboard, considering that the user is unable to press the Alt and Tab keys at the same time?
The Sticky keys feature, which allows the user to type keyboard shortcuts one key at a time.
2. How could the Bounce keys accessibility feature help users whose involuntary hand tremors
disturb their typing?
With Bounce keys enabled, a new key press will be accepted only after a specified length of
time has passed since the last key press.
3. What is the most common Activation Gestures for the Sticky keys accessibility feature?
If Activation Gestures are enabled, the Sticky keys feature will be activated after pressing the
Shift key five consecutive times.

163

## 1. Accessibility features may not be provided by a single application and may vary from one
desktop environment to another. In KDE, what application helps those with repetitive strain
injuries by clicking the mouse whenever the mouse cursor pauses briefly?
The KMouseTool application.
2. What appearance aspects of the graphical environment can be modified to make it easier for
people to read text on the screen?
Setting a large screen font size in the desktop configuration will make all screen texts easier to
read.
3. In what ways can the Orca application help visually impaired users to interact with the desktop
Orca is a screen reader that generates a synthesized voice to report screen events and to read
the text under the mouse cursor. It also works with devices called refreshable braille displays,
so the user can identify the text with tactile patterns.

164

LPIC-1 (102) (Version 5.0) |

## Topic 107: Administrative Tasks

165

### 107.1 Manage user and group accounts and related system files
LPIC-1 version 5.0, Exam 102, Objective 107.1
- Add, modify and remove users and groups.
- Manage user/group info in password/group databases.
- Create and manage special purpose and limited accounts.
- /etc/passwd
- /etc/shadow
- /etc/group
- /etc/skel/
- chage
- getent
- groupadd
- groupdel
- groupmod
- passwd
- useradd

166

- userdel
- usermod

167

### 107.1 Lesson 1

### 107.1 Manage user and group accounts and
related system files

User and group administration is a very important part of any system administrator’s job. Modern
Linux distributions implement graphical interfaces that allow you to manage all the activities
related to this key aspect quickly and easily. These interfaces are different from each other in
terms of graphical layouts, but the features are the same. With these tools you can view, edit, add,
and delete local users and groups. However for more advanced management you need to work
through the command line.

Adding User Accounts
In Linux, you can add a new user account with the useradd command. For example, acting with
root privileges, you can create a new user account named michael with a default setting, using
the following:

168

When you run the useradd command, the user and group information stored in the password
and group databases are updated for the newly created user account and, if specified, the home
directory of the new user is created as well. A group with the same name of the new user account
is also created.
Once you have created the new user, you can set its password using the passwd command. You
can review its User ID (UID), Group ID (GID) and the groups it belongs to through the id and
groups commands.
Changing password for user michael.
New UNIX password:
Retype new UNIX password:
passwd: all authentication tokens updated successfully.
uid=1000(michael) gid=100(michael) groups=100(michael)
michael : michael

Remember that any user can review their UID, GID and the groups they belong to
by simply using the id and groups commands without arguments, and that any
user can change their password using the passwd command. However only users
with root privileges can change any user’s password.

The most important options which apply to the useradd command are:
-c
Create a new user account with custom comments (for example the user’s full name).
Create a new user account with a custom home directory.
Create a new user account by setting a specific date on which it will be disabled.
Create a new user account by setting the number of days after a password expires during
which the user should update the password (otherwise the account will be disabled).
-g
Create a new user account with a specific GID.

169

-G
Create a new user account by adding it to multiple secondary groups.
-k
Create a new user account by copying the skeleton files from a specific custom directory (this
option is only valid if the -m or --create-home option is specified).
Create a new user account with its home directory (if it does not exist).
-M
Create a new user account without its home directory.
Create a new user account with a specific login shell.
Create a new user account with a specific UID.
See the manual pages for the useradd command for the complete list of options.

Modifying User Accounts
Sometimes you need to change an attribute of an existing user account, such as the login name,
login shell, password expiry date and so on. In such cases, you need to use the usermod command.

Just as with the useradd command, the usermod command requires root privileges.
In the examples above, the login shell of michael is changed first and then a brief description is
added to this user account. Remember that you can modify multiple attributes at once, specifying
them in a single command.
The most important options which apply to the usermod command are:
-c
Add a brief comment to the specified user account.

170

Change the home directory of the specified user account. When used with the -m option, the
contents of the current home directory are moved to the new home directory, which is created
if it does not already exist.
Set the expiration date of the specified user account.
Set the number of days after a password expires during which the user should update the
password (otherwise the account will be disabled).
-g
Change the primary group of the specified user account (the group must exist).
-G
Add secondary groups to the specified user account. Each group must exist and must be
separated from the next by a comma, with no intervening whitespace. If used alone, this option
removes all existing groups to which the user belongs, while when used with the -a option, it
simply appends new secondary groups to the existing ones.
Change the login name of the specified user account.
-L
Lock the specified user account. This puts an exclamation mark in front of the encrypted
password within the /etc/shadow file, thus disabling access with a password for that user.
Change the login shell of the specified user account.
Change the UID of the specified user account.
-U
Unlock the specified user account. This removes the exclamation mark in front of the
encrypted password with the /etc/shadow file.
See the manual pages for the usermod command for the complete list of options.

Remember that when you change the login name of a user account, you should

171

probably rename the home directory of that user and other user-related items such
as mail spool files. Also remember that when you change the UID of a user account,
you should probably fix the ownership of files and directories outside the user’s
home directory (the user ID is changed automatically for the user’s mailbox and for
all files owned by the user and located in the user’s home directory).

Deleting User Accounts
If you want to delete a user account, you can use the userdel command. In particular, this
command updates the information stored in the account databases, deleting all entries referring
to the specified user. The -r option also removes the user’s home directory and all its contents,
along with the user’s mail spool. Other files, located elsewhere, must be searched for and deleted
manually.

As for useradd and usermod, you need root authority to delete user accounts.

Adding, Modifying and Deleting Groups
Just as with user management, you can add, modify and delete groups using the groupadd,
groupmod and groupdel commands with root privileges. If you want to create a new group
named developer, you can run the following command:

The -g option of this command creates a group with a specific GID.

Remember that when you add a new user account, the primary group and the
secondary groups to which it belongs must exist before launching the useradd
command.

Later, if you want to rename the group from developer to web-developer and change its GID,
you can run the following:

172

Remember that if you change the GID using the -g option, you should change the GID
of all files and directories that must continue to belong to the group.

Finally, if you want to delete the web-developer group, you can run the following:

You cannot delete a group if it is the primary group of a user account. Therefore, you must remove
the user before removing the group. As for users, if you delete a group, the files belonging to that
group remain in your filesystem and are not deleted or assigned to another group.

The Skeleton Directory
When you add a new user account, even creating its home directory, the newly created home
directory is populated with files and folders that are copied from the skeleton directory (by
default /etc/skel). The idea behind this is simple: a system administrator wants to add new
users having the same files and directories in their home folder. Therefore, if you want to
customize the files and folders that are created automatically in the home directory of new user
accounts, you must add these new files and folders to the skeleton directory.

Note that if you want to list all the files and directories in the skeleton directory, you
must use the ls -al command.

The /etc/login.defs File
In Linux, the /etc/login.defs file specifies the configuration parameters that control the
creation of users and groups. In addition, the commands shown in the previous sections take
default values from this file.
The most important directives are:
UID_MIN and UID_MAX
The range of user IDs that can be assigned to new ordinary users.
GID_MIN and GID_MAX
The range of group IDs that can be assigned to new ordinary groups.
CREATE_HOME
Specify whether a home directory should be created by default for new users.
USERGROUPS_ENAB
Specify whether the system should by default create a new group for each new user account
with the same name as the user, and whether deleting the user account should also remove the

173

user’s primary group if it no longer contains members.
MAIL_DIR
The mail spool directory.
PASS_MAX_DAYS
The maximum number of days a password may be used.
PASS_MIN_DAYS
The minimum number of days allowed between password changes.
PASS_MIN_LEN
The minimum acceptable password length.
PASS_WARN_AGE
The number of warning days before a password expires.

When managing users and groups, always check this file to view and eventually
change the default behavior of the system if needed.

The passwd Command
This command is primarily used to change a user’s password. As described before, any user can
change their own password, but only root can change any user’s password. This happens because
the passwd command has the SUID bit set (an s in the place of the executable flag for the owner),
which means that it executes with the privileges of the file’s owner (thus root).
-rwsr-xr-x 1 root root 42096 mag 17

2015 /usr/bin/passwd

Depending on the passwd options used, you can control specific aspects of password aging:
Delete the password of a user account (thus disabling the user).
Force the user account to change the password.
-i
Set the number of days of inactivity after a password expires during which the user should

174

update the password (otherwise the account will be disabled).
Lock the user account (the encrypted password is prefixed with an exclamation mark in the
/etc/shadow file).
-n
Set the minimum password lifetime.
-S
Output information about the password status of a specific user account.
Unlock the user account (the exclamation mark is removed from the password field in the
/etc/shadow file).
-x
Set the maximum password lifetime.
-w
Set the number of days of warning before the password expires during which the user is
warned that the password must be changed.

Groups can also have a password, which can be set using the gpasswd command.
Users, who are not members of a group but know its password, can join it
temporarily using the newgrp command. Remember that gpasswd is also used to
add and remove users from a group and to set the list of administrators and
ordinary members of the group.

The chage Command
This command, which stands for “change age”, is used to change the password aging information
of a user. The chage command is restricted to root, except for the -l option, which can be used by
ordinary users to list password aging information of their own account.
The other options which apply to the chage command are:
Set the last password change for a user account.

175

-E
Set the expiration date for a user account.
-I
Set the number of days of inactivity after a password expires during which the user should
update the password (otherwise the account will be disabled).
Set the minimum password lifetime for a user account.
-M
Set the maximum password lifetime for a user account.
-W
Set the number of days of warning before the password expires during which the user is
warned that the password must be changed.

176

## 1. For each of the following commands, identify the corresponding purpose:
usermod -L
passwd -u
chage -E
groupdel
useradd -s
groupadd -g
userdel -r
usermod -l
groupmod -n
useradd -m
2. For each of the following passwd commands, identify the corresponding chage command:
passwd -n
passwd -x
passwd -w
passwd -i
passwd -S
3. Explain in detail the purpose of the commands in the previous question:

4. What commands can you use to lock a user account? And which commands to unlock it?

177

## 1. Using the groupadd command, create the administrators and developers groups. Assume
you are working as root.

## 2. Now that you have created these groups, run the following command: useradd -G
administrators,developers kevin. What operations does this command perform? Assume
that CREATE_HOME and USERGROUPS_ENAB in /etc/login.defs are set to yes.
