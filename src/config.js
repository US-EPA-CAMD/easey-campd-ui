const getConfigValue = (key, defaultValue = "") => {
  let returnValue;

  if (window._env_) {
    returnValue = window._env_[key];
  } else if (!returnValue && process.env) {
    returnValue = process.env[key];
  }
  return returnValue || defaultValue;
};

const config = {
  app: {
    apiKey: getConfigValue("REACT_APP_CAMPD_API_KEY"),
    apiTimeout: getConfigValue("REACT_APP_API_TIMEOUT", 900000),
    googleAnalyticsEnabled: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_ENABLED",
      "false"
    ),
    googleAnalyticsContainerId: getConfigValue(
      "REACT_APP_GOOGLE_ANALYTICS_CONTAINER_ID",
      "GTM-L8ZB"
    ),
    path: getConfigValue("REACT_APP_EASEY_CAMPD_UI_PATH", "/"),
    env: getConfigValue("REACT_APP_EASEY_CAMPD_UI_ENV", "local-dev"),
    version: getConfigValue("REACT_APP_EASEY_CAMPD_UI_VERSION", "v0.0.0"),
    published: getConfigValue("REACT_APP_EASEY_CAMPD_UI_PUBLISHED", "local"),
    email: getConfigValue(
      "REACT_APP_EASEY_CAMPD_UI_EMAIL",
      "campd-support@camdsupport.com"
    ),
    streamingLimit: getConfigValue(
      "REACT_APP_EASEY_CAMPD_UI_STREAMING_LIMIT",
      1000000
    ),
    downloadLimit: getConfigValue(
      "REACT_APP_EASEY_CAMPD_UI_DOWNLOAD_LIMIT",
      "50 GB"
    ),
    emissionsSubmissionTestDate: getConfigValue(
      "REACT_APP_EASEY_CAMPD_UI_EMISSIONS_SUBMISSION_TEST_DATE"
    ),
    clientId: getConfigValue("REACT_APP_EASEY_CAMPD_UI_CLIENT_ID"),
    clientSecret: getConfigValue("REACT_APP_EASEY_CAMPD_UI_CLIENT_SECRET"),
  },
  services: {
    auth: {
      uri: getConfigValue(
        "REACT_APP_EASEY_AUTH_API",
        "https://api-easey-dev.app.cloud.gov/auth-mgmt"
      ),
    },
    mdm: {
      uri: getConfigValue(
        "REACT_APP_EASEY_MDM_API",
        "https://api-easey-dev.app.cloud.gov/master-data-mgmt"
      ),
    },
    facilities: {
      uri: getConfigValue(
        "REACT_APP_EASEY_FACILITIES_API",
        "https://api-easey-dev.app.cloud.gov/facilities-mgmt"
      ),
    },
    emissions: {
      uri: getConfigValue(
        "REACT_APP_EASEY_EMISSIONS_API",
        "https://api-easey-dev.app.cloud.gov/emissions-mgmt"
      ),
    },
    account: {
      uri: getConfigValue(
        "REACT_APP_EASEY_ACCOUNT_API",
        "https://api-easey-dev.app.cloud.gov/account-mgmt"
      ),
    },
    streaming: {
      uri: getConfigValue(
        "REACT_APP_EASEY_STREAMING_API",
        "https://api-easey-dev.app.cloud.gov/streaming-services"
      ),
    },
    content: {
      uri: getConfigValue(
        "REACT_APP_EASEY_CONTENT_API",
        "https://api.epa.gov/easey/test/content-mgmt"
      ),
    },
    camd: {
      uri: getConfigValue(
        "REACT_APP_EASEY_CAMD_API",
        "https://api-easey-dev.app.cloud.gov/camd-services"
      ),
    },
    bulkFiles: {
      uri: getConfigValue(
        "REACT_APP_EASEY_BULK_DATA_FILES_API",
        "https://api.epa.gov/easey/dev/bulk-files"
      ),
    },
  },
};

export default config;
