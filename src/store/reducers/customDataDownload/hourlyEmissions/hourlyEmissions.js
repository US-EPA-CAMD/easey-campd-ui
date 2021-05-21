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
    case types.LOAD_FACILITIES_SUCCESS:
      return Object.assign({}, state, { facility: action.facilities });
    case types.HOURLY_EMISSIONS.UPDATE_PROGRAM_SELECTION:
      return Object.assign({}, state, { program: action.program });
    case types.HOURLY_EMISSIONS.UPDATE_FACILITY_SELECTION:
      return Object.assign({}, state, { facility: action.facility });
    case types.LOAD_EMISSIONS_UNIT_TYPES_SUCCESS:
      return Object.assign({}, state, { unitType: action.unitType });
    case types.HOURLY_EMISSIONS.UPDATE_UNIT_TYPE_SELECTION:
      return Object.assign({}, state, { unitType: action.selectedUnitType });
    case types.LOAD_EMISSIONS_FUEL_TYPES_SUCCESS:
      return Object.assign({}, state, { fuelType: action.fuelType });
    case types.HOURLY_EMISSIONS.UPDATE_FUEL_TYPE_SELECTION:
      return Object.assign({}, state, { fuelType: action.selectedFuelType });
    case types.LOAD_EMISSIONS_STATES_SUCCESS:
      return Object.assign({}, state, { stateTerritory: action.states });
    case types.HOURLY_EMISSIONS.UPDATE_STATE_SELECTION:
      return Object.assign({}, state, { stateTerritory: action.stateSelection });
    default:
      return state;
  }
};

export default reducer;
