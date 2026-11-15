---
id: beej-python-05
title: "Beej's Guide to Python Programming — Close the file., Print the data, Repeat, Raise it with the raise…"
slug: beej-python-05-beej-s-guide-to-python-programming-close-the-file-print-the-
source: "Beej's Guide to Python Programming"
sourceSection: "3. Close the file., 4. Print the data, 4. Repeat, 2. Raise it with the raise statement., 1. When we run this code, it prints out “Exception” instead of “Division by Zero”. Why? What can, 3. Write a function that accepts a list of three numbers and returns the sum. If the list does not contain, Appen"
track: data-scripting
tier: free
tags: [python, programming, scripting]
summary: "Well, it’s analogous to when you open the file in your editor, and then close it. Covers 7 sections: Close the file., Print the data, Repeat."
---
# Beej's Guide to Python Programming — Close the file., Print the data, Repeat, Raise it with the raise…

## 3. Close the file.
This is super-duper common.
What does it mean to “open” and “close” the file?
Well, it’s analogous to when you open the file in your editor, and then close it.
“Opening” is asking the operating system1 (OS) to give you access to the file. You can open for reading,
for writing, or both.
For this section, we’ll want to ask the OS to open the file for reading.
“Closing” the file is the opposite of opening. We’re telling the OS that we’re done with the file. The OS
does any cleanup it has to. You should always close any files you open. (All files that you open will
automatically be closed when your program completes its run, but you still should explicitly close them
anyway2 .)
And “reading” is actually pulling the data from the file on disk into strings in memory.
Let’s write some code3 to read our wargames.txt file and print out the contents on the screen.
Our steps will be:
1. Open the file
2. Read the data
3. Close the file
## 4. Print the data
The Operating System is like Linux, Windows, MacOS, Unix, etc. It’s a program that helps you, the user, interface with the
hardware on the system, like keyboards, screens, and disks.
It’s a level of polish that other devs will expect. If they see you’re not thorough enough to close any files you open, they’ll
wonder what else you’ve missed.
https://beej.us/guide/bgpython/source/examples/fileread1.py

f = open("wargames.txt")
data = f.read()
f.close()
print(data)

Some things to note:
- When we opened the file, we didn’t specify read or write. In Python, it’s “read” by default.
- Notice that we close the file before we print anything. We didn’t have to, but it demonstrates how
we now have a copy of the data in memory. We can still use it, even though we’ve closed the file.
Since we have a copy of the data, we can do all kinds of stuff to change it.
If you modify the last two lines to be:
print(data.upper())

we’ll get the output in uppercase. (But the original file is still lowercase, of course!) It’s our copy of the
data to do with as we please!

### 13.5 Opening Files with with
Now there is a more canonical4 approach to reading files using the with statement in Python.
Earlier, we read a file
f = open("wargames.txt")
data = f.read()
f.close()
print(data)

The equivalent using the with statement looks like this:
with open("wargames.txt") as f:
data = f.read()
print(data)

If you’re looking closely, you’ll notice that the f.close() is missing. That’s because when you use with
to open the file, that gets handled automatically for you! Not only that but even if some error occurs, the
file will be properly closed.
Although the pattern of open-read-close is really common in other languages and Python supports it, the
preferred way of doing things is with the fantastic with statement.

Meaning, the One Right-ish Way to do something.

### 13.6 Reading Data a Line at a Time

### 13.6 Reading Data a Line at a Time
Check this out: in our previous examples, we read the entire file into memory at once. That’s what the
.read() method does.
For small files, that’s no problem.
But what if you have a file that’s 200 GB of data? You (probably, as of this writing in 2020) don’t have
that much memory. How can you deal with big files like this?
The answer is to read them a little bit at a time.
With text files like this, a common thing to do is to read them a line at a time. Then you process that line,
and then move on to the next one. This way you only need to have a single line from the file in memory
at once, instead of the whole 200 GB worth.
Let’s use the with statement to open a file, and then read a line at a time.
line_num = 1
with open("wargames.txt") as f:
print(f'{line_num}: {line}')
line_num += 1

And we get this output:
1: What he did was great! He designed his computer so that it could learn
2: from its own mistakes. So, they'd be better the next time they played.
3: The system actually learned how to learn. It could teach itself!

Pretty neat, eh? We just get to use a for loop on the opened file to read one line at a time.
But wait! Why is there an extra newline being printed out? What are those blank lines between the lines?
This is a common beginner mistake. The reason is that there is a newline at the end of every line of the
file already (because that’s where the line breaks are). And, in addition, print() adds its own newline!
So we get both of them printed.
The easiest workaround is to use the end keyword argument on print() to stop it from adding a newline
of its own:
print(f'{line_num}: {line}', end='')

Another option is to use .rstrip() on the string to strip newlines from the end.
line = line.rstrip('\r\n')

That’ll strip carriage returns or newlines from the right side of the string. We have to specify both since
some OSes use different characters to represent the end of the line, somewhat irksomely.
An even-more-portable way to write this is to first:
import os

then
line = line.rstrip(os.linesep)

and Python will automatically use the proper end-of-line character no matter what system you’re running
the program on.

### 13.7 Writing files
So far we’ve been dealing with getting data out of files, but now let’s talk about creating a new file and
writing data to them.
This is how programs permanently save data that they need to use later. If you don’t save the data to disk,
then it all vanishes once the program exits.
The process is similar to reading, except when we open the file, we need to specify that we want to write.
(If we don’t tell open() otherwise, it assumes we’re opening for reading.)
WARNING: if you open an existing file for writing, the contents of that file is instantly lost!
Let’s open a file and write some data to it using the write() method.
with open("newfile.txt", "w") as f:
f.write("Hello, world!\n")

There we go! If you run this, then have a look, you’ll see a file called newfile.txt that has the magic
words in it.
Now you have the power to save data to disk and read it back again!

### 13.8 Chapter Project
If you need to, review the specification at the top of the chapter.
This project is a bit bigger than the others, eh? I mean, writing an entire editor is kinda biting off a lot,
isn’t it?
Sure! Yeah, it’s a lot. But we can do it using the problem-solving framework just like always.
Something else a little different here is that I’m not going to include line numbers in the listings. You’ll
have to work out the proper place to put the code based on my descriptions and what makes sense. With
practice, it should get clearer how things piece together.
Let’s start!
Review the spec from earlier if you have to, but the basic chunks of this program are:
- Parse the command line to get the filename
- Read a file
- Write a file
- Read user commands as input
- List the file on the screen
- Append lines to the file
- Edit existing lines
- Delete lines
So first, make sure we know what all those do.
Then we’ll attack.
We’re going to do something a little different this time. We’re going to make an overarching plan, and
then jump back and forth between Planning and Carrying Out the sub plans the larger plan is comprised
of.

This is a little more like how software dev actually works. You have a general idea of where you’re going,
and you work out the details as you get to them.
This is a bit of a double-edged sword, and it takes practice and experience to get it right. You don’t
want to over-plan, because you’re undoubtedly going to have to change things and you don’t want
to waste your time. And you don’t want to under-plan, because then hidden gotchas might… get
you later. You want to plan just the right amount. Whatever that is.
In reality, devs consistently under-plan. And they still make it work somehow, like MAGIC.
And by “MAGIC”, I mean tons of sweat, tears, and off-color language.
Being able to do this is a really, really important skill to practice. This is where software development
really happens. The rest of coding is just writing things down.
So let’s do the rough overall, based on the outline, above in Understanding The Problem.
- First we’ll get the filename from the command line.
- Then we’ll read the file.
- Then we’ll loop to get input for whatever it is the user wants to do (append, list, edit, write, etc.)
- For whatever the user enters, we’ll do that thing.
- When the user says q to quit, we’ll quit.
That’s a pretty loose plan. I mean, “We’ll do that thing,” isn’t exactly well-fleshed-out. But we know it’s
possible to do them, and we can work on those individual command components one at a time (since none
of them are really dependent on one another).
Looks like some of those we can work on right away.
Let’s start simple. Simplifying the problem is always a good way to get bits and pieces done. Also, getting
a minimum working piece going as soon as possible can help direct our efforts and keep motivation up.
Get a core piece in place, and then keep adding on.
What’s a simple version of the program?
Well, we could start by looking at the command line to see if there’s a filename there or not, and storing
it if there is.
Remember the user has the option to run the program without specifying a filename (since maybe they’re
creating a new file).
So we want to check the command line args in sys.argv. If the user specified a filename, we’ll store it.
If they didn’t, we’ll store None to indicate that case. If they specify more than one argument, we’ll print
out a usage message.
Great! Let’s go!
if len(sys.argv) == 2:
filename = sys.argv[1]
elif len(sys.argv) == 1:
filename = None
print("usage: lineedit.py [filename]", file=sys.stderr)

sys.exit(1)
print(filename)

That last line is only there temporarily. This lets us test things out.
$ python lineedit.py
None
$ python lineedit.py test
test
$ python lineedit.py test something
usage: lineedit.py [filename]

