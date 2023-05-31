import React from "react";
import {  render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"
import VisualizationGalleryPage from "./VisualizationGalleryPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { Provider } from "react-redux";

let store = configureStore(initialState);

describe("Visualization Gallery Page Component", () => {

  test("should render content without error", async () => {
    const { findByText, findByRole, findAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <VisualizationGalleryPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
  });
});
