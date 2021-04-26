---
postUid: postUid9
postId: 9
title: Building the Blog - More on Markdown
slug: acq-building-the-blog-more-on-markdown
date: April 22, 2021
author: lonesome-coder
summary: I found a better way to process Markdown files, including inserting image links...
keywords: markdown parse-md react-markdown firestore
filename: 09_CB-building-the-blog-md2.md
imageUrl: []
imageName: []
---

![chain links]()

I had one of those days where the code flowed steadily. The goal was to improve how the Markdown files are processed and saved. In particular, I wanted to create a way to insert the URLs for any image files into the Markdown.

Previously, the URLs were being saved into each Firestore document and I was copy/pasting them into the Markdown files. Realizing that I was already converting each file into an array of strings to `splice()` the lines of metadata out of the content, I thought there was a way to work with the array to insert each image URL in the correct location.

## Reorganizing How Images are Imported and the URLs Stored

I had to re-think the steps needed to select a file, parse, save and strip out the metadata, and select and save the images and their URLs. Now, the steps are:

1. Select a Markdown file and separate the metadata.
2. Determine how many images are to be included in each post, and on what lines they are inserted.
3. Store the each to Cloud Storage, get the URl, and save it(them) into the metadata (and save the image names, too)
4. Insert the URLs into the appropriate location in the content
5. Store the modified metadata, along with the content, to Firestore

This is what the JSX in the Admin component now looks like:

```js
return (
  <>
    <div className="admin-content">
      <h2 className="admin-title">Admin Page</h2>
      <hr></hr>
      <div className="admin-grid">
        <div className="col-1">
          <p className="admin-column-title">Full Post Processing Sequence</p>
          <div>
            <h3>1) Select Markdown File to Parse:</h3>
            <input type="file" onChange={selectedFileHandler} />
            <button onClick={parseHandler}>
              Parse Metadata and Preview File
            </button>
          </div>

          <div>
            <h3>
              2) Select Image File {imageCount} of {numberOfImages} to Add:
            </h3>
            <input type="file" onChange={selectedImageHandler} />
            <button onClick={imageStorageHandler}>Save Image File</button>
          </div>

          <div>
            <h3>3) Add Image Link(s) to Post:</h3>
            <button onClick={addLinksHandler}>Add Link(s) and Preview</button>
          </div>

          <div>
            <h3>4) Store Post to Firestore:</h3>
            <button onClick={postStoreHandler}>Store/Update Post</button>
          </div>
          <hr />

          <div>
            <p className="admin-column-title">Update Post w/ Text Revisions</p>
            <h3>Select Post w/ Revisions:</h3>
            <input type="file" onChange={selectedFileHandler} />
            <button onClick={updatePostTextHandler}>Update Post Text</button>
          </div>
          <hr />
          {message && <h3>Message: {message}</h3>}
        </div>

        <div className="col-2">
          <p className="admin-column-title">Preview</p>
          <div className="post-content">
            {postContent && (
              <div className="post-content">
                <h1>{mData.title}</h1>
                <small>Published on {mData.date}</small>
                <hr />
                <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
                  {postContent}
                </ReactMarkdown>
                <p>
                  Send comments or suggestions for future posts to{' '}
                  <span> </span>
                  <a href="mailto:john@acodersquest.com">
                    john@acodersquest.com
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);
```

The page is now formatted as a grid with two columns. One has all the inputs and buttons to execute the steps (`className="col-1"`), and the other is a preview pane (`"className="col-2"`), as shown here:

![acodersquest admin page]()

Let's got through each step.

## Select and Parse the Metadata File

First, an input tag of type `file` is used to select the file. The file is read in via the `selectedFileHandler()`:

```js
const selectedFileHandler = (event) => {
  setMessage('');
  console.log('selectedFileHandler: ', event.target.files[0].name);
  let rawFile = event.target.files[0];
  let reader = new FileReader();
  reader.readAsText(rawFile);
  reader.onload = function () {
    let file = reader.result;
    // console.log('text: ', text)
    setMarkdownFile(file);
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
};
```

