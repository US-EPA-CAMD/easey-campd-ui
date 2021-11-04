import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RelatedResources from './RelatedResources';

const topics = [
  {
    name: 'AirData',
    url: 'https://www.epa.gov/outdoor-air-quality-data',
    description:
      'AirData provides air quality data from the AQS (Air Quality System) database and other data sources allowing download, reporting, graphing and mapping functionalities.',
  },
  {
    name: 'CASTNET',
    url: 'https://www.epa.gov/castnet',
    description:
      'The Clean Air Status and Trends Network (CASTNET) is a national air quality monitoring network providing data to assess trends in air quality, atmospheric deposition, and ecological effects due to changes in air pollutant emissions.',
  },
  {
    name: 'eGRID',
    url: 'https://www.epa.gov/egrid',
    description:
      'The Emissions & Generation Resource Integrated Database (eGRID) is a comprehensive data source on the environmental characteristics of almost all electric power generated in the United States. eGRID contains emissions and resource mix data for virtually every power plant and company that generates electricity in the United States.',
  },
  {
    name: 'Energy Information Administration',
    url: 'http://www.eia.gov/environment/',
    description:
      'Environment Energy-related emissions data & environmental analyses.',
  },
  {
    name: 'National Air Pollution Emissions Trends',
    url: 'https://www.epa.gov/air-trends',
    description:
      'Information and reports about air quality trends for various pollutants. ',
  },
  {
    name: 'National Atmospheric Deposition Program',
    url: 'http://nadp.slh.wisc.edu/',
    description:
      'Access data from the national network of precipitation monitoring sites.',
  },
  {
    name: 'National Emissions Inventory',
    url: 'https://www.epa.gov/air-emissions-inventories',
    description: `EPA's National Emission Inventory (NEI) database contains information about sources that emit criteria air pollutants and their precursors, and hazardous air pollutants including estimates of annual air pollutant emissions from point, nonpoint, and mobile sources in the 50 States, the District of Columbia, Puerto Rico, and the Virgin Islands.`,
  },
  {
    name: 'Reports',
    url: 'http://www3.epa.gov/airmarkets/progress/reports/index.html',
    description:
      'Current and historical EPA reports covering progress under air market programs including the Cross-State Air Pollution Rule, Clean Air Interstate Rule, the Acid Rain Program, and the former NOx Budget Trading Program.',
  },
  {
    name: 'US Greenhouse Gas Inventory',
    url: 'https://www.epa.gov/ghgemissions',
    description:
      'EPA prepares a national inventory of United States greenhouse gas emissions each year for submission under the United Nations Framework Convention on Climate Change.',
  },
];

describe('Related Resources Page Component', () => {
  test('should render content without error', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <RelatedResources />
      </MemoryRouter>
    );

    topics.forEach((element) => {
      const container = getAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    });
  });
});
