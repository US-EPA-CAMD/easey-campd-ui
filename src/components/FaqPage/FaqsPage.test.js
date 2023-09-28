import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FaqsPage from './FaqsPage';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';
import { topics } from '../../mocks/testData';

let store = configureStore(initialState);

const { findByText, debug } = screen;

const topicItems = topics[0].items;

describe('FAQs Page Component', () => {
  test('should render content without error', () => {
    const { findAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FaqsPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    topics.forEach((element) => {
      const container = findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    });
  });
  test('should render title text', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FaqsPage setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const titleText = await findByText('Title text..');
    expect(titleText).toBeInTheDocument();
  });
  describe('accordion functionality', () => {
    test.each(topicItems)(
      'accordions should not be expanded by default',
      async (topic) => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FaqsPage setApiErrorDispatcher={jest.fn()} />
            </MemoryRouter>
          </Provider>
        );

        const accordion = await findByText(topic.title);
        expect(accordion).toHaveAttribute('aria-expanded', 'false');
      }
    );

    test.each(topicItems)(
      'accordion should expand when clicked on',
      async (topic) => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FaqsPage setApiErrorDispatcher={jest.fn()} />
            </MemoryRouter>
          </Provider>
        );

        const accordion = await findByText(topic.title);
        fireEvent.click(accordion);
        expect(accordion).toHaveAttribute('aria-expanded', 'true');
      }
    );

    test.each(topicItems)(
      'accordion should close when already expanded and clicked on',
      async (topic) => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FaqsPage setApiErrorDispatcher={jest.fn()} />
            </MemoryRouter>
          </Provider>
        );

        const accordion = await findByText(topic.title);
        fireEvent.click(accordion);
        fireEvent.click(accordion);
        expect(accordion).toHaveAttribute('aria-expanded', 'false');
      }
    );

    test.each(topicItems)(
      'accordion titles should have h3 tag for 508',
      async (topic) => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <FaqsPage setApiErrorDispatcher={jest.fn()} />
            </MemoryRouter>
          </Provider>
        );

        const accordion = await findByText(topic.title);
        expect(accordion.closest('h3')).toHaveAttribute(
          'class',
          'usa-accordion__heading'
        );
      }
    );
  });
});
