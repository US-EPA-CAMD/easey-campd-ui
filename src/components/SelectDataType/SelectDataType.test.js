import React from "react";
import SelectDataType from "./SelectDataType";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("testing select data type page including selectable data type cards", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/campd/']}>
                <SelectDataType />
            </MemoryRouter>
        );
    });
    test("renders the header and intro paragraph", () => {
        const header = screen.getByText("Custom Data Download");
        const description = screen.getByTestId("description-paragraph");
        expect(header).not.toBeUndefined();
        expect(description).not.toBeUndefined();
    });
    test(`renders the three selectable cards and when first card is selected the continue button is enabled.`, () => {
        const selectableCards = screen.getAllByTestId("selectable-card");
        const continueBtn = screen.getByRole("button", {name:"Continue"});
        expect(selectableCards).toHaveLength(3);
        expect(continueBtn).toBeDisabled();
        fireEvent.click(selectableCards[0]);
        expect(continueBtn).not.toBeDisabled();
    });
});
