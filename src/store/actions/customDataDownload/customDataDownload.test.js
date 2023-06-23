import * as actions from './customDataDownload';
import * as types from '../actionTypes';
import thunk from 'redux-thunk';
import initState from '../../reducers/initialState';
import createMockStore from 'redux-mock-store';

const timePeriod = initState.filterCriteria.timePeriod;
timePeriod.startDate = '2019-01-01';
timePeriod.endDate = '2019-01-01';
timePeriod.opHrsOnly = true;


// Test an async action
const middleware = [thunk];
const mockStore = createMockStore(middleware);
// const mock = new MockAdapter(axios);

describe('custom data download Async Actions', () => {
  /* ---LOAD DATA PREVIEW FOR HOURLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS when loading hourly emissions data', () => {

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_DATA_PREVIEW_SUCCESS}
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadDataPreview("EMISSIONS","Hourly Emissions", initState.filterCriteria, initState.customDataDownload.aggregation))
      .then(() => {
        const storeActions = store.getActions();
        console.log({storeActions, expectedActions});
        expect(storeActions.length).toEqual(expectedActions.length);
      });
  });

});
