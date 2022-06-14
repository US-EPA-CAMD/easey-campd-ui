import axios from "axios";
import config from "../../config";
import { refreshClientToken } from "./authApi";

export const clientTokenAxios = async () => {
  axios.defaults.headers.common = {
    "x-api-key": config.app.apiKey,
    "x-client-id": config.app.clientId,
  };

  if (sessionStorage.getItem("client_token")) {
    if (
      Date.now() > new Date(sessionStorage.getItem("client_token_expiration"))
    ) {
      await refreshClientToken();
    }
  } else {
    await refreshClientToken();
  }

  axios.defaults.headers.authorization = `Bearer ${sessionStorage.getItem(
    "client_token"
  )}`;

  return axios;
};
