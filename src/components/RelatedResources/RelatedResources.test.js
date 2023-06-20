import React from "react";
import RelatedResources from "./RelatedResources";
import configureStore from "../../store/configureStore.dev";
import initialState from "../../store/reducers/initialState";
import render from "../../mocks/render";
import { additionalDataTools } from "../../mocks/testData";

let store = configureStore(initialState);

describe("Related Resources Page Component", () => {
  test("should render content introduction without error", async () => {
    const { findByText } = render(
      <RelatedResources setApiErrorDispatcher={jest.fn()} />,
      store
    );
    const heading = await findByText("This is related resources intro..");
    expect(heading).toBeInTheDocument();
  });
  test("should render additional data tools list without error", async () => {
    const { findAllByText } = render(
      <RelatedResources setApiErrorDispatcher={jest.fn()} />,
      store
    );

    additionalDataTools.forEach(async (element) => {
      const container = await findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    });
  });
});
