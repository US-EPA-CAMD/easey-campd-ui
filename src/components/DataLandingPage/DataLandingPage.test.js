import React from "react";
import DataLandingPage from "./DataLandingPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import render from "../../mocks/render";

let store = configureStore(initialState);

describe("Data Landing Page Component", () => {
  test("should render content without error", async () => {
    const { findByText, findAllByRole } = render(
      <DataLandingPage setApiErrorDispatcher={jest.fn()} />,
      store
    );
    const links = await findAllByRole("link");
    const header = await findByText("Data Access Methods");
    expect(header).toBeDefined();
    const cdd = await findByText("Custom Data Download Tool");
    expect(cdd).toBeDefined();
    const bdf = await findByText("Bulk Data Files");
    expect(bdf).toBeDefined();
    const apis = await findByText("APIs");
    expect(apis).toBeDefined();
    expect(links.length).toBe(3);
  });
});
