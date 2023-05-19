import React, { useEffect, useState } from 'react';
import { Accordion, Link } from '@trussworks/react-uswds';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import formatAccordionTitles from '../../utils/ensure-508/formatAccordionTitles';
import { metaAdder } from '../../utils/document/metaAdder';
import getContent from "../../utils/api/getContent";
import { isInternalUrl } from '../../utils/selectors/general';
import setApiError from '../../store/actions/setApiErrorAction';
import { connect } from 'react-redux';
const FaqsPage = ({setApiErrorDispatcher}) => {

  const [description, setDescription] = useState(null)
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    document.title = 'FAQs | CAMPD | US EPA';
  }, []);
  useEffect(() => {
    getContent('/campd/help-support/faqs/index.md', setApiErrorDispatcher).then((resp) =>
      resp && setDescription(resp.data)
    );
    getContent('/campd/help-support/faqs/topics.json', setApiErrorDispatcher).then((resp) =>
      resp && setTopics(resp.data)
    );
    //eslint-disable-next-line
  }, []);

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
        a: ({ node, ...props }) => (
          <Link {...props}
          target={isInternalUrl(props)? null: '_blank'}
          rel= {isInternalUrl(props)? null: '"noopener noreferrer"'}
          />
        )
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
                  headingLevel: 'h3',
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

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(FaqsPage);
