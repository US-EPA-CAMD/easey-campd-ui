import {formatDateToUi} from '../selectors/general'

export const getSelectedLabels = (state, ids) => state?.filter((e) => e.selected).map((e) => e.label);
export const getSelectedIds = (state, ids) => ids;
export const findMonthsOrQuarters = (state) => {
  let monthsOrQuarters = '; ';
  let addedMonthsOrQuarters = 0;
  if(state.month?.length){
     state.month.forEach(month => {
      if (month.selected) {
      addedMonthsOrQuarters> 0? monthsOrQuarters += ', ' + month.label : monthsOrQuarters += month.label;
      addedMonthsOrQuarters +=1;
      }
    })
    return monthsOrQuarters;
  } else if (state.quarter?.length){
    state.quarter.forEach(quarter => {
      if (quarter.selected) {
       addedMonthsOrQuarters> 0? monthsOrQuarters += ', ' + quarter.label : monthsOrQuarters += quarter.label;
       addedMonthsOrQuarters +=1;
     }
   })
    return monthsOrQuarters;
  }
  return '';
}
export const getTimePeriodLabels = (selectedFilter) => {
  if (selectedFilter?.startDate){
    return [`${formatDateToUi(selectedFilter.startDate)} - ${formatDateToUi(selectedFilter.endDate)}`]
  } else {
    return  [selectedFilter.year?.yearString + findMonthsOrQuarters(selectedFilter), 'filter tag year value']
  }
};
export const filterTagsDict = {
  accountNameNumber: {label: 'Account Name/Number', method: getSelectedLabels},
  accountType: { label: 'Account Type', method: getSelectedIds },
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
  transactionDate: { label: 'Transaction Date', method: getTimePeriodLabels},
  unitType: { label: 'Unit Type', method: getSelectedIds},
};
