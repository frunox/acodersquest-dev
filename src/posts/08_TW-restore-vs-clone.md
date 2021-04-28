---
postUid: postUid8
postId: 8
title: Time Waster - Restoring vs. Cloning (Clones Again?)
slug: acq-time-waster-restoring-cloning
date: April 19, 2021
author: lonesome-coder
summary: Restoring files to a new Windows computer? Consider Windows complications, case sensitivity and cloning...
keywords: javascript clone deep-copy
filename: 08_TW-restore-vs-clones.md
imageUrl: []
imageName: []
---

Restoration work can be a long and painstaking process. But restoring files to a new computer? That should be easy! What could go wrong? Well, I found out.

![restoring a classic car]()

## Restoring to a New Computer is Not So Easy

I recently bought a new Windows 10 laptop. It's a big improvement over the old one, so that's good news. I made a backup from the old laptop, using the Windows File History backup process, on an external drive. So, just plug the drive into the new laptop, run 'Restore', and all's well, right?

No. Not even close. I don't know why I looked this up before restoring (since it should have been simple), but it turns out the process for restoring files to a new computer is tricky. If you try to restore to a different computer, Windows doesn't recognize the existing backup, so it runs a backup from the new computer, and 'restores' from it. You lose the ability to access the backup from the old computer after that, so you are out of luck.

It's a rather complicated process to allow the new computer to access the old backup. See [this](https://www.techrepublic.com/article/how-to-correctly-use-file-history-to-transfer-data-files-to-a-new-windows-10-installation/) from TechRepublic for the procedure to do this. There are likely other ways to do it, but this worked for me.

## So Now My Code Runs, Right?

After writing all the files to the new laptop, all I need to do is install a few things, like Nodejs, nodemon, Firebase, etc., and my code will run just as before. Well, no. I got an error that a file name didn't match what was asked for in an import statement. I fixed the name of one file, and I got another error about a folder name. Every time I fixed a name, another error popped up.

All the errors were related to the capitalization of the first letter of file and folder names. For example, this blog app starts with an _'App.js'_ file. However, the restored version of the file on my new laptop was _'app.js'_. I noticed that some of the names of the files for my components where all lower case, where the names of the original files where all capitalized. When it comes to file and folder names, Windows is case-insensitive. _'App.js'_ and _'app.js'_ are the same. But, this is not the case for React. If you `import App from '../App'`, and the name of the file is not capitalized, an error is thrown and the app won't compile.

Changing all the file and folder names is tedious and unnecessary. There's a better way.

![dna strands]()

## Time to Clone

The best way to faithfully reproduce your code on a new computer is to use `git clone`. All the file and folder names are as originally written.

Another consideration regarding case sensitivity is when working with a group, and some members use Apple or Linux computers. Those operating systems are case-sensitive. Windows 10 can now set case-sensitivity at the folder level, so code sharing will be easier. The process is described in the link above.

Just one more thing to waste time on. I seem to be very good at this.
