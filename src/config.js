const config = {
  app: {
    path: process.env.REACT_APP_EASEY_CAMPD_UI_PATH || "/",
    env: process.env.REACT_APP_EASEY_CAMPD_UI_ENV || "local-dev",
    version: process.env.REACT_APP_EASEY_CAMPD_UI_VERSION || "v0.0.0",
    published: process.env.REACT_APP_EASEY_CAMPD_UI_PUBLISHED || "local",
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
  },
};

export default config;
