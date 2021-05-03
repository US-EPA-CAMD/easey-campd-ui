import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import config from "../../config";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
} from "@trussworks/react-uswds";

import "./SubHeader.scss";

const SubHeader = () => {
  const history = useHistory();

  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false]);
  const [categorySelected, setCategorySelected] = useState([
    false,
    true,
    false,
    false,
  ]);

  const handleToggleNavDropdown = (column) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);

      newOpenState[column] = !prevNavDropdownOpen[column];
      return newOpenState;
    });
  };

  const handleSubMenuClick = (route, column) => {
    handleToggleNavDropdown(column);

    setCategorySelected((prevCategorySelected) => {
      const newCategorySelected = Array(prevCategorySelected.length).fill(
        false
      );
      newCategorySelected[column] = true;
      return newCategorySelected;
    });

    history.push(route);
  };

  return (
    <div className="subheaderWrapper">
      <Header
        className="padding-y-3"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/header-bg.png"
          })`,
        }}
      >
        <div className="usa-nav-container">
          <div className="margin-left-9">
            <Title className="float-left clearfix margin-left-9">
              <a
                href={config.app.path}
                title="Home"
                aria-label="Home"
                className="text-white font-alt-xl text-normal"
              >
                CAMPD: Clean Air Markets Program Data
              </a>
            </Title>
          </div>
          <PrimaryNav
            className="float-right clearfix margin-right-9 margin-top-3"
            items={[
              <>
                <a
                  href={config.app.path}
                  title="Home"
                  aria-label="Home"
                  className="text-white"
                >
                  HOME
                </a>
              </>,
              <>
                <NavDropDownButton
                  className="text-white"
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
                      to=""
                      onClick={(event) =>
                        handleSubMenuClick("select-data-type", 1)
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
                  className="text-white"
                  key="testItemThree"
                  label="ANALYSIS"
                  menuId="menuAnalysis"
                  isOpen={navDropdownOpen[2]}
                  onToggle={() => {
                    handleToggleNavDropdown(2);
                  }}
                  isCurrent={true}
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
                  className="text-white"
                  key="testItemFour"
                  label="VISUALIZATION"
                  menuId="menuVisualization"
                  isOpen={navDropdownOpen[3]}
                  onToggle={() => {
                    handleToggleNavDropdown(3);
                  }}
                  isCurrent={true}
                />
                <Menu
                  id="extended-nav-section-four"
                  items={[
                    <Link
                      to="" /*onClick={(event) => handleSubMenuClick("", 3)}*/
                    >
                      Visualization
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[3]}
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
