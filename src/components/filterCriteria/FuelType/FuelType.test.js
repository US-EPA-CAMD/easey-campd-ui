import React from 'react';
import { 
  cleanup,
  fireEvent,
  waitFor,
  screen} from '@testing-library/react';
import FuelType from './FuelType';
import configureStore from "../../../store/configureStore.dev";
import { cloneDeep } from 'lodash';
import { restructureFuelTypes } from '../../../utils/selectors/filterCriteria';
import initialState from '../../../store/reducers/initialState';
import render from '../../../mocks/render';
import { mockFuelType } from '../mocks/mocks';

const fuelType = [...mockFuelType];
jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));

const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.fuelType = restructureFuelTypes(fuelType);
initStateCopy.customDataDownload.dataType="EMISSIONS";
initStateCopy.customDataDownload.dataSubType="Facility/Unit Attributes";
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe('- Fuel Type Filter Criteria Component -', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    render(
      <FuelType
        closeFlyOutHandler={() => flyOutClosed = true}
        renderedHandler ={jest.fn()}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
      />, store
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Unit Fuel Type");
    expect(screen.getByLabelText('Coal')).toBeInTheDocument();
    expect(screen.getByLabelText('Gas')).toBeInTheDocument();
    expect(screen.getByLabelText('Oil')).toBeInTheDocument();
    expect(screen.getByLabelText('Other')).toBeInTheDocument();

    const selectAllCheckBoxes = screen.getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(4);

    const checkbox = screen.getAllByRole('checkbox');
    const storeFuelType = initStateCopy.filterCriteria.fuelType;
    expect(checkbox).toHaveLength(
      storeFuelType[0].items.length +
        storeFuelType[1].items.length +
        storeFuelType[2].items.length +
        storeFuelType[3].items.length +
        selectAllCheckBoxes.length
    );
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it('handles checkbox selection appropriately', async () => {
    const coalCheckbox = screen.getByRole('checkbox', {
      name: 'Coal (C)',
    });
    fireEvent.click(coalCheckbox);
    expect(coalCheckbox.checked).toEqual(true);

    const selectAllGas = screen.getByRole('checkbox', {
      name: 'All Gas',
    });
    fireEvent.click(selectAllGas);
    expect(selectAllGas.checked).toEqual(true);
    const applyFilterButton = screen.getByRole("button", {name: "Apply Filter"});
    fireEvent.click(applyFilterButton);
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false));
    expect(flyOutClosed).toBe(true);
  });
});
