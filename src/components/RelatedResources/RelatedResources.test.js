import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RelatedResources from './RelatedResources';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../config';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';

let store = configureStore(initialState);
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const additionalDataTools = [
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
    hasExit: true,
  },
  {
    name: 'National Emissions Inventory',
    url: 'https://www.epa.gov/air-emissions-inventories',
    description: `EPA's National Emission Inventory (NEI) database contains information about sources that emit criteria air pollutants and their precursors, and hazardous air pollutants including estimates of annual air pollutant emissions from point, nonpoint, and mobile sources in the 50 States, the District of Columbia, Puerto Rico, and the Virgin Islands.`,
  },
  {
    name: 'Progress Reports',
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

const baseUrl = `${config.services.content.uri}/campd/help-support/related-resources`;
const contentIntroUrl = `${baseUrl}/index.md`;
const additionalToolsUrl = `${baseUrl}/additional-data-tools.json`;
const getAdditionalToolsUrl = rest.get(additionalToolsUrl, (req, res, ctx) => {
  return res(ctx.json(additionalDataTools));
});
const getContentIntro = rest.get(contentIntroUrl, (req, res, ctx) => {
  return res(ctx.json('This is related resources intro..'));
});
const server = new setupServer(getAdditionalToolsUrl, getContentIntro);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Related Resources Page Component', () => {
  test('should render content introduction without error', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedResources setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const heading = await findByText('This is related resources intro..');
    expect(heading).toBeInTheDocument();
  });
  test('should render additional data tools list without error', async () => {
    const { findAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedResources setApiErrorDispatcher={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    //additionalDataTools.forEach((element) => {
      const element =additionalDataTools[0];
    // additionalDataTools.forEach(async(element) => {
      const container = await findAllByText(`${element.name}`);
      expect(container).toBeTruthy();
    //});
  });
});
