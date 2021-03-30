import React from "react";
import { ReactComponent as Logo } from './images/epaSeal.svg';
import "./Footer.scss";
import Menu from "../Menu/Menu";
import config from '../../config'

const Footer = () => {
  return (
    <div>
      <footer className="footerBar">
          <Logo className="footerLogo"/>
          <span className="content">United States Environmental Protection Agency</span>
          <span className="version">{config.app.version} published {config.app.published}</span>
          <Menu/>
      </footer>
    </div>
  );
};

export default Footer;
