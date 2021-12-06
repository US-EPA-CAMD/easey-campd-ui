import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../store/configureStore.dev';
import SubHeader from './SubHeader';
const store = configureStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('SubHeader', () => {
  test('renders without errors', () => {
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
    const analysis = getByText('VISUALIZATION & ANALYSIS');

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
