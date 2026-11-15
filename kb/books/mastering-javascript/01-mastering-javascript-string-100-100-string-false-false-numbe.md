---
id: mastering-javascript-01
title: "Mastering JavaScript — String(100); // \"100\", String(false); // \"false\", Number(\"2000\");…"
slug: mastering-javascript-01-mastering-javascript-string-100-100-string-false-false-numbe
source: "Mastering JavaScript — The Complete Guide"
sourceSection: "1. String(100); // \"100\", 1. String(false); // \"false\", 1. Number(\"2000\"); // 2000, 1. Number(true); // 1 2 Number(false); // 0, 1. Number(\"one\"); // NaN 2 Number(\"1,000\"); // NaN 3 Number(\"1 1\");, 1. Boolean(100); // true 2 Boolean(\"name\"); // true 3 Boolean(\" \"); // true, a, 1. Boolean(0);, 1. Num"
track: javascript
tier: premium
tags: [javascript, programming, advanced]
summary: "And let’s convert a Boolean false into a string literal “false”. Covers 9 sections: String(100); // \"100\", String(false); // \"false\", Number(\"2000\"); // 2000."
---
# Mastering JavaScript — String(100); // "100", String(false); // "false", Number("2000");…

## 1. String(100); // "100"

And let’s convert a Boolean false into a string literal “false”.

## 1. String(false); // "false"

Within a variable, we can convert our value to a string like so:

1 let name = 5000;

// 5000 2 name = String(name); // "5000"

We can check the data type of any value, using typeof, for example:

1 typeof name; // string

Alternatively, we could do this more concisely like so:

1 let name = 5000; 2 name.toString(); // "5000" 3 4 (5000).toString(); // also
returns "5000"

Regardless of the method we choose, by using String() or n.toString(), we can
explicitly convert our data into string values.

Converting Values to Numbers

When the time comes to convert values into numbers, we use the Number()
method in a similar manner:

## 1. Number("2000"); // 2000

We’ve turned our string “2000” into the number 2000.

We could also convert a Boolean:

## 1. Number(true); // 1 2 Number(false); // 0

It should be noted however, that we cannot convert our data type into a number
if there are any characters or spaces within the string! If this were to be
attempted a NaN (not a number) would be returned.

## 1. Number("one"); // NaN 2 Number("1,000"); // NaN 3 Number("1 1");
// NaN 4 Number("01-01-19"); // NaN

Converting Values to Booleans

We use Boolean() to convert strings and numbers into Boolean.

If any value is present, it will be converted to true:

## 1. Boolean(100); // true 2 Boolean("name"); // true 3 Boolean(" "); // true, a
space is considered a value

If the value is considered empty (0, an empty string (""), undefined, NaN or
null), it will return false:

## 1. Boolean(0);
// false 2 Boolean("");
// false, an empty string (with no
sp\ 3 ace) 4 Boolean(undefined); // false 5 Boolean(NaN); // false 6
Boolean(null); // false

Converting numbers and strings into Boolean values is a powerful way to start to

introduce logic into our programming. For instance, we could detect a missed
required field on an input form, if the Boolean returns false.

The Basics of JavaScript Strings

JavaScript strings are used for storing and manipulating text — they can consist
of a sequence of letters, numbers and/or symbols. In this chapter, we’re going to
first take a look at how we create strings, concatenate strings and we’ll see some
fundamental syntax rules that apply to strings.

Creating Strings

There are three ways to write a string — with single quotes ‘ ’, double quotes “ ”
or back-ticks ` `. Let’s assign some strings to a myString variable with each
technique:

1 let myString = 'I am a string!'; 2 let myString = "I am a string!"; 3 let myString
= `I am a string!`;

There is no syntactic difference between single or double quotes, you’re free to
go with your preference — however it’s a good idea to stay consistent within
your projects! However, back-ticks (known as template literals), have a few
super powers which we’ll be taking a look at later in the article.

And of course the reason we assign strings to variables, is so they’re much easier
to work with & manipulate within our programs!

Concatenation

We use string concatenation to combine two or more strings together to form a
new string. We combine our strings using the + operator.

1 const firstName = 'Barry'; 2 const secondName = 'Dingus'; 3 4 const concat =
firstName + secondName; 5 6 console.log(concat); 7 8 // output: BarryDingus

Here we’ve combined two strings stored in separate variables into a new concat
variable. However, you’ll notice we have no space between the names in our
new variable as concatenation joins strings end to end. To add the space, use a
pair of quotes ‘ ’ like so:

1 const concat = firstName + ' ' + secondName; 2 3 console.log(concat); 4 5 //
output: Barry Dingus

Now we have our desired output!

Concatenation with Template Literals

When we use template literals ` `, we no longer need to use the + operator to
concatenate. We include expressions and variables within our strings using the
${} syntax . For example,

1 const fullName = 'Barry Dingus'; 2 const location = 'Mullet Creek'; 3 4 const
concat2 = `Welcome ${fullName}! We think ${location\ 5 } is alright!`; 6 7
console.log(concat2); 8 9 // output: Welcome Barry Dingus! We think Mullet
Creek is\ 10 alright!

Template literals are much easier read & write.

Syntax Rules

Using Quotes and Apostrophes

Knowing that quotes “ and apostrophes ‘ are interpreted by JavaScript to mark
where a string begins & ends. How can we include them within a string? For
example:

1 const greeting = 'G'day Barry!'; 2 3 console.log(greeting); 4 5 // Uncaught
Syntax Error: Unexpected identifier

The additional apostrophe in ’G’day Barry!' is the problem. JavaScript thinks ‘G’
is the string and attempts to parse the rest as code, thus generating the error.

Using quotes within a string would cause the same error:

1 const quote = 'Barry said 'I lost my keys''; 2 3 console.log(quote); 4 5 //
Uncaught Syntax Error: Unexpected identifier

There are a number of ways we can avoid these errors…

Alternate your syntax

Use the opposite quote style to enclose any quotes or apostrophes within your
strings, such as:

1 'G'day Barry!' // error 2 "G'day Barry!" // correct 3 4 'Barry said 'I lost my
keys'' // error 5 'Barry said "I lost my keys"' // correct 6 "Barry said 'I lost my
keys'" // correct

Whilst this technique works just fine. It’s preferable to be more consistent within
our code.

Using the Escape Character \

By using a backslash we can prevent JavaScript from interpreting a quote as the
end of the string. The \ should go before any single or double quote:

1 'G\'day Barry!' // correct 2 3 'Barry said \'I lost my keys\'' // also correct!

Using Template Literals

If we enclose our string in template literals ``, our string will be valid and it’ll
look much cleaner too:

1 `Barry said "I lost my keys" and "I'm now concerned"!`; 2 3 // correct

Longer Strings

We use either the newline character \n or carriage return \r, to break longer
strings up over multiple lines:

1 const multipleLines = "This string is long\nso lets displ\ 2 ay it\nacross

multiple lines."; 3 4 // output: 5 6 "This string is long 7 so lets display it 8 across
multiple lines."

This works fine but it’s quite messy. We could tidy it up by using some
concatenation:

1 const multipleLines = "This string is long\n" + 2 "so lets display it\n" + 3
"across multiple lines.";

Or go for a gold star with template literals:

1 const multipleLines = `This string is long 2 so lets display it 3 across multiple
lines.`;

Back-ticks to the rescue! No escapes or concatenation required, the newlines are
preserved and it looks much neater.

And that’s it! We’ve covered the basics of creating strings, string concatenation,
and syntax rules. In the next chapter, we’ll move on to manipulating strings with
many of the common methods, such as formatting, finding, replacing, and
converting values.

Working with Strings

In this chapter, we dive straight into some examples of how to work with Strings
in JavaScript!

The Anatomy of a String

Each character in a string is numbered, starting at 0. For example:

1 "This is my string!"

The first character is T at index position 0.

The last character is ! at index position 17.

The spaces also have index positions at 4, 7 and 10.

We can access any character like so:

1 "This is my string![8]" // m

charAt()

We can similarly use the charAt() method. It returns the character at the
specified index in a string, such as:

1 "This is my string!.charAt(8)" // m

indexOf()

We can use indexOf() if we wish to return an index number.

It returns the index of where the substring starts in the string, or -1 if the
substring isn’t found. It’s case-sensitive.

1 const str = "This is my string!"; 2 3 str.indexOf('s'); // returns 3 (the first 's'
insta\ 4 nce) 5 6 str.indexOf('my'); // returns 8 7 8 str.indexOf('My'); //

returns -1 9 10 str.lastIndexOf('s'); // returns 11 (the last instance)

You can use a conditional to test if a substring exists:

1 if (str.indexOf('my') > -1) { 2 console.log('Success! It contains the string'); 3 }

This works as we know that -1 results when nothing is found, so logically any
result greater than -1 would mean the substring exists.

slice()

To get a portion of a string starting (and optionally ending) at a particular
character, we can use slice().

This method can take 2 arguments. The first is the start position (0 is of course
the first character), and the second optional argument is the end position. If
either argument is a negative number, it will start at the end of the string and
work backward.

1 const str = "This is my string!"; 2 3 str.slice(5);
// "is my string!" 4
str.slice(5, 10); // "is my" 5 str.slice(0, -8); // "This is my"

Finding the Length of a String

To find the length of a string we can use the length property. It returns the
number of characters in a string.

1 "This is my string!".length; //18

The length property returns the actual number of characters starting with 1,
which in our example is 18, not the final index number, which starts at 0 and
ends at 17.

Converting to Upper or Lower Case

The two methods toUpperCase() and toLowerCase() are useful ways to format

our text.

toUpperCase()converts all text in a string to uppercase.

1 const str = "This is my string!"; 2 const upper = str.toUpperCase(); 3
console.log(upper); 4 5 // "THIS IS MY STRING!"

toLowerCase()converts all text in a string to lowercase.

1 const str = "This is my string!"; 2 const lower = str.toLowerCase(); 3
console.log(lower); 4 5 // "this is my string!"

split()

To divide a string up into sections & insert the contents into an array, we can use
the split() method.

The argument we provide is the delimiter, the character that we’re using to split
up our string.

In the below example, let’s use the whitespace “ “ character as our delimiter:

1 const str = "This is my string!"; 2 const splitString = str.split(" "); 3 4
console.log(splitString); 5 6 // ["This", "is", "my", "string!"]

We can now access each section via its array position..

1 splitSting[0]; // This 2 splitSting[1]; // is 3 splitSting[2]; // my 4
splitSting[3]; // string!

We can also optionally provide a second argument to stop splitting a string, after
a certain number of delimiter matches have been found.

Let’s look at another example, this time using a comma ‘, ‘ as our delimiter.

