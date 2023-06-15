import * as actions from "./filterCriteria";
import * as types from "../actionTypes";
import thunk from "redux-thunk";
import initState from "../../reducers/initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes, restructureAccountTypes, resetFilterHelper, resetCheckBoxItems, resetComboBoxItems, getComboboxEnabledItems, getComboboxSelectedItems} from "../../../utils/selectors/filterCriteria";
import { cleanup } from '@testing-library/react';
import createMockStore from "redux-mock-store";
// Test an async action
const middleware = [thunk];
const mockStore = createMockStore(middleware);
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

const filterMapping = [
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 7,
    stateCode: 'AL',
    ownerOperator: 'Alabama Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 26,
    stateCode: 'AL',
    ownerOperator: 'Alabama Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 26,
    stateCode: 'AL',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 26,
    stateCode: 'AL',
    ownerOperator: 'Southern Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 47,
    stateCode: 'AL',
    ownerOperator: 'Tennessee Valley Authority'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 56,
    stateCode: 'AL',
    ownerOperator: 'PowerSouth Energy Cooperative, Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 641,
    stateCode: 'FL',
    ownerOperator: 'Florida Power & Light Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 642,
    stateCode: 'FL',
    ownerOperator: 'Florida Power & Light Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 645,
    stateCode: 'FL',
    ownerOperator: 'Tampa Electric Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 699,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 703,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 708,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 709,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 710,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 727,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 728,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 733,
    stateCode: 'GA',
    ownerOperator: 'Georgia Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 861,
    stateCode: 'IL',
    ownerOperator: 'Illinois Power Generating Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 862,
    stateCode: 'IL',
    ownerOperator: 'Grand Tower Energy Center, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 863,
    stateCode: 'IL',
    ownerOperator: 'AmerenEnergy Medina Valley Cogen, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 864,
    stateCode: 'IL',
    ownerOperator: 'AmerenEnergy Medina Valley Cogen, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 876,
    stateCode: 'IL',
    ownerOperator: 'Kincaid Generation, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 887,
    stateCode: 'IL',
    ownerOperator: 'Electric Energy, Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 889,
    stateCode: 'IL',
    ownerOperator: 'Dynegy Midwest Generation Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 891,
    stateCode: 'IL',
    ownerOperator: 'Dynegy Midwest Generation Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 892,
    stateCode: 'IL',
    ownerOperator: 'Dynegy Midwest Generation Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 897,
    stateCode: 'IL',
    ownerOperator: 'Dynegy Midwest Generation Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 898,
    stateCode: 'IL',
    ownerOperator: 'Dynegy Midwest Generation Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 983,
    stateCode: 'IN',
    ownerOperator: 'Indiana Kentucky Electric Corp'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 988,
    stateCode: 'IN',
    ownerOperator: 'Indiana Michigan Power Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 990,
    stateCode: 'IN',
    ownerOperator: 'Indianapolis Power & Light Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 991,
    stateCode: 'IN',
    ownerOperator: 'Indianapolis Power & Light Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 994,
    stateCode: 'IN',
    ownerOperator: 'Indianapolis Power & Light Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 995,
    stateCode: 'IN',
    ownerOperator: 'Northern Indiana Public Service Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 997,
    stateCode: 'IN',
    ownerOperator: 'Northern Indiana Public Service Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1001,
    stateCode: 'IN',
    ownerOperator: 'Duke Energy Indiana, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1008,
    stateCode: 'IN',
    ownerOperator: 'Duke Energy Indiana, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1010,
    stateCode: 'IN',
    ownerOperator: 'Duke Energy Indiana, LLC'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1010,
    stateCode: 'IN',
    ownerOperator: null
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1012,
    stateCode: 'IN',
    ownerOperator: 'Southern Indiana Gas and Electric Company'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1043,
    stateCode: 'IN',
    ownerOperator: 'Hoosier Energy REC, Inc.'
  },
  {
    year: '1995',
    programCode: 'ARP',
    facilityId: 1048,
    stateCode: 'IA',
    ownerOperator: 'Interstate Power & Light Company'
  },
];

