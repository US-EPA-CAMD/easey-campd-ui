import React, { useEffect, useState } from 'react';
import { Link, Tag } from '@trussworks/react-uswds';
import getContent from '../../utils/api/getContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { metaAdder } from '../../utils/document/metaAdder';

const RelatedResources = () => {

  const [contentIntro, setContentIntro] = useState(null);
  const [additionalDataTools, setAdditionalDataTools] = useState([]);

  useEffect(() => {
    document.title = 'Related Resources | CAMPD | US EPA';
    getContent('/campd/resources/related-resources/additional-data-tools.json').then((resp) => setAdditionalDataTools(resp.data));
    getContent('/campd/resources/related-resources/index.md').then((resp) => setContentIntro(resp.data));
  }, []);

  metaAdder(
    'description',
    'Resources relevant to Clean Air Markets Program Data (CAMPD)'
  );
  metaAdder(
    'keywords',
    'Air data, Castnet, eGrid, Energy Information Administration, National Air Pollution Emissions Trends, National Emissions Inventory, Progress report, US Greenhouse Gas Inventory'
  );

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        children={contentIntro}
        components={{
          h1: ({node, ...props}) => <h1 className="font-sans-2xl text-bold">{props.children}</h1>
        }}
      />
      <div className="grid-row">
        {additionalDataTools.map((tool) => {
          return (
            <div
              className="grid-col-12 desktop:grid-col-4 desktop:padding-right-2 text-base-darkest"
              key={`container-${tool.name.replace(/ /g, '-')}`}
            >
              <h2 className="text-bold font-heading-xl line-height-sans-3 margin-bottom-1">
                {tool.name}
              </h2>
              <p>{tool.description}</p>
              <Link
                variant={tool.hasOwnProperty('externalSite') ? '' : 'external'}
                target="_blank"
                rel="noopener noreferrer"
                href={tool.url}
              >
                {tool.name}
                {tool.hasOwnProperty('externalSite') && (
                  <Tag
                    className="radius-md padding-y-05 margin-left-1 font-sans-3xs text-semibold text-ls-2"
                    aria-label={`The ${tool.name} link is to a website outside of the government domain`}
                  >
                    EXIT
                  </Tag>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedResources;
