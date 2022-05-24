import React from "react";
import CustomDataDownload from "./CustomDataDownload";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";

initialState.customDataDownload.dataType= "COMPLIANCE";
initialState.filterCriteria.stateTerritory = [
  { id: 'AK', label: 'Alaska', selected: false, enabled: true },
];
const store = configureStore(initialState);

const matsDataType = 'MERCURY AND AIR TOXICS EMISSIONS';
const complianceDataType = 'COMPLIANCE'

describe("CustomDataDownload", () => {
  test("Check that the  component properly renders", () => {
    const { getByTestId } = render(<Provider store={store}><CustomDataDownload /></Provider>);
    expect(getByTestId("manage-data-download-wrapper")).toBeVisible();
  });
});
  
describe('datatype and subtype selection', () => {
  test('filter button is disabled initially', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const filtersButton = getByRole('button', {name: /filters/i});
    expect(filtersButton).toBeDisabled()
  })

  test('Apply button is disabled before selection', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const applyButton = getByRole('button', { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });

  test('Apply button is enabled after dataType and dataSubtype selection', () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    const dataSubtypeDropdown = getAllByTestId('dropdown')[1];
    
    fireEvent.change(dataTypeDropdown, { target: { value: complianceDataType } });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    const applyButton = getByRole('button', { name: /apply/i });
    expect(applyButton).not.toBeDisabled();
  });

  test('apply button is enabled if there is only one data subtype after datatype selection', async () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];

    fireEvent.change(dataTypeDropdown, {
      target: { value: matsDataType },
    });
    const applyButton = getByRole('button', { name: /apply/i });
    expect(applyButton).not.toBeDisabled();
  });

  test('apply button is disabled when there are multiple data subtypes after datatype selection', () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    
    fireEvent.change(dataTypeDropdown, { target: { value: complianceDataType } });
    const applyButton = getByRole('button', { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });

  test('data subtype dropdown is disabled if there is only one data subtype', () =>{
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    const dataSubtypeDropdown = getAllByTestId('dropdown')[1];
    
    fireEvent.change(dataTypeDropdown, { target: { value: matsDataType } });
    expect(dataSubtypeDropdown).toBeDisabled();
  })

  test('mats caveat is displayed if mats datatype is selected', async () => {
    const { getAllByTestId, getByRole, findByTestId } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];

    fireEvent.change(dataTypeDropdown, {
      target: { value: matsDataType },
    });
    const matsCaveat = await findByTestId(/alert/i);
    expect(matsCaveat).toBeInTheDocument()
  });

  test('Filters button is enabled after dataType and dataSubtype are applied', () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    const dataSubtypeDropdown = getAllByTestId('dropdown')[1];

    fireEvent.change(dataTypeDropdown, { target: { value: complianceDataType } });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    const applyButton = getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton)
    const filtersButton = getByRole('button', { name: /filters/i})
    expect(filtersButton).not.toBeDisabled();
  });

  test('allows change of data type and data subtype selection', () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    const dataSubtypeDropdown = getAllByTestId('dropdown')[1];

    fireEvent.change(dataTypeDropdown, { target: { value: complianceDataType } });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    const applyButton = getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    const changeButton = getByRole('button', { name: /change/i });
    expect(changeButton).not.toBeDisabled();
  });

  test('cancel button takes user back to filters', () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    fireEvent.change(dataTypeDropdown, { target: { value: matsDataType } });
    const applyButton = getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    const changeButton = getByRole('button', { name: /change/i });
    fireEvent.click(changeButton);
    const cancelButton = getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    const newChangeButton = getByRole('button', { name: /change/i });
    expect(newChangeButton).toBeInTheDocument()
  })
});

describe('filter selection functionality', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <CustomDataDownload />
      </Provider>
    );

    const { getAllByTestId, getByRole } = query;
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    const dataSubtypeDropdown = getAllByTestId('dropdown')[1];

    fireEvent.change(dataTypeDropdown, { target: { value: complianceDataType } });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });

    const applyButton = getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
  });

  test('preview data button is disabled initially', () => {
    const { getAllByRole } = query;
    const previewDataButton = getAllByRole('button', { name: /Preview Data/i })[0];
    expect(previewDataButton).toBeDisabled();
  });

  test('preview button is enabled after a filter is selected', () => {
    const { getByRole, getByText, getAllByRole } = query;
    const filtersButton = getByRole('button', {name: 'Filters'})
    fireEvent.click(filtersButton)
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });

    fireEvent.click(stateTerritoryFilter);
    const stateTerritoryComboBox = getByRole('textbox', {
      name: /select or search states\/territories/i,
    });
    fireEvent.click(stateTerritoryComboBox);
    const alaska = getByText(/alaska/i);
    fireEvent.click(alaska);
    const applyFilterButton = getByRole('button', { name: /apply filter/i });
    fireEvent.click(applyFilterButton);
    const previewDataButton = getAllByRole('button', { name: /Preview Data/i })[0];
    expect(previewDataButton).not.toBeDisabled();
  });


  test('clear all button removes filter selection', () => {
    const { getByRole, getByText, getAllByRole } = query;
    const filtersButton = getByRole('button', {name: 'Filters'})
    fireEvent.click(filtersButton)
    const stateTerritoryFilter = getByRole('button', {
      name: 'STATE/TERRITORY (Optional)',
    });
    fireEvent.click(stateTerritoryFilter);
    const stateTerritoryComboBox = getByRole('textbox', {
      name: /select or search states\/territories/i,
    });

    fireEvent.click(stateTerritoryComboBox);

    const alaska = getByText(/alaska/i);

    fireEvent.click(alaska);

    const applyFilterButton = getByRole('button', { name: /apply filter/i });
    fireEvent.click(applyFilterButton);

    const clearAllButton = getAllByRole('button', {
      name: /clear all/i,
    })[0];

    fireEvent.click(clearAllButton);
    const previewDataButton = getAllByRole('button', { name: /Preview Data/i })[0];
    expect(previewDataButton).toBeDisabled();
  });
});