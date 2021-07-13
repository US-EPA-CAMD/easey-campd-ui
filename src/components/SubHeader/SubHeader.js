import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
  Button,
} from "@trussworks/react-uswds";

import config from "../../config";
import SubHeaderInfo from "../SubHeaderInfo/SubHeaderInfo";
import SubHeaderNav from "../SubHeaderNav/SubHeaderNav";
import {subHeaderMenuList, subHeaderUtilityList} from "../../utils/constants/menuTopics";

import "./SubHeader.scss";


const SubHeader = () => {
  const pathname= useLocation().pathname;
  const cddPath = ["/select-data-type", "/manage-data-download"];

  useEffect(()=>{
    setCategorySelected([
      pathname==="/",
      cddPath.includes(pathname), false, false, false, false
    ])
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname]);

  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false, false, false, false]);
  const [categorySelected, setCategorySelected] =
    useState([
      pathname==="/",
      cddPath.includes(pathname), false, false, false, false]);

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column);

    setCategorySelected([
      pathname==="/",
      cddPath.includes(pathname), false, false, false, false
    ])
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
          <Title className="float-left margin-0">
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
          {/* <SubHeaderNav
              handleSubMenuClick={handleSubMenuClick}
              categorySelected={categorySelected}
              menuList={subHeaderMenuList}
              navDropdownOpen={navDropdownOpen}
              handleToggleNavDropdown={handleToggleNavDropdown}
              isUtility={true}
            /> */}
            <SubHeaderNav
              handleSubMenuClick={handleSubMenuClick}
              categorySelected={categorySelected}
              menuList={subHeaderMenuList}
              navDropdownOpen={navDropdownOpen}
              handleToggleNavDropdown={handleToggleNavDropdown}
            />
          </div>
        </div>
        {categorySelected[0] && <SubHeaderInfo />}
      </Header>
    </div>
  );
};

export default SubHeader;
