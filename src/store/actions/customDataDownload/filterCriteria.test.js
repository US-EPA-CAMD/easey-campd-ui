import * as actions from "./filterCriteria";
import * as types from "../actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../../config";
import initState from "../../reducers/initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes} from "../../../utils/selectors/filterCriteria";

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
});

