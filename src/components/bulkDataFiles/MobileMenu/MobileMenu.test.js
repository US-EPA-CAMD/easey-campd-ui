import React from "react";
import userEvent from "@testing-library/user-event";
import MobileMenu from "./MobileMenu";
import render from "../../../mocks/render";

describe("MobileMenu", () => {
  let mockSetShowMobileFilters;
  let mockHandleClearAll;
  let mockSetPreviewDataApplied;
  let mockSetBackButtonClicked;
  let mockDataType = true;

  beforeEach(() => {
    mockSetShowMobileFilters = jest.fn();
    mockHandleClearAll = jest.fn();
    mockSetPreviewDataApplied = jest.fn();
    mockSetBackButtonClicked = jest.fn();
    mockDataType = true;
  });

  test("renders MobileMenu component", () => {
    const { getByRole } = render(
      <MobileMenu
        setShowMobileFilters={mockSetShowMobileFilters}
        handleClearAll={mockHandleClearAll}
        setPreviewDataApplied={mockSetPreviewDataApplied}
        setBackButtonClicked={mockSetBackButtonClicked}
        dataType={mockDataType}
      />
    );
    const backButton = getByRole("button", { name: /back/i });
    const previewDataButton = getByRole("button", { name: /preview data/i });
    const clearAllButton = getByRole("button", { name: /clear all/i });
    expect(backButton).toBeInTheDocument();
    expect(previewDataButton).toBeInTheDocument();
    expect(clearAllButton).toBeInTheDocument();
  });

  test("calls handleBackButtonClick when Back button is clicked", async () => {
    const { getByRole } = render(
      <MobileMenu
        setShowMobileFilters={mockSetShowMobileFilters}
        handleClearAll={mockHandleClearAll}
        setPreviewDataApplied={mockSetPreviewDataApplied}
        setBackButtonClicked={mockSetBackButtonClicked}
        dataType={mockDataType}
      />
    );

    const backButton = getByRole("button", { name: /back/i });
    await userEvent.click(backButton);

    expect(mockSetBackButtonClicked).toHaveBeenCalledTimes(1);
    expect(mockSetShowMobileFilters).toHaveBeenCalledWith(false);
  });

  test("calls handlePreviewData when Preview Data button is clicked", async () => {
    const { getByRole } = render(
      <MobileMenu
        setShowMobileFilters={mockSetShowMobileFilters}
        handleClearAll={mockHandleClearAll}
        setPreviewDataApplied={mockSetPreviewDataApplied}
        setBackButtonClicked={mockSetBackButtonClicked}
        dataType={mockDataType}
      />
    );

    const previewDataButton = getByRole("button", { name: /preview data/i });
    await userEvent.click(previewDataButton);

    expect(mockSetPreviewDataApplied).toHaveBeenCalledTimes(1);
    expect(mockSetShowMobileFilters).toHaveBeenCalledWith(false);
  });

  test("disables Preview Data and Clear All buttons when dataType is false", async () => {
    const { getByRole } = render(
      <MobileMenu
        setShowMobileFilters={mockSetShowMobileFilters}
        handleClearAll={mockHandleClearAll}
        setPreviewDataApplied={mockSetPreviewDataApplied}
        setBackButtonClicked={mockSetBackButtonClicked}
        dataType={false}
      />
    );

    const previewDataButton = getByRole("button", { name: /preview data/i });
    const clearAllButton = getByRole("button", { name: /clear all/i });

    expect(previewDataButton).toBeDisabled();
    expect(clearAllButton).toBeDisabled();
  });

  test("enables Preview Data and Clear All buttons when dataType is true", async () => {
    const { getByRole } = render(
      <MobileMenu
        setShowMobileFilters={mockSetShowMobileFilters}
        handleClearAll={mockHandleClearAll}
        setPreviewDataApplied={mockSetPreviewDataApplied}
        setBackButtonClicked={mockSetBackButtonClicked}
        dataType={mockDataType}
      />
    );

    const previewDataButton = getByRole("button", { name: /preview data/i });
    const clearAllButton = getByRole("button", { name: /clear all/i });

    expect(previewDataButton).toBeEnabled();
    expect(clearAllButton).toBeEnabled();
  });
});
