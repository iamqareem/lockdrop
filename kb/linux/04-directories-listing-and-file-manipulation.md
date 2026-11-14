---
id: linux-04
title: "Directories, Listing Files and Creating, Moving and Deleting Files"
slug: 04-directories-listing-and-file-manipulation
source: "LPI Learning Material 010-160"
sourceSection: "2.3, 2.4"
topic: "2"
tags: [linux, lpic-1, filesystem, directories, files]
summary: "Navigate the filesystem with ls and cd, then create, rename, move, copy and delete files and directories with confidence."
---
# Finding Your Way on a Linux System

## 2.3 Using Directories and Listing Files

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 2.3
**Weight:** 2
**Key knowledge areas**
- Files, directories
- Hidden files and directories
- Home directories
- Absolute and relative paths
**Partial list of the used files, terms and utilities**
- Common options for ls
- Recursive listings
- cd
- . and ..
- home and ~

### 2.3 Lesson 1

#### Introduction

#### Files and Directories

The Linux filesystem is similar to other operating system’s filesystems in that it contains files and directories. Files contain data such as human-readable text, executable programs, or binary data that is used by the computer. Directories are used to create organization within the filesystem. Directories can contain files and other directories.
```console
$ tree
```
**Documents**
├── Mission-Statement.txt └── Reports └── report2018.txt 1 directory, 2 files
In this example, Documents is a directory that contains one file (Mission-Statement.txt) and one subdirectory (Reports). The Reports directory in turn contains one file called report2018.txt. The Documents directory is said to be the parent of the Reports directory.
**TIP**
If the command tree is not available on your system, install it using your Linux distribution’s package manager. Refer to the lesson on package management to learn how to do so.
#### File and Directory Names

File and directory names in Linux can contain lower case and upper case letters, numbers, spaces and special characters. However, since many special characters have a special meaning in the Linux shell, it is good practice to not use spaces or special characters when naming files or directories. Spaces, for example, need the escape character \ to be entered correctly:
```console
$ cd Mission\ Statements
```
Also, refer to the filename report2018.txt. Filenames can contain a suffix which comes after the period (.). Unlike Windows, this suffix has no special meaning in Linux; it is there for human understanding. In our example .txt indicates to us that this is a plaintext file, although it could technically contain any kind of data.
#### Navigating the Filesystem

**Getting Current Location**
Since Linux shells such as Bash are text-based, it is important to remember your current location when navigating the filesystem. The command prompt provides this information: user@hostname ~/Documents/Reports $
Note that information such as user and hostname will be covered in future sections. From the prompt, we now know that our current location is in the Reports directory. Similarly, the command pwd will print working directory: user@hostname ~/Documents/Reports $ pwd /home/user/Documents/Reports
The relationship of directories is represented with a forward slash (/). We know that Reports is a subdirectory of Documents, which is a subdirectory of user, which is located in a directory called home. home doesn’t seem to have a parent directory, but that is not true at all. The parent of home is called root, and is represented by the first slash (/). We will discuss the root directory in a later section. Notice that the output of the pwd command differs slightly from the path given on the command prompt. Instead of /home/user, the command prompt contains a tilde (~). The tilde is a special character that represents the user’s home directory. This will be covered in more detail in the next lesson.
**Listing Directory Contents**
The contents of the current directory are listed with the ls command: user@hostname ~/Documents/Reports $ ls report2018.txt
Note that ls provides no information about the parent directory. Similarly, by default ls does not show any information about contents of subdirectories. ls can only “see” what is in the current directory.
**Changing Current Directory**
Navigation in Linux is primarily done with the cd command. This changes directory. Using the pwd command from before, we know our current directory is /home/user/Documents/Reports. We can change our current directory by entering a new path: user@hostname ~ $ cd /home/user/Documents user@hostname ~/Documents $ pwd /home/user/Documents user@hostname ~/Documents $ ls Mission-Statement.txt Reports
From our new location, we can “see” Mission-Statement.txt and our subdirectory Reports, but not the contents of our subdirectory. We can navigate back into Reports like this: user@hostname ~/Documents $ cd Reports user@hostname ~/Documents/Reports $ pwd /home/user/Documents/Reports
**user@hostname ~/Documents/Reports $ ls**
report2018.txt
We are now back where we started.
#### Absolute and Relative Paths

The pwd command always prints an absolute path. This means that the path contains every step of the path, from the top of the filesystem (/) to the bottom (Reports). Absolute paths always begin with a /. / └── home └── user └── Documents └── Reports
The absolute path contains all the information required to get to Reports from anywhere in the filesystem. The drawback is that it is tedious to type. The second example (cd Reports) was much easier to type. This is an example of a relative path. Relative paths are shorter but only have meaning in relation to your current location. Consider this analogy: I am visiting you at your house. You tell me that your friend lives next door. I will understand that location because it is relative to my current location. But if you tell me this over the phone, I will not be able to find your friend’s house. You will need to give me the complete street address.
**Special Relative Paths**
The Linux shell gives us ways to shorten our paths when navigating. To reveal the first special paths, we enter the ls command with the flag -a. This flag modifies the ls command so that all files and directories are listed, including hidden files and directories: user@hostname ~/Documents/Reports $ ls -a . .. report2018.txt
**NOTE**
You can refer to the man page for ls to understand what -a is doing here.
This command has revealed two additional results: These are special paths. They do not represent new files or directories, but rather they represent directories that you already know: . Indicates the current location (in this case, Reports). .. Indicates the parent directory (in this case, Documents). It is usually unnecessary to use the special relative path for the current location. It is easier and more understandable to type report2018.txt than it is to type ./report2018.txt. But the . has uses that you will learn in future sections. For now, we will focus on the relative path for the parent directory: user@hostname ~/Documents/Reports $ cd .. user@hostname ~/Documents $ pwd /home/user/Documents
The example of cd is much easier when using .. instead of the absolute path. Additionally, we can combine this pattern to navigate up the file tree very quickly. user@hostname ~/Documents $ cd ../..
```console
$ pwd
/home
```
#### Guided Exercises

