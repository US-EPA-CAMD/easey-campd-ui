import React from 'react';
import initialState from '../../store/reducers/initialState';
import { updateFilterCriteria } from '../../store/actions/customDataDownload/filterCriteria';
import { engageFilterLogic } from './filterLogic';
import {
  restructurePrograms,
  restructureUnitTypes,
  restructureControlTechnologies,
} from './filterCriteria';

const program = [
  {
    programCode: 'ARP',
    programDescription: 'Acid Rain Program',
    compParameterCode: 'SO2',
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'CAIRNOX',
    programDescription: 'CAIR NOx Annual Program',
    compParameterCode: 'NOX',
    programGroupCode: 'CAIR',
    programGroupDescription: 'Clean Air Interstate Rule',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: true,
    tradingEndDate: '2016-08-10',
  },
  {
    programCode: 'CAIROS',
    programDescription: 'CAIR NOx Ozone Season Program',
    compParameterCode: 'NOX',
    programGroupCode: 'CAIR',
    programGroupDescription: 'Clean Air Interstate Rule',
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: true,
    retiredIndicator: true,
    tradingEndDate: '2016-08-10',
  },
  {
    programCode: 'CAIRSO2',
    programDescription: 'CAIR SO2 Annual Program',
    compParameterCode: 'SO2',
    programGroupCode: 'CAIR',
    programGroupDescription: 'Clean Air Interstate Rule',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: true,
    tradingEndDate: '2016-08-10',
  },
  {
    programCode: 'CSNOX',
    programDescription: 'Cross-State Air Pollution Rule NOx Annual Program',
    compParameterCode: 'NOX',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'CSNOXOS',
    programDescription:
      'Cross-State Air Pollution Rule NOx Ozone Season Program',
    compParameterCode: 'NOX',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: true,
    retiredIndicator: true,
    tradingEndDate: '2017-10-23',
  },
  {
    programCode: 'CSOSG1',
    programDescription:
      'Cross-State Air Pollution Rule NOx Ozone Season Program Group 1',
    compParameterCode: 'NOX',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'CSOSG2',
    programDescription:
      'Cross-State Air Pollution Rule NOx Ozone Season Program Group 2',
    compParameterCode: 'NOX',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'CSSO2G1',
    programDescription:
      'Cross-State Air Pollution Rule SO2 Annual Program Group 1',
    compParameterCode: 'SO2',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'CSSO2G2',
    programDescription:
      'Cross-State Air Pollution Rule SO2 Annual Program Group 2',
    compParameterCode: 'SO2',
    programGroupCode: 'CSAPR',
    programGroupDescription: 'Cross-State Air Pollution Rule',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'NBP',
    programDescription: 'NOx Budget Trading Program',
    compParameterCode: 'NOX',
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: false,
    retiredIndicator: true,
    tradingEndDate: '2009-03-25',
  },
  {
    programCode: 'NHNOX',
    programDescription: 'NH NOx Program',
    compParameterCode: null,
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: false,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'NSPS4T',
    programDescription: 'New Source Performance Standards subpart TTTT',
    compParameterCode: null,
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: false,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'OTC',
    programDescription: 'OTC NOx Budget Program',
    compParameterCode: 'NOX',
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: true,
    annualIndicator: false,
    allowanceIndicator: false,
    retiredIndicator: true,
    tradingEndDate: '2003-05-06',
  },
  {
    programCode: 'RGGI',
    programDescription: 'Regional Greenhouse Gas Initiative',
    compParameterCode: null,
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: false,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'SIPNOX',
    programDescription: 'SIP NOx Program',
    compParameterCode: null,
    programGroupCode: null,
    programGroupDescription: null,
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: false,
    retiredIndicator: false,
    tradingEndDate: null,
  },
  {
    programCode: 'TXSO2',
    programDescription: 'Texas SO2 Trading Program',
    compParameterCode: 'SO2',
    programGroupCode: 'TXSO2',
    programGroupDescription: 'Texas SO2 Trading Program',
    ozoneIndicator: false,
    annualIndicator: true,
    allowanceIndicator: true,
    retiredIndicator: false,
    tradingEndDate: null,
  },
];
const facilities = [
  {
    id: '1',
    facilityId: '3',
    facilityName: 'Barry',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/1',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/1/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/1/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/1/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/1/contacts',
      },
    ],
  },
  {
    id: '2',
    facilityId: '5',
    facilityName: 'Chickasaw',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/2',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/2/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/2/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/2/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/2/contacts',
      },
    ],
  },
  {
    id: '3',
    facilityId: '7',
    facilityName: 'Gadsden',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/3',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/3/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/3/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/3/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/3/contacts',
      },
    ],
  },
  {
    id: '4',
    facilityId: '8',
    facilityName: 'Gorgas',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/4',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/4/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/4/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/4/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/4/contacts',
      },
    ],
  },
  {
    id: '5',
    facilityId: '10',
    facilityName: 'Greene County',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/5',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/5/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/5/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/5/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/5/contacts',
      },
    ],
  },
  {
    id: '6',
    facilityId: '26',
    facilityName: 'E C Gaston',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/6',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/6/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/6/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/6/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/6/contacts',
      },
    ],
  },
  {
    id: '7',
    facilityId: '47',
    facilityName: 'Colbert',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/7',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/7/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/7/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/7/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/7/contacts',
      },
    ],
  },
  {
    id: '8',
    facilityId: '50',
    facilityName: 'Widows Creek',
    stateCode: 'AL',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/8',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/8/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/8/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/8/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/8/contacts',
      },
    ],
  },
  {
    id: '9',
    facilityId: '51',
    facilityName: 'Dolet Hills Power Station',
    stateCode: 'LA',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/9',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/9/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/9/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/9/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/9/contacts',
      },
    ],
  },
  {
    id: '10',
    facilityId: '54',
    facilityName: 'Smith Generating Facility',
    stateCode: 'KY',
    links: [
      {
        rel: 'self',
        href: '/api/facility-mgmt/facilities/10',
      },
      {
        rel: 'units',
        href: '/api/facility-mgmt/facilities/10/units',
      },
      {
        rel: 'stacks',
        href: '/api/facility-mgmt/facilities/10/stacks',
      },
      {
        rel: 'owners',
        href: '/api/facility-mgmt/facilities/10/owners',
      },
      {
        rel: 'contacts',
        href: '/api/facility-mgmt/facilities/10/contacts',
      },
    ],
  },
];
const states = [
  {
    stateCode: 'AK',
    stateName: 'Alaska',
    epaRegion: '10',
  },
  {
    stateCode: 'AL',
    stateName: 'Alabama',
    epaRegion: '4',
  },
  {
    stateCode: 'AR',
    stateName: 'Arkansas',
    epaRegion: '6',
  },
  {
    stateCode: 'AS',
    stateName: 'American Samoa',
    epaRegion: '9',
  },
  {
    stateCode: 'AZ',
    stateName: 'Arizona',
    epaRegion: '9',
  },
  {
    stateCode: 'CA',
    stateName: 'California',
    epaRegion: '9',
  },
  {
    stateCode: 'CO',
    stateName: 'Colorado',
    epaRegion: '8',
  },
  {
    stateCode: 'CT',
    stateName: 'Connecticut',
    epaRegion: '1',
  },
  {
    stateCode: 'DC',
    stateName: 'District Of Columbia',
    epaRegion: '3',
  },
  {
    stateCode: 'DE',
    stateName: 'Delaware',
    epaRegion: '3',
  },
  {
    stateCode: 'FL',
    stateName: 'Florida',
    epaRegion: '4',
  },
  {
    stateCode: 'FM',
    stateName: 'States Of Micronesia',
    epaRegion: '9',
  },
  {
    stateCode: 'GA',
    stateName: 'Georgia',
    epaRegion: '4',
  },
  {
    stateCode: 'GU',
    stateName: 'Guam',
    epaRegion: '9',
  },
  {
    stateCode: 'HI',
    stateName: 'Hawaii',
    epaRegion: '9',
  },
  {
    stateCode: 'IA',
    stateName: 'Iowa',
    epaRegion: '7',
  },
  {
    stateCode: 'ID',
    stateName: 'Idaho',
    epaRegion: '10',
  },
  {
    stateCode: 'IL',
    stateName: 'Illinois',
    epaRegion: '5',
  },
  {
    stateCode: 'IN',
    stateName: 'Indiana',
    epaRegion: '5',
  },
  {
    stateCode: 'KS',
    stateName: 'Kansas',
    epaRegion: '7',
  },
  {
    stateCode: 'KY',
    stateName: 'Kentucky',
    epaRegion: '4',
  },
  {
    stateCode: 'LA',
    stateName: 'Louisiana',
    epaRegion: '6',
  },
  {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    epaRegion: '1',
  },
  {
    stateCode: 'MD',
    stateName: 'Maryland',
    epaRegion: '3',
  },
  {
    stateCode: 'ME',
    stateName: 'Maine',
    epaRegion: '1',
  },
  {
    stateCode: 'MH',
    stateName: 'Marshall Islands',
    epaRegion: '9',
  },
  {
    stateCode: 'MI',
    stateName: 'Michigan',
    epaRegion: '5',
  },
  {
    stateCode: 'MN',
    stateName: 'Minnesota',
    epaRegion: '5',
  },
  {
    stateCode: 'MO',
    stateName: 'Missouri',
    epaRegion: '7',
  },
  {
    stateCode: 'MP',
    stateName: 'Northern Mariana Isl',
    epaRegion: '9',
  },
  {
    stateCode: 'MS',
    stateName: 'Mississippi',
    epaRegion: '4',
  },
  {
    stateCode: 'MT',
    stateName: 'Montana',
    epaRegion: '8',
  },
  {
    stateCode: 'NC',
    stateName: 'North Carolina',
    epaRegion: '4',
  },
  {
    stateCode: 'ND',
    stateName: 'North Dakota',
    epaRegion: '8',
  },
  {
    stateCode: 'NE',
    stateName: 'Nebraska',
    epaRegion: '7',
  },
  {
    stateCode: 'NH',
    stateName: 'New Hampshire',
    epaRegion: '1',
  },
  {
    stateCode: 'NJ',
    stateName: 'New Jersey',
    epaRegion: '2',
  },
  {
    stateCode: 'NM',
    stateName: 'New Mexico',
    epaRegion: '6',
  },
  {
    stateCode: 'NV',
    stateName: 'Nevada',
    epaRegion: '9',
  },
  {
    stateCode: 'NY',
    stateName: 'New York',
    epaRegion: '2',
  },
  {
    stateCode: 'OH',
    stateName: 'Ohio',
    epaRegion: '5',
  },
  {
    stateCode: 'OK',
    stateName: 'Oklahoma',
    epaRegion: '6',
  },
  {
    stateCode: 'OR',
    stateName: 'Oregon',
    epaRegion: '10',
  },
  {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    epaRegion: '3',
  },
  {
    stateCode: 'PR',
    stateName: 'Puerto Rico',
    epaRegion: '2',
  },
  {
    stateCode: 'PW',
    stateName: 'Palau',
    epaRegion: '9',
  },
  {
    stateCode: 'RI',
    stateName: 'Rhode Island',
    epaRegion: '1',
  },
  {
    stateCode: 'SC',
    stateName: 'South Carolina',
    epaRegion: '4',
  },
  {
    stateCode: 'SD',
    stateName: 'South Dakota',
    epaRegion: '8',
  },
  {
    stateCode: 'TN',
    stateName: 'Tennessee',
    epaRegion: '4',
  },
  {
    stateCode: 'TX',
    stateName: 'Texas',
    epaRegion: '6',
  },
  {
    stateCode: 'UM',
    stateName: 'Midway Islands',
    epaRegion: '9',
  },
  {
    stateCode: 'UT',
    stateName: 'Utah',
    epaRegion: '8',
  },
  {
    stateCode: 'VA',
    stateName: 'Virginia',
    epaRegion: '3',
  },
  {
    stateCode: 'VI',
    stateName: 'Virgin Islands',
    epaRegion: '2',
  },
  {
    stateCode: 'VT',
    stateName: 'Vermont',
    epaRegion: '1',
  },
  {
    stateCode: 'WA',
    stateName: 'Washington',
    epaRegion: '10',
  },
  {
    stateCode: 'WI',
    stateName: 'Wisconsin',
    epaRegion: '5',
  },
  {
    stateCode: 'WV',
    stateName: 'West Virginia',
    epaRegion: '3',
  },
  {
    stateCode: 'WY',
    stateName: 'Wyoming',
    epaRegion: '8',
  },
];
const controlTechnology = [
  {
    controlCode: 'APAC',
    controlDescription:
      'Additives to Enhance PAC and Existing Equipment Performance',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'B',
    controlDescription: 'Baghouse',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'C',
    controlDescription: 'Cyclone',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'CAT',
    controlDescription:
      'Catalyst (gold, palladium, or other) used to oxidize mercury',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'CM',
    controlDescription: 'Combustion Modification/Fuel Reburning',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'DA',
    controlDescription: 'Dual Alkali',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'DL',
    controlDescription: 'Dry Lime FGD',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'DLNB',
    controlDescription: 'Dry Low NOx Burners',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'DSI',
    controlDescription: 'Dry Sorbent Injection',
    controlEquipParamCode: null,
    controlEquipParamDescription: null,
  },
  {
    controlCode: 'ESP',
    controlDescription: 'Electrostatic Precipitator',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'FBL',
    controlDescription: 'Fluidized Bed Limestone Injection',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'H2O',
    controlDescription: 'Water Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'HESP',
    controlDescription: 'Hybrid ESP',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'HPAC',
    controlDescription: 'Halogenated PAC Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'LNB',
    controlDescription: 'Low NOx Burner Technology (Dry Bottom only)',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNBO',
    controlDescription: 'Low NOx Burner Technology w/ Overfire Air',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC1',
    controlDescription: 'Low NOx Burner Technology w/ Closed-coupled OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC2',
    controlDescription: 'Low NOx Burner Technology w/ Separated OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC3',
    controlDescription:
      'Low NOx Burner Technology w/ Closed-coupled/Separated OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNCB',
    controlDescription: 'Low NOx Cell Burner',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'MO',
    controlDescription: 'Magnesium Oxide',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'NH3',
    controlDescription: 'Ammonia Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'O',
    controlDescription: 'Other',
    controlEquipParamCode: null,
    controlEquipParamDescription: null,
  },
  {
    controlCode: 'OFA',
    controlDescription: 'Overfire Air',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'REAC',
    controlDescription: 'Regenerative Activated Coke Technology',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'SB',
    controlDescription: 'Sodium Based',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'SCR',
    controlDescription: 'Selective Catalytic Reduction',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'SNCR',
    controlDescription: 'Selective Non-catalytic Reduction',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'SORB',
    controlDescription: 'Other (Non PAC) Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'STM',
    controlDescription: 'Steam Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'UPAC',
    controlDescription: 'Untreated PAC Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'WESP',
    controlDescription: 'Wet ESP',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'WL',
    controlDescription: 'Wet Lime FGD',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'WLS',
    controlDescription: 'Wet Limestone',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'WS',
    controlDescription: 'Wet Scrubber',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
];
const unitType = [
  {
    unitTypeCode: 'AF',
    unitTypeDescription: 'Arch-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'BFB',
    unitTypeDescription: 'Bubbling fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'C',
    unitTypeDescription: 'Cyclone boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CB',
    unitTypeDescription: 'Cell burner boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CC',
    unitTypeDescription: 'Combined cycle',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'CFB',
    unitTypeDescription: 'Circulating fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'CT',
    unitTypeDescription: 'Combustion turbine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'DB',
    unitTypeDescription: 'Dry bottom wall-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'DTF',
    unitTypeDescription: 'Dry bottom turbo-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'DVF',
    unitTypeDescription: 'Dry bottom vertically-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'ICE',
    unitTypeDescription: 'Internal combustion engine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'IGC',
    unitTypeDescription: 'Integrated gasification combined cycle',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'KLN',
    unitTypeDescription: 'Cement Kiln',
    sortOrder: null,
    unitTypeGroupCode: 'F',
    unitTypeGroupDescription: 'Furnaces',
  },
  {
    unitTypeCode: 'OB',
    unitTypeDescription: 'Other boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'OT',
    unitTypeDescription: 'Other turbine',
    sortOrder: null,
    unitTypeGroupCode: 'T',
    unitTypeGroupDescription: 'Turbines',
  },
  {
    unitTypeCode: 'PFB',
    unitTypeDescription: 'Pressurized fluidized bed boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'PRH',
    unitTypeDescription: 'Process Heater',
    sortOrder: null,
    unitTypeGroupCode: 'F',
    unitTypeGroupDescription: 'Furnaces',
  },
  {
    unitTypeCode: 'S',
    unitTypeDescription: 'Stoker',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'T',
    unitTypeDescription: 'Tangentially-fired',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WBF',
    unitTypeDescription: 'Wet bottom wall-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WBT',
    unitTypeDescription: 'Wet bottom turbo-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
  {
    unitTypeCode: 'WVF',
    unitTypeDescription: 'Wet bottom vertically-fired boiler',
    sortOrder: null,
    unitTypeGroupCode: 'B',
    unitTypeGroupDescription: 'Boilers',
  },
];
const sourceCategories = [
  {
    sourceCategoryCode: 'AUTSTMP',
    sourceCategoryDescription: 'Automotive Stampings',
  },
  {
    sourceCategoryCode: 'BKINCHM',
    sourceCategoryDescription: 'Bulk Industrial Chemical',
  },
  {
    sourceCategoryCode: 'CEMENTM',
    sourceCategoryDescription: 'Cement Manufacturing',
  },
  {
    sourceCategoryCode: 'COGEN',
    sourceCategoryDescription: 'Cogeneration',
  },
  {
    sourceCategoryCode: 'ELECTRC',
    sourceCategoryDescription: 'Electric Utility',
  },
  {
    sourceCategoryCode: 'INDBLR',
    sourceCategoryDescription: 'Industrial Boiler',
  },
  {
    sourceCategoryCode: 'INDTUR',
    sourceCategoryDescription: 'Industrial Turbine',
  },
  {
    sourceCategoryCode: 'INSTITU',
    sourceCategoryDescription: 'Institutional',
  },
  {
    sourceCategoryCode: 'IRONSTL',
    sourceCategoryDescription: 'Iron & Steel',
  },
  {
    sourceCategoryCode: 'MUNWAST',
    sourceCategoryDescription: 'Municipal Waste Combustor',
  },
];
initialState.filterCriteria.timePeriod.year.yearArray = ['2019'];
initialState.filterCriteria.program = restructurePrograms(program);
initialState.filterCriteria.facility = facilities.map((f) => ({
  id: f.facilityId,
  label: `${f.facilityName} (${f.facilityId})`,
  selected: false,
  enabled: true,
}));
initialState.filterCriteria.stateTerritory = states.map((s) => ({
  id: s.stateCode,
  label: s.stateName,
  selected: false,
  enabled: true,
}));
initialState.filterCriteria.controlTechnology =
  restructureControlTechnologies(controlTechnology);
initialState.filterCriteria.unitType = restructureUnitTypes(unitType);
initialState.filterCriteria.sourceCategory = sourceCategories.map((f) => ({
  id: f.sourceCategoryCode,
  label: f.sourceCategoryDescription,
  selected: false,
  enabled: true,
}));
initialState.filterCriteria.filterMapping = [
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'CC',
    fuelTypeCode: 'PNG',
    controlCode: 'DLNB',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'CC',
    fuelTypeCode: 'PNG',
    controlCode: 'SCR',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'CAT',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'DSI',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'ESP',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'HPAC',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'LNC2',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'SCR',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'SNCR',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'C',
    controlCode: 'WLS',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'PNG',
    controlCode: 'CAT',
  },
  {
    year: 2019,
    programCode: 'ARP',
    facilityId: 3,
    stateCode: 'AL',
    unitTypeCode: 'T',
    fuelTypeCode: 'PNG',
    controlCode: 'DSI',
  },
];

describe('Emissions Filter logic functions', () => {
  it('engages filter logic for emissions Facility/Unit Attributes', () => {
    const clonedFilterCritera = JSON.parse(
      JSON.stringify(initialState.filterCriteria)
    );
    engageFilterLogic(
      'EMISSIONS',
      'Facility/Unit Attributes',
      'Time Period',
      clonedFilterCritera,
      updateFilterCriteria
    );
    expect(clonedFilterCritera).not.toBe(initialState.filterCriteria);
  });
  it('engages filter logic for allowance holdings', () => {
    initialState.filterCriteria.filterMapping = [
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000030',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000031',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000032',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000033',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000034',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000039',
        accountTypeCode: 'RESERVE',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000000000043',
        accountTypeCode: 'ENFSURR',
        facilityId: null,
        stateCode: null,
        ownerOperator: null,
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '000054FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 54,
        stateCode: 'KY',
        ownerOperator: 'East Kentucky Power Cooperative',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '002330FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 2330,
        stateCode: 'NV',
        ownerOperator: 'Sierra Pacific Power Company',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '002336FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 2336,
        stateCode: 'NV',
        ownerOperator: 'Sierra Pacific Power Company',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '004050FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 4050,
        stateCode: 'WI',
        ownerOperator: 'Wisconsin Power & Light Company',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '006213FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 6213,
        stateCode: 'IN',
        ownerOperator: 'Hoosier Energy REC, Inc.',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007335FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7335,
        stateCode: 'IN',
        ownerOperator: 'Indiana Municipal Power Agency',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007336FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7336,
        stateCode: 'IN',
        ownerOperator: 'Indiana Municipal Power Agency',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007782FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7782,
        stateCode: 'OH',
        ownerOperator: 'American Municipal Power - Ohio',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007783FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7783,
        stateCode: 'OH',
        ownerOperator: 'American Municipal Power - Ohio',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007829FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7829,
        stateCode: 'GA',
        ownerOperator: 'Oglethorpe Power Corporation',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '007916FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 7916,
        stateCode: 'GA',
        ownerOperator: 'Oglethorpe Power Corporation',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '055015FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 55015,
        stateCode: 'TX',
        ownerOperator: 'Phillips 66 Company',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '055540FACLTY',
        accountTypeCode: 'FACLTY',
        facilityId: 55540,
        stateCode: 'CA',
        ownerOperator: 'Chula Vista Energy Center, LLC',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000001',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Babcock & Wilcox',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000004',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Ralston, Paul E',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000012',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Morrison, Marks O',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000018',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Heller, James',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000028',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Brady, Nancylee',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000034',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Hoosier Energy REC, Inc.',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000036',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Devlin, Theodore E',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000038',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Van Horn, Andrew J',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000041',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'Niemeyer, Victor',
      },
      {
        vintageYear: '1995',
        programCode: 'ARP',
        accountNumber: '999900000044',
        accountTypeCode: 'GENERAL',
        facilityId: null,
        stateCode: null,
        ownerOperator: 'BGC Environmental Brokerage Services, L.P.',
      },
    ];
    initialState.filterCriteria.timePeriod.year.yearArray = [];
    initialState.filterCriteria.ownerOperator = [
      { ownerOperator: '21st Securities', ownType: 'OWN' },
      { ownerOperator: '5380 Frontier Ave Energy Company LLC', ownType: 'OPR' },
      { ownerOperator: '5380 Frontier Ave Energy Company LLC', ownType: 'OWN' },
      { ownerOperator: 'A-55, Inc.', ownType: 'OWN' },
      { ownerOperator: 'ABB Energy Ventures, Inc.', ownType: 'OPR' },
      { ownerOperator: 'ABB Energy Ventures, Inc.', ownType: 'OWN' },
      { ownerOperator: 'Abbott, Martha', ownType: 'OWN' },
      { ownerOperator: 'Abraczinskas, Michael', ownType: 'OWN' },
      { ownerOperator: 'ACT Commodities Inc.', ownType: 'OWN' },
      { ownerOperator: 'AG Energy, LP', ownType: 'OPR' },
      { ownerOperator: 'Adirondack Council', ownType: 'OWN' },
      { ownerOperator: 'ADM Company', ownType: 'OWN' },
      { ownerOperator: 'AdvanSix Resins and Chemicals, LLC', ownType: 'OPR' },
      { ownerOperator: 'AdvanSix Resins and Chemicals, LLC', ownType: 'OWN' },
      { ownerOperator: 'AEP Generation Resources, Inc.', ownType: 'OPR' },
      { ownerOperator: 'AEP Generation Resources, Inc.', ownType: 'OWN' },
      { ownerOperator: 'Abby Ingram', ownType: 'OWN' },
      { ownerOperator: 'Adams-Columbia Electric Cooperative', ownType: 'OWN' },
      { ownerOperator: 'AEP Texas Inc', ownType: 'OWN' },
      { ownerOperator: 'AER NY-GEN, LLC', ownType: 'OPR' },
      { ownerOperator: 'AER NY-GEN, LLC', ownType: 'OWN' },
      { ownerOperator: 'AES Corporation', ownType: 'OPR' },
      { ownerOperator: 'AES Corporation', ownType: 'OWN' },
      { ownerOperator: 'AES Ohio Generation, LLC', ownType: 'OPR' },
      { ownerOperator: 'AES Ohio Generation, LLC', ownType: 'OWN' },
      {
        ownerOperator: 'African American Environmentalist Assoc',
        ownType: 'OWN',
      },
    ];
    initialState.filterCriteria.facility.forEach((e) => {
      if (e.id === '3') {
        e.selected = true;
      }
    });
    const clonedFilterCritera = JSON.parse(
      JSON.stringify(initialState.filterCriteria)
    );
    engageFilterLogic(
      'ALLOWANCE',
      'Holdings',
      'Facility',
      clonedFilterCritera,
      updateFilterCriteria
    );
    expect(clonedFilterCritera).not.toBe(initialState.filterCriteria);
  });
  it('engages filter logic for allowance based compliance', () => {
    initialState.filterCriteria.filterMapping = [
      {"year":"1995","programCode":"ARP","facilityId":7,"stateCode":"AL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":26,"stateCode":"AL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":47,"stateCode":"AL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":56,"stateCode":"AL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":641,"stateCode":"FL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":642,"stateCode":"FL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":645,"stateCode":"FL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":699,"stateCode":"GA","ownerOperator":null},
      {"year":"2000","programCode":"ARP","facilityId":703,"stateCode":"GA","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":708,"stateCode":"GA","ownerOperator":null},
      {"year":"2000","programCode":"ARP","facilityId":709,"stateCode":"GA","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":710,"stateCode":"GA","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":727,"stateCode":"GA","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":728,"stateCode":"GA","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":733,"stateCode":"GA","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":861,"stateCode":"IL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":862,"stateCode":"IL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":863,"stateCode":"IL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":864,"stateCode":"IL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":876,"stateCode":"IL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":887,"stateCode":"IL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":889,"stateCode":"IL","ownerOperator":null},
      {"year":"1997","programCode":"ARP","facilityId":891,"stateCode":"IL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":892,"stateCode":"IL","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":897,"stateCode":"IL","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":898,"stateCode":"IL","ownerOperator":null},
      {"year":"1997","programCode":"ARP","facilityId":983,"stateCode":"IN","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":988,"stateCode":"IN","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":990,"stateCode":"IN","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":991,"stateCode":"IN","ownerOperator":null},
      {"year":"1997","programCode":"ARP","facilityId":994,"stateCode":"IN","ownerOperator":null},{"year":"1995","programCode":"ARP","facilityId":995,"stateCode":"IN","ownerOperator":null},
      {"year":"1995","programCode":"ARP","facilityId":997,"stateCode":"IN","ownerOperator":null}
    ];
    initialState.filterCriteria.timePeriod.year.yearArray = [];
    initialState.filterCriteria.ownerOperator = [
      {"ownerOperator":"5380 Frontier Ave Energy Company LLC","ownType":"OPR"},{"ownerOperator":"5380 Frontier Ave Energy Company LLC","ownType":"OWN"},
      {"ownerOperator":"ABB Energy Ventures, Inc.","ownType":"OPR"},{"ownerOperator":"Acadia Power Partners, LLC","ownType":"OWN"},
      {"ownerOperator":"A/C Power - Colver Operations","ownType":"OPR"},{"ownerOperator":"Adams-Columbia Electric Cooperative","ownType":"OWN"},
      {"ownerOperator":"AdvanSix Resins and Chemicals, LLC","ownType":"OPR"},{"ownerOperator":"AdvanSix Resins and Chemicals, LLC","ownType":"OWN"},
      {"ownerOperator":"AEE 2, LLC","ownType":"OWN"},{"ownerOperator":"AEP Energy Partners Inc","ownType":"OWN"},{"ownerOperator":"AEP Generation Resources, Inc.","ownType":"BTH"},
      {"ownerOperator":"AEP Generation Resources, Inc.","ownType":"OPR"},{"ownerOperator":"AEP Generation Resources, Inc.","ownType":"OWN"},
      {"ownerOperator":"AEP Pro Serv, Inc","ownType":"OPR"},{"ownerOperator":"AEP Texas Inc","ownType":"OWN"},{"ownerOperator":"AER NY-GEN, LLC","ownType":"OPR"},
    ];
    initialState.filterCriteria.facility.forEach((e) => {
      if (e.id === '3') {
        e.selected = true;
      }
    });
    const clonedFilterCritera = JSON.parse(
      JSON.stringify(initialState.filterCriteria)
    );
    engageFilterLogic(
      'COMPLIANCE',
      'Allowance Based',
      'Facility',
      clonedFilterCritera,
      updateFilterCriteria
    );
    expect(clonedFilterCritera).not.toBe(initialState.filterCriteria);
  });
});
