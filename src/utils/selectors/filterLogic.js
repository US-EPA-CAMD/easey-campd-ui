import {formatYearsToArray, formatDateToApi} from "./general";
import { FILTERS_MAP } from "../constants/customDataDownload";

//returs pipe delimited set of years
export const getTimePeriodYears = (start, end, years=null) =>{
  if(years!==null){
    return  formatYearsToArray(years);
  }
  if(start === null || end === null){
    return [];
  }else{
    const startYear = start.substring(0, 4);
    const endYear = end.substring(0, 4);
    if(startYear === endYear){
      return [Number(startYear)];
    }else{
      return formatYearsToArray(`${startYear}-${endYear}`);
    }
  }
};

export const verifyTimePeriodChange = (formState, timePeriod, showYear) =>{
  let result = false;
  if(showYear && timePeriod.year?.yearArray.length > 0){
    result = JSON.stringify(timePeriod.year.yearArray) !== JSON.stringify(getTimePeriodYears(null, null, formState.year));
  }
  if(timePeriod.startDate !== null && timePeriod.endDate !== null){
    const storeTimePeriod = getTimePeriodYears(timePeriod.startDate, timePeriod.endDate);
    const formTimePeriod = getTimePeriodYears(formatDateToApi(formState.startDate), formatDateToApi(formState.endDate));
    result = JSON.stringify(storeTimePeriod) !== JSON.stringify(formTimePeriod);
  }
  return result;
}

const getSelectedYrs = (filterCriteria) =>{
  return filterCriteria.timePeriod.year?.yearArray.length>0 ? filterCriteria.timePeriod.year.yearArray :
  getTimePeriodYears(filterCriteria.timePeriod.startDate, filterCriteria.timePeriod.endDate);
};

const updateEnabledStatusCheckBox = (arry, filteredSet) =>{
  arry.forEach(el => {
    el.items.forEach(obj =>{
      obj.enabled = filteredSet.includes(obj.id);
    });
  });
};

const updateEnabledStatusComboBox = (arry, filteredSet) =>{
  arry.forEach(obj => {
    obj.enabled = filteredSet.includes(obj.id);
  });
};

export const filterEmissionsProgram = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => i.programCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.program, filteredSet);
};

export const filterEmissionsStateTerritory = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => i.state)
  )];
  updateEnabledStatusComboBox(filterCriteria.stateTerritory, filteredSet);
};

export const filterEmissionsFacility = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => String(i.facilityId))
  )];
  updateEnabledStatusComboBox(filterCriteria.facility, filteredSet);
};

export const filterEmissionsUnitType = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => i.unitTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.unitType, filteredSet);
};

export const filterEmissionsFuelType = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => i.fuelTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.fuelType, filteredSet);
};

export const filterEmissionsControlTechnology = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => i.controlCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.controlTechnology, filteredSet);
};

export const filterEmissionsSourceCategory = (filterCriteria) =>{
  const selectedYrs = getSelectedYrs(filterCriteria);
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    }).map(i => String(i.sourceCategoryDescription))
  )];
  updateEnabledStatusComboBox(filterCriteria.sourceCategory, filteredSet);
};

export const engageFilterLogic = (dataType, dataSubType, affectedFilter, filterCriteriaCloned, updateFilterCriteriaDispacher) =>{
  const filters = FILTERS_MAP[dataType][dataSubType];
  filters.forEach(obj =>{
    if(obj.hasOwnProperty("updateFilter") && affectedFilter !== obj.value){
      obj.updateFilter(filterCriteriaCloned);
    }
  });
  updateFilterCriteriaDispacher(filterCriteriaCloned);
};
