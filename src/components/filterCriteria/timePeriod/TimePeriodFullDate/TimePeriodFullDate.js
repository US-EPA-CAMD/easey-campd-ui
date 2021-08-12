import React, { useEffect } from 'react';
import {
  Alert,
  ValidationChecklist,
  ValidationItem,
  DateRangePicker,
  Checkbox,
} from '@trussworks/react-uswds';
import { formatDateToApi, reportingQuarter } from '../../../../utils/selectors/general';
import { fullDateEnsure508 } from '../../../../utils/ensure-508/time-period';

const TimePeriodFullDate = ({
  formState,
  handleEndDateUpdate,
  handleStartDateUpdate,
  handleOptHrsOnlyUpdate,
  showOpHrsOnly,
  onInvalidHandler,
  validations,
  isFormValid,
  isAllowance,
}) => {
  useEffect(() => {
    fullDateEnsure508();
  });

  const rangeMessage = isAllowance
    ? 'Enter dates between 03/23/1993 and the current date'
    : `Enter dates between 01/01/1995 and the end of the calendar quarter, ${reportingQuarter()}`;

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
            Enter an end date that is greater than or equal to the begin date
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
      <DateRangePicker
        aria-describedby="validate-time-period"
        endDateHint="mm/dd/yyyy"
        endDateLabel={'End Date (Required)'}
        endDatePickerProps={{
          defaultValue: formatDateToApi(formState.endDate),
          onChange: handleEndDateUpdate,
          onInvalid: onInvalidHandler,
          disabled: undefined,
          id: 'event-date-end',
          name: 'endDate',
        }}
        startDateHint="mm/dd/yyyy"
        startDateLabel={'Start Date (Required)'}
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
  );
};

export default TimePeriodFullDate;
