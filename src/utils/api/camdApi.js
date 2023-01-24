import axios from "axios";
import config from "../../config";
import { handleError } from "./apiUtils";
import { clientTokenAxios } from "./clientTokenAxios";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getBulkDataFilesList = async () => {
  const url = `${config.services.camd.uri}/bulk-files`;

  try {
    return await axios.get(url, {
      transformRequest: (data, headers) => {
        headers.common = {
          "cache-control": "Public",
          "x-api-key": config.app.apiKey,
        };
        return data;
      }
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};

export const createBookmark = async (content) => {
  const url = `${config.services.camd.uri}/bookmarks`;

  try {
    return await clientTokenAxios({
      method: "POST",
      url: url,
      data: content,
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};

export const getBookmarkData = async (id) => {
  const url = `${config.services.camd.uri}/bookmarks/${id}`;

  try {
    return await axios({
      method: "GET",
      url: url,
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};

export const sendSupportEmail = async (payload) => {
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
