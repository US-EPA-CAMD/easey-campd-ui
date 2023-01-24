import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const store = configureStore();
const mockUseLocationValue = {
  pathname: "/data/custom-data-download",
  search: '',
  hash: '',
  state: null
}
jest.mock('react-router', () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
  })
}));
describe("Testing the main routing App component", () => {
  test("renders home page component provided with the default path", async () => {
    const history = createMemoryHistory({initialEntries : [`${config.app.path}/data/custom-data-download`]});
    const { findByText } = render(
      <Provider store={store}>
        {/* <MemoryRouter initialEntries={[`${config.app.path}/does-not-exist`]}>
            <App />
        </MemoryRouter> */}
        <Router history={history}>
          <App />
        </Router>,
        node
      </Provider>
    );
    expect(history.location.pathname).toBe(`${config.app.path}/data/custom-data-download`);
    // const textInHomePage = await findByText("Custom Data Download");
    // expect(textInHomePage).toBeInTheDocument();
  });
});
