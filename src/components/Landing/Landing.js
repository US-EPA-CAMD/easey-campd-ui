import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";

import { GovBanner } from "@trussworks/react-uswds";

import "./Landing.scss";

const Landing = () => {
  return (
    <div className="text-center">
      <div className="padding-top-2">
        This is a placeholder for the landing page. Content is pending...
      </div>
      <div className="padding-bottom-2">
        <a href="/select-data-type" className="text-bold text-secondary-darker">
          Click here to proceed to Select Data Type screen
        </a>
      </div>
      <div>
        <img src="images/epa-hq-building.jpg" className="full-width-image" />
      </div>
    </div>
  );
};

export default Landing;