1 const shoppingList = 'Bananas, green apples, chocolate, c\ 2 at food'; 3 const
foodItems = shoppingList.split(', '); 4 console.log(foodItems); 5 6 // ["Bananas",
"green apples", "chocolate", "cat food"] 7 8 const snacks = shoppingList.split(', ',
2); 9 console.log(snacks) 10 11 // ["Bananas", "green apples"]

Our .split(', ', 2) stopped the split after the second comma, returning just the first
two array entries.

trim()

The trim() method removes any white space from both ends of a string, but
importantly not anywhere in between.

1 const ahhhhWhitespace = " This is my string! "; 2 3 const trimmed =
ahhhhWhitespace.trim(); 4 5 console.log(trimmed); 6 7 // "This is my string!"

Whitespace can be tabs or spaces, the trim() method conveniently removes any
excess.

replace()

If we wish to search through a string for a value, and replace it with a new value,
we use replace().

The first parameter will be the value to find, and the second will be the
replacement value.

1 const str = "This is my string!"; 2 3 const newString = str.replace("my",
"your"); 4 5 console.log(newString); 6 7 // This is your string!

By default, the replace() method replaces the first match only. To replace all
matches, you’ll need to pass in a regular expression using the global flag g. If we
also want to ignore case, we’d add the case insensitive flag i.

1 const str = "GOOGLE is my homepage. But I don't use Googl\ 2 e Chrome." 3
4 const newString = str.replace(/google/gi, "Google"); 5 6
console.log(newString); 7 8 // Google is my homepage. But I don't use Google
Chrome.

Here we’re telling every instance of google within our string (regardless of
case), to be replaced by “Google”.

Converting Strings into Numbers

In this final section, let’s take a quick look at some of the ways we can convert
strings into numbers.

parseInt()

To convert a string into an integer (a whole number) we can use parseInt(). It
takes two arguments, the first being the value we want to convert, and the second
is called the radix. This is the base number used in mathematical systems. For
our use, it should always be 10, the decimal system.

1 parseInt('64', 10); // 64 2 3 parseInt('64.9', 10); // 64 4 5 parseInt('64px', 10);
// 64

parseFloat()

If we wish to convert into a floating-point number (a number with decimal

points), we’d use parseFloat().

1 parseFloat('64.9');
// 64.9 2 3 parseFloat('64bit');
console.log(parseFloat('64')); // 64

// 64 4 5

Number()

We can convert our strings with the Number() method as well, however, it’s
stricter about which values it can convert. It only works with strings that consist
of numbers.

## 1. Number('64'); // 64 2 3 Number('64.9'); // 64.9 4 5 Number('64bit'); //
NaN 6 7 Number('64%'); // NaN

NaN if you recall — stands for Not a number.

An Introduction to the DOM

The Document Object Model, or the “DOM”, defines the logical structure of
HTML documents & essentially acts as an interface to web pages. Through the
use of programming languages such as JavaScript, we can access the DOM to
manipulate websites and make them interactive.

In this chapter, we’re going to be working with the document object, taking a
look at the DOM tree and nodes. Let’s get started!

What is the DOM?

At its core, a website must consist of an HTML document, an index.html. Using
a browser we view the website, which renders from our HTML file/s and any
CSS files which add style and layout rules.

The browser also creates a representation of this document known as the
Document Object Model. It’s through the use of the DOM, that JavaScript is
able to access and alter the content and elements of the website.

To view the DOM, using your web browser, right-click anywhere on a page and
choose “Inspect”. This will open up Developer Tools, like so:

The DOM is shown under the Elements tab. You can also view it by selecting the
Console tab and typing “document”.

The Document Object

The document object is a built-in object, containing many properties and
methods.

We access and manipulate this object with JavaScript. And by manipulating the
DOM, we can now make our web pages highly interactive! As we’re no longer
limited to just building static sites with styled HTML content.

We can now build apps that update page data without needing to refresh, we can
give users the ability to customize the page layout, we can create drag and drop
elements, in-browser games, clocks, timers, and complex animations. Working
with the DOM opens up a whole lot of possibilities!

So let’s perform our first DOM manipulation…

Go to www.google.com and open up your Developer Tools. Then select the
Console tab & type in the following:

1 document.body.style.backgroundColor = ‘orange’;

Press enter and you’ll see the background color has now changed to orange.

Of course, you haven’t edited Google’s source code (!), but you have changed
how the content renders locally in your browser, by manipulating the document
object.

The document is an object, body is a property that we’ve chosen to edit by
accessing the style attribute & changing our backgroundColor to orange.

Note that we use camel case backgroundColor in JavaScript, instead of
background-color which is used in CSS. Any hyphenated CSS property will be
written in camel case in JavaScript.

You can see your DOM adjustment under the body element of the Elements tab,
or by typing document.body into the console.

As we are working directly with the DOM in the browser, we’re not actually
altering the source code. If you refresh the browser it will return to its original
state.

The DOM Tree & Nodes

Largely due to the layout of the DOM, it’s often called the DOM Tree.

The tree consists of objects called nodes. There are many different types of
nodes, but you’ll most often be working with element nodes (HTML elements),
text nodes (any text content), and comment nodes (commented code). The
document object is its own node which sits at the root.

1 <!DOCTYPE html> 2 <html> 3 <head> 4 <title>Nodes</title> 5 </head>
6 <body> 7 <h1>This is an element node</h1> 8 <!-- This is a comment
node --> 9 This is a text node. 10 </body> 11 </html>

When working with DOM nodes they’re also referred to as parents, children, and
siblings, depending on their relation to other nodes.

In our above code example, the html element node is the parent node, the head
and body elements are its siblings. And the body contains three child nodes
(which are siblings in relation to each other — much like a family tree). We’ll
look further into this later on in the article!

How to Identify Node Type

So every node in a document has a type, we can access the type using the
nodeType property. See the full list of node types here.

Let’s look at a few examples of the types that exist within our previous example:

Our <html>, <title>, <body> and <h1> are of the type ELEMENT_NODE with
a the value of 1.

Our text This is a text node. located within the body which isn’t within an
element is a TEXT_NODE with a value of 3.

And our comment <!-- This is a comment node --> is a COMMENT_NODE
type with a value of 8.

How can we check our node types?

Go to the Elements tab in Developer Tools and click on any line. You’ll see the
value of == $0 display alongside. Now if you go to the Console tab and type $0
the value of the node you selected will display. To check the node type, run:

1 $0.nodeType;

The numerical value of the node type, corresponding to the selected node will be
displayed. e.g. If you had selected h1, you’d see 1. Doing the same for the text
would yield 3, and the comment 8.

And when you know where the node sits in the DOM, you don’t need to
manually select it, you can access it directly, for example:

1 document.body.nodeType;

// 1

You can also use nodeValue to get the value of a text or comment node, and
nodeName to get the tag name of an element.

In the next chapter, we’ll learn how to work with DOM elements using the
following methods:

getElementById(), getElementsByClassName(), getElementsByTagName(),
querySelector() and querySelectorAll().

Accessing DOM Elements

In this chapter, we’re going to take a look at several methods we can use to
access DOM elements. We’ll be working with an HTML example that consists
of a variety of elements, this way we can see each method in action!

The HTML is as follows:

1 <!DOCTYPE html> 2 <html lang="en"> 3 <head> 4 <title>Master the
DOM!</title> 5 </head> 6 <body> 7 <h1>Master the DOM!</h1> 8 <div
id="test">I'm an ID</div> 9 <div class="test">I'm a class</div> 10 <div
class="test">I'm another class</div> 11 <section>I'm a tag</section> 12
<section>I'm another tag</section> 13 <div id="test-query">Use a query
selector</div> 14 <div class="test-query-all">Use query selector ALL</div>
15 <div class="test-query-all">Use query selector ALL</div> 16 </body> 17
</html>

Our output looks like this:

getElementById()

Perhaps the most simple way to access a single element in the DOM is by its
unique id. To do this we use the getElementById() method.

1 document.getElementById();

To access an element in this way it must have an id attribute. Such as:

1 <div id="test">I'm an ID</div>

With our HTML file open in the browser, open up the Console tab of Developer
Tools. And let’s get that element and assign it to a variable named testId.

1 const testId = document.getElementById('test');

We can see the result with a console log:

1 console.log(testId); 2 3 // output: 4 5 <div id="test">I'm an ID</div>

And let’s be sure we’re accessing the right element by giving it some style:

1 testId.style.backgroundColor = 'red';

Note: We’ll dive deeper into altering style later in the chapter!

Our live page will now look like this:

Accessing an element via its id is simple enough, however, it can only connect
you to a single element at a time (as id’s must be unique). So let’s look at some
more methods.

getElementsByClassName()

When we want to get one or more elements in the DOM, we can access elements
by class name using getElementsByClassName().

1 document.getElementsByClassName();

In our example, we have two elements with the class of test.

1 <div class="test">I'm a class</div> 2 <div class="test">I'm another
class</div>

In the Console, let’s get both of these elements and add them to a variable called
testClass.

1 const testClass = document.getElementsByClassName(‘test’);

However, if we attempt to modify our elements in the same way we did with the
previous ID example, we’d run into an error!

1 testClass.style.backgroundColor = 'green'; 2 3 // output: 4 5 Uncaught
TypeError: Cannot set property 'backgroundColor'\ 6 of undefined 7 at
<anonymous>

This won’t work as instead of accessing one element, we’re accessing multiple
elements that are stored in an array-like object.

1 console.log(testClass); 2 3 // Output: 4 5 HTMLCollection(2) [div.test, div.test]

When working with arrays, we access elements using an index number, the
numbers start from 0. So we can change our first class element like so:

1 testClass[0].style.backgroundColor = 'green';

And to change all our class elements, we could use a for loop:

1 for (i = 0; i < testClass.length; i++) { 2 testClass[i].style.backgroundColor =
'green'; 3 }

Note: I’ll be looking into the fundamentals of arrays and loops in future articles.

Here’s our updated example:

getElementsByTagName()

Another way to access multiple elements is via its HTML tag name using
getElementsByTagName().

1 document.getElementsByTagName();

Here are the section elements in our example:

1 <section>I'm a tag</section> 2 <section>I'm another tag</section>

Let’s add them to a variable:

1 const testTag = document.getElementsByTagName(‘section’);

Again, we’re working with an array-like object of elements, so let’s modify all
our section tags with a for loop.

1 for (i = 0; i < testTag.length; i++) { 2 testTag[i].style.backgroundColor =
'blue'; 3 }

Query Selectors

Let’s take a look at our final element access methods querySelector() and
querySelectorAll().

1 document.querySelector(); 2 document.querySelectorAll();

To target a single element, we use the querySelector() method. Let’s access the
following element in our example:

1 <div id="test-query">Use a query selector</div>

As it’s an id attribute, we use the hash # symbol when assigning our element:

