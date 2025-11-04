import axios from "axios";
import config from "../../config";
import { axiosWithHeaders } from "./axiosWithHeaders";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const getSubmissionProgress = async (submissionPeriod) => {
  const url = `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod=${submissionPeriod}`;

  return axiosWithHeaders({
    method: "GET",
    url: url,
  });
};

export default getSubmissionProgress;
