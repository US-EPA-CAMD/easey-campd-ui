import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AboutPage, { releases } from './AboutPage';

describe('About Page Component', () => {
  test('should render content without error', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    releases.slice(1).forEach((element) => {
      const container = getAllByText(`${element.title}: ${element.date}`);
      expect(container).toBeTruthy();
    });
  });

  test('accordion should not be expanded by default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const accordion = getByText(`${releases[1].title}: ${releases[1].date}`);
    expect(accordion).toHaveAttribute('aria-expanded', 'false');
  });

  test('accordion should expand when clicked on', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const accordion = getByText(`${releases[1].title}: ${releases[1].date}`);
    fireEvent.click(accordion);
    expect(accordion).toHaveAttribute('aria-expanded', 'true');
  });

  test('accordion should close when already expanded and clicked on', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const accordion = getByText(`${releases[1].title}: ${releases[1].date}`);
    fireEvent.click(accordion);
    fireEvent.click(accordion);
    expect(accordion).toHaveAttribute('aria-expanded', 'false');
  });
});
