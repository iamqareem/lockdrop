---
id: beej-git-05
title: "Beej's Guide to Git — Switch to another branch entirely:, Make a new branch here and…"
slug: beej-git-05-beej-s-guide-to-git-switch-to-another-branch-entirely-make-a
source: "Beej's Guide to Git"
sourceSection: "2. Switch to another branch entirely:, 3. Make a new branch here and check it out:, 3. Commit to complete the merge."
track: git-ops
tier: free
tags: [git, version-control, devops]
summary: "Did you accidentally run git branch -c newbranch when you meant to run git switch -c newbranch? Covers 3 sections: Switch to another branch entirely:, Make a new branch here and check it out:, Commit to complete the merge.."
---
# Beej's Guide to Git — Switch to another branch entirely:, Make a new branch here and…

## 2. Switch to another branch entirely:
git switch main

## 3. Make a new branch here and check it out:
git switch -c newbranch

And now your HEAD is no longer detached.

Chapter 35. Appendix: Errors and Scary Messages

### 35.2 Upstream Branch Name Doesn’t Match Current
Did you accidentally run git branch -c newbranch when you meant to run git switch -c newbranch?
Because if you did, it could land you here:
fatal: The upstream branch of your current branch does not match
the name of your current branch. To push to the upstream branch
on the remote, use
git push origin HEAD:main
To push to the branch of the same name on the remote, use
git push origin HEAD
To choose either option permanently, see push.default in 'git help config'.
To avoid automatically configuring an upstream branch when its name
won't match the local branch, see option 'simple' of branch.autoSetupMerge
in 'git help config'.

Let’s check our branch names to see what’s going on:
$ git branch -vv
fc645f2 [origin/main] line 2
- newbranch 7c21054 [origin/main: behind 1] line 1

That tells us our local branch names and, in brackets, the corresponding remote-tracking branch. Notice
anything fishy?
It seems main corresponds with origin/main.
And that newbranch also corresponds with origin/main! How?!
Well, when you did git branch -c newbranch, that copies the current branch (main in this example)
into the other branch, including its remote-tracking branch. Bad news, since you really want newbranch
to correlate to origin/newbranch, if anything.
You have a few options.
1. You want to push newbranch up to the origin and track it as origin/newbranch.
Just do this to push and change the remote-tracking branch name:
$ git push -u origin newbranch

2. You just want this to be a local branch and don’t need it on the remote.
In this case, just unset the upstream:
$ git branch --unset-upstream newbranch

### 35.3 Current Branch Has No Upstream Branch
Trying to push and getting this message?
fatal: The current branch topic1 has no upstream branch.
To push the current branch and set the remote as upstream, use

### 35.3 Current Branch Has No Upstream Branch

git push --set-upstream origin topic1
To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'

This just means there’s no upstream tracking branch for topic1—it’s just a local branch.
If you do want to push this branch, just follow the suggested instruction.
If you are pushing from the wrong branch by accident, switch to the right one first.

Chapter 35. Appendix: Errors and Scary Messages

Chapter 36

Appendix: Just Enough Vim
Vim1 is a very-commonly installed editor with a steep learning curve.
This appendix is here just to give you enough Vim to be dangerous!

### 36.1 Launching Vim
It could be you found yourself in Vim because you were committing and you didn’t use -m to specify a
message. You’ll know it if you see some ~ characters down the left and some kind of status bar at the
bottom.
Or you might have launched it yourself with something like this, to edit foo.c:
$ vim foo.c

### 36.2 Modal Editing
Vim primarily exists in two modes:
- Insert Mode: This is the mode where you’re pressing keys and the corresponding letters appear in
your document, just like you expect from any normal editor.
- Normal mode: This is the special Vim mode that you’re not familiar with in virtually all other
editors. In this mode, keys have special meaning. For example, the h key moves the cursor one
character to the left.
The editor starts in normal mode! This is why when you get dumped into it none of the keys do
what you want.
The power of Vim comes from memorizing tons of Normal Mode commands. This allows you to move
the cursor and edit at speed. The vimhelp website has a reference of all the normal mode commands2 , just
to give you a rough idea of what’s available.
But at first, when you barely know any Normal Mode commands, modal editing just seems to get in the
way. But as you get better at it, you’ll see it’s actually a really powerful feature.

