import axios from 'axios';
import config from '../../config';
import { handleError, handleResponse } from './apiUtils';

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getBulkDataFilesList = async () => {
  const url = `${config.services.camd.uri}/bulk-files`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export const createBookmark = async (content) => {
  const url = `${config.services.camd.uri}/bookmarks`;

  return axios
    .post(url, content)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export const getBookmarkData = (id) =>{
  const url = `${config.services.camd.uri}/bookmarks/${id}`;

  return axios.get(url)
  .then(handleResponse)
  .catch((error)=>{
    handleError(error);
    throw new Error(error);
  });
} 