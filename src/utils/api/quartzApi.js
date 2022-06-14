import { clientTokenAxios } from "./clientTokenAxios";
import config from "../../config";
import { handleError } from "./apiUtils";

export const getBulkDataFilesList = async () => {
  const url = `${config.services.camd.uri}/bulk-files`;

  try {
    return await clientTokenAxios({
      method: "GET",
      url: url,
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
    return await clientTokenAxios({
      method: "GET",
      url: url,
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};
