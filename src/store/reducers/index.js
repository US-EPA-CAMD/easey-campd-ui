import { combineReducers } from "redux";
import filterCriteria from "./customDataDownload/filterCriteria";
import customDataDownload from "./customDataDownload/customDataDownload";
import bulkDataFiles from "./bulkDataFilesReducer";
import apiCallsInProgress from "./apiStatusReducer";
import apiErrors from "./apiErrorsReducer";
import hideNav from "./hideNavReducer";
import authApiStatus from './authApiStatusReducer';
const rootReducer = combineReducers({
  filterCriteria,
  customDataDownload,
  apiCallsInProgress,
  apiErrors,
  bulkDataFiles,
  hideNav,
  authApiStatus
});

export default rootReducer;
