import * as types from '../actions/actionTypes';
import initialState from './initialState';


const bulkDataFilesReducer = (state = initialState.bulkDataFiles, action) => {
  if (action.type === types.LOAD_BULK_DATA_FILES_SUCCESS) {
    return Object.assign({}, state, { dataTable: action.bulkDataFiles });
  }else if (action.type === types.UPDATE_BULK_DATA_FILES) {
    return Object.assign({}, state, { dataTable: action.bulkDataFiles });
  }
  return state;
};

export default bulkDataFilesReducer;
