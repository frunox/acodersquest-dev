import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../../contexts/PostContext';
import '../components.css';

function PostList() {
  const postArray = usePosts();

  let array = [...postArray];
  if (array.length > 3) {
    array.splice(3);
  }

  return (
    <div className="postlist">
      {array.length &&
        array.map((post, i) => {
          return (
            <div className="post-card" key={post.postId}>
              <Link className="post-link" to={`/post/${post.slug}`}>
                <h2 className="post-title">{post.title}</h2>
                <small>Published on {post.date}</small>
                <hr></hr>
                <ReactMarkdown className="post-card-summary">
                  {post.summary}
                </ReactMarkdown>
              </Link>
              <small className="click">Click to read more...</small>
            </div>
          );
        })}
    </div>
  );
}

export default PostList;
