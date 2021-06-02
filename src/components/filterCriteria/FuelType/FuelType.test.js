import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import FuelType from './FuelType';
import { restructureFuelTypes } from '../../../utils/selectors/filterCriteria';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';

const fuelType = [
  {
    fuelTypeCode: 'C',
    fuelTypeDescription: 'Coal',
    fuelGroupCode: 'COAL',
    fuelGroupDescription: 'All Coal',
  },
  {
    fuelTypeCode: 'CRF',
    fuelTypeDescription: 'Coal Refuse',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'DSL',
    fuelTypeDescription: 'Diesel Oil',
    fuelGroupCode: 'OIL',
    fuelGroupDescription: 'All Oil',
  },
  {
    fuelTypeCode: 'LPG',
    fuelTypeDescription: 'Liquified Petroleum Gas',
    fuelGroupCode: 'GAS',
    fuelGroupDescription: 'All Gas',
  },
  {
    fuelTypeCode: 'NNG',
    fuelTypeDescription: 'Natural Gas',
    fuelGroupCode: 'GAS',
    fuelGroupDescription: 'All Gas',
  },
  {
    fuelTypeCode: 'OGS',
    fuelTypeDescription: 'Other Gas',
    fuelGroupCode: 'GAS',
    fuelGroupDescription: 'All Gas',
  },
  {
    fuelTypeCode: 'OIL',
    fuelTypeDescription: 'Residual Oil',
    fuelGroupCode: 'OIL',
    fuelGroupDescription: 'All Oil',
  },
  {
    fuelTypeCode: 'OOL',
    fuelTypeDescription: 'Other Oil',
    fuelGroupCode: 'OIL',
    fuelGroupDescription: 'All Oil',
  },
  {
    fuelTypeCode: 'OSF',
    fuelTypeDescription: 'Other Solid Fuel',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'PNG',
    fuelTypeDescription: 'Pipeline Natural Gas',
    fuelGroupCode: 'GAS',
    fuelGroupDescription: 'All Gas',
  },
  {
    fuelTypeCode: 'PRG',
    fuelTypeDescription: 'Process Gas',
    fuelGroupCode: 'GAS',
    fuelGroupDescription: 'All Gas',
  },
  {
    fuelTypeCode: 'PRS',
    fuelTypeDescription: 'Process Sludge',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'PTC',
    fuelTypeDescription: 'Petroleum Coke',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'R',
    fuelTypeDescription: 'Refuse',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'TDF',
    fuelTypeDescription: 'Tire Derived Fuel',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'W',
    fuelTypeDescription: 'Wood',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
  {
    fuelTypeCode: 'WL',
    fuelTypeDescription: 'Waste Liquid',
    fuelGroupCode: 'OTHER',
    fuelGroupDescription: 'All Other Fuels',
  },
];

const storeFuelType = restructureFuelTypes(fuelType);
initialState.hourlyEmissions.fuelType = storeFuelType;
const store = configureStore(initialState);

describe('Hourly Emissions Fuel Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider store={store}>
        <FuelType
          closeFlyOutHandler={jest.fn()}
          loadEmissionsProgramsDispatcher={jest.fn()}
          updateProgramSelectionDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    const { getByText, getAllByTestId, getAllByRole } = queries;
    expect(getByText('Coal')).toBeInTheDocument();
    expect(getByText('Gas')).toBeInTheDocument();
    expect(getByText('Oil')).toBeInTheDocument();
    expect(getByText('Other')).toBeInTheDocument();

    const selectAllCheckBoxes = getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(4);

    const checkbox = getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      storeFuelType[0].items.length +
        storeFuelType[1].items.length +
        storeFuelType[2].items.length +
        storeFuelType[3].items.length +
        selectAllCheckBoxes.length
    );
  });

  it('handles checkbox selection appropriately', () => {
    const { getByRole } = queries;
    const afbCheckbox = getByRole('checkbox', {
      name: 'Coal (C)',
    });
    fireEvent.click(afbCheckbox);
    expect(afbCheckbox.checked).toEqual(true);
  });
});
