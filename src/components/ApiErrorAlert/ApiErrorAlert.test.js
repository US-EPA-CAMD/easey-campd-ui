import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApiErrorAlert from './ApiErrorAlert';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);

describe('ApiErrorAlert', () => {
    test("does not render alert if there is no error", async () => {
        const { container } = render(
          <Provider store={store}>
            <MemoryRouter basename="/data/custom-data-download">
                <ApiErrorAlert />
            </MemoryRouter>
          </Provider>
        );
        const alert = container.querySelector('#api-error-banner');
        expect(alert).toBeFalsy();
      });
});
