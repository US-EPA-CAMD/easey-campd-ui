import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import Program  from './Program';
import {restructurePrograms} from "../../../utils/selectors/filterCriteria";
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";

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
const filterMapping = [{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"CC","fuelTypeCode":"PNG","controlCode":"DLNB"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"CC","fuelTypeCode":"PNG","controlCode":"SCR"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"CAT"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"DSI"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"ESP"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"HPAC"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"LNC2"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"SCR"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"SNCR"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"C","controlCode":"WLS"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"PNG","controlCode":"CAT"},
{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"T","fuelTypeCode":"PNG","controlCode":"DSI"}];
const storeProgam = restructurePrograms(program);
initialState.filterCriteria.program = storeProgam;
initialState.filterCriteria.timePeriod.year.yearArray = [2019];
initialState.filterCriteria.filterMapping = filterMapping;
initialState.customDataDownload.dataType = "EMISSIONS";
const store = configureStore(initialState);
let flyoutClosed = false;

describe("Hourly Emissions Program", () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider 
        store={store}>
        <Program
          closeFlyOutHandler={() => flyoutClosed = true}
          loadEmissionsProgramsDispatcher={jest.fn()}
          updateProgramSelectionDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          renderedHandler ={jest.fn()}
          />
      </Provider>);
  });

  afterEach(cleanup);

  it("Check that the  component properly renders", () => {
    const { getByText, getAllByTestId, getAllByRole } = queries
    expect(getByText('Active Programs')).toBeInTheDocument()
    expect(getByText('Retired Programs')).toBeInTheDocument()
    expect(getAllByTestId('program-group-name')).toHaveLength(4)

    const checkbox = getAllByRole('checkbox')
    expect(checkbox).toHaveLength(storeProgam[0].items.length + storeProgam[1].items.length)

  });

  it("handles checkbox selection appropriately", () => {
    const { getByRole, getByText } = queries;
    const arpCheckbox = getByRole('checkbox', {name:"Acid Rain Program (ARP)"});
    fireEvent.click(arpCheckbox);
    expect(arpCheckbox.checked).toEqual(true);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    fireEvent.click(applyFilterButton);
    expect(flyoutClosed).toBe(true);
  });

});
