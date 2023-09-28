import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";

const store = configureStore();
jest.useFakeTimers();

describe("Testing the main routing App component", () => {
  test("renders home page component provided with the default path", async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
            <App />
        </MemoryRouter>
      </Provider>
    );
    jest.advanceTimersByTime(1000);

    const main = container.querySelector('.mainContent');

    jest.advanceTimersByTime(1000);

    expect(main).toBeInTheDocument();
  });
});