Perfect. What’s next?
Looks like the next reasonable step is to read the file into memory so that we can manipulate it later.
So a couple of questions:
- How do we read a file?
- What do we store it in?
As for the first, hopefully, you’ve been reading this chapter and know about how to open a file for reading
and read individual lines from it.
But how to keep all those lines?
Think about all the data structures we’ve talked about so far… lists, dicts, objects… What is the file the
most like?
Go ahead and give it some thought before I spoil it in the next couple sentences.
You might argue that each line is like an object. And it is. It wouldn’t be wrong to have a class that
represents a line. But somehow you still need to store a list of lines.
Gah, what a giveaway!
Yeah, a list seems like a good idea. In a way, a text file is simply a list of lines.
So let’s read the file a line at a time, storing each into a list as we go.
This seems like a self-contained piece of code, so I’m going to go ahead and write a function that accepts
a filename as an argument, and then returns a list of all the lines in that file.
- Make an empty list
- Open the file
- For each line of the file, append it to the list
- Return the list
def read_file(filename):
"""Read a file from disk"""
lines = []
lines.append(line)

return lines
if filename is not None:
lines = read_file(filename)
lines = []
print(lines)

Now if we run that, and specify an input filename, it should print out a list with all the lines in that file.
Of course, we need a sample input file. You can make one in VS Code—just edit a new file called
lines.txt and put whatever you want in it. (About five lines is good for testing.) If you don’t want to
bother, there’s a file lines.txt in the examples directory5 .
Running it, we get our list, just like we wanted!
['This is line 1\n', 'This is line 2\n', 'This is line 3\n',
'This is line 4\n', 'This is line 5']
$ python lineedit.py
[]

Take a moment to digest what we did there: we made a copy of the data that was on disk and stored that
copy in memory.
What’s next in the big overall plan? Looks like it might be time for a user-input loop.
This is like so many other input loops we’ve done so far:
- Print a prompt
- Parse the input
- Run the command
- Stop looping when the user says to quit
Your standard input loop. All it does is let you type q:
command = input("> ").strip()
if command[0] == 'q':

If you hit RETURN it pukes right away because command[0] isn’t a thing if the string is empty.
A common thing to do here is just print another prompt if the user enters a blank line. We can add this
after the input() line to do that:

https://beej.us/guide/bgpython/source/examples/lines.txt

if command == '':
continue

And finally, let’s add some output as an else to tell the user if they input something we didn’t recognize:
print("unknown command")

OK! Now if we run it, we should be able to handle blank lines, unknown commands, and q for quit.
> x
unknown command
[ user hit RETURN a few times here ]
> q
$

Not much of an editor so far, but Facebook wasn’t built in a day. We’re just slowly getting the pieces in
place.
What’s a good piece to do next? Lots of options, because now we’re to the point of implementing the
handlers for the various commands (besides the one for quitting, which we just did).
Personally, if we have things that display data and things that modify data, I prefer to do the ones that
display the data first. They’re less likely to mess things up (since we’re not modifying data), and if you
can’t display the data correctly, your odds of modifying it correctly are low, indeed.
So let’s hit up that “list” command that will show us lines from the file.
The list command takes a single argument representing the line number to start listing from. And then it
should list for 10 lines.
Since we have all the lines in a list already, this isn’t too entirely horrible. We just have to:
- Parse the starting position as entered by the user.
- If they entered a number less than 1, assume they meant 1.
- Start looping from that number, printing out 10 lines.
- If we hit the last line, stop printing.
Since we have all these different kinds of functionality, let’s put them in individual functions to keep the
code well organized.
We’ll make a handle_list() function that is called when the user asks to list the file. It’ll take a couple
of arguments: the arguments the user typed after a command, as well as the list of lines we’re going to
manipulate.
Firstly, let’s check and see if the user wants to list lines by checking to see if the first letter of the command
is l. If it is, then it’s on.
But there’s an argument after the l, right? The user has to specify which line to start listing from. And
we have to get that into our handle_list() function somehow.
So let’s do two things. Let’s parse those arguments, if any, out of the overall command. We’ll use split()
to break the command apart on spaces, and then we’ll use a slice from [1:] (that is, from the second
element to the end) to get all the arguments.

The result will have any arguments following the command in a list, or an empty list if there were no
arguments.
And then we’ll pass that to our handler function:
args = command.split(" ")[1:]
if command[0] == 'q':
elif command[0] == 'l':

And let’s code up a stub6 of the function to handle it, just to see if it’s working:
def handle_list(args, lines):
print(f'Handle list: {args}, {lines}')

Running, we get this:
> l
Handle list: [], ['This is line 1\n', 'This is line 2\n',
'This is line 3\n', 'This is line 4\n', 'This is line 5\n']
> l 99
Handle list: ['99'], ['This is line 1\n', 'This is line 2\n',
'This is line 3\n', 'This is line 4\n', 'This is line 5\n']

So you can see that the lines are all coming in right. But, more importantly, our argument is coming in
right.
In the first call, it prints out as [] empty.
But on the second, we see ['99'] which is the number we told it to list.
We just have to extract that number somehow.
But before we do, we’d better test to see if the user entered an argument at all. It’s required for the list
command, after all.
Then we’ll use the start and end lines to print out everything in between.
def handle_list(args, lines):
start = int(args[0])
end = start + 10 # print 10 lines
print("usage: l line_num")

A function stub is a callable function that takes all the same arguments and, if necessary, returns a sensible value. But it doesn’t,
in fact, do anything of use. It’s a good way to test that your overall call flow is working right. And it gives you a nice, easy TODO
spot to fill out.

for i in range(start, end):
print(f'{i}: {lines[i]}', end="")

Now, if we run this, we see a problem:
1: This is line 2
2: This is line 3
3: This is line 4
4: This is line 5
File "lineedit.py", line 71, in <module>
File "lineedit.py", line 43, in handle_list
print(f'{i}: {lines[i]}', end="")
IndexError: list index out of range

So clearly things have gone awry. There’s that huge error message that’s dominating the accident scene
and it’s hard to notice anything else other than the lines of the file being printed at the top.
At least nothing went wrong before that error, right?
…Or did it?
Notice anything weird about those first printed lines? Sure, the numbers start at 1, but the first line says
This is line 2! That sets off some alarm bells. (Especially since when you opened the file in your real
editor, you see the first line says This is line 1.)
We have two problems.
1. That list index out of range error
2. Our off-by-one error7 that’s causing our lines to be off by one.
Yes, off-by-one errors are famous enough to have their own Wikipedia page.
As the name suggests, our computations are one-off. But why? How?
This is a really common disagreement between humans and computers. We humans like to have our lists
start at index “1”, and computers like them to start at index “0”. It’s the age-old battle. Even the Romans
started with “I”, but that was mainly because Roman numerals didn’t have a character for zero until 725
AD—latecomers!
And in this case, we have a human entering numbers that start indexing at “1”. And we print them out for
the human to see starting with index “1”…
But in Python, the lines are in a list starting from index “0”!
We need to do some math.
- When we want to go from a human (1-based) index to a computer (0-based) index, we subtract one
from the number. 1 becomes 0.
- When we want to go from a computer (0-based) index to a human (1-based) index, we add one from
the number. 0 becomes 1.
Since we’re using start and end to index the list, I feel a bit better having them 0-based because the list
is 0-based.
There’s a general rule of thumb at play here:

https://en.wikipedia.org/wiki/Off-by-one_error

- When a user enters a 1-based number, convert it to 0-based as soon as you can for internal use in
the program.
- When you have to display a 1-based number, keep it 0-based for as long as you can, and only convert
it at the last second when you output it.
Keeping these conversions to a minimum and doing them only on input and output can save you a lot of
headaches.
What not to do: don’t just jump in and start adding +1s and -1s all over the place and hoping for the best.
That way lies madness, assuredly. Stop, understand, and plan. And then carry it out.
I’m going to write a little helper function here to convert from 0-based to 1-based since I think we’re going
to be using this all over the place. And it helps clarify the code a bit; instead of having a bunch of +1s and
-1s all over, you have a function name that has some meaning to future readers.
def one_to_zero(n):
"""Convert a number from a 1-based index to a 0-based index."""
return n - 1

And now we can make use of that. Let’s make start 0-based and try it out.
start = one_to_zero(int(args[0]))

Now running it gives:
0: This is line 1
1: This is line 2
2: This is line 3
3: This is line 4
4: This is line 5
File "lineedit.py", line 76, in <module>
File "lineedit.py", line 48, in handle_list
print(f'{i}: {lines[i]}', end="")
IndexError: list index out of range

Same pukey error, but let’s look at the lines before then. The good news is we’re getting all the lines
printed. The bad news is that the line number on the left is in computer 0-based land, and we need it in
human 1-based land. Let’s add another helper function:
def zero_to_one(n):
"""Convert a number from a 0-based index to a 1-based index."""
return n + 1

And then let’s call that in our print output line:
print(f'{zero_to_one(i)}: {lines[i]}', end="")

Now a run gives:

File "lineedit.py", line 80, in <module>
File "lineedit.py", line 52, in handle_list
print(f'{zero_to_one(i)}: {lines[i]}', end="")
IndexError: list index out of range

Bam! That’s what we want. All lines printed with correct line numbers.
Now, what about that error? It’s telling us the list index is out of range, which isn’t too surprising since
it’s going off the end of the file.
Before our for-loop, let’s just add some code that makes sure the start and end are sane. (Remember
we’ve decided that they are 0-based indexes.)
if start < 0:
start = 0
if end > len(lines):
end = len(lines)

And then you can run the for-loop after that with impunity!
> l 3

