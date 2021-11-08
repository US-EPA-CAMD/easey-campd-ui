import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "../Layout/Layout";
import SelectDataType from "../SelectDataType/SelectDataType";
import ManageDataDownloadRoute from "../protectedRoutes/ManageDataDownloadRoute/ManageDataDownloadRoute";
import ManageDataDownload from "../customDataDownload/ManageDataDownload/ManageDataDownload";
import NotFound from "../NotFound/NotFound";
import HomePage from "../HomePage/HomePage";
import DataLandingPage from "../DataLandingPage/DataLandingPage";
import BulkDataFiles from "../BulkDataFiles/BulkDataFiles";
import TutorialsPage from "../TutorialsPage/TutorialsPage";
import RelatedResources from "../RelatedResources/RelatedResources";
import FaqsPage from "../FaqPage/FaqsPage";
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
          <Route path="/data/bulk-data-files" exact component={BulkDataFiles} />
          <Route path="/resources/related-resources" exact component={RelatedResources} />
          <Route path="/help-support/tutorials" exact component={TutorialsPage} />
          <Route path="/help-support/faqs" exact component={FaqsPage} />
          <ManageDataDownloadRoute path='/manage-data-download' exact component={ManageDataDownload} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
