import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../../store/configureStore.dev';
import BulkDataFiles from './BulkDataFiles';
import initialState from '../../../store/reducers/initialState';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
const { findByRole, findByText, getByRole, getByText, queryByText, debug } = screen;
const helperTextUrl =
  `${config.services.content.uri}/campd/data/bulk-data-files/helper-text.md`;
const downloadLimitAlertUrl =
  `${config.services.content.uri}/campd/data/bulk-data-files/download-limit-alert.md`
const getHelperTextUrl = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json('Bulk Data Files'));
});
const getDownloadLimitAlert = rest.get(downloadLimitAlertUrl, (req, res, ctx) => {
  return res(ctx.json('Download Limit Alert'));
});
const bulkDataFilesUrl=
`${config.services.quartz.uri}/bulk-files`;
const getBulkDataFiles = rest.get(bulkDataFilesUrl, (req, res, ctx) => {
  console.log('called');
  return res(ctx.json('bulk data files'))
})
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
const server = new setupServer(getHelperTextUrl, getDownloadLimitAlert, getBulkDataFiles, getFiltersUrl);

initialState.bulkDataFiles.dataTable=[
  {
    "filename": "Emissions-Daily-2021-Q1.csv",
    "s3Path": "emissions/daily/quarter/Emissions-Daily-2021-Q1.csv",
    "bytes": 71084971,
    "kiloBytes": 69418,
    "megaBytes": 67,
    "gigaBytes": 80,
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
const store = configureStore(initialState);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterEach(cleanup)
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

/*****
 */
describe('Manage Bulk Data Files component: ',  () => {
    test('download button is disabled when no files are selected', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BulkDataFiles
              loadBulkDataFilesDispatcher= {jest.fn()}
            />
          </MemoryRouter>
        </Provider>
      );
      const downloadButton = getByRole('button', {
        name: /download/i
      });
      expect(downloadButton).toBeDisabled();
    });

    test('download button is enabled after files are selected', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BulkDataFiles
              loadBulkDataFilesDispatcher= {jest.fn()}
            />
          </MemoryRouter>
        </Provider>
      );
      const checkbox = getByRole('checkbox', {
        name: /select-row-4/i
      })
      fireEvent.click(checkbox);
      const downloadButton = getByRole('button', {
        name: /download/i
      });
      expect(downloadButton).not.toBeDisabled();
    });

    test('number of files is updated when files are added or removed', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <BulkDataFiles
              loadBulkDataFilesDispatcher= {jest.fn()}
            />
          </MemoryRouter>
        </Provider>
      );
      const checkbox1 = getByRole('checkbox', {
        name: /select-row-4/i
      });
      const checkbox2 = getByRole('checkbox', {
        name: /select-row-5/i
      })
      fireEvent.click(checkbox1);
      const fileCount= getByText(/files selected: 1/i)
      expect(fileCount).toBeInTheDocument();
      fireEvent.click(checkbox2);
      const updatedFileCount= getByText(/files selected: 2/i)
      expect(updatedFileCount).toBeInTheDocument();
      fireEvent.click(checkbox2);
      expect(fileCount).toBeInTheDocument();
    });


  test('sections render without errors', async () => {
    const query = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const { findByText, getByRole, getAllByRole} = query;
    const header = await findByText('Bulk Data Files');
    expect(header).toBeInTheDocument();
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(4);
    expect(getAllByRole("row").length).toBe(initialState.bulkDataFiles.dataTable.length-1);
  });


  test('file size is updated when files are added or removed', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const checkbox = await findByRole('checkbox', {
      name: /select-row-4/i
    })
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    const updatedFileSize= queryByText(/size:/i)
    console.log(updatedFileSize);
    expect(updatedFileSize).toBeInTheDocument();
  });


  test('download button is disabled if file size exceeds download limit', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const allFiles = await findByRole('checkbox', {
      name: /select-all-rows/i
    })
    fireEvent.click(allFiles);
    const downloadButton = getByRole('button', {
      name: /download/i
    });
    expect(downloadButton).toBeDisabled();
  });

  test('Alert pops up when file size exceeds download limit and is removed when limit is no longer exceeded', async() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const allFiles = await findByRole('checkbox', {
      name: /select-all-rows/i
    })
    fireEvent.click(allFiles);
    const alert = await findByText(/download limit alert/i)
    expect(alert).toBeInTheDocument();
    fireEvent.click(allFiles);
    expect(queryByText(/download limit alert/i)).toBeNull()
  });
});
