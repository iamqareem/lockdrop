---
id: beej-python-01
title: "Beej's Guide to Python Programming — What is Programming, Anyway?, What software will I need?, How do…",
slug: beej-python-01-beej-s-guide-to-python-programming-what-is-programming-anywa
source: "Beej's Guide to Python Programming",
sourceSection: "2. What is Programming, Anyway?, 3. What software will I need?, 4. How do I write a program?, 5. Data and Processing Data, 6. Flow Control and Looping, 7. Strings, 8. Lists, 9. Dictionaries, 10. Functions, 11. Classes and Objects, 12. Importing Modules, 13. Reading Files, 14. Exceptions, 15. Appendi"
track: data-scripting,
tier: free
tags: [python, programming, scripting]
summary: "Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Covers 19 sections: What is Programming, Anyway?, What software will I need?, How do I write a program?.",
---
# Beej's Guide to Python Programming — What is Programming, Anyway?, What software will I need?, How do…

## 2. What is Programming, Anyway?
2.1
Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2
More Terminology Than You Wanted . . . . . . . . . . . . . . . . . . . . . . . . . .
2.3
What’s This Talk About Problem Solving? . . . . . . . . . . . . . . . . . . . . . . .
2.4
So How To Solve It? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.5
What is Python? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.6

## 3. What software will I need?
3.1
Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.2
What Is All This? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3
Installing Python . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.1 Windows . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.2 Mac . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.3 Linux/Unix-likes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.4
Running IDLE . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.5
Your First Command . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.6

## 4. How do I write a program?
4.1
Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.2
The Problem That Needs Solving . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.3
Launching your IDE and Opening a File . . . . . . . . . . . . . . . . . . . . . . . .
4.4
Running the Program! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.5
4.6

## 5. Data and Processing Data
5.1
5.2
Data, Variables, and Math . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.3
Assigning from One Variable to Another . . . . . . . . . . . . . . . . . . . . . . . .
5.4
Your Mental Model of Computation . . . . . . . . . . . . . . . . . . . . . . . . . .
5.5
User Input . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6
Data Types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.7
Converting Between Data Types . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.8
Input Two Numbers and Print the Sum . . . . . . . . . . . . . . . . . . . . . . . . .
5.9
Wrapping it Up . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

23

iii

iv
5.10
5.11

24
25

## 6. Flow Control and Looping
6.1
6.2
6.3
What is Flow Control? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.4
Boolean Algebra and Expressions . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.5
Boolean Operations in Python . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.6
The Almighty if Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.7
And Now: while Loops! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.8
Looping: for Loops . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.9
When while and When for? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.10 Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.11 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.12 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

28
31
32
33
37
38

## 7. Strings
7.1
7.2
7.3
What is a String? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.4
Creating Strings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.5
Converting Other Types To Strings and Vice Versa . . . . . . . . . . . . . . . . . . .
7.6
String Concatenation with + . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.7
Midterm Challenge . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.8
Getting Individual Characters From Strings . . . . . . . . . . . . . . . . . . . . . . .
7.9
Slices . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.10 Midterm Challenge . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.11 Interlude: Mutable versus Immutable Types . . . . . . . . . . . . . . . . . . . . . .
7.12 for-loops with Strings . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.13 String Functions and Methods . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.14 Formatted Output with F-Strings . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.14.1 .format() Method . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.14.2 % printf Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.15 Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.16 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.17 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

41
41
42
43
43
44
45
45
47
52
53

## 8. Lists
8.1
8.2
8.3
8.4
8.5
8.6
8.7
8.8
8.9
8.10
8.11
8.12
8.13
8.14
8.15
8.16

What Are Lists? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
List Assignments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
for and Lists—Powerful Stuff . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
for and enumerate() . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Midterm: Doubling The Values . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Built-in Functions for Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
What Good Are They? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Midterm Challenge . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Building New Lists, Repeating and Empty . . . . . . . . . . . . . . . . . . . . . . .
List Comprehensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Lists of Lists . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Chapter Project Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . .

56
58
59
59
60
62
62
64
65
66
67
75
76

## 9. Dictionaries
9.1
9.2

v

9.3
9.4
9.5
9.6
9.7
9.8
9.9
9.10
9.11
9.12
9.13
9.14

78
80
81
82
82
83
83
88
89

What are Dictionaries? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Initializing a Dictionary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Speed Demon . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Does this dict have this key? . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Iterating over Dictionaries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Common Built-in Dictionary Functionality . . . . . . . . . . . . . . . . . . . . . . .
Dictionary Comprehensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Dictionaries of Dictionaries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Dictionaries are Mutable . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
The Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

## 10. Functions
91
10.1 Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 91
### 10.2 Chapter Project Specification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 91
### 10.3 What Are Functions? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 92
### 10.4 Using Built-In Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 92
### 10.5 Arguments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 93
### 10.6 Writing Your Own Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 94
### 10.7 Multiple Return Values . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96
### 10.8 What Makes a Good Function . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 97
### 10.9 Positional Arguments versus Keyword Arguments . . . . . . . . . . . . . . . . . . . 97
### 10.10 Interlude: Evaluation Strategies . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98
### 10.11 The Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 99
### 10.12 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 105
### 10.13 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 106
## 11. Classes and Objects
107
11.1 Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
### 11.2 Chapter Project Specification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
### 11.3 What Problem Are We Even Trying To Solve? . . . . . . . . . . . . . . . . . . . . . 108
### 11.4 What are Classes and Objects? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109
### 11.5 Making Different StarShips . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109
### 11.6 Attributes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 111
### 11.7 Using Attributes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 111
### 11.8 More on Methods . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 112
### 11.9 Pretty Printing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 113
### 11.10 Objects are Mutable . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 114
### 11.11 Objects and None . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 114
### 11.12 Testing for Attributes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 115
### 11.13 Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 116
### 11.14 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 120
### 11.15 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 122
## 12. Importing Modules
123
12.1 Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123
### 12.2 Chapter Project Specification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123
### 12.3 What and Why of Modules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 123
### 12.4 Using a Module . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 124
### 12.5 Command Line Arguments . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 124
### 12.6 Printing Calendars . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
### 12.7 Importing Specific Attributes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 129
### 12.8 Learning All The Modules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 130
### 12.9 Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
### 12.10 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
### 12.11 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 136
## 13. Reading Files

137

vi
13.1
13.2
13.3
13.4
13.5
13.6
13.7
13.8
13.9
13.10

Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
What are Files, Anyway? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
Reading Files, The Classic Way . . . . . . . . . . . . . . . . . . . . . . . . . . . . 139
Opening Files with with . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 140
Reading Data a Line at a Time . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 141
Writing files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 142
Chapter Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 142
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 158
Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160

## 14. Exceptions
161
14.1 Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
### 14.2 Project . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
### 14.3 Errors in Programs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
### 14.4 Classic Error Handling . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
### 14.5 Error Handling with Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . 162
### 14.6 Catching Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
### 14.7 Catching Multiple Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
### 14.8 Catching Multiple Exceptions II . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 14.9 Getting More Exception Information . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 14.10 Catching All Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 14.11 Finally finally . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 167
### 14.12 What Else? else! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
### 14.13 Exception Objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
### 14.14 Raising Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 169
### 14.15 Re-raising Exceptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 171
### 14.16 Project Implementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 171
### 14.17 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 175
### 14.18 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
## 15. Appendix A: Basic Math for Programmers
177
15.1 Arithmetic . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
### 15.2 Division in Python . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 178
### 15.3 Modulo, AKA Remainder . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 178
### 15.4 Negative numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 179
### 15.5 Absolute Value . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 179
### 15.6 The Power of Exponents . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 180
### 15.7 Parentheses . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
### 15.8 Square root . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 15.9 Factorial . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 183
### 15.10 Scientific notation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 184
### 15.11 Logarithms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 184
### 15.12 Rounding . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 185
### 15.13 Large Numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 187
## 16. Appendix B: The REPL
189
16.1 What is the REPL? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
### 16.2 Calculator . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
### 16.3 Getting Help . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
16.4 dir()—Quick and Dirty Help . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
16.5 Getting out of the REPL . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 192
## 17. Appendix C: Assignment Behavior
193
17.1 How This Relates To Functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 17.2 Is Any of This True? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 17.3 Python Compiler Optimizations . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
### 17.4 Internment . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195

vii