1. For each of the following paths, identify whether it is absolute or relative: /home/user/Downloads ../Reports /var docs /
2. Observe the following file structure. Note: Directories end with a slash (/) when tree is invoked with the -F option. You will need elevated privileges in order to run the tree command on the root (/) directory. The following is example output and is not indicative of a full directory structure. Use it to answer the following questions: $ sudo tree -F / / ├── etc/ │
├── network/
│
│
│
├── systemd/
│
│
├── resolved.conf
│
│
├── system/
│
│
├── system.conf
│
│
├── user/
│
│
└── user.conf
│
└── udev/
└── interfaces
│
├── rules.d/
│
└── udev.conf
**└── home/**
├── lost+found/ └── user/ └── Documents/ 12 directories, 5 files
Use this structure to answer the following questions. A user enters the following commands:
```console
$ cd /etc/udev
$ ls -a
```
What will be the output of the ls -a command?
1. Enter the shortest possible command for each of the following: ◦ Your current location is root (/). Enter the command to navigate to lost+found within the home directory (example): $ cd home/lost+found
◦ Your current location is root (/). Enter the command to navigate to the directory named /etc/network/.
◦ Your current location is /home/user/Documents/. Navigate to the directory named /etc/.
◦ Your current location is /etc/systemd/system/. Navigate to the directory named /home/user/.
1. Consider the following commands: $ pwd /etc/udev/rules.d $ cd ../../systemd/user $ cd .. $ pwd
What is the output of the final pwd command?
#### Explorational Exercises

1. Suppose a user has entered the following commands: $ mkdir "this is a test" $ ls this is a test
What cd command would allow you to enter this directory?
1. Try this again, but after typing in cd this, press the TAB key. What is now displayed on the prompt?
This is an example of autocompletion, which is an invaluable tool not only for saving time, but for preventing spelling errors.
1. Try to create a directory whose name contains a \ character. Display the directory’s name with ls and delete the directory.
#### Summary

In this lesson, you learned:
- The fundamentals of the Linux filesystem
- The difference between parent directories and subdirectories
- The difference between absolute file paths and relative file paths
- The special relative paths . and ..
- Navigate the filesystem using cd
- Show your current location using pwd
- List all files and directories using ls -a
The following commands were discussed in this lesson:
**cd**
Change the current directory.
**pwd**
Print the current working directory’s path
**ls**
List the contents of a directory and display properties of files
**mkdir**
Create a new directory
**tree**
Display a hierarchical listing of a directory tree

### 2.3 Lesson 2

#### Introduction

The Unix operating system was originally designed for mainframe computers in the mid-1960s. These computers were shared among many users, who accessed the system’s resources through terminals. These fundamental ideas carry through to Linux systems today. We still talk about using “terminals” to enter commands in the shell, and every Linux system is organized in such a way that it is easy to create many users on a single system.
#### Home Directories

This is an example of a normal file system in Linux:
```console
$ tree -L 1 /
/
├── bin
├── boot
├── cdrom
├── dev
├── etc

├── home
├── lib
├── mnt
├── opt
├── proc
├── root
├── run
├── sbin
├── srv
├── sys
├── tmp
├── usr
└── var
```
Most of these directories are consistent across all Linux systems. From servers to supercomputers to tiny embedded systems, a seasoned Linux user can be confident that they can find the ls command inside /bin, can change the system configuration by modifying files in /etc, and read system logs in /var. The standard location of these files and directories is defined by the Filesystem Hierarchy Standard (FHS), which will be discussed in a later lesson. You will learn more about the contents of these directories as you continue learning about Linux, but for the time being, know that:
- changes that you make in the root filesystem will affect all users, and
- changing files in the root filesystem will require administrator permissions.
This means that normal users will be prohibited from modifying these files, and may also be prohibited from even reading these files. We will cover the topic of permissions in a later section. Now, we will focus on the directory /home, which should be somewhat familiar at this point:
```console
$ tree -L 1 /home
/home
├── user
├── michael
└── lara
```
Our example system has three normal users, and each of our users has their own dedicated location, where they can create and modify files and directories without affecting their neighbor. For example, in the previous lesson we were working with the following file structure:
```console
$ tree /home/user

user
└── Documents
├── Mission-Statement
└── Reports
└── report2018.txt
```
In actuality, the real filesystem may look like this:
```console
$ tree /home
/home
├── user
│

└── Documents

│

├── Mission-Statement

│

└── Reports

│

└── report2018.txt

├── michael
│

├── Documents

│

│

│

└── Music

└── presentation-for-clients.odp

…and so on for lara.
```
In Linux, /home is similar to an apartment building. Many users may have their space here, separated into dedicated apartments. The utilities and maintenance of the building itself are the responsibility of the superintendent root user.
#### The Special Relative Path for Home

When you start a new terminal session in Linux, you see a command prompt similar to this: user@hostname ~ $
The tilde (~) here represents our home directory. If you run the ls command, you will see some familiar output:
```console
$ cd ~
$ ls
```
Documents
Compare that with the file system above to check your understanding.
Consider now what we know about Linux: it is similar to an apartment building, with many users residing in /home. So user 's home will be different from user michael 's home. To demonstrate this, we will use the su command to switch user. user@hostname ~ $ pwd /home/user user@hostname ~ $ su - michael Password: michael@hostname ~ $ pwd /home/michael
The meaning of ~ changes depending of who the user is. For michael, the absolute path of ~ is /home/michael. For lara, the absolute path of ~ is /home/lara, and so on.
#### Relative-to-Home File Paths

Using ~ for commands is very convenient, provided that you don’t switch users. We will consider the following example for user, who has begun a new session:
```console
$ ls
```
Documents
```console
$ cd Documents
$ ls
```
**Mission-Statement**
Reports
```console
$ cd Reports
$ ls
report2018.txt
$ cd ~
$ ls
```
Documents
Note that users will always begin a new session in their home directory. In this example, user has traveled into their Documents/Reports subdirectory, and with the cd ~ command they have returned to where they started. You can perform the same action by using the cd command with no arguments:
```console
$ cd Documents/Reports
$ pwd
/home/user/Documents/Reports

$ cd
$ pwd
/home/user
```
One last thing to note: we can specify the home directories of other users by specifying the username after the tilde. For example:
```console
$ ls ~michael
```
**Documents**
Music
Note that this will only work if michael has given us permission to view the contents of his home directory. Let’s consider a situation where michael would like to view the file report2018.txt in user 's home directory. Assuming that michael has the permission to do so, he can use the less command.
```console
$ less ~user/Documents/Reports/report2018.txt
```
Any file path that contains the ~ character is called a relative-to-home path.
#### Hidden Files and Directories

In the previous lesson, we introduced the option -a for the ls command. We used ls -a to introduce the two special relative paths: . and ... The -a option will list all files and directories, including hidden files and directories.
```console
$ ls -a ~
.
..
.bash_history
.bash_logout
.bash-profile
.bashrc
```
Documents
Hidden files and directories will always begin with a period (.). By default, a user’s home directory will include many hidden files. These are often used to set user-specific configuration
settings, and should only be modified by an experienced user.
#### The Long List Option

The ls command has many options to change its behavior. Let’s look at one of the most common options:
```console
$ ls -l
-rw-r--r-- 1 user staff

3606 Jan 13

2017 report2018.txt

-l creates a long list. Files and directories will each occupy one line, but additional information
about each file and directory will be displayed.
-rw-r—r-Type of file and permissions of the file. Note that a regular file will begin with dash, and a
directory will start with d.
1
```
Number of links to the file.
**user staff**
Specifies ownership of the file. user is the owner of the file, and the file is also associated with the staff group. 3606 Size of the file in bytes.
**Jan 13 2017**
Time stamp of the last modification to the file.
**report2018.txt**
Name of the file. Subjects such as ownership, permissions and links will be covered in future sections. As you can see, the long list version of the ls is oftentimes preferable to the default.
#### Additional ls Options

Below are some of the ways that we most commonly use the ls command. As you can see, the user can combine many options together to get the desired output.
**ls -lh**
Combining long list with human readable file sizes will give us useful suffixes such as M for megabytes or K for kilobytes. ls -d */ The -d option will list directories but not their contents. Combining this with */ will show only subdirectories and no files.
**ls -lt**
Combines long list with the option to sort by modification time. The files with the most recent changes will be at the top, and files with the oldest changes will be at the bottom. But this order can be reversed with:
**ls -lrt**
Combines long list with sort by (modification) time, combined with -r which reverses the sort. Now files with the most recent changes are at the bottom of the list. In addition to sorting by modification time, files can also be sorted by access time or by status time.
**ls -lX**
Combines long list with the option to sort by file eXtension. This will, for example, group all files ending with .txt together, all files ending with .jpg together, and so on.
**ls -S**
The -S sorts by file size, much in the same way as -t and -X sort by time and extension respectively. The largest files will come first, and smallest last. Note that the contents of subdirectories are not included in the sort.
**ls -R**
The -R option will modify the ls command to display a recursive list. What does this mean?
#### Recursion in Bash

