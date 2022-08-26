import React, {useEffect, useState} from "react";
import TimePeriod from "../timePeriod/TimePeriod/TimePeriod";
import TimePeriodComboBox from "../timePeriod/TimePeriodComboBox/TimePeriodComboBox";
import Program from "../Program/Program";
import Facility from "../Facility/Facility";
import UnitType from "../UnitType/UnitType";
import FuelType from "../FuelType/FuelType";
import StateTerritory from "../StateTerritory/StateTerritory";
import ControlTechnology from "../ControlTechnology/ControlTechnology";
import {FILTERS_MAP} from "../../../utils/constants/customDataDownload";
import AccountType from "../AccountType/AccountType";
import AccountNameNumber from "../AccountNameNumber/AccountNameNumber";
import OwnerOperator from "../OwnerOperator/OwnerOperator";
import TransactionType from "../TransactionType/TransactionType";
import SourceCategory from "../SourceCategory/SourceCategory";
import { focusTrap } from "../../../utils/ensure-508/focus-trap";
import useCheckWidth from "../../../utils/hooks/useCheckWidth.js";
const FilterCriteriaPanel = ({
  show,
  selectedDataSubtype,
  selectedFilter,
  closeFlyOutHandler,
  applyFilterLoading,
  setApplyFilterLoading,
}) => {

  const [childrenRendered, setChildrenRendered] = useState(false);
  const [firstFocusableEl, setFirstFocusableEl] = useState(null);
  const isMobileOrTablet = useCheckWidth([0, 1024]);
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
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    unitType: <UnitType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    fuelType: <FuelType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler}renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    controlTechnology: <ControlTechnology closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
  };

  const allowances = {
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    accountType: <AccountType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    accountNameNumber: <AccountNameNumber closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    ownerOperator: <OwnerOperator closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
  };

  const compliances = {
    facility: <Facility closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    stateTerritory: <StateTerritory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    ownerOperator: <OwnerOperator closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    comboBoxYear: <TimePeriodComboBox closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} filterToApply={'Year'}/>,
  }

  const hourlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} filterToApply={'Time Period'}/>,
  };

  const dailyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showOpHrsOnly={false} filterToApply={'Time Period'}/>,
  }

  const monthlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showYear={true} showMonth={true} filterToApply={'Time Period'}/>,
  }

  const quarterlyEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showYear={true} showQuarter={true} filterToApply={'Time Period'}/>,
  }

  const annualEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showYear={true} isAnnual={true} filterToApply={'Time Period'}/>,
  }

  const ozoneEmissions = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showYear={true} filterToApply={'Time Period'}/>,
  }

  //isAnnual is specified for year validation
  const facilityUnitAttributes = {
    ...emissions,
    timePeriod: <TimePeriod closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showYear={true} isAnnual = {true} filterToApply={'Time Period'}/>,
    sourceCategory: <SourceCategory closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
  }

  const matsHourlyEmissions = {
    ...emissions
  }

  const allownaceAcctInfo = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
  };

  const allowanceHoldings = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} showActiveOnly={true}/>,
    comboBoxYear: <TimePeriodComboBox closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} filterToApply={'Vintage Year'}/>
  };

  const allownaceTransactions = {
    ...allowances,
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    comboBoxYear: <TimePeriodComboBox closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading} filterToApply={'Vintage Year'}/>,
    transactionDate:
      <TimePeriod
        closeFlyOutHandler={closeFlyOutHandler}
        showOpHrsOnly={false}
        renderedHandler={renderedHandler}
        isAllowance={true}
        filterToApply={'Transaction Date'}
        applyFilterLoading={applyFilterLoading}
        setApplyFilterLoading={setApplyFilterLoading}
      />,
      transactionType: <TransactionType closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
  };

  const complianceAllownaceBased = {
    program: <Program closeFlyOutHandler={closeFlyOutHandler} renderedHandler={renderedHandler} applyFilterLoading={applyFilterLoading} setApplyFilterLoading={setApplyFilterLoading}/>,
    ...compliances
  };

  const complianceEmissionsBased = {
    ...compliances,
  }

  const emissionsSubTypes = Object.keys(FILTERS_MAP.EMISSIONS);
  const allowanceSubTypes = Object.keys(FILTERS_MAP.ALLOWANCE);
  const complianceSubTypes = Object.keys(FILTERS_MAP.COMPLIANCE);
  const facilitySubTypes = Object.keys(FILTERS_MAP.FACILITY);
  const matsSubTypes = Object.keys(FILTERS_MAP["MERCURY AND AIR TOXICS EMISSIONS"]);

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
      case facilitySubTypes[0]:
        return facilityUnitAttributes[selectedFilter];
      case matsSubTypes[0]:
        return matsHourlyEmissions[selectedFilter];
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
        <div className={`filter-panel side-nav-height bg-base-lightest margin-0 shadow-5 
        ${isMobileOrTablet? 'position-absolute width-full tablet:width-mobile-lg minh-viewport': ''}`}>
          <div className="padding-top-6 padding-bottom-3 padding-x-1">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterCriteriaPanel;
