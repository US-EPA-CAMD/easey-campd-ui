import React from "react";
import { render } from "@testing-library/react";
import { useFocusTrapWithRef } from "./useFocusTrapWithRef";
import userEvent from "@testing-library/user-event";
import { link } from "fs";

describe("useFocusTrapWithRef", () => {
  it("should trap focus when tab key is pressed", async () => {
    const TestComponent = () => {
      const [trapRef] = useFocusTrapWithRef();

      return (
        <div ref={trapRef}>
          <input type="text" />
          <button>Button 1</button>
          <a href="#">Link 1</a>
          <input type="text" />
          <button>Button 2</button>
          <a href="#">Link 2</a>
        </div>
      );
    };

    const { getByText, getAllByRole } = render(<TestComponent />);
    const inputs = getAllByRole("textbox");
    const firstInput = inputs[0];
    const button1 = getByText("Button 1");
    const link1 = getByText("Link 1");
    const secondInput = inputs[1];
    const button2 = getByText("Button 2");
    const link2 = getByText("Link 2");

    await userEvent.tab();
    expect(document.activeElement).toBe(firstInput);

    await userEvent.tab();
    expect(document.activeElement).toBe(button1);

    await userEvent.tab();
    expect(document.activeElement).toBe(link1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(button1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(firstInput);

    await userEvent.tab();
    expect(document.activeElement).toBe(button1);

    await userEvent.tab();
    expect(document.activeElement).toBe(link1);

    await userEvent.tab();
    expect(document.activeElement).toBe(secondInput);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(link1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(button1);
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
  });
});
