import React from "react";
import HomePage from "./HomePage";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { Provider } from "react-redux";

let store = configureStore(initialState);
jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

describe("Home Page Component", () => {
  it("should render content without error", async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const data = await findByText("Data");
    const visualGallery = await findByText("Visualization Gallery");
    // const images = await findAllByRole("img");
    const whatIsNewBox = await findByText("What Is New Box Content");
    const whatIsNewBoxTitle = await findByText("What Is New Box Title");
    expect(data).toBeDefined();
    expect(visualGallery).toBeDefined();
    // expect(images.length).toBe(2);
    expect(whatIsNewBox).toBeInTheDocument();
    expect(whatIsNewBoxTitle).toBeInTheDocument();
  });
});
