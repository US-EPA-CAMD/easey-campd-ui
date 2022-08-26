import { constructQuery, constructComboBoxQuery } from './filterCriteria';
import {
  formatMonthsToApiOrString,
  formatQuartersToApiOrString,
} from './general';

export const constructTimePeriodQuery = (dataSubType, filterCriteria, isMatsDataType) => {
  switch (dataSubType.toLowerCase()) {
    case 'hourly emissions':
      return `&beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}&operatingHoursOnly=${filterCriteria.timePeriod.opHrsOnly}`;
    case 'daily emissions':
      return `&beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}`;
    case 'monthly emissions':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'year',
        true
      )}${constructQuery(
        formatMonthsToApiOrString(filterCriteria.timePeriod.month),
        'month',
        true
      )}`;
    case 'quarterly emissions':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'year',
        true
      )}${constructQuery(
        formatQuartersToApiOrString(filterCriteria.timePeriod.quarter),
        'quarter',
        true
      )}`;
    case 'ozone season emissions':
    case 'annual emissions':
    case 'facility/unit attributes':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'year',
        true
      )}`;
    case 'holdings':
      return `${constructComboBoxQuery(
        filterCriteria.timePeriod.comboBoxYear,
        'vintageYear'
      )}`;
    case 'transactions':
      let timePeriodQuery = '&';
      if (
        filterCriteria.timePeriod.startDate &&
        filterCriteria.timePeriod.endDate
      ) {
        timePeriodQuery += `transactionBeginDate=${filterCriteria.timePeriod.startDate}&transactionEndDate=${filterCriteria.timePeriod.endDate}`;
      }
      return `${timePeriodQuery}${constructComboBoxQuery(
        filterCriteria.timePeriod.comboBoxYear,
        'vintageYear'
      )}`;
    case 'allowance based':
    case 'emissions based':
      return `${constructComboBoxQuery(
        filterCriteria.timePeriod.comboBoxYear,
        'year'
      )}`;
    default:
      return '';
  }
};
