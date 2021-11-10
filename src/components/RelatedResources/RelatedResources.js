import React, { useEffect } from 'react';
import { Link } from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';

const RelatedResources = () => {
  useEffect(() => {
    document.title = 'Related Resources | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Resources relevant to Clean Air Markets Program Data (CAMPD)'
  );
  metaAdder(
    'keywords',
    'Air data, Castnet, eGrid, Energy Information Administration, National Air Pollution Emissions Trends, National Emissions Inventory, Progress report, US Greenhouse Gas Inventory'
  );

  const topics = [
    {
      name: 'AirData',
      url: 'https://www.epa.gov/outdoor-air-quality-data',
      description: `AirData provides air quality data from the AQS (Air Quality System)
        database and other data sources allowing download, reporting, graphing and mapping functionalities.`,
    },
    {
      name: 'CASTNET',
      url: 'https://www.epa.gov/castnet',
      description: `The Clean Air Status and Trends Network (CASTNET) is a national air quality monitoring network providing data to assess
        trends in air quality, atmospheric deposition, and ecological effects due to changes in air pollutant emissions.`,
    },
    {
      name: 'eGRID',
      url: 'https://www.epa.gov/egrid',
      description: `The Emissions & Generation Resource Integrated Database (eGRID) is a comprehensive data source on the environmental 
        characteristics of almost all electric power generated in the United States. eGRID contains emissions
        and resource mix data for virtually every power plant and company that generates electricity in the United States.`,
    },
    {
      name: 'Energy Information Administration',
      url: 'https://www.eia.gov/environment/',
      description:
        'Environment Energy-related emissions data & environmental analyses.',
    },
    {
      name: 'National Air Pollution Emissions Trends',
      url: 'https://www.epa.gov/air-trends',
      description:
        'Information and reports about air quality trends for various pollutants.',
    },
    {
      name: 'National Atmospheric Deposition Program',
      url: 'https://nadp.slh.wisc.edu/',
      description:
        'Access data from the national network of precipitation monitoring sites.',
    },
    {
      name: 'National Emissions Inventory',
      url: 'https://www.epa.gov/air-emissions-inventories',
      description: `EPA's National Emission Inventory (NEI) database contains information about sources that emit 
      criteria air pollutants and their precursors, and hazardous air pollutants including estimates of annual air pollutant 
      emissions from point, nonpoint, and mobile sources in the 50 States, the District of Columbia, Puerto Rico, and the Virgin Islands.`,
    },
    {
      name: 'Progress Reports',
      url: 'https://www3.epa.gov/airmarkets/progress/reports/index.html',
      description: `Current and historical EPA reports covering progress under air market programs including the Cross-State Air 
        Pollution Rule, Clean Air Interstate Rule, the Acid Rain Program, and the former NOx Budget Trading Program.`,
    },
    {
      name: 'US Greenhouse Gas Inventory',
      url: 'https://www.epa.gov/ghgemissions',
      description: `EPA prepares a national inventory of United States greenhouse gas emissions each year for submission 
        under the United Nations Framework Convention on Climate Change.`,
    },
  ];

  return (
    <div className="padding-top-2 padding-bottom-5 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">Related Resources</h1>
      <p>
        EPA along with other federal agencies, provide additional data tools and
        resources for related programs that may be helpful to users of (Clean
        Air Markets Division) CAMD's Power Sector emissions, allowance and
        compliance data.
      </p>
      <div className="grid-row">
        {topics.map((topic) => {
          return (
            <div
              className="grid-col-12 desktop:grid-col-4 desktop:padding-right-2 text-base-darkest"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              <h2 className="text-bold font-heading-xl line-height-sans-3 margin-bottom-1">
                {topic.name}
              </h2>
              <p>{topic.description}</p>
              <Link
                variant="external"
                target="_blank"
                rel="noopener noreferrer"
                href={topic.url}
              >
                {topic.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedResources;
