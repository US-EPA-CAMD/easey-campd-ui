import * as actions from './customDataDownload';
import * as types from '../actionTypes';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../../config';
import initState from '../../reducers/initialState';

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);

describe('custom data download Async Actions', () => {
  /* ---LOAD DATA PREVIEW FOR HOURLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_DATA_PREVIEW_SUCCESS when loading hourly emissions data', () => {
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
    const successResponse = {
      data: hourlyEmissions,
      headers: {
        'x-total-count': hourlyEmissions.length,
        'x-field-mappings': '[{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}]',
        'x-excludable-columns': '[{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}]'
      },
    };
    const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${timePeriod.startDate}&endDate=${timePeriod.endDate}&operatingHoursOnly=${timePeriod.opHrsOnly}`;
    console.log(url);
    mock
      .onGet(url)
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.API_ERRORS, payload: {api: 'dataPreview', state: true, errorMessage: ''}}
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadDataPreview("EMISSIONS","Hourly Emissions", initState.filterCriteria, initState.customDataDownload.aggregation))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
