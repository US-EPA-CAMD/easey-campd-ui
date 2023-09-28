import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
  screen,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';
import OwnerOperator from './OwnerOperator';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import render from '../../../mocks/render';
import { mockOwnerOperators } from '../mocks/mocks';

jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));
const ownerOperators = [...mockOwnerOperators];
const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.ownerOperator = distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}));
initStateCopy.customDataDownload.dataType="COMPLIANCE";
initStateCopy.customDataDownload.dataSubType="Allowance Based";
const store = configureStore(initStateCopy);

let flyOutClosed;
let applyFilterLoading;

describe('- Owner Operator Filter Criteria Component -', () => {
  beforeEach(() => {
    flyOutClosed = false;
    applyFilterLoading = false;
    render(
      <OwnerOperator
        closeFlyOutHandler ={()=> flyOutClosed=true}
        renderedHandler={jest.fn()}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
        />, store);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Owner/Operator");
    expect(screen.getByTestId("label").innerHTML).toBe("Select or Search Owners/Operators");
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it('should render list of owner operators data in multi-select combo-box', async () => {
    fireEvent.click(screen.getByTestId("input-search"));
    const listBox = screen.getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(distinctOwnOpers.length);
  });

  it('should search using input box for owner operators, select and apply it', async() => {
    const searchbox = screen.getByTestId("input-search");
    fireEvent.change(searchbox, { target: { value: 'AES Corporation' } })
    expect(searchbox.value).toBe('AES Corporation');
    expect(screen.getAllByRole("option").length).toBe(1);

    fireEvent.click(screen.getAllByRole("option")[0]);
    expect(screen.getByRole("button", {name: "AES Corporation"})).toBeDefined();
    
    fireEvent.click(screen.getByRole("button", {name: "Apply Filter"}))
    await waitFor(() => expect(applyFilterLoading).toBe(false))
    expect(flyOutClosed).toBe(true);
  })

});
