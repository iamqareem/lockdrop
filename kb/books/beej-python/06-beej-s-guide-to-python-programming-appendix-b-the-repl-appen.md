---
id: beej-python-06
title: "Beej's Guide to Python Programming — Appendix B: The REPL, Appendix C: Assignment Behavior, Appendix…"
slug: beej-python-06-beej-s-guide-to-python-programming-appendix-b-the-repl-appen
source: "Beej's Guide to Python Programming"
sourceSection: "Appendix B: The REPL, Appendix C: Assignment Behavior, Appendix D: Number Bases, 4. Repeat!, 64. Nov 18 23:14 ., 3936. Nov 18 23:14 .., 96. Nov 18 23:27 ., 3936. Nov 18 23:14 .., 87. Nov 18 23:27 hello.py"
track: data-scripting
tier: free
tags: [python, programming, scripting]
summary: "The REPL, pronounced REP-əl, is short for the Read-Evaluate-Print Loop. Covers 9 sections: Appendix B: The REPL, Appendix C: Assignment Behavior, Appendix D: Number Bases."
---
# Beej's Guide to Python Programming — Appendix B: The REPL, Appendix C: Assignment Behavior, Appendix…

## Appendix B: The REPL
### 16.1 What is the REPL?
The REPL, pronounced REP-əl, is short for the Read-Evaluate-Print Loop.
Great. I mean, truly, that’s awesome.
But what does any of that mean?!
Check this out. If you run python on the command line (or whatever your OS’s variant is), you’ll end up
with a prompt that looks like this:
$ python
Python 3.8.0 (default, Oct 23 2019, 18:51:26)
[GCC 9.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>

And it just sits there, waiting for you to type something.
Actually, it’s reading. The Read part of REPL.
So type something and hit RETURN!
>>> print("Hello, world!")

What happened after you hit RETURN was that Python Evaluated your expression, and the Printed the
result. And then it printed another >>> prompt, because it’s doing this in a Loop! The REPL!
This is a method you could use to quickly test out Python commands to see how they work. It’s not
commonly used for development, but it is there if you find it convenient.
Any time you see the >>> prompt, it’s waiting for another Python command.
>>> a = 20
>>> b = 30
>>> c = a + b
>>> print(c)
50

What about multi-line commands? Let’s try printing numbers in a loop:
>>> for i in range(5):
...

Chapter 16. Appendix B: The REPL

Wait! What’s that ... prompt? That means Python is waiting for more. The fact that the previous line
ended in a : indicates that a block is to follow it. So Python is waiting for a properly-indented block. (Hit
RETURN on a blank line to exit the block. If you get stuck in ... mode, just keep hitting RETURN until you
get back out to the >>> prompt.)
>>> for i in range(5):
...
...

### 16.2 Calculator
You can use the Python REPL as a quick and dirty calculator.
>>> 50 + 20 * 10
250
>>> import math
>>> math.factorial(10)
3628800
>>> math.sqrt(2)
1.4142135623730951

### 16.3 Getting Help
Python has a powerful built-in help system.
You can ask for help on any expression; help will be returned on the type of that expression.
For example, if we ask for help on a variable of type string, we get help on what we can do with that
variable:
>>> s = "Hello!"
>>> help(s)

This will output all kinds of stuff.
Help on class str in module builtins:
class str(object)
| str(object='') -> str
| str(bytes_or_buffer[, encoding[, errors]]) -> str
| Create a new string object from the given object. If encoding or
| errors is specified, then the object must expose a data buffer
| that will be decoded using the given encoding and error handler.

Et cetera. The : prompt at the bottom is the prompt for the pager. You can hit RETURN to go to the next
line, or SPACE to go to the next page. Up and Down arrow keys also work. Type q to get out of the pager
and return to normal.
The first thing you might notice are a bunch of functions that have double underscores around them, like
this:

16.4. dir()—Quick and Dirty Help

__add__(self, value, /)
Return self+value.

Those double underscores, AKA dunderscores or just dunders, indicate that this is an internal or special
functions. As a beginner, you can ignore them. As you get more advanced, you might want to see how to
make use of them.
So hit SPACE a bunch of times until you’re past the dunders. After that, you start getting to the documentation for the more common functions, like this one:

count(...)
S.count(sub[, start[, end]]) -> int
Return the number of non-overlapping occurrences of substring sub in
string S[start:end]. Optional arguments start and end are
interpreted as in slice notation.

We see there’s a description there of what the method does, as well as an important description of what
each parameter to the function means. But let’s look at this line in particular:

S.count(sub[, start[, end]]) -> int

That’s not Python. It’s documentation, and it has its own way of being read.
Generally:
The S. refers to this string that we’re operating on. For example, if I say:
"fee fie foe foo".count("fo")

the string "fee fie foe foo" is represented by S in the documentation.
The stuff after the -> indicates the type of the return value. This function returns an integer.
Now, what about that start and end stuff in the middle with the square brackets?
In documentation, square brackets indicate optional parameters to the function. Notice in my example,
above, I didn’t pass start or end… they’re in square brackets, so they’re optional.
Looking in more detail, you see the brackets are nested. This means you can make the call with a sub and
a start… and then the end becomes optional. There’s no way to call it with just a sub and an end, but
no start. The optional end is optional if-and-only-if the optional start had already been specified.
Finally, you can ask for help on a specific function or method:
help("".count)

16.4 dir()—Quick and Dirty Help
The dir() built-in function is like help(), except extraordinarily terse. It just returns a list of the methods
on a particular thing.
For instance, we can get that list of methods and data attached to a dictionary by asking for dir({}) (or
by passing any dict to dir()).
>>> dir({})
['__class__', '__contains__', '__delattr__', '__delitem__', '__dir__',
'__doc__', '__eq__', '__format__', '__ge__', '__getattribute__',
'__getitem__', '__gt__', '__hash__', '__init__', '__init_subclass__',

Chapter 16. Appendix B: The REPL

'__iter__', '__le__', '__len__', '__lt__', '__ne__', '__new__',
'__reduce__', '__reduce_ex__', '__repr__', '__reversed__',
'__setattr__', '__setitem__', '__sizeof__', '__str__',
'__subclasshook__', 'clear', 'copy', 'fromkeys', 'get', 'items', 'keys',
'pop', 'popitem', 'setdefault', 'update', 'values']

Not as good as help(), but it might get you the quick answer if you’re like, “What do I call to get the
values out of a dictionary, again? Oh, that’s right. values()! Eureka!”
One place this is also useful is if you’re using a poorly-documented piece of software1 . Asking for dir()
on an object can give you insight on how to use it.
Though if you do this, beware that programmers change their undocumented interfaces all the time without
telling people. There’s a school of thought that says if something’s undocumented, you shouldn’t use it at
all, lest it be silently changed or dropped some day in the distant future. And that school has a point.

### 16.5 Getting out of the REPL
Oh, sure, Beej, put this section at the end of the chapter. Well, I just wanted to make sure you read the
middle bit. :)
Since the REPL is reading from the keyboard as a “file”, you should send an EOF (End Of File2 ) character
to indicate that it should be done.
On Mac and Linux and BSD and Ultrix and MINIX and SunOS and IRIX and HP-UX and Solaris and
GNU Hurd and Plan 9 From Bell Labs and any Unix variant, EOF is indicated from the keyboard with
CTRL-d.
On Windows and Windows and Windows and Windows and any Windows variant and MS-DOS, EOF is
indicated from the keyboard with CTRL-z. Followed by RETURN.
Additionally, on any system, you can type exit() at the >>> prompt and it’ll quit out.

