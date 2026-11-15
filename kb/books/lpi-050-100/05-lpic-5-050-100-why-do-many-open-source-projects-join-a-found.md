---
id: lpi-050-100-05
title: "LPIC-5 · 050-100 — Why do many open source projects join a foundation?, You are a…"
slug: lpi-050-100-05-lpic-5-050-100-why-do-many-open-source-projects-join-a-found
source: "LPI Learning Material — LPIC-5 (Exam 050-100)"
sourceSection: "3. Why do many open source projects join a foundation?, 1. You are a committer on your project. Someone submits code that was taken from another, 2. You created a proprietary software product and want to contribute parts of it to an open source, 3. Two people on your mailing list start to argue over"
track: linux-engineer
tier: free
tags: [linux, lpic-5, certification, security, cryptography]
summary: "In this lesson, you learned what it’s like to be part of a community and how communities remain Covers 16 sections: Why do many open source projects join a foundation?, You are a committer on your project. Someone submits code that was ."
---
# LPIC-5 · 050-100 — Why do many open source projects join a foundation?, You are a…

## 3. Why do many open source projects join a foundation?

## 1. You are a committer on your project. Someone submits code that was taken from another
project (but the contributor has the rights to it). The code is formatted completely differently
from the rest of your code. What do you do?

## 2. You created a proprietary software product and want to contribute parts of it to an open source
project. Under what circumstances can you continue to offer your proprietary product?

## 3. Two people on your mailing list start to argue over a feature in your code. The argument
gradually gets more heated until one person calls the other an idiot. How can you handle the
situation?

In this lesson, you learned what it’s like to be part of a community and how communities remain
productive. You learned different types of contributions, contributors, and roles. You learned how
communities control the right to use contributions. You learned about rules in a community and
how they protect everyone, including people of different races and genders, from verbal abuse.

1. Why don’t all contributors give their code to the project and relinquish all rights to the code?
The contributor might want to contribute the same code to a different project or release a
product based on the code, and therefore wants to keep some rights.
2. If someone wants to help the project but can’t program, what are some ways they can help?
There are many roles for contributors besides coding. A few such roles include documentation,
testing and bug reporting, community management, participating in forms, promoting the
project, and doing artwork.
3. Why do many open source projects join a foundation?
A foundation handles many legal, financial, and other tasks that the project’s community might
have difficulty doing.

## 1. You are a committer on your project. Someone submits code that was taken from another
project (but the contributor has the rights to it). The code is formatted completely differently
from the rest of your code. What do you do?
Your project’s coding standards should clearly explain how to format the code. Thank the
contributor, point them to the standards, and ask them to reformat the code. Sometimes,
automated tools exist to reformat code as you want it. If the contributor doesn’t have time to do
the reformatting, look for a junior member of your team who can do that job.
2. You created a proprietary software product and want to contribute parts of it to an open source
project. Under what circumstances can you continue to offer your proprietary product?
The answer depends on the contributor license agreement. If the CLA requires you to hand the
code over to the project, granting them all rights, you might not be able to continue offering
your proprietary product. However, if they let you keep your rights to the code, you can release
it under any license you like in your proprietary product.
3. Two people on your mailing list start to argue over a feature in your code. The argument
gradually gets more heated until one person calls the other an idiot. How can you handle the
situation?
Anyone who notices the escalation and the abusive comment should react as quickly as they
can. The community manager is ultimately responsible for repairing the damage. The person
who intervenes should post a comment to the whole list saying that the behavior violates the
project’s code of conduct (which hopefully rules out such behavior.) The person intervening
can also reach out to the people on each side separately to make sure they are satisfied by the
resolution of the argument and understand how to discuss disagreements constructively.

## Topic 056: Collaboration and Communication

### 056.1 Development Tools
Open Source Essentials version 1.0, Exam 050, Objective 056.1
- Understanding common software development tools
- Understanding common deployment environments
- Understanding common types of software testing
- Understanding the concepts of Continuous Integration and Continuous Delivery (CI/CD)
- Integrated Development Environments (IDEs)
- Linters
- Compilers
- Debuggers
- Unit testing
- Integration testing
- Acceptance testing
- Performance testing
- Smoke testing
- Regression testing

- Production, staging and development systems
- Local development systems
- Remote development systems
- CI/CD pipelines

## 056. Collaboration and Communication

### 056.1 Development Tools

There are thousands of software development tools, both open source and proprietary. And why
not? Programmers love to develop tools for themselves and their colleagues; it’s only natural that
they’d invest a lot of time trying to find a tool that works better, removes some annoyance from
their workflow, or makes deployment easier.
This lesson focuses on the development process and explains how various types of development
tools fit into it. Few specific tools will be named, because any one of them could possibly be
flagged as deprecated or obsolete, and be replaced by a new favorite by the time you read this
lesson.

Goals of Development
Programming tools juggle multiple goals that sometimes conflict with one another. Here are some
sample development goals:
- Produce robust, accurate programs.
- Produce programs that run fast.

- Produce programs that scale well.
- Produce programs that are highly adaptable to different types of users, different devices (such
as laptops, cell phones, and tablets), and different environments.
- Speed up the development process.
- Speed up deployment of newly developed features or bug fixes.
- Reduce tedious work, as well as the number of clerical programming errors that slip through to
the test stages of the program.
- Support legacy code and devices that the organization has trouble replacing.
- Work together with other familiar tools.
- Allow for easy roll-back in case of errors or changes in plans.
These goals, and others, lead to the processes described in this lesson and the resulting
development tools.

General Development Processes
This section contrasts two general models of historical importance: the waterfall model
(introduced in an earlier lesson) and continuous integration/continuous delivery (CI/CD).

Waterfall Model
Although the waterfall model is still widely used, especially by large organizations, it has fallen
out of favor among many developers. This model was popular from the 1950s through the 1970s.
Elements of the model can still be widely found today, such as formal definitions of requirements
and testing programs just before their release (quality assurance).
Even at the time that the term “waterfall” was coined for this model, it had become widely
discredited. Problems included:
- Changing requirements was difficult once development started.
- Requirements and designs were often misunderstood, because plain-language text can be
ambiguous. This problem led to products that didn’t meet the intended requirements, and took
months to fix.
- The process was slow. A new release might be achieved only once a year, or even less often.
- Bugs caused by the interaction of different modules were hard to catch until late in the process,
leading to further delays.
- The process put up barriers between different parts of the organization, which was bad for the

quality of the product as well as organizational esprit de corps.

