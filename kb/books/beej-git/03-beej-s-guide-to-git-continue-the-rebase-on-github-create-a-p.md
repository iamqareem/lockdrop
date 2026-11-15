---
id: beej-git-03
title: "Beej's Guide to Git — Continue the rebase., On GitHub, create a pull request. This…"
slug: beej-git-03-beej-s-guide-to-git-continue-the-rebase-on-github-create-a-p
source: "Beej's Guide to Git"
sourceSection: "3. Continue the rebase., 5. On GitHub, create a pull request. This informs the upstream owner that you have changes you’d, 6. Go issue a now-hopefully-non-conflicting PR., 2. Do a forced push to your remote. For your protection, Git won’t push in this circumstance. You, 6. Maybe apply earlier commit"
track: git-ops
tier: free
tags: [git, version-control, devops]
summary: "Let’s do that. Covers 6 sections: Continue the rebase., On GitHub, create a pull request. This informs the upstream owner that you have changes you’d, Go ."
---
# Beej's Guide to Git — Continue the rebase., On GitHub, create a pull request. This…

## 3. Continue the rebase.
Let’s do that. If I pop open that file magic.txt in my editor, I see:
<<<<<<< HEAD
The magic number is 2
=======
The magic number is 3
>>>>>>> 9f19221 (Update to 3)

That’s just like in a merge conflict—Git is showing us the two choices we have for this line. So we’ll
consult with the team and come to an agreement on what should be in the file, and we delete everything
that shouldn’t be there and we make it Right.
The magic number is 3

And I save that.
Now, what were we supposed to do at this point, again? If you’ve forgotten, it’s fine. Just run git status
to see where we’re at.
interactive rebase in progress; onto 6ceeefb
Last command done (1 command done):
pick 9f19221 Update to 3
No commands remaining.
You are currently rebasing branch 'topic' on '6ceeefb'.
(fix conflicts and then run "git rebase --continue")
(use "git rebase --skip" to skip this patch)
(use "git rebase --abort" to check out the original branch)
magic.txt

Oh yeah! --continue, right?
$ git rebase --continue
magic.txt: needs merge
You must edit all merge conflicts and then
mark them as resolved using git add

What? Oh, we should have read more of the status message. It says to use git add to mark resolution of
the file magic.txt. Let’s do that.

$ git add magic.txt
interactive rebase in progress; onto 6ceeefb
Last command done (1 command done):
pick 9f19221 Update to 3
No commands remaining.
You are currently rebasing branch 'topic' on '6ceeefb'.
(all conflicts fixed: run "git rebase --continue")
magic.txt

That status looks nicer. (But note that Git’s in a special “rebase” state similar to how it gets into a special
“merge” state when merging. We have to either abort or continue before we can use Git normally again.)
Now --continue.
$ git rebase --continue

This pops me into my editor to edit the commit message. This is your opportunity to change the commit
message if it no longer reflects the commit. (That is, if you changed the commit when resolving the
conflict to be something entirely different, you might need to edit the message.) Edit it if necessary and
save it.
And Git says:
[detached HEAD 443fa53] Update to 3
1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/topic.

And git status shows we’re all clear.
After all that, we see our new commit graph in Figure 15.5.

Figure 15.5: After rebase conflict resolution.
One last note: if you find yourself resolving the same conflicts with a rebase over and over with every
pull, you might check out git rerere1 to help automate that process.

### 15.6 Squashing Commits
This concept fits in with the notion of a clean commit history.
Let’s say you were tasked with implementing a feature, namely adding an alert box saying that the storage
limit was exceeded.
No problem. You add it and commit with message “Added feature #121”. (And you don’t push yet.)
alert("Strrage limit exceeeded");

Then after the commit, you notice a typo. Heck.

https://git-scm.com/book/en/v2/Git-Tools-Rerere

### 15.6 Squashing Commits

So you fix it and commit with message “Fixed typo”.
alert("Storage limit exceeeded");

Done.
Wait! There’s another typo! Are you kidding me?
So you fix it:
alert("Storage limit exceeded");

And add another commit saying “Fixed another typo”.
Now your local commit history reads:
Fixed a typo

That’s not super clean, right? Really this was supposed to be one commit that implemented feature #121.
But luckily you haven’t pushed yet, which means you’re still free to rewrite that history!
You can use a feature of rebase called squashing to get this done.
What you want to do is squash those two typo fixes into the previous commit, the one where you first tried
to implement the feature.
First, let’s look at the log.
commit c1820e6d0da19013208b389d264310162477b099 (HEAD -> main)
commit c62c0db7b82e6b415d36bd0f00d568fd503164b7
Fixed typo
commit ab84a428b8baae0078ee0647a67b34a89a6abed8
commit a95854659e31d203e2325eee61d892c9cdad767c

Since this is a rebase, we’re going to rebase onto something, namely the commit prior to the added feature
commit, the commit ID starting with a9585.
And we want to do it interactively, which is a special rebase mode that lets us do the squashing, and we
get there with the -i flag.

$ git rebase -i a9585

This brings us into an editor that has this information, and a huge comment block below it full of instructions.
pick ab84a42 Added feature #121
pick c62c0db Fixed typo
pick c1820e6 Fixed another typo

Notice that they’re listed in forward order instead of the reverse log order we’re used to.
Look at all those options shown in the comment block (and not shown here in the guide)! Pick, reword,
edit, squash, fixup… so many things to choose from. As you might imagine we’re in a pretty powerful
history rewriting mode.
For now, though, let’s just look at “squash” and “fixup”, which are almost the same thing.
Starting with “squash”, what I want to do is take those typo fix commits and work them into the “Added
feature” commit. We can use the squash mode to do this.
I’ll edit the file to look like this:
pick ab84a42 Added feature #121
squash c62c0db Fixed typo
squash c1820e6 Fixed another typo

That will squash “Fixed another typo” into “Fixed typo” and then squash that result into “Added feature
#121”.
And pick just means “use this commit as-is”.
There are shorthand versions for all these commands. I could have used s instead of squash.
After I save the file, I get launched right back into another editor that has this in it:
Fixed typo

We’re making a new rebased commit here with the three commits squashed into one, and so we get to
write a new commit message. Helpfully, Git has included all three commit messages. Let’s hack it down
to just have the commit message we want.

