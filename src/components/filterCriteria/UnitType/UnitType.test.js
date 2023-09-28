import React from 'react';
import { 
  cleanup,
  fireEvent,
  waitFor,
  screen
 } from '@testing-library/react';
 import { cloneDeep } from 'lodash';
 import configureStore from "../../../store/configureStore.dev";
import UnitType  from './UnitType';
import { restructureUnitTypes } from '../../../utils/selectors/filterCriteria';
import initialState from '../../../store/reducers/initialState';
import render from '../../../mocks/render';
import { mockUnitType } from "../mocks/mocks";

jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));

const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.unitType = restructureUnitTypes([...mockUnitType]);
initStateCopy.customDataDownload.dataType = "EMISSIONS";
initStateCopy.customDataDownload.dataSubType = "Hourly Emissions";
const store = configureStore(initStateCopy);
const { unitType } = initStateCopy.filterCriteria;

let flyOutClosed = false;
let applyFilterLoading = false;

describe('- Unit Type Filter Criteria Component -', () => {
  beforeEach(() => {
    render(
      <UnitType
        closeFlyOutHandler={() => flyOutClosed = true}
        renderedHandler={jest.fn()}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
      />, store
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Unit Type");
    expect(screen.getByText('Boilers')).toBeInTheDocument();
    expect(screen.getByText('Turbines')).toBeInTheDocument();
    expect(screen.getByText('Furnaces')).toBeInTheDocument();

    const selectAllCheckBoxes = screen.getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(3);

    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      unitType[0].items.length +
      unitType[1].items.length +
      unitType[2].items.length +
        selectAllCheckBoxes.length
    );
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it('handles checkbox selection appropriately and applies them', async () => {
    const afbCheckbox = screen.getByRole('checkbox', {
      name: 'Arch-fired boiler (AF)',
    });
    fireEvent.click(afbCheckbox);
    expect(afbCheckbox.checked).toEqual(true);

    const selectAllBoilers = screen.getByRole('checkbox', {
      name: 'All Boilers',
    });
    fireEvent.click(selectAllBoilers);
    expect(selectAllBoilers.checked).toEqual(true);
    const applyFilterButton = screen.getByRole("button", {name: "Apply Filter"});
    fireEvent.click(applyFilterButton);
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false));
    expect(flyOutClosed).toBe(true);
  });
});
