---
postUid: postUid7
postId: 7
title: Time Waster - Copies and Clones, Oh, My!
slug: acq-time-waster-copies-clones
date: April 10, 2021
author: lonesome-coder
summary: Did you forget to clone your array?  I did, and spent hours trying to fix a bug that propagated in unexpected ways...
keywords: javascript clone deep-copy
filename: 07_TW-copies-and-clones.md
imageUrl: []
imageName: []
---

This is the first of a (unfortunately, pretty lengthy) series of posts about Time Wasters: problems that usually seem complex but often have simple solutions. Solutions that I should know but mostly just forgot.

![clone troopers]()

## Copying an Array - Good Intentions/Bad Consequences

Early in development of this blog, I stored the metadata for the posts in Firestore. In the home page, I only want to render the 3 most recent posts. On the Posts page, I want to render all the posts. The home page uses a component that downloads the metadata for all the posts, which is in the form of an array of objects. The array is sorted in descending order (so the most recent post is rendered first) and is saved both to a state variable in the component, and to a context variable for access by the Posts page.

The component for the home page checks the length of the array (called 'posts') and uses the splice() method to remove all but the latest three posts.

```js
if (posts.length > 3) {
  posts.splice(3);
}
```

Wonderful! Now, if there are more than three posts, only the most recent three are shown on the home page. But, this changed the array saved in state, too, with the totally unexpected consequence that it changed the array that was stored in context, so only three posts rendered on the Posts page.

My 'aha' moment arrived. Copy the posts array, and splice the copy!. That way, the original array won't be affected. Hence:

```js
let array = posts;
```

The result? Nothing changed. The problem still showed up on the Posts page. My solution? Review all my code, re-write some of it, review how context works, refactor the context file, grind my teeth, etc., etc, rinse and repeat. Problem fixed? Nope.

> _"You can't make experimental work by copying past work"_
>
> Trey Parker

## Send in the Clones

Somewhere in my research, buried in a StackOverflow post, was the word 'clone'. It took a while for it to sink in that this might be the solution. So I Googled array cloning and there was the answer. Only 1 line of code needed to be changed.

```js
let array = [...posts];
```

Now three posts are rendered on the home page, and all the posts are rendered on the Posts page.

What I had forgotten was that arrays (which are objects) are different from primitive data types. Primitives (numbers, strings, booleans, etc.) have a name and a value. When copied, the new name is associated with it's own value, which is equal to the value of the original primitive. But, when the value of the copy is changed, the value of the original remains unchanged.

Objects (which includes arrays, sets, maps, dates, etc.) are 'structural' types. Unlike primitives, whose forms are built into JavaScript, we define the forms of objects we declare. The each have a name, but that name is associated with references (memory addresses) where the values are stored. When you copy an object using the assignment operator (=), a new name is created, but the references are the same as for the original object. When you change a value in either the original or the copy, the new value is reflected in both, since they both point to the same memory addresses.

To create an entirely new object, with new references, you have to 'clone' the original. Then, changes in the value in the original or the copy are only reflected in that object, not both.

There are several ways to clone an object. There are both 'deep' and 'shallow' methods. Let's have an expert explain this better than I can
[here](https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089).

## Boy, Did I Get Lucky

So, was using the spread operator the solution? Well, yes, but only because I'm lucky. I cloned 'posts' using a shallow copy method, which created new references for the elements of the array. But, it didn't create new references for the objects in the array. Fortunately for me, I won't be editing those objects, so a shallow copy works. Good practice would be to use a deep copy method.
