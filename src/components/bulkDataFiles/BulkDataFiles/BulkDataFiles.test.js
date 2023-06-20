import React from "react";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import render from "../../../mocks/render";
import configureStore from "../../../store/configureStore.dev";
import BulkDataFiles from "./BulkDataFiles";
import initialState from "../../../store/reducers/initialState";
import { dataTable } from "../../../utils/constants/bulkDataFilesTestData";

let store = configureStore(initialState);
jest.setTimeout(50000);

/*****
 */

test("download button is disabled when no files are selected", async () => {
  const { getByRole } = render(<BulkDataFiles />, store);
  const downloadButton = getByRole("button", {
    name: /download/i,
  });
  expect(downloadButton).toBeDisabled();
});
describe("Manage Bulk Data Files component: ", () => {
  afterEach(cleanup);
  beforeEach(() => {
    initialState.bulkDataFiles.dataTable = dataTable;
    store = configureStore(initialState);
  });

  test("download button is enabled after files are selected", async () => {
    const { getByRole, findAllByRole } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const checkbox = await findAllByRole("checkbox");
    await userEvent.click(checkbox[1]);
    const downloadButton = getByRole("button", {
      name: /download/i,
    });
    expect(downloadButton).not.toBeDisabled();
  });

  test("number of files is updated when files are added or removed", async () => {
    const { getByText, findAllByRole } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const checkboxes = await findAllByRole("checkbox");

    const checkbox1 = checkboxes[1];
    const checkbox2 = checkboxes[2];
    await userEvent.click(checkbox1);
    const fileCount = getByText(/files selected: 1/i);
    expect(fileCount).toBeInTheDocument();
    await userEvent.click(checkbox2);
    const updatedFileCount = getByText(/files selected: 2/i);
    expect(updatedFileCount).toBeInTheDocument();
    await userEvent.click(checkbox2);
    expect(fileCount).toBeInTheDocument();
  });

  test("sections render without errors", async () => {
    const query = render(<BulkDataFiles dataTable={dataTable} />, store);
    const { findByText, getByRole, getAllByRole } = query;
    const header = await findByText(/Bulk Data Files/i);
    expect(header).toBeInTheDocument();
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(4);
    expect(getAllByRole("row").length).toBe(
      initialState.bulkDataFiles.dataTable.length - 1
    );
  });

  test("file size is updated when files are added or removed", async () => {
    const { findAllByRole, getByText } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const checkbox = await findAllByRole("checkbox");
    await userEvent.click(checkbox[1]);
    await userEvent.click(checkbox[1]);
    const updatedFileSize = getByText(/size:/i);
    expect(updatedFileSize).toBeInTheDocument();
  });

  test("file size is reset when filters are cleared", async () => {
    const { findAllByRole, getByText, getAllByText } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const checkbox = await findAllByRole("checkbox");
    await userEvent.click(checkbox[1]);
    const clearAllButton = getAllByText(/clear all/i)[0];
    await userEvent.click(clearAllButton);
    const updatedFileSize = getByText(/size:/i);
    expect(updatedFileSize).toBeInTheDocument();
  });

  test("file size is reset when selected data type is selectOptionsd", async () => {
    window.confirm = jest.fn(() => true);
    const { getByText, findByTestId, findAllByRole } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const dataTypeFilter = await findByTestId("dataType-select");
    await userEvent.selectOptions(dataTypeFilter,  "Emissions");
    const checkbox = await findAllByRole("checkbox");
    await userEvent.click(checkbox[0]);
    await userEvent.selectOptions(dataTypeFilter,  "EDR");
    const updatedFileSize = getByText(/size:/i);
    expect(updatedFileSize).toBeInTheDocument();
  });

  test("file size is not reset when year filter is selectOptionsd", async () => {
    window.confirm = jest.fn(() => true);
    const { getByText, findByTestId, findByRole, findAllByRole, debug } =
      render(<BulkDataFiles dataTable={dataTable} />, store);
    const dataTypeFilter = await findByTestId("dataType-select");
    await userEvent.selectOptions(dataTypeFilter,  "Emissions");
    const checkbox = await findAllByRole("checkbox");
    await userEvent.click(checkbox[0]);
    const subTypeFilter = await findByTestId("subtype-select");
    userEvent.selectOptions(subTypeFilter,  "Hourly");
    const updatedFileSize = getByText(/size: 4.04 gb/i);
    expect(updatedFileSize).toBeInTheDocument();
  });

  test("download button is disabled if file size exceeds download limit", async () => {
    const { findByRole, findAllByRole } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );
    const checkbox = await findAllByRole("checkbox");
    const allFiles = checkbox[0];
    userEvent.click(allFiles);
    expect(
      findByRole("button", {
        name: /download/i,
      })
    ).resolves.toBeDisabled();
  });

  test("Alert pops up when file size exceeds download limit", async () => {
    const { findByText, findByRole } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );

    const allFiles = await findByRole("checkbox", {
      name: /select-all-rows/i,
    });
    await userEvent.click(allFiles);
    await waitFor(() => findByText(/download limit alert/i));
    const alert = await findByText(/download limit alert/i);
    expect(alert).toBeInTheDocument();
  });

  test("Alert  is removed when limit is no longer exceeded", async () => {
    const { findByRole, queryByText } = render(
      <BulkDataFiles dataTable={dataTable} />,
      store
    );

    const allFiles = await findByRole("checkbox", {
      name: /select-all-rows/i,
    });
    await userEvent.click(allFiles);
    await userEvent.click(allFiles);
    const alert = queryByText(/download limit alert/i);
    expect(alert).toBeNull();
  });
});
