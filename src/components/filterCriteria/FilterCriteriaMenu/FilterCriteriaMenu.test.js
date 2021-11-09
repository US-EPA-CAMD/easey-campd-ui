import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FilterCriteriaMenu from './FilterCriteriaMenu';
import { EMISSIONS_FILTERS } from '../../../utils/constants/emissions';

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
});
