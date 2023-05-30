import * as actions from './customDataDownload';
import * as types from '../actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import initState from '../../reducers/initialState';

const timePeriod = initState.filterCriteria.timePeriod;
timePeriod.startDate = '2019-01-01';
timePeriod.endDate = '2019-01-01';
timePeriod.opHrsOnly = true;
const hourlyEmissions = [
  {
    test: 'Some value',
  },
  {
    test2: 'Another value',
  },
];


jest.mock("axios", () => ({
  get: () => {
    return Promise.resolve({
      status: 200,
      data: hourlyEmissions,
    });
  },
  defaults: {
    headers:  {
      'x-total-count': hourlyEmissions.length,
      'x-field-mappings': '[{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}]',
      'x-excludable-columns': '[{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}]'
    },
  },
}));
// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const mock = new MockAdapter(axios);

describe('custom data download Async Actions', () => {
  /* ---LOAD DATA PREVIEW FOR HOURLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS when loading hourly emissions data', () => {

    // const url = `${config.services.emissions.uri}/emissions/apportioned/hourly?page=1&perPage=100&beginDate=${timePeriod.startDate}&endDate=${timePeriod.endDate}&operatingHoursOnly=${timePeriod.opHrsOnly}`;
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
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
