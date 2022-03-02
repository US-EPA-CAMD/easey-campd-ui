import React, { useEffect } from 'react';

import { metaAdder } from '../../utils/document/metaAdder';

const ToolsGalleryPage = () => {
  useEffect(() => {
    document.title = 'Tools Gallery | CAMPD | US EPA';
  }, []);

  metaAdder(
    'description',
    '(TODO)'
  );

  metaAdder(
    'keywords',
    '(TODO)'
  );

  return (
    <div className="grid-container-widescreen">
      <h1 className="font-sans-2xl text-bold">Tools Gallery</h1>
      <p className="font-sans-lg line-height-sans-6">
        CAMPD’s Tools Gallery showcases compliance-related dashboards and maps
        created by users across EPA, making datasets easier to explore and
        encouraging collaboration.
        &nbsp;
        <mark><small>(placeholder text)</small></mark>
      </p>
      <p className="font-sans-sm line-height-sans-5">
        (Placeholder for tools)
      </p>
    </div>
  );
};

export default ToolsGalleryPage;
