---
id: lpi-101-500-06
title: "LPIC-1 · 101-500 — In a preemptive multi-tasking system, what happens when a lower…"
slug: lpi-101-500-06-lpic-1-101-500-in-a-preemptive-multi-tasking-system-what-hap
source: "LPI Learning Material — LPIC-1 (Exam 101-500)"
sourceSection: "1. In a preemptive multi-tasking system, what happens when a lower priority process is, 2. Consider the following top screen:, 3. Consider the following ps -el listing:, 4. After trying to renice a process with renice, the following error happens:, 1. Changing process priorities is usually required "
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "This lesson covers how Linux shares CPU time among its managed processes. Covers 30 sections: In a preemptive multi-tasking system, what happens when a lower priority process is, Consider the following top screen:,."
---
# LPIC-1 · 101-500 — In a preemptive multi-tasking system, what happens when a lower…

## 2. Consider the following top screen:
top - 08:43:14 up 23 days, 12:29,

5 users,

load average: 0,13, 0,18, 0,21

Tasks: 240 total,

2 running, 238 sleeping,

0,4 sy,

1,4 us,

0,0 ni, 98,1 id,

0,0 hi,

MiB Mem :

7726,4 total,

590,9 free,

1600,8 used,

5534,7 buff/cache

MiB Swap:

30517,0 total,

30462,5 free,

54,5 used.

5769,4 avail Mem

SHR S

171420

10668

7612 S

0,1

9:59.15 systemd

0:02.76 kthreadd

0:00.00 rcu_gp

0:00.00 rcu_par_gp

0:00.00 mm_percpu_wq

0:49.06 ksoftirqd/0

18:24.20 rcu_sched

0:08.17 migration/0

14 root

15 root

0:00.00 cpuhp/1

16 root

0:11.79 migration/1

17 root

0:26.01 ksoftirqd/1

C PRI

NI ADDR SZ WCHAN

TTY

What PIDs have real-time priorities?

## 3. Consider the following ps -el listing:
F S

UID

PPID

0 - 42855 -

00:09:59 systemd

00:00:02 kthreadd

60 -20 -

00:00:00 rcu_gp

00:00:49 ksoftirqd/0

00:18:26 rcu_sched

00:00:00 rcu_bh

12

0 -40

- -

00:00:08 migration/0

353

14

00:00:00 cpuhp/0

5 S

15

00:00:00 cpuhp/1

Which PID has higher priority?

## 4. After trying to renice a process with renice, the following error happens:
$ renice -10 21704
renice: failed to set priority for 21704 (process ID): Permission denied

What is the probable cause for the error?

354

## 1. Changing process priorities is usually required when a process is occupying too much CPU
time. Using ps with standard options for printing all system processes in long format, what
--sort flag will sort processes by CPU utilization, increasing order?

## 2. Command schedtool can set all CPU scheduling parameters Linux is capable of or display
information for given processes. How can it be used to display the scheduling parameters of
process 1750? Also, how can schedtool be used to change process 1750 to real-time with
priority -90 (as displayed by top)?

355

This lesson covers how Linux shares CPU time among its managed processes. To ensure best
performance, more critical processes must overtake less critical processes. The lesson goes
through the following steps:
- Basic concepts about multi-processing systems.
- What is a process scheduler and how Linux implements it.
- What are Linux priorities, nice numbers and their purpose.
- How to read and interpret process priorities in Linux.
- How to change the priority of a process, before and during its execution.

356

## 1. In a preemptive multi-tasking system, what happens when a lower priority process is
occupying the processor and a higher priority process is queued to be executed?
The lower priority process pauses and the higher priority process is executed instead.
2. Consider the following top screen:
top - 08:43:14 up 23 days, 12:29,

5 users,

load average: 0,13, 0,18, 0,21

Tasks: 240 total,

2 running, 238 sleeping,

0,4 sy,

1,4 us,

0,0 ni, 98,1 id,

0,0 hi,

MiB Mem :

7726,4 total,

590,9 free,

1600,8 used,

5534,7 buff/cache

MiB Swap:

30517,0 total,

30462,5 free,

54,5 used.

5769,4 avail Mem

SHR S

171420

10668

7612 S

0,1

9:59.15 systemd

0:02.76 kthreadd

0:00.00 rcu_gp

0:00.00 rcu_par_gp

0:00.00 mm_percpu_wq

0:49.06 ksoftirqd/0

18:24.20 rcu_sched

0:08.17 migration/0

14 root

15 root

0:00.00 cpuhp/1

16 root

0:11.79 migration/1

17 root

0:26.01 ksoftirqd/1

What PIDs have real-time priorities?
PIDs 12 and 16.
3. Consider the following ps -el listing:
F S

UID

PPID

C PRI

NI ADDR SZ WCHAN

TTY

0 - 42855 -

00:09:59 systemd

00:00:02 kthreadd

60 -20 -

00:00:00 rcu_gp

00:00:49 ksoftirqd/0

00:18:26 rcu_sched

357

00:00:00 rcu_bh

12

0 -40

- -

00:00:08 migration/0

14

00:00:00 cpuhp/0

5 S

15

00:00:00 cpuhp/1

Which PID has higher priority?
PID 12.
4. After trying to renice a process with renice, the following error happens:
$ renice -10 21704
renice: failed to set priority for 21704 (process ID): Permission denied

What is the probable cause for the error?
Only user root can decrease nice numbers below zero.

358

## 1. Changing process priorities is usually required when a process is occupying too much CPU
time. Using ps with standard options for printing all system processes in long format, what
--sort flag will sort processes by CPU utilization, increasing order?
$ ps -el --sort=pcpu

## 2. Command schedtool can set all CPU scheduling parameters Linux is capable of or display
information for given processes. How can it be used to display the scheduling parameters of
process 1750? Also, how can schedtool be used to change process 1750 to real-time with
priority -90 (as displayed by top)?
$ schedtool 1750

$ schedtool -R -p 89 1750

359

### 103.7 Search text files using regular expressions
LPIC-1 v5, Exam 101, Objective 103.7
- Create simple regular expressions containing several notational elements.
- Understand the differences between basic and extended regular expressions.
- Understand the concepts of special characters, character classes, quantifiers and anchors.
- Use regular expression tools to perform searches through a filesystem or file content.
- Use regular expressions to delete, change and substitute text.
- grep
- egrep
- fgrep
- sed
- regex(7)

360

### 103.7 Lesson 1

### 103.7 Search text files using regular expressions

String-searching algorithms are widely used by several data-processing tasks, so much that Unixlike operating systems have their own ubiquitous implementation: Regular expressions, often
abbreviated to REs. Regular expressions consist of character sequences that make up a generic
pattern used to locate and sometimes modify a corresponding sequence in a larger string of
characters. Regular expressions greatly expand the ability to:
- Write parsing rules to requests in HTTP servers, nginx in particular.
- Write scripts that convert text-based datasets to another format.
- Search for occurrences of interest in journal entries or documents.
- Filter markup documents, keeping semantic content.
The simplest regular expression contains at least one atom. An atom, so named because it’s the
basic element of a regular expression, is just a character that may or may not have special
meaning. Most ordinary characters are unambiguous, they retain their literal meaning, while
others have special meaning:

361

. (dot)
Atom matches with any character.
^ (caret)
Atom matches with the beginning of a line.
$ (dollar sign)
Atom matches with the end of a line.
For example, the regular expression bc, composed by the literal atoms b and c, can be found in
the string abcd, but can not be found in the string a1cd. On the other hand, the regular expression
.c can be found in both strings abcd and a1cd, as the dot . matches with any character.
The caret and dollar sign atoms are used when only matches at the beginning or at the end of the
string are of interest. For that reason they are also called anchors. For example, cd can be found in
abcd, but ^cd can not. Similarly, ab can be found in abcd, but ab$ can not. The caret ^ is a literal
character except when at the beginning and $ is a literal character except when at the end of the
regular expression.

Bracket Expression
There is another type of atom named bracket expression. Although not a single character, brackets
[] (including their content) are considered a single atom. A bracket expression usually is just a list
of literal characters enclosed by [], making the atom match any single character from the list. For
example, the expression [1b] can be found in both strings abcd and a1cd. To specify characters
the atom should not correspond to, the list must begin with ^, as in [^1b]. It is also possible to
specify ranges of characters in bracket expressions. For example, [0−9] matches digits 0 to 9 and
[a−z] matches any lowercase letter. Ranges must be used with caution, as they might not be
consistent across distinct locales.
Bracket expression lists also accept classes instead of just single characters and ranges. Traditional
character classes are:
[:alnum:]
Represents an alphanumeric character.
[:alpha:]
Represents an alphabetic character.
[:ascii:]
Represents a character that fits into the ASCII character set.
362

[:blank:]
Represents a blank character, that is, a space or a tab.
[:cntrl:]
Represents a control character.
[:digit:]
Represents a digit (0 through 9).
[:graph:]
Represents any printable character except space.
[:lower:]
Represents a lowercase character.
[:print:]
Represents any printable character including space.
[:punct:]
Represents any printable character which is not a space or an alphanumeric character.
[:space:]
Represents white-space characters: space, form-feed (\f), newline (\n), carriage return (\r),
horizontal tab (\t), and vertical tab (\v).
[:upper:]
Represents an uppercase letter.
[:xdigit:]
Represents hexadecimal digits (0 through F).
Character classes can be combined with single characters and ranges, but may not be used as an
endpoint of a range. Also, character classes may be used only in bracket expressions, not as an
independent atom outside the brackets.

Quantifiers
The reach of an atom, either a single character atom or a bracket atom, can be adjusted using an
atom quantifier. Atom quantifiers define atom sequences, that is, matches occur when a contiguous
repetition for the atom is found in the string. The substring corresponding to the match is called a

363

piece. Notwithstanding, quantifiers and other features of regular expressions are treated
differently depending on which standard is being used.
As defined by POSIX, there are two forms of regular expressions: “basic” regular expressions and
“extended” regular expressions. Most text related programs in any conventional Linux
distribution support both forms, so it is important to know their differences in order to avoid
compatibility issues and to pick the most suitable implementation for the intended task.
The * quantifier has the same function in both basic and extended REs (atom occurs zero or more
times) and it’s a literal character if it appears at the beginning of the regular expression or if it’s
preceded by a backslash \. The plus sign quantifier ` will select pieces containing one
or more atom matches in sequence. With the question mark quantifier `?`, a
match will occur if the corresponding atom appears once or if it doesn't
appear at all. If preceded by a backslash `\`, their special meaning is not
considered. Basic regular expressions also support ` and ? quantifiers, but they need
to be preceded by a backslash. Unlike extended regular expressions, + and ? by themselves are
literal characters in basic regular expressions.

