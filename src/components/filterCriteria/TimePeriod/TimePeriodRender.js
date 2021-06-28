import React from "react";
import {
  Form,
  Button,
} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import TimePeriodYear from "./subType/TimePeriodYear";
import TimePeriodFullDate from "./subType/TimePeriodFullDate";

const TimePeriodRender = ({
  applyFilterHandler,
  handleStartDateUpdate,
  handleEndDateUpdate,
  handleOptHrsOnlyUpdate,
  handleYearUpdate,
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
