import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ContactUsPage from './ContactUsPage';

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

describe('Contact Us Page Component', () => {
  test('should render content without error', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ContactUsPage />
      </MemoryRouter>
    );

    commentTypes.forEach((element) => {
      const container = getByText(element.value);
      expect(container).toBeTruthy();

      const button = getByText('Submit');
      fireEvent.click(button);
    });
  });
});
