import React, { useState } from 'react';
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
  let itemType = [];
  if (showMonth) {
    itemType = formState.month;
  } else if (showQuarter) {
    itemType = formState.quarter;
  }
  const [items, setItems] = useState(itemType);

  const onSelectAllHandler = (e) => {
    const newItems = items.forEach((i) => {
      i.selected = e.target.checked;
    });
    setItems(newItems);
  };

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
            Enter year(s) using a comma separated format (ex. 1995, 2000, 2001-2005)
          </ValidationItem>
          <ValidationItem
            id="validReportingQuarter"
            isValid={validations.validReportingQuarter}
            aria-checked={validations.validReportingQuarter}
          >
            Enter year(s) between 1995 and this year
          </ValidationItem>
        </ValidationChecklist>
      </Alert>
      <Label htmlFor="event-year-input">
        Year(s) (Required)
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
            description="Month(s) (Required)"
            items={items}
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
            name="Quarter(s)"
            description="Quarter(s) (Required)"
            items={items}
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
