---
id: lpi-701-200-02
title: "LPIC-1 · 701-200 — What is the primary structural unit in object storage, and how…"
slug: lpi-701-200-02-lpic-1-701-200-what-is-the-primary-structural-unit-in-object
source: "LPI Learning Material — LPIC-1 (Exam 701-200)"
sourceSection: "1. What is the primary structural unit in object storage, and how does it differ from traditional, 2. When should a developer choose a NoSQL database like MongoDB over a relational database, 3. What role do content delivery networks (CDNs) play in improving web application, 1. Research and compare t"
track: linux-engineer
tier: free
tags: [linux, lpic-1, certification, software-development]
summary: "This lesson introduced essential components of modern cloud-native and service-based Covers 46 sections: What is the primary structural unit in object storage, and how does it differ from traditional, When should a developer ."
---
# LPIC-1 · 701-200 — What is the primary structural unit in object storage, and how…

## 2. When should a developer choose a NoSQL database like MongoDB over a relational database
like PostgreSQL?

## 3. What role do content delivery networks (CDNs) play in improving web application
performance, and how do they achieve this?

## 1. Research and compare two major CDN providers. What differentiates Cloudflare from Amazon
CloudFront in terms of features or integration options?

## 2. Investigate how a popular FaaS platform (such as AWS Lambda or Google Cloud Functions)
handles function versioning and deployment. How can teams manage changes safely in a

This lesson introduced essential components of modern cloud-native and service-based
architectures, covering a range of foundational technologies that support scalable, distributed,
and resilient applications. It began with the concepts behind object storage, highlighting how data
is organized into buckets and accessed via unique URLs, often using services such as Amazon S3. It
then explored data persistence through relational and NoSQL databases, including MySQL,
PostgreSQL, MongoDB, Redis, and InfluxDB, explaining how different database types serve distinct
performance and flexibility needs. The lesson also examined message brokers and queues such as
Kafka and MQTT, as tools to decouple services and support asynchronous workflows.
Moving into cloud computing models, the lesson explained the characteristics and use cases of
IaaS, PaaS, SaaS, and FaaS. It emphasized the automation, scalability, and operational benefits
each model provides across the software delivery lifecycle. Finally, it explored the role of content
delivery networks (CDNs) in enhancing performance and availability for end users by distributing
content geographically.

## 1. What is the primary structural unit in object storage, and how does it differ from traditional
file or block storage?
In object storage, the primary structural unit is the object. Each object contains the data itself,
associated metadata, and a unique identifier. This differs from traditional file storage, which
organizes data hierarchically in files and folders, and block storage, which divides data into
fixed-size blocks managed by a file system. Object storage provides better scalability and is
optimized for unstructured data such as images, videos, and logs.
2. When should a developer choose a NoSQL database like MongoDB over a relational database
like PostgreSQL?
A developer should consider using a NoSQL database like MongoDB when the application deals
with semi-structured or unstructured data, requires dynamic schemas, or needs to scale
horizontally across distributed systems. MongoDB is well-suited for use cases like content
management, user profiles, and applications whose data models evolve frequently. In contrast,
relational databases like PostgreSQL are preferred when strong consistency, complex queries,
and strict data integrity are required.
3. What role do content delivery networks (CDNs) play in improving web application
performance, and how do they achieve this?
Content delivery networks (CDNs) improve web application performance by caching static and
dynamic content closer to end users through a geographically distributed network of edge
servers. This reduces latency, offloads traffic from the origin server, and accelerates load times.
CDNs achieve this by serving content from the edge location nearest the user, and by
automatically refreshing cached assets when updates occur, thereby improving both speed and
availability across global user bases.

## 1. Research and compare two major CDN providers. What differentiates Cloudflare from Amazon
CloudFront in terms of features or integration options?
Cloudflare and Amazon CloudFront are both leading CDN providers, but they cater to slightly
different needs. Cloudflare offers a globally distributed network with built-in DDoS protection,
DNS name resolution, a web application firewall (WAF), and performance optimization. It
emphasizes ease of use and provides generous free-tier services. Amazon CloudFront, tightly
integrated with AWS services, offers deep customization for content delivery, advanced access
control via signed URLs, and real-time log streaming.
While Cloudflare focuses on simplicity and security across multiple platforms, CloudFront
excels in AWS-native deployments where tight integration with services like S3, Lambda@Edge,
and IAM is a priority.
2. Investigate how a popular FaaS platform (such as AWS Lambda or Google Cloud Functions)
handles function versioning and deployment. How can teams manage changes safely in a
In AWS Lambda, function versioning allows teams to publish immutable versions of their
functions, each identified by a version number. Once published, a version cannot be changed,
which ensures stability in production environments. Lambda also supports aliases, which act
as pointers to specific versions and can be used to route traffic. For example, teams can
implement traffic splitting, such as routing 90% of traffic to version 2 and 10% to version 3
during a phased deployment. This supports canary releases (testing a new feature on a small
number of production systems) and minimizes the risk of introducing bugs. Similar
mechanisms exist in Google Cloud Functions, which use revisions and traffic splitting. These
tools help DevOps teams deploy updates safely while allowing instant rollbacks if issues occur.

DevOps Tools Engineer v2.0, Exam 701, Objective 701.3
- Understand Git concepts and repository structure
- Manage files within a Git repository
- Manage branches and tags
- Work with remote repositories and branches as well as submodules
- Merge files and branches
- Awareness of SVN and CVS, including concepts of centralized and distributed SCM solutions
- git
- .gitignore

In modern software development, version control is essential for managing source code, tracking
changes, and enabling collaboration across teams. A version control system (VCS) allows
developers to record the history of a project, revert to previous states, and coordinate parallel
work through branching and merging. This forms the foundation for continuous integration (CI),
automated testing, and the collaborative coding workflows that are central to DevOps and Agile
methodologies. This lesson covers using Git to manage and share source code.

Concepts of Software Configuration Management (SCM)
Version control is a core component of a broader discipline known as software configuration
management (SCM). SCM encompasses the processes and tools used to manage changes in
software artifacts, including source code, documentation, configuration files, and dependencies.
Its goals include maintaining consistency, traceability, and reproducibility throughout the
software lifecycle. SCM helps prevent conflicts, track contributions, and ensure that changes are
properly reviewed and integrated.
There are two primary types of version control systems: centralized and distributed. Centralized

systems, such as Subversion (SVN) and the older Concurrent Versions System (CVS), rely on a single,
central server that hosts the authoritative version of the codebase.
A distributed version control system (DVCS) such as Git allows every developer to clone the full
repository, including its entire history, onto their local machine. Changes can be committed,
branched, and merged locally without immediate network access. This enables powerful offline
workflows, faster operations, and better support for parallel development.

Git’s Contribution to Version Control
Git was created in 2005 by Linus Torvalds, the creator of the Linux kernel, in response to the need
for a fast, secure, and distributed version control system that was open source and could handle
the complex and highly collaborative nature of Linux kernel development.
Git was designed with performance, data integrity, and strong support for non-linear
development in mind. Its decentralized model, cryptographic tracking of changes, and efficient
branching and merging mechanisms quickly made it the tool of choice not only for the Linux
community but for software projects of all sizes around the world. Today, Git is the backbone of
modern collaborative development platforms such as GitHub, GitLab, and Bitbucket.
One of Git’s most significant advantages is its ability to manage lightweight branches, making it
easy to experiment, isolate features, or apply fixes without disrupting the main development line.
Its integrity model — based on SHA-1 hashes — ensures that all changes are cryptographically
tracked, making it extremely reliable.

How Git Works: Remote Repository, Local Repository, and
Staging Area
To understand how Git functions, it is important to grasp the relationship between three file
collections: the remote repository, the local repository, and the staging area.

Remote Repository
The remote repository is typically hosted on a platform such as GitHub, GitLab, Bitbucket, or an
organisation’s own Git remote repository. It acts as the central reference point for all contributors
and contains the shared version of the codebase on which the team collaborates. Developers can
push changes to the remote repository or pull updates made by others.

Local Repository
Once cloned, the project exists as a local repository on the developer’s computer. This local
repository contains:
Working directory
Where files can be edited, created, or deleted.
.git directory
Hidden in the project root, this stores all the repository’s history and metadata.
Staging area (index)
An intermediate space where changes are prepared before being committed.
Developers can work entirely offline in a local repository, performing commits, checking logs,
creating branches, and resolving conflicts. Local commits remain invisible to others until they are
pushed to the remote repository.

Staging Area (Index)
The staging area (or index) is a fundamental concept in Git. It serves as an intermediate space
where changes are collected and reviewed before being committed to the repository. This
mechanism provides precise control over what is included in each commit, enabling work to be
organized into smaller, logical units and allowing temporary or experimental edits to be left out.
Before creating a commit, changes must be staged — that is, explicitly added to the staging area.
This process makes it possible to select specific files or even individual lines for inclusion,
ensuring that each commit represents a coherent and meaningful step in the project’s history.
As an example of staging and committing, suppose that a developer modifies a file:
$ echo "New feature" >> app.py

Git sees this as a modified file but doesn’t track it for the next commit yet. The state of the changed
file can be shown by asking for the local repository’s status:
No commits yet

Untracked files:
(use "git add <file>..." to include in what will be committed)
app.py
nothing added to commit but untracked files present (use "git add" to track)

To stage the change, enter:

