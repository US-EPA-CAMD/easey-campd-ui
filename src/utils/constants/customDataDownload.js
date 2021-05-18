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