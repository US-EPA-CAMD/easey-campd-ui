import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SelectDataTypePage from "./components/CustomDataDownload/Home/SelectDataTypePage";
import NotFound from "./components/Common/NotFound/NotFound";

import Layout from "./components/Common/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={SelectDataTypePage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
