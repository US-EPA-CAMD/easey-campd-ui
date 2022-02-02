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

const getWhatIsNewContent = rest.get(getWhatIsNewUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Content"));
});
const getWhatIsNewTitle = rest.get(getWhatIsNewTitleUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Title"));
});

const whatIsNewServer = new setupServer(getWhatIsNewContent);
const whatIsNewTitleServer = new setupServer(getWhatIsNewTitle);

describe("Home Page Component", () => {
  beforeAll(() => whatIsNewServer.listen());
  beforeAll(() => whatIsNewTitleServer.listen());

  beforeEach(() => whatIsNewServer.resetHandlers());
  beforeEach(() => whatIsNewTitleServer.resetHandlers());

  afterEach(cleanup);
  afterAll(() => whatIsNewServer.close());
  afterAll(() => whatIsNewTitleServer.close());

  it("should render content without error", async () => {
    const { findByText, getByText, getAllByRole } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const data = getByText("Data");
    const mapsAndGraphs = getByText("Maps & Graphs");
    const images = getAllByRole("img");
    const whatIsNewBox = await findByText("What Is New Box Content");
    const whatIsNewBoxTitle = await findByText("What Is New Box Title");
    expect(data).toBeDefined();
    expect(mapsAndGraphs).toBeDefined();
    expect(images.length).toBe(2);
    expect(whatIsNewBox).toBeInTheDocument();
    expect(whatIsNewBoxTitle).toBeInTheDocument();
  });
});
