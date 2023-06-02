import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import configureStore from "../../store/configureStore.dev";
import SubHeader from "./SubHeader";
const store = configureStore();

describe("SubHeader", () => {
  test("renders without errors", async () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <SubHeader />
        </MemoryRouter>
      </Provider>
    );
    // screen.debug()
    const { getByText, container } = query;

    const header = getByText("Clean Air Markets Program Data");
    const home = getByText("HOME");
    const data = getByText("DATA");
    const analysis = getByText("VIZ GALLERY");

    expect(header).toBeTruthy();
    expect(home).toBeTruthy();
    expect(data).toBeTruthy();
    expect(analysis).toBeTruthy();

    await fireEvent.click(data);
    await userEvent.click(getByText(/help\/support/i));
    expect(container.querySelector(".usa-nav__submenu")).toBeInTheDocument();
    await fireEvent.click(analysis);
  });
});
