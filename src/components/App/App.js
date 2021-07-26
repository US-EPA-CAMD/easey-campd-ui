import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "../Layout/Layout";
import SelectDataType from "../SelectDataType/SelectDataType";
import ManageDataDownloadRoute from "../protectedRoutes/ManageDataDownloadRoute/ManageDataDownloadRoute";
import ManageDataDownload from "../customDataDownload/ManageDataDownload/ManageDataDownload";
import NotFound from "../NotFound/NotFound";
import HomePage from "../HomePage/HomePage";
import DataLandingPage from "../DataLandingPage/DataLandingPage";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import config from "../../config";

import "./App.scss";

function App() {

  const prepDocument = () => {
    setTimeout(() => {
      const mainContent = document.querySelector('.mainContent');
      mainContent.setAttribute('id', 'main-content');
    });
  };

  useEffect(() => {
    prepDocument();
  });

  return (
    <div className="react-transition fade-in">
      <BrowserRouter basename={config.app.path}>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/select-data-type" exact component={SelectDataType} />
          <Route path="/data" exact component={DataLandingPage} />
          <ManageDataDownloadRoute path='/manage-data-download' exact component={ManageDataDownload} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
      </BrowserRouter>
      <AppVersion
          publishDate={config.app.published}
          version={config.app.version}
      />
    </div>
  );
}

export default App;
