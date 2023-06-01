import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';
import { cloneDeep } from 'lodash';

import DataPreview from './DataPreview';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initState from "../../../store/reducers/initialState";

const initStateCopy = cloneDeep(initState)

const timePeriod = initStateCopy.filterCriteria.timePeriod;
timePeriod.startDate = '2019-01-01';
timePeriod.endDate = '2019-01-01';
timePeriod.opHrsOnly = true;
initStateCopy.customDataDownload.dataType= "EMISSIONS";
initStateCopy.customDataDownload.dataSubType= "Hourly Emissions";
initStateCopy.customDataDownload.dataPreview = [
  {
    test: 'Some value',
    test2: 'Another value',
  },
  {
    test: 'Yet Some value',
    test2: 'Yet Another value',
  },
];
initStateCopy.customDataDownload.totalCount = "50";
initStateCopy.customDataDownload.fieldMappings = [{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}];
 
const store = configureStore(initStateCopy);

describe('Data preview component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <DataPreview
          dataType={initStateCopy.customDataDownload.dataType}
          dataSubType={initStateCopy.customDataDownload.dataSubType}
          dataPreview={initStateCopy.customDataDownload.dataPreview}
          loadDataPreviewDispatcher={jest.fn()}
          loading={0}
          filterCriteria={initStateCopy.filterCriteria}
          handleUpdateInAppliedFilters={jest.fn()}
          appliedFilters={initStateCopy.filterCriteria.timePeriod}
          totalCount={initStateCopy.customDataDownload.totalCount}
          fieldMappings={initStateCopy.customDataDownload.fieldMappings}
          setApiError={jest.fn()}
        />
      </Provider>);
  });

  afterEach(cleanup);

  it('renders data preview elements properely', () => {
    const { getByText, getByRole, getAllByRole} = query;
    expect(getByText("Data Preview")).toBeInTheDocument();
    expect(getByText(`(Viewing the first ${initStateCopy.customDataDownload.dataPreview.length} records of ${initStateCopy.customDataDownload.totalCount})`)).toBeInTheDocument();
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(2);
    expect(getAllByRole("row").length).toBe(3);
  });

});
