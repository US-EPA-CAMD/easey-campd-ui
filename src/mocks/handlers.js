import { http, HttpResponse } from "msw";
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
  hourlyEmissionsStreaming,
} from "../utils/constants/cddTestData";
import contentApiHandlers from "./api/content";

//cdd calls
const clientTokenUrl = `${config.services.auth.uri}/tokens/client`;
const getClientToken = http.get(clientTokenUrl, (req, res, ctx) => {
  return new Response(JSON.stringify({token: "123"}));
});
const refreshClientToken = http.post(clientTokenUrl, (req, res, ctx) => {
  sessionStorage.setItem("client_token", "123");
  sessionStorage.setItem("client_token_expiration", new Date() + 5);
  return new Response(JSON.stringify({token: "123"}));
});
const logErrorUrl = `${config.services.camd.uri}/logging/error`;
const logError = http.post(logErrorUrl, (req, res, ctx) => {
    return new HttpResponse(null, {
      status: 200,
    })
  }
);

const bookmarkUrl = `${config.services.camd.uri}/bookmarks`;
const createBookmarkUrl = http.post(bookmarkUrl, (req, res, ctx) => {
  return new Response(JSON.stringify({
    bookmarkId: 1072,
    bookmarkAddDate: "2022-05-23T12:56:45.587Z",
    bookmarkLastAccessedDate: "2022-05-23T16:13:13.011Z",
    bookmarkHitCount: 2,
  }));
});
const emissionsApplicableAttributesUrl = `${config.services.emissions.uri}/applicable/*`;
const getEmissionsApplicableAttributes = http.get(
  emissionsApplicableAttributesUrl,
  (req, res, ctx) => new Response(JSON.stringify([]))
);
export const bulkDataFileDownloadUrl = `${config.services.bulkFiles.uri}/*`;
const downloadBulkDataFile = http.get(
  bulkDataFileDownloadUrl,
  (req, res, ctx) => {
    return new HttpResponse(null, {
      status: 200,
    })
  }
);

const getUnitTypes = http.get(unitTypes.url, (req, res, ctx) => {
  return new Response(JSON.stringify(unitTypes.data));
});
const getFuelTypes = http.get(fuelTypes.url, (req, res, ctx) => {
  return new Response(JSON.stringify(fuelTypes.data));
});
const getStates = http.get(states.url, (req, res, ctx) => {
  return new Response(JSON.stringify(states.data));
});
const getControlTechnologies = http.get(
  controlTechnologies.url,
  (req, res, ctx) => {
    return new Response(JSON.stringify(controlTechnologies.data));
  }
);
const getAccountTypes = http.get(accountTypes.url, (req, res, ctx) => {
  return new Response(JSON.stringify(accountTypes.data));
});
const getTransactionTypes = http.get(transactionTypes.url, (req, res, ctx) => {
  return new Response(JSON.stringify(transactionTypes.data));
});
const getSourceCategories = http.get(sourceCategories.url, (req, res, ctx) => {
  return new Response(JSON.stringify(sourceCategories.data));
});
const getAttributes = http.get(attributes.url, (req, res, ctx) => {
  return new Response(JSON.stringify(attributes.data));
});
const getFacilities = http.get(facilities.url, (req, res, ctx) => {
  return new Response(JSON.stringify(facilities.data));
});
const getOwnerOperators = http.get(ownerOperators.url, (req, res, ctx) => {
  return new Response(JSON.stringify(ownerOperators.data));
});

const getEmissions = http.get(hourlyEmissions.url, (req, res, ctx) => {
  const mockedData = hourlyEmissions.data;
  const mockedHeaders = {
    "x-total-count": hourlyEmissions.data.length,
    "x-field-mappings": JSON.stringify([]),
    "x-excludable-columns": JSON.stringify([]),
  };
  return new Response(JSON.stringify(mockedData), {
    headers: mockedHeaders,
  });
});
const getStreamingEmissions = http.get(
  hourlyEmissionsStreaming.url,
  (req, res, ctx) => {
    const mockedData = hourlyEmissions.data;
    const mockedHeaders = {
      "x-total-count": hourlyEmissions.data.length,
      "x-field-mappings": JSON.stringify([]),
      "x-excludable-columns": JSON.stringify([]),
    };
    return new Response(JSON.stringify(mockedData), {
      headers: mockedHeaders,
    });
  }
);
const getAccountAttributes = http.get(accountAttributes.url, (req, res, ctx) =>
  new Response(JSON.stringify(accountAttributes.data))
);
const getAllowanceCompliance = http.get(
  allowanceCompliance.url,
  (req, res, ctx) =>
    new Response(JSON.stringify(allowanceCompliance.data))
);
const getAllowanceHoldings = http.get(allowanceHoldings.url, (req, res, ctx) =>
  new Response(JSON.stringify(allowanceHoldings.data))
);
const getProgramCodes = http.get(programCodes.url, (req, res, ctx) =>
  new Response(JSON.stringify(programCodes.data))
);
//bulk data files

const bulkDataFilesUrl = `${config.services.camd.uri}/bulk-files`;
const getBulkDataFiles = http.get(bulkDataFilesUrl, (req, res, ctx) => {
  return new Response(JSON.stringify(dataTable));
});

const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress`;
const getSubmissionProgress = http.get(submissionUrl, (req, res, ctx) => {
  return new Response(JSON.stringify({ year: 2022, quarterName: "second", percentage: "30%" }));
});

const emailUrl = `${config.services.camd.uri}/support/email`;

const getCompAK = http.get(
  `${config.services.account.uri}/emissions-compliance`,
  (req, res, ctx) => {
    // const { page, perPage, stateCode } = req.url.searchParams;

    const mockedData = dataPreview.data;
    const mockedHeaders = {
      "x-total-count": dataPreview.data.length,
      "x-field-mappings": JSON.stringify(dataPreview.fieldMappings),
      "x-excludable-columns": JSON.stringify(dataPreview.excludableColumns),
    };
    return new Response(JSON.stringify(mockedData), {
      headers: mockedHeaders,
    });
  }
);

const notification = http.post(emailUrl, (req, res, ctx) => {
  return new HttpResponse(null, {
    status: 200,
  });
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
  getStreamingEmissions,
  createBookmarkUrl,
  getBulkDataFiles,
  getSubmissionProgress,
  getCompAK,
  logError,
  notification,
  ...contentApiHandlers,
  //getUnhandledContent needs to be last on the array
];
