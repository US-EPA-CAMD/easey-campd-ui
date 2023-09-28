import React from 'react';
import {
  cleanup,
  fireEvent,
  waitFor,
  within,
  screen,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';
import SourceCategory from './SourceCategory';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import render from '../../../mocks/render';
import { mockSourceCategories } from '../mocks/mocks';

const sourceCategories = [...mockSourceCategories];
jest.mock("../../../utils/selectors/filterLogic", () => ({
  engageFilterLogic: jest.fn(),
}));
const initStateCopy = cloneDeep(initialState)
initStateCopy.filterCriteria.sourceCategory = sourceCategories.map(f=> ({id: f.sourceCategoryCode, label:f.sourceCategoryDescription, selected:false, enabled:true}));
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe('- Source Category Filter Criteria Component -', () => {
  beforeEach(() => {
    render(
      <SourceCategory
        closeFlyOutHandler ={()=> flyOutClosed=true}
        renderedHandler ={jest.fn()}
        setApplyFilterLoading={(bool) => applyFilterLoading = bool}
      />, store);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    expect(screen.getByTestId("filter-criteria-title").innerHTML).toBe("Source Category");
    expect(screen.getByTestId("label").innerHTML).toBe("Select or Search Source Categories");
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Cancel"})).toBeDefined();
    expect(screen.getByRole("button", {name: "Apply Filter"})).toBeDefined();
  });

  it('should render list of source catergories data in multi-select combo-box', async () => {
    fireEvent.click(screen.getByTestId("input-search"));
    const listBox = screen.getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(sourceCategories.length);
  });

  it('should search using input box for source categories, select and apply it', async() => {
    const searchbox = screen.getByTestId("input-search");
    fireEvent.change(searchbox, { target: { value: 'Automotive Stampings' } })
    expect(searchbox.value).toBe('Automotive Stampings');
    expect(screen.getAllByRole("option").length).toBe(1);

    fireEvent.click(screen.getAllByRole("option")[0]);
    expect(screen.getByRole("button", {name: "Automotive Stampings"})).toBeDefined();
    
    fireEvent.click(screen.getByRole("button", {name: "Apply Filter"}))
    await waitFor(() => expect(applyFilterLoading).toBe(false))
    expect(flyOutClosed).toBe(true);
  })
});
