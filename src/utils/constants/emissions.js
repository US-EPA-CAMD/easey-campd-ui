export const EMISSIONS_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Hourly Emissions' },
  { value: 2, label: 'Daily Emissions' },
  { value: 3, label: 'Monthly Emissions' },
  { value: 4, label: 'Quarterly Emissions' },
  { value: 5, label: 'Ozone Season Emissions' },
  { value: 6, label: 'Annual Emissions' },
  { value: 7, label: 'Facility/Unit Attributes' },
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

export const HOURLY_EMISSIONS_REQUIRED_FILTERS = ['Time Period'];
