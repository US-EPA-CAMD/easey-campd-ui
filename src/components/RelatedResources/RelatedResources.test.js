import React from "react";
import RelatedResources from "./RelatedResources";
import {
  screen,
} from '@testing-library/react';
import render from "../../mocks/render";
import { additionalDataTools } from "../../mocks/testData";

describe("- Related Resources Component -", () => {
  beforeEach(()=>{
    render(
      <RelatedResources />
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
