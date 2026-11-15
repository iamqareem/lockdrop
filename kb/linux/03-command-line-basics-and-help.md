---
id: linux-03
track: linux-engineer
title: "Command Line Basics and Getting Help"
slug: 03-command-line-basics-and-help
source: "LPI Learning Material 010-160"
sourceSection: "2.1, 2.2"
topic: "2"
tags: [linux, lpic-1, shell, command-line, help]
summary: "The anatomy of a shell command, variables, quoting, and the several ways to find help for any command you meet."
---
# Finding Your Way on a Linux System

## 2.1 Command Line Basics

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 2.1
**Weight:** 3
**Key knowledge areas**
- Basic shell
- Command line syntax
- Variables
- Quoting
**Partial list of the used files, terms and utilities**
- Bash
- echo
- history
- PATH environment variable
- export
- type

### 2.1 Lesson 1

#### Introduction

Modern Linux distributions have a wide range of graphical user interfaces but an administrator will always need to know how to work with the command line, or shell as it is called. The shell is a program that enables text based communication between the operating system and the user. It is usually a text mode program that reads the user’s input and interprets it as commands to the system. There are several different shells on Linux, these are just a few:
- Bourne-again shell (Bash)
- C shell (csh or tcsh, the enhanced csh)
- Korn shell (ksh)
- Z shell (zsh)
On Linux the most common one is the Bash shell. This is also the one that will be used in examples or exercises here. When using an interactive shell, the user inputs commands at a so-called prompt. For each Linux distribution, the default prompt may look a little different, but it usually follows this structure: username@hostname current_directory shell_type
On Ubuntu or Debian GNU/Linux, the prompt for a regular user will likely look like this: carol@mycomputer:~$
The superuser’s prompt will look like this: root@mycomputer:~#
On CentOS or Red Hat Linux, the prompt for a regular user will instead look like this: [dave@mycomputer ~]$
And the superuser’s prompt will look like this: [root@mycomputer ~]#
Let’s explain each component of the structure:
**username**
Name of the user that runs the shell
**hostname**
Name of the host on which the shell runs. There is also a command hostname, with which you can show or set the system’s host name.
**current_directory**
The directory that the shell is currently in. A ~ means that the shell is in the current user’s home directory.
**shell_type**
$ indicates the shell is run by a regular user. # indicates the shell is run by the superuser root.
As we do not need any special privileges, we will use an unprivileged prompt in the following examples. For brevity, we will just use the $ as prompt.
#### Command Line Structure

Most commands at the command line follow the same basic structure: command
[option(s)/parameter(s)...]
[argument(s)...]
Take the following command as an example:
```console
$ ls -l /home
```
Let’s explain the purpose of each component:
**Command**
Program that the user will run – ls in the above example.
**Option(s)/Parameter(s)**
A “switch” that modifies the behavior of the command in some way, such as -l in the above example. Options can be accessed in a short and in a long form. For example, -l is identical to --format=long. Multiple options can be combined as well and for the short form, the letters can usually be typed together. For example, the following commands all do the same:
```console
$ ls -al
$ ls -a -l
$ ls --all --format=long
```
**Argument(s)**
Additional data that is required by the program, like a filename or path, such as /home in the above example. The only mandatory part of this structure is the command itself. In general, all other elements are optional, but a program may require certain options, parameters or arguments to be specified.
**NOTE**
Most commands display a short overview of available options when they are run with the --help parameter. We will learn additional ways to learn more about Linux commands soon.
#### Command Behavior Types

The shell supports two types of commands:
**Internal**
These commands are part of the shell itself and are not separate programs. There are around 30 such commands. Their main purpose is executing tasks inside the shell (e.g. cd, set, export).
**External**
These commands reside in individual files. These files are usually binary programs or scripts. When a command which is not a shell builtin is run, the shell uses the PATH variable to search for an executable file with same name as the command. In addition to programs which are installed with the distribution’s package manager, users can create their own external commands as well. The command type shows what type a specific command is:
```console
$ type echo
echo is a shell builtin
$ type man
man is /usr/bin/man
```
#### Quoting

