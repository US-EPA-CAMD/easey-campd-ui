import React, { useEffect, useState } from 'react';
import { Accordion } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { metaAdder } from '../../utils/document/metaAdder';
import formatAccordionTitles from '../../utils/ensure-508/formatAccordionTitles';
import getContent from '../../utils/api/getContent';

const ProductUpdate = ({ release }) => {
  return (
    <div key={release.title}>
      <h4>What's new in {release.title}</h4>
      <p>{release.date}</p>
      <ul>
        {release.features.map((feature, i) => (
          <li key={i + feature}>{feature}</li>
        ))}
      </ul>
      <h4>Bug fixes</h4>
      <ul>
        {release.bugFixes.map((bug, i) => (
          <li key={i + bug}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};

const AboutPage = () => {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [about, setAbout] = useState('');
  useEffect(() => {
    document.title = 'About CAMPD | CAMPD | US EPA';
  }, []);
  // ***replace h4 tags in accordions with h3 tags for 508
  useEffect(() => {
    formatAccordionTitles();//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseNotes]);

  metaAdder(
    'description',
    'The Clean Air Markets Program Data (CAMPD) is the data publication warehouse for allowance, compliance, emissions and facility data collected under EPA’s federal market-based trading programs'
  );
  metaAdder(
    'keywords',
    'Clean air markets division, EPA, what is, CAMPD, about, allowance, compliance, emissions, facility, data,  CAMPD APIs, releases, updates, versions'
  );

  useEffect(() => {
    getContent('/campd/help-support/about/release-notes.json').then((resp) =>
      setReleaseNotes(resp.data)
    );
    getContent('/campd/help-support/about/index.md').then((resp) =>
      setAbout(resp.data)
    );
  }, []);

  const latestRelease = releaseNotes[0];
  const subTitle =
    'text-bold font-heading-xl line-height-sans-3 margin-bottom-1';

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={about}/>
      {releaseNotes.length && (
        <>
          <h2 className={subTitle}>Product updates</h2>
          <ProductUpdate release={latestRelease} />

          <h2 className={subTitle}>Release Notes</h2>
          <div className="grid-row">
            <Accordion
              items={releaseNotes.slice(1).map((release, i) => {
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
        </>
      )}
    </div>
  );
};

export default AboutPage;
