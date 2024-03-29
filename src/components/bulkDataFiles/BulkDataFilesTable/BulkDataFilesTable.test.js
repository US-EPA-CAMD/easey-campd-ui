import React from "react";
import { cleanup } from "@testing-library/react";

import BulkDataFilesTable from "./BulkDataFilesTable";
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import render from "../../../mocks/render";

let store = configureStore(initialState);

const dataTableRecords = [
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
  },
  {
    filename: "Emissions-Daily-2021-CO.csv",
    s3Path: "emissions/daily/state/Emissions-Daily-2021-CO.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "state",
    bytes: 4663680,
    kiloBytes: 4554,
    megaBytes: 4,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:58:36Z",
  },
  {
    filename: "Emissions-Daily-2021-FL.csv",
    s3Path: "emissions/daily/state/Emissions-Daily-2021-FL.csv",
    dataType: "emissions",
    dataSubType: "daily",
    grouping: "state",
    bytes: 14954348,
    kiloBytes: 14603,
    megaBytes: 14,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:36:28Z",
  },
  {
    filename: "Emissions-Hourly-2021-Q1.csv",
    s3Path: "emissions/hourly/quarter/Emissions-Hourly-2021-Q1.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "quarter",
    bytes: 802953354,
    kiloBytes: 784134,
    megaBytes: 765,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:36:46Z",
  },
  {
    filename: "Emissions-Hourly-2021-Q2.csv",
    s3Path: "emissions/hourly/quarter/Emissions-Hourly-2021-Q2.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "quarter",
    bytes: 879364224,
    kiloBytes: 858754,
    megaBytes: 838,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:36:46Z",
  },
  {
    filename: "Emissions-Hourly-2021-Q3.csv",
    s3Path: "emissions/hourly/quarter/Emissions-Hourly-2021-Q3.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "quarter",
    bytes: 1138909005,
    kiloBytes: 1112215,
    megaBytes: 1086,
    gigaBytes: 1,
    lastUpdated: "2022-03-02T02:40:39Z",
  },
  {
    filename: "Emissions-Hourly-2021-Q4.csv",
    s3Path: "emissions/hourly/quarter/Emissions-Hourly-2021-Q4.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "quarter",
    bytes: 812697970,
    kiloBytes: 793650,
    megaBytes: 775,
    gigaBytes: 0,
    lastUpdated: "2022-03-02T02:49:45Z",
  },
  {
    filename: "Emissions-Hourly-2021-AL.csv",
    s3Path: "emissions/hourly/state/Emissions-Hourly-2021-AL.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "state",
    bytes: 107886779,
    kiloBytes: 105358,
    megaBytes: 102,
    gigaBytes: 0,
    lastUpdated: "2022-03-01T20:05:06Z",
  },
  {
    filename: "Emissions-Hourly-2021-TX.csv",
    s3Path: "emissions/hourly/state/Emissions-Hourly-2021-TX.csv",
    dataType: "emissions",
    dataSubType: "hourly",
    grouping: "state",
    bytes: 420591366,
    kiloBytes: 410733,
    megaBytes: 401,
    gigaBytes: 0,
    lastUpdated: "2022-03-01T20:04:56Z",
  },
];

describe("Bulk data files data table component", () => {
  let query;
  beforeEach(() => {
    query = render(
      <BulkDataFilesTable
        dataTableRecords={dataTableRecords}
        data={dataTableRecords}
        setApiErrorDispatcher={jest.fn()}
        searchedItems={dataTableRecords}
        setSearchedItems={jest.fn()}
      />,
      store
    );
  });

  afterEach(cleanup);

  it("renders bulk data table properely", () => {
    const { getByRole, getAllByRole } = query;
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(4);
    expect(getAllByRole("row").length).toBe(dataTableRecords.length - 1);
  });
});
