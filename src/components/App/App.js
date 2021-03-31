import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SelectDataType from "../SelectDataType/SelectDataType";
import ManageDataDownload from "../ManageDataDownload/ManageDataDownload";
import NotFound from "../NotFound/NotFound";

import Layout from "../Layout/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={SelectDataType} />
          <Route path="/customdatadownload" exact component={ManageDataDownload} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
