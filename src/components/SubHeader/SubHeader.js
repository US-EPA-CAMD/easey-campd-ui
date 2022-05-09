import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Title, Button } from '@trussworks/react-uswds';

import SubHeaderInfo from '../SubHeaderInfo/SubHeaderInfo';
import SubHeaderNav from '../SubHeaderNav/SubHeaderNav';
import {
  subHeaderMenuList,
  subHeaderUtilityList,
} from '../../utils/constants/menuTopics';
import useCheckWidth from '../../utils/hooks/useCheckWidth';
import SubHeaderNavMobile from "../SubHeaderNavMobile/SubHeaderNavMobile";

import './SubHeader.scss';

const SubHeader = () => {
  const pathname = useLocation().pathname;
  const cddPath = ['/data/custom-data-download', '/manage-data-download','/data', '/data/bulk-data-files'];
  const initialCategorySelected = [
    pathname === '/',
    cddPath.includes(pathname),
    false,
    false,
    false,
    false,
  ];
  const initialNavOpen = {
    primary: [false, false, false, false, false],
    utility: [false, false, false, false],
  };

  const [navDropdownOpen, setNavDropdownOpen] = useState(initialNavOpen);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuFocus, setMobileMenuFocus] = useState({
    collapseButton: document.querySelector('#collapseButton'),
    expandButton: document.querySelector('#expandButton'),
  });
  const { collapseButton, expandButton } = mobileMenuFocus;
  const isDesktop = useCheckWidth([1024, 1200])
  useEffect(() => {
    setMobileMenuFocus({
      collapseButton: document.querySelector('#collapseButton'),
      expandButton: document.querySelector('#expandButton')
    });
  }, [showMobileMenu]);
  const handleToggleNavDropdown = (column, isUtility) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newNavState = Object.assign({}, initialNavOpen);
      if (isUtility) {
        newNavState.utility[column] = !prevNavDropdownOpen.utility[column];
      } else {
        newNavState.primary[column] = !prevNavDropdownOpen.primary[column];
      }
      return newNavState;
    });
  };

  const handleCloseNavDropdown = (isUtility) => {
    setNavDropdownOpen(initialNavOpen)
  }
  return (
    <div className="subheader-wrapper">
      <Header
        className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10"
        style={{
          backgroundImage:
            pathname === '/'
              ? `url(${process.env.PUBLIC_URL + '/images/header-bg.png'})`
              : null,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          alignSelf: 'top center',
        }}
      >
        <div className="usa-nav-container custom-wrapper clearfix padding-x-0">
          <Title className="logo-wrapper float-left margin-0 desktop-lg:padding-top-2">
            <span className="display-block display-flex desktop:display-block desktop-lg:display-flex">
              <img
                src={`${process.env.PUBLIC_URL}/images/campd-mark.svg`}
                alt="CAMPD Logo"
              />
              <h1 className="display-inline-block text-white text-heavy font-sans-3xl margin-0">
                CAMPD
              </h1>
              <span className={`display-none ${isDesktop ? 'width-card':'width-full'} tablet:display-inline-block desktop:display-block margin-left-8 tablet:margin-left-1 tablet:margin-top-1 desktop:margin-left-8 desktop:margin-top-0 desktop-lg:margin-left-1 desktop-lg:margin-top-1 desktop-lg:display-inline-block text-white text-normal font-sans-md text-wrap`}>
                Clean Air Markets Program Data
              </span>
            </span>
            <div className="program margin-left-8 text-white text-normal desktop:margin-top-1 desktop-lg:margin-top-0 text-no-wrap">
              A program of the U.S. EPA
            </div>
          </Title>
          <div className="desktop:display-none">
            <Button
              className={
                showMobileMenu
                  ? 'display:none opacity-0'
                  : 'float-right bg-transparent margin-0 position-relative top-1 padding-right-3'
              }
              id={'expandButton'}
              tabIndex={showMobileMenu ? -1 : 0}
              aria-expanded={showMobileMenu}
              onClick={() => {
                setShowMobileMenu(true);
                collapseButton && collapseButton.focus();
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/mobile-menu-expand.svg`}
                alt="Expandable Menu"
                className={'position-absolute bottom-1px'}
              />
            </Button>
            <Button
              className={
                showMobileMenu
                  ? 'float-right bg-transparent margin-0 position-relative top-1 padding-right-3'
                  : 'display:none opacity-0'
              }
              id={'collapseButton'}
              tabIndex={showMobileMenu ? 0 : -1}
              aria-expanded={showMobileMenu}
              onClick={() => {
                setShowMobileMenu(false);
                expandButton && expandButton.focus();
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/mobile-menu-collapse.svg`}
                alt="Collapsable Menu"
                className={
                  showMobileMenu
                    ? 'position-absolute bottom-1px'
                    : 'display-none'
                }
              />
            </Button>
            <SubHeaderNavMobile
              subHeaderMenuList={subHeaderMenuList}
              subHeaderUtilityList={subHeaderUtilityList}
              showMobileMenu={showMobileMenu}
              pathname={pathname}
            />
          </div>
          <div className="display-flex flex-column flex-align-end" id="sub-header-nav">
            <SubHeaderNav
              pathname={pathname}
              menuList={subHeaderUtilityList}
              navDropdownOpen={navDropdownOpen.utility}
              handleToggleNavDropdown={handleToggleNavDropdown}
              handleCloseNavDropdown={handleCloseNavDropdown}
              initialCategorySelected={initialCategorySelected}
              isUtility={true}
            />
            <SubHeaderNav
              pathname={pathname}
              menuList={subHeaderMenuList}
              navDropdownOpen={navDropdownOpen.primary}
              handleToggleNavDropdown={handleToggleNavDropdown}
              handleCloseNavDropdown={handleCloseNavDropdown}
              initialCategorySelected={initialCategorySelected}
            />
          </div>
        </div>
        {pathname === '/' && <SubHeaderInfo />}
      </Header>
    </div>
  );
};

export default SubHeader;
