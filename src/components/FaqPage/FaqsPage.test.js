import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FaqsPage from './FaqsPage';

const topics = [
  {
    name: 'Emissions',
    items: [
      {
        title: 'What time zone is emissions data reported in?',
        id: 'emissions-time-zone',
        expanded: false,
      },
      {
        title: 'When is emissions data reported and updated in CAMPD? ',
        id: 'emissions-report-date',
        expanded: false,
      },
      {
        title: 'How often are the emissions Bulk Data Files updated?',
        id: 'emissions-bulk-data-files',
        expanded: false,
      },
      {
        title:
          'Why is the data different in other systems (NEEDs, EIA, eGRID, etc.)?',
        id: 'emissions-data-different',
        expanded: false,
      },
      {
        title:
          'Why are there blank data fields for gross load, emissions, and heat input?',
        id: 'emissions-blank-fields',
        expanded: false,
      },
      {
        title: 'How are emission rates calculated?',
        id: 'emissions-rates',
        expanded: false,
      },
      {
        title: 'How do I aggregate gross load data?',
        id: 'emissions-gross-load',
        expanded: false,
      },
      {
        title: 'Can I see Emissions by Fuel Type?',
        id: 'emissions-fuel-type',
        expanded: false,
      },
    ],
  },
  {
    name: 'Allowance & Compliance',
    items: [
      {
        title: 'Can EPA provide allowance price data or underlying datasets?',
        id: 'allow-compl-price-data',
        expanded: false,
      },
      {
        title: 'Where can I learn more about EPA’s Allowance Trading Markets?',
        id: 'allow-compl-trading-markets',
        expanded: false,
      },
    ],
  },
  {
    name: 'General',
    items: [
      {
        title: 'Where can I learn more about how to use CAMPD?',
        id: 'general-campd',
        expanded: false,
      },
      {
        title:
          'Where can I learn more information about EPA’s regulatory programs?',
        id: 'general-programs',
        expanded: false,
      },
      {
        title:
          'My company is automating download of the FTP bulk data files (previously called prepackaged datasets). What credentials do we need to use?',
        id: 'general-',
        expanded: false,
      },
    ],
  },
];

describe('FAQs Page Component', () => {
  test('should render content without error', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <FaqsPage />
      </MemoryRouter>
    );

    topics.forEach((element) => {
      const container = getAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    });
  });
});
