import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import ManageDataDownloadRoute from './ManageDataDownloadRoute';
import ManageDataDownload from "../../customDataDownload/ManageDataDownload/ManageDataDownload";
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
initialState.customDataDownload.dataType = "EMISSIONS";
const store = configureStore(initialState);


describe("Testing protected routes - Manage Data Download", () => {
  it("renders the right component with following path /select-data-type", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/manage-data-download']}>
          <ManageDataDownloadRoute component={ManageDataDownload} />
        </MemoryRouter>
      </Provider>
    );
    const ManageDataDownloadWrapper = getByTestId("manage-data-download-wrapper");
    expect(ManageDataDownloadWrapper).toBeInTheDocument();
  });
});
