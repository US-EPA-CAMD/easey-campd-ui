import { combineReducers } from "redux";
import filterCriteria from "./customDataDownload/filterCriteria";
import customDataDownload from "./customDataDownload/customDataDownload";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  filterCriteria,
  customDataDownload,
  apiCallsInProgress
});

export default rootReducer;