And saving gets us back out with a message.
[detached HEAD 4bc6bca] Added feature #121
Date: Wed Jul 17 11:53:10 2024 -0700

### 15.7 Multiple Conflicts in the Rebase

create mode 100644 foo.js
Successfully rebased and updated refs/heads/main.

Success is good. I like success.
What’s that about detached HEAD? Git detaches the HEAD briefly when doing a rebase. Don’t
worry—it gets reattached for you.
Now my commit history is all cleaned up.
commit 4bc6bca6870d124b3eebc9afd32486a5a23189fc (HEAD -> main)
commit a95854659e31d203e2325eee61d892c9cdad767c

And you can see, if you look at the earlier log, that the “Added feature” commit ID has changed. We did
a rebase, after all, so those old commits are gone, replaced by the new ones.
Finally, after all this, now you can push. And always remember that since this is a history rewrite, you
shouldn’t do it after you’ve pushed.

#### 15.6.1 Squash versus Fixup
Now a quick note about fixup instead of squash. It’s the same thing, except only the squashed-into
commit message is kept by default. So if I ran this:
pick fbc1075 Added feature #121
fixup fd4ca42 Fixed typo
fixup 6a10e97 Fixed another typo

Git instantly returns with:
Successfully rebased and updated refs/heads/main.

And Git log only shows the “Added feature #121” commit. With fixup, Git automatically discards the
squashed commit messages.

### 15.7 Multiple Conflicts in the Rebase
When you merge with commit and there are multiple conflicts, you resolve them all in one big merge
commit and then you’re done. You use git commit to wrap it all up.
Rebase is a little different. Since rebase “replays” your commits onto the new base one at a time, each
replay is a merge conflict opportunity. This means that as you rebase, you might have to resolve multiple
conflicts one after another.
For example, let’s say on your topic branch you made a commit that modified file foo.txt. And then
you made another commit that modified file bar.txt.
But unbeknownst to you, someone on the main branch has also modified those two files, so they’re bound
to conflict when you rebase.

And so you begin git rebase main, and we’re in trouble right off the bat. It’s telling us that foo.txt
conflicts.
So you fix it up and then run git rebase --continue and edit the commit message, and get on with it.
But all that does is move on to your next commit to bar.txt and try to rebase that. And it conflicts, too!
So you fix it up and then run git rebase --continue and edit the commit message, and get on with it.
Again.
And finally you get the success message:
[detached HEAD 31c3947] topic change bar
Successfully rebased and updated refs/heads/topic.

This is why you can conclude a merge with a simple commit, but you have to conclude a rebase by
repeatedly running git rebase --continue until all commits have been rebased cleanly.
Is this good or bad? It might be better in that you get a chance to merge each commit in isolation so it
might be easier to reason about and avoid errors. But at the same time it’s more legwork to get through it.
As always, use the right tool for the job!

Chapter 16

Stashing: Temporarily Set Changes
Aside
If you’re in the middle of working on something and you realize you want to pull some changes in, but
you’re not ready to make a commit because your stuff is still completely broken, git stash is your friend.
It takes the stuff you’re working on and stashes it away on the side, returning your working tree to the
state of the last commit.
So your changes will look like they’re gone—but don’t worry, they’re safely stashed away and you can
bring them back later.
Then you can pull the new stuff down so you’re up-to-date, and then unstash your stuff on top of it.
It’s kind of like a mini rebase in spirit.

### 16.1 Example
Let’s say we’re all caught up to the latest.

Great. And we start hacking. We open an existing file foo.rs and add some code to it as per usual.
Then Chris calls from the next desk over and says, “Hey wait—I just made a critical update to main and
you should use that!”
And you think, “Well, heck, I was in the middle of something.” You’re not ready to commit, but you want
Chris’s changes.
So you save your files and then run this:
$ git stash
Saved working directory and index state WIP on main: c72c245
some very descriptive commit message

And, if you were watching, you might have seen your file in your editor change back to what it used to
be! Your changes have been undone and stashed away!
If you git status at this point, you’ll see:

Chapter 16. Stashing: Temporarily Set Changes Aside

It’s all clean, which means now you can pull and get the latest main. So you do that.
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: (from 0)
Unpacking objects: 100% (3/3), 943 bytes | 943.00 KiB/s, done.
From /home/beej/tmp/origin
10a8ad6..e286011 main
-> origin/main
Updating 10a8ad6..e286011
Fast-forward
foo.rs | 1 +

And now you’re up to date.
Oh, wait. What was it we were working on? Oh yeah! We stashed it! Let’s unstash those changes with
pop:
Auto-merging foo.rs
foo.rs
Dropped refs/stash@{0} (046ac112f8c02c3dc02984ad71d353a3e5be9a7a)

Auto-merging sounds good. Looks like things went well. And if we look at our file now we’ll see our
changes brought out of the stash and reapplied. Our file foo.rs is in “modified” state and ready for us to
work on, or add and commit.

### 16.2 The Stash Stack
If you’re familiar with stack abstract data type1 , your ears might have perked up when you read
git stash pop.
Yes, Git tracks stashes in a stack. If you’re not familiar with a stack, read up on it first.
- git stash pushes the working tree on the stash stack.
- git stash pop pops the top of the stash stack and applies it to the working tree.
- git stash list shows you the current stash stack.
- git stash drop deletes a particular stash stack entry.
Because of this, I could stash, then do something else, then stash again, and we’ll have two stashes on
the stack.

https://en.wikipedia.org/wiki/Stack_(abstract_data_type)

### 16.3 Conflicts

$ git stash list
stash@{0}: WIP on main: 659b132 added repo1 another line
stash@{1}: WIP on main: 659b132 added repo1 another line

The top of the stack is stash@{0}.
If I ran just plain git stash pop, it would take the stash at the top, which is index 0, removing it from
the stack and applying it to the working tree.
But you can also pop by stash name if you want to pop something from the middle of the stack.
$ git stash pop 'stash@{1}'
$ git stash pop --index 1

Similarly stash drop will pop the top of the stack and not apply the changes to the working tree, discarding them instead.
And stash drop can also operate on a particular stash by name if you want to drop something from the
middle of the stack.

