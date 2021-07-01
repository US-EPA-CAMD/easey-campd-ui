import React from 'react'
import SubHeaderInfo from './SubHeaderInfo'
import { render } from "@testing-library/react";

describe('Sub-header Info Component', () => {
    test("should render content without error", () => {
      const {getByRole} = render(<SubHeaderInfo/>);
      expect(getByRole("heading", {name: "Your resource for emissions, compliance, and allowance data."})).toBeDefined();
    });
});