As a Linux user, you will have to create or manipulate files or variables in various ways. This is easy when working with short filenames and single values, but it becomes more complicated when, for example, spaces, special characters and variables are involved. Shells provide a feature called quoting which encapsulates such data using various kinds of quotes (" ", ' '). In Bash, there are three types of quotes:
- Double quotes
- Single quotes
- Escape characters
For example, the following commands do not act in the same way due to quoting:
```console
$ TWOWORDS="two words"
$ touch $TWOWORDS
$ ls -l
-rw-r--r-- 1 carol carol

0 Mar 10 14:56 two

-rw-r--r-- 1 carol carol

0 Mar 10 14:56 words

$ touch "$TWOWORDS"
$ ls -l
-rw-r--r-- 1 carol carol

0 Mar 10 14:56

-rw-r--r-- 1 carol carol

0 Mar 10 14:58 'two words'

two

-rw-r--r-- 1 carol carol

0 Mar 10 14:56

words

$ touch '$TWOWORDS'
$ ls -l
-rw-r--r-- 1 carol carol

0 Mar 10 15:00 '$TWOWORDS'

-rw-r--r-- 1 carol carol

0 Mar 10 14:56

-rw-r--r-- 1 carol carol

0 Mar 10 14:58 'two words'

-rw-r--r-- 1 carol carol

0 Mar 10 14:56
```
**NOTE**
**two**
words
The line with TWOWORDS= is a Bash variable that we have created ourselves. We will introduce variables later. This is just meant to show you how quoting affects the output of variables.
**Double Quotes**
Double quotes tell the shell to take the text in between the quote marks ("...") as regular characters. All special characters lose their meaning, except the $ (dollar sign), \ (backslash) and ` (backquote). This means that variables, command substitution and arithmetic functions can still be used. For example, the substitution of the $USER variable is not affected by the double quotes:
```console
$ echo I am $USER
I am tom
$ echo "I am $USER"
I am tom
```
A space character, on the other hand, loses its meaning as an argument separator:
```console
$ touch new file
$ ls -l
-rw-rw-r-- 1 tom students 0 Oct 8 15:18 file
-rw-rw-r-- 1 tom students 0 Oct 8 15:18 new

