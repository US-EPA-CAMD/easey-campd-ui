export default {
  customDataDownload: {
    dataType: null,
    dataSubType: null,
    appliedFilters: [],
    dataPreview: null,
    totalCount: null,
  },
  hourlyEmissions: {
    timePeriod: {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
    },
    program: [],
    facility: []
  },
  apiCallsInProgress: 0,
};
