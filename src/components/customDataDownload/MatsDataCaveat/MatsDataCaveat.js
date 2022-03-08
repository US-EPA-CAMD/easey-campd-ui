import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Alert, Link as USWDSLink } from '@trussworks/react-uswds';

import getContent from '../../../utils/api/getContent';

const MatsDataCaveat = () => {
  const [matsCaveat, setMatsCaveat] = useState();
  useEffect(() => {
    getContent('/campd/data/custom-data-download/mats-data-caveat.md').then(
      (resp) => setMatsCaveat(resp.data)
    );
  }, []);

  return (
    <Alert
      className="alert-wrapper usa-alert--slim font-sans-3xs desktop:line-height-sans-2"
      type="warning"
      aria-live="assertive"
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
    </Alert>
  );
};

export default MatsDataCaveat;