Perfection! That’s the list functionality complete!
Things only tend to get easier from here on out. The first part of the implementation is the worst, but now
we just have variants on a theme:
1. Check for the proper command on input
2. Pass the args to a handler function for that command
3. Build out the handler function
## 4. Repeat
What’s the next simplest thing to work on? How about “delete a line”?
So we want to delete a single line. This is as easy as removing an element from the list containing all the
lines.
We just need to know the element number to remove.
Of course, the user enters it after the d command, so we can grab it from there.

But remember: what the user enters is 1-based! We have to convert it to 0-based before we use the number
to delete a line… otherwise we’ll delete the wrong line.
So we should be able to:
- Add a handler to the main input loop
- In the delete handler, get the line to delete
- Convert it to 0-based
- Delete that line from the list of lines
A little digging in the help reveals that the pop() method removes an element from a list at a given index:
pop(self, index=-1, /)
Remove and return item at index (default last).

To our main input loop, let’s go ahead and add a call to the handler if the user requests a deletion:
elif command[0] == 'd':
handle_delete(args, lines)

And now let’s write the delete handler. This is going to be similar to the line listing handler at first: we
have to get the line number the user entered, and convert it to 0-based.
And then make sure it’s in range.
And then delete that line with the pop() method.
def handle_delete(args, lines):
"""Delete a line in the file."""
line_num = one_to_zero(int(args[0]))
print("usage: d line_num]")
if line_num < 0 or line_num >= len(lines):
print("no such line")
lines.pop(line_num)

And that’s all there is to it. Let’s try it:

> d 3
3: This is line 4
4: This is line 5
> d 0
no such line
> d 5
no such line

Looks good!
What’s next easiest? Probably the “edit” functionality.
When we edit a single line, we want to replace the element in the lines list completely with a new element
that we input from the keyboard.
The only line is thrown away.
For this, the user enters e for “edit”, followed by a line number.
Let’s do the same as with delete, except that instead of using pop() to remove a line, we’ll just use
input() to get another one and store it directly on the list.

Firstly, let’s add that command handler to the main loop:
elif command[0] == 'e':
handle_edit(args, lines)

Secondly, let’s implement the edit handler. Same code and rationale until the last line:
def handle_edit(args, lines):
"""Edit a line in the file."""
line_num = one_to_zero(int(args[0]))
print("usage: e line_num")
if line_num < 0 or line_num >= len(lines):
print("no such line")
lines[line_num] = input()

Notice how we just replace the named line in the list with whatever line is returned by input().

> e 2
NEW LINE 2!
2: NEW LINE 2!3: This is line 3

Wait a second! Lines 2 and 3 are all bunched up after I edited it! That can’t be right.
This all ties back to the newlines we keep at the end of lines in the list.
Remember that we’re storing each line with the newline attached to the end.
But input() strips the newline off! Not what we were after.
So we have to add the newline to the end of the, er, new line that we just entered. We’ll just tack it on
with the + string concatenation operator.
Modify the last line of the handle_edit() function to add the newline:
lines[line_num] = input()# + '\n'

And done with that one!
What’s the next easiest thing to code up? Well, looks like there’s only one more editing command: “append”.
This one’s a little different. It looks like we go ahead and read the line to append just like with any other
command. But then we go into a weird mode where we repeatedly enter lines until the user enters a single
period on a line by itself.
And each of those lines are appended in turn.
If the user says to append after line 0, the lines should be inserted at the top of the file.
So let’s go ahead and do the usual command-line parsing to see which line we want to insert after.
And then let’s loop until the user enters a single period.
Inside the loop, we’ll read a line and append it into the list in the right place.
Looking at the documentation, there is an append() method for lists, but it only appends onto the end of
the list.
We want ours to be able to do that, but also to be able to put those lines in the middle, or at the top.
Let’s keep looking down the documentation.

There’s insert() to put an object before an index. This seems to work for the beginning and the middle,
but what about appending to the end? Do we have to use the append() method in that special case?
The docs aren’t entirely clear on the matter. Let’s bring up the REPL and try some tests.
I’ll make a list and then try to insert() values in various places.
First, let’s try inserting before element 0, which should insert at the beginning:
>>> a = [11, 22, 33]
>>> a.insert(0, 99)
[99, 11, 22, 33]

Great! The 99 went in first, just like I wanted.
Let’s insert another number before index 2:
>>> a.insert(2, 999)
[99, 11, 999, 22, 33]

That worked, too.
Now, the list only has up to element index 4… but let’s go out on a limb and try inserting before index 5
(which doesn’t exist) and see if that appends on the end:
>>> a.insert(5, 9999)
[99, 11, 999, 22, 33, 9999]

Yes! It worked! We don’t have to special-case a call to append().
It is a little weird, but if you put any index past the last one in for append, it’ll put the value at the end of
the list.
If we make a small list and try to insert the value 3490 at index 99, it just puts it at the end:
>>> a = [1, 2, 3]
>>> a.insert(99, 3490)
[1, 2, 3, 3490]

This kind of experimentation to see what works and what doesn’t is really common, and is a great way to
explore and learn how the system works.
Ok, so we:
- Get the line number to append after. Remember that we want this to be zero-based, so we’ll subtract
1 from whatever they enter. If they enter “2”, that means that we want to insert after index 1.
- But since the insert() method inserts before a line, not after, we’d better add one to the line index
so that we append after that line.
- Then we loop until the user enters a period, inputting a line and inserting it into the list in the right
place.
Now, you might wonder why bother subtracting one just so we could add one right after?
And you’re right—it does nothing. We don’t have to do that.
But there’s an argument to be made that it’s clearer to a future reader of the code. We clearly subtract one
to get to a 0-based indexing method as soon as possible. And we add one to get insert() to insert after a
line instead of before it. Two different reasons to do the arithmetic clearly spelled out. If we were to just
leave them both off, that information wouldn’t be obvious to the next developer reading the code.

First, let’s do our standard parsing of the command argument:
def handle_append(args, lines):
"""Append a line in the file."""
line_num = one_to_zero(int(args[0]))
print("usage: a line_num")

Then, continuing down the function, do our adding one:
line_num += 1

Then, continuing again, let’s put in our loop to read lines until the user enters a period, and insert them
into the correct location in the list.
line = input()
if line == '.':
continue # Jump back to the `while`
lines.insert(line_num, line + '\n')
line_num += 1

All right, let’s test it. Let’s insert lines at the beginning:
> a 0
NEW line 1
NEW line 2

1: NEW line 1
2: NEW line 2
3: This is line 1
4: This is line 2
5: This is line 3
6: This is line 4
7: This is line 5

Works!
Let’s insert lines in the middle:
> a 4
NEW line in the middle
1: NEW line 1
2: NEW line 2
3: This is line 1
4: This is line 2
5: NEW line in the middle
6: This is line 3
7: This is line 4
8: This is line 5

Works!
Let’s insert some lines at the end:
> a 8
NEW end line 1
NEW end line 2
1: NEW line 1
2: NEW line 2
3: This is line 1
4: This is line 2
5: NEW line in the middle
6: This is line 3
7: This is line 4
8: This is line 5
9: NEW end line 1
10: NEW end line 2

Also works! Woot!
Although it’s not automated, this is good test coverage. We looked at the common case (insert in the
middle), but we also looked at the edge cases (insert at the beginning and end) just to make sure those
worked properly. When testing, always think about which cases aren’t common and test those explicitly.
Now there’s but one thing remaining: saving the file to disk with the “w” (write) command.
We already wrote some code back in the day to read a file a line at a time and store the results in a list.
This time, we want to do the opposite. Go through our list and write the file a line at a time until we’re
done.

Compared to the append command, this is cake.
- Open the file for writing
- Loop through all the lines
- Write each line to the file
Also:
- Hook up the “w” command in the main input loop.
And:
- Parse the argument from the “w” command to get the filename
Since “write a bunch of lines to disk” is a good self-contained operation, I plan to write a function that
does just that and nothing more. I’ll write a different function to get called when a write is requested
which will make sure the args are correct and so on. Keep it modular!
First, let’s add a function to write the file to disk. As arguments, it’ll take the list of lines to write and a
filename to write it to.
When we open the file, we’ll pass the "w" argument to it to indicate that we’re writing this file.
Note that as soon as you open a file for writing, it erases that file if it exists. But this should be OK in this
case since we’re about to write it again.
And since every line already has a newline at the end, we don’t have to add one when we write it to disk.
def write_file(lines, filename):
"""Write a file to disk"""
with open(filename, "w") as f:
for line in lines:
f.write(line)

Now let’s write the handler for the command. This will check if the arg was specified and print an error
if not. And then write the file.
def handle_write(args, lines):
"""Handle the write command"""
filename = args[0]
print("usage: w filename")
write_file(lines, filename)

Lastly, we need to add a handler to the main command loop so that when we type “w”, it saves the file:
elif command[0] == 'w':
handle_write(args, lines, filename)

And that’s that!
Problem-solving step: Looking Back
There are a lot of things we can do to improve the code here.
- Add the option for the delete command to specify an ending as well as a starting line to erase a block
of lines at once.

