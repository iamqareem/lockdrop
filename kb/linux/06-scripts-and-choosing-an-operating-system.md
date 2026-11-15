---
id: linux-06
track: linux-engineer
title: "Turning Commands into Scripts and Choosing an Operating System"
slug: 06-scripts-and-choosing-an-operating-system
source: "LPI Learning Material 010-160"
sourceSection: "3.3, 4.1"
topic: "3, 4"
tags: [linux, lpic-1, shell-scripting, exit-codes, operating-systems]
summary: "Turn command lines into executable shell scripts with arguments and exit codes, then weigh the operating system choices available to you."
---
# The Power of the Command Line

## 3.3 Turning Commands into a Script

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 3.3
**Weight:** 4
**Key knowledge areas**
- Basic shell scripting
- Awareness of common text editors (vi and nano)
**Partial list of the used files, terms and utilities**
- #! (shebang)
- /bin/bash
- Variables
- Arguments
- for loops
- echo
- Exit status

### 3.3 Lesson 1

#### Introduction

We have been learning to execute commands from the shell thus far, but we can also enter commands into a file, and then set that file to be executable. When the file is executed, those commands are run one after the other. These executable files are called scripts, and they are an absolutely crucial tool for any Linux system administrator. Essentially, we can consider Bash to be a programming language as well as a shell.
#### Printing Output

Let’s begin by demonstrating a command that you may have seen in previous lessons: echo will print an argument to standard output.
```console
$ echo "Hello World!"
Hello World!
```
Now, we will use file redirection to send this command to a new file called new_script.
```console
$ echo 'echo "Hello World!"' > new_script
$ cat new_script
echo "Hello World!"
```
The file new_script now contains the same command as before.
#### Making a Script Executable

Let’s demonstrate some of the steps required to make this file execute the way we expect it to. A user’s first thought might be to simply type the name of the script, the way they might type in the name of any other command:
```console
$ new_script
/bin/bash: new_script: command not found
```
We can safely assume that new_script exists in our current location, but notice that the error message isn’t telling us that the file doesn’t exist, it is telling us that the command doesn’t exist. It would be useful to discuss how Linux handles commands and executables.
#### Commands and PATH

When we type the ls command into the shell, for example, we are executing a file called ls that exists in our filesystem. You can prove this by using which:
```console
$ which ls
/bin/ls
```
It would quickly become tiresome to type in the absolute path of ls every time we wish to look at the contents of a directory, so Bash has an environment variable which contains all the directories where we might find the commands we wish to run. You can view the contents of this variable by using echo.
```console
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/sn
ap/bin
```
Each of these locations is where the shell expects to find a command, delimited with colons (:). You will notice that /bin is present, but it is safe to assume that our current location is not. The
shell will search for new_script in each of these directories, but it will not find it and therefore will throw the error we saw above. There are three solutions to this issue: we can move new_script into one of the PATH directories, we can add our current directory to PATH, or we can change the way we attempt to call the script. The latter solution is easiest, it simply requires us to specify the current location when calling the script using dot slash (./).
```console
$ ./new_script
/bin/bash: ./new_script: Permission denied
```
The error message has changed, which indicates that we have made some progress.
#### Execute Permissions

The first investigation a user should do in this case is to use ls -l to look at the file:
```console
$ ls -l new_script
-rw-rw-r-- 1 user user 20 Apr 30 12:12 new_script
```
We can see that the permissions for this file are set to 664 by default. We have not set this file to have execute permissions yet.
```console
$ chmod +x new_script
$ ls -l new_script
-rwxrwxr-x 1 user user 20 Apr 30 12:12 new_script
```
This command has given execute permissions to all users. Be aware that this might be a security risk, but for now this is an acceptable level of permission.
```console
$ ./new_script
Hello World!

We are now able to execute our script.
```
#### Defining the Interpreter

As we have demonstrated, we were able to simply enter text into a file, set it as an executable, and
run it. new_script is functionally still a normal text file, but we managed to have it be interpreted by Bash. But what if it is written in Perl, or Python? It is very good practice to specify the type of interpreter we want to use in the first line of a script. This line is called a bang line or more commonly a shebang. It indicates to the system how we want this file to be executed. Since we are learning Bash, we will be using the absolute path to our Bash executable, once again using which:
```console
$ which bash
/bin/bash
```
Our shebang starts with a hash sign and exclamation mark, followed by the absolute path above. Let’s open new_script in a text editor and insert the shebang. Let’s also take the opportunity to insert a comment into our script. Comments are ignored by the interpreter. They are written for the benefit of other users wishing to understand your script.
```console
#!/bin/bash
# This is our first comment. It is also good practice to document all scripts.
echo "Hello World!"
```
We will make one additional change to the filename as well: we will save this file as new_script.sh. The file suffix ".sh" does not change the execution of the file in any way. It is a convention that bash scripts be labelled with .sh or .bash in order to identify them more easily, the same way that Python scripts are usually identified with the suffix .py.
**Common Text Editors**
Linux users often have to work in an environment where graphical text editors are not available. It is therefore highly recommended to develop at least some familiarity with editing text files from the command line. Two of the most common text editors are vi and nano. vi vi is a venerable text editor and is installed by default on almost every Linux system in existence. vi spawned a clone called vi IMproved or vim which adds some functionality but maintains the interface of vi. While working with vi is daunting for a new user, the editor is popular and wellloved by users who learn its many features.
The most important difference between vi and applications such as Notepad is that vi has three different modes. On startup, the keys H , J , K and L are used to navigate, not to type. In this navigation mode, you can press I to enter insert mode. At this point, you may type normally. To exit insert mode, you press Esc to return to navigation mode. From navigation mode, you can press : to enter command mode. From this mode, you can save, delete, quit or change options. While vi has a learning curve, the different modes can in time allow a savvy user to become more efficient than with other editors. nano nano is a newer tool, built to be simple and easier to use than vi. nano does not have different modes. Instead, a user on startup can begin typing, and uses Ctrl to access the tools printed at the bottom of the screen. [ Welcome to nano.
For basic help, type Ctrl+G. ]
^G Get Help
^O Write Out
^W Where Is
^K Cut Text
^X Exit
^R Read File
^\ Replace
^U Uncut Text ^T To Spell
^J Justify
^C Cur Pos
M-U Undo
^_ Go To Line M-E Redo
Text editors are a matter of personal preference, and the editor that you choose to use will have no bearing on this lesson. But becoming familiar and comfortable with one or more text editors will pay off in the future.
#### Variables

