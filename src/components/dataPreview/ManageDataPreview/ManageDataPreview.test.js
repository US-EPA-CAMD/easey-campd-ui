import React from "react";
import ManageDataPreview from "./ManageDataPreview";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";

initialState.customDataDownload.dataType= "EMISSIONS";
initialState.customDataDownload.dataSubType= "Hourly Emissions";
initialState.customDataDownload.appliedFilters = [
  {key:"Time Period", values:["1/1/2019 - 1/1/2019"]}
];
initialState.filterCriteria.timePeriod = {
  startDate: "2019-01-01", endDate: "2019-01-01", opHrsOnly:false
};
const store = configureStore(initialState);


describe("ManageDataPreview", () => {
  test("Check that the  component properly renders", () => {
    const { getByRole, getByText } = render(<Provider store={store}><ManageDataPreview dataType="EMISSIONS" /></Provider>);
    const previewButton = getByRole('button' , { name: "Preview Data" });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });
});
