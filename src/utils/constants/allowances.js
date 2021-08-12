export const ALLOWANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Account Information', service: '' },
  { value: 2, label: 'Holdings', service: 'holdings' },
  { value: 3, label: 'Transactions', service: 'transactions' },
];

export const ACCOUNT_INFO_FILTERS = [
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)' },
  { value: 'Account Type', stateVar:'accountType', label: 'ACCOUNT TYPE (Optional)' },
  { value: 'Account Name/Number', stateVar: 'accountNameNumber', label: 'ACCOUNT NAME/NUMBER (Optional)' },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)' },
  { value: 'Owner Operator', label: 'OWNER/OPERATOR (Optional)' },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
];

export const ALLOWANCE_HOLDINGS_FILTERS = [
  ...ACCOUNT_INFO_FILTERS,
  { value: 'Vintage Year', stateVar: 'vintageYear', label: 'VINTAGE YEAR (Optional)' },
];

export const ALLOWANCE_TRANSACTIONS_FILTERS = [
  ...ALLOWANCE_HOLDINGS_FILTERS,
  { value: 'Transaction Date', stateVar: 'transactionDate', label: 'TRANSACTION DATE (Optional)' },
  { value: 'transactionType', label: 'TRANSACTION TYPE (Optional)' },
];
