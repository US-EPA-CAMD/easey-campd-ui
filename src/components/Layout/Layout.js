import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, SiteAlert } from "@trussworks/react-uswds";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";

import SubHeader from "../SubHeader/SubHeader";
import config from "../../config";

import "./Layout.scss";
import { useEffect } from "react";
import { useRef } from "react";
import { errorMessages } from "../../utils/constants/errorMessages";

const Layout = ({apiErrors, children, hideNav}) => {
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child)
  );
  const [errors, setErrors] = useState([]);
  const apiErrorsRef = useRef(null);
  useEffect(() =>{
    const errorItems = [];
    Object.keys(apiErrors).forEach((error) => apiErrors[error].state? errorItems.push(error): null);
    errorItems.length && setErrors(errorItems)
  }, [apiErrors]);

  useEffect(() => {
    if (errors.length && apiErrorsRef.current){
      apiErrorsRef.current.scrollIntoView()
    }
  }, [errors])

  return (
    <div className="react-transition fade-in padding-bottom-5">
      {errors.length
        ? <div id="api-error-banner" ref={apiErrorsRef}>{errors.map((api) => (
            <SiteAlert variant="info" key={api}  aria-live="assertive">
              {errorMessages[api]}
            </SiteAlert>
          ))}</div>
        : null}
      <div id="skipNav">
        <Link className="skip-to-content-link" href={'#main-content'}>
          Skip to Content
        </Link>
      </div>
      <div className={`topHeader ${hideNav ? 'display-none' : ''}`}>
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

const mapStateToProps = (state) => ({hideNav: state.hideNav, apiErrors: state.apiErrors,})
export default connect(mapStateToProps, null)(Layout);