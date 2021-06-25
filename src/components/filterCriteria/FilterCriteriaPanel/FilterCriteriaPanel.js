import React from "react";
import TimePeriod from "../TimePeriod/TimePeriod";
import Program from "../Program/Program";
import Facility from "../Facility/Facility";
import UnitType from "../UnitType/UnitType";
import FuelType from "../FuelType/FuelType";
import StateTerritory from "../StateTerritory/StateTerritory";
import ControlTechnology from "../ControlTechnology/ControlTechnology";
import {FILTERS_MAP} from "../../../utils/constants/customDataDownload";

const FilterCriteriaPanel = ({
  show,
  selectedDataSubtype,
  selectedFilter,
  closeFlyOutHandler,
}) => {
  const emissions = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    unitType: <UnitType closeFlyOutHandler={closeFlyOutHandler}/>,
    fuelType: <FuelType closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
    controlTechnology: <ControlTechnology closeFlyOutHandler={closeFlyOutHandler}/>,
  };

  const hourlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} />,
  };

  const dailyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} showOpHrsOnly={false}/>,
  }

  const monthlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} showYear={true}/>,
  }

  const allownaceAcctInfo = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} allowanceOnly={true}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
  };

  const allowanceHoldings = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} allowanceOnly={true} showActiveOnly={true}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
  };

  const allownaceTransactions = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} allowanceOnly={true}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
  };

  const complianceAllownaceBased = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} allowanceOnly={true}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
  };

  const complianceEmissionsBased = {
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}/>,
  }

  const emissionsSubTypes = Object.keys(FILTERS_MAP.EMISSIONS);
  const allowanceSubTypes = Object.keys(FILTERS_MAP.ALLOWANCE);
  const complianceSubTypes = Object.keys(FILTERS_MAP.COMPLIANCE);

  const contentRenderer = () => {
    switch (selectedDataSubtype) {
      case emissionsSubTypes[0]:
        return hourlyEmissions[selectedFilter];
      case emissionsSubTypes[1]:
        return dailyEmissions[selectedFilter];
      case emissionsSubTypes[2]:
        return monthlyEmissions[selectedFilter];
      case emissionsSubTypes[3]:
      case emissionsSubTypes[4]:
      case emissionsSubTypes[5]:
      case emissionsSubTypes[6]:
        return emissions[selectedFilter];
      case allowanceSubTypes[0]:
        return allownaceAcctInfo[selectedFilter];
      case allowanceSubTypes[1]:
        return allowanceHoldings[selectedFilter];
      case allowanceSubTypes[2]:
        return allownaceTransactions[selectedFilter];
      case complianceSubTypes[0]:
        return complianceAllownaceBased[selectedFilter];
      case complianceSubTypes[1]:
        return complianceEmissionsBased[selectedFilter];
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

export default FilterCriteriaPanel;
