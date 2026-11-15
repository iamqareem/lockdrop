---
id: lpi-101-500-08
title: "LPIC-1 · 101-500 — Create a directory named emptydir using the command mkdir…",
slug: lpi-101-500-08-lpic-1-101-500-create-a-directory-named-emptydir-using-the-c
source: "LPI Learning Material — LPIC-1 (Exam 101-500)",
sourceSection: "1. Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list, 2. Create an empty file named emptyfile with the command touch emptyfile. Now, using, 4. Let us assume a file named test.sh is a shell script with the following permissions and, 33. Dec 11 10:36 test.sh, 5. C"
track: linux-engineer,
tier: free
tags: [linux, lpic-1, certification, system-administration]
summary: "Write down the corresponding permissions for each file and directory using octal mode using Covers 40 sections: Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list, Create an empty file named empt.",
---
# LPIC-1 · 101-500 — Create a directory named emptydir using the command mkdir…

## 2. Create an empty file named emptyfile with the command touch emptyfile. Now, using
chmod in symbolic mode, add execute permissions for the owner of the file emptyfile, and
remove write and execute permissions for everyone else. Do this using only one chmod

3. What would the default permissions for a file be if the umask value is set to 027?

## 4. Let us assume a file named test.sh is a shell script with the following permissions and
ownership:
-rwxr-sr-x 1 carol root

## 33. Dec 11 10:36 test.sh

- What are the permissions for the owner of the file?

- Using the octal notation, what would the syntax of chmod be to “unset” the special
permission granted to this file?

## 5. Consider this file:
$ ls -l /dev/sdb1
brw-rw---- 1 root disk 8, 17 Dec 21 18:51 /dev/sdb1

Which type of file is sdb1? Who can write to it?

## 6. Consider the following 4 files:
drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory

498

----r--r-- 1 carol carol

## 0. Dec 11 10:55 foo.bar

-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip
drwxr-sr-x 2 carol users

4,0K Jan 18 17:26 Sample_Directory

Write down the corresponding permissions for each file and directory using octal mode using
the 4-digit notation.
Another_Directory
foo.bar
HugeFile.zip
Sample_Directory

499

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Try this on a terminal: create an empty file called emptyfile with the command touch
emptyfile. Now “zero out” the permissions for the file with chmod 000 emptyfile. What will
happen if you change the permissions for emptyfile by passing only one value for chmod in
octal mode, like chmod 4 emptyfile? And if you use two, as in chmod 44 emptyfile? What
can we learn about the way chmod reads the numerical value?

## 2. Consider the permissions for the temporary directory on a Linux system, /tmp:
$ ls -l /tmp
drwxrwxrwt

19 root root

16K Dec 21 18:58 tmp

User, group and others have full permissions. But can a regular user delete any files inside this
directory? Why is this the case?

3. A file called test.sh has the following permissions: -rwsr-xr-x, meaning the SUID bit is set.
Now, run the following commands:
$ chmod u-x test.sh
-rwSr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh

What did we do? What does the uppercase S mean?

## 4. How would you create a directory named Box where all the files are automatically owned by
the group users, and can only be deleted by the user who created them?

500

In this lesson you have learned how to use ls to get (and decode) information about file
permissions, how to control or change who can create, delete or modify a file with chmod, both in
octal and symbolic modes, how to change the ownership of files with chown and chgrp and how to
query and change the default permissions mask for files and directories with umask
ls
List files, optionally including details such as permissions.
chmod
Change the permissions of a file or directory.
chown
Change the owning user and/or group of a file or directory.
chgrp
Change the owning group of a file or directory.
umask
Query, or set, the default permissions mask for files and directories

501

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list
the permissions for the directory emptydir.
Add the -d parameter to ls to see the file attributes of a directory, instead of listing its
contents. So, the answer is:
ls -l -d emptydir

Bonus points if you merged the two parameters in one, as in ls -ld emptydir.
2. Create an empty file named emptyfile with the command touch emptyfile. Now, using
chmod on symbolic mode, add execute permissions for the owner of the file emptyfile, and
remove write and execute permissions for everyone else. Do this using only one chmod
Think about it this way:
- “For the user who owns the file (u) add (+) execute (x) permissions”, so u+x.
- “For the group (g) and other users (o), remove (-) write (w) and execute (x) permissions”, so
go-wx.
To combine these two sets of permissions, we add a comma between them. So the final
result is:
chmod u+x,go-wx emptyfile

3. What would the default permissions be for a file if the umask value is set to 027?
The permissions would be rw-r----4. Let us assume a file named test.sh is a shell script with the following permissions and
ownership:
-rwxr-sr-x 1 carol root

## 33. Dec 11 10:36 test.sh

- What are the permissions for the owner of the file?
The permissions for the owner (2nd to 4th characters in the output of ls -l) are rwx, so the
502

answer is: “to read, to write to and to execute the file”.
- Using the octal notation, which should be the syntax of chmod to “unset” the special
permission granted to this file?
We can “unset” the special permissions by passing a 4th digit, 0, to chmod. The current
permissions are 755, so the command should be chmod 0755.
5. Consider this file:
$ ls -l /dev/sdb1
brw-rw---- 1 root disk 8, 17 Dec 21 18:51 /dev/sdb1

Which type of file is sdb1? Who can write to it?
The first character on the output of ls -l shows the type of file. b is a block device, usually a
disk (internal or external), connected to the machine. The owner (root) and any users of the
group disk can write to it.
6. Consider the following 4 files:
drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory
----r--r-- 1 carol carol

## 0. Dec 11 10:55 foo.bar

-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip
drwxr-sr-x 2 carol users 4,0K Jan 18 17:26 Sample_Directory

Write down the corresponding permissions for each file and directory using octal mode using
the 4-digit notation.
The corresponding permissions, in octal mode, are as follows:
Another_Directory

