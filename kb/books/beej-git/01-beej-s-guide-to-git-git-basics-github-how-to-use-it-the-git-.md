---
id: beej-git-01
title: "Beej's Guide to Git — Git Basics, GitHub: How To Use It, The Git Log and HEAD, Branches…",
slug: beej-git-01-beej-s-guide-to-git-git-basics-github-how-to-use-it-the-git-
source: "Beej's Guide to Git",
sourceSection: "2. Git Basics, 3. GitHub: How To Use It, 4. The Git Log and HEAD, 5. Branches and Fast-Forward Merges, 6. Merging and Conflicts, 7. Using Subdirectories with Git, 8. Ignoring Files with .gitignore, 9. Remotes: Repos in Other Places, 10. Remote Tracking Branches, 11. File States, 12. Comparing Files"
track: git-ops,
tier: free
tags: [git, version-control, devops]
summary: "What is Git? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Covers 47 sections: Git Basics, GitHub: How To Use It, The Git Log and HEAD.",
---
# Beej's Guide to Git — Git Basics, GitHub: How To Use It, The Git Log and HEAD, Branches…

## 2. Git Basics
2.1
What is Git? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.1.1 Definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.2
What is GitHub? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.3
What is GitHub? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.4
The Most Basic Git Workflow . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.4.1 Definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.5
What is Cloning? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.5.1 Definitions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.6
How Do Clones Interact? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7
Actual Git Usage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7.1 Step 0: One-time Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7.2 Step 1: Clone an Existing Repo . . . . . . . . . . . . . . . . . . . . . . . . .
2.7.3 Step 2: Make Some Local Changes . . . . . . . . . . . . . . . . . . . . . . .
2.7.4 Step 3: Add Changes to the Stage . . . . . . . . . . . . . . . . . . . . . . . .
2.7.5 Step 4: Commit those Changes . . . . . . . . . . . . . . . . . . . . . . . . . .
2.7.6 Step 5: Push Your Changes to the Remote Repo . . . . . . . . . . . . . . . . .

11
12
13

## 3. GitHub: How To Use It
3.1
Making a GitHub Account . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.2
Creating a New Repo on GitHub . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3
Authentication . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.1 GitHub CLI . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.2 SSH Keys . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.3.3 Using Personal Access Tokens . . . . . . . . . . . . . . . . . . . . . . . . . .
3.4
Make a Local Clone of the Repo . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.4.1 Cloning from GitHub with GitHub CLI . . . . . . . . . . . . . . . . . . . . .
3.4.2 Cloning from GitHub with SSH Keys . . . . . . . . . . . . . . . . . . . . . .
3.5
Make Changes and Push! . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
3.6
Collaboration on GitHub . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

18

## 4. The Git Log and HEAD
4.1
An Example Log . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.2
What’s in the log? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.3
The HEAD Reference . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
4.4
Going Back In Time and Detached HEAD . . . . . . . . . . . . . . . . . . . . . . . .
4.5
The Old Command: git checkout . . . . . . . . . . . . . . . . . . . . . . . . . .
4.6
Commits Relative to HEAD . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

22
23
24
25

iii

iv

## 5. Branches and Fast-Forward Merges
5.1
What is a Branch? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.2
A Quick Note about git pull . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.3
HEAD and Branches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.4
Listing All Your Branches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.5
Creating a Branch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.6
Make Some Commits on a Branch . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.7
Merging: Fast-Forward . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
5.8
Deleting a Branch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

27
27
29
29
30
31
32
33
34

## 6. Merging and Conflicts
6.1
An Example of Divergent Branches . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.2
Merging Divergent Branches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.3
Merge Conflicts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.4
What a Conflict Looks Like . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.5
Why Merge Conflicts Happen . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
6.6
Merging with IDEs or other Merge Tools . . . . . . . . . . . . . . . . . . . . . . . .
6.7
Merge Big Ideas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

37
37
38
38
39

## 7. Using Subdirectories with Git
7.1
Repos and Subdirectories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.1.1 What about Subprojects? . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
7.2
Accidentally Making a Repo in your Home Directory . . . . . . . . . . . . . . . . .
7.3
Empty Subdirectories in Repos . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

44

## 8. Ignoring Files with .gitignore
8.1
Adding a .gitignore File . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.2
Can I Specify Subdirectories in .gitignore? . . . . . . . . . . . . . . . . . . . . .
8.3
Where do I Put the .gitignore? . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.4
Wildcards . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.5
Negated .gitignore Rules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
8.6
How To Ignore All Files Except a Few? . . . . . . . . . . . . . . . . . . . . . . . .
8.7
Getting Premade .gitignore Files . . . . . . . . . . . . . . . . . . . . . . . . . .

45
45
46
46
47
47
48
48

## 9. Remotes: Repos in Other Places
9.1
Remote and Branch Notation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.2
Getting a List of Remotes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.3
Changing a Remote’s URL . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
9.4
Adding a Remote . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

50
50

## 10. Remote Tracking Branches
10.1 Branches on Remotes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.2 Listing Remote Tracking Branches . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.3 Pushing to a Remote . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
10.4 Making a Branch and Pushing to Remote . . . . . . . . . . . . . . . . . . . . . . . .
10.5 Deleting Remote Tracking Branches . . . . . . . . . . . . . . . . . . . . . . . . . .
10.5.1 Fetching Deleted Remote Branches . . . . . . . . . . . . . . . . . . . . . . .
10.5.2 Deleting Your Remote Tracking Branch . . . . . . . . . . . . . . . . . . . . .
10.5.3 Deleting a Branch on a Remote . . . . . . . . . . . . . . . . . . . . . . . . .
10.6 Multiple Remotes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

53
53
54
54
55
56

## 11. File States
11.1 What States Can Files in Git Be In? . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.2 Unmodified to Untracked . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
11.3 Files In Multiple States . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

59
59
60
61

## 12. Comparing Files with Diff
12.1 Basic Usage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.2 Diffing the Stage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

63
63
64

v

12.3

More Diff Fun . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.1 Diff Any Commits or Branches . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.2 Diffing Order . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.3 Diffing with Parent Commit . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.4 More Context . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.5 Just the File Names . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.6 Ignoring Whitespace . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.7 Just Certain Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.3.8 Inter-branch Diffs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
12.4 Difftool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

65
65
66
66
68
68

## 13. Renaming and Removing Files
13.1 Renaming Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.2 Unrenaming Files from the Stage . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.3 Removing Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.4 Unremoving Files from the Stage . . . . . . . . . . . . . . . . . . . . . . . . . . . .
13.5 Unremoving Files from Earlier Commits . . . . . . . . . . . . . . . . . . . . . . . .
13.6 A Note on Removing Secrets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

70
70
71
72

## 14. Collaboration across Branches
14.1 Communication and Delegation . . . . . . . . . . . . . . . . . . . . . . . . . . . .
14.2 Approach: Everyone Uses One Branch . . . . . . . . . . . . . . . . . . . . . . . . .
14.3 Approach: Everyone Uses Their Own Branch . . . . . . . . . . . . . . . . . . . . .
14.4 Approach: Everyone Merges to the Dev Branch . . . . . . . . . . . . . . . . . . . .

75
75
76
76
77

## 15. Rebasing: Moving Commits
15.1 Contrasted to Merging . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.2 How it Works . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.3 When Should I Do This? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.4 Pulling and Rebasing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.5 Conflicts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.6 Squashing Commits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.6.1 Squash versus Fixup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
15.7 Multiple Conflicts in the Rebase . . . . . . . . . . . . . . . . . . . . . . . . . . . .

81
81
82
83
83
84
86
89
89

## 16. Stashing: Temporarily Set Changes Aside
16.1 Example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.2 The Stash Stack . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.3 Conflicts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
16.4 Stashing New Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

91
91
92
93
94

## 17. GitHub: Forking and Pull Requests
95
17.1 Making a Fork . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96
### 17.2 Making Your Changes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 96
### 17.3 Syncing the Upstream with Your Fork . . . . . . . . . . . . . . . . . . . . . . . . . 97
### 17.4 Making a Pull Request . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 97
### 17.5 Flipside: Merging a Pull Request . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98
### 17.6 Making Many Pull Requests with Branches . . . . . . . . . . . . . . . . . . . . . . 99
### 17.7 Deleting a Pull Request . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
### 17.8 Syncing on the Command Line . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 100
## 18. Reverting: Undoing Commits
103
18.1 Performing the Revert . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 103
### 18.2 Revert Conflicts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 104
### 18.3 Reverting Multiple Commits . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 105
## 19. Reset: Moving Branches Around
107
19.1 Soft Reset . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 108
### 19.2 Mixed Reset . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 109

vi
19.3
19.4
19.5
19.6

Hard Reset . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Reset to a Divergent Branch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Resetting Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Pushing Branch Changes to a Remote . . . . . . . . . . . . . . . . . . . . . . . . .
19.6.1 Forcing the Push . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
19.6.2 Example: Rewrite Public History . . . . . . . . . . . . . . . . . . . . . . . .
19.6.3 Example: Receiving Rewritten History . . . . . . . . . . . . . . . . . . . . . .
19.7 Resetting Without Moving HEAD . . . . . . . . . . . . . . . . . . . . . . . . . . . .
19.8 Resetting to Remove Credentials . . . . . . . . . . . . . . . . . . . . . . . . . . . .

