import React, { useEffect } from 'react';
import { Accordion } from '@trussworks/react-uswds';
import { metaAdder } from '../../utils/document/metaAdder';

export const releases = [
  {
    title: 'Beta 0.1',
    date: 'August 11, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.9',
    date: 'July 26, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.8',
    date: 'June 2, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.7',
    date: 'May 14, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.6',
    date: 'May 1, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.5',
    date: 'April 23, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.4',
    date: 'February 28, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.3',
    date: 'February 3, 2021',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.2',
    date: 'December 20, 2020',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
  {
    title: 'Beta 0.0.1',
    date: 'November 04, 2020',
    features: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus, egit interdum mi consequat',
      'Morbi et fermentum ante. Nunc iaculis ultricies mauris, nec ullamcorper orci blandit quis',
    ],
    bugFixes: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
    upcomingFeatures: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Proin porttitor tellus vel justo faucibus',
      'Egit interdum mi consequat',
      'Morbi et fermentum ante',
      'Nunc iaculis ultricies mauris',
      'Nec ullamcorper orci blandit quis',
      'Nam eros lectus',
    ],
  },
];
const ProductUpdate = ({ release }) => {
  return (
    <div key={release.title}>
      <h3>What's new in {release.title}</h3>
      <p>{release.date}</p>
      <ul>
        {release.features.map((feature, i) => (
          <li key={i + feature}>{feature}</li>
        ))}
      </ul>
      <h3>Bug fixes</h3>
      <ul>
        {release.bugFixes.map((bug, i) => (
          <li key={i + bug}>{bug}</li>
        ))}
      </ul>
      <h3>Upcoming Features</h3>
      <ul>
        {release.upcomingFeatures.map((feature, i) => (
          <li key={i + feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'The Clean Air Markets Program Data (CAMPD) is the data publication warehouse for allowance, compliance, emissions and facility data collected under EPA’s federal market-based trading programs '
  );
  metaAdder(
    'keywords',
    'Clean air markets division, EPA, what is, CAMPD, about, allowance, compliance, emissions, facility, data,  CAM API, releases, updates, versions'
  );

  const latestRelease = releases[0];
  const subTitle =
    'text-bold font-heading-xl line-height-sans-3 margin-bottom-1';
  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <h1 className="font-sans-2xl text-bold">About CAMPD</h1>
      <h2 className={subTitle}>What is CAMPD?</h2>
      <p>
        The Clean Air Markets Program Data (CAMPD) web application is the data
        publication warehouse for allowance, compliance, emissions and
        facility/unit attributes data collected under EPA’s federal market-based
        trading programs: Cross-State Air Pollution Rule (CSAPR), CSAPR Update,
        Revised CSAPR Update, Acid Rain Program (ARP), and other retired
        programs.
      </p>

      <p>
        CAMPD provides current and historical data using REST APIs which are
        directly will be accessible via the Clean Air Markets (CAM) API portal
        in a future release.
      </p>

      <p>
        The Clean Air Markets Division welcomes all feedback, comments and/or
        suggestions via our Contact Page, to ensure we maintain user friendly
        and intuitive products for our diverse community of users.
      </p>

      <p>Stay up to date on CAMPD releases and features below. </p>
      <h2 className={subTitle}>Product updates</h2>
      <ProductUpdate release={latestRelease} />

      <h2 className={subTitle}>Release Notes</h2>
      <div className="grid-row">
        <Accordion
          items={releases.slice(1).map((release, i) => {
            return Object.assign({}, release, {
              title: `${release.title}: ${release.date}`,
              content: <ProductUpdate release={release} />,
              expanded: false,
              id: release + i,
            });
          })}
          multiselectable={true}
        />
      </div>
    </div>
  );
};

export default AboutPage;
