import React, { useEffect } from 'react';
import { Accordion, Link } from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';

const FaqsPage = () => {
  useEffect(() => {
    document.title = 'FAQs | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Find answers to some common questions regarding data available in CAMPD.'
  );
  metaAdder(
    'keywords',
    'Frequently asked questions, FAQ, CAMPD, emissions, data update, allowance, compliance, data transparency'
  );

  const topics = [
    {
      name: 'Emissions',
      items: [
        {
          title: 'What time zone is emissions data reported in?',
          id: 'emissions-time-zone',
          expanded: false,
          content: (
            <p>
              Emissions data are reported in the local standard time of each
              particular facility.
            </p>
          ),
        },
        {
          title: 'When is emissions data reported and updated in CAMPD? ',
          id: 'emissions-report-date',
          expanded: false,
          content: (
            <p>
              Emissions data are reported quarterly in April, July, October, and
              January for the preceding 3 months. Submissions are received
              throughout the entire reporting month and will be available the
              following day, after the submission date.
              <br></br>
              <br></br>
              Any resubmission of emissions data outside of a normal reporting
              period is updated the following day.
            </p>
          ),
        },
        {
          title: 'How often are the emissions Bulk Data Files updated?',
          id: 'emissions-bulk-data-files',
          expanded: false,
          content: (
            <p>
              Please find the schedule on the Bulk Data Files page (varies by
              dataset).
            </p>
          ),
        },
        {
          title:
            'Why is the data different in other systems (NEEDs, EIA, eGRID, etc.)?',
          id: 'emissions-data-different',
          expanded: false,
          content: (
            <p>
              Electric utility data are reported to EPA and the Department of
              Energy through several complementary programs, and CAMPD feeds
              some of these other databases Overall, the data may not match
              because the purposes of each database are different.
            </p>
          ),
        },
        {
          title:
            'Why are there blank data fields for gross load, emissions, and heat input?',
          id: 'emissions-blank-fields',
          expanded: false,
          content: <p>This indicates the unit was not operating.</p>,
        },
        {
          title: 'How are emission rates calculated?',
          id: 'emissions-rates',
          expanded: false,
          content: (
            <p>
              The aggregated rate data shown in AMPD (for daily, monthly, etc.
              time periods) are straight averages of the hourly rates – meaning
              that the hourly rates for the time period are added up and then
              divided by the operating hour count for that time period. If
              performing some sort of analysis on the data, we generally
              recommend summing the hourly pollutant mass and heat input values
              for the selected time period and then dividing the resulting total
              pollutant mass value by the total heat input value to calculate
              the aggregated rate value.
            </p>
          ),
        },
        {
          title: 'How do I aggregate gross load data?',
          id: 'emissions-gross-load',
          expanded: false,
          content: (
            <p>
              Hourly gross load is a rate (for example, MW/hr). As such, it
              cannot be summed directly to an aggregated level. Instead, for
              each operating hour the Hourly gross load rate must be multiplied
              by Operating Time for that hour. Then the resulting hourly load
              values are summed to the aggregate level.
            </p>
          ),
        },
        {
          title: 'Can I see Emissions by Fuel Type?',
          id: 'emissions-fuel-type',
          expanded: false,
          content: (
            <p>
              he type of monitoring methods employed at a unit will determine
              whether the hourly fuel type(s) will be reported. Emissions data
              by fuel type is generally not available for units that measure
              their emissions via stack-mounted CEMS (continuous emissions
              monitoring systems), because the CEMS sample the stack gas
              continuously, no matter what fuel is being combusted during an
              operating hour. Emissions data by fuel type may be available for
              units that only combust gaseous or liquid fuels, if the type of
              fuel and quantity are measured and reported each hour using one or
              more fuel flow monitoring systems
            </p>
          ),
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
          content: (
            <p>
              EPA does not supply or collect allowance price data or price
              information on individual trades in the market. Third parties
              provide trade price data which is published via the{' '}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://www3.epa.gov/airmarkets/progress/reports/'}
              >
                EPA web and EPA annual progress
              </Link>{' '}
              reports as a public service in graphical format only. EPA is
              prohibited by agreement with the owners/suppliers of the price
              data from publishing the underlying data sets. The companies
              recognize that the data has value and, therefore, can be sold to
              companies, academics, and researchers. Users interested in this
              data will need to contact the firms in question to contract for
              the data.
            </p>
          ),
        },
        {
          title:
            'Where can I learn more about EPA’s Allowance Trading Markets?',
          id: 'allow-compl-trading-markets',
          expanded: false,
          content: (
            <p>
              Information on allowance trading and the Acid Rain Program auction
              can be found on the Clean Air Markets Division Allowance Markets{' '}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://www.epa.gov/airmarkets/allowance-markets'}
              >
                webpage
              </Link>
              .
            </p>
          ),
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
          content: (
            <p>
              Additional information and tutorials can be found in the Tutorials
              section, including data guides and tool-specific guides.
            </p>
          ),
        },
        {
          title:
            'Where can I learn more information about EPA’s regulatory programs?',
          id: 'general-programs',
          expanded: false,
          content: (
            <p>
              The Clean Air Markets Division website has information on current
              and historical emissions trading{' '}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={'https://www.epa.gov/airmarkets/programs'}
              >
                programs
              </Link>{' '}
              , as well as information on Part 75 emissions{' '}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={
                  'https://www.epa.gov/airmarkets/emissions-monitoring-and-reporting'
                }
              >
                reporting
              </Link>{' '}
              .
            </p>
          ),
        },
        {
          title:
            'My company is automating download of the FTP bulk data files (previously called prepackaged datasets). What credentials do we need to use?',
          id: 'general-credentials',
          expanded: false,
          content: (
            <p>SFTP connections need to use Port 21 with anonymous login.</p>
          ),
        },
      ],
    },
  ];

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">FAQs</h1>
      <p>
        Below are answers to some frequently asked questions regarding data
        available in CAMPD. For more support, reference our{' '}
        <Link href={'/help-support/tutorials'}>Tutorials</Link>, or{' '}
        <Link href={'#'}>submit a help ticket</Link> under Contact Us.
      </p>
      <div className="grid-row">
        {topics.map((topic) => {
          return (
            <div
              className="grid-col-12 text-base-darkest"
              key={`container-${topic.name.replace(/ /g, '-')}`}
            >
              <h2 className="text-bold padding-y-2 font-heading-xl line-height-sans-3 margin-bottom-1">
                {topic.name}
              </h2>
              <Accordion items={topic.items} multiselectable={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqsPage;
