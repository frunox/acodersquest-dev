import React, { useState } from 'react';
import { Confirm } from 'semantic-ui-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
// import './Profile.css';

export default function Profile() {
  console.log('wwwwwwwwwwww', useAuth);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  console.log(logout);
  const history = useHistory();

  if (currentUser) {
  } else {
    console.log('No current user');
    history.push('/');
  }
  const [state, setState] = useState({ open: false });

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }

  const closeConfirm = () => {
    setState({ open: false });
  };

  return (
    <div className="wrapper background">
      <div className="dashboard-content">
        <div className="form-wrapper">
          <h1>Profile</h1>
          {error && (
            <Confirm
              open={state.open}
              onConfirm={closeConfirm}
              content={error}
              size="tiny"
            />
          )}
          <span className="dashboard-email">
            <strong>Email:</strong> {currentUser.email}
          </span>
          <button className="createAccount">
            <Link to="/update-profile">Update Profile</Link>
          </button>
          <div className="signup-login">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
