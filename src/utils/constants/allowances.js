export const ALLOWANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Account Information', service: 'accounts/attributes', required: ['none'] },
  { value: 2, label: 'Holdings', service: 'allowance-holdings', required: ['none'] },
  { value: 3, label: 'Transactions', service: 'allowance-transactions', required: ['Transaction Date'] },
];

export const ACCOUNT_INFO_FILTERS = [
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)' },
  { value: 'Account Type', stateVar:'accountType', label: 'ACCOUNT TYPE (Optional)' },
  { value: 'Account Name/Number', stateVar: 'accountNameNumber', label: 'ACCOUNT NAME/NUMBER (Optional)' },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)' },
  { value: 'Owner/Operator', stateVar:'ownerOperator', label: 'OWNER/OPERATOR (Optional)' },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
];

export const ALLOWANCE_HOLDINGS_FILTERS = [
  ...ACCOUNT_INFO_FILTERS,
  { value: 'Vintage Year', stateVar: 'vintageYear', label: 'VINTAGE YEAR (Optional)' },
];

export const ALLOWANCE_TRANSACTIONS_FILTERS = [
  { value: 'Transaction Date', stateVar: 'transactionDate', label: 'TRANSACTION DATE (Required)' },
  ...ALLOWANCE_HOLDINGS_FILTERS,
  { value: 'Transaction Type', stateVar: 'transactionType', label: 'TRANSACTION TYPE (Optional)' },
];
