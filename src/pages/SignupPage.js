import React from 'react';
// import HomeNav from '../components/HomeNav'
import HomeNav from '../components/HomeNav';
import Signup from '../components/auth/Signup';
// import Background from '../components/Background'
// import Dashboard from '../components/Dashboard'
// import Signup from '../components/Signup'
// import Login from '../components/Login'

function SignupPage() {
  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)

  return (
    <div>
      <HomeNav />
      {/* <Background /> */}
      <Signup />
      {/* <Dashboard /> */}
      {/* <Signup />
      <Login />
      <Dashboard /> */}
    </div>
  );
}

export default SignupPage;
