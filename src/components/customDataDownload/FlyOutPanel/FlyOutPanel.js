import React from "react";
import TimePeriod from "../../hourlyEmissions/TimePeriod/TimePeriod";
import Program from "../../hourlyEmissions/Program/Program";
import Facility from "../../hourlyEmissions/Facility/Facility";
import UnitType from "../../hourlyEmissions/UnitType/UnitType";


const FlyOutPanel = ({
  show,
  selectedDataSubtype,
  selectedFilter,
  closeFlyOutHandler,
}) => {
  const hourlyEmissions = {
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} />,
    program: <Program closeFlyOutHandler={closeFlyOutHandler}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    unitType: <UnitType closeFlyOutHandler={closeFlyOutHandler}/>,
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
        <div className="side-panel bg-base-lightest margin-0 position-relative z-top shadow-5">
          <div className="padding-top-6 padding-bottom-3 padding-x-1">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FlyOutPanel;
