import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
const store = configureStore();


describe("Testing the main routing App component", () => {
  it("renders the right component with following path /select-data-type", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/select-data-type']}>
            <App />
        </MemoryRouter>
      </Provider>
    );
    const descriptionParagraph = getByTestId("description-paragraph");
    expect(descriptionParagraph).toBeInTheDocument();
  });
});
