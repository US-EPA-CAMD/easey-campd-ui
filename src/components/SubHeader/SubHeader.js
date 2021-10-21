import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Title, Button } from '@trussworks/react-uswds';

import SubHeaderInfo from '../SubHeaderInfo/SubHeaderInfo';
import SubHeaderNav from '../SubHeaderNav/SubHeaderNav';
import {
  subHeaderMenuList,
  subHeaderUtilityList,
} from '../../utils/constants/menuTopics';

const SubHeader = () => {
  const pathname = useLocation().pathname;
  const cddPath = ['/select-data-type', '/manage-data-download','/data', '/bulk-data-files'];
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

  return (
    <div className="subheader-wrapper">
      <Header
        className="padding-y-2 mobile-lg:padding-x-2 desktop:padding-x-4"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + '/images/header-bg.png'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          alignSelf: 'top center',
        }}
      >
        <div className="usa-nav-container clearfix padding-x-0">
          <Title className="float-left margin-0 desktop-lg:padding-top-2">
            <h1 className="display-inline-block text-white text-heavy desktop-lg:font-sans-3xl desktop:font-sans-2xl mobile-lg:font-sans-xl margin-0">
              CAMPD
            </h1>
            <span className="display-none desktop:display-block desktop-lg:display-inline-block desktop-lg:margin-left-1 text-white text-normal font-sans-md width-card text-wrap">
              Clean Air Markets Program Data
            </span>
          </Title>
          <Button className="desktop:display-none float-right bg-transparent margin-0 position-relative top-1">
            <img
              src={`${process.env.PUBLIC_URL}/images/icons/mobile-menu-expand.svg`}
              alt="Expandable Menu"
              className={'position-absolute bottom-1px'}
            />
          </Button>
          <div className="display-flex flex-column flex-align-end">
            <SubHeaderNav
              pathname={pathname}
              menuList={subHeaderUtilityList}
              navDropdownOpen={navDropdownOpen.utility}
              handleToggleNavDropdown={handleToggleNavDropdown}
              initialCategorySelected={initialCategorySelected}
              isUtility={true}
            />
            <SubHeaderNav
              pathname={pathname}
              menuList={subHeaderMenuList}
              navDropdownOpen={navDropdownOpen.primary}
              handleToggleNavDropdown={handleToggleNavDropdown}
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
