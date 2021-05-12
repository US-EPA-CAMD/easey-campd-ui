import React from 'react';
import { Button, Radio } from '@trussworks/react-uswds';

const DownloadFileType = (props) => {
  return (
    <div className="display-flex flex-row flex-justify height-10 width-card font-sans-sm border-2px radius-md border-primary-dark bg-primary-lighter" >
        <Radio label="CSV"/>
    </div>
  );
};

export default DownloadFileType;
