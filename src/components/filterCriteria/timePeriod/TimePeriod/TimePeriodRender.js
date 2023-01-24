import React from "react";
import {
  Form,
  Button,
} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import TimePeriodYear from "../TimePeriodYear/TimePeriodYear";
import TimePeriodFullDate from "../TimePeriodFullDate/TimePeriodFullDate";
import { formatMonthsToApiOrString, formatQuartersToApiOrString } from "../../../../utils/selectors/general";
import Tooltip from '../../../Tooltip/Tooltip';

const TimePeriodRender = ({
  applyFilterHandler,
  handleStartDateUpdate,
  handleEndDateUpdate,
  handleOptHrsOnlyUpdate,
  handleYearUpdate,
  handleMonthUpdate,
  handleQuarterUpdate,
  formState,
  isFormValid,
  onSelectAllHandler,
  onInvalidHandler,
  closeFlyOutHandler,
  filterToApply,
  validations,
  showOpHrsOnly,
  showYear,
  showMonth,
  showQuarter,
  isAnnual,
  isAllowance,
  minYear,
  dataType,
  dataSubType
}) => {

  const isApplyFilterDisabled = () => {
    if (showYear) {
      if (showMonth) {
        return !(formState.year.length > 0 && formatMonthsToApiOrString(formState.month).length > 0);
      } else if (showQuarter) {
        return !(formState.year.length > 0 && formatQuartersToApiOrString(formState.quarter).length > 0);
      } else {
        return (formState.year.length <= 0);
      }
    } else {
      return !(formState.startDate && formState.endDate);
    }
  };

  let tooltip;
  if (
    dataSubType === "Hourly Emissions" ||
    dataSubType === "Daily Emissions" ||
    dataSubType === "Transactions"
  ) {
    tooltip =
      "If using the keyboard to navigate the date picker and the escape key does not work, try using the Shift + Tab keys then the escape key.";
  }
  if (dataSubType === "Ozone Season Emissions") {
    tooltip = "The Ozone Season is from May 1st – September 30th.";
  }

  return (
    <Form onSubmit={applyFilterHandler} className="maxw-mobile-lg padding-x-3">
      <div className="panel-header padding-top-2">
        <h3>{filterToApply}</h3>
        {(dataSubType === "Hourly Emissions" ||
          dataSubType === "Daily Emissions" ||
          dataSubType === "Ozone Season Emissions" ||
          dataSubType === "Transactions") && (
          <Tooltip content={tooltip} field={filterToApply}>
            <Help
              className=" text-primary margin-left-1 margin-bottom-1"
              fontSize="small"
            />
          </Tooltip>
        )}
      </div>
      <hr />
      {showYear ? (
        <TimePeriodYear
          formState={formState}
          showMonth={showMonth}
          showQuarter={showQuarter}
          handleYearUpdate={handleYearUpdate}
          handleMonthUpdate={handleMonthUpdate}
          handleQuarterUpdate={handleQuarterUpdate}
          onSelectAllHandler={onSelectAllHandler}
          onInvalidHandler={onInvalidHandler}
          validations={validations}
          isFormValid={isFormValid}
          isAnnual={isAnnual}
          isAllowance={isAllowance}
          minYear={minYear}
        />
      ) : (
        <TimePeriodFullDate
          formState={formState}
          handleEndDateUpdate={handleEndDateUpdate}
          handleStartDateUpdate={handleStartDateUpdate}
          handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
          showOpHrsOnly={showOpHrsOnly}
          onInvalidHandler={onInvalidHandler}
          validations={validations}
          isFormValid={isFormValid}
          isAllowance={isAllowance}
          dataType={dataType}
        />
      )}
      {(showMonth) && <hr className="margin-y-2" />}
      <div className="margin-bottom-3">
        <Button
          type="button"
          outline
          onClick={closeFlyOutHandler}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="float-right"
          disabled={isApplyFilterDisabled()}
        >
          Apply Filter
        </Button>
      </div>
    </Form>
  );
};

export default TimePeriodRender;
