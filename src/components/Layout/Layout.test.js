import React from "react";
import Layout from "./Layout";
import { screen } from "@testing-library/react";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import render from "../../mocks/render";
const store = configureStore(initialState);

const childComponent = () => {
  return <div>Welcome!</div>;
};

test("Layout renders a routed child component between header and footer", async () => {
  render(<Layout>{childComponent}</Layout>, store, { initialEntries: ["/"] });
  const layoutContent = await screen.queryByText("Welcome!");
  expect(layoutContent).not.toBeUndefined();
});
