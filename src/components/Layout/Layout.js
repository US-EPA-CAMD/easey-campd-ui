import React from "react";

import { Header } from "@us-epa-camd/easey-design-system";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import WideHeader from "../WideHeader/WideHeader";
import SubHeader from "../SubHeader/SubHeader";

import config from '../../config';

import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );

  const menuItems = [
    {
      name: 'Environmental Topics',
      href: 'https://www.epa.gov/environmental-topics',
    },
    {
      name: 'Laws and Regulations',
      href: 'https://www.epa.gov/laws-regulations',
    },
    {
      name: 'About EPA',
      href: 'https://www.epa.gov/aboutepa',
    },
    {
      name: 'Accessibility',
      href: 'https://www.epa.gov/accessibility',
    },
    {
      name: 'Privacy',
      href: 'https://www.epa.gov/privacy',
    },
    {
      name: 'Privacy and Security Notice',
      href: 'https://www.epa.gov/privacy/privacy-and-security-notice',
    },
  ];

  return (
    <div className="react-transition fade-in">
      <a id='skip-nav' className='skip-to-content-anchor' href='#main-content'>
        Skip to Content
      </a>
      <div className="topHeader">
        {/* <WideHeader />         */}
        <Header
            logoSrc="/images/EPALogo.svg"
            logoUrl="https://www.epa.gov"
            searchUrl="https://search.epa.gov/epasearch"
            menuItems={menuItems}
        />
        <SubHeader />
      </div>
      <div className="mainContent" role="main">{childrenWithProps}</div>
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
