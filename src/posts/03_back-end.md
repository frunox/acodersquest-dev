---
postUid: postUid3
postId: 3
title: Building the Blog - Back End
slug: acq-building-the-blog-back-end
date: April 8, 2021
author: lonesome-coder
summary: How did I decide what back end to use
keywords: firebase firestore cloud storage
filename: 03_back-end.md
imageUrl: []
imageName: []
---

![back end as a service]()

In considering how to create this blog project, I stuck with familiar for the front end: Reactjs, JavaScript, and a few additional packages.

For the back end, I wanted mostly to simplify my life. I went with a Backend-as-a-Service (BAAS), a cloud provider. I had dabbled in Amazon Web Services (AWS), but I found it too complex. There is a good reason that AWS is the biggest BAAS provider: Their services are comprehensive, and they have great infrastructure. But for a small application like this, there seemed to be more setup than necessary.

> _“The role of genius is not to complicate the simple, but to simplify the complicated.”_
>
> Criss Jami, Killosophy

I went with Google's Firebase because getting started is simple. You don't have to deal with any hardware setup. Just create a project, select an authentication method and the database. Cloud storage is available by default. In other words, I let the geniuses take the complicated process of setting up the server, database and storage, and make it simple for me!

You need a gmail account to use Firebase. Start [here](https://firebase.google.com/) to sign up. The docs are [here](https://firebase.google.com/docs). Check the conditions for using the [free tier](https://firebase.google.com/pricing/).

I won't walk you through the process of creating a project - there are plenty of resources available for that, including videos provided by [Google](https://www.youtube.com/user/Firebase) and [Fireship](https://www.youtube.com/watch?v=q5J5ho7YUhA&t=0s). Using a BAAS can simplify your development process.
