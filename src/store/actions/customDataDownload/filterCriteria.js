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
import {FILTERS_MAP, API_CALLING_FILTERS} from "../../../utils/constants/customDataDownload";

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
    facility: facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true}))
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
    stateTerritory: states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}))
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
    accountNameNumber: accountNameNumbers.map(ann=> ({id: ann.accountNumber, label:`${ann.accountName} (${ann.accountNumber})`, selected:false, enabled:true}))
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

/* ---------OWNER OPERATOR---------- */
export function loadOwnerOperatorsSuccess(ownerOperators) {
  const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
  return {
    type: types.LOAD_OWNER_OPERATOR_SUCCESS,
    ownerOperator: distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}))
  };
}

export function loadOwnerOperators(dataSubType) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getOwnerOperators(dataSubType)
      .then((res) => {
        dispatch(loadOwnerOperatorsSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateOwnerOperatorSelection(ownerOperator){
  return {
    type: types.UPDATE_OWNER_OPERATOR_SELECTION,
    ownerOperator,
  }
}

/* ---------TRANSACTION TYPE---------- */
export function loadTransactionTypesSuccess(transactionType) {
  return {
    type: types.LOAD_TRANSACTION_TYPE_SUCCESS,
    transactionType: transactionType.map(t=> ({id: t.transactionTypeDescription, label: t.transactionTypeDescription, code: t.transactionTypeCode, selected:false, enabled:true}))
  };
}

export function loadTransactionTypes() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getTransactionTypes
      .then((res) => {
        dispatch(loadTransactionTypesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateTransactionTypeSelection(transactionType){
  return {
    type: types.UPDATE_TRANSACTION_TYPE_SELECTION,
    transactionType,
  }
}

/* ---------FILTER MAPPINGS---------- */
export function loadFilterMappingSuccess(filterMapping) {
  return {
    type: types.LOAD_FILTER_MAPPING_SUCCESS,
    filterMapping
  };
}

export function loadFilterMapping(dataType, dataSubType, yearsArray=[]) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getFilterMapping(dataType, dataSubType, yearsArray)
      .then((res) => {
        dispatch(loadFilterMappingSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

/* ---------SOURCE CATEGORY---------- */
export function loadSourceCategoriesSuccess(sourceCategory) {
  return {
    type: types.LOAD_SOURCE_CATEGORY_SUCCESS,
    sourceCategory: sourceCategory.map(t=> ({id: t.sourceCategoryDescription, label: t.sourceCategoryDescription, selected:false, enabled:true}))
  };
}

export function loadSourceCategories() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return filterCriteriaApi
      .getSourceCategories
      .then((res) => {
        dispatch(loadSourceCategoriesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateSourceCategorySelection(sourceCategory){
  return {
    type: types.UPDATE_SOURCE_CATEGORY_SELECTION,
    sourceCategory,
  }
}

const dispatchAction = (result, filter, dispatch) =>{
  switch(filter){
    case API_CALLING_FILTERS[0]:
      dispatch(loadProgramsSuccess(result));
      break;
    case API_CALLING_FILTERS[1]:
      dispatch(loadStatesSuccess(result));
      break;
    case API_CALLING_FILTERS[2]:
      dispatch(loadSourceCategoriesSuccess(result));
      break;
    case API_CALLING_FILTERS[3]:
      dispatch(loadFacilitiesSuccess(result));
      break;
    case API_CALLING_FILTERS[4]:
      dispatch(loadUnitTypesSuccess(result));
      break;
    case API_CALLING_FILTERS[5]:
      dispatch(loadFuelTypesSuccess(result));
      break;
    case API_CALLING_FILTERS[6]:
      dispatch(loadControlTechnologiesSuccess(result));
      break;
    case API_CALLING_FILTERS[7]:
      dispatch(loadAccountTypesSuccess(result));
      break;
    case API_CALLING_FILTERS[8]:
      dispatch(loadAccountNameNumbersSuccess(result));
      break;
    case API_CALLING_FILTERS[9]:
      dispatch(loadTransactionTypesSuccess(result));
      break;
    case API_CALLING_FILTERS[10]:
      dispatch(loadOwnerOperatorsSuccess(result));
      break;
    default:
  }
};

export const loadAllFilters = (dataType, dataSubType, filterCriteria) =>{
  const filters = FILTERS_MAP[dataType][dataSubType].map(obj => obj.value);
  const promises=[];
  const apiCallOrder=[];
  return(dispatch) => {
    if(filters.includes(API_CALLING_FILTERS[0])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getPrograms(dataType, dataSubType === "Holdings"? true : false));
      apiCallOrder.push(API_CALLING_FILTERS[0]);
    }
    if(filterCriteria.stateTerritory.length === 0 && filters.includes(API_CALLING_FILTERS[1])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getStates);
      apiCallOrder.push(API_CALLING_FILTERS[1]);
    }
    if(filterCriteria.sourceCategory.length === 0 && filters.includes(API_CALLING_FILTERS[2])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getSourceCategories);
      apiCallOrder.push(API_CALLING_FILTERS[2]);
    }
    if(filterCriteria.facility.length === 0 && filters.includes(API_CALLING_FILTERS[3])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAllFacilities());
      apiCallOrder.push(API_CALLING_FILTERS[3]);
    }
    if(filterCriteria.unitType.length === 0 && filters.includes(API_CALLING_FILTERS[4])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getUnitTypes);
      apiCallOrder.push(API_CALLING_FILTERS[4]);
    }
    if(filterCriteria.fuelType.length === 0 && filters.includes(API_CALLING_FILTERS[5])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getFuelTypes);
      apiCallOrder.push(API_CALLING_FILTERS[5]);
    }
    if(filterCriteria.controlTechnology.length === 0 && filters.includes(API_CALLING_FILTERS[6])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getControlTechnologies);
      apiCallOrder.push(API_CALLING_FILTERS[6]);
    }
    if(filterCriteria.accountType.length === 0 && filters.includes(API_CALLING_FILTERS[7])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAccountTypes);
      apiCallOrder.push(API_CALLING_FILTERS[7]);
    }
    if(filterCriteria.accountNameNumber.length === 0 && filters.includes(API_CALLING_FILTERS[8])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAllAccounts());
      apiCallOrder.push(API_CALLING_FILTERS[8]);
    }
    if(filterCriteria.transactionType.length === 0 && filters.includes(API_CALLING_FILTERS[9])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getTransactionTypes);
      apiCallOrder.push(API_CALLING_FILTERS[9]);
    }
    if(filters.includes(API_CALLING_FILTERS[10])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getOwnerOperators(dataSubType));
      apiCallOrder.push(API_CALLING_FILTERS[10]);
    }
    return Promise.all([...promises])
      .then((values) => {
        console.log(values);
        values.forEach((value, index) =>{
         if(value){
          dispatchAction(value.data, apiCallOrder[index], dispatch)
         }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const updateFilterCriteria = (filterCriteria) =>{
  return {
    type: types.UPDATE_FILTER_CRITERIA,
    filterCriteria,
  }
};
