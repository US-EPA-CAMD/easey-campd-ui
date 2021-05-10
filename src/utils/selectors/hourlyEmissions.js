import initialState from "../../store/reducers/initialState";

export const formatDateToApi = (dateString) =>{//param=mm/dd/yyyy return=yyyy-mm-dd
  if(dateString){
    const dateStringParts = dateString.split('/');
    const month = dateStringParts[0] < 10 && !dateStringParts[0].startsWith("0")? `0${dateStringParts[0]}`: dateStringParts[0];
    const day = dateStringParts[1] < 10 && !dateStringParts[1].startsWith("0")? `0${dateStringParts[1]}`: dateStringParts[1];
    return `${dateStringParts[2]}-${month}-${day}`;
  }
  return null;
};

export const formatDateToUi = (dateString) =>{//param=yyyy-mm-dd return=mm/dd/yyyy
  if(dateString){
    const dateStringParts = dateString.split('-');
    const month = dateStringParts[1] < 10 && !dateStringParts[1].startsWith("0")? `0${dateStringParts[1]}`: dateStringParts[1];
    const day = dateStringParts[2] < 10 && !dateStringParts[2].startsWith("0")? `0${dateStringParts[2]}`: dateStringParts[2];
    return `${month}/${day}/${dateStringParts[0]}`;
  }
  return null;
};

export const isAddedToFilters = (filter, appliedFilters) =>{
  return appliedFilters.filter((el) => el.key === filter).length > 0;
}

export const resetFilterHelper = (state, filterToReset, resetAll = false) => {
  if (resetAll) {
    return initialState.hourlyEmissions;
  }

  switch (filterToReset) {
    case 'Time Period':
      return Object.assign({}, state, {timePeriod: initialState.hourlyEmissions.timePeriod});
    case 'Program':
      return Object.assign({}, state, {program: initialState.hourlyEmissions.program});
    default:
      return initialState.hourlyEmissions;
  }
};

export const getTableRecords = (hourlyEmissions) =>{
  const records = [];
  hourlyEmissions.forEach((el) => {
    records.push({
      col1: el.state,
      col2: el.facilityName,
      col3: el.orisCode,
      col4: el.unitId,
      col5: el.assocStacks,
      col6: el.opDate,
      col7: el.opHour,
      col8: el.opTime,
      col9: el.gLoad,
      col10: el.sLoad,
      col11: el.so2Mass,
      col12: el.so2MassMeasureFlg,
      col13: el.so2Rate,
      col14: el.so2RateMeasureFlg,
      col15: el.noxMass,
      col16: el.noxMassMeasureFlg,
      col17: el.noxRate,
      col18: el.noxRateMeasureFlg,
      col19: el.co2Mass,
      col20: el.co2MassMeasureFlg,
      col21: el.co2Rate,
      col22: el.co2RateMeasureFlg,
      col23: el.heatInput,
      col24: el.primaryFuelInfo,
      col25: el.secondaryFuelInfo,
      col26: el.unitTypeInfo,
      col27: el.so2ControlInfo,
      col28: el.partControlInfo,
      col29: el.noxControlInfo,
      col30: el.hgControlInfo,
      col31: el.prgCodeInfo,
    });
  });
  return records;
}

export const restructurePrograms = (programs) =>{
  const data = [
    {
      name: 'Annual',
      description: 'Annual Programs',
      items: []
    },
    {
      name: 'Ozone',
      description: 'Ozone Programs',
      items: []
    }
  ];
  programs.sort((a,b)=>{
    const textA = a.programCode.toUpperCase();
    const textB = b.programCode.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  programs.forEach(p=>{
    const entry = {
      id: p.programCode,
      description: p.programDescription,
      label: p.retiredIndicator? `${p.programDescription} (${p.programCode}) (ended ${p.tradingEndDate.split('-')[0]})`:`${p.programDescription} (${p.programCode})`,
      active: !p.retiredIndicator,
      selected: false
    };
    if(p.annualIndicator){
      data[0].items.push(entry);
    }else if(p.ozoneIndicator){
      data[1].items.push(entry);
    }
  });

  return data;
};

export const getSelectedProgramIds = (program) =>{
  const result = [];
  program.forEach(p=>{
    p.items.forEach(i=>{
      if(i.selected){
        result.push(i.id);
      }
    });
  });
  return result;
};
