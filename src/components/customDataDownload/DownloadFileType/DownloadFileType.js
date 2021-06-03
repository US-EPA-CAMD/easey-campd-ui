import React, { useState } from 'react';
import { Button, Radio, Label } from '@trussworks/react-uswds';
import axios from 'axios';
import { connect } from 'react-redux';

const DownloadFileType = (appliedFilters) => {
  const [fileType, setFileType] = useState('text/csv');

  const onRadioChange = (event) => {
    if (event.target.id === 'json') {
      setFileType('application/json');
    } else {
      setFileType('text/csv');
    }
  };

  const onDownloadHandler = () => {
    axios
      .get(
        'https://easey-dev.app.cloud.gov/api/emissions-mgmt/apportioned/hourly?page=1&perPage=100&attachFile=true&beginDate=2019-01-01&endDate=2019-01-01&opHoursOnly=true',
        {
          headers: {
            Accept: fileType,
          },
          responseType: 'blob',
        }
      )
      .then((response) => {
        console.log(response);
        const disposition = response.headers['content-disposition'];
        const parts =
          disposition !== undefined ? disposition.split('; ') : undefined;

        if (parts !== undefined && parts[0] === 'attachment') {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', parts[1].replace('filename=', ''));
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="height-10 border-2px radius-lg bg-primary-lighter"
      style={{ borderColor: '#005EA2' }}
    >
      <div className="display-flex flex-row flex-justify flex-align-self-center font-sans-sm">
        <Radio
          id="csv"
          name="input-radio"
          color="bg-primary"
          defaultChecked
          onClick={onRadioChange}
        />
        <Label htmlFor="csv" className="text-bold position-relative top-neg-1">
          CSV
        </Label>
        <Radio id="json" name="input-radio" onClick={onRadioChange} />
        <Label htmlFor="json" className="text-bold position-relative top-neg-1">
          JSON
        </Label>
        <Button
          type="button"
          className="margin-x-3"
          onClick={() => onDownloadHandler()}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

export default connect(mapStateToProps, null)(DownloadFileType);
