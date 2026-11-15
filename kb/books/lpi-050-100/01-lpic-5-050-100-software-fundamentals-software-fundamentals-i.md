---
id: lpi-050-100-01
title: "LPIC-5 · 050-100 — Software Fundamentals, Software Fundamentals, If the user enters…"
slug: lpi-050-100-01-lpic-5-050-100-software-fundamentals-software-fundamentals-i
source: "LPI Learning Material — LPIC-5 (Exam 050-100)"
sourceSection: "Topic 051: Software Fundamentals, 051. Software Fundamentals, 3. If the user enters a string of letters, Python would print an error as part of its error handling. If, 3. What is the advantage of a machine code file over bytecode?, 2. You have found several open source packages, offered in different"
track: linux-engineer
tier: free
tags: [linux, lpic-5, certification, security, cryptography]
summary: "Open Source Essentials version 1.0, Exam 050, Objective 051.1 Covers 21 sections: Software Fundamentals, Software Fundamentals, If the user enters a string of letters, Python would print an error as par."
---
# LPIC-5 · 050-100 — Software Fundamentals, Software Fundamentals, If the user enters…

## Topic 051: Software Fundamentals

### 051.1 Software Components
Open Source Essentials version 1.0, Exam 050, Objective 051.1
- Understanding the concept of source code and code execution
- Understanding the concept of compilers and interpreters
- Understanding the concept of software libraries
- Source code
- Executable programs
- Byte code
- Machine code
- Compiler
- Linker
- Interpreter
- Runtime virtual machine
- Algorithm
- Software libraries
- Static and dynamic linking

## 051. Software Fundamentals

### 051.1 Software Components

Free and open source software — often abbreviated as FOSS — has become an integral part of our
everyday lives, mostly without us being aware of it. FOSS, for example, can be found behind all of
our activities on the internet in some form: on the computer where we view web pages in the
browser, or on servers that store these web pages and deliver them as soon as we call them up.

What is Software?
Before we look at all the specifics of free and open source software, however, we need to clarify
what software actually is. Let’s start with a very general description: Software is the non-physical,
immaterial part of computers in any form. Software ensures that the physical parts (the
hardware) of the computer interact and that the computer can accept commands and execute
tasks.
A smartphone, a laptop, or a server in the data center is just a machine made of metal and plastic
when it is switched off. As soon as it is turned on, software starts up, in the form of coded
command sequences that control the individual components of this machine, that allow the user
to interact with the machine, and that perform very specific tasks by invoking individual

applications.
It is the work of software developers to analyze the tasks that the computer is supposed to perform
and to specify them in a way that allows the computer to implement them. The tools used by the
developers are as numerous and diverse as the tasks performed by the software.
Some software tasks are very closely connected to the hardware and the architecture of the
computer, e.g., the addressing and management of memory or the handling of different processes.
System programmers therefore work close to the hardware.
Application developers, on the other hand, focus more on the user and program applications that
enable users to perform their tasks both efficiently and intuitively. An example of a complex
application is a word processing program that provides all the functions for text formatting in
menus or buttons and also displays the text as it might ultimately be printed.
In general, an algorithm is a way of solving a problem. For instance, to calculate an average, the
normal algorithm is to add a collection of values and divide the sum by the total number of values.
Although algorithms are traditionally designed and carried out by programmers, algorithms are
also generated nowadays by artificial intelligence.
The concepts in this chapter can help you understand the strengths and risks of FOSS, make
informed choices, and even decide whether you want to be a software developer.

Programming Languages
Programming languages are highly structured, artificial languages that tell a computer what to do.
Programs are usually written in text, but some languages are written in graphical form. Software
developers write instructions (called code) to the computer in this artificial language. However,
the computer hardware does not directly execute this code. Hardware can directly execute only a
series of bit patterns stored in memory, called machine code or machine language. All
programming languages are either converted into machine code by a compiler or interpreted by
another machine code program called an interpreter to make the hardware execute these
instructions.
Some of the most widely used programming languages currently include Python, JavaScript, C,
C++, Java, C#, Swift, and PHP. Each of these programming languages has its own unique strengths
and weaknesses, and the choice of language depends on the project and the needs of the
developer. For example, Java is a popular choice for developing large-scale enterprise
applications, while Python is often used for scientific computing and data analysis.
Developers have shown impressive creativity in designing programming languages. Originally,
they were low-level languages that resembled the instructions in the computer. Languages have

become more and more high-level, meaning that they try to represent powerful combinations of
instructions is brief terms. Some languages reflect the way people naturally think, while
preserving the rigor necessary to run correctly.
About 400 programming languages are currently recognized, although many are used only in very
niche applications or legacy environments. Each was developed in order to solve in certain tasks.

Characteristics, Syntax, and Structure of Programming Languages
The choice of programming language can have a significant impact on performance, scalability,
and ease of development in a software project. These sections lay out important elements of
languages.
Characteristics of Programming Languages
Some of the common characteristics and qualities of programming languages include:
Concurrency
Concurrency denotes handling multiple tasks simultaneously, either by running on different
hardware processors or by alternating the tasks' use of a single processor. The degree of
concurrency supported by a programming language can greatly affect its performance and
scalability, especially for applications that require real-time processing or large amounts of
data. Each separate piece of work might be called a process, a task, or a thread.
Memory management
Memory management is allocation and freeing of memory in a program. Depending on the
language or runtime environment, memory management can be done manually by the
programmer or handled automatically. Proper memory management is crucial for ensuring
that a program uses memory effectively, and that it does not run out of memory or cause other
problems. If a program fails to free unused memory, the program causes a memory leak that
gradually increases the use of memory until the program crashes or negative performance
effects are noticeable.
Shared memory
Shared memory is a type of interprocess communication mechanism that enables multiple
processes to read and manipulate a common region of memory. Shared memory is common in
hardware such as disk drives, and can also be an efficient way to share data between
processes. But the mechanism requires careful synchronization and management to prevent
data corruption. An error known as a race condition occurs if one process makes an
unanticipated change to data while another process is using it.

Message passing
Message passing is a communication mechanism between processes that enables them to
exchange data and coordinate their activities. This is commonly used in concurrent
programming to achieve interprocess communication, and can be implemented through
various mechanisms such as sockets, pipes, or message queues.
Garbage collection
Garbage collection is an automatic memory management technique used by some
programming languages to reclaim memory that is no longer being used while a process is
running. This can help prevent memory leaks and make it easier for developers to write
correct and efficient code, but it can also introduce performance overhead and make control
over the precise behavior of the program more difficult.
Data types
Data types determine what type of information can be represented in the program. The data
types can be predefined in the language or user-defined, and can include integers, floatingpoint numbers (i.e., approximations of real numbers), strings, arrays, and others.
Input and output (I/O)
Input and output are mechanisms for reading and writing data to and from a program. Input
can come from a variety of sources, such as user clicks and keyboard input, a file, or a network
connection, while output can be sent to a variety of destinations, such as a display, a file, or a
network connection. I/O allows programs to interact with the outside world and exchange
information with other systems.
Error handling
Error handling detects and responds to errors that occur during the execution of a program.
This includes errors such as division by zero and a requested file that is not found. Error
handling allows programs to continue running even when errors occur, improving their
reliability and robustness.
The concepts just listed are fundamental to understanding how programming languages work and
how to write efficient and maintainable code.
Syntax of Programming Languages
The syntax of a programming language refers to rules for writing program statements and
expressions. It is important for the syntax to be well-defined and consistent, so that the
programmer can effectively write and understand their code. The following are the building
blocks of most programming languages:

Procedures and functions
Procedures and functions are used to define reusable blocks of code that can be called multiple
times.
Variables
Variables represent pieces of memory, and store data that can be manipulated and passed
between procedures and functions.
Operators
Operators are keywords or symbols (such as + and -) that assign values to variables and
perform arithmetic operations.
Control structure
Generally, program code is executed in the order that it is written, but conditional statements
change the flow of execution. Which code is executed next is based on various conditions, such
as the contents of memory, the state of the keyboard, packets arriving from the network, and so
on. The loop statement, a special form of conditional statement, is useful for performing the
same operations on a series of data sets. An exception, which invokes special code when an
error occurs, is another control structure.
The syntax and behavior of these constructs can vary between programming languages, and the
choice of language can have a big impact on the readability and maintainability of the code.
Libraries
A good programming language should make it easy to develop programs and easy to reuse
existing code. Many programming languages have a mechanism to organize procedures and
functions into parts that can be reused in other programs.
A library is a collection of procedures and functions in support of a particular feature or goal,
combined into a single file. The availability of many easy-to-use libraries is another very
important requirement of a good programming language. For example, Python is widely
recognized as a good language for developing AI-related programs because it has a number of
libraries suitable for AI processing.
With the increasing size and complexity of programs, libraries as ready-made building blocks are
becoming more and more important. This is especially true in the open source world, where
people are comfortable taking code that others have created and reusing it. As a result, an
ecosystem of libraries has developed for each programming language, and package managers
such as composer for PHP, pip for Python, and gems for Ruby make it easy to install libraries.

Libraries are also important in compiled languages. Combining multiple binary files and precompiled libraries to obtain a single executable file is called linking, and the tool that performs
this operation is called a linker. There are two types of linking: static linking, in which only the
necessary library code is included in the final application’s executable file, and dynamic linking, in
which a library installed in the system is shared by all applications that use that library.
Currently, dynamic linking is the preferred approach and is characterized by smaller application
executables and less memory usage at runtime.
Note that since the same libraries can be used by multiple programs, differences between versions
of a library can be even more of an issue than with applications. Let’s digress for a moment and
remember how to look at version numbers. Semantic versioning is commonly used, which
indicates versions by three numbers separated by dots. A typical version might be 2.39.16,
which indicates a major version of 2 (a number that is likely to change only once every few years),
a minor version of 39 within the major version (which may update every few months to contain
important feature changes), and a fast-moving revision of 16 (which can change because of a
single bug fix). Later versions and revisions have higher numbers.

A Very Simple Example
Let’s look at a very simple example of a computer program in the Python language to get a rough
idea of a few of the elements mentioned.
Stated in natural language, the program is supposed to do the following: “Ask the user to enter a
number and check whether this number is even or odd. Finally, output the result.”
And here is the code we can save in the file simpleprogram.py:
num = int(input("Enter a number: "))
if (num % 2) == 0:
print("The given number is EVEN.")
else:
print("The given number is ODD.")

Even in these few lines of code, we can find many of the characteristics and syntax elements
mentioned above:
1. In line 1 we set the variable num and assign it a value with the = operator.
2. The assigned value corresponds to the input of the user (via the input() function ). In addition,
the int() function ensures that this input is converted to the integer data type, if possible. The
expression that is passed to a function within parentheses is called a parameter or argument.

## 3. If the user enters a string of letters, Python would print an error as part of its error handling. If
a decimal number is entered, the function int() converts it to the base number, e.g. 5.73 to 5.
4. In the following lines, the control structure stating a condition, with the keywords if and else,
controls what happens in each of the two possible cases (the number is either even or odd).
5. First, the modulo operator % tests whether (if) dividing the entered number by 2 yields the
value 0 (i.e., no remainder) — in this case, the number is even. The doubled == is the “is equal
to” comparison operator, which is different from the assignment operator = in line 1.
6. In the other case (else), i.e. when the division by 2 produces a result unequal 0, the entered
number must be odd.
7. In both cases, the function print() returns the result as output in text form.
And this is what it looks like when we run the program on the command line:
$ python simpleprogram.py
Enter a number: 5
The given number is ODD.

When you consider how much language logic is already involved in this small example, you gain
an idea of what complex software distributed over thousands of files is capable of; for example,
operating systems such as Microsoft Windows, macOS, or Linux, which make all the hardware of a
computer available and at the same time ensure that the users can install all other desired
applications and use them for work or fun.

Machine Code, Assembly Language and Assemblers
As mentioned earlier, hardware can directly execute only a series of bit patterns called machine
code. The CPU reads a bit pattern from memory in units of a word (8 to 64 bits) and executes the
correlating instruction. Individual instructions are quite simple, for example, “copy the contents
of memory location A to memory location B,” “multiply the contents of memory location C by the
contents of memory location D,” or “read the data that has arrived at the device at address X.” In
the era of 8-bit CPUs, some people could memorize all the bit patterns used in machine code and
write programs directly. Nowadays, the number of instruction patterns has increased by an order
of magnitude, and trying to remember all of these patterns is impractical.
Machine code is a sequence of bit patterns, or 0s and 1s, which is not at all intuitive to humans. To
make programming more intuitive, assembly language was created, in which the instructions
were given names and could be specified by strings. In assembly language, instructions that
correspond one-to-one to the machine code are written one at a time. Instructions might look like:

move

[B], [A]

copy the contents of memory A to memory B

multi

R1, [C], [D]

multiply the contents of memory C by the contents of memory D

input

R1, [X]

read the data that has arrived at the device at address X

One instruction in assembly language corresponds to one instruction in machine code, which
corresponds to the exact instruction that the hardware can understand and perform. Advantages
of assembly language over machine language include:
Improved readability and maintainability
Assembly language is much easier to read and write than machine code. This makes it easier
for programmers to understand, debug, and maintain their code.
Address computation automation
Machine code programming can also use the concept of variables and functions, but everything
must be expressed in terms of memory addresses. Assembly language also assigns names to
memory addresses, which makes it easier to express the logic of a program.
Because assembly language has access to all of the hardware’s functionality, it is commonly used
in the following situations:
Architecture dependent part of the operating system
Using dedicated instructions that are specific to one CPU architecture, for access to
initialization and security features, can be done only in assembly language.
Developing low-level system components
Assembly language is used to develop system components that need to interact directly with
the computer’s hardware, such as device drivers, firmware, and the basic input/output system
(BIOS). In particular, high-speed devices that require pushing hardware performance to its
limits often need drivers and firmware programmed in assembly language.
Programming microcontrollers
Assembly language is also used to program microcontrollers, which are small, low-powered
computers used in a wide range of embedded systems from toys to industrial control. Some
microcontrollers have memory capacities of just several hundred bytes, and are commonly
programmed in assembly language.
Assembly language code is converted to machine code before being executed by an application
called an assembler. The assembler is the oldest programming tool and has brought a number of
advantages that were unthinkable in machine code programming. To confuse matters, sometimes
people refer to assembly language as assembler.