1755. 1 for the sticky bit, 755 for the regular
permissions (rwx for the user, r-x for group
and others).

foo.bar

## 0044. No special permissions (so the first digit
is 0), no permissions for the user (---) and
just read (r—r--) for group and others.

HugeFile.zip

## 0664. No special permissions, so the first digit
is 0. 6 (rw-) for the user and group, 4 (r--) for
the others.

503

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Sample_Directory

504

2755. 2 for the SGID bit, 7 (rwx) for the user, 5
(r-x) for the group and others.

## 1. Try this on a terminal: create an empty file called emptyfile with the command touch
emptyfile. Now “zero out” the permissions for the file with chmod 000 emptyfile. What will
happen if you change the permissions for emptyfile by passing only one value for chmod in
octal mode, like chmod 4 emptyfile? And if you use two, as in chmod 44 emptyfile? What
can we learn about the way chmod reads the numerical value?
Remember that we “zeroed out” the permissions for emptyfile. So, its initial state would be:
---------- 1 carol carol

## 0. Dec 11 10:55 emptyfile

Now, let us try the first command, chmod 4 emptyfile:
$ chmod 4 emptyfile
$ ls -l emptyfile
-------r-- 1 carol carol 0 Dec 11 10:55 emptyfile

See? The permissions for others were changed. And what if we try two digits, like in chmod 44
emptyfile?
$ chmod 44 emptyfile
$ ls -l emptyfile
----r--r-- 1 carol carol 0 Dec 11 10:55 emptyfile

Now, the permissions for group and others were affected. From this, we can conclude that in
octal mode chmod reads the value “backwards”, from the least significant digit (others) to the
most significant one (user). If you pass one digit, you modify the permissions for others. With
two digits you modify group and others, and with three you modify user, group and others and
with four digits you modify user, group, others and the special permissions.
2. Consider the permissions for the temporary directory on a Linux system, /tmp:
$ ls -l /tmp
drwxrwxrwt

19 root root

16K Dec 21 18:58 tmp

User, group and others have full permissions. But can a regular user delete any files inside this
directory? Why is this the case?

505

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

/tmp is what we call a world writeable directory, meaning that any user can write to it. But we
don’t want one user messing with files created by others, so the sticky bit is set (as indicated by
the t on the permissions for others). This means that a user can delete files on /tmp, but only
those created by himself.
3. A file called test.sh has the following permissions: -rwsr-xr-x, meaning the SUID bit is set.
Now, run the following commands:
$ chmod u-x test.sh
-rwSr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh

What did we do? What does the uppercase S mean?
We removed execute permissions for the user who owns the file. The s (or t) takes the place of
the x on the output of ls -l, so the system needs a way to show if the user has execute
permissions or not. It does this by changing the case of the special character.
A lowercase s on the first group of permissions means that the user who owns the file has
execute permissions and that the SUID bit is set. An uppercase S means that the user who owns
the file lacks (-) execute permissions and that the SUID bit is set.
The same can be said for SGID, a lowercase s on the second group of permissions means that
the group who owns the file has execute permissions and that the SGID bit is set. An uppercase
S means that the group who owns the file lacks (-) execute permissions and that the SGID bit is
set.
This is also true for the sticky bit, represented by the t on the third group of permissions.
Lowercase t means sticky bit set and that others have execute permissions. Uppercase T means
sticky bit set and that others do not have execute permissions.
4. How would you create a directory named Box where all the files are automatically owned by
the group users, and can only be deleted by the user who created them?
This is a multi-step process. The first step is to create the directory:
$ mkdir Box

We want every file created inside this directory to be automatically assigned to the group
users. We can do this by setting this group as the owner of the directory, and then by setting
the SGID bit on it. We also need to make sure that any member of the group can write to that

506

directory.
Since we do not care about what the other permissions are, and want to “flip” only the special
bits, it makes sense to use the symbolic mode:
$ chown :users Box/
$ chmod g+wxs Box/

Note that if your current user does not belong to the group users, you will have to use the
command sudo before the commands above to do the change as root.
Now for the last part, making sure that only the user who created a file is allowed to delete it.
This is done by setting the sticky bit (represented by a t) on the directory. Remember that it is
set on the permissions for others (o).
$ chmod o+t Box/

The permissions on the directory Box should be as follows:
drwxrwsr-t 2 carol users

4,0K Jan 18 19:09 Box

Of course, you can specify SGID and the sticky bit using only one chmod command:
$ chmod g+wxs,o+t Box/

Bonus points if you thought of that.

507

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.6 Create and change hard and symbolic links
LPIC-1 version 5.0, Exam 101, Objective 104.6
- Create links.
- Identify hard and/or soft links.
- Copying versus linking files.
- Use links to support system administration tasks.
- ln
- ls

508

### 104.6 Lesson 1

### 104.6 Create and change hard and symbolic
links

On Linux some files get a special treatment either because of the place they are stored in, such as
temporary files, or the way they interact with the filesystem, like links. In this lesson you will
learn what links are and how to manage them.

Understanding Links
As already mentioned, on Linux everything is treated as a file. But there is a special kind of file,
called a link, and there are two types of links on a Linux system:
Symbolic links
Also called soft links, they point to the path of another file. If you delete the file the link points
to (called target) the link will still exist, but it “stops working”, as it now points to “nothing”.
Hard links
Think of a hard link as a second name for the original file. They are not duplicates, but instead

509

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

are an additional entry in the filesystem pointing to the same place (inode) on the disk.

An inode is a data structure that stores attributes for an object (like a file or directory)
on a filesystem. Among those attributes are permissions, ownership and on which
blocks of the disk the data for the object is stored. Think of it as an entry on an index,
hence the name, which comes from “index node”.

Working with Hard Links
Creating Hard Links
The command to create a hard link on Linux is ln. The basic syntax is:
$ ln TARGET LINK_NAME

