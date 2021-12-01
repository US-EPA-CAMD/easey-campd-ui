import React, { useEffect } from 'react';
import { Link } from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';

const TutorialsPage = () => {
  useEffect(() => {
    document.title = 'Tutorials | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Learn more about the data and data access methods available in CAMPD using the quick start guide and the data guides.'
  );
  metaAdder(
    'keywords',
    'CAMPD, emissions, allowance, compliance, apportionment, substitute data, EIA data cross walk, tutorials, guides'
  );

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
  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">Tutorials</h1>
      <p>
        Learn more about the data and data access methods available in CAMPD
        using the guides below.
      </p>
      <p>
        If a guide does not provide the solution you need, reference the{' '}
        <Link href={'/help-support/faqs'}>FAQs</Link>{' '}
        and/or the <Link href={'/help-support/contact-us'}>Contact Us</Link> pages.
      </p>
      <div className="grid-row">
        {topics.map((topic) => {
          return (
            <div
              className="grid-col-12 text-base-darkest"
              key={`container-${topic.title.replace(/ /g, '-')}`}
            >
              <h2 className="text-bold font-heading-xl line-height-sans-3 margin-bottom-1">
                {topic.title}:
              </h2>
              {topic.items.map((item) => {
                return (
                  <div>
                    <p>
                      <Link
                        className="text-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.url}
                      >
                        {item.name}
                      </Link>
                      : {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialsPage;
