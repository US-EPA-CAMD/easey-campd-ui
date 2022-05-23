import * as filterLogic from "../selectors/filterLogic";

const timePeriodLabel = 'Time Period'

export const EMISSIONS_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Hourly Emissions', service: 'hourly', required: [timePeriodLabel] },
  { value: 2, label: 'Daily Emissions', service: 'daily', required: [timePeriodLabel] },
  { value: 3, label: 'Monthly Emissions', service: 'monthly', required: [timePeriodLabel] },
  { value: 4, label: 'Quarterly Emissions', service: 'quarterly', required: [timePeriodLabel] },
  { value: 5, label: 'Ozone Season Emissions', service: 'ozone', required: [timePeriodLabel] },
  { value: 6, label: 'Annual Emissions', service: 'annual', required: [timePeriodLabel] },
];

export const sharedFilters = [
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)',
  updateFilter: (filterCriteria) =>  filterLogic.filterStateTerritory(filterCriteria) },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)',
  updateFilter: (filterCriteria) =>  filterLogic.filterFacility(filterCriteria) },
  { value: 'Unit Type', stateVar: 'unitType', label: 'UNIT TYPE (Optional)',
  updateFilter: (filterCriteria) =>  filterLogic.filterUnitType(filterCriteria) },
  { value: 'Unit Fuel Type', stateVar: 'fuelType', label: 'UNIT FUEL TYPE (Optional)',
  updateFilter: (filterCriteria) =>  filterLogic.filterFuelType(filterCriteria) },
  { value: 'Control Technology', stateVar: 'controlTechnology', label: 'CONTROL TECHNOLOGY (Optional)',
  updateFilter: (filterCriteria) =>  filterLogic.filterControlTechnology(filterCriteria)  }
];
export const EMISSIONS_FILTERS = [
  { value: timePeriodLabel, stateVar: 'timePeriod', label: 'TIME PERIOD (Required)' },
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterProgram(filterCriteria)},
  ...sharedFilters
];

export const EMISSIONS_AGGREGATION = [
  {value: 'Unit (No Aggregation)', service: '', label: 'Unit (No Aggregation)'},
  {value: 'Facility', service: 'by-facility', label: 'Facility'},
  {value: 'State', service: 'by-state', label: 'State'},
  {value: 'National', service: 'nationally', label: 'National'},
]
