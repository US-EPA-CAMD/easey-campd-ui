import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructRequestUrl } from '../selectors/general';

const mapSelectionToApiCall = (dataType, dataSubType, filterCriteria) => {
  const url = constructRequestUrl(dataType, dataSubType, filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
};

export default mapSelectionToApiCall;
