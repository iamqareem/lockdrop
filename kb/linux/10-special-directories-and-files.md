---
id: linux-10
title: "Special Directories and Files"
slug: 10-special-directories-and-files
source: "LPI Learning Material 010-160"
sourceSection: "5.4"
topic: "5"
tags: [linux, lpic-1, temporary-files, links, symlinks]
summary: "Temporary directories, hidden files, hard links and symbolic links: the special places a Linux filesystem uses to keep itself tidy."
---
# Security and File Permissions

## 5.4 Special Directories and Files

**Exam objective:** Linux Essentials v1.6, Exam 010, Objective 5.4
**Weight:** 1
**Key knowledge areas**
- Using temporary files and directories
- Symbolic links
**Partial list of the used files, terms and utilities**
- /tmp/, /var/tmp/ and Sticky Bit
- ls -d
- ln -s

### 5.4 Lesson 1

#### Introduction

On Linux, everything is treated as a file. However, some files get a special treatment, either because of the place they are stored, such as temporary files, or the way they interact with the filesystem, such as links. In this lesson, we will learn where such files are located, how they work and how to manage them.
#### Temporary Files

Temporary files are files used by programs to store data that is only needed for a short time. These can be the data of running processes, crash logs, scratch files from an autosave, intermediary files used during a file conversion, cache files and so on.
**Location of temporary files**
Version 3.0 of the Filesystem Hierarchy Standard (FHS) defines standard locations for temporary files on Linux systems. Each location has a different purpose and behavior, and it is recommended that developers follow the conventions set by the FHS when writing temporary data to disk.
**/tmp**
According to the FHS, programs should not assume that files written here will be preserved between invocations of a program. The recommendation is that this directory be cleared (all files erased) during system boot-up, although this is not mandatory. /var/tmp Another location for temporary files, but this one should not be cleared during the system bootup, i.e. files stored here will usually persist between reboots. /run This directory contains run-time variable data used by running processes, such as process identifier files (.pid). Programs that need more than one run-time file may create subdirectories here. This location must be cleared during system boot-up. The purpose of this directory was once served by /var/run, and on some systems /var/run may be a symbolic link to /run. Note that there is nothing which prevents a program to create temporary files elsewhere on the system, but it is good practice to respect the conventions set by the FHS.
**Permissions on temporary files**
Having system-wide temporary directories on a multiuser system presents some challenges regarding access permissions. At first thought one may think that such directories would be “world-writable”, i.e. any user could write or delete data in it. But if this were to be true, how could we prevent a user from erasing or modifying files created by another? The solution is a special permission called the sticky bit, which applies both to directories and files. However, for security reasons, the Linux kernel ignores the sticky bit when it is applied to files. When this special bit is set for a directory, it prevents users from removing or renaming a file within that directory unless they own the file. Directories with the sticky bit set show a t replacing the x on the permission for others in the output of ls -l. For example, let’s check the permissions for the /tmp and /var/tmp directories:
```console
$ ls -ldh /tmp/ /var/tmp/
drwxrwxrwt 25 root root 4,0K Jun

7 18:52 /tmp/

drwxrwxrwt 16 root root 4,0K Jun

7 09:15 /var/tmp/
```
As you can see by the t replacing the x on the permission for others, both directories have the sticky bit set.
To set the sticky bit on a directory using chmod in numeric mode, use the four-digit notation and 1 as the first digit. For example:
```console
$ chmod 1755 temp

will set the sticky bit for the directory named temp and the permissions as rwxr-xr-t.
```
When using the symbolic mode, use the parameter t. So, +t to set the sticky bit, and -t to disable it. Like so:
```console
$ chmod +t temp
```
#### Understanding Links

