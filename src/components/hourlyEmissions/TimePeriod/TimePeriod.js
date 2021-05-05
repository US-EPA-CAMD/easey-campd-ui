import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {updateTimePeriod} from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import {addAppliedFilter} from "../../../store/actions/customDataDownload/customDataDownload";
import TimePeriodRender from "./TimePeriodRender";
import {isDateFormatValid, isDateRangeValid} from "../../../utils/dateValidation/dateValidation";
import {isAddedToFilters, formatDateToUi, formatDateToApi} from "../../../utils/selectors/hourlyEmissions";

export const TimePeriod = ({
  timePeriod,
  updateTimePeriodDispatcher,
  addAppliedFilterDispatcher,
  appliedFilters,
  closeFlyOutHandler}) =>{

  const [formState, setFormState] = useState({
    startDate:formatDateToUi(timePeriod.startDate),
    endDate:formatDateToUi(timePeriod.endDate),
    opHrsOnly:timePeriod.opHrsOnly
  });

  const [validations, setValidations] = useState({
    startDateFormat: true,
    endDateFormat: true,
    dateRange: true
  });

  const [applyFilterClicked, setApplyFilterClicked] = useState(false);

  const filterToApply= "timePeriod";

  useEffect(()=>{
    if(validations.startDateFormat && validations.endDateFormat && validations.dateRange && applyFilterClicked){
      updateTimePeriodDispatcher({
        startDate: formatDateToApi(formState.startDate),
        endDate: formatDateToApi(formState.endDate),
        opHrsOnly: formState.opHrsOnly
      });
      // TODO: update filterTag state when hit apply
      if(!isAddedToFilters(filterToApply, appliedFilters)){
        addAppliedFilterDispatcher({key: filterToApply, values: [`${formState.startDate} - ${formState.endDate}`]});
        if (formState.opHrsOnly) {
          addAppliedFilterDispatcher({key: 'opHoursOnly', values: ['Operating Hours Only']})
        }
      }
      closeFlyOutHandler();
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
    timePeriod: state.hourlyEmissions.timePeriod,
    appliedFilters: state.customDataDownload.appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispatcher: (timePeriod) => dispatch(updateTimePeriod(timePeriod)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriod);