### 36.3 Going Between Modes
Here are the two main modes:
- To get from normal mode to insert mode, press i.

https://vimhelp.org/index.txt.html#normal-index

Chapter 36. Appendix: Just Enough Vim

- To get from insert mode back to normal mode, press ESC. (That’s the “escape” key in the upper left
of the keyboard.)
There! You’ve learned one normal mode command! i to insert some text!
Try it: launch Vim, type i, then type hello world!, then hit ESC to get back to normal mode.

### 36.4 Moving the Cursor
You can probably use the cursor keys. In fact, your version of Vim might even allow you to use them
without ever leaving insert mode.
Real Vim users move the cursor in normal mode with the following keys.
- Up: k
- Down: j
- Left: h
- Right: l
Muscle memory will eventually take over with these.
If you’re in insert mode, the delete key should generally work as expected, as well.

### 36.5 More Modes
I said there were two main modes, but there are actually more. Here are two more bonus modes:
- To get from normal mode to command-line mode, press :. More on this, below.
- To get from normal mode to search mode, enter /. Type a string to search for.

### 36.6 Command Line Mode
As mentioned earlier, if you’re in normal mode, you can hit : to get to command line mode.
This moves the cursor to the bottom of the screen and allows you to type a command there.
So from now on in this chapter, when I say something like :q!, that means to type those three characters
from normal mode.
If you get into command line mode and want to get back to normal mode, just press return without entering
a command.

### 36.7 Exiting Vim
There are a few ways, and all of them start from normal mode. (So hit ESC after you’re done entering text,
then try to exit.)
- ZZ — exit, saving only if there have been changes
- :wq — exit, saving unconditionally (“write, quit”)
- :q — exit, don’t save
- :q! — exit, don’t save even if there have been changes!
And one more that’s of use for Git:
- :cq — exit with a non-zero (AKA error) exit status
If you do a :cq when entering a commit message in Vim, Git will think something went wrong and not
complete the commit. So if you find yourself in Vim writing a commit message and think, “I didn’t mean
to do this yet!” you can :cq to get out of it. The files will remain on the stage.

### 36.8 Learn More

### 36.8 Learn More
If you have Vim installed, you already have Vim Tutor installed! This is just a file that gets opened and
directs you through using and learning vim.
Launch it with:
$ vimtutor

If you don’t feel like messing with it right now, you can just :q! to quit.
There’s also an interactive online tutorial called OpenVim3 that gets you through the first steps.
Finally, ChatGPT4 or other AIs will be helpful in finding new normal mode commands and answering
questions.
“This your last chance. After this there is no turning back. You take the blue pill, the story ends.
You wake up using your normal editor and edit files whatever way you want to. You take the red
pill, you stay in Vim and I show you how deep the rabbit hole goes.”
—With apologies to Morpheus, The Matrix

https://openvim.com/
https://chatgpt.com/

Chapter 36. Appendix: Just Enough Vim

Chapter 37

Appendix: Other References
“Your book stinks. What other references can I use?”
Here are more! I found these by searching the Internet for Git book recommendations. The only ones I’ve
used are the man pages and Pro Git.
- The man pages
- If you have the manual pages (historically known as the “man pages”) installed on your system,
and you probably do, you can get help for particular Git commands right from the command
line.
For example, if you want to know about git config, you can type:
$ man git-config

(The minus between “git” and “config” might or might not be required depending on your
system, but I’ve never found a place where it doesn’t work.)
Once you’re in there, the arrow keys, space bar, and page up/down probably work to navigate,
and hitting q or Escape probably quits. It depends on the pager your system uses.
These manual pages are very comprehensive, and don’t tend to be easy to read. But all the
information is there! They can also be found in The Git Reference Manual, below.
- Free Stuff!
- Pro Git1 —The Book
- The Git Reference Manual2
- The Git Community Book3
- git cheat sheet4
- Oh Shit, Git!?!5
- Learn Git Branching6
- GitHub Learning Lab7
- Learn Git and GitHub8
- Learn Git9
- Git Immersion10
- Git Internals11