Principles of Continuous Integration/Continuous Delivery (CI/CD)
The waterfall model was challenged in the 1970s by a series of movements that led to the most
celebrated (if not universally used) model today: CI/CD. Stages in the adoption of the CI/CD
practices include the Agile Manifesto, released in 2001, SCRUM, and DevOps. The new model is
founded on the principles of tight communications among team members, involvement by the
end user or customer, rapid roll-out of bug fixes and new features, and rigorous ongoing testing to
preserve quality in a fast-moving — sometimes even chaotic — environment.
CI/CD automates as many steps as possible in the stages that range from writing code to deploying
the completed program to end users. CI/CD requires defining each step formally and replacing a
human action (such as installing software by hand) with a procedure run by a program. Thus,
CI/CD is part of a movement known by the phrase “everything as code” and “infrastructure as
code.”
Furthermore, once a team has incorporated its processes into code, these processes can be fixed,
upgraded, and recorded historically just like code. Anything written by the team, whether
programs, automated procedures, or documentation, should be stored in a version control system,
which is described in an upcoming lesson.
When several procedures are automated, they can run in sequence. Thus, teams often talk about a
CI/CD pipeline, which means that one successful step in the pipeline automatically triggers one or
more subsequent processes. A pipeline must be monitored in an automated fashion so that any
failure along the way causes the pipeline to stop and notify team members of the failure.
Although the following sections discuss CI and CD separately, they tend to be combined, and the
dividing line between them is blurry.

Continuous Integration (CI)
Continuous integration refers to the fast incorporation of small changes into the code. The central
repository used to create the product for end-users is known as the core repository (or core repo).
Each programmer creates a personal workspace (often called a sandbox) on their computer and
pulls from the core repository the files they need to fix or upgrade.
The programmer could use a personal laptop or desktop (known as a local development system),
downloading relevant parts of the core repository and then uploading changes after local testing.
Alternatively, the programmer could take advantage of the popular trend called “cloud
computing” and work on a shared system run by their organization, a remote development system.

The programmer generally checks for errors using a debugger, a separate program that runs the
programmer’s work in a controlled environment. We’ll look later at debuggers and other tools for
catching errors.
To catch errors as early in the development process as possible, the programmer also runs tests on
the code before uploading it to the core repository. These are called unit tests because each
focuses on one tiny element of the code: For instance, did a function increment a counter as it was
supposed to?
The last stage in CI is checking the programmer’s changes into the core repository. At this stage,
tools run integration tests to make sure the programmer hasn’t broken anything in the project as a
whole.
No matter how far automation has come, some expert member of the team should intervene at
the point of integration to make sure the change is desired by the team. Automated tests can
determine that nothing has broken, and even whether the change creates the desired effect in the
program. But these tests can’t check for all the principles considered important by the team.
Therefore, before proceeding to deployment, a team member should check security, adherence to
coding standards, proper documentation, and other principles. (Not surprisingly, tools exist for
some of these tasks too; we’ll look at them later in this lesson.)
A lot of testing takes place during CI, and it has to happen both fast and reliably to support the
pace of modern development. Therefore, modern tools for integrating code and running tests are
automated. A programmer should be able to run a whole suite of unit tests through a single
command or a click of a button.
Generally, a partial or full integration test runs whenever the programmer uploads code to the
core repository. Any errors caught by the tests can be reported quickly to the programmer.

Continuous Delivery (CD)
As explained in the previous section, CI consists of automated procedures that lead up to a new
version of the program in the core directory. Continuous delivery refers to anything that happens
after that stage to bring the new version out into the field where end users can benefit from it. The
D in CD is sometimes expanded to “development” or “deployment” in addition to “delivery.”
The main tasks of CD are to test the code thoroughly and to upload it to the users' computers or an
application repository.
The CD phase runs a battery of tests to provide maximum assurance that the product works well.
A larger set of integration tests might be run, along with a number of other tests to determine

impacts on the users, performance, and security. A later section in this lesson describes some of
these tests.
Testing should be done on different systems from the production systems that serve users. Not
only could a catastrophic flaw bring down a production system; it might corrupt user data.
Furthermore, tests compete for system time and degrade performance for users.
So for testing, it’s best to set up a complete computing environment that mirrors your production
environment, with similar hardware and software. The intermediate environment where testing
runs before deployment is often called a staging environment.
Of course, it wouldn’t be practical to make the test environment the same size as the production
environment, but the essential elements of the production environment (such as databases)
should be included.
One requirement of CD automation is to distinguish between the test and production
environments. All the code installations and processes should be tailored to the target
environment.
CD offers the most potential for rapid development when the code is a service running on the
organization’s own systems. If you’re a retail site, for instance, offering an interactive web page,
you have access to all your web servers. You can update them several times a day, if you want,
and roll back changes quickly if they turn out to produce problems for users.

Common Software Development Tools
These sections present common types of tools used by programming teams at three levels: code
generation, testing, and deployment.

Compilers
A fundamental programming tool is the compiler, which turns very sophisticated, high-level
programming languages into the instructions running on the computer processor.
Computers run machine code, which consists of strings of bits (ones and zeros) that the processor
turns into instructions and data: loading a value from memory into a register, adding the values of
two registers, etc. Processors are distinguished by the different formats and sets of instructions
they have, so they have different machine code as well. Vendors try to invent new processors that
use the same machine code in order to allow customers to run their old programs on the new
processors. When vendors do so, we speak of families of processors.
The next stage in the early years of programming was assembly language, which provided human-

readable terms, such as ADD, for each instruction. Programmers wrote in assembly language and
submitted their code to a tool called an assembler to translate the assembly language into machine
code. Machine code is also called machine language.
Then, higher level languages were created. Nowadays, you can create complex control flows
without even specifying their details; you can just indicate your desired results. These programs
require a compiler to turn source code into machine code. The compilers can perform quite
intelligent transformations and optimizations.
Many languages have multiple compilers available. You can find a choice of compilers for very
popular languages, such as C and Java. In the free and open source community, most people use
either the GNU Compiler Collection (GCC) or the LLVM compiler for C and C++.
Originally, a compiler would compile each file of source code to produce an intermediate object
file, then combine all the object files into one program by invoking another tool called a linker.
Modern compilers can compile multiple files at once in order to perform optimizations that cross
the boundaries of files.
Compilers used to compile into assembly language, which could be useful because each type of
computer processor supported a different machine code but may support the same assembly
language. There are multiple variants of assembly languages. The last step in compilation and
linking was to produce machine code. As with linking, modern compilers know how to assemble
the code into machine code.
But there is another stage in many modern languages: intermediate code, usually called byte code.
This code has been compiled into a binary format that is high-level enough to be portable. For
instance, the Java language is compiled into byte code so that the program can be loaded onto
many different types of processors.
In producing byte code from source code, the compiler has done much of the work. Each
computer then hosts its own version of a program called a virtual machine that completes the
transformation from byte code into a set of instructions that the virtual machine can execute.
Sometimes, byte code is compiled into machine code, too. Going from byte code to a set of
instructions is more convenient for end users than going from a high-level programming language
to machine code. This was a great advantage for Java when it was invented, because its designers
wanted it to run within a virtual machine plug-in for web browsers, where the user’s processor
and operating environment could be quite varied.
Java designers promoted the benefits of byte code through the marketing phrase “Compile once,
run anywhere.” Some other advantages of byte code emerged later. New languages could be
created that provided a very different experience to programmers (hopefully making the job of
programming easier and producing more maintainable code) while creating the same byte code

