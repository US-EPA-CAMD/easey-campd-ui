import {formatYearsToArray, formatDateToApi} from "./general";

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

export const getProgramsFilteredSet = (filterCriteria) =>{
  const selectedYrs = filterCriteria.timePeriod.year?.yearArray.length>0 ? filterCriteria.timePeriod.year.yearArray :
   getTimePeriodYears(filterCriteria.timePeriod.startDate, filterCriteria.timePeriod.endDate);
  return [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selectedYrs.length === 0 || selectedYrs.includes(x.year))
    })
    .map(i => i.programCode)
  )];
};