Which should serve as a not-so-gentle reminder that you should document your code.
https://en.wikipedia.org/wiki/End-of-file

Chapter 17

## Appendix C: Assignment Behavior
In this book, we’ve talked about how Python variables work, but let’s dig into it a little more here.
When we have data of some kind, like a number or a list or a string, that’s stored in memory. And we can
assign it to a variable name so that we can have a way to refer to it.
That variable name is a reference to the data.
So if everything’s a reference, that must mean that if we do this, there’s only one string, right? Just two
names for the same string?
s = "Beej!"
t = s

Yes! That’s exactly what that means. s and t both refer to the same string in memory. That means if you
changed the string, both s and t would show the changes because they’re both two names for the same
string.
But you can’t change the string! It’s immutable!
It’s the same with numbers:
x = -3490

Both x and y refer to the same number in memory. If you changed the number, both x and y would show
the change.
But you can’t change the number! It’s immutable!
Let’s try a list:
c = [1, 2, 3]
d = c

Just like with strings and numbers, both variables c and d refer to the same thing in memory. But the
difference is that the list is mutable! We can change it, and we’d see the change in c and d.
c = [1, 2, 3]
d = c
c[1] = 99
print(d[1])

Of course, you can reassign a variable to point at anything else at any time.

Chapter 17. Appendix C: Assignment Behavior