Recursion refers to a situation when “something is defined in terms of itself”. Recursion is a very important concept in computer science, but here its meaning is far simpler. Let’s consider our example from before:
```console
$ ls ~
```
Documents
We know from before that user has a home directory, and in this directory there is one
subdirectory. ls has up until now only shown us the files and subdirectories of a location, but cannot tell us the contents of these subdirectories. In these lessons, we have been using the tree command when we wanted to display the contents of many directories. Unfortunately, tree is not one of the core utilities of Linux and thus is not always available. Compare the output of tree with the output of ls -R in the following examples:
```console
$ tree /home/user
user
└── Documents
├── Mission-Statement
└── Reports
└── report2018.txt
$ ls -R ~
/home/user/:
```
**Documents**
/home/user/Documents: Mission-Statement Reports /home/user/Documents/Reports: report2018.txt
As you can see, with the recursive option, we get a far longer list of files. In fact, it is as if we ran the ls command in user 's home directory, and encountered one subdirectory. Then, we entered into that subdirectory and ran the ls command again. We encountered the file MissionStatement and another subdirectory called Reports. And again, we entered into the subdirectory, and ran the ls command again. Essentially, running ls -R is like telling Bash: “Run ls here, and repeat the command in every subdirectory that you find.” Recursion is particularly important in file modification commands such as copying or removing directories. For example, if you wanted to copy the Documents subdirectory, you would need to specify a recursive copy in order to extend this command to all subdirectories.
#### Guided Exercises

1. Use the following file structure to answer the following three questions: / ├── etc/ │
├── network/
│
│
│
├── systemd/
│
│
├── resolved.conf
│
│
├── system/
│
│
├── system.conf
│
│
├── user/
│
│
└── user.conf
│
└── udev/
└── interfaces/
│
├── rules.d
│
└── udev.conf
**└── home/**
├── lost+found/ ├── user/ │
└── Documents/
**└── michael/**
└── Music/
◦ What command will navigate into the network directory regardless of your current location?
◦ What command can user enter to navigate into their Documents directory from /etc/udev? Use the shortest possible path.
◦ What command can user enter to navigate into michael 's Music directory? Use the shortest possible path.
1. Consider the following output of ls -lh to answer the next two questions. Note that directories are indicated with a d at the beginning of the line. drwxrwxrwx
5 eric eric
4.0K Apr 26
2011 China/
-rwxrwxrwx
1 eric eric
1.5M Jul 18
2011 img_0066.jpg
-rwxrwxrwx
1 eric eric
1.5M Jul 18
2011 img_0067.jpg
-rwxrwxrwx
1 eric eric
1.6M Jul 18
2011 img_0074.jpg
-rwxrwxrwx
1 eric eric
1.8M Jul 18
2011 img_0075.jpg
-rwxrwxrwx
1 eric eric
46K Jul 18
2011 scary.jpg
-rwxrwxrwx
1 eric eric
469K Jan 29
2018 Screenshot from 2017-08-13 21-22-24.png
-rwxrwxrwx
1 eric eric
498K Jan 29
2018 Screenshot from 2017-08-14 21-18-07.png
-rwxrwxrwx
1 eric eric
211K Jan 29
2018 Screenshot from 2018-01-06 23-29-30.png
-rwxrwxrwx
1 eric eric
150K Jul 18
2011 tobermory.jpg
drwxrwxrwx
6 eric eric
4.0K Apr 26
2011 Tokyo/
-rwxrwxrwx
1 eric eric
1.4M Jul 18
2011 Toronto 081.jpg
-rwxrwxrwx
1 eric eric
1.4M Jul 18
2011 Toronto 085.jpg
-rwxrwxrwx
1 eric eric
944K Jul 18
2011 Toronto 152.jpg
-rwxrwxrwx
1 eric eric
728K Jul 18
2011 Toronto 173.jpg
drwxrwxrwx
2 eric eric
4.0K Jun
2016 Wallpapers/
5
◦ When you run the command ls -lrS, what file will be at the beginning?
◦ Please describe what you expect to see as the output for ls -ad */.
#### Explorational Exercises

