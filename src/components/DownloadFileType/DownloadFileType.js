import React from 'react';
import { Button, Radio } from '@trussworks/react-uswds';

const DownloadFileType = (props) => {
  return (
    <div
      className="height-10 border-2px radius-lg bg-primary-lighter"
      style={{ borderColor: '#005EA2' }}
    >
      <div className="display-flex flex-row flex-justify flex-align-self-center font-sans-sm">
        <Radio
          id="csv"
          name="input-radio"
          label="CSV"
          color="bg-primary"
          defaultChecked
        />
        <Radio
          className="padding-right-3"
          id="json"
          name="input-radio"
          label="JSON"
        />
        <Button
          type="button"
          className="margin-right-3"
          onClick={props.onClick}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadFileType;
