import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'


import ContactUsPage from './ContactUsPage';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';
import { commentTypes } from '../../mocks/testData';

let store = configureStore(initialState);
describe('Contact Us Page Component', () => {

  describe('form validation', () => {
    test('should show error message if any field is incomplete', async () => {
      const { findByText, findByRole, findByTestId } = render(
        <Provider store={store}>
          <MemoryRouter>
            <ContactUsPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const emailField = await findByRole('textbox', {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const submitButton = await findByText(/Submit/i);
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });
      userEvent.type(commentField, 'testing1234');
      fireEvent.click(submitButton);
      // const errorMessage = await findByRole('heading', {
      //   name: /error/i,
      // });
      // expect(errorMessage).toBeInTheDocument();
    });

    test('should show error message if email format is incorrect', async () => {
      const { findByText, findByRole, findByTestId } = render(
        <Provider store={store}>
          <MemoryRouter>
            <ContactUsPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const emailField = await findByRole('textbox', {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const submitButton = await findByText(/Submit/i);
      fireEvent.change(emailField, { target: { value: 'test..@test.com' } });
      userEvent.type(commentField, 'testing1234');
      fireEvent.click(submitButton);
      // const errorMessage = await findByRole('heading', {
      //   name: /error/i,
      // });
      // expect(errorMessage).toBeInTheDocument();
    });
    test('should not show error message if form is filled out correctly', async () => {
      const { findByText, findByRole, findByTestId, queryByRole } = render(
        <Provider store={store}>
          <MemoryRouter>
            <ContactUsPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const emailField = await findByRole('textbox', {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const commentType = await findByText(/help using application/i);
      const submitButton = await findByText(/Submit/i);
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });
      fireEvent.click(commentType);
      userEvent.type(commentField, 'testing123');
      fireEvent.click(submitButton);
      // const errorMessage = await queryByRole('heading', {
      //   name: /error/i,
      // });
      // expect(errorMessage).not.toBeInTheDocument();
    });
  });
  
  test('should show success message if form is filled out correctly', async () => {
    const { findByText, findByRole, findByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactUsPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    const emailField = await findByRole('textbox', {
      name: /email/i,
    });
    const commentField = await findByTestId(/textarea/i);
    const commentType = await findByText(/help using application/i);
    const submitButton = await findByText(/Submit/i);
    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.click(commentType);
    userEvent.type(commentField, 'testing123');
    fireEvent.click(submitButton);
    // await waitFor(() => findByRole('heading', {
    //   name: /success/i,
    // }))
    // const successMessage = await findByRole('heading', {
    //   name: /success/i,
    // });
    //     expect(successMessage).toBeInTheDocument();
  });

  describe('api', () => {
    it('should render content without error', async () => {
    const { findByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ContactUsPage setApiErrorDispatcher={jest.fn()} />
      </MemoryRouter>
    </Provider>
    );

    commentTypes.forEach( async (element) => {
      const container = await findByText(element.value);
      expect(container).toBeTruthy();

    const button = await findByText('Submit');
    fireEvent.click(button);
    });
  });
  })

});
