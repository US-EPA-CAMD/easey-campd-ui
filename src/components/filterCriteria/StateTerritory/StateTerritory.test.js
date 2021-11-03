import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';

import StateTerritory from './StateTerritory';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";
import { updateStateSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";

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
initialState.filterCriteria.stateTerritory = states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}));
const store = configureStore(initialState);

let flyOutClosed = false;
describe('State/Territory Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <StateTerritory
          updateStateSelectionDispacher ={updateStateSelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler={jest.fn()}
        />
      </Provider>);
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
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initialState.filterCriteria.stateTerritory.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  it('It should search using input box for states in listboxt', () => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: 'Alaska' } })
    expect(searchbox.value).toBe('Alaska');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Alaska"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(states.length);
    fireEvent.click(getByText("Apply Filter"));
    expect(flyOutClosed).toBe(true);
  })
});
