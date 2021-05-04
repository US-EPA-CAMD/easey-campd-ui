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
  { value: 'timePeriod', label: 'TIME PERIOD (Required)' },
  { value: 'program', label: 'PROGRAM (Optional)' },
  { value: 'stateTerritory', label: 'STATE/TERRITORY (Optional)' },
  { value: 'facility', label: 'FACILITY (Optional)' },
  { value: 'unitType', label: 'UNIT TYPE (Optional)' },
  { value: 'unitFuelType', label: 'UNIT FUEL TYPE (Optional)' },
  { value: 'controlTechnology', label: 'CONTROL TECHNOLOGY (Optional)' },
];

export const FACILITY_UNIT_FILTERS = [
    ...EMISSIONS_FILTERS,
    { value: 'sourceCategory', label: 'SOURCE CATEGORY (Optional)' },
]

export const HOURLY_EMISSIONS_REQUIRED_FILTERS = ['timePeriod'];
