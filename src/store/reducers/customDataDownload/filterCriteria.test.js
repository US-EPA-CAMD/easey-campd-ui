import filterCriteriaReducer from "./filterCriteria";
import * as actions from "../../actions/customDataDownload/filterCriteria";
import initialState from "../initialState";
import {restructurePrograms, restructureControlTechnologies, restructureFuelTypes, restructureUnitTypes} from "../../../utils/selectors/filterCriteria";

describe("filterCriteria Reducer", () => {
  it("should update state when update time period is dispatched", () => {
    const timePeriod = {
      startDate: "03/31/2021",
      endDate: "04/02/2021",
      opHrsOnly: false
    }
    const action = actions.updateTimePeriod(timePeriod);
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.timePeriod.startDate).toEqual(timePeriod.startDate);
    expect(newState.timePeriod.endDate).toEqual(timePeriod.endDate);
    expect(newState.timePeriod.opHrsOnly).toEqual(timePeriod.opHrsOnly);
  });
  it("should update state when update program is dispatched", () => {
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
    ];
    const action = actions.updateProgramSelection(restructurePrograms(program));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.program[0].items.length).toEqual(2);
    expect(newState.program[1].items.length).toEqual(1);
  });
  it("should update state when update facility is dispatched", () => {
    const facilities = [
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
      {
        "id": "5",
        "facilityId": "10",
        "facilityName": "Greene County",
        "stateCode": "AL",
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
        "stateCode": "AL",
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
        "stateCode": "AL",
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
        "stateCode": "AL",
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
        "stateCode": "LA",
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
        "stateCode": "KY",
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
    const action = actions.updateFacilitySelection(facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false, enabled:true})));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.facility.length).toEqual(facilities.length);
  });

  it("should update state when update sourceCategories is dispatched", () => {
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
      }
    ];
    const action = actions.updateSourceCategorySelection(sourceCategories.map(f=> ({id: f.sourceCategoryCode, label:f.sourceCategoryDescription, selected:false, enabled:true})));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.sourceCategory.length).toEqual(sourceCategories.length);
  });

  it("should update state when update states is dispatched", () => {
    const states = [
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
    ];
    const action = actions.updateStateSelection(states.map(s=> ({id: s.stateCode, label:s.stateName, selected:false, enabled:true})));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.stateTerritory.length).toEqual(states.length);
  });

  it("should update state when update transactionType is dispatched", () => {
    const transactionType = [
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
    ];
    const action = actions.updateTransactionTypeSelection(transactionType.map(t=> ({id: t.transactionTypeDescription, label: t.transactionTypeDescription, selected:false, enabled:true})));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.transactionType.length).toEqual(transactionType.length);
  });

  it("should update state when load filter mapping is dispatched", () => {
    const filterMapping = [
      {
        year:2019,
        programCode:"ARP",
        facilityId:3,
        stateCode:"AL",
        unitTypeCode:"CC",
        fuelTypeCode:"PNG",
        controlCode:"DLNB",
        sourceCategoryDescription:"Electric Utility",
      },
      {
        year:2019,
        programCode:"ARP",
        facilityId:3,
        stateCode:"AL",
        unitTypeCode:"CC",
        fuelTypeCode:"PNG",
        controlCode:"DLNB",
        sourceCategoryDescription:"Electric Utility",
      }
    ];
    const action = actions.loadFilterMappingSuccess(filterMapping);
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.filterMapping.length).toEqual(filterMapping.length);
  });

  it("should update state when update ownderoperator is dispatched", () => {
    const ownerOperators = [
      {
        "ownId": 52186,
        "ownerOperator": "A.T. Massey Coal Company",
        "ownType": "OWN"
      },
      {
        "ownId": 52193,
        "ownerOperator": "AES Corporation",
        "ownType": "OPR"
      },
      {
        "ownId": 52193,
        "ownerOperator": "AES Corporation",
        "ownType": "OWN"
      },
      {
        "ownId": 52210,
        "ownerOperator": "AMVEST Coal Sales, Inc.",
        "ownType": "OWN"
      },
      {
        "ownId": 52215,
        "ownerOperator": "AYP Energy, Inc.",
        "ownType": "OWN"
      },
      {
        "ownId": 52222,
        "ownerOperator": "Air Products and Chemicals, Inc.",
        "ownType": "OWN"
      }];
    const distinctOwnOpers = [...new Set(ownerOperators.map(d=>d.ownerOperator))];
    const action = actions.updateOwnerOperatorSelection(distinctOwnOpers.map(s=> ({id: s, label: s, selected:false, enabled:true})));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.ownerOperator.length).not.toBe(0);
  });

  it("should update state when update control tech is dispatched", () => {
    const controlTech = [
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
    ];
    const action = actions.updateControlTechnologySelection(restructureControlTechnologies(controlTech));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.controlTechnology.length).not.toBe(0);
  });

  it("should update state when update unit types is dispatched", () => {
    const unitTypes = [
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
    ];
    const action = actions.updateUnitTypeSelection(restructureUnitTypes(unitTypes));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.unitType.length).not.toBe(0);
  });

  it("should update state when update fuel types is dispatched", () => {
    const fuelTypes = [
      {
        fuelTypeCode: 'C',
        fuelTypeDescription: 'Coal',
        fuelGroupCode: 'COAL',
        fuelGroupDescription: 'All Coal',
      },
      {
        fuelTypeCode: 'CRF',
        fuelTypeDescription: 'Coal Refuse',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'DSL',
        fuelTypeDescription: 'Diesel Oil',
        fuelGroupCode: 'OIL',
        fuelGroupDescription: 'All Oil',
      },
      {
        fuelTypeCode: 'LPG',
        fuelTypeDescription: 'Liquified Petroleum Gas',
        fuelGroupCode: 'GAS',
        fuelGroupDescription: 'All Gas',
      },
      {
        fuelTypeCode: 'NNG',
        fuelTypeDescription: 'Natural Gas',
        fuelGroupCode: 'GAS',
        fuelGroupDescription: 'All Gas',
      },
      {
        fuelTypeCode: 'OGS',
        fuelTypeDescription: 'Other Gas',
        fuelGroupCode: 'GAS',
        fuelGroupDescription: 'All Gas',
      },
      {
        fuelTypeCode: 'OIL',
        fuelTypeDescription: 'Residual Oil',
        fuelGroupCode: 'OIL',
        fuelGroupDescription: 'All Oil',
      },
      {
        fuelTypeCode: 'OOL',
        fuelTypeDescription: 'Other Oil',
        fuelGroupCode: 'OIL',
        fuelGroupDescription: 'All Oil',
      },
      {
        fuelTypeCode: 'OSF',
        fuelTypeDescription: 'Other Solid Fuel',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'PNG',
        fuelTypeDescription: 'Pipeline Natural Gas',
        fuelGroupCode: 'GAS',
        fuelGroupDescription: 'All Gas',
      },
      {
        fuelTypeCode: 'PRG',
        fuelTypeDescription: 'Process Gas',
        fuelGroupCode: 'GAS',
        fuelGroupDescription: 'All Gas',
      },
      {
        fuelTypeCode: 'PRS',
        fuelTypeDescription: 'Process Sludge',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'PTC',
        fuelTypeDescription: 'Petroleum Coke',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'R',
        fuelTypeDescription: 'Refuse',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'TDF',
        fuelTypeDescription: 'Tire Derived Fuel',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'W',
        fuelTypeDescription: 'Wood',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
      {
        fuelTypeCode: 'WL',
        fuelTypeDescription: 'Waste Liquid',
        fuelGroupCode: 'OTHER',
        fuelGroupDescription: 'All Other Fuels',
      },
    ];
    const action = actions.updateFuelTypeSelection(restructureFuelTypes(fuelTypes));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.fuelType.length).not.toBe(0);
  });
  it("should update state when update acct name number is dispatched", () => {
    const nameNumbers = [
      {
        accountNumber: '000000000001',
        accountName: 'Auction Reserve',
      },
      {
        accountNumber: '000000000002',
        accountName: 'Direct Sale Reserve',
      },
      {
        accountNumber: '000000000003',
        accountName: 'Small Diesel Reserve',
      },
      {
        accountNumber: '000000000004',
        accountName: 'Phase I Extension Reserve',
      },
      {
        accountNumber: '000000000005',
        accountName: 'Conservation and Renewables Reserve',
      },
      {
        accountNumber: '000000000006',
        accountName: 'Renewable Energy Reserve',
      },
      {
        accountNumber: '000000000007',
        accountName: 'Repowering Reserve',
      },
      {
        accountNumber: '000000000008',
        accountName: 'Reduced Utilization Reserve',
      },
      {
        accountNumber: '000000000009',
        accountName: 'Initial Allocation Reserve',
      },
      {
        accountNumber: '000000000010',
        accountName: 'Opt In Reserve',
      },
      {
        accountNumber: '000000000011',
        accountName: 'Substitution Reserve',
      },
    ];
    const action = actions.updateAccountNameNumberSelection(nameNumbers.map((ann) => ({
      id: ann.accountNumber,
      label: `${ann.accountName} (${ann.accountNumber})`,
      selected: false,
      enabled:true
    })));
    const newState = filterCriteriaReducer(initialState.filterCriteria, action);

    expect(newState.accountNameNumber.length).not.toBe(0);
  });
});
