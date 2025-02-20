import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean,
} from "./utils/functions";

export const config = {
  app: {
    apiKey: getConfigValue("VITE_EASEY_CAMPD_UI_API_KEY"),
    apiTimeout: getConfigValueNumber("VITE_API_TIMEOUT", 900000),
    googleAnalyticsEnabled: getConfigValueBoolean(
      "VITE_GOOGLE_ANALYTICS_ENABLED"
    ),
    googleAnalyticsContainerId: getConfigValue(
      "VITE_GOOGLE_ANALYTICS_CONTAINER_ID",
      "GTM-L8ZB"
    ),
    path: getConfigValue("VITE_EASEY_CAMPD_UI_PATH", "/"),
    env: getConfigValue("VITE_EASEY_CAMPD_UI_ENV", "local-dev"),
    version: getConfigValue("VITE_EASEY_CAMPD_UI_VERSION", "v0.0.0"),
    published: getConfigValue("VITE_EASEY_CAMPD_UI_PUBLISHED", "local"),
    title: getConfigValue("VITE_EASEY_CAMPD_UI_TITLE", "CAMPD"),
    email: getConfigValue(
      "VITE_EASEY_CAMPD_UI_EMAIL",
      "campd-support@camdsupport.com"
    ),
    streamingLimit: getConfigValueNumber(
      "VITE_EASEY_CAMPD_UI_STREAMING_LIMIT",
      1000000
    ),
    downloadLimit: getConfigValue(
      "VITE_EASEY_CAMPD_UI_DOWNLOAD_LIMIT",
      "50 GB"
    ),
    emissionsSubmissionTestDate: getConfigValue(
      "VITE_EASEY_CAMPD_UI_EMISSIONS_SUBMISSION_TEST_DATE"
    ),
    clientId: getConfigValue("VITE_EASEY_CAMPD_UI_CLIENT_ID"),
    clientSecret: getConfigValue("VITE_EASEY_CAMPD_UI_CLIENT_SECRET"),
    enableDebug: getConfigValueBoolean("VITE_EASEY_CAMPD_UI_ENABLE_DEBUG"),
  },
  services: {
    auth: {
      uri: getConfigValue(
        "VITE_EASEY_AUTH_API",
        "https://api.epa.gov/easey/dev/auth-mgmt"
      ),
    },
    mdm: {
      uri: getConfigValue(
        "VITE_EASEY_MDM_API",
        "https://api.epa.gov/easey/dev/master-data-mgmt"
      ),
    },
    facilities: {
      uri: getConfigValue(
        "VITE_EASEY_FACILITIES_API",
        "https://api.epa.gov/easey/dev/facilities-mgmt"
      ),
    },
    emissions: {
      uri: getConfigValue(
        "VITE_EASEY_EMISSIONS_API",
        "https://api.epa.gov/easey/dev/emissions-mgmt"
      ),
    },
    account: {
      uri: getConfigValue(
        "VITE_EASEY_ACCOUNT_API",
        "https://api.epa.gov/easey/dev/account-mgmt"
      ),
    },
    streaming: {
      uri: getConfigValue(
        "VITE_EASEY_STREAMING_API",
        "https://api.epa.gov/easey/dev/streaming-services"
      ),
    },
    content: {
      uri: getConfigValue(
        "VITE_EASEY_CONTENT_API",
        "https://api.epa.gov/easey/dev/content-mgmt"
      ),
    },
    camd: {
      uri: getConfigValue(
        "VITE_EASEY_CAMD_API",
        "https://api.epa.gov/easey/dev/camd-services"
      ),
    },
    bulkFiles: {
      uri: getConfigValue(
        "VITE_EASEY_BULK_FILES_API",
        "https://api.epa.gov/easey/dev/bulk-files"
      ),
    },
  },
};

if (config.app.enableDebug) {
  console.log("config: ", config);
}

export default config;
