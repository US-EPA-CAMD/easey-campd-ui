import React from "react";
import {
  Form,
  Button,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import TimePeriodYear from "../TimePeriodYear/TimePeriodYear";
import TimePeriodFullDate from "../TimePeriodFullDate/TimePeriodFullDate";
import { formatMonthsToApiOrString, formatQuartersToApiOrString } from "../../../../utils/selectors/general";

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

  return (
    <Form onSubmit={applyFilterHandler} className="maxw-mobile-lg padding-x-3">
      <div className="panel-header text-bold padding-top-2">
        <h3>{filterToApply}</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
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
