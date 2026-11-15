---
id: linux-05
track: linux-engineer
title: "Archiving Files and Searching and Extracting Data"
slug: 05-archiving-and-searching-data
source: "LPI Learning Material 010-160"
sourceSection: "3.1, 3.2"
topic: "3"
tags: [linux, lpic-1, archiving, grep, pipes]
summary: "Compress, archive and unzip data, then redirect and pipe command output and search files with grep and regular expressions."
---
# The Power of the Command Line

## 3.1 Archiving Files on the Command Line

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 3.1
**Weight:** 2
**Key knowledge areas**
- Files, directories
- Archives, compression
**Partial list of the used files, terms and utilities**
- tar
- Common tar options
- gzip, bzip2, xz
- zip, unzip

### 3.1 Lesson 1

#### Introduction

Compression is used to reduce the amount of space a specific set of data consumes. Compression is commonly used for reducing the amount of space that is needed to store a file. Another common use is to reduce the amount of data sent over a network connection. Compression works by replacing repetitive patterns in data. Suppose you have a novel. Some words are extremely common but have multiple characters, such as the word “the”. You could reduce the size of the novel significantly if you were to replace these common multi character words and patterns with single character replacements. E.g., replace “the” with a greek letter that is not used elsewhere in the text. Data compression algorithms are similar to this but more complex. Compression comes in two varieties, lossless and lossy. Things compressed with a lossless algorithm can be decompressed back into their original form. Data compressed with a lossy algorithm cannot be recovered. Lossy algorithms are often used for images, video, and audio where the quality loss is imperceptible to humans, irrelevant to the context, or the loss is worth the saved space or network throughput.
Archiving tools are used to bundle up files and directories into a single file. Some common uses are backups, bundling software source code, and data retention. Archive and compression are commonly used together. Some archiving tools even compress their contents by default. Others can optionally compress their contents. A few archive tools must be used in conjunction with stand-alone compression tools if you wish to compress the contents. The most common tool for archiving files on Linux systems is tar. Most Linux distributions ship with the GNU version of tar, so it is the one that will be covered in this lesson. tar on its own only manages the archiving of files but does not compress them. There are lots of compression tools available on Linux. Some common lossless ones are bzip2, gzip, and xz. You will find all three on most systems. You may encounter an old or very minimal system where xz or bzip is not installed. If you become a regular Linux user, you will likely encounter files compressed with all three of these. All three of them use different algorithms, so a file compressed with one tool can’t be decompressed by another. Compression tools have a trade off. If you want a high compression ratio, it will take longer to compress and decompress the file. This is because higher compression requires more work finding more complex patterns. All of these tools compress data but can not create archives containing multiple files. Stand-alone compression tools aren’t typically available on Windows systems. Windows archiving and compression tools are usually bundled together. Keep this in mind if you have Linux and Windows systems that need to share files. Linux systems also have tools for handling .zip files commonly used on Windows system. They are called zip and unzip. These tools are not installed by default on all systems, so if you need to use them you may have to install them. Fortunately, they are typically found in distributions' package repositories.
#### Compression Tools

