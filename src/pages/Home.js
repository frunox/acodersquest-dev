import React from 'react';
import HomeNav from '../components/HomeNav';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <section>
        <HomeNav />
        <main>
          <HomePage />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default Home;
