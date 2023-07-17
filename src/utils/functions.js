export const parseBool = (value, defaultValue = false) => {
  if (typeof value == "number" || value instanceof Number) {
    return value > 0;
  }

  if (typeof value == "boolean" || value instanceof Boolean) {
    return value;
  }

  if (typeof value == "string" || value instanceof String) {
    value = value.trim().toLowerCase();
    if (value === "true" || value === "false") {
      return value === "true";
    }
  }

  return defaultValue;
};

export const getConfigValue = (key, defaultValue = "") => {
  let returnValue;

  if (process.env && process.env[key]) {
    returnValue = process.env[key];
  } else if (!returnValue && process.env[key]) {
    returnValue = process.env[key];
  }

  return returnValue || defaultValue;
};

export const getConfigValueNumber = (key, defaultValue = "") => {
  return Number(getConfigValue(key, defaultValue));
};

export const getConfigValueBoolean = (key, defaultValue = "") => {
  return parseBool(getConfigValue(key, defaultValue));
};

export const getCurrentDate = () => {
  return new Date()
    .toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
    .split(",")[0];
};

export const getMinHeight = () => {
  const sideNav = document.querySelector(".side-nav"),
    sideNavHeader = document.querySelector(".panel-header"),
    sideNavSubheader = document.querySelector(".side-nav-subheader");
  if (!sideNav || !sideNavHeader || !sideNavSubheader) {
    return 0;
  }
  const sideNavHeight = sideNav.offsetHeight,
    sideNavHeaderHeight = sideNavHeader.offsetHeight,
    sideNavSubheaderHeight = sideNavSubheader.offsetHeight;

  return sideNavHeight - sideNavHeaderHeight - sideNavSubheaderHeight - 100;
};

export const getBGColor = (tableLength) =>
  tableLength % 2 ? "#fafafa" : "#f0f0f0";
