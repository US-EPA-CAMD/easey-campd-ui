import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import HeroSlideshow from "./HeroSlideshow";

jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

const slides = [
  {
    image: "slides/slide1.png",
    title: "Title One",
    callout: "Callout:",
    text: null,
    link: { url: "/", text: "Slide One Button" },
  },
  {
    image: "slides/slide2.png",
    title: "Title Two",
    callout: "Callout:",
    text: "slides/slide2.md",
    link: { url: "/", text: "Slide Two Button" },
  },
  {
    image: "slides/slide3.png",
    title: "Title Three",
    callout: null,
    text: null,
    link: null,
  },
];

describe("HeroSlideshow Component", () => {
  afterEach(cleanup);
  describe("HeroSlideshow", () => {
    it("renders null when no slides are provided", () => {
      const { container } = render(<HeroSlideshow slides={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders slideshow with slides", () => {
      const { container } = render(<HeroSlideshow slides={slides} />);
      expect(container.firstChild).not.toBeNull();
    });

    // Add more test cases to cover other scenarios and edge cases
  });
  // it("renders null when provided an empty array of slides", () => {
  //   const { container } = render(<HeroSlideshow slides={[]} />);
  //   expect(container.childElementCount).toEqual(0);
  // });

  // it("renders a single slide without nav buttons", () => {
  //   const { getByRole, queryAllByRole } = render(
  //     <HeroSlideshow slides={[slides[1]]} />
  //   );

  //   const heading = getByRole("heading", { name: "Callout: Title Two" });
  //   expect(heading).toBeVisible();

  //   const buttons = queryAllByRole("button");
  //   expect(buttons).toEqual([]);
  // });

  // it("renders multiple slides with nav buttons", () => {
  //   const { getByRole, queryAllByRole } = render(
  //     <HeroSlideshow slides={slides} />
  //   );
  //   const heading = getByRole("heading", { name: "Callout: Title One" });
  //   expect(heading).toBeVisible();

  //   const buttons = queryAllByRole("button");
  //   expect(buttons).toHaveLength(3);
  //   buttons.forEach((button) => {
  //     expect(button).toHaveClass("hero-slideshow__nav-button usa-button");
  //   });
  // });

  // it("advances to the next slide when a nav button is clicked", async () => {
  //   const { queryByRole } = render(<HeroSlideshow slides={slides} />);

  //   let heading1 = queryByRole("heading", { name: "Callout: Title One" });
  //   let heading2 = queryByRole("heading", { name: "Callout: Title Two" });
  //   expect(heading1).toBeVisible();
  //   expect(heading2).toBeNull();

  //   const button = queryByRole("button", { name: "Carousel Page 2" });
  //   fireEvent.click(button);

  //   heading1 = queryByRole("heading", { name: "Callout: Title One" });
  //   heading2 = queryByRole("heading", { name: "Callout: Title Two" });
  //   expect(heading1).toBeNull();
  //   expect(heading2).toBeVisible();
  // });
});
