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
import setApiError from '../setApiErrorAction';

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
export function loadProgramsSuccess(programs, bookmarkFilters) {
  return {
    type: types.LOAD_PROGRAMS_SUCCESS,
    program: restructurePrograms(programs, bookmarkFilters),
  };
}

export function updateProgramSelection(program) {
  return {
    type: types.UPDATE_PROGRAM_SELECTION,
    program,
  };
}

/* ---------FACILITY----------- */
export function loadFacilitiesSuccess(facilities, bookmarkFilters) {
  return {
    type: types.LOAD_FACILITIES_SUCCESS,
    facility: facilities.map(f=> ({
      id: f.facilityId, 
      label:`${f.facilityName} (${f.facilityId})`, 
      selected:bookmarkFilters? bookmarkFilters?.facility.selected.includes(f.facilityId) : false, 
      enabled:bookmarkFilters? bookmarkFilters?.facility.enabled.includes(f.facilityId) 
        || bookmarkFilters?.facility.selected.includes(f.facilityId) : true, 
    }))
  };
}

export function updateFacilitySelection(facility) {
  return {
    type: types.UPDATE_FACILITY_SELECTION,
    facility,
  };
}

/* ---------UNIT TYPE----------- */
export function loadUnitTypesSuccess(unitTypes, bookmarkFilters) {
  return {
    type: types.LOAD_UNIT_TYPES_SUCCESS,
    unitType: restructureUnitTypes(unitTypes, bookmarkFilters),
  };
}

export function updateUnitTypeSelection(unitType) {
  return {
    type: types.UPDATE_UNIT_TYPE_SELECTION,
    unitType,
  };
}

/* ---------FUEL TYPE----------- */
export function loadFuelTypesSuccess(fuelTypes, bookmarkFilters) {
  return {
    type: types.LOAD_FUEL_TYPES_SUCCESS,
    fuelType: restructureFuelTypes(fuelTypes, bookmarkFilters),
  };
}

export function updateFuelTypeSelection(fuelType) {
  return {
    type: types.UPDATE_FUEL_TYPE_SELECTION,
    fuelType,
  };
}

/* ---------CONTROL TECHNOLOGY----------- */
export function loadControlTechnologiesSuccess(controlTechnologies, bookmarkFilters) {
  return {
    type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS,
    controlTechnology: restructureControlTechnologies(controlTechnologies, bookmarkFilters),
  };
}

export function updateControlTechnologySelection(controlTechnology) {
  return {
    type: types.UPDATE_CONTROL_TECHNOLOGY_SELECTION,
    controlTechnology,
  };
}

/* ---------STATES---------- */
export function loadStatesSuccess(states, bookmarkFilters) {
  return {
    type: types.LOAD_STATES_SUCCESS,
    stateTerritory: states.map(s=> ({
      id: s.stateCode, 
      label:s.stateName, 
      selected:bookmarkFilters? bookmarkFilters?.stateTerritory.selected.includes(s.stateCode) : false, 
      enabled:bookmarkFilters? bookmarkFilters?.stateTerritory.enabled.includes(s.stateCode) 
        || bookmarkFilters?.stateTerritory.selected.includes(s.stateCode) : true,
    }))
  };
}

export function updateStateSelection(stateTerritory){
  return {
    type: types.UPDATE_STATE_SELECTION,
    stateTerritory,
  }
}

/* ---------ACCOUNT TYPE----------- */
export function loadAccountTypesSuccess(accountTypes, bookmarkFilters) {
  return {
    type: types.LOAD_ACCOUNT_TYPES_SUCCESS,
    accountType: restructureAccountTypes(accountTypes, bookmarkFilters),
  };
}

export function updateAccountTypeSelection(accountType) {
  return {
    type: types.UPDATE_ACCOUNT_TYPE_SELECTION,
    accountType,
  };
}

/* ---------ACCOUNT NAME/NUMBER---------- */
export function loadAccountNameNumbersSuccess(accountNameNumbers, bookmarkFilters) {
  return {
    type: types.LOAD_ACCOUNT_NAME_NUMBER_SUCCESS,
    accountNameNumber: accountNameNumbers.map(ann=> ({
      id: ann.accountNumber, 
      label:`${ann.accountName} (${ann.accountNumber})`, 
      selected:bookmarkFilters? bookmarkFilters?.accountNameNumber.selected.includes(ann.accountNumber) : false, 
      enabled:bookmarkFilters? bookmarkFilters?.accountNameNumber.enabled.includes(ann.accountNumber) 
        || bookmarkFilters?.accountNameNumber.selected.includes(ann.accountNumber) : true,
    }))
  };
}

export function updateAccountNameNumberSelection(accountNameNumber){
  return {
    type: types.UPDATE_ACCOUNT_NAME_NUMBER_SELECTION,
    accountNameNumber,
  }
}

/* ---------OWNER OPERATOR---------- */
export function loadOwnerOperatorsSuccess(ownerOperators, bookmarkFilters) {
  const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
  return {
    type: types.LOAD_OWNER_OPERATOR_SUCCESS,
    ownerOperator: distinctOwnOpers.map(s=> ({
      id: s, 
      label: s, 
      selected:bookmarkFilters? bookmarkFilters?.ownerOperator.selected.includes(s) : false, 
      enabled:bookmarkFilters? bookmarkFilters?.ownerOperator.enabled.includes(s) || bookmarkFilters?.ownerOperator.selected.includes(s) : true,
    }))
  };
}

export function updateOwnerOperatorSelection(ownerOperator){
  return {
    type: types.UPDATE_OWNER_OPERATOR_SELECTION,
    ownerOperator,
  }
}