describe("Filter Criteria Async Actions", () => {
  afterEach(cleanup);
  test("should create appropriate action when update time period action is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const expectedAction = { type: types.UPDATE_TIME_PERIOD, timePeriod: timePeriod };

    const actionDispached  = actions.updateTimePeriod(timePeriod);
    expect(actionDispached).toEqual(expectedAction);
  });

  test('should create BEGIN_API_CALL and load relevant filters', () => {
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_STATES_SUCCESS,
        stateTerritory: states.map((s) => ({
          id: s.stateCode,
          label: s.stateName,
          selected: false,
          enabled: true,
        })),
      },
      {
        type: types.LOAD_FACILITIES_SUCCESS,
        facility: facilities.map((f) => ({
          id: f.facilityId,
          label: `${f.facilityName} (${f.facilityId})`,
          selected: false,
          enabled: true,
        })),
      },
      {
        type: types.LOAD_UNIT_TYPES_SUCCESS,
        unitType: restructureUnitTypes(unitTypes),
      },
      {
        type: types.LOAD_FUEL_TYPES_SUCCESS,
        fuelType: restructureFuelTypes(fuelTypes),
      },
      {
        type: types.LOAD_CONTROL_TECHNOLOGIES_SUCCESS,
        controlTechnology: restructureControlTechnologies(controlTechnologies),
      },
      {
        type: types.LOAD_PROGRAMS_SUCCESS,
        program: restructurePrograms([])
      }
    ];

    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadAllFilters(
          'EMISSIONS',
          'Hourly Emissions',
          initState.filterCriteria
        )
      )
      .then(() => {
        const storeActions = store.getActions()
        expect(storeActions.length).toEqual(expectedActions.length);
      });
  });

  test('reset filter helper function should clear selected items of target filter', () => {
    const state = Object.assign({}, initState, {filterCriteria: {...initState.filterCriteria, facility: facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:true, enabled:true}))}});
    const updatedFilterCriteria = resetFilterHelper(state.filterCriteria, 'Facility')
    expect(updatedFilterCriteria.facility.filter(e=> e.selected).length).toEqual(0)
  });

  test('reset filter helper function should not clear selected items of other filters', () => {
    const state = Object.assign({}, initState, {
      filterCriteria: {
        ...initState.filterCriteria,
        facility: facilities.map((f) => ({
          id: f.facilityId,
          label: `${f.facilityName} (${f.facilityId})`,
          selected: true,
          enabled: true,
        })),
      },
    });
    const updatedFilterCriteria = resetFilterHelper(
      state.filterCriteria,
      'State/Territory'
    );
    expect(
      updatedFilterCriteria.facility.filter((e) => e.selected).length
    ).not.toEqual(0);
  });

  test('resetCheckBoxItems funtion should reset selected items', () => {
    const checkbox = [{
      items: new Array(10)
        .fill(null)
        .map((el, i) => ({ id: i, label: i, selected: true, enabled: true })),
    }];
    resetCheckBoxItems(checkbox);
    expect(checkbox[0].items.filter((e) => e.selected).length).toEqual(0);
    //all items should be still be enabled
    expect(checkbox[0].items.filter((e) => e.enabled).length).not.toEqual(0);
  });

  test('resetComboBoxItems should reset selected items', () => {
    const comboBoxItems = new Array(10)
    .fill(null)
    .map((el, i) => ({ id: i, label: i, selected: true, enabled: true }))
    resetComboBoxItems(comboBoxItems)
    expect(comboBoxItems.filter((e) => e.selected).length).toEqual(0);
    expect(comboBoxItems.filter((e) => e.enabled).length).not.toEqual(0);
  })

  test('getComboboxEnabledItems should return enabled items', () => {
    const comboBoxItems = [{id: 'enabled item', label: 'enabled item', selected:false, enabled:true}, {id: 'disabled item', label: 'disabled item', selected:false, enabled:false}]
    const enabledItems = getComboboxEnabledItems(comboBoxItems);
    expect(enabledItems.length).toEqual(1)
  })

  test('getComboboxSelectedItems should return selected items', () => {
    const comboBoxItems = [{id: 'enabled item', label: 'enabled item', selected:true, enabled:true}, {id: 'disabled item', label: 'disabled item', selected:false, enabled:false}]
    const selectedItems = getComboboxSelectedItems(comboBoxItems);
    expect(selectedItems.length).toEqual(1)
  });

  test("testing loadFilterMapping COMPLIANCE type Allowance Based", () => {
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_FILTER_MAPPING_SUCCESS,
        filterMapping: filterMapping
      }];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadFilterMapping('COMPLIANCE','Allowance Based')
      )
      .then(() => {
        expect(store.getActions().length).toEqual(expectedActions.length);
      });
  })
  test("testing loadFilterMapping COMPLIANCE type Emissions Based", () => {
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_FILTER_MAPPING_SUCCESS,
        filterMapping: filterMapping
      }];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadFilterMapping('COMPLIANCE','Emissions Based')
      )
      .then(() => {
        expect(store.getActions().length).toEqual(expectedActions.length);
      });
  })
  test("testing loadFilterMapping ALLOWANCE Holdings type", () => {
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_FILTER_MAPPING_SUCCESS,
        filterMapping: filterMapping
      }];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadFilterMapping('ALLOWANCE','Holdings')
      )
      .then(() => {
        expect(store.getActions().length).toEqual(expectedActions.length);
      });
  })
  test("testing loadFilterMapping ALLOWANCE Account Information type", () => {
    const expectedActions = [
      { type: 'BEGIN_API_CALL' },
      {
        type: types.LOAD_FILTER_MAPPING_SUCCESS,
        filterMapping: filterMapping
      }];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.loadFilterMapping('ALLOWANCE','Account Information')
      )
      .then(() => {
        expect(store.getActions().length).toEqual(expectedActions.length);
      });
  })
});

