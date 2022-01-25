import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import GlossaryPage from './GlossaryPage';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const contentUrl = 'https://api.epa.gov/easey/dev/content-mgmt/campd/resources/glossary/index.md';
const pdfUrl ='https://api.epa.gov/easey/dev/content-mgmt/campd/resources/glossary/CAMPD-Glossary.pdf';
const csvUrl ='https://api.epa.gov/easey/dev/content-mgmt/campd/resources/glossary/CAMPD-Glossary.xlsx';

const glossaryContent = `Glossary Content`;

const getGlossaryContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json(glossaryContent));
});
const getGlossaryPdf = rest.get(pdfUrl, (req, res, ctx) => {
  return res(ctx.json("glossary PDF Content"));
});
const getGlossaryCsv = rest.get(csvUrl, (req, res, ctx) => {
  return res(ctx.json("glossary CSV Content"));
});

const server = new setupServer(getGlossaryContent, getGlossaryPdf, getGlossaryCsv);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Glossary page functionality', () => {
  test('should render content without error', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <GlossaryPage />
      </MemoryRouter>
    );
    const content = await findByText(glossaryContent);
    expect(content).toBeInTheDocument();
  });

  test('should render two buttons', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <GlossaryPage />
      </MemoryRouter>
    );
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(2);

  });
});