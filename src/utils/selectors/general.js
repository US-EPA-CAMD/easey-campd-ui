import {
  addExcludeParams,
  constructComboBoxQuery,
  constructQuery,
  filterAmpersand,
  getCheckBoxEnabledItems,
  getCheckBoxSelectedItems,
  getComboboxEnabledItems,
  getComboboxSelectedItems
} from './filterCriteria';
import config from '../../config';
import { constructTimePeriodQuery } from './timePeriodQuery';
import * as constants from '../constants/customDataDownload';
import { isYearFormat } from '../dateValidation/dateValidation';
import { EMISSIONS_AGGREGATION } from '../constants/emissions';

export const isAddedToFilters = (filter, appliedFilters) => {
  return appliedFilters.filter((el) => el.key === filter).length > 0;
};

export const initcap = (str) => {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const isEmailValid = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
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
/** cdd data table*/
export const formatTableNumbers = (data, exceptions = {}) => {
  const columns = Object.keys(data);
  columns.forEach((column) => {
    const columnLowerCase = column.toLowerCase();
    if (
      exceptions[columnLowerCase] ||
      exceptions[columnLowerCase.substring(columnLowerCase.length - 2)] ||
      exceptions[columnLowerCase.substring(columnLowerCase.length - 4)]
    ) {
      return;
    } else {
      data[column] = data[column]
        ? data[column].toLocaleString()
        : data[column];
    }
  });
};

/** bulk data files*/
export const formatFileSize = (bytes, decimalPoint) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const convertToBytes = (fileSize) => {
  fileSize = fileSize.toLowerCase();
  const unit = fileSize.split(' ')[1];
  if (unit === 'bytes') {
    return fileSize;
  }
  const unitsDictionary = { kb: 1000, mb: 1000000, gb: 1000000000 };
  const byteSize = parseFloat(fileSize) * unitsDictionary[unit];
  return `${byteSize} bytes`;
};

export const downloadLimitReached = (size, limit) => {
  if (!size) {
    return false;
  }
  size = size.toLowerCase();
  const unit = size.slice(-2);
  if (unit === 'gb') {
    if (parseFloat(size) < parseFloat(limit)) {
      return false;
    } else {
      return true;
    }
  }
  const smallerUnits = { es: true, kb: true, mb: true };
  if (smallerUnits[unit]) {
    return false;
  } else {
    return true;
  }
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
  aggregation,
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
  const excludeParams = filterCriteria.excludeParams.length? addExcludeParams(filterCriteria.excludeParams) : ''

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
    case 'mercury and air toxics emissions':
      apiPath = `/emissions/apportioned/mats/`
      apiService = `${download ? config.services.streaming.uri : config.services.emissions.uri}`;
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
  const aggregationLink = getServiceSubtype(EMISSIONS_AGGREGATION, aggregation);
  const aggregationService = aggregationLink? '/'+ aggregationLink : '';
  const url = `${apiService}${apiPath}${subTypeService}${aggregationService}?${pagination}${constructTimePeriodQuery(
    dataSubType,
    filterCriteria
  )}${programQuery}${facilityQuery}${stateTerritoryQuery}${unitTypeQuery}${fuelTypeQuery}${controlTechnologyQuery}
${accountNameNumberQuery}${accountTypeQuery}${ownerOperatorQuery}${transactionTypeQuery}${sourceCategoryQuery}${excludeParams}`;
  console.log(url.replace(/\r?\n|\r/g, ''));

  return url.replace(/\r?\n|\r/g, '');
};

export const isInternalUrl = (props) => props.href[0] === '/';

export const formatDateToYYMMDD = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const formatBookmarkDate = (dt) =>{
  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  };
  return `${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getDate().toString().padStart(2, '0')}/${
    dt.getFullYear().toString().slice(-2)}, ${dt.toLocaleString('en-US', options)}`
};

export const getBookmarkContent = (dataType, dataSubType, aggregation, filtersMap, filterCriteria) =>{
  const filters = filtersMap.map(el => el.stateVar);console.log("filters",filters);
  const checkboxItems = ["program", "unitType", "fuelType", "controlTechnology", "accountType"];
  let content = {
    dataType: dataType,
    dataSubType: dataSubType, 
    aggregation: aggregation,
    filters: {},
    dataPreview: {
      excludedColumns: filterCriteria.excludeParams
    }
  }
  filters.forEach(filter =>{
    if(["timePeriod","transactionDate"].includes(filter)){
      content.filters['timePeriod'] = JSON.parse(JSON.stringify(filterCriteria.timePeriod));
      delete content.filters['timePeriod']["comboBoxYear"];
    }else if(filter === "comboBoxYear"){
      content.filters[filter] = {
        selected: getComboboxSelectedItems(filterCriteria.timePeriod.comboBoxYear),
        enabled: getComboboxEnabledItems(filterCriteria.timePeriod.comboBoxYear).map(el=>el.id)
      }
      content.filters[filter].enabled = content.filters[filter].enabled.filter(el=> !content.filters[filter].selected.includes(el));
    }
    else{
      content.filters[filter] = {
        selected: checkboxItems.includes(filter)? getCheckBoxSelectedItems(filterCriteria[filter]) : getComboboxSelectedItems(filterCriteria[filter]),
        enabled : checkboxItems.includes(filter)? getCheckBoxEnabledItems(filterCriteria[filter]) : getComboboxEnabledItems(filterCriteria[filter]).map(el=>el.id)
      }
      content.filters[filter].enabled = content.filters[filter].enabled.filter(el=> !content.filters[filter].selected.includes(el));
    } 
  });
  return content;
};