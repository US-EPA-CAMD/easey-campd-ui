import * as types from "../../actionTypes";
import * as emissionsApi from "../../../../utils/api/emissionsApi";
import { beginApiCall } from "../../apiStatusActions";
import { restructurePrograms, restructureUnitTypes } from "../../../../utils/selectors/hourlyEmissions";

/* ---------TIME PERIOD----------- */
export function updateTimePeriod(selectedTimePeriod) {
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD,
    selectedTimePeriod,
  };
}

/* ---------PROGRAM----------- */
export function loadEmissionsProgramsSuccess(program) {
  return {
    type: types.LOAD_EMISSIONS_PROGRAMS_SUCCESS,
    program: restructurePrograms(program)
  };
}

export function loadEmissionsPrograms() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getEmissionsPrograms
      .then((res) => {
        dispatch(loadEmissionsProgramsSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateProgramSelection(program){
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_PROGRAM_SELECTION,
    program,
  }
}

/* ---------UNIT TYPE----------- */
export function loadEmissionsUnitTypesSuccess(unitType) {
  return {
    type: types.LOAD_EMISSIONS_UNIT_TYPES_SUCCESS,
    unitType: restructureUnitTypes(unitType)
  };
}

export function loadEmissionsUnitTypes() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getEmissionsUnitTypes
      .then((res) => {
        dispatch(loadEmissionsUnitTypesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateUnitTypeSelection(selectedUnitType){
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_UNIT_TYPE_SELECTION,
    selectedUnitType,
  }
}

/* ---------HOURLY EMISSIONS----------- */
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

export function loadHourlyEmissions(hourlyEmissions) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getHourlyEmissions(hourlyEmissions)
      .then((res) => {
        dispatch(loadHourlyEmissionsSuccess(res.data, res.headers["x-total-count"]));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function loadFacilitiesSuccess(facilities) {
  return {
    type: types.LOAD_FACILITIES_SUCCESS,
    facilities: facilities.map(f=> ({id: f.orisCode, label:`${f.name}(${f.orisCode})`, selected:false}))
  };
}

export function loadFacilities() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return emissionsApi
      .getAllFacilities()
      .then((res) => {
        dispatch(loadFacilitiesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateFacilitySelection(facility){
  return {
    type: types.HOURLY_EMISSIONS.UPDATE_FACILITY_SELECTION,
    facility,
  }
}
