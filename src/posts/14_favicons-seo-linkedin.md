---
postUid: postUid14
postId: 14
title: Favicons, SEO and How Your Site Looks on LinkedIn
slug: acq-favicons-seo-linkedin
date: April 29, 2021
author: john@acodersquest.com
summary: When I announced my blog on LinkedIn, it didn't look so good.  I needed to learn about favicons and SEO...
keywords: react blog seo favicon linkedin
filename: 14_favicons-seo-linkedin.md
imageUrl: []
imageName: []
---

When I created the post on LinkedIn to announce my blog, LinkedIn creates a preview with the site name, a bit of text, and an image (at least if you've set up your project properly). My preview didn't have an image, and the text shown beneath the title was "Web site created using create-react-app". In other words, it didn't look professional. I was able to find a [resource](https://kinsta.com/blog/linkedin-debugger/) that helped me improve the look. I also realized I needed a 'favicon' to individualize my site.

## What's a Favicon

When you start a new React project and run it, you'll see in the browser tab a blue icon that looks like this:

![create react app icon]()

This is the React logo. Every web site you view will show an icon in the browser tab next to the title. These are 'favicons', short for favorite icons. Favicons are small images used in various ways in browsers, as explained [here](https://www.seoptimer.com/blog/what-is-a-favicon/). They are also useful for search engine optimization (SEO). Note that the favicon file holds several versions of the logo at different resolutions.

Look in the _/public_ folder of a React app, and you'll see a file _favicon.ico_, which has several icon images in different resolutions, in Microsoft Windows icon format. The icon seen in the browser tab comes from this file.

## Create Your Own Favicon

First, you need to create a logo. There are many ways to do this using various photo editing apps, or you can have someone design and make one for you. I created mine using [GIMP](https://www.gimp.org), a free image creation and editing app. GIMP can save images to the _.ico_ format, which many low end apps can't, so I was able to [create](http://thenewcode.com/467/Creating-Multi-Resolution-Favicons-For-Web-Pages-With-GIMP) the favicon file myself.

Fortunately, there are simpler ways to create a favicon file. I tried [icoconverter.com](https://www.icoconverter.com) and it worked well. Just upload your high-resolution image, select the favicon resolutions you want (selecting all of them is OK), and use a bit depth of 32 bits. It creates a _favicon.ico_ for you to download. Just replace the React default favicon file with your new one in the _/public_ folder.

## Improving the Look in LinkedIn

Adding a favicon using my logo made the blog look better in the browser, but it didn't improve the look of the LinkedIn preview. There are a few more steps to take.

LinkedIn, and other sites like Facebook, use the [Open Graph protocol](https://ogp.me/) to display a preview of a web link. This works by using `<meta>` tags in the `index.html` file in a React app (or any `.html` file, for that matter). This blog [post](https://ahrefs.com/blog/open-graph-meta-tags/) explains how Open Graph is used and what it means for SEO.

The default `index.html` file in a React app includes this `<meta>` tags:

```html
<meta name="description" content="Web site created using create-react-app" />
```

This is what my LinkedIn preview was showing. To optimize the tag for inclusion on social media, I changed the tag to:

```html
<meta
  name="description"
  property="og:description"
  content="A blog by an aspiring coder about obstacles and lessons learned.  Topics include JavaScript, CSS, React, Markdown, Firebase, databases, cloud storage and more."
/>
```

After that change, the _content_ in the tag was shown on the preview. Note the `property="og:description"` attribute. This is how the Open Graph protocol is implemented, using `property="og:type"` syntax.

## Adding an Image to a Preview

My preview still lacked an image. I added a new tag:

```html
<meta
  name="image"
  property="og:image"
  content="https://i.ibb.co/r04HX4G/logo-800x800.png"
/>
```

Now my logo appeared in the preview.

## Other Open Graph Properties to Use

The linked article also suggests these properties by added:

```html
<meta
  name="title"
  property="og:title"
  content="A Coder's Quest - A Blog for Aspiring Coders"
/>
<meta property="og:type" content="website" />
```

LinkedIn looks for ('scrapes') for these Open Graph tags as explained [here](https://kinsta.com/blog/linkedin-debugger/):

- Title (og:title): The title of the page, blog post, or video.
- Type (og:type): The type of content, whether it’s an article, video, or rich media.
- Image (og:image): The preview thumbnail to show for the post in link previews.
- Description (og:description): The summary of the page, article, or video.
- Author (author): Regular meta tag for specifying the author of a post.

Only the title and image information is shown in the preview, however.

Don't remove the `<title>' tag in `index.html`. That is still used in the browser tab.

## Checking How Your LinkedIn Preview Will Look

LinkedIn has a tool, the [Post Inspector](https://www.linkedin.com/post-inspector/) that will show what the link preview will look like. It will also show which Open Graph properties is can and can't find, so you can add what you need.

## What Does This Have to Do with SEO?

Adding Open Graph properties to `<meta>` tags is one method of optimizing a web site for SEO. Google looks for these tags as it _scapes_ web sites to find information to include in searches. I am just starting to learn about SEO, so I'll refer you to [this](https://ahrefs.com/blog/seo-expert/) for more information.
