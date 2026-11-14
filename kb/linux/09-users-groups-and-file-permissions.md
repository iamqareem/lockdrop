---
id: linux-09
title: "Creating Users and Groups, and Managing Permissions and Ownership"
slug: 09-users-groups-and-file-permissions
source: "LPI Learning Material 010-160"
sourceSection: "5.2, 5.3"
topic: "5"
tags: [linux, lpic-1, users, groups, chmod, permissions]
summary: "Create and manage accounts and groups with the passwd family of tools, and control access with symbolic and numeric file permission modes."
---
# Security and File Permissions

## 5.2 Creating Users and Groups

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 5.2
**Weight:** 2
**Key knowledge areas**
- User and group commands
- User IDs
**Partial list of the used files, terms and utilities**
- /etc/passwd, /etc/shadow, /etc/group, /etc/skel/
- useradd, groupadd
- passwd

### 5.2 Lesson 1

#### Introduction

Managing users and groups on a Linux machine is one of the key aspects of system administration. In fact, Linux is a multi-user operating system in which multiple users can use the same machine at the same time. Information about users and groups is stored in four files within the /etc/ directory tree: /etc/passwd a file of seven colon-delimited fields containing basic information about users /etc/group a file of four colon-delimited fields containing basic information about groups /etc/shadow a file of nine colon-delimited fields containing encrypted user passwords /etc/gshadow a file of four colon-delimited fields file containing encrypted group passwords
All of these files are updated by a suite of command-line tools for user and group management, which we’ll discuss later in this lesson. They can also be managed by graphical applications, specific to each Linux distribution, which provide simpler and more immediate management interfaces.
**WARNING**
Even though the files are plain text, do not edit them directly. Always use the tools provided with your distribution for this purpose.
#### The File /etc/passwd

/etc/passwd is a world-readable file that contains a list of users, each on a separate line: frank:x:1001:1001::/home/frank:/bin/bash
Each line consists of seven colon-delimited fields:
**Username**
The name used when the user logs into the system.
**Password**
The encrypted password (or an x if shadow passwords are used).
**User ID (UID)**
The ID number assigned to the user in the system.
**Group ID (GID)**
The primary group number of the user in the system.
**GECOS**
An optional comment field, which is used to add extra information about the user (such as the full name). The field can contain multiple comma-separated entries.
**Home directory**
The absolute path of the user’s home directory.
**Shell**
The absolute path of the program that is automatically launched when the user logs into the system (usually an interactive shell such as /bin/bash).
#### The File /etc/group

/etc/group is a world-readable file that contains a list of groups, each on a separate line: developer:x:1002:
Each line consists of four colon-delimited fields:
**Group Name**
The name of the group.
**Group Password**
The encrypted password of the group (or an x if shadow passwords are used).
**Group ID (GID)**
The ID number assigned to the group in the system.
**Member list**
A comma-delimited list of users belonging to the group, except those for whom this is the primary group.
#### The File /etc/shadow

/etc/shadow is a file readable only by root and users with root privileges and contains the encrypted passwords of the users, each on a separate line: frank:$6$i9gjM4Md4MuelZCd$7jJa8Cd2bbADFH4dwtfvTvJLOYCCCBf/.jYbK1IMYx7Wh4fErXcc2xQVU2N1gb97yI YaiqH.jjJammzof2Jfr/:18029:0:99999:7:::
Each line consists of nine colon-delimited fields:
**Username**
The name used when user logs into the system.
**Encrypted password**
The encrypted password of the user (if the value is !, the account is locked).
**Date of last password change**
The date of the last password change, as number of days since 01/01/1970. A value of 0 means
that the user must change the password at the next access.
**Minimum password age**
The minimum number of days, after a password change, which must pass before the user will be allowed to change the password again.
**Maximum password age**
The maximum number of days that must pass before a password change is required.
**Password warning period**
The number of days, before the password expires, during which the user is warned that the password must be changed.
**Password inactivity period**
The number of days after a password expires during which the user should update the password. After this period, if the user does not change the password, the account will be disabled.
**Account expiration date**
The date, as number of days since 01/01/1970, in which the user account will be disabled. An empty field means that the user account will never expire.
**A reserved field**
A field that is reserved for future use.
#### The File /etc/gshadow

/etc/gshadow is a file readable only by root and by users with root privileges that contains encrypted passwords for groups, each on a separate line: developer:$6$7QUIhUX1WdO6$H7kOYgsboLkDseFHpk04lwAtweSUQHipoxIgo83QNDxYtYwgmZTCU0qSCuCkErmyR2 63rvHiLctZVDR7Ya9Ai1::
Each line consists of four colon-delimited fields:
**Group name**
The name of the group.
**Encrypted password**
The encrypted password for the group (it is used when a user, who is not a member of the
group, wants to join the group using the newgrp command — if the password starts with !, no one is allowed to access the group with newgrp).
**Group administrators**
A comma-delimited list of the administrators of the group (they can change the password of the group and can add or remove group members with the gpasswd command).
**Group members**
A comma-delimited list of the members of the group. Now that we’ve seen where user and group information is stored, let’s talk about the most important command-line tools to update these files.
#### Adding and Deleting User Accounts

