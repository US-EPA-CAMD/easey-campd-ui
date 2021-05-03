export const COMPLIANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Allowance Based' },
  { value: 2, label: 'Emissions Based' },
];

export const EMISSIONS_BASED_FILTERS = [
  { value: 'facility', label: 'FACILITY (Optional)' },
  { value: 'ownerOperator', label: 'OWNER/OPERATOR (Optional)' },
  { value: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
  { value: 'year', label: 'YEAR (Optional)' },
];

export const ALLOWANCE_BASED_FILTERS = [
  { value: 'program', label: 'PROGRAM (Optional)' },
  ...EMISSIONS_BASED_FILTERS,
];
