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
          <Redirect from="/campd/home" to="/campd" />
          <Route path="/campd" exact component={SelectDataTypePage} />
          <Route path="/campd/*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
