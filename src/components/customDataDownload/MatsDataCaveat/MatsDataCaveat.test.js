import React from 'react';
import { render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import MatsDataCaveat from './MatsDataCaveat';
import config from '../../../config';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

let store = configureStore(initialState);
jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const matsCaveatUrl =
  `${config.services.content.uri}/campd/data/custom-data-download/mats-data-caveat.md`;
const getMatsCaveatUrl = rest.get(matsCaveatUrl, (req, res, ctx) => {
  return res(ctx.json('this is mats caveat'));
});
const server = new setupServer(getMatsCaveatUrl);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('MatsDataCaveat', () => {
  test('Check that the  component properly renders custom data download helper text', async () => {
    const { findByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <MatsDataCaveat setApiErrorDispatcher={jest.fn()} />
      </MemoryRouter>
    </Provider>);
    const matsCaveat = await findByText('this is mats caveat');
    expect(matsCaveat).toBeInTheDocument();
  });
});
