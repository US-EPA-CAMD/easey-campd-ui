import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructRequestUrl } from '../selectors/general';
import config from '../../config';
import { axiosWithHeaders } from "./axiosWithHeaders";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const mapSelectionToApiCall = (dataType, dataSubType, filterCriteria, aggregation, setApiError) => {
  const url = constructRequestUrl(dataType, dataSubType, filterCriteria, aggregation);

  return axiosWithHeaders({
    method: "GET",
    url: url.replace(/\r?\n|\r/g, ''),
  }).then(handleResponse).catch((error) => {
    handleError(error)
    if (setApiError) {
      setApiError('dataPreview', true)
    }
  });
};

export default mapSelectionToApiCall;
