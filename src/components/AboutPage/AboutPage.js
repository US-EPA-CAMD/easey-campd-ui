import React, { useEffect, useState } from 'react';
import { Accordion } from '@trussworks/react-uswds';
import { metaAdder } from '../../utils/document/metaAdder';
import formatAccordionTitles from '../../utils/ensure-508/formatAccordionTitles';
import getContent from '../../utils/api/getContent';
import { connect } from 'react-redux';
import setApiError from '../../store/actions/setApiErrorAction';
import Markdown from '../../components/Markdown/Markdown';

const ProductUpdate = ({ release, latestRelease }) => {
  const showUpcomingFeatures = latestRelease && release.upcomingFeatures;
  return (
    <div key={release.title}>
      {latestRelease && (
        <h3>
          What's new in {release.title} ({release.date})
        </h3>
      )}
      <h4>Features</h4>
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
      {showUpcomingFeatures && (
        <>
          <h4>Upcoming Features</h4>
          <ul>
            {release.upcomingFeatures.map((upcomingFeature, i) => (
              <li key={i + upcomingFeature}>{upcomingFeature}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const AboutPage = ({setApiErrorDispatcher}) => {
  const [releaseNotes, setReleaseNotes] = useState(null);
  const [about, setAbout] = useState('');
  useEffect(() => {
    document.title = 'About CAMPD | CAMPD | US EPA';
  }, []);
  // ***replace h4 tags in accordions with h3 tags for 508
  useEffect(() => {
    formatAccordionTitles(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseNotes]);

  metaAdder(
    'description',
    'The Clean Air Markets Program Data (CAMPD) is the data publication warehouse for allowance, compliance, emissions and facility data collected under EPA’s federal market-based trading programs'
  );
  metaAdder(
    'keywords',
    'Clean air markets division, EPA, what is, CAMPD, about, allowance, compliance, emissions, facility, data,  CAMPD APIs, APIs, releases, updates, versions'
  );

  useEffect(() => {
    getContent('/campd/help-support/about/release-notes.json', setApiErrorDispatcher).then((resp) =>
      resp && setReleaseNotes(resp.data)
    );
    getContent('/campd/help-support/about/index.md', setApiErrorDispatcher).then((resp) =>
      resp && setAbout(resp.data)
    );//eslint-disable-next-line
  }, []);

  const latestRelease = releaseNotes ? releaseNotes[0] : null;
  const subTitle =
    'text-bold font-heading-xl line-height-sans-3 margin-bottom-1';
  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <Markdown>{about}</Markdown>
      {releaseNotes && (
        <>
          <h2 className={subTitle}>Product updates</h2>
          <ProductUpdate release={latestRelease} latestRelease={true} />

          <h2 className={subTitle}>Release Notes</h2>
          <div className="grid-row">
            <Accordion
              items={releaseNotes.slice(1).map((release, i) => {
                return Object.assign({}, release, {
                  title: `${release.title}: ${release.date}`,
                  content: (
                    <ProductUpdate release={release} latestRelease={false} />
                  ),
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

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(AboutPage);
