import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event'


import ContactUsPage from './ContactUsPage';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const commentTypes = [
  {
    id: 1,
    value: `Help using application`,
  },
  {
    id: 2,
    value: `Report a bug`,
  },
  {
    id: 3,
    value: `Data question`,
  },
  {
    id: 4,
    value: `Suggested enhancements`,
  },
  {
    id: 5,
    value: `Other`,
  },
];

const statuses = [
  {
    status: 'success',
    message:
      'Success! You will be sent a confirmation email within the next 24 hours. If you do not receive a notification, please resubmit your issue, reach out to the Clean Air Markets Division hotline at 202-343-9620, or email [email].',
    email: 'campd-support@camdsupport.com',
  },
  {
    status: 'error-incomplete-fields',
    message:
      'All fields are required. Please fill in the form completely and try again.',
  },
  {
    status: 'error-unsuccessful-submition',
    message:
      'An error occurred while submitting your comment. Please resubmit your information; or call the Clean Air Markets Division hotline 202-343-9620; or email [email].',
    email: 'campd-support@camdsupport.com',
  },
];

const indexUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/help-support/contact-us/index.md';
const commentTypesUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/help-support/contact-us/comment-types.json';
const statusTextUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/help-support/contact-us/submit-status-text.json';

const getIndex = rest.get(indexUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getCommentTypes = rest.get(commentTypesUrl, (req, res, ctx) => {
  return res(ctx.json(commentTypes));
});
const getStatus = rest.get(statusTextUrl, (req, res, ctx) => {
  return res(ctx.json(statuses));
});
const server = new setupServer(getIndex, getCommentTypes, getStatus);
 beforeAll(() => server.listen());
 beforeEach(() => server.resetHandlers());
 afterEach(cleanup);
 afterAll(() => server.close());
describe('Contact Us Page Component', () => {

  describe('form validation', () => {
    test('should show error message if any field is incomplete', async () => {
      const { findByText, findByRole, findByTestId } = render(
        <MemoryRouter>
          <ContactUsPage/>
        </MemoryRouter>
      );

      const emailField = await findByRole('textbox', {
        name: /email/i,
      });
      const commentField = await findByTestId(/textarea/i);
      const submitButton = await findByText(/Submit/i);
      fireEvent.change(emailField, { target: { value: 'test@test.com' } });
      userEvent.type(commentField, 'testing123');
      fireEvent.click(submitButton);
      const errorMessage = await findByRole('heading', {
        name: /error/i,
      });
      expect(errorMessage).toBeInTheDocument();
    });

    test('should not show error message if form is filled out correctly', async () => {
      const { findByText, findByRole, findByTestId, queryByRole } = render(
        <MemoryRouter>
          <ContactUsPage/>
        </MemoryRouter>
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
      const errorMessage = await queryByRole('heading', {
        name: /error/i,
      });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('api', () => {

  })
  
  it('should render content without error', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <ContactUsPage />
      </MemoryRouter>
    );

    commentTypes.forEach( async (element) => {
      const container = await findByText(element.value);
      expect(container).toBeTruthy();

    const button = await findByText('Submit');
    fireEvent.click(button);
    });
  });
});
