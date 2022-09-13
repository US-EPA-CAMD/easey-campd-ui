import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import GlossaryPage from './GlossaryPage';
import config from '../../config';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const baseUrl = `${config.services.content.uri}/campd/help-support/glossary`;
const contentUrl = `${baseUrl}/index.md`;
const pdfUrl = `${baseUrl}/CAMPD-Glossary.pdf`;
const csvUrl = `${baseUrl}/CAMPD-Glossary.xlsx`;

const glossaryContent = `Glossary Content`;

const getGlossaryContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json(glossaryContent));
});
const getGlossaryPdf = rest.get(pdfUrl, (req, res, ctx) => {
  return res(ctx.json('glossary PDF Content'));
});
const getGlossaryCsv = rest.get(csvUrl, (req, res, ctx) => {
  return res(ctx.json('glossary CSV Content'));
});

const server = new setupServer(
  getGlossaryContent,
  getGlossaryPdf,
  getGlossaryCsv
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Glossary page functionality', () => {
  test('should render content without error', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GlossaryPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const content = await findByText(glossaryContent);
    expect(content).toBeInTheDocument();
  });
});
