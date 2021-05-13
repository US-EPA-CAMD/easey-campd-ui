import * as actions from "./hourlyEmissions";
import * as types from "../../actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../../../config";
import initState from "../../../reducers/initialState";
import {restructurePrograms} from "../../../../utils/selectors/hourlyEmissions";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);

describe("Emissions Filter Async Actions", () => {
  it("should create appropriate action when update time period action is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const expectedAction = { type: types.HOURLY_EMISSIONS.UPDATE_TIME_PERIOD, selectedTimePeriod: timePeriod };

    const actionDispached  = actions.updateTimePeriod(timePeriod);
    expect(actionDispached).toEqual(expectedAction);
  });

  it("should create BEGIN_API_CALL and LOAD_HOURLY_EMISSIONS_SUCCESS when loading hourly emissions data", () => {
    const timePeriod = initState.hourlyEmissions.timePeriod;
    timePeriod.startDate="2019-01-01";
    timePeriod.endDate="2019-01-01";
    timePeriod.opHrsOnly=true;
    const hourlyEmissions = [
      {
        "state": "AL",
        "facilityName": "Barry",
        "orisCode": "3",
        "unitId": "4",
        "gLoad": "150.00",
        "sLoad": null,
        "so2Mass": "1617.200",
        "so2Rate": "0.983",
        "noxMass": "481.800",
        "noxRate": "0.293",
        "co2Mass": "168.700",
        "co2Rate": "0.103",
        "heatInput": "1644.500",
        "primaryFuelInfo": "Coal",
        "secondaryFuelInfo": "Pipeline Natural Gas",
        "unitTypeInfo": "Tangentially-fired",
        "so2ControlInfo": null,
        "partControlInfo": "Electrostatic Precipitator",
        "noxControlInfo": "Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction",
        "hgControlInfo": "Halogenated PAC Sorbent Injection",
        "prgCodeInfo": "ARP, CSNOX, CSOSG2, CSSO2G2, MATS",
        "assocStacks": null,
        "opDate": "2019-01-01",
        "opHour": "0",
        "opTime": "1.00",
        "so2MassMeasureFlg": "Measured",
        "so2RateMeasureFlg": "Calculated",
        "noxMassMeasureFlg": "Measured",
        "noxRateMeasureFlg": "Measured",
        "co2MassMeasureFlg": "Measured",
        "co2RateMeasureFlg": "Calculated"
      },
      {
        "state": "AL",
        "facilityName": "Barry",
        "orisCode": "3",
        "unitId": "4",
        "gLoad": "150.00",
        "sLoad": null,
        "so2Mass": "1611.300",
        "so2Rate": "0.983",
        "noxMass": "460.700",
        "noxRate": "0.281",
        "co2Mass": "168.200",
        "co2Rate": "0.103",
        "heatInput": "1639.500",
        "primaryFuelInfo": "Coal",
        "secondaryFuelInfo": "Pipeline Natural Gas",
        "unitTypeInfo": "Tangentially-fired",
        "so2ControlInfo": null,
        "partControlInfo": "Electrostatic Precipitator",
        "noxControlInfo": "Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction",
        "hgControlInfo": "Halogenated PAC Sorbent Injection",
        "prgCodeInfo": "ARP, CSNOX, CSOSG2, CSSO2G2, MATS",
        "assocStacks": null,
        "opDate": "2019-01-01",
        "opHour": "1",
        "opTime": "1.00",
        "so2MassMeasureFlg": "Measured",
        "so2RateMeasureFlg": "Calculated",
        "noxMassMeasureFlg": "Measured",
        "noxRateMeasureFlg": "Measured",
        "co2MassMeasureFlg": "Measured",
        "co2RateMeasureFlg": "Calculated"
      },
      {
        "state": "AL",
        "facilityName": "Barry",
        "orisCode": "3",
        "unitId": "4",
        "gLoad": "150.00",
        "sLoad": null,
        "so2Mass": "1608.300",
        "so2Rate": "0.978",
        "noxMass": "407.900",
        "noxRate": "0.248",
        "co2Mass": "168.800",
        "co2Rate": "0.103",
        "heatInput": "1644.900",
        "primaryFuelInfo": "Coal",
        "secondaryFuelInfo": "Pipeline Natural Gas",
        "unitTypeInfo": "Tangentially-fired",
        "so2ControlInfo": null,
        "partControlInfo": "Electrostatic Precipitator",
        "noxControlInfo": "Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction",
        "hgControlInfo": "Halogenated PAC Sorbent Injection",
        "prgCodeInfo": "ARP, CSNOX, CSOSG2, CSSO2G2, MATS",
        "assocStacks": null,
        "opDate": "2019-01-01",
        "opHour": "2",
        "opTime": "1.00",
        "so2MassMeasureFlg": "Measured",
        "so2RateMeasureFlg": "Calculated",
        "noxMassMeasureFlg": "Measured",
        "noxRateMeasureFlg": "Measured",
        "co2MassMeasureFlg": "Measured",
        "co2RateMeasureFlg": "Calculated"
      }
    ];
    const successResponse = {
      data: hourlyEmissions,
      headers: {
        "x-total-count": hourlyEmissions.length
      }
    };
    mock
      .onGet(`${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${timePeriod.startDate}&endDate=${timePeriod.endDate}&opHoursOnly=${timePeriod.opHrsOnly}`)
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_HOURLY_EMISSIONS_SUCCESS, hourlyEmissions: {data: successResponse.data,totalCount: successResponse.headers["x-total-count"]}},
    ];

    const store = mockStore(initState.customDataDownload);
    return store.dispatch(actions.loadHourlyEmissions(initState.hourlyEmissions)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it("should create BEGIN_API_CALL and LOAD_EMISSIONS_PROGRAMS_SUCCESS when loading programs data", () => {
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
      { type: types.LOAD_EMISSIONS_PROGRAMS_SUCCESS, program: restructurePrograms(program)},
    ];

    const store = mockStore(initState);
    return store.dispatch(actions.loadEmissionsPrograms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });
});

