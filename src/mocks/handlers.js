import { rest } from 'msw';
import React from 'react';
import config from '../config';
import { dataTable, filtersContent } from '../utils/constants/bulkDataFilesTestData';
import {
  unitTypes,
  fuelTypes,
  states,
  controlTechnologies,
  accountTypes,
  transactionTypes,
  sourceCategories,
  attributes,
  facilities,
  ownerOperators,
} from '../utils/constants/cddTestData';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

//cdd calls
const clientTokenUrl = `${config.services.auth.uri}/tokens/client`;
const getClientToken = rest.get(clientTokenUrl, (req, res, ctx) => {
  return res(ctx.json({token: '123'}));
})
const refreshClientToken = rest.post(clientTokenUrl, (req, res, ctx) => {
  sessionStorage.setItem("client_token", '123');
  sessionStorage.setItem("client_token_expiration", new Date() + 5);
  return res(ctx.json({token: '123'}));
})
const logErrorUrl = `${config.services.camd.uri}/logging/error`;
const logError = rest.post(logErrorUrl, (req, res, ctx) =>  res(ctx.status(200)));
const helperTextUrl =
`${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const limitTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/download-limit-alert.md`;
const getLimitText = rest.get(limitTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD download limit'));
});
const apiErrorsMessagesUrl = `${config.services.content.uri}/campd/api-error-messages.json`;
const getApiErrorMessages = rest.get(apiErrorsMessagesUrl, (req, res, ctx) =>
  ctx.json({
    contentManager:
      'All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com',
    filterLogic:
      "We're currently experiencing technical issues. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    MDMRetrieval:
      "We're currently experiencing technical issues. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    dataPreview:
      "We're currently experiencing technical issues. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    download:
      "We're currently experiencing technical issues. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    bulkDataFiles:
      "We're currently experiencing technical issues. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    contactUs:
      'All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com',
    s3Outage:
      'All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com',
  })
);

const emissionsApplicableAttributesUrl = `${config.services.emissions}/applicable/*`
const getEmissionsApplicableAttributes = rest.get(emissionsApplicableAttributesUrl, (req, res, ctx)=>res(ctx.json([])));
export const bulkDataFileDownloadUrl = `${config.services.bulkFiles.uri}/*`;
const downloadBulkDataFile = rest.get(bulkDataFileDownloadUrl, (req, res, ctx) => {
  return res(ctx.status(200),ctx.json());
})
const matsCaveatUrl = `${config.services.content.uri}/campd/data/custom-data-download/mats-data-caveat.md`;
const getMatsCaveat = rest.get(matsCaveatUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD download limit'));
});
const getHelperText = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD helper tex'));
});
const getUnitTypes = rest.get(unitTypes.url, (req, res, ctx) => {
  return res(ctx.json(unitTypes.data));
});
const getFuelTypes = rest.get(fuelTypes.url, (req, res, ctx) => {
  return res(ctx.json(fuelTypes.data));
});
const getStates = rest.get(states.url, (req, res, ctx) => {
  return res(ctx.json(states.data));
});
const getControlTechnologies = rest.get(
  controlTechnologies.url,
  (req, res, ctx) => {
    return res(ctx.json(controlTechnologies.data));
  }
);
const getAccountTypes = rest.get(accountTypes.url, (req, res, ctx) => {
  return res(ctx.json(accountTypes.data));
});
const getTransactionTypes = rest.get(transactionTypes.url, (req, res, ctx) => {
  return res(ctx.json(transactionTypes.data));
});
const getSourceCategories = rest.get(sourceCategories.url, (req, res, ctx) => {
  return res(ctx.json(sourceCategories.data));
});
const getAttributes = rest.get('https://api.epa.gov/easey/dev/account-mgmt/emissions-compliance/attributes/applicable',//attributes.url
 (req, res, ctx) => {
  return res(ctx.json(attributes.data));
});
const getFacilities = rest.get('https://api.epa.gov/easey/dev/facilities-mgmt/facilities',//facilities.url, 
  (req, res, ctx) => {
  return res(ctx.json(facilities.data));
});
const getOwnerOperators = rest.get('https://api.epa.gov/easey/dev/account-mgmt/emissions-compliance/owner-operators',//ownerOperators.url,
   (req, res, ctx) => {
  return res(ctx.json(ownerOperators.data));
});

//bulk data files
const bulkHelperTextUrl = `${config.services.content.uri}/campd/data/bulk-data-files/helper-text.md`;
const downloadLimitAlertUrl = `${config.services.content.uri}/campd/data/bulk-data-files/download-limit-alert.md`;
const getBulkHelperTextUrl = rest.get(bulkHelperTextUrl, (req, res, ctx) => {
  return res(ctx.json('Bulk Data Files'));
});
const getDownloadLimitAlert = rest.get(
  downloadLimitAlertUrl,
  (req, res, ctx) => {
    return res(ctx.json('Download Limit Alert'));
  }
);
const bulkDataFilesUrl = `${config.services.camd.uri}/bulk-files`;
const getBulkDataFiles = rest.get(bulkDataFilesUrl, (req, res, ctx) => {
  return res(ctx.json(dataTable));
});
const filtersUrl = `${config.services.content.uri}/campd/data/bulk-data-files/filters-content.json`;
const getFilters = rest.get(filtersUrl, (req, res, ctx) => {
  return res(ctx.json(filtersContent));
});
const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(ctx.json({year: 2022, quarterName: 'second', percentage: '30%'}))
})
const titleUrlLayout =
  `${config.services.content.uri}/campd/home/main-title.md`;
const contentUrlLayout =
  `${config.services.content.uri}/campd/home/main-content.md`;
const getTitleLayout = rest.get(titleUrlLayout, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContentLayout = rest.get(contentUrlLayout, (req, res, ctx) => {
  return res(ctx.json('Content text..'));
});

const getUnhandledContent = rest.get(`${config.services.content.uri}/*`, (req, res, ctx) => res(ctx.json('got content')));
export const handlers = [
  getEmissionsApplicableAttributes,
  getClientToken,
  refreshClientToken,
  downloadBulkDataFile,
  getApiErrorMessages,
  getUnitTypes,
  getFacilities,
  getOwnerOperators,
  getFuelTypes,
  getStates,
  getControlTechnologies,
  getAccountTypes,
  getTransactionTypes,
  getSourceCategories,
  getAttributes,
  getHelperText,
  getLimitText,
  getMatsCaveat,
  getBulkHelperTextUrl,
  getDownloadLimitAlert,
  getBulkDataFiles,
  getFilters,
  getContentLayout,
  getTitleLayout,
  getSubmissionProgress,
  getUnhandledContent,
  logError
];
