import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import BulkDataFilesFilters from './BulkDataFilesFilters';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
const filtersContent = {
  "dataTypes": ["Allowance", "Compliance", "Emissions", "Facility", "Mercury and Air Toxics Emissions (MATS)"],
  "subTypes" : {
    "Emissions" : ["Hourly", "Daily"]
  },
  "groupings" : {
    "Emissions" : ["Quarterly", "State"],
    "Mercury and Air Toxics Emissions (MATS)": ["Quarterly", "State"]
  },
  "states" : [
    {"stateCode": "AK", "stateName": "Alaska", "epaRegion": 10},
    {"stateCode": "AL", "stateName": "Alabama", "epaRegion": 4},
    {"stateCode": "AR", "stateName": "Arkansas", "epaRegion": 6},
    {"stateCode": "AZ", "stateName": "Arizona", "epaRegion": 9},
    {"stateCode": "CA", "stateName": "California", "epaRegion": 9},
    {"stateCode": "CO", "stateName": "Colorado", "epaRegion": 8},
    {"stateCode": "CT", "stateName": "Connecticut", "epaRegion": 1},
    {"stateCode": "DC", "stateName": "District Of Columbia", "epaRegion": 3},
    {"stateCode": "DE", "stateName": "Delaware", "epaRegion": 3},
    {"stateCode": "FL", "stateName": "Florida", "epaRegion": 4},
    {"stateCode": "GA", "stateName": "Georgia", "epaRegion": 4},
    {"stateCode": "HI", "stateName": "Hawaii", "epaRegion": 9},
    {"stateCode": "IA", "stateName": "Iowa", "epaRegion": 7},
    {"stateCode": "ID", "stateName": "Idaho", "epaRegion": 10},
    {"stateCode": "IL", "stateName": "Illinois", "epaRegion": 5},
    {"stateCode": "IN", "stateName": "Indiana", "epaRegion": 5},
    {"stateCode": "KS", "stateName": "Kansas", "epaRegion": 7},
    {"stateCode": "KY", "stateName": "Kentucky", "epaRegion": 4},
    {"stateCode": "LA", "stateName": "Louisiana", "epaRegion": 6},
    {"stateCode": "MA", "stateName": "Massachusetts", "epaRegion": 1},
    {"stateCode": "MD", "stateName": "Maryland", "epaRegion": 3},
    {"stateCode": "ME", "stateName": "Maine", "epaRegion": 1},
    {"stateCode": "MI", "stateName": "Michigan", "epaRegion": 5},
    {"stateCode": "MN", "stateName": "Minnesota", "epaRegion": 5},
    {"stateCode": "MO", "stateName": "Missouri", "epaRegion": 7},
    {"stateCode": "MS", "stateName": "Mississippi", "epaRegion": 4},
    {"stateCode": "MT", "stateName": "Montana", "epaRegion": 8},
    {"stateCode": "NC", "stateName": "North Carolina", "epaRegion": 4},
    {"stateCode": "ND", "stateName": "North Dakota", "epaRegion": 8},
    {"stateCode": "NE", "stateName": "Nebraska", "epaRegion": 7},
    {"stateCode": "NH", "stateName": "New Hampshire", "epaRegion": 1},
    {"stateCode": "NJ", "stateName": "New Jersey", "epaRegion": 2},
    {"stateCode": "NM", "stateName": "New Mexico", "epaRegion": 6},
    {"stateCode": "NV", "stateName": "Nevada", "epaRegion": 9},
    {"stateCode": "NY", "stateName": "New York", "epaRegion": 2},
    {"stateCode": "OH", "stateName": "Ohio", "epaRegion": 5},
    {"stateCode": "OK", "stateName": "Oklahoma", "epaRegion": 6},
    {"stateCode": "OR", "stateName": "Oregon", "epaRegion": 10},
    {"stateCode": "PA", "stateName": "Pennsylvania", "epaRegion": 3},
    {"stateCode": "PR", "stateName": "Puerto Rico", "epaRegion": 2},
    {"stateCode": "RI", "stateName": "Rhode Island", "epaRegion": 1},
    {"stateCode": "SC", "stateName": "South Carolina", "epaRegion": 4},
    {"stateCode": "SD", "stateName": "South Dakota", "epaRegion": 8},
    {"stateCode": "TN", "stateName": "Tennessee", "epaRegion": 4},
    {"stateCode": "TX", "stateName": "Texas", "epaRegion": 6},
    {"stateCode": "UT", "stateName": "Utah", "epaRegion": 8},
    {"stateCode": "VA", "stateName": "Virginia", "epaRegion": 3},
    {"stateCode": "VT", "stateName": "Vermont", "epaRegion": 1},
    {"stateCode": "WA", "stateName": "Washington", "epaRegion": 10},
    {"stateCode": "WI", "stateName": "Wisconsin", "epaRegion": 5},
    {"stateCode": "WV", "stateName": "West Virginia", "epaRegion": 3},
    {"stateCode": "WY", "stateName": "Wyoming", "epaRegion": 8}
  ]
};
const filtersUrl =
  `${config.services.content.uri}/campd/data/bulk-data-files/filters-content.json`;
const getFiltersUrl = rest.get(filtersUrl, (req, res, ctx) => {
  return res(ctx.json(filtersContent));
});
const server = new setupServer(getFiltersUrl);