We have already said that on Linux everything is treated as a file. But there is a special kind of file, called a link, and there are two types of links on a Linux system:
**Symbolic links**
Also called soft links, they point to the path of another file. If you delete the file the link points to (called target) the link will still exist, but it “stops working”, as it now points to “nothing”.
**Hard links**
Think of a hard link as a second name for the original file. They are not duplicates, but instead are an additional entry in the file system pointing to the same place (inode) on the disk.
**TIP**
An inode is a data structure that stores attributes for an object (like a file or directory) on a filesystem. Among those attributes are the filename, permissions, ownership and on which blocks of the disk the data for the object is stored. Think of it as an entry on an index, hence the name, which comes from “index node”.
**Working with Hard Links**

**Creating Hard Links**
The command to create a hard link on Linux is ln. The basic syntax is:
```console
$ ln TARGET LINK_NAME
```
The TARGET must exist already (this is the file the link will point to), and if the target is not on the
current directory, or if you want to create the link elsewhere, you must specify the full path to it. For example, the command
```console
$ ln target.txt /home/carol/Documents/hardlink

will create a file named hardlink on the directory /home/carol/Documents/, linked to the file
target.txt on the current directory.
```
If you leave out the last parameter (LINK_NAME), a link with the same name as the target will be created in the current directory. Managing Hard Links Hard links are entries in the filesystem which have different names but point to the same data on disk. All such names are equal and can be used to refer to a file. If you change the contents of one of the names, the contents of all other names pointing to that file change since all these names point to the very same data. If you delete one of the names, the other names will still work. This happens because when you “delete” a file the data is not actually erased from the disk. The system simply deletes the entry on the filesystem table pointing to the inode corresponding to the data on the disk. But if you have a second entry pointing to the same inode, you can still get to the data. Think of it as two roads converging on the same point. Even if you block or redirect one of the roads, you can still reach the destination using the other. You can check this by using the -i parameter of ls. Consider the following contents of a directory:
```console
$ ls -li
total 224
3806696 -r--r--r-- 2 carol carol 111702 Jun

7 10:13 hardlink

3806696 -r--r--r-- 2 carol carol 111702 Jun

7 10:13 target.txt
```
The number before the permissions is the inode number. See that both the file hardlink and the file target.txt have the same number (3806696)? This is because one is a hard link of the other. But which one is the original and which one is the link? You can’t really tell, as for all practical purposes they are the same. Note that every hard link pointing to a file increases the link count of the file. This is the number right after the permissions on the output of ls -l. By default, every file has a link count of 1 (directories have a count of 2), and every hard link to it increases the count by one. So, that is the reason for the link count of 2 on the files in the listing above.
In contrast to symbolic links, you can only create hard links to files, and both the link and target must reside in the same file system. Moving and Removing Hard Links Since hard links are treated as regular files, they can be deleted with rm and renamed or moved around the filesystem with mv. And since a hard link points to the same inode of the target, it can be moved around freely, without fear of “breaking” the link.
**Symbolic links**

**Creating Symbolic Links**
The command used to create a symbolic link is also ln, but with the -s parameter added. Like so:
```console
$ ln -s target.txt /home/carol/Documents/softlink
```
This will create a file named softlink in the directory /home/carol/Documents/, pointing to the file target.txt in the current directory. As with hard links, you can omit the link name to create a link with the same name as the target in the current directory. Managing Symbolic Links Symbolic links point to another path in the filesystem. You can create soft links to files and directories, even on different partitions. It is pretty easy to spot a symbolic link on the output of ls:
```console
$ ls -lh
total 112K
-rw-r--r-- 1 carol carol 110K Jun

7 10:13 target.txt

lrwxrwxrwx 1 carol carol

7 10:14 softlink -> target.txt

12 Jun
```
In the example above, the first character on the permissions for the file softlink is l, indicating a symbolic link. Furthermore, just after the filename we see the name of the target the link points to, the file target.txt. Note that on file and directory listings, soft links themselves always show the permissions rwx for the user, the group and others, but in practice the access permissions for them are the same as those for the target. Moving and Removing Symbolic Links Like hard links, symbolic links can be removed using rm and moved around or renamed using mv. However, special care should be taken when creating them, to avoid “breaking” the link if it is moved from its original location. When creating symbolic links you should be aware that unless a path is fully specified the location of the target is interpreted as relative to the location of the link. This may create problems if the link, or the file it points to, is moved. This is easier to understand with an example. Say that we have a file named original.txt in the current directory, and we want to create a symbolic link to it called softlink. We could use:
```console
$ ln -s original.txt softlink
```
And apparently all would be well. Let’s check with ls:
```console
$ ls -lh
total 112K
-r--r--r-- 1 carol carol 110K Jun

7 10:13 original.txt

lrwxrwxrwx 1 carol carol

7 19:23 softlink -> original.txt

12 Jun
```
See how the link is constructed: softlink points to (→) original.txt. However, let’s see what happens if we move the link to the parent directory and try to display its contents using the command less:
```console
$ mv softlink ../
$ less ../softlink
../softlink: No such file or directory
```
Since the path to original.txt was not specified, the system assumes that it is in the same directory as the link. When this is no longer true, the link stops working. The way to prevent this is to always specify the full path to the target when creating the link:
```console
$ ln -s /home/carol/Documents/original.txt softlink
```
This way, no matter where you move the link it will still work, because it points to the absolute location of the target. Check with ls:
```console
$ ls -lh
total 112K
lrwxrwxrwx 1 carol carol

40 Jun
7 19:34 softlink -> /home/carol/Documents/original.txt
```
#### Guided Exercises