The TARGET must exist already (this is the file the link will point to), and if the target is not on the
current directory, or if you want to create the link elsewhere, you must specify the full path to it.
For example, the command:
$ ln target.txt /home/carol/Documents/hardlink

will create a file named hardlink on the directory /home/carol/Documents/, linked to the file
target.txt on the current directory.
If you leave out the last parameter (LINK_NAME), a link with the same name as the target will be
created in the current directory.
Managing Hard Links
Hard links are entries in the filesystem which have different names but point to the same data on
disk. All such names are equal and can be used to refer to a file. If you change the contents of one
of the names, the contents of all other names pointing to that file change since all these names
point to the very same data. If you delete one of the names, the other names will still work.
This happens because when you “delete” a file the data is not actually erased from the disk. The
system simply deletes the entry on the filesystem table pointing to the inode corresponding to the
data on the disk. But if you have a second entry pointing to the same inode, you can still get to the
data. Think of it as two roads converging on the same point. Even if you block or redirect one of
the roads, you can still reach the destination using the other.

510

You can check this by using the -i parameter of ls. Consider the following contents of a directory:
$ ls -li
total 224
3806696 -r--r--r-- 2 carol carol 111702 Jun

7 10:13 hardlink

3806696 -r--r--r-- 2 carol carol 111702 Jun

7 10:13 target.txt

The number before the permissions is the inode number. See that both the file hardlink and the
file target.txt have the same number (3806696)? This is because one is a hard link of the other.
But which one is the original and which one is the link? You cannot really tell, as for all practical
purposes they are the same.
Note that every hard link pointing to a file increases the link count of the file. This is the number
right after the permissions on the output of ls -l. By default, every file has a link count of 1
(directories have a count of 2), and every hard link to it increases the count by one. So, that is the
reason for the link count of 2 on the files in the listing above.
In contrast to symbolic links, you can only create hard links to files, and both the link and target
must reside in the same filesystem.
Moving and Removing Hard Links
Since hard links are treated as regular files, they can be deleted with rm and renamed or moved
around the filesystem with mv. And since a hard link points to the same inode of the target, it can
be moved around freely, without fear of “breaking” the link.

Symbolic Links
Creating Symbolic Links
The command used to create a symbolic link is also ln, but with the -s parameter added. Like so:
$ ln -s target.txt /home/carol/Documents/softlink

This will create a file named softlink in the directory /home/carol/Documents/, pointing to
the file target.txt on the current directory.
As with hard links, you can omit the link name to create a link with the same name as the target in
the current directory.

511

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Managing Symbolic Links
Symbolic links point to another path in the filesystem. You can create soft links to files and
directories, even on different partitions. It is pretty easy to spot a symbolic link with the output of
the ls command:
total 112K
-rw-r--r-- 1 carol carol 110K Jun

7 10:13 target.txt

lrwxrwxrwx 1 carol carol

7 10:14 softlink -> target.txt

12 Jun

In the example above, the first character on the permissions for the file softlink is l, indicating
a symbolic link. Furthermore, just after the filename you see the name of the target the link points
to, the file target.txt.
Note that on file and directory listings, soft links themselves always show the permissions rwx for
the user, the group and others, but in practice the access permissions for them are the same as
those for the target.
Moving and Removing Symbolic Links
Like hard links, symbolic links can be removed using rm and moved around or renamed using mv.
However, special care should be taken when creating them, to avoid “breaking” the link if it is
moved from its original location.
When creating symbolic links you should be aware that unless a path is fully specified the location
of the target is interpreted as relative to the location of the link. This may create problems if the
link, or the file it points to, is moved.
This is easier to understand with an example. Say you have a file named original.txt in the
current directory, and you want to create a symbolic link to it called softlink. You could use:
$ ln -s original.txt softlink

And apparently all would be well. Let us check with ls:
total 112K
-r--r--r-- 1 carol carol 110K Jun

7 10:13 original.txt

lrwxrwxrwx 1 carol carol

7 19:23 softlink -> original.txt

512

12 Jun

See how the link is constructed: softlink points to (→) original.txt. However, let’s see what
happens if you move the link to the previous directory and try to display its contents using the
command less:
$ mv softlink ../
$ less ../softlink
../softlink: No such file or directory

Since the path to original.txt was not specified, the system assumes that it is on the same
directory as the link. When this is no longer true, the link stops working.
The way to prevent this is to always specify the full path to the target when creating the link:
$ ln -s /home/carol/Documents/original.txt softlink

This way, no matter where you move the link to it will still work, because it points to the absolute
location of the target. Check with ls:
total 112K
lrwxrwxrwx 1 carol carol

40 Jun

7 19:34 softlink -> /home/carol/Documents/original.txt

513

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

1. What is the parameter for chmod in symbolic mode to enable the sticky bit on a directory?

## 2. Imagine there is a file named document.txt in the directory /home/carol/Documents. What
is the command to create a symbolic link to it named text.txt on the current directory?

3. Explain the difference between a hard link to a file and a copy of this file.

514

## 1. Imagine that inside a directory you create a file called recipes.txt. Inside this directory, you
will also create a hard link to this file, called receitas.txt, and a symbolic (or soft) link to this
called rezepte.txt.
$ touch recipes.txt
$ ln recipes.txt receitas.txt
$ ln -s recipes.txt rezepte.txt

The contents of the directory should be like so:
$ ls -lhi
total 160K
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 receitas.txt

0K jun 17 17:25 recipes.txt

5388837 lrwxrwxrwx 1 carol carol

12 jun 17 17:25 rezepte.txt -> receitas.txt

Remember that, as a hard link, receitas.txt points to the same inode that recipes.txt is
assigned. What would happen to the soft link rezepte.txt if the file receitas.txt is
deleted? Why?
2. Imagine you have a flash drive plugged into your system, and mounted on
/media/youruser/FlashA. You want to create a link called schematics.pdf in your home
directory, pointing to the file esquema.pdf on the root of the flash drive. So, you type the
$ ln /media/youruser/FlashA/esquema.pdf ~/schematics.pdf

