import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getHourlyEmissions(appliedFilters) {
  const url = `${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${appliedFilters.timePeriod.startDate}&endDate=${appliedFilters.timePeriod.endDate}&opHoursOnly=${appliedFilters.timePeriod.opHrsOnly}`;
  console.log(url);
  return axios
    .get(url)
    //.get(`${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=2019-01-01&endDate=2019-01-01&opHoursOnly=true`)
    .then(handleResponse)
    .catch(handleError);
}
