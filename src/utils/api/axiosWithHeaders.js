import axios from "axios";
import config from "../../config";

export const axiosWithHeaders = async (options) => {
  options.headers = {
    ...options.headers,
    "x-api-key": config.app.apiKey,
    "x-app-identifier": config.app.appIdentifier,
  };

  return axios(options);
};