Machine code and assembly language differ from one hardware processor to another. They are
called “low-level languages” because they operate directly on hardware. However, the concepts of
computation and input/output are the same across all processors. If the common concepts can be
expressed in a way that is easier for humans to understand, programming efficiency can be
dramatically improved. This is where “high-level languages” come in.

Compiled Languages
Compiled languages are programming languages that are translated either into machine code or
into an intermediate format called bytecode. Bytecode is executed on the target computer by a
runtime virtual machine. The virtual machine translates the bytecode into the proper machine
code for each computer. Bytecode allows programs to be platform-agnostic and to run on any
system with a compatible virtual machine.
The translation of the source code written in a high-level programming language into machine
code or bytecode is done by a compiler. Examples of compiled languages that produce machine
code directly include C and C++. Languages that produce bytecode include Java and C#.
The choice between machine code and bytecode depends on the requirements of the project, such
as performance, platform agnosticism, and ease of development.

Interpreted Languages
Interpreted languages are programming languages that are executed by an interpreter, rather than
being compiled into machine code. The interpreter reads the source code and executes the
statements contained in it. An interpreter is able to directly process the source code, without
transforming it into another file format. Thus, unlike a compiler, which translates the entire
program into machine code before executing it, an interpreter reads each line of code and
executes it immediately, allowing the programmer to see the results of each line as they are
executed.
Interpreted languages are commonly used for scripting, which refers to short programs that
automate tasks, for command-line interfaces, and for batch and job control. Scripts written in
interpreted languages can be easily modified and executed without the need for recompilation,
making them well suited for tasks that require rapid prototyping or flexible and rapid iteration.
With this convenience come some potential drawbacks. For instance, an interpreted program
runs more slowly than its equivalent compiled program.
Examples of interpreted languages include Python, Ruby, and JavaScript. Python is widely used in
scientific computing, data analysis, and machine learning, while Ruby is often used in web
development and for creating automation scripts. JavaScript is a client-side scripting language

embedded in web browsers to create dynamic and interactive web pages.

Data-Oriented Languages
Data-oriented languages are programming languages that are optimized for processing and
manipulating large amounts of data. They are designed to efficiently handle large sets of
structured or unstructured data and provide a set of tools for working with databases, data
structures, and algorithms for data processing and analysis.
Data-oriented languages are used in a variety of applications, including data science, big data
analytics, machine learning, and database programming. They are well suited for tasks that
involve processing and analyzing large amounts of data, such as data cleaning and
transformation, data visualization, and statistical modeling.
Examples of data-oriented languages include SQL (short for Structured Query Language), R, and
MATLAB. SQL is a standard language used for managing relational databases and is widely used
in business and industry. R is a programming language and environment for statistical computing
and graphics and is widely used in data science and machine learning. MATLAB is a numerical
computing environment and programming language used in a wide range of applications,
including signal processing, image processing, and computational finance.

Programming Paradigms
Besides the specifics of programming languages, programming paradigms determine the
particular solution approach. We can think of a paradigm as a basic strategy with which we
approach a task, depending on the specific requirements and conditions.
A comparable example is the construction of a house: Whether masons erect the walls brick by
brick or ready-cast concrete components are assembled on site is a fundamental decision that
depends on requirements and circumstances. What features do you want the house to have?
Where is it located? Is it connected to other houses?
In a similar way, paradigms set the direction of programming: whether and in what way, for
example, a software project is broken into smaller, separate parts. Each programming language is
suited best to some particular paradigm. Therefore, the choice of paradigm is closely related to the
choice of programming language.
The following paradigms are common in programming:
Object-oriented programming (OOP)
OOP is based on the concept of objects, which are instances of classes that encapsulate data and

behavior. For instance, a language might offer a rectangle as a class to help the programmer
display a box on the screen.
OOP focuses on the object-level manipulation of data. OOP makes it easier to write code that is
maintainable, reusable, and extensible, and is widely used in desktop software, video games,
and web applications. Examples of object-oriented programming languages include Java, C#,
and Python.
Procedural programming
Procedural programming performs tasks through procedures, or blocks of code that can be
executed in a specific order. This makes it easy to write structured code that is easy to follow,
but can lead to code that is less flexible and harder to maintain as the size and complexity of
the project grows. Examples of procedural programming languages include C, Pascal, and
Fortran.
Other approaches to software development are in use today, for which some languages are better
suited than others. Additionally, drag-and-drop interfaces allow non-programmers to write
programs, and many online services have recently started to generate code through artificial
intelligence when given plain-language instructions.
In conclusion, each programming paradigm has its own strengths and weaknesses, and the choice
of paradigm often depends on the needs of the project, the experience and preferences of the
developer, and the constraints of the platform and development environment. Understanding the
different types of paradigms can help you choose the right paradigm for your needs, and can also
help you write better and more efficient code.

1. What is the purpose of functions?

2. What is the advantage of bytecode over a machine code file?

## 3. What is the advantage of a machine code file over bytecode?

1. What are some disadvantages of dividing a program into a large number of processes or tasks?

## 2. You have found several open source packages, offered in different versions, that provide
features you need for your program. What are some criteria for choosing a package?

## 3. In addition to OOP and procedural development paradigms, what other software development
approaches exist and what is a programming language which best supports each approach?

In this lesson you have learned what software is and how it is developed with the help of
programming languages. The numerous programming languages differ not only in their syntax,
but also, for example, in their management of hardware resources or handling of data structures.
Programming languages also differ in how the source code, readable by humans, is converted by
an interpreter or compiler into the final machine code to be processed by the computer.
Programming paradigms determine the strategy of software projects and thus also the choice of
suitable programming languages, depending on the requirements and the size of the respective
project.

## 1. What is the purpose of functions?
Functions encapsulate certain common activities, such as outputting a string. By making a
function, you can allow your program and other programs to perform the function
conveniently and repeatedly without having to write their own code for it.
2. What is the advantage of bytecode over a machine code file?
The bytecode file can run on many different computers, where a virtual machine turns the
code into machine code. For instance, JavaScript runs in many browsers on many types of
computers.
3. What is the advantage of a machine code file over bytecode?
Machine code runs as fast as possible. Bytecode runs more slowly because the virtual machine
must turn it into machine code while running the bytecode.

