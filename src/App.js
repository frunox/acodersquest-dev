import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore } from './firebase';
import { usePostsUpdate } from './contexts/PostContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import UpdateProfile from './components/auth/UpdateProfile/UpdateProfile';
import AdminPage from './pages/AdminPage';
import AllPostsPage from './pages/AllPostsPage';
import AboutPage from './pages/AboutPage';
import Post from './components/Post';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const savePosts = usePostsUpdate();

  useEffect(() => {
    const getPosts = async () => {
      const postsRef = firestore.collection('metadata');
      await postsRef.get().then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        posts.sort((a, b) => b.postId - a.postId);
        savePosts(posts);
        console.log('App: in useEffect, posts.length', posts.length);
      });
      setIsLoading(false);
    };
    getPosts();
  }, [isLoading]);

  console.log('APP');
  return (
    <React.Fragment>
      {!isLoading && (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/admin" component={AdminPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/all-posts" component={AllPostsPage} />
            <Route path="/post/:id" render={(props) => <Post {...props} />} />
            <Route path="/404" component={NotFoundPage} />
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      )}
    </React.Fragment>
  );
}

export default App;
