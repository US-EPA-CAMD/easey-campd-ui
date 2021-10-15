import React, { useState } from 'react';
import { Button, Radio, Fieldset } from '@trussworks/react-uswds';
import axios from 'axios';
import { connect } from 'react-redux';

import { constructRequestUrl } from '../../../utils/selectors/general';
import LoadingModal from '../../LoadingModal/LoadingModal';

const DownloadFileType = ({ dataType, dataSubType, filterCriteria }) => {
  const [fileType, setFileType] = useState('text/csv');
  const [loading, setLoading] = useState(false);

  const onRadioChangeHandler = (event) => {
    if (event.target.id === 'json') {
      setFileType('application/json');
    } else {
      setFileType('text/csv');
    }
  };

  const onDownloadHandler = () => {
    setLoading(true);
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
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: fileType })
          );
          const link = document.createElement('a');
          let fileName = parts[1].replace('filename=', '');
          fileName = fileName.replace(/"/g, '');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm">
      <Fieldset
        legend="Download File"
        legendSrOnly={true}
        className="display-flex flex-row flex-align-self-center"
      >
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
          label="JSON"
        />
      </Fieldset>
      <Button
        type="button"
        className="margin-x-1"
        onClick={() => onDownloadHandler()}
        label="JSON"
      >
        Download
      </Button>
      {loading ? <LoadingModal loading={loading} /> : <></>}
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
