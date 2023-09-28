import React from "react";
import NotFound from "./NotFound";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("<NotFound/>", () => {
  test("renders properly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });
});
