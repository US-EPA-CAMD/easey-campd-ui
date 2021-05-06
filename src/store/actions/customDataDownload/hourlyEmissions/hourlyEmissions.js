import * as types from "../../actionTypes";
import * as emissionsApi from "../../../../utils/api/emissionsApi";
import {beginApiCall} from "../../apiStatusActions";
import {restructurePrograms} from "../../../../utils/selectors/hourlyEmissions";

export function updateTimePeriod(selectedTimePeriod) {
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD,
    selectedTimePeriod,
  };
}

export function loadEmissionsProgramsSuccess(programs) {
  return {
    type: types.LOAD_EMISSIONS_PROGRAMS_SUCCESS,
    programs: restructurePrograms(programs)
  };
}

export function loadEmissionsPrograms() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getEmissionsPrograms()
      .then((res) => {
        dispatch(loadEmissionsProgramsSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateProgramSelection(selectedPrograms){
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_PROGRAM_SELECTION,
    selectedPrograms,
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
