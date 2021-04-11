import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SubHeader.scss";
import config from "../../config";
import {
  Menu,
  Header,
  PrimaryNav,
  NavDropDownButton,
  Title,
} from "@trussworks/react-uswds";
import { Link } from "react-router-dom";

const SubHeader = () => {
  const history = useHistory();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState([false, false, false]);

  const handleToggleNavDropdown = (index) => {
    setNavDropdownOpen((prevNavDropdownOpen) => {
      const newOpenState = Array(prevNavDropdownOpen.length).fill(false);

      newOpenState[index] = !prevNavDropdownOpen[index];
      return newOpenState;
    });
  };

  const toggleMobileNav = () => {
    setMobileNavOpen((prevOpen) => !prevOpen);
  };

  const handleSubMenuClick = (route, column) => {
    handleToggleNavDropdown(column);
    history.push(route);
  };

  const dataMenuLinks = [
    "/",
    "/campd",
    "/campd/",
    "/campd/customdatadownload",
    "/campd/datasets",
    "/campd/campdApi",
  ];
  const analysisMenuLinks = ["/campd/analysis"];
  const visualizationMenuLinks = ["/campd/visualization"];
  const className = "menu active";
  const pathname = window.location.pathname;

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
                    <Link
                      onClick={(event) =>
                        handleSubMenuClick("select-data-type", 0)
                      }
                    >
                      Custom Data Download
                    </Link>,
                    <Link /*onClick={(event) => handleSubMenuClick("", 0)}*/>
                      Datasets
                    </Link>,
                    <Link /*onClick={(event) => handleSubMenuClick("", 0)}*/>
                      CAMPD API
                    </Link>,
                  ]}
                  isOpen={navDropdownOpen[0]}
                />
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
                    <Link /*onClick={(event) => handleSubMenuClick("", 1)}*/>
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
                    <Link /*onClick={(event) => handleSubMenuClick("", 2)}*/>
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
