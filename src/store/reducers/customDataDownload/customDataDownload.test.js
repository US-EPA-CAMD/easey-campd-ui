import customDataDownloadReducer from "./customDataDownload";
import * as actions from "../../actions/customDataDownload/customDataDownload";
import initialState from "../initialState";

describe("custom data download Reducer", () => {
  it("should update state when update data type and data suby type actions are dispatched", () => {
    let state, action;

    const selectedDataType = "EMISSIONS";
    action = actions.updateSelectedDataType(selectedDataType);
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataType).toEqual(selectedDataType);

    const selectedDataSubType = "Hourly Emissions";
    action = actions.updateSelectedDataSubType(selectedDataSubType);
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataSubType).toEqual(selectedDataSubType);
  });

  it("should update state when resetDataPreview and add applied filter actions are dispatched", () => {
    let state, action;

    action = actions.resetDataPreview();
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataPreview).toEqual(null);

    const appliedFilter = "timePeriod";
    action = actions.addAppliedFilter(appliedFilter);
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.appliedFilters[0]).toEqual(appliedFilter);
  });
});
