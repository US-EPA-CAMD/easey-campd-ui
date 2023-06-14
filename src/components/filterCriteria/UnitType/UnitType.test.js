import React from 'react';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { UnitType } from './UnitType';
import { restructureUnitTypes } from '../../../utils/selectors/filterCriteria';
import initialState from '../../../store/reducers/initialState';
import render from '../../../mocks/render';

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
let flyoutClosed = false;
let applyFilterLoading = false;

describe('Unit Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <UnitType
        storeUnitType={storeUnitType}
        appliedFilters={[]}
        closeFlyOutHandler={() => flyoutClosed = true}
        updateFilterCriteriaDispatcher={jest.fn()}
        updateUnitTypeSelectionDispatcher={jest.fn()}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFilterDispatcher={jest.fn()}
        renderedHandler={jest.fn()}
        dataType="EMISSIONS"
        dataSubType="Facility/Unit Attributes"
        filterCriteria={initialState.filterCriteria}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
      />
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

  it('handles checkbox selection appropriately and applies them', async () => {
    const { getByRole, getByText } = queries;
    const afbCheckbox = getByRole('checkbox', {
      name: 'Arch-fired boiler (AF)',
    });
    await fireEvent.click(afbCheckbox);
    expect(afbCheckbox.checked).toEqual(true);

    const selectAllBoilers = getByRole('checkbox', {
      name: 'All Boilers',
    });
    await fireEvent.click(selectAllBoilers);
    expect(selectAllBoilers.checked).toEqual(true);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    await fireEvent.click(applyFilterButton);
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false))
  });
});