1. What are some disadvantages of dividing a program into a large number of processes or tasks?
When a program is divided into processes, they must communicate with each other. If they
work on a lot of data in common, the processes could expend a lot of overhead in data
exchange and in protecting data from multiple, simultaneous changes (race conditions).
Processes also incur overhead when they start up and terminate. The more processes you have,
the more complex the program and its interactions become, so errors can be harder to find.
The functional paradigm tends to make it easier to divide programs into many processes,
because of immutability. Immutable data does not suffer from race conditions.
2. You have found several open source packages, offered in different versions, that provide
features you need for your program. What are some criteria for choosing a package?
Check bug reports and security advisories for the packages, because some are very buggy and
even unsafe. Sometimes the latest version is not the best, because a security flaw might have
been introduced into it.
Peruse the forum where developers talk about the package, to see that it is actively maintained.
Your program will probably be in use for a long time, and you want the package to be available
and robust over time as well.
Try different packages to check their performance, as well as their correctness.
Most packages depend on functions found in other packages (dependencies), so a weakness in
one of the dependencies can affect your program.
3. In addition to OOP and procedural development paradigms, name some other software
development approaches and a programming language that best supports each approach.
In addition to OOP and procedural development paradigms, other types include the following.
Functional programming emphasizes the use of functions and mathematical concepts, such as
lambdas and closures, to write code that is based on the evaluation of expressions rather than
the execution of statements. Functional programming treats functions as first-class
citizens — so that they can be manipulated by the program — and emphasizes immutability, or
working with variables that cannot change after being initially set. This makes it easier to
reason about and test code, as well as to write concurrent and parallel applications. Examples
of functional programming languages include Erlang, Haskell, Lisp, and Scheme.

Imperative languages focus on the statements required to control the flow of the program’s
transitions from and to various states.
Declarative languages describe what actions to take and the logic behind the instructions. The
order in which the instructions are carried out isn’t specified. These instructions, function calls,
and other statements can be reordered and optimized by compilers so long as they preserve
the underlying logic.
Natural programming is a programming paradigm that uses natural language or other humanfriendly representations to describe the desired behavior of a program. The idea is to make
programming accessible to people who may not have formal training in computer science.
Examples of natural programming languages include Scratch and Alice.

### 051.2 Software Architecture
Open Source Essentials version 1.0, Exam 050, Objective 051.2
- Understanding the concepts of client and server computing
- Understanding the concepts of thin and fat clients
- Understanding the concepts of monoliths and microservices and their main differences
- Understanding the concepts of Application Programming Interfaces (APIs)
- Understanding the concept of software components and their integration or separation
(services, modules, APIs)
- Clients and servers
- Thin clients and fat clients
- Web applications
- Single-page applications
- Monolithic architectures
- Microservice architectures
- Application Programming Interfaces (APIs)
- RESTful APIs

## 051. Software Fundamentals

### 051.2 Software Architecture

The internet is ubiquitous in our modern world, as are mobile and web-based applications. These
tools are used seamlessly by a large portion of the world’s population and power everything from
instant messaging to more complex activities like purchasing mining equipment for large
companies.
Behind all these seemingly simple interfaces and online services is an architecture — an
arrangement of cooperating pieces of software — that we often take for granted. You need to
know a bit about this architecture to understand how all the pieces of the internet fit together and
how software can deliver real value to its users.
In this lesson, we will look at some of the software architectures behind web applications, which
are server-based software systems, and how they are used within systems that almost everyone is
familiar with.

Servers and Clients
When you use online systems, it is highly likely that at some point you have encountered a
message like the one in Sample screen shown while a response is underway.

Figure 1. Sample screen shown while a response is underway

Let’s step back a little bit and look at the context in which you’re seeing this message. Say you are
trying to gain access to your banking account through your bank website. When you try to get
onto the banking website on your laptop, you use a type of software (i.e., application) called a web
browser, such as Google Chrome or Firefox. In this case, the browser on your computer sends a
request to another computer hosting the website. This particular kind of computer is called a
server. It is specially designed to run 24/7, always serving new requests coming in from all parts of
the world.
So a server is a computer, just like the one you use to work with, play video games, and do
programming assignments. However, there is one main difference: A server normally uses all its
resources for the software application running on it. In this example, the software is a web
application, a computer program that runs on the server.
In Sample screen shown while a response is underway, the server has received a request from a
browser, and the application running on the server is processing the resulting operation. This
operating could be querying a database to fetch a user’s details in the bank, or communicating
with another server to verify a special discount on the user’s next loan.

In this example, we call the browser running on your machine the client application, or simply
put, the client. The client interacts with the remote server.
The network communication between client and server might take place inside an enterprise
network, or across the worldwide network we call the internet. A common characteristic of clientserver interaction is that a server can establish multiple relationships with multiple clients. Think
about the previous example: the website of a bank hosted on a server can attend thousands of
requests per minute from multiple locations, each with a user trying to access their personal bank
account.
Not all scenarios are structured like a browser interacting with a server that does almost all the
processing. In some cases, the client can be the primary instance for processing; this concept is
called a fat client (or thick client), where the client stores and processes the majority of the tasks
instead of relying on the server’s resources. In our banking example, in contrast, the browser is a
thin client that relies on the server to compute and return information through the network.
An example of a fat client is a video game desktop application, where the bulk of the data storage
and processing is done locally, using the computer’s GPU, RAM, CPU, and disk space to process the
information. Such an application rarely relies on an external server, especially if the game is
being played offline.
Both approaches have pros and cons: For a thick client, network instability is less of an issue
compared with a thin client that relies on a remote server, but software updates can be harder to
apply and the fat client requires more computer resources. For a thin client, the lower costs could
be a great advantage. For either kind of client, providing personal data to a third-party application
can be an issue.

Web Applications
A web application is software that runs on a server, processes user interactions, and is contacted
by either fat or thin clients through a computer network. Not all websites are considered web
applications: Simple static web pages without interactivity are not considered web applications
because the server doesn’t run an application to process actions requested by the client.
A lot of web applications can be divided into two groups: the single page application (SPA) and the
multi-page application (MPA). An SPA has only one web page, where all data exchange and loading
occur without the need for redirecting the user to another web page inside the application. An
MPA, in contrast with the SPA, has multiple web pages. A data change might either refresh the
same web page that originated the action or redirect the user to another web page.
Consider the previous example, where a user wants to check their most recent account

transactions on the internet banking website. Imagine that a transaction happens after the web
page is loaded. If the bank web application is an SPA, the new transaction will be displayed
automatically on the same web page, without redirecting the user to a new page. If the user
checks their loans, the new information is also displayed on the same page, avoiding the need to
redirect the user to a new web page. Altering the page without redirecting the user makes the
navigation smooth.
For an MPA, when the user requests the loan web page, the server must redirect the user to a new
location, which means another web page.
A famous example of an SPA web application is Google Mail (Gmail). It doesn’t redirect the user to
completely new page when, for example, the user wants to display the the spam folder; the
application merely refreshes the specific part of the display that shows all spam messages, and
stays on the same web page.
On the other hand, a famous MPA application is Amazon.com, the ecommerce giant, where each
item is located on a distinct web page.
One advantage of an MPA over an SPA is that web analytics are much easier to gather and
measure. This is crucial to help the developers optimize internet search results.
Usually, a web application is divided into two separate parts: frontend and backend. The frontend
is the view layer, where the user interacts with a browser using the page elements by clicking,
selecting, or typing. This is where the data from the server is received, formatted, and displayed to
the user through the browser.
The backend is generally the larger part of a web application. It comprises the business logic,
communication handlers, the majority of the data processing, and the data storage. Data storage
employs a separate database management system connected to the backend.
The frontend and backend communicate with each other. Data requests are forwarded by the
frontend to the backend, and the data returned by the backend is received, formatted, and
displayed by the frontend to the user.
In our simple example of fetching the latest transaction in a user’s bank account, the action is
interpreted by the frontend of the application, which is running in the browser on the user’s
desktop. This request is then sent through the internet to the backend of the application, which
validates whether the user is allowed to perform the action, fetches the data, and returns the list
of transactions back to the frontend loaded in the browser. The browser then formats and
displays the data to the user.

