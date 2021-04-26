import React, { useContext, useState, useEffect } from "react"
// import the auth module from the firebase.js file
import { auth } from "../firebase"

// create the context
const AuthContext = React.createContext()

// export useAuth() as the context (won't need useContext in receiving file)
export function useAuth() {
  return useContext(AuthContext)
}

// set up the provider to be wrapped around the components
export function AuthProvider({ children }) {
  // currentUser is whoever is signed in
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // create new user using Firebase create user function.  Returns a promise
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  // calls log in function from Firebase auth
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  // we only want to run this once, on load.
  useEffect(() => {
    // Firebase listener, notifies app that a user logs in.  We set our user based on this.
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    // unsubscribe to the listener when the component is unmounted (desirable) 
    return unsubscribe
  }, [])

  // currentUser ? console.log('Current user email', currentUser.email) : console.log('No user')

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}