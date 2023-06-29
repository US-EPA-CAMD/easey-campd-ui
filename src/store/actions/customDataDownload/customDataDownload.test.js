import * as actions from './customDataDownload';
import * as types from '../actionTypes';
import thunk from 'redux-thunk';
import initState from '../../reducers/initialState';
import createMockStore from 'redux-mock-store';
import * as dataPreviewApi from '../../../utils/api/dataPreviewApi';

const timePeriod = initState.filterCriteria.timePeriod;
timePeriod.startDate = '2019-01-01';
timePeriod.endDate = '2019-01-01';
timePeriod.opHrsOnly = true;

const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe('- Custom data download Async Actions -', () => {
  it("should create UPDATE_SELECTED_DATATYPE action dispacher",()=>{
    const dataType = "Allowance"
    const expectedActions = [
      {
        type: types.UPDATE_SELECTED_DATATYPE,
        dataType: dataType,
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.updateSelectedDataType(dataType));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should create UPDATE_SELECTED_DATASUBTYPE action dispacher",()=>{
    const dataSubType = "Daily Emissions"
    const expectedActions = [
      {
        type: types.UPDATE_SELECTED_DATASUBTYPE,
        dataSubType: dataSubType,
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.updateSelectedDataSubType(dataSubType));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should create UPDATE_SELECTED_AGGREGATION action dispacher",()=>{
    const aggregation = "Facility"
    const expectedActions = [
      {
        type: types.UPDATE_SELECTED_AGGREGATION,
        aggregation: aggregation,
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.updateSelectedAggregation(aggregation));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should create RESET_DATA_PREVIEW action dispacher",()=>{
    const expectedActions = [
      {
        type: types.RESET_DATA_PREVIEW,
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.resetDataPreview());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create ADD_APPLIED_FILTER action dispacher",()=>{
    const appliedFilter = "Time Period";
    const expectedActions = [
      {
        type: types.ADD_APPLIED_FILTER,
        appliedFilter:appliedFilter
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.addAppliedFilter(appliedFilter));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create REMOVE_APPLIED_FILTER action dispacher",()=>{
    const removedFilter = "Time Period";
    const expectedActions = [
      {
        type: types.REMOVE_APPLIED_FILTER,
        removal:{
          removedFilter: removedFilter,
          removeAll: false,
          opHours: false,
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    store.dispatch(actions.removeAppliedFilter(removedFilter));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS when loading hourly emissions data', () => {
    
    jest.mock("../../../utils/api/dataPreviewApi", () => ({
      mapSelectionToApiCall: jest.fn(),
    }));
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_DATA_PREVIEW_SUCCESS}
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadDataPreview("EMISSIONS","Hourly Emissions", initState.filterCriteria, initState.customDataDownload.aggregation))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toEqual(expectedActions.length);
      });
  });

});
