---
id: lec-sqlite-01
title: "SQLite and sqlite3 — SQLite and sqlite3, Supplementary materials, Recall, Types of…"
slug: lec-sqlite-01-sqlite-and-sqlite3-sqlite-and-sqlite3-supplementary-material
source: "SQLite and sqlite3 — Statistical Computing & Programming"
sourceSection: "SQLite and sqlite3, Supplementary materials, Recall, Types of DBMS: MySQL, Microsoft Access, Microsoft SQL Server, FileMaker Pro, Oracle, Relational database management, SQL, It is an American National Standards Institute standard computer language for accessing, Big picture, Source: https://www.w3r"
track: data-scripting
tier: free
tags: [sqlite, sql, databases, statistics]
summary: "A database is a collection of data typically stored in a computer system. Covers 56 sections: SQLite and sqlite3, Supplementary materials, Recall."
---
# SQLite and sqlite3 — SQLite and sqlite3, Supplementary materials, Recall, Types of…

## SQLite and sqlite3
Statistical Computing &
Programming
Shawn Santo
06-12-20

1 / 41

## Supplementary materials
Companion videos
Review and sqlite3 overview
Creating tables
Join operations
Finer details
Additional resources
SQL Tutorial
Package nodbi vignette

2 / 41

## Recall

3 / 41

Databases
A database is a collection of data typically stored in a computer system. It is controlled by a
database management system (DBMS). There may be applications associated with them,
such as an API.

## Types of DBMS: MySQL, Microsoft Access, Microsoft SQL Server, FileMaker Pro, Oracle
Database, and dBASE.

Types of databases: Relational, object-oriented, distributed, NoSQL, graph, and more.

4 / 41

## Relational database management
system
A system that governs a relational database, where data is identified and accessed in
relation to other data in the database.

Relational databases generally organize data into tables comprised of fields and records.

Many RDBMS use SQL to access data.

5 / 41

## SQL
SQL stands for Structured Query Language

## It is an American National Standards Institute standard computer language for accessing
and manipulating RDBMS.

There are different versions of SQL, but to be compliant with the American National
Standards Institute the version must support the key query verbs.

6 / 41

## Big picture

## Source: https://www.w3resource.com/sql/tutorials.php

7 / 41

## Common SQL query structure
Main verbs to get data:
SELECT columns or computations
FROM table
WHERE condition
GROUP BY columns
HAVING condition
ORDER BY column [ASC | DESC]
LIMIT offset, count

WHERE, GROUP BY, HAVING, ORDER BY, LIMIT are all optional. Primary computations:
MIN, MAX, COUNT, SUM, AVG.

We can perform these queries with dbGetQuery() and paste().

8 / 41

## Verb connections
SQL dplyr
SELECT select()
table data frame
WHERE filter() pre-aggregation/calculation
GROUP_BY group_by()
HAVING filter() post-aggregation/calculation
ORDER BY arrange() with possibly a desc()
LIMIT slice()

9 / 41

## SQL arithmetic and comparison
operators
SQL supports the standard +, -, *, /, and % (modulo) arithmetic operators and the following
comparison operators.

## Operator Description
=

## Equal to

>

## Greater than

<

## Less than

>=

## Greater than or equal to

<=

## Less than or equal to

<>

## Not equal to

10 / 41

## SQL logical operators
Operator Description
ALL TRUE if all of the subquery values meet the condition
AND TRUE if all the conditions separated by AND is TRUE
ANY TRUE if any of the subquery values meet the condition
BETWEEN TRUE if the operand is within the range of comparisons
EXISTS TRUE if the subquery returns one or more records
IN TRUE if the operand is equal to one of a list of expressions
LIKE TRUE if the operand matches a pattern
NOT Displays a record if the condition(s) is NOT TRUE
OR TRUE if any of the conditions separated by OR is TRUE
SOME TRUE if any of the subquery values meet the condition

11 / 41

## sqlite3

12 / 41

SQLite and sqlite3
SQLite is a software library that provides a relational database management system. The lite
in SQLite means light weight in terms of setup, database administration, and required
resource.
This is available on the DSS servers. In your terminal
[sms185@numeric1 ~]$ which sqlite3
/usr/bin/sqlite3

## Check out
man sqlite3

From the summary:
sqlite3 is a terminal-based front-end to the SQLite library that can evaluate
queries interactively and display the results in multiple formats.
sqlite3 can also be used within shell scripts and other applications to provide
batch processing features.
If you have a MAC, sqlite3 should be available on there as well.
13 / 41

