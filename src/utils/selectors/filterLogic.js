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
  accountTypes: [],
  comboBoxYears: [],
  ownerOperator: [],
  transactionTypes: []
}

const populateSelections = (filterCriteria, dataSubType) =>{
  selection.years = dataSubType === "Transactions" ? [] : getSelectedYrs(filterCriteria);
  selection.states = getComboboxSelectedItems(filterCriteria.stateTerritory);
  selection.programs = getCheckBoxSelectedItems(filterCriteria.program);
  selection.fuelTypes = getCheckBoxSelectedItems(filterCriteria.fuelType);
  selection.facilities = getComboboxSelectedItems(filterCriteria.facility, true);
  selection.controlTechnologies = getCheckBoxSelectedItems(filterCriteria.controlTechnology);
  selection.unitTypes = getCheckBoxSelectedItems(filterCriteria.unitType);
  selection.sourceCategories = getComboboxSelectedItems(filterCriteria.sourceCategory);
  selection.acctNumbers = getComboboxSelectedItems(filterCriteria.accountNameNumber);
  selection.accountTypes = getCheckBoxSelectedItems(filterCriteria.accountType);
  selection.ownerOperator = getComboboxSelectedItems(filterCriteria.ownerOperator);
  selection.comboBoxYears = getComboboxSelectedItems(filterCriteria.timePeriod.comboBoxYear);
  selection.transactionTypes = getComboboxSelectedItems(filterCriteria.transactionType);
};

export const filterProgram = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber))&&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear? x.vintageYear : x.year)) &&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => i.programCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.program, filteredSet);
  return filterCriteria.program;
};

export const filterStateTerritory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year | x?.date?.substring(0,4))) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber))&&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear? x.vintageYear : x.year))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => {
      if(i.hasOwnProperty("stateCode")){
        return i.stateCode;
      }else{
        return [i.buyState, i.sellState];
      }
    }).flat()
  )];
  updateEnabledStatusComboBox(filterCriteria.stateTerritory, filteredSet);
  return filterCriteria.stateTerritory;
};

export const filterFacility = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year | x?.date?.substring(0,4))) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear? x.vintageYear : x.year))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => {
      if(i.hasOwnProperty("facilityId")){
        return i.facilityId;
      }else{
        return [i.buyFacilityId, i.sellFacilityId];
      }
    }).flat()
  )];
  updateEnabledStatusComboBox(filterCriteria.facility, filteredSet);
  return filterCriteria.facility;
};

export const filterUnitType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year | x?.date?.substring(0,4))) &&
      (selection.states.length === 0 || selection.states.includes(x.stateCode)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.unitTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.unitType, filteredSet);
  return filterCriteria.unitType;
};

export const filterFuelType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year | x?.date?.substring(0,4))) &&
      (selection.states.length === 0 || selection.states.includes(x.stateCode)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.fuelTypeCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.fuelType, filteredSet);
  return filterCriteria.fuelType;
};

export const filterControlTechnology = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x?.year | x?.date?.substring(0,4))) &&
      (selection.states.length === 0 || selection.states.includes(x.stateCode)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode)) &&
      (selection.sourceCategories.length === 0 || selection.sourceCategories.includes(x.sourceCategoryDescription))
    }).map(i => i.controlCode)
  )];
  updateEnabledStatusCheckBox(filterCriteria.controlTechnology, filteredSet);
  return filterCriteria.controlTechnology;
};

export const filterSourceCategory = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.years.length === 0 || selection.years.includes(x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x.stateCode)) &&
      (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.fuelTypes.length === 0 || selection.fuelTypes.includes(x.fuelTypeCode)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x.facilityId)) &&
      (selection.controlTechnologies.length === 0 || selection.controlTechnologies.includes(x.controlCode)) &&
      (selection.unitTypes.length === 0 || selection.unitTypes.includes(x.unitTypeCode))
    }).map(i => String(i.sourceCategoryDescription))
  )];
  updateEnabledStatusComboBox(filterCriteria.sourceCategory, filteredSet);
  return filterCriteria.sourceCategory;
};

export const filterAccountNameNumber = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.accountNumber !== null)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => {
      if(i.hasOwnProperty("accountNumber")){
        return i.accountNumber;
      }else{
        return [i.buyAccountNumber, i.sellAccountNumber];
      }
    }).flat()
  )];
  updateEnabledStatusComboBox(filterCriteria.accountNameNumber, filteredSet);
  return filterCriteria.accountNameNumber;
};

export const filterAccountType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.accountTypeCode !== null)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode))
    }).map(i => {
      if(i.hasOwnProperty("accountTypeCode")){
        return i.accountTypeCode;
      }else{
        return [i.buyAccountTypeCode, i.sellAccountTypeCode];
      }
    }).flat()
  )];
  updateEnabledStatusCheckBox(filterCriteria.accountType, filteredSet, true);
  return filterCriteria.accountType;

};

export const filterOwnerOperator = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || (selection.programs.includes(x.programCode) && x.ownerOperator !== null)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear? x.vintageYear : x.year)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => i.ownerOperator)
  )];
  updateEnabledStatusComboBox(filterCriteria.ownerOperator, filteredSet);
  return filterCriteria.ownerOperator;
};

