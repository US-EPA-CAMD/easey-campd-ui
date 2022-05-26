import { constructComboBoxQuery, constructQuery, filterAmpersand } from './filterCriteria';
import config from '../../config';
import { constructTimePeriodQuery } from './timePeriodQuery';
import * as constants from '../constants/customDataDownload';
import { isYearFormat } from '../dateValidation/dateValidation';

export const isAddedToFilters = (filter, appliedFilters) => {
  return appliedFilters.filter((el) => el.key === filter).length > 0;
};

export const initcap = (str) => {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatDateToApi = (dateString) => {
  //param=mm/dd/yyyy return=yyyy-mm-dd
  if (dateString) {
    const dateStringParts = dateString.split('/');
    const month =
      dateStringParts[0] < 10 && !dateStringParts[0].startsWith('0')
        ? `0${dateStringParts[0]}`
        : dateStringParts[0];
    const day =
      dateStringParts[1] < 10 && !dateStringParts[1].startsWith('0')
        ? `0${dateStringParts[1]}`
        : dateStringParts[1];
    return `${dateStringParts[2]}-${month}-${day}`;
  }
  return null;
};

export const formatDateToUi = (dateString) => {
  //param=yyyy-mm-dd return=mm/dd/yyyy
  if (dateString) {
    const dateStringParts = dateString.split('-');
    const month =
      dateStringParts[1] < 10 && !dateStringParts[1].startsWith('0')
        ? `0${dateStringParts[1]}`
        : dateStringParts[1];
    const day =
      dateStringParts[2] < 10 && !dateStringParts[2].startsWith('0')
        ? `0${dateStringParts[2]}`
        : dateStringParts[2];
    return `${month}/${day}/${dateStringParts[0]}`;
  }
  return null;
};

export const formatYearsToArray = (multiSelectDateString) => {
  // param=2001-2003,2007 return=[2001, 2002, 2003, 2007]
  const numberArray = [];
  if (isYearFormat(multiSelectDateString)) {
    const range = (start, stop) =>
      Array(stop - start + 1)
        .fill(start)
        .map((x, y) => x + y);

    const dateStringArray = multiSelectDateString.replace(/ /g, '').split(',');

    dateStringArray.forEach((dateString) => {
      if (dateString && dateString.includes('-')) {
        const t = dateString.split('-');
        numberArray.push(...range(parseInt(t[0]), parseInt(t[1])));
      } else {
        numberArray.push(parseInt(dateString));
      }
    });
  }

  return numberArray?.sort();
};

export const formatMonthsToApiOrString = (monthArray, string = false) => {
  // param = [{id: 1, label: 'January', selected: true}] return=[1] OR 'January'
  const apiMonthArrayOrString = [];
  monthArray.forEach((month) => {
    if (month.selected) {
      string
        ? apiMonthArrayOrString.push(month.label)
        : apiMonthArrayOrString.push(month.id);
    }
  });
  return apiMonthArrayOrString;
};

export const formatQuartersToApiOrString = (quarterArray, string = false) => {
  // param = [{id: 1, label: 'Q1', selected: true}] return=[1] OR 'Q1'
  const apiQuarterArrayOrString = [];
  quarterArray.forEach((quarter) => {
    if (quarter.selected) {
      string
        ? apiQuarterArrayOrString.push(quarter.label)
        : apiQuarterArrayOrString.push(quarter.id);
    }
  });
  return apiQuarterArrayOrString;
};

export const reportingQuarter = () => {
  const curDate = new Date();
  const curYear = new Date().getFullYear();
  let quarter;
  if (curDate < new Date(`March 31, ${curYear}`)) {
    quarter = `12/31/${curYear - 1}`;
  } else if (curDate < new Date(`June 30, ${curYear}`)) {
    quarter = `03/31/${curYear}`;
  } else if (curDate < new Date(`September 30, ${curYear}`)) {
    quarter = `06/30/${curYear}`;
  } else if (curDate < new Date(`December 31, ${curYear}`)) {
    quarter = `09/30/${curYear}`;
  } else {
    quarter = `12/31/${curYear}`;
  }
  return quarter;
};

const getServiceSubtype = (options, dataSubType) => {
  const entry = options.find(
    (list) => list.label.toUpperCase() === dataSubType.toUpperCase()
  );
  return entry ? entry.service : '';
};


export const constructRequestUrl = (
  dataType,
  dataSubType,
  filterCriteria,
  download = false
) => {
  const programQuery = filterCriteria.program
    ? constructQuery(filterCriteria.program, 'programCodeInfo')
    : '';
  const facilityQuery = filterCriteria.facility
    ? constructComboBoxQuery(filterCriteria.facility, 'facilityId')
    : '';
  const stateTerritoryQuery = filterCriteria.stateTerritory
    ? constructComboBoxQuery(filterCriteria.stateTerritory, 'stateCode')
    : '';
  const unitTypeQuery = filterCriteria.unitType
    ? filterAmpersand(
        constructQuery(filterCriteria.unitType, 'unitType')
      )
    : '';
  const fuelTypeQuery = filterCriteria.fuelType
    ? filterAmpersand(
        constructQuery(filterCriteria.fuelType, 'unitFuelType')
      )
    : '';
  const controlTechnologyQuery = filterCriteria.controlTechnology
    ? filterAmpersand(
        constructQuery(filterCriteria.controlTechnology, 'controlTechnologies')
      )
    : '';
  const accountNameNumberQuery = filterCriteria.accountNameNumber
    ? constructComboBoxQuery(filterCriteria.accountNameNumber, 'accountNumber')
    : '';
  const accountTypeQuery = filterCriteria.accountType
    ? filterAmpersand(
        constructQuery(filterCriteria.accountType, 'accountType')
      )
    : '';
  const ownerOperatorQuery = filterCriteria.ownerOperator
    ? filterAmpersand(
        constructComboBoxQuery(filterCriteria.ownerOperator, 'ownerOperator')
      )
    : '';
  const transactionTypeQuery = filterCriteria.transactionType
    ? filterAmpersand(
        constructComboBoxQuery(filterCriteria.transactionType, 'transactionType', true)
      )
    : '';
  const sourceCategoryQuery = filterCriteria.sourceCategory
    ? filterAmpersand(
        constructComboBoxQuery(filterCriteria.sourceCategory, 'sourceCategory')
      )
    : '';

  const pagination = download ? '' : 'page=1&perPage=100';

  let apiPath = '';
  let apiService= '';

  switch (dataType.toLowerCase()) {
    case 'emissions':
      apiPath = `/emissions/apportioned/`
      apiService = `${download ? config.services.streaming.uri : config.services.emissions.uri}`;
      break;
    case 'facility':
      apiPath = `/facilities/`
      apiService = `${download ? config.services.streaming.uri : config.services.facilities.uri}`;
      break;
    case 'allowance':
    case 'compliance':
      apiPath = `/`
      apiService = `${download ? config.services.streaming.uri : config.services.account.uri}`;
      break;
    default:
      break;
  }
  const subTypeService = getServiceSubtype(
    constants.DATA_SUBTYPES_MAP[dataType.toUpperCase()],
    dataSubType
  );

  const url = `${apiService}${apiPath}${subTypeService}?${pagination}${constructTimePeriodQuery(
    dataSubType,
    filterCriteria
  )}${programQuery}${facilityQuery}${stateTerritoryQuery}${unitTypeQuery}${fuelTypeQuery}${controlTechnologyQuery}
${accountNameNumberQuery}${accountTypeQuery}${ownerOperatorQuery}${transactionTypeQuery}${sourceCategoryQuery}`;

  return url.replace(/\r?\n|\r/g, '');
};
