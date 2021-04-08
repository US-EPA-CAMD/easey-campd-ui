import React, { useState } from "react";
import { connect } from "react-redux";
import {updateTimePeriod} from "../../../store/actions/emissionsFilter";
import TimePeriodRender from "./TimePeriodRender";

export const TimePeriod = ({timePeriod, updateTimePeriodDispatcher, closeFlyOutHandler}) =>{
  const [formState, setFormState] = useState({
    startDate:timePeriod.startDate,
    endDate:timePeriod.endDate,
    opHrsOnly:timePeriod.opHrsOnly
  });

  const applyFilterHandler = (evt) =>{
    evt.preventDefault();
    updateTimePeriodDispatcher(formState);
    closeFlyOutHandler();
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

  const isApplyFilterDisabled = () =>{
    return !(formState.startDate && formState.endDate);
  };

  const onInvalidHandler = (evt) =>{
    evt.preventDefault();
  };

  return(<TimePeriodRender
    applyFilterHandler={applyFilterHandler}
    handleStartDateUpdate={handleStartDateUpdate}
    handleEndDateUpdate={handleEndDateUpdate}
    handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
    isApplyFilterDisabled={isApplyFilterDisabled}
    onInvalidHandler={onInvalidHandler}
    formState={formState}
    closeFlyOutHandler={closeFlyOutHandler}/>);

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

