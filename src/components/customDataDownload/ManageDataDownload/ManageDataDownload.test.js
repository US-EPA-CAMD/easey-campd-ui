import React from "react";
import ManageDataDownload from "./ManageDataDownload";
import { render } from "@testing-library/react";

// *** set up mocks
beforeEach(() => {});

// *** garbage clean up (mocks)
afterEach(() => {});
describe("ManageDataDownload", () => {
  test("Check that the  component properly renders", () => {
    const { getByTestId } = render(<ManageDataDownload />);
    expect(getByTestId("ManageDataDownload")).toBeVisible();
  });
});
