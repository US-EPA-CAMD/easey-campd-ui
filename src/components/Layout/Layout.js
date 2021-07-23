import React from "react";

import { Header } from "@us-epa-camd/easey-design-system";
import SubHeader from "../SubHeader/SubHeader";
import "./Layout.scss";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div className="react-transition fade-in">
        <a id='skip-nav' className='skip-to-content-anchor' href='#main-content'>
            Skip to Content
        </a>
      <div className="topHeader">
        <Header
            logoSrc="https://easey-dev.app.cloud.gov/images/epa-logo-blue.svg"
            logoUrl="https://easey-dev.app.cloud.gov/images/epa-logo-blue.svg"
            menuItems={[
                {
                    link: 'https://www.epa.gov/environmental-topics',
                    menuItems: [
                        {
                            link: 'https://www.epa.gov/environmental-topics/air-topics',
                            name: 'Air'
                        },
                        {
                            link: 'https://www.epa.gov/bedbugs',
                            name: 'Bed Bugs'
                        },
                        {
                            link: 'https://www.epa.gov/environmental-topics/chemicals-and-toxics-topics',
                            name: 'Chemicals and Toxics'
                        },
                        {
                            link: 'https://www.epa.gov/environmental-topics/location-specific-environmental-information',
                            name: 'Environmental Information by Location'
                        }
                    ],
                    name: 'Environmental Topics'
                },
                {
                    link: 'https://www.epa.gov/laws-regulations',
                    menuItems: [
                        {
                            link: 'https://www.epa.gov/regulatory-information-sector',
                            name: 'By Business Sector'
                        },
                        {
                            link: 'https://www.epa.gov/regulatory-information-topic',
                            name: 'By Topics'
                        },
                        {
                            link: 'https://www.epa.gov/compliance',
                            name: 'Compliance'
                        },
                        {
                            link: 'https://www.epa.gov/enforcement',
                            name: 'Enforcement'
                        }
                    ],
                    name: 'Laws and Regulations'
                },
                {
                    link: 'https://www.epa.gov/aboutepa',
                    menuItems: [
                        {
                            link: 'https://www.epa.gov/aboutepa/epa-organization-chart',
                            name: 'Organization Chart'
                        },
                        {
                            link: 'https://cfpub.epa.gov/locator/index.cfm',
                            name: 'Staff Directory'
                        },
                        {
                            link: 'https://www.epa.gov/planandbudget',
                            name: 'Planning, Budget, and Results'
                        },
                        {
                            link: 'https://www.epa.gov/careers',
                            name: 'Jobs and Internships'
                        }
                    ],
                    name: 'About EPA'
                },
                {
                    link: 'https://www.epa.gov/accessibility',
                    menuItems: [],
                    name: 'Accessibility'
                },
                {
                    link: 'https://www.epa.gov/privacy',
                    menuItems: [],
                    name: 'Privacy'
                },
                {
                    link: 'https://www.epa.gov/privacy/privacy-and-security-notice',
                    menuItems: [],
                    name: 'Privacy and Security Notice'
                }
            ]}
            searchUrl="https://search.epa.gov/epasearch"
        />
        <SubHeader />
      </div>
      <div className="mainContent" role="main">{childrenWithProps}</div>
    </div>
  );
};

export default Layout;
