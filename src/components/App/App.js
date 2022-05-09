import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "../Layout/Layout";
import CustomDataDownload from "../customDataDownload/CustomDataDownload/CustomDataDownload";
import NotFound from "../NotFound/NotFound";
import HomePage from "../HomePage/HomePage";
import DataLandingPage from "../DataLandingPage/DataLandingPage";
import BulkDataFiles from "../BulkDataFiles/BulkDataFiles/BulkDataFiles";
import MapsGraphsPage from "../MapsGraphsPage/MapsGraphsPage";
import AboutPage from "../AboutPage/AboutPage";
import TutorialsPage from "../TutorialsPage/TutorialsPage";
import RelatedResources from "../RelatedResources/RelatedResources";
import FaqsPage from "../FaqPage/FaqsPage";
import GlossaryPage from "../GlossaryPage/GlossaryPage";
import config from "../../config";

import "./App.scss";

function App() {
  const prepDocument = () => {
    setTimeout(() => {
      const mainContent = document.querySelector(".mainContent");
      mainContent.setAttribute("id", "main-content");
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
            <Route path="/" exact component={HomePage} />
            <Route path="/data" exact component={DataLandingPage} />
            <Route
              path="/data/custom-data-download"
              exact
              component={CustomDataDownload}
            />
            <Route
              path="/data/bulk-data-files"
              exact
              component={BulkDataFiles}
            />
            <Route path="/maps-graphs" exact component={MapsGraphsPage} />
            <Route
              path="/resources/related-resources"
              exact
              component={RelatedResources}
            />
            <Route path="/resources/glossary" exact component={GlossaryPage} />
            <Route path="/help-support/about" exact component={AboutPage} />
            <Route
              path="/help-support/tutorials"
              exact
              component={TutorialsPage}
            />
            <Route path="/help-support/faqs" exact component={FaqsPage} />
            <Route
              path="/help-support/contact-us"
              exact
              component={() =>
                (window.location.href =
                  "https://www.epa.gov/airmarkets/forms/campd-contact-us")
              }
            />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
