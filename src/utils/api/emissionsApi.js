import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getHourlyEmissions(hourlyEmissions) {
  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${hourlyEmissions.timePeriod.startDate}&endDate=${hourlyEmissions.timePeriod.endDate}&opHoursOnly=${hourlyEmissions.timePeriod.opHrsOnly}`;
  console.log(url);
  return axios
    .get(url)
    //.get(`${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=2019-01-01&endDate=2019-01-01&opHoursOnly=true`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getEmissionsPrograms() {
  const url = `${config.services.mdm.uri}/programs`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}