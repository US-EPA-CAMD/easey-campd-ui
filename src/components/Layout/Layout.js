import React from "react";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import SubHeader from "../SubHeader/SubHeader";

import config from "../../config";

import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );

  return (
    <div className="react-transition fade-in">
      <a id="skip-nav" className="skip-to-content-anchor" href="#main-content">
        Skip to Content
      </a>
      <div className="topHeader">
        <Header environment={config.app.env} />
        <SubHeader />
      </div>
      <div className="mainContent" role="main">
        {childrenWithProps}
      </div>
      <div className="position-fixed bottom-0 width-full">
        <AppVersion
          version={config.app.version}
          publishDate={config.app.published}
        />
      </div>
    </div>
  );
};

export default Layout;
