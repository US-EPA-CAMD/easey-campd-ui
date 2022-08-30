import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@trussworks/react-uswds';

import getContent from '../../utils/api/getContent';
import { metaAdder } from '../../utils/document/metaAdder';
import './GlossaryPage.scss';
import setApiError from '../../store/actions/setApiErrorAction';
import { connect } from 'react-redux';

const GlossaryPage = ({setApiErrorDispatcher}) => {
  const [mainContent, setMainContent] = useState(null);

  useEffect(() => {
    getContent('/campd/resources/glossary/index.md', setApiErrorDispatcher).then((resp) =>
      resp && setMainContent(resp.data)
    );
    document.title = 'Glossary | CAMPD | US EPA';//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  metaAdder(
    'description',
    'The glossary provides a list of all data elements available through CAMPD.'
  );
  metaAdder(
    'keywords',
    'Dictionary, data label, CAMPD APIs, JSON, glossary, excel file, column headings, definitions'
  );

  return (
    <div
      id="glossary-page"
      className="padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5"
    >
      <ReactMarkdown
        className="main-content margin-bottom-5"
        children={mainContent}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => {
            return (
              <Button
                className="display-block margin-y-3"
                type="button"
                onClick={() => window.open(props.href)}
                role="link"
                target="_blank"
                rel="noopener noreferrer"
                title={props.children[0]}
              >
                {props.children[0]}
              </Button>
            );
          },
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(GlossaryPage);