1. Imagine a program needs to create a one-use temporary file that will never be needed again after the program is closed. What would be the correct directory in which to to create this file?
2. Which is the temporary directory that must be cleared during the boot process?
3. What is the parameter for chmod in symbolic mode to enable the sticky bit on a directory?
4. Imagine there is a file named document.txt on the directory /home/carol/Documents. What is the command to create a symbolic link to it named text.txt on the current directory?
5. Explain the difference between a hard link to a file and a copy of this file.
#### Explorational Exercises

1. Imagine that inside a directory you create a file called recipes.txt. Inside this directory, you will also create a hard link to this file, called receitas.txt, and a symbolic (or soft) link to this called rezepte.txt. $ touch recipes.txt $ ln recipes.txt receitas.txt $ ln -s receitas.txt rezepte.txt
The contents of the directory should appear like so:
```console
$ ls -lhi
total 160K
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 receitas.txt
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 recipes.txt
5388837 lrwxrwxrwx 1 carol carol

12 jun 24 10:12 rezepte.txt -> receitas.txt
```
Remember that, as a hard link, receitas.txt points to the same inode that recipes.txt. What would happen to the soft link rezepte.txt if the name receitas.txt is deleted? Why?
1. Imagine you have a flash drive plugged into your system, and mounted on /media/youruser/FlashA. You want to create in your home directory a link called schematics.pdf, pointing to the file esquema.pdf in the root directory of the flash drive. So, you type the command: $ ln /media/youruser/FlashA/esquema.pdf ~/schematics.pdf
What would happen? Why?
1. Consider the following output of ls -lah: $ ls -lah total 3,1M drwxr-xr-x 2 carol carol 4,0K jun 17 17:27 . drwxr-xr-x 5 carol carol 4,0K jun 17 17:29 .. -rw-rw-r-- 1 carol carol 2,8M jun 17 15:45 compressed.zip -rw-r--r-- 4 carol carol
77K jun 17 17:25 document.txt
-rw-rw-r-- 1 carol carol 216K jun 17 17:25 image.png
-rw-r--r-- 4 carol carol
77K jun 17 17:25 text.txt
◦ How many links point to the file document.txt?
◦ Are they soft or hard links?
◦ Which parameter should you pass to ls to see which inode each file occupies?
1. Imagine you have in your ~/Documents directory a file named clients.txt containing some client names, and a directory named somedir. Inside this there is a different file also named clients.txt with different names. To replicate this structure, use the following commands. $ cd ~/Documents $ echo "John, Michael, Bob" > clients.txt $ mkdir somedir $ echo "Bill, Luke, Karl" > somedir/clients.txt
You then create a link inside somedir named partners.txt pointing to this file, with the commands:
```console
$ cd somedir/
$ ln -s clients.txt partners.txt

So, the directory structure is:
```
**Documents**
|-- clients.txt `-- somedir |-- clients.txt `-- partners.txt -> clients.txt
Now, you move partners.txt from somedir to ~/Documents, and list its contents.
```console
$ cd ~/Documents/
$ mv somedir/partners.txt .
$ less partners.txt
```
Will the link still work? If so, which file will have its contents listed? Why?
1. Consider the following files: -rw-r--r-- 1 carol carol 19 Jun 24 11:12 clients.txt lrwxrwxrwx 1 carol carol 11 Jun 24 11:13 partners.txt -> clients.txt
What are the access permissions for partners.txt? Why?
#### Summary