## 18. Appendix D: Number Bases
197
18.1 How to Count like a Boss . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 197
### 18.2 Number Bases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 198
### 18.3 Hexadecimal, Base 16 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 199
### 18.4 Specifying the Number Base in Python . . . . . . . . . . . . . . . . . . . . . . . . . 199
## 19. Accelerating Beyond IDLE
201
19.1 Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
### 19.2 What with the What Now? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
### 19.3 The Terminal . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
#### 19.3.1 The Shell . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 201
#### 19.3.2 Windows Terminals and Shells . . . . . . . . . . . . . . . . . . . . . . . . . . 202
#### 19.3.3 Windows gitbash . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 202
#### 19.3.4 Windows WSL . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 202
#### 19.3.5 Mac . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
#### 19.3.6 Linux/Unix-likes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
### 19.4 Installing an IDE . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
#### 19.4.1 Windows VS Code . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
#### 19.4.2 Mac . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
#### 19.4.3 Linux and other Unix-likes . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
### 19.5 Running VS Code . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
### 19.6 Using a Barebones Editor and Terminal . . . . . . . . . . . . . . . . . . . . . . . . . 203
#### 19.6.1 Start with the Terminal . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 204
### 19.7 Launching Your Code Editor . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 204
### 19.8 Running the Program! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 205
### 19.9 Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 206
### 19.10 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 206

viii

Chapter 1

Intro
This is an alpha-quality book. There are mistakes, oh yes. When you find them, please drop an issue in
GitHub, or a pull request, or email me at beej@beej.us. When the number of defects gets low enough,
I’ll offer a print version.
Hey, everyone! Have you been thinking about learning to program? Have you also been thinking of how
to do it in the easy-to-approach Python programming language?
Yes? Then this is the book for you. We’re going to start with the absolute basics and build up from there,
building up to being an intermediate developer and problem-solver! Python is the language we’ll be using
to make this happen.
But by the end of the book, you will have developed programming techniques that transcend languages.
After picking up Python, maybe try another language like JavaScript, Go, or Rust. They all have their
own features to explore and learn.

### 1.1 Audience
Beginning programmers. If you have limited experience or no experience, this book is targeted at you!
Attitude Prerequisite: be inquisitive, curious, have an eye for puzzles and problem solving, and be willing
to take on difficult challenges.
Technical Prerequisite: be a computer user. You know what files are, how to move them and delete them,
what subdirectories (folders) are, can install software, and how to type.
Are you a seasoned developer looking to start with Python? I’m sorry but this is not likely to be the book
you’re looking for. It will progress too slowly for your tastes. Just jump straight into the official Python
documentation1 .

### 1.2 Platform and Tools
I make an effort in this book to cover Mac, Windows, and Unix variants (via Arch Linux).
We’ll cover installing Python 3 and the Visual Studio Code editor. (Both are free.) If you already have
a code editor you prefer using (Vim, Emacs, Sublime, Atom, PyCharm, etc.) feel free to use that. This
book’s 100% certified editor agnostic!

### 1.3 Official Homepage and Books For Sale
The official location of this document is:
- http://beej.us/guide/bgpython/

https://docs.python.org/3/

Chapter 1. Intro

There you will also find example code.

### 1.4 Email Policy
I’m generally available to help out with email questions so feel free to write in, but I can’t guarantee a
response. I lead a pretty busy life and there are times when I just can’t answer a question you have. When
that’s the case, I usually just delete the message. It’s nothing personal; I just won’t ever have the time to
give the detailed answer you require.
As a rule, the more complex the question, the less likely I am to respond. If you can narrow down your
question before mailing it and be sure to include any pertinent information (like platform, compiler, error
messages you’re getting, and anything else you think might help me troubleshoot), you’re much more
likely to get a response. For more pointers, read ESR’s document, How To Ask Questions The Smart
Way2 .
If you don’t get a response, hack on it some more, try to find the answer, and if it’s still elusive, then write
me again with the information you’ve found, and hopefully, it will be enough for me to help out.
Now that I’ve badgered you about how to write and not write me, I’d just like to let you know that I fully
appreciate all the praise the guide has received over the years. It’s a real morale boost, and it gladdens me
to hear that it is being used for good! :-) Thank you!

### 1.5 Mirroring
You are more than welcome to mirror this site, whether publicly or privately. If you publicly mirror the
site and want me to link to it from the main page, drop me a line at beej@beej.us.

### 1.6 Note for Translators
If you want to translate the guide into another language, write me at beej@beej.us and I’ll link to your
translation from the main page. Feel free to add your name and contact info to the translation.
This source markdown document uses UTF-8 encoding.
Please note the license restrictions in the Copyright, Distribution, and Legal section, below.
If you want me to host the translation, just ask. I’ll also link to it if you want to host it; either way is fine.

### 1.7 Copyright, Distribution, and Legal
Beej’s Guide to Python Programming is Copyright © 2019 Brian “Beej Jorgensen” Hall.
With specific exceptions for source code and translations, below, this work is licensed under the Creative
Commons Attribution- Noncommercial- No Derivative Works 3.0 License. To view a copy of this license,
visit
https://creativecommons.org/licenses/by-nc-nd/3.0/

or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105,
USA.
One specific exception to the “No Derivative Works” portion of the license is as follows: this guide may
be freely translated into any language, provided the translation is accurate, and the guide is reprinted in
its entirety. The same license restrictions apply to the translation as to the original guide. The translation
may also include the name and contact information for the translator.
The C source code presented in this document is hereby granted to the public domain, and is completely
free of any license restriction.
Educators are freely encouraged to recommend or supply copies of this guide to their students.

http://www.catb.org/~esr/faqs/smart-questions.html

### 1.8 Dedication

Unless otherwise mutually agreed by the parties in writing, the author offers the work as-is and makes
no representations or warranties of any kind concerning the work, express, implied, statutory or otherwise, including, without limitation, warranties of title, merchantability, fitness for a particular purpose,
noninfringement, or the absence of latent or other defects, accuracy, or the presence of absence of errors,
whether or not discoverable.
Except to the extent required by applicable law, in no event will the author be liable to you on any legal
theory for any special, incidental, consequential, punitive or exemplary damages arising out of the use of
the work, even if the author has been advised of the possibility of such damages.
Contact beej@beej.us for more information.

### 1.8 Dedication
Thanks to everyone who has helped in the past and future with me getting this guide written. And thank
you to all the people who produce the Free software and packages that I use to make the Guide: GNU,
Linux, Slackware, vim, Python, Inkscape, pandoc, many others. And finally a big thank-you to the literally
thousands of you who have written in with suggestions for improvements and words of encouragement.
I dedicate this guide to some of my biggest heroes and inspirators in the world of computers: Donald
Knuth, Bruce Schneier, W. Richard Stevens, and The Woz, my Readership, and the entire Free and Open
Source Software Community.

### 1.9 Publishing Information
This book is written in Markdown using the vim editor on an Arch Linux box loaded with GNU tools.
The cover “art” and diagrams are produced with Inkscape. The Markdown is converted to HTML and
LaTex/PDF by Python, Pandoc and XeLaTeX, using Liberation fonts. The toolchain is composed of 100%
Free and Open Source Software.

Chapter 1. Intro

Chapter 2

What is Programming, Anyway?
2.1 Objectives
- Be able to explain what a programmer does
- Be able to explain what a program is
- Be able to summarize the four big steps in solving problems

### 2.2 More Terminology Than You Wanted
Let’s say you’re entirely new to this stuff. You have a computer, you know how to use it, but you don’t
know how to make it do exactly what you want it to.
It’s the difference between a user and a programmer, right?
But what does it mean to program a computer?
In a nutshell, you have a goal (what you want to compute), and programming is the way you get there.
A program is a description of a series of steps to complete that computation, blah blah blah…
Okay—instead think of a sequence of steps that you have to do to do anything. Like baking cookies for
example.
Fun Computing Fact: everyone likes yummy cookies.
You often have that sequence of steps, that recipe, written down on a piece of paper. By itself, it’s definitely
not cookies. But when you apply a number of kitchen implements and ingredients and an oven to it, pretty
soon you have some cookies.
Of course, in that case, you have to do the work. With programming, the computer does the work for you.
But you have to write down the recipe.
The recipe is the program. Programming is the act of writing down that recipe so the computer can execute
it. And get those cookies baked.
Mmmm. Cookies.
Some programs are simple. “Add up these 12 numbers” is an example. It’s a breeze for the computer to
do that.
But others are more complicated. They can extend into millions of lines long, or even tens of millions,
written by large teams over many years. Think triple-A video game titles or the Linux operating system.
When you’re first starting, large programs like that seem impossible. But here’s the secret: each of those
large programs is made up of smaller, well-designed building blocks. And each of those building blocks
is made up of smaller of the same.
And when you start learning to be a programmer, you start with the smallest, most basic blocks, and you
build up from there.