https://git-scm.com/book/en/v2
https://git-scm.com/docs
https://shafiul.github.io/gitbook/index.html
https://wizardzines.com/git-cheat-sheet.pdf
https://ohshitgit.com/
https://learngitbranching.js.org/
https://github.com/apps/github-learning-lab
https://www.codecademy.com/learn/learn-git
9
https://www.atlassian.com/git/tutorials
https://gitimmersion.com/
11
https://github.com/pluralsight/git-internals-pdf?tab=readme-ov-file

Chapter 37. Appendix: Other References

- Post-Production Editing Using Git12
- For Money
- How Git Works13
- Oh Shit, Git14
- Learn Git in a Month of Lunches15
- Getting Started with GitHub16
- Git Pocket Guide17
- Version Control with Git18
- Git in Practice19
- Git for Teams20
- Pragmatic Version Control using Git21
- Mastering Git22
If you know of more, mail them to beej@beej.us.

12

http://sethrobertson.github.io/GitPostProduction/gpp.html
https://wizardzines.com/zines/git/
14
https://wizardzines.com/zines/oh-shit-git/
https://www.manning.com/books/learn-git-in-a-month-of-lunches
https://www.amazon.com/Introducing-GitHub-Non-Technical-Peter-Bell/dp/1491949740
17
https://www.amazon.com/Git-Pocket-Guide-Working-Introduction/dp/1449325866
18
https://www.amazon.com/Version-Control-Git-collaborative-development/dp/1449316387
https://www.amazon.com/Git-Practice-Techniques-Mike-McQuaid/dp/1617291978
https://www.amazon.com/Git-Teams-User-Centered-Efficient-Workflows/dp/1491911182
https://pragprog.com/titles/tsgit/pragmatic-version-control-using-git/
22
https://www.amazon.com/Mastering-Git-proficiency-productivity-collaboration/dp/1783553758
13

Chapter 38

Quick Reference
Quickly look up commands based on what you want to do! Caveat: this list is grotesquely incomplete!
See your man pages for more info!
In this reference section we use the following substitutions:
- URL: Some URL either SSH, HTTP, or even a local file, usually the URL you cloned from.
- FILE: Path to file, e.g. foo/bar.txt, etc.
- DIR: Path to directory, e.g. foo/, etc.
- PATH: Path to directory or file
- BRANCH: Some branch name, e.g. main, etc.
- REMOTE: A remote name, e.g. origin, upstream, etc.
- HASH: Some commit hash—you can get a commit hash from git log or git reflog.
- CMMT: a commit hash, branch, etc. Anything that refers to a commit. Officially this is called a
tree-ish, but that was more letters than I wanted to repeatedly type.
- VARIABLE: a Git config variable name, usually words separated by periods.
- VALUE: an arbitrary value for Git configs.
- TAG: a tag name
Also, don’t type the $—it’s the shell prompt. And everything after a # is a comment. A backslash \ at the
end of a line indicates that it continues on the next line.

### 38.1 Glossary
- Clone: a duplicate (or to duplicate) a remote repo, commonly for local use.
- Commit: a snapshot of all the files in the repo at a point in time.
- Fork: a GitHub construct to make a clone of someone else’s GitHub repo under your GitHub
account.
- HEAD: the commit that is currently checked out/switched to.
- Index: another name for the stage.
- main: a common the first branch created.
- master: another common name for the first branch created.
- origin: the default name for the remote from which this repo was cloned.
- Pull request: a way to get changes you made in your fork of a repo back into the repo you forked
from.
- Remote: an alias for a URL to another repo. Usually an HTTP or SSH URL.
- Stage: where you collect files to be bundled into a commit.
- upstream: the conventional name of the remote that you forked from. Not set up automatically.
- Working Tree: the collection of files you can see, which might have changes from the commit at
HEAD.
- WT: shorthand for working tree.

