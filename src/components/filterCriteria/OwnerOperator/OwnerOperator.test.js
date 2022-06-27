import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
  screen,
} from '@testing-library/react';

import OwnerOperator from './OwnerOperator';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";
import { loadOwnerOperators, updateOwnerOperatorSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";

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
initialState.filterCriteria.ownerOperator = distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}))
const store = configureStore(initialState);

let flyOutClosed = false;
let applyFilterLoading = false;

describe('Owner Operator Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <OwnerOperator
          ownerOperator ={jest.fn()}
          dataSubType ={jest.fn()}
          appliedFilters ={jest.fn()}
          loadownerOperatorsDispatcher ={loadOwnerOperators}
          updateOwnerOperatorDispatcher ={updateOwnerOperatorSelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler={jest.fn()}
          setApplyFilterLoading={() => applyFilterLoading = true}
          />
      </Provider>);
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
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initialState.filterCriteria.ownerOperator.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  it('It should search using input box for Owners Operators in listboxt and add selection to apply filter', () => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: 'AES Corporation' } });
    fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('AES Corporation');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "AES Corporation"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(distinctOwnOpers.length);
    fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
  })
});
