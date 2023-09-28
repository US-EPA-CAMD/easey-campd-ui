import customDataDownloadReducer from "./customDataDownload";
import * as types from '../../actions/actionTypes';
import initialState from "../initialState";
import {mockDataPreview, mockFilterMapping } from "../../mocks/mocks";

describe("- custom data download Reducer -", () => {
  it("should update state when update data type and data suby type actions are dispatched", () => {
    let state, action;

    const selectedDataType = "EMISSIONS";
    action = {
      type: types.UPDATE_SELECTED_DATATYPE,
      dataType: selectedDataType,
    };;
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataType).toEqual(selectedDataType);

    const selectedDataSubType = "Hourly Emissions";
    action = {
      type: types.UPDATE_SELECTED_DATASUBTYPE,
      dataSubType:selectedDataSubType,
    };;
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataSubType).toEqual(selectedDataSubType);
  });

  it("should update state when resetDataPreview and add applied filter actions are dispatched", () => {
    let state, action;
    initialState.customDataDownload.dataPreview = []
    action = {
      type: types.RESET_DATA_PREVIEW
    };
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataPreview).toEqual(null);

    const appliedFilter = "timePeriod";
    action = {
      type: types.ADD_APPLIED_FILTER,
      appliedFilter,
    };;
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.appliedFilters[0]).toEqual(appliedFilter);
  });

  it("should update state to remove applied filter when REMOVE ALL actions are dispatched", () => {
    let state, action;
    initialState.customDataDownload.appliedFilters = [
      {
        key: 'Time Period',
        values: [
          '1/1/2019 - 1/1/2019'
        ]
      },
      {
        key: 'Program',
        values: [
          'ARP'
        ]
      }
    ];
    action = {
      type: types.REMOVE_APPLIED_FILTER,
      removal:{
        removedFilter : "timePeriod",
        removeAll: true,
        opHours: false,
      }
    };
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.appliedFilters).toEqual([]);    
  });

  it("should update state to remove applied filter when REMOVE ALL is disabled for applied filter timeperid operating hours", () => {
    let state, action;
    initialState.customDataDownload.appliedFilters = [
      {
        key: 'Time Period',
        values: [
          '1/1/2019 - 1/1/2019'
        ]
      },
      {
        key: 'Time Period',
        values: [
          'Operating Hours Only'
        ]
      }
    ];
    action = {
      type: types.REMOVE_APPLIED_FILTER,
      removal:{
        removedFilter : "timePeriod",
        removeAll: false,
        opHours: true,
      }
    };
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.appliedFilters).toEqual([
      {
      "key": "Time Period",
      "values": [
        "1/1/2019 - 1/1/2019",
        ],
      },
      ]);    
  });

  it("should update state when loading data preview action is dispatched", () => {
    const dataPreview = [...mockDataPreview];
    const dataPreviewObj = {
      data : dataPreview,
      totalCount : dataPreview.length,
      fieldMappings: [...mockFilterMapping],
      excludableColumns:[]
    };
    let state, action;
    action = {
      type: types.LOAD_DATA_PREVIEW_SUCCESS,
      dataPreview: dataPreviewObj 
    };
    state = customDataDownloadReducer(initialState.customDataDownload, action);
    expect(state.dataPreview).toEqual(dataPreview);
  });

});