### 38.2 File States
- Untracked to:
- Unmodified: git add FILE
- Unmodified to:
- Modified: Edit with your editor and save
- Untracked/deleted: git rm --cached FILE
- Modified to:
- Staged: git add FILE
- Unmodified: git restore FILE (discards changes)
- Untracked/deleted: git rm --cached FILE
- Staged
- Unmodified: git commit FILE (finalize commit)
- Modified: git restore --staged FILE (unstage)
- Both modified: git checkout --merged FILE (during merge)

### 38.3 Configuration
For all git config commands, specify --global for a universal setting or leave it off to set the value
just for this repo.
$ git config set VARIABLE VALUE
$ git config get VARIABLE
$ git config list
$ git config unset VARIABLE
$ git config --edit

#### 38.3.1 Set identity
Username and email:
$ git config set --global user.email "your-email@example.com"

SSH identity:
$ git config set core.sshCommand \
"ssh -i ~/.ssh/id_alterego_ed25519 -F none"

#### 38.3.2 Set default branch
This is the first branch created when you make a new repo.
$ git config set --global init.defaultBranch BRANCH

Common names are main, master, trunk, and development. This guide uses main.

#### 38.3.3 Set default pull behavior to merge or rebase
$ git config set --global pull.rebase false
$ git config set --global pull.rebase true

### 38.3 Configuration

#### 38.3.4 Set default editor, difftool, and mergetool
Set the default editor to Vim, and the default mergetool and difftool to Vimdiff, turn off prompting for the
tools, and turn off mergetool backups:
$ git config set core.editor vim
$ git config set diff.tool vimdiff
$ git config set difftool.prompt false
$ git config set difftool.vimdiff.cmd 'vimdiff "$LOCAL" "$REMOTE"'
$ git config set merge.tool=vimdiff
$ git config set mergetool.vimdiff.cmd \
'vimdiff "$LOCAL" "$REMOTE" "$MERGED"'
$ git config --global set mergetool.keepBackup false

#### 38.3.5 Colorful Git output
$ git config set color.ui true

#### 38.3.6 Autocorrect
Autocorrect will automatically run the command it thinks you meant. For example, if you git poush, it
will assume you meant git push.
$ git config set help.autocorrect 0
$ git config set help.autocorrect 7

$ git config set help.autocorrect immediate
$ git config set help.autocorrect prompt
$ git config set help.autocorrect never

#### 38.3.7 Newline translation
Handle automatic newline translation. Recommend set to true for Windows (not WSL) and false everywhere else.
$ git config set core.autocrlf true # Windows (non-WSL)
$ git config set core.autocrlf false # WSL, Linux, Mac, C64, etc.

Obsolete commands for older versions:
git config user.email
git config user.email "user@example.com"
git config --unset user.email
git config --list
git config --edit

#### 38.3.8 Aliases
Setting aliases, some examples:
$ git config set --global alias.logn 'log --name-only'
$ git config set alias.aa "add --all"
$ git config set alias.logc "log --oneline --graph --decorate"
$ git config set alias.diffs "diff --staged"

$ git config set alias.lol "log --graph"\
" --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s"\
" %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

Getting aliases:
$ git config get alias.logx
$ git config get --all --show-names --regexp '^alias\.'
$ git config set alias.aliases \
"config get --all --show-names --regexp '^alias\.'"

Tracing an alias run:
$ GIT_TRACE=1 git logx

### 38.4 Creating and Cloning Repos
$ git clone URL
$ git clone URL DIR
$ git init DIR
$ git init .

### 38.5 Adding, Renaming, Deleting, Committing
$ git add PATH
$ git mv FILE1 FILE2
$ git mv FILE2 FILE1
$ git rm FILE
$ git add -p FILE

$ git commit
$ git commit -m "message"

Amending commits—don’t amend commits you have pushed unless you know what you’re getting into!
$ git commit --amend
$ git commit --amend -m "message"
$ git commit --amend --no-edit

To undelete a staged file, run these two commands in sequence:
$ git restore --staged FILE
$ git restore FILE

To undelete a deleted file, you could manually recover it from an old commit, or revert the commit that
deleted it.

### 38.6 Getting Status

### 38.6 Getting Status
$ git log --name-only
$ git log CMMT
$ git log CMMT1 CMMT2

