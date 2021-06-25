import React, {useEffect} from "react";
import {
  Form,
  Checkbox,
  Button,
  DateRangePicker,
  ValidationChecklist,
  ValidationItem,
  Alert,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import { formatDateToApi } from "../../../utils/selectors/general";

const TimePeriodRender = ({
  applyFilterHandler,
  handleStartDateUpdate,
  handleEndDateUpdate,
  handleOptHrsOnlyUpdate,
  formState,
  isFormValid,
  onInvalidHandler,
  closeFlyOutHandler,
  validations,
  showOpHrsOnly,
  showYear,
}) => {

  useEffect(()=>{
    const startDateInput = document.getElementById("event-date-start");
    if(startDateInput){
      startDateInput.setAttribute("aria-describedby", "event-date-start-hint");
      startDateInput.nextSibling.setAttribute("aria-label", "Toggle calendar for Start Date");
    }
    const endDateInput = document.getElementById("event-date-end");
    if(endDateInput){
      endDateInput.setAttribute("aria-describedby", "event-date-end-hint");
      endDateInput.nextSibling.setAttribute("aria-label", "Toggle calendar for End Date");
    }
    const datePickerWrapper = document.querySelectorAll('.usa-date-picker__wrapper');
    datePickerWrapper.forEach(el=>{
      const sibling = el.previousSibling;
      if(sibling){
        sibling.remove();
      }
    });
  });

  const isApplyFilterDisabled = () => {
    return !(formState.startDate && formState.endDate);
  };

  return (
    <Form onSubmit={applyFilterHandler} className="maxw-mobile-lg padding-x-3">
      <div className="panel-header text-bold padding-top-2">
        <h3>Time Period</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
      </div>
      <hr />
      {showYear ? (
        <>
          <Label htmlFor="yearInput">Year(s)</Label>
          <TextInput id="yearInput" name="otherInput" type="text" />
        </>
      ) : (
        <>
          <Alert
            role="alert"
            type="info"
            validation
            heading="Requirements"
            style={{ display: isFormValid() ? 'none' : 'block' }}
            aria-live="assertive"
          >
            <ValidationChecklist id="validate-time-period">
              <ValidationItem
                id="startDateFormat"
                isValid={validations.startDateFormat}
                aria-checked={validations.startDateFormat}
              >
                Enter the Start Date in the MM/DD/YYYY format
              </ValidationItem>
              <ValidationItem
                id="endDateFormat"
                isValid={validations.endDateFormat}
                aria-checked={validations.endDateFormat}
              >
                Enter the End Date in the MM/DD/YYYY format
              </ValidationItem>
              <ValidationItem
                id="dateRange"
                isValid={validations.dateRange}
                aria-checked={validations.dateRange}
              >
                Enter an end date that is greater than or equal to the begin
                date
              </ValidationItem>
            </ValidationChecklist>
          </Alert>
          <DateRangePicker
            aria-describedby="validate-time-period"
            endDateHint="mm/dd/yyyy"
            endDateLabel="End Date (Required)"
            endDatePickerProps={{
              defaultValue: formatDateToApi(formState.endDate),
              onChange: handleEndDateUpdate,
              onInvalid: onInvalidHandler,
              disabled: undefined,
              id: 'event-date-end',
              name: 'endDate',
            }}
            startDateHint="mm/dd/yyyy"
            startDateLabel="Start Date (Required)"
            startDatePickerProps={{
              autoFocus: true,
              defaultValue: formatDateToApi(formState.startDate),
              onChange: handleStartDateUpdate,
              onInvalid: onInvalidHandler,
              disabled: undefined,
              id: 'event-date-start',
              name: 'startDate',
            }}
          />
          <br />
          {showOpHrsOnly && (
            <Checkbox
              id="opHrsonly"
              name="opHrsonly"
              label="Operating hours only"
              checked={formState.opHrsOnly}
              onChange={handleOptHrsOnlyUpdate}
            />
          )}
        </>
      )}
      <Button
        type="button"
        outline
        onClick={closeFlyOutHandler}
        className={isApplyFilterDisabled() ? 'autofocus2' : ''}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className={
          isApplyFilterDisabled() ? 'float-right' : 'float-right autofocus2'
        }
        disabled={isApplyFilterDisabled()}
      >
        Apply Filter
      </Button>
    </Form>
  );
};

export default TimePeriodRender;