111
113
114

## 20. The Reference Log, “reflog”
20.1 What Can We Use It For? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
20.2 Looking Back at an Orphan Commit . . . . . . . . . . . . . . . . . . . . . . . . . .
20.3 Reflog Selectors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

118

## 21. Patch Mode: Applying Partial Changes
21.1 Adding Files in Patch Mode . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
21.2 Resetting Files in Patch Mode . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
21.3 Other Patch Mode Commands . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

119
119
121
124

## 22. Cherry-Pick: Bringing in Specific Commits
125
22.1 Cherry-Pick Example . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
### 22.2 Cherry-Pick Conflicts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 128
## 23. Who’s to Blame for this Code?
129
23.1 Fancier Blaming . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 129
## 24. Configuration
131
24.1 Local Configuration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 131
### 24.2 Listing the Current Config . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 132
### 24.3 Getting, Setting, and Deleting Variables . . . . . . . . . . . . . . . . . . . . . . . . 133
### 24.4 Some Popular Variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
### 24.5 Editing the Config Directly . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 134
### 24.6 Conditional Configuration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 134
### 24.7 Older Git Versions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 135
## 25. Git Aliases
137
25.1 Creating an Alias . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137
### 25.2 Displaying Aliases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
### 25.3 Some Neat Sample Aliases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
### 25.4 Seeing Git’s Alias Expansion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
## 26. Changing Identity
141
26.1 Changing the User Configuration Variables . . . . . . . . . . . . . . . . . . . . . . . 141
### 26.2 Changing the SSH Authentication Key . . . . . . . . . . . . . . . . . . . . . . . . . 141
### 26.3 Changing your GPG Signing Key . . . . . . . . . . . . . . . . . . . . . . . . . . . 142
### 26.4 Changing your SSH Signing Key . . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
## 27. Amending Commits
145
27.1 Amending the Commit Message . . . . . . . . . . . . . . . . . . . . . . . . . . . . 145
### 27.2 Adding some Files to the Commit . . . . . . . . . . . . . . . . . . . . . . . . . . . 146
## 28. Difftool
147
28.1 Configuring . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
### 28.2 Available Difftools . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
## 29. Mergetool
149
29.1 Merge Tool Operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 149
### 29.2 Some Example Merge Tools . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 150
### 29.3 Using Vimdiff as a Merge Tool . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 150

29.4

vii

Backing up the Originals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 152

## 30. Submodules
153
30.1 Using a Repo with Submodules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
### 30.2 Creating a Submodule . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 154
### 30.3 Setting the Commit for the Submodule . . . . . . . . . . . . . . . . . . . . . . . . . 156
### 30.4 Getting Submodule Latest . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 158
### 30.5 Updating the Actual Submodule Itself . . . . . . . . . . . . . . . . . . . . . . . . . 158
#### 30.5.1 Modify the Submodule Repo Elsewhere . . . . . . . . . . . . . . . . . . . . . 158
#### 30.5.2 Modify the Submodule Repo in the Submodule Directory . . . . . . . . . . . . 159
### 30.6 Getting the Submodule Status . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 159
### 30.7 Some Behind the Scenes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
### 30.8 Deleting a Submodule . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
## 31. Tags
163
31.1 Lightweight Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 163
### 31.2 Annotated Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
### 31.3 Pushing Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
### 31.4 Deleting Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
## 32. Worktrees
165
32.1 Worktree Rules and Regulations . . . . . . . . . . . . . . . . . . . . . . . . . . . . 165
### 32.2 Making a New Worktree . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 32.3 Removing a Worktree . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
### 32.4 Listing Worktrees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 167
### 32.5 Worktrees and Detached HEAD . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 167
## 33. Appendix: Making a Playground
169
33.1 Cloning Bare Repos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 170
### 33.2 Automating Playground Builds . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 172
## 34. Appendix: Getting Out of Editors

175

## 35. Appendix: Errors and Scary Messages
177
35.1 Detached Head . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
### 35.2 Upstream Branch Name Doesn’t Match Current . . . . . . . . . . . . . . . . . . . . 178
### 35.3 Current Branch Has No Upstream Branch . . . . . . . . . . . . . . . . . . . . . . . 178
## 36. Appendix: Just Enough Vim
181
36.1 Launching Vim . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
### 36.2 Modal Editing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
### 36.3 Going Between Modes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 181
### 36.4 Moving the Cursor . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 36.5 More Modes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 36.6 Command Line Mode . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 36.7 Exiting Vim . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 182
### 36.8 Learn More . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 183
## 37. Appendix: Other References

185

## 38. Quick Reference
187
38.1 Glossary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 187
### 38.2 File States . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
### 38.3 Configuration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
#### 38.3.1 Set identity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
#### 38.3.2 Set default branch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 188
#### 38.3.3 Set default pull behavior to merge or rebase . . . . . . . . . . . . . . . . . . . 188
#### 38.3.4 Set default editor, difftool, and mergetool . . . . . . . . . . . . . . . . . . . . 189
#### 38.3.5 Colorful Git output . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
#### 38.3.6 Autocorrect . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189

viii

#### 38.3.7 Newline translation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
#### 38.3.8 Aliases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 189
### 38.4 Creating and Cloning Repos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
### 38.5 Adding, Renaming, Deleting, Committing . . . . . . . . . . . . . . . . . . . . . . . 190
### 38.6 Getting Status . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
### 38.7 Getting a Diff . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
### 38.8 Branches . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
### 38.9 Pulling and Pushing, and Fetching . . . . . . . . . . . . . . . . . . . . . . . . . . . 192
### 38.10 Merging . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 192
### 38.11 Remotes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 38.12 Ignoring Files . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 38.13 Rebasing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 38.14 Stashing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 193
### 38.15 Reverting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 38.16 Resetting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 38.17 The Reflog . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 38.18 Cherry-pick . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
### 38.19 Blame . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
### 38.20 Submodules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
### 38.21 Tags . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
### 38.22 Worktrees . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 196

Chapter 1

Foreword
Hello again, everyone! In my role as an industry professional-turned-college instructor, I definitely see
my fair share of students struggling with Git.
And who can blame ’em? It’s a seemingly-overcomplicated system with lots of pitfalls and merge conflicts
and detached heads and remotes and cherrypicks and rebases and an endless array of other commands that
do who-knows-what.
Which leads us directly to the goal: let’s make sense of all this and go from complete Git novice up to
intermediate! We’ll start off easy (allegedly) with commands mixed in with some theory of operation.
And we’ll see that understanding what Git does under the hood is critical to using it correctly.
And I promise there’s definitely a chance that after you get through some of this guide, you might actually
start to appreciate Git and like using it.
I’ve been using it for years (I’m using it for the source code for this guide right now) and I can certainly
vouch for it becoming easier over time, and then, even, second nature.
But first, some boilerplate!

### 1.1 Audience
The initial draft of this guide was put online for the university students where I worked (or maybe still
work, depending on when you’re reading this) as an instructor. So it’s pretty natural to assume that’s the
audience I had in mind.
But I’m also hoping that there are enough other folks out there who might get something of use from the
guide as well, and I’ve written it in a more general sense with all you non-college students in mind.
This guide assumes that you have basic POSIX shell (i.e. Bash, Zsh, etc.) usage skills, i.e.:
- You know basic commands like cd, ls, mkdir, cp, etc.
- You can install more software.
It also assumes you’re in a Unix-like environment, e.g. Linux, BSD, Unix, macOS, WSL, etc. with a
POSIX shell. The farther you are away from that (e.g. PowerShell, Commodore 64), the more manual
translation you’ll have to do.
Windows is naturally the sticking point, there. Luckily Git for Windows comes with a Bash shell variant
called Git Bash. You can also install WSL1 to get a Linux environment running on your Windows box.
I wholeheartedly recommend this for hacker types, since Unix-like systems are hacker-awesome, and
additionally I recommend you all become hacker types.

https://learn.microsoft.com/en-us/windows/wsl/

Chapter 1. Foreword

### 1.2 Official Homepage
This official location of this document is (currently) https://beej.us/guide/bggit/2 .

### 1.3 Email Policy
I’m generally available to help out with email questions so feel free to write in, but I can’t guarantee a
response. I lead a pretty busy life and there are times when I just can’t answer a question you have. When
that’s the case, I usually just delete the message. It’s nothing personal; I just won’t ever have the time to
give the detailed answer you require.
As a rule, the more complex the question, the less likely I am to respond. If you can narrow down your
question before mailing it and be sure to include any pertinent information (like platform, compiler, error
messages you’re getting, and anything else you think might help me troubleshoot), you’re much more
likely to get a response.
If you don’t get a response, hack on it some more, try to find the answer, and if it’s still elusive, then write
me again with the information you’ve found and hopefully it will be enough for me to help out.
Now that I’ve badgered you about how to write and not write me, I’d just like to let you know that I fully
appreciate all the praise the guide has received over the years. It’s a real morale boost, and it gladdens me
to hear that it is being used for good! :-) Thank you!

### 1.4 Mirroring
You are more than welcome to mirror this site, whether publicly or privately. If you publicly mirror the
site and want me to link to it from the main page, drop me a line at beej@beej.us.

