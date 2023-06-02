import {
  getSelectedLabels,
  getSelectedIds,
  findMonthsOrQuarters,
  getTimePeriodLabels,
  filterTagsDict,
} from "./filterTagsDict";

describe("getSelectedLabels", () => {
  test("returns an array of selected labels", () => {
    const state = [
      { label: "Label 1", selected: true },
      { label: "Label 2", selected: false },
      { label: "Label 3", selected: true },
    ];
    const result = getSelectedLabels(state);
    expect(result).toEqual(["Label 1", "Label 3"]);
  });

  test("returns an empty array when no selected labels are found", () => {
    const state = [
      { label: "Label 1", selected: false },
      { label: "Label 2", selected: false },
    ];
    const result = getSelectedLabels(state);
    expect(result).toEqual([]);
  });
});

describe("getSelectedIds", () => {
  test("returns the provided IDs", () => {
    const state = [1, 2, 3];
    const ids = [3, 2, 1];
    const result = getSelectedIds(state, ids);
    expect(result).toEqual(ids);
  });
});

describe("findMonthsOrQuarters", () => {
  test("returns a string of selected months or quarters", () => {
    const state = {
      month: [
        { label: "Jan", selected: false },
        { label: "Feb", selected: true },
        { label: "Mar", selected: true },
      ],
    };
    const result = findMonthsOrQuarters(state);
    expect(result).toBe("; Feb, Mar");
  });

  test("returns a string of selected quarters", () => {
    const state = {
      quarter: [
        { label: "Q1", selected: true },
        { label: "Q2", selected: true },
        { label: "Q3", selected: false },
      ],
    };
    const result = findMonthsOrQuarters(state);
    expect(result).toBe("; Q1, Q2");
  });

  test("returns an empty string when no months or quarters are selected", () => {
    const state = {};
    const result = findMonthsOrQuarters(state);
    expect(result).toBe("");
  });
});

describe("getTimePeriodLabels", () => {
  test("returns an array with formatted start and end dates", () => {
    const selectedFilter = {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    };
    const result = getTimePeriodLabels(selectedFilter);
    expect(result).toEqual(["01/01/2023 - 12/31/2023"]);
  });

  test("returns an array with year string and months/quarters", () => {
    const selectedFilter = {
      year: { yearString: "2022" },
      month: [
        { label: "Jan", selected: false },
        { label: "Feb", selected: true },
      ],
    };
    const result = getTimePeriodLabels(selectedFilter);
    expect(result).toEqual(["2022; Feb", "filter tag year value"]);
  });
});

describe("filterTagsDict", () => {
  test("contains the correct keys and values", () => {
    expect(filterTagsDict).toEqual({
      accountNameNumber: {
        label: "Account Name/Number",
        method: getSelectedLabels,
      },
      accountType: { label: "Account Type", method: getSelectedIds },
      comboBoxYear: { label: "Year", method: getSelectedLabels },
      controlTechnology: {
        label: "Control Technology",
        method: getSelectedIds,
      },
      facility: { label: "Facility", method: getSelectedLabels },
      fuelType: { label: "Unit Fuel Type", method: getSelectedIds },
      ownerOperator: { label: "Owner/Operator", method: getSelectedLabels },
      program: { label: "Program", method: getSelectedIds },
      sourceCategory: { label: "Source Category", method: getSelectedLabels },
      stateTerritory: { label: "State/Territory", method: getSelectedLabels },
      timePeriod: { label: "Time Period", method: getTimePeriodLabels },
      transactionType: { label: "Transaction Type", method: getSelectedLabels },
      transactionDate: {
        label: "Transaction Date",
        method: getTimePeriodLabels,
      },
      unitType: { label: "Unit Type", method: getSelectedIds },
    });
  });
});
