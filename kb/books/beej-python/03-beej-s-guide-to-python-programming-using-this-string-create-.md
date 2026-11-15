---
id: beej-python-03
title: "Beej's Guide to Python Programming — Using this string, create a copy of it where all the vowels are…",
slug: beej-python-03-beej-s-guide-to-python-programming-using-this-string-create-
source: "Beej's Guide to Python Programming",
sourceSection: "3. Using this string, create a copy of it where all the vowels are uppercase and all the consonants are"
track: data-scripting,
tier: free
tags: [python, programming, scripting]
summary: "Hint: think like a human. Covers Using this string, create a copy of it where all the vowels are uppercase and all the consonants are.",
---
# Beej's Guide to Python Programming — Using this string, create a copy of it where all the vowels are…

## 3. Using this string, create a copy of it where all the vowels are uppercase and all the consonants are
lowercase.
s = "The quick brown fox jumps over the lazy dogs."

Hint: think like a human. If you had a physical set of blocks with letters on them in front of you,
what would be the process and steps for building a new string with the required changes?
(Solution9 .)
4. Allow the user to input a string, and also a number. Print out the character at that index number in
the string. Don’t allow the user to enter a number that’s out of range.
(After you solve this, check out the solution10 for a twist on checking for valid input.)
5. Allow the user to input a string, and also two numbers. Print out the slice from those index numbers
in the string. Don’t allow the user to enter numbers that are out of range.
(In the solution11 , there’s duplicated code to enter two numbers. Later, when we get to functions,
we’ll learn how to remove this duplicated code.)
6. Makeup two more exercises and code them up.

### 7.17 Summary
In this chapter, we did all kinds of crazy things with strings.
- Conversions from other types
- How to concatenate strings with +
- How to get characters and slices out of a string
- How for loops process strings
- Learned a bunch of string methods and functions
- Formatted output with F-strings
Coming up, we’re going to learn even more built-in data types that we can use. After that, we’ll talk about
functions, and then you’ll be dangerously close to being able to write real programs!

https://beej.us/guide/bgpython/source/examples/ex_goatcount.py
https://beej.us/guide/bgpython/source/examples/ex_uppervowel.py
https://beej.us/guide/bgpython/source/examples/ex_charat.py
https://beej.us/guide/bgpython/source/examples/ex_sliceat.py

Chapter 8

Lists
8.1 Objective
- Understand what lists are
- Understand how assignments with mutable types work
- Access individual elements and slices in a list
- Iterate over lists with for
- Use common lists built-in functions
- Construct new empty lists of repeating fixed values
- Construct new lists with list comprehensions
- Construct and use lists of lists (2D lists)

### 8.2 Chapter Project Specification
Game time!
Allow the user to navigate a maze by entering directions to move (n, s, w, or e). They can also enter q to
quit.
The maze should look like this, with . representing a space the player can move into, and # representing
a wall. An @ symbol indicates the player’s current position.
Every move, the map should be displayed:
Enter a move (n,s,w,e,q):

Keep this project in mind as you read through the chapter.

### 8.3 What Are Lists?
Remember how regular variables hold one thing? Well, lists are variables that can hold a lot of things.

Fun Lists Fact: Most other languages have a different name for lists: they call them “arrays”.
Same thing.
But wait—if a list can hold a lot of things, how do we differentiate? How do I tell Python that I want the
second thing in the list? Or the fifth thing?
Luckily it’s easy enough; we just have to specify the index into the list that holds the thing we want.
Think of it as a row of postboxes, numbered starting from 0, then 1, then 2, and going on up to however
many postboxes we have. Each postbox can hold a thing, and you can refer to it by giving the postbox
number.
Let’s take a look at a simple example:
x = [10, 3, 7, 9]

There’s a list. We know it’s a list because of the square brackets around it. It’s a list of four integers.
Let’s print out the zeroth element in the list. We do this by using square brackets after the list variable
name and giving the index inside those brackets. Does this look familiar? It’s the same syntax we used to
get individual characters out of strings!
print(x[0])

and the element at index 2:
print(x[2])

Do you remember that strings had a cool trick where you could use a negative index to refer to characters
from the end of the string? We can do the same thing with lists!
print(x[-1])

Remember that indexes start at zero, again, just like with strings.
Keeping with the “things you can also do with strings” theme, you can also slice an array, just like a string.
a = [1, 2, 3, 4, 5]
b = a[1:-1]
print(b)

You can also set individual elements, leaving the rest of the list unchanged:
print(x[1])

This brings us to a stark difference between lists and strings: lists are mutable. You can change individual
elements inside the list without creating a new list! Remember with strings, you couldn’t change them—
you could only make new ones.
It’s such a key difference, we’re going to talk about it in detail now, and then again later. This is a big
source of confusion among new developers.

### 8.4 List Assignments
Do you remember way back in the variables chapter when I was talking about how variable assignment
worked? Revisit it if you have to.

### 8.4 List Assignments

And you were wondering what that had to do with anything?
Well, we’re going to check it out again, but this time in the context of lists.
We just mentioned that lists are different than integers in that lists are mutable. We can change them. This
has some interesting repercussions.
Let’s look at strings versus lists.

In that example, as we learned earlier, there is one string "Hello" in memory, and both x and y refer to
it.
Strings are immutable. So you can’t do something like this:
x[2] = "Z" # ERROR! Strings are immutable--you can't change them

But lists are mutable. We can change something that’s in a list. Let’s do an analogous example:
x = ["A", "B", "C", "D"]
x[2] = "Z" # Works
print(x[2])
print(y[2])

Wait—what happened there? We changed the value in the second index of x, but it also changed it in y!
How did that happen?
Remember: it’s because when we did:
x = ["A", "B", "C", "D"]

both x and y came to point to the same list. There is only one list. Both x and y refer to it. So if you
change that one list, you see that change reflected in both x and y.
(If you could change a string, it would work the same way. But you can’t because it’s immutable.)
Mutable types include the following (some of which we haven’t talked about yet):
- Lists
- Dictionaries
- Objects1
- Sets
In some languages, types that appear to get copied on assignment (like strings and integers) are
called value types. Whereas types that can be referred to by multiple variables through assignment
(like lists) are called reference types. Python doesn’t make this distinction, although you might
hear this phraseology used in the wild.
What if you want a copy of a list, and not just a copy of the reference? You can force a list copy a number
of ways, but these are three common ones:

Technically, lists and dictionaries are objects, so we’re being a bit redundant.

b = a.copy()
b = list(a)
b = a[:]

Even if you don’t have it quite down yet, don’t worry. We’ll hit this topic a few more times as we progress.

8.5

for and Lists—Powerful Stuff

Remember our good friend the for loop? We used it with range to loop a number of times, and we used
it with strings to loop over each character in the string.
We can also use it with lists2 to do things with each list element in order!
Here’s a simple example that prints all the elements in a list:
for i in x:
print(f"element is: {i}")

and this will output:
element is: 11
element is: 55
element is: 33
element is: 99

But wait, there’s more!
Recall from above that you can get the element out of a list if you know its index, for example, x[2].
Let’s put those together in another way to use for and lists. This example does the same thing as the one
above, just in a different way:
for i in range(4):
print(f"element is: {x[i]}")

Although that’s not idiomatic Python3 (the first example is better), it demonstrates how to use a variable
as the index. We refer to x[i] inside the loop, and then have i change to loop over every element’s index.
It’s irking me that we have that hard-coded 4 in the range(). It only works for lists of length 4. Let’s see
if we can fix it.
Sneak preview: you can get the number of elements in a list with len().
Let’s make the range() go up to “the length of the list” instead of to 4:
for i in range(len(x)):
print(f"element is: {x[i]}")

And now that works for lists of any length—much better!

Technically we can use it to iterate over anything that’s iterable, which is quite a number of things.
Idiomatic means “the standard, accepted way of doing a thing in a language”.

8.6. for and enumerate()

8.6

for and enumerate()

In the examples above, we used for with the elements in the list themselves, and also with range() over
the indexes of the elements in the list.
What if you want to do both at the same time? That is, you want the elements and you want the indexes?
A function that’s worthy of mention is enumerate(). It will iterate through each element in the list,
returning the element and its index. You can get them both at the same time!
for i, v in enumerate(x):
print(f"The element at index {i} has value {v}")

This results in:
The element at index 0 has value 11
The element at index 1 has value 55
The element at index 2 has value 33
The element at index 3 has value 99

