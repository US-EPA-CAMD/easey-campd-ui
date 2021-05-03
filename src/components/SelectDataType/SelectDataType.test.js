import React from "react";
import SelectDataType from "./SelectDataType";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import configureStore from "../../store/configureStore.dev";
const store = configureStore();

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

describe("CDD select data type page", () => {
    test("renders without errors", () => {
        render(<Provider store={store}> <MemoryRouter><SelectDataType /></MemoryRouter></Provider>);
        const header = screen.getByText("Custom Data Download");
        const description = screen.getByTestId("description-paragraph");
        expect(header).not.toBeUndefined();
        expect(description).not.toBeUndefined();
        const selectableCards = screen.getAllByTestId("selectable-card");
        expect(selectableCards).toHaveLength(3);
    });
});
