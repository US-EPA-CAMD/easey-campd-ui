import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TutorialsPage from './TutorialsPage';

const topics = [
  {
    title: 'Quick Start Guides',
    items: [
      {
        name: 'Custom Data Download ',
        url: '#',
        description:
          'A brief overview of the Custom Data Download tool to build queries of apportioned emissions, allowance and compliance data.',
      },
    ],
  },
  {
    title: 'Data Guides',
    items: [
      {
        name: 'Allowance Data Guide',
        url: 'https://www.epa.gov/airmarkets/allowance-data',
        description: `A basic introduction to EPA's active and retired market-based programs offering context to allowance allocation, trading, and tracking.`,
      },
      {
        name: 'Emissions Data Guide',
        url: 'https://www.epa.gov/airmarkets/power-sector-emissions-data',
        description:
          'An overview of CAMD’s Power Sector Emissions Data and how it is collected and quality assured.',
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        name: 'Substitute Data',
        url: 'https://www.epa.gov/airmarkets/monitoring-insights',
        description:
          'Analysis exploring the use of measured and substitute data between 2015 and 2019. The analysis finds that substitute data represents a minor portion of the total reported data.',
      },
      {
        name: 'EIA Data Crosswalk',
        url: 'https://www.epa.gov/airmarkets/power-sector-data-crosswalk',
        description:
          'Table matching key EPA and Energy Information Administration (EIA) identifiers assigned to power plants and electric generating units.',
      },
    ],
  },
];

describe('Tutorials Page Component', () => {
  test('should render content without error', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TutorialsPage />
      </MemoryRouter>
    );

    topics.forEach((element) => {
      const container = getByText(`${element.title}:`);
      expect(container).toBeTruthy();
    });
  });
});
