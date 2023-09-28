import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GlossaryPage from './GlossaryPage';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';
import { glossaryContent } from '../../mocks/testData';

let store = configureStore(initialState);

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