Now the file app.py is in the staging area. Git is tracking this version and will include it in the
next commit. The Git status shows files ready for next commit:
No commits yet
Changes to be committed:
(use "git rm --cached <file>..." to unstage)
new file:

app.py

A commit saves staged changes to the user’s local repository with a message that describes what
the commit is about. To save the staged changes to the local repository, enter a commit command:
$ git commit -m "Add new feature to app.py"

This creates a new snapshot in the local repository.
The -m option in the git commit command stands for “message”. It allows the user to provide a
commit message directly from the command line, avoiding the need to open a text editor.
If a file was accidentally left out of a commit, the command git commit --amend can be used to
modify the most recent commit. This option is helpful for adding forgotten changes or updating
the previous commit message, keeping the commit history clean and accurate.
Common use cases for the --amend option include:
- A file was forgotten before committing.
- The commit message contains a typo or needs clarification.

- The contents of the most recent commit need adjustment without creating a new one. For
example, after making a commit, suppose it becomes apparent that the file
forgotten_file.txt was not included. To correct this, execute the following commands:
$ git add forgotten_file.txt
$ git commit --amend

To share the commit with the team, push it to the remote repository:
$ git push origin main

This command uploads the user’s local commits to the remote repository’s main branch.
Likewise, when teammates have pushed new updates to the remote repository, those changes can
be integrated into the local copy by executing:

This retrieves the latest commits and merges them into the developer’s working branch.
Workflow for a Git commit shows the typical steps for using the staging area and committing a
change to the remote repository.

Figure 1. Workflow for a Git commit

The full Git workflow typically follows these steps:

## 1. Clone a remote repository once:
$ git clone <url>

## 2. Edit files in the working directory, e.g.
$ echo "New line" >> README.md

## 3. Stage changes:
$ git add .

## 4. Commit staged changes:
$ git commit

## 5. Push local commits to the remote repository:
$ git push

## 6. Pull updates from the remote repository:
$ git pull

Another command, git init, initiates a new repository locally. This option is explained later.

Git Structure and Internal Storage
At its core, Git is a content tracker. Unlike traditional version control systems that store differences
(or deltas) between file versions, Git captures and stores snapshots of the entire project state over
time.
When the developer commits a change, Git records a snapshot of the current contents of all
tracked files and saves a reference to that snapshot. If a file hasn’t changed, Git doesn’t duplicate
it; instead, it points to the previous identical version. This model makes Git fast, efficient, and
reliable, especially when managing large repositories.

All of Git’s internal information is stored inside a hidden directory called .git, located at the root
of every local repository. This directory contains all the metadata, object data, configuration
settings, logs, and references required to manage the repository. Its contents look like:
.git/
├── HEAD
├── config
├── description
├── hooks/
├── info/

└── exclude

├── objects/

├── pack/

└── info/

├── refs/

├── heads/

└── tags/

└── index

Inside .git, several subdirectories and files serve specific purposes:
objects
contains all the data stored by Git: blobs (binary large objects), commits, and trees, each
identified by an SHA-1 hash.
- Blobs are compressed snapshots of every file version that has been committed.
- Trees are Git’s version of directories: they map filenames to blob hashes and contain
permissions metadata. Each commit points to a tree.
- Commits are metadata packages containing author information, commit messages, and
pointers to parent commits.
refs
holds pointers to commit objects, including branches and tags.
HEAD
acts like a compass needle, always pointing to the current position where the developer is
working.
config
holds repository-specific configuration settings such as the configured remotes (such as GitHub
URLs), branch tracking relationships, and custom user settings that override global Git configs.

index
a binary file, is Git’s staging area: a temporary loading dock where changes wait before being
committed. When git add is issued to add files, Git updates the index with its current state.
hooks
is Git’s automation toolkit. The directory contains templates for pre-commit scripts that run
before a commit and post-receive scripts that are triggered after pushes.
info
contains repository-specific configurations that include attributes for path-specific Git
behaviors.
logs
is Git’s “black box” recorder. It maintains reference histories (HEAD and branches) enabling
commands like git reflog to recover lost commits.

Cloning a Git Repository
In Git, cloning creates a full copy of an existing repository, including all files, branches, commit
history, and metadata. This is the most common way for developers to begin working on a project
that already exists on a remote server, such as GitHub, GitLab, or a self-hosted Git server. Once the
remote repository is cloned, the developer has a fully functional local repository, which includes
both a working directory and the full version history stored inside the .git folder.
When a repository is cloned, Git downloads all of the project’s content and its complete history
from the remote location. By default, Git also sets up a connection to the original source as a
remote named origin, so the developer can easily fetch updates, push commits, and collaborate
with others.
Here’s an example of cloning a public repository:
$ git clone https://git.example.com/examples/project.git my-local-copy

This command performs the following steps:
1. Creates a new directory called my-local-copy.
2. Initializes a .git directory inside it.
3. Downloads all objects and refs (branches, tags).
4. Checks out the latest commit from the default branch (typically main or master).

After cloning, a developer can immediately begin working with the files, create branches, make
commits, or push changes (if the developer has write access).

Working With Remotes After Cloning
When a repository is cloned, Git automatically creates a reference to the remote repository under
the default name origin.
This alias acts as a shortcut for the remote URL, simplifying commands that interact with the
original repository.
$ *git remote -v

https://git.example.com/examples/project.git (fetch)

https://git.example.com/examples/project.git (push)

To display detailed information about a specific remote repository, including its fetch and push
URLs, tracking branches, and synchronization status, use the following command:
$ git remote show origin
- remote origin
Fetch URL: https://git.example.com/examples/project.git
Push

URL: https://git.example.com/examples/project.git

HEAD branch: main

To fetch the latest changes from the remote (without merging):

The git fetch origin command retrieves updates from the remote repository, identified by the
alias origin, and downloads them into the local repository. Unlike git pull, this operation does
not automatically merge or alter the working directory.
Instead, it updates the local references to the remote branches, enabling the user to inspect
incoming commits, compare differences, and decide when or how to integrate those changes into
the local branch.
To download the most recent commits from the remote repository and merge them into the
current branch, execute the following command:

To upload the local commits to the remote repository, use the following command:
$ git push origin main

Initializing a Local Git Repository and Connecting to a Remote
Although many developers begin by cloning an existing project, it is equally common to start
entirely from scratch — particularly when creating a new application, script, or configuration
repository.
In such scenarios, Git provides the git init command, which converts any local directory into a
Git-enabled project.
Once the repository is initialized, changes can be tracked locally, commits can be created, and the
project can later be connected to a remote repository (for example, on GitHub or GitLab) to enable
collaboration, version synchronization, and offsite backups.

Step 1: Initialize a Local Repository
To create a new local repository, first navigate to the desired project directory or create a new
folder for it:
$ mkdir my-project
$ cd my-project
$ git init

This initializes, within the myproject directory, a hidden folder named .git, which stores all of
Git’s internal data, including commit history, configuration files, and branch information.
At this stage, the project becomes a fully functional local Git repository, even though it is not yet
linked to any remote server.
Files can now be tracked and managed using commands such as:
$ echo "# My Project" > README.md
$ git add README.md
$ git commit -m "Initial commit with README"

At this stage, Git is tracking the file README.md locally. Commits can be created, branches
managed, and the full project history reviewed — all entirely offline. A network connection is only
required when synchronizing with a remote repository or collaborating with others.

Step 2: Create a Remote Repository
Once the local repository is configured, the next step is to connect it to a remote repository to
enable collaboration, centralized backups, and code sharing.
On GitHub, a new remote repository can be created as follows:
1. Navigate to https://github.com and sign in to an existing account or create a new one.
2. Click New repository.
3. Provide a name for the repository, such as my-project.
## 4. Leave the options to initialize with a README, license, or .gitignore file unchecked, since
those files already exist locally.
5. Click Create repository.
After creation, GitHub will display a remote repository URL similar to:
https://github.com/<your-username>/my-project.git

Step 3: Connect the Local Repository to the Remote
In the terminal, link the local repository to the remote repository by executing:
$ git remote add origin https://github.com/<your-username>/my-project.git

This command configures the remote named origin to reference the GitHub repository.
To upload the local commits to the remote repository, execute:
$ git push -u origin main

The -u option establishes an upstream tracking relationship between the local branch and its
corresponding remote branch.
Once this link is configured, subsequent operations can be simplified — future updates can be

synchronized using only the commands:

Managing Files Within a Git Repository
Some of the most common and essential operations in Git involve file management: adding new
files, tracking modifications, renaming files, and removing files. Git provides a concise yet
powerful set of commands that make it possible to maintain a clean, organized, and traceable
project history. Understanding how these commands interact with the working directory, staging
area, and repository history is key to effective version control.

Adding New Files
To begin tracking a new file, create it in the working directory and add it to the staging area using
the git add command. Example:
$ echo "# Project Title" > README.md
$ git add README.md
$ git commit -m "Add project README"

This creates a new file README.md, stages it, and commits it to the local repository. The file is now
tracked, and its history will be preserved by Git.

Modifying Tracked Files
When a file already tracked by Git is modified, the system automatically detects the change.
However, the modification must be explicitly staged before the next commit:
1. Append a new line to README.md:
$ echo "More details about the project." >> README.md

This adds a single line at the end of README.md.
2. Inspect the working tree:
Changes not staged for commit:
modified:

README.md

The git status command displays the current state of the working directory and staging
area, indicating which files have been modified, which are staged for commit, and which
remain untracked.
Running git status before committing is a best practice, helping to ensure that all intended
changes are included and preventing accidental omissions or incomplete commits.
3. Review unstaged changes:
$ git diff
diff --git a/README.md b/README.md
index fed3d1c..3fc20df 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
+More details about the project.

