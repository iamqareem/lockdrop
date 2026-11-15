---
id: lpi-101-500-04
title: "LPIC-1 · 101-500 — Someone just donated a laptop to your school and now you wish to…"
slug: lpi-101-500-04-lpic-1-101-500-someone-just-donated-a-laptop-to-your-school-
source: "LPI Learning Material — LPIC-1 (Exam 101-500)"
sourceSection: "1. Someone just donated a laptop to your school and now you wish to install Linux on it. There is, 2. Explore your local /etc/passwd file with the grep, sed, head and tail commands per the, 3. Consider this /etc/passwd file example. Copy the lines below to a local file named mypasswd, 1. Once more u"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "Tip: Use the sed, cut, and paste commands to achieve the desired results. Covers 46 sections: Someone just donated a laptop to your school and now you wish to install Linux on it. There is, Explore your local /etc/."
---
# LPIC-1 · 101-500 — Someone just donated a laptop to your school and now you wish to…

## 2. Explore your local /etc/passwd file with the grep, sed, head and tail commands per the
tasks below:
- Which users have access to a Bash shell?

- Your system has various users that exist to handle specific programs or for administrative
purposes. They do not have access to a shell. How many of those exist in your system?

- How many users and groups exist in your system (remember: use only the /etc/passwd
file)?

208

- List only the first line, the last line and the tenth line of your /etc/passwd file.

## 3. Consider this /etc/passwd file example. Copy the lines below to a local file named mypasswd
for this exercise.
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
nvidia-persistenced:x:121:128:NVIDIA Persistence Daemon,,,:/nonexistent:/sbin/nologin
libvirt-qemu:x:64055:130:Libvirt Qemu,,,:/var/lib/libvirt:/usr/sbin/nologin
libvirt-dnsmasq:x:122:133:Libvirt Dnsmasq,,,:/var/lib/libvirt/dnsmasq:/usr/sbin/nologin
carol:x:1000:2000:Carol Smith,Finance,,,Main Office:/home/carol:/bin/bash
dave:x:1001:1000:Dave Edwards,Finance,,,Main Office:/home/dave:/bin/ksh
emma:x:1002:1000:Emma Jones,Finance,,,Main Office:/home/emma:/bin/bash
frank:x:1003:1000:Frank Cassidy,Finance,,,Main Office:/home/frank:/bin/bash
grace:x:1004:1000:Grace Kearns,Engineering,,,Main Office:/home/grace:/bin/ksh
henry:x:1005:1000:Henry Adams,Sales,,,Main Office:/home/henry:/bin/bash
john:x:1006:1000:John Chapel,Sales,,,Main Office:/home/john:/bin/bash

- List all users in group 1000 (use sed to select only the appropriate field) from your
mypasswd file.

- List only the full names of all the users for this group (use sed and cut).

209

## 1. Once more using the mypasswd file from the previous exercises, devise a Bash command that
will select one individual from the Main Office to win a raffle contest. Use the sed command to
only print out the lines for the Main Office, and then a cut command sequence to retrieve the
first name of each user from these lines. Next you will want to randomly sort these names and
only print out the top name from the list.

## 2. How many people work in Finance, Engineering and Sales? (Consider exploring the uniq
command.)

## 3. Now you want to prepare a CSV (comma separated values) file so you can easily import, from
the mypasswd file in the previous example, the file names.csv into LibreOffice. The file
contents will have the following format:
First Name,Last Name,Position
Carol,Smith,Finance
...
John,Chapel,Sales

Tip: Use the sed, cut, and paste commands to achieve the desired results. Note that the
comma (,) will be the delimiter for this file.
4. Suppose that the names.csv spreadsheet created in the previous exercise is an important file
and we want to make sure nobody will tamper with it from the moment we send it to someone
and the moment our recipient receives it. How can we insure the integrity of this file using
md5sum?

## 5. You promised yourself that you would read a classic book 100 lines per day and you decided to
start with Mariner and Mystic by Herman Melville. Devise a command using split that will
separate this book into sections of 100 lines each. In order to get the book in plain text format,
search for it at https://www.gutenberg.org.

## 6. Using ls -l on the /etc directory, what kind of listing do you get? Using the cut command on
the output of the given ls command how would you display only the file names? What about
the filename and the owner of the files? Along with the ls -l and cut commands, utilize the

210

tr command to squeeze multiple occurrences of a space into a single space to aid in formatting
the output with a cut command.

## 7. This exercise assumes you are on a real machine (not a virtual machine). You must also have a
USB stick with you. Review the manual pages for the tail command and find out how to
follow a file as text is appended to it. While monitoring the output of a tail command on the
/var/log/syslog file, insert a USB stick. Write out the full command that you would use to get
the Product, Manufacturer and the total amount of memory of your USB stick.

211

Dealing with text streams is of great importance when administering any Linux system. Text
streams can be processed using scripts to automate daily tasks or finding relevant debugging
information in log files. Here is a short summary of the commands covered in this lesson:
Used to combine or read plain text files.
Allows for the processing or reading of files compressed using the bzip2 method.
Allows for the processing or reading of files compressed using the xz method.
Allows for the processing or reading of files compressed using the gzip method.
This command paginates the contents of a file, and allows for navigation and search
functionality .
This command will display the first 10 lines of a file by default. With the use of the -n switch
fewer or more lines can be displayed.
This command will display the last 10 lines of a file by default. With the use of the -n switch
fewer or more lines can be displayed. The -f option is used to follow the output of a text file
has new data is being written to it.
Short for “word count” but depending on the parameters you use it will count characters,
words and lines.
Used for the organizing the output of a listing alphabetically, reverse alphabetically, or in a
random order.

212

Used to list (and count) matching strings.
The “octal dump” command is used to display a binary file in either octal, decimal, or
hexadecimal notation.
The “number line” command will display the number of lines in a file as well as recreate a file
with each line prepended by its line number.
The stream editor can be used to find matching occurrences of strings using Regular
Expressions as well as editing files using pre-defined patterns.
The translate command can replace characters and also removes and compresses repeating
characters.
This command can print columns of text files as fields based on a file’s character delimiter.
Join files in columns based on the usage of field separators.
This command can split larger files into smaller ones depending on the criteria set by the
command’s options.
Used for calculating the MD5 hash value of a file. Also used to verify a file against an existing
hash value to ensure a file’s integrity.
Used for calculating the SHA256 hash value of a file. Also used to verify a file against an
existing hash value to ensure a file’s integrity.
Used for calculating the SHA512 hash value of a file. Also used to verify a file against an
existing hash value to ensure a file’s integrity.

213

## 1. Someone just donated a laptop to your school and now you wish to install Linux on it. There is
no manual and you were forced to boot it from a USB thumb drive with no graphics
whatsoever. You do get a shell terminal and you know, for every processor you have there will
be a line for it in the /proc/cpuinfo file:

: 0

(lines skipped)

: 1

(more lines skipped)

- Using the commands grep and wc display how many processors you have.
Here are two options:
$ cat /proc/cpuinfo | grep processor | wc -l
$ grep processor /proc/cpuinfo | wc -l

Now that you know there are several ways you can do the same thing, when should you be
using one or the other? It really depends on several factors, the two most important ones
being performance and readability. Most of the time you will use shell commands inside
shell scripts to automate your tasks and the larger and more complex your scripts become
the more you need to worry about keeping them fast.
- Do the same thing with sed instead of grep
Now, instead of grep we will try this with sed:
$ sed -n /processor/p /proc/cpuinfo | wc -l

214

Here we used sed with the -n parameter so sed will not print anything except for what
matches with the expression processor, as instructed by the p command. As we did in the
grep solutions, wc -l will count the number of lines, thus the number of processors we
have.
Study this next example:
$ sed -n /processor/p /proc/cpuinfo | sed -n '$='

This command sequence provides identical results to the previous example where the
output of sed was piped into a wc command. The difference here is that instead of using wc
-l to count the number of lines, sed is again invoked to provide equivalent functionality.
Once more, we are suppressing the output of sed with with the -n option, except for the
expression that we are explicitly calling, which is '$='. This expression tells sed to match
the last line ($) and then to print that line number (=).
2. Explore your local /etc/passwd file with the grep, sed, head and tail commands per the
tasks below:
- Which users have access to a Bash shell?
$ grep ":/bin/bash$" /etc/passwd

We will improve this answer by only displaying the name of the user that utilizes the Bash
shell.
$ grep ":/bin/bash$" /etc/passwd | cut -d: -f1

The user name is the first field (-f1 parameter of the cut command) and the /etc/passwd
file uses : as separators (-d: parameter of the cut command) we just pipe the output of the
grep command to the appropriate cut command.
- Your system has various users that exists to handle specific programs or for administrative
purposes. They do not have access to a shell. How many of those exist in your system?
The easiest way to find this is by printing out the lines for accounts that do not use the Bash
shell:
$ grep -v ":/bin/bash$" /etc/passwd | wc -l

215

- How many users and groups exist in your system (remember: use only the /etc/passwd
file)
The first field of any given line in your /etc/passwd file is the user name, the second is
typically an x indicating the user password is not stored here (it is encrypted in the
/etc/shadow file). The third is the user id (UID) and the fourth is the group id (GID). So this
should give us the number of users:
$ cut -d: -f3 /etc/passwd | wc -l

