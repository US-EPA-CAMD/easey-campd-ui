import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApiErrorAlert from './ApiErrorAlert';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);
const mockUseLocationValue = {
  pathname: "/data/custom-data-download",
  search: '',
  hash: '',
  state: null
}
jest.mock('react-router', () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
  })
}));


jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: {scrollIntoView : jest.fn()} });
describe('ApiErrorAlert', () => {
    test("does not render alert if there is no error", async () => {
        const { container } = render(
          <Provider store={store}>
            <MemoryRouter>
                <ApiErrorAlert />
            </MemoryRouter>
          </Provider>
        );
        const alert = container.querySelector('#api-error-banner');
        expect(alert).toBeFalsy();
      });
});
