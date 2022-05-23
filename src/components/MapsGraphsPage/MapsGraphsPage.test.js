import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import config from "../../config";
import MapsGraphsPage from "./MapsGraphsPage";

jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

const contentUrl = `${config.services.content.uri}/campd/maps-graphs`;

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

const tools = [
  {
    name: "Tool One",
    image: "tools/tool1.png",
    url: "/",
    description: "tools/tool1.md",
    source: { url: "/", text: "Tool 1 Source" },
    keywords: ["One", "Two", "Three", "Four"],
    updated: "MM/DD/YYYY",
  },
];

const server = new setupServer(
  rest.get(`${contentUrl}/intro-text.md`, (req, res, ctx) => {
    return res(ctx.json("Maps & Graphs is a collection..."));
  }),
  rest.get(`${contentUrl}/slides.json`, (req, res, ctx) => {
    return res(ctx.json(slides));
  }),
  rest.get(`${contentUrl}/slides/:imageOrText`, (req, res, ctx) => {
    return res(ctx.json(""));
  }),
  rest.get(`${contentUrl}/tools.json`, (req, res, ctx) => {
    return res(ctx.json(tools));
  }),
  rest.get(`${contentUrl}/tools/:imageOrDescription`, (req, res, ctx) => {
    return res(ctx.json(""));
  })
);

describe("Maps and Graphs Page Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should render content without error", async () => {
    const { findByText, findByRole, findAllByRole } = render(
      <MemoryRouter>
        <MapsGraphsPage />
      </MemoryRouter>
    );

    const introText = await findByText("Maps & Graphs is a collection...");
    expect(introText).toBeDefined();

    // advance to the second slide
    const button = await findByRole("button", { name: "Carousel Page 2" });
    fireEvent.click(button);
    const heading = await findByRole("heading", { name: "Callout: Title Two" });
    expect(heading).toBeInTheDocument();

    // NOTE: the title and images are hyperlinked in each <Tool />
    const toolLinks = await findAllByRole("link", { name: "Tool One" });
    expect(toolLinks).toHaveLength(2);
  });
});
