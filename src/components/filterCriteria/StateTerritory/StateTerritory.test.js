import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import StateTerritory from './StateTerritory';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import { updateStateSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import render from '../../../mocks/render';

const states = [{
  "stateCode": "AK",
  "stateName": "Alaska",
  "epaRegion": "10"
},
{
  "stateCode": "AL",
  "stateName": "Alabama",
  "epaRegion": "4"
},
{
  "stateCode": "AR",
  "stateName": "Arkansas",
  "epaRegion": "6"
},
{
  "stateCode": "AS",
  "stateName": "American Samoa",
  "epaRegion": "9"
},
{
  "stateCode": "AZ",
  "stateName": "Arizona",
  "epaRegion": "9"
},
{
  "stateCode": "CA",
  "stateName": "California",
  "epaRegion": "9"
},
{
  "stateCode": "CO",
  "stateName": "Colorado",
  "epaRegion": "8"
},
{
  "stateCode": "CT",
  "stateName": "Connecticut",
  "epaRegion": "1"
},
{
  "stateCode": "DC",
  "stateName": "District Of Columbia",
  "epaRegion": "3"
},
{
  "stateCode": "DE",
  "stateName": "Delaware",
  "epaRegion": "3"
},
{
  "stateCode": "FL",
  "stateName": "Florida",
  "epaRegion": "4"
},
{
  "stateCode": "FM",
  "stateName": "States Of Micronesia",
  "epaRegion": "9"
}];
const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.stateTerritory = states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}));
const store = configureStore(initStateCopy);

let flyOutClosed = false;
let applyFilterLoading = false;

describe('State/Territory Component', () => {
  let query;
  beforeEach(() => {
    query = render(
        <StateTerritory
          updateStateSelectionDispatcher ={updateStateSelection}
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
    expect(getByText("State/Territory")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initStateCopy.filterCriteria.stateTerritory.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  it('It should search using input box for states in listboxt', async() => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    await fireEvent.click(searchbox);
    await fireEvent.change(searchbox, { target: { value: 'Alaska' } })
    expect(searchbox.value).toBe('Alaska');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    await fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    await fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    await fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Alaska"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(states.length);
    await fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false))
  })
});
