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
