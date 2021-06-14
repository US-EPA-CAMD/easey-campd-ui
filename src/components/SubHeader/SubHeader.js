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
    //false,
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
            process.env.PUBLIC_URL + '/images/header-bg.png'
          })`,
        }}
      >
        <div className="usa-nav-container">
          <div className="margin-left-3">
            <Title className="float-left clearfix margin-left-9">
              <h1 className="text-white font-alt-xl text-normal margin-0" >
                CAMPD: Clean Air Markets Program Data
              </h1>
            </Title>
          </div>
          <PrimaryNav
            className="float-right clearfix margin-right-3 margin-top-3"
            items={[
              <>
                <a
                  id="extended-nav-section-one"
                  href={config.app.path}
                  title="Home"
                  aria-label="Home"
                >
                  HOME
                </a>
              </>,
              <>
                <NavDropDownButton
                  key="testItemTwo"
                  label="DATA"
                  menuId="menuData"
                  isOpen={navDropdownOpen[0]}
                  onToggle={() => {
                    handleToggleNavDropdown(0);
                  }}
                />
                <Menu
                  id="extended-nav-section-two"
                  items={[
                    <Link
                      to=""
                      onClick={(event) =>
                        handleSubMenuClick('select-data-type', 0)
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
                  isOpen={navDropdownOpen[0]}
                />
                {categorySelected[0] === true ? (
                  <div className="menu-underline" />
                ) : null}
              </>,
              <>
                <NavDropDownButton
                  key="testItemThree"
                  label="ANALYSIS"
                  menuId="menuAnalysis"
                  isOpen={navDropdownOpen[1]}
                  onToggle={() => {
                    handleToggleNavDropdown(1);
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
                  isOpen={navDropdownOpen[1]}
                />
              </>,
              <>
                <NavDropDownButton
                  key="testItemFour"
                  label="VISUALIZATION"
                  menuId="menuVisualization"
                  isOpen={navDropdownOpen[2]}
                  onToggle={() => {
                    handleToggleNavDropdown(2);
                  }}
                  isCurrent={true}
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
                  isOpen={navDropdownOpen[2]}
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
