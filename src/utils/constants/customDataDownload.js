import * as Emissions from './emissions';
import * as Allowances from './allowances';
import * as Compliances from './compliances';

export const DATA_TYPES = ["EMISSIONS", "ALLOWANCE", "COMPLIANCE"];

export const DATA_SUBTYPES_MAP = {
  EMISSIONS: Emissions.EMISSIONS_DATA_SUBTYPES,
  ALLOWANCE: Allowances.ALLOWANCES_DATA_SUBTYPES,
  COMPLIANCE: Compliances.COMPLIANCES_DATA_SUBTYPES,
};

export const FILTERS_MAP = {
  EMISSIONS: {
    'Hourly Emissions': Emissions.EMISSIONS_FILTERS,
    'Daily Emissions': Emissions.EMISSIONS_FILTERS,
    'Monthly Emissions': Emissions.EMISSIONS_FILTERS,
    'Quarterly Emissions': Emissions.EMISSIONS_FILTERS,
    'Ozone Season Emissions': Emissions.EMISSIONS_FILTERS,
    'Annual Emissions': Emissions.EMISSIONS_FILTERS,
    'Facility/Unit Attributes': Emissions.FACILITY_UNIT_FILTERS,
  },
  ALLOWANCE: {
    'Account Information': Allowances.ACCOUNT_INFO_FILTERS,
    'Holdings': Allowances.ALLOWANCE_HOLDINGS_FILTERS,
    'Transactions': Allowances.ALLOWANCE_TRANSACTIONS_FILTERS,
  },
  COMPLIANCE: {
    'Allowance Based': Compliances.ALLOWANCE_BASED_FILTERS,
    'Emissions Based': Compliances.EMISSIONS_BASED_FILTERS,
  },
};

export const MONTHS = [
  { id: 1, label: 'January', selected: false },
  { id: 2, label: 'February', selected: false },
  { id: 3, label: 'March', selected: false },
  { id: 4, label: 'April', selected: false },
  { id: 5, label: 'May', selected: false },
  { id: 6, label: 'June', selected: false },
  { id: 7, label: 'July', selected: false },
  { id: 8, label: 'August', selected: false },
  { id: 9, label: 'September', selected: false },
  { id: 10, label: 'October', selected: false },
  { id: 11, label: 'November', selected: false },
  { id: 12, label: 'December', selected: false },
];

export const QUARTERS = [
  { id: 1, label: "Q1: January 1 – March 31", selected: false },
  { id: 2, label: "Q2: April 1 – June 30 ", selected: false },
  { id: 3, label: "Q3: July 1 – September 30 ", selected: false },
  { id: 4, label: "Q4: October 1 – December 31 ", selected: false },
];

export const API_CALLING_FILTERS = [
  "Program", "State/Territory", "Source Category", "Facility", "Unit Type", "Unit Fuel Type", "Control Technology",
  "Account Type", "Account Name/Number", "Transaction Type", "Owner/Operator"
];