What would happen? Why?
3. Consider the following output of ls -lah:
$ ls -lah
total 3,1M
drwxr-xr-x 2 carol carol 4,0K jun 17 17:27 .
drwxr-xr-x 5 carol carol 4,0K jun 17 17:29 ..
-rw-rw-r-- 1 carol carol 2,8M jun 17 15:45 compressed.zip

77K jun 17 17:25 document.txt

-rw-rw-r-- 1 carol carol 216K jun 17 17:25 image.png

515

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

77K jun 17 17:25 text.txt

- How many links point to the file document.txt?

- Are they soft or hard links?

- Which parameter should you pass to ls to see which inode each file occupies?

## 4. Imagine you have in your ~/Documents directory a file named clients.txt containing some
client names, and a directory named somedir. Inside this there is a different file also named
clients.txt with different names. To replicate this structure, use the following commands.
$ cd ~/Documents
$ echo "John, Michael, Bob" > clients.txt
$ mkdir somedir
$ echo "Bill, Luke, Karl" > somedir/clients.txt

You then create a link inside somedir named partners.txt pointing to this file, with the
commands:
$ cd somedir/
$ ln -s clients.txt partners.txt

So, the directory structure is:
`-- somedir
`-- partners.txt -> clients.txt

Now, you move partners.txt from somedir to ~/Documents, and list its contents.
$ cd ~/Documents/
$ mv somedir/partners.txt .
$ less partners.txt

516

Will the link still work? If so, which file will have its contents listed? Why?

## 5. Consider the following files:
-rw-r--r-- 1 carol carol 19 Jun 24 11:12 clients.txt
lrwxrwxrwx 1 carol carol 11 Jun 24 11:13 partners.txt -> clients.txt

What are the access permissions for partners.txt? Why?

517

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

- What links are.
- The difference between symbolic and hard links.
- How to create links.
- How to move, rename or remove these links.
The following commands were discussed on this lesson:
- ln: The “link” command. By itself, this command creates a hard link. With the -s switch a
symbolic or soft link can be created. Remember that hard links can only reside on the same
partition and filesystem, and symbolic links can traverse partitions and filesystems (even
network attached storage).
- The -i parameter to ls, which allows one to view the inode number for a file.

518

1. What is the parameter for chmod in symbolic mode to enable the sticky bit on a directory?
The symbol for the sticky bit in symbolic mode is t. Since we want to enable (add) this
permission to the directory, the parameter should be +t.
2. Imagine there is a file named document.txt in the directory /home/carol/Documents. What
is the command to create a symbolic link to it named text.txt on the current directory?
ln -s is the command to create a symbolic link. Since you should specify the full path to the
file you are linking to, the command is:
$ ln -s /home/carol/Documents/document.txt text.txt

3. Explain the difference between a hard link to a file and a copy of this file.
A hard link is just another name for a file. Even though it looks like a duplicate of the original
file, for all purposes both the link and the original are the same, as they point to the same data
on disk. Changes made on the contents of the link will be reflected on the original, and viceversa. A copy is a completely independent entity, occupying a different place on disk. Changes
to the copy will not be reflected on the original, and vice-versa.

519

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Imagine that inside a directory you create a file called recipes.txt. Inside this directory, you
will also create a hard link to this file, called receitas.txt, and a symbolic (or soft) link to this
called rezepte.txt.
$ touch recipes.txt
$ ln recipes.txt receitas.txt
$ ln -s receitas.txt rezepte.txt

The contents of the directory should be like so:
$ ls -lhi
total 160K
5388833 -rw-r--r-- 4 carol carol 77K jun 17 17:25 receitas.txt

0K jun 17 17:25 recipes.txt

5388837 lrwxrwxrwx 1 carol carol

12 jun 17 17:25 rezepte.txt -> receitas.txt

Remember that, as a hard link, receitas.txt points to the same inode that recipes.txt.
What would happen to the soft link rezepte.txt if the file receitas.txt is deleted? Why?
The soft link rezepte.txt would stop working. This is because soft links point to names, not
inodes, and the name receitas.txt no longer exists, even if the data is still on the disk under
the name recipes.txt.
2. Imagine you have a flash drive plugged into your system, and mounted on
/media/youruser/FlashA. You want to create a link called schematics.pdf in your home
directory, pointing to the file esquema.pdf on the root of the flash drive. So, you type the
$ ln /media/youruser/FlashA/esquema.pdf ~/schematics.pdf

What would happen? Why?
The command would fail. The error message would be Invalid cross-device link, and it
makes the reason clear: hard links cannot point to a target in a different partition or device.
The only way to create a link like this is to use a symbolic or soft link, adding the -s parameter
to ln.
3. Consider the following output of ls -lah:
520

$ ls -lah
total 3,1M
drwxr-xr-x 2 carol carol 4,0K jun 17 17:27 .
drwxr-xr-x 5 carol carol 4,0K jun 17 17:29 ..
-rw-rw-r-- 1 carol carol 2,8M jun 17 15:45 compressed.zip

77K jun 17 17:25 document.txt

-rw-rw-r-- 1 carol carol 216K jun 17 17:25 image.png

77K jun 17 17:25 text.txt

- How many links point to the file document.txt?
Every file starts with a link count of 1. Since the link count for the file is 4, there are three
links pointing to that file.
- Are they soft or hard links?
They are hard links, since soft links do not increase the link count of a file.
- Which parameter should you pass to ls to see which inode each file occupies?
The parameter is -i. The inode will be shown as the first column in the output of ls, like
below:
$ ls -lahi
total 3,1M
5388773 drwxr-xr-x 2 carol carol 4,0K jun 17 17:27 .
5245554 drwxr-xr-x 5 carol carol 4,0K jun 17 17:29 ..
5388840 -rw-rw-r-- 1 carol carol 2,8M jun 17 15:45 compressed.zip

