import React, { useEffect } from 'react';
import { Button, Tag } from '@trussworks/react-uswds';
import { useHistory } from 'react-router-dom';

import { metaAdder } from '../../utils/document/metaAdder';
import './HomePage.scss';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Clean Air Markets Program Data (CAMPD) | US EPA';
  }, []);

  metaAdder(
    'description',
    'CAMPD is your one-stop shop for the emissions, compliance, allowance, and facility attributes data that is gathered under these programs.'
  );
  metaAdder(
    'keywords',
    'Clean air markets program data, EPA, emissions, analysis, data, visualization, allowance, compliance, custom data download, CAM API, bulk data files, CAMPD, AMPD, ECMPS, CAMD, FTP'
  );

  const topics = [
    {
      name: 'Data',
      description: `Create custom queries, download bulk datasets and use the CAM API to retrieve emissions, allowance and compliance data.`,
      img: (
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-data.svg`}
          alt=""
        />
      ),
      url: () => history.push('/data/custom-data-download'),
      link: '/data',
      button: 'Start your data query',
    },
    {
      name: 'Analysis',
      description: `View and download common analyses, reports, insights and other information using CAMPD data.`,
      img: (
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-analysis.svg`}
          alt=""
        />
      ),
      url: null,
      link: '#0',
      button: null,
    },
    {
      name: 'Visualization',
      description: `Visualize and interact with CAMPD data graphically and through maps.`,
      img: (
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon-visualization.svg`}
          alt=""
        />
      ),
      url: null,
      link: '#0',
      button: null,
    },
  ];

  const history = useHistory();
  return (
    <div className="grid-row padding-y-4 mobile-lg:padding-x-2 desktop:padding-x-4 widescreen:padding-x-10">
      {topics.map((topic) => {
        const hasButton = topic.button !== null;
        return (
          <div
            className="padding-y-1 padding-x-1 display-flex flex-row flex-align-start text-base-darkest grid-col-12 desktop:grid-col-4"
            key={`container-${topic.name.replace(/ /g, '-')}`}
          >
            {topic.img}
            <div className="margin-left-2 desktop:margin-left-1">
              <Button
                className="font-heading-xl text-bold margin-y-2"
                unstyled="true"
                onClick={() => history.push(topic.link)}
                style={{ textDecoration: 'none' }}
                key={topic.name}
              >
                {topic.name}
              </Button>
              {hasButton ? null : (
                <div className="margin-top-3">
                  <Tag className="radius-md padding-y-05 font-sans-3xs text-semibold text-ls-2">
                    Coming Soon
                  </Tag>
                </div>
              )}
              <p className="font-sans-sm text-ls-1 line-height-sans-6">
                {topic.description}
              </p>
              {hasButton ? (
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
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
