import React from 'react';
import { Button, Radio } from '@trussworks/react-uswds';

const DownloadFileType = (props) => {
  return (
    <div
      className="height-10 border-2px radius-md bg-primary-lighter"
      style={{ borderColor: '#005EA2' }}
    >
      <div className="display-flex flex-row flex-justify flex-align-self-center padding-y-2 padding-x-3 font-sans-sm">
        <Radio
          className="padding-right-2"
          id="csv"
          name="'input-radio'"
          label="CSV"
        />
        <Radio
          className="padding-x-2"
          id="json"
          name="'input-radio'"
          label="JSON"
        />
        <Button
          type="button"
          className="margin-right-0"
          onClick={props.onClick}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadFileType;