### 8.7 Midterm: Doubling The Values
Let’s write some code that takes a list and goes through all the elements in that list. If an element is even,
we should multiply the value by 2. If it’s odd, we should do nothing with it.
For example, if the input list is:
[1, 2, 3, 4, 5, 6]

after processing and doubling all the even values, it will be:
[1, 4, 3, 8, 5, 12]

We know we need to iterate over the list, so that sounds like a job for a for-loop. And we need to test if
a number is even or odd, which sounds like a job for a if statement.
How can we tell if a number is odd?
There’s a very common way to do this. Divide by 2 and take the remainder. If the remainder is 1,
it’s odd. If it’s 0, it’s even.
Do you remember how to take the remainder in Python? With the modulo operator: %.
x = 12
if x % 2 == 0:
print("x is even!")
print("x is odd!")

So our plan is shaping up like this:

for each element in the list:
if that element is even:
double the value and store it at the same place in the list

Then maybe print it out at the end, just for fun.
Here’s each line of the plan’s pseudocode converted to Python4 :
x = [1, 2, 3, 4, 5, 6]
for i, v in enumerate(x):
if v % 2 == 0: # check if v is even
x[i] = v * 2

And the output:
[1, 4, 3, 8, 5, 12]

Voila! There it is!
Anything you could make better about this?
Instead of using enumerate(), you could have used for-range()-len() like we did in an earlier example. Would you have felt that produced cleaner code?
(Remember: coding is creative. There are a lot of solutions. It’s up to you as a dev to make informed
decisions about which methods you like more than others!)
One interesting thing to note is that on line 14, we just printed the entire list in one go. You can do that!
print() prints out the string version of whatever you pass in. More on that in the future.

### 8.8 Built-in Functions for Lists
There are several useful built-in functions and methods5 that you can use with lists. Some we’ve already
seen.
In the following table, the variable a represents a list.

len(a)
enumerate(a)
a.append(x)
a.clear()
a.copy()

Return the number of elements in the list
Iterate over index/value pairs in the list
Append variable x to the end of the list
Clear all elements from the list
Make a copy of the list

https://beej.us/guide/bgpython/source/examples/listdouble.py
Remember that a method is a function that you call on a particular object with the dot (.) operator.

### 8.8 Built-in Functions for Lists

a.count(v)
a.extend(b)
a.index(v)
a.insert(i,v)
a.pop()
a.pop(i)
a.reverse()
a.sort()

Count the number of occurrences of v in the list
Add elements of list b to end of list a
Return the first index of v in list a
Insert v in list a before index i
Remove and return the last element in a
Remove and return the element at index i in a
Reverse the elements in the list
Sort the list

Let’s just fire up the editor and start messing around with these to see how they work.
Here’s a program called listops.py6 that does just that. You should also experiment with variations of
these to get a feel for them:
a = [5, 2, 8, 4, 7, 4, 0, 9]
print(len(a))

a.append(100)

print(a.count(4))

print(a.index(4))

v = a.pop()
print(v)

a.reverse()

a.insert(2, 999)

b = [1, 2, 3]
a.extend(b)

a.sort()

a.clear()

In addition to those functions, the + operator will take two lists and concatenate them together into a third
list:

https://beej.us/guide/bgpython/source/examples/listops.py

b = [4, 5, 6]
c = a + b

Look at the amount of control we have over lists now! Not only can you read and write values at specific
list indexes, but you can add to the end, insert stuff in the middle, remove from the end, or from anywhere
within the list.
You are All Powerful!
Okay, maybe not, but at least you can do a thing or two with lists.

### 8.9 What Good Are They?
“So I can become some kind of list ninja. What good does that do me?”
When it comes to anything in programming, it’s often helpful to try to think of physical, actual real-life
examples. What are some of the lists you have in real life? You can use Python lists to store those.
Shopping lists, bowling scores, favorite rocks, employee names, numbers, etc., etc.
shopping_list = [
"spam",
"eggs",
"bacon",
"sausage",
"spam",
"spam"

Sometimes we know those lists upfront, and other times we compute them as we go.

### 8.10 Midterm Challenge
More math! [Groan!] Let’s compute the Fibonacci Sequence! [Yay!]
The Fibonacci Sequence is a famous mathematical sequence (a progression of related numbers) that runs
like this:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
Before I give it away, study it a bit—can you see the pattern?
Lots of times, the job of a dev is to find patterns in data so that you can write code that generates them.
Spoiler alert!
Each number is the sum of the previous two numbers.

0 + 1 = 1, 1 + 1 = 2, 1 + 2 = 3, etc.
But what about the first two numbers in the sequence
Those are given to be 0 and 1, no questions asked. This way you always have at least two previous
numbers to get the next one.
What we want to do is write a program that builds and prints a list containing the first 100 Fibonacci
numbers. We don’t want to do any of the addition ourselves—we want the code to compute it for us.

### 8.10 Midterm Challenge

Problem-solving step: Make A Plan.
We’re going to need a list to hold all the numbers.
We have the first two numbers (0 and 1), so we can put those in the list.
Then we have to look at the previous two numbers from the end, add them together, and then append the
sum to the end of the list.
And we have to do that 98 more times to get 100 numbers.
Doing something 98 times seems like a for-range() loop to me.
We can append with the .append() method.
We can get the last and previous-to-last elements in the list with negative list indexes.
initialize the list with [0, 1]
for 98 times:
compute the sum of the previous two numbers
append sum to the list
print the list

Time to code it up!
fiblist.py7 :
fib = [0, 1]
for _ in range(98):
s = fib[-1] + fib[-2]
fib.append(s)
print(fib)

And you’ll get some output that looks vaguely like this (I’ve rewrapped the output here—yours might not
be so pretty):
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418,
317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465,
14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296,
433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976,
7778742049, 12586269025, 20365011074, 32951280099, 53316291173,
86267571272, 139583862445, 225851433717, 365435296162, 591286729879,
956722026041, 1548008755920, 2504730781961, 4052739537881,
6557470319842, 10610209857723, 17167680177565, 27777890035288,
44945570212853, 72723460248141, 117669030460994, 190392490709135,
308061521170129, 498454011879264, 806515533049393, 1304969544928657,

https://beej.us/guide/bgpython/source/examples/fiblist.py

2111485077978050, 3416454622906707, 5527939700884757, 8944394323791464,
14472334024676221, 23416728348467685, 37889062373143906,
61305790721611591, 99194853094755497, 160500643816367088,
259695496911122585, 420196140727489673, 679891637638612258,
1100087778366101931, 1779979416004714189, 2880067194370816120,
4660046610375530309, 7540113804746346429, 12200160415121876738,
19740274219868223167, 31940434634990099905, 51680708854858323072,
83621143489848422977, 135301852344706746049, 218922995834555169026]

Notice how the list grows bigger and bigger with each step of the loop. If we were to print out the list for
every iteration of the loop, we’d see something like this:
[0, 1]
[0, 1, 1]
[0, 1, 1, 2]
[0, 1, 1, 2, 3]
[0, 1, 1, 2, 3, 5]
[0, 1, 1, 2, 3, 5, 8]
[0, 1, 1, 2, 3, 5, 8, 13]

and so on. We’re constructing the list as we go, building it from the previous elements8 .
Another thing I did in the for loop was use _ as the looping variable name. That’s a perfectly legitimate
variable name9 .
By convention, _ is used as a name when you don’t intend to use it elsewhere.
You must have a variable named in your for loop—no option not to. But using _ for that name indicates
to programmers that you are just using the loop to count, and you don’t actually care what the count is.

### 8.11 Building New Lists, Repeating and Empty
We’ve already seen how to initialize a list with a few elements in it:
a = [11, 55, 33, 99]

You can multiply a list by a constant value to get a new list repeated that many times.
What?
Easier demonstrated:
a = [11, 99]
b = a * 3
print(b) # [11, 99, 11, 99, 11, 99]

It just repeats the list that many times into a new list.
A very common use of this is to create a new list of a certain number of elements, initialize to zero:

We’re using a technique here generally called bottom-up dynamic programming. But that’s a story for another time. Probably
involving Fibonacci again.
Names can be made up of letters, digits, and underscores, as long as they don’t start with a digit.

### 8.12 List Comprehensions

a = [0] * 10

While we’re on about esoteric list declarations, you can declare a list of no elements like so”
a = []

presumably to compute values for later.

