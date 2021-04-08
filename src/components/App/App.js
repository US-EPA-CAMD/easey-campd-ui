import React from "react";
import { Route, Switch } from "react-router-dom";

import SelectDataType from "../SelectDataType/SelectDataType";
import ManageDataDownload from "../ManageDataDownload/ManageDataDownload";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";

import "./App.scss";
import Landing from "../Landing/Landing";

function App() {
  return (
    <div className="react-transition fade-in">
      <Layout>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/select-data-type" exact component={SelectDataType} />
          <Route
            path="/manage-data-download"
            exact
            component={ManageDataDownload}
          />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