Chapter 2. What is Programming, Anyway?

And you keep building! Writing software is a lifelong learning process. There are always new things to
learn, new technologies, new languages, new techniques. It’s a craft to be developed and perfected over
a lifetime. Sure, at first you won’t have that many tools in your toolkit. But every moment you spend
working on software gives you more experience solving problems and gives you more methods to attack
them.

### 2.3 What’s This Talk About Problem Solving?
In other words, I know what I want to see… how do I get there with the tools I know?
There’s a great scene in the movie Apollo 131 that I love. The CO2 scrubbers on the command module
are spent, and the team wants to use the scrubbers from the lunar module to replace them. But the former
are round, and the latter are square and won’t fit. Of course, the spacecraft has limited resources to repair
it—just miscellaneous stuff on board that was meant for the mission.
On the ground, the team has all those items at hand, and they dump them on a table. A staff member holds
up a square scrubber and a round scrubber and tells everyone, “We gotta find a way to make this fit into
the hole for this.” He then gestures toward the table, adding, “Using nothing but that.”
And that’s what programming is like, except, obviously and fortunately no lives are at stake. (Typically.)
You have a limited set of programming techniques at your disposal, and you have the goal that you want
to achieve. How can you get to that goal using only those tools? It’s a puzzle!

### 2.4 So How To Solve It?
Fun Programming Fact: Most devs have no idea how to solve a problem when they’re first presented with it. They have to systematically attack it.
Programmers fully intend to use a well-reasoned approach to solving arbitrary problems. In reality, they
often run off in high spirits and dive right into coding before they’ve done some of the very important
preliminary work, but since they love programming so much they don’t seem to mind wasting time.
(And it’s not a waste of time because every second you’re programming, you’re learning!)
But lots of bosses do consider unplanned development to be a waste of time. Time is also known as
“money” to the company that hired you. And the only thing more precious to a company than money is
more money.
Imagine that you said, “I want to build an airplane!” and ran off an bought a pile of tools and metal and
rivets and levers and started bolting it together immediately. You might find after a while that, oh you
should have figured out how big the engine was before you built the fuselage, but, hey, no problem, you
have time. You can just rebuild the fuselage. So you do. But now the canopy doesn’t fit. So you have to
rebuild it again, and so on.
You could have saved a lot of time by actually planning what you were going to do before you started
building.
It’s the same with software.
Fun Programming Proverb: Hours of debugging can save you minutes of planning.
There are several problem-solving frameworks out there. These are blueprints for how to approach a
programming problem and solve it, even if you have no idea how to solve it when you first see it.
One of my favorite problem-solving frameworks was popularized by mathematician George Pólya in 1945
in his book How To Solve It. It was originally written for solving math problems, but it’s surprisingly
effective at solving just about anything. The Four Main Steps are:
1. Understanding the Problem. Get clarity on all parts of the problem. Break it down into subproblems, and break those subproblems down. If you don’t understand the problem, any solutions you

https://www.youtube.com/watch?v=ry55–J4_VQ

### 2.5 What is Python?

come up with will be solving the wrong problem! You know you understand the problem when you
can explain it to someone completely.
2. Devising a Plan. How are you going to attack this with the tools you have at your disposal and the
techniques you know? You know you’re done making a plan when you’re able to easily convert
your plan into code.
Often when planning you realize there’s something about the problem you don’t fully understand.
Just for a bit, pop back to Step 1 until it’s clear, then come back to planning.
3. Carrying out the plan Convert your plan into code and get it working.
Often in this phase, you find that there was either something you didn’t understand or something
the plan didn’t account for. Drop back a step or two until it’s resolved, then come back here.
4. Looking Back. Look back on the code you got working, and consider what went right and what
went wrong. What would you do differently next time? What techniques did you learn while writing
the code? Was there any place you could have structured things better, or anyplace you could have
removed redundant code?
What’s neat about this is that developers apply the steps of problem-solving to the entire program, and they
also apply it to the smaller problems within the program. A big computing problem is always composed
of many subproblems! The problem-solving framework is used within the problem-solving framework!
An example of a real-life problem might be “build a house”. But that’s made up of subproblems, like
“build a foundation” and “frame the walls” and “add a roof”. And those are made up of subproblems, like
“grade the lot” and “pour concrete”.
In programming, we break down problems into smaller and smaller subproblems until we know how to
solve them with the techniques we know. And if we don’t know a technique to solve it, we go and learn
one!
Being a developer is the same as being a problem solver. The problems ain’t easy, but that’s why it pays
the big bucks.
So you should expect that any time you see a programming problem in this book, on a programming
challenge website, at school, or work, that the answer will not be obvious. You’re going to have to work
hard and spend a lot of time to get through the first problem-solving steps before you’ll even be ready to
start coding.

### 2.5 What is Python?
Python is a programming language. This means it’s vaguely readable by humans, and completely readable
by a machine. (As long as you don’t make the tiniest mistake!) This is a good combination, since people
are bad at reading the actual 1011010100110 code that machines use. We use these higher-level languages
to help us get by.
In this case, another piece of software called the Python interpreter takes the code we write in the Python
language and runs it, performing the operations we’ve requested.
So before we begin, we need to install the Python interpreter. This is one of the most annoyingly painful
parts of the whole book, but luckily it only has to be done once.
Okay, gang! Let’s get it… over with!
…I really need to work on the end of that inspirational speech.

### 2.6 Summary
- A programmer is a problem solver. They then write programs that implement a solution to that
problem.
- A program is a series of instructions that can be carried out by a computer to solve the problem.
- The main problem-solving steps are: Understand the Problem, Devise a Plan, Carry out the Plan,
Look Back.

Chapter 2. What is Programming, Anyway?

Chapter 3

What software will I need?
3.1 Objectives
- Install Python, and explain what it does
- Learn what an Integrated Development Environment (IDE) is.

### 3.2 What Is All This?
Python is a programming language. It interprets instructions that you, the programmer, give it, and it
executes them. Think of it like a robot you can give a series of commands to ahead of time, and then have
it run off and do them on its own.
In programmer parlance, we call these sets of instructions code.
In addition to being a programming language, Python is also a program, itself! It’s a program that runs
other programs! We don’t have to worry about the details of that at all, except that since Python is a
program, it’s something we’ll have to install on our computers.
Python comes in different versions. The big versions are 2 and 3. We’ll be using Python 3 for
everything in this book. Python 2 is older, and is rarely used in new projects.
Python also comes with an Integrated Development Environment, or IDE. An IDE is a program that helps
you write, run, and debug (remove the errors from) code.
It’s main components are:
- The editor. This is like a word processor except specifically designed for use with code.
- The debugger. This helps you step through your code a line at a time and watch the data values
change as you go. It can help you find places where your code is incorrect.
- The console or terminal. This is a window where the output from your program appears (and where
you might type input to the program).
The name of Python’s built-in IDE is IDLE. There are other IDEs we’ll talk about later.

### 3.3 Installing Python
#### 3.3.1 Windows
There are two ways to do this:
- Install from the Microsoft Store
- Install from the official website

Chapter 3. What software will I need?

I can’t see any disadvantage to installing it from the store. Just remember to install Python 3 (not Python
2).
If you install it from the official website1 , you need to remember to check the “Add to PATH” box during
the install procedure!
Another option to installing Python on Windows is through WSL. We’ll cover this later.

3.3.2 Mac
Download and install Python for Mac from the official website2 .
Another option to installing Python on Mac is through Homebrew. We’ll cover this later.

#### 3.3.3 Linux/Unix-likes
The Linux community tends to be pretty supportive of people looking to install things. Google for something like ubuntu install python3, replacing ubuntu with the name of your distribution.

### 3.4 Running IDLE
Here’s where we get to run the IDE for the first time. First we’ll look at how to do it on various platforms,
and then we’ll run some Python code in it.
Running IDLE depends on the platform:
Platform

Commands

Windows

Hit the Start menu and type “idle”. It should show up in the pick list and you can click to
open it.
Hit CMD-SPACE and type “idle”. It should show up in the pick list and you can click to
open it.
Type idle in the terminal or find it in your desktop pulldown menu.

Mac
Unix-like

