import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructRequestUrl } from '../selectors/general';

const mapSelectionToApiCall = (dataType, dataSubType, filterCriteria) => {
  const notFound = `Sorry, ${dataSubType} is not hooked up to API.`;
  let url;

  if (dataType === 'EMISSIONS') {
    switch (dataSubType) {
      case 'Hourly Emissions':
        url = constructRequestUrl('emissions', 'hourly emissions', filterCriteria);
        break;
      case 'Daily Emissions':
        url = constructRequestUrl('emissions', 'daily emissions', filterCriteria);
        break;
      case 'Monthly Emissions':
        url = constructRequestUrl('emissions', 'monthly emissions', filterCriteria);
        break;
      case 'Quarterly Emissions':
        url = constructRequestUrl('emissions', 'quarterly emissions', filterCriteria);
        break;
      case 'Annual Emissions':
        url = constructRequestUrl('emissions', 'annual emissions', filterCriteria);
        break;
      case 'Ozone Season Emissions':
        url = constructRequestUrl('emissions', 'ozone season emissions', filterCriteria);
        break;
      default:
        console.log(notFound);
    }
  } else if (dataType === 'ALLOWANCE') {
    switch (dataSubType) {
      case 'Holdings':
        url = constructRequestUrl('allowance', 'holdings', filterCriteria);
        break;
      case 'Transactions':
        url = constructRequestUrl('allowance', 'transactions', filterCriteria);
        break;
      case 'Account Information':
        url = 'placeholder';
        break;
      default:
        console.log(notFound);
    }
  } else if (dataType === 'COMPLIANCE') {
    switch (dataSubType) {
      case 'Allowance Based':
        url = constructRequestUrl('compliance', 'allowance based', filterCriteria);
        break;
      case 'Emissions Based':
        url = 'placeholder';
        break;
      default:
        console.log(notFound);
    }
  }

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
};

export default mapSelectionToApiCall;
