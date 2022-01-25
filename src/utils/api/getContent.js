import axios from 'axios';
import config from '../../config';
import { handleError, handleResponse } from './apiUtils';
const getContent = async (path) => {
  const url = `${config.services.content.uri}${path}`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export default getContent;