### 16.3 Conflicts
Now that you’ve spent so much time reading about conflicts during merge and rebase, you might start to
get a little worried here.
What if I stash then pull, but then popping the stash does something that conflicts with the changes I
pulled? Can that happen?
Of course it can. Hooray.
When it happens, it looks like this:
Auto-merging foo.rs
CONFLICT (content): Merge conflict in foo.rs
foo.rs
The stash entry is kept in case you need it again.

Sure looks like a merge conflict, and it looks doubly so in the editor.
fn main() {
<<<<<<< Updated upstream
println!("This is critically fixed");
=======
println!("This is sorta working");
>>>>>>> Stashed changes
}

You can see our stashed changes below where we tried to fix it, but then we see that conflicts with Chris’s
fix from upstream.

Chapter 16. Stashing: Temporarily Set Changes Aside

So we do the merge thing and make it Right, editing it to look the way we want, and we save it. Our status
is still not clean, though.
foo.rs

Let’s add it with git add to mark it resolved.
A couple things can happen at this point.
1. If you just accepted the pulled version (i.e. discarding your conflicting changes), nothing new will
happen. After all, there’s already a commit in your repo with their version, so Git it smart enough
to just call it a day. git status reports clean.
2. If you accepted a version different than the one you pulled (i.e. you kept some or all of your changes),
then git status will report that file as modified and staged to be committed.
If you’re not ready to commit at this point, use git restore --staged to unstage the file. That
will change it to just be modified and you can work on it more before you commit it.
In both conflict cases the stashed changes are still in the stash! Yes, you ran stash pop, but when
there’s a conflict, the stash remains untouched and doesn’t actually pop.
If you’re done with it (and you probably are), you can use git stash drop to discard the particular stash
from the stack and get all cleaned up.

### 16.4 Stashing New Files
What if you’ve added a new file to your working tree but it’s currently untracked? Can stash see it?
No. You have to add it first. So do a git add (but not a commit!) then stash it. The new file should
disappear from the working tree.

Chapter 17

GitHub: Forking and Pull Requests
For a lot of projects you’re on, maybe you have write permission to the main repo that everyone is using.
That is, you’ve been added as a collaborator and you can just push directly.
If that’s the case, you don’t need to fork GitHub repos or create pull requests. You can just keep committing
and pushing as always.
But what if you want to make changes to a repo on GitHub but you don’t have write permission? This
might happen if you forked a repo that you want to make changes to. You can write to your fork, but not
to the repo you forked from. How do you get the changes you made to your fork into the original repo?
Let’s check it out.
A fork is a clone of someone else’s GitHub repo that you’ve made on GitHub using their “Fork” command.
It’s a regular clone except that GitHub is doing some bookkeeping to track which repo you forked from.
The upstream is by convention the name of the remote that you forked from. I know this conflicts with
some other definitions of “upstream”. But for this chapter, in the context of forks, let’s assume it means
this.
A pull request (or “PR” for short) is a way for you to offer changes you’ve made to your fork to the owner
of the original repo.
Forks and Pull Requests are a GitHub thing, not a Git thing. It’s some additional functionality
that GitHub has implemented on their website that you can use.
Let’s say, for example, you found an open source project you liked and there was a bug in it. You don’t
have permission to write to the project’s GitHub repo, so how can you change it?
The process for someone making a pull request is:
1. On GitHub, fork the repo. Now you have your own clone of it.
2. Clone your repo to your local machine. Now you have two clones of it: your fork on GitHub and
its clone on your local machine. (And you own them both.)
3. Make the fix on your local machine and test it.
4. Push your fix to your GitHub fork.
## 5. On GitHub, create a pull request. This informs the upstream owner that you have changes you’d
like them to merge.
6. On GitHub, the upstream owner reviews your PR and decides if they want to merge it. If so, they
merge it. Otherwise they comment and ask for changes, or delete it.
7. At this point, if you’re done, you can optionally delete your fork.
Let’s give it a try! Feel free to issue PRs on my sample repo, used below. I’m just going to delete them
(they won’t be merged); don’t take it personally—I just don’t have time to review them all.

### 17.1 Making a Fork
Head on over to my test repo1 and let’s do this:
- In the upper right there should be a button labeled “Fork”. Click it.
- Under “Owner”, choose your user name.
- Under “Repository name”, chose the default or make a new name.
- Optionally, if the repo has multiple branches and you wish to have those in your fork, uncheck the
“Copy the main branch only” checkbox. You can always get the branches by hand later if you don’t
do this.
- Click the “Create fork” button.
This can be done with impunity. That is, you’ve made your own fork but the original owner is
unaware that you did. You can delete it with no damage to the original repo. Remember that a fork
is a clone on GitHub that you have ownership of, independent of the original repo.
At this point, you should land on the project page for your fork, and the fine print on the page reads:
“forked from beejjorgensen/git-example-repo”.
And now we have our own version of that repo on GitHub to do with as we please.
We can clone it as normal, pull, push, delete the repo, etc. The owner of the original repo will not know
about it—our changes affect our repo alone. Later we’ll see how to issue a pull request to try to get our
changes merged into the original upstream repo.

### 17.2 Making Your Changes
Let’s make some changes. First, we have to clone our repo (that is, clone the fork we made) onto our local
machine.
So pull down the “Code” button as usual and select the SSH link to clone (or use the GitHub CLI variant
if you’re using that).
$ git clone git@github.com:user/git-example-repo.git
Cloning into 'git-example-repo'...
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 4 (delta 0), pack-reused 0
Receiving objects: 100% (4/4), done.

And then you can cd into that directory and see the files there.
$ cd git-example-repo
hello.py
README.md

Let’s modify hello.py to this:
#!/usr/bin/env python
print("This is my modification")

And let’s add it, make a commit, and push.

https://github.com/beejjorgensen/git-example-repo

### 17.3 Syncing the Upstream with Your Fork

$ git add hello.py
$ git commit -m "modified"
[main 5d3fe49] modified
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 1.02 KiB | 1.02 MiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:user/git-example-repo.git
4332527..5d3fe49 main -> main

Again, this just pushed to our fork, not the upstream. You can look at your fork’s page on GitHub and see
the change there.

