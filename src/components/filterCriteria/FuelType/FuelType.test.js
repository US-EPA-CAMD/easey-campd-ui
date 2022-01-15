import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { FuelType} from './FuelType';
import { restructureFuelTypes } from '../../../utils/selectors/filterCriteria';
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
let flyoutClosed = false;
const storeFuelType = restructureFuelTypes(fuelType);

describe('Fuel Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
        <FuelType
          closeFlyOutHandler={() => flyoutClosed = true}
          storeFuelType={storeFuelType}
          appliedFilters={[]}
          updateFuelTypeSelectionDispatcher={jest.fn()}
          updateFilterCriteriaDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          renderedHandler ={jest.fn()}
          dataType="EMISSIONS"
          dataSubType="Facility/Unit Attributes"
          filterCriteria={initialState.filterCriteria}
        />
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
    const { getByRole, getByText } = queries;
    const coalCheckbox = getByRole('checkbox', {
      name: 'Coal (C)',
    });
    fireEvent.click(coalCheckbox);
    expect(coalCheckbox.checked).toEqual(true);

    const selectAllGas = getByRole('checkbox', {
      name: 'All Gas',
    });
    fireEvent.click(selectAllGas);
    expect(selectAllGas.checked).toEqual(true);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    fireEvent.click(applyFilterButton);
    expect(flyoutClosed).toBe(true);
  });
});