In Linux, you add a new user account with the useradd command, and you delete a user account with the userdel command. If you want to create a new user account named frank with a default setting, you can run the following:
```console
# useradd frank
```
After creating the new user, you can set a password using passwd:
```console
# passwd frank
Changing password for user frank.
New UNIX password:
```
Retype new UNIX password: passwd: all authentication tokens updated successfully.
Both of these commands require root authority. When you run the useradd command, the user and group information stored in password and group databases are updated for the newly created user account and, if specified, the home directory of the new user is created as well as a group with the same name as the user account.
**TIP**
Remember that you can always use the grep utility to filter the password and group databases, displaying only the entry that refers to a specific user or group. For the above example you can use cat /etc/passwd | grep frank or grep frank /etc/passwd to see basic information on the newly created frank account. The most important options which apply to the useradd command are:
**-c**
Create a new user account with custom comments (for example full name).
**-d**
Create a new user account with a custom home directory.
**-e**
Create a new user account by setting a specific date on which it will be disabled.
**-f**
Create a new user account by setting the number of days after the password expires during which the user should update the password.
**-g**
Create a new user account with a specific GID
**-G**
Create a new user account by adding it to multiple secondary groups.
**-m**
Create a new user account with its home directory.
**-M**
Create a new user account without its home directory.
**-s**
Create a new user account with a specific login shell.
**-u**
Create a new user account with a specific UID. Once the new user account is created, you can use the id and groups commands to find out its
UID, GID and the groups to which it belongs.
```console
# id frank
uid=1000(frank) gid=1000(frank) groups=1000(frank)
# groups frank
frank : frank
```
**TIP**
Remember to check and eventually edit the /etc/login.defs file, which defines the configuration parameters that control the creation of users and groups. For example, you can set the range of UIDs and GIDs that can be assigned to new user and group accounts, specify that you don’t need to use the -m option to create the new user’s home directory and if the system should automatically create a new group for each new user.
If you want to delete a user account, you can use the userdel command. In particular, this command updates the information stored in the account databases, deleting all entries referring to the specified user. The -r option also removes the user’s home directory and all of its contents, along with the user’s mail spool. Other files, located elsewhere, must be searched for and deleted manually.
```console
# userdel -r frank
```
As before, you need root authority to delete user accounts.
#### The Skeleton Directory

When you add a new user account, even creating its home directory, the newly created home directory is populated with files and folders that are copied from the skeleton directory (by default /etc/skel). The idea behind this is simple: a system administrator wants to add new users having the same files and directories in their home. Therefore, if you want to customize the files and folders that are created automatically in the home directory of the new user accounts, you must add these new files and folders to the skeleton directory.
**TIP**
Note that the profile files that are usually found in the skeleton directory are hidden files. Therefore, if you want to list all the files and folders in the skeleton directory, which will be copied to the home dir of the newly created users, you must use the ls -Al command.
#### Adding and Deleting Groups

As for group management, you can add or delete groups using the groupadd and groupdel commands. If you want to create a new group named developer, you can run the following command as root:
```console
# groupadd -g 1090 developer
```
The -g option of this command creates a group with a specific GID. If you want to delete the developer group, you can run the following:
```console
# groupdel developer
```
**WARNING**
Remember that when you add a new user account, the primary group and the secondary groups to which it belongs must exist before launching the useradd command. Also, you cannot delete a group if it is the primary group of a user account.
#### The passwd Command

This command is primarily used to change a user’s password. Any user can change their password, but only root can change any user’s password. Depending on the passwd option used, you can control specific aspects of password aging:
**-d**
Delete the password of a user account (thus setting an empty password, making it a passwordless account).
**-e**
Force the user account to change the password.
**-l**
Lock the user account (the encrypted password is prefixed with an exclamation mark).
**-u**
Unlock the user account (it removes the exclamation mark).
**-S**
Output information about the password status for a specific account. These options are available only for root. To see the full list of options, refer to the man pages.
#### Guided Exercises

1. For each of the following entries, indicate the file to which it refers: ◦ developer:x:1010:frank,grace,dave
◦ root:x:0:0:root:/root:/bin/bash
◦ henry:$1$.AbCdEfGh123456789A1b2C3d4.:18015:20:90:5:30::
◦ henry:x:1000:1000:User Henry:/home/henry:/bin/bash
◦ staff:!:dave:carol,emma
1. Observe the following output to answer the next seven questions: # cat /etc/passwd | tail -3 dave:x:1050:1050:User Dave:/home/dave:/bin/bash carol:x:1051:1015:User Carol:/home/carol:/bin/sh henry:x:1052:1005:User Henry:/home/henry:/bin/tcsh # cat /etc/group | tail -3 web_admin:x:1005:frank,emma web_developer:x:1010:grace,kevin,christian dave:x:1050: # cat /etc/shadow | tail -3 dave:$6$AbCdEfGh123456789A1b2C3D4e5F6G7h8i9:0:20:90:7:30:: carol:$6$q1w2e3r4t5y6u7i8AbcDeFgHiLmNoPqRsTu:18015:0:60:7::: henry:!$6$123456789aBcDeFgHa1B2c3d4E5f6g7H8I9:18015:0:20:5::: # cat /etc/gshadow | tail -3 web_admin:!:frank:frank,emma web_developer:!:kevin:grace,kevin,christian dave:!::
◦ What is the User ID (UID) and Group ID (GID) of carol?
◦ What shell is set for dave and henry?
◦ What is the name of the primary group of henry?
◦ What are the members of the web_developer group? Which of these are group administrators?
◦ Which user cannot log into the system?
◦ Which user should change the password the next time he will log into the system?
◦ How many days must pass before a password change is required for carol?
#### Explorational Exercises

1. Working as root, run the useradd -m dave command to add a new user account. What operations does this command perform? Assume that CREATE_HOME and USERGROUPS_ENAB in /etc/login.defs are set to yes.
2. Now that you have created the dave account, can this user login to the system?
3. Identify the User ID (UID) and Group ID (GID) of dave and all members of the dave group.
4. Create the sys_admin, web_admin and db_admin groups and identify their Group IDs (GIDs).
5. Add a new user account named carol with UID 1035 and set sys_admin as its primary group and web_admin and db_admin as its secondary groups.
6. Delete the dave and carol user accounts and the sys_admin, web_admin and db_admin groups that you have previously created.
7. Run the ls -l /etc/passwd /etc/group /etc/shadow /etc/gshadow command and describe the output that it gives you in terms of file permissions. Which of these four files are shadowed for security reasons? Assume your system uses shadow passwords.
8. Run the ls -l /usr/bin/passwd command. Which special bit is set and what is its meaning?
#### Summary

In this lesson, you learned:
- The fundamentals of user and group management in Linux
- Manage user and group information stored in password and group databases
- Maintain the skeleton directory
- Add and remove user accounts
- Add and remove group accounts
- Change the password of user accounts
The following commands were discussed in this lesson:
**useradd**
Create a new user account.
**groupadd**
Create a new group account.
**userdel**
Delete a user account.
**groupdel**
Delete a group account.
**passwd**
Change the password of user accounts and control all aspects of password aging.

