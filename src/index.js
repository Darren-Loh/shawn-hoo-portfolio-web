import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const OnRedirectCallback = (appState) => {
  const navigate = useNavigate();
  // history.push(
  //   appState && appState.returnTo ? appState.returnTo : window.location.pathname
  // );
  navigate( appState && appState.returnTo ? appState.returnTo : window.location.pathname);
  // navigate(appState.targetUrl);
};

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

function generateNonce(len) {
  let arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={"https://shawn-hoo-portfolio-server.onrender.com//admin"}
        scope={'openid'}
        audience={'shawnHooExpressBackend'}
        // redirectUri={window.location.href}
        // onRedirectCallback={OnRedirectCallback}
      >
        <App />
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
