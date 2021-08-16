import React, { useEffect } from "react";
import { Button, Tag } from "@trussworks/react-uswds";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    document.title = "CAMPD - Home";
  }, []);

  const history = useHistory();
  return(
    <div className="grid-row mobile-lg:padding-x-2 desktop:padding-x-4">
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-12 desktop:grid-col-6 desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-data.svg`}
          alt=""
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0">Data</h2>
          <p className="font-body-sm text-ls-1 line-height-sans-6 desktop:width-mobile">
            Create custom queries, download bulk datasets and use the CAM API to retrieve emissions, allowance and compliance data.
          </p>
          <Button
            className="bg-accent-cool radius-md text-black"
            onClick={()=>history.push("/select-data-type")}
          >
            Start your data query
          </Button>
        </div>
      </div>
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-12 desktop:grid-col-6 desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-analysis.svg`}
          alt=""
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0 mobile-lg:display-inline">Analysis</h2>
          <Tag  className="margin-left-1 mobile-lg:display-inline">Coming Soon</Tag>
          <p className="font-body-sm text-ls-1 line-height-sans-6 desktop:width-mobile">
            View and download common analyses, reports, insights and other information using CAMPD data.
          </p>
        </div>
      </div>
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-auto desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-visualization.svg`}
          alt=""
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0 mobile-lg:display-inline desktop-lg:display-block desktop-lg:margin-bottom-0 widescreen:display-inline">Visualization</h2>
          <Tag className="margin-left-1">Coming Soon</Tag>
          <p className="font-body-sm text-ls-1 line-height-sans-6 desktop:width-mobile">
            Visualize and interact with CAMPD data graphically and through maps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
