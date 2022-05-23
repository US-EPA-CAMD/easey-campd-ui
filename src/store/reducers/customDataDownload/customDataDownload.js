import * as types from "../../actions/actionTypes";
import initialState from "../initialState";


const reducer = (state = initialState.customDataDownload, action) => {
  switch (action.type){
    case types.UPDATE_SELECTED_DATATYPE:
      return Object.assign({}, state, { dataType: action.dataType });
    case types.UPDATE_SELECTED_DATASUBTYPE:
      return Object.assign({}, state, { dataSubType: action.dataSubType });
    case types.UPDATE_SELECTED_AGGREGATION:
      return Object.assign({}, state, { aggregation: action.aggregation });
    case types.RESET_DATA_PREVIEW:
      return {...state, dataPreview: null, totalCount:null};
    case types.ADD_APPLIED_FILTER:
      return {
        ...state,
        appliedFilters: [...state.appliedFilters, action.appliedFilter]
       };
    case types.REMOVE_APPLIED_FILTER:
      const filter = (action.removal.opHours && !action.removal.removeAll)
      ? (el) => el.values[0] !== 'Operating Hours Only'
      : (el) => el.key !== action.removal.removedFilter

      return {
          ...state,
          appliedFilters: action.removal.removeAll ? [] : state.appliedFilters.filter(filter)
      }
    case types.LOAD_DATA_PREVIEW_SUCCESS:
      return Object.assign(
        {},
        state,
        { dataPreview: action.dataPreview.data },
        { totalCount: action.dataPreview.totalCount },
        { fieldMappings: action.dataPreview.fieldMappings },
        { excludableColumns: action.dataPreview.excludableColumns }
      );
    default:
      return state;
  }
};

export default reducer;