1 const testQuery = document.querySelector(‘#test-query’);

If there were multiple instances of the element selected with querySelector(),
only the first would be returned. To collect all elements matching a query, we’d
use querySelectorAll().

Our example contains two elements with the test-query-all class:

1 <div class="test-query-all">Use query selector ALL</div> 2 <div class="testquery-all">Use query selector ALL</div>

As we’re now working with class attributes, we use the period . symbol to access
our elements:

1 const testQueryAll = document.querySelectorAll(‘.test-que\ 2 ry-all’);

And let’s use a forEach() method to modify our styles, like so:

1 testQueryAll.forEach(query => { 2 query.style.backgroundColor = 'yellow'; 3
});

Additionally, query selector methods have the ability to work with multiple
element types. For example:

querySelector('section, article') would match with whichever tag appears first,
and:

querySelectorAll('section, article') would match with all section and article tags
within the document.

Query selector methods are very powerful! You can use them to access any
element or group of elements in the DOM, in the same way as you would when
selecting elements in CSS.

In the next chapter, we’ll move on to traversing and modifying elements.

Traversing the DOM

In this chapter, we’re going to learn all about traversing DOM elements. When
we traverse the DOM, we’re essentially navigating through the DOM. We work
with parent, child and sibling properties to apply our JavaScript to DOM
elements.

Let’s use the following example:

1 <!DOCTYPE html> 2 <html> 3 <head> 4 <title>Traversing the DOM</title>
5 </head> 6 <body> 7 <h1>Traversing the DOM</h1> 8 <p>Let's work with
this example to <strong>MASTER</stro\ 9 ng> the DOM!</p> 10 <h2>List of
Items..</h2> 11 <ul> 12 <li>Pizza</li> 13 <li>Burgers</li> 14
<li>Doritos</li> 15 </ul> 16 </body> 17 <script> 18 const h1 =
document.getElementsByTagName('h1')[0]; 19 const p =
document.getElementsByTagName('p')[0]; 20 const ul =
document.getElementsByTagName('ul')[0]; 21 </script> 22 </html>

Our file will open up in the browser like so:

Root Nodes

The document object is the root of every node in the DOM.* The next level up is
the window object — which includes things such as *browser tabs, toolbars,
prompts and alerts. We’ll be working with the DOM and thus the document
object, which consists of what is inside of the inner window.

By default, every document contains the html, head, and body elements.

Check the contents of each by running the following in your console:

1 document.head; // ► <head>...</head> 2 document.body; // ► <body>...
</body>

Parent Nodes

As mentioned earlier, the nodes in the DOM are referred to as parents, children,
and siblings, depending on their relation to other nodes. The parent of any
particular node is the node that is one level above it in the DOM hierarchy.

In our example:

html is the parent of head, body, and script.
body is the parent of h1, h2, p and ul, but not li, as li is two levels down from
body.

We can check the parent of our p element for example, with the parentNode
property. As we’ve assigned p to a variable all we need to do is type:

1 p.parentNode;

// ► <body>...</body>

We can even go two levels up with:

1 p.parentNode.parentNode;

// ► <html>...</html>

Child Nodes

The children of a node are the nodes that are one level below. Any nodes beyond
one level of nesting are usually referred to as descendants.

There are a number of properties we’ll often be working with here, such as
childNodes, firstChild, lastChild, children, firstElementChild and
lastElementChild.

Let’s start with the childNodes property, it will return a list of every child of a
given node:

1 ul.childNodes // ► NodeList(7) [text, li, text, li, tex\ 2 t, li, text]

Perhaps you we’re expecting just three li’s to be returned? The text nodes are
actually whitespace caused by indentation between elements — which the DOM
considers as nodes. You can’t see them under your Elements tab, as Dev Tools
removes these nodes automatically.

For this reason, if we attempt to alter the background color of the first child node
for example, it’d fail as the first child is text.

1 ul.firstChild.style.background = "purple"; 2 3 // output: 4 5 Uncaught
TypeError: Cannot set property 'background' of u\ 6 ndefined

When we want to work with element nodes only, we should use the children,
firstElementChild and lastElementChild properties.

ul.children would return only the three li elements.

And to change just our first li, we’d use:

1 ul.firstElementChild.style.background = 'purple';

Here’s our updated page:

If we want to alter all of our children elements, we could use a for...of loop like
so:

1 for (let element of ul.children) { 2 element.style.background = 'purple'; 3 }

Now all our child elements have the background color change:

If we take a look at our p element, we’ll see it contains both text and other
elements (our strong tag).

1 for (let element of p.childNodes) { 2 console.log(element); 3 } 4 5 // output: 6
7 "Let's work with this example to " 8 <strong>MASTER</strong> 9 " the
DOM!"

The childNodes property is useful when we wish to access that information.

Both childNodes and children do not return traditional JavaScript arrays (with all
their associated properties & methods), but rather array-like objects. As you
would with an array, however, you can access nodes by index number, or even
find their length property.

1 document.body.children[3].lastElementChild.style.backgrou\ 2 nd = 'pink';

With this code, we’ll find the last element child li of the fourth child element ul
of body and apply our style..

By using parent and child properties, you can retrieve any node in the DOM!

Sibling Nodes

Let’s now take a look at sibling nodes. Siblings of a node are any node on the
same tree level in the DOM. They don’t have to be the same type of node —
text, element, and comment nodes can all be siblings. The properties we’ll often
work with here are nextSibling, previousSibling, nextElementSibling and
previousElementSibling.

Sibling properties work in the same way as child nodes: previousSibling and
nextSibling will get the next node that immediately precedes or follows the
specified node, and previousElementSibling and nextElementSibling will only
get element nodes.

Let’s get the middle element from our ul:

1 const burger = ul.children[1];

And let’s use the element sibling properties to access the next and previous
elements (avoiding the whitespace text):

1 burger.nextElementSibling.style.background = 'orange'; 2
burger.previousElementSibling.style.background = 'green';

These changes will now show in our example:

In the next chapter, we’ll move on to making changes to the DOM!

Making changes to the DOM

In this chapter, we’re going to learn all about how we can add, change, replace,
and remove nodes from the DOM. We’ll be looking specifically at the
createElement() and createTextNode() methods.

Creating New Nodes

Let’s create the following HTML file:

1 <html lang="en"> 2 <head> 3 <title>Master the DOM!</title> 4 </head> 5
<body> 6 <h1>Master the DOM!</h1> 7 </body> 8 </html>

Open up the Console tab in Developer Tools.

Let’s use the createElement() method on the document object to create a new p
element.

1 const paragraph = document.createElement('p'); 2 3 console.log(paragraph);
// <p></p>

Success! The paragraph variable gives us our p element.

We can now add text to our element, with the textContent property:

1 paragraph.textContent = "I'm a paragraph!"; 2 3 console.log(paragraph); //
<p>I'm a paragraph!</p>

By combining createElement() and textContent we can create a complete
element node.

We could also use the innerHTML property to add content to an element. With
this property we can add both text and HTML to our element:

1 paragraph.innerHTML = "I'm a <strong>bold</strong> paragr\ 2 aph!";

Of the two methods, textContent is superior — it’s slightly faster to render than
innerHTML.

It’s also possible to create a text node using the createTextNode() method:

1 const text = document.createTextNode("I'm a text node!"); 2 3
console.log(text); // "I'm a text node!"

All of these methods have created new elements and text nodes, however, they
are not visible on the front end of a website until they’ve been inserted into the
document!

Inserting Nodes into the DOM

To see the new text nodes and elements we create on the front end, we need to
insert them into the document. The methods appendChild() & insertBefore() are
used to add items to the beginning, middle, or end of a parent element, and
replaceChild() is used to replace an old node with a new node.

Let’s demo this by adding a list to our HTML:

1 <ul> 2 <li>Get pizza</li> 3 <li>Get burgers</li> 4 <li>Get Doritos</li> 5
</ul>

And here’s our page:

Say we want to add a new item to the end of our list, we have to create the
element and add text to it first, as we did previously, like so:

1 // Get the ul element 2 const list = document.querySelector('ul'); 3 4 // Create
new list item 5 const newItem = document.createElement('li'); 6
newItem.textContent = 'Get nice cheese';

We now have a complete element for our new list item! So we can add it to the
end of the list using appendChild():

1 // Add our new item to the end of the list 2 list.appendChild(newItem);

And our new li element has been appended to the end of the ul:

To add an item to the beginning of our list, let’s create another element (we have
to again create a new element, as createElement() can‘t be reused):

1 // Create a new list item 2 const anotherNewItem =
document.createElement('li'); 3 anotherNewItem.textContent = 'Get Party
Whistles';

We use the insertBefore() method to add it to the beginning of our list. It will
take two arguments, the first being the new child node to be added, and the
second is the sibling node that will immediately follow.

1 parentNode.insertBefore(newNode, nextSibling);

So for our example, we’ll add the new anotherNewItem element to the start of
our list, like so:

1 // Add a new item to the beginning of the list 2
list.insertBefore(anotherNewItem, list.firstElementChild);

And now our new node has been added to the start of our list!

Let’s also take a look at how we can replace an existing node with a new node
using replaceChild(). First, we create a new element:

1 const modifiedItem = document.createElement('li'); 2
modifiedItem.textContent = "Get Poppin' Jalapeno Doritos";

replaceChild() also takes two arguments, first the new node, then the node to be
replaced…

1 parentNode.replaceChild(newNode, oldNode);

In our example, we’re replacing the third element child on our list:

1 // Replace list item 2 list.replaceChild(modifiedItem, list.children[3])

Using a combination of appendChild(), insertBefore(), and replaceChild(), we
can insert nodes and elements anywhere in the DOM!

Removing Nodes from the DOM

To remove nodes from the DOM, we can use removeChild() to remove child
nodes from their parent, or we can use remove() to remove the node itself.

Returning to our example let’s remove the last item on our list:

1 // Remove the last list item 2 list.removeChild(list.lastElementChild);

And the result:

Alternatively, we could use remove(), to remove the node itself:

1 // Remove the third element from our list 2 list.children[2].remove();

Using removeChild() and remove(), you can remove any node from the DOM.

In the next chapter, we’ll take a look at how we can modify classes & styles
using the DOM, by modifying HTML element nodes!

How to modify DOM nodes

In this chapter, we’ll take a look at how we can modify the attributes, classes,
and styles of HTML element nodes.

Modifying Attributes

Attributes are often used in HTML to provide additional information about an
element. Some common examples are the src attribute of an img tag, the href of
an a tag, as well as class, id and style. You may also have seen attributes
beginning with data-, these are custom attributes that we can also modify.

The methods we have in JavaScript for modifying element attributes are:

hasAttribute() — Returns a Boolean.

getAttribute() — Returns the value of a specific attribute.

setAttribute() — Adds or updates the value of a specific attribute.

removeAttribute() — Removes an attribute from an element.

Let’s use the following HTML as our example:

1 <!DOCTYPE html> 2 <html lang="en"> 3 <body> 4 5 <img
src="https://res.cloudinary.com/trobes/image/upload/\ 6
c_scale,w_400/v1549941322/before.png"> 7 8 </body> 9 </html>

Open up the console and test out the attribute methods:

1 // Assign image element 2 const image = document.querySelector('img'); 3 4
image.hasAttribute('src'); // true 5 image.getAttribute('src'); // returns the
src link 6 image.removeAttribute('src'); // removes the src

And let’s use setAttribute() to assign a new image to our src:

1 image.setAttribute('src', 'https://res.cloudinary.com/tro\ 2
bes/image/upload/c_scale,w_400/v1549941322/after.png');

The hasAttribute() and getAttribute() methods are often used with conditional
statements, while setAttribute() and removeAttribute() are more often used to
directly modify the DOM.

Modifying Classes

When working with CSS, we use classes to apply styles to multiple elements.
Let’s take a look at how we can work with the class attribute in JavaScript, using
className and classList.

className — Gets or sets the class value.

classList.add()— Adds class values.

classList.toggle() — Toggles a class on or off.

classList.contains() — Checks if a value exists.

classList.replace() — Replaces old value with a new one.

classList.remove() — Removes a value.

Let’s work with each of these methods in the following example:

1 <!DOCTYPE html> 2 <html lang="en"> 3 <style> 4 .active { 5
border:
5px solid green; 6 } 7 .alert { 8
border: 5px solid red; 9 } 10
.hidden { 11
display: none; 12 } 13 div { 14
border: 5px solid
lightgrey; 15
padding: 15px; 16
margin: 5px; 17 } 18 </style> 19
<body> 20 <div>Div #1</div> 21 <div class="active">Div #2</div> 22
</body> 23 </html>

And here’s the initial HTML output:

We use className to assign values to classes:

1 // Select div #1 2 const div = document.querySelector('div'); 3 4 // Assign the
alert class to div #1 5 div.className = 'alert';

Now the alert class defined in our HTML has been assigned to the first div:

This will override any existing classes on the element. You can add multiple
classes using className, if you separate the class names to be applied with
spaces.

The other way to modify our classes is with the classList property, and it has a
few very useful methods:

1 // Select div #2 by its class name 2 const activeDiv =
document.querySelector('.active'); 3 4 // Add the hidden class 5
activeDiv.classList.add('hidden'); 6 7 // Remove the hidden class 8
activeDiv.classList.remove('hidden'); 9 10 // Switch between hidden true and
false 11 activeDiv.classList.toggle('hidden'); 12 13 // Replace active class with
alert class 14 activeDiv.classList.replace('active', 'alert');

After running through these methods, our HTML will render like so:

Note: Using classList.add() will add a new class to the list of existing classes
(remember className would override any existing classes). You can also add
multiple classes as comma-separated strings.

Modifying Styles

Typically styles are added via separate CSS stylesheets, however, there are times
when we might want to use an inline style — and it’s useful to know how we can
modify it directly with JavaScript! Let’s demo this with the following HTML:

1 <!DOCTYPE html> 2 <html lang="en"> 3 <body> 4 <div style="height:
200px; 5
width: 200px; 6
border: 5px solid black; 7
display: flex; 8
justify-content: center; 9
align-items:
center;">Style me!</div> 10 </body> 11 </html>

Our initial output:

When working with CSS properties in the DOM, we use camelCase. So instead
of using dashes as we would with CSS e.g.border-radius, we use camel case e.g.
borderRadius. Where our first word is in lower case and any subsequent words
are capitalized.

1 // Select the div 2 const div = document.querySelector('div'); 3 4 // Make div
into a circle, change color and font size 5 div.style.borderRadius = '50%'; 6
div.style.backgroundColor = 'lightgreen'; 7 div.style.fontSize = '30px';

Note: We could use setAttribute()to modify our styles eg. div.setAttribute('style',
'border-radius: 50%'); However, this will remove all existing inline styles. So it’s
much better to use the style attribute directly.

Our output after adding these styles:

Of course, if we have multiple style changes to apply to an element, it’s best to
apply them to a class in your CSS and just add the new class to the element via
JavaScript.

Understanding Events

The interaction of JavaScript with HTML is handled through events. Events are
actions that occur when either the user or the browser itself manipulates the
page.

Some common events that occur with websites are page loads, button clicks,
keypresses, hovers, form submissions, window resizing, to name but a few.

As developers, we can use these events to execute coded responses, such as
displaying messages, validating data, reacting to button clicks, and really
anything else we can imagine!

What are Event Handlers & Event Listeners?

An event is fired whenever an action occurs on a page that JavaScript can react
to, such as when a user clicks on a button (click event) or presses a key
(keypress event).

An event handler is a JavaScript function that runs when an event fires.

An event listener attaches responsiveness to a given element, which allows the
element to wait or “listen” for the given event to fire.

Events can be assigned to elements via inline event handlers, event handler
properties & event listeners. Let’s take a look at each of these methods.

Inline Event Handlers

Let’s start with a basic example of an inline event handler. The below HTML
consists of a button and a p element, we want the text content of p to change
when the user clicks the button.

1 <!DOCTYPE html> 2 <html lang="en-US"> 3 4 <head> 5
<title>Understanding Events</title> 6 </head> 7 8 <body> 9 10 <button
onclick="changeText()">Click me</button> 11 12 <p>Change me!</p> 13 14
</body> 15 </html>

As you can see, we’ve added an attribute called onclick to our button element.
The attribute value will be a JavaScript function we’ll create called
changeText().

Here’s our output so far:

Now let’s create our function! I’ll add it between script tags for this example:

1 <script> 2 3 // Function to modify the text content of the paragraph 4 const
changeText = () => { 5 const p = document.querySelector('p'); 6 7
p.textContent = "I was changed with an inline event handl\ 8 er!"; 9 } 10 11
</script>

Our changeText() function modifies the textContent of ourp element.

So now when you click on the button, the event fires which runs our
changeText()function, which alters the text in our p tag.

While inline event handlers clearly work — they really shouldn’t be used in
production. For the same reason that inline CSS shouldn’t be used, it’s messy!
And our code will be much more maintainable, if we handle our JavaScript
entirely in separate script files, rather then having handlers throughout our
HTML.

Event Handler Properties

Event handler properties work very similarly to inline handlers, except we set
the property of an element in JavaScript, instead of on the attribute in our
HTML.

Our HTML is the same, except we’re now excluding the onclick="changeText()"
we used previously:

1 <!DOCTYPE html> 2 <html lang="en-US"> 3 4 <head> 5
<title>Understanding Events</title> 6 </head> 7 8 <body> 9 10 <button>Click
me</button> 11 12 <p>Change me!</p> 13 14 </body> 15 </html>

And our function will remain similar as well, except now we need to access the
button element in our JavaScript. We simply access onclick just as we would
access style or id or any other element property, then assign the function
reference.

1 // Function to modify the text content of the paragraph 2 3 const changeText =
() => { 4 const p = document.querySelector('p'); 5 p.textContent = "I was
changed with an event handler pr\ 6 operty!"; 7 } 8 9 // Add event handler as a

property of the button element 10 11 const button =
document.querySelector('button'); 12 button.onclick = changeText;

Note: Event handlers do not follow the camelCase convention. Notice the code
is onclick, not onClick!

Now when you click the button, it’ll fire the event from our JavaScript property:

You’ll see that when passing a function reference to the onclick property, we
don’t include parentheses, as we are not invoking the function at that moment,
but only passing a reference to it.

The event handler property is more maintainable than the inline handler, but it
still isn’t the greatest way to manage events. If for example, you tried to set
multiple onclick properties, all but the last one would be overwritten, as
demonstrated below:

1 const p = document.querySelector('p'); 2 const button =
document.querySelector('button'); 3 4 const changeText = () => { 5
p.textContent = "Will I change?"; 6 } 7 8 const alertText = () => { 9 alert('Will
I alert?'); 10 } 11 12 // Events can be overwritten! 13 14 button.onclick =
changeText; 15 button.onclick = alertText;

In the above example, the button click would only display an alert, and not
change the p text, since the alert() code was the last one added to the property.

Now that we have an understanding of both inline event handlers and event
handler properties, let’s move onto event listeners.

Event Listeners

Event listeners watch for an event on an element, instead of assigning the event
directly to a property on the element, we’ll use the addEventListener() method to
listen for the event.

addEventListener() takes two mandatory parameters — the event to listen for
and the listener callback function.

The HTML for our event listener will remain the same as the previous example.
And we’ll still be using the same changeText() function as before.

However, we’ll now attach the addEventListener()method to the button, as
follows:

1 // Function to modify the text content of the paragraph 2 3 const changeText =
() => { 4 const p = document.querySelector('p'); 5 p.textContent = "I
changed because of an event listen\ 6 er."; 7 } 8 9 // Listen for click event 10 11
const button = document.querySelector('button'); 12
button.addEventListener('click', changeText);

Note: In the first two methods, a click event was referred to as onclick, but with
event listeners, it is referred to as click. Every event listener drops the on from
the word.

And now when we click the button, our output will be:

Event listeners appear very similar to event handler properties, however, they
have a crucial advantage. We can set multiple event listeners on the same
element, for example:

1 const p = document.querySelector('p'); 2 const button =
document.querySelector('button'); 3 4 const changeText = () => { 5
p.textContent = "Will I change?"; 6 } 7 8 const alertText = () => { 9 alert('Will
I alert?'); 10 } 11 12 // Multiple listeners can be added to the same event and \ 13
element 14 15 button.addEventListener('click', changeText); 16
button.addEventListener('click', alertText);

We can see how both events have fired, providing the user with both an alert and
modified text once clicking out of the alert.

It’s more concise to use anonymous functions instead of function references on
event listeners. Anonymous functions are functions that are not named, such as:

1 // An anonymous function on an event listener 2 3
button.addEventListener('click', () => { 4 p.textContent = "Will I change?"; 5
});

We could also use the removeEventListener() function to remove one or all
events from an element.

1 // Remove alert function from button element 2 3
button.removeEventListener('click', alertText);

It’s also useful to know that you can use addEventListener() on the document
and window object.

Event listeners are currently the most common and preferred way to handle
events in JavaScript. Next up we’ll take a brief look at some of the more
common events that we’re likely to work with.

Common Events

So far we’ve focused on using the click event while learning about inline event
handlers, event handler properties and event listeners. However there are many
more events available for us to work with, so let’s take a look!

Mouse Events

Mouse events are among the most frequently used events. They refer to events
that involve clicking the mouse button or hovering and moving the pointer. And
of course, these events also correspond to the equivalent action on a touch
device. Some examples are:

click - Fires when the mouse is pressed and released on an element.
dblclick - Fires when an element is clicked twice.
mouseenter - Fires when a pointer enters an element.
mouseleave - Fires when a pointer leaves an element.
mousemove - Fires every time a pointer moves inside an element.

A click is actually a compound event that is comprised of combined mousedown
and mouseup events, these fire when the mouse button is pressed down or lifted,

respectively.

Using mouseenter and mouseleave together recreates a hover effect that lasts as
long as a mouse pointer is on the element.

Form Events

Form events are actions that relate to forms, such as input elements and whether
they are selected or unselected, and also form submission.

submit - Fires when a form is submitted.
focus - Fires when an element (such as an input) receives focus.
blur - Fires when an element loses focus.

Focus is achieved when an element is selected, for example, through a mouse
click or navigating to it via the TAB key.

JavaScript is often used to submit forms and send the values through to a backend language. The advantage of using JavaScript to send forms is that it does not
require a page reload to submit the form, and JavaScript can be used for form
validation.

Keyboard Events

Keyboard events are used for handling keyboard actions, such as pressing a key,
lifting a key, and holding down a key.

keydown - Fires once when a key is pressed.
keyup - Fires once when a key is released.
keypress - Fires continuously while a key is pressed.

Although they look similar, keydown and keypress events do not access all the
exact same keys. While keydown will acknowledge every key that is pressed,
keypress will omit keys that do not produce a character, such as SHIFT, ALT, or
DELETE.

Keyboard events also have specific properties for accessing individual keys.

If a parameter, known as an event object is passed through to the event listener,
we can access more information about the action that took place. Three
properties that pertain to keyboard objects include keyCode, key, and code.

For example, if the user presses the letter a key on their keyboard, the following
properties pertaining to that key will surface:

keyCode - A number pertaining to the key e.g. “65”
key - Represents the character name e.g. “a”
code - Represents the physical key being pressed e.g. “KeyA”

Let’s take a closer look at this with the following code:

1 // Test the keyCode, key, and code properties 2 3
document.addEventListener('keydown', event => { 4 console.log('key: ' +
event.keyCode); 5 console.log('key: ' + event.key); 6 console.log('code: ' +
event.code); 7 });

You could save this code inside of script tags in a new HTML file. Then open up
your browser, go to developer tools and open up the console tab. You’ll then see
the information is logged every time you press a key on the keyboard. For
example, if you press the ‘a’ key, your output would be:

1 keyCode: 65 2 key: a 3 code: KeyA

The keyCode property is a number that pertains to the key that has been pressed.
The key property is the name of the character, which can change — for example,

pressing a with SHIFT would result in a key of A. The code property represents
the physical key on the keyboard.

Note: the keyCode property is being deprecated so it’s preferable to use code in
new projects.

Check out the complete list of events here.

Event Objects

The Event object consists of properties and methods that all events can access. In
addition to the generic Event object, each type of event has its own extensions,
such as KeyboardEvent and MouseEvent.

The Event object is passed through a listener function as a parameter. It is
typically written as event or e. We can access the code property of the keydown
event to replicate the keyboard controls of a PC game.

Let’s test it out with the following HTML:

1 <!DOCTYPE html> 2 <html lang="en-US"> 3 4 <head> 5 <title>Event
Objects</title> 6 </head> 7 8 <body> 9 <p></p> 10 </body> 11 </html>

Open it up in your browser, and paste the following code into your developer
console:

1 // Pass an event through to a listener 2 3

document.addEventListener('keydown', event => { 4 var element =
document.querySelector('p'); 5 6 // Set variables for keydown codes 7 var a
= 'KeyA'; 8 var s = 'KeyS'; 9 var d = 'KeyD'; 10 var w = 'KeyW'; 11 12
// Set a direction for each code 13 switch (event.code) { 14
case a: 15
element.textContent = 'Left'; 16
break; 17
case s: 18
element.textContent = 'Down'; 19
break; 20
case d: 21
element.textContent = 'Right'; 22
break; 23
case w: 24
element.textContent = 'Up'; 25
break; 26 } 27 });

When you press one of the keys a, s, d, or w, you’ll see output like so:

I’m sure you’re now seeing that by having this control over how the browser
responds — we can build increasingly dynamic websites.

event.target

In this final section, we’ll look at one of the most frequently used event
properties: the target property.

Let’s work with the following HTML:

1 <!DOCTYPE html> 2 <html lang="en-US"> 3 4 <head> 5
<title>Target</title> 6 </head> 7 8 <body> 9 10 <section> 11 <div
id="one">One</div> 12 <div id="two">Two</div> 13 <div
id="three">Three</div> 14 </section> 15 16 </body> 17 </html>

Using event.target within our browser’s Developer Console, we can place one
event listener on the outer section element and get the most deeply nested
element.

1 const section = document.querySelector('section'); 2 3 // Print the selected
target 4 5 section.addEventListener('click', event => { 6
console.log(event.target); 7 });

Clicking on any one of our div elements will return the output of the relevant
specific element to the Console using event.target. This is extremely useful, as it
allows you to place only one event listener that can be used to access many
nested elements.

With the Event object, we can set up responses related to all events, including
generic events and more specific extensions.

Events are actions that take place on a website, such as clicking, hovering,
submitting a form, loading a page, or pressing a key on the keyboard. JavaScript
becomes truly interactive and dynamic when we are able to make websites
respond to actions the user has taken.

In this chapter, we learned what events are, examples of common events, the
difference between event handlers and event listeners, and how to access the
Event object. Using this knowledge, you will be ready to begin making dynamic
websites and applications!

Mastering Arrays

An array in JavaScript can be looked at as a kind of special variable, which is
able to hold more than one value at a time. Arrays can contain any data type,
including numbers, strings, Booleans and objects.

More specifically, an array is a type of a high-level, list-like object, which
consists of an ordered collection (or list) containing zero or more data types. We
use numbered indices starting from 0 to access specific items.

Let’s cover the basics with some examples!

Creating an Array

1 var shapes = [‘Square’, ‘Circle’, 'Triangle']; 2 console.log(shapes.length); // 3

How can we access each array item?

1 var first = shapes[0]; // Square 2 var second = shapes[1]; // Circle 3 var last =
shapes[shapes.length — 1]; // Triangle

Looping over an Array

You could use any looping method, but let’s go with forEach:

1 shapes.forEach(function(item, index, array){ 2 console.log(item, index); 3 });
4 5 // Square 0 6 // Circle 1 7 // Triangle 2

Adding to the end of an Array

We use the push() method:

1 var addItem = shapes.push(‘Rectangle’); 2 3 // [“Square”, “Circle”, “Triangle”,
"Rectangle"]

Removing from the end of an Array

We use the pop() method:

1 var removeItemEnd = shapes.pop(); 2 3 // [“Square”, “Circle”, “Triangle"]

Removing from the front of an Array

We use the shift() method:

1 var removeItemFront = shapes.shift(); 2 3 // [“Circle”, "Triangle"];

Adding to the front of an Array

We use the unshift() method:

1 var addItemFront = shapes.unshift(‘Hexagon’); 2 3 // [“Hexagon”, “Circle”,
"Triangle"];

Getting the index of an Array item

We use the indexOf() method:

1 var pos = shapes.indexOf(‘Circle’); 2 3 // 1

Removing an item by index position

We use the splice() method:

1 var removedItem = shapes.splice(1, 1); 2 3 // [“Hexagon”, “Triangle”]

Remove multiple items from an index position

1 var colors = [‘Red’, ‘Green’, ‘Blue’, ‘Yellow’]; 2 3 console.log(colors); 4 5 //
[“Red”, “Green”, “Blue”, “Yellow”] 6 7 var pos = 1, n = 2; 8 var removedItems
= colors.splice(pos, n); 9 10 // We use n to define the number of items to be
removed, \ 11 from pos until n inclusive. 12 13 console.log(colors); 14 // [“Red”,
“Yellow”] 15 16 console.log(removedItems); 17 // [“Green”, “Blue”]

Copying an Array

We assign our array to a new variable using the slice() method:

1 var arrayCopy = shapes.slice(); 2 3 // [“Hexagon”, “Triangle”]

Checking if an object is an Array

We use the isArray() method to test if objects are arrays:

## 1. Array.isArray(shapes); 2 3 // true

Reversing the order of an Array

We use the reverse() method:

1 var food = ['pizza', 'pasta', 'salad', 'bread']; 2 3 food.reverse(); 4 5 // ["bread",
"salad", "pasta", "pizza"]

Replacing Array elements with static values

We use the fill() method to replace elements with a static value:

1 food.fill("yum"); 2 3 // ["yum", "yum", "yum", "yum"]

If instead, we wished to replace only some elements, we can set start and end
points:

1 food.fill("yum", 1); 2 3 // ["bread", "yum", "yum", "yum"] 4 5 food.fill("yuck",
2,4); 6 7 // ["pizza", "pasta", "yuck", "yuck"]

Sorting an Array

We use the sort() method to sort our elements based on the first character in the
element.

Note: If our first character is identical, it will compare the second, then the third
and so on.

1 var food = ['pizza', 'pasta', 'salad', 'bread']; 2 3 food.sort(); 4 5 // ["bread",
"pasta", "pizza", "salad"]

If any of our Array items begin with an uppercase character, they would be
sorted before lowercase items, such as:

1 var food = ['pizza', 'pasta', 'Salad', 'bread']; 2 3 food.sort(); 4 5 // ["Salad",
"bread", "pasta", "pizza"]

