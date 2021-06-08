import React from 'react'
import FooterMenu from './FooterMenu'
import { render, fireEvent } from "@testing-library/react";

describe('testing updated go-wide template footer menu', () => {
    test("should render footer hamburger menu button", () => {
        const {getByRole} = render(<FooterMenu/>);
        const burgerMenu = getByRole("button");
        expect(burgerMenu).toBeTruthy();
      });
    test("should render the three menu options when hamburger menu is clicked", () => {
        const {getByRole, getAllByRole} = render(<FooterMenu/>);
        const burgerMenu = getByRole("button");
        fireEvent.click(burgerMenu);
        const menuLinks = getAllByRole("link");
        expect(menuLinks.length).toBe(3);
    });
});