### Answers

#### Guided Exercises

1. For each of the following entries, indicate the file to which it refers: ◦ developer:x:1010:frank,grace,dave /etc/group ◦ root:x:0:0:root:/root:/bin/bash /etc/passwd ◦ henry:$1$.AbCdEfGh123456789A1b2C3d4.:18015:20:90:5:30:: /etc/shadow ◦ henry:x:1000:1000:User Henry:/home/henry:/bin/bash /etc/passwd ◦ staff:!:dave:carol,emma /etc/gshadow
2. Observe the following output to answer the next seven questions: # cat /etc/passwd | tail -3 dave:x:1050:1050:User Dave:/home/dave:/bin/bash carol:x:1051:1015:User Carol:/home/carol:/bin/sh henry:x:1052:1005:User Henry:/home/henry:/bin/tcsh # cat /etc/group | tail -3 web_admin:x:1005:frank,emma web_developer:x:1010:grace,kevin,christian dave:x:1050: # cat /etc/shadow | tail -3 dave:$6$AbCdEfGh123456789A1b2C3D4e5F6G7h8i9:0:20:90:7:30:: carol:$6$q1w2e3r4t5y6u7i8AbcDeFgHiLmNoPqRsTu:18015:0:60:7::: henry:!$6$123456789aBcDeFgHa1B2c3d4E5f6g7H8I9:18015:0:20:5::: # cat /etc/gshadow | tail -3 web_admin:!:frank:frank,emma web_developer:!:kevin:grace,kevin,christian dave:!::
◦ What is the User ID (UID) and Group ID (GID) of carol?
The UID is 1051 and the GID is 1015 (the third and fourth fields in /etc/passwd). ◦ What shell is set for dave and henry? dave uses /bin/bash and henry uses /bin/tcsh (the seventh field in /etc/passwd). ◦ What is the name of the primary group of henry? The group name is web_admin (the first field in /etc/group). ◦ What are the members of the web_developer group? Which of these are group administrators? The members are grace, kevin and christian (the fourth field in /etc/group), but only kevin is the administrator of the group (the third field in /etc/gshadow). ◦ Which user cannot log into the system? The henry user account is locked (it has an exclamation mark in front of the password hashes in /etc/shadow). ◦ Which user should change the password the next time he will log into the system? If the third field (Date of Last Password Change) in /etc/shadow is 0, the user should change his password the next time he will log into the system. Therefore, dave must change his password. ◦ How many days must pass before a password change is required for carol? 60 days (the fifth field in /etc/shadow).

#### Explorational Exercises

1. Working as root, run the useradd -m dave command to add a new user account. What operations does this command perform? Assume that CREATE_HOME and USERGROUPS_ENAB in /etc/login.defs are set to yes. The command adds a new user, named dave, to the list of users in the system. The home directory of dave is created (by default /home/dave) and the files and directories contained in the skeleton directory are copied to the home directory. Finally, new group is created with the same name as the user account.
2. Now that you have created the dave account, can this user login to the system? No, because the dave account is locked (see the exclamation mark in /etc/shadow). # cat /etc/shadow | grep dave dave:!:18015:0:99999:7:::
If you set a password for dave, the account will be unlocked. You can do this using the passwd command.
```console
# passwd dave
Changing password for user dave.
New UNIX password:
```
Retype new UNIX password: passwd: all authentication tokens updated successfully.
1. Identify the User ID (UID) and Group ID (GID) of dave and all members of the dave group. # cat /etc/passwd | grep dave dave:x:1015:1019::/home/dave:/bin/sh # cat /etc/group | grep 1019 dave:x:1019:
The UID and GID of dave are 1015 and 1019 respectively (the third and fourth fields in /etc/passwd) and the dave group has no members (the fourth field in /etc/group is empty).
1. Create the sys_admin, web_admin and db_admin groups and identify their Group IDs (GIDs). # groupadd sys_admin
```console
# groupadd web_admin
# groupadd db_admin
# cat /etc/group | grep admin
sys_admin:x:1020:
web_admin:x:1021:
db_admin:x:1022:
```
The GIDs for the sys_admin, web_admin and db_admin groups are 1020, 1021 and 1022 respectively.
1. Add a new user account named carol with UID 1035 and set sys_admin as its primary group and web_admin and db_admin as its secondary groups. # useradd -u 1035 -g 1020 -G web_admin,db_admin carol # id carol uid=1035(carol) gid=1020(sys_admin) groups=1020(sys_admin),1021(web_admin),1022(db_admin)
2. Delete the dave and carol user accounts and the sys_admin, web_admin and db_admin groups that you have previously created. # userdel -r dave # userdel -r carol # groupdel sys_admin # groupdel web_admin # groupdel db_admin
3. Run the ls -l /etc/passwd /etc/group /etc/shadow /etc/gshadow command and describe the output that it gives you in terms of file permissions. Which of these four files are shadowed for security reasons? Assume your system uses shadow passwords. # ls -l /etc/passwd /etc/group /etc/shadow /etc/gshadow -rw-r--r-- 1 root root
853 mag
1 08:00 /etc/group
-rw-r----- 1 root shadow 1203 mag
1 08:00 /etc/gshadow
-rw-r--r-- 1 root root
1354 mag
1 08:00 /etc/passwd
-rw-r----- 1 root shadow 1563 mag
1 08:00 /etc/shadow
The /etc/passwd and /etc/group files are world readable and are shadowed for security reasons. When shadow passwords are used, you can see an x in the second field of these files because the encrypted passwords for users and groups are stored in /etc/shadow and /etc/gshadow, which are readable only by root and, in some systems, also by members
belonging to the shadow group.
1. Run the ls -l /usr/bin/passwd command. Which special bit is set and what is its meaning? # ls -l /usr/bin/passwd -rwsr-xr-x 1 root root 42096 mag 17
2015 /usr/bin/passwd
The passwd command has the SUID bit set (the fourth character of this line), which means that the command is executed with the privileges of the file’s owner (thus root). This is how ordinary users can change their password.

