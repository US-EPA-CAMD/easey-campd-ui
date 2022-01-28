import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
const store = configureStore();
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

describe("Testing the main routing App component", () => {
  it("renders home page component provided with the default path", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${config.app.path}`]}>
            <App />
        </MemoryRouter>
      </Provider>
    );
    const textInHomePage = getByText("Maps & Graphs");
    expect(textInHomePage).toBeInTheDocument();
  });
});
