import { http } from "msw";
import config from "../../config";
import { filtersContent } from "../../utils/constants/bulkDataFilesTestData";
import {
  additionalDataTools,
  glossaryContent,
  homeContent,
  releases,
  slides,
  tools,
  topics,
} from "../testData";

const helperTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const getHelperText = http.get(helperTextUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("this is CDD helper text"));
});
const limitTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/download-limit-alert.md`;
const getLimitText = http.get(limitTextUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("this is CDD download limit"));
});
const apiErrorsMessagesUrl = `${config.services.content.uri}/campd/api-error-messages.json`;
const getApiErrorMessages = http.get(apiErrorsMessagesUrl, (req, res, ctx) =>{
  return new Response(JSON.stringify({
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
  }));
}
);

const matsCaveatUrl = `${config.services.content.uri}/campd/data/custom-data-download/mats-data-caveat.md`;
const getMatsCaveat = http.get(matsCaveatUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("this is mats caveat"));
});

const bulkHelperTextUrl = `${config.services.content.uri}/campd/data/bulk-data-files/helper-text.md`;
const downloadLimitAlertUrl = `${config.services.content.uri}/campd/data/bulk-data-files/download-limit-alert.md`;
const getBulkHelperTextUrl = http.get(bulkHelperTextUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("Bulk Data Files"));
});
const getDownloadLimitAlert = http.get(
  downloadLimitAlertUrl,
  (req, res, ctx) => {
    return new Response(JSON.stringify("Download Limit Alert"));
  }
);

const filtersUrl = `${config.services.content.uri}/campd/data/bulk-data-files/filters-content.json`;
const getFilters = http.get(filtersUrl, (req, res, ctx) => {
  return new Response(JSON.stringify(filtersContent));
});

const titleUrlLayout = `${config.services.content.uri}/campd/home/main-title.md`;
const contentUrlLayout = `${config.services.content.uri}/campd/home/main-content.md`;
const getTitleLayout = http.get(titleUrlLayout, (req, res, ctx) => {
  return new Response(JSON.stringify("Title text.."));
});
const getContentLayout = http.get(contentUrlLayout, (req, res, ctx) => {
  return new Response(JSON.stringify("Content text.."));
});

const getTutorialsContent = http.get(
  `${config.services.content.uri}/campd/help-support/tutorials/index.md`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("this is campd"));
  }
);
const relaseNotesUrl = `${config.services.content.uri}/campd/help-support/about/release-notes.json`;
const getReleaseNotes = http.get(relaseNotesUrl, () => {
  return new Response(JSON.stringify(releases));
});
const aboutUrl = `${config.services.content.uri}/campd/help-support/about/index.md`;
const getAboutContent = http.get(aboutUrl, () => {
  return new Response(JSON.stringify('this is campd'));
});
const indexUrl = `${config.services.content.uri}/campd/help-support/contact-us/index.md`;

const getIndex = http.get(indexUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("Title text.."));
});

const getHomeContent = http.get(
  `${config.services.content.uri}/campd/data/home/index.json`,
  (req, res, ctx) => {
    return new Response(JSON.stringify(homeContent));
  }
);
const getHomeHeader = http.get(
  `${config.services.content.uri}/campd/data/home/header.md`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("Data Access Methods"));
  }
);
const getFaqTitle = http.get(
  `${config.services.content.uri}/campd/help-support/faqs/index.md`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("Title text.."));
  }
);
const getFaqContent = http.get(
  `${config.services.content.uri}/campd/help-support/faqs/topics.json`,
  (req, res, ctx) => {
    return new Response(JSON.stringify(topics));
  }
);

const getGlossaryContent = http.get(
  `${config.services.content.uri}/campd/help-support/glossary/index.md`,
  (req, res, ctx) => {
    return new Response(JSON.stringify(glossaryContent));
  }
);
const getGlossaryPdf = http.get(
  `${config.services.content.uri}/campd/help-support/glossary/CAMPD-Glossary.pdf`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("glossary PDF Content"));
  }
);
const getGlossaryCsv = http.get(
  `${config.services.content.uri}/campd/help-support/glossary/CAMPD-Glossary.xlsx`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("glossary CSV Content"));
  }
);

const getWhatIsNewUrl = `${config.services.content.uri}/campd/home/what-is-new-content.md`;

const getWhatIsNewTitleUrl = `${config.services.content.uri}/campd/home/what-is-new-title.md`;

const getDataCardUrl = `${config.services.content.uri}/campd/home/data-card.md`;

const getVisualGalleryCardUrl = `${config.services.content.uri}/campd/home/visualization-gallery-card.md`;

const getWhatIsNewContent = http.get(getWhatIsNewUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("What Is New Box Content"));
});
const getWhatIsNewTitle = http.get(getWhatIsNewTitleUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("What Is New Box Title"));
});
const getDataCard = http.get(getDataCardUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("Data"));
});
const getVisualGallery = http.get(getVisualGalleryCardUrl, (req, res, ctx) => {
  return new Response(JSON.stringify("Visualization Gallery"));
});

const getAdditionalToolsUrl = http.get(
  `${config.services.content.uri}/campd/help-support/related-resources/additional-data-tools.json`,
  (req, res, ctx) => {
    return new Response(JSON.stringify(additionalDataTools));
  }
);
const getContentIntro = http.get(
  `${config.services.content.uri}/campd/help-support/related-resources/index.md`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("This is related resources intro.."));
  }
);
const vizContentUrl = `${config.services.content.uri}/campd/visualization-gallery`;

const vizHandlers = [
  http.get(`${vizContentUrl}/intro-text.md`, (req, res, ctx) => {
    return new Response(JSON.stringify("Visualization Gallery is a collection..."));
  }),
  http.get(`${vizContentUrl}/slides.json`, (req, res, ctx) => {
    return new Response(JSON.stringify(slides));
  }),
  http.get(`${vizContentUrl}/slides/:imageOrText`, (req, res, ctx) => {
    return new Response(JSON.stringify(""));
  }),
  http.get(`${vizContentUrl}/tools.json`, (req, res, ctx) => {
    return new Response(JSON.stringify(tools));
  }),
  http.get(`${vizContentUrl}/tools/:imageOrDescription`, (req, res, ctx) => {
    return new Response(JSON.stringify(""));
  }),
];

const getUnhandledContent = http.get(
  `${config.services.content.uri}/*`,
  (req, res, ctx) => {
    return new Response(JSON.stringify("got content"));
  }
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
