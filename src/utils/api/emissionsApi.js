import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructQuery, constructFacilityQuery } from '../selectors/hourlyEmissions';
import config from '../../config';

export async function getHourlyEmissions(hourlyEmissions) {
  const programQuery = constructQuery(hourlyEmissions.program, 'program');
  const facilityQuery = constructFacilityQuery(hourlyEmissions.facility, 'orisCode');
  const unitTypeQuery = constructQuery(hourlyEmissions.unitType, 'unitType');
  const fuelTypeQuery = constructQuery(hourlyEmissions.fuelType, 'fuelType');

  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100
&beginDate=${hourlyEmissions.timePeriod.startDate}&endDate=${hourlyEmissions.timePeriod.endDate}&opHoursOnly=${hourlyEmissions.timePeriod.opHrsOnly}
${programQuery}${unitTypeQuery}${facilityQuery}${fuelTypeQuery}`;
  console.log(url.replace(/\r?\n|\r/g, ''));

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

export async function getEmissionsMDM(endpoint) {
  const url = `${config.services.mdm.uri}/${endpoint}`;
  console.log(url);
  return axios.get(url).then(handleResponse).catch(handleError);
}

export const getEmissionsPrograms = getEmissionsMDM('programs?exclude=MATS');
export const getEmissionsUnitTypes = getEmissionsMDM('unit-types');
export const getEmissionsFuelTypes = getEmissionsMDM('fuel-types');

export async function getAllFacilities() {
  const url = `${config.services.facilities.uri}/facilities`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}
