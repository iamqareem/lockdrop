---
id: beej-git-04
title: "Beej's Guide to Git — Decide, at this point, you’re giving up on topic1. Switch back to…"
slug: beej-git-04-beej-s-guide-to-git-decide-at-this-point-you-re-giving-up-on
source: "Beej's Guide to Git"
sourceSection: "5. Decide, at this point, you’re giving up on topic1. Switch back to the main branch and force delete, 2. Go to the next conflict., 3. Repeat from Step 1 until all conflicts are resolved., 2. Switch to the commit that you want to use. You can refer to this commit by branch name, commit, 5. Commit."
track: git-ops
tier: free
tags: [git, version-control, devops]
summary: "At this point let’s say we want to look back at the commits we made on bar.txt. Covers 5 sections: Decide, at this point, you’re giving up on topic1. Switch back to the main branch and force delete, Go to the next confl."
---
# Beej's Guide to Git — Decide, at this point, you’re giving up on topic1. Switch back to…

## 5. Decide, at this point, you’re giving up on topic1. Switch back to the main branch and force delete
topic1.
6. Decide, at this point, that actually you need to look back at that commit in topic1 for some reason.
But you deleted the branch. Whoops.
7. Look in the reflog for the commit on topic1 that you want.
8. Switch to that commit (detaching the HEAD).
And here that is in Git, at least the first five steps:
$ echo 'Line 1' > foo.txt
$ git add foo.txt
$ git commit -m 'added foo.txt'
[main (root-commit) 90bd7cc] added foo.txt
1 file changed, 1 insertion($)
create mode 100644 foo.txt
$ git switch -c topic1
Switched to a new branch 'topic1'
$ echo 'Line 1' > bar.txt
$ git add bar.txt
$ git commit -m 'added bar.txt'
[topic1 4219f83] added bar.txt
1 file changed, 1 insertion($)
create mode 100644 bar.txt
$ echo 'Line 2' >> bar.txt
$ git add bar.txt
$ git commit -m 'appended to bar.txt'
[topic1 bf8b8cf] appended to bar.txt
1 file changed, 1 insertion($)
$ git switch # Switch back to main
$ git branch -D topic1
Deleted branch topic1 (was bf8b8cf).

At this point let’s say we want to look back at the commits we made on bar.txt. Good luck with git log!
commit 90bd7cc6c3c530798872827ba02cb7db4fd422c2 (HEAD -> main)
added foo.txt

That’s it? Where’s all the bar.txt stuff? Well, it was on the topic1 commits, which were descendants
from this commit 90bd7. Because git log only shows ancestors, we’re not seeing any of the bar.txt
changes.
So, finally, we arrive at the entire topic of this chapter: the reflog. Let’s take a peek.
$ git reflog
90bd7cc (HEAD -> main) HEAD@{0}: checkout: moving from topic1 to
bf8b8cf HEAD@{1}: commit: appended to bar.txt
4219f83 HEAD@{2}: commit: added bar.txt
90bd7cc (HEAD -> main) HEAD@{3}: checkout: moving from main to
topic1
90bd7cc (HEAD -> main) HEAD@{4}: commit (initial): added foo.txt

### 20.2 Looking Back at an Orphan Commit

Hey, that’s more like it! I see the changes I made to bar.txt in there! And I see the commit hash on the
left! This means I can switch to that commit!
$ git switch --detach bf8b8cf
HEAD is now at bf8b8cf appended to bar.txt
commit bf8b8cf826bbf667cdd088cfcecbc1086c24de3b (HEAD)
appended to bar.txt
commit 4219f83f22f8a90cb8d57128501facb58b292003
added bar.txt
commit 90bd7cc6c3c530798872827ba02cb7db4fd422c2 (main)
added foo.txt

There’s the log… and we have the file contents?
$ cat bar.txt

Yup!
Let’s switch back to main and see what happens.
$ git switch Warning: you are leaving 2 commits behind, not connected to
any of your branches:
bf8b8cf appended to bar.txt
4219f83 added bar.txt
If you want to keep them by creating a new branch, this may be a good
time to do so with:
git branch <new-branch-name> bf8b8cf

This is Git telling us, “Hey, I’m going to garbage collect these two commits after the 90 days are up. If
you want to keep them, attach a branch to them.”
And it’s helpfully telling us how to do that.
So even though we force deleted topic1 earlier, we could now simply recreate it if we didn’t mean to do
that. Let’s do that.
$ git branch topic1 bf8b8cf
$ git switch topic1

Chapter 20. The Reference Log, “reflog”

Switched to branch 'topic1'
$ cat bar.txt

As you can see, the reflog can get you out of all kinds of trouble when you thought you’d lost commits
for good.

### 20.3 Reflog Selectors
Let’s take a look at that example reflog output again:
$ git reflog
598c84e (HEAD -> main) HEAD@{0}: checkout: moving from topic1 to
dc3d6a3 HEAD@{1}: commit: appended to bar.txt
0789880 HEAD@{2}: commit: added bar.txt
598c84e (HEAD -> main) HEAD@{3}: checkout: moving from main to
topic1
598c84e (HEAD -> main) HEAD@{4}: commit (initial): added foo.txt

See that HEAD@{3}-type stuff in there? You can use those to check out specific commits (instead of using
the commit hash, for example).
Now, HEAD@{3} doesn’t mean “3 commits before HEAD”. But it is an identifier you can use to switch to
a particular commit.
$ git switch --detach HEAD@{1}
HEAD is now at dc3d6a3 appended to bar.txt

Just like that.

Chapter 21

Patch Mode: Applying Partial Changes
A lot of Git commands obey the -p switch that puts them in patch mode. This is a powerful mode that
allows you to select some of the changes for a particular command, but not all of the changes.
Commands that use -p include add, reset, stash, restore, commit, and more.
Basically any time you have changes to a file and you’re thinking, “I want to do something with just some
of these changes”, patch mode will help you out.
Some terminology: Git calls a collection of close changes a hunk. An example might be if you modified
function foo() by adding a few lines and modified function bar() by adding a few lines, you would
likely have two hunks, one for each group of changes.
Patch mode allows you to select which hunks will be operated on.

### 21.1 Adding Files in Patch Mode
Let’s say you had a commit that added Line 1 to Line 8 in a file:

And we make a couple changes, adding a line to the top and bottom:
Line BEGIN
Line END

And I’m about to add and commit, but I realize that I only want to add Line BEGIN at this time, and not
Line END.

Chapter 21. Patch Mode: Applying Partial Changes

If I did a regular git add, it would add both changes to the stage. But if I do git add -p, we can select
one or the other. Let’s try it.
First let’s have a look at our diff.
index a982fdc..125f6ac 100644
@@ -1,3 +1,4 @@
+Line BEGIN
@@ -6,3 +7,4 @@ Line 5
+Line END

Poring over that, you see we’ve added Line BEGIN to the top and Line END to the bottom. (Recall that
lines with + in front of them are additions in diff.)
Now let’s do a patch add.
$ git add -p
index a982fdc..125f6ac 100644
@@ -1,3 +1,4 @@
+Line BEGIN
(1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,p,?]?

Well, that’s a lot of options! The easy ones are y for “yes” and n for “no”. And also you can type ? to get
more detailed help.
Also we see that this is hunk 1 of 2, which makes sense because we have one change at the top of the file
and another at the bottom.
In our case, we do want to keep this first hunk, so we’ll answer y.
And then we get to hunk 2 of 2:
(1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,p,?]? y
@@ -6,3 +7,4 @@ Line 5
+Line END
(2/2) Stage this hunk [y,n,q,a,d,K,g,/,e,p,?]?

And for this one, I’m going to say n to not stage it. Then we’re back out to the shell prompt.
Now I’m going to type git status to see where we are, but first I want you to think about what it’s going
to tell us.

### 21.2 Resetting Files in Patch Mode

We have one of the changes staged, and the other change not staged. What state are files in when they
have unstaged changes? And when there are staged changes? We have both right now, right?
(use "git restore <file>..." to discard changes in working directory)

Sure enough! Because we only did a partial add of the changes in the file, the added changes are on the
stage, and the not-added changes are still out in the working directory. It has to be this way because we
haven’t staged all our changes!
At this point we can go ahead and commit the partially-added changes that are on the stage.

### 21.2 Resetting Files in Patch Mode
Kind of the opposite of git add -p is git reset -p. You can use reset -p to selectively change hunks
on the stage.
It’s that last part that makes it a bit weird, but you can think of add -p as selectively adding hunks to
the stage from the working tree, and reset -p as selectively removing hunks from the stage relative to a
particular commit.
That is, I can reset to an earlier commit, but choose what hunks to reset.
This is not a hard, soft, or mixed reset. It’s its own thing. If you try to specify a certain type of
reset in addition to -p, Git will complain. Arguably this should be a different command entirely,
but that’s Git for ya!
Let’s say I have two commits. In the first one, I added Line 1 through Line 8, and in the second commit
I added Line BEGIN and Line END, just like in the earlier example.
But now I decide I want to reset the Line END, but it’s part of another commit. I can break it out with
git reset -p. Let’s do it.
Here’s my log:
commit d2d5899a253d5ce277d4d5981d03a43e68da6677 (HEAD -> main)
Fri Oct 11 16:12:26 2024 -0700
updated
commit aae754f46130b6d86680e74caa98642becc88d6e
Fri Oct 11 16:12:04 2024 -0700

I want to do a partial reset to the earlier commit aae75. And I’m going to say “no” I don’t want to reset
the first hunk, and “yes” I want to reset the second. Here’s what it looks like:

Chapter 21. Patch Mode: Applying Partial Changes

$ git reset -p aae75
diff --git b/foo.txt a/foo.txt
index 125f6ac..a982fdc 100644
--- b/foo.txt
+++ a/foo.txt
@@ -1,4 +1,3 @@
-Line BEGIN
(1/2) Apply this hunk to index [y,n,q,a,d,j,J,g,/,e,p,?]? n
@@ -7,4 +6,3 @@ Line 5
-Line END
(2/2) Apply this hunk to index [y,n,q,a,d,K,g,/,e,p,?]? y

The first question is asking, “Do you want to remove ‘Line BEGIN’?” And I said “no”. And the second
question is asking “Do you want to remove ‘Line END’?” And I said “yes”.
Where are we?
(use "git restore <file>..." to discard changes in working directory)

