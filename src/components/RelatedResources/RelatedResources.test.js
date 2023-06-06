import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RelatedResources from './RelatedResources';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { additionalDataTools } from '../../mocks/testData';

let store = configureStore(initialState);

describe('Related Resources Page Component', () => {
  test('should render content introduction without error', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedResources setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const heading = await findByText('This is related resources intro..');
    expect(heading).toBeInTheDocument();
  });
  test('should render additional data tools list without error', async () => {
    const { findAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedResources setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    //additionalDataTools.forEach((element) => {
      const element =additionalDataTools[0];
    // additionalDataTools.forEach(async(element) => {
      const container = await findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    //});
  });
});
