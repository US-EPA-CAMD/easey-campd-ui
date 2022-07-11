import { FILTERS_MAP } from "../constants/customDataDownload";
import { filterTagsDict } from "../constants/filterTagsDict";
import * as constants from '../constants/customDataDownload';

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
    const {stateVar} = obj
    if(removedFilter){
      if(obj.hasOwnProperty("updateFilter")){
        updatedFilterCriteria[stateVar] = obj.updateFilter(filterCriteriaCloned)
      }
    }
    else if(obj.hasOwnProperty("updateFilter") && affectedFilter !== obj.value){
      if (stateVar !== 'comboBoxYear'){
        updatedFilterCriteria[stateVar] = obj.updateFilter(filterCriteriaCloned)
      } else {
        updatedFilterCriteria.timePeriod = {
          ...filterCriteriaCloned.timePeriod,
          [stateVar] : obj.updateFilter(filterCriteriaCloned)
        }
      }
    }
  });
  updateFilterCriteriaDispatcher(updatedFilterCriteria)
  setTimeout(()=>updateFilterCriteriaDispatcher({filterLogicEngaged: false}));
};

export const filterBulkDataFiles = (selection, tableRecords) =>{
  return tableRecords.filter(record => {
    return (selection.dataType === '' || record.metadata?.dataType?.toUpperCase() === selection.dataType.toUpperCase()) &&
    (selection.subType === '' || record.metadata?.datasubType?.toUpperCase() === selection.subType.toUpperCase()) &&
    (selection.grouping === '' || record.metadata?.grouping?.toUpperCase() === selection.grouping.toUpperCase()) &&
    // eslint-disable-next-line
    (selection.year === '' || record.metadata?.year == selection.year) &&
    (selection.quarter === '' || record.metadata?.quarter?.toUpperCase() === selection.quarter.toUpperCase()) &&
    (selection.state === '' || record.metadata?.stateCode?.toUpperCase() === selection.state.toUpperCase())
  });
};


export const applyBookmarkFilterTags = (bookmarkData, filterCriteria, addAppliedFilterDispatcher) => {
  const bookmarkFilters = bookmarkData.filters;
  Object.keys(bookmarkFilters).forEach((el) => {
    const filterCategory = bookmarkFilters[el];
    const selectedFilters = filterCategory?.selected;
    const filterTagItem = filterTagsDict[el];
    const bookmarkDataSubType = bookmarkData.dataSubType;
    const showOperatingHrsSubtypes = {'Hourly Emissions': true}
    if (selectedFilters?.length){
      if (el === 'comboBoxYear'){
        if (bookmarkData.dataType === 'ALLOWANCE'){
          if (filterCriteria.timePeriod[el].length) {addAppliedFilterDispatcher({key: 'Vintage Year', values: filterTagItem?.method( filterCriteria.timePeriod[el])});}
        }else {
          if (filterCriteria.timePeriod[el].length) {addAppliedFilterDispatcher({key: filterTagItem?.label, values: filterTagItem?.method(filterCriteria.timePeriod[el], selectedFilters)});}}
      }else {
        addAppliedFilterDispatcher({key: filterTagItem?.label, values: filterTagItem?.method(filterCriteria[el], selectedFilters)})
      }
    } else if (el === 'timePeriod'){
      if (bookmarkDataSubType === 'Transactions'){
      addAppliedFilterDispatcher({key: 'Transaction Date', values: filterTagItem?.method(filterCategory)});
    }else if (bookmarkDataSubType !== 'Transactions'){
      addAppliedFilterDispatcher({key: filterTagItem?.label, values: filterTagItem?.method(filterCategory)})
      if (filterCategory.opHrsOnly && showOperatingHrsSubtypes[bookmarkDataSubType]){
        addAppliedFilterDispatcher({key: filterTagItem?.label, values: ['Operating Hours Only']})
      }}
    } 
  })
};

export const getSelectedDataSubType = (options, selectedDataSubtype) => {
  const entry = options?.find(
    (list) => list.value === parseFloat(selectedDataSubtype)
  );
  return entry ? entry.label : '';
};

export  const getFilterVariable = (selectedFilter, selectedDataType, selectedDataSubtype) => {
  if (selectedDataSubtype !== '' && selectedFilter !== '') {
    const filters =
      constants.FILTERS_MAP[selectedDataType][
        getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType], selectedDataSubtype)
      ];

    return (
      filters.filter((el) => el.value === selectedFilter)[0]?.stateVar || ''
    );
  }
  return selectedFilter;
};
