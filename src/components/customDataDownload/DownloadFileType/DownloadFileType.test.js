import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import DownloadFileType from './DownloadFileType';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';
import axios from 'axios';

jest.mock('axios');

initialState.customDataDownload.dataType = 'EMISSIONS';
initialState.customDataDownload.dataSubType = 'Hourly Emissions';
initialState.filterCriteria = {
  timePeriod: {
    startDate: '2019-01-01',
    endDate: '2019-01-01',
    opHrsOnly: true,
  },
  program: [],
  facility: [],
  unitType: [],
  fuelType: [],
  stateTerritory: [],
  controlTechnology: [],
};
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
    const { getByRole, getByLabelText } = query;
    const downloadButton = getByRole('button', { name: 'Download' });
    expect(downloadButton).toBeDefined();

    const link = {
      click: jest.fn(),
      setAttribute: jest.fn(),
      parentNode: {
        removeChild: jest.fn(),
      },
    };
    const response = {
      headers: {
        'content-disposition':
          'attachment; filename="c8dbc0c6-18a4-4b59-ab13-68f112fe1f8f.json"',
      },
      data: 'data',
    };
    axios.get.mockImplementation(() => Promise.resolve(response));
    global.URL.createObjectURL = jest.fn();
    global.Blob = function (content, options) {
      return { content, options };
    };
    jest.spyOn(document, 'createElement').mockImplementation(() => link);
    jest
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => jest.fn());

    fireEvent.click(downloadButton);
    fireEvent.click(getByLabelText('JSON'));
    fireEvent.click(downloadButton);
  });
});
