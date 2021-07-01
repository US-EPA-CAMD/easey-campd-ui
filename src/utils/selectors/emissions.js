import { constructQuery } from "./filterCriteria";

export const getHourlyEmissionsTableRecords = (hourlyEmissions) => {
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
};

export const getAnnualEmissionsTableRecords = (annualEmissions) => {
  const records = [];
  annualEmissions.forEach((el) => {
    records.push({
      col1: el.state,
      col2: el.facilityName,
      col3: el.orisCode,
      col4: el.unitId,
      col5: el.assocStacks,
      col6: el.opYear,
      col7: el.sumOpTime,
      col8: el.countOpTime,
      col9: el.gLoad,
      col10: el.sLoad,
      col11: el.so2Mass,
      col12: el.so2Rate,
      col13: el.noxMass,
      col14: el.noxRate,
      col15: el.co2Mass,
      col16: el.co2Rate,
      col17: el.heatInput,
      col18: el.primaryFuelInfo,
      col19: el.secondaryFuelInfo,
      col20: el.unitTypeInfo,
      col21: el.so2ControlInfo,
      col22: el.partControlInfo,
      col23: el.noxControlInfo,
      col24: el.hgControlInfo,
      col25: el.prgCodeInfo,
    });
  });
  return records;
};

export const constructTimePeriodQuery = (dataSubType, filterCriteria) => {
  switch (dataSubType.toLowerCase()) {
    case 'hourly emissions':
      return `beginDate=${filterCriteria.timePeriod.startDate}&endDate=${filterCriteria.timePeriod.endDate}&opHoursOnly=${filterCriteria.timePeriod.opHrsOnly}`;
    // case 'daily':
    //   return `beginDate=${filterCriteria.timePeriod.startDate}&endate=${filterCriteria.timePeriod.endDate}`;
    // case 'monthly':
    //   return `opYear=${filterCriteria.timePeriod.year}&opMonth=${filterCriteria.timePeriod.month}`;
    // case 'quarterly':
    //   return `opYear=${filterCriteria.timePeriod.year}&quarter=${filterCriteria.timePeriod.quarter}`;
    case 'ozone season emissions':
      return`${constructQuery(filterCriteria.timePeriod.year.yearArray,'opYear',true)}`;
    case 'annual emissions':
      return`${constructQuery(filterCriteria.timePeriod.year.yearArray,'opYear',true)}`;
    default:
      return '';
  }
};
