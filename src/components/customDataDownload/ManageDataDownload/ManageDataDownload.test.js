import React from "react";
import ManageDataDownload from "./ManageDataDownload";
import { render } from "@testing-library/react";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";

initialState.customDataDownload.dataType= "EMISSIONS";
const store = configureStore(initialState);

// *** set up mocks
beforeEach(() => {});

// *** garbage clean up (mocks)
afterEach(() => {});
describe("ManageDataDownload", () => {
  test("Check that the  component properly renders", () => {
    const { getByTestId } = render(<Provider store={store}><ManageDataDownload /></Provider>);
    expect(getByTestId("manage-data-download-wrapper")).toBeVisible();
  });
});
