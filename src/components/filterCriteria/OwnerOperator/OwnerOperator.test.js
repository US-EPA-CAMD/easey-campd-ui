import React from 'react';
import {
  cleanup,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import OwnerOperator from './OwnerOperator';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import { updateOwnerOperatorSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import render from '../../../mocks/render';


const ownerOperators = [
  {
    "ownId": 52186,
    "ownerOperator": "A.T. Massey Coal Company",
    "ownType": "OWN"
  },
  {
    "ownId": 52193,
    "ownerOperator": "AES Corporation",
    "ownType": "OPR"
  },
  {
    "ownId": 52193,
    "ownerOperator": "AES Corporation",
    "ownType": "OWN"
  },
  {
    "ownId": 52210,
    "ownerOperator": "AMVEST Coal Sales, Inc.",
    "ownType": "OWN"
  },
  {
    "ownId": 52215,
    "ownerOperator": "AYP Energy, Inc.",
    "ownType": "OWN"
  },
  {
    "ownId": 52222,
    "ownerOperator": "Air Products and Chemicals, Inc.",
    "ownType": "OWN"
  }];
const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
const initStateCopy = cloneDeep(initialState)

initStateCopy.filterCriteria.ownerOperator = distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}))
const store = configureStore(initStateCopy);

let flyOutClosed = false;
let applyFilterLoading = false;

describe('Owner Operator Component', () => {
  let query;
  beforeEach(() => {
    flyOutClosed = false;
    applyFilterLoading = false;
    query = render(
        <OwnerOperator
          ownerOperator ={jest.fn()}
          dataSubType ={jest.fn()}
          appliedFilters ={jest.fn()}
          updateOwnerOperatorDispatcher ={updateOwnerOperatorSelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler={jest.fn()}
          setApplyFilterLoading={(bool) => applyFilterLoading = bool}
          />, store);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getAllByTestId, getByText} = query;
    expect(getByText("Owner/Operator")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initStateCopy.filterCriteria.ownerOperator.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  it('It should search using input box for Owners Operators in listboxt and add selection to apply filter', async() => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    await fireEvent.click(searchbox);
    await fireEvent.change(searchbox, { target: { value: 'AES Corporation' } });
    await fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    await fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('AES Corporation');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    await fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "AES Corporation"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(distinctOwnOpers.length);
    await fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false))
  })
});