/* ---------TRANSACTION TYPE---------- */
export function loadTransactionTypesSuccess(transactionType, bookmarkFilters) {
  return {
    type: types.LOAD_TRANSACTION_TYPE_SUCCESS,
    transactionType: transactionType.map(t=> ({
      id: t.transactionTypeCode, 
      label: t.transactionTypeDescription, 
      selected:bookmarkFilters? bookmarkFilters?.transactionType.selected.includes(t.transactionTypeCode) : false, 
      enabled: bookmarkFilters? bookmarkFilters?.transactionType.enabled.includes(t.transactionTypeCode) 
        || bookmarkFilters?.transactionType.selected.includes(t.transactionTypeCode) : true,
    }))
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
        dispatch(setApiError('filterLogic', true));
        console.error(err);
      });
  };
}

/* ---------SOURCE CATEGORY---------- */
export function loadSourceCategoriesSuccess(sourceCategory, bookmarkFilters) {
  return {
    type: types.LOAD_SOURCE_CATEGORY_SUCCESS,
    sourceCategory: sourceCategory.map(t=> ({
      id: t.sourceCategoryDescription, 
      label: t.sourceCategoryDescription, 
      selected: bookmarkFilters? bookmarkFilters?.sourceCategory.selected.includes(t.sourceCategoryDescription) : false, 
      enabled: bookmarkFilters? bookmarkFilters?.sourceCategory.enabled.includes(t.sourceCategoryDescription) 
        || bookmarkFilters?.sourceCategory.selected.includes(t.sourceCategoryDescription) : true,
    }))
  };
}

export function updateSourceCategorySelection(sourceCategory){
  return {
    type: types.UPDATE_SOURCE_CATEGORY_SELECTION,
    sourceCategory,
  }
}

const dispatchAction = (result, filter, dispatch, bookmarkFilters) =>{
  switch(filter){
    case API_CALLING_FILTERS[0]:
      dispatch(loadProgramsSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[1]:
      dispatch(loadStatesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[2]:
      dispatch(loadSourceCategoriesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[3]:
      dispatch(loadFacilitiesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[4]:
      dispatch(loadUnitTypesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[5]:
      dispatch(loadFuelTypesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[6]:
      dispatch(loadControlTechnologiesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[7]:
      dispatch(loadAccountTypesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[8]:
      dispatch(loadAccountNameNumbersSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[9]:
      dispatch(loadTransactionTypesSuccess(result, bookmarkFilters));
      break;
    case API_CALLING_FILTERS[10]:
      dispatch(loadOwnerOperatorsSuccess(result, bookmarkFilters));
      break;
    default:
  }
};

export const loadAllFilters = (dataType, dataSubType, filterCriteria, bookmarkFilters) =>{
  const filters = FILTERS_MAP[dataType][dataSubType].map(obj => obj.value);
  const promises=[];
  const apiCallOrder=[];
  return(dispatch) => {
    if(filterCriteria.program.length === 0 && filters.includes(API_CALLING_FILTERS[0])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getPrograms(dataType, dataSubType === "Holdings"? true : false));
      apiCallOrder.push(API_CALLING_FILTERS[0]);
    }
    if(filterCriteria.stateTerritory.length === 0 && filters.includes(API_CALLING_FILTERS[1])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getStates());
      apiCallOrder.push(API_CALLING_FILTERS[1]);
    }
    if(filterCriteria.sourceCategory.length === 0 && filters.includes(API_CALLING_FILTERS[2])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getSourceCategories());
      apiCallOrder.push(API_CALLING_FILTERS[2]);
    }
    if(filterCriteria.facility.length === 0 && filters.includes(API_CALLING_FILTERS[3])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAllFacilities());
      apiCallOrder.push(API_CALLING_FILTERS[3]);
    }
    if(filterCriteria.unitType.length === 0 && filters.includes(API_CALLING_FILTERS[4])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getUnitTypes());
      apiCallOrder.push(API_CALLING_FILTERS[4]);
    }
    if(filterCriteria.fuelType.length === 0 && filters.includes(API_CALLING_FILTERS[5])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getFuelTypes());
      apiCallOrder.push(API_CALLING_FILTERS[5]);
    }
    if(filterCriteria.controlTechnology.length === 0 && filters.includes(API_CALLING_FILTERS[6])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getControlTechnologies());
      apiCallOrder.push(API_CALLING_FILTERS[6]);
    }
    if(filterCriteria.accountType.length === 0 && filters.includes(API_CALLING_FILTERS[7])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAccountTypes());
      apiCallOrder.push(API_CALLING_FILTERS[7]);
    }
    if(filterCriteria.accountNameNumber.length === 0 && filters.includes(API_CALLING_FILTERS[8])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getAllAccounts());
      apiCallOrder.push(API_CALLING_FILTERS[8]);
    }
    if(filterCriteria.transactionType.length === 0 && filters.includes(API_CALLING_FILTERS[9])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getTransactionTypes());
      apiCallOrder.push(API_CALLING_FILTERS[9]);
    }
    if(filters.includes(API_CALLING_FILTERS[10])){
      dispatch(beginApiCall());
      promises.push(filterCriteriaApi.getOwnerOperators(dataSubType));
      apiCallOrder.push(API_CALLING_FILTERS[10]);
    }
    return Promise.all([...promises])
      .then((values) => {
        values.forEach((value, index) =>{
         if(value){
          dispatchAction(value.data, apiCallOrder[index], dispatch, bookmarkFilters)
         }
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch(setApiError('MDMRetrieval', true))
      });
  }
};

export const updateFilterCriteria = (itemsToUpdate) =>{
  return {
    type: types.UPDATE_FILTER_CRITERIA,
    itemsToUpdate,
  }
};

export const resetFilterCriteriaItems = (itemsToReset) => {
  return {
    type: types.RESET_FILTER_CRITERIA_ITEMS,
    itemsToReset,
  }
};
