import initialState from '../../store/reducers/initialState';
import {formatYearsToArray, formatDateToApi, initcap} from "./general";

export const resetFilterHelper = (state, filterToReset, resetAll = false) => {
  const clonedFilterCriteria = JSON.parse(JSON.stringify(state));

  if (resetAll || filterToReset === "Time Period") {
    clonedFilterCriteria.timePeriod = {...clonedFilterCriteria.timePeriod, startDate: null, endDate: null, opHrsOnly: true,
      year: {
        yearArray: [],
        yearString: '',
      },
      month: [],
      quarter: []
    }
  }
  if (resetAll || filterToReset === "Program") {
    resetCheckBoxItems(clonedFilterCriteria.program);
  }
  if (resetAll || filterToReset === "Facility") {
    resetComboBoxItems(clonedFilterCriteria.facility);
  }
  if (resetAll || filterToReset === "State/Territory") {
    resetComboBoxItems(clonedFilterCriteria.stateTerritory);
  }
  if (resetAll || filterToReset === "Unit Type") {
    resetCheckBoxItems(clonedFilterCriteria.unitType);
  }
  if (resetAll || filterToReset === "Unit Fuel Type") {
    resetCheckBoxItems(clonedFilterCriteria.fuelType);
  }
  if (resetAll || filterToReset === "Control Technology") {
    resetCheckBoxItems(clonedFilterCriteria.controlTechnology);
  }
  if (resetAll || filterToReset === "Account Type") {
    resetCheckBoxItems(clonedFilterCriteria.accountType);
  }
  if (resetAll || filterToReset === "Account Name/Number") {
    resetComboBoxItems(clonedFilterCriteria.accountNameNumber);
  }
  if (resetAll || filterToReset === "Year") {
    if(clonedFilterCriteria.timePeriod.year.yearArray.length > 0){
      clonedFilterCriteria.timePeriod = {...clonedFilterCriteria.timePeriod, year: initialState.filterCriteria.timePeriod.year};
    }else{
      resetComboBoxItems(clonedFilterCriteria.timePeriod.comboBoxYear);
    }
  }
  if (resetAll || filterToReset === "Vintage Year") {
    resetComboBoxItems(clonedFilterCriteria.timePeriod.comboBoxYear);
  }
  if (resetAll || filterToReset === "Transaction Date") {
    clonedFilterCriteria.timePeriod = {...clonedFilterCriteria.timePeriod, startDate: null, endDate: null};
  }
  if (resetAll || filterToReset === "Owner/Operator") {
    resetComboBoxItems(clonedFilterCriteria.ownerOperator);
  }
  if (resetAll || filterToReset === "Transaction Type") {
    resetComboBoxItems(clonedFilterCriteria.transactionType);
  }
  if (resetAll || filterToReset === "Source Category") {
    resetComboBoxItems(clonedFilterCriteria.sourceCategory);
  }
  return Object.assign({}, state, clonedFilterCriteria);
};

export const resetCheckBoxItems = (entity) =>{
  entity.forEach(e =>{
    e.items.forEach(item =>{
      item.selected = false;
      item.enabled = true;
    });
  });
};

export const getCheckBoxSelectedItems = (arr) =>{
  const result = [];
  arr.forEach(entry =>{
    entry.items.forEach(item =>{
      if(item.selected){
        result.push(item.id);
      }
    });
  });
  return result;
};

export const resetComboBoxItems = (entity) =>{
  entity.forEach(e =>{
    e.selected = false;
    e.enabled = true;
  });
};

export const getComboboxEnabledItems = (arr) =>{
  return arr.filter(e=>e.enabled);
};

export const getComboboxSelectedItems = (arr, number=false) =>{
  return arr.filter(e=>e.selected).map(el => number? Number(el.id) : el.id);
};

export const updateEnabledStatusCheckBox = (arry, filteredSet) => {
  arry.forEach((el) => {
    el.items.forEach((obj) => {
      obj.enabled = filteredSet.includes(obj.id);
    });
  });
};

export const updateEnabledStatusComboBox = (arry, filteredSet) => {
  arry.forEach((obj) => {
    obj.enabled = filteredSet.includes(obj.id);
  });
};

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

export const verifyTimePeriodChange = (formState, timePeriod, showYear, transactions=false) =>{
  let result = false;
  if(showYear && timePeriod.year?.yearArray.length > 0){
    result = JSON.stringify(timePeriod.year.yearArray) !== JSON.stringify(getTimePeriodYears(null, null, formState.year));
  }
  if(timePeriod.startDate !== null && timePeriod.endDate !== null){
    if(transactions){
      result = (timePeriod.startDate !== formState.startDate || timePeriod.endDate !== formState.endDate);
    }else{
      const storeTimePeriod = getTimePeriodYears(timePeriod.startDate, timePeriod.endDate);
      const formTimePeriod = getTimePeriodYears(formatDateToApi(formState.startDate), formatDateToApi(formState.endDate));
      result = JSON.stringify(storeTimePeriod) !== JSON.stringify(formTimePeriod);
    }
  }
  return result;
}

