import {
  getConfigValue,
  getConfigValueNumber,
  getConfigValueBoolean
} from './utils/functions';

require('dotenv').config();

export const config = {
  app: {
    test: getConfigValue(
      'TO_BE_REMOVED',
    ),
    apiKey: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_API_KEY',
    ),
    apiTimeout: getConfigValueNumber(
      'REACT_APP_API_TIMEOUT', 900000,
    ),
    googleAnalyticsEnabled: getConfigValueBoolean(
      'REACT_APP_GOOGLE_ANALYTICS_ENABLED',
    ),
    googleAnalyticsContainerId: getConfigValue(
      'REACT_APP_GOOGLE_ANALYTICS_CONTAINER_ID', 'GTM-L8ZB',
    ),
    path: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_PATH', '/',
    ),
    env: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_ENV', 'local-dev',
    ),
    version: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_VERSION', 'v0.0.0',
    ),
    published: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_PUBLISHED', 'local',
    ),
    email: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_EMAIL', 'campd-support@camdsupport.com',
    ),
    streamingLimit: getConfigValueNumber(
      'REACT_APP_EASEY_CAMPD_UI_STREAMING_LIMIT', 1000000,
    ),
    downloadLimit: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_DOWNLOAD_LIMIT', '50 GB',
    ),
    emissionsSubmissionTestDate: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_EMISSIONS_SUBMISSION_TEST_DATE',
    ),
    clientId: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_CLIENT_ID',
    ),
    clientSecret: getConfigValue(
      'REACT_APP_EASEY_CAMPD_UI_CLIENT_SECRET',
    ),
    enableDebug: getConfigValueBoolean(
      'REACT_APP_EASEY_CAMPD_UI_ENABLE_DEBUG',
    ),
  },
  services: {
    auth: {
      uri: getConfigValue(
        'REACT_APP_EASEY_AUTH_API', 'https://api.epa.gov/easey/dev/auth-mgmt',
      ),
    },
    mdm: {
      uri: getConfigValue(
        'REACT_APP_EASEY_MDM_API', 'https://api.epa.gov/easey/dev/master-data-mgmt',
      ),
    },
    facilities: {
      uri: getConfigValue(
        'REACT_APP_EASEY_FACILITIES_API', 'https://api.epa.gov/easey/dev/facilities-mgmt',
      ),
    },
    emissions: {
      uri: getConfigValue(
        'REACT_APP_EASEY_EMISSIONS_API', 'https://api.epa.gov/easey/dev/emissions-mgmt',
      ),
    },
    account: {
      uri: getConfigValue(
        'REACT_APP_EASEY_ACCOUNT_API', 'https://api.epa.gov/easey/dev/account-mgmt',
      ),
    },
    streaming: {
      uri: getConfigValue(
        'REACT_APP_EASEY_STREAMING_API', 'https://api.epa.gov/easey/dev/streaming-services',
      ),
    },
    content: {
      uri: getConfigValue(
        'REACT_APP_EASEY_CONTENT_API', 'https://api.epa.gov/easey/dev/content-mgmt',
      ),
    },
    camd: {
      uri: getConfigValue(
        'REACT_APP_EASEY_CAMD_API', 'https://api.epa.gov/easey/dev/camd-services',
      ),
    },
    bulkFiles: {
      uri: getConfigValue(
        'REACT_APP_EASEY_BULK_FILES_API', 'https://api.epa.gov/easey/dev/bulk-files',
      ),
    },
  },
};

if (config.app.enableDebug) {
  console.log('config: ', config);
}

export default config;
