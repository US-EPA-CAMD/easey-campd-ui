import React from "react";
import TimePeriod from "../../hourlyEmissions/TimePeriod/TimePeriod";

const FlyOutPanel = ({ show, selectedDataSubtype, selectedFilter, closeFlyOutHandler }) => {
  const hourlyEmissions = {
    "timePeriod": <TimePeriod closeFlyOutHandler={closeFlyOutHandler} />
  };

  const contentRenderer = () => {
    switch (selectedDataSubtype) {
      case "Hourly Emissions":
        return hourlyEmissions[selectedFilter];
      case "Daily Emissions":
        return;
      default:
        return;
    }
  };

  return (
    <>
      {show === true ? (
        <div className="side-panel bg-base-lightest margin-0 overlay">
          <div className="padding-top-6 padding-bottom-3 padding-left-6">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FlyOutPanel;
