import React from "react";
import { Link } from "react-router-dom";

import "./Landing.scss";

const Landing = () => {
  return (
    <div className="text-center" data-testid="Landing">
      <div className="padding-top-2" data->
        This is a placeholder for the landing page. Content is pending...
      </div>
      <div className="padding-bottom-2">
        <Link
          to="/select-data-type"
          className="text-bold text-secondary-darker"
        >
          Click here to proceed to Select Data Type screenhaha
        </Link>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/images/epa-hq-building.jpg`}
          className="full-width-image"
        />
      </div>
    </div>
  );
};

export default Landing;