The JavaScript class `FileReader` is used to read the file as text and store it in `rawFile`, which is stored in the state variable `markdownFile'.

The _"Parse Metadata and Preview"_ button executes `parseHandler`:

```js
const parseHandler = () => {
  // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
  const { metadata, content } = parseMD(markdownFile);
  setMData(metadata);
  // remove metadata from .md file
  // split the post file into an array of lines
  const linesArray = content.split('\n');
  linesArray.splice(0, 12);
  let imageIndex = [];
  for (let i = 0; i < linesArray.length; i++) {
    if (linesArray[i][0] === '!') {
      imageIndex.push(i);
    }
  }
  if (imageIndex.length > 0) {
    setImageCount(1);
    setNumberOfImages(imageIndex.length);
  }
  setImageIndices(imageIndex);
  let contentString = linesArray.join('\n');
  setPostContent(contentString);
};
```

Again, the package _parse-md_ is used to grab the lines at the top of the file between lines of `---` and puts them into a metadata object. I changed the metadata format to be:

```js
---
postUid: postUid4
postId: 4
title: Title of the Post
date: April 22, 2021
author: the-author
summary: Another catchy summary...
keywords: markdown parse-md react-markdown firestore
filename: filename.md
imageUrl: []
imageName: []
---
```

The `imageUrl` and `imageName` fields were added as empty arrays. These will be populated later.

The metadata is stored in `mData` as an object, but the content, a string which still includes the lines of metadata, still needs work.

Next, `linesArray`, an array of strings in which every element is one line of the Markdown file, is created from the `content` using `.split('\n')`, then the metadata is removed with `linesArray.splice(0, 12)`.

Now, the `imageIndex` array is initialized. I iterate through `linesArray` to find the index of each line that starts with an exclamation point. The Markdown format for image links is `![alt text](image-url)`, so this is how the lines that have the links are located and those indexes are pushed to `imageIndex`. What I write in the Markdown file is `![alt text]()`. The image URL is inserted later.

I set variables to show which image is to be selected (such as _"Select Image 1 of 2"_), and also save `imageIndex`, and finally `linesArray` is converted back into a string and stored in `postContent`, which now renders in the preview pane, minus the images.

Now the page looks like:

![acodersquest admin first preview]()

The file, minus the images, is previewed. The Markdown image element just displays the _alt text_.

## Selecting the Images and Storing the URLs

The images are selected and stored first because this is when it's easiest to get the URLs. This is a due to how Cloud Storage works.

The image file picker runs `selectedImageHandler`:

```js
const selectedImageHandler = (event) => {
  setMessage('');
  let rawFile = event.target.files[0];
  setImageFile(rawFile);
};
```

This simply grabs the image file and saves it to `imageFile`.

The _Save Image File_ button executes `addLinksHandler()`:

```js
const imageStorageHandler = async (event) => {
  setMessage('');
  let bucketName = 'images';
  let selectedImage = imageFile;
  let urls = urlsArray;
  let names = imageName;
  names.push(selectedImage.name);
  setImageName(names);
  let storageRef = app.storage().ref(`${bucketName}/${selectedImage.name}`);
  await storageRef.put(selectedImage).catch((err) => {
    console.log(err);
    setMessage('Firebase save post error. ' + err);
  });
  // get the URL for the file stored
  const imageFileUrl = await storageRef.getDownloadURL();
  urls.push(imageFileUrl);
  setUrlsArray(urls);
  setMData({ ...mData, imageUrl: urls, imageName: names });
  if (imageCount < numberOfImages) {
    setImageCount((prevImageCount) => prevImageCount + 1);
  }
  setMessage('Image File ' + imageCount + ' saved');
};
```

Cloud Storage stores files in 'buckets', so `bucketName` identifies the bucket I'm using. `selectedImage` is the image file. `urls` is an array of image URLs, if any, and `name` is an array of any image file names. The name of the image file is pushed to `names` and set to a state variable `imageName`.

Now comes the setup to store the image file. Firebase wants a `ref`, which which service is being used. Here, `add.storage()` refers to Cloud Storage, with the bucket and file names provided as arguments. THen, the `.put()` method is used to store the file. It overwrites an existing file of the same name so there are no duplicates.

Next, the `.getDownloadURL()` method is used to get the URL, which is saved in `imageFileUrl` and pushed to the `urls` array and saved into another state variable. Then the metadata stored in state (`mData`) is updated with the arrays of image URLs and file names.

## Add the Image URLs to the Post

The _Add Links and Preview_ button executes `addLinksHandler()`:

```js
const addLinksHandler = () => {
  let linesArray = postContent.split('\n');
  for (let i = 0; i < imageIndices.length; i++) {
    let newLine = linesArray[imageIndices[i]].replace(')', urlsArray[i] + ')');
    linesArray[imageIndices[i]] = newLine;
  }
  let contentString = linesArray.join('\n');
  setPostContent(contentString);
};
```

Here, a new `linesArray`, not including the metadata, is `.split('\n')` from `postContent`. The array of lines of text is iterated to find the line for each image in the post using it's index, and a `newline` is created using `.replace()`, inserting the appropriate URL.

When this is done, the preview updates to include any images:

![preview-with-image]()

## Save the Post to Firestore

The _Store/Update Post_ button executes `postStoreHandler()`:

```js
const postStoreHandler = () => {
  setMessage('');
  // console.log('postStoreHandler mData', mData);
  const postObject = mData;
  postObject.content = postContent;
  const storageRef = db.collection('metadata');
  // console.log('storageRef', storageRef)
  storageRef
    .doc(postObject.postUid)
    .set(postObject)
    .catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
  setMessage('New post saved/updated.');
  setMData('');
  setMarkdownFile('');
  setUrlsArray([]);
  setImageIndices([]);
  setImageCount(0);
  setNumberOfImages(0);
};
```

A `postObject` is created to hold the current metadata, and then the content, including the image URLs, is appended. A `storageRef` with the Firestore collection name is set, and the `.doc()` method with my custom document ID is run, then the `.set()` method stores the entire post object to that ID. After that, many of the state variable are re-initialized to be ready to process another post.

## Summary

Re-factoring the process of turning Markdown files into posts seemed daunting at first, but I'm happy how it turned. I'm sure the code can still be improved - maybe I'll try that later.

Now I can add images to the posts without copying and pasting the URLs, which is a nice improvement.

You can see a another section on the lower left of the Admin page called _Update Post w/Text Revisions_. This will update an existing post if there are just revisions to the text, without going through the whole process described here. I'll explain it in, well, another post!
