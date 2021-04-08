import emissionsFilterReducer from "./emissionsFilter";
import * as actions from "../actions/emissionsFilter";
import initialState from "./initialState";

describe("Emissions Filter Reducer", () => {
  it("should update state when update time period is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const action = actions.updateTimePeriod(timePeriod);
    const newState = emissionsFilterReducer(initialState.emissionsFilter, action);

    expect(newState.timePeriod.startDate).toEqual(timePeriod.startDate);
    expect(newState.timePeriod.endDate).toEqual(timePeriod.endDate);
    expect(newState.timePeriod.opHrsOnly).toEqual(timePeriod.opHrsOnly);
  });
});
