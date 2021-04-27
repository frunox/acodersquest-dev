import React, { useState } from 'react';
import app from '../../../firebase';
import ReactMarkdown from 'react-markdown';
import './Admin.css';
import '../../postContent.css';
const parseMD = require('parse-md').default;

const db = app.firestore();

function Admin() {
  const [mData, setMData] = useState('');
  const [markdownFile, setMarkdownFile] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('');
  const [imageName, setImageName] = useState([]);
  const [urlsArray, setUrlsArray] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [numberOfImages, setNumberOfImages] = useState(0);

  const selectedFileHandler = (event) => {
    setMessage('');
    setPostContent('');
    setImageName([]);
    setUrlsArray([]);
    console.log('selectedFileHandler: ', event.target.files[0].name);
    let rawFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(rawFile);
    reader.onload = function () {
      let file = reader.result;
      setMarkdownFile(file);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const selectedImageHandler = (event) => {
    setMessage('');

    let rawFile = event.target.files[0];
    setImageFile(rawFile);
  };

  const parseHandler = () => {
    // use parse-md to capture the metadata in the 'metadata' variable and content in the 'content' variable
    const { metadata, content } = parseMD(markdownFile);
    setMData(metadata);
    setPostContent(content);
    // remove metadata from .md file
    // split the post file into an array of lines
    const linesArray = markdownFile.split('\n');
    linesArray.splice(0, 12);
    let imageIndex = [];
    for (let i = 0; i < linesArray.length; i++) {
      if (linesArray[i][0] === '!') {
        imageIndex.push(i);
      }
    }
    console.log('imageIndex array', imageIndex);
    if (imageIndex.length > 0) {
      setImageCount(1);
      setNumberOfImages(imageIndex.length);
    }
    setImageIndices(imageIndex);
    let contentString = linesArray.join('\n');
    setPostContent(contentString);
  };

  const imageStorageHandler = async (event) => {
    setMessage('');
    let bucketName = 'images';
    let selectedImage = imageFile;
    let urls = urlsArray;
    let names = imageName;
    console.log('urls:', urlsArray, 'names:', imageName);
    names.push(selectedImage.name);
    console.log('imageStorageHandler names', names, typeof names);
    setImageName(names);
    let storageRef = app.storage().ref(`${bucketName}/${selectedImage.name}`);
    await storageRef.put(selectedImage).catch((err) => {
      console.log(err);
      setMessage('Firebase save post error. ' + err);
    });
    // get the URL for the file stored
    const imageFileUrl = await storageRef.getDownloadURL();
    urls.push(imageFileUrl);
    console.log('urls after push:', urls);
    setUrlsArray(urls);
    console.log('Image URL: ', imageFileUrl);
    setMData({ ...mData, imageUrl: urls, imageName: names });
    if (imageCount < numberOfImages) {
      setImageCount((prevImageCount) => prevImageCount + 1);
    }
    setMessage('Image File ' + imageCount + ' saved');
  };

  const addLinksHandler = () => {
    console.log('updatePostHandler mData', mData);
    let linesArray = postContent.split('\n');
    for (let i = 0; i < imageIndices.length; i++) {
      let newLine = linesArray[imageIndices[i]].replace(
        ')',
        urlsArray[i] + ')'
      );
      linesArray[imageIndices[i]] = newLine;
    }
    let contentString = linesArray.join('\n');
    setPostContent(contentString);
  };

  const postStoreHandler = () => {
    setMessage('');
    const postObject = mData;
    postObject.content = postContent;
    const storageRef = db.collection('metadata');
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

  const updatePostTextHandler = async () => {
    setMessage('');
    setPostContent('');
    const { metadata, content } = parseMD(markdownFile);
    console.log('metadata postUid: ', metadata.postUid);
    let docUid = metadata.postUid;
    let docRef = db.collection('metadata').doc(docUid);
    let urls = '';
    await docRef
      .get()
      .then((doc) => {
        console.log('Document from Firestore', doc.data());
        urls = doc.data().imageUrl;
      })
      .catch((error) => {
        console.log('No document exists');
        setMessage('Firebase .get() failed for document ' + metadata.postUid);
      });
    console.log('Original image urls: ', urls);
    const contentLinesArray = content.split('\n');
    let imageIndex = [];
    for (let i = 0; i < contentLinesArray.length; i++) {
      if (contentLinesArray[i][0] === '!') {
        imageIndex.push(i);
      }
    }
    console.log('imageIndex: ', imageIndex);
    for (let i = 0; i < imageIndex.length; i++) {
      let newLine = contentLinesArray[imageIndex[i]].replace(
        ')',
        urls[i] + ')'
      );
      contentLinesArray[imageIndex[i]] = newLine;
    }
    let contentString = contentLinesArray.join('\n');
    metadata.content = contentString;
    const storageRef = db.collection('metadata');
    storageRef
      .doc(metadata.postUid)
      .set(metadata)
      .catch((err) => {
        console.log(err);
        setMessage('Firebase save post error. ' + err);
      });
    setMessage(metadata.postUid + ' text updated.');
    setPostContent(contentString);
  };

  return (
    <>
      <div className="admin-content">
        <h2 className="admin-title">Admin Page</h2>
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
              <p className="admin-column-title">
                Update Post w/ Text Revisions
              </p>
              <h3>Select Post w/ Revisions:</h3>
              <input type="file" onChange={selectedFileHandler} />
              <button onClick={updatePostTextHandler}>Update Post Text</button>
            </div>
            <hr />
            {message && <h3>Message: {message}</h3>}
          </div>

          <div className="col-2">
            <p className="admin-column-title">Preview</p>
            <div>
              {postContent && (
                <div className="admin-post-content">
                  <h1>{mData.title}</h1>
                  <small>Published on {mData.date}</small>
                  {/* <hr /> */}
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
}

export default Admin;