$ git log CMMT1..CMMT2

$ git log CMMT1...CMMT2

### 38.7 Getting a Diff
$ git diff HEAD^
$ git diff HEAD^^
$ git diff HEAD~3 HEAD~2
$ git diff CMMT
$ git diff CMMT1 CMMT2

$ git diff CMMT1...CMMT2

$ git diff HEAD~3^!
$ git diff -- FILE
$ git diff HEAD^ -- FILE

$ git diff -U5
$ git diff -w
$ git diff --name-only
$ git diff --staged
$ git difftool

### 38.8 Branches
A local branch looks like branchname. A remote tracking branch looks like remote/branchname.
$ git switch BRANCH
$ git switch --detach HASH
$ git switch -

$ git switch --detach HEAD^
$ git switch --detach HEAD^^ # Switch to 2 commit ago
$ git switch --detach HEAD~3 # Switch to 3 commits ago
$ git switch --detach HEAD~99 # Switch to 99 commits ago

$ git branch -v
$ git branch -va

$ git switch -c BRANCH
$ git branch BRANCH
$ git branch BRANCH1 BRANCH2

$ git branch -d BRANCH
$ git branch -D BRANCH

Obsolete style (use switch if you can):
$ git checkout CMMT
$ git checkout HEAD^
$ git checkout HEAD~2

### 38.9 Pulling and Pushing, and Fetching
$ git pull --ff-only
$ git pull --rebase
$ git pull --no-rebase

$ git push REMOTE BRANCH

$ git push -u REMOTE BRANCH

$ git push -u origin branch99

$ git push --tags
$ git push REMOTE --tags
$ git push REMOTE tag3.14

$ git fetch
$ git fetch REMOTE # Same, for a specific remote

### 38.10 Merging
$ git merge CMMT
$ git merge --abort
$ git mergetool

$ git checkout --merged FILE

In a conflict occurs, you can always --abort. Otherwise:

### 38.11 Remotes

1. Fix the conflict.
2. Add the fixed files.
## 3. Commit to complete the merge.

### 38.11 Remotes
$ git remote set-url REMOTE URL
$ git remote add REMOTE URL
$ git remote rename REMOTE1 REMOTE2
$ git remote remove REMOTE

### 38.12 Ignoring Files
Add a .gitignore file to your repo. It applies to this directory and all non-submodule subdirectories
below it. Add descriptions of files to ignore to this file. Comments behind # are allowed. Blank lines are
ignored.
Example .gitignore:
foo.aux
foo.*
frotz/
foo[12].txt # Ignore "foo1.txt" and "foo2.txt"
foo?
frotz/bar
*

Exceptions to earlier rules, also useful in .gitignore files in subdirectories to override rules from parent
directories:
*.txt
!keep.txt

### 38.13 Rebasing
$ git rebase CMMT

$ git rebase -i CMMT

$ git rebase --continue
$ git rebase --skip
$ git rebase --abort

$ git pull --rebase
$ git pull --no-rebase

### 38.14 Stashing
Stashes are stored on a stack.

$ git stash push
$ git stash
$ git stash FILE
$ git stash list

$ git stash pop 'stash@{1}'
$ git stash pop --index 1
$ git stash drop 'stash@{1}'
$ git stash drop --index 1

### 38.15 Reverting
$ git revert CMMT
$ git revert -n CMMT

$ git revert CMMT1 CMMT2
$ git revert CMMT1^..CMMT2
$ git revert --continue
$ git revert --skip
$ git revert --abort

### 38.16 Resetting
All resets move HEAD and the current checked out branch to the specified commit.
$ git reset --mixed CMMT
$ git reset CMMT
$ git reset --soft CMMT
$ git reset --hard CMMT

$ git reset -p CMMT

Obsolete usage:
$ git reset FILE

### 38.17 The Reflog
$ git reflog

…I admit this section could use a bit more information.

### 38.18 Cherry-pick
$ git cherry-pick CMMT

### 38.19 Blame

### 38.19 Blame
$ git blame FILE
$ git blame --date=short FILE

### 38.20 Submodules
$ git clone --recurse-submodules URL
$ git submodule update --recursive --init

