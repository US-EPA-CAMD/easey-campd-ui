import axios from "axios";
import config from "../../config";
import { clientTokenAxios } from "./clientTokenAxios";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const getSubmissionProgress = async (submissionPeriod) => {
  const url = `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod=${submissionPeriod}`;

  return clientTokenAxios({
    method: "GET",
    url: url,
  });
};

export default getSubmissionProgress;
