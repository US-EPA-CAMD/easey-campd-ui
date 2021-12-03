const config = {
  app: {
    apiKey: process.env.REACT_APP_CAMPD_API_KEY,
    googleAnalyticsEnabled: process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLED || 'false',
    googleAnalyticsContainerId: process.env.REACT_APP_GOOGLE_ANALYTICS_CONTAINER_ID || 'GTM-L8ZB',
    path: process.env.REACT_APP_EASEY_CAMPD_UI_PATH || "/",
    env: process.env.REACT_APP_EASEY_CAMPD_UI_ENV || "local-dev",
    version: process.env.REACT_APP_EASEY_CAMPD_UI_VERSION || "v0.0.0",
    published: process.env.REACT_APP_EASEY_CAMPD_UI_PUBLISHED || "local",
    email:
      process.env.REACT_APP_EASEY_CAMPD_UI_EMAIL ||
      "campd-support@camdsupport.com",
  },
  services: {
    mdm: {
      uri:
        process.env.REACT_APP_EASEY_MDM_API ||
        "https://easey-dev.app.cloud.gov/api/master-data-mgmt",
    },
    facilities: {
      uri:
        process.env.REACT_APP_EASEY_FACILITIES_API ||
        "https://easey-dev.app.cloud.gov/api/facility-mgmt",
    },
    emissions: {
      uri:
        process.env.REACT_APP_EASEY_EMISSIONS_API ||
        "https://easey-dev.app.cloud.gov/api/emissions-mgmt",
    },
    account: {
      uri:
        process.env.REACT_APP_EASEY_ACCOUNT_API ||
        "https://easey-dev.app.cloud.gov/api/account-mgmt",
    },
    quartz: {
      uri:
        process.env.REACT_APP_EASEY_QUARTZ_API ||
        "https://easey-dev.app.cloud.gov/quartz/api",
    }
  },
};

export default config;
