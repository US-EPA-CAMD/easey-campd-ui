import {
  constructFacilityOrStateQuery,
  constructQuery,
} from './filterCriteria';
import config from '../../config';
import { constructTimePeriodQuery } from './emissions';
import * as constants from '../constants/customDataDownload';

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
  const range = (start, stop) =>
    Array(stop - start + 1)
      .fill(start)
      .map((x, y) => x + y);

  const dateStringArray = multiSelectDateString.replace(/ /g, '').split(',');
  const numberArray = [];

  dateStringArray.forEach((dateString) => {
    if (dateString && dateString.includes('-')) {
      const t = dateString.split('-');
      numberArray.push(...range(parseInt(t[0]), parseInt(t[1])));
    } else {
      numberArray.push(parseInt(dateString));
    }
  });

  return numberArray;
};

export const formatMonthsToApiOrString = (monthArray, string=false) => {
  // param = [{id: 1, label: 'January', selected: true}] return=[1] OR 'January'
  let apiMonthArrayOrString = [];
  monthArray.forEach((month) => {
    if (month.selected) {
      string ? apiMonthArrayOrString.push(month.label) : apiMonthArrayOrString.push(month.id);
    }
  });
  return apiMonthArrayOrString;
};

export const formatQuartersToApiOrString = (quarterArray, string=false) => {
    // param = [{id: 1, label: 'Q1', selected: true}] return=[1] OR 'Q1'
  let apiQuarterArrayOrString = [];
  quarterArray.forEach((quarter) => {
    if (quarter.selected) {
      string ? apiQuarterArrayOrString.push(quarter.label) : apiQuarterArrayOrString.push(quarter.id);
    }
  });
  return apiQuarterArrayOrString;
};

export const reportingQuarter = () => {
  const curDate = new Date();
  const curYear = new Date().getFullYear();
  let quarter;
  if (curDate < new Date(`March 31, ${curYear}`)) {
    quarter = `12/31/'${curYear - 1}`;
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
}

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
    ? constructQuery(filterCriteria.program, 'program')
    : '';
  const facilityQuery = filterCriteria.facility
    ? constructFacilityOrStateQuery(filterCriteria.facility, 'orisCode')
    : '';
  const stateTerritoryQuery = filterCriteria.stateTerritory
    ? constructFacilityOrStateQuery(filterCriteria.stateTerritory, 'state')
    : '';
  const unitTypeQuery = filterCriteria.unitType
    ? constructQuery(filterCriteria.unitType, 'unitType')
    : '';
  const fuelTypeQuery = filterCriteria.fuelType
    ? constructQuery(filterCriteria.fuelType, 'unitFuelType')
    : '';
  const controlTechnologyQuery = filterCriteria.controlTechnology
    ? constructQuery(filterCriteria.controlTechnology, 'controlTechnologies')
    : '';
  const pagination = download ? '' : 'page=1&perPage=100&';
  const attachFile = download ? '&attachFile=true' : '&attachFile=false';

  let apiService;
  switch (dataType.toLowerCase()) {
    case 'emissions':
      apiService = `${config.services.emissions.uri}/apportioned/`;
      break;
    // case 'allowance':
    //   apiService = `${config.services.allowance.uri}/allowance/`;
    //   break;
    // case 'compliance':
    //   apiService = `${config.services.compliance.uri}/compliance/`;
    //   break;
    default:
      apiService = '';
      break;
  }
  const subTypeService = getServiceSubtype(
    constants.DATA_SUBTYPES_MAP[dataType.toUpperCase()],
    dataSubType
  );

  const url = `${apiService}${subTypeService}?${pagination}${constructTimePeriodQuery(
    dataSubType,
    filterCriteria
  )}${programQuery}${facilityQuery}${stateTerritoryQuery}${unitTypeQuery}${fuelTypeQuery}${controlTechnologyQuery}${attachFile}`;
  console.log(url.replace(/\r?\n|\r/g, ''));

  return url.replace(/\r?\n|\r/g, '');
};

export const handleTabfocus = () =>{
  const firstElement = document.querySelector('.autofocus1');
  const startDateDiv = document.querySelector('#event-date-start');
  if(firstElement){
    firstElement.focus();
    if(firstElement.firstChild){
      firstElement.firstChild.focus();
    }
  }else if(startDateDiv){
    startDateDiv.focus();
  }
}