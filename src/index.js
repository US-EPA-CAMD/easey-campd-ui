import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";
import App from "./components/App/App";
import config from "./config";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore.dev";

const store = configureStore();

if (config.app.googleAnalyticsEnabled === "true") {
  let tagManagerArgs = { gtmId: config.app.googleAnalyticsContainerId };

  TagManager.initialize(tagManagerArgs);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={config.app.path}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
