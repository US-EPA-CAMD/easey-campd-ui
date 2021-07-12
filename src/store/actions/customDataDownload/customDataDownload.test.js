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
  /* --- HOURLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_HOURLY_EMISSIONS_SUCCESS when loading hourly emissions data', () => {
    const timePeriod = initState.filterCriteria.timePeriod;
    timePeriod.startDate = '2019-01-01';
    timePeriod.endDate = '2019-01-01';
    timePeriod.opHrsOnly = true;
    const hourlyEmissions = [
      {
        test: 'Test',
      },
    ];
    const successResponse = {
      data: hourlyEmissions,
      headers: {
        'x-total-count': hourlyEmissions.length,
      },
    };
    mock
      .onGet(
        `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${timePeriod.startDate}&endDate=${timePeriod.endDate}&opHoursOnly=${timePeriod.opHrsOnly}&attachFile=false`
      )
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_HOURLY_EMISSIONS_SUCCESS,
        hourlyEmissions: {
          data: successResponse.data,
          totalCount: successResponse.headers['x-total-count'],
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadHourlyEmissions(initState.filterCriteria))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  /* --- DAILY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_DAILY_EMISSIONS_SUCCESS when loading daily emissions data', () => {
    const timePeriod = initState.filterCriteria.timePeriod;
    timePeriod.startDate = '2019-01-01';
    timePeriod.endDate = '2019-01-01';
    const dailyEmissions = [
      {
        test: 'Test',
      },
    ];
    const successResponse = {
      data: dailyEmissions,
      headers: {
        'x-total-count': dailyEmissions.length,
      },
    };
    mock
      .onGet(
        `${config.services.emissions.uri}/apportioned/daily?page=1&perPage=100&beginDate=${timePeriod.startDate}&endDate=${timePeriod.endDate}&attachFile=false`
      )
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_DAILY_EMISSIONS_SUCCESS,
        dailyEmissions: {
          data: successResponse.data,
          totalCount: successResponse.headers['x-total-count'],
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadDailyEmissions(initState.filterCriteria))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  /* --- MONTHLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_MONTHLY_EMISSIONS_SUCCESS when loading monthly emissions data', () => {
    const timePeriod = initState.filterCriteria.timePeriod;
    timePeriod.year.yearString = '2019';
    timePeriod.year.yearArray = [2019];
    timePeriod.month = [{ id: 1, label: 'January', selected: true }];
    const monthlyEmissions = [
      {
        test: 'Test',
      },
    ];
    const successResponse = {
      data: monthlyEmissions,
      headers: {
        'x-total-count': monthlyEmissions.length,
      },
    };
    mock
      .onGet(
        `${config.services.emissions.uri}/apportioned/monthly?page=1&perPage=100&opYear=${timePeriod.year.yearString}&opMonth=${timePeriod.month[0].id}&attachFile=false`
      )
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_MONTHLY_EMISSIONS_SUCCESS,
        monthlyEmissions: {
          data: successResponse.data,
          totalCount: successResponse.headers['x-total-count'],
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadMonthlyEmissions(initState.filterCriteria))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  /* --- QUARTERLY EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_QUARTERLY_EMISSIONS_SUCCESS when loading quarterly emissions data', () => {
    const timePeriod = initState.filterCriteria.timePeriod;
    timePeriod.year.yearString = '2019';
    timePeriod.year.yearArray = [2019];
    timePeriod.quarter = [{ id: 1, label: 'Q1', selected: true }];
    const quarterlyEmissions = [
      {
        test: 'Test',
      },
    ];
    const successResponse = {
      data: quarterlyEmissions,
      headers: {
        'x-total-count': quarterlyEmissions.length,
      },
    };
    mock
      .onGet(
        `${config.services.emissions.uri}/apportioned/quarterly?page=1&perPage=100&opYear=${timePeriod.year.yearString}&opQuarter=${timePeriod.quarter[0].id}&attachFile=false`
      )
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_QUARTERLY_EMISSIONS_SUCCESS,
        quarterlyEmissions: {
          data: successResponse.data,
          totalCount: successResponse.headers['x-total-count'],
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadQuarterlyEmissions(initState.filterCriteria))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  /* --- OZONE EMISSIONS --- */
  it('should create BEGIN_API_CALL and LOAD_OZONE_EMISSIONS_SUCCESS when loading ozone emissions data', () => {
    const timePeriod = initState.filterCriteria.timePeriod;
    timePeriod.year.yearString = '2019';
    timePeriod.year.yearArray = [2019];
    const ozoneEmissions = [
      {
        test: 'Test',
      },
    ];
    const successResponse = {
      data: ozoneEmissions,
      headers: {
        'x-total-count': ozoneEmissions.length,
      },
    };
    mock
      .onGet(
        `${config.services.emissions.uri}/apportioned/ozone?page=1&perPage=100&opYear=${timePeriod.year.yearString}&attachFile=false`
      )
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.LOAD_OZONE_EMISSIONS_SUCCESS,
        ozoneEmissions: {
          data: successResponse.data,
          totalCount: successResponse.headers['x-total-count'],
        },
      },
    ];

    const store = mockStore(initState.customDataDownload);
    return store
      .dispatch(actions.loadOzoneEmissions(initState.filterCriteria))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

    /* --- ANNUAL EMISSIONS --- */
    it('should create BEGIN_API_CALL and LOAD_ANNUAL_EMISSIONS_SUCCESS when loading annual emissions data', () => {
      const timePeriod = initState.filterCriteria.timePeriod;
      timePeriod.year.yearString = '2019';
      timePeriod.year.yearArray = [2019];
      const annualEmissions = [
        {
          test: 'Test',
        },
      ];
      const successResponse = {
        data: annualEmissions,
        headers: {
          'x-total-count': annualEmissions.length,
        },
      };
      mock
        .onGet(
          `${config.services.emissions.uri}/apportioned/annual?page=1&perPage=100&opYear=${timePeriod.year.yearString}&attachFile=false`
        )
        .reply(200, successResponse.data, successResponse.headers);
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        {
          type: types.LOAD_ANNUAL_EMISSIONS_SUCCESS,
          annualEmissions: {
            data: successResponse.data,
            totalCount: successResponse.headers['x-total-count'],
          },
        },
      ];
  
      const store = mockStore(initState.customDataDownload);
      return store
        .dispatch(actions.loadAnnualEmissions(initState.filterCriteria))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
