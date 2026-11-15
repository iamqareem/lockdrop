---
id: beej-git-02
title: "Beej's Guide to Git — Use git merge --abort to abort the merge., Do a git commit to…"
slug: beej-git-02-beej-s-guide-to-git-use-git-merge-abort-to-abort-the-merge-d
source: "Beej's Guide to Git"
sourceSection: "2. Use git merge --abort to abort the merge., 3. Do a git commit to finalize the merge., 3. The user commits the file with git commit. The file is now Unmodified and is part of the repo, 2. Restore the file from that commit., 2. The private, internal version that’s on dev."
track: git-ops
tier: free
tags: [git, version-control, devops]
summary: "The second just rolls back the merge making it as if I hadn’t run git merge in the first place. Covers 5 sections: Use git merge --abort to abort the merge., Do a git commit to finalize the merge., The user commits the file with git co."
---
# Beej's Guide to Git — Use git merge --abort to abort the merge., Do a git commit to…

## 2. Use git merge --abort to abort the merge.
The second just rolls back the merge making it as if I hadn’t run git merge in the first place.
So let’s focus on the first. What are these conflicts and how do I resolve them?

### 6.4 What a Conflict Looks Like
My error message above is telling me that foo.py has unmerged paths. So look at what’s happened with
that file.
Before I started any of this, the file foo.py only had this in it on branch main:

And I added a line so it looked like this:
print("Commit 4")

And committed it.

Chapter 6. Merging and Conflicts

But what I didn’t realize was that my teammate had also made another commit on newbranch that added
different lines to the bottom of the file.
So when I went to merge newbranch into main, I got this conflict. Git doesn’t know which additional
lines are correct.
Here’s where the fun begins. Let’s edit foo.py here in the middle of the merge and see what it looks
like:
<<<<<<< HEAD
print("Commit 4")
=======
print("Commit 2")
print("Commit 3")
>>>>>>> newbranch

What the giblets is all that? Git has totally screwed with the contents of my file!
Yes, it has! But not for no reason; let’s examine what’s in there.
We have three delimiters: <<<<<<, ======, and >>>>>>.
Everything from the top delimiter to the middle one is what’s in HEAD (the branch you’re on and merging
into).
Everything from the middle delimiter to the bottom one is what’s in newbranch (the branch you’re merging from).
So Git has “helpfully” given us the information we need to make a semi-informed decision about what to
do.
And here’s exactly the steps we must follow:
1. Edit the conflicting file(s), remove all those extra lines, and make the file(s) Right.
2. Do a git add to add the file(s).
## 3. Do a git commit to finalize the merge.
Now, when I say “make the file Right”, what does that mean? It means that I need to have a chat with my
teammate and figure out what this code is supposed to do. We clearly have different ideas, and only one
of them is right.
So we have a chat and hash it out. We finally decide the file should look like this:
print("Commit 4")
print("Commit 3")

And then I (since I’m the one doing the merge), edit foo.py and remove all the merge delimiters and
everything else, and make it look exactly like we agreed upon. I make it look Right.
Then I add the file to the stage:
$ git add foo.py
All conflicts fixed but you are still merging.
(use "git commit" to conclude merge)
foo.py

Notice that git status is telling me we’re still in the merging state, but I’ve resolved the conflicts. It
tells me to git commit to finish the merge.

### 6.4 What a Conflict Looks Like

What if I added the conflict file too soon? For example, what if you add it but then you realize
there are still unresolved conflicts or the file isn’t Right? If you haven’t committed yet, you have
a couple options. (If you have committed, all you can do is reset or revert.)
One option is to just edit the file again, and re-add it when it’s done. (After editing the file will
show up as a “change not staged for commit” until you add it again.)
Another option is to move the file off the stage with git checkout --merge on the file to get it
back to the “both modified” state. Helpfully, this won’t delete the changes you already added. This
is especially useful if you’re using a merge tool.
So now that we’ve added the file, let’s make the merge commit. Here we’re manually making the merge
commit, unlike above where Git was able to automatically make it.
$ git commit -m "Merged with newbranch"
[main 668b506] Merged with newbranch

And that’s it! Let’s check status just to be sure:

Success!
Just to wrap up, let’s take a look at the log at this point:
commit 668b5065aa803fa496951b70159474e164d4d3d2 (HEAD -> main)
Merge: e4b69af 81d6f58
Sun Feb 4 13:18:09 2024 -0800
Merged with newbranch
commit e4b69af05724dc4ef37594e06d0fd323ca1b8578
Sun Feb 4 13:16:32 2024 -0800
Commit 4
commit 81d6f58b5982d39a1d92af06b812777dbb452879 (newbranch)
Sun Feb 4 13:16:32 2024 -0800
Commit 3
commit 3ab961073374ec26734c933503a8aa988c94185b
Sun Feb 4 13:16:32 2024 -0800
Commit 1

We see a few things. One is that our merge commit is pointed to by main (and HEAD). And looking down
a couple commits, we see our now-direct ancestor, newbranch back on Commit 3.
We also see a Merge: line on that top commit. It lists the commit hashes for the two commits that it came
from (the first 7 digits, anyway), since the merge commit has two parents.

Chapter 6. Merging and Conflicts

### 6.5 Why Merge Conflicts Happen
Generally, it’s because you haven’t coordinated with your team about who is responsible for which pieces
of code. Generally two people shouldn’t be editing the same lines of code in the same file at once.
That said, there are absolutely cases where it does happen and is expected. The key is to communicate
with your team when resolving the conflict if you don’t know what is Right.

### 6.6 Merging with IDEs or other Merge Tools
IDEs like VS Code might have a special merge mode where you can choose one set of changes or another,
or both. Likely “both” is what you want, but make an informed decision on the matter.
Also, even when selecting “both”, it could be that the editor puts them in the wrong order. It’s up to you
to make sure the file is Right before making the final commit to complete the merge.
You can do this by, after the tool has been used to resolve the conflict, opening the file again in a new
window and making sure it’s as you want it, and editing it to be if it’s not.
For more information about merge tools, see the Mergetool chapter.

### 6.7 Merge Big Ideas
DON’T PANIC! If you have a merge conflict, you can totally work it out. They’re a common occurrence,
and the more of them you do, the better at them you get.
Nothing to worry about. Everything is in Git’s commit history, so even if you botch it, you can always
get things back the way they were.

Chapter 7

Using Subdirectories with Git
This is a shorter chapter, but we want to talk about Git’s behavior when it comes to working in subdirectories and some gotchas that you probably don’t want to get wrapped up in.

### 7.1 Repos and Subdirectories
When you run a git command, Git looks for a special directory called .git (“dot git”) in the current
directory. As we’ve already mentioned, this is the directory, created when you create the repo, that holds
the metadata about the repo.
But what if you’re in a subdirectory in your project, and there’s no .git directory there?
Git starts by looking in the current directory for .git. If it can’t find it there, it looks in the parent directory.
And if it’s not there, it looks in the grandparent, etc., all the way back to the root directory.

#### 7.1.1 What about Subprojects?
One common student question is, “Should I make one single repo for CS101 with subdirectories for each
project? Or should I make a different repo for every project?”
Firstly, see if your instructor has a requirement or preference, but other than that, it doesn’t technically
matter which approach you use.
In real life, bigger repos (much bigger than you’ll typically be using for a class) take a lot longer to clone
due to their size.
What happens if you initialize a new Git repo inside an existing repo? It’s not great. Don’t do this.
For mixing and matching different repos in the same hierarchy, Git has the concept of submodules, and
you can find more information in the Submodules chapter. If you’re in school, submodules are typically
not used.

### 7.2 Accidentally Making a Repo in your Home Directory
Git won’t stop you from making a repo in your home directory, i.e. a repo that contains everything in all
your directories.
But that’s probably not what you wanted to do.
How does one make this mistake? Usually it’s with git init . in your home directory. You can also
make this error by launching VS Code from your home directory and telling it to “Initialize Repository”
in that location.
This is particularly insidious because if you’re in a subdirectory that you think is a standalone repo, you
might have been misled since Git searches parent folder for the .git directory and it could be finding the
spurious one you accidentally made in your home directory.

Chapter 7. Using Subdirectories with Git