Hmm. Let’s check the difference between the stage and HEAD.
$ git diff --staged
index 125f6ac..e0e1d89 100644
@@ -7,4 +7,3 @@ Line 5
-Line END

That’s telling us that, compared to HEAD, the stage has the Line END removed. Which is great, because
that’s what we asked for with reset -p. So we’re on track.
But why is foo.txt modified? Let’s see:
index e0e1d89..125f6ac 100644

### 21.2 Resetting Files in Patch Mode

@@ -7,3 +7,4 @@ Line 5
+Line END

This is telling us that, compared to the stage, the working tree has Line END added to the end.
And sure enough, if we look at the foo.txt file in the working tree, it still has Line END in it.
$ cat foo.txt
Line BEGIN
Line END

What does it all mean? Well, it means reset -p messed with the stage, but not with the working tree.
Our working tree is still the same as it was with the last commit. (git diff HEAD will show no changes.)
Now, admittedly, it’s likely this isn’t what you want. Maybe you wanted to reset the hunk and get your
working tree reset to that hunk, as well.
But we can still get there! Remember that the reset hunk is on the stage ready to be committed! Let’s do
that!
$ git commit -m "remove END"
[main 46badfe] remove END

There. Now the stage and HEAD are the same, both having had Line END removed. But Line END still
exists in our working tree, like status informs us:
(use "git restore <file>..." to discard changes in working directory)

So how do we get the reset change back into our working tree? The answer is right there in the hints.
$ git restore foo.txt

There. Now we’re all on the same page with the Line END removed entirely.
There’s another way to synchronize the stage and working tree during a patch reset. After
you do the reset -p, you can copy the file foo.txt from the stage to the working tree with:
git checkout -- foo.txt

That will make the stage and working tree the same, so everything will all be on the same page
when the commit is complete.

Chapter 21. Patch Mode: Applying Partial Changes

### 21.3 Other Patch Mode Commands
You can use -p with stash, restore, commit, and more. The UI behaves basically the same way as
described above. See the manual pages for any particular command to learn more about it.

Chapter 22

Cherry-Pick: Bringing in Specific
Commits
Let’s say you’re working on branch1 and you have made a bug fix to branch2. You’re not ready to
merge all the changes in from branch2 into branch1, but you really want just that bug fixed.
Luckily, there’s a way to do that! You can merge a single commit into your branch with git cherry-pick.
You just have to tell it which commit to bring in.

### 22.1 Cherry-Pick Example
Let’s have a file on the main branch called foo.txt that has the following contents stored in an initial
commit:

Very exciting file, that.
Now let’s switch to another branch, call it branch, inspirationally.
And on this branch, we do some things. First, we add a couple lines to the end and commit.
Branch: Line 101

Chapter 22. Cherry-Pick: Bringing in Specific Commits

Branch: Line 102

And then we add a line to the middle, and commit again.
BRANCH: INSERTED LINE 5
Branch: Line 101
Branch: Line 102

Additionally let’s create a branch here called checkpoint to make this demo a little easier. You don’t
have to do this, but it’ll enable us to cherry-pick this commit by its branch name instead of by its commit
hash. Or you could skip this step and just use the hash.
$ git branch checkpoint

This doesn’t switch branches. It just makes a new branch on this commit. HEAD is still pointing
to branch like before.
Lastly, let’s add a couple more lines to the end, and commit one last time.
So here’s the file as it exists on branch:
BRANCH: INSERTED LINE 5
Branch: Line 101
Branch: Line 102
Branch: Line 103
Branch: Line 104

And let’s look at the log to see what we have:
commit 9336292f73b4ace717644336f72458681c1bb761 (HEAD -> branch)
branch: added line 103-104
commit 407f212f12f79902818431a174706cfdc30d509b (checkpoint)

### 22.1 Cherry-Pick Example

branch: inserted line 5
commit 9533e0bdd5cba7d65401c3180b34b01700a7906e
branch: added line 101-102
commit d6953bd746c813f5ba545cf0fd6044fd78e2c617 (main)

Okay—that’s the set-up part of the demo. Now it’s time to cherry-pick!
What we’re going to want to do for the demo is switch back to main and then cherry-pick the one commit
that inserts line 5 in the middle. You can always use its commit hash (407f2) for this, but we left behind
that branch checkpoint there we can use instead.
Let’s do it.
$ git cherry-pick checkpoint
[main 9254663] branch: inserted line 5
Date: Sun Oct 20 13:08:30 2024 -0700

What that should have done is bring in that newly-inserted line 5, and none of the other changes. Let’s
look at foo.txt from main:
BRANCH: INSERTED LINE 5

And there it is!
Wait—wasn’t that just a merge? Not quite! Notice that we had added lines 101-102 in branch
before we inserted line 5. And yet that earlier commit is not reflected in main. We cherry-picked
that single commit with line 5 out of the stream of commits, ignoring the other ones before and
after it!
Now let’s look at git log on main:

Chapter 22. Cherry-Pick: Bringing in Specific Commits

commit 92546636d05fa85218ca18a0cd705ddc14fa8b64 (HEAD -> main)
branch: inserted line 5
commit d6953bd746c813f5ba545cf0fd6044fd78e2c617

There are two amazing things to notice here:
1. The author information was preserved in the log message. Notice it’s branch-user@example.com
and not user@example.com, even though it was the latter who did the cherry-pick. This might not
be entirely surprising, except…
2. The cherry-picked commit hash is different in main than in branch! In branch, it’s 407f2, and
here it’s 92546. But it has to be that way because it’s got all new content. That is, there’s no other
commit anywhere in the commit graph where foo.txt looks like this, so it has to have a unique
commit hash1 .
But not every cherry-pick will go as smoothly as that!

### 22.2 Cherry-Pick Conflicts
Yes, you can get conflicts with a cherry-pick, of course. This might happen because you’ve changed some
of the same lines as the commit you’re cherry-picking, or maybe because the cherry-picked commit has
some contextual lines of code that you don’t have.
In any case, conflict resolution happens in the much the same way as with merge or rebase. If you need
to, refamiliarize yourself with the content from those chapters.
But by now I hope the process seems familiar. First, make the file Right, then add it, and then you’ll
continue (like with a rebase) with git cherry-pick --continue. Keep doing that until everything’s
merged together cleanly.

Even if the changes were identical, the commit hash would still be different because the hash takes all kinds of other metadata
into account.

Chapter 23

Who’s to Blame for this Code?
Let’s say you find something in the shared codebase that’s just wrong. Or, charitably, we’ll say you found
something interesting.
And you want to know who was to blame for that incredible code.
This is where a simple Git command can enlighten you.
Here’s some example truncated output (so that it fits in the book margins):
$ git blame --date=short foo.py
8c96991f (Alice 2024-10-08 4) def encode_data(message, value):
8c96991f (Alice 2024-10-08 5)
encoded_message = message.enco
8c96991f (Alice 2024-10-08 6)
encoded_value = value.to_bytes
3b0b0e76 (Chris 2024-10-09 7)
length = len(encoded_message)
3b0b0e76 (Chris 2024-10-09 8)
encoded_length = length.to_byt
8c96991f (Alice 2024-10-08 9)
8c96991f (Alice 2024-10-08 10)
data = encoded_length + encode
8c96991f (Alice 2024-10-08 11)
8c96991f (Alice 2024-10-08 12)
return data

I have the --date=short switch in there to compress it even more so it fits in the book. Otherwise it
would show a full time stamp.
What we see in this fabricated example is that Alice has checked in the majority of this function, but the
next day Chris came in and modified or added those additional lines in the middle.
And now we know.

### 23.1 Fancier Blaming
You can use the --color-lines switch to get color output, alternating colors between commits. Very
exciting. If you want that to always happen, you can set the color.blame.repeatedLines config
option.
We already saw --date=short to chop the date down a bit.
You can show the email address of the contributor with -e or --show-email.
You can reliably detect lines that were moved or copied within a file with -M. And you can do the same
thing across multiple files with -C.
Finally, your IDE (like VS Code) might support blame, either natively or via an extension. Some people
just have this feature turned on all the time.

Chapter 23. Who’s to Blame for this Code?

Chapter 24

Configuration
Waaaaay back at the beginning of this book, we did some Git configuration. We did this:
$ git config set --global user.email "your-email@example.com"

When we did, it added that configuration information to a file and the info in that file applies to all the Git
repos on your system.
Unless you override them with a local config, that is. But stay tuned for more on that later.
Some of you might be saying, “Hey, I’ve never written set before to set variables with
git config!” And you’d be right. But that’s the old, deprecated way of using git config. If
you’re using an older version of Git, the deprecated way might be the only way. So if you’re
getting errors with the new usage, see Older Git Versions, below.
Let’s look at one of those lines again:
↑
↑
variable
value

There are two main things in this line.
1. A variable, that is, the thing we’re setting the value of.
2. A value, the value we’re giving that variable.
In that case, the variable is user.name and the value is "Your Name".
What those two variables, user.name and user.email, are doing is they’re setting the values
that will go in your commit messages! That’s your identity when you commit! A side note here
it that it’s incredibly easy to impersonate anyone else in the world just by putting their name and
email there. To mitigate this, one option is to digitally sign your commitsa , something you can
read a little bit more about in the Changing Identity chapter.

https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work

If the commands in this chapter are giving you errors, see the section on older Git versions, below.

### 24.1 Local Configuration
In those git config lines, above, you might have noticed the --global switch:

Chapter 24. Configuration

Unless you explicitly say --global, Git assumes you mean the local configuration.
What is the local configuration? It’s the configuration that applies to the repo that you’re currently in, and
no others.
Configuration options in the local config override the global config!
Here’s a practical example of why you might do this. Let’s say you have a personal email for your fun
projects, and a contractor email that you use for work-for-hire. But since you’re an independent contractor,
you have all these projects on one computer.
However, you want to use your work identity (name and email) for your contract work and your hacker
identify for your fun work.
One thing you might do is set the following globally:
$ git config set --global user.name "HAx0rBYnit3"
$ git config set --global user.email "l333T@example.com"

and that would be the default for all your repos. And then you might have a new repo for a job:
$ git init corporate_job_12
Initialized empty Git repository in /user/corporate_job_12/.git/