1. Run the ls -lh command in a directory that contains subdirectories. Note the listed size of these directories. Do these file sizes seem correct to you? Do they accurately represent the contents of all files inside that directory?
2. Here is a new command to try: du -h. Run this command and describe the output that it gives you.
3. On many Linux systems, you can type in ll and get the same output as you would if you typed ls -l. Please note however that ll is not a command. For example, man ll will give you the message that no manual entry exists for it. This is an example of an alias. Why might aliases be useful to a user?
#### Summary

In this lab, you learned:
- that each Linux user will have a home directory,
- the current user’s home directory can be reached by using ~,
- any file path that uses ~ is called a relative-to-home path.
You also learned about some of the most common ways of modifying the `ls command. -a (all) prints all files/directories, including hidden -d (directories) list directories, not their contents -h (human readable) prints file sizes in human readable format -l (long list) provides extra details, one file/directory per line -r (reverse) reverses the order of a sort -R (recursive) lists every file, including files in each subdirectory -S (size) sorts by file size -t (time) sorts by modification time -X (eXtension) sorts by file extension

### Answers

#### Guided Exercises

**Lesson 1**

1. For each of the following paths, identify whether it is absolute or relative: /home/user/Downloads
absolute
../Reports
relative
/var
absolute
docs
relative
/
absolute
1. Observe the following file structure. Note: Directories end with a slash (/) when tree is invoked with the -F option. You will need elevated privileges in order to run the tree command on the root (/) directory. The following is example output and is not indicative of a full directory structure. Use it to answer the following questions: $ sudo tree -F / / ├── etc/ │
├── network/
│
│
│
├── systemd/
│
│
├── resolved.conf
│
│
├── system/
│
│
├── system.conf
│
│
├── user/
│
│
└── user.conf
│
└── udev/
└── interfaces
│
├── rules.d/
│
└── udev.conf
**└── home/**
├── lost+found/ └── user/ └── Documents/ 12 directories, 5 files
A user enters the following commands:
```console
$ cd /etc/udev
$ ls -a
```
What will be the output of the ls -a command? . .. rules.d udev.conf
1. Enter the shortest possible command for each of the following: ◦ Your current location is root (/). Enter the command to navigate to lost+found within the home directory (example): $ cd home/lost+found
◦ Your current location is root (/). Enter the command to navigate to the directory named network:
```console
$ cd etc/network

◦ Your current location is Documents. Navigate to the directory named etc:
$ cd /etc

