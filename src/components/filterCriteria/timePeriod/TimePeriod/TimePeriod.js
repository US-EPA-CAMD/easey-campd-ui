import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TimePeriodRender from './TimePeriodRender';
import { updateTimePeriod, loadFilterMapping, resetFilter, updateFilterCriteria } from '../../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter } from '../../../../store/actions/customDataDownload/customDataDownload';
import {
  isDateFormatValid,
  isDateRangeValid,
  isInValidDateRange,
  isInValidReportingQuarter,
  isInYearRange,
  isYearFormat,
  isRangeLimitValid,
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
import { engageFilterLogic } from "../../../../utils/selectors/filterLogic";
import { getTimePeriodYears, verifyTimePeriodChange } from "../../../../utils/selectors/filterCriteria";

export const TimePeriod = ({
  timePeriod,
  updateTimePeriodDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFiltersDispatcher,
  appliedFilters,
  filterToApply,
  closeFlyOutHandler,
  showOpHrsOnly = true,
  showYear = false,
  showMonth = false,
  showQuarter = false,
  isAnnual = false,
  isAllowance = false,
  minYear = 1995,
  renderedHandler,
  loadFilterMappingDispatcher,
  resetFilterDispatcher,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  loading,
  setApplyFilterLoading
}) => {

  const [formState, setFormState] = useState({
    startDate: formatDateToUi(timePeriod.startDate),
    endDate: formatDateToUi(timePeriod.endDate),
    opHrsOnly: showOpHrsOnly ? timePeriod.opHrsOnly : false,
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
    validRangeLimit: true
  });

  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const matsDataType = dataType === "MERCURY AND AIR TOXICS EMISSIONS";
  useEffect(() => {
    const formIsValid = isFormValid();
    if (applyFilterClicked) {
      if (formIsValid && verifyFilterLogic()) {
        if (showYear) {
          updateYearHelper();
        } else {
          updateFullDateHelper();
        }
      } else if (!formIsValid) {
        setApplyFilterLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations]);

  useEffect(()=>{
    if(applyFilterClicked && loading === 0){
      if(dataType === "EMISSIONS" || dataType === "FACILITY" || matsDataType || dataSubType === "Transactions"){
        if(filterCriteria.filterMapping && filterCriteria.filterMapping.length>0){
          const filterCriteriaCloned = JSON.parse(JSON.stringify(filterCriteria));
          if(dataSubType === "Transactions"){
            const distinctYears = [...new Set(filterCriteria.filterMapping.map(e=>e.vintageYear))];
            updateTimePeriodDispatcher({
              ...filterCriteria.timePeriod,
              comboBoxYear: distinctYears.map(year => {return {id:year, label:year, selected:false, enabled:true}})
            });
            filterCriteriaCloned.timePeriod.comboBoxYear = distinctYears.map(year => {return {id:year, label:year, selected:false, enabled:true}});
          }
          engageFilterLogic(dataType, dataSubType, filterToApply, filterCriteriaCloned, updateFilterCriteriaDispatcher, setApplyFilterLoading);
        }else{
          window.alert("Data is not available for the selected time period. Enter a new time period.");
          removeAppliedFiltersDispatcher(filterToApply);
          setApplyFilterLoading(false);
          return;
        }
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCriteria.filterMapping]);

  useEffect(() => {
    renderedHandler();
    if (showMonth && timePeriod.month.length === 0) {
      updateTimePeriodDispatcher({
        ...timePeriod,
        month: JSON.parse(JSON.stringify(constants.MONTHS)),
      });
    } else if (showQuarter && timePeriod.quarter.length === 0) {
      updateTimePeriodDispatcher({
        ...timePeriod,
        quarter: JSON.parse(JSON.stringify(constants.QUARTERS)),
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showMonth) {
      setFormState({
        ...formState,
        month: JSON.parse(JSON.stringify(timePeriod.month)),
      });
    } else if (showQuarter) {
      setFormState({
        ...formState,
        quarter: JSON.parse(JSON.stringify(timePeriod.quarter)),
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod.month, timePeriod.quarter]);

  const validateInput = () => {
    const updatedValidations = {};
    if (showYear) {
      updatedValidations['yearFormat'] = isYearFormat(formState.year);
      if (showMonth) {
        updatedValidations['validReportingQuarter'] = isInValidReportingQuarter(
          formState.year,
          minYear,
          formatMonthsToApiOrString(formState.month),
          [3, 6, 9]
        );
      } else if (showQuarter) {
        updatedValidations['validReportingQuarter'] = isInValidReportingQuarter(
          formState.year,
          minYear,
          formatQuartersToApiOrString(formState.quarter),
          [1, 2, 3]
        );
      } else {
        updatedValidations['validReportingQuarter'] = isInYearRange(
          formatYearsToArray(formState.year),
          minYear,
          isAnnual,
          isAllowance,
        );
      }
    } else {
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
        const minDate = isAllowance ? '1993-03-23' : matsDataType ? '2015-01-01' : '1995-01-01';
        updatedValidations['validReportingQuarter'] =
          isInValidDateRange(
            formState.startDate,
            new Date(minDate),
            isAllowance
          ) &&
          isInValidDateRange(formState.endDate, new Date(minDate), isAllowance);
        if(dataSubType === "Transactions"){
          updatedValidations['validRangeLimit'] = 
            isRangeLimitValid(new Date(formState.startDate), new Date(formState.endDate));
        }
      } else {
        updatedValidations['dateRange'] = false;
        updatedValidations['validReportingQuarter'] = false;
      }
    }
    setValidations({ ...validations, ...updatedValidations });
  };

  const onInvalidHandler = (evt) => {
    evt.preventDefault();
    validateInput();
  };

  const updateFilterMapping = () =>{
    if(showYear){
      loadFilterMappingDispatcher(dataType, dataSubType, getTimePeriodYears(null, null, formState.year));
    }
    else
      if(dataSubType === "Transactions"){
        loadFilterMappingDispatcher(dataType, dataSubType, [formatDateToApi(formState.startDate), formatDateToApi(formState.endDate)]);
      } else if (matsDataType){
        loadFilterMappingDispatcher(dataType, dataSubType, getTimePeriodYears(formatDateToApi(formState.startDate), formatDateToApi(formState.endDate), null));
      }else{
        loadFilterMappingDispatcher(dataType, dataSubType, getTimePeriodYears(formatDateToApi(formState.startDate), formatDateToApi(formState.endDate)));
      }
  }

  const verifyFilterLogic = () =>{
    let result = true;
    if(dataType === "EMISSIONS" || dataType === "FACILITY" || matsDataType || dataSubType === "Transactions"){
      if(!isAddedToFilters(filterToApply, appliedFilters)){
        updateFilterMapping();
      }else if(verifyTimePeriodChange(formState, timePeriod, showYear, dataSubType === "Transactions") || verifyTimePeriodChange(formState, timePeriod, showYear, matsDataType)){
        let message;
        if (matsDataType) {
          message =
            'Changing the time period will clear out previously selected criteria. Do you want to proceed?';
        } else if (dataSubType === 'Transactions') {
          message =
            'Changing the transaction date will clear out previously selected criteria. Do you want to proceed?';
        } else {
          message =
            'Changing the year will clear out previously selected criteria. Do you want to proceed?';
        }
        if (window.confirm(message)) {
          resetFilterDispatcher(null, true);
          removeAppliedFiltersDispatcher(null, true);
          updateFilterMapping();
        } else {
          result = false;
        }
      }
    }
    return result;
  }

  const applyFilterHandler = (evt) => {
    evt.preventDefault();
    validateInput();
    setApplyFilterClicked(true);
    setApplyFilterLoading(true)
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
    setFormState({ ...formState, year: event.target.value.replace(/ /g, '') });
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
    const items =
      evt.target.name === 'month' ? formState.month : formState.quarter;

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
        validations.validReportingQuarter &&
        validations.validRangeLimit
      );
    }
  };

  // HELPER FUNCTIONS
  const updateYearHelper = () => {
    updateTimePeriodDispatcher({
      ...timePeriod,
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
      appendMonthOrQuarter = `; ${formatMonthsToApiOrString(
        formState.month,
        true
      ).join(', ')}`;
    } else if (showQuarter) {
      appendMonthOrQuarter = `; ${formatQuartersToApiOrString(
        formState.quarter,
        true
      ).join(', ')}`;
    } else {
      appendMonthOrQuarter = '';
    }

    addAppliedFilterDispatcher({
      key: filterToApply,
      values: [
        `${formState.year}${appendMonthOrQuarter}`,
        'filter tag year value',
      ],
    });
  };

  const updateFullDateHelper = () => {
    updateTimePeriodDispatcher({
      ...timePeriod,
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
  };

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
      filterToApply={filterToApply}
      validations={validations}
      showOpHrsOnly={showOpHrsOnly}
      showYear={showYear}
      showMonth={showMonth}
      showQuarter={showQuarter}
      isAnnual={isAnnual}
      isAllowance={isAllowance}
      minYear={minYear}
      dataType={dataType}
      dataSubType={dataSubType}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    timePeriod: state.filterCriteria.timePeriod,
    filterCriteria: state.filterCriteria,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll)),
    loadFilterMappingDispatcher: (dataType, dataSubType, years) =>
      dispatch(loadFilterMapping(dataType, dataSubType, years)),
    resetFilterDispatcher: (filter, resetAll) =>
      dispatch(resetFilter(filter, resetAll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriod);
