import { rest } from "msw";
import config from "../../config";
import { filtersContent } from "../../utils/constants/bulkDataFilesTestData";
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
} from "../testData";

const helperTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const getHelperText = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json("this is CDD helper text"));
});
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

const matsCaveatUrl = `${config.services.content.uri}/campd/data/custom-data-download/mats-data-caveat.md`;
const getMatsCaveat = rest.get(matsCaveatUrl, (req, res, ctx) => {
  return res(ctx.json("this is mats caveat"));
});

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

const filtersUrl = `${config.services.content.uri}/campd/data/bulk-data-files/filters-content.json`;
const getFilters = rest.get(filtersUrl, (req, res, ctx) => {
  return res(ctx.json(filtersContent));
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

const getIndex = rest.get(indexUrl, (req, res, ctx) => {
  return res(ctx.json("Title text.."));
});
const getCommentTypes = rest.get(commentTypesUrl, (req, res, ctx) => {
  return res(ctx.json(commentTypes));
});
const getStatus = rest.get(statusTextUrl, (req, res, ctx) => {
  return res(ctx.json(statuses));
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

const contentApiHandlers = [
  getHelperText,
  getApiErrorMessages,
  getLimitText,
  getMatsCaveat,
  getBulkHelperTextUrl,
  getDownloadLimitAlert,
  getFilters,
  getContentLayout,
  getTitleLayout,
  getReleaseNotes,
  getAboutContent,
  getIndex,
  getCommentTypes,
  getStatus,
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

export default contentApiHandlers;
