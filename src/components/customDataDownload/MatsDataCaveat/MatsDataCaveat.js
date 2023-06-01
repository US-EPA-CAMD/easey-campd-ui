import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Alert, Link as USWDSLink } from '@trussworks/react-uswds';

import getContent from '../../../utils/api/getContent';
import { connect } from 'react-redux';
import setApiError from '../../../store/actions/setApiErrorAction';

const MatsDataCaveat = ({setApiErrorDispatcher, styling}) => {
  const [matsCaveat, setMatsCaveat] = useState();
  useEffect(() => {
    getContent('/campd/data/custom-data-download/mats-data-caveat.md', setApiErrorDispatcher).then(
      (resp) => resp && setMatsCaveat(resp.data)
    );//eslint-disable-next-line
  }, []);

  return (matsCaveat? 
    <Alert
      className={styling}
      type="warning"
      aria-live="assertive"
      headingLevel="h4"
    >
      <ReactMarkdown
        children={matsCaveat}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <USWDSLink {...props} target="_blank" rel="noopener noreferrer" />
          ),
          p: 'span',
        }}
      />
    </Alert> : null
  );
};

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(MatsDataCaveat);
