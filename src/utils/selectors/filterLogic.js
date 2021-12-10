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
  fuelTypes: [],
  facilities: [],
  controlTechnologies: [],
  unitTypes: [],
  sourceCategories: [],
  acctNumbers: [],
  comboBoxYears: [],
  ownerOperator: []
}

const populateSelections = (filterCriteria) =>{
  selection.years = getSelectedYrs(filterCriteria);
  selection.states = getComboboxSelectedItems(filterCriteria.stateTerritory);
  selection.programs = getCheckBoxSelectedItems(filterCriteria.program);
  selection.fuelTypes = getCheckBoxSelectedItems(filterCriteria.fuelType);
  selection.facilities = getComboboxSelectedItems(filterCriteria.facility, true);
  selection.controlTechnologies = getCheckBoxSelectedItems(filterCriteria.controlTechnology);
  selection.unitTypes = getCheckBoxSelectedItems(filterCriteria.unitType);
  selection.sourceCategories = getComboboxSelectedItems(filterCriteria.sourceCategory);
  selection.acctNumbers = getComboboxSelectedItems(filterCriteria.accountNameNumber);
  selection.ownerOperator = getComboboxSelectedItems(filterCriteria.ownerOperator);
  selection.comboBoxYears = getComboboxSelectedItems(filterCriteria.timePeriod.comboBoxYear);
};

export const filterProgram = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) && 
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber))&&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))
    }).map(i => i.programCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.program, filteredSet);
};

export const filterStateTerritory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber))&&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))

    }).map(i => i.state)
  )];
  updateEnabledStatusComboBox(filterCriteria.stateTerritory, filteredSet);
};

export const filterFacility = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))
    }).map(i => String(i.facilityId))
  )];
  updateEnabledStatusComboBox(filterCriteria.facility, filteredSet);
};

export const filterUnitType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.unitTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.unitType, filteredSet);
};

export const filterFuelType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.fuelTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.fuelType, filteredSet);
};

export const filterControlTechnology = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.controlCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.controlTechnology, filteredSet);
};

export const filterSourceCategory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.state)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode))
    }).map(i => String(i.sourceCategoryDescription))
  )];
  updateEnabledStatusComboBox(filterCriteria.sourceCategory, filteredSet);
};

export const filterAccountNameNumber = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.accountNumber !== null)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))
    }).map(i => i.accountNumber)
  )];
  updateEnabledStatusComboBox(filterCriteria.accountNameNumber, filteredSet);
};

export const filterAccountType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.accountTypeCode !== null)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))
    }).map(i => i.accountTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.accountType, filteredSet, true);
};

export const filterOwnerOperator = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.ownerOperator !== null)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear))

    }).map(i => i.ownerOperator)
  )];
  updateEnabledStatusComboBox(filterCriteria.ownerOperator, filteredSet);
};

export const filterComboBoxYear = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber)) &&
<<<<<<< HEAD
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId))
    }).map(i => i.hasOwnProperty("vintageYear") ? i.vintageYear : i.year)
=======
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator))
    }).map(i => i.vintageYear)
>>>>>>> a933fbea745f62236cc231decebf819306ae6509
  )];
  updateEnabledStatusComboBox(filterCriteria.timePeriod.comboBoxYear, filteredSet);
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