◦ Your current location is system. Navigate to the directory named user:
$ cd /home/user
```
1. Consider the following commands: $ pwd /etc/udev/rules.d $ cd ../../systemd/user $ cd .. $ pwd
What is the output of the final pwd command?
/etc/systemd

**Lesson 2**

1. Use the following file structure to answer the following three questions: / ├── etc/ │
├── network/
│
│
│
├── systemd/
│
│
├── resolved.conf
│
│
├── system/
│
│
├── system.conf
│
│
├── user/
│
│
└── user.conf
│
└── udev/
└── interfaces/
│
├── rules.d
│
└── udev.conf
**└── home/**
├── lost+found/ ├── user/ │
└── Documents/
**└── michael/**
└── Music/
◦ What command will navigate into the network directory regardless of your current location? cd /etc/network
◦ What command can user enter to navigate into their Documents directory from /etc/udev? Use the shortest possible path. cd ~/Documents
◦ What command can user enter to navigate into michael 's Music directory? Use the shortest possible path: cd ~michael/Music
1. Consider the following output of ls -lh to answer the next two questions. Note that directories are indicated with a d at the beginning of the line. drwxrwxrwx
5 eric eric
4.0K Apr 26
2011 China/
-rwxrwxrwx
1 eric eric
1.5M Jul 18
2011 img_0066.jpg
-rwxrwxrwx
1 eric eric
1.5M Jul 18
2011 img_0067.jpg
-rwxrwxrwx
1 eric eric
1.6M Jul 18
2011 img_0074.jpg
-rwxrwxrwx
1 eric eric
1.8M Jul 18
2011 img_0075.jpg
-rwxrwxrwx
1 eric eric
46K Jul 18
2011 scary.jpg
-rwxrwxrwx
1 eric eric
469K Jan 29
2018 Screenshot from 2017-08-13 21-22-24.png
-rwxrwxrwx
1 eric eric
498K Jan 29
2018 Screenshot from 2017-08-14 21-18-07.png
-rwxrwxrwx
1 eric eric
211K Jan 29
2018 Screenshot from 2018-01-06 23-29-30.png
-rwxrwxrwx
1 eric eric
150K Jul 18
2011 tobermory.jpg
drwxrwxrwx
6 eric eric
4.0K Apr 26
2011 Tokyo/
-rwxrwxrwx
1 eric eric
1.4M Jul 18
2011 Toronto 081.jpg
-rwxrwxrwx
1 eric eric
1.4M Jul 18
2011 Toronto 085.jpg
-rwxrwxrwx
1 eric eric
944K Jul 18
2011 Toronto 152.jpg
-rwxrwxrwx
1 eric eric
728K Jul 18
2011 Toronto 173.jpg
drwxrwxrwx
2 eric eric
4.0K Jun
2016 Wallpapers/
5
◦ When you run the command ls -lrS, what file will be at the beginning? The three folders are all 4.0K, which is the smallest file size. ls will then sort the directories alphabetically by default. The correct answer is the file scary.jpg. ◦ Please describe what you expect to see as the output for ls -ad */. This command will show all subdirectories, including hidden subdirectories.

#### Explorational Exercises

**Lesson 1**

1. Suppose a user has entered the following commands: $ mkdir "this is a test" $ ls this is a test
What cd command would allow you to enter this directory?
```console
$ cd this\ is\ a\ test
```
1. Try this again, but after typing in cd this, press the TAB key. What is now displayed on the prompt? $ cd this\ is\ a\ test
This is an example of autocompletion, which is an invaluable tool not only for saving time, but for preventing spelling errors.
1. Try to create a directory whose name contains a \ character. Display the directory’s name with ls and delete the directory. You can either escape the backslash using another backslash (\\) or use single or double quotes around the whole directory name: $ mkdir my\\dir $ ls 'my\dir' $ rmdir 'my\dir'

**Lesson 2**

1. Run the ls -lh command in a directory that contains subdirectories. Note the listed size of these directories. Do these file sizes seem correct to you? Do they accurately represent the contents of all files inside that directory? No, they do not. Each directory has a listed file size of 4096 bytes. This is because directories here are an abstraction: they don’t exist as a tree structure on the disk. When you see a directory listed, you are seeing a link to a list of files. The size of these links is 4096 bytes.
2. Here is a new command to try: du -h. Run this command and describe the output that it gives you. The du command will generate a list of all files and directories, and indicate the size of each. For example, du -s will display the file size of all files, directories, and subdirectories for a certain location.
3. On many Linux systems, you can type in ll and get the same output as you would if you typed ls -l. Please note however that ll is not a command. For example, man ll will give you the message that no manual entry exists for it. What does this suggest to you about a feature of the command line? ll is an alias of ls -l. In Bash, we can use aliases to simplify commonly-used commands. ll is often defined for you in Linux, but you can create your own as well.

## 2.4 Creating, Moving and Deleting Files

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 2.4
**Weight:** 2
**Key knowledge areas**
- Files and directories
- Case sensitivity
- Simple globbing
**Partial list of the used files, terms and utilities**
- mv, cp, rm, touch
- mkdir, rmdir

### 2.4 Lesson 1

#### Introduction

This lesson covers managing files and directories on Linux using command line tools. A file is a collection of data with a name and set of attributes. If, for example, you were to transfer some photos from your phone to a computer and give them descriptive names, you would now have a bunch of image files on your computer. These files have attributes such as the time the file was last accessed or modified. A directory is a special kind of file used to organize files. A good way to think of directories is like the file folders used to organize papers in a file cabinet. Unlike paper file folders, you can easily put directories inside of other directories. The command line is the most effective way to manage files on a Linux system. The shell and command line tools have features that make using the command line faster and easier than a graphical file manager. In this section you will use the commands ls, mv, cp, pwd, find, touch, rm, rmdir, echo, cat, and mkdir to manage and organize files and directories.
#### Case Sensitivity

Unlike Microsoft Windows, file and directory names on Linux systems are case sensitive. This means that the names /etc/ and /ETC/ are different directories. Try the following commands:
```console
$ cd /
$ ls
bin

dev

home

lib64

mnt

proc

run

srv

tmp

boot

etc

lib

media

opt

root

sbin

sys

usr

var

$ cd ETC
bash: cd: ETC: No such file or directory
$ pwd
/
$ cd etc
$ pwd
/etc
```
The pwd shows you the directory you are currently in. As you can see, changing to /ETC did not work as there is no such directory. Changing into the directory /etc which exists, did succeed.
#### Creating Directories

The mkdir command is used to create directories. Let’s create a new directory within our home directory:
```console
$ cd ~
$ pwd
/home/user
$ ls
```
Desktop
Documents
Downloads
```console
$ mkdir linux_essentials-2.4
$ ls
```
Desktop
Documents
Downloads
linux_essentials-2.4
```console
$ cd linux_essentials-2.4
$ pwd
/home/emma/linux_essentials-2.4
```
For the duration of this lesson, all commands will take place within this directory or in one of its subdirectories.
To easily return to the lesson directory from any other position in your file system, you can use the command:
```console
$ cd ~/linux_essentials-2.4
```
The shell interprets the ~ character as your home directory. When you’re in the lesson directory, create some more directories which we will use for the exercises. You can add all the directory names, separated by spaces, to mkdir:
```console
$ mkdir creating moving copying/files copying/directories deleting/directories
deleting/files globs
mkdir: cannot create directory ‘copying/files’: No such file or directory
mkdir: cannot create directory ‘copying/directories’: No such file or directory
mkdir: cannot create directory ‘deleting/directories’: No such file or directory
mkdir: cannot create directory ‘deleting/files’: No such file or directory
$ ls
creating

globs

moving
```
Notice the error message and that only moving, globs, and creating were created. The copying and deleting directories don’t exist yet. mkdir, by default, won’t create a directory inside of a directory that does not exist. The -p or --parents option instructs mkdir to create parent directories if they do not exist. Try the same mkdir command with the -p option:
```console
$ mkdir -p creating moving copying/files copying/directories deleting/directories
deleting/files globs
```
Now you don’t get any error messages. Let’s see which directories exist now:
```console
$ find
.
./creating
./moving
./globs
./copying
./copying/files
./copying/directories
./deleting
./deleting/directories
./deleting/files
```
The find program is usually used to search for files and directories, but without any options, it will show you a listing of all the files, directories, and sub-directories of your current directory.
**TIP**
When listing the contents of a directory with ls, the -t and -r options are particularly handy. They sort the output by time (-t) and reverse the sorting order ( -r). In this case, the newest files will be at the bottom of the output.
#### Creating Files

Typically, files will be created by the programs that work with the data stored in the files. An empty file can be created using the touch command. If you run touch on an existing file, the file’s contents won’t be changed, but the files modification timestamp will be updated. Run the following command to create some files for the globbing lesson:
```console
$ touch globs/question1 globs/question2012 globs/question23 globs/question13
globs/question14
$ touch globs/star10 globs/star1100 globs/star2002 globs/star2013
```
Now let’s verify all files exist in the globs directory:
```console
$ cd globs
$ ls
question1