$ touch "new file"
$ ls -l
-rw-rw-r-- 1 tom students 0 Oct 8 15:19 new file
```
As you can see, in the first example, the touch command creates two individual files, the command interprets the two strings as individual arguments. In the second example, the command interprets both strings as one argument, therefore it only creates one file. It is, however, best practice to avoid the space character in filenames. Instead, an underscore (_) or a dot (.) could be used.
**Single Quotes**
Single quotes don’t have the exceptions of the double quotes. They revoke any special meaning from each character. Let’s take one of the first examples from above:
```console
$ echo I am $USER
I am tom
```
When applying the single quotes you see a different result:
```console
$ echo 'I am $USER'
I am $USER
```
The command now displays the exact string without substituting the variable.
**Escape Characters**
We can use escape characters to remove special meanings of characters from Bash. Going back to the $USER environment variable:
```console
$ echo $USER
carol
```
We see that by default, the contents of the variable are displayed in the terminal. However, if we were to precede the dollar sign with a backslash character (\) then the special meaning of the dollar sign will be negated. This in turn will not let Bash expand the variable’s value to the username of the person running the command, but will instead interpret the variable name literally:
```console
$ echo \$USER
$USER
```
If you recall, we can get similar results to this using the single quote, which prints the literal contents of whatever is between the single quotes. However the escape character works differently by instructing Bash to ignore whatever special meaning the character it precedes may possess.
#### Guided Exercises

1. Split the lines below into the components of command, option(s)/parameter(s) and argument(s): ◦ Example: cat -n /etc/passwd Command:
```console
cat
```
Option:
-n
Argument:
/etc/passwd
**◦ ls -l /etc**
Command: Option: Argument: ◦ ls -l -a Command: Option: Argument: ◦ cd /home/user Command: Option: Argument:
1. Find what type the following commands are: Example: pwd
Shell builtin
```console
mv
```
External command
```console
cd
```
**cat**
exit
1. Resolve the following commands that use quotes: Example: echo "$HOME is my home directory"
echo /home/user is my home directory
**touch "$USER"**
touch 'touch'
#### Explorational Exercises

1. With one command and using brace expansion in Bash (review the man page for Bash), create 5 files numbered 1 to 5 with the prefix game (game1, game2, …).
2. Delete all 5 files that you just created with just one command, using a different special character (review Pathname Expansion in the Bash man pages).
3. Is there any other way to make two commands interact with each other? What are those?
#### Summary

In this lab you learned:
- Concepts of the Linux shell
- What is the Bash shell
- The structure of the command line
- An introduction to quoting
Commands used in the exercises:
**bash**
The most popular shell on Linux computers.
**echo**
Output text on the terminal.
**ls**
List the contents of a directory.
**type**
Show how a specific command is executed.
**touch**
Create an empty file or update an existing file’s modification date.
**hostname**
Show or change a system’s hostname.

### 2.1 Lesson 2

#### Introduction

All shells manage a set of status information throughout the shell sessions. This runtime information may change during the session and influences how the shell behaves. This data is also used by programs to determinate aspects of the system’s configuration. Most of this data is stored in so-called variables, which we will cover in this lesson.
#### Variables

Variables are pieces of storage for data, such as text or numbers. Once set, a variable’s value can be accessed at a later time. Variables have a name which allows accessing a specific variable, even when the variable’s content changes. They are a very common tool in most programming languages. In most Linux shells, there are two types of variables: Local variables These variables are available to the current shell process only. If you create a local variable and then start another program from this shell, the variable is not accessible to that program
anymore. Because they are not inherited by sub processes, these variables are called local variables. Environment variables These variables are available both in a specific shell session and in sub processes spawned from that shell session. Theses variables can be used to pass configuration data to commands which are run. Because these programs can access these variables, they are called environment variables. The majority of the environment variables are in capital letters (e.g. PATH, DATE, USER). A set of default environment variables provide, for example, information about the user’s home directory or terminal type. Sometimes the complete set of all environment variables is referred to as the environment.
**NOTE**
Variables are not persistent. When the shell in which they were set is closed, all variables and their contents are lost. Most shells provide configuration files that contain variables which are set whenever a new shell is started. Variables that should be set permanently must be added to one of these configuration files.
#### Manipulating Variables

As a system administrator, you will need to create, modify or remove both local and environment variables.
**Working with Local Variables**
You can set up a local variable by using the = (equal) operator. A simple assignment will create a local variable:
```console
$ greeting=hello
```
**NOTE**
Don’t put any space before or after the = operator.
You can display any variable using the echo command. The command usually displays the text in the argument section:
```console
$ echo greeting
greeting
```
In order to access the value of the variable you will need to use $ (dollar sign) in front of the variable’s name.
```console
$ echo $greeting
hello
```
As it can be seen, the variable has been created. Now open another shell and try to display the contents of the variable created.
```console
$ echo $greeting
```
Nothing is displayed. This illustrates, that variables always exist in a specific shell only. To verify that the variable is actually a local variable, try to spawn a new process and check if this process can access the variable. We can do so by starting another shell and let this shell run the echo command. As the new shell is run in a new process, it won’t inherit local variables from its parent process:
```console
$ echo $greeting world
hello world
$ bash -c 'echo $greeting world'
world
```
**NOTE**
Make sure to use single quotes in the example above.
In order to remove a variable, you will need to use the command unset:
```console
$ echo $greeting
hey
$ unset greeting
$ echo $greeting
```
**NOTE**
unset requires the name of the variable as an argument. Therefore you may not add $ to the name, as this would resolve the variable and pass the variable’s value to unset instead of the variable’s name.
**Working with Global Variables**
To make a variable available to subprocesses, turn it from a local into an environment variable. This is done by the command export. When it is invoked with the variable name, this variable is added to the shell’s environment:
```console
$ greeting=hello
$ export greeting
```
**NOTE**
Again, make sure to not use $ when running export as you want to pass the name of the variable instead of its contents.
An easier way to create the environment variable is to combine both of the above methods, by assigning the variable value in the argument part of the command.
```console
$ export greeting=hey
```
Let’s check again if the variable is accessible to subprocesses:
```console
$ export greeting=hey
$ echo $greeting world
hey world
$ bash -c 'echo $greeting world'
hey world
```
Another way to use environment variables is to use them in front of commands. We can test this with the environment variable TZ which holds the timezone. This variable is used by the command date to determine which timezone’s time to display:
```console
$ TZ=EST date
Thu 31 Jan 10:07:35 EST 2019
$ TZ=GMT date
Thu 31 Jan 15:07:35 GMT 2019
```
You can display all environment variables using the env command.
**The PATH Variable**
The PATH variable is one of the most important environment variables in a Linux system. It stores a list of directories, separated by a colon, that contain executable programs eligible as commands from the Linux shell.
```console
$ echo $PATH
/home/user/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
```
To append a new directory to the variable, you will need to use the colon sign (:).
```console
$ PATH=$PATH:new_directory

