import * as actions from "./hourlyEmissions";
import * as types from "../../actionTypes";

describe("Emissions Filter Async Actions", () => {
  it("should create appropriate action when update time period action is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const expectedAction = { type: types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD, selectedTimePeriod: timePeriod };

    const actionDispached  = actions.updateTimePeriod(timePeriod);
    expect(actionDispached).toEqual(expectedAction);
  });
});