- Make it so that if the user specifies a filename on the command line and does not specify one after
the write command, it writes to the same file specified on the command line.
- Add an insert command that works like append, except it puts the new material before the line
specified. How can you do this with minimal addition of code? After all, append and insert are very
similar.
What’s crazy is that you can use this to write Python programs. Let’s do one!
$ python lineedit.py
> a 0
print("I wrote this with my own editor!")
1: print("Hello, world!")
2: print("I wrote this with my own editor!")
> w my_hello.py
> q
$ python3 my_hello.py
I wrote this with my own editor!
$

Well, you can probably tell that’s not quite as easy as using VS Code (or any other editor, for that matter).
But, believe it or not, line editors were the way to enter programs for a long time.
Be thankful for standing on the shoulders of giants!

### 13.9 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. You’ve been misbehaving in class and the teacher sentences you to write 500 lines as punishment.
Shrewdly, you ask if you can type the lines, and the teacher agrees9 .
The program should accept command line arguments of the filename to output to and the number of
lines. All command line arguments after that are the punishment line itself that should be repeated
that many times in the output file.
For example:
python writelines.py outfile.txt 500 I will not talk in class.

would generate a file outfile.txt with the line
I will not talk in class.

repeated 500 times.

https://beej.us/guide/bgpython/source/examples/lineedit.py
True story. This was back when I was in the 7th grade and computers were a bit of a novelty. We had a daisywheel printer at
home which was fairly indistinguishable from a typewriter. In real life, though, I didn’t write a program to generate the lines. I told
dad about the task, and he rolled his eyes and showed me how to copy and paste in WordStar.

### 13.9 Exercises

WARNING: Apostrophes and quotes (and other punctuation) often have special meaning to the
shell. Avoid any characters other than periods or you might get strange results. If weird things
happen, hit CTRL-c to get out of it.
2. Write a program to read comma-separated values (CSV) files.
A CSV file has a bunch of values separated by commas, one record per row.
Here’s the file we want to read11 . Look through it and see how all the information for a particular
record is in each row:
Title,Release Year,Studio,Publisher
Minecraft,2011,Mojang,Microsoft Studios
M.U.L.E.,1983,Ozark Softscape,Activision
X-Men The Official Game,2006,Z-AXIS,Activision
Populous,1989,Bullfrog Productions,Electronic Arts
DOOM,1993,id Software,id Software
Lemmings,1991,DMA Design,Psygnosis

Your goal is to read the file and store each record in an object. (Make a class that defines the same
fields you have in the CSV file to instantiate the objects from.)
Then print out the data, like so:
M.U.L.E.
Populous
Lemmings
DOOM
X-Men The Official Game
Minecraft

1983
1989
1991
1993
2006
2011

Ozark Softscape
Activision
Bullfrog Productions
Electronic Arts
DMA Design
Psygnosis
id Software
id Software
Z-AXIS
Activision
Mojang
Microsoft Studios

The printout, above, is shown in sorted-by-year order. That’s a stretch goal if you want to take it on.
(Hint: check out the key keyword argument to the .sort() method. Also, the solution code talks
about it in detail.)
Also, incidentally, M.U.L.E.12 is one of the greatest games ever written. Despite it being over 25
years old, PC World magazine rated it the 5th-greatest game of all time in 2009. If you haven’t
played it, grab an Atari 800 emulator, four gamepads, and four friends, and have some fun. (Or
play solo against the computer.)
Now, a quick word of warning: this exercise assumes you’re going to implement the logic for
parsing this file yourself. But in real life, in Python, you’d never do this. Python has built-in
functionality to parse CSV files, and it’s far more robust and correct than what we’re doing
here. We’re just reinventing the wheel in this case as a programming exercise.
Notice that the first line of the CSV file is a header. It describes what the columns are, but isn’t
actual data. You’ll have to skip this line when you’re reading the file. (Hint: call the next()
function on the file iterator returned by open() to get the next line one time at the beginning.)
(Solution13 .)
3. Modify your multiplication table generator from the chapter on strings to save the table to disk
instead of printing it to the screen.
The program should accept both the dimension of the table and the output filename on the command
line, e.g.:

https://beej.us/guide/bgpython/source/examples/ex_writelines.py
https://beej.us/guide/bgpython/source/examples/games.csv
https://en.wikipedia.org/wiki/M.U.L.E.
https://beej.us/guide/bgpython/source/examples/ex_simplecsv.py

python multtablefile.py 12 table12x12.txt

(Solution14 .)
4. Write a program to count the number of words in a file specified on the command line. The number
of words should be printed out.
This is a simplified clone of the Unix wc (word count) command.
For this one, we’ll define a word as something separated by whitespace. (Hint: the .split() string
method15 .)
Example (wargames.txt is in the examples directory16 ):
$ python ex_wc.py wargames.txt
38

(Solution17 .)
5. Write a program that sorts lines of a file in alphabetical order and prints the result on the screen.
Note that you don’t need to alphabetize every word in each line—just treat the line as one big word
to be alphabetized.
This is a simplified version of the Unix sort command.
Example run:
$ python ex_sort.py rocks.txt
amphibolite
andesite
argillite
basalt
breccia
chalk
chert
claystone

(And so on. The rocks.txt file has more lines in it than I’ve shown here.)
(Solution18 .)

### 13.10 Summary
What a chapter! That was like a 50% project, eh?
But look at what we learned!
We covered how to open and read and write text files. We talked about how to read and write a line at a
time, as well.
And we wrote a simple line-based text editor! Most developers go their entire careers without doing that.
More Python goodness in the next chapter—see you there!

https://beej.us/guide/bgpython/source/examples/ex_multtablefile.py
https://docs.python.org/3/library/stdtypes.html#str.split
https://beej.us/guide/bgpython/source/examples/wargames.txt
https://beej.us/guide/bgpython/source/examples/ex_wc.py
https://beej.us/guide/bgpython/source/examples/ex_sort.py

Chapter 14

Exceptions
14.1 Objective
- Learn about different ways of handling errors
- Understand what exceptions are
- Write programs that catch exceptions
- Throw your own exceptions

### 14.2 Project
Write a program called head.py that returns the first few lines of a file. For example, if the user enters:
python head.py filename.txt 12

it should show the first 12 lines of filename.txt.
Take extra care to error-check all the input. Catch any exceptions that might occur.
Spend some time thinking about this; what are all the things that can go wrong with any user input?
If there is some kind of error condition, the program should print an appropriate error message and exit.

### 14.3 Errors in Programs
Let’s stop and think about this from a conceptual standpoint for just a minute.
Normally, a program produces data in the way you’ve asked for it. Unless something goes wrong. In
which case, it produces “bad” data.
Now, computers don’t really have much sense of right and wrong, as you’ve seen in the documentary The
Terminator. So how can we differentiate between good and bad data?
How can we tell that something’s gone wrong?

### 14.4 Classic Error Handling
There’s one way we’ve been using so far: the return value from a function. If it’s a particular sentinel
value that we’re on the lookout for, we can use that to determine success or failure.
For example, let’s check out the .find() method on strings. This returns the index in a string that a given
substring can be found. For example:

s = 'Bears, beets, Battlestar Galactica'
x = s.find('beets')

The return value there of 7 is “good” data. We asked for a thing and we got it. But what if something goes
wrong?
s = 'Bears, beets, Battlestar Galactica'
x = s.find('Dwight')

-1 here is the sentinel value we’re looking for to tell us if there’s an error.

We can make decisions on it. This is what I’d call “classic” error handling. This is the way people used
to handle errors when Stonehenge was built. And, like Stonehenge, this method of handling errors is still
in use to this day. If it ain’t broke, don’t fix it.
OK, yes, I admit Stonehenge is broke. Allow me my analogy!
s = 'Bears, beets, Battlestar Galactica'
x = s.find(substring)
if x == -1:
print(f"Couldn't find {substring}")
print(f"Found {substring} at index {x}")

There! We successfully handled an error the classic way.
But now let’s learn another way.

### 14.5 Error Handling with Exceptions
Exceptions are another way of indicating that something’s gone wrong.
We’ve already seen some of these. For example, if we run code that does this:
int("Hello!")

Python’s going to be upset. "Hello!" isn’t a number it’s ever heard of. And when we run it, we get this
message, and the program exits:
ValueError: invalid literal for int() with base 10: 'Hello!'

That’s an exception in action. We tried some code, and it raised an exception to tell us that what we were
doing just wasn’t going to work.
Exceptions are raised (also sometimes said to be thrown) for all kinds of things in Python.
Try to open a nonexistent file for reading:

### 14.6 Catching Exceptions

FileNotFoundError: [Errno 2] No such file or directory: 'keyser_soze.txt'

Try to divide a number by zero:
ZeroDivisionError: division by zero

Those first condensed words on the last line of the exception you see there? That’s the name of the
exception that occurred.
ValueError
FileNotFoundError
ZeroDivisionError

So, like using return values to indicate errors, exceptions also indicate that an error occurred.
Now—how do we detect that and do something with it?

### 14.6 Catching Exceptions
Bear with me, because this code is a little different in how it gets executed.
We’re going to use two new statements in conjunction: try and catch. Let’s jump right in with an
example that we can dissect:
x = input("Enter a number: ")

print(x * 1000)
print(f'error converting "{x}" to integer')

What’s happening there? Look at the big blocks first. We have a try block and an except block.
Think of the try block as the code you want to execute in your shiny dreamworld where your user enters
correct information every time.
Like the user enters 3490, and it converts to integer just fine, and then you print out 3490000.
Perfect.
But what if the user enters beans instead of a number? int() is going to freak out and raise a
ValueException, just like we saw earlier.
Here’s the magic. If that happens, execution of the try block will stop immediately, and Python will
transfer control to the matching except block, if it exists.
So for example, here’s a successful run:
Enter a number: 3490
3490000