Bounds
A bound is an atom quantifier that, as the name implies, allows a user to specify precise quantity
boundaries for an atom. In extended regular expressions, a bound may appear in three forms:
{i}
The atom must appear exactly i times (i an integer number). For example, [[:blank:]]{2}
matches with exactly two blank characters.
{i,}
The atom must appear at least i times (i an integer number). For example, [[:blank:]]{2,}
matches with any sequence of two or more blank characters.
{i,j}
The atom must appear at least i times and at most j times (i and j integer numbers, j greater
then i). For example, xyz{2,4} matches the xy string followed by two to four of the z
character.
In any case, if a substring matches with a regular expression and a longer substring starting at the
same point also matches, the longer substring will be considered.
Basic regular expressions also support bounds, but the delimiters must be preceded by \: \{ and
\}. By themselves, { and } are interpreted as literal characters. A \{ followed by a character other

364

than a digit is a literal character, not the beginning of a bound.

Branches and Back References
Basic regular expressions also differ from extended regular expressions in another important
aspect: an extended regular expression can be divided into branches, each one an independent
regular expression. Branches are separated by | and the combined regular expression will match
anything that corresponds to any of the branches. For example, he|him will match if either
substring he or him are found in the string being examined. Basic regular expressions interpret |
as a literal character. However, most programs supporting basic regular expressions will allow
branches with \|.
An extended regular expression enclosed in () can be used in a back reference. For example,
([[:digit:]])\1 will match any regular expression that repeats itself at least once, because the
\1 in the expression is the back reference to the piece matched by the first parenthesized
subexpression. If more than one parenthesized subexpression exist in the regular expression, they
can be referenced with \2, \3 and so on.
For basic REs, subexpressions must be enclosed by \( and \), with ( and ) by themselves
ordinary characters. The back reference indicator is used like in extended regular expressions.

Searching with Regular Expressions
The immediate benefit offered by regular expressions is to improve searches on filesystems and in
text documents. The -regex option of command find allows to test every path in a directory
hierarchy against a regular expression. For example,
$ find $HOME -regex '.*/\..*' -size +100M

searches for files greater than 100 megabytes (100 units of 1048576 bytes), but only in paths inside
the user’s home directory that do contain a match with .*/\..*, that is, a /. surrounded by any
other number of characters. In other words, only hidden files or files inside hidden directories
will be listed, regardless of the position of /. in the corresponding path. For case insensitive
regular expressions, the -iregex option should be used instead:
$ find /usr/share/fonts -regextype posix-extended -iregex
'.*(dejavu|liberation).*sans.*(italic|oblique).*'
/usr/share/fonts/dejavu/DejaVuSansCondensed-BoldOblique.ttf
/usr/share/fonts/dejavu/DejaVuSansCondensed-Oblique.ttf
/usr/share/fonts/dejavu/DejaVuSans-BoldOblique.ttf

365

/usr/share/fonts/dejavu/DejaVuSans-Oblique.ttf
/usr/share/fonts/dejavu/DejaVuSansMono-BoldOblique.ttf
/usr/share/fonts/dejavu/DejaVuSansMono-Oblique.ttf
/usr/share/fonts/liberation/LiberationSans-BoldItalic.ttf
/usr/share/fonts/liberation/LiberationSans-Italic.ttf

In this example, the regular expression contains branches (written in extended style) to list only
specific font files under the /usr/share/fonts directory hierarchy. Extended regular
expressions are not supported by default, but find allows for them to be enabled with
-regextype posix-extended or -regextype egrep. The default RE standard for find is
findutils-default, which is virtually a basic regular expression clone.
It is often necessary to pass the output of a program to command less when it doesn’t fit on the
screen. Command less splits its input in pages, one screenful at a time, allowing the user to easily
navigate the text up and down. In addition, less also allows a user to perform regular expression
based searches. This feature is notably important because less is the default paginator used for
many everyday tasks, like inspecting journal entries or consulting manual pages. When reading a
manual page, for instance, pressing the / key will open a search prompt. This is a typical scenario
in which regular expressions are useful, as command options are listed just after a page margin in
the general manual page layout. However, the same option might appear many times through the
text, making literal searches unfeasible. Regardless of that, typing ^[[:blank:]]*-o — or more
simply: ^ *-o — in the search prompt will jump immediately to option the -o section (if it exists)
after pressing Enter, thus allowing one to consult an option description more rapidly.

366

1. What extended regular expression would match any email address, like info@example.org?

2. What extended regular expression would only match any IPv4 address in the standard dottedquad format, like 192.168.15.1?

## 3. How can the grep command be used to list the contents of file /etc/services, discarding all
comments (lines starting with #)?

## 4. The file domains.txt contains a list of domain names, one per line. How would the egrep
command be used to list only .org or .com domains?

367

## 1. From the current directory, how would the find command use an extended regular expression
to search for all files not containing a standard file suffix (file names not ending in .txt or .c,
for example)?

2. Command less is the default paginator for displaying long text files in the shell environment.
By typing /, a regular expression can be entered in the search prompt to jump to the first
corresponding match. In order to stay in the current document position and only highlight the
corresponding matches, what key combination should be entered at the search prompt?

## 3. In less, how would it be possible to filter the output so only lines which match a regular
expression get displayed?

368

This lesson covers the general Linux support for regular expressions, a widely used standard
whose pattern matching capabilities are supported by most text related programs. The lesson goes
through the following steps:
- What a regular expression is.
- The main components of a regular expression.
- The differences between regular and extended regular expressions.
- How to perform simple text and file searches using regular expressions.

369

## 1. What extended regular expression would match any email address, like info@example.org?
egrep "\S+@\S+\.\S+"

2. What extended regular expression would only match any IPv4 address in the standard dottedquad format, like 192.168.15.1?
egrep "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}"

## 3. How can the grep command be used to list the contents of file /etc/services, discarding all
comments (lines starting with #)?
grep -v ^# /etc/services

## 4. The file domains.txt contains a list of domain names, one per line. How would the egrep
command be used to list only .org or .com domains?
egrep ".org$|.com$" domains.txt

370

## 1. From the current directory, how would the find command use an extended regular expression
to search for all files not containing a standard file suffix (file names not ending in .txt or .c,
for example)?
find . -type f -regextype egrep -not -regex '.*\.[[:alnum:]]{1,}$'

2. Command less is the default paginator for displaying long text files in the shell environment.
By typing /, a regular expression can be entered in the search prompt to jump to the first
corresponding match. In order to stay in the current document position and only highlight the
corresponding matches, what key combination should be entered at the search prompt?
Pressing Ctrl + K before entering the search expression.
3. In less, how would it be possible to filter the output so only lines which match a regular
expression get displayed?
By pressing & and entering the search expression.

371

### 103.7 Lesson 2

### 103.7 Search text files using regular expressions

Streaming data through a chain of piped commands allows for the application of compound filters
based on regular expressions. Regular expressions are an important technique used not only in
system administration, but also in data mining and related areas. Two commands are specially
suited to manipulate files and text data using regular expressions: grep and sed. grep is a pattern
finder and sed is a stream editor. They are useful by themselves, but it is when working together
with other processes that they stand out.

The Pattern Finder: grep
One of the most common uses of grep is to facilitate the inspection of long files, using the regular
expression as a filter applied to each line. It can be used to show only the lines starting with a
certain term. For example, grep can be used to investigate a configuration file for kernel modules,
listing only option lines:
$ grep '^options' /etc/modprobe.d/alsa-base.conf
options snd-pcsp index=-2
options snd-usb-audio index=-2

372

options bt87x index=-2
options cx88_alsa index=-2
options snd-atiixp-modem index=-2
options snd-intel8x0m index=-2
options snd-via82xx-modem index=-2

The pipe | character can be employed to redirect the output of a command directly to grep's
input. The following example uses a bracket expression to select lines from fdisk -l output,
starting with Disk /dev/sda or Disk /dev/sdb:
Disk /dev/sda: 320.1 GB, 320072933376 bytes, 625142448 sectors
Disk /dev/sdb: 7998 MB, 7998537728 bytes, 15622144 sectors

The mere selection of lines with matches may not be appropriate for a particular task, requiring
adjustments to grep's behavior through its options. For example, option -c or --count tells grep
to show how many lines had matches:

The option can be placed before or after the regular expression. Other important grep options
-c or --count
Instead of displaying the search results, only display the total count for how many times a
match occurs in any given file.
-i or --ignore-case
Turn the search case-insensitive.
-f FILE or --file=FILE
Indicate a file containing the regular expression to use.
-n or --line-number
Show the number of the line.
-v or --invert-match
Select every line, except those containing matches.

373

-H or --with-filename
Print also the name of the file containing the line.
-z or --null-data
Rather than have grep treat input and output data streams as separate lines (using the newline
by default) instead take the input or output as a sequence of lines. When combining output
from the find command using its -print0 option with the grep command, the -z or --null
-data option should be used to process the stream in the same manner.
Although activated by default when multiple file paths are given as input, the option -H is not
activated for single files. That may be critical in special situations, like when grep is called
directly by find, for instance:
$ find /usr/share/doc -type f -exec grep -i '3d modeling' "{}" \; | cut -c -100
artistic aspects of 3D modeling. Thus this might be the application you are
This major approach of 3D modeling has not been supported
oce is a C++ 3D modeling library. It can be used to develop CAD/CAM softwares, for instance
[FreeCad

In this example, find lists every file under /usr/share/doc then passes each one to grep, which
in turn performs a case-insensitive search for 3d modeling inside the file. The pipe to cut is
there just to limit output length to 100 columns. Note, however, that there is no way of knowing
from which file the lines came from. This issue is solved by adding -H to grep:
$ find /usr/share/doc -type f -exec grep -i -H '3d modeling' "{}" \; | cut -c -100
/usr/share/doc/openscad/README.md:artistic aspects of 3D modeling. Thus this might be the
applicatio
/usr/share/doc/opencsg/doc/publications.html:This major approach of 3D modeling has not been
support

Now it is possible to identify the files where each match was found. To make the listing even more
informative, leading and trailing lines can be added to lines with matches:
$ find /usr/share/doc -type f -exec grep -i -H -1 '3d modeling' "{}" \; | cut -c -100
/usr/share/doc/openscad/README.md-application Blender), OpenSCAD focuses on the CAD aspects
rather t
/usr/share/doc/openscad/README.md:artistic aspects of 3D modeling. Thus this might be the
applicatio
/usr/share/doc/openscad/README.md-looking for when you are planning to create 3D models of
machine p

374

/usr/share/doc/opencsg/doc/publications.html-3D graphics library for Constructive Solid
Geometry (CS
/usr/share/doc/opencsg/doc/publications.html:This major approach of 3D modeling has not been
support
/usr/share/doc/opencsg/doc/publications.html-by real-time computer graphics until recently.

The option -1 instructs grep to include one line before and one line after when it finds a line with
a match. These extra lines are called context lines and are identified in the output by a minus sign
after the file name. The same result can be obtained with -C 1 or --context=1 and other context
line quantities may be indicated.
There are two complementary programs to grep: egrep and fgrep. The program egrep is
equivalent to the command grep -E, which incorporates extra features other than the basic
regular expressions. For example, with egrep it is possible to use extended regular expression
features, like branching:
$ find /usr/share/doc -type f -exec egrep -i -H -1 '3d (modeling|printing)' "{}" \; | cut -c
-100
/usr/share/doc/openscad/README.md-application Blender), OpenSCAD focuses on the CAD aspects
rather t
/usr/share/doc/openscad/README.md:artistic aspects of 3D modeling. Thus this might be the
applicatio
/usr/share/doc/openscad/README.md-looking for when you are planning to create 3D models of
machine p
/usr/share/doc/openscad/RELEASE_NOTES.md-* Support for using 3D-Mouse / Joystick / Gamepad
input dev
/usr/share/doc/openscad/RELEASE_NOTES.md:* 3D Printing support: Purchase from a print
service partne
/usr/share/doc/openscad/RELEASE_NOTES.md-* New export file formats: SVG, 3MF, AMF
/usr/share/doc/opencsg/doc/publications.html-3D graphics library for Constructive Solid
Geometry (CS
/usr/share/doc/opencsg/doc/publications.html:This major approach of 3D modeling has not been
support
/usr/share/doc/opencsg/doc/publications.html-by real-time computer graphics until recently.

In this example either 3D modeling or 3D printing will match the expression, case-insensitive.
To display only the parts of a text stream that match the expression used by egrep, use the -o
option.
The program fgrep is equivalent to grep -F, that is, it does not parse regular expressions. It is
useful in simple searches where the goal is to match a literal expression. Therefore, special
characters like the dollar sign and the dot will be taken literally and not by their meanings in a

375

regular expression.

The Stream Editor: sed
The purpose of the sed program is to modify text-based data in a non-interactive way. It means
that all the editing is made by predefined instructions, not by arbitrarily typing directly into a text
displayed on the screen. In modern terms, sed can be understood as a template parser: given a
text as input, it places custom content at predefined positions or when it finds a match for a
regular expression.
Sed, as the name implies, is well suited for text streamed through pipelines. Its basic syntax is sed
-f SCRIPT when editing instructions are stored in the file SCRIPT or sed -e COMMANDS to
execute COMMANDS directly from the command line. If neither -f or -e are present, sed uses the
first non-option parameter as the script file. It is also possible to use a file as the input just by
giving its path as an argument to sed.
sed instructions are composed of a single character, possibly preceded by an address or followed
by one or more options, and are applied to each line at a time. Addresses can be a single line
number, a regular expression, or a range of lines. For example, the first line of a text stream can
be deleted with 1d, where 1 specifies the line where the delete command d will be applied. To
clarify sed 's usage, take the output of the command factor `seq 12`, which returns the prime
factors for numbers 1 to 12:
$ factor `seq 12`
1:
2: 2
4: 2 2
6: 2 3

Deleting the first line with sed is accomplished by 1d:
$ factor `seq 12` | sed 1d
2: 2

376

4: 2 2
6: 2 3

A range of lines can be specified with a separating comma:
$ factor `seq 12` | sed 1,7d

More than one instruction can be used in the same execution, separated by semicolons. In this
case, however, it is important to enclose them with parenthesis so the semicolon is not interpreted
by the shell:
$ factor `seq 12` | sed "1,7d;11d"

In this example, two deletion instructions were executed, first on lines ranging from 1 to 7 and
then on line 11. An address can also be a regular expression, so only lines with a match will be
affected by the instruction:
$ factor `seq 12` | sed "1d;/:.*2.*/d"

377

The regular expression :.*2.* matches with any occurrence of the number 2 anywhere after a
colon, causing the deletion of lines corresponding to numbers with 2 as a factor. With sed,
anything placed between slashes (/) is considered a regular expression and by default all basic RE
is supported. For example, sed -e "/^#/d" /etc/services shows the contents of the file
/etc/services without the lines beginning with # (comment lines).
The delete instruction d is only one of the many editing instructions provided by sed. Instead of
deleting a line, sed can replace it with a given text:
$ factor `seq 12` | sed "1d;/:.*2.*/c REMOVED"

The instruction c REMOVED simply replaces a line with the text REMOVED. In the example’s case,
every line with a substring matching the regular expression :.*2.* is affected by instruction c
REMOVED. Instruction a TEXT copies text indicated by TEXT to a new line after the line with a
match. The instruction r FILE does the same, but copies the contents of the file indicated by
FILE. Instruction w does the opposite of r, that is, the line will be appended to the indicated file.
By far the most used sed instruction is s/FIND/REPLACE/, which is used to replace a match to the
regular expression FIND with text indicated by REPLACE. For example, the instruction
s/hda/sda/ replaces a substring matching the literal RE hda with sda. Only the first match found
in the line will be replaced, unless the flag g is placed after the instruction, as in s/hda/sda/g.
A more realistic case study will help to illustrate sed's features. Suppose a medical clinic wants to
send text messages to its customers, reminding them of their scheduled appointments for the next
day. A typical implementation scenario relies on a professional instant message service, which
provides an API to access the system responsible for delivering the messages. These messages
usually originate from the same system that runs the application controlling customer’s
appointments, triggered by a specific time of the day or some other event. In this hypothetical
situation, the application could generate a file called appointments.csv containing tabulated
data with all the appointments for the next day, then used by sed to render the text messages

378

from a template file called template.txt. CSV files are a standard way of export data from
database queries, so sample appointments could be given as follows:
$ cat appointments.csv
"NAME","TIME","PHONE"
"Carol","11am","55557777"
"Dave","2pm","33334444"

The first line holds the labels for each column, which will be used to match the tags inside the
sample template file:
$ cat template.txt
Hey <NAME>, don't forget your appointment tomorrow at <TIME>.

The less than < and greater than > signs were put around labels just to help identify them as tags.
The following Bash script parses all enqueued appointments using template.txt as the message
template:
#! /bin/bash
TEMPLATE=`cat template.txt`
TAGS=(`sed -ne '1s/^"//;1s/","/\n/g;1s/"$//p' appointments.csv`)
mapfile -t -s 1 ROWS < appointments.csv
for (( r = 0; r < ${#ROWS[*]}; r++ ))
do
MSG=$TEMPLATE
VALS=(`sed -e 's/^"//;s/","/\n/g;s/"$//' <<<${ROWS[$r]}`)
for (( c = 0; c < ${#TAGS[*]}; c++ ))
do
MSG=`sed -e "s/<${TAGS[$c]}>/${VALS[$c]}/g" <<<"$MSG"`
done
echo curl --data message=\"$MSG\" --data phone=\"${VALS[2]}\" https://mysmsprovider/api
done

An actual production script would also handle authentication, error checking and logging, but the
example has basic functionality to start with. The first instructions executed by sed are applied
only to the first line — the address 1 in 1s/^"//;1s/","/\n/g;1s/"$//p — to remove the
leading and trailing quotes — 1s/^"// and 1s/"$// — and to replace field separators with a
newline character: 1s/","/\n/g. Only the first line is needed for loading column names, so nonmatching lines will be suppressed by option -n, requiring flag p to be placed after the last sed

379

command to print the matching line. The tags are then stored in the TAGS variable as a Bash array.
Another Bash array variable is created by the command mapfile to store the lines containing the
appointments in the array variable ROWS.
A for loop is employed to process each appointment line found in ROWS. Then, quotes and
separators in the appointment — the appointment is in variable ${ROWS[$r]} used as a here
string — are replaced by sed, similarly to the commands used to load the tags. The separated
values for the appointment are then stored in the array variable VALS, where array subscripts 0, 1
and 2 correspond to values for NAME, TIME and PHONE.
Finally, a nested for loop walks through the TAGS array and replaces each tag found in the
template with its corresponding value in VALS. The MSG variable holds a copy of the rendered
template, updated by the substitution command s/<${TAGS[$c]}>/${VALS[$c]}/g on every
loop pass through TAGS.
This results in a rendered message like: "Hey Carol, don’t forget your appointment
tomorrow at 11am." The rendered message can then be sent as a parameter through a HTTP
request with curl, as a mail message or any other similar method.

Combining grep and sed
Commands grep and sed can be used together when more complex text mining procedures are
required. As a system administrator, you may want to inspect all the login attempts to a server, for
example. The file /var/log/wtmp records all logins and logouts, whilst the file /var/log/btmp
records the failed login attempts. They are written in a binary format, which can be read by the
commands last and lastb, respectively.
The output of lastb shows not only the username used in the bad login attempt, but its IP address
as well:
user

81.161.63.251

nrostagn ssh:notty

46.6.11.56

46.6.11.56

nps

narmadan ssh:notty

380

Option -d translates the IP number to the corresponding hostname. The hostname may provide
clues about the ISP or hosting service used to perform these bad login attempts. Option -a puts the
hostname in the last column, which facilitates the filtering yet to be applied. Option --time
-format notime suppresses the time when the login attempt occurred. Command lastb can take
some time to finish if there were too many bad login attempts, so the output was limited to ten
entries with the option -n 10.
Not all remote IPs have a hostname associated to it, so reverse DNS does not apply to them and
they can be dismissed. Although you could write a regular expression to match the expected
format for a hostname at the end of the line, it is probably simpler to write a regular expression to
match with either a letter from the alphabet or with a single digit at the end of the line. The
following example shows how the command grep takes the listing at its standard input and
removes the lines without hostnames:
nvidia

n_tonson ssh:notty

nrostagn ssh:notty

nps

narmadan ssh:notty

Command grep option -v shows only the lines that don’t match with the given regular
expression. A regular expression matching any line ending with a number (i.e. [0-9]$) will
capture only the entries without a hostname. Therefore, grep -v '[0-9]$' will show only the
lines ending with a hostname.
The output can be filtered even further, by keeping only the domain name and removing the
other parts from each line. Command sed can do it with a substitution command to replace the
whole line with a back-reference to the domain name in it:

381

The escaped parenthesis in .* \(.*\)$ tells sed to remember that part of the line, that is, the
part between the last space character and the end of the line. In the example, this part is
referenced with \1 and used the replace the entire line.
It’s clear that most remote hosts try to login more than once, thus the same domain name repeats
itself. To suppress the repeated entries, first they need to be sorted (with command sort) then
passed to the command uniq:
uniq | head -n 10
116-25-254-113-on-nets.com
145-40-33-205.power-speed.at
tor.laquadrature.net
tor.momx.site
ua-83-226-233-154.bbcust.telenor.se
vmd38161.contaboserver.net
vmi488063.contaboserver.net
vmi515749.contaboserver.net

This shows how different commands can be combined to produce the desired outcome. The
hostname list can then be used to write blocking firewall rules or to take other measures to
enforce the security of the server.

382

## 1. Command last shows a listing of last logged in users, including their origin IPs. How would
the egrep command be used to filter last output, showing only occurrences of an IPv4
address, discarding any additional information in the corresponding line?

## 2. What option should be given to grep in order to correctly filter the output generated by
command find executed with option -print0?

## 3. Command uptime -s shows the last date when the system was powered on, as in 2019-08-05
20:13:22. What will be the result of command uptime -s | sed -e 's/(.*) (.*)/\1/'?

4. What option should be given to grep so it counts matching lines instead of displaying them?

383

## 1. The basic structure of an HTML file starts with elements html, head and body, for example:
<html>
<head>
<title>News Site</title>
</head>
<body>
<h1>Headline</h1>
<p>Information of interest.</p>
</body>
</html>

Describe how addresses could be used in sed to display only the body element and its contents.

## 2. What sed expression will remove all tags from an HTML document, keeping only the rendered
text?

## 3. Files with extension .ovpn are very popular to configure VPN clients as they contain not only
the settings, but also the contents of keys and certificates for the client. These keys and
certificates are originally in separate files, so they need to be copied into the .ovpn file. Given
the following excerpt of a .ovpn template:
client
dev tun
remote 192.168.1.155 1194
<ca>
ca.crt
</ca>
<cert>
client.crt
</cert>
<key>
client.key
</key>
<tls-auth>
ta.key
</tls-auth>

384

Assuming files ca.crt, client.crt, client.key and ta.key are in the current directory,
how would the template configuration be modified by sed to replace each filename by its
content?

385

This lesson covers the two most important Linux commands related to regular expressions: grep
and sed. Scripts and compound commands rely on grep and sed to perform a wide range of text
filtering and parsing tasks. The lesson goes through the following steps:
- How to use grep and its variations such as egrep and fgrep.
- How to use sed and its internal instructions to manipulate text.
- Examples of regular expression applications using grep and sed.

386

## 1. Command last shows a listing of last logged in users, including their origin IPs. How would
the egrep command be used to filter last output, showing only occurrences of an IPv4
address, discarding any additional information in the corresponding line?
last -i | egrep -o '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
2. What option should be given to grep in order to correctly filter the output generated by
command find executed with option -print0?
The option -z or --null-data, as in find . -print0 | grep -z expression.
3. Command uptime -s shows the last date when the system was powered on, as in 2019-08-05
20:13:22. What will be the result of command uptime -s | sed -e 's/(.*) (.*)/\1/'?
An error will occur. By default, parenthesis should be escaped to use backreferences in sed.
4. What option should be given to grep so it counts matching lines instead of displaying them?
Option -c.

387

## 1. The basic structure of an HTML file starts with elements html, head and body, for example:
<html>
<head>
<title>News Site</title>
</head>
<body>
<h1>Headline</h1>
<p>Information of interest.</p>
</body>
</html>

Describe how addresses could be used in sed to display only the body element and its contents.
To only show body, the addresses should be /<body>/,/<\/body>/, as in sed -n -e
'/<body>/,/<\/body>/p'. Option -n is given to sed so it doesn’t print lines by default, hence
the command p at the end of sed expression to print matching lines.
2. What sed expression will remove all tags from an HTML document, keeping only the rendered
text?
The sed expression s/<[^>]*>//g will replace any content enclosed in <> by an empty string.
3. Files with extension .ovpn are very popular to configure VPN clients as they contain not only
the settings, but also the contents of keys and certificates for the client. These keys and
certificates are originally in separate files, so they need to be copied into the .ovpn file. Given
the following excerpt of a .ovpn template:
client
dev tun
remote 192.168.1.155 1194
<ca>
ca.crt
</ca>
<cert>
client.crt
</cert>
<key>
client.key
</key>

388

<tls-auth>
ta.key
</tls-auth>

Assuming files ca.crt, client.crt, client.key and ta.key are in the current directory,
how would the template configuration be modified by sed to replace each filename by its
content?
The command
sed -r -e 's/(^[^.]*)\.(crt|key)$/cat \1.\2/e' < client.template > client.ovpn

replaces any line terminating in .crt or .key with the content of a file whose name equals the
line. Option -r tells sed to use extended regular expressions, whilst e at the end of the
expression tells sed to replace matches with the output of command cat \1.\2. The
backreferences \1 and \2 correspond to the filename and extension found in the match.

389

### 103.8 Basic file editing
LPIC-1 v5, Exam 101, Objective 103.8
- Navigate a document using vi.
- Understand and use vi modes.
- Insert, edit, delete, copy and find text in vi.
- Awareness of Emacs, nano and vim.
- Configure the standard editor.
- vi
- /, ?
- h, j, k, l
- i, o, a
- d, p, y, dd, yy
- ZZ, :w!, :q!
- EDITOR

390

### 103.8 Lesson 1

### 103.8 Basic file editing

In most Linux distributions, vi — abbreviation for “visual” — is pre-installed and it is the standard
editor in the shell environment. Vi is an interactive text editor, it shows the file content on the
screen as it is being edited. As such, it allows the user to move through and to make modifications
anywhere in the document. However, unlike visual editors from the graphical desktop, the vi
editor is a shell application with keyboard shortcuts to every editing task.
An alternative to vi, called vim (vi improved), is sometimes used as a modern replacement for vi.
Among other improvements, vim offers support for syntax highlighting, multilevel undo/redo and
multi-document editing. Although more resourceful, vim is fully backwards compatible with vi,
making both indistinguishable for most tasks.
The standard way to start vi is to give it a path to a file as a parameter. To jump directly to a
specific line, its number should be informed with a plus sign, as in vi +9 /etc/fstab to open
/etc/fstab/ and place the cursor at the 9th line. Without a number, the plus sign by itself places
the cursor at the last line.
vi's interface is very simple: all space available in the terminal window is occupied to present a

391

file, normally informed as a command argument, to the user. The only visual clues are a footer
line showing the current position of the cursor and a tilde ~ indicating where the file ends. There
are different execution modes for vi where program behavior changes. The most common are:
insert mode and normal mode.

Insert Mode
The insert mode is straightforward: text appears on the screen as it is typed on the keyboard. It is
the type of interaction most users expect from a text editor, but it is not how vi first presents a
document. To enter the insert mode, the user must execute an insertion command in the normal
mode. The Esc key finishes the insert mode and returns to normal mode, the default vi mode.

If you are interested to know more on the other execution modes, open vi and
type:
:help vim-modes-intro

Normal Mode
Normal mode — also known as command mode — is how vi starts by default. In this mode,
keyboard keys are associated with commands for navigation and text manipulation tasks. Most
commands in this mode are unique keys. Some of the keys and their functions on normal mode
0, $
Go to the beginning and end of the line.
1G, G
Go to the beginning and end of the document.
(, )
Go to the beginning and end of the sentence.
{, }
Go to the beginning and end of the paragraph.
w, W
Jump word and jump word including punctuation.

392

h, j, k, l
Left, down, up, right.
e or E
Go to the end of current word.
/, ?
Search forward and backwards.
i, I
Enter the insert mode before the current cursor position and at the beginning of the current
line.
a, A
Enter the insert mode after the current cursor position and at the end of the current line.
o, O
Add a new line and enter the insert mode in the next line or in the previous line.
s, S
Erase the character under the cursor or the entire line and enter the insert mode.
Change the character(s) under the cursor.
Replace the character under the cursor.
Delete the selected characters or the character under the cursor.
v, V
Start a new selection with the current character or the entire line.
y, yy
Copy (yanks) the character(s) or the entire line.
p, P
Paste copied content, after or before the current position.

393

Undo the last action.
Ctrl-R
Redo the last action.
ZZ
Close and save.
ZQ
Close and do not save.
If preceded by a number, the command will be executed the same number of times. For example,
press 3yy to copy the current line plus the following two, press d5w to delete the current word and
the following 4 words, and so on.
Most editing tasks are combinations of multiple commands. For example, the key sequence vey is
used to copy a selection starting at the current position until the end of the current word.
Command repetition can also be used in combinations, so v3ey would copy a selection starting at
the current position until the end of the third word from there.
vi can organize copied text in registers, allowing to keep distinct contents at the same time. A
register is specified by a character preceded by " and once created it’s kept until the end of the
current session. The key sequence "ly creates a register containing the current selection, which
will be accessible through the key l. Then, the register l may be pasted with "lp.
There is also a way to set custom marks at arbitrary positions along the text, making it easier to
quickly jump between them. Marks are created by pressing the key m and then a key to address
the current position. With that done, the cursor will come back to the marked position when '
followed by the chosen key are pressed.
Any key sequence can be recorded as a macro for future execution. A macro can be recorded, for
example, to surround a selected text in double-quotes. First, a string of text is selected and the key
q is pressed, followed by a register key to associate the macro with, like d. The line recording @d
will appear in the footer line, indicating that the recording is on. It is assumed that some text is
already selected, so the first command is x to remove (and automatically copy) the selected text.
The key i is pressed to insert two double quotes at the current position, then Esc returns to normal
mode. The last command is P, to re-insert the deleted selection just before the last double-quote.
Pressing q again will end the recording. Now, a macro consisting of key sequence x, i, "", Esc and P
will execute every time keys @d are pressed in normal mode, where d is the register key associated
with the macro.

394

However, the macro will be available only during the current session. To make macros persistent,
they should be stored in the configuration file. As most modern distributions use vim as the vi
compatible editor, the user’s configuration file is ~/.vimrc. Inside ~/.vimrc, the line let @d =
'xi""^[P' will set the register d to the key sequence inside single-quotes. The same register
previously assigned to a macro can be used to paste its key sequence.

Colon Commands
The normal mode also supports another set of vi commands: the colon commands. Colon
commands, as the name implies, are executed after pressing the colon key : in normal mode.
Colon commands allow the user to perform searches, to save, to quit, to run shell commands, to
change vi settings, etc. To go back to the normal mode, the command :visual must be executed
or the Enter key pressed without any command. Some of the most common colon commands are
indicated here (the initial is not part of the command):
:s/REGEX/TEXT/g
Replaces all the occurrences of regular expression REGEX with TEXT in the current line. It
accepts the same syntax of command sed, including addresses.
:!
Run a following shell command.
:quit or :q
Exit the program.
:quit! or :q!
Exit the program without saving.
:wq
Save and exit.
:exit or :x or :e
Save and exit, if needed.
:visual
Go back to navigation mode.
The standard vi program is capable of doing most text editing tasks, but any other non-graphical
editor can be used to edit text files in the shell environment.

Novice users may have difficulty memorizing vi's command keys all at once.

395

Distributions adopting vim also have the command vimtutor, which uses vim itself
to open a step-by-step guide to the main activities. The file is an editable copy that can
be used to practice the commands and progressively get used to them.

Alternative Editors
Users unfamiliar with vi may have difficulties adapting to it, since its operation is not intuitive. A
simpler alternative is GNU nano, a small text editor that offers all basic text editing features like
undo/redo, syntax coloring, interactive search-and-replace, auto-indentation, line numbers, word
completion, file locking, backup files, and internationalization support. Unlike vi, all key presses
are just inserted in the document being edited. Commands in nano are given by using the Ctrl key
or the Meta key (depending on the system, Meta is Alt or ⌘ ).
Ctrl-6 or Meta-A
Start a new selection. It’s also possible to create a selection by pressing Shift and moving the
cursor.
Meta-6
Copy the current selection.
Ctrl-K
Cut the current selection.
Ctrl-U
Paste copied content.
Meta-U
Undo.
Meta-E
Redo.
Ctrl-\
Replace the text at the selection.
Ctrl-T
Start a spell-checking session for the document or current selection.
Emacs is another very popular text editor for the shell environment. Whilst text is inserted just by
typing it, like in nano, navigation through the document is assisted by keyboard commands, like in
vi. Emacs includes many features that makes it more than just a text editor. It is also an IDE
396

(integrated development environment) capable of compiling, running, and testing programs. Emacs
can be configured as an email, news or RSS client, making it an authentic productivity suite.
The shell itself will run a default text editor, usually vi, every time it is necessary. This is the case,
for example, when crontab -e is executed to edit cronjobs. Bash uses the session variables
VISUAL or EDITOR to find out the default text editor for the shell environment. For example, the
command export EDITOR=nano defines nano as the default text editor in the current shell
session. To make this change persistent across sessions, the command should be included in
~/.bash_profile.

397

1. vi is most used as an editor for configuration files and source code, where indentation helps to
identify sections of text. A selection can be indented to the left by pressing < and to the right by
pressing >. What keys should be pressed in normal mode to indent the current selection three
steps to the left?

## 2. An entire line can be selected by pressing V in vi normal mode. However, the terminating
newline character is also included. What keys should be pressed in normal mode to select from
the starting character until, but not including, the newline character?

## 3. How should vi be executed in the command line to open ~/.bash_profile and jump straight
to the last line?

## 4. What keys should be pressed in vi normal mode to delete characters from the current cursor
position until the next period character?

398

1. vim allows to select blocks of text with arbitrary width, not only sections with entire lines. By
pressing Ctrl + V in normal mode, a selection is made by moving the cursor up, down, left and
right. Using this method, how would a block starting at the first character in the current line,
containing the next eight columns and five lines of text, be deleted?

2. A vi session was interrupted by an unexpected power failure. When reopening the file, vi
prompts the user if they want to recover the swap file (an automatic copy made by vi). What
should the user do to discard the swap file?

## 3. In a vim session, a line was previously copied to the register l. What key combination would
record a macro in register a to paste the line in register l immediately before the current line?

399

This lesson covers the standard text editor for the Linux shell environment: the vi editor. Whilst
intimidating for the unfamiliar user, vi has features that make it a good choice for technical and
non-technical text editing. The lesson goes through the following steps:
- vi basic usage and useful features.
- What is vim — the improved vi — and other alternative editors.
- How to define the default text editor for the shell environment.
- Editor vi and its improved version vim.
- Basic text editing in vi.
- Alternative editors emacs and nano.

400

1. vi is most used as an editor for configuration files and source code, where indentation helps to
identify sections of text. A selection can be indented to the left by pressing < and to the right by
pressing >. What keys should be pressed in normal mode to indent the current selection three
steps to the left?
The keys 3<, meaning three steps to the left.
2. An entire line can be selected by pressing V in vi normal mode. However, the terminating
newline character is also included. What keys should be pressed in normal mode to select from
the starting character until, but not including, the newline character?
The keys 0v$h, meaning 0 (“jump to start of a line”), v (“start character selection”), $ (“go to end
of line”) and h (“go back one position”).
3. How should vi be executed in the command line to open ~/.bash_profile and jump straight
to the last line?
The command vi + ~/.bash_profile will open the file and place the cursor at its last line.
4. What keys should be pressed in vi normal mode to delete characters from the current cursor
position until the next period character?
The keys dt., meaning d (“start deletion”), t (“jump to the following character”) and . (period
character).

401

1. vim allows to select blocks of text with arbitrary width, not only sections with entire lines. By
pressing Ctrl-V in normal mode, a selection is made by moving the cursor up, down, left and
right. Using this method, how would a block starting at the first character in the current line,
containing the next eight columns and five lines of text, be deleted?
The combination 0, Ctrl-V and 8l5jd will select and delete the corresponding block.
2. A vi session was interrupted by an unexpected power failure. When reopening the file, vi
prompts the user if they want to recover the swap file (an automatic copy made by vi). What
should the user do to discard the swap file?
Press d when prompted by vi.
3. In a vim session, a line was previously copied to the register l. What key combination would
record a macro in register a to paste the line in register l immediately before the current line?
The combination qa"lPq, meaning q (“start macro recording”), a (“assign register a to macro”),
"l (“select text in register l”), P (“paste before the current line”) and q (“end macro recording”).

402

## Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

403

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.1 Create partitions and filesystems
LPIC-1 v5, Exam 101, Objective 104.1
- Manage MBR and GPT partition tables
- Use various mkfs commands to create various filesystems such as:
- ext2/ext3/ext4
- XFS
- VFAT
- exFAT
- Basic feature knowledge of Btrfs, including multi-device filesystems, compression and
subvolumes.
- fdisk
- gdisk
- parted
- mkfs
- mkswap

404

### 104.1 Lesson 1

### 104.1 Create partitions and filesystems

On any operating system, a disk needs to be partitioned before it can be used. A partition is a
logical subset of the physical disk, and information about partitions are stored in a partition table.
This table includes information about the first and last sectors of the partition and its type, and
further details on each partition.
Usually each partition is seen by an operating system as a separate “disk”, even if they all reside in
the same physical media. On Windows systems they are assigned letters like C: (historically the
main disk), D: and so on. On Linux each partition is assigned to a directory under /dev, like
/dev/sda1 or /dev/sda2.
In this lesson, you will learn how to create, delete, restore and resize partitions using the three
most common utilities (fdisk, gdisk and parted), how to create a filesystem on them and how to
create and set up a swap partition or swap file to be used as virtual memory.

For historical reasons, through this lesson we will refer to storage media as “disks”,
even though modern storage systems, like SSDs and Flash Storage, do not contain

405

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

any “disks” at all.

Understanding MBR and GPT
There are two main ways of storing partition information on hard disks. The first one is MBR
(Master Boot Record), and the second one is GPT (GUID Partition Table).
MBR
This is a remnant from the early days of MS-DOS (more specifically, PC-DOS 2.0 from 1983) and
for decades was the standard partitioning scheme on PCs. The partition table is stored on the
first sector of a disk, called the Boot Sector, along with a boot loader, which on Linux systems is
usually the GRUB bootloader. But MBR has a series of limitations that hinder its use on modern
systems, like the inability to address disks of more than 2 TB in size, and the limit of only 4
primary partitions per disk.
GUID
A partitioning system that addresses many of the limitations of MBR. There is no practical limit
on disk size, and the maximum number of partitions are limited only by the operating system
itself. It is more commonly found on more modern machines that use UEFI instead of the old PC
BIOS.
During system administration tasks it is highly possible that you will find both schemes in use, so
it is important to know how to use the tools associated with each one to create, delete or modify
partitions.

Managing MBR Partitions with FDISK
The standard utility for managing MBR partitions on Linux is fdisk. This is an interactive, menudriven utility. To use it, type fdisk followed by the device name corresponding to the disk you
want to edit. For example, the command

would edit the partition table of the first SATA-connected device (sda) on the system. Keep in
mind that you need to specify the device corresponding to the physical disk, not one of its
partitions (like /dev/sda1).

406

All disk-related operations in this lesson need to be done as the user root (the
system administrator), or with root privileges using sudo.

When invoked, fdisk will show a greeting, then a warning and it will wait for your commands.
Welcome to fdisk (util-linux 2.33.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.
Command (m for help):

The warning is important. You can create, edit or delete partitions at will, but nothing will be
written to disk unless you use the write (w) command. So you can “practice” without risk of losing
data, as long as you stay clear of the w key. To exit fdisk without saving changes, use the q

That being said, you should never practice on an important disk, as there are
always risks. Use a spare external disk, or a USB flash drive instead.

Printing the Current Partition Table
The command p is used to print the current partition table. The output is something like this:
Command (m for help): p
Disk /dev/sda: 111.8 GiB, 120034123776 bytes, 234441648 sectors
Disk model: CT120BX500SSD1
Disk identifier: 0x97f8fef5
/dev/sda2

Sectors

4096 226048942 226044847 107.8G 83 Linux
226048944 234437550

8388607

4G 82 Linux swap / Solaris

Here is the meaning of each column:
The device assigned to the partition.
Shows whether the partition is “bootable” or not.

407

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

The sector where the partition starts.
The sector where the partition ends.
Sectors
The total number of sectors in the partition. Multiply it by the sector size to get the partition
size in bytes.
The size of the partition in “human readable” format. In the example above, values are in
gigabytes.
Id
The numerical value representing the partition type.
The description for the partition type.
Primary vs Extended Partitions
On an MBR disk, you can have 2 main types of partitions, primary and extended. Like we said
before, you can have only 4 primary partitions on the disk, and if you want to make the disk
“bootable”, the first partition must be a primary one.
One way to work around this limitation is to create an extended partition that acts as a container
for logical partitions. You could have, for example, a primary partition, an extended partition
occupying the remainder of the disk space and five logical partitions inside it.
For an operating system like Linux, primary and extended partitions are treated exactly in the
same way, so there are no “advantages” of using one over the other.
Creating a Partition
To create a partition, use the n command. By default, partitions will be created at the start of
unallocated space on the disk. You will be asked for the partition type (primary or extended), first
sector and last sector.
For the first sector, you can usually accept the default value suggested by fdisk, unless you need
a partition to start at a specific sector. Instead of specifying the last sector, you can specify a size

408

followed by the letters K, M, G, T or P (Kilo, Mega, Giga, Tera or Peta). So, if you want to create a 1
GB partition, you could specify +1G as the Last sector, and fdisk will size the partition
accordingly. See this example for the creation of a primary partition:
Command (m for help): n
Partition type

primary (0 primary, 0 extended, 4 free)

extended (container for logical partitions)

Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-3903577, default 2048): 2048
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-3903577, default 3903577): +1G

Checking for Unallocated Space
If you do not know how much free space there is on the disk, you can use the F command to show
the unallocated space, like so:
Command (m for help): F
Unpartitioned space /dev/sdd: 881 MiB, 923841536 bytes, 1804378 sectors

2099200 3903577 1804378

881M

Deleting Partitions
To delete a partition, use the d command. fdisk will ask you for the number of the partition you
want to delete, unless there is only one partition on the disk. In this case, this partition will be
selected and deleted immediately.
Be aware that if you delete an extended partition, all the logical partitions inside it will also be
deleted.
Mind the Gap!
Keep in mind that when creating a new partition with fdisk, the maximum size will be limited to
the maximum amount of contiguous unallocated space on the disk. Say, for example, that you
have the following partition map:

409

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

/dev/sdd1

2048 1050623 1048576

/dev/sdd2

1050624 2099199 1048576

/dev/sdd3

2099200 3147775 1048576

Then you delete partition 2 and check for free space:
Command (m for help): F
Unpartitioned space /dev/sdd: 881 MiB, 923841536 bytes, 1804378 sectors

1050624 2099199 1048576

512M

3147776 3903577

369M

755802

Adding up the size of the unallocated space, in theory we have 881 MB available. But see what
happens when we try to create a 700 MB partition:
Command (m for help): n
Partition type

primary (2 primary, 0 extended, 2 free)

extended (container for logical partitions)

Select (default p): p
Partition number (2,4, default 2): 2
First sector (1050624-3903577, default 1050624):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (1050624-2099199, default 2099199): +700M
Value out of range.

That happens because the largest contiguous unallocated space on the disk is the 512 MB block
that belonged to partition 2. Your new partition cannot “reach over” partition 3 to use some of the
unallocated space after it.
Changing the Partition Type
Occasionally, you may need to change the partition type, especially when dealing with disks that
will be used on other operating systems and platforms. This is done with the command t, followed
by the number of the partition you wish to change.
The partition type must be specified by its corresponding hexadecimal code, and you can see a list

410

of all the valid codes by using the command l.
Do not confuse the partition type with the filesystem used on it. Although at first there was a
relation between them, today you cannot assume this to be true. A Linux partition, for example,
can contain any Linux-native filesystem, like ext4 or ReiserFS.

Linux partitions are type 83 (Linux). Swap partitions are type 82 (Linux Swap).

Managing GUID Partitions with GDISK
The utility gdisk is the equivalent of fdisk when dealing with GPT partitioned disks. In fact, the
interface is modeled after fdisk, with an interactive prompt and the same (or very similar)
commands.
Printing the Current Partition Table
The command p is used to print the current partition table. The output is something like this:
Command (? for help): p
Disk /dev/sdb: 3903578 sectors, 1.9 GiB
Model: DataTraveler 2.0
Sector size (logical/physical): 512/512 bytes
Disk identifier (GUID): AB41B5AA-A217-4D1E-8200-E062C54285BE
Partition table holds up to 128 entries
Main partition table begins at sector 2 and ends at sector 33
First usable sector is 34, last usable sector is 3903544
Partitions will be aligned on 2048-sector boundaries
Total free space is 1282071 sectors (626.0 MiB)

2623488

3147775

256.0 MiB

Right from the start, we notice a few different things:
- Each disk has a unique Disk Identifier (GUID). This is a 128 bit hexadecimal number, assigned
38
randomly when the partition table is created. Since there are 3.4 × 10 possible values to this
number, the chances that 2 random disks have the same GUID are pretty slim. The GUID can be
used to identify which filesystems to mount at boot time (and where), eliminating the need to
use the device path to do so (like /dev/sdb).
- See the phrase Partition table holds up to 128 entries? That’s right, you can have up
to 128 partitions on a GPT disk. Because of this, there is no need for primary and extended

411

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

partitions.
- The free space is listed on the last line, so there is no need for an equivalent of the F command
from fdisk.
Creating a Partition
The command to create a partition is n, just as in fdisk. The main difference is that besides the
partition number and the first and last sector (or size), you can also specify the partition type
during the creation. GPT partitions support many more types than MBR. You can check a list of all
the supported types by using the l command.
Deleting a Partition
To delete a partition, type d and the partition number. Unlike fdisk, the first partition will not be
automatically selected if it is the only one on the disk.
On GPT disks, partitions can be easily reordered, or “sorted”, to avoid gaps in the numbering
sequence. To do this, simply use the s command. For example, imagine a disk with the following
partition table:

2099200

2361343

2361344

2623487

If you delete the second partition, the table would become:

2361344

2623487

If you use the s command, it would become:

2361344

2623487

Notice that the third partition became the second one.

412

Gap? What Gap?
Unlike MBR disks, when creating a partition on GPT disks the size is not limited by the maximum
amount of contiguous unallocated space. You can use every last bit of a free sector, no matter
where it is located on the disk.
Recovery Options
GPT disks store backup copies of the GPT header and partition table, making it easy to recover
disks in case this data has been damaged. gdisk provides features to aid in those recovery tasks,
accessed with the r command.
You can rebuild a corrupt main GPT header or partition table with b and c, respectively, or use
the main header and table to rebuild a backup with d and e. You can also convert a MBR to a GPT
with f, and do the opposite with g, among other operations. Type ? in the recovery menu to get a
list of all the available recovery commands and descriptions about what they do.

Creating File Systems
Partitioning the disk is only the first step towards being able to use a disk. After that, you will need
to format the partition with a filesystem before using it to store data.
A filesystem controls how the data is stored and accessed on the disk. Linux supports many
filesystems, some native, like the ext (Extended Filesystem) family, while others come from other
operating systems like FAT from MS-DOS, NTFS from Windows NT, HFS and HFS+ from Mac OS,
etc.
The standard tool used to create a filesystem on Linux is mkfs, which comes in many “flavors”
according to the filesystem it needs to work with.

Creating an ext2/ext3/ext4 Filesystem
The Extended Filesystem (ext) was the first filesystem for Linux, and through the years was
replaced by new versions called ext2, ext3 and ext4, which is currently the default filesystem for
many Linux distributions.
The utilities mkfs.ext2, mkfs.ext3 and mkfs.ext4 are used to create ext2, ext3 and ext4
filesystems. In fact, all of these “utilities” exist only as symbolic links to another utility called
mke2fs. mke2fs alters its defaults according to the name it is called by. As such, they all have the
same behavior and command line parameters.
The most simple form of usage is:

413

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Where TARGET is the name of the partition where the filesystem should be created. For example,
to create an ext3 filesystem on /dev/sdb1 the command would be:

Instead of using the command corresponding to the filesystem you wish to create, you can pass
the -t parameter to mke2fs followed by the filesystem name. For example, the following
commands are equivalent, and will create an ext4 filesystem on /dev/sdb1.

Command Line Parameters
mke2fs supports a wide range of command line parameters and options. Here are some of the
most significant ones. All of them also apply to mkfs.ext2, mkfs.ext3 and mkfs.ext4:
-b SIZE
Sets the size of the data blocks in the device to SIZE, which can be 1024, 2048 or 4096 bytes per
block.
-c
Checks the target device for bad blocks before creating the filesystem. You can run a thorough,
but much slower check by passing this parameter twice, as in mkfs.ext4 -c -c TARGET.
-d DIRECTORY
Copies the contents of the specified directory to the root of the new filesystem. Useful if you
need to “pre-populate” the disk with a predefined set of files.
-F
Danger, Will Robinson! This option will force mke2fs to create a filesystem, even if the other
options passed to it or the target are dangerous or make no sense at all. If specified twice (as in
-F -F) it can even be used to create a filesystem on a device which is mounted or in use, which
is a very, very bad thing to do.
-L VOLUME_LABEL
Will set the volume label to the one specified in VOLUME_LABEL. This label must be at most 16
414

characters long.
-n
This is a truly useful option that simulates the creation of the filesystem, and displays what
would be done if executed without the n option. Think of it as a “trial” mode. Good to check
things out before actually committing any changes to disk.
-q
Quiet mode. mke2fs will run normally, but will not produce any output to the terminal. Useful
when running mke2fs from a script.
-U ID
This will set the UUID (Universally Unique Identifier) of a partition to the value specified as ID.
UUIDs are 128 bit numbers in hexadecimal notation that serve to uniquely identify a partition
to the operating system. This number is specified as a 32-digit string in the format 8-4-4-4-12,
meaning 8 digits, hyphen, 4 digits, hyphen, 4 digits, hyphen, 4 digits, hyphen, 12 digits, like
D249E380-7719-45A1-813C-35186883987E. Instead of an ID you can also specify parameters
like clear to clear the filesystem UUID, random, to use a randomly generated UUID, or time to
create a time-based UUID.
-V
Verbose mode, prints much more information during operation than usual. Useful for
debugging purposes.

Creating an XFS Filesystem
XFS is a high-performance filesystem originally developed by Silicon Graphics in 1993 for its IRIX
operating system. Due to its performance and reliability features, it is commonly used for servers
and other environments that require high (or guaranteed) filesystem bandwidth.
Tools for managing XFS filesystems are part of the xfsprogs package. This package may need to
be installed manually, as it is not included by default in some Linux distributions. Others, like Red
Hat Enterprise Linux 7, use XFS as the default filesystem.
XFS filesystems are divided into at least 2 parts, a log section where a log of all filesystem
operations (commonly called a Journal) are maintained, and the data section. The log section may
be located inside the data section (the default behavior), or even on a separate disk altogether, for
better performance and reliability.
The most basic command to create an XFS filesystem is mkfs.xfs TARGET, where TARGET is the
partition you want the filesystem to be created in. For example: mkfs.xfs /dev/sda1.

415

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

As in mke2fs, mkfs.xfs supports a number of command line options. Here are some of the most
common ones.
-b size=VALUE
Sets the block size on the filesystem, in bytes, to the one specified in VALUE. The default value is
4096 bytes (4 KiB), the minimum is 512, and the maximum is 65536 (64 KiB).
-m crc=VALUE
Parameters starting with -m are metadata options. This one enables (if VALUE is 1) or disables
(if VALUE is 0) the use of CRC32c checks to verify the integrity of all metadata on the disk. This
enables better error detection and recovery from crashes related to hardware issues, so it is
enabled by default. The performance impact of this check should be minimal, so normally
there is no reason to disable it.
-m uuid=VALUE
Sets the partition UUID to the one specified as VALUE. Remember that UUIDs are 32-character
(128 bits) numbers in hexadecimal base, specified in groups of 8, 4, 4, 4 and 12 digits separated
by dashes, like 1E83E3A3-3AE9-4AAC-BF7E-29DFFECD36C0.
Force the creation of a filesystem on the target device even if a filesystem is detected on it.
-l logdev=DEVICE
This will put the log section of the filesystem on the specified device, instead of inside the data
section.
-l size=VALUE
This will set the size of the log section to the one specified in VALUE. The size can be specified in
bytes, and suffixes like m or g can be used. -l size=10m, for example, will limit the log section
to 10 Megabytes.
-q
Quiet mode. In this mode, mkfs.xfs will not print the parameters of the file system being
created.
-L LABEL
Sets the filesystem label, which can be at most 12 characters long.
-N
Similar to the -n parameter of mke2fs, will make mkfs.xfs print all the parameters for the

416

creation of the file system, without actually creating it.

Creating a FAT or VFAT Filesystem
The FAT filesystem originated from MS-DOS, and through the years has received many revisions
culminating on the FAT32 format released in 1996 with Windows 95 OSR2.
VFAT is an extension of the FAT16 format with support for long (up to 255 characters) file names.
Both filesystems are handled by the same utility, mkfs.fat. mkfs.vfat is an alias to it.
The FAT filesystem has important drawbacks which restrict its use on large disks. FAT16, for
example, supports volumes of at most 4 GB and a maximum file size of 2 GB. FAT32 ups the
volume size to up to 2 PB, and the maximum file size to 4 GB. Because of this, FAT filesystems are
today more commonly used on small flash drives or memory cards (up to 2 GB in size), or legacy
devices and OSs that do not support more advanced filesystems.
The most basic command for the creation of a FAT filesystem is mkfs.fat TARGET, where TARGET
is the partition you want the filesystem to be created in. For example: mkfs.fat /dev/sdc1.
Like other utilities, mkfs.fat supports a number of command line options. Below are the most
important ones. A full list and description of every option can be read in the manual for the utility,
with the command man mkfs.fat.
-c
Checks the target device for bad blocks before creating the filesystem.
-C FILENAME BLOCK_COUNT
Will create the file specified in FILENAME and then create a FAT filesystem inside it, effectively
creating an empty “disk image”, that can be later written to a device using a utility such as dd
or mounted as a loopback device. When using this option, the number of blocks in the
filesystem (BLOCK_COUNT) must be specified after the device name.
-F SIZE
Selects the size of the FAT (File Allocation Table), between 12, 16 or 32, i.e., between FAT12,
FAT16 or FAT32. If not specified, mkfs.fat will select the appropriate option based on the
filesystem size.
-n NAME
Sets the volume label, or name, for the filesystem. This can be up to 11 characters long, and the
default is no name.

417

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

-v
Verbose mode. Prints much more information than usual, useful for debugging.

mkfs.fat cannot create a “bootable” filesystem. According to the manual page,
“this isn’t as easy as you might think” and will not be implemented.

Creating an exFAT Filesystem
exFAT is a filesystem created by Microsoft in 2006 that addresses one of the most important
limitations of FAT32: file and disk size. On exFAT, the maximum file size is 16 exabytes (from 4 GB
on FAT32), and the maximum disk size is 128 petabytes.
As it is well supported by all three major operating systems (Windows, Linux and mac OS), it is a
good choice where interoperability is needed, like on large capacity flash drives, memory cards
and external disks. In fact, it is the default filesystem, as defined by the SD Association, for SDXC
memory cards larger than 32 GB.
The default utility for creating exFAT filesystems is mkfs.exfat, which is a link to mkexfatfs.
The most basic command is mkfs.exfat TARGET, where TARGET is the partition you want the
filesystem to be created in. For example: mkfs.exfat /dev/sdb2.
Contrary to the other utilities discussed in this lesson, mkfs.exfat has very few command line
options. They are:
-i VOL_ID
Sets the Volume ID to the value specified in VOL_ID. This is a 32-Bit hexadecimal number. If not
defined, an ID based on the current time is set.
-n NAME
Sets the volume label, or name. This can have up to 15 characters, and the default is no name.
-p SECTOR
Specifies the first sector of the first partition on the disk. This is an optional value, and the
default is zero.
-s SECTORS
Defines the number of physical sectors per cluster of allocation. This must be a power of two,
like 1, 2, 4, 8, and so on.

418

Getting to Know the Btrfs Filesystem
Btrfs (officially the B-Tree Filesystem, pronounced as “Butter FS”, “Better FS” or even “Butterfuss”,
your pick) is a filesystem that has been in development since 2007 specifically for Linux by the
Oracle Corporation and other companies, including Fujitsu, Red Hat, Intel and SUSE, among
others.
There are many features that make Btrfs attractive on modern systems where massive amounts of
storage are common. Among these are multiple device support (including striping, mirroring and
striping+mirroring, as in a RAID setup), transparent compression, SSD optimizations, incremental
backups, snapshots, online defragmentation, offline checks, support for subvolumes (with quotas),
deduplication and much more.
As it is a copy-on-write filesystem it is very resilient to crashes. And on top of that, Btrfs is simple
to use, and well supported by many Linux distributions. And some of them, like SUSE, use it as the
default filesystem.

On a traditional filesystem, when you want to overwrite part of a file the new data
is put directly over the old data that it is replacing. On a copy-on-write filesystem
the new data is written to free space on disk, then the file’s original metadata is
updated to refer to the new data and only then the old data is freed up, as it is no
longer needed. This reduces the chances of data loss in case of a crash, as the old
data is only discarded after the filesystem is absolutely sure that it is no longer
needed and the new data is in place.

Creating a Btrfs Filesystem
The utility mkfs.btrfs is used to create a Btrfs filesystem. Using the command without any
options creates a Btrfs filesystem on a given device, like so:

If you do not have the mkfs.btrfs utility on your system, look for btrfs-progs in
your distribution’s package manager.

You can use the -L to set a label (or name) for your filesystem. Btrfs labels can have up to 256
characters, except for newlines:

419

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Enclose the label in quotes (like above) if it contains spaces.

Note this peculiar thing about Btrfs: you can pass multiple devices to the mkfs.btrfs command.
Passing more than one device will span the filesystem over all the devices which is similar to a
RAID or LVM setup. To specify how metadata will be distributed in the disk array, use the -m
parameter. Valid parameters are raid0, raid1, raid5, raid6, raid10, single and dup.
For example, to create a filesystem spanning /dev/sdb1 and /dev/sdc1, concatenating the two
partitions into one big partition, use:

Filesystems spanning multiple partitions such as above might look
advantageous at first but are not a good idea from a data safety standpoint, as
a failure on a single disk of the array means certain data loss. The risk gets
bigger the more disks you use, as you also have more possible points of
failure.

Managing Subvolumes
Subvolumes are like filesystems inside filesystems. Think of them as a directory which can be
mounted as (and treated like) a separate filesystem. Subvolumes make organization and system
administration easier, as each one of them can have separate quotas or snapshot rules.

Subvolumes are not partitions. A partition allocates a fixed space on a drive. This
can lead to problems further down the line, like one partition running out of space
when another one has plenty of space left. Not so with subvolumes, as they “share”
the free space from their root filesystem, and grow as needed.

Suppose you have a Btrfs filesystem mounted on /mnt/disk, and you wish to create a subvolume
inside it to store your backups. Let’s call it BKP:

Next we list the contents of the /mnt/disk filesystem. You will see that we have a new directory,
named after our subvolume.
$ ls -lh /mnt/disk/
total 0
drwxr-xr-x 1 root

420

0 jul 13 17:35 BKP

drwxrwxr-x 1 carol carol 988 jul 13 17:30 Images

Yes, subvolumes can also be accessed like any other directory.

We can check that the subvolume is active, with the command:
Name:

BKP

UUID:

e90a1afe-69fa-da4f-9764-3384f66fa32e

Parent UUID:

Received UUID:

Creation time:

2019-07-13 17:35:40 -0300

Subvolume ID:

260

Generation:

23

Gen at creation:

22

Parent ID:

Top level ID:
Flags:

Snapshot(s):

You can mount the subvolume on /mnt/BKP by passing the -t btrfs -o subvol=NAME
parameter to the mount command:

The -t parameter specifies the filesystem type to be mounted.

Working with Snapshots
Snapshots are just like subvolumes, but pre-populated with the contents from the volume from
which the snapshot was taken.
When created, a snapshot and the original volume have exactly the same content. But from that
point in time, they will diverge. Changes made to the original volume (like files added, renamed or
deleted) will not be reflected on the snapshot, and vice-versa.
Keep in mind that a snapshot does not duplicate the files, and initially takes almost no disk space.
It simply duplicates the filesystem tree, while pointing to the original data.
The command to create a snapshot is the same used to create a subvolume, just add the snapshot
parameter after btrfs subvolume. The command below will create a snapshot of the Btrfs

421

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

filesysten mounted in /mnt/disk in /mnt/disk/snap:

Now, imagine you have the following contents in /mnt/disk:
total 2,8M
-rw-rw-r-- 1 carol carol 109K jul 10 16:22 Galaxy_Note_10.png
-rw-rw-r-- 1 carol carol 484K jul

5 15:01 geminoid2.jpg

-rw-rw-r-- 1 carol carol 429K jul

5 14:52 geminoid.jpg

-rw-rw-r-- 1 carol carol 467K jul

2 11:48 LG-G8S-ThinQ-Mirror-White.jpg

-rw-rw-r-- 1 carol carol 654K jul

2 11:39 LG-G8S-ThinQ-Range.jpg

2 15:43 Mimoji_Comparativo.jpg

94K jul

-rw-rw-r-- 1 carol carol 112K jul 10 16:20 Note10Plus.jpg
drwx------ 1 carol carol

366 jul 13 17:56 snap

-rw-rw-r-- 1 carol carol 118K jul 11 16:36 Twitter_Down_20190711.jpg
-rw-rw-r-- 1 carol carol 324K jul

2 15:22 Xiaomi_Mimoji.png

Notice the snap directory, containing the snapshot. Now let us remove some files, and check the
directory contents:
$ rm LG-G8S-ThinQ-*
total 1,7M
-rw-rw-r-- 1 carol carol 109K jul 10 16:22 Galaxy_Note_10.png
-rw-rw-r-- 1 carol carol 484K jul

5 15:01 geminoid2.jpg

-rw-rw-r-- 1 carol carol 429K jul

5 14:52 geminoid.jpg

2 15:43 Mimoji_Comparativo.jpg

94K jul

-rw-rw-r-- 1 carol carol 112K jul 10 16:20 Note10Plus.jpg
drwx------ 1 carol carol

366 jul 13 17:56 snap

-rw-rw-r-- 1 carol carol 118K jul 11 16:36 Twitter_Down_20190711.jpg
-rw-rw-r-- 1 carol carol 324K jul

2 15:22 Xiaomi_Mimoji.png

However, if you check inside the snap directory, the files you deleted are still there and can be
restored if needed.
$ ls -lh snap/
total 2,8M
-rw-rw-r-- 1 carol carol 109K jul 10 16:22 Galaxy_Note_10.png

422

-rw-rw-r-- 1 carol carol 484K jul

5 15:01 geminoid2.jpg

-rw-rw-r-- 1 carol carol 429K jul

5 14:52 geminoid.jpg

-rw-rw-r-- 1 carol carol 467K jul

2 11:48 LG-G8S-ThinQ-Mirror-White.jpg

-rw-rw-r-- 1 carol carol 654K jul

2 11:39 LG-G8S-ThinQ-Range.jpg

2 15:43 Mimoji_Comparativo.jpg

94K jul

-rw-rw-r-- 1 carol carol 112K jul 10 16:20 Note10Plus.jpg
-rw-rw-r-- 1 carol carol 118K jul 11 16:36 Twitter_Down_20190711.jpg
-rw-rw-r-- 1 carol carol 324K jul

2 15:22 Xiaomi_Mimoji.png

It is also possible to create read-only snapshots. They work exactly like writable snapshots, with
the difference that the contents of the snapshot cannot be changed, they are “frozen” in time. Just
add the -r parameter when creating the snapshot:

A Few Words on Compression
Btrfs supports transparent file compression, with three different algorithms available to the user.
This is done automatically on a per-file basis, as long as the filesystem is mounted with the -o
compress option. The algorithms are smart enough to detect incompressible files and will not try
to compress them, saving system resources. So on a single directory you may have compressed
and uncompressed files together. The default compression algorithm is ZLIB, but LZO (faster,
worse compression ratio) or ZSTD (faster than ZLIB, comparable compression) are available, with
multiple compression levels (see the cooresponding objective on mount options).

Managing Partitions with GNU Parted
GNU Parted is a very powerful partition editor (hence the name) that can be used to create, delete,
move, resize, rescue and copy partitions. It can work with both GPT and MBR disks, and cover
almost all of your disk management needs.
There are many graphical front-ends that make working with parted much easier, like GParted
for GNOME-based desktop environments and the KDE Partition Manager for KDE Desktops.
However, you should learn how to use parted on the command line, since in a server setting you
can never count on a graphical desktop environment being available.

Unlike fdisk and gdisk, parted makes changes to the disk immediately after
the command is issued, without waiting for another command to write the
changes to disk. When practicing, it is wise to do so on an empty or spare disk
or flash drive, so there is no risk of data loss should you make a mistake.

423

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

The simplest way to start using parted is by typing parted DEVICE, where DEVICE is the device
you want to manage (parted /dev/sdb). The program starts an interactive command line
interface like fdisk and gdisk with a (parted) prompt for you to enter commands.
GNU Parted 3.2
Using /dev/sdb
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted)

Be careful! If you do not specify a device, parted will automatically select the
primary disk (usually /dev/sda) to work with.

Selecting Disks
To switch to a different disk than the one specified on the command line, you can use the select
command, followed by the device name:
(parted) select /dev/sdb
Using /dev/sdb

Getting Information
The print command can be used to get more information about a specific partition or even all of
the block devices (disks) connected to your system.
To get information about the currently selected partition, just type print:
(parted) print
Model: ATA CT120BX500SSD1 (scsi)
Disk /dev/sda: 120GB
Partition Table: msdos

2097kB

4295MB

linux-swap(v1)

424

You can get a list of all block devices connected to your system using print devices:
(parted) print devices
/dev/sdb (1999MB)
/dev/sda (120GB)
/dev/sdc (320GB)
/dev/mapper/cryptswap (4294MB)

To get information about all connected devices at once, you can use print all. If you wish to
know how much free space there is in each one of them, you can use print free:
(parted) print free
Model: ATA CT120BX500SSD1 (scsi)
Disk /dev/sda: 120GB
Partition Table: msdos

32.3kB

2097kB

2065kB

2097kB

512B

4295MB

2098kB

linux-swap(v1)

Creating a Partition Table on an Empty Disk
To create a partition table on an empty disk, use the mklabel command, followed by the partition
table type that you want to use.
There are many supported partition table types, but the main types you should know of are msdos
which is used here to refer to an MBR partition table, and gpt to refer to a GPT partition table. To
create an MBR partition table, type:
(parted) mklabel msdos

And to create a GPT partition table, the command is:
(parted) mklabel gpt

425

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Creating a Partition
To create a partition the command mkpart is used, using the syntax mkpart PARTTYPE FSTYPE
START END, where:
PARTTYPE
Is the partition type, which can be primary, logical or extended in case an MBR partition
table is used.
FSTYPE
Specifies which filesystem will be used on this partition. Note that parted will not create the
filesystem. It just sets a flag on the partition which tells the OS what kind of data to expect from
it.
START
Specifies the exact point on the device where the partition begins. You can use different units to
specify this point. 2s can be used to refer to the second sector of the disk, while 1m refers to the
beginning of the first megabyte of the disk. Other common units are B (bytes) and % (percentage
of the disk).
END
Specifies the end of the partition. Note that this is not the size of the partition, this is the point
on the disk where it ends. For example, if you specify 100m the partition will end 100 MB after
the start of the disk. You can use the same units as in the START parameter.
So, the command:
(parted) mkpart primary ext4 1m 100m

Creates a primary partition of type ext4, starting at the first megabyte of the disk, and ending
after the 100th megabyte.

Removing a Partition
To remove a partition, use the command rm followed by the partition number, which you can
display using the print command. So, rm 2 would remove the second partition on the currently
selected disk.

426

Recovering Partitions
parted can recover a deleted partition. Consider you have the following partition structure:

By accident, you removed partition 2 using rm 2. To recover it, you can use the rescue command,
with the syntax rescue START END, where START is the approximate location where the partition
started, and END the approximate location where it ended.
parted will scan the disk in search of partitions, and offer to restore any that are found. In the
example above the partition 2 started at 99,6 MB and ended at 200 MB. So you can use the
following command to recover the partition:
(parted) rescue 90m 210m
Information: A ext4 primary partition was found at 99.6MB -> 200MB.
Do you want to add it to the partition table?
Yes/No/Cancel? y

This will recover the partition and its contents. Note that rescue can only recover partitions that
have a filesystem installed on them. Empty partitions are not detected.

Resizing ext2/3/4 Partitions
parted can be used to resize partitions to make them bigger or smaller. However, there are some
caveats:
- During resizing the partition must be unused and unmounted.
- You need enough free space after the partition to grow it to the size you want.
The command is resizepart, followed by the partition number and where it should end. For
example, if you have the following partition table:

427

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Trying to grow partition 1 using resizepart would trigger an error message, because with the
new size partition 1 would overlap with partition 2. However partition 3 can be resized as there is
free space after it, which can be verified with the command print free:
(parted) print free
Model: Kingston DataTraveler 2.0 (scsi)
Disk /dev/sdb: 1999MB
Partition Table: gpt

17.4kB

1031kB

1999MB

1699MB

So you can use the following command to resize partition 3 to 350 MB:
(parted) resizepart 3 350m
(parted) print
Model: Kingston DataTraveler 2.0 (scsi)
Disk /dev/sdb: 1999MB
Partition Table: gpt

350MB

150MB

Remember that the new end point is specified counting from the start of the disk. So, because
partition 3 ended at 300 MB, now it needs to end at 350 MB.
But resizing the partition is only one part of the task. You also need to resize the filesystem that
resides in it. For ext2/3/4 filesystems this is done with the resize2fs command. In the case of the

428

example above, partition 3 still shows the “old” size when mounted:
$ df -h /dev/sdb3

80M

2% /media/carol/part3

To adjust the size the command resize2fs DEVICE SIZE can be used, where DEVICE
corresponds to the partition you want to resize, and SIZE is the new size. If you omit the size
parameter, it will use all of the available space of the partition. Before resizing, it is advised to
unmount the partition.
In the example above:
$ sudo resize2fs /dev/sdb3
resize2fs 1.44.6 (5-Mar-2019)
Resizing the filesystem on /dev/sdb3 to 146212 (1k) blocks.
The filesystem on /dev/sdb3 is now 146212 (1k) blocks long.
$ df -h /dev/sdb3

135M

123M

2% /media/carol/part3

To shrink a partition, the process needs to be done in the reverse order. First you resize the
filesystem to the new, smaller size, then you resize the partition itself using parted.

Pay attention when shrinking partitions. If you get the order of things wrong,
you will lose data!

In our example:
resize2fs 1.44.6 (5-Mar-2019)
Resizing the filesystem on /dev/sdb3 to 90112 (1k) blocks.
The filesystem on /dev/sdb3 is now 90112 (1k) blocks long.
(parted) resizepart 3 300m
Warning: Shrinking a partition can cause data loss, are you sure
you want to continue?
Yes/No? y

429

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

(parted) print
Model: Kingston DataTraveler 2.0 (scsi)
Disk /dev/sdb: 1999MB
Partition Table: gpt

99.7MB

Instead of specifying a new size, you can use the -M parameter of resize2fs to
adjust the size of the filesystem so it is just big enough for the files on it.

Creating Swap Partitions
On Linux, the system can swap memory pages from RAM to disk as needed, storing them on a
separate space usually implemented as a separate partition on a disk, called the swap partition or
simply swap. This partition needs to be of a specific type, and set-up with a proper utility (mkswap)
before it can be used.
To create the swap partition using fdisk or gdisk, just proceed as if you were creating a regular
partition, as explained before. The only difference is that you will need to change the partition
type to Linux swap.
- On fdisk use the t command. Select the partition you want to use and change its type to 82.
Write changes to disk and quit with w.
- On gdisk the command to change the partition type is also t, but the code is 8200. Write
changes to disk and quit with w.
If you are using parted, the partition should be identified as a swap partition during creation, just
use linux-swap as the filesystem type. For example, the command to create a 500 MB swap
partition, starting at 300 MB on disk is:
(parted) mkpart primary linux-swap 301m 800m

Once the partition is created and properly identified, just use mkswap followed by the device
representing the partition you want to use, like:

430

To enable swap on this partition, use swapon followed by the device name:

Similarly, swapoff, followed by the device name, will disable swap on that device.
Linux also supports the use of swap files instead of partitions. Just create an empty file of the size
you want using dd and then use mkswap and swapon with this file as the target.
The following commands will create a 1 GB file called myswap in the current directory, filled with
zeroes, and than set-up and enable it as a swap file.
Create the swap file:
$ dd if=/dev/zero of=myswap bs=1M count=1024
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 7.49254 s, 143 MB/s

if= is the input file, the source of the data that will be written to the file. In this case it is the
/dev/zero device, which provides as many NULL characters as requested. of= is the output file,
the file that will be created. bs= is the size of the data blocks, here specified in Megabytes, and
count= is the amount of blocks to be written to the output. 1024 blocks of 1 MB each equals 1 GB.
Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
no label, UUID=49c53bc4-c4b1-4a8b-a613-8f42cb275b2b

Using the commands above, this swap file will be used only during the current system session. If
the machine is rebooted, the file will still be available, but will not be automatically loaded. You
can automate that by adding the new swap file to /etc/fstab, which we will discuss in a later
lesson.

Both mkswap and swapon will complain if your swap file has insecure permissions.
The recommended file permission flag is 0600. Owner and group should be root.

431

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Which partitioning scheme should be used to partition a 3 TB hard disk into three 1 GB
partitions? Why?

2. On gdisk, how can we find out how much space is available on the disk?
