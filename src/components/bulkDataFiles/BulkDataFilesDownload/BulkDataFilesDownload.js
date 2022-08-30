import { Button } from '@trussworks/react-uswds';
import download from 'downloadjs';
import React from 'react';
import { connect } from 'react-redux';
import config from '../../../config';
import setApiError from '../../../store/actions/setApiErrorAction';
import axios from '../../../utils/api/axiosSetup';

const BulkDataFilesDownload = ({ selectedFiles, fileSize, limitReached, setApiErrorDispatcher }) => {
  const onDownloadHandler = () => {
    selectedFiles.selectedRows.forEach((file) => {
      const { filename, s3Path } = file;
      const url = `${config.services.bulkFiles.uri}/${s3Path}`;
      const fileType = filename.split('.')[1];
      axios
        .get(url, {
          headers: {
            Accept: fileType,
          },
          responseType: 'blob',
        })
        .then((response) => {
          download(response.data, filename, fileType);
        })
        .catch((error) => {
          setApiErrorDispatcher('s3Outage', true)
          console.log(error);
        });
    });
  };

  return (
    <div 
      aria-live="assertive"
      className="download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm margin-top-2 padding-x-2">
      <div className="grid-col flex-1">
        Files selected: {selectedFiles?.selectedCount || ''}
      </div>
      <div className="grid-col flex-1">Size: {fileSize || ''}</div>
      <Button
        type="button"
        className="flex-end margin-x-1"
        onClick={() => onDownloadHandler()}
        disabled={!selectedFiles?.selectedCount || limitReached}
      >
        Download
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(BulkDataFilesDownload);