### 17.1 How This Relates To Functions
All this adds up to Python’s call-by-sharing evaluation strategy.
When you call a function, all the arguments passed to the function are assigned into the parameters in the
parameter list.
That assignment, even though it doesn’t use the = assignment operator, behaves in the same way, nonetheless.
In the following example, both x and a refer to the same object… right up to the moment we reassign x
on line 4. At that point, x refers to a different list, but a still refers to the original.
def foo(x):

x = [4, 5, 6]

foo(a)

### 17.2 Is Any of This True?
Yes, believe it!
We can verify it in the REPL with the built-in id() function and the is operator.
The id() function will give us the location in memory where a thing (like a string or number) that a
variable refers to is stored. If two variables return the same ID, they must be pointing to the same thing
in memory.
Let’s try in the REPL:
>>> t = s
>>> id(s)
140156808252976
>>> id(t)
140156808252976

The exact number doesn’t matter (it will vary), but what matters is that they’re identical. Both s and t
refer to the entity in memory at that location, namely the string "Beej!".
You could compare those numbers to determine if both variables point to the same thing:
>>> id(s) == id(t)

but there’s a shorthand for that with the is operator:

Note that it’s typically only want you assign from one variable to another that they refer to the same thing.
If you assign to them independently, they typically won’t:
>>> t = "Beej!"

### 17.3 Python Compiler Optimizations

In the above example, there are two strings in memory with value "Beej!".
I recognize that I said “typically” a bunch up there, and that should rightfully raise a bunch of “Beej is
hand-waving” red flags.
The actual details get a bit more gritty, but if you want to stop with what we’ve said up there, you’re good.
“No, keep going down the rabbit hole!”
Okay then!

### 17.3 Python Compiler Optimizations
If you take this example from the REPL, above:
>>> t = "Beej!"

and you put it in a python program, like test.py:
s = "Beej!"
t = "Beej!"
print(s is t)

and run it from the command line, you’d think you’d get False, just like in the REPL. Wrong!
$ python test.py

What gives? Why is it False in the first case and True in the second? Well, in the latter case, the Python
interpreter is getting a little clever. Before it even runs your code, it analyzes it. It sees that you have
two "Beej!" strings in there, so it just makes them the same one to save you memory. Since strings are
immutable, you can’t tell the difference.

### 17.4 Internment
In that same example, above:
>>> t = "Beej!"

what if we use a different string, like “Alice”?
>>> s = "Alice"
>>> t = "Alice"
True?? What’s up with that? Why does Alice get special treatment?

Or look at this:

Chapter 17. Appendix C: Assignment Behavior

>>> x = 257
>>> y = 257
>>> x is y

which is fine—but then check this out, with 256 instead of 257:
>>> x = 256
>>> y = 256
>>> x is y
True, again?

We’re getting into a deep language feature of Python called internment. Basically Python makes sure to
only have one copy in memory of certain, specific values of data.
For these values, all variables will refer to the same item in memory.
They are:
- Integers between -5 and 256 inclusive.
- Strings that contain only letters, numbers, or underscores.
- The None object.
- The True and False objects.
This is why "Beej!" isn’t interned (because it contains punctuation), and why "Alice" is interned.
You can intern your own strings with sys.intern() for dictionary lookup optimization, but that’s something 99.99999% of the Python programming populace will never bother doing.

