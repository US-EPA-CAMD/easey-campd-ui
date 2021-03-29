import React, { useState } from "react";
import { Button, Header, Title, PrimaryNav } from "@trussworks/react-uswds";
import "./WideHeader.css";
import Menu from "./Menu/Menu";
import {
  environmentalTopics,
  lawsAndRegulationsTopics,
  aboutEPATopics,
} from "./Menu/menuTopics";
import MenuSearch from "./MenuSearch/MenuSearch";
import config from '../../../config'

const WideHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const mainMenu = Menu([
    environmentalTopics,
    lawsAndRegulationsTopics,
    aboutEPATopics,
  ]);

  return (
    <div>
      <div className={`usa-overlay ${expanded ? "is-visible" : ""}`}></div>
      <div
        id="block-pane-official-website-header"
        className="block block-pane  block-pane-official-website-header sitewide-alert sitewide-alert--official"
      >
        <div className="sitewide-alert__content">
          {" "}
          An official website of the United States government.
        </div>
      </div>
      <div id="topbanner">
        <p>
          EPA {config.app.env} Environment: The content on this page is not production
          data and this site is being used for <strong>development</strong> and/or <strong>testing</strong> purposes
          only.
        </p>
      </div>
      <Header basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              {" "}
              <a href="https://www.epa.gov/" target='_blank' rel="noopener noreferrer" title="Go to the EPA home page">
                <img src={require("./EPALogo.png")} className="photo" alt="Official EPA Logo"/>
              </a>
            </Title>
            <Button className="menuBTN" onClick={onClick} label="Menu">
              Menu
            </Button>
          </div>
          <div className="mainMenu">
            <PrimaryNav
              items={mainMenu}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}
            >
              <MenuSearch />
            </PrimaryNav>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default WideHeader;