that Java virtual machines supported. Functions from these languages were easy to mix into
existing Java programs.
Finally, there are some languages, such as Python, for which you don’t have to compile source
code at all: You simply enter statements into a processing tool called an interpreter, which
converts the code directly into machine code and executes it. Interpreters are slower than
compilers, but some have become efficient enough that they don’t impose much of a performance
penalty. Still, some popular libraries in the Python language include functions that are accessible
to developers in the interpreted language but are programmed in the C language, to speed up
execution.
Many interpreted languages provide compilers too. They produce either byte code or machine
code, which then executes more quickly than the interpreter.
There are build tools to help programmers manage files and functions. A complex program might
contain hundreds of files, and the programmer will need to compile different combinations of
files using different compiler options at different times (for instance, to support debugging). A
build tool lets the programmers store different options and combinations of files, and easily
choose the desired type of build. Maven and Gradle are common build tools for Java and related
languages.

Code Generation Tools
The programmer doesn’t have to start coding with a blank screen. Recently, services have sprung
up that generate code based on your plain-text description of what you want. This a form of
generative AI, and like other such services, some people complain that it draws on the work of
former programmers without compensation and produces less robust source code (so far). Aside
from ethical controversies, many programmers say that automatic code generation has greatly
improved their productivity.
One form of code generation that has been available in many programming languages for many
years is refactoring. It examines a large program, which can easily evolve over time into a tangle
of files and functions. Refactoring moves functions around to create a more logical structure to
the program in the pursuit of improved maintainability and reduced duplication of source code.
Some programmers are tasked with reproducing the functioning of other code. They may need to
write a new program to replace a legacy program with missing source code that must be retired.
Or they might be mimicking a competitor’s program. This kind of research is called reverse
engineering. One useful tool for this purpose is a disassembler, which turns machine code into
assembly language. There are also disassemblers for byte code.

Debuggers
Most programmers spend more time debugging than coding. People just don’t think perfectly
logically, and therefore forget some detail that the computer requires to run the program the way
you want. Thus, your code is likely to fail at first try, and you can benefit greatly from a debugger
to uncover the error.
A debugger supports intensive research efforts that can cut hours off of the process for finding
errors.
A programmer can ask the program to stop at some key place in the program (a breakpoint), such
as the beginning of a function or loop. The debugger can display the values of variables and even
computer registers at the current point in the program. The programmer can also run each
statement, one at a time, and see the results (single stepping). If the programmer wants to see
when and how a variable changes during the run, they can set a watchpoint.
The most prominent debugger in the free and open source world, particularly for C and C++, is the
GNU debugger, which works with the GNU compiler mentioned earlier. Other languages also have
dedicated debuggers.

Analytical Tools
Although debugging can usually uncover bugs fairly quickly, it’s better to eliminate spelling errors
and other basic problems earlier in the programming process. Many ingenious analytical tools
exist to check a program. Static analysis examines the code of a program. Dynamic analysis runs a
program and checks for problems during its execution.
One of the earliest forms of static analysis was called a linter. It can detect, for instance, if you
assign the value of a floating-point variable to an integer. This might or might not produce
problems, and might or might not be caught by the compiler. In production, it could lead to
incorrect results.
Nowadays, most compilers can do the job of a linter. Some compilers, such as the one for the Rust
language, are notable for their strictness in rejecting poorly written code.
Many other types of analytical tools run separately from the compiler. For example, security
analysis tools can find problems that make a program vulnerable to hacking. A common error by
developers, for instance, is when their code calls a function and doesn’t check whether that
function returned an error.

Integrated Development Environments (IDEs)
Many programmers use text editors to enter and edit their code. Text editors are different from
word processors, which introduce a lot of formatting (such as italic and bold, bullets and
numbered lists, etc.). The text processor produces unadorned text, which programming languages
require.
There are also sophisticated tools dedicated to helping programmers develop their programs.
These tools are alert to the programming language in use. For instance, if you start to type the
name of a variable of function, the tool can suggest a completion. These tools can check for errors
while you’re coding, format the code in a consistent and pleasing way, run analytical tools and
debuggers, compile the code, handle check-ins to version control systems. and take care of other
tasks for you. Therefore, they are called integrated development environments (IDE).
Eclipse is a popular open source IDE.

Common Types of Software Testing
Testing is a major part of software development. Programmers run unit tests as they develop the
code. Other types of testing typically run when a programmer checks code back into the core
repository, or during deployment.

Unit Testing
We’ve seen that a programmer should take great care to find errors before submitting code for
integration into the core repository. Unit tests are crucial to catching errors.
Writing these tests is both an art and a science, and the volume of test code might exceed the
volume of production code. There is even a development model called test-driven development
(TDD), where programmers write tests before writing the code they want to test. Proponents of
TDD claim it plugs gaps in testing and helps ensure that the code does what the programmer
wants it to do.
It’s important to test for things that go wrong during program execution, as well as things that go
right. If the user, or another part of the program, submits invalid input to a function, it’s
important for the function to catch the problem and report an appropriate error message.
JUnit is a popular open source tool for running unit tests on Java programs.

Integration, Regression, and Smoke Testing
While unit tests focus on the individual actions of particular functions, the team should also run
tests at a higher level to make sure the product, as a whole, works properly. The tests generally
imitate user behavior. For instance, in a restaurant management application, tests could check
whether the user gets the item they requested.
When a change to a program breaks some function that worked before, the failure is called a
regression, and the tests are called regression tests.
As a team prepares a product for release, the first stage of testing is often very short. The team
checks for the most important activities performed by a program and stops testing if any errors
arise, thus saving time. This kind of testing is called a smoke test, because an application that
malfunctions so easily is like a bad device that catches on fire.
Some products involve user interaction; web and mobile applications are common examples.
Therefore, tools have been created to emulate user interactions. The test runs automatically,
triggering the code that would have run if a user pressed the button. Selenium is a popular tool in
this category.

Acceptance Testing
Programs with a user interface need an extra level of testing beyond proving that they react
properly to certain inputs. The programs must also look right on the screen. Acceptance testing
checks the impact of the program on the user. Quality assurance teams generally run these tests
after integration and regression testing demonstrate that the program is formally correct and
meets user expectations.

Security Testing
Security is obviously critical, and even a tiny security failure can expose an organization to major
damage. We’ve seen that programmers can run analytical tools to check the security of the code.
In the quality assurance stage, tests can also determine whether the program has vulnerabilities.
The tests run the program with malicious inputs and make sure the program rejects the input
without failing, performing unintended actions, or revealing sensitive information.
One kind of test that has proven valuable in some situations is fuzz testing. The test framework
simply generates strings of random garbage and submits them as input to the program. This might
seem to be a waste of time, but often turns up vulnerabilities that ordinary testing does not.

Performance Testing
After the program is judged by other tests to work correctly, teams should determine whether it
runs fast enough. Performance testing requires an environment similar to the ones where the
users will interact with the program. For instance, if users will submit requests from a long
distance over a network, performance testing should also be done over a long-distance network.
Some programming libraries are tested through benchmarks: standard tests used to compare
different libraries or different versions of the same library.

