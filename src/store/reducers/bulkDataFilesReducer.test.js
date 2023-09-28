import bulkDataFilesReducer from "./bulkDataFilesReducer";
import * as types from '../actions/actionTypes';
import { mockBulkDataFilesRecords } from "../mocks/mocks";
import initialState from "./initialState";

const bulkDataFiles = [...mockBulkDataFilesRecords];
describe("- bulk data files Reducer -", () => {
  it("should update state when load buld data files actions are dispatched", () => {
    let state, action;
    action = {
      type: types.LOAD_BULK_DATA_FILES_SUCCESS,
      bulkDataFiles : bulkDataFiles
    };;
    state = bulkDataFilesReducer(initialState.bulkDataFiles, action);
    expect(state.dataTable.length).toEqual(bulkDataFiles.length);
  });
  it("should update state when updating buld data files actions are dispatched", () => {
    let state, action;
    action = {
      type: types.UPDATE_BULK_DATA_FILES,
      bulkDataFiles : bulkDataFiles
    };;
    state = bulkDataFilesReducer(initialState.bulkDataFiles, action);
    expect(state.dataTable).toEqual(bulkDataFiles);
  });
});