Well, most of the time it will. However, there are situations where you will set different
super users or other special kinds of users sharing the same UID (user id). So, to be on the
safe side we will pipe the result of our cut command to the sort command and then count
the number of lines.
$ cut -d: -f3 /etc/passwd | sort -u | wc -l

Now, for the number of groups:
$ cut -d: -f4 /etc/passwd | sort -u | wc -l

- List only the first line, the last line and the tenth line of your /etc/passwd file
This will do:
$ sed -n -e '1'p -e '10'p -e '$'p /etc/passwd

Remember that the parameter -n tells sed not to print anything other than what is specified
by the p command. The dollar sign ($) used here is a regular expression meaning the last
line of the file.
3. Consider this /etc/passwd file example. Copy the lines below to a local file named mypasswd
for this exercise.
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync

216

nvidia-persistenced:x:121:128:NVIDIA Persistence Daemon,,,:/nonexistent:/sbin/nologin
libvirt-qemu:x:64055:130:Libvirt Qemu,,,:/var/lib/libvirt:/usr/sbin/nologin
libvirt-dnsmasq:x:122:133:Libvirt Dnsmasq,,,:/var/lib/libvirt/dnsmasq:/usr/sbin/nologin
carol:x:1000:2000:Carol Smith,Finance,,,Main Office:/home/carol:/bin/bash
dave:x:1001:1000:Dave Edwards,Finance,,,Main Office:/home/dave:/bin/ksh
emma:x:1002:1000:Emma Jones,Finance,,,Main Office:/home/emma:/bin/bash
frank:x:1003:1000:Frank Cassidy,Finance,,,Main Office:/home/frank:/bin/bash
grace:x:1004:1000:Grace Kearns,Engineering,,,Main Office:/home/grace:/bin/ksh
henry:x:1005:1000:Henry Adams,Sales,,,Main Office:/home/henry:/bin/bash
john:x:1006:1000:John Chapel,Sales,,,Main Office:/home/john:/bin/bash

- List all users in group 1000 (use sed to select only the appropriate field) from your
mypasswd file:
The GID is the fourth field in the /etc/passwd file. You might be tempted to try this:
$ sed -n /1000/p mypasswd

In this case you will also get this line:
carol:x:1000:2000:Carol Smith,Finance,,,Main Office:/home/carol:/bin/bash

You know this is not correct since Carol Smith is a member of GID 2000 and the the match
occurred because of the UID. However, you may have noticed that after the GID the next
field starts with an upper case character. We can use a regular expression to solve this
problem.
$ sed -n /:1000:[A-Z]/p mypasswd

The expression [A-Z] will match any single upper case character. You will learn more about
this in the respective lesson.
- List only the full names of all the users for this group (use sed and cut):
Use the same technique you used to solve the first part of this exercise and pipe it to a cut
$ sed -n /:1000:[A-Z]/p mypasswd | cut -d: -f5
Dave Edwards,Finance,,,Main Office
Emma Jones,Finance,,,Main Office

217

Frank Cassidy,Finance,,,Main Office
Grace Kearns,Engineering,,,Main Office
Henry Adams,Sales,,,Main Office
John Chapel,Sales,,,Main Office

Not quite there! Do note how the fields inside your results can be separated by ,. So we will
pipe the output to another cut command, using the , as a delimiter.
$ sed -n /:1000:[A-Z]/p mypasswd | cut -d: -f5 | cut -d, -f1
Dave Edwards
Emma Jones
Frank Cassidy
Grace Kearns
Henry Adams
John Chapel

218

## 1. Once more using the mypasswd file from the previous exercises, devise a Bash command that
will select one individual from the Main Office to win a raffle contest. Use the sed command to
only print out the lines for the Main Office, and then a cut command sequence to retrieve the
first name of each user from these lines. Next you will want to randomly sort these names and
only print out the top name from the list.
First explore how the parameter -R manipulates the output of the sort command. Repeat this
command a couple times on your machine (note you will need to enclose 'Main Office' within
single quotes, so sed will handle it as a single string):
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d, -f1 | sort -R

Here is a solution to the problem:
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d, -f1 | sort -R | head -1

## 2. How many people work in Finance, Engineering and Sales? (Consider exploring the uniq
command.)
Keep building on top of what you learned from the previous exercises. Try the following:
$ sed -n /'Main Office'/p mypasswd
$ sed -n /'Main Office'/p mypasswd | cut -d, -f2

Notice now we do not care about the : as a delimiter. We just want the second field when we
split the lines by the , characters.
$ sed -n /'Main Office'/p mypasswd | cut -d, -f2 | uniq -c
4 Finance
1 Engineering
## 2. Sales

The uniq command will only output the unique lines (not the repeating lines) and the
parameter -c tells uniq to count the occurences of the equal lines. There is a caveat here: uniq
will only consider adjacent lines. When this is not the case you will have to use the sort

219

## 3. Now you want to prepare a CSV (comma separated values) file so you can easily import, from
the mypasswd file in the previous example, the file names.csv into LibreOffice. The file
contents will have the following format:
First Name,Last Name,Position
Carol,Smith,Finance
...
John,Chapel,Sales

Tip: Use the sed, cut, and paste commands to achieve the desired results. Note that the
comma (,) will be the delimiter for this file.
Start with the sed and cut commands, building on top of what we learned from the previous
exercises:
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d" " -f1 > firstname

Now we have the file firstname with the first names of our employees.
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d" " -f2 | cut -d, -f1 > lastname

Now we have the file lastname containing the surnames of each employee.
Next we determine which department each employee works in:
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d, -f2 > department

Before we work on the final solution, try the following commands to see what type of output
they generate:
$ cat firstname lastname department
$ paste firstname lastname department

And now for the final solution:
$ paste firstname lastname department | tr '\t' ,
$ paste firstname lastname department | tr '\t' , > names.csv

220

Here we use the command tr to translate \t, the tab separator, by a ,. tr is quite useful when
we need to exchange one character for another. Be sure to review the man pages for both tr
and paste. For example, we can use the -d option for the delimiter to make the previous
command less complex:
$ paste -d, firstname lastname department

We used the paste command here once we needed to get you familiar with it. However we
could have easily performed all of the tasks in a single command chain:
$ sed -n /'Main Office'/p mypasswd | cut -d: -f5 | cut -d, -f1,2 | tr ' ' , > names.csv

## 4. Suppose that the names.csv spreadsheet created in the previous exercise is an important file
and we want to make sure nobody will tamper with it from the moment we send it to someone
and the moment our recipient receives it. How can we insure the integrity of this file using
md5sum?
If you look into the man pages for md5sum, sha256sum and sha512sum you will see they all
start with the following text:
“compute and check XXX message digest”
Where “XXX” is the algoritm that will be used to create this message digest.
We will use md5sum as an example and later you can try with the other commands.
$ md5sum names.csv
61f0251fcab61d9575b1d0cbf0195e25

names.csv

Now, for instance, you can make the file available through a secure ftp service and send the
generated message digest using another secure means of communication. If the file has been
slightly modified the message digest will be completely different. Just to prove it, edit
names.csv and change Jones to James as demonstrated here:
$ sed -i.backup s/Jones/James/ names.csv
$ md5sum names.csv
f44a0d68cb480466099021bf6d6d2e65

names.csv

Whenever you make files available for download, it is always a good practice to also distribute

221

a message digest correspondent so people who download your file can produce a new message
digest and check against the original. If you browse through https://kernel.org you will find the
page https://mirrors.edge.kernel.org/pub/linux/kernel/v5.x/sha256sums.asc where you can
obtain the sha256sum for all files available for download.
5. You promised yourself that you would read a classic book 100 lines per day and you decided to
start with Mariner and Mystic by Herman Melville. Devise a command using split that will
separate this book into sections of 100 lines each. In order to get the book in plain text format,
search for it at https://www.gutenberg.org.
First we will get the whole book from the Project Gutenberg site, where you can get this and
other books that are available in the public domain.
$ wget https://www.gutenberg.org/files/50461/50461-0.txt

You might need to install wget if it is not already installed in your system. Alternatively, you
can also use curl. Use less to verify the book:
$ less 50461-0.txt

Now we will split the book into chunks of 100 lines each:
$ split -l 100 -d 50461-0.txt melville

50461-0.txt is the file we will be splitting. melville will be the prefix for the split files. The
-l 100 specifies the number of lines and the -d option tells split to number the files (using
the provided suffix). You can use nl on any of the splitted files (probably not on the last one)
and confirm each one of them have 100 lines.
6. Using ls -l on the /etc directory, what kind of listing do you get? Using the cut command on
the output of the given ls command how would you display only the file names? What about
the filename and the owner of the files? Along with the ls -l and cut commands, utilize the
tr command to squeeze multiple occurrences of a space into a single space to aid in formatting
the output with a cut command.
The ls command by itself will give you just the names of the files. We can, however, prepare
the output of the ls -l (the long listing) to extract more specific information.
$ ls -l /etc | tr -s ' ' ,

