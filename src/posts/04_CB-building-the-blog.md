---
postUid: postUid4
postId: 4
title: Building the Blog - Working with Markdown
slug: acq-building-the-blog-working-with-markdown
date: April 13, 2021
author: lonesome-coder
summary: Let's look at the code to see how Markdown files are processed and rendered...
keywords: markdown parse-md react-markdown firestore
filename: 04_CB-building-the-blog.md
imageUrl: []
imageName: []
---

![javascript code]()

In an earlier post, I discussed why use Markdown to create the posts, how to include metadata, and tools to parse the metadata and render the content to the browser.

Now, let's look at the code to see how I take the Markdown files and work with them.

## Loading a Markdown File in React

First, add `<input type='file' onChange={metadataFileSelectedHandler} />` in the JSX to render a file picker.

React prevents the use the Nodejs filesystem. But, you can read files using the JavaScript [FileReader](https://www.w3docs.com/learn-javascript/file-and-filereader.html) class. I use hooks and functional components, so this is the setup:

```js
function Admin() {
  const [mData, setMData] = useState('')
  const [markdownFile, setMarkdownFile] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postUids, setPostUids] = useState([])
  const [message, setMessage] = useState("")

  const selectedFileHandler = async (event) => {
    let rawFile = (event.target.files[0])
    let reader = new FileReader()
    reader.readAsText(rawFile)
    reader.onload = await function () {
      let file = reader.result
      setMarkdownFile(file)
    };
    reader.onerror = await function () {
      console.log(reader.error);
    };
  }
```

The variable `rawFile` stores the selected file. A new `reader` object is created, and the `FileReader` method `readAsText` reads in the file as a string. The `onload` method calls `reader.result` which loads the string into `file`, which is copied into the state variable `markdownFile`. This holds the entire \*.md file, including the metadata.

## Parsing the Metadata

Separating the metadata from the markdown file is simple. I created a button in the JSX that triggers `parseHandler`:

```js
const parseHandler = async () => {
  const { metadata, content } = parseMD(markdownFile);
  setMData(metadata);
  setPostContent(content);
  const linesArray = markdownFile.split('\n');
  linesArray.splice(0, 10);
  let contentString = linesArray.join('\n');
  setPostContent(contentString);
  postUids.push(metadata.postUid);
  setPostUids(postUids);
};
```

`parse-md` takes the entire file and creates two variables: `metadata`, which is an object holding only the metadata (minus the two lines with `---`), and `content`, which is a string of the entire file, including the lines of metadata.

If the entire file is rendered now, the metadata will be shown. To remove it, the file is converted to an array `linesArray` with each element being one line using `.split('\n')`. Then the first 10 lines (the metadata and the `---` lines) are removed using `.splice(0, 10)`. The remaining text, the actual content, is saved to `postContent`, which is what gets rendered.

## Storing the Posts

The posts are stored in Firestore. Firestore is a NoSQL database, similar to MongDB, that stores data in a JSON-like format. Prior to storing, the metadata and content are combined into an object. I have a button that runs `postStoreHandler()`:

```js
const postStoreHandler = () => {
  setMessage('');
  const postObject = mData;
  postObject.content = postContent;
  const storageRef = app.firestore().collection('metadata');
  storageRef
    .doc(postObject.postUid)
    .set(postObject)
    .catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
  setMessage('New post saved/updated.');
};
```

The metadata is assign to `postObject`, and the content is add as another field. All the data is in string format.

Now the `postUid` in the metadata comes into play. By default, Firestore assigns a random `uid` to each document (or record). It allows you to create your own `uid`, however, as long as it is unique. Using a custom `uid` makes it easier to identify each post in the Firestore dashboard, and, more importantly, allows Firebase update existing posts.

Firestore uses a `ref` to point to the collection and document being manipulated. The `postUid` is applied in the `.doc()` method. The data object is stored using the `.set()`method. If no custom`uid`is assigned, or if theres is no existing document with that `uid`, a new document is created. If a document with the `uid` exists, then it is updated, so if I revise a post, I don't end up with duplicate documents.

## Retrieving the Posts

This is done in the _App_ component using _useEffect()_ to limit the number of calls to Firestore.

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

The Firestore `.get()` method returns a _QuerySnapshot_ object, which contains a _DocumentSnapshot_ for each document returned. The `.map()` method is used to create an array of objects, each of which contains the object with the metadata and content for that post.

The, the array of posts is sorted in descending order using the `postId`, a numeric value included in the metadata. This way, the posts are rendered starting with the most recent.

I created a context (_PostContext_) and store the sorted posts array there using `savePosts(posts)`. Now, the array can be accessed from any component. I used it for the Home and Posts pages.

> _“One child, one teacher, one book, one pen can change the world.”_
>
> Malala Yousafzai

## How to Render Markdown in React

Now, the posts are stored and ready to be to shown to the world. But, it's all just strings at this point. How is it rendered by React?

The _react-markdown_ package handles converting the content to JSX for rendering. Import it like this:

```js
import ReactMarkdown from 'react-markdown';
```

This creates a custom component that wraps the Markdown content.

First, the array of posts is grabbed from _PostContext_. There are different ways to configure contexts, so the particular code I use to retrieve the array may not look familiar. Maybe this is a topic for another post (filled with links to videos to show how it's done).

Anyway, I call the array `postArray` now. It is then rendered out using `.map()` like any array to create a list. This is the code from the AllPosts page, which shows every post:

```js
postArray.map((post, i) => {
  return (
    <div className="post-card" key={post.postId}>
      <Link className="post-link" to={`/post/${post.postId}`}>
        <h2 className="post-title">{post.title}</h2>
        <small>Published on {post.date}</small>
        <hr></hr>
        <ReactMarkdown className="post-card-summary">
          {post.summary}
        </ReactMarkdown>
        <small className="click">Click to read more...</small>
      </Link>
    </div>
  );
});
```

Note how the `<ReactMarkdown>` component is used to wrap the summary, which can include Markdown.

On the page that shows the content, the `<ReactMarkdown>` component is used like this:

```js
<ReactMarkdown linkTarget={'_blank_'}>{postArray[id].content}</ReactMarkdown>
```

The `linkTarget` prop inserts the `target="_blank_"` attribute into any _<a>_ tags to open links in a new tab, which is a preference of mine.

So that's how it's done. I simplified the code a little here, since I do some processing of the `postArray` in different components. See the code on [GitHub](https://github.com/frunox/The-Lonesome-Coder).
