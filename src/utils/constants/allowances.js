import * as filterLogic from "../selectors/filterLogic";

export const ALLOWANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Account Information', service: 'accounts/attributes', required: ['none'] },
  { value: 2, label: 'Holdings', service: 'allowance-holdings', required: ['none'] },
  { value: 3, label: 'Transactions', service: 'allowance-transactions', required: ['Transaction Date'] },
];

export const ACCOUNT_INFO_FILTERS = [
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterProgram(filterCriteria) },
  { value: 'Account Type', stateVar:'accountType', label: 'ACCOUNT TYPE (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterAccountType(filterCriteria) },
  { value: 'Account Name/Number', stateVar: 'accountNameNumber', label: 'ACCOUNT NAME/NUMBER (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterAccountNameNumber(filterCriteria) },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)', 
    updateFilter: (filterCriteria) =>  filterLogic.filterFacility(filterCriteria) },
  { value: 'Owner/Operator', stateVar:'ownerOperator', label: 'OWNER/OPERATOR (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterOwnerOperator(filterCriteria) },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterStateTerritory(filterCriteria) },
];

export const ALLOWANCE_HOLDINGS_FILTERS = [
  ...ACCOUNT_INFO_FILTERS,
  { value: 'Vintage Year', stateVar: 'comboBoxYear', label: 'VINTAGE YEAR (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterComboBoxYear(filterCriteria) },
];

export const ALLOWANCE_TRANSACTIONS_FILTERS = [
  { value: 'Transaction Date', stateVar: 'transactionDate', label: 'TRANSACTION DATE (Required)' },
  ...ALLOWANCE_HOLDINGS_FILTERS,
  { value: 'Transaction Type', stateVar: 'transactionType', label: 'TRANSACTION TYPE (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterTransactionType(filterCriteria) },
];
