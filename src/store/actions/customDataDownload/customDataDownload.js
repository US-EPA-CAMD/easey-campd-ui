import * as types from "../actionTypes";
import { beginApiCall } from '../apiStatusActions';
import * as emissionsApi from '../../../utils/api/emissionsApi';

export function updateSelectedDataType(dataType) {
  return {
    type: types.UPDATE_SELECTED_DATATYPE,
    dataType,
  };
}

export function updateSelectedDataSubType(dataSubType) {
  return {
    type: types.UPDATE_SELECTED_DATASUBTYPE,
    dataSubType,
  };
}

export function resetDataPreview(){
  return {
    type: types.RESET_DATA_PREVIEW
  };
}

export function addAppliedFilter(appliedFilter){
  return {
    type: types.ADD_APPLIED_FILTER,
    appliedFilter,
  };
}

export function removeAppliedFilter(removedFilter, removeAll = false, opHours = false){
  return {
    type: types.REMOVE_APPLIED_FILTER,
    removal:{
      removedFilter,
      removeAll,
      opHours,
    },
  };
}

/* ---------HOURLY EMISSIONS----------- */
export function loadHourlyEmissionsSuccess(hourlyEmissions, totalCount) {
  return {
    type: types.LOAD_HOURLY_EMISSIONS_SUCCESS,
    hourlyEmissions: {
      data: hourlyEmissions,
      totalCount: totalCount,
    },
  };
}

export function loadHourlyEmissions(filterCriterias) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getHourlyEmissions(filterCriterias)
      .then((res) => {
        dispatch(
          loadHourlyEmissionsSuccess(res.data, res.headers['x-total-count'])
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/* ---------MONTHLY EMISSIONS----------- */
export function loadMonthlyEmissionsSuccess(monthlyEmissions, totalCount) {
  return {
    type: types.LOAD_MONTHLY_EMISSIONS_SUCCESS,
    monthlyEmissions: {
      data: monthlyEmissions,
      totalCount: totalCount,
    },
  };
}

export function loadMonthlyEmissions(filterCriterias) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getMonthlyEmissions(filterCriterias)
      .then((res) => {
        dispatch(
          loadMonthlyEmissionsSuccess(res.data, res.headers['x-total-count'])
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/* ---------QUARTERLY EMISSIONS----------- */
export function loadQuarterlyEmissionsSuccess(quarterlyEmissions, totalCount) {
  return {
    type: types.LOAD_QUARTERLY_EMISSIONS_SUCCESS,
    quarterlyEmissions: {
      data: quarterlyEmissions,
      totalCount: totalCount,
    },
  };
}

export function loadQuarterlyEmissions(filterCriterias) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getQuarterlyEmissions(filterCriterias)
      .then((res) => {
        dispatch(
          loadQuarterlyEmissionsSuccess(res.data, res.headers['x-total-count'])
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

