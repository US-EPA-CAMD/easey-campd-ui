import { Button } from '@trussworks/react-uswds';
import download from 'downloadjs';
import React, { useEffect, useState } from 'react';
 import { connect } from 'react-redux';
import config from '../../../config';
import setApiError from '../../../store/actions/setApiErrorAction';
import axios from '../../../utils/api/axiosSetup';
import useTimeout from '../../../utils/hooks/useTimeout';
import RenderSpinner from '../../RenderSpinner/RenderSpinner';

const BulkDataFilesDownload = ({ selectedFiles, fileSize, limitReached, setApiErrorDispatcher }) => {

  const [initDownload, setInitDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinnerDelay, setSpinnerDelay] = useState(null);
  // const [spinnerDelayHasElapsed, setSpinnerDelayHasElapsed] = useState(false);
  const { 1: setSpinnerDelayHasElapsed }= useState(false);
  useTimeout(() => {setSpinnerDelayHasElapsed(true)}, spinnerDelay);

  //clears timer for spinner delay
  useEffect(() => () => setSpinnerDelay(null), []);

  const onDownloadHandler = () => {
    selectedFiles.selectedRows.forEach((file) => {
      const { filename, s3Path } = file;
      const url = `${config.services.bulkFiles.uri}/${s3Path}`;
      const fileType = filename.split('.')[1];
      //stores updated value for SpinnerDelayHasElapsed state
      let updatedSpinnerDelayHasElapsed;
      setSpinnerDelayHasElapsed((state) => {
        updatedSpinnerDelayHasElapsed = state;
        return state;
      })
      setLoading((state) => {
        if (updatedSpinnerDelayHasElapsed){
          return true;
        }
        return state
      })
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
        })
        .finally(()=>{
          setLoading((state) => {
            if (state){
              return false;
            }
            return state
          })
        });
    });
    setSpinnerDelay(null);
    setSpinnerDelayHasElapsed(false);
  };
  
  useEffect(() => {
    if (initDownload){
      setSpinnerDelay(1000);
      onDownloadHandler();
      setInitDownload(false);
    }// eslint-disable-next-line
  }, [initDownload])

  return (
    <div 
      aria-live="assertive"
      className="download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm margin-top-2 padding-x-2"
      id="bdfDownload"
      >
      <RenderSpinner showSpinner={loading}/>
      <div className="grid-col flex-1">
        Files selected: {selectedFiles?.selectedCount || ''}
      </div>
      <div className="grid-col flex-1">Size: {fileSize || ''}</div>
      <Button
        type="button"
        className="flex-end margin-x-1"
        onClick={() => setInitDownload(true)}
        disabled={!selectedFiles?.selectedCount || limitReached}
      >
        Download
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage))});

export default connect(null, mapDispatchToProps)(BulkDataFilesDownload);
