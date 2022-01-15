import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';

import SourceCategory from './SourceCategory';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";
import { loadSourceCategories, updateSourceCategorySelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";

const sourceCategories = [
  {
    "sourceCategoryCode": "AUTSTMP",
    "sourceCategoryDescription": "Automotive Stampings"
  },
  {
    "sourceCategoryCode": "BKINCHM",
    "sourceCategoryDescription": "Bulk Industrial Chemical"
  },
  {
    "sourceCategoryCode": "CEMENTM",
    "sourceCategoryDescription": "Cement Manufacturing"
  },
  {
    "sourceCategoryCode": "COGEN",
    "sourceCategoryDescription": "Cogeneration"
  },
  {
    "sourceCategoryCode": "ELECTRC",
    "sourceCategoryDescription": "Electric Utility"
  },
  {
    "sourceCategoryCode": "INDBLR",
    "sourceCategoryDescription": "Industrial Boiler"
  },
  {
    "sourceCategoryCode": "INDTUR",
    "sourceCategoryDescription": "Industrial Turbine"
  },
  {
    "sourceCategoryCode": "INSTITU",
    "sourceCategoryDescription": "Institutional"
  },
  {
    "sourceCategoryCode": "IRONSTL",
    "sourceCategoryDescription": "Iron & Steel"
  },
  {
    "sourceCategoryCode": "MUNWAST",
    "sourceCategoryDescription": "Municipal Waste Combustor"
  },
];
initialState.filterCriteria.sourceCategory = sourceCategories.map(f=> ({id: f.sourceCategoryCode, label:f.sourceCategoryDescription, selected:false, enabled:true}));
const store = configureStore(initialState);
let flyOutClosed = false;
describe('Source Category Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <SourceCategory
          loadSourceCategoriesDispatcher ={loadSourceCategories}
          updateSourceCategorySelectionDispatcher ={updateSourceCategorySelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler ={jest.fn()}
        />
      </Provider>);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getAllByTestId, getByText} = query;
    expect(getByText("Source Category")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initialState.filterCriteria.sourceCategory.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for source catergories in listboxt and add selection to apply filter', () => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: 'Automotive Stampings' } })
    expect(searchbox.value).toBe('Automotive Stampings');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('Automotive Stampings');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Automotive Stampings"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(sourceCategories.length);
    fireEvent.click(getByText("Apply Filter"));
    expect(flyOutClosed).toBe(true);
  })
});
