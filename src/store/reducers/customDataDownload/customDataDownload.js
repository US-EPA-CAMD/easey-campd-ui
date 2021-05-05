import * as types from "../../actions/actionTypes";
import initialState from "../initialState";


const reducer = (state = initialState.customDataDownload, action) => {
  switch (action.type){
    case types.UPDATE_SELECTED_DATATYPE:
      return Object.assign({}, state, { dataType: action.selectedDataType });
    case types.UPDATE_SELECTED_DATASUBTYPE:
      return Object.assign({}, state, { dataSubType: action.selectedDataSubType });
    case types.RESET_DATA_PREVIEW:
      return {...state, dataPreview: null, totalCount:null};
    case types.ADD_APPLIED_FILTER:
      return {
        ...state,
        appliedFilters: [...state.appliedFilters, action.appliedFilter]
       };
    case types.REMOVE_APPLIED_FILTER:
      return {
        ...state,
        appliedFilters: action.removal.removeAll? [] : state.appliedFilters.filter((e) => e !== action.removal.removedFilter)
      }
    case types.LOAD_HOURLY_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.hourlyEmissions.data }, { totalCount: action.hourlyEmissions.totalCount });
    default:
      return state;
  }
};

export default reducer;