When working with arrays of numbers, the default behaviour is not what you
might expect:

1 var numbers = [111, 2, 45, 32, 788, 4, 7]; 2 3 // [111, 2, 32, 4, 45, 7, 788]

The sort() method only checks the first character in the number.

So for proper ordering, you could create a function like so:

1 function sortNumber(a,b) { 2 return a - b; 3 } 4 5 numbers.sort(sortNumber);
6 7 // [2, 4, 7, 32, 45, 111, 788]

Or you could go for extra fancy points by using arrow functions:

1 numbers.sort((a, b) => a - b); // For ascending sort 2 numbers.sort((a, b) => b a); // For descending sort

Merging Arrays

We use the concat() method to merge two or more arrays together:

1 var dogs = ['Labrador', 'Chihuahua', 'Greyhound', 'Beagle\ 2 ']; 3 4 var cats =
['Persian', 'Siamese', 'Ragdoll', 'Bengal']; 5 6 var animals = dogs.concat(cats); 7 8
animals; 9 10 // ["Labrador", "Chihuahua", "Greyhound", "Beagle", "Pers\ 11
ian", "Siamese", "Ragdoll", "Bengal"]

Converting Array Elements into a String

We use the join() method:

1 var dogs = ['Labrador', 'Chihuahua', 'Greyhound', 'Beagle\ 2 ']; 3 4 var
joinedDogs = dogs.join(); 5 6 joinedDogs; 7 8 //
"Labrador,Chihuahua,Greyhound,Beagle"

