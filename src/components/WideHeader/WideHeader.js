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

  const toggleNavTabFocusItems = () => {
    const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const slideOutMenuNav = document.querySelector('#root > div > div > div.topHeader > div.header-container > header > div.usa-nav-container > nav');

    const firstFocusableElement = slideOutMenuNav.querySelectorAll(focusableElements)[0]; // get first element to be focused inside slideOutMenuNav
    const focusableContent = slideOutMenuNav.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside slideOutMenuNav

    document.addEventListener('keydown', e => {
      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else { // if tab key is pressed
        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });

    firstFocusableElement.focus();
  };

  const searchFormFixes = () => {

    setTimeout(() => {
      const searchButton = document.querySelector('#root > div > div > div.topHeader > div.header-container > header > div.usa-nav-container > nav > form > button');
      // const searchButtonSpan = document.querySelector('#root > div > div > div.topHeader > div.header-container > header > div.usa-nav-container > nav > form > button span');

      searchButton.classList.add('search-form-button');
    });
  };

  const rearrangeSearchForm = () => {
    // const slideOutMenuNav = document.querySelector('#root > div > div > div.topHeader > div.header-container > header > div.usa-nav-container > nav');
    const closeButton = document.querySelector('#root > div > div > div.topHeader > div.header-container > header > div.usa-nav-container > nav .usa-nav__close');
    const searchFormElement = document.querySelector('form.usa-search');

    // function insertAfter(newNode, referenceNode) {
    //   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    // }

    setTimeout(() => {
      // searchFormElement.remove();
      // slideOutMenuNav.appendChild(searchFormElement);
      // searchFormElement.parentNode.removeChild(searchFormElement);
      // slideOutMenuNav.insertAdjacentHTML('afterbegin', <h1>Haha</h1>);
      // closeButton.insertAdjacentHTML('afterend', <li>Test Yes</li>);
      // searchFormElement.parentNode.insertBefore(newNode, searchFormElement.nextSibling);
      // closeButton.parentNode.insertBefore(searchFormElement, closeButton.nextSibling);
      // insertAfter(slideOutMenuNav, searchFormElement);
      // console.log(typeof searchFormElement);
      // console.log(searchFormElement);
      // closeButton.tabIndex = 1;
      console.log(closeButton.tabIndex);
      console.log(searchFormElement.tabIndex);
    });
  }

  const menuButtonClickedHandler = () => {
    onClick();

    setTimeout(() => {
      const navClose = document.querySelector('button.usa-nav__close');
      navClose.focus();
      toggleNavTabFocusItems();
      searchFormFixes();
      rearrangeSearchForm();
    });
  }

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
      <Header basic={true} className="margin-bottom-neg-1">
        <div className="bg-secondary-darker text-center text-gold padding-y-2px react-transition swipe-down">
          EPA {config.app.env} Environment: The content on this page is not
          production data and this site is being used for <b>development</b>{" "}
          and/or <b>testing</b> purposes only.
        </div>
        <a
          href="#main-content"
          rel="noopener noreferrer"
          title="Go to the EPA home page"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/EPALogo.svg`}
            className="margin-y-3 react-transition swipe-right mobile-lg:padding-left-2 desktop:padding-left-4"
            alt="Official EPA Logo"
          />
        </a>
        <div id="usa-side-nav" className="usa-nav-container">
          <div className="usa-navbar mobile-lg:padding-right-2 desktop:padding-right-4">
            <NavMenuButton
              onClick={() => menuButtonClickedHandler()}
              label="Menu"
              className="display-block usa-button react-transition swipe-left margin-right-0 "
              aria-haspopup="true"
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
