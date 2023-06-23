import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
  screen
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import TransactionType from './TransactionType';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import render from '../../../mocks/render';
import { mockTransactionTypes } from "../mocks/mocks";

const transactionTypes = [...mockTransactionTypes];
jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));

const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.transactionType = transactionTypes.map(f=> ({id: f.transactionTypeDescription, label:f.transactionTypeDescription, selected:false, enabled:true}));
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe(' - Transaction Type Filter Criteria Component -', () => {
  let query;
  beforeEach(() => {
    render(
      <TransactionType
        closeFlyOutHandler ={()=> flyOutClosed=true}
        renderedHandler ={jest.fn()}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
      />, store);
  });

  afterEach(cleanup);
  it('initial component render works properely', () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Transaction Type");
    expect(screen.getByTestId("label").innerHTML).toBe("Select or Search Transaction Types");
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it('should render list of Transaction Types data in multi-select combo-box', async () => {
    fireEvent.click(screen.getByTestId("input-search"));
    const listBox = screen.getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(transactionTypes.length);
  });

  it('should search using input box for transaction Types, select and apply it', async () => {
    const searchbox = screen.getByTestId("input-search");
    fireEvent.change(searchbox, { target: { value: 'Conservation Issuance' } }); 
    expect(searchbox.value).toBe('Conservation Issuance');
    expect(screen.getAllByRole("option").length).toBe(1);
    
    fireEvent.click(screen.getAllByRole("option")[0])
    expect(screen.getByRole("button", {name: "Conservation Issuance"})).toBeDefined();
  
    fireEvent.click(screen.getByRole("button", {name: "Apply Filter"}))
    await waitFor(() => expect(applyFilterLoading).toBe(false))
    expect(flyOutClosed).toBe(true);
  })

  it('handles click event of Apply Filter and Cancel buttons', async () => {
    fireEvent.click(screen.getByRole("button", {name: "Cancel"}));
    expect(flyOutClosed).toBe(true);

    fireEvent.click(screen.getByRole("button", {name: "Apply Filter"}));
    await waitFor(() => expect(applyFilterLoading).toBe(false))
    expect(flyOutClosed).toBe(true);
  });
});
