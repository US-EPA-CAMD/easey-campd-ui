import React from "react";
import { screen } from "@testing-library/react";
import Markdown, {
  renderH1,
  renderH2,
  renderUL,
  renderImg,
  renderTable,
  renderTableHead,
  renderLink,
} from "./Markdown";
import userEvent from "@testing-library/user-event";
import render from "../../mocks/render";

describe("renderH1", () => {
  test("renders h1", () => {
    const text = "Heading 1";
    const Component = renderH1();
    render(<Component>{text}</Component>);
    const headingElement = screen.getByRole("heading", {
      level: 1,
      name: text,
    });
    expect(headingElement).toBeInTheDocument();
  });
});

describe("renderH2", () => {
  test("renders h2", () => {
    const text = "Heading 2";
    const Component = renderH2();
    render(<Component>{text}</Component>);
    const headingElement = screen.getByRole("heading", {
      level: 2,
      name: text,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders h2 with 'subTitle' correctly", () => {
    const text = "Heading 2 Subtitle";
    const Component = renderH2("subTitle");
    render(<Component>{text}</Component>);
    const headingElement = screen.getByRole("heading", {
      level: 2,
      name: text,
    });
    expect(headingElement).toBeInTheDocument();
  });
});

describe("renderUL", () => {
  test("renders ul", () => {
    const Component = renderUL();
    render(
      <Component>
        <li>Item 1</li>
        <li>Item 2</li>
      </Component>
    );
    const ulElement = screen.getByRole("list");
    expect(ulElement).toBeInTheDocument();
    expect(ulElement).toHaveClass("padding-left-3");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});

describe("renderImg", () => {
  test("renders img with correct props", () => {
    const Component = renderImg("image-id", "Image Alt");
    render(<Component src="image.jpg" />);
    const imgElement = screen.getByAltText("Image Alt");
    expect(imgElement).toBeInTheDocument();
  });

  test("sets id as atl if no alt is passed in", () => {
    const Component = renderImg("image-id");
    render(<Component src="image.jpg" />);
    const imgElement = screen.getByAltText("image-id");
    expect(imgElement).toBeInTheDocument();
  });
});

describe("renderTable", () => {
  test("renders table", () => {
    const Component = renderTable();
    render(<Component className="my-table" />);
    const tableElement = screen.getByRole("presentation");
    expect(tableElement).toBeInTheDocument();
  });
});

describe("renderTableHead", () => {
  test("renders table head", () => {
    const Component = renderTableHead();
    render(<Component colSpan={2}>Header Cell</Component>);
    const thElement = screen.getByRole("cell", { name: "Header Cell" });
    expect(thElement).toBeInTheDocument();
  });
});

describe("renderLink", () => {
  test("renders header link correctly", async () => {
    const navigate = jest.fn();
    const Component = renderLink(navigate);
    render(
      <Component
        node={{ properties: { title: "Header Link" } }}
        href="/path"
        children={["Link Text"]}
      />
    );
    const buttonElement = screen.getByRole("button", { name: "Link Text" });
    expect(buttonElement).toBeInTheDocument();
    await userEvent.click(buttonElement);
  });

  test("renders button link correctly", async () => {
    const navigate = jest.fn();
    const Component = renderLink(navigate);
    render(
      <Component
        node={{ properties: { title: "Button Link" } }}
        href="/path"
        children={["Button Text"]}
      />
    );
    const buttonElement = screen.getByRole("link", { name: "Button Text" });
    expect(buttonElement).toBeInTheDocument();
    await userEvent.click(buttonElement);
  });
  test("renders link correctly", async () => {
    const navigate = jest.fn();
    const Component = renderLink(navigate);
    render(
      <Component
        node={{ properties: { title: "Link" } }}
        children={["Link Text"]}
        href="/path"
      />
    );
    const linkElement = screen.getByRole("link", { name: "Link Text" });
    expect(linkElement).toBeInTheDocument();
    await userEvent.click(linkElement);
  });
});

describe("markdown", () => {
  render(<Markdown>markdown</Markdown>);
  expect(screen.getByText("markdown")).toBeInTheDocument();
});
