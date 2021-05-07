import * as types from "../actionTypes";

export function updateSelectedDataType(selectedDataType) {
  return {
    type: types.UPDATE_SELECTED_DATATYPE,
    selectedDataType,
  };
}

export function updateSelectedDataSubType(selectedDataSubType) {
  return {
    type: types.UPDATE_SELECTED_DATASUBTYPE,
    selectedDataSubType,
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
