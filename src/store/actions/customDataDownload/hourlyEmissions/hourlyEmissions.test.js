import * as actions from "./hourlyEmissions";
import * as types from "../../actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../../../config";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initState = {
  customDataDownload:{
    dataType: null,
    dataSubType: null,
    appliedFilters:[],
    dataPreview: null,
    totalCount: null,
  },
  hourlyEmissions:{
    timePeriod: {
      startDate: null,
      endDate: null,
      opHrsOnly: true
    }
  },
  apiCallsInProgress: 0
};
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

  test("should create BEGIN_API_CALL and LOAD_HOURLY_EMISSIONS_SUCCESS when loading hourly emissions data", () => {
    const requestParams = [{startDate: "2019-01-01",endDate: "2019-01-01", opHrsOnly:true}];
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
      .onGet(`${config.services.emissions.uri}/apportioned/hourly?page=1&perPage=100&beginDate=${requestParams[0].startDate}&endDate=${requestParams[0].endDate}&opHoursOnly=${requestParams[0].opHrsOnly}`)
      .reply(200, successResponse.data, successResponse.headers);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_HOURLY_EMISSIONS_SUCCESS, hourlyEmissions: {data: successResponse.data,totalCount: successResponse.headers["x-total-count"]}},
    ];

    const store = mockStore(initState.customDataDownload);
    return store.dispatch(actions.loadHourlyEmissions(requestParams)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });
});

