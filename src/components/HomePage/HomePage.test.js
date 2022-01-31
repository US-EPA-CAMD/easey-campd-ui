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

const getWhatIsNewContent = rest.get(getWhatIsNewUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Content"));
});

const server = new setupServer(getWhatIsNewContent);

describe("Home Page Component", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterEach(cleanup);
  afterAll(() => server.close());
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
    expect(data).toBeDefined();
    expect(mapsAndGraphs).toBeDefined();
    expect(images.length).toBe(2);
    expect(whatIsNewBox).toBeInTheDocument();
  });
});
