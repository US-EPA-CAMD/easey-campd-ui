import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TimePeriodRender from './TimePeriodRender';
import { updateTimePeriod } from '../../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter } from '../../../../store/actions/customDataDownload/customDataDownload';
import {
  isDateFormatValid,
  isDateRangeValid,
  isInValidDateRange,
  isInValidReportingQuarter,
  isInYearRange,
  isYearFormat,
} from '../../../../utils/dateValidation/dateValidation';
import {
  isAddedToFilters,
  formatDateToUi,
  formatDateToApi,
  formatYearsToArray,
  formatMonthsToApiOrString,
  formatQuartersToApiOrString,
} from '../../../../utils/selectors/general';
import * as constants from '../../../../utils/constants/customDataDownload';

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
  isAnnual=false,
  isVintage=false,
}) => {
  const [formState, setFormState] = useState({
    startDate: formatDateToUi(timePeriod.startDate),
    endDate: formatDateToUi(timePeriod.endDate),
    opHrsOnly: showOpHrsOnly? timePeriod.opHrsOnly: false,
    year: showYear ? timePeriod.year.yearString : '',
    month: showMonth ? timePeriod.month : [],
    quarter: showQuarter ? timePeriod.quarter : [],
  });

  const [validations, setValidations] = useState({
    startDateFormat: true,
    endDateFormat: true,
    dateRange: true,
    validReportingQuarter: true,
    yearFormat: true,
  });

  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = isVintage ? 'Vintage Year' : 'Time Period';

  useEffect(() => {
    if (showYear) {
      if (isFormValid() && applyFilterClicked) {
        updateYearHelper();
        closeFlyOutHandler();
      }
    } else {
      if (isFormValid() && applyFilterClicked) {
        updateFullDateHelper();
        closeFlyOutHandler();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations]);

  useEffect(() => {
    if (showMonth && timePeriod.month.length === 0) {
      updateTimePeriodDispatcher({...timePeriod, month: JSON.parse(JSON.stringify(constants.MONTHS))});
    } else if (showQuarter && timePeriod.quarter.length === 0) {
      updateTimePeriodDispatcher({...timePeriod, quarter: JSON.parse(JSON.stringify(constants.QUARTERS))});
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showMonth) {
      setFormState({...formState, month: JSON.parse(JSON.stringify(timePeriod.month))});
    } else if (showQuarter) {
      setFormState({...formState, quarter: JSON.parse(JSON.stringify(timePeriod.quarter))});
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod.month, timePeriod.quarter]);

  const validateInput = () => {
    const updatedValidations = {};
    if (showYear) {
      updatedValidations['yearFormat'] = isYearFormat(formState.year);
      if (showMonth) {
        updatedValidations['validReportingQuarter'] = isInValidReportingQuarter(
          formState.year,
          formatMonthsToApiOrString(formState.month),
          [3, 6, 9],
        );
      } else if (showQuarter) {
        updatedValidations['validReportingQuarter'] = isInValidReportingQuarter(
          formState.year,
          formatQuartersToApiOrString(formState.quarter),
          [1, 2, 3],
        );
      } else {
        updatedValidations['validReportingQuarter'] = isInYearRange(formatYearsToArray(formState.year), isAnnual, isVintage);
      }
    } else {
      updatedValidations['startDateFormat'] = isDateFormatValid(formState.startDate);
      updatedValidations['endDateFormat'] = isDateFormatValid(formState.endDate);
      if (
        updatedValidations['startDateFormat'] && updatedValidations['endDateFormat']
      ) {
        updatedValidations['dateRange'] = isDateRangeValid(
          formState.startDate,
          formState.endDate
        );
        updatedValidations['validReportingQuarter'] =
          isInValidDateRange(formState.startDate, new Date('1995-01-01')) &&
          isInValidDateRange(formState.endDate, new Date('1995-01-01'));
      } else {
        updatedValidations['dateRange'] = false;
        updatedValidations['validReportingQuarter'] = false
      }
    }
    setValidations({ ...validations, ...updatedValidations });
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

  const handleYearUpdate = (event) => {
    setFormState({ ...formState, year: event.target.value.replace(/ /g,'') });
  };

  const handleMonthUpdate = (evt) => {
    const newItems = formState.month;
    const found = newItems.findIndex((i) => i.id === parseInt(evt.target.id));
    if (found > -1) {
      newItems[found].selected = evt.target.checked;
      setFormState({ ...formState, month: newItems });
    }
  };

  const handleQuarterUpdate = (evt) => {
    const newItems = formState.quarter;
    const found = newItems.findIndex((i) => i.id === parseInt(evt.target.id));
    if (found > -1) {
      newItems[found].selected = evt.target.checked;
      setFormState({ ...formState, quarter: newItems });
    }
  };

  const onSelectAllHandler = (evt) => {
    const items = evt.target.name === 'month' ? formState.month : formState.quarter;

    items.forEach((i) => {
      i.selected = evt.target.checked;
    });

    if (evt.target.name === 'month') {
      setFormState({ ...formState, month: items });
    } else {
      setFormState({ ...formState, quarter: items });
    }
  };

  const isFormValid = () => {
    if (showYear) {
      return validations.yearFormat && validations.validReportingQuarter;
    } else {
      return (
        validations.startDateFormat &&
        validations.endDateFormat &&
        validations.dateRange &&
        validations.validReportingQuarter
      );
    }
  };

  // HELPER FUNCTIONS
  const updateYearHelper = () => {
    updateTimePeriodDispatcher({
      year: {
        yearArray: formatYearsToArray(formState.year),
        yearString: formState.year,
      },
      month: formState.month,
      quarter: formState.quarter,
    });

    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFiltersDispatcher(filterToApply);
    }

    let appendMonthOrQuarter;
    if (showMonth) {
      appendMonthOrQuarter = `; ${formatMonthsToApiOrString(formState.month, true).join(', ')}`;
    } else if (showQuarter) {
      appendMonthOrQuarter = `; ${formatQuartersToApiOrString(formState.quarter, true).join(', ')}`;
    } else {
      appendMonthOrQuarter = '';
    }

    addAppliedFilterDispatcher({
      key: filterToApply,
      values: [`${formState.year}${appendMonthOrQuarter}`, 'filter tag year value'],
    });
  }

  const updateFullDateHelper = () => {
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
  }

  return (
    <TimePeriodRender
      applyFilterHandler={applyFilterHandler}
      handleStartDateUpdate={handleStartDateUpdate}
      handleEndDateUpdate={handleEndDateUpdate}
      handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
      handleYearUpdate={handleYearUpdate}
      handleMonthUpdate={handleMonthUpdate}
      handleQuarterUpdate={handleQuarterUpdate}
      isFormValid={isFormValid}
      onSelectAllHandler={onSelectAllHandler}
      onInvalidHandler={onInvalidHandler}
      formState={formState}
      closeFlyOutHandler={closeFlyOutHandler}
      validations={validations}
      showOpHrsOnly={showOpHrsOnly}
      showYear={showYear}
      showMonth={showMonth}
      showQuarter={showQuarter}
      isAnnual={isAnnual}
      isVintage={isVintage}
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
