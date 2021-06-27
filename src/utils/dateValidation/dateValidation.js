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
  let regex = /^\d{4}$/;

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

export const isYearRange = (yearString) => {

}