$ git submodule add URL
$ git add DIR
$ git pull --recurse-submodules

$ git submodule status
$ git ls-tree HEAD DIR
$ git submodule init
$ git submodule update
$ git submodule update --recursive

Deleting a submodule—do these in order. In this example, DIR is the name of the submodule directory.
$ git submodule deinit DIR
$ rm -rf .git/modules/DIR
$ git config -f .gitmodules --remove-section submodule.DIR
$ git add .gitmodules
$ git rm --cached DIR
$ git commit -m "remove DIR submodule"

### 38.21 Tags
$ git tag
$ git tag -l

$ git tag TAG
$ git tag TAG CMMT
$ git tag -a TAG
$ git tag -a TAG CMMT # On a specific commit
$ git tag -a TAG -m "message" # Add a message to the tag

$ git push --tags
$ git push REMOTE --tags
$ git push REMOTE tag3.14

$ git tag -d tagname
$ git push REMOTE -d tagname

### 38.22 Worktrees
$ git worktree list

$ git worktree add DIR CMMT
$ git worktree add --detach DIR CMMT
$ git worktree add DIR HASH
$ git worktree remove DIR
$ git worktree remove --force DIR

Index
Alias, see Alias
Autocorrect, 189
Color output, 189
Commonly-set variables, 133
Conditional, 134
Default branch, 8, 188
Delete, 133
Deprecated usage, 135
Difftool, 189
Editing directly, 134
Editor, 189
Get, 133
GPG signing key, 142–143
Listing, 132
Local, 131–132
Mergetool, 189
Name and email, 8, 141, 188
Newline translation, 189
Pull rebase behavior, 188
Set, 133
SSH identity, 141–142, 188
SSH signing key, 143
Unset, 133

.git directory, 9, 43

Preventing in home, 44
Removing, 44
.gitignore file, 45–48, 193
Boilerplate, 48
Location, 46
Negated rules, 47
Wildcards, 47
With subdirectories, 46
Add, 11–12, 190
Alias, 137–139, 189–190
Creating, 137
Debugging, 138–139
Displaying, 138
Examples, 138
Bare repo, 170
Blame, 129, 195
Fancier output, 129
Branch, 27–35, 191–192
Creating, 31–32
Deleting, 34
Deleting remote, 56–57
Deleting remote tracking, 56–57
Diff, see Diff, Between branches
Divergent, 37
Listing, 30–31
Listing remote tracking, 54
main, 27
Moving, 113–114
on GitHub, see GitHub, Branches
On remote, 53–54
Pushing to remote, 54
Remote tracking, 53–58
Set upstream, 54–56
Topic, 35
Checkout, 24–25, 192
Cherry-pick, 125–128, 194
Conflicts, 128
Clone, 7–8, 170, 190
Collaboration
Across branches, 75–79
Commit, 5, 12–13, 190
Amending, 145–146, 190
Amending commit messages, 145–146
Amending files, 146
Communication, 75
Configuration, 8, 131–135, 188–190

Detached HEAD, see HEAD, Detached
Diff, 11, 63–68, 191
Additional context, 67
Between branches, 68
File names only, 67
Ignore whitespace, 67
Other branches, 65
Other commits, 65
Parent commit, 66
Specific files, 67
The stage, 64–65
Understanding the output, 63–64
Difftool, 147–148
Configuration, 148
Errors, 177–179
Branch name doesn’t match, 178
Detached HEAD, 177
No upstream branch, 178–179
Exiting editors, 175
Fast-forward, see Merge, Fast-forward
Fetch, 29, 57, 58, 83, 101, 111, 113, 158, 192
Pruning remote tracking branches, 57
File States, 59–61
Modified, 59

INDEX

Multiple, 61
Staged, 59
Unmodified, 59
Untracked, 59
Fork, 95–101
Creating, 96
Process, 95
Syncing with Upstream, 97, 100–101
git add, see Add
git add -p, see Patch mode
git blame, see Blame
git branch, see Branch
git checkout, see Checkout
git cherry-pick, see Cherry-pick
git clone, see Clone
git commit, see Commit
git config, see Configuration
git diff, see Diff
git fetch, see Fetch
git log, see Log
git merge, see Merge
git mv, see Move
git pull, see Pull
git push, see Push
git push --set-upstream, see Branch, Set up-

