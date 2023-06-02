import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VisualizationGalleryPage from "./VisualizationGalleryPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { Provider } from "react-redux";
import { tools } from "../../mocks/testData";
import { slides } from "../../mocks/testData";

let store = configureStore(initialState);

describe("VisualizationGalleryPage", () => {
  test("renders hero slideshow", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <VisualizationGalleryPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(getByText(slides[0].title)).toBeInTheDocument();
    });
  });

  test("renders tools", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <VisualizationGalleryPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    screen.debug(undefined, 9999999);
    await waitFor(() => {
      expect(getByText(tools[0].name)).toBeInTheDocument();
    });
  });
});
