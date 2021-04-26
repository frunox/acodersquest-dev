---
postUid: postUid6
postId: 6
title: Commit to Commit
slug: acq-commit-to-commit
date: April 12, 2021
author: lonesome-coder
summary: Ever get on a roll, when an error arises, and you find yourself undoing working code. You need to commit to commit...
keywords: CSS
filename: 06_commit-to-commit.md
imageUrl: []
imageName: []
---

I've done this too many times. I'm coding along, everything is working. I write, save, check the browser. All good. Until it isn't.

![commit early and often]()

## Commit to Small Bites

Usually, when an error occurs, the message is helpful enough to make the solution easy. Sometimes, the solution is far more elusive. I undo, redo, and refactor until I don't remember where I was when the error popped up.

The solution of last resort is to `git stash` to revert the code back to the last commit. This works, but if it's been a long enough time, there might be a lot of working code to re-write.

So remember to commit often. And create branches so if things really go wrong, you can dump the branch and return to your working code.