Application Programming Interface (API)
No software is useful without communicating with internal and external components. So how can
the client communicate with the web application? How can the frontend send data to the
backend?
Software applications communicate with each other via an application programming interface
(API), running over basic internet communication protocols. Protocols are standards and rules
developed to ensure that two or more applications exchange commands and data.
The main benefit of an API is to decouple different parts of application while allowing them to
cooperate in processing data. APIs also centralize the data flow in pre-defined channels, acting
like a gateway that ensures that everyone uses the same way for coming and going. In web
applications, APIs are vital for the application’s functionality, as they allow user interaction, the
delivery of processed information, requests for data storage, and many other tasks. An API can be
used by the client to request actions that will be executed on the server, for example.
Let’s go back to the banking web application example. To log into an account through a web
application, the user generally types data such as username and password into certain text fields
and clicks a “Login” button. The browser grabs this information and calls a backend API. The web
application running on the remote server receives the user data, validates the user, verifies the
right of the user to gain access, and finally sends a response back to the browser. In order for the
user to communicate with the server, it is mandatory for both client and server to send data back
and forth. That is what APIs enable.
Notice that the bank’s web application does not expose other sensitive information; it shows the
user only the fields that are allowed and necessary for a desired interaction. The rest is hidden
from the user.
Communication between APIs can be based on very different designs and protocols. The hypertext
transfer protocol (HTTP) is by far the most frequently used protocol in web applications. Hypertext
is text with links to other texts, the concept underlying the links in HTML web pages. Hyperlinks
thus form the basis for constructing web pages and displaying them in browsers.
HTTP was designed for client-server applications, where the resources are requested from a
server and then returned to the client over the network using a predefined structure specified by
the HTTP protocol.
For a structured web application, software engineers design the application with separate parts or
modules. This separation of responsibility allows clearly defined tasks and responsibilities,
leading to faster development and better maintenance.

Let’s take, as an example, an application with two internal modules: one that implements the
business logic, and the other relying on a third-party integration. This third party is an external
company that provides its API for some specific purpose — weather forecasting, say. If the
weather server is down, it is impossible to get weather details, and if this data is crucial to the
final processed output, the user might experience some temporary headaches if there is no
alternative source for the data.
Now imagine that this third-party provider is replaced and the new one has a different way of
handling the same API. The separation of modules means that developers of only one module
have to update it. The business logic in the other module doesn’t have to be touched at all, or at
least calls for minimal updates.
The need for clear process structures also influences the design of the APIs in order to make them
easier to use. The representational state transfer (REST) concept is an architectural style with a set
of guidelines for designing and implementing access to data in an application.
There are six REST principles. For the sake of simplicity, we are going to explain three that are
most relevant to this lesson:
Client-server decoupling
The client should know only the resource URI, through which communication with the server
occurs. This principle allows greater flexibility. For example, when the backend side of the
application is refactored, or there is a major architectural change to a backend database, the
frontend does not need to be updated in conjunction. It simply continues to send the same
HTTP requests to the backend.
Statelessness
Each new request is independent from the previous ones. It is no coincidence that the HTTP
protocol is widely used for applications that follow REST principles, since HTTP has no
knowledge of previous HTTP requests; for each new request, all the necessary information
must be sent in order to correctly process the request. For example, a web application that
implements this principle has no knowledge whether the client is logged in (authenticated). So
for each HTTP request, the client must send an authentication token. The server can use this
token to verify whether the request should be blocked or processed.
One of the main advantages of this principle is easier scaling, because the server can process
millions of requests without checking user details.
Layered architecture
The application is composed of multiple layers, and each layer can have its own logic and
purpose, such as security or data acquisition. The client may never know how many layers

exists, or whether they are communicating directly with a specific layer inside the application.
APIs following the REST principles are called RESTful, and in the modern web, the REST design is
followed by many web applications. Although a RESTful API does not need to implement these
principles using the HTTP protocol, it is almost universally used in the REST model given its
robustness, simplicity, and ubiquitousness in the world wide web environment.

Architecture Types
Dozens of architectural styles and standards exist that attempt to organize the structures of web
applications, Like almost everything in the computer world, there is no “winner,” only a set of
pros and cons for each model. An important paradigm is the so-called microservice architecture,
that was created as an alternative to the older monolithic architecture.
The microservice architecture is a software model composed of multiple interdependent services
that together form the final application. This architecture aims to decentralize the codebase:
Multiple layers of software are split into multiple smaller applications for better maintenance
(Microservice architecture).

Figure 2. Microservice architecture

In contrast, a monolithic architecture contains all services and resources of the application in one
application (Monolithic architecture).

Figure 3. Monolithic architecture

The images show that the microservice model is decentralized and the application relies on
multiple services, each with its own database, codebase, and even server resources. As the name
implies, each microservice should be smaller than its monolithic counterpart, which takes
responsibility for all services.
The monolithic application encapsulates all its resources into one single unit. All the business
logic, data, and codebase are centralized in one huge block, which is why it’s called a “monolith.”
Users hardly notice whether a web application is running as a monolithic or microservice model;
the choice should be transparent. Our banking application, for example, could be a monolith
where all the business logic regarding payments, transactions, loans, etc. is located in the same
codebase running on one or more servers. On the other hand, if the banking appliction uses a
microservice style, it probably has a microservice dedicated to processing payments and another
microservice just for issuing loans. The latter microservice calls yet another microservice to
analyze the probability that the applicant will default on the payment. The application could have

thousands of smaller services.
The monolithic approach requires more maintenance overhead when the application grows
larger, especially with multiple teams coding in the same codebase. Given the centralized software
resources, it is highly likely for one team to change something that breaks the another team’s part
of the application. This could be a real headache for larger teams, especially when there is a great
number of teams.
Microservices are much more flexible in that regard, because each service is managed by only one
team. One team can, of course, manage more than one service. The code changes are easily done
and competing resources are not a real issue. Since each service is interconnected, any point of
failure could have a negative impact on the entire application. Furthermore, since there are
multiple database instances, servers, and external APIs communicating with each other, the
resilience of the whole application is only as good as its weakest microservice.
One advantage of the monolithic approach is having one centralized data source, which makes it
easier to avoid data duplication. The approach also reduces the consumption of cloud resources,
because one larger server needs fewer computer resources than multiple decentralized servers. A
microservice application of roughly the same size puts a greater burden on the cloud.

1. What are the main differences between a fat and a thin client?

2. Is it correct to assume that every website is a web application?

3. What is the REST model?

## 4. What is the preferred model for developing large and modern web applications with multiple
development teams? Why?

