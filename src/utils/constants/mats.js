import { sharedFilters } from './emissions';
const timePeriodLabel = 'Time Period'

export const MATS_DATA_SUBTYPES = [
  { value: 1, label: 'Hourly Emissions', service: 'hourly', required: [timePeriodLabel] },
];

export const MATS_FILTERS = [
  { value: timePeriodLabel, stateVar: 'timePeriod', label: 'TIME PERIOD (Required)' },
  ...sharedFilters
];
