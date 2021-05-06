import * as types from "../../../actions/actionTypes";
import initialState from "../../initialState";

const reducer = (state = initialState.hourlyEmissions, action) => {
  switch (action.type){
    case types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD:
      return Object.assign({}, state, { timePeriod: action.selectedTimePeriod });
    case types.LOAD_EMISSIONS_PROGRAMS_SUCCESS:
      return Object.assign({}, state, { programs: action.programs });
    case types.HOURLY_EMISSIONS.UPDATE_PROGRAM_SELECTION:
      return Object.assign({}, state, { programs: action.selectedPrograms });
    default:
      return state;
  }
};

export default reducer;
