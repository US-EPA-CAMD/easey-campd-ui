import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {updateTimePeriod} from "../../../store/actions/emissionsFilter";
import TimePeriodRender from "./TimePeriodRender";
import {isDateFormatValid, isDateRangeValid} from "../../../utils/DateValidation/Validation";

export const TimePeriod = ({timePeriod, updateTimePeriodDispatcher, closeFlyOutHandler}) =>{
  const [formState, setFormState] = useState({
    startDate:timePeriod.startDate,
    endDate:timePeriod.endDate,
    opHrsOnly:timePeriod.opHrsOnly
  });

  const [validations, setValidations] = useState({
    startDateFormat: true,
    endDateFormat: true,
    dateRange: true
  });

  const [applyFilterClicked, setApplyFilterClicked] = useState(false);

  useEffect(()=>{
    if(validations.startDateFormat && validations.endDateFormat && validations.dateRange){
      updateTimePeriodDispatcher(formState);
      if(applyFilterClicked){
        closeFlyOutHandler();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[validations]);

  const validateInput = () => {
    const updatedValidations = {};
    updatedValidations["startDateFormat"] = isDateFormatValid(formState.startDate);
    updatedValidations["endDateFormat"] = isDateFormatValid(formState.endDate);
    if(updatedValidations["startDateFormat"] && updatedValidations["endDateFormat"]){
      updatedValidations["dateRange"] = isDateRangeValid(formState.startDate, formState.endDate);
    }else{
      updatedValidations["dateRange"] = false;
    }
    setValidations({ ...validations, ...updatedValidations });
  };

  const onInvalidHandler = (evt) =>{
    evt.preventDefault();
    validateInput();
  };

  const applyFilterHandler = (evt) =>{
    evt.preventDefault();
    validateInput();
    setApplyFilterClicked(true);
  };

  const handleStartDateUpdate = (value) =>{
    setFormState({...formState, startDate:value});
  };
  const handleEndDateUpdate = (value) =>{
    setFormState({...formState, endDate:value});
  };
  const handleOptHrsOnlyUpdate = (evt) =>{
    setFormState({...formState, opHrsOnly:evt.target.checked});
  };

  return(<TimePeriodRender
    applyFilterHandler={applyFilterHandler}
    handleStartDateUpdate={handleStartDateUpdate}
    handleEndDateUpdate={handleEndDateUpdate}
    handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
    onInvalidHandler={onInvalidHandler}
    formState={formState}
    closeFlyOutHandler={closeFlyOutHandler}
    validations={validations}/>);

};

const mapStateToProps = (state) => {
  return {
    timePeriod: state.emissionsFilter.timePeriod
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispatcher: (timePeriod) => dispatch(updateTimePeriod(timePeriod)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriod);