And we pop in there, and we set the local config just for that repo (it’s local because we’re not specifying
--global):
$ cd corporate_job_12
$ git config set user.name "Professional Name"
$ git config set user.email "professional@example.com"

And now, just in the corporate_job_12 directory, we’ll be using our professional name and email in
our commits. Everywhere else we’ll be using our elite hacker name.
You can override all the global configs on a per-repo basis by specifying local configs.
Finally, the local config for a repo is found in the .git/config file out of the repo’s root directory.

### 24.2 Listing the Current Config
You can view the current config with git config list. Add the --global flag if you want to see the
global config.
$ git config list
user.name=HAx0rBYnit3
user.email=l333T@example.com
init.defaultbranch=main
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
user.name=Professional Name
user.email=professional@example.com

You can see in there that user.name and user.email appear twice. The first is from the global config,
which is overridden later by the value in the local config.

### 24.3 Getting, Setting, and Deleting Variables

### 24.3 Getting, Setting, and Deleting Variables
An example “get”:
$ git config get user.name
Professional Name

Note that it is only giving the active value (the local one in this case) even though we saw with
git config list that both the global and local values were there.
And we’ve already seen a “set”:
$ git config set user.name "Alfred Manfrengensenton"

The double quotes are there so that the shell delivers the name as a single argument. Normally it splits
all arguments on spaces. You could also use single quotes which is useful if the value has special shell
characters in it. The grotesquely oversimplified rule, with apologies to shell enthusiasts, is to use quotes
around the value if it has a space in it.
Set will overwrite any previously-existing value of the name variable name.
And last but not least, we can delete a variable with unset:
$ git config unset user.name

### 24.4 Some Popular Variables
To see which variables you can set, look in the manual page for the appropriate command. You can usually
get there by looking at the first hit on your favorite search engine for man git whatever. For example,
you might find configuration variables for git pull by searching for man git pull and bringing up the
first hit.
That said, there’s a big ol’ list of them in the git config manual page that you can peruse1 .
But here are some fun, common ones.
Variable

Description

user.name
user.email
pull.rebase
core.editor

Your name
Your email
Set to true to have a pull try to rebase. Set to false to have it try to merge.
Your default editor for commit messages, etc. Set to vim, nano, code, emacs,
or whatever.
Your default merge tool, e.g. meld or whatever.
Your default diff tool, e.g. vimdiff
Set to false to stop Git from always asking you if you want to launch your
difftool.
Set to true for more colorful Git output
Set to true if you’re on Windows and not in WSL and the remote repo has
Unix-style newlines and you want to use Windows-style newlines in your
working directory. On other systems, set to input. This is all about working
around Window’s ancient newlines.
Set to true if you’ve configured GPG commit signing and want to always sign.
Set to 0 to show the command Git thinks you meant to type if you misspelled it.
Set to immediate to have it run the corrected command right now. Set to
prompt to ask you if you want to run it.

merge.tool
diff.tool
difftool.prompt
color.ui
core.autocrlf

commit.gpgsign
help.autocorrect

Again, there are a lot more of these. Peruse the docs for more.

https://git-scm.com/docs/git-config#_variables

Chapter 24. Configuration

### 24.5 Editing the Config Directly
You can launch an editor (the one specified in the core.editor variable) to edit the config file directly.
Some people might find this easier.
I can launch the editor like this:
$ git config edit

Add the --global flag to edit the global config file.
When you get into the editor, you’ll see a config file that might look something like this:
[core]
repositoryformatversion = 0
filemode = true
bare = false
logallrefupdates = true
[user]
name = Your Name
email = user@example.com

If you look, you can see where user.name and user.email ended up. That’s how the config file is
organized.
So you can edit it here and save those changes. Some people might find this easier than adding or modifying variables on the command line.
If you corrupt your config with sloppy editing, you’re in for an interesting time. You won’t
be able to run git config edit again. You’ll have to manually fix the config file in your favorite
text editor.
The local config file can be found relative to the root directory for the repo in question in
.git/config.
The global config file can be found at ~/.gitconfig on Unix-like systems and
C:\Users\YourName\.gitconfig on Windows.
Bring the appropriate file up in your editor, fix the mistake, save it, and then git config edit
should work again.

### 24.6 Conditional Configuration
This is more than I want to talk about, but it’s neat enough to point out.
In Git config files, you can include other config files. This gives you a way, if your config files are bananas,
to break them apart logically.
You can also do conditional includes. That is, you can choose to include a file based on some condition
being true.
Testable conditions are:
- Which directory this repo is in
- If you’re on a particular branch
- If there is a particular remote configured
This gives you all kinds of power. Personally, all of it is more than I need, and I’ve never used this feature,
but that’s just me.
Get more info and examples in the official book2 .

https://git-scm.com/docs/git-config#_conditional_includes

### 24.7 Older Git Versions

### 24.7 Older Git Versions
I’m assuming you have a recent version of Git installed. But if you don’t, these commands might be
different.
The Git manual page for git config has a complete summary of the changes3 .
And here are the modern commands we used in this chapter:
git config get user.email
git config set user.email "user@example.com"
git config unset user.email
git config list
git config edit

And here are the older equivalents:
git config user.email
git config user.email "user@example.com"
git config --unset user.email
git config --list
git config --edit

Use the new ones if you can!

https://git-scm.com/docs/git-config#_deprecated_modes

Chapter 24. Configuration

Chapter 25

Git Aliases
Some of these Git commands might be painstaking to type. So far, we haven’t had to do anything too
complicated, but we might eventually.
For example, let’s say you want to see the names of the files that were modified with git log. It’s no
problem; you can tell it to do that.
$ git log --name-only

And that’ll work.
But let’s say for the sake of example that you find yourself doing that a lot. It would get irksome.
Wouldn’t it be easier if you could just make up a new command, like git logn that would do the same
thing?
That’s what aliases are for.
This chapter assumes you’ve read the Configuration chapter. In particular, if these commands don’t work,
you should look at configuration of Older Git Versions.

### 25.1 Creating an Alias
You do this through the configuration interface. Basically what you want to set is the variable
alias.myname where myname is the name of the new command.
Let’s say you want to make git logn an alias for git log --name-only. You can do it like this:
$ git config set --global alias.logn 'log --name-only'

And at this point, you can run:
$ git logn

and it will be an alias for git log --name-only, effectively running that command.
I speculate that Git has a number of built-in commands (like log and push) and if you try to have it run
something that is not a built-in, it tries to find it as an alias variable. And if it does, it substitutes that
instead. 99% sure that’s what’s happening under the hood.
Since aliases are just regular configuration variables, getting, setting, and deleting them happens as described in the config chapter.

Chapter 25. Git Aliases

### 25.2 Displaying Aliases
Since aliases are just config variables, you can just get them in order to see what they are.
$ git config get alias.logx

If you want to see all of them, you can run this command:
$ git config get --all --show-names --regexp '^alias\.'

which is super annoying. I suggest you alias it. Wheee!
Older versions of Git use this command instead:
$ git config --get-regexp ^alias\.

### 25.3 Some Neat Sample Aliases
Some of the following are split into multiple lines so they fit in the book. You can put them on a single
line, or type them as-is with the \ escape that tells the shell to continue the command on the next line.
Add all changed files with git adda. Do this carefully since you might add more than you wanted!
$ git config set alias.adda "add --all"

More compact log showing the commit graph with git logc.
$ git config set alias.logc "log --oneline --graph --decorate"

Diff the stage with the repo with git diffs.
$ git config set alias.diffs "diff --staged"

Make git aliases show all aliases with git aliases.
$ git config set alias.aliases \
"config get --all --show-names --regexp '^alias\.'"

Make a very colorful and customized log with git lol.
(Make sure to get the spacing exactly as-is on this copy-paste or the shell and/or Git will be unhappy.)
$ git config set alias.lol "log --graph"\
" --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s"\
" %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

For that last one, we’re making heavy use of --pretty formatting which gives tons of control over the
output. See the “Pretty Formats” section of the git log manual page for more info1 .

### 25.4 Seeing Git’s Alias Expansion
Let’s say you’ve added an alias, but it’s not working. When you run it, it just gives some error and it’s not
super clear what’s going on.

https://git-scm.com/docs/git-log#_pretty_formats

### 25.4 Seeing Git’s Alias Expansion

$ git logx
fatal: unrecognized argument: --foobar

You can ask Git to give you more information by adding GIT_TRACE=1 to the beginning of the command
line.
This sets the environment variable GIT_TRACE to 1, but it only does it for this one command.
It’s not persistent. Git knows to look for GIT_TRACE and that it should alter its behavior if it finds
Here’s some example output:
$ GIT_TRACE=1 git logx
14:09:28.502707 git.c:758
14:09:28.502750 run-command.c:666
14:09:28.502905 git.c:416
14:09:28.502913 git.c:816
14:09:28.502916 run-command.c:666
14:09:28.502926 run-command.c:758
14:09:28.504192 git.c:472
fatal: unrecognized argument: --foobar

trace: exec: git-logx
trace: run_command: git-l
trace: alias expansion: l
trace: exec: git log --fo
trace: run_command: git l
trace: start_command: /us
trace: built-in: git log

Unfortunately I had to truncate the lines on the right so they fit in the print version of the book, and that’s
what we really want to look at. We’ll get there in a moment.
For now, let’s look on the left. What we see there is a timestamp and some information about which part
of the Git code is sending the trace out. And the it ends with our error.
Let’s scroll to the right and just look at the lines following the trace:.
trace: exec: git-logx
trace: run_command: git-logx
trace: alias expansion: logx => log --foobar
trace: exec: git log --foobar
trace: run_command: git log --foobar
trace: start_command: /usr/lib/git-core/git log --foobar
trace: built-in: git log --foobar

It might take some sifting through, but let’s look just at the lines with run_command and alias expansion
in them:
trace: run_command: git-logx
trace: alias expansion: logx => log --foobar
trace: run_command: git log --foobar

And there we can see exactly what’s being expanded into what. And that might be useful for debugging
It’s probably a bit of overkill for this simple example, but there are some aliases of extraordinary complexity for which this technique might help.

Chapter 25. Git Aliases

Chapter 26

