import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import liff from '@line/liff';

liff.init({ liffId: process.env.VITE_LIFF_ID })
  .then(() => {
    console.log('LIFF initialized');
  })
  .catch((err) => {
    console.error('LIFF initialization failed', err);
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
