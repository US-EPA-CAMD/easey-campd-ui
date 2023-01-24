export default {
  customDataDownload: {
    dataType: '',
    dataSubType: '',
    aggregation: '',
    appliedFilters: [],
    dataPreview: null,
    totalCount: null,
    fieldMappings: [],
    excludableColumns: [],
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
    excludeParams: [],
    selectedColumns: [],
    columnState: null,
    sortArrowUp: null,
    filterLogicEngaged: false
  },
  bulkDataFiles:{
    dataTable: null
  },
  apiErrors: {
    bulkDataFiles: false,
    contentManager: false,
    dataPreview: false,
    download: false,
    filterLogic: false,
    MDMRetrieval: false,
    s3Outage: false,
    errorMessages: null,
  },
  apiCallsInProgress: 0,
  hideNav: false
};