Variables are an important part of any programming language, and Bash is no different. When you start a new session from the terminal, the shell already sets some variables for you. The PATH variable is an example of this. We call these environment variables, because they usually define characteristics of our shell environment. You can modify and add environment variables, but for now let’s focus on setting variables inside our script. We will modify our script to look like this:
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username=Carol
echo "Hello $username!"

In this case, we have created a variable called username and we have assigned it the value of
```
Carol. Please note that there are no spaces between the variable name, the equals sign, or the assigned value. In the next line, we have used the echo command with the variable, but there is a dollar sign ($) in front of the variable name. This is important, since it indicates to the shell that we wish to treat username as a variable, and not just a normal word. By entering $username in our command, we indicate that we want to perform a substitution, replacing the name of a variable with the value assigned to that variable. Executing the new script, we get this output:
```console
$ ./new_script.sh
Hello Carol!

• Variable names must contain only alphanumeric characters or underscores, and are case
sensitive. Username and username will be treated as separate variables.
• Variable substitution may also have the format ${username}, with the addition of the { }.
This is also acceptable.
• Variables in Bash have an implicit type, and are considered strings. This means that performing
math functions in Bash is more complicated than it would be in other programming languages
such as C/C++:
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username=Carol
x=2
y=4
z=$x+$y
echo "Hello $username!"
echo "$x + $y"
echo "$z"

