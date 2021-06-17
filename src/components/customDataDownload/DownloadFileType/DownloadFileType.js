import React, { useState } from 'react';
import { Button, Radio, Label , Fieldset} from '@trussworks/react-uswds';
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
      className="height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm"
    >
      <Fieldset legend="Download File" legendSrOnly={true} className="display-flex flex-row flex-align-self-center">
        <Radio
          id="csv"
          name="input-radio"
          color="bg-primary"
          className="margin-x-1 margin-bottom-1"
          defaultChecked
          onClick={onRadioChangeHandler}
          label="CSV"
        />
        <Radio
          id="json"
          name="input-radio"
          color="bg-primary"
          className="margin-x-1 margin-bottom-1"
          onClick={onRadioChangeHandler}
          label="JSON" />
      </Fieldset>
      <Button
        type="button"
        className="margin-x-1"
        onClick={() => onDownloadHandler()}
        label="JSON"
      >
        Download
      </Button>
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