5. What is the most commonly used protocol to exchange data between web applications?

6. Name two disadvantages of multi-page applications compared to single-page applications.

## 7. Describe one advantage of a monolithic system over a microservice system, and one advantage
the microservice system has compared to a monolithic one.

## 1. In 2021 the NASA Perseverance Rover landed on Mars, with one of its goals to determine
whether life ever existed on Mars. Although the Rover could be controlled by distance here on
Earth, it also can control itself in most situations. Why is it a good idea to project a rover like
that as a fat client?

## 2. Consider a modern, self-driving, personal car that connects to an external server to exchange
data. Should it be a fat or a thin client?

This lesson explained the core concepts of software architecture for web applications. The lesson
explained how they are commonly structured and organized, and the main differences between
the monolithic and microservice models. We covered the concepts of servers and clients, and the
basics of web application communication between clients and other software programs.

1. What are the main differences between a fat and a thin client?
A fat client does not require a constant connection to a remote server that gives back critical
information to the running client. The thin client relies heavily on the information processed
by an external source. Another difference is that a fat client is responsible for the bulk of the
data processing, thus requiring more computing resources than its thin counterpart.
2. Is it correct to assume that every website is a web application?
No. There are websites that are not software applications. A web application interacts with the
user, who might input data and use web functionalities in real time. Simple websites such as an
advertisement for a social event, which functions like a web banner, are not web applications.
These non-interactive web sites are easier to maintain and require tiny computing resources to
host and deliver the web pages. A web application requires much more computing resources,
more robust servers, and functionalities that handle users, such as restricted access and
permanent data storage.
3. What is the REST model?
The REST model is a software architecture model providing applications with a development
guide for better usability, clarity, and maintainability. One of the principles outlined in the set
of REST guidelines is the layered architecture, used primarily for cohesion and to lower the
dependency of the various APIs' internal components.
4. What is the preferred model for developing large and modern web applications with multiple
development teams? Why?
The microservice software model provides a flexible framework in which teams collaborate on
the same software application, providing easier concurrency for two or more teams
maintaining a large web application. Because the framework is decentralized, each team can
update a specific business domain without having to update other components.
5. What is the most commonly used protocol to exchange data between web applications?
HTTP is the most used protocol for exchanging data and commands between servers and
clients.
6. Name two disadvantages of multi-page applications compared to single-page applications.
A multi-page application reloads all the elements in the web page when the user triggers some

actions, instead of updating only the changed elements. Performance suffers from this design.
Another disadvantage of an MPA is clunkier user interactivity, where each page load creates a
loss in user friendliness. In contrast, the visual effect could be continuous in an SPA.
7. Describe one advantage of a monolithic system over a microservice system, and one advantage
the microservice system has compared to a monolithic one.
A monolithic system can make data administration easier because the data is located in one big
database, instead of being scattered in multiple databases. A microservice application, on the
other hand, can improve code development and maintenance; multiple teams can work on
different business logic without blocking the progress of other teams.

## 1. In 2021, the NASA Perseverance Rover landed on Mars. One of its goals was to determine
whether life ever existed on Mars. Although the Rover can be controlled over a long distance by
an application on Earth, it also can control itself in most situations. Why is it a good idea to
design a rover like that as a fat client?
The time a communication signal takes to be sent from Earth and received on Mars can vary
depending on the positions of those planets, but it can take up to twenty minutes. Thus,
command and control of a distant rover in motion is impossible, especially taking unexpected
situations into account. Ideally, the rover should command itself in most situations. That is
achieved using artificial intelligence (AI) training (machine learning), so that the rover
becomes more independent from manual commands. To make that possible and to rely less on
distant signals, the rover was projected to have its own resources and the majority of the
computing processes ran locally, matching the definition of a fat client.
2. Consider a modern, self-driving, personal car that connects to an external server to exchange
data. Should it be a fat or a thin client?
An autonomous vehicle could delegate the heavy data processing to an external and reliable
server, but this would be susceptible to offline periods when critical data processing is
required. Therefore, it is imperative for the autonomous vehicle to process the majority of
tasks — and this requires it to be a fat client with multiple redundancy.

### 051.3 On-Premises and Cloud Computing
Open Source Essentials version 1.0, Exam 050, Objective 051.3
1
- Understanding the concepts of on-premise and cloud computing
- Understanding common cloud operation models
- Understanding common types of cloud services
- Understanding the major benefits and risks of cloud computing and on-premise IT
infrastructure
- Cloud computing
- On-premises IT infrastructure
- Data center
- Public, private and hybrid cloud
- Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS)
- Cost models
- Security
- Data ownership
- Service availability

## 051. Software Fundamentals

### 051.3 On-Premises and Cloud Computing

Everyone is talking about the cloud nowadays. Businesses are evaluating services from a range of
vendors — including major companies such as Amazon.com and Microsoft — to see what the cloud
can offer.
But the idea of cloud computing goes back only to the late 2000 decade. And the term is a vague
one — so vague that many people, including the Free Software Foundation, discourage the use of
the term.
However, the idea of cloud computing embodies some specific useful concepts, and is a crucial
trend in modern computing. This lesson looks at what the cloud is and, at a high level, how it
works both technically and financially. We’ll look at benefits and risks of the cloud. Along the way,
we’ll see why this topic is related to open source.

On-Premises and Cloud Computing
If you work or study in an organization that has more than a couple computer systems, it almost
certainly has a data center: a separate room to hold the organization’s servers, usually locked and

air-conditioned. An on-premises (or on-premise) data center is simply one that the organization
maintains for its own use.
There are several alternatives to running a data center on-premises. For decades before the trend
we call “cloud computing,” businesses would set up data centers that hosted computers on behalf
of clients. Thus, you might license five servers from the business, and give the business various
specifications for CPU, memory, and storage, and then upload your software to the servers. This
business model is remote hosting.
Remote hosting offers many advantages. The organization can effectively outsource the
administrative expertise of buying and setting up servers to the remote hosting business, which
could get bulk purchases. In other words, you avoid the responsibility of having an on-premises IT
infrastructure. The remote hosting business ensures physical security, also freeing the client from
that worry. Finally, setting up a new server on a remote hosting business is much faster than
buying, shipping, and setting up the server on-premises.
An organization can also maintain an on-premises data center while licensing more servers in the
remote environment to recover from disasters or provide extra compute power during periods of
heavy use.
Note that remote computing assumes the presence of a fast and reliable network. We’ll explore
this issue along with other benefits and weaknesses in another section.
All the advantages of remote hosting apply also to cloud computing. Cloud computing is
technically different because no particular physical computer is devoted to your organization.
Instead the cloud vendor runs multiple systems for multiple clients on each physical system, using
an extra layer of software known as virtual machines.
Thus, a cloud service runs a data center like any other organization, but serves other
organizations instead of (or in addition to) itself. The data center stores thousands of physical
computers. On each physical computer it runs an operating system (usually called a hypervisor)
that supports multiple virtual machines. Each virtual machine can be spawned and deleted
quickly. Each virtual machine supports one operating system run by a client (Cloud computing).

Figure 4. Cloud computing

