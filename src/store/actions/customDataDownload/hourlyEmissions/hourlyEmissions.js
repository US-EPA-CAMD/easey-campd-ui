import * as types from "../../actionTypes";
import * as emissionsApi from "../../../../utils/api/emissionsApi";
import {beginApiCall} from "../../apiStatusActions";

export function updateTimePeriod(selectedTimePeriod) {
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD,
    selectedTimePeriod,
  };
}

export function resetFilter(filterToReset, resetAll = false){
  return {
    type: types.HOURLY_EMISSIONS.RESET_FILTER,
    reset:{
      filterToReset,
      resetAll
    },
  };
}

export function loadHourlyEmissionsSuccess(hourlyEmissions, totalCount) {
  return {
    type: types.LOAD_HOURLY_EMISSIONS_SUCCESS,
    hourlyEmissions: {
      data: hourlyEmissions,
      totalCount: totalCount
    }
  };
}

export function loadHourlyEmissions(filtersApplied) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getHourlyEmissions(filtersApplied)
      .then((res) => {
        dispatch(loadHourlyEmissionsSuccess(res.data, res.headers["x-total-count"]));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