## 5.3 Managing File Permissions and Ownership

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 5.3
**Weight:** 2
**Key knowledge areas**
- File and directory permissions and ownership
**Partial list of the used files, terms and utilities**
- ls -l, ls -a
- chmod, chown

### 5.3 Lesson 1

#### Introduction

Being a multi-user system, Linux needs some way to track who owns each file and whether or not a user is allowed to perform actions on that file. This is to ensure the privacy of users who might want to keep the content of their files confidential, as well as to ensure collaboration by making certain files accessible to multiple users. This is done through a three-level permissions system: every file on disk is owned by a user and a user group and has three sets of permissions: one for its owner, one the group who owns the file and one for everyone else. In this lesson, you will learn how to query the permissions for a file and how to manipulate them.
#### Querying Information about Files and Directories

The command ls is used to get a listing of the contents of any directory. In this basic form, all you get are the filenames:
```console
$ ls
```
Another_Directory
picture.jpg
text.txt
But there is much more information available for each file, including type, size, ownership and more. To see this information you must ask ls for a “long form” listing, using the -l parameter:
```console
$ ls -l
total 536
drwxrwxr-x 2 carol carol

4096 Dec 10 15:57 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg
-rw-rw-r-- 1 carol carol

1881 Dec 10 15:57 text.txt
```
Each column on the output above has a meaning:
- The first column on the listing shows the file type and permissions.
For example, on drwxrwxr-x: ◦ The first character, d, indicates the file type. ◦ The next three characters, rwx, indicate the permissions for the owner of the file, also referred to as user or u. ◦ The next three characters, rwx, indicate the permissions of the group owning the file, also referred to as g. ◦ The last three characters, r-x, indicate the permissions for anyone else, also known as others or o.
- The second column indicates the number of hard links pointing to that file. For a directory, this means the number of subdirectories, plus a link to itself (.) and the parent directory (..).
- The third and fourth columns show ownership information: respectively the user and group that own the file.
- The fifth column shows the filesize, in bytes.
- The sixth column shows the precise date and time, or timestamp, when the file was last modified.
- The seventh and last column shows the file name.
If you wish to see the filesizes in “human readable” format, add the -h parameter to ls. Files less than one kilobyte in size will have the size shown in bytes. Files with more than one kilobyte and less than one megabyte will have a K added after the size, indicating the size is in kilobytes. The same follows for filesizes in the megabyte (M) and gigabyte (G) ranges:
```console
$ ls -lh
total 1,2G
drwxrwxr-x 2 carol carol 4,0K Dec 10 17:59 Another_Directory
----r--r-- 1 carol carol

0 Dec 11 10:55 foo.bar

-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip
-rw------- 1 carol carol 528K Dec 10 10:43 picture.jpg
---xr-xr-x 1 carol carol

33 Dec 11 10:36 test.sh

-rwxr--r-- 1 carol carol 1,9K Dec 20 18:13 text.txt
-rw-rw-r-- 1 carol carol 2,6M Dec 11 22:14 Zipped.zip
```
To only show information on a specific set of files, add the names of these files to ls:
```console
$ ls -lh HugeFile.zip test.sh
total 1,2G
-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip
---xr-xr-x 1 carol carol

33 Dec 11 10:36 test.sh
```
#### What about Directories?

If you try to query information about a directory using ls -l, it will show you a listing of the directory contents instead:
```console
$ ls -l Another_Directory/
total 0
-rw-r--r-- 1 carol carol 0 Dec 10 17:59 another_file.txt
```
To avoid this and query information about the directory itself, add the -d parameter to ls:
```console
$ ls -l -d Another_Directory/
drwxrwxr-x 2 carol carol 4096 Dec 10 17:59 Another_Directory/
```
#### Seeing Hidden Files

The directory listing we have retrieved using ls -l before is incomplete:
```console
$ ls -l
total 544
drwxrwxr-x 2 carol carol

4096 Dec 10 17:59 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg
-rw-rw-r-- 1 carol carol

1881 Dec 10 15:57 text.txt
```
There are three other files in that directory, but they are hidden. On Linux, files whose name starts with a period (.) are automatically hidden. To see them we need to add the -a parameter to ls:
```console
$ ls -l -a
total 544
drwxrwxr-x 3 carol carol

4096 Dec 10 16:01 .

drwxrwxr-x 4 carol carol

4096 Dec 10 15:56 ..

drwxrwxr-x 2 carol carol

4096 Dec 10 17:59 Another_Directory

-rw------- 1 carol carol 539663 Dec 10 10:43 picture.jpg
-rw-rw-r-- 1 carol carol
-rw-r--r-- 1 carol carol

1881 Dec 10 15:57 text.txt
0 Dec 10 16:01 .thisIsHidden
```
The file .thisIsHidden is simply hidden because its name starts with .. The directories . and .. however are special. . is a pointer to the current directory, while .. is a pointer to the parent directory (the directory which contains the current directory). In Linux, every directory contains at least these two special directories.
**TIP**
You can combine multiple parameters for ls (and many other Linux commands). ls -l -a can, for example, be written as ls -la.
#### Understanding Filetypes

We have already mentioned that the first letter in each output of ls -l describes the type of the file. The three most common file types are: - (normal file) A file can contain data of any kind. Files can be modified, moved, copied and deleted.
**d (directory)**
A directory contains other files or directories and helps to organize the file system. Technically, directories are a special kind of file.
**l (soft link)**
This “file” is a pointer to another file or directory elsewhere in the filesystem. In addition to those, there are three other file types that you should at least know about, but are
out of scope for this lesson:
**b (block device)**
This file stands for a virtual or physical device, usually disks or other kinds of storage devices. For example, the first hard disk in the system might be represented by /dev/sda.
**c (character device)**
This file stands for a virtual or physical device. Terminals (like the main terminal on /dev/ttyS0) and serial ports are common examples of character devices.
**s (socket)**
Sockets serve as “conduits” passing information between two programs.
**WARNING**
Do not alter any of the permissions on block devices, character devices or sockets, unless you know what you’re doing. This may prevent your system from working!
#### Understanding Permissions