Changing Identity
There are a few ways you’re identified when you do work with Git.
They are held in:
- the user.name and user.email configuration variables
- the SSH key you use to authenticate with a remote server like GitHub
- the GPG key you use for signing commits (rare)
It’s all well-and-good if you only ever use a single identity, but sometimes you might want to use different
ones. For example, maybe for your personal fun work, you use one identity and SSH key, but then you
got a contract job and you want to use your professional email and have to connect to a different server
with a different SSH key.
Let’s check out what the defaults are for all these, as well as how to change them on a per repo basis.

### 26.1 Changing the User Configuration Variables
You’ll want to do this if you have, say, some repos for work and some for play, or if you have multiple
work or play emails you want to use on a per-repo basis.
Everyone, including me, will tell you that you shouldn’t use your work-assigned laptop for
play, and you double-especially shouldn’t do that if your “play” is other work-for-hire. That said,
contractors often have multiple things going on at once (and they own their hardware), and sometimes people doing their own for-fun work might want to use different emails on different projects.
We’ve already covered this in the configuration chapter, but it’s easy enough to change your local identify
that’s attached to each commit. Just change user.name and user.email to whatever you want.
In the repo in question, set the local configuration to override your global config:
$ git config set user.name "My Alter Ego User Name"
$ git config set user.email "alterego@example.com"

And then when you make commits in this repo, that’s the identity that will be attached to them. Commits
in other repos will still obey your global username and email (unless you’ve overridden them, as well).

### 26.2 Changing the SSH Authentication Key
You’ll want to do this if you’re connecting to someone’s private remote (e.g. they’re running a Gitea site
of their own or something), and you need to set up a different SSH key just to access that site. But you
want to keep using your same SSH key for your personal GitHub. How can we use the GitHub one for all
my repos, and the alternate SSH key just for this one repo?

Chapter 26. Changing Identity

This is slightly more involved, and there are a few ways to do this1 , but I’ll share my favorite here.
First some background. When the ssh command runs, it needs to know which identity it is running as.
It uses a default identity (which is in a file called ~/.ssh/id_something, like id_ed25519) unless you
specify another one.
You can do this one the command line with the -i switch to ssh.
Let’s say you have two private keys in your .ssh direcrtory, id_ed25519 and id_alterego_ed25519.
The first one is the default key SSH uses. But if we want to use the other one, we can specify it:
$ ssh -i ~/.ssh/id_alterego_ed25519 example.com

Admittedly, that’s a pain in the butt to type, so some people set up their SSH config to use a particular key
with a particular host name. But we’re not going down that route.
Instead, let’s tell Git to use a particular identity by setting the core.sshCommand variable locally for this
repo. This variable just holds the SSH command that Git uses to connect, which would normally be ssh.
Let’s override:
$ git config set core.sshCommand \
"ssh -i ~/.ssh/id_alterego_ed25519 -F none"

(The command above is split into two lines to fit in the margins—it is normally a single line and the \ is
Bash’s line continuation.)
And—wait a second—what’s that -F none on there? That’s just a safety that’s telling SSH to ignore its
default configuration file. Remember how above I said people sometimes set an identity by domain in
their SSH config? This would override that since overriding is what we’re trying to do here.
The reason I like this approach is that you can easily do it on a per-repo basis, and the config is stored
with the repo (instead of in an environment variable or in SSH’s somewhat-unrelated configuration).

### 26.3 Changing your GPG Signing Key
If you use your GPG key2 for signing you can specify which key is used if you get its fingerprint (or
probably email or any other unique identifier recognized by GPG).
With apologies, setting up your GPG keypair is outside the scope of this book. But the Git-side one-time
setup looks like this:
$ git config gpg.format gpg
$ git config commit.gpgsign true

