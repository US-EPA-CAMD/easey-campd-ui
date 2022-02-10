import React from 'react'
import SubHeaderInfo from './SubHeaderInfo'
import { render } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('react-markdown-v4', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-sub-super', () => () => {});

const titleUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/home/main-title.md';
const contentUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/home/main-content.md';
const getTitle = rest.get(titleUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json('Content text..'));
});
const server = new setupServer(getTitle, getContent);

describe('Sub-header Info Component', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("should render title without error", async () => {
    const {findByText} = render(
    <MemoryRouter>
      <SubHeaderInfo/>
    </MemoryRouter>);
    const header = await findByText('Title text..');
    expect(header).toBeInTheDocument();
  });
  // test("should render content without error", async () => {
  //   const {findByText} = render(
  //   <MemoryRouter>
  //     <SubHeaderInfo/>
  //   </MemoryRouter>);
  //   const content = await findByText('Content text..');
  //   expect(content).toBeInTheDocument();
  // });
});
