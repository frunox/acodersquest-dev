import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './HomeNav.css';

const HomeNav = (props) => {
  const { currentUser } = useAuth();
  const admin = process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <header className="navbar-header">
      {/* <div className="navbar-logo-background"></div> */}
      <div>
        <img
          className="navbar-logo"
          src="https://i.ibb.co/r04HX4G/logo-800x800.png"
          alt="logo"
        ></img>
      </div>
      <div className="navbar-title">
        <a href="/">A Coder's Quest</a>
      </div>
      <input
        type="checkbox"
        id="navbar-toggle"
        className="navbar-toggle"
      ></input>
      <nav className="navbar-nav">
        <ul className="navbar-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/all-posts">All Posts</Link>
          </li>
          {currentUser && currentUser.email === admin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          {/* {currentUser && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )} */}
          {!currentUser && (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              {/* <li>
                <Link to="/signup">Sign Up</Link>
              </li> */}
            </>
          )}
        </ul>
      </nav>
      <label htmlFor="navbar-toggle" className="navbar-toggle-label">
        <span></span>
      </label>
    </header>
  );
};

export default HomeNav;
