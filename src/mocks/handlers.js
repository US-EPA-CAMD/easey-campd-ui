import { rest } from "msw";
import React from "react";
import config from "../config";
import {
  dataTable,
  filtersContent,
} from "../utils/constants/bulkDataFilesTestData";
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
} from "../utils/constants/cddTestData";
import {
  additionalDataTools,
  commentTypes,
  glossaryContent,
  homeContent,
  releases,
  slides,
  statuses,
  tools,
  topics,
} from "./testData";

jest.mock("react-markdown", () => ({ children }) => <>{children}</>);
jest.mock("remark-gfm", () => () => {});

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
const helperTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const limitTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/download-limit-alert.md`;
const getLimitText = rest.get(limitTextUrl, (req, res, ctx) => {
  return res(ctx.json("this is CDD download limit"));
});
const apiErrorsMessagesUrl = `${config.services.content.uri}/campd/api-error-messages.json`;
const getApiErrorMessages = rest.get(apiErrorsMessagesUrl, (req, res, ctx) =>
  ctx.json({
    contentManager:
      "All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
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
      "All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
    s3Outage:
      "All of the content on this page may not be available. If you continue to encounter this issue, contact CAMPD support: campd-support@camdsupport.com",
  })
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
const emissionsApplicableAttributesUrl = `${config.services.emissions}/applicable/*`;
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
const matsCaveatUrl = `${config.services.content.uri}/campd/data/custom-data-download/mats-data-caveat.md`;
const getMatsCaveat = rest.get(matsCaveatUrl, (req, res, ctx) => {
  return res(ctx.json("this is mats caveat"));
});
const getHelperText = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json("this is CDD helper text"));
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
const getAttributes = rest.get(
  "https://api.epa.gov/easey/dev/account-mgmt/emissions-compliance/attributes/applicable", //attributes.url
  (req, res, ctx) => {
    return res(ctx.json(attributes.data));
  }
);
const getFacilities = rest.get(
  "https://api.epa.gov/easey/dev/facilities-mgmt/facilities", //facilities.url,
  (req, res, ctx) => {
    return res(ctx.json(facilities.data));
  }
);
const getOwnerOperators = rest.get(
  "https://api.epa.gov/easey/dev/account-mgmt/emissions-compliance/owner-operators", //ownerOperators.url,
  (req, res, ctx) => {
    return res(ctx.json(ownerOperators.data));
  }
);

const getEmissions = rest.get(hourlyEmissions.url, (req, res, ctx) =>
  res(ctx.json(hourlyEmissions.data))
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
const bulkHelperTextUrl = `${config.services.content.uri}/campd/data/bulk-data-files/helper-text.md`;
const downloadLimitAlertUrl = `${config.services.content.uri}/campd/data/bulk-data-files/download-limit-alert.md`;
const getBulkHelperTextUrl = rest.get(bulkHelperTextUrl, (req, res, ctx) => {
  return res(ctx.json("Bulk Data Files"));
});
const getDownloadLimitAlert = rest.get(
  downloadLimitAlertUrl,
  (req, res, ctx) => {
    return res(ctx.json("Download Limit Alert"));
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
const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(
    ctx.json({ year: 2022, quarterName: "second", percentage: "30%" })
  );
});
const titleUrlLayout = `${config.services.content.uri}/campd/home/main-title.md`;
const contentUrlLayout = `${config.services.content.uri}/campd/home/main-content.md`;
const getTitleLayout = rest.get(titleUrlLayout, (req, res, ctx) => {
  return res(ctx.json("Title text.."));
});
const getContentLayout = rest.get(contentUrlLayout, (req, res, ctx) => {
  return res(ctx.json("Content text.."));
});

const getTutorialsContent = rest.get(
  `${config.services.content.uri}/campd/help-support/tutorials/index.md`,
  (req, res, ctx) => {
    return res(ctx.json("this is campd"));
  }
);
const relaseNotesUrl = `${config.services.content.uri}/campd/help-support/about/release-notes.json`;
const getReleaseNotes = rest.get(relaseNotesUrl, (req, res, ctx) => {
  return res(ctx.json(releases));
});
const aboutUrl = `${config.services.content.uri}/campd/help-support/about/index.md`;
const getAboutContent = rest.get(aboutUrl, (req, res, ctx) => {
  return res(ctx.json("this is campd"));
});
const indexUrl = `${config.services.content.uri}/campd/help-support/contact-us/index.md`;
const commentTypesUrl = `${config.services.content.uri}/campd/help-support/contact-us/comment-types.json`;
const statusTextUrl = `${config.services.content.uri}/campd/help-support/contact-us/submit-status-text.json`;
const emailUrl = `${config.services.camd.uri}/support/email`;

const getIndex = rest.get(indexUrl, (req, res, ctx) => {
  return res(ctx.json("Title text.."));
});
const getCommentTypes = rest.get(commentTypesUrl, (req, res, ctx) => {
  return res(ctx.json(commentTypes));
});
const getStatus = rest.get(statusTextUrl, (req, res, ctx) => {
  return res(ctx.json(statuses));
});
const notification = rest.post(emailUrl, (req, res, ctx) => {
  return res(ctx.status(200));
});
const getHomeContent = rest.get(
  `${config.services.content.uri}/campd/data/home/index.json`,
  (req, res, ctx) => {
    return res(ctx.json(homeContent));
  }
);
const getHomeHeader = rest.get(
  `${config.services.content.uri}/campd/data/home/header.md`,
  (req, res, ctx) => {
    return res(ctx.json("Data Access Methods"));
  }
);
const getFaqTitle = rest.get(
  `${config.services.content.uri}/campd/help-support/faqs/index.md`,
  (req, res, ctx) => {
    return res(ctx.json("Title text.."));
  }
);
const getFaqContent = rest.get(
  `${config.services.content.uri}/campd/help-support/faqs/topics.json`,
  (req, res, ctx) => {
    return res(ctx.json(topics));
  }
);

const getGlossaryContent = rest.get(
  `${config.services.content.uri}/campd/help-support/glossary/index.md`,
  (req, res, ctx) => {
    return res(ctx.json(glossaryContent));
  }
);
const getGlossaryPdf = rest.get(
  `${config.services.content.uri}/campd/help-support/glossary/CAMPD-Glossary.pdf`,
  (req, res, ctx) => {
    return res(ctx.json("glossary PDF Content"));
  }
);
const getGlossaryCsv = rest.get(
  `${config.services.content.uri}/campd/help-support/glossary/CAMPD-Glossary.xlsx`,
  (req, res, ctx) => {
    return res(ctx.json("glossary CSV Content"));
  }
);

const getWhatIsNewUrl = `${config.services.content.uri}/campd/home/what-is-new-content.md`;

const getWhatIsNewTitleUrl = `${config.services.content.uri}/campd/home/what-is-new-title.md`;

const getDataCardUrl = `${config.services.content.uri}/campd/home/data-card.md`;

const getVisualGalleryCardUrl = `${config.services.content.uri}/campd/home/visualization-gallery-card.md`;

const getWhatIsNewContent = rest.get(getWhatIsNewUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Content"));
});
const getWhatIsNewTitle = rest.get(getWhatIsNewTitleUrl, (req, res, ctx) => {
  return res(ctx.json("What Is New Box Title"));
});
const getDataCard = rest.get(getDataCardUrl, (req, res, ctx) => {
  return res(ctx.json("Data"));
});
const getVisualGallery = rest.get(getVisualGalleryCardUrl, (req, res, ctx) => {
  return res(ctx.json("Visualization Gallery"));
});

const getAdditionalToolsUrl = rest.get(
  `${config.services.content.uri}/campd/help-support/related-resources/additional-data-tools.json`,
  (req, res, ctx) => {
    return res(ctx.json(additionalDataTools));
  }
);
const getContentIntro = rest.get(
  `${config.services.content.uri}/campd/help-support/related-resources/index.md`,
  (req, res, ctx) => {
    return res(ctx.json("This is related resources intro.."));
  }
);

const vizContentUrl = `${config.services.content.uri}/campd/visualization-gallery`;

const vizHandlers = [
  rest.get(`${vizContentUrl}/intro-text.md`, (req, res, ctx) => {
    return res(ctx.json("Visualization Gallery is a collection..."));
  }),
  rest.get(`${vizContentUrl}/slides.json`, (req, res, ctx) => {
    return res(ctx.json(slides));
  }),
  rest.get(`${vizContentUrl}/slides/:imageOrText`, (req, res, ctx) => {
    return res(ctx.json(""));
  }),
  rest.get(`${vizContentUrl}/tools.json`, (req, res, ctx) => {
    return res(ctx.json(tools));
  }),
  rest.get(`${vizContentUrl}/tools/:imageOrDescription`, (req, res, ctx) => {
    return res(ctx.json(""));
  }),
];

const getUnhandledContent = rest.get(
  `${config.services.content.uri}/*`,
  (req, res, ctx) => res(ctx.json("got content"))
);
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
  getAccountAttributes,
  getAllowanceCompliance,
  getAllowanceHoldings,
  getProgramCodes,
  getEmissions,
  getHelperText,
  getLimitText,
  createBookmarkUrl,
  getMatsCaveat,
  getBulkHelperTextUrl,
  getDownloadLimitAlert,
  getBulkDataFiles,
  getFilters,
  getContentLayout,
  getTitleLayout,
  getSubmissionProgress,
  getReleaseNotes,
  getAboutContent,
  logError,
  getIndex,
  getCommentTypes,
  getStatus,
  notification,
  getHomeContent,
  getHomeHeader,
  getFaqTitle,
  getFaqContent,
  getGlossaryContent,
  getGlossaryPdf,
  getGlossaryCsv,
  getWhatIsNewContent,
  getWhatIsNewTitle,
  getDataCard,
  getVisualGallery,
  getAdditionalToolsUrl,
  getContentIntro,
  getTutorialsContent,
  ...vizHandlers,
  //getUnhandledContent needs to be last on the array
  getUnhandledContent,
];
