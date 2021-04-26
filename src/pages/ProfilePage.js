import React from 'react';
// import HomeNav from '../components/HomeNav'
import HomeNav from '../components/HomeNav';
import Profile from '../components/auth/Profile/Profile';
// import Background from '../components/Background'
// import Dashboard from '../components/Dashboard'
// import Signup from '../components/Signup'
// import Login from '../components/Login'

function ProfilePage() {
  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)

  return (
    <div>
      <HomeNav />
      {/* <Background /> */}
      <Profile />
      {/* <Dashboard /> */}
      {/* <Signup />
      <Login />
      <Dashboard /> */}
    </div>
  );
}

export default ProfilePage;
