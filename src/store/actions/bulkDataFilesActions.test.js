import * as actions from "./bulkDataFilesActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import initState from "../reducers/initialState";
import createMockStore  from "redux-mock-store";
import { mockBulkDataFilesRecords } from "../mocks/mocks";
import * as camdApi from '../../utils/api/camdApi';

const bulkDataFiles = [...mockBulkDataFilesRecords];
const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe("bulk data files Async Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create BEGIN_API_CALL and LOAD_BULK_DATA_FILES_SUCCESS when loading list of bulk data files", () => {
    
    const mockGetBulkDataFilesList = jest.fn().mockResolvedValue({data: [...mockBulkDataFilesRecords]});
    jest.spyOn(camdApi, "getBulkDataFilesList").mockImplementation(mockGetBulkDataFilesList); 

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_BULK_DATA_FILES_SUCCESS,
        bulkDataFiles:bulkDataFiles,
      },
    ];

    const store = mockStore(initState.bulkDataFiles);
    return store.dispatch(actions.loadBulkDataFiles()).then(() => {
      expect(mockGetBulkDataFilesList).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create UPDATE_BULK_DATA_FILES when updating bulk data files",()=>{
    const expectedActions = [
      {
        type: types.UPDATE_BULK_DATA_FILES,
        bulkDataFiles: bulkDataFiles,
      },
    ];

    const store = mockStore(initState.bulkDataFiles);
    store.dispatch(actions.updateBulkDataFiles(bulkDataFiles));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create LOAD_BULK_DATA_FILES_SUCCESS when updating bulk data files",()=>{
    const expectedActions = [
      {
        type: types.LOAD_BULK_DATA_FILES_SUCCESS,
        bulkDataFiles: bulkDataFiles,
      },
    ];

    const store = mockStore(initState.bulkDataFiles);
    store.dispatch(actions.loadBulkDataFilesSuccess(bulkDataFiles));
    expect(store.getActions()).toEqual(expectedActions);
  })
});
