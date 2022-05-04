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
  let query;

  beforeEach(() => {
    query = render(<HeroSlideshow slides={slides} />);
  });

  afterEach(cleanup);

  it("renders properly", () => {
    const { getByRole } = query;
    const heading = getByRole("heading", { name: "Callout: Title One" });
    expect(heading).toBeInTheDocument();
  });

  it("advances to the next slide", () => {
    const { getByRole } = query;

    const button = getByRole("button", { name: "Carousel Page 2" });
    fireEvent.click(button);

    const heading = getByRole("heading", { name: "Callout: Title Two" });
    expect(heading).toBeInTheDocument();
  });
});
