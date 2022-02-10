import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const sendNotificationEmail = async (payload) => {
  let url = `${config.services.notifications.uri}`;
  url = `${url}/email`;

  payload["toEmail"] = config.app.email;

  return axios
    .post(url, payload)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};
