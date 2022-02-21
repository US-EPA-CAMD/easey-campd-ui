import React, { useEffect, useState } from 'react';
import { Accordion } from '@trussworks/react-uswds';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import formatAccordionTitles from '../../utils/ensure-508/formatAccordionTitles';
import { metaAdder } from '../../utils/document/metaAdder';
import getContent from "../../utils/api/getContent";
const FaqsPage = () => {

  const [description, setDescription] = useState(null)
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    document.title = 'FAQs | CAMPD | US EPA';
  }, []);
  useEffect(() => {
    getContent('/campd/help-support/faqs/index.md').then((resp) =>
      setDescription(resp.data)
    );
    getContent('/campd/help-support/faqs/topics.json').then((resp) =>
      setTopics(resp.data)
    );
    formatAccordionTitles();
  }, []);
  useEffect(() => {
    formatAccordionTitles(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  metaAdder(
    'description',
    'Find answers to some common questions regarding data available in CAMPD.'
  );
  metaAdder(
    'keywords',
    'Frequently asked questions, FAQ, CAMPD, emissions, data update, allowance, compliance, data transparency'
  );

  return (
    <div className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown
      children={description}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="font-sans-2xl text-bold">
            {props.children}
          </h1>
        ),
      }}
      />
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
              <Accordion
              items={topic.items.map((question, i) => {
                const { content, title } = question
                return Object.assign({}, topic, {
                  title: title,
                  content: (
                  <p dangerouslySetInnerHTML={{__html: content}} />
                  ),
                  expanded: false,
                  id: i,
                });
              })}
              multiselectable={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqsPage;