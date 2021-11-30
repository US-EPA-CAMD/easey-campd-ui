import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AboutPage from './AboutPage';

const releases = [
  {
    title: 'Beta 0.1',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.9',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.8',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.7',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.6',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.5',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.4',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.3',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.2',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
  {
    title: 'Beta 0.0.1',
    date: 'August 11, 2021',
    features: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
    bugFixes: [
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
      'lorem ipsum dolor sit amet',
    ],
  },
];

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
