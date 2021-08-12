export const COMPLIANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Allowance Based', required: ['none'] },
  { value: 2, label: 'Emissions Based', required: ['none'] },
];

export const EMISSIONS_BASED_FILTERS = [
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)' },
  { value: 'Owner Operator', label: 'OWNER/OPERATOR (Optional)' },
  { value: 'State/Territory', stateVar: 'stateTerritory',  label: 'STATE/TERRITORY (Optional)' },
  { value: 'Year', label: 'YEAR (Optional)' },
];

export const ALLOWANCE_BASED_FILTERS = [
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)' },
  ...EMISSIONS_BASED_FILTERS,
];
