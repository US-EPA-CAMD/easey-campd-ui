import React from 'react';
import {
  Label,
  TextInput,
  Alert,
  ValidationChecklist,
  ValidationItem,
} from '@trussworks/react-uswds';

const TimePeriodYear = ({
  formState,
  showMonth,
  showQuarter,
  handleYearUpdate,
  handleMonthUpdate,
  handleQuarterUpdate,
  onInvalidHandler,
  validations,
  isFormValid,
}) => {
  return (
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
            id="yearFormat"
            isValid={validations.yearFormat}
            aria-checked={validations.yearFormat}
          >
            Enter Year(s) in the YYYY-YYYY,YYYY format
          </ValidationItem>
        </ValidationChecklist>
      </Alert>
      <Label htmlFor="event-year-input">Year(s)</Label>
      <div className="usa-hint" id="date-format-hint">
        Ex: 1995-2000,2003,2005,2010-2015
      </div>
      <TextInput
        aria-describedby="validate-time-period"
        autoFocus={true}
        className="margin-bottom-4"
        id="event-year-input"
        name="yearInput"
        type="text"
        onChange={handleYearUpdate}
        onInvalid={onInvalidHandler}
        defaultValue={formState.year}
      />
      <hr />
    </>
  );
};

export default TimePeriodYear;
