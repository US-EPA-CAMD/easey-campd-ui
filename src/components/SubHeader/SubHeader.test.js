import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../store/configureStore.dev';
import SubHeader from './SubHeader';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../config';
const store = configureStore();

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('react-markdown-v4', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-sub-super', () => () => {});

const titleUrl =
  `${config.services.content.uri}/campd/home/main-title.md`;
const contentUrl =
  `${config.services.content.uri}/campd/home/main-content.md`;
const getTitle = rest.get(titleUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json('Content text..'));
});
const server = new setupServer(getTitle, getContent);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('SubHeader', () => {
  test('renders without errors', async () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <SubHeader />
        </MemoryRouter>
      </Provider>
    );
    const { container, getByText } = query;

    const header = getByText('Clean Air Markets Program Data');
    const home = getByText('HOME');
    const data = getByText('DATA');
    const analysis = getByText('MAPS & GRAPHS');

    expect(header).toBeTruthy();
    expect(home).toBeTruthy();
    expect(data).toBeTruthy();
    expect(analysis).toBeTruthy();

    fireEvent.click(data);
    fireEvent.click(getByText('Custom Data Download'));
    fireEvent.click(analysis);

    expect(container.querySelector('.usa-nav__submenu')).toBeInTheDocument();
  });
});
