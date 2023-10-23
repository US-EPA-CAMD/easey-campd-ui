import React from "react";
import RelatedResources from "./RelatedResources";
import {
  screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import render from "../../mocks/render";
import { additionalDataTools } from "../../mocks/testData";
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';

let store = configureStore(initialState);

describe("- Related Resources Component -", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <RelatedResources setApiErrorDispatcher={jest.fn()} />
      </Provider>
    );
  });
  it("should render content introduction without error", async () => {
    const heading = await screen.findByText("This is related resources intro..");
    expect(heading).toBeInTheDocument();
  });
  it("should render additional data tools list without error", async () => {
    additionalDataTools.forEach(async (element) => {
      const container = await screen.findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
      if(element.hasOwnProperty('externalSite')){
        expect(screen.findByText('EXIT')).toBeInTheDocument();
      }
    });
  });
});
