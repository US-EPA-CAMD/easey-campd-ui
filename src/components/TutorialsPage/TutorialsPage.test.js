import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import TutorialsPage from './TutorialsPage';
import config from '../../config';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const topics = ['Quick Start Guides', 'Data Guides', 'Other'];

const tutorialsUrl =
  `${config.services.content.uri}/campd/help-support/tutorials/index.md`;
const getTutorialsContent = rest.get(tutorialsUrl, (req, res, ctx) => {
  return res(ctx.json('this is campd'));
});
const server = new setupServer(getTutorialsContent);

describe('Tutorials Page Component', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterEach(cleanup);
  afterAll(() => server.close());
  it('should render content without error', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <TutorialsPage />
      </MemoryRouter>
    );

    const aboutHeading = await findByText('this is campd');
    expect(aboutHeading).toBeInTheDocument();

    topics.forEach(async (element) => {
      const container = await findByText(`${element}:`);
      expect(container).toBeTruthy();
    });
  });
});
