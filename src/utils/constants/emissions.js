export const EMISSIONS_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Hourly Emissions', service: 'hourly', required: ['Time Period'] },
  { value: 2, label: 'Daily Emissions', service: 'daily', required: ['Time Period'] },
  { value: 3, label: 'Monthly Emissions', service: 'monthly', required: ['Time Period'] },
  { value: 4, label: 'Quarterly Emissions', service: 'quarterly', required: ['Time Period'] },
  { value: 5, label: 'Ozone Season Emissions', service: 'ozone', required: ['Time Period'] },
  { value: 6, label: 'Annual Emissions', service: 'annual', required: ['Time Period'] },
  { value: 7, label: 'Facility/Unit Attributes', service: '', required: ['Time Period'] },
];

export const EMISSIONS_FILTERS = [
  { value: 'Time Period', stateVar: 'timePeriod', label: 'TIME PERIOD (Required)' },
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)' },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)' },
  { value: 'Unit Type', stateVar: 'unitType', label: 'UNIT TYPE (Optional)' },
  { value: 'Unit Fuel Type', stateVar: 'fuelType', label: 'UNIT FUEL TYPE (Optional)' },
  { value: 'Control Technology', stateVar: 'controlTechnology', label: 'CONTROL TECHNOLOGY (Optional)' },
];

export const FACILITY_UNIT_FILTERS = [
    ...EMISSIONS_FILTERS,
    { value: 'Source Category', stateVar: 'sourceCategory', label: 'SOURCE CATEGORY (Optional)' },
]