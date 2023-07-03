import filterCriteriaReducer from "./filterCriteria";
import * as actions from "../../actions/customDataDownload/filterCriteria";
import initialState from "../initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes} from "../../../utils/selectors/filterCriteria";
import { mockProgram, mockFacilities, mockSourceCategories, mockStateTerritory, mockTransactionTypes, mockOwnerOperators, mockControlTechnologies, mockUnitType, mockFuelType, mockNameNumbers } from "../../../components/filterCriteria/mocks/mocks";
import * as types from '../../actions/actionTypes';
import { mockFilterMapping } from "../../mocks/mocks";

describe("- filterCriteria Reducer - ", () => {
  it("should update state when update time period is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const action = {
      type: types.UPDATE_TIME_PERIOD,
      timePeriod,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.timePeriod.startDate).toEqual(timePeriod.startDate);
    expect(newState.timePeriod.endDate).toEqual(timePeriod.endDate);
    expect(newState.timePeriod.opHrsOnly).toEqual(timePeriod.opHrsOnly);
  });
  it("should update state when update program is dispatched", () => {
    const program = restructurePrograms([...mockProgram]);
    const action = {
      type: types.UPDATE_PROGRAM_SELECTION,
      program,
    };

    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.program[0].items.length).toEqual(3);
    expect(newState.program[1].items.length).toEqual(1);
  });
  it("should update state when update facility is dispatched", () => {
    const facilities = [...mockFacilities].map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true}));
    const action = {
      type: types.UPDATE_FACILITY_SELECTION,
      facility: facilities,
    };
    
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.facility).toEqual(facilities);
  });

  it("should update state when update sourceCategories is dispatched", () => {
    const sourceCategories = [...mockSourceCategories].map(f=> ({id: f.sourceCategoryCode, label:f.sourceCategoryDescription, selected:false, enabled:true}));
    const action = {
      type: types.UPDATE_SOURCE_CATEGORY_SELECTION,
      sourceCategory:sourceCategories
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.sourceCategory).toEqual(sourceCategories);
  });

  it("should update state when update states is dispatched", () => {
    const stateTerritory = [...mockStateTerritory].map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}));
    const action = {
      type: types.UPDATE_STATE_SELECTION,
      stateTerritory,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.stateTerritory).toEqual(stateTerritory);
  });

  it("should update state when update transactionType is dispatched", () => {
    const transactionType = [...mockTransactionTypes].map(t=> ({id: t.transactionTypeDescription, label: t.transactionTypeDescription, selected:false, enabled:true}));
    const action = {
      type: types.UPDATE_TRANSACTION_TYPE_SELECTION,
      transactionType,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.transactionType).toEqual(transactionType);
  });

  it("should update state when load filter mapping is dispatched", () => {
    const filterMapping = [...mockFilterMapping];
    const action = {
      type: types.LOAD_FILTER_MAPPING_SUCCESS,
      filterMapping
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.filterMapping).toEqual(filterMapping);
  });

  it("should update state when update ownderoperator is dispatched", () => {
    const ownerOperators = [...mockOwnerOperators];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    const formattedOwnerOpers = distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}));
    const action = {
      type: types.UPDATE_OWNER_OPERATOR_SELECTION,
      ownerOperator : formattedOwnerOpers,
    }
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.ownerOperator).toEqual(formattedOwnerOpers);
  });

  it("should update state when update control tech is dispatched", () => {
    const controlTechnology = restructureControlTechnologies([...mockControlTechnologies]);
    const action = {
      type: types.UPDATE_CONTROL_TECHNOLOGY_SELECTION,
      controlTechnology,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.controlTechnology).toEqual(controlTechnology);
  });

  it("should update state when update unit types is dispatched", () => {
    const unitType = restructureUnitTypes([...mockUnitType]);
    const action = {
      type: types.UPDATE_UNIT_TYPE_SELECTION,
      unitType,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.unitType).toEqual(unitType);
  });

  it("should update state when update fuel types is dispatched", () => {
    const fuelType = restructureFuelTypes([...mockFuelType]);
    const action = {
      type: types.UPDATE_FUEL_TYPE_SELECTION,
      fuelType,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.fuelType).toEqual(fuelType);
  });
  it("should update state when update acct name number is dispatched", () => {
    const accountNameNumber = [...mockNameNumbers].map((ann) => ({
      id: ann.accountNumber,
      label: `${ann.accountName} (${ann.accountNumber})`,
      selected: false,
      enabled:true
    }));
    const action = {
      type: types.UPDATE_ACCOUNT_NAME_NUMBER_SELECTION,
      accountNameNumber,
    };
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);
    expect(newState.accountNameNumber).toEqual(accountNameNumber);
  });
});
