import * as filterLogic from "../selectors/filterLogic";

export const COMPLIANCES_DATA_SUBTYPES = [
  { value: '', label: '- Select -' },
  { value: 1, label: 'Allowance Based', service: 'allowance-compliance', required: ['none'] },
  { value: 2, label: 'Emissions Based', service: 'emissions-compliance', required: ['none'] },
];

export const EMISSIONS_BASED_FILTERS = [
  { value: 'Facility', stateVar: 'facility', label: 'FACILITY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterFacility(filterCriteria) },
  { value: 'Owner/Operator',stateVar:'ownerOperator', label: 'OWNER/OPERATOR (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterOwnerOperator(filterCriteria) },
  { value: 'State/Territory', stateVar: 'stateTerritory',  label: 'STATE/TERRITORY (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterStateTerritory(filterCriteria) },
  { value: 'Year', stateVar: 'comboBoxYear', label: 'YEAR (Optional)' ,
    updateFilter: (filterCriteria) =>  filterLogic.filterComboBoxYear(filterCriteria) },
];

export const ALLOWANCE_BASED_FILTERS = [
  { value: 'Program', stateVar: 'program', label: 'PROGRAM (Optional)',
    updateFilter: (filterCriteria) =>  filterLogic.filterProgram(filterCriteria) },
  ...EMISSIONS_BASED_FILTERS,
];
