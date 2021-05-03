import apiStatusReducer from "./apiStatusReducer";
import {beginApiCall} from "../actions/apiStatusActions";
import {loadHourlyEmissionsSuccess} from "../actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import initialState from "./initialState";

describe("API status reducer", () => {
  it("should update state when BEGIN_API_CALL and LOAD_HOURLY_EMISSIONS_SUCCESS actions are dispatched", () => {
    let state, action;
    action = beginApiCall();
    state = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(state).toEqual(1);

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
    action = loadHourlyEmissionsSuccess(hourlyEmissions, hourlyEmissions.length);
    state = apiStatusReducer(state, action)
    expect(state).toEqual(0);
  });
});
