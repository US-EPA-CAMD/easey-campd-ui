import React from 'react';
import { cloneDeep } from 'lodash';

import DataPreview from './DataPreview';
import initState from "../../../store/reducers/initialState";
import render from '../../../mocks/render';
import { unitIdExcludeParam } from '../../../utils/constants/customDataDownload';
import createMockStore from 'redux-mock-store';

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
 
const mockStore = createMockStore();

let store;

describe('Data preview component', () => {
  let query;
  beforeEach(() => {
    store = mockStore(initStateCopy)
    query = render(
        <DataPreview
          dataType={initStateCopy.customDataDownload.dataType}
          dataSubType={initStateCopy.customDataDownload.dataSubType}
          dataPreview={initStateCopy.customDataDownload.dataPreview}
          loading={0}
          filterCriteria={initStateCopy.filterCriteria}
          handleUpdateInAppliedFilters={jest.fn()}
          appliedFilters={initStateCopy.filterCriteria.timePeriod}
          totalCount={initStateCopy.customDataDownload.totalCount}
          fieldMappings={initStateCopy.customDataDownload.fieldMappings}
          setApiError={jest.fn()}
        />, store)
  });


  it('renders data preview elements properely', () => {
    const { getByText, getByRole, getAllByRole} = query;
    expect(getByText("Data Preview")).toBeInTheDocument();
    expect(getByText(`(Viewing the first ${initStateCopy.customDataDownload.dataPreview.length} records of ${initStateCopy.customDataDownload.totalCount})`)).toBeInTheDocument();
    expect(getByRole("table")).toBeDefined();
    expect(getAllByRole("columnheader").length).toBe(2);
    expect(getAllByRole("row").length).toBe(3);
  });

  it('adds unit id to the exclude paramters for hourly emissions on cleanup', async () => {
    const { unmount } =  query;
    await unmount()
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].itemsToUpdate.excludeParams.includes(unitIdExcludeParam)).toBe(true)
  })
});
