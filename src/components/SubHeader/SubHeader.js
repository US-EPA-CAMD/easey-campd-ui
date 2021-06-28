import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
  Button,
} from "@trussworks/react-uswds";

import "./SubHeader.scss";

const SubHeader = () => {

  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false, false, false, false]);
  const [categorySelected, setCategorySelected] = useState([false, true, false, false, false, false]);

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);
      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (column) => {
    handleToggleNavDropdown(column);

    setCategorySelected((prevCategorySelected) => {
      const newCategorySelected = Array(prevCategorySelected.length).fill(false);
      newCategorySelected[column] = true;
      return newCategorySelected;
    });
  };

  return (
    <div className="subheader-wrapper">
      <Header
        className="padding-y-2 mobile-lg:height-6 desktop:height-15"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + '/images/header-bg.png'
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          alignSelf: "top center"
        }}
      >
        <div className="usa-nav-container clearfix">
          <Title className="float-left margin-0">
            <h1 className="display-inline-block text-white text-heavy desktop-lg:font-sans-3xl desktop:font-sans-2xl mobile-lg:font-sans-xl margin-0" >
              CAMPD
            </h1>
            <span
              className="display-none desktop:display-block desktop-lg:display-inline-block desktop-lg:margin-left-1 text-white text-normal font-sans-md width-card text-wrap">
              Clean Air Markets Program Data
            </span>
          </Title>
          <Button
            className="desktop:display-none float-right bg-transparent"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/mobile-menu-expand.svg`}
              alt="Expandable Menu"
            />
          </Button>
          <PrimaryNav
            className="desktop float-right desktop:margin-top-3 desktop-lg:margin-top-0"
            items={[
              <>
                <a
                  id="extended-nav-section-one"
                  href={config.app.path}
                  title="Home"
                  aria-label="Home"
                  onClick={()=>handleSubMenuClick(0)}
                >
                  HOME
                </a>
                {categorySelected[0] === true ? (
                  <div className="menu-underline" />
                ) : null}
              </>,
              <>
                <NavDropDownButton
                  key="testItemTwo"
                  label="DATA"
                  menuId="menuData"
                  isOpen={navDropdownOpen[1]}
                  onToggle={() => {
                    handleToggleNavDropdown(1);
                  }}
                />
                <Menu
                  id="extended-nav-section-two"
                  items={[
                    <Link
                      to="/select-data-type"
                      onClick={() =>
                        handleSubMenuClick(1)
                      }
                    >
                      Custom Data Download
                    </Link>,
                    <Link
                      to="" /*onClick={(event) => handleSubMenuClick("", 1)}*/
                    >
                      Datasets
                    </Link>,
                    <Link
                      to="" /*onClick={(event) => handleSubMenuClick("", 1)}*/
                    >
                      CAMPD API
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[1]}
                />
                {categorySelected[1] === true ? (
                  <div className="menu-underline" />
                ) : null}
              </>,
              <>
                <NavDropDownButton
                  key="testItemThree"
                  label="ANALYSIS"
                  menuId="menuAnalysis"
                  isOpen={navDropdownOpen[2]}
                  onToggle={() => {
                    handleToggleNavDropdown(2);
                  }}
                />
                <Menu
                  id="extended-nav-section-three"
                  items={[
                    <Link
                      to="" /*onClick={(event) => handleSubMenuClick("", 2)}*/
                    >
                      Analysis
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[2]}
                />
              </>,
              <>
                <NavDropDownButton
                  key="testItemFour"
                  label="VISUALIZATION"
                  menuId="menuVisualization"
                  isOpen={navDropdownOpen[3]}
                  onToggle={() => {
                    handleToggleNavDropdown(3);
                  }}
                />
                <Menu
                  id="extended-nav-section-four"
                  items={[
                    <Link
                      to="" /*onClick={(event) => handleSubMenuClick("", 2)}*/
                    >
                      Visualization
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[3]}
                />
              </>,
              <>
              <NavDropDownButton
                key="testItemFive"
                label="CAM API"
                menuId="menuCamApi"
                isOpen={navDropdownOpen[4]}
                onToggle={() => {
                  handleToggleNavDropdown(4);
                }}
              />
              <Menu
                id="extended-nav-section-five"
                items={[
                  <Link
                    to="" /*onClick={(event) => handleSubMenuClick("", 2)}*/
                  >
                    CAM API
                  </Link>,
                ]}
                isOpen={navDropdownOpen[4]}
              />
            </>,
            <>
              <NavDropDownButton
                key="testItemSix"
                label="HELP"
                menuId="menuHelp"
                isOpen={navDropdownOpen[5]}
                onToggle={() => {
                  handleToggleNavDropdown(5);
                }}
              />
              <Menu
              id="extended-nav-section-six"
              items={[
                <Link
                  to="" /*onClick={(event) => handleSubMenuClick("", 2)}*/
                >
                  Help
                </Link>,
              ]}
              isOpen={navDropdownOpen[5]}
            />
            </>,
            ]}
          />
        </div>
      </Header>
    </div>
  );
};

export default SubHeader;