In this lesson, you learned:
- Where temporary files are stored.
- What is the special permission applied to them.
- What links are.
- The difference between symbolic and hard links.
- How to create links.
- How to move, rename or remove them.
The following commands were discussed in this lesson:
- ln
- The -i parameter to ls

### Answers

#### Guided Exercises

1. Imagine a program needs to create a one-use temporary file that will never be needed again after the program is closed. What would be the correct directory in which to create this file? Since we don’t care about the file after the program finishes running, the correct directory is /tmp.
2. Which is the temporary directory that must be cleared during the boot process? The directory is /run or, on some systems, /var/run.
3. What is the parameter for chmod in symbolic mode to enable the sticky bit on a directory? The symbol for the sticky bit in symbolic mode is t. Since we want to enable (add) this permission to the directory, the parameter should be +t.
4. Imagine there is a file named document.txt on the directory /home/carol/Documents. What is the command to create a symbolic link to it named text.txt in the current directory? ln -s is the command to create a symbolic link. Since you should specify the full path to the file you are linking to, the command is: $ ln -s /home/carol/Documents/document.txt text.txt
5. Explain the difference between a hard link to a file and a copy of this file. A hard link is just another name for a file. Even though it looks like a duplicate of the original file, for all purposes both the link and the original are the same, as they point to the same data on disk. Changes made to the contents of the link will be reflected on the original, and viceversa. A copy is a completely independent entity, occupying a different place on disk. Changes to the copy will not be reflected on the original, and vice-versa.

#### Explorational Exercises

