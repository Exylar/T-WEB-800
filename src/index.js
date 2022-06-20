import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import "./services/firebase";
import App from './App';
import { Provider as UserProvider } from 'contexts/user';

import 'react-toastify/dist/ReactToastify.css';
import "assets/css/global.css";
import 'assets/css/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
