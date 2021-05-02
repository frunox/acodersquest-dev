import React from 'react';
import HomeNav from '../components/HomeNav';
import About from '../components/About';
import Footer from '../components/Footer';
import '../components/components.css';

function AboutPage() {
  return (
    <>
      <section>
        <HomeNav />
        <main>
          <About />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default AboutPage;
