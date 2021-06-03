import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructRequestUrl } from '../selectors/general';

export async function getHourlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'hourly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

