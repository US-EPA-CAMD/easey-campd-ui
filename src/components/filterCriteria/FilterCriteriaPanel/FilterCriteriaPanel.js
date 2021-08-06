import React, {useEffect, useState} from "react";
import TimePeriod from "../timePeriod/TimePeriod/TimePeriod";
import Program from "../Program/Program";
import Facility from "../Facility/Facility";
import UnitType from "../UnitType/UnitType";
import FuelType from "../FuelType/FuelType";
import StateTerritory from "../StateTerritory/StateTerritory";
import ControlTechnology from "../ControlTechnology/ControlTechnology";
import {FILTERS_MAP} from "../../../utils/constants/customDataDownload";
import AccountType from "../AccountType/AccountType";
import AccountNameNumber from "../AccountNameNumber/AccountNameNumber";
import { focusTrap } from "../../../utils/ensure-508/focus-trap";

const FilterCriteriaPanel = ({
  show,
  selectedDataSubtype,
  selectedFilter,
  closeFlyOutHandler,
}) => {

  const [childrenRendered, setChildrenRendered] = useState(false);
  const [firstFocusableEl, setFirstFocusableEl] = useState(null);

  useEffect(() => {
    if(show && childrenRendered){
      const { firstComponentFocusableElement, handleKeyPress } = focusTrap(".filter-panel");
      // set focus to first element only once
      if(firstFocusableEl === null && firstComponentFocusableElement){
        setFirstFocusableEl(firstComponentFocusableElement);
        firstComponentFocusableElement.focus();
      }
      // *** FOCUS TRAP
      document.addEventListener("keydown", handleKeyPress);
      // * clean up
      return () => {
        setChildrenRendered(false);
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
    if(!show){
      setFirstFocusableEl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, childrenRendered]);

  const renderedHandler = () =>{
    setChildrenRendered(true)
  };
  const emissions = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} dataType = {'emissions'}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    unitType: <UnitType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    fuelType: <FuelType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}renderedHandler={renderedHandler}/>,
    controlTechnology: <ControlTechnology closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
  };

  const allowances = {
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    accountType: <AccountType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    accountNameNumber: <AccountNameNumber closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>
  }

  const hourlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
  };

  const dailyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showOpHrsOnly={false}/>,
  }

  const monthlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} showMonth={true}/>,
  }

  const quarterlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} showQuarter={true}/>,
  }

  const annualEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} isAnnual={true} />,
  }

  const ozoneEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} />,
  }

  const allownaceAcctInfo = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} dataType={'allowance'}/>,
  };

  const allowanceHoldings = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} dataType={'allowance'} showActiveOnly={true}/>,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} isVintage={true}/>
  };

  const allownaceTransactions = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} dataType={'allowance'}/>,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} showYear={true} isVintage={true}/>
  };

  const complianceAllownaceBased = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} dataType={'compliance'}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
  };

  const complianceEmissionsBased = {
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler}/>,
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
        return quarterlyEmissions[selectedFilter];
      case emissionsSubTypes[4]:
        return ozoneEmissions[selectedFilter]
      case emissionsSubTypes[5]:
        return annualEmissions[selectedFilter];
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
        <div className="filter-panel side-nav-height bg-base-lightest margin-0 shadow-5">
          <div className="padding-top-6 padding-bottom-3 padding-x-1">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterCriteriaPanel;
