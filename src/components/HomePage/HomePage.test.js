import React from "react";
import HomePage from "./HomePage";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

const getWhatIsNewUrl =
  "https://api.epa.gov/easey/dev/content-mgmt/campd/home/what-is-new-content.md";

const getWhatIsNewTitleUrl =
  "https://api.epa.gov/easey/dev/content-mgmt/campd/home/what-is-new-title.md";

const getDataCardUrl =
  "https://api.epa.gov/easey/dev/content-mgmt/campd/home/data-card.md";

const getMapsGraphsCardUrl =
  "https://api.epa.gov/easey/dev/content-mgmt/campd/home/maps-and-graphs-card.md"; 


const getWhatIsNewContent = rest.get(getWhatIsNewUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Content"));
});
const getWhatIsNewTitle = rest.get(getWhatIsNewTitleUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Title"));
});
const getDataCard = rest.get(getDataCardUrl, (req, res, ctx) => {
  return res(ctx.json("Data"));
});
const getMapsGraphs = rest.get(getMapsGraphsCardUrl, (req, res, ctx) => {
  return res(ctx.json("Maps & Graphs"));
});

const server = new setupServer(getWhatIsNewContent, getWhatIsNewTitle, getDataCard, getMapsGraphs);

describe("Home Page Component", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render content without error", async () => {
    const { findByText, findAllByRole } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const data = await findByText("Data");
    const mapsAndGraphs = await findByText("Maps & Graphs");
    // const images = await findAllByRole("img");
    const whatIsNewBox = await findByText("What Is New Box Content");
    const whatIsNewBoxTitle = await findByText("What Is New Box Title");
    expect(data).toBeDefined();
    expect(mapsAndGraphs).toBeDefined();
    // expect(images.length).toBe(2);
    expect(whatIsNewBox).toBeInTheDocument();
    expect(whatIsNewBoxTitle).toBeInTheDocument();
  });
});
