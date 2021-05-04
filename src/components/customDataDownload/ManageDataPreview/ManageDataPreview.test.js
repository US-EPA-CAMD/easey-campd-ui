import React from "react";
import ManageDataPreview from "./ManageDataPreview";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";

initialState.customDataDownload.dataType= "EMISSIONS";
initialState.customDataDownload.dataSubType= "Hourly Emissions";
initialState.customDataDownload.appliedFilters = ["timePeriod"];
initialState.hourlyEmissions.timePeriod = {
  startDate: "2019-01-01", endDate: "2019-01-01", opHrsOnly:true
};
const store = configureStore(initialState);


describe("ManageDataPreview", () => {
  test("Check that the  component properly renders", () => {
    const { getByRole, getByText } = render(<Provider store={store}><ManageDataPreview /></Provider>);
    const previewButton = getByRole('button' , { name: "Preview Data" });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });
});
