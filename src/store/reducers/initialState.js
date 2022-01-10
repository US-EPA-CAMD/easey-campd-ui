export default {
  customDataDownload: {
    dataType: '',
    dataSubType: '',
    appliedFilters: [],
    dataPreview: null,
    totalCount: null,
    fieldMappings: [],
  },
  filterCriteria: {
    timePeriod: {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: {
        yearArray: [],
        yearString: '',
      },
      comboBoxYear: [],
      month: [],
      quarter: [],
    },
    program: [],
    facility: [],
    unitType: [],
    fuelType: [],
    stateTerritory: [],
    controlTechnology: [],
    accountType: [],
    accountNameNumber: [],
    ownerOperator: [],
    transactionType: [],
    sourceCategory: [],
    filterMapping: [],
  },
  apiCallsInProgress: 0,
  hideNav: false
};
