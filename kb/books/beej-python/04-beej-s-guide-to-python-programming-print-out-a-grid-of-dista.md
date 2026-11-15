---
id: beej-python-04
title: "Beej's Guide to Python Programming — Print out a grid of distances between each ship., Print out a…",
slug: beej-python-04-beej-s-guide-to-python-programming-print-out-a-grid-of-dista
source: "Beej's Guide to Python Programming",
sourceSection: "2. Print out a grid of distances between each ship., 2. Print out a grid of distances between each ship., 3. Print the table of contents with printdir() on that ZipFile object."
track: data-scripting,
tier: free
tags: [python, programming, scripting]
summary: "Don’t look now, but these would make a great couple of functions. Covers 3 sections: Print out a grid of distances between each ship., Print out a grid of distances between each ship., Print the table of c.",
---
# Beej's Guide to Python Programming — Print out a grid of distances between each ship., Print out a…

## 2. Print out a grid of distances between each ship.
Don’t look now, but these would make a great couple of functions. Sure, we could stick them all in one
big main routine, but it’s way more logical and easier to read if we make them their own functions.
We could have one function read the list of positions and return it.
And we could take that returned list and pass it into another function to print the grid.
print_grid(locations)

We’re taking a _ top-down_ approach, here. Starting with the big pieces of logic and then implementing
them as we go down.
In fact, let’s simplify the problem, and just start like this:
print(locations)
#print_grid(locations)

That way we can just do one bit and make sure it’s working.
Fun Motto Fact: Get something working as quickly as possible, no matter how much a piece of
the project it is.
For getting the ship locations, looks like we want to have the user enter an X, Y, Z coordinate. Then we
want to split that into a list of numbers. And we need to make sure they are int type—remember that
input() returns a string, so we’ll have to convert them to int.
And we repeat that until the user enters “done”.
Looping until the user enters “done” is a solved problem. We’ve done that a few times now. Just make a
variable for the while() condition, and then set it when the user enters “done”.
Otherwise, we have to split the string up into a list of 3 numbers, splitting on the comma. Remember how
to do that?
Yes, that’s right (or no, not right, if you don’t remember), it’s the split() string method. Example:
"1,2,3".split(',')

But that’s not enough. As we noted, we need to convert that list from a list of strings to a list of numbers.
Remember how to convert a string to a number? Yes, with the built-in int() function!
int("2") == 2

So we can loop through our list of strings and convert them to ints.

### 10.11 The Chapter Project

And then we’ll have a list of 3 ints, representing the X, Y, Z coordinates of a single ship. Of course, the user
is going to enter any number of ships, and we’ll have to keep all those lists of coordinates somewhere…
where?
It’s almost like we’ll need a list for all those lists. A list of lists! Why not? We made some of those in the
lists chapter, right?
So we add the new X, Y, Z list to the end of a master list that holds all the coordinates.
Then we can return that master list to be used later when we print the grid.
Let’s code!
Wait—you’re right—we haven’t finished the entire plan for the whole project. True. But that’s okay. We
completed enough devising of a plan to do the first part of the project.
And this is one of the beautiful things about functions. We’ve split the problem up so nicely that we
can implement different parts of it completely independently! In fact, if you have a programming
pal, you could get them to write the print_grid() function at the same time you were writing the
get_ship_locations() function!
Let’s get coding!
def get_ship_locations():
"""
Ask the user to enter a number of X, Y, Z ships coordinates.
Returns a list of all the coordinates.
"""
locations = []

xyz = input('Enter ship location x,y,z (or "done"): ')
if xyz == "done":
xyz_list = xyz.split(',')
for i, v in enumerate(xyz_list):
xyz_list[i] = int(v)
locations.append(xyz_list)
return locations
print(locations)
#print_grid(locations)

If we give that a run, we see something like this:
Enter ship location x,y,z (or "done"): 1,2,3
Enter ship location x,y,z (or "done"): 4,5,6
Enter ship location x,y,z (or "done"): done

[[1, 2, 3], [4, 5, 6]]

