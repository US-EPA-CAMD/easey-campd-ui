import config from "../../config";
import axios from "axios";
import { handleError } from "./apiUtils";

export const refreshClientToken = async () => {
  const url = `${config.services.auth.uri}/tokens/client`;

  try {
    const response = await axios.post(
      url,
      { clientId: config.app.clientId, clientSecret: config.app.clientSecret },
      { headers: { "x-api-key": config.app.apiKey } }
    );

    sessionStorage.setItem("client_token", response.data.token);
    sessionStorage.setItem("client_token_expiration", response.data.expiration);
  } catch (err) {
    handleError(err);
  }
};
