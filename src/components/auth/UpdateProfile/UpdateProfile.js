import React, { useRef, useState } from "react"
import { useHistory, Link } from "react-router-dom";
import { useModal } from "../../../contexts/ModalContext"
import { useAuth } from "../../../contexts/AuthContext"
import HomeNav from '../../HomeNav'
import ErrorModal from '../../ErrorModal/ErrorModal'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const { openErrorModal, errorMessageHandler } = useModal()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      let message = "Passwords do not match"
      errorMessageHandler(message)
      openErrorModal(true)
      return setError(message)
    }

    const promises = []
    setLoading(true)
    setError("")

    console.log('Emails', emailRef.current.value, currentUser.email)
    if (emailRef.current.value && emailRef.current.value !== currentUser.email) {
      console.log('Updating email')
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/profile")
      })
      .catch((err) => {
        let message = "Failed to update account"
        console.log(err.message)
        setError(message)
        errorMessageHandler(message)
        openErrorModal(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <HomeNav />
      <div className='wrapper'>
        <div className='form-wrapper'>
          {error && <ErrorModal />}
          <div className='login-form-outline'>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
              {/* <div className="display-name">
              <label htmlFor="displayName">Display Name</label>
              <input
                ref={displaynameRef}
                placeholder="display name"
                type="text"
                name="displayName"
                required
              />
            </div> */}
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  ref={emailRef}
                  placeholder={currentUser.email}
                  type="email"
                  name="email"
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  placeholder="leave blank to keep the same"
                  type="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
              </div>
              <div className="password-confirm">
                <label htmlFor="password">Confirm Password</label>
                <input
                  ref={passwordConfirmRef}
                  placeholder="leave blank to keep the same"
                  type="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[!@_#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
              </div>
              <div className="createAccount">
                <button disabled={loading} type="submit">Update</button>
              </div>
            </form>
          </div>
          <div className="signup-login">
            <Link to="/profile">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
