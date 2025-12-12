import config from "../../config";
import { handleError } from "./apiUtils";
import { axiosWithHeaders } from "./axiosWithHeaders";

export const authApiStatus = async () => {
  const url = `${config.services.auth.uri}/authentication/login-state`;

  try {
    return await axiosWithHeaders({
      method: "GET",
      url: url,
    });
  } catch (err) {
    handleError(err);
  }
};

