import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

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

function App() {
  const prepDocument = () => {
    setTimeout(() => {
      const mainContent = document.querySelector('.mainContent');
      if(mainContent){
        mainContent.setAttribute('id', 'main-content');
      }
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
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/data" element={<DataLandingPage />} />
        <Route path="/data/custom-data-download" element={<CustomDataDownload />} />
        <Route path="/data/bulk-data-files" element={<BulkDataFiles />} />
        <Route path="/visualization-gallery" element={<VisualizationGalleryPage />} />
        <Route path="/help-support/related-resources" element={<RelatedResources />} />
        <Route path="/help-support/glossary" element={<GlossaryPage />} />
        <Route path="/help-support/about" element={<AboutPage />} />
        <Route path="/help-support/tutorials" element={<TutorialsPage />} />
        <Route path="/help-support/faqs" element={<FaqsPage />} />
        <Route path="/help-support/contact-us" element={<ContactUsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
    </div>
  );
}

export default App;
