import React, { useEffect } from "react";
import { Button } from "@trussworks/react-uswds";
import { useHistory } from "react-router-dom";
import "./DataLandingPage.scss";

const DataLandingPage = () => {
  useEffect(() => {
    document.title = "CAMPD - Data Landing Page";
  }, []);

  const history = useHistory();
  return(

    <div className="mobile-lg:padding-x-7 desktop:margin-x-9 desktop:padding-x-4 desktop-lg:padding-x-7 margin-y-2">
      <h1 className="text-base-darkest font-alt-2xl text-bold">Data</h1>
      <h2 className="text-base-darkest font-alt-lg text-normal text-ls-1 line-height-sans-6">
        CAMPD’s Data section serves all your bulk and custom data download needs.
      </h2>
      <p className="font-sans-sm text-base-darkest text-ls-1 line-height-sans-6 data-intro">
        {`Three download methods provide apportioned emissions, raw emissions, monitoring plan, QA, allowance, compliance and facility/unit data collected 
        from CAMD’s market-based trading programs. Users unfamiliar with the data may want to visit the “Tutorials” section under “Help” for more information 
        about the data as well has how to use the tools below.`}
      </p>

      <div className="grid-row">
        <div className="margin-y-2 margin-right-4 display-flex flex-column flex-align-start data-card">
          <h2 className="text-base-darkest font-heading-lg text-bold margin-y-0">Custom Data Download Tool</h2>
          <p className="font-body-sm text-base-darkest text-ls-1 line-height-sans-6">
          {`Users looking to build a custom query for a particular data type will find this tool flexible, fast, and easy to use. Apportioned emissions,
          allowance, compliance and facility/unit attributes data are available for filtering and querying to the user’s desired parameters.`}
          </p>
          <Button
            className="bg-accent-cool radius-md text-ink"
            onClick={()=>history.push("/select-data-type")}
          >
            Start your data query
          </Button>
        </div>
        <div className="margin-y-2 margin-right-4 display-flex flex-column flex-align-start data-card">
          <h2 className="text-base-darkest font-heading-lg text-bold margin-y-0">Static Datasets</h2>
          <p className="font-body-sm text-base-darkest text-ls-1 line-height-sans-6">
            {`For larger bulk data downloads, static datasets provide access to prepackaged datasets of apportioned emissions (including MATS), raw emissions, 
            monitoring plans, QA, allowance, and compliance data thru EPA’s FTP site. Additionally, modelers who use SMOKE data will find their annual datasets here.`}
          </p>
          <Button
            className="bg-accent-cool radius-md text-ink"
            onClick={()=>null}
          >
            Start browsing datasets
          </Button>
        </div>
        <div className="margin-y-2 display-flex flex-column flex-align-start data-card">
          <h2 className="text-base-darkest font-heading-lg text-bold margin-y-0">CAM API</h2>
          <p className="font-body-sm text-base-darkest text-ls-1 line-height-sans-6">
            {`CAMPD uses web services to display data via an Application Programming Interface (API). An API is a set of commands, functions, protocols, 
            and objects that programmers can use to create software or interact with an external system. An API interprets that data and presents 
            you with the information you wanted in a readable way. These services and associated documentation provide an additional means of accessing CAMPD’s data.`}
          </p>
          <Button
            className="bg-accent-cool radius-md margin-0 text-ink"
            onClick={()=>null}
          >
            Learn more about CAM API
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataLandingPage;
