export default {
  customDataDownload: {
    dataType: null,
    dataSubType: null,
    appliedFilters: [],
    dataPreview: null,
    totalCount: null,
  },
  filterCriteria: {
    timePeriod: {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: [],
      month: [],
      quarter: [],
    },
    program: [],
    facility: [],
    unitType: [],
    fuelType: [],
    stateTerritory: [],
    controlTechnology: [],
  },
  apiCallsInProgress: 0,
};