stream
git push -u, see Branch, Set upstream
git rebase, see Rebase
git reflog, see Reflog
git remote, see Remote
git rerere, 86
git reset, see Reset
git reset -p, see Patch mode
git restore, see Restore
git revert, see Revert
git rm, see Remove
git stash, see Stash
git status, see Status
git switch, see Switch
git tag, see Tag
git worktree, see Worktree

Gitea, 6
GitHub, 6, 15–20
Account creation, 15
Adding collaborators, 20
Authentication, 16
Branches, 56
Cloning, 19
Cloning with GitHub CLI, 19
Cloning with SSH, 19
GitHub CLI setup, 16
Repo creation, 15
SSH setup, 16
GitLab, 6
HEAD, 22–24

Commits relative to, 25
Detached, 23, 24, 29–30, 167, 177

With branches, 29
Identity, 141–143
Ignoring files, see .gitignore
Index, see Stage
Log, 21–22, 191
main, see Branch, main
master, see Branch, master

Merge, 28, 33–34, 37–42, 192
Compared to rebasing, 81–82
Conflicts, 38–42
Fast-forward, 33–34
Mergetool, 149–152
File backups, 152
With Vimdiff, 150–152
Move, 69–70, 190
Reverting, 69
Unstaging, 69–70
origin, see Remotes, origin
origin/main, see Branch, Remote tracking

Patch mode, 119–124
Add, 119–121
Reset, 121–123
Playground, 169–173
Automating, 172–173
Cloning, 170
Pull, 7, 192
Force rebase or merge, 29, 193
Pull request
Creating, 97–98
Deleting, 100
Merging, 98–99
With branches, 99–100
Pull requests, 95–101
Pulling, 172
Push, 7, 13–14, 20, 192
Branch to remote, 54–56
Forced, 112–113
Tags, 164
Pushing, 171
Rebase, 81–90, 193
And pulling, 83
Compared to merging, 81–82
Conflicts, 84–86, 89–90
Fixup, 89
Squashing commits, 86–89
When to use, 83
Recursion, see Recursion
Reference Material, 185–186
Free, 185
man pages, 185
Non-free, 186
Reflog, 115–118, 194
Finding an orphan commit, 115–118

INDEX
Selectors, 118
Uses, 115
Remote, 49–51, 193
Adding, 50–51
Listing, 49
Multiple, 57–58
origin, 10, 49
Remote branches, 49
Setting the URL, 50
Sync with upstream, 51
upstream convention, 51
Remove, 70–73, 190
Secrets, 72–73
Unremoving from earlier commits, 71–72
Unstaging, 70–71, 190
Rename, see Move
Reset, 107–114, 194
Files, 110–111
Hard, 110
Mixed, 109–110
Pushing to remote, 111
Soft, 108–109
To divergent branch, 110
Revert, 103–105, 194
Conflicts, 104–105
Multiple commits, 105
Shell scripts, 172
Stage, 11–12
Stash, 91–94, 193
Conflicts, 93–94
New files, 94
The stack, 92–93
Status, 9, 10, 191
Subdirectories, 43–44
Empty, 44
Submodules, 153–161, 195
Creating, 154–156
Deleting, 160–161, 195
Getting latest, 158
Setting the commit, 156–158
Status, 159–160
Updating, 158–159
Subprojects, 43
Switch, 23, 25, 191–192
Tag, 163–164, 195
Annotated, 164
Creating, 163–164
Deleting, 164
Lightweight, 163
Listing, 163
Pushing, 164
Translations, 2
Undelete, see Remove, Undelete
Untracking files, 60
Workflow

Basic, 6–14
Dev branch, 77–79
File states, 59
One Branch, 76
One Branch per Dev, 76–77
Worktree, 165–167, 196
Choosing location, 165
Creating, 166
Detached HEAD, 167
Listing, 167
main worktree, 165
Removing, 166–167