Chapter 18

## Appendix D: Number Bases
### 18.1 How to Count like a Boss
You all have figured out by now how much I love numbers. So I’m going to keep talking about them!
Yay!
At some point, you might have heard that computers run on a bunch of 1s and 0s. That they’re binary. But
what does that mean?
As humans, we’re used to numbers. We use them all the time. 7 Dwarves. Speed limit 55. 99 bottles of
[your favorite beverage] on the wall.
We use the digits 0-9. And we use them repeatedly.
Computers, though, only have two digits: 0 and 1.
That seems kind of limiting. What happens if you want to go higher than 1, to say, 2?
Fortunately, there is a workaround. When computers want to go higher than 1, they do the same thing we
humans do when we want to go higher than 9: we all add another place.
As a human counting apples on a table, you start with 0, 1, and keep going… 7, 8, 9… and then you’re
out of digits for the ones place, which represents the number of individual items (1s of items) we’ve seen
so far.
So you add another place, the tens place, which represents the number of 10s of items we’ve seen so far.
If we count to 27 apples, a number made up of 2 and 7, we know we have 2 10s of apples, and 7 1s of
apples. Let that sink in. Every value in the 10s place is worth 10 apples. And every value in the 1s place
is worth 1 apple.
Therefore for 27 apples, we have

2 × 10 + 7 × 1 = 27
apples.
Let’s do the same thing with $100. With that, I’m saying there’s a 1 in the 100s place, a 0 in the 10s place,
and a 0 in the 1s place. This means the value is

1 × 100 + 0 × 10 + 0 × 1
or $100.
Computers go through this same process when they run out of digits, except they run out of digits a lot
sooner, since they only have two of them.
Let’s count apples in binary.
0, 1… oh no! We’re out of digits. We have to add another place. Except this time, in binary, it’s not the
10s place… it’s the 2s place.

Chapter 18. Appendix D: Number Bases

0, 1, 10, 11… out of digits again! We have to add another place. This time it’s the 4s place:
0, 1, 10, 11, 100.
Let’s look at that last number. In binary, that’s saying we have 1 4, 0 2s, and 0 1s. For a total value of 4.
For 5, we just have to put a 1 in the 1s place: 101.
In fact, we can take any number and digest it that way. Take the human number 7. That’s made up of one
4, one 2, and one 1. 4 + 2 + 1 = 7. So in binary, we need a 1 in the 4s place, the 2s place, and the 1s
place. Which looks like this in binary: 111.
We’ve written the number 7 in two “languages”. In human language, it looks like 7. In computer language
it looks like 111.
But, and this is important: human 7 and computer 111 are the same number. They’re just written in a
different language, of sorts.

### 18.2 Number Bases
These “number languages” actually have names for convenience. Human numbers are called Jeff, and
computer numbers, Alice.
I’m kidding. That’s completely false—they’re not named that.
Human numbers are called decimal numbers.
Computer 1-and-0 numbers are called binary numbers.
We also refer to these numbers by something called their base. This basically means “the number of digits
this number system has”.
In decimal, we have 10 digits: 0-9. So decimal is a base 10 numbering system.
In binary, we have 2 digits: 0 and 1. So binary is a base 2 numbering system.
As we saw in the previous section, 7 in decimal (base 10) is the same as 111 in binary (base 2).
And we also saw that as we counted up in any numbering system, when we ran out of digits, we had to
add another place to create higher-valued numbers.
There are other number bases in use. In fact, for any number you can think of, you can use that as a
base for a numbering system. Base 3. Base 3490. Base 27. Whatever you want. Of course, a base 3490
numbering system will have 3490 different digits, so I don’t know what you’re going to use for those…
you’ll have to come up with a lot of new shapes to draw numbers with.
Base 8, AKA octal, isn’t that common any longer, but used to be used by programmers consistently. Since
it’s base 8, it has the digits 0-7 available to use. When you use them up, you have to add another place,
the 8s place.
Notice how when you add a second place when you’re adding up, the value of that place is the base!
When you run out of digits with decimal (base 10), you add the 10s place.
When you run out of digits with binary (base 2), you add the 2s place.
When you run out of digits with octal (base 8), you add the 8s place.
More generally, the place value is the base to the power of how many digits you are from the right of the
number, just counting up.
With the decimal number 1234, we have 1 in the thousands place, 2 in the hundreds, 3 in the tens place,
and 4 in the ones place. But the place values 1000, 100, 10, and 1 are all powers of 10:

