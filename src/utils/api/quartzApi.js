import { clientTokenAxios } from "./clientTokenAxios";
import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";

export const getBulkDataFilesList = async () => {
  const url = `${config.services.camd.uri}/bulk-files`;

  return (await clientTokenAxios())
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export const createBookmark = async (content) => {
  const url = `${config.services.camd.uri}/bookmarks`;

  return (await clientTokenAxios())
    .post(url, content)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export const getBookmarkData = async (id) => {
  const url = `${config.services.camd.uri}/bookmarks/${id}`;

  return (await clientTokenAxios())
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};