222

drwxr-xr-x,3,root,root,4096,out,24,16:58,acpi
-rw-r--r--,1,root,root,3028,dez,17,2018,adduser.conf
-rw-r--r--,1,root,root,10,out,2,17:38,adjtime
drwxr-xr-x,2,root,root,12288,out,31,09:40,alternatives
-rw-r--r--,1,root,root,401,mai,29,2017,anacrontab
-rw-r--r--,1,root,root,433,out,1,2017,apg.conf
drwxr-xr-x,6,root,root,4096,dez,17,2018,apm
drwxr-xr-x,3,root,root,4096,out,24,16:58,apparmor
drwxr-xr-x,9,root,root,4096,nov,6,20:20,apparmor.d

The -s parameter instructs tr to shrink the repeated spaces into a single instance of a space.
The tr command works for any kind of repeating character you specify. Then we replace the
spaces with a comma ,. We actually do not need to replace the spaces in our example so we
will just omit the ,.
$ ls -l /etc | tr -s ' '
drwxr-xr-x 3 root root 4096 out 24 16:58 acpi
-rw-r--r-- 1 root root 3028 dez 17 2018 adduser.conf
-rw-r--r-- 1 root root 10 out 2 17:38 adjtime
drwxr-xr-x 2 root root 12288 out 31 09:40 alternatives
-rw-r--r-- 1 root root 401 mai 29 2017 anacrontab
-rw-r--r-- 1 root root 433 out 1 2017 apg.conf
drwxr-xr-x 6 root root 4096 dez 17 2018 apm
drwxr-xr-x 3 root root 4096 out 24 16:58 apparmor

If I want just the filenames then all that we need displayed is the ninth field:
$ ls -l /etc | tr -s ' ' | cut -d" " -f9

For the filename and the owner of a file we will need the ninth and the third fields:
$ ls -l /etc | tr -s ' ' | cut -d" " -f9,3

What if we just need the folder names and its owner?
$ ls -l /etc | grep ^d | tr -s ' ' | cut -d" " -f9,3

## 7. This exercise assumes you are on a real machine (not a virtual machine). You must also have a
USB stick with you. Review the manual pages for the tail command and find out how to

223

follow a file as text is appended to it. While monitoring the output of a tail command on the
/var/log/syslog file, insert a USB stick. Write out the full command that you would use to get
the Product, Manufacturer and the total amount of memory of your USB stick.
$ tail -f /var/log/syslog | grep -i 'product\:\|blocks\|manufacturer'
Nov

8 06:01:35 brod-avell kernel: [124954.369361] usb 1-4.3: Product: Cruzer Blade

Nov

8 06:01:35 brod-avell kernel: [124954.369364] usb 1-4.3: Manufacturer: SanDisk

Nov

8 06:01:37 brod-avell kernel: [124955.419267] sd 2:0:0:0: [sdc] 61056064 512-byte

logical blocks: (31.3 GB/29.1 GiB)

Of course this is an example and the results may vary depending on your USB memory stick
manufacturer. Notice now we use the -i parameter with the grep command as we are not sure
if the strings we are searching for were in upper or lower case. We also used the | as a logical
OR so we search for lines containing product OR blocks OR manufacturer.

224

### 103.3 Perform basic file management
LPIC-1 v5, Exam 101, Objective 103.3
- Copy, move and remove files and directories individually.
- Copy multiple files and directories recursively.
- Remove files and directories recursively.
- Use simple and advanced wildcard specifications in commands.
- Using find to locate and act on files based on type, size or time.
- Usage of tar, cpio and dd.
- cp
- find
- mkdir
- mv
- ls
- rm
- rmdir
- touch

225

- tar
- cpio
- dd
- file
- gzip
- gunzip
- bzip2
- bunzip2
- file globbing

226

### 103.3 Lesson 1

### 103.3 Perform basic file management

Everything in Linux is a file, so knowing how to manipulate them is very important. In this lesson,
we shall cover basic operations on files.
In general, as a Linux user, you will be called upon to navigate through the file system, copy files
from one location to another and delete files. We shall also cover the commands associated with
file management.
A file is an entity that stores data and programs. It consists of content and meta data (file size,
owner, creation date, permissions). Files are organized in directories. A directory is a file that
stores other files.
The different types of files include:
Regular files
which store data and programs.

227

Directories
which contain other files.
Special files
which are used for input and output.
Of course, other kinds of files exist but are beyond the scope of this lesson. Later, we shall discuss
how to identify these different file types.

Manipulating Files
Using ls to List Files
The ls command is one of the most important command line tools you should learn in order to
navigate the file system.
In its basic form, ls will list file and directory names only:
Desktop Downloads

When used with -l , referred to as “long listing” format, it shows file or directory permissions,
owner, size, modified date, time and name:
$ ls -l
total 60

8980

228

The first character in the output indicates the file type:
for a regular file.
for a directory.
for a special file.
To show the file sizes in a human readable format add the option -h:
total 60K

8.8K

To list all files including hidden files (those starting with .) use the option -a:
$ ls -a

.dbus

..

Desktop file2

.bash_history

.dmrc

.sudo_as_admin_successful

.gconf

.profile

Configuration files such as .bash_history which are by default hidden are now visible.
In general, the ls command syntax is given by:

229

ls OPTIONS FILE

Where OPTIONS are any of the options shown previously (to view all the possible options run man
ls), and FILE is the name of the file or directory’s details you wish to list.

When FILE is not specified, the current directory is implied.

Creating, Copying, Moving and Deleting Files
Creating files with touch
The touch command is the easiest way to create new, empty files. You can also use it to change
the timestamps (i.e., modification time) of existing files and directories. The syntax for using
touch is:
touch OPTIONS FILE_NAME(S)

Without any options, touch would create new files for any file names that are supplied as
arguments, provided that files with such names do not already exist. touch can create any
number of files simultaneously:
$ touch file1 file2 file3

This would create three new empty files named file1, file2 and file3.
Several touch options are specifically designed to allow the user to change the timestamps for
files. For example, the -a option changes only the access time, while the -m option changes only
the modification time. The use of both options together changes the access and also the
modification times to the current time:
$ touch -am file3

Copying Files with cp
As a Linux user, you will often copy files from one location to another. Whether it is moving a
music file from one directory to another or a system file, use cp for all copy tasks:
$ cp file1 dir2

230

This command can be literally interpreted as copy file1 into directory dir2. The result is the
presence of file1 inside dir2. For this command to be executed successfully file1 should be
existent in the user’s current directory. Otherwise, the system reports an error with the message
No such file or directory.
$ cp dir1/file1 dir2

In this case, observe that the path to file1 is more explicit. The source path can be expressed
either as a relative or absolute path. Relative paths are given in reference to a specific directory,
while absolute paths are not given with a reference. Below we shall further clarify this notion.
For the moment, just observe that this command copies file1 into the directory dir2. The path to
file1 is given with more detail since the user is currently not located in dir1.
$ cp /home/frank/Documents/file2 /home/frank/Documents/Backup

In this third case, file2 located at /home/frank/Documents is copied into the directory
/home/frank/Documents/Backup. The source path provided here is absolute. In the two
examples above, the source paths are relative. When a path starts with the character / it is an
absolute path, otherwise it is a relative path.
The general syntax for cp is:
cp OPTIONS SOURCE DESTINATION

SOURCE is the file to copy and DESTINATION the directory into which the file would be copied.
SOURCE and DESTINATION can be specified either as absolute or relative paths.
Moving Files with mv
Just like cp for copying, Linux provides a command for moving and renaming files. It is called mv.
The move operation is analogue to the cut and paste operation you generally perform through a
Graphical User Interface (GUI).
If you wish to move a file into a new location, use mv in the following way:
mv FILENAME DESTINATION_DIRECTORY

231

Here is an example:
$ mv myfile.txt /home/frank/Documents

The result is that myfile.txt is moved into destination /home/frank/Documents.
To rename a file, mv is used in the following way:
$ mv old_file_name new_file_name

This changes the name of the file from old_file_name to new_file_name.
By default, mv would not seek your confirmation (technically said “would not prompt”) if you wish
to overwrite (rename) an existing file. However, you can allow the system to prompt, by using the
option -i:
$ mv -i old_file_name new_file_name
mv: overwrite 'new_file_name'?

This command would ask the user’s permission before overwriting old_file_name to
new_file_name.
Conversely, using the -f:
$ mv -f old_file_name new_file_name

would forcefully overwrite the file, without asking any permission.
Deleting Files with rm
rm is used to delete files. Think of it as an abbreviated form of the word “remove”. Note that the
action of removing a file is usually irreversible thus this command should be used with caution.
$ rm file1

This command would delete file1.
$ rm -i file1

232

rm: remove regular file 'file1'?

This command would request the user for confirmation before deleting file1. Remember, we
saw the -i option when using mv above.
$ rm -f file1

This command forcefully deletes file1 without seeking your confirmation.
Multiple files can be deleted at the same time:
$ rm file1 file2 file3

In this example file1, file2 and file3 are deleted simultaneously.
The syntax for rm is generally given by:
rm OPTIONS FILE

