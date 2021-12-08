import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AboutPage, { releases } from './AboutPage';

describe('accordion functionality', () => {
  const accordionReleases = releases.slice(1);
  test('should render content without error', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    accordionReleases.forEach((element) => {
      const container = getAllByText(`${element.title}: ${element.date}`);
      expect(container).toBeTruthy();
    });
  });

  test.each(accordionReleases)(
    'accordions should not be expanded by default',
    (release) => {
      const { getByText } = render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );

      const accordion = getByText(`${release.title}: ${release.date}`);
      expect(accordion).toHaveAttribute('aria-expanded', 'false');
    }
  );

  test.each(accordionReleases)(
    'accordion should expand when clicked on',
    (release) => {
      const { getByText } = render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );

      const accordion = getByText(`${release.title}: ${release.date}`);
      fireEvent.click(accordion);
      expect(accordion).toHaveAttribute('aria-expanded', 'true');
    }
  );

  test.each(accordionReleases)(
    'accordion should close when already expanded and clicked on',
    (release) => {
      const { getByText } = render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );

      const accordion = getByText(`${release.title}: ${release.date}`);
      fireEvent.click(accordion);
      fireEvent.click(accordion);
      expect(accordion).toHaveAttribute('aria-expanded', 'false');
    }
  );

  test.each(accordionReleases)(
    'accordion titles should have h3 tag',
    (release) => {
      const { getByText } = render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );

      const accordion = getByText(`${release.title}: ${release.date}`);
      expect(accordion.closest('h3')).toHaveAttribute(
        'class',
        'usa-accordion__heading'
      );
    }
  );
});
