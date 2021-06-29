import React from "react";
import {
  Form,
  Button,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import TimePeriodYear from "../TimePeriodYear/TimePeriodYear";
import TimePeriodFullDate from "../TimePeriodFullDate/TimePeriodFullDate";

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
  onInvalidHandler,
  closeFlyOutHandler,
  validations,
  showOpHrsOnly,
  showYear,
  showMonth,
  showQuarter,
}) => {

  const isApplyFilterDisabled = () => {
    if (showYear) {
      if (showMonth) {
        return !(formState.year.length > 0 && formState.month.length > 0);
      } else if (showQuarter) {
        return !(formState.year.length > 0 && formState.quarter.length > 0);
      } else {
        return !(formState.year.length > 0);
      }
    } else {
      return !(formState.startDate && formState.endDate);
    }
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
        <TimePeriodYear
          formState={formState}
          showMonth={showMonth}
          showQuarter={showQuarter}
          handleYearUpdate={handleYearUpdate}
          handleMonthUpdate={handleMonthUpdate}
          handleQuarterUpdate={handleQuarterUpdate}
          onInvalidHandler={onInvalidHandler}
          validations={validations}
          isFormValid={isFormValid}
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
        />
      )}
      <hr className="margin-y-2" />
      <div className="margin-bottom-3">
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
      </div>
    </Form>
  );
};

export default TimePeriodRender;