### 17.3 Syncing the Upstream with Your Fork
Are you ready to make a PR? Hold up just a moment!
What if the upstream owner has made changes to their repo in the meantime? Don’t you want to make
sure your code works with the latest version of their code?
Of course you do.
On your fork’s page, you might have noticed that it has a “Sync fork” button that you can pull down.
If you pull it down and it says “This branch is not behind the upstream”, then congratulations! You’re
already up to date! Go ahead and make a PR, as outlined in the next section.
If you pull it down and it says “This branch is out-of-date” and offers you an “Update branch” button, then
congratulations! You’re out of date, but you can be brought up to date without a conflict. Click “Update
branch” and then go ahead and make a PR, as outlined in the next section. (It might also offer you a
“Discard” button, but don’t press that unless you want to discard your changes!)
If it instead says “This branch has conflicts that must be resolved”, bad news. You have some changes in
your repo that conflict with someone else’s changes in the upstream. You have some options:
- The UI says you can open a pull request, which will give you a chance to resolve the conflict inbrowser as outlined in the next section.
- It also says you can just throw away your changes and replace them with the upstream. Bummer.
- Aside from that, you can actually merge your branch from the upstream on the command line and
take care of the conflict there without opening a PR first. See Syncing on the Command Line, below.
In general, it’s a good idea to keep in sync with the upstream repo. This way you can be sure your changes
aren’t conflicting with any upstream changes as you go. It’s way better than waiting to resolve them all
at the end when you’re ready to issue a pull request.

### 17.4 Making a Pull Request
Now that we’ve modified our fork to our satisfaction, we can ask the upstream maintainer if they’re willing
to accept it into the official repo.
Maybe they aren’t ready! Don’t take it personally if they don’t answer or answer with ways they
need your patch improved. Work with the owners to get the job done to both of your satisfactions.
Let’s go!
- Click the “Contribute” button and then “Open pull request”.

- Look for the text “This branch has conflicts that must be resolved”. If you find that text, it means the
upstream can’t automatically apply your PR and they’ll have to do manual work to make it happen.
They’re far more likely to just reject it. To avoid this, you have some options:
- Don’t open the PR, go back and sync with the upstream, fix the conflict, and try again.
- Or click the “Resolve conflicts” button right there in the UI and use the in-browser editor to
manually resolve.
- Add a nice title.
- Add a good description. You’re asking someone to incorporate your code into their project, so you’ll
want to describe what the code does here to make their lives easier when they review it. (Since this
example goes to my repo, you can just pretend you wrote something nice—I’m just going to close
the PR.)
- Click “Create pull request”!
This lands us on the PR page. You can add more comments or close the request (if you changed your mind
about it).
The owner of the upstream will see the PR has been issued, and now you have to wait for a response.
Maybe they respond with a comment asking for improvements or other questions. Maybe they reject the
PR and close it, unmerged. Or maybe they accept! Happy days!

### 17.5 Flipside: Merging a Pull Request
As the upstream owner, if someone issues a PR you’ll be notified (unless you’ve turned those notifications
off) with an email and in the notifications in GitHub in the upper right.
When you do, you can visit your project page on GitHub and decide what to do with the PR.
At the top of the project page, you’ll see a “Pull requests” button with a number next to it indicating how
many PRs are currently outstanding.
- Click the button to see the list.
- Click on a PR title to get to the PR.
Now we’re looking at the PR. Read the description to see what it does, and then, very importantly review
the code!
You’re about to accept code from someone you probably don’t know. On this planet, most
people are friendly, but that doesn’t mean there aren’t some bad actors (the industry term is a-holes) out there looking to take advantage of you by introducing some malicious code. Even if
you’ve known the contributor for a year, they might be playing a long game, and if that seems
unlikely to you, read about the XZ utils hack that took place in 2024a .

https://en.wikipedia.org/wiki/XZ_Utils_backdoor

To review the code, look right below the description to the contributor’s avatar and the commit message.
Click on the commit message and you’ll see a diff, as described in the Comparing Files with Diff chapter.
Lines marked with a + are added, and lines marked with - are removed.
If you just want a straight up view of the file as it was edited by the contributor, you can hit the “…” on
the right and then “View file”.
If it’s almost right but you need to make a modification, you can also hit “Edit file” and add commits
directly to the PR.
If everything looks good, scroll down and hopefully you’ll see some text that reads “This branch has no
conflicts with the base branch” and “Merging can be performed automatically”. This is good news.
If it says that, you can just click “Merge pull request”, and that will add the changes to your repo and close
the PR. It’s nice to also add a comment thanking the contributor—they just gave you work for free, after
all!
Closing a PR doesn’t delete the PR. You can still reopen it.

### 17.6 Making Many Pull Requests with Branches

But let’s say the PR does conflict and can’t be automatically merged. GitHub complains that “This branch
has conflicts that must be resolved” and gives you some options.
As the upstream owner, you can click the “Resolve conflicts” button and fix the issue if possible.
Or you can just reject the PR and ask the person who opened it to resolve the conflict so that your life
might be made easier with an automatic merge.

### 17.6 Making Many Pull Requests with Branches
Here’s the thing about pull requests: when you make one, it takes all the changes you have on your branch
and bundles them together in one. Doesn’t matter if the changes are doing radically different things; they
all get rolled into the same PR.
This is sometimes not so great from an administrative perspective. Maybe I want a PR for issue #1 and a
different PR for issue #2!
The way to make this happen is to make a local branch on the clone of your fork for each individual PR,
and push those branches to your fork. Then when you create the PR, you choose the branch to use. Even
if your branch is named something like feature1, you can still merge it into the main branch on the
upstream.
So make a new branch for the feature:
$ git switch -c feature1
Switched to a new branch 'feature1'

Then make your changes, add, and commit.
$ vim readme.txt
$ git add readme.txt
$ git commit -m "feature 1"
[feature1 1ad9e92] feature 1

Then push them to your repo, setting up a remote-tracking branch:
$ git push -u origin feature1
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 979 bytes | 979.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local
remote: object.
remote:
remote: Create a pull request for 'feature1' on GitHub by
remote: visiting:
remote:
https://github.com/user/fork/pull/new/feature1
remote:
To github.com:user/fork.git
feature1 -> feature1
branch 'feature1' set up to track 'origin/feature1'.

