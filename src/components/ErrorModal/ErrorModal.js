import React from "react";
import Modal from 'react-modal';
import { useModal } from "../../contexts/ModalContext"
import './ErrorModal.css'

Modal.setAppElement(document.getElementById('root'))

const ErrorModal = () => {
  const { errorMessage, errorOpen, openErrorModal } = useModal()

  console.log('ErrorModal errorOpen', errorOpen)

  let modalOpen = errorOpen

  const openModal = (setting) => {
    console.log('ErrorModal openModal() setting', setting)
    openErrorModal(setting)
  }


  return (
    <div>
      <div>
        {console.log('ErrorModal errorOpen', errorOpen)}
        <div className='form-wrapper'>
          <Modal isOpen={modalOpen} onRequestClose={() => openModal(false)}
            style={{
              overlay: {
                background: 'none',
                zIndex: '100'
              },
              content: {
                borderRadius: '10px',
                position: 'relative',
                top: '90px',
                border: '1px solid black',
                width: '400px',
                margin: '0 auto',
                height: '190px',
              }
            }}
          >
            <h1>An Error Occurred</h1>
            <h3 className='errorMessage'>{errorMessage}</h3>
            <button className='blueButton' onClick={() => openModal(false)}>Return</button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
