import React from "react";
import CddDataPreview from "./CddDataPreview";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";
import { cloneDeep } from "lodash";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// jest.mock("@trussworks/react-uswds", () => ({
//   ...jest.requireActual("@trussworks/react-uswds"),
//   Modal:
//     () =>
//     ({ children }) =>
//       <>{children}</>,
// }));

jest.mock("../../ApiErrorAlert/ApiErrorAlert", () => () => <></>);

jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(window, "confirm").mockImplementation(() => {});
// jest.spyOn(React, 'useRef').mockReturnValue({ current: {scrollIntoView : jest.fn()} });

const { findByText, getByRole, findByTestId, findByRole, getByTestId } = screen;

const initialStateCopy = cloneDeep(initialState);
initialStateCopy.customDataDownload.dataType = "EMISSIONS";
initialStateCopy.customDataDownload.dataSubType = "Hourly Emissions";
initialStateCopy.customDataDownload.appliedFilters = [
  { key: "Time Period", values: ["1/1/2019 - 1/1/2019"] },
];
initialStateCopy.filterCriteria.timePeriod = {
  startDate: "2019-01-01",
  endDate: "2019-01-01",
  opHrsOnly: false,
  year: {
    yearArray: [2019, 2020],
    yearString: "2019,2020",
  },
  comboBoxYear: [],
  month: [1, 3, 5],
  quarter: [],
};
initialStateCopy.customDataDownload.dataPreview = [
  {
    test: "Some value",
    test2: "Another value",
  },
  {
    test: "Yet Some value",
    test2: "Yet Another value",
  },
];
initialStateCopy.customDataDownload.totalCount = "50";
initialStateCopy.customDataDownload.fieldMappings = [
  { label: "Test", value: "test" },
  { label: "Test2", value: "test2" },
];
let store = configureStore(initialStateCopy);

// jest.spyOn(React, 'useRef').mockReturnValue({ current: {scrollIntoView : jest.fn()} });

describe("CddDataPreview", () => {
  test("Check that the  component properly renders custom data download helper text", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <div id="filter0"></div>
          <CddDataPreview
            requirementsMet={true}
            totalCount={10000000}
            renderPreviewData={{
              display: false,
              dataType: "",
              dataSubType: "",
            }}
            setRenderPreviewData={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const previewButton = getByRole("button", { name: "Preview Data" });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
  });
  test("Check bookmark funtionality works on cdd", async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <div id="filter0"></div>
          <CddDataPreview
            requirementsMet={true}
            totalCount={50}
            renderPreviewData={{
              display: true,
              dataType: "",
              dataSubType: "",
            }}
            setRenderPreviewData={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const previewButton = getByRole("button", { name: "Preview Data" });
    await fireEvent.click(previewButton);
    const BookmarkBtn = screen.getByText("Bookmark");
    await fireEvent.click(BookmarkBtn);
    // screen.debug(undefined, 99999999999)
    // const bookmarkModal = container.querySelector('#bookmark-modal')//await findByTestId("modalWindow");
    // expect(bookmarkModal).toBeInTheDocument();
    // expect(await findByText("Bookmark created")).toBeDefined();
    // const modalCloser = await findByRole('button', {name : 'Ok'});
    // expect(modalCloser).toBeDefined();
    // fireEvent.click(modalCloser);
    // done()
  });

  test("can remove filter with filter tags", async () => {
    let displayMobileDataType = false;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <div id="filter0"></div>
          <CddDataPreview
            requirementsMet={true}
            totalCount={10000000}
            renderPreviewData={{
              display: false,
              dataType: "",
              dataSubType: "",
            }}
            setRenderPreviewData={jest.fn()}
            handleMobileFiltersButtonClick={jest.fn()}
            setDisplayMobileDataType={() => (displayMobileDataType = true)}
            displayMobileDataType={displayMobileDataType}
            setApplyFilterLoading={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const previewButton = getByRole("button", { name: "Preview Data" });
    const filtersButton = getByRole("button", { name: /Filters/i });
    userEvent.click(filtersButton);
    const timePeriodRemove = getByTestId("remove");
    expect(timePeriodRemove).toBeInTheDocument();
    userEvent.click(timePeriodRemove);
    waitFor(() => expect(previewButton).toBeDisabled());
  });
});
