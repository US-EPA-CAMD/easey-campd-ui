import * as actions from "./filterCriteria";
import * as types from "../actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../../config";
import initState from "../../reducers/initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes, restructureAccountTypes} from "../../../utils/selectors/filterCriteria";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);

describe("Filter Criteria Async Actions", () => {
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
    const facilities = [
      {
        "facId": "1",
        "orisCode": "3",
        "name": "Barry",
        "state": "AL",
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
        "facId": "2",
        "orisCode": "5",
        "name": "Chickasaw",
        "state": "AL",
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
        "facId": "3",
        "orisCode": "7",
        "name": "Gadsden",
        "state": "AL",
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
        "facId": "4",
        "orisCode": "8",
        "name": "Gorgas",
        "state": "AL",
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
        "facId": "5",
        "orisCode": "10",
        "name": "Greene County",
        "state": "AL",
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
        "facId": "6",
        "orisCode": "26",
        "name": "E C Gaston",
        "state": "AL",
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
        "facId": "7",
        "orisCode": "47",
        "name": "Colbert",
        "state": "AL",
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
        "facId": "8",
        "orisCode": "50",
        "name": "Widows Creek",
        "state": "AL",
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
        "facId": "9",
        "orisCode": "51",
        "name": "Dolet Hills Power Station",
        "state": "LA",
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
        "facId": "10",
        "orisCode": "54",
        "name": "Smith Generating Facility",
        "state": "KY",
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
    mock
      .onGet(`${config.services.facilities.uri}/facilities`)
      .reply(200, facilities);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_FACILITIES_SUCCESS, facility: facilities.map(f=> ({id: f.orisCode, label:`${f.name} (${f.orisCode})`, selected:false}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadFacilities()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_CONTROL_TECHNOLOGIES_SUCCESS when loading control technologies data", () => {
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
    mock
      .onGet(`${config.services.mdm.uri}/states`)
      .reply(200, states);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_STATES_SUCCESS, stateTerritory: states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadStates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_SOURCE_CATEGORY_SUCCESS when loading source Categories data", () => {
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
    mock
      .onGet(`${config.services.mdm.uri}/source-categories`)
      .reply(200, sourceCategories);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_SOURCE_CATEGORY_SUCCESS, sourceCategory: sourceCategories.map(t=> ({id: t.sourceCategoryCode, label: t.sourceCategoryDescription, selected:false}))},
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
        "transactionTypeCode": "OPTALL",
        "transactionTypeDescription": "Opt-In Allocation"
      },
      {
        "transactionTypeCode": "OPTIN",
        "transactionTypeDescription": "Opt-in Transfer to Replacement Unit"
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
        "transactionTypeCode": "TD",
        "transactionTypeDescription": "Transfer from Direct Sale to Auction"
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
      { type: types.LOAD_TRANSACTION_TYPE_SUCCESS, transactionType: transactionTypes.map(t=> ({id: t.transactionTypeDescription, label: t.transactionTypeDescription, selected:false}))},
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
        {
          "ownerOperator": "ABB Energy Ventures, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ABB Energy Ventures, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Abbott, Martha",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Abby Ingram",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Abraczinskas, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ACT Commodities Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Adams-Columbia Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Adirondack Council",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ADM Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AdvanSix Resins and Chemicals, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AdvanSix Resins and Chemicals, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEP Generation Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AEP Generation Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEP Texas Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AER NY-GEN, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AER NY-GEN, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Ohio Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Ohio Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "African American Environmentalist Assoc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AG Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AG Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ahtamad, Ulhaque L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AirBank",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Liquide",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Air Liquide",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Liquide Large Industries US LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Air Liquide Large Industries US LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Products and Chemicals, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Products LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Akeida Environmental Master Fund, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AK Steel Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AK Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Municipal Electric Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Municipal Electric Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Albany Cogeneration Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Albany Cogeneration Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Albany Green Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alcoa Allowance Management, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alcoa Allowance Management, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alderfer, Brent",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alexander, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algona Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algonquin Power Sanger, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Algonquin Power Sanger, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algonquin Power Windsor Locks, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Algonquin Power Windsor Locks, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allegany Generating Station",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Allegany Generating Station",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allegheny Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Allegheny Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allegheny Energy Supply, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Allegheny Energy Supply, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alliance Coal, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alliant Energy - Interstate Power & Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allowance Holdings Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allowance Management Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alpha Natural Resources, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AL Sandersville LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AL Sandersville LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alstom Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alta Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Altivia Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Altivia Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ameren Energy Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AmerenEnergy Medina Valley Cogen, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AmerenEnergy Medina Valley Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ameresco, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Amerex Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Bituminous Power Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Energy Fuels & Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Lung Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Municipal Power - Ohio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "American Municipal Power - Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AMP368, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AMVEST Coal Sales, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Anderson, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Anderson, Jerry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Angleman, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Anheuser-Busch, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Anheuser-Busch, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Bellingham Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Blackstone Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Operations Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Antonacci, Steven",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Apex Texas Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Apex Texas Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Appalachian Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Appalachian Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Appleton Property Ventures, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Appleton Property Ventures, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Applied Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Aquila Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arcari, Craig W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ArcelorMittal",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal Cleveland, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal USA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal Warren",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Archer Daniels Midland Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Archer Daniels Midland Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arizona Electric Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arizona Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arizona Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arizona Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arkansas Electric Cooperative Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arkansas Electric Cooperative Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arkansas River Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arlington Valley, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arlington Valley, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Armstrong Cement & Supply Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Armstrong Energy, Ltd. Part, LLP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Armstrong Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Armstrong Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arnold, Greg",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arnold, John D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arthur Kill Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arthur Kill Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Asai, Nobuo",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ascend Performance Materials Operations. LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ascend Performance Materials Operations. LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ashland Coal, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Assenmacher, Greg",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Associated Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Associated Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Gas Turbine Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Astoria Gas Turbine Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Operating Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Atlantic City Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Atlantic Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Atlantic Power Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "A.T. Massey Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Auburndale Peaker Energy Center, L.L.C.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Aurora Generation, LLC.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Aurora Generation, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Aust, Richard",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Avenal Power Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Avenal Power Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Avista Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Avista Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Axiall Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ayers, James M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AYP Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Babcock & Brown",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Babcock, Mike",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Babcock & Wilcox",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Backer, Jennifer",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baconton Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Baconton Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baden, Dennis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baker, Russell J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Balcke-Durr, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Balsan, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bancroft Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bangor Hydro-Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bangor Hydro-Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bank of America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barclays Bank, PLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barclays Capital",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barclays Metals Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barclays Physical Trading Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barnabot, Sylvia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barnard-Columbia Earth Coalition",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barnes, Mark C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barney Davis LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Barney Davis LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barpoulis, Sarah M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BASF Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Basilesco, Gary",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Basin Electric Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Basin Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bassett, David A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bastrop Energy Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bastrop Energy Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Battaglia, Mark A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bay City Electric Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayonne Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayonne Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayonne Plant Holding, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayonne Plant Holding, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayswater Peaking Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayswater Peaking Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baytown Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayway Refining Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayway Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bear Energy LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Becker, Adam",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Beemsterboer, Alan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Beemsterboer, Simon A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Beemsterboer, Steven",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bell Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bell, Terry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Benjamin N. Cardozo School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Benjamin, Neil",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Benson Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bentley, Bruce",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Benton Public Utilities District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Benton Public Utilities District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Berkshire Power Company, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Berkshire Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Berlin Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Berlin Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bernard, James H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bernard, Sandra J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bethlehem Structural Products Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bethlehem Structural Products Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bethpage Energy Center 3, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BGC Environmental Brokerage Services, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BHER Power Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BHER Power Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bicent California Malburg, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Brown Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Cajun 1 Peaking Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bigler, Tim",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Rivers Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Big Rivers Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Sandy Peaker Plant, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Big Sandy Peaker Plant, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Binder, J  David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Biomass Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Biomass Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birchwood Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birdsboro Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Birdsboro Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birmingham, William Thomas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birney Elementary School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bisha, Robert M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bishop, Richard C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BIV Generation Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black, Gregory F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills/Colorado Electric Utility Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Electric Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Service Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Wyoming, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black River Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black River Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black River Operating Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blanchard, Patrick",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blecker, David A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Block Island Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Block Island Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bloomfield Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bluefin Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bluegrass Generation Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blue Ridge Paper Products, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Blue Ridge Paper Products, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blue Sky Capital, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blue Source, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blythe Energy Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Blythe Energy Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BNP Paribas Energy Trading GP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BNY Power OPerations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Boardman Power Holdings LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Boardman Power Holdings LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Boling, Drew",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bond, Robert",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Booker, Claiborne B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Borger Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Borger Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Borough of Naugatuck",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bossin, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Boston Trust & Investment Management Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bowater, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bowater, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bowie Power Station",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bowie Power Station",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bowland, Patrick",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bowling, Chester M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BP Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BP-Husky Refining LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BP Products North America Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BP Whiting Business Unit",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BP Whiting Business Unit",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brady, Nancylee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brady, William J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Braes Bayou Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Braes Bayou Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Branch, Paula L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brand, Ronald P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brandywine Hospital",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brascan Energy Marketing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brayton Point Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brayton Point Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Electric Power Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brazos Electric Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Sandy Creek Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Valley Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Breen Energy Solutions",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bridgeport Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bridgeport Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Britt, Mike",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Broad Mountain Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Broad River Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brock, Todd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brookfield Renewable Energy Group",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brooklyn Navy Yard Cogeneration",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brooks, Darrell W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brown, Neal Wayne",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brownsville Public Utilities Board",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brownsville Public Utilities Board",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brunner, Calvin R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brunner Island, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brunner Island, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brunot Island Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brunot Island Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bryan Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bryan Texas Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bryan Texas Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BTEC Turbines LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bubenick, David V",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buchanan Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Buchanan Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buchanan, Harold",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buckeye Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Buckeye Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bucksport Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bucksport Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buffalo Cogen Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buhl, Mary E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Burlington Electric Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Burlington Electric Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buros, Peter H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "B&W  Y-12, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "B&W  Y-12, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cabrillo Power Operations Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cabrillo Power Operations Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cadillac Renewable Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Caithness Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calabrese, Phil",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Caledonia Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calhoun Port Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calhoun Port Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calhoun Power Company I, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calhoun Power Company I, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "California Dept. of Water Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "California Energy Development Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "California Western School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Border, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Border, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Enterprise, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Enterprise, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Panoche, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Panoche, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Vaca Dixon, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Vaca Dixon, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Bethlehem, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Bosque Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Construction Finance Company, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calpine Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Fore River Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Hidalgo Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine King City Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Mid-Atlantic Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Mid Merit, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine New Jersey Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Operating Services Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calpine Operating Services Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calumet Energy Team, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cambridge Electric Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Camden Plant Holding, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Campbell, Don",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CAMS, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal 3 Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal 3 Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Canal Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cannella, Mary",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Canterbury Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Canton Cogen (Megan-Racine Assoc.)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canton Cogen (Megan-Racine Assoc.)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cantor Fitzgerald Brokerage, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Capital Fuels Sales Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Capitol District Energy Center Cogeneration Assoc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carbon Financial Services Pty Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carbon Solutions Group LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cardinal Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill Corn Milling",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill Corn Milling",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cargill, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cargill Power Markets, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carlsbad Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carlsbad Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carmel Canyon LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carney, Mark V",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carolina Clean Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carroll, Brian",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carroll County Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carr Street Generating Station, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carson Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carson Energy Group",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carter, Arlene F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carthage Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carville Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carville Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Casco Bay Energy Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Casco Bay Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Castleton Commodities Merchant Trading L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Castleton Commodity International",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Castleton Commodity International",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Castleton Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Castleton Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Catalano, James N",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Catezone, Barry G",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Catholic University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Catlettsburg Refining, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Catlettsburg Refining, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cavanagh, Coral",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayuga Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayuga Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cayuga Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayuga Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayusa Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CBL Markets (USA) LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CEC-APL, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Bay Generating Co. LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Bay Operating Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cedar Falls Municipal Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cedar Falls Municipal Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Falls Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Celanese Acetate, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Celanese Acetate, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Celanese Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Celanese Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CENEX, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Center for Neighborhood Technology",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Arizona Water Conservation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Iowa Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Iowa Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Maine Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Power & Lime, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Valley Financing Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Vermont Public Service Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Wisconsin Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Centre Finanical Products Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Centric Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CEP Rights, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CER Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CER Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CF & I Steel L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CGC Investments",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chambersburg Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chambersburg Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chambers Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chamon Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chamon Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Channel Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Charlevoix Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chelsea Electric & Water Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cherokee County Cogen Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cherokee County Cogen Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chevron Mining Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chevron Products Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cheyenne Light, Fuel and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chicago Coke Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chicago Coke Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Conemaugh Power II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Conemaugh Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Keystone Power II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Keystone Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Children's Hospital of Philadelphia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chillicothe Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chillicothe Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Choctaw Generation Limited Partnership, LLLP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Choctaw Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Christman, June",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chronister, Brett",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chu, Betty",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chula Vista Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ciba Specialty Chemicals Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cincinnati Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cinergy Power Generation Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cinergy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cinergy Solutions",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citadel Energy Products LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citadel Energy Strategies LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CITGO Petroleum Corporation, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CITGO Petroleum Corporation, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citibank NA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citizens Gas & Coke Utility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citizens Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citizens Thermal",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Citizens Thermal",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Alexandria",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Alexandria",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Ames",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Ames",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Anaheim",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Anaheim",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Austin",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Austin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Bedford",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of  Binghamton, NY",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of  Binghamton, NY",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Burbank",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Burbank",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Carthage",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Chanute",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Chanute",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Chaska",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Colton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Columbia",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Columbia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Dalton, GA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Danville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Detroit",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Detroit",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Dover",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Dover",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Farmington Electric Utility System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Farmington Electric Utility System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Fremont",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Fremont",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Fulton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Glendale",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Glendale",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Hamilton",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Hamilton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Hastings",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Henderson, KY",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Henderson, KY",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Higginsville, MO",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Higginsville, MO",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Holland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Holland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Independence Power & LIght Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Independence Power & LIght Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Jonesboro",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Kingman",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Kingman",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lakeland - Lakeland Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lakeland - Lakeland Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lake Worth Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lake Worth Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lubbock",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lubbock",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Martinsville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Morgan City",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Mulvane",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Mulvane",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Natchitoches",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Natchitoches",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of New Ulm",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Opelousas",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Opelousas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Osceola",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Pasadena Water and Power Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Pasadena Water and Power Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Pella",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Pella",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Richmond",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Riverside, CA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Riverside, CA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Roseville, CA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Roseville, CA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Russell",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Russell",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Ruston",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Ruston",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of San Antonio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of San Antonio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Santa Clara",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Springfield, IL",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Springfield, IL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Springfield, MO",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Springfield, MO",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of St. George",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of St. George",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Tallahassee",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Tallahassee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Vero Beach",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Vero Beach",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Vineland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Vineland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Wamego",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Wamego",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of West Memphis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Winfield Kansas",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Winfield Kansas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City Point Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City Point Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City Public Service",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City Public Service",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clark Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clarksdale Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Clarksdale Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clarkson University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Air Conservancy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Air Council",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Air Markets Division (CAMD)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Air Markets LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Energy Capital International, Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Energy Future - Lordstown, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Clean Energy Future - Lordstown, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clear Lake Cogeneration, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CLECO Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleco Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleco Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleveland Electric Illuminating",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleveland Public Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleveland Public Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cliffs Natural Resources - Northshore Mining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ClimeCo Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ClimeCo Environmental Fund I, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cloud Peak Energy Resources, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CMS Enterprises Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CMS Enterprises Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coalinga Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coalinga Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coastal Oil",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coastal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coastal States Trading, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coatesville Hospital Corp, dba Brandywine Hospital",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cochran, Austin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cochran, Graham",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cochran, Grant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cochran, Grayson",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coffeyville Municipal Light & Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coffeyville Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogen Technologies Linden Venture",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogentrix Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogentrix Energy Power Management LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cogentrix Energy Power Management LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coggins, Jay S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coleto Creek Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coleto Creek Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coleto Creek Power, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coleto Creek Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "College of William & Mary",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Collin Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colmac Clarion Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colonnade Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend II Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend I Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Bend I Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Energy Management, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Power Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Springs Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Springs Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Columbia Business School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Columbus Southern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colver Green Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Comensky, Susan B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Commonwealth Chesapeake Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Commonwealth Chesapeake Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Commonwealth Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Community Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ConAgra Energy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Atlantic Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Conectiv Atlantic Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Delmarva Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Conectiv Delmarva Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Energy Supply, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conemaugh Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conemaugh Power Pass-Through Holders LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Jet Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Connecticut Jet Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Light & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Municipal Electric Energy Coop",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Connecticut Municipal Electric Energy Coop",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Resources Recovery Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conoco Global Power Assets - Sabine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conoco, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conservation Services Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CONSOL Energy Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consolidated Asset Management Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consolidated Edison Development",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consolidated Edison of New York, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consolidated Edison of New York, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consolidated Natural Gas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consolidated WY Municipalities Electric Power System JPB",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constantelos, Basil G",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Energy Commodities Group, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Constellation Energy Commodities Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Power Service Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Constellation Power Service Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consumers Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consumers Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Contra Costa Generating Station LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Contra Costa Generating Station LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conway Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coolidge Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coolidge Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cooney, Paul A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coon Rapids Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cooperative Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cooperative Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coral Energy Resources, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cordaro, Mike",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cordova Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cordova Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corn Belt Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Corn Belt Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CornerStone Energy Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corona Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corporate Growth Solutions, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Corporate Growth Solutions, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corpus Christi Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cosgrove, Amy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cosgrove, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cote, Steven Paul",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cottage Grove Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cottonwood Energy Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Couey, Tyrone",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "County of Los Alamos",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Courage Investment Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Courage Special Situations Master Fund, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Courage Special Situtaitons Fund - II, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Courtney F. Foos Coal Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Covanta Niagara, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Covanta Niagara, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "C. P. Crane, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "C. P. Crane, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "C.P. Crane LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CP Energy Marketing (US) Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPI USA North Carolina LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPI USA North Carolina LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPN Bethpage 3rd Turbine, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CP Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Cana, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Fairview, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Fairview, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Keasbey, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Keasbey, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Maryland, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Sentinel, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Sentinel, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Shore, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Shore, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Towantic, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Towantic, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Valley LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Craft, Donald K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crane Hedge Fund Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cravens, Curtis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Credit Suisse",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Credit Suisse First Boston LLC - Prime Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Creed Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Creed Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crete Energy Venture, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Crete Energy Venture, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cricket Valley Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cricket Valley Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crompton Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crown Central Petroleum Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crown Vantage, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Crozer Chester Medical Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crystle, Gilbert D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CSL Behring",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CSU Environmental Finance",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CT Department of Environmental  Protection",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CXA La Paloma, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CXA La Paloma, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dairyland Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dairyland Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dalton Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dan River Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dan River Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Danskammer Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Danskammer Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Darby Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dartmouth Power Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Davis, Michelle",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Davoudi, Haydeh Z",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dayton Power and Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dayton Power and Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DB Energy Trading LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DCO Operations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dearborn Industrial Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dearborn Industrial Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Decatur Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Decatur Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Decker Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Decker, Rufus G",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DE Department of Natural Resources and Environmental Control",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deephaven Captial Management",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deer Park Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DeJohn, Sandy S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delano Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delaware City Refining Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delaware City Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delaware Municipal Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delaware Municipal Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delta Coals, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delta Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delta Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delta Power Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Democrats of Amherst, NH",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Department of Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DeRosier, Robert R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deseret Generation & Transmission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Deseret Generation & Transmission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Desert Power, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Desert Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "D.E. Shaw Plasma Portfolios, L.L.C.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "D. E. Shaw Synoptic Acquisition 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DeSoto County Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DeSoto County Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Detiege, Charles",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Detroit Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Detroit Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deutsche Bank Securities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Devlin, Theodore E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Devon Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Devon Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DGC Operations",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Diamond Generating Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Diamond Generating Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dickstein Shapiro Morin & Oshinsky",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dighton Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dighton Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DigiLog Capital LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dodge Falls Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dogwood Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DOI - Bureau of Reclamation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy Manchester Street, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dominion Energy Manchester Street, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy Marketing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy Merchant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy South Carolina, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Generation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Domtar Paper Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Domtar Paper Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Doswell Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Doswell Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dow AgroSciences LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dow AgroSciences LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dow Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dow Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DPL EM, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DPL Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DPS Florida, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Drake, Alan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Drummond Coal Sales, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Drummond Company, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Drummond, Garry N",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DSM Nutritional Products, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DSM Nutritional Products, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Calvert City, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Calvert City, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Coal Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE East China, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE East China, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Energy Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Energy Trading, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Pontiac North LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Pontiac North LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Beckjord, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Beckjord, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Carolinas, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Carolinas, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Conesville, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Florida, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Florida, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Florida, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Indiana, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Indiana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Kentucky, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Kentucky, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Progress, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Progress, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Progress, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Progress, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dunkirk Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duplin Bioenergy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duplin Bioenergy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duquesne Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duquette, Marc J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Dicks Creek, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Dicks Creek, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Fayette II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Fayette II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Hanging Rock II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Hanging Rock II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Killen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Marketing and Trade",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Miami Fort, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Miami Fort, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Midwest Generation Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Midwest Generation Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Moss Landing, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Moss Landing, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy South Bay, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy South Bay, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Stuart, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Washington II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Washington II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Zimmer LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Zimmer LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EAD Environmental, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Natrium LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Point Cogen Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Point Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eagle Point Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle US 2 LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Earthmovers Landfill, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastern Associated Coal Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "East Kentucky Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "East Kentucky Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastley, Terry J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastman Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eastman Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastman Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eastman Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "East Texas Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "East Texas Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ebensburg Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ebensburg Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ecofin Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ector County Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E. D. & F. Man International",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EDF TRADING NORTH AMERICA, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edgecombe Genco, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Edgecombe Genco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edison MIssion Marketing and Trading",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edison Mission Operation & Maintenance",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Edwards, Amy K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edwards, Donald B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eesley, Danielle E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Effingham County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E F Kenilworth, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E F Kenilworth, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EFS Parlin Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Egner, M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E I Colton, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E I DuPont de Nemours & Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E I DuPont de Nemours & Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EIF Channelview Cogeneration, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EIF Channelview Cogeneration, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Cajon Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Cajon Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eldridge Electric and Water Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Electric Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Electric Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Electric Generation Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Element Markets Emissions, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elgin Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Elgin Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elk Hills Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Elk Hills Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elm Marketing",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elmwood Park Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Paso Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Paso Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Paso Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Paso Production Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Segundo Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Segundo Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elwood Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elwood Services Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Emera Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emery Oleochemicals LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Emery Oleochemicals LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emission Advisors Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emissions Exchange Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emissions Marketing Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emissions Trading, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Empire District Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Empire District Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Empire Generating Co, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Empire Generating Co, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Encogen Four Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Enel North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energistics Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Center Dover LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Exchange of Chicago, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Holdings",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Energy New England",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Spectrum",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Engie Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ennis Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ennis Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Enron Capital & Trade Resources Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Enron North America Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ensor, Margaret B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ensor, William D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entegra Power Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Asset Management",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Entergy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Louisiana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ENTERGY POWER OPERATIONS U.S.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ENTERGY TEXAS, INC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Asset Management, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Awareness Club",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Law and Policy Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Law Forum",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Law Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Environmental Resources Trust",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Env Law Assn of GWU School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Equistar Chemicals, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Equistar Chemicals, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ergon Refining, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Erie Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Erie Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Escondido Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Escondido Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ESI Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Espeland, Wendy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power Massachusetts, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Massachusetts, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power Newington, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Newington, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power OPP, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power OPP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power Rock Springs, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Rock Springs, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EthosEnergy Power Operations (West), LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ethos Energy Power Plant Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EthosEnergy Power Plant Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Euro Brokers, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Evergy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Evergy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Evolution Markets, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Evraz Rocky Mountain Steel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon Framingham, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon Generation Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon Generation Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon New Boston, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon New England",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon New England Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon West Medway II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon West Medway II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon West Medway, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ExGen Handley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ExGen Handley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ExTex LaPorte Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ExxonMobil Oil Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ExxonMobil Oil Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fairless Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fairless Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fairview Elementary School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Falcon Power Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Falcon Power Operating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Farkas, Caroline",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Farrar, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fathom Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Feeney, Steven",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ferguson, Michael D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ferrentino, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fifth Third Bank",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Financial Systems and Economic Analytics,Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fincham, Carson C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fink, C W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "First Bank & Trust - Brookings, SD",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstEnergy Generation Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstEnergy Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FirstEnergy Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstLight Hydro Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstLight Power Resources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FirstLight Power Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fischer, Bruce R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fitchburg Gas and Electric Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fitchburg Gas and Electric Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fitzgerald, Emily",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Flear, William E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fleck, Joel B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Flett, Michael D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Florida Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Florida Power Developent LL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Florida Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Florida Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Floyd, Matthew L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fola Coal Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Development LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Development LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Operations LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Operations LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fordham Environmental Law Advocates",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ford, Kenneth",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ford Motor Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Forest Investment Group, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Forgash, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Foristar Methane Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Forked River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fort Chicago Energy Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fortis Clearing Americas LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fortistar",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fortistar LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fort Pierce Utilities Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fort Pierce Utilities Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fountain Valley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fountain Valley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPL Energy OSI",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPL Energy Power Marketing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPL Energy Wyman IV, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Wyman IV, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPL Energy Wyman, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Wyman, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Franklin Pierce Environmental Club",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frary, Roger",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freeman United Coal Mining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freeport Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freestone Power Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freni, Charles A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fresno Cogeneration Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freysinger, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Friends of the EE Green Room",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Friscoe, Louis F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frontera Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Frontera Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frontier Oil and Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fuel Tech, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fu, Jong Min",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fulcrum Power Marketing, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fulton Cogeneration Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fulton Cogeneration Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fung, Chester",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fusion Paperboard Connecticut LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fusion Paperboard Connecticut LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gainesville Regional Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gainesville Regional Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gans Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gans Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Garland Power and Light, City of Garland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Garland Power and Light, City of Garland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Garrett, Paul A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Garrison Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gary Lawrence Pacific",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gavin Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GE Energy Financial Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GE Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Geisert, Gregory W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gelber Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenConn Devon LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenConn Middletown, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Aircraft",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Electric Aircraft",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Contractual Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Motors Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Motors Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Generation Holdings LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Genesee Power Station LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Genesee Power Station LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Geneseo Municipal Electric Utility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Geneva Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Geneva Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Bowline, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Bowline, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Chalk Point, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Chalk Point, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Delta, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Delta, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Energy Management LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Mid-Atlantic, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Mid-Atlantic, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn New York, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Northeast Management Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Potomac River, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Potomac River, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Power Midwest, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Power Midwest, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn REMA, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn REMA, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenTex Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Georgia-Pacific Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Georgia-Pacific Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Georgia Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Georgia Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Georgia State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gesicki, Thomas J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Giannone, Andrea",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Giant Cement Holding Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Giant Industries, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Giant Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gibson City Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gibson City Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gila River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilberton Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilberton Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilbert Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilbert Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilbert, Russell",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gill, Daniel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gillenwater, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilroy Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilroy Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Giordano, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GlaxoSmithKline Pharmaceuticals",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Glencore",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Glinsmann, Rodney J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gloski, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GMMM Greenidge, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GMMM Hickling, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GMMM Holdings 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GMMM Jennison, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GMMM Westover, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goal Line, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goal Line, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Godsey, Antonia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Golden Bear Oil Specialties",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Golden Spread Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Golden Spread Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gold, Michele",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gooch, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goodyear Tire & Rubber Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goodyear Tire & Rubber Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goose Haven Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goose Haven Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gordon, Judith R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GP Big Island, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GP Big Island, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GPU Energy, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gradowski, Charles",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Graettinger Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Haven Board of Light and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Haven Board of Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Island Utilities Dept.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Island Utilities Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand River Dam Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand River Dam Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Tower Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Tower Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Granite Ridge Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Granite Ridge Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Granite Shore Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Granite State Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Graphic Packaging International, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Graphic Packaging International, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grasso, Jeanne M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grayling Generating Station, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grayling Generating Station, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grays Ferry Cogen Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grays Harbor Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grays Harbor Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Great River Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Great River Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenberg, Aaron",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Country Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Green Country Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greene, Daniel B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Fund Partners, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenidge Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Greenidge Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenleaf Energy Unit 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Mountain Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenville Electric Utility System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Greenville Electric Utility System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenwaldt, William C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gregg, Paul",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gregory Power Partners LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gregory Power Partners LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gregory Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gremillion, Roger",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gressel, Art",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gressel, Jaron",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gressel, Joe",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gressel, Leon",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grey K Fund LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grider, Joel K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Griffin, Iris N",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Griffith Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Griffith Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Griffon Holdings LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Lost Nation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Lost Nation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Merrimack LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Merrimack LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Newington LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Newington LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Schiller LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Schiller LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP White Lake LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP White Lake LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "G T Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guadalupe Peaking Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guadalupe Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guernsey Power Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Guernsey Power Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gulf Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gunn, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guzman Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hafkey, Dan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Halliday, Douglas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Halterman, S. Elwood",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Halyard Energy Henderson, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Halyard Energy Henderson, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Halyard Energy Wharton, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Halyard Energy Wharton, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamal, Carol K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hambright, James K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamilton Liberty, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamilton, Michael S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamilton Patriot, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamilton, Paul J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamline U. School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Handsome Lake Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Handsome Lake Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hanou, John T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hanselman, Greg E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hansen, Jeff",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hanson, Donald A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harany, Marisa",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harbaugh, Bill",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harbert Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harbor Springs Electricity Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hardee Power Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harlan Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harper, Robert J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hart Board of Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hart, Deborah",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hartman, Nathan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Harvard University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hastings Utilities / City of Hastings, NE",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hausman, Sean",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Haven, Ralph E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Haverford College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hawkeye Energy Greenport, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hawkeye Energy Greenport, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hawkins, Susan J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hays Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hays Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hays Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hazleton Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Heartland Consumers Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hedden, Patrick H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Helix Ironwood, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Helix Ironwood, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Helix Ravenswood, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Helix Ravenswood, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Heller, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hercules Cement Co., L.P. dba Buzzi Unicem USA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hermiston Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hermiston Power Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hermiston Power Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hess, Charles A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "HFR Ed Courage Special Situations Master Trust",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hickory Run Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hickory Run Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "High Desert Power Project, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "High Desert Power Project, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hill, Charlotte E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hill, Forrest E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hill Top Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hill Top Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hobart/William Smith Colleges",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "HO Clarke Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "HO Clarke Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "HO Clarke II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "HO Clarke II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hoffman, Henry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holcim US Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Holcim US Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holland Board of Public Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Holland Board of Public Works",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holly Cross Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holman, Todd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holy Cross Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City Generation LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Honeywell International, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Honeywell Resins & Chemicals LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Honeywell Resins & Chemicals LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hoosier Energy REC, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hoosier Energy REC, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hopewell Cogeneration Facility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hopewell Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hopewell Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horizon Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Horizon Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hornstein, Donald T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horsehead Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Horsehead Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horton, Anna Lee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horton, Bill",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Houston Lighting & Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Houston Lighting & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Howard, Loren H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "H.Q. Energy Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hudson Light and Power Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hughes, Matthew",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hull, B. Jeanine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hummel Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hummel Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunlock Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hunlock Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunter, Doug",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunter, John J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Huntley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Huntley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunt Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hutchinson Utilities Commission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hutchinson Utilities Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hydra-Co Enterprises, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ICAP United Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ICE Clear Europe",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Idaho Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Idaho Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IHI Power Services Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "IHS Energy Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ilion Energy Center",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ilion Energy Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Municipal Electric Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Power Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Illinois Power Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Power Resources Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Illinois Power Resources Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Imperial Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Imperial Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Incinerator Consultants, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Incorporated Village of Freeport",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Incorporated Village of Freeport",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Corinth Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Corinth Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Energy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Energy Services of Silver Springs",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Energy Services of Silver Springs",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Niles, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Niles, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Olean Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Olean Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Oswego Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Oswego Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Yerkes Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Yerkes Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Independence Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Kentucky Electric Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Kentucky Electric Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Michigan Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Michigan Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indianapolis Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indianapolis Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indian River Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indian River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiantown Cogeneration Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiantown Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indorama Ventures Xylenes and PTA, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indorama Ventures Xylenes and PTA, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS Enterprises Holdings Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS Joliet, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS USA LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS USA LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS US Chemicals Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS US Chemicals Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ingold, Barry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ingredion Incorporated",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ingredion Incorporated",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ingredion Incorporated Argo Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Inland Empire Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Inland Empire Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Institute for Techno-Economics",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Integrys Energy Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Intermountain Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Intermountain Power Service Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Intermountain Rural Electric Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "International Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "International Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Interstate Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Interstate Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Int'l Institute of Envir. Economics",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Intrator, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Invenergy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Invenergy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INVISTA  S.a r.l.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INVISTA  S.a r.l.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IPA GDF Suez Plc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IPA Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "IREA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ireland, Paul A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Isbell, Sandra L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ispat Inland Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ithaca College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IVG Energy, Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Izaak Walton League of Virginia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jackson Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jackson Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jacobsen, Joseph T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jaeger Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jamaica Bay Peaking Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jamaica Bay Peaking Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "James Madison University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jamestown Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jamestown Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Janssen Biotech, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jay County Landfill, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JEA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "JEA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jemison Investment Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jensen, Phil",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jersey Atlantic Wind, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "J L Bates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "J L Bates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Johns Hopkins Health System Utilities LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Johnson, Brian",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jonas, Todd S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jonesboro City Water and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jonesboro City Water and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JP Morgan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JP Morgan Chase Bank, National Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JP Morgan Futures, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JPMorgan Ventures Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "J Power USA Development Co, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "J Power USA Development Co, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Judy Thomas, Teledyne Monitor Labs",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Juliar, Mark",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jung, Peter T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Justin-Siena Ecology Club",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kaelin, Larry F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kaiser, George B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kamine Development Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kamine Development Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kaminer, Curt",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KAMO Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kandolha, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kannapolis Energy Partners",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kansas City Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kansas City Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas City Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas Municipal Energy Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kaplan, Jessica",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KapStone Charleston Kraft LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KapStone Charleston Kraft LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KapStone Paper and Packaging Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KapStone Paper and Packaging Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kask, Susan B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KCP&L Greater Missouri Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KCP&L Greater Missouri Operations Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keiser, Terry L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kelly, George W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kendal-Crosslands Communities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kendall Green Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kendall Green Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kendall, Kimberley A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kennecott Coal Sales Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kentucky Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kentucky Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kenyon College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kern Oil & Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kerry, John F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KES Kingsburg, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KES Kingsburg, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kestrel Acquisition LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KeyCon Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Keys Energy Service",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KeySpan Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Cement Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Keystone Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Power Pass-Through Holders LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Urban Renewal, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Key West City Electric System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Key West City Electric System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Khagram, Khushal",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kilkenny, Anne E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kimberly-Clark Tissue Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kimberly-Clark Tissue Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kincaid Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kincaid Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "King, Nancy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "King Street",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "King Street Capital, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "King Street Capital, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "King Street Institutional, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kiowa Power Partners, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kiowa Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kissimmee Utility Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kissimmee Utility Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kiviat, Douglas R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Klamath Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Klamath Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kleen Energy Systems, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kleen Energy Systems, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Klein, Eric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Klopfer, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KMC Thermo, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KMC Thermo, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kneip, Jill",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kochonies, Karen",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Koch Petroleum Group, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Koch Supply & Trading, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kohlhase, Janet",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kolstad, Charles D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Koltun, Robert",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Komadina, Maria",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kopach, Thomas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kopyt, Leon",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kravette, David Lee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Krueger, M Sam",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kruger, Andrew C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kulig, Steven B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lacey, Frank",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lackawanna Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lackawanna Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lack, Randall",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafarge Building Materials, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lafarge North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafayette Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafayette Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafayette Utilities System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lafayette Utilities System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Frontera Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Gloria Oil & Gas Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lake Road Generating Company, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lake Road Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lakeside Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lakewood Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lakewood Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lamar Light and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lamar Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lamar Utilities Board",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lam, Pauline",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lane, Timothy D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lansing Board of Water and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lansing Board of Water and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Palma WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "La Palma WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laredo LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Laredo LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Latham, Marjorie M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Latham, Stephen B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lathi, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laurel Hill Works",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laurell, Nathan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laurens Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lawrenceburg Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lawrence, James R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lawrence, Joseph T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Leafybug International",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lea Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lea Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Learned, Harold J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LeBlanc, Ted",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lebovitz, Aaron",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lee County Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lee County Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lehigh Northeast Cement Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lehigh Northeast Cement Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lehman Brothers Commodity Services Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Leistner, Gilbert",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Leonardo Academy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Leonhardt, Mark A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LevinCollegeEnvironmental Class/CAC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Levin, Peter A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lewis, Lynne",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LG&E and KU Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LGE and KU Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LGE and KU Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LG&E Energy Marketing",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LG&E Energy Marketing Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LG&E Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Bell Funding LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Electric Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Liberty Electric Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Fibers Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Liberty Landfill, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liboreiro, Ernesto S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liebman, Murray",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lima Refinery",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lima Refinery",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lincoln Electric System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lincoln Electric System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lincoln Generating Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lincoln Generating Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lion Oil Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liu, Chung-En",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lively Grove Energy Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lloyd, Matthew D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LMBE Project Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lober, Douglas J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lockport Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lockport Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lodestar Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Arbitrage Fund",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Arbitrage Management, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Marathon Fund LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Marathon Offshore Fund, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Offshore Fund, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loeb Offshore Management, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Logan Generating Co. LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Logsdon, Mary J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lon C Hill, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lon C Hill, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Long, Alexander",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Long Beach Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Long Beach Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Long Island Lighting Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Long Ridge Energy Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Long Ridge Energy Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Longview Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Longview Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lopriore, Richard P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Alamos County",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Angeles Department of Water and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Angeles Department of Water and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Esteros Critical Energy Fac, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Esteros Critical Energy Fac, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Medanos Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Medanos Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louallen, Bob",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louis Dreyfus Energy Services, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louisiana Energy & Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Louisiana Energy & Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louisiana Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Louisiana Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lovette, James P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lowell Cogeneration Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lowell Light & Power Board",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lower Colorado River Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lower Colorado River Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lower Mount Bethel Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LSP Cottage Grove, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LSP Energy Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LS Power Development, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LSP University Park, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LSP University Park, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LSP Whitewater, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LTV Steel Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LTV Steel Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lubbock Power and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lubbock Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Luke Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Luke Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Luminant Generation Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Luminant Generation Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lyndonville Electric Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LyondellBassell",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MAC & Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MacGregor, Steven",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Macquarie Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Macquarie Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MA Department of Environmental Protection",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Madison Gas & Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Madison Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MA Division of Energy Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Magnum Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Maharishi U of Management",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Major Oak Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Major Oak Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Malaga Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Malaga Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Malek, Joseph A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Maltman, James S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manchester Street, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Manchester Street, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manchief Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mandalia, Mahesh Devji",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manitou Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manitowoc Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Manitowoc Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mankato Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mankato Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mannon, Lois",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manson, Tom",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marathon Ashland Petroleum, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marathon Ashland Petroleum, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marathon Petroleum Company LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marathon Petroleum Company LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MARCUS HOOK 50, L.P.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MARCUS HOOK 50, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MARCUS HOOK ENERGY, L.P.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MARCUS HOOK ENERGY, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mariposa Energy, Limited Liability Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mariposa Energy, Limited Liability Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marquette Board of Light and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marquette Board of Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marshall Street Management, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marshfield Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marshfield Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Martini, Stephen C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marx, Leslie M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Bay Transportation Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Bay Transportation Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Institute of Technology",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Institute of Technology",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Municipal Wholesale Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Municipal Wholesale Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Water Resources Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Water Resources Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachussetts Municipal Wholesale",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachussetts Municipal Wholesale",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massey, John H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MASSPOWER",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MASSPOWER",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Matousek, Mark",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Matura, Andrew D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "May, Shaderick",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mazsa, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McAlisterWagner, Lara",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McBride, Barbara H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McDaniel, Karen Sprague",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McDonald Elementary School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McIver, Ann W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McKeever, Ed",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McLaughlin, Keith",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "McNeil, Larry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MC OPCO, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "McPherson Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "McPherson Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MC Project Company LL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MeadWestvaco Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Medical Area Total Energy Plant",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Medical Area Total Energy Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MEG II",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MEG OP Co (Morris Energy Group Operating Company)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Menasha Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Menke, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mercer University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Merchant Energy Group of the Americas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Merck & Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Merck & Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mercuria Energy America, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Merges, Kevin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Merrill Lynch Commodities, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mesabi Nugget Delaware, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mesch, Debra",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mesquite Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mesquite Power Operations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Metcalf Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Metcalf Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Meyer, Carl E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mezgailis, Ivars",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "M F Global, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Miacomm General Trading LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Micatrotto, Stacey",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan Hub LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan Power Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan Power Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan Public Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan State University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MidAmerican Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MidAmerican Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mid-American Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Middle Tennessee State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Middletown Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Middletown Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mid-Georgia Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mid-Georgia Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midland Cogeneration Venture, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midland Cogeneration Venture, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midlothian Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midlothian Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midlothian Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midway Peaking, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midway Peaking, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midwest Electric Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Electric Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midwest Generation EME, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Generation EME, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midwest Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MIECO, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mieczkowski, Mike",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mihura, Eduardo",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Milford Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Milford Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Millennium Environmental Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Millennium Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Millennium Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Miller & Hern",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Miller, James W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Miller, Philip S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Miller, Scott B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milne, Thomas G",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minneapolis South High School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Methane",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnesota Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Power and Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnesota Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnkota Power Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnkota Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant Americas Energy Marketing, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant Energy Trading, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant Lovett, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mirant Lovett, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant New England, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mississippi Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mississippi Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri Basin Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri Joint Municipal Electric Utility Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri River Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mittal Steel USA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mittal Steel USA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mizuho Securities USA, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mobile Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mobile Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Modes, Richard E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Modesto Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Modesto Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Momentive Performance Materials",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Momentive Performance Materials",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MO-MI, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monmouth Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monongahela Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Monongahela Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monroe Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Monroe Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montana Dakota Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montana Dakota Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montana Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montana Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montaup Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montgomery L'Energia Power Partners LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montgomery L'Energia Power Partners LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montour, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montour, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montpelier Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montpelier Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Moore, Jeffery W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morgan Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morgantown Energy Associates",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morgantown Energy Associates",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morris CoGeneration, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morris CoGeneration, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morris Energy Operations Co. LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morrison, John T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morrison, Marks O",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morton, Ben",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mountain Creek Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mountain Creek Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mountain Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mountain Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Moxie Freedom, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Moxie Freedom, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mox, John J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Moxy Trucks of America, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MPC Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MPC Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MRP San Joaquin Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MRP San Joaquin Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MSM Capital Advisors, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MSM Capital Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mt. Carmel Cogeneration, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mt. Carmel Cogeneration, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mt. Tom Generating Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Multifuels L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Multi-Fuels Marketing",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Electric Authority of Georgia",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Municipal Electric Authority of Georgia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Energy Agency of Mississippi",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Energy Agency of Nebraska",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Munoz, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Murphy, Thomas R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Muscatine Power and Water",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Muscatine Power and Water",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Musselman, David T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Naber, Thomas E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NAES",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NAES Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NAES - Shelby County Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Narragansett Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nassau Energy Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nassau Energy Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nassau Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Glenwood Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Glenwood Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Port Jefferson Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Port Jefferson Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Offsets",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National RE/sources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National RE/sources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Salvage & Service Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Salvage & Service Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Natsource Asset Management LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Natsource, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Natsource Mac 77, Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Natural Resources Defense Council",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Navajo Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Navajo Transitional Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Naval Station Great Lakes",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Naval Station Great Lakes",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NC Eastern Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NC Electric Membership Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nebraska Municipal Energy Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nebraska Municipal Energy Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nebraska Public Power District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nebraska Public Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NEO Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NEPA Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nepco Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nephila Capital, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NET Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NET Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Netusil, Noelwah",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nevada Gold Energy  LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nevada Power Company dba NV Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nevada Power Company dba NV Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newark Bay Cogen Partnership, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newark Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Athens Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Athens Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Boston Coke Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Boston Coke Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Castle Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Castle Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Covert Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Covert Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NewEdge USA LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Energy Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New England School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Hampton Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Harquahala Generating Co., LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New-Indy Catawba LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New-Indy Catawba LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Jersey Transit Corporation (NJ TRANSIT)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Jersey Transit Corporation (NJ TRANSIT)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newman & Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newmont Nevada Energy Investment LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Newmont Nevada Energy Investment LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Ulm Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Ulm Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New York Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New York Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New York State Energy R&D Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nextera Energy Operating Services Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NextEra Energy Resources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NGO Industrial Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NGO Industrial Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nguyen, Monica",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NH Department of Environmental Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Niagara Mohawk Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Niemeyer, Victor",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nies Peake, Joy Elizabeth",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Niles Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Niles Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NiSource Energy Technologies, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nissequogue Cogen Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nitschke, Darryl",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Noble Americas South Bend Ethanol, LLC.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Noble Americas South Bend Ethanol, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Noblet, Kevin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "None",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "None",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NorCon Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norsk Environmental LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North American Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northampton Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northampton Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Attleborough Electric Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Carolina Electric Membership Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "North Carolina Electric Membership Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Carolina Renewable Power - Lumberton LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "North Carolina Renewable Power - Lumberton LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northeast Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeastern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Texas Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Utilities Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern California Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern California Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Consolidation Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Illinois Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Indiana Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern Indiana Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Star Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern Star Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Star Generation Services Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern States Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern States Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern States Power (Xcel Energy)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern States Power (Xcel Energy)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northfield Mount Hermon School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Jersey Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NorthWestern Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NorthWestern Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NorthWestern Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northwestern Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northwestern Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northwest Generation Services (Northwest Utilities)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northwest Iowa Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norwalk Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Norwalk Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norwich Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Norwich Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Novarco, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG California South LP.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG California South LP.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG COTTONWOOD TENANT LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Delta LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Delta LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG El Segundo Operations Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Energy, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Energy, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Florida LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Florida LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Homer City Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Marsh Landing LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Potrero LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Potrero LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Power Marketing LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Power Midwest LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Power Midwest LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG REMA LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG REMA LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Sabine River Works, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG South Central - Bayou Cove",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG South Central - Bayou Cove",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Texas Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NSTAR Electric & Gas",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NSTAR Electric & Gas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NTE Carolinas, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NTE Carolinas, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nueces Bay LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nueces Bay LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nunu, Charles L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NV Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NV Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NY Department of Environmental Conservation (HQ)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oak Grove Management Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oak Grove Management Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O'Brien, Ritanne",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O'Callaghan, L J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Occidental Chemical Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Occidental Chemical Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ocean State Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ocean State Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OES Fuel, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OGE Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "OGE Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oglethorpe Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oglethorpe Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oglethorpe Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OGPA Cottage Grove, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OGPA Whitewater, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O'Grady, Jack W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O.H. Hutchings CT, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "O.H. Hutchings CT, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Power Partners, LLC.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Power Partners, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Valley Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Valley Coal Mine Closing Fund",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Valley Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Valley Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Valley Emissions Trust",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O'Kelly, Myles R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oklahoma Gas & Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oklahoma Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oklahoma Municipal Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oklahoma Municipal Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Old Dominion Electric Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Old Dominion Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oleander Power Project, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oleander Power Project, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Olsen, Nancy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Olympus Power Funding LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Olympus Power Funding LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Omaha Public Power District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Omaha Public Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Omega JV2, AMP-Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oneta Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oneta Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Onondaga Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Onondaga Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ontario Power Interconnected Markets, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ontelaunee Power Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ontelaunee Power Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Optim Energy Altura Cogen, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Optim Energy Altura Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orange and Rockland Utilities, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orange Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orange Grove Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orange Grove Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orchowski, Robert W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orchowski, Rosemarie",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oregon Clean Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oregon Clean Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orion Asset Management",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orion Power Holdings, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orion Power Midwest, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orlando CoGen Limited, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orlando Utilities Commission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orlando Utilities Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ormet Primary Aluminum Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ormond Beach Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ormond Beach Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oswego Harbor Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oswego Harbor Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otay Mesa Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otay Mesa Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otsego Paper, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otsego Paper, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otter Tail Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otter Tail Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Overture Trading Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Owensboro Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Owensboro Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pabst, Tim",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacific Ethanol Pekin, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacific Ethanol Pekin, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacific Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacific Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacificorp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacificorp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacificorp Energy Generation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacificorp Energy Generation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Packaging Corporation of America",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Packaging Corporation of America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Padgett, David W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Padua, Francisco",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paducah Power System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Paducah Power System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Page, Gary",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pakulski, Sheila",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Palmer Renewable Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Palmer Renewable Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Palmer, Warren B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Liberty, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Patriot LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Sherman Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Stonewall, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Stonewall, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Temple Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panoche Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panoche Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panther Creek Power Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panther Creek Power Operating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pape, Bryan C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paramount Petroleum Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paris Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Paris Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Parker, James M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Parkey, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Parkhurst Resources Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Park, Leslee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pasadena Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Passive Lessor",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Passive Lessors",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pastoria Energy Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pastoria Energy Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Patry, Jeffrey J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paul, William S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pawtucket Power Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PBF Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PBF Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PDV Midwest Refining, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peabody Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peabody COALSALES Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peabody COALTRADE, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peabody Municipal Light Plant",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Peabody Municipal Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pearce, Stephanie A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pearson, Arthur",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pedricktown Cogeneration Co., LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pegasus Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PEI Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PEI Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pekny, Anthony",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peltzman, Sam",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Penelec",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Penelec",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Penn State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pennsylvania Environmental Council",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pennsylvania Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pennzoil Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "People's Park LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepco Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pepco Energy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepperdine Environment Law Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepsi Americas Co., Austin, IN",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepsi Americas Co., Indianapolis, IN",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepsi Americas Co., Munster, IN",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peregrine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perennial Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Perennial Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Performance Materials NA, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Performance Materials NA, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perkaus, James F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perkins, William O",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perry, Al",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peterman, Dan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peterson, Stacey",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peterson, Victoria",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Petoskey Electric Light Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Petra Nova Parish Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Petsonk, Carol A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Petty, David S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pfeiff, Mike",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pfizer, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pfizer, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P G & E Energy Trading Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PG&E Energy Trading Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P H Glatfelter Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P H Glatfelter Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Phibro LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philadelphia Energy Solutions",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Philadelphia Energy Solutions",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philadelphia Refinery",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philips, Jack",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Phillips 66 Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Phillips 66 Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Phillips, Ray W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philomelus Ventures",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PHR Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pick, Randal W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pierce Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pierce Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pine Bluff Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Piney Creek Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pinnacle West Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pinto, Lauren",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pio Pico Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pio Pico Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pittluck, Brian",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pittsfield Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pixelle Androscoggin LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pixelle Androscoggin LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pixelle Specialty Solutions LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pixelle Specialty Solutions LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plainfield Asset Management LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plaisted, Daniel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plasha, Ed",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Platte River Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Platte River Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pleasants Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pleasants Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pleasants LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pleasants LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plum Point Energy Associates, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Plum Point Energy Associates, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PNM Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PointCarbon",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Polaris Cottage Grove, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Polaris Whitewater, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Polk Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pollution Control Allowance Traders",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Popular Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Port Comfort Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Port Comfort Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Port, David",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland Electric Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland General Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portland General Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portland Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portside Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portside Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portsmouth Business Park, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portsmouth Business Park, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Potomac Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Potomac Power Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Potts, Michael J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Powder River Coal Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Powell, Lynn",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Powell Mountain Coal Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power City Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power & Energy Analytic Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power Resources Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PowerSouth Energy Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PowerSouth Energy Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PPG - O&M Panda Sherman Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPG - O&M Panda Temple Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPL EnergyPlus, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PPL Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPL Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PPL Rights, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prairie Power Incorporated",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Prairie Power Incorporated",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prairie State Generating Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Prairie State Generating Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Praleas Capital, Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pratt & Whitney, Division of Raytheon Technologies Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pratt & Whitney, Division of Raytheon Technologies Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pratt & Whitney, Division of UTC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prebon Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Premcor Refining Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Presnell, Antoinette",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pride Companies, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pritsch, Gunnar",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Procter and Gamble Paper Products Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Procter and Gamble Paper Products Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Procter & Gamble Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ProEnergy Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Progress Energy Carolinas, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Project Orange Associates, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prudential Bache Commodities, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Fossil, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Fossil, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Keys Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Keys Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG New Haven LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG New Haven LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Nuclear, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Nuclear, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power Connecticut, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power Connecticut, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power New York, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power New York, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSI Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public and Environmental Affairs Council",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Power Generation Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Power Generation Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of Colorado",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of Colorado",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of New Mexico",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of New Mexico",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of Oklahoma",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of Oklahoma",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service of New Hampshire",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Works Commission-Fayettville",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Works Commission-Fayettville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Puget Sound Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Puget Sound Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Purdue University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Purdue University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PurEnergy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PurEnergy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PurEnergy Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PurEnergy Operating Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Purvis, Jerry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P&W, Andrew Willgoos Laboratory",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P&W, Andrew Willgoos Laboratory",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pythagoras Global Investors LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quail Run Energy Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Quail Run Energy Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Auburndale Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Lake Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Pasco Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quick, Gary",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quinn, Edward G",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quinnipiac Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Quinnipiac Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quinn, Madison M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "QVC, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rainess, Jeff",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rains, Tom P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ralston, Paul E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rapenske, Robert",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rathdrum Operating Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rathdrum Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Raven Power Fort Smallwood LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Raven Power Fort Smallwood LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "R.C. Cape May Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "R.C. Cape May Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reardon, Peter",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Redding Electric Utility",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Redding Electric Utility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Red Oak Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Red Oak Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RED-Rochester, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RED-Rochester, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reed, Ann",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reedy Creek Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reedy Creek Improvement District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ReEnergy Black River LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ReEnergy Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Refco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Regents of the University of Michigan",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Regents of the University of Michigan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reid, Karen",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy Hunterstown, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reliant Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy Northeast Management Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Renaissance Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Renaissance Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rensselaer Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rensselaer Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Replogle, Thomas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Republic Engineered Products, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Republic Engineered Products, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RG Steel, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rhode Island State Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riad, Hassan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rice Dairy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Richards, Keith",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Richardson, Emily",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Richland-Stryker Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Richland-Stryker Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Richmond Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rico, Renee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ridgefield Capital Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riedl, Lorena",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riley, Chris",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverbay Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverbay Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverside Canal Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverside Canal Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverside Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverside Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "R J Reynolds Tobacco Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "R J Reynolds Tobacco Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Robert Simons & Associate/CAC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Robson, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Roche, Remy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rochester Gas & Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rochester Gas & Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rochester Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rochester Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rock Energy Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockford Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rockford Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RockGen Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RockGen Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockingham Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockport Companies",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockport Emissions Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RockTenn",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RockTenn",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rocky Mountain Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rocky Road Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rocky Road Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rodden, Michelle",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Roeder, James O",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rolling Hills Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rolling Hills Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ronk, Christopher",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rose, Kenneth",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rosenthal Collins Group L.L.C.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rosvold, Richard A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rothman, Zor",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rotunno, Daniel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Round River Alliance",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ROVA Venture, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ROVA Venture, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rowland, Barry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rozgonyi, Eugene V",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RRI Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RRI Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "R S Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ruane, Paul",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rumford Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rumford Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Russell City Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Russell City Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ruzgis, Phil",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ryobi Die Casting  USA Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SABIC Innovative Plastics US LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sabine Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sabine Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacks, Jonathan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Cogeneration Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Municipal Utility Dist",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Mun Utility District Financing Author",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Salinas River Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Salinas River Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Salt River Project",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Salt River Project",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Salyer, John W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sam Rayburn G & T, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sam Rayburn Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandersen, Joel B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "San Diego Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "San Diego Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandow Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandy Creek Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandy Creek Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sandy Hills Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sandy Hills Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "San Joaquin Refining Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "San Miguel Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "San Miguel Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santa Rosa Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Santa Rosa Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santee Cooper",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Santee Cooper",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santella, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santiago Estrada, Julio C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Saracen Energy LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Saracen Merchant Energy LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Saranac Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sareen, Neha",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sargent Canyon Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sargent Canyon Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sasol North America, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Savannah Electric & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sayreville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sayreville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SBF LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SBF LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SCANA Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schaffeld, Robert A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Scheuring, Jasmine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schintzius, Stephen C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schmid, Kerry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schuler, Richard P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schuylkill Energy Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Schuylkill Energy Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schwartz, Matthew A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schwieder, Matthew",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Scott, Kenneth",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Scrubgrass Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Scrubgrass Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Selkirk Cogen Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Selkirk Cogen Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seminara, Nicole",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seminole Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seminole Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sempra Energy Trading",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seneca Power Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seneca Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Severstal North America, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seward Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seward Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seymour-Tedder, Paula",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shady Hills Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shady Hills Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shapiro, James",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sharland, Greg",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shawville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shawville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sheboygan Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shelby County Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shelby County Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shell Chemical Appalachia LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shell Chemical Appalachia LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shelledy, Ross E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shell Energy North America (US), LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shenango Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shenango Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shimoda, Naoki",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Siemens Power Generation Operating Services Co",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sierra Pacific Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sierra Pacific Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sikeston Bd. of Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sikeston Bd. of Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sikeston Power Station",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Silicon Valley Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Silicon Valley Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Silver Bay Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Simmers, Dennis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Simplicity Energy Farms",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sinclair Oil Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sithe Energies Power Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sithe Energies Power Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sithe/Independence Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SJRR Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SJRR Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sloan, Daniel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Small, Philip M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smarr EMC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smart Papers Holdings LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Smith, Barbara C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smith Barney, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smith, Clifford A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smith, Katherine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smith, Michael J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SMU Environmental Law Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smurfit-Stone Container Enterprises",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Snyder, Lewis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SO2 Domestic LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SO2 International Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Partners II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Partners I, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Partners VIII, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Sources, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Turbines, Incorporated",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Solar Turbines, Incorporated",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solid Waste Authority-Central Ohio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Solid Waste Authority-Central Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solios Master Fund Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Somerset Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Somerset Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Somerset Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Somerset Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sonoco Products Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sonoco Products Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South California Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Electric & Gas Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Carolina Electric & Gas Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Fuel Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Carolina Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Public Service Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern California Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern California Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern California Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Illinois Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Illinois Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Illinois University School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Indiana Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Indiana Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Minnesota Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Montana Electric G & T Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Montana Electric G & T Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Nevada Water Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Field Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Houston Green Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Houston Green Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Kortright Central School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Maryland Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Norwalk Electric Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Norwalk Electric Works",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Point Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southshore Environmental, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Texas Electric Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Texas Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowega Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sowega Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spectron Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spencer Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spindle Hill Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Springdale Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springdale Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Springdale Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springdale Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Springs Global US, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springs Global US, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spruance Genco, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Spruance Genco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Square Butte Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stafford, Peary D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stafford, Roberta K",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stahn, Joel",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Staley, Lewis L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stanford Capital Partners Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stanton Clean Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Stanton Clean Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stanton Energy Reliability Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stark Event Master Fund Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stark Master Fund Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "State Line Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "State Line Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Domenico Environmental Club",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Edmonds Academy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sterling Power Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sterling Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stetson College of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stewart, Robert T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Jean, Denis",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Joseph Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "St. Joseph Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St Law U Econ for Enviros '02",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Norbert College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Strickland, Mark F",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SUEZ Energy Generation NA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SUEZ Energy Generation NA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sulfur Stinks",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sullivan, Robert E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Summit Academy North",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sumner Municipal Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunbury Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunbury Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Suncook Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sundevil Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunflower Electric Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunflower Electric Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SunGard Availability Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunoco Partners Marketing & Terminals, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunrise Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunrise Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunstein, Cass",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sutherland, John P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sweeny Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SWG Arapahoe LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SWG Arapahoe LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SWG Colorado, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SWG Colorado, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Swisher, David B",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SYCOM Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Taber, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tait Electric Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tait Electric Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Takiguchi, Hiroaki",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talen Energy Marketing, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talen Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talen Montana, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Talen Montana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talmadge, Alice A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tampa Bay Peace Education",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tampa Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tampa Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tanner Street Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tanner Street Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tate & Lyle Ingredients Americas LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tate & Lyle Ingredients Americas LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Taunton Municipal Lighting Plant",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Taunton Municipal Lighting Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Taylor, Michael",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TBG Cogen Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tehada, Michael A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tejas Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tejas Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Temple Emanuel Confirmation Class",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Alabama Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Alabama Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Frontier Partners, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Frontier Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Gateway Partners, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Gateway Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Georgia Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Georgia Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Pennsylvania Partners, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Pennsylvania Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Power Services Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Virginia Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Virginia Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tennessee Gas Pipeline Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tennessee Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tennessee Valley Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tennessee Valley Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Terra Group, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Terra Management Enterprises, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Terrebonne Parish",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Terrebonne Parish",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "T.E.S. Filer City Station Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tewksbury Investment Fund Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Central Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas City Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Eastern Transmission, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas Eastern Transmission, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas North Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thatcher, Diane",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thatcher, Michael S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Chemours Comany FC, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Chemours Comany FC, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Chemours Company FC, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Chemours Company FC, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Dow Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Empire District Electric Co - a Liberty Utilities Co",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Theriot, Kim S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Vanguard Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thiel, Stuart E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thomas Jefferson University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thomas M. Cooley Law Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thoroughbred Gen Station Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tides Foundation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tilton Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tilton Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tipton Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Titus, Lance",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Titus Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Titus Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tiverton Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tiverton Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tolbert, Todd A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Toledo Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Toledo Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tolna Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tolna Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Toombs, David J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Topaz Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Topaz Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Topaz II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Topaz II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Topaz Power Group, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Topaz Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tosco Trainer Refinery",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Touitou, Ilan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Town of Braintree Electric Light Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Town of Braintree Electric Light Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Town of Richlands, VA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Toyota Tsusho Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TPC Cottage Grove, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TPG - Axon Partners, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tractebel Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tradition Financial Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trafigura AG",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TransAlta",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TransAlta",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TransCanada Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Traverse City Light & Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Traverse City Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tremblay, Richard J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trevor Hunt Stansbury",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trewitt, Greg",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-Center Naniwa Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-Center Naniwa Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trigen-Boston Energy Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Trigen-Boston Energy Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trigen-St. Louis Energy Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Trigen-St. Louis Energy Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trillo, Thomas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-State Generation & Transmission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-State Generation & Transmission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-State G & T Association, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-State G & T Association, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Troy Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Troy Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trustees of the University of Pennsylvania",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tucson Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tucson Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Turcanu, Laura",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Turlock Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Turlock Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Turner, Alexander",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Turner, Kyle",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TV Nation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Twin Eagle Resource Management, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Twin Oaks Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Energy Trading",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Energy Trading Management Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tyticus Partners L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UGI Development Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UGI Development Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UGID Holding",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Unified Port of San Diego",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Carbide Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Union Carbide Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Union Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Parcel Service, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Power, a division of ICAP United Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Sciences Testing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United States Bureau of Reclamation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United States Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Taconite, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Chicago",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Iowa Environmental Law Society",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Michigan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Minnesota",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of North Carolina at Chapel Hill",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "University of North Carolina at Chapel Hill",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Wisconsin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of Wisconsin - Parkside Mission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University Park Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "University Park Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Univ of Tampa Environmental Protection Coalition",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UNS Electric, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UNS Electric, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "U. S. Bank National Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Gen New England, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "U.S. Navy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U.S. Navy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "U.S. Oil & Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "U.S. Operating Services Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel Corp., Gary Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U S Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel Corporation - Clairton Coke Ops",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corporation - Edgar Thompson",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corporation - Fairfield Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel, LLC, South Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Associated Municipal Power Systems",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Associated Municipal Power Systems",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Utah Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Utley, Jeff",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Utting, Brian J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UW AAE343",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UW-Green Bay",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UWP - Environmental Economics",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Valencia Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Valencia Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Valero Refining Company - NJ",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "VanBrackle, Robert M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vandolah Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vandolah Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Van Horn, Andrew J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vectren Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Velasquez, Jack",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Venice Asset Management Pty Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Veolia Energy North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Veolia Energy Philadelphia, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Veolia Energy Philadelphia, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Verizon",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vermillion Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vermillion Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vermont Law School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria City Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria City Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria Port Power II LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria Port Power II LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria Port Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria Port Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vienna Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vienna Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Village of Lydonville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vineland Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vining, Christine N",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vining, Paul H",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Virginia Department of Environmental Quality",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Virginia Electric & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Virginia Power Energy Marketing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vista Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vitol Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vitol SA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "VT Public Power Supply Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wabash Valley Power Association, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waibel, Dan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walleye Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walleye Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wallingford Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wallingford Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wallis, Lisa",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walnut Creek Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walnut Creek Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walnut Energy Center Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walsh, Daniel J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walsh, Michael J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton Bainbridge LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton Bainbridge LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton County Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton Discover LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton Discover LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walz, Barbara A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Warren Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Warren Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "War, William",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Washington College Student Environmental Alliance",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Washington County Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Washington County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waste Management of Indiana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterbury Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Waterbury Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterford Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterloo Coal Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterside Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Waterside Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Watson, Mark P",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Watson, William D",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waverly Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WCAC Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Webb, Robert L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Webster City Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "We Energies",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "We Energies",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Weihe, Richard",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Weiss, Craig A",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wellhead Electric Company, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wellhead Power Gates, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wellhead Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wellhead Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wengraf, John",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westar Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westar Generating",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Bend Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Deptford Energy Associates Urban Renewal, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Deptford Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West, Edwin L",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Farmers Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Western Farmers Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Kentucky Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Massachusetts Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Minnesota Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Memphis Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westmoreland Partners LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock Coated Board, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock Coated Board, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock CP, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock CP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock Virginia Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock Virginia Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Texas Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West Texas Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Weyerhaeuser Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Weyerhaeuser Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WGP Redwood Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wharton County Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wharton County Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wheelabrator Frackville Energy Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wheelabrator Frackville Energy Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wheelabrator Ridge Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wheelabrator Ridge Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wheeling Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "White, Darcy J C",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Whitewater Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Whiting Clean Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Whiting Clean Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Whiting, R M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wickliffe Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wickliffe Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Widener Univ. School of Law",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wigell, Kevin W",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wildflower Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wildflower Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Williams, David M",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Williams Flexible Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Williams Four Corners LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Williams, Lewis Garry",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Williams Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wills, Elaine R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Winberg, Steven E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Winrock International",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wirth, Lucas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Public Power Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Public Power Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Public Service Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Public Service Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wise County Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wise County Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "W J Enterprises LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wojick, David E",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hills Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolf Hills Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow II Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow I Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolf Hollow I Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolverine Power Supply Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolverine Power Supply Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WoodardCurran",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wood Group Power Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wood Group Power Operations, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wood Group Power Plant Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Woolley, Steve",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Woolwine, Darren",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Worthen-Lodes, Laura",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WPS Power Development, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WPS Power Development, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wratt Foundation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WRB Refining LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wunderlich, Joseph",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WV Alloys, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WV Alloys, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wyandotte Municipal Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wyandotte Municipal Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wynne, Jennifer S",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wyoming Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wyoming Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Xcel Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Xcel Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yaksick, Rudy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yale Law School",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yates, Andrew J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yates, Michael T",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Zaborowsky, Peter J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Zapfel, Peter",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Zietler, Richard J",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Zion Energy Center, LLC",
          "ownType": "OWN"
        }
    ];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    mock
      .onGet(`${config.services.account.uri}/accounts/owner-operators`)
      .reply(200, ownerOperators);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_OWNER_OPERATOR_SUCCESS, ownerOperator: distinctOwnOpers.map(s=> ({id: s, label: s, selected:false}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadOwnerOperators("Account Information")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_OWNER_OPERATOR_SUCCESS when loading owner operator data for allownace compliance", () => {
    const ownerOperators = [
      [
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
        {
          "ownerOperator": "A/C Power - Colver Operations",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Adams-Columbia Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AdvanSix Resins and Chemicals, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AdvanSix Resins and Chemicals, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEE 2, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEP Energy Partners Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEP Generation Resources, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "AEP Generation Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AEP Generation Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AEP Pro Serv, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AEP Texas Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AER NY-GEN, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AER NY-GEN, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "AES Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Eastern Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Hawaii, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Hawaii, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Ohio Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Ohio Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Puerto Rico, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Puerto Rico, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Shady Point, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AES Shady Point, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AES Somerset, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "A E Staley Manufacturing Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "AES Westover, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AG Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AG Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ahlstrom Windsor Locks Cogeneration",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Air Liquide",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Air Liquide",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Air Liquide",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Liquide Large Industries US LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Air Liquide Large Industries US LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Air Products and Chemicals, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Air Products and Chemicals, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Air Products LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AK Steel Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AK Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Electric Cooperative, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Alabama Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Municipal Electric Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Municipal Electric Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alabama Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alabama Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Albany Green Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alcoa Allowance Management, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Alcoa Allowance Management, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alcoa Allowance Management, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algona Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algonquin Power Sanger, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Algonquin Power Sanger, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Algonquin Power Windsor Locks, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Algonquin Power Windsor Locks, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alhas Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allegany Generating Station",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Allegany Generating Station",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Allegheny Energy",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Allegheny Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Allegheny Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alliant Energy - Interstate Power & Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alliant Energy Resources, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Alliant Energy Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AlphaGen Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "AL Sandersville LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AL Sandersville LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alstom Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Alta Gas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AltaGas Power Holdings (U.S.) Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AltaGas San Joaquin Energy Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AltaGas San Joaquin Energy Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Alta Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Altivia Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Altivia Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Altura Power LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Amanda Funding, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ameramex Energy Group, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ameren Energy Generating Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ameren Energy Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AmerenEnergy Medina Valley Cogen, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "AmerenEnergy Medina Valley Cogen, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "AmerenEnergy Medina Valley Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ameren Energy Resources",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "American Bituminous Power Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Electric Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "American Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "American Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Municipal Power - Ohio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "American Municipal Power - Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "American Refuel Company of Niagara",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "American Sugar Refining, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "American Sugar Refining, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "AMP368, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Androscoggin Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Anheuser-Busch, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Anheuser-Busch, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Bellingham Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Blackstone Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ANP Operations Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "ANP Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ANP Operations Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Appalachian Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Appalachian Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Appleton Coated, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Appleton Coated, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Appleton Property Ventures, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Appleton Property Ventures, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Applied Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Applied Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Aquila Power Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Aquila Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Aquila Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ArcelorMittal",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal Cleveland, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ArcelorMittal Warren",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Archer Daniels Midland Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Archer Daniels Midland Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arizona Electric Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arizona Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arizona Public Service Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Arizona Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arizona Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arkansas Electric Cooperative Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arkansas Electric Cooperative Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arkansas River Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arlington Valley, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arlington Valley, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Armstrong Energy, Ltd. Part, LLP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Armstrong Energy, Ltd. Part, LLP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Armstrong Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Armstrong Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Arthur Kill Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Arthur Kill Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ascend Performance Materials LLC. - Decatur Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ascend Performance Materials Operations. LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ascend Performance Materials Operations. LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Associated Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Associated Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Astoria Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Astoria Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Gas Turbine Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Astoria Gas Turbine Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Astoria Operating Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Athens Generating Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Atlantic City Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Atlantic City Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Atlantic City Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Atlantic Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Atlantic Power Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Atlantis Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Attala Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Auburndale Peaker Energy Center, L.L.C.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Auburndale Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Aurora Generation, LLC.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Aurora Generation, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Austin Utilities",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Aventine Renewable Energy, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Aventis CropScience, USA LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Avista Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Avista Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Axiall Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Baconton Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Baconton Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baltimore Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bancroft Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bangor Hydro-Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bangor Hydro-Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bank of New York",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barney Davis LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Barney Davis LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Barney M Davis, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Barney M Davis, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BASF Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Basin Electric Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Basin Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bastrop Energy Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bastrop Energy Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bastrop Energy Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bay City Electric Light & Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bay City Electric Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayer CropScience",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bayer CropScience",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayer CropScience",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayonne Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayonne Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayonne Plant Holding, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayonne Plant Holding, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bay Shore Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayswater Peaking Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayswater Peaking Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Baytown Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bayway Refining Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bayway Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bell Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Benson Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Benson Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Benton Public Utilities District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Benton Public Utilities District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Beowulf Energy LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Berkshire Power Company, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Berkshire Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Berlin Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Berlin Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bethlehem Structural Products Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bethlehem Structural Products Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bethpage Energy Center 3, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BHER Power Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BHER Power Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bicent California Malburg, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Brown Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Cajun 1 Peaking Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Rivers Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Big Rivers Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Big Sandy Peaker Plant, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Big Sandy Peaker Plant, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Big Sandy Peaker Plant, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Binghamton BOP, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Binghamton BOP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Biomass Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Biomass Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birchwood Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Birdsboro Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Birdsboro Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BIV Generation Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills/Colorado Electric Utility Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Black Hills Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Electric Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black Hills Service Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black Hills Wyoming, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black River Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black River Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Black River Operating Services, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Black River Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Black River Operating Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bluegrass Generation Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bluegrass Generation Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blue Ridge Paper Products, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Blue Ridge Paper Products, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blue Spruce Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blythe Energy Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Blythe Energy Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Blythe Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "BNY Power OPerations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Boardman Power Holdings LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Boardman Power Holdings LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Borger Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Borger Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bosque Power Company LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bowater, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bowater, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bowater, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BP Amoco Chemical Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "BP Amoco Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BP Amoco Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "B P Amoco Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "BP Energy",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "BP-Husky Refining LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BP Products North America Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BP Whiting Business Unit",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "BP Whiting Business Unit",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Braintree Electric Light Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Braintree Electric Light Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brascan Energy Marketing, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brayton Point Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brayton Point Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Electric Power Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brazos Electric Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Sandy Creek Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brazos Valley Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bridgeport Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bridgeport Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Broad Mountain Partners",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Broad River Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brookfield Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brookfield Renewable Energy Group",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brooklyn Navy Yard Cogeneration",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brownsville Public Utilities Board",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brownsville Public Utilities Board",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brown & Williamson Tobacco Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brunner Island, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brunner Island, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Brunot Island Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Brunot Island Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bryan Municipal Utilities",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Bryan Texas Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bryan Texas Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "BTEC Turbines LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buchanan Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Buchanan Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Buckeye Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Buckeye Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bucksport Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Bucksport Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Bucksport Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Burlington Electric Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Burlington Electric Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "B&W  Y-12, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cabrillo Power Operations Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cabrillo Power Operations Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cadillac Renewable Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Caithness Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Caithness Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cajun Electric Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calcasieu Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Caledonia Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Caledonia Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Caledonia Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calhoun Power Company I, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calhoun Power Company I, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "California Dept. of Water Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "California Energy Development Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Border, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Border, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Enterprise, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Enterprise, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CalPeak Power - Panoche, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Panoche, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CalPeak Power - Vaca Dixon, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CalPeak Power - Vaca Dixon, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Bethlehem, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Bosque Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Construction Finance Company, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Calpine Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calpine Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Fore River Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Greenleaf Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Hidalgo Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine King City Cogen, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calpine King City Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Mid-Atlantic Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Mid Merit, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Calpine Mid Merit, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine New Jersey Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Oneta Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Calpine Operating Services Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Calumet Energy Team, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Calumet Energy Team, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cambria CoGen Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cambria CoGen Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cambridge Electric Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Camden Cogen, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Camden Plant Holding, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CAMS, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal 3 Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal 3 Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Canal Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Canal Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Capital Power Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Capital Power Operations (USA) Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Capitol District Energy Center Cogeneration Assoc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Capstone Global Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cardinal Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill Corn Milling",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill Corn Milling",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cargill, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cargill, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carlsbad Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carlsbad Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carroll County Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carr Street Generating Station, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carson Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carson Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carson Energy Group",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carthage Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Carville Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Carville Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Casco Bay Energy Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Casco Bay Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Castleton Commodity International",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Castleton Commodity International",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Castleton Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Castleton Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Caterpillar Finance",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Catlettsburg Refining, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Catlettsburg Refining, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayuga Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cayuga Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cayuga Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CCI Rensselaer LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CCI Roseton LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CEC-APL, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Bay Generating Co. LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Bay Operating Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cedar Falls Municipal Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cedar Falls Municipal Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cedar Falls Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CED Operating Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CED Operating Company, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Celanese Acetate, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Celanese Acetate, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Celanese Acetate, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Celanese Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Celanese Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central and South West Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Illinois Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Central Illinois Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Illinois Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Iowa Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Iowa Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Mississippi Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Central Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Power and Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Central Power and Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Power and Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Power & Lime, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central & South West Services, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Central Valley Financing Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Vermont Public Service Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Central Wisconsin Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Centric Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CER Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CER Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CER Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chambersburg Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chambersburg Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chambers Cogeneration, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Chambers Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chamon Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chamon Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Channel Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Charlevoix Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chattahoochee EMC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chehalis Power Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Chelsea Electric & Water Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cherokee County Cogen Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cherokee County Cogen Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cherokee County, South Carolina",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cheyenne Light, Fuel and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chicago Coke Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chicago Coke Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chickahominy River Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Conemaugh Power II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Conemaugh Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Conmaugh Power II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Keystone Power II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chief Keystone Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Chillicothe Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chillicothe Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Choctaw Gas Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Choctaw Gas Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Choctaw Generation Limited Partnership, LLLP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Choctaw Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Chula Vista Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cincinnati Gas & Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cincinnati Gas & Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cincinnati Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cinergy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cinergy Capital and Trading, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cinergy Power Generation Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cinergy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cinergy Solutions",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cinergy Solutions O & M, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CITGO Petroleum Corporation, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CITGO Petroleum Corporation, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Citizens Thermal",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Citizens Thermal",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Alexandria",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Alexandria",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Ames",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Ames",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Anaheim",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Anaheim",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Austin",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Austin",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Benson",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of  Binghamton, NY",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of  Binghamton, NY",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Bryan",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Burbank",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Burbank",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Carthage",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Chanute",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Chanute",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Chaska",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Clark",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Clarksdale",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Coldwater, MI",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Colton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Columbia",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Columbia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Dalton, GA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Detroit",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Detroit",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Dover",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Dover",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Duluth",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Eldridge",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Farmington Electric Utility System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Farmington Electric Utility System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Fremont",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Fremont",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Fulton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Garland",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Geneseo",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Glendale",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Glendale",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Greenville",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Hamilton",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Hamilton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Harlan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Hastings",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Hastings",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Henderson, KY",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Henderson, KY",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Higginsville, MO",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Higginsville, MO",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Hillsdale, MI",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Holland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Holland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Independence",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Independence",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Independence Power & LIght Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Independence Power & LIght Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Jamestown",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Jamestown",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Jonesboro",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Klamath Falls",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lakeland - Lakeland Electric",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Lakeland - Lakeland Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lakeland - Lakeland Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lake Worth Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lake Worth Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Lubbock",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Lubbock",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Lubbock",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Marshall, MI",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Marshfield",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Morgan City",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Muscatine",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Muscatine",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Natchitoches",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Natchitoches",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of New Madrid",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of New Madrid",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of New Ulm",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Opelousas",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Opelousas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Osceola",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Owensboro",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Owensboro",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Pasadena Water and Power Department",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Pasadena Water and Power Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Pasadena Water and Power Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Pella",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Pella",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Provo",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Richmond",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Richmond",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Riverside, CA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Riverside, CA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Roseville, CA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Roseville, CA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Ruston",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Ruston",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of San Antonio",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of San Antonio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of San Antonio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Santa Clara",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Santa Clara",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Santa Clara",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Springfield, IL",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Springfield, IL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Springfield, MO",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Springfield, MO",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of St. George",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of St. George",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Tallahassee",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Tallahassee",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Tipton",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Vernon",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "City of Vero Beach",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Vero Beach",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Vineland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Vineland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Waverly",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City of Winfield Kansas",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City of Winfield Kansas",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City Point Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City Point Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "City Public Service",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "City Public Service",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clark Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clarksdale Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Clarksdale Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clean Energy Future - Lordstown, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Clean Energy Future - Lordstown, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Clear Lake Cogeneration, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CLECO Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CLECO Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleco Evangeline, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cleco Evangeline, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleco Generation Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleco Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleco Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleveland Cliffs, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleveland Electric Illuminating",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleveland Electric Illuminating",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cleveland Public Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cleveland Public Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cliffs Natural Resources - Northshore Mining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CMD Carson, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CMS Enterprises Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CMS Enterprises Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coalinga Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coalinga Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coastal Carolina Clean Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coastal Carolina Clean Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coastal Eagle Point Oil Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Coastal Technology, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "COB Energy Facility, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cobisa Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coffeyville Municipal Light & Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coffeyville Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CoGen Lyondell, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "COGEN South, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cogen Technologies Linden Venture",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cogen Technologies Linden Venture",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogen Technologies - NJ Venture",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogentrix Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cogentrix Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cogentrix Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cogentrix Energy Power Management LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cogentrix Virginia Leasing Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cognis Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Cognis Oleochemicals, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Coleto Creek Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coleto Creek Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coleto Creek Power, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coleto Creek Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coleto Creek WLE, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Collin Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colmac Clarion Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend II Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend I Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Bend I Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Bend Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Energy Management, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Power Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colorado Springs Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Colorado Springs Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colstrip Energy Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Columbia Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Columbia Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Columbia Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Columbus Southern Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Columbus Southern Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Columbus Southern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Colver Green Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Combined Locks Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Commonwealth Atlantic, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Commonwealth Chesapeake Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Commonwealth Chesapeake Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Commonwealth Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Commonwealth Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Commonwealth Shore Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Competitive Power Ventures, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Complete Energy Partners",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conectiv Atlantic Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conectiv Atlantic Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Conectiv Atlantic Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Bethlehem, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conectiv Delmarva Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conectiv Delmarva Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Conectiv Delmarva Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conectiv Energy",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conectiv Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Conemaugh Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conemaugh Power Pass-Through Holders LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Jet Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Connecticut Jet Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Light & Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Connecticut Municipal Electric Energy Coop",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Connecticut Municipal Electric Energy Coop",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Connecticut Resources Recovery Authority",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Connecticut Resources Recovery Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conoco Global Power Assets - Sabine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Conoco Global Pwr Devel-Sabine, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ConocoPhillips Co., Trainer Refinery",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "ConocoPhillips Co., Wood River Refinery",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consolidated Asset Management Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consolidated Edison Development",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Consolidated Edison of New York, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consolidated Edison of New York, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Consolidated WY Municipalities Electric Power System JPB",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Energy Commodities Group, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Constellation Energy Commodities Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Mystic Power LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Constellation NewEnergy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Constellation Power Service Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Constellation Power Service Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Constellation Power Source Generation Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Constellation Power Source Generation Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consumers Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Consumers Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Continental Cooperative Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Contra Costa Power Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Conway Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coolidge Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Coolidge Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Coon Rapids Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cooperative Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cooperative Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cooperative Power Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cordova Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cordova Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corn Belt Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Corn Belt Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cornell University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cornell University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corona Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Corpus Christi Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cottage Grove Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cottonwood Energy Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cottonwood Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "County of Los Alamos",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Covanta Niagara, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Covanta Niagara, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cove Point LNG, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cove Point LNG, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Covert Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "C. P. Crane, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "C. P. Crane, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "C.P. Crane LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "C.P. Crane LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPI USA North Carolina LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPI USA North Carolina LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPN Berks, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CPN Bethpage 3rd Turbine, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Cana, Ltd.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "CPV Fairview, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Fairview, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Keasbey, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Keasbey, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Maryland, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Sentinel, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Sentinel, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Shore, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Shore, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Towantic, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CPV Towantic, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CPV Valley LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Craven County Wood Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Creed Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Creed Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crete Energy Park",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Crete Energy Venture, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Crete Energy Venture, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Crete Energy Venture, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Cricket Valley Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Cricket Valley Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Crown Vantage, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CSGP Services, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CSW Energy, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Current Capital, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "CXA La Paloma, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "CXA La Paloma, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dairyland Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dairyland Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dalton Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dan River Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dan River Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Danskammer Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Danskammer Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Darby Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dartmouth Power Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Data Lease Finance Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dayton Power and Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dayton Power and Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dayton Power and Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DCO Operations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dearborn Generation Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dearborn Industrial Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dearborn Industrial Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Decatur Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Decatur Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Decker Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DeCordova Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deer Park Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DEGS of Narrows, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DEGS of Narrows, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DEGS of St. Bernard, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DEGS O&M LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delano Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delaware City Refining Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delaware City Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delaware Municipal Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delaware Municipal Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delmarva Power & Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delmarva Power & Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delta Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delta Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Delta Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Delta Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Delta Power Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Denver City Energy Associates, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DE Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Department of Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Deseret Generation & Transmission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Deseret Generation & Transmission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Desert Power, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Desert Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "D. E. Shaw Synoptic Acquisition 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DeSoto County Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DeSoto County Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DeSoto County Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Detroit Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Detroit Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Devon Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Devon Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "D/FD Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DGC Operations",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Diamond Generating Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Diamond Generating Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dighton Power Associates, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dighton Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dighton Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Direct Energy",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dispersed Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dogwood Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Elwood Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dominion Energy Brayton Point, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dominion Energy Cove Point LNG, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dominion Energy Cove Point LNG, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy Manchester Street, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dominion Energy Manchester Street, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Energy Salem Harbor, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dominion Energy Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dominion Fairless Hills, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dominion Generation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Domtar Paper Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Domtar Paper Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Doswell Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Doswell Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dow AgroSciences LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dow AgroSciences LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dow Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dow Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Doyle I, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DPC Power Operations Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DPL Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DPS Florida, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DPS Gregory, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DPS Mecklenburg, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DPS Sabine, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DSM Nutritional Products, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DSM Nutritional Products, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Calvert City, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Calvert City, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE East China, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE East China, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Energy Services",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "DTE Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Energy Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Pontiac North LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "DTE Pontiac North LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DTE Tuscola, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Beckjord, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Beckjord, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Carolinas, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Carolinas, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Conesville, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Dicks Creek, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Fayette II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Florida, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Florida, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Florida, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Florida, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Hanging Rock II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Indiana, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Indiana, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Indiana, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Indiana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Kentucky, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Kentucky, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Killen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Lee II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Miami Fort, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Miami Fort, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Murray Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Ohio, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Ohio, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Progress, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Progress, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Progress, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Progress, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duke Energy Progress, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Stuart, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duke Energy Washington II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Energy Zimmer, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duke Fluor Daniel",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Duluth Steam District No. 2",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dunkirk Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dunkirk Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "DuPont Johnsonville",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Duquesne Conemaugh LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duquesne Keystone LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Duquesne Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Dicks Creek, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Dicks Creek, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Fayette II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Fayette II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Hanging Rock II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Hanging Rock II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Killen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Lee II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Lee II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Miami Fort, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dynegy Miami Fort, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Miami Fort, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Midwest Generation Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Midwest Generation Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Moss Landing, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Moss Landing, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Power Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Dynegy Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Stuart, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Washington II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Washington II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Dynegy Zimmer LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Dynegy Zimmer LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Natrium LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Point Cogen Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle Point Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eagle Point Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eagle US 2 LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "East Coast Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastern Iowa Light & Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eastern Iowa Light & Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastex Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "East Kentucky Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "East Kentucky Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastman Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eastman Chemical Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastman Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Eastman Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Eastman Kodak Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "East Texas Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "East Texas Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ebensburg Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ebensburg Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ector County Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edgecombe Genco, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Edgecombe Genco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Edison Mission Operation & Maintenance",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Effingham County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E F Kenilworth, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E F Kenilworth, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EFS Parlin Holdings, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EFS Parlin Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E I Colton, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E I DuPont de Nemours & Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "E I DuPont de Nemours & Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "E I DuPont de Nemours & Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EIF Channelview Cogeneration, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EIF Channelview Cogeneration, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Cajon Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Cajon Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Dorado Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Eldridge Electric and Water Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Electric Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Electric Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elgin Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Elgin Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elizabethtown Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Elizabethtown Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Elkem Metals Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Elk Hills Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Elk Hills Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elmwood Park Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Paso Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Paso Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "El Paso Merchant Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Paso Power Operations",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Segundo Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "El Segundo Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "El Segundo Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "El Segundo Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elwood Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Elwood Services Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EME Homer City Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Emera Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Emera Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Emery Oleochemicals LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Emery Oleochemicals LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EmpireCo Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EmpireCo Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Empire District Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Empire District Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Empire District Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Empire Generating Co, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Empire Generating Co, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Empire Generating Co, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Center Dover LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Holdings",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Energy Investors Funds",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Energy Services & Tech Support, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Energy Systems North East, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "ENgeneration Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Engie Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ennis Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ennis Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ennis Tractebel Power Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Enron Sand Hill, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Asset Management",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Entergy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Louisiana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ENTERGY POWER OPERATIONS U.S.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Entergy Power RS LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ENTERGY POWER VENTURES",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Entergy Rhode Island State Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ENTERGY TEXAS, INC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EPCOR",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EP Lakewood, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EP Newington Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EP Ocean Peaking Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EP Ocean Peaking Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EP Rock Springs, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "EP Rock Springs, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EquiPower Resources Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EquiPower Resources Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Equistar Chemicals, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Equistar Chemicals, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Equus Power I, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Equus Power I, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Equus Power, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Erie Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Erie Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Escondido Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Escondido Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "E S Joslin, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Essential Power Massachusetts, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Massachusetts, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power Newington, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Newington, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power OPP, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power OPP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Essential Power Rock Springs, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Essential Power Rock Springs, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "EthosEnergy Power Operations (West), LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ethos Energy Power Plant Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "EthosEnergy Power Plant Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Evergy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Evergy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Evergy Metro, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Evergy Metro, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Evergy Missouri West, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon Framingham, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon Generation Company LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Exelon Generation Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon Generation Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon New Boston, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon New England",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon New England Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon West Medway II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exelon West Medway II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Exelon West Medway, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Exeter Energy Limited Partnership",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "ExGen Handley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ExGen Handley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ExTex LaPorte Limited Partnership",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "ExTex LaPorte Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ExxonMobil Oil Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "ExxonMobil Oil Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fairless Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fairless Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Falcon Power Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fale-Safe, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Feather River Energy Center",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Fibrominn, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FirstEnergy Generation Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FirstEnergy Generation Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FirstEnergy Generation Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstEnergy Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FirstEnergy Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstLight Hydro Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FirstLight Power Resources",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FirstLight Power Resources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fitchburg Gas and Electric Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Flint Hills Resources Chemical Intermediates LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Flint Hills Resources Chemical Intermediates LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Flint Hills Resources, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Florida Municipal Power Agency",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Florida Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Florida Power Developent LL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Florida Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Florida Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fond du Lac Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Development LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Development LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Operations LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Footprint Power Salem Harbor Operations LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fore River Development LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Fore River Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Forked River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fortistar",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fortistar LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fort Pierce Utilities Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fort Pierce Utilities Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fountain Valley Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Fountain Valley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fountain Valley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fox Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPLE Forney, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FPL Energy Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FPL Energy Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Marcus Hook 50",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FPL Energy Marcus Hook, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FPL Energy Marcus Hook, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy OSI",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "FPL Energy OSI",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Wyman IV, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Wyman IV, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "FPL Energy Wyman, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "FPL Energy Wyman, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frederickson Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frederickson Project Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Freeport Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Freestone Power Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fresno Cogeneration Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Friendswood Energy Genco, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Friendswood Energy Genco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Frontera Generation, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Frontera Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Frontera Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Front Range Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fulton Cogeneration Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fulton Cogeneration Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Fusion Paperboard Connecticut LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Fusion Paperboard Connecticut LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gainesville Regional Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gainesville Regional Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gainesville Renewable Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Gans Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gans Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Garland Power and Light, City of Garland",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Garland Power and Light, City of Garland",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Garrison Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gateway Power Project, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Gavin Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GDF Suez Energy, NA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GE Contractual Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GE Energy Financial Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GE Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GELCO Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenConn Devon LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenConn Middletown, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Aircraft",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Electric Aircraft",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "General Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "General Electric Contractual Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Electric International, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Motors Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "General Motors Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "General Motors Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Generation Holdings LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Genesee Power Station LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Geneseo Municipal Electric Utility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Geneva Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Geneva Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Americas, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Bowline, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Bowline, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn California, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Canal, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Chalk Point, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Chalk Point, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Delta, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Delta, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Delta, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Florida, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Kendall, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Marsh Landing, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Mid-Atlantic, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Mid-Atlantic, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Mid-Atlantic, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Northeast Management Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Potomac River, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Potomac River, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Potrero, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Power Midwest, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Power Midwest, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Power Midwest, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn Power Operating Services Midwest, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn REMA, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn REMA, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenOn West, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Wholesale Generation, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenOn Wholesale Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GenOn Wholesale Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenPower - Kelley, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GenTex Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GenWest, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Georgia-Pacific Corp.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Georgia-Pacific Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Georgia-Pacific Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Georgia Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Georgia Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GE Power and Water",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GE Power Systems",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gibson City Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gibson City Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gila Bend Operations Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gila River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gila River Power, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Gila River Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilberton Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilberton Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilbert Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilbert Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gilroy Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Gilroy Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gilroy Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GIM Channelview Cogeneration, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Glens Falls Lehigh Cement Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Global Common",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GMMM Greenidge, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GMMM Holdings 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GMMM Westover, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goal Line, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goal Line, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goldendale Energy, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Goldendale Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Golden Spread Electric Cooperative, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Golden Spread Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Golden Spread Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Golden Valley Electric Association, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Golden Valley Electric Association, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goodyear Tire & Rubber Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goodyear Tire & Rubber Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goose Creek Energy Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Goose Haven Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Goose Haven Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GP Big Island, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GP Big Island, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GPU Energy, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Graettinger Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grain Processing Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grain Processing Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Haven Board of Light and Power",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Grand Haven Board of Light and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Haven Board of Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Island Utilities Dept.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Island Utilities Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand River Dam Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand River Dam Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grand Tower Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grand Tower Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Granite Ridge Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Granite Ridge Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Graphic Packaging Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Graphic Packaging International, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Graphic Packaging International, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grayling Generating Station, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grayling Generating Station, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Grays Ferry Cogen Partnership",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Grays Harbor Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Grays Harbor Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Great River Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Great River Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Country Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Green Country Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Country Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Greenidge Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Greenidge Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenleaf Energy Unit 1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Greenleaf II Energy Center",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Green Mountain Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Green Mountain Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Green Power Kenansville, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Greenville Electric Utility System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Greenville Electric Utility System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gregory Power Partners LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gregory Power Partners LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gregory Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Griffith Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Griffith Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GS Electric Generating Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Lost Nation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Lost Nation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Merrimack LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Merrimack LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Newington LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Newington LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP Schiller LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP Schiller LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GSP White Lake LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GSP White Lake LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guadalupe Power Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Guadalupe Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Guernsey Power Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Guernsey Power Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gulf Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Gulf Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Gulf States Utilities Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "GWF Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "GWF Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "GWF Power Systems, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hamilton Liberty, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hamilton Patriot, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Handley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Handley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Handsome Lake Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Handsome Lake Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Handsome Lake Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hanford Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Harbor Springs Electricity Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hardee Power Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harlan Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harquahala Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Harrison County Power Project",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Hart Board of Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hartwell Development, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Hartwell Energy Facility",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hartwell Energy Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard Management Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard Management Private Equity Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard Private Capital Holdings, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard Private Capital Properties III, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Harvard University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Harvard University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hawaiian Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hawaiian Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hawkeye Energy Greenport, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hawkeye Energy Greenport, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hawkeye Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hawkeye Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hays Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hays Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hays Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hazleton Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Heard County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Heartland Consumers Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Helix Ironwood, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Helix Ironwood, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Helix Ravenswood, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Helix Ravenswood, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hermiston Power Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hermiston Power Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hickory Run Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hickory Run Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "High Desert Power Project, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "High Desert Power Project, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hill Top Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hill Top Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hingham Municipal Lighting Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "HO Clarke Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "HO Clarke Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "HO Clarke II, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "HO Clarke II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holcim US Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Holcim US Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holland Board of Public Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Holland Board of Public Works",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holland Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Holland Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Holly Cross Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Holyoke Water Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Homer City Generation LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL1, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL2, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL3, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL4, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL5, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL6, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL7, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Homer City OL8, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Honeywell International, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Honeywell International, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Honeywell Resins & Chemicals LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Honeywell Resins & Chemicals LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hoosier Energy REC, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hoosier Energy REC, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hopewell Cogeneration Facility",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hopewell Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hopewell Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horizon Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Horizon Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horsehead Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Horsehead Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Horsehead Industries, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Hot Spring Power Company, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Houston Lighting & Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Houston Lighting & Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hudson Light and Power Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hummel Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hummel Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunlock Creek Energy Ventures",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hunlock Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hunlock Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Huntley Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Huntley Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hutchinson Utilities Commission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Hutchinson Utilities Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Hydra-Co Enterprises, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IBM Credit Leasing Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Idaho Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Idaho Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IES Utilities, Inc",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "IES Utilities, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "IHI Power Services Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ilion Energy Center",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ilion Energy Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Municipal Electric Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Illinois Power Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Illinois Power Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Illinois Power Resources Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Illinois Power Resources Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Imperial Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Imperial Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Incorporated Village of Freeport",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Incorporated Village of Freeport",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Corinth Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Corinth Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Energy Services, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Indeck Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Energy Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Energy Services of Silver Springs",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Energy Services of Silver Springs",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck Niles, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck Niles, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Olean Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Olean Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Oswego Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Oswego Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indeck-Yerkes Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indeck-Yerkes Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Independence Power and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Independence Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Kentucky Electric Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Kentucky Electric Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Michigan Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Michigan Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiana Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiana Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indianapolis Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indianapolis Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indian River Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indian River Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Indian River Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indian River Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indiantown Cogeneration Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indiantown Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Indorama Ventures Xylenes and PTA, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Indorama Ventures Xylenes and PTA, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS Enterprises Holdings Limited",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS Joliet, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS USA LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS USA LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INEOS US Chemicals Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INEOS US Chemicals Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ingredion Incorporated",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ingredion Incorporated",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ingredion Incorporated Argo Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Inland Empire Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Inland Empire Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Inland Paperboard and Pack, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "InterGen Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Intermountain Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Intermountain Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Intermountain Power Service Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Intermountain Rural Electric Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "International Paper Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "International Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "International Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Inter-Power/AhlCon Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Interstate Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Interstate Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Invenergy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Invenergy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "INVISTA  S.a r.l.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "INVISTA  S.a r.l.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "INVISTA  S.a r.l.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IPA GDF Suez Plc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "IPA Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "IPP Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "IPR-GDF SUEZ North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ispat Inland Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Jackson Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jackson Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jackson Power Company, LLC (fka Kinder Morgan Power Company)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jamaica Bay Peaking Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jamaica Bay Peaking Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "James River Cogeneration Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Jamestown Board of Public Utilities",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Jamestown Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jamestown Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "JEA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "JEA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Jersey Central Power & Light",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "J L Bates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "J L Bates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Johnson Controls Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jonesboro City Water and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Jonesboro City Water and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "J Power USA Development Co, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "J Power USA Development Co, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KAMO Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kannapolis Energy Partners",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kansas City Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kansas City Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas City Power & Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Kansas City Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kansas City Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas Electric Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kansas Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KapStone Charleston Kraft LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KapStone Charleston Kraft LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KapStone Paper and Packaging Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KapStone Paper and Packaging Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KCP&L Greater Missouri Operations Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KCP&L Greater Missouri Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KCP&L Greater Missouri Operations Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kendall Green Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kendall Green Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Pioneer Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Kentucky Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kentucky Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kentucky Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kentucky Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KES Kingsburg, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KES Kingsburg, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kestrel Acquisition LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kestrel Acquisition LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KeyCon Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Keys Energy Service",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KeySpan Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KeySpan Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Keystone Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Keystone Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Power Pass-Through Holders LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Keystone Urban Renewal, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Key West City Electric System",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KGen Enterprise, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KGen Hinds LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KGen Hot Spring LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KGen Marshall, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KGen Murray I and II LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KGen Murray I and II LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KGen New Albany, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KGen Sandersville LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "KGen Southaven, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KIAC Partners",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kimberly-Clark Tissue Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kimberly-Clark Tissue Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kincaid Energy Services Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kincaid Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kincaid Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kinder Morgan Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "King City Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Kings River Conservation District",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Kings River Conservation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kiowa Power Partners, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kiowa Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kissimmee Utility Authority",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Kissimmee Utility Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kissimmee Utility Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Klamath Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Klamath Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Kleen Energy Systems, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Kleen Energy Systems, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KMC Thermo, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "KMC Thermo, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "KTI Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lackawanna Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lackawanna Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafarge Building Materials, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lafarge Building Materials, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lafarge North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafayette Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lafayette Utilities System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lafayette Utilities System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LaFrontera Holding, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Frontera Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lake Cogen, Ltd",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lakeland Electric",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lake Road Generating Company, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lake Road Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lake Road Trust, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lakeside Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lakeside Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lakewood Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lakewood Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lamar Power Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lamar Utilities Board",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lambie Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lansing Board of Water and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lansing Board of Water and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Palma WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "La Palma WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "La Paloma Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "La Paloma Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laredo LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Laredo LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laredo WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Laredo WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Large Scale Dist. Gen. II",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Larkspur Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Las Vegas Cogeneration II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Las Vegas Cogen, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Las Vegas Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lathl, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laurens Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Laurent Paperboard, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lawrenceburg Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LDH Rensselaer LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lea Power Partners, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lea Power Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lee County Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lee County Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lehigh Northeast Cement Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lehigh Northeast Cement Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lenzing Fibers Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LG&E and KU Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LGE and KU Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LGE and KU Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LG&E Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LG&E Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Bell Funding LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Electric Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Liberty Electric Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Liberty Fibers Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Liberty Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LIC Funding, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lima Refinery",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lima Refinery",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lincoln Electric System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lincoln Electric System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lincoln Generating Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lincoln Generating Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lively Grove Energy Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Live Oaks Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LMBE Project Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lockport Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lockport Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lockport Merchant Associates, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Logan Generating Co. LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Logan Generating Co. LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lon C Hill, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Long Beach Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Long Beach Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Long Ridge Energy Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Long Ridge Energy Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Longview Energy Development, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Longview Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Longview Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Loring BioEnergy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Los Alamos County",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Angeles Department of Water and Power",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Los Angeles Department of Water and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Angeles Department of Water and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Esteros Critical Energy Fac, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Esteros Critical Energy Fac, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Los Medanos Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Los Medanos Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louisiana Energy & Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Louisiana Energy & Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Louisiana Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Louisiana Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lowell Cogeneration Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lowell Light & Power Board",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lowell Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lower Colorado River Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lower Colorado River Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lower Mount Bethel Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lower Mount Bethel Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LPG Associates",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LSP Cottage Grove, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LSP Cottage Grove, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LSP Energy LP - Batesville",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LSP Kendall Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LSP Nelson Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "LSP University Park, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LSP University Park, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LSP Whitewater, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LTV Steel Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "LTV Steel Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lubbock Power and Light",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Lubbock Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Luke Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Luke Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lumberton Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Lumberton Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Luminant Generation Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Luminant Generation Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Lyndonville Electric Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "LyondellBassell",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mabco Steam Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MACHGen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Madison Gas & Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Madison Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Magnolia Energy, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Magnolia Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Major Oak Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Major Oak Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Makad Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Malaga Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Malaga Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manchester Street, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Manchester Street, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manchief Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Manitowoc Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Manitowoc Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mankato Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mankato Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mantua Creek Generating Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Marathon Ashland Petroleum, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Marathon Ashland Petroleum, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marathon Ashland Petroleum, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marathon Petroleum Company LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marathon Petroleum Company LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MARCUS HOOK 50, L.P.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MARCUS HOOK 50, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MARCUS HOOK ENERGY, L.P.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MARCUS HOOK ENERGY, L.P.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mariposa Energy, Limited Liability Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mariposa Energy, Limited Liability Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marquette Board of Light and Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marquette Board of Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Marshfield Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Marshfield Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Martin's Creek, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Martin's Creek, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Martins Creek SES",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Bay Transportation Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Bay Transportation Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Institute of Technology",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Institute of Technology",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Municipal Wholesale Electric",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachusetts Water Resources Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachusetts Water Resources Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachussetts Bay Transportation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachussetts Bay Transportation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Massachussetts Municipal Wholesale",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Massachussetts Municipal Wholesale",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MASSPOWER",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MASSPOWER",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Maxim Power USA, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MC OPCO, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "McPherson Board of Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "McPherson Board of Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MC Project Company LL",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MeadWestVaco Coated Board, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MeadWestVaco Coated Board, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MeadWestvaco Coated Board - Mahrt Mill",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MeadWestvaco Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MeadWestvaco Kentucky, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MeadWestvaco of Virginia, Covington",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MeadWestvaco of Virginia, Covington",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Medford Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MEG OP Co (Morris Energy Group Operating Company)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Menasha Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MEP Flora Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MEP Pleasant Hill, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Merck & Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Merck & Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Meriden Gas Turbines, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mesquite Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mesquite Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mesquite Power Operations, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mesquite Power Operations, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Metcalf Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Metcalf Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan Power Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan Power Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan Public Power Agency",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Michigan Public Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Michigan South Central Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan State University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Michigan State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MidAmerican Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MidAmerican Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mid-American Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mid-American Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Middletown Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Middletown Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mid-Georgia Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mid-Georgia Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mid-Kansas Electric Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midland Cogeneration Venture, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midland Cogeneration Venture, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midlothian Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midlothian Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midlothian Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midway Peaking, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midway Peaking, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midway Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Midwest Electric Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Electric Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midwest Generation EME, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Generation EME, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Midwest Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Midwest Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Milford Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Milford Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Milford Power Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Millennium Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Millennium Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Millennium Power Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Millennium Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnesota Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Power and Light Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Minnesota Power and Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnesota Power and Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnesota Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnesota Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Minnkota Power Cooperative, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Minnkota Power Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Minnkota Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mint Farm Energy Center LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mirant Las Vegas, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mirant Lovett, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mirant Lovett, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant New England, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mirant NY-Gen, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mirant State Line Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mirant Sugar Creek, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mirant Texas, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mirant Zeeland, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mississippi Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mississippi Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri Joint Municipal Electric Utility Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri Public Service",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Missouri River Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mittal Steel USA",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mittal Steel USA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mittal Steel USA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MMC Chulavista, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MMC Energy North America, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "MMC Escondido, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Mobile Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mobile Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Modesto Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Modesto Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Momentive Performance Materials",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Momentive Performance Materials",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monongahela Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Monongahela Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monroe Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Monroe Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Monsanto Enviro-Chem Systems, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montana Dakota Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montana Dakota Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montana Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montaup Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montezuma Municipal Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montgomery L'Energia Power Partners LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montour, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montour, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montpelier Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montpelier Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Montville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Montville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morgan Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morgantown Energy Associates",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morgantown Energy Associates",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morris CoGeneration, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Morris CoGeneration, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morris CoGeneration, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morris Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Morris Energy Group LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Morris Energy Operations Co. LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Morrow Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Motiva Enterprises, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Motiva Enterprises, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mountain Creek Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mountain Creek Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mountain Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mountain Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mountainview Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Moxie Freedom, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Moxie Freedom, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MPC Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MPC Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "MRP San Joaquin Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "MRP San Joaquin Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "M-S-R",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mt. Carmel Cogeneration, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Mt. Carmel Cogeneration, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mt. Tom Generating Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Electric Authority of Georgia",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Municipal Electric Authority of Georgia",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Municipal Electric Authority of Georgia",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Energy Agency of Mississippi",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Municipal Energy Agency of Nebraska",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Murray l and ll, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Muscatine Power and Water",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Muscatine Power and Water",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Mystic Development LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NAEA Newington Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NAES",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NAES Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Narragansett Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nassau Energy Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nassau Energy Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Glenwood Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Glenwood Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Grid Port Jefferson Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National Grid Port Jefferson Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Institutes of Health",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National Power Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "National RE/sources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "National RE/sources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Navajo Transitional Energy Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Naval Station Great Lakes",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Naval Station Great Lakes",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Naval Training Center - Great Lakes",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Navasota Odessa Energy Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Navasota Wharton Energy Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NC Eastern Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NC Electric Membership Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nebraska Municipal Energy Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nebraska Municipal Energy Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nebraska Public Power District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nebraska Public Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NEGT Dispersed Generating Company LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Nepco Services Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Nepco Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NET Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NET Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nevada Power Company dba NV Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nevada Power Company dba NV Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Albany Power LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Newark Bay Cogen Partnership, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newark Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Athens Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "New Athens Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Athens Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Boston Coke Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Boston Coke Corp.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Castle Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Castle Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Covert Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New Covert Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Energy Corp",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "New England Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newgulf Power Venture, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Hampton Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Harquahala Generating Co., LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New Heights Recovery & Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "New-Indy Catawba LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New-Indy Catawba LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newington Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Newmont Nevada Energy Investment LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Newmont Nevada Energy Investment LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NewPage Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "New Ulm Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New York Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "New York Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NextEra Energy, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NextEra Energy Marcus Hook, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NextEra Energy Marcus Hook, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nextera Energy Operating Services Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Nextera Energy Operating Services Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NextEra Energy Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NextEra Energy Resources",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NGE Generation, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Niagara Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Niagara Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Niagara Mohawk Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Niagara Mohawk Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Niles Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Niles Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nissequogue Cogen Partners",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Nissequogue Cogen Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North American Energy Alliance",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "North American Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northampton Generating Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Northampton Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northampton Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Attleborough Electric Dept.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Carolina Electric Membership Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "North Carolina Electric Membership Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Carolina Renewable Power - Lumberton LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "North Carolina Renewable Power - Lumberton LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Energy Associates, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northeast Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeastern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Texas Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northeast Utilities Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern California Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern California Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Illinois Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Indiana Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern Indiana Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Star Generating Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern Star Generation Services Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern Star Generation Services LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northern States Power (Xcel Energy)",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Northern States Power (Xcel Energy)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northern States Power (Xcel Energy)",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "North Jersey Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NorthWestern Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NorthWestern Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NorthWestern Energy Development, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NorthWestern Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northwestern Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northwestern Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Northwest Generation Services (Northwest Utilities)",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Northwest Iowa Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norwalk Harbor Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norwalk Harbor Power Operations",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Norwalk Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Norwalk Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Norwich Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Norwich Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG California South LP.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG California South LP.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Canal LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Canal LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG COTTONWOOD TENANT LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Delta LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Delta LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG El Segundo Operations Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Energy, Inc",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NRG Energy, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Energy, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Energy Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Florida LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Florida LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Homer City Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Marsh Landing LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Marsh Landing LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Montville",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG North Central Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Power Midwest LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Power Midwest LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG REMA LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG REMA LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Rockford, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Somerset Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG South Central - Bayou Cove",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG South Central - Bayou Cove",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Texas Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Texas Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Wholesale Generation LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "NRG Wholesale Generation LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Wholesale Generation LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NRG Yield, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NRG Yield, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NTE Carolinas, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NTE Carolinas, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NTE Ohio, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NTE Ohio, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nueces Bay LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nueces Bay LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Nueces Bay WLE, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Nueces Bay WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Nueces Bay WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NV Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "NV Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "NYSEG Solutions, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oak Grove Management Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oak Grove Management Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Occidental Chemical Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Occidental Chemical Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ocean Peaking Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ocean State Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ocean State Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Odessa-Ector Power Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Odessa Energy Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ogden Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "OGE Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "OGE Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oglethorpe Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oglethorpe Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oglethorpe Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oglethorpe Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OGPA Cottage Grove, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OGPA Whitewater, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "O.H. Hutchings CT, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "O.H. Hutchings CT, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Edison Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ohio Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Ohio Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Power Partners, LLC.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Power Partners, LLC.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio State University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio State University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ohio Valley Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ohio Valley Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oklahoma Cogeneration, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oklahoma Cogeneration, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oklahoma Gas & Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oklahoma Gas & Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oklahoma Municipal Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oklahoma Municipal Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Old Dominion Electric Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Old Dominion Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oleander Power Project, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oleander Power Project, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Olympus Power Funding LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Olympus Power Funding LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Olympus Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Olympus Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Omaha Public Power District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Omaha Public Power District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Omega JV2, AMP-Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oneok Energy Marketing & Trading Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Oneok Energy Services",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Oneta Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oneta Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oneta Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oneta Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Onondaga Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Onondaga Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ontelaunee Power Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ontelaunee Power Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Optim Energy Altura Cogen, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Optim Energy Altura Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Optim Energy Twin Oaks LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Orange Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orange Grove Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orange Grove Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oregon Clean Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oregon Clean Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orion Power Midwest, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Orion Power Midwest, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orion Power Midwest, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orion Power Operating Services Carr Street, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orion Power Operating Services, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orion Power Operating Services Liberty, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orion Power Operating Services - Midwest, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orlando CoGen Limited, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Orlando Utilities Commission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Orlando Utilities Commission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ormond Beach Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ormond Beach Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "OSP Holdings Ltd",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Osprey Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Oswego Harbor Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Oswego Harbor Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otay Mesa Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otay Mesa Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otsego Paper, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otsego Paper, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Otter Tail Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Otter Tail Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ouachita Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Owensboro Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Owensboro Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacific Ethanol Pekin, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacific Ethanol Pekin, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacific Gas and Electric Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pacific Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacific Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacific Klamath Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacificorp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacificorp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pacificorp Energy Generation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pacificorp Energy Generation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pacificorp Energy Generation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Packaging Corporation of America",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Packaging Corporation of America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paducah Power System",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Paducah Power System",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Palmark, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Palomar Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Panda Brandywine, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Gila River, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Global Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Hummel Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Hummel Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Liberty, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Liberty, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Patriot LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Patriot LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Rosemary, L.P.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Panda Sherman Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Stonewall, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panda Stonewall, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panda Temple Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panoche Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panoche Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panther Creek Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Panther Creek Power Operating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Panther Creek Power Operating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Paris Generation, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Paris Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Paris Generation, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pasadena Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pasco Cogen, Ltd.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pasco Cogen, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Passive Lessor",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Passive Lessors",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Passive Lessors",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pastoria Energy Facility, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pastoria Energy Facility, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pawtucket Power Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PBF Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PBF Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PDI New England, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PDV Midwest Refining, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peabody Municipal Light Plant",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Peabody Municipal Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PE Black River Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PECO Energy Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PECO Energy Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pedricktown Cogeneration Co., LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pedricktown Cogeneration Co., LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PEI Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PEI Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pella Municipal Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Penelec",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Penelec",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pennsylvania Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pennsylvania Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pennsylvania Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Peoples Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pepco Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Peregrine",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perennial Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Perennial Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Performance Management Assoc, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Performance Materials NA, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Performance Materials NA, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Perryville Energy Partners, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Petoskey Electric Light Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Petra Nova Parish Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pfizer, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pfizer, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P G & E Dispersed Generating, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "P G & E National Energy Group",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PG&E National Energy Group, Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P G & E Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PG&E Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Phelps Dodge Energy Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Phemus Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P H Glatfelter Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P H Glatfelter Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philadelphia Energy Solutions",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Philadelphia Energy Solutions",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Philadelphia Energy Solutions",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Philadelphia United Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Phillips 66 Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Phillips 66 Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Phillips 66 Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PHR Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PIC Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pierce Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pierce Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pine Bluff Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pinelawn Power LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Piney Creek Limited Partnership",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Piney Creek Limited Partnership",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pinnacle West Capital Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pinnacle West Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pinnacle West Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pinnacle West Energy Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pio Pico Energy Center LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pio Pico Energy Center LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pittsfield Generating Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pittsfield Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pixelle Androscoggin LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pixelle Androscoggin LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pixelle Specialty Solutions LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pixelle Specialty Solutions LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plainfield Asset Management LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plains Electric",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Platte River Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Platte River Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pleasants Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Pleasants Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pleasants Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pleasants LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pleasants LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plum Point Energy Associates, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Plum Point Energy Associates, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Plymouth Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PNM Resources",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Polaris Cottage Grove, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Polaris Whitewater, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Polk Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ponca City Utility Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ponderosa Pine Energy Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Port Comfort Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Port Comfort Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland Electric Light and Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland General Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portland General Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portland Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portland Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Portside Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Portside Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Portside Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Potomac Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Potomac Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Potomac Power Resources",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power City Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Power City Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power Development Associates, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power Resources Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power Resources Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Power Resources Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PowerSouth Energy Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PowerSouth Energy Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Power Systems Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPG Industries, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PPG Industries, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPG Industries, Inc. - Natrium Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PPG - O&M Panda Sherman Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPG - O&M Panda Temple Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPL Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PPL Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPL Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P P & L Montana, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "P P & L Montana, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PPM Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PPM Technical Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Prairie Power Incorporated",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Prairie Power Incorporated",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prairie State Generating Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pratt Paper (OH), LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pratt Paper (OH), LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Pratt & Whitney, Division of Raytheon Technologies Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Pratt & Whitney, Division of Raytheon Technologies Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Premcor Refining Group, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "President & Fellows of Harvard College",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Primary Energy",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Primary Power International Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Prime Energy, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Primesouth, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Procter and Gamble Paper Products Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Procter and Gamble Paper Products Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Procter & Gamble Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Procter & Gamble Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ProEnergy Services LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Progress Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Progress Energy Florida (FL Power)",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Progress Ventures, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Project Orange Associates, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Project Orange Associates, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PSEG",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Fossil, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PSEG Fossil, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Fossil, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Keys Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Keys Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG New Haven LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG New Haven LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Nuclear, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Nuclear, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power Connecticut, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PSEG Power Connecticut, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power Connecticut, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSEG Power New York, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSEG Power New York, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PSI Energy, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "PSI Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PSI Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Power Generation Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Power Generation Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of Colorado",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of Colorado",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of New Mexico",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Public Service Company of New Mexico",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of New Mexico",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Company of Oklahoma",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service Company of Oklahoma",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service Electric and Gas Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Service of New Hampshire",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Service of New Hampshire",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Public Works Commission-Fayettville",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Public Works Commission-Fayettville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Puerto Rico Electric Power Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Puerto Rico Electric Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Puget Sound Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Puget Sound Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Puget Sound Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Puget Sound Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Purdue University",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Purdue University",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "PurEnergy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "PurEnergy Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P&W, Andrew Willgoos Laboratory",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P&W, Andrew Willgoos Laboratory",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "P&W, Division of United Technologies",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "P&W, Division of United Technologies",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quail Run Energy Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Quail Run Energy Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Auburndale Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Choctaw Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Quantum Choctaw Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Lake Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quantum Pasco Power, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quinnipiac Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Quinnipiac Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Quixx Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Ramco Generating One, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rathdrum Operating Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rathdrum Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rathdrum Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Raven Power Fort Smallwood LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Raven Power Fort Smallwood LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "R.C. Cape May Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "R.C. Cape May Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Recovery Technologies Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Redbud Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Redding Electric Utility",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Redding Electric Utility",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Red Oak Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Red Oak Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RED-Rochester, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RED-Rochester, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reedy Creek Energy Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reedy Creek Improvement District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "ReEnergy Sterling CT Limited Partnership",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Regents of the University of Michigan",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Regents of the University of Michigan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy Bighorn, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Channelview, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Choctaw Co, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Coolwater, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Etiwanda, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Florida, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Hunterstown, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Indian River, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Mandalay, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reliant Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Reliant Energy New Jersey Holdings",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Northeast Management Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reliant Energy Ormond Beach, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Osceola, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Power Generation, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Seward, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Reliant Energy Seward, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Reliant Energy Wholesale Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Renaissance Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Renaissance Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Renco Group, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rensselaer Cogeneration LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rensselaer Generating LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rensselaer Generating LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rensselaer Plant Holdco, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Republic Engineered Products, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Republic Engineered Products, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Republic Engineered Products, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Resolute FP US Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Resolute FP US Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RG Steel, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rhode Island State Energy Center, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rhode Island State Energy Partners",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Richland-Stryker Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Richland-Stryker Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Richmond Power and Light",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rio Nogales Power Project, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rio Nogales Power Project, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverbay Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverbay Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverside Canal Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverside Canal Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverside Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverside Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Riverside Generating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Riverside Generating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Riverview Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "R J Reynolds Tobacco Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "R J Reynolds Tobacco Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rochester Gas & Electric Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rochester Gas & Electric Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rochester Public Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rochester Public Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Roche Vitamins, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rock Energy Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockford Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rockford Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RockGen Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RockGen Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rockingham Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RockTenn",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RockTenn",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RockTenn",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RockTenn CP, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rocky Mountain Energy Center",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rocky Mountain Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Rocky Mountain Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rocky Road Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rocky Road Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rolling Hills Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rolling Hills Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rosebud Operating Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rowan County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RPL Holdings, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Coolwater, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Etiwanda, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Florida, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Mandalay, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Mid-Atlantic Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "RRI Energy Northeast Management Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "RRI Energy Ormond Beach, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy West, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "RRI Energy Wholesale Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "R S Cogen, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "R S Cogen, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rumford Power Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Rumford Power, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Rumford Power, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Russell City Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Russell City Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SABIC Innovative Plastics US LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sabine Cogeneration, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sabine Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Cogeneration Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Municipal Utility Dist",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sacramento Mun Utility District Financing Author",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sacramento Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Salinas River Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Salinas River Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Salt River Project",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Salt River Project",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sam Rayburn G & T, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sam Rayburn Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "San Diego Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "San Diego Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandow Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandy Creek Energy Associates, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sandy Creek Energy Associates, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sandy Creek Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sandy Hills Generating Station",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "San Miguel Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "San Miguel Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santa Rosa Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Santa Rosa Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Santa Rosa Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Santee Cooper",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Santee Cooper",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Saranac Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sargent Canyon Cogeneration Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sargent Canyon Cogeneration Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sasol North America, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Savannah Electric & Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Savannah Electric & Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sayreville, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sayreville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sayreville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SBF LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SBF LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Schuylkill Energy Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Schuylkill Energy Resources, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Scrubgrass Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Scrubgrass Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Selkirk Cogen Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Selkirk Cogen Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Seminole Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seminole Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sempra Energy Resources",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Seneca Power Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seneca Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Severstal Sparrows Point, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Severstal Sparrows Point, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Severstal Warren",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Seward Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Seward Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shady Hills Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Shady Hills Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shady Hills Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shawville Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shawville Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sheboygan Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shelby County Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shelby County Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shell Chemical Appalachia LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shell Chemical Appalachia LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Shenango Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Shenango Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Siemens Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Siemens Power Generation Operating Services Co",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sierra Pacific Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sierra Pacific Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sikeston Bd. of Municipal Utilities",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sikeston Bd. of Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Silicon Valley Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Silicon Valley Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Silver Bay Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sithe Energies Power Services, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sithe Energies Power Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sithe Energies Power Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sithe/Independence Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sithe Northeast Management Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Smarr EMC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smart Papers Holdings LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Smart Papers Holdings LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SMUD Financing Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Smurfit-Stone Container Enterprises",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Solar Partners II, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Solar Partners II, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Partners I, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Solar Partners I, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solar Partners VIII, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Solar Partners VIII, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solid Waste Authority-Central Ohio",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Solid Waste Authority-Central Ohio",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Solutia, Inc. - Decatur Plant",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Somerset Operating Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Somerset Operating Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Somerset Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Somerset Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sonoco Products Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sonoco Products Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southaven Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "South California Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Electric & Gas Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Carolina Electric & Gas Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Generating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Carolina Generating Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Carolina Public Service Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southeast Chicago Energy Project",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "South Eastern Electric Development Corp",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "South Eastern Generating Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Southern California Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern California Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern California Public Power Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Energy Lovett, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Energy Mid Atlantic",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Energy New England, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Illinois Power Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Illinois Power Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Indiana Gas and Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Indiana Gas and Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Minnesota Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Montana Electric G & T Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Montana Electric G & T Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Nevada Water Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southern Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southern Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Field Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Glens Falls Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Houston Green Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Houston Green Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Maryland Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Mississippi Elec. Power Assoc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Mississippi Elec. Power Assoc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Norwalk Electric Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Norwalk Electric Works",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "South Point Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "South Texas Electric Cooperative",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "South Texas Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Electric Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Southwestern Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwestern Public Service Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwestern Public Service Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwest Generation Colorado, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Southwest Generation Colorado, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwest Generation Colorado, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Southwest Generation Operating Co.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Southwest Generation Operating Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Southwest Generation Operating Co.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowega Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sowega Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowood Commodity Partners Fund II, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowood Commodity Partners Fund, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowood Commodity Partners GP II, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowood Commodity Partners, GP, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sowood GP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spencer Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spindle Hill Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sprague Paperboard Inc",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Springdale Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springdale Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Springdale Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springdale Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Springs Global US, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Springs Global US, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Spruance Genco, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Spruance Genco, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Square Butte Electric Cooperative",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Standard Binghamton LLC.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Stanton Clean Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Stanton Clean Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Stanton Energy Reliability Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Starwood Energy Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Starwood Power Midway, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "State Line Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "State Line Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "State Street Bank Trust Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "STEAG Power LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sterling Energy Group",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sterling Power Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sterling Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Joseph Energy Center, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "St. Joseph Energy Center, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "St. Lawrence Cement",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Suez-DEGS of Rochester, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SUEZ-DEGS of Tuscola, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "SUEZ Energy Generation NA",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "SUEZ Energy Generation NA",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SUEZ Energy Generation NA",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sugar Creek Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Summit Vineyard LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sumner Municipal Light Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunbury Generation, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sundevil Power Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunflower Electric Power Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunflower Electric Power Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunnyside Cogeneration Associates",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunnyside Cogeneration Associates",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunoco",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunoco Partners Marketing & Terminals, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunoco Partners Marketing & Terminals, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sunoco Power Generation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Sunrise Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Sunrise Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Sweeny Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SWG Arapahoe LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SWG Arapahoe LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "SWG Colorado, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "SWG Colorado, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Syracuse Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Tait Electric Generating Station, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tait Electric Generating Station, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talbot EMC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talen Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Talen Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Talen Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Talen Montana, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Talen Montana, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tampa Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tampa Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tanner Street Generation LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tanner Street Generation LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tate & Lyle Ingredients Americas LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tate & Lyle Ingredients Americas LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Taunton Municipal Lighting Plant",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Taunton Municipal Lighting Plant",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TBG Cogen Partners",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "TBG Cogen Partners",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TCC Attala OL, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TC Ironwood LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TC Ironwood LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TC  Ravenswood, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TC Ravenswood Services Corp.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TECO-Panda Generating Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tejas Power Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tejas Power Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Alabama II Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Alabama II Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Alabama Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Tenaska Alabama Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Alabama Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Frontier Partners, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Frontier Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Gateway Partners, Ltd.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Gateway Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Georgia Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Georgia Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska IV Texas Partners, Ltd.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Pennsylvania Partners, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Pennsylvania Partners, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Virginia Partners, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tenaska Virginia Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tenaska Washington Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Tennessee Valley Authority",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tennessee Valley Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Terra Leasing, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Terrebonne Parish",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Terrebonne Parish",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "T.E.S. Filer City Station Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Teton Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas City Cogeneration, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Eastern Transmission, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas Eastern Transmission, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Genco II, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Genco Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas Genco Operating Services, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Texas Genco Services, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Texas Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Texas Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Chemours Comany FC, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Chemours Comany FC, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Chemours Company FC, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Chemours Company FC, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "The Dow Chemical Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "The Empire District Electric Co - a Liberty Utilities Co",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thermal North America - Thermal Source",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thermo Cogeneration Partnership, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Thoroughbred Gen Station Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Tilton Energy LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tilton Energy LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tipton Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tiverton Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tiverton Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Toledo Edison Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Toledo Edison Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Toledo Edison Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tolna Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tolna Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Topaz Generating, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Topaz Generating, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tosco Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Toscopetro Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tosco Refining, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Town of Braintree Electric Light Department",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Town of Braintree Electric Light Department",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Toyota Tsusho Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TPS Arizona Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TPS Arkansas Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TPS Frontera Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TPS Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TPS Virginia Operations Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tractebel Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tractebel Power, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tradinghouse Power Company LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tradinghouse Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TransAlta",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TransAlta",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TransCanada Power",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "TransCanada Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TransCanada Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Traverse City Light & Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Traverse City Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-Center Naniwa Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-Center Naniwa Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trigen-Boston Energy Corp",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Trigen-Boston Energy Corp",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Trigen-Cinergy Solutions",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Trigen-Cinergy Solutions of Tuscola",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Trigen-St. Louis Energy Corp.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Tri-State Generation & Transmission",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-State Generation & Transmission",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-State G & T Association, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tri-State G & T Association, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tri-State Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Triton Power Michigan, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Troy Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Troy Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Troy Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TSL Holding - Lessor",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Tucson Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Tucson Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Turlock Irrigation District",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Turlock Irrigation District",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Twelvepole Creek, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Twin Oaks Power, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "TXU",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TXU Big Brown Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Collin Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TXU Generation Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "TXU Generation Company, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "TXU Generation Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Pedricktown Cogeneration Company, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "TXU Tradinghouse Company, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "TXU Valley Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UAE Lowell Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UAE Mecklenburg Cogeneration, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "UAE Power Operations Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UGI Development Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UGI Development Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Carbide Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Union Carbide Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Electric Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Union Electric Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Light, Heat & Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Union Light, Heat & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Union Power Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "UniSource Energy Development Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UniSource Energy Development Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Illuminating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "United Power Association",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "United Power Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United Refining Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "United Refining Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United States Bureau of Reclamation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "United States Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University of North Carolina",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "University of North Carolina at Chapel Hill",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "University of North Carolina at Chapel Hill",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "University Park Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "University Park Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "University Park Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UNS Electric, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "UNS Electric, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Upper Peninsula Power Co",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U. S. Bank National Association",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Gen New England, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "US Gen New England, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U.S. Navy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U.S. Navy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Operating Services Co.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "U.S. Operating Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corp., Gary Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel Corporation - Clairton Coke Ops",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corporation - Edgar Thompson",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel Corporation - Fairfield Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "US Steel, LLC - Monongahela Valley",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "US Steel, LLC, South Works",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Associated Municipal Power Systems",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Associated Municipal Power Systems",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Utah Municipal Power Agency",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Utah Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "UtiliCorp United, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "UtiliCorp United, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Valencia Energy LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Valencia Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Valencia Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Valencia Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Valero Refining Company - NJ",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Valero Refining Company - Tennessee, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Valero Refining Company - Tennessee, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Valley NG Power Company LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vandolah Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vandolah Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "VCC Attala OL, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vectren Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Ventures Lease Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Veolia Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Veolia Energy Efficiency PA, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Veolia Energy North America",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Veolia Energy Philadelphia, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Veolia Energy Philadelphia, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Veolia Philadelphia Energy Corporation",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Veolia Schuylkill Generation, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vermillion Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vermillion Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vermont Electric Power",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Verso Androscoggin LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Verso Androscoggin LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Verso Bucksport LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Verso Paper",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Verso Paper",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Verso Paper",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria City Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria City Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria Port Power LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria Port Power LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Victoria WLE, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Victoria WLE, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vienna Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vienna Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Vienna Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Vienna Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Village of Clinton, Michigan",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Village of Clinton, Michigan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Village of Lydonville",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Village of Union City, Michigan",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Vineland Cogeneration Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Virginia Electric & Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Virginia Electric & Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Virginia Renewable Power-Portsmouth LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Virginia Renewable Power-Portsmouth LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "VT Public Power Supply Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wabash Valley Power Association, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walleye Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walleye Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wallingford Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wallingford Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wallula Development Group, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walnut Creek Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walnut Creek Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walnut Energy Center Authority",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton Bainbridge LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton Bainbridge LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton County Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Walton Discover LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Walton Discover LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Warren Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Warren Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Warren Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Washington County Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Washington County Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Washington Parish Energy Center One, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterbury Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Waterbury Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterford Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waterside Power, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Waterside Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Waterside Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Waverly Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WCAC Operating Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WCI Steel",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Webster City Light & Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "We Energies",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "We Energies",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wellhead Electric Company, Inc",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wellhead Electric Company, Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wellhead Electric Company, Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wellhead Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wellhead Services, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westar Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Westar Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Bend Municipal Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Deptford Energy Associates Urban Renewal, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Deptford Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Western Farmers Electric Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Western Farmers Electric Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Kentucky Energy Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Western Minnesota Municipal Power",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Western Resources, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Western Resources, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West Georgia Generating Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "West Memphis Utilities",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westmoreland Partners LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Westmoreland Partners LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westmoreland Power, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West Penn Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West Plains Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock Coated Board, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock Coated Board, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock CP, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock CP, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WestRock Virginia Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WestRock Virginia Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Texas Energy, Ltd. Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Texas Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Texas Utilities Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "West Texas Utilities Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "West Texas Utilities Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "West Valley Leasing Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Westwood Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Weyerhaeuser Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Weyerhaeuser Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Weyerhaeuser Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WGP Redwood Holdings, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wharton County Generation, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wharton County Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wharton County Power Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wharton County Power Partners, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wharton Energy Partners, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wheelabrator Frackville Energy Company, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wheelabrator Frackville Energy Company, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wheelabrator Ridge Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wheelabrator Ridge Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wheeling Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Whitewater Operating Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Whiting Clean Energy, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Whiting Clean Energy, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wickliffe Paper Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wickliffe Paper Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wildflower Energy, LP",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wildflower Energy, LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Willamette Industries, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Williams Field Services Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Williams Flexible Generation, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Williams Four Corners LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Williams Four Corners LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Williams Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Williams Refining & Marketing, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wisconsin Electric Power Company",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wisconsin Electric Power Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Electric Power Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Power & Light Company",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Power & Light Company",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Public Power Inc",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Public Power Inc",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisconsin Public Service Corporation",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wisconsin Public Service Corporation",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wise County Power Company, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wise County Power Company, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wisvest - Connecticut, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WKE Station Two, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolf Hills Energy, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wolf Hills Energy, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolf Hills Energy, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow II Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow I, LP",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wolf Hollow I Power, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolf Hollow I Power, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wolf Hollow Services, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolfskill Energy Center, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wolverine Power Supply Cooperative, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wolverine Power Supply Cooperative, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wood Group Power Operations (Freeport) LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wood Group Power Operations, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wood Group Power Operations, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wood Group Power Plant Services, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wood River Refinery",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WPS  Beaver Falls Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "WPS New England Generation, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WPS Niagara Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "WPS Power Development, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "WPS Power Development, LLC",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WPS Power Development, LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WPS Syracuse Generation, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "WRB Refining LLC",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "WRB Refining LP",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wrightsville Power Facility, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "WV Alloys, Inc.",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "WV Alloys, Inc.",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wyandotte Municipal Services",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Wyandotte Municipal Services",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Wyandotte Municipal Services",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wygen Funding, Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Wyoming Municipal Power Agency",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Xcel Energy",
          "ownType": "OPR"
        },
        {
          "ownerOperator": "Xcel Energy",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yellowstone Energy Limited Partnership",
          "ownType": "OWN"
        },
        {
          "ownerOperator": "Yoakum Electric Generating Cooperative, Inc.",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Zeeland Power Company, LLC",
          "ownType": "BTH"
        },
        {
          "ownerOperator": "Zion Energy Center, LLC",
          "ownType": "OWN"
        }
      ]
    ];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    mock
      .onGet(`${config.services.account.uri}/allowance-compliance/owner-operators`)
      .reply(200, ownerOperators);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_OWNER_OPERATOR_SUCCESS, ownerOperator: distinctOwnOpers.map(s=> ({id: s, label: s, selected:false}))},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadOwnerOperators("Allowance Based")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

});

