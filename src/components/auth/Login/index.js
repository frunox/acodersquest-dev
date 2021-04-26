import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext"
import { useModal } from "../../../contexts/ModalContext"
import { useHistory, Link } from "react-router-dom";
import ErrorModal from '../../ErrorModal/ErrorModal'
import './Login.css'

const Login = () => {
  // const displaynameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const { login } = useAuth()
  const { errorOpen, openErrorModal, errorMessageHandler } = useModal()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // the loading state is set to disable the button so only 1 account is created
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      let message = "Invalid email or password"
      setError(message)
      errorMessageHandler(message)
      openErrorModal(true)
      console.log('LOGIN error', error, 'message', message)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='form-wrapper'>
          {errorOpen && <ErrorModal />}
          <div className='login-form-outline'>
            <h1>Log In</h1>
            <form className='form' onSubmit={handleSubmit}>
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
              <div className="createAccount">
                <button disabled={loading} type="submit">Log In</button>
              </div>
              <div className="signup-login">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </form>
          </div>
          <div className="signup-login">
            Already have an account? <Link to="/signup">Sign Up</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