Common Deployment Environments
A CI/CD tool allows sophisticated ways to construct pipelines. Like computer programs, a pipeline
can contain tests and branches. By branching, you can perform one set of activities in the test
environment and another in the production environment. You can use the tool to automatically
install the correct database or other software needed for different programs.
CD overlaps with DevOps. In cloud environments, CD and DevOps tools create the virtual
computer systems in an automated fashion with all the components needed for the programs to
run. Automated tools (sometimes called orchestration tools) check for the failures of virtual
systems and automatically restart them.
The main job of the CD tool is to launch and step through each pipeline. The tool checks the results
of each stage of the pipeline, and chooses whether to proceed or stop. The tool also allows
scheduling, and logs its activities.
Often you have to run a task repeatedly with minor variations. For instance, teams distinguish
between deploying to a test environment and deploying to production. Therefore, CD tools
provide parameters that you can fill in with different values when you run the pipeline.
Sometimes, a process requires commands that traditionally were entered at the terminal. Thus, a
CD tool provides mechanisms to run arbitrary commands. Usually, it provides hooks such as
preprocess to run commands before a stage of the pipeline and postprocess to run commands
after a stage of the pipeline.
Jenkins is probably the most popular open source tool for the orchestration described in this
section.

1. What are some ways to check a program’s security?

2. Why would you write multiple unit tests for a single program function?

1. Your team has inherited an old application that runs slowly and is hard to add features to.
What are some ways to improve the application, without throwing it out and writing a new one
from scratch?

## 2. In large projects, frequently, Team A wants a feature implemented in a part of the system
maintained by Team B, but Team B doesn’t see the feature as a priority. How can Team A code
the feature as part of Team B’s project?

This lesson has laid out the types of tools used throughout development: compilers and other code
generation tools, analyzers, tests, and CI/CD tools that automate integration and delivery. There
are many options for each of these activities, and a tool that is popular today may be replaced in a
year. Understanding how these tools all fit together in the development process helps you identify
what you need.

## 1. What are some ways to check a program’s security?
First, human experts can examine the code.
Many static and dynamic analysis tools exist to catch poor programming practices that expose
a program to security threats.
Other tools submit malicious input to running programs and check their reactions.
2. Why would you write multiple unit tests for a single program function?
A program function usually has to run on many varieties of input, and each variety deserves its
own test. For instance, the function might handle an input value of zero in a special way. You
also need to anticipate invalid input and write tests to show that the function handles it
appropriately.

1. Your team has inherited an old application that runs slowly and is hard to add features to.
What are some ways to improve the application, without throwing it out and writing a new one
from scratch?
First, make sure the project is under version control, if it wasn’t placed there already.
After adding a new feature, run regression tests to determine where the program fails, and
assign programmers to figure out what functions are responsible. These functions can be
selectively replaced.
Performance testing can identify particular functions that run slowly, so you can focus your
efforts on fixing or replacing the most inefficient code.
If the code is in a language that is no longer popular, consider adding features in a language
preferred by the team. Make sure that functions in the new language can be integrated with the
old functions.
2. In large projects, frequently, Team A wants a feature implemented in a part of the system
maintained by Team B, but Team B doesn’t see the feature as a priority. How can Team A code
the feature as part of Team B’s project?
Team B can allow Team A to create a new branch, code the feature, and submit the branch to
Team B to merge into its project. Team A must not be empowered to do anything they want,
however. Team B should provide documentation and help for Team A to follow project
standards. A member of Team B must also review Team A’s submission, and run all the usual
forms of integration testing.
This form of collaboration is sometimes called InnerSource, because it resembles open source
but takes place within a single organization.

### 056.2 Source Code Management
Open Source Essentials version 1.0, Exam 050, Objective 056.2
- Understanding source code repositories (public and private)
- Understanding the principles of source code management and repository organization
- Awareness of common SCM systems (Git, Subversion, CVS)
- Awareness of the terms Version Control System (VCS), Revision Control System and Source
Code Management systems (SCM)
- Source code repositories
- Commits, Branches and Tags
- Feature, development and release branches
- Subrepositories
- Code merges

## 056. Collaboration and Communication

### 056.2 Source Code Management

Anyone who has ever edited a text document in a team knows the problems with such
collaboration: Which version is the current one? Where is this version saved? Is it currently being
edited by someone? Who has made which comments or changes to the text — when and why? The
result is often differing versions of the document and, in the worst case, a collection of versions
that nobody has a grasp of.
Now imagine a software project with hundreds of files, on which developers from all over the
world are working by developing new features, fixing bugs, splitting off parts and developing
them separately, and so on. Such a development process is no longer manageable without suitable
tools.
Special software for source code management (SCM), also known as version control systems (VCS)
or revision control systems (RCS), provides a remedy here. It eliminates the problems that were
just outlined.
In the world of software development, SCM stands as a fundamental pillar, safeguarding the
integrity of your codebase. Picture it as a diligent guardian, meticulously tracking every tweak

and turn made to your source code over time.

Source Code Management System and Repository
The source code management system is the heart of a software project. Although important work
goes on in discussion forums and other places, the SCM system represents both the history of the
project and its current state as a living entity.
The source code repository is a kind of digital workshop for a project. Just as a physical workshop
stores all the tools and items needed to manufacture a workpiece, a source code repository stores
all the files, documents, and code related to a software project. It provides a structured
environment for organizing and managing the project’s assets.
Information is normally stored in the form of a directory tree. SCM systems typically use a clientserver model, where any user can pull data from the repository as well as push data into it. The
system keeps track of who made each change and when it was made, ensuring transparency and
accountability within the team.
Imagine you’re working on a project with multiple developers, and a bug is discovered in the
code. With an SCM, you can easily examine the changes between versions to pinpoint the specific
code change responsible for the bug.
Because the system remembers each version of the files as they change, a user has access to any of
these versions and can revert to earlier versions (in case incorrect changes were made). So the
repository is also a kind of archive, granting access to every change ever made to the project, and
to the status of the project at any moment in its history.
SCM systems save space by keeping track of changes to a file instead of storing the complete file
each time a change is made. This efficient storage method ensures that historical versions are
accessible without consuming excessive resources.
Many tools, such as continuous integration/continuous delivery (CI/CD) and testing, revolve
around the SCM system. People also build their reputations through the system by making their
contributions visible to everyone. Therefore, source code management is not just about tracking
changes; it’s about preserving the integrity of your codebase and fostering collaboration among
developers, ensuring that your projects can evolve in a dynamic and ever-changing landscape.
Popular SCM systems include Git, Subversion, and CVS. Like many other software functions, SCM
is now often provided by specialized vendors. In other words, it is Software as a Service (SaaS) or
a “cloud” service: Participants have the software on their local systems to manage their personal
changes, but upload their changes to a central repository that benefits from typical cloud features
such as 24/7 uptime, backups, and secure access.

Millions of developers now use cloud services, notably GitHub. GitLab is an alternative based on
open source code. Both GitHub and GitLab allow people to work in the vendor’s cloud repositories
or set up a local version of the SCM system. One advantage of working on those systems is the
reputation one can gain through their “star” systems, which allow users to rate each other’s work.
The cloud services add extra attractions such as change request trackers, rating systems, wikis,
and discussion forums.
Repositories can contain both personal and corporate projects, meaning they are not necessarily
exclusive to enterprise use. Any developer who wants to start a development project or work on
an open source project, copying and modifying it according to their needs, can do so. In all these
cases, it is important to have firm control over who can access your repository.
Understanding the terminology surrounding version control and source code management is
essential in navigating its use. In the following sections, we take a closer look at some of these
concepts and terms.

