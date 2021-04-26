---
postUid: postUid10
postId: 10
title: Time Waster - Setting Opacity
slug: acq-time-waster-setting-opacity
date: April 23, 2021
author: john@acodersquest.com
summary: Everyone knows how to set opacity, right? Leave it to me to find a new, problematic way...
keywords: css opacity waster
filename: 10_TW-setting-opacity.md
imageUrl: []
imageName: []
---

The big day had come. Time to deploy my blog to my domain. The app wasn't perfect (and never will be), but it was good enough to show the world. Of course it would look just like it does when I run it locally. After setting up the hosting on Firebase, I excitedly went to [www.acodersquest.com](www.acodersquest.com)and this is what I saw:

![acodersquest home page]()

No links on the navigation bar! What the ???????

I did a lot of poking around using DevTools to check the styling, but it showed that the text should be black. How could the links show up on the local version, but not on the deployed version? I couldn't figure it out. I posted a question on StackOverflow, but didn't get any responses right away. I kept digging, and, knowing that I had set the opacity for the drop-down shade for the links at mobile screen sizes, I started messing with those settings. It took a number of looks, but I found the problem. I still don't understand how the setting worked locally, however.

## Setting Opacity the Right Way

Setting the opacity is simple enough. Any reference you look at will tell you to set it as a decimal between 0 and 1, 0 being fully transparent, and 1 being fully opaque. Common usages in CSS are:

```js
  opacity: 0.85;
  background-color: rgba(100,100,100, 0.85)
```

If you look at the website on your phone, the links collapse into a hamburger (3 horizontal lines), and if you click on it, a blue, slightly transparent, shade drops down, showing the links. I added the transparency for no reason other than I thought it looked good that way. BTW, the shade wasn't visible on the originally deployed site, either.

![woman seen though window]()

## So How Did I Screw This Up?

I finally noticed that I had set the opacity for the navigation bar links like this:

```js
  opacity: 85%;
```

There was no reason why, I just did it. But it didn't seem to make any difference since the transparency was visible when running the code on localhost. I didn't know there was a problem until a created a build and deployed it via Firestore.

When I inspected the original version on the web, the transparency for the links was set to `opacity: 1%;`. How or why, I do not know, but that's why the links and the shade couldn't be seen. When I set the opacity correctly, like any normal person would, and re-deployed the code, the links and the shade appeared correctly on the website. It only took a couple hours and a blood pressure spike to diagnose the problem.

## Moral of the Story

The moral of the story is "John, don't be such a blithering idiot". And, have someone else look at your code whenever possible. Anything to keep you from falling into a syntax rabbit-hole.

I hope you enjoyed this time-waster. I didn't, but maybe it will be of use to you.