In the output of ls -l the file permissions are shown right after the filetype, as three groups of three characters each, in the order r, w and x. Here is what they mean. Keep in mind that a dash represents the lack of a particular permission.
Permissions on Files
**r**
Stands for read and has an octal value of 4 (don’t worry, we will discuss octals shortly). This means permission to open a file and read its contents.
**w**
Stands for write and has an octal value of 2. This means permission to edit or delete a file.
**x**
Stands for execute and has an octal value of 1. This means that the file can be run as an executable or script. So, for example, a file with permissions rw- can be read and written to, but cannot be executed.
Permissions on Directories
**r**
Stands for read and has an octal value of 4. This means permission to read the directory’s contents, like filenames. But it does not imply permission to read the files themselves.
**w**
Stands for write and has an octal value of 2. This means permission to create or delete files in a directory, or change their names, permissions and owners. If a user has the write permission on a directory, the user can change permissions of any file in the directory, even if the user has no permissions on the file or if the file is owned by another user.
**x**
Stands for execute and has an octal value of 1. This means permission to enter a directory, but not to list its files (for that, the r permission is needed). The last bit about directories may sound a bit confusing. Let’s imagine, for example, that you have a directory named Another_Directory, with the following permissions:
```console
$ ls -ld Another_Directory/
d--xr-xr-x 2 carol carol 4,0K Dec 20 18:46 Another_Directory
```
Also imagine that inside this directory you have a shell script called hello.sh with the following permissions: -rwxr-xr-x 1 carol carol 33 Dec 20 18:46 hello.sh
If you are the user carol and try to list the contents of Another_Directory, you will get an error message, as your user lacks read permission for that directory:
```console
$ ls -l Another_Directory/
ls: cannot open directory 'Another_Directory/': Permission denied
```
However, the user carol does have execute permissions, which means that she can enter the directory. Therefore, the user carol can access files inside the directory, as long as she has the correct permissions for the respective file. In this example, the user has full permissions for the script hello.sh, so she can run the script, even if she can’t read the contents of the directory containing it. All that is needed is the complete filename.
```console
$ sh Another_Directory/hello.sh

Hello LPI World!
```
As we said before, permissions are specified in sequence: first for the owner of the file, then for the owning group, and then for other users. Whenever someone tries to perform an action on the file, the permissions are checked in the same fashion. First the system checks if the current user owns the file, and if this is true it applies the first set of permissions only. Otherwise, it checks if the current user belongs to the group owning the file. In that case, it applies the second set of permissions only. In any other case, the system will apply the third set of permissions. This means that if the current user is the owner of the file, only the owner permissions are effective, even if the group or other permissions are more permissive than the owner’s permissions.
#### Modifying File Permissions

The command chmod is used to modify the permissions for a file, and takes at least two parameters: the first one describes which permissions to change, and the second one points to the file or directory where the change will be made. However, the permissions to change can be described in two different ways, or “modes”. The first one, called symbolic mode offers fine grained control, allowing you to add or revoke a single permission without modifying others on the set. The other mode, called numeric mode, is easier to remember and quicker to use if you wish to set all permission values at once. Both modes will lead to the same end result. So, for example, the commands:
```console
$ chmod ug+rw-x,o-rwx text.txt

and
$ chmod 660 text.txt

will produce exactly the same output, a file with the permissions set:
-rw-rw---- 1 carol carol

765 Dec 20 21:25 text.txt
```
Now, let’s understand how each mode works.
#### Symbolic Mode

When describing which permissions to change in symbolic mode the first character(s) indicate(s) whose permissions you will alter: the ones for the user (u), for the group (g), for others (o) and/or for all the three together (a). Then you need to tell the command what to do: you can grant a permission (+), revoke a permission (-), or set it to a specific value (=). Lastly, you specify which permission you wish to affect: read (r), write (w), or execute (x). For example, imagine we have a file called text.txt with the following permission set:
```console
$ ls -l text.txt
-rw-r--r-- 1 carol carol 765 Dec 20 21:25 text.txt
```
If you wish to grant write permissions to members of the group owning the file, you would use the g+w parameter. It is easier if you think about it this way: “For the group (g), grant (+) write permissions (w)”. So, the command would be:
```console
$ chmod g+w text.txt

Let’s check the result with ls:
$ ls -l text.txt
-rw-rw-r-- 1 carol carol 765 Dec 20 21:25 text.txt
```
If you want to remove read permissions for the owner of the same file, think about it as: “For the user (u) revoke (-), read permissions (r)”. So the parameter is u-r, like so:
```console
$ chmod u-r text.txt
$ ls -l text.txt
--w-rw-r-- 1 carol carol 765 Dec 20 21:25 text.txt
```
What if we want to set the permissions exactly as rw- for everyone? Then think of it as: “For all ( a), set exactly (=), read (r), write (w), and no execute (-)”. So:
```console
$ chmod a=rw- text.txt
$ ls -l text.txt

-rw-rw-rw- 1 carol carol 765 Dec 20 21:25 text.txt
```
Of course, it is possible to modify multiple permissions at the same time. In this case, separate them with a comma (,):
```console
$ chmod u+rwx,g-x text.txt
$ ls -lh text.txt
-rwxrw-rw- 1 carol carol 765 Dec 20 21:25 text.txt
```
The example above can be read as: “For the user (u), grant (+) read, write and execute (rwx) permissions, for the group (g) revoke (-), execute permissions (x)”. When run on a directory, chmod modifies only the directory’s permissions. chmod has a recursive mode, useful when you want to change the permissions for “all files inside a directory and its subdirectories”. To use this, add the parameter -R after the command name and before the permissions to change, like so:
```console
$ chmod -R u+rwx Another_Directory/

This command can be read as: “Recursively (-R), for the user (u), grant (+) read, write and execute
(rwx) permissions”.
```
**WARNING**
Be careful and think twice before using the -R switch, as it is easy to change permissions on files and directories which you do not want to change, especially on directories with a large number of files and sub-directories.
#### Numeric Mode

