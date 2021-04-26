import React, { useState, useContext } from "react"

const ModalContext = React.createContext()


export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [state, setState] = useState({
    errorModalOpen: false,
  })

  const [errorMessage, setErrorMessage] = useState("")
  let errorOpen = state.errorModalOpen

  function openErrorModal(setting) {
    // console.log('ModalContext openErrorModal', setting)
    return setState({
      ...state,
      errorModalOpen: setting
    })
  }

  function errorMessageHandler(message) {
    // console.log('In errorMessageHandler', message)
    return setErrorMessage(message)
  }

  const value = {
    errorOpen,
    errorMessage,
    openErrorModal,
    errorMessageHandler
  }
  // console.log('ModalContext errorOpen', errorOpen)

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}