100 = 1 101 = 10 102 = 100 103 = 1000
And it’s the same in binary. If we have the binary number 1011, that’s 1 in the 8s place, 0 in the 4s place,
1 in the 2s place, and 1 in the 1s place.

20 = 1 21 = 2 22 = 4 23 = 8

### 18.3 Hexadecimal, Base 16

So the base is also tied into the value that any place in a number represents. Which makes sense, since
we have to add a new place when we run out of digits, and if we have digits 0-9, that next place must
represent the number of 10s, because that’s what comes after 9.

### 18.3 Hexadecimal, Base 16
Hexadecimal, or hex for short, is a really common number base for programmers. And it’s an interesting
one to look at because, at base 16, it has more digits than base 10. With base 10, we have 0-9. But with
base 16, we have 0 through… what?
Since we need more symbols to represent digits in base 16 than then normal arabic numerals we use for
0-9, we’ve gone ahead and co-opted the first part of the latin alphabet. We have 10 digits in 0-9, and we
grabbed 6 more “digits” with A-F to get up to 16 total digits.
That means when counting apples on the table in hex, we count:
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F, 10, 11, 12 …
(Upper and lower case don’t matter when writing numbers in hex.)
Look what happened when we got to F and ran out of digits: we added a new place. What value does that
place have?
Since this is base 16, it has to be the 16s place.
TODO

### 18.4 Specifying the Number Base in Python
When you write down a number in your code, you have to tell Python what the base is, or it’ll assume you
mean decimal (base 10).
For example, if I write
x = 10101011

Is that binary? I mean, it looks like it!
But it’s not! Because we didn’t indicate otherwise, Python assumes this is the decimal number ten million
one hundred one thousand eleven.
We have some options ## Writing Numbers Down
Throughout all this, it’s important to remember that number bases are just other languages for representing
the same number. You might write number in code as

Chapter 18. Appendix D: Number Bases

Chapter 19

Accelerating Beyond IDLE
19.1 Objectives
- Install a real IDE
- Learn about the command line.
- Get your terminal/shell up and running, and explain how it’s used

### 19.2 What with the What Now?
We’ve been using IDLE to edit code, and that’s fine to get started. But it’s a little bit underpowered for
getting to the next level when it comes to programming.
In this section, we’ll look at some tools that professional programmers use to get the job done.

### 19.3 The Terminal
Back in the day, people accessed mainframes through dedicated pieces of hardware called terminals.
These looked like old TV sets with keyboards attached. Screens were typically monochrome, either white,
green, or amber colored, with pixely text.
Barely anyone has a real terminal anymore, but they have programs called terminal emulators that pretend
to be terminals. In fact, real terminals are so rare, and terminal emulators are so common, if you hear
someone say “terminal”, they’re certainly talking about a terminal emulator.
So a terminal emulator is a program you run that gives you a text window to interact with your computer.
You know how you point, click, and drag with the mouse to command your computer to do things? We’re
going to do the same things, except we’re going type commands in to get them done, instead.

#### 19.3.1 The Shell
Sometimes you’ll hear people talk about the “shell” and “terminal” interchangeably.
Technically, though, the terminal is what you launch, and then the terminal immediately launches another
program, the shell, that you interact with.
The terminal is pretty dumb on its own. All it does it handle input from the keyboard and output
to its “screen”. It’s the middleperson between you and the shell. The shell is the real brains of the
outfit.
The shell is a program that takes your typed-in commands and executes them, and tells you if something
went wrong.

Chapter 19. Accelerating Beyond IDLE

