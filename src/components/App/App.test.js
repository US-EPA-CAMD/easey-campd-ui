import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
import config from "../../config";

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
  it("renders home page component provided with the default path", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${config.app.path}/data/custom-data-download`]}>
            <App />
        </MemoryRouter>
      </Provider>
    );
    const textInHomePage = getByText("Custom Data Download");
    expect(textInHomePage).toBeInTheDocument();
  });
});
