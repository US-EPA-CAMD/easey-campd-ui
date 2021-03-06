import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import UnitType from './UnitType';
import { restructureUnitTypes } from '../../../utils/selectors/filterCriteria';
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
    unitTypeGroupDescription: 'Furnaces',
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
    unitTypeGroupDescription: 'Furnaces',
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
initialState.filterCriteria.unitType = storeUnitType;
const store = configureStore(initialState);

describe('Unit Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider store={store}>
        <UnitType
          closeFlyOutHandler={jest.fn()}
          loadUnitTypesDispatcher={jest.fn()}
          updateUnitTypeSelectionDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          renderedHandler={jest.fn()}
        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    const { getByText, getAllByTestId, getAllByRole } = queries;
    expect(getByText('Boilers')).toBeInTheDocument();
    expect(getByText('Turbines')).toBeInTheDocument();
    expect(getByText('Furnaces')).toBeInTheDocument();

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

  it('handles checkbox selection appropriately and applies them', () => {
    const { getByRole } = queries;
    const afbCheckbox = getByRole('checkbox', {
      name: 'Arch-fired boiler (AF)',
    });
    fireEvent.click(afbCheckbox);
    expect(afbCheckbox.checked).toEqual(true);

    const selectAllBoilers = getByRole('checkbox', {
      name: 'All Boilers',
    });
    fireEvent.click(selectAllBoilers);
    expect(selectAllBoilers.checked).toEqual(true);

    const applyButton = getByRole('button', {
      name: 'Apply Filter',
    });
    fireEvent.click(applyButton);

    const klnCheckbox = getByRole('checkbox', {
      name: 'Cement Kiln (KLN)',
    });
    fireEvent.click(klnCheckbox);
    expect(klnCheckbox.checked).toEqual(true);

    fireEvent.click(applyButton);
  });
});