question14

question23

star1100

question13

question2012

star10

star2002

star2013
```
Notice how touch created the files? You can view the contents of a text file with the cat command. Try it on one of the files you just created:
```console
$ cat question14
```
Since touch creates empty files, you should get no output. You can use echo with > to create simple text files. Try it:
```console
$ echo hello > question15
$ cat question15
hello

echo displays text on the command line. The > character instructs the shell to write output of a

command to the specified file instead of your terminal. This leads to the output of echo, hello in
this case, being written to the file question15. This isn’t specific to echo, it can be used with any
command.
```
**WARNING**
Be careful when using >! If the named file already exists, it will be overwritten!
#### Renaming Files

Files are moved and renamed with the mv command. Set your working directory to the moving directory:
```console
$ cd ~/linux_essentials-2.4/moving
```
Create some files to practice with. By now, you should already be familiar with these commands:
```console
$ touch file1 file22
$ echo file3 > file3
$ echo file4 > file4
$ ls
file1

file22

file3

file4
```
Suppose file22 is a typo and should be file2. Fix it with the mv command. When renaming a file, the first argument is the current name, the second is the new name:
```console
$ mv file22 file2
$ ls
file1

file2

file3

file4
```
Be careful with the mv command. If you rename a file to the name of an existing file, it will overwrite it. Let’s test this with file3 and file4:
```console
$ cat file3
file3
$ cat file4
file4
$ mv file4 file3
$ cat file3
file4

$ ls
file1

file2

file3
```
Notice how the contents of file3 is now file4. Use the -i option to make mv prompt you if you are about to overwrite an existing file. Try it:
```console
$ touch file4 file5
$ mv -i file4 file3
mv: overwrite ‘file3’? y
```
#### Moving Files

Files are moved from one directory to another with the mv command. Create a few directories to move files into:
```console
$ cd ~/linux_essentials-2.4/moving
$ mkdir dir1 dir2
$ ls
dir1

dir2

file1

file2

file3

file5

Move file1 into dir1:
$ mv file1 dir1
$ ls
dir1

dir2

file2

file3

file5

$ ls dir1
file1
```
Notice how the last argument to mv is the destination directory. Whenever the last argument to mv is a directory, files are moved into it. Multiple files can be specified in a single mv command:
```console
$ mv file2 file3 dir2
$ ls
dir1

dir2

file5

$ ls dir2
file2

file3
```
It is also possible to use mv to move and rename directories. Rename dir1 to dir3:
```console
$ ls
dir1

dir2

file5

$ ls dir1
file1
$ mv dir1 dir3
$ ls
dir2

dir3

file5

$ ls dir3
file1
```
#### Deleting Files and Directories

The rm command can delete files and directories, while the rmdir command can only delete directories. Let’s clean up the moving directory by deleting file5:
```console
$ cd ~/linux_essentials-2.4/moving
$ ls
dir2

dir3

file5

$ rmdir file5
rmdir: failed to remove ‘file5’: Not a directory
$ rm file5
$ ls
dir2

dir3
```
By default rmdir can only delete empty directories, therefore we had to use rm to delete a regular file. Try to delete the deleting directory:
```console
$ cd ~/linux_essentials-2.4/
$ ls
copying

creating

deleting

globs

moving

$ rmdir deleting
rmdir: failed to remove ‘deleting’: Directory not empty
$ ls -l deleting
total 0
drwxrwxr-x. 2 emma emma 6 Mar 26 14:58 directories
drwxrwxr-x. 2 emma emma 6 Mar 26 14:58 files
```
By default, rmdir refuses to delete a directory that is not empty. Use rmdir to remove one of the empty subdirectories of the deleting directory:
```console
$ ls -a deleting/files
.

..

$ rmdir deleting/files
$ ls -l deleting
directories
```
Deleting large numbers of files or deep directory structures with many subdirectories may seem tedious, but it is actually easy. By default, rm only works on regular files. The -r option is used to override this behavior. Be careful, rm -r is an excellent foot gun! When you use the -r option, rm will not only delete any directories, but everything within that directory, including subdirectories and their contents. See for yourself how rm -r works:
```console
$ ls
copying

creating

deleting

globs

moving

$ rm deleting
rm: cannot remove ‘deleting’: Is a directory
$ ls -l deleting
total 0
drwxrwxr-x. 2 emma emma 6 Mar 26 14:58 directories
$ rm -r deleting
$ ls
copying

creating

globs

moving
```
Notice how deleting is gone, even tough it was not empty? Like mv, rm has a -i option to prompt you before doing anything. Use rm -ri to remove directories from moving section that are no longer needed:
```console
$ find
.
./creating
./moving
./moving/dir2
./moving/dir2/file2
./moving/dir2/file3
./moving/dir3
./moving/dir3/file1
./globs
./globs/question1
./globs/question2012
./globs/question23
./globs/question13

./globs/question14
./globs/star10
./globs/star1100
./globs/star2002
./globs/star2013
./globs/question15
./copying
./copying/files
./copying/directories
$ rm -ri moving
rm: descend into directory ‘moving’? y
rm: descend into directory ‘moving/dir2’? y
rm: remove regular empty file ‘moving/dir2/file2’? y
rm: remove regular empty file ‘moving/dir2/file3’? y
rm: remove directory ‘moving/dir2’? y
rm: descend into directory ‘moving/dir3’? y
rm: remove regular empty file ‘moving/dir3/file1’? y
rm: remove directory ‘moving/dir3’? y
rm: remove directory ‘moving’? y
```
#### Copying Files and Directories

The cp command is used to copy files and directories. Copy a few files into the copying directory:
```console
$ cd ~/linux_essentials-2.4/copying
$ ls
directories

files

