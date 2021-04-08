import { combineReducers } from "redux";
import emissionsFilterReducer from "./emissionsFilter";

const rootReducer = combineReducers({
  emissionsFilter: emissionsFilterReducer
});

export default rootReducer;