This shows differences between the working directory and the last commit (only unstaged
edits).
4. Stage the file:
$ git add README.md

Moves README.md from modified to staged.
5. Review staged changes:
$ git diff --cached
diff --git a/README.md b/README.md
index fed3d1c..3fc20df 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
+More details about the project.

This shows what is staged and will be included in the next commit. The git diff command
shows working directory vs. last commit (unstaged changes). The git diff --cached (or
--staged) command shows staging area vs. last commit (what will be committed).

## 6. Commit the staged changes:
$ git commit -m "Update README with project details"

Creates a new commit containing the staged modifications.

Deleting Files
To remove a file from both the working directory and the repository, use git rm:
$ git rm obsolete.txt
$ git commit -m "Remove obsolete file"

Renaming or Moving Files
Git can detect when a file has been renamed or moved, especially when using git mv, which
stages the operation automatically:
$ git mv old_name.py new_name.py
$ git commit -m "Rename script from old_name.py to new_name.py"

Alternatively, a file can be renamed manually using standard system commands, followed by
updating Git’s tracking information with git add and git rm.
This approach explicitly removes the old file reference and stages the new one:
$ mv old_name.py new_name.py
$ git add new_name.py
$ git rm old_name.py
$ git commit -m "Manual rename of Python script"

Stopping the Tracking of a File
To stop tracking a file while keeping it in the working directory, use the git rm command with
the --cached option.
This removes the file from version control without deleting it from the local filesystem:
$ git rm --cached secrets.txt

$ echo "secrets.txt" >> .gitignore
$ git commit -am "Stop tracking secrets.txt and add to .gitignore"

This is especially useful to stop tracking files that shouldn’t be versioned, such as sensitive
configuration files or generated artifacts.

Viewing the Commit History
The git log command displays the commit history of the current branch. Each entry in the log
includes the commit hash, the author, the timestamp, and the commit message, providing detailed
context for each change. Basic usage is:
$ git log
commit a1b2c3d4e5f6...
Author: Jane Developer <jane@example.com>
Date:

Tue Mar 26 10:15:00 2024 -0300

Fix login bug and update error message

This shows the full commit history in reverse chronological order (most recent commits first).
The commit line in the log output contains the full SHA-1 hash that uniquely identifies each
commit.
Because this hash is a long 40-character hexadecimal string, using it directly in commands can be
inconvenient.
To simplify this, Git automatically displays and accepts shortened versions of the SHA-1 hash, as
long as they remain unique within the repository.
These abbreviated identifiers can be used safely in most commands, such as git show, git
checkout, or git revert, making navigation and reference to specific commits faster and more
practical.

Reverting File Changes
The git restore command is designed to discard changes in the working directory or recover
previous versions of files from the repository history.
It is particularly useful for reverting unintended modifications before they are staged or
committed, allowing the working directory to return to a clean and consistent state.

Discarding Unstaged Changes
If modifications have been made to a file but not yet staged, the file can be reverted to its last
committed state using:
$ git restore filename.txt

This will undo local modifications and revert the file to its last committed version.
Restoring a File from Another Branch or Commit
A file can also be restored from a specific commit or branch, allowing recovery of an earlier
version or comparison between revisions.
$ git restore --source=my-branch README.md

This command copies the version of README.md from the branch my-branch into the current
working directory without changing the active branch. It is a safe way to retrieve or compare
specific files from another branch without altering the current workspace.
Unstaging a File
Unstaging a file removes it from the staging area while preserving its modifications in the
working directory.
This action effectively tells Git not to include the file in the next commit, without discarding any
local changes.
The equivalent command is:
$ git restore --staged filename.txt

The .gitignore File: Purpose and Syntax
In every Git project, developers often have files that should not be tracked by version control,
such as temporary build files, editor backups, OS-generated artifacts, or sensitive credentials. The
.gitignore file provides a mechanism to explicitly tell Git which files or directories to exclude
from tracking.
The .gitignore file defines which files and directories Git should ignore when tracking changes.

It is typically placed in the root of the repository but can also exist in subdirectories to apply
localized ignore rules.
Each line in the file represents a pattern that matches specific files or folders to exclude from
version control.
*.log

build/

*.env

!important.env # Do not ignore this specific file

Git evaluates these rules in the order they appear, and it supports globbing patterns such as:
*
wildcard matching
?
single-character matching
**/
matching directories recursively
As shown in the previous example, ! negates a pattern to explicitly include something that was
previously ignored.
It is important to note that .gitignore affects only untracked files. If a file is already being
tracked by Git, adding it to .gitignore will not stop Git from continuing to track it.
To remove a tracked file that should be ignored now, it must first be removed from the index:
$ git rm --cached another-file.txt

Then Git will respect the .gitignore rule for future changes.

## 1. Create a new Git repository called demo-repo, add a hello.txt file, and commit it with the
message Initial commit with hello.txt.

2. You created a readme.md file but haven’t staged it yet. Use Git to check the current status.

3. Display a list of commits in the current branch.

## 4. You made a change to hello.txt but want to discard the change before staging. What
command do you enter to accomplish that?

5. Connect your local repository to a remote GitHub repository and push your commits.

## 6. What kind of information does the git status command display?

## 1. Research how to sign Git commits using GPG or SSH keys. Enable commit signing in your local
Git configuration and make a signed commit.

## 2. Choose a programming language or framework you use (e.g., Python, Node.js, Java) and
research what should typically go into a .gitignore file for that environment.

Git is a powerful, distributed version control system that enables developers and DevOps
professionals to track changes, collaborate effectively, and manage source code across multiple
environments. Unlike centralized systems, Git allows every user to maintain a full copy of the
project history, enabling offline work, rapid branching, and seamless merging. It supports
workflows ranging from solo development to large-scale enterprise collaboration and integrates
smoothly with modern tools like GitHub and GitLab. With features such as a staging area, commit
history, and branching strategies, Git provides the foundation for reliable, scalable, and auditable
software delivery.
This lesson offered the basic commands for working locally and with other developers, along with
the concepts behind the commands and workflows.

## 1. Create a new Git repository called demo-repo, add a hello.txt file, and commit it with the
message Initial commit with hello.txt.
$ mkdir demo-repo
$ cd demo-repo
$ git init
$ echo 'Hello, Git!' > hello.txt
$ git add hello.txt
$ git commit -m 'Initial commit with hello.txt'

2. You created a readme.md file but haven’t staged it yet. Use Git to check the current status.
Untracked files:
(use "git add <file>..." to include in what will be committed)
readme.md

## 3. Display a list of commits in the current branch.
$ git log
commit 3c20fe7c615fbedb22931b2e61296d306593b510 (HEAD -> main)
Author: Jane Developer <jane@example.com>
Date:

Thu Mar 27 19:53:33 2025 -0300

Initial commit with hello.txt

## 4. You made a change to hello.txt but want to discard the change before staging. What
command do you enter to accomplish that?
$ git restore hello.txt

5. Connect your local repository to a remote GitHub repository and push your commits.
$ git remote add origin https://github.com/<your-username>/demo-repo.git
$ git branch -M main

$ git push -u origin main

## 6. What kind of information does the git status command display?
The git status command displays the current state of the working directory and the staging
area. It shows which files have been modified but not yet staged for commit, which files are
staged and will be included in the next commit, and any untracked files that are not yet under
version control. It does not show unchanged files or locked files, as Git does not use a locking
mechanism by default.

## 1. Research how to sign Git commits using GPG or SSH keys. Enable commit signing in your local
Git configuration and make a signed commit.
To sign Git commits using GPG, first generate a GPG key:
$ gpg --full-generate-key

After generating the key, list it:
$ gpg --list-secret-keys --keyid-format=long

Configure Git to use it:
$ git config --global user.signingkey <YOUR_KEY_ID>
$ git config --global commit.gpgsign true

You can now sign commits with:
$ git commit -S -m "My signed commit"

## 2. Choose a programming language or framework you use (e.g., Python, Node.js, Java) and
research what should typically go into a .gitignore file for that environment.
A typical .gitignore file for a Node.js project includes:
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pids
*.pid
*.seed

.env
dist/
build/
.vscode/
.idea/

In Git, branches provide a flexible way to work on multiple tasks in parallel without interfering
with the main codebase, while tags are useful for identifying stable points in a project’s history,
such as release versions. Together, branches and tags are critical for implementing feature
development workflows, managing software releases, and maintaining a clean and traceable
commit history.
Understanding how to create, switch, merge, and delete branches — as well as how to tag and
share important releases — is a foundational skill for any Git user involved in collaborative or
production-grade development.

Tags: Marking Specific Versions
Like many version control systems, Git provides the ability to tag specific commits to identify
significant points in a project’s history. This feature is most commonly used to mark release
versions — such as v1.0, v2.0, etc. — and other milestones. Tags are immutable: they remain
attached to the commit they were assigned to and do not move as new commits are added.

Creating a Tag
Git provides support for two types of tags: lightweight and annotated. A lightweight tag acts as a
simple reference to a specific commit. It contains no additional metadata and is typically used for
temporary or local tagging purposes.
In contrast, an annotated tag includes the tagger’s name and email address, the current date, a
message, and optionally, a cryptographic signature using GNU Privacy Guard (GPG). Annotated
tags are also checksummed and are the preferred format for marking official release points or
significant milestones in the project.
A tag must be created after a git commit to tag this commit with a specific mark version.
An example follows of creating a lightweight tag. First create a new commit:
$ git add .
$ git commit -m "Final version 1.0"