Where does free software and open source come in? When a business is running huge numbers of
computers and deploying operating systems on the fly, it’s important not to get bogged down
dealing with licenses. Although there are licensing models for proprietary operating systems in
the cloud, they are more complicated than simply running an open source virtual machine and
operating system. Open source is usually cost-free, too.
The beginning of cloud computing is usually traced to Amazon.com’s launch of Amazon Web
Services (AWS) in 2006. There are now dozens of cloud companies, including offerings from such
big vendors as Microsoft, Google, Alibaba, and IBM. AWS is still the largest offering. The vendors
compete fiercely on developing new features and services, because they are all strong on cost and
reliability.
The advantages of cloud computing build on those of remote computing. Costs are lower because
one physical system can run many servers for many clients, and can be kept busy constantly. A
client that needs more computing power quickly for a spike in usage can spawn new systems in
seconds. The systems can be managed automatically through an application programming
interface (API). Again, we’ll take a closer look at benefits and risks later.

Common Cloud Operation Models
Before detailing operation models, it’s worth noting that many companies have adopted cloud
models that totally change their way of programming and offering services. Instead of updating
each application once or twice a year, the companies allow rapid updates. They can do this
because the cloud allows them to shut down virtual machines and start up new ones almost

instantly with the new version of the application. The organization can also scale up and down
quickly, so they like to break applications into many modular parts, sometimes called
microservices.
But in this section we’ll focus on everyday cloud models.
The cost model for the cloud is very different from on-premises costs. On-premises data centers
require the one-time purchase of a server, along with routine costs for power, air conditioning,
and administration. These disappear when you license systems from a cloud vendor. Instead, you
are charged for what you use. Cloud vendors divide your computer usage into time periods and
charge you for each period. They also charge by the amount of data you store on their systems.
So far, we’ve been talking about vendors who offer compute power to customers; this is called the
public cloud. But there can also be a private cloud. Some large organizations run their own onpremises data centers like a cloud. They provide services only to their own departments or
subdivisions, but they treat each of their departments like a client of a cloud vendor. The data
center keeps track of how much compute time, data, etc. is used by each department and charge it
for that usage.
Many organizations use multiple cloud services for various reasons, such as to protect against
vendor failures, keep data in a certain geographic region, or take advantage of special features
offered by a particular vendor. In addition, it’s common to maintain both an on-premises data
center and servers in the cloud, a practice called hybrid computing.
A client who signs up for a cloud service can choose which geographic regions to run in. For
instance, Amazon curently offers regions in the US West, US East, several regions in Europe, and
more regions in every part of the world. Normally, you’d choose the region closest to you. But
many organizations want to operate in multiple regions because they are international in scope.
The organizations sometimes need to keep data in a particular place to adhere to Europe’s
General Data Protection Regulation (GDPR), or China’s Personal Information Protection Law
(PIPL).
Each region normally is further subdivided into zones or availability zones. Running in multiple
zones is recommended in case a disaster causes one zone to go down.
Although the cloud is notable for sharing physical computers among multiple clients, some
vendors can devote a single computer to a particular client who is worried about security.
Because no other organization is using the computer, the client feels a bit safer running their
sensitive services and uploading their data to the cloud. This option brings cloud computing closer
to old-fashioned remote hosting.

Common Types of Cloud Services
At different levels, cloud computing looks very different and is aimed at different types of users.
Infrastructure as a Service (IaaS) is the category that system administrators usually deal with. IaaS
provides just hardware and the software that supports virtual machines. It’s up to system
administrators of the client to load an operating system and their desired applications onto the
virtual machine. The system administrator handles nearly everything the same way as on an onpremises data center.
Platform as a Service (PaaS) is a more recent invention, used mostly by programmers. Here, the
programmer doesn’t worry about the operating system and doesn’t have to load the libraries that
the program uses. All of that is provided by the cloud vendor. The programmer just uploads
functions that run on the platform. A related concept is serverless computing.
Software as a Service (SaaS) is an application running on a cloud system. Every time you log into a
social media site, order an item from an online store, visit a web page to enter your hours into a
job tracking system, or enter a form on a government site, you are using SaaS. The bulk of the
application is running on the remote system, and the only part of the application running on your
computer is the web page displayed by your browser.
Database as a Service (DaaS) is often added to the preceding categories. A data service, Amazon’s
S3, was actually the first cloud offering. A DaaS offering can simply be an instance of a popular
database server such as MySQL, Oracle, or MongoDB running in the cloud. Big cloud vendors also
offer propriety databases that run only in their cloud offerings. In any case, you read and write
the database as if you had it on your systems.
Other variations on those basic categories are offered by some companies, such as Security as a
Service.

Major Benefits and Risks of Cloud Computing and On-Premises
IT Infrastructure
Before examining cloud computing in detail, let’s try an analogy. Running an on-premises data
center is like buying a house. If the basement floods or the boiler stops working, you need to find
someone to fix it. In contrast, remote hosting and cloud computing are like renting an apartment:
The landlord is responsible for fixing the boiler. Furthermore, in the cloud you can quickly add
and remove data loads, just as you can change apartments more quickly than you can change
which house you own.
In an apartment, a landlord might even provide appliances and furniture. In our analogy, this is

like the numerous services that cloud providers offer, such as databases and analytics.
Now we can look at the benefits and risks of using the cloud, instead of or in addition to your own
data center.
Flexibility is probably the most compelling reason to move to the cloud. If you’re a retailer who
needs to run more servers near Christmas, or a tax preparation accountant doing most of your
business at tax season, you’ll want the cloud in order to spin up new servers at a moment’s notice
and then delete their virtual machines later.
Costs can be lower in the cloud for several reasons. You are sharing a physical server with many
other applications, so the computers are used more efficiently. Because cloud vendors are large,
they can achieve economies of scale in purchases, administration, cooling, and other
infrastructure requirements. Finally, the clients are freed from many administrative
tasks—although system administration is by no means going away. Clients still need system
administrators to create and upload their software (known as instances in the cloud), to authorize
users, and other tasks related to business operations. System administrators have to learn the
vendor’s API and the rules for using the service, a training cost you should factor into your plans.
On the other hand, you have to be careful how much use you make of the cloud. It can be hard to
keep track of how much computer power you’re using when you can quickly spin servers up,
especially if you automate your scaling. You might find an unpleasantly large bill at the end of the
period.
Is the cloud more carbon-efficient than running our own computers? Research finds that cloud
vendors can run their systems much more efficiently than you or I can. But we have to
communicate with those systems over a network, which requires a lot of electrity to power all the
networking equipment. So unfortunately the cloud increases our carbon footprint.
Service availability is sometimes better with the cloud. Certainly, if you depend on your own onpremises data center, you are vulnerable to all kinds of problems ranging from natural disasters
to malicious internal saboteurs. But data centers in the cloud also go down. So you should take
advantage of the different availability zones and spread out your risk. There are tools that allow
you to switch your services from a failed zone to a working one.
If you use the services offered by the cloud vendor, such as a database in the cloud, you are
vulnerable to bugs in that service. Of course, you can also suffer from bugs in the software you
load into your system.
A greater risk in using vendors' services is lock-in. You can usually find an automated conversion
tool to move your data out of the vendor’s system and into a new one, but the tool might not do a
complete job.