$ cp /etc/nsswitch.conf files/nsswitch.conf
$ cp /etc/issue /etc/hostname files
```
If the last argument is a directory, cp will create a copy of the previous arguments inside the directory. Like mv, multiple files can be specified at once, as long as the target is a directory. When both operands of cp are files and both files exist, cp overwrites the second file with a copy of the first file. Let’s practice this by overwrite the issue file with the hostname file:
```console
$ cd ~/linux_essentials-2.4/copying/files
$ ls
hostname

issue

nsswitch.conf

$ cat hostname
mycomputer
$ cat issue

Debian GNU/Linux 9 \n \l
$ cp hostname issue
$ cat issue
mycomputer
```
Now let’s try to create a copy of the files directory within the directories directory:
```console
$ cd ~/linux_essentials-2.4/copying
$ cp files directories
cp: omitting directory ‘files’
```
As you can see, cp by default only works on individual files. To copy a directory, you use the -r option. Keep in mind that the -r option will cause cp to also copy the contents of the directory you are copying:
```console
$ cp -r files directories
$ find
.
./files
./files/nsswitch.conf
./files/fstab
./files/hostname
./directories
./directories/files
./directories/files/nsswitch.conf
./directories/files/fstab
./directories/files/hostname
```
Notice how when an existing directory was used as the destination, cp creates a copy of the source directory inside of it? If the destination doesn’t exist, it will create it and fill it with the contents of the source directory:
```console
$ cp -r files files2
$ find
.
./files
./files/nsswitch.conf
./files/fstab
./files/hostname
./directories

./directories/files
./directories/files/nsswitch.conf
./directories/files/fstab
./directories/files/hostname
./files2
./files2/nsswitch.conf
./files2/fstab
./files2/hostname
```
#### Globbing

What is commonly referred to as globbing is a simple pattern matching language. Command line shells on Linux systems use this language to refer to groups of files whose names match a specific pattern. POSIX.1-2017 specifies the following pattern matching characters: * Matches any number of any character, including no characters ? Matches any one character [] Matches a class of characters In English, this means you can tell your shell to match a pattern instead of a literal string of text. Usually Linux users specify multiple files with a glob instead of typing out each file name. Run the following commands:
```console
$ cd ~/linux_essentials-2.4/globs
$ ls
question1

question14

question2012

star10

star2002

question13

question15

question23

star1100

star2013

$ ls star1*
star10

star1100

$ ls star*
star10

star1100

star2002

star2013

$ ls star2*
star2002

star2013

$ ls star2*2
star2002
$ ls star2013*

star2013
```
The shell expands * to any number of anything, so your shell interprets star* to mean anything in the relevant context that starts with star. When you run the command ls star*, your shell doesn’t run the ls program with an argument of star*, it looks for files in the current directory that match the pattern star* (including just star), and turns each file matching the pattern into an argument to ls:
```console
$ ls star*

as far as ls is concerned is the equivalent of
$ ls star10

star1100

star2002

star2013
```
The * character doesn’t mean anything to ls. To prove this, run the following command:
```console
$ ls star\*
ls: cannot access star*: No such file or directory
```
When you precede a character with a \, you are instructing your shell not to interpret it. In this case, you want ls to have an argument of star* instead of what the glob star* expands to. The ? expands to any single character. Try the following commands to see for yourself:
```console
$ ls
question1

question14

question2012

star10

star2002

question13

question15

question23

star1100

star2013

$ ls question?
question1
$ ls question1?
question13

question14

question15

$ ls question?3
question13

question23

$ ls question13?
ls: cannot access question13?: No such file or directory
```
The [] brackets are used to match ranges or classes of characters. The [] brackets work like they do in POSIX regular expressions except with globs the ^ is used instead of !.
Create some files to experiment with:
```console
$ mkdir brackets
$ cd brackets
$ touch file1 file2 file3 file4 filea fileb filec file5 file6 file7
```
Ranges within [] brackets are expressed using a -:
```console
$ ls
file1

file2

file3

file4

file5

file6

file7

filea

filea

fileb

filec

fileb

filec

$ ls file[1-2]
file1

file2

$ ls file[1-3]
file1

file2

file3

Multiple ranges can be specified:
$ ls file[1-25-7]
file1

file2

file5

file6

file7

file5

file6

$ ls file[1-35-6a-c]
file1

file2

file3
```
Square brackets can also be used to match a specific set of characters.
```console
$ ls file[1a5]
file1

file5

filea
```
You can also use the ^ character as the first character to match everything except certain characters.
```console
$ ls file[^a]
file1

file2

file3

file4

file5

file6

file7

fileb

filec

The last thing we will cover in this lesson is character classes. To match a character class, you use
[:classname:]. For example, to use the digit class, which matches numerals, you would do
something like this:
$ ls file[[:digit:]]

file1

file2

file3

file4

file5

file6

file7

file5

file6

file7

$ touch file1a file11
$ ls file[[:digit:]a]
file1

file2

file3

file4

filea

