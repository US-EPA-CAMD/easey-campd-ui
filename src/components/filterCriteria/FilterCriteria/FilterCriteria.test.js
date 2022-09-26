import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FilterCriteria from './FilterCriteria';
import { EMISSIONS_FILTERS } from '../../../utils/constants/emissions';
import initialState from '../../../store/reducers/initialState'
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const store = configureStore(initialState);

const filterCriteria = {
    timePeriod: {
        startDate: '2019-01-01',
        endDate: '2019-01-01',
        opHrsOnly: true,
        year: {
          yearArray: [],
          yearString: '',
        },
        month: [],
        quarter: [],
      },
      program: [],
      facility: [],
      unitType: [],
      fuelType: [],
      stateTerritory: [],
      controlTechnology: [],
      accountType: [],
      accountNameNumber: [],
      ownerOperator: [],
      transactionType: [],
      sourceCategory: [],
      filterMapping: [],
  };

describe('FilterCriteria Component', () => {
  test('should render content without error', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <FilterCriteria
            filterCriteria={filterCriteria}
            dataSubtypeApplied={true}
            selectedDataType="EMISSIONS"
            getSelectedDataSubType={jest
              .fn()
              .mockImplementation(() => 'Hourly Emissions')}
            handleFilterButtonClick={jest.fn()}
            activeFilter="Time Period"
            appliedFilters={[{ key: 'Time Period', value: '01/01/2019 - 01/01/201' }]}
          />
        </Provider>
      </MemoryRouter>
    );

    const emissions = EMISSIONS_FILTERS;
    emissions.map((el) => {
        return el.updateFilter? el.updateFilter(filterCriteria) : '';
    })

    expect(getByText("Filters")).toBeDefined();
  });

  test('time period filter should be enabled', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
            filterCriteria={filterCriteria}
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[{ key: 'Time Period', value: '01/01/2019 - 01/01/201' }]}
        />
        </Provider>
      </MemoryRouter>
    );
  
    const timePeriodFilter = getByRole('button', {
      name: 'TIME PERIOD (Required)',
    });
    expect(timePeriodFilter).not.toBeDisabled();
  });
  
  test('state territory filter should be disabled on emissions if no time period is selected', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          filterCriteria={filterCriteria}
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[]}
        />
        </Provider>
      </MemoryRouter>
    );
  
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });
    expect(stateTerritoryFilter).toBeDisabled();
  });
  
  
  
  test('state territory filter should be enabled on emissions after a time period is selected', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          filterCriteria={{...filterCriteria, stateTerritory: [{enabled: true}]}}
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[
            { key: 'Time Period', value: '01/01/2019 - 01/01/201' },
          ]}
        />
        </Provider>
      </MemoryRouter>
    );
  
    const emissions = EMISSIONS_FILTERS;
   emissions.map((el) => {
       return el.updateFilter? el.updateFilter(filterCriteria) : '';
   })
   const stateTerritoryFilter = getByRole('button', {
     name: 'STATE/TERRITORY (Optional)',
   });
   expect(stateTerritoryFilter).not.toBeDisabled();
  });
  
  test('state territory filter should be disabled if it has no items', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          dataSubtypeApplied={true}
          selectedDataType="COMPLIANCE"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Emissions Based')}
          handleFilterButtonClick={jest.fn()}
          appliedFilters={[]}
          filterCriteria={initialState.filterCriteria}
        />
        </Provider>
      </MemoryRouter>
    );
   const stateTerritoryFilter = getByRole('button', {
     name: 'STATE/TERRITORY (Optional)',
   });
   expect(stateTerritoryFilter).toBeDisabled();
  });
  
  test('state territory filter should be enabled if it has enabled items', () => {
    initialState.filterCriteria.stateTerritory = [{
      enabled: true,
      id: 'AK',
      label: 'Alaska',
      selected: false
    }]
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          dataSubtypeApplied={true}
          selectedDataType="COMPLIANCE"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Emissions Based')}
          handleFilterButtonClick={jest.fn()}
          appliedFilters={[]}
          filterCriteria={initialState.filterCriteria}
        />
        </Provider>
      </MemoryRouter>
    );
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });  
   expect(stateTerritoryFilter).not.toBeDisabled();
  });
  
  test('state territory filter should be enabled if it has enabled items', () => {
    initialState.filterCriteria.stateTerritory = [{
      enabled: true,
      id: 'AK',
      label: 'Alaska',
      selected: false
    }]
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          dataSubtypeApplied={true}
          selectedDataType="COMPLIANCE"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Emissions Based')}
          handleFilterButtonClick={jest.fn()}
          appliedFilters={[]}
          filterCriteria={initialState.filterCriteria}
        />
        </Provider>
      </MemoryRouter>
    );
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });  
   expect(stateTerritoryFilter).not.toBeDisabled();
  });
  
  test('facility count should be number of facilities selected if facilities are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          filterCriteria={{...filterCriteria, facility: [{enabled: true}, {enabled: true}, {enabled: true}]}}
          activeFilter="Time Period"
          appliedFilters={[{key: 'Facility', values:['facility1', 'facility2']}]}
        />
        </Provider>
      </MemoryRouter>
    );
    const facilityCount = getByTestId('facilityCount');
    const facilityCountValue = getByText('2');
  expect(facilityCount).toBeInTheDocument();
  expect(facilityCountValue).toBeInTheDocument();
  });


  test('facility count should be number of enabled facilities if no facilities are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
        <FilterCriteria
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          filterCriteria={{...filterCriteria, facility: [{enabled: true}, {enabled: true}, {enabled: true}]}}
          activeFilter="Time Period"
          appliedFilters={[]}
        />
        </Provider>
      </MemoryRouter>
    );
  const facilityCount = getByTestId('facilityCount');
  const facilityCountValue = getByText('3');

  expect(facilityCount).toBeInTheDocument();
  expect(facilityCountValue).toBeInTheDocument();
  });
});