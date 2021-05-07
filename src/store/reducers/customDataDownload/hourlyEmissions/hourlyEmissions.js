import { resetFilterHelper } from '../../../../utils/selectors/hourlyEmissions';
import * as types from '../../../actions/actionTypes';
import initialState from '../../initialState';

const reducer = (state = initialState.hourlyEmissions, action) => {
  switch (action.type) {
    case types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD:
      return Object.assign({}, state, { timePeriod: action.selectedTimePeriod });
    case types.HOURLY_EMISSIONS.RESET_FILTER:
      return {
        ...resetFilterHelper(state, action.reset.filterToReset, action.reset.resetAll)
      };
    case types.LOAD_EMISSIONS_PROGRAMS_SUCCESS:
      return Object.assign({}, state, { program: action.program });
    case types.HOURLY_EMISSIONS.UPDATE_PROGRAM_SELECTION:
      return Object.assign({}, state, { program: action.selectedProgram });
    default:
      return state;
  }
};

export default reducer;
