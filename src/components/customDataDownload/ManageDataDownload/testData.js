export const unitTypes = {
    url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/unit-types',
    data:[
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
    }
  ]}
  
  export const fuelTypes = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/fuel-types', data: [
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
    }
  ]}
  
  export const states = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/states', data: [
    { "stateCode": "AK", "stateName": "Alaska", "epaRegion": 10 },
    { "stateCode": "AL", "stateName": "Alabama", "epaRegion": 4 },
    { "stateCode": "AR", "stateName": "Arkansas", "epaRegion": 6 },
    { "stateCode": "AS", "stateName": "American Samoa", "epaRegion": 9 },
    { "stateCode": "AZ", "stateName": "Arizona", "epaRegion": 9 },
    { "stateCode": "CA", "stateName": "California", "epaRegion": 9 },
    { "stateCode": "CO", "stateName": "Colorado", "epaRegion": 8 },
    { "stateCode": "CT", "stateName": "Connecticut", "epaRegion": 1 },
    { "stateCode": "DC", "stateName": "District Of Columbia", "epaRegion": 3 },
    { "stateCode": "DE", "stateName": "Delaware", "epaRegion": 3 },
    { "stateCode": "FL", "stateName": "Florida", "epaRegion": 4 },
    { "stateCode": "FM", "stateName": "States Of Micronesia", "epaRegion": 9 },
    { "stateCode": "GA", "stateName": "Georgia", "epaRegion": 4 },
    { "stateCode": "GU", "stateName": "Guam", "epaRegion": 9 },
    { "stateCode": "HI", "stateName": "Hawaii", "epaRegion": 9 },
    { "stateCode": "IA", "stateName": "Iowa", "epaRegion": 7 },
    { "stateCode": "ID", "stateName": "Idaho", "epaRegion": 10 },
    { "stateCode": "IL", "stateName": "Illinois", "epaRegion": 5 },
    { "stateCode": "IN", "stateName": "Indiana", "epaRegion": 5 },
    { "stateCode": "KS", "stateName": "Kansas", "epaRegion": 7 },
    { "stateCode": "KY", "stateName": "Kentucky", "epaRegion": 4 },
    { "stateCode": "LA", "stateName": "Louisiana", "epaRegion": 6 },
    { "stateCode": "MA", "stateName": "Massachusetts", "epaRegion": 1 },
    { "stateCode": "MD", "stateName": "Maryland", "epaRegion": 3 },
    { "stateCode": "ME", "stateName": "Maine", "epaRegion": 1 },
    { "stateCode": "MH", "stateName": "Marshall Islands", "epaRegion": 9 },
    { "stateCode": "MI", "stateName": "Michigan", "epaRegion": 5 },
    { "stateCode": "MN", "stateName": "Minnesota", "epaRegion": 5 },
    { "stateCode": "MO", "stateName": "Missouri", "epaRegion": 7 },
    { "stateCode": "MP", "stateName": "Northern Mariana Isl", "epaRegion": 9 },
    { "stateCode": "MS", "stateName": "Mississippi", "epaRegion": 4 },
    { "stateCode": "MT", "stateName": "Montana", "epaRegion": 8 },
    { "stateCode": "NC", "stateName": "North Carolina", "epaRegion": 4 },
    { "stateCode": "ND", "stateName": "North Dakota", "epaRegion": 8 },
    { "stateCode": "NE", "stateName": "Nebraska", "epaRegion": 7 },
    { "stateCode": "NH", "stateName": "New Hampshire", "epaRegion": 1 },
    { "stateCode": "NJ", "stateName": "New Jersey", "epaRegion": 2 },
    { "stateCode": "NM", "stateName": "New Mexico", "epaRegion": 6 },
    { "stateCode": "NV", "stateName": "Nevada", "epaRegion": 9 },
    { "stateCode": "NY", "stateName": "New York", "epaRegion": 2 },
    { "stateCode": "OH", "stateName": "Ohio", "epaRegion": 5 },
    { "stateCode": "OK", "stateName": "Oklahoma", "epaRegion": 6 },
    { "stateCode": "OR", "stateName": "Oregon", "epaRegion": 10 },
    { "stateCode": "PA", "stateName": "Pennsylvania", "epaRegion": 3 },
    { "stateCode": "PR", "stateName": "Puerto Rico", "epaRegion": 2 },
    { "stateCode": "PW", "stateName": "Palau", "epaRegion": 9 },
    { "stateCode": "RI", "stateName": "Rhode Island", "epaRegion": 1 },
    { "stateCode": "SC", "stateName": "South Carolina", "epaRegion": 4 },
    { "stateCode": "SD", "stateName": "South Dakota", "epaRegion": 8 },
    { "stateCode": "TN", "stateName": "Tennessee", "epaRegion": 4 },
    { "stateCode": "TX", "stateName": "Texas", "epaRegion": 6 },
    { "stateCode": "UM", "stateName": "Midway Islands", "epaRegion": 9 },
    { "stateCode": "UT", "stateName": "Utah", "epaRegion": 8 },
    { "stateCode": "VA", "stateName": "Virginia", "epaRegion": 3 },
    { "stateCode": "VI", "stateName": "Virgin Islands", "epaRegion": 2 },
    { "stateCode": "VT", "stateName": "Vermont", "epaRegion": 1 },
    { "stateCode": "WA", "stateName": "Washington", "epaRegion": 10 },
    { "stateCode": "WI", "stateName": "Wisconsin", "epaRegion": 5 },
    { "stateCode": "WV", "stateName": "West Virginia", "epaRegion": 3 },
    { "stateCode": "WY", "stateName": "Wyoming", "epaRegion": 8 }
  ]}
  
  export const controlTechnologies = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/control-technologies', data: [
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
    }
  ]}
  
  export const accountTypes = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/account-types?exclude=SHOLD|OVERDF', data: [
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
    }
  ]}
  
  export const transactionTypes = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/transaction-types', data: [
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
    }
  ]}
  
  export const sourceCategories = {url: 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/source-categories', data: [
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
    }
  ]}
  export const attributes = {url: 'tps://api-easey-dev.app.cloud.gov/account-mgmt/emissions-compliance/attributes/applicable', data: [
    {
      "year": 1996,
      "facilityId": 7,
      "stateCode": "AL",
      "ownerOperator": "Alabama Power Company"
    },
    {
      "year": 1996,
      "facilityId": 26,
      "stateCode": "AL",
      "ownerOperator": "Alabama Power Company"
    },
    {
      "year": 1996,
      "facilityId": 47,
      "stateCode": "AL",
      "ownerOperator": "Tennessee Valley Authority"
    },
    {
      "year": 1996,
      "facilityId": 641,
      "stateCode": "FL",
      "ownerOperator": "Gulf Power Company"
    },
    { "year": 1996, "facilityId": 641, "stateCode": "FL", "ownerOperator": null },
    {
      "year": 1996,
      "facilityId": 642,
      "stateCode": "FL",
      "ownerOperator": "Gulf Power Company"
    },
    {
      "year": 1996,
      "facilityId": 645,
      "stateCode": "FL",
      "ownerOperator": "Tampa Electric Company"
    },
    {
      "year": 1996,
      "facilityId": 699,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 703,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 708,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 709,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 710,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 727,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 728,
      "stateCode": "GA",
      "ownerOperator": "Georgia Power Company"
    },
    {
      "year": 1996,
      "facilityId": 733,
      "stateCode": "GA",
      "ownerOperator": "Savannah Electric & Power Company"
    },
    {
      "year": 1996,
      "facilityId": 862,
      "stateCode": "IL",
      "ownerOperator": "Central Illinois Public Service Company"
    },
    {
      "year": 1996,
      "facilityId": 863,
      "stateCode": "IL",
      "ownerOperator": "Central Illinois Public Service Company"
    },
    {
      "year": 1996,
      "facilityId": 864,
      "stateCode": "IL",
      "ownerOperator": "Central Illinois Public Service Company"
    },
    {
      "year": 1996,
      "facilityId": 887,
      "stateCode": "IL",
      "ownerOperator": "Electric Energy, Inc."
    },
    {
      "year": 1996,
      "facilityId": 889,
      "stateCode": "IL",
      "ownerOperator": "Illinois Power Company"
    },
    {
      "year": 1996,
      "facilityId": 892,
      "stateCode": "IL",
      "ownerOperator": "Illinois Power Company"
    },
    {
      "year": 1996,
      "facilityId": 897,
      "stateCode": "IL",
      "ownerOperator": "Illinois Power Company"
    },
    {
      "year": 1996,
      "facilityId": 990,
      "stateCode": "IN",
      "ownerOperator": "Indianapolis Power & Light Company"
    },
    {
      "year": 1996,
      "facilityId": 991,
      "stateCode": "IN",
      "ownerOperator": "Indianapolis Power & Light Company"
    }
  ]}
  export const facilities =  {url: 'https://api-easey-dev.app.cloud.gov/facilities-mgmt/facilities', data: [
    {
      "facilityRecordId": 1,
      "facilityId": 3,
      "facilityName": "Barry",
      "stateCode": "AL",
      "links": [
        { "rel": "self", "href": "/api/facility-mgmt/facilities/1" },
        { "rel": "units", "href": "/api/facility-mgmt/facilities/1/units" },
        { "rel": "stacks", "href": "/api/facility-mgmt/facilities/1/stacks" },
        { "rel": "owners", "href": "/api/facility-mgmt/facilities/1/owners" },
        { "rel": "contacts", "href": "/api/facility-mgmt/facilities/1/contacts" }
      ]
    },
    {
      "facilityRecordId": 2,
      "facilityId": 5,
      "facilityName": "Chickasaw",
      "stateCode": "AL",
      "links": [
        { "rel": "self", "href": "/api/facility-mgmt/facilities/2" },
        { "rel": "units", "href": "/api/facility-mgmt/facilities/2/units" },
        { "rel": "stacks", "href": "/api/facility-mgmt/facilities/2/stacks" },
        { "rel": "owners", "href": "/api/facility-mgmt/facilities/2/owners" },
        { "rel": "contacts", "href": "/api/facility-mgmt/facilities/2/contacts" }
      ]
    }
  ]}
  
  export const ownerOperators = {url: 'https://api-easey-dev.app.cloud.gov/account-mgmt/emissions-compliance/owner-operators', data: [
    { "ownerOperator": "5380 Frontier Ave Energy Company LLC", "ownType": "OPR" },
    { "ownerOperator": "5380 Frontier Ave Energy Company LLC", "ownType": "OWN" },
    { "ownerOperator": "ABB Energy Ventures, Inc.", "ownType": "OPR" },
    { "ownerOperator": "Acadia Power Partners, LLC", "ownType": "OWN" },
    { "ownerOperator": "A/C Power - Colver Operations", "ownType": "OPR" },
    { "ownerOperator": "Adams-Columbia Electric Cooperative", "ownType": "OWN" },
    { "ownerOperator": "AdvanSix Resins and Chemicals, LLC", "ownType": "OPR" },
    { "ownerOperator": "AdvanSix Resins and Chemicals, LLC", "ownType": "OWN" },
    { "ownerOperator": "AEE 2, LLC", "ownType": "OWN" },
    { "ownerOperator": "AEP Energy Partners Inc", "ownType": "OWN" },
    { "ownerOperator": "AEP Generation Resources, Inc.", "ownType": "BTH" },
    { "ownerOperator": "AEP Generation Resources, Inc.", "ownType": "OPR" },
    { "ownerOperator": "AEP Generation Resources, Inc.", "ownType": "OWN" },
    { "ownerOperator": "AEP Pro Serv, Inc", "ownType": "OPR" }
  ]}
  
  /*
  https://api-easey-dev.app.cloud.gov/master-data-mgmt/unit-types
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/fuel-types
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/states
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/control-technologies
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/account-types?exclude=SHOLD|OVERDF
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/transaction-types
filterCriteriaApi.js:12 https://api-easey-dev.app.cloud.gov/master-data-mgmt/source-categories
ManageDataDownload.js:149 COMPLIANCE
filterCriteriaApi.js:91 https://api-easey-dev.app.cloud.gov/account-mgmt/emissions-compliance/attributes/applicable
filterCriteriaApi.js:39 https://api-easey-dev.app.cloud.gov/facilities-mgmt/facilities
filterCriteriaApi.js:48 https://api-easey-dev.app.cloud.gov/account-mgmt/emissions-compliance/owner-operators
  */