const dataTableRecords = [
  {
    "filename": "Emissions-Daily-2021-Q1.csv",
    "s3Path": "emissions/daily/quarter/Emissions-Daily-2021-Q1.csv",
    "bytes": 71084971,
    "kiloBytes": 69418,
    "megaBytes": 67,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Daily",
      "statecode": "AL",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:39:01Z"
  },
  {
    "filename": "Emissions-Daily-2021-Q2.csv",
    "s3Path": "emissions/daily/quarter/Emissions-Daily-2021-Q2.csv",
    "bytes": 74858360,
    "kiloBytes": 73103,
    "megaBytes": 71,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Hourly",
      "statecode": "AL",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:35:53Z"
  },
  {
    "filename": "Emissions-Daily-2021-Q3.csv",
    "s3Path": "emissions/daily/quarter/Emissions-Daily-2021-Q3.csv",
    "bytes": 77672657,
    "kiloBytes": 75852,
    "megaBytes": 74,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Daily",
      "statecode": "FL",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:35:54Z"
  },
  {
    "filename": "Emissions-Daily-2021-Q4.csv",
    "s3Path": "emissions/daily/quarter/Emissions-Daily-2021-Q4.csv",
    "bytes": 72548352,
    "kiloBytes": 70848,
    "megaBytes": 69,
    "gigaBytes": 0,
    "metadata": {
      "datatype": "Facility"
    },
    "lastUpdated": "2022-03-02T02:58:36Z"
  },
  {
    "filename": "Emissions-Daily-2021-CO.csv",
    "s3Path": "emissions/daily/state/Emissions-Daily-2021-CO.csv",
    "bytes": 4663680,
    "kiloBytes": 4554,
    "megaBytes": 4,
    "gigaBytes": 0,
    "metadata": {
      "datatype": "Compliance"
    },
    "lastUpdated": "2022-03-02T02:58:36Z"
  },
  {
    "filename": "Emissions-Daily-2021-FL.csv",
    "s3Path": "emissions/daily/state/Emissions-Daily-2021-FL.csv",
    "bytes": 14954348,
    "kiloBytes": 14603,
    "megaBytes": 14,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Hourly",
      "statecode": "CA",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:36:28Z"
  },
  {
    "filename": "Emissions-Hourly-2021-Q1.csv",
    "s3Path": "emissions/hourly/quarter/Emissions-Hourly-2021-Q1.csv",
    "dataType": "emissions",
    "dataSubType": "hourly",
    "grouping": "quarter",
    "bytes": 802953354,
    "kiloBytes": 784134,
    "megaBytes": 765,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Daily",
      "statecode": "AL",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:36:46Z"
  },
  {
    "filename": "Emissions-Hourly-2021-Q2.csv",
    "s3Path": "emissions/hourly/quarter/Emissions-Hourly-2021-Q2.csv",
    "bytes": 879364224,
    "kiloBytes": 858754,
    "megaBytes": 838,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "Quarterly",
      "datasubtype": "Daily",
      "statecode": "DC",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:36:46Z"
  },
  {
    "filename": "Emissions-Hourly-2021-Q3.csv",
    "s3Path": "emissions/hourly/quarter/Emissions-Hourly-2021-Q3.csv",
    "bytes": 1138909005,
    "kiloBytes": 1112215,
    "megaBytes": 1086,
    "gigaBytes": 1,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Hourly",
      "statecode": "TX",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:40:39Z"
  },
  {
    "filename": "Emissions-Hourly-2021-Q4.csv",
    "s3Path": "emissions/hourly/quarter/Emissions-Hourly-2021-Q4.csv",
    "bytes": 812697970,
    "kiloBytes": 793650,
    "megaBytes": 775,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Daily",
      "statecode": "MN",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-02T02:49:45Z"
  },
  {
    "filename": "Emissions-Hourly-2021-AL.csv",
    "s3Path": "emissions/hourly/state/Emissions-Hourly-2021-AL.csv",
    "bytes": 107886779,
    "kiloBytes": 105358,
    "megaBytes": 102,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Hourly",
      "statecode": "AK",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-01T20:05:06Z"
  },
  {
    "filename": "Emissions-Hourly-2021-TX.csv",
    "s3Path": "emissions/hourly/state/Emissions-Hourly-2021-TX.csv",
    "bytes": 420591366,
    "kiloBytes": 410733,
    "megaBytes": 401,
    "gigaBytes": 0,
    "metadata": {
      "grouping": "state",
      "datasubtype": "Daily",
      "statecode": "IL",
      "datatype": "Emissions"
    },
    "lastUpdated": "2022-03-01T20:04:56Z"
  }
];
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BDFF-component',  () => {
  test('filters render without errors', async () => {
    const query = render(
      <BulkDataFilesFilters
        dataTableRecords={dataTableRecords}
        loadBulkDataFilesDispatcher= {jest.fn()}
      />
    );
    const { findByText, getAllByTestId, getByTestId, findByLabelText} = query;
    const dataTypeFilter = await findByText("Data Type");
    expect(dataTypeFilter).toBeTruthy();
    // fireEvent.change(getByTestId('dataType-select'), { target: { value: 2 } });
    // let dataTypeOptions = getAllByTestId('dataType-select-option')
    // expect(dataTypeOptions[2].selected).toBeTruthy();
    // const SubTypeFilter = await findByLabelText("Subtype");
    // expect(SubTypeFilter).toBeTruthy();
    // fireEvent.change(getByTestId('subType-select'), { target: { value: 1 } });
    // let subTypeOptions = getAllByTestId('subType-select-option');
    // expect(subTypeOptions[1].selected).toBeTruthy();
    // const groupingFilter = await findByLabelText("Grouping");
    // expect(groupingFilter).toBeTruthy();
  });
});