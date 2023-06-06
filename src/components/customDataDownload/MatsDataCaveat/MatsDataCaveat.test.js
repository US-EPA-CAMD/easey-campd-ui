import React from 'react';
import { render } from '@testing-library/react';

import MatsDataCaveat from './MatsDataCaveat';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

let store = configureStore(initialState);
jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});

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
