import { Button } from '@trussworks/react-uswds';
import React from 'react';
import config from '../../../config';
import { downloadFile, downloadFileByLocationReplace } from './downloadFile';
import { detectBrowser } from '../../../utils/detectBrowser/detectBrowser';


const BulkDataFilesDownload = ({ selectedFiles, fileSize, limitReached }) => {
  const sleep = (ms)=> new Promise((res)=>setTimeout(res,ms));

  const onDownloadHandler = async() => {
    const browser = detectBrowser();
    for( let i = 0; i < selectedFiles.selectedRows?.length; i++) {
       const { s3Path } = selectedFiles.selectedRows[i];
       const url = `${config.services.bulkFiles.uri}/${s3Path}`;
       if (browser === 'Safari'|| browser === 'Firefox') {
        downloadFileByLocationReplace(url);
       } else {
        downloadFile(url)
       }

       await sleep(browser === 'Safari'|| browser === 'Firefox'? 500 : 0);
    }
  };

  return (
    <div
      aria-live="assertive"
      className="download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm margin-top-2 padding-x-2"
      id="bdfDownload"
    >
      <div className="grid-col flex-1">
        Files selected: {selectedFiles?.selectedCount || ''}
      </div>
      <div className="grid-col flex-1">Size: {fileSize || ''}</div>
      <Button
        type="button"
        className="flex-end margin-x-1"
        onClick={onDownloadHandler}
        disabled={!selectedFiles?.selectedCount || limitReached}
      >
        Download
      </Button>
    </div>
  );
};

export default BulkDataFilesDownload;
