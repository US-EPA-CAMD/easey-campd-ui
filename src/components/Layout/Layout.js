import React from "react";
import { connect } from 'react-redux';

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import SubHeader from "../SubHeader/SubHeader";

import config from "../../config";

import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  console.log('hide ', props.hideNav);
  return (
    <div className="react-transition fade-in padding-bottom-5">
      <a id="skip-nav" className="skip-to-content-anchor" href={"#main"}>
        Skip to Content
      </a>
      <div className={`topHeader ${props.hideNav? 'display-none': ''}`}>
        <div className="epa-header">
          <Header environment={config.app.env} />
        </div>
        <SubHeader />
      </div>
      <main className="mainContent" id="main" role="main">
        {childrenWithProps}
      </main>
      <div className="position-fixed bottom-0 width-full">
        <AppVersion
          version={config.app.version}
          publishDate={config.app.published}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({hideNav: state.hideNav})
export default connect(mapStateToProps, null)(Layout);

// export default Layout;