and here’s a run where an exception is thrown:

Enter a number: beans
error converting "beans" to integer

See how it transferred control right into the except block?
That’s how we handle exceptions!

### 14.7 Catching Multiple Exceptions
What if your try block throws multiple exceptions?
Turns out you can catch multiple exceptions just by having multiple except clauses.
Let’s try a program that divides a number by another:

What are the exceptions that can be thrown?
Good question. Although there is a list of built-in exceptions1 , it’s not immediately obvious which one
gets raised when.
The easy thing to do is try it in the REPL. But try what?
Think like a villain. What are the things that can go wrong? What kinds of bad input can you pass this
program?
Give it some thought. I count four things that can go wrong with bad user input. Can you see them?
Well, we’re taking input, running it through .split(), and then assigning the results into two variables.
So the split() better return a list of length 2, or something bad is going to happen.
I’m going to put that line of code into the REPL and see what it says if I enter something that’s not two
numbers separated by a space.
>>> x, y = input("Enter 2 numbers: ").split()
Enter 2 numbers: 1
ValueError: not enough values to unpack (expected 2, got 1)

Check it out! I entered a single number, and it raised ValueError exception (with a message saying there
weren’t enough values).
Let’s try too many values:
>>> x, y = input("Enter 2 numbers: ").split()
Enter 2 numbers: 1 2 3
ValueError: too many values to unpack (expected 2)
ValueError again! That means we can do something like this to catch it:

### 14.7 Catching Multiple Exceptions

print("That's not two numbers separated by a space!")

And that will catch it. Here’s a run:
Enter two numbers separated by a space: 1 2 3
That's not two numbers separated by a space!

Whee!
What’s the next place we can mess things up?
Well, we’re converting to int()… what does that function do if we pass in something awful, like the
word manfrengensenton?
Again in the REPL:
>>> int("manfrengensenton")
ValueError: invalid literal for int() with base 10: 'manfrengensenton'

Hey, it’s ValueError again! Conveniently, we’re already catching that with an appropriate error message.
Totally handled.
That takes care of three of the four cases I saw where we could get exceptions. What’s the fourth?
Mathematics hat on. Do you see it?
That’s right, we’re dividing there… and you can’t divide by zero. What happens when we do?
We already saw, above, that we get a ZeroDivisionError. So let’s add that to the end of our code:
print("That's not two numbers separated by a space!")
except ZeroDivisionError:
print("Can't divide by zero!")

So as you can see, you can handle as many different types of exceptions as you want in their own except
clauses after the try.

### 14.8 Catching Multiple Exceptions II
If you want to handle multiple exceptions with the same handler code, you can make a list of them:
except (FileNotFoundError, PermissionError):
print("File not found or insufficient permissions")

This isn’t as frequently used, since often you want to take a different course of action for different exceptions.

### 14.9 Getting More Exception Information
Each exception is actually an instance of a class. And the class name is the name you use in your except
clauses.
Because it’s an instance, it has some additional information attached to it we can grab, but first, we have
to bind it (assign it) to a variable name. We can do that with the as statement.
1 / 0
except ZeroDivisionError as e: # e is a reference to the exception
print(e)
print(repr(e))

results in:
division by zero
ZeroDivisionError('division by zero')

That could be useful for getting more detailed information. In our example in the previous chapter, we
catch ValueError, but we saw three different circumstances that could lead to it. We could use this
technique to give the user more detailed information about the nature of the exception, should we choose.
All exceptions have an attribute called args that is a list of the arguments that are passed to the exception
when it was created. The first of these is often a human-readable error message.
For instance, this code:
1 / 0
except Exception as e:
print(e.args[0])

prints the helpful message:
division by zero

Furthermore, any exception that is based on IOError includes the string attribute strerror that contains
a human-readable error message corresponding to the error. You can find the list of exceptions that are
derived from IOError in the exceptions documentation2 .

### 14.10 Catching All Exceptions
A catch statement that doesn’t specify a particular exception will catch all previously uncaught exceptions.

### 14.11 Finally finally

For this reason, a blank catch should definitely be last, after all the other catches. Python will stop at the
first catch that matches, even if it’s a “catch all”.
When you’re in any catch, you can look at the results from the built-in function sys.exc_info(). This
function returns a tuple (think “list” for now, if you’re not familiar with tuples) with three pieces of information: the type of the exception, a reference to the exception itself, and a traceback3
Let’s mod our division program to catch all exceptions and print out the exception info:
except:
print(sys.exc_info())

