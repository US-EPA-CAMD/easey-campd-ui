import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructQuery, constructFacilityOrStateQuery } from '../selectors/hourlyEmissions';
import config from '../../config';

export async function getHourlyEmissions(hourlyEmissions) {
  const programQuery = constructQuery(hourlyEmissions.program, 'program');
  const facilityQuery = constructFacilityOrStateQuery(hourlyEmissions.facility, "orisCode");
  const unitTypeQuery = constructQuery(hourlyEmissions.unitType, 'unitType');
  const fuelTypeQuery = constructQuery(hourlyEmissions.fuelType, 'unitFuelType');
  const stateTerritoryQuery = constructFacilityOrStateQuery(hourlyEmissions.stateTerritory, "state");
  const controlTechnologyQuery = constructQuery(hourlyEmissions.controlTechnology, 'controlTechnologies');

  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100
&beginDate=${hourlyEmissions.timePeriod.startDate}&endDate=${hourlyEmissions.timePeriod.endDate}&opHoursOnly=${hourlyEmissions.timePeriod.opHrsOnly}
${programQuery}${unitTypeQuery}${facilityQuery}${fuelTypeQuery}${stateTerritoryQuery}${controlTechnologyQuery}`;
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
export const getEmissionsStates = getEmissionsMDM('states');
export const getEmissionsControlTechnologies = getEmissionsMDM('control-technologies');

export async function getAllFacilities() {
  const url = `${config.services.facilities.uri}/facilities`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}
