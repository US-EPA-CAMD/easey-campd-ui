import * as types from "../../actions/actionTypes";
import initialState from "../initialState";


const reducer = (state = initialState.customDataDownload, action) => {
  switch (action.type){
    case types.UPDATE_SELECTED_DATATYPE:
      return Object.assign({}, state, { dataType: action.dataType });
    case types.UPDATE_SELECTED_DATASUBTYPE:
      return Object.assign({}, state, { dataSubType: action.dataSubType });
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
    case types.LOAD_HOURLY_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.hourlyEmissions.data }, { totalCount: action.hourlyEmissions.totalCount });
    case types.LOAD_DAILY_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.dailyEmissions.data }, { totalCount: action.dailyEmissions.totalCount });
    case types.LOAD_MONTHLY_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.monthlyEmissions.data }, { totalCount: action.monthlyEmissions.totalCount });
    case types.LOAD_QUARTERLY_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.quarterlyEmissions.data }, { totalCount: action.quarterlyEmissions.totalCount });
    case types.LOAD_OZONE_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.ozoneEmissions.data }, { totalCount: action.ozoneEmissions.totalCount });
    case types.LOAD_ANNUAL_EMISSIONS_SUCCESS:
      return Object.assign({}, state, { dataPreview: action.annualEmissions.data }, { totalCount: action.annualEmissions.totalCount });
    default:
      return state;
  }
};

export default reducer;
