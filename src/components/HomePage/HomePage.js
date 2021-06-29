import React from "react";
import { Button } from "@trussworks/react-uswds";
import { useHistory } from "react-router-dom";

const HomePage = () =>{
  const history = useHistory();
  return(
    <div className="grid-row mobile-lg:padding-x-2 desktop:padding-x-4">
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-12 desktop:grid-col-6 desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-data.svg`}
          alt="Data Icon"
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0">Data</h2>
          <p className="font-body-sm text-ls-1 line-height-sans-6">
            Create custom queries, download bulk datasets and use the CAMD API to retrieve emissions, allowance and compliance data.
          </p>
          <Button
            className="bg-accent-cool-dark radius-md"
            onClick={()=>history.push("/select-data-type")}
          >
            Start your data query
          </Button>
        </div>
      </div>
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-12 desktop:grid-col-6 desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-analysis.svg`}
          alt="Analysis Icon"
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0 mobile-lg:display-inline">Analysis</h2>
          <div className="bg-base-light width-15 height-3 margin-left-1 mobile-lg:display-inline">
            <span className="text-white font-body-xs text-uppercase text-light padding-1">Coming Soon</span>
          </div>
          <p className="font-body-sm text-ls-1 line-height-sans-6">
            View and download common analyses, reports, insights and other information using CAMPD data.
          </p>
        </div>
      </div>
      <div className="margin-y-3 display-flex flex-row flex-align-start mobile-lg:grid-col-12 desktop-lg:grid-col-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-visualization.svg`}
          alt="Visualization Icon"
        />
        <div className="margin-left-4">
          <h2 className="text-primary-dark font-heading-xl text-bold margin-top-0 mobile-lg:display-inline desktop:display-block desktop:margin-bottom-0">Visualization</h2>
          <div className="bg-base-light width-15 height-3 margin-left-1 mobile-lg:display-inline desktop:display-block">
            <span className="text-white font-body-xs text-uppercase text-light padding-1">Coming Soon</span>
          </div>
          <p className="font-body-sm text-ls-1 line-height-sans-6">
            Visualize and interact with CAMPD data graphically and through maps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;