If we want whitespace in our new string or any other separator for that matter,
we add it as a parameter to our join(), like so:

1 var joinedDogs = dogs.join(', '); 2 3 joinedDogs; 4 5 // "Labrador, Chihuahua,
Greyhound, Beagle"

map(), filter() and reduce()

We use the map() method to apply a function to every element of an array.

Say we want to add 10 to every number in an array:

1 var numbers = [1, 2, 3, 4, 5]; 2 3 var add10 = numbers.map((val, i, arr) => { 4
return val + 10; 5 }); 6 7 numbers; 8 9 // [1, 2, 3, 4, 5]; 10 11 add10; 12 13 // [11,
12, 13, 14, 15]

We use the filter() method to create a new array with the elements that satisfy a
condition set by an argument function.

Say we want to filter out negative numbers from an array:

1 var numbers = [-52, 520, 0, -100, 34]; 2 3 function isPositive(value) { 4
return value > 0; 5 } 6 7 var filtered = numbers.filter(isPositive); 8 9 filtered; 10
11 // [520, 34]

We use the reduce() method to reduce an array to a single value.

Say we want to produce the average of all numbers in an array:

1 var numbers = [300, 43, 888, 2]; 2 3 var average = numbers.reduce((total,
amount, index, array\ 4 ) => { 5 total += amount; 6 if( index === array.length
- 1) { 7 return total / array.length; 8 }else { 9 return total; 10 } 11 }); 12
13 average; 14 15 // 308.25

