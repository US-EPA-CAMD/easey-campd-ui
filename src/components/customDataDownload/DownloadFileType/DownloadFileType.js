import React, { useState } from 'react';
import { Button, Radio, Label } from '@trussworks/react-uswds';
import axios from 'axios';
import { connect } from 'react-redux';
import { constructRequestUrl } from '../../../utils/selectors/general';

const DownloadFileType = ({ dataType, dataSubType, filterCriteria }) => {
  const [fileType, setFileType] = useState('text/csv');

  const onRadioChangeHandler = (event) => {
    if (event.target.id === 'json') {
      setFileType('application/json');
    } else {
      setFileType('text/csv');
    }
  };

  const onDownloadHandler = () => {
    axios
      .get(constructRequestUrl(dataType, dataSubType, filterCriteria, true), {
        headers: {
          Accept: fileType,
        },
        responseType: 'blob',
      })
      .then((response) => {
        const disposition = response.headers['content-disposition'];
        const parts =
          disposition !== undefined ? disposition.split('; ') : undefined;

        if (parts !== undefined && parts[0] === 'attachment') {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          let fileName = parts[1].replace('filename=', '');
          fileName = fileName.replace(/"/g, '');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="height-10 border-2px radius-lg bg-primary-lighter border-primary"
    >
      <div className="display-flex flex-row flex-justify flex-align-self-center font-sans-sm">
        <Radio
          id="csv"
          name="input-radio"
          color="bg-primary"
          defaultChecked
          onClick={onRadioChangeHandler}
        />
        <Label htmlFor="csv" className="text-bold position-relative top-neg-1">
          CSV
        </Label>
        <Radio id="json" name="input-radio" onClick={onRadioChangeHandler} />
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
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

export default connect(mapStateToProps, null)(DownloadFileType);