### 1.5 Note for Translators
If you want to translate the guide into another language, write me at beej@beej.us and I’ll link to your
translation from the main page. Feel free to add your name and contact info to the translation.
Please note the license restrictions in the Copyright and Distribution section, below.

### 1.6 Copyright and Distribution
Beej’s Guide to Git is Copyright © 2024 Brian “Beej Jorgensen” Hall.
With specific exceptions for source code and translations, below, this work is licensed under the Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License. To view a copy of this
license, visit https://creativecommons.org/licenses/by-nc-nd/3.0/ or send a letter to Creative
Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
One specific exception to the “No Derivative Works” portion of the license is as follows: this guide may
be freely translated into any language, provided the translation is accurate, and the guide is reprinted in
its entirety. The same license restrictions apply to the translation as to the original guide. The translation
may also include the name and contact information for the translator.
The programming source code presented in this document is hereby granted to the public domain, and is
completely free of any license restriction.
Educators are freely encouraged to recommend or supply copies of this guide to their students.
Contact beej@beej.us for more information.

https://beej.us/guide/bggit/

### 1.7 Dedication

### 1.7 Dedication
The hardest things about writing these guides are:
- Learning the material in enough detail to be able to explain it
- Figuring out the best way to explain it clearly, a seemingly-endless iterative process
- Putting myself out there as a so-called authority, when really I’m just a regular human trying to
make sense of it all, just like everyone else
- Keeping at it when so many other things draw my attention
A lot of people have helped me through this process, and I want to acknowledge those who have made
this book possible:
- Everyone on the Internet who decided to help share their knowledge in one form or another. The
free sharing of instructive information is what makes the Internet the great place that it is.
- Everyone who submitted corrections and pull-requests on everything from misleading instructions
to typos.
Thank you! ♥

Chapter 1. Foreword

Chapter 2

Git Basics
Welcome to the Beej’s Guide to Git!
This guide has two goals, in no particular order:
1. Help you get some familiarity with Git syntax on the command line.
2. Help you get a mental model that describes how Git stores its information.
I feel the second of these is very important for becoming even remotely adept at using Git, which is why
I spend so much time talking about it. Yes, you can get by with a cheat-sheet of common Git commands,
but if you want to fearlessly use the tool to its full effectiveness, you gotta learn the internals!
And, yes, Git is complex. There’s a lot to it. But like with many complex tools, there’s a lot of power to
be found there if you put in the time to get good at it.

### 2.1 What is Git?
Git is a source code control system, also known as a version control system.
Clear? Okay, not really? Let’s dive in a bit more, then!
Git’s main job is to keep a log of snapshots of the current state of all your source code in a particular
directory tree. A snapshot is the current state of all tracked files at a particular time. If you wanted to see
what your source code looked like last Wednesday, you could go back in time and see it.
The idea is that you’ll make some changes (to implement a feature, for example), and then you’ll commit
those changes to the source code repo (repository) once the feature is ready. This saves the changes to the
repo and allows other collaborators to see them.
And if you ever change something you didn’t want to, or you want to see how things were implemented
in the past, you can always check out a previous commit and take a look.
Git keeps a history of all the commits you’ve ever made. Assuming nothing criminal is happening, this
should be a great relief to you; if you accidentally delete a bunch of code, you can look at a previous
commit and get it all back.
But that’s not all! As we’ll see, Git also works well as a remote backup mechanism, and works wonderfully
when cooperating with a team on the same codebase.

#### 2.1.1 Definitions
- Source Code Control System/Version Control System: Software that manages changes to a software project potentially consisting of thousands of source files edited by potentially hundreds of
developers. Git is a source code control system. There are many others.
- Commit: An explicit moment in time where a snapshot of the contents of all the source files are
recorded in the source code control system. Very, very typically the code is in a working state when

the commit is made; in other words, the commit represents in some ways a seal of approval that the
repo in this state is in working order even if the changes aren’t complete.
Example commits might be:
- “Add feature X to the codebase”
- “Fix bug Y”
- “Merge other contributor’s changes into the codebase”
- “Partially complete the Spanish translation”
- Repo/Source Code Repository: This is where a particular software project is stored in the source
code control system. Typically each project has its own repo. For example, you might “create a Git
repo” to hold a new project you’re working on.
Sometimes repos are local to your computer, and sometimes they’re stored on other, remote computers.

### 2.2 What is GitHub?
GitHub1 is not Git.

### 2.3 What is GitHub?
Oh, more?
GitHub is a website that provides a front end to a lot of Git features, and some additional GitHub-specific
features, as well.
It also provides remote storage for your repo, which acts as a backup.
Takeaway: GitHub is a web-based front-end to Git (specifically one that works on the copy of your repo
at GitHub—stay tuned for more on that later).
What about GitLab and Gitea? GitLaba is a competitor to GitHub. Giteab is an open-source
competitor that allows you to basically run a GitHub-like front-end on your own server. None of
this information is immediately important.
b

https://gitlab.com
https://docs.gitea.com/

Regardless of whatever repos you have on GitHub, you’ll also have copies (known as clones) of those
repos on your local system to work on. Periodically, in a common workflow, you’ll sync your clone of
the repo with GitHub.
You don’t need GitHub. Even though you might be commonly using GitHub, there’s no law that
says you have to. You can just create and destroy repos on your local system all you want, even if
you’re not connected to the Internet. See Appendix: Making a Playground for more information
once you’re more comfortable with the basics.

### 2.4 The Most Basic Git Workflow
There’s a super-common workflow that you’ll use repeatedly:
1. Clone a remote repo. The remote repo is commonly on GitHub, but not necessarily.
2. Make some local changes in your working tree, where the project files are on your computer.
3. Add those changes to the stage (AKA the index).
4. Commit those changes.
5. Push your commit back to the remote repo.
## 6. Go back to Step 2.
This is not the only workflow; there are others that are also not uncommon.

https://github.com/

### 2.5 What is Cloning?

#### 2.4.1 Definitions
- Clone (verb): to make a copy of a remote repo locally.
- Clone (noun): a local copy of a remote repo.
- Remote: In Git, a clone of a repo in another location.
- Working Tree: The directory that you go into to edit and change the files of the project. This is
created when you clone.
- Stage: In Git, a place you add copies of files to in preparation for a commit. The commit will
include all the modified files that you’ve placed on the stage. It will not include modified files you
haven’t placed on the stage.
- Index: A less-common name for the stage.

### 2.5 What is Cloning?
First, some backstory.
Git is what’s known as a distributed version control system. This means that, unlike many version control
systems, there’s no one central authority for the data. (Though commonly Git users treat a site like GitHub
in this regard, loosely.)
Instead, Git has clones of repos. These are complete, standalone copies of the entire commit history of
that repo. Any clone can be recreated from any other. None of them are more powerful than any others.
Looking back at The Most Basic Git Workflow, above, we see that Step 1 is to clone an existing repo.
If you’re doing this from GitHub, it means you’re making a local copy of an entire, existing GitHub repo.
Making a clone is a one time-process, typically (though you can make as many as you want).

#### 2.5.1 Definitions
- Distributed Version Control System: A VCS in which there is no central authority of the data,
and multiple clones of a repo exist.
This means after you clone a repo, there are two: one that is remote, and one that is local to your
computer.
These clones are completely separate and changes you make to your local repo will not be reflected
in the remote clone. Unless, that is, you explicitly make them interact.

### 2.6 How Do Clones Interact?
After you make a clone, there are two major operations you typically use:
- Push: This takes your local commits and uploads them to the remote repo.
- Pull: This takes the remote commits and downloads them to your local repo.
Behind the scenes, there’s a process going on called a merge, but we’ll talk more about that later.
Until you push, your local changes aren’t visible on the remote repo.
Until you pull, the changes on the remote repo aren’t visible on your local repo.

### 2.7 Actual Git Usage
Let’s put all this into play. This section assumes you have the command line Git tools installed. It also
generally assumes you’re running a Unix shell like Bash or Zsh.

Where do you get these shells? Linux/BSD/Unix and Mac users will already have these shells.
Yay!
Recommendation for Windows users is to install and run Ubuntu with WSLa to get a virtual Linux
installation. Or, if you don’t want to jump down that particular rabbit hole just yet, run Git Bash
(included with Git).

https://learn.microsoft.com/en-us/windows/wsl/

For this example, we’ll assume we have a GitHub repo already in existence that we’re going to clone.
Recall the process in The Most Basic Git Workflow, above:
1. Clone a remote repo. The remote repo is commonly on GitHub, but not necessarily.
2. Make some local changes.
3. Add those changes to the stage.
4. Commit those changes.
5. Push your commit back to the remote repo.
## 6. Go back to Step 2.

#### 2.7.1 Step 0: One-time Setup
“Wait! You didn’t say there was a Step 0!”
Yes, one time, before you start using Git, you should tell it what your name and email address are. These
will be attached to the commits you make to the repo.
You can change them any time in the future, and you can even set them on a per-repo basis. But for now,
let’s set them globally so Git doesn’t complain when you make a commit.
You just have to do this once then never again (unless you want to).
Type both of these on the command line, filling in the appropriate information.
In this guide, things you type at the shell prompt are indicated by a prefaced $. Don’t type
the $; just type what follows it. Your actual shell prompt might be % or $ or something else, but
here we use the $ to indicate it.
$ git config set --global user.email "your-email@example.com"

