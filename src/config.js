const config = {
  app: {
    apiKey: window._env_.REACT_APP_CAMPD_API_KEY || "",
    apiTimeout: window._env_.REACT_APP_API_TIMEOUT || 900000,
    googleAnalyticsEnabled:
      window._env_.REACT_APP_GOOGLE_ANALYTICS_ENABLED || "false",
    googleAnalyticsContainerId:
      window._env_.REACT_APP_GOOGLE_ANALYTICS_CONTAINER_ID || "GTM-L8ZB",
    path: window._env_.REACT_APP_EASEY_CAMPD_UI_PATH || "/",
    env: window._env_.REACT_APP_EASEY_CAMPD_UI_ENV || "local-dev",
    version: window._env_.REACT_APP_EASEY_CAMPD_UI_VERSION || "v0.0.0",
    published: window._env_.REACT_APP_EASEY_CAMPD_UI_PUBLISHED || "local",
    email:
      window._env_.REACT_APP_EASEY_CAMPD_UI_EMAIL ||
      "campd-support@camdsupport.com",
    streamingLimit:
      window._env_.REACT_APP_EASEY_CAMPD_UI_STREAMING_LIMIT || 1000000,
    downloadLimit:
      window._env_.REACT_APP_EASEY_CAMPD_UI_DOWNLOAD_LIMIT || "50 GB",
    emissionsSubmissionTestDate:
      window._env_.REACT_APP_EASEY_CAMPD_UI_EMISSIONS_SUBMISSION_TEST_DATE,
    clientId: window._env_.REACT_APP_EASEY_CAMPD_UI_CLIENT_ID || "",
    clientSecret: window._env_.REACT_APP_EASEY_CAMPD_UI_CLIENT_SECRET || "",
  },
  services: {
    auth: {
      uri:
        window._env_.REACT_APP_EASEY_AUTH_API ||
        "https://api-easey-dev.app.cloud.gov/auth-mgmt",
    },
    mdm: {
      uri:
        window._env_.REACT_APP_EASEY_MDM_API ||
        "https://api-easey-dev.app.cloud.gov/master-data-mgmt",
    },
    facilities: {
      uri:
        window._env_.REACT_APP_EASEY_FACILITIES_API ||
        "https://api-easey-dev.app.cloud.gov/facilities-mgmt",
    },
    emissions: {
      uri:
        window._env_.REACT_APP_EASEY_EMISSIONS_API ||
        "https://api-easey-dev.app.cloud.gov/emissions-mgmt",
    },
    account: {
      uri:
        window._env_.REACT_APP_EASEY_ACCOUNT_API ||
        "https://api-easey-dev.app.cloud.gov/account-mgmt",
    },
    streaming: {
      uri:
        window._env_.REACT_APP_EASEY_STREAMING_API ||
        "https://api-easey-dev.app.cloud.gov/streaming-services",
    },
    content: {
      uri:
        window._env_.REACT_APP_EASEY_CONTENT_API ||
        "https://api.epa.gov/easey/dev/content-mgmt",
    },
    camd: {
      uri:
        window._env_.REACT_APP_EASEY_CAMD_SERVICES ||
        "https://api-easey-dev.app.cloud.gov/camd-services",
    },
    bulkFiles: {
      uri:
        window._env_.REACT_APP_EASEY_BULK_DATA_FILES_API ||
        "https://api.epa.gov/easey/dev/bulk-files",
    },
  },
};

export default config;
