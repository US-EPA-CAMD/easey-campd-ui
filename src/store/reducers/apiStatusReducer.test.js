import apiStatusReducer from "./apiStatusReducer";
import {beginApiCall} from "../actions/apiStatusActions";
import {loadDataPreviewSuccess} from "../actions/customDataDownload/customDataDownload";
import initialState from "./initialState";

describe("API status reducer", () => {
  it("should update state when BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS actions are dispatched", () => {
    const hourlyEmissions = [
      {
        test: 'Some value',
      },
      {
        test2: 'Another value',
      },
    ];
    const successResponse = {
      data: hourlyEmissions,
      headers: {
        'x-total-count': hourlyEmissions.length,
        'x-field-mappings': [{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}]
      },
    };
    let state, action;
    action = beginApiCall();
    state = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(state).toEqual(1);

    action = loadDataPreviewSuccess(successResponse.data, successResponse.headers['x-total-count'], successResponse.headers['x-field-mappings']);
    state = apiStatusReducer(state, action)
    expect(state).toEqual(0);
  });
});
