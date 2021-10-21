import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../store/configureStore.dev';
import BulkDataFiles from './BulkDataFiles';
const store = configureStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const topics = [
  {
    name: 'Allowances',
    descriptions: (
      <ul>
        <li>Allowance Holdings (updated daily)</li>
        <li>Allowance Transactions (updated annually)</li>
        <li>Initial Allowance Allocations - Acid Rain Program</li>
      </ul>
    ),
    url: 'https://gaftp.epa.gov/DMDnLoad/allowances/',
  },
  {
    name: 'Compliance',
    descriptions: (
      <ul>
        <li>Allowance-based compliance (updated annually)</li>
        <li>Emissions-based compliance – ARP NOx Program (updated annually)</li>
        <li>Averaging Plan Summary – ARP NOx Program (updated annually)</li>
      </ul>
    ),
    url: 'https://gaftp.epa.gov/DMDnLoad/compliance',
  },
  {
    name: 'Emissions',
    descriptions: (
      <ul>
        <li>Apportioned Unit-Level Daily Emissions (updated quarterly)</li>
        <li>Apportioned Unit-Level Hourly Emissions (updated quarterly)</li>
        <li>Apportioned Unit-Level MATS data (updated quarterly)</li>
        <li>
          Hourly Continuous Emissions Monitoring (CEM) data files formatted for
          use with the Sparse Matrix Operator Kernel Emissions (SMOKE) modeling
          system version 2.3 or later. (updated annually)
        </li>
      </ul>
    ),
    url: 'https://gaftp.epa.gov/DMDnLoad/emissions',
  },
  {
    name: 'Raw Emissions (XML)',
    descriptions: (
      <ul>
        <li>Emissions Submittals (updated quarterly)</li>
        <li>Monitoring Plan Submittals QA data (updated quarterly)</li>
      </ul>
    ),
    url: 'https://gaftp.epa.gov/DMDnLoad/xml',
  },
];

describe('Bulk Data Files: ', () => {
  test('sections render without errors', () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles />
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = query;

    topics.forEach((element) => {
      const section = getByText(element.name);
      expect(section).toBeTruthy();
    });
  });

  test('buttons render without errors', () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles />
        </MemoryRouter>
      </Provider>
    );
    const { getByText } = query;

    topics.forEach((element) => {
      const text = `Access ${element.name} Data`;
      const button = getByText(text);
      expect(button).toBeTruthy();
    });
  });
});
