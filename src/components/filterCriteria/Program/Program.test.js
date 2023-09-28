import React from 'react';
import { 
  cleanup,
  fireEvent,
  waitFor,
  screen } from '@testing-library/react';
import Program from './Program';
import configureStore from "../../../store/configureStore.dev";
import { cloneDeep } from 'lodash';
import {restructurePrograms} from "../../../utils/selectors/filterCriteria";
import initialState from '../../../store/reducers/initialState';
import render from '../../../mocks/render';
import { mockProgram } from '../mocks/mocks';

const program = [...mockProgram];
jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));

const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.program = restructurePrograms(program);
initStateCopy.customDataDownload.dataType="EMISSIONS";
initStateCopy.customDataDownload.dataSubType="Hourly Emissions";
const store = configureStore(initStateCopy);
const storeProgam = initStateCopy.filterCriteria.program;
let flyOutClosed = false;
let applyFilterLoading = false;

describe("- Program Filter Criteria Component -", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    render(
        <Program
          closeFlyOutHandler={() => flyOutClosed = true}
          renderedHandler ={jest.fn()}
          setApplyFilterLoading={(bool) => applyFilterLoading = bool}
          />, store
      );
  });

  afterEach(cleanup);

  it("Check the component properly renders", () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Program");
    expect(screen.getByTestId('checkbox-group-active-header').innerHTML).toBe("Active Programs");
    expect(screen.getByTestId('checkbox-group-retired-header').innerHTML).toBe("Retired Programs");
    expect(screen.getAllByTestId('program-group-name')).toHaveLength(3);
    const checkbox = screen.getAllByRole('checkbox')
    expect(checkbox).toHaveLength(storeProgam[0].items.length + storeProgam[1].items.length);
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it("handles checkbox selection appropriately", async () => {
    const arpCheckbox = screen.getByRole('checkbox', {name:"Acid Rain Program (ARP)"});
    fireEvent.click(arpCheckbox);
    expect(arpCheckbox.checked).toEqual(true);
    const applyFilterButton = screen.getByRole("button", {name: "Apply Filter"});
    fireEvent.click(applyFilterButton);
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false));
    expect(flyOutClosed).toBe(true);
  });

});
