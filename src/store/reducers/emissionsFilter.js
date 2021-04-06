import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.emissionsFilter, action) => {
  if(action.type === types.EMISSIONS.UPDATE_TIME_PERIOD){
    return Object.assign({}, state, { timePeriod: action.timePeriod });
  }else {
    return state;
  }
};

export default reducer;
