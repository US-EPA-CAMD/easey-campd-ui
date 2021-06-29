import { formatMonthsToArray, formatQuartersToArray, formatYearsToArray } from "../selectors/general";

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

  const yearArray = yearString.replace(/ /g,'').split(',');
  yearArray.forEach((year) => {
    if (year && year.includes('-')) {
      const t = year.split('-');
      if(t.length === 2) {
        valid = t[0].match(regex) && t[1].match(regex);
      }
    } else {
      valid = year.match(regex) !== null;
    }
  });

  return valid;
};

export const isInYearRange = (yearArray) => {
  const curYear = new Date().getFullYear();
  let result = false;
  yearArray.forEach((year) => {
    result = year >= 1995 && year <= curYear;
    if (!result) {
      return;
    }
  });
  return result;
};

export const isInValidReportingQuarter = (
  yearString,
  monthOrQuarterArray,
  values,
) => {
  const yearArray = formatYearsToArray(yearString);
  if (!isInYearRange(yearArray)) {
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


