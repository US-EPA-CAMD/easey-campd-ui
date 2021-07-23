import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import config from '../../config';

export async function getDataFromMDM(endpoint) {
  const url = `${config.services.mdm.uri}/${endpoint}`;
  console.log(url);
  return axios.get(url).then(handleResponse).catch(handleError);
}

export const getPrograms = (allowanceOnly, showActiveOnly) => {
  if(allowanceOnly){
    if(showActiveOnly){
      return getDataFromMDM('programs?allowanceOnly=true&isActive=true&exclude=MATS');
    }else{
      return getDataFromMDM('programs?allowanceOnly=true&exclude=MATS')
    }
  }else{
    return getDataFromMDM('programs?exclude=MATS');
  }
}
export const getUnitTypes = getDataFromMDM('unit-types');
export const getFuelTypes = getDataFromMDM('fuel-types');
export const getStates = getDataFromMDM('states');
export const getControlTechnologies = getDataFromMDM('control-technologies');
export const getAccountTypes = getDataFromMDM('account-types?exclude=SHOLD|OVERDF');

export async function getAllFacilities() {
  const url = `${config.services.facilities.uri}/facilities`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}