The most popular shell program on Unix-likes and Macs is the Bourne Again Shell (Bash)1 , although
the Z-shell (Zsh) is growing in popularity. Bash is known by a $ prompt (sometimes prefixed with other
information about which directory you’re in, or something similar). Zsh uses a % prompt.
There are multitudes of shells, but we’ll just assuming you’re going to use Bash or Zsh (with a hat-tip to
Windows’s built-in shells), and they’re compatible enough for our purposes.

#### 19.3.2 Windows Terminals and Shells
For Windows, there are plenty of options, some of which you have installed already.
- CMD: classic shell with origins way back in the MS-DOS days.
- PowerShell: a new, more powerful shell.
- Bash via Git: the famous Git2 software package has a bash shell called, appropriately, “gitbash”.
- Bash via WSL: if you install WSL (below), it uses bash, as well.
Unless you’re going with one of the bash options, you should use PowerShell because it’s newer, better,
and maintained.
Almost all of the bash commands we use in this guide also work in PowerShell and CMD.
Hitting the Windows key and running cmd will bring up the CMD prompt. (Type exit to get out.)
Hitting the Windows key and running PowerShell will bring up the PowerShell prompt. (Type exit to
get out.)

#### 19.3.3 Windows gitbash
Git3 is a source code control system. And it’s great. Tons of people use it. You should install it.
When you install it, it installs a bash shell called gitbash that you can use.

#### 19.3.4 Windows WSL
The Windows Subsystem for Linux is an awesome piece of kit. It unobtrusively puts a little Linux install
on your Windows machine. And then you can use the Linux command line.
To install Follow the WSL setup instructions4
There’s a recommendation in there to also install Windows Terminal, an alternate terminal to the existing
ones. It’s a good choice.
After installing, update the system:
sudo apt update
sudo apt -y upgrade

and Python should be there; running this should get you the version number:
python3 --version

You can open a File Explorer window with:
iexplore.exe .

(Yes, that’s a period after a space at the end.)

This is a bit of a pun around the original Bourne Shell from back in the day. Bash improves on it a bit.
https://git-scm.com/
https://git-scm.com/downloads
https://learn.microsoft.com/en-us/windows/wsl/install

### 19.4 Installing an IDE

19.3.5 Mac
Macs come with a terminal built-in. Run the Terminal app and you’ll be presented with a bash shell
prompt.

#### 19.3.6 Linux/Unix-likes
All Unix-likes come with a variety of terminals and shells. Google for your distribution.

### 19.4 Installing an IDE
There are a lot of IDEs out there, but a good free one is VS Code.
Visit the Visual Studio Code5 website for downloads.
Let’s get it installed!

#### 19.4.1 Windows VS Code
When you install:
- Make sure “Add Path” is checked
- Check “Register Code as an editor for supported file types”
- Recommended: Check “Add ‘Open with Code’ option”
If you’re using WSL, first run VS Code from outside WSL, and install the “Remote WSL” extension.
Then you should be able to run it from inside WSL.

19.4.2 Mac
Just install it. No special instructions.

#### 19.4.3 Linux and other Unix-likes
Linux and Unix-like users can use their package manager to install VS Code.
ubuntu vscode install, substituting the name of your distro for ubuntu.

Google for

If you already have a code editor you prefer using (Vim, Emacs, Sublime, Atom, PyCharm, etc.) feel free
to use that, no problem!

### 19.5 Running VS Code
In the shell of your choice, if all has gone well, you should be able to type:
code

and have it launch VS Code.
Once launched, click the icon on the left bar of VS Code to manage extensions.
- Install Python extension
- Install Pylint extension

### 19.6 Using a Barebones Editor and Terminal
Not all development environments are integrated. Some programmers use standalone editors and debuggers to get the work done.
A typical cycle is:

https://code.visualstudio.com/

Chapter 19. Accelerating Beyond IDLE

1. Edit code in your editor
2. Run the code from the command line
3. Check the output, prepare to debug
## 4. Repeat!

#### 19.6.1 Start with the Terminal
We’re going to do this old-school. Programmers have been using the command line for over 10,000 years,
and it has staying power for a reason.
Launch a terminal and bring up a shell. You can use another shell if you want, but I’ll be talking bash/zsh
here.
At the prompt, type the following commands, one per line:
cd
mkdir bgpython
cd bgpython
ls -la

