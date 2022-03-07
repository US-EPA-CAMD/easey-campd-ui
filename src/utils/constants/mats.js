import * as filterLogic from "../selectors/filterLogic";
const timePeriodLabel = 'Time Period'

export const MATS_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Hourly Emissions', service: 'hourly', required: [timePeriodLabel] },
];

export const MATS_FILTERS = [
  { value: timePeriodLabel, stateVar: 'timePeriod', label: 'TIME PERIOD (Required)' },
  { value: 'State/Territory', stateVar: 'stateTerritory', label: 'STATE/TERRITORY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterStateTerritory(filterCriteria) },
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterFacility(filterCriteria) },
  { value: 'Unit Type', stateVar: 'unitType', label: 'UNIT TYPE (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterUnitType(filterCriteria) },
  { value: 'Unit Fuel Type', stateVar: 'fuelType', label: 'UNIT FUEL TYPE (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterFuelType(filterCriteria) },
  { value: 'Control Technology', stateVar: 'controlTechnology', label: 'CONTROL TECHNOLOGY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterControlTechnology(filterCriteria)  },
];