Now you can jump back to GitHub and issue a PR. (And look at the response from the remote helpfully
telling you the GitHub URL to visit to issue the PR!)
In the GitHub UI, there might be a handy little popup there saying “feature1 had recent pushes 4 minutes
ago” and a button “Compare and pull request” you can click to make the PR.

But if it’s been too long and the popup is gone, not to worry. See the branch selector button on the upper
left that probably says “main” right now? Pull it down and select the branch “feature1” that you want to
create the PR for. Then click “Contribute” and open the PR.
There’s a line at the top of the PR that indicates the repo and branch that will be merged into, and, on the
right, your repo and branch name that you’ll be merging from.
The rest of the PR proceeds as normal.
Don’t delete your branch until after the merge! Once it has been safely merged, GitHub will pop up
a “Delete branch” button for you on the PR page. This will delete the branch on GitHub, but you’ll still
have to delete feature1 and origin/feature1 on the command line.

### 17.7 Deleting a Pull Request
Short answer: you can’t.
Long answer: you can.
The irony is that the short answer is longer. I don’t make the rules.
Proper long answer: you can if you are the upstream owner and the PR contains sensitive information.
There’s no way in the UI to delete PRs, whether you’re the forker or forkee. And this can be a bummer
especially if you’ve accidentally included some sensitive information like social security number 078-0511202 .
But hope is not all lost! The upstream owner can visit the virtual assistant at GitHub and ask for a pull
request removal3 which apparently works. I haven’t tried it.
If there’s a way as the forker to delete the PR they created, I haven’t seen it. You’ll have to plead your
case with the upstream owner and get them to do it.
In any case, you most definitely should change your leaked credentials right now and let that be a lesson
to you.

### 17.8 Syncing on the Command Line
GitHub has that nice Sync button to bring the upstream changes into your fork, and this was a welcome
addition. It used to be you had to do it the hard way.
But the hard way has an additional benefit: if the upstream conflicts with your changes, you can merge
them locally before creating the PR. The GitHub UI requires you create a PR to resolve the conflict.
Additionally, if you just like the command line and want to quickly sync the upstream to your branch, this
can do it.
The plan is this:
1. Add an upstream remote that points to the upstream repo.
2. Fetch the data from upstream.
3. Merge the upstream branch into your branch.
4. Resolve conflicts.
5. Push your branch.
## 6. Go issue a now-hopefully-non-conflicting PR.
Let’s try. I’ll be on my main branch, and try to sync it with the upstream’s main branch. I’ll show what
it’s like when there’s a conflict. (If there were no conflict, the merge would succeed automatically.)
First things first: if you haven’t already, set up the upstream remote to point to the original owner’s repo.
This is the repo that you forked from. Since you won’t be pushing to it, you can use the SSH or HTTP
methods to access it. (And this remote can be named anything, but upstream is a common convention.)

https://en.wikipedia.org/wiki/Social_Security_number#SSNs_used_in_advertising
https://support.github.com/request?q=pull+request+removals

### 17.8 Syncing on the Command Line

$ git remote add upstream https://github.com/other/orig-repo.git

And then we need to get the new commits from the upstream repo and merge them into our stuff.
$ git fetch upstream
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), 950 bytes | 950.00 KiB/s, done.
From https://github.com/other/upstream
-> upstream/main

$ git merge upstream/main
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.

(You could also rebase if you wanted.)
At this point, we should edit the file and resolve the conflict, and complete the resolution as per usual.
And then we push back to our fork on GitHub!
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 999 bytes | 999.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local
remote: object.
To github.com:user/fork.git
8b2476c..c8a7e0a main -> main

If we jump back to the GitHub UI at this point and open a PR, it should tell us “These branches can be
automatically merged” which is music to everyone’s ears.
Once you have the upstream remote set up, all you have to do to sync in the future is do the
git fetch upstream and then merge or rebase your stuff with it.

Chapter 18

Reverting: Undoing Commits
Let’s say you made some changes and committed them, but they actually botched everything up. You
want to just revert to an earlier version of the file.
There’s the cheesy way to do this that might have already occurred to you: detach the head to an earlier
commit where the file was like you wanted it, make a copy of the file someplace safe, then reattach the
head to main, then copy the old file over the existing one in your working tree. And add and commit!
And this would work…
But let’s be more proper, and we can do that with git revert.
Reverting allows us to actually undo the changes of a single commit, even if it wasn’t the one that got you
to the point you’re at now. That is, let’s say you’ve made 30 commits, but it turns out you don’t actually
want commit number 4 to be there any longer. You can revert just that one!
Performing a standard revert will actually make a new commit, and doesn’t erase any old commits. In
this way, it’s not rewriting history so using this method is safe to revert commits that have already been
pushed.

### 18.1 Performing the Revert
It’s pretty straightforward. You look back in the log for the commit ID you’re interested in reverting, and
revert it.
For example, if you have this in the log:
commit 9fef4fe6d42b91c12b5217829e8d98d738f84d61
Fri Jul 26 16:59:44 2024 -0700
Added Line 50

and you decided you didn’t want that commit any longer, you could revert it by its commit ID. Here I’ll
just type the first few characters of the hash because that’s enough:
$ git revert 9fef4
[main de415f4] Revert "Added Line 50"

There’s no conflict (more on that, below) in this example, so it just pops me into my editor and allows me
to edit the commit message. Remember that the revert makes a new commit!

Chapter 18. Reverting: Undoing Commits

Revert "Added Line 50"
This reverts commit 9fef4fe6d42b91c12b5217829e8d98d738f84d61.

I save the file and git status tells me we’re clean.
Another git log will show the revert commit:
commit de415f4f0cd645b1e551a6ac56e13f73850c88db (HEAD -> main)
Fri Jul 26 17:01:54 2024 -0700
Revert "Added Line 50"
This reverts commit 9fef4fe6d42b91c12b5217829e8d98d738f84d61.

You can revert any commit, even commits that were themselves reverts! Revert the revert!
Now that was an example where the revert went smoothly. But what if you’ve made some changes since
the revert commit that were close to the changes in the revert commit itself? Can it conflict? Of course it
can!

