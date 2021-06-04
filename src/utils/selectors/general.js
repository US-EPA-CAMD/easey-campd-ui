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
