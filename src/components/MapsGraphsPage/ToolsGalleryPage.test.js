import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MapsGraphsPage from "./MapsGraphsPage";

describe("Maps and Graphs Page Component", () => {
  test("should render content without error", () => {
    const { getByText } = render(
      <MemoryRouter>
        <MapsGraphsPage />
      </MemoryRouter>
    );
    expect(getByText("Tools Gallery:")).toBeDefined();
  });
});
