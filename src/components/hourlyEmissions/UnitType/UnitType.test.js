import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import UnitType from './UnitType';
import { restructureUnitTypes } from '../../../utils/selectors/hourlyEmissions';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';

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
initialState.hourlyEmissions.unitType = storeUnitType;
const store = configureStore(initialState);

describe('Hourly Emissions Unit Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider store={store}>
        <UnitType
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
    const { getByText, getAllByLabelText, getAllByRole } = queries;
    expect(getByText('Boilers')).toBeInTheDocument();
    expect(getByText('Turbines')).toBeInTheDocument();

    const selectAllCheckBoxes = getAllByLabelText('Select All');
    expect(selectAllCheckBoxes).toHaveLength(2);

    const checkbox = getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      storeUnitType[0].items.length +
        storeUnitType[1].items.length +
        selectAllCheckBoxes.length
    );
  });

  it('handles checkbox selection appropriately', () => {
    const { getByRole } = queries;
    const afbCheckbox = getByRole('checkbox', {
      name: 'Arch-fired boiler',
    });
    fireEvent.click(afbCheckbox);
    expect(afbCheckbox.checked).toEqual(true);
  });
});
