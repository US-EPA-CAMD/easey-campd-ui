import axios from "axios";
import { handleError } from "./apiUtils";
import config from "../../config";
import { clientTokenAxios } from "./clientTokenAxios";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const sendNotificationEmail = async (payload) => {
  const url = `${config.services.camd.uri}/support/email`;

  payload["toEmail"] = config.app.email;

  try {
    return await clientTokenAxios({
      method: "POST",
      url: url,
      data: payload,
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};
