import React from "react";
import { waitFor } from "@testing-library/react";
import VisualizationGalleryPage from "./VisualizationGalleryPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { tools } from "../../mocks/testData";
import { slides } from "../../mocks/testData";
import render from "../../mocks/render";

let store = configureStore(initialState);

describe("VisualizationGalleryPage", () => {
  test("renders hero slideshow", async () => {
    const { getByText } = render(
      <VisualizationGalleryPage />,
      store
    );
    await waitFor(() => {
      expect(getByText(slides[0].title)).toBeInTheDocument();
    });
  });

  test("renders tools", async () => {
    const { getByText } = render(
      <VisualizationGalleryPage />,
      store
    );
    await waitFor(() => {
      expect(getByText(tools[0].name)).toBeInTheDocument();
    });
  });
});
