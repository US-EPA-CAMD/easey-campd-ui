import React from "react";
import {useLocation} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./SubHeader.scss";
import config from "../../config";

const SubHeader = () => {
  const location = useLocation();
  const basepath = config.app.path==="/campd"?"/campd/":config.app.path;
  const dataMenuLinks = [
    `${basepath}select-data-type`,
    `${basepath}manage-data-download`,
    `${basepath}campd/datasets`,
    `${basepath}campdApi`,
  ];
  const analysisMenuLinks = [`${basepath}analysis`];
  const visualizationMenuLinks = [`${basepath}visualization`];
  const className = "menu active";
  const pathname = location.pathname;
  return (
    <>
      <Navbar bg="dark" variant="dark" className="navBar">
        <Navbar.Brand
          href={config.app.path}
          className="title font-weight-light react-transition swipe-up"
        >
          Clean Air Markets Program Data
        </Navbar.Brand>
        <Nav className="mr-auto clearfix epa-subheader react-transition swipe-left">
          <NavDropdown
            title="Data"
            id="collasible-nav-dropdown"
            className={dataMenuLinks.includes(pathname) ? className : ""}
          >
            <NavDropdown.Item href={dataMenuLinks[0]}>
              Custom Data Download
            </NavDropdown.Item>
            <NavDropdown.Item href={dataMenuLinks[2]}>Datasets</NavDropdown.Item>
            <NavDropdown.Item href={dataMenuLinks[3]}>
              CAMPD API
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Analysis"
            id="collasible-nav-dropdown"
            className={analysisMenuLinks.includes(pathname) ? className : ""}
          >
            <NavDropdown.Item href={analysisMenuLinks[0]}>Analysis</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Visualization"
            id="collasible-nav-dropdown"
            className={
              visualizationMenuLinks.includes(pathname) ? className : ""
            }
          >
            <NavDropdown.Item href={visualizationMenuLinks[0]}>
              Visualization
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default SubHeader;
