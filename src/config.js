const config = {
  app: {
    apiKey: process.env.REACT_APP_CAMPD_API_KEY || "",
    apiTimeout: process.env.REACT_APP_API_TIMEOUT || 900000,
    googleAnalyticsEnabled:
      process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLED || "false",
    googleAnalyticsContainerId:
      process.env.REACT_APP_GOOGLE_ANALYTICS_CONTAINER_ID || "GTM-L8ZB",
    path: process.env.REACT_APP_EASEY_CAMPD_UI_PATH || "/",
    env: process.env.REACT_APP_EASEY_CAMPD_UI_ENV || "local-dev",
    version: process.env.REACT_APP_EASEY_CAMPD_UI_VERSION || "v0.0.0",
    published: process.env.REACT_APP_EASEY_CAMPD_UI_PUBLISHED || "local",
    email:
      process.env.REACT_APP_EASEY_CAMPD_UI_EMAIL ||
      "campd-support@camdsupport.com",
    streamingLimit:
      process.env.REACT_APP_EASEY_CAMPD_UI_STREAMING_LIMIT || 1000000,
    emissionsSubmissionTestDate:
      process.env.REACT_APP_EASEY_CAMPD_UI_EMISSIONS_SUBMISSION_TEST_DATE,
  },
  services: {
    mdm: {
      uri:
        process.env.REACT_APP_EASEY_MDM_API ||
        "https://api-easey-dev.app.cloud.gov/master-data-mgmt",
    },
    facilities: {
      uri:
        process.env.REACT_APP_EASEY_FACILITIES_API ||
        "https://api-easey-dev.app.cloud.gov/facilities-mgmt",
    },
    emissions: {
      uri:
        process.env.REACT_APP_EASEY_EMISSIONS_API ||
        "https://api-easey-dev.app.cloud.gov/emissions-mgmt",
    },
    account: {
      uri:
        process.env.REACT_APP_EASEY_ACCOUNT_API ||
        "https://api-easey-dev.app.cloud.gov/account-mgmt",
    },
    streaming: {
      uri:
        process.env.REACT_APP_EASEY_STREAMING_API ||
        "https://api-easey-dev.app.cloud.gov/streaming-services",
    },
    content: {
      uri:
        process.env.REACT_APP_EASEY_CONTENT_API ||
        "https://api.epa.gov/easey/dev/content-mgmt",
    },
  },
};

export default config;