$ ls file[[:digit:]]a
file1a
```
The glob file[[:digit:]a], matches file followed by a digit or a. The character classes supported depends on your current locale. POSIX requires the following character classes for all locales: [:alnum:] Letters and numbers. [:alpha:] Upper or lowercase letters. [:blank:] Spaces and tabs. [:cntrl:] Control characters, e.g. backspace, bell, NAK, escape. [:digit:] Numerals (0123456789). [:graph:] Graphic characters (all characters except ctrl and the space character) [:lower:] Lowercase letters (a-z). [:print:] Printable characters (alnum, punct, and the space character). [:punct:] Punctuation characters, i.e. !, &, ". [:space:] Whitespace characters, e.g. tabs, spaces, newlines.
**[:upper:]**
Uppercase letters (A-Z). [:xdigit:] Hexadecimal numerals (usually 0123456789abcdefABCDEF).
#### Guided Exercises

1. Given the following, select the directories that would be created by the command mkdir -p /tmp/outfiles/text/today /tmp/infiles/text/today $ pwd /tmp $ find . ./outfiles ./outfiles/text
**/tmp**
/tmp/outfiles /tmp/outfiles/text /tmp/outfiles/text/today /tmp/infiles /tmp/infiles/text /tmp/infiles/text/today
1. What does -v do for mkdir, rm, and cp?
2. What happens if you accidentally attempt to copy three files on the same command line to a file that already exists instead of a directory?
3. What happens when you use mv to move a directory into itself?
4. How would you delete all files in your current directory that start with old?
5. Which of the following files would log_[a-z]_201?_*_01.txt match? log_3_2017_Jan_01.txt log_+_2017_Feb_01.txt
**log_b_2007_Mar_01.txt**
log_f_201A_Wednesday_01.txt
1. Create a few globs to match the following list of file names: doc100 doc200 doc301 doc401
#### Explorational Exercises

1. Use the cp man page to find out how to make a copy of a file and have the permissions and modification time match the original.
2. What does the rmdir -p command do? Experiment with it and explain how it differs from rm -r.
3. DO NOT ACTUALLY EXECUTE THIS COMMAND: What do you think rm -ri /* will do? (HONESTLY, DO NOT ATTEMPT TO DO THIS!)
4. Other than using -i, is it possible to prevent mv from overwriting destination files?
5. Explain the command cp -u.
#### Summary

The Linux command line environment provides tools to manage files. Some commonly used ones are cp, mv, mkdir, rm, and rmdir. These tools, combined with globs, allow users to get a lot of work done very quickly. Many commands have a -i option, which prompts you before doing anything. Prompting can save you a lot of hassle if you mistyped something. A lot of commands have a -r option. The -r option usually means recursion. In mathematics and computer science, a recursive function is a function using itself in its definition. When it comes to command line tools, it usually means apply the command to a directory and everything in it. Commands used in this lesson:
**cat**
Read and output the contents of a file.
**cp**
Copy files or directories.
**echo**
Output a string.
**find**
Traverse a file system tree and search for files matching a specific set of criteria.
**ls**
Show properties of files and directories and list a directory’s contents.
**mkdir**
Create new directories.
**mv**
Move or rename files or directories.
**pwd**
Output the current working directory.
**rm**
Delete files or directories.
**rmdir**
Delete directories.
**touch**
Create new empty files or update an existing file’s modification timestamp.

### Answers

#### Guided Exercises

1. Given the following, select the directories that would be created by the command mkdir -p /tmp/outfiles/text/today /tmp/infiles/text/today $ pwd /tmp $ find . ./outfiles ./outfiles/text
The marked directories would be created. The directories /tmp, /tmp/outfiles, and /tmp/outfiles/text already exist, so mkdir will ignore them. /tmp /tmp/outfiles /tmp/outfiles/text /tmp/outfiles/text/today
X
/tmp/infiles
X
/tmp/infiles/text
X
/tmp/infiles/text/today
X
1. What does -v do for mkdir, rm, and cp? Typically -v turns on verbose output. It causes the respective programs to output what they are doing as they are doing it: $ rm -v a b removed 'a' removed 'b' $ mv -v a b 'a' -> 'b' $ cp -v b c 'b' -> 'c'
2. What happens if you accidentally attempt to copy three files on the same command line to a file that already exists instead of a directory?
cp will refuse to do anything and output an error message:
```console
$ touch a b c d
$ cp a b c d
cp: target 'd' is not a directory
```
1. What happens when you use mv to move a directory into itself? You will get an error message telling you mv cannot do that. $ mv a a mv: cannot move 'a' to a subdirectory of itself, 'a/a'
2. How would you delete all files in your current directory that start with old? You would use the glob old* with rm: $ rm old*
3. Which of the following files would log_[a-z]_201?_*_01.txt match? log_3_2017_Jan_01.txt log_+_2017_Feb_01.txt log_b_2007_Mar_01.txt log_f_201A_Wednesday_01.txt
X
```console
$ ls log_[a-z]_201?_*_01.txt
log_f_201A_Wednesday_01.txt

log_[a-z]
matches
log_
followed
by
any
lower
case
letter,
so
both
log_f_201A_Wednesday_01.txt and log_b_2007_Mar_01.txt match. _201? matches any
single character, so only log_f_201A_Wednesday_01.txt matches. Finally *_01.txt matches
anything that ends with _01.txt, so our remaining option matches.
```
1. Create a few globs to match the following list of file names: doc100 doc200
**doc301**
doc401
There are several solutions. Here are some of them: doc* doc[1-4]* doc?0? doc[1-4]0?

#### Explorational Exercises

1. Use the cp man page to find out how to make a copy of a file and have the permissions and modification time match the original. You would use the -p option. From the man page: $ man cp -p
same as --preserve=mode,ownership,timestamps
**--preserve[=ATTR_LIST]**
preserve the specified attributes (default: mode,ownership,timestamps), if
possible
additional
attributes:
context,
links,
xattr, all
1. What does the rmdir -p option do? Experiment with it and explain how it differs from rm -r. It causes rmdir to behave similarly to mkdir -p. If passed a tree of empty directories, it will remove all of them. $ find . ./a ./a/b ./a/b/c $ rmdir -p a/b/c $ ls
2. DO NOT ACTUALLY EXECUTE THIS COMMAND: What do you think rm -ri /* will do? (HONESTLY, DO NOT ATTEMPT TO DO THIS!) It will remove all files and directories writable by your user account. This includes any network file systems.
3. Other than using -i, is it possible to prevent mv from overwriting destination files? Yes, the -n or --no-clobber option prevents mv from overwriting files. $ cat a a $ cat b b
```console
$ mv -n a b
$ cat b
b
```
1. Explain cp -u. The -u option causes cp to only copy a file if the destination is missing or is older than the source file. $ ls -l total 24K drwxr-xr-x 123 emma student
12K Feb
2 05:34 ..
drwxr-xr-x
2 emma student 4.0K Feb
2 06:56 .
-rw-r--r--
1 emma student
2 Feb
2 06:56 a
-rw-r--r--
1 emma student
2 Feb
2 07:00 b
```console
$ cat a
a
$ cat b
b
$ cp -u a b
$ cat b
b
$ cp -u a c
$ ls -l
total 12
-rw-r--r-- 1 emma student 2 Feb

2 06:56 a

-rw-r--r-- 1 emma student 2 Feb

2 07:00 b

-rw-r--r-- 1 emma student 2 Feb

2 07:00 c
```
