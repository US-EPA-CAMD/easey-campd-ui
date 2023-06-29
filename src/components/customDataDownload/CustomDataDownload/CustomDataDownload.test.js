import React from "react";
import CustomDataDownload from "./CustomDataDownload";
import { fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore from "../../../store/configureStore.dev";
import { cloneDeep } from "lodash";
import initialState from "../../../store/reducers/initialState";
import render from "../../../mocks/render";
window.HTMLElement.prototype.scrollIntoView = jest.fn();
jest.setTimeout(50000);
jest.mock("../../Tooltip/Tooltip", () => () => <></>);
jest.mock("../../ApiErrorAlert/ApiErrorAlert", () => () => <></>);
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn(),
  },
});

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
    const { getByTestId } = render(<CustomDataDownload />, store);
    expect(getByTestId("manage-data-download-wrapper")).toBeVisible();
  });
});

describe("datatype and subtype selection", () => {
  test("filter button is disabled initially", () => {
    const { getByRole } = render(<CustomDataDownload />, store);
    const filtersButton = getByRole("button", { name: /filters/i });
    expect(filtersButton).toBeDisabled();
  });

  test("Apply button is disabled before selection", () => {
    const { getByRole } = render(<CustomDataDownload />, store);
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const applyButton = getByRole("button", { name: /apply/i });
    expect(applyButton).toBeDisabled();
  });

  test("Apply button is enabled after dataType and dataSubtype selection", () => {
    const { getAllByTestId, getByRole } = render(<CustomDataDownload />, store);
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
    const { getAllByTestId, getByRole } = render(<CustomDataDownload />, store);
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
    const { getAllByTestId, getByRole } = render(<CustomDataDownload />, store);
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
    const { getAllByTestId, getByRole } = render(<CustomDataDownload />, store);
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    fireEvent.change(dataTypeDropdown, { target: { value: matsDataType } });
    expect(dataSubtypeDropdown).toBeDisabled();
  });
});

describe("filters", () => {
  test("Filters button is enabled after dataType and dataSubtype are applied", async () => {
    const { getAllByTestId, getByRole, findByRole } = render(
      <CustomDataDownload />,
      store
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    await fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = getAllByTestId("dropdown")[1];

    await fireEvent.change(dataTypeDropdown, {
      target: { value: complianceDataType },
    });
    await fireEvent.change(dataSubtypeDropdown, { target: { value: 2 } });
    const applyButton = await findByRole("button", { name: /apply/i });
    const filtersButton = await findByRole("button", { name: /filters/i });
    await userEvent.click(applyButton);
    expect(filtersButton).not.toBeDisabled();
  });

  test("allows change of data type and data subtype selection", async () => {
    const { findByRole } = render(<CustomDataDownload />, store);
    const dataTypeButton = await findByRole("button", { name: /data type/i });
    await fireEvent.click(dataTypeButton);
    const dataTypeDropdown = screen.getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = screen.getAllByTestId("dropdown")[1];

    await userEvent.selectOptions(dataTypeDropdown, [complianceDataType]);
    await userEvent.selectOptions(dataSubtypeDropdown, ["Emissions Based"]);
    const applyButton = await findByRole("button", { name: /apply/i });
    await userEvent.click(applyButton);
    const changeButton = await findByRole("button", { name: /change/i });
    expect(changeButton).not.toBeDisabled();
  });

  test("cancel button takes user back to filters", async () => {
    const { getAllByTestId, getByRole, findByRole } = render(
      <CustomDataDownload />,
      store
    );
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = getAllByTestId("dropdown")[0];
    await userEvent.selectOptions(dataTypeDropdown, matsDataType);

    const applyButton = getByRole("button", { name: /apply/i });
    await userEvent.click(applyButton);

    const changeButton = await findByRole("button", { name: /change/i });
    await userEvent.click(changeButton);
    const cancelButton = await findByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);
    const filtersHeading = await findByRole("heading", { name: /filters/i });
    expect(filtersHeading).toBeInTheDocument();
  });
});

