import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SelectDataType from "../SelectDataType/SelectDataType";
import ManageDataDownloadRoute from "../protectedRoutes/ManageDataDownloadRoute/ManageDataDownloadRoute";
import ManageDataDownload from "../customDataDownload/ManageDataDownload/ManageDataDownload";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";

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
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to={"/select-data-type"} />
          </Route>
          <Route path="/select-data-type" exact component={SelectDataType} />
          <ManageDataDownloadRoute path='/manage-data-download' exact component={ManageDataDownload} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
