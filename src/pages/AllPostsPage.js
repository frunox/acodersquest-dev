import React from 'react';
import HomeNav from '../components/HomeNav';
import AllPosts from '../components/AllPosts';
import Footer from '../components/Footer';

function AllPostsPage() {
  return (
    <>
      <section>
        <HomeNav />
        <main>
          <AllPosts />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default AllPostsPage;
