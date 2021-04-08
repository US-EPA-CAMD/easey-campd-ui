import * as types from "./actionTypes";

export function updateTimePeriod(timePeriod) {
  return {
    type: types.EMISSIONS.UPDATE_TIME_PERIOD,
    timePeriod,
  };
}

