import React from 'react';
// import HomeNav from '../components/HomeNav'
import HomeNav from '../components/HomeNav';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

// import Background from '../components/Background'
// import Dashboard from '../components/Dashboard'
// import Signup from '../components/Signup'
// import Login from '../components/Login'

function Home() {
  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)

  return (
    <div>
      <HomeNav />
      <HomePage />
      <Footer />
    </div>
  );
}

export default Home;
