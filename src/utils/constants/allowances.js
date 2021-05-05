export const ALLOWANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Account Information' },
  { value: 2, label: 'Holdings' },
  { value: 3, label: 'Transactions' },
];

export const ACCOUNT_INFO_FILTERS = [
  { value: 'program', label: 'PROGRAM (Optional)' },
  { value: 'accountType', label: 'ACCOUNT TYPE (Optional)' },
  { value: 'accountNumber', label: 'ACCOUNT NUMBER/NAME (Optional)' },
  { value: 'facility', label: 'FACILITY (Optional)' },
  { value: 'ownerOperator', label: 'OWNER/OPERATOR (Optional)' },
  { value: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
];

export const ALLOWANCE_HOLDINGS_FILTERS = [
  ...ACCOUNT_INFO_FILTERS,
  { value: 'vintageYear', label: 'VINTAGE YEAR (Optional)' },
];

export const ALLOWANCE_TRANSACTIONS_FILTERS = [
  ...ALLOWANCE_HOLDINGS_FILTERS,
  { value: 'transactionDate', label: 'TRANSACTION DATE (Optional)' },
  { value: 'transactionType', label: 'TRANSACTION TYPE (Optional)' },
];
