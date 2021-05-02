import React from 'react';
import { usePosts } from '../contexts/PostContext';
import HomeNav from '../components/HomeNav';
import Post from '../components/Post';
import Footer from '../components/Footer';

function PostPage(props) {
  const postArray = usePosts();
  console.log('latest post id', postArray);
  console.log(props.match.params.id);
  return (
    <>
      <section>
        <HomeNav />
        <main>
          <Post />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default PostPage;