export const getSelectedYrs = (filterCriteria) =>{
  return filterCriteria.timePeriod.year?.yearArray.length>0 ? filterCriteria.timePeriod.year.yearArray :
  getTimePeriodYears(filterCriteria.timePeriod.startDate, filterCriteria.timePeriod.endDate);
};

export const getSelectedIds = (filterState, description = false) => {
  const result = [];
  filterState.forEach((f) => {
    f.items.forEach((i) => {
      if (i.selected) {
        if (description) {
          result.push(i.description);
        } else {
          result.push(i.id);
        }
      }
    });
  });
  return result;
};

export const constructQuery = (filterState, filterName, multiSelectTimePeriod=false) => {
  const useCode = filterName === 'programCodeInfo' ? false : true;
  let selectedFilters;
  if (multiSelectTimePeriod) {
    selectedFilters = filterState
  } else {
    selectedFilters = getSelectedIds(filterState, useCode);
  }

  let query = '';
  selectedFilters.forEach((p, i) => {
    if (i === selectedFilters.length - 1) {
      query = `${query}${p}`;
    } else {
      query = `${query}${p}|`;
    }
  });
  return query.length > 0 ? `&${filterName}=${query}` : '';
};

/* ---------PROGRAM----------- */
export const restructurePrograms = (programs) => {
  const data = [
    {
      name: 'Annual',
      description: 'Annual Programs',
      items: [],
    },
    {
      name: 'Ozone',
      description: 'Ozone Programs',
      items: [],
    },
  ];
  programs.sort((a, b) => {
    const textA = a.programCode.toUpperCase();
    const textB = b.programCode.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  programs.forEach((p) => {
    const entry = {
      id: p.programCode,
      description: p.programDescription,
      label: p.retiredIndicator
        ? `${p.programDescription} (${p.programCode}) (ended ${
            p.tradingEndDate.split('-')[0]
          })`
        : `${p.programDescription} (${p.programCode})`,
      active: !p.retiredIndicator,
      selected: false,
      enabled: true,
    };
    if (p.annualIndicator) {
      data[0].items.push(entry);
    } else if (p.ozoneIndicator) {
      data[1].items.push(entry);
    }
  });

  return data;
};

/* ---------FACILITY / STATE / ACCOUNT NAME NUMBER----------- */
export const constructComboBoxQuery = (filterState, queryString, transactions=false) =>{
  const selection = filterState.filter(f=> f.selected);
  let query='';
  selection.forEach((f,i)=>{
    if(i===selection.length-1){
      query = transactions?`${query}${f.label}` : `${query}${f.id}`;
    }else{
      query = transactions?`${query}${f.label}` : `${query}${f.id}|`;
    }
  });
  return query.length > 0 ? `&${queryString}=${query}` : '';
}

export const filterAmpersand = (string) => {
  let query = '';
  string.split('').forEach((s, i) => {
    if (i > 0 && s === '&') {
      query += '%26';
    } else {
      query += s;
    }
  });
  return query;
};

/* ---------UNIT TYPE----------- */
const unitTypeGroups = (unitTypes) => {
  const unique = [];
  const map = new Map();
  unitTypes.forEach( (unitType) => {
    const desc = unitType.unitTypeGroupDescription;
    if(!map.has(desc)) {
      map.set(desc, true);
      unique.push(desc);
    }
  })

  return unique;
}

export const restructureUnitTypes = (unitTypes) => {
  const groups = unitTypeGroups(unitTypes);
  const data = groups.map((group) => group = {
    name: group,
    description: group,
    items: []
  })

  unitTypes.sort((a, b) => {
    const textA = a.unitTypeCode.toUpperCase();
    const textB = b.unitTypeCode.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  });
  unitTypes.forEach((ut) => {
    const entry = {
      id: ut.unitTypeCode,
      description: ut.unitTypeDescription,
      label: `${ut.unitTypeDescription} (${ut.unitTypeCode})`,
      group: ut.unitTypeGroupCode,
      groupDescription: ut.unitTypeGroupDescription,
      selected: false,
      enabled: true,
    };
    const index = data.findIndex(group => group.name === entry.groupDescription)
    data[index].items.push(entry);
  });

  return data;
};

/* ---------FUEL TYPE----------- */
const fuelTypeGroups = (fuelTypes) => {
  const unique = [];
  const map = new Map();
  fuelTypes.forEach( (fuelType) => {
    const desc = initcap(fuelType.fuelGroupCode);
    if(!map.has(desc)) {
      map.set(desc, true);
      unique.push(desc);
    }
  })

  unique.sort((a, b) => {
    const textA = a.toUpperCase();
    const textB = b.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  })

  return unique;
}

export const restructureFuelTypes = (fuelTypes) => {
  const groups = fuelTypeGroups(fuelTypes);
  const data = groups.map((group) => group = {
    name: group,
    description: group,
    items: []
  })

  fuelTypes.sort((a, b) => {
    const textA = a.fuelTypeCode.toUpperCase();
    const textB = b.fuelTypeCode.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  });
  fuelTypes.forEach((ft) => {
    const entry = {
      id: ft.fuelTypeCode,
      description: ft.fuelTypeDescription,
      label: `${ft.fuelTypeDescription} (${ft.fuelTypeCode})`,
      group: ft.fuelGroupCode,
      groupDescription: ft.fuelGroupDescription,
      selected: false,
      enabled: true,
    };
    const index = data.findIndex(group => group.name.toUpperCase() === entry.group.toUpperCase())
    data[index].items.push(entry);
  });

  return data;
};

/* ---------CONTROL TECHNOLOGY----------- */
const controlGroups = (controlTechnologies) => {
  const unique = [];
  const map = new Map();
  controlTechnologies.forEach((controlTechnology) => {
    const name = controlTechnology?.controlEquipParamDescription || 'Other';
    let code = `(${controlTechnology.controlEquipParamCode})`;
    if (controlTechnology.controlEquipParamCode === null || controlTechnology.controlEquipParamCode === 'PART') {
      code = '';
    }

    if (!map.has(name)) {
      map.set(name, true);
      unique.push({
        name: name,
        description: `${name} ${code}`,
      });
    }
  });

  unique.sort((a, b) => {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  })

  const otherIndex = unique.findIndex((e) => e.name === 'Other')
  unique.push(unique.splice(otherIndex, 1)[0]);

  return unique;
};

export const restructureControlTechnologies = (controlTechnologies) => {
  const groups = controlGroups(controlTechnologies);
  const data = groups.map((group) => group = {
    name: group.name,
    description: group.description,
    items: []
  })

  controlTechnologies.sort((a, b) => {
    const textA = a.controlCode.toUpperCase();
    const textB = b.controlCode.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  });
  controlTechnologies.forEach((ct) => {
    const entry = {
      id: ct.controlCode,
      description: ct.controlDescription,
      label: `${ct.controlDescription} (${ct.controlCode})`,
      group: ct.controlEquipParamCode,
      groupDescription: ct?.controlEquipParamDescription || 'Other',
      selected: false,
      enabled: true,
    };
    const index = data.findIndex(group => group.name === entry.groupDescription)
    data[index].items.push(entry);
  });

  return data;
};

/* ---------ACCOUNT TYPE----------- */
const accountTypeGroups = (accountTypes) => {
  const unique = [];
  const map = new Map();
  accountTypes.forEach( (accountType) => {
    const desc = accountType.accountTypeGroupDescription;
    if(!map.has(desc)) {
      map.set(desc, true);
      unique.push(desc);
    }
  })

  return unique;
}

export const restructureAccountTypes = (accountTypes) => {
  const groups = accountTypeGroups(accountTypes);
  const data = groups.map((group) => group = {
    name: group,
    description: group,
    items: []
  })

  accountTypes.sort((a, b) => {
    const textA = a.accountTypeCode.toUpperCase();
    const textB = b.accountTypeCode.toUpperCase();
    if (textA < textB) {
      return -1;
    } else {
      return textA > textB ? 1 : 0;
    }
  });
  accountTypes.forEach((at) => {
    const entry = {
      id: at.accountTypeCode,
      description: at.accountTypeDescription,
      label: `${at.accountTypeDescription} (${at.accountTypeCode})`,
      group: at.accountTypeGroupCode,
      groupDescription: at.accountTypeGroupDescription,
      selected: false,
      enabled: true,
    };
    const index = data.findIndex(group => group.name === entry.groupDescription)
    data[index].items.push(entry);
  });

  return data;
};

export const getApplicablePrograms = (storeProgram, dataSubType) =>{
  let res = storeProgram;
  if(storeProgram.length>1){
    if(dataSubType==="Ozone Season Emissions"){
      res = [storeProgram[1]];
    }else if(dataSubType==="Annual Emissions"){
      res = [storeProgram[0]];
    }
  }
  return res;
};

export const getPipeDelimitedYears = (yearsArray) => {
  let result = "";
  yearsArray.forEach((year,i) => {
    if(i===yearsArray.length-1){
      result += year;
    }else{
      result += `${year}|`
    }
  })
  return result;
}