If you run idle on the command line and it says something about the command not being found, try
running idle3.
If you get an error on the command line that looks like this:
** IDLE can't import Tkinter.
Your Python may not be configured for Tk. **

you’ll have to install the Tk graphical toolkit. This might be a package called tk or maybe python-tk.
If you’re on a Unix-like, search for how to install on your system. On a Mac with Homebrew, you can
brew install python-tk.
If you get another error, cut and paste that error into your favorite search engine to see what other people
say about how to solve it.
Once IDLE is up, you should see a window that looks vaguely like this:

### 3.5 Your First Command
In the IDLE window after the >>> prompt, type:

https://www.python.org/downloads/
https://www.python.org/downloads/

### 3.6 Summary

Figure 3.1: IDLE Window
and hit RETURN. This commands Python to output the words “Hello, world!”.
>>> print("Hello, world!")

And it did!
This is just the beginning!

### 3.6 Summary
- The integrated development environment (IDE) has an editor, a debugger, and a terminal window.
- The code editor in the IDE is where you’ll be typing your programs.
- The programs, also known as code, are a series of instructions that Python will execute.
- Python is a program that will run your Python programs!

Chapter 3. What software will I need?

Chapter 4

How do I write a program?
4.1 Objectives
- Edit some source code in the IDLE editor.
- Run that program.

### 4.2 The Problem That Needs Solving
Let’s use our problem-solving framework!
1. Understand the Problem: We want to write a program that prints a neat little message to the screen.
2. Devise a plan
1. Run IDLE.
2. Open a new file from the File pulldown.
3. Write code and save it to that file.
## 4. Run your program from within the IDE.
3. Carry out the Plan: This is where we execute our plan. We’ll do that in the following sections.
4. Look Back: We’ll do this, below, as well. In future chapters, we’ll leave these last two off the
number list and just do them in subsequent sections.
Let’s go!

### 4.3 Launching your IDE and Opening a File
Run IDLE as discussed in the previous chapter.
Once in there, we’re going to make a new file.
It used to be that everyone who used computers knew what a file was. But these days, many people
use computers for years without encountering the concept.
So! A file is a collection of data with a name. Examples of files would be images, movies, PDF
documents, music files, and so on.
The name indicates something about the contents of the file. Generally. It really can be anything,
but that would be misleading, like labeling a box of raisins as “Chocolate”.
The name is split into two parts, commonly, separated by a period. The first part is the name, and
the second part is the extension. Confusingly sometimes people refer to the name and extension
together as the “name”, so you’ll have to rely on context.
Sometimes, depending on the system, the extension is optional.

Chapter 4. How do I write a program?

As an example, here’s a complete file name and extension:
hello.py

There we have a file named hello and an extension .py. This is a common extension that means
“this is a Python source code file”.
Pull down “File→New” and that’ll bring up a blank window.
And let’s enter some code!
Type the following1 into the editor (the line numbers, below, are for reference only and shouldn’t be typed
in):
print("My name's Beej and this is (possibly) my first program!")

We’re (almost) ready to run!

### 4.4 Running the Program!
Hit F5 from the editor window (you might have to hit fn-F5 on the Mac) to run the code. Alternately,
you can pull down the “Run” menu and select “Run Module”.
If you haven’t saved the file, it will prompt you to save the file. (You can pull down “File→Save”, or hit
COMMAND-S or CTRL-S to do this preemptively.)

Give it a good name, like hello.py.
And then, in the console window, you’ll see the output appear! [Angelic Chorus!]
My name's Beej and this is (possibly) my first program!

Did you miss it? Hit F5 again and you’ll see it appear again.
You just wrote some instructions and the computer carried it out!
Next up: write a Quake III clone!
Okay, so maybe there might be a small number of in between things that I skimmed over, but, as Obi-Wan
Kenobi once said, “You’ve taken your first step into a larger world.”

### 4.5 Exercises
Remember to use the four problem-solving steps to solve these problems: understand the problem, devise
a plan, carry it out, look back to see what you could have done better.
1. Make another program called dijkstra.py that prints out your three favorite Edsger Dijkstra
quotes2 .

### 4.6 Summary
- Use the problem solving framework!
- Edit some source code in the IDLE editor.
- Run that program from within IDLE.

https://beej.us/guide/bgpython/source/examples/hello.py
https://en.wikiquote.org/wiki/Edsger_W._Dijkstra

Chapter 5

Data and Processing Data
5.1 Objective
- Understand what data is and how it is used
- Understand what variables are and how they are used
- Utilize variables to store information
- Print the value of variables on the screen
- Do basic math
- Store input from the keyboard in variables
- Learn about integer versus string data types
- Convert between data types
- Write a program that inputs two values and prints the sum
For this chapter, we want to write a program that reads two numbers from the keyboard and prints
out the sum of the two numbers.

### 5.2 Data, Variables, and Math
Data is the general term we use to describe information stored in the computer. In the case of programming,
we’re interested in values that we’ll do things with. Like add together. Or turn into a video game.
Really, data is information. Can you glean information from a symbol? Then it’s data. Sometimes it’s a
symbol like “8”, or maybe a string of symbols like “cat”.
Your goal as a software developer is to write programs that manipulate data. You have to manipulate the
input data in such a way that the desired output is achieved. And you have to solve the problem of how
to do that.
In a program, data is commonly stored in what we call variables. If you’ve taken any algebra, you are
familiar with a letter that holds the place of a value, such as the “slope-intercept” form of the equation of
a line:

𝑦 = 𝑚𝑥 + 𝑏
or of a parabola:

𝑦 = 𝑥2
But beware! In programming code, variables don’t behave like mathematical equations. Similar, but
different.
Enter the following code in a new program in your editor, save it, and give it a run. (This is just like
you did with the program in the earlier chapter. You can name this one anything you’d like. If you need

inspiration, vartest.py1 seems good to me.)

In Python, variables refer to values2 . We’re saying on line 1 of the code, above, “The variable x refers to
the value 34.” Another way to think of this that might be more congruent with other languages is that x
is a bucket that you can put a value in.
Then Python moves to the next line of code and runs it, printing 34 to the screen. And then on line 3, we
put something different in that bucket. We store 90 in x. The 34 is gone–this type of bucket only holds
one thing3 .
So the output will be:
90

You can see how the variable x can be used and reused to store different values.
We’re using x and y for variable names, but they can be made up of any letter or group of letters,
or digits, and can also include underscores (_). The only rule is they can’t start with a digit!
These are all valid variable names (and, of course, you can make up any name you want!):
y
a1b2
foo
Bar
FOOBAZ12
Goats_Rock

You can also do basic math on numeric variables. Add to the code above:

y = x + 40

On line 6, we introduced a new variable, y, and gave it the value of “whatever x’s value is plus 40”.
What are all these # marks in the file? We call those hash marks, and in the case of Python, they
mean the rest of the line is a comment and will be ignored by the Python interpreter.
One last important point about variables: when you do an assignment like we did, above, on line 6:
y = x + 40

When you do this, y refers to the value 130 even if x changes later. The assignment happens once, when
that line is executed, with the value in x at that snapshot in time, and that’s it.

https://beej.us/guide/bgpython/source/examples/vartest.py
More generally speaking, variables refer to objects, but since all we have for now is numeric values, let’s just go with values.
Later we’ll learn that other types of buckets can hold more than one thing.

### 5.2 Data, Variables, and Math

Let’s expand the example farther to demonstrate:

y = x + 40

Even though we had y = x + 40 higher up in the code, x was 90 at the time that code executed, and y is
set to 130 until we assign into it again. Changing x to 1000 did not magically change y to 1040.
Fun Tax Fact: The 1040a is nearly my least-favorite tax form.
a

https://en.wikipedia.org/wiki/Form_1040

For more math fun, you have the following operators at your disposal (there are more, but this is enough
to start):

Operator

Add
Subtract
Multiply
Divide
Integer Divide4
Exponent

+
*
/
//
**

You can also use parentheses similar to how you do in algebra to force part of an expression to evaluate
first. Normal mathematical order of operations rules apply5 .
8 + 4 / 2
(8 + 4) / 2

And you thought all that algebra wouldn’t be useful… pshaw!
There’s a common pattern in programming where you want to, say, add 5 to a variable. Whatever value it
has now, we want to make it 5 more than that.
We can do this like so:
x = x + 5

This pattern is so common, there’s a piece of shorthand6 that we can use instead.
These two lines are identical:
x = x + 10
x += 10

