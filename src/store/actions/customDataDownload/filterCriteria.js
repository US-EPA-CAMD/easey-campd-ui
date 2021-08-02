import * as types from '../actionTypes';
import * as filterCriteriaApi from '../../../utils/api/filterCriteriaApi';
import { beginApiCall } from '../apiStatusActions';
import {
  restructurePrograms,
  restructureUnitTypes,
  restructureFuelTypes,
  restructureControlTechnologies,
  restructureAccountTypes,
} from '../../../utils/selectors/filterCriteria';

export function resetFilter(filterToReset, resetAll = false) {
  return {
    type: types.RESET_FILTER,
    reset: {
      filterToReset,
      resetAll,
    },
  };
}

/* ---------TIME PERIOD----------- */
export function updateTimePeriod(timePeriod) {
  return {
    type: types.UPDATE_TIME_PERIOD,
    timePeriod,
  };
}

/* ---------PROGRAM----------- */
export function loadProgramsSuccess(programs) {
  return {
    type: types.LOAD_PROGRAMS_SUCCESS,
    program: restructurePrograms(programs),
  };
}

export function loadPrograms(dataType, showActiveOnly) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi.getPrograms(dataType, showActiveOnly)
      .then((res) => {
        dispatch(loadProgramsSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateProgramSelection(program) {
  return {
    type: types.UPDATE_PROGRAM_SELECTION,
    program,
  };
}

/* ---------FACILITY----------- */
export function loadFacilitiesSuccess(facilities) {
  return {
    type: types.LOAD_FACILITIES_SUCCESS,
    facility: facilities.map(f=> ({id: f.orisCode, label:`${f.name} (${f.orisCode})`, selected:false}))
  };
}

export function loadFacilities() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getAllFacilities()
      .then((res) => {
        dispatch(loadFacilitiesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateFacilitySelection(facility) {
  return {
    type: types.UPDATE_FACILITY_SELECTION,
    facility,
  };
}

/* ---------UNIT TYPE----------- */
export function loadUnitTypesSuccess(unitTypes) {
  return {
    type: types.LOAD_UNIT_TYPES_SUCCESS,
    unitType: restructureUnitTypes(unitTypes),
  };
}

export function loadUnitTypes() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getUnitTypes
      .then((res) => {
        dispatch(loadUnitTypesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateUnitTypeSelection(unitType) {
  return {
    type: types.UPDATE_UNIT_TYPE_SELECTION,
    unitType,
  };
}

/* ---------FUEL TYPE----------- */
export function loadFuelTypesSuccess(fuelTypes) {
  return {
    type: types.LOAD_FUEL_TYPES_SUCCESS,
    fuelType: restructureFuelTypes(fuelTypes),
  };
}

export function loadFuelTypes() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getFuelTypes
      .then((res) => {
        dispatch(loadFuelTypesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateFuelTypeSelection(fuelType) {
  return {
    type: types.UPDATE_FUEL_TYPE_SELECTION,
    fuelType,
  };
}

/* ---------CONTROL TECHNOLOGY----------- */
export function loadControlTechnologiesSuccess(controlTechnologies) {
  return {
    type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS,
    controlTechnology: restructureControlTechnologies(controlTechnologies),
  };
}

export function loadControlTechnologies() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getControlTechnologies
      .then((res) => {
        dispatch(loadControlTechnologiesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateControlTechnologySelection(controlTechnology) {
  return {
    type: types.UPDATE_CONTROL_TECHNOLOGY_SELECTION,
    controlTechnology,
  };
}

/* ---------STATES---------- */
export function loadStatesSuccess(states) {
  return {
    type: types.LOAD_STATES_SUCCESS,
    stateTerritory: states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false}))
  };
}

export function loadStates() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getStates
      .then((res) => {
        dispatch(loadStatesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateStateSelection(stateTerritory){
  return {
    type: types.UPDATE_STATE_SELECTION,
    stateTerritory,
  }
}

/* ---------ACCOUNT TYPE----------- */
export function loadAccountTypesSuccess(accountTypes) {
  return {
    type: types.LOAD_ACCOUNT_TYPES_SUCCESS,
    accountType: restructureAccountTypes(accountTypes),
  };
}

export function loadAccountTypes() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getAccountTypes
      .then((res) => {
        dispatch(loadAccountTypesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateAccountTypeSelection(accountType) {
  return {
    type: types.UPDATE_ACCOUNT_TYPE_SELECTION,
    accountType,
  };
}

/* ---------ACCOUNT NAME/NUMBER---------- */
export function loadAccountNameNumbersSuccess(accountNameNumbers) {
  return {
    type: types.LOAD_ACCOUNT_NAME_NUMBER_SUCCESS,
    accountNameNumber: accountNameNumbers.map(ann=> ({id: ann.accountNumber, label:`${ann.accountName} (${ann.accountNumber})`, selected:false}))
  };
}

export function loadAccountNameNumbers() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getAllAccounts()
      .then((res) => {
        dispatch(loadAccountNameNumbersSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateAccountNameNumberSelection(accountNameNumber){
  return {
    type: types.UPDATE_ACCOUNT_NAME_NUMBER_SELECTION,
    accountNameNumber,
  }
}
