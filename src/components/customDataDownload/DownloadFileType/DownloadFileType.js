import React, { useState } from 'react';
import { Button, Radio, Fieldset } from '@trussworks/react-uswds';
import axios from 'axios';
import download from "downloadjs";
import { connect } from 'react-redux';
import config from '../../../config';

import { constructRequestUrl } from '../../../utils/selectors/general';
import RenderSpinner from '../../RenderSpinner/RenderSpinner';
import "./DownloadFileType.scss";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey
};

const DownloadFileType = ({ aggregation, dataType, dataSubType, filterCriteria, totalCount}) => {
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
      .get(constructRequestUrl(dataType, dataSubType, filterCriteria, aggregation, true), {
        headers: {
          Accept: fileType,
        },
        responseType: 'blob',
      })
      .then((response) => {
        const disposition = response.headers['content-disposition'];
        const parts = disposition !== undefined ? disposition.split('; ') : undefined;

        if (parts !== undefined && parts[0] === 'attachment') {
          let fileName = parts[1].replace('filename=', '');
          fileName = fileName.replace(/"/g, '');
          download(response.data, fileName);  
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm maxw-mobile">
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
        disabled={totalCount !== null && Number(totalCount) > Number(config.app.streamingLimit)}
        label="JSON"
      >
        Download
      </Button>
      {loading ? <RenderSpinner showSpinner={loading} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    aggregation: state.customDataDownload.aggregation,
    filterCriteria: state.filterCriteria,
    totalCount: state.customDataDownload.totalCount,
  };
};

export default connect(mapStateToProps, null)(DownloadFileType);
