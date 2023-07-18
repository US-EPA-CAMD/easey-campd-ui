import React from "react";
import { waitFor } from "@testing-library/react";
import VisualizationGalleryPage from "./VisualizationGalleryPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { tools } from "../../mocks/testData";
import { slides } from "../../mocks/testData";
import render from "../../mocks/render";
import {
  screen
} from '@testing-library/react';

let store = configureStore(initialState);

describe("- VisualizationGalleryPage component -", () => {
  beforeEach(()=>{
    render(
      <VisualizationGalleryPage />,
      store
    );
  });
  it("renders mocked hero slideshow", async () => {
    await waitFor(() => {
      expect(screen.getByText(slides[0].title)).toBeInTheDocument();
    });
    screen.debug();
  });

  it("renders mocked tools", async () => {
    await waitFor(() => {
      expect(screen.getByText(tools[0].name)).toBeInTheDocument();
    });
    screen.debug();
  });
});
