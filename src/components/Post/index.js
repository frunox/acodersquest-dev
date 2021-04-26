import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { usePosts } from '../../contexts/PostContext';

import HomeNav from '../HomeNav';
import '../postContent.css';

function Post(props) {
  // const [isLoading, setIsLoading] = useState(true);
  const postArray = usePosts();
  console.log('Post: postArray', postArray);
  // const postIndex = postArray.length

  // let slug = parseInt(props.match.params.id);
  let slug = props.match.params.id;
  console.log('Post slug', slug, typeof slug);

  // if (Object.is(NaN, id)) {
  //   console.log('Post redirect');
  //   return <Redirect to="/404" />;
  // }

  // let arrayLength = [];
  // while (postArray.length === 0) {
  //   let arrayLength = postArray.length;
  //   console.log('In while', arrayLength);
  //   if (arrayLength) {
  // setIsLoading(false);
  //     break;
  //   }
  // }
  // return <Redirect to="/all-posts" />;

  function findPostId(element) {
    return element.slug === slug;
  }
  let id = postArray.findIndex(findPostId);
  console.log('POST id after sort: ', id);
  // const maxValidId = postArray[0].postId;
  // console.log('maxValidId', maxValidId);

  // let postRef = app.storage().ref.child('markdown')

  return (
    <React.Fragment>
      <HomeNav />
      {/* {isLoading && 'Loading...'} */}(
      <div className="post-content">
        <h1>{postArray[id].title}</h1>
        {/* <h3>Author: {postArray[id].author}</h3> */}
        <small>Published on {postArray[id].date}</small>
        {/* <hr /> */}
        <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
          {postArray[id].content}
        </ReactMarkdown>
        <p>
          Send comments or suggestions for future posts to <span> </span>
          <a href="mailto:john@acodersquest.com">john@acodersquest.com</a>
        </p>
      </div>
      )
    </React.Fragment>
  );
}

export default Post;
