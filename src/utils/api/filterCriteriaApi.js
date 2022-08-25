import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import {getPipeDelimitedYears} from "../selectors/filterCriteria";
import config from '../../config';

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export async function getDataFromMDM(endpoint) {
  const url = `${config.services.mdm.uri}/${endpoint}`;
  console.log(url);
  return axios.get(url).then(handleResponse).catch(handleError);
}

export const getPrograms = (dataType, showActiveOnly) => {
  if (showActiveOnly) {
    return getDataFromMDM("programs?allowanceUIFilter=true&isActive=true");
  } else if (dataType === "EMISSIONS") {
    return getDataFromMDM("programs?emissionsUIFilter=true");
  } else if (dataType === "ALLOWANCE") {
    return getDataFromMDM("programs?allowanceUIFilter=true");
  } else if (dataType === "COMPLIANCE") {
    return getDataFromMDM("programs?complianceUIFilter=true");
  } else {
    return getDataFromMDM("programs?exclude=MATS");
  }
};
export const getUnitTypes = getDataFromMDM('unit-types');
export const getFuelTypes = getDataFromMDM('fuel-types');
export const getStates = getDataFromMDM('states');
export const getControlTechnologies = getDataFromMDM('control-technologies');
export const getAccountTypes = getDataFromMDM('account-types?exclude=SHOLD|OVERDF');
export const getTransactionTypes = getDataFromMDM('transaction-types');
export const getSourceCategories = getDataFromMDM('source-categories');

export async function getAllFacilities() {
  const url = `${config.services.facilities.uri}/facilities`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}

export async function getDataFromAccounts(endpoint) {
  const url = `${config.services.account.uri}/${endpoint}`;
  console.log(url);
  return axios.get(url).then(handleResponse).catch(handleError);
}

export function getAllAccounts() {
  return getDataFromAccounts("accounts");
}

export function getOwnerOperators(dataSubType) {
  if(dataSubType === "Holdings"){
    return getDataFromAccounts("allowance-holdings/owner-operators");
  }else if(dataSubType === "Transactions"){
    return getDataFromAccounts("allowance-transactions/owner-operators");
  }else if(dataSubType === "Emissions Based"){
    return getDataFromAccounts("emissions-compliance/owner-operators");
  }else if(dataSubType === "Allowance Based"){
    return getDataFromAccounts("allowance-compliance/owner-operators");
  }else if(dataSubType === "Account Information"){
    return getDataFromAccounts("accounts/owner-operators");
  }
}

export async function getFilterMapping(dataType, dataSubType, yearSet=[]) {
  let url;
  if(dataType === "EMISSIONS"){
    url = `${config.services.emissions.uri}/emissions/apportioned/attributes/applicable?year=${getPipeDelimitedYears(yearSet)}`
  }else if (dataType === "FACILITY"){
    url = `${config.services.facilities.uri}/facilities/attributes/applicable?year=${getPipeDelimitedYears(yearSet)}`;
  }else if(dataType === "MERCURY AND AIR TOXICS EMISSIONS"){
    url = `${config.services.emissions.uri}/emissions/apportioned/mats/attributes/applicable?year=${getPipeDelimitedYears(yearSet)}`
  }else if(dataType === "ALLOWANCE"){
    if(dataSubType === "Holdings"){
      url = `${config.services.account.uri}/allowance-holdings/attributes/applicable`;
    }else if(dataSubType === "Account Information"){
      url = `${config.services.account.uri}/accounts/attributes/applicable`;
    }else if(dataSubType === "Transactions"){
      url = `${config.services.account.uri}/allowance-transactions/attributes/applicable?transactionBeginDate=${yearSet[0]}&transactionEndDate=${yearSet[1]}`;
    }
  }else if(dataType === "COMPLIANCE"){
    if(dataSubType === "Allowance Based"){
      url = `${config.services.account.uri}/allowance-compliance/attributes/applicable`;
    }else if(dataSubType === "Emissions Based"){
      url = `${config.services.account.uri}/emissions-compliance/attributes/applicable`;
    }
  }
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}
