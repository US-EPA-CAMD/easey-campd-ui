const EMISSIONS_DATA_SUBTYPES = [
  { value:"", label: "- Select -"},
  { value: 1, label: "Hourly Emissions" },
  { value: 2, label: "Daily Emissions" },
  { value: 3, label: "Monthly Emissions" },
  { value: 4, label: "Quarterly Emissions" },
  { value: 5, label: "Ozone Season Emissions" },
  { value: 6, label: "Annual Emissions" },
  { value: 7, label: "Facility/Unit Attributes" },
];

const HOURLY_EMISSIONS_FILTERS = [
  {value: 'time period', label: "TIME PERIOD (Required)"},
  {value: 'program', label: "PROGRAM (Optional)"},
  {value: 'state territory', label: "STATE/TERRITORY (Optional)"},
  {value: 'facility', label: "FACILITY (Optional)"},
  {value: 'unit type', label: "UNIT TYPE (Optional)"},
  {value: 'unit fuel type', label: "UNIT FUEL TYPE (Optional)"},
  {value: 'control technology', label:"CONTROL TECHNOLOGY (Optional)"}
];

export const HOURLY_EMISSIONS_REQUIRED_FILTERS = ["timePeriod"];

export const DATA_SUBTYPES_MAP = {
  "EMISSIONS": EMISSIONS_DATA_SUBTYPES,
  "ALLOWANCE": [],
  "COMPLIANCE": [],
};

export const FILTERS_MAP = {
  "EMISSIONS": {
    "Hourly Emissions": HOURLY_EMISSIONS_FILTERS,
    "Daily Emissions": [],
    "Monthly Emissions": [],
    "Quarterly Emissions": [],
    "Ozone Season Emissions": [],
    "Annual Emissions": [],
    "Facility/Unit Attributes": []
  }
};