Commits, Tags, and Branches
A developer creates a commit each time a change is uploaded into the respository. Commits
represent snapshots of changes made to the codebase at a particular point in time. Each commit
includes metadata such as the author’s name, a timestamp, and a descriptive message explaining
the changes. Commits help developers track the evolution of the codebase and understand the
history of specific changes.
Consider a team of developers working on a web application. Each time they make changes to the
codebase, they create a commit to document those changes. For instance, someone who adds a
new feature to the application might create a commit with a message like “Added user
authentication feature.” This commit captures the state of the codebase after the feature was
implemented.
When a developer fixes a bug, the commit message usually refers to the number of the bug in the
project’s bug tracking system.
Tags are named references to specific commits. They typically mark significant points in the
project’s history, such as releases or milestones. Tags provide a way to label and refer to
important versions of the codebase, making it easier to manage and navigate the project’s history.
Branches come into play when developers need to work on different tasks concurrently. Branches
are independent lines of development that diverge from the main codebase. They allow
developers to work on features or fixes in isolation without affecting the main code until they are
ready for integration. Branches help organize development efforts and facilitate collaboration

among team members.
For example, if one developer is working on adding a new feature to the application while
another is fixing a bug, they can each create separate branches to isolate their changes. Once their
work is complete, they can merge their branches back into the main codebase (Branches).

Figure 16. Branches

When multiple people are working on the same file, or are checking files into another branch,
sometimes it will happen that two people made a change to the same line of a file. When the
second person to make a change tries to check it in, the system warns of a conflict.
Some VCSes simply don’t let a developer check in a file if it contains a conflict with the current
version in the repository. The developer must check out the current version and figure out how to
resolve the conflict, then check in a new version.
Cloud-based systems offer merge or pull requests. These are created by a developer who has
worked on a local system or branch and believes their changes are suitable for inclusion in
another branch. The developers for the target branch decide whether to accept the request.

Subrespositories
It often happens that the code of another, independent project (e.g., a media player) is required
for the development of a software project (e.g., a complex website). Instead of copying the code of
the media player in part or in full into your own project, many VCSs offer the feature of
subrepositories, also known as submodules.
In our example, the repository of the media player is integrated into the repository of the website

as a subrepository. It then appears as a separate directory in the directory tree. This means that
the code base of the media player is fully available, but remains independent. If required, it can
even be updated from the original repository of the media player.
This capability proves valuable for handling intricate projects with numerous dependencies or
integrating third-party libraries and frameworks into a codebase. Submodules enhance project
organization and facilitate collaboration by allowing developers to work with interconnected
codebases efficiently.

General Use of a Source Control Management System
Each participant in a project starts by creating an identity, normally tied to the participant’s
unique email address. A cloud-based system manages identities through accounts, as social media
sites and other organizations do.
New developers go through a sequence like the following, when using an SCM system:
1. Install the SCM software, if it is not already provided on their operating system.
2. Get the entire project onto the local system one time, also known as cloning.
3. From this step onward, work locally (in one or more branches, if necessary), and push changes
to the repository.
4. Pull the recent version from the repository before the next working session.
Project managers decide whom to trust and give access to the repository. Senior devoélopers have
the important responsibiilty of deciding when changes submitted by other contributors are ready
to go into the main branch of the respository.
On cloud-based systems, a project owner can control the accessibility of a repository by setting its
visibility to either public or private. Public repositories grant read access to anyone on the
internet. Private repositories, however, limit access solely to the owner, individuals with whom
the owner have explicitly shared access, and, in the case of organization repositories, specific
members of the organization.
Imagine a team of developers working on an e-commerce website. They decide to add a new
feature that allows customers to track their orders. To implement this feature, they create a
feature branch with a name such as order-tracking, where they can work on the necessary code
changes without affecting the main codebase. Once the feature is complete and tested, they merge
this branch into the main development branch for further integration and testing.
The main development branch serves as a central hub where all the new features are brought

together for testing. For instance, if multiple developers are working on different features
concurrently, they can merge their feature branches into the development branch to ensure that
everything works together smoothly. This integration process helps identify and resolve any
conflicts or compatibility issues early on.
When it’s time to release a new version of the e-commerce website, the team creates a release
branch, such as v2.0, from the development branch. They focus on stabilizing the codebase, fixing
any last-minute bugs, and conducting thorough testing to ensure a smooth release. Once the
release is ready, the code from the release branch is deployed to production, and the cycle begins
anew.

Common Version Control Systems
Some of the best-known version control systems are Git, Subversion (also known as SVN), and
CVS. All of these are open source.
Git is a distributed version control system widely used in software development and other fields.
When using Git, each developer has a complete copy of the codebase on their computer.
This decentralized approach enables developers to work offline and collaborate seamlessly,
without relying on a central server. That is, developers can work independently on different
features or fixes and merge their changes together seamlessly. Even if the central server goes
offline, developers can continue working and share updates with each other.
Consider the development of the Linux kernel, which initially relied on a centralized version
control system called BitKeeper. When BitKeeper’s free-of-charge status was revoked, Linus
Torvalds and the Linux community developed Git as a distributed alternative. This decision
enabled non-linear development and the efficient handling of large projects such as the Linux
kernel. The success of Git for the Linux kernel — an extremely complex project with thousands of
developers and innumerable branches — shows the power and scability of Git.
Most software development these days uses Git. Extremely popular SaaS offerings are built
around it.
Git treats conflicts by giving the developer a file with both versions of the changed line, clearly
marking which version of the file the lines are from. The developer must decide how to resolve
the conflict and check in a coherent version of the file.
Subversion (SVN) was probably the most popular SCM system before Git was invented. Unlike Git,
Subversion is centralized: The version history resides on a central server. Developers connect to
this server to make changes, ensuring that everyone is working with the latest version of the
codebase.

Assume you are part of a team working on a project using Subversion. Each time you need to
make changes to the codebase, you connect to the central SVN server to check out a working copy
of the code. This ensures that you’re working with the most up-to-date version of the project. After
making your changes, you commit them back to the server, updating the central repository with
your modifications. The centralized workflow helps maintain consistency and ensures that
everyone is working towards the same goals.
Before Subversion, CVS was a very popular, centralized version control system. It had design
problems that led to the design of Subversion as an alternative.

1. Name three core features of SCM systems.

## 2. Describe the concept of tagging in SCM systems and explain why it is important for managing
software releases.

3. What is the difference between a branch and a subrepository in a SCM system?

1. Compare Git and Subversion (SVN) in terms of their architecture and workflow.

2. What is the “index” or “staging area” in Git?

3. Outline the Git trunk-based branching strategy.

## 4. Which of the following SCM systems are open source?
Git
Mercurial
Subversion
GitHub
Bitbucket
GitLab

This lesson explained the central role of source code management systems in modern software
development. You learned the basic terms and ways of using the system, including repository,
branches, tags, and merges.

