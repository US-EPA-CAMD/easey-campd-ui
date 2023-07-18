import React from "react";
import {
  screen,
  fireEvent
} from "@testing-library/react";
import render from "../../mocks/render";
import SubHeader from "./SubHeader";

//Note: Mocking Redux connected SubHeader Component as it has its own test coverage 
jest.mock('../SubHeaderInfo/SubHeaderInfo', () => {
  return jest.fn(() => null);
});

describe("- SubHeader Component -", () => {
  it("renders without errors", () => {
    render(<SubHeader />);
    const menuItems = [
      "CAMPD","Clean Air Markets Program Data","HOME","DATA","VIZ GALLERY",
      "HELP/SUPPORT","About CAMPD","Tutorials","FAQs","Glossary","Related Resources","Contact Us"
    ];
    menuItems.forEach(item =>{
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    const home = screen.getByText(menuItems[2]);
    fireEvent.click(home);
    expect(home.closest('a')).toHaveAttribute('href', '/');
    fireEvent.click(screen.getByTestId('expand-btn'));
    fireEvent.click(screen.getByTestId('collapse-btn'));
    screen.debug();
    expect(screen.getByText(menuItems[3]).closest('a')).toHaveAttribute('href', '/data');
    expect(screen.getByText(menuItems[4]).closest('a')).toHaveAttribute('href', '/visualization-gallery');
    
    fireEvent.click(screen.getByText(menuItems[5]));
    expect(screen.getByText(menuItems[6]).closest('a')).toHaveAttribute('href', '/help-support/about');
    expect(screen.getByText(menuItems[7]).closest('a')).toHaveAttribute('href', '/help-support/tutorials');
    expect(screen.getByText(menuItems[8]).closest('a')).toHaveAttribute('href', '/help-support/faqs');
    expect(screen.getByText(menuItems[9]).closest('a')).toHaveAttribute('href', '/help-support/glossary');
    expect(screen.getByText(menuItems[10]).closest('a')).toHaveAttribute('href', '/help-support/related-resources');
    expect(screen.getByText(menuItems[11]).closest('a')).toHaveAttribute('href', '/help-support/contact-us');
  });
});