Here are some sample runs:
Enter two numbers separated by a space: 1
(<class 'ValueError'>, ValueError('not enough values to unpack (expected
2, got 1)'), <traceback object at 0x7f7899794f80>)

Enter two numbers separated by a space: a b
(<class 'ValueError'>, ValueError("invalid literal for int() with base
10: 'a'"), <traceback object at 0x7f6d0c9732c0>)

Enter two numbers separated by a space: 1 0 (<class
'ZeroDivisionError'>, ZeroDivisionError('division by zero'), <traceback
object at 0x7fe2ea373040>)

This isn’t as common, to catch and examine exceptions in this way. But it is another tool in your toolbox.
Be careful with catch-alls. They might hide exceptions that you weren’t expecting and should have let
through. They’re rare in practice.

### 14.11 Finally finally
There’s a greater structure to be found here. We’ve already talked about try and catch, but there’s a way
to add code that runs after the try no matter what, regardless of whether or not an exception occurred.
It’s the finally clause, and it comes after the except clause(s).
Again, this block of code will run no matter what.
print(1/1)
except ZeroDivisionError:
A traceback, also known as a stack trace, is a list of all the function calls that have taken place to get to this point. It’s really
useful information for debugging.

print("Divide by zero!")
finally:
print("All done!")

The above code will print:
All done!

If we modified that first line to print(1/0), we’d get a divide by zero exception and the output would
be:
Divide by zero!
All done!

In all cases, the finally block will run.
You can use this block to execute finalization or cleanup code if you need to.
try-except is really common. finally is less so, but not entirely uncommon.

### 14.12 What Else? else!
Just when you thought try-except-finally was all she wrote, turns out we can add an else in there
for try-except-else-finally.
It’s entirely possible that you won’t ever see this, but I wanted to quickly touch on it here. Just glance at
it:
print("This is what we're trying to do")
print("and where exceptions might occur.")
except:
print("Caught an exception!")
print("This only runs if there was no exception.")
finally:
print("This runs no matter what.")

Using else can give you more control over the flow of your program when exceptions occur.

### 14.13 Exception Objects
At this point, we’ve covered catching exceptions, and this is all you need to know 99% of the time you’re
using Python.
But that doesn’t mean we should stop there. Part of being a good dev is having a good mental model of
how these things work, not just to memorize some patterns to use. Having a deeper understanding will
serve you well.
So let’s talk about how exceptions in Python are represented by objects.
We’ve already hinted at this, above, where we talk about getting more information from exceptions.

### 14.14 Raising Exceptions

We found there is a class named ZeroDivisionError and another named ValueError. Indeed, we can
just make new ones of these if we want:
e = ValueError()

There’s a whole list of exceptions that are ready to use4 , but if none of those seem to fit, you can just make
a new Exception with some information passed to it:
e = Exception('Something went horribly awry')

Lastly, you can make your own new exception classes if you’d like. You don’t have to—you can use
Exception or any of the other preexisting ones.
But if you do make your own, the only catch is that these must inherit from the Exception base class.
Whooooaa, there, Beej. What are you even talking about?
Okay, you got me. I stepped into some Object-Oriented Programming terminology, there. Now, we’ll talk
about what that all means in a later chapter, but for now, take my word that you need to declare your new
exception, you have to use similar syntax to this:
class MyAwesomeException(Exception):

This is telling Python, “I’m making a new class called MyAwesomeException, but, here’s the thing,
MyAwesomeException is an Exception.”
Also, if you have a constructor, make sure you do this:
class MyAwesomeException(Exception):

def __init__(self, *args):
print("In my constructor")
print("Doing whatever it is I have to do here")
super().__init__(*args)

Because MyAwesomeException is an Exception, suddenly we have two constructors: one for
Exception and one for MyAwesomeException.
The one in MyAwesomeException overrides the one in Exception. In order to make sure both are called,
we add that super() line in there.
Don’t worry about the details of how it works for now. We’ll cover that in detail in another chapter.
One final note: if you ever catch Exception: in your code, make sure that catch is after all the
more specific exceptions, like ValueException. Python will use the first one it finds that matches, and
Exception matches most everything.
But in the meantime, we can construct exceptions. But so what? What can we do with them?

### 14.14 Raising Exceptions
Let’s say you’ve written some code and you want to use exceptions to notify the caller when some error
condition has occurred.

The process is going to be:
1. Construct a new exception of some kind.
## 2. Raise it with the raise statement.
Often these happen in the same line.

As an example, let’s write a function that reads a number between 0 and 9 from the keyboard. If the number
read is out of range, let’s raise a new ValueError with the message "out of range" as the argument.
def getnum():
n = input("Enter a number 0-9: ")
n = int(n)

if n < 0 or n > 9:
raise ValueError("out of range")
return n

And then add some code to call it and catch any exceptions:
n = getnum()
print(f'{n} * 15 == {n * 15}')
except ValueError as v:
print(f'Exception: {v}')

If we give it a run with a valid value:
Enter a number 0-9: 4
4 * 15 == 60

But if we specify something out of range, we get:
Enter a number 0-9: -1
Exception: out of range

What if we enter the letter a? That’ll bomb out on the call to int()… but it’ll do it with a ValueError,
like we saw earlier in the chapter.
And, hey! Coincidentally, we’re already catching ValueError in our code, above.
Let’s try it:
Enter a number 0-9: a
Exception: invalid literal for int() with base 10: 'a'

Caught it! Note that the error message is different than the “out of range” exception, so we can differentiate.
So, hey! We now know how to:
- Catch exceptions
- Create new exceptions
- Raise exceptions
That’s not bad so far!

### 14.15 Re-raising Exceptions

### 14.15 Re-raising Exceptions
Sometimes you might be interested in seeing that an exception occurred, but don’t want to stop it. You
want it to continue to propagate so that the caller can also see it.
We can do this pretty simply with a lone raise inside the catch.
The following function notes a ValueError if it occurs, but then re-raises it so that it can get caught by
the try block in the main code:
def makeint(x):
return int(x)
print("Hey, I saw an exception!")
print("But I'll let someone else handle it.")
raise

x = makeint("beej")
except ValueError as v:
print(f'Exception: {v}')

This outputs:
Hey, I saw an exception!
But I'll let someone else handle it.
Exception: invalid literal for int() with base 10: 'beej'

### 14.16 Project Implementation
Go ahead and review the project specification from the beginning of the chapter if you have to.
The big challenge here is how do we provide complete error checking of all user inputs to make sure
everything is sensible?
What are all the things that could go wrong?
Go ahead and make a list on your own, and then you can compare it to the list I have, below.
Spoilers ahead!
Here’s what I can think of happening:
- User doesn’t enter the correct number of command-line arguments.
- User enters a non-number for the second command-line argument.
- User enters a filename that doesn’t exist.
- User enters a non-positive number.
- The file isn’t a regular file (e.g. it’s a directory or other special file).
- The user doesn’t have permission to read the file.
- User enters a number that’s larger than the number of lines in the file.
Some of these you can handle with simple if statements. Others we’ll have to catch with exceptions.
That last one, about what happens when you enter a number larger than the number of lines in the file, is
a great question. The spec doesn’t say. So we should ask the creator of the spec for clarification.

“Hey, Beej! The spec doesn’t say what to do if the number of lines specified is greater than the number of
lines in the file. What do we do in that case?”
Let’s do this: we’ll stop outputting lines at either the number of lines the user specifies or the end of the
file, whichever comes first. No message to the user is required in either case.
Ok, let’s plan!
Looking at the spec, the program can be broken down into a number of parts.
- Read user input
- Open the file for reading
- Read the number of lines up to what the user-specified (or EOF)
For each of those parts, we’ll have to do input validation and tell the user if anything went wrong.
Some of this stuff we’ve seen before, so we’ll skim over it a bit.
First, let’s get the user input from the command line, check that the right number of arguments was passed,
and check the input to make sure it’s sensible.
if len(sys.argv) != 3:
print("usage: head.py filename count")
sys.exit(1)
filename = sys.argv[1]
if total_count < 1:

That’s partway there, but we’re missing an error case. Do you see it?
What if the user enters “bananas” for the count? If we try to run it to see what happens, sure enough, we
get an exception.
File "foo.py", line 8, in <module>
ValueError: invalid literal for int() with base 10: 'bananas'

It’s the ValueError exception that we’ve seen before. Let’s modify our code to catch that exception and
handle it.
if len(sys.argv) != 3:
print("usage: head.py filename count")
sys.exit(1)
filename = sys.argv[1]

### 14.16 Project Implementation

if total_count < 1:

There! That fixes it. And that code works, but…
Notice anything messy about it? That’s right—we sure are repeating ourselves a lot. Let’s refactor and
see if we can get rid of those duplicate lines.
One option would be to set a flag in either case to True if there was an error, and then print the message
and exit. That would work, and wouldn’t be a bad solution at all.
But we can be a bit more clever and actually make the exception handler do all the work for us by simply
raising a ValueError exception if the total_count is less than one. Then we’ll get a ValueError in
both cases, and we can handle it in one place.
if total_count < 1:
raise ValueError()

Check that out. If int() raises the exception, we catch it. And if we raise the exception ourselves, we
also catch it. Plus all the logic for testing the input value for correctness is all in the same try block,
nicely.
OK! We have the code getting the correct input. Let’s go on to the next step and print lines from the file.
We can start by simplifying the problem to just print all the lines and not worrying about the count for
now.
Let’s take our code from before for printing out a file:

If we run the program, passing in an existing file, we see all the lines of that file printed out.
But what if we pass in the name of a non-existent file?
$ python head.py nosuchfile.txt 5
File "foo.py", line 19, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'nosuchfile.txt'

Bammo! Another exception! This time it’s FileNotFoundError.
Let’s try it on a directory:

$ python head.py / 5
File "foo.py", line 19, in <module>
IsADirectoryError: [Errno 21] Is a directory: '/'

An IsADirectoryError exception!
Let’s try it on a file we don’t have permission to read:
$ python head.py noperm.txt 5
File "foo.py", line 19, in <module>
PermissionError: [Errno 13] Permission denied: 'noperm.txt'

Yet another exception: PermissionError.
One option we have here is to specifically catch all these exceptions:
except (FileNotFoundError, IsADirectoryError, PermissionError):
print(f'head.py: error reading file {filename}')

And that works.
But I have a bit of insider knowledge that we can use. All of those exceptions are derived from IOError.
We can see that in the list of built-in exceptions5 .
You can see, there are a lot of exceptions that are IOErrors. Instead of catching them individually, an
option is to just catch IOError and print out an appropriate error message. This has the benefit of catching
all those errors that file() might raise. It also has the drawback of not being able to easily differentiate
between them. So how can we print an appropriate error for each one?
Luckily, IOError has a handy attribute in it called strerror that gives a nice human-readable error
message that describes what went wrong. We could print that.
So let’s just catch the IOError exception and print its error message out.
except IOError as e:
print(f'head.py: {filename} {e.strerror}')

And when we run it, we get some nice error message for whatever error case we get:
$ python head.py noperm.txt 5
head.py: noperm.txt Permission denied
$ python head.py / 5
head.py: / Is a directory

### 14.17 Exercises

$ python head.py nofile.txt 5
head.py: nofile.txt No such file or directory

Pretty neat!
What’s left? Oh yeah—we have to actually implement the functionality to only show the first howevermany lines of the file.
There are a couple of approaches to this.
One, we could use a while loop and test for the end of the file or reaching the required count, whichever
comes first.
That would be fine. But a more straightforward option might be to just jump out of the loop when the
counter gets high enough. The break statement can be used to bail out of a loop partway through.
line_count = 0

line_count += 1
if line_count > total_count:
break
except IOError as e:
print(f'head.py: {filename} {e.strerror}')

As you see, we’re keeping track of the number of lines read so far, and if that exceeds our magic target
number, we just break straight out of the loop and we’re done.
And it works!
$ python head.py rocks.txt 3
marble
coal
granite

Super-robust against bad input and errors. This is what we call defensive coding, when you prepare for
the worst and handle those cases without crashing. It’s a good strategy because not only does it make your
program more capable of handling errors, but it also makes you stop and consider what the errors are that
might occur in the first place. And, as we’ve said, hours of debugging can save you minutes of planning.
(Solution6 .)

### 14.17 Exercises
## 1. When we run this code, it prints out “Exception” instead of “Division by Zero”. Why? What can
we do, without deleting any code, to get it to print “Division by zero”?
x = 3490 / 0
except Exception:

https://beej.us/guide/bgpython/source/examples/head.py

print("Exception")
except ZeroDivisionError:
print("Division by Zero")

(Solution7 .)
2. Write a function that takes a list of numbers, and two integers as index values. The function should
return the sum of the two numbers in the list at the two given indexes.
Catch the specific exception that is raised if the list indexes are out of range. Print an appropriate
error.
Hint: to see which exception is raised if the list indexes are out of range, run the code without a
try-except block and see what it prints when it bombs. Then add a try-except for that exception.

## 3. Write a function that accepts a list of three numbers and returns the sum. If the list does not contain
three numbers, raise a InvalidListSize exception. (Note that this exception doesn’t exist—you’ll
have to write it.)
Also write an exception handler that catches the exception if it is thrown.
(Solution9 .)

### 14.18 Summary
A new big concept in this chapter with exceptions. It’s a technique we haven’t used it before to catch
errors, but is a powerful one to add to your skillset.
We compared and contrasted error handling via return values with error handling with exceptions, writing
programs that could catch exceptions and handle them, and also wrote programs that generate our own,
new exceptions.
Additionally, we learned how flow control works around exception handling, with the else and finally
clauses.
Any time you learn a new basic way of doing something, it’s difficult to wrap your head around at first.
But enough practice with it, and I guarantee after a while it will become second nature.

https://beej.us/guide/bgpython/source/examples/ex_catchorder.py
https://beej.us/guide/bgpython/source/examples/ex_listadd2.py
https://beej.us/guide/bgpython/source/examples/ex_listadd.py

Chapter 15

## Appendix A: Basic Math for
Programmers
I know what you’re thinking: screw this.
Or maybe your language is even more blue.
But bear with me for just a moment. Knowing a few basic mathematical operations can really help you
be a better developer, as well as help you understand code that you come across.
This section isn’t so much about application of these functions, but is more about their definition. It’ll be
up to you to use them as you see fit.
It’s a short one—just plow through it.
Fun Math Fact: Math is cool.

### 15.1 Arithmetic
Addition, subtraction, multiplication, and—don’t fall asleep on me already—division. The Big Four of
grade school math.
And, as a quick terminology summary:
- The addition of two numbers produces a sum.
- The subtraction of two numbers produces a difference.
- The multiplication of two numbers produces a product.
- The division of two numbers produces a quotient (and potentially a remainder.)
I’m not going to talk about what the operators do, and will presume you remember that from howevermany years ago.
But I do want to talk about which comes first, because you might have forgotten.
What do I mean by that?
Take this expression: 1 + 2 × 3
If we first add 1 + 2, we get 3. And then we multiply it by 3 and we get the answer of 9.
But wait! If we first multiply 2 × 3 and get 6, then we add 1 we get an answer of 7!
So… which is it? 9 or 7?
What we need to know is the order of operations or the precedence of one operator over another. Which
happens first, + or ×?
For arithmetic, here is the rule: do all the multiplications and divisions before any additions and subtractions.

So: 1 + 2 × 3 = 7

We’ll revisit order of operations as we continue on.
In Python, we can just use the operators +, -, *, and / for addition, subtraction, multiplication, and division,
respectively.

### 15.2 Division in Python
Hey—didn’t we just talk about this?
Yes, kinda. There are a few details that are of interest.
Let’s divide!
print(3 / 2)

What we’ve done there is a floating point division. That is, it produces a floating point result with a
decimal point. Indeed, even this does the same:
print(2 / 1)

So that’s the “normal” way of division, right? No big surprises there.
But what if I told you there is no spoon1 ?
Okay, that’s a bit much. Never mind that analogy.
But there is another kind of division, one that produces an integer result only. Integer division uses the //
operator (two slashes instead of just one). It returns an integer result in all cases, even if normally there
would be a fraction.
It does this by simply dropping the part after the decimal point like a hot potato.
print(9 / 5)
print(9 // 5)

When you want an integer quotient, this is the fast way to do it.

### 15.3 Modulo, AKA Remainder
So when you do an integer division, it just cuts off the fractional part after the decimal point. What happens
to it? Where does it go? If a tree falls in the forest and no one is around to hear it…?
Well, it’s gone forever, but there’s a way to see what it would have been in the form of a remainder.
The remainder tells us how much is “left over” after the integer division has taken place.
In the following examples, we’ll use ÷ to represent integer division.
For example, if we take 40 and divide it into 4 parts, 40 ÷ 4, we get a result of 10, exactly. Because it’s
exact, there are no leftovers. So the remainder is zero.
But if we take 42 and divide it into 4 parts… well, 42 ÷ 4 = 10 still. But it’s not exact. If we do the
inverse and multiply 10 × 4, we only get 40, not 42. There are 2 left over. The remainder is 2!
We do this with the modulo operator, or mod for short.

42 ÷ 4 = 10
42 mod 4 = 2 The remainder!
And in Python, the % operator is the modulo operator.

https://www.youtube.com/watch?v=XO0pcWxcROI

### 15.4 Negative numbers

print(42 // 4)
print(42 % 4)

Mod has the neat property of rolling numbers over “odometer style” because the result of the mod can
never be larger than the divisor.
As an example:
for i in range(10):
print(i % 4)

outputs:

### 15.4 Negative numbers
I’m not going to talk much about these here, but negative numbers are numbers less than 0, and they’re
indicated by a minus sign in front of the number. −7 means “7 less than zero”.
And I know that’s a crazy concept. Like how can you have −12 apples on the table? It doesn’t seem
particularly rooted in reality.
But a closer to home example might be me saying, “I owe you $-35!” which means, in effect, you owe
me $35!
Remember some simple rules:
If you multiply a negative number by a negative number, the result is positive.

−3 × −7 = 21
If you multiply a negative number by a positive number, the result is negative.

−3 × 7 = −21
If you add a negative number to a positive number, it’s just like subtracting the negative number from the
positive number:

−7 + 100 = 93
or, equivalently:

100 + (−7) = 100 − 7 = 93

### 15.5 Absolute Value
Think of this as how far from zero on the number line any number is.
10 is 10 away from zero. The absolute value of 10 is 10.
2.8 is 2.8 away from zero. The absolute value of 2.8 is 2.8.
Well, that seems a bit bland. Why bother?

Here’s why:

-17 is 17 away from zero. The absolute value of -17 is 17.
The rules are:
- The absolute value of a positive number is itself.
- The absolute value of a negative number is its negation, the positive version of itself.
In summary, if it’s negative, the absolute value makes it positive.
In mathematical notation, we represent the absolute value with vertical bars:

𝑥 = −17 If 𝑥 is −17…
|𝑥| = 17 …the absolute value of 𝑥 is 17.
|12| = 12 The absolute value of 12 is 12.
| − 13.8| = 13.8 The absolute value of −13.8 is 13.8.
In Python we compute absolute value with the abs() built-in function:
print(abs(-17)) # 17
print(abs(28.2)) # 28.2

In terms of precedence, you can think of absolute value kind of like parentheses. Do the stuff inside the
absolute value first, then take the absolute value of the result.

### 15.6 The Power of Exponents
Let’s say you wanted to multiply the number 7 by itself, say, 8 times. We could write this:

7×7×7×7×7×7×7×7
I guess that’s not entirely awful.
So let’s go all out. I want to multiply 7 by itself 3490 times. I’m going to head to the pub while you work
on that. Let me know when you’re done.
Luckily for you, mathematicians are lazy. They hate writing more than they have to, so they invent new
notations out of thin air to avoid the extra work. Just like how I keep packing the kitchen trash down so I
don’t have to run it outside.
Actually, no, it’s not really like that at all2 .
So what they invented is another way of saying “3490 7s multiplied by each other” that didn’t involve an
endless line of 7s and ×s. And it looks like this:

73490 (read “7 to the 3490th power”)
That means 3490 7s multiplied together. We call this raising to a power or exponentiation.
Or, put another way:

78 = 7 × 7 × 7 × 7 × 7 × 7 × 7 × 7
We have all kinds of fun facts! Ready?
In the example 78 , the number 7 is what we call the base and the number 8 we call the exponent.
If you want to write that code in Python, you’d write:
print(7**8)

The exponent must be non-negative, so zero or larger.

Apart from the lazy factor, that is.

### 15.7 Parentheses

But wait—zero? How do you multiply a number by itself zero times? It’s a valid question, and one that
has baffled philosophers for time immemorial. But not mathematicians! Like power-crazed numerical
dictators, they cried, “We made this up, and we declare that anything to the zeroth power is 1. End of
story!”
So there we have it. 𝑛0 = 1 for all 𝑛.
But their unquenchable thirst for power didn’t end there. Mathematicians also decided that there was such
a thing as negative exponents.
If you have a negative exponent, you need to invert the fraction before applying the exponent. The following is true:

−3

=( )
−8

( )

=( )

And in case you’re wondering how to raise a fraction to an exponent, you just apply the exponent to the
numerator and denominator:

48 65536
( ) = 8=
6561
We also have some shorthand names for certain exponents.

𝑛2 we say “𝑛 squared”. Anything raised to the power of 2 is that number squared.
𝑛3 we say “𝑛 cubed”. Anything raised to the third power is that number cubed.
In casual writing, you’ll often see the caret character ^ used to indicate an exponent. So if someone writes
14^4, that’s the same as 144 .
Lastly, precedence. We know that multiplication and division happen before addition and subtraction, but
what about exponentiation?
Here’s the rule: exponentiation happens before arithmetic.
With 2 + 34 , we first compute 34 = 81, then add 2 for a total of 83.

### 15.7 Parentheses
So what if you want to change the order of operations, like some kind of mathematical rebel?
What if you have 1 + 23 and you want 1 + 2 to happen before the exponentiation?
You can use parentheses to indicate that operation should occur first, like this:

(1 + 2)3
With that, we first compute 1 + 2 = 3, and then we raise that to the 3rd power for a result of 27.
You could also do this:

2(3+4)
Remember: parentheses first! 3 + 4 = 7, so we want to compute 27 which is 128. (Good software
developers have all the powers of 2 memorized up through 216 . Well, crazy ones do, anyway.)
Python uses parentheses, as well. The above expression could be written in Python like this:
2**(3+4)

Easy peasy.

One final note: if an exponent is a long expression without parentheses, it turns out the parentheses are
implied. The following equation is true:

2(3+4) = 23+4

### 15.8 Square root
Square root is a funny one. It’s the opposite of squaring, which if you remember from the earlier section
means raising to a power of 2. But, again, square root is the opposite of that.
It’s asking the question, “For a given number, which number do I have to multiply by itself to get that
number?”
Let’s examplify!
But before we do, the weird lightning bolt line thing is the mathematical symbol for the square root of a
number.
Let’s ask for the square root of 9:

9=?

That’s asking, what number multiplied by itself makes 9? Or, in other words, what number raised to the
2nd power makes 9? Or, in other words, what number squared makes 9?
Hopefully by now you’ve determined that:

3×3=9
and, equivalently:

32 = 9
so therefore:

9=3

What about some other ones?

16 = ? 25 = ? 36 = ? 12180100 = ?

Note that all of those have integer answers. If the square root of number is an integer, we call that number
a perfect square. 16, 25, 36… these are all perfect squares.
But you can take the square root of any number.

17 = 4.123105625617661 approximately.

17 is not a perfect square, since it doesn’t have an integer result.
Now, you might be imagining what would happen if you tried to take the square root of a negative number:

−100 = ?

After a bit of thought, you might realize that no number multiplied by itself can ever result in −100 so…
what can you do?
You might think, “We’re doomed,” but not mathematicians! They simply defined:

−1 = 𝑖

and invented an entire mathematical system around what they called imaginary numbers3 that actually
have some amazing applications. But that’s something you can look up on your own.
In addition to square roots, there are also cube roots. This is asking, “What number cubed results in this
number?” This is indicated by a small 3 above the root symbol:

27 = 𝑥

which is the inverse of the equation:

https://en.wikipedia.org/wiki/Imaginary_number

### 15.9 Factorial

𝑥3 = 27
Can you figure out what 𝑥 is?
What about how to do this in Python?
For square roots, the preferred way is to use the sqrt() function in the math module that you import:
print(math.sqrt(12180100))

What about cube roots? Well, for that, we’re going to jump back to exponents and learn a little secret.
You can raise numbers to fractional powers. Now, there are a lot of rules around this, but the short of it is
that these equations are true:

𝑥 = 𝑥2

𝑥 = 𝑥3

𝑥 = 𝑥4

and so on. Raising a number to the 13 power is the same as taking the cube root!
Like if we wanted to compute the cube root of 4913, we could compute:

4913 = 4913 3 = 17

And you can do that in Python with the regular exponent operator **:
print(4913**(1/3))

Hey—wait a second, that’s not 17! What gives?
Well, turns out that floating point numbers in computers aren’t exact. They’re close, but not exact. It’s
something developers need to be aware of and either live with or work around.
Lastly, because square root, cube root, and all the other roots are just exponents in disguise, they have the
same precedence as exponents: they happen before arithmetic.

### 15.9 Factorial
Factorial is a fun function.
Basically if I ask for something like “5 factorial”, that means that I want to know the answer when we
multiply 5 by all integers less than 5, down to 1.
So I’d want to know:

5×4×3×2×1
the answer to which is 120.
But writing “factorial” is kind of clunky, so we have special notation for it: the exclamation point: !. “5
factorial” is written 5!.
Another example:

6! = 6 × 5 × 4 × 3 × 2 × 1 = 720
As you can imagine, factorial grows very quickly.

40! = 815915283247897734345611269596115894272000000000
In Python, you can compute factorial by using the factorial() function in the math module.
print(math.factorial(10))

Factorial, being multiplication in disguise, has the same precedence as multiplication. You do it before
addition and subtraction.

### 15.10 Scientific notation
For really large floating point numbers, you might see things like this appear:
print(2.7**100)

What’s that e+43 at the end?
This is what we call scientific notation. It’s a shorthand way of writing really large (or small) numbers.
The number above, 1.3689147905858927e+43, is saying this, mathematically:

1.3689147905858927 × 1043
Now, 1043 is a big number. So multiplying 1.3689 etc. by it results in a very large number, indeed.
But that’s not all. We can use it to represent very small numbers, too.
print(3.6/5000000000000000000)

7.2e-19 means:

7.2 × 10−19
And 10−19 is a very small number (very close to 0—remember that 10−19 = 10119 ), so multiplying 7.2
by it results in a very small number as well.
Remember this:
- If you see e-something at the end, it’s a very small number (close to 0).
- If you see e+something at the end, it’s a very large number (far from 0).

### 15.11 Logarithms
Hang on, because things are about to get weird.
Well, not too weird, but pretty weird.
Logarithms, or logs for short, are kind of the opposite of exponents.
But not opposite in the same way square roots are opposite.
That’s convenient, right?
With logs, we say “log base x of y”. For example, “log base 2 of 32”, which is written like this:
log2 32
What that is asking is “2 to the what power is 32?” Or, in math:
These are both true:

𝑥 = log2 32
2𝑥 = 32
So what’s the answer? Some trial and error might lead you to realize that 25 = 32, so therefore:

𝑥 = log2 32 = 5
There are three common bases that you see for logs, though the base can be any number: 2, 10, and 𝑒.
Base 2 is super common in programming. In fact, it’s so common that if you ever see someone write log 𝑛
in a computing context, you should assume they mean log2 𝑛.

### 15.12 Rounding

𝑒 is the base of the natural logarithm4 , common in math, and uncommon in computing.
So what are they good for?
A common place you see logarithms in programming is when using Big-O notation to indicate computational complexity5 .
To compute the log of a number in Python, use the log() function in the math module. You specify the
base as the second argument. (If unspecified, it computes the natural log, base 𝑒.)
For example, to compute log2 999:
print(math.log(999, 2))

The big thing to remember there is that as a number gets large, the log of the number remains small. Here
are some examples:
x

log2 x

100
1000
10000
100000
1000000
10000000

0.0000
3.3219
6.6439
9.9658
13.2877
16.6096
19.9316
23.2535

The log-base-2 of a big number tends to be a much smaller number.

### 15.12 Rounding
When we round a number, we are looking for the nearest number of a certain number of decimal places,
dropping all the decimal places smaller than that.
By default, we mean zero decimal places, i.e. we want to round to the nearest whole number.
So if I said, “Round 2.3 to the nearest whole number,” you’d answer “2”, because that’s the closest whole
number to 2.3.
And if I said, “Round 2.8 to the nearest whole number,” you’d answer “3”, because that’s the closest whole
number to 2.8.
When we round to a higher number, we call that rounding up.
The other direction is rounding down.
But what if I said “Round 2.5 to the nearest whole number?” It’s perfectly between 2 and 3! In those
cases, conventionally, lots of us learned to round up. So the answer would be 3.
We can also force a number to round a certain direction by declaring which way to round.
“Divide x by 3, then round up.”
In Python, we have a few options for rounding.
We can use the built-in round() function.

https://en.wikipedia.org/wiki/Natural_logarithm
https://en.wikipedia.org/wiki/Big_O_notation

But it behaves a little bit differently than we might be used to. Notably, numbers like 1.5, 2.5, and 3.5
that are equally close to two whole numbers always round to the nearest even number. This is commonly
known as round half to even or banker’s rounding.
round(2.8) # 3
round(-2.2) # -2
round(-2.8) # -3
round(1.5)
round(2.5)
round(3.5)

You can also tell round() how many decimal places you want to round to:
round(3.1415926, 4)

Note that Python has additional weird rounding behavior6 due to the limited precision of floating point
numbers.
For always rounding up or down, use the functions ceil() and floor() from the math module.
ceil() returns the next integer greater than this number, and floor() returns the previous integer smaller

than this number.
This makes perfect sense for positive numbers:
math.ceil(2.1)
math.ceil(2.9)
math.ceil(3.0)
math.ceil(3.1)

math.floor(2.1)
math.floor(2.9)
math.floor(3.0)
math.floor(3.1)

But with negative numbers, it behaves differently than you might expect:
round(2.3)
math.floor(2.3)

round(-2.3)
math.floor(-2.3)

round(2.8)
math.ceil(2.8)

round(-2.8)
math.ceil(-2.8)

While round() heads to the nearest integer, floor() goes to the next smallest integer. With negative
numbers, that’s the next one farther away from zero. And the reverse is true for ceil().

https://docs.python.org/3/tutorial/floatingpoint.html#tut-fp-issues

### 15.13 Large Numbers

If you want a round up function that works on positive and negative numbers, you could write a helper
function like this:
def round_up(x):
return math.ceil(x) if x >=0 else math.floor(x)
round_up(2.0)
round_up(2.1)
round_up(2.8)

round_up(-2.0)
round_up(-2.1)
round_up(-2.8)

I’ll leave round_down() as an exercise. :)
If you want to always round up to the next whole number instead of doing banker’s rounding, you can use
this trick: add 0.5 to the number and then convert it to an int(). (If the number is negative, subtract 0.5
from it.)
int(0.5 + 0.5)
int(1.5 + 0.5)
int(2.5 + 0.5)

int(2.8 + 0.5)
int(2.2 + 0.5)

int(-2.2 - 0.5) # -2
int(-2.8 - 0.5) # -3

### 15.13 Large Numbers
Python is really good with large integer numbers. In fact, it has what we call arbitrary precision integer
math. That means we can hold numbers as big as memory can handle, which is large.
So if you ask Python to compute 100000!, it will do it. The result, incidentally, is 465,575 digits long. No
problem.
But the same is not true for floating point numbers (numbers with a decimal point). Python generally uses
64 bits to represent floating point numbers, which means there’s a limit to the amount of precision—you
can only have 16 digits in your number, though you can raise that number to huge positive or negative
powers to get very large or very small numbers.
Floating point is brilliant because it can represent really huge and really small numbers, but the number
of digits you have at your disposal is limited.

Chapter 16