We1 recommend against one big repo from your home directory. You should have separate subdirectories
for each of your repos.
If you accidentally create a repo where you didn’t want to, changing a Git repo to a regular subdirectory
is as simple as removing the .git directory. Be careful that you’re removing the correct one when you
do this!
One hack you can do to prevent Git from creating a repo in your home directory is to preemptively
put an unwriteable .git directory there.
$ mkdir ~/.git
$ chmod 000 ~/.git

This way when Git tries to make its metadata folder there, it’ll be stopped because you don’t have
write permission to that .git directory.
(You can always delete this directory with rmdir even if you don’t have write permission to it.)

### 7.3 Empty Subdirectories in Repos
Turns out Git doesn’t support this. It only tracks files, so if you want a subdirectory represented in your
repo, you must have at least one file in it.
A common thing to do is add an empty file called .gitkeep (“dot git keep”) to the subdirectory, then
add it to the repo. This will cause Git to recreate the subdirectory when it clones or merges the .gitkeep
directory.
The file .gitkeep isn’t special in any way, other than convention. The file could be called anything.
For example, if you know you’ll need to eventually put a .gitignore in that directory, you might
just use that instead. Or a README.

All Git enthusiasts collectively, that is.

Chapter 8

Ignoring Files with .gitignore
What if you have files in your subdirectory you don’t want Git to pay any attention to? Like maybe you
have some temporary files you don’t want to see in the repo. Or maybe you have an executable you built
from a C project and you don’t want that checked in because your incredibly strict instructor won’t grade
your project if the repo contains any build products? For example.
That’s what this part of the guide is all about.