1. Imagine that inside a directory you create a file called recipes.txt. Inside this directory, you will also create a hard link to this file, called receitas.txt, and a symbolic (or soft) link to this called rezepte.txt. $ touch recipes.txt $ ln recipes.txt receitas.txt $ ln -s receitas.txt rezepte.txt
The contents of the directory should be like so:
```console
$ ls -lhi
total 160K
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 receitas.txt
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 recipes.txt
5388837 lrwxrwxrwx 1 carol carol

12 jun 24 10:12 rezepte.txt -> receitas.txt
```
Remember that, as a hard link, receitas.txt points to the same inode that recipes.txt. What would happen to the soft link rezepte.txt if the name receitas.txt is deleted? Why? The soft link rezepte.txt would stop working. This is because soft links point to names, not inodes, and the name receitas.txt no longer exists, even if the data is still on the disk under the name recipes.txt.
1. Imagine you have a flash drive plugged into your system, and mounted on /media/youruser/FlashA. You want to create in your home directory a link called schematics.pdf, pointing to the file esquema.pdf in the root directory of the flash drive. So, you type the command: $ ln /media/youruser/FlashA/esquema.pdf ~/schematics.pdf
What would happen? Why? The command would fail. The error message would be Invalid cross-device link, and it makes the reason clear: hard links cannot point to a target in a different partition or device. The only way to create a link like this is to use a symbolic or soft link, adding the -s parameter to ln.
1. Consider the following output of ls -lah:
```console
$ ls -lah
total 3,1M
drwxr-xr-x 2 carol carol 4,0K jun 17 17:27 .
drwxr-xr-x 5 carol carol 4,0K jun 17 17:29 ..
-rw-rw-r-- 1 carol carol 2,8M jun 17 15:45 compressed.zip
-rw-r--r-- 4 carol carol

77K jun 17 17:25 document.txt

-rw-rw-r-- 1 carol carol 216K jun 17 17:25 image.png
-rw-r--r-- 4 carol carol

77K jun 17 17:25 text.txt

◦ How many links point to the file document.txt?
```
Every file starts with a link count of 1. Since the link count for the file is 4, there are three links pointing to that file. ◦ Are they soft or hard links? They are hard links, since soft links do not increase the link count of a file. ◦ Which parameter should you pass to ls to see which inode each file occupies? The parameter is -i. The inode will be shown as the first column in the output of ls, like below:
```console
$ ls -lahi
total 3,1M
5388773 drwxr-xr-x 2 rigues rigues 4,0K jun 17 17:27 .
5245554 drwxr-xr-x 5 rigues rigues 4,0K jun 17 17:29 ..
5388840 -rw-rw-r-- 1 rigues rigues 2,8M jun 17 15:45 compressed.zip
5388833 -rw-r--r-- 4 rigues rigues

77K jun 17 17:25 document.txt

5388837 -rw-rw-r-- 1 rigues rigues 216K jun 17 17:25 image.png
5388833 -rw-r--r-- 4 rigues rigues

77K jun 17 17:25 text.txt
```
1. Imagine you have in your ~/Documents directory a file named clients.txt containing some client names, and a directory named somedir. Inside this there is a different file also named clients.txt with different names. To replicate this structure, use the following commands. $ cd ~/Documents $ echo "John, Michael, Bob" > clients.txt $ mkdir somedir $ echo "Bill, Luke, Karl" > somedir/clients.txt
You then create a link inside somedir named partners.txt pointing to this file, with the commands:
```console
$ cd somedir/
$ ln -s clients.txt partners.txt

So, the directory structure is:
```
**Documents**
|-- clients.txt `-- somedir |-- clients.txt `-- partners.txt -> clients.txt
Now, you move partners.txt from somedir to ~/Documents, and list its contents.
```console
$ cd ~/Documents/
$ mv somedir/partners.txt .
$ less partners.txt
```
Will the link still work? If so, which file will have its contents listed? Why? This is a “tricky” one, but the link will work, and the file listed will be the one in ~/Documents, containing the names John, Michael, Bob. Remember that since you did not specify the full path to the target clients.txt when creating the soft link partners.txt, the target location will be interpreted as being relative to the location of the link, which in this case is the current directory. When the link was moved from ~/Documents/somedir to ~/Documents, it should stop working, since the target was no longer in the same directory as the link. However, it just so happens that there is a file named clients.txt on ~/Documents, so the link will point to this file, instead of the original target inside ~/somedir. To avoid this, always specify the full path to the target when creating a symbolic link.
1. Consider the following files: -rw-r--r-- 1 rigues rigues 19 Jun 24 11:12 clients.txt lrwxrwxrwx 1 rigues rigues 11 Jun 24 11:13 partners.txt -> clients.txt
What are the access permissions for partners.txt? Why? The access permissions for partners.txt are rw-r—r--, as links always inherit the same access permissions as the target.
**Imprint**
© 2024 by Linux Professional Institute: Learning Materials, “Linux Essentials (Version 1.6)”. PDF generated: 2024-10-27 This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0). To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/ While Linux Professional Institute has used good faith efforts to ensure that the information and instructions contained in this work are accurate, Linux Professional Institute disclaims all responsibility for errors or omissions, including without limitation responsibility for damages resulting from the use of or reliance on this work. Use of the information and instructions contained in this work is at your own risk. If any code samples or other technology this work contains or describes is subject to open source licenses or the intellectual property rights of others, it is your responsibility to ensure that your use thereof complies with such licenses and/or rights. The LPI Learning Materials are an initiative of Linux Professional Institute (https://lpi.org). Learning Materials and their translations can be found at https://learning.lpi.org. For questions and comments on this edition as well as on the entire project write an email to: learning@lpi.org.
