import React from "react";
import { connect } from 'react-redux';

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import SubHeader from "../SubHeader/SubHeader";

import config from "../../config";

import "./Layout.scss";
import { Link } from "@trussworks/react-uswds";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  
  return (
    <div className="react-transition fade-in padding-bottom-5">
      <div id="skipNav">
          <Link className="skip-to-content-link" href={'#main-content'}>
            Skip to Content
          </Link>
      </div>
      <div className={`topHeader ${props.hideNav ? 'display-none' : ''}`}>
        <div className="epa-header">
          <Header environment={config.app.env} />
        </div>
        <SubHeader />
      </div>
      <main className="mainContent" id="main-content" role="main">
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