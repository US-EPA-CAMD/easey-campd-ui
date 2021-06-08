/*** global dependencies (i.e., main driver stuff we need to make things work) ***/
import React, { useState } from "react";

import config from "../../config";

/*** additional 3rd party components ***/
import {
  Header,
  PrimaryNav,
  NavMenuButton,
  GovBanner,
  Search,
} from "@trussworks/react-uswds";

/*** additional 'local' (i.e., our app) components ***/
import WideHeaderMenu from "../WideHeaderMenu/WideHeaderMenu";

/*** data objects (for injection into props, etc.) ***/
import {
  environmentalTopics,
  lawsAndRegulationsTopics,
  aboutEPATopics,
} from "../../utils/constants/menuTopics";

/*** additional scss to add / override global scss scope classes for this component only ***/
import "./WideHeader.scss";

const WideHeader = () => {
  /***** HOOKS *****/
  const [expanded, setExpanded] = useState(false);

  /***** EVENT HANDLERS *****/
  const onClick = () => setExpanded((prvExpanded) => !prvExpanded);

  const onSearch = (event) => {
    // *** URI encode the component after trimming to get rid of leading/trailing spaces
    // *** and mitigate any character collision issues during http request with window.open
    const searchTerm = encodeURI(event.target[0].value.trim());
    window.open(
      `https://search.epa.gov/epasearch/?querytext=${searchTerm}`,
      "_blank"
    );
    return false;
  };

  const mainMenu = WideHeaderMenu([
    environmentalTopics,
    lawsAndRegulationsTopics,
    aboutEPATopics,
  ]);

  /****** COMPONENT JSX *****/
  return (
    <div className="header-container">
      <GovBanner className="padding-y-2px react-transition swipe-right bg-base-lighter" />
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`} />
      <Header basic={true}>
        <div className="bg-secondary-darker text-center text-gold padding-y-2px react-transition swipe-down">
          EPA {config.app.env} Environment: The content on this page is not
          production data and this site is being used for <b>development</b>{" "}
          and/or <b>testing</b> purposes only.
        </div>
        <a
          href="https://www.epa.gov/"
          target="_blank"
          rel="noopener noreferrer"
          title="Go to the EPA home page"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/EPALogo.svg`}
            className="margin-3 react-transition swipe-right"
            alt="Official EPA Logo"
          />
        </a>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <NavMenuButton
              onClick={() => onClick()}
              label="Menu"
              className="display-block usa-button react-transition swipe-left"
              data-testId="btnMenu"
            />
          </div>
          <PrimaryNav
            items={mainMenu}
            mobileExpanded={expanded}
            onToggleMobileNav={() => onClick()}
            key="primaryNav"
          >
            <Search
              placeholder="Search EPA.gov"
              size="small"
              onSubmit={(event) => onSearch(event)}
              data-testId="search"
            />
          </PrimaryNav>
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
