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

  if (window._env_ && window._env_[key]) {
    returnValue = window._env_[key];
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
    sideNavsubheader = document.querySelector(".side-nav-subheader");
  const sideNavHeight = sideNav.offsetHeight,
    sideNavHeaderHeight = sideNavHeader.offsetHeight,
    sideNavSubheaderHeight = sideNavsubheader.offsetHeight;

  return sideNavHeight - sideNavHeaderHeight - sideNavSubheaderHeight - 100;
};

export const getBGColor = (tableLength) => (tableLength % 2 ? "#fafafa" : "#f0f0f0");