Security can be better in the cloud because the vendor’s staff are probably more expert than your
security staff. On the other hand, cloud vendors are big and well-known, furnishing obvious
targets for attack. Also, adding an extra piece of software -— the hypervisor that controls the
virtual machines -— introduces a new potential hazard. Researchers have found vulnerabilities in
hypervisors.
Although the client remains the legal owner of its data, storing the data in the cloud theoretically
leaves it more vulnerable. Usually, the client encrypts the data to protect it in case of a break-in.
Privacy regulations, such as the previously mentioned GDPR, require data to be stored in a data
center in a region considered to be safe.
Ultimately, most security attacks start at a high level, such as sending email with malware to an
unsuspecting employee. It doesn’t matter whether you’re running on-premises or in the cloud. But
a malicious intruder who takes over an employee’s account will not get much farther unless they
can take advantage of vulnerabilities in your servers; again it’s not clear whether running in the
cloud makes much difference because most vulnerabilities are found in the software rather than
the cloud service.
Finally, consider your bandwidth and networking costs. Your customers, and probably your staff,
are communicating with servers that might be hundreds of miles away. If the network connecting
is unreliable or slow, the performance of cloud servers will be worse than your on-premises data
center. But nowadays, everybody is connecting with remote workers, SaaS services, and other
systems that are geographically removed. Your network performance will affect nearly
everything you do, whether or not you’re in the cloud.

## 1. Why is a physical computer in a cloud center used more efficiently than a computer in a
traditional on-premises data center?

2. What is a hybrid cloud?

## 3. What type of cloud computing most often requires work on the part of a system administrator
at the client side?

4. How should you protect your service from going down if you use a cloud vendor?

## 1. Compare the different kinds of costs you experience when running your servers in a cloud to
the costs of running them on-premises.

2. You operate out of the Middle East, but have many customers in Europe and the Far East.
Describe where you would place your services in a cloud offering.

This lesson outlined how cloud computing works and the trade-offs of using the cloud versus
running systems in your own data center, on-premises. You learned different business and cost
models, including the differences between public, private, and hybrid clouds. You also learned the
different major types of cloud offerings and what each is used for.

## 1. Why is a physical computer in a cloud center used more efficiently than a computer in a
traditional on-premises data center?
In the cloud, each computer can run multiple instances of operating systems, and even run
instances uploaded by different clients. Therefore, the computer is more often in use.
2. What is a hybrid cloud?
A hybrid cloud uses both data centers at a cloud vendor and one or more on-premises data
centers.
3. What type of cloud computing most often requires work on the part of a system administrator
at the client side?
Infrastructure as a Service (IaaS) requires the client to perform system administration for tasks
such as creating and uploading instances of the operating system and applications.
4. How should you protect your service from going down if you use a cloud vendor?
Choose several zones in each region where you run your service, because it’s highly unlikely
that many zones will fail simultaneously.

## 1. Compare the different kinds of costs you experience when running your servers in a cloud to
the costs of running them on-premises.
In a cloud, you pay for your CPU use and data storage for each period measured by the vendor.
But you don’t pay any hardware costs. On-premises, you have the fixed cost of the hardware,
along with other equipment such as air conditioning, plus recurring costs such as power and
physical maintenance.
2. You operate out of the Middle East, but have many customers in Europe and the Far East.
Describe where you would place your services in a cloud offering.
Use a Middle Eastern region for your own offices and Middle Eastern clients. A region in
Europe is important in order to comply with the General Data Protection Regulation (GDPR).
You might need a region in China to comply with China’s Personal Information Protection Law
(PIPL). In any case, having Far Eastern and European regions is valuable for better
performance when interacting with customers in those places.
Within each region, choose several zones to protect against the failure of a single zone.

## Topic 052: Open Source Software Licenses

### 052.1 Concepts of Open Source Software Licenses
Open Source Essentials version 1.0, Exam 050, Objective 052.1
- Understanding the definitions of open source software and free software
- Awareness of other kinds of monetarily-free software
- Awareness of important events in the history of open source
- Understanding what a license is and what rights licenses commonly manage
- Understanding how existing software can be used to create derivative works
- Understanding license compatibilities and incompatibilities
- Understanding dual licensing and conditional licensing
- Understanding consequences of license violations
- Understanding the principles of copyright law and patent law and how they are affected by
open source software licenses
- Free Software Foundation (FSF) free software definition
- Open Source Initiative (OSI) open source software definition
- Licenses
- Contracts
- Public domain software

- Freeware
- Shareware
- License stewards
- Permissions to use, modify and distribute code and software
- Derivative works and code reuse
- Closed source / proprietary software
- Paid distribution
- Modified and unmodified software distribution
- Hosting software as a paid service
- License compatibility
- Dual and multi licensing
- Conditional licensing
- Software patents
- Explicit and implicit patent license grants

## 052. Open Source Software Licenses

### 052.1 Concepts of Open Source Software
Licenses

Any software developer appreciates when a problem has been efficiently solved before. If the
solution is available online, the understandable reflex is to try it out: to copy or link the existing
source code into one’s own code base, test it, and leave it there if it works — and then to forget
about it.
But some caution is in order. More often than not, software source code available on the internet
is covered by a free and open source (FOSS) license. This chapter will go into some basic concepts
of FOSS from a legal standpoint and why it is a good idea to not take FOSS source code for granted,
but rather to closely observe the licensing conditions.
As a basis for understanding your legal obligations in software, understand that a license governs
almost all software. A license is a kind of contract. All software, including web sites, should be
distributed with a written version of its license (often called “terms and conditions”). Some
programs and web sites make you check a box saying that you have read their terms and
conditions (and you should, although most people never do). In any case, you implicitly accept the
license by using the software.

Definitions of Open Source Software and Free Software
Free and open source software has been around for quite some time, and the terms are often seen
together. However, there is some discrepancy between what some declare to be “free software”
and the formal meaning of free software, as well as open source software. Spoiler: “Open source”
does not just mean that anyone can look at the source code — that would be “source available”
software. Free and open source software is much more than that.
Free and open source software is contrasted with other kinds that are considered proprietary or
closed source because they don’t offer all the freedoms discussed in this lesson.
Perhaps the most cited definition of free software is:
Think of “free speech,” not “free beer.”
— Richard Stallman, Selling Free Software

We’ll unpack the fertile brew in that statement during the following sections.

Free as in Speech: True Freedom for Users
On the one hand, developers can decide to simply forego the rewards and difficulties of selling
their software, and just give it away without compensation. In English this software is “free” in the
sense that no one has to pay for it, but free only like beer that is given away. This no-cost
distribution says nothing about further licensing conditions, and leaves the user with the
obligation to always take a closer look: They might not have been granted the necessary rights to
change or further distribute the software, for example.
On the other hand, developers can opt to make their software “free software” in Stallman’s sense.
This term (which he coined in the 1980s) refers to the user’s essential freedoms summarized as
follows:
1. To run the software
2. To study it
3. To give it to others (redistribute it)