### 18.2 Revert Conflicts
Like with merging or rebasing, you can have conflicts with a revert. If you’re not familiar with conflict
resolution, please review the Rebasing Conflicts section, because it’s closest to how revert conflicts work.
An example of a conflict might be that if you changed line 37 in your code, then revert a commit that also
changed line 37 in the code, Git can’t figure out what to do with that. Should it revert it to what it was
before your commit, or before the earlier commit?
So there’s a revert conflict that must be resolved. And it works very much like the other conflicts we’ve
already seen.
If you try to revert and get a conflict, it will say something like this:
$ git revert 5af89a8985c001ec02409d77e093fb7be45495ff
CONFLICT (content): Merge conflict in foo.txt
error: could not revert 5af89a8... Added Line 69
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git revert --continue".
hint: You can instead skip this commit with "git revert --skip".
hint: To abort and get back to the state before "git revert",
hint: run "git revert --abort".
hint: Disable this message with
hint: "git config advice.mergeConflict false"

And it points out we have a few options here. We can get even more info with our friend git status:
You are currently reverting commit 5af89a8.
(fix conflicts and run "git revert --continue")
(use "git revert --skip" to skip this patch)
(use "git revert --abort" to cancel the revert operation)

### 18.3 Reverting Multiple Commits

So what we can do here is one of these:
- Edit the file, fix the conflict, then git add it, then git revert --continue to go to the next
commit to be reverted (if any).
- Bail out completely with git revert --abort.
- Skip reverting this particular commit with git revert --skip. If you skip all the commits you
were reverting, it’s just like an abort.
If you fix the conflict, you’ll get to enter a commit message for the new commit just like before.

### 18.3 Reverting Multiple Commits
You can specify multiple reverts at the same time on the command line.
Here’s an example that reverts two commits:
$ git revert 4c0b3 81d2a
[main ab3169d] Revert "Added Line 50"
[main b63f003] Revert "Added Line 10"

And there will be two new revert commits after that. You’ll edit two revert commit messages over the
course of that revert.
You can also specify a range of commits. Be sure to do this in oldest-to-newest order, or you’ll get an
empty commit set passed error.
$ git revert 4c0b3^..81d2a
[main ab3169d] Revert "Added Line 50"
[main b63f003] Revert "Added Line 10"

Again, that will make a lot of commits, one per revert. You can squash those commits if you want to, or
you can use -n (“no commit”) to keep Git from committing until you’re ready.
$ git revert -n ee71e 123e8

At this point, the file is staged with those two commits reverted. And you can now make a single commit
that holds them. And you can do the same thing specifying a range.
Of course, there might a conflict, and you’ll have to resolve those in the super fun way we’ve already
discussed.

Chapter 18. Reverting: Undoing Commits

Chapter 19

Reset: Moving Branches Around
Before we begin, using git reset rewrites history. This means that you shouldn’t use it on any branches
that other people might have copies of, i.e. branches that you have pushed.
Of course, this is a highly-recommended guideline, not a rule, and you can reset anything provided you
know what you’re doing and have good communication with your team.
But if you never reset a branch you haven’t pushed, you won’t get into trouble.
So what is it?
Doing a reset allows you change where the HEAD and your current branch point to. You can move your
current branch to a different commit!
When you move a branch to another commit, the branch “becomes” the repo at the point of that commit,
including all the history that led up to that commit. The upshot is that all the commits that led to the old
branch point are now effectively gone, as shown in Figure 18.1.

Figure 19.1: If we reset main to commit 2, commits 3 and 4 will eventually be lost.
So be sure you mean it when you reset! You’ll be losing commits1 !
When doing a reset, you can ask Git to move the current branch to another commit, or to another branch,
or to anything else that identifies a commit.
Now, there is a question of what happens to the difference between your working tree at the old commit
and whatever it would be at the new commit.
You might have read that last sentence too quickly, so let’s revisit it because it’s important. Right now,
you have some files in your working tree. Let’s assume you’re fully committed and your HEAD is on the
main branch. Now if you move the main branch elsewhere, there will necessarily be a difference between
what you had at the commit you were looking at, and the one you will be *looking at.
We need to decide what to do with that difference. Where will it be reflected? As a difference between
the stage and the destination commit? A difference between the working tree and the stage? Or both?
Turns out we have three options: soft reset, mixed reset, and hard reset.
And which you choose controls what happens to the branch, the stage, and the working tree.
Git cleans up “unreachable” commits after some time has elapsed, so they won’t be instantly destroyed. But they’re on borrowed
time unless you create a new branch to hold them.

I want you to consider that all files exist in three places at all times in Git: the working tree,
the stage, and a commit.
And you’re supposed to say, “Wait—the stage has all the files on it? But I haven’t added anything
to it!”
Yes. I’m saying that when your working tree is clean that means that the files in the HEAD commit,
the files on the stage, and the files in your working tree are all the same. And, yes, all the files
exist in all three places!a
And git status won’t show anything because there are no differences between these three places.
And git status shows the differences.
Let’s say you modified a file in your working tree. In that case, git status would show you a
difference between your working tree and the stage as a “modified file”. But there would still be no
difference between the stage and the HEAD commit, so nothing would show as “ready to commit”.
Then let’s say you added the file to the stage. At the point, a copy of the file from the working tree
is placed on the stage. So now the working tree and the stage are the same. And nothing shows
as “modified”. But now, crucially, the stage differs from the HEAD commit! So now git status
shows that difference as “ready to commit”.
Finally, let’s say that before you committed, you modified the file again in the working tree. Now
the file in the working tree is different than the stage. And the file on the stage is different than the
HEAD commit! Now the file shows up as both “ready to commit” and “modified”.
The reason I want us to think about things this way is because it will make this whole thing with
git reset easier to digest. Sometimes a reset will change the files in the working tree, sometimes
on the stage, and sometimes both.

Who knows what it really does under the hood, but we’re going to use this as a mental model for how things work.

Note: in the following examples, I’m going to use the term “old commit” to refer to where the branch was
before the reset, and “new commit” to refer to where it will be after the reset.
With all three variants, the current branch moves to the new (specified) commit.
The summary of differences is:
- Soft:
- Stage: old commit
- Working tree: old commit
- Result: All the old files will show on the stage as “ready to commit”.
- Mixed:
- Stage: new commit
- Working tree: old commit
- Result: All the old files will show in the working tree as “modified”.
- Hard:
- Stage: new commit
- Working tree: new commit
- Result: All the old files will be gone, and the working tree and stage will be clean.

