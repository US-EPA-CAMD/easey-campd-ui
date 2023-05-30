import React from 'react';
import { render, fireEvent  } from '@testing-library/react';
import BulkDataFilesFilters from './BulkDataFilesFilters';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import userEvent from '@testing-library/user-event';

let store = configureStore(initialState);

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
    const { findByText, findByTestId, getAllByTestId, findByLabelText} = query;
    const dataTypeLabel = await findByText("Data Type");
    expect(dataTypeLabel).toBeTruthy();
    const dataTypeFilter = await findByTestId('dataType-select');
    await fireEvent.change(dataTypeFilter, { target: { value: "EDR" } });
    expect(await findByText("Year")).toBeTruthy();
    expect(await findByText("Quarter")).toBeTruthy();
    expect(await findByText("State")).toBeTruthy();
    let dataTypeOptions = getAllByTestId('dataType-select-option')
    expect(dataTypeOptions[2]).toBeTruthy();
    await fireEvent.change(dataTypeFilter, { target: { value: "Emissions" } });
    const SubTypeFilter = await findByLabelText("Subtype");
    expect(SubTypeFilter).toBeTruthy();
    const dataSubtypeDropdown = await findByTestId('subtype-select');
    await fireEvent.change(dataSubtypeDropdown, { target: { value: 1 } });
    let subTypeOptions = getAllByTestId('subtype-select-option');
    expect(subTypeOptions[0].selected).toBeTruthy();
    const groupingFilter = await findByLabelText("Grouping");
    userEvent.tab();
    userEvent.tab();
    expect(groupingFilter).toBeTruthy();
  });
});