Now create a tag for this commit:
$ git tag v1.0

To create an annotated tag (recommended for releases), use the -a option:
$ git tag -a v1.0.1 -m "First stable release"

This creates a tag with metadata such as the author, date, and message.
To view tag details, enter:
$ git show v1.0.1
tag v1.0.1
Tagger: Jane Developer <jane@example.com>
Date:

Wed Aug 6 20:07:14 2025 -0700

First stable release
...

Listing Tags
To view all tags in the repository, enter git tag, optionally using the -l or --list option for
more control over the output:
$ git tag
v1.0
v2.0

By default, this command displays all tags in alphabetical order, although the sequence has no
functional significance.
To filter tags by a specific pattern, use wildcards. For example, if the Git source repository
contains hundreds of tags, but you are interested only in those from the v2.1 release series, run
the following command to narrow the results:
$ git tag -l "v2.1*"
v2.1
v2.1-rc0
v2.1.1

Pushing Tags to a Remote Repository
By default, the git push command does not automatically transfer tags to a remote repository.
To share tags with others, the developer must explicitly push them after creating them.
Use git push origin <tagname> to upload a specific tag to the remote server.
$ git push origin v1.0.0

To push all tags from the local repository to the remote one, enter:
$ git push origin --tags

Deleting a Tag
To remove a tag from the local repository, use the command git tag -d <tagname>. For
example, to delete the lightweight tag created earlier locally, run:

$ git tag -d v1.0

To delete a tag from the remote repository, enter:
$ git push origin --delete v1.0.0

Branches: Working in Parallel
A branch in Git represents an independent line of development. Branching allows developers to
diverge from the main line of development and work independently without affecting the
primary codebase.
In many traditional version control systems, creating a branch can be resource-intensive. It often
involves the duplication of the entire source code directory, which may be time-consuming and
inefficient, especially for large projects.
Git’s approach to branching is exceptionally lightweight and efficient, allowing branch creation
and switching to happen almost instantly. Git is designed to encourage frequent branching and
merging, even multiple times within the same day.
By default, every Git repository starts with a branch called main (or master in older repositories).
Creating a new branch allows a developer to isolate some work, such as developing a feature or
fixing a bug, without affecting the main codebase.

Creating a New Branch
Creating a new branch in Git means essentially creating a new pointer to a specific commit in the
repository’s history. For example, to create a branch named feature-login, use the following
command:
$ git branch feature-login

This creates a branch named feature-login, but does not switch to it.
To see the available branches, enter:
$ git branch
feature-login

- main

The * symbol indicates which branch is currently checked out.
To both create and switch at once, enter:
$ git checkout -b feature-login

The -b option tells Git to create a new branch with the given name and switch to that branch.
Alternatively, starting from Git 2.23, the git switch command offers a clearer and more userfriendly way to create and switch branches.
Instead of using git checkout -b, the following command can be used:
$ git switch -c feature-login

The -c option stands for “create,” indicating that a new branch should be created and checked out
immediately.
Alternatively, the full form --create can be used for better readability and clarity in scripts or
documentation.

Switching to an Existing Branch
To switch to an existing branch, use the git checkout or git switch command followed by the
branch name. For example, to switch to the testing branch, run:
$ git checkout testing

Or use git switch:
$ git switch testing

Return to your previously checked out branch by entering:
$ git switch -

Deleting an Existing Branch
To delete a branch feature-login that is no longer needed, enter:
$ git branch -d feature-login

If an attempt is made to delete a branch that has not yet been merged, Git displays an error
message indicating that the branch is not fully merged. This safeguard prevents accidental loss of
unmerged work.
To override this protection and force the deletion, use the uppercase -D option:
$ git branch -D feature-login

Setting Upstream Tracking for Remote Branches
Branches can also track remote counterparts:
$ git push -u origin feature-login

This remembers the upstream repository so that future pushes and pulls can be done simply with
git push and git pull.

Merging Branches
Suppose you have switched to the branch called testing to develop a feature or fix a bug. After
making the necessary changes, you stage and commit them on this branch using git add and git
commit:
$ git switch testing
$ echo 'some changes' >> readme.md
$ git add .
$ git commit -m 'changes made on testing branch'

Once you determine that the changes made in the testing branch are ready, you can merge them
back into the main branch after the work is complete:

$ git merge testing

Merge Conflicts
Sometimes, the merge process doesn’t proceed seamlessly. If two branches have made different
changes to the same lines in the same file, Git will be unable to merge them automatically. In such
cases, a merge conflict occurs. Merge conflicts are a normal part of collaborative development and
are not errors in themselves — they simply indicate that multiple people (or branches) have made
changes to the same code, and Git needs help deciding how to combine them.
Conflicts commonly occur when:
- Two branches modify the same line in a file differently.
- A file is deleted in one branch but modified in another.
- A file is renamed or moved differently in both branches.
As an example, create a new repository and add the initial file:
$ mkdir git-conflict-demo && cd git-conflict-demo
$ git init

Consider a repository where the main branch contains a file named app.py.
This file represents the base version of the project before any new feature or modification is
introduced.
print("Hello, world!")

Commit the file:
$ git commit -m "Initial commit with greet()"

Create the first branch feature/spanish-update from main and modify the same line:
$ git checkout -b feature/spanish-update

Next, open the app.py file and replace the greeting text "Hello, world!" with "¡Hola,
mundo!".
Once the change is saved, stage the file and commit it:
$ git commit -m "Update greeting to Spanish"

Return to main, create another branch feature/english-update from the same commit, and
again modify the same line:
$ git checkout -b feature/english-update

Open the app.py file again and replace the greeting text "Hello, world!" with "Hello,
everyone!".
Once the change is saved, stage the file and commit it:
$ git commit -m "Update greeting in English"

Merge the Spanish branch first. This should succeed:
$ git merge feature/spanish-update

Verify the contents of the app.py file to confirm the update:
$ cat app.py
print("¡Hola, mundo!")

Now try merging the English branch. This will produce a conflict, since both branches changed the
same line:
$ git merge feature/english-update
Auto-merging app.py

CONFLICT (content): Merge conflict in app.py
Automatic merge failed; fix conflicts and then commit the result.

Don’t worry! Just view app.py as shown in the next section and resolve the conflict.
What a Merge Conflict Looks Like
Git marks the conflicting file like this:
$ cat app.py
print("¡Hola, mundo!")
print("Hello, everyone!")
>>>>>>> feature/english-update

Here’s what each section means:
Precedes the current content in your branch (main) that is in conflict with yours.
A separator between conflicting changes. The lines that follow are the incoming changes from
the branch you are trying to merge.
>>>>>>> feature/english-update
Terminates the block containing the conflicting lines.

Viewing Changes with git diff
When working with Git, understanding how changes progress through the different stages of the
commit process is essential.
Each stage — from editing files in the working directory
committing — represents a snapshot of the project’s evolution.

to

staging

and

finally

Git offers several commands to inspect these changes at every step, allowing precise tracking,
validation, and control over what will be recorded in the repository’s history.
Two commonly used commands for this purpose are:

git diff
Displays the differences between the working directory and the staging area (index). In other
words, it shows what has been modified in the files but not yet staged with git add.
git diff --cached (or --staged)
Shows the differences between the staging area and the most recent commit (HEAD). This
output reveals what has already been staged and will be part of the next commit.
Both options help review modifications before committing, ensuring accuracy and clarity in the
project history.
Additionally, git diff can compare specific files, commits, or branches, providing a detailed
view of what has changed — an essential practice when validating code or resolving merge
conflicts.
$ git diff app.py
diff --cc app.py
index 5253755,1cb4cb0..0000000
--- a/app.py
+++ b/app.py
@@@ -1,3 -1,3 +1,7 @@@
app.py in main
++<<<<<<< HEAD
+

print("¡Hola, mundo!")

++=======
+

print("Hello everyone!")

++>>>>>>> feature/english-update

Resolving the Conflict
To resolve the conflict, the file app.py must be manually edited to represent the correct and
intended final version, for example:
print("Hello, everyone and ¡Hola, mundo!")

After editing, add your file again:

Then complete the merge with:
$ git commit

During a merge, Git may automatically generate a default commit message describing the merge
operation.
This message can be accepted as-is or replaced with a custom one that better explains the purpose
or context of the merge. A clear, descriptive merge message helps maintain an understandable
project history and simplifies future reviews or debugging.
- Use git status to see which files are in conflict.
- Use git diff to review changes before resolving.
TIP

- Tools such as VS Code, Sourcetree, and GitKraken provide graphical merge tools
that simplify resolution.
- For advanced conflict resolution, you can use git mergetool.

Branch Management
The git branch command offers more functionality than just creating and deleting branches.
When run without any arguments, it displays a list of all local branches, highlighting the one
currently checked out. To view the most recent commit associated with each branch, use the -v
option:
$ git branch -v
feature/english-update 91f4dc5 new file
feature/spanish-update b1b0e81 Update greeting to Spanish
- main

b1b0e81 Update greeting to Spanish

The --merged and --no-merged options are helpful for filtering branches based on their merge
status relative to your current branch. To display a list of branches that have already been merged
into the current branch, use:
$ git branch --merged
feature/spanish-update
- main

Since you previously merged the feature/spanish-update branch, it appears in the list of