In numeric mode, the permissions are specified in a different way: as a three-digit numeric value on octal notation, a base-8 numeric system. Each permission has a corresponding value, and they are specified in the following order: first comes read (r), which is 4, then write (w), which is 2 and last is execute (x), represented by 1. If there is no permission, use the value zero (0). So, a permission of rwx would be 7 (4+2+1) and r-x would be 5 (4+0+1). The first of the three digits on the permission set represents the permissions for the user (u), the second for the group (g) and the third for the other (o). If we wanted to set the permissions for a file to rw-rw----, the octal value would be 660:
```console
$ chmod 660 text.txt
$ ls -l text.txt
-rw-rw---- 1 carol carol 765 Dec 20 21:25 text.txt
```
Besides this, the syntax in numeric mode is the same as in symbolic mode, the first parameter represents the permissions you wish to change, and the second one points to the file or directory where the change will be made.
**TIP**
If a permission value is odd, the file surely is executable!
Which syntax to use? The numeric mode is recommended if you want to change the permissions to a specific value, for example 640 (rw- r-- ---). The symbolic mode is more useful if you want to flip just a specific value, regardless of the current permissions for the file. For example, I can add execute permissions for the user using just chmod u+x script.sh without regard to, or even touching, the current permissions for the group and others.
#### Modifying File Ownership

The command chown is used to modify the ownership of a file or directory. The syntax is quite simple: chown username:groupname filename
For example, let’s check a file called text.txt:
```console
$ ls -l text.txt
-rw-rw---- 1 carol carol 1881 Dec 10 15:57 text.txt
```
The user who owns the file is carol, and the group is also carol. Now, let’s modify the group owning the file to some other group, like students:
```console
$ chown carol:students text.txt
$ ls -l text.txt
-rw-rw---- 1 carol students 1881 Dec 10 15:57 text.txt
```
Keep in mind that the user who owns a file does not need to belong to the group who owns a file. In the example above, the user carol does not need to be a member of the students group.
However, she does have to member of the group in order to transfer the file’s group ownership to that group. User or group can be omitted if you do not wish to change them. So, to change just the group owning a file you would use chown :students text.txt. To change just the user, the command would be chown carol text.txt. Alternatively, you could use the command chgrp students text.txt to change only the group. Unless you are the system administrator (root), you cannot change ownership of a file owned by another user or a group that you don’t belong to. If you try to do this, you will get the error message Operation not permitted.
#### Querying Groups

Before changing the ownership of a file, it might be useful to know which groups exist on the system, which users are members of a group and to which groups a user belongs. Those tasks can be accomplished with two commands, groups and groupmems. To see which groups exist on your system, simply type groups:
```console
$ groups
carol students cdrom sudo dip plugdev lpadmin sambashare
```
And if you want to know to which groups a user belongs, add the username as a parameter:
```console
$ groups carol
carol : carol students cdrom sudo dip plugdev lpadmin sambashare
```
To do the reverse, displaying which users belong to a group, use groupmems. The parameter -g specifies the group, and -l will list all of its members:
```console
$ sudo groupmems -g cdrom -l
carol
```
**TIP**
groupmems can only be run as root, the system administrator. If you are not currently logged in as root, add sudo before the command.
#### Special Permissions

Besides the read, write and execute permissions for user, group and others, each file can have three other special permissions which can alter the way a directory works or how a program runs. They can be specified either in symbolic or numeric mode, and are as follows:
**Sticky Bit**
The sticky bit, also called the restricted deletion flag, has the octal value 1 and in symbolic mode is represented by a t within the other’s permissions. This applies only to directories, and on Linux it prevents users from removing or renaming a file in a directory unless they own that file or directory. Directories with the sticky bit set show a t replacing the x on the permissions for others on the output of ls -l:
```console
$ ls -ld Sample_Directory/
drwxr-xr-t 2 carol carol 4096 Dec 20 18:46 Sample_Directory/
```
In numeric mode, the special permissions are specified using a “4-digit notation”, with the first digit representing the special permission to act upon. For example, to set the sticky bit (value 1) for the directory Another_Directory in numeric mode, with permissions 755, the command would be:
```console
$ chmod 1755 Another_Directory
$ ls -ld Another_Directory
drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory

Set GID
```
Set GID, also known as SGID or Set Group ID bit, has the octal value 2 and in symbolic mode is represented by an s on the group permissions. This can be applied to executable files or directories. On executable files, it will grant the process resulting from executing the file access to the privileges of the group who owns the file. When applied to directories, it will make every file or directory created under it inherit the group from the parent directory. Files and directories with SGID bit show an s replacing the x on the permissions for the group on the output of ls -l:
```console
$ ls -l test.sh

-rwxr-sr-x 1 carol carol 33 Dec 11 10:36 test.sh
```
To add SGID permissions to a file in symbolic mode, the command would be:
```console
$ chmod g+s test.sh
$ ls -l test.sh
-rwxr-sr-x 1 carol root

33 Dec 11 10:36 test.sh
```
The following example will make you better understand the effects of SGID on a directory. Suppose we have a directory called Sample_Directory, owned by the user carol and the group users, with the following permission structure:
```console
$ ls -ldh Sample_Directory/
drwxr-xr-x 2 carol users 4,0K Jan 18 17:06 Sample_Directory/
```
Now, let’s change to this directory and, using the command touch, create an empty file inside it. The result would be:
```console
$ cd Sample_Directory/
$ touch newfile
$ ls -lh newfile
-rw-r--r-- 1 carol carol 0 Jan 18 17:11 newfile

As we can see, the file is owned by the user carol and group carol. But, if the directory had the
SGID permission set, the result would be different. First, let’s add the SGID bit to the
Sample_Directory and check the results:
$ sudo chmod g+s Sample_Directory/
$ ls -ldh Sample_Directory/
drwxr-sr-x 2 carol users 4,0K Jan 18 17:17 Sample_Directory/
```
The s on the group permissions indicates that the SGID bit is set. Now, let’s change to this directory and, again, create an empty file with the touch command:
```console
$ cd Sample_Directory/
$ touch emptyfile
$ ls -lh emptyfile
-rw-r--r-- 1 carol users 0 Jan 18 17:20 emptyfile
```
As we can see, the group who owns the file is users. This is because the SGID bit made the file inherit the group owner of its parent directory, which is users.
**Set UID**
SUID, also known as Set User ID, has the octal value 4 and is represented by an s on the user permissions in symbolic mode. It only applies to files and its behavior is similar to the SGID bit, but the process will run with the privileges of the user who owns the file. Files with the SUID bit show an s replacing the x on the permissions for the user on the output of ls -l:
```console
$ ls -ld test.sh
-rwsr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh
```
You can combine multiple special permissions in one parameter by adding them together. So, to set SGID (value 2) and SUID (value 4) in numeric mode for the script test.sh with permissions 755, you would type:
```console
$ chmod 6755 test.sh

And the result would be:
$ ls -lh test.sh
-rwsr-sr-x 1 carol carol 66 Jan 18 17:29 test.sh
```
**TIP**
If your terminal supports color, and these days most of them do, you can quickly see if these special permissions are set by glancing at the output of ls -l. For the sticky bit, the directory name might be shown in a black font with blue background. The same applies for files with the SGID (yellow background) and SUID (red background) bits. Colors may be different depending on which Linux distribution and terminal settings you use.
#### Guided Exercises

1. Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list the permissions for the directory emptydir.
2. Create an empty file named emptyfile with the command touch emptyfile. Now, using chmod with symbolic notation, add execute permissions for the owner of the file emptyfile, and remove write and execute permissions for everyone else. Do this using only one chmod command.
3. What will be the permissions for a file called text.txt after you use the command chmod 754 text.txt?
4. Let’s assume a file named test.sh is a shell script with the following permissions and ownership: -rwxr-sr-x 1 carol root
33 Dec 11 10:36 test.sh
◦ What are the permissions for the owner of the file?
◦ If the user john runs this script, under which user’s privileges will it be run?
◦ Using the numeric notation, which should be the syntax of chmod to “unset” the special permission granted to this file?
1. Consider this file: $ ls -l /dev/sdb1 brw-rw---- 1 root disk 8, 17 Dec 21 18:51 /dev/sdb1
Which kind of file is sdb1? And who can write to it?
1. Consider the following 4 files: drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory ----r--r-- 1 carol carol
0 Dec 11 10:55 foo.bar
-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip drwxr-sr-x 2 carol users 4,0K Jan 18 17:26 Sample_Directory
Write down the corresponding permissions for each file and directory using numeric 4-digit notation. Another_Directory
**foo.bar**

**HugeFile.zip**
Sample_Directory
#### Explorational Exercises

1. Try this on a terminal: create an empty file called emptyfile with the command touch emptyfile. Now “zero out” the permissions for the file with chmod 000 emptyfile. What will happen if you change the permissions for emptyfile by passing only one value for chmod in numeric mode, such as chmod 4 emptyfile? What if we use two, such as chmod 44 emptyfile? What can we learn about the way chmod reads the numerical value?
2. Can you execute a file for which you have execute, but not read permissions (--x)? Why or why not?
3. Consider the permissions for the temporary directory on a Linux system, /tmp: $ ls -l /tmp drwxrwxrwt
19 root root
16K Dec 21 18:58 tmp
User, group and others have full permissions. But can a regular user delete any files inside this directory? Why is this?
1. A file called test.sh has the following permissions: -rwsr-xr-x, meaning the SUID bit is set. Now, run the following commands: $ chmod u-x test.sh $ ls -l test.sh -rwSr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh
What did we do? What does the uppercase S mean?
1. How would you create a directory named Box where all the files are automatically owned by the group users, and can only be deleted by the user who created them?
#### Summary

As a multi-user system, Linux needs a way to track who owns and who can access each file. This is done through a three-level permissions system, and in this lesson we learned all about how this system works. In this lesson you have learned how use ls to get information about file permissions, how to control or change who can create, delete or modify a file with chmod, both in numeric and symbolic notation and how to change the ownership of files with chown and chgrp. The following commands were discussed in this lesson:
**ls**
List files, optionally including details such as permissions.
**chmod**
Change the permissions of a file or directory.
**chown**
Change the owning user and/or group of a file or directory.
**chgrp**
Change the owning group of a file or directory.

### Answers

#### Guided Exercises

1. Create a directory named emptydir using the command mkdir emptydir. Now, using ls, list the permissions for the directory emptydir. Add the -d parameter to ls to see the file attributes of a directory, instead of listing its contents. Therefore the answer is: ls -l -d emptydir
Bonus points if you merged the two parameters in one, as in ls -ld emptydir.
1. Create an empty file named emptyfile with the command touch emptyfile. Now, using chmod in symbolic notation, add execute permissions for the owner of the file emptyfile, and remove write and execute permissions for everyone else. Do this using only one chmod command. Think about it this way: ◦ “For the user who owns the file (u) add (+) execute (x) permissions”, so u+x. ◦ “For the group (g) and other users (o), remove (-) write (w) and execute (x) permissions”, so go-wx. To combine these two sets of permissions, we add a comma between them. So the final result is: chmod u+x,go-wx emptyfile
2. What will be the permissions of a file called text.txt after I use the command chmod 754 text.txt? Remember that in numeric notation each digit represents a set of three permissions, each one with a respective value: read is 4, write is 2, execute is 1 and no permission is 0. We get the value for a digit by adding the corresponding values for each permission. 7 is 4+2+1, or rwx, 5 is 4+0+1, so r-x and 4 is just read, or r--. The permissions for text.txt would be rwxr-xr--
3. Let’s assume a file named test.sh is a shell script with the following permissions and
ownership: -rwxr-sr-x 1 carol root
33 Dec 11 10:36 test.sh
◦ What are the permissions for the owner of the file? The permissions for the owner (2nd to 4th characters in the output of ls -l) are rwx, so the answer is: “to read, to write to and to execute the file”. ◦ If the user john runs this script, under which user’s privileges will it be run? Pay attention to the permissions for the group. They are r-s, which means the SGID bit is set. The group who owns this file is root, so the script, even when started by a regular user, will be run with root privileges. ◦ Using the numeric notation, which should be the syntax of chmod to “unset” the special permission granted to this file? We can “unset” the special permissions by passing a 4th digit, 0, to chmod. The current permissions are 755, so the command should be chmod 0755.
1. Consider this file: $ ls -l /dev/sdb1 brw-rw---- 1 root disk 8, 17 Dec 21 18:51 /dev/sdb1
Which kind of file is sdb1? And who can write to it? The first character of the output from ls -l shows the kind of file. b is a block device, usually a disk (internal or external), connected to the machine. The owner (root) and any users of the group disk can write to it.
1. Consider the following 4 files: drwxr-xr-t 2 carol carol 4,0K Dec 20 18:46 Another_Directory ----r--r-- 1 carol carol
0 Dec 11 10:55 foo.bar
-rw-rw-r-- 1 carol carol 1,2G Dec 20 18:22 HugeFile.zip drwxr-sr-x 2 carol users 4,0K Jan 18 17:26 Sample_Directory
Write down the corresponding permissions for each file and directory using 4-digit numeric notation.
The corresponding permissions, in numeric notation, are as follows:
**Another_Directory**
Answer: 1755 1 for the sticky bit, 755 for the regular permissions (rwx for the user, r-x for group and others).
**foo.bar**
Answer: 0044 No special permissions (so the first digit is 0), no permissions for the user (---) and just read (r—r--) for group and others.
**HugeFile.zip**
Answer: 0664 No special permissions, so the first digit is 0. 6 (rw-) for the user and group, 4 (r--) for the others.
**Sample_Directory**
Answer: 2755 2 for the SGID bit, 7 (rwx) for the user, 5 (r-x) for the group and others.

