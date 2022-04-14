import axios from "axios";
import { handleError, handleResponse } from "../../utils/api/apiUtils";
const getContent = async (path) => {
  const url = `https://campd-041322.s3.us-east-1.amazonaws.com/dev${path}`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};

export default getContent;
