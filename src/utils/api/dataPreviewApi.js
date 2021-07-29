import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructRequestUrl } from '../selectors/general';

async function getHourlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'hourly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

async function getOzoneEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'ozone season emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

async function getAnnualEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'annual emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

async function getDailyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'daily emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

async function getMonthlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'monthly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

async function getQuarterlyEmissions(filterCriteria) {
  const url = constructRequestUrl('emissions', 'quarterly emissions', filterCriteria);

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}


const mapSelectionToApiCall = (dataType, dataSubType, filterCriteria) => {
  if(dataType==="EMISSIONS"){
    switch (dataSubType) {
      case 'Hourly Emissions':
        return getHourlyEmissions(filterCriteria);
      case 'Daily Emissions':
        return getDailyEmissions(filterCriteria);
      case 'Monthly Emissions':
        return getMonthlyEmissions(filterCriteria);
      case 'Annual Emissions':
        return getAnnualEmissions(filterCriteria);
      case 'Quarterly Emissions':
        return getQuarterlyEmissions(filterCriteria);
      case 'Ozone Season Emissions':
        return getOzoneEmissions(filterCriteria);
      default:
        console.log(`Sorry, ${dataSubType} is not hooked up to API.`);
    }
  }
};
export default mapSelectionToApiCall;
