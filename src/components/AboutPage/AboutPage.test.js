import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AboutPage from './AboutPage';
jest.mock("react-markdown", () => ({children}) => 
  <>{children}</>
)
jest.mock("remark-gfm", () => () => {
})
const releases = [
  {
    title: 'Beta 0.1',
    date: 'August 11, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.9',
    date: 'July 26, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.8',
    date: 'June 2, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.7',
    date: 'May 14, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.6',
    date: 'May 1, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.5',
    date: 'April 23, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.4',
    date: 'February 28, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.3',
    date: 'February 3, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.2',
    date: 'December 20, 2020',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.1',
    date: 'November 04, 2020',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
];
describe('accordion functionality', () => {
  const accordionReleases = releases.slice(1);
  test('should render content without error', () => {
    const { getAllByText, debug } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
      debug()
    accordionReleases.forEach((element) => {
      const container = getAllByText(`${element.title}: ${element.date}`);
      expect(container).toBeTruthy();
    });
  });

  // test.each(accordionReleases)(
  //   'accordions should not be expanded by default',
  //   (release) => {
  //     const { getByText } = render(
  //       <MemoryRouter>
  //         <AboutPage />
  //       </MemoryRouter>
  //     );

  //     const accordion = getByText(`${release.title}: ${release.date}`);
  //     expect(accordion).toHaveAttribute('aria-expanded', 'false');
  //   }
  // );

  // test.each(accordionReleases)(
  //   'accordion should expand when clicked on',
  //   (release) => {
  //     const { getByText } = render(
  //       <MemoryRouter>
  //         <AboutPage />
  //       </MemoryRouter>
  //     );

  //     const accordion = getByText(`${release.title}: ${release.date}`);
  //     fireEvent.click(accordion);
  //     expect(accordion).toHaveAttribute('aria-expanded', 'true');
  //   }
  // );

  // test.each(accordionReleases)(
  //   'accordion should close when already expanded and clicked on',
  //   (release) => {
  //     const { getByText } = render(
  //       <MemoryRouter>
  //         <AboutPage />
  //       </MemoryRouter>
  //     );

  //     const accordion = getByText(`${release.title}: ${release.date}`);
  //     fireEvent.click(accordion);
  //     fireEvent.click(accordion);
  //     expect(accordion).toHaveAttribute('aria-expanded', 'false');
  //   }
  // );

  // test.each(accordionReleases)(
  //   'accordion titles should have h3 tag',
  //   (release) => {
  //     const { getByText } = render(
  //       <MemoryRouter>
  //         <AboutPage />
  //       </MemoryRouter>
  //     );

  //     const accordion = getByText(`${release.title}: ${release.date}`);
  //     expect(accordion.closest('h3')).toHaveAttribute(
  //       'class',
  //       'usa-accordion__heading'
  //     );
  //   }
  // );
});
