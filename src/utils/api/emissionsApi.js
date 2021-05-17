import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import {constructProgramQuery} from "../selectors/hourlyEmissions";
import config from "../../config";

export async function getHourlyEmissions(hourlyEmissions) {
  const programQuery = constructProgramQuery(hourlyEmissions.program);

  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100
&beginDate=${hourlyEmissions.timePeriod.startDate}&endDate=${hourlyEmissions.timePeriod.endDate}&opHoursOnly=${hourlyEmissions.timePeriod.opHrsOnly}
${programQuery}`;
  console.log(url.replace(/\r?\n|\r/g, ''));

  return axios
    .get(url.replace(/\r?\n|\r/g, ''))
    .then(handleResponse)
    .catch(handleError);
}

export async function getEmissionsPrograms() {
  const url = `${config.services.mdm.uri}/programs?exclude=MATS`;
  console.log(url);
  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}
