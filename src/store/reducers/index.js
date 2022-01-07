import { combineReducers } from "redux";
import filterCriteria from "./customDataDownload/filterCriteria";
import customDataDownload from "./customDataDownload/customDataDownload";
import apiCallsInProgress from "./apiStatusReducer";
import hideNav from "./hideNavReducer";
const rootReducer = combineReducers({
  filterCriteria,
  customDataDownload,
  apiCallsInProgress,
  hideNav
});

export default rootReducer;
