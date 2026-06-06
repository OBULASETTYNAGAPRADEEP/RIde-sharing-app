import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global CSS (for body, fonts, etc.)
import App from './App';
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
