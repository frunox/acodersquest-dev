---
postUid: postUid5
postId: 5
title: Bye-Bye, Bootstrap, et al.
slug: acq-bye-bye-bootstrap
date: April 8, 2021
author: lonesome-coder
summary: The simplest approach to styling seems to be good old CSS...
keywords: CSS bootstrap grid flexbox
filename: 05_bye-bootstrap.md
imageUrl: []
imageName: []
---

![obscure css]()

Bootstrap is one of the first tools I learned to use at boot camp. It seemed easy at first. There were lots of styling options. But, when I wanted to customize the look, I ran into trouble. Modifying the default styling meant wading through some complex class selectors which often wouldn't accept new values. There was a lot of hit-and-miss regarding applying my own styling.

I moved on to Semantic-UI and Semantic-UI-React, which are simpler, but there were still issues. They aren't as well documented, and are more limited. And customizing the look was still problematic.

> _"Be yourself. Everyone else is already taken."_
>
> Oscar Wilde

## Back to CSS

If I spent more time with any of the CSS tools, I would likely learn to overcome the issues I have with them. The approach I took was to abandon them and learn how to style using plain CSS.

CSS is wordier, but at least I understand what the words mean. I can pretty much achieve whatever I want this way. Of course, this has forced me to learn at lot more about CSS, which is a good thing, since that knowledge can help you even if you are using one of the CSS tools.

![CSS grid]()

## Grid and Flexbox

Two important CSS concepts to learn are grid and flexbox. Both are used to position HTML elements on screen. Grid is used to define the layout of columns and rows (it's 2-dimensional), and flexbox is used to align elements with a row or column (it's 1-dimensional). Two YouTube videos I watched to learn about grid are from [Web Dev Simplified](https://www.youtube.com/watch?v=9zBsdzdE4sM&t=245s) and [FreeCodeCamp](https://www.youtube.com/watch?v=t6CBKf8K_Ac). Both these sources have good videos on flexbox, too: [Web Dev Simplified](https://www.youtube.com/watch?v=fYq5PXgSsbE&t=23s), [FreeCodeCamp](https://www.youtube.com/watch?v=-Wlt8NRtOpo&t=589s).

There are lots of good sources for learning about CSS. Along with the two cited above, check out [Kevin Powell](https://www.youtube.com/channel/UCJZv4d5rbIKd4QHMPkcABCw). His entire focus is on CSS and front end design.

Don't be put off by any "Grid versus Flexbox" videos or articles. These are not two competing concepts, but are complementary, and are frequently used together. It is very common to layout a grid and to use flexbox to position elements in grid cells.

## CSS Variables

Another concept I'm trying to incorporate into my projects are CSS variables, also known as custom properties. They allow you to set a particular property, like background color, as a variable. If that property with that value is used in many places in your CSS, you set them all to the variable name. That way, if you need to change the value in all the places where it is used, you only change the value of the variable. It's similar to using variables in JavaScript. Get a better explanation at [blob.hubspot.com](https://blog.hubspot.com/website/css-variables), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), or this first of a series of videos by [Kevin Powell](https://www.youtube.com/watch?v=PHO6TBq_auI).

The values of CSS variables can even be [changed in JavaScript](https://www.youtube.com/watch?v=cZ0yt67A7OM), something I haven't tried yet.

## CSS Preprocessors

CSS preprocessors, like SASS and LESS, compile CSS into a single file. They also 'extend' the functionality of CSS. In fact, one of the primary reasons they are used is to implement CSS variables. But, since CSS variables are now available in base CSS, there may be less need to use one.

I don't intend to learn one of these now. I have more than enough to ingest trying to master CSS, so I don't have an opinion on them. There are supporters and detractors. I'll end with this [link](https://medium.com/codex/less-sass-scss-are-junk-too-bda0541251c2) to an article by someone who really, really doesn't like CSS preprocessors.
