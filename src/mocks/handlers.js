import { rest } from "msw";
import config from "../config";
import { dataTable } from "../utils/constants/bulkDataFilesTestData";
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
  accountAttributes,
  allowanceCompliance,
  allowanceHoldings,
  programCodes,
  hourlyEmissions,
  dataPreview,
} from "../utils/constants/cddTestData";
import contentApiHandlers from "./api/content";

//cdd calls
const clientTokenUrl = `${config.services.auth.uri}/tokens/client`;
const getClientToken = rest.get(clientTokenUrl, (req, res, ctx) => {
  return res(ctx.json({ token: "123" }));
});
const refreshClientToken = rest.post(clientTokenUrl, (req, res, ctx) => {
  sessionStorage.setItem("client_token", "123");
  sessionStorage.setItem("client_token_expiration", new Date() + 5);
  return res(ctx.json({ token: "123" }));
});
const logErrorUrl = `${config.services.camd.uri}/logging/error`;
const logError = rest.post(logErrorUrl, (req, res, ctx) =>
  res(ctx.status(200))
);

const bookmarkUrl = `${config.services.camd.uri}/bookmarks`;
const createBookmarkUrl = rest.post(bookmarkUrl, (req, res, ctx) => {
  return res(
    ctx.json({
      bookmarkId: 1072,
      bookmarkAddDate: "2022-05-23T12:56:45.587Z",
      bookmarkLastAccessedDate: "2022-05-23T16:13:13.011Z",
      bookmarkHitCount: 2,
    })
  );
});
const emissionsApplicableAttributesUrl = `${config.services.emissions.uri}/applicable/*`;
const getEmissionsApplicableAttributes = rest.get(
  emissionsApplicableAttributesUrl,
  (req, res, ctx) => res(ctx.json([]))
);
export const bulkDataFileDownloadUrl = `${config.services.bulkFiles.uri}/*`;
const downloadBulkDataFile = rest.get(
  bulkDataFileDownloadUrl,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json());
  }
);

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
const getAttributes = rest.get(attributes.url, (req, res, ctx) => {
  return res(ctx.json(attributes.data));
});
const getFacilities = rest.get(facilities.url, (req, res, ctx) => {
  return res(ctx.json(facilities.data));
});
const getOwnerOperators = rest.get(ownerOperators.url, (req, res, ctx) => {
  return res(ctx.json(ownerOperators.data));
});

const getEmissions = rest.get(hourlyEmissions.url, (req, res, ctx) =>
  {
    const mockedData = hourlyEmissions.data;
    const mockedHeaders = {
      "x-total-count": hourlyEmissions.data.length,
      "x-field-mappings": JSON.stringify([]),
      "x-excludable-columns": JSON.stringify([]),
    };

    return res(ctx.json(mockedData), ctx.set(mockedHeaders));}
);

const getAccountAttributes = rest.get(accountAttributes.url, (req, res, ctx) =>
  res(ctx.json(accountAttributes.data))
);
const getAllowanceCompliance = rest.get(
  allowanceCompliance.url,
  (req, res, ctx) => res(ctx.json(allowanceCompliance.data))
);
const getAllowanceHoldings = rest.get(allowanceHoldings.url, (req, res, ctx) =>
  res(ctx.json(allowanceHoldings.data))
);
const getProgramCodes = rest.get(programCodes.url, (req, res, ctx) =>
  res(ctx.json(programCodes.data))
);
//bulk data files

const bulkDataFilesUrl = `${config.services.camd.uri}/bulk-files`;
const getBulkDataFiles = rest.get(bulkDataFilesUrl, (req, res, ctx) => {
  return res(ctx.json(dataTable));
});

const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(
    ctx.json({ year: 2022, quarterName: "second", percentage: "30%" })
  );
});

const emailUrl = `${config.services.camd.uri}/support/email`;

const getCompAK = rest.get(
  `${config.services.account.uri}/emissions-compliance`,
  (req, res, ctx) => {
    // const { page, perPage, stateCode } = req.url.searchParams;

    const mockedData = dataPreview.data;
    const mockedHeaders = {
      "x-total-count": dataPreview.data.length,
      "x-field-mappings": JSON.stringify(dataPreview.fieldMappings),
      "x-excludable-columns": JSON.stringify(dataPreview.excludableColumns),
    };

    return res(ctx.json(mockedData), ctx.set(mockedHeaders));
  }
);

const notification = rest.post(emailUrl, (req, res, ctx) => {
  return res(ctx.status(200));
});

export const handlers = [
  getEmissionsApplicableAttributes,
  getClientToken,
  refreshClientToken,
  downloadBulkDataFile,
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
  getAccountAttributes,
  getAllowanceCompliance,
  getAllowanceHoldings,
  getProgramCodes,
  getEmissions,
  createBookmarkUrl,
  getBulkDataFiles,
  getSubmissionProgress,
  getCompAK,
  logError,
  notification,
  ...contentApiHandlers,
  //getUnhandledContent needs to be last on the array
];