77K jun 17 17:25 document.txt

5388837 -rw-rw-r-- 1 carol carol 216K jun 17 17:25 image.png

77K jun 17 17:25 text.txt

## 4. Imagine you have in your ~/Documents directory a file named clients.txt containing some
client names, and a directory named somedir. Inside this there is a different file also named
clients.txt with different names. To replicate this structure, use the following commands.
$ cd ~/Documents
$ echo "John, Michael, Bob" > clients.txt
$ mkdir somedir
$ echo "Bill, Luke, Karl" > somedir/clients.txt

521

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

You then create a link inside somedir named partners.txt pointing to this file, with the
commands:
$ cd somedir/
$ ln -s clients.txt partners.txt

So, the directory structure is:
`-- somedir
`-- partners.txt -> clients.txt

Now, you move partners.txt from somedir to ~/Documents, and list its contents.
$ cd ~/Documents/
$ mv somedir/partners.txt .
$ less partners.txt

Will the link still work? If so, which file will have its contents listed? Why?
This is a “tricky” one, but the link will work, and the file listed will be the one in ~/Documents,
containing the names John, Michael, Bob.
Remember that since you did not specify the full path to the target clients.txt when creating
the soft link partners.txt, the target location will be interpreted as being relative to the
location of the link, which in this case is the current directory.
When the link was moved from ~/Documents/somedir to ~/Documents, it should stop
working, since the target was no longer in the same directory as the link. However, it just so
happens that there is a file named clients.txt on ~/Documents, so the link will point to this
file, instead of the original target inside ~/somedir.
To avoid this, always specify the full path to the target when creating a symbolic link.
5. Consider the following files:
-rw-r--r-- 1 carol carol 19 Jun 24 11:12 clients.txt
lrwxrwxrwx 1 carol carol 11 Jun 24 11:13 partners.txt -> clients.txt

522

What are the access permissions for partners.txt? Why?
The access permissions for partners.txt are rw-r—r--, as links always inherit the same
access permissions as the target.

523

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

### 104.7 Find system files and place files in the correct location
LPIC-1 version 5.0, Exam 101, Objective 104.7
- Understand the correct locations of files under the FHS.
- Find files and commands on a Linux system.
- Know the location and purpose of important file and directories as defined in the FHS.
- find
- locate
- updatedb
- whereis
- which
- type
- /etc/updatedb.conf

524

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

### 104.7 Lesson 1

### 104.7 Find system files and place files in the
correct location

Linux distributions come in all shapes and sizes, but one thing that almost all of them share is that
they follow the Filesystem Hierarchy Standard (FHS), which defines a “standard layout” for the
filesystem, making interoperation and system administration much easier. In this lesson, you will
learn more about this standard, and how to find files on a Linux system.

The Filesystem Hierarchy Standard
The Filesystem Hierarchy Standard (FHS) is an effort by the Linux Foundation to standardize the
directory structure and directory contents on Linux systems. Compliance with the standard is not
mandatory, but most distributions follow it.

Those interested in the details of filesystem organization can read the FHS 3.0
specification, available in multiple formats at: http://refspecs.linuxfoundation.org/
fhs.shtml

525

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

According to the standard, the basic directory structure is as follows:
This is the root directory, the topmost directory in the hierarchy. Every other directory is
located inside it. A filesystem is often compared to a “tree”, so this would be the “trunk” to
which all branches are connected.
/bin
Essential binaries, available to all users.
/boot
Files needed by the boot process, including the Initial RAM Disk (initrd) and the Linux kernel
itself.
/dev
Device files. These can be either physical devices connected to the system (for example,
/dev/sda would be the first SCSI or SATA disk) or virtual devices provided by the kernel.
/etc
Host-specific configuration files. Programs may create subdirectories under /etc to store
multiple configuration files if needed.
/home
Each user in the system has a “home” directory to store personal files and preferences, and
most of them are located under /home. Usually, the home directory is the same as the
username, so the user John would have his directory under /home/john. The exceptions are
the superuser (root), which has a separate directory (/root) and some system users.
/lib
Shared libraries needed to boot the operating system and to run the binaries under /bin and
/sbin.
/media
User-mountable removable media, like flash drives, CD and DVD-ROM readers, floppy disks,
memory cards and external disks are mounted under here.
/mnt
Mount point for temporarily mounted filesystems.

526

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

/opt
Application software packages.
/root
Home directory for the superuser (root).
/run
Run-time variable data.
/sbin
System binaries.
/srv
Data served by the system. For example, the pages served by a web server could be stored
under /srv/www.
/tmp
Temporary files.
/usr
Read-only user data, including data needed by some secondary utilities and applications.
/proc
Virtual filesystem containing data related to running processes.
/var
Variable data written during system operation, including print queue, log data, mailboxes,
temporary files, browser cache, etc.
Keep in mind that some of those directories, like /etc, /usr and /var, contain a whole hierarchy
of subdirectories under them.

Temporary Files
Temporary files are files used by programs to store data that are only needed for a short time.
This can be the data of running processes, crash logs, scratch files from an autosave, intermediary
files used during a file conversion, cache files and such.
Location of Temporary Files
Version 3.0 of the Filesystem Hierarchy Standard (FHS) defines standard locations for temporary

527

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

files on Linux systems. Each location has a different purpose and behavior, and it is
recommended that developers follow the conventions set by the FHS when writing temporary
data to disk.
/tmp
According to the FHS, programs should not assume that files written here will be preserved
between invocations of a program. The recommendation is that this directory be cleared (all
files erased) during system boot-up, although this is not mandatory.
/var/tmp
Another location for temporary files, but this one should not be cleared during the system bootup. Files stored here will usually persist between reboots.
/run
This directory contains run-time variable data used by running processes, such as process
identifier files (.pid). Programs that need more than one run-time file may create
subdirectories here. This location must be cleared during system boot-up. The purpose of this
directory was once served by /var/run, and on some systems /var/run may be a symbolic
link to /run.
Note that there is nothing which prevents a program from creating temporary files elsewhere on
the system, but it is good practice to respect the conventions set by the FHS.

