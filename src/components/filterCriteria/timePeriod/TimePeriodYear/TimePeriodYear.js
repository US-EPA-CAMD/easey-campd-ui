import React from 'react';
import {
  Label,
  TextInput,
  Alert,
  ValidationChecklist,
  ValidationItem,
} from '@trussworks/react-uswds';

import CheckboxGroup from '../../../CheckboxGroup/CheckboxGroup';
import { reportingQuarter } from '../../../../utils/selectors/general';

const TimePeriodYear = ({
  formState,
  showMonth,
  showQuarter,
  handleYearUpdate,
  handleMonthUpdate,
  handleQuarterUpdate,
  onSelectAllHandler,
  onInvalidHandler,
  validations,
  isFormValid,
  isAnnual,
  isAllowance,
}) => {
  let rangeMessage;
  if (showMonth) {
    rangeMessage = `Enter month(s) and year(s) between 01/01/1995 and the end of the calendar quarter, ${reportingQuarter()}`;
  } else if (showQuarter) {
    rangeMessage = `Enter quarter(s) and year(s) between 01/01/1995 and the end of the calendar quarter, ${reportingQuarter()}`;
  } else if (isAnnual) {
    rangeMessage =
      'Enter year(s) 1980, 1985, 1990, or a year between 1995 and this year';
  } else if (isAllowance) {
    rangeMessage = 'Enter year(s) greater than or equal to 1995';
  } else {
    rangeMessage = 'Enter year(s) between 1995 and this year';
  }

  let yearLabel = 'Year(s)'
  yearLabel += isAllowance ? '' : ' (Required) '

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
            Enter year(s) using a comma separated format (ex. 1995, 2000,
            2001-2005)
          </ValidationItem>
          <ValidationItem
            id="validReportingQuarter"
            isValid={validations.validReportingQuarter}
            aria-checked={validations.validReportingQuarter}
          >
            {rangeMessage}
          </ValidationItem>
        </ValidationChecklist>
      </Alert>
      <Label htmlFor="event-year-input">{yearLabel}
        <div id="date-format-hint">
          Ex: 1995-2000,2003,2005,2010-2015
        </div>
        </Label>
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
      {showMonth && (
        <div className="">
          <CheckboxGroup
            enableSelectAll={true}
            getFocus={true}
            name="month"
            description="Month(s) (Required)"
            items={formState.month}
            smallLabel={true}
            onSelectAll={onSelectAllHandler}
            onSelectItem={handleMonthUpdate}
          />
        </div>
      )}
      {showQuarter && (
        <div className="">
          <CheckboxGroup
            enableSelectAll={true}
            getFocus={true}
            name="quarter"
            description="Quarter(s) (Required)"
            items={formState.quarter}
            smallLabel={true}
            onSelectAll={onSelectAllHandler}
            onSelectItem={handleQuarterUpdate}
          />
        </div>
      )}
      {!showMonth && !showQuarter && <hr />}
    </>
  );
};

export default TimePeriodYear;
