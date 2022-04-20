import React, { useEffect } from 'react';
import { Button } from '@trussworks/react-uswds';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { metaAdder } from '../../utils/document/metaAdder';
import "./DataLandingPage.scss";


const DataLandingPage = () => {
  useEffect(() => {
    document.title = 'Data | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Custom data download, bulk data files, and CAMPD APIs provide apportioned emissions, monitoring plan, QA, allowance, compliance and facility/unit data.'
  );
  metaAdder(
    'keywords',
    'Clean air markets program data, EPA, emissions, allowance, compliance, custom data download, CAMPD APIs, APIs, bulk data files, CAMPD, CAMD, FTP, AMPD'
  );

  const history = useHistory();

  const topics = [
    {
      name: 'Custom Data Download Tool',
      imgPath: '/images/icons/cdd-icon.svg',
      imgAlt: 'Custom Data Download Tool Icon',
      description: `Users looking to build a custom query for a particular type of data will find this tool flexible, fast, and easy to use. Apportioned emissions, 
      allowance, compliance and facility/unit attributes data are available for filtering and querying to the user’s desired parameters.`,
      url: () => history.push('/data/custom-data-download'),
      button: 'Query Data',
    },
    {
      name: 'Bulk Data Files',
      imgPath: '/images/icons/bdf-icon.svg',
      imgAlt: 'Bulk Data Files Icon',
      description: `Use a simple browser interface to access large, prepackaged datasets of facility submission files (I.e., emissions, monitoring plans, QA), 
      apportioned emissions (including MATS), allowance, compliance, and facility data. Users of the SMOKE modeling tool will find the quarterly apportioned 
      hourly emissions files useful for their analyses.`,
      url: () => history.push('/data/bulk-data-files'),
      button: 'Download Data Files',
    },
    {
      name: 'APIs',
      imgPath: '/images/icons/api-icon.svg',
      imgAlt: 'APIs Icon',
      description: `CAMPD uses web services to display data via an Application Programming Interface (API). An API is a set of commands, functions, protocols, 
      and objects that programmers can use to create software or interact with an external system. An API interprets that data and presents you with the information 
      you wanted in a readable way. These services and associated documentation provide an additional means of accessing CAMPD’s data. `,
      url: () => window.open('https://www.epa.gov/airmarkets/cam-api-portal', '_blank'),
      button: 'Browse CAMPD APIs',
    },
  ];
  return (
    <div id="data-page" className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">Data Access Methods</h1>
      <p>
      The download options below provide data collected from CAMD’s market-based trading programs. Users unfamiliar with the data may want to visit the 
      <Link
        to="/help-support/tutorials"
        title="Tutorials"
        aria-label="Tutorials"
        className="tutorials-link"
      >
        &nbsp; Tutorials &nbsp;
      </Link>
       section under “Help/Support” for more information about the data and associated data guides. 
      </p>
      <>
        {topics.map((topic) => {
          return (
            <div
              className="padding-205 text-base-darkest shadow-3 margin-y-4"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              <div className='display-flex flex-row flex-justify-start margin-bottom-105'>
                <img
                  src={`${process.env.PUBLIC_URL}${topic.imgPath}`}
                  alt={topic.imgAlt}
                />
                <h2 className="text-bold font-heading-xl line-height-sans-3 margin-y-0 padding-left-105">
                {topic.name}
              </h2>
              </div>
              <div className='display-flex grid-row margin-top-05'>
                <p className='margin-y-0 grid-col-12 desktop:grid-col-fill'>
                    {topic.description}
                </p>
                <Button
                  className="link-button flex-align-self-center grid-col-12 desktop:grid-col-2 desktop:margin-left-105 margin-top-105 desktop:margin-top-0"
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
            </div>
          );
        })}

      </>
    </div>
  );
};

export default DataLandingPage;