Finding Files
To search for files on a Linux system, you can use the find command. This is a very powerful tool,
full of parameters that can suit its behaviour and modify output exactly to your needs.
To start, find needs two arguments: a starting point and what to look for. For example, to search
for all files in the current directory (and subdirectories) whose name ends in .jpg you can use:
$ find . -name '*.jpg'
./pixel_3a_seethrough_1.jpg
./Mate3.jpg
./Expert.jpg
./Pentaro.jpg
./Mate1.jpg
./Mate2.jpg
./Sala.jpg
./Hotbit.jpg

528

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

This will match any file whose last four characters of the name are .jpg, no matter what comes
before it, as * is a wildcard for “anything”. However, see what happens if another * is added at the
end of the pattern:
$ find . -name '*.jpg*'
./pixel_3a_seethrough_1.jpg
./Pentaro.jpg.zip
./Mate3.jpg
./Expert.jpg
./Pentaro.jpg
./Mate1.jpg
./Mate2.jpg
./Sala.jpg
./Hotbit.jpg

The file Pentaro.jpg.zip (highlighted above) was not included in the previous listing, because
even if it contains .jpg on its name, it did not match the pattern as there where extra characters
after it. The new pattern means “anything .jpg anything”, so it matches.

Keep in mind that the -name parameter is case sensitive. If you wish to do a caseinsensitive search, use -iname.

The *.jpg expression must be placed inside single quotes, to avoid the shell from interpreting the
pattern itself. Try without the quotes and see what happens.
By default, find will begin at the starting point and descend through any subdirectories (and
subdirectories of those subdirectories) found. You can restrict this behaviour with the -maxdepth
N parameters, where N is the maximum number of levels.
To search only the current directory, you would use -maxdepth 1. Suppose you have the
following directory structure:
directory
├── clients.txt
├── partners.txt -> clients.txt
└── somedir
├── anotherdir
└── clients.txt

To search inside somedir, you would need to use -maxdepth 2 (the current directory +1 level
down). To search inside anotherdir, -maxdepth 3 would be needed (the current directory +2

529

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

levels down). The parameter -mindepth N works in the opposite way searching only in
directories at least N levels down.
The -mount parameter can be used to avoid find going down inside mounted filesystems. You
can also restrict the search to specific filesystem types using the -fstype parameter. So find
/mnt -fstype exfat -iname "*report*" would only search inside exFAT filesystems
mounted under /mnt.

Searching for Attributes
You can use the parameters below to search for files with specific attributes, like ones that are
writable by your user, have a specific set of permissions or are of a certain size:
-user USERNAME
Matches files owned by the user USERNAME.
-group GROUPNAME
Matches files owned by the group GROUPNAME.
-readable
Matches files that are readable by the current user.
-writable
Matches files that are writable by the current user.
-executable
Matches files that are executable by the current user. In the case of directories, this will match
any directory that the user can enter (x permission).
-perm NNNN
This will match any files that have exactly the NNNN permission. For example, -perm 0664 will
match any files which the user and group can read and write to and which others can read (or
rw-rw-r--).
You can add a - before NNNN to check for files that have at least the permission specified. For
example, -perm -644 would match files that have at least 644 (rw-r—r--) permissions. This
includes a file with 664 (rw-rw-r--) or even 775 (rwxrwx-r-x).
-empty
Will match empty files and directories.

530

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

-size N
Will match any files of N size, where N by default is a number of 512-byte blocks. You can add
suffixes to N for other units: Nc will count the size in bytes, Nk in kibibytes (KiB, multiples of
1024 bytes), NM in mebibytes (MiB, multiples of 1024 * 1024) and NG for gibibytes (GiB, multiples
of 1024 * 1024 * 1024).
Again, you can add the + or - prefixes (here meaning bigger than and smaller than) to search for
relative sizes. For example, -size -10M will match any file less than 10 MiB in size.
For example, to search for files under your home directory which contain the case insensitive
pattern report in any part of the name, have 0644 permissions, have been accessed 10 days ago
and which size is at least 1 Mib, you could use
$ find ~ -iname "*report*" -perm 0644 -atime 10 -size +1M

Searching by Time
Besides searching for attributes you can also perform searches by time, finding files that were
accessed, had their attributes changed or were modified during a specific period of time. The
parameters are:
-amin N, -cmin N, -mmin N
This will match files that have been accessed, had attributes changed or were modified
(respectively) N minutes ago.
-atime N, -ctime N, -mtime N
This will match files that were accessed, had attributes changed or were modified N*24 hours
ago.
For -cmin N and -ctime N, any attribute change will cause a match, including a change in
permissions, reading or writing to the file. This makes these parameters especially powerful, since
practically any operation involving the file will trigger a match.
The following example would match any file in the current directory which has been modified
less than 24 hours ago and is bigger than 100 MiB:
$ find . -mtime -1 -size +100M

531

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Using locate and updatedb
locate and updatedb are commands that can be used to quickly find a file matching a given
pattern on a Linux system. But unlike find, locate will not search the filesystem for the pattern:
instead, it looks it up on a database built by running the updatedb command. This gives you very
quick results, but they may be imprecise depending on when the database was last updated.
The simplest way to use locate is to just give it a pattern to search for. For example, to find every
JPEG image on your system, you would use locate jpg. The list of results can be quite lengthy,
but should look like this:
$ locate jpg
/home/carol/Downloads/Expert.jpg
/home/carol/Downloads/Hotbit.jpg
/home/carol/Downloads/Mate1.jpg
/home/carol/Downloads/Mate2.jpg
/home/carol/Downloads/Mate3.jpg
/home/carol/Downloads/Pentaro.jpg
/home/carol/Downloads/Sala.jpg
/home/carol/Downloads/pixel_3a_seethrough_1.jpg
/home/carol/Downloads/jpg_specs.doc

