---
postUid: postUid12
postId: 12
title: Building the Blog - Updating Text in Posts
slug: acq-updating-text-posts
date: April 25, 2021
author: john@acodersquest.com
summary: I can process new posts, and update them, too.  But what if I want to update changes in the text...
keywords: markdown firebase
filename: 12_BB-update-post-text
imageUrl: []
imageName: []
---

![computer screen updating]()

In previous posts, I discussed processing Markdown files to create the posts seen in the blog. It's a process that takes several steps, including separating the metadata, storing images and their URLs, and finally storing the entire post object with all the related information. But what if you just want to make some edits to the text or metadata, without changing or adding images? I created a way to do that in one step.

## Updating Edits the Easy Way

On the Admin page, where I have the inputs and buttons to process posts (which you won't see on the web page), there is a section _Update Post w/Text Revisions_ on the lower left:

![admin page]()

It has another file picker, and a _Update Post Text_ button. The file picker works as discussed [here](https://acodersquest.com/post/acq-building-the-blog-more-on-markdown), executing the `selectedFileHandler()`.

The button executes `updatePostTextHandler()`:

```js
const updatePostTextHandler = () => {
  setMessage('');
  setPostContent('');
  // separate the metadata from the content of the revised post
  const { metadata, content } = parseMD(markdownFile);
  // save the postUid - it will be used to store the post to Firestore
  const uid = metadata.postUid;
  // create an array of lines of the entire post
  const newPostContent = markdownFile.split('\n');
  // remove the lines of metadata, leaving just the content
  newPostContent.splice(0, 12);
  // save the postId, to identify it in the array of posts
  let index = metadata.postId;
  // find the actual index of the post in the array, since the array was sorted
  index = postArray.findIndex((el) => el.postId === index);
  // find the index of each line with a Markdown image element
  let imageIndex = [];
  for (let i = 0; i < newPostContent.length; i++) {
    if (newPostContent[i][0] === '!') {
      imageIndex.push(i);
    }
  }
  // replace the Markdown image elements with elements including the image URL
  for (let i = 0; i < imageIndex.length; i++) {
    let newLine = newPostContent[imageIndex[i]].replace(
      ')',
      postArray[index].imageUrl[i] + ')'
    );
    newPostContent[imageIndex[i]] = newLine;
  }
  // insert the imageName and imageUrl arrays into the metadata
  metadata.imageName = postArray[index].imageName;
  metadata.imageUrl = postArray[index].imageUrl;

  // create the post object to be stored
  const postObject = metadata;
  let contentString = newPostContent.join('\n');
  postObject.content = contentString;
  const storageRef = db.collection('metadata');
  // store the post object to Firestore using 'uid' to replace the original
  storageRef
    .doc(uid)
    .set(postObject)
    .catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
  // store the post title and date so they render in the preview
  setMData({
    ...mData,
    title: metadata.title,
    date: metadata.date,
  });
  // store the new post content so it renders in the preview
  setPostContent(contentString);
  setMessage('New post saved/updated.');
};
```

I added comments in the code to help explain each step. `selectedFileHandler()` stores the entire post in `markdownFile` as a string. `parse-md` splits the lines with the metadata into `metadata`, which is an object. The entire file is included in `content` as a string.

After the metadata is stripped from `markdownFile` and stored in `newPostContent`, the next steps locate the original post in the array of posts `postArray`, which was created when the app is loaded and stored in context. Remember, `postArray` was sorted in descending order based on the `postId`, so the correct index has to be determined to access the correct post in the array.

Next, `newPostContent` (an array with each line in the post as an element) is iterated to find the index of each line that needs an image URL. Then, `newPostContent` is iterated again to replace the appropriate lines with image URLs. Then the image names and URLs need to be copied from the metadata in the original post into the metadata of the new post. These two properties are defined as empty arrays in the post file, so they need to be re-populated.

Once those steps are complete, `postObject` is created by copying in the new metadata and appending the content. Then it is stored back into Firestore using the `uid` so the original document is over-written. From there it is brought back into the `postArray` the next time the app is refreshed.

> _I probably spend 90% of my time revising what I've written._
>
> Joyce Carol Oates

## So Why Didn't I Think of This the First Time?

I coded this out a few days ago. When I looked at the code as I prepared this post, I realized there was a better way. Originally, I grabbed the `postUid` from the metadata of the revised post, then retrieved that document from Firestore. What I realized was that I already had the original post stored in `postArray`, so I used that instead. It means one less database operation, which is asynchronous, so now the code should run faster. Coming back for a second look is a good way to find opportunities to clean up and refactor your code.

Speaking of refactoring, the Admin page consist of one component with all the code for processing posts. With the JSX, imports, state definitions, etc., it's at 275 lines. If you read the earlier post linked at the top, you will see some duplication. At some point, I'll need to refactor this component because now it is probably hard for anyone else to digest.
