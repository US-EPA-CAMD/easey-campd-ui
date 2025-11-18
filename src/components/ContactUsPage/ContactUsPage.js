import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as USWDSLink } from '@trussworks/react-uswds';

import { metaAdder } from '../../utils/document/metaAdder';
import getContent from '../../utils/api/getContent';

import './ContactUsPage.scss';
import { connect } from 'react-redux';
import setApiError from '../../store/actions/setApiErrorAction';

const ContactUsPage = ({setApiErrorDispatcher}) => {
  const [mainContent, setMainContent] = useState();

  useEffect(() => {
    document.title = 'Contact Us | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    'Contact the Clean Air Markets Division for support with CAMPD'
  );
  metaAdder('keywords', 'CAMPD, CAMD, help, contact, support');

  useEffect(() => {
    getContent('/campd/help-support/contact-us/index.md', setApiErrorDispatcher).then((resp) =>
    resp && setMainContent(resp.data)
    );
  }, [setApiErrorDispatcher]);

  return (
    <div className="contact-us-wrapper padding-y-2 mobile-lg:padding-x-2 tablet:padding-x-4 widescreen:padding-x-10 font-sans-sm text-base-darkest text-ls-1 line-height-sans-5">
      <ReactMarkdown
        children={mainContent}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage)),
  };
};

export default connect(null, mapDispatchToProps)(ContactUsPage);