When asked for the jpg pattern, locate will show anything that contains this pattern, no matter
what comes before or after it. You can see an example of this in the file jpg_specs.doc in the
listing above: it contains the pattern, but the extension is not jpg.

Remember that with locate you are matching patterns, not file extensions.

By default the pattern is case sensitive. This means that files containing .JPG would not be shown
since the pattern is in lowercase. To avoid this, pass the -i parameter to locate. Repeating our
previous example:
$ locate -i .jpg
/home/carol/Downloads/Expert.jpg
/home/carol/Downloads/Hotbit.jpg
/home/carol/Downloads/Mate1.jpg
/home/carol/Downloads/Mate1_old.JPG
/home/carol/Downloads/Mate2.jpg
/home/carol/Downloads/Mate3.jpg
/home/carol/Downloads/Pentaro.jpg
/home/carol/Downloads/Sala.jpg

532

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

/home/carol/Downloads/pixel_3a_seethrough_1.jpg

Notice that the file Mate1_old.JPG, in bold above, was not present in the previous listing.
You can pass multiple patterns to locate, just separate them with spaces. The example below
would do a case-insensitive search for any files matching the zip and jpg patterns:
$ locate -i zip jpg
/home/carol/Downloads/Expert.jpg
/home/carol/Downloads/Hotbit.jpg
/home/carol/Downloads/Mate1.jpg
/home/carol/Downloads/Mate1_old.JPG
/home/carol/Downloads/Mate2.jpg
/home/carol/Downloads/Mate3.jpg
/home/carol/Downloads/OPENMSXPIHAT.zip
/home/carol/Downloads/Pentaro.jpg
/home/carol/Downloads/Sala.jpg
/home/carol/Downloads/gbs-control-master.zip
/home/carol/Downloads/lineage-16.0-20190711-MOD-quark.zip
/home/carol/Downloads/pixel_3a_seethrough_1.jpg
/home/carol/Downloads/jpg_specs.doc

When using multiple patterns, you can request locate to show only files that match all of them.
This is done with the -A option. The following example would show any file matching the .jpg
and the .zip patterns:
$ locate -A .jpg .zip
/home/carol/Downloads/Pentaro.jpg.zip

If you wish to count the number of files that match a given pattern instead of showing their full
path you can use the -c option. For example, to count the number of .jpg files on a system:
$ locate -c .jpg
1174

One problem with locate is that it only shows entries present in the database generated by
updatedb (located in /var/lib/mlocate.db). If the database is outdated, the output could show
files that have been deleted since the last time it was updated. One way to avoid this is to add the
-e parameter, which will make it check to see if the file still exists before showing it on the output.

533

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Of course, this will not solve the problem of files created after the last database update not
showing up. For this you will have to update the database with the command updatedb. How long
this will take will depend on the amount of files of your disk.
Controlling the Behavior of updatedb
The behavior of updatedb can be controlled by the file /etc/updatedb.conf. This is a text file
where each line controls one variable. Blank lines are ignored and lines that start with the #
character are treated as comments.
PRUNEFS=
Any filesystem types indicated after this parameter will not be scanned by updatedb. The list
of types should be separated by spaces, and the types themselves are case-insensitive, so NFS
and nfs are the same.
PRUNENAMES=
This is a space-separated list of directory names that should not be scanned by updatedb.
PRUNEPATHS=
This is a list of path names that should be ignored by updatedb. The path names must be
separated by spaces and specified in the same way they would be shown by updatedb (for
example, /var/spool /media)
PRUNE_BIND_MOUNTS=
This is a simple yes or no variable. If set to yes bind mounts (directories mounted elsewhere
with the mount --bind command) will be ignored.

Finding Binaries, Manual Pages and Source Code
which is a very useful command that shows the full path to an executable. For example, if you
want to locate the executable for bash, you could use:
$ which bash
/usr/bin/bash

If the -a option is added the command will show all pathnames that match the executable.
Observe the difference:
$ which mkfs.ext3
/usr/sbin/mkfs.ext3

534

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

$ which -a mkfs.ext3
/usr/sbin/mkfs.ext3
/sbin/mkfs.ext3

To find which directories are in the PATH use the echo $PATH command. This will
print (echo) the contents of the variable PATH ($PATH) to your terminal.

type is a similar command which will show information about a binary, including where it is
located and its type. Just use type followed by the command name:
$ type locate
locate is /usr/bin/locate

The -a parameter works in the same way as in which, showing all pathnames that match the
executable. Like so:
$ type -a locate
locate is /usr/bin/locate
locate is /bin/locate

And the -t parameter will show the file type of the command which can be alias, keyword,
function, builtin or file. For example:
$ type -t locate
$ type -t ll
alias
$ type -t type
type is a built-in shell command

The command whereis is more versatile and besides binaries can also be used to show the
location of man pages or even source code for a program (if available in your system). Just type
whereis followed by the binary name:
$ whereis locate
locate: /usr/bin/locate /usr/share/man/man1/locate.1.gz

535

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

The results above include binaries (/usr/bin/locate) and compressed manual pages
(/usr/share/man/man1/locate.1.gz).
You can quickly filter the results using commandline switches like -b, which will limit them to
only the binaries, -m, which will limit them to only man pages, or -s, which will limit them to only
the source code. Repeating the example above, you would get:
$ whereis -b locate
locate: /usr/bin/locate
$ whereis -m locate
locate: /usr/share/man/man1/locate.1.gz

536

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

## 1. Imagine a program needs to create a single-use temporary file that will never be needed again
after the program is closed. What would be the correct directory to create this file in?

2. Which is the temporary directory that must be cleared during the boot process?