Creating and Deleting Directories
Creating Directories with mkdir
Creating directories is critical to organizing your files and folders. Files may be grouped together
in a logical way by keeping them inside a directory. To create a directory, use mkdir:
mkdir OPTIONS DIRECTORY_NAME

where DIRECTORY_NAME is the name of the directory to be created. Any number of directories can
be created simultaneously:
$ mkdir dir1

would create the directory dir1 in the user’s current directory.
$ mkdir dir1 dir2 dir3

233

The preceding command would create three directories dir1, dir2 and dir3 at the same time.
To create a directory together with its subdirectories use the option -p (“parents”):
$ mkdir -p parents/children

This command would create the directory structure parents/children, i.e. it would create the
directories parents and children. children would be located inside parents.

Removing Directories with rmdir
rmdir deletes a directory if it is empty. Its syntax is given by:
rmdir OPTIONS DIRECTORY

where DIRECTORY could be a single argument or a list of arguments.
$ rmdir dir1

This command would delete dir1.
$ rmdir dir1 dir2

This command would simultaneously delete dir1 and dir2.
You may remove a directory with its subdirectory:
$ rmdir -p parents/children

This would remove the directory structure parents/children. Note that if any of the directories
are not empty, they will not be deleted.

Recursive Manipulation of Files and Directories
To manipulate a directory and its contents, you need to apply recursion. Recursion means, do an
action and repeat that action all down the directory tree. In Linux, the options -r or -R or
--recursive are generally associated with recursion.

234

The following scenario would help you better understand recursion:
You list the contents of a directory students, which contains two subdirectories level 1 and
level 2 and the file named frank. By applying recursion, the ls command would list the content
of students i.e. level 1, level 2 and frank, but would not end there. It would equally enter
subdirectories level 1 and level 2 and list their contents and so on down the directory tree.

Recursive Listing with ls -R
ls -R is used to list the contents of a directory together with its subdirectories and files.
$ ls -R mydirectory
mydirectory/:

newdirectory

mydirectory/newdirectory:

In the listing above, mydirectory including all its content are listed. You can observe
mydirectory contains the subdirectory newdirectory and the file file1. newdirectory is
empty that is why no content is shown.
In general, to list the contents of a directory including its subdirectories, use:
ls -R DIRECTORY_NAME

Adding a trailing slash to DIRECTORY_NAME has no effect:
$ ls -R animal

is similar to
$ ls -R animal/

Recursive Copy with cp -r
cp -r (or -R or --recursive) allows you to copy a directory together with its all subdirectories
and files.
$ tree mydir

235

mydir
|_file1
|_newdir
|_file2
|_insidenew
|_lastdir

3 directories, 2 files
$ mkdir newcopy
$ cp mydir newcopy
cp: omitting directory 'mydir'
$ cp -r mydir newcopy
- tree newcopy
newcopy
|_mydir
|_file1
|_newdir
|_file2
|_insidenew
|_lastdir
4 directories, 2 files

In the listing above, we observe that trying to copy mydir into newcopy, using cp without -r, the
system displays the message cp: omitting directory 'mydir'. However, by adding the
option -r all the contents of mydir including itself are copied into newcopy.
To copy directories and subdirectories use:
cp -r SOURCE DESTINATION

Recursive Deletion with rm -r
rm -r will remove a directory and all its contents (subdirectories and files).

236

Be very careful with either the -r or the option combination of -rf when used
with the rm command. A recursive remove command on an important system
directory could render the system unusable. Employ the recursive remove
command only when absolutely certain that the contents of a directory are
safe to remove from a computer.

In trying to delete a directory without using -r the system would report an error:
$ rm newcopy/
rm: cannot remove 'newcopy/': Is a directory
$ rm -r newcopy/

You have to add -r as in the second command for the deletion to take effect.

You may be wondering why we do not use rmdir in this case. There is a subtle
difference between the two commands. rmdir would succeed in deleting only if the
given directory is empty whereas rm -r can be used irrespective of whether this
directory is empty or not.

Add the option -i to seek confirmation before the file is deleted:
$ rm -ri mydir/
rm: remove directory 'mydir/'?

The system prompts before trying to delete mydir.

File Globbing and Wildcards
File globbing is a feature provided by the Unix/Linux shell to represent multiple filenames by
using special characters called wildcards. Wildcards are essentially symbols which may be used to
substitute for one or more characters. They allow, for example, to show all files that start with the
letter A or all files that end with the letters .conf.
Wildcards are very useful as they can be used with commands such as cp, ls or rm.
The following are some examples of file globbing:
rm *
Delete all files in current working directory.
ls l?st
List all files with names beginning with l followed by any single character and ending with st.
rmdir [a-z]*
Remove all directories whose name starts with a letter.

237

Types of Wildcards
There are three characters that can be used as wildcards in Linux:
- (asterisk)
which represents zero, one or more occurrences of any character.
? (question mark)
which represents a single occurrence of any character.
[ ] (bracketed characters)
which represents any occurrence of the character(s) enclosed in the square brackets. It is
possible to use different types of characters whether numbers, letters, other special characters.
For example, the expression [0-9] matches all digits.

The Asterisk
An asterisk (*) matches zero, one or more occurrences of any character.
For example:
$ find /home -name *.png

This would find all files that end with .png such as photo.png, cat.png, frank.png. The find
command will be explored further in a following lesson.
Similarly:
$ ls lpic-*.txt

