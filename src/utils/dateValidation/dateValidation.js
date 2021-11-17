import { formatYearsToArray, reportingQuarter } from "../selectors/general";

const setDate = (year, month, date) => {
  const newDate = new Date(0)
  newDate.setFullYear(year, month, date)
  return newDate
}

export const isDateFormatValid = (dateString) =>{
  let isValid = true

  if (dateString) {
    isValid = false

    const dateStringParts = dateString.split('/')
    const [month, day, year] = dateStringParts.map((str) => {
      let value
      const parsed = parseInt(str, 10)
      if (!Number.isNaN(parsed)) {
        value = parsed
      }
      return value
    })

    if (month && day && year != null) {
      const checkDate = setDate(year, month - 1, day)
      if (
        checkDate.getMonth() === month - 1 &&
        checkDate.getDate() === day &&
        checkDate.getFullYear() === year &&
        dateStringParts[2].length === 4
      ) {
        isValid = true
      }
    }
  }

  return isValid
};

export const isDateRangeValid = (startDateString, endDateString) =>{
  return new Date(startDateString) <= new Date(endDateString);
};

export const isYearFormat = (yearString) => {
  let valid = false;
  const regex = /^\d{4}$/;

  const yearArray = yearString.replace(/ /g, '').split(',');
  yearArray.every((year) => {
    if (year && year.includes('-')) {
      const t = year.split('-');
      valid =
        t.length === 2 && t[0] < t[1]
          ? t[0].match(regex) && t[1].match(regex)
          : false;
    } else {
      valid = year.match(regex) !== null;
    }
    return valid;
  });

  return valid;
};

export const isInYearRange = (yearArray, minYear, isAnnual = false, isAllowance = false) => {
  const curYear = new Date().getFullYear();
  let result = false;
   if (isAnnual) {
     result = yearArray.every(
       (year) =>
         year === 1980 ||
         year === 1985 ||
         year === 1990 ||
         (year >= 1995 && year <= curYear)
     );
   } else if (isAllowance) {
     result = yearArray.every((year) => year >= 1995);
   } else {
     result = yearArray.every((year) => year >= minYear && year <= curYear);
   }

    if (!result) {
      return;
    }
  return result;
};

export const isInValidDateRange = (date, minDate, isAllowance=false) => {
  const dateInput = new Date(date);
  const maxDate = isAllowance ? new Date() : new Date(reportingQuarter());
  return dateInput >= minDate && dateInput <= maxDate;
};

export const isInValidReportingQuarter = (
  yearString,
  minYear,
  monthOrQuarterArray,
  values
) => {
  const yearArray = formatYearsToArray(yearString);
  if (!isInYearRange(yearArray, minYear)) {
    return false;
  }

  const curDate = new Date();
  const curYear = new Date().getFullYear();
  let isValid = false;

  if (yearArray.length === 1 && yearArray.includes(curYear)) {
    monthOrQuarterArray.forEach((monthOrQuarter) => {
      if (curDate < new Date(`March 31, ${curYear}`)) {
        isValid = false;
      } else if (curDate < new Date(`June 30, ${curYear}`)) {
        isValid = monthOrQuarter <= values[0];
      } else if (curDate < new Date(`September 30, ${curYear}`)) {
        isValid = monthOrQuarter <= values[1];
      } else if (curDate < new Date(`December 31, ${curYear}`)) {
        isValid = monthOrQuarter <= values[2];
      } else {
        isValid = false;
      }
    });
  } else {
    isValid = true;
  }

  return isValid;
};