Find the first element that satisfies a function

We use the find() method:

1 var numbers = [10, 20, 30, 40, 50]; 2 3 var found =
numbers.find(function(element) { 4 return element > 30; 5 }); 6 7 found; 8 9 //
40

Similarly, we can use the findIndex() method to return the first index position,
rather than the element itself:

1 var numbers = [10, 20, 30, 40, 50]; 2 3 var found =
numbers.findIndex(function(element) { 4 return element > 30; 5 }); 6 7 found;
8 9 // 3

Mastering Objects

Objects in JavaScript are used to store collections of data in the format of “key:
value” pairs. Contained within an object we can have any number of variables
and/or functions which are then referred to as object properties and methods.

Creating an Object

Let’s work with an example! To initialize a variable car as an object, we use
curly braces {}:

1 var car = {};

We now have an empty object which can be accessed via the Developer Tools
console, by simply typing our variable name:

1 car 2 3 // {} [object]

An empty object isn’t all that useful, so let’s update it with some data:

1 var car = { 2 name: 'Tesla', 3 model: 'Model 3', 4 weight: 1700, 5 extras:
['heated seats', 'wood decor', 'tinted glass'], 6 details: function() { 7 alert('This

' + this.name + ' is a ' + this.model + '\ 8 it weighs ' + this.weight + 'kg and
includes the followi\ 9 ng extras: ' + this.extras[0] + ', ' + this.extras[1] + '\ 10
and ' + this.extras[2] + '.'); 11 }, 12 display: function() { 13 alert('This car is
a ' + this.name + '.'); 14 } 15 };

Let’s access this data in our developer tools console:

1 car.name
// Tesla 2 car.model
// Model 3 3 car.weight // 1700 4
car.extras[1] // wood decor 5 car.details() // This Tesla is a Model 3 it weighs
170\ 6 0kg and includes the following extras: heated seats, wo\ 7 od decor and
tinted glass. 8 car.display() // This car is a Tesla.

As you can see, each name/value pair must be separated by a comma, and the
name and value in each case are separated by a colon. The syntax will always
follow this pattern:

1 var objectName = { 2 member1Name: member1Value, 3 member2Name:
member2Value, 4 member3Name: member3Value 5 };

The value of an object member can be pretty much anything — in our car object,

we have two strings, a number, an array, and two functions. The first four items
are data items and are referred to as the object’s properties. The last two items
are functions that allow the object to do something with that data and are
referred to as the object’s methods.

This kind of object is called an object literal — we’ve literally written out the
object contents as we’ve created it. This is in comparison to objects instantiated
from classes, which we’ll take a look at later on.

Dot notation

Above, you’ve seen the object’s properties and methods accessed using dot
notation. The object name car acts as the namespace — it needs to be entered
first to access anything within the object. Then you write a dot, followed by the
item you want to access — this can be the name of a simple property, an item of
an array property, or a call to one of the object’s methods, for example:

1 car.name 2 car.extras[1] 3 car.details()

Deleting Properties

We can use the delete operator to remove properties, like so:

1 car.model 2 // Tesla 3 3 4 delete car.model 5 6 car.model 7 // undefined

Square Brackets

If for example, we had a multi-word property within our object, such as:

1 var user = { 2 name: "Sam", 3 age: 32, 4 "likes potatoes": true // a
multiword property name mu\ 5 st be quoted 6 };

We couldn’t access the multi-word property with dot-notation:

1 user.likes potatoes

// syntax error!

This is because a dot requires the key to be a valid variable identifier. That is no
spaces and other limitations.

The alternative is to use square brackets, which works with any string:

1 let user = {}; 2 3 // set 4 user["likes potatoes"] = true; 5 6 // get 7
alert(user["likes potatoes"]); // true 8 9 // delete 10 delete user["likes potatoes"];

Updating object members

We can update the values within our objects by simply declaring the property
you’d like to set with the new value, like so:

1 user.age

// 32 2 user.age = 33

// 33 3 user.age

// 33

You can also create completely new members of your object. For example:

1 user.surname = 'Smithessson'; 2 // user 3 {name: "Sam", age: 33, likes
potatoes: true, surname: "Sm\ 4 ithessson"}

What is “this”?

You may have noticed the use of the word ‘this’ in our earlier example. See the
following:

1 display: function() { 2 alert('This car is a ' + this.name + '.'); 3 }

The this keyword refers to the current object that the code is being written inside
of— so in this case this is equivalent to car.

Why not just write car instead? It’s best practice to write well-constructed
object-orientated code, and in doing so the use of this is extremely useful. It will
ensure the correct values are used when a member’s context changes (e.g. two
different car object instances may have different names, but will want to use
their own name when displaying their own information).

For example:

1 var car1 = { 2 name: 'Tesla', 3 display: function() { 4

alert('This car is a ' +

this.name + '.'); 5 } 6 } 7 var car2 = { 8 name: 'Toyota', 9 display: function()
{ 10 alert('This car is a ' + this.name + '.'); 11 } 12 }

In this case, car1.display() will output “This car is a Tesla.” And car2.display()
will output “This car is a Toyota.”, even though the method’s code is exactly the
same in both cases.

As this is equal to the object the code is inside —this becomes really useful
when you are dynamically generating objects (for example using constructors),
which is outside the scope of this article!

And that’s it! You should now have a good idea of how to work with objects in
JavaScript — including creating your own simple objects, as well as accessing
and manipulating object properties. You‘ll also begin to see how objects are very
useful as structures for storing related data and functionality.

For instance, if you tried to keep track of all the properties and methods in our
car object as separate variables and functions, it would be extremely inefficient,
and we’d run the risk of clashing with other variables and functions that have the
same names. Objects let us keep the information safely locked away in their own
package.

Using Conditionals

When we want to introduce logic & make decisions in our programs, we use
conditionals. With conditionals, we can control the behavior of our code — by
determining whether or not pieces of code can run.

For example, when using a weather app, if the weather is sunny we could see a
sun image, or if it’s raining we could see a rain-cloud image. Let’s now take a
look at how we can implement conditionals in our code…

if/else Statements

The most common type of conditional statements are if and else statements. The
syntax looks like so:

1 if (condition) { 2 run this code if the condition is true 3 } else { 4 run this
code instead 5 }

We use if followed by a set of parentheses that contain our condition. The
condition will make use of comparison operators to test whether our condition
evaluates to true or false, and it’ll return the result.

If the result is true, the code in the following set of curly braces will execute.
The code in this section can be whatever we like.

If the result is false, the code contained within the curly braces following our
else statement will execute instead.

Let’s take a look at an example:

1 if (hour < 12) { 2 notify = "It is AM"; 3 } else { 4 notify = "It is PM"; 5 }

In our above code, our notify variable will be set to “It is AM” if the hour is less
than 12. Otherwise hour is greater than 12 and will be set to “It is PM”.

else if

Of course, we will often have more than two choices to work with! To consider
these additional choices we use else if. We put additional blocks in between our
if () {} and else {} statements. Let’s adjust our previous example to see this in
action:

1 if (hour < 12) { 2 notify = "It is Morning"; 3 } else if (hour < 19){ 4 notify =
"It is Afternoon"; 5 } else { 6 notify = "It is Evening"; 7 }

Comparison operators

To test the conditions inside our conditional statements, we use comparison
operators. These operators are as follows:

=== and !== — to test if one value is equal to, or not equal to, the other.
< and > — to test if one value is less than or greater than the other.
<= and >= — to test if one value is less than or equal to, or greater than or equal
to, the other.

A very common pattern when doing comparisons in conditional statements is to
test Booleans (true and false). Any value that is not false, undefined, null, 0,
NaN, or an empty string ('') will in fact return true when tested as a conditional
statement. This means you can easily use a variable name on its own to test
whether it is true, or even that it exists at all (i.e. it is not undefined.) For
example:

1 let snack = 'Cheetos'; 2 3 4 if (snack) { 5 console.log('I have Cheetos!'); 6 }
else { 7 console.log('No Cheetos this time..'); 8 }

Nesting if/else

There will be times when you’ll want to nest an if/else statement inside of
another one — and it’s fine to do so! Let’s see an example:

1 if (snack === 'Cheetos') { 2 if (hungerLevel > 5) { 3 console.log('My
hunger level is' + hungerLevel + ' an\ 4 d I have Cheetos. So I will eat them!'); 5
} else if (hungerLevel <= 5) { 6 console.log('My hunger level is' +
hungerLevel + ' an\ 7 d even though I have Cheetos. I\'m not that hungry so I w\
8 on\'t eat them yet!'); 9 } 10 }

Logical operators: AND, OR, and NOT

We can also test multiple conditions without needing to write nested if/else
statements, we do this with logical operators:

AND: &&- lets you chain together two or more expressions. Every
expression must evaluate to true for the whole expression to return true.

Let’s rewrite our previous example using AND:

1 if (snack === 'Cheetos' && hungerLevel > 5) { 2 console.log('My hunger
level is' + hungerLevel + ' and \ 3 I have Cheetos. So I will eat them!'); 4 } else if
(snack === 'Cheetos' && hungerLevel <= 5) { 5 console.log('My hunger level
is' + hungerLevel + ' and \ 6 even though I have Cheetos. I\'m not that hungry so
I won\ 7 \'t eat them yet!'); 8 }

The first code block will only run if snack === 'Cheetos' and hungerLevel < 5
return true.

OR:||- also lets you chain together two or more expressions. One or more of
them have to evaluate to true for the whole expression to return true.

Let’s see an example using OR:

1 if (trafficLightIsGreen || carStatus === 'working') { 2 console.log('You should
commence driving.'); 3 } else { 4 console.log('Might be an issue.'); 5 }

NOT: ! - can be used to negate an expression. Let’s combine it with OR in
the above example:

1 if (!(trafficLightIsGreen || carStatus === 'working')){ 2 console.log('You
should commence driving.'); 3 } else { 4 console.log('Might be an issue.'); 5 }

In this example, our OR statement returns true, however, the NOT operator will
negate it - so that the overall expression now returns false.

A common mistake when using the logical OR operator in conditional
statements is to try to state the variable whose value you are checking once, and
then give a list of values it could be to return true, separated by || (OR) operators.
For example:

1 if (x === 10 || 20 || 30 || 40) { 2 // run this code 3 }

In this case, the condition inside if(...) will always evaluate to true since 20 (or
any other non-zero value) always evaluates to true. This condition is actually
saying “if x equals 10, or 20 is true — which it always is”. This is logically not
what we want! To make this work you’ve got to specify a complete test on either
side of each OR operator:

1 if (x === 10 || x === 20 || x === 30 || x === 40) { 2 // run this code 3 }

switch statements

if/else statements do a great job of enabling conditional code, but they are not
always the best way to handle every scenario. They are mainly useful when
you’ve got a couple of options, and each one requires a reasonable amount of
code to be run. They’re also useful when the conditions are complex (e.g.
multiple logical operators).

For cases where you just want to set a variable to a certain choice of value or
print out a particular statement depending on a condition, the syntax can be a bit
inefficient, especially if you’ve got a large number of choices.

This is when we should consider using a switch statement! — they take a single
expression/value as an input and then look through a number of choices until
they find one that matches that value, executing the corresponding code that
goes along with it. Let’s see an example:

1 switch (new Date().getDay()) { 2 case 0: 3 day = "Sunday"; 4 break; 5
case 1: 6 day = "Monday"; 7 break; 8 case 2: 9 day = "Tuesday"; 10
break; 11 case 3: 12 day = "Wednesday"; 13 break; 14 case 4: 15 day =
"Thursday"; 16 break; 17 case 5: 18 day = "Friday"; 19 break; 20 case
6: 21 day = "Saturday"; 22 }

We use the keyword switch, followed by a set of parentheses that contains our
expression. This is followed by the keyword case, followed by a choice that the
expression/value could be, followed by a colon. We then include some code to
run if the choice matches the expression. And finally a break statement.

If the previous choice matches the expression/value, the browser stops executing
the code block here and moves on to any code that appears below the switch
statement. We can include as many other cases as we need!

Ternary operator

In this final section of the chapter, let’s take a look at the ternary operator. It’s a
small piece of syntax that tests a condition and returns one value/expression if
it’s true, and another if it’s false — this can be useful in some situations and
takes up a lot less code than an if/else block. The pseudocode looks like this:

1 ( condition ) ? run this code : run this code instead

So let’s look at a simple example:

1 let age = 25; 2 let beverage = (age >= 18) ? "Beer" : "Apple Juice"; 3
console.log(beverage); // "Beer"

If age is true, the customer can buy a beer, if not, all we have to sell them is
apple juice.

Mastering Loops

In JavaScript, we use loops when we want an easy way to handle repetition. In
this chapter, we’re going to take a look at all the different ways we can create
loops in our code — and we’ll consider the pros and cons of each method.

A way to think of a loop could be to think of giving commands to a robot. You
could tell it to take 10 steps — and rather than issuing 10 separate commands,
we can create a loop:

1 let i; 2 for (i = 0; i < 10; i++) { 3 document.write("Take one step!\n"); 4 }

This is an example of a for loop. At first, this may be confusing — but we’ll
break it all down in the next section! In this article, we’ll be reviewing many
different kinds of loop statements, such as: for, do...while, while, labelled
statement, break statement, continue statement, for...in & for...of. It’s worth
noting that despite their differences in syntax — loops all essentially do the same
thing: repeat an action a number of times. The situation dictates which type of
loop is best suited.

the for loop

As we’ve seen in the above example, a for loop will repeat until our condition
evaluates to false. The logical structure is like so:

1 for ([initialExpression]; [condition]; [incrementExpressi\ 2 on]) 3 statement

We are first initializing the initialExpression, which usually initializes one or
more loop counters, but the syntax even allows for more complex expressions
such as variables. We next evaluate our condition, if true, the loop statements
will execute. If false, the loop terminates.

Then the statement executes. When we wish to execute multiple statements, we
use a block statement ({ ... }) to group them together. If present, the update
expression incrementExpression is executed. Control then returns to evaluating
the condition.

Let’s now return to our previous example:

1 let i; 2 for (i = 0; i < 10; i++) { 3 document.write("Take one step!\n"); 4 }

Here we can see our for statement is counting the number of steps taken up to
10. The variable i will ensure we’re starting from the beginning by initializing to
zero. Then it will check that i is less than the number we specify, which in our
case is 10. The i++ is the count which will increment i by 1 after each pass
through the loop. So our loop knows when to complete!

do…while statement

A do...while statement will repeat until the condition evaluates to false. The
structure is like so:

1 do 2 statement 3 while (condition);

It’s fairly self-explanatory, statement is always executed once prior to the
condition being checked. And then again until the while condition returns false.
We can execute multiple statements, using a block statement ({ ... }) to group
them. If condition is true, the statement executes again. At the end of each
execution, the condition is checked. When the condition returns false, the
execution stops and control passes to the statement which follows do...while.

1 let i = 0; 2 do { 3 i += 1; 4 console.log(i); 5 } while (i < 10);

Here our do loop iterates at least once and then reiterates until i is no longer less
than 10.

while statement

A while statement executes its statements as long as a specified condition
evaluates to true. Its syntax is as follows:

1 while (condition) 2 statement

If the condition becomes false, the statement within the loop stops executing and
control then passes to the statement following the loop.

The condition test occurs before the statement in the loop is executed. And if the
condition returns true, the statement is executed and the condition is tested again.
If the condition returns false, execution will stop and control is passed to the
statement following while.

And as with do...while, we can execute multiple statements using a block
statement () to group them together.

The following while loop will iterate as long as a is less than three:

1 let a = 0; 2 let b = 0; 3 while (a < 3) { 4 a++; 5 b+= a; 6 }

Here with each iteration, the loop increments a and adds that value to b.
Therefore, a and b take on the following values:

After the first pass through the loop : a = 1 and b = 1
And the second pass: a = 2 and b = 3
And the third pass: a = 3 and b = 6

After completion of the third pass, the condition a < 3 is no longer true, so that’s
where our loop terminates!

Note: When you first start working with loops, you may accidentally create
an infinite loop. This is when a loop condition never evaluates to false. The
statements in the following while loop execute forever because the condition
is never false:

1 while (true) { 2 console.log('Hi there!'); 3 }

CAUTION: If you run this code — please be aware that it’s likely to crash your
browser!! So make sure you’ve backed up your open tabs - if you want to see
what happens.

labelled statement

You can attach a label to any statement to serve as an identifier so you can refer
to it elsewhere in your program. As an example, you could use a label to identify
a loop, and then use break or continue statements to indicate whether a program
should interrupt the loop, or continue its execution (we’ll take a look at these
below).

1 label : 2 statement

The value of label may be anything you like (with the exception of a JavaScript
reserved word). Then you provide thestatement to execute.

So for example, you could use the label totalLoop to identify a while loop.

1 totalLoop: 2 while (total == true) { 3 doSomething(); 4 }

break statement

We use the break statement to terminate a loop or switch, or in conjunction with
a labelled statement.

When you use break without a label, it terminates the innermost enclosing while,
do-while, for, or switch immediately and transfers control to the following
statement.
When you use break with a label, it terminates the specified labelled statement.

A break statement looks like this:

1 break [label];

For example, let’s loop through an array until we find the index of an element
with the value of: foundMe

1 for (let i = 0; i < a.length; i++) { 2 if (a[i] == foundMe) { 3

break; 4 } 5 }

And let’s use break with a labelled statement:

1 let x = 0; 2 let z = 0; 3 endLoops: while (true) { 4 console.log('Outer loops: '
+ x); 5 x += 1; 6 z = 1; 7 while (true) { 8 console.log('Inner loops: ' + z); 9
z += 1; 10 if (z === 10 && x === 10) { 11
break endLoops; 12 } else
if (z === 10) { 13
break; 14 } 15 } 16 }

continue statement

We use the continue statement to restart a while, do-while, for, or label
statement.

When you use continue without a label, it terminates the current iteration of the
innermost enclosing while, do-while, or for statement and continues execution of
the loop with the next iteration. This contrasts with the break statement, as
continue doesn’t terminate the execution of the loop entirely. In a while loop, it
jumps back to the condition. In a for loop, it jumps to the initial-expression.
When you use continue with a label, it applies to the looping statement identified
with that label.

A continue statement looks like so:

1 continue [label];

For example, the following code block shows a while loop with a continue
statement that will execute when the value of i is three. So n takes on the values
one, three, seven, and twelve.

1 let i = 0; 2 let n = 0; 3 while (i < 5) { 4 i++; 5 if (i == 3) { 6 continue; 7 }
8 n += i; 9 console.log(n); 10 } 11 // 1,3,7,12 12 let i = 0; 13 let n = 0; 14
while (i < 5) { 15 i++; 16 if (i == 3) { 17 // continue; 18 } 19 n += i; 20
console.log(n); 21 } 22 // 1,3,6,10,15

for…in statement

A for...in statement iterates a specified variable over all the enumerable
properties of an object. For each distinct property, JavaScript executes the
specified statements. The syntax is as follows:

1 for (variable in object) { 2 statements 3 }

The following function takes as its argument an object and the object’s name. It
then iterates over all the object’s properties and returns a string that lists the
property names and their values.

1 function get_names(obj, obj_name) { 2 let result = ''; 3 for (let i in obj) { 4
result += obj_name + '.' + i + ' = ' + obj[i] + '<br>\ 5 '; 6 } 7 result += '<hr>';
8 return result; 9 }

For an object food with properties lunch and dinner, result would be:

1 food.lunch = Sandwich 2 food.dinner = Lasagna

Note: Given that for...in is built for iterating object properties, it’s not
recommended for use with arrays — where the index order is important. For
arrays, it’s better to use the more traditional for loop.

for…of statement

A for … of statement creates a loop that iterates over iterable objects, such as
Array, Map, Set, arguments and so on. The syntax is like so:

1 for (variable of object) { 2 statement 3 }

The below example shows the difference between a for...of loop and a for … in
loop. While for...in iterates over property names, for...of iterates over property
values:

1 let arr = [10, 20, 30]; 2 arr.greet = 'hello'; 3 for (let i in arr) { 4 console.log(i);
// logs "0", "1", "2", "greet" 5 } 6 for (let i of arr) { 7 console.log(i); // logs 10,
20, 30 8 }

And that’s it! We’ve learned about many of the different loop statements, such
as: for, do...while, while, labeled statement, break statement, continue statement,
for..in & for...of. And we’ve looked at a number of examples highlighting ideal
use cases for each type of loop. Whichever statements we choose to utilize,
we’re now well equipped to add logic and reasoning to our programs.

Mastering Functions

Functions can be thought of as one of the core building blocks of our JavaScript
programs. A function is simply a set of statements designed to perform a
particular task — which is executed whenever it is invoked (or “called”).

In this chapter we’re going to take a look at defining functions, function
expressions, calling functions, scope, nesting, closures, the arguments object,
function parameters & arrow functions!

Defining functions

A function definition (otherwise known as a function declaration, or function
statement) will always begin with the function keyword. What follows is the
name of our function, any parameters enclosed in parenthesis, and then our
JavaScript statements (enclosed in { }) which are executed when our function is
called.

1 function multiply(a, b) { 2 return a * b; 3 }

Our function multiply takes two parameters (a and b). Included in-between the
curly braces is a statement that returns the result of the first parameter a
multiplied by the second parameter b.

Function expressions

There is another way to define a function, known as the function expression.
These types of functions can actually be anonymous. They don’t need to be
given a name.

For example, our previous multiply function could’ve also been defined like so:

1 let multiply = function(a, b) { return a * b; }; 2 let x = multiply(2,2); // x
returns 4

A typical use case for function expressions might be when passing a function as
an argument to another function.

We can also define a function based on a condition. For example, the following
function defines addItem only if num equals 1:

1 let addItem; 2 if (num === 1) { 3 addItem = function(shoppingList) { 4
shoppingList.item = 'Apples'; 5 } 6 }

Calling functions

When we define a function all we’ve done is given it a name & specified what to
do when the function executes. So to actually run the function, we’ll need to call
it within our program!

To call our earlier function multiply, we could invoke it as follows:

1 multiply(2,2);

Here we’re calling our function which is set to receive two arguments with the
arguments of 2 and 2. The function executes and runs its statements which
returns the result of 4(2 multiplied by 2).

Functions need to be in scope when they are called, but the function declaration
can be hoisted (appear below the call in the code), like so:

1 console.log(multiply(2,2)); 2 /* ... */ 3 function multiply(a,b) { return a * b; }

The scope of a function is the function in which it is declared, or the entire
program if it is declared at the global level.

Note: This only works with function declarations. Not function expressions!

Function scope

When variables are defined inside a function they cannot be accessed anywhere
outside of that function. As that would be outside the scope. However, a function
is able to access all variables and functions defined inside the scope in which it
is defined. So a function defined in the global scope can access all variables
defined in the global scope. A function defined inside another function can also
access all variables defined in its parent function and any other variable to which
the parent function has access.

Let’s see an example…

1 // These variables are defined globally (global scope) 2 let a = 10, 3 b = 3, 4
name = 'Bruce'; 5 // This function is defined globally 6 function multiply() { 7
return a * b; 8 } 9 multiply(); // returns 30 10 // Working with a nested function
11 function multiplyAssign() { 12 let a = 20, 13
b = 6; 14 15 function
add() { 16 return name + ‘ received’ + (a * b); 17 } 18 19 return add(); 20
} 21 multiplyAssign(); // returns "Bruce received 120"

Nesting functions and closures

So you can nest a function within a function! The nested (inner) function is
private to its containing (outer) function. It also forms a closure. A closure is an
expression (usually a function) that can have free variables together with an
environment that binds those variables (it “closes” the expression).

And as a nested function is a closure, it’s able to “inherit” the arguments and
variables of its containing function.

As follows:

1 function addSquares(a, b) { 2 function square(x) { 3 return x * x; 4 } 5
return square(a) + square(b); 6 } 7 a = addSquares(2, 3); // returns 13 8 b =
addSquares(3, 4); // returns 25 9 c = addSquares(4, 5); // returns 41

Since the inner function forms a closure, you can call the outer function and
specify arguments for both the outer and inner function!

Closures

As we now know, we can nest our functions and JavaScript will give the inner
function full access to all the variables and functions defined inside the outer
function (as well as all variables & functions that it has access to).

However, the outer function does not have access to the variables and functions
defined inside the inner function! A closure is created when the inner function is
somehow made available to any scope outside the outer function.

1 // The outer function defines a "name" variable 2 let user = function(name) { 3
let getName = function() { 4 return name;
5 // The inner function
can access the "name" variable \ 6 of the outer function 7 } 8 // Return the
inner function, and expose it to outer scop\ 9 es 10 return getName;
11 }
12 makeAdmin = user('Steve Stevesson'); 13 14 makeAdmin(); // returns
"Steve Stevesson"

The arguments object

The arguments of any function are maintained in an array-like object. Within a
function, you can address the arguments passed to it as follows:

1 arguments[i]

Here i is the first number of the argument, starting at zero. So, the first argument
passed to a function would be arguments[0]. The total number of arguments
would be arguments.length.

Using the arguments object, you can call a function with more arguments than it
is formally declared to accept. This is often useful if you don’t know in advance
how many arguments will be passed to the function. You can use
arguments.length to determine the number of arguments actually passed to the
function, and then access each argument using the arguments object.

For example, consider a function that concatenates several strings. The only
formal argument for the function is a string that specifies the characters that
separate the items to concatenate. The function is defined as follows:

1 function myConcat(separator) { 2 let result = ''; // initialize list 3 let i; 4 //
loop through arguments 5 for (i = 1; i < arguments.length; i++) { 6
result +=
arguments[i] + separator; 7 } 8 return result; 9 }

You can pass any number of arguments into this function, and it’ll concatenate
each argument into a string “list”:

1 myConcat(', ', 'fred', 'wilma', 'barney', 'betty'); 2 // returns "fred, wilma, barney,
betty, " 3 myConcat('; ', 'marge', 'homer', 'lisa', 'bart', 'maggie'\ 4 ); 5 // returns
"marge; homer; lisa; bart; maggie; " 6 myConcat('. ', 'jerry', 'kramer', 'elaine',
'george', 'ne\ 7 wman'); 8 // returns "jerry. kramer. elaine. george. newman. "

Note: The arguments variable is “array-like”, but not an array. It has a
numbered index and a length property. However, it does not possess all of the
array-manipulation methods.

Function parameters

There are two kinds of function parameters: default parameters and rest
parameters. Let’s now take a look at each…

Default parameters

In JavaScript, parameters of functions will default to undefined. However, in
some situations, it might be useful to set a different default value. This is where
default parameters are useful.

It’s actually quite simple to implement:

1 function multiply(a, b = 1) { 2 return a * b; 3 } 4 5 multiply(10); // 10

You can simply put 1 as the default value for b in the function head.

Rest parameters

The rest parameter syntax allows us to represent an indefinite number of
arguments as an array.

In this example, we use the rest parameters to collect arguments from the second
one to the end. We then multiply them by the first one. This example uses an
arrow function, which we’ll look at next!

1 function multiply(multiplier, ...theArgs) { 2 return theArgs.map(x =>
multiplier * x); 3 } 4 5 let arr = multiply(2, 1, 2, 3); 6 console.log(arr); // [2, 4, 6]

Arrow functions

An arrow function has a much shorter syntax compared to function expressions.
For example, here is a regular function:

1 function funcName(params) { 2 return params + 10; 3 } 4 5 funcName(2); //
12

And here is the same function, expressed as an arrow function:

1 let funcName = (params) => params + 10 2 3 funcName(2); // 12

The same function in just one line of code! Pretty neat!

If we have no parameters, we express our arrow function like this:

1 () => { statements }

And when we have just one parameter, the opening parenthesis are optional:

1 parameters => { statements }

Finally, if you’re returning an expression, you can remove the brackets:

1 parameters => expression 2 3 // is the same as: 4 5 function (parameters){ 6
return expression; 7 }

Note: Unlike a regular function, an arrow function does not bind this. Instead,
this is bound to keep its meaning from its original context. We’ll be taking a
closer look at the “this” keyword later on!

Predefined functions

It’s well worth noting that JavaScript has numerous built-in functions! And
they’ll likely save you a lot of time, especially for common tasks. See:
https://www.tutorialspoint.com/javascript/javascript_builtin_functions.htm

And that’s all for this chapter! We’ve learned about defining functions, function
expressions, calling functions, scope, nesting, closures, the arguments object,
function parameters & arrow functions :)

What are classes?

JavaScript classes we’re introduced with ECMAScript 2015, they’re often
described as syntactical sugar over JavaScript’s existing structure of prototypical
inheritance. So while classes do not introduce a new inheritance model to
JavaScript — they do provide syntactical simplicity. This simplicity can help us
produce less error-prone & more readable code.

Classes are just like functions!

Classes are very similar to functions. Much like functions that have both
function expressions and function declarations, classes have two components:
class expressions and class declarations.

Class declarations

Let’s take a look at how we can define a class using a class declaration. We use
the classkeyword followed the name of the class:

1 class Image { 2 constructor(height, width) { 3
this.width = width; 5 } 6 }

this.height = height; 4

One important difference between function declarations and class declarations is
that function declarations are hoisted and class declarations are not. You first
need to declare your class and then access it, otherwise, code like the following
will throw a ReferenceError:

1 const p = new Image(); // ReferenceError 2 3 class Image{}

Class expressions

A class expression is the other way to define a class. Class expressions can be
named or unnamed. Note that the name given to a named class expression is
local to the class’s body. (So it’s retrievable through the classes name property):

1 // An unnamed class expression 2 let Image = class { 3 constructor(height,
width) { 4 this.height = height; 5 this.width = width; 6 } 7 }; 8
console.log(Image.name); 9 // output: "Image" 10 11 // A named class expression
12 let MyImage = class Image { 13 constructor(height, width) { 14
this.height = height; 15 this.width = width; 16 } 17 }; 18
console.log(MyImage.name); 19 // output: "Image"

Note: Class expressions are subject to the same hoisting restrictions as
described previously in the Class declarations section.

Constructors

The constructor method is a special method within JavaScript that we use to
create and initialize an object created with a class. We can only use one method
with the name “constructor” within a class.

Our constructor can use the super keyword to call the constructor of the super
class (more on this later in the article!).

Instance properties

Instance properties must be defined inside of our class methods:

1 class Image { 2 constructor(height, width) { 3
this.width = width; 5 } 6 }

this.height = height; 4

If we wish to use static class-side properties and prototype data properties, these
must be defined outside of the classes body declaration:
