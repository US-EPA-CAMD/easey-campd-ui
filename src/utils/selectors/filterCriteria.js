import initialState from '../../store/reducers/initialState';
import { initcap } from './general';

export const resetFilterHelper = (state, filterToReset, resetAll = false) => {
  if (resetAll) {
    return initialState.filterCriteria;
  }

  switch (filterToReset) {
    case 'Time Period':
      return Object.assign({}, state, {
        timePeriod: initialState.filterCriteria.timePeriod,
      });
    case 'Program':
      return Object.assign({}, state, {program: initialState.filterCriteria.program});
    case 'Facility':
      return Object.assign({}, state, {facility: initialState.filterCriteria.facility});
    case 'State/Territory':
      return Object.assign({}, state, {stateTerritory: initialState.filterCriteria.stateTerritory});
    case 'Unit Type':
      return Object.assign({}, state, {
        unitType: initialState.filterCriteria.unitType,
      });
    case 'Unit Fuel Type':
      return Object.assign({}, state, {
        fuelType: initialState.filterCriteria.fuelType,
      });
    case 'Control Technology':
      return Object.assign({}, state, {
        controlTechnology: initialState.filterCriteria.controlTechnology,
      });
    case 'Account Type':
      return Object.assign({}, state, {
        accountType: initialState.filterCriteria.accountType,
      });
    case 'Account Name/Number':
      return Object.assign({}, state, {
        accountNameNumber: initialState.filterCriteria.accountNameNumber,
      });
    case 'Vintage Year':
      return Object.assign({}, state, {
        timePeriod: {...state.timePeriod, year: initialState.filterCriteria.timePeriod.year},
      });
    case 'Transaction Date':
      return Object.assign({}, state, {
        timePeriod: {...state.timePeriod, startDate: null, endDate: null},
      });
    case 'Owner/Operator':
      return Object.assign({}, state, {
        ownerOperator: initialState.filterCriteria.ownerOperator,
      });
    default:
      return state;
  }
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
  const useCode = filterName === 'program' ? false : true;
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
export const constructComboBoxQuery = (filterState, queryString) =>{
  const selection = filterState.filter(f=> f.selected);
  let query='';
  selection.forEach((f,i)=>{
    if(i===selection.length-1){
      query = `${query}${f.id}`;
    }else{
      query = `${query}${f.id}|`;
    }
  });
  return query.length > 0 ? `&${queryString}=${query}` : '';
}

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
    };
    const index = data.findIndex(group => group.name === entry.groupDescription)
    data[index].items.push(entry);
  });

  return data;
};
