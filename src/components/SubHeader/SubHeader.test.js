import React from "react";
import userEvent from "@testing-library/user-event";

import configureStore from "../../store/configureStore.dev";
import SubHeader from "./SubHeader";
import render from "../../mocks/render";
import initialState from "../../store/reducers/initialState";
const store = configureStore(initialState);

describe("SubHeader", () => {
  test("renders without errors", () => {
    const { getByText, container } = render(<SubHeader />, store);

    const header = getByText("Clean Air Markets Program Data");
    const home = getByText("HOME");
    const data = getByText("DATA");
    const analysis = getByText("VIZ GALLERY");

    expect(header).toBeTruthy();
    expect(home).toBeTruthy();
    expect(data).toBeTruthy();
    expect(analysis).toBeTruthy();

    userEvent.click(data);
    userEvent.click(getByText(/help\/support/i));
    expect(container.querySelector(".usa-nav__submenu")).toBeInTheDocument();
    userEvent.click(analysis);
  });
});
