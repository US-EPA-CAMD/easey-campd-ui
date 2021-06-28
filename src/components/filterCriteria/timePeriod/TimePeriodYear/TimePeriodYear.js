import React from 'react';
import {
  Label,
  TextInput,
  Alert,
  ValidationChecklist,
  ValidationItem,
} from '@trussworks/react-uswds';

import CheckboxGroup from '../../../CheckboxGroup/CheckboxGroup';
import * as constants from '../../../../utils/constants/customDataDownload';

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
          <ValidationItem
            id="validReportingQuarter"
            isValid={validations.validReportingQuarter}
            aria-checked={validations.validReportingQuarter}
          >
            Enter Year(s) between 1995 and this year
          </ValidationItem>
        </ValidationChecklist>
      </Alert>
      <Label className="text-bold" htmlFor="event-year-input">
        Year(s)
      </Label>
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
      {showMonth && (
        <div className="">
          <CheckboxGroup
            enableSelectAll={true}
            getFocus={true}
            name="Month(s)"
            description="Month(s)"
            items={constants.MONTHS}
            smallLabel={true}
            onSelectAll={null}
            onSelectItem={null}
          />
        </div>
      )}
      {showQuarter && (
        <div className="">
          <CheckboxGroup
            enableSelectAll={true}
            getFocus={true}
            name="Quarter(s)"
            description="Quarter(s)"
            items={constants.QUARTERS}
            smallLabel={true}
            onSelectAll={null}
            onSelectItem={null}
          />
        </div>
      )}
      {!showMonth && !showQuarter && <hr />}
    </>
  );
};

export default TimePeriodYear;
