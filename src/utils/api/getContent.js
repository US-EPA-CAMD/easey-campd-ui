import * as yup from 'yup';

import config from '../../config';
import { handleError, handleResponse } from './apiUtils';
import axios from './axiosSetup';
import { contentValidation } from '../constants/contents'

const getContent = async (path, setApiError) => {
  const url = `${config.services.content.uri}${path}`;

  return axios
    .get(url)
    .then(async res => {
      if (url.endsWith('.json')) {
        if (typeof res.data === 'object' && contentValidation[path]) {
          const schema = Array.isArray(res.data) ? yup.array().of(
            yup.object().shape(contentValidation[path])
          ) : yup.object().shape(contentValidation[path]);
          const isValid = await schema.isValid(res.data);
          if (isValid) {
            return handleResponse(res)
          } else {
            setApiError('contentManager', true)
            throw new Error(path + " Vaildation failed");
          }
        } else {
          setApiError('contentManager', true)
          throw new Error("Vaildation failed");
        }
      }
      return handleResponse(res)
    })
    .catch((error) => {
      handleError(error);
      if (setApiError) {
        setApiError('contentManager', true)
      }
    });
};

export default getContent;