merged branches.
This makes it easy to identify which branches have already been merged and are safe to delete, as
well as those that remain active or pending integration.
Branches listed without an asterisk (*) are not the currently checked-out branch. It is typically
safe to delete such branches using git branch -d, because its changes have already been
integrated elsewhere and won’t be lost.
To view branches that contain work not yet merged into your current branch, use the --no
-merged option:
$ git branch --no-merged
feature/english-update

This lists branches that still have unmerged changes, in this case feature/english-update.

Renaming a Git Branch Locally and Remotely
Git makes it easy to rename branches while preserving the full commit history. The process
involves renaming the branch locally and updating the branch name on the remote (e.g., GitHub,
GitLab, or another Git server). In the following example, a branch named my-old-branch will be
renamed to my-new-branch.
Step 1: Rename the Branch Locally
Use git branch with the --move or -m option to rename the branch locally:
$ git branch --move my-old-branch my-new-branch
$ git branch
main
- my-new-branch

This command replaces my-old-branch with my-new-branch locally, keeping all history and
commit references intact. However, this change affects only your local repository.
Step 2: Push the Renamed Branch to the Remote
To make the updated branch name visible to others, push it to the remote and set the upstream
reference:

$ git push --set-upstream origin my-new-branch

This creates the new branch on the remote and links your local branch to it.
You can now verify the branch structure with:
$ git branch --all
main
- my-new-branch
remotes/origin/main
remotes/origin/my-new-branch
remotes/origin/my-old-branch

At this point, you are working on my-new-branch, and it has been successfully pushed to the
remote. However, the old my-old-branch branch still exists remotely and should be removed to
complete the cleanup.
Step 3: Delete the Old Branch from the Remote
To remove the incorrectly named branch from the remote repository, run:
$ git push origin --delete my-old-branch

This command permanently deletes my-old-branch from the remote, leaving only the correctly
renamed branch.
Step 4: Clean Up Local References (Optional)
If you still see the old branch listed under remotes/origin, remove stale references:
$ git fetch --prune

You have now fully renamed the branch — both locally and remotely — without losing any
commit history.

Temporary Change Management with git stash and git pop
When working on a feature or fixing a bug, it is common to make multiple edits before completing

a commit. However, there are times when an urgent task requires switching branches or pulling
the latest updates — even though the current work is unfinished. In such situations, the git
stash command is invaluable.
It temporarily saves local modifications (by default, only tracked files) without committing them,
allowing the workspace to be safely cleared so that another task can be addressed. Once the
urgent work is completed, the stashed changes can be restored exactly as they were.
Consider the following scenario:
Work is being done on the main branch to fix the login form, and the file login.html has been
modified but not yet committed.
Suddenly, an urgent request arises to apply a correction on another branch named hotfix/logo.
Since switching branches with uncommitted changes (that affect overlapping files) is not allowed,
the best approach is to temporarily stash the current work:
$ git add login.html
$ git stash push -m "fixing login form"

This sequence stages the changes to login.html and then saves them in a stash identified by the
message fixing login form.
The working directory becomes clean, allowing an immediate switch to the hotfix/logo branch
to handle the urgent issue. This will save your local modifications and revert the working
directory to match the HEAD commit.
To confirm that the stash was created successfully, list the available stashes with:
$ git stash list
stash@{0}: On main: fixing login form

This output indicates that the current work has been safely stored under the label fixing login
form. With the workspace now clean, it is possible to switch branches and address the urgent task.
Switch to the hotfix/logo branch:
$ git checkout hotfix/logo

After switching branches, perform the necessary corrections, then stage and commit the fix:

$ git commit -am "Fixed logo alignment"

The urgent issue is now resolved, and the previous work remains safely stored in the stash, ready
to be reapplied later.
With the -a option, Git automatically stages all modifications to already tracked files before
committing — saving you from the step of running git add. Then you can go back to your
original branch.
Once you’re ready to return to your previous work, use git stash pop to reapply the latest
stashed changes and remove them from the stash list:
$ git stash pop
Your branch is up to date with 'origin/main'.
Changes to be committed:
(use "git restore --staged <file>..." to unstage)
new file:

login.html

At this point, the stashed changes have been restored to the working directory, allowing the
unfinished work to continue seamlessly from where it was left off.
Once a stash is successfully applied using git stash pop, it is automatically removed from the
stash list, keeping the repository clean and avoiding duplicate entries.
To apply a specific stash, enter:
$ git stash pop stash@{2}

To reapply the changes and keep the stash saved, enter:
$ git stash apply

To delete all saved stashes, enter:
$ git stash clear

If there are conflicts when popping the stash (e.g., if some files were modified both in the stash

and in your current branch), Git will notify you of merge conflicts, and you will need to resolve
them manually.

1. What happens when you run git branch feature-x?

2. What is the difference between a lightweight tag and an annotated tag in Git?

## 3. After renaming a local branch, how do you delete the old branch my-old-branch from the
remote?

## 4. You have a repository with a file called message.txt. Two branches (english-greeting and
spanish-greeting) will make conflicting edits to this file:
¡Hola, mundo!
Hello, world!
>>>>>>> english-greeting

Show how to merge the branches and manually resolve the conflict.

## 5. How do you bring back the most recent stashed changes and remove them from the list of
stashes?

## 1. Explore how Git handles tags created before and after a merge; do so through the following
actions:
- Create a new Git repository and commit a file.
- Create a new branch (feature) from main and make a commit there.
- Tag the commit on the feature branch with v1.1-beta.
- Switch back to main, make another commit.
- Merge feature into main.
- Tag the result of the merge as v1.1-final.
- Run git log --oneline --decorate --graph --all and analyze the output.

## 2. Based on this scenario, answer the following: Where is each tag pointing? Does the tag from the
feature branch appear in the main history after the merge?

In Git, branches and tags are essential tools for navigating, isolating, and labeling different points
in a project’s history. They allow developers to experiment with new features, manage releases,
and mark specific versions of a project without disrupting the main development workflow.
Branch and tag management are fundamental to maintaining clean, collaborative, and reliable
codebases.

## 1. What happens when you run git branch feature-x?
It creates a new branch called feature-x pointing to the current commit, but it does not
switch to that branch.
2. What is the difference between a lightweight tag and an annotated tag in Git?
A lightweight tag is a simple reference to a commit, without metadata. An annotated tag
includes metadata such as the tagger’s name, the current date, and a message. Annotated tags
are recommended for marking official releases.
3. After renaming a local branch, how do you delete the old branch my-old-branch from the
remote?
$ git push origin --delete my-old-branch

## 4. You have a repository with a file called message.txt. Two branches (english-greeting and
spanish-greeting) will make conflicting edits to this file:
¡Hola, mundo!
Hello, world!
>>>>>>> english-greeting

Show how to merge the branches and manually resolve the conflict.
Manually edit message.txt to resolve the conflict, for example:
Hello, world! / ¡Hola, mundo!

Stage the resolved file:
$ git add message.txt

Complete the merge:

$ git commit

## 5. How do you bring back the most recent stashed changes and remove them from the list of
stashes?
$ git stash pop

## 1. Explore how Git handles tags created before and after a merge; do so through the following
actions:
- Create a new Git repository and commit a file.
- Create a new branch (feature) from main and make a commit there.
- Tag the commit on the feature branch with v1.1-beta.
- Switch back to main, make another commit.
- Merge feature into main.
- Tag the result of the merge as v1.1-final.
- Run git log --oneline --decorate --graph --all and analyze the output.
Create a new Git repository and commit a file:
$ git init tag-merge-demo
$ cd tag-merge-demo
$ echo "Initial content" > app.txt
$ git add app.txt
$ git commit -m "Initial commit"

Create a new branch (feature) from main and make a commit there:
$ git checkout -b feature
$ echo "Feature notes" > feature.txt
$ git add feature.txt
$ *git commit -m "Add feature.txt"

Tag the commit on the feature branch with v1.1-beta:
$ git tag -a v1.1-beta -m "Beta version"

Switch back to main and make another commit:
$ echo “Main notes” >> app.txt
$ git add app.txt

$ git commit -m "Append notes on app.txt"

Merge feature into main:
$ git merge feature

Tag the result of the merge as v1.1-final:
$ git tag -a v1.1-final -m "Final version"

Run git log --oneline --decorate --graph --all and analyze the output:
$ git log --oneline --decorate --graph --all
*

439ce20 (HEAD -> main, tag: v1.1-final) ok Merge branch 'feature'

|\
| * 9e53836 (tag: v1.1-beta, feature) Add feature.txt
- | 5651546 Append notes on main
|/
- 3e464b8 Initial commit

## 2. Based on this scenario, answer the following: Where is each tag pointing? Does the tag from the
feature branch appear in the main history after the merge?
v1.1-beta stays on the feature commit; v1.1-final is on the merge commit.
The v1.1-beta tag from the feature branch does not appear in the main history (439ce20).
This is because tags do not move with merges; they remain attached to the original commit.
This feature allows you to mark versions both before and after integration.

The previous lessons showed how to work with local branches and manage changes within a
single repository. This lesson expands the workflow to include remote repositories, feature
branches, and Git submodules. These tools are essential for collaborating with others, structuring
large projects, and maintaining modular codebases.

Configuring a Remote Repository
To collaborate with others or contribute to an existing project, the local repository must be
connected to a remote repository. A remote serves as a shared version of the repository, typically
hosted on platforms such as GitHub, GitLab, or Bitbucket.
If a local repository needs to be linked to a remote named project.git hosted on GitHub,
execute:
$ git remote add origin https://github.com/<username>/project.git

