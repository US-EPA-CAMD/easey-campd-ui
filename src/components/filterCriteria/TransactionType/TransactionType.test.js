import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import TransactionType from './TransactionType';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import render from '../../../mocks/render';

const transactionTypes = [
  {
    "transactionTypeCode": "AD",
    "transactionTypeDescription": "Activate Conditional Allowances"
  },
  {
    "transactionTypeCode": "AT",
    "transactionTypeDescription": "Transfer Due to Corrected Energy Conservation"
  },
  {
    "transactionTypeCode": "CASURR",
    "transactionTypeDescription": "Compliance Assurance Surrender"
  },
  {
    "transactionTypeCode": "CC",
    "transactionTypeDescription": "Substitution Control by Contract Deduction"
  },
  {
    "transactionTypeCode": "CR",
    "transactionTypeDescription": "Conservation Issuance"
  },
  {
    "transactionTypeCode": "DE",
    "transactionTypeDescription": "Reallocation Transfer"
  },
  {
    "transactionTypeCode": "DI",
    "transactionTypeDescription": "Reallocation Surrender"
  },
  {
    "transactionTypeCode": "EB",
    "transactionTypeDescription": "Energy Biomass Issuance"
  },
  {
    "transactionTypeCode": "EG",
    "transactionTypeDescription": "Energy Geothermal Issuance"
  },
  {
    "transactionTypeCode": "EMADJ",
    "transactionTypeDescription": "Emissions Adjustment Deduction"
  },
  {
    "transactionTypeCode": "EMISS",
    "transactionTypeDescription": "Emissions Deduction"
  },
  {
    "transactionTypeCode": "ENFSURR",
    "transactionTypeDescription": "Enforcement Surrender"
  },
];
const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.transactionType = transactionTypes.map(f=> ({id: f.transactionTypeDescription, label:f.transactionTypeDescription, selected:false, enabled:true}));
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe('Transaction Type Component', () => {
  let query;
  beforeEach(() => {
    query = render(
        <TransactionType
          updatetransactionTypeSelectionDispatcher ={jest.fn()}
          addAppliedFilterDispatcher ={jest.fn()}
          removeAppliedFilterDispatcher ={jest.fn()}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler ={jest.fn()}
          setApplyFilterLoading={(bool) => applyFilterLoading = bool}
        />, store);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getAllByTestId, getByText} = query;
    expect(getByText("Transaction Type")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initStateCopy.filterCriteria.transactionType.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for transaction Type in listboxt and add selection to apply filter', async() => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    await fireEvent.click(searchbox);
    await fireEvent.change(searchbox, { target: { value: 'Conservation Issuance' } })
    expect(searchbox.value).toBe('Conservation Issuance');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    await fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    await fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('Conservation Issuance');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    await fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Conservation Issuance"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(transactionTypes.length);
    await fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false))
  })
});
