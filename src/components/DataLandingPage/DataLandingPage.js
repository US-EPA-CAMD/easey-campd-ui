import React, { useEffect } from 'react';
import { Button } from '@trussworks/react-uswds';
import { useHistory } from 'react-router-dom';

import { metaAdder } from '../../utils/document/metaAdder';


const DataLandingPage = () => {
  useEffect(() => {
    document.title = 'Data | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Custom data download, bulk data files, and CAM API provide apportioned emissions, monitoring plan, QA, allowance, compliance and facility/unit data.'
  );
  metaAdder(
    'keywords',
    'Clean air markets program data, EPA, emissions, allowance, compliance, custom data download, CAM API, bulk data files, CAMPD, CAMD, FTP, AMPD'
  );

  const history = useHistory();

  const topics = [
    {
      name: 'Custom Data Download Tool',
      description: `Users looking to build a custom query for a particular data type will find this tool flexible, fast, and easy to use. Apportioned emissions,
      allowance, compliance and facility/unit attributes data are available for filtering and querying to the user’s desired parameters.`,
      url: () => history.push('/data/custom-data-download'),
      button: 'Start your data query',
    },
    {
      name: 'Bulk Data Files',
      description: `For larger data downloads, bulk data files provide access to prepackaged datasets of apportioned emissions (including MATS), raw emissions, 
      monitoring plans, QA, allowance, and compliance data thru EPA’s FTP site. Additionally, modelers who use SMOKE data will find their annual datasets here.`,
      url: () => history.push('/data/bulk-data-files'),
      button: 'Start browsing datasets',
    },
    {
      name: 'CAM API',
      description: `CAMPD uses web services to display data via an Application Programming Interface (API). An API is a set of commands, functions, protocols, 
      and objects that programmers can use to create software or interact with an external system. An API interprets that data and presents 
      you with the information you wanted in a readable way. These services and associated documentation provide an additional means of accessing CAMPD’s data.`,
      url: () => null,
      button: 'Learn more about CAM API',
    },
  ];
  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">Data</h1>
      <p className="font-sans-lg line-height-sans-6">
        CAMPD’s Data section serves all your bulk and custom data download
        needs.
      </p>
      <p>
        Three download methods provide apportioned emissions, raw emissions,
        monitoring plan, QA, allowance, compliance and facility/unit data
        collected from CAMD’s market-based trading programs. Users unfamiliar
        with the data may want to visit the “Tutorials” section under “Help” for
        more information about the data as well has how to use the tools below.
      </p>
      <div className="grid-row">
        {topics.map((topic) => {
          return (
            <div
              className="padding-y-2 grid-col-12 desktop:grid-col-4 desktop:padding-right-3 text-base-darkest"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              {' '}
              <h2 className="text-bold font-heading-xl line-height-sans-3 margin-bottom-1">
                {topic.name}{' '}
              </h2>
              <div>{topic.description}</div>
              <Button
                className="margin-top-1"
                type="button"
                onClick={topic.url}
                role="link"
                rel={topic.name}
                title={`Go to ${topic.name} page`}
                key={topic.url}
                id={`${topic.name.split(' ').join('')}`}
              >
                {topic.button}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataLandingPage;
