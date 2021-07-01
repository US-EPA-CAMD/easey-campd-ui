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

export async function getMonthlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'monthly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

export async function getQuarterlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'quarterly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}