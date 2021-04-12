import React from "react";
import { Form, Checkbox, Button, DateRangePicker, ValidationChecklist, ValidationItem, Alert} from '@trussworks/react-uswds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const TimePeriodRender = ({
  applyFilterHandler,
  handleStartDateUpdate,
  handleEndDateUpdate,
  handleOptHrsOnlyUpdate,
  formState,
  onInvalidHandler,
  closeFlyOutHandler,
  validations}) =>{

  const formatDate = (dateString) =>{
    if(dateString){
      const dateStringParts = dateString.split('/');
      return `${dateStringParts[2]}-${dateStringParts[0]}-${dateStringParts[1]}`
    }
  };

  const isFormValid = () =>{
    return (validations.dateFormat && validations.dateRange);
  };

  const isApplyFilterDisabled = () =>{
    return !(formState.startDate && formState.endDate);
  };

  return(
    <Form onSubmit={applyFilterHandler}>
      <div className="font-alt-xl text-bold padding-top-2 padding-left-6">
        Time Period
        <FontAwesomeIcon
            icon={faQuestionCircle}
            className="text-gray-30 font-body-md question-icon"
        />
      </div>
      <hr/>
      <Alert type="info" validation heading="Requirements" style={{display:isFormValid()?"none":"block"}}>
        <ValidationChecklist id="validate-time-period">
          <ValidationItem id="dateFormat" isValid={validations.dateFormat}>
            Enter the time period in the MM/DD/YYYY format
          </ValidationItem>
          <ValidationItem id="dateRange" isValid={validations.dateRange}>
            Enter a start date that is greater than or equal to the end date
          </ValidationItem>
        </ValidationChecklist>
      </Alert>
      <DateRangePicker
        endDateHint="mm/dd/yyyy"
        endDateLabel="End Date (Required)"
        endDatePickerProps={{
          defaultValue:formatDate(formState.endDate),
          onChange: handleEndDateUpdate,
          onInvalid:onInvalidHandler,
          disabled: undefined,
          id: 'event-date-end',
          name: 'endDate'
        }}
        startDateHint="mm/dd/yyyy"
        startDateLabel="Start Date (Required)"
        startDatePickerProps={{
          defaultValue:formatDate(formState.startDate),
          onChange: handleStartDateUpdate,
          onInvalid:onInvalidHandler,
          disabled: undefined,
          id: 'event-date-start',
          name: 'startDate'
      }}/>
      <br/>
      <Checkbox id="opHrsonly" name="opHrsonly" label="Operating hours only" checked={formState.opHrsOnly} onChange={handleOptHrsOnlyUpdate} /> 
      <Button type="button" outline onClick={closeFlyOutHandler}>Cancel</Button>
      <Button type="submit" className="float-right" disabled={isApplyFilterDisabled()}>Apply Filter</Button>
    </Form>
    );

};

export default TimePeriodRender;

