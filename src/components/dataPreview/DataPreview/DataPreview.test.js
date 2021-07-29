import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';

import DataPreview from './DataPreview';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initState from "../../../store/reducers/initialState";

const timePeriod = initState.filterCriteria.timePeriod;
timePeriod.startDate = '2019-01-01';
timePeriod.endDate = '2019-01-01';
timePeriod.opHrsOnly = true;
initState.customDataDownload.dataType= "EMISSIONS";
initState.customDataDownload.dataSubType= "Hourly Emissions";
initState.customDataDownload.dataPreview = [
  {
    test: 'Some value',
    test2: 'Another value',
  },
  {
    test: 'Yet Some value',
    test2: 'Yet Another value',
  },
];
initState.customDataDownload.totalCount = "50";
initState.customDataDownload.fieldMappings = [{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}];
 
const store = configureStore(initState);

describe('Data preview component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <DataPreview
          dataType={initState.customDataDownload.dataType}
          dataSubType={initState.customDataDownload.dataSubType}
          dataPreview={initState.customDataDownload.dataPreview}
          loadDataPreviewDispacher={jest.fn()}
          loading={0}
          filterCriteria={initState.filterCriteria}
          handleUpdateInAppliedFilters={jest.fn()}
          appliedFilters={initState.filterCriteria.timePeriod}
          totalCount={initState.customDataDownload.totalCount}
          fieldMappings={initState.customDataDownload.fieldMappings}
        />
      </Provider>);
  });

  afterEach(cleanup);

  it('renders data preview elements properely', () => {
    const { getByText, getByRole, getAllByRole} = query;
    expect(getByText("Data Preview")).toBeInTheDocument();
    expect(getByText(`(Viewing the first ${initState.customDataDownload.dataPreview.length} records of ${initState.customDataDownload.totalCount})`)).toBeInTheDocument();
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(2);
    expect(getAllByRole("row").length).toBe(3);
  });

});