Integer division truncates the part of the number after the decimal point.
https://en.wikipedia.org/wiki/Order_of_operations
We call shorthand like this syntactic sugar because it makes things that much sweeter for the developers.

As are these:
x = x / 10
x /= 10

Here are a few of the arithmetic assignment expressions available in Python:
Operator
+=
-=
*=
/=
%=

Meaning

Usage

Add and assign
Subtract and assign
Multiply and assign
Divide and assign
Modulo and assign

x += y
x -= y
x *= y
x /= y
x %= y

These are very frequently used by devs. If you have x = x + 2, use x += 2, instead!

### 5.3 Assigning from One Variable to Another
Let’s check out this code:

Something interesting happens here that I want you to make note of. It’s not going to be super useful right
now, but it will be later when we get to more intermediate types of data.
When you do this, both x and y refer to the same 1000.
That’s a weird sentence.
But think of it this way. Somewhere in the computer memory is the value 1000. And both x and y refer
to that single value.
If you do this:
y = 1000

Now there are two 1000 values. x points to one, and y points to the other.
Finally, adding on to the original example:
y = 1000

What happens there is that first there is one 1000, and x refers to it.
Then we assign x into y, and now both x and y refer to the same 1000.
But then we assign a different 1000 to y, so now there are two 1000s, referred to by x and y, respectively.
(The details of this are rather more nuanced than I’ve mentioned here. See Appendix C if you’re crazy
enough.)
Takeaway: variables are just names for items in memory. You can assign from one variable to another
and have them both point to the same item.
We’re just putting that in your brain early so that we can revive it later.

### 5.4 Your Mental Model of Computation

### 5.4 Your Mental Model of Computation
This is a biggie, so listen up for it.
When you’re programming, it’s important to keep a mental model of what should happen when this program runs.
Let’s take our example from before. Step through it in your head, one line at a time. Keep track of the
state of the system as you go:

Before we begin, x has no value. So represent that in your head as “x has no value; it’s invalid”.
Then the first line runs.
x is now 34.

Then the second line runs.
x is still 34, and we print it out. (So 34 is printed.)

Then the third line runs.
x is no longer 34. It is now 90. 34 is gone.

Then the fourth line runs.
x is still 90, and 90 gets printed out.

Then we’re out of code, so the program exits. And we have “34” and “90” on the screen from when they
were printed.
That’s keeping a mental model of computation.
This is the key to being able to debug. When your mental computing model shows different results than
the actual program run, you have a bug somewhere. You have to dig through your code to find the first
place your mental model and the actual program run diverge. That’s where your bug is.

### 5.5 User Input
We want to get input from the user and store it in a variable so that we can do things with it.
Remember that our goal in this chapter is to write a program that inputs two values from the user on the
keyboard and prints the sum of those values.
Python comes with a built-in function that allows us to get user input. It’s called, not coincidentally,
input().

But wait—what is a function?
A function is a chunk of code that does something for you when you call it (that is when you ask it to).
Functions accept arguments that you can pass in to cause the function to modify its behavior. Additionally,
functions return a value that you can get back from the function after it’s done its work.
So here we have the input() function7 , which reads from the keyboard when you call it. As an argument,
you can pass in a prompt to show the user when they are ready to type something in. And it returns
whatever the user typed in.
input() is what we call a built-in in Python. It comes with the language and we get to make use of it. Later we’ll learn to write
our own functions from scratch!

What do we do with that return value? We can store it in a variable! Let’s try!
Here’s another program, inputtest.py8 :
value = input("Enter a value: ")
print("You entered", value)

We can run it like this:
$ python3 inputtest.py
Enter a value: 3490
You entered 3490

Check it out! We entered the value 3490, stored it in the variable value, and then printed it back out!
We’re getting there!
But you can also call it like this:
$ python3 inputtest.py
Enter a value: Goats rock!
You entered Goats rock!

Hmmm. That’s not a number. But it worked anyway! So are we all good to go?
Yes… and no. We’re about to discover something very important about data.

### 5.6 Data Types
We started with numbers, earlier. That was pretty straightforward. The variable was assigned a value and
then we could do math on it.
But then we saw in the previous section that input() was returning whatever we typed in, including
Goats rock! which is certainly not any number I’ve ever heard of.
And, no, it’s not a number, indeed. It’s a sequence of characters, which we call a string. A string is
something like a word, or a sentence, for example.
Wait… there’s another type of data besides numbers? Yes! Lots of types of data! We call them data types.
Python associates a type with every variable. This means it keeps track of whether a variable holds an
integer, a floating point9 number or a string of characters.
Here are some examples and their associated types. When you store one of these values in a variable, the
variable remembers the type of data stored within it.

Example Data

Type in English

Type name in Python

3490
-45
3.14159
-13.8
0.0
"Hello!"

Floating Point
Floating Point
Floating Point
String

float
float
float
str

https://beej.us/guide/bgpython/source/examples/inputtest.py
This is the way most computers represent numbers with a decimal point in them, such as 3.14159265358979. When you
see “floating point” or “float”, think “number with a decimal point in it” as opposed to “integer”.

### 5.7 Converting Between Data Types

Example Data

Type in English

Type name in Python

"3490"
""

String
String (empty)

str
str