### 8.12 List Comprehensions
This is a really neat language feature of Python. It allows you to construct a new list from an old one,
modifying and filtering elements as you go.
Before going into the syntax, we’ll write something using what we know so far with for and if and see
how that looks. Then we’ll compare it to a list comprehension version.
I’m going to write some code that takes a list and produces a new list from it, not including all the odd
numbers, and replacing the even numbers with the even number times 4.
a = [1, 2, 3, 4, 5, 6]
new_list = []
for v in a:
if v % 2 == 0: # if v is even
new_list.append(v * 4)
print(new_list)

Study that until you’re sure you have it down.
Now, here’s that same program as a list comprehension:
a = [1, 2, 3, 4, 5, 6]
new_list = [v * 4 for v in a if v % 2 == 0]
print(new_list)

Well, it’s certainly more concise!
But it’s also, I’m suspecting you’re finding, a lot harder to read. Yeah.
It’s always like this when you try to pick up a new piece of weird syntax you’ve never seen before. At
first, it’s all weird, but the more you study it, the more used to it you get.
What I don’t want is for you to look at it and think, “It’s unreadable! Forget it!”
All you have to do is take it a step at a time.
What do we have in that line?
filter
|----| |--------| |-----------|
new_list = [v * 4 for v in a if v % 2 == 0]

It’s split into three parts.
The “result”: this is what values will be included in the output list. The variable named here is the one in
the “loop” clause.

The “loop”: assigns elements from the list into a variable, repeatedly.

The “filter” (optional): only elements for which the condition is true will be included in the output.
If we wanted to include only the odd numbers times 4, we could have done this:
filter
|----| |--------| |-----------|
new_list = [v * 4 for v in a if v % 2 == 1]

Or the odd numbers divided by 3:
filter
|----| |--------| |-----------|
new_list = [v / 3 for v in a if v % 2 == 1]

Leaving the filter off makes the list unconditionally. For example, all the numbers in the list times 4:
|----| |--------|
new_list = [v * 4 for v in a]

When should I use them?
Any time you’re making a new list from an existing one and you want to optionally change or filter
elements from the original list, list comprehensions are a great tool to us.

### 8.13 Lists of Lists
You can have lists of just about anything in Python. Lists of numbers, lists of strings, lists of lists…
That’s right, folks. Lists containing other lists. How does that work?
Here’s one example where we’ll make a bunch of lists, and then put them in another list.
x = [1, 2, 3]
y = [4, 5, 6]
z = [x, y]

It’s important to note that when we assign into z, we’re not copying lists x and y. What we’re
doing is making it so that the values in list z refer to the same lists as x and y do.
In other words, there’s only one list in memory with the values [1,2,3]. And is referred to by
both x and z[0]. Both variables reference the same list.
In that example, how could we access elements of the lists-in-list?
We’re going to use square bracket notation again, but even more so.
x = [1, 2, 3]
y = [4, 5, 6]
z = [x, y]
print(z[0]) # z[0] refers to x, so this prints [1, 2, 3]
print(z[1]) # z[1] refers to y, so this prints [4. 5. 6]

So far so good?

Here’s the thing to notice: since z[0] and z[1] are lists, you can access the elements within those lists
by using square bracket notation again.
Let’s try to get the number 6 out of that second list.
print(z[1][2]) # prints 6

Take apart that line of code. What’s happening there?
First Python evaluates the first square brackets it comes to. It knows z is a list, and so it evaluates z[1]
to get the list [4, 5, 6]. Then it takes that list and evaluates it with [2], getting the 6 out of it.
Another way to think of it would be to imagine using parentheses:
(z[1])[2] # first evaluate z[1], then evaluate [2] on the result
z[1][2]

