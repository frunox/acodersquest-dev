import React from 'react';
import HomeNav from '../components/HomeNav';
import NotFound from '../components/NotFound';

function NotFoundPage() {
  // const setupCtx = useContext(SetupContext) ?
  // function to toggle the open/close state of the side drawer (passed to toggle button)

  return (
    <div>
      <HomeNav />
      <NotFound />
    </div>
  );
}

export default NotFoundPage;