Here an example:
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
$ PATH=$PATH:/home/user/bin
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/user/bin
```
As you see, $PATH is used in the new value assigned to PATH. This variable is resolved during the command execution and makes sure that the original content of the variable is preserved. Of course, you can use other variables in the assignment as well:
```console
$ mybin=/opt/bin
$ PATH=$PATH:$mybin
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/user/bin:/opt/bin
```
The PATH variable needs to be handled with caution, as it is crucial for working on the command line. Let’s consider the following PATH variable:
```console
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```
To find out how the shell invokes a specific command, which can be run with the command’s name as argument. We can, for example, try to find out where nano is stored:
```console
$ which nano
/usr/bin/nano
```
As it can be seen, the nano executable is located within the /usr/bin directory. Let’s remove the directory from the variable and check to see if the command still works:
```console
$ PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/sbin:/bin:/usr/games
$ echo $PATH

/usr/local/sbin:/usr/local/bin:/usr/sbin:/sbin:/bin:/usr/games

Let’s look up the nano command again:
$ which nano
which: no nano in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/sbin:/bin:/usr/games)
```
As it can be seen, the command is not found, therefore not executed. The error message also explains the reason why the command was not found and in what locations it was searched. Let’s add back the directories and try running the command again.
```console
$ PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
$ which nano
/usr/bin/nano

