import { Button } from '@trussworks/react-uswds';
import download from 'downloadjs';
import React from 'react';
import config from '../../../config';
import axios from '../../../utils/api/axiosSetup';

const BulkDataFilesDownload = ({ selectedFiles, fileSize, limitReached }) => {
  const onDownloadHandler = () => {
    selectedFiles.selectedRows.forEach((file) => {
      const { filename, s3Path } = file;
      const url = `${config.services.bulkDataFiles.uri}/${s3Path}`;
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

export default BulkDataFilesDownload;
