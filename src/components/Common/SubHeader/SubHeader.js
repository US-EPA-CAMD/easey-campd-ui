import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import "./SubHeader.css";

const SubHeader = () => {
  const dataMenuLinks=["/","/campd","/campd/", "/campd/customdatadownload","/campd/datasets","/campd/campdApi"];
  const analysisMenuLinks = ["/campd/analysis"];
  const visualizationMenuLinks = ["/campd/visualization"];
  const className = "menu active";
  const pathname = window.location.pathname;
  return (
    <>
    <Navbar bg="dark" variant="dark" className="navBar">
      <Navbar.Brand href="/" className="title font-weight-light">Clean Air Markets Program Data</Navbar.Brand>
        <Nav className="mr-auto justify-content-end menuList">
          <NavDropdown title="Data" id="collasible-nav-dropdown" 
            className={dataMenuLinks.includes(pathname)? className:""}>
            <NavDropdown.Item href="/campd/">Custom Data Download</NavDropdown.Item>
            <NavDropdown.Item href="/campd/datasets">Datasets</NavDropdown.Item>
            <NavDropdown.Item href="/campd/campdApi">CAMPD API</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Analysis" id="collasible-nav-dropdown"
            className={analysisMenuLinks.includes(pathname)? className:""}>
            <NavDropdown.Item href="/campd/analysis">Analysis</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Visualization" id="collasible-nav-dropdown"
            className={visualizationMenuLinks.includes(pathname)? className:""}>
          <NavDropdown.Item href="/campd/visualization">Visualization</NavDropdown.Item>
          </NavDropdown>
        </Nav>
    </Navbar>
    </>
  );
};

export default SubHeader;
