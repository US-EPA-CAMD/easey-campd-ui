import React from "react";
import TimePeriod from "../../hourlyEmissions/TimePeriod/TimePeriod";
import Programs from "../../hourlyEmissions/Programs/Programs";

const FlyOutPanel = ({
  show,
  selectedDataSubtype,
  selectedFilter,
  closeFlyOutHandler,
}) => {
  const hourlyEmissions = {
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} />,
    program: <Programs closeFlyOutHandler={closeFlyOutHandler}/>
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
        <div className="side-panel bg-base-lightest margin-0 position-relative z-top">
          <div className="padding-top-6 padding-bottom-3 padding-x-2">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FlyOutPanel;
