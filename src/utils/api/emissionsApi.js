import axios from 'axios';
import { handleResponse, handleError } from './apiUtils';
import { constructQuery, constructFacilityOrStateQuery } from '../selectors/filterCriteria';
import config from '../../config';

export async function getHourlyEmissions(filterCriteria) {
  const programQuery = constructQuery(filterCriteria.program, 'program');
  const facilityQuery = constructFacilityOrStateQuery(filterCriteria.facility, "orisCode");
  const unitTypeQuery = constructQuery(filterCriteria.unitType, 'unitType');
  const fuelTypeQuery = constructQuery(filterCriteria.fuelType, 'unitFuelType');
  const stateTerritoryQuery = constructFacilityOrStateQuery(filterCriteria.stateTerritory, "state");
  const controlTechnologyQuery = constructQuery(filterCriteria.controlTechnology, 'controlTechnologies');

  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100
&beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}&opHoursOnly=${filterCriteria.timePeriod.opHrsOnly}
${programQuery}${unitTypeQuery}${facilityQuery}${fuelTypeQuery}${stateTerritoryQuery}${controlTechnologyQuery}`;
  console.log(url.replace(/\r?\n|\r/g, ''));

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

