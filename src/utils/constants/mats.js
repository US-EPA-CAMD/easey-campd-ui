const timePeriodLabel = 'Time Period'

export const MATS_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Hourly Emissions', service: 'hourly', required: [timePeriodLabel] },
];

export const MATS_FILTERS = [
  { value: timePeriodLabel, stateVar: 'timePeriod', label: 'TIME PERIOD (Required)' },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)'},
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)'},
  { value: 'Unit Type', stateVar: 'unitType', label: 'UNIT TYPE (Optional)'},
  { value: 'Unit Fuel Type', stateVar: 'fuelType', label: 'UNIT FUEL TYPE (Optional)'},
  { value: 'Control Technology', stateVar: 'controlTechnology', label: 'CONTROL TECHNOLOGY (Optional)'}
];
