import React, { useEffect } from 'react';
import {
  Alert,
  ValidationChecklist,
  ValidationItem,
  DateRangePicker,
  Checkbox,
} from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import { formatDateToApi, reportingQuarter } from '../../../../utils/selectors/general';
import { fullDateEnsure508 } from '../../../../utils/ensure-508/time-period';
import Tooltip from '../../../Tooltip/Tooltip';

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
    : `Enter dates between 01/01/1995 and the quarter ending on ${reportingQuarter()}`;

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
            className={validations.startDateFormat? 'display-none': null}
          >
            Enter the Start Date in the MM/DD/YYYY format
          </ValidationItem>
          <ValidationItem
            id="endDateFormat"
            isValid={validations.endDateFormat}
            aria-checked={validations.endDateFormat}
            className={validations.endDateFormat? 'display-none': null}
          >
            Enter the End Date in the MM/DD/YYYY format
          </ValidationItem>
          <ValidationItem
            id="dateRange"
            isValid={validations.dateRange}
            aria-checked={validations.dateRange}
            className={validations.dateRange? 'display-none': null}
          >
            Enter an end date that is greater than or equal to the begin date
          </ValidationItem>
          <ValidationItem
            id="validReportingQuarter"
            isValid={validations.validReportingQuarter}
            aria-checked={validations.validReportingQuarter}
            className={validations.validReportingQuarter? 'display-none': null}
          >
            {rangeMessage}
          </ValidationItem>
          <ValidationItem
            id="validRangeLimit"
            isValid={validations.validRangeLimit}
            aria-checked={validations.validRangeLimit}
            className={validations.validRangeLimit? 'display-none': null}
          >
            The date range should be limited to a 2 year time period
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
        <div className="display-inline-flex ">
          <Checkbox
            id="opHrsonly"
            name="opHrsonly"
            label="Operating hours only"
            checked={formState.opHrsOnly}
            onChange={handleOptHrsOnlyUpdate}
          />
          <Tooltip content="When checked, only hours in a day during which a unit is operational are included in the data output.">
            <Help
              className="text-primary margin-left-1 margin-bottom-1"
              fontSize="small"
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default TimePeriodFullDate;
