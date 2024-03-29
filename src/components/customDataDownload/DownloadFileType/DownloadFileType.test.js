import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { cloneDeep } from 'lodash';

import DownloadFileType from './DownloadFileType';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';
import axios from 'axios';
import RenderSpinner from '../../RenderSpinner/RenderSpinner';
import render from '../../../mocks/render';

jest.mock('axios');
jest.mock('../../RenderSpinner/RenderSpinner')
const initStateCopy = cloneDeep(initialState)
initStateCopy.customDataDownload.dataType = 'EMISSIONS';
initStateCopy.customDataDownload.dataSubType = 'Hourly Emissions';
initStateCopy.filterCriteria = {
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
  excludeParams: [],
  controlTechnology: [],
};
const store = configureStore(initStateCopy);

describe('<DownloadFileType/>', () => {
  let query;
  beforeEach(() => {
    query = render(<DownloadFileType setApiError={jest.fn()} />, store);
  });

  afterEach(cleanup);

  it('has radio buttons', () => {
    const { getByLabelText } = query;
    expect(getByLabelText('CSV')).toHaveClass('usa-radio__input');
    expect(getByLabelText('JSON')).toHaveClass('usa-radio__input');
  });

  it('handles the download button click', async() => {
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
    RenderSpinner.mockImplementation(() => null)

    await userEvent.click(downloadButton);
    await userEvent.click(getByLabelText('JSON'));
    await userEvent.click(downloadButton);
  },50000);
});