There’s our list of lists holding the ships’ coordinates! It’s ready to feed into the print_grid() function.
But first, we’d better think about that for a bit.
One more thing: if you were looking closely, you saw the big multiline string at the beginning of the
function describing what the function does. This is called a doc string and it’s a comment that gives
overall information about the function. Automatic documentation generators can extract these and build
documentation for you, just like you can get with the help() function in the REPL.
All righty. What do we need to do for this second part of printing out the grid of distances between the
ships?
There are sort of three big pieces here.
- We need to print out a grid.
- We need the first row and first column to list out ship numbers so we can cross-reference.
- We need to compute the distance and print that.
Let’s simplify a bit first. Instead of worrying about computing the distance, let’s just concentrate on the
grid. We’ll just put the bogus number of 99.99 in for all the inter-ship distances.
Protip: When putting in bogus data, make sure it’s obviously bogus so that obviously people
obviously know they must obviously replace this with real data before the product ships.
And to simplify even further, let’s forget about the ship numbers in the first row and first column. We can
add those in later. Remember: it’s good to identify the minimum independent piece you can implement
next and test that it’s working.
We know how many ships we have—it’s the length of the master list of ship coordinates.
If we have n ships, we’ll need and n by n grid to be displayed to show all the distances between all of
them. But how? Think back to the loops chapter…
You can do it with a nested loop. The outer one goes for n rows, and the inner one goes for n columns.
For printing the number with 2 decimal places in a field of width 8, you can use a f-string with some
special formatting specifiers, for example:
distance = 99.99
print(f'{distance:8.2f})

99.99"

All righty! Let’s print some stuff!
def print_grid(locations):
"""Print a grid of ship-to-ship distances."""
num_ships = len(locations)
dist = 99.99
print_grid(locations)

### 10.11 The Chapter Project

Running that gives:
Enter ship location x,y,z (or "done"): 1,2,3
Enter ship location x,y,z (or "done"): 4,5,6
Enter ship location x,y,z (or "done"): 7,8,9
Enter ship location x,y,z (or "done"): done

Hey, a nice 3x3 grid for our 3 ships!
Next, let’s put the ship row number just to the left of each row. Just editing the for-loop here:
dist = 99.99

We printed it in field width 8 just for consistency with the distance numbers. Output is now:

Which is good! Now we just need a row on the top. How about another loop before everything else to
print out that row?
dist = 99.99

And we get this:

Er, well, that’s almost right. The top row is shifted one column left. We need to stick 8 blank spaces in
before it to scooch it over. So let’s just do it, using string multiplication to make us 8 spaces:
print(" " * 8, end="")

And now we have this:

which is looking right on. Except that all the distances are listed as 99.99. Let’s get that out of there and
replace it with the real distance between the ships.
Distance! We see the distance formula up there at the top, repeated here:

𝑑 = √(𝑥0 − 𝑥1 )2 + (𝑦0 − 𝑦1 )2 + (𝑧0 − 𝑧1 )2
How do we turn that into code?
We could use math.sqrt() to get the square root, and math.pow() to square the numbers.
Another option is to compute, say, the difference in the X coordinates and then multiply that result by
itself to square it (since 𝑥 × 𝑥 =x^2$).
Let’s code them both and then use the one you like best.
Here’s computing the distance between points p0 and p1 (both of which are lists of X,Y,Z triples) using
math.pow():
d = math.sqrt(
math.pow(p0[0] - p1[0], 2) +
math.pow(p0[1] - p1[1], 2) +
math.pow(p0[2] - p1[2], 2)
)

And here’s option two:
dx = p0[0] - p1[0]
dy = p0[1] - p1[1]
dz = p0[2] - p1[2]

d = math.sqrt(dx*dx + dy*dy + dz*dz)

Which do you prefer? Both should give equivalent answers.
Now, sure, we could just throw that equation in the middle of our code, but this is actually ripe to be made
into its own function! If we do that, we can reuse it easily later, should we ever want to. Let’s wrap it up
and add it to our file:
“‘ .{py} def dist3d(p0, p1): “ “ “Return the Euclidean distance between 2 3D points.” “ ”
dx = p0[0] - p1[0]
dy = p0[1] - p1[1]
dz = p0[2] - p1[2]
return math.sqrt(dx*dx + dy*dy + dz*dz)

### 10.12 Exercises

And then we can mod our code where we hardcoded that `99.99` and have it
call the distance formula instead! We just need to pass in the two
ships' locations---one is represented by the column number, and the
other by the row number:
```sh
dist = dist3d(locations[i], locations[j]])

# <-- Mod here

And there we have it!
(Solution9 .)

10.12 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. Write a program to input numbers repeatedly until the user types “done”. Keep track of all the
numbers in a list.
Print out the maximum value the user entered using built-in functions.
2. Write a function that takes an integer between 0 and 9 as an argument. It should return a string that
corresponds to the English word for that number. For example, if the argument is 3, the function
should return "three".
(Solution11 .)
3. Write a function that accepts the mass of two planets and the distance between them (for a total of
3 arguments) and returns the force between them.
Use Newton’s Universal Law of Gravitation to calculate the force 𝐹 :

𝐹 =𝐺

𝑚1 𝑚2
𝑟2

In mathematical notation, to variables next to each other like 𝑚1 𝑚2 , above, indicate multiplication.
And for 𝑟2 , a simple equivalent is 𝑟 × 𝑟.
So we can convert that whole equation to:
F = G * (m1 * m2) / (r * r)

where m1 is the mass of one planet, m2 is the mass of the other planet and r is the distance between
them.
So far so good.
But what’s G? It’s the gravitational constant:

https://beej.us/guide/bgpython/source/examples/shipdist.py
https://beej.us/guide/bgpython/source/examples/ex_max.py
https://beej.us/guide/bgpython/source/examples/ex_ennum.py

𝐺 = 6.67430 × 10−11
That’s written in scientific notation, but we can do the same thing in Python:
G = 6.67430e-11

That should be enough to go on. Write the function and call it with a variety of different values.
Here are some sample values so you can see if your code is working:
m1

m2

r

100

1.48317e-11
2.96635e-11
3.33714e-10

(Solution12 .)

10.13 Summary
Functions are a super-important part of programming and a highly valuable tool to have at your disposal.
You can use them to break up code into smaller, more manageable pieces. You can also use them to create
standalone, reusable pieces of code.
Python comes with a pile of built-in functions, and it pays to know what they are (so you don’t reinvent
them yourself!)
Finally, you also learned that function arguments come in two flavors: positional and keyword. We’ll
revisit more of that topic later.
But now: well-deserved break time!

https://beej.us/guide/bgpython/source/examples/ex_grav.py

Chapter 11

Classes and Objects
11.1 Objective
• Learn what classes and objects are useful for
• Understand the relationship between classes and objects
• Be able to declare a class
• Be able to use that class to instantiate objects
• Understand that objects are mutable
• Understand the relationship between objects and None
• How to test to see if an object has an attribute or not

11.2 Chapter Project Specification
As you go through the chapter, remember this specification and think about how we might use the new
ideas in this chapter to implement it. This can absolutely be implemented without using the material in
this chapter, but the goal is to implement it using the info
We want to store data for a number of theaters and the movies that are being shown at those theaters.
Each movie has:
• A title (string)
• A duration (integer, minutes)
• A genre (string)
Each theater has:
• A name (string)
• A list of movies that are showing at the theater (list)
The output should look similar to this, depending on your theater names and movies:
McMenamin's Old St. Francis Theater is showing:
Star Wars (scifi, 125 minutes)
Shaun of the Dead (romzomcom, 100 minutes)
Tin Pan Theater is showing:
Shaun of the Dead (romzomcom, 100 minutes)
Citizen Kane (drama, 119 minutes)
Tower Theater is showing:
Star Wars (scifi, 125 minutes)
Shaun of the Dead (romzomcom, 100 minutes)
Citizen Kane (drama, 119 minutes)

Note that multiple theaters might be showing the same movie title. Avoid duplicating the movie data as
much as possible. (Remember: Don’t Repeat Yourself!)

Stretch goal: also store the per-theater showtimes for each movie at that theater.

11.3 What Problem Are We Even Trying To Solve?
Let’s first learn about the problem we’re trying to solve, and then let’s take a look at how classes and
objects can help us solve it.
Okay, I said “problem”, but it’s actually multiple problems. Let’s start with the easier one.
Okay, I said “easier”, but really they’re the same.
Get on with it!
Let’s pretend you have a game where you have a starship that has multiple attributes. For example,
it might have two attributes: XYZ coordinates in 3-space (e.g. [10, 20, 30]), and a ship name (e.g.
"USS Enterprise").
These two pieces of information are clearly related. They apply to one single instance of a starship.
If we have multiple starships in the universe, they’ll each have their own names and coordinates.
So far so good?
Now… how do we store that data with what we know so far?
Well, we have lists, so let’s try with those. We’ll have three starships with different names and different
locations:
ship_location = [
[10, 20, 30],
[-10, 20, -30],
[10, -20, 30]
ship_name = [
"MCRN Tachi",
"Red Dwarf",
"USCSS Nostromo"

And then we can access ship #1 like this:
print(ship_name[1])
print(ship_location[1])

So we have two lists, one for name and one for location1 .
It works, but it’s a bummer to have to maintain two (or more) lists this way. If we ever added a ship, we
have to be sure we add all the information to all the lists and make sure things don’t get out of order. It’s
easy to make a mistake and get the lists out of sync.
What would be nice is if we could bundle all the information about one single ship into one single object
that held the information about just that one ship. Other ships would be represented by other objects. And
then we’d have a list of those objects—just one list to maintain!
This technique is called parallel arrays or, in the case of Python, parallel lists. It’s not a popular technique today, having been
made obsolete by the very thing we’re talking about in this chapter.

11.4. What are Classes and Objects?

11.4 What are Classes and Objects?
What we’re starting to delve into here is the world of Object-Oriented Programming. To discuss everything about it would definitely be information overload, so we’re just going to start with the basics here,
and revisit some of the concepts later.
A bit of terminology here, following up on the starship example from above.
First of all, we’re going to construct new starship objects that hold all the information about a single ship.
When the object is constructed, it is done based on a blueprint. We call this blueprint a class.
So we’re going to define a blueprint for a starship in a class, and then we’re going to build multiple,
different starships based on that class.
Let’s do this as simple as possible to start. It’s not going to be a common way of doing things, but it’s a
place to get your feet wet. We’ll fix it soon.
First of all, we’ll define a new class. Remember, this is just the blueprint for starships—it’s not a starship
itself.
Class names use camel case2 by convention. Let’s define that starship class!

…that’s it? What’s that pass in there?
Okay, you got me. I did say we were going to start simple (and not quite Right), in my defense. What we
have there is a class StarShip, except it’s like a blank blueprint. There’s nothing in it.
The keyword pass means “do nothing” in Python. It’s just there to indicate to Python that there’s no body
inside this class.
Random Terminology Facts: We also say a starship object is an instance of the StarShip class.
Constructing a new starship object is also referred to as instantiating the object from the class.
Let’s go on to make a couple of objects from the blueprint.
s0 = StarShip()
s1 = StarShip()
s2 = StarShip()

By putting parens after the class name, we’re telling Python that we are creating a new starship object
from the StarShip class. In fact, we made three of them and saved a reference to each in s0, s1, and s2.
Of course, none of them have names or locations, but we’ll remedy that shortly.
If we print one, we get something like this:
print(s1)

# <__main__.StarShip object at 0x7fa11828c8e0>

Not so pretty. But we’ll make that better soon, as well.

11.5 Making Different StarShips

https://en.wikipedia.org/wiki/Camel_case

In the previous example, all our starship objects were identical and contained no information.
What we need is a way to pass that information in when the starships are constructed.
We do this by defining a special function inside the class.
Another Fun Terminology Fact: functions declared inside classes are called methods.
This special function is always named __init__() (with the dunders) and is called the constructor.
Let’s add a constructor to our StarShip class that allows us to pass in a ship name when the ship is
constructed:
def __init__(self, shipname):
self.name = shipname

s1 = StarShip("Red Dwarf")
s2 = StarShip("USCSS Nostromo")

Whoa, now… that’s a lot of hard-to-read punctuation3 to sift through.
And there’s that crazy self parameter to the function, whatever that means!
Let’s start with self4 . This is one of the hardest concepts to grok about in this chapter, so we’ll spend
some time on it.
Remember how the class is the blueprint, and the objects are made from that blueprint?
And how after they’re constructed, you get a reference back to that newly-minted object? (These are the
references we were storing in s0, s1, and s2.)
Well, what about the object that’s being constructed right now inside the __init__() method? It already
exists but isn’t fully initialized yet. But inside the constructor, we have a reference to that object that is
being built right now. And that reference is in self.
self means “the object that this method is operating on”.

What’s weird is that when we instantiated the starships, we only passed one argument to __init()__.

When clearly __init__() has two parameters: self and name. What gives?
def __init__(self, shipname):

Doesn’t the number of arguments need to match the number of parameters?
It does! But Python’s doing something sneaky behind your back, here. When a method has been called for
a particular object, Python automagically fills in the first parameter with the object that is being operated
on. We don’t have to worry about it.
Python then takes the arguments we did pass and tacks them on after that.
Let’s take a look at that constructor again:
def __init__(self, shipname):
self.name = shipname

In fact, I think the choice to use all those underscores in __init__() is one of the few bad design choices in the language.
A lot of other languages use the variable name this instead of self.

11.6. Attributes

This is a really common pattern, so let’s make sure we understand what’s going on here. In particular,
there’s a weird dot after self. What does that mean? But before we get there, let’s look at shipname.
When we create our new starship s0, we pass in the name "MCRN Tachi". This calls the constructor
__init__().
Python automatically puts a reference to the object that’s now being constructed into self. And
then it copies the string "MCRN Tachi" to the shipname parameter of the function. So shipname is
"MCRN Tachi".
And now we’re to the guts of the thing. self.name? The saga continues!

11.6 Attributes
Objects have variables attached to them, and we call these attributes5 .
Attributes are qualities that an object possesses—what things it has. For example, a starship would possess
a name. In other words, a starship would have a name attribute.
And we refer to these attribute by using the dot operator (.).
When we have a line like this:
self.name = shipname

We’re saying “change the name attribute on this starship object to be the same as the shipname parameter
that was passed into this method”.
This is how we take the ship name that was passed in as an argument and attach it to the newly constructed
object! We save a reference to the name in an attribute on the object!
Note that I named shipname differently than ship deliberately. (I did this to show that they could be
different, but also to avoid confusion when looking at the example.) But it’s far more common to just
name them the same thing. This is OK since self.name, the attribute on self, is different than name,
the parameter.
Like so:

11.7 Using Attributes
Now let’s add one more thing to our starships: their location.
Instead of passing the location into the constructor, let’s just initialize it to location [0,0,0] right off the
bat. Then we can manually set it later.
def __init__(self, name): # The constructor
self.location = [0, 0, 0]

Technically, even the methods are attributes, but we’ll get into the pedantic details another time.

All ships will now start at [0,0,0] because that’s what the blueprint says they’ll do.
And we can print it! We’ll access the values in those attributes by using the dot operator on s0!
print(s0.name)

# MCRN Tachi
# [0, 0, 0]

But wait! There’s more! That’s not all!
You can also set values!
print(s0.name)

# MCRN Tachi

s0.name = "Rocinante"
print(s0.name)

# Rocinante

And we could modify the location of the ship this way, as well:
s0.location[1] = 99

# [0, 99, 0]

This is important! Even though we’re changing the values for the attributes of s0, the attributes of the
other objects (like s1 and s2) remain unchanged! (Until we explicitly change them.)
We’ve successfully bundled all the information about a single ship into this single object. Nice and consolidated.

11.8 More on Methods
Remember that methods are functions that are connected to the object. Just like you could think of attributes as things the object has, you can think of methods like things the object does.
Let’s add another method to set the ship location.
def __init__(self, name): # The constructor
self.location = [0, 0, 0]
def set_location(self, x, y, z):
"""Set a ship's location to x,y,z"""
self.location[0] = x
self.location[1] = y
self.location[2] = z

# [0, 0, 0]

s0.set_location(10, 20, 30)

11.9. Pretty Printing

# [10, 20, 30]

On line 6, we define our new method, set_location(). Importantly, notice the first parameter is self,
which will be initialized to represent the object we’re setting the location of. (That is, when we call
s0.set_location(), self will be set to refer to s0 inside set_location().)
Fun Debugging Fact: If you get an error about the incorrect number of arguments to your method,
make sure you have self as the first parameter!
Then on line 17, when we call set_location() on s0, self gets set to s0, and x, y, and z get set to 10,
20, and 30, respectively.
Then we use x, y, z, and self inside the method to change the values in this ship’s location.
This way, when we print it out on line 19, we see the new values there.
Attributes!

11.9 Pretty Printing
Right now when we print one of our starship objects, Python prints something like this on the screen:
<__main__.StarShip object at 0x7fa11828c8e0>

Not particularly useful. Let’s override that functionality and have it print something nicer.
Go ahead and add this method to the StarShip class:
def __str__(self):
"""Return string representation of this object."""
return f'{self.name}: {self.location}'

The __str__() method returns a string to use any time an object is printed.
Now if we build three new ships and print them all:
s0 = StarShip("Rocinante")
s1 = StarShip("Red Dwarf")
s2 = StarShip("USCSS Nostromo")
s0.set_location(10, 20, 30)
s1.set_location(40, 50, 60)
s2.set_location(70, 80, 90)
print(s0)
print(s1)
print(s2)

We get some nice output, like this:
Rocinante: [10, 20, 30]
Red Dwarf: [40, 50, 60]
USCSS Nostromo: [70, 80, 90]

Perfect!

11.10 Objects are Mutable
When you assign one object to another, you don’t get a second object. You get another reference to the
first object. Just like happens with lists and dictionaries.
Or, another way, doing an assignment with an object does not result in a new object. Both variables are
names for the same object. (Check out Appendix C for details.)
class Forest:
x = Forest()

# Construct a new object

x.antelopes = 4
print(y.antelopes)

# 4, since y and x refer to the same object

This means you can pass objects to functions as arguments, and the function can change the values in the
object’s attributes.
def set_antelopes_to_10(o):
o.antelopes = 10
class Forest:
x = Forest()
x.antelopes = 4
set_antelopes_to_10(x)
print(x.antelopes)

# 10!

Remember that when you call a function, it is assigning the argument into the parameter name, so both
of them refer to the same object. That is, in the code above, o refers to the same object x does, just as if
we’d done an assignment with o = x.

11.11 Objects and None
We’ve already seen that variables can point to the value None to indicate nothing.
This gets commonly used with objects to indicate some “not found” or error condition.
For example, let’s have a list of objects and a function to search them by name. The function should return
the object that has a name attribute that matches the name parameter to the function.
But a question should naturally arise! What if there is no object by that name in the list? What should the
function return? None is a prime candidate here.
class Person:
def __str__(self):
return self.name
def get_person_by_name(person_list, name):

11.12. Testing for Attributes

"""Return a person object with this name, or None if not found"""
for p in person_list:
if p.name == name:
# If we found them, return the object
return p
# If we got here, we didn't find anyone by that name
return None
person_list = [
Person("Annie"),
Person("Beej"),
Person("Chris")
p = get_person_by_name(person_list, "Chris")
print(p)

# "Chris"

p = get_person_by_name(person_list, "Dave")
if p is None:
print("Dave's not here.")

11.12 Testing for Attributes
Sometimes at runtime, you want to see if an object has an attribute or not. Or maybe you have the attribute
name as a string and you want to get or set that attribute on an object.
Three built-in functions help make this happen:
• hasattr() tests to see if an attribute exists on an object.
• getattr() returns the value of an attribute, optionally returning a default value if the attribute
doesn’t exist.
• setattr() sets the value of an attribute, creating it if it doesn’t exist.
This gives you more flexibility in writing your objects, because then you can have optional attributes on
them.
Let’s demo!
class Foo:
f = Foo()
f.bar = 12
print(hasattr(f, "bar"))
print(hasattr(f, "frotz"))

print(getattr(f, "bar"))
print(getattr(f, "frotz", None))
setattr(f, "frotz", 99)
print(f.frotz)

# 99

# 12
# None, since attr frotz doesn't exist

# Just like saying "f.frotz = 99"

I wouldn’t say that these functions get a lot of day-to-day use, but they’re a powerful thing to add to your
toolkit.

11.13 Chapter Project
In case you’ve forgotten, review the chapter project specification at the beginning of this chapter.
Looks like we need to store information about a number of theaters, as well as information about a number
of movies.
And a movie might be showing in multiple theaters simultaneously.
There are a lot of ways to store this data. But since this chapter is all about classes and objects, how about
we use those?
Looks like we should have a Theater class to handle information about each theater.
And a Movie class to handle information about each movie.
And a theater can be showing several movies, so we can give it an attribute that is a list of movies that is
currently showing there.
We’ll also keep a list of all the theaters and a list of all the movies, as well.
Here’s a theater class. We pass a name to the constructor but initialize the movies to an empty list. We
can fill them in later.
class Theater:
"""Holds all the information about a specific theater."""
self.movies = []

and a movie class:
class Movie:
"""Holds all the information about a specific movie."""
def __init__(self, name, duration, genre):
self.duration = duration
self.genre = genre

So far so good.
Now we need to instantiate a bunch of movies so that we can add them to the theaters’ .movie lists.
There are a couple of things we could do.
We could use one variable per movie, but that’s a bit unwieldy. Let’s use some kind of collection, like a
list! We’ll make one for all the movies and all the theaters. Go ahead and add your favorites.
movies = [
Movie("Star Wars", 125, "scifi"),
Movie("Shaun of the Dead", 100, "romzomcom"),
Movie("Citizen Kane", 119, "drama")

11.13. Chapter Project

theaters = [
Theater("McMenamin's Old St. Francis Theater"),
Theater("Tin Pan Theater"),
Theater("Tower Theater")

Take a look in there to see what we’ve done. Notice that movies is a list, and inside the list, while we’re
initializing it, we’re constructing new Movie objects.
And we do the same thing with theaters. It’s a list of newly-constructed Theater objects.
Nextly, we need to associate those movies with the theaters that are showing them.
Remember that each Theater object has a list of movies in its .movies attribute. So we need to append
the movies to that list.
This next bit is a little cryptic, so make sure
# McMenamin's is showing Star Wars and Shaun of the Dead
theaters[0].movies.append(movies[0])
theaters[0].movies.append(movies[1])

What’s that saying?
Well, take it a bit at a time, each line from left to right.
What’s theaters[0]?
If we look in our theaters list, we see that’s McMenamin’s.
And then we get its movie list with theaters[0].movies.
Its movies list is a list, so we can use the .append() list method to add a movie to it. But which movie
to append?
We append movies[0]… and if we look in our movies list, we see that’s Star Wars.
So theater[0] is McMenamin’s, and movies[0] is Star Wars.
That means the first line, above, is saying, “Append ‘Star Wars’ to McMenamin’s list of currently showing
movies.”
And the line below that is saying, “Append ‘Shaun of the Dead’ to McMenamin’s list of currently showing
movies.”
Let’s do some more. What do each of these lines do?
# Tin Pan is showing Shaun of the Dead and Fastest Indian
theaters[1].movies.append(movies[1])
theaters[1].movies.append(movies[2])
# Tower is showing all three
theaters[2].movies.append(movies[0])
theaters[2].movies.append(movies[1])
theaters[2].movies.append(movies[2])

What we’ve done here, effectively, is linked up all the movie objects with their respective theaters.
Notice how movies are listed in multiple theaters. For example movies[0] (Star Wars) is in theaters[0]
(McMenamin’s) and also in theaters[2] (Tower).

Does that mean there are two copies of the Star Wars Movie object? Since it’s in two theaters?
Think carefully!
No, there’s just one! The one we created back on line 15! Since it’s an object, making a “copy” through
assignment (or with .append()) just makes another reference to the same object. There’s only one, but
it’s referred to by two Theater objects. And also referred to by the movies list. So many references to
the same object for good memory savings.
Now we want to print out all the theaters and their showtimes. I’m going to make a helper function here
to print a single theater’s data. We’ll pass in a reference to a theater object, print its name, and then print
the data for all the movies in its .movies list.
def print_theater(theater):
"""Print all the information about a theater."""
print(f'{theater.name} is showing:')
for m in theater.movies:
{m.name} ({m.genre}, {m.duration} minutes)')

And lastly, all we have to do is call print_theater() for all the theaters in our theaters list:
# Main code
for t in theaters:
print_theater(t)

There we have it! (Solution6 .)
Check out how we looked at the problem description (which basically said “theaters show movies, and a
movie might be shown at multiple theaters”) and mapped that into two classes to hold the information per
theater and per movie.
Notice how the classes keep all the information for a theater or movie in a self-contained single object.
Nice and clean, plus it’s easy to pass around a reference to an object if another function wants to use it.
What are some shortcomings?
Those lines where we add the movies to theaters are pretty hard to read. And they refer to things like
movies[0] instead of referring to them by name.
It might be convenient to have some kind of helper function that could lookup the movie object by name,
similar to this:
def find_movie_by_name(movies, name):
for m in movies:
if m.name == name:
return m
return None

# Didn't find it

and use that to clean up the code a bit. And something similar for theaters. (Of course, the more movies
you have, the longer it takes to find one. A dictionary might be a faster data structure to use here.)
But this approach doesn’t handle the case where there are two movies or theaters of the same name. So
another workaround would have to be found there—may be a unique identifier number for each theater
and movie that we’d key off instead?
Now… what about that stretch goal to add movie times to all this?

https://beej.us/guide/bgpython/source/examples/moviesign.py

11.13. Chapter Project

This one might not seem tricky at first, but it comes to get you with the details.
You might think, no problem, we’ll just add times to the Movie class, right?
Yes, but… Different theaters are all showing the same movie. But at different times.
If you think about it, the times a movie is showing is more data attached to the theater, and not really data
attached to the movie. It would make no sense for Disney to say, “Coming this Winter: Star Wars Episode
47, at 8 pm and 10 pm!” They don’t know when theaters are going to show the movie!
Okay, then, let’s attach the times to the Theater class.
But this presents us with another problem. How do we associate a set of times with a particular Movie
object? We need a way in code to show that they’re linked so that we can print them out together.
We can do this with a new class—call it MovieTime—that contains both a reference to a movie and a list
of times that movie is showing. And then we can add instances of this new class to the Theater objects.
In this way, if we have a reference to a Theater, we can look up its list of MovieTime objects, and then for
each of those, look up the Movie object reference contained within and print it out along with the times.
We’re shimming a new class in the middle with both the movie and the showtimes. This is how we can
bundle that together.
Let’s add that new class that holds both a reference to a movie as well as the times it’s showing:
class MovieTime:
"""Holds a movie and the times it is playing"""
def __init__(self, movie, times):
self.movie = movie
self.times = times

Then we need to modify the Theater class to have a list of MovieTime objects instead of Movie objects.
class Theater:
"""Holds all the information about a specific theater."""
self.movietimes = []
# <-- Now this is MovieTime objects

And now when we construct our lists of theater information, we need to add new MovieTime objects to
the list in the theater. The MovieTime objects contain references to the movie being shown, as well as a
list of showtimes.
# McMenamin's is showing Star Wars and Shaun of the Dead
theaters[0].movietimes.append(MovieTime(movies[0], ["7pm", "9pm", "10pm"]))
theaters[0].movietimes.append(MovieTime(movies[1], ["5pm", "8pm"]))
# Tin Pan is showing Shaun of the Dead and Fastest Indian
theaters[1].movietimes.append(MovieTime(movies[1], ["2pm", "5pm"]))
theaters[1].movietimes.append(MovieTime(movies[2], ["6pm", "8pm", "10pm"]))
# Tower is showing all three
theaters[2].movietimes.append(MovieTime(movies[0], ["3pm"]))
theaters[2].movietimes.append(MovieTime(movies[1], ["5pm", "7pm"]))
theaters[2].movietimes.append(MovieTime(movies[2], ["6pm", "7pm", "8pm"]))

Lastly, when we print it out, we need to extract the movie and the show times from the MovieTime object
so we can print them:
def print_theater(theater):
"""Print all the information about a theater."""
print(f'{theater.name} is showing:')
for mt in theater.movietimes:
m = mt.movie
t = " ".join(mt.times) # Make string of times separated by spaces
{m.name} ({m.genre}, {m.duration} minutes): {t}')

And that’s that!
Output now looks like this:
McMenamin's Old St. Francis Theater is showing:
Star Wars (scifi, 125 minutes): 7pm 9pm 10pm
Shaun of the Dead (romzomcom, 100 minutes): 5pm 8pm
Tin Pan Theater is showing:
Shaun of the Dead (romzomcom, 100 minutes): 2pm 5pm
Citizen Kane (drama, 119 minutes): 6pm 8pm 10pm
Tower Theater is showing:
Star Wars (scifi, 125 minutes): 3pm
Shaun of the Dead (romzomcom, 100 minutes): 5pm 7pm
Citizen Kane (drama, 119 minutes): 6pm 7pm 8pm

(Solution7 .)
Aside from the improvements noted in the last “Looking Back”, we might be able to fix this one up a bit
with respect to how it handles times.
Right now, we’re storing the times in strings, but it would be better to store them as datetime objects
from the Python standard library8 .
This would enable us to do date math with the showtimes, e.g. to tell the user how many minutes until the
next showing.

11.14 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. Write a class that describes a car. What are the attributes the class would have? What methods?
(There’s no one right answer here—think freely.)
(Potential Solution9 .)
2. Write a class called SubwayCar that represents a single train car on a subway train. What attributes
would it have? What methods?

https://beej.us/guide/bgpython/source/examples/moviesign2.py
https://docs.python.org/3/library/datetime.html
https://beej.us/guide/bgpython/source/examples/ex_car.py

11.14. Exercises

Add a name attribute to the class so you can name the cars.
Add a next attribute to the class that points to the next SubwayCar in the train. This should refer
to the next SubwayCar instance, or to None if it’s the last car.
Have a variable, head, that points at the first subway car.
This way you can “hook together” a train, like this (pseudocode):
head = SubwayCar("Engine")
car1 = SubwayCar("Passenger car 1")
car2 = SubwayCar("Passenger car 2")
car3 = SubwayCar("Passenger car 3")
head.next = car1
car1.next = car2
car2.next = car3
car3.next = None

# End of the train

Now have a variable, location, that is your current location in the train. Start it at the head:
location = head

Then write a loop to “walk” the location variable down the train (by following the next pointers),
printing out the name of each car as it goes, until it reaches the end.
This famous data structure is actually called a linked list. But I disguised it as a subway train to be
less intimidating.
3. Make a Room class that has a name attribute.
Also give it n_to, s_to, w_to, and e_to attributes. These will refer to the rooms that are north,
south, west, and east of a particular room. None in one of these attributes means there’s no exit in
that direction.
For example, two rooms that are hooked up west to east (and vice versa) could be constructed like
this:
room0 = Room("Cobble Crawl")
room1 = Room("Debris Room")
room0.e_to = room1
room1.w_to = room0

# east from Cobble Crawl to Debris Room
# west from Debris Room to Cobble Crawl

Make 5-6 rooms and hook them up in various directions.
Now have a variable, location, that is the current player location in the world. Start it pointing to
the starting room, e.g.:
location = room0

Next, get player input of either n, s, w, or e, and change location to the room in the specified
direction.
If there’s no room there, print the string "You can't go that way.".
If the user enters q, quit the game.
(Solution11 .)

https://beej.us/guide/bgpython/source/examples/ex_subway.py
https://beej.us/guide/bgpython/source/examples/ex_adv2.py

11.15 Summary
All kinds of goodies in this chapter! We dipped our toes in the magical world of classes and objects, which
is the beginning of learning the world-famous Object-Oriented Programming (OOP).
We saw how we could concisely bundle data and functionality into a single convenient class and then
make objects from the class, using the class as a blueprint.
And, importantly, we learned that multiple variables can refer to the same object—that objects are not
copied when you make an assignment.
Finally, we touched on the idea that None could be used to indicate “absence of an object”.
Though objects and classes form the basis for OOP, we really haven’t touched on what that means yet.
But that’s a story for another chapter.

Chapter 12

Importing Modules
12.1 Objective
• Learn what a module is
• How to find modules to use
• How to import modules

12.2 Chapter Project Specification
Open a ZIP archive and print out a directory of the files that are in there, their size in bytes, and the time
they were last modified.
If you’re unfamiliar with the ZIP format, it’s a way to take multiple files and compress them into
a single file, called a ZIP archive. The table of contents shows what files exist within the ZIP file.
They can be recovered later by extracting them, but we’re not going to do that for this project.
An example ZIP file can be found in the examples directory1 .
Output should be:
File Name
hello.txt
world.txt

Modified
2020-02-09 15:12:20
2020-02-09 15:12:24

Size

(Spacing in the above example was changed to fit the margins—you don’t have to match spacing exactly.)
Keep this project in mind as we go through this chapter’s material.

12.3 What and Why of Modules
Modules are pieces of self-contained code that you can import into your code and use. Think of them
as prefabricated building blocks that you can put together in your project to accomplish tasks without
needing to write out the details yourself.
This is actually a really powerful concept that you have at your disposal. Tons of code have already been
written, and you can just use it!
Do you want to compute anything to do with date and time? Python has a module for that.
Do you want to draw graphics on the screen? Python has a module for that.
Do you want to generate animated GIFs from a sequence of stills? There’s a module for that.

https://beej.us/guide/bgpython/source/examples/example.zip

Do you want to download an image from a URL and save it to disk? There are modules for that.
There are tons of modules built-in to Python_2 . Give the list a skim so you know what’s there, but you
don’t need to drill down at all unless you’re dying of curiosity over a particular module.
Are there are zillions of third-party modules3 you can use, as well.
You can import as many modules as you want into an individual project.

12.4 Using a Module
You declare your intent to use a module with the import keyword. We’re going to do an example with
the built-in sys module4 , which contains all kinds of useful information about the system.
Let’s see what platform Python thinks we’re running.
But first, some syntax.
When using a function or variable inside a module, you use the dot operator to get the variable, similar to
how you get attributes from objects. In fact, very similar. When you import a module, Python gives you
an object by that name with functions and data attached to it as attributes.
Step one is to import the module. Then you can access the members of that module.
For example, if we:

we’ll end up with an object called sys with attributes that you can access!
Digging through the documentation for the sys module, we find there’s something called sys.platform
that looks really promising.
Let’s print it!

# Gets us access to all the sys goodies

print(sys.platform)

What does it output for you?
For me, on Linux or Windows WSL, it prints “linux”. On Windows, it prints “win32”.
Notice there was nothing we had to do ourselves to make this determination. (Which is good, because it
would be a pain to write!) Fortunately, the sys module had everything we needed right there.

12.5 Command Line Arguments
I’ve been hiding something.
In terms of how you run Python programs from the command line.
It turns out you can add things after the Python program name.
Say what?

https://docs.python.org/3/library/index.html
https://pypi.org/
https://docs.python.org/3/library/sys.html

12.6. Printing Calendars

Let’s say you have a program called foo.py. You can run it like this, of course:
python foo.py

You can also run it like this:
python foo.py something another antelopes

Those extra words after the program name are called command line arguments.
But why would you do this?
So you can control the behavior of the program from the command line! When you run it, it’s nice to be
able to influence behavior this way instead of having to call input() with prompts and everything else.
But how do you get those extra command-line arguments?
Our good friend sys module can help us again here.
The variable sys.argv is a list that contains the program name followed by all the command line arguments.
Run this program with a variety of command-line arguments and see what it outputs:
print(sys.argv)

Example output:
$ python foo.py
['foo.py']

$ python foo.py aa bb cc
['foo.py', 'aa', 'bb', 'cc']

So at runtime, we can look in sys.argv and make decisions about what we want to do!
Let’s put it to use in the next section.

12.6 Printing Calendars
Print a calendar for any month and year!
Your first thought should have been something like, “Holy cow, Beej—how am I supposed to figure all
that out? Was November 12, 1955, a Friday or a Saturday? I don’t know!”
Luckily, we don’t have to know! There’s a module, calendar, that we can use to do all the dirty work
for us.
If you pop to the instructions5 , you’ll see pages and pages of material. It’s intimidatingly impenetrable.
Reading docs is one of the things you’ll get better at with practice. At first, it’s a bit of a slog, but you’ll
improve.
First of all, start skimming down and looking for anything that has to do with text calendars. If it doesn’t
seem to have anything to do with that, keep skimming.
I’ll wait. Go for it.

https://docs.python.org/3/library/calendar.html

Spoilers coming! Really go scan them and find it yourself! Practice makes perfect!
OK—so hopefully you got about halfway down the page and found the TextCalendar class. It says:
This class can be used to generate plain text calendars.
That sounds promising. In fact, just below that, it mentions there’s a prmonth() method on the class that
you can use to print a calendar for a given month and year.
Perfect!
We can code it up like this:
tc = calendar.TextCalendar()
tc.prmonth(1970, 1)

# Make a new TextCalendar object

# Print January 1970

and this will present us with a nice text calendar that looks like this:
January 1970
Mo Tu We Th Fr Sa Su
1 2 3 4
5 6 7 8 9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31

We found what we wanted halfway down the documentation, so we’re good right?
Well, it might be worth skimming the rest of the documentation just to see what else the calendar module
can do.
And, in fact, if we look down farther, the docs say:
For simple text calendars this module provides the following functions.
And one of those functions is prmonth(). We can just call it directly without making an intermediate
object!
calendar.prmonth(1970, 1)

gets us the same output as before—and it’s simpler!
Let’s mod this. Right now, it’s hardcoded to print out a January, 1970 calendar. Let’s change it so that
you could run it from the command line and pass in the arguments you need, like this:
python cal.py 1970 1

or
python cal.py 1955 11

12.6. Printing Calendars

to print out the January, 1970 or November, 1955 calendars, respectively.
That makes it more flexible—we get all kinds of new behavior without changing the code. Much more
usable.
We saw in this section how to print a calendar, and we saw in the previous section how to get command-line
arguments into a list.
Let’s get the year and month from sys.argv and pass them into calendar.prmonth().
Let’s do exactly that:
year = sys.argv[1]
month = sys.argv[2]

When we run it with:
python cal.py 1970 1

though, something bad happens:
File "cal.py", line 7, in <module>
File "/usr/lib/python3.8/calendar.py", line 350, in prmonth
print(self.formatmonth(theyear, themonth, w, l), end='')
File "/usr/lib/python3.8/calendar.py", line 358, in formatmonth
s = self.formatmonthname(theyear, themonth, 7 * (w + 1) - 1)
File "/usr/lib/python3.8/calendar.py", line 341, in formatmonthname
s = month_name[themonth]
File "/usr/lib/python3.8/calendar.py", line 59, in __getitem__
funcs = self._months[i]
TypeError: list indices must be integers or slices, not str

Yikes!
Let’s take this error apart and see if we can tell what’s up. It’s not really being that forthcoming, is it?
Start at the top. It tells you what file the error is in on the first line: cal.py on line 7. And it shows us
the line below that… it’s where we’re calling calendar.prmonth().
But that looks fine, right?
Going farther down, it’s showing us the call stack, that is, the path of function calls that culminated in the
error. And those are in the calendar.py file, which is the calendar module.
We didn’t even write that code! How dare there be an error in it!
Well, it’s not an error—it’s the module telling us, in a roundabout way, we’re not using it right.
Finally, at the bottom, we see the error itself: TypeError. And the description:
TypeError: list indices must be integers or slices, not str

We don’t have any lists in our code, so what’s it even talking about lists for? Well, who knows how the
stuff is implemented in the library, but scan that error message and see if there’s anything in there that
hints toward what we have to do.
It says “must be integers or slices, not str”. Hmmm.
When we called it with
calendar.prmonth(1970, 1)

it was fine, but now it’s not? Wait—when we called it that way, we passed integers in… but now we’re
passing in sys.argv[1]. Is that an integer?
There’s a built-in function called type() we can use. Let’s add this code:
year = sys.argv[1]
month = sys.argv[2]
print(type(year))
print(type(month))

Running it again, we get the same error, but before that, we see some output:
<class 'str'>
<class 'str'>

That’s telling us sys.argv[1] and sys.argv[2] are strings! And we were passing ints before. Let’s
convert those to ints before we pass them in. The error message did say we needed ints, not strings.
year = int(sys.argv[1])
month = int(sys.argv[2])

And now when we run it:
$ python cal.py 2038 1
January 2038
Mo Tu We Th Fr Sa Su
1 2 3
4 5 6 7 8 9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

Whee!
Not too shabby. What else can we make better?
It’s time to think like a villain. What can you do to this program as a user to break it?

12.7. Importing Specific Attributes

How about passing in a negative year? (Hey, that works!)
What about a negative month?
That crashes with a big ugly stack trace.
We could fix that by checking the values of month and making sure the user-specified 1-12, or print an
error otherwise. Something like this:
if month < 1 or month > 12:
print("Month must be 1-12!")
sys.exit() # call this to stop running the program here!

What if the user specifies a year, but no month? Another crash.
We could check the length of sys.argv and make sure it was the right value (namely 3, since it includes
the name of the program along with the year and month). If it wasn’t, we could print an error message
and exit.
Here’s the complete code with error checking:
if len(sys.argv) != 3:
print("usage: cal.py year month")
sys.exit() # stop running
year = int(sys.argv[1])
month = int(sys.argv[2])
if month < 1 or month > 12:
print("Month must be 1-12!")
sys.exit() # stop running

Ship it!

12.7 Importing Specific Attributes
There’s an alternate syntax for import that you can use to bring attributes from a module directly into the
global namespace.
What do I mean by that?
Well, the upshot is that if you’re tired of typing the module name followed by a dot to access a particular
function or piece of data, you can bring that in to use directly, instead.
Let’s do an example.
The time modules have a function called ctime() that prints the time out in a classic format.
import time
print(time.ctime())

# "Sun Feb

9 13:37:00 2020"

But if you’re going to call it repeatedly, it might make the code look worse to have “time.” all over the
place.
We can do this, instead:

# Bring in ctime() explicitly:
from time import ctime
print(ctime())

# Look, ma! No "time."!

If a module has multiple things you want to import, you can bring them in with a comma list:
# import all three!
from time import ctime, localtime, monotonic

Or, if you’re feeling bold, you can import it all!
from time import *

But I generally recommend against that. It takes time for Python to do it, and if you only need a few things,
pick them explicitly.
Furthermore, a lot of devs rely on the module name being a visual cue that we’re talking about a function
in a module, here. If we come across some code that says:
print(ctime())

Is that a function that the programmer-defined, or is it something that we from imported from somewhere? By putting the name of the module first, it helps mitigate that ambiguity:
print(time.ctime())

So in general, I don’t use import from unless it makes the code decidedly more readable to do so.
Remember: readable code is high-value code!

12.8 Learning All The Modules
If you check out the list of modules6 you get with Python, it looks pretty intimidating. I mean, there’s a
lot there.
How do you deal with it?
This is one of the toughest parts of learning a new language: learning the standard library (the bundled
modules) that comes with it. Each language has its own way of doing things, and those ways are legion.
Step one: give up now. You’re not going to memorize all this.
The best thing to do is skim it at the level of the contents. Just try to remember that there exists a module
for dealing with times. And a module for dealing with calendars. And for dealing with network communication. And so on.
Don’t worry about the details. You can always look them up later. But if you don’t know that there even
is a module that handles reading and writing of CSV7 files, then you won’t know to look it up when you
need it.
All devs, even experienced ones, look things up. All the time.

https://docs.python.org/3/library/index.html
https://en.wikipedia.org/wiki/Comma-separated_values

12.9. Chapter Project

12.9 Chapter Project
If you need to, review the specification at the top of the chapter.
You might be thinking, “This is kind of a big jump, don’t you think, Beej? I mean, we haven’t even talked
about how to open a file, and here you want me to somehow gaze magically inside a ZIP file and extract
the contents?”
Well… yes. By “magically”, though, I mean something in particular. As you might have guessed, there’s
a module for opening ZIP files8 . We can import this and make it do the heavy lifting for us!
Easy, right?
Well, not so fast. If you follow the link to the docs, above, you’ll find pages and pages and pages of
material with no clear indication of where to start. (Bring up that URL now, because we’re about to go
through it.)
It’s nice that the module is there for us to use, but we have to sift through all this to use it?
Pretty much.
There is a shortcut that you can take. You can Google for “python print zip archive example”, and you’ll
get some hits. This can be super powerful, and we do this kind of thing all the time in development, but
for this project try not doing this.
Let’s just look at the docs and try to make sense of them, because this is a skill in itself, and is worth
practicing.
This one’s pretty straightforward. We have a ZIP file from the examples, and we want to print out the files
that are compressed within it.
In fact, this can be done in three lines of Python. Just… what three lines?
We just have to plan it out.
Here’s where we start digging. Start skimming the docs, and take note of anything that sounds remotely
like what you want to do. Ignore anything you don’t understand. We want to get information about the
contents of the ZIP file.
Keep your eyes peeled for example code.
Let’s skim!
I want you to come up with a list of functions or data in the docs that sound promising. As we learned
earlier in this chapter, it can pay to skim the entire document so you don’t miss anything.
Go for it.
I’ll wait.
I’m about to share my list of candidates, now, so run get yours to see how it compares.
Spoiler alert!
Here are things that I thought sounded like they might get me my table of contents for the ZIP file.
Here are the first few I found. As I go, I’m keeping track in my head about which one sounds the most
promising:
ZipInfo
# Class containing info about a ZIP file member
ZipFile.getinfo() # Return a ZipInfo object for a file member
ZipFile.infolist() # Return ZipInfo objects for all file members
ZipFile.namelist() # Return list of file members by name

https://docs.python.org/3/library/zipfile.html

Let’s keep looking.

ZipFile.open()
# Access member of the archive
ZipFile.printdir() # Print a table of contents to sys.stdout (!!!!)

Now that sounds promising.
sys.stdout is a file stream that represents what we call standard output. For now, when you hear
stdout or standard output, replace it with “the screen”.

So printdir() prints the table of contents to the screen, which sounds exactly like what we’re after.
But let’s keep looking, just to be sure.
ZipFile.read()
ZipFile.filename

# Read bytes from a member of the archive
# Name of the ZIP file

ZipInfo.filename
ZipInfo.date_time
ZipInfo.file_size

# Name of an archive member
# Modification time of an archive member
# File size of an archive member

And that’s the end of my skim. How did it compare with your list?
Now… Those last three look interesting. If we could get the ZipInfo object for each item in the archive,
we could use those attributes to print out our directory listing.
But that sounds like it’s just going to get us what the printdir() function would do, and printdir()
looks easier to use.
Maybe we’re wrong, but let’s pursue printdir(), and if it doesn’t pan out, we can go to Plan B and try
the ZipInfo fields.
So… How do we use it? Let’s read the docs again.
{.py} ZipFile.printdir()

Print a table of contents for the archive to sys.stdout.
So we need a ZipFile object that represents the ZIP file example.zip.
That is, we know the ZIP is named example.zip, and we need to go from that to a ZipFile object. Once
we have the ZipFile object for example.zip, we can call printdir().
OK. So how do we do that? Time to get back to skimming docs! How do I create a ZipFile object?
Skim now!
We saw earlier this was the class:
zipfile.ZipFile

And a bit farther down, we have:

{.py} class zipfile.ZipFile(file, mode='r', compression=ZIP_STORED,
allowZip64=Tru
Open a ZIP file, where file can be a path to a file (a string), a file-like object or a path-like object.

Recognize that? It’s a constructor!! That’s what we want! We want to construct a ZipFile object from
the string example.zip, and that’s exactly what this does for us.
Continuing down, I’m not seeing anything else that helps us make a ZipFile object, so let’s pursue this
plan.
1. Import the ZIP file functionality.
2. Create a ZipFile object from example.zip.
3. Print the table of contents with printdir() on that ZipFile object.

12.10. Exercises

Let’s go!
import zipfile

Check.
Okay—now we need to do something with that ZipFile constructor. Recall that since it’s in the zipfile
module, we have to refer to it as zipfile.ZipFile when we use it.
But, man, the docs are thick for the constructor. What is all that stuff?
Remember that any keyword argument with something after an equal sign is optional. We don’t have to
pass arguments for mode, compression, or any of those.
What we do have to pass in in the file, which is the filename to read. Let’s do that, and we’ll save the
newly-constructed object in the variable zf:
# Important: make sure example.zip is in the same directory
# as this program!
zf = zipfile.ZipFile('example.zip')

Great!
And now that we have that object, let’s print its directory:
zf.printdir()

And that gives us this output:
File Name
hello.txt
world.txt

Modified
2020-02-09 15:12:20
2020-02-09 15:12:24

Size

Yes!
What else can we do with this to improve it?
One easy thing to do would be to use sys.argv to get the name of the archive to print out the listing for.
Another thing that you might have noticed in the docs is there is all kinds of additional info about members
of the archive. In addition to name, time, and size, there’s also comments, compression type, compressed
size, CRC9 , and other things to print.
By adding up all the uncompressed sizes, the compressed sizes, and then dividing one by the other, you
can get the compression ratio—how much smaller the files got by putting them in the archive.
(Solution10 , example zipfile11 .)

12.10 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of

https://en.wikipedia.org/wiki/Cyclic_redundancy_check
https://beej.us/guide/bgpython/source/examples/zipdir.py
https://beej.us/guide/bgpython/source/examples/example.zip

Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. Every process running on your system is represented by a numeric process ID. When you run a
program, it gets a unique process ID (PID) that exists until the process exits.
Write a program to print out its current process ID. Check out the docs for the os module12 for hints.
You might want to search that page for anything to do with “current process ID”… :)
Don’t forget to import the module!
When you run it, run it multiple times to see that the PID changes from run to run.
(Solution13 .)
2. Write a program to generate random UUIDs. A UUID (pronounced “YOU-id”) is a random string
of letters and digits that looks like this:
54c3bfab-fd9f-4f4a-96db-8f9fccff88cd

(Well, yours will be different because it’s very, very, very unlikely that you’ll ever generate the same
random one twice.)
It’s short for Universally Unique ID. That means it’s unique in the universe, forever. Very, very
probably.
Using the UUID module14 , generate a random UUID.
Actually, generate several. Have the user enter a number on the command line. Generate that many
UUIDs.
For example:
$ python ex_uuidgen.py 5
8a8128fb-941a-4a2f-8982-75273d7c0048
5fd7d64e-8491-4b61-82b0-f9438e7195dc
4012f3ed-f6d7-40b5-9031-961ee06a30ad
86c71566-014f-4e36-a55b-b18d677624b2
2c1e5b3f-f0de-4186-80c5-767628c437b3

Eagle-eyed readers might notice that the 13th digit is always 4. That’s because there are different
types of UUIDs, and this digit indicates the type. (This case it’s type 4, meaning random. Except
for the 4.)
You might also have noticed that, in addition to the numerals, only the letters “a” through “f” make
an appearance. Surprise! UUIDs, except for the hyphens, are actually numbers! They’re written in
a base-16 numbering system called hexadecimal. More on that in another chapter.
UUIDs are good any time you want to create an ID that you can be confident isn’t already used by
anyone, anywhere.
You might wonder how you can be sure? I mean, there’s a chance someone else will choose that
number, right?
Yes, there is a chance. It’s:
1 in 21,267,647,932,558,653,966,460,912,964,485,513,216.
For comparison, the odds of winning the Mega Millions lottery jackpot are:
1 in 258,900,000.

https://docs.python.org/3/library/os.html
https://beej.us/guide/bgpython/source/examples/ex_printpid.py
https://docs.python.org/3/library/uuid.html

12.10. Exercises

So unless you’re worried about winning the lottery jackpot 82,146,187,456,773,479,978,605,303,068
times, you shouldn’t be worried about someone choosing a duplicate UUID.
And I wouldn’t say I’m worried I’d win the lottery that many times. More like disappointed.
(Solution15 .)
3. You’re given the following string in Python—go ahead and paste it into a new source file:
matrix = """The Matrix is everywhere. It is all around us. Even
now, in this very room. You can see it when you look out your window,
or when you turn on your television. You can feel it when you go to
work, when you go to church, when you pay your taxes."""

That’s a big multi-line string.
I want you to print it out, but reformat it so that it’s only 40 columns wide, maximum:
The Matrix is everywhere. It is all
around us. Even now, in this very room.
You can see it when you look out your
window, or when you turn on your
television. You can feel it when you go
to work, when you go to church, when you
pay your taxes.

There’s a handy module called textwrap16 that has some functionality that you can use to make
your life easier.
(Solution17 .)
4. Print a random integer between 0 and 1000, inclusive.
It should print a different number every run, for example:
$ python ex_rand1000.py
601
$ python ex_rand1000.py
374
$ python ex_rand1000.py
824

See the random module18 for help.
(Solution19 .)
5. Print out the current date in the form:
Mon Feb 10

See the time module20 for help.
In case it happens to come up, locale refers to the human language spoken in the physical location
where the program is running, e.g. English or French or Chinese or Esperanto, etc.
(Solution21 .)

https://beej.us/guide/bgpython/source/examples/ex_uuidgen.py
https://docs.python.org/3/library/textwrap.html#textwrap.TextWrapper
https://beej.us/guide/bgpython/source/examples/ex_wrap.py
https://docs.python.org/3/library/random.html
https://beej.us/guide/bgpython/source/examples/ex_rand1000.py
https://docs.python.org/3/library/time.html
https://beej.us/guide/bgpython/source/examples/ex_curdate.py

6. Write a program called zipextract.py that extracts files from a ZIP archive.
The command line should accept the name of the ZIP file as the first argument, and, optionally, the
name of the file in the archive to extract.
If the second argument is left off, extract all the files.
To extract all files:
python zipextract.py example.zip

To extract a specific file, run:
python zipextract.py example.zip hello.txt

(Solution22 .)

12.11 Summary
Modules make the world go around… a lot more easily than it would have if you had to write all that stuff
yourself.
In this chapter, we learned what modules were and how to find them in the official Python docs.
Also, we learned how to import entire modules and individual components from within modules.
Later we’ll learn to write and import our own modules.

https://beej.us/guide/bgpython/source/examples/ex_zipextract.py

Chapter 13

Reading Files
13.1 Objective
• Understand what a file is
• Be able to open and close a file
• Be able to read and write from files

13.2 Project
Write a line editor.
Back in the day, before terminals were very capable and before we had nice editors and IDEs like we do
today, people used line editors. These were bare-bones file editors that used simple commands to edit
files.
For example:
$ python lineedit.py foo.txt
> a 1
This is some text that I'm appending to the file.
And some more.
2: This is some text that I'm appending to the file.
3: And some more.
> e 3
And really some more.
2: This is some text that I'm appending to the file.
3: And really some more.
> d 2
2: And really some more.
> w
> q

In the example, everything following a > prompt is a line editor command.

In order:

1. list the file starting from the given line.
2. append multiple lines of text after the given line (until the user types . on its own line).
3. list the file from line 1.
4. edit line 3.
5. list the file from line 1.
6. delete line 2.
7. list the file from line 1.
8. write the file to disk.
9. quit.
The commands are:
• list: list 10 lines (or up through the last line if fewer than 10 lines are remaining) starting from the
line the user specifies. If the user specifies a number less than 1, assume they entered 1.
• append: append multiple lines after the line the user-specified. Read lines one at a time, storing
them in turn, until the user enters a sole period (“.”) on a blank line.
• delete: Works like list, except deletes the line.
• edit: Edits a single line, replacing it. If the line is out of range, an error message should be printed.
• write: Saves the file to disk. If the filename wasn’t specified on the command line, the user must
specify a filename after the w.
• quit: exit the editor without saving the file.
From the user standpoint, lines are numbered starting from 1.
Keep this project in mind while you read through this chapter.

13.3 What are Files, Anyway?
We’re sort of used to them, already, right? I mean, you have MP3 files, GIF files, or MPEG files…
“So this guy comes up to me and he says, ‘What do you do?’
“ ‘Well,’ I says, ‘I work on computers.’
“An’ he says, ‘Wow—if you work on computers? Do you use files?’
“An’ I says, ’Do I use files? Why I use… ARJ files, GIF files, JPEG files, JAR files, RAR files,
PNG files, DOC files, MPEG files, TXT files, PUB files, PY files, LOG files…
“ ‘An’ I use files, files, files, files, files, files, files, files, files, files, files, files, files, files, files,
files, files, files, files, files, files, files, files… files all the time!’—Take shots! 11!”
—With sincere apologies to Jughead and The Hockey Song.
We’re going to take a look at files from a high level, look at how to do some basic operations on files, and
we’ll leave it there for now. Later we’ll revisit some more advanced techniques.
But what is a file actually?
Let’s start by saying a file is a collection of characters stored in a particular order on your disk or SSD on
your computer.
We’ve already seen a bunch of examples—our Python source files that we’ve been saving this whole time!
They’re sequences of characters stored in a specific order and saved on disk.
Now, files are actually far more general-purpose than that, but let’s start with this. We can always chase
the rabbit further down the rabbit hole later.
For this chapter, we’re going to use a type of file commonly called a text file. This is also just a sequence
of characters, just like a Python source file. But text files can be anything. Love letters, The Gettysburg

13.4. Reading Files, The Classic Way

Address, the lyrics for the latest hit single by that one band, the number 𝜋 computed to a million decimal
places, or whatever.
Technically, Python source files are text files, as well, but they’re a specific type. All Python source
files are text files, but not all text files are Python source files.
As a human, you can identify the type of file by its extension. That is, the part of the filename after the
last period in the file.
For Python, we’ve been using .py (pronounced “dot-pie”) as the extension, identifying this file as a Python
source file.
General text files use .txt (“dot-text”) as an extension. And you can make them with the same editor
you’ve been using to write Python code.
Go ahead and open a new file, and call it wargames.txt. Enter some text into it, like this:
What he did was great! He designed his computer so that it could learn from its own mistakes. So,
they’d be better the next time they played. The system actually learned how to learn. It could teach
itself!
Now, the question is, how do you run a Python program that reads this file in, and stores or manipulates
the data in memory?

13.4 Reading Files, The Classic Way
In many programming languages, there are three steps to reading a file:
1. Open the file for reading.
2. Read data from the file.
```
