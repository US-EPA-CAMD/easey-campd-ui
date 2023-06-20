import React from "react";
import { render } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";
import initialState from "../../store/reducers/initialState";
import { cloneDeep } from "lodash";
import configureStore from "../../store/configureStore.dev";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const initStateCopy = cloneDeep(initialState);
const store = configureStore(initStateCopy);

describe("MobileMenu", () => {
  const appliedFilters = ["filter1", "filter2"];
  test("renders all buttons if hideFilterMenu is falsee and data subtype is applied", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={jest.fn()}
            removeAppliedFiltersDispatcher={jest.fn()}
            resetDataPreviewDispatcher={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const backButton = getByRole("button", { name: "Back" });
    const dataPreviewButton = getByRole("button", { name: "Preview Data" });
    const clearAllButton = getByRole("button", { name: "Clear All" });
    expect(backButton).toBeInTheDocument();
    expect(dataPreviewButton).toBeInTheDocument();
    expect(clearAllButton).toBeInTheDocument();
  });

  test("hides all buttons if data subtype is not applied", async () => {
    const { queryByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={false}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={jest.fn()}
            removeAppliedFiltersDispatcher={jest.fn()}
            resetDataPreviewDispatcher={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const backButton = queryByRole("button", { name: "Back" });
    const dataPreviewButton = queryByRole("button", { name: "Preview Data" });
    const clearAllButton = queryByRole("button", { name: "Clear All" });
    expect(backButton).not.toBeInTheDocument();
    expect(dataPreviewButton).not.toBeInTheDocument();
    expect(clearAllButton).not.toBeInTheDocument();
  });

  test("shows only back button if data subtype is applied and hideFilterMenu is true", async () => {
    const { queryByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={jest.fn()}
            removeAppliedFiltersDispatcher={jest.fn()}
            resetDataPreviewDispatcher={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={true}
          />
        </MemoryRouter>
      </Provider>
    );
    const backButton = queryByRole("button", { name: "Back" });
    const dataPreviewButton = queryByRole("button", { name: "Preview Data" });
    const clearAllButton = queryByRole("button", { name: "Clear All" });
    expect(backButton).toBeInTheDocument();
    expect(dataPreviewButton).not.toBeInTheDocument();
    expect(clearAllButton).not.toBeInTheDocument();
  });

  test("should disable the Preview Data button when there are no applied filters", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={[]}
            resetFiltersDispatcher={jest.fn()}
            removeAppliedFiltersDispatcher={jest.fn()}
            resetDataPreviewDispatcher={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const dataPreviewButton = getByRole("button", { name: "Preview Data" });
    expect(dataPreviewButton).toBeDisabled();
  });

  test("should enable the Preview Data button when there are applied filters", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={jest.fn()}
            removeAppliedFiltersDispatcher={jest.fn()}
            resetDataPreviewDispatcher={jest.fn()}
            handleBackButtonClick={jest.fn()}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const dataPreviewButton = getByRole("button", { name: "Preview Data" });
    expect(dataPreviewButton).toBeEnabled();
  });

  test("should call the correct functions when the Clear All button is clicked", async () => {
    const resetDataPreviewDispatcher = jest.fn();
    const removeAppliedFiltersDispatcher = jest.fn();
    const resetFiltersDispatcher = jest.fn();
    const handleBackButtonClick = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={resetFiltersDispatcher}
            removeAppliedFiltersDispatcher={removeAppliedFiltersDispatcher}
            resetDataPreviewDispatcher={resetDataPreviewDispatcher}
            handleBackButtonClick={handleBackButtonClick}
            handlePreviewDataButtonClick={jest.fn()}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const clearAllButton = getByRole("button", { name: "Clear All" });
    await userEvent.click(clearAllButton);
    expect(resetDataPreviewDispatcher).toHaveBeenCalled();
    expect(removeAppliedFiltersDispatcher).toHaveBeenCalled();
    expect(resetDataPreviewDispatcher).toHaveBeenCalled();
    expect(handleBackButtonClick).not.toHaveBeenCalled();
  });

  test("should call the correct functions when the preview data button is clicked", async () => {
    const resetDataPreviewDispatcher = jest.fn();
    const removeAppliedFiltersDispatcher = jest.fn();
    const resetFiltersDispatcher = jest.fn();
    const handleBackButtonClick = jest.fn();
    const handlePreviewDataButtonClick = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={resetFiltersDispatcher}
            removeAppliedFiltersDispatcher={removeAppliedFiltersDispatcher}
            resetDataPreviewDispatcher={resetDataPreviewDispatcher}
            handleBackButtonClick={handleBackButtonClick}
            handlePreviewDataButtonClick={handlePreviewDataButtonClick}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const previewDataButton = getByRole("button", { name: "Preview Data" });
    await userEvent.click(previewDataButton);
    expect(handlePreviewDataButtonClick).toHaveBeenCalled();
    expect(removeAppliedFiltersDispatcher).not.toHaveBeenCalled();
  });
  test("should call the correct functions when the backbutton is clicked", async () => {
    const resetDataPreviewDispatcher = jest.fn();
    const removeAppliedFiltersDispatcher = jest.fn();
    const resetFiltersDispatcher = jest.fn();
    const handleBackButtonClick = jest.fn();
    const handlePreviewDataButtonClick = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MobileMenu
            setApiError={jest.fn()}
            dataSubtypeApplied={true}
            appliedFilters={appliedFilters}
            resetFiltersDispatcher={resetFiltersDispatcher}
            removeAppliedFiltersDispatcher={removeAppliedFiltersDispatcher}
            resetDataPreviewDispatcher={resetDataPreviewDispatcher}
            handleBackButtonClick={handleBackButtonClick}
            handlePreviewDataButtonClick={handlePreviewDataButtonClick}
            hideFilterMenu={false}
          />
        </MemoryRouter>
      </Provider>
    );
    const backButton = getByRole("button", { name: "Back" });
    await userEvent.click(backButton);
    expect(handleBackButtonClick).toHaveBeenCalled();
    expect(removeAppliedFiltersDispatcher).not.toHaveBeenCalled();
  });
});
