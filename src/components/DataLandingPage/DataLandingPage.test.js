import React from 'react'
import DataLandingPage from './DataLandingPage';
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

describe('Data Landing Page Component', () => {
    test("should render content without error", () => {
      const {getAllByTestId, getByText} = render(<MemoryRouter><DataLandingPage/></MemoryRouter>);
      const btns = getAllByTestId("button");
      expect(getByText("Data Access Methods")).toBeDefined();
      expect(getByText("Custom Data Download Tool")).toBeDefined();
      expect(getByText("Bulk Data Files")).toBeDefined();
      expect(getByText("APIs")).toBeDefined();
      expect(btns.length).toBe(3);
      fireEvent.click(getByText("Query Data"));
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
