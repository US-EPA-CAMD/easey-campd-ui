export const mockBulkDataFilesRecords = [
  {
    filename: "Emissions-Daily-2021-Q1.csv",
    s3Path: "emissions/daily/quarter/Emissions-Daily-2021-Q1.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "quarter",
    bytes: 71084971,
    kiloBytes: 69418,
    megaBytes: 67,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:39:01Z",
  },
  {
    filename: "Emissions-Daily-2021-Q2.csv",
    s3Path: "emissions/daily/quarter/Emissions-Daily-2021-Q2.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "quarter",
    bytes: 74858360,
    kiloBytes: 73103,
    megaBytes: 71,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:35:53Z",
  },
  {
    filename: "Emissions-Daily-2021-Q3.csv",
    s3Path: "emissions/daily/quarter/Emissions-Daily-2021-Q3.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "quarter",
    bytes: 77672657,
    kiloBytes: 75852,
    megaBytes: 74,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:35:54Z",
  },
  {
    filename: "Emissions-Daily-2021-Q4.csv",
    s3Path: "emissions/daily/quarter/Emissions-Daily-2021-Q4.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "quarter",
    bytes: 72548352,
    kiloBytes: 70848,
    megaBytes: 69,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:58:36Z",
  }
];
export const mockFacilities = [
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
];

export const mockDataPreview = [
  {
    stateCode: 'AL',
    facilityName: 'Barry',
    facilityId: 3,
    unitId: '4',
    associatedStacks: null,
    date: '2019-01-01',
    hour: 0,
    opTime: 1,
    grossLoad: 150,
    steamLoad: null,
    so2Mass: 1617.2,
    so2MassMeasureFlg: 'Measured',
    so2Rate: 0.983,
    so2RateMeasureFlg: 'Calculated',
    co2Mass: 168.7,
    co2MassMeasureFlg: 'Measured',
    co2Rate: 0.103,
    co2RateMeasureFlg: 'Calculated',
    noxMass: 481.8,
    noxMassMeasureFlg: 'Measured',
    noxRate: 0.293,
    noxRateMeasureFlg: 'Measured',
    heatInput: 1644.5,
    heatInputMeasureFlg: 'Measured',
    primaryFuelInfo: 'Coal',
    secondaryFuelInfo: 'Pipeline Natural Gas',
    unitType: 'Tangentially-fired',
    so2ControlInfo: null,
    noxControlInfo: 'Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction',
    pmControlInfo: 'Electrostatic Precipitator',
    hgControlInfo: 'Halogenated PAC Sorbent Injection',
    programCodeInfo: 'ARP, CSNOX, CSOSG2, CSSO2G2, MATS'
  },
  {
    stateCode: 'AL',
    facilityName: 'Barry',
    facilityId: 3,
    unitId: '4',
    associatedStacks: null,
    date: '2019-01-01',
    hour: 1,
    opTime: 1,
    grossLoad: 150,
    steamLoad: null,
    so2Mass: 1611.3,
    so2MassMeasureFlg: 'Measured',
    so2Rate: 0.983,
    so2RateMeasureFlg: 'Calculated',
    co2Mass: 168.2,
    co2MassMeasureFlg: 'Measured',
    co2Rate: 0.103,
    co2RateMeasureFlg: 'Calculated',
    noxMass: 460.7,
    noxMassMeasureFlg: 'Measured',
    noxRate: 0.281,
    noxRateMeasureFlg: 'Measured',
    heatInput: 1639.5,
    heatInputMeasureFlg: 'Measured',
    primaryFuelInfo: 'Coal',
    secondaryFuelInfo: 'Pipeline Natural Gas',
    unitType: 'Tangentially-fired',
    so2ControlInfo: null,
    noxControlInfo: 'Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction',
    pmControlInfo: 'Electrostatic Precipitator',
    hgControlInfo: 'Halogenated PAC Sorbent Injection',
    programCodeInfo: 'ARP, CSNOX, CSOSG2, CSSO2G2, MATS'
  }
];

export const mockFilterMapping = [
  {
    label: 'State',
    value: 'stateCode'
  },
  {
    label: 'Facility Name',
    value: 'facilityName'
  },
  {
    label: 'Facility ID',
    value: 'facilityId'
  },
  {
    label: 'Unit ID',
    value: 'unitId'
  },
  {
    label: 'Associated Stacks',
    value: 'associatedStacks'
  },
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Hour',
    value: 'hour'
  },
  {
    label: 'Operating Time',
    value: 'opTime'
  },
  {
    label: 'Gross Load (MW)',
    value: 'grossLoad'
  },
  {
    label: 'Steam Load (1000 lb/hr)',
    value: 'steamLoad'
  },
  {
    label: 'SO2 Mass (lbs)',
    value: 'so2Mass'
  },
  {
    label: 'SO2 Mass Measure Indicator',
    value: 'so2MassMeasureFlg'
  },
  {
    label: 'SO2 Rate (lbs/mmBtu)',
    value: 'so2Rate'
  },
  {
    label: 'SO2 Rate Measure Indicator',
    value: 'so2RateMeasureFlg'
  },
  {
    label: 'CO2 Mass (short tons)',
    value: 'co2Mass'
  },
  {
    label: 'CO2 Mass Measure Indicator',
    value: 'co2MassMeasureFlg'
  },
  {
    label: 'CO2 Rate (short tons/mmBtu)',
    value: 'co2Rate'
  },
  {
    label: 'CO2 Rate Measure Indicator',
    value: 'co2RateMeasureFlg'
  }
];