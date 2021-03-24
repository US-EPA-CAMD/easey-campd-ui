import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import configureStore from "./store/configureStore.dev";

//import './index.css';
import "./uswds_assets/css/styles.css";
//import "./utils/remoteLogging";
import App from "./App";
import config from './config';
import * as serviceWorker from "./serviceWorker";

//const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={config.app.path}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
