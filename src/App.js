import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SelectDataType from "./components/CustomDataDownload/SelectDataType/SelectDataType";
import ManageDataDownload from "./components/CustomDataDownload/ManageDataDownload/ManageDataDownload";
import NotFound from "./components/Common/NotFound/NotFound";

import Layout from "./components/Common/Layout";

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
