import {produce} from 'immer';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

const reducer = (state = initialState.customDataDownload, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_SELECTED_DATATYPE:
        draft.dataType = action.dataType;
        break;
      case types.UPDATE_SELECTED_DATASUBTYPE:
        draft.dataSubType = action.dataSubType;
        break;
      case types.UPDATE_SELECTED_AGGREGATION:
        draft.aggregation = action.aggregation;
        break;
      case types.RESET_DATA_PREVIEW:
        draft.dataPreview = null;
        draft.totalCount = null;
        break;
      case types.ADD_APPLIED_FILTER:
        draft.appliedFilters.push(action.appliedFilter);
        break;
      case types.REMOVE_APPLIED_FILTER:
        const filter = action.removal.opHours && !action.removal.removeAll
          ? (el) => el.values[0] !== 'Operating Hours Only'
          : (el) => el.key !== action.removal.removedFilter;

        draft.appliedFilters = action.removal.removeAll
          ? []
          : draft.appliedFilters.filter(filter);
        break;
      case types.LOAD_DATA_PREVIEW_SUCCESS:
        draft.dataPreview = action.dataPreview.data;
        draft.totalCount = action.dataPreview.totalCount;
        draft.fieldMappings = action.dataPreview.fieldMappings;
        draft.excludableColumns = action.dataPreview.excludableColumns;
        break;
      default:
        break;
    }
  });
};

export default reducer;
