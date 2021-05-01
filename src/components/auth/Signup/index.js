import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useModal } from '../../../contexts/ModalContext';
import { useHistory, Link } from 'react-router-dom';
import ErrorModal from '../../ErrorModal/ErrorModal';
// import './Signup.css';

const Signup = () => {
  // const displaynameRef = useRef()
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const { openErrorModal, errorMessageHandler } = useModal();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      let message = 'Passwords do not match';
      errorMessageHandler(message);
      openErrorModal(true);
      return setError(message);
    }

    // the loading state is set to disable the button so only 1 account is created
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      let message = 'Failed to create an account';
      setError(message);
      errorMessageHandler(message);
      openErrorModal(true);
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="wrapper">
        <div className="form-wrapper">
          {error && <ErrorModal />}
          <div className="login-form-outline">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  ref={emailRef}
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
              </div>
              <div className="password-confirm">
                <label htmlFor="password">Confirm Password</label>
                <input
                  ref={passwordConfirmRef}
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
              </div>
              <div className="createAccount">
                <button disabled={loading} type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="signup-login">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