would list all text files that start with the characters lpic- followed by any number of characters
and end with .txt, such as lpic-1.txt and lpic-2.txt.
The asterisk wildcard can be used to manipulate (copy, delete or move) all the contents of a
directory:
$ cp -r animal/* forest

In this example, all the contents of animal is copied into forest.

238

In general to copy all the contents of a directory we use:
cp -r SOURCE_PATH/* DEST_PATH

where SOURCE_PATH can be omitted if we are already in the required directory.
The asterisk, just as any other wildcard, could be used repeatedly in the same command and at
any position:
$ rm *ate*

Filenames prefixed with zero, one or more occurrence of any character, followed by the letters
ate and ending with zero, one or more occurrence of any character will be removed.

The Question Mark
The question mark (?) matches a single occurrence of a character.
Consider the listing:

third.txt

To return only the files that start with l followed by any single character and the characters
st.txt, we use the question mark (?) wildcard:
$ ls l?st.txt

Only the files last.txt, lest.txt and list.txt are displayed as they match the given criteria.
Similarly,
$ ls ??st.txt

output files that are prefixed with any two characters followed by the text st.txt.

239

Bracketed Characters
The bracketed wildcards matches any occurrence of the character(s) enclosed in the square
brackets:
$ ls l[aef]st.txt

This command would list all files starting with l followed by any of the characters in the set aef
and ending with st.txt.
The square brackets could also take ranges:
$ ls l[a-z]st.txt

This outputs all files with names starting with l followed by any lower case letter in the range a to
z and ending with st.txt.
Multiple ranges could also be applied in the square brackets:
student-1A.txt

student-2A.txt

student-3.txt

$ ls student-[0-9][A-Z].txt
student-1A.text student-2A.txt

The listing shows a school directory with a list of registered students. To list only those students
whose registration numbers meet the following criteria:
- begin with student• followed by a number, and an uppercase character
- and end with .txt

Combining Wildcards
Wildcards can be combined as in:

240

third.txt

$ ls [plf]?st*

The first wildcard component ([plf]) matches any of the characters p, l or f. The second
wildcard component (?) matches any single character. The third wildcard component (*) matches
zero, one or many occurrences of any character.
file1.txt file.txt file23.txt fom23.txt
$ ls f*[0-9].txt
file1.txt file23.txt fom23.txt

The previous command displays all files that begin with the letter f, followed by any set of letters,
at least one occurrence of a digit and ends with .txt. Note that file.txt is not displayed as it
does not match this criteria.

241

## 1. Consider the listing below:
total 60K

8.8K

- What does the character d represent in the output?

- Why are the sizes given in human readable format?

- What would be the difference in the output if ls was used with no argument?

## 2. Consider the command below:
$ cp /home/frank/emp_name /home/frank/backup

- What would happen to the file emp_name if this command is executed successfully?

- If emp_name was a directory what option should be added to cp to execute the command?

- If cp is now changed to mv what results do you expect?

242

## 3. Consider the listing :
file1.txt file2.txt file3.txt file4.txt

Which wildcard would help to delete all the contents of this directory?

4. Based on the previous listing, what files would be displayed by the following command?
$ ls file*.txt

## 5. Complete the command by adding the appropriate digits and characters in the square brackets
that would list all the content above:
$ ls file[].txt

243

1. In your home directory, create the files called dog and cat.
## 2. Still in your home directory, create the directory called animal. Move dog and cat into
animal.
3. Go to the Documents folder found in your home directory and inside, create the directory
backup.
4. Copy animal and its contents into backup.
5. Rename animal in backup to animal.bkup.
6. The /home/lpi/databases directory contains many files which includes: db-1.tar.gz, db2.tar.gz and db-3.tar.gz. Which single command can you use to list only the files
mentioned above?

## 7. Consider the listing:
cne1222223.pdf cne12349.txt cne1234.pdf

With the use of a single globbing character, what command would remove only the pdf files?

244

In this lesson, we explored how to view what is within a directory with the ls command, how to
copy (cp) files and folders and how to move (mv) them as well. We also looked at how new
directoris can be created with the mkdir command. The commands for removing files (rm) and
folders (rmdir) was also discussed.
In this lesson, you also learned about file globbing and wildcards. File globbing is used to
represent multiple file names by using special characters called wildcards. The basic wildcards
and their meanings:
? (question mark)
represents a single occurrence of a character.
[ ] (square brackets)
represents any occurrence of the character(s) enclosed in the square brackets.
- (asterisk)
represents zero, one or more occurrences of any character.
You may combine any these wildcards in the same statement.

245

## 1. Consider the listing below:
total 60K

8.8K

- What does the character d represent in the output?
d is the character that identifies a directory.
- Why are the sizes given in human readable format?
Due the option -h.
- What would be the difference in the output if ls was used with no argument?
Directory and file names would be provided only.
2. Consider the command below:
$ cp /home/frank/emp_name /home/frank/backup

- What would happen to the file emp_name if this command is executed successfully?
emp_name would be copied into backup.
- If emp_name was a directory what option should be added to cp to execute the command?

246

-r
- If cp is now changed to mv what results do you expect?
emp_name would be moved into backup. It would no longer be present inside the home
directory of user frank.
3. Consider the listing :
file1.txt file2.txt file3.txt file4.txt

Which wildcard would help to delete all the contents of this directory?
The asterisk *.
4. Based on the previous listing, what files would be displayed by the following command?
$ ls file*.txt

All of them, since the asterisk character represents any number of characters.
5. Complete the command by adding the appropriate digits and characters in the square brackets
that would list all the content above:
$ ls file[].txt

file[0-9].txt

247

## 1. In your home directory, create the files called dog and cat.
$ touch dog cat

## 2. Still in your home directory, create the directory called animal. Move dog and cat into
animal.
$ mkdir animal
$ mv dog cat -t animal/

## 3. Go to the Documents folder found in your home directory and inside, create the directory
backup.
$ cd ~/Documents
$ mkdir backup

## 4. Copy animal and its contents into backup.
$ cp -r animal ~/Documents/backup

## 5. Rename animal in backup to animal.bkup.
$ mv animal/ animal.bkup

6. The /home/lpi/databases directory contains many files which includes: db-1.tar.gz, db2.tar.gz and db-3.tar.gz. Which single command can you use to list only the files mention
above?
$ ls db-[1-3].tar.gz

## 7. Consider the listing:
cne1222223.pdf cne12349.txt cne1234.pdf

248

With the use of a single globbing character, what command would remove only the pdf files?
$ rm *.pdf

249

### 103.3 Lesson 2

### 103.3 Perform basic file management

How to Find Files
As you use your machine, files progressively grow in number and size. Sometimes it becomes
difficult to locate a particular file. Fortunately, Linux provides find to quickly search and locate
files. find uses the following syntax:
find STARTING_PATH OPTIONS EXPRESSION

STARTING_PATH
defines the directory where the search begins.
OPTIONS
controls the behavior and adds specific criteria to optimize the search process.
EXPRESSION
defines the search query.

250

$ find . -name "myfile.txt"
./myfile.txt

The starting path in this case is the current directory. The option -name specifies that the search is
based on the name of the file. myfile.txt is the name of the file to search. When using file
globbing, be sure to include the expression in quotation marks:
$ find /home/frank -name "*.png"
/home/frank/Pictures/logo.png
/home/frank/screenshot.png

This command finds all files ending with .png starting from /home/frank/ directory and
beneath. If you do not understand the usage of the asterisk (*), it is covered in the previous lesson.

Using Criteria to Speed Search
Use find to locate files based on type, size or time. By specifying one or more options, the desired
results are obtained in less time.
Switches to finding files based on type include:
-type f
file search.
-type d
directory search.
-type l
symbolic link search.
$ find . -type d -name "example"

This command finds all directories in the current directory and below, that have the name
example.
Other criteria which could be used with find include:
-name
performs a search based on the given name.

251

-iname
searches based on the name, however, the case is not important (i.e. the test case myFile is
similar to MYFILE).
-not
returns those results that do not match the test case.
-maxdepth N
searches the current directory as well as subdirectories N levels deep.

Locating Files by Modification Time
find also allows to filter a directory hierarchy based on when the file was modified:
$ sudo find / -name "*.conf" -mtime 7
/etc/logrotate.conf

This command would search for all files in the entire file system (the starting path is the root
directory, i.e. /) that end with the characters .conf and have been modified in the last seven days.
This command would require elevated privileges to access directories starting at the base of the
system’s directory structure, hence the use of sudo here. The argument passed to mtime
represents the number of days since the file was last modified.

Locating Files by Size
find can also locate files by size. For example, searching for files larger than 2G in /var:
$ sudo find /var -size +2G
/var/lib/libvirt/images/debian10.qcow2
/var/lib/libvirt/images/rhel8.qcow2

The -size option displays files of sizes corresponding to the argument passed. Some example
arguments include:
-size 100b
files which are exactly 100 bytes.
-size +100k
files taller than 100 kilobytes.

252

-size -20M
files smaller than 20 megabytes.
-size +2G
files larger than 2 gigabytes.

To find empty files we can use: find . -size 0b or find . -empty.

Acting on the Result Set
Once a search is done, it is possible to perform an action on the resulting set by using -exec:
$ find . -name "*.conf" -exec chmod 644 '{}' \;

This filters every object in the current directory (.) and below for file names ending with .conf
and then executes the chmod 644 command to modify file permissions on the results.
For now, do not bother with the meaning of '{}' \; as it will be discussed later.

Using grep to Filter for Files Based on Content
grep is used to search for the occurrence of a keyword.
Consider a situation where we are to find files based on content:
$ find . -type f -exec grep "lpi" '{}' \; -print
./.bash_history
Alpine/M
helping/M

This would search every object in the current directory hierarchy (.) that is a file (-type f) and
then executes the command grep "lpi" for every file that satisfies the conditions. The files that
match these conditions are printed on the screen (-print). The curly braces ({}) are a
placeholder for the find match results. The {} are enclosed in single quotes (') to avoid passing
grep files with names containing special characters. The -exec command is terminated with a
semicolon (;), which should be escaped (\;) to avoid interpretation by the shell.
Adding the option -delete to the end of an expression would delete all files that match. This
option should be used when you are certain that the results only match the files that you wish to
delete.

253

In the example below, find locates all files in the hierarchy starting at the current directory then
deletes all files that end with the characters .bak:
$ find . -name "*.bak" -delete

Archiving Files
The tar Command (Archiving and Compresssion)
The tar command, short for “tape archive(r)”, is used to create tar archives by converting a group
of files into an archive. Archives are created so as to easily move or backup a group of files. Think
of tar as a tool that creates a glue onto which files can be attached, grouped and easily moved.
tar also has the ability to extract tar archives, display a list of the files included in the archive as
well as add additional files to an existing archive.
The tar command syntax is as follows:
tar [OPERATION_AND_OPTIONS] [ARCHIVE_NAME] [FILE_NAME(S)]

OPERATION
Only one operation argument is allowed and required. The most frequently used operations
--create (-c)
Create a new tar archive.
--extract (-x)
Extract the entire archive or one or more files from an archive.
--list (-t)
Display a list of the files included in the archive.
OPTIONS
The most frequently used options are:
--verbose (-v)
Show the files being processed by the tar command.

254

--file=archive-name (-f archive-name)
Specifies the archive file name.
ARCHIVE_NAME
The name of the archive.
FILE_NAME(S)
A space-separated list of file names to be extracted. If not provided the entire archive is
extracted.

Creating an Archive
Let’s say we have a directory named stuff in the current directory and we want to save it to a file
named archive.tar. We would run the following command:
$ tar -cvf archive.tar stuff
stuff/
stuff/service.conf

Here’s what those switches actually mean:
-c
Create an archive.
-v
Display progress in the terminal while creating the archive, also known as “verbose” mode. The
-v is always optional in these commands, but it is helpful.
Allows to specify the filename of the archive.
In general to archive a single directory or a single file on Linux, we use:
tar -cvf NAME-OF-ARCHIVE.tar /PATH/TO/DIRECTORY-OR-FILE

tar works recursively. It will perform the required action on every subsequent
directory inside the directory specified.

To archive multiple directories at once, we list all the directories delimiting them by a space in the
section /PATH/TO/DIRECTORY-OR-FILE:

255

$ tar -cvf archive.tar stuff1 stuff2

This would produce an archive of stuff1 and stuff2 in archive.tar

Extracting an Archive
We can extract an archive using tar:
$ tar -xvf archive.tar
stuff/
stuff/service.conf

This will extract the contents of archive.tar to the current directory.
This command is the same as the archive creation command used above, except the -x switch that
replaces the -c switch.
To extract the contents of the archive to a specific directory we use -C:
$ tar -xvf archive.tar -C /tmp

This will extract the contents of archive.tar to the /tmp directory.
$ ls /tmp
stuff

Compressing with tar
The GNU tar command included with Linux distributions can create a .tar archive and then
compress it with gzip or bzip2 compression in a single command:
$ tar -czvf name-of-archive.tar.gz stuff

This command would create a compressed file using the gzip algorithm (-z).
While gzip compression is most frequently used to create .tar.gz or .tgz files, tar also
supports bzip2 compression. This allows the creation of bzip2 compressed files, often named
.tar.bz2, .tar.bz or .tbz files.

256

To do so, we replace -z for gzip with -j for bzip2:
$ tar -cjvf name-of-archive.tar.bz stuff

To decompress the file, we replace -c with -x, where x stands for “extract”:
$ tar -xzvf archive.tar.gz

gzip is faster, but it generally compresses a bit less, so you get a somewhat larger file. bzip2 is
slower, but it compresses a bit more, so you get a somewhat smaller file. In general, though, gzip
and bzip2 are practically the same thing and both will work similarly.
Alternatively we may apply gzip or bzip2 compression using gzip command for gzip
compressions and the bzip command for bzip compressions. For example, to apply gzip
compression, use:
gzip FILE-TO-COMPRESS

gzip
creates the compressed file with the same name but with a .gz ending.
gzip
removes the original files after creating the compressed file.
The bzip2 command works in a similar fashion.
To uncompress the files we use either gunzip or bunzip2 depending on the algorithm used to
compressed a file.

The cpio Command
cpio stands for “copy in, copy out”. It is used to process archive files such as *.cpio or *.tar
files.
cpio performs the following operations:
- Copying files to an archive.
- Extracting files from an archive.
It takes the list of files from the standard input (mostly output from ls).

257

To create a cpio archive, we use:
$ ls | cpio -o > archive.cpio

The -o option instructs cpio to create an output. In this case, the output file created is
archive.cpio. The ls command lists the contents of the current directory which are to be
archived.
To extract the archive we use :
$ cpio -id < archive.cpio

The -i option is used to perform the extract. The -d option would create the destination folder.
The character < represents standard input. The input file to be extracted is archive.cpio.

The dd Command
dd copies data from one location to another. The command line syntax of dd differs from many
other Unix programs, it uses the syntax option=value for its command line options rather than
the GNU standard -option value or --option=value formats:
$ dd if=oldfile of=newfile

This command would copy the content of oldfile into newfile, where if= is the input file and
of= refers to the output file.

The dd command typically will not output anything to the screen until the
command has finished. By providing the status=progress option, the console
will display the amount of work getting done by the command. For example: dd
status=progress if=oldfile of=newfile.

dd is also used in changing data to upper/lower case or writing directly to block devices such as
/dev/sdb:
$ dd if=oldfile of=newfile conv=ucase

This would copy all the contents of oldfile into newfile and capitalise all of the text.
The following command will backup the whole hard disk located at /dev/sda to a file named

258

backup.dd:
$ dd if=/dev/sda of=backup.dd bs=4096

259

## 1. Consider the following listing:
$ find /home/frank/Documents/ -type d
/home/frank/Documents/
/home/frank/Documents/animal
/home/frank/Documents/animal/domestic
/home/frank/Documents/animal/wild

- What kind of files would this command output?

- In which directory does the search begin?

2. A user wishes to compress his backup folder. He uses the following command:
$ tar cvf /home/frank/backup.tar.gz /home/frank/dir1

Which option is lacking to compress the backup using the gzip algorithm?

260

## 1. As system administrator, it is required to perform regular checks in order to remove
voluminous files. These voluminous files are located in /var and end with a .backup
extension.
- Write down the command, using find, to locate these files:

- An analysis of the sizes of these files reveals that they range from 100M to 1000M. Complete
the previous command with this new information, so that you may locate those backup files
ranging from 100M to 1000M:

- Finally, complete this command, with the delete action so that these files will be removed:

## 2. In the /var directory, there exist four backup files:
db-jan-2018.backup
db-feb-2018.backup
db-march-2018.backup
db-apr-2018.backup

- Using tar, specify the command that would create an archive file with the name db-firstquarter-2018.backup.tar:

- Using tar, specify the command that would create the archive and compress it using gzip.
Take note that the resulting file name should end with .gz:

261

In this section, you learned:
- How to find files with find.
- How to add search criteria based on time, file type or size by supplying argument to find.
- How to act on a returned set.
- How to archive, compress and decompress files using tar.
- Processing archives with cpio.
- Copying files with dd.

262

## 1. Consider the following listing:
$ find /home/frank/Documents/ -type d
/home/frank/Documents/
/home/frank/Documents/animal
/home/frank/Documents/animal/domestic
/home/frank/Documents/animal/wild

- What kind of files would this command output?
Directories.
- In which directory does the search begins?
/home/frank/Documents
2. A user wishes to compress his backup folder. He uses the following command:
$ tar cvf /home/frank/backup.tar.gz /home/frank/dir1

Which option is lacking to compress the backup using the gzip algorithm?
Option -z.

263

## 1. As system administrator, it is required of you to perform regular checks in order to remove
voluminous files. These voluminous files are located in /var and end with a .backup
extension.
- Write down the command, using find, to locate these files:
$ find /var -name *.backup

- An analysis of the sizes of these files reveals that they range from 100M to 1000M. Complete
the previous command with this new information, so that you may locate those backup files
ranging from 100M to 1000M:
$ find /var -name *.backup -size +100M -size -1000M

- Finally, complete this command, with the delete action so that these files will be removed:
$ find /var -name *.backup -size +100M -size -1000M -delete

## 2. In the /var directory, there exist four backup files:
db-jan-2018.backup
db-feb-2018.backup
db-march-2018.backup
db-apr-2018.backup

- Using tar, specify the command that would create an archive file with the name db-firstquarter-2018.backup.tar:
$ tar -cvf db-first-quarter-2018.backup.tar db-jan-2018.backup db-feb-2018.backup dbmarch-2018.backup db-apr-2018.backup

- Using tar, specify the command that would create the archive and compress it using gzip.
Take note that the resulting file name should end with .gz:
$ tar -zcvf db-first-quarter-2018.backup.tar.gz db-jan-2018.backup db-feb-2018.backup

264

db-march-2018.backup db-apr-2018.backup

265

### 103.4 Use streams, pipes and redirects
LPIC-1 v5, Exam 101, Objective 103.4
- Redirecting standard input, standard output and standard error.
- Pipe the output of one command to the input of another command.
- Use the output of one command as arguments to another command.
- Send output to both stdout and a file.
- tee
- xargs

266

### 103.4 Lesson 1

LPIC-1 (101)

### 103.4 Use streams, pipes and redirects

All computer programs follow the same general principle: data received from some source is
transformed to generate an intelligible outcome. In Linux shell context, the data source can be a
local file, a remote file, a device (like a keyboard), etc. The program’s output is usually rendered
on a screen, but is also common to store the output data in a local filesystem, send it to a remote
device, play it through audio speakers, etc.
Operating systems inspired by Unix, like Linux, offer a great variety of input/output methods. In
particular, the method of file descriptors allows to dynamically associate integer numbers with
data channels, so that a process can reference them as its input/output data streams.
Standard Linux processes have three communication channels opened by default: the standard
input channel (most times simply called stdin), the standard output channel (stdout) and the
standard error channel (stderr). The numerical file descriptors assigned to these channels are 0 to
stdin, 1 to stdout and 2 to stderr. Communication channels are also accessible through the special
devices /dev/stdin, /dev/stdout and /dev/stderr.
These three standard communication channels allow programmers to write code that reads and

267

writes data without worrying about the kind of media it’s coming from or going to. For example, if
a program needs a set of data as its input, it can just ask for data from the standard input and
whatever is being used as the standard input will provide that data. Likewise, the simplest method
a program can use to display its output is to write it in the standard output. In a standard shell
session, the keyboard is defined as the stdin and the monitor screen is defined as the stdout and
stderr.
The Bash shell has the ability to reassign the communication channels when loading a program. It
allows, for example, to override the screen as the standard output and use a file in the local
filesystem as stdout.

Redirects
The reassignment of a channel’s file descriptor in the shell environment is called a redirect. A
redirect is defined by a special character within the command line. For example, to redirect the
standard output of a process to a file, the greater than symbol > is positioned at the end of the
command and followed by the path to the file that will receive the redirected output:
$ cat /proc/cpuinfo >/tmp/cpu.txt

By default, only the content coming to stdout is redirected. That happens because the numerical
value of the file descriptor should be specified just before the greater than symbol and, when not
specified, Bash redirects the standard output. Therefore, using > is equivalent to use 1> (the value
of stdout’s file descriptor is 1).
To capture the content of stderr, the redirect 2> should be used instead. Most command-line
programs send debug information and error messages to the standard error channel. It is
possible, for example, to capture the error message triggered by an attempt to read a non-existent
file:
$ cat /proc/cpu_info 2>/tmp/error.txt
$ cat /tmp/error.txt

Both stdout and stderr are redirected to the same target with &> or >&. It’s important to not place
any spaces beside the ampersand, otherwise Bash will take it as the instruction to run the process
in background and not to perform the redirect.
The target must be a path to a writable file, like /tmp/cpu.txt, or a writable file descriptor. A file
descriptor target is represented by an ampersand followed by the file descriptor’s numerical

268

value. For example, 1>&2 redirects stdout to stderr. To do the opposite, stderr to stdout, 2>&1
should be used instead.
Although not very useful, given that there is a shorter way to do the same task, it is possible to
redirect stderr to stdout and then redirect it to a file. For example, a redirect to write both stderr
and stdout to a file named log.txt can be written as >log.txt 2>&1. However, the main reason
for redirecting stderr to stdout is to allow parsing of debug and error messages. It is possible to
redirect the standard output of a program to the standard input of another program, but it is not
possible to directly redirect the standard error to the standard input of another program. Thus,
program’s messages sent to stderr first need to be redirected to stdout in order to be read by
another program’s stdin.
To just discard the output of a command, its content can be redirected to the special file
/dev/null. For example, >log.txt 2>/dev/null saves the contents of stdout in the file
log.txt and discards the stderr. The file /dev/null is writable by any user but no data can be
recovered from it, as it is not stored anywhere.
An error message is presented if the specified target is not writable (if the path points to a
directory or a read-only file) and no modification to the target is made. However, an output
redirect overwrites an existing writable target without any confirmation. Files are overwritten by
output redirects unless Bash option noclobber is enabled, which can be done for the current
session with the command set -o noclobber or set -C:
$ set -o noclobber
$ cat /proc/cpu_info 2>/tmp/error.txt
-bash: /tmp/error.txt: cannot overwrite existing file

To unset the noclobber option for the current session, run set +o noclobber or set +C. To
make the noclobber option persistent, it must be included in the user’s Bash profile or in the
system-wide profile.
Even with the noclobber option enabled it is possible to append redirected data to existent
content. This is accomplished with a redirection written with two greater than symbols >>:
$ cat /proc/cpu_info 2>>/tmp/error.txt
$ cat /tmp/error.txt

In the previous example, the new error message was appended to the existing one in file

269

/tmp/error.txt. If the file does not exist yet, it will be created with the new data.
The data source of the standard input of a process can be reassigned as well. The less than symbol
< is used to redirect the content of a file to the stdin of a process. In this case, data flows from right
to left: the reassigned descriptor is assumed to be 0 at the left of the less than symbol and the data
source (a path to a file) must be at the right of the less than symbol. The command uniq, like most
command line utilities for processing text, accepts data sent to stdin by default:
$ uniq -c </tmp/error.txt
2 cat: /proc/cpu_info: No such file or directory

The -c option makes uniq display how many times a repeated line appears in the text. As the
numeric value of the redirected file descriptor was suppressed, the example command is
equivalent to uniq -c 0</tmp/error.txt. To use a file descriptor other than 0 in an input
redirect only makes sense in specific contexts, because it is possible for a program to ask for data
at file descriptors 3, 4, etc. Indeed, programs can use any integer above 2 as new file descriptors
for data input/output. For example, the following C code reads data from file descriptor 3 and just
replicates it to file descriptor 4:

The program must handle such file descriptors correctly, otherwise it could
attempt an invalid read or write operation and crash.

#include <stdio.h>
int main(int argc, char **argv){
FILE *fd_3, *fd_4;
// Open file descriptor 3
fd_3 = fdopen(3, "r");
// Open file descriptor 4
fd_4 = fdopen(4, "w");
// Read from file descriptor 3
char buf[32];
while ( fgets(buf, 32, fd_3) != NULL ){
// Write to file descriptor 4
fprintf(fd_4, "%s", buf);
// Close both file descriptors
fclose(fd_3);
fclose(fd_4);

270

To test it, save the sample code as fd.c and compile it with gcc -o fd fd.c. This program needs
file descriptors 3 and 4 to be available so it can read and write to them. As an example, the
previously created file /tmp/error.txt can be used as the source for file descriptor 3 and the file
descriptor 4 can be redirected to stdout:
$ ./fd 3</tmp/error.txt 4>&1

From a programmer’s perspective, using file descriptors avoids having to deal with option parsing
and filesystem paths. The same file descriptor can even be used as input and output. In this case,
the file descriptor is defined in the command line with both less than and greater than symbols,
like in 3<>/tmp/error.txt.

Here Document and Here String
Another way to redirect input involve the Here document and Here string methods. The Here
document redirect allows to type multi-line text that will be used as the redirected content. Two
less than symbols << indicate a Here document redirect:
$ wc -c <<EOF
> How many characters
> in this Here document?
> EOF
43

At the right of the two less than symbols << is the ending term EOF. The insertion mode will finish
as soon as a line containing only the ending term is entered. Any other term can be used as the
ending term, but it is important to not put blank characters between the less than symbol and the
ending term. In the example above, the two lines of text were sent to the stdin of wc -c command,
which displays the characters count. As with input redirects for files, the stdin (file descriptor 0) is
assumed if the redirected file descriptor is suppressed.
The Here string method is much like the Here document method, but for one line only:
$ wc -c <<<"How many characters in this Here string?"
41

In this example, the string at the right of the three less than signs is sent to the stdin of wc -c,

271

which counts the number of characters. Strings containing spaces must be inside quotes,
otherwise only the first word will be used as the Here string and the remaining ones will be
passed as arguments to the command.

272

## 1. In addition to text files, the command cat can also work with binary data, like sending the
contents of a block device to a file. Using redirection, how can cat send the contents of device
/dev/sdc to the file sdc.img in the current directory?

2. What’s the name of the standard channel redirected by the command date 1> now.txt?

## 3. After trying to overwrite a file using redirection, a user gets an error informing that option
noclobber is enabled. How can the option noclobber be deactivated for the current session?

## 4. What will be the result of command cat <<.>/dev/stdout?

273

## 1. The command cat /proc/cpu_info displays an error message because /proc/cpu_info is
nonexistent. The command cat /proc/cpu_info 2>1 redirects the error message to where?

## 2. Will it still be possible to discard content sent to /dev/null if the noclobber option is enabled
for the current shell session?

## 3. Without using echo, how could the contents of the variable $USER be redirected to the stdin of
command sha1sum?

## 4. The Linux kernel keeps symbolic links in /proc/PID/fd/ to every file opened by a process,
where PID is the identification number of the corresponding process. How could the system
administrator use that directory to verify the location of log files opened by nginx, supposing
its PID is 1234?

## 5. It’s possible to do arithmetic calculations using only shell builtin commands, but floating point
calculations require specific programs, like bc (basic calculator). With bc it’s even possible to
specify the number of decimal places, with parameter scale. However, bc accepts operations
only through its standard input, usually entered in interactive mode. Using a Here string, how
can the floating point operation scale=6; 1/3 be sent to the standard input of bc?

274

This lesson covers methods to run a program redirecting its standard communication channels.
Linux processes use these standard channels as generic file descriptors to read and to write data,
making it possible to arbitrarily change them to files or devices. The lesson goes through the
following steps:
- What file descriptors are and the role they play in Linux.
- The standard communication channels of every process: stdin, stdout and stderr.
- How to correctly execute a command using data redirection, both for input and output.
- How to use Here Documents and Here Strings in input redirections.
- Redirection operators: >, <, >>, <<, <<<.
- Commands cat, set, uniq and wc.

275

## 1. In addition to text files, the command cat can also work with binary data, like sending the
contents of a block device to a file. Using redirection, how can cat send the contents of device
/dev/sdc to the file sdc.img in the current directory?
$ cat /dev/sdc > sdc.img

2. What’s the name of the standard channel redirected by the command date 1> now.txt?
Standard output or stdout
3. After trying to overwrite a file using redirection, a user gets an error informing that the option
noclobber is enabled. How can the option noclobber be deactivated for the current session?
set +C or set +o noclobber
4. What will be the result of command cat <<.>/dev/stdout?
Bash will enter Heredoc input mode, then exit when a period appears in a line by itself. The
typed text will be redirected to stdout (printed on screen).

276

## 1. The command cat /proc/cpu_info displays an error message because /proc/cpu_info is
nonexistent. The command cat /proc/cpu_info 2>1 redirects the error message to where?
To a file named 1 in the current directory.
2. Will it still be possible to discard content sent to /dev/null if the noclobber option is enabled
for the current shell session?
Yes. /dev/null is a special file not affected by noclobber.
3. Without using echo, how can the contents of the variable $USER be redirected to the stdin of
command sha1sum?
$ sha1sum <<<$USER

## 4. The Linux kernel keeps symbolic links in /proc/PID/fd/ to every file opened by a process,
where PID is the identification number of the corresponding process. How could the system
administrator use that directory to verify the location of log files opened by nginx, supposing
its PID is 1234?
By issuing the command ls -l /proc/1234/fd, which will display the targets of every
symbolic link in the directory.
5. It’s possible to do arithmetic calculations using only shell builtin commands, but floating point
calculations require specific programs, like bc (basic calculator). With bc it’s even possible to
specify the number of decimal places, with parameter scale. However, bc accepts operations
only through its standard input, usually entered in interactive mode. Using a Here string, how
could the floating point operation scale=6; 1/3 be sent to the standard input of bc?
$ bc <<<"scale=6; 1/3"

277

### 103.4 Lesson 2

LPIC-1 (101)

### 103.4 Use streams, pipes and redirects

One aspect of the Unix philosophy states that each program should have a specific purpose and
should not try to incorporate features outside its scope. But keeping things simple does not mean
less elaborated results, because different programs can be chained together to produce a
combined output. The vertical bar character |, also known as the pipe symbol, can be used to
create a pipeline connecting the output of a program directly into the input of another program,
whereas command substitution allows to store the output of a program in a variable or use it
directly as an argument to another command.

Pipes
Unlike redirects, with pipes data flows from left to right in the command line and the target is
another process, not a filesystem path, file descriptor or Here document. The pipe character | tells
the shell to start all distinct commands at the same time and to connect the output of the previous
command to the input of the following command, left to right. For example, instead of using
redirects, the content of the file /proc/cpuinfo sent to the standard output by cat can be piped
to the stdin of wc with the following command:

278

$ cat /proc/cpuinfo | wc
208

1184

6096

In the absence of a path to a file, wc counts the number of lines, words and characters it receives
on its stdin, as is the case in the example. Many pipes can be present in a compound command. In
the following example, two pipes are used:
$ cat /proc/cpuinfo | grep 'model name' | uniq

The content of file /proc/cpuinfo produced by cat /proc/cpuinfo was piped to the command
grep 'model name', which then selects only the lines containing the term model name. The
machine running the example has many CPUs, so there are repeated lines with model name. The
last pipe connects grep 'model name' to uniq, which is responsible for skipping any line equal
to the previous one.
Pipes can be combined with redirects in the same command line. The previous example can be
rewritten to a simpler form:
$ grep 'model name' </proc/cpuinfo | uniq

The input redirect for grep is not strictly necessary as grep accepts a file path as argument, but
the example demonstrates how to build such combined commands.
Pipes and redirects are exclusive, that is, one source can be mapped to only one target. Yet, it is
possible to redirect an output to a file and still see it on the screen with program tee. To do it, the
first program sends its output to the stdin of tee and a file name is provided to the latter to store
the data:
$ grep 'model name' </proc/cpuinfo | uniq | tee cpu_model.txt

$ cat cpu_model.txt

The output of the last program in the chain, generated by uniq, is displayed and stored in the file
cpu_model.txt. To not overwrite the content of the provided file but to append data to it, the
option -a must be provided to tee.

279

Only the standard output of a process is captured by a pipe. Let’s say you must to go through a
long compilation process on the screen and at the same time save both the standard output and
the standard error to a file for later inspection. Assuming your current directory does not have a
Makefile, the following command will output an error:
$ make | tee log.txt
make: *** No targets specified and no makefile found.

Stop.

Although shown on the screen, the error message generated by make was not captured by tee and
the file log.txt was created empty. A redirect needs to be done before a pipe can capture the
stderr:
$ make 2>&1 | tee log.txt
make: *** No targets specified and no makefile found.

Stop.

$ cat log.txt
make: *** No targets specified and no makefile found.

Stop.

In this example the stderr of make was redirected to the stdout, so tee was able to capture it with
a pipe, display it on the screen and save it in the file log.txt. In cases like this, it may be useful to
save the error messages for later inspection.

Command Substitution
Another method to capture the output of a command is command substitution. By placing a
command inside backquotes, Bash replaces it with its standard output. The following example
shows how to use the stdout of a program as an argument to another program:
$ mkdir `date +%Y-%m-%d`
2019-09-05

The output of the program date, the current date formatted as year-month-day, was used as an
argument to create a directory with mkdir. An identical result is obtained by using $() instead of
backquotes:
$ rmdir 2019-09-05
$ mkdir $(date +%Y-%m-%d)

280

2019-09-05

The same method can be used to store the output of a command as a variable:
$ OS=`uname -o`
$ echo $OS
GNU/Linux

The command uname -o outputs the generic name of the current operating system, which was
stored in the session variable OS. To assign the output of a command to a variable is very useful in
scripts, making it possible to store and evaluate the data in many distinct ways.
Depending on the output generated by the replaced command, the builtin command substitution
may not be appropriate. A more sophisticated method to use the output of a program as the
argument of another program employs an intermediate called xargs. The program xargs uses
the contents it receives via stdin to run a given command with the contents as its argument. The
following example shows xargs running the program identify with arguments provided by
program find:
$ find /usr/share/icons -name 'debian*' | xargs identify -format "%f: %wx%h\n"
debian-swirl.svg: 48x48
debian-swirl.png: 22x22
debian-swirl.png: 32x32
debian-swirl.png: 256x256
debian-swirl.png: 48x48
debian-swirl.png: 16x16
debian-swirl.png: 24x24
debian-swirl.svg: 48x48

The program identify is part of ImageMagick, a set of command-line tools to inspect, convert
and edit most image file types. In the example, xargs took all paths listed by find and put them
as arguments to identify, which then shows the information for each file formatted as required
by the option -format. The files found by find in the example are images containing the
distribution logo in a Debian filesystem. -format is a parameter to identify, not to xargs.
Option -n 1 requires xargs to run the given command with only one argument at a time. In the
example’s case, instead of passing all paths found by find as a list of arguments to identify,
using xargs -n 1 would execute command identify for each path separately. Using -n 2
would execute identify with two paths as arguments, -n 3 with three paths as arguments and
so on. Similarly, when xargs process multiline contents — as is the case with input provided by

281

find — the option -L can be used to limit how many lines will be used as arguments per
command execution.

Using xargs with option -n 1 or -L 1 to process output generated by find may be
unnecessary. Command find has the option -exec to run a given command for
each search result item.

If the paths have space characters, it is important to run find with the option -print0. This
option instructs find to use a null character between each entry so the list can be correctly parsed
by xargs (the output was suppressed):
$ find . -name '*avi' -print0 -o -name '*mp4' -print0 -o -name '*mkv' -print0 | xargs -0 du
| sort -n

The option -0 tells xargs the null character should be used as the separator. That way the file
paths given by find are correctly parsed even if they have blank or other special characters in it.
The previous example shows how to use the command du to find out the disk usage of every file
found and then sort the results by size. The output was suppressed for conciseness. Note that for
each search criteria it is necessary to place the -print0 option for find.
By default, xargs places the arguments of the executed command last. To change that behavior,
the option -I should be used:
$ find . -mindepth 2 -name '*avi' -print0 -o -name '*mp4' -print0 -o -name '*mkv' -print0 |
xargs -0 -I PATH mv PATH ./

In the last example, every file found by find is moved to the current directory. As the source
path(s) must be informed to mv before the target path, a substitution term is given to the option -I
of xargs which is then appropriately placed alongside mv. By using the null character as
separator, it is not necessary to enclose the substitution term with quotes.

282

## 1. It’s convenient to save the execution date of actions performed by automated scripts. Command
date +%Y-%m-%d shows the current date in year-month-day format. How can the output of
such a command be stored in a shell variable called TODAY using command substitution?

## 2. Using command echo, how can the contents of variable TODAY be sent to the standard input of
command sed s/-/./g?

## 3. How could the output of command date +%Y-%m-%d be used as a Here string to command sed
s/-/./g?

## 4. Command convert image.jpeg -resize 25% small/image.jpeg creates a smaller
version of image.jpeg and places the resulting image in a likewise named file inside
subdirectory small. Using xargs, how is it possible to perform the same command for every
image listed in file filelist.txt?

283

1. A simple backup routine periodically creates an image of partition /dev/sda1 with dd <
/dev/sda1 > sda1.img. To perform future data integrity checks, the routine also generates a
SHA1 hash of the file with sha1sum < sda1.img > sda1.sha1. By adding pipes and
command tee, how would these two commands be combined into one?

2. Command tar is used to archive many files into a single file, preserving directory structure.
Option -T allows to specify a file containing the paths to be archived. For example, find /etc
-type f | tar -cJ -f /srv/backup/etc.tar.xz -T - creates a compressed tar file
etc.tar.xz from the list provided by command find (option -T - indicates the standard
input as the path list). In order to avoid possible parsing errors due to paths containing spaces,
what command options should be present for find and tar?

## 3. Instead of opening a new remote shell session, command ssh can just execute a command
indicated as its argument: ssh user@storage "remote command". Given that ssh also allows
to redirect the standard output of a local program to the standard input of the remote program,
how would the cat command pipe a local file named etc.tar.gz to
/srv/backup/etc.tar.gz at user@storage through ssh?

284

This lesson covers traditional inter-process communication techniques employed by Linux.
Command pipelining creates a one way communication channel between two process and
command substitution allows to store the output of a process in a shell variable. The lesson goes
through the following steps:
- How pipes can be used to stream the output of a process to the input of another process.
- The purpose of commands tee and xargs.
- How to capture the output of a process with command substitution, storing it in a variable or
using it directly as a parameter to another command.
- Command pipelining with |.
- Command substitution with backticks and $().
- Commands tee, xargs and find.

285