In the examples, above, strings are declared using double quotes ("), but they can also be done with single
quotes, as long as the quotes match on both ends:
"Hello!"
'Hello!'

Okay, that’s all fine. But is input() returning a string or a number? We saw both happen when we tried
it out, right?
Actually, turns out, input() always returns a string. Period. Even if that’s a string of numbers. Note that
these things are not the same:
3490
"3490"

Sure, they look kinda the same, but they aren’t the same because they have different types. You can do
arithmetic on an int, but not on a string.
Well, that’s just great. The task for this chapter is to get two numbers from the keyboard and add them
together, but the input() function only returns strings, and we can’t add strings together numerically!
How can we solve this problem?

### 5.7 Converting Between Data Types
If we can’t add strings mathematically, can we convert the string "3490" into the integer 3490 and then
do math on that?
Yes!
In fact, we can convert back and forth between all kinds of data types! Watch us convert a string to a
number and store it in a variable:
a = "3490"
b = int(a)

print(b + 5)

How did that work? We called the built-in int() function and passed it a string "3490". int() did all
the hard work and converted that string to an integer and returned it. We then stored the returned value in
b. And finally, we printed the value of b+5 just to show that we could do math on it.
Perfect!
Here are some of the conversion functions available to you in Python:

Effect

int()
float()
str()

Convert argument to an integer and return it
Convert argument to a floating-point number and return it
Convert argument to a string and return it

So… given all that we know so far, how can we solve this chapter’s problem: input two numbers from
the keyboard and print the sum?

### 5.8 Input Two Numbers and Print the Sum
We know:
- How to input strings from the keyboard
- How to convert strings to numbers
- How to add numbers together
- How to print things out
Now—how do we put all that together to write a program that inputs two numbers from the keyboard and
prints their sum?
This is the Devising a Plan portion of problem-solving. We’re not going to write code to make this happen.
We’re just going to write an outline of the individual steps the program must describe in a language called
pseudocode (which is English that looks kinda like code).
Then when we’re satisfied it’ll work, we can code it up for realsies.
So stop here and take a moment to consider what the step by step might be to get this done.
Really, take a moment, because I’m about to give spoilers. Thinking about how to solve problems is 80%
of what a software developer gets paid to do, so you might as well practice right now.
What do we know? What tools do we have at our disposal? What resources? How do I put all those
together to solve this problem, like solving a puzzle?
Here’s some pseudocode that would get the job done, it looks like:
read string from keyboard into variable x
convert x to int and store it back in x again
read string from keyboard into variable y
convert y to int and store it back in y again
print the sum of x + y

If we’re satisfied that our plan is solid, it’s time to move to the next phase.
Now let’s convert each of those lines to real Python. I’ll throw in the pseudocode as comments so we can
see how they compare. (Source code link10 .)
x = input("Enter a number: ")
y = input("Enter another number: ")
print("The sum of the two numbers is:", x + y)

Save that file as twosum.py and run it:

https://beej.us/guide/bgpython/source/examples/twosum.py

### 5.9 Wrapping it Up

$ python3 twosum.py
Enter a number: 9
Enter another number: 8
The sum of the two numbers is: 17

Too easy! Let’s challenge it:
$ python3 twosum.py
Enter a number: 235896423496865928659832536289
Enter another number: 94673984675289643982463929238
The sum of the two numbers is: 330570408172155572642296465527

Not even breaking a sweat!
Nice. Now, I want you to think like a villain. What would a villain pass into our program for input that
would cause it to break?
- Negative numbers?
- Zero?
- Decimal numbers?
- Non-numbers, like “goat”?
Try all those things with your program. What happens when you try it? Which ones work and which ones
don’t?
Notice that a big, spewing error message is really the worst case scenario here. And it’s not really that
painful. Don’t be afraid to try to break your code. The computer can handle it. Just run it again.
Later, we’ll learn techniques to catch errors like this so that the program doesn’t bomb out, and prints a
nice message to the user to please try again with valid input, thank you very much.
Notice that when the program crashes, buried in all that output, is the line number the program
crashed on! Very, very useful! And the last line tells you exactly what Python thinks went wrong.
The point is, if you’re not sure how something will work, just try it. Experiment! Break things! Fix
things! Again, the computer can absolutely handle it. It’s just a big sandbox for you to play in.

### 5.9 Wrapping it Up
This grimly-named step is where we take a look at our code and decide if there was a better way to attack
this problem. It’s important to remember that coding is a creative endeavor. There are many ways to
solve the same problem.
Admittedly, right now, you don’t have many tools in the toolkit, so your creativity is limited. But eventually, in the not-too-distant future, you’ll know several ways to solve a problem, and you’ll have to weigh
the pros and cons of each, and be creative and choose one!
What could be better?
- We saw earlier that passing in floating point numbers (with a decimal point) bombed out. It would
be nice if the program would add both floating-point.
What else could we do?
- What about other math operations?

### 5.10 Exercises
“You know how to get to Carnegie Hall?”
“Practice!”
Zeus says, “This book assumes you complete all of the exercises!” and when Zeus speaks, people really
should listen.
I know, I know. You get to the exercises part of a book and you just skip ahead. I mean, it’s not like I’m
grading you or anything.
But there’s only one way to get to be a better dev: practice and repetition. Going through this book without
doing the exercises is like training for a marathon by reading about how to run. It’s simply not going to
get you there on its own.
Resist the urge to look at the solution until you’ve solved it! Give yourself a time limit. “If I haven’t
solved this in 20 minutes, I can look at the solution.” That 20 minute isn’t wasted—it’s invaluable problemsolving practice time. During that time, you’re building a scaffold in your brain that can hold the solution
once you see it.
If you just skip straight to the solution, look at it, and say, “Yup, makes sense, I got it,” you’re missing out
on all that benefit.
Don’t shortchange yourself! Do the exercises! The more you do, the better dev you’ll be! I’m getting off
my soapbox now!
Remember to use the four problem-solving steps to solve these problems: understand the problem, devise
a plan, carry it out, look back to see what you could have done better.
Here they are:
1. Make a version of the two number sum code that works with floats instead of ints. Do the
numbers always add correctly, or are they sometimes just a little bit off? Lesson: floating point
math isn’t always exact. Sometimes it’s off by a tiny fraction. (Solution11 .)
2. Have the program print out the sum and the difference between two numbers. (Solution12 .)
3. Allow the user to enter 3 numbers and perform the math on those. (Solution13 .)
4. Write a program that allows the user to enter a value for 𝑥, and then computes and prints 𝑥2 . Remember ** is the exponentiation operator in Python. 3**2 is 9. (Solution14 .)
5. Write a program that allows the user to enter a, b, and c, and the solves the quadratic formula15 for
those values.
A refresher: with equations of the form:

𝑎𝑥2 + 𝑏𝑥 + 𝑐 = 0
you can solve for 𝑥 with the quadratic formula:

𝑥=

−𝑏±

𝑏2 − 4𝑎𝑐
2𝑎

This all looks terrifying! Can you feel your brain seizing up over it? Deer in the headlights? That’s
OK. This is how developers feel when confronted with a new problem. Really! All of us! But what
we know is that we have a problem solving framework we can use to attack this problem regardless
of how difficult it seems initially.
Remember: Understand, Plan, then Code It Up.
Take a deep breath. Shake off the fear!

https://beej.us/guide/bgpython/source/examples/ex_twosumfloat.py
https://beej.us/guide/bgpython/source/examples/ex_twosumdiff.py
https://beej.us/guide/bgpython/source/examples/ex_threesumdiff.py
https://beej.us/guide/bgpython/source/examples/ex_xsquared.py
https://en.wikipedia.org/wiki/Quadratic_formula

### 5.11 Summary

You can absolutely do this. It’s not any harder than anything so far! Let’s go!
Your program should plug a, b, and c into the above formula and print out the result value in x.
Make sure 𝑏2 ≥ 4𝑎𝑐 or there won’t be a solution and you’ll get a “domain error” when you
try to take the square root of a negative number. Some test values for 𝑎, 𝑏, and 𝑐 that work:
5, 9, 3, or 20, 140, 60.
What is that ± symbol after −𝑏 in the equation? That’s “plus or minus”. It means there are actually
two equations, one with + and one with −:

𝑏2 − 4𝑎𝑐
2𝑎

𝑏2 − 4𝑎𝑐
2𝑎
Solve them both and print out both answers for a given 𝑎, 𝑏, and 𝑐.

𝑥𝑝𝑙𝑢𝑠 =

−𝑏+

𝑥𝑚𝑖𝑛𝑢𝑠 =

−𝑏−

What about that square root of 𝑏2 − 4𝑎𝑐? How do you compute that? Here’s a demo program for
computing the square root of 2—use it to learn how to use the math.sqrt() function, and then
apply it to this problem.

x = math.sqrt(2) # Compute sqrt(2)

Code that up and, hey! You’ve written a program that solves quadratic equations! Take that, homework! (Solution16 .)
6. Followup to the previous question: after computing x, go ahead and compute the value of

𝑎𝑥2 + 𝑏𝑥 + 𝑐
and print it out. (You can use either the plus solution or the minus solution—doesn’t matter since
they’re both solutions.) The result should be exactly 0. Is it? Or is it just something really close to
zero? Lesson: floating point math isn’t always exact. Sometimes it’s off by a tiny fraction.
Sometimes you might get a number back that looks like this, with a funky e-16 at the end (or
e-something):
8.881784197001252e-16

That’s a floating point number, but in scientific notation17 . That e-16 is the same as ×10−16 . So
the math equivalent is:

8.881784197001252 × 10−16
Now, 10−16 is actually a really, really small number. So if you see something like e-15 or e-18 at
the end of a float, think “that’s a really small number, like close to zero.”
(Solution18 .)
7. Make up two more exercises and code them up.
And don’t worry–we’ll get away from the math examples soon enough. It’s just, for now, that’s about all
we know. More soon!

### 5.11 Summary
This chapter we covered:
- Data and variables
- Storing and printing data in variables

https://beej.us/guide/bgpython/source/examples/ex_quadratic.py
https://en.wikipedia.org/wiki/Scientific_notation
https://beej.us/guide/bgpython/source/examples/ex_quadratic2.py

- Doing basic math
- Getting keyboard input
- Data types, and conversions between them
- String
- Integer
- Floating Point
- Keeping the problem-solving framework in mind the whole time!
It’s a great start, but there’s plenty more to come!

Chapter 6

Flow Control and Looping
6.1 Objective
- Understand what flow control is
- Understand what a conditional is
- Be able to construct Boolean (“BOO-lee-in”) expressions
- Implement code that makes decisions with if statements
- Implement code that loops with a while loop
- Implement code that loops with a for loop and range iterator

### 6.2 Chapter Project Specification
For this chapter, we want to write a program that asks the user for a number between 5 and 50, inclusive.
If a number outside that range is entered, an error message is printed and the user is asked again to enter
a valid number.
Once the number is obtained, the program will print out that many # characters in a row. EXCEPT all
characters at position 31 and above should print out a *. (Characters before that position will still be a #.)
For example, an input of 10 would result in:
##########

whereas an input of 37 would result in:
##############################*******

Keep this program in mind as we learn the techniques to implement it.

### 6.3 What is Flow Control?
What is flow control? To understand, let’s look at a simple program:
print("Are we not drawn onward")
print("We few")
print("Drawn onward to new era?")

When this program runs, Python keeps track of the current instruction, or line, if you will.
First, Python runs the first line.

Then it goes to the next.
Then it goes to the last.
And then it falls off the end and completes.

Kind of monotonous, right? I mean, it just brainlessly goes to the next instruction every time.
What if you want to transfer the program flow elsewhere instead of just blindly going to the next instruction?
This is where you get your first taste of what it means to be a developer. You can ask the computer to
make smart decisions based on the criteria you specify. Figuring out which criteria to specify is the job
of a programmer and where most of the hard work comes in.
Eventually, we’re going to code up things that say “If some condition is true, do one thing” or “If some
condition is false, do another thing”.
But before that, we have to meet someone: George Boole.

### 6.4 Boolean Algebra and Expressions
George Boole1 was quite an interesting character. From humble beginnings in the early 1800s, he went
on to develop the mathematics that became, in many ways, the foundation of modern computation. Pretty
awesome.
What he developed is what we call today Boolean Algebra.
Don’t worry–it’s easier than that algebra you’re thinking of. In fact, you already know it, just not formally
and not by that name.
With Boolean, we’re interested in whether or not expressions are true or false. And then we can make
decisions on whether or not they are.
Let’s do some human ones before we get into the computer stuff.
Level: Easy. Are these expressions true or false for you?
- I live in North America.
- It’s raining right now.
- Cats are superior to dogs.
Hopefully, that wasn’t particularly challenging. Let’s take it up a notch by introducing the concept of
AND. For these, the entire expression is true only if all subexpressions are true.
For example, the statement “I’m over 190 cm tall AND I’m under 30 years of age” is false. Though I am
over 190 cm tall, am I not under 30 years, so the entire expression is false.
By comparison, “I like dogs AND I like motorcycles” is true, because both of those subexpressions are
true.
And if neither of them is true, the result is also false.
Level: Intermediate. Are these expressions true or false for you?
- I live in Europe AND I’m older than 25.
- It’s raining right now AND it’s sunny right now.
- Cats are superior to dogs AND dogs are superior to cats.
All right! Let’s do a variant on AND, namely OR. With OR, the entire expression is true if either or both
of the subexpressions is true.
For example, I don’t like running, but I do like bicycling. Nevertheless, the following statement is true,
because at least one of the subexpressions is true: “I like running OR I like bicycling”. True.

https://en.wikipedia.org/wiki/George_Boole

### 6.4 Boolean Algebra and Expressions

This is the basis for the smarty-pants answer to the question:
“Would you like soup or salad?”
“True. I would like soup or I would like salad.”
“Get out of my restaurant, Boolean fanatic!”
Level: Intermediate. Are these expressions true or false for you?
- I live in Europe OR I’m older than 25.
- It’s raining right now OR it’s sunny right now.
- Cats are superior to dogs OR dogs are superior to cats.
All right! Now one more thing to remember: unless there are parentheses in an expression saying otherwise, AND takes precedence over OR. That is, do the ANDs first, and then do the ORs.
Level: Advanced.
Let’s say it’s raining, I’m over 25, and this fish is big. We could evaluate this expression:
It’s sunny AND this fish is big OR I’m over 25.
We do the AND first. It’s not sunny, and the fish is big. So that’s “false AND true”, which evaluates to
“false”.
So replace that AND expression with “false”. And then we’ll do the OR:
false OR I’m over 25.
Now I am over 25, so that evaluates to “false OR true”, which is “true”.
So the entire expression is true.
And you can override with parentheses:
It’s sunny AND (this fish is big OR I’m over 25).
Do the work in parens first. So now we evaluate the OR, which evaluates to “true OR true” which is
“true”. Then we evaluate the AND, which is “It’s sunny AND true”, which is “false AND true”, which is
“false”.
So the entire expression is false.
Let’s do some examples with numeric conditional expressions. Do these evaluate to true or false?
- 1<5
- 5>1
- 1 < 5 AND 5 < 10
- 1 > 5 OR 5 < 10
- 1 < 5 AND 5 > 10 OR 10 > 20
- 1 < 5 AND (5 > 10 OR 10 > 20)
Answers:
- True
- True
- True AND True = True
- False OR True = True
- True AND False OR False = False OR False = False
- True AND (False OR False) = True AND False = False
Sometimes developers (but more usually hardware folks) describe these operations in what are called truth
tables. A truth table shows what the result of a Boolean expression will be for some given inputs.
Often these tables use 1 to represent True and 0 to represent False2 .
Here are some truth tables for the operations we’ve seen so far.

Ooooo! 1s and 0s! Binary! For just a moment, here, we’re getting a glimpse of the deep workings of the machine.

A

B

A AND B

A

B

A OR B

A

NOT A

Now we’re about ready to go. Let’s learn how to do this in Python.

### 6.5 Boolean Operations in Python
The comparison operators in Python are:
Operator
<
==
!=
<=
>=

Effect
Less than, e.g. x < y
Greater than, e.g. x > y
Equal to, e.g. x == y
Not equal to, e.g. x != y
Less than or equal to, e.g. x <= y
Greater than or equal to, e.g. x >= y

So we can take a variable and convert it to a true or false value by comparing it to numbers or other
variables.
What is true and false in Python?
Boolean

Python Keyword

Easy enough.
Let’s try a quick demo3 :
print(True)
print(False)

https://beej.us/guide/bgpython/source/examples/booltest.py

### 6.6 The Almighty if Statement

print(x == 10)
print(x < 5)

r = x >= 7
print(r)

Check that out! You can store the Boolean result of a comparison in a variable, like we did with r, above!
It’s important to note that True and False are not strings. They represent Boolean values.
So now, for data types, we know about strings, ints, floats, and Booleans (sometimes called bools for
short). Add that to the collection of tools we have at our disposal.
But what about our good friends AND and OR?
Boolean

Python Keyword

AND
OR
NOT

and
or
not

Pretty easy, but I threw in a NOT! What is that? It’s pretty easy: it just inverts whatever you give it. “NOT
true” is false. And “NOT false” is true.
print(not False)

Seems mundane, but we’ll make good use of it in a minute.

### 6.6 The Almighty if Statement
It’s all well and good for Python to tell me that 1 < 5 is True, but how can we actually use that to make
choices in a program?
Let’s consider a small program that will let the user input a number and it will tell the user if the number
is between 50 and 59, inclusive.
Before coding, let’s think about how to approach it. If the number is stored in x, what would the Boolean
expression in Python be that would be True if x were between 50 and 59?
I’m talking ands and ors and nots and <s and >s… not necessarily all of them, but the ones needed.
Did you get it? Spoilers ahead!
x >= 50 and x <= 59

Let’s take that knowledge and turn it into a complete program4 using if, and then we can take it apart in
more detail:
x = input("Enter a number: ")
x = float(x)
if x >= 50 and x <= 59:
print(x, "is between 50 and 59, inclusive")
print("Well done!")

https://beej.us/guide/bgpython/source/examples/ifelse1.py

print(x, "is not between 50 and 59, inclusive")

So if x >=50 and x <= 59 is True, then we execute the block that is indented afterward.
Blocks can be indented with any combination of tabs or spaces, as long as each line in the block
begins with the same pattern of tabs or spaces. The official recommendation is to use 4 spaces for
indentation in Python.
Indented blocks in Python are one of the things most devs are pretty opinionated about in terms
of loving or hating. Personally, I say be a good dev in any language, regardless of how you feel
about their idiosyncrasies.
And then what’s this pesky else? That’s a super-handy feature of if. If the condition is False, then the
block under the else is evaluated instead. Basically, we’re saying, “If the condition is true, then do this,
otherwise do this.”
There’s one more construct we can use in the if-else family: elif. This is short for else if and is used
if you need to check multiple conditions.
if x < 10:
print("x is less than 10")
elif x < 20:
print("x is less than 20")
elif x < 30:
print("x is less than 30")
print("x is greater than or equal to 30")

In that example, first we check if x is less than 10. If that’s False, the next condition is tested, and so on.
If none of them match, then we get to the else case.
The if statement is the core of what allows us to use Boolean logic to control the flow of our program.
It’s how computers can make decisions based on input. Without if, there would be no computing–that’s
how important it is!
And your job as a dev is to come up with that logic, those if statements and conditions, that cause your
program to give the proper output for a given input.

### 6.7 And Now: while Loops!
We’re going to divert ever-so-slightly, and talk about another important concept in programming: loops.
A loop is what allows us to execute the same piece of code repeatedly without repeating ourselves.
Here’s a real-life example. Let’s say you have to add some shingles to a roof. The steps to do so are to
place a shingle, nail it in place, and then move to the next spot.
Instructions for four shingles might be:

### 6.8 Looping: for Loops

But that’s irksomely verbose. It would be nicer to do something like this:
- While we haven’t yet placed 4 shingles:
That’s us looping. We’re running the same piece of code while a condition is True. At the very least, this
can save us a lot of typing!
Python has several looping statements, but for this section, we’ll concentrate on what’s called the whileloop. It does something while a condition is true.
Here’s an example5 that counts from 1200 to 1210:
x = 1200
while x <= 1210:
x += 1
print("All done!")

It repeats the body of the loop (everything that’s indented) as long as the condition x <= 1210 is True.
You see inside the body of the loop, we increment (add one to) x every iteration so that it increases toward
1210.
What would happen if we didn’t increment x? In that case, it would loop forever. We call this an infinite
loop. If your program’s running for a long time with no output (or repeating output), it might be in an
infinite loop.
How do you get out of your program if it’s caught in an infinite loop? You hit CTRL-C (AKA “break”).
That’ll get you back to your shell prompt.
Remember one of our goals for this chapter’s program is to ask the user for a number between 5 and 50.
And we need to ask them again if they enter a number outside that range. That is, we need to loop while
the user has not given us valid input. Give that some thought now, and we’ll come back to it later.

### 6.8 Looping: for Loops
In addition to while loops, we also have a beast called a for loop. These are quite powerful as we’ll
find out later, but for now, I just want to talk about looping for a certain number of times. (As opposed to
looping while a condition is true.)
Here’s an example of printing out the numbers from 0 to 9 using a for loop and a function called range().
(range() returns something called an iterator. More on iterators in upcoming chapters—for now, just
look at how they can be used with for loops.)
for i in range(10):

Notice a few things:
- i is the classic variable name for a looping index.
- If you have a nested loop (a loop inside a loop—more on that later) you can use j, then k, etc.

https://beej.us/guide/bgpython/source/examples/while.py

- We loop until we get to one before the argument to range(). Up to but not including.
But wait, there’s more! range() is multi-talented! Not only can it count up from zero to almost-a-number,
but you could give it another starting point, as well:
for i in range(5, 10):

Now how much would you pay? It slices, it dices! But we’re not done yet! You can also tell range()
how far to skip each step!
Let’s print out only the even numbers between 4 and 18 (that is, print from 4 to 18, stepping by 2 each
time):
for i in range(4, 20, 2):

Question: let’s say I wanted to count down from 10 to 1 using range(). How would I do that?
for i in range(???, ???, ???):

What do you think? Spoilers upcoming!
You can give range() a negative “step” to make it walk backward:
for i in range(10, 0, -1): # Step backward from 10 to 1

Like before, the final value isn’t included in the results.
Python2 had an additional function called xrange(). Python3 doesn’t have that. If you’re ever
reading old Python2 code and see xrange(), know that it’s the same as range() in Python3.
Now, for does a lot more than just looping for a range, but that’s a story for another time.

### 6.9 When while and When for?
Which of these looping constructs should you use, and when?
Generally speaking, whichever one is the easiest for the problem. Or makes the easiest-to-read code.
Okay, I know that’s not much to go on.
If you want to loop a number of times that you know in advance, like 10 times, or the number stored in x
times, then use a for loop with range().
If you just want to loop until some condition is True or False, but you don’t know when that’ll be, use
a while loop.

### 6.10 Chapter Project
Let’s jump into that project from the beginning of the chapter. Revisit the project spec if you need a
refresher.
Let’s break this program into two parts, and tackle them individually.
1. We want to get some valid user input in the range 5-50, inclusive.

### 6.10 Chapter Project

2. We want to print out some # and xs based on the input.
By breaking down the problem, we make it more approachable. We can even break down step 1 into more:
While user input isn't valid:
Ask the user for input
If input invalid, print an error message

Don’t look now, but our “plan” is looking like really good pseudocode at this point.
Let’s go ahead and code up the user input portion. We’ll do printing asterisks later.
Asking the user for input, we already know.
But how do we ask them repeatedly until they enter something valid? We need to loop! How about looping
while the input is invalid? Sure!
input_valid = False

while not input_valid:
x = input("Enter a number, 5-50 inclusive: ")
if x >= 5 and x <= 50:
input_valid = True

Let’s study that pattern because it’s a common use of while.
We start by assuming that the success condition isn’t met. And then we check every iteration of the loop,
with if, to see if it is met. And we loop while the success condition is not true.
Now, we’re also supposed to print an error if the input is out of range. How? We can do it in two lines.
If the if condition is True, then we have good input. Otherwise we have bad input and should print a
message… if… else!
(Note: the code below is a continuation of the program, above. Pay attention to the line numbers!)
if x >= 5 and x <= 50:
input_valid = True
print("The number must be between 5 and 50, inclusive!")

If you haven’t already, code that up and run it. No, it’s not the complete program, but it’s the complete
first step of the program, and we can test it before moving on just to be confident that this part works.
Run it and try it with some numbers. If you enter an invalid number, it should tell you so and ask again. If
you enter a valid number, input_valid becomes True and the while loop exits (because the continuation
condition is not input_valid).
Once you’re satisfied it’s working correctly, let’s move back to the spec and concentrate on printing out
the asterisks.
If the user enters x, we want to print out x count of characters, total. The first 30 of these will be #, and
any after that will be *.
Before we start things out, let’s use a different planning technique: simplify the problem.
Let’s forget about the * for now and just print out # characters, however many the user-specified. Later
we’ll add the code for *.

Simplifying the problem allows you to more easily tackle it, and leads you to see ways to add the
missing features later.
The plan for this simplified phase isn’t that tough:
For however many numbers the user inputs:
Print a `#`.

Since we know how many #s we want to print (the user entered the number!) this would be a great place
for a for loop. Let’s print those:
for i in range(x):
print("#")

Run it! How did it do?
Hmmm. Looks like it’s printing a hash on each line. The print() function puts a newline at the end of
the line. We need to override that behavior, and there’s an easy way to do it.
for i in range(x):
print("#", end="")

We did a bit of magic there. We passed another argument to print() that told it we wanted it to put
nothing (an empty string, "") at the end of the line instead of the newline character it normally tacks on.
You could go crazy and say end="Beej" and it would put the word “Beej” after every hashmark. Do it.
Go crazy.
Getting there! But we’re not out of the woods yet. We need to make it so that for character more than 30
characters out, we print a * instead of a #.
This is like the plan for printing the line from before, but we simplified that, remember? So we have to
add some complexity to meet the spec.
For however many numbers the user inputs:
If we're at the 30th character or earlier:
Print a `#`.
Otherwise:
Print a `*`.

And that’s looking like a good case for if inside our for loop!
Let’s add that if logic to the for loop at the end:
for i in range(x):
if i < 30:
print("#", end="")
print("*", end="")

### 6.11 Exercises

There’s something here to note that’s subtle and important:
- If the user enters 40, the value of i runs from 0 to 39, because the body of the for loop does not
execute when i reaches its maximum value.
- But 0 to 39 is still 40 iterations, right? Just like 0,1,2,3 is a total of 4 iterations. So we’re still getting
all 40 characters even though the counter is running from 0 to 39.
- However, since the counter is running from 0, that means the highest character that will be a #
occurs when i is 29, not when i is 30. This is why we test i < 306 and not i < 31.
But there we have it!
Be sure to test with the edge cases. These are inputs that are at the edges of conditions in your program.
For example, we have conditions testing input against 5 and 50. So test with 4, 5, 50, and 51, both sides
of those conditions.
Where else do we have an edge case in the code? That right: the if when printing. The first 30 are
supposed to be # with * after that. So test with 30 and make sure it’s all #s, and then test with 31 and
make sure there’s a single *.
Testing the edge cases is an all-powerful programming technique that all devs use to great effect.
And, while you’re at it, test a bunch of other numbers to make sure it behaves as you’d expect.
Bonus Question: Can you think of another way to draw the line of characters without using an if inside
the loop? (There’s a hint at this footnote7 .) Coding is creative! There’s more than one way to do these
things. Try them and see which you like better.

### 6.11 Exercises
Remember: to get your value out of this book, you have to do these exercises. After 20 minutes of
Always use the four problem-solving steps to solve these problems: understand the problem, devise a
1. Print out the sum of the numbers from 1 to (and including) 10000. (Solution9 .)
2. Print out values for x and x**4 for all x between 0 and 99, inclusive. (Solution10 .)
