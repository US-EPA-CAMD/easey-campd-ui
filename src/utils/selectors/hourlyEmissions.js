
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
  return appliedFilters.includes(filter);
}

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
      col12: el.noxMass,
      col13: el.noxRate,
      col14: el.co2Mass,
      col15: el.heatInput,
      col16: el.primaryFuelInfo,
      col17: el.secondaryFuelInfo,
      col18: el.unitTypeInfo,
      col19: el.so2ControlInfo,
      col20: el.noxControlInfo,
      col21: el.partControlInfo,
      col22: el.hgControlInfo,
      col23: el.prgCodeInfo,
    });
  });
  return records;
}
