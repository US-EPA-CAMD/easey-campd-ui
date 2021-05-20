import React from 'react';
import { render } from '@testing-library/react';
import UnitCheckboxRenderer from './UnitCheckboxRenderer';
import { restructureUnitTypes } from '../../utils/selectors/hourlyEmissions';

const unitType = [
  {
    unitTypeCode: 'AF',
    unitTypeDescription: 'Arch-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'BFB',
    unitTypeDescription: 'Bubbling fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'C',
    unitTypeDescription: 'Cyclone boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CB',
    unitTypeDescription: 'Cell burner boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CC',
    unitTypeDescription: 'Combined cycle',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'CFB',
    unitTypeDescription: 'Circulating fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CT',
    unitTypeDescription: 'Combustion turbine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'DB',
    unitTypeDescription: 'Dry bottom wall-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'DTF',
    unitTypeDescription: 'Dry bottom turbo-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'DVF',
    unitTypeDescription: 'Dry bottom vertically-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'ICE',
    unitTypeDescription: 'Internal combustion engine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'IGC',
    unitTypeDescription: 'Integrated gasification combined cycle',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'KLN',
    unitTypeDescription: 'Cement Kiln',
    sortOrder: null,
    unitTypeGroupCode: 'F',
    unitTypeGroupDescription: 'Furnance',
  },
  {
    unitTypeCode: 'OB',
    unitTypeDescription: 'Other boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'OT',
    unitTypeDescription: 'Other turbine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'PFB',
    unitTypeDescription: 'Pressurized fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'PRH',
    unitTypeDescription: 'Process Heater',
    sortOrder: null,
    unitTypeGroupCode: 'F',
    unitTypeGroupDescription: 'Furnance',
  },
  {
    unitTypeCode: 'S',
    unitTypeDescription: 'Stoker',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'T',
    unitTypeDescription: 'Tangentially-fired',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WBF',
    unitTypeDescription: 'Wet bottom wall-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WBT',
    unitTypeDescription: 'Wet bottom turbo-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WVF',
    unitTypeDescription: 'Wet bottom vertically-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
];
const storeUnitType = restructureUnitTypes(unitType);

describe('Unit Type Renderer Component', () => {
  it('renders form elements without errors for Boilers and Turbines groups', () => {
    const { getAllByTestId, getAllByRole, getByText } = render(
      <UnitCheckboxRenderer
        showActiveRetired={false}
        items={storeUnitType}
        enableSelectAll={true}
        onSelectAll={jest.fn()}
        onSelectItem={jest.fn()}
      />
    );

    const boilersHeader = getByText('Boilers');
    expect(boilersHeader).toBeInTheDocument();
    const turbinesHeader = getByText('Turbines');
    expect(turbinesHeader).toBeInTheDocument();

    const selectAllCheckBoxes = getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(3);

    const checkbox = getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      storeUnitType[0].items.length +
        storeUnitType[1].items.length +
        storeUnitType[2].items.length +
        selectAllCheckBoxes.length
    );
  });
});