## 1. Name three core features of SCM systems.
- Logging changes to the source code
- Management of (simultaneous) access to the source code by developers
- Ability to restore any state of development of the files or the entire project
2. Describe the concept of tagging in SCM systems and explain why it is important for managing
software releases.
Tagging is the practice of assigning descriptive labels or names to specific commits within the
codebase, serving as markers for significant points in the project’s history, such as releases or
milestones. These tags offer a convenient means of referring to particular versions of the
codebase and monitoring the project’s evolution over time.
3. What is the difference between a branch and a subrepository in a SCM system?
A branch is a parallel development line in a project, such as for bug fixing or developing new
features, which is usually merged back into the main development branch as soon as the task
has been completed. A subrepository or sumbmodule is an independent project whose
repository is integrated into a project in order to access its code base. The subrepository
appears as a directory in the directory tree of the project and remains independent.

1. Compare Git and Subversion (SVN) in terms of their architecture and workflow.
Git is a distributed version control system (DVCS), allowing each developer to have a complete
copy of the codebase and work even offline on the source code. Git has gained widespread
popularity among developers due to its speed, flexibility, and robust branching and merging
capabilities. SVN is centralized VCS, with the version history residing on a central server. It
remains popular in certain enterprise environments due to its centralized nature and mature
feature set.
2. What is the “index” or “staging area” in Git?
The index or staging area is an intermediate layer between the local working copy of the
project and the current version on the server. It is a file in which all the information for a
user’s next commit is stored.
3. Outline the Git trunk-based branching strategy.
Trunk-based development is a strategy that emphasizes frequent integration of changes into
the main codebase (trunk). Developers work on short-lived feature branches and merge them
into the trunk multiple times a day, ensuring continuous integration and rapid feedback.
4. Which of the following SCM systems are open source software?
Git

Mercurial

Subversion

GitHub
Bitbucket
GitLab

### 056.3 Communication and Collaboration Tools
Open Source Essentials version 1.0, Exam 050, Objective 056.3
- Understanding common tools for communication
- Understanding common ways to capture and secure knowledge
- Understanding common tools for information management and publication
- Understanding common types of documentation
- Understanding common collaboration features of source code management platforms
- Understanding the concepts of stand-alone, federated and centralized managed applications
and platforms
- Instant messengers
- Chat platforms
- Mailing lists
- Newsletters
- Issue trackers and bug trackers
- Bug reports
- Merge requests and pull requests
- Helpdesk and ticketing systems

- Wikis
- Document Management Systems (DMS)
- Documentation websites
- Product websites
- Content Management Systems (CMS)
- Architecture documentation
- User documentation
- Administrator documentation
- Developer documentation

## 056. Collaboration and Communication

### 056.3 Communication and Collaboration Tools

Many open source projects have active participants worldwide. Collaboration mostly happens in
“virtual space,” and the people involved are often distributed across countries, continents, and
timezones. Furthermore, they usually speak different native languages. This means you can be
located anywhere in the world to make a contribution to an open source project, no matter your
country or language!
While this diversity makes contributing to an open source project extremely rewarding, as you
can widen your scope and learn a lot, at the same time it can make communication and
coordination quite challenging. Efficient and effective communication is key to the success and
sustainability of any open source project. To ensure good communication, open source projects
have created structures and use a variety of tools that help to make contributions easy and the
cooperation more effective.
Another challenge is that open source projects, often driven mostly by volunteers, face some
fluctuation in participation. People’s lives and hobbies change, and some might lose interest or
just run out of time. You might contribute to an open source project for years, but when you
change your job, get married, or start raising kids, you might not have enough time anymore to

volunteer.
Therefore, in addition to providing efficient means of communication via proper tooling, open
source projects need to ensure the preservation and sharing of knowledge to avoid “reinventing
the wheel.” Information preservation also helps contributors learn from the past mistakes of
other contributors and avoid making the same errors.
This lesson presents common tools for cooperating in an open source project and introduces you
to ways of communicating in an international community. You’ll discover that there’s an easy way
for everyone to make their first contribution!
As an example of communications and information sharing, we will look at the LibreOffice.
LibreOffice is an open source office productivity suite that is available in more than one hundred
languages. Its end users range from the casual home user to large governments and corporations.
Likewise, there’s a wide range of contributors — not only developers, but also localizers,
documentation authors, marketing people, quality assurance engineers, infrastructure
administrators, graphics and UX designers, and many, many more.
In other words: For LibreOffice, as for many other open source projects, you can bring in your
skill and talent in the area you are comfortable with. You don’t necessarily need to be a
technically trained person or a developer — you can bring in your creativity and artistic talent or
your language skills as well. The project has also launched a website that shows the various areas
of contributions: https://whatcanidoforlibreoffice.org. So LibreOffice will nicely illustrate many
aspects of community work.

Ways to Communicate
Before looking into the details of communication tools, it is important to understand how
communication works in general, as these considerations inform the choices of tools.
Open source projects enjoy two different major ways to communicate. With synchronous
communication, people communicate at the same time. Examples include of course direct
conversations, but also video conferences or phone calls. With asynchronous communication,
people communicate at different times. Examples are email and SMS, but also a postal letter or a
telefax.
This distinction is not always easy to make, however. As one example, a messenger application on
a mobile phone like WhatsApp, Telegram, Signal, or Element technically is an asynchronous way
to communicate. If, however, both conversation partners are online at the very same time and
reply instantly, they enter a direct conversation.
This example shows that a part of communication also depends on how people use their tools and

what expectations they have. Each task might require a different set of communication tools. The
following sections will explain these ideas in detail.

Synchronous Communication
Synchronous communication is a very effective but also very demanding way to communicate. It
brings people together at the same time in the same physical or virtual space.
A direct meeting is ideal for talking things through interactively instead of sending long email
messages that come with the risk of misunderstandings. Imagine you want to learn more about an
open source project and get to know the people from the community. Email messages and
websites can help make an introduction and have a lower barrier to entry, but a truly meaningful
first impression is made when you can actually talk to someone in person — it’s these direct
interactions that usually fascinate people about an open source project and make them want to
contribute.
Apart from getting to know each other, synchronous meetings are also great to talk things through
interactively, e.g. in case of conflicts or problems, or when you have to share a negative message.
The downside is that international projects face a challenge that technology can’t overcome:
timezones. If you have contributors on different continents, it will be very hard to find suitable
meeting slots that work for everyone. Someone in Australia might just be waking up when
someone in Europe is close to calling it a day. As an additional challenge, some people can work
only at night or weekends, while others prefer office hours during business days.
Additionally, English is not a language everyone speaks fluently, and there are no widely
accessible live translation tools available yet, which brings an additional barrier.
Even so, video conferences are one of the most frequent tools of communication in open source
projects. The LibreOffice project, which serves as an example for this lesson, has regular online
meetings for its community, e.g. for developers, marketing, infrastructure, quality assurance, user
experience, and design.

Asynchronous Communication
Asynchronous communication lets you participate in the discussion at a time and speed that is
convenient for you. The most known example is probably an email message: You can reply to a
message whenever you prefer, whether it’s the next minute, the next day, or the next hour.
For asynchronous communication, the content usually is in writing, which additionally opens up
the possibility of machine translation. This helps you to read and understand messages written in
a language different from your native language, and you can even translate back your reply.