This command associates the alias origin with the specified remote URL.
To verify that the connection was successfully established, run:
$ git remote -v

https://github.com/<username>/project.git (fetch)

https://github.com/<username>/project.git (push)

The output lists the remote URLs used for both fetching (downloading) and pushing (uploading)
commits to the repository associated with origin. This confirmation ensures that
synchronization between the local and remote repositories is properly configured.

Sharing Changes With git push
After committing changes locally, the next step is to share them with others by pushing them to
the remote repository. This operation uploads the commits from the local branch to the
corresponding branch on the remote, making the updates accessible to collaborators.
To push the current branch (main) to the remote named origin, use:
$ git push origin main

If this is the first time pushing the branch, include the -u option to establish an upstream tracking
relationship between the local branch and its remote counterpart:
$ git push -u origin main

Once this association is created, subsequent pushes can be performed simply with:
$ git push

From that point on, Git automatically remembers which remote and branch the local branch is
linked to, streamlining future synchronization operations.

Getting Updates With git fetch
git fetch downloads new data from the remote repository, such as new branches or updates to
remote branches, but it does not automatically update your working directory:

This updates local references to the remote branches (e.g., origin/main) without touching files or
merging anything. To inspect what’s new:
$ git log HEAD..origin/main

This shows commits that exist in origin/main but aren’t yet in the current branch.

Updating Local Branch With git pull
git pull is the shorthand for git fetch followed by a git merge. It downloads changes from
the remote and integrates them into the current working branch:

This command synchronizes the local main branch with any new commits from origin/main.
If conflicting changes exist between the local and remote versions, Git will detect them, notify the
user, and pause the merge process until the conflicts are manually resolved.
Once all conflicts are fixed and the changes are committed, the update completes successfully.

Force Pushing With git push --force
In certain situations, it becomes necessary to rewrite the commit history of a branch — for
instance, after performing a git rebase or using git commit --amend.
These operations modify existing commits, generating new commit hashes. As a result, the local
branch history no longer matches the one stored on the remote repository. To prevent accidental
overwriting of shared work, a regular git push is rejected by default when histories diverge.
In such cases, a force push is required to update the remote branch with the rewritten history:
$ git push --force

Before executing it, ensure that no other collaborators are depending on the previous commits to
avoid data loss or synchronization issues.

WARNING

Force pushing rewrites the history on the remote and can cause problems for
collaborators if not coordinated properly. It is safest to use on branches that
only you are working on.

Force Pulling With git fetch and git reset --hard
Unlike git push --force, Git does not have a direct git pull --force command. What many
developers refer to as a force pull is actually a combination of two commands:
$ git reset --hard origin/main

This operation discards all local changes and commits, replacing the current branch with the
exact state of its remote counterpart.
It is a powerful but potentially destructive command, as it overwrites local work without the
possibility of recovery unless backups or other branches exist. Therefore, it must be used with
extreme caution.
A force pull may be necessary in the following scenarios:
- The local branch has diverged from the remote because its history was rewritten (for example,
after someone performed a git push --force).
- All local changes need to be discarded to make the branch identical to the remote version.
- The local repository history is corrupted, or a clean testing environment is required.

WARNING

A force pull permanently deletes local commits and any uncommitted
modifications. Before executing it, verify that all important local work has
been backed up, merged, or is no longer required.

Removing Untracked Files
To complete a force pull by also removing untracked files and directories (those not added to Git),
execute:
$ git clean -fd

where:

-f
forces the deletion of untracked files.
-d
removes untracked directories as well.
This command is particularly useful when a completely clean working directory is required — for
instance, in automated build systems, deployment environments, or when resetting a repository
to a pristine state for testing.

Reverting to a Specific Commit Using a New Branch
In Git, it is often necessary to revisit a previous point in a project’s history — for example, to
inspect an older version, investigate a bug, or begin new development based on a stable past state.
Rather than resetting or modifying existing branches, the safest method is to create a new branch
from a specific commit. This approach preserves the repository’s integrity while providing a clean
workspace for experimentation or targeted changes.
For instance, to return to a commit identified by the hash a1b2c3d and begin new work from that
point, first navigate to the project directory:
$ cd my-project

Create a new branch from the specific commit:
$ git checkout -b legacy-fix a1b2c3d

This command performs two actions simultaneously:
- Checks out the commit a1b2c3d, restoring the working directory to the exact state it had at that
point in history.
- Creates a new branch named legacy-fix, starting from that commit.
Once the branch is created, new edits can be made, staged, and committed normally, without
altering or interfering with the history of other branches. This technique is ideal for hotfixes,
debugging legacy code, or developing new features from a known stable version.

How to Find the Commit Hash
If the commit hash is not known in advance, the recent commit history can be reviewed with the
following command:
$ git log --oneline
a633ee0 (HEAD -> main, origin/main) Update login.html
fbf92c7 create the logon.html file
89bf9bb (origin/my-new-branch, my-new-branch, hotfix/logo) first commit

This displays a compact list of commits, showing their abbreviated SHA-1 hashes along with the
corresponding commit messages, making it easier to identify the desired point in the project’s
history.

Returning to a Specific Commit Without Creating a New Branch
Occasionally, it may be necessary to return to an earlier state of the project — for instance, to
review old code, test a previous version, or perform a temporary rollback for debugging purposes.
When creating a new branch is not required, there are two primary ways to move to a specific
commit. Each method serves a different purpose depending on whether the goal is a temporary
inspection or a permanent reset of the project’s state.

Checkout a Specific Commit (Detached HEAD)
The git checkout command can be used to move directly to any commit by specifying its hash.
This action places the repository in a detached HEAD state, meaning that the current view is based
on a specific commit rather than a named branch.
$ git checkout a1b2c3d

At this point, the working directory reflects the exact state of the project as it was at commit
a1b2c3d. Files can be inspected, tests executed, or temporary modifications made.
However, any new commits created in this state will not belong to a branch and may be lost
unless they are explicitly saved by creating a new branch or tag.
To return to the most recent branch (for example, main), execute:

Resetting the Current Branch to a Specific Commit
To move a current branch permanently back to a previous commit — effectively discarding all
commits after it — use git reset. There are three modes:
--soft
keeps all changes staged.
--mixed
keeps changes in the working directory but unstaged (default).
--hard
discards all changes.
The following example resets the branch hard to a previous commit:
$ git reset --hard a1b2c3d

This rewrites the branch history and removes all commits after a1b2c3d.

WARNING

Use a hard reset only if you are certain that later commits are no longer
needed. If you have already pushed these commits to a remote repository,
resetting will create divergence and may require a force push (git push
--force).

Understanding git rebase
In Git, there are two primary methods to integrate changes between branches: merging and
rebasing.
The rebase command is a powerful tool that allows you to reapply commits on top of another
base tip. Unlike merging, which creates a new commit that combines histories, rebasing rewrites
the commit history to make it appear as if changes were made in a straight line. This results in a
cleaner, more linear project history, which is often easier to read and understand.
Used correctly, git rebase can simplify collaboration, reduce unnecessary merge commits, and
clarify the evolution of a feature or bug fix. However, because rebasing rewrites commit history, it

must be used with care, especially when working with shared branches.

When to Use git rebase
Rebase is best suited for scenarios where a linear, easy-to-read history is desirable:
- Updating a feature branch with the newest commits from main before merging, so the feature
is built atop the latest base.
- Tidying commit history by squashing or reordering commits prior to publishing.
- Keeping the development history straightforward, minimizing merge commits and making git
log easier to follow.
Rebase is discouraged on branches already shared with collaborators unless all parties are
aligned and ready to coordinate. Rebasing rewrites commit hashes; once published, that rewrite
requires a force push and can disrupt other clones.
Suppose you are working on a branch called feature/login, and the main branch has received
updates since you branched off. Before merging feature/login back into main, you want to
integrate the latest changes from main to ensure your code is up to date.
Step 1: Check Out Your Feature Branch
$ git checkout feature/login

Step 2: Rebase Onto the Latest Main Branch
$ git rebase main

This takes the commits from feature/login and replays them on top of the latest main. If there
are no conflicts, the rebase finishes automatically. Your feature branch now appears as if it was
developed from the latest version of main.
If there are conflicts, Git will pause and allow you to resolve them manually. After fixing conflicts
in a file, enter:
$ git add <filename>

Then continue the rebase:

$ git rebase --continue

To cancel the rebase at any time and return to the previous state, enter:
$ git rebase --abort

Rebase Versus Merge
Let’s review the difference between the two approaches:
git merge main (on feature/login)
creates a merge commit, preserving the full history of both branches, including divergent
paths.

Figure 2. Merge history

git rebase main
moves the feature branch’s commits on top of main, rewriting the history to produce a linear
timeline.

Figure 3. Rebase history

The commits D and E have been replayed as (D) and (E), rebased on top of commit C.
But which approach is better? To decide that, let’s take a step back and think about what commit
history really means.
One perspective is that a repository’s commit history is a factual log of what actually happened
during development. It is a historical document — valuable in itself — and should not be altered.
From this point of view, rewriting history using tools like rebase is almost sacrilegious. Even if the
merges were messy, the repository should reflect that for future reference.
The opposing perspective views commit history as the story of how a project was built. And just as
an author would not publish the rough draft of a book, developers may prefer not to expose a
(sometimes messy) development process. During active work, keeping a record of mistakes and
experiments can be valuable, but when it is time to share the results — especially with
collaborators or the public — it often makes sense to present a cleaner, more coherent history.
Developers who follow this mindset use tools like interactive rebasing to refine and organize their
commits before merging into the main branch, aiming to tell a clearer and more meaningful story
for future readers.

