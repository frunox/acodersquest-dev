import React, { useRef, useState } from "react";
import ErrorModal from '../../ErrorModal/ErrorModal'
import HomeNav from '../../HomeNav'
import { useAuth } from "../../../contexts/AuthContext"
import { useModal } from '../../../contexts/ModalContext'
import { Link } from "react-router-dom";
// import './Login.css'

export default function ForgotPassword() {
  const emailRef = useRef()

  const { resetPassword } = useAuth()
  const { errorOpen, openErrorModal, errorMessageHandler } = useModal()
  const [, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    // the loading state is set to disable the button so only 1 account is created
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      let text = 'Check your inbox for instructions to reset your password'
      setMessage(text)
      errorMessageHandler(text)
      openErrorModal(true)
    } catch {
      let message = "Invalid email"
      setError(message)
      errorMessageHandler(message)
      openErrorModal(true)
    }

    setLoading(false)
  }

  return (
    <div>
      <div>
        <HomeNav />
        <div className='wrapper'>
          <div className='form-wrapper'>
            <div className='login-form-outline'>
              <h1>Reset Password</h1>
              {(errorOpen || message) && <ErrorModal />}
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
                <div className="createAccount">
                  <button disabled={loading} type="submit">Reset Password</button>
                </div>
                <div className="signup-login">
                  <Link to="/login">Log In</Link>
                </div>
              </form>
            </div>
            <div className="signup-login">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