Additionally, content that is already written down makes it much easier to retain knowledge and
produce documentation. Imagine you want to write a support document about how to use a
specific feature of a software. If you explain it to a user over the phone, it will be much harder to
turn your speech into a proper documentation page than when you explain the procedure in
written text.

Internal Versus External Communication
Last but not least, communication also depends on the intended recipients, i.e. whether it is
internal or external. You will write an internal, technical note to the system administrators
differently from how you write a press release that gets sent to hundreds of journalists. Keep in
mind, however, that due to the nature of an open source project, communication that might not
be explicitly intended for a public audience will nevertheless be publicly visible, for example in
mailing list archives (in the case of LibreOffice, it’s https://listarchives.documentfoundation.org/).

Tools for Communication
With these different general aspects of communication in mind, you will learn in the following
sections about several tools for communication that are commonly used in an open source project.

Email, Mailing Lists, and Newsletters
One of the first tools you will encounter when you participate in an open source project is the
“classic” email. Many projects run mailing lists, which are essentially distribution lists for email:
With one email message, you can reach hundreds or even thousands of subscribers who are
interested in particular topics.
Mailing lists are among the oldest known tools in any open source project and are used for
coordination internal to the project as well for interacting with users. If you have a question about
the software, or want to report an error in the program, chances are high that there is a mailing
list that allows you to do that. The LibreOffice community, for example, offers a variety of
international and local mailing lists for various topics (https://www.libreoffice.org/get-help/
mailing-lists/), ranging from user support to developer discussions and infrastructure
coordination (LibreOffice mailing lists web page).

Figure 17. LibreOffice mailing lists web page

Every message sent is usually also stored in a public mailing list archive for future reference. Once
sent out, a message cannot be easily deleted. A common phrase goes, “The internet never forgets.”
Therefore it is advisable to be careful what you write, because you probably can’t take it back. For
example, some people have their private address or phone number in the signature, or send
confidential documents as attachments, which you should carefully avoid.
One disadvantage of mailing lists is that managing them in your mail program is not always
straightforward. You will want to create so-called filters based on specific elements of the
message, e.g. a prefix in the subject line. The subtleties of managing large quantities of email can
be a barrier for unexperienced users — especially if your message is a one-off. Therefore, more
and more projects migrate to discussions forums, about which you will soon learn.
A special form of mailing list is a newsletter. If you want to stay up to date about the latest project
developments and get informed about new software releases, you can subscribe to the newsletter
and get an email message when something important happens.

Discussion Forums
Apart from the overhead of managing mailing lists in your email client, another downside of
email is that more and more people, especially the younger generation, is not so much into email
communication anymore. For this and other reasons, more and more open source projects move
their communication to discussion forums. The general idea is very comparable to email: Each
forum has various categories with specific topics to engage in discussion, so-called threads.
Similar to email, on a forum you can get in touch with the open source project and coordinate
activities, make suggestions for the direction of the project, and report errors as an end user.
Everything posted to a forum is usually visible to the general public, just as in a mailing list; but
unlike there, depending on the forum’s configuration, contents can also be edited or deleted later.
The usability of forums is, especially for inexperienced users, often better than mailing lists. The
LibreOffice project began converting several of its mailing lists to forums
(https://community.documentfoundation.org/) and has since seen an increase in participation in
the discussion.

Figure 18. LibreOffice forums web page

Instant Messages and Chat Platforms
Another way to get in touch with an open source community is through instant messages and chat
platforms. With the rise of popular tools like WhatsApp, Telegram, Signal, and Matrix, nearly

everyone has already installed one of these popular applications on their devices, which makes
the entry barrier much lower. Instant messages are also much more popular with the younger
generation than email or forums. It therefore comes as no surprise that many open source
projects these days adopt them.
Participants in chats type messages that are sent to all other participants, similar to email.
Depending on the chat platform, a message can be enriched with formatting, graphics, and
attachments.
Structurally, message apps are organized similar to a forum or email. Several groups or channels
are available, so you can join discussions on topics you are interested in. Messages can usually be
edited or deleted, and often there are also announcement-only channels that have a function
similar to email newsletters.
One drawback of instant messenger apps is that people usually install them on their phones, so
they receive notifications of every message sent. This quickly can turn into information overflow
or “alert fatigue.” With proper configuration, however, these notifications can be kept under
control.
Another downside is that many messenger apps are proprietary and in the hands of one vendor.
This makes preserving knowledge for the long term more complicated, if data is not freely
accessible.

Stand-Alone, Federated, and Centralized Communications
Open source projects work in the open, based on open standards and open tools. Therefore it is
critical to understand how the various tools are designed with regard to interoperability. The
options can be split into three main categories.
A stand-alone platform runs in an isolated manner for one community. Examples are forums or
wikis, which are usually not connected with instances of other projects.
Decentralized or federated systems run individually for each community, but can connect to each
other. One example is email, because a local email server can send email to any other email server
in the world. Other examples include Nextcloud and ownCloud, which can “federate” file shares
with other servers, and the Element messenger service, with which you can communicate with
users of other servers. The same principles apply to the Mastodon social network.
Both stand-alone and distributed platforms have one huge advantage: The open source project
stays in full control over all content and functionality. All the knowledge stored in such a system
remains the property of the open source community and is not subject to third parties.

A centralized system, on the other hand, is run by one provider and does not interact with third
parties. Classical examples are social networks like Facebook or Instagram, or messenger apps
like WhatsApp or Telegram. All content is stored on the external provider’s servers and is subject
to their terms and conditions.
If you are active in an open source community, you likely get in touch using all three of these
options. Centralized systems are great for reaching out to people, as they often are popular and
have a large user base. For actual work in the project, however, a federated or stand-alone system
under the control of the community is best.

Tools for Collaboration
The distinction between tools for communication and tools for collaboration is not always
straightforward. For the purpose of this lesson, the main goal of communication tools is to enable
general communication between diverse participants, whereas the main goal of collaboration
tools is to help people work together.
Proper collaboration tools allow file storage, real-time collaboration on documents, tracking of
document versions and changes between software releases, and much more. While email or
forums can serve as general-purpose storage, specialized tools make knowledge more easily
accessible and collaboration much more effective.
In other words, these are specialized tools for specific tasks. If you want to contribute to an open
source project, you will encounter them very soon.

Wikis
One of the oldest and most popular tools for collaboration is a wiki. Made famous especially by
Wikipedia, a wiki allows users to work together on a website that is compiled of several
documents or “articles.” They can be grouped in various categories, filtered by language, and
contain formatting, spreadsheets, and images.
Wikis are often used as a knowledge base where everybody can contribute. If you want to
contribute content to an open source project, participating in their wiki is one of the most
straightforward ways. You can take existing content and translate it into your native language,
edit and update existing articles, or create new content. In the wiki of the LibreOffice project
(https://wiki.documentfoundation.org), you can find marketing material, board meeting minutes,
installation instructions, and conference planning, all in a variety of languages (LibreOffice Wiki).

Figure 19. LibreOffice Wiki

Many open source projects also host their documentation and their program’s integrated help
system in a wiki. Additionally, old versions of a page — called revisions — are archived for future
reference.
Although wikis can also store project files, there are better tools for this purpose, as you will learn
in this lesson.

Bug and Issue Trackers
Another frequently used tool in an open source project are bug trackers, also called issue trackers.
If you discover a problem in the software, or want to suggest a new feature, you might think of
just sending an email message about it. With a dedicated tool like a bug tracker, however, you can
provide all required information and steps to reproduce a problem in a structured way, which
makes it easier for developers to reproduce the issue. Such a structured report is called a bug
report.
In addition, the information is not lost and the project doesn’t forget about the issue; it can assign
it to the right person and see how many bugs are being processed or fixed.
The LibreOffice project provides a bug tracker that is open for everyone to contribute

(https://bugs.documentfoundation.org).

Figure 20. LibreOffice bug tracker

Helpdesks and Ticketing Systems
A very similar tool is a helpdesk or ticketing system. Its focus is less on reporting software
problems, but rather to help users with all kind of issues and requests, such as for the project’s
website.
The classic helpdesk is a customer service hotline. A customer calls and reports a problem, which
is turned into a ticket. The workflow of a helpdesk system usually revolves around priorities,
escalation levels, and response time.
Not all open source communities provide such a system, but many commercial companies do. For
the LibreOffice project, for instance, there is a ticketing system for infrastructure to report
problems with servers and web services.

Content Management System (CMS)
Another important tool for collaboration is a content management system (CMS). As the name
suggests, it helps to manage the content, most notably for websites. If you want to contribute to
the content or the design of a project’s website, making yourself familiar with their CMS is the way
to go.
CMS systems, similar to wikis, help to structure content in categories and languages. They often
provide a WYSIWYG (“what you see is what you get”) editor and embed everything in a proper
template: Titles, headings, page layout, and menu entries are done automatically, so you can focus
fully on the content. Additionally, in case of a page redesign, the content will not disappear, but
will be adapted to the new template.

Document Management System (DMS)
A document management system is not to be confused with a content management system. While
a CMS is designed to show content in a predefined template, like for presenting a website, a DMS
is used for the management of documents such as contracts, invoices, receipts, email messages,
and all other sorts of correspondence.
Another difference is that a CMS is often used for public presentation, while a DMS is mostly used
to manage internal documents that are not intended for the general public.
As a contributor to an open source project, you are less likely to encounter the document
management system, as that is often reserved for specific roles such aas accounting or legal.

Source Code Management (SCM)
If you are a developer in an open source project, one of the key tools you will soon run into is the
source code management platform. Comparable to a wiki for documentation authors, SCMs are
used by software developers to work together on the code.
Historical SCMs include CVS and Subversion, but nowadays Git is mostly used including by the
LibreOffice community (https://git.libreoffice.org/). These tools are available on the command line,
but there are also graphical interfaces available to make interaction easier, especially for
beginners.
Source code management platforms track different versions of each file, handle changes and edits
to the code, record who made which change, and ideally give a full history of the software’s
development.
Developers can “check out” a specific state of the software, locally work on it, e.g. by fixing a bug
or implementing a new feature, and then request that this change be added to the main
development line of the software by means of a so-called merge request, also known as a pull
request. Accepting the merge or pull request “merges” the changes done by one author with the
main code.
There are centralized platforms (GitHub and GitLab) that integrate SCM with wikis, issue tracking,
and other collaborative tools.
Source code management platforms are not strictly limited to program code. As one example, this
very lesson was worked on collaboratively in a Git repository!

Documentation
Key to the success of every open source project is proper documentation, ideally in several
languages. The LibreOffice project provides up-to-date books, guidelines, and reference cards
(https://documentation.libreoffice.org) for its software, as well as individual help pages on specific
functions (https://help.libreoffice.org).
In general, there are different kinds of documentation, which we’ll discuss in the following
sections.

User Documentation
Best known is the documentation for end users, which explains how to use the software. If you
don’t know about a feature or function in the program, the documentation — which can range
from individual help pages to a complete book — is your first point of reference.
The documentation website, where the use of the software is explained, is often one of the most
frequented websites next to the product website, which presents an overview of the software and
its community.

Administrator Documentation
For use in larger environments, like deployments in a company, administrator documentation
provides all relevant information for deploying the software on a larger scale. This includes
connecting to user databases and file storage, centralized configuration management, and
handling updates.

Developer and Architecture Documentation
Another category of documentation targets developers and is called developer documentation or
architecture documentation. If you are a developer and want to contribute to the code of a
program, this documentation tells you about the software architecture, the coding standards, and
the tools and workflows used to work on the software.
The LibreOffice project has published a developers guide in its wiki to help interested developers
join the community (https://wiki.documentfoundation.org/Documentation/DevGuide).

## 1. Why do open source projects in particular have to take care of proper tools for communication
and collaboration?

2. Name one example each for synchronous and asynchronous communication.

3. What is a disadvantage of messenger apps and how can this be avoided?

4. Name two functions of a wiki.

5. What is the difference between a bug tracker and a helpdesk system?

6. What is the difference between a content management and a document management system?

7. What is the advantage of stand-alone or federated systems over centralized systems?

1. What is one of the main differences between a local sports club and an international open

2. Why can contributing to an open source project be particularly rewarding?

3. Which bug tracking software does the Ubuntu project use?

4. What is the name of the website for the Linux kernel mailing lists?

In this lesson, you’ve learned about a variety of tools used for communicating and collaborating in
an open source project. You’ve heard the difference between synchronous and asynchronous
communication and between decentralized, centralized, and stand-alone tools. You also learned
why specific tools can be helpful for specific tasks to make contributing to an open source project
fun and rewarding.

## 1. Why do open source projects in particular have to take care of proper tools for communication
and collaboration?
On one hand, working together in a worldwide distributed group has its set of challenges,
which proper tools can help to address. On the other hand, volunteers might not stay
indefinitely, so retaining and sharing knowledge is another important aspect in the use of
communication and collaboration tools. Making contributions easy helps the sustainability of a
project.
2. Name one example each for synchronous and asynchronous communication.
Synchronous communication could be a direct conversation, a phone call, or a video
conference. Examples of asynchronous communication include email, SMS, postal letters, and
faxes.
3. What is a disadvantage of messenger apps and how can this be avoided?
When installed on the phone, you might receive many notifications, one for each new message.
Proper configuration can help avoid this. Another disadvantage is that many messenger apps
are run by proprietary vendors.
4. Name two functions of a wiki.
Collaborative editing and translation of articles.
5. What is the difference between a bug tracker and a helpdesk system?
A bug tracker is a specialized software tool to report bugs or request features in software. A
helpdesk system focuses on supporting inquiries and managing all kind of issues and requests,
e.g. on the website.
6. What is the difference between a content management and a document management system?
A CMS is used for presenting content in a specific way or template, mostly publicly. A DMS is
used to store existing correspondence, mostly internally.
7. What is the advantage of stand-alone or federated systems over centralized systems?
A centralized system is under the control of one external provider. All content is stored on the
external provider’s servers and subject to their terms and conditions.
