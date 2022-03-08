import { combineReducers } from "redux";
import filterCriteria from "./customDataDownload/filterCriteria";
import customDataDownload from "./customDataDownload/customDataDownload";
import bulkDataFiles from "./bulkDataFilesReducer";
import apiCallsInProgress from "./apiStatusReducer";
import hideNav from "./hideNavReducer";
const rootReducer = combineReducers({
  filterCriteria,
  customDataDownload,
  apiCallsInProgress,
  bulkDataFiles,
  hideNav
});

export default rootReducer;