If you need to change them in the future, just run those commands again.
If you get an error with the above commands you might be running an older version of Git. Try
them again, but leave out the word set. Or, better yet, see if you can get a newer version of Git.
Finally, let’s set the default branch name. It’s really too early to explain what that means, but let’s run this
command and set the name to main. This will keep Git from complaining when you create a repo.
$ git config set --global init.defaultBranch main

Some repos use master for the default branch name instead of main. It’s actually an arbitrary
choice, and repo creators can use anything they want. Git itself hints, “Names commonly chosen
instead of ‘master’ are ‘main’, ‘trunk’ and ‘development’.”
I’m suggesting using main for multiple reasons, not the least of which is that’s what GitHub uses,
but it’s up to you. In this guide I’ll use main.

#### 2.7.2 Step 1: Clone an Existing Repo
Let’s clone a repo! Here’s an example repo you can actually use. Don’t worry–you can’t mess anything
up on the remote repo even though (and because) you don’t own it.

### 2.7 Actual Git Usage

Like we said before, this isn’t the only workflow. Sometimes people make a local repo first,
add some commits, then create a remote repo and push those commits. But for this example, we’ll
assume the remote repo exists first, though this isn’t a requirement.
Switch into a subdirectory where you want the clone created. This command will create a new subdirectory
out of there that will hold all the repo files.
(In the example, anything that begins with $ represents the shell prompt indicating this is input, not output.
Don’t type the $; just type in the part after it.)
$ git clone https://github.com/beejjorgensen/git-example-repo.git

You should see some output similar to this:
Cloning into 'git-example-repo'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 10 (delta 2), reused 9 (delta 1), pack-reused 0 (from 0)
Receiving objects: 100% (10/10), done.
Resolving deltas: 100% (2/2), done.

Congratulations! You have a clone of the repo. Let’s have a peek:
$ cd git-example-repo
$ ls -la

And we see a number of files:
total 16
drwxr-xr-x
drwxr-xr-x
drwxr-xr-x
-rw-r--r--rwxr-xr-x

5 beej
106 beej
12 beej
1 beej
1 beej

## 160. Jan 18 13:35 .
## 3392. Jan 18 13:35 ..
## 384. Jan 18 13:35 .git
## 162. Jan 18 13:35 README.md
## 75. Jan 18 13:35 hello.py

There are two files in this repo: README.md and hello.py.
The directory .git has special meaning; it’s the directory where Git keeps all its metadata and
commits. You can look in there, but you don’t have to. If you do look, don’t change anything. The
only thing that makes a directory a Git repo is the presence of a valid .git directory within it.
Let’s ask Git what it thinks the current status of the local repo is:

Gives us:

There’s a lot of information here, surprisingly.
We haven’t talked about branching yet, but this is letting us know we’re on branch main. That’s fine for
now.

It also tells us this branch is up to date with a branch called origin/main. A branch in Git is just a
reference to a certain commit that’s been made, like a Post-It note attached to that commit. (Recall that a
commit is a snapshot of the code repo at some time.)
We don’t want to get caught up in the intricacies of branching right now, but bear with me for a couple
paragraphs.
origin is an alias for the remote repository that we originally cloned from, so origin/main corresponds
to “branch main on the repo you originally cloned from”2 .

There is one important thing to notice here: there are two main branches. There’s the main branch on
your local repo, and there’s a corresponding main branch on the remote (origin) repo3 .
Remember how clones are separate? That is, changes you make on one clone aren’t automatically visible
on the other? This is an indication of that. You can make changes to your local main branch, and these
won’t affect the remote’s main branch. (At least, not until you push those changes!)
Lastly, it mentions we’re up-to-date with the latest version of main on origin (that we know of), and that
there’s nothing to commit because there are no local changes. We’re not sure what that means yet, but it
all sounds like vaguely good news.

#### 2.7.3 Step 2: Make Some Local Changes
Let’s edit a file and make some changes to it.
Again, don’t worry about messing up the remote repo—you don’t have permissions to do that.
Your safety is completely assured from a Git perspective.
If you’re using VS Code, you can run it in the current directory like so:
$ code .

Otherwise, open the code in your favorite editor, which, admit it, is Vim4 .
Let’s change hello.py:
It was:
#!/usr/bin/env python

but let’s add a line so it reads:
#!/usr/bin/env python
print("And this is my modification!")

And save that file.
Let’s ask Git what the status is now.

We’re glazing over an important topic here that we’ll come back to later called remote tracking branches.
And again we’re doing some hand-waving. There are actually three branches. Two of them, main and origin/main are on
your local clone. And there’s a third main on the remote origin that your origin/main is tracking. Feel free to ignore this detail
until we get to the remote tracking branch chapter.

### 2.7 Actual Git Usage

hello.py

This is telling us a couple important things.
First, Git has detected that we modified a file, namely hello.py, which we did.
But it also says there are no changes added to commit (i.e. “there is nothing to make a commit with”).
What does that mean?
It means we haven’t added any modified files to the stage yet. Recall that the stage is where we can place
items that we wish to include in the next commit. Let’s try that.
2.7.3.1 Step 2.1: Reviewing Your Changes
We’re going to divert for just a moment to briefly introduce a new optional tool: git diff (short for
“difference”, though we still pronounce it “diff”).
If you make some changes to files and you need a refresher on all the things you’ve changed, you can run
this command to see it. But, fair warning, the output is… esoteric.
Let’s try it.
diff --git a/hello.py b/hello.py
index 9db78d2..1187d32 100755
--- a/hello.py
+++ b/hello.py
@@ -2,3 +2,4 @@
+print("And this is my modification!")

What the heck is this sorcery? If you’re lucky, it got color-coded for you with (by convention) added lines
in green and deleted lines in red.
For now, just notice a couple things:
1. The file name. We see this change was to hello.py.
2. The line with the + at the front. This indicates an added line.
A - at the front of a line would indicate the line was deleted. And changed lines are often shown as the
old line being deleted and a new one added.
Finally, if you want to see the diff for things you’ve added to the stage already (in the next step), you can
run git diff --staged.
We’ll dive more into diff later, but I wanted to introduce it here since it’s so useful.

#### 2.7.4 Step 3: Add Changes to the Stage
The Git status message, above, is trying to help us out. It says:

It’s suggesting that git add will add things to the stage—and it will.
Now we, the developers, know that we modified hello.py, and that we’d like to make a commit that
reflects the changes to that file. So we need to first add it to the stage so that we can make a commit.
Let’s do it with git add:
$ git add hello.py
hello.py

Now it’s changed from saying “Changes not staged for commit” to saying “Changes to be committed”, so
we have successfully copied hello.py to the stage!
There’s also a helpful message there about how to unstage the file. Let’s say you accidentally
added it to the stage and you changed your mind and wanted to not include it in the commit after
all. You can run
$ git restore --staged hello.py

and that will change it back to the “Changes not staged for commit” state.

#### 2.7.5 Step 4: Commit those Changes
Now that we have something copied to the stage, we can make a commit. Recall that a commit is just a
snapshot of the state of the repo given the modified files on the stage. Modified files not on the stage will
not be included in the snapshot. Unmodified files are automatically included in the snapshot.
In short, the commit snapshot will contain all the unmodified files Git currently tracks plus the modified
files that are on the stage. (Git just doesn’t show all the unmodified files with status because the output
would be completely unhelpful.)
Let’s do it:
$ git commit -m "Add another print line"
[main 0e1ad42] Add another print line

The -m switch allows you to specify a commit message. If you don’t use -m, you’ll be popped
into an editor, which will probably be Nano or Vim, to edit the commit message. If you’re not
familiar with those, see Getting Out of Editors for help.
If you do get into the editor, know that every line in the commit message that begins with # is a
comment that is ignored for the purposes of the commit. It’s a little weird that the commit message
is a comment about the commit, and then you can have commented-out lines in the comment, but
I don’t make the rules!
And that’s good news! Let’s check the status:
Your branch is ahead of 'origin/main' by 1 commit.

### 2.7 Actual Git Usage

(use "git push" to publish your local commits)

“Nothing to commit, working tree clean” means we have no local changes to our branch.
Turns out there’s an optional shortcut here. If you’ve modified a file, you can just commit it
directly (without adding it to the stage!) by naming it on the command line.
Let’s say you modified foo.txt but didn’t add it. You could:
$ git commit -m "jerbify the flurblux" foo.txt

And that would make the commit directly, bypassing the whole add-it-to-the-stage step. But you
can only do this with files that the repo already is aware of, i.e. they aren’t “untracked”.
You can specify multiple files here, or a directory. Also, this doesn’t affect files that are already on
the stage.
But look! The status says we’re “ahead of ‘origin/main’ by 1 commit”! This means our local commit
history on the main branch has one commit that the remote commit history on its main branch does not
have.
Which makes sense—the remote repo is a clone and so it’s independent of our local repo unless we explicitly try to sync them up. It doesn’t magically know that we’ve made changes to our local repo.
And Git is helpfully telling us to run git push if we want to update the remote repo so that it also has our
changes.
So let’s try to do that. Let’s push our local changes to the remote repo.