## 3. Using find, search only the current directory for files that are writable by the user, have been
modified in the last 10 days and are bigger than 4 GiB.

## 4. Using locate, find any files containing both the patterns report and either updated, update
or updating on their names.

5. How can you find where the manpage for ifconfig is stored?

## 6. What variable needs to be added to /etc/updatedb.conf to make updatedb ignore ntfs
filesystems?

7. A system administrator wishes to mount an internal disk (/dev/sdc1). According to the FHS,
under which directory should this disk be mounted?

537

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. When locate is used, the results are pulled from a database generated by updatedb. However
this database can be outdated, causing locate to show files that no longer exist. How can you
make locate show only existing files on its output?

## 2. Find any file on the current directory or subdirectories up to 2 levels down, excluding mounted
filesystems, that contain the pattern Status or statute on their names.

## 3. Limiting the search to ext4 filesystems, find any files under /mnt that have at least execute
permissions for the group, are readable for the current user and had any attribute changed in
the last 2 hours.

## 4. Find empty files which were created more than 30 days ago and are at least two levels down
from the current directory

## 5. Consider that the users carol and john are part of the group mkt. Find on john's home
directory any files that are also readable by carol.

538

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

In this lesson you learned about the basic organization of the filesystem on a Linux machine,
according to the FHS, and how to find binaries and files, either by name or by attributes. The
following commands were discussed in this lesson:
find
A versatile command used to find files and folders based on a variety of search criteria.
locate
A utility that uses a local database that contains the locations for locally stored files.
updatedb
Updates the local database used by the locate command.
which
Displays the full path to an executable.
whereis
Displays the locations of manual pages, binaries and source code on the system.
type
Displays the location of a binary and the type of application that it is (such as a program that is
installed, a built-in Bash program and more).

539

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. Imagine a program needs to create a single-use temporary file that will never be needed again
after the program is closed. What would be the correct directory to create this file in?
Since we don’t care about the file after the program finishes running, the correct directory is
/tmp.
2. Which is the temporary directory that must be cleared during the boot process?
The directory is /run or, on some systems, /var/run.
3. Using find, search only the current directory for files that are writable by the user, have been
modified in the last 10 days and are bigger than 4 GiB.
For this you will need the -writable, -mtime and -size parameters:
find . -writable -mtime -10 -size +4G

## 4. Using locate, find any files containing both the patterns report and either updated, update
or updating on their names.
Since locate needs to match all patterns, use the -A option:
locate -A "report" "updat"

## 5. How can you find where the manpage for ifconfig is stored?
Use the -m parameter for whereis:
whereis -m ifconfig

## 6. What variable needs to be added to /etc/updatedb.conf to make updatedb ignore ntfs
filesystems?
The variable is PRUNEFS= followed by the filesystem type: PRUNEFS=ntfs
7. A system administrator wishes to mount an internal disk (/dev/sdc1). According to the FHS,
under which directory should this disk be mounted?
In practice, the disk can be mounted anywhere. However, the FHS recommends that temporary
540

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

mounts be done under /mnt

541

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

## 1. When locate is used, the results are pulled from a database generated by updatedb. However,
this database can be outdated, causing locate to show files that no longer exist. How can you
make locate show only existing files on its output?
Add the -e parameter to locate, as in locate -e PATTERN.
2. Find any file on the current directory or subdirectories up to 2 levels down, excluding mounted
filesystems, that contain the pattern Status or statute on their names.
Remember that for -maxdepth you have to also consider the current directory, so we want
three levels (the current plus 2 levels down):
find . -maxdepth 3

-mount -iname "*statu*"

## 3. Limiting the search to ext4 filesystems, find any files under /mnt that have at least execute
permissions for the group, are readable for the current user and had any attribute changed in
the last 2 hours.
Use the -fstype parameter of mount to limit the search to specific filesystem types. A file
readable by the current user would have at least 4 in the first digit of the permissions, and one
executable by the group would have at least 1 on the second digit. Since we don’t care about the
permissions for others, we can use 0 for the third digit. Use -cmin N to filter recent attribute
changes, remembering that N is specified in minutes. So:
find /mnt -fstype ext4 -perm -410 -cmin -120

## 4. Find empty files which were modified more than 30 days ago and are at least two levels down
from the current directory
The parameter -mindepth N can be used to limit the search to at least N levels down, but
remember that you have to include the current directory in the count. Use -empty to check for
empty files, and -mtime N to check for modification time. So:
find . -empty -mtime +30 -mindepth 3

## 5. Consider that the users carol and john are part of the group mkt. Find on john's home
directory any files that are also readable by carol.

542

LPIC-1 (101) (Version 5.0) | 104.7 Find system files and place files in the correct location

Considering they are members of the same group, we need at least an r (4) on the group
permissions, and we do not care about the others. So:
find /home/john -perm -040

543

LPIC-1 (101) (Version 5.0) | Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard

Imprint
© 2025 by Linux Professional Institute: Learning Materials, “LPIC-1 (101) (Version 5.0)”.
PDF generated: 2025-01-02
This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
International License (CC BY-NC-ND 4.0). To view a copy of this license, visit
https://creativecommons.org/licenses/by-nc-nd/4.0/
While Linux Professional Institute has used good faith efforts to ensure that the information and
instructions contained in this work are accurate, Linux Professional Institute disclaims all
responsibility for errors or omissions, including without limitation responsibility for damages
resulting from the use of or reliance on this work. Use of the information and instructions
contained in this work is at your own risk. If any code samples or other technology this work
contains or describes is subject to open source licenses or the intellectual property rights of
others, it is your responsibility to ensure that your use thereof complies with such licenses and/or
rights.
The LPI Learning Materials are an initiative of Linux Professional Institute (https://lpi.org).
Learning Materials and their translations can be found at https://learning.lpi.org.
For questions and comments on this edition as well as on the entire project write an email to:
learning@lpi.org.

544