## Create a database
First, in RStudio, let's create an object called oil.
oil <- readr::read_table("http://users.stat.ufl.edu/~winner/data/oilimport.dat",
col_names = c("year", "month", "month_series", "barrels_purchased",
"total_value", "unit_price", "cpi")
)

## oil
#> # A tibble: 420 x 7
year month month_series barrels_purchased total_value unit_price
<dbl>
<dbl>
<dbl>
#> 1 1973
102750
282153
2.75 42.6
#> 2 1973
95276
259675
2.73 42.9
#> 3 1973
112053
316283
2.82 43.3
#> 4 1973
98841
279958
2.83 43.6
#> 5 1973
123102
357042
#> 6 1973
118152
360020
3.05 44.2
#> 7 1973
101752
320591
3.15 44.3
#> 8 1973
148219
483085
3.26 45.1
#> 9 1973
124966
421856
3.38 45.2
#> 10 1973
134741
476763
3.54 45.6
#> # … with 410 more rows

14 / 41

Next, create a database called mydb.sqlite and add a table oil.
library(DBI) # R Database Interface
mydb <- dbConnect(RSQLite::SQLite(), "mydb.sqlite")
dbWriteTable(mydb, "oil", oil)

Check our database is there.
[sms185@numeric1 sql]$ ls
mydb.sqlite

Load it with command sqlite3 mydb.sqlite.
[sms185@numeric1 sql]$ sqlite3 mydb.sqlite
SQLite version 3.26.0 2018-12-01 12:34:55
Enter ".help" for usage hints.
sqlite>

15 / 41

## Typing .help at the prompt (sqlite>)
sqlite> .help
.archive ...
.auth ON|OFF
.backup ?DB? FILE
.bail on|off
.binary on|off
.cd DIRECTORY
.changes on|off
.check GLOB
.clone NEWDB

## Manage SQL archives
Show authorizer callbacks
Backup DB (default "main") to FILE
Stop after hitting an error. Default OFF
Turn binary output on or off. Default OFF
Change the working directory to DIRECTORY
Show number of rows changed by SQL
Fail if output since .testcase does not match
Clone data into NEWDB from the existing database
....

will reveal some of the help features.

16 / 41

Commands sqlite3
1. Query commands: sqlite3 just reads lines of input and passes them on to the
SQLite library for execution. This will be the typical command you provide when you
want to access, update, and merge data tables.
2. Dot commands: these are lines that begin with a dot (".") and are intercepted and
interpreted by the sqlite3 program itself. These commands are typically used to
change the output format of queries, or to execute certain prepackaged query
statements.

17 / 41

## Navigating sqlite3
To list all names and files of attached databases
sqlite> .databases
main: /home/fac/sms185/sql/mydb.sqlite

## To list all the tables
sqlite> .tables
oil

## View the current settings
sqlite> .show
echo: off
eqp: off
explain: auto
headers: off
mode: list
nullvalue: ""
output: stdout
colseparator: "|"
rowseparator: "\n"
stats: off
width:
filename: mydb.sqlite

18 / 41

## Table details
To show the CREATE statements matching the specified table
sqlite> .schema oil
CREATE TABLE `oil` (
`year` REAL,
`month` REAL,
`month_series` REAL,
`barrels_purchased` REAL,
`total_value` REAL,
`unit_price` REAL,
`cpi` REAL
);

Note the ; at the end.

19 / 41

## Query
Get the first 5 rows from oil.
sqlite> SELECT * FROM oil
...> LIMIT 5;
1973.0|1.0|1.0|102750.0|282153.0|2.75|42.6
1973.0|2.0|2.0|95276.0|259675.0|2.73|42.9
1973.0|3.0|3.0|112053.0|316283.0|2.82|43.3
1973.0|4.0|4.0|98841.0|279958.0|2.83|43.6
1973.0|5.0|5.0|123102.0|357042.0|2.9|43.9

How about a nicer output? Change the mode and headers settings.
sqlite> .mode column
sqlite> .headers on
sqlite> SELECT * FROM oil
...> LIMIT 5;
---------- ---------- -----------1973.0
1.0
1.0
2.0
2.0
3.0
3.0
4.0
4.0
5.0
5.0

## barrels_purchased
----------------102750.0

## total_value
----------282153.0

## unit_price
---------2.75

---------42.6
42.9
43.3
43.6

