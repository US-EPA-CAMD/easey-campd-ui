import React from 'react';
import initialState from "../../store/reducers/initialState";
import { updateFilterCriteria } from "../../store/actions/customDataDownload/filterCriteria";
import { engageFilterLogic } from "./filterLogic";
import { restructurePrograms } from './filterCriteria';

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
    "id": "2",
    "facilityId": "5",
    "facilityName": "Chickasaw",
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
    "id": "3",
    "facilityId": "7",
    "facilityName": "Gadsden",
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
    "id": "4",
    "facilityId": "8",
    "facilityName": "Gorgas",
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
    "id": "5",
    "facilityId": "10",
    "facilityName": "Greene County",
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
    "id": "6",
    "facilityId": "26",
    "facilityName": "E C Gaston",
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
    "id": "7",
    "facilityId": "47",
    "facilityName": "Colbert",
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
    "id": "8",
    "facilityId": "50",
    "facilityName": "Widows Creek",
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
    "id": "9",
    "facilityId": "51",
    "facilityName": "Dolet Hills Power Station",
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
    "id": "10",
    "facilityId": "54",
    "facilityName": "Smith Generating Facility",
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
initialState.filterCriteria.timePeriod.year.yearArray = ["2019"];
initialState.filterCriteria.program = restructurePrograms(program);
initialState.filterCriteria.facility = facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true}));
initialState.filterCriteria.stateTerritory = states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true}));
initialState.filterCriteria.filterMapping = [{"year":2019,"programCode":"ARP","facilityId":3,"state":"AL","unitTypeCode":"CC","fuelTypeCode":"PNG","controlCode":"DLNB"},
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

describe('Emissions Filter logic functions', () => {
  it('engages filter logic for the specified parameters', () => {
    const clonedFilterCritera = JSON.parse(JSON.stringify(initialState.filterCriteria));
    engageFilterLogic("EMISSIONS", "Annual Emissions", "Time Period", clonedFilterCritera, updateFilterCriteria);
    expect(clonedFilterCritera).not.toBe(initialState.filterCriteria);
  });

});