#### 2.7.6 Step 5: Push Your Changes to the Remote Repo
Let’s push our local changes to the remote repo:

And that produces:
Username for 'https://github.com':

Uh oh—trouble brewing. Let’s try entering our credentials:
Username for 'https://github.com': my_username
Password for 'https://beejjorgensen@github.com': [my_password]
remote: Support for password authentication was removed on August
13, 2021.
remote: Please see https://docs.github.com/en/get-started/gettingstarted-with-git/about-remote-repositories#cloning-withhttps-urls for information on currently recommended modes
of authentication.
fatal: Authentication failed for 'https://github.com/beejjorgensen/
git-example-repo.git/'

Well, that’s all kinds of not-working. Largely this is because you don’t have permission to write to that
repo since you’re not the owner. And, notably, support for authenticating with a password seems to have
been removed in 2021 which, last I checked, was in the past.
So what do we do? Firstly, we should be the owner of the GitHub repo that we’ve cloned and that’ll solve
some of the permission problems. Secondly, we’d better find another way to authenticate ourselves to
GitHub that’s not plain password.

Let’s try that in the next section.

Chapter 3

GitHub: How To Use It
Now, we’ve said that GitHub (which is a proprietary web front-end to Git run and owned by Microsoft)
is not Git, and it’s true. It’s also true that you never even need to touch GitHub in order to use Git.
That said, it’s really common for people to use GitHub, so we’ll get it set up in this chapter.
Here we’ll make a new GitHub account and see how authentication works. This involves some one-time
setup.
If you already have a GitHub account, you can skip that section.
If you already have authentication set up with GitHub CLI or with SSH keys, you can skip that section,
as well.
If you don’t need to use GitHub, you can skip the entire chapter!

### 3.1 Making a GitHub Account
Head on over to GitHub1 and click Sign Up. Follow those instructions.
Eventually you’ll end up on your home screen dashboard.

### 3.2 Creating a New Repo on GitHub
This will make a repository on GitHub that you own. It does not make a local repository—you’ll have to
clone the repo for that, something we’ll do later.
In GitHub, there’s a green New button on the left of the dashboard.
Also, there’s a + pulldown on the upper right center that has a “New Repository” option. Click one of
those.
On the subsequent page:
1. Enter a “Repository name”, which can be anything as long as you don’t already have a repo by that
name. Let’s use test-repo for this example.
2. Check the “Add a README file” checkbox.
(In the future, you might already have a local repo you’re going to push to this new repo. If that’s
the case, do not check this box or it’ll prevent the push from happening.)
3. Click Create repository at the bottom.
And there you have it.

https://github.com/

Chapter 3. GitHub: How To Use It

### 3.3 Authentication
Before we get to cloning, let’s talk authentication. In the previous part of the intro, we saw that username/password logins were disabled, so we have to do something different.
There are a few options:
- Use a tool called GitHub CLI
- Use SSH keys
- Use Personal Authentication Tokens
GitHub CLI is likely easier. SSH keys are geektacular. I only recently learned that you could authenticate
with personal access tokens, so I can’t really speak to them much.
Personally, I use SSH keys. But other people… don’t. It’s up to you.
If you already have authentication working with GitHub, skip these sections.
Otherwise, choose one of them (like SSH) and use it.

#### 3.3.1 GitHub CLI
This is a command line interface to GitHub. It does a number of things, but one of them is providing an
authentication helper so you can do things like actually push to a remote repo.
Visit the GitHub CLI page2 and follow the installation instructions. If you’re using WSL, Linux, or another
Unix variant, see their installation instructions3 for other platforms.
Once you have it installed, you should be able to run ‘gh –version’ and see some version information, e.g.:
$ gh --version
gh version 2.42.1 (2024-01-15)
https://github.com/cli/cli/releases/tag/v2.42.1

Then you’ll want to run the following two commands:
$ gh auth login
$ gh auth setup-git

The first command (login) will take you through the login process. You’ll have to do this again if you
log out.
It’s going to ask you if you want to use SSH or HTTP. If you have SSH keys set up, I recommend using that.
If you don’t, choose “HTTP” when it asks. The main difference is that with HTTP, the login credentials
are stored unencrypted, whereas with SSH, you can protect them with a passphrase. See below for setting
up SSH keys.
And logging in with a web browser is easiest, when it asks.
The second command (setup-git) is one-time only. This just adds to your global config some stuff to
help with authentication.

#### 3.3.2 SSH Keys
If you don’t want to install and use GitHub CLI, you can take this approach instead. This is more involved,
but has more geek cred. This is what I use.
If you already have an SSH keypair, you can skip the key generation step. You’d know you had one if
you ran ls ~/.ssh and you saw a file like id_rsa.pub or id_ed25519.pub.
To make a new keypair, run the following command:

https://cli.github.com/
https://github.com/cli/cli#installation

### 3.3 Authentication

$ ssh-keygen -t ed25519 -C youremail@example.com

(The -C sets a “comment” in the key. It can be anything, but an email address is common.)
This results in a lot of prompts, but you can just hit ENTER for all of them.
Best practice is to use a password to access this key, otherwise anyone with access to the private
key can impersonate you and access your GitHub account, and any other account you have set up
to use that key. But it’s a pain to type the password every time you want to use the key (which is
any time you do anything with GitHub from the command line), so people use a key agent which
remembers the password for a while.
If you don’t have a password on your key, you’re relying on the fact that no one can get a copy
of the private portion of your key that’s stored on your computer. If you’re confident that your
computer is secure, then you don’t need a password on the key. Do you feel lucky?
Setting up the key agent is outside the scope of this document, and the author is unsure of how it
even works in WSL. GitHub has documentation on the mattera .
For this demo, we’ll just leave the password blank. All of this can be redone with a new key with
a password if you choose to do that later.
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-tothe-ssh-agent

Anyway, just hitting ENTER for all the prompts gets you something like this:
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in id_ed25519
Your public key has been saved in id_ed25519.pub
The key fingerprint is:
SHA256:/lrT43BQBRPJpUXxpTBFInhdtZSQjQwxU4USwt5c0Lw user@locahost
The key's randomart image is:
+--[ED25519 256]--+
.o.X^%^=+|
..oo*^.=o|
..o = o..|
. + E
S .
.
o
. + +
o = .
... .
+----[SHA256]-----+

If you chose any file name other than the default for your key, you’ll have to do some additional
configuration to get it to work with GitHuba .

https://www.baeldung.com/linux/ssh-private-key-git-command

What’s that randomart thing with all the weird characters? It’s a visual representation of that
key. There are ways to configure SSH so that you see the randomart every time you log in. And
the idea is that if one day you see it looks different, something could be amiss security-wise. I
doubt most people every look at it again once it’s been generated, though.
Now if you type ls ~/.ssh you should see something like this:
id_ed25519

id_ed25519.pub

Chapter 3. GitHub: How To Use It