describe("filter selection functionality", () => {
  let query;
  beforeEach(async () => {
    query = render(<CustomDataDownload />, store);

    const { getByRole } = query;
    const dataTypeButton = getByRole("button", { name: /data type/i });
    fireEvent.click(dataTypeButton);
    const dataTypeDropdown = screen.getAllByTestId("dropdown")[0];
    const dataSubtypeDropdown = screen.getAllByTestId("dropdown")[1];

    await userEvent.selectOptions(dataTypeDropdown, [complianceDataType]);
    await userEvent.selectOptions(dataSubtypeDropdown, ["Emissions Based"]);

    const applyButton = getByRole("button", { name: /apply/i });
    await userEvent.click(applyButton);
  });

  test("preview data button is disabled initially", () => {
    const { getAllByRole } = query;
    const previewDataButton = getAllByRole("button", {
      name: /Preview Data/i,
    })[0];
    expect(previewDataButton).toBeDisabled();
  });

  test("preview button is enabled after a filter is selected", async () => {
    const { getByRole, getByText, findAllByRole } = query;
    const filtersButton = getByRole("button", { name: "Filters" });
    fireEvent.click(filtersButton);
    const stateTerritoryFilter = getByRole("button", {
      name: "STATE/TERRITORY (Optional)",
    });

    fireEvent.click(stateTerritoryFilter);
    const stateTerritoryComboBox = getByRole("textbox", {
      name: /select or search states\/territories/i,
    });
    fireEvent.click(stateTerritoryComboBox);
    const alaska = getByText(/alaska/i);
    fireEvent.click(alaska);
    const applyFilterButton = getByRole("button", { name: /apply filter/i });
    await userEvent.click(applyFilterButton);
    // await waitForElementToBeRemoved(() => getByAltText("Content loading") )
    const previewDataButton = await findAllByRole("button", {
      name: /Preview Data/i,
    });
    expect(previewDataButton[0]).not.toBeDisabled();
  });

  test("bookmark", async () => {
    const { getByRole, getByText, findAllByRole } = query;
    const filtersButton = getByRole("button", { name: "Filters" });
    fireEvent.click(filtersButton);
    const stateTerritoryFilter = getByRole("button", {
      name: "STATE/TERRITORY (Optional)",
    });

    fireEvent.click(stateTerritoryFilter);
    const stateTerritoryComboBox = getByRole("textbox", {
      name: /select or search states\/territories/i,
    });
    fireEvent.click(stateTerritoryComboBox);
    const alaska = getByText(/alaska/i);
    fireEvent.click(alaska);
    const applyFilterButton = getByRole("button", { name: /apply filter/i });
    await userEvent.click(applyFilterButton);
    // await waitForElementToBeRemoved(() => getByAltText("Content loading") )
    const previewDataButton = await findAllByRole("button", {
      name: /Preview Data/i,
    });
    expect(previewDataButton[0]).not.toBeDisabled();
    await userEvent.click(previewDataButton[0]);
    const bookmarkButtons = await findAllByRole("button", {
      name: /Bookmark/i,
    });
    await userEvent.click(bookmarkButtons[0]);
    // screen.debug(undefined, 99999999)
  });

  test("clear all button removes filter selection", async () => {
    const { getByRole, getByText, getAllByRole } = query;
    const filtersButton = getByRole("button", { name: "Filters" });
    fireEvent.click(filtersButton);
    const stateTerritoryFilter = getByRole("button", {
      name: "STATE/TERRITORY (Optional)",
    });
    fireEvent.click(stateTerritoryFilter);
    const stateTerritoryComboBox = getByRole("textbox", {
      name: /select or search states\/territories/i,
    });

    fireEvent.click(stateTerritoryComboBox);

    const alaska = getByText(/alaska/i);

    fireEvent.click(alaska);

    const applyFilterButton = getByRole("button", { name: /apply filter/i });
    await userEvent.click(applyFilterButton);

    const clearAllButton = getAllByRole("button", {
      name: /clear all/i,
    })[0];

    fireEvent.click(clearAllButton);
    const previewDataButton = getAllByRole("button", {
      name: /Preview Data/i,
    })[0];
    expect(previewDataButton).toBeDisabled();
  });
});
