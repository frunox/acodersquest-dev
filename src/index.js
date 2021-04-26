import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "./contexts/AuthContext"
import { ModalProvider } from "./contexts/ModalContext"
import { PostProvider } from "./contexts/PostContext"
import './index.css';
import App from './App';

ReactDOM.render(
  <AuthProvider>
    <ModalProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </ModalProvider>
  </AuthProvider>,
  document.getElementById('root')
);