Now our command works again.
```
**TIP**
The order of elements in PATH also defines the lookup order. The first matching executable found while going through the paths is executed.
#### Guided Exercises

1. Create a local variable number.
2. Create an environment variable ORDER, using one of the two above methods.
3. Display both the variable names and their contents.
4. What are the scopes of the previously created variables?
#### Explorational Exercises

1. Create a local variable nr_files and assign the number of lines found in the /etc/passwd file. Hint: Look into the command wc and command substitution and don’t forget about quotation marks.
2. Create an environment variable ME. Assign the USER variable’s value to it.
3. Append the HOME variable’s value to ME, having the : delimiter. Display the contents of the ME variable.
4. Using the date example above, create a variable called today and assign the date for one of the time zones.
5. Create another variable called today1 and assign the system’s date to it.
#### Summary

In this lab you learned:
- Types of variables
- How to create variables
- How to manipulate variables
Commands used in the exercises:
**env**
Display the current environment.
**echo**
Output text.
**export**
Make local variables available to subprocesses.
**unset**
Remove a variable.

### Answers

#### Guided Exercises

**Lesson 1**

1. Split the lines below into the components of command, option(s)/parameter(s) and argument(s): ◦ ls -l /etc Command:
```console
ls
```
Option:
-l
Argument:
/etc
**◦ ls -l -a**
Command:
```console
ls
```
Option:
-l -a
Argument: ◦ cd /home/user cd
Command: Option: Argument:
/home/user
1. Find what type the following commands are: cd
Shell builtin
```console
cat
```
External command
```console
exit
```
Shell builtin
1. Resolve the following commands that use quotes: touch "$USER"
tom
```console
touch 'touch'
```
Creates a file named touch

**Lesson 2**

1. Create a local variable number. $ number=5
2. Create an environment variable ORDER, using one of the two above methods. $ export ORDER=desc
3. Display both the variable names and their contents. $ echo number number $ echo ORDER ORDER $ echo $number 5 $ echo $ORDER desc
4. What are the scopes of the previously created variables? ◦ The scope of the local variable number is the current shell only. ◦ The scope of the environment variable ORDER is the current shell and all the subshells generated by it.

#### Explorational Exercises

**Lesson 1**

1. With one command and using brace expansion in Bash (review the man page for Bash), create 5 files numbered 1 to 5 with the prefix game (game1, game2, …). Ranges can be used to express the numbers from 1 to 5 within one command: $ touch game{1..5} $ ls game1
game2
game3
game4
game5
1. Delete all 5 files that you just created with just one command, using a different special character (review Pathname Expansion in the Bash man pages). Since all files start with game and end in a single character (a number from 1 to 5 in this case), ? can be used as a special character for the last character in the filename: $ rm game?
2. Is there any other way to make two commands interact with each other? What are those? Yes, one command could, for example, write data to a file which is then processed by another command. Linux can also collect the output of one command and use it as input for another command. This is called piping and we will learn more about it in a future lesson.

**Lesson 2**

1. Create a local variable nr_files and assign the number of lines found in the /etc/passwd file. Hint: Look into the command wc and command substitution and don’t forget about quotation marks. $ nr_files=`wc -l /etc/passwd`
2. Create an environment variable ME. Assign the USER variable’s value. $ export ME=$USER
3. Append the HOME variable value to ME, having the : delimiter. Display the contents of the ME variable. $ ME=$ME:$HOME $ echo $ME user:/home/user
4. Using the date example above, create a variable called today and assign the date for one of the time zones. The following use the GMT and EST time zones as an example, but any time zone selection is valid. $ today=$(TZ=GMT date) $ echo $today Thu 31 Jan 15:07:35 GMT 2019
or
```console
$ today=$(TZ=EST date)
$ echo $today
Thu 31 Jan 10:07:35 EST 2019
```
1. Create another variable called today1 and assign the system’s date to it. Assuming that you are in GMT:
```console
$ today1=$(date)
$ echo $today1
Thu 31 Jan 10:07:35 EST 2019
```

## 2.2 Using the Command Line to Get Help

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 2.2
**Weight:** 2
**Key knowledge areas**
- Man pages
- Info pages
**Partial list of the used files, terms and utilities**
- man
- info
- /usr/share/doc/
- locate

### 2.2 Lesson 1

#### Introduction

The command line is a very complex tool. Each command has its own unique options, therefore documentation is key when working with a Linux system. Besides the /usr/share/doc/ directory, which stores most of the documentation, various other tools provide information on using Linux commands. This chapter focuses on methods to access that documentation, with the purpose of getting help. There are a multitude of methods to get help within the Linux command line. man, help and info are just a few of them. For Linux Essentials, we will be focusing on man and info as they are the most commonly used tools for obtaining help. Another topic of this chapter will be locating files. You will mainly work with the locate command.
#### Getting Help on the Command Line

**Built-in Help**
When started with the --help parameter, most commands display some brief instructions about their usage. Although not all commands provide this switch, it is still a good first try to learn more about the parameters of a command. Be aware that the instructions from --help often are rather brief compared to the other sources of documentation which we will discuss in the rest of this lesson.
**Man Pages**
Most commands provide a manual page or “man” page. This documentation is usually installed with the software and can be accessed with the man command. The command whose man page should be displayed is added to man as an argument:
```console
$ man mkdir
```
This command opens the man page for mkdir. You can use the up and down arrow keys or the space bar to navigate through the man page. To exit the man page, press Q . Each man page is divided in maximum of 11 sections, though many of these sections are optional: Section
Description
NAME
Command name and brief description
SYNOPSIS
Description of the command’s syntax
DESCRIPTION
Description of the effects of the command
OPTIONS
Available options
ARGUMENTS
Available arguments
FILES
Auxiliary files
EXAMPLES
A sample of the command line
SEE ALSO
Cross-references to the related topics
DIAGNOSTICS
Warning and Error messages
COPYRIGHT
Author(s) of the command
BUGS
Any known limitations of the command
In practice, most man pages don’t contain all of these parts.
Man pages are organized in eight categories, numbered from 1 to 8: Category
Description
1
User command
2
System calls
3
Functions of the C library
4
Drivers and device files
5
Configuration files and file formats
6
Games
7
Miscellaneous
8
System administrator commands
9
Kernel functions (not standard)
Each man page belongs to exactly one category. However, multiple categories can contain man pages with the same name. Let’s take the passwd command as an example. This command can be used to change a user’s password. Since passwd is a user command, its man page resides in category 1. In addition to the passwd command, the password database file /etc/passwd also has a man page which is called passwd, too. As this file is a configuration file, it belongs to category 5. When referring to a man page, the category is often added to the name of the man page, as in passwd(1) or passwd(5) to identify the respective man page. By default, man passwd displays the first available man page, in this case passwd(1). The category of the desired man page can be specified in a command such as man 1 passwd or man 5 passwd. We have already discussed how to navigate through a man page and how to return to the command line. Internally, man uses the less command to display the man page’s content. less lets you search for text within a man page. To search for the word linux you can just use /linux for forward searching from the point that you are on the page, or ?linux to start a backward search. This action highlights the all the matching results and moves the page to the first highlighted match. In both cases you can type N to jump to the next match. In order to find more information about these additional features, press H and a menu with all the information will be displayed.
**Info Pages**
Another tool that will help you while working with the Linux system are the info pages. The info
pages are usually more detailed than the man pages and are formatted in hypertext, similar to web pages on the Internet. The info pages can be displayed like so:
```console
$ info mkdir
```
For each info page, info reads an info file that is structured into individual nodes within a tree. Each node contains a simple topic and the info command contains hyperlinks that can help you move from one to the other. You can access the link by pressing enter while placing the cursor on one of the leading asterisks. Similar to man, the info tool also has page navigation commands. You can find out more about these command by pressing ? while being on the info page. These tools will help you navigate the page easier as well as understand how to access the nodes and move within the node tree.
**The /usr/share/doc/ directory**
As mentioned before, the /usr/share/doc/ directory stores most documentation of the commands that the system is using. This directory contains a directory for most packages installed on the system. The name of the directory is usually the name of the package and occasionally its version. These directories include a README or readme.txt file that contains the package’s basic documentation. Alongside the README file, the folder can also contain other documentation files, such as the changelog which includes the history of the program in detail, or examples of configuration files for the specific package. The information within the README file varies from one package to another. All files are written in plain text, therefore they can be read with any preferred text editor. The exact number and kinds of files depend on the package. Check some of the directories to get an overview of their contents.
#### Locating files

**The locate command**
A Linux system is built from numerous directories and files. Linux has many tools to locate a particular file within a system. The quickest one is the command locate. locate searches within a database and then outputs every name that matches the given string:
```console
$ locate note