(While Python doesn’t mind if you use parentheses like this, programmers don’t do it since it makes the
code look messy.)
But what does this buy us? Lists of lists are exciting and all. (Right?) What are they useful for?
Having a list of lists literally adds a second dimension to the data you can represent. With a single list,
you can represent one “row” of data. With a list of lists, you can represent multiple rows or a grid of data.
What are some places in computing a grid or multiple rows of data are used?
Spreadsheets! What else? See if any other ideas come to mind.
For declaring lists of lists, it’s really common to just declare them all at once, and not use an intermediate
variable to represent the sublists.
For example, the previous list we were using, above, could be declared more simply like so:
z = [
[1, 2, 3],
[4, 5, 6]

or, if it looks better and your style guide allows it, you can put it on one line:
z = [ [1, 2, 3], [4, 5, 6] ]
print(z[0][1])

Now let’s see if we can put it all together for this chapter’s project!

### 8.14 Chapter Project Implementation
This is the big one. This project is going to draw on multiple things we’ve learned so far and put them all
together into a working solution.
That makes this project more difficult than the previous ones. We’re going to break down the problem
and decide what tools we know that we can bring to bear to solve it.
And this is what being a software developer is all about.
I’m not expecting the answer to be obvious. You’ll rarely see a problem that has an obvious solution, even
as a seasoned developer. But we do have our problem-solving framework to break down the problem into
workable parts. So let’s do it!

We want to do several things with this project:
- Print a map on the screen
- Get user input
- Use the input to move a player indicator around the map
- Make sure the player doesn’t move through walls
- Keep repeating until the player quits
What’s missing from the spec that we need to know?
Remember your compass directions?
N
W --+-- E
S

Now’s the time to get the answers to questions clarified. Much easier to do it now than after you’ve coded
up the wrong thing!
What if the user provides invalid input? What happens then is missing from the spec. For that, let’s print
an error message:
Unknown command: {x}

Where x is whatever the user entered.
What if the player tries to move through a wall? Let’s use this error message:
You can't go that way.

Anything else missing from the spec?
Problem-solving step: Make A Plan.
We’re going to make use of two important techniques as we make this plan: simplify the problem and
breaking down subproblems.
Simplifying the problem means taking our eventual goal and remove requirements to make it easier to
code. Sure, eventually we’ll have to add those requirements back in, but simplifying the problem makes
the initial coding easier.
What are examples of things we can simplify about this project? Here are some ideas:
- Don’t bother putting the @ on the map where the player is
- Allow the player to move through walls
- Keep repeating forever, ignoring q
- Don’t validate user input
Again, we’ll have to add this eventually, but removing them temporarily makes it much easier to reach an
initial version.
The other technique, breaking down subproblems, is a variant of what we’ve been doing already.
Let’s start with high-level pseudocode, and then break it down where required.
print map and player indicator
get input
make sure input is valid
make sure we're not moving through walls

How do we know that breaking down subproblems will be useful with this pseudocode? The first clue is
that some of the steps are substantial, e.g. “print map and player indicator” immediately brings to mind
the question, “How the heck can we do that?”
If any steps are too complex or are unclear, it means you have to break them down further. Let’s do that
for all the unclear sections:
print map and player indicator
for each row of the map:
for each column of the map:
if this is where the player is:
print @
print the map character
get input
make sure input is valid
if input invalid:
print error message
elif input is "q":
quit
figure out the new row and column of the player
if the map at the new player position is "#":
print "You can't go that way."
set the current position to the new position

That’s significantly better. It’ll be a lot easier to translate to Python.
Now… how are we going to store the data we need for this project? And what data do we need, anyway?
- The map representation
- The player’s current position, row, and column
How are we going to store the map? In the spec, it’s displayed as text, like so:

where # is a wall and . is an empty floor (that we can move through).
We could store all that as a single string… but that might make our lives a little more difficult since we
have to put an @ in where the player is located.
And, because of that, we’re planning to print the map out a character at at a time so we can decide if we’re
going to draw an @ or the map character.
What would be a more sensible way to store the map rather than a single big string?

Ponder that for a second.
Spoiler alert!

How about a list of strings? One string would be one row of the map. Then we could go through the
single row a character at a time and decide what to print. (Remember we can use array bracket notation
on a string to get single characters out!)
Look at all the techniques we’re using!
- Variables to store player’s current row and column on the map
- A list of strings to store the map
- Iterating through a list with for
- Iterating through strings for for
- Nested for loops
- if conditions to decide what to do with user input
- if conditions to determine if we can move that direction
- Booleans and a while loop to run the game until the user quits
Holy moly! That’s a lot of stuff. But that’s what we do as software developers: we take all we know and
figure out how to put it together into the solution.
And it’s rarely an obvious one. We all have to work hard to come up with the answers.
Before we start this phase, I want you to notice how much time we’ve spent on the Understand and Plan
phases without writing any code at all. It’s very tempting, especially for junior devs, to want to jump into
the code without spending sufficient time on Understanding and Planning. Unfortunately, this practice
causes one to waste productivity unnecessarily.
You’re not done understanding the problem until you have no more questions about.
You’re not done making a plan until you know how to convert every step of the plan to code.
If you spend enough time understanding and planning, coding almost becomes an afterthought.
And here we are. Let’s take our pseudocode and convert it into Python.
Coming back to simplify the problem, let’s start by just storing and printing the map. No player, no input,
no loop. Let’s just get that working.
First of all, we need to store the map data, so let’s do that:

We’ve split the map list into multiple lines to make it easier to read.
Now we need to print it out. In our pseudocode, we used a nested for loop with if conditions.

for row in map_data: # for each row
for map_character in row: # for each col

There are a couple of things to note there, so make sure to digest the code. We’re going through each row,
and for each row, we’re going through each column and printing the character.
We want the characters to all print on the same line for a given row, so we use the end="" trick to keep
Python from going to the next line.
And at the end of each row, we have an empty print() to get the cursor down to the next line for starting
to print the next row.
And when we run that, we get the map printed out!
But we don’t have the player position stored anywhere, and we’re not showing it on the screen. Let’s add
that next.
player_row = 4
player_column = 9

for row_index, row in enumerate(map_data): # for each row
for col_index, map_character in enumerate(row): # for each col
if row_index == player_row and col_index == player_column:

print("@", end="") # end="" no newline

So there we’ve added a couple of variables to store where the player is, and then in the map printing loop,
we check to see if this location is where the player is. If it is, print an @, otherwise print the map character.
For the next small thing to add, let’s get user input and quit if the user enters “q”. Otherwise, we’ll print
the map again in a loop.
player_row = 4
player_column = 9
quit = False
for row_index, row in enumerate(map_data): # for each row
for col_index, map_character in enumerate(row): # for each col
if row_index == player_row and col_index == player_column:
print("@", end="") # end="" no newline
command = input("Enter a move (n,s,w,e,q): ")
if command == "q":
quit = True
continue # jump right back to the top of the while
print(f'Unknown command {command}')

Getting there!
Something new to note! There’s a continue statement on line 40. This causes program execution to

jump back to the top of the while loop, ignoring the rest of the loop body. It means, “Don’t do anything
else in this block—just short circuit back to the while condition. (Which tests to false immediately and
exits the loop.)
So now we have the player position being printed, and we have the user inputting a command. However,
we still need to handle the directional commands and actually move the player around.
We plan to compute the new position for the player based on the current position and the user input. For
example, if the user goes north (up) on the screen, the player’s column stays the same, but the row number
decreases by 1.
player_row = 4
player_column = 9
quit = False
for row_index, row in enumerate(map_data): # for each row
for col_index, map_character in enumerate(row): # for each col
if row_index == player_row and col_index == player_column:
print("@", end="") # end="" no newline
command = input("Enter a move (n,s,w,e,q): ")
if command == "n":
new_row = player_row - 1
new_column = player_column
elif command == "s":
new_row = player_row + 1
new_column = player_column
elif command == "w":
new_row = player_row

new_column = player_column - 1
elif command == "e":
new_row = player_row
new_column = player_column + 1
elif command == "q":
quit = True
continue # jump right back to the top of the while
print(f'Unknown command {command}')
player_row = new_row
player_column = new_column

That’s working great, but we can still walk through the walls. Let’s change those last few lines of the
program to verify that the new position is an empty room before we move the player in there. (Note the
line numbers!)
if map_data[new_row][new_column] != ".":
print("You can't move that way!")
player_row = new_row
player_column = new_column

Woo! You’ve written your very own Roguelike10 game!
For the next steps, consider adding some of the following:
- Treasures
- Monsters
- Stats
- Weapons
- Whatever you desire! It’s your game!
Just back to “Understand the Problem” and implement some of those things.
Also, the game looks neater if you clear the screen before printing the map, but unfortunately there’s no
easy way to do this in a cross-platform manner11 . But there is a hacky thing we can do.
If your terminal obeys ANSI escape codes12 , which is likely, we can send special sequences of characters
to it to clear the screen then home the cursor (move it to the top left).
The magical incantation looks like this:
print("\x1b[2J\x1b[H", end="")

Go ahead and tuck that up above where you start printing the map and you’ll see the effect. If your terminal
doesn’t support ANSI sequences, you’ll just see some weird characters. Bogus13 .
If you really want to get into character graphics, there’s a library you should try: curses14 . It allows you
to clear the screen, position the cursor, get input without echoing it to the screen or waiting for RETURN,
output in color, and more.

https://en.wikipedia.org/wiki/Roguelike
Well, not at this point in our learning, anyway.
https://en.wikipedia.org/wiki/ANSI_escape_code
https://www.youtube.com/watch?v=q3fx6TugN7g
https://docs.python.org/3/howto/curses.html

### 8.15 Exercises

Although we have enough knowledge to add monsters and treasure and so on, it will be easier to do so
once we learn about dictionaries and objects in future chapters. We have more tools at our disposal!
(Solution15 .)

### 8.15 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. The following code prints out 99:
b = a
b[0] = 99
print a[0]

How can we change only line 2 so that b is a copy of a, causing the program to print out 1 instead?
(Solution16 .)
2. Write a loop that prints out the total sum of the following list:
[14, 31, 44, 46, 54, 59, 45, 55, 21, 11, 8, 34, 66, 41]

The sum is 529.
(Solution17 .)
3. Take the following list:
[11, 22, 33]

and write one line of Python that changes the list to:
[11, 22, 33, 99]

Then write another line that changes that list to:
[11, 33, 99]

Then, finally, write another line that changes the list to:
[11, 33, 88, 99]

This exercise should manipulate the same list, not create new lists.
(Solution18 .)
4. Create the following list in under 20 characters of Python code:

https://beej.us/guide/bgpython/source/examples/adv1.py
https://beej.us/guide/bgpython/source/examples/ex_refval.py
https://beej.us/guide/bgpython/source/examples/ex_listsum.py
https://beej.us/guide/bgpython/source/examples/ex_listchange.py

[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]

(Solution19 .)
5. Using a list comprehension, make a new list from the following that only includes numbers that are
multiples of 5:
[14, 31, 44, 46, 54, 59, 45, 55, 21, 11, 8, 34, 66, 41]

(Solution20 .)
6. Using a list comprehension, make a new list from the following that only includes all-uppercase
versions of all words that begin with a consonant.
["alice", "beej", "chris", "dave", "eve", "frank"]

Sample output:
['BEEJ', 'CHRIS', 'DAVE', 'FRANK']

(Solution21 .)
7. Write a program that generates a list of lists (2D list) containing a multiplication table up to 12 × 12.
You should be able to print the result of, say, 7 × 5 like so:
print(multtable[7][5])

(Solution22 .)

### 8.16 Summary
Look at all the stuff we’ve covered in this chapter!
- A brand new data structure to hold lists of information
- Understanding assignments with mutable types
- How to access and change items in a list
- How to modify and copy the list
- How to create new lists of repeating values
- List comprehensions! Wow!
- Lists of lists!
Lists are a powerful tool to add to our arsenal. We’re going to make heavy use of them as our programs
get more complex.

https://beej.us/guide/bgpython/source/examples/ex_replist.py
https://beej.us/guide/bgpython/source/examples/ex_listcompx5.py
https://beej.us/guide/bgpython/source/examples/ex_listcompcap.py
https://beej.us/guide/bgpython/source/examples/ex_listmult.py

Chapter 9

Dictionaries
9.1 Objective
- Understand what dictionaries are
- Initialize a dictionary
- Access individual elements in a dictionary
- Check to see if a key is in a dictionary
- Iterate over dictionaries with for
- Use common dictionaries built-in functions
- Construct new dictionaries with dictionary comprehensions
- Build Dictionaries of Dictionaries
- Understand that Dictionaries are Mutable

### 9.2 Chapter Project Specification
Let’s store some genealogical1 data!
We’ll have several data records associated with each person:
Beej Jorgensen:
Born: 1993 [yes, I'm 29, is my story I'm sticking to]
Mother: Mom Jorgensen
Father: Dad Jorgensen
Siblings: [Brother Jorgensen, Sister Jorgensen, Little Sister Jorgensen]
Mom Jorgensen:
Born: 1970
Mother: Grandma Jorgensen
Father: Grandpa Jorgensen
Siblings: [Auntie Jorgensen]
Dad Jorgensen:
Born: 1965
Mother: Granny Jorgensen
Father: Grandad Jorgensen
Siblings: [Uncle Jorgensen]

This is all about family trees. Did you know I’m related to Queen Elizabeth II (by marriage)? I’m her mother’s sister’s
husband’s father’s father’s sister’s daughter’s husband’s wife’s (drama!) sister’s husband’s father’s brother’s son’s son’s daughter’s
son’s daughter’s son. For realsies! I’m willing to bet that you’re related to Queen Elizabeth II, as well. That makes us cousins!

(Ok, I hear you saying, “Wait, your mom and dad were both Jorgensens? That’s suspicious. I mean, I’m
not saying, but I’m just saying.” Hold your tongue! I can assure you they’re not related2 .)
We want to write an app that will allow you to print out the birthdays of the parents of any given person.
Example:
Enter a name (or q to quit): Beej Jorgensen
Parents:
Mom Jorgensen (1970)
Dad Jorgensen (1965)

So we’ll need some way to store that, and some way to look through the data to get information about
other people who are referenced.
Yes, we could use lists of people and just search through, but there’s a less clunky way we might go about
doing this.
This chapter is all about how we might store such data.

### 9.3 What are Dictionaries?
Remember how with lists, we could key an index number into the list and get a value out, and how we
could use that same index number to store something in that “slot”?
Was really convenient for storing collections of information that you could index by number, right?
Well, what if you wanted to refer to a slot with something that wasn’t a number? What if you wanted to
use, say, a string, like so?
x = [1, 2, 3]
x["beej"] = 3490

That makes Python unhappy because "beej" isn’t an integer. And with lists, it wants integers.
But we can get around that limitation with dictionaries, or dicts for short.
Declaring a dictionary is a little bit different, but here’s a simple example to start:
d = {}

d["beej"] = 3490
print(d["beej"])

So very similar in usage, though the initial declaration of the variable is different than a list.
With dicts, the value in the square brackets is called the key, and the value stored there is the value.
key
value
---+--# --+-d["goats"] = "awesome"

You use the key to lookup a value in the dictionary, or to set a value in the dictionary.
The key can be any immutable type (e.g. integers, floats, strings). The value can be any type.

Except via Queen Elizabeth II, like the rest of us.

### 9.4 Initializing a Dictionary

### 9.4 Initializing a Dictionary
As we saw above, you can initialize an empty dictionary like so:
d = {}

But you can also pre-initialize the dictionary with a number of keys and values:
"name": "Beej",
"age": 29, # ish
"favorite OS": "windows",
"no really, favorite OS": "linux"

That’s the equivalent of setting them by hand, albeit less verbose:
d = {}
d["name"] = "Beej"
d["age"] = 29 # ish

If you come from a web background, you might have come across JSON3 -format data. The Python
dictionary is very similar in format, though not exactly the same.

### 9.5 Speed Demon
Like lists, dicts are really fast at looking up information. In fact, on average, it takes the same amount of
time to get a value out of a dictionary, regardless of how many items are in the dictionary4 .
Keep this fact in mind going forward. We’ll get into more complex problems that can make use of this
feature to keep your programs running quickly. Vroom!

### 9.6 Does this dict have this key?
If you have a dictionary, it’s nice to be able to check to see if a key even exists.
The secret to doing this is the in statement that will return a Boolean indicating if a key is in a dict.
"a": 10,
"b": 20
if "a" in d:
print(f'key a\'s value is: {d["a"]}')
if "x" not in d:
print('There is no key "x" in "d"')

https://en.wikipedia.org/wiki/JSON
Time complexity enthusiasts will recognize this as 𝑂(1), or constant time.

There is also a way to get an item out of a dictionary using the .get() method. This method returns a
default value of None5 if the key doesn’t exist.
val = d.get("x")
if val is None: # Note: use "is", not "==" with "None"!
print("Key x does not exist")
print(f"Value of key x is {d[x]}")

You can also detect a non-existent key with try/catch. But that’s a story for another time.

### 9.7 Iterating over Dictionaries
Remember how you could iterate over all the elements in a list with for? Well, we can do the same thing
with dictionaries. Except, in this case, we’ll be looping over the keys in the dictionary, not the values.
for k in d:
print(f"key {k} has value {d[k]}")

This gives us the output:
key c has value 10
key b has value 20
key a has value 30

Note that in the latest version of Python, the keys come out in the same order they’ve been added to the
dictionary.
If you want them in another order, there are options:
for k in sorted(d): # <--- Add the call to sorted()
print(f"key {k} has value {d[k]}")

And now we have this, where the keys have been sorted alphabetically6 .
If you haven’t seen it before or need a refresher, this is a value that represents “no value”. It’s a placeholder (what we call a
sentinel value) to indicate a no-value condition.
Or what we call lexicographically sorted. It’s like alphabetical, but on steroids so that it can handle letters, numbers, punctuation
and so on, all of which are all numbers deep down.

### 9.8 Common Built-in Dictionary Functionality

key a has value 30
key b has value 20
key c has value 10

Also, similar to how lists work, you can use the .items() method to get all keys and values out at the
same time in a for loop, like this:
for k, v in d.items():
print(f"key {k} has value {v}")

### 9.8 Common Built-in Dictionary Functionality
You have a number of tools in your toolkit for working with dicts in Python:
Method

.clear()
.copy()
.get(key)
.items()
.keys()
.values()
.pop(key)
.popitem()

Empty a dictionary, removing all keys/values
Return a copy of a dictionary
Get a value from a dictionary, with a default if it doesn’t exist
Return a list-ish of the (key,value) pairs in the dictionary
Return a list-ish of the keys in the dictionary
Return a list-ish of the values in the dictionary
Return the value for the given key, and remove it from the dictionary
Pop and return the most-recently-added (key,value) pair

We already saw use of .get(), earlier, but it can also be modified to return a default value if the key
doesn’t exist in the dictionary.
v = d.get("x", -99)
print(v)

We’ve already seen a use of .items(), above. If you want to see just all the keys or values, you can get
an iterable back with the .keys() and .values():

for k in d.keys():
print(k)
for v in d.values():
print(v)

### 9.9 Dictionary Comprehensions
Remember list comprehensions? If you don’t, pop over there for a quick refresher, because this is the
same thing except for dictionaries.
You can create a dictionary from any iterable that you can go over in a for loop. This is a pretty powerful
way of creating a dictionary if you have the data in another, iterable, form, like a list or an input stream of
something.
Let’s go through a list and store the list value as the key, and the list value times 10 as the value in the
dictionary. And let’s ignore the number 20 in the list, just for fun.
a = [10, 20, 30]
d = { x: x*10 for x in a if x != 20 }
print(d)

If you have a list of key/value pairs, you can read those into a dictionary pretty easily, too.
a = [["alice", 20], ["beej", 30], ["chris", 40]]
d = { k: v for k, v in a }
print(d) # {'alice': 20, 'beej': 30, 'chris': 40}

### 9.10 Dictionaries of Dictionaries
Here’s the deal: the value that you store for a given key can be anything!
Well, not like a whale, or Mars, but any data type. So you can store strings, ints, floats, lists, or even other
dictionaries as the value for the dictionary key!
Check out this nested declaration, and check out how we drill down through the dictionary layers to get
to the data:
"a": {
"b": "Mars! Ha!"
print(d)
print(d["a"])
print(d["a"]["b"]) # Mars! Ha!

Nesting dictionaries like this can be a really powerful method of storing data.

### 9.11 Dictionaries are Mutable

### 9.11 Dictionaries are Mutable
When you make an assignment copy of a dictionary, it’s copying the reference to the same dictionary, not
making a new one. Just like with lists and anything else.
And this is important, because dictionaries are mutable, just like lists.
d = { "beej": 3490 }
e = d

e["beej"] = 3491

print(d["beej"])

If you want to make a copy of a dictionary use one of the following:
d = { "beej": 3490 }
e = d.copy() # make a copy, the preferred way
e = dict(d) # make a copy

That first way is preferred because it’s easier to read, and easy to read code is Happy Code™.

### 9.12 The Chapter Project
Pop back up top and refresh on the spec if you need to. Let’s break it down!
The goal of the project is to, for a given person, print out their parents’ names as well as their year of birth.
Pretty straightforward, but the devil’s in the details!
If we look at a sample record, we can see that a dict lends itself quite well to the data, with keys born,
mother, siblings, etc.
Beej Jorgensen:
Born: 1990 [yes, I'm 29, is my story I'm sticking to]
Mother: Mom Jorgensen
Father: Dad Jorgensen
Siblings: [Brother Jorgensen, Sister Jorgensen, Little Sister Jorgensen]

Not only that, but we can store all of those dicts in another container dict which uses the person’s name
as the key!
tree = { # Outer dict holds records for all the people
"Beej Jorgensen: { # Inner dict holds details for each person
"born": 1990,
"mother": "Mom Jorgensen",
"father": "Dad Jorgensen",
"siblings": [
"Brother Jorgensen",
"Sister Jorgensen",
"Little Sister Jorgensen"

So that looks like a reasonable approach to storing data. We can just add the other people to the dictionary
at that outermost layer.
Not only that, but we now have part of the problem solved. If the user enters “Beej Jorgensen”, all we
have to do is look that directly up in the outer dict, and then we can print out my parents’ names!
Of course, we’re still missing out on printing their birth years, but let’s tackle the smaller problem first,
and then figure out how to extract that missing data.
We’ll come back to the “Understanding the Problem” step in a while to revisit that.
Problem-solving step: Carrying out the Plan
We’ll start with a simple tree of just a single person. Let’s keep it as simple as possible, and then go from
there.
tree = {
"Beej Jorgensen": {
"born": 1990,
"mother": "Mom Jorgensen",
"father": "Dad Jorgensen",
"siblings": [
"Brother Jorgensen",
"Sister Jorgensen",
"Little Sister Jorgensen"

And now let’s add some code to get the person’s name, or quit if they enter “q”:
name = input("Enter a name (or q to quit): ")
if name == "q":
continue # Jump back to the top of the loop

And, finally, let’s print out the person’s name and their parents’ names:
record = tree[name]

mother_name = record["mother"]
father_name = record["father"]
print("Parents:")
{mother_name}')
{father_name}')

Giving this a run, we get some good output!

### 9.12 The Chapter Project

$ python3 familytree.py
Enter a name (or q to quit): Beej Jorgensen
Parents:
Mom Jorgensen
Dad Jorgensen
Enter a name (or q to quit): q

We’re still missing the parents’ birth years, but, as I said, we’ll tackle that later.
What happens if we run it with an unknown name? Remember that when you’re testing your code, you
should think like a villain and enter the most unexpected things you can.
Let’s try it with someone it doesn’t know.
$ python3 familytree.py
Enter a name (or q to quit): Arch Stanton
File "familytree.py", line 23, in <module>
record = tree[name] # Look up the record in the outer dict
KeyError: 'Arch Stanton'

Well, that’s ugly. It would be much nicer to print out some kind of error message.
What does the spec say we should do?
…nothing! It says nothing about this case! That’s not useful! The spec is missing information!
True, it is.
Turns out, this is a really common thing when programming. Your boss asks you to implement a thing
but doesn’t fully define what that thing is. It’s not that your boss is bad at this; it’s just that writing down
the exact spec and not leaving anything out is hard.
I promise you that if I asked you to write out the rules to Tic-Tac-Toe7 , I’d find something you left out.
(“You never said my ‘X’ could only take up one grid square!”)
The right thing to do at this point is to go back to the creator of the specification and ask exactly what
should happen in this case.
Problem-solving step: Understanding the Problem (again)
“Hey, specification writer! What do we do if the person doesn’t exist in the data?”
Answer: print out an error message like this:
No record for "Arch Stanton"

All right!
Problem-solving step: Devising a Plan (again)
We’re using this code to get a person’s record:
record = tree[name]

but as we see, that throws an exception if name isn’t a valid key in the dict.
How can we handle that? There are a couple of ways. One of them involves catching the exception, but
we’ll talk more about that in a later chapter.
Something we can do that we discussed earlier in this chapter is to use the .get() method on the dict.
This will return the record, or None if the key doesn’t exist in the dict. Then we can test for that and print
out some error messages.

That’s Noughts and Crosses, to some of you.

Problem-solving step: Carrying out the Plan (again)
record = tree.get(name)

if record is None: # Use "is" when comparing against "None"
print(f'No record for "{name}"')
continue
mother_name = record["mother"]
father_name = record["father"]

print("Parents:")
{mother_name}')
{father_name}')

Now we’re getting pretty close. But we still are missing one big piece: the birth years of the parents.
Getting their names was cake: it was right there in the record for the person we’re looking up. But their
birth years aren’t in there.
How do we get them?
Problem-solving step: Devising a Plan (again)
We have the names of the parents. That’s it.
How do we go from a name to a birth year?
Looks like “Beej Jorgensen” has a birth year listed in his record…
We should add records for “Mom Jorgensen” and “Dad Jorgensen” and then they can have their own birth
years.
But the question still remains: how can we go from the user-entered “Beej Jorgensen” to the birth years
for his parents?
What we’re doing here is trying to tie one piece of data (“Beej Jorgensen”) to other pieces of data (1965
and 1970, his parents’ birth years.)
This is super common in programming. “How do I get from x to y?” We need to find the path.
So let’s see… we have Beej Jorgensen there, with his parents’ names listed.
That’s a start. But given his parents’ names, how do you get his parents’ birthdays?
Yes! You just take their names and look them up in the dictionary!
Except we haven’t added them yet. Let’s do that now. (Note that program line numbers, below, are reset
at this point.)
tree = {
"Beej Jorgensen": {
"born": 1990,
"mother": "Mom Jorgensen",
"father": "Dad Jorgensen",
"siblings": [
"Brother Jorgensen",
"Sister Jorgensen",
"Little Sister Jorgensen"
},
"Mom Jorgensen": {
"born": 1970,
"mother": "Grandma Jorgensen",

### 9.12 The Chapter Project

"father": "Grandpa Jorgensen",
"siblings": ["Auntie Jorgensen"]
},
"Dad Jorgensen": {
"born": 1965,
"mother": "Granny Jorgensen",
"father": "Grandad Jorgensen",
"siblings": ["Uncle Jorgensen"]

And then the main loop logic (unchanged from before):
name = input("Enter a name (or q to quit): ")
if name == "q":
continue # Jump back to the top of the loop
record = tree.get(name)

if record is None: # Use "is" when comparing against "None"
print(f'No record for "{name}"')
continue
mother_name = record["mother"]
father_name = record["father"]

Except now, when we print out the parents, we have to look up the mother’s and father’s record.
mother_record = tree.get(mother_name)
father_record = tree.get(father_name)
if mother_record is not None:
mother_born_date = mother_record["born"]
mother_born_date = "missing record"
if father_record is not None:
father_born_date = father_record["born"]
father_born_date = "missing record"
print("Parents:")
{mother_name} ({mother_born_date})')
{father_name} ({father_born_date})')

That’s it!
Problem-solving step: Looking Back

What could we do better? What are the shortcomings of this app?

Look at the dictionary structure we used to store the data. How could that be better? Think of all the cases
that exist in family trees. Sure, we covered the common case, but what about kids who were adopted?
How do we model that? Divorces? Second marriages? It turns out that modeling a family tree is far more
complex than you might originally anticipate.
What if two people have the same name? In a real family tree, it’s entirely likely there could be multiple
Tom Jones8 in the family tree. But since we’re using the name as the key in the dict, and keys have to be
unique, we’re in trouble. Ergo, the name can’t be the key—something unique must be.
One option there is to use a UUID9 as the key, and map that UUID to names somehow. Maybe you have
another dict that, for a given name, stores a list of UUIDs that represent people who have that name. Then
we could ask the user, “Did you mean the Beej Jorgensen who was born in 1971, 1982, 1997, or 2003?”
if there were multiple Beej Jorgensens. (You can create a random UUID by importing the uuid package
and running uuid.uuid4().)
Lots of options for improvement, here!

### 9.13 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. For the following dictionary, print out all the keys of the dictionary:
"key1": "value1",
"key2": "value1",
"key3": "value1",
"key4": "value1",

(Solution11 .)
2. For the dictionary in problem 1, print out all the keys and values.
(Solution12 .)
3. Given a list of names, write code that converts that list of names into a dictionary that groups names
by their first letter. In the dict, the key should be the first letter of the names, and the value should
be a list of names that start with that letter.
For example, the list:
["Chris", "Annie", "Beej", "Aaron", "Charlie"]

should build into the dictionary (key order doesn’t matter):

It’s not unusual.
https://en.wikipedia.org/wiki/Universally_unique_identifier
https://beej.us/guide/bgpython/source/examples/familytree.py
https://beej.us/guide/bgpython/source/examples/ex_printkeys.py
https://beej.us/guide/bgpython/source/examples/ex_printkeysvals.py

### 9.14 Summary

{
"C": ["Chris", "Charlie"],
"A": ["Annie", "Aaron"],
"B": ["Beej"]

I don’t want you to manually convert the list to a dictionary; I want you to write code that does it
for any list of names.
After you construct the dictionary, print out the keys and values in any order.
(Solution13 .)
4. Change step 5 to print out the keys in sorted order. And the lists in sorted order after that.
(Solution14 .)

### 9.14 Summary
That was a heckuva chapter, wasn’t it?
When we learned about lists, we learned that you could index data by number. But now with dicts, we
can index data by any constant data type at all, including numbers and strings.
This gives us more flexibility in how we store data and how we look it up.
We learned about accessing and setting elements in a dictionary, how to determine if a key is in a dictionary,
and how to iterate over dictionaries with for.
Not only that, but dicts have a bunch of built-in functionality you can reference to manipulate and access
the data stored within them.
Finally, we saw that since dictionary values can be any type of data, you can have dictionaries of dictionaries, even! The only limit is your imagination.
What other kinds of data can you store in dictionaries?

https://beej.us/guide/bgpython/source/examples/ex_list2dict.py
https://beej.us/guide/bgpython/source/examples/ex_list2dictsort.py

Chapter 10

Functions
10.1 Objective
- Understand what functions are and how they’re useful
- Be able to use built-in functions
- Understand what function arguments are
- Be able to write your own functions
- Be able to write good functions
- Understand the difference between positional arguments and keyword arguments

### 10.2 Chapter Project Specification
Allow the user to enter the locations of several starships in 3D space.
These should be entered as x,y,z triplets when prompted. When the user enters “done”, stop entering ship
locations.
Enter ship location x,y,z (or "done"): 10,20,30
Enter ship location x,y,z (or "done"): -17,16,50
Enter ship location x,y,z (or "done"): 0,13,30
Enter ship location x,y,z (or "done"): 5,20,-40
Enter ship location x,y,z (or "done"): done

Then print out a grid of the distances between them. The grid’s top row and left column should indicate
the ship number (starting with 0).
Crossing a column with a row should give you the distance between the ships.
Distances should be printed to 2 decimal places in fields of width 8.
We’ll use a variant of the Pythagorean Theorem1 to find the distance between two 3D points.

𝑑 = √(𝑥0 − 𝑥1 )2 + (𝑦0 − 𝑦1 )2 + (𝑧0 − 𝑧1 )2
For each pair of 3D points, we take the difference in the X coordinates squared, plus the difference in the
Y coordinates squared plus the difference in the Z coordinates squared, and then we take the square root
of that whole thing. And that’s the distance between the two points.
Example output (corresponding to the example input, above):

33.84

33.84

12.21
26.42

70.18
92.74

https://en.wikipedia.org/wiki/Pythagorean_theorem#Euclidean_distance

12.21
70.18

26.42
92.74

70.53

70.53

So we can see ship #2 (along the top) is distance 26.42 from ship #1 (along the left). And notice the
diagonal is all 0.00, which makes sense because every ship is zero distance from itself.
Keep this project in mind as we go through the chapter.

### 10.3 What Are Functions?
You’re about to seriously level up in programming by learning how to do this, and it’s not even that
difficult. Functions are the key to getting away from the toy programs we’ve been doing so far and doing
real programs.
So what are they?
Functions are self-contained pieces of code that you can call that do a specific thing.
Does this sound at all familiar? Because we’ve been doing this the whole time with the built-in print()
function.
Not to be confused with statements like for and if. Know a function because it has parenthesis
right after the name that you can use to pass arguments to the functiona .
a

Purists will point out exceptions to this, like with __add__(), but let’s skip that for now.

The print() function has built-in functionality to print things on the screen. Thankfully (really, really)
we don’t have to write that code ourselves. We can just say:
print(23 + 34)

and have print() do all the dirty work of getting us the answer printed to the screen.
We’ve also used the input() function to get a string entered from the keyboard.
name = input("Enter your name: ")

This turns out to be a great way to simplify and organize code. Can you imagine if you had to put all the
code in to print out something on the screen every time you wanted to print something? Much easier to
define the print() function once, and then use it over and over again by calling it.
We have an important principle in computer programming called the DRY principle2 (Don’t Repeat Yourself ). If you can remove as much repetitive code as you can and move it to a function, that makes your
code easier to read and maintain. DRY code is happy code.
Not only can we use functions to make DRY code, we can also use them to organize our code into logical
sections, even if a function is called only one time.
It is clearer to have your functionality in discrete sections that you call in sequence rather than just having
a single huge block of code that does everything

### 10.4 Using Built-In Functions
Python has a lot of built-in functions that you can use. It’s not necessary to memorize the usage in detail
(you can always look up the details), but it’s a good idea to skim their descriptions just so you can recall
that they exist.

https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

### 10.5 Arguments

We’ve already used print() and input() quite a bit, but there are plenty more. Look them up online3 .
Here are some common ones, though this is not an exhaustive list:
Built-in Function

abs()
bin()
chr()

Return the absolute value of a number.
Return a string representing the number in binary.
Return a character for the Unicode (and ASCII)
value passed in.
Return a list of methods on this object.
Return an iterator over a list of (index, value)
pairs.
Repeatedly run a function on items of a list
filtering some out.
Convert a number or string to a floating-point
value.
Get help on a data type.
Return the hexadecimal representation of a
number.
Get input from the keyboard and return that string.
Convert a floating point or string to an integer
value.
Return true if an object is an instance of a class.
Return the length of an iterable, like a list or string.
Run a function on every value in an iterable,
returning the results.
Return the maximum of the arguments or of an
iterable.
Return the minimum of the arguments or of an
iterable.
Return the Unicode value (code point) for a given
character.
Return a base value raised to an exponent.
Print to the console.
Return an iterator that runs over a range of values.
Return an iterator over a reversed version of the
argument.
Round a number to the nearest whole number.
Return a sorted version of an iterable.
Convert a value to a string.
Return the sum of all arguments and/or of an
iterable.
Get access to an object’s superclass.
Merge parallel lists into a dictionary.

dir()
enumerate()
filter()
float()
help()
hex()
input()
int()
isinstance()
len()
map()
max()
min()
ord()
pow()
range()
reversed()
round()
sorted()
str()
sum()
super()
zip()

These are all available for use at any time in your program.

### 10.5 Arguments
“Oh look, this isn’t an argument.”
“Yes it is.”
“No it isn’t. It’s just contradiction.”
“No it isn’t.”

https://docs.python.org/3/library/functions.html

—Excerpt from Monty Python’s Argument Clinic sketch

When you call a function, the things you put in the parentheses are called the arguments to the function.
Arguments are separated by commas.
print(2)
print(2, 3)
print(2, 3, 4)

The arguments are the way you can pass data into a function to have it operate on that data to produce a
result.
We refer to them by number, as well. “Pass the number of goats in as the second argument to the function.”
Functions often take a specific number of arguments. But, as we see above with print(), they can take
variable numbers of arguments, too.

### 10.6 Writing Your Own Functions
“What do you like most about hacking?”
“The power.”
—A good friend of mine trolling a reporter at DEFCON 2a
a

https://www.defcon.org/html/defcon-2/defcon-2.html

The power. This is where we fly. Writing your own functions. This is where we get to DRY our code,
organize it better, and make it more readable overall.
All programmers use their own functions heavily, and to great effect.
Let’s say we want to write a program that adds 13 to a number, and then divides the resultant sum by 7.
No problem. We got this. Let’s do it with 30.
print((30 + 13) / 7)

Great! Oh, and we also need it for 8, 19, 21, 37, 402, 516, 1024, and 3490.
OK. Still no problem.
print((30 + 13) / 7)
print((8 + 13) / 7)
print((19 + 13) / 7)
print((21 + 13) / 7)
print((37 + 13) / 7)
print((402 + 13) / 7)
print((516 + 13) / 7)
print((1024 + 13) / 7)
print((3490 + 13) / 7)

Great! Oh, did I say “divide by 7”? I’m sorry, that should be “multiply by 7”.
And here we get a taste of why DRY code is good code. Since the spec changed4 , we have to go back and
modify all those lines of code to make them right.

This happens all the time in development.

### 10.6 Writing Your Own Functions

If only we hadn’t repeated ourselves, we might have been able to only change it in one place. This would
also be better because we wouldn’t be taking the risk of missing a place we should have changed the code.
But how to do it?
With… FUNCTIONS! Let’s write a function to do that math and return the result. Then we can just call
it over and over, like this:
print(do_the_math(30))
print(do_the_math(8))
print(do_the_math(19))
print(do_the_math(21))
print(do_the_math(37))
print(do_the_math(402))
print(do_the_math(516))
print(do_the_math(1024))
print(do_the_math(3490))

Sure, we’re repeating the function name do_the_math(), but we’re not repeating the actual mathematical
expression, itself, which is what matters.
But how do we define the function do_the_math()?
We use the def statement, like this:
def do_the_math(x):
result = (x + 13) * 7
return result
answer = do_the_math(30)
print(answer)

The indented stuff after the def is called the function body. That’s where all the work gets done.
There’s a lot of stuff to unpack here, so let’s take it nice and slow.

Line 1: defining the function
When we say def do_the_math, we’re telling Python, “Hey, I’m making a brand new function from
scratch called do_the_math.
The part in the parentheses is a list of what we call parameters. This describes what can be passed to the
function. The actual values we pass to the function are called arguments.
In this case, we can pass a single argument to our function. It will be represented inside the function by
the variable x.
When we call the function on line 6, x will be initialized with the argument, just as if it had been assigned
to. So in this example, x will be assigned 30, because that’s the argument we passed to the function for
that call.
In particular, whatever you pass as an argument will also be referred to by the corresponding variable in the parameter list.
Remember: you pass in arguments that get assigned into parameters.
A parameter is a special type of local variable, one that comes pre-initialized with whatever value we
passed in as an argument. We’ll get into their story on line 2.

Line 2: Compute the result
You can see on line 2 that we take the parameter x and feed it into the equation our boss tasked us with.
(They told us to change it to multiply by 7, remember?)
And then Python does that math and stores that into the variable result.
Now that variable result is special. It’s what we call a local variable. Because it’s used inside the
function, it’s only visible inside the function. Once the function returns (more on that below), the value
in the local variables vanish forever.
You can name the local variables anything you want, even if you’ve used that same name in another
function! Each local variable is isolated from the rest of the world and only exists within its own function.
And as I mentioned above, the parameters are also local variables. They just have the added property that
they are assigned the values of the arguments automatically.

Line 4: Return the result
A function can optionally return a value. You know how arguments are a way to pass data into a function?
The return value is a way to pass data back out of the function to the caller.
Back where the function is called, you can think of the function call as having the return value. Then you
can do things like assign it into a variable.

Line 6: Capture the returned result in a variable
We call our function, and we take the return value from that function and assign it into the variable answer.
Then we can do things with it, like print it out on line 7.
In the function as written, above, we use a lot of variables to help demonstrate a number of concepts and
ideas surrounding functions.
But in reality, a dev would probably simplify the above code to:
def do_the_math(x):
return (x + 13) * 7
print(do_the_math(30))

Compare the two until you are convinced they are equivalent.

### 10.7 Multiple Return Values
You can always return a list or a dict or anything from a function, but you can also return two values and
assign them to different variables.
def timesdiv10(x):
return x * 10, x / 10
a, b = timesdiv10(100)
print(a, b)

Or you can assign the result to a single variable. The result will be a tuple, which is a read-only list that
you can access with square bracket notation:

### 10.8 What Makes a Good Function

a = timesdiv10(100)
print(a[0], a[1])

Magic!

### 10.8 What Makes a Good Function
The biggest rule is “do one thing and do it well”.
It’s more of a guideline than a rule because you’re the boss when it comes to programming.
But it’s a great guideline that should be followed when you can.
The biggest things you’ll use functions for are:
- Mathematical equations
- Anything that happens repeatedly
- Breaking up code into smaller, self-contained sections
Let’s talk about that last item more, since it’s less obvious.
Very frequently—almost always—you’ll start with a series of steps you need to perform to solve the
problem, like this:

And then you go in and fill in all the code for processing the data and outputting the data.
But that could make for a bulky, hard-to-read while loop. It might be better to code it up like this:
while d in data:
d = process(d)
output(d)

and the write the functions process() and output() to operate on the data that is passed into them.
This makes the logic of the loop really easy to read. And being easy-to-read is king (or queen, if you
prefer).
If you find you have some large amounts of code that are getting deeply-nested, it might be time to break
them out into functions, even if you only call those functions from that single place.
Knowing when to break up code into functions is more of an art than a science. If you start feeling like
your code is remotely unwieldy, consider what it might look like split into different functions. If you like
it more, do it!

### 10.9 Positional Arguments versus Keyword Arguments
We’ll talk more about this in detail later, but function arguments can be split into these two broad classes
in Python: positional and keyword.
Positional arguments are the arguments that have to occur at certain positions in a function call.
For instance, if we want to compute 1412 , we need to pass those two arguments in a specific order to the
math.pow() function, which expects the base to be first and the exponent to be second:

math.pow(14, 12)

If you put the 12 first, you get a different answer. These are positional arguments.
But for some functions, after the positional arguments, you can specify additional keyword arguments.
These are arguments that are identified by a certain name.
For example, normally print() puts a newline at the end of the string. But you can override this behavior
with the end keyword argument by telling print() to put nothing (an empty string) at the end of the line:
print("Be", end="")
print("ej")

Notice how we had to identify the keyword argument by name.
If you’re looking through documentation, you might find something that looks like this (the documentation
for print()):
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)

Ignoring the *objects for now, look at all those keyword arguments… in the docs, they have = followed
by some value. This indicates the default value if you don’t specify one otherwise. In other words, they’re
optional keyword arguments.
You can see that print() ends each line with a newline \n unless we tell it to end the line with some
other string.
For now, it’s enough to know that these exist and how to call them. Later on, we’ll talk about how to write
our own.

### 10.10 Interlude: Evaluation Strategies
If you don’t want to read this section, it’s OK to skip. But it’s more fun if you read it.
Different languages have different behaviors when it comes to passing arguments to functions.
Some of them make copies of the values. Some of them just make it so the parameter name is an alias for
the argument name. Some of them give you the option through some keyword.
How the programming language does this is called it’s evaluation strategy5 .
Three very common ones are:
- Call by Sharing: This is what Python does. When you call a function, the parameters become
references to the same objects as their corresponding arguments. This means that if, inside the
function, you change the thing the parameter refers to, you’ll see that change reflected out in the
caller. However, if you assign a new value into a parameter, you will not see the change.
def foo(x):
x = [4, 5, 6]

https://en.wikipedia.org/wiki/Evaluation_strategy

### 10.11 The Chapter Project

foo(a)

- Call by Value: a copy of the argument is made and stored in the parameter. The C programming
language6 , among others, uses this one. (Sometimes people say Python uses Call by Value, but
this is technically not accurate since parameters are not copied when they are passed in; only the
reference to the argument is copied. You can make Python simulate Call by Value by making a copy
of the parameter when calling the function.)
def foo(x):
foo(a.copy())

- Call by Reference: the parameter effectively becomes an alias for the variable name passed
in as the argument. Anything you do to the parameter you effectively do to the argument,
including assigning it some other value. Example languages Fortran7 , C++8 (usually by value,
but can be made by reference). (Sometimes people say Python uses Call by Reference, but
this is technically not accurate since you can’t assign new values to parameters and see that
reflected in the argument.)
Here’s a quick summary between them.
Note: In the following table, “Can modify item in caller” means that if you have a variable in the caller
that refers to a thing, changes to the thing in the function will be reflected in the caller’s variable.
“Parameter reassignment affects caller” means that if you assign into a parameter variable (i.e. change the
parameter to refer to a completely different thing) the argument variable will also change.
Can modify item in caller

Parameter reassignment affects caller

Yes
No
Yes

No
No
Yes

Call by Sharing
Call by Value
Call by Reference

Now, I’ve seen people be fast and loose with these descriptions when it comes to Python, so don’t hold
them to it. In my opinion, from the above three items, Call by Sharing is the most accurate. Call by
Reference is the second-most.

### 10.11 The Chapter Project
It’s that time! If you need a refresher, pop back up to the top and check out the spec.
So we want to do a couple of things:

https://en.wikipedia.org/wiki/C_(programming_language)
https://en.wikipedia.org/wiki/Fortran
https://en.wikipedia.org/wiki/C%2B%2B

1. Read in a list of starship positions.
## 2. Print out a grid of distances between each ship.
The positions are entered as X, Y, Z coordinates (until the user enters “done”).

The distances are computed with the distance formula variation of the Pythagorean Theorem.
A grid of distances is printed. There should be ship numbers along the axes.
We already have a bit of a plan, don’t we? We listed it right up there.
1. Read in a list of starship positions.
