import React from "react";
import CustomDataDownload from "./CustomDataDownload";
import {
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import { cloneDeep } from "lodash";
import initialState from "../../../store/reducers/initialState";
import { MemoryRouter } from "react-router";
window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock("@trussworks/react-uswds", () => ({
  ...jest.requireActual("@trussworks/react-uswds"),
  Modal:
    () =>
    ({ children }) =>
      <>{children}</>,
}));
// jest.mock('../../ApiErrorAlert/ApiErrorAlert', () => () => <></>)

jest.mock("../../Tooltip/Tooltip", () => () => <></>);
const initStateCopy = cloneDeep(initialState);
initStateCopy.customDataDownload.dataType = "COMPLIANCE";
initStateCopy.filterCriteria.stateTerritory = [
  { id: "AK", label: "Alaska", selected: false, enabled: true },
];
const store = configureStore(initStateCopy);

const matsDataType = "MERCURY AND AIR TOXICS EMISSIONS";
const complianceDataType = "COMPLIANCE";

afterEach(cleanup);
describe("CustomDataDownload", () => {
  test("Check that the  component properly renders", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId("manage-data-download-wrapper")).toBeVisible();
  });
});

describe("datatype and subtype selection", () => {
  test("filter button is disabled initially", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const filtersButton = getByRole("button", { name: /filters/i });
    expect(filtersButton).toBeDisabled();
  });

  test("Apply button is disabled before selection", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });

  test("Apply button is enabled after dataType and dataSubtype selection", () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).not.toBeDisabled();
  });

  test("apply button is enabled if there is only one data subtype after datatype selection", async () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];

    fireEvent.change(dataTypeDropdown, {
      target: { value: matsDataType },
    });
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).not.toBeDisabled();
  });

  test("apply button is disabled when there are multiple data subtypes after datatype selection", () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];

    fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });

  test("data subtype dropdown is disabled if there is only one data subtype", () => {
    const { getAllByTestId, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, { target: { value: matsDataType } });
    expect(dataSubtypeDropdown).toBeDisabled();
  });

  // test('mats caveat is displayed if mats datatype is selected', async () => {
  //   const { getAllByTestId, getByRole, findAllByTestId } = render(
  //     <Provider store={store}>
  //       <MemoryRouter><CustomDataDownload setApiError={jest.fn()} /></MemoryRouter>
  //     </Provider>
  //   );
  //   const dataTypeButton = getByRole('button', { name: /data type/i });
  //   fireEvent.click(dataTypeButton);
  //   const dataTypeDropdown = getAllByTestId('dropdown')[0];

  //   fireEvent.change(dataTypeDropdown, {
  //     target: { value: matsDataType },
  //   });
  //   const matsCaveat = await findAllByTestId(/alert/i)[0];
  //   expect(matsCaveat).toBeInTheDocument()
  // });
});

describe("filters", () => {
  test("Filters button is enabled after dataType and dataSubtype are applied", async () => {
    const { getAllByTestId, getByRole, findByRole, debug } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    // const applyButton = getByRole('button', { name: /apply/i });
    // await act(async() => await fireEvent.click(applyButton))
    // debug()
    // const filtersButton = await findByRole('button', { name: /filters/i})
    // expect(filtersButton).not.toBeDisabled();
  });

  test("allows change of data type and data subtype selection", async () => {
    const { getAllByTestId, getByRole, findByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    // const applyButton = getByRole('button', { name: /apply/i });
    // fireEvent.click(applyButton);
    // const changeButton = await findByRole('button', { name: /change/i });
    // expect(changeButton).not.toBeDisabled();
  });

  test('cancel button takes user back to filters', async () => {
    const { getAllByTestId, getByRole, findByRole, debug } = render(
      <Provider store={store}>
        <MemoryRouter><CustomDataDownload setApiError={jest.fn()} /></MemoryRouter>
      </Provider>
    );
    const dataTypeButton = getByRole('button', {name: /data type/i});
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId('dropdown')[0];
    fireEvent.change(dataTypeDropdown, { target: { value: matsDataType } });
    const applyButton = getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    const changeButton = await findByRole('button', { name: /change/i });
    await fireEvent.click(changeButton);
    const cancelButton = await findByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    const filtersHeading = await findByRole('heading', { name: /filters/i });
    expect(filtersHeading).toBeInTheDocument()
      // debug()
  }, 30000)
});

describe("filter selection functionality", () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomDataDownload setApiError={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const { getAllByTestId, getByRole } = query;
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });

    // const applyButton = getByRole('button', { name: /apply/i });
    // fireEvent.click(applyButton);
  });

  test("preview data button is disabled initially", () => {
    const { getAllByRole } = query;
    const previewDataButton = getAllByRole("button", {
      name: /Preview Data/i,
    })[0];
    expect(previewDataButton).toBeDisabled();
  });

  test('preview button is enabled after a filter is selected', async() => {
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
    // const applyFilterButton = getByRole('button', { name: /apply filter/i });
    // await fireEvent.click(applyFilterButton);
    // const previewDataButton = getAllByRole('button', { name: /Preview Data/i })[0];
    // waitFor(()=>expect(previewDataButton).not.toBeDisabled());
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

    // const applyFilterButton = getByRole('button', { name: /apply filter/i });
    // fireEvent.click(applyFilterButton);

    // const clearAllButton = getAllByRole('button', {
    //   name: /clear all/i,
    // })[0];

    // fireEvent.click(clearAllButton);
    // const previewDataButton = getAllByRole('button', { name: /Preview Data/i })[0];
    // expect(previewDataButton).toBeDisabled();
  });
});
