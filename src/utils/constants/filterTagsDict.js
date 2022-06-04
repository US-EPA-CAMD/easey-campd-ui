import {formatDateToUi} from '../selectors/general'

const getSelectedLabels = (state, ids) =>
  // returning ids now but should return the commented out code below
     ids ;//state && state.filter((e) => e.selected).map((e) => e.label);
const getSelectedIds = (state, ids) => ids;
const getTimePeriodLabels = (selectedFilter) => {
  if (selectedFilter?.startDate){
    return [`${formatDateToUi(selectedFilter.startDate)} - ${formatDateToUi(selectedFilter.endDate)}`]
  } else {
    return  [selectedFilter.year?.yearString, 'filter tag year value']
  }
};
export const filterTagsDict = {
  accountNameNumber: {label: 'Account Name/Number', method: getSelectedLabels},
  accountTypeCode: { label: 'Account Type', method: getSelectedIds },
  comboBoxYear: { label: 'Year', method: getSelectedLabels},
  controlTechnology: { label: 'Control Technology', method: getSelectedIds },
  facility: { label: 'Facility', method: getSelectedLabels },
  fuelType: { label: 'Unit Fuel Type', method: getSelectedIds },
  ownerOperator: { label: 'Owner/Operator', method: getSelectedLabels },
  program: { label: 'Program', method: getSelectedIds },
  sourceCategory: { label: 'Source Category', method: getSelectedLabels },
  stateTerritory: { label: 'State/Territory', method: getSelectedLabels },
  timePeriod: { label: 'Time Period', method: getTimePeriodLabels},
  transactionType: { label: 'Transaction Type', method: getSelectedLabels },
  unitType: { label: 'Unit Type', method: getSelectedIds },
};
