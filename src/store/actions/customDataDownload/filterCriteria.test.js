import * as actions from "./filterCriteria";
import * as types from "../actionTypes";
import thunk from "redux-thunk";
import initState from "../../reducers/initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes, restructureAccountTypes, resetFilterHelper, resetCheckBoxItems, resetComboBoxItems, getComboboxEnabledItems, getComboboxSelectedItems} from "../../../utils/selectors/filterCriteria";
import { cleanup } from '@testing-library/react';
import createMockStore from "redux-mock-store";
import * as data from "../../../components/filterCriteria/mocks/mocks";
import { mockFacilities } from "../../mocks/mocks";
import * as filterCriteriaApi from '../../../utils/api/filterCriteriaApi';

// Test an async action
const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe("- Filter Criteria Async Actions -", () => {
  afterEach(cleanup);
  it("should create appropriate action when update time period action is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const expectedAction = { type: types.UPDATE_TIME_PERIOD, timePeriod: timePeriod };

    const actionDispached  = actions.updateTimePeriod(timePeriod);
    expect(actionDispached).toEqual(expectedAction);
  });

  it('should dispach appropriate actions for loadAllFilters action dispacher', () => {
    const mockGetDataFromMDM= jest.fn().mockResolvedValue({data: []});
    jest.spyOn(filterCriteriaApi, "getPrograms").mockImplementation(mockGetDataFromMDM); 
    jest.spyOn(filterCriteriaApi, "getAllFacilities").mockImplementation(mockGetDataFromMDM); 
    jest.spyOn(filterCriteriaApi, "getStates").mockImplementation(mockGetDataFromMDM); 
    const mockGetControlTechnologies = jest.fn().mockResolvedValue({data: [...data.mockControlTechnologies]});
    jest.spyOn(filterCriteriaApi, "getControlTechnologies").mockImplementation(mockGetControlTechnologies); 
    jest.spyOn(filterCriteriaApi, "getUnitTypes").mockImplementation(mockGetDataFromMDM); 
    jest.spyOn(filterCriteriaApi, "getFuelTypes").mockImplementation(mockGetDataFromMDM); 

    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_PROGRAMS_SUCCESS,
        program: restructurePrograms([])
      },
      {
        type: types.LOAD_STATES_SUCCESS,
        stateTerritory: []
      },
      {
        type: types.LOAD_FACILITIES_SUCCESS,
        facility: []
      },
      {
        type: types.LOAD_UNIT_TYPES_SUCCESS,
        unitType: [],
      },
      {
        type: types.LOAD_FUEL_TYPES_SUCCESS,
        fuelType: [],
      },
      {
        type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS,
        controlTechnology: restructureControlTechnologies([...data.mockControlTechnologies]),
      },
    ];

    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadAllFilters(
          'EMISSIONS',
          'Hourly Emissions',
          initState.filterCriteria
        )
      )
      .then(() => {
        expect(mockGetDataFromMDM).toHaveBeenCalledTimes(5);
        expect(mockGetControlTechnologies).toHaveBeenCalled();
        const storeActions = store.getActions();
        console.log({storeActions});
        expect(storeActions).toEqual(expectedActions);
      });
  });

  it("should dispatch appropriate actions for loadFilterMapping", () => {
    const mockGetFilterMapping = jest.fn().mockResolvedValue({data: [...data.mockFilterMapping]});
    jest.spyOn(filterCriteriaApi, "getFilterMapping").mockImplementation(mockGetFilterMapping); 
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_FILTER_MAPPING_SUCCESS,
        filterMapping: [...data.mockFilterMapping]
      }];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadFilterMapping('COMPLIANCE','Allowance Based')
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should dispach appropriate actions for resetFilterCriteriaItems",()=>{
    const expectedActions = [
      {
        type: types.RESET_FILTER_CRITERIA_ITEMS,
        itemsToReset: [],
      },
    ];
    const store = mockStore(initState);
    store.dispatch(actions.resetFilterCriteriaItems([]));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should dispach appropriate actions for updateFilterCriteria",()=>{
    const expectedActions = [
      {
        type: types.UPDATE_FILTER_CRITERIA,
        itemsToUpdate: [],
      },
    ];
    const store = mockStore(initState);
    store.dispatch(actions.updateFilterCriteria([]));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should dispach appropriate actions for updateSourceCategorySelection",()=>{
    const expectedActions = [
      {
        type: types.UPDATE_SOURCE_CATEGORY_SELECTION,
        sourceCategory: [],
      },
    ];
    const store = mockStore(initState);
    store.dispatch(actions.updateSourceCategorySelection([]));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should dispach appropriate actions for resetFilter",()=>{
    const expectedActions = [
      {
        type: types.RESET_FILTER,
        reset: {
          filterToReset:"filterToReset",
          resetAll: false,
        },
      },
    ];
    const store = mockStore(initState);
    store.dispatch(actions.resetFilter("filterToReset"));
    expect(store.getActions()).toEqual(expectedActions);
  })
});