How much disk space is saved by compressing files depends on a few factors. The nature of the data you are compressing, the algorithm used to compress the data, and the compression level. Not all algorithms support different compression levels. Let’s start with setting up some test files to compress:
```console
$ mkdir ~/linux_essentials-3.1
$ cd ~/linux_essentials-3.1
$ mkdir compression archiving
$ cd compression

$ cat /etc/* > bigfile 2> /dev/null
```
Now we create three copies of this file:
```console
$ cp bigfile bigfile2
$ cp bigfile bigfile3
$ cp bigfile bigfile4
$ ls -lh
total 2.8M
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile2
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile3
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile4
```
Now we are going to compress the files with each aforementioned compression tool:
```console
$ bzip2 bigfile2
$ gzip bigfile3
$ xz bigfile4
$ ls -lh
total 1.2M
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile
-rw-r--r-- 1 emma emma 170K Jun 23 08:08 bigfile2.bz2
-rw-r--r-- 1 emma emma 179K Jun 23 08:08 bigfile3.gz
-rw-r--r-- 1 emma emma 144K Jun 23 08:08 bigfile4.xz
```
Compare the sizes of the compressed files to the uncompressed file named bigfile. Also notice how the compression tools added extensions to the file names and removed the uncompressed files. Use bunzip2, gunzip, or unxz to decompress the files:
```console
$ bunzip2 bigfile2.bz2
$ gunzip bigfile3.gz
$ unxz bigfile4.xz
$ ls -lh
total 2.8M
-rw-r--r-- 1 emma emma 712K Jun 23 08:20 bigfile
-rw-r--r-- 1 emma emma 712K Jun 23 08:20 bigfile2
-rw-r--r-- 1 emma emma 712K Jun 23 08:20 bigfile3

-rw-r--r-- 1 emma emma 712K Jun 23 08:20 bigfile4
```
Notice again that now the compressed file is deleted once it is decompressed. Some compression tools support different compression levels. A higher compression level usually requires more memory and CPU cycles, but results in a smaller compressed file. The opposite is true for a lower level. Below is a demonstration with xz and gzip:
```console
$ cp bigfile bigfile-gz1
$ cp bigfile bigfile-gz9
$ gzip -1 bigfile-gz1
$ gzip -9 bigfile-gz9
$ cp bigfile bigfile-xz1
$ cp bigfile bigfile-xz9
$ xz -1 bigfile bigfile-xz1
$ xz -9 bigfile bigfile-xz9
$ ls -lh bigfile bigfile-* *
total 3.5M
-rw-r--r-- 1 emma emma 712K Jun 23 08:08 bigfile
-rw-r--r-- 1 emma emma 205K Jun 23 13:14 bigfile-gz1.gz
-rw-r--r-- 1 emma emma 178K Jun 23 13:14 bigfile-gz9.gz
-rw-r--r-- 1 emma emma 156K Jun 23 08:08 bigfile-xz1.xz
-rw-r--r-- 1 emma emma 143K Jun 23 08:08 bigfile-xz9.xz
```
It is not necessary to decompress a file every time you use it. Compression tools typically come with special versions of common tools used to read text files. For example, gzip has a version of cat, grep, diff, less, more, and a few others. For gzip, the tools are prefixed with a z, while the prefix bz exists for bzip2 and xz exists for xz. Below is an example of using zcat to read display a file compressed with gzip:
```console
$ cp /etc/hosts ./
$ gzip hosts
$ zcat hosts.gz
127.0.0.1

localhost

# The following lines are desirable for IPv6 capable hosts
::1

localhost ip6-localhost ip6-loopback

ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```
#### Archiving Tools

The tar program is probably the most widely used archiving tool on Linux systems. In case you are wondering why it is named how it is, it as an abbreviation for “tape archive”. Files created with tar are often called tar balls. It is very common for applications distributed as source code to be in tar balls. The GNU version of tar that Linux distributions ship with has a lot of options. This lesson is going to cover the most commonly used subset. Let’s start off by creating an archive of the files used for compression:
```console
$ cd ~/linux_essentials-3.1
$ tar cf archiving/3.1.tar compression
```
The c option instructs tar to create a new archive file and the f option is the name of the file to create. The argument immediately following the options is always going to be the name of the file to work on. The rest of the arguments are the paths to any files or directories you wish to add to, list, or extract from the file. In the example, we are adding the directory compression and all of its contents to the archive. To view the contents of a tar ball, use the t option of tar:
```console
$ tar -tf 3.1.tar
compression/
compression/bigfile-xz1.xz
compression/bigfile-gz9.gz
compression/hosts.gz
compression/bigfile2
compression/bigfile
compression/bigfile-gz1.gz
compression/bigfile-xz9.xz
compression/bigfile3
compression/bigfile4
```
Notice how the options are preceded with -. Unlike most programs, with tar, the - isn’t required when specifying options, although it doesn’t cause any harm if it is used.
**NOTE**
You can use the -v option to let tar output the names of files it operates on when creating or extracting an archive. Now let’s extract the file:
```console
$ cd ~/linux_essentials-3.1/archiving
$ ls
3.1.tar
$ tar xf 3.1.tar
$ ls
3.1.tar

compression
```
Suppose you only need one file out of the archive. If this is the case, you can specify it after the archive’s file name. You can specify multiple files if necessary:
```console
$ cd ~/linux_essentials-3.1/archiving
$ rm -rf compression
$ ls
3.1.tar
$ tar xvf 3.1.tar compression/hosts.gz
compression/
compression/bigfile-xz1.xz
compression/bigfile-gz9.gz
compression/hosts.gz
compression/bigfile2
compression/bigfile
compression/bigfile-gz1.gz
compression/bigfile-xz9.xz
compression/bigfile3
compression/bigfile4
$ ls
3.1.tar

compression

$ ls compression
hosts.gz
```
With the exception of absolute paths (paths beginning with /), tar files preserve the entire path to files when they are created. Since the file 3.1.tar was created with a single directory, that directory will be created relative to your current working directory when extracted. Another example should clarify this:
```console
$ cd ~/linux_essentials-3.1/archiving
$ rm -rf compression
$ cd ../compression
$ tar cf ../tar/3.1-nodir.tar *

$ cd ../archiving
$ mkdir untar
$ cd untar
$ tar -xf ../3.1-nodir.tar
$ ls
bigfile

bigfile3

bigfile-gz1.gz

bigfile-xz1.xz

bigfile2

bigfile4

bigfile-gz9.gz

bigfile-xz9.xz
```
**TIP**
hosts.gz
If you wish to use the absolute path in a tar file, you must use the P option. Be aware that this may overwrite important files and might cause errors on your system.
The tar program can also manage compression and decompression of archives on the fly. tar does so by calling one of the compression tools discussed earlier in this section. It is as simple as adding the option appropriate to the compression algorithm. The most commonly used ones are j, J, and z for bzip2, xz, and gzip, respectively. Below are examples using the aforementioned algorithms:
```console
$ cd ~/linux_essentials-3.1/compression
$ ls
bigfile

bigfile3

bigfile-gz1.gz

bigfile-xz1.xz

bigfile2

bigfile4

bigfile-gz9.gz

bigfile-xz9.xz

hosts.gz

$ tar -czf gzip.tar.gz bigfile bigfile2 bigfile3
$ tar -cjf bzip2.tar.bz2 bigfile bigfile2 bigfile3
$ tar -cJf xz.tar.xz bigfile bigfile2 bigfile3
$ ls -l | grep tar
-rw-r--r-- 1 emma emma

450202 Jun 27 05:56 bzip2.tar.bz2

-rw-r--r-- 1 emma emma

548656 Jun 27 05:55 gzip.tar.gz

-rw-r--r-- 1 emma emma

147068 Jun 27 05:56 xz.tar.xz
```
Notice how in the example the .tar files have different sizes. This shows that they were successfully compressed. If you create compressed .tar archives, you should always add a second file extension denoting the algorithm you used. They are .xz, .bz, and .gz for xz, bzip2, and gzip, respectively. Sometimes shortened extensions such as .tgz are used. It is possible to add files to already existing uncompressed tar archives. Use the u option to do this. If you attempt to add to a compressed archive, you will get an error.
```console
$ cd ~/linux_essentials-3.1/compression
$ ls
bigfile

bigfile3

bigfile-gz1.gz

bigfile-xz1.xz

bzip2.tar.bz2

hosts.gz

bigfile2

bigfile4

bigfile-gz9.gz

bigfile-xz9.xz

gzip.tar.gz

xz.tar.xz

$ tar cf plain.tar bigfile bigfile2 bigfile3
$ tar tf plain.tar
bigfile
bigfile2
bigfile3
$ tar uf plain.tar bigfile4
$ tar tf plain.tar
bigfile
bigfile2
bigfile3
bigfile4
$ tar uzf gzip.tar.gz bigfile4
tar: Cannot update compressed archives
```
Try 'tar --help' or 'tar --usage' for more information.
#### Managing ZIP files

