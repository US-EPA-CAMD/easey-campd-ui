import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TutorialsPage from './TutorialsPage';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';

let store = configureStore(initialState);
const topics = ['Quick Start Guides', 'Data Guides', 'Other'];

describe('Tutorials Page Component', () => {
  afterEach(cleanup);
  it('should render content without error', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <TutorialsPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const aboutHeading = await findByText('this is campd');
    expect(aboutHeading).toBeInTheDocument();

    topics.forEach(async (element) => {
      const container = await findByText(`${element}:`);
      expect(container).toBeTruthy();
    });
  });
});