/lib/udev/keymaps/zepto-znote
/usr/bin/zipnote
/usr/share/doc/initramfs-tools/maintainer-notes.html
/usr/share/man/man1/zipnote.1.gz
```
The locate command supports the usage of wildcards and regular expressions as well, therefore the search string does not have to match the entire name of the desired file. You will learn more about regular expressions in a later chapter. By default, locate behaves as if the pattern would be surrounded by asterisks, so locate PATTERN is the same as locate *PATTERN*. This allows you just provide substrings instead of the exact filename. You can modify this behavior with the different options that you can find explained in the locate man page. Because locate is reading from a database, you may not find a file that you recently created. The database is managed by a program named updatedb. Usually it is run periodically, but if you have root privileges and you need the database to be updated immediately, you can run the updatedb command yourself at any time.
**The find command**
find is another very popular tool that is used to search for files. This command has a different approach, compared to the locate command. find command searches a directory tree recursively, including its subdirectories. find does such a search at each invocation, it does not maintain a database like locate. Similar to locate, find also supports wildcards and regular expressions. find requires at least the path it should search. Furthermore, so-called expressions can be added to provide filter criteria for which files to display. An example is the -name expression, which looks for files with a specific name: ~$ cd Downloads ~/Downloads
```console
$ find . -name thesis.pdf
./thesis.pdf
~/Downloads
$ find ~ -name thesis.pdf
/home/carol/Downloads/thesis.pdf
```
The first find command searches for the file within the current Downloads directory, whereas the second one searches for the file in the user’s home directory.
The find command is very complex, therefore it will not be covered in the Linux Essentials exam. However, it is a powerful tool which is particularly handy in practice.
#### Guided Exercises

1. Use the man command to find out what each command does: Command
Description
```console
ls
```
Display the contents of a directory.
**cat**
cut cd cp mv mkdir touch wc passwd rm rmdir more less whereis head tail sort tr chmod grep
1. Open the ls info page and identify the MENU. ◦ What options do you have?
◦ Find the option that allows you to sort the output by modification time.
1. Display the path to the first 3 README files. Use the man command to identify the correct option for locate.
2. Create a file called test in your home directory. Find its absolute path with the locate command.
3. Did you find it immediately? What did you have to do in order for locate to find it?
4. Search for the test file that you previously created, using the find command. What syntax did you use and what is the absolute path ?
#### Explorational Exercises

1. There is one command in the table above that doesn’t have a man page. Which one is it and why do you think that the command doesn’t have a man page?
2. Using the commands in the table above, create the following file tree. The names that start with a capital are Directories and the ones in lower case are files. User ├── Documents
├──Hello
├──hey2
├──helloa
└──ola5
└──World
└──earth9
├── Downloads
├──Music
└──Songs
├──collection1
└──collection2
├── Test
└── passa
└── test
1. Display on the screen the present working directory, including the subfolders.
2. Search within the tree for all files that end with a number.
3. Remove the entire directory tree with a single command.
#### Summary

In this lesson you learned:
- How to get help
- How to use the man command
- How to navigate the man page
- Different sections of the man page
- How to use the info command
- How to navigate between different nodes
- How to search for files within the system
Commands used in the exercises:
**man**
Display a man page.
**info**
Display an info page.
**locate**
Search the locate database for files with a specific name.
**find**
Search the file system for names matching a set of selection criteria.
**updatedb**
Update the locate database.

### Answers

#### Guided Exercises

1. Use the man command to find out what each command does: Command
Description
```console
ls
```
Display the contents of a directory.
```console
cat
```
Concatenates or views text files
```console
cut
```
Removes sections from a text file
```console
cd
```
Changes to a different directory
```console
cp
```
Copies a file
```console
mv
```
Moves a file (it can also be used to rename)
```console
mkdir
```
Creates a new directory
```console
touch
```
Creates a file or modifies an existing file’s last modified time and date
```console
wc
```
**Counts the number of words, lines or bytes of**
a file
passwd
Changes a user’s password
```console
rm
```
Deletes a file
```console
rmdir
```
Deletes a directory
```console
more
```
Views text files one screen at a time
```console
less
```
Views text files, allows scrolling up and down a line or page at a time
whereis
**Displays the file path to a specified program**
and related manual files
```console
head
```
Displays the first few lines of a file
```console
tail
```
Displays the last few lines of a file
```console
sort
```
Orders a file numerically or alphabetically
```console
tr
```
Translates or removes characters of a file
```console
chmod
```
Changes a file’s permissions
```console
grep
```
Searches within a file
1. Open the ls info page and identify the MENU.*
◦ What options do you have? ▪ Which files are listed ▪ What information is listed ▪ Sorting the output ▪ Details about version sort ▪ General output formatting ▪ Formatting file timestamps ▪ Formatting the file names ◦ Find the option that allows you to sort the output by modification time. -t or --sort=time
1. Display the path to the first 3 README files. Use the man command to identify the correct option for locate. $ locate -l 3 README /etc/alternatives/README /etc/init.d/README /etc/rc0.d/README
2. Create a file called test in your home directory. Find its absolute path with the locate command. $ touch test $ locate test /home/user/test
3. Did you find it immediately? What did you have to do in order for locate to find it? $ sudo updatedb
The file is newly created, therefore there is no record of it in the database.
1. Search for the test file that you previously created, using the find command. What syntax did you use and what is the absolute path ?
```console
$ find ~ -name test

or
$ find . -name test
/home/user/test
```

#### Explorational Exercises

1. There is one command in the table above that doesn’t have a man page. Which one is it and why do you think that the command doesn’t have a man page? The cd command. It doesn’t have a man page because it is a built-in shell command.
2. Using the commands in the table above, create the following file tree. The names that start with a capital are Directories and the ones in lower case are files. User ├── Documents
├──Hello
├──hey2
├──helloa
└──ola5
└──World
└──earth9
├── Downloads
├──Music
└──Songs
├──collection1
└──collection2
├── Test
└── passa
└── test
The solution is a combination of mkdir and touch commands.
1. Display on the screen the present working directory, including the subfolders. $ ls -R
2. Search within the tree for all files that end with a number. $ find ~ -name "*[0-9]" $ locate "*[0-9]"
3. Remove the entire directory tree with a single command.
```console
$ rm -r Documents Downloads Test test
```