Real-World Example: Collaborating on a Shared Project
Let’s say you are working on a team project hosted on GitHub. Clone the repository:
$ git clone https://github.com/<username>/shared-project.git
$ cd shared-project

Create a feature branch:

$ git checkout -b feature/contact-form

After committing changes, share them:
$ git push -u origin feature/contact-form

A teammate updates the main branch with new work. Sync the repositories with:

Update your feature branch with the latest changes from main:
$ git checkout feature/contact-form
$ git rebase main

Finally, when your feature is complete, open a pull request or merge your branch.

Submodules: Managing Nested Git Repositories
A Git submodule is a repository embedded inside another repository. This is commonly used when
your project depends on an external library or shared component that is managed in its own Git
repo.

Adding a Submodule
To add a submodule to your repository, enter:
$ git submodule add https://github.com/<otheruser>/library.git lib/library

This creates a new folder at lib/library, links it to the remote repository, and records the
submodule path in a .gitmodules file.

Cloning a Repository with Submodules
If you clone a repository that uses submodules, you must also initialize and fetch the submodules:

$ git clone https://github.com/<username>/project.git
$ cd project
$ git submodule update --init --recursive

The --recursive option ensures that submodules within submodules are also initialized.

Updating Submodules
To update the submodule to the latest commit on its remote, enter:
$ cd lib/library
$ cd ../..
$ git add lib/library
$ git commit -m "Update submodule to latest version"

You can also update all submodules recursively with:
$ git submodule update --remote --merge

Removing a Submodule
To remove a submodule completely:
1. Delete the submodule entry in .gitmodules.
2. Delete the submodule’s entry in .git/config.
## 3. Remove the submodule directory and cached reference:
$ git rm --cached lib/library
$ rm -rf lib/library

## 4. Commit the change:
$ git commit -m "Remove submodule"

## 1. After creating a local branch called feature/login, how do you push it to the remote
repository and set it to track the remote branch?

## 2. What combination of commands can be used to perform a “force pull” that replaces your local
branch with the remote version?

3. How can you create a new branch from a specific commit hash a1b2c3d?

## 4. What is the difference between git merge and git rebase when integrating changes from
the main branch into a feature branch?

## 5. What is the purpose of Git submodules?

1. Compare the user interface for handling remote repositories in GitHub and GitLab.

## 2. How can you ensure that submodules are cloned and updated during pipeline execution in
GitHub and GitLab?

As your Git skills evolve beyond managing changes within a single local repository, it is essential
to master the tools and workflows that support real-world collaboration and project structure.
This lesson introduced key concepts such as remote repositories, feature branches, rebasing, and
submodules — all of which play a crucial role in professional software development. The lesson
covered how to track and sync with remote branches, organize your work using isolated feature
branches, and apply powerful techniques like rebasing to maintain a clean and linear commit
history. Additionally, the lesson explored how Git submodules enable you to include and manage
external repositories as dependencies, a common requirement in modular or large-scale projects.

## 1. After creating a local branch called feature/login, how do you push it to the remote
repository and set it to track the remote branch?
$ git push -u origin feature/login

## 2. What combination of commands can be used to perform a “force pull” that replaces your local
branch with the remote version?
$ git reset --hard origin/main

3. How can you create a new branch from a specific commit hash a1b2c3d?
$ git checkout -b legacy-fix a1b2c3d

## 4. What is the difference between git merge and git rebase when integrating changes from
the main branch into a feature branch?
git merge creates a new merge commit and preserves both histories.
git rebase rewrites history to make it appear linear by replaying your feature commits on
top of the main branch.
5. What is the purpose of Git submodules?
Submodules allow you to include other Git repositories inside your project as dependencies,
enabling modular project structures.

1. Compare the user interface for handling remote repositories in GitHub and GitLab.
Both GitHub and GitLab support remote repository hosting, feature branching, pull/merge
requests, and submodules, but they differ in their user interface and integration options. Some
notable differences are:
Feature branching: Both platforms support Git feature branches and allow their creation
through the user interface (UI) or command line. GitHub uses the term “pull request” (PR),
while GitLab uses the term “merge request” (MR) for requests to upload changes to a remote
branch. GitHub’s interface is slightly more streamlined for code review, while GitLab provides
more CI/CD integration during the merge request process.
Forks and contributions: GitHub emphasizes a fork-and-pull model, especially in open-source
collaboration. GitLab allows similar workflows but is also optimized for internal repositories
using protected branches and permissions.
Submodule support: Both platforms support Git submodules, but GitHub has limited UI visibility
into submodule contents. GitLab displays submodules more clearly in the file tree and includes
links to the submodule repositories.
2. How can you ensure that submodules are cloned and updated during pipeline execution in
GitHub and GitLab?
To ensure submodules are cloned and updated during pipeline execution, you must explicitly
instruct the pipeline to initialize and update them, because most CI systems do not fetch
submodules by default when cloning a repository.
In GitHub Actions:
Use the official actions/checkout action with the submodules' recursive option through
this YAML snippet:
- name: Checkout repository including submodules
uses: actions/checkout@v3
with:
submodules: 'recursive'

This ensures that the repository is cloned along with all submodules, including nested ones.
In GitLab CI/CD:

Manually initialize and update submodules in your .gitlab-ci.yml script:
script:
- git submodule init
- git submodule update --recursive

This sequence ensures that all submodules are initialized and checked out at the correct
commit, as recorded in the parent repository.

### 701.4 Continuous Integration and Continuous Delivery
DevOps Tools Engineer v2.0, Exam 701, Objective 701.4
- Understand the concepts of Continuous Integration and Continuous Delivery
- Understand the components of a CI/CD pipeline, including builds, unit, integration and
acceptance tests, artifact management, delivery and deployment
- Understand the concepts of GitOps
- Understand the role of build artifacts and caches
- Understand deployment best practices
- Understand semantic versioning
- Awareness of Jenkins and Gitlab CI
- Awareness of Artifactory and Nexus
- Declarative Pipeline
- Production, Staging and Development Environments
- Feature toggles
- Preview releases
- Reconciliation loops
- A/B testing

DevOps Tools Engineer (Version 2.0) | 701.4 Continuous Integration and Continuous Delivery

- Blue-green and canary deployment

### 701.4 Continuous Integration and Continuous
Delivery

Modern software development demands fast, reliable, and repeatable processes to build, test, and
deliver applications. That’s where continuous integration and continuous delivery (CI/CD) comes
in: a set of practices and tools that allow development teams to automate and streamline the
entire lifecycle of software delivery. The “D” in CI/CD is sometimes interpreted as “delivery” or
“deployment”, depending on whether the focus is on preparing software for release or actually
deploying it to production environments. In either case, the goal remains the same: to ensure that
code changes can move from development to users quickly, safely, and consistently.
In this lesson, the foundational principles of CI/CD are examined in detail. The structure of a
complete CI/CD pipeline is explored, including how code moves from development to production
through automated build, test, and deployment stages.

The lesson also introduces modern deployment strategies such as GitOps, blue-green deployments,
and feature toggles, emphasizing how these practices improve reliability and reduce downtime
during releases.
Additionally, key industry tools — including Jenkins, GitLab CI, Artifactory, and Nexus — are
presented to illustrate how CI/CD pipelines are implemented in real-world environments across
various technology stacks.

Continuous Integration and Continuous Delivery
(CI/CD)
In the context of modern software development, CI and CD are essential practices that help teams
build, test, and deploy applications in a reliable and automated fashion.
Continuous integration refers to the process of automatically integrating code changes from
multiple contributors into a shared repository, sometimes several times a day. Each integration
typically triggers an automated build and testing sequence, ensuring that the codebase remains
functional and free of defects. This process encourages developers to submit small, incremental
changes frequently and makes it easier to identify bugs early in the development cycle.
Continuous delivery extends the principles of CI by ensuring that the software is always in a
releasable state. It automates the release process, so that code changes that pass testing can be
deployed to staging or production environments at any chosen time. The software is not only
tested continuously but also prepared continuously for delivery, making deployments predictable
and less risky.
The sequence of events in CI/CD is called a pipeline. It consists of a series of automated steps
triggered by a commit or pull request to a version control system such as Git. These steps often
include building the application, running unit and integration tests, packaging the application into
deployable artifacts, and deploying it to target environments such as staging or production
(Elements of a typical CI/CD pipeline). All of this is orchestrated by CI/CD tools that define the
pipeline in configuration files, making deployments consistent and repeatable across

Figure 4. Elements of a typical CI/CD pipeline

Components of a CI/CD Pipeline
A well-designed CI/CD pipeline consists of several automated stages that take code from
development to production with reliability and consistency. Each component plays a specific role
in validating, packaging, and delivering software.

Build Stage
The build stage is the first automated step after code changes are committed. This phase compiles
the application source code, resolves dependencies, and packages the executable program into a
deployable format, such as a binary, JAR file, or Docker image.
This stage confirms that the codebase is syntactically correct and can be successfully assembled in
the target runtime environment. Failures here indicate issues such as missing dependencies,
syntax errors, or misconfigured build tools.

