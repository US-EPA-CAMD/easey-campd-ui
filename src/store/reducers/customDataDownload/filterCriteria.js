import { resetFilterHelper } from '../../../utils/selectors/filterCriteria';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

const reducer = (state = initialState.filterCriteria, action) => {
  switch (action.type) {
    case types.UPDATE_TIME_PERIOD:
      return Object.assign({}, state, { timePeriod: action.timePeriod });
    case types.RESET_FILTER:
      return {
        ...resetFilterHelper(state, action.reset.filterToReset, action.reset.resetAll)
      };
    case types.LOAD_PROGRAMS_SUCCESS:
      return Object.assign({}, state, { program: action.program });
    case types.UPDATE_PROGRAM_SELECTION:
      return Object.assign({}, state, { program: action.program });
    case types.LOAD_FACILITIES_SUCCESS:
      return Object.assign({}, state, { facility: action.facility });
    case types.UPDATE_FACILITY_SELECTION:
      return Object.assign({}, state, { facility: action.facility });
    case types.LOAD_UNIT_TYPES_SUCCESS:
      return Object.assign({}, state, { unitType: action.unitType });
    case types.UPDATE_UNIT_TYPE_SELECTION:
      return Object.assign({}, state, { unitType: action.unitType });
    case types.LOAD_FUEL_TYPES_SUCCESS:
      return Object.assign({}, state, { fuelType: action.fuelType });
    case types.UPDATE_FUEL_TYPE_SELECTION:
      return Object.assign({}, state, { fuelType: action.fuelType });
    case types.LOAD_STATES_SUCCESS:
      return Object.assign({}, state, { stateTerritory: action.stateTerritory });
    case types.UPDATE_STATE_SELECTION:
      return Object.assign({}, state, { stateTerritory: action.stateTerritory });
    case types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS:
      return Object.assign({}, state, { controlTechnology: action.controlTechnology });
    case types.UPDATE_CONTROL_TECHNOLOGY_SELECTION:
      return Object.assign({}, state, { controlTechnology: action.controlTechnology });
    case types.LOAD_ACCOUNT_TYPES_SUCCESS:
      return Object.assign({}, state, { accountType: action.accountType });
    case types.UPDATE_ACCOUNT_TYPE_SELECTION:
      return Object.assign({}, state, { accountType: action.accountType });
    case types.LOAD_ACCOUNT_NAME_NUMBER_SUCCESS:
      return Object.assign({}, state, { accountNameNumber: action.accountNameNumber });
    case types.UPDATE_ACCOUNT_NAME_NUMBER_SELECTION:
      return Object.assign({}, state, { accountNameNumber: action.accountNameNumber });
    case types.LOAD_OWNER_OPERATOR_SUCCESS:
      return Object.assign({}, state, { ownerOperator: action.ownerOperator });
    case types.UPDATE_OWNER_OPERATOR_SELECTION:
      return Object.assign({}, state, { ownerOperator: action.ownerOperator });
    case types.LOAD_TRANSACTION_TYPE_SUCCESS:
      return Object.assign({}, state, { transactionType: action.transactionType });
    case types.UPDATE_TRANSACTION_TYPE_SELECTION:
      return Object.assign({}, state, { transactionType: action.transactionType });
    case types.LOAD_FILTER_MAPPING_SUCCESS:
      return Object.assign({}, state, { filterMapping: action.filterMapping });
    default:
      return state;
  }
};

export default reducer;
