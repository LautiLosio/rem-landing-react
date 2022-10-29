import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyD8nPFLRxWzUGTHq3dnTuzrLWxuqn5Jqog",
  authDomain: "rem-landing-page.firebaseapp.com",
  projectId: "rem-landing-page",
  storageBucket: "rem-landing-page.appspot.com",
  messagingSenderId: "117524622142",
  appId: "1:117524622142:web:98870bcfd1dc6ef83d1a6f"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
