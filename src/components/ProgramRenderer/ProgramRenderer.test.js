import React from 'react';
import { render,screen } from '@testing-library/react';
import ProgramRenderer  from './ProgramRenderer';
import {restructurePrograms} from "../../utils/selectors/hourlyEmissions";

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
const storeProgam = restructurePrograms(program);

describe('Program renderer Component', () => {
  it('renders form elements without errors for active retired and enable select all flags set to true', () => {
    const { getAllByLabelText, getAllByTestId, getAllByRole, getByText } = render(
      <ProgramRenderer
        showActiveRetired={true}
        showActive={true}
        showRetired={true}
        items={storeProgam}
        enableSelectAll={true}
        onSelectAll={jest.fn()}
        onSelectItem={jest.fn()}
        />
    );

    const activeProgramHeader = getByText('Active Programs')
    expect(activeProgramHeader).toBeInTheDocument()
    const retiredProgramHeader = getByText('Retired Programs')
    expect(retiredProgramHeader).toBeInTheDocument()

    const groupNames = getAllByTestId('program-group-name')
    expect(groupNames).toHaveLength(4)

    const selectAllCheckBoxes = getAllByLabelText('Select All')
    expect(selectAllCheckBoxes).toHaveLength(4)

    const checkbox = getAllByRole('checkbox')
    expect(checkbox).toHaveLength(storeProgam[0].items.length + storeProgam[1].items.length + selectAllCheckBoxes.length)

  });

  it('renders form elements without errors for active retired and enable select all falgs set to false', () => {
    const { getAllByTestId, getAllByRole, queryByText, queryAllByLabelText } = render(
      <ProgramRenderer
        showActiveRetired={false}
        showActive={false}
        showRetired={false}
        items={storeProgam}
        enableSelectAll={false}
        onSelectAll={jest.fn()}
        onSelectItem={jest.fn()}
        />
    );

    expect(queryByText('Active Programs')).toBeNull()
    expect(queryByText('Retired Programs')).toBeNull()

    const groupNames = getAllByTestId('program-group-name')
    expect(groupNames).toHaveLength(2)

    expect(queryAllByLabelText('Select All')).toHaveLength(0);

    const checkbox = getAllByRole('checkbox')
    expect(checkbox).toHaveLength(storeProgam[0].items.length + storeProgam[1].items.length)

  });

});
