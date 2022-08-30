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
    filterLogicEngaged: false
  },
  bulkDataFiles:{
    dataTable: null
  },
  apiErrors: {
    bulkDataFiles: {state: false, message: ''},
    contentManager: {state: false, message: ''},
    dataPreview: {state: false, message: ''},
    download: {state: false, message: ''},
    filterLogic: {state: false, message: ''},
    MDMRetrieval: {state: false, message: ''},
    s3Outage: {state: false, message: ''},
  },
  apiCallsInProgress: 0,
  hideNav: false
};
