import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as USWDSLink } from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';
import getContent from '../../utils/api/getContent';

import './TutorialsPage.scss';
import { isInternalUrl } from '../../utils/selectors/general';


const TutorialsPage = () => {
  const [mainContent, setMainContent] = useState();

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

  useEffect(() => {
    getContent('/campd/help-support/tutorials/index.md').then((resp) =>
      setMainContent(resp.data)
    );
  }, []);

  return (
    <div className="tutorials-wrapper padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown
        className="main-content"
        children={mainContent}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <USWDSLink {...props}
            target={isInternalUrl(props)? null: "_blank"}
            rel={isInternalUrl(props)? null: "noopener noreferrer"} />
          ),
        }}
      />
    </div>
  );
};

export default TutorialsPage;