$ ./new_script.sh
Hello Carol!
2 + 4
2+4
```
#### Using Quotes with Variables

Let’s make the following change to the value of our variable username:
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username=Carol Smith
echo "Hello $username!"
```
Running this script will give us an error:
```console
$ ./new_script.sh
./new_script.sh: line 5: Smith: command not found
Hello !
```
Keep in mind that Bash is an interpreter, and as such it interprets our script line-by-line. In this case, it correctly interprets username=Carol to be setting a variable username with the value Carol. But it then interprets the space as indicating the end of that assignment, and Smith as being the name of a command. In order to have the space and the name Smith be included as the new value of our variable, we will put double quotes (") around the name.
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username="Carol Smith"
echo "Hello $username!"

$ ./new_script.sh
Hello Carol Smith!
```
One important thing to note in Bash is that double quotes and single quotes (') behave very differently. Double quotes are considered “weak”, because they allow the interpreter to perform substitution inside the quotes. Single quotes are considered “strong”, because they prevent any substitution from occurring. Consider the following example:
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username="Carol Smith"
echo "Hello $username!"
echo 'Hello $username!'

$ ./new_script.sh
Hello Carol Smith!
Hello $username!
```
In the second echo command, the interpreter has been prevented from substituting $username with Carol Smith, and so the output is taken literally.
#### Arguments

You are already familiar with using arguments in the Linux core utilities. For example, rm testfile contains both the executable rm and one argument testfile. Arguments can be passed to the script upon execution, and will modify how the script behaves. They are easily implemented.
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username=$1
echo "Hello $username!"
```
Instead of assigning a value to username directly inside the script, we are assigning it the value of a new variable $1. This refers to the value of the first argument.
```console
$ ./new_script.sh Carol
Hello Carol!
```
The first nine arguments are handled in this way. There are ways to handle more than nine arguments, but that is outside the scope of this lesson. We will demonstrate an example using just
two arguments:
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username1=$1
username2=$2
echo "Hello $username1 and $username2!"

$ ./new_script.sh Carol Dave
Hello Carol and Dave!
```
There is an important consideration when using arguments: In the example above, there are two arguments Carol and Dave, assigned to $1 and $2 respectively. If the second argument is missing, for example, the shell will not throw an error. The value of $2 will simply be null, or nothing at all.
```console
$ ./new_script.sh Carol
Hello Carol and !
```
In our case, it would be a good idea to introduce some logic to our script so that different conditions will affect the output that we wish to print. We will start by introducing another helpful variable and then move on to creating if statements.
#### Returning the Number of Arguments

While variables such as $1 and $2 contain the value of positional arguments, another variable $# contains the number of arguments.
```console
#!/bin/bash
# This is our first comment. It is also good practice to comment all scripts.
username=$1
echo "Hello $username!"
echo "Number of arguments: $#."

$ ./new_script.sh Carol Dave
Hello Carol!
Number of arguments: 2.
```
#### Conditional Logic

The use of conditional logic in programming is a vast topic, and won’t be covered deeply in this lesson. We will focus on the syntax of conditionals in Bash, which differs from most other programming languages. Let’s begin by reviewing what we hope to achieve. We have a simple script which should be able to print a greeting to a single user. If there is anything other than one user, we should print an error message.
- The condition we are testing is the number of users, which is contained in the variable $#. We would like to know if the value of $# is 1.
- If the condition is true, the action we will take is to greet the user.
- If the condition is false, we will print an error message.
Now that the logic is clear, we will focus on the syntax required to implement this logic.
```console
#!/bin/bash
# A simple script to greet a single user.
if [ $# -eq 1 ]
then
username=$1
echo "Hello $username!"
else
echo "Please enter only one argument."
fi
echo "Number of arguments: $#."
```
The conditional logic is contained between if and fi. The condition to test is located between square brackets [ ], and the action to take should the condition be true is indicated after then. Note the spaces between the square brackets and the logic contained. Omitting this space will cause errors.
This script will output either our greeting, or the error message. But it will always print the Number of arguments line.
```console
$ ./new_script.sh
Please enter only one argument.
Number of arguments: 0.
$ ./new_script.sh Carol
Hello Carol!
Number of arguments: 1.
```
Take note of the if statement. We have used -eq to do a numerical comparison. In this case, we are testing that the value of $# is equal to one. The other comparisons we can perform are:
**-ne**
Not equal to
**-gt**
Greater than
**-ge**
Greater than or equal to -lt Less than
**-le**
Less than or equal to
#### Guided Exercises

1. The user types the following to their shell: $ PATH=~/scripts $ ls Command 'ls' is available in '/bin/ls' The command could not be located because '/bin' is not included in the PATH environment variable. ls: command not found
◦ What has the user done?
◦ What command will combine the current value of PATH with the new directory ~/scripts?
1. Consider the following script. Notice that it is using elif to check for a second condition: >
/!bin/bash
**> fruit1 = Apples**
> fruit2 = Oranges if [ $1 -lt $# ] then echo "This is like comparing $fruit1 and $fruit2!" > elif [$1 -gt $2 ] then >
**echo '$fruit1 win!'**
else
>
```console
echo "Fruit2 win!"
```
> done
◦ The lines marked with a > contain errors. Fix the errors.
1. What will the output be in the following situations? $ ./guided1.sh 3 0
```console
$ ./guided1.sh 2 4

$ ./guided1.sh 0 1
```
#### Explorational Exercises

1. Write a simple script that will check if exactly two arguments are passed. If so, print the arguments in reverse order. Consider this example (note: your code may look different than this, but should lead to the same output): if [ $1 == $number ] then echo "True!" fi
2. This code is correct, but it is not a number comparison. Use an internet search to discover how this code is different from using -eq.
3. There is an environment variable that will print the current directory. Use env to discover the name of this variable.
4. Using what you have learned in questions 2 and 3, write a short script that accepts an argument. If an argument is passed, check if that argument matches the name of the current directory. If so, print yes. Otherwise, print no.
#### Summary

In this section, you learned:
- How to create and execute simple scripts
- How to use a shebang to specify an interpreter
- How to set and use variables inside scripts
- How to handle arguments in scripts
- How to construct if statements
- How to compare numbers using numerical operators
Commands used in the exercises:
**echo**
Print a string to standard output.
**env**
Prints all environment variables to standard output.
**which**
Prints the absolute path of a command.
**chmod**
Changes permissions of a file. Special variables used in the exercises: $1, $2, … $9 Contain positional arguments passed to the script. $# Contains the number of arguments passed to the script. $PATH Contains the directories that have executables used by the system. Operators used in the exercises:
**-ne**
Not equal to
**-gt**
Greater than
**-ge**
Greater than or equal to -lt Less than
**-le**
Less than or equal to

### 3.3 Lesson 2

#### Introduction

In the last section, we used this simple example to demonstrate Bash scripting:
```console
#!/bin/bash
# A simple script to greet a single user.
if [ $# -eq 1 ]
then
username=$1
echo "Hello $username!"
else
echo "Please enter only one argument."
fi
echo "Number of arguments: $#."

• All scripts should begin with a shebang, which defines the path to the interpreter.

• All scripts should include comments to describe their use.
• This particular script works with an argument, which is passed to the script when it is called.
• This script contains an if statement, which tests the conditions of a built-in variable $#. This
variable is set to the number of arguments.
• If the number of arguments passed to the script equals 1, then the value of the first argument is
passed to a new variable called username and the script echoes a greeting to the user.
```
Otherwise, an error message is displayed.
- Finally, the script echoes the number of arguments. This is useful for debugging.
This is a useful example to begin explaining some of the other features of Bash scripting.
#### Exit Codes

You will notice that our script has two possible states: either it prints "Hello <user>!" or it prints an error message. This is quite normal for many of our core utilities. Consider cat, which you are no doubt becoming very familiar with. Let’s compare a successful use of cat with a situation where it fails. A reminder that our example above is a script called new_script.sh.
```console
$ cat -n new_script.sh
1

#!/bin/bash

2
3

# A simple script to greet a single user.

4
5

if [ $# -eq 1 ]

6

then

7

username=$1

8
9
10

echo "Hello $username!"
else

11

echo "Please enter only one argument."

12

fi

13

echo "Number of arguments: $#."
```
This command succeeds, and you will notice that the -n flag has also printed line numbers. These are very helpful when debugging scripts, but please note that they are not part of the script. Now we are going to check the value of a new built-in variable $?. For now, just notice the output:
```console
$ echo $?
0
```
Now let’s consider a situation where cat will fail. First we will see an error message, and then check the value of $?.
```console
$ cat -n dummyfile.sh
cat: dummyfile.sh: No such file or directory
$ echo $?
1
```
The explanation for this behaviour is this: any execution of the cat utility will return an exit code. An exit code will tell us if the command succeeded, or experienced an error. An exit code of zero indicates that the command completed successfully. This is true for almost every Linux command that you work with. Any other exit code will indicate an error of some kind. The exit code of the last command to run will be stored in the variable $?. Exit codes are usually not seen by human users, but they are very useful when writing scripts. Consider a script where we may be copying files to a remote network drive. There are many ways that the copy task may have failed: for example our local machine might not be connected to the network, or the remote drive might be full. By checking the exit code of our copy utility, we can alert the user to problems when running the script. It is very good practice to implement exit codes, so we will do this now. We have two paths in our script, a success and a failure. Let’s use zero to indicate success, and one to indicate failure. 1
```console
#!/bin/bash

2
3

# A simple script to greet a single user.

4
5

if [ $# -eq 1 ]

6

then

7

username=$1

8
9

echo "Hello $username!"

10

exit 0

11

else

12

echo "Please enter only one argument."

13

exit 1

14

fi

15

echo "Number of arguments: $#."

$ ./new_script.sh Carol
Hello Carol!
$ echo $?
0
```
Notice that the echo command on line 15 was ignored entirely. Using exit will end the script immediately, so this line is never encountered.
#### Handling Many Arguments

So far our script can only handle a single username at a time. Any number of arguments besides one will cause an error. Let’s explore how we can make this script more versatile. A user’s first instinct might be to use more positional variables such as $2, $3 and so on. Unfortunately, we can’t anticipate the number of arguments that a user might choose to use. To solve this issue, it will be helpful to introduce more built-in variables. We will modify the logic of our script. Having zero arguments should cause an error, but any other number of arguments should be successful. This new script will be called friendly2.sh. 1
```console
#!/bin/bash

2
3

# a friendly script to greet users

4
5

if [ $# -eq 0 ]

6

then

7

echo "Please enter at least one user to greet."

8

exit 1

9

else

10

echo "Hello $@!"

11

exit 0

12

fi

$ ./friendly2.sh Carol Dave Henry
Hello Carol Dave Henry!
```
There are two built-in variables which contain all arguments passed to the script: $@ and $*. For
the most part, both behave the same. Bash will parse the arguments, and separate each argument when it encounters a space between them. In effect, the contents of $@ look like this: 0
1
2
Carol
Dave
Henry
If you are familiar with other programming languages, you might recognize this type of variable as an array. Arrays in Bash can be created simply by putting space between elements like the variable FILES in script arraytest below: FILES="/usr/sbin/accept /usr/sbin/pwck/ usr/sbin/chroot"
It contains a list of many items. So far this isn’t very helpful, because we have not yet introduced any way of handling these items individually.
#### For Loops

Let’s refer to the arraytest example shown before. If you recall, in this example we are specifying an array of our own called FILES. What we need is a way to “unpack” this variable and access each individual value, one after the other. To do this, we will use a structure called a for loop, which is present in all programming languages. There are two variables that we will refer to: one is the range, and the other is for the individual value that we are currently working on. This is the script in its entirety:
```console
#!/bin/bash
```
FILES="/usr/sbin/accept /usr/sbin/pwck/ usr/sbin/chroot" for file in $FILES do ls -lh $file done
```console
$ ./arraytest
lrwxrwxrwx 1 root root 10 Apr 24 11:02 /usr/sbin/accept -> cupsaccept
-rwxr-xr-x 1 root root 54K Mar 22 14:32 /usr/sbin/pwck
-rwxr-xr-x 1 root root 43K Jan 14 07:17 /usr/sbin/chroot
```
If you refer again to the friendly2.sh example above, you can see that we are working with a
range of values contained within a single variable $@. For clarity’s sake, we will call the latter variable username. Our script now looks like this: 1
```console
#!/bin/bash

2
3

# a friendly script to greet users

4
5

if [ $# -eq 0 ]

6

then

7

echo "Please enter at least one user to greet."

8
9

exit 1
else

10

for username in $@

11

do

12

echo "Hello $username!"

13

done

14
15

exit 0
fi
```
Remember that the variable that you define here can be named whatever you wish, and that all the lines inside do… done will be executing once for each element of the array. Let’s observe the output from our script:
```console
$ ./friendly2.sh Carol Dave Henry
Hello Carol!
Hello Dave!
Hello Henry!
```
Now let’s assume that we want to make our output seem a little more human. We want our greeting to be on one line. 1
```console
#!/bin/bash

2
3

# a friendly script to greet users

4
5

if [ $# -eq 0 ]

6

then

7
8
9
10

echo "Please enter at least one user to greet."
exit 1
else
echo -n "Hello $1"
11

shift

12

for username in $@

13

do

14

echo -n ", and $username"

15

done

16

echo "!"

17

exit 0

18

fi

A couple of notes:
• Using -n with echo will suppress the newline after printing. This means that all echoes will
print to the same line, and the newline will be printed only after the !` on line 16.
• The shift command will remove the first element of our array, so that this:
0

1

2
```
Carol
Dave
Henry
Becomes this: 0
1
Dave
Henry
Let’s observe the output:
```console
$ ./friendly2.sh Carol
Hello Carol!
$ ./friendly2.sh Carol Dave Henry
Hello Carol, and Dave, and Henry!
```
#### Using Regular Expressions to Perform Error Checking

It’s possible that we want to verify all arguments that the user is entering. For example, perhaps we want to ensure that all names passed to friendly2.sh contain only letters, and any special characters or numbers will cause an error. To perform this error checking, we will use grep. Recall that we can use regular expressions with grep.
```console
$ echo Animal | grep "^[A-Za-z]*$"
```
Animal
```console
$ echo $?
0

$ echo 4n1ml | grep "^[A-Za-z]*$"
$ echo $?
1
```
The ^ and the $ indicate the beginning and end of the line respectively. The [A-Za-z] indicates a range of letters, upper or lower case. The * is a quantifier, and modifies our range of letters so that we are matching zero to many letters. In summary, our grep will succeed if the input is only letters, and fails otherwise. The next thing to note is that grep is returning exit codes based on whether there was a match or not. A positive match returns 0, and a no match returns a 1. We can use this to test our arguments inside our script. 1
```console
#!/bin/bash

2
3

# a friendly script to greet users

4
5

if [ $# -eq 0 ]

6

then

7

echo "Please enter at least one user to greet."

8

exit 1

9

else

10

for username in $@

11

do

12

echo $username | grep "^[A-Za-z]*$" > /dev/null

13

if [ $? -eq 1 ]

14

then

15

echo "ERROR: Names must only contains letters."

16

exit 2

17

else

18

echo "Hello $username!"

19

fi

20

done

21
22

exit 0
fi
```
On line 12, we are redirecting standard output to /dev/null, which is a simple way to suppress it.
We don’t want to see any output from the grep command, we only want to test its exit code, which happens on line 13. Notice also that we are using an exit code of 2 to indicate an invalid argument. It is generally good practice to use different exit codes to indicate different errors; in this way, a savvy user can use these exit codes to troubleshoot.
```console
$ ./friendly2.sh Carol Dave Henry
Hello Carol!
Hello Dave!
Hello Henry!
$ ./friendly2.sh 42 Carol Dave Henry
```
ERROR: Names must only contains letters.
```console
$ echo $?
2
```
#### Guided Exercises

1. Read the contents of script1.sh below: #!/bin/bash if [ $# -lt 1 ] then echo "This script requires at least 1 argument." exit 1 fi echo $1 | grep "^[A-Z]*$" > /dev/null if [ $? -ne 0 ] then echo "no cake for you!" exit 2 fi echo "here's your cake!" exit 0
What is the output of these commands? ◦ ./script1.sh
◦ echo $?
◦ ./script1.sh cake
◦ echo $?
◦ ./script1.sh CAKE
◦ echo $?
1. Read the contents of file script2.sh: for filename in $1/*.txt do cp $filename $filename.bak done
Describe the purpose of this script as you understand it.
#### Explorational Exercises

1. Create a script that will take any number of arguments from the user, and print only those arguments which are numbers greater than 10.
#### Summary

In this section, you learned:
- What exit codes are, what they mean, and how to implement them
- How to check the exit code of a command
- What for loops are, and how to use them with arrays
- How to use grep, regular expressions and exit codes to check user input in scripts.
Commands used in the exercises: shift This will remove the first element of an array. Special Variables: $? Contains the exit code of the last command executed. $@, $* Contain all arguments passed to the script, as an array.

### Answers

#### Guided Exercises

**Lesson 1**

1. The user types the following into their shell: $ PATH=~/scripts $ ls Command 'ls' is available in '/bin/ls' The command could not be located because '/bin' is not included in the PATH environment variable. ls: command not found
◦ What has the user done? The user has overwritten the contents of PATH with the directory ~/scripts. The ls command can no longer be found, since it isn’t contained in PATH. Note that this change only affects the current session, logging out and back in with revert the change. ◦ What command will combine the current value of PATH with the new directory ~/scripts? PATH=$PATH:~/scripts
1. Consider the following script. Notice that it is using elif to check for a second condition: >
/!bin/bash
**> fruit1 = Apples**
> fruit2 = Oranges if [ $1 -lt $# ] then echo "This is like comparing $fruit1 and $fruit2!" > elif [$1 -gt $2 ] then >
**echo '$fruit1 win!'**
else
>
```console
echo "Fruit2 win!"
```
> done
◦ The lines marked with a > contain errors. Fix the errors.
```console
#!/bin/bash

fruit1=Apples
fruit2=Oranges
if [ $1 -lt $# ]
then
echo "This is like comparing $fruit1 and $fruit2!"
elif [ $1 -gt $2 ]
then
echo "$fruit1 win!"
else
echo "$fruit2 win!"
fi
```
1. What will the output be in the following situations? $ ./guided1.sh 3 0
Apples win!
```console
$ ./guided1.sh 2 4

Oranges win!
$ ./guided1.sh 0 1
```
This is like comparing Apples and Oranges!

**Lesson 2**

1. Read the contents of script1.sh below: #!/bin/bash if [ $# -lt 1 ] then echo "This script requires at least 1 argument." exit 1 fi echo $1 | grep "^[A-Z]*$" > /dev/null if [ $? -ne 0 ] then echo "no cake for you!" exit 2 fi echo "here's your cake!" exit 0
What is the output of these commands? ◦ Command: ./script1.sh Output: This script requires at least 1 argument. ◦ Command: echo $? Output: 1 ◦ Command: ./script1.sh cake Output: no cake for you! ◦ Command: echo $? Output: 2 ◦ Command: ./script1.sh CAKE Output: here’s your cake!
◦ Command: echo $? Output: 0
1. Read the contents of file script2.sh: for filename in $1/*.txt do cp $filename $filename.bak done
Describe the purpose of this script as you understand it. This script will make backup copies of all files ending with .txt in a subdirectory defined in the first argument.

#### Explorational Exercises

**Lesson 1**

1. Write a simple script that will check if exactly two arguments are passed. If so, print the arguments in reverse order. Consider this example (note: your code may look different than this, but should lead to the same output): if [ $1 == $number ] then echo "True!" fi
```console
#!/bin/bash
if [ $# -ne 2 ]
then
echo "Error"
else
echo "$2 $1"
fi
```
1. This code is correct, but it is not a number comparison. Use an internet search to discover how this code is different from using -eq. Using == will compare strings. That is, if the characters of both variables match up exactly, then the condition is true. abc == abc
true
abc == ABC
false
1 == 1
true
1+1 == 2
false
String comparisons lead to unexpected behavior if you are testing for numbers.
1. There is an environment variable that will print the current directory. Use env to discover the name of this variable. PWD
2. Using what you have learned in questions 2 and 3, write a short script that accepts an
argument. If an argument is passed, check if that argument matches the name of the current directory. If so, print yes. Otherwise, print no.
```console
#!/bin/bash
if [ "$1" == "$PWD" ]
then
echo "yes"
else
echo "no"
fi
```

**Lesson 2**

1. Create a script that will take any number of arguments from the user, and print only those arguments that are numbers greater than 10. #!/bin/bash for i in $@ do echo $i | grep "^[0-9]*$" > /dev/null if [ $? -eq 0 ] then if [ $i -gt 10 ] then echo -n "$i " fi fi done echo ""

# The Linux Operating System

## 4.1 Choosing an Operating System

**Exam objective:** Linux Essentials version 1.6, Exam 010, Objective 4.1
**Weight:** 1
**Key knowledge areas**
- Differences between Windows, OS X and Linux
- Distribution life cycle management
**Partial list of the used files, terms and utilities**
- GUI versus command line, desktop configuration
- Maintenance cycles, beta and stable

### 4.1 Lesson 1

#### Introduction

No matter if you are using your computer system at home, at the university or within an enterprise, there still has to be a decision made on the operating system that you will use. This decision may be made by you, especially if it is your computer, but you may also be responsible for making the choice across systems in your business. As always, being well-informed about the choices available will aid you in making a responsible decision. In this lesson we aim to help keep you informed of the operating system choices that you may be considering.
#### What is an Operating System

One of the first things that we must be sure of before we begin our journey in choosing an operating system is to understand what we mean by the term. The operating system lies at the heart of your computer and allows applications to run within and on top of it. Additionally, the operating system will contain drivers to access the computer’s hardware such as disks and partitions, screens, keyboards, network cards and so on. We often abbreviate the operating system to simply the OS. Today there are many operating systems available for both business computer usage as well as for those looking for something in the home. If we want to simplify the selection available to us, we can group selections as follows:
- Linux-based Operating Systems
**◦ Enterprise Linux**
◦ Consumer Linux
- UNIX
- macOS
- Windows-based Operation Systems
**◦ Windows Servers**
◦ Windows Desktops
#### Choosing a Linux Distribution

**The Linux Kernel and Linux Distributions**
When talking about Linux distributions the operating system is Linux. Linux is the kernel and at the core of every Linux distribution. The software of the Linux kernel is maintained by a group of individuals, lead by Linus Torvalds. Torvalds is employed by an industry consortium called The Linux Foundation to work on the Linux kernel.
**NOTE**
The Linux kernel was first developed by Linus Torvalds, a student from Finland, back in 1991. In 1992, the first Kernel release under the GNU General Public License version 2 (GPLv2) was version 0.12.
**Linux Kernel**
As we have mentioned, all Linux distributions run the same operating system, Linux.
**Linux Distribution**
When people talk about Red Hat Linux, or Ubuntu Linux they are referring to the Linux distribution. The Linux distribution will ship with a Linux kernel and an environment that makes the kernel useful in a way that we can interact with it. At a minimum we would need a command line shell such as Bash and a set of basic commands allowing us to access and manage the system. Often, of course, the Linux distribution will have a full Desktop Environment such as Gnome or KDE. Even though each Linux distribution runs the Linux operating system, distributions can and do vary on the version of the operating system that is used. By this, we mean, the version of the Linux Kernel that is in use when the distribution boots.
**TIP**
If you have access to a Linux command line at the moment, you can easily check the version of the Linux kernel that you are running by reading the kernel release:
```console
$ uname -r
4.15.0-1019-aws

Types of Linux Distributions
```
It may seem an obvious choice to always run the latest version of the Linux kernel but it is not quite as simple as that. We can vaguely categorize Linux distributions into three sets:
- Enterprise Grade Linux Distributions
**◦ Red Hat Enterprise Linux**
◦ CentOS ◦ SUSE Linux Enterprise Server ◦ Debian GNU/Linux ◦ Ubuntu LTS
- Consumer Grade Linux Distributions
**◦ Fedora**
◦ Ubuntu non-LTS ◦ openSUSE
- Experimental and Hacker Linux Distributions
**◦ Arch**
◦ Gentoo This, of course, is a just a very small subset of possible distributions but the importance is the difference between enterprise, consumer and experimental distributions and why each exists. Enterprise Grade Linux Distributions such as CentOS (Community Enterprise OS) are designed to be deployed within large organizations using enterprise hardware. The needs of the enterprise are very different from the needs of the small business, hobbyist or home user. In order to ensure the availability of their services, enterprise users have higher requirements regarding the stability of their hard- and software. Therefore, enterprise Linux distributions tend to include older releases of the kernel and other software, which are known to work reliably. Often the distributions port important updates like security fixes back to these stable versions. In return, enterprise Linux
distributions might lack support for the most recent consumer hardware and provide older versions of software packages. However, like consumer Linux distributions, enterprises tend to also choose mature hardware components and build their services on stable software versions. Consumer Grade Linux Distributions such as Ubuntu are more targeted for small business or home and hobbyist users. As such, they are also likely to be using the latest hardware found on consumer grade systems. These systems will need the latest drivers to make the most of the new hardware but the maturity of both the hardware and the drivers is unlikely to meet the needs of larger enterprises. For the consumer market, however, the latest kernel is exactly what is needed with the most modern drivers even if they are little under tested. The newer Linux kernels will have the latest drivers to support the very latest hardware that are likely to be in use. Especially with the development we see with Linux in the gaming market it is tremendously important that the latest drivers are available to these users.
**NOTE**
Some distributions like Ubuntu provide both consumer grade versions which contain recent software and receive updates for a rather small period of time, as well as so-called Long Term Support versions, LTS for short, which are more suited for enterprise environments.
**Experimental and Hacker Linux Distributions**
Distributions such as Arch Linux or Gentoo Linux live on the cutting edge of technology. They contain the most recent versions of software, even if these versions still contain bugs and untested features. In return, these distributions tend to use a rolling release model which allows them to deliver updates at any time. These distributions are used by advanced users who want to always receive the most recent software and are aware that functionality can break at any time and are able to repair their systems in such cases. In short, when considering Linux as your operating system, if you are using enterprise grade hardware on your servers or desktops then you can make use of either enterprise grade or consumer grade Linux distributions. If you are using consumer grade hardware and need to make the most of the latest hardware innovations then you are likely to need a similar Linux distribution to match the needs of the hardware. Some Linux distributions are related to each other. Ubuntu, for example, is based on Debian Linux and uses the same packaging system, DPKG. Fedora, as another example, is a testbed for RedHat Enterprise Linux, where potential features of future RHEL versions can be explored ahead of their availability in the enterprise distribution. As well as the distributions we have mentioned here there are many other Linux distributions. One advantage that comes with Linux being open source software is that many people can
develop what they think Linux should look like. As such we have many hundreds of distributions. To view more Linux distributions you may choose to visit The Distro Watch Web Site, the maintainers of the website list the top 100 downloads of Linux distributions, allowing you to compare and see what is currently popular.
**Linux Support Lifecycle**
As you might expect, enterprise Linux distributions have a longer support life than consumer or community editions of Linux. For example Red Hat Enterprise Linux has support for 10 years. Red Hat Enterprise Linux 8 was launched in May 2019, while software updates and support are available until May 2029. Consumer editions often will only have community support via forums. Software updates are often available for 3 releases. If we take Ubuntu as an example, at the time of writing 19.04 is the latest available having updates through the release of 19.10 and stopping in January 2020. Ubuntu also supply editions with long term support, known as LTS editions, which have 5 years of support from the original release. The current LTS version is 18.04 which will have software updates until 2023. These LTS versions make Ubuntu a possible option for the enterprise with commercial support available from Canonical (the company behind the Ubuntu brand) or independent consulting firms.
**NOTE**
The Ubuntu distributions use date-based version numbers in the format YY.MM: For example, version 19.04 was released April 2019.
**Linux as Your Desktop**
Using Linux as your desktop system may be more challenging in an enterprise where desktop support focusses on commercial operating system offerings. However it is not only the support that may prove challenging. An enterprise customer may also have made large investments into software solutions that tie them into specific desktop operating systems. Having said this, there are many examples of Linux desktops being integrated into large organizations with companies like Amazon even having their own Linux distribution Amazon Linux 2. This is used on their AWS cloud platform but also internally for both servers and desktops. Using Linux in a smaller business or at home becomes a lot easier and can be a rewarding experience, removing the need for licensing and opening your eyes to the wealth of free and open source software that is available for Linux. You will also find that there are many different desktop environments available. The most common being Gnome and KDE, however many others exists. The decision comes down to personal preference.
**Using Linux on Servers**
Using Linux as your server operating system is common practice in the enterprise sector. Servers are maintained by engineers who specialize in Linux. So even with thousands of users, the users can remain ignorant of the servers that they are connecting to. The server operating system is not important to them and, in general, client applications will not differ between Linux and other operating systems in the backend. It is also true that as more applications are virtualized or containerized within local and remote clouds, the operating system is masked even more and the embedded operating system is likely to be Linux.
**Linux in the Cloud**
Another opportunity to become familiar with Linux is to deploy Linux within one of the many public clouds available. Creating an account with one of the many others cloud providers will allow you to quickly deploy many different Linux distributions quickly and easily.
#### Non Linux Operating Systems

Yes, incredible as it seems, there are operating systems that are not based on the Linux kernel. Of course, over the years there have been many and some have fallen by the wayside but there are still other choices that are available to you. Either at home or in the office.
**Unix**
Before we had Linux as an operating system there was Unix. Unix used to be sold along with hardware and still today several commercial Unixes such as AIX and HP-UX are available on the market. While Linux was highly inspired by Unix (and the lack of its availability for certain hardware), the family of BSD operating systems is directly based on Unix. Today, FreeBSD, NetBSD and OpenBSD, along with some other related BSD systems, are available as free software. Unix was heavily used in the enterprise but we have seen a decline in the fortunes of Unix with the growth of Linux. As Linux has grown and the enterprise support offerings have also grown, we have seen Unix slowly start to vanish. Solaris, originally from Sun before moving to Oracle, has recently disappeared. This was one of the larger Unix Operating Systems used by telecommunication companies, heralded as Telco Grade Unix. Unix Operating Systems include:
- AIX
- FreeBSD, NetBSD, OpenBSD
- HP-UX
- Irix
- Solaris
**macOS**
macOS (previously OS X) from Apple dates back to 2001. Based very much on BSD Unix, and making use of the Bash command line shell, it is a friendly system to use if you are used to using Unix or Linux operating systems. If you’re using macOS you can open the terminal application to access the command line. Running the same uname command again we can check the reported operating system:
```console
$ uname -s
```
Darwin
**NOTE**
We make use of the option -s in this case to return the OS name. We previously used -r to return the kernel version number.
**Microsoft Windows**
We can still say that the majority of desktops and laptops out there will be Windows based. The operating system has been truly successful and has dominated the desktop market for years. Although it is proprietary software and is not free, often the operating system license is included when you buy the hardware so it becomes the easy choice to make. There is, of course, wide support for Windows throughout hardware and software vendors as well of course many open source applications are also available for Windows. The future for Windows does not seem as bright as it has been. With fewer desktops and laptops being sold now the focus is on the tablet and phone market. This has been dominated by Apple and Android and it is hard for Microsoft to gain ground. As a server platform Microsoft does now allow its customers to choose between a GUI (Graphical User Interface) and command line only version. The separation of the GUI and the command line is an important one. Most of the time the GUI of older Microsoft Servers will be loaded but no-one will use it. Consider an Active Directory Domain Controller… users use it all the time to authenticate to the domain, but it is managed remotely from administrators' desktops and not the server.
#### Guided Exercises

1. Which project makes up the common component of all Linux distributions? CentOS Red Hat Ubuntu Linux Kernel CoreOS
2. Which operating system is reported in use for macOS from Apple? OS X OSX Darwin MacOS
3. How does a Linux distribution differ from the Linux kernel? The kernel is part of a distribution, the distribution as applications to surround the kernel to make it useful The kernel is the Linux distribution All distributions that use the same kernel are the same
4. Which of the following is a desktop environment in Linux? Mint Elementary Zorin Gnome
5. Which component of an operating system allows access to hardware?
**Drivers**
Shells Service Application
#### Explorational Exercises

1. Retrieve the current Kernel release of your Linux system if you have access to the command line.
2. Using your preferred search engine locate and identify public cloud providers available to you. These could include AWS, Google Cloud, Rackspace and many more. Choose one and see which operating systems are available to deploy.
#### Summary

In this section you have learned how to differentiate between different operating systems commonly available. We discussed:
- Linux Based Operating Systems
- UNIX
- macOS
- Windows Based Operation Systems
Within the Linux category we could further break the selection down into distributions with long term support and those with a shorter support cycle. LTS versions being more suited to the Enterprise and shorter term support being targeted toward home and hobby users.
- Enterprise Grade Linux Distributions
**◦ Red Hat Enterprise Linux**
◦ CentOS ◦ SUSE Linux Enterprise Server ◦ Debian GNU/Linux ◦ Ubuntu LTS
- Consumer Grade Linux Distributions
**◦ Fedora**
◦ Ubuntu non-LTS ◦ openSUSE
- Experimental and Hacker Linux Distributions
**◦ Arch**
◦ Gentoo

### Answers

#### Guided Exercises

1. Which project makes up the common component of all Linux distributions? CentOS Red Hat Ubuntu Linux Kernel
X
CoreOS
1. Which operating system is reported in use for OS X from Apple? OS X OSX Darwin
X
MacOS
1. How does a Linux distribution differ from the Linux kernel? The kernel is part of a distribution, the distribution as applications to surround the kernel to make it useful
X
**The kernel is the Linux distribution**
All distributions that use the same kernel are the same
1. Which of the following is a desktop environment in Linux? Mint Elementary Zorin Gnome
X
1. Which component of an operating system allows access to hardware?
Drivers
X
**Shells**
Service Application

#### Explorational Exercises

1. Retrieve the current kernel release of your Linux system if you have access to the command line. $ uname -r 4.15.0-47-generic
2. Using your preferred search engine locate and identify public cloud providers available to you. These could include AWS, Google Cloud, Rackspace and many more. Choose one and see which operating systems are available to deploy. AWS, as an example, allows you to deploy many Linux distributions such as Debian, Red Hat, SUSE or Ubuntu as well as Windows.
