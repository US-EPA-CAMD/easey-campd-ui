import * as actions from "./filterCriteria";
import * as types from "../actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../../config";
import initState from "../../reducers/initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes, restructureAccountTypes} from "../../../utils/selectors/filterCriteria";
import { cleanup } from '@testing-library/react';
// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const sourceCategories = [
  {
    "sourceCategoryCode": "AUTSTMP",
    "sourceCategoryDescription": "Automotive Stampings"
  },
  {
    "sourceCategoryCode": "BKINCHM",
    "sourceCategoryDescription": "Bulk Industrial Chemical"
  },
  {
    "sourceCategoryCode": "CEMENTM",
    "sourceCategoryDescription": "Cement Manufacturing"
  },
  {
    "sourceCategoryCode": "COGEN",
    "sourceCategoryDescription": "Cogeneration"
  },
  {
    "sourceCategoryCode": "ELECTRC",
    "sourceCategoryDescription": "Electric Utility"
  },
  {
    "sourceCategoryCode": "INDBLR",
    "sourceCategoryDescription": "Industrial Boiler"
  },
  {
    "sourceCategoryCode": "INDTUR",
    "sourceCategoryDescription": "Industrial Turbine"
  },
  {
    "sourceCategoryCode": "INSTITU",
    "sourceCategoryDescription": "Institutional"
  },
  {
    "sourceCategoryCode": "IRONSTL",
    "sourceCategoryDescription": "Iron & Steel"
  },
  {
    "sourceCategoryCode": "MUNWAST",
    "sourceCategoryDescription": "Municipal Waste Combustor"
  },
  {
    "sourceCategoryCode": "PAPMILL",
    "sourceCategoryDescription": "Pulp & Paper Mill"
  },
  {
    "sourceCategoryCode": "PETRORE",
    "sourceCategoryDescription": "Petroleum Refinery"
  },
  {
    "sourceCategoryCode": "PRTCMNT",
    "sourceCategoryDescription": "Portland Cement Plant"
  },
  {
    "sourceCategoryCode": "SMLPWR",
    "sourceCategoryDescription": "Small Power Producer"
  },
  {
    "sourceCategoryCode": "THMPARK",
    "sourceCategoryDescription": "Theme Park"
  }
];
const program = [
  {
    "programCode": "ARP",
    "programDescription": "Acid Rain Program",
    "compParameterCode": "SO2",
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "CAIRNOX",
    "programDescription": "CAIR NOx Annual Program",
    "compParameterCode": "NOX",
    "programGroupCode": "CAIR",
    "programGroupDescription": "Clean Air Interstate Rule",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": true,
    "tradingEndDate": "2016-08-10"
  },
  {
    "programCode": "CAIROS",
    "programDescription": "CAIR NOx Ozone Season Program",
    "compParameterCode": "NOX",
    "programGroupCode": "CAIR",
    "programGroupDescription": "Clean Air Interstate Rule",
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": true,
    "retiredIndicator": true,
    "tradingEndDate": "2016-08-10"
  },
  {
    "programCode": "CAIRSO2",
    "programDescription": "CAIR SO2 Annual Program",
    "compParameterCode": "SO2",
    "programGroupCode": "CAIR",
    "programGroupDescription": "Clean Air Interstate Rule",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": true,
    "tradingEndDate": "2016-08-10"
  },
  {
    "programCode": "CSNOX",
    "programDescription": "Cross-State Air Pollution Rule NOx Annual Program",
    "compParameterCode": "NOX",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "CSNOXOS",
    "programDescription": "Cross-State Air Pollution Rule NOx Ozone Season Program",
    "compParameterCode": "NOX",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": true,
    "retiredIndicator": true,
    "tradingEndDate": "2017-10-23"
  },
  {
    "programCode": "CSOSG1",
    "programDescription": "Cross-State Air Pollution Rule NOx Ozone Season Program Group 1",
    "compParameterCode": "NOX",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "CSOSG2",
    "programDescription": "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
    "compParameterCode": "NOX",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "CSSO2G1",
    "programDescription": "Cross-State Air Pollution Rule SO2 Annual Program Group 1",
    "compParameterCode": "SO2",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "CSSO2G2",
    "programDescription": "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
    "compParameterCode": "SO2",
    "programGroupCode": "CSAPR",
    "programGroupDescription": "Cross-State Air Pollution Rule",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "NBP",
    "programDescription": "NOx Budget Trading Program",
    "compParameterCode": "NOX",
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": false,
    "retiredIndicator": true,
    "tradingEndDate": "2009-03-25"
  },
  {
    "programCode": "NHNOX",
    "programDescription": "NH NOx Program",
    "compParameterCode": null,
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": false,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "NSPS4T",
    "programDescription": "New Source Performance Standards subpart TTTT",
    "compParameterCode": null,
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": false,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "OTC",
    "programDescription": "OTC NOx Budget Program",
    "compParameterCode": "NOX",
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": true,
    "annualIndicator": false,
    "allowanceIndicator": false,
    "retiredIndicator": true,
    "tradingEndDate": "2003-05-06"
  },
  {
    "programCode": "RGGI",
    "programDescription": "Regional Greenhouse Gas Initiative",
    "compParameterCode": null,
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": false,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "SIPNOX",
    "programDescription": "SIP NOx Program",
    "compParameterCode": null,
    "programGroupCode": null,
    "programGroupDescription": null,
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": false,
    "retiredIndicator": false,
    "tradingEndDate": null
  },
  {
    "programCode": "TXSO2",
    "programDescription": "Texas SO2 Trading Program",
    "compParameterCode": "SO2",
    "programGroupCode": "TXSO2",
    "programGroupDescription": "Texas SO2 Trading Program",
    "ozoneIndicator": false,
    "annualIndicator": true,
    "allowanceIndicator": true,
    "retiredIndicator": false,
    "tradingEndDate": null
  }
];
const facilities = [
  {
    "id": "1",
    "facilityId": "3",
    "facilityName": "Barry",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/1"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/1/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/1/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/1/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/1/contacts"
      }
    ]
  },
  {
    "id": "2",
    "facilityId": "5",
    "facilityName": "Chickasaw",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/2"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/2/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/2/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/2/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/2/contacts"
      }
    ]
  },
  {
    "id": "3",
    "facilityId": "7",
    "facilityName": "Gadsden",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/3"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/3/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/3/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/3/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/3/contacts"
      }
    ]
  },
  {
    "id": "4",
    "facilityId": "8",
    "facilityName": "Gorgas",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/4"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/4/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/4/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/4/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/4/contacts"
      }
    ]
  },
  {
    "id": "5",
    "facilityId": "10",
    "facilityName": "Greene County",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/5"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/5/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/5/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/5/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/5/contacts"
      }
    ]
  },
  {
    "id": "6",
    "facilityId": "26",
    "facilityName": "E C Gaston",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/6"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/6/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/6/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/6/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/6/contacts"
      }
    ]
  },
  {
    "id": "7",
    "facilityId": "47",
    "facilityName": "Colbert",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/7"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/7/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/7/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/7/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/7/contacts"
      }
    ]
  },
  {
    "id": "8",
    "facilityId": "50",
    "facilityName": "Widows Creek",
    "stateCode": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/8"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/8/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/8/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/8/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/8/contacts"
      }
    ]
  },
  {
    "id": "9",
    "facilityId": "51",
    "facilityName": "Dolet Hills Power Station",
    "stateCode": "LA",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/9"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/9/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/9/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/9/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/9/contacts"
      }
    ]
  },
  {
    "id": "10",
    "facilityId": "54",
    "facilityName": "Smith Generating Facility",
    "stateCode": "KY",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/10"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/10/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/10/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/10/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/10/contacts"
      }
    ]
  }
];
const controlTechnologies = [
  {
    "controlCode": "APAC",
    "controlDescription": "Additives to Enhance PAC and Existing Equipment Performance",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "B",
    "controlDescription": "Baghouse",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  },
  {
    "controlCode": "C",
    "controlDescription": "Cyclone",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  },
  {
    "controlCode": "CAT",
    "controlDescription": "Catalyst (gold, palladium, or other) used to oxidize mercury",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "CM",
    "controlDescription": "Combustion Modification/Fuel Reburning",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "DA",
    "controlDescription": "Dual Alkali",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "DL",
    "controlDescription": "Dry Lime FGD",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "DLNB",
    "controlDescription": "Dry Low NOx Burners",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "DSI",
    "controlDescription": "Dry Sorbent Injection",
    "controlEquipParamCode": null,
    "controlEquipParamDescription": null
  },
  {
    "controlCode": "ESP",
    "controlDescription": "Electrostatic Precipitator",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  },
  {
    "controlCode": "FBL",
    "controlDescription": "Fluidized Bed Limestone Injection",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "H2O",
    "controlDescription": "Water Injection",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "HESP",
    "controlDescription": "Hybrid ESP",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  },
  {
    "controlCode": "HPAC",
    "controlDescription": "Halogenated PAC Sorbent Injection",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "LNB",
    "controlDescription": "Low NOx Burner Technology (Dry Bottom only)",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "LNBO",
    "controlDescription": "Low NOx Burner Technology w/ Overfire Air",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "LNC1",
    "controlDescription": "Low NOx Burner Technology w/ Closed-coupled OFA",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "LNC2",
    "controlDescription": "Low NOx Burner Technology w/ Separated OFA",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "LNC3",
    "controlDescription": "Low NOx Burner Technology w/ Closed-coupled/Separated OFA",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "LNCB",
    "controlDescription": "Low NOx Cell Burner",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "MO",
    "controlDescription": "Magnesium Oxide",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "NH3",
    "controlDescription": "Ammonia Injection",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "O",
    "controlDescription": "Other",
    "controlEquipParamCode": null,
    "controlEquipParamDescription": null
  },
  {
    "controlCode": "OFA",
    "controlDescription": "Overfire Air",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "REAC",
    "controlDescription": "Regenerative Activated Coke Technology",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "SB",
    "controlDescription": "Sodium Based",
    "controlEquipParamCode": null,
    "controlEquipParamDescription": "Other"
  },
  {
    "controlCode": "SCR",
    "controlDescription": "Selective Catalytic Reduction",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "SNCR",
    "controlDescription": "Selective Non-catalytic Reduction",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "SORB",
    "controlDescription": "Other (Non PAC) Sorbent Injection",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "STM",
    "controlDescription": "Steam Injection",
    "controlEquipParamCode": "NOX",
    "controlEquipParamDescription": "Nitrogen Oxides"
  },
  {
    "controlCode": "UPAC",
    "controlDescription": "Untreated PAC Sorbent Injection",
    "controlEquipParamCode": "HG",
    "controlEquipParamDescription": "Mercury"
  },
  {
    "controlCode": "WESP",
    "controlDescription": "Wet ESP",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  },
  {
    "controlCode": "WL",
    "controlDescription": "Wet Lime FGD",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "WLS",
    "controlDescription": "Wet Limestone",
    "controlEquipParamCode": "SO2",
    "controlEquipParamDescription": "Sulfur Dioxide"
  },
  {
    "controlCode": "WS",
    "controlDescription": "Wet Scrubber",
    "controlEquipParamCode": "PART",
    "controlEquipParamDescription": "Particulates (Opacity)"
  }
];
const fuelTypes = [
  {
    "fuelTypeCode": "C",
    "fuelTypeDescription": "Coal",
    "fuelGroupCode": "COAL",
    "fuelGroupDescription": "All Coal"
  },
  {
    "fuelTypeCode": "CRF",
    "fuelTypeDescription": "Coal Refuse",
    "fuelGroupCode": "COAL",
    "fuelGroupDescription": "All Coal"
  },
  {
    "fuelTypeCode": "DSL",
    "fuelTypeDescription": "Diesel Oil",
    "fuelGroupCode": "OIL",
    "fuelGroupDescription": "All Oil"
  },
  {
    "fuelTypeCode": "LPG",
    "fuelTypeDescription": "Liquified Petroleum Gas",
    "fuelGroupCode": "GAS",
    "fuelGroupDescription": "All Gas"
  },
  {
    "fuelTypeCode": "NNG",
    "fuelTypeDescription": "Natural Gas",
    "fuelGroupCode": "GAS",
    "fuelGroupDescription": "All Gas"
  },
  {
    "fuelTypeCode": "OGS",
    "fuelTypeDescription": "Other Gas",
    "fuelGroupCode": "GAS",
    "fuelGroupDescription": "All Gas"
  },
  {
    "fuelTypeCode": "OIL",
    "fuelTypeDescription": "Residual Oil",
    "fuelGroupCode": "OIL",
    "fuelGroupDescription": "All Oil"
  },
  {
    "fuelTypeCode": "OOL",
    "fuelTypeDescription": "Other Oil",
    "fuelGroupCode": "OIL",
    "fuelGroupDescription": "All Oil"
  },
  {
    "fuelTypeCode": "OSF",
    "fuelTypeDescription": "Other Solid Fuel",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  },
  {
    "fuelTypeCode": "PNG",
    "fuelTypeDescription": "Pipeline Natural Gas",
    "fuelGroupCode": "GAS",
    "fuelGroupDescription": "All Gas"
  },
  {
    "fuelTypeCode": "PRG",
    "fuelTypeDescription": "Process Gas",
    "fuelGroupCode": "GAS",
    "fuelGroupDescription": "All Gas"
  },
  {
    "fuelTypeCode": "PRS",
    "fuelTypeDescription": "Process Sludge",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  },
  {
    "fuelTypeCode": "PTC",
    "fuelTypeDescription": "Petroleum Coke",
    "fuelGroupCode": "COAL",
    "fuelGroupDescription": "All Coal"
  },
  {
    "fuelTypeCode": "R",
    "fuelTypeDescription": "Refuse",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  },
  {
    "fuelTypeCode": "TDF",
    "fuelTypeDescription": "Tire Derived Fuel",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  },
  {
    "fuelTypeCode": "W",
    "fuelTypeDescription": "Wood",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  },
  {
    "fuelTypeCode": "WL",
    "fuelTypeDescription": "Waste Liquid",
    "fuelGroupCode": "OTHER",
    "fuelGroupDescription": "All Other Fuels"
  }
];
const unitTypes = [
  {
    "unitTypeCode": "AF",
    "unitTypeDescription": "Arch-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "BFB",
    "unitTypeDescription": "Bubbling fluidized bed boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "C",
    "unitTypeDescription": "Cyclone boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "CB",
    "unitTypeDescription": "Cell burner boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "CC",
    "unitTypeDescription": "Combined cycle",
    "sortOrder": null,
    "unitTypeGroupCode": "T",
    "unitTypeGroupDescription": "Turbines"
  },
  {
    "unitTypeCode": "CFB",
    "unitTypeDescription": "Circulating fluidized bed boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "CT",
    "unitTypeDescription": "Combustion turbine",
    "sortOrder": null,
    "unitTypeGroupCode": "T",
    "unitTypeGroupDescription": "Turbines"
  },
  {
    "unitTypeCode": "DB",
    "unitTypeDescription": "Dry bottom wall-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "DTF",
    "unitTypeDescription": "Dry bottom turbo-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "DVF",
    "unitTypeDescription": "Dry bottom vertically-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "ICE",
    "unitTypeDescription": "Internal combustion engine",
    "sortOrder": null,
    "unitTypeGroupCode": "T",
    "unitTypeGroupDescription": "Turbines"
  },
  {
    "unitTypeCode": "IGC",
    "unitTypeDescription": "Integrated gasification combined cycle",
    "sortOrder": null,
    "unitTypeGroupCode": "T",
    "unitTypeGroupDescription": "Turbines"
  },
  {
    "unitTypeCode": "KLN",
    "unitTypeDescription": "Cement Kiln",
    "sortOrder": null,
    "unitTypeGroupCode": "F",
    "unitTypeGroupDescription": "Furnaces"
  },
  {
    "unitTypeCode": "OB",
    "unitTypeDescription": "Other boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "OT",
    "unitTypeDescription": "Other turbine",
    "sortOrder": null,
    "unitTypeGroupCode": "T",
    "unitTypeGroupDescription": "Turbines"
  },
  {
    "unitTypeCode": "PFB",
    "unitTypeDescription": "Pressurized fluidized bed boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "PRH",
    "unitTypeDescription": "Process Heater",
    "sortOrder": null,
    "unitTypeGroupCode": "F",
    "unitTypeGroupDescription": "Furnaces"
  },
  {
    "unitTypeCode": "S",
    "unitTypeDescription": "Stoker",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "T",
    "unitTypeDescription": "Tangentially-fired",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "WBF",
    "unitTypeDescription": "Wet bottom wall-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "WBT",
    "unitTypeDescription": "Wet bottom turbo-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  },
  {
    "unitTypeCode": "WVF",
    "unitTypeDescription": "Wet bottom vertically-fired boiler",
    "sortOrder": null,
    "unitTypeGroupCode": "B",
    "unitTypeGroupDescription": "Boilers"
  }
];
const states = [
  {
    "stateCode": "AK",
    "stateName": "Alaska",
    "epaRegion": "10"
  },
  {
    "stateCode": "AL",
    "stateName": "Alabama",
    "epaRegion": "4"
  },
  {
    "stateCode": "AR",
    "stateName": "Arkansas",
    "epaRegion": "6"
  },
  {
    "stateCode": "AS",
    "stateName": "American Samoa",
    "epaRegion": "9"
  },
  {
    "stateCode": "AZ",
    "stateName": "Arizona",
    "epaRegion": "9"
  },
  {
    "stateCode": "CA",
    "stateName": "California",
    "epaRegion": "9"
  },
  {
    "stateCode": "CO",
    "stateName": "Colorado",
    "epaRegion": "8"
  },
  {
    "stateCode": "CT",
    "stateName": "Connecticut",
    "epaRegion": "1"
  },
  {
    "stateCode": "DC",
    "stateName": "District Of Columbia",
    "epaRegion": "3"
  },
  {
    "stateCode": "DE",
    "stateName": "Delaware",
    "epaRegion": "3"
  },
  {
    "stateCode": "FL",
    "stateName": "Florida",
    "epaRegion": "4"
  },
  {
    "stateCode": "FM",
    "stateName": "States Of Micronesia",
    "epaRegion": "9"
  },
  {
    "stateCode": "GA",
    "stateName": "Georgia",
    "epaRegion": "4"
  },
  {
    "stateCode": "GU",
    "stateName": "Guam",
    "epaRegion": "9"
  },
  {
    "stateCode": "HI",
    "stateName": "Hawaii",
    "epaRegion": "9"
  },
  {
    "stateCode": "IA",
    "stateName": "Iowa",
    "epaRegion": "7"
  },
  {
    "stateCode": "ID",
    "stateName": "Idaho",
    "epaRegion": "10"
  },
  {
    "stateCode": "IL",
    "stateName": "Illinois",
    "epaRegion": "5"
  },
  {
    "stateCode": "IN",
    "stateName": "Indiana",
    "epaRegion": "5"
  },
  {
    "stateCode": "KS",
    "stateName": "Kansas",
    "epaRegion": "7"
  },
  {
    "stateCode": "KY",
    "stateName": "Kentucky",
    "epaRegion": "4"
  },
  {
    "stateCode": "LA",
    "stateName": "Louisiana",
    "epaRegion": "6"
  },
  {
    "stateCode": "MA",
    "stateName": "Massachusetts",
    "epaRegion": "1"
  },
  {
    "stateCode": "MD",
    "stateName": "Maryland",
    "epaRegion": "3"
  },
  {
    "stateCode": "ME",
    "stateName": "Maine",
    "epaRegion": "1"
  },
  {
    "stateCode": "MH",
    "stateName": "Marshall Islands",
    "epaRegion": "9"
  },
  {
    "stateCode": "MI",
    "stateName": "Michigan",
    "epaRegion": "5"
  },
  {
    "stateCode": "MN",
    "stateName": "Minnesota",
    "epaRegion": "5"
  },
  {
    "stateCode": "MO",
    "stateName": "Missouri",
    "epaRegion": "7"
  },
  {
    "stateCode": "MP",
    "stateName": "Northern Mariana Isl",
    "epaRegion": "9"
  },
  {
    "stateCode": "MS",
    "stateName": "Mississippi",
    "epaRegion": "4"
  },
  {
    "stateCode": "MT",
    "stateName": "Montana",
    "epaRegion": "8"
  },
  {
    "stateCode": "NC",
    "stateName": "North Carolina",
    "epaRegion": "4"
  },
  {
    "stateCode": "ND",
    "stateName": "North Dakota",
    "epaRegion": "8"
  },
  {
    "stateCode": "NE",
    "stateName": "Nebraska",
    "epaRegion": "7"
  },
  {
    "stateCode": "NH",
    "stateName": "New Hampshire",
    "epaRegion": "1"
  },
  {
    "stateCode": "NJ",
    "stateName": "New Jersey",
    "epaRegion": "2"
  },
  {
    "stateCode": "NM",
    "stateName": "New Mexico",
    "epaRegion": "6"
  },
  {
    "stateCode": "NV",
    "stateName": "Nevada",
    "epaRegion": "9"
  },
  {
    "stateCode": "NY",
    "stateName": "New York",
    "epaRegion": "2"
  },
  {
    "stateCode": "OH",
    "stateName": "Ohio",
    "epaRegion": "5"
  },
  {
    "stateCode": "OK",
    "stateName": "Oklahoma",
    "epaRegion": "6"
  },
  {
    "stateCode": "OR",
    "stateName": "Oregon",
    "epaRegion": "10"
  },
  {
    "stateCode": "PA",
    "stateName": "Pennsylvania",
    "epaRegion": "3"
  },
  {
    "stateCode": "PR",
    "stateName": "Puerto Rico",
    "epaRegion": "2"
  },
  {
    "stateCode": "PW",
    "stateName": "Palau",
    "epaRegion": "9"
  },
  {
    "stateCode": "RI",
    "stateName": "Rhode Island",
    "epaRegion": "1"
  },
  {
    "stateCode": "SC",
    "stateName": "South Carolina",
    "epaRegion": "4"
  },
  {
    "stateCode": "SD",
    "stateName": "South Dakota",
    "epaRegion": "8"
  },
  {
    "stateCode": "TN",
    "stateName": "Tennessee",
    "epaRegion": "4"
  },
  {
    "stateCode": "TX",
    "stateName": "Texas",
    "epaRegion": "6"
  },
  {
    "stateCode": "UM",
    "stateName": "Midway Islands",
    "epaRegion": "9"
  },
  {
    "stateCode": "UT",
    "stateName": "Utah",
    "epaRegion": "8"
  },
  {
    "stateCode": "VA",
    "stateName": "Virginia",
    "epaRegion": "3"
  },
  {
    "stateCode": "VI",
    "stateName": "Virgin Islands",
    "epaRegion": "2"
  },
  {
    "stateCode": "VT",
    "stateName": "Vermont",
    "epaRegion": "1"
  },
  {
    "stateCode": "WA",
    "stateName": "Washington",
    "epaRegion": "10"
  },
  {
    "stateCode": "WI",
    "stateName": "Wisconsin",
    "epaRegion": "5"
  },
  {
    "stateCode": "WV",
    "stateName": "West Virginia",
    "epaRegion": "3"
  },
  {
    "stateCode": "WY",
    "stateName": "Wyoming",
    "epaRegion": "8"
  }
];
describe("Filter Criteria Async Actions", () => {
  afterEach(cleanup);

  it("should create appropriate action when update time period action is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const expectedAction = { type: types.UPDATE_TIME_PERIOD, timePeriod: timePeriod };

    const actionDispached  = actions.updateTimePeriod(timePeriod);
    expect(actionDispached).toEqual(expectedAction);
  });

  it("should create BEGIN_API_CALL and LOAD_PROGRAMS_SUCCESS when loading programs data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/programs?exclude=MATS`)
      .reply(200, program);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_PROGRAMS_SUCCESS, program: restructurePrograms(program)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadPrograms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_FACILITIES_SUCCESS when loading facilities data", () => {
    mock
      .onGet(`${config.services.facilities.uri}/facilities`)
      .reply(200, facilities);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_FACILITIES_SUCCESS, facility: facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadFacilities()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_CONTROL_TECHNOLOGIES_SUCCESS when loading control technologies data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/control-technologies`)
      .reply(200, controlTechnologies);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS, controlTechnology: restructureControlTechnologies(controlTechnologies)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadControlTechnologies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_FUEL_TYPES_SUCCESS when loading fuel types data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/fuel-types`)
      .reply(200, fuelTypes);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_FUEL_TYPES_SUCCESS, fuelType: restructureFuelTypes(fuelTypes)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadFuelTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_UNIT_TYPES_SUCCESS when loading unit types data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/unit-types`)
      .reply(200, unitTypes);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_UNIT_TYPES_SUCCESS, unitType: restructureUnitTypes(unitTypes)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadUnitTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_STATES_SUCCESS when loading states data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/states`)
      .reply(200, states);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_STATES_SUCCESS, stateTerritory: states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadStates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_SOURCE_CATEGORY_SUCCESS when loading source Categories data", () => {
    mock
      .onGet(`${config.services.mdm.uri}/source-categories`)
      .reply(200, sourceCategories);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_SOURCE_CATEGORY_SUCCESS, sourceCategory: sourceCategories.map(t=> ({id: t.sourceCategoryDescription, label: t.sourceCategoryDescription, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadSourceCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_TRANSACTION_TYPE_SUCCESS when loading transaction types data", () => {
    const transactionTypes = [
        {
          "transactionTypeCode": "AD",
          "transactionTypeDescription": "Activate Conditional Allowances"
        },
        {
          "transactionTypeCode": "AT",
          "transactionTypeDescription": "Transfer Due to Corrected Energy Conservation"
        },
        {
          "transactionTypeCode": "CASURR",
          "transactionTypeDescription": "Compliance Assurance Surrender"
        },
        {
          "transactionTypeCode": "CC",
          "transactionTypeDescription": "Substitution Control by Contract Deduction"
        },
        {
          "transactionTypeCode": "CR",
          "transactionTypeDescription": "Conservation Issuance"
        },
        {
          "transactionTypeCode": "DE",
          "transactionTypeDescription": "Reallocation Transfer"
        },
        {
          "transactionTypeCode": "DI",
          "transactionTypeDescription": "Reallocation Surrender"
        },
        {
          "transactionTypeCode": "EB",
          "transactionTypeDescription": "Energy Biomass Issuance"
        },
        {
          "transactionTypeCode": "EC",
          "transactionTypeDescription": "Error Correction"
        },
        {
          "transactionTypeCode": "EG",
          "transactionTypeDescription": "Energy Geothermal Issuance"
        },
        {
          "transactionTypeCode": "EMADJ",
          "transactionTypeDescription": "Emissions Adjustment Deduction"
        },
        {
          "transactionTypeCode": "EMISS",
          "transactionTypeDescription": "Emissions Deduction"
        },
        {
          "transactionTypeCode": "ENFSURR",
          "transactionTypeDescription": "Enforcement Surrender"
        },
        {
          "transactionTypeCode": "EP",
          "transactionTypeDescription": "Phase 1 Extension Issuance"
        },
        {
          "transactionTypeCode": "EPAAUCT",
          "transactionTypeDescription": "Purchase at EPA Auction"
        },
        {
          "transactionTypeCode": "ER",
          "transactionTypeDescription": "Error Reversal"
        },
        {
          "transactionTypeCode": "ERLYRED",
          "transactionTypeDescription": "Early Reduction Issuance"
        },
        {
          "transactionTypeCode": "ERRCORR",
          "transactionTypeDescription": "Error Correction"
        },
        {
          "transactionTypeCode": "ERRREV",
          "transactionTypeDescription": "Error Reversal"
        },
        {
          "transactionTypeCode": "ES",
          "transactionTypeDescription": "Energy Solar Issuance"
        },
        {
          "transactionTypeCode": "EW",
          "transactionTypeDescription": "Energy Wind Issuance"
        },
        {
          "transactionTypeCode": "FP",
          "transactionTypeDescription": "Phase 1 Extension Projected Emission Deduction"
        },
        {
          "transactionTypeCode": "IA",
          "transactionTypeDescription": "Initial Allocation"
        },
        {
          "transactionTypeCode": "INITALL",
          "transactionTypeDescription": "Initial Allocation"
        },
        {
          "transactionTypeCode": "INTOESC",
          "transactionTypeDescription": "Contribute to Auction"
        },
        {
          "transactionTypeCode": "JC",
          "transactionTypeDescription": "July Confirmation Credit"
        },
        {
          "transactionTypeCode": "JD",
          "transactionTypeDescription": "July Confirmation Deduction"
        },
        {
          "transactionTypeCode": "LEGACY",
          "transactionTypeDescription": "Transfer from Legacy System"
        },
        {
          "transactionTypeCode": "LO",
          "transactionTypeDescription": "Deduction of Loaned Allowances"
        },
        {
          "transactionTypeCode": "NBPADJ",
          "transactionTypeDescription": "NBP Additional Emissions Deduction from CAIROS Account"
        },
        {
          "transactionTypeCode": "NBPALL",
          "transactionTypeDescription": "CAIROS Transfer from NBP"
        },
        {
          "transactionTypeCode": "NBPOS",
          "transactionTypeDescription": "Conversion of NBP allowances into CAIROS"
        },
        {
          "transactionTypeCode": "NBPPEN",
          "transactionTypeDescription": "NBP Penalty Deduction From CAIROS Account"
        },
        {
          "transactionTypeCode": "NC",
          "transactionTypeDescription": "Termination of NBP allowances into CAIROS"
        },
        {
          "transactionTypeCode": "NEWCSR",
          "transactionTypeDescription": "Distribute Allowances for Revised CSAPR Update"
        },
        {
          "transactionTypeCode": "NEWPROG",
          "transactionTypeDescription": "Distribute Allowances for New Program"
        },
        {
          "transactionTypeCode": "NUSAALL",
          "transactionTypeDescription": "New Unit Set Aside Allocation"
        },
        {
          "transactionTypeCode": "OFFPEN",
          "transactionTypeDescription": "Offset/Penalty Deduction"
        },
        {
          "transactionTypeCode": "OI",
          "transactionTypeDescription": "Opt-In Allocation"
        },
        {
          "transactionTypeCode": "OPTALL",
          "transactionTypeDescription": "Opt-In Allocation"
        },
        {
          "transactionTypeCode": "OPTIN",
          "transactionTypeDescription": "Opt-in Transfer to Replacement Unit"
        },
        {
          "transactionTypeCode": "OR",
          "transactionTypeDescription": "Allocation from Other Reserve"
        },
        {
          "transactionTypeCode": "OSADJ",
          "transactionTypeDescription": "CSAPR Ozone Season Emissions Adjustment Deduction"
        },
        {
          "transactionTypeCode": "OSPEN",
          "transactionTypeDescription": "CSAPR Ozone Season Offset/Penalty Deduction"
        },
        {
          "transactionTypeCode": "OTHALL",
          "transactionTypeDescription": "Other Reserve Allocation"
        },
        {
          "transactionTypeCode": "OUTESC",
          "transactionTypeDescription": "Return Contributed Allowances"
        },
        {
          "transactionTypeCode": "PE",
          "transactionTypeDescription": "Penalty Deduction"
        },
        {
          "transactionTypeCode": "PRIAUCT",
          "transactionTypeDescription": "Purchase at Private Auction"
        },
        {
          "transactionTypeCode": "PRIVATE",
          "transactionTypeDescription": "Private Transfer"
        },
        {
          "transactionTypeCode": "PX",
          "transactionTypeDescription": "Phase 1 Extension Control Failure Deduction"
        },
        {
          "transactionTypeCode": "RC",
          "transactionTypeDescription": "Early Reduction Allocation"
        },
        {
          "transactionTypeCode": "RECALL",
          "transactionTypeDescription": "Recall State Program Allowances"
        },
        {
          "transactionTypeCode": "REISCSR",
          "transactionTypeDescription": "Distribute Revintaged Allowances for Revised CSAPR Update"
        },
        {
          "transactionTypeCode": "REISSUE",
          "transactionTypeDescription": "Distribute Revintaged Allowances"
        },
        {
          "transactionTypeCode": "REMCSR",
          "transactionTypeDescription": "Remove for Revised CSAPR Update Reissuance"
        },
        {
          "transactionTypeCode": "REMOVAL",
          "transactionTypeDescription": "Remove for Reissuance"
        },
        {
          "transactionTypeCode": "RETURN",
          "transactionTypeDescription": "Return of Unsold Allowances from EPA Auction Reserve"
        },
        {
          "transactionTypeCode": "RP",
          "transactionTypeDescription": "Phase 2 Early Reduction Payback"
        },
        {
          "transactionTypeCode": "RR",
          "transactionTypeDescription": "Reverse Reduced Utilization Payback"
        },
        {
          "transactionTypeCode": "RS",
          "transactionTypeDescription": "Reduced Utilization Payback"
        },
        {
          "transactionTypeCode": "RTNCAIR",
          "transactionTypeDescription": "Return of CAIR Allowances"
        },
        {
          "transactionTypeCode": "RTNCRER",
          "transactionTypeDescription": "Return of unused allowances from the Conservation and Renewable Energy Reserve"
        },
        {
          "transactionTypeCode": "RU",
          "transactionTypeDescription": "Reduced Utilization Issuance"
        },
        {
          "transactionTypeCode": "SA",
          "transactionTypeDescription": "State Reallocation"
        },
        {
          "transactionTypeCode": "SC",
          "transactionTypeDescription": "State Cap Issuance"
        },
        {
          "transactionTypeCode": "SD",
          "transactionTypeDescription": "Substitution Distribution"
        },
        {
          "transactionTypeCode": "SE",
          "transactionTypeDescription": "State Cap Deduction"
        },
        {
          "transactionTypeCode": "SM",
          "transactionTypeDescription": "Small Diesel Issuance"
        },
        {
          "transactionTypeCode": "SP",
          "transactionTypeDescription": "State Cap Payback"
        },
        {
          "transactionTypeCode": "SR",
          "transactionTypeDescription": "Reverse Substitution Payback"
        },
        {
          "transactionTypeCode": "SS",
          "transactionTypeDescription": "Substitution Payback"
        },
        {
          "transactionTypeCode": "ST",
          "transactionTypeDescription": "Substitution Termination"
        },
        {
          "transactionTypeCode": "STATE",
          "transactionTypeDescription": "State Reallocation"
        },
        {
          "transactionTypeCode": "SU",
          "transactionTypeDescription": "Substitution Issuance"
        },
        {
          "transactionTypeCode": "TAKEBCK",
          "transactionTypeDescription": "Takeback for Underutilization"
        },
        {
          "transactionTypeCode": "TB",
          "transactionTypeDescription": "Takeback for Underutilization"
        },
        {
          "transactionTypeCode": "TC",
          "transactionTypeDescription": "Terminate to CAIROS"
        },
        {
          "transactionTypeCode": "TD",
          "transactionTypeDescription": "Transfer from Direct Sale to Auction"
        },
        {
          "transactionTypeCode": "TE",
          "transactionTypeDescription": "Emissions Deduction"
        },
        {
          "transactionTypeCode": "TERM",
          "transactionTypeDescription": "Terminate State Program Allowances"
        },
        {
          "transactionTypeCode": "TF",
          "transactionTypeDescription": "Internal Transfer to Reduce Offset"
        },
        {
          "transactionTypeCode": "TM",
          "transactionTypeDescription": "Reduced Utilization Termination"
        },
        {
          "transactionTypeCode": "TR",
          "transactionTypeDescription": "Private Trade"
        },
        {
          "transactionTypeCode": "UNDERUT",
          "transactionTypeDescription": "Underutilization Deduction"
        },
        {
          "transactionTypeCode": "VOLSURR",
          "transactionTypeDescription": "Voluntary Surrender"
        }
    ];
    mock
      .onGet(`${config.services.mdm.uri}/transaction-types`)
      .reply(200, transactionTypes);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_TRANSACTION_TYPE_SUCCESS, transactionType: transactionTypes.map(t=> ({id: t.transactionTypeCode, label: t.transactionTypeDescription, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadTransactionTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_ACCOUNT_TYPES_SUCCESS when loading account types data", () => {
    const accountTypes = [
      {
        "accountTypeCode": "CASURR",
        "accountTypeDescription": "Compliance Assurance Surrender Account",
        "accountTypeGroupCode": "RETIRE",
        "accountTypeGroupDescription": "Surrender"
      },
      {
        "accountTypeCode": "ENFSURR",
        "accountTypeDescription": "Enforcement Surrender Account",
        "accountTypeGroupCode": "RETIRE",
        "accountTypeGroupDescription": "Surrender"
      },
      {
        "accountTypeCode": "FACLTY",
        "accountTypeDescription": "Facility Account",
        "accountTypeGroupCode": "FACLTY",
        "accountTypeGroupDescription": "Facility"
      },
      {
        "accountTypeCode": "GENERAL",
        "accountTypeDescription": "General Account",
        "accountTypeGroupCode": "GENERAL",
        "accountTypeGroupDescription": "General"
      },
      {
        "accountTypeCode": "RESERVE",
        "accountTypeDescription": "EPA Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SERDRES",
        "accountTypeDescription": "State Early Reduction Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SGENRES",
        "accountTypeDescription": "State General Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SNSARES",
        "accountTypeDescription": "New Unit Set Aside Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SOPTRES",
        "accountTypeDescription": "State Opt-In Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SOTHRES",
        "accountTypeDescription": "State Other Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SPRMRES",
        "accountTypeDescription": "State Primary Reserve Account",
        "accountTypeGroupCode": "RESERVE",
        "accountTypeGroupDescription": "Reserve"
      },
      {
        "accountTypeCode": "SRETIRE",
        "accountTypeDescription": "State Retirement Account",
        "accountTypeGroupCode": "RETIRE",
        "accountTypeGroupDescription": "Surrender"
      },
      {
        "accountTypeCode": "SURR",
        "accountTypeDescription": "Surrender Account",
        "accountTypeGroupCode": "RETIRE",
        "accountTypeGroupDescription": "Surrender"
      },
      {
        "accountTypeCode": "UNIT",
        "accountTypeDescription": "Unit Account",
        "accountTypeGroupCode": "UNIT",
        "accountTypeGroupDescription": "Unit"
      },
      {
        "accountTypeCode": "VOLSURR",
        "accountTypeDescription": "Voluntary Surrender Account",
        "accountTypeGroupCode": "RETIRE",
        "accountTypeGroupDescription": "Surrender"
      }
    ];
    mock
      .onGet(`${config.services.mdm.uri}/account-types?exclude=SHOLD|OVERDF`)
      .reply(200, accountTypes);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_ACCOUNT_TYPES_SUCCESS, accountType: restructureAccountTypes(accountTypes)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadAccountTypes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_OWNER_OPERATOR_SUCCESS when loading owner operator data for accounts", () => {
    const ownerOperators = [
      {
        "ownerOperator": "21st Securities",
        "ownType": "OWN"
      },
      {
        "ownerOperator": "5380 Frontier Ave Energy Company LLC",
        "ownType": "OPR"
      },
      {
        "ownerOperator": "5380 Frontier Ave Energy Company LLC",
        "ownType": "OWN"
      },
      {
        "ownerOperator": "A-55, Inc.",
        "ownType": "OWN"
      },
    ];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    mock
      .onGet(`${config.services.account.uri}/accounts/owner-operators`)
      .reply(200, ownerOperators);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_OWNER_OPERATOR_SUCCESS, ownerOperator: distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadOwnerOperators("Account Information")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_OWNER_OPERATOR_SUCCESS when loading owner operator data for allownace compliance", () => {
    const ownerOperators = [
      {
        "ownerOperator": "5380 Frontier Ave Energy Company LLC",
        "ownType": "OPR"
      },
      {
        "ownerOperator": "5380 Frontier Ave Energy Company LLC",
        "ownType": "OWN"
      },
      {
        "ownerOperator": "ABB Energy Ventures, Inc.",
        "ownType": "OPR"
      },
      {
        "ownerOperator": "Acadia Power Partners, LLC",
        "ownType": "OWN"
      },
    ];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    mock
      .onGet(`${config.services.account.uri}/allowance-compliance/owner-operators`)
      .reply(200, ownerOperators);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_OWNER_OPERATOR_SUCCESS, ownerOperator: distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadOwnerOperators("Allowance Based")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create multiple actions when loading all filters for facility/unit attributes emissions type", () => {
    mock
      .onGet(`${config.services.mdm.uri}/programs?exclude=MATS`)
      .reply(200, program);
    mock
      .onGet(`${config.services.mdm.uri}/states`)
      .reply(200, states);
    mock
      .onGet(`${config.services.mdm.uri}/source-categories`)
      .reply(200, sourceCategories);
    mock
      .onGet(`${config.services.facilities.uri}/facilities`)
      .reply(200, facilities);
    mock
      .onGet(`${config.services.mdm.uri}/unit-types`)
      .reply(200, unitTypes);
    mock
      .onGet(`${config.services.mdm.uri}/fuel-types`)
      .reply(200, fuelTypes);
    mock
      .onGet(`${config.services.mdm.uri}/control-technologies`)
      .reply(200, controlTechnologies);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      { type: types.BEGIN_API_CALL },
      //{ type: types.LOAD_PROGRAMS_SUCCESS, program: restructurePrograms(program)},
      { type: types.LOAD_STATES_SUCCESS, stateTerritory: states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}))},
      { type: types.LOAD_SOURCE_CATEGORY_SUCCESS, sourceCategory: sourceCategories.map(t=> ({id: t.sourceCategoryDescription, label: t.sourceCategoryDescription, selected:false, enabled:true}))},
      { type: types.LOAD_FACILITIES_SUCCESS, facility: facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true}))},
      { type: types.LOAD_UNIT_TYPES_SUCCESS, unitType: restructureUnitTypes(unitTypes)},
      { type: types.LOAD_FUEL_TYPES_SUCCESS, fuelType: restructureFuelTypes(fuelTypes)},
      { type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS, controlTechnology: restructureControlTechnologies(controlTechnologies)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadAllFilters("EMISSIONS", "Facility/Unit Attributes", initState.filterCriteria)).then(() => {
      //console.log(JSON.stringify(store.getActions()))
      expect(store.getActions()).toEqual(expectedActions);
    })
  });
});

