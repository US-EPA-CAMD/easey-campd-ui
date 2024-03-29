import * as types from './actionTypes';
import * as camdApi from '../../utils/api/camdApi';
import { beginApiCall } from './apiStatusActions';
import setApiError from './setApiErrorAction';

export function loadBulkDataFilesSuccess(bulkDataFiles) {
  return {
    type: types.LOAD_BULK_DATA_FILES_SUCCESS,
    bulkDataFiles
  };
}

export function loadBulkDataFiles() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return camdApi
      .getBulkDataFilesList(()=>dispatch(setApiError('bulkDataFiles', true)))
      .then((res) => {
        if(res){dispatch(loadBulkDataFilesSuccess(res.data))};
      })
      .catch((err) => {
        dispatch(setApiError('bulkDataFiles', true))
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