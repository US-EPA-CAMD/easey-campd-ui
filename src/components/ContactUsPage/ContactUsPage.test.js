import React from "react";
import { fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactUsPage from "./ContactUsPage";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import { commentTypes } from "../../mocks/testData";
import render from "../../mocks/render";

jest.setTimeout(50000);
window.scrollTo = jest.fn();
let store = configureStore(initialState);
describe("Contact Us Page Component", () => {
  describe("form validation", () => {
    afterEach(cleanup);
    test("should show error message if any field is incomplete", async () => {
      const { findByText, findByRole, findByTestId } = render(
        <ContactUsPage setApiErrorDispatcher={jest.fn()} />,
        store
      );

      const emailField = await findByRole("textbox", {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const submitButton = await findByText(/Submit/i);
      await fireEvent.change(emailField, {
        target: { value: "test@test.com" },
      });
      await userEvent.type(commentField, "testing1234");
      await fireEvent.click(submitButton);
      const errorMessage = await findByRole("heading", {
        name: /error/i,
      });
      expect(errorMessage).toBeDefined();
    });

    test("should show error message if email format is incorrect", async () => {
      const { findByText, findByRole, findByTestId } = render(
        <ContactUsPage setApiErrorDispatcher={jest.fn()} />,
        store
      );

      const emailField = await findByRole("textbox", {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const commentType = await findByText(/help using application/i);
      const submitButton = await findByText(/Submit/i);
      await fireEvent.change(emailField, {
        target: { value: "test..test.com" },
      });
      await userEvent.type(commentField, "testing1234");
      await fireEvent.click(commentType);
      await fireEvent.click(submitButton);
      const errorMessage = await findByRole("heading", {
        name: /error/i,
      });
      expect(errorMessage).toBeDefined();
    });
    test("should not show error message if form is filled out correctly", async () => {
      const { findByText, findByRole, findByTestId, queryByRole } = render(
        <ContactUsPage setApiErrorDispatcher={jest.fn()} />,
        store
      );

      const emailField = await findByRole("textbox", {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const commentType = await findByText(/help using application/i);
      const submitButton = await findByText(/Submit/i);
      await fireEvent.change(emailField, {
        target: { value: "test@test.com" },
      });
      await fireEvent.click(commentType);
      await userEvent.type(commentField, "testing123");
      await fireEvent.click(submitButton);
      const errorMessage = await queryByRole("heading", {
        name: /error/i,
      });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  test("should show success message if form is filled out correctly", async () => {
    const { findByText, findByRole, findByTestId } = render(
      <ContactUsPage setApiErrorDispatcher={jest.fn()} />,
      store
    );

    const emailField = await findByRole("textbox", {
      name: /email/i,
    });
    const commentField = await findByTestId(/textarea/i);
    const commentType = await findByText(/help using application/i);
    const submitButton = await findByText(/Submit/i);
    await fireEvent.change(emailField, { target: { value: "test@test.com" } });
    await fireEvent.click(commentType);
    await userEvent.type(commentField, "testing123");
    await fireEvent.click(submitButton);
    const successMessage = await findByRole("heading", {
      name: /success/i,
    });

    expect(successMessage).toBeDefined();
  });

  describe("api", () => {
    it("should render content without error", async () => {
      const { findByText } = render(
        <ContactUsPage setApiErrorDispatcher={jest.fn()} />,
        store
      );

      commentTypes.forEach(async (element) => {
        const container = await findByText(element.value);
        expect(container).toBeTruthy();

        const button = await findByText("Submit");
        await fireEvent.click(button);
      });
    });
  });
});
