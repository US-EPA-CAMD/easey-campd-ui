import * as types from './actionTypes';
import * as quartzApi from '../../utils/api/quartzApi';
import { beginApiCall } from './apiStatusActions';

export function loadBulkDataFilesSuccess(bulkDataFiles) {
  return {
    type: types.LOAD_BULK_DATA_FILES_SUCCESS,
    bulkDataFiles
  };
}

export function loadBulkDataFiles() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return quartzApi
      .getBulkDataFilesList()
      .then((res) => {
        dispatch(loadBulkDataFilesSuccess(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function updateBulkDataFiles(bulkDataFiles) {
  return {
    type: types.UPDATE_BULK_DATA_FILES,
    bulkDataFiles
  };
}