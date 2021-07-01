import React from 'react'
import HomePage from './HomePage'
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

describe('Home Page Component', () => {
    test("should render content without error", () => {
      const {getAllByRole, getByRole, getByText} = render(<MemoryRouter><HomePage/></MemoryRouter>);
      const data = getByText("Data");
      const analysis = getByText("Analysis");
      const visualization = getByText("Visualization");
      const images = getAllByRole("img");
      expect(data).toBeDefined();
      expect(analysis).toBeDefined();
      expect(visualization).toBeDefined();
      expect(images.length).toBe(3);
      expect(getByRole("button", {name: "Start your data query"})).toBeDefined();
    });
});
