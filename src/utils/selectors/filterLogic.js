import { FILTERS_MAP } from "../constants/customDataDownload";
import {
  getComboboxSelectedItems,
  getCheckBoxSelectedItems,
  updateEnabledStatusCheckBox,
  updateEnabledStatusComboBox,
  getSelectedYrs
} from "../selectors/filterCriteria";

const selection = {
  years : [],
  states : [],
  programs : [],
  fuelTypes: []
}

const populateSelections = (filterCriteria) =>{
  selection.years = getSelectedYrs(filterCriteria);
  selection.states = getComboboxSelectedItems(filterCriteria.stateTerritory);
  selection.programs = getCheckBoxSelectedItems(filterCriteria.program);
  selection.fuelTypes = getCheckBoxSelectedItems(filterCriteria.fuelType);
};

export const filterEmissionsProgram = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) && 
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => i.programCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.program, filteredSet);
};

export const filterEmissionsStateTerritory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => i.state)
  )];
  updateEnabledStatusComboBox(filterCriteria.stateTerritory, filteredSet);
};

export const filterEmissionsFacility = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => String(i.facilityId))
  )];
  updateEnabledStatusComboBox(filterCriteria.facility, filteredSet);
};

export const filterEmissionsUnitType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => i.unitTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.unitType, filteredSet);
};

export const filterEmissionsFuelType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode))
    }).map(i => i.fuelTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.fuelType, filteredSet);
};

export const filterEmissionsControlTechnology = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => i.controlCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.controlTechnology, filteredSet);
};

export const filterEmissionsSourceCategory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) && 
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode))
    }).map(i => String(i.sourceCategoryDescription))
  )];
  updateEnabledStatusComboBox(filterCriteria.sourceCategory, filteredSet);
};

export const engageFilterLogic = (dataType, dataSubType, affectedFilter, filterCriteriaCloned, updateFilterCriteriaDispacher, removedFilter=false) =>{
  const filters = FILTERS_MAP[dataType][dataSubType];
  populateSelections(filterCriteriaCloned);
  filters.forEach(obj =>{
    if(removedFilter){
      if(obj.hasOwnProperty("updateFilter")){
        obj.updateFilter(filterCriteriaCloned);
      }
    }
    else if(obj.hasOwnProperty("updateFilter") && affectedFilter !== obj.value){
      obj.updateFilter(filterCriteriaCloned);
    }
  });
  updateFilterCriteriaDispacher(filterCriteriaCloned);
};