The first file is your private key. This is never to be shared with anyone. You have no reason to even copy
The second file is your public key. This can be freely shared with anyone, and we’re going to share it with
GitHub in a second so that you can log in with it.
If you have trouble in the following subsections, try running these two commands:
$ chmod 700 ~/.ssh
$ chmod 600 ~/.ssh/*

You only have to do that once, but SSH can be a bit picky if the file permissions on those files
aren’t locked down.
Now in order to make this work, you have to tell GitHub what your public key is.
First, get a copy of your public key in the clipboard. Be sure you’re getting the file with the .pub
extension!
$ cat ~/.ssh/id_ed25519.pub

You should see something like this:
ssh-ed25519 AAAC3N[a bunch of letters]V+znpoO youremail@example.com

Copy the entire thing into the clipboard so you can paste it later.
Now go to GitHub, and click on your avatar icon in the upper right.
Choose “Settings”.
Then on the left, choose “SSH and GPG keys”.
Click “New SSH Key”.
For the title, enter something identifying, like, “My laptop key”.
Key type is “Authentication Key”.
Then paste your key into the “Key” field.
And click “Add SSH key”.
We’ll be using SSH to clone URLs later. Remember that.

#### 3.3.3 Using Personal Access Tokens
Remember last chapter when we tried to clone an HTTPS repo URL on the command line and it prompted
for a username and password that didn’t work?
Well, we get to actually make new passwords that will work in that case. They’re called personal access
tokens.
GitHub has a lot of documentation on this4 but the gist of it is that you’re going to create a token that
represents some kind of access, e.g. “ability to read and write my repos”, and you’re going to use that in
lieu of the password on the command line.
So that last failed example would look like this:
Username for 'https://github.com': [MY USERNAME]
Password for 'https://beejjorgensen@github.com': [MY TOKEN]

In other words:

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

### 3.4 Make a Local Clone of the Repo

1. Generate a token.
## 2. Use that token as your password.
Your computer might automatically save those credentials so you don’t have to enter them every time. Or
it might not.
One of the main things personal access tokens can give you is fine-grained control over access. You can
limit access to read-only, or just to certain repos, and so on.
Additionally, you can use GitHub CLI authentication with a token as well. You just have to feed it in there
on standard input. Let’s say you have your token in a file called mytoken.txt. You can authenticate with
GitHub CLI like so:
$ gh auth login --with-token < mytoken.txt

Like with SSH keys, if you lose a laptop that uses a particular access token, you can simply invalidate that
token through GitHub’s UI so that mean people can’t use it.

### 3.4 Make a Local Clone of the Repo
We need to figure out the URL to the repo so we can clone it.
If you click on your icon in the upper right, then “My Repositories”, you should see a page with all your
repos. At this point, it might just be your test-repo repo. Click on the name.
And you should then be on the repo page. You can browse the files here, among other things, but really
we want to get the clone URL.
Click the big blue “Code” button.
What you do next depends on if you’re using GitHub CLI or SSH keys.

#### 3.4.1 Cloning from GitHub with GitHub CLI
You have two options.
- Option 1: Earlier when we authenticated with gh auth login I said to remember if you chose
HTTPS or SSH. Depending on which you chose, you should choose that tab on this window.
Copy the URL.
Go to the command line and run git clone [URL] where [URL] is what you copied. So it’ll be
this for HTTPS:
$ git clone https://github.com/user/test-repo.git

or this for SSH:
$ git clone git@github.com:user/test-repo.git

- Option 2: Choose the “GitHub CLI” tab. Run the command as they have it, which will be something
like:
$ gh repo clone user/test-repo

#### 3.4.2 Cloning from GitHub with SSH Keys
If you set up an SSH key earlier, you can use this method.
After hitting the green “Code” button, make sure the “SSH” tab is selected.
Copy that URL.

Chapter 3. GitHub: How To Use It

Go to the command line and run git clone [URL] where [URL] is what you copied. So it’ll be something
like this:
$ git clone git@github.com:user/test-repo.git

### 3.5 Make Changes and Push!
Now that you’ve cloned the repo, you should be able to cd into that directory, edit a file, git add it to the
stage, then git commit -m message to make a commit…
And then git push to push it back to the clone on GitHub!
And after that if you go to the repo page on GitHub and hit reload, you should be able to see your changes
there!
And now we’re back to that standard common flow:
1. Clone a remote repo.
2. Make some local changes.
3. Add those changes to the stage.
4. Commit those changes.
5. Push your changes back to the remote repo.
## 6. Go back to Step 2.

### 3.6 Collaboration on GitHub
There are two main techniques for this:
1. Fork/pull request
## 2. Add a collaborator
We’ll talk about the first one in the future.
For now, the easiest way to add collaborators is to just add them to your repo.
On the repo page on GitHub, choose “Settings”, then “Collaborators” on the left.
After authenticating, you can click “Add people”. Enter the username of the person you want to collaborate
with.
They’ll have to accept the invitation from their GitHub inbox, but then they’ll have access to the repo.
Be sure to only do this with people you trust!

Chapter 4

The Git Log and HEAD
When we make commits to a Git repo, it tracks each of those commits in a log that you can visit. Let’s
take a look at that now.

### 4.1 An Example Log
You can get the commit log by typing git log.
Let’s say I’m in a repo with a single commit where I’ve just added a file with the commit message “Added”.

produces:
commit 5a02fede3007edf55d18e2f9ee3e57979535e8f2 (HEAD -> main)

If I make another commit, we get a longer log:
commit 5a02fede3007edf55d18e2f9ee3e57979535e8f2

Notice that the most recent commit entry is at the top of the output.

### 4.2 What’s in the log?
There are a few things to notice in the log:
- The commit comment
- The date

Chapter 4. The Git Log and HEAD

- The user who made the commit
Also, we have those huge hex1 numbers after the word commit.

This is the commit ID or commit hash. This is universally unique number that you can use to identify a
particular commit.
Normally you don’t need to know this, but it can be useful for going back in time or keeping track of
commits in multi-developer projects.
We also see a bit at the top that says (HEAD -> main). What’s that about?

### 4.3 The HEAD Reference
We’ve seen that each commit has a unique and unwieldy identifier like this:
5a02fede3007edf55d18e2f9ee3e57979535e8f2

Luckily, there are a few ways to refer to commits with more-human symbolic names.
HEAD is one of these references. It indicates which branch or commit you’re looking at right now in your

project subdirectory2 . Remember how we said you could go look at previous commits? The way you do
that is by moving HEAD to them.
We haven’t talked about branches yet, but the HEAD normally refers to a branch. By default,
it’s the main branch. But since we’re getting ahead of ourselves, I’m going to just keep saying that
HEAD refers to a commit, even though it usually does it indirectly via a branch.
So this is a bit of a lie, but I hope you forgive me.
Some terminology: the Git subdirectory you’re looking at right now and all the files within it is referred
to as your working tree. The working tree is the files as they appear at the commit pointed to by HEAD,
plus any uncommitted changes you might have made.
So if you switch HEAD to another commit, the files in your working tree will be updated to reflect that.
Importantly, the data in the files in the working tree might differ from the data in the files
at the current commit pointed to by HEAD. This happens when you’ve modified a file in the
working tree but haven’t yet committed it.
Okay then, how do we know which commit HEAD is referring to? Well, it’s right there at the top of the
log:

We see HEAD right there on the first line, indicating that HEAD is referring to commit with ID:
5e8cb52cb813a371a11f75050ac2d7b9e15e4751

Again, that’s a bit of a lie. The HEAD -> main means that HEAD is actually referring to the main branch,
and that main is referring to the commit. HEAD is therefore indirectly referring to the commit. More on
that later.

https://en.wikipedia.org/wiki/Hexadecimal
I’m stretching it a bit, here. HEAD looks at the commit you’ve switched to. This might not be quite the same as what’s in your
project subdirectory if you’ve modified some of the files since the moving HEAD to that commit. The commit is a snapshot, but that
snapshot doesn’t include modifications to files until you make another commit that contains them.

### 4.4 Going Back In Time and Detached HEAD

### 4.4 Going Back In Time and Detached HEAD
Here’s my full Git log:
commit 5a02fede3007edf55d18e2f9ee3e57979535e8f2

If I look at the files, I’ll see the changes indicated by the “More output” commit. But let’s say I want to
go back in time to the previous commit and see what the files looked like then. How would I do that?
Maybe there were some changes that existed back in an earlier commit that had since been
removed, and you wanted to look at them, for example.
I can use the git switch command to make that happen.
Before you switch branches, you should be all committed with git status telling you everything is clean. If you’re not, make a commit or stash your stuff before your switch.
Let’s check out the first commit, the one with ID 5a02fede3007edf55d18e2f9ee3e57979535e8f2.
Now, I could say:
$ git switch --detach 5a02fede3007edf55d18e2f9ee3e57979535e8f2

and that would work, but the rule is that you must specific at least 4 unique digits of the ID, so I could
have also done this:
$ git switch --detach 5a02

for the same result.
And that result is:
HEAD is now at 5a02fed

Let’s take a look around with git log:
commit 5a02fede3007edf55d18e2f9ee3e57979535e8f2 (HEAD)

That’s all! Just one commit?! Where’s the second commit I made? Is it gone forever?!
No. Everything is fine. [Soothing image of a kitten sleeping in the sun.]
When you have HEAD at a certain commit, you’re looking at the world as it looked at that snapshot in time.
Future commits haven’t “happened” yet from this perspective. They are still out there, but you’ll have to
change back to them by name. (It’s like a flippin’ time machine!)

Chapter 4. The Git Log and HEAD

Also, do you see anything different about that first line that reads (HEAD)? That’s right: no main to be
seen.
That’s because the main branch is still looking at the latest commit, the one with the “More output” comment. So we don’t see it from this perspective.
Furthermore, this means that HEAD is no longer attached to main. We call this state detached head. And
git switch doesn’t let you do that unless you mean it, which is why we have that --detach in there.
(And reattaching is easy: just switch to the branch you want to attach to.)
Remember earlier when I said it was a bit of a lie to say that HEAD points to a commit? Well,
detached head state is the case where it actually does. Detached head state is just what happens
when HEAD is pointing to a commit instead of a branch. To reattach it, you have to change it to
point to a branch again.
Let’s reattach HEAD to the main branch. There are two options:
1. git switch -: this switches to wherever we were before this, which, in this case, was main.
2. git switch main: this explicitly switches to main.
Let’s try:
Previous HEAD position was 5a02fed Added

Notice there was no --detach in that git switch! We’re reattaching the head, not detaching it, so we
don’t have to tell Git we know what we’re doing.
Don’t worry if you forget the --detach. Git will tell you if you need it.
$ git switch 5a02
fatal: a branch is expected, got commit '5a02'
hint: If you want to detach HEAD at the commit, try again with
the --detach option.

And now if we git log, we see all our changes again:
commit 5a02fede3007edf55d18e2f9ee3e57979535e8f2

and our working tree will be updated to show the files as they are in the main commit.
And you see the HEAD -> main? The arrow means HEAD is reattached to main. (If HEAD were detached at
the same commit as main, you’d see HEAD, main.)

### 4.5 The Old Command: git checkout
In ye olden days before git switch existed, there was a command to do all that stuff called git checkout.
git checkout did a lot of things, and it still does. Because it does so much, the maintainers of Git have
been trying to break some of that functionality into git switch and other commands.

### 4.6 Commits Relative to HEAD

There are still times when you need to use checkout, but if your version of Git supports switch,
this isn’t one of them. Use switch if you can and skip this section.
But let’s redo the previous section by using just git checkout instead of git switch. Let’s try:
$ git checkout 5a02

and it says:
Note: switching to '5a02fede3007edf55d18e2f9ee3e57979535e8f2'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:
git switch -c <new-branch-name>
Or undo this operation with:
git switch Turn off this advice by setting config variable advice.detachedHead to false
HEAD is now at 5a02fed Added

Well, that’s a lot of scary stuff, but it’s just Git telling us that we’re now in detached head state. Which of
course we are since we just detached the head from branch main by switching to a specific commit hash.
And we can get back to the main branch with:
$ git checkout main

You can also switch back with the aforementioned git switch variants, but we’re pretending those don’t
exist for this section.

### 4.6 Commits Relative to HEAD
There are a couple shortcuts to get to commits that are earlier than HEAD, like, “I want to switch to the 3rd
commit before this one.”
Here’s a pretty useless example that we’ll start with:
$ git switch --detach HEAD

This moves HEAD to where HEAD was. That is, it moves it nowhere. (Though it does have the effect of
detaching it from the branch.)
But what if I wanted to move to the commit right before where HEAD is now? You can do it with caret
notation like this:
$ git switch --detach HEAD^

And that gets you to the previous commit.

Chapter 4. The Git Log and HEAD

It’s apparently a little-known Fun Fact™ that you can commonly enter @ instead of HEAD
with these commands. For example, the previous command could be written:
$ git switch --detach HEAD^
$ git switch --detach @^

Be aware that some shells might require you to put the @ in quotes to get it to work right. But that
can potentially save three keystrokes.
What if you wanted to get to the third-previous commit? You can add more carets!
$ git switch --detach HEAD^^^

Or the 10th previous commit!
$ git switch --detach HEAD^^^^^^^^^^

Or the 100th previous commit!
$ git switch --detach HEAD^^^^^^^^^^^^^^^^^^^^forget this

Typing all these carets is wearing me out. Luckily there’s another shorthand we have at our disposal with
tilde notation. The two following lines are equivalent:
$ git switch --detach HEAD^^^
$ git switch --detach HEAD~3

After the tilde, you can just give the number of commits back you want to go. So back to my example:
$ git switch --detach HEAD~100

All this said, personally I usually just look at the log and go to a specific commit instead of counting back.
“But that’s just, like, my opinion, man.”
—The Dude

Chapter 5

Branches and Fast-Forward Merges
5.1 What is a Branch?
Normally you think of writing code as a linear sequence of changes. You start with an empty file, add
some things, test them, add some more, test some more, and eventually the code is complete.

Figure 5.1: A simple commit graph.
In Git we might think of this as a sequence of commits. Let’s look at a graph (Figure 5.1) where I’ve
numbered commits 1-5. There, (1) was the first commit we made on the repo, (2) is some changes we
made on top of (1), and (3) is some changes we made on top of (2), etc.
Git always keeps track of the parent commit for any particular commit, e.g. it knows the parent commit of
(3) is (2) in the above graph. In this graph, the parent relationship is indicated by an arrow. “The parent

of commit 3 is commit 2”, etc. It’s a little confusing because clearly commit 3 came after commit 2 in
terms of time, but the arrow points to the parent, which is the opposite of the nodes’ temporal relationship.
A branch is like a name tag stuck on one specific commit. You can move the name tag around with various
Git operations.
We’re assuming the default branch is called main. If you haven’t done so already, configure your default
branch as shown in the Git Basics chapter.

Figure 5.2: The main branch on a commit.
So to make it a little more complete, we can show that branch in Figure 5.2. There’s our main branch
attached to the commit labeled (5).
It’s tempting to think of the whole sequence of commits as “the branch”, but this author
recommends against it. Better to keep in mind that the branch is just a name tag for a single
commit, and that we can move that name tag around.
But Git offers something more powerful, allowing you (or collaborators) to pursue multiple branches
simultaneously.
So there might be multiple collaborators working on the project at the same time.

Figure 5.3: Lots of branches.
And then, when you’re ready, you can merge those branches back together. In Figure 5.4, we’ve merged
commit 6 and 7 into a new commit, commit 9. Commit 9 contains the changes of both commits 7 and 6.

Figure 5.4: After merging somebranch and anotherbranch.
In that case, somebranch and anotherbranch both point to the same commit. There’s no problem with
this.
I’m actually oversimplifying this a little. When you merge a branch into another, really only
the branch you’re merging into moves, not both of them. So to get the two branches to point
to the same commit, you’d have to do two merges: somebranch into anotherbranch and then
anotherbranch into somebranch. (Or the other way around.) And then they’d point to the same
commit.
And then we can keep merging if we want, until all the branches are pointing at the same commit (Figure
5.5).

Figure 5.5: After merging all branches.
And maybe after all this we decide to delete somebranch and anotherbranch; we can do this safely
because they’re fully merged, and can do this without affecting main or any commits (Figure 5.6).

### 5.2 A Quick Note about git pull

Figure 5.6: After deleting merged branches.
This chapter is all about getting good with branching and partially good with merging.
If you like interactive tutorials, Peter Cottle has put together a great website called Learn Git Branching1 .
I highly recommend it before, during, and/or after reading this chapter.

### 5.2 A Quick Note about git pull
When you do a pull, it actually does two things: (a) fetch all the changes from the remote repo and (b)
merge those changes.
If two or more people are committing to the same branch, eventually git pull is going to have to merge.
And it turns out there are a few ways it can do this.
For now, we’re going to tell git pull to always classically merge divergent branches, and you can do
that with this one-time command:
$ git config set --global pull.rebase false

If you don’t do that, Git will pop up an error message complaining about it the first time it has to merge on
a pull. And you’ll have to do it then. (Leave the word set out of that command if it fails on older Gits.)
When we talk about rebasing later, this will make more sense.

5.3

HEAD and Branches

We said earlier that HEAD refers to a specific commit, namely the commit you’re looking at right now in
your unmodified working tree.
And we also said that was a bit of a lie.
In normal usage, HEAD points to a branch, not to a commit. Only in detached head state does HEAD point
directly to a commit (i.e. when it’s detached from all branches).
If we look at Figure 5.7, we see HEAD is pointing to a branch as per normal.

Figure 5.7: HEAD pointing to a branch.
But if we check out an earlier commit that doesn’t have a branch, we end up in detached head state, and
it looks like Figure 5.8.

https://learngitbranching.js.org/

Figure 5.8: HEAD pointing to a commit.

So far, we’ve been making commits on the main branch without really even thinking about branching.
Recalling that the main branch is just a label for a specific commit, how does the main branch know to
“follow” our HEAD from commit to commit?
It does it like this: the branch that HEAD points to follows the current commit. That is, when you make a
commit, the branch HEAD points to moves along to that next commit.
If we were here back at Figure 5.7, when HEAD was pointing to the main branch, we could make one more
commit and get us to Figure 5.9.

Figure 5.9: HEAD moving with a branch.
Contrast that to detached head state, back in Figure 5.8. If we were there, a new commit would get us to
Figure 5.10, leaving main alone.

Figure 5.10: A commit with detached HEAD.
At this point, there’s nothing stopping you from creating a new branch at the same commit as HEAD, if
you want to do that. Or maybe you are just messing around and decide to switch back to main later,
abandoning the commits you’ve made in detached HEAD state.
Now that we have the abstract theory stuff laid out, let’s talk specifics.

### 5.4 Listing All Your Branches
Before we start, let’s see how to list branches.
$ git branch
- main

This is telling you there’s one branch, and you have it checked out (the * lets you know that).
If I make a new branch called foobranch and switch to that, I’ll see this:

### 5.5 Creating a Branch

% git branch
- foobranch

If I then detach the HEAD, I end up here:
% git branch
- (HEAD detached at 10b6242)
foobranch

But you can always see what branch you’re on with git branch or git status.

### 5.5 Creating a Branch
When you make the first commit to a new repo, the main branch is automatically created for you at that
commit.
But what about new branches we want to make?
Why make a branch? A common case is that you want to work on your own commits without
impacting the work of others. (In this case you’re really just putting off the work until you merge
your branch with theirs, but it’s a good workflow.)
Another case is that you want to mess around with some changes but you’re not sure if they’ll work.
If they end up not working, you can just delete the branch. If they do work, you can merge your
changes back into the non-messing-around branch.
The most common way to make new branches is this:
1. Switch to the commit or branch from which you want to make the new branch.
2. Make the new branch there and switch HEAD to point to the new branch.
Let’s try it. Let’s branch off main.
You might already have main checked out (i.e. HEAD points to main), but let’s do it again to be safe, and
then we’ll create a branch with git switch:
$ git switch -c newbranch

Normally you can just switch to another branch (i.e. have HEAD point to that branch) with
git switch branchname. But if the branch doesn’t exist, you need to use the -c switch to create
the branch before switching to it.
Make sure all your local changes are committed before switching branches! If you
git status it should say “working tree clean” before you switch. Later we’ll learn about another
option when we talk about stashing.
So after checking out main, we have Figure 5.11.

Figure 5.11: HEAD pointing to main.
And then with git switch -c newbranch, we create and switch to newbranch, and that gets us to Figure
5.12.

Figure 5.12: HEAD pointing to newbranch.

That’s not super exciting, since we’re still looking at the same commit, but let’s see what happens when
we make some new commits on this new branch.
The branches we’re making here exist only on your local clone; they’re not automagically
propagated back to wherever you cloned the repo from.
The upshot is that if you accidentally (or deliberately) delete your local repo, when you git clone
again, all your local branches will be gone (along with any commits that aren’t part of main or any
other branches pushed to the server).
There is a way to set up that connection where your local branches are uploaded when you push,
called remote-tracking branches. main is connected to a remote tracking branch (usually called
origin/main) which is why git push from main works while git push from newbranch, which
is not by default connected to a remote tracking branch, gives an error. But we’ll talk about all this
later.

### 5.6 Make Some Commits on a Branch
This is not really that different than what we were doing with our commits before. Before we made a
branch, we had HEAD pointing to branch main, and we were making commits on main.
Now we have HEAD pointing to newbranch and our commits will go there, instead.
Right after creating newbranch, we had the situation in Figure 5.12. Now let’s edit something in the
working tree and make a new commit. With that, we’ll have the scenario in Figure 5.13.

Figure 5.13: Adding a new commit to newbranch.
Right? Let’s make another commit and get to Figure 5.14.
We can see that newbranch and main are pointing at different commits.
If we wanted to see the state of the repo from main’s perspective, what would we have to do?
We’d have to git switch main to look at that branch.
Now for another question. Let’s say we’ve decided that we’re happy with the changes on newbranch,
and we want to merge them into the code in the main branch. How would we do that?

### 5.7 Merging: Fast-Forward

Figure 5.14: Adding another commit to newbranch.

### 5.7 Merging: Fast-Forward
Bringing two branches back into sync is called merging.
The branch you’re on is the branch you’re bringing other changes into. That is, if you’re on Branch A, and
you tell git to “merge Branch B”, Branch B’s changes will be applied onto Branch A. (Branch B remains
unchanged in this scenario.)
But in this section we’re going to be talking about a specific kind of merge: the fast-forward. This occurs
when the branch you’re merging from is a direct descendant of the branch you’re merging into.
Let’s say we have newbranch checked out, like from the previous example in Figure 5.14.
I decide I want to merge main’s changes into newbranch, so (again, with newbranch currently checked
out):
$ git merge main
Already up to date.

Nothing happened? What’s that mean? Well, if we look at the commit graph, above, all of main’s changes
are already in newbranch, since newbranch is a direct ancestor.
Git is saying, “Hey, you already have all the commits up to main in your branch, so there’s nothing for
me to do.”
But let’s reverse it. Let’s check out main and then merge newbranch into it.

Now we’ve moved HEAD to track main, as shown in Figure 5.15.

Figure 5.15: Checking out main again.
And newbranch is not a direct ancestor of main (it’s a descendant). So newbranch’s changes are not yet
in main.
So let’s merge them in and see what happens (your output may vary depending on what files are included
in the merge):

$ git merge newbranch
Updating 087a53d..cef68a8
Fast-forward
foo.py | 4 +++1 file changed, 3 insertions(+), 1 deletion(-)

And now we’re at Figure 5.16.

Figure 5.16: After merging newbranch into main.
Wait a second—didn’t we say to merge newbranch into main, like take those changes and fold them into
the main branch? Why did main move, then?
We did say that! But let’s stop and think about how this can happen in the special case where the branch
you’re merging into is a direct ancestor of the branch you’re merging from.
It used to be that main didn’t have commits (5) or (6) in the graph, above. But newbranch has already
done the work of adding (5) and (6)!
The easiest way to get those commits “into” main is to simply fast-forward main up to newbranch’s
commit!
Again, this only works when the branch you’re merging into is a direct ancestor of the branch you’re
merging from.
That said, you certainly can merge branches that are not directly related like that, e.g. branches that share
a common ancestor but have both since diverged.
Git will automatically fast-forward if it can. Otherwise it does a “real” merge. And while fast-forward
merges can never lead to merge conflicts, regular merges certainly can.
But that’s another story well get into in the Merging and Conflicts chapter.

### 5.8 Deleting a Branch
If you’re done merging your branch, it’s easy to delete it. Importantly, this doesn’t delete any commits;
it just deletes the branch “label” so you can’t use it any longer. You can still use all the commits.
Let’s say we’ve finished the work on our topic1 branch and we want to merge it into main. No problem:
$ git commit -m "finished with topic1"
$ git merge topic1

At this point, assuming a completed merge, we can delete the topic1 branch:
$ git branch -d topic1
Deleted branch topic1 (was 3be2ad2).

Done!

### 5.8 Deleting a Branch

A topic branch is what we call a local branch made for a single topic like a feature, bug fix,
etc. In this guide I’ll name branches literally topic to indicate that it’s just an arbitrary branch. But
in real life you’d name the topic branch after what it is you’re doing, like bugfix37, newfeature,
experiment, etc.
But what if you were working on a branch and wanted to abandon it before you merge it into something?
For that, we have the more imperative Capital D option, which means, “I really mean it. Delete this
unmerged branch!”
$ git branch -D topic1

Use lowercase -d unless you have reason to do otherwise. It’ll at least tell you if you’re about to lose your
reference to your unmerged commits, and then you can override with -D if you really want to.

Chapter 6

Merging and Conflicts
We’ve seen how a fast-forward merge can bring to branches into sync with no possibility of conflict.
But what if we can’t fast-forward because two branches are not direct ancestors? In other words, what if
the branches have diverged? What if a change in one branch conflicts with a change in the other?

### 6.1 An Example of Divergent Branches
Let’s look at a commit graph where things are still OK to fast-forward in Figure 6.1.

Figure 6.1: A direct ancestor branch.
Yes, I’ve bent the graph a bit there, but we can merge somebranch into main as a fast-forward because
main is a direct ancestor and somebranch is therefore a direct descendant.
But what if, before we merged, someone made another commit on the main branch? And now it looks
like it does in Figure 6.2.

Figure 6.2: Not a direct ancestor branch.
There’s a common ancestor at commit (2), but there’s no direct line of descent. main and somebranch
have diverged.
Is all hope lost? How can we merge?

Chapter 6. Merging and Conflicts

### 6.2 Merging Divergent Branches
Turns out you do it the exact same way as always.
1. Check out the branch you want to merge into.
2. git merge the branch you want to merge from.
In our Figure 6.2 example above, let’s say we’ve done this:
$ git merge somebranch

The # is a shell comment delimiter. You can paste that in if you want, but it does nothing.
The difference here is that Git can’t simply fast-forward. It has to somehow, magically, bring together the
changes from commit (6) and commit (7) even if they’re radically different than one other.
This means that after we bring those two commits together, the code will look like it’s never looked before,
a combination of two sets of changes.
And because it looks like it hasn’t before, we need another commit (another snapshot of the working tree)
to represent the joining of both sets of changes.
We call this the merge commit, and Git will automatically make it for you. (When this happens, you’ll see
an editor pop up with some text in it. This text is the commit message. Edit it (or just accept it as-is) and
save the file and exit the editor. See Getting Out of Editors if you need help with this.)
So after our merge, we end up with Figure 6.3.

Figure 6.3: Creating a merge commit.
Commit labeled (8) is the merge commit. It contains both the changes from (7) and (6). And has the
commit message you saved in the editor.
And we see main has been updated to point to it. And that somebranch is unaffected.
Importantly, we see that commit (8) has two parents, the commits that were merged together to make it.
And look! If we want, we can now fast-forward somebranch to main because it’s now a direct ancestor!
In this example, Git was able to determine how to do the merge automatically. But there are some cases
where it cannot, and this results in a merge conflict that requires manual intervention. By you.

### 6.3 Merge Conflicts
If two branches have changes that are “far apart” from one another, Git can figure it out. If I edit line
20 of a file in one branch, and you edit line 3490 of the same file in another, Git can bring both edits in
automatically.
But let’s say I edit line 20 in one commit, and you edit line 20 (the same line) in another commit.

### 6.4 What a Conflict Looks Like

Which one is “right”? Git has no idea because it’s just dumb software and doesn’t know our business
needs.
So it asks us, during the merge, to fix it. After we fix it, Git can complete the merge.
When you’re merging, if a conflict occurs, you’re still merging. Git is in the “merge” state,
waiting for more merge-specific commands.
You can resolve the conflict then commit the changes to complete the merge. Or you can back out
of the merge making as if you’d never started it in the first place.
The important point is that you’re aware Git is in a special state and you have to either complete
or abort the merge to get back to normal before you continue to use it.
Let’s have an example where both main and newbranch have added a line to end of file, i.e. they both
added line 4. Git doesn’t know which one is correct, so there’s a conflict.
$ git merge newbranch
Auto-merging foo.py
CONFLICT (content): Merge conflict in foo.py
Automatic merge failed; fix conflicts and then commit the result.

Now if I look at my status, I see we’re in merge state, as noted by You have unmerged paths. We’re in
the middle of merge; we have to either go out the front or back out the back to get back to normal.
You have unmerged paths.
(fix conflicts and run "git commit")
(use "git merge --abort" to abort the merge)
foo.py

It’s also hinting that I can do one of two things:
1. Fix conflicts and run git commit.
