import apiStatusReducer from "./apiStatusReducer";
import {beginApiCall} from "../actions/apiStatusActions";
import initialState from "./initialState";

describe("- API status reducer -", () => {
  it("should update state when BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS actions are dispatched", () => {
    let state, action;
    action = beginApiCall();
    state = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(state).toEqual(1);
    action = {
      type : "API_CALL_SUCCESS"
    }
    state = apiStatusReducer(state, action)
    expect(state).toEqual(0);
  });
});