These commands do four amazing things:
1. cd means change directory. (A directory is the same as a folder.) On a line by itself, it means
“change to my home directory”.
2. mkdir means make directory. We’re creating a new folder called bgpython.
3. cd bgpython to change into that directory.
4. ls -la to get a long directory listing (i.e. all the files in that folder.)
At this point you should see something like this:
$ ls -la
total 0
drwxr-xr-x
2 beej
drwxr-xr-x+ 123 beej

## 64. Nov 18 23:14 .
## 3936. Nov 18 23:14 ..

This is showing you all the files you have. Namely, there are two of them: . and ... These mean “this
directory” and “parent directory”, respectively. (You know how folders can be inside other folders? The
outer folder is called the “parent” folder, which is what the parent directory is. If you want to get back to
your home directory from here, you can type cd ...)
You should think of the shell as “being” in a certain directory at any particular time. You can cd
into directories, or cd .. back into the parent, or cd to get to your home directory from anywhere.
It’s like the folder you have open that has focus in a GUI.
(The remaining information on each line tells you the permissions on the file, who owns it, how big it is,
when it was modified, and so on. We can worry about that later.)
Other than those there are no other files. We’ll soon fix that! Let’s add a Python program and run it!

### 19.7 Launching Your Code Editor
Usually launching an editor to edit a file is as simple as typing the editor name directly followed by the
filename on the command line.
For example, to launch VS Code to edit the file hello.py:
code hello.py

But wait–isn’t VS Code a full-fledged IDE? Yes, it is. Another popular editor is Vim:

### 19.8 Running the Program!

vim hello.py

But in any case, you’re in the editor and ready to type code.
This is your canvas! This is where the magic happens!
If you get in Vim and have no idea how to get out, hit the ESC key and then type :q! and hit
RETURN—this will exit without saving. If you want to save and exit, hit ESC then type ZZ in caps.
Vim is a complex editor that is hard to learn. But after you learn it, I maintain it’s the fastest editor
on the planet. I’m using it to type this very sentence right now.
To learn it, I recommend OpenVim’s interactive Vim tutorial and this reference of Vim commands
from beginner to expert.
Type the following6 into your editor (the line numbers, below, are for reference only and shouldn’t be
typed in):
print("My name's Beej and this is (possibly) my first program!")

Pull down File→Save to save the file.

### 19.8 Running the Program!
Pop back into your terminal window and type ls -la to get a directory listing:
$ ls -la
total 8
drwxr-xr-x
3 beej
drwxr-xr-x+ 123 beej
-rw-r--r-1 beej

## 96. Nov 18 23:27 .
## 3936. Nov 18 23:14 ..
## 87. Nov 18 23:27 hello.py

There it is! hello.py clocking in at 87 bytes (characters, roughly) in size.
Let’s run this puppy. Remember how the program is just a recipe for doing a thing—what do you think
our hello.py program does? Guess!
Then type this to run it (if python doesn’t work, try python3 or py depending on your system):
python hello.py

and hit RETURN! [Angelic Chorus!]
$ python hello.py
My name's Beej and this is (possibly) my first program!

You just wrote some instructions and the computer carried it out!
Next up: write a Quake III clone!
Okay, so maybe there might be a small number of in between things that I skimmed over, but, as Obi-Wan
Kenobi once said, “You’ve taken your first step into a larger world.”

https://beej.us/guide/bgpython/source/examples/hello.py

Chapter 19. Accelerating Beyond IDLE

### 19.9 Exercises
Remember to use the four problem-solving steps to solve these problems: understand the problem, devise
a plan, carry it out, look back to see what you could have done better.
1. Make another program called dijkstra.py that prints out your three favorite Edsger Dijkstra
quotes7 .

### 19.10 Summary
- Move around the directory hierarchy using the shell
- Edit some source code in an editor
- Run that program from the command line

https://en.wikiquote.org/wiki/Edsger_W._Dijkstra

Index
Apollo 13, 6
email to Beej, 2
mirroring, 2
translations, 2
