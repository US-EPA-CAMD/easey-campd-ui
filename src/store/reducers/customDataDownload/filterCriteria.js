import {produce} from 'immer';
import { resetFilterHelper } from '../../../utils/selectors/filterCriteria';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

const reducer = (state = initialState.filterCriteria, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_TIME_PERIOD:
        draft.timePeriod = action.timePeriod;
        break;
      case types.RESET_FILTER:
        const resetFilterResult = resetFilterHelper(
          draft,
          action.reset.filterToReset,
          action.reset.resetAll
        );
        Object.assign(draft, resetFilterResult);
        break;
      case types.LOAD_PROGRAMS_SUCCESS:
        draft.program = action.program;
        break;
      case types.UPDATE_PROGRAM_SELECTION:
        draft.program = action.program;
        break;
      case types.LOAD_FACILITIES_SUCCESS:
        draft.facility = action.facility;
        break;
      case types.UPDATE_FACILITY_SELECTION:
        draft.facility = action.facility;
        break;
      case types.LOAD_UNIT_TYPES_SUCCESS:
        draft.unitType = action.unitType;
        break;
      case types.UPDATE_UNIT_TYPE_SELECTION:
        draft.unitType = action.unitType;
        break;
      case types.LOAD_FUEL_TYPES_SUCCESS:
        draft.fuelType = action.fuelType;
        break;
      case types.UPDATE_FUEL_TYPE_SELECTION:
        draft.fuelType = action.fuelType;
        break;
      case types.LOAD_STATES_SUCCESS:
        draft.stateTerritory = action.stateTerritory;
        break;
      case types.UPDATE_STATE_SELECTION:
        draft.stateTerritory = action.stateTerritory;
        break;
      case types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS:
        draft.controlTechnology = action.controlTechnology;
        break;
      case types.UPDATE_CONTROL_TECHNOLOGY_SELECTION:
        draft.controlTechnology = action.controlTechnology;
        break;
      case types.LOAD_ACCOUNT_TYPES_SUCCESS:
        draft.accountType = action.accountType;
        break;
      case types.UPDATE_ACCOUNT_TYPE_SELECTION:
        draft.accountType = action.accountType;
        break;
      case types.LOAD_ACCOUNT_NAME_NUMBER_SUCCESS:
        draft.accountNameNumber = action.accountNameNumber;
        break;
      case types.UPDATE_ACCOUNT_NAME_NUMBER_SELECTION:
        draft.accountNameNumber = action.accountNameNumber;
        break;
      case types.LOAD_OWNER_OPERATOR_SUCCESS:
        draft.ownerOperator = action.ownerOperator;
        break;
      case types.UPDATE_OWNER_OPERATOR_SELECTION:
        draft.ownerOperator = action.ownerOperator;
        break;
      case types.LOAD_TRANSACTION_TYPE_SUCCESS:
        draft.transactionType = action.transactionType;
        break;
      case types.UPDATE_TRANSACTION_TYPE_SELECTION:
        draft.transactionType = action.transactionType;
        break;
      case types.LOAD_SOURCE_CATEGORY_SUCCESS:
        draft.sourceCategory = action.sourceCategory;
        break;
      case types.UPDATE_SOURCE_CATEGORY_SELECTION:
        draft.sourceCategory = action.sourceCategory;
        break;
      case types.LOAD_FILTER_MAPPING_SUCCESS:
        draft.filterMapping = action.filterMapping;
        break;
      case types.UPDATE_FILTER_CRITERIA:
        Object.assign(draft, action.itemsToUpdate);
        break;
      case types.RESET_FILTER_CRITERIA_ITEMS:
        action.itemsToReset.forEach(item => {
          draft[item] = initialState.filterCriteria[item];
        });
        break;
      default:
        break;
    }
  });
};

export default reducer;
