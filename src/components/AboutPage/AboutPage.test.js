import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';
import { releases } from '../../mocks/testData';

let store = configureStore(initialState);

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