First find the secret key you’re interested in:
$ gpg --list-secret-keys --keyid-format LONG
/user/.gnupg/pubring.kbx
-----------------------------sec
rsa4096/0123456789ABCDEF 2022-01-01 [SC] [expires: 2025-019993456789ABCDEF0123456789ABCDEF01234567
uid
[ultimate] Personal User Name <personal@example.com>
ssb
rsa4096/9993456789ABCDEF 2022-01-01 [E] [expires: 2025-01-0
sec
ed25519/ABCDEF0123456789 2022-01-01 [SC] [expires: 2025-01FFFDEF0123456789ABCDEF0123456789ABCDEF01
uid
[ultimate] Professional User Name <professional@example.c
ssb
rsa4096/FFFDEF0123456789 2022-12-06 [E] [expires: 2024-12-0

https://superuser.com/questions/232373/how-to-tell-git-which-private-key-to-use
https://www.gnupg.org/

### 26.4 Changing your SSH Signing Key

(Output has been cropped on the right to fit in the book.)
Look for the identity you want to use. In this case, let’s say we want to use “Professional User Name”.
We look for the sec line that’s associated with it (above it), and we copy that part of the secret line after
the type of encryption (usually rsa4096 or ed25519). Here that’s ABCDEF0123456789 in this fabricated
example.
And then we locally configure this repo to use that key in particular.
git config set user.signingkey ABCDEF0123456789

Then when you sign the commits, that key will be used.

### 26.4 Changing your SSH Signing Key
In addition to GPG, you can also sign commits with SSH keys. You can create a signing key with
ssh-keygen:
$ ssh-keygen -t ed25519

And then you have to do some one-time config if you haven’t done so already. Use --global if you want
to set this up across all your repos. This tells Git to use SSH keys and always sign commits:
$ git config gpg.format ssh
$ git config commit.gpgsign true

Then we can set the key we use for signing. Change the path, below, to point to the public key:
$ git config user.signingkey ~/.ssh/id_ed25519_signing.pub

Lastly, we have to add your information to the allowed_signers file. This file can go anywhere; in this
example, we’ll put it in ~/.ssh/, but you could do one-offs per repo if you wanted.
Firstly in this lastly step is to tell Git where your allowed_signers file is.
$ git config gpg.ssh.allowedSignersFile "~/.ssh/allowed_signers"

The contents of that file should have at least two fields. First the email address found in your
user.email config variable that you’ll use for the commits. Second, a copy of the public key from your
user.signingkey variable. Note that you want the contents of that file, not the file name.
An example line in the allowed_signers file looks like this (line truncated for formatting):
user@example.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAmaTS47vRmsKy

You can have multiple lines in that file for multiple identities.

Chapter 26. Changing Identity

Chapter 27

Amending Commits
Git gives you the power to relatively easily amend the last commit.
Caution! This section talks about changing history, and let’s not forget The One Rule Of Changing
History: thou shalt not change history of anything that you’ve pushed, lest someone else might have
already pulled thy earlier changes, causing your commit histories to become woefully out of sync
and much shouting.
In short, if you pushed a change, assume someone else has pulled it already and amending your
commit (changing history) would cause lots of pain.
In shorter, if you pushed, it’s too late. No more amending the commit.
So what are some use cases?
- Maybe you botched the commit message and you want to rewrite it.
- Maybe you forgot to add some files.
That kind of thing that none of us have ever done ever, right?

### 27.1 Amending the Commit Message
This one is pretty easy. Let’s take an example of a commit that I’ve botched. Note that this is completely
committed at this point—I’ve already run git commit. But, crucially, I haven’t pushed yet.
Let’s get a status and see the log:
commit d7fba6838a689c3de15a27e272e8e4123d7c2460 (HEAD -> main)
Thu Nov 21 20:39:04 2024 -0800
addded

That’s one “d” too many in the commit message. Fixing it up is as easy as this:
$ git commit --amend

And that brings me right into my editor where I can change the message.
If I don’t want to use the editor, I can do it on the command line:

Chapter 27. Amending Commits

$ git commit --amend -m "the new commit message"

Note that doing this preserves the author of the commit. (Which is probably what you want 99.9999% of
the time since you were probably already the author.) If you want to change the identity, you’ll have to
reconfigure your identity with git config and then run:
$ git commit --amend --reset-author

### 27.2 Adding some Files to the Commit
Ugh! You just made that commit but you forgot to add one of the files to it! You got foo.c and bar.c in
there, but you left out baz.h!
Let’s look.
bar.c baz.h foo.c
$ git log --name-only
commit b307686933dca3db718e6a3e3f8226be11e7e278 (HEAD -> main)
Thu Nov 21 20:47:08 2024 -0800
bar.c
foo.c

OK, so how can we get baz.h in there? Like this:
1. git add baz.h to add it to the stage.
2. git commit --amend to get it into the commit.
This will bring you into an editor to edit the commit message. You can just save it as is. Or you can
specify the -m option on the command line to give a new message.
Alternately, if you’re just adding files, you might not need to change the commit message at all. In that
case you can just run:
$ git commit --amend --no-edit

That’ll run the amend and not edit the commit message at all.
And there we have it—you can easily amend the last commit. Just be sure you haven’t pushed it before
you do.

Chapter 28

Difftool
Admittedly, this diff output is hard to read. I swear, though, you do get used to it. I use it all the time.
That said, it can be nicer to see something more visual, you know, like the old version on the left and the
new version on the right in a way that’s visually easier to comprehend.
If you’re using VS Code or some other IDEs, you get some nice diffing for free and don’t
necessarily need to pay attention to this section. See more in the VS Code chapter.
First, the bad news is that Git doesn’t support this out of the box.
The good news is that there are a lot of third-party tools that do, and you can easily hook them up so that
they work with Git super easily.
How easy?
Once you set it up, you’ll be able to just write difftool instead of diff on the command line. For
example:
$ git difftool HEAD~3^!

And what does that get you? For me, where I use Vim and have Vimdiff set up as my difftool, it gives me
a screen like in Figure 28.1.

Figure 28.1: Vimdiff as the difftool.
This might be a little tough to see in black and white, but what we have is the old version on the left and
the new version on the right. The lines of minus signs on the left indicate lines that don’t exist in the old
version, and we can see highlighted lines on the right that exist in the new version.

Chapter 28. Difftool

But if you just try to run git difftool out of the box, it won’t work. You have to configure it first.

### 28.1 Configuring
Firstly, Git normally prompts you before launching a third-party difftool. This is annoying, so let’s turn it
off globally:
$ git config --global difftool.prompt false

Secondly, we need to tell it which tool to use.
$ git config --global diff.tool vimdiff

And that might be enough. If vimdiff (or whichever diff tool you’re using) is in your PATH1 , you should
be in business and you’re good to go.
If it’s not in your PATH, maybe because you installed it locally in your home directory tree somewhere,
you can either add it to your PATH (search the Net for how to do this), or you can specify the full path to
your particular difftool. Here’s an example with vimdiff, which is redundant for me because /usr/bin
is already in my PATH.
$ git config --global difftool.vimdiff.path /usr/bin/vimdiff

If you’re using a different difftool other than vimdiff, replace that part of the config line with the name
of the command.
Again, you only have to set the path if the tool isn’t installed in a standard place.

### 28.2 Available Difftools
There are a number of diff tools out there you can choose from. Here’s a partial list, with the caveat that
I’ve only ever used Vimdiff.
- Araxis Merge2
- Beyond Compare3
- DiffMerge4
- Kdiff35
- Kompare6
- Meld7
- P4Merge8
- Vimdiff (comes with Vim9 )
- WinMerge10
Some of these are free, some are paid, and some are free trial.
And remember, VS Code has this functionality without using difftool.

Setting the PATH is outside the scope of this tutorial, but the short of it is if you can run the diff tool command on the command
line (e.g. by running vimdiff), then it is in the PATH. If it says command not found or some such, then it is not in the PATH.
Search the Intertubes for how to add something to the PATH in Bash. Or set the Git path config explicitly, as shown in the following
paragraph.
https://www.araxis.com/merge/index.en
https://www.scootersoftware.com/
https://sourcegear.com/diffmerge/
https://kdiff3.sourceforge.net/
https://apps.kde.org/kompare/
https://meldmerge.org/
https://www.perforce.com/products/helix-core-apps/merge-diff-tool-p4merge
9
https://winmerge.org/?lang=en

Chapter 29

Mergetool
Do you hate all those >>>>>, =====, and <<<<< things that Git puts in your files during a merge conflict?
If so, using a merge tool might be what you’re after. A merge tool will give you a graphical display
showing your changes, the conflicting changes, and the desired result of the merge. And it shows it in an
easy-to-digest form.
Personally, I dislike merge tools. That seems nuts, but let me explain a moment. When you’re
in a merge conflict, the only thing you have to do is edit those files with the ===== delimiters
and make them Right, remember? You have to modify the file until it is correct, ripping out those
delimiters as you go.
It’s just you and the file, that’s it. No intermediaries messing with the contents. And when you’re
done, what you have is your final answer.
But merge tools are intermediaries by their very nature. And we must trust that we’re using them
correctly to get the job done. And, for me, even after I’ve used them probably correctly, I still feel
like I have to manually inspect the result to make sure it’s Right.
The benefit I do see is that with a merge tool you typically get a side-by-side view of the changes,
as opposed to the up-and-down view you effectively get when editing the conflicting file. This can
make the merge tool easier to use when you have a number of big conflicting hunks in a file.
But in real life, I never use one. Also in real life, lots of people use them.

### 29.1 Merge Tool Operations
Merge tools operate on a file-by-file basis. So when you’re using one, you’re using it on a particular
conflicting file.
They all tend to show you at least three panels:
- Your conflicting changes
- Their conflicting changes
- The result file that is Right
And they all tend to have the same core operations:
- Go to next conflict—all panels will move to the next conflict.
- Go to previous conflict
- Choose yours—copy your conflicting changes into the final result, i.e. your changes are Right.
- Choose theirs—copy their conflicting changes into the final result, i.e. your changes are Right.
In terms of usage, here’s what we’re going to do, assuming that the merge tool starts you at the first conflict
when it is launched:
1. Choose either “yours” or “theirs” to keep the Right changes.
## 2. Go to the next conflict.

Chapter 29. Mergetool

## 3. Repeat from Step 1 until all conflicts are resolved.

After you’ve gone through all the conflicts and chosen one or the other, make sure the final result is Right
and then save/finish the result.
The merge tool will have staged the result for you, ready to commit and finish the merge.

### 29.2 Some Example Merge Tools
There are a lot of them, and I’ll include some links here in alphabetical order. Cross-platform unless
otherwise noted.
- Araxis Merge1 —Windows, Mac
- Beyond Compare2
- Code Compare3 —Windows
- KDiff34
- Meld5
- P4Merge6
- Vimdiff7
- WinMerge8 —Windows
In addition, IDEs like VS Code and IntelliJ often have their own built-in merge tools that work independent
of Git (no need to configure anything in Git).

### 29.3 Using Vimdiff as a Merge Tool
We’ll do a quick run-through of using Vimdiff as a merge tool since it covers all the bases and has some
tricky configuration. Other third-party tools (except VS Code and other IDEs with this functionality builtin) would have a similar configuration. Search the Internet for the proper config for other tools.
This isn’t a Vim tutorial. So I’m just going to assume you know how to do things like save files
and quit. I will say that to switch windows in Vim you use CTRL-W followed by a cursor direction,
such as CTRL-W followed by h to move to the window to the left.
First things first, let’s set up the configuration.
$ git config --global set merge.tool vimdiff
$ git config --global set mergetool.vimdiff.cmd \
'vimdiff "$LOCAL" "$REMOTE" "$MERGED"'
$ git config --global set difftool.vimdiff.cmd \
'vimdiff "$LOCAL" "$REMOTE"'

(Long commands split to fit in the book margins—it could be on a single line.)
Note that last line is to explicitly set a two-panel view for vimdiff and difftool. If it’s not set, the
mergetool.vimdiff.cmd directive will make difftool have a three-panel display—probably not what
you wanted.
Once that’s in place, let’s say we have a merge conflict.
$ git merge branch

https://www.araxis.com/merge/index.en
https://www.scootersoftware.com/
https://www.devart.com/codecompare/
https://invent.kde.org/sdk/kdiff3
https://meldmerge.org/
https://www.perforce.com/products/helix-core-apps/merge-diff-tool-p4merge
https://winmerge.org/

### 29.3 Using Vimdiff as a Merge Tool

CONFLICT (content): Merge conflict in foo.txt
Automatic merge failed; fix conflicts and then commit the result.

At this point, we’re in a classic run-of-the-mill merge conflict.
You have unmerged paths.
(fix conflicts and run "git commit")
(use "git merge --abort" to abort the merge)

But since we’ve set up our merge tool, let’s use it:
$ git mergetool

If Git is prompting you to ask if you really want to run the merge tool (which you presumably
do since you just ran git mergetool), you can turn off that “feature” with this config command:
$ git config --global set mergetool.prompt false

This is going to bring up a Vim window with three panels. The left is your local changes, the middle is
the file as it exists in the repo, and the right is the result of the merge.
The goal is to make the one on the right look Right. Now, you could just do that outright by modifying
the file there, but at that point, why even use a merge tool?
So we’ll follow the steps we outlined earlier.
When we first run git mergetool, we get dropped at the first conflict with the cursor in the left window.
The left window holds the changes we made.
In the middle window, we’ll see the corresponding changes that are in the repo.
And in the right repo, we see what will be staged when we’re done. Right now in the right window, we
see all the ===== and <<<<< stuff. But we’ll change that in a moment.
Move the cursor to the right window. This is where the action will be.
Make sure the cursor is on a highlighted section (which probably will be in multiple colors). This highlighted section is what we’ll replace.
Let’s choose which change to use.
If you want to keep your changes (and ditch the ones in the repo), use this Vim command:
:diffget LOCAL

If you want to discard your changes (and keep the ones in the repo), use this command:
:diffget REMOTE

When you run one of those, you’ll see the content in the right window change to what you wanted.
And then you can go to the next conflict with ]c. (or to the previous with [c.)

Chapter 29. Mergetool

Do this until the right window is Right. Note that you are also free to edit the right window directly all
you want.
When you’re done, save the right window and quit all the windows.
Importantly the second you exit the merge tool, Git will stage whatever you saved in the rightmost
window. If you exited too soon and got stuff staged before you were done, use git checkout --merge
with the file in question to get it off the stage and back to “both modified” state.
If there are multiple conflicting files, Git will bring up the merge tool again to handle the next file in line.
And when you’re done, the changes are made and you can finish the merge with a commit as per usual.
But wait—what’s that .orig file that wasn’t there before? Read on!

### 29.4 Backing up the Originals
By default, when using a merge tool, Git will keep a backup of the file before the merge tool touched it.
You’ll see these with a .orig extension, like so:
foo.txt.orig
bar.txt.orig

You can add these to your .gitignore if you want to, or you can prevent the creation of them in the first
place with this configuration variable:
$ git config --global set mergetool.keepBackup false

Chapter 30

Submodules
You can’t really have a Git repo inside a Git repo. I mean, yes, you can make one, but when you try to
add it to the outer repo, Git will have a lot to say about it.
warning: adding embedded git repository: inner
hint: You've added another git repository inside your current
hint: repository. Clones of the outer repository will not contain
hint: the contents of the embedded repository and will not know how
hint: to obtain it. If you meant to add a submodule, use:
git submodule add <url> inner
hint: If you added this path by mistake, you can remove it from the
hint: index with:
git rm --cached inner
hint: See "git help submodule" for more information.
hint: Disable this message with "git config advice.addEmbeddedRepo
hint: false"

So it’s probably not what you want, but Git offers a hint: maybe you wanted something to do with submodules, instead!
Submodules give you a way to make a completely separate repo appear inside the working tree of your
current repo. Not only that, it allows the current working tree to have a specific commit of the submodule
represented in that submodule’s tree.
The canonical use case for this is when your project depends on a library that you also have the source
for. You can include the library’s repo as a submodule of your repo, and effectively pin it to a particular
version (specifically to a particular commit).
For example, maybe your code works with FooLib version 3.4.90. So you include FooLib as a submodule
and make sure it’s pinned to that version. Then even though another team might be updating FooLib, you’ll
always have version 3.4.90 available to build against.
Then later when you’re ready, you can update the submodule to the latest version, say 4.0.1, and pin that
one in place.
It’s important to note that a submodule is just another regular Git repo. Nothing special about it. The only
thing that’s notable is that we’ve decided to effectively clone it inside another repo, and logically tie it to
that repo.

### 30.1 Using a Repo with Submodules
Let’s start by talking about what happens when you clone a repo that already uses submodules. In this
case, someone else has done the work of putting the repo together with its submodules, but you have to
do a little bit of extra effort after cloning it so you get all the submodules, as well.
Later we’ll talk about how to add submodules to a project.
Luckily, for demonstration purposes, I have a repo you can clone that already has a submodule defined
within it. (Fork the repo before you clone it if you want to be able to push back.)
Let’s say you already know that the repo you’re about to clone has submodules. (Because someone told
you it did.) You can then clone with a flag saying you want to get all the submodule repos, too, please.
You do this with the --recurse-submodules switch:
$ git clone --recurse-submodules \

(Above command split into two lines to fit in the margins.)
And that will clone the repo in question, and it will also clone all repos listed as submodules of that repo.
Go ahead and run it—it’s a real repo you can clone.
After you run it and go into the repo directory, you’ll see a git-example-repo directory in there. That’s
a completely separate repo inside this one as a submodule. You can cd into it and look at the files!
Any Git commands you run in the submodule directory tree apply only to the submodule!
Be extra careful making commits in the submodule directory tree—HEAD commonly gets detached
with submodules. More on that later.
But let’s say you forget to specify --recurse-submodules, or you just plain didn’t realize there were
submodules here. Not to worry! You can get them after the fact. The above command is the same as these
two (or three) commands:
$ git clone \
$ cd git-example-submodule-repo
$ git submodule update --recursive --init

That will also get the submodules cloned. (--recursive is in case the submodules have submodules (!!)
and the --init does some necessary bookkeeping work in your local repo. How’s that for a handwavy
statement?)
And for now, that might be enough for you to get to work! All you really needed to build the existing
project was the repo and its submodules, and you might not be in charge of the submodules and just need
them to exist for the build. So now you can get to work.
But in case you need to do more, read on!

### 30.2 Creating a Submodule
Let’s say you have a repo already, but you’ve decided you want to include another repo as a submodule.
Again, a use case for this might be if your main repo project depends on another one for the build, e.g. like
a library. And you don’t want to use the binary form of the library (or maybe it doesn’t exist), so you need
to build it.
If you didn’t use submodules, anyone who wanted to build your repo would need to also clone the library
repo and juggle all that. Wouldn’t it be nicer if they could just add that --recurse-submodules flag to
their clone command and have it all set up an ready to build?
So let’s go through the steps of adding a submodule to an existing repo and see how that all works.

### 30.2 Creating a Submodule

Feel free to use my sample repo as your submodule, use one of your own, or anyone else’s. No one knows
when you make a submodule out of their repo.
First, let’s create a new repo for testing and put a commit in there for fun:
$ git init test_repo
Initialized empty Git repository in /frotz/test_repo/.git/
$ cd test_repo
$ echo Hello, world > foo.txt
$ git add foo.txt
$ git commit -m added

And let’s add a submodule!
$ git submodule add \
git@github.com:beejjorgensen/git-example-repo.git
Cloning into '/home/beej/tmp/test_repo/git-example-repo'...
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 4 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (4/4), done.

There you go! Well, almost, anyway. Let’s check our status:
new file:
.gitmodules
new file:
git-example-repo

What are those things on the stage? Well, git-example-repo is the submodule. It’s a little strange
because Git is calling it a “file” when it’s a directory, but that’s just part of the special treatment submodules
get.
And there’s another file in there called .gitmodules that holds information about all the submodules
you’ve added.
Both of these files (treating git-example-repo like a file) should be committed to your repo so that
other people who clone it get the submodule information.
$ git commit -m "added submodule"
[main cedea64] added submodule
2 files changed, 4 insertions(+)
create mode 100644 .gitmodules
create mode 160000 git-example-repo

Now you’re set! Anyone who clones the repo gets that submodule information.
You can even do it with your test repo. Change directory to the parent of the test repo and clone it:
$ git clone --recurse-submodules test_repo test_repo2

After that you can cd into test_repo2 and see the submodule there.
Can I Make a Local Repo a Submodule? No! Git prohibits that because there’s some security
risk there that, to be honest, I haven’t really read about. There’s supposed to be a way to override
that with a config setting, which I thought would be quite useful for messing around to see how

submodules worked, but apparently that config setting doesn’t work as of late 2024. So you’ll have
to use network-remote repos for submodules.

### 30.3 Setting the Commit for the Submodule
What does this section even mean?
Here’s the deal: the containing repo refers to a specific commit within the submodule. That is, the submodule is always checked out to a particular commit as defined in the containing repo. (The submodule
HEAD might be attached to a branch, but it also very well might not be.)
The upshot of this is that when we make a repo with a submodule, we get to dictate which exact commit
of that submodule our repo is using. And then, importantly, when someone clones our repo, they’ll be
looking at the submodule at the exact same commit as we are.
This lets us do things like choose a very particular version of a library as a submodule, and then everyone
who clones our repo will get that same version regardless of whether or not the submodule repo was
changed elsewhere. Someone else could move main wherever they want, but we’ll still use the one
commit we’re pinned to, even if we fetch the new main commit into our submodule.
We effectively pin our submodule to a particular commit. And we probably want to do that so that someone
else developing the submodule on the side doesn’t introduce some change that breaks our containing repo’s
build.
How do we do that? It’s pretty easy:
1. Go to the submodule directory.
## 2. Switch to the commit that you want to use. You can refer to this commit by branch name, commit
hash, tag, or any other thing that git switch takes. Use --detach if you’re detaching the HEAD.
3. Go back to the containing module directory.
4. Add the submodule directory.
## 5. Commit.
If you want to mess around with this using my test repos on GitHub, be sure to fork them first so you have
write access.
Let’s do the same thing we did in the last section and create the test_repo repo.
And then do the clone into test_repo2 just so we have two to mess with.
--recurse-submodules flag!)

(Don’t forget the

We’re cloning a non-bare repo, which is weird. It’s OK to clone it—the Git Police aren’t going
to show up. You just won’t be able to push to it. And that’s perfectly good enough for this demo.
But it’s something that you wouldn’t normally do.
Also notice the detached HEAD in the cloned submodule repo!
If you look in
test_repo2/git-example-repo and do a git log, you’ll see this on the first line:
(HEAD, origin/main, origin/HEAD, main)

See how HEAD is detached from main?
Now, I’d be lying if I said I knew the exact rules for when the HEAD in a submodule gets detached,
but it’s not uncommon. In fact, you should just generally assume it’s detached and attach it to a
branch if you have to. More on this later.
Now in test_repo, let’s go into the submodule directory and check out an earlier version of the submodule repo. In this case, we’ll just check out the previous commit from main.
$ cd test_repo/git-example-repo
commit cd1bf77d2ef08115b18d7f15a9c172dace1b2222

### 30.3 Setting the Commit for the Submodule

(HEAD -> main, origin/main, origin/HEAD)
Fri Dec 6 15:07:43 2024 -0800
very important clarification
commit d8481e125e6ef49e2fa8041b16b9dd3b8136b550
Fri Dec 6 15:07:13 2024 -0800
improve functionality
commit 433252748b7f9bf85e556a6a0196cdf38198fc43
Fri Jan 26 13:30:08 2024 -0800

Let’s move this to the earlier commit.
$ git switch --detach d8481e
HEAD is now at d8481e1 improve functionality

So far so good. Now let’s cd back to the containing repo and have a look at where we stand.
$ cd ..
git-example-repo (new commits)

Look at that! The submodule directory is listed as modified. It says “new commits”, but that’s just telling
us that “things have changed in the submodule from the commit that I was pinned onto before”.
So let’s add that and commit it.
$ git add git-example-repo
$ git commit -m "update submodule commit"
[main dd69bb8] update submodule commit
1 file changed, 1 insertion(+), 1 deletion(-)

And now let’s pull those changes in our clone, test_repo2—note the --recurse-submodule option
on the pull!
$ cd ../test_repo2
$ git pull --recurse-submodules
Fetching submodule git-example-repo
Already up to date.
Submodule path 'git-example-repo': checked out'
'd8481e125e6ef49e2fa8041b16b9dd3b8136b550'

And now on test_repo2 if we jump into the git-example-repo submodule, we can check the log:

commit d8481e125e6ef49e2fa8041b16b9dd3b8136b550 (HEAD)
Fri Dec 6 15:07:13 2024 -0800
improve functionality
commit 433252748b7f9bf85e556a6a0196cdf38198fc43
Fri Jan 26 13:30:08 2024 -0800

And we see HEAD is on commit d8481e, just like we set it to in test_repo. (And we also do not see main.
It’s the child commit from where HEAD is now, so it’s not appearing in the log. We could still switch to it
if we wanted, of course.)
What have we done? We’ve changed the commit the submodule is pinned at in one repo, and then we’ve
pulled that change into another repo!

### 30.4 Getting Submodule Latest
Let’s say someone else has updated the commit that the submodule is pinned at in your repo. And you
want to get up to speed.
Two steps to make that happen:
1. In the containing repo, git pull. This will get you the latest version of the containing repo that
has the new pinned commit numbers for the submodule.
2. In the containing repo (again), run:
git submodule update --init --recursive

This will fetch the submodule data and set you up to point at the correct commit.

### 30.5 Updating the Actual Submodule Itself
What do I mean by this? Let’s say the submodule holds some library, and you need to make a bug fix in
the library. And you need people who use this repo as a submodule (or otherwise) to get the changes.
So how to make this happen?
Either do it from a standalone repo, or you can also do it in situ in submodule directory.

#### 30.5.1 Modify the Submodule Repo Elsewhere
The way that’s easiest for my tiny human brain is to clone the submodule independently of any other repos.
That is, clone it like it’s not a submodule at all.
Then you can push, pull, modify, etc. all you want.
And then when you have it all fixed, you can go to the submodule directory and do a git fetch to pull
down the new commits.
At that point, it might be convenient to run this:
$ git log HEAD^..origin/main

### 30.6 Getting the Submodule Status

This will show you all the commits between HEAD and origin/main, inclusive so you can see what’s
been done. (Assuming they’re related, that is. If they’re on divergent branches you’ll have to get more
creative.)
Then you choose the commit you want to pin HEAD to, switch to that, and run an add/commit from the
containing repo, as outlined in Setting the Commit for the Submodule, above.

#### 30.5.2 Modify the Submodule Repo in the Submodule Directory
But wait! If the submodule is a full-blown repo itself, can’t you just edit in the submodule directory?
Yes! You totally can.
The only weird part is that you might have a detached HEAD in your submodule, so be sure to check out a
branch that you can push if you want to go this route.
For example:

Then make your changes and push them (from the submodule directory).
At this point, the containing repo is still pinned to the old commit. So you’ll want to run an add/commit
from the containing repo, as outlined in Setting the Commit for the Submodule, above.

### 30.6 Getting the Submodule Status
When it comes to which commit the submodule is pinned to, there are some commands that are quite
helpful.
The first is git submodule status. This will tell you where the submodule HEAD is currently.
For example, running from the containing repo:
$ git submodule status
898650e74c18cf4b30bdd07297d638de4a6fc7dd mysubmod (heads/main)

This tells me that HEAD in the mysubmod directory is at commit 89865.
But what if you see this with a + sign in front:
$ git submodule status
+1c10d608190194b7f9fbb9a442abd5c63c74cdfa mysubmod (heads/main)

That + means that, although HEAD in the submodule is at commit 1c10d, the containing repo has the
submodule pinned to a different commit! You might see this happen after you pull a submodule (thus
moving HEAD), but haven’t updated the containing repo to match.
If you see the +, git status will also tell you more:
mysubmod (new commits)

Sure enough—we have changed HEAD in the submodule so its directory shows as modified.

You can get rid of the plus by either pinning the repo to a new commit as outlined in Setting the Commit for
the Submodule, above, or by moving the submodule HEAD back to where the containing module expects
There can also be a - in front of the commit hash. This means the submodule hasn’t been
initialized or downloaded. Try a git submodule update --recursive --init.
How do we figure out where the containing module expects the submodule HEAD to be? With this handy
command:
$ git ls-tree HEAD mysubmod
160000 commit 898650e74c18cf4b30bdd07297d638de4a6fc7dd

mysubmod

### 30.7 Some Behind the Scenes
Not really behind the scenes, actually, but I wanted to point out the historic steps to initialize the submodule
that we’ve shortcutted by using some command line switches.
For example, when we cloned the repo with the submodule initially, we used this:
$ git clone --recurse-submodules \

That --recurse-submodules did a lot of work for us, cloning the submodule and setting everything up
so it was ready to use.
We also noted that if we forgot that switch, we could still pull it off:
$ git clone \
$ cd git-example-submodule-repo
$ git submodule update --recursive --init

So --recurse-submodules was going that work for us.
But the rabbit hole goes farther! That --init does a bunch for us, too. Let’s break it down into a full
by-hand process. Don’t worry—it’s just a couple steps:
$ git clone \
$ cd git-example-submodule-repo
$ git submodule init
$ git submodule update --recursive

So that --recurse-submodules switch to git clone was actually running a bunch of commands for us
behind the scenes.
A little breakdown:
When you first clone the containing repo, there’s a .gitmodules file in there indicating the directory name
and the URL of the submodule remote. But that’s not enough info. You have to do a git submodule init
to cause Git to parse that file and set up some internal bookkeeping.
After that, you can run git submodule update to bring in the submodule data to use.

### 30.8 Deleting a Submodule
This is a bit clunky, but not too bad if you follow the steps.

### 30.8 Deleting a Submodule

All this action takes place from the containing repo. Let’s say for this example we want to delete the
module mysubmod—substitute the name of your module in the following commands.
1. De-initialize the submodule. If the submodule HEAD is not where the containing module expects,
you can add -f to force this.
$ git submodule deinit mysubmod

This is partially undoing git submodule init.
2. Remove the bookkeeping information from the Git internals for the containing repo.
$ rm -rf .git/modules/mysubmod

This is the rest of undoing git submodule init.
3. Fix up .gitmodules by removing the section about the submodule. You can either do this by hand
in an editor, or you can ask Git to do it like so:
$ git config -f .gitmodules --remove-section submodule.mysubmod

This is undoing git submodule add.
4. Add the .gitmodules file to the stage.
$ git add .gitmodules

5. Delete the submodule tree from Git. This will also add the deletion to the stage.
git rm --cached mysubmod

This is sort of like undoing git submodule update.
6. Do a git status to make sure we’re set.
.gitmodules
mysubmod

Looks good.
7. Commit and push (if appropriate).
$ git commit -m "remove mysubmod submodule"

And that’s the end of the submodule.

Chapter 31

Tags
Tags are a way to annotate a particular commit. You can kind of think of them like branches that don’t
move.
A very common case is to take a particular commit with a version number like 1.2.3.
I can’t find any rules about what characters you can use in tag names, but it seems safe to use ASCII upper
and lower case, numbers, and punctuation like ., -, and _, etc.
There are two types of tags:
- Lightweight: Just a tag, e.g. v3.14.
- Annotated: Also a tag, e.g. v3.14, but includes a message and author, like a commit.
You can generally use tags the same way you’d use branches (you can diff them, switch to them, etc.)
except they don’t move.
And you can see them in the log with the other branch information.
commit 4fa1199d17a97990a7721eb8a73a4ee50 (HEAD -> main, tag: v3.14)
Sat Jan 25 19:04:43 2025 -0800
Update the stuff
commit c265e0371b3fc11588e4183b35e0b96e3 (tag: v3.10)
Sat Jan 25 18:59:58 2025 -0800
Add the stuff

Or get a list of all tags with just git tag.

### 31.1 Lightweight Tags
Adding a lightweight tag is easy enough. First, switch to the commit you want to tag, and then run this,
assuming you want a tag called tagname:
$ git tag tagname

You can also tag a commit, or anything that refers to a commit (like a branch or even another tag):
$ git tag CPE1704TKS 4fa12
$ git tag plover feature99

Chapter 31. Tags

### 31.2 Annotated Tags
Adding an annotated tag is just about as easy. Add the -a for “annotate” switch.
Since an annotated tag is more like a commit, it’s going to prompt for a message. But you can also use -m
to specify it on the command line.
$ git tag -a v3490

Or if you want to specify the message on the command line:
$ git tag -a v3490 -m "tag message"

### 31.3 Pushing Tags
By default, the tags only exist on your local repo, even if you do a regular push. You have to tell it you
want to push tags explicitly.
If you want to push all new tags, you can:
$ git push --tags
$ git push origin --tags

If you want to just push one tag, you must specify the remote:
$ git push origin tag3.14

After a tag is pushed, other collaborators will automatically get the tags when they pull.

### 31.4 Deleting Tags
You can delete a tag on your repo like this:
$ git tag -d tagname

And that’s easy enough. Except if you’ve already pushed on the server. If you have, then the next time
you pull you’ll get the tag again.
So you’ll have to delete the one on the remote, as well, which also must be named explicitly:
$ git push origin -d tagname

That’ll delete the tag on the server, but it won’t delete it from other people’s clones. In fact, there’s no easy
way to do this.
The basic idea is that tags, once created, shouldn’t be deleted. Now, if you haven’t yet pushed, no problem.
Add, delete, and change all you want. But once you’ve pushed (and someone has pulled), if you need to
change a tag, just make a new tag.
That’s not a law; it’s just more of a recommended guideline.

Chapter 32

Worktrees
Let’s say you have your code in one window and you’re happily looking at main. And then you think, “It
would be nice to look at some files on foobranch for a moment.”
But you’re in the middle of something on main. So you go through the trouble of saving, stashing, switching to foobranch, looking at what you need, and then switching back, popping the stash, and editing your
file.
And then precisely 2.3 seconds later, you realize you need to look at foobranch again. Gah.
You can’t have two branches checked out in the same working tree at the same time. So what are you
supposed to do if you want to look at both at once?
Sure, you can make another clone, but that might be prohibitive if the amount of data in the clone is large.
You could do a shallow clone… but now it just feels hackish.
Turns out worktrees give us a better way. With git worktree, you can make another, separate working
tree at a different branch. And then looking at both of them is just a matter of cd or having two terminal
windows open at the same time.

### 32.1 Worktree Rules and Regulations
Let’s put a quick note here about some ground rules.
1. No two worktrees (on the same repo) may refer to the same branch at the same time. That is, all
worktrees must refer to different branches. If you try to switch to, say, main on two worktrees
simultaneously, Git will stop you.
2. You can put the new worktree anywhere you want. But my strong recommendation is that you place
it outside the existing working tree, as a sibling directory.
3. You can run all regular Git commands from any of the working trees, including committing, pushing,
and pulling.
4. A worktree is not a clone. It’s another view into the repo. Commits made in one working tree are
immediately available (but not automatically switched to) in the other because both working trees
are looking at the same local repo! (Unlike a clone where two clones would be associated with the
same remote repo.)
5. Only one of the worktrees is the real one (called the “main working tree”, no relation to the main
branch). The others don’t have a proper .git directory. Do not delete the real one unless you want
to lose all your git metadata! Always use git worktree remove to remove worktrees because it’ll
refuse to remove the main one if you foolishly try to do so.
With that boring legalese out of the way, let’s get something going!

Chapter 32. Worktrees

### 32.2 Making a New Worktree
Let’s say you’re in the root of a repo called wumpus on branch main. And you want to look at another
branch called arrow in a new working tree.
We’re going to use git worktree add and we’re going to give it two things.
1. The directory name of where the worktree should go. Since I’m checking out the arrow branch
on the wumpus repo there, I’m going to just call it ../wumpus-arrow. You could call it anything,
though.
Also note the ../; that’s to get us to the parent directory so that wumpus-arrow will be created as
a sibling directory to wumpus.
2. We also need to give it the branch to switch to in that worktree. Again, this can’t be a branch that’s
checked out in any other working tree.
Let’s do it!
$ git worktree add ../wumpus-arrow arrow
Preparing worktree (checking out 'arrow')
HEAD is now at 7da9b7f fix arrow flight

There we have it. We can now cd to that directory and look around.
$ cd ../wumpus-arrow
On branch arrow

Or you could have two windows open. One would be in the wumpus/ directory to see branch main, and
the other would be in the wumpus-arrow/ directory to see branch arrow.

### 32.3 Removing a Worktree
First, make sure you don’t have any uncommitted modifications in the condemned worktree. Then figure
out the path to it. And then remove it.
Let’s say we’re in the wumpus/ directory from the previous example. From there, I could delete the
wumpus-arrow/ worktree like so:
$ git worktree remove ../wumpus-arrow

And that would be that.
Again, this doesn’t delete any commits that you made from that worktree; the worktree is just a view onto
the same repo as the main working tree, so the commits are already stored in the repo the instant you make
them from any of the worktrees.
The path you specify for worktree remove doesn’t have to match character-for-character the one you
specified with worktree add. It just has to refer to the same directory.
For example, if I were in the wumpus/ directory, this would accomplish the same thing as the first example:
$ cd ..
$ git worktree remove wumpus-arrow

You can even blow away the worktree you’re in right now:
$ git worktree remove .

### 32.4 Listing Worktrees

And, finally, if you try to remove the main working tree, you’re stopped by the Git police.
$ git worktree remove wumpus
fatal: 'wumpus' is a main working tree

### 32.4 Listing Worktrees
You can see all your worktrees and determine which one is the main working tree with the worktree list
command.
$ git worktree list
/home/user/wumpus
/home/user/wumpus-arrow

30d669a [main]
7da9b7f [arrow]

That’ll show you all the working trees with their directories on the left, their commit hashes in the middle,
and the branch names on the right.
The first worktree listed is the main working tree, i.e. the one you can’t remove.

### 32.5 Worktrees and Detached HEAD
You can’t have the same branch checked out in two worktrees on the same repo because that would mean
two worktrees would be fighting over the placement of a single branch reference.
However, both worktrees do have their own HEAD! There’s no conflict there. So you could have one
worktree on main and the other with a detached HEAD on the same commit as main. Of course, any
commits on the detached HEAD won’t move main at all, so there’s no conflict.
$ cd ../wumpus-arrow
$ git switch --detach main
HEAD is now at 30d669a add drafts
$ git worktree list
/home/user/wumpus
/home/user/wumpus-arrow

30d669a [main]
30d669a (detached HEAD)

In that example, we see both worktrees are pointed at the same commit 30d669a but we’re OK since
they’re not checked out at the same branch.
You can also add a new worktree with a detached HEAD like in the next example where we detach the new
worktree’s HEAD at the main commit.
$ git worktree add --detach ../wumpus-worktree main

Finally, if you specify a commit hash instead of branch when creating a new worktree, it will be automatically be created with a detached HEAD.

Chapter 32. Worktrees

Chapter 33

Appendix: Making a Playground
In programming circles in general, a playground is a place you can go to mess with code and tech and not
worry about messing up your production system.
And there are places you can go online to find these, but with Git, I find it’s just as easy to make your own
local repo.
Here’s a way to make a new local repo called playground out of the current directory. (You should not
be under a Git repo at this time; create the playground outside other existing repos.)
$ git init playground
Initialized empty Git repository in /user/playground/.git/
playground isn’t a special name. You can call it foo or anything. I’ll just use it for this example.

What that command did was create a new subdirectory called playground and create a Git repo in it.
Let’s continue at the end: how do you delete the repo? You just remove the directory.
$ rm -rf playground

And let’s create it again:
$ git init playground

We have all the power!
This repo only exists on this computer; it has no remotes and no way to push. You could add
that stuff later, if you wanted, but playgrounds tend to be temporary areas where you’re just trying
things out.
Let’s go into the playground and check it out.
$ cd playground
$ ls -la
total 4
drwxr-xr-x 3 user group
18 Jul 13 14:43 .
drwxr-xr-x 22 user group 4096 Jul 13 14:43 ..
drwxr-xr-x 7 user group 119 Jul 13 14:43 .git

There’s a directory there called .git that has all the metadata in it.
If we wanted to change this directory from a Git repo to just a normal directory, we could
run this:

Chapter 33. Appendix: Making a Playground

$ rm -rf .git

Again, we have all the power! But let’s show some restraint and not do that yet.
What can we do?
What can’t we do? Let’s make a file and see where we stand:
$ echo "Hello, world" > hello.txt

$ ls -l
total 4
-rw-r--r-- 1 user group 13 Jul 13 14:47 hello.txt
No commits yet
hello.txt
nothing added to commit but untracked files present (use "git
add" to track)

Now we have an untracked file.
We can git add it, we can git commit it, we can create branches, we can merge them and make conflicts
and resolve them and git rebase and git reset and all kinds of stuff.
We don’t have a remote, so the only things we can’t do involve pushing and pulling.
But it turns out we can even make that happen! Let’s see how.

### 33.1 Cloning Bare Repos
A bare repo is one without a working tree. You can’t go in there to see files, because they don’t exist in
there in a normal sense. The only thing that’s there is metadata and the commit snapshots.
You can clone, push, and pull bare repos.
Let’s make one (again, you could name it anything you want), noting the --bare command line option:
$ git init --bare origin_repo
Initialized empty Git repository in /user/origin_repo/

If you look in there (to be clear, you have no reason to) you’ll just see metadata and directories.
Before we can use it, we’d better clone it. For ease, we’ll do this from the same directory we created it.
$ git clone origin_repo playground
Cloning into 'playground'...
warning: You appear to have cloned an empty repository.
done.

It is empty, naturally. We haven’t made any commits.
Now we have two repos in this directory:

### 33.1 Cloning Bare Repos

- origin_repo: the bare repo we cloned, and:
- playground: the repo we cloned from it.
Let’s jump in there and see what’s up:
$ cd playground
/user/origin_repo (fetch)
/user/origin_repo (push)

We have remotes! Of course we do. We cloned this repo, and Git automatically sets up the origin remote.
And remember that origin is just an alias for some remote that’s identified somehow. We’re used to seeing remotes that start with https or ssh, but here’s an example of a remote that’s just another subdirectory
on your disk.
Let’s make a file and commit it, and see if we can push!
$ echo "Hello, world" > hello.txt
$ git add hello.txt
$ git commit -m added
[main (root-commit) 4a82a14] added
create mode 100644 hello.txt
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 907 bytes | 907.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To /user/origin_repo
main -> main
$ git branch -va
- main
4a82a14 added
remotes/origin/main 4a82a14 added

And we’ve successfully pushed our file up to origin.
Finally, let’s make another clone. First we’ll cd back down to where origin_repo is and clone again
this time into playground2:
$ git clone origin_repo playground2
Cloning into 'playground2'...
done.

Let’s cd in there and see what we have. It’s a clone of the repo, so we’d better see the hello.txt we
pushed in there from playground earlier.
$ cd playground2
hello.txt
$ cat hello.txt
Hello, world

Voila! It’s there!

Chapter 33. Appendix: Making a Playground

Since playground and playground2 are both clones of the same repo, you can push from one and pull
from the other to get the changes.
You can even make conflicting changes and try to git pull or git pull --rebase and see how things
go wrong and how to fix them.
And if everything goes completely off the rails, you can just delete the directories and start again. It’s a
playground!

### 33.2 Automating Playground Builds
It can be tedious to continually destroy and recreate repos that you’re trying to learn from. I suggest
putting your commands in a shell script, which is just a text file that contains the commands to run.
Let’s say you make a new text file called buildrepo.sh and you put the following text in it:
rm -rf playground
git init playground # Create a new one
cd playground
echo "Hello, world!" > hello.txt
echo "foobar" > foobar.txt
git add hello.txt foobar.txt
git commit -m added
echo "foobar again" >> foobar.txt # Append text
git add foobar.txt
git commit -m updated

That’s just a bunch of shell commands. But here’s the fun bit: if you run sh (the shell) with buildrepo.sh
as an argument, it will run all those commands in order!
$ sh buildrepo.sh
Initialized empty Git repository in /user/playground/.git/
[main (root-commit) 2239237] added
2 files changed, 2 insertions(+)
create mode 100644 foobar.txt
create mode 100644 hello.txt
[main 0533186] updated

To debug a shell script you can run it like this: sh -x buildrepo.sh and it will show you the
commands it is running.
After that, we can cd in there and see what happened:
$ cd playground
commit 05331869d77973dfbac38a31c40a44f99225e85d
Sat Jul 13 15:19:42 2024 -0700
updated
commit 2239237cc44d11e9479dcc610e5d02ad283766ce
Sat Jul 13 15:19:41 2024 -0700

### 33.2 Automating Playground Builds

$ cat foobar.txt
foobar
foobar again

By putting the initialization commands in a shell script, it’s almost like having a “saved game” at that
point. You can just rerun the shell script any time you want the same playground set up.

Chapter 33. Appendix: Making a Playground

Chapter 34

Appendix: Getting Out of Editors
If you try to git commit and don’t specify -m for a message, or if you git pull and there’s a non-fastforward merge, or if you git merge and there’s a non-fast-forward merge and you don’t specify -m, or
what I’m sure are a host of other reasons, you might get popped into an editor.
And you might not be familiar with that editor.
So here’s how to get out of it.
- Nano: If the editor says “Nano” or “Pico” in the upper left, then edit the commit message (if you
want), then then hit CTRL-X, and then hit Y to save, then ENTER to accept the given filename.
- Vim: If the screen has a bunch of ~ characters down the left and a crazy-looking file name at the
bottom maybe with the word All, you’re in Vim or some other vi (“vee eye”) variant. Press i, then
type a message (if you want), then hit the ESC key in the upper left, then type two capital Zs in a
row. ZZ. That should save and exit.
I love Vim. But it took a while. If you want to learn more, see the Appendix on Using Vim, that
has the briefest of tutorials. I guess the previous paragraph was really the briefest, so we’ll call it
the second-briefest.

Chapter 34. Appendix: Getting Out of Editors

Chapter 35

Appendix: Errors and Scary Messages
35.1 Detached Head
Did you get this alarmingly guillotinesque message?
You are in 'detached HEAD' state. You can look around, make
experimental changes and commit them, and you can discard any
commits you make in this state without impacting any branches by
switching back to a branch.
If you want to create a new branch to retain commits you create,
you may do so (now or later) by using -c with the switch command.
Example:
git switch -c <new-branch-name>
Or undo this operation with:
git switch Turn off this advice by setting config variable advice.detachedHead
to false
HEAD is now at 0da5af9 line 1

This means that you’ve checked out a commit directly instead of checking out a branch. That is, your
HEAD is no longer attached to a branch, i.e. it is “detached”.
To get out of this, you can:
1. Undo the checkout that got you detached:
git switch -
