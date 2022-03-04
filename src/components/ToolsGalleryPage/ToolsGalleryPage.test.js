import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ToolsGalleryPage from "./ToolsGalleryPage";

describe("Tools Gallery Page Component", () => {
  test("should render content without error", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ToolsGalleryPage />
      </MemoryRouter>
    );
    expect(getByText("Tools Gallery:")).toBeDefined();
  });
});
