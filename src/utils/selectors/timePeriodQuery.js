import { constructQuery } from './filterCriteria';
import {
  formatMonthsToApiOrString,
  formatQuartersToApiOrString,
} from './general';

export const constructTimePeriodQuery = (dataSubType, filterCriteria) => {
  switch (dataSubType.toLowerCase()) {
    case 'hourly emissions':
      return `&beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}&opHoursOnly=${filterCriteria.timePeriod.opHrsOnly}`;
    case 'daily emissions':
      return `&beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}`;
    case 'monthly emissions':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'opYear',
        true
      )}${constructQuery(
        formatMonthsToApiOrString(filterCriteria.timePeriod.month),
        'opMonth',
        true
      )}`;
    case 'quarterly emissions':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'opYear',
        true
      )}${constructQuery(
        formatQuartersToApiOrString(filterCriteria.timePeriod.quarter),
        'opQuarter',
        true
      )}`;
    case 'ozone season emissions':
    case 'annual emissions':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'opYear',
        true
      )}`;
    case 'holdings':
    case 'transactions':
      let timePeriodQuery='&';
      if(filterCriteria.timePeriod.startDate && filterCriteria.timePeriod.endDate){
        timePeriodQuery += `transactionBeginDate=${filterCriteria.timePeriod.startDate}&transactionEndDate=${filterCriteria.timePeriod.endDate}`;
      }
      return `${timePeriodQuery}${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'vintageYear',
        true
      )}`;
      case 'allowance based':
      return `${constructQuery(
        filterCriteria.timePeriod.year.yearArray,
        'year',
        true
      )}`;
    default:
      return '';
  }
};
