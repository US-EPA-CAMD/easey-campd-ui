import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "../Layout/Layout";
import CustomDataDownload from "../customDataDownload/CustomDataDownload/CustomDataDownload";
import NotFound from "../NotFound/NotFound";
import HomePage from "../HomePage/HomePage";
import DataLandingPage from "../DataLandingPage/DataLandingPage";
import BulkDataFiles from "../bulkDataFiles/BulkDataFiles/BulkDataFiles";
import VisualizationGalleryPage from "../VisualizationGalleryPage/VisualizationGalleryPage";
import AboutPage from "../AboutPage/AboutPage";
import TutorialsPage from "../TutorialsPage/TutorialsPage";
import RelatedResources from "../RelatedResources/RelatedResources";
import FaqsPage from "../FaqPage/FaqsPage";
import ContactUsPage from "../ContactUsPage/ContactUsPage"
import GlossaryPage from "../GlossaryPage/GlossaryPage";
import config from "../../config";

import "./App.scss";

function App() {
  const prepDocument = () => {
    setTimeout(() => {
      const mainContent = document.querySelector('.mainContent');
      mainContent?.setAttribute('id', 'main-content');
    });
    // To avoid css sytling conflicts in production build 
    // position the link tag to external stylesheet as the last element of head section.
    const linkTag = document.querySelector('link[rel="stylesheet"]');
    if (linkTag) {
      linkTag.parentNode.appendChild(linkTag);
    }
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
          <Route path="/data/custom-data-download" exact component={CustomDataDownload} />
          <Route path="/data/bulk-data-files" exact component={BulkDataFiles} />
          <Route path="/visualization-gallery" exact component={VisualizationGalleryPage} />
          <Route path="/help-support/related-resources" exact component={RelatedResources} />
          <Route path="/help-support/glossary" exact component={GlossaryPage} />
          <Route path="/help-support/about" exact component={AboutPage} />
          <Route path="/help-support/tutorials" exact component={TutorialsPage} />
          <Route path="/help-support/faqs" exact component={FaqsPage} />
          <Route path="/help-support/contact-us" exact component={ContactUsPage} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
