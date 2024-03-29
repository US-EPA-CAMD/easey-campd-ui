import * as types from "../actionTypes";
import { beginApiCall } from '../apiStatusActions';
import mapSelectionToApiCall from '../../../utils/api/dataPreviewApi';
import setApiError from "../setApiErrorAction";

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

export function updateSelectedAggregation(aggregation) {
  return {
    type: types.UPDATE_SELECTED_AGGREGATION,
    aggregation,
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

export function loadDataPreviewSuccess(data, totalCount, fieldMappings, excludableColumns=null) {
  return {
    type: types.LOAD_DATA_PREVIEW_SUCCESS,
    dataPreview: {
      data,
      totalCount : totalCount? totalCount : data.length,
      fieldMappings,
      excludableColumns
    },
  };
}

export function loadDataPreview(dataType, dataSubType, filterCriteria, aggregation) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return mapSelectionToApiCall(dataType, dataSubType, filterCriteria, aggregation, () => dispatch(setApiError('dataPreview', true)))
    .then((res) => {
      const excludableColumns = res.headers?.['x-excludable-columns']?  JSON.parse(res.headers['x-excludable-columns']) : [];
      dispatch(
        loadDataPreviewSuccess(res.data, res.headers['x-total-count'], JSON.parse(res.headers['x-field-mappings']), excludableColumns)
      );
    })
    .catch((err) => {
      console.error(err);
      setApiError('dataPreview', true)
    });
  };
}
