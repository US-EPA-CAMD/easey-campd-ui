import React from "react";
import Landing from "./Landing";
import { render } from "@testing-library/react";

// *** set up mocks
beforeEach(() => {});

// *** garbage clean up (mocks)
afterEach(() => {});
describe("Landing", () => {
  test("Check that the  component properly renders", () => {
    const { getByTestId } = render(<Landing />);
    expect(getByTestId("Landing")).toBeVisible();
  });
});