Unit Testing
Once the build is successful, the pipeline moves into the unit testing stage. Unit tests validate small,
isolated pieces of code, such as individual functions or classes, to ensure they behave as expected.
These tests are typically fast and run in parallel. They serve as the first line of defense against
regressions and logic errors introduced during development. High unit test coverage helps detect
bugs early and contributes to long-term maintainability.

Integration Testing
Integration tests go beyond isolated units and focus on interactions between components and
modules, or with external systems such as databases or APIs. These tests ensure that different
parts of the application work together as intended. Integration tests are usually slower than unit
tests but are essential for catching issues that appear only during real-world usage where multiple
services interact.

Acceptance Testing
Acceptance tests validate the system from the perspective of the end user or stakeholder. They are
often driven by predefined business requirements or user stories and ensure that the application
fulfills its intended purpose. Acceptance tests may involve functional user interface (UI) testing,
API contract validation, or behavior-driven development (BDD) scenarios. They help determine
whether the application is ready to be released to production or requires further adjustments.

Artifact Management
Once the application passes all tests, the resulting build artifacts are stored in a central repository.
This step makes sure to preserve the exact version of the software that passed all quality checks
and can be reliably deployed later. Artifact management systems — such as GitHub Packages,
JFrog Artifactory, or AWS CodeArtifact handle versioning, storage, and access control for these
artifacts. Proper artifact management supports rollback, traceability, and reproducible builds.

Delivery and Deployment
The final stage of the pipeline is delivery and deployment. In continuous delivery, the software is
automatically deployed to a staging environment and awaits manual approval for production. In
continuous deployment, the release is pushed all the way to production automatically after
passing all stages. Deployment scripts, infrastructure as code, and container orchestration systems
like Kubernetes or Docker Compose often drive this stage. Teams may use blue-green
deployments, canary releases, or rolling updates to minimize downtime and risk (see below).

Deployment Strategies and Best Practices
As teams release updates more frequently through CI/CD pipelines, careful deployment strategies
become essential to minimize downtime, reduce risk, and enable rapid feedback. Effective
deployment is not just about copying code to servers, it is about coordinating infrastructure,
application logic, and the user experience to ensure smooth transitions across versions.
A solid deployment strategy begins with an understanding of the environments involved. To
manage deployments in these environments effectively, teams adopt practices such as
infrastructure as code, automation, and immutable deployments, ensuring repeatability and
consistency across environments. But beyond automation, strategic approaches to rolling out
software play a major role in reducing risk and improving observability.

Blue-Green Deployment
A blue-green deployment is a strategy using two production environments: live (blue) and idle
(green). The new version of the application is deployed to the idle environment (green) while the
current version continues to serve users (blue). After the green deployment passes rigorous tests,
traffic switches over to it, either all at once or gradually. If issues arise, rollback is as simple as
reverting traffic to the original (blue) environment. This strategy minimizes downtime and allows
for quick rollback to a known-good state, but it effectively doubles the infrastructure cost by
requiring two parallel production environments.

Canary Deployment
A canary deployment rolls out new software to a small subset of users before a full-scale release.
This allows teams to monitor system behavior, user experience, and error rates in real time while
minimizing the blast radius of potential issues. If the release performs well, it is gradually
expanded to more users. If problems are detected, the deployment can be halted or rolled back
without affecting the entire user base. Canary deployments are commonly used in cloud-native
platforms with routing control, such as Kubernetes with service meshes.

A/B Testing
A/B testing is useful not only for deployment but also for product experimentation. It involves
releasing two or more versions (A and B) of a feature or UI element to different user segments
simultaneously and measuring their impact. Unlike canary releases, which focus on technical
validation, A/B testing is centered on business metrics such as click-through rates, engagement, or
conversions.

In this context, engagement refers to how actively users interact with a feature or interface — for
example, how often they click, scroll, or spend time on a page. Conversion measures how many
users perform a desired action, such as completing a purchase, subscribing, or signing up for a
service.
Proper A/B testing requires traffic splitting, telemetry collection, and statistical analysis to
determine which version performs better. A related technique, known as multi-armed bandit
testing, builds upon A/B testing by dynamically reallocating more traffic to the better-performing
variations as results are collected, allowing faster optimization and less wasted exposure to
underperforming options.

Preview Releases
Preview environments (also called preview releases or ephemeral environments) are short-lived,
automated environments spun up for each pull request or feature branch. They allow developers,
testers, and stakeholders to review changes in a real-world setup before merging those changes.
These environments mirror staging or production as closely as possible and are automatically
destroyed after use. Preview releases increase confidence in changes and improve collaboration
across teams.

Feature Toggles
Feature toggles (or feature flags) allow developers to enable or disable specific features at runtime
without deploying new code. This decouples deployment from release, enabling features to be
hidden, rolled out gradually, or targeted to specific user groups. Feature flags also allow for safe
experimentation, rollback, and staged rollouts.

Reconciliation Loops
In declarative systems like Kubernetes or tools like Argo CD, reconciliation loops continuously
compare the desired state of the system (as declared in configuration files) with the actual state. If
a drift is detected — for example, a container was modified outside of the pipeline — the controller
attempts to restore the system to its declared state. This mechanism provides self-healing and
enforces consistency, making the infrastructure and application state predictable and reliable.
Reconciliation is a cornerstone of GitOps-based deployments, discussed next.

GitOps
GitOps is an operational model that uses Git as the single source of truth for infrastructure and
application deployments. It bridges the gap between development and operations by allowing

teams to manage infrastructure and deployment configurations through version-controlled
repositories, just like they manage application source code.
In a GitOps workflow, infrastructure changes are made by updating configuration files in a Git
repository. Once the change is committed, an automated process (usually driven by a controller
like Argo CD or Flux) detects the update and applies it to the target environment. This allows for
full auditability, easy rollback, and reliable automation, since every change must be tracked, peerreviewed, and explicitly declared in Git.
GitOps reinforces infrastructure as code, declarative configuration, and automation. It enables
repeatable, secure, and scalable delivery workflows that are particularly well-suited for
Kubernetes environments and cloud-native applications.

Semantic Versioning
Semantic versioning (SemVer) is a versioning system designed to clearly convey the meaning of
changes in software releases. Version names follow the format MAJOR.MINOR.PATCH, where each
component indicates the type of changes introduced.
The MAJOR version increases when backward-incompatible changes are made. The MINOR version
increases when new features are added in a backward-compatible way. The PATCH version
increases when backward-compatible bug fixes are introduced.
For example, version 2.4.1 indicates the second major version of the software, with four minor
feature updates and one patch. If the next update includes a breaking API change, it would
become 3.0.0.
Semantic versioning helps teams and users understand the impact of an update before applying it.
It is widely adopted in package managers, CI/CD pipelines, container tagging, and dependency
management systems.

Build Artifacts and Caches
In a CI/CD pipeline, build artifacts are the output of a successful build process: compiled binaries,
Docker images, JAR files, static assets, or zipped packages ready for deployment or distribution.
These artifacts are often stored in artifact repositories (such as JFrog Artifactory, GitHub Packages,
or AWS CodeArtifact) and may be versioned, signed, and reused.
Build caches, on the other hand, are intermediate results stored to speed up subsequent builds.
Instead of recompiling unchanged modules or reinstalling dependencies, caching mechanisms
allow reuse of previously generated outputs. This reduces build times and resource usage,

especially in large or modular projects.
Efficient use of both artifacts and caches improves CI/CD performance, reduces cost, and ensures
that builds are reproducible. Many CI/CD systems allow the configuration of caching strategies
and artifact retention policies to support these goals.

Declarative Pipelines
A declarative pipeline is a CI/CD pipeline defined using configuration files that describe “what
should happen” during the software delivery process, rather than providing procedures for
carrying out the changes. Declarative pipelines are written in a structured format such as YAML
or a domain-specific language, which defines stages, jobs, triggers, environments, and conditions.
Declarative pipelines are commonly used in platforms like GitLab CI (where the configuration file
is
.gitlab-ci.yml),
GitHub
Actions
(where
configuration
file
is
.github/workflows/*.yml), and Jenkins (via Declarative Pipeline Syntax). These pipelines
promote readability, consistency, and version control, making them ideal for teams working in
collaborative and DevOps-centric environments.
By expressing the delivery process as code, declarative pipelines support automation, auditing,
reuse, and integration into GitOps workflows. They also make it easier to reason about the
pipeline, enforce policies, and standardize practices across multiple repositories or teams.

CI/CD Tools
DevOps engineers should be familiar with several tools for managing CI/CD pipelines: Jenkins,
GitLab, Artifactory, and Nexus.
Jenkins and GitLab CI are widely used for automating CI/CD pipelines. Jenkins is an open source
automation server known for its flexibility and extensive plugin ecosystem. It supports custom
pipelines via Groovy-based scripts (the Jenkinsfile) and integrates with virtually any tool.
GitLab CI, built into the GitLab platform, offers a native YAML-based pipeline system tightly
integrated with Git repositories, issue tracking, and container registries, streamlining DevOps
workflows.
Artifactory and Nexus are artifact repository managers used to store, version, and distribute build
artifacts such as JAR files, Docker images, and Helm charts. They act as centralized hubs in CI/CD
pipelines, ensuring reproducible builds, secure artifact sharing, and dependency caching across
teams and environments.

1. A developer pushes a change to the main branch of a Git repository. The project uses a full
CI/CD pipeline with automated tests and deployments. Describe the sequence of stages that the
code change will go through before it is deployed to production.