### 19.1 Soft Reset
When you run a git reset --soft, this resets the current branch to point to the given commit, and makes
the stage and working tree both have the changes that were present in the old commit.
The upshot is that git status will show your old commit’s changes as staged, and none of the files as
modified.
In other words, you’ll see the old state of your files on the stage ready to commit.
A common use for this might be to collapse some of your previous commits similar to what we did with
rebase and squashing commits.

### 19.2 Mixed Reset

Let’s say we have commits like this (pretend the numbers are the commit hashes):
commit 555 (HEAD -> main)
Fixed another typo again
commit 444
commit 333
Fixed a typo
commit 222
Implemented feature
commit 111

That’s a gnarly-looking commit history. It would be nice to rewrite it (but if and only if you haven’t pushed
it yet!).
We can do that with a soft reset back to commit 111.
If we do this soft reset:
$ git reset --soft 111

We’ll then be in this point with all the other commits gone…
commit 111 (HEAD -> main)

Except importantly our files as they existed in commit 555 will now be staged and ready to commit.
That means with the soft reset the changes weren’t lost, but effectively commits 222-555 are all squished
together on the stage.
So we commit them:
$ git commit -m "Implemented feature"

And now we’re here with a nice commit history:
commit 222 (HEAD -> main)
Implemented feature
commit 111

And now, finally we can push, happy that our changes are presentable to the general public.
Again, we’ve rewritten history here. Don’t do this if you’ve already pushed those commits past
the one you’re resetting to.

### 19.2 Mixed Reset
Before we begin, the main use case of this reset was to unstage files. Now the more modern command is
git restore --staged, and you should use that if all you want to do is unstage.
But let’s still look at how this works!
When you run a git reset --mixed2 , this resets the current branch to point to the given commit, and it
modifies the stage to that commit, and it doesn’t change your working tree.
The upshot is that it will show files as “modified” with the changes of the old commit, and there will be
nothing on the stage.

You can leave off the --mixed since it’s the default.

Now, thinking about this, since the branch has moved to a commit with your files in one state, but your
working tree has the files in another state, the files must be modified with respect to the commit the branch
now points to.
And this is what happens. Your changes at the old commit will show up as modified files at the current
commit.
It’s like the soft reset, except instead of the old commit ending up on the stage, it ends up in the working
tree. You can stage it and commit it from here.
But that’s not all! Since the stage is also updated to the new commit, it means the stage is effectively
“emptied”.
Like I mentioned, this is the classic use for a mixed reset: git reset HEAD. This moves files from staged
state back to modified state.
This will reset the current branch to where it already was (assuming HEAD points to the current branch),
and reset the stage to be the same as that commit. This unstages the files that were there. And it changes
the working tree files to have the changes that were already present in those files at that point, which
would be any changes you introduced.
And that unstages the files!
Another use might be if you want to squash a bunch of unpushed commits but simply don’t want to stage
the changes at the old commit yet, leaving them as modified.

### 19.3 Hard Reset
This resets everything to a particular commit. The branch moves there. The stage is set to that commit.
The files in the working tree are set to that commit. All changes since that commit are lost.
Use this if you want to bail out. You’ve made some commits and decided that was the wrong way, and
you want to just roll them back entirely.
Again, only do this if you haven’t pushed!
If you do a hard reset, it will simply move the branch and reset your entire world (as it pertains to that
branch) to that point as if nothing had happened since. git status will report that everything is clean.

### 19.4 Reset to a Divergent Branch
In the above examples, we’ve been resetting to a direct ancestor of our current commit. This is the common
case for using git reset.
But there’s no reason why you couldn’t reset to an entirely different divergent branch. It just moves the
branch there with exactly the same rules for soft, mixed, and hard that we’ve already covered.

### 19.5 Resetting Files
So far, we’ve been just doing resets on a commit-by-commit basis. But we could also do mixed resets
with specific files. We can’t do hard or soft resets with specific files, though—sorry!
For example, we can do a mixed reset to unstage a single file.
Let’s say we’re here:
bar.txt

### 19.6 Pushing Branch Changes to a Remote

And we want to reset foo.txt off the stage, but leave bar.txt on there.
Again, we’d use git restore --staged in these modern times. But we’re going to press on
here for the sake of example.
So let’s specify just that file:
$ git reset foo.txt
Unstaged changes after reset:
M
bar.txt

And there you have it.

### 19.6 Pushing Branch Changes to a Remote
Let’s say you’ve made a mess of things somehow and you have to reset a branch that you’ve already
pushed commits on. That is, you have to rewrite a public history.
First: get good communication with the team. They’re going to make fun of you for sure, but at least
they won’t hate you3 .
Never do a forced push without completely understanding why you’re doing it. Git is trying
to stop you from doing a push for a reason: your own good! Everyone else who has cloned the
repo will very likely be impacted and they need to be informed. Everybody. We use it here to
demonstrate when it is necessary.
Our process will be something like this:
1. Do the reset.
## 2. Do a forced push to your remote. For your protection, Git won’t push in this circumstance. You
have to override with a forced push.
Your coworkers will do something like this:
1. Do a git fetch to get the new branch position from the remote.
2. Stash or commit any local changes they need to preserve.
3. Maybe make a new branch at the old branch point in case they need to return to see old soon-to-beobliterated commits.
4. Do a reset of the branch in question to the remote branch commit. For example, if we’re resetting
the main branch, you would git reset --hard origin/main.
5. Pop their changes from the stash, if any.
## 6. Maybe apply earlier commits that got obliterated4 .
Note that your coworkers don’t necessarily need to do a hard reset; they could do a mixed reset, for
instance.

No guarantees. You shouldn’t rewrite commit history that is already public!! It makes a big mess!
Perhaps using git reflog and git cherry-pick or git cherry-pick -n and potentially git add -p, all of which are covered in later chapters. Along with judicious use of rebase, old commits or parts of old commits can be applied while keeping the
commit history clean.

