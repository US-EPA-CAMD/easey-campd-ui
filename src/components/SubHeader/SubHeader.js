import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./SubHeader.scss";
import config from "../../config";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
} from "@trussworks/react-uswds";

const SubHeader = () => {
  const history = useHistory();

  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false]);
  const [categorySelected, setCategorySelected] = useState([
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
      <Header className="bg-base-darkest padding-y-3">
        <div className="usa-nav-container">
          <div className="margin-left-9">
            <Title className="float-left clearfix margin-left-9">
              <a
                href={config.app.path}
                title="Home"
                aria-label="Home"
                className="text-white"
              >
                Clean Air Markets Program Data
              </a>
            </Title>
          </div>
          <PrimaryNav
            className="float-right clearfix margin-right-9 margin-top-3"
            items={[
              <>
                <NavDropDownButton
                  className="text-white"
                  key="testItemOne"
                  label="Data"
                  menuId="menuData"
                  isOpen={navDropdownOpen[0]}
                  onToggle={() => {
                    handleToggleNavDropdown(0);
                  }}
                />
                <Menu
                  id="extended-nav-section-one"
                  items={[
                    <Link to=""
                      onClick={(event) =>
                        handleSubMenuClick("select-data-type", 0)
                      }
                    >
                      Custom Data Download
                    </Link>,
                    <Link to="" /*onClick={(event) => handleSubMenuClick("", 0)}*/>
                      Datasets
                    </Link>,
                    <Link to="" /*onClick={(event) => handleSubMenuClick("", 0)}*/>
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
                  className="text-white"
                  key="testItemTwo"
                  label="Analysis"
                  menuId="menuAnalysis"
                  isOpen={navDropdownOpen[1]}
                  onToggle={() => {
                    handleToggleNavDropdown(1);
                  }}
                  isCurrent={true}
                />
                <Menu
                  id="extended-nav-section-two"
                  items={[
                    <Link to="" /*onClick={(event) => handleSubMenuClick("", 1)}*/>
                      Analysis
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[1]}
                />
              </>,
              <>
                <NavDropDownButton
                  className="text-white"
                  key="testItemThree"
                  label="Visualization"
                  menuId="menuVisualization"
                  isOpen={navDropdownOpen[2]}
                  onToggle={() => {
                    handleToggleNavDropdown(2);
                  }}
                  isCurrent={true}
                />
                <Menu
                  id="extended-nav-section-three"
                  items={[
                    <Link to="" /*onClick={(event) => handleSubMenuClick("", 2)}*/>
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