export const filterComboBoxYear = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState))&&
      (selection.transactionTypes.length === 0 || selection.transactionTypes.includes(x.transactionTypeCode)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => i.hasOwnProperty("vintageYear") ? i.vintageYear : i.year)
  )];
  updateEnabledStatusComboBox(filterCriteria.timePeriod.comboBoxYear, filteredSet);
  return filterCriteria.timePeriod.comboBoxYear;
};

export const filterTransactionType = (filterCriteria) =>{
  const filteredSet = [...new Set(
    filterCriteria.filterMapping.filter(x => {
      return (selection.programs.length === 0 || selection.programs.includes(x.programCode)) &&
      (selection.acctNumbers.length === 0 || selection.acctNumbers.includes(x?.accountNumber)
      || selection.acctNumbers.includes(x?.buyAccountNumber) || selection.acctNumbers.includes(x?.sellAccountNumber)) &&
      (selection.facilities.length === 0 || selection.facilities.includes(x?.facilityId)
      || selection.facilities.includes(x?.buyFacilityId) || selection.facilities.includes(x?.sellFacilityId)) &&
      (selection.ownerOperator.length === 0 || selection.ownerOperator.includes(x.ownerOperator)) &&
      (selection.states.length === 0 || selection.states.includes(x?.stateCode)
      || selection.states.includes(x?.buyState) || selection.states.includes(x?.sellState)) &&
      (selection.comboBoxYears.length === 0 || selection.comboBoxYears.includes(x.vintageYear)) &&
      (selection.accountTypes.length === 0 || selection.accountTypes.includes(x?.accountTypeCode)
      || selection.accountTypes.includes(x?.buyAccountTypeCode) || selection.accountTypes.includes(x?.sellAccountTypeCode))
    }).map(i => i.transactionTypeCode)
  )];
  updateEnabledStatusComboBox(filterCriteria.transactionType, filteredSet);
  return filterCriteria.transactionType;
};

export const engageFilterLogic = (dataType, dataSubType, affectedFilter, filterCriteriaCloned, updateFilterCriteriaDispatcher, removedFilter=false) =>{
  updateFilterCriteriaDispatcher({filterLogicEngaged: true})
  const filters = FILTERS_MAP[dataType][dataSubType];
  populateSelections(filterCriteriaCloned, dataSubType);
  const updatedFilterCriteria = {}
  filters.forEach(obj =>{
    if(removedFilter){
      if(obj.hasOwnProperty("updateFilter")){
        obj.updateFilter(filterCriteriaCloned);
        const stateVar = obj.stateVar
        updatedFilterCriteria[stateVar] = obj.updateFilter(filterCriteriaCloned)
      }
    }
    else if(obj.hasOwnProperty("updateFilter") && affectedFilter !== obj.value){
      obj.updateFilter(filterCriteriaCloned);
        const stateVar = obj.stateVar
        if (stateVar !== 'comboBoxYear'){
        updatedFilterCriteria[stateVar] = obj.updateFilter(filterCriteriaCloned)
      } else {
        console.log({stateVar});
        updatedFilterCriteria.timePeriod = {
          ...filterCriteriaCloned.timePeriod,
          [stateVar] : obj.updateFilter(filterCriteriaCloned)
        }
      }
    }
  }); 
  console.log(updatedFilterCriteria);
  updateFilterCriteriaDispatcher(updatedFilterCriteria)
  setTimeout(()=>updateFilterCriteriaDispatcher({filterLogicEngaged: false}));  
};

export const filterBulkDataFiles = (selection, tableRecords) =>{
  return tableRecords.filter(record => {
    return (selection.dataType === '' || record.metadata?.datatype?.toUpperCase() === selection.dataType.toUpperCase()) &&
    (selection.subType === '' || record.metadata?.datasubtype?.toUpperCase() === selection.subType.toUpperCase()) &&
    (selection.grouping === '' || record.metadata?.grouping?.toUpperCase() === selection.grouping.toUpperCase()) &&
    // eslint-disable-next-line
    (selection.year === '' || record.metadata?.year == selection.year) &&
    (selection.quarter === '' || record.metadata?.quarter?.toUpperCase() === selection.quarter.toUpperCase()) &&
    (selection.state === '' || record.metadata?.statecode?.toUpperCase() === selection.state.toUpperCase())
  });
};

//helper functions for filter criteria component to check if filters should be disabled
export const checkSelectableData = (listItem) => {
  let enabled = 0;
  for (const el of listItem) {
    if (enabled) {
      break;
    }
    if (el.items) {
      for (const filterItem of el.items) {
        if (filterItem.enabled) {
          enabled++;
          break;
        }
      }
    }
    if (el.enabled) {
      enabled++;
      break;
    }
  }
  return enabled === 0;
};
export const validateInput = (list, item) => {
  if (!item || !list) {
    return false;
  }
  let listItem = list[item];

  if (item === 'comboBoxYear') {
    listItem = list.timePeriod.comboBoxYear;
  }
  if (!listItem) {
    return false;
  }
  return checkSelectableData(listItem);
};
