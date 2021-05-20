export const isAddedToFilters = (filter, appliedFilters) => {
    return appliedFilters.filter((el) => el.key === filter).length > 0;
  };

export const initcap = (str) => {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatDateToApi = (dateString) => {
  //param=mm/dd/yyyy return=yyyy-mm-dd
  if (dateString) {
    const dateStringParts = dateString.split('/');
    const month =
      dateStringParts[0] < 10 && !dateStringParts[0].startsWith('0')
        ? `0${dateStringParts[0]}`
        : dateStringParts[0];
    const day =
      dateStringParts[1] < 10 && !dateStringParts[1].startsWith('0')
        ? `0${dateStringParts[1]}`
        : dateStringParts[1];
    return `${dateStringParts[2]}-${month}-${day}`;
  }
  return null;
};

export const formatDateToUi = (dateString) => {
  //param=yyyy-mm-dd return=mm/dd/yyyy
  if (dateString) {
    const dateStringParts = dateString.split('-');
    const month =
      dateStringParts[1] < 10 && !dateStringParts[1].startsWith('0')
        ? `0${dateStringParts[1]}`
        : dateStringParts[1];
    const day =
      dateStringParts[2] < 10 && !dateStringParts[2].startsWith('0')
        ? `0${dateStringParts[2]}`
        : dateStringParts[2];
    return `${month}/${day}/${dateStringParts[0]}`;
  }
  return null;
};
