import React from "react";
import HomePage from "./HomePage";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import config from "../../config";

jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

const getWhatIsNewUrl =
  `${config.services.content.uri}/campd/home/what-is-new-content.md`;

const getWhatIsNewTitleUrl =
  `${config.services.content.uri}/campd/home/what-is-new-title.md`;

const getDataCardUrl =
  `${config.services.content.uri}/campd/home/data-card.md`;

const getMapsGraphsCardUrl =
  `${config.services.content.uri}/campd/home/maps-and-graphs-card.md` 


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

const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(ctx.json({year: 2022, quarterName: 'second', percentage: '30%'}))
})
const server = new setupServer(getWhatIsNewContent, getWhatIsNewTitle, getDataCard, getMapsGraphs, getSubmissionProgress);

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
