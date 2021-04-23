import { combineReducers } from "redux";
import hourlyEmissions from "./customDataDownload/hourlyEmissions/hourlyEmissions";
import customDataDownload from "./customDataDownload/customDataDownload";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  hourlyEmissions,
  customDataDownload,
  apiCallsInProgress
});

export default rootReducer;