#### Explorational Exercises

1. Try this on a terminal: create an empty file called emptyfile with the command touch emptyfile. Now “zero out” the permissions for the file with chmod 000 emptyfile. What will happen if you change the permissions for emptyfile by passing only one value for chmod in numeric notation, such as chmod 4 emptyfile? What if we use two, such as chmod 44 emptyfile? What can we learn about the way chmod reads the numerical value? Remember that we “zeroed out” the permissions for emptyfile. So, its initial state would be: ---------- 1 carol carol
0 Dec 11 10:55 emptyfile
Now, let’s try the first command, chmod 4 emptyfile:
```console
$ chmod 4 emptyfile
$ ls -l emptyfile
-------r-- 1 carol carol 0 Dec 11 10:55 emptyfile
```
The permissions for others were changed. And what if we try two digits, such as chmod 44 emptyfile?
```console
$ chmod 44 emptyfile
$ ls -l emptyfile
----r--r-- 1 carol carol 0 Dec 11 10:55 emptyfile
```
Now, the permissions for group and others were affected. From this, we can conclude that in numeric notation chmod reads the value “backwards”, from the least significant digit (others) to the most significant one (user). If you pass one digit, you modify the permissions for others. With two digits you modify group and others, and with three you modify user, group and others and with four digits you modify user, group, others and the special permissions.
1. Can you execute a file for which you have execute, but not read permissions (--x)? Why or why not? At first, the answer seems obvious: If you have execute permission, the file should run. This applies to programs in binary format that are executed directly by the kernel. However, there are programs (e.g. shell scripts) that must first be read and interpreted, so in these cases the read permission (r) must also be set.
2. Consider the permissions for the temporary directory on a Linux system, /tmp: $ ls -l /tmp drwxrwxrwt
19 root root
16K Dec 21 18:58 tmp
User, group and others have full permissions. But can a regular user delete any files inside this directory? Why is this? /tmp is what we call a world writeable directory, meaning that any user can write to it. But we don’t want one user modifying files created by others, so the sticky bit_ is set (as indicated by the t on the permissions for others). This means that a user can delete files in /tmp, but only if they created that file.
1. A file called test.sh has the following permissions: -rwsr-xr-x, meaning the SUID bit is set. Now, run the following commands: $ chmod u-x test.sh $ ls -l test.sh -rwSr-xr-x 1 carol carol 33 Dec 11 10:36 test.sh
What did we do? What does the uppercase S mean? We removed execute permissions for the user who owns the file. The s (or t) takes the place of the x on the output of ls -l, so the system needs a way to show if the user has execute permissions or not. It does this by changing the case of the special character. A lowercase s on the first group of permissions means that the user who owns the file has execute permissions and that the SUID bit is set. An uppercase S means that the user who owns the file lacks (-) execute permissions and that the SUID bit is set. The same can be said for SGID. A lowercase s on the second group of permissions means that the group who owns the file has execute permissions and that the SGID bit is set. An uppercase S means that the group who owns the file lacks (-) execute permissions and that the SGID bit is set. This is also true for the sticky bit, represented by the t in the third group of permissions. Lowercase t means the sticky bit is set and that others have execute permissions. Uppercase T means the sticky bit is set and that others do not have execute permissions.
1. How would you create a directory named Box where all the files are automatically owned by the group users, and can only be deleted by the user who created them?
This is a multi-step process. The first step is to create the directory:
```console
$ mkdir Box
```
We want every file created inside this directory to be automatically assigned to the group users. We can do this by setting this group as the owner of the directory, and then by setting the SGID bit on it. We also need to make sure that any member of the group can write to that directory. Since we do not care about what the other permissions are, and want to “flip” only the special bits, it makes sense to use the symbolic mode:
```console
$ chown :users Box/
$ chmod g+wxs Box/
```
Note that if you current user does not belong to the group users, you will have to use the command sudo before the commands above to do the change as root. Now for the last part, making sure that only the user who created a file is allowed to delete it. This is done by setting the sticky bit (represented by a t) on the directory. Remember that it is set on the permissions for others (o).
```console
$ chmod o+t Box/
```
The permissions on the directory Box should appear as follows: drwxrwsr-t 2 carol users
4,0K Jan 18 19:09 Box
Of course, you can specify SGID and the sticky bit using only one chmod command:
```console
$ chmod g+wxs,o+t Box/

Bonus points if you thought of that.
```
