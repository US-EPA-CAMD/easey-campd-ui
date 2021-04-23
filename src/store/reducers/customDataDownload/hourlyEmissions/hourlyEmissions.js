import * as types from "../../../actions/actionTypes";
import initialState from "../../initialState";

const reducer = (state = initialState.hourlyEmissions, action) => {
  if(action.type === types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD){
    return Object.assign({}, state, { timePeriod: action.selectedTimePeriod });
  }else{
    return state;
  }
};

export default reducer;
