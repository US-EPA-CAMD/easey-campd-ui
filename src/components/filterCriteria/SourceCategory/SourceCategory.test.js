import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import SourceCategory from './SourceCategory';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import { updateSourceCategorySelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import render from '../../../mocks/render';

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
const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.sourceCategory = sourceCategories.map(f=> ({id: f.sourceCategoryCode, label:f.sourceCategoryDescription, selected:false, enabled:true}));
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe('Source Category Component', () => {
  let query;
  beforeEach(() => {
    query = render(
        <SourceCategory
          updateSourceCategorySelectionDispatcher ={updateSourceCategorySelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler ={jest.fn()}
          setApplyFilterLoading={(bool) => applyFilterLoading = bool}
        />, store);
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
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initStateCopy.filterCriteria.sourceCategory.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for source catergories in listboxt and add selection to apply filter', async() => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    await fireEvent.click(searchbox);
    await fireEvent.change(searchbox, { target: { value: 'Automotive Stampings' } })
    expect(searchbox.value).toBe('Automotive Stampings');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    await fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    await fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('Automotive Stampings');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    await fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Automotive Stampings"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(sourceCategories.length);
    await fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
    await waitFor(() => expect(applyFilterLoading).toBe(false))
  })
});
