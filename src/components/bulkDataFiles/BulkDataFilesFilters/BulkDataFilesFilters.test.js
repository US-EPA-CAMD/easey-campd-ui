import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import BulkDataFilesFilters from './BulkDataFilesFilters';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';

let store = configureStore(initialState);

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
const filtersContent = {
  "labels": ["Data Type", "Subtype", "Grouping", "State", "Year", "Quarter"],
  "dataTypes": ["Allowance", "Compliance", "EDR", "Emissions", "Facility", "Mercury and Air Toxics Emissions (MATS)", "XML"],
  "subTypes" : {
    "Emissions" : ["Hourly", "Daily"],
    "XML":["Emissions", "Monitoring Plan", "QA"]
  },
  "groupings" : {
    "Emissions" : ["Quarterly", "State"],
    "Mercury and Air Toxics Emissions (MATS)": ["Quarterly", "State"]
  },
  "year": {
    "EDR": [1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008],
    "XML": {
      "Emissions": [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
      "QA": [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
    }
  },
  "quarter":{
    "EDR":["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"],
    "XML": {
      "Emissions": ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"],
      "QA": ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
    }
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
        "dataSubType": "Daily",
        "stateCode": "AL",
        "dataType": "EDR",
        "year": 2000
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
        "dataSubType": "Hourly",
        "stateCode": "AL",
        "dataType": "EDR",
        "year": 2000
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
        "dataSubType": "Daily",
        "stateCode": "FL",
        "dataType": "EDR",
        "year": 2001
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
        "grouping": "state",
        "dataSubType": "Daily",
        "stateCode": "DC",
        "dataType": "EDR",
        "year": 2005
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
        "grouping": "state",
        "dataSubType": "Daily",
        "stateCode": "MN",
        "dataType": "EDR",
        "year": 2004
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
        "dataSubType": "Daily",
        "stateCode": "TX",
        "dataType": "EDR",
        "year": 2001
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
        "dataSubType": "Daily",
        "stateCode": "FL",
        "dataType": "EDR",
        "year": 2003
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
        "grouping": "state",
        "dataSubType": "Daily",
        "stateCode": "CA",
        "dataType": "EDR",
        "year": 2003
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
        "dataSubType": "Daily",
        "stateCode": "CO",
        "dataType": "EDR",
        "year": 2002
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
        "dataSubType": "Daily",
        "stateCode": "MI",
        "dataType": "EDR",
        "year": 2001
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
        "dataSubType": "Daily",
        "stateCode": "NC",
        "dataType": "EDR",
        "year": 2001
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
        "dataSubType": "Daily",
        "stateCode": "AK",
        "dataType": "EDR",
        "year": 2005
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
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesFilters
            dataTableRecords={dataTableRecords}
            loadBulkDataFilesDispatcher={jest.fn()}
            updateBulkDataFilesDispacher={jest.fn()}
            setApiErrorDispatcher={jest.fn()}
            data={dataTableRecords.map((d, i)=>{
              let dCopy = {...d}
              dCopy.id = d.filename;
              dCopy.key=d.filename;
              return dCopy;
            })}
          />
        </MemoryRouter>
      </Provider>
    );
    const { findByText, findByTestId, getAllByTestId, findByLabelText, getByTestId} = query;
    const dataTypeLabel = await findByText("Data Type");
    expect(dataTypeLabel).toBeTruthy();
    // const dataTypeFilter = await findByTestId('dataType-select');
    // await fireEvent.change(dataTypeFilter, { target: { value: "EDR" } });
    // screen.debug();
    // expect(await findByText("Year")).toBeTruthy();
    // expect(await findByText("Quarter")).toBeTruthy();
    // expect(await findByText("State")).toBeTruthy();
    // let dataTypeOptions = getAllByTestId('dataType-select-option')
    // expect(dataTypeOptions[2]).toBeTruthy();
    // const SubTypeFilter = await findByLabelText("Subtype");
    // expect(SubTypeFilter).toBeTruthy();
    // fireEvent.change(getByTestId('subType-select'), { target: { value: 1 } });
    // let subTypeOptions = getAllByTestId('subType-select-option');
    // expect(subTypeOptions[1].selected).toBeTruthy();
    // const groupingFilter = await findByLabelText("Grouping");
    // expect(groupingFilter).toBeTruthy();
  });
});
