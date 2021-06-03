import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import DownloadFileType from './DownloadFileType';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'content' })),
}));

initialState.customDataDownload.dataType= "EMISSIONS";
initialState.customDataDownload.dataSubType= "Hourly Emissions";
initialState.filterCriteria = {
  timePeriod: {
    startDate: "2019-01-01",
    endDate: "2019-01-01",
    opHrsOnly: true,
  },
  program: [],
  facility: [],
  unitType: [],
  fuelType: [],
  stateTerritory: [],
  controlTechnology: [],
}
const store = configureStore(initialState);

describe('<DownloadFileType/>', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <DownloadFileType />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('has radio buttons', () => {
    const { getByLabelText } = query;
    expect(getByLabelText('CSV')).toHaveClass('usa-radio__input');
    expect(getByLabelText('JSON')).toHaveClass('usa-radio__input');
  });

  it('handles the download button click', () => {
    const { getByRole } = query;
    const downloadButton = getByRole('button' , { name: "Download" });
    expect(downloadButton).toBeDefined();
    jest.spyOn(document, 'createElement').mockImplementation(() => jest.fn());
    fireEvent.click(downloadButton);
  });
});