20 / 41

Examples
For each year, find the month that the maximum number of barrels of oil were purchased.
sqlite> SELECT year, month as MM, MAX(barrels_purchased) as Max_BBLs
...> FROM oil
...> GROUP BY year
...> ORDER BY Max_BBLs DESC
...> LIMIT 10;
MM
Max_BBLs
---------- ---------- ---------2004.0
6.0
344729.0
2006.0
336528.0
2003.0
7.0
335511.0
2005.0
329039.0
2007.0
3.0
324248.0
2002.0
10.0
315720.0
2000.0
312955.0
2001.0
10.0
311803.0
1998.0
300227.0
1999.0
5.0
289457.0

21 / 41

Let's make a similar query but for unit price and only return the relevant columns.
sqlite> SELECT year, MAX(unit_price) as max_unit_price
...> FROM oil
...> GROUP BY year
...> HAVING year BETWEEN 1975 AND 1990;
max_unit_price
---------- -------------1975.0
12.11
1976.0
12.59
1977.0
13.62
1978.0
13.59
1979.0
24.57
1980.0
33.94
1981.0
36.92
1982.0
35.53
1983.0
32.5
1984.0
28.05
1985.0
27.38
1986.0
25.8
1987.0
18.07
1988.0
22.4
1989.0
17.97
1990.0
30.08

22 / 41

Exercise
Create a query that returns a table that has all the oil information where the average barrels
purchased for a year exceeded 200,000.

23 / 41

## Creating new tables from
existing tables
Create with command CREATE TABLE
sqlite> CREATE TABLE oil_1973(
month INT,
barrels_purchased REAL,
total_value REAL,
unit_price REAL,
cpi REAL
...> );

We are specifying the table name, oil_1973, variables names, and their type.
Add data with command INSERT INTO
sqlite> INSERT INTO oil_1973
...> SELECT month, barrels_purchased, total_value, unit_price, cpi
...> FROM oil
...> WHERE year = 1973;

24 / 41

## Verify
sqlite> .tables
oil
oil_1973
sqlite> SELECT * FROM oil_1973
...> LIMIT 5;
barrels_purchased total_value
---------- ----------------- ----------1

## unit_price
---------2.75

---------42.6
42.9
43.3
43.6

25 / 41

## Creating new tables from outside
data
nukes <- readr::read_table("http://users.stat.ufl.edu/~winner/data/nuketest.dat",
col_names = c("year", "month", "month_series", "tests"))

## nukes
#> # A tibble: 576 x 4
year month month_series tests
#> 1 1945
#> 2 1945
#> 3 1945
#> 4 1945
#> 5 1945
#> 6 1945
#> 7 1945
#> 8 1945
#> 9 1945
#> 10 1945
#> # … with 566 more rows
readr::write_csv(nukes, path = "nukes.csv")

26 / 41

## To import a CSV file of data as a table
sqlite> .mode csv
sqlite> .import nukes.csv nukes
sqlite> SELECT * FROM nukes LIMIT 5;
year,month,month_series,tests
1945,1,1,0
1945,2,2,0
1945,3,3,0
1945,4,4,0
1945,5,5,0

Adjust the mode for pretty output with .mode.
sqlite> .mode column
sqlite> SELECT * FROM nukes LIMIT 5;
---------- ---------- -----------1945

---------0

27 / 41

## More tables from tables
sqlite> CREATE TABLE nukes_1973(
...> year INT,
...> month INT,
...> month_series INT,
...> tests INT);
sqlite> INSERT INTO nukes_1973
...> SELECT * FROM nukes WHERE year = 1973;
sqlite> SELECT * FROM nukes_1973;
---------- ---------- -----------1973
337

---------0

28 / 41

## Join tables
Our nuclear data from 1973...
sqlite> SELECT * FROM nukes_1973;
---------- ---------- -----------1973
337

Our oil data from 1973...
------0

sqlite> SELECT * FROM oil_1973;
barrels_purchased total_value
---------- ----------------- ----------1
118152.0
360020.0
101752.0
320591.0
148219.0
483085.0
124966.0
421856.0
134741.0
476763.0
132168.0
503245.0
100950.0
532182.0

u

How can we merge these two tables?

29 / 41

## Some joins visualized

30 / 41

## Default join
sqlite> SELECT * FROM oil_1973 JOIN nukes_1973;
barrels_purchased total_value unit_price
---------- ----------------- ----------- ---------1

