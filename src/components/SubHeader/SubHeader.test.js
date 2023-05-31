import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../store/configureStore.dev';
import SubHeader from './SubHeader';
const store = configureStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    push: jest.fn(),
  }),
}));

describe('SubHeader', () => {
  test('renders without errors', async () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter basename="campd" >
          <SubHeader />
        </MemoryRouter>
      </Provider>
    );
    screen.debug()
    // const { getByText, container } = query;

    // const header = getByText('Clean Air Markets Program Data');
    // const home = getByText('HOME');
    // const data = getByText('DATA');
    // const analysis = getByText('VIZ GALLERY');

    // expect(header).toBeTruthy();
    // expect(home).toBeTruthy();
    // expect(data).toBeTruthy();
    // expect(analysis).toBeTruthy();

    // fireEvent.click(data);
    // userEvent.click(getByText(/help\/support/i));
    // expect(container.querySelector('.usa-nav__submenu')).toBeInTheDocument();
    // fireEvent.click(analysis);
  });
});
