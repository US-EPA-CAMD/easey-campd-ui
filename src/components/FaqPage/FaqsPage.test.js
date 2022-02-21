import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import FaqsPage from './FaqsPage';
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('react-markdown-v4', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-sub-super', () => () => {});

const topics = [{
  "name": "Allowance & Compliance",
  "items": [
    {
      "title": "Can EPA provide allowance price data or underlying datasets?",
      "content": "EPA does not supply or collect allowance price data or price information on individual trades in the market. Third parties provide trade price data which is published via the EPA web and EPA annual <a class='usa-link' target='_blank' rel='noopener noreferrer' href={'https://www3.epa.gov/airmarkets/progress/reports/'}>progress</a> reports as a public service in graphical format only. EPA is prohibited by agreement with the owners/suppliers of the price data from publishing the underlying data sets. The companies recognize that the data has value and, therefore, can be sold to companies, academics, and researchers. Users interested in this data will need to contact the firms in question to contract for the data."
    },
    {
      "title": "Where can I learn more about EPA’s Allowance Trading Markets?",
      "content": "Information on allowance trading and the Acid Rain Program auction can be found on the Clean Air Markets Division Allowance Markets <Link target='_blank' rel='noreferrer' href={'https://www.epa.gov/airmarkets/allowance-markets'}> webpage</Link>."
    }
  ]
}]
const titleUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/help-support/faqs/index.md';
const contentUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/help-support/faqs/topics.md';
const getTitle = rest.get(titleUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json(topics));
});
const server = new setupServer(getTitle, getContent);


describe('FAQs Page Component', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('should render content without error', () => {
    const { findAllByText } = render(
      <MemoryRouter>
        <FaqsPage />
      </MemoryRouter>
    );

    topics.forEach((element) => {
      const container = findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    });
  });
});
