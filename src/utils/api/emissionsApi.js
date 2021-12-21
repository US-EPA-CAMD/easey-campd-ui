import axios from "axios";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const getSubmissionProgress = async (submissionPeriod) => {
  const url =
    config.services.emissions.uri +
    "/emissions/submission-progress?submissionPeriod=" +
    submissionPeriod;

  return axios.get(url);
};

export default getSubmissionProgress;
