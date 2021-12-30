import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FilterCriteriaMenu from './FilterCriteriaMenu';
import { EMISSIONS_FILTERS } from '../../../utils/constants/emissions';
import initialState from '../../../store/reducers/initialState'
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

describe('FilterCriteriaMenu Component', () => {
  test('should render content without error', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FilterCriteriaMenu
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[{ key: 'Time Period', value: '01/01/2019 - 01/01/201' }]}
        />
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
        <FilterCriteriaMenu
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[{ key: 'Time Period', value: '01/01/2019 - 01/01/201' }]}
        />
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
        <FilterCriteriaMenu
          dataSubtypeApplied={true}
          selectedDataType="EMISSIONS"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Hourly Emissions')}
          handleFilterButtonClick={jest.fn()}
          activeFilter="Time Period"
          appliedFilters={[]}
        />
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
        <FilterCriteriaMenu
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
        <FilterCriteriaMenu
          dataSubtypeApplied={true}
          selectedDataType="COMPLIANCE"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Emissions Based')}
          handleFilterButtonClick={jest.fn()}
          appliedFilters={[]}
          filterCriteria={initialState.filterCriteria}
        />
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
        <FilterCriteriaMenu
          dataSubtypeApplied={true}
          selectedDataType="COMPLIANCE"
          getSelectedDataSubType={jest
            .fn()
            .mockImplementation(() => 'Emissions Based')}
          handleFilterButtonClick={jest.fn()}
          appliedFilters={[]}
          filterCriteria={initialState.filterCriteria}
        />
      </MemoryRouter>
    );
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });  
   expect(stateTerritoryFilter).not.toBeDisabled();
  });
  
  
});