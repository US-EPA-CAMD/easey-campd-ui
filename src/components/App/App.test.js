import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
const store = configureStore();


describe("Testing the main routing App component", () => {
  it("renders home page component provided with the default path", () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${config.app.path}`]}>
            <App />
        </MemoryRouter>
      </Provider>
    );
    const textInHomePage = getByText("Visualization");
    expect(textInHomePage).toBeInTheDocument();
    expect(getByRole("button", {name: "Start your data query"})).toBeDefined();
  });
});
