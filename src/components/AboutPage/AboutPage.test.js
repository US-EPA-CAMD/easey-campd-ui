import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AboutPage from './AboutPage';
import config from '../../config';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
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

const relaseNotesUrl = `${config.services.content.uri}/campd/help-support/about/release-notes.json`;
const aboutUrl = `${config.services.content.uri}/campd/help-support/about/index.md`;
const getReleaseNotes = rest.get(relaseNotesUrl, (req, res, ctx) => {
  return res(ctx.json(releases));
});
const getAboutContent = rest.get(aboutUrl, (req, res, ctx) => {
  return res(ctx.json('this is campd'));
});
const server = new setupServer(getReleaseNotes, getAboutContent);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('accordion functionality', () => {
  const accordionReleases = releases.slice(1);
  test('should render content without error', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AboutPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const aboutHeading = await findByText('this is campd');
    expect(aboutHeading).toBeInTheDocument();
  });

  test.each(accordionReleases)(
    'accordions should not be expanded by default',
    async (release) => {
      const { findByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <AboutPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const accordion = await findByText(`${release.title}: ${release.date}`);
      expect(accordion).toHaveAttribute('aria-expanded', 'false');
    }
  );

  test.each(accordionReleases)(
    'accordion should expand when clicked on',
    async (release) => {
      const { findByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <AboutPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const accordion = await findByText(`${release.title}: ${release.date}`);
      fireEvent.click(accordion);
      expect(accordion).toHaveAttribute('aria-expanded', 'true');
    }
  );

  test.each(accordionReleases)(
    'accordion should close when already expanded and clicked on',
    async (release) => {
      const { findByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <AboutPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const accordion = await findByText(`${release.title}: ${release.date}`);
      fireEvent.click(accordion);
      fireEvent.click(accordion);
      expect(accordion).toHaveAttribute('aria-expanded', 'false');
    }
  );

  test.each(accordionReleases)(
    'accordion titles should have h3 tag',
    async (release) => {
      const { findByText } = render(
        <Provider store={store}>
          <MemoryRouter>
            <AboutPage setApiErrorDispatcher={jest.fn()} />
          </MemoryRouter>
        </Provider>
      );

      const accordion = await findByText(`${release.title}: ${release.date}`);
      expect(accordion.closest('h3')).toHaveAttribute(
        'class',
        'usa-accordion__heading'
      );
    }
  );
});
