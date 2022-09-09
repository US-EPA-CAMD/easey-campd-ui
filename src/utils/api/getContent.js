import axios from 'axios';
import config from '../../config';
import { handleError, handleResponse } from './apiUtils';

const getContent = async (path, setApiError) => {
  const url = `${config.services.content.uri}${path}2`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      if(setApiError){
        setApiError('contentManager', true)
      }
    });
};

export default getContent;