### 8.1 Adding a .gitignore File
In any directory of a Git repository, you can add a .gitignore (“dot gitignore”) file.
This is a simple textfile that contains a list of file names to ignore.
Let’s say I have a C project that builds an executable called “doom”. I wouldn’t want to check that into
my source repo because it’s not source, and it’s just a big binary that takes a bunch of disk.
But when I get the status, it’s annoying to see Git complaining about it:
doom
nothing added to commit but untracked files present (use "git
add" to track)

So I edit a .gitignore file in that directory and add this one line to it:
doom

Now I run status again:
.gitignore
nothing added to commit but untracked files present (use "git
add" to track)

Chapter 8. Ignoring Files with .gitignore

What? Same thing? Not quite! Read the fine print!
It used to be complaining that doom was untracked, but now it’s not complaining. So the .gitignore
worked. Woo hoo!
But Git has found another untracked file in the brand new .gitignore. So we should add that to the
repo.
Always put your .gitignore files in the repo unless you have a compelling reason not to. This way
they’ll exist in all your clones, which is handy.
$ git add .gitignore
$ git commit -m Added
[main 07582ad] Added
create mode 100644 .gitignore

Now we get the status:

and we’re all clear. That doom file is still there in the working tree, but Git pays it no heed since it’s in the
.gitignore.

### 8.2 Can I Specify Subdirectories in .gitignore?
Yes!
You can be as specific or as non-specific as you like with file matches.
Here’s a .gitignore looking for a very specific file:
subdir/subdir2/foo.txt

That will match anywhere in the repo. If you want to only match a specific file from the repo root, you
can prepend a slash:
/subdir/subdir2/foo.txt

Note that means subdir in the root of the repo, not the root directory of your entire filesystem.
If you put this in your .gitignore:

it will ignore foo.txt in all subdirectories of the repo.

### 8.3 Where do I Put the .gitignore?
You can add .gitignore files to any subdirectories of your repo. But how they behave depends on where
they are.
The rule is this: each .gitignore file applies to its containing directory and all the subdirectories below
So if you put a .gitignore in your repo’s root directory that has foo.txt in it, every single foo.txt in
every subdirectory of your repo will be ignored.

### 8.4 Wildcards

Use the highest-level .gitignore file to block things you know you don’t want anywhere in your repo.
If you add additional .gitignore files to subdirectories, those only apply to that subdirectory and below.
The idea is that you start with the most broadly applicable set of ignored files in your repo root, and then
get more specific in the subdirectories.
For simple repos, you’re fine just having one .gitignore in the repo root directory.
And we’ll also talk about overriding .gitignore entries soon.

### 8.4 Wildcards
Do I have to individually list all the files I don’t want in the .gitignore? What a pain!
Luckily Git supports wildcards in ignored file naming.
For example, if we wanted to block all the files that ended with a .tmp or .swp (Vim’s temp file name)
extension, we could use the * (“splat”) wildcard for that. Let’s make a .gitignore that blocks those:
*.swp

And now any files ending with .tmp or .swp will be ignored.
Turns out that Vim has two kinds of swap files, .swp and .swo. So could we add them like this?
*.swo
*.swp

Sure! That works, but there’s a shorter way where you can tell Git to match any character in a bracketed
set. This is equivalent to the above:
*.sw[op]

You can read that last line as, “Match file names that begins with any sequence of characters, followed by
.sw, followed by either o or p.”

### 8.5 Negated .gitignore Rules
What if your root .gitignore is ignoring *.tmp files for the entire repo. No problem.
But then later in development you have some deeply nested subdirectory that has a file needed.tmp that
you really need to get into Git.
Bad news, though, since *.tmp is ignored at the root level across all subdirectories in the repo! Can we
fix it?
Yes! You can add a new .gitignore to the subdirectory with needed.tmp in it, with these contents:
!needed.tmp

This tells Git, “Hey, if you were ignoring needed.tmp because of some higher-up ignore rule, please stop
ignoring it.”
So while needed.tmp was being ignored because of the root level ignore file, this more-specific file
overrides that.
If you needed to allow all .tmp files in this subdirectory, you could use wildcards:

Chapter 8. Ignoring Files with .gitignore

!*.tmp

And that would make it so all .tmp files in this subdirectory were not ignored

### 8.6 How To Ignore All Files Except a Few?
You can use the negated rules for that.
Here’s a .gitignore that ignores everything except files called *.c or Makefile:
*
!*.c
!Makefile

The first line ignores everything. The next two lines negate that rule for those specific files.

### 8.7 Getting Premade .gitignore Files
Here’s a repo1 with a whole bunch.
But you can also roll your own as needed. Use git status often to see if any files are there you want to
ignore.
When you create a new repo on GitHub, it also gives you the option to choose a prepopulated .gitignore.
Warning! Only do this if you’re not planning to push an already-existing repo into this newly-made
GitHub repo. If you plan to do this, GitHub’s .gitignore will get in the way.

https://github.com/github/gitignore

Chapter 9

Remotes: Repos in Other Places
A remote is just a name for a remote server you can clone, push, and pull from.
We identify these by a URL. With GitHub, this is a URL we copied when we went to clone the repo
initially.
It’s possible to use this URL to identify the server in our everyday Git usage, but it’s unwieldy to type. So
we give the remote server URLs nicknames that we just tend to call “remotes”.
A remote we’ve already seen a bunch of is origin. This is the nickname for the remote repo you cloned
from, and it gets set automatically by Git when you clone.

### 9.1 Remote and Branch Notation
Before we begin, note that Git uses slash notation to refer to a specific branch on a specific remote:
remotename/branchname.
For example, this refers to the main branch on the remote named origin:
origin/main

And this refers to the branch named feature3490 on a remote named nitfol:
nitfol/feature3490

We’ll talk more about this in the Remote Tracking Branches chapter.

### 9.2 Getting a List of Remotes
You can run git remote with the -v option in any repo directory to see what remotes you have for that
repo:
https://github.com/example-repo.git (fetch)
https://github.com/example-repo.git (push)

We see that we’re using the same URL for the remote named origin for both pull (part of which is fetch)
and push. Having the same URL for both is super common.
And that URL is the exact same one we copied from GitHub when cloning the repo in the first place.

Chapter 9. Remotes: Repos in Other Places

### 9.3 Changing a Remote’s URL
Remember that a remote name is just an alias for some URL that you cloned the repo from.
Let’s say that you are all set up with your SSH keys to use GitHub for both push and pull, but you
accidentally cloned the repo using the HTTPS URL. In that case, you’ll see the following remote:
https://github.com/example-repo.git (fetch)
https://github.com/example-repo.git (push)

And then you try to push, and GitHub tells you that you can’t push to an HTTPS remote… dang it!
You meant to copy the SSH URL when you cloned, which for me looks like:
git@github.com:beejjorgensen/git-example-repo.git

Luckily it’s not the end of the world. We can just change what the alias points to.
(The example below is split into two lines so that it’s not too wide for the book, but it can be on a single
line. The backslash lets Bash know that the line continues.)
$ git remote set-url origin \
git@github.com:beejjorgensen/git-example-repo.git

And now when we look at our remotes, we see:
git@github.com:beejjorgensen/git-example-repo.git (fetch)
git@github.com:beejjorgensen/git-example-repo.git (push)

And now we can push! (Assuming we have our SSH keys set up.)

### 9.4 Adding a Remote
There’s nothing stopping you from adding another remote.
A common example is if you forked a GitHub Project (more on that later). A fork is a GitHub construct
that enables you to easily clone someone else’s public repo into your own account, and gives you a handy
way to share changes you make with the original repo.
Let’s say I forked the Linux source repo. When I clone my fork, I’ll see these remotes:

git@github.com:beejjorgensen/linux.git (fetch)
git@github.com:beejjorgensen/linux.git (push)

I don’t have access to the real Linux source code, but I can fork it and get my own copy of the repo.
Now, if Linus Torvalds makes changes to his repo, I won’t automatically see them. So I’d like some way
to get his changes and merge them in with my repo.
I need some way to refer to his repo, so I’m going to add a remote called reallinux that points to it:
$ git remote add reallinux https://github.com/torvalds/linux.git

Now my remotes look like this:

git@github.com:beejjorgensen/linux.git (fetch)
git@github.com:beejjorgensen/linux.git (push)

### 9.4 Adding a Remote

reallinux
reallinux

https://github.com/torvalds/linux.git (fetch)
https://github.com/torvalds/linux.git (push)

Normally when setting up a remote that refers to the source of a forked repo on GitHub, people
tend to call that remote upstream, whereas I’ve clearly called it reallinux.
I did this because when we subsequently talk about remote tracking branches, we’re going to use
“upstream” to mean something else, and I don’t want the two to be confusing.
Just remember IRL when you set up a remote to point to the forked-from repo, it’s relatively customary to call that remote upstream.
Now I can run this to get all the changes from Linus’s repo:
$ git fetch reallinux

And I can merge it into my branch (the Linux repo uses master for the instead of main for the main
branch):
$ git switch master
$ git merge reallinux/master

That will merge the master branch from the reallinux into my local master, once we’ve dealt with
any conflicts.
If I make another commit, this will move my local HEAD and master to that new commit, and will leave
origin/master (my fork on GitHub) and reallinux/master (Linus’s repo) farther behind.
Let’s say for fun I made two commits that I didn’t have on my origin remote at GitHub. In that case, a
chopped up and fabricated-for-demonstration-purposes log might look like this:
commit 2d7d5d (HEAD -> master)
commit cde831
commit 311eb3 (origin/master)
commit d5d2cc (reallinux/master)

At this point I’d do a git push to send my local master changes to GitHub and catch up my
origin/master there. So the top commit would show:
commit 2d7d5d (HEAD -> master, origin/master)
commit cde831
commit 311eb3
commit d5d2cc (reallinux/master)

And reallinux/master would still be behind somewhere. (And there it would remain until Linus
deigned to merge my changes.)
It’s interesting that my local master can be out of sync from the master on origin, right?
We’ll look at this in the Remote Tracking Branches chapter.

Chapter 9. Remotes: Repos in Other Places

Chapter 10

Remote Tracking Branches
We’ve seen how to create local branches that you do work on, then merge back into the main branch, then
git push it up to a remote server.
This part of the guide is going to try to clarify what’s actually going on behind the scenes, as well as give
us a way to push our local branches to a remote for safe keeping.

### 10.1 Branches on Remotes
First, some refresher!
Recall that the remote repo you cloned yours from is a complete copy of your repo. The remote repo has
a main branch, and therefore your clone also has a main branch.
That’s right! When you make a GitHub repo and then clone it, there are two main branches!
How do we differentiate them?
Well, on your local clone, we just refer to branches by their plain name. When we say main or topic2,
we mean the local branch by that name on our repo.
If we want to talk about a branch on a remote, we have to give the remote name along with the branch
using that slash notation we’ve already seen:
origin/main
upstream/main
zork/mailbox
mailbox

Importantly, not only do the words origin/main refer to the main branch on origin in casual conversation, but you actually have a branch on your local repo called origin/main.
This is called a remote-tracking branch. It’s your local copy of the main branch on the remote. You can’t
move your local origin/main branch directly; Git does it for you as a matter of course when you interact
with the remote (e.g. when you push or pull).
We’re going to call the main branch on our local machines the local branch, and we’ll call the one on
origin the upstream branch.
And this is going to get confusing later when we name a remote upstream in a way that has
nothing to do with the upstream branch terminology we’re using here.
I want to go over that one more time to drive it home.
Let’s say you have these two branches on your computer because you’ve just cloned the remote repo at
the origin:

Chapter 10. Remote Tracking Branches

origin/main

When you have those two branches on your computer, there are actually three branches in the world.
1. main on your computer.
2. origin/main on your computer.
3. main on the origin computer, usually a different computer than yours, e.g. one at GitHub or something.
Notice that the first two of these are on the repo on your computer!
The branch origin/main is just where your computer thinks that main on the origin is. Your computer
got this information the last time you pulled or fetched from origin.
If other people have pushed to main on origin since your last pull, your origin/main on your local
computer won’t be up to date.
And normally you don’t have to worry about this much; when you try to push, Git will tell you if someone
else has pushed changes in the meantime and you have to pull first to update your origin/main branch.
No biggie.
But I wanted to spell that out so you had a more complete mental model of what’s happening behind the
curtain, here.

### 10.2 Listing Remote Tracking Branches
Remember how git branch listed the branches you had? Let’s power it up so you can see all the remote
tracking branches, as well. This will help in the following sections.
Basically, we just give it the -avv switch for “all” (to list the remote tracking branches) and “verbose” (to
give info about which commits they’re pointing to) and “verbose” again (to give info about which remote
branches map to which remote branches.
Here’s the result for the repo that holds the source for this book:
% git branch -avv
- main
2d63af5 [origin/main] indexing
sphinx
cdac325 [origin/sphinx] partial port
remotes/origin/HEAD
-> origin/main
remotes/origin/main
2d63af5 indexing
remotes/origin/sphinx cdac325 partial port

We see my two local branches (main and sphinx). Looking on those two top lines, you see remote
tracking branches in brackets (origin/main and origin/sphinx). When I push or pull from main or
sphinx, those are the remote tracking branches that are merged to.
Additionally, we see information about the remote below that.
The first line about remotes/origin/HEAD is a little strange. It just points to origin/main which simply
lets us know that main is the initial branch for the repo that Git will use when you clone it. You typically
don’t need to think about this line.
The remaining two lines tell us what commits the remote tracking branches origin/main and
origin/sphinx are pointing at. Looking closely, we see they’re pointing to the same commits as our
local main and sphinx indicating that everything is in sync. (As far as we know—someone else might
have pushed something to the repo since our last pull and we don’t know about that yet.)

### 10.3 Pushing to a Remote
Fun Fact: when you push or pull, you technically specify the remote and the branch you want to use. This
is me saying, “Push the branch I’m on right now (presumably main) and merge it into main on origin.

### 10.4 Making a Branch and Pushing to Remote

$ git push origin main

“But wait! I haven’t been doing that!”
It turns out there’s an option you can set to make it happen automatically. Let’s say you’re on the main
branch and then run this:
$ git push --set-upstream origin main
$ git push -u origin main

This will do a couple things:
1. It’ll push changes on your local main to the remote server (that’s the push origin main part).
2. It’ll remember that the remote branch origin/main is tracking your local main branch (that’s the
-u part).
And then, from then on, from the main branch, you can just:

and it’ll automatically push to origin/main thanks to your earlier usage of --set-upstream.
And git pull has the same option, as well, though you only need to do it once with either push or pull.
“But wait! I’ve never used --set-upstream, either!”
That’s because by default when you clone a repo, Git automagically sets up a local branch to track the
main branch on the remote.
Depending on how you made your repo, you might also have a reference to origin/HEAD. It
might be weird to think that there’s a HEAD ref on a remote server that you can see, but in this case
it’s just referring to the branch that you’ll be checking out by default when you clone the repo.
“OK, so what you’re telling me is that I can just git push and git pull like always and just ignore
everything you wrote in this section?”
Well… yes. Ish. No. We’re going to make use of this to push other branches to the remote!

### 10.4 Making a Branch and Pushing to Remote
I’m going to make a new local branch topic99:
$ git switch -c topic99
Switched to a new branch 'topic99'

And make some changes:
$ vim README.md
$ git add README.md
$ git commit -m "Some important additions"

In our log, we can see where all the branches are:
commit 79ddba75b144bad89e1cbd862e5f3b3409f6c498 (HEAD -> topic99)
Fri Feb 16 16:44:50 2024 -0800
Some important additions

Chapter 10. Remote Tracking Branches

commit 3be2ad2c31b627b431af8c8e592c01f4b989d621 (origin/main, main)
Fri Feb 16 16:14:13 2024 -0800
Initial checkin
HEAD refers to topic99, and that’s one commit ahead of main (local) and main (upstream on the origin

remote), as far as we know. And we know this because it’s one commit ahead of our remote-tracking
branch origin/main.
Now let’s push!
fatal: The current branch topic99 has no upstream branch.
To push the current branch and set the remote as upstream, use
git push --set-upstream origin topic99
To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.

Ouch. The short of all this is that we said “push”, and Git said, “To what? You haven’t associated this
branch with anything on the remote!”
And we haven’t. There’s no origin/topic99 remote-tracking branch, and certainly no topic99 branch
on that remote. Yet.
The fix is easy enough—Git already told us what to do.
$ git push --set-upstream origin topic99

And that will do it.
At this point, assuming you’ve pushed to GitHub, you could go to your GitHub page for the project, and
near the top left you should see something that looks like Figure 10.1.

Figure 10.1: Two branches on GitHub
If you pull down that main button, you’ll see topic99 there as well. You can select either branch and
view it in the GitHub interface.

### 10.5 Deleting Remote Tracking Branches
There are few things that can happen here.
1. Someone deletes the branch on the remote, but your corresponding remote tracking branch (the one
on your clone) still exists and you want to delete it.
2. You want to delete your remote tracking branch, and you want to leave the corresponding branch
untouched on the remote.
3. You delete your remote tracking branch and you want to delete the corresponding branch on the
remote, too.
For all of these, it’s good to have your working tree clean, of course.

### 10.6 Multiple Remotes

#### 10.5.1 Fetching Deleted Remote Branches
The first one is pretty easy. Let’s tell Git to delete all our remote tracking branches that no longer exist on
the origin remote:
$ git fetch --prune

or if you want to specify a remote:
$ git fetch --prune someremote

or if you want to prune all remotes:
$ git fetch --prune --all

#### 10.5.2 Deleting Your Remote Tracking Branch
In this case, you have a remote tracking branch on your clone that you want to delete. But you don’t want
to delete that branch from the server.
Use -d for delete and -r for remote:
$ git branch -dr remote/branch

For example:
$ git branch -dr origin/topic99

#### 10.5.3 Deleting a Branch on a Remote
Finally, let’s say you’ve deleted your remote tracking branch on your clone, as per above, and you also
want to delete it on the remote.
We’re going to (perhaps surprisingly) use git push for this.
To delete a branch on the remote, you:
$ git push someremote --delete branchname

For example:
$ git push origin --delete topic99

And that’s it! Make sure you delete your remote tracking branch if you haven’t done so already.

### 10.6 Multiple Remotes
It’s possible that you might have multiple remotes. (This is commonly put in place when you’ve forked
someone’s repo on GitHub.)
How do remote tracking branches work in that case?
Let’s say your main remote is called origin as usual. But you’ve also set another remote called remote2,
unoriginally.
Someone else pushes a new branch called foobranch (slightly more originally) up to remote2 and you’d
like to get it.
So you do this:

Chapter 10. Remote Tracking Branches

$ git fetch remote2
remote: Enumerating objects: 15, done.
remote: Counting objects: 100% (15/15), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 12 (delta 6), reused 11 (delta 5), pack-reused 0
Unpacking objects: 100% (12/12), 1.61 KiB | 34.00 KiB/s, done.
From github.com:user/somerepo
foobranch -> remote2/foobranch

So far so good. Let’s switch to it:
$ git switch foobranch
branch 'foobranch' set up to track 'remote2/foobranch'.
Switched to a new branch 'foobranch'

Wait! We’re tracking at remote2? That’s a little weird because it’s the other person’s repo. Maybe you
have permission to write to it, and that’s what you want to do. But it’s more probably you’d like your own
version of this branch on your repo as well.
You can do that by pushing it to your remote with -u again.
$ git push -u origin foobranch

And that’ll do it.
If you look at your branches with git branch -avv you’ll see now several foobranch variants for different clones.
foobranch
remotes/origin/foobranch
remotes/remote2/foobranch

If you want to keep your origin/foobranch in sync with that on remote2, you’ll have to do a bunch of
merging.
$ git fetch remote2
$ git switch foobranch
$ git merge remote2/foobranch
$ git push origin foobranch

(You can leave the origin foobranch off the push if you’ve already pushed it with -u earlier, of course.)
At that point, every foobranch should be on the same commit.

Chapter 11

File States
We’ve talked about this quite a bit in passing already.
If you create a new file, you have to git add it to the stage before you commit.
If you modify a file, you should git add it to the stage before you commit.
If you add a file foo.txt to the stage, you can remove it from the stage before you commit with
git restore --staged foo.txt.
So clearly files can exist in a variety of “states” and we can move them around between those states.
To figure out what state a file is in and get a hint on how to “undo” it from that state, git status is your
best friend (except in the case of renaming, but more on that mess soon).

### 11.1 What States Can Files in Git Be In?
There are four of them: Untracked, Unmodified, Modified, and Staged.
- Untracked: Git does not know anything about this file (e.g. you just created it in the working tree
and haven’t added it). Git will ignore it, but you’ll see it in the status.
You can make Git aware of this file by moving it to Staged State with git add.
Or you can simply remove the file if you don’t want it to exist, or you can add it to your .gitignore
if you want to leave it in place but still have Git ignore it.
- Unmodified: Git knows about this file and it’s in the repo. But you haven’t made any changes to it
since it was last committed.
You can move this file to Modified State by making changes to the file (and saving).
You can remove this file with git rm, which changes the removed file to the Staged State. (Wait—
removing the file puts it on the stage? Yes! More on that later.)
- Modified: Git knows about this file and knows that you’ve changed it. It’s ready for you to stage
those changes or to undo them.
You can change the file to Staged State with git add.
You can change the file to Unmodified State (throwing away your changes) with git restore.
- Staged: The file is ready to be included in the next commit.
You can change to Unmodified State by making a commit with git commit.
You can remove the file from the stage and back to Modified State with git restore --staged.
A file typically goes through this process to be added to a repo:
1. The user creates a new file and saves it. This file is Untracked.

Chapter 11. File States

2. The user adds the file with git add. The file is now Staged.

## 3. The user commits the file with git commit. The file is now Unmodified and is part of the repo
and ready to go.
After it’s in the repo, the typical file life cycle only differs by the first step:
1. The user changes the file and saves it. The file is now Modified.
2. The user adds the file with git add. The file is now Staged.
3. The user commits the file with git commit. The file is now Unmodified and is part of the repo
and ready to go.
Keep in mind that often a commit is a bundle of different changes to different files. All those files would
be added to the stage before the single commit.
Here’s a partial list of ways to change state:
- Untracked → git add foo.txt → Staged (as “new file”)
- Modified → git add foo.txt → Staged
- Modified → git restore foo.txt → Unmodified
- Unmodified → edit foo.txt → Modified (with your favorite editor)
- Staged → git commit → Unmodified
- Staged → git restore --staged → Modified
Again, git status will often give you advice of how to undo a state change.

### 11.2 Unmodified to Untracked
A variation of git rm tells Git to remove the file from the repo but leave it intact in the working tree.
Maybe you want to keep the file around but don’t want Git to track it any longer.
To make this happen, you use the --cached switch.
Here’s an example where we remove the file foo.txt from the repo but keep it around in our working
tree:
$ git rm --cached foo.txt
rm 'foo.txt'

There you see in the status output that Git has staged the file for deletion, but it’s also mentioning that
the file exists and is untracked. And a subsequent ls shows that the file still exists.
At this point, you can commit and the file would then be in Untracked state.

### 11.3 Files In Multiple States

### 11.3 Files In Multiple States
A file can actually sort of exist in multiple states at once. To be more technically accurate, there can be
copies of files which are in different states than one another. For instance, you might have one version of
a file on the stage, and another version of that file, with different modifications, in your working tree at
the same time. Technically these are actually different files since they don’t contain the same data.
Just remember that when you stage a file, it effectively stages a copy of that file as it exists right then. There
is nothing stopping you from making another modification to the file in the working tree and ending up
like this, where one version of the file is on the stage ready to commit, and another one is in the working
tree with additional changes not-yet-staged:

You can overwrite the version on the stage by adding it again. And various incantations of restore can
change the files in different ways. Look up the --staged and --worktree options for git restore.
I’ll leave how to move files around in these simultaneous states as an exercise to the reader, but I wanted
you to at least be aware of it.

Chapter 11. File States

Chapter 12

Comparing Files with Diff
The powerful git diff command can give you differences between two files or commits. We mentioned
it briefly at the beginning, but here we’re going to delve more deeply into all the things you can do with
It’s not the easiest thing to read at first, but you do get used to it after a while. My most common use case
is to quickly scan to remember what I’ve changed in the working tree so I know what to add to the stage
and what commit message to use.

### 12.1 Basic Usage
The most basic use case is that you’ve modified some files in your working tree and you want to see what
the differences are between what was there and what you added.
For example, let’s say I’ve modified my hello.py file (but haven’t staged it yet). I can check out what
I’ve changed like so:
diff --git a/hello.py b/hello.py
index 4a8f53f..8ee1fe4 100644
--- a/hello.py
+++ b/hello.py
@@ -1,4 +1,8 @@
def hello():
print("HELLO, WORLD!")
+def goodbye():
print("See ya!")
hello()
+goodbye()

What do we have there? Why, it’s an impenetrable mess, of course!
The End
All right, take a deep breath and let’s figure it out.
Since the output is plastered over with hello.py, we can safely assume this is the file we’re talking about.
If the diff is reporting on multiple files (e.g. you’re comparing two commits), each file will have its own
section in the output.

Chapter 12. Comparing Files with Diff

The index line has the blob hashes and file permissions. A blob hash is the hash of the specific
file in the states being compared. This isn’t something you need to worry about, typically. Or
maybe not even ever.
After that we have a couple lines indicating that the old version of the file a/hello.py is the one marked
with minus signs, and the new version (that you haven’t staged yet) is b/hello.py and is marked with
plus signs.
Then we have @@ -1,4 +1,8 @@. This means that lines 1-4 in the old version are shown, and lines 1-8 in
the new version are shown. (So clearly we’ve at least added some lines here.)
Finally, we get to the steak and potatoes of the whole thing—what has actually changed? Remembering
that the old version is minus and the new version is plus, let’s look at just that part of the diff again:
def hello():
print("HELLO, WORLD!")
+def goodbye():
print("See ya!")
hello()
+goodbye()

Rules:
- If a line is prefixed with -, it means this is how the line was in the old version.
- If a line is prefixed with +, it means this is how the line is in the new, modified version.
- If a line is not prefixed with anything, it means it is unchanged between the versions.
The diff won’t show you all the lines of the file! It only shows you what’s changed and some of
the surrounding lines. If there are changes in different parts of the file, the unchanged parts of the
file will be skipped over in the diff.
Another way to read the diff is that lines with a - have been removed and lines with a + have been added.

### 12.2 Diffing the Stage
What if you’ve added some stuff to the stage and you want to diff it against the previous commit?
Just typing git diff shows nothing!
Why? It’s because diff, by default, is showing the difference between your working tree and the stage.
You just staged that file, copying it from the working tree to the stage, so the two are identical. So a diff
shows no differences.
How do we diff the stage with the previous commit?
The answer is really easy: git diff --staged1 . Done.
But I want to use this subsection to dig a little deeper into what’s happening so you can improve your
understanding of how this works.
Mental model time!
Let’s say that these two things are true. Now, whether or not they’re true doesn’t really matter.
“It’s only a model.”
—Patsy, Monty Python and the Holy Grail
1. The stage contains a copy of all unmodified files at your current commit.

The --staged flag is more modern. Older versions of Git used git diff --cached.

### 12.3 More Diff Fun

2. A git status or git diff only shows files that differ between your working tree and the stage.
So if you don’t have any modifications, git diff won’t show any differences. Because the stage and
working tree are the same.
Now if you modify a file in your working tree and then git diff, you will see some changes, because
the working tree differs from the stage.
But then if you add the modified file to the stage, then the stage and working tree become the same again.
And git diff will show no differences.
git diff always compares the working tree to the stage. (Unless you’re diffing specific commits—see

below.) And in this case, after you’ve added your modified file to the stage, it’s the same as the working
tree. So no diffs.
Contrast this to where you’ve modified the working tree but haven’t added the file to the stage. In this case,
the file on the stage is just like the last commit, which is different than your working tree. So git diff
shows the differences.
Well, okay, then… what if you want to diff what’s on the stage with the last commit? That is, instead of
diffing the working tree with the stage, you want to diff the stage with the HEAD?
Back to the punchline:
$ git diff --staged

And that’ll do it. This will run a diff between what’s on the stage and the last commit, showing you the
changes you’ve staged.

### 12.3 More Diff Fun
Let’s speed through some examples of things you can do with diff.

#### 12.3.1 Diff Any Commits or Branches
You have more at your disposal than just diffing the working tree or stage. You can actually diff any two
commits. This will show you all the differences between them.
For example, if you know the commit hashes, you can diff them directly:
$ git diff d977 27a3

Or if you have two branch names:
$ git diff main topic

Or mix and match:
$ git diff main 27a3

Or use HEAD:
$ git diff HEAD 27a3

Or relative HEAD… This one diffs the previous-to-HEAD commit with the HEAD:
$ git diff HEAD^ HEAD

And this one diffs four commits before HEAD with three commits before HEAD:

Chapter 12. Comparing Files with Diff

$ git diff HEAD~4 HEAD~3

#### 12.3.2 Diffing Order
These are both valid ways to diff, but they give different (inverted) results:
$ git diff main topic
$ git diff topic main

One way to think about this is that it’s like:
$ git diff FROM TO

That is, “Hey, Git, tell me the changes I need to make to get from commit FROM to commit TO.”
Let’s say I made a file foo.md and committed it with a single line First in it. And then I overwrote it
with Second and committed it again.
In this example, I can ask, “What do I have to change from the previous-to-HEAD commit to the HEAD
commit?”
$ git diff HEAD^ HEAD
diff --git a/foo.md b/foo.md
index d00491f..495a7e9 100644
--- a/foo.md
+++ b/foo.md
@@ -1 +1 @@
-First
+Second

It’s telling me to get from previous-to-HEAD to HEAD, I would need to delete First and add Second.
But if I reverse it and ask, “What do I have to change from HEAD to get back to the previous-to-HEAD
commit?” I’ll get the opposite:
$ git diff HEAD HEAD^
diff --git a/foo.md b/foo.md
index 495a7e9..d00491f 100644
--- a/foo.md
+++ b/foo.md
@@ -1 +1 @@
-Second
+First

There it’s telling me to get back to the previous-to-HEAD I’d need to delete Second and add First.
So remember, git diff FROM TO is telling you the changes you have to make to get from the FROM commit
to the TO commit.

#### 12.3.3 Diffing with Parent Commit
We just showed this example:
$ git diff HEAD~4 HEAD~3

But since HEAD~4 is the parent of HEAD~3, is there some shorthand we can use here? Yes!

### 12.3 More Diff Fun

$ git diff HEAD~4 HEAD~3
$ git diff HEAD~3^!

You can use it anywhere you want to compare a commit with its parent, which is really showing just what
changes were in that one particular commit.
$ git diff HEAD^!
$ git diff HEAD~3^!
$ git diff main^!
$ git diff 27a3^!

#### 12.3.4 More Context
By default, git diff shows 3 lines of context around the changes. If you want to see more, like 5 lines,
use the -U switch.
$ git diff -U5

#### 12.3.5 Just the File Names
If you just want a list of files that have changed, you can use the --name-only option.
$ git diff --name-only

#### 12.3.6 Ignoring Whitespace
There might be a time when you get some tabs/spaces confusion in your source code, which is always
painful. Protip: stick to one and force everyone else on the team to do the same under penalty of paying
for lunch.
But you can commit git diff to ignore whitespace in the comparison:
$ git diff -w
$ git diff --ignore-all-space

#### 12.3.7 Just Certain Files
You can just diff certain files.
One way is to just put the file names after a --:
$ git diff -- hello.py
$ git diff -- hello.py another_file.py

You can also specify commits or branches before the --:
$ git diff somebranch -- hello.py

That’ll compare hello.py at HEAD with the version on somebranch.
Or you could give two commits or branches to compare the file there:
$ git diff main somebranch -- hello.py

Finally, you can restrict to a file extension using a glob and single quotes:

Chapter 12. Comparing Files with Diff

$ git diff '*.py'

That will just diff the Python files.

#### 12.3.8 Inter-branch Diffs
This is an interesting version of comparing two branches.
We already showed the following example for comparing the commits at two branches:
$ git diff branch1 branch2

But sometimes you want to know what changed in a branch since the branches diverged.
That is, you don’t want to know what’s different now between branch1 and branch2, which is what the
above would give you.
You want to know what branch2 added or deleted that branch1 did not.
In order to see this, you can use this notation:
$ git diff branch1...branch2

This means “diff the common ancestor of branch1 and branch2 with branch2.”
In other words, tell me all the changes that were made in branch2 that branch1 is unaware of. Don’t
show me anything that branch1 has changed since they diverged.

### 12.4 Difftool
I know the diff output is tough to read. I recommend practice and offer myself as living proof that with
enough practice, the output becomes penetrable. And eventually it even becomes easy to read, which
might be difficult to imagine. But it does!
That said, there are third-party tools that exist to make diffs more manageable, and Git supports these
tools. You can read more about it in the diff tool chapter.

Chapter 13

Renaming and Removing Files
This is an extension of dealing with file states, so make sure you read that chapter first!
Also, I’m going to interchangeably use the terms rename and move to mean the same thing. Moving as
a concept is a little more powerful because not only can it rename, but it can also move files to other
directories. It’s notable because the command to rename is git mv.

### 13.1 Renaming Files
You can use the OS rename command to rename files, but if they’re in a Git repo, it’s better to git mv
them so that Git has total awareness.
Git is confusingly unhelpful with this.
Let’s rename foo.txt to bar.txt and get a status:
$ git mv foo.txt bar.txt
renamed:
foo.txt -> bar.txt

So it knows the file is renamed, and the file has been moved to the stage. Like so:
- Unmodified → git mv foo.txt bar.txt → Staged (as “renamed”)
And if we look, we see the file has actually been renamed in the directory to bar.txt, as well.
If we make a commit at this point, the file will be renamed in the repo. Done.
But what if we want to undo the rename?
Git suggests git restore --staged to the rescue… But which file name to use, the old one or new one?
And then what? It turns out that while you can use git restore to undo this by following it with multiple
other commands, you should, in this case, ignore Git’s advice, and instead read the following section.

### 13.2 Unrenaming Files from the Stage
Just remember this part: the easiest way to undo a Staged rename is to just do the reverse rename.
Let’s say we renamed and got here:
$ git mv foo.txt bar.txt

Chapter 13. Renaming and Removing Files

renamed:
foo.txt -> bar.txt

This easiest way to revert this change is to do this:
$ git mv bar.txt foo.txt

And there you go.
In summary, the way to rename a file is:
- Unmodified → git mv foo.txt bar.txt → Staged
- Staged → git commit → Unmodified
And the way to back out of a Staged rename is to rename them back the way they were:
- Staged → git mv bar.txt foo.txt → Unmodified

### 13.3 Removing Files
You can use the OS remove command to remove files, but if they’re in a git repo, it’s better to git rm
them so that Git has total awareness.
And what happens might seem a little strange.
Let’s say we have a file foo.txt that has already been committed. But we decide to remove it.
$ git rm foo.txt
rm 'foo.txt'

This actually removes the file—if you look in the directory, it’s gone.
But let’s check the status:

So the now-deleted file is in Staged State, as it were. Which makes sense since there’s now a “difference”
between the working tree (where the file is gone) and the stage (where the file still exists).
If we do a commit here, the file is deleted. Done.

### 13.4 Unremoving Files from the Stage
But what if we want to undo the staging of the now-deleted file? There’s a hint for how to get it back with
git restore --staged, as per usual.
Let’s try it:
$ git restore --staged foo.txt

### 13.5 Unremoving Files from Earlier Commits

(use "git add/rm <file>..." to update what will be committed)

Hmmm. “Changes not staged for commit” are files in Modified State. This means that foo.txt has been
“modified”, which is, in this context, a friendlier way of saying “deleted”.
So we’ve backed up from Staged State to Modified State. But looking around, the file is still gone! I want
my file back!
We want to move it back to Unmodified State, which Git once again hints how to do in the status:
git restore. Let’s try:
$ git restore foo.txt

Git’s telling us there are no Modified files here. Let’s look and see:
$ ls foo.txt

There it is, back safe and sound.
So the process for deleting a committed file is a variant of what we’ve already seen:
- Unmodified → git rm foo.txt → Staged
- Staged → git commit → The file is now gone
And you can undo a deleted file (as long as the delete hasn’t yet been committed) in the same way you
can undo any other file states:
- Staged → git restore --staged foo.txt → Modified
- Modified → git restore foo.txt → Unmodified

### 13.5 Unremoving Files from Earlier Commits
What if there’s a file that was removed some time ago and you want it back?
1. Find the commit hash where the file exists.
## 2. Restore the file from that commit.
Presumably you know the name of the file, but if you don’t, you’ll have to painstakingly pore over the
logs with git log --name-only until you find it.
But let’s say you know the name. In this case, you can get the log for the deleted file like so (assuming
the file we want is foo.txt):
$ git log -- foo.txt
commit 97bdb61727f7515d6953c965f56ef8329585f348
Sun Jan 12 11:08:33 2025 -0800
Removed due to horrid commit messages

Chapter 13. Renaming and Removing Files

commit 1c9bf4514ee90a0e65fb9b0a916765bb6c78dee6
Sun Jan 12 11:08:33 2025 -0800
Add the barfsplant
commit cc7a1940f13fca9092dbe9ce4a8e9012babd9314
Sun Jan 12 11:08:33 2025 -0800
Initial splungification

There we see the history of the illustrious foo.txt.
We see it was removed in commit 97bdb. So no point in restoring it from there (it’s already gone by
then!). But the commit just prior to that (1c9bf) is the most recent version of foo.txt before it was
deleted. That’s probably what we want. (Or maybe an earlier one if you want to go back farther in
time—no law against that.)
And the restore is pretty easy:
$ git restore --source=1c9bf foo.txt
$ ls foo.txt

There it is! But in what state?

It’s not even added yet. So if you want to bring it back to life, you’ll have to add and commit it just as if
it were a brand new file.

### 13.6 A Note on Removing Secrets
We’ve seen that once something is committed and deleted, it’s possible to resurrect that thing.
Now, let’s say you’ve committed some code that looks like this:
MASTER_PASSWORD_FOR_THE_ENTIRE_COMPANY=pencil

And then you make the horrible mistake of pushing it.
That’s bad enough, but let’s say it’s even worse and you pushed it to a repo on GitHub that has public
access.
Now the entire world has your password! You’re hosed!
“But wait! I’ll just remove it real fast and push and no one will notice!”
No. The company can’t take that chance. Anyone can clone the repo and look back in the history to get the
deleted file. The only recourse is to change that password immediately. Throughout the entire company.
That is what must happen. Your manager is not amused.
Never, EVER commit secrets to Git. Use a dot-enva file or literally anything other than committing the secret.

A dot-env (.env) file is one that contains secret information (like login credentials) that is never committed to the repo.

### 13.6 A Note on Removing Secrets

It’s usually in the .gitignore just to be sure. Someone related to the project will use a side channel to tell you what to put
in it so you can authenticate properly. Support for .env files exists for a variety of languages and frameworks. I’m using
my serious voice because this is a serious matter!

Let’s make the infraction less severe. Let’s say you’ve pushed to GitHub, but it’s a private repo. It’s still
kinda bad. You have to trust everyone who has access, and trust that no clones of the repo will ever end
up in the hands of anyone outside the company or those of any disgruntled employees. The only recourse
is to change that password.
Okay. Let’s make it even less severe, still. Let’s say you’ve committed the password to your repo, but
you haven’t yet pushed.
Now we can do something about it because there’s no chance anyone other than you has seen the code.
You didn’t push it, so no one can have pulled it. But we’ll not talk about that here; see the chapter on
Amending Commits for fixing the file before the push.

Chapter 13. Renaming and Removing Files

Chapter 14

Collaboration across Branches
Let’s say you’re on a team of coders and you all have access to the same GitHub repo. (One person on
the team owns the repo, and they’ve added you all as collaborators1 .)
I’m going to use the term collaborator to mean “someone to whom you have granted write access
to your repo”.
How can you all structure your work so that you’re minimizing conflicts?
There are a number of ways to do this.
- Everyone is a collaborator on the repo, and:
- Everyone uses the same branch, probably main, or
- Everyone uses their own remote tracking branch and periodically merges with the main branch,
or
- Everyone uses their own remote tracking branch and periodically merges with a development
branch, which itself is periodically merged into main for each official release.
- Or everyone has their own repo (and are not collaborators on the same repo), and:
- Everyone uses pull requests or other synchronization methods to get their repos merged into
the other devs’.
We’ll look at the first few ways in this chapter, but we’ll save pull requests for later.
There’s no one-size-fits-all approach to teamwork with Git, and the methods outlined below can be mixed
and matched with local topic branches, or people having multiple remote tracking branches, or whatever.
Often management will have an approach they want to use for collaboration which might be one of the
ones in this section, or maybe it’s a variant, or maybe its something completely different.
In any case, the best strategy for you, the learner, is to just be familiar with the tools (branching, merging,
conflict resolution, pushing, pulling, remote tracking branches) and use them for effect where it makes
the most sense.
And when you’re first starting out, your intuition about “where it makes the most sense” might not be
dead-on, but it probably won’t be lethal and you’ll figure it out in the school of hard knocks.
“Oh great. Another f---ing learning experience.”
—Actual quote from my mother
Finally, I’ll be using GitHub in all these examples, but you could use any server or service as the remote
instead.

### 14.1 Communication and Delegation
Git can’t save you from poor communication. The only way to minimize conflicts in a shared project is
to communicate with your team and clearly assign different tasks to people in a non-conflicting way.

https://tinyurl.com/y5kzpeyk

Chapter 14. Collaboration across Branches

Two people shouldn’t generally be editing the same part of the same file, or even any part of the same file.
That’s more of a guideline than a rule, but if you follow it, you will never have a merge conflict.
As we’ve seen, it’s not the end of the world if there is a merge conflict, but life sure is easier if they’re just
avoided.
Takeaway: Without good communication and a good distribution of work on your team, you’re doomed.
Make a plan where no one is stepping on toes, and stick to it.

### 14.2 Approach: Everyone Uses One Branch
This is really easy. Everyone has push access to the repo and does all their work on the main branch.
Benefits:
- Super simple to set up.
- Conceptually not much to juggle.
- All work instantly available to all collaborators upon push.
Drawbacks:
- More potential for merge conflicts.
- Unless you’re rebasing (more on that later), you’ll have a lot of merge commits.
- You can’t push non-working code since it will break everything for everyone else.
Initial setup:
- One person makes the GitHub repo.
- The owner of the GitHub repo adds all the team members as collaborators.
- Everyone clones the repo.
Workflow:
- Work is delegated to all collaborators. The work should be as non-overlapping as possible.
- Everyone periodically pulls main and resolves any merge conflicts.
- Everyone pushes their work to main.
In real life, this approach is probably only used on very small teams, e.g. three people at most, with
frequent and easy communication between all members. If you’re working on a small team in school, it
could very well be enough, but I’d still recommend trying a different approach just for the experience.
The other approaches are not that much more complex, and give you a lot more flexibility.

### 14.3 Approach: Everyone Uses Their Own Branch
In this scenario, we treat main as the working code, and we treat contributors’ branches as where work is
done. When a contributor gets their code working, they merge it back into main.
Benefits:
- You get to work on your own branch without worrying about messing up other people’s work.
- You can commit non-working code since no one else can see it. (You might be wrapping up the
work day and want to push some incomplete code for a backup, for example.)
- Less merge conflict potential since fewer merges are happening than if everyone were committing
to main.
Drawbacks:
- If your branch diverges too far from main, merging might become painful.
- Unless you’re rebasing and squashing, the incremental work on your branch might “pollute” the
commit history on main with a lot of tiny commits.
Initial setup:
- One person makes the GitHub repo.
- The owner of the GitHub repo adds all the team members as collaborators.

### 14.4 Approach: Everyone Merges to the Dev Branch

- Everyone clones the repo.
- Everyone makes their own branch, possibly naming it after themselves.
- Everyone pushes their branch to GitHub, making them remote-tracking branches. (We do this so
that your work is effectively backed up on GitHub when you push it.)
Workflow:
- Work is delegated to all collaborators. The work should be as non-overlapping as possible.
- As collaborators finish their tasks, they will:
- Test everything on their branch.
- Merge the latest main into their branch; do a pull to make sure you have it. (The collaborator
might already have the latest main if no one else has merged into it, which will cause Git to
say there’s nothing to do. This is fine.)
- Test everything, and fix it if necessary.
- Merge their functioning branch into main.
- Push.
- If someone else has modified main while you were testing, Git will complain that you
have to pull before you can push. If there’s a conflict at this point, you’ll have to resolve,
test, and push it. And you’ll have to merge main back into your branch so that your
branch is up-to-date.
The result will look something like Figure 14.1 to start, where all the collaborators have made their own
branches off of main.

Figure 14.1: Collaborators branching off main.
Let’s say Chris (on branch chris) finishes up their work and wants other contributors to be able to see it.
It’s time to merge into main, as we graphically see in Figure 14.2.

Figure 14.2: Chris merges back into main.
After that, other contributors who pull main will see the changes.

### 14.4 Approach: Everyone Merges to the Dev Branch
In this scenario, we treat main as the published code that we’re going to distribute, often tagged with
a release version number, and we treat a dev branch as the working, unreleased code. And, as in the
previous scenario, everyone has their own branches they’re developing on.
The idea is basically we’re going to have two versions of the working code:

Chapter 14. Collaboration across Branches

1. The public, released version that’s on main.
## 2. The private, internal version that’s on dev.

And then, of course, we’ll have one branch per collaborator.
Another way of thinking about it is that we’re going to have our internal build on dev that is good for
testing and then, when it’s all ready, we’ll “bless” it and merge it into main.
So there will be a lot of merges into dev from all the developer branches, and then every so often there
will be a merge from dev into main.
The developers will never directly merge into main! Usually that is performed by someone in a managerial
role.

Figure 14.3: Working on the dev branch.
Overall the process works as in Figure 14.3. This is a busy image, but notice how Bob and Alice are only
merging their work into the dev branch, and then every so often, their manager merges the dev branch
into main and tags that commit with a release number.
Benefits:
- All the benefits of everyone having their own branch.
- You have an internal branch from which you can make complete builds for internal or external
testing.
Drawbacks:
- A little more complexity and management.
- If your branch diverges too far from dev, merging might become painful.
- If the dev branch diverges too far from main, merging might become painful.
- Unless you’re rebasing, the incremental work on your branch might “pollute” the commit history
on dev and main with a lot of tiny commits.
Initial setup:
- One person makes the GitHub repo.
- The owner of the GitHub repo adds all the team members as collaborators.
- The owner creates the dev branch.
- Everyone clones the repo.
- Everyone makes their own branch, possibly naming it after themselves.
- Everyone pushes their branch to GitHub, making them remote-tracking branches. (We do this so
that your work is effectively backed up on GitHub when you push it.)
Workflow:
- Work is delegated to all collaborators. The work should be as non-overlapping as possible.
- As collaborators finish their tasks, they will:
- Test everything on their branch.
- Merge the latest dev into their branch; do a pull to make sure you have it. (The collaborator
might already have the latest dev if no one else has merged into it, which will cause Git to say
there’s nothing to do. This is fine.)
- Test everything, and fix it if necessary.
- Merge their functioning branch into dev.

### 14.4 Approach: Everyone Merges to the Dev Branch

- Push.
- If someone else has modified dev while you were testing, Git will complain that you have
to pull before you can push. If there’s a conflict at this point, you’ll have to resolve, test,
and push it. And you’ll have to merge dev back into your branch so that your branch is
up-to-date.
Managerial Workflow:
- Coordinate with all devs to get a candidate release in dev tested out and ready.
- Merge that candidate release (some commit) from dev into main.
- Tag the main commit with some version number, optionally.

Chapter 14. Collaboration across Branches

Chapter 15

Rebasing: Moving Commits
I’m going to start with the Number One Rule of Rebasing: never rebase anything that you have pushed.
That is, only rebase local changes that no one else has seen. You can push them after the rebase.
This is more of a guideline than a rule in that you can rebase things you’ve pushed if you understand the
consequences. It’s typically not a great situation, though, so you’ll want to generally avoid it.
The reason is that rebasing rewrites history. And that makes your history get out of sync with the history
of other devs who have cloned the repo with the old history, and it makes syncing up quite challenging.
There are other commands in Git that also rewrite history. And the general rule is never rewrite history
on anything that’s already been pushed. Unless you really know what you’re doing.

### 15.1 Contrasted to Merging
But before we go run off in high spirits talking about rebasing, let’s do a quick merge refresher. Here’s
a variation of an earlier example where we have two divergent branches, Figure 15.1. Let’s say you’re
working on the topic branch.

Figure 15.1: Two divergent branches.
Then you hear that someone has made a change to main and you want to roll those changes into your
topic branch, but not necessarily get your changes in main yet.
At this point, if we wanted to get the changes in main into topic, our merge option was to make another
commit, the merge commit. The merge commit contains the changes from two parent commits (in this
case the commit labeled (2) and the one labeled (4) are the parents) and makes them into a new commit,
marked (5) in Figure 15.2.
If we look at our log at that point, we can see the changes from all the other commits in the graph from
the topic branch.
And we’re good at this point. That worked, and it did what we wanted. Merging is a completely acceptable
solution to this problem.
But there are a couple drawbacks to doing the merge. See, we really just wanted to get the latest stuff from
main into our branch so we could use it, but we didn’t really want to commit anything. But here we’ve

Figure 15.2: Two divergent branches, merged.
made a new commit for everyone to see.
Not only that, but now the commit graph forms a loop, so the history is a little more convoluted than
perhaps we’d like it.
What really would have been nice is if I could just have taken commits (3) and (4) from topic and just
somehow applied those changes to (2) on main. That is, could we pretend that instead of branching off
(1) like topic did, that we instead branched off (2)?
After all, if we branched off (2), then we’d have those changes from main that we wanted.
What we need is a way to somehow rewind our commits back to the branch point at (1), and then reapply
them on commit (2). That is, the base of our topic branch, which was commit (1), needs to be changed
to another base at commit (2). We want to rebase it to commit (2)!

### 15.2 How it Works
So let’s do exactly that. Let’s take the changes we made in commit (3) and apply them to main at commit
(2). This will make a brand new commit that includes changes from both commit (2) and commit (3).
(Importantly, this commit didn’t exist before; there was no commit that contained changes from (2) and
(3).) We’ll call this new commit (3') (“three prime”), since it has the changes that we made in (3).
After that, we’ll do the same thing with commit (4). We’ll apply the changes from old commit (4) to
(3'), making a new commit (4').
And if we do that, we end up with Figure 15.3.

Figure 15.3: topic branch rebased on main.
And there you see (3') and (4') now rebased onto main! And now the topic branch includes commit
(2) from the main branch!
Again, these two commits have the same changes that you originally had in commits (3) and (4), but now
they’ve been applied to main at commit (2). So the code is necessarily different since it now contains
the changes from main. This means your old commits (3) and (4) are effectively gone, and the rebase
has replaced them with two new commits that contain the same changes, just on a different base point.
We just changed history. When we mentioned rewriting history at the top of this chapter, this is
what we were talking about. Imagine some other dev had your old commits (3) and (4) and was
working off those making their own new commits. And then you rebased effectively destroying
commits (3) and (4). Now your commit history is different than the other dev’s and all kinds of
Fun™ will be had trying to sort if out.
If you only rebase commits that you haven’t pushed, you’ll never get into trouble. But if some
other dev has a copy of your commits (because you’ve already pushed them and they pulled them),

### 15.3 When Should I Do This?

don’t rebase those commits!

### 15.3 When Should I Do This?
There’s no fixed rule about this. Sometimes a shop will have one, saying that everyone should rebase all
the time so that the commit history has a cleaner look (no merge commits, no loops).
Other shops will say to merge all the time so that the complete history is preserved.

### 15.4 Pulling and Rebasing
If you might recall from way back when, doing a pull is actually a couple operations: fetch and merge.
The fetch downloads all the new data from the remote, but doesn’t actually merge anything into your
branches or working tree. So you won’t see any local changes after a fetch.
But the pull follows it up with a standard merge so that you see the remote tracking branch’s changes in
your local branch.
So, assuming you have everything set up and you’re on your main branch, when you do this:

Git actually does something like this:
git fetch
git merge origin/main

(Recall that origin/main is your remote-tracking branch—it’s the version of main that’s on origin, not
the main on your local machine.)
But merging isn’t the only thing you can do there. Given that this is the chapter on rebasing, you might
correctly suspect that we can make it do a rebase instead.
And here’s how:
$ git pull --rebase

That causes these two things to happen:
git fetch
git rebase origin/main

If you want that to be the default behavior for the current repo, you can run this one-time command:
$ git config pull.rebase true

If you want it to be the default behavior for all repos, you can:
$ git config --global pull.rebase true

If you’ve configured your repo to always rebase on a pull, you can override that to force a merge (if you
want) with:
$ git pull --no-rebase

### 15.5 Conflicts
When you do a merge, there’s a chance that you might conflict with some of the changes in the other
branch, and you have to resolve those, as we’ve seen.
Can the same thing happen with a rebase?
Of course! If the commit you’re trying to rebase onto conflicts with your commit, you’ll have the same
trouble you’d have with a merge.
Luckily, Git will let you resolve the conflict in a way similar to the merge.
Let’s start with a simple example. I’m going to have a text file that contains the following:
The magic number is 1.

We’ll have that in a commit on the main branch.
Then we’ll make a new topic branch there.
Then on the main branch we’ll change the number to 2 and commit.
And on the topic branch we’ll change the number to 3 and commit.
So we’ll have the scenario in Figure 15.4.

Figure 15.4: Branches ready for conflict.
Finally, we’ll try to rebase topic onto main.
At that point, Git will become confused. It knows the last commit on main has 2 and that topic is unaware
of this (because it branched off before that change). And it knows the last commit on topic has 3. So
which one is right?
Let’s try to rebase while we’re on the topic branch and see what happens.
$ git rebase main
Auto-merging magic.txt
CONFLICT (content): Merge conflict in magic.txt
error: could not apply 9f19221... Update to 3
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase
hint: --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run
hint: "git rebase --abort".
hint: Disable this message with "git config advice.mergeConflict
hint: false"
Could not apply 9f19221... Update to 3

Whoa, Nelly. OK, so it can’t do that. It says we need to “Resolve all conflicts manually”, and then add
them, and then we’ll run rebase again with the --continue flag to continue the rebase.

### 15.5 Conflicts

If you keep reading the hints, you’ll see there some more stuff in there. We’ll get to --skip later,
but do note that if the conflict is more than you want to take on right now, you can just run:
$ git rebase --abort

to pretend you never started it in the first place.
This might sound a little familiar. It’s basically the same process as we went through with the merge
conflict.
1. Edit the conflicting file and make it Right.
2. Add it.