Windows machines often don’t have applications to handle tar balls or many of the compression tools commonly found on Linux systems. If you need to interact with Windows systems, you can use ZIP files. A ZIP file is an archive file similar to a compressed tar file. The zip and unzip programs can be used to work with ZIP files on Linux systems. The example below should be all you need to get started using them. First we create a set of files:
```console
$ cd ~/linux_essentials-3.1
$ mkdir zip
$ cd zip/
$ mkdir dir
$ touch dir/file1 dir/file2
```
Now we use zip to pack these files into a ZIP file:
```console
$ zip -r zipfile.zip dir
adding: dir/ (stored 0%)
adding: dir/file1 (stored 0%)
adding: dir/file2 (stored 0%)
$ rm -rf dir

Finally, we unpack the ZIP file again:

$ ls
zipfile.zip
$ unzip zipfile.zip
```
Archive:
zipfile.zip
**creating: dir/**
extracting: dir/file1 extracting: dir/file2
```console
$ find
.
./zipfile.zip
./dir
./dir/file1
./dir/file2
```
When adding directories to ZIP files, the -r option causes zip to include a directory’s contents. Without it, you would have an empty directory in the ZIP file.
#### Guided Exercises

1. According to the extensions, which of the following tools were used to create these files? Filename
```console
tar
```
```console
gzip
```
```console
bzip2
```
```console
xz
```
**archive.tar**
archive.tgz archive.tar.xz
1. According to the extensions, which of these files are archives and which are compressed? Filename
Archive
Compressed
**file.tar**
file.tar.bz2 file.zip file.xz
1. How would you add a file to a gzip compressed tar file?
2. Which tar option instructs tar to include the leading / in absolute paths?
3. Does zip support different compression levels?
#### Explorational Exercises

1. When extracting files, does tar support globs in the file list?
2. How can you make sure a decompressed file is identical to the file before it was compressed?
3. What happens if you try to extract a file from a tar archive that already exists on your filesystem?
4. How would you extract the file archive.tgz without using the tar z option?
#### Summary

Linux systems have several compression and archiving tools available. This lesson covered the most common ones. The most common archiving tool is tar. If interacting with Windows systems is necessary, zip and unzip can create and extract ZIP files. The tar command has a few options that are worth memorizing. They are x for extract, c for create, t for view contents, and u to add or replace files. The v option lists the files which are processed by tar while creating or extracting an archive. The typical Linux distribution’s repository has many compression tools. The most common are gzip, bzip2, and xz. Compression algorithms often support different levels that allow you to optimize for speed or file size. Files can be decompressed with gunzip, bunzip2, and unxz. Compression tools commonly have programs that behave like common text file tools, with the difference being they work on compressed files. A few of them are zcat, bzcat, and xzcat. Compression tools typically ship with programs with the functionality of grep, more, less, diff, and cmp. Commands used in the exercises:
**bunzip2**
Decompress a bzip2 compressed file.
**bzcat**
Output the contents of a bzip compressed file.
**bzip2**
Compress files using the bzip2 algorithm and format.
**gunzip**
Decompress a gzip compressed file.
**gzip**
Compress files using the gzip algorithm and format.
**tar**
Create, update, list and extract tar archives.
**unxz**
Decompress a xz compressed file.
**unzip**
Decompress and extract content from a ZIP file. xz Compress files using the xz algorithm and format.
**zcat**
Output the contents of a gzip compressed file.
**zip**
Create and compress ZIP archives.

### Answers

#### Guided Exercises

1. According to the extensions, which of the following tools were used to create these files? Filename
```console
tar
```
archive.tar
X
archive.tgz
X
```console
gzip
```
```console
bzip2
```
```console
xz
```
X
archive.tar.xz X
X
1. According to the extensions, which of these files are archives and which are compressed? Filename
Archive
Compressed
```console
file.tar
```
X
```console
file.tar.bz2
```
X
X
```console
file.zip
```
X
X
```console
file.xz
```
X
1. How would you add a file to a gzip compressed tar file? You would decompress the file with gunzip, add the file with tar uf, and then compress it with gzip
2. Which tar option instructs tar to include the leading / in absolute paths? The -P option. From the man page: -P, --absolute-names Don't strip leading slashes from file names when creating
archives
1. Does zip support different compression levels? Yes. You would use -#, replacing # with a number from 0-9. From the man page: -# (-0, -1, -2, -3, -4, -5, -6, -7, -8, -9) Regulate the speed of compression using the specified where
-0
indicates
digit
#,
no compression (store all files), -1 indi‐
cates the fastest compression speed (less
compression)
and
-9
indicates
the
slowest
compression speed (optimal compression,
ignores the suffix list). The default compression level is -6. Though still being worked, the intention is control
compression
speed
for
this
setting
will
all compression methods.
Cur‐
rently only deflation is controlled.

#### Explorational Exercises

1. When extracting files, does tar support globs in the file list? Yes, you would use the --wildcards option. --wildcards must be placed right after the tar file when using the no dash style of options. For example: $ tar xf tarfile.tar --wildcards dir/file* $ tar --wildcards -xf tarfile.tar dir/file*
2. How can you make sure a decompressed file is identical to the file before it was compressed? You don’t need to do anything with the tools covered in this lesson. All three of them include checksums in their file format that is verified when they are decompressed.
3. What happens if you try to extract a file from a tar archive that already exists on your filesystem? The file on your filesystem is overwritten with the version that is in the tar file.
4. How would you extract the file archive.tgz without using the tar z option? You would decompress it with gunzip first. $ gunzip archive.tgz $ tar xf archive.tar

## 3.2 Searching and Extracting Data from Files

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 3.2
**Weight:** 3

### 3.2 Lesson 1

#### Introduction

In this lab we will be focusing on redirecting or transmitting information from one source to another with the help of specific tools. The Linux command line redirects the information through specific standard channels. The standard input (stdin or channel 0) of the command is considered to be the keyboard and the standard output (stdout or channel 1) is considered the screen. There is also another channel that is meant to redirect error output (stderr or channel 2) of a command or a program’s error messages. The input and/or output can be redirected. When running a command, sometimes we want to transmit certain information to the command or redirect the output to a specific file. Each of these functionalities will be discussed in the next two sections.
#### I/O Redirection

I/O redirection enables the user to redirect information from or to a command by using a text file. As described earlier, the standard input, output and error output can be redirected, and the information can be taken from text files.
**Redirecting Standard Output**
To redirect standard output to a file, instead of the screen, we need to use the > operator followed by the name of the file. If the file doesn’t exist, a new one will be created, otherwise, the information will overwrite the existing file. In order to see the contents of the file that we just created, we can use the cat command. By default, this command displays the contents of a file on the screen. Consult the manual page to find out more about its functionalities. The example below demonstrates the functionality of the operator. In the first instance, a new file is created containing the text “Hello World!”:
```console
$ echo "Hello World!" > text
$ cat text
Hello World!
```
In the second invocation, the same file is overwritten with the new text:
```console
$ echo "Hello!" > text
$ cat text
Hello!
```
If we want to add new information at the end of the file, we need to use the >> operator. This operator also creates a new file if it cannot find an existing one. The first example shows the addition of the text. As it can be seen, the new text was added on the following line:
```console
$ echo "Hello to you too!" >> text
$ cat text
Hello!
Hello to you too!
```
The second example demonstrates that a new file will be created:
```console
$ echo "Hello to you too!" >> text2
$ cat text2
Hello to you too!

Redirecting Standard Error
```
In order to redirect just the error messages, a user will need to employ the 2> operator followed by the name of the file in which the errors will be written. If the file doesn’t exist, a new one will be created, otherwise the file will be overwritten. As explained, the channel for redirecting the standard error is channel 2. When redirecting the standard error, the channel must be specified, contrary to the other standard output where channel 1 is set by default. For example, the following command searches for a file or directory named games and only writes the error into the text-error file, while displaying the standard output on the screen:
```console
$ find /usr games 2> text-error
/usr
/usr/share
/usr/share/misc
---------Omitted output---------/usr/lib/libmagic.so.1.0.0
/usr/lib/libdns.so.81
/usr/games
$ cat text-error
find: `games': No such file or directory
```
**NOTE**
For more information about the find command, consult its man page.
For example, the following command will run without errors, therefore no information will be written in the file text-error:
```console
$ sort /etc/passwd 2> text-error
$ cat text-error
```
As well as the standard output, the standard error can also be appended to a file with the 2>> operator. This will add the new error at the end of the file. If the file doesn’t exist, a new one will be created. The first example shows the addition of the new information into the file, whereas the second example shows that the command creates a new file where an existing one can’t be found with the same name:
```console
$ sort /etc 2>> text-error
$ cat text-error
sort: read failed: /etc: Is a directory

$ sort /etc/shadow 2>> text-error2
$ cat text-error2
sort: open failed: /etc/shadow: Permission denied
```
Using this type of redirection, only the error messages will be redirected to the file, the normal output will be written on the screen or go through standard output or stdout. There is one particular file that technically is a bit bucket (a file that accepts input and doesn’t do anything with it): /dev/null. You can redirect any irrelevant information that you might not want displayed or redirected into an important file, as shown in the example below:
```console
$ sort /etc 2> /dev/null

Redirecting Standard Input
```
This type of redirection is used to input data to a command, from a specified file instead of a keyboard. In this case the < operator is used as shown in the example:
```console
$ cat < text
Hello!
Hello to you too!
```
Redirecting standard input is usually used with commands that don’t accept file arguments. The tr command is one of them. This command can be used to translate file contents by modifying the characters in a file in specific ways, like deleting any particular character from a file, the example below shows the deletion of the character l:
```console
$ tr -d "l" < text
Heo!
Heo to you too!
```
For more information, consult the man page of tr.
**Here Documents**
Unlike the output redirections, the << operator acts in a different way compared to the other operators. This input stream is also called here document. Here document represents the block of code or text which can be redirected to the command or the interactive program. Different types
of scripting languages, like bash, sh and csh are able to take input directly from the command line, without using any text files. As can be seen in the example below, the operator is used to input data into the command, while the word after doesn’t specify the file name. The word is interpreted as the delimiter of the input and it will not be taken in consideration as content, therefore cat will not display it:
```console
$ cat << hello
> hey
> ola
> hello
hey
ola
```
Consult the man page of the cat command to find more information.
**Combinations**
The first combination that we will explore combines the redirection of the standard output and standard error output to the same file. The &> and &>> operators are used, & representing the combination of channel 1 and channel 2. The first operator will overwrite the existing contents of the file and the second one will append or add the new information at the end of the file. Both operators will enable the creation of the new file if it doesn’t exist, just like in the previous sections:
```console
$ find /usr admin &> newfile
$ cat newfile
/usr
/usr/share
/usr/share/misc
---------Omitted output---------/usr/lib/libmagic.so.1.0.0
/usr/lib/libdns.so.81
/usr/games
find: `admin': No such file or directory
$ find /etc/calendar &>> newfile
$ cat newfile
/usr
/usr/share
/usr/share/misc
---------Omitted output---------/usr/lib/libmagic.so.1.0.0

/usr/lib/libdns.so.81
/usr/games
find: `admin': No such file or directory
/etc/calendar
/etc/calendar/default
```
Let’s take a look at an example using the cut command:
```console
$ cut -f 3 -d "/" newfile
$ cat newfile
share
share
share
---------Omitted output---------lib
games
find: `admin': No such file or directory
calendar
calendar
find: `admin': No such file or directory
```
The cut command cuts specified fields from the input file by using the -f option, the 3rd field in our case. In order for the command to find the field, a delimiter needs to be specified as well with the -d option. In our case the delimiter will be the / character. To find more about the cut command, consult its man page.
#### Command Line Pipes

Redirection is mostly used to store the result of a command, to be processed by a different command. This type of intermediate process can become very tedious and complicated if you want the data to go through multiple processes. In order to avoid this, you can link the command directly via pipes. In other words, the first command’s output automatically becomes the second command’s input. This connection is made by using the | (vertical bar) operator:
```console
$ cat /etc/passwd | less
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
bin:x:2:2:bin:/bin:/bin/sh
:
```
In the example above, the less command after the pipe operator modifies the way that the file is displayed. The less command displays the text file allowing the user to scroll up and down a line at the time. less is also used by default to display the man pages, as discussed in the previous lessons. It is possible to use multiple pipes at the same time. The intermediate commands that receive input then change it and produce output are called filters. Let’s take the ls -l command and try to count the number of words from the first 10 lines of the output. In order to do this, we will have to use the head command that by default displays the first 10 lines of a file and then count the words using the wc command:
```console
$ ls -l | head | wc -w
10
```
As mentioned earlier, by default, head only displays the first 10 lines of the text file specified. This behaviour can be modified by using specific options. Check the command’s man page to find more. There is another command that displays the end of a file: tail. By default, this command selects the last 10 lines and displays them, but as head the number can also be modified. Check tail’s man page for more details.
**NOTE**
The -f option can show the last lines of a file while it’s being updated. This feature can become very useful when monitoring a file like syslog for ongoing activity.
The wc (word count) command counts by default the lines, words and bytes of a file. As shown in the exercise, the -w option causes the command to only count the words within the selected lines. The most common options that you can use with this command are: -l, which specifies to the command to only count the lines, and -c, which is used to count only the bytes. More variations and options of the command, as well as more information about wc can be found within the command’s man page.
#### Guided Exercises

1. List the contents of your current directory, including the ownership and permissions, and redirect the output to a file called contents.txt within your home directory.
2. Sort the contents of the contents.txt file from your current directory and append it to the end of a new file named contents-sorted.txt.
3. Display the last 10 lines of the /etc/passwd file and redirect it to a new file in your user’s Documents directory.
4. Count the number of words within the contents.txt file and append the output to the end of a file field2.txt in your home directory. You will need to use both input and output redirection.
5. Display the first 5 lines of the /etc/passwd file and sort the output reverse alphabetically.
6. Using the previously created contents.txt file, count the number of characters of the last 9 lines.
7. Count the number of files called test within the /usr/share directory and its subdirectories. Note: each line output from the find command represents a file.
#### Explorational Exercises

1. Select the second field of the contents.txt file and redirect the standard output and error output to another file called field1.txt.
2. Using the input redirection operator and the tr command, delete the dashes (-) from the contents.txt file.
3. What is the biggest advantage of only redirecting errors to a file?
4. Replace all recurrent spaces within the alphabetically sorted contents.txt file with a single space.
5. In one command line, eliminate the recurrent spaces (as done in the previous exercise), select the ninth field and sort it reverse alphabetically and non-case sensitive. How many pipes did you have to use?
#### Summary

In this lab you learned:
- Types of redirection
- How to use the redirection operators
- How to use pipes to filter command output
Commands used in this lesson:
**cut**
Removes sections from each line of a file.
**cat**
Displays or concatenates files.
**find**
Searches for files in a directory hierarchy.
**less**
Displays a file, allowing the user to scroll one line at the time.
**more**
Displays a file, a page at the time.
**head**
Displays the first 10 lines of a file.
**tail**
Displays the last 10 lines of a file.
**sort**
Sorts files.
**wc**
Counts by default the lines, words or bytes of a file.

### 3.2 Lesson 2

#### Introduction

In this lesson, we are going to look at tools that are used to manipulate text. These tools are frequently used by system administrators or programs to automatically monitor or identify specific recurring information.
#### Searching within Files with grep

The first tool that we will discuss in this lesson is the grep command. grep is the abbreviation of the phrase “global regular expression print” and its main functionality is to search within files for the specified pattern. The command outputs the line containing the specified pattern highlighted in red.
```console
$ grep bash /etc/passwd
root:x:0:0:root:/root:/bin/bash
user:x:1001:1001:User,,,,:/home/user:/bin/bash

grep, as most commands, can also be tweaked by using options. Here are the most common ones:

-i
the search is case insensitive
-r
the search is recursive (it searches into all files within the given directory and its
subdirectories)
-c
the search counts the number of matches
-v
invert the match, to print lines that do not match the search term
-E
turns on extended regular expressions (needed by some of the more advanced meta-characters
like | , + and ?)
grep has many other useful options. Consult the man page to find out more about it.
```
#### Regular Expressions

The second tool is very powerful. It is used to describe bits of text within files, also called regular expressions. Regular expressions are extremely useful in extracting data from text files by constructing patterns. They are commonly used within scripts or when programming with high level languages, such as Perl or Python. When working with regular expressions, it is very important to keep in mind that every character counts and the pattern is written with the purpose of matching a specific sequence of characters, known as a string. Most patterns use the normal ASCII symbols, such as letters, digits, punctuation or other symbols, but it can also use Unicode characters in order to match any other type of text. The following list explains the regular expressions meta-characters that are used to form the patterns. . Match any single character (except newline) [abcABC] Match any one character within the brackets
**[^abcABC]**
Match any one character except the ones in the brackets [a-z] Match any character in the range [^a-z] Match any character except the ones in the range sun|moon Find either of the listed strings ^ Start of a line $ End of a line All functionalities of the regular expressions can be implemented through grep as well. You can see that in the example above, the word is not surrounded by double quotes. To prevent the shell from interpreting the meta-character itself, it is recommended that the more complex pattern be between double quotes (" "). For the purpose of practice, we will be using double quotes when implementing regular expressions. The other quotation marks keep their normal functionality, as discussed in previous lessons. The following examples emphasize the functionality of the regular expressions. We will need data within the file, therefore the next set of commands just appends different strings to the text.txt file.
```console
$ echo "aaabbb1" > text.txt
$ echo "abab2" >> text.txt
$ echo "noone2" >> text.txt
$ echo "class1" >> text.txt
$ echo "alien2" >> text.txt
$ cat text.txt
aaabbb1
abab2
noone2
class1
alien2
```
The first example is a combination of searching through the file without and with regular expressions. In order to fully understand regular expressions, it is very important to show the difference. The first command searches for the exact string, anywhere in the line, whereas the second command searches for sets of characters that contain any of the characters between the brackets. Therefore, the results of the commands are different.
```console
$ grep "ab" text.txt
aaabbb1
abab2
$ grep "[ab]" text.txt
aaabbb1
abab2
class1
alien2
```
The second set of examples shows the application of the beginning and the end of the line metacharacter. It is very important to specify the need to put the 2 characters at the right place in the expression. When specifying the beginning of the line, the meta-character needs to be before the expression, whereas, when specifying the end of the line, the meta-character needs to be after the expression.
```console
$ grep "^a" text.txt
aaabbb1
abab2
alien2
$ grep "2$" text.txt
abab2
noone2
alien2
```
On top of the previous explained meta-characters, regular expressions also have meta-characters that enable multiplication of the previously specified pattern: * Zero or more of the preceding pattern + One or more of the preceding pattern
? Zero or one of the preceding pattern For the multiplier meta-characters, the command below searches for a string that contains ab, a single character and one or more of the characters previously found. The result shows that grep found the aaabbb1 string, matching the abbb part as well as abab2. Since the + character is an extended regular expression character, we need to pass the -E option to the grep command.
```console
$ grep -E "ab.+" text.txt
aaabbb1
abab2
```
Most of the meta-characters are self-explanatory, but they can become tricky when used for the first time. The previous examples represent a small part of the regular expressions’ functionality. Try all meta-characters from the above table to understand more on how they work.
#### Guided Exercises

Using grep and the /usr/share/hunspell/en_US.dic file, find the lines that match the following criteria:
1. All lines containing the word cat anywhere on the line.
2. All lines that do not contain any of the following characters: sawgtfixk.
3. All lines that start with any 3 letters and the word dig.
4. All lines that end with at least one e.
5. All lines that contain one of the following words: org , kay or tuna.
6. Number of lines that start with one or no c followed by the string ati.
#### Explorational Exercises

1. Find the regular expression that matches the words in the “Include” line and doesn’t match the ones in the “Exclude” line: ◦ Include: pot, spot, apot Exclude: potic, spots, potatoe
**◦ Include: arp99, apple, zipper**
Exclude: zoo, arive, attack
**◦ Include: arcane, capper, zoology**
Exclude: air, coper, zoloc
**◦ Include: 0th/pt, 3th/tc, 9th/pt**
Exclude: 0/nm, 3/nm, 9/nm
**◦ Include: Hawaii, Dario, Ramiro**
Exclude: hawaii, Ian, Alice
1. What other useful command is commonly used to search within the files? What additional functionalities does it have?
2. Thinking back at the previous lesson, use one of the examples and try to look for a specific pattern within the output of the command, with the help of grep.
#### Summary

In this lab you learned:
- Regular expressions meta-characters
- How to create patterns with regular expressions
- How to search within the files
Commands used in the exercises: grep Searches for characters or strings within a file

### Answers

#### Guided Exercises

**Lesson 1**

1. List the contents of your current directory, including the ownership and permissions, and redirect the output to a file called contents.txt within your home directory. $ ls -l > contents.txt
2. Sort the contents of the contents.txt file from your current directory and append it to the end of a new file named contents-sorted.txt. $ sort contents.txt >> contents-sorted.txt
3. Display the last 10 lines of the /etc/passwd file and redirect it to a new file in the your user’s Documents directory. $ tail /etc/passwd > Documents/newfile
4. Count the number of words within the contents.txt file and append the output to the end of a file field2.txt in your home directory. You will need to use both input and output redirection. $ wc < contents.txt >> field2.txt
5. Display the first 5 lines of the /etc/passwd file and sort the output reverse alphabetically. $ head -n 5 /etc/passwd | sort -r
6. Using the previously created contents.txt file, count the number of characters of the last 9 lines. $ tail -n 9 contents.txt | wc -c 531
7. Count the number of files called test within the /usr/share directory and its subdirectories. Note: each line output from the find command represents a file.
```console
$ find /usr/share -name test | wc -l
125
```

**Lesson 2**

Using grep and the /usr/share/hunspell/en_US.dic file, find the lines that match the following criteria:
1. All lines containing the word cat anywhere on the line. $ grep "cat" /usr/share/hunspell/en_US.dic Alcatraz/M Decatur/M Hecate/M ...
2. All lines that do not contain any of the following characters: sawgtfixk. $ grep -v "[sawgtfixk]" /usr/share/hunspell/en_US.dic 49269 0/nm 1/n1 2/nm 2nd/p 3/nm 3rd/p 4/nm 5/nm 6/nm 7/nm 8/nm ...
3. All lines that start with any 3 letters and the word dig. $ grep "^...dig" /usr/share/hunspell/en_US.dic cardigan/SM condign predigest/GDS ...
4. All lines that end with at least one e.
```console
$ grep -E "e+$" /usr/share/hunspell/en_US.dic
```
**Anglicize**

**Anglophobe**
Anthropocene ...
1. All lines that contain one of the following words: org , kay or tuna. $ grep -E "org|kay|tuna" /usr/share/hunspell/en_US.dic Borg/SM George/MS Tokay/M fortunate/UY ...
2. Number of lines that start with one or no c followed by the string ati. $ grep -cE "^c?ati" /usr/share/hunspell/en_US.dic 3

#### Explorational Exercises

**Lesson 1**

1. Select the second field of the contents.txt file and redirect the standard output and error output to another file called field1.txt. $ cut -f 2 -d " " contents.txt &> field1.txt
2. Using the input redirection operand and the tr command, delete the dashes (-) from the contents.txt file. $ tr -d "-" < contents.txt
3. What is the biggest advantage of only redirecting errors to a file? Only redirecting errors to a file can help with keeping a log file that is monitored frequently.
4. Replace all recurrent spaces within the alphabetically sorted contents.txt file with a single space. $ sort contents.txt | tr -s " "
5. In one command line, eliminate the recurrent spaces (as done in the previous exercise), select the ninth field and sort it reverse alphabetically and non-case sensitive. How many pipes did you have to use? $ cat contents.txt | tr -s " " | cut -f 9 -d " " | sort -fr
The exercise uses 3 pipes, one for each filter.

**Lesson 2**

1. Find the regular expression that matches the words in the “Include” line and doesn’t match the ones in the “Exclude” line: ◦ Include: pot, spot, apot Exclude: potic, spots, potatoe Answer: pot$ ◦ Include: arp99, apple, zipper Exclude: zoo, arive, attack Answer: p+ ◦ Include: arcane, capper, zoology Exclude: air, coper, zoloc Answer: arc|cap|zoo ◦ Include: 0th/pt, 3th/tc, 9th/pt Exclude: 0/nm, 3/nm, 9/nm Answer: [0-9]th.+ ◦ Include: Hawaii, Dario, Ramiro Exclude: hawaii, Ian, Alice Answer: ^[A-Z]a.*i+
2. What other useful command is commonly used to search within the files? What additional functionalities does it have? The sed command. The command can find and replace characters or sets of characters within a file.
3. Thinking back at the previous lesson, use one of the examples and try to look for a specific pattern within the output of the command, with the help of grep. I took one of the answers from the Explorational Exercises and looked for the line that has
read, write and execute as the group permissions. Your answer might be different, depending on the command that you chose and the pattern that you created.
```console
$ cat contents.txt | tr -s " " | grep "^....rwx"
```
This exercise is to show you that grep can also receive input from different commands and it can help in filtering generated information.
