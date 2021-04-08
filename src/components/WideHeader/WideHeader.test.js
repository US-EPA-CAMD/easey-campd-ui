import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WideHeader from "./WideHeader";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";

describe("testing search/filter feature of generic uswds table component", () => {
  const WideHeaderTest = () => {
    return <WideHeader />;
  };
  const { container } = render(
    <BrowserRouter>
      <WideHeaderTest />
    </BrowserRouter>
  );

  test("navbar renders a menu button", () => {
    const btnMenu = container.getElementsByClassName("btnMenu");
    expect(btnMenu.length).toEqual(1);
  });
});
