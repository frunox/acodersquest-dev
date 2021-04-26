import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../../contexts/PostContext';
import '../components.css';

function AllPosts() {
  const [state, setState] = useState();
  const [renderArray, setRenderArray] = useState([]);
  let postArray = usePosts();

  let searchArray = [];

  useEffect(() => {
    setRenderArray(postArray);
  }, [postArray]);
  console.log('AllPosts: postArray', postArray);

  const handleChange = (e) => {
    e.preventDefault();
    // const { name, value } = e.target;
    // console.log('handleChange', name, value);
    localStorage.setItem('searchString', e.target.value);
    setState({ searchbox: e.target.value });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    searchArray = [];
    console.log('in searchHandler', state);
    let searchString = localStorage.getItem('searchString');
    console.log('searchString', searchString);
    for (let i = 0; i < postArray.length; i++) {
      // console.log('in loop')
      if (
        postArray[i].keywords
          .toLowerCase()
          .includes(searchString.toLowerCase()) |
        postArray[i].title.toLowerCase().includes(searchString.toLowerCase())
      ) {
        searchArray.push(postArray[i]);
        console.log(
          postArray[i].keywords.toLowerCase(),
          searchString.toLowerCase()
        );
      }
    }
    console.log('AllPosts searchArray: ', searchArray);
    setRenderArray(searchArray);
  };

  return (
    <div className="content">
      <form className="allposts-search" onSubmit={(e) => searchHandler(e)}>
        <label className="allposts-search-label" htmlFor="searchbox">
          Enter Keyword/Title:{' '}
        </label>
        <input
          className="allposts-searchbox"
          type="text"
          placeholder="keyword"
          name="searchbox"
          autoFocus
          onChange={handleChange}
        ></input>
      </form>
      <form className="allposts-keyword-row" onClick={(e) => searchHandler(e)}>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="react"
          onClick={handleChange}
        >
          react
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="css"
          onClick={handleChange}
        >
          CSS
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="firebase"
          onClick={handleChange}
        >
          Firebase
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="firestore"
          onClick={handleChange}
        >
          Firestore
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="javascript"
          onClick={handleChange}
        >
          JavaScript
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="building"
          onClick={handleChange}
        >
          Building-the-Blog
        </button>
        <button
          className="allposts-keyword"
          type="text"
          name="searchbox"
          value="waster"
          onClick={handleChange}
        >
          Time-Waster
        </button>
      </form>
      {renderArray.length > 0 ? (
        renderArray.map((post, i) => {
          return (
            <div className="post-card" key={post.postId}>
              <Link className="post-link" to={`/post/${post.slug}`}>
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
        })
      ) : (
        <h3 className="allposts-message">No results found</h3>
      )}
    </div>
  );
}

export default AllPosts;
