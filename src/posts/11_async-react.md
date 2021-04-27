---
postUid: postUid11
postId: 11
title: Asynchronicity - Getting React to Behave
slug: acq-async-getting-react-to-behave
date: April 26, 2021
author: john@acodersquest.com
summary: Asynchronous operations in React have been a stumbling block for me. I overcame this one, with a warning..
keywords: react hooks useeffect async asynchronous
filename: 11_TW-setting-opacity.md
imageUrl: []
imageName: []
---

![nonconformist]()

Getting code to run in the right order is a recurring problem for me. Executing reads and writes to databases, along with calls to external APIs, are the primary causes. Even changing state in React can be problematic. I ran into a problem with retrieving all the posts from Firestore that was resulting in a specific error that took some time to diagnose and fix.

The stored posts are retrieved in the App component, the root of the blog app. Originally, this is how I code the call to Firestore:

```js
useEffect(() => {
  const postsRef = firestore.collection('metadata');
  postsRef.get().then((snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    posts.sort((a, b) => b.postId - a.postId);
    savePosts(posts);
  });
}, []);
```

I used the React hook `useEffect`, which should be used for any 'side effect', like a database operation. The Firestore `.get()` method, with no arguments, gets all the documents in the specific collection (`metadata` in my case). Firestore responds with a _QuerySnapshot_, an object containing all the data. Using the JavaScript `.map()` method on the snapshot creates an array with each document, an object containing the metadata and content for a single post, as an element. I re-order the elements using `.sort()` so they are arranged from newest to oldest, which is how they are displayed in the app. Then they are saved to a React context using the `savePosts()` method.

## The Problem

With the array stored in context, it's accessible by any component that needs to render a list of posts, like on the Home or Posts pages (pretty important in a blog app!). However, there was a problem with when a post was selected. The individual post was displayed as expected, but, if the page was refreshed, or the post was accessed via a link, an error occurred saying that "postArray.title is not defined", or something similar. In these cases, the array of posts was empty.

The issue is that the operation to retrieve the posts is asynchronous. It takes time to reach out to Firestore and have it return the results of a query. Meanwhile, JavaScript keeps on executing. The result is that React tries to render the page before Firestore responds and the array of posts is created and stored in context, so the array is in it's initial state, which is empty. Since the title of the post is the first property from the array that is rendered, that's where the error was thrown.

![dolphins jumping in sync]()

## The Solution (for Now)

There are a couple of ways to handle asynchronous operations in JavaScript, like using `.then().catch`. I chose `async await`. If you want to learn more about this topic, here are a few links: [MDN Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts), [Traversy Media](https://www.youtube.com/watch?v=PoRJizFvM7s), [MDN Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).

I created an `async` function inside of `useEffect()`:

```js
useEffect(() => {
  const getPosts = async () => {
    const postsRef = firestore.collection('metadata');
    await postsRef.get().then((snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      posts.sort((a, b) => b.postId - a.postId);
      savePosts(posts);
      console.log('App: in useEffect, posts.length', posts.length);
    });
    setIsLoading(false);
  };
  getPosts();
}, [isLoading]);
```

The `getPosts` function inside of `useEffect()` is defined as `async`, and `await` is used on the Firestore `.get()` method, which is the asynchronous operation. Now, the array is populated when an individual post page is refreshed or accessed via a link.

![warning sign]()

## The Warning That Won't Die

When running either the development or production versions of the code, React throws a warning: _React Hook useEffect has a missing dependency: 'savePosts'. Either include it or remove the dependency array..._. In the original code, I used an empty array as the `useEffect()` dependency. If I put `savePosts` in the array as suggested, it creates an infinite loop. If I remove the dependency array, the result is also a loop.

In the updated code, `isLoading` is added to the dependency array, which makes sense to me. But, the warning is still issued. And if `savePosts` is added to the array, it loops like before.

Using `useEffect()` can be tricky. I looked at several sources for possible solutions, including [Reactjs docs](https://reactjs.org/docs/hooks-effect.html), [dmitripavlutin](https://dmitripavlutin.com/react-useeffect-explanation/) and [Web Dev Simplified](https://www.youtube.com/watch?v=0ZJgIjIuY7U). Since React is just issuing a warning, I can let this go. But I keep coming back to it and trying to find a solution. If you have any ideas, let me know.
