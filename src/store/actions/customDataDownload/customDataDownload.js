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

/* ---------OZONE EMISSIONS----------- */

export function loadOzoneEmissionsSuccess(ozoneEmissions, totalCount) {
  return {
    type: types.LOAD_OZONE_EMISSIONS_SUCCESS,
    ozoneEmissions: {
      data: ozoneEmissions,
      totalCount: totalCount,
    },
  };
}

export function loadOzoneEmissions(filterCriterias) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getOzoneEmissions(filterCriterias)
      .then((res) => {
        dispatch(
          loadOzoneEmissionsSuccess(res.data, res.headers['x-total-count'])
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };
  }

  /* ---------ANNUAL EMISSIONS----------- */

export function loadAnnualEmissionsSuccess(annualEmissions, totalCount) {
  return {
    type: types.LOAD_ANNUAL_EMISSIONS_SUCCESS,
    annualEmissions: {
      data: annualEmissions,
      totalCount: totalCount,
    },
  };
}

export function loadAnnualEmissions(filterCriterias) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getAnnualEmissions(filterCriterias)
      .then((res) => {
        dispatch(
          loadAnnualEmissionsSuccess(res.data, res.headers['x-total-count'])
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };
  }
  