import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TimePeriodRender from './TimePeriodRender';
import { updateTimePeriod } from '../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter } from '../../../store/actions/customDataDownload/customDataDownload';
import {
  isDateFormatValid,
  isDateRangeValid,
} from '../../../utils/dateValidation/dateValidation';
import {
  isAddedToFilters,
  formatDateToUi,
  formatDateToApi,
  formatArrayToYearsUi,
  formatYearsToArray,
} from '../../../utils/selectors/general';

export const TimePeriod = ({
  timePeriod,
  updateTimePeriodDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFiltersDispatcher,
  appliedFilters,
  closeFlyOutHandler,
  showOpHrsOnly=true,
  showYear=false,
  showMonth=false,
  showQuarter=false,
}) => {
  const [formState, setFormState] = useState({
    startDate: formatDateToUi(timePeriod.startDate),
    endDate: formatDateToUi(timePeriod.endDate),
    opHrsOnly: showOpHrsOnly? timePeriod.opHrsOnly: false,
    year: formatArrayToYearsUi(timePeriod.year),
  });

  const [validations, setValidations] = useState({
    startDateFormat: true,
    endDateFormat: true,
    dateRange: true,
    yearFormat: true,
    yearRange: true,
    monthFormat: true,
    quarterFormat: true,
    selectedCheckbox: true,
  });

  const [applyFilterClicked, setApplyFilterClicked] = useState(false);

  const filterToApply = 'Time Period';

  useEffect(() => {
    if (showYear) {
      if (
        validations.yearFormat &&
        validations.yearRange &&
        validations.monthFormat &&
        validations.quarterFormat &&
        validations.selectedCheckbox &&
        applyFilterClicked
      ) {
        updateTimePeriodDispatcher({
          year: formatYearsToArray(formState.year),
          // months: formatDateToArray(formState.months),
          // quarters: formatDateToArray(formState.quarters),
        });
        if (isAddedToFilters(filterToApply, appliedFilters)) {
          removeAppliedFiltersDispatcher(filterToApply);
        }
        let appendMonthOrQuarter;

        if (showMonth) {
          appendMonthOrQuarter = `; ${formState.month}`;
        } else if (showQuarter) {
          appendMonthOrQuarter = `; ${formState.quarter}`;
        } else {
          appendMonthOrQuarter = '';
        }

        addAppliedFilterDispatcher({
          key: filterToApply,
          values: [`${formState.year}${appendMonthOrQuarter}`],
        });
        closeFlyOutHandler();
      }
    } else {
      if (
        validations.startDateFormat &&
        validations.endDateFormat &&
        validations.dateRange &&
        applyFilterClicked
      ) {
        updateTimePeriodDispatcher({
          startDate: formatDateToApi(formState.startDate),
          endDate: formatDateToApi(formState.endDate),
          opHrsOnly: formState.opHrsOnly,
        });
        if (isAddedToFilters(filterToApply, appliedFilters)) {
          removeAppliedFiltersDispatcher(filterToApply);
        }
        addAppliedFilterDispatcher({
          key: filterToApply,
          values: [`${formState.startDate} - ${formState.endDate}`],
        });
        if (formState.opHrsOnly) {
          addAppliedFilterDispatcher({
            key: filterToApply,
            values: ['Operating Hours Only'],
          });
        }
        closeFlyOutHandler();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations]);

  const validateInput = () => {
    if (showYear) {
    } else {
      const updatedValidations = {};
      updatedValidations['startDateFormat'] = isDateFormatValid(
        formState.startDate
      );
      updatedValidations['endDateFormat'] = isDateFormatValid(
        formState.endDate
      );
      if (
        updatedValidations['startDateFormat'] &&
        updatedValidations['endDateFormat']
      ) {
        updatedValidations['dateRange'] = isDateRangeValid(
          formState.startDate,
          formState.endDate
        );
      } else {
        updatedValidations['dateRange'] = false;
      }
      setValidations({ ...validations, ...updatedValidations });
    }
  };

  const onInvalidHandler = (evt) => {
    evt.preventDefault();
    validateInput();
  };

  const applyFilterHandler = (evt) => {
    evt.preventDefault();
    validateInput();
    setApplyFilterClicked(true);
  };

  const handleStartDateUpdate = (value) => {
    setFormState({ ...formState, startDate: value });
  };
  const handleEndDateUpdate = (value) => {
    setFormState({ ...formState, endDate: value });
  };
  const handleOptHrsOnlyUpdate = (evt) => {
    setFormState({ ...formState, opHrsOnly: evt.target.checked });
  };

  const handleYearUpdate = (value) => {
    setFormState({ ...formState, year: value });
  };
  // const handleMonthUpdate = (value) => {
  //   setFormState({ ...formState, months: value });
  // };
  // const handleQuarterUpdate = (value) => {
  //   setFormState({ ...formState, quarters: value });
  // };

  const isFormValid = () => {
    if (showYear) {
      return true;
    } else {
      return (
        validations.startDateFormat &&
        validations.endDateFormat &&
        validations.dateRange
      );
    }
  };

  return (
    <TimePeriodRender
      applyFilterHandler={applyFilterHandler}
      handleStartDateUpdate={handleStartDateUpdate}
      handleEndDateUpdate={handleEndDateUpdate}
      handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
      handleYearUpdate={handleYearUpdate}
      // handleMonthsUpdate={handleMonthUpdate}
      // handleQuartersUpdate={handleQuarterUpdate}
      isFormValid={isFormValid}
      onInvalidHandler={onInvalidHandler}
      formState={formState}
      closeFlyOutHandler={closeFlyOutHandler}
      validations={validations}
      showOpHrsOnly={showOpHrsOnly}
      showYear={showYear}
      showMonth={showMonth}
      showQuarter={showQuarter}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    timePeriod: state.filterCriteria.timePeriod,
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFiltersDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriod);