---------42.6

---------1973

---------1

## mon
--337

...

What happened with this join?
By default, a cross join was used, and it combines every row from the first table oil_1973
with every row from the second table nukes_1973 to form the resulting table.

31 / 41

## Natural join
sqlite> SELECT * FROM oil_1973 NATURAL JOIN nukes_1973;
barrels_purchased total_value unit_price cpi
---------- ----------------- ----------- ---------- ---------1
42.9
43.3
43.6
118152.0
360020.0
3.05
44.2
101752.0
320591.0
3.15
44.3
148219.0
483085.0
3.26
45.1
124966.0
421856.0
3.38
45.2
134741.0
476763.0
3.54
45.6
132168.0
503245.0
3.81
45.9
100950.0
532182.0
5.27
46.2

---------1973

-----------337

t

In the NATURAL JOIN, all the columns from both tables with the same name will be
matched against each other. It automatically tests for equality between the values of every
column that exists in both tables. This is why in the above example we only see month once.

32 / 41

## Be explicit on how to join
sqlite> SELECT year, month, tests, unit_price
...> FROM nukes_1973
...> LEFT JOIN oil_1973
...> ON nukes_1973.month = oil_1973.month;
Error: ambiguous column name: month

## sqlite> SELECT year, oil_1973.month, tests, unit_price
FROM nukes_1973
LEFT JOIN oil_1973
ON nukes_1973.month = oil_1973.month;
unit_price
---------- ---------- ---------- ---------1973
3.05
3.15
3.26
3.38
3.54
3.81
5.27

33 / 41

## Other joins
sqlite> SELECT * FROM oil_1973 NATURAL RIGHT JOIN nukes_1973;
Error: RIGHT and FULL OUTER JOINs are not currently supported

34 / 41

Exercise
Use nukes and oil to perform one SQL query that returns the mean oil price and mean
nuclear tests per year for all years where oil price and nuclear test data is available.
---------1992
1991
1990
1989
1988
1987
1986
1985
1984
1983
1982
1981
1980
1979
1978
1977
1976
1975
1974

## avg_oil_price
---------------16.7033333333333
17.5166666666667
20.3591666666667
16.4408333333333
14.3066666666667
16.6766666666667
14.3925
26.22
27.6708333333333
29.5833333333333
33.3591666666667
35.1066666666667
31.555
18.6758333333333
13.4341666666667
13.3233333333333
12.42
11.5883333333333
11.0875
3.29083333333333

## avg_nuke_tests
-------------0.5
0.583333333333
0.666666666666
0.916666666666
1.25
1.166666666666
1.166666666666
1.416666666666
1.5
1.5
1.5
1.333333333333
1.166666666666
1.25
1.583333333333
1.666666666666
1.666666666666
1.833333333333
1.833333333333
2.0

35 / 41

## Finer details

36 / 41

SQL statement processing
What happens in the background when a SQL statement is sent to the RDBMS?
1. The SQL statement is parsed around key words.
2. The statement is validated. Do all tables and fields exist? Are names unambiguous?
3. The RDBMS optimizes and eventually generates an access plan - how best to retrieve
the data, update the data, or delete the data.
4. Access plan is executed

37 / 41

## Subqueries
A subquery may occur in a
SELECT clause
FROM clause
WHERE clause
The inner (sub) query executes first before its parent query so that the results of an inner
query can be passed to the outer query.
sqlite> SELECT * FROM nukes_1973
...> WHERE month IN (
...> SELECT month FROM oil_1973
...> WHERE unit_price BETWEEN 2.5 AND 3.5);

What are we trying to get with the above query?

38 / 41

## Tips
On very large datasets use indices to speed up searches
Use CAST to change data types in a query
Attach databases to perform JOIN operations on tables across databases
See your query and improve performance with EXPLAIN QUERY PLAN followed by
your query

39 / 41

## Beyond SQL: NoSQL
Document
Graph stores
Key-value stores
Wide-column stores
R package nodbi provides a single user interface for interacting with many NoSQL
databases. This is similar to package DBI for interacting with relational databases that use
SQL.
R package nodbi supports:
MongoDB
Redis (server based)
CouchDB
Elasticsearch
SQLite
Check out their vignette for more information: https://docs.ropensci.org/nodbi/

40 / 41

## References
https://www.w3resource.com/sql/tutorials.php
http://www.sql-join.com/sql-join-types
https://www.mongodb.com/nosql-explained

41 / 41