#### 19.6.1 Forcing the Push
We have basically two options to use with git push here:
1. --force: Just push the new branch position, damn the torpedoes5 .
2. --force-with-lease: Only force push if the remote branch’s position is what we expect. In other
words, don’t force push if someone else has pushed a new commit in the meantime. This is a good
safety measure because no one should have pushed a new commit in the meantime since you’ve
been in communication with your team about this. Right?
If you try to --force-with-lease and someone else has pushed another commit to this branch in the
meantime, you’ll be presented with an error:
$ git push --force-with-lease
To git@github.com:user/repo.git
! [rejected]
main -> main (stale info)
error: failed to push some refs to 'git@github.com:user/repo.git'

If that happens, you’ll have to talk to your team to get them to stop, and then pull the changes, make sure
everyone is on board with the new reset, and then start again.
We’ll use --force-with-lease in our examples.

#### 19.6.2 Example: Rewrite Public History
First, let’s play the part of the person who is rewriting the public history.
The very first thing I’m going to do is coordinate with the team. If you’re already past this point, do it
right now.
Then we’ll start the rewrite. We’ll be on the main branch for this demo. Let’s reset to an earlier commit,
and we’ll assume that these commits we’re resetting past are already public and other team members
already have them.
$ git reset --hard 4849e6
HEAD is now at 4849e65 added line 3

So far no harm, but now we’re going to push this history change to our origin.
--force-with-lease for safety.

And we’ll use

$ git push --force-with-lease
To git@github.com:user/repo.git
+ a2b7ac3...ce44516 main -> main (forced update)

Now we’ve publicly rewritten history. Tell the team, which you’ve been in contact with this entire time,
that you’ve done so. And they can begin to fix up their clones with much grumbling.

#### 19.6.3 Example: Receiving Rewritten History
You’ve just received word from your coworker that public history on the main branch has been rewritten
and pushed to the remote, which we’ll assume is origin for this example.
First thing we should do is make sure we’re all backed up in whatever manner we need.
Perhaps a commit of the latest stuff:
$ git add [all files]
$ git commit -m "last commit before public reset"

Or a stash if we’re not ready to commit:

https://en.wikipedia.org/wiki/Battle_of_Mobile_Bay#“Damn_the_torpedoes”

### 19.7 Resetting Without Moving HEAD

$ git stash

And perhaps make a new branch right here so we can revisit the old state of affairs for reference if we
have to:
$ git branch oldmain

And now it’s time for action. We need to fetch the new branch information.
$ git fetch origin
From git@github.com:user/repo.git
+ e7b133a...521a873 main
-> origin/main

(forced update)

We just fetched, so our clone doesn’t look different to us yet. But let’s put an end to that and get on the
same page as origin. This involves resetting our local main to be the same as it is on the remote tracking
branch origin/main. (Remember the latter has been force pushed to a different commit, and we want
our main to point to that commit, as well.)
Assuming we’re on branch main right now:
$ git reset --hard origin/main

And now we’re on the same page as origin.
If we had stashed things, let’s try to get them back, resolving any conflicts as per usual:

And if you want to refer to any old commits and you set up the oldmain branch as above, you can
git switch oldmain to examine them, and maybe use something like git cherry-pick to bring in any
functionality you need.

### 19.7 Resetting Without Moving HEAD
Using the reset feature moves the HEAD around by necessity. What if you just want to move a branch to
another commit but leave HEAD alone?
It can be done! But you can’t do it with a branch you have checked out right now. So either detach the
head or attach it to a different branch.
Instead of using git reset to do this, we’ll use git branch. Here’s an example:
$ git switch topic1
Switched to branch 'topic1'
commit 97c4da49eda8de7b273003515a660945c (HEAD -> topic1)
Thu Aug 1 14:22:39 2024 -0700
fix a third typo
$ git branch --force main
commit 97c4da49eda8de7b273003515a660945c (HEAD -> topic1, main)
Thu Aug 1 14:22:39 2024 -0700

fix a third typo

See what happened to main? It moved to the current commit! You can see it in the output for the second
git log.
You could also specify a destination for main as a second argument if you wanted it to move somewhere
other than your current location.

### 19.8 Resetting to Remove Credentials
Did you accidentally commit some secret password into your repo? Can you use git reset to back out
of that commit?
- Have you pushed? Then NO. Your password is out in the wild. Change it now and never make that
mistake again.
- Have you not yet pushed? Yes. You can do it. But keep in mind the commit containing the password
will remain in your local repo until it is garbage collected.
If the answer was yes, you might find git reset -p useful to selectively reset parts of commits, something
we’ll cover in a later chapter.

Chapter 20

The Reference Log, “reflog”
All this time you’ve been committing things, branching, doing whatever. And Git’s been watching you,
listening like Big Brother, recording everything you do.
And you can use this to your benefit.
Let’s say you’ve done something like a hard reset because you wanted to abandon the branch you were
on.
But then, wait! You actually needed something from one of those commits you just reset past! Is there
any way to get back to it? There’s no branch there, and you can’t remember the commit ID. And since it’s
not an ancestor to anything, git log won’t help you.
How can you get it back?
git reflog to the rescue!

The reflog contains a record of all manner of things you’ve done along with commit IDs, and it keeps
them for 90 days1 . After that time, orphan commits (that is commits with no branch above them) will be
garbage collected.

### 20.1 What Can We Use It For?
You can use it for all kinds of things.
- Looking at orphan commits
- Recreating deleted branches
- Recovering from a bad reset
- Exploring the order of operations on the repo, even if they’re on other branches
- And more!
Basically it gives you a way to look back on the linear history of the repo, and tells you the commit hashes
along the way.
This means if you want to, say, hard reset the repo to some earlier state, you could look up that earlier
commit in the reflog2 .

### 20.2 Looking Back at an Orphan Commit
Let’s run an example where we do the following:
1. Commit a file, foo.txt, on the main branch.
2. Make a new branch, topic1.
## 3. In this new branch, add another file, bar.txt, and commit it.

By default it’s 90 days. You can configure this with the gc.reflogExpire config option.
Keeping in mind to never rewrite history on anything you’ve pushed, of course.

Chapter 20. The Reference Log, “reflog”

4. Modify bar.txt and commit the modification.
