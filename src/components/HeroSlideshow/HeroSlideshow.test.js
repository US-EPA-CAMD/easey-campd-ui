import React from "react";
import { cleanup } from "@testing-library/react";

import HeroSlideshow from "./HeroSlideshow";
import render from "../../mocks/render";

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
      expect(container.querySelector(".hero-slideshow")).toBeNull();
    });

    it("renders slideshow with slides", () => {
      const { container } = render(<HeroSlideshow slides={slides} />);
      expect(container.querySelector(".hero-slideshow")).not.toBeNull();
    });
  });
});
