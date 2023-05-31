import React from 'react'
import DataLandingPage from './DataLandingPage';
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);

describe('Data Landing Page Component', () => {
    test("should render content without error", async () => {
      const {findByText, findAllByRole} = render(
      <Provider store={store}>
        <MemoryRouter>
          <DataLandingPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>);
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
    // test("clicking filter links updates product query params", () => {
    //   let testHistory, testLocation;
    //   const {getByRole} =render(
    //     <MemoryRouter initialEntries={["/data"]}>
    //       <App />
    //       <Route
    //         path="*"
    //         render={({ history, location }) => {
    //           //testHistory = history;
    //           testLocation = location;
    //           return null;
    //         }}
    //       />
    //     </MemoryRouter>
    //   );
    //   expect(testLocation.pathname).toBe("/data");
    //   act(() => {
    //     fireEvent.click(getByRole("button", {name: "Start your data query"}));
    //   });
    //   expect(testLocation.pathname).toBe("/select-data-type");
    // });